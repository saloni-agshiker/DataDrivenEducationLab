import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/home";
import { useClassContext } from "~/components/ClassContext";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Discussion Forum Dashboard | Home" },
    { name: "description", content: "Overview of student forum analytics" },
  ];
}

interface StudentData {
  metadata: {
    total_students: number;
    total_posts: number;
  };
  students: {
    user_id: number;
    user_category: string;
    course_id: string;
    percent_grade: number | null;
    features: {
      behavioral: {
        total_posts: number;
        endorsed_count: number;
        upvotes_total: number;
        avg_text_len: number;
      };
      temporal: { active_weeks: number };
      semantic: { cluster: number };
    };
    posts: {
      body: string;
      upvotes: number;
      endorsed: boolean;
      date: string;
    }[];
  }[];
}

export default function Home() {
  const [data, setData] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);
  const { selectedClass } = useClassContext();

  useEffect(() => {
    fetch("/data/student_data.json")
      .then((res) => res.json())
      .then((d: StudentData) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const stats = useMemo(() => {
    if (!data) return null;
    const students =
      selectedClass === "all"
        ? data.students
        : data.students.filter((s) => s.course_id === selectedClass);

    const totalPosts = students.reduce((sum, s) => sum + s.posts.length, 0);
    const totalStudents = students.length;
    const grades = students
      .map((s) => s.percent_grade)
      .filter((g): g is number => g !== null);
    const avgGrade = grades.length > 0 ? grades.reduce((a, b) => a + b, 0) / grades.length : 0;
    const totalEndorsed = students.reduce(
      (sum, s) => sum + s.posts.filter((p) => p.endorsed).length,
      0
    );
    const avgActiveWeeks =
      students.reduce((sum, s) => sum + s.features.temporal.active_weeks, 0) / (totalStudents || 1);
    const totalUpvotes = students.reduce(
      (sum, s) => sum + s.posts.reduce((ps, p) => ps + p.upvotes, 0),
      0
    );

    return { totalPosts, totalStudents, avgGrade, totalEndorsed, avgActiveWeeks, totalUpvotes };
  }, [data, selectedClass]);

  const classLabel =
    selectedClass === "all"
      ? "All Classes"
      : selectedClass.includes("1T2017")
      ? "CS1301 2017"
      : "CS1301 2018";

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003057] mx-auto" />
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-2">
            Analyze student engagement and predict academic success from EdX discussion forums.{" "}
            <span className="font-medium text-[#003057]">Viewing: {classLabel}</span>
          </p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="Total Students"
              value={stats.totalStudents.toLocaleString()}
              subtitle={`From ${classLabel} forums`}
              icon="👤"
              color="blue"
            />
            <StatCard
              title="Total Posts"
              value={stats.totalPosts.toLocaleString()}
              subtitle="Threads + replies"
              icon="💬"
              color="gold"
            />
            <StatCard
              title="Avg Grade"
              value={`${(stats.avgGrade * 100).toFixed(1)}%`}
              subtitle="Mean across students"
              icon="📊"
              color="green"
            />
            <StatCard
              title="Endorsed Posts"
              value={stats.totalEndorsed.toLocaleString()}
              subtitle="Instructor-endorsed"
              icon="✅"
              color="blue"
            />
            <StatCard
              title="Total Upvotes"
              value={stats.totalUpvotes.toLocaleString()}
              subtitle="Community votes"
              icon="👍"
              color="gold"
            />
            <StatCard
              title="Avg Active Weeks"
              value={stats.avgActiveWeeks.toFixed(1)}
              subtitle="Per student"
              icon="📅"
              color="green"
            />
          </div>
        )}

        {/* Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sentiment Analysis Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">📊 Sentiment Analysis</h2>
            <p className="text-gray-600 mb-4">
              Using DistilBERT to classify student comments as positive, neutral, or negative.
              Helps identify students who may be struggling or frustrated.
            </p>
            <div className="bg-[#003057]/10 rounded-lg p-4">
              <p className="text-sm text-[#003057]">
                <strong>Model Accuracy:</strong> 72.4%
              </p>
              <p className="text-sm text-[#003057]/70 mt-1">
                Trained on 1,000 manually labeled forum comments
              </p>
            </div>
            <Link
              to="/sentiment"
              className="inline-block mt-4 text-[#003057] font-medium hover:text-[#B3A369]"
            >
              View Sentiment Analysis →
            </Link>
          </div>

          {/* Grade Prediction Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">📈 Grade Prediction</h2>
            <p className="text-gray-600 mb-4">
              Using Gradient Boosting to predict student grades based on forum participation
              patterns, post quality, and engagement timing.
            </p>
            <div className="bg-[#B3A369]/20 rounded-lg p-4">
              <p className="text-sm text-[#003057]">
                <strong>Model R²:</strong> 0.153 (explains 15.3% of variance)
              </p>
              <p className="text-sm text-[#003057]/70 mt-1">
                Key predictors: topic entropy, active weeks, comment length
              </p>
            </div>
            <Link
              to="/grades"
              className="inline-block mt-4 text-[#003057] font-medium hover:text-[#B3A369]"
            >
              View Grade Predictions →
            </Link>
          </div>

          {/* Topic Modeling Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">🏷️ Topic Modeling</h2>
            <p className="text-gray-600 mb-4">
              Discovering discussion themes using LDA topic modeling. Understand what students
              are talking about most.
            </p>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <p className="text-sm text-green-800">
                <strong>Topics Identified:</strong> 3 categories
              </p>
              <p className="text-sm text-green-700 mt-1">
                Programming concepts, course logistics, debugging
              </p>
            </div>
            <Link
              to="/topics"
              className="inline-block mt-4 text-[#003057] font-medium hover:text-[#B3A369]"
            >
              View Topic Analysis →
            </Link>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">ℹ️ About This Dashboard</h2>
          <p className="text-gray-600">
            This dashboard is part of the Georgia Tech VIP Data Driven Education project. It helps
            instructors understand student engagement in online discussion forums and identify
            students who may need additional support. The data comes from CS1301 (Introduction to
            Computing) courses on EdX — Spring 2017 and Spring 2018 runs.
          </p>
        </div>

        {/* Quick Navigation */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/"
            className="bg-[#003057] text-white rounded-xl p-4 text-center hover:bg-[#003057]/90 transition-colors"
          >
            <span className="text-2xl block mb-2">🏠</span>
            <span className="font-medium">Home</span>
          </Link>
          <Link
            to="/sentiment"
            className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl block mb-2">😊</span>
            <span className="font-medium text-gray-900">Sentiment</span>
          </Link>
          <Link
            to="/grades"
            className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl block mb-2">📈</span>
            <span className="font-medium text-gray-900">Grades</span>
          </Link>
          <Link
            to="/topics"
            className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl block mb-2">🏷️</span>
            <span className="font-medium text-gray-900">Topics</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  subtitle,
  icon,
  color,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
  color: "blue" | "green" | "gold";
}) {
  const colorClasses = {
    blue: "bg-[#003057]/10 border-[#003057]/20",
    green: "bg-green-50 border-green-200",
    gold: "bg-[#B3A369]/20 border-[#B3A369]/40",
  };

  const valueColors = {
    blue: "text-[#003057]",
    green: "text-green-600",
    gold: "text-[#8a7a40]",
  };

  return (
    <div className={`rounded-xl border p-6 ${colorClasses[color]}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="text-sm font-medium text-gray-600">{title}</p>
      <p className={`text-3xl font-bold mt-1 ${valueColors[color]}`}>{value}</p>
      <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
}