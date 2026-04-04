import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface Topic {
  id: number;
  name: string;
  shortName: string;
  description: string;
  color: string;
  tokenPct: number;
  top30Terms: string[];
  aiSummary: string;
  instructorInsight: string;
}

// All data sourced directly from LDA model chart image
const topicData: Topic[] = [
  {
    id: 1,
    name: "Key Programming Concepts",
    shortName: "Programming Concepts",
    description: "Discussions about fundamental programming concepts, Python syntax, and core CS principles",
    color: "#003057",
    tokenPct: 41.3,
    top30Terms: [
      "code", "return", "print", "line", "string", "answer", "result",
      "value", "function", "variable", "true", "number", "correct", "def",
      "one", "list", "statement", "problem", "error", "wrong", "loop",
      "first", "else", "elif", "output", "character", "try", "mysteryvalue",
      "use", "question",
    ],
    aiSummary: "Students are asking about core Python constructs — functions, loops, conditionals, and data types — indicating this is where most learning activity is concentrated.",
    instructorInsight: "Consider reinforcing fundamentals with additional practice exercises and visual demonstrations of how control flow and data structures work.",
  },
  {
    id: 2,
    name: "General Course Logistics & Assignments",
    shortName: "Course Logistics",
    description: "Questions about course structure, assignment deadlines, grading, and platform navigation",
    color: "#B3A369",
    tokenPct: 32.1,
    top30Terms: [
      "course", "problem", "time", "python", "question", "exercise", "page",
      "use", "one", "work", "help", "edx", "score", "dont", "class", "hour",
      "exam", "good", "live", "access", "find", "much", "assignment",
      "smartbook", "really", "also", "think", "first", "video", "point",
    ],
    aiSummary: "Students are frequently asking about course navigation, platform tools (edX, Smartbook), exams, and assignments — suggesting friction with course logistics.",
    instructorInsight: "A pinned FAQ or weekly logistics post addressing the most common questions about scores, access, and deadlines could meaningfully reduce this topic's volume.",
  },
  {
    id: 3,
    name: "Code Debugging & Troubleshooting",
    shortName: "Debugging",
    description: "Students seeking help with errors, bugs, and troubleshooting their code",
    color: "#54585A",
    tokenPct: 26.5,
    top30Terms: [
      "code", "problem", "error", "awscom", "result", "exercise", "run",
      "png", "answer", "help", "coding", "line", "output", "submit", "test",
      "file", "return", "wrong", "num", "work", "expected", "getting",
      "however", "show", "following", "issue", "tried", "one", "true", "try",
    ],
    aiSummary: "Students are hitting runtime errors and submission issues, with terms like 'expected', 'getting', 'tried', and 'wrong' suggesting they're comparing expected vs. actual output.",
    instructorInsight: "Explicit walkthroughs of common error patterns and a debugging checklist could reduce the volume of one-off help requests in this topic.",
  },
];

export function meta() {
  return [
    { title: "Topic Modeling | Discussion Forum Dashboard" },
    { name: "description", content: "LDA Topic Modeling Analysis - Key discussion themes" },
  ];
}

export default function Topics() {
  const [expandedTopics, setExpandedTopics] = useState<Set<number>>(new Set());

  const toggleExpanded = (topicId: number) => {
    setExpandedTopics((prev) => {
      const next = new Set(prev);
      next.has(topicId) ? next.delete(topicId) : next.add(topicId);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Topic Modeling</h1>
          <p className="text-gray-600 mt-2">
            LDA model on the actual CS 1301 Ed Discussion dataset — 3 topics identified.
          </p>
        </div>

        {/* Token % banner */}
        <div className="bg-[#003057] text-white rounded-xl p-6 mb-8">
          <div className="flex items-start justify-between flex-wrap gap-2 mb-1">
            <h2 className="text-xl font-bold">🏷️ LDA Topic Distribution</h2>
            <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-white/60">
              Token % from LDA model · CS 1301 Ed dataset
            </span>
          </div>
          <p className="text-sm text-white/50 mb-5">
            Percentages reflect each topic's share of total tokens in the LDA model output.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topicData.map((topic, index) => (
              <div key={topic.id} className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl font-bold text-[#B3A369]">#{index + 1}</span>
                  <span className="font-medium text-sm">{topic.shortName}</span>
                </div>
                <div className="flex items-end justify-between mb-1">
                  <span className="text-3xl font-bold">{topic.tokenPct}%</span>
                  <span className="text-xs text-white/50 pb-1">of tokens</span>
                </div>
                <div className="h-2 rounded-full bg-white/20 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#B3A369]"
                    style={{ width: `${topic.tokenPct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Topic cards */}
        <div className="space-y-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900">Topic Analysis</h2>
          {topicData.map((topic, index) => (
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
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="text-lg font-semibold text-gray-900">{topic.name}</h3>
                        <span
                          className="px-2 py-0.5 rounded-full text-xs font-semibold text-white"
                          style={{ backgroundColor: topic.color }}
                        >
                          {topic.tokenPct}% of tokens
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm">{topic.description}</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors ml-2 shrink-0">
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
                    <span className="text-blue-600">🤖</span>
                    <div>
                      <p className="text-sm font-medium text-blue-800 mb-1">AI Summary</p>
                      <p className="text-sm text-blue-700">{topic.aiSummary}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <span className="text-amber-600">💡</span>
                    <div>
                      <p className="text-sm font-medium text-amber-800 mb-1">Instructor Insight</p>
                      <p className="text-sm text-amber-700">{topic.instructorInsight}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded: top-30 terms */}
              {expandedTopics.has(topic.id) && (
                <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">
                    📋 Top 30 Most Relevant Terms
                    <span className="ml-2 font-normal text-gray-400 text-xs">from LDA model · ranked by relevance</span>
                  </h4>
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
                        <span className="text-xs opacity-50 mr-1">{i + 1}.</span>
                        {term}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Token % bar chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-1">
            <h2 className="text-lg font-semibold text-gray-900">Token Share by Topic</h2>
            <span className="text-xs text-gray-400">From LDA model</span>
          </div>
          <p className="text-xs text-gray-400 mb-4">Share of total tokens assigned to each topic</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topicData.map(t => ({ name: t.shortName, tokenPct: t.tokenPct, color: t.color }))}
                margin={{ top: 10, right: 20, left: 0, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-15} textAnchor="end" tick={{ fontSize: 11 }} interval={0} />
                <YAxis unit="%" domain={[0, 50]} />
                <Tooltip formatter={(v: number) => [`${v}%`, "Token share"]} />
                <Bar dataKey="tokenPct" name="Token %" radius={[4, 4, 0, 0]}>
                  {topicData.map((t, i) => <Cell key={i} fill={t.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}