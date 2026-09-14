import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/home";
import { useAuth } from "~/components/AuthContext";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Discussion Forum Dashboard | Instructor Sign In" },
    { name: "description", content: "Instructor access to student forum analytics" },
  ];
}

const ANALYTICS_TABS = [
  {
    to: "/sentiment",
    label: "Sentiment Analysis",
    eyebrow: "01",
    description: "Explore how students feel across forum posts, with sentiment labels, confidence scores, and course-level distributions.",
    accent: "#10b981",
  },
  {
    to: "/sentiment",
    label: "Cognitive Presence",
    eyebrow: "02",
    description: "Trace discussion through triggering events, exploration, integration, and resolution using the CP phase predictions.",
    accent: "#6366f1",
  },
  {
    to: "/topics",
    label: "Topic Modeling",
    eyebrow: "03",
    description: "Understand what students are discussing through themes, relevant terms, and instructor-facing insights.",
    accent: "#B3A369",
  },
];

export default function Home() {
  const { isAuthenticated, login, loginWithSSO, logout } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [ssoMessage, setSsoMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSsoMessage("");

    if (!login(username, password)) {
      setError("That username or password does not match the demo credentials.");
      return;
    }

    setError("");
    setPassword("");
  };

  const handleSSO = () => {
    loginWithSSO();
    setError("");
    setSsoMessage("Demo SSO sign-in complete. Your analytics workspaces are unlocked.");
  };

  return (
    <main className="min-h-[calc(100vh-89px)] bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
          <section className="relative overflow-hidden rounded-3xl bg-[#003057] px-7 py-9 text-white shadow-xl lg:px-12 lg:py-12">
            <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border-[28px] border-[#B3A369]/20" />
            <div className="absolute -bottom-28 -left-16 h-64 w-64 rounded-full border-[20px] border-white/5" />
            <div className="relative flex h-full flex-col justify-between gap-14">
              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#B3A369]">
                  Georgia Tech · Data Driven Education
                </p>
                <h1 className="max-w-xl text-4xl font-bold leading-tight sm:text-5xl">
                  See the story behind every discussion.
                </h1>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
                  An instructor workspace for understanding student engagement in Georgia Tech EdX forums and turning discussion data into useful insight.
                </p>
              </div>

              <div className="grid max-w-lg grid-cols-3 gap-3 border-t border-white/15 pt-6">
                {[
                  ["SA", "Sentiment"],
                  ["CP", "Presence"],
                  ["LDA", "Topics"],
                ].map(([short, label]) => (
                  <div key={short}>
                    <p className="text-xl font-bold text-[#B3A369]">{short}</p>
                    <p className="mt-1 text-xs text-white/55">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-lg sm:p-9">
            {isAuthenticated ? (
              <div className="flex h-full flex-col justify-between gap-10">
                <div>
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m5 12 4 4L19 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">Access granted</p>
                  <h2 className="mt-2 text-2xl font-bold text-[#003057]">Welcome to your dashboard.</h2>
                  <p className="mt-3 text-sm leading-relaxed text-gray-500">
                    Your analytics workspaces are ready. Choose an area below to begin exploring the data.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={logout}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-600 transition-colors hover:border-[#003057] hover:text-[#003057]"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B3A369]">Instructor portal</p>
                <h2 className="mt-2 text-2xl font-bold text-[#003057]">Sign in to continue</h2>
                <p className="mt-3 text-sm leading-relaxed text-gray-500">
                  Use your dashboard credentials to access student engagement analytics.
                </p>

                <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                  <div>
                    <label htmlFor="username" className="mb-1.5 block text-xs font-semibold text-gray-700">Username</label>
                    <input
                      id="username"
                      name="username"
                      value={username}
                      onChange={(event) => { setUsername(event.target.value); setError(""); }}
                      autoComplete="username"
                      placeholder="Enter your username"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#003057] focus:ring-2 focus:ring-[#003057]/10"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="mb-1.5 block text-xs font-semibold text-gray-700">Password</label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={(event) => { setPassword(event.target.value); setError(""); }}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#003057] focus:ring-2 focus:ring-[#003057]/10"
                    />
                  </div>

                  {error && <p role="alert" className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700">{error}</p>}

                  <button type="submit" className="w-full rounded-xl bg-[#003057] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#004477]">
                    Sign in
                  </button>
                </form>

                <div className="my-6 flex items-center gap-3">
                  <div className="h-px flex-1 bg-gray-200" />
                  <span className="text-[11px] font-medium uppercase tracking-wider text-gray-400">or</span>
                  <div className="h-px flex-1 bg-gray-200" />
                </div>

                <button
                  type="button"
                  onClick={handleSSO}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#003057] px-4 py-3 text-sm font-semibold text-[#003057] transition hover:bg-[#003057]/5"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-[#B3A369] text-[10px] font-black text-[#003057]">GT</span>
                  Continue with Georgia Tech SSO
                </button>
                <p className="mt-3 text-center text-[11px] text-gray-400">SSO is a front-end demo for now.</p>
                {ssoMessage && <p role="status" className="mt-3 text-center text-xs font-medium text-emerald-600">{ssoMessage}</p>}

                <div className="mt-6 rounded-xl bg-gray-50 px-4 py-3 text-xs text-gray-500">
                  <span className="font-semibold text-gray-700">Demo access:</span> sagshiker3 / cll4699
                </div>
              </div>
            )}
          </section>
        </div>

        <section className="mt-12">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B3A369]">Explore the workspace</p>
              <h2 className="mt-1 text-2xl font-bold text-[#003057]">Instructor analytics</h2>
            </div>
            {!isAuthenticated && <p className="text-right text-xs text-gray-400">Sign in to unlock each workspace</p>}
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {ANALYTICS_TABS.map((tab) => (
              <AnalyticsCard key={tab.label} {...tab} isAuthenticated={isAuthenticated} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function AnalyticsCard({
  to,
  label,
  eyebrow,
  description,
  accent,
  isAuthenticated,
}: {
  to: string;
  label: string;
  eyebrow: string;
  description: string;
  accent: string;
  isAuthenticated: boolean;
}) {
  const content = (
    <>
      <div className="mb-5 flex items-center justify-between">
        <span className="text-xs font-bold tracking-[0.2em] text-gray-400">{eyebrow}</span>
        {isAuthenticated && (
          <span className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: `${accent}18`, color: accent }}>
            →
          </span>
        )}
      </div>
      <h3 className="text-base font-bold text-[#003057]">{label}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-500">{description}</p>
      <p className="mt-5 text-xs font-semibold" style={{ color: accent }}>
        {isAuthenticated ? "Open workspace →" : "Sign in required"}
      </p>
    </>
  );

  if (!isAuthenticated) {
    return (
      <div className="cursor-not-allowed rounded-2xl border border-dashed border-gray-200 bg-white p-6 opacity-75" aria-disabled="true" title="Sign in to access this workspace">
        {content}
      </div>
    );
  }

  return (
    <Link to={to} className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#003057] hover:shadow-md">
      {content}
    </Link>
  );
}
