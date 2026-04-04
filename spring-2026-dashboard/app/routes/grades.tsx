import { useState, useEffect, useMemo, useRef } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, ScatterChart, Scatter,
  ZAxis, ReferenceLine,
} from "recharts";
import { useClassContext } from "~/components/ClassContext";

// ─── Feature Reference Data ───────────────────────────────────────────────────
const FEATURE_REF: Record<string, {
  category: string;
  summary: string;
  detail: string;
  range: string;
  scaleType: string;
}> = {
  // Behavioral
  threads_posted: {
    category: "behavioral",
    summary: "New discussion threads started",
    detail: "Shows whether the student proactively contributes topics, not just responds. Students who start threads drive conversation rather than waiting for others.",
    range: "0 to 50+, whole number",
    scaleType: "Raw Count",
  },
  replies_made: {
    category: "behavioral",
    summary: "Replies to other students' threads",
    detail: "Measures responsiveness and community participation. High reply count means the student engages with others, not just posts their own content.",
    range: "0 to 100+, whole number",
    scaleType: "Raw Count",
  },
  total_posts: {
    category: "behavioral",
    summary: "All forum interactions combined",
    detail: "Overall activity level on the forum. The single most basic measure of how much a student showed up and participated. 1–5 is low, 10–20 moderate, 30+ high.",
    range: "0 to 150+, whole number",
    scaleType: "Raw Count",
  },
  thread_upvotes: {
    category: "behavioral",
    summary: "Likes received on threads started",
    detail: "Peer validation of the quality or relevance of discussions they started. High thread upvotes means other students found their questions or topics valuable.",
    range: "0 to 30+, whole number",
    scaleType: "Raw Count",
  },
  comment_upvotes: {
    category: "behavioral",
    summary: "Likes received on replies made",
    detail: "Peer validation of the quality of their answers. A student with high comment upvotes is giving answers that others find helpful.",
    range: "0 to 20+, whole number",
    scaleType: "Raw Count",
  },
  upvotes_total: {
    category: "behavioral",
    summary: "Total likes across all posts",
    detail: "Overall peer recognition of forum contribution quality. Combines thread and comment upvotes into one quality signal. 5+ is meaningful, 15+ is exceptional.",
    range: "0 to 50+, whole number",
    scaleType: "Raw Count",
  },
  upvotes_per_post: {
    category: "behavioral",
    summary: "Average likes per post",
    detail: "Measures quality per post rather than total quantity. A student who posts rarely but always gets liked is more valuable than one who posts constantly with no reactions.",
    range: "0.0 to ~3.0, decimal",
    scaleType: "0 to 1 Ratio",
  },
  avg_thread_len: {
    category: "behavioral",
    summary: "Average character length of threads",
    detail: "Longer threads signal more effort, context, and thoughtfulness. Short threads can be low-effort or vague. Very long threads indicate detailed or well-researched posts.",
    range: "0 to 2000+, characters",
    scaleType: "Character Length",
  },
  avg_comment_len: {
    category: "behavioral",
    summary: "Average character length of replies",
    detail: "Short replies (<50 chars) are often just acknowledgments. Longer replies suggest the student is actually helping, explaining concepts, or engaging meaningfully.",
    range: "0 to 1500+, characters",
    scaleType: "Character Length",
  },
  avg_text_len: {
    category: "behavioral",
    summary: "Overall average writing length across all posts",
    detail: "A combined measure of writing depth. Students who write more tend to engage more thoughtfully with the material. Under 100 = very brief, 300–500 = detailed.",
    range: "0 to 1500+, characters",
    scaleType: "Character Length",
  },
  questions_asked: {
    category: "behavioral",
    summary: "Threads posted as explicit questions",
    detail: "Students who ask questions are seeking help or clarification. High question count can indicate confusion or active learning. Low count with high threads means contributing discussions.",
    range: "0 to 30+, whole number",
    scaleType: "Raw Count",
  },
  discussions_made: {
    category: "behavioral",
    summary: "Threads posted as open discussions",
    detail: "Discussion threads are typically introductions, topic sharing, or open-ended contributions. High count means the student is contributing content, not just asking for help.",
    range: "0 to 40+, whole number",
    scaleType: "Raw Count",
  },
  endorsed_count: {
    category: "behavioral",
    summary: "Replies marked correct by instructor or TA",
    detail: "The strongest quality signal in the model. Getting endorsed means an authority confirmed the student's answer was right. This is rare and very meaningful.",
    range: "0 to 5, whole number (most get 0)",
    scaleType: "Raw Count",
  },
  // Temporal
  active_weeks: {
    category: "temporal",
    summary: "Distinct weeks with at least one post",
    detail: "Measures consistency of participation over time. A student active in 8 of 16 weeks showed up regularly. Active in 1 week may have done everything in a burst.",
    range: "1 to 16, whole number",
    scaleType: "Raw Count",
  },
  early_activity_index: {
    category: "temporal",
    summary: "Share of posts made in the first 4 weeks",
    detail: "Early engagement correlates with better outcomes because it signals the student is not procrastinating and is building habits from day one. 0.5 = half their posts were in the first month.",
    range: "0.0 to 1.0, decimal",
    scaleType: "0 to 1 Ratio",
  },
  weekly_variance: {
    category: "temporal",
    summary: "How erratic weekly posting was",
    detail: "High variance means the student had some weeks with lots of posts and others with none (cramming behavior). Steady posters tend to retain material better.",
    range: "0.0 to 20+, decimal",
    scaleType: "Variance / Entropy",
  },
  consistency_score: {
    category: "temporal",
    summary: "Inverse of variance — how steady posting was",
    detail: "A cleaner version of weekly_variance normalized to 0–1. High score = posted evenly across weeks. Low = big spikes and gaps. Most students fall between 0.1 and 0.6.",
    range: "0.0 to 1.0, decimal",
    scaleType: "0 to 1 Ratio",
  },
  early_active_ratio: {
    category: "temporal",
    summary: "Early activity adjusted for total active duration",
    detail: "Corrects for the fact that a student with 1 active week could have a perfect early_activity_index of 1.0. Rewards students who were both early AND sustained.",
    range: "0.0 to ~0.5, decimal",
    scaleType: "0 to 1 Ratio",
  },
  // Interaction
  normalized_upvotes: {
    category: "interaction",
    summary: "Upvotes per post with smoothing correction",
    detail: "Similar to upvotes_per_post but uses (total_posts + 1) to prevent division by zero. Measures average quality of each post based on peer reaction.",
    range: "0.0 to ~3.0, decimal",
    scaleType: "Interaction Product",
  },
  early_x_active: {
    category: "interaction",
    summary: "Early engagement × sustained activity duration",
    detail: "The most important interaction feature in the model. Rewards the pattern most associated with good grades: start early, keep going. Above 5 = exceptional early AND sustained participation.",
    range: "0.0 to ~12.0, decimal",
    scaleType: "Interaction Product",
  },
  // Semantic
  cluster: {
    category: "semantic",
    summary: "Topic group from KMeans clustering",
    detail: "Students who write about similar topics get grouped together. Cluster labels are arbitrary numbers — cluster 1 is NOT better than cluster 3. Used to compute topic entropy features.",
    range: "0 to k-1, whole number",
    scaleType: "Cluster Label",
  },
  dist_to_centroid: {
    category: "semantic",
    summary: "How off-topic vs. the course average",
    detail: "Measures whether the student is talking about what the course is actually about. 0 = posts perfectly match average course discussion. High = talking about something tangential.",
    range: "0.0 to 1.0, cosine distance",
    scaleType: "0 to 1 Ratio",
  },
  local_topic_entropy: {
    category: "semantic",
    summary: "Topic diversity among similar posts",
    detail: "Low entropy = student posts about one focused topic (specialist). High entropy = spread across many different discussion themes (generalist). This student at 0 is extremely focused.",
    range: "0.0 to 2.0+, entropy",
    scaleType: "Variance / Entropy",
  },
  topic_x_active: {
    category: "semantic",
    summary: "Off-topic signal × how long active",
    detail: "Catches students who are off-topic AND very active for a long time. These students are engaged but potentially in the wrong discussions. A high score is generally a negative indicator.",
    range: "0.0 to 15+, decimal",
    scaleType: "Interaction Product",
  },
  topic_x_entropy: {
    category: "semantic",
    summary: "Off-topic × topic scatter combined",
    detail: "Double off-topic signal. Students who are both off the main course topic AND spread across many different sub-topics. On-topic focused students score near 0.",
    range: "0.0 to 2.0+, decimal",
    scaleType: "Interaction Product",
  },
  longtext_x_on_topic: {
    category: "semantic",
    summary: "Long posts that are also on-topic",
    detail: "The best single quality indicator in the semantic group. Long off-topic posts score low. Short on-topic posts score moderate. Long and on-topic scores high. 150–300 = solid, 300+ = excellent.",
    range: "0.0 to 1500+, decimal",
    scaleType: "Interaction Product",
  },
  // Top-level columns
  percent_grade: {
    category: "outcome",
    summary: "Student's final course grade as a percentage",
    detail: "The target variable for the grade prediction model. Stored as a decimal (0.0–1.0) and displayed multiplied by 100. Green ≥ 80%, Yellow ≥ 50%, Red < 50%.",
    range: "0.0 to 1.0 (displayed as 0–100%)",
    scaleType: "0 to 1 Ratio",
  },
};

const SCALE_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  "Raw Count":          { bg: "bg-blue-50",   text: "text-blue-700",   dot: "bg-blue-400" },
  "0 to 1 Ratio":       { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-400" },
  "Variance / Entropy": { bg: "bg-amber-50",  text: "text-amber-700",  dot: "bg-amber-400" },
  "Interaction Product":{ bg: "bg-purple-50", text: "text-purple-700", dot: "bg-purple-400" },
  "Cluster Label":      { bg: "bg-gray-100",  text: "text-gray-600",   dot: "bg-gray-400" },
  "Character Length":   { bg: "bg-rose-50",   text: "text-rose-700",   dot: "bg-rose-400" },
  "outcome":            { bg: "bg-[#003057]/5", text: "text-[#003057]", dot: "bg-[#003057]" },
};

const CATEGORY_COLORS: Record<string, string> = {
  behavioral: "#003057",
  temporal: "#B3A369",
  interaction: "#16a34a",
  semantic: "#6b7280",
  outcome: "#003057",
};

// ─── Tooltip Portal ──────────────────────────────────────────────────────────
interface TooltipState {
  feature: string;
  x: number;
  y: number;
}

function FeatureTooltipPopover({ feature, x, y }: TooltipState) {
  const ref = useFeatureRef(feature);
  if (!ref) return null;

  const scale = SCALE_COLORS[ref.scaleType] ?? SCALE_COLORS["Raw Count"];
  const catColor = CATEGORY_COLORS[ref.category] ?? "#6b7280";

  // Position: prefer below, flip if near bottom
  const top = y + 12;
  const left = Math.max(8, Math.min(x - 140, window.innerWidth - 320));

  return (
    <div
      className="fixed z-[9999] w-72 rounded-xl shadow-2xl border border-gray-200 bg-white overflow-hidden pointer-events-none"
      style={{ top, left }}
    >
      {/* Category stripe */}
      <div className="h-1 w-full" style={{ backgroundColor: catColor }} />
      <div className="px-4 pt-3 pb-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="font-mono text-xs font-bold text-gray-900 leading-snug">{feature}</p>
          <span
            className={`shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${scale.bg} ${scale.text}`}
          >
            {ref.scaleType}
          </span>
        </div>
        <p className="text-xs font-medium text-gray-700 mb-2">{ref.summary}</p>
        <p className="text-xs text-gray-500 leading-relaxed mb-2">{ref.detail}</p>
        <div className="flex items-center gap-1.5 text-[10px] text-gray-400 pb-3">
          <span className={`w-2 h-2 rounded-full ${scale.dot}`} />
          <span>Range: {ref.range}</span>
        </div>
      </div>
    </div>
  );
}

function useFeatureRef(feature: string) {
  return FEATURE_REF[feature] ?? null;
}

// ─── Hook: tooltip tracking ───────────────────────────────────────────────────
function useTooltip() {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = (feature: string, e: React.MouseEvent) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setTooltip({ feature, x: e.clientX, y: e.clientY });
  };

  const hide = () => {
    timerRef.current = setTimeout(() => setTooltip(null), 80);
  };

  return { tooltip, show, hide };
}

// ─── Hoverable label wrapper ──────────────────────────────────────────────────
function WithTooltip({
  feature,
  children,
  show,
  hide,
  className = "",
}: {
  feature: string;
  children: React.ReactNode;
  show: (f: string, e: React.MouseEvent) => void;
  hide: () => void;
  className?: string;
}) {
  const hasRef = !!FEATURE_REF[feature];
  if (!hasRef) return <>{children}</>;

  return (
    <span
      className={`cursor-help underline decoration-dotted decoration-gray-400 underline-offset-2 hover:text-[#003057] transition-colors ${className}`}
      onMouseEnter={(e) => show(feature, e)}
      onMouseLeave={hide}
      onMouseMove={(e) => show(feature, e)}
    >
      {children}
    </span>
  );
}

// ─── Interfaces ───────────────────────────────────────────────────────────────
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
const POST_CAP = 50;

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
      cx={cx} cy={cy}
      r={isOutlier ? 7 : 5}
      fill={color}
      fillOpacity={0.7}
      stroke={isOutlier ? "#f97316" : "white"}
      strokeWidth={isOutlier ? 2 : 1}
    />
  );
};

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

// ─── Table column definitions ─────────────────────────────────────────────────
const TABLE_COLS: Array<{ key: string; label: string; feature: string }> = [
  { key: "user_id",        label: "user_id",        feature: "" },
  { key: "course",         label: "course",         feature: "" },
  { key: "percent_grade",  label: "percent_grade",  feature: "percent_grade" },
  { key: "total_posts",    label: "total_posts",    feature: "total_posts" },
  { key: "threads_posted", label: "threads_posted", feature: "threads_posted" },
  { key: "replies_made",   label: "replies_made",   feature: "replies_made" },
  { key: "active_weeks",   label: "active_weeks",   feature: "active_weeks" },
  { key: "avg_text_len",   label: "avg_text_len",   feature: "avg_text_len" },
  { key: "upvotes_total",  label: "upvotes_total",  feature: "upvotes_total" },
  { key: "endorsed_count", label: "endorsed_count", feature: "endorsed_count" },
  { key: "cluster",        label: "cluster",        feature: "cluster" },
];

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Grades() {
  const [data, setData] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>("grade");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const studentsPerPage = 15;
  const { selectedClass, setSelectedClass, availableClasses } = useClassContext();
  const { tooltip, show: showTip, hide: hideTip } = useTooltip();

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

  const scatterData = useMemo(() =>
    students.map((s) => {
      const rawPosts = s.features.behavioral.total_posts;
      const isOutlier = rawPosts > POST_CAP;
      return {
        posts: isOutlier ? POST_CAP : rawPosts,
        rawPosts,
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
      {/* Global tooltip portal */}
      {tooltip && <FeatureTooltipPopover {...tooltip} />}

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Grade Analysis</h1>
            <p className="text-gray-600 mt-2">
              Click any student row to see their full record.{" "}
              <span className="font-medium text-[#003057]">{students.length} students</span> in selection.{" "}
              <span className="text-xs text-gray-400 italic">
                Hover any <span className="underline decoration-dotted">underlined feature name</span> for reference info.
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 shadow-sm">
            <label htmlFor="class-select" className="text-sm font-medium text-gray-600">Class:</label>
            <select
              id="class-select"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="bg-transparent text-[#003057] text-sm font-medium focus:outline-none cursor-pointer"
            >
              <option value="all">All Classes</option>
              {availableClasses.map((cls) => (
                <option key={cls.courseId} value={cls.courseId}>{cls.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
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

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              <WithTooltip feature="total_posts" show={showTip} hide={hideTip}>total_posts</WithTooltip>
              {" "}vs{" "}
              <WithTooltip feature="percent_grade" show={showTip} hide={hideTip}>percent_grade</WithTooltip>
            </h2>
            <p className="text-sm text-gray-500 mb-1">
              Each dot = 1 student. X axis capped at {POST_CAP} posts for readability.
            </p>
            {outlierCount > 0 && (
              <p className="text-xs text-orange-600 mb-3">
                ⚠️ {outlierCount} student{outlierCount > 1 ? "s" : ""} with {POST_CAP}+ posts shown pinned to the right edge — hover to see their real count.
              </p>
            )}
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
                  <XAxis dataKey="posts" type="number" name="total_posts" domain={[0, POST_CAP]}
                    ticks={[0, 10, 20, 30, 40, 50]}
                    label={{ value: "total_posts", position: "insideBottom", offset: -12, fontSize: 12 }}
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis dataKey="grade" type="number" name="percent_grade" domain={[0, 100]}
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
            <h2 className="text-lg font-semibold text-gray-900">All Students ({filteredStudents.length})</h2>
            <p className="text-sm text-gray-500 mt-1">
              Click a row to expand the full student record.{" "}
              <span className="text-xs text-gray-400 italic">Hover column headers for feature definitions.</span>
            </p>
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
                  {TABLE_COLS.map((col) => (
                    <th key={col.key} className="px-4 py-3 text-left">
                      {col.feature ? (
                        <WithTooltip feature={col.feature} show={showTip} hide={hideTip}>
                          {col.label}
                        </WithTooltip>
                      ) : col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedStudents.map((s) => (
                  <>
                    <tr
                      key={s.user_id}
                      onClick={() => setSelectedStudent(selectedStudent?.user_id === s.user_id ? null : s)}
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
                          <StudentDetail student={s} showTip={showTip} hideTip={hideTip} />
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

// ─── Student Detail Panel ─────────────────────────────────────────────────────
function StudentDetail({
  student: s,
  showTip,
  hideTip,
}: {
  student: Student;
  showTip: (f: string, e: React.MouseEvent) => void;
  hideTip: () => void;
}) {
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
          <p className="text-xs text-gray-400 font-mono">
            <WithTooltip feature="percent_grade" show={showTip} hide={hideTip}>
              percent_grade
            </WithTooltip>
          </p>
        </div>
      </div>

      {/* Feature sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <FeatureSection title="behavioral" headerColor="bg-[#003057]">
          {Object.entries(s.features.behavioral).map(([k, v]) => (
            <FeatureRow key={k} label={k} value={v} showTip={showTip} hideTip={hideTip} />
          ))}
        </FeatureSection>
        <FeatureSection title="temporal" headerColor="bg-[#B3A369]">
          {Object.entries(s.features.temporal).map(([k, v]) => (
            <FeatureRow key={k} label={k} value={v} showTip={showTip} hideTip={hideTip} />
          ))}
        </FeatureSection>
        <FeatureSection title="interaction" headerColor="bg-green-600">
          {Object.entries(s.features.interaction).map(([k, v]) => (
            <FeatureRow key={k} label={k} value={v} showTip={showTip} hideTip={hideTip} />
          ))}
        </FeatureSection>
        <FeatureSection title="semantic" headerColor="bg-gray-500">
          {Object.entries(s.features.semantic).map(([k, v]) => (
            <FeatureRow key={k} label={k} value={v} showTip={showTip} hideTip={hideTip} />
          ))}
        </FeatureSection>
      </div>

      {/* Posts */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between gap-4">
          <p className="font-semibold text-gray-900 font-mono text-sm shrink-0">
            posts <span className="text-gray-400 font-normal">[{s.posts.length}]</span>
          </p>
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
                {post.comment_count !== null && <Tag label="comment_count" value={post.comment_count} />}
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

// ─── Sub-components ───────────────────────────────────────────────────────────
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

function FeatureRow({
  label,
  value,
  showTip,
  hideTip,
}: {
  label: string;
  value: number;
  showTip: (f: string, e: React.MouseEvent) => void;
  hideTip: () => void;
}) {
  return (
    <div className="flex justify-between items-center text-xs">
      <WithTooltip feature={label} show={showTip} hide={hideTip} className="font-mono text-gray-500 truncate mr-2">
        {label}
      </WithTooltip>
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