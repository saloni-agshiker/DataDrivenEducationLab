import React, { useState, useEffect, useMemo } from "react";

// ── Types ────────────────────────────────────────────────────────────────────
export function meta() {
  return [{ title: "Sentiment | Discussion Forum Dashboard" }];
}

interface LabelledRow {
  text: string;
  source: string;
  true_sentiment_label: number; // -1 = masked
  true_cp_label: number;        // -1 = masked
  predicted_sentiment: "positive" | "neutral" | "negative";
  sentiment_score: number;      // [0.33, 1.0]
  predicted_cp_code: number;    // 0 = none, 1-4 = phase
  predicted_cp_name: string;
  cp_score: number;             // [0.2, 1.0]
}

interface UnlabelledRow {
  text: string;
  predicted_sentiment: "positive" | "neutral" | "negative";
  sentiment_score: number;
  predicted_cp_code: number;
  predicted_cp_name: string;
  cp_score: number;
}

type AnyRow = (LabelledRow | UnlabelledRow) & { _ds: "labelled" | "unlabelled" };

// ── Constants ────────────────────────────────────────────────────────────────

const LABEL_HEX = {
  positive: { bar: "#10b981", badgeBg: "#d1fae5", badgeText: "#065f46", text: "#065f46", border: "#6ee7b7", cardBg: "#ecfdf5" },
  neutral:  { bar: "#94a3b8", badgeBg: "#f1f5f9", badgeText: "#334155", text: "#475569", border: "#cbd5e1", cardBg: "#f8fafc" },
  negative: { bar: "#f43f5e", badgeBg: "#ffe4e6", badgeText: "#9f1239", text: "#9f1239", border: "#fda4af", cardBg: "#fff1f2" },
} as const;

const CP_COLORS: Record<number, { bar: string; bg: string; text: string; border: string }> = {
  0: { bar: "#94a3b8", bg: "#f8fafc", text: "#475569", border: "#cbd5e1" },
  1: { bar: "#6366f1", bg: "#eef2ff", text: "#3730a3", border: "#a5b4fc" },
  2: { bar: "#f59e0b", bg: "#fffbeb", text: "#92400e", border: "#fcd34d" },
  3: { bar: "#0ea5e9", bg: "#f0f9ff", text: "#075985", border: "#7dd3fc" },
  4: { bar: "#8b5cf6", bg: "#f5f3ff", text: "#5b21b6", border: "#c4b5fd" },
};

const CP_LABEL_MAP: Record<number, string> = {
  0: "None",
  1: "Triggering Event",
  2: "Exploration",
  3: "Integration",
  4: "Resolution",
};

function fmt(n: number, d = 1) { return n.toFixed(d); }

// ── Shared stat helpers ───────────────────────────────────────────────────────

function saStats(rows: { predicted_sentiment: string; sentiment_score: number }[]) {
  const total = rows.length;
  const pos = rows.filter((r) => r.predicted_sentiment === "positive").length;
  const neu = rows.filter((r) => r.predicted_sentiment === "neutral").length;
  const neg = rows.filter((r) => r.predicted_sentiment === "negative").length;
  const avgConf = total ? rows.reduce((a, r) => a + r.sentiment_score, 0) / total : 0;
  const highConf = rows.filter((r) => r.sentiment_score >= 0.9).length;
  return {
    total, pos, neu, neg,
    pos_pct: total ? pos / total * 100 : 0,
    neu_pct: total ? neu / total * 100 : 0,
    neg_pct: total ? neg / total * 100 : 0,
    avgConf, highConf,
    highConf_pct: total ? highConf / total * 100 : 0,
  };
}

function cpStats(rows: { predicted_cp_code: number; cp_score: number }[]) {
  const total = rows.length;
  const counts: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 };
  rows.forEach((r) => { counts[r.predicted_cp_code] = (counts[r.predicted_cp_code] ?? 0) + 1; });
  const cpRows = rows.filter((r) => r.predicted_cp_code > 0);
  const avgConf = cpRows.length ? cpRows.reduce((a, r) => a + r.cp_score, 0) / cpRows.length : 0;
  return { total, counts, cpTotal: cpRows.length, cpPct: total ? cpRows.length / total * 100 : 0, avgConf };
}

// ── Shared UI components ──────────────────────────────────────────────────────

function SentimentBadge({ label }: { label: "positive" | "neutral" | "negative" }) {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
      style={{ backgroundColor: LABEL_HEX[label].badgeBg, color: LABEL_HEX[label].badgeText }}>
      {label.charAt(0).toUpperCase() + label.slice(1)}
    </span>
  );
}

function CPBadge({ code, name }: { code: number; name: string }) {
  const c = CP_COLORS[code] ?? CP_COLORS[0];
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
      style={{ backgroundColor: c.bg, color: c.text, border: `1px solid ${c.border}` }}>
      {code === 0 ? "No CP" : name}
    </span>
  );
}

function StatCard({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</p>
      <p className="text-2xl font-bold mt-0.5" style={{ color: color ?? "#003057" }}>{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  );
}

function DistBar({ pos, neu, neg }: { pos: number; neu: number; neg: number }) {
  return (
    <div className="h-6 rounded-full overflow-hidden flex w-full">
      {([["positive", pos], ["neutral", neu], ["negative", neg]] as const).map(([l, pct]) => (
        <div key={l} className="h-full flex items-center justify-center text-xs font-bold text-white transition-all"
          style={{ width: `${pct}%`, backgroundColor: LABEL_HEX[l].bar }}>
          {pct > 8 ? `${fmt(pct)}%` : ""}
        </div>
      ))}
    </div>
  );
}

function CPDistBar({ counts, total }: { counts: Record<number, number>; total: number }) {
  return (
    <div className="h-6 rounded-full overflow-hidden flex w-full">
      {[0, 1, 2, 3, 4].map((code) => {
        const pct = total ? (counts[code] ?? 0) / total * 100 : 0;
        return (
          <div key={code} className="h-full flex items-center justify-center text-xs font-bold text-white transition-all"
            style={{ width: `${pct}%`, backgroundColor: CP_COLORS[code].bar }}
            title={`${CP_LABEL_MAP[code]}: ${fmt(pct)}%`}>
            {pct > 8 ? `${fmt(pct)}%` : ""}
          </div>
        );
      })}
    </div>
  );
}


function SubTabBar({ tabs, active, onSelect }: {
  tabs: { id: string; label: string }[];
  active: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit mb-5">
      {tabs.map((t) => (
        <button key={t.id} onClick={() => onSelect(t.id)}
          className={`px-4 py-1.5 rounded-md text-xs font-medium transition-colors ${
            active === t.id ? "bg-white text-[#003057] shadow-sm" : "text-gray-500 hover:text-gray-800"
          }`}>
          {t.label}
        </button>
      ))}
    </div>
  );
}

// ── CP phase sentiment bars + comment viewer ──────────────────────────────────

function CPSentimentBars({ rows }: { rows: AnyRow[] }) {
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);
  const [sentFilter, setSentFilter] = useState("all");
  const [page, setPage] = useState(1);
  const PER_PAGE = 20;

  const phaseData = useMemo(() => [0,1,2,3,4].map((code) => {
    const phaseRows = rows.filter((r) => r.predicted_cp_code === code);
    const total = phaseRows.length;
    const pos = phaseRows.filter((r) => r.predicted_sentiment === "positive").length;
    const neu = phaseRows.filter((r) => r.predicted_sentiment === "neutral").length;
    const neg = phaseRows.filter((r) => r.predicted_sentiment === "negative").length;
    return {
      code, total,
      pos_pct: total ? pos / total * 100 : 0,
      neu_pct: total ? neu / total * 100 : 0,
      neg_pct: total ? neg / total * 100 : 0,
      pos, neu, neg,
    };
  }), [rows]);

  const selectedRows = useMemo(() => {
    if (selectedPhase === null) return [];
    let r = rows.filter((p) => p.predicted_cp_code === selectedPhase);
    if (sentFilter !== "all") r = r.filter((p) => p.predicted_sentiment === sentFilter);
    return r;
  }, [rows, selectedPhase, sentFilter]);

  useEffect(() => { setPage(1); }, [selectedPhase, sentFilter]);

  const totalPages = Math.ceil(selectedRows.length / PER_PAGE);
  const paged = selectedRows.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="space-y-2">
      {phaseData.map(({ code, total, pos_pct, neu_pct, neg_pct, pos, neu, neg }) => {
        const c = CP_COLORS[code];
        const isOpen = selectedPhase === code;
        return (
          <div key={code} className="rounded-xl border overflow-hidden transition-all"
            style={{ borderColor: isOpen ? c.bar : "#e5e7eb" }}>
            {/* Phase row — clickable */}
            <button
              className="w-full text-left px-4 py-3 flex items-center gap-4 hover:bg-gray-50 transition-colors"
              onClick={() => { setSelectedPhase(isOpen ? null : code); setSentFilter("all"); }}
            >
              <div className="w-24 shrink-0 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: c.bar }} />
                <div>
                  <p className="text-xs font-semibold" style={{ color: c.text }}>{CP_LABEL_MAP[code]}</p>
                  <p className="text-xs text-gray-400">{total.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex-1 h-5 rounded-full overflow-hidden flex">
                <div className="h-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ width: `${pos_pct}%`, backgroundColor: LABEL_HEX.positive.bar }}>
                  {pos_pct > 10 ? `${fmt(pos_pct)}%` : ""}
                </div>
                <div className="h-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ width: `${neu_pct}%`, backgroundColor: LABEL_HEX.neutral.bar }}>
                  {neu_pct > 10 ? `${fmt(neu_pct)}%` : ""}
                </div>
                <div className="h-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ width: `${neg_pct}%`, backgroundColor: LABEL_HEX.negative.bar }}>
                  {neg_pct > 10 ? `${fmt(neg_pct)}%` : ""}
                </div>
              </div>
              <div className="w-4 shrink-0 text-gray-400 text-xs">{isOpen ? "▲" : "▼"}</div>
            </button>

            {/* Expanded comments */}
            {isOpen && (
              <div className="border-t border-gray-100 bg-gray-50/50">
                {/* Sentiment filter pills */}
                <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-100">
                  <span className="text-xs text-gray-500">Filter:</span>
                  {([["all", "All", total], ["positive", "Positive", pos], ["neutral", "Neutral", neu], ["negative", "Negative", neg]] as [string, string, number][]).map(([val, label, count]) => (
                    <button key={val} onClick={() => setSentFilter(val)}
                      className="px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors"
                      style={sentFilter === val
                        ? { backgroundColor: val === "all" ? "#003057" : LABEL_HEX[val as "positive"|"neutral"|"negative"].bar, color: "white" }
                        : { backgroundColor: "#f3f4f6", color: "#4b5563" }
                      }>
                      {label} ({count.toLocaleString()})
                    </button>
                  ))}
                  <span className="ml-auto text-xs text-gray-400">{selectedRows.length.toLocaleString()} posts</span>
                </div>

                {/* Post list */}
                <div className="divide-y divide-gray-100">
                  {paged.length === 0 && (
                    <p className="text-center text-gray-400 py-8 text-sm">No posts match.</p>
                  )}
                  {paged.map((post, i) => (
                    <div key={i} className="px-4 py-3 hover:bg-white transition-colors border-l-4 bg-white"
                      style={{ borderLeftColor: LABEL_HEX[post.predicted_sentiment].bar }}>
                      <div className="flex items-start gap-3">
                        <p className="flex-1 text-sm text-gray-800 leading-relaxed">
                          {post.text.slice(0, 300)}{post.text.length > 300 ? "…" : ""}
                        </p>
                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <SentimentBadge label={post.predicted_sentiment} />
                          <span className="text-xs text-gray-400">SA {fmt(post.sentiment_score * 100, 1)}%</span>
                          {"source" in post && (
                            <span className="text-xs text-gray-400 capitalize">{(post as LabelledRow).source}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="px-4 py-2.5 border-t border-gray-100 flex items-center justify-between">
                    <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                      className="px-3 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40">
                      Previous
                    </button>
                    <span className="text-xs text-gray-500">Page {page} of {totalPages}</span>
                    <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                      className="px-3 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40">
                      Next
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}

      {/* Legend */}
      <div className="flex gap-4 pt-1">
        {(["positive","neutral","negative"] as const).map((l) => (
          <div key={l} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: LABEL_HEX[l].bar }} />
            <span className="text-xs text-gray-500">{l.charAt(0).toUpperCase()+l.slice(1)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Browse Posts ──────────────────────────────────────────────────────────────

function BrowsePosts({ rows }: { rows: AnyRow[] }) {
  const [labelFilter, setLabelFilter] = useState("all");
  const [cpFilter, setCpFilter] = useState("all");
  const [confMin, setConfMin] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const PER_PAGE = 20;

  const filtered = useMemo(() => {
    let r = rows;
    if (labelFilter !== "all") r = r.filter((p) => p.predicted_sentiment === labelFilter);
    if (cpFilter !== "all") r = r.filter((p) => String(p.predicted_cp_code) === cpFilter);
    r = r.filter((p) => p.sentiment_score * 100 >= confMin);
    return r;
  }, [rows, labelFilter, cpFilter, confMin]);

  useEffect(() => { setCurrentPage(1); }, [labelFilter, cpFilter, confMin]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-3">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">Sentiment:</span>
            <div className="flex gap-1">
              <button onClick={() => setLabelFilter("all")}
                className="px-3 py-1 rounded-lg text-xs font-medium transition-colors"
                style={labelFilter === "all" ? { backgroundColor: "#003057", color: "white" } : { backgroundColor: "#f3f4f6", color: "#4b5563" }}>
                All
              </button>
              {(["positive", "neutral", "negative"] as const).map((l) => (
                <button key={l} onClick={() => setLabelFilter(l)}
                  className="px-3 py-1 rounded-lg text-xs font-medium transition-colors"
                  style={labelFilter === l ? { backgroundColor: LABEL_HEX[l].bar, color: "white" } : { backgroundColor: "#f3f4f6", color: "#4b5563" }}>
                  {l.charAt(0).toUpperCase() + l.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">CP:</span>
            <div className="flex gap-1">
              <button onClick={() => setCpFilter("all")}
                className="px-3 py-1 rounded-lg text-xs font-medium transition-colors"
                style={cpFilter === "all" ? { backgroundColor: "#003057", color: "white" } : { backgroundColor: "#f3f4f6", color: "#4b5563" }}>
                All
              </button>
              {[0,1,2,3,4].map((code) => (
                <button key={code} onClick={() => setCpFilter(String(code))}
                  className="px-3 py-1 rounded-lg text-xs font-medium transition-colors"
                  style={cpFilter === String(code) ? { backgroundColor: CP_COLORS[code].bar, color: "white" } : { backgroundColor: "#f3f4f6", color: "#4b5563" }}>
                  {code === 0 ? "No CP" : `P${code}`}
                </button>
              ))}
            </div>
          </div>

          <span className="ml-auto text-xs text-gray-400">{filtered.length.toLocaleString()} posts</span>
        </div>

        <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
          <span className="text-xs text-gray-500 font-medium">Min SA conf:</span>
          <input type="range" min={33} max={100} value={confMin}
            onChange={(e) => setConfMin(Number(e.target.value))}
            className="w-32 accent-[#003057]" />
          <span className="text-xs font-semibold text-gray-700 w-10">{confMin}%</span>
          {confMin > 33 && (
            <button onClick={() => setConfMin(0)} className="text-xs text-gray-400 hover:text-gray-600 underline">reset</button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-100">
          {paged.length === 0 && (
            <p className="text-center text-gray-400 py-12 text-sm">No posts match your filters.</p>
          )}
          {paged.map((post, i) => (
            <div key={i} className="px-5 py-4 hover:bg-gray-50 transition-colors border-l-4"
              style={{ borderLeftColor: LABEL_HEX[post.predicted_sentiment].bar }}>
              <div className="flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800 leading-relaxed">
                    {post.text.slice(0, 350)}{post.text.length > 350 ? "…" : ""}
                  </p>
                  {"source" in post && (
                    <p className="mt-1.5 text-xs text-gray-400 capitalize">{(post as LabelledRow).source}</p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <SentimentBadge label={post.predicted_sentiment} />
                  <CPBadge code={post.predicted_cp_code} name={post.predicted_cp_name} />
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-gray-50 text-gray-600 border border-gray-200">
                    SA {fmt(post.sentiment_score * 100, 1)}%
                  </span>
                  {post.predicted_cp_code > 0 && (
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-gray-50 text-gray-600 border border-gray-200">
                      CP {fmt(post.cp_score * 100, 1)}%
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between bg-gray-50">
            <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}
              className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40">
              Previous
            </button>
            <span className="text-xs text-gray-500">Page {currentPage} of {totalPages}</span>
            <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
              className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40">
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Labelled content ──────────────────────────────────────────────────────────

function LabelledContent({ rows }: { rows: LabelledRow[] }) {
  const [sub, setSub] = useState<"overview" | "crosstab" | "posts">("overview");
  const tagged = useMemo(() => rows.map((r) => ({ ...r, _ds: "labelled" as const })), [rows]);
  const sa = useMemo(() => saStats(rows), [rows]);
  const cp = useMemo(() => cpStats(rows), [rows]);
  const scores = useMemo(() => rows.map((r) => r.sentiment_score), [rows]);
  const sourceBreakdown = useMemo(() => {
    const counts: Record<string, number> = {};
    rows.forEach((r) => { counts[r.source] = (counts[r.source] ?? 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [rows]);

  const subTabs = [
    { id: "overview", label: "Overview" },
    { id: "crosstab", label: "SA × CP" },
    { id: "posts",    label: "Browse" },
  ];

  return (
    <div>
      <SubTabBar tabs={subTabs} active={sub} onSelect={(id) => setSub(id as typeof sub)} />

      {sub === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard label="Total Rows" value={sa.total.toLocaleString()} sub="training set (60%)" />
            <StatCard label="Positive" value={`${fmt(sa.pos_pct)}%`} sub={sa.pos.toLocaleString()} color={LABEL_HEX.positive.text} />
            <StatCard label="Neutral"  value={`${fmt(sa.neu_pct)}%`} sub={sa.neu.toLocaleString()} color={LABEL_HEX.neutral.text} />
            <StatCard label="Negative" value={`${fmt(sa.neg_pct)}%`} sub={sa.neg.toLocaleString()} color={LABEL_HEX.negative.text} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-base font-semibold text-gray-800 mb-1">Sentiment Distribution</h3>
              <p className="text-xs text-gray-400 mb-3">n = {sa.total.toLocaleString()}</p>
              <DistBar pos={sa.pos_pct} neu={sa.neu_pct} neg={sa.neg_pct} />
              <div className="flex gap-4 mt-2 mb-5">
                {(["positive","neutral","negative"] as const).map((l) => (
                  <div key={l} className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: LABEL_HEX[l].bar }} />
                    <span className="text-xs text-gray-600">{l.charAt(0).toUpperCase()+l.slice(1)}</span>
                    <span className="text-xs font-semibold" style={{ color: LABEL_HEX[l].text }}>
                      {fmt(l === "positive" ? sa.pos_pct : l === "neutral" ? sa.neu_pct : sa.neg_pct)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-base font-semibold text-gray-800 mb-1">CP Phase Distribution</h3>
              <p className="text-xs text-gray-400 mb-3">{fmt(cp.cpPct)}% of rows have a CP phase</p>
              <CPDistBar counts={cp.counts} total={cp.total} />
              <div className="flex flex-wrap gap-3 mt-3">
                {[0,1,2,3,4].map((code) => (
                  <div key={code} className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: CP_COLORS[code].bar }} />
                    <span className="text-xs text-gray-600">{CP_LABEL_MAP[code]}</span>
                    <span className="text-xs font-semibold" style={{ color: CP_COLORS[code].text }}>
                      {fmt(cp.total ? (cp.counts[code] ?? 0) / cp.total * 100 : 0)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-base font-semibold text-gray-800 mb-1">Source Breakdown</h3>
            <p className="text-xs text-gray-400 mb-4">
              Synthetic rows have SA + CP labels · Manual rows have SA only (CP = -1) · edX rows have CP only (SA = -1)
            </p>
            <div className="space-y-3">
              {sourceBreakdown.map(([src, count]) => {
                const pct = sa.total ? count / sa.total * 100 : 0;
                return (
                  <div key={src} className="flex items-center gap-3">
                    <div className="w-24 shrink-0">
                      <p className="text-xs font-semibold text-gray-700 capitalize">{src}</p>
                      <p className="text-xs text-gray-400">{count.toLocaleString()}</p>
                    </div>
                    <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: "#003057" }} />
                    </div>
                    <span className="text-xs font-semibold text-gray-600 w-10 text-right">{fmt(pct)}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {sub === "crosstab" && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-base font-semibold text-gray-800 mb-1">Sentiment by CP Phase</h3>
            <p className="text-xs text-gray-400 mb-4">Click a phase to browse its comments.</p>
            <CPSentimentBars rows={tagged} />
          </div>
        </div>
      )}

      {sub === "posts" && <BrowsePosts rows={tagged} />}
    </div>
  );
}

// ── Unlabelled content ────────────────────────────────────────────────────────

function UnlabelledContent({ rows }: { rows: UnlabelledRow[] }) {
  const [sub, setSub] = useState<"overview" | "crosstab" | "posts">("overview");
  const tagged = useMemo(() => rows.map((r) => ({ ...r, _ds: "unlabelled" as const })), [rows]);
  const sa = useMemo(() => saStats(rows), [rows]);
  const cp = useMemo(() => cpStats(rows), [rows]);
  const scores = useMemo(() => rows.map((r) => r.sentiment_score), [rows]);

  const subTabs = [
    { id: "overview", label: "Overview" },
    { id: "crosstab", label: "SA × CP" },
    { id: "posts",    label: "Browse" },
  ];

  return (
    <div>
      <SubTabBar tabs={subTabs} active={sub} onSelect={(id) => setSub(id as typeof sub)} />

      {sub === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard label="Total Rows" value={sa.total.toLocaleString()} sub="test set (40%)" />
            <StatCard label="Positive" value={`${fmt(sa.pos_pct)}%`} sub={sa.pos.toLocaleString()} color={LABEL_HEX.positive.text} />
            <StatCard label="Neutral"  value={`${fmt(sa.neu_pct)}%`} sub={sa.neu.toLocaleString()} color={LABEL_HEX.neutral.text} />
            <StatCard label="Negative" value={`${fmt(sa.neg_pct)}%`} sub={sa.neg.toLocaleString()} color={LABEL_HEX.negative.text} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-base font-semibold text-gray-800 mb-1">Sentiment Distribution</h3>
              <p className="text-xs text-gray-400 mb-3">n = {sa.total.toLocaleString()} · predictions only, no ground truth</p>
              <DistBar pos={sa.pos_pct} neu={sa.neu_pct} neg={sa.neg_pct} />
              <div className="flex gap-4 mt-2 mb-5">
                {(["positive","neutral","negative"] as const).map((l) => (
                  <div key={l} className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: LABEL_HEX[l].bar }} />
                    <span className="text-xs text-gray-600">{l.charAt(0).toUpperCase()+l.slice(1)}</span>
                    <span className="text-xs font-semibold" style={{ color: LABEL_HEX[l].text }}>
                      {fmt(l === "positive" ? sa.pos_pct : l === "neutral" ? sa.neu_pct : sa.neg_pct)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-base font-semibold text-gray-800 mb-1">CP Phase Distribution</h3>
              <p className="text-xs text-gray-400 mb-3">{fmt(cp.cpPct)}% of rows have a CP phase</p>
              <CPDistBar counts={cp.counts} total={cp.total} />
              <div className="flex flex-wrap gap-3 mt-3">
                {[0,1,2,3,4].map((code) => (
                  <div key={code} className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: CP_COLORS[code].bar }} />
                    <span className="text-xs text-gray-600">{CP_LABEL_MAP[code]}</span>
                    <span className="text-xs font-semibold" style={{ color: CP_COLORS[code].text }}>
                      {fmt(cp.total ? (cp.counts[code] ?? 0) / cp.total * 100 : 0)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[#B3A369]/10 border border-[#B3A369]/30 rounded-xl p-5">
            <p className="font-semibold text-[#7a6a1a] text-sm mb-1">No ground-truth labels</p>
            <p className="text-sm text-[#7a6a1a]/80">
              These rows were not rated — predictions only. Compare distributions to the Labelled tab to
              assess how well the model generalises to unseen data.
            </p>
          </div>
        </div>
      )}

      {sub === "crosstab" && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-base font-semibold text-gray-800 mb-1">Sentiment by CP Phase</h3>
            <p className="text-xs text-gray-400 mb-4">Click a phase to browse its comments.</p>
            <CPSentimentBars rows={tagged} />
          </div>
        </div>
      )}

      {sub === "posts" && <BrowsePosts rows={tagged} />}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function Sentiment() {
  const [labelled, setLabelled] = useState<LabelledRow[]>([]);
  const [unlabelled, setUnlabelled] = useState<UnlabelledRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"labelled" | "unlabelled">("labelled");

  useEffect(() => {
    Promise.all([
      fetch("/data/labelled_predictions.csv").then((r) => r.text()),
      fetch("/data/unlabelled_predictions.csv").then((r) => r.text()),
    ]).then(([lText, uText]) => {
      setLabelled(parseCSV<LabelledRow>(lText));
      setUnlabelled(parseCSV<UnlabelledRow>(uText));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003057] mx-auto" />
          <p className="mt-4 text-gray-600">Loading sentiment data…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Sentiment Analysis</h1>
          <p className="text-gray-500 mt-1 text-sm">
            DistilBERT SA + CP phase models ·{" "}
            {(labelled.length + unlabelled.length).toLocaleString()} total comments
          </p>
        </div>

        {/* Top-level tabs */}
        <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 w-fit mb-6 shadow-sm">
          <button onClick={() => setActiveTab("labelled")}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "labelled"
                ? "bg-[#003057] text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}>
            Labelled
            <span className="ml-2 text-xs opacity-70">({labelled.length.toLocaleString()})</span>
          </button>
          <button onClick={() => setActiveTab("unlabelled")}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "unlabelled"
                ? "bg-[#B3A369] text-[#003057] shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}>
            Unlabelled
            <span className="ml-2 text-xs opacity-70">({unlabelled.length.toLocaleString()})</span>
          </button>
        </div>

        {activeTab === "labelled"   && <LabelledContent   rows={labelled}   />}
        {activeTab === "unlabelled" && <UnlabelledContent rows={unlabelled} />}
      </div>
    </div>
  );
}

// ── CSV parser ────────────────────────────────────────────────────────────────

function parseCSV<T>(text: string): T[] {
  const lines = text.split("\n").filter((l) => l.trim());
  if (lines.length < 2) return [];
  const headers = splitCSVLine(lines[0]);
  return lines.slice(1).map((line) => {
    const vals = splitCSVLine(line);
    const obj: Record<string, unknown> = {};
    headers.forEach((h, i) => {
      const v = vals[i] ?? "";
      const n = Number(v);
      obj[h] = v === "" ? "" : isNaN(n) ? v : n;
    });
    return obj as T;
  });
}

function splitCSVLine(line: string): string[] {
  const result: string[] = [];
  let cur = "";
  let inQuote = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') { inQuote = !inQuote; }
    else if (ch === "," && !inQuote) { result.push(cur.trim()); cur = ""; }
    else { cur += ch; }
  }
  result.push(cur.trim());
  return result;
}
