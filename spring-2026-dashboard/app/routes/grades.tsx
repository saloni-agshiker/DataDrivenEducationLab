import { useState, useEffect, useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, ScatterChart, Scatter,
  ZAxis, ReferenceLine,
} from "recharts";
import { useClassContext } from "~/components/ClassContext";

interface Post {
  source: string;
  course_id: string;
  date: string;
  week_of_course: number;
  type: string;
  title: string | null;
  body: string;
  upvotes: number;
  downvotes: number;
  comment_count: number | null;
  endorsed: boolean;
}

interface Student {
  user_id: number;
  user_category: string;
  course_id: string;
  percent_grade: number | null;
  features: {
    behavioral: {
      threads_posted: number;
      replies_made: number;
      total_posts: number;
      thread_upvotes: number;
      comment_upvotes: number;
      upvotes_total: number;
      upvotes_per_post: number;
      avg_thread_len: number;
      avg_comment_len: number;
      avg_text_len: number;
      questions_asked: number;
      discussions_made: number;
      endorsed_count: number;
    };
    temporal: {
      active_weeks: number;
      early_activity_index: number;
      weekly_variance: number;
      consistency_score: number;
      early_active_ratio: number;
    };
    interaction: {
      normalized_upvotes: number;
      early_x_active: number;
    };
    semantic: {
      cluster: number;
      dist_to_centroid: number;
      local_topic_entropy: number;
      topic_x_active: number;
      topic_x_entropy: number;
      longtext_x_on_topic: number;
    };
  };
  posts: Post[];
}

interface StudentData {
  students: Student[];
}

export function meta() {
  return [
    { title: "Grade Analysis | Discussion Forum Dashboard" },
    { name: "description", content: "Student forum participation and grades" },
  ];
}

const GRADE_COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#003057"];
// Cap the scatter at this value; anything above is flagged as an outlier
const POST_CAP = 50;

// Custom scatter dot — color-codes by grade
const CustomDot = (props: any) => {
  const { cx, cy, payload } = props;
  const grade = payload.grade;
  const color =
    grade >= 80 ? "#003057"
    : grade >= 60 ? "#22c55e"
    : grade >= 40 ? "#eab308"
    : "#ef4444";
  const isOutlier = payload.isOutlier;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={isOutlier ? 7 : 5}
      fill={color}
      fillOpacity={0.7}
      stroke={isOutlier ? "#f97316" : "white"}
      strokeWidth={isOutlier ? 2 : 1}
    />
  );
};

// Custom tooltip for scatter
const ScatterTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-sm">
      <p className="font-semibold text-gray-900 font-mono">user_id: {d.userId}</p>
      <p className="text-gray-600">total_posts: <span className="font-medium text-gray-900">{d.rawPosts}</span>{d.isOutlier ? " ⚠️ outlier" : ""}</p>
      <p className="text-gray-600">percent_grade: <span className="font-medium text-gray-900">{d.grade}%</span></p>
    </div>
  );
};

