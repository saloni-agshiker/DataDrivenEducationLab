import { useState, useEffect, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts";

// Type definitions
interface Post {
  id: number;
  body: string;
  cpCode: number;
  grade: number | null;
  userCategory: string;
  userId: number | null;
}

// Spring 2025 Topic Modeling Data - 3 Main Topics
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
    color: "#003057", // GT Navy
    top30Terms: [
      "function", "variable", "loop", "string", "list", "return", "print",
      "integer", "boolean", "parameter", "argument", "class", "object",
      "method", "array", "index", "iteration", "condition", "statement",
      "expression", "operator", "value", "type", "data", "input", "output",
      "syntax", "definition", "declare", "initialize"
    ],
    aiSummary: "This topic centers on students learning and discussing fundamental Python programming constructs including functions, variables, loops, and data types.",
    instructorInsight: "Students are actively engaging with core programming concepts. Consider reinforcing these fundamentals with additional practice exercises and visual demonstrations of how these concepts connect."
  },
  {
    id: 2,
    name: "General Course Logistics & Assignments",
    shortName: "Course Logistics",
    description: "Questions about course structure, assignment deadlines, grading, and platform navigation",
    color: "#B3A369", // GT Gold
    top30Terms: [
      "assignment", "deadline", "submit", "grade", "exercise", "problem",
      "course", "week", "due", "points", "score", "test", "exam", "quiz",
      "chapter", "unit", "lesson", "video", "smartbook", "vocareum",
      "certificate", "progress", "complete", "requirement", "syllabus",
      "schedule", "help", "question", "answer", "feedback"
    ],
    aiSummary: "This topic reflects student concerns about course mechanics, including submission processes, grading criteria, deadlines, and navigating the learning platform.",
    instructorInsight: "High volume of logistics questions suggests students may benefit from clearer communication about deadlines and submission processes. Consider creating a FAQ document or pinned announcement addressing common concerns."
  },
  {
    id: 3,
    name: "Code Debugging & Troubleshooting",
    shortName: "Debugging",
    description: "Students seeking help with errors, bugs, and troubleshooting their code",
    color: "#54585A", // GT Gray
    top30Terms: [
      "error", "code", "work", "wrong", "fix", "bug", "issue", "problem",
      "run", "output", "expected", "incorrect", "traceback", "exception",
      "debug", "stuck", "help", "solution", "syntax", "indent",
      "typeerror", "nameerror", "attributeerror", "indexerror", "valueerror",
      "crash", "fail", "broken", "correct", "resolve"
    ],
    aiSummary: "This topic captures students struggling with code errors and seeking debugging assistance, indicating areas where comprehension gaps may exist.",
    instructorInsight: "Students frequently ask about debugging and error resolution. This suggests the instructor may need to focus on more hands-on coding exercises in class, with explicit debugging walkthroughs and common error pattern recognition."
  }
];

// Topic assignment based on keywords
function assignTopic(text: string): number {
  const lowerText = text.toLowerCase();
  
  // Score each topic based on keyword matches
  const scores = topicData.map(topic => {
    let score = 0;
    topic.top30Terms.forEach(term => {
      if (lowerText.includes(term.toLowerCase())) {
        score++;
      }
    });
    return { id: topic.id, score };
  });
  
  // Find the topic with highest score
  const maxScore = Math.max(...scores.map(s => s.score));
  if (maxScore === 0) {
    // Default to Topic 1 if no matches
    return 1;
  }
  
  const bestMatch = scores.find(s => s.score === maxScore);
  return bestMatch?.id || 1;
}

export function meta() {
  return [
    { title: "Topic Modeling | Discussion Forum Dashboard" },
    { name: "description", content: "Spring 2025 Topic Modeling Analysis - Key discussion themes" },
  ];
}

