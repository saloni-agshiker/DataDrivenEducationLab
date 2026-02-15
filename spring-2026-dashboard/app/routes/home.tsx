import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Discussion Forum Dashboard | Home" },
    { name: "description", content: "Overview of student forum analytics" },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-2">
            Analyze student engagement and predict academic success from EdX discussion forums.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Comments"
            value="1,247"
            subtitle="From CS1301 forums"
            icon="💬"
            color="blue"
          />
          <StatCard
            title="Positive Sentiment"
            value="42%"
            subtitle="523 comments"
            icon="😊"
            color="green"
          />
          <StatCard
            title="Neutral Sentiment"
            value="51%"
            subtitle="636 comments"
            icon="😐"
            color="gray"
          />
          <StatCard
            title="Negative Sentiment"
            value="7%"
            subtitle="88 comments"
            icon="😟"
            color="red"
          />
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sentiment Analysis Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              📊 Sentiment Analysis
            </h2>
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
            <a
              href="/sentiment"
              className="inline-block mt-4 text-[#003057] font-medium hover:text-[#B3A369]"
            >
              View Sentiment Analysis →
            </a>
          </div>

          {/* Grade Prediction Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              📈 Grade Prediction
            </h2>
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
            <a
              href="/grades"
              className="inline-block mt-4 text-[#003057] font-medium hover:text-[#B3A369]"
            >
              View Grade Predictions →
            </a>
          </div>

          {/* Topic Modeling Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              🏷️ Topic Modeling
            </h2>
            <p className="text-gray-600 mb-4">
              Discovering discussion themes using LDA topic modeling.
              Understand what students are talking about most.
            </p>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <p className="text-sm text-green-800">
                <strong>Topics Identified:</strong> 3 categories
              </p>
              <p className="text-sm text-green-700 mt-1">
                Programming concepts, course logistics, debugging
              </p>
            </div>
            <a
              href="/topics"
              className="inline-block mt-4 text-[#003057] font-medium hover:text-[#B3A369]"
            >
              View Topic Analysis →
            </a>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            ℹ️ About This Dashboard
          </h2>
          <p className="text-gray-600">
            This dashboard is part of the Georgia Tech VIP Data Driven Education project.
            It helps instructors understand student engagement in online discussion forums
            and identify students who may need additional support. The data comes from
            CS1301 (Introduction to Computing) courses on EdX.
          </p>
        </div>

        {/* Quick Navigation */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <a
            href="/"
            className="bg-[#003057] text-white rounded-xl p-4 text-center hover:bg-[#003057]/90 transition-colors"
          >
            <span className="text-2xl block mb-2">🏠</span>
            <span className="font-medium">Home</span>
          </a>
          <a
            href="/sentiment"
            className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl block mb-2">😊</span>
            <span className="font-medium text-gray-900">Sentiment</span>
          </a>
          <a
            href="/grades"
            className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl block mb-2">📈</span>
            <span className="font-medium text-gray-900">Grades</span>
          </a>
          <a
            href="/topics"
            className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl block mb-2">🏷️</span>
            <span className="font-medium text-gray-900">Topics</span>
          </a>
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
  icon,
  color,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
  color: "blue" | "green" | "gray" | "red";
}) {
  const colorClasses = {
    blue: "bg-[#003057]/10 border-[#003057]/20",
    green: "bg-green-50 border-green-200",
    gray: "bg-gray-50 border-gray-200",
    red: "bg-red-50 border-red-200",
  };

  const valueColors = {
    blue: "text-[#003057]",
    green: "text-green-600",
    gray: "text-gray-600",
    red: "text-red-600",
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