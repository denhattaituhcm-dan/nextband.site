import React, { useState, useEffect, useCallback } from "react";
import { lexiconApi, UserVocabRecord } from "@/lib/lexiconApi";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BookOpen,
  CheckCircle2,
  Circle,
  TrendingUp,
  Library,
  RefreshCw,
  Search,
  ChevronDown,
  ChevronUp,
  Volume2,
} from "lucide-react";

// ─── Mastery config ──────────────────────────────────────────────────────────
type MasteryState = 0 | 1 | 2 | 3;

const MASTERY_CONFIG: Record<
  MasteryState,
  { label: string; color: string; bg: string; border: string; dot: string }
> = {
  0: {
    label: "Encountered",
    color: "text-slate-500 dark:text-slate-400",
    bg: "bg-slate-50 dark:bg-slate-900",
    border: "border-slate-200 dark:border-slate-800",
    dot: "bg-slate-400",
  },
  1: {
    label: "Learning",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50/60 dark:bg-amber-950/20",
    border: "border-amber-200 dark:border-amber-900",
    dot: "bg-amber-400",
  },
  2: {
    label: "Consolidating",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50/60 dark:bg-blue-950/20",
    border: "border-blue-200 dark:border-blue-900",
    dot: "bg-blue-500",
  },
  3: {
    label: "Mastered",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50/60 dark:bg-emerald-950/20",
    border: "border-emerald-200 dark:border-emerald-900",
    dot: "bg-emerald-500",
  },
};

// ─── Memory Arc ───────────────────────────────────────────────────────────────
interface HistoryEntry {
  date: string;
  result: "PASS" | "FAIL";
  latencyMs?: number | null;
}

function MemoryArc({ record }: { record: UserVocabRecord }) {
  const history: HistoryEntry[] = Array.isArray(record.history) ? record.history : [];

  const stateAtIndex = (idx: number): MasteryState => {
    const passCount = history.slice(0, idx + 1).filter((h) => h.result === "PASS").length;
    const failCount = history.slice(0, idx + 1).filter((h) => h.result === "FAIL").length;
    const score = Math.max(0, Math.min(1, 0.1 + passCount * 0.25 - failCount * 0.2));
    if (score >= 0.9) return 3;
    if (score >= 0.6) return 2;
    if (score >= 0.1) return 1;
    return 0;
  };

  // Always include the save event as first milestone
  const allMilestones: Array<{ date: string; label: string; icon: JSX.Element; state: MasteryState }> = [
    {
      date: record.createdAt,
      label: "Lưu vào Sổ từ",
      icon: <BookOpen className="w-3 h-3" />,
      state: 0,
    },
    ...history.map((h, idx) => ({
      date: h.date,
      label: h.result === "PASS" ? "Ôn đúng" : "Chưa nhớ",
      icon:
        h.result === "PASS" ? (
          <CheckCircle2 className="w-3 h-3" />
        ) : (
          <Circle className="w-3 h-3" />
        ),
      state: stateAtIndex(idx),
    })),
  ];

  // Final state milestone if mastered
  if (record.masteryState === 3) {
    allMilestones.push({
      date: record.updatedAt,
      label: "MASTERED",
      icon: <CheckCircle2 className="w-3 h-3" />,
      state: 3,
    });
  }

  if (allMilestones.length === 1) {
    return (
      <div className="text-xs text-slate-400 dark:text-slate-600 italic mt-1">
        Chưa có lịch sử ôn tập — Từ này đang chờ lần ôn đầu tiên.
      </div>
    );
  }

  return (
    <div className="mt-3 relative">
      {/* Vertical connector line */}
      <div className="absolute left-[11px] top-4 bottom-0 w-px bg-slate-200 dark:bg-slate-800" />
      <div className="space-y-3">
        {allMilestones.map((m, i) => {
          const cfg = MASTERY_CONFIG[m.state];
          const isLast = i === allMilestones.length - 1;
          const d = new Date(m.date);
          const dateStr = d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" });
          return (
            <div key={i} className="flex items-start gap-3 relative">
              {/* Dot */}
              <div
                className={`relative z-10 flex-shrink-0 w-5.5 h-5.5 flex items-center justify-center rounded-full border-2 ${
                  isLast ? "border-current" : "border-slate-200 dark:border-slate-700"
                } ${cfg.dot} text-white`}
                style={{ width: 22, height: 22 }}
              >
                <span className={isLast ? "text-white" : "text-white opacity-90"}>
                  {m.icon}
                </span>
              </div>
              {/* Content */}
              <div className="flex items-baseline gap-2 min-w-0 pb-0.5">
                <span className={`text-[11px] font-semibold ${isLast ? cfg.color : "text-slate-600 dark:text-slate-400"}`}>
                  {m.label}
                </span>
                <span className="text-[10px] text-slate-400 dark:text-slate-600 flex-shrink-0">
                  {dateStr}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Word Card ────────────────────────────────────────────────────────────────
function WordCard({ record }: { record: UserVocabRecord }) {
  const [expanded, setExpanded] = useState(false);
  const cfg = MASTERY_CONFIG[(record.masteryState as MasteryState) ?? 0];
  const masteryPct = Math.round((record.masteryScore ?? 0) * 100);

  const playAudio = () => {
    if (record.word?.audioUrl) {
      new Audio(record.word.audioUrl).play().catch(() => {});
    }
  };

  return (
    <div
      className={`rounded-xl border ${cfg.border} ${cfg.bg} transition-all duration-200 overflow-hidden`}
    >
      {/* Card header */}
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer select-none"
        onClick={() => setExpanded((v) => !v)}
      >
        {/* Mastery dot */}
        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${cfg.dot}`} />

        {/* Word & IPA */}
        <div className="flex items-baseline gap-2 min-w-0 flex-1">
          <span className="text-sm font-bold text-slate-900 dark:text-white capitalize truncate">
            {record.word?.word}
          </span>
          {record.word?.ipa && (
            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate hidden sm:block">
              {record.word.ipa}
            </span>
          )}
          {record.word?.cefrLevel && (
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 flex-shrink-0">
              {record.word.cefrLevel}
            </span>
          )}
        </div>

        {/* Right side: progress + audio + chevron */}
        <div className="flex items-center gap-3 flex-shrink-0 ml-auto">
          {/* Mastery progress bar */}
          <div className="hidden sm:flex flex-col items-end gap-0.5">
            <span className={`text-[10px] font-semibold ${cfg.color}`}>{cfg.label}</span>
            <div className="w-20 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${cfg.dot}`}
                style={{ width: `${masteryPct}%` }}
              />
            </div>
          </div>
          {record.word?.audioUrl && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                playAudio();
              }}
              className="p-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          )}
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </div>
      </div>

      {/* Expandable detail */}
      {expanded && (
        <div className="px-4 pb-4 border-t border-slate-100 dark:border-slate-800 pt-3 space-y-3">
          {/* Core Idea */}
          {record.word?.coreIdea && (
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
                Bản chất cốt lõi (Core Idea)
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800/80 rounded-lg px-3 py-2 border border-slate-100 dark:border-slate-700">
                {record.word.coreIdea}
              </p>
            </div>
          )}

          {/* Context sentence */}
          {record.sourceContext && (
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
                Câu ngữ cảnh gốc
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 italic bg-amber-50/60 dark:bg-amber-950/10 rounded-lg px-3 py-2 border border-amber-100 dark:border-amber-900/20">
                "{record.sourceContext}"
              </p>
            </div>
          )}

          {/* Collocations */}
          {record.word?.collocations && record.word.collocations.length > 0 && (
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
                Collocations
              </div>
              <div className="flex flex-wrap gap-1.5">
                {record.word.collocations.map((col, i) => (
                  <span
                    key={i}
                    className="text-[11px] px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded border border-slate-200 dark:border-slate-700"
                  >
                    {col}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Memory Arc timeline */}
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
              Lịch sử làm chủ (Memory Arc)
            </div>
            <MemoryArc record={record} />
          </div>

          {/* Stats row */}
          <div className="flex gap-4 pt-1 text-[10px] text-slate-400 dark:text-slate-600">
            <span>Đã ôn: <strong className="text-slate-600 dark:text-slate-400">{record.totalReviews}</strong> lần</span>
            <span>Sai: <strong className="text-slate-600 dark:text-slate-400">{record.failedReviews}</strong> lần</span>
            {record.nextReviewAt && (
              <span>
                Ôn tiếp:{" "}
                <strong className="text-slate-600 dark:text-slate-400">
                  {new Date(record.nextReviewAt) <= new Date()
                    ? "Hôm nay"
                    : new Date(record.nextReviewAt).toLocaleDateString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                      })}
                </strong>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Stats bar ────────────────────────────────────────────────────────────────
function LexiconStats({
  stats,
}: {
  stats: { total: number; learning: number; consolidating: number; mastered: number };
}) {
  const items = [
    {
      label: "Tổng từ vựng",
      value: stats.total,
      badge: "Kho tài sản",
      gradient: "from-rose-500/10 via-pink-500/5 to-transparent",
      border: "border-rose-200/80 dark:border-rose-900/40",
      textColor: "text-rose-600 dark:text-rose-400",
      accentBg: "bg-rose-50 dark:bg-rose-950/40",
    },
    {
      label: "Đang nạp mới",
      value: stats.learning,
      badge: "Encountered",
      gradient: "from-amber-500/10 via-yellow-500/5 to-transparent",
      border: "border-amber-200/80 dark:border-amber-900/40",
      textColor: "text-amber-600 dark:text-amber-400",
      accentBg: "bg-amber-50 dark:bg-amber-950/40",
    },
    {
      label: "Đang củng cố",
      value: stats.consolidating,
      badge: "Spaced Review",
      gradient: "from-blue-500/10 via-indigo-500/5 to-transparent",
      border: "border-blue-200/80 dark:border-blue-900/40",
      textColor: "text-blue-600 dark:text-blue-400",
      accentBg: "bg-blue-50 dark:bg-blue-950/40",
    },
    {
      label: "Đã làm chủ",
      value: stats.mastered,
      badge: "In-Longterm",
      gradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
      border: "border-emerald-200/80 dark:border-emerald-900/40",
      textColor: "text-emerald-600 dark:text-emerald-400",
      accentBg: "bg-emerald-50 dark:bg-emerald-950/40",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
      {items.map((s) => (
        <div
          key={s.label}
          className={`relative overflow-hidden rounded-2xl border-2 ${s.border} bg-white dark:bg-slate-900/90 p-4 shadow-sm hover:shadow-md transition-all duration-300 group`}
        >
          <div
            className={`absolute -top-12 -right-12 w-28 h-28 bg-gradient-to-br ${s.gradient} rounded-full blur-xl group-hover:scale-125 transition-transform duration-500`}
          />
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between gap-1 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {s.label}
              </span>
              <span
                className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${s.accentBg} ${s.textColor}`}
              >
                {s.badge}
              </span>
            </div>
            <div className={`text-3xl font-black tabular-nums tracking-tight ${s.textColor}`}>
              {s.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Filter tabs ──────────────────────────────────────────────────────────────
type FilterKey = "all" | "due" | "learning" | "consolidating" | "mastered";

const FILTER_OPTIONS: { key: FilterKey; label: string; icon?: string }[] = [
  { key: "all", label: "Tất cả", icon: "📚" },
  { key: "due", label: "Cần ôn hôm nay", icon: "⚡" },
  { key: "learning", label: "Đang học", icon: "🌱" },
  { key: "consolidating", label: "Củng cố", icon: "🧠" },
  { key: "mastered", label: "Đã làm chủ", icon: "🏆" },
];

function filterRecords(records: UserVocabRecord[], key: FilterKey): UserVocabRecord[] {
  const now = new Date();
  switch (key) {
    case "due":
      return records.filter((r) => new Date(r.nextReviewAt) <= now);
    case "learning":
      return records.filter((r) => r.masteryState <= 1);
    case "consolidating":
      return records.filter((r) => r.masteryState === 2);
    case "mastered":
      return records.filter((r) => r.masteryState === 3);
    default:
      return records;
  }
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const MyLexiconPage: React.FC = () => {
  const [records, setRecords] = useState<UserVocabRecord[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    learning: 0,
    consolidating: 0,
    mastered: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await lexiconApi.getMyLexicon();
      setRecords(data.items ?? []);
      setStats(data.stats ?? { total: 0, learning: 0, consolidating: 0, mastered: 0 });
    } catch {
      setError("Không thể tải Sổ từ. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // Filter + search
  const displayed = filterRecords(records, filter).filter((r) =>
    search.trim().length === 0
      ? true
      : (r.word?.word ?? "").toLowerCase().includes(search.trim().toLowerCase())
  );

  const dueCount = records.filter((r) => new Date(r.nextReviewAt) <= new Date()).length;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-7">
      {/* Page Header: Hero Banner style */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-rose-200/70 dark:border-rose-900/40 bg-gradient-to-r from-rose-50 via-white to-amber-50/60 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800/80 p-6 sm:p-7 shadow-sm">
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-rose-400/15 to-amber-400/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 via-rose-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-rose-500/25 shrink-0">
              <Library className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Sổ từ cá nhân
                </h1>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-rose-500 text-white shadow-sm">
                  My Lexicon
                </span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Mỗi từ vựng bạn tra cứu tự động chuyển hóa thành tài sản tri thức dài hạn.
              </p>
            </div>
          </div>

          <button
            onClick={load}
            disabled={loading}
            className="self-start sm:self-auto flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-rose-600 dark:hover:text-rose-400 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-sm hover:shadow transition-all duration-150"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-rose-500" : ""}`} />
            Làm mới
          </button>
        </div>
      </div>

      {/* Stats Counter Bar */}
      {!loading && !error && <LexiconStats stats={stats} />}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 rounded-2xl" />
          ))}
        </div>
      )}

      {/* Due review call-to-action banner */}
      {!loading && dueCount > 0 && (
        <div className="relative overflow-hidden rounded-2xl border-2 border-amber-300 dark:border-amber-700/60 bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-transparent p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 text-white flex items-center justify-center shrink-0 shadow-md">
              <TrendingUp className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                Hôm nay có {dueCount} từ cần củng cố trí nhớ
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                Ôn tập cách quãng (Spaced Repetition) giúp chống lại đường cong quên lãng Ebbinghaus · mất ~{Math.ceil(dueCount * 0.4)} phút
              </p>
            </div>
          </div>
          <button
            onClick={() => setFilter("due")}
            className="shrink-0 px-4 py-2 text-xs font-black rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white shadow-md shadow-rose-500/20 active:scale-98 transition-all"
          >
            Ôn tập ngay ⚡
          </button>
        </div>
      )}

      {/* Search & Filter Toolbar */}
      <div className="space-y-3">
        {/* Search input with sleek pill design */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-500 dark:text-rose-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm từ vựng, ngữ cảnh, phiên âm..."
            className="w-full pl-10 pr-4 py-3 text-sm bg-white dark:bg-slate-900 border-2 border-slate-200/80 dark:border-slate-800 rounded-2xl focus:outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 dark:text-slate-100 placeholder:text-slate-400 transition-all shadow-sm"
          />
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {FILTER_OPTIONS.map((opt) => {
            const isActive = filter === opt.key;
            return (
              <button
                key={opt.key}
                onClick={() => setFilter(opt.key)}
                className={`flex-shrink-0 flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl transition-all duration-150 border-2 ${
                  isActive
                    ? "bg-gradient-to-r from-rose-500 to-rose-600 border-rose-500 text-white shadow-md shadow-rose-500/25 scale-[1.02]"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200/80 dark:border-slate-800 hover:border-rose-300 dark:hover:border-rose-900/60"
                }`}
              >
                <span>{opt.icon}</span>
                <span>{opt.label}</span>
                {opt.key === "due" && dueCount > 0 && (
                  <span
                    className={`ml-1 px-1.5 py-0.2 text-[10px] font-black rounded-full ${
                      isActive ? "bg-white text-rose-600" : "bg-rose-500 text-white"
                    }`}
                  >
                    {dueCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Word list content */}
      {loading ? (
        <div className="space-y-3">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 rounded-2xl" />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-14 p-6 rounded-3xl border-2 border-dashed border-rose-200 dark:border-rose-900/40 bg-rose-50/50 dark:bg-rose-950/20 text-sm text-rose-600 dark:text-rose-400">
          <p className="font-semibold">{error}</p>
          <button
            onClick={load}
            className="mt-3 px-4 py-1.5 text-xs font-bold bg-white dark:bg-slate-800 border border-rose-300 dark:border-rose-800 rounded-lg hover:bg-rose-50 transition-colors"
          >
            Thử tải lại
          </button>
        </div>
      ) : displayed.length === 0 ? (
        <div className="text-center py-16 px-6 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-100 to-amber-100 dark:from-slate-800 dark:to-slate-800 text-rose-500 mx-auto flex items-center justify-center">
            <Library className="w-8 h-8 stroke-[1.5]" />
          </div>
          <p className="text-base font-bold text-slate-800 dark:text-slate-200">
            {records.length === 0
              ? "Sổ từ của bạn đang sẵn sàng đón từ mới!"
              : "Không tìm thấy từ vựng nào khớp với bộ lọc."}
          </p>
          {records.length === 0 && (
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
              💡 <strong>Mẹo:</strong> Bôi đen bất kỳ từ tiếng Anh nào trong bài tập Đọc, Nghe hoặc Viết. Hệ thống sẽ tự động phân tích bản chất tri nhận và hiển thị nút Lưu vào đây!
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {displayed.map((record) => (
            <WordCard key={record.id} record={record} />
          ))}
          <p className="text-center text-xs font-semibold text-slate-400 dark:text-slate-500 pt-3">
            Đang hiển thị {displayed.length} / {records.length} từ vựng
          </p>
        </div>
      )}
    </div>
  );
};

export default MyLexiconPage;
