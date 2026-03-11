import React, { useState, useEffect, useMemo } from "react";


// ── Types ────────────────────────────────────────────────────────────────────

interface Post {
  user_id: number;
  course_id: string;
  text: string;
  label: "positive" | "neutral" | "negative";
  confidence: number;
  old_label: string;
  models_agree: boolean;
}

interface CourseStat {
  course_id: string;
  short_name: string;
  positive: number;
  positive_pct: number;
  neutral: number;
  neutral_pct: number;
  negative: number;
  negative_pct: number;
  total: number;
  high_conf: number;
  high_conf_pct: number;
  agree: number;
  agree_pct: number;
}

interface SentimentData {
  summary: {
    total: number;
    positive: number;
    positive_pct: number;
    neutral: number;
    neutral_pct: number;
    negative: number;
    negative_pct: number;
    high_confidence_count: number;
    high_confidence_pct: number;
    models_agree_count: number;
    models_agree_pct: number;
  };
  courses: CourseStat[];
  posts: Post[];
}

interface PerClassMetric {
  precision: number;
  recall: number;
  f1: number;
  count: number;
  count_pct: number;
}

interface ConfusionCell {
  count: number;
  pct: number;
}

interface EvalData {
  summary: {
    total: number;
    train_count: number;
    train_pct: number;
    test_count: number;
    test_pct: number;
    train_accuracy: number;
    test_accuracy: number;
    manual_count: number;
    manual_pct: number;
    synthetic_count: number;
    synthetic_pct: number;
    manual_test_accuracy: number;
    synthetic_test_accuracy: number;
  };
  confusion_matrix: Record<string, Record<string, ConfusionCell>>;
  per_class_metrics: Record<string, PerClassMetric>;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number, decimals = 1) {
  return n.toFixed(decimals);
}

function shortCourse(courseId: string) {
  const parts = courseId.split("+");
  if (parts.length >= 3) return `${parts[1]} · ${parts[2]}`;
  return courseId;
}

// Use inline style hex values for anything color-critical so Tailwind JIT
// purging can never strip the color. Tailwind classes are only used for
// layout/spacing; colors are all explicit hex.

const LABEL_HEX = {
  positive: { bg: "#ecfdf5", border: "#6ee7b7", text: "#065f46", bar: "#10b981", badgeBg: "#d1fae5", badgeText: "#065f46", dot: "#10b981", ring: "#6ee7b7", cardBg: "#ecfdf5" },
  neutral:  { bg: "#f8fafc", border: "#cbd5e1", text: "#475569", bar: "#94a3b8", badgeBg: "#f1f5f9", badgeText: "#334155", dot: "#94a3b8", ring: "#94a3b8", cardBg: "#f8fafc" },
  negative: { bg: "#fff1f2", border: "#fda4af", text: "#9f1239", bar: "#f43f5e", badgeBg: "#ffe4e6", badgeText: "#9f1239", dot: "#f43f5e", ring: "#fda4af", cardBg: "#fff1f2" },
} as const;

// Georgia Tech brand colors
// Navy: #003057  Gold: #B3A369  Gold (light bg): #f5f1e0  Gold (border): #d6c97a

function labelBorderLeftStyle(label: "positive" | "neutral" | "negative"): React.CSSProperties {
  return { borderLeftColor: LABEL_HEX[label].bar };
}


function labelHeatHex(label: "positive" | "neutral" | "negative") {
  return LABEL_HEX[label].bar;
}

function labelRingClass(label: "positive" | "neutral" | "negative") {
  if (label === "positive") return "ring-emerald-400";
  if (label === "negative") return "ring-rose-400";
  return "ring-slate-400";
}

// ── Sub-components ───────────────────────────────────────────────────────────

function SentimentBadge({ label }: { label: "positive" | "neutral" | "negative" }) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
      style={{ backgroundColor: LABEL_HEX[label].badgeBg, color: LABEL_HEX[label].badgeText }}
    >
      {label.charAt(0).toUpperCase() + label.slice(1)}
    </span>
  );
}