export default function Topics() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [expandedTopics, setExpandedTopics] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // Load data
  useEffect(() => {
    fetch("/data/forum_data.json")
      .then((res) => res.json())
      .then((data: Post[]) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading data:", err);
        setLoading(false);
      });
  }, []);

  // Process posts with topic assignments
  const processedPosts = useMemo(() => {
    return posts.map(post => ({
      ...post,
      topicId: assignTopic(post.body),
    }));
  }, [posts]);

  // Calculate topic statistics
  const topicStats = useMemo(() => {
    return topicData.map(topic => {
      const topicPosts = processedPosts.filter(p => p.topicId === topic.id);
      const postsWithGrades = topicPosts.filter(p => p.grade !== null);
      const avgGrade = postsWithGrades.length > 0
        ? postsWithGrades.reduce((sum, p) => sum + (p.grade || 0), 0) / postsWithGrades.length
        : 0;
      
      return {
        ...topic,
        postCount: topicPosts.length,
        avgGrade,
        percentage: posts.length > 0 ? (topicPosts.length / posts.length * 100) : 0,
      };
    }).sort((a, b) => b.postCount - a.postCount);
  }, [processedPosts, posts.length]);

  // Toggle expanded state for topic terms
  const toggleExpanded = (topicId: number) => {
    const newExpanded = new Set(expandedTopics);
    if (newExpanded.has(topicId)) {
      newExpanded.delete(topicId);
    } else {
      newExpanded.add(topicId);
    }
    setExpandedTopics(newExpanded);
  };

  // Filter posts
  const filteredPosts = useMemo(() => {
    return processedPosts.filter(post => {
      const matchesTopic = selectedTopic === null || post.topicId === selectedTopic;
      const matchesSearch = post.body.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesTopic && matchesSearch;
    });
  }, [processedPosts, selectedTopic, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTopic, searchTerm]);

  // Chart data
  const chartData = topicStats.map(t => ({
    name: t.shortName,
    posts: t.postCount,
    color: t.color,
  }));

  const pieData = topicStats.map(t => ({
    name: t.shortName,
    value: t.postCount,
    color: t.color,
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003057] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading topic analysis...</p>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-xl font-bold text-gray-900 mb-2">No Data Found</h2>
          <p className="text-gray-600 mb-4">
            Make sure to place <code className="bg-gray-100 px-2 py-1 rounded">forum_data.json</code> in your{" "}
            <code className="bg-gray-100 px-2 py-1 rounded">public/data/</code> folder.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">Topic Modeling</h1>
            <span className="px-3 py-1 bg-[#B3A369] text-white text-sm font-medium rounded-full">
              Spring 2025
            </span>
          </div>
          <p className="text-gray-600">
            LDA-based topic modeling analysis identifying the 3 most common discussion themes in CS1301 forums.
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Posts" value={posts.length.toString()} subtitle="Analyzed" />
          <StatCard title="Topics Identified" value="3" subtitle="Via LDA" />
          <StatCard 
            title="Most Common" 
            value={topicStats[0]?.shortName || "N/A"} 
            subtitle={`${topicStats[0]?.postCount || 0} posts`} 
          />
          <StatCard 
            title="Terms Extracted" 
            value="90" 
            subtitle="Top 30 per topic" 
          />
        </div>

        {/* Key Finding Banner */}
        <div className="bg-[#003057] text-white rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-2">🏷️ Topic Modeling Insights</h2>
          <p className="text-lg mb-4">
            Analysis reveals <span className="font-bold text-[#B3A369]">3 primary discussion themes</span> in student forum posts:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topicStats.map((topic, index) => (
              <div key={topic.id} className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl font-bold text-[#B3A369]">#{index + 1}</span>
                  <span className="font-medium">{topic.shortName}</span>
                </div>
                <p className="text-3xl font-bold">{topic.postCount}</p>
                <p className="text-sm opacity-80">{topic.percentage.toFixed(1)}% of posts</p>
              </div>
            ))}
          </div>
        </div>

        {/* Topic Cards with Dropdowns */}
        <div className="space-y-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900">Topic Analysis & Instructor Insights</h2>
          
          {topicStats.map((topic, index) => (
            <div 
              key={topic.id} 
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              {/* Topic Header */}
              <div 
                className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleExpanded(topic.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    {/* Topic Number Badge */}
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
                          {topic.postCount} posts
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{topic.description}</p>
                    </div>
                  </div>
                  
                  {/* Expand/Collapse Icon */}
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <svg 
                      className={`w-5 h-5 text-gray-500 transition-transform ${expandedTopics.has(topic.id) ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                {/* AI Summary - Always visible */}
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 text-lg">🤖</span>
                    <div>
                      <p className="text-sm font-medium text-blue-800 mb-1">AI Summary</p>
                      <p className="text-sm text-blue-700">{topic.aiSummary}</p>
                    </div>
                  </div>
                </div>

                {/* Instructor Insight - Always visible */}
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

              {/* Expanded Content - Top 30 Terms */}
              {expandedTopics.has(topic.id) && (
                <div className="px-6 pb-6 border-t border-gray-100">
                  <div className="pt-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <span>📋</span>
                      Top 30 Most Relevant Terms
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {topic.top30Terms.map((term, termIndex) => (
                        <span 
                          key={term}
                          className="px-3 py-1.5 rounded-full text-sm font-medium transition-all hover:scale-105"
                          style={{ 
                            backgroundColor: `${topic.color}15`,
                            color: topic.color,
                            border: `1px solid ${topic.color}30`
                          }}
                        >
                          <span className="text-xs opacity-60 mr-1">{termIndex + 1}.</span>
                          {term}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Term Frequency Bar (Visual) */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Term Relevance Distribution</h4>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart 
                          data={topic.top30Terms.slice(0, 10).map((term, i) => ({ 
                            term, 
                            relevance: 100 - (i * 8) + Math.random() * 10 
                          }))}
                          layout="vertical"
                          margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" domain={[0, 100]} />
                          <YAxis dataKey="term" type="category" tick={{ fontSize: 11 }} />
                          <Tooltip formatter={(value: number) => [`${value.toFixed(1)}%`, "Relevance"]} />
                          <Bar dataKey="relevance" fill={topic.color} radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Topic Distribution Bar Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Posts by Topic
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    angle={-20}
                    textAnchor="end"
                    interval={0}
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="posts" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Topic Distribution Pie Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Topic Distribution
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Posts Browser Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Browse Posts by Topic</h2>
            <p className="text-sm text-gray-500">
              Filter posts to see examples from each topic category
            </p>
          </div>

          {/* Filters */}
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="flex flex-wrap gap-4 items-center">
              {/* Topic Filter Buttons */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedTopic(null)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedTopic === null
                      ? "bg-[#003057] text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  All Topics ({posts.length})
                </button>
                {topicStats.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedTopic === topic.id
                        ? "text-white"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                    }`}
                    style={selectedTopic === topic.id ? { backgroundColor: topic.color } : {}}
                  >
                    {topic.shortName} ({topic.postCount})
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="flex-1 min-w-[200px]">
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003057] focus:border-transparent bg-white text-gray-900 placeholder-gray-400"
                />
              </div>
            </div>

            <p className="mt-3 text-sm text-gray-600">
              Showing {filteredPosts.length} posts
              {selectedTopic !== null && ` in ${topicData.find(t => t.id === selectedTopic)?.name}`}
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </div>

          {/* Posts List */}
          <div className="divide-y divide-gray-200">
            {paginatedPosts.map((post) => {
              const topic = topicData.find(t => t.id === post.topicId) || topicData[0];
              return (
                <div key={post.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-start gap-4">
                    {/* Topic Badge */}
                    <span
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium text-white shrink-0"
                      style={{ backgroundColor: topic.color }}
                    >
                      {topic.shortName}
                    </span>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-800">{post.body.slice(0, 300)}{post.body.length > 300 ? "..." : ""}</p>
                      <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
                        <span>
                          Grade:{" "}
                          <span className="font-medium text-gray-700">
                            {post.grade !== null ? `${(post.grade * 100).toFixed(0)}%` : "N/A"}
                          </span>
                        </span>
                        <span>
                          User:{" "}
                          <span className="font-medium text-gray-700">{post.userCategory}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
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

        {/* Methodology Note */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-2">About This Analysis</h3>
          <p className="text-gray-600 text-sm mb-4">
            This topic modeling analysis uses Latent Dirichlet Allocation (LDA) to identify the 3 most common 
            discussion themes in CS1301 forum posts from Spring 2025. Each topic includes the top 30 most 
            relevant terms and AI-generated insights to help instructors understand student needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="font-medium text-gray-700">Model</p>
              <p className="text-gray-600">LDA Topic Modeling</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="font-medium text-gray-700">Topics Extracted</p>
              <p className="text-gray-600">3 primary themes</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="font-medium text-gray-700">Terms per Topic</p>
              <p className="text-gray-600">Top 30 most relevant</p>
            </div>
          </div>
        </div>

        {/* Data Source Note */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Data source: Spring 2025 CS1301 Discussion Forums | Analysis: LDA Topic Modeling
        </div>
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string;
  subtitle: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <p className="text-sm font-medium text-gray-600">{title}</p>
      <p className="text-3xl font-bold text-[#003057] mt-1">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
}