import { useState, useEffect } from "react";
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

// CP Labels
const cpLabels: Record<number, string> = {
  0: "Social/Other",
  1: "Triggering Event",
  2: "Exploration",
  3: "Integration",
  4: "Resolution",
};

// Colors
const cpColors: Record<number, string> = {
  0: "#9ca3af", // Gray - Social
  1: "#3b82f6", // Blue - Triggering
  2: "#f59e0b", // Yellow - Exploration
  3: "#22c55e", // Green - Integration
  4: "#003057", // Navy - Resolution
};

const categoryColors: Record<string, string> = {
  Student: "#003057",
  "Community TA": "#B3A369",
  Instructor: "#22c55e",
  Staff: "#3b82f6",
  Unknown: "#9ca3af",
};

export function meta() {
  return [
    { title: "Grade Analysis | Discussion Forum Dashboard" },
    { name: "description", content: "Analyze relationship between forum participation and grades" },
  ];
}

export default function Grades() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCP, setSelectedCP] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // Load data from JSON file
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

  // Calculate statistics from loaded data
  const stats = {
    totalPosts: posts.length,
    totalStudents: new Set(posts.map((p) => p.userId).filter(Boolean)).size,
    avgGrade:
      posts.filter((p) => p.grade !== null).reduce((sum, p) => sum + (p.grade || 0), 0) /
        posts.filter((p) => p.grade !== null).length || 0,
    studentsWithGrades: posts.filter((p) => p.grade !== null).length,
  };

  // Calculate CP distribution
  const cpDistribution = [0, 1, 2, 3, 4].map((code) => ({
    code,
    label: cpLabels[code],
    count: posts.filter((p) => p.cpCode === code).length,
  }));

  // Calculate average grade by CP
  const gradeByCP = [0, 1, 2, 3, 4].map((code) => {
    const cpPosts = posts.filter((p) => p.cpCode === code && p.grade !== null);
    const avgGrade = cpPosts.length > 0
      ? cpPosts.reduce((sum, p) => sum + (p.grade || 0), 0) / cpPosts.length
      : 0;
    return {
      code,
      label: cpLabels[code],
      avgGrade,
    };
  });

  // Calculate grade distribution
  const gradeRanges = ["0-20%", "21-40%", "41-60%", "61-80%", "81-100%"];
  const gradeDistribution = gradeRanges.map((range, index) => {
    const min = index * 0.2;
    const max = (index + 1) * 0.2;
    return {
      range,
      count: posts.filter((p) => p.grade !== null && p.grade > min && p.grade <= max).length,
    };
  });

  // Calculate user category distribution
  const userCategories = Object.entries(
    posts.reduce((acc, p) => {
      acc[p.userCategory] = (acc[p.userCategory] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([category, count]) => ({ category, count }));

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const matchesCP = selectedCP === null || post.cpCode === selectedCP;
    const matchesSearch = post.body.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCP && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCP, searchTerm]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003057] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading data...</p>
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
          <h1 className="text-3xl font-bold text-gray-900">Grade Analysis</h1>
          <p className="text-gray-600 mt-2">
            Analyzing the relationship between cognitive presence in forum posts and student grades.
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Posts" value={stats.totalPosts.toString()} subtitle="Analyzed" />
          <StatCard title="Students" value={stats.totalStudents.toString()} subtitle="Unique users" />
          <StatCard
            title="Avg Grade"
            value={`${(stats.avgGrade * 100).toFixed(1)}%`}
            subtitle="Mean"
          />
          <StatCard
            title="With Grades"
            value={stats.studentsWithGrades.toString()}
            subtitle="Posts"
          />
        </div>

        {/* Key Finding Banner */}
        <div className="bg-[#003057] text-white rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-2">📈 Key Finding</h2>
          <p className="text-lg">
            Students with deeper cognitive engagement (Integration & Resolution) have{" "}
            <span className="font-bold text-[#B3A369]">higher average grades</span>.
          </p>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4">
            {gradeByCP.map((item) => (
              <div key={item.code} className="text-center">
                <p className="text-sm opacity-80">{item.label}</p>
                <p className="text-2xl font-bold">{(item.avgGrade * 100).toFixed(1)}%</p>
              </div>
            ))}
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* CP Code vs Average Grade */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Average Grade by Cognitive Presence Level
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gradeByCP} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="label"
                    angle={-45}
                    textAnchor="end"
                    interval={0}
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis
                    domain={[0, 1]}
                    tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
                  />
                  <Tooltip
                    formatter={(value: number) => [`${(value * 100).toFixed(1)}%`, "Avg Grade"]}
                  />
                  <Bar dataKey="avgGrade" radius={[4, 4, 0, 0]}>
                    {gradeByCP.map((entry) => (
                      <Cell key={`cell-${entry.code}`} fill={cpColors[entry.code]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* CP Code Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Post Distribution by Cognitive Presence
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cpDistribution} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="label"
                    angle={-45}
                    textAnchor="end"
                    interval={0}
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {cpDistribution.map((entry) => (
                      <Cell key={`cell-${entry.code}`} fill={cpColors[entry.code]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Grade Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Grade Distribution</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gradeDistribution} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#B3A369" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* User Category Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Posts by User Category</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userCategories}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="count"
                    nameKey="category"
                    label={({ category, count }) => `${category}: ${count}`}
                  >
                    {userCategories.map((entry) => (
                      <Cell
                        key={entry.category}
                        fill={categoryColors[entry.category] || "#9ca3af"}
                      />
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
            <h2 className="text-lg font-semibold text-gray-900">Browse All Posts ({posts.length})</h2>
            <p className="text-sm text-gray-500">
              Click a CP level to filter and see all comments in that category
            </p>
          </div>

          {/* Filters */}
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="flex flex-wrap gap-4 items-center">
              {/* CP Filter Buttons */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCP(null)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCP === null
                      ? "bg-[#003057] text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  All ({posts.length})
                </button>
                {[0, 1, 2, 3, 4].map((code) => (
                  <button
                    key={code}
                    onClick={() => setSelectedCP(code)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCP === code
                        ? "text-white"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                    }`}
                    style={selectedCP === code ? { backgroundColor: cpColors[code] } : {}}
                  >
                    {cpLabels[code]} ({cpDistribution.find((c) => c.code === code)?.count || 0})
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

            {/* Results count */}
            <p className="mt-3 text-sm text-gray-600">
              Showing {filteredPosts.length} posts
              {selectedCP !== null && ` in ${cpLabels[selectedCP]}`}
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </div>

          {/* Posts List */}
          <div className="divide-y divide-gray-200">
            {paginatedPosts.map((post) => (
              <div key={post.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-start gap-4">
                  {/* CP Badge */}
                  <span
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium text-white shrink-0"
                    style={{ backgroundColor: cpColors[post.cpCode] }}
                  >
                    {cpLabels[post.cpCode]}
                  </span>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-800">{post.body}</p>
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
                      <span>
                        ID:{" "}
                        <span className="font-medium text-gray-700">{post.userId || "N/A"}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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

        {/* CP Code Legend */}
        <div className="mt-8 bg-[#B3A369]/20 rounded-xl border border-[#B3A369]/40 p-6">
          <h3 className="font-semibold text-[#003057] mb-4">
            Cognitive Presence Phases (Community of Inquiry Framework)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="flex items-start gap-2">
              <div className="w-4 h-4 rounded mt-0.5" style={{ backgroundColor: cpColors[0] }} />
              <div>
                <p className="font-medium text-sm">Social/Other</p>
                <p className="text-xs text-gray-600">Introductions, social chat</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-4 h-4 rounded mt-0.5" style={{ backgroundColor: cpColors[1] }} />
              <div>
                <p className="font-medium text-sm">Triggering Event</p>
                <p className="text-xs text-gray-600">Asking questions</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-4 h-4 rounded mt-0.5" style={{ backgroundColor: cpColors[2] }} />
              <div>
                <p className="font-medium text-sm">Exploration</p>
                <p className="text-xs text-gray-600">Sharing ideas</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-4 h-4 rounded mt-0.5" style={{ backgroundColor: cpColors[3] }} />
              <div>
                <p className="font-medium text-sm">Integration</p>
                <p className="text-xs text-gray-600">Connecting ideas</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-4 h-4 rounded mt-0.5" style={{ backgroundColor: cpColors[4] }} />
              <div>
                <p className="font-medium text-sm">Resolution</p>
                <p className="text-xs text-gray-600">Reaching conclusions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Data Source Note */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Data loaded from: /data/forum_data.json
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