function ConfidencePill({ value, agree }: { value: number; agree: boolean }) {
  const isHigh = value >= 0.9;
  return (
    <div className="flex flex-col items-end gap-1">
      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isHigh ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>
        {fmt(value * 100, 1)}% conf
      </span>
      {!agree && (
        <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-orange-50 text-orange-700 border border-orange-200">
          models disagree
        </span>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  sentiment,
}: {
  label: string;
  value: string;
  sub?: string;
  sentiment?: "positive" | "neutral" | "negative";
}) {
  const wrapStyle: React.CSSProperties = sentiment
    ? { backgroundColor: LABEL_HEX[sentiment].cardBg, borderColor: LABEL_HEX[sentiment].border }
    : {};
  const valStyle: React.CSSProperties = sentiment
    ? { color: LABEL_HEX[sentiment].text }
    : {};
  return (
    <div className="rounded-xl border p-4 shadow-sm" style={{ backgroundColor: "#ffffff", borderColor: "#e5e7eb", ...wrapStyle }}>
      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</p>
      <p className="text-2xl font-bold mt-0.5 text-[#003057]" style={valStyle}>{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  );
}

function ConfusionMatrix({ matrix }: { matrix: Record<string, Record<string, ConfusionCell>> }) {
  const labels = ["positive", "neutral", "negative"] as const;
  const maxCount = Math.max(
    ...labels.flatMap((tl) => labels.map((pl) => matrix[tl]?.[pl]?.count ?? 0))
  );

  return (
    <div>
      {/* Legend boxes - GT Navy/Gold themed */}
      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.25rem" }}>
        <div style={{ flex: 1, borderRadius: "0.5rem", padding: "0.75rem", border: "2px dashed #6b8cae", backgroundColor: "#e8eef4" }}>
          <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#003057", marginBottom: "0.25rem" }}>↓ ROWS = What the post actually was</p>
          <p style={{ fontSize: "0.7rem", color: "#003057", lineHeight: 1.5, opacity: 0.8 }}>Each row is a group of posts that share the same true label. Read left to right to see how the model predicted them.</p>
        </div>
        <div style={{ flex: 1, borderRadius: "0.5rem", padding: "0.75rem", border: "2px dashed #d6c97a", backgroundColor: "#f5f1e0" }}>
          <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#7a6a1a", marginBottom: "0.25rem" }}>→ COLUMNS = What the model predicted</p>
          <p style={{ fontSize: "0.7rem", color: "#7a6a1a", lineHeight: 1.5 }}>Each column shows posts the model assigned that label. Diagonal cells (where row = column) are correct predictions.</p>
        </div>
      </div>

      {/* Column axis label */}
      <div style={{ paddingLeft: "9rem", marginBottom: "0.25rem" }}>
        <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#7a6a1a", textTransform: "uppercase", letterSpacing: "0.05em" }}>← Model's Prediction →</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-separate border-spacing-1">
          <thead>
            <tr>
              <th className="pb-1 pr-2 text-left" style={{ width: "9rem" }}>
                <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#003057", textTransform: "uppercase", letterSpacing: "0.05em" }}>True Label ↓</span>
              </th>
              {labels.map((l) => (
                <th key={l} className="text-center pb-1" style={{ minWidth: "5rem" }}>
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="text-xs font-bold" style={{ color: LABEL_HEX[l].text }}>
                      {l.charAt(0).toUpperCase() + l.slice(1)}
                    </span>
                    <span style={{ fontSize: "0.65rem", color: "#7a6a1a" }}>predicted</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {labels.map((tl) => (
              <tr key={tl}>
                <td className="pr-3 py-1 align-middle" style={{ width: "9rem" }}>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold" style={{ color: LABEL_HEX[tl].text }}>
                      {tl.charAt(0).toUpperCase() + tl.slice(1)}
                    </span>
                    <span style={{ fontSize: "0.65rem", color: "#003057" }}>actually was</span>
                  </div>
                </td>
                {labels.map((pl) => {
                  const cell = matrix[tl]?.[pl];
                  const count = cell?.count ?? 0;
                  const pct = cell?.pct ?? 0;
                  const isDiag = tl === pl;
                  const intensity = maxCount > 0 ? count / maxCount : 0;
                  const alpha = Math.round(intensity * 200);
                  const hexAlpha = alpha.toString(16).padStart(2, "0");
                  const heatColor = isDiag ? labelHeatHex(tl) : "#f43f5e";

                  return (
                    <td key={pl} className="text-center py-1">
                      <div
                        className={`mx-auto w-16 rounded-lg flex flex-col items-center justify-center transition-all ${isDiag ? `ring-2 ring-offset-1 ${labelRingClass(tl)}` : ""}`}
                        style={{
                          height: "3.5rem",
                          backgroundColor: count > 0 ? `${heatColor}${hexAlpha}` : "#f9fafb",
                          color: intensity > 0.45 ? "white" : isDiag ? labelHeatHex(tl) : "#f43f5e",
                        }}
                      >
                        <span className="font-bold text-sm leading-none">{count}</span>
                        <span className="text-xs opacity-80">{fmt(pct)}%</span>
                        {isDiag && (
                          <span style={{ opacity: 0.8, fontSize: "0.6rem" }}>✓ correct</span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-400 mt-3">
        Percentages are row-normalized — they show what share of each true label the model assigned to each predicted bucket.
      </p>
    </div>
  );
}

function CourseBreakdownBar({ course }: { course: CourseStat }) {
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-gray-100 last:border-0 hover:bg-gray-50 rounded-lg px-2 -mx-2 transition-colors">
      <div className="w-40 shrink-0">
        <p className="text-xs font-semibold text-gray-700 truncate">{shortCourse(course.course_id)}</p>
        <p className="text-xs text-gray-400">{course.total.toLocaleString()} posts</p>
      </div>
      <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden flex">
        <div
          className="h-full transition-all"
          style={{ width: `${course.positive_pct}%`, backgroundColor: LABEL_HEX.positive.bar }}
          title={`Positive: ${course.positive} (${fmt(course.positive_pct)}%)`}
        />
        <div
          className="h-full transition-all"
          style={{ width: `${course.neutral_pct}%`, backgroundColor: LABEL_HEX.neutral.bar }}
          title={`Neutral: ${course.neutral} (${fmt(course.neutral_pct)}%)`}
        />
        <div
          className="h-full transition-all"
          style={{ width: `${course.negative_pct}%`, backgroundColor: LABEL_HEX.negative.bar }}
          title={`Negative: ${course.negative} (${fmt(course.negative_pct)}%)`}
        />
      </div>
      <div className="w-24 text-right shrink-0 text-xs space-y-0.5">
        <p className="font-bold text-xs" style={{ color: LABEL_HEX.negative.text }}>
          {fmt(course.negative_pct)}% neg
        </p>
        <p className="text-xs" style={{ color: LABEL_HEX.neutral.text }}>{fmt(course.neutral_pct)}% neu</p>
        <p className="text-xs" style={{ color: LABEL_HEX.positive.text }}>{fmt(course.positive_pct)}% pos</p>
      </div>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────

export function meta() {
  return [
    { title: "Sentiment Analysis | Discussion Forum Dashboard" },
    { name: "description", content: "DistilBERT sentiment analysis of student forum comments" },
  ];
}

export default function Sentiment() {
  const [sentimentData, setSentimentData] = useState<SentimentData | null>(null);
  const [evalData, setEvalData] = useState<EvalData | null>(null);
  const [loading, setLoading] = useState(true);

  const [labelFilter, setLabelFilter] = useState<string>("all");
  const [confFilter, setConfFilter] = useState<"all" | "high">("all");
  const [confMin, setConfMin] = useState<number>(0);
  const [confMax, setConfMax] = useState<number>(100);
  const [agreeFilter, setAgreeFilter] = useState(false);
  const [courseFilter, setCourseFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<"overview" | "model" | "posts">("overview");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 20;

  useEffect(() => {
    Promise.all([
      fetch("/data/sentiment_18k.json").then((r) => r.json()),
      fetch("/data/sentiment_eval.json").then((r) => r.json()),
    ])
      .then(([s, e]) => {
        setSentimentData(s);
        setEvalData(e);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredPosts = useMemo(() => {
    if (!sentimentData) return [];
    let posts = sentimentData.posts;
    if (courseFilter !== "all") posts = posts.filter((p) => p.course_id === courseFilter);
    if (labelFilter !== "all") posts = posts.filter((p) => p.label === labelFilter);
    if (confFilter === "high") posts = posts.filter((p) => p.confidence >= 0.9);
    posts = posts.filter((p) => p.confidence * 100 >= confMin && p.confidence * 100 <= confMax);
    if (agreeFilter) posts = posts.filter((p) => p.models_agree);
    return posts;
  }, [sentimentData, courseFilter, labelFilter, confFilter, confMin, confMax, agreeFilter]);

  const classSummary = useMemo(() => {
    if (!sentimentData) return null;
    const posts = sentimentData.posts;
    const total = posts.length;
    const pos = posts.filter((p) => p.label === "positive").length;
    const neu = posts.filter((p) => p.label === "neutral").length;
    const neg = posts.filter((p) => p.label === "negative").length;
    const highConf = posts.filter((p) => p.confidence >= 0.9).length;
    const agree = posts.filter((p) => p.models_agree).length;
    return {
      total,
      pos, pos_pct: total ? (pos / total) * 100 : 0,
      neu, neu_pct: total ? (neu / total) * 100 : 0,
      neg, neg_pct: total ? (neg / total) * 100 : 0,
      highConf, highConf_pct: total ? (highConf / total) * 100 : 0,
      agree, agree_pct: total ? (agree / total) * 100 : 0,
    };
  }, [sentimentData]);

  const filteredCourses = useMemo(() => {
    if (!sentimentData) return [];
    return sentimentData.courses.sort((a, b) => b.total - a.total).slice(0, 20);
  }, [sentimentData]);

  const courseOptions = useMemo(() => {
    if (!sentimentData) return [];
    const ids = Array.from(new Set(sentimentData.posts.map((p) => p.course_id))).sort();
    return ids.map((id) => ({ id, label: shortCourse(id) }));
  }, [sentimentData]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  useEffect(() => { setCurrentPage(1); }, [labelFilter, confFilter, confMin, confMax, agreeFilter, courseFilter]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003057] mx-auto" />
          <p className="mt-4 text-gray-600">Loading sentiment data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Sentiment Analysis</h1>
          <p className="text-gray-500 mt-1 text-sm">
            DistilBERT fine-tuned on 1,244 labeled comments · applied to{" "}
            {sentimentData?.summary.total.toLocaleString()} forum posts across 83 courses
          </p>
        </div>

        {/* Tab Nav */}
        <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 w-fit mb-6 shadow-sm">
          {(["overview", "model", "posts"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-[#003057] text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {tab === "overview" ? "Overview" : tab === "model" ? "Model Performance" : "Browse Posts"}
            </button>
          ))}
        </div>

        {/* ══ OVERVIEW ══ */}
        {activeTab === "overview" && classSummary && (
          <div className="space-y-6">

            {/* Stat cards — all 3 sentiment classes + totals */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              <StatCard label="Total Posts" value={classSummary.total.toLocaleString()} />
              <StatCard
                label="Positive"
                value={classSummary.pos.toLocaleString()}
                sub={`${fmt(classSummary.pos_pct)}% of posts`}
                sentiment="positive"
              />
              <StatCard
                label="Neutral"
                value={classSummary.neu.toLocaleString()}
                sub={`${fmt(classSummary.neu_pct)}% of posts`}
                sentiment="neutral"
              />
              <StatCard
                label="Negative"
                value={classSummary.neg.toLocaleString()}
                sub={`${fmt(classSummary.neg_pct)}% of posts`}
                sentiment="negative"
              />
              <StatCard
                label="High Confidence"
                value={classSummary.highConf.toLocaleString()}
                sub={`${fmt(classSummary.highConf_pct)}% >= 90% conf`}
              />
              <StatCard
                label="Models Agree"
                value={`${fmt(classSummary.agree_pct)}%`}
                sub={`${classSummary.agree.toLocaleString()} posts`}
              />
            </div>

            {/* Distribution bar */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-800 mb-4">
                Overall Sentiment Distribution
              </h2>
              <div className="h-8 rounded-full overflow-hidden flex w-full">
                <div
                  className="h-full flex items-center justify-center text-xs font-bold text-white transition-all"
                  style={{ width: `${classSummary.pos_pct}%`, backgroundColor: LABEL_HEX.positive.bar }}
                >
                  {classSummary.pos_pct > 5 ? `${fmt(classSummary.pos_pct)}%` : ""}
                </div>
                <div
                  className="h-full flex items-center justify-center text-xs font-bold text-white transition-all"
                  style={{ width: `${classSummary.neu_pct}%`, backgroundColor: LABEL_HEX.neutral.bar }}
                >
                  {classSummary.neu_pct > 5 ? `${fmt(classSummary.neu_pct)}%` : ""}
                </div>
                <div
                  className="h-full flex items-center justify-center text-xs font-bold text-white transition-all"
                  style={{ width: `${classSummary.neg_pct}%`, backgroundColor: LABEL_HEX.negative.bar }}
                >
                  {classSummary.neg_pct > 5 ? `${fmt(classSummary.neg_pct)}%` : ""}
                </div>
              </div>
              <div className="flex flex-wrap gap-6 mt-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: LABEL_HEX.positive.bar }} />
                  <span className="text-xs text-gray-600">Positive</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: LABEL_HEX.neutral.bar }} />
                  <span className="text-xs text-gray-600">Neutral</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: LABEL_HEX.negative.bar }} />
                  <span className="text-xs text-gray-600">Negative</span>
                </div>
                <span className="text-xs text-gray-400 ml-auto italic">
                  Model test accuracy is 76.2% — negative rate may be underestimated
                </span>
              </div>
            </div>

            {/* Per-course breakdown */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-base font-semibold text-gray-800">Sentiment by Course</h2>
                <span className="text-xs text-gray-400">Top 20 by post volume</span>
              </div>
              <p className="text-xs text-gray-400 mb-4">
                Bar shows positive (green) / neutral (gray) / negative (red) share per course.
              </p>
              <div>
                {filteredCourses.map((c) => (
                  <CourseBreakdownBar key={c.course_id} course={c} />
                ))}
                {filteredCourses.length === 0 && (
                  <p className="text-gray-400 text-sm">No course data for this selection.</p>
                )}
              </div>
            </div>

            {/* Disagreement callout */}
            {sentimentData && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex gap-4">
                <div className="w-1 rounded-full bg-amber-400 shrink-0" />
                <div>
                  <p className="font-semibold text-amber-800 text-sm">Model Disagreement Note</p>
                  <p className="text-amber-700 text-sm mt-0.5">
                    The new DistilBERT model and the previous model disagreed on{" "}
                    <strong>
                      {(sentimentData.summary.total - sentimentData.summary.models_agree_count).toLocaleString()}
                    </strong>{" "}
                    posts ({fmt(100 - sentimentData.summary.models_agree_pct)}%). The largest shifts
                    were neutral to negative and positive to neutral, suggesting the new model is
                    more sensitive to negative sentiment. See{" "}
                    <button onClick={() => setActiveTab("model")} className="underline font-semibold">
                      Model Performance
                    </button>{" "}
                    for full details.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══ MODEL PERFORMANCE ══ */}
        {activeTab === "model" && evalData && (
          <div className="space-y-6">

            {/* Charts row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Accuracy comparison bar chart — GT Navy (train) + GT Gold (test) */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h2 className="text-base font-semibold text-gray-800 mb-1">Accuracy</h2>
                <p className="text-xs text-gray-400 mb-5">Train vs test accuracy comparison</p>
                <div className="space-y-4">
                  {([
                    { label: "Train Accuracy", value: evalData.summary.train_accuracy, sub: `n = ${evalData.summary.train_count.toLocaleString()} (${fmt(evalData.summary.train_pct)}%)`, color: "#003057" },
                    { label: "Test Accuracy",  value: evalData.summary.test_accuracy,  sub: `n = ${evalData.summary.test_count.toLocaleString()} held-out (${fmt(evalData.summary.test_pct)}%)`, color: "#B3A369" },
                  ] as { label: string; value: number; sub: string; color: string }[]).map(({ label, value, sub, color }) => (
                    <div key={label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium text-gray-700">{label}</span>
                        <span className="text-sm font-bold" style={{ color }}>{fmt(value)}%</span>
                      </div>
                      <div className="h-7 bg-gray-100 rounded-lg overflow-hidden">
                        <div
                          className="h-full rounded-lg flex items-center px-3 transition-all"
                          style={{ width: `${value}%`, backgroundColor: color }}
                        >
                          <span className="text-xs text-white font-semibold">{fmt(value)}%</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{sub}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Label source breakdown — GT Navy (manual) + GT Gold (synthetic) */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h2 className="text-base font-semibold text-gray-800 mb-1">Label Sources</h2>
                <p className="text-xs text-gray-400 mb-5">Manual vs synthetic label counts and their test accuracy</p>

                {/* Stacked bar */}
                <div className="h-7 rounded-lg overflow-hidden flex mb-4">
                  <div
                    className="h-full flex items-center justify-center text-xs font-semibold text-white transition-all"
                    style={{ width: `${evalData.summary.manual_pct}%`, backgroundColor: "#003057" }}
                    title={`Manual: ${evalData.summary.manual_count.toLocaleString()}`}
                  >
                    {evalData.summary.manual_pct > 8 ? `${fmt(evalData.summary.manual_pct)}%` : ""}
                  </div>
                  <div
                    className="h-full flex items-center justify-center text-xs font-semibold text-white transition-all"
                    style={{ width: `${evalData.summary.synthetic_pct}%`, backgroundColor: "#B3A369" }}
                    title={`Synthetic: ${evalData.summary.synthetic_count.toLocaleString()}`}
                  >
                    {evalData.summary.synthetic_pct > 8 ? `${fmt(evalData.summary.synthetic_pct)}%` : ""}
                  </div>
                </div>

                <div className="space-y-4">
                  {([
                    { label: "Manual Labels",    count: evalData.summary.manual_count,    pct: evalData.summary.manual_pct,    acc: evalData.summary.manual_test_accuracy,    color: "#003057", bg: "#e8eef4", border: "#6b8cae" },
                    { label: "Synthetic Labels", count: evalData.summary.synthetic_count, pct: evalData.summary.synthetic_pct, acc: evalData.summary.synthetic_test_accuracy, color: "#8a7a30", bg: "#f5f1e0", border: "#d6c97a" },
                  ] as { label: string; count: number; pct: number; acc: number; color: string; bg: string; border: string }[]).map(({ label, count, pct, acc, color, bg, border }) => (
                    <div key={label} className="rounded-lg p-3 border" style={{ backgroundColor: bg, borderColor: border }}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                          <span className="text-sm font-semibold" style={{ color }}>{label}</span>
                        </div>
                        <span className="text-xs text-gray-500">{count.toLocaleString()} labels ({fmt(pct)}%)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 mb-1">Test accuracy</p>
                          <div className="h-2 bg-white/70 rounded-full overflow-hidden">
                            <div className="h-full rounded-full transition-all" style={{ width: `${acc}%`, backgroundColor: color }} />
                          </div>
                        </div>
                        <span className="text-base font-bold w-14 text-right" style={{ color }}>{fmt(acc)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Confusion matrix */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h2 className="text-base font-semibold text-gray-800 mb-1">Confusion Matrix</h2>
                <p className="text-xs text-gray-400 mb-4">
                  Test set only (n = {evalData.summary.test_count}). Each cell shows count and
                  row-normalized percentage.
                </p>
                <ConfusionMatrix matrix={evalData.confusion_matrix} />
              </div>

              {/* Dataset split — GT Navy (train) + GT Gold (test) */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h2 className="text-base font-semibold text-gray-800 mb-1">Dataset Split</h2>
                <p className="text-xs text-gray-400 mb-5">How the {evalData.summary.total.toLocaleString()} labeled samples were divided</p>
                <div className="h-7 rounded-lg overflow-hidden flex mb-5">
                  <div
                    className="h-full flex items-center justify-center text-xs font-semibold text-white"
                    style={{ width: `${evalData.summary.train_pct}%`, backgroundColor: "#003057" }}
                  >
                    {evalData.summary.train_pct > 8 ? `Train ${fmt(evalData.summary.train_pct)}%` : ""}
                  </div>
                  <div
                    className="h-full flex items-center justify-center text-xs font-semibold text-white"
                    style={{ width: `${evalData.summary.test_pct}%`, backgroundColor: "#B3A369" }}
                  >
                    {evalData.summary.test_pct > 8 ? `Test ${fmt(evalData.summary.test_pct)}%` : ""}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {([
                    { label: "Train", count: evalData.summary.train_count, pct: evalData.summary.train_pct, acc: evalData.summary.train_accuracy, color: "#003057", bg: "#e8eef4" },
                    { label: "Test",  count: evalData.summary.test_count,  pct: evalData.summary.test_pct,  acc: evalData.summary.test_accuracy,  color: "#8a7a30", bg: "#f5f1e0" },
                  ] as { label: string; count: number; pct: number; acc: number; color: string; bg: string }[]).map(({ label, count, pct, acc, color, bg }) => (
                    <div key={label} className="rounded-lg p-3" style={{ backgroundColor: bg }}>
                      <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color }}>{label} set</p>
                      <p className="text-xl font-bold" style={{ color }}>{count.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">{fmt(pct)}% of total</p>
                      <p className="text-xs font-medium mt-1.5" style={{ color }}>Accuracy: {fmt(acc)}%</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Interpretation — GT Navy toned */}
            <div className="bg-[#003057]/5 border border-[#003057]/15 rounded-xl p-5">
              <h3 className="font-semibold text-[#003057] text-sm mb-2">
                Interpreting these results for the 18k labels
              </h3>
              <ul className="text-sm text-[#003057]/80 space-y-1.5 list-disc list-inside">
                <li>
                  At <strong>{fmt(evalData.summary.test_accuracy)}% test accuracy</strong>, roughly
                  1 in 4 labels on the 18k dataset may be incorrect.
                </li>
                <li>
                  The model most commonly confuses{" "}
                  <strong>
                    positive as neutral ({evalData.confusion_matrix.positive?.neutral?.count ?? 0} cases,{" "}
                    {fmt(evalData.confusion_matrix.positive?.neutral?.pct ?? 0)}% of true positives)
                  </strong>
                  , so the real positive rate is likely higher than reported.
                </li>
                <li>
                  Negative recall is{" "}
                  <strong>{fmt(evalData.per_class_metrics.negative.recall)}%</strong> — the model
                  catches most negatives but some are misclassified as neutral.
                </li>
                <li>
                  Filter to <strong>high confidence (confidence &gt;= 0.9)</strong> in Browse Posts
                  for the most reliable labels.
                </li>
                <li>
                  When both models agree (<strong>models_agree = true</strong>), trust the label
                  significantly more.
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* ══ BROWSE POSTS ══ */}
        {activeTab === "posts" && (
          <div className="space-y-4">

            {/* Filters */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-3">
              <div className="flex flex-wrap items-center gap-4">
                {/* Label filter */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-medium">Label:</span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setLabelFilter("all")}
                      className="px-3 py-1 rounded-lg text-xs font-medium transition-colors"
                      style={labelFilter === "all" ? { backgroundColor: "#003057", color: "white" } : {}}
                      {...(labelFilter !== "all" ? { className: "px-3 py-1 rounded-lg text-xs font-medium transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200" } : {})}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setLabelFilter("positive")}
                      className="px-3 py-1 rounded-lg text-xs font-medium transition-colors"
                      style={labelFilter === "positive" ? { backgroundColor: LABEL_HEX.positive.bar, color: "white" } : { backgroundColor: "#f3f4f6", color: "#4b5563" }}
                    >
                      Positive
                    </button>
                    <button
                      onClick={() => setLabelFilter("neutral")}
                      className="px-3 py-1 rounded-lg text-xs font-medium transition-colors"
                      style={labelFilter === "neutral" ? { backgroundColor: LABEL_HEX.neutral.bar, color: "white" } : { backgroundColor: "#f3f4f6", color: "#4b5563" }}
                    >
                      Neutral
                    </button>
                    <button
                      onClick={() => setLabelFilter("negative")}
                      className="px-3 py-1 rounded-lg text-xs font-medium transition-colors"
                      style={labelFilter === "negative" ? { backgroundColor: LABEL_HEX.negative.bar, color: "white" } : { backgroundColor: "#f3f4f6", color: "#4b5563" }}
                    >
                      Negative
                    </button>
                  </div>
                </div>

                {/* Confidence presets */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-medium">Confidence:</span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => { setConfFilter("all"); setConfMin(0); setConfMax(100); }}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                        confFilter === "all" ? "bg-[#003057] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => { setConfFilter("high"); setConfMin(90); setConfMax(100); }}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                        confFilter === "high" ? "bg-[#003057] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      &gt;= 90% only
                    </button>
                  </div>
                </div>

                {/* Models agree */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeFilter}
                    onChange={(e) => setAgreeFilter(e.target.checked)}
                    className="rounded border-gray-300 text-[#003057] focus:ring-[#003057]"
                  />
                  <span className="text-xs text-gray-600 font-medium">Both models agree only</span>
                </label>

                <span className="ml-auto text-xs text-gray-400">
                  {filteredPosts.length.toLocaleString()} posts
                </span>
              </div>

              {/* Second row: course + conf range */}
              <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-gray-100">
                {/* Course filter */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-medium">Course:</span>
                  <select
                    value={courseFilter}
                    onChange={(e) => setCourseFilter(e.target.value)}
                    className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#003057]"
                    style={{ maxWidth: "16rem" }}
                  >
                    <option value="all">All courses</option>
                    {courseOptions.map((c) => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </div>

                {/* Confidence range */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-medium">Conf range:</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={confMin}
                      onChange={(e) => { setConfMin(Number(e.target.value)); setConfFilter("all"); }}
                      className="w-14 text-xs border border-gray-200 rounded-lg px-2 py-1 text-center focus:outline-none focus:ring-1 focus:ring-[#003057] text-gray-700 bg-white"
                    />
                    <span className="text-xs text-gray-400">%–</span>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={confMax}
                      onChange={(e) => { setConfMax(Number(e.target.value)); setConfFilter("all"); }}
                      className="w-14 text-xs border border-gray-200 rounded-lg px-2 py-1 text-center focus:outline-none focus:ring-1 focus:ring-[#003057] text-gray-700 bg-white"
                    />
                    <span className="text-xs text-gray-400">%</span>
                    {(confMin > 0 || confMax < 100) && (
                      <button
                        onClick={() => { setConfMin(0); setConfMax(100); }}
                        className="text-xs text-gray-400 hover:text-gray-600 ml-1 underline"
                      >
                        reset
                      </button>
                    )}
                  </div>
                </div>

                {/* Active filter chips */}
                <div className="flex flex-wrap gap-1.5 ml-auto">
                  {courseFilter !== "all" && (
                    <span className="inline-flex items-center gap-1 text-xs bg-[#003057]/10 text-[#003057] px-2 py-0.5 rounded-full font-medium">
                      {shortCourse(courseFilter)}
                      <button onClick={() => setCourseFilter("all")} className="hover:text-red-500 font-bold">×</button>
                    </span>
                  )}
                  {(confMin > 0 || confMax < 100) && (
                    <span className="inline-flex items-center gap-1 text-xs bg-[#003057]/10 text-[#003057] px-2 py-0.5 rounded-full font-medium">
                      {confMin}–{confMax}% conf
                      <button onClick={() => { setConfMin(0); setConfMax(100); }} className="hover:text-red-500 font-bold">×</button>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Posts list */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="divide-y divide-gray-100">
                {paginatedPosts.length === 0 && (
                  <p className="text-center text-gray-400 py-12 text-sm">
                    No posts match your filters.
                  </p>
                )}
                {paginatedPosts.map((post, i) => (
                  <div
                    key={`${post.user_id}-${i}`}
                    className="px-5 py-4 hover:bg-gray-50 transition-colors border-l-4"
                    style={{ borderLeftColor: LABEL_HEX[post.label].bar }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-800 leading-relaxed">
                          {post.text.slice(0, 350)}{post.text.length > 350 ? "..." : ""}
                        </p>
                        <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-400">
                          <span>User {post.user_id}</span>
                          <span>{shortCourse(post.course_id)}</span>
                          {!post.models_agree && (
                            <span className="text-amber-600 font-medium">
                              Previous label: {post.old_label}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        <SentimentBadge label={post.label} />
                        <ConfidencePill value={post.confidence} agree={post.models_agree} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between bg-gray-50">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <span className="text-xs text-gray-500">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}