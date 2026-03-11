import { Link } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Discussion Forum Dashboard | Home" },
    { name: "description", content: "Overview of student forum analytics" },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-8 py-16">

        {/* Hero */}
        <div className="mb-16">
          <p className="text-xs font-semibold tracking-widest text-[#B3A369] uppercase mb-3">
            Georgia Tech · Data Driven Education
          </p>
          <h1 className="text-5xl font-bold text-[#003057] leading-tight mb-4">
            Discussion Forum<br />Dashboard
          </h1>
          <p className="text-gray-500 text-lg max-w-xl">
            Analyzing student engagement in Georgia Tech EdX forums to surface insights and predict academic outcomes.
          </p>
        </div>

        {/* Nav cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <NavCard
            to="/sentiment"
            label="Sentiment Analysis"
            description="Explore how students feel across forum posts. Each post is classified as positive, neutral, or negative using a fine-tuned DistilBERT model, with confidence scores and per-course breakdowns."
          />
          <NavCard
            to="/grades"
            label="Grade Prediction"
            description="See how forum participation correlates with academic performance. A Gradient Boosting model predicts final grades from behavioral features like post frequency, endorsements, and active weeks."
          />
          <NavCard
            to="/topics"
            label="Topic Modeling"
            description="Understand what students are discussing. LDA topic modeling groups posts into themes — programming concepts, course logistics, and debugging — with keyword breakdowns and post samples."
          />
        </div>

      </div>
    </div>
  );
}

function NavCard({ to, label, description }: {
  to: string;
  label: string;
  description: string;
}) {
  return (
    <Link
      to={to}
      className="group block border border-gray-200 rounded-2xl p-6 hover:border-[#003057] hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-3">
        <h2 className="text-sm font-semibold text-[#003057]">{label}</h2>
        <span className="text-gray-300 group-hover:text-[#003057] transition-colors text-lg leading-none">→</span>
      </div>
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
    </Link>
  );
}