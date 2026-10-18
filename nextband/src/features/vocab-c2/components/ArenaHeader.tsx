import React, { useState } from "react";
import {
  Flame,
  Zap,
  Volume2,
  VolumeX,
  BookOpen,
  AlertTriangle,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  X,
  Award,
  Activity,
  ChevronRight,
  RotateCcw,
  Sun,
  Moon,
  Sparkle,
  Eye,
  EyeOff,
} from "lucide-react";
import { C2UnitData, ImageSchemaTag } from "@/data/vocab-c2/types";
import { useArenaTheme } from "../context/ThemeContext";

export type ArenaModeId =
  | "schema"
  | "synapse"
  | "trilock"
  | "persona"
  | "chronicles"
  | "gradient"
  | "frameweb";

export interface AttemptPayload {
  itemId: string;
  word: string;
  mode: ArenaModeId | string;
  isCorrect: boolean;
  latencyMs: number;
  meaningVi?: string;
  imageSchemaTag?: ImageSchemaTag;
}

export interface C2ModeSharedProps {
  unit: C2UnitData;
  onRecordAttempt: (payload: AttemptPayload) => void;
  onModeComplete?: (summary: {
    mode: ArenaModeId | string;
    correctCount: number;
    totalCount: number;
    avgLatencyMs: number;
    earnedXp: number;
  }) => void;
}

export interface CultivationRankInfo {
  id?: string;
  level?: number;
  title: string;
  subtitle?: string;
  minXp?: number;
  nextRankXp?: number | null;
  auraColor?: string;
  badgeText?: string;
}

export interface MistakeHeatItem {
  itemId?: string;
  word: string;
  meaningVi?: string;
  mode?: string;
  heatLevel: number; // 1 = warm, 2 = hot, 3+ = critical cognitive blindspot
  failCount?: number;
  lastLatencyMs?: number;
  imageSchemaTag?: ImageSchemaTag;
}

export interface ArenaHeaderProps {
  unit: C2UnitData;
  allUnits?: C2UnitData[];
  onSelectUnit?: (unitNumber: number) => void;
  xp?: number;
  rank?: CultivationRankInfo;
  nextRankXp?: number;
  rankProgressPercent?: number;
  combo?: number;
  maxCombo?: number;
  avgLatencyMs?: number;
  masteredCount?: number;
  totalLexiconCount?: number;
  soundEnabled?: boolean;
  onToggleSound?: () => void;
  mistakes?: MistakeHeatItem[];
  onClearMistake?: (word: string) => void;
  onRecordAttempt?: (payload: AttemptPayload) => void;
  onOpenUnitHub?: () => void;
}

const DEFAULT_RANKS: CultivationRankInfo[] = [
  {
    level: 1,
    title: "C1 Initiate",
    subtitle: "Lexical Awakening",
    minXp: 0,
    nextRankXp: 500,
    auraColor: "#38BDF8",
    badgeText: "RANK I",
  },
  {
    level: 2,
    title: "Synapse Vanguard",
    subtitle: "Collocation Striker",
    minXp: 500,
    nextRankXp: 1500,
    auraColor: "#00F5D4",
    badgeText: "RANK II",
  },
  {
    level: 3,
    title: "Schema Architect",
    subtitle: "Spatial-Cognitive Master",
    minXp: 1500,
    nextRankXp: 3200,
    auraColor: "#A855F7",
    badgeText: "RANK III",
  },
  {
    level: 4,
    title: "C2 Grand Arbiter",
    subtitle: "Apex Lexical Sovereignty",
    minXp: 3200,
    nextRankXp: 6000,
    auraColor: "#F59E0B",
    badgeText: "RANK IV",
  },
  {
    level: 5,
    title: "Omniscient Lexicon Overlord",
    subtitle: "Transcendent Native Reflex",
    minXp: 6000,
    nextRankXp: null,
    auraColor: "#EF4444",
    badgeText: "APEX C2",
  },
];

function computeRankFromXp(xp: number): {
  current: CultivationRankInfo;
  progressPercent: number;
  nextXp: number;
} {
  for (let i = DEFAULT_RANKS.length - 1; i >= 0; i--) {
    const r = DEFAULT_RANKS[i];
    if (xp >= (r.minXp ?? 0)) {
      const min = r.minXp ?? 0;
      const next = r.nextRankXp ?? min + 2000;
      const pct = r.nextRankXp
        ? Math.min(100, Math.max(0, Math.round(((xp - min) / (next - min)) * 100)))
        : 100;
      return { current: r, progressPercent: pct, nextXp: next };
    }
  }
  return {
    current: DEFAULT_RANKS[0],
    progressPercent: 0,
    nextXp: 500,
  };
}

export const ArenaHeader: React.FC<ArenaHeaderProps> = ({
  unit,
  allUnits = [],
  onSelectUnit,
  xp = 0,
  rank,
  nextRankXp,
  rankProgressPercent,
  combo = 0,
  maxCombo = 0,
  avgLatencyMs = 0,
  masteredCount = 0,
  totalLexiconCount,
  soundEnabled = true,
  onToggleSound,
  mistakes = [],
  onClearMistake,
  onRecordAttempt,
  onOpenUnitHub,
}) => {
  const [isMistakeDrawerOpen, setIsMistakeDrawerOpen] = useState(false);
  const [isUnitSelectorOpen, setIsUnitSelectorOpen] = useState(false);

  // Interleaved Flash Drill state inside the drawer
  const [isDrillActive, setIsDrillActive] = useState(false);
  const [drillIndex, setDrillIndex] = useState(0);
  const [drillFeedback, setDrillFeedback] = useState<"correct" | "wrong" | null>(
    null
  );
  const [drillStartTime, setDrillStartTime] = useState<number>(Date.now());

  const computedRank = computeRankFromXp(xp);
  const activeRank = rank || computedRank.current;
  const activeProgress =
    rankProgressPercent !== undefined
      ? rankProgressPercent
      : computedRank.progressPercent;
  const activeNextXp =
    nextRankXp !== undefined ? nextRankXp : computedRank.nextXp;

  const activeMistakes = mistakes.filter((m) => m.heatLevel > 0);
  const totalUnitWords =
    totalLexiconCount ??
    unit.schemaItems.length +
      unit.collocationPairs.length +
      unit.personaCards.length +
      unit.triLockPuzzles.length;

  const getLatencyBadge = (ms: number) => {
    if (!ms || ms <= 0) {
      return {
        label: "AWAITING INPUT",
        color: "text-slate-400 border-slate-700 bg-slate-900/70",
      };
    }
    if (ms <= 1200) {
      return {
        label: `⚡ ${(ms / 1000).toFixed(2)}s — Native C2 Reflex!`,
        color:
          "text-[#00F5D4] border-[#00F5D4]/50 bg-[#00F5D4]/10 shadow-[0_0_12px_rgba(0,245,212,0.2)]",
      };
    }
    if (ms <= 2500) {
      return {
        label: `⚡ ${(ms / 1000).toFixed(2)}s — Synaptic Flow`,
        color: "text-amber-400 border-amber-500/40 bg-amber-500/10",
      };
    }
    return {
      label: `⏱️ ${(ms / 1000).toFixed(2)}s — Deep Deliberation`,
      color: "text-rose-400 border-rose-500/40 bg-rose-500/10",
    };
  };

  const latencyBadge = getLatencyBadge(avgLatencyMs);

  // Build options for the Flash Drill inside the Mistake Heatmap Drawer
  const currentDrillMistake = activeMistakes[drillIndex] || activeMistakes[0];

  const getDrillOptions = (target: MistakeHeatItem | undefined) => {
    if (!target) return [];
    const pool = [
      ...unit.schemaItems.map((s) => ({
        word: s.word,
        meaningVi: s.definitionVi,
      })),
      ...unit.collocationPairs.map((c) => ({
        word: c.fullCollocation,
        meaningVi: c.meaningVi,
      })),
      ...unit.personaCards.map((p) => ({
        word: p.word,
        meaningVi: p.meaningVi,
      })),
      ...unit.triLockPuzzles.map((t) => ({
        word: t.targetWord,
        meaningVi: t.meaningVi,
      })),
    ];

    const correctMeaning =
      target.meaningVi ||
      pool.find((p) => p.word.toLowerCase() === target.word.toLowerCase())
        ?.meaningVi ||
      "Cấu trúc từ vựng C2 trọng tâm trong ngữ cảnh học thuật.";

    const distractors = pool
      .filter((p) => p.word.toLowerCase() !== target.word.toLowerCase())
      .slice(0, 3)
      .map((d) => d.meaningVi);

    while (distractors.length < 3) {
      distractors.push(
        "Nghĩa nhiễu học thuật không khớp với ngữ cảnh C2 hiện tại."
      );
    }

    const combined = [
      { text: correctMeaning, isCorrect: true },
      ...distractors.map((d) => ({ text: d, isCorrect: false })),
    ];

    // Deterministic shuffle based on word length + index
    const seed = target.word.length + drillIndex;
    return combined.sort((a, b) =>
      ((a.text.length + seed) % 5) - ((b.text.length + seed) % 5)
    );
  };

  const drillOptions = getDrillOptions(currentDrillMistake);

  const handleStartFlashDrill = () => {
    if (activeMistakes.length === 0) return;
    setDrillIndex(0);
    setDrillFeedback(null);
    setDrillStartTime(Date.now());
    setIsDrillActive(true);
  };

  const handleAnswerDrill = (isCorrect: boolean) => {
    if (!currentDrillMistake || drillFeedback) return;
    const latency = Math.max(250, Date.now() - drillStartTime);
    setDrillFeedback(isCorrect ? "correct" : "wrong");

    if (onRecordAttempt) {
      onRecordAttempt({
        itemId: currentDrillMistake.itemId || `drill-${currentDrillMistake.word}`,
        word: currentDrillMistake.word,
        mode: "interleaved-drill",
        isCorrect,
        latencyMs: latency,
        meaningVi: currentDrillMistake.meaningVi,
        imageSchemaTag: currentDrillMistake.imageSchemaTag,
      });
    }

    if (isCorrect && onClearMistake) {
      onClearMistake(currentDrillMistake.word);
    }

    setTimeout(() => {
      setDrillFeedback(null);
      setDrillStartTime(Date.now());
      if (drillIndex + 1 < activeMistakes.length) {
        setDrillIndex((prev) => prev + 1);
      } else {
        setIsDrillActive(false);
      }
    }, 900);
  };

  const { theme, setTheme, isZenMode, toggleZenMode } = useArenaTheme();
  const isPaperTheme = theme === "paper";
  const isSlateTheme = theme === "slate";

  return (
    <>
      <header
        className={`relative z-30 border-b transition-colors duration-300 ${
          isPaperTheme
            ? "bg-[#FAF7F2]/95 border-[#E2D9CC] text-slate-900 shadow-sm backdrop-blur-md"
            : isSlateTheme
            ? "bg-[#0F172A]/95 border-slate-700/80 text-slate-100 shadow-md backdrop-blur-md"
            : "bg-[#0B0F19]/95 border-slate-800/80 text-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.65)] backdrop-blur-xl"
        }`}
      >
        {/* Top ambient line */}
        <div
          className={`h-[2px] w-full transition-opacity ${
            isPaperTheme
              ? "bg-gradient-to-r from-transparent via-[#0F766E] to-amber-600 opacity-60"
              : "bg-gradient-to-r from-transparent via-[#00F5D4] to-amber-500 opacity-80"
          }`}
        />

        <div className="max-w-7xl mx-auto px-4 py-2.5 sm:px-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          {/* Left: Brand + Cultivation Rank Aura + XP Progress */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {/* Rank Emblem */}
            <div
              className={`relative group flex items-center gap-3 px-3 py-1.5 rounded-xl border transition-all ${
                isPaperTheme
                  ? "bg-white border-[#E2D9CC] shadow-xs"
                  : isSlateTheme
                  ? "bg-slate-900/90 border-slate-700"
                  : "bg-slate-900/90 border-[#00F5D4]/30 shadow-[0_0_20px_rgba(0,245,212,0.12)]"
              }`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center font-black text-xs tracking-tighter border transition-all ${
                  isPaperTheme
                    ? "border-teal-300 bg-teal-50 text-teal-800 shadow-xs"
                    : "border-[#00F5D4]/50 bg-gradient-to-br from-[#00F5D4]/25 to-slate-950 text-[#00F5D4] shadow-[0_0_15px_rgba(0,245,212,0.3)]"
                }`}
                style={{
                  borderColor: isPaperTheme ? undefined : (activeRank.auraColor || "#00F5D4"),
                }}
              >
                <Award className={`w-4 h-4 ${isPaperTheme ? "text-teal-700" : "text-[#00F5D4]"}`} />
              </div>

              <div className="min-w-[155px]">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-[9px] font-mono uppercase tracking-widest px-1.5 py-0.2 rounded border ${
                      isPaperTheme
                        ? "bg-teal-50 text-teal-800 border-teal-200"
                        : "bg-[#00F5D4]/15 text-[#00F5D4] border-[#00F5D4]/30"
                    }`}
                  >
                    {activeRank.badgeText || "C2 OVERDRIVE"}
                  </span>
                  <span
                    className={`text-xs font-mono ${
                      isPaperTheme ? "text-slate-600 font-semibold" : "text-slate-400"
                    }`}
                  >
                    <strong className={isPaperTheme ? "text-slate-900" : "text-white"}>
                      {xp.toLocaleString()}
                    </strong>
                    {activeNextXp ? ` / ${activeNextXp.toLocaleString()} XP` : " XP"}
                  </span>
                </div>
                <div
                  className={`text-xs font-bold tracking-tight mt-0.5 flex items-center gap-1.5 ${
                    isPaperTheme ? "text-slate-900" : "text-white"
                  }`}
                >
                  <span>{activeRank.title}</span>
                  <Sparkles
                    className={`w-3 h-3 ${isPaperTheme ? "text-amber-600" : "text-amber-400 animate-pulse"}`}
                  />
                </div>
                {/* XP Progress Bar */}
                <div
                  className={`w-full h-1.5 rounded-full overflow-hidden mt-1 ${
                    isPaperTheme ? "bg-slate-200" : "bg-slate-800"
                  }`}
                >
                  <div
                    className={`h-full transition-all duration-500 ${
                      isPaperTheme
                        ? "bg-gradient-to-r from-teal-600 via-teal-500 to-amber-600"
                        : "bg-gradient-to-r from-[#00F5D4] via-cyan-400 to-amber-400"
                    }`}
                    style={{ width: `${activeProgress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Active Unit Selector Trigger */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  if (onOpenUnitHub) {
                    onOpenUnitHub();
                  } else {
                    setIsUnitSelectorOpen((prev) => !prev);
                  }
                }}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border transition-all text-left cursor-pointer ${
                  isPaperTheme
                    ? "bg-white hover:bg-slate-50 border-[#E2D9CC] text-slate-800 shadow-xs"
                    : "bg-slate-900/80 hover:bg-slate-800/90 border-slate-700/80 hover:border-[#00F5D4]/50"
                }`}
              >
                <BookOpen
                  className={`w-4 h-4 shrink-0 ${isPaperTheme ? "text-teal-700" : "text-[#00F5D4]"}`}
                />
                <div>
                  <div
                    className={`text-[10px] font-mono uppercase tracking-wider flex items-center gap-1.5 ${
                      isPaperTheme ? "text-slate-500" : "text-slate-400"
                    }`}
                  >
                    <span>{unit.unitCode}</span>
                    <span>•</span>
                    <span>PDF p.{unit.pdfPages}</span>
                    {unit.isFullVerticalSlice && (
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                          isPaperTheme
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                        }`}
                      >
                        FULL SLICE
                      </span>
                    )}
                  </div>
                  <div
                    className={`text-xs sm:text-sm font-bold line-clamp-1 ${
                      isPaperTheme ? "text-slate-900 font-serif" : "text-slate-100"
                    }`}
                  >
                    Unit {unit.unitNumber}: {unit.titleEn}
                  </div>
                </div>
              </button>

              {isUnitSelectorOpen && allUnits.length > 0 && (
                <div
                  className={`absolute left-0 mt-2 w-80 max-h-96 overflow-y-auto rounded-2xl shadow-2xl p-2 z-50 border ${
                    isPaperTheme
                      ? "bg-white border-[#E2D9CC] text-slate-900"
                      : "bg-[#0B0F19] border-slate-700 text-slate-100"
                  }`}
                >
                  <div
                    className={`px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider border-b ${
                      isPaperTheme
                        ? "text-slate-500 border-slate-200"
                        : "text-slate-400 border-slate-800"
                    }`}
                  >
                    Select C2 Cognitive Arena Unit
                  </div>
                  <div
                    className={`divide-y mt-1 ${
                      isPaperTheme ? "divide-slate-100" : "divide-slate-800/60"
                    }`}
                  >
                    {allUnits.map((u) => {
                      const isSelected = u.unitNumber === unit.unitNumber;
                      return (
                        <button
                          key={u.unitNumber}
                          type="button"
                          onClick={() => {
                            onSelectUnit?.(u.unitNumber);
                            setIsUnitSelectorOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-center justify-between gap-2 cursor-pointer ${
                            isSelected
                              ? isPaperTheme
                                ? "bg-teal-50 border border-teal-300 text-teal-950 font-bold"
                                : "bg-[#00F5D4]/15 border border-[#00F5D4]/40 text-white"
                              : isPaperTheme
                              ? "hover:bg-slate-100 text-slate-700"
                              : "hover:bg-slate-900 text-slate-300"
                          }`}
                        >
                          <div>
                            <div className="text-xs font-bold flex items-center gap-1.5">
                              <span className={isPaperTheme ? "text-teal-700" : "text-[#00F5D4]"}>
                                U{u.unitNumber}
                              </span>
                              <span>{u.titleEn}</span>
                            </div>
                            <div
                              className={`text-[11px] line-clamp-1 ${
                                isPaperTheme ? "text-slate-500" : "text-slate-400"
                              }`}
                            >
                              {u.titleVi}
                            </div>
                          </div>
                          {u.isFullVerticalSlice && (
                            <span
                              className={`shrink-0 text-[9px] font-mono px-1.5 py-0.5 rounded border ${
                                isPaperTheme
                                  ? "bg-teal-100 text-teal-800 border-teal-300"
                                  : "bg-[#00F5D4]/15 text-[#00F5D4] border-[#00F5D4]/30"
                              }`}
                            >
                              DEEP C2
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Live Telemetry + Ergonomic Theme Controls + Zen Mode */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {/* Theme Tri-Toggle (Academic Paper | Executive Slate | Cyber Arena) */}
            <div
              className={`flex items-center p-1 rounded-xl border ${
                isPaperTheme
                  ? "bg-white border-[#E2D9CC] shadow-xs"
                  : isSlateTheme
                  ? "bg-slate-900 border-slate-700"
                  : "bg-slate-900/90 border-slate-800"
              }`}
            >
              <button
                type="button"
                onClick={() => setTheme("paper")}
                title="Chế độ Academic Paper (Giấy ngà đọc sâu dịu mắt, chống mỏi mắt)"
                className={`px-2 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  isPaperTheme
                    ? "bg-amber-100 text-amber-900 shadow-xs border border-amber-300"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Sun className="w-3.5 h-3.5 text-amber-600" />
                <span className="hidden sm:inline">Paper</span>
              </button>

              <button
                type="button"
                onClick={() => setTheme("slate")}
                title="Chế độ Executive Slate (Xám phiến đá tối êm, giảm chói)"
                className={`px-2 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  isSlateTheme
                    ? "bg-slate-800 text-sky-300 shadow-xs border border-slate-600"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Moon className="w-3.5 h-3.5 text-sky-400" />
                <span className="hidden sm:inline">Slate</span>
              </button>

              <button
                type="button"
                onClick={() => setTheme("cyber")}
                title="Chế độ Cyber Arena (Phản xạ tốc độ cao / Neon)"
                className={`px-2 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  theme === "cyber"
                    ? "bg-cyan-500/20 text-[#00F5D4] shadow-xs border border-cyan-500/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Sparkle className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Cyber</span>
              </button>
            </div>

            {/* Zen Focus Mode Button */}
            <button
              type="button"
              onClick={toggleZenMode}
              title={isZenMode ? "Tắt Focus Mode [Phím Z]" : "Bật Focus Mode [Phím Z]"}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                isZenMode
                  ? "bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-400 shadow-xs"
                  : isPaperTheme
                  ? "bg-white border-[#E2D9CC] text-slate-700 hover:bg-slate-100"
                  : "bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white"
              }`}
            >
              {isZenMode ? (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-purple-500" />
                  <span className="hidden md:inline font-mono">ZEN ON</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  <span className="hidden md:inline font-mono">ZEN [Z]</span>
                </>
              )}
            </button>

            {/* Live Combo Counter */}
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border transition-all ${
                combo >= 3
                  ? isPaperTheme
                    ? "bg-amber-100 border-amber-300 text-amber-900 font-bold shadow-xs"
                    : "bg-amber-500/15 border-amber-500/60 text-amber-300 shadow-[0_0_18px_rgba(245,158,11,0.28)] scale-[1.02]"
                  : isPaperTheme
                  ? "bg-white border-[#E2D9CC] text-slate-700"
                  : "bg-slate-900/80 border-slate-800 text-slate-300"
              }`}
            >
              <Flame
                className={`w-3.5 h-3.5 ${
                  combo >= 3
                    ? "text-amber-500 animate-bounce"
                    : "text-slate-400"
                }`}
              />
              <div className="text-xs font-mono">
                <span className="font-black text-xs text-amber-600 dark:text-amber-400">
                  x{combo}
                </span>{" "}
                <span className="text-[10px] uppercase tracking-wider text-slate-400 hidden sm:inline">
                  COMBO
                </span>
              </div>
            </div>

            {/* Mastered Counter */}
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-mono ${
                isPaperTheme
                  ? "bg-white border-[#E2D9CC] text-slate-700"
                  : "bg-slate-900/80 border-slate-800 text-slate-300"
              }`}
            >
              <CheckCircle2
                className={`w-3.5 h-3.5 ${isPaperTheme ? "text-teal-700" : "text-[#00F5D4]"}`}
              />
              <span>
                <strong className={isPaperTheme ? "text-slate-900" : "text-white"}>
                  {masteredCount}
                </strong>
                /{totalUnitWords}
              </span>
            </div>

            {/* Interleaved Mistake Heatmap Trigger */}
            <button
              type="button"
              onClick={() => setIsMistakeDrawerOpen(true)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                activeMistakes.length > 0
                  ? "bg-rose-500/15 border-rose-500/60 text-rose-600 dark:text-rose-300 hover:bg-rose-500/25 shadow-xs"
                  : isPaperTheme
                  ? "bg-white border-[#E2D9CC] text-slate-500 hover:text-slate-800"
                  : "bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              <ShieldAlert
                className={`w-3.5 h-3.5 ${
                  activeMistakes.length > 0
                    ? "text-rose-500 animate-pulse"
                    : "text-slate-400"
                }`}
              />
              <span className="hidden sm:inline">Heatmap</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  activeMistakes.length > 0
                    ? "bg-rose-500 text-white"
                    : "bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                }`}
              >
                {activeMistakes.length}
              </span>
            </button>

            {/* Sound Toggle */}
            <button
              type="button"
              onClick={onToggleSound}
              title={soundEnabled ? "Tắt âm thanh tổng hợp" : "Bật âm thanh tổng hợp"}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isPaperTheme
                  ? "bg-white hover:bg-slate-100 border-[#E2D9CC] text-slate-700"
                  : "bg-slate-900/80 hover:bg-slate-800 border-slate-800 text-slate-300 hover:text-[#00F5D4]"
              }`}
            >
              {soundEnabled ? (
                <Volume2 className={`w-4 h-4 ${isPaperTheme ? "text-teal-700" : "text-[#00F5D4]"}`} />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* INTERLEAVED MISTAKE HEATMAP DRAWER / MODAL */}
      {isMistakeDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#0B0F19] border-l border-rose-500/30 h-full flex flex-col justify-between p-6 text-slate-100 shadow-2xl overflow-y-auto">
            {/* Top Drawer Header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-400">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black tracking-tight text-white uppercase">
                      Interleaved Mistake Heatmap
                    </h3>
                    <p className="text-xs text-slate-400">
                      Words with active cognitive friction (heatLevel &gt; 0)
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsMistakeDrawerOpen(false);
                    setIsDrillActive(false);
                  }}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Action CTA: Quick Interleaved Flash Drill */}
              {activeMistakes.length > 0 && !isDrillActive && (
                <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-rose-950/60 via-slate-900 to-slate-900 border border-rose-500/40 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-rose-400 font-bold">
                      ⚡ Active Neural Blindspots: {activeMistakes.length}
                    </div>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Launch a high-speed interleaved flash drill to neutralize
                      heat levels immediately.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleStartFlashDrill}
                    className="shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#00F5D4] hover:bg-[#00F5D4]/90 text-slate-950 font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,245,212,0.4)] transition-all"
                  >
                    <Zap className="w-4 h-4 fill-current" />
                    <span>⚡ Interleaved Flash Drill</span>
                  </button>
                </div>
              )}

              {/* FLASH DRILL VIEW */}
              {isDrillActive && currentDrillMistake ? (
                <div className="mt-6 p-5 rounded-2xl bg-slate-900/90 border border-[#00F5D4]/40 shadow-[0_0_25px_rgba(0,245,212,0.12)]">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
                    <span className="text-[#00F5D4] font-bold">
                      ⚡ FLASH DRILL ({drillIndex + 1}/{activeMistakes.length})
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsDrillActive(false)}
                      className="text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Exit Drill</span>
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0B0F19] border border-slate-800 mb-4">
                    <div className="text-[11px] font-mono uppercase text-rose-400">
                      Target C2 Lexical Node (Heat Lv.{currentDrillMistake.heatLevel})
                    </div>
                    <div className="text-2xl font-black text-white mt-1">
                      {currentDrillMistake.word}
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {drillOptions.map((opt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleAnswerDrill(opt.isCorrect)}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between gap-2 ${
                          drillFeedback
                            ? opt.isCorrect
                              ? "bg-emerald-500/20 border-emerald-400 text-emerald-200"
                              : "bg-slate-950/60 border-slate-800 text-slate-500"
                            : "bg-slate-950/90 hover:bg-slate-800 border-slate-800 hover:border-[#00F5D4]/50 text-slate-200"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-lg bg-slate-800 text-[#00F5D4] font-mono text-xs flex items-center justify-center font-bold shrink-0">
                            {idx + 1}
                          </span>
                          <span>{opt.text}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* HEATMAP LIST VIEW */
                <div className="mt-5 space-y-2.5">
                  {activeMistakes.length === 0 ? (
                    <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 text-center">
                      <CheckCircle2 className="w-10 h-10 text-[#00F5D4] mx-auto mb-2" />
                      <div className="text-sm font-bold text-white">
                        Zero Cognitive Friction Detected
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        All C2 lexical nodes are currently stabilized. Keep
                        pushing your response latency under 1.2 seconds!
                      </p>
                    </div>
                  ) : (
                    activeMistakes.map((item, idx) => {
                      const heatBadge =
                        item.heatLevel >= 3
                          ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                          : item.heatLevel === 2
                          ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                          : "bg-cyan-500/20 text-cyan-300 border-cyan-500/40";
                      return (
                        <div
                          key={`${item.word}-${idx}`}
                          className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-rose-500/40 transition-all flex items-center justify-between gap-3"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white text-sm">
                                {item.word}
                              </span>
                              <span
                                className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${heatBadge}`}
                              >
                                HEAT Lv.{item.heatLevel}
                              </span>
                              {item.mode && (
                                <span className="text-[10px] font-mono text-slate-500 uppercase">
                                  [{item.mode}]
                                </span>
                              )}
                            </div>
                            {item.meaningVi && (
                              <p className="text-xs text-slate-400 mt-1">
                                {item.meaningVi}
                              </p>
                            )}
                          </div>
                          {onClearMistake && (
                            <button
                              type="button"
                              onClick={() => onClearMistake(item.word)}
                              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 text-xs font-mono transition-colors shrink-0"
                            >
                              Clear
                            </button>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>

            {/* Footer note */}
            <div className="pt-4 border-t border-slate-800/80 text-[11px] font-mono text-slate-500 flex items-center justify-between">
              <span>LEXICON OVERDRIVE // TELEMETRY v2.5</span>
              <span className="text-[#00F5D4]">FSRS-LITE ACTIVE</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ArenaHeader;
