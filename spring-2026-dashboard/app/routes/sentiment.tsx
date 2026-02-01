import { useState } from "react";

// Sample data - replace with real data from your team
const sampleComments = [
  {
    id: 1,
    text: "Awesome and thanks you so much. It worked!",
    sentiment: "positive" as const,
    confidence: 0.92,
    user_id: 5710,
  },
  {
    id: 2,
    text: "I have been stuck on this problem for hours and nothing seems to work.",
    sentiment: "negative" as const,
    confidence: 0.87,
    user_id: 30786,
  },
  {
    id: 3,
    text: "The assignment is due on Friday according to the syllabus.",
    sentiment: "neutral" as const,
    confidence: 0.95,
    user_id: 69478,
  },
  {
    id: 4,
    text: "Thanks, I had figured out that part but I did not describe clearly.",
    sentiment: "neutral" as const,
    confidence: 0.78,
    user_id: 12345,
  },
  {
    id: 5,
    text: "This course is excellent! I'm learning so much.",
    sentiment: "positive" as const,
    confidence: 0.94,
    user_id: 67890,
  },
  {
    id: 6,
    text: "The instructions are confusing and I don't understand what to do.",
    sentiment: "negative" as const,
    confidence: 0.82,
    user_id: 11111,
  },
  {
    id: 7,
    text: "You're welcome! Happy to help.",
    sentiment: "positive" as const,
    confidence: 0.96,
    user_id: 22222,
  },
  {
    id: 8,
    text: "The secret was just about using math.e as a mathematical constant.",
    sentiment: "neutral" as const,
    confidence: 0.88,
    user_id: 33333,
  },
];

export function meta() {
  return [
    { title: "Sentiment Analysis | Discussion Forum Dashboard" },
    { name: "description", content: "Analyze sentiment of student forum comments" },
  ];
}

export default function Sentiment() {
  const [selectedSentiment, setSelectedSentiment] = useState<string>("all");

  const filteredComments =
    selectedSentiment === "all"
      ? sampleComments
      : sampleComments.filter((c) => c.sentiment === selectedSentiment);

  const sentimentCounts = {
    positive: sampleComments.filter((c) => c.sentiment === "positive").length,
    neutral: sampleComments.filter((c) => c.sentiment === "neutral").length,
    negative: sampleComments.filter((c) => c.sentiment === "negative").length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Sentiment Analysis</h1>
          <p className="text-gray-600 mt-2">
            DistilBERT model classifies student comments as positive, neutral, or negative.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <SentimentCard
            label="Positive"
            count={sentimentCounts.positive}
            total={sampleComments.length}
            color="green"
            emoji="😊"
          />
          <SentimentCard
            label="Neutral"
            count={sentimentCounts.neutral}
            total={sampleComments.length}
            color="gray"
            emoji="😐"
          />
          <SentimentCard
            label="Negative"
            count={sentimentCounts.negative}
            total={sampleComments.length}
            color="red"
            emoji="😟"
          />
        </div>

        {/* Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center gap-4">
            <span className="font-medium text-gray-700">Filter by sentiment:</span>
            <div className="flex gap-2">
              {["all", "positive", "neutral", "negative"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedSentiment(filter)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedSentiment === filter
                      ? "bg-[#003057] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-[#B3A369]/30"
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Comments Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Forum Comments ({filteredComments.length})
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredComments.map((comment) => (
              <div key={comment.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-gray-900">{comment.text}</p>
                    <p className="text-sm text-gray-500 mt-1">User ID: {comment.user_id}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <SentimentBadge sentiment={comment.sentiment} />
                    <span className="text-sm text-gray-500">
                      {(comment.confidence * 100).toFixed(0)}% confidence
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Model Info */}
        <div className="mt-8 bg-[#003057]/10 rounded-xl border border-[#003057]/20 p-6">
          <h3 className="font-semibold text-[#003057] mb-2">About the Model</h3>
          <ul className="text-sm text-[#003057]/80 space-y-1">
            <li>• <strong>Model:</strong> DistilBERT (fine-tuned)</li>
            <li>• <strong>Accuracy:</strong> 72.4% overall</li>
            <li>• <strong>Training data:</strong> 1,000 manually labeled comments</li>
            <li>• <strong>Labels:</strong> Positive (3), Neutral (2), Negative (1)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Sentiment Card Component
function SentimentCard({
  label,
  count,
  total,
  color,
  emoji,
}: {
  label: string;
  count: number;
  total: number;
  color: "green" | "gray" | "red";
  emoji: string;
}) {
  const percentage = ((count / total) * 100).toFixed(0);

  const colorClasses = {
    green: "bg-green-50 border-green-200",
    gray: "bg-gray-50 border-gray-200",
    red: "bg-red-50 border-red-200",
  };

  const textColors = {
    green: "text-green-600",
    gray: "text-gray-600",
    red: "text-red-600",
  };

  const barColors = {
    green: "bg-green-500",
    gray: "bg-gray-500",
    red: "bg-red-500",
  };

  return (
    <div className={`rounded-xl border p-5 ${colorClasses[color]}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium text-gray-700">{label}</span>
        <span className="text-2xl">{emoji}</span>
      </div>
      <p className={`text-3xl font-bold ${textColors[color]}`}>{count}</p>
      <div className="mt-2">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${barColors[color]} transition-all`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-1">{percentage}% of total</p>
      </div>
    </div>
  );
}

// Sentiment Badge Component
function SentimentBadge({ sentiment }: { sentiment: "positive" | "neutral" | "negative" }) {
  const classes = {
    positive: "bg-green-100 text-green-800",
    neutral: "bg-gray-100 text-gray-800",
    negative: "bg-red-100 text-red-800",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${classes[sentiment]}`}>
      {sentiment.toUpperCase()}
    </span>
  );
}