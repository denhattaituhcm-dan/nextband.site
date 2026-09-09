import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Target,
  Calendar,
  Pencil,
  Flame,
  CheckCircle2,
  Clock,
  Zap,
  X,
  Plus,
  Minus,
  Award,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

// ─── IELTS Official Overall Band Rounding ───────────────────────────────────
function calcIELTSOverall(l: number, r: number, w: number, s: number): number {
  const avg = (l + r + w + s) / 4;
  const frac = avg - Math.floor(avg);
  if (frac < 0.25) return Math.floor(avg);
  if (frac < 0.75) return Math.floor(avg) + 0.5;
  return Math.ceil(avg);
}

function formatBand(v: number): string {
  return v % 1 === 0 ? v.toFixed(1) : String(v);
}

// Danh hiệu học thuật theo Overall Band
interface AcademicTitle {
  title: string;
  badge: string;
  color: string;
  border: string;
  bg: string;
}

function getAcademicTitle(band: number): AcademicTitle {
  if (band >= 8.5) {
    return {
      title: "Học Tôn · Academic Grandmaster",
      badge: "Học Tôn (8.5 - 9.0)",
      color: "text-amber-300",
      border: "border-amber-400/40",
      bg: "bg-amber-400/15",
    };
  }
  if (band >= 7.5) {
    return {
      title: "Học Bá · Academic Elite",
      badge: "Học Bá (7.5 - 8.0)",
      color: "text-rose-300",
      border: "border-rose-400/40",
      bg: "bg-rose-400/15",
    };
  }
  if (band >= 6.5) {
    return {
      title: "Học Giả · Academic Scholar",
      badge: "Học Giả (6.5 - 7.0)",
      color: "text-indigo-200",
      border: "border-indigo-400/40",
      bg: "bg-indigo-400/15",
    };
  }
  if (band >= 5.5) {
    return {
      title: "Học Sư · Academic Master",
      badge: "Học Sư (5.5 - 6.0)",
      color: "text-teal-300",
      border: "border-teal-400/40",
      bg: "bg-teal-400/15",
    };
  }
  if (band >= 4.5) {
    return {
      title: "Học Sĩ · Academic Specialist",
      badge: "Học Sĩ (4.5 - 5.0)",
      color: "text-orange-300",
      border: "border-orange-400/40",
      bg: "bg-orange-400/15",
    };
  }
  if (band >= 3.5) {
    return {
      title: "Học Đồ · Academic Apprentice",
      badge: "Học Đồ (3.5 - 4.0)",
      color: "text-sky-300",
      border: "border-sky-400/40",
      bg: "bg-sky-400/15",
    };
  }
  return {
    title: "Tân Binh · Academic Novice",
    badge: "Nền tảng (1.0 - 3.0)",
    color: "text-emerald-300",
    border: "border-emerald-400/40",
    bg: "bg-emerald-400/15",
  };
}

const STORAGE_KEY = (userId?: string, classId?: string): string =>
  `exam_goal_${userId || "anon"}_${classId || "default"}`;

export interface GoalData {
  currentBand: number; // Điểm hiện tại (Baseline: 1.0 - 9.0)
  listening: number;
  reading: number;
  writing: number;
  speaking: number;
  examDate: string; // Ngày thi / Deadline chốt chặn (Bắt buộc)
}

function loadGoal(userId?: string, classId?: string): GoalData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY(userId, classId));
    if (!raw) return null;
    const data = JSON.parse(raw) as GoalData;
    // Migrations nếu dữ liệu cũ chưa có currentBand
    if (!data.currentBand) {
      data.currentBand = 5.0;
    }
    return data;
  } catch {
    return null;
  }
}

function saveGoal(goal: GoalData, userId?: string, classId?: string): void {
  try {
    localStorage.setItem(STORAGE_KEY(userId, classId), JSON.stringify(goal));
  } catch {}
}

const SKILLS: { key: "listening" | "reading" | "writing" | "speaking"; label: string; emoji: string }[] = [
  { key: "listening", label: "Listening", emoji: "🎧" },
  { key: "reading",   label: "Reading",   emoji: "📖" },
  { key: "writing",   label: "Writing",   emoji: "✍️" },
  { key: "speaking",  label: "Speaking",  emoji: "🎙️" },
];

function daysUntil(dateStr: string): number {
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

interface ExamGoalCardProps {
  userId?: string;
  classId?: string;
  initialCurrentBand?: number;
}

// ─── Main Component ──────────────────────────────────────────────────────────
export function ExamGoalCard({ userId, classId, initialCurrentBand }: ExamGoalCardProps) {
  const saved = useMemo(() => loadGoal(userId, classId), [userId, classId]);

  const defaultBaseline = initialCurrentBand || 5.0;
  const DEFAULT_GOAL: GoalData = {
    currentBand: defaultBaseline,
    listening: Math.min(9.0, defaultBaseline + 1.5),
    reading: Math.min(9.0, defaultBaseline + 1.5),
    writing: Math.min(9.0, defaultBaseline + 1.0),
    speaking: Math.min(9.0, defaultBaseline + 1.0),
    examDate: "",
  };

  const [goal, setGoal] = useState<GoalData>(saved ?? DEFAULT_GOAL);
  const [editing, setEditing] = useState<boolean>(!saved);
  const [draft, setDraft] = useState<GoalData>(goal);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const overall = calcIELTSOverall(goal.listening, goal.reading, goal.writing, goal.speaking);
  const draftOverall = calcIELTSOverall(draft.listening, draft.reading, draft.writing, draft.speaking);

  const daysLeft = goal.examDate ? daysUntil(goal.examDate) : null;
  const isUrgent = daysLeft !== null && daysLeft <= 14 && daysLeft >= 0;
  const isPassed = daysLeft !== null && daysLeft < 0;

  const currentRank = getAcademicTitle(overall);
  const draftRank = getAcademicTitle(draftOverall);

  // Tính khoảng cách bứt phá (Gap)
  const targetGap = parseFloat((draftOverall - draft.currentBand).toFixed(1));

  function updateSkillBand(skill: "listening" | "reading" | "writing" | "speaking", delta: number) {
    setDraft((d) => {
      const next = Math.max(1.0, Math.min(9.0, parseFloat((d[skill] + delta).toFixed(1))));
      return { ...d, [skill]: next };
    });
  }

  function updateCurrentBand(delta: number) {
    setDraft((d) => {
      const next = Math.max(1.0, Math.min(9.0, parseFloat((d.currentBand + delta).toFixed(1))));
      return { ...d, currentBand: next };
    });
  }

  function handleSave() {
    if (!draft.examDate) {
      setErrorMsg("Vui lòng chọn ngày thi / deadline hoàn thành để chốt mục tiêu!");
      return;
    }
    setErrorMsg("");
    setGoal(draft);
    saveGoal(draft, userId, classId);
    setEditing(false);
  }

  function handleCancel() {
    setErrorMsg("");
    setDraft(goal);
    setEditing(false);
  }

  /* ── VIEW MODE ──────────────────────────────────────────────────────────── */
  if (!editing) {
    const savedGap = parseFloat((overall - (goal.currentBand || 5.0)).toFixed(1));

    return (
      <div
        className="relative overflow-hidden rounded-2xl border border-transparent"
        style={{
          background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4338ca 100%)",
          boxShadow: "0 8px 32px rgba(67,56,202,0.35)",
        }}
      >
        {/* Glow decoration */}
        <div
          className="absolute -top-6 -right-6 w-28 h-28 rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, #f59e0b, transparent)" }}
        />
        <div
          className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(circle, #ec4899, transparent)" }}
        />

        {/* Shimmer top strip */}
        <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #f59e0b, #ef4444, #f59e0b)" }} />

        <div className="p-4 space-y-3.5">
          {/* Header row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="h-6 w-6 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(245,158,11,0.25)" }}
              >
                <Target className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300">
                Mục Tiêu Học Thuật
              </span>
            </div>
            <button
              onClick={() => {
                setDraft(goal);
                setErrorMsg("");
                setEditing(true);
              }}
              className="flex items-center gap-1 text-[11px] font-semibold text-indigo-200 hover:text-white transition-colors px-2 py-1 rounded-md hover:bg-white/10"
            >
              <Pencil className="w-3 h-3" />
              Chỉnh sửa
            </button>
          </div>

          {/* Academic Badge */}
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${currentRank.border} ${currentRank.bg} ${currentRank.color}`}
            >
              <Award className="w-3 h-3" />
              {currentRank.title}
            </span>
            {savedGap > 0 && (
              <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-300 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30">
                <TrendingUp className="w-3 h-3" />
                Bứt phá +{savedGap} band
              </span>
            )}
          </div>

          {/* Overall hero + countdown side-by-side */}
          <div className="flex items-end justify-between gap-3 pt-1">
            <div>
              <div className="text-[10px] font-semibold text-indigo-300 uppercase tracking-wider mb-0.5 flex items-center gap-1.5">
                <span>Xuất phát {formatBand(goal.currentBand || 5.0)}</span>
                <span className="text-white/40">➔</span>
                <span className="text-amber-300 font-bold">Overall Đích</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span
                  className="font-black tabular-nums leading-none"
                  style={{
                    fontSize: "clamp(2.5rem, 5vw, 3.25rem)",
                    background: "linear-gradient(135deg, #fbbf24, #f97316)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: "drop-shadow(0 0 12px rgba(251,191,36,0.4))",
                  }}
                >
                  {formatBand(overall)}
                </span>
                <span className="text-indigo-300 text-sm font-semibold pb-1">/ 9.0</span>
              </div>
            </div>

            {daysLeft !== null && (
              <div className="flex-shrink-0">
                <div
                  className={
                    "px-3 py-2 rounded-xl text-center border min-w-[5.5rem] " +
                    (isPassed
                      ? "border-slate-600 bg-slate-800/40"
                      : isUrgent
                      ? "border-red-500/60 bg-red-500/20"
                      : "border-white/20 bg-white/10")
                  }
                >
                  {isPassed ? (
                    <>
                      <div className="text-[9px] text-slate-400 font-medium">Hạn chót</div>
                      <div className="text-xs font-bold text-slate-300">Đã qua</div>
                      <div className="text-[9px] text-slate-400 mt-0.5">
                        {new Date(goal.examDate).toLocaleDateString("vi-VN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-[9px] text-indigo-300 font-medium flex items-center gap-1 justify-center">
                        {isUrgent ? (
                          <Flame className="w-3 h-3 text-red-400 animate-pulse" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        Còn lại
                      </div>
                      <div
                        className={
                          "text-2xl font-black tabular-nums leading-none mt-1 " +
                          (isUrgent ? "text-red-300" : "text-white")
                        }
                      >
                        {daysLeft}
                      </div>
                      <div
                        className={
                          "text-[9px] font-semibold mt-0.5 " +
                          (isUrgent ? "text-red-400" : "text-indigo-300")
                        }
                      >
                        ngày đếm ngược
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 4-skill pills */}
          <div className="grid grid-cols-4 gap-1.5 pt-1">
            {SKILLS.map((sk) => (
              <div
                key={sk.key}
                className="rounded-xl p-2 text-center transition-transform hover:scale-[1.02]"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <div className="text-[11px] mb-0.5">{sk.emoji}</div>
                <div className="text-sm font-black text-amber-300 tabular-nums leading-none">
                  {formatBand(goal[sk.key])}
                </div>
                <div className="text-[9px] font-medium text-indigo-300 mt-1 truncate">
                  {sk.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ── EDIT MODE ──────────────────────────────────────────────────────────── */
  return (
    <div
      className="relative overflow-hidden rounded-2xl"
      style={{
        background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #1e1b4b 100%)",
        boxShadow: "0 8px 32px rgba(67,56,202,0.35)",
      }}
    >
      <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #f59e0b, #ef4444, #f59e0b)" }} />

      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-[11px] font-black uppercase tracking-widest text-amber-300">
              Thiết lập mục tiêu học thuật
            </span>
          </div>
          {saved && (
            <button
              onClick={handleCancel}
              className="p-1 rounded-md text-indigo-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Khối 1: Đích đến & Cấp bậc học thuật (Hero Overall Preview) */}
        <div
          className="rounded-xl p-3"
          style={{
            background: "rgba(245,158,11,0.12)",
            border: "1px solid rgba(245,158,11,0.3)",
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-200">
                Overall dự kiến
              </div>
              <div
                className={`inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded text-[10px] font-bold border ${draftRank.border} ${draftRank.bg} ${draftRank.color}`}
              >
                <Award className="w-3 h-3" />
                {draftRank.badge}
              </div>
            </div>
            <div className="text-right">
              <span
                className="text-3xl font-black tabular-nums"
                style={{
                  background: "linear-gradient(135deg, #fbbf24, #f97316)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {formatBand(draftOverall)}
              </span>
              <span className="text-xs font-semibold text-indigo-300 ml-1">/ 9.0</span>
            </div>
          </div>

          {/* Gap indicator */}
          <div className="pt-2 border-t border-amber-400/20 flex items-center justify-between text-xs">
            <span className="text-indigo-200 font-medium">Khoảng cách bứt phá:</span>
            <span
              className={`font-bold tabular-nums px-2 py-0.5 rounded ${
                targetGap > 0
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  : targetGap === 0
                  ? "bg-white/10 text-white/80"
                  : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
              }`}
            >
              {targetGap > 0 ? `+${targetGap} Band` : `${targetGap} Band`}
              {targetGap > 0 && ` (${Math.round(targetGap / 0.5)} nấc)`}
            </span>
          </div>
        </div>

        {/* Khối 2: 4 Kỹ năng (Sliders mượt mà với bước 0.5 từ 1.0 - 9.0) */}
        <div className="space-y-3.5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">
            Mục tiêu 4 kỹ năng (1.0 - 9.0)
          </div>

          {SKILLS.map((sk) => {
            const val = draft[sk.key];
            return (
              <div
                key={sk.key}
                className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 space-y-2"
              >
                {/* Header row for skill */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">{sk.emoji}</span>
                    <span className="text-xs font-bold text-white">{sk.label}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Stepper buttons for high precision on mobile */}
                    <div className="flex items-center gap-1 bg-black/20 rounded-lg p-0.5 border border-white/10">
                      <button
                        type="button"
                        onClick={() => updateSkillBand(sk.key, -0.5)}
                        disabled={val <= 1.0}
                        className="w-6 h-6 rounded flex items-center justify-center text-indigo-200 hover:text-white hover:bg-white/15 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-9 text-center text-xs font-black text-amber-300 tabular-nums">
                        {formatBand(val)}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateSkillBand(sk.key, 0.5)}
                        disabled={val >= 9.0}
                        className="w-6 h-6 rounded flex items-center justify-center text-indigo-200 hover:text-white hover:bg-white/15 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Smooth Slider */}
                <div className="px-1 py-1">
                  <Slider
                    value={[val]}
                    min={1.0}
                    max={9.0}
                    step={0.5}
                    onValueChange={(v) => {
                      if (v && v[0] !== undefined) {
                        setDraft((d) => ({ ...d, [sk.key]: v[0] }));
                      }
                    }}
                    className="cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] font-semibold text-indigo-300/60 mt-1 px-0.5">
                    <span>1.0</span>
                    <span>3.0</span>
                    <span>5.0</span>
                    <span>7.0</span>
                    <span>9.0</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Khối 3: Vạch xuất phát & Mốc thời gian (SMART: Time-bound) */}
        <div className="space-y-3 pt-2 border-t border-white/10">
          {/* Baseline level */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-indigo-200 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-indigo-400" />
                Điểm xuất phát hiện tại (Baseline):
              </label>
              <div className="flex items-center gap-1 bg-black/20 rounded-lg p-0.5 border border-white/10">
                <button
                  type="button"
                  onClick={() => updateCurrentBand(-0.5)}
                  disabled={draft.currentBand <= 1.0}
                  className="w-6 h-6 rounded flex items-center justify-center text-indigo-200 hover:text-white hover:bg-white/15 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-9 text-center text-xs font-black text-indigo-200 tabular-nums">
                  {formatBand(draft.currentBand)}
                </span>
                <button
                  type="button"
                  onClick={() => updateCurrentBand(0.5)}
                  disabled={draft.currentBand >= 9.0}
                  className="w-6 h-6 rounded flex items-center justify-center text-indigo-200 hover:text-white hover:bg-white/15 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="px-1 py-1">
              <Slider
                value={[draft.currentBand]}
                min={1.0}
                max={9.0}
                step={0.5}
                onValueChange={(v) => {
                  if (v && v[0] !== undefined) {
                    setDraft((d) => ({ ...d, currentBand: v[0] }));
                  }
                }}
                className="cursor-pointer"
              />
            </div>
            <p className="text-[10px] text-indigo-300/80">
              Định vị điểm xuất phát giúp hệ thống đo lường chính xác khoảng cách năng lực cần chinh phục.
            </p>
          </div>

          {/* Exam date picker (MANDATORY) */}
          <div className="space-y-1.5">
            <label className="flex items-center justify-between text-xs font-bold text-indigo-200">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                Ngày thi dự kiến / Deadline <span className="text-red-400">*</span>
              </span>
              <span className="text-[10px] text-amber-300 font-semibold">(Bắt buộc)</span>
            </label>
            <input
              type="date"
              required
              value={draft.examDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => {
                setErrorMsg("");
                setDraft((d) => ({ ...d, examDate: e.target.value }));
              }}
              className="w-full h-10 rounded-xl px-3 text-sm font-semibold text-white bg-white/10 border border-white/20 focus:outline-none focus:border-amber-400 focus:bg-white/15 transition-all cursor-pointer"
              style={{ colorScheme: "dark" }}
            />
            {draft.examDate && (
              <div className="flex items-center gap-1.5 text-[10px] text-amber-300 font-medium">
                <Clock className="w-3 h-3" />
                <span>
                  {daysUntil(draft.examDate) > 0
                    ? `Thời gian rèn luyện còn lại: ${daysUntil(draft.examDate)} ngày`
                    : "Hạn chót là hôm nay"}
                </span>
              </div>
            )}
          </div>

          {/* Validation error message */}
          {errorMsg && (
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-red-500/20 border border-red-500/40 text-red-200 text-xs font-medium">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Save button */}
        <Button
          onClick={handleSave}
          className="w-full h-11 font-black text-sm rounded-xl gap-2 border-none shadow-lg shadow-amber-500/20 transition-all hover:brightness-110 active:scale-[0.99]"
          style={{ background: "linear-gradient(135deg, #fbbf24, #f97316)", color: "#1e1b4b" }}
        >
          <CheckCircle2 className="w-4 h-4" />
          Lưu Mục Tiêu & Cam Kết
        </Button>
      </div>
    </div>
  );
}

