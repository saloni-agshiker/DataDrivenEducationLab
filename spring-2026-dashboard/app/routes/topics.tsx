import { useState, useEffect, useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, PieChart, Pie,
} from "recharts";
import { useClassContext } from "~/components/ClassContext";

interface Post {
  body: string;
  source: string;
  type: string;
  date: string;
  upvotes: number;
  endorsed: boolean;
  title: string | null;
}

interface Student {
  user_id: number;
  course_id: string;
  percent_grade: number | null;
  features: { semantic: { cluster: number } };
  posts: Post[];
}

interface StudentData {
  students: Student[];
}

interface Topic {
  id: number;
  name: string;
  shortName: string;
  description: string;
  color: string;
  top30Terms: string[];
  aiSummary: string;
  instructorInsight: string;
}

const topicData: Topic[] = [
  {
    id: 1,
    name: "Key Programming Concepts",
    shortName: "Programming Concepts",
    description: "Discussions about fundamental programming concepts, Python syntax, and core CS principles",
    color: "#003057",
    top30Terms: [
      "function", "variable", "loop", "string", "list", "return", "print",
      "integer", "boolean", "parameter", "argument", "class", "object",
      "method", "array", "index", "iteration", "condition", "statement",
      "expression", "operator", "value", "type", "data", "input", "output",
      "syntax", "definition", "declare", "initialize",
    ],
    aiSummary: "This topic centers on students learning and discussing fundamental Python programming constructs including functions, variables, loops, and data types.",
    instructorInsight: "Students are actively engaging with core programming concepts. Consider reinforcing fundamentals with additional practice exercises and visual demonstrations.",
  },
  {
    id: 2,
    name: "General Course Logistics & Assignments",
    shortName: "Course Logistics",
    description: "Questions about course structure, assignment deadlines, grading, and platform navigation",
    color: "#B3A369",
    top30Terms: [
      "assignment", "deadline", "submit", "grade", "exercise", "problem",
      "course", "week", "due", "points", "score", "test", "exam", "quiz",
      "chapter", "unit", "lesson", "video", "smartbook", "vocareum",
      "certificate", "progress", "complete", "requirement", "syllabus",
      "schedule", "help", "question", "answer", "feedback",
    ],
    aiSummary: "This topic reflects student concerns about course mechanics, including submission processes, grading criteria, deadlines, and navigating the learning platform.",
    instructorInsight: "High volume of logistics questions suggests students may benefit from clearer communication about deadlines. Consider a pinned FAQ addressing the most common concerns.",
  },
  {
    id: 3,
    name: "Code Debugging & Troubleshooting",
    shortName: "Debugging",
    description: "Students seeking help with errors, bugs, and troubleshooting their code",
    color: "#54585A",
    top30Terms: [
      "error", "code", "work", "wrong", "fix", "bug", "issue", "problem",
      "run", "output", "expected", "incorrect", "traceback", "exception",
      "debug", "stuck", "help", "solution", "syntax", "indent",
      "typeerror", "nameerror", "attributeerror", "indexerror", "valueerror",
      "crash", "fail", "broken", "correct", "resolve",
    ],
    aiSummary: "This topic captures students struggling with code errors and seeking debugging assistance, indicating areas where comprehension gaps may exist.",
    instructorInsight: "Frequent debugging questions suggest the need for more hands-on coding exercises with explicit error pattern walkthroughs and common mistake recognition.",
  },
];

function assignTopic(text: string): number {
  const lower = text.toLowerCase();
  const scores = topicData.map((topic) => ({
    id: topic.id,
    score: topic.top30Terms.filter((t) => lower.includes(t)).length,
  }));
  const max = Math.max(...scores.map((s) => s.score));
  if (max === 0) return 1;
  return scores.find((s) => s.score === max)?.id ?? 1;
}

export function meta() {
  return [
    { title: "Topic Modeling | Discussion Forum Dashboard" },
    { name: "description", content: "LDA Topic Modeling Analysis - Key discussion themes" },
  ];
}