export default function Grades() {
  const [data, setData] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>("grade");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const studentsPerPage = 15;
  const { selectedClass } = useClassContext();

  useEffect(() => {
    fetch("/data/student_data.json")
      .then((res) => res.json())
      .then((d: StudentData) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const students = useMemo(() => {
    if (!data) return [];
    return selectedClass === "all"
      ? data.students
      : data.students.filter((s) => s.course_id === selectedClass);
  }, [data, selectedClass]);

  const gradeDistribution = useMemo(() => {
    const ranges = ["0–20%", "21–40%", "41–60%", "61–80%", "81–100%"];
    return ranges.map((range, i) => ({
      range,
      count: students.filter((s) => {
        const g = s.percent_grade ?? 0;
        return g > i * 0.2 && g <= (i + 1) * 0.2;
      }).length,
      color: GRADE_COLORS[i],
    }));
  }, [students]);

  // Scatter: cap outliers so the axis is readable
  const scatterData = useMemo(() =>
    students.map((s) => {
      const rawPosts = s.features.behavioral.total_posts;
      const isOutlier = rawPosts > POST_CAP;
      return {
        posts: isOutlier ? POST_CAP : rawPosts, // capped X position
        rawPosts,                                // real value shown in tooltip
        grade: Math.round((s.percent_grade ?? 0) * 100),
        userId: s.user_id,
        isOutlier,
      };
    }),
    [students]
  );

  const outlierCount = scatterData.filter((d) => d.isOutlier).length;

  const filteredStudents = useMemo(() => {
    return students
      .filter((s) => searchTerm ? String(s.user_id).includes(searchTerm) : true)
      .sort((a, b) => {
        if (sortBy === "grade") return (b.percent_grade ?? 0) - (a.percent_grade ?? 0);
        if (sortBy === "total_posts") return b.features.behavioral.total_posts - a.features.behavioral.total_posts;
        if (sortBy === "active_weeks") return b.features.temporal.active_weeks - a.features.temporal.active_weeks;
        if (sortBy === "endorsed_count") return b.features.behavioral.endorsed_count - a.features.behavioral.endorsed_count;
        return 0;
      });
  }, [students, searchTerm, sortBy]);

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * studentsPerPage,
    currentPage * studentsPerPage
  );

  useEffect(() => { setCurrentPage(1); }, [searchTerm, sortBy, selectedClass]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003057] mx-auto" />
          <p className="mt-4 text-gray-600">Loading grade data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Grade Analysis</h1>
          <p className="text-gray-600 mt-2">
            Click any student row to see their full record.{" "}
            <span className="font-medium text-[#003057]">{students.length} students</span> in selection.
          </p>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Grade distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Grade Distribution</h2>
            <p className="text-sm text-gray-500 mb-4">How many students fall into each grade band</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gradeDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} label={{ value: "Students", angle: -90, position: "insideLeft", offset: 10 }} />
                  <Tooltip formatter={(v: number) => [v, "Students"]} />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {gradeDistribution.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Scatter: total_posts vs grade */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">total_posts vs percent_grade</h2>
            <p className="text-sm text-gray-500 mb-1">
              Each dot = 1 student. X axis capped at {POST_CAP} posts for readability.
            </p>
            {outlierCount > 0 && (
              <p className="text-xs text-orange-600 mb-3">
                ⚠️ {outlierCount} student{outlierCount > 1 ? "s" : ""} with {POST_CAP}+ posts shown pinned to the right edge — hover to see their real count.
              </p>
            )}
            {/* Legend */}
            <div className="flex gap-4 mb-3 text-xs text-gray-500">
              {[
                { color: "#003057", label: "≥80%" },
                { color: "#22c55e", label: "60–79%" },
                { color: "#eab308", label: "40–59%" },
                { color: "#ef4444", label: "<40%" },
              ].map(({ color, label }) => (
                <span key={label} className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: color }} />
                  {label}
                </span>
              ))}
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 5, right: 20, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="posts"
                    type="number"
                    name="total_posts"
                    domain={[0, POST_CAP]}
                    ticks={[0, 10, 20, 30, 40, 50]}
                    label={{ value: "total_posts", position: "insideBottom", offset: -12, fontSize: 12 }}
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis
                    dataKey="grade"
                    type="number"
                    name="percent_grade"
                    domain={[0, 100]}
                    ticks={[0, 25, 50, 75, 100]}
                    tickFormatter={(v) => `${v}%`}
                    tick={{ fontSize: 11 }}
                  />
                  <ZAxis range={[40, 40]} />
                  <Tooltip content={<ScatterTooltip />} />
                  <ReferenceLine x={POST_CAP} stroke="#f97316" strokeDasharray="4 4" strokeWidth={1.5} />
                  <Scatter data={scatterData} shape={<CustomDot />} />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Student Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              All Students ({filteredStudents.length})
            </h2>
            <p className="text-sm text-gray-500 mt-1">Click a row to expand the full student record</p>
          </div>

          <div className="px-6 py-3 bg-gray-50 border-b border-gray-200 flex flex-wrap gap-3 items-center">
            <input
              type="text"
              placeholder="Search by User ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#003057]"
            />
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">Sort:</span>
              {[
                ["grade", "Grade"],
                ["total_posts", "Posts"],
                ["active_weeks", "Active Wks"],
                ["endorsed_count", "Endorsed"],
              ].map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setSortBy(key)}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                    sortBy === key
                      ? "bg-[#003057] text-white"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-4 py-3 text-left">user_id</th>
                  <th className="px-4 py-3 text-left">course</th>
                  <th className="px-4 py-3 text-left">percent_grade</th>
                  <th className="px-4 py-3 text-left">total_posts</th>
                  <th className="px-4 py-3 text-left">threads_posted</th>
                  <th className="px-4 py-3 text-left">replies_made</th>
                  <th className="px-4 py-3 text-left">active_weeks</th>
                  <th className="px-4 py-3 text-left">avg_text_len</th>
                  <th className="px-4 py-3 text-left">upvotes_total</th>
                  <th className="px-4 py-3 text-left">endorsed_count</th>
                  <th className="px-4 py-3 text-left">cluster</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedStudents.map((s) => (
                  <>
                    <tr
                      key={s.user_id}
                      onClick={() =>
                        setSelectedStudent(selectedStudent?.user_id === s.user_id ? null : s)
                      }
                      className={`cursor-pointer transition-colors ${
                        selectedStudent?.user_id === s.user_id
                          ? "bg-[#003057]/5 border-l-4 border-l-[#003057]"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <td className="px-4 py-3 font-mono text-gray-700">{s.user_id}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs">
                        {s.course_id.includes("1T2017") ? "2017" : "2018"}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`font-semibold ${
                          (s.percent_grade ?? 0) >= 0.8 ? "text-green-600"
                          : (s.percent_grade ?? 0) >= 0.5 ? "text-yellow-600"
                          : "text-red-600"
                        }`}>
                          {((s.percent_grade ?? 0) * 100).toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-700">{s.features.behavioral.total_posts}</td>
                      <td className="px-4 py-3 text-gray-700">{s.features.behavioral.threads_posted}</td>
                      <td className="px-4 py-3 text-gray-700">{s.features.behavioral.replies_made}</td>
                      <td className="px-4 py-3 text-gray-700">{s.features.temporal.active_weeks}</td>
                      <td className="px-4 py-3 text-gray-700">{s.features.behavioral.avg_text_len}</td>
                      <td className="px-4 py-3 text-gray-700">{s.features.behavioral.upvotes_total}</td>
                      <td className="px-4 py-3 text-gray-700">{s.features.behavioral.endorsed_count}</td>
                      <td className="px-4 py-3 text-gray-700">{s.features.semantic.cluster}</td>
                    </tr>

                    {selectedStudent?.user_id === s.user_id && (
                      <tr key={`${s.user_id}-detail`}>
                        <td colSpan={11} className="bg-[#003057]/[0.03] border-b border-[#003057]/10 p-0">
                          <StudentDetail student={s} />
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Student detail panel ────────────────────────────────────────────────────
function StudentDetail({ student: s }: { student: Student }) {
  const [postFilter, setPostFilter] = useState<string>("all");

  const filteredPosts = useMemo(() => {
    if (postFilter === "all") return s.posts;
    return s.posts.filter((p) => p.source === postFilter);
  }, [s.posts, postFilter]);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-10 h-10 rounded-full bg-[#003057] flex items-center justify-center text-white font-bold text-sm shrink-0">
          {String(s.user_id).slice(-2)}
        </div>
        <div>
          <p className="font-bold text-gray-900 font-mono">user_id: {s.user_id}</p>
          <p className="text-xs text-gray-500 font-mono">
            user_category: {s.user_category} · course_id: {s.course_id}
          </p>
        </div>
        <div className="ml-auto bg-white border border-gray-200 rounded-xl px-5 py-3 text-center shrink-0">
          <p className="text-2xl font-bold text-[#003057]">
            {((s.percent_grade ?? 0) * 100).toFixed(1)}%
          </p>
          <p className="text-xs text-gray-400 font-mono">percent_grade</p>
        </div>
      </div>

      {/* Feature sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <FeatureSection title="behavioral" headerColor="bg-[#003057]">
          {Object.entries(s.features.behavioral).map(([k, v]) => (
            <FeatureRow key={k} label={k} value={v} />
          ))}
        </FeatureSection>
        <FeatureSection title="temporal" headerColor="bg-[#B3A369]">
          {Object.entries(s.features.temporal).map(([k, v]) => (
            <FeatureRow key={k} label={k} value={v} />
          ))}
        </FeatureSection>
        <FeatureSection title="interaction" headerColor="bg-green-600">
          {Object.entries(s.features.interaction).map(([k, v]) => (
            <FeatureRow key={k} label={k} value={v} />
          ))}
        </FeatureSection>
        <FeatureSection title="semantic" headerColor="bg-gray-500">
          {Object.entries(s.features.semantic).map(([k, v]) => (
            <FeatureRow key={k} label={k} value={v} />
          ))}
        </FeatureSection>
      </div>

      {/* Posts — scrollable, no pagination */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between gap-4">
          <p className="font-semibold text-gray-900 font-mono text-sm shrink-0">
            posts <span className="text-gray-400 font-normal">[{s.posts.length}]</span>
          </p>
          {/* Filter by source */}
          <div className="flex gap-2 text-xs">
            {["all", "thread", "comment"].map((f) => (
              <button
                key={f}
                onClick={() => setPostFilter(f)}
                className={`px-3 py-1 rounded-full font-medium transition-colors ${
                  postFilter === f
                    ? "bg-[#003057] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {f} {f !== "all" && `(${s.posts.filter((p) => p.source === f).length})`}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 shrink-0">
            showing {filteredPosts.length} posts — scroll to see all
          </p>
        </div>

        {/* Scrollable post list — no pagination, just scroll */}
        <div className="divide-y divide-gray-100 max-h-[480px] overflow-y-auto">
          {filteredPosts.map((post, i) => (
            <div key={i} className="px-4 py-4">
              <div className="flex flex-wrap gap-2 text-xs font-mono mb-2">
                <Tag label="source" value={post.source} />
                <Tag label="type" value={post.type} />
                <Tag label="week_of_course" value={post.week_of_course} />
                <Tag label="date" value={post.date} />
                <Tag label="upvotes" value={post.upvotes} />
                <Tag label="downvotes" value={post.downvotes} />
                {post.comment_count !== null && (
                  <Tag label="comment_count" value={post.comment_count} />
                )}
                <Tag label="endorsed" value={String(post.endorsed)} highlight={post.endorsed} />
              </div>
              {post.title && (
                <p className="text-sm font-semibold text-gray-800 mb-1">
                  <span className="font-mono text-gray-400 font-normal text-xs mr-1">title:</span>
                  {post.title}
                </p>
              )}
              <p className="text-sm text-gray-600 leading-relaxed">
                <span className="font-mono text-gray-400 text-xs mr-1">body:</span>
                {post.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeatureSection({ title, headerColor, children }: {
  title: string; headerColor: string; children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden bg-white">
      <div className={`px-3 py-2 ${headerColor}`}>
        <p className="text-xs font-bold uppercase tracking-wider text-white font-mono">{title}</p>
      </div>
      <div className="px-3 py-3 space-y-1.5">{children}</div>
    </div>
  );
}

function FeatureRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between items-center text-xs">
      <span className="font-mono text-gray-500 truncate mr-2">{label}</span>
      <span className="font-semibold text-gray-900 shrink-0 tabular-nums">{value}</span>
    </div>
  );
}

function Tag({ label, value, highlight = false }: {
  label: string; value: string | number; highlight?: boolean;
}) {
  return (
    <span className={`px-2 py-0.5 rounded text-xs ${
      highlight ? "bg-green-100 text-green-700 font-semibold" : "bg-gray-100 text-gray-600"
    }`}>
      {label}: {value}
    </span>
  );
}