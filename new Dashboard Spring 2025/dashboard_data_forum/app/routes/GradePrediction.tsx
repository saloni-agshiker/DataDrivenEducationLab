import React, { useMemo, useState } from "react";
import { Matrix, inverse } from "ml-matrix";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ScatterChart,
  Scatter,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

export interface RidgeDataRow {
  course_id: string;
  user_id: number;
  actual_grade: number;
  percent_grade: number;
  threads_posted: number;
  thread_upvotes: number;
  avg_thread_len: number;
  replies_made: number;
  comment_upvotes: number;
  avg_comment_len: number;
  total_posts: number;
  upvotes_total: number;
  upvotes_per_post: number;
  avg_text_len: number;
  active_weeks: number;
  early_activity_index: number;
  weekly_variance: number;
  cluster: number;
  dist_to_centroid: number;
  local_topic_entropy: number;
  // Optional extra fields if you add more later
  [key: string]: string | number | undefined;
}

const exampleData: RidgeDataRow[] = [
  {
    course_id: "course-v1:GTx+CS1301x+1T2017",
    user_id: 5710,
    actual_grade: 0.85,
    percent_grade: 0.85,
    threads_posted: 1,
    thread_upvotes: 0,
    avg_thread_len: 439,
    replies_made: 6,
    comment_upvotes: 0,
    avg_comment_len: 182,
    total_posts: 7,
    upvotes_total: 0,
    upvotes_per_post: 0,
    avg_text_len: 310.5,
    active_weeks: 4,
    early_activity_index: 0.142857,
    weekly_variance: 0.916667,
    cluster: 3,
    dist_to_centroid: 0.461882,
    local_topic_entropy: 0.334221,
  },
  {
    course_id: "course-v1:GTx+CS1301x+1T2017",
    user_id: 30786,
    actual_grade: 1,
    percent_grade: 0.999999,
    threads_posted: 10,
    thread_upvotes: 4,
    avg_thread_len: 451.6,
    replies_made: 9,
    comment_upvotes: 0,
    avg_comment_len: 100.7778,
    total_posts: 19,
    upvotes_total: 4,
    upvotes_per_post: 0.210526,
    avg_text_len: 276.1889,
    active_weeks: 8,
    early_activity_index: 0.473684,
    weekly_variance: 2.267857,
    cluster: 1,
    dist_to_centroid: 3,
    local_topic_entropy: 0.513831,
    // The last column "-1.00E-12" is not mapped to a field, so it's omitted.
  },
  {
    course_id: "course-v1:GTx+CS1301x+1T2017",
    user_id: 69478,
    actual_grade: 0.59,
    percent_grade: 0.590001,
    threads_posted: 1,
    thread_upvotes: 0,
    avg_thread_len: 110,
    replies_made: 3,
    comment_upvotes: 0,
    avg_comment_len: 632.3333,
    total_posts: 4,
    upvotes_total: 0,
    upvotes_per_post: 0,
    avg_text_len: 371.1667,
    active_weeks: 1,
    early_activity_index: 0,
    weekly_variance: 0,
    cluster: 0.59,
    dist_to_centroid: 3,
    local_topic_entropy: 0.46612,
    // The last column "0.167944" is not mapped to a field, so it's omitted.
  },
];

type RidgeModelResult = {
  coefficients: number[];
  featureNames: (keyof RidgeDataRow)[];
  resultRows: (RidgeDataRow & { ridge_pred: number })[];
};

/**
 * Run ridge regression: y ~ X with L2 penalty (lambda).
 * Returns coefficients (including intercept) and predictions.
 */
function fitRidge(
  data: RidgeDataRow[],
  featureNames: (keyof RidgeDataRow)[],
  targetKey: keyof RidgeDataRow = "percent_grade",
  lambda = 1.0
): RidgeModelResult | null {
  if (!data || data.length === 0) return null;

  const Xraw: number[][] = [];
  const yArr: number[] = [];

  data.forEach((row) => {
    const y = Number(row[targetKey]);
    if (!Number.isFinite(y)) return;

    const xRow = featureNames.map((f) => Number(row[f]));
    if (xRow.some((v) => !Number.isFinite(v))) return;

    Xraw.push(xRow);
    yArr.push(y);
  });

  if (Xraw.length === 0) return null;

  const n = Xraw.length;
  const p = featureNames.length;

  // Standardize features (z-score)
  const means = Array(p).fill(0);
  const stds = Array(p).fill(0);

  Xraw.forEach((row) => {
    row.forEach((v, j) => {
      means[j] += v;
    });
  });
  for (let j = 0; j < p; j++) {
    means[j] /= n;
  }

  Xraw.forEach((row) => {
    row.forEach((v, j) => {
      stds[j] += (v - means[j]) ** 2;
    });
  });
  for (let j = 0; j < p; j++) {
    stds[j] = Math.sqrt(stds[j] / n) || 1;
  }

  const Xstd = Xraw.map((row) =>
    row.map((v, j) => (v - means[j]) / stds[j])
  );

  const X = new Matrix(
    Xstd.map((row) => [1, ...row]) // intercept
  );
  const y = Matrix.columnVector(yArr);

  const k = p + 1;

  const Xt = X.transpose();
  const XtX = Xt.mmul(X);

  const I = Matrix.eye(k);
  I.set(0, 0, 0); // don't regularize intercept

    const XtXlambda = XtX.add(I.mul(lambda));
    const XtY = Xt.mmul(y);

    // Use static inverse instead of instance .inverse() or .solve()
    const XtXlambdaInv = inverse(XtXlambda);
    const beta = XtXlambdaInv.mmul(XtY); // β = (XtX + λI)^(-1) Xᵀy


  const betaArr = beta.to1DArray();

  const filteredRows = data
    .map((row) => {
      const yVal = Number(row[targetKey]);
      const xRow = featureNames.map((f) => Number(row[f]));
      if (!Number.isFinite(yVal) || xRow.some((v) => !Number.isFinite(v))) return null;
      return row;
    })
    .filter((row): row is RidgeDataRow => row !== null);

  const yHatArr = X.mmul(beta).to1DArray();

  const resultRows = filteredRows.map(
    (row, i): RidgeDataRow & { ridge_pred: number } => ({
      ...row,
      ridge_pred: yHatArr[i],
    })
  );

  return {
    coefficients: betaArr,
    featureNames,
    resultRows,
  };
}


const GradeViz: React.FC = () => {
  const [lambda, setLambda] = useState<number>(1.0);

  const featureNames: (keyof RidgeDataRow)[] = [
    "threads_posted",
    "replies_made",
    "upvotes_per_post",
    "avg_text_len",
    "active_weeks",
    "early_activity_index",
    "weekly_variance",
    "dist_to_centroid",
    "local_topic_entropy",
  ];

  const model = useMemo(
    () => fitRidge(exampleData, featureNames, "percent_grade", lambda),
    [lambda]
  );

  if (!model) return <div>No valid data for ridge regression.</div>;

  const { coefficients, resultRows } = model;

  const coefData = [
    { name: "Intercept", coef: coefficients[0] },
    ...featureNames.map((f, i) => ({
      name: String(f),
      coef: coefficients[i + 1],
    })),
  ];

  const scatterData = resultRows.map((row) => ({
    actual: Number(row.percent_grade),
    pred: Number(row.ridge_pred),
  }));

  return (
    <div style={{ padding: "2rem" }}>
      <h1>MOOC Ridge Regression Visualization</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem",
          marginTop: "1.5rem",
        }}
      >

        <div>
          <h2>Actual vs. Predicted Grade</h2>
          <ResponsiveContainer width="100%" height={500}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                dataKey="actual"
                name="Actual grade"
                domain={[0, 1]}
              />
              <YAxis
                type="number"
                dataKey="pred"
                name="Predicted grade"
                domain={[0, 1]}
              />
              <Tooltip />
              <Legend />
              <Scatter name="Students" data={scatterData} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default GradeViz;
