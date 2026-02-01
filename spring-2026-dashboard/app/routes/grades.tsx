import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
    ReferenceLine,
  } from "recharts";
  
  // Sample data - replace with real data from your team
  const studentData = [
    { user_id: 5710, actual: 0.85, predicted: 0.82, active_weeks: 4, avg_comment_len: 182, posts: 7 },
    { user_id: 30786, actual: 1.0, predicted: 0.94, active_weeks: 8, avg_comment_len: 101, posts: 19 },
    { user_id: 69478, actual: 0.59, predicted: 0.65, active_weeks: 1, avg_comment_len: 632, posts: 4 },
    { user_id: 12345, actual: 0.72, predicted: 0.70, active_weeks: 5, avg_comment_len: 150, posts: 12 },
    { user_id: 67890, actual: 0.91, predicted: 0.88, active_weeks: 7, avg_comment_len: 200, posts: 15 },
    { user_id: 11111, actual: 0.45, predicted: 0.52, active_weeks: 2, avg_comment_len: 80, posts: 3 },
    { user_id: 22222, actual: 0.78, predicted: 0.75, active_weeks: 6, avg_comment_len: 175, posts: 10 },
    { user_id: 33333, actual: 0.88, predicted: 0.85, active_weeks: 6, avg_comment_len: 220, posts: 14 },
    { user_id: 44444, actual: 0.65, predicted: 0.68, active_weeks: 3, avg_comment_len: 95, posts: 6 },
    { user_id: 55555, actual: 0.95, predicted: 0.91, active_weeks: 8, avg_comment_len: 250, posts: 20 },
  ];
  
  const featureImportance = [
    { name: "topic_x_entropy", importance: 0.1186, category: "Semantic" },
    { name: "topic_x_active", importance: 0.0995, category: "Interaction" },
    { name: "avg_comment_len", importance: 0.0829, category: "Text" },
    { name: "local_topic_entropy", importance: 0.0793, category: "Semantic" },
    { name: "dist_to_centroid", importance: 0.065, category: "Semantic" },
    { name: "active_weeks", importance: 0.062, category: "Temporal" },
    { name: "early_activity_index", importance: 0.058, category: "Temporal" },
    { name: "replies_made", importance: 0.052, category: "Behavioral" },
    { name: "threads_posted", importance: 0.048, category: "Behavioral" },
    { name: "upvotes_per_post", importance: 0.042, category: "Interaction" },
  ];
  
  const categoryColors: Record<string, string> = {
    Semantic: "#003057",      // Navy Blue
    Interaction: "#B3A369",   // Tech Gold
    Text: "#22c55e",          // Green
    Temporal: "#3b82f6",      // Blue
    Behavioral: "#ef4444",    // Red
  };
  
  export function meta() {
    return [
      { title: "Grade Prediction | Discussion Forum Dashboard" },
      { name: "description", content: "Predict student grades from forum behavior" },
    ];
  }
  
  export default function Grades() {
    // Calculate R² (simplified - using the sample data)
    const r2 = 0.153;
    const mae = 0.049;
  
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Grade Prediction</h1>
            <p className="text-gray-600 mt-2">
              Gradient Boosting model predicts student grades based on forum participation patterns.
            </p>
          </div>
  
          {/* Model Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <StatCard title="R² Score" value={r2.toFixed(3)} subtitle="Variance explained" />
            <StatCard title="MAE" value={mae.toFixed(3)} subtitle="Mean Absolute Error" />
            <StatCard title="Students" value={studentData.length.toString()} subtitle="In dataset" />
            <StatCard title="Features" value={featureImportance.length.toString()} subtitle="Input variables" />
          </div>
  
          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Scatter Plot */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Actual vs Predicted Grades
              </h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      type="number"
                      dataKey="actual"
                      name="Actual Grade"
                      domain={[0, 1]}
                      tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
                      label={{ value: "Actual Grade", position: "bottom", offset: 0 }}
                    />
                    <YAxis
                      type="number"
                      dataKey="predicted"
                      name="Predicted Grade"
                      domain={[0, 1]}
                      tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
                      label={{ value: "Predicted Grade", angle: -90, position: "left" }}
                    />
                    <Tooltip
                      content={({ payload }) => {
                        if (payload && payload.length > 0) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white p-3 rounded-lg shadow-lg border">
                              <p className="font-medium">Student {data.user_id}</p>
                              <p className="text-sm text-gray-600">
                                Actual: {(data.actual * 100).toFixed(1)}%
                              </p>
                              <p className="text-sm text-gray-600">
                                Predicted: {(data.predicted * 100).toFixed(1)}%
                              </p>
                              <p className="text-sm text-gray-500 mt-1">
                                Active weeks: {data.active_weeks}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <ReferenceLine
                      segment={[{ x: 0, y: 0 }, { x: 1, y: 1 }]}
                      stroke="#9ca3af"
                      strokeDasharray="5 5"
                      label={{ value: "Perfect prediction", position: "insideTopLeft" }}
                    />
                    <Scatter name="Students" data={studentData} fill="#B3A369" fillOpacity={0.8} />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-gray-500 mt-2 text-center">
                Points closer to the diagonal line = more accurate predictions
              </p>
            </div>
  
            {/* Feature Importance */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Feature Importance
              </h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={featureImportance}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      type="number"
                      domain={[0, 0.15]}
                      tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
                    />
                    <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 12 }} />
                    <Tooltip
                      formatter={(value: number) => `${(value * 100).toFixed(2)}%`}
                      labelFormatter={(label) => `Feature: ${label}`}
                    />
                    <Bar dataKey="importance" radius={[0, 4, 4, 0]}>
                      {featureImportance.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={categoryColors[entry.category]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              {/* Legend */}
              <div className="flex flex-wrap gap-4 mt-4 justify-center">
                {Object.entries(categoryColors).map(([category, color]) => (
                  <div key={category} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: color }} />
                    <span className="text-sm text-gray-600">{category}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
  
          {/* Student Details Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Student Details</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      User ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actual Grade
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Predicted Grade
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Difference
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Active Weeks
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Total Posts
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {studentData.map((student) => {
                    const diff = student.predicted - student.actual;
                    return (
                      <tr key={student.user_id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {student.user_id}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {(student.actual * 100).toFixed(1)}%
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {(student.predicted * 100).toFixed(1)}%
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`font-medium ${
                              Math.abs(diff) < 0.05
                                ? "text-green-600"
                                : Math.abs(diff) < 0.1
                                ? "text-yellow-600"
                                : "text-red-600"
                            }`}
                          >
                            {diff > 0 ? "+" : ""}
                            {(diff * 100).toFixed(1)}%
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">{student.active_weeks}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{student.posts}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
  
          {/* Model Info */}
          <div className="mt-8 bg-[#B3A369]/20 rounded-xl border border-[#B3A369]/40 p-6">
            <h3 className="font-semibold text-[#003057] mb-2">About the Model</h3>
            <ul className="text-sm text-[#003057]/80 space-y-1">
              <li>• <strong>Model:</strong> Gradient Boosting Regressor</li>
              <li>• <strong>Training R²:</strong> 0.96 (overfitting observed)</li>
              <li>• <strong>Test R²:</strong> 0.153</li>
              <li>• <strong>Top predictor:</strong> topic_x_entropy (topic diversity)</li>
              <li>• <strong>Data:</strong> CS1301 courses from 2017-2018</li>
            </ul>
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