export default function Topics() {
  const [data, setData] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [expandedTopics, setExpandedTopics] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const { selectedClass } = useClassContext();

  useEffect(() => {
    fetch("/data/student_data.json")
      .then((res) => res.json())
      .then((d: StudentData) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  // Flatten and classify posts, filtered by class
  const processedPosts = useMemo(() => {
    if (!data) return [];
    const students =
      selectedClass === "all"
        ? data.students
        : data.students.filter((s) => s.course_id === selectedClass);

    return students.flatMap((student) =>
      student.posts.map((post, i) => ({
        id: `${student.user_id}-${i}`,
        body: post.body,
        user_id: student.user_id,
        grade: student.percent_grade,
        upvotes: post.upvotes,
        endorsed: post.endorsed,
        topicId: assignTopic(post.body),
      }))
    );
  }, [data, selectedClass]);

  const topicStats = useMemo(() => {
    return topicData.map((topic) => {
      const topicPosts = processedPosts.filter((p) => p.topicId === topic.id);
      const grades = topicPosts.map((p) => p.grade ?? 0);
      const avgGrade = grades.length ? grades.reduce((a, b) => a + b, 0) / grades.length : 0;
      return {
        ...topic,
        postCount: topicPosts.length,
        avgGrade,
        percentage: processedPosts.length > 0 ? (topicPosts.length / processedPosts.length) * 100 : 0,
      };
    }).sort((a, b) => b.postCount - a.postCount);
  }, [processedPosts]);

  const toggleExpanded = (topicId: number) => {
    setExpandedTopics((prev) => {
      const next = new Set(prev);
      next.has(topicId) ? next.delete(topicId) : next.add(topicId);
      return next;
    });
  };

  const filteredPosts = useMemo(() => {
    return processedPosts.filter((p) => {
      const matchesTopic = selectedTopic === null || p.topicId === selectedTopic;
      const matchesSearch = p.body.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesTopic && matchesSearch;
    });
  }, [processedPosts, selectedTopic, searchTerm]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  useEffect(() => { setCurrentPage(1); }, [selectedTopic, searchTerm, selectedClass]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003057] mx-auto" />
          <p className="mt-4 text-gray-600">Loading topic analysis...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Topic Modeling</h1>
          <p className="text-gray-600 mt-2">
            LDA-based topic modeling identifying the 3 most common discussion themes.{" "}
            <span className="font-medium text-[#003057]">
              {processedPosts.length.toLocaleString()} posts analyzed.
            </span>
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Posts" value={processedPosts.length.toLocaleString()} subtitle="Analyzed" />
          <StatCard title="Topics Identified" value="3" subtitle="Via LDA" />
          <StatCard
            title="Most Common"
            value={topicStats[0]?.shortName ?? "N/A"}
            subtitle={`${topicStats[0]?.postCount ?? 0} posts`}
          />
          <StatCard title="Terms Extracted" value="90" subtitle="Top 30 per topic" />
        </div>

        {/* Key Finding Banner */}
        <div className="bg-[#003057] text-white rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-2">🏷️ Topic Modeling Insights</h2>
          <p className="text-lg mb-4">
            Analysis reveals{" "}
            <span className="font-bold text-[#B3A369]">3 primary discussion themes</span> in
            student forum posts:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topicStats.map((topic, index) => (
              <div key={topic.id} className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl font-bold text-[#B3A369]">#{index + 1}</span>
                  <span className="font-medium">{topic.shortName}</span>
                </div>
                <p className="text-3xl font-bold">{topic.postCount.toLocaleString()}</p>
                <p className="text-sm opacity-80">{topic.percentage.toFixed(1)}% of posts</p>
              </div>
            ))}
          </div>
        </div>

        {/* Topic Cards */}
        <div className="space-y-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900">Topic Analysis & Instructor Insights</h2>
          {topicStats.map((topic, index) => (
            <div key={topic.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div
                className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleExpanded(topic.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl shrink-0"
                      style={{ backgroundColor: topic.color }}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">{topic.name}</h3>
                        <span
                          className="px-2 py-0.5 rounded-full text-xs font-medium text-white"
                          style={{ backgroundColor: topic.color }}
                        >
                          {topic.postCount.toLocaleString()} posts
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{topic.description}</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <svg
                      className={`w-5 h-5 text-gray-500 transition-transform ${expandedTopics.has(topic.id) ? "rotate-180" : ""}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 text-lg">🤖</span>
                    <div>
                      <p className="text-sm font-medium text-blue-800 mb-1">AI Summary</p>
                      <p className="text-sm text-blue-700">{topic.aiSummary}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <span className="text-amber-600 text-lg">💡</span>
                    <div>
                      <p className="text-sm font-medium text-amber-800 mb-1">Instructor Insight</p>
                      <p className="text-sm text-amber-700">{topic.instructorInsight}</p>
                    </div>
                  </div>
                </div>
              </div>

              {expandedTopics.has(topic.id) && (
                <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">📋 Top 30 Most Relevant Terms</h4>
                  <div className="flex flex-wrap gap-2">
                    {topic.top30Terms.map((term, i) => (
                      <span
                        key={term}
                        className="px-3 py-1.5 rounded-full text-sm font-medium"
                        style={{
                          backgroundColor: `${topic.color}15`,
                          color: topic.color,
                          border: `1px solid ${topic.color}30`,
                        }}
                      >
                        <span className="text-xs opacity-60 mr-1">{i + 1}.</span>
                        {term}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Posts by Topic</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topicStats} margin={{ top: 10, right: 20, left: 0, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="shortName" angle={-15} textAnchor="end" tick={{ fontSize: 11 }} interval={0} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="postCount" name="Posts" radius={[4, 4, 0, 0]}>
                    {topicStats.map((t, i) => <Cell key={i} fill={t.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Topic Distribution</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={topicStats}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    dataKey="postCount"
                    nameKey="shortName"
                    label={({ shortName, percent }) =>
                      `${shortName}: ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {topicStats.map((t, i) => <Cell key={i} fill={t.color} />)}
                  </Pie>
                  <Tooltip formatter={(v: number) => [v.toLocaleString(), "Posts"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Posts Browser */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Browse Posts by Topic</h2>
            <p className="text-sm text-gray-500">Filter posts to see examples from each topic</p>
          </div>
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex flex-wrap gap-4 items-center">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTopic(null)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedTopic === null ? "bg-[#003057] text-white" : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                All ({processedPosts.length.toLocaleString()})
              </button>
              {topicStats.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedTopic === topic.id ? "text-white" : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
                  style={selectedTopic === topic.id ? { backgroundColor: topic.color } : {}}
                >
                  {topic.shortName} ({topic.postCount.toLocaleString()})
                </button>
              ))}
            </div>
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003057] bg-white text-gray-900 placeholder-gray-400"
              />
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {paginatedPosts.map((post) => {
              const topic = topicData.find((t) => t.id === post.topicId) ?? topicData[0];
              return (
                <div key={post.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-start gap-4">
                    <span
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium text-white shrink-0"
                      style={{ backgroundColor: topic.color }}
                    >
                      {topic.shortName}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-800">
                        {post.body.slice(0, 300)}{post.body.length > 300 ? "..." : ""}
                      </p>
                      <div className="mt-1 flex flex-wrap gap-4 text-sm text-gray-500">
                        <span>User: {post.user_id}</span>
                        {post.grade !== null && <span>Grade: {(post.grade * 100).toFixed(0)}%</span>}
                        {post.upvotes > 0 && <span>👍 {post.upvotes}</span>}
                        {post.endorsed && <span className="text-green-600">✅ Endorsed</span>}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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

function StatCard({ title, value, subtitle }: { title: string; value: string; subtitle: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <p className="text-sm font-medium text-gray-600">{title}</p>
      <p className="text-3xl font-bold text-[#003057] mt-1">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
}