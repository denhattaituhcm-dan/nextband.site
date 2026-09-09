import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Target,
  Calendar,
  Pencil,
  Flame,
  CheckCircle2,
  Clock,
  Zap,
  X,
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

const STORAGE_KEY = (userId?: string, classId?: string): string =>
  `exam_goal_${userId || "anon"}_${classId || "default"}`;

interface GoalData {
  listening: number;
  reading: number;
  writing: number;
  speaking: number;
  examDate: string;
}

function loadGoal(userId?: string, classId?: string): GoalData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY(userId, classId));
    return raw ? (JSON.parse(raw) as GoalData) : null;
  } catch { return null; }
}

function saveGoal(goal: GoalData, userId?: string, classId?: string): void {
  try {
    localStorage.setItem(STORAGE_KEY(userId, classId), JSON.stringify(goal));
  } catch {}
}

const BAND_OPTIONS = [4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9];

const SKILLS: { key: keyof Omit<GoalData, "examDate">; label: string; emoji: string }[] = [
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
}

// ─── Main Component ──────────────────────────────────────────────────────────
export function ExamGoalCard({ userId, classId }: ExamGoalCardProps) {
  const saved = useMemo(() => loadGoal(userId, classId), [userId, classId]);

  const DEFAULT_GOAL: GoalData = {
    listening: 7.0,
    reading: 7.0,
    writing: 6.5,
    speaking: 6.5,
    examDate: "",
  };

  const [goal, setGoal] = useState<GoalData>(saved ?? DEFAULT_GOAL);
  const [editing, setEditing] = useState<boolean>(!saved);
  const [draft, setDraft] = useState<GoalData>(goal);

  const overall = calcIELTSOverall(goal.listening, goal.reading, goal.writing, goal.speaking);
  const draftOverall = calcIELTSOverall(draft.listening, draft.reading, draft.writing, draft.speaking);

  const daysLeft = goal.examDate ? daysUntil(goal.examDate) : null;
  const isUrgent = daysLeft !== null && daysLeft <= 14 && daysLeft >= 0;
  const isPassed = daysLeft !== null && daysLeft < 0;

  function handleSave() {
    setGoal(draft);
    saveGoal(draft, userId, classId);
    setEditing(false);
  }

  function handleCancel() {
    setDraft(goal);
    setEditing(false);
  }

  /* ── VIEW MODE ──────────────────────────────────────────────────────────── */
  if (!editing) {
    return (
      <div
        className="relative overflow-hidden rounded-2xl border border-transparent"
        style={{
          background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4338ca 100%)",
          boxShadow: "0 8px 32px rgba(67,56,202,0.35)",
        }}
      >
        {/* Decorative glow blobs */}
        <div
          className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, #f59e0b, transparent)" }}
        />
        <div
          className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(circle, #ec4899, transparent)" }}
        />

        {/* Shimmer top strip — red + gold like the reference image */}
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
                Mục Tiêu Cá Nhân
              </span>
            </div>
            <button
              onClick={() => { setDraft(goal); setEditing(true); }}
              className="flex items-center gap-1 text-[10px] font-semibold text-indigo-200 hover:text-white transition-colors"
            >
              <Pencil className="w-3 h-3" />
              Chỉnh sửa
            </button>
          </div>

          {/* Overall hero + countdown side-by-side */}
          <div className="flex items-end gap-3">
            <div>
              <div className="text-[10px] font-semibold text-indigo-300 uppercase tracking-wider mb-0.5">
                Overall Target
              </div>
              <div className="flex items-baseline gap-1.5">
                <span
                  className="font-black tabular-nums leading-none"
                  style={{
                    fontSize: "clamp(2.5rem, 6vw, 3.5rem)",
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

            {daysLeft !== null ? (
              <div className="ml-auto flex-shrink-0">
                <div
                  className={
                    "px-3 py-2 rounded-xl text-center border " +
                    (isPassed
                      ? "border-slate-600"
                      : isUrgent
                      ? "border-red-500/60"
                      : "border-white/20")
                  }
                  style={
                    isUrgent
                      ? { background: "rgba(239,68,68,0.2)" }
                      : isPassed
                      ? { background: "rgba(100,116,139,0.3)" }
                      : { background: "rgba(255,255,255,0.08)" }
                  }
                >
                  {isPassed ? (
                    <>
                      <div className="text-[10px] text-slate-400 font-medium">Ngày thi</div>
                      <div className="text-sm font-bold text-slate-300">Đã qua</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {new Date(goal.examDate).toLocaleDateString("vi-VN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-[10px] text-indigo-300 font-medium flex items-center gap-1 justify-center">
                        {isUrgent ? (
                          <Flame className="w-3 h-3 text-red-400" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        Còn lại
                      </div>
                      <div
                        className={
                          "text-2xl font-black tabular-nums " +
                          (isUrgent ? "text-red-300" : "text-white")
                        }
                      >
                        {daysLeft}
                      </div>
                      <div
                        className={
                          "text-[10px] font-semibold " +
                          (isUrgent ? "text-red-400" : "text-indigo-300")
                        }
                      >
                        ngày
                      </div>
                      <div className="text-[9px] text-indigo-400 mt-0.5">
                        {new Date(goal.examDate).toLocaleDateString("vi-VN", {
                          day: "2-digit",
                          month: "2-digit",
                        })}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="ml-auto">
                <button
                  onClick={() => { setDraft(goal); setEditing(true); }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold text-amber-300 border border-amber-400/40 hover:bg-amber-400/10 transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Chốt ngày thi
                </button>
              </div>
            )}
          </div>

          {/* 4-skill pills */}
          <div className="grid grid-cols-4 gap-1.5">
            {SKILLS.map((sk) => (
              <div
                key={sk.key}
                className="rounded-xl p-2 text-center"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div className="text-[10px] text-indigo-300 mb-0.5">{sk.emoji}</div>
                <div className="text-sm font-black text-white tabular-nums leading-none">
                  {formatBand(goal[sk.key])}
                </div>
                <div className="text-[9px] text-indigo-400 mt-0.5 truncate">
                  {sk.label.slice(0, 4)}
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
              Thiết lập mục tiêu
            </span>
          </div>
          {saved && (
            <button
              onClick={handleCancel}
              className="text-indigo-300 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Live Overall preview */}
        <div
          className="rounded-xl px-4 py-2.5 flex items-center justify-between"
          style={{
            background: "rgba(245,158,11,0.12)",
            border: "1px solid rgba(245,158,11,0.3)",
          }}
        >
          <span className="text-xs font-semibold text-amber-300">Overall dự kiến</span>
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
        </div>

        {/* Skill band selectors */}
        <div className="space-y-2.5">
          {SKILLS.map((sk) => (
            <div key={sk.key} className="space-y-1.5">
              <div className="flex items-center gap-1.5">
                <span className="text-sm">{sk.emoji}</span>
                <span className="text-[11px] font-bold text-indigo-200">{sk.label}</span>
                <span className="ml-auto text-[11px] font-black text-amber-300 tabular-nums">
                  {formatBand(draft[sk.key])}
                </span>
              </div>
              <div className="flex items-center gap-1 flex-wrap">
                {BAND_OPTIONS.map((band) => (
                  <button
                    key={band}
                    onClick={() => setDraft((d) => ({ ...d, [sk.key]: band }))}
                    className="h-7 min-w-[2.5rem] px-2 rounded-lg text-[11px] font-bold transition-all"
                    style={
                      draft[sk.key] === band
                        ? {
                            background: "linear-gradient(135deg, #fbbf24, #f97316)",
                            color: "#1e1b4b",
                            border: "none",
                            transform: "scale(1.1)",
                            boxShadow: "0 2px 8px rgba(251,191,36,0.4)",
                          }
                        : {
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.12)",
                            color: "#a5b4fc",
                          }
                    }
                  >
                    {formatBand(band)}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Exam date picker */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-200">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            Ngày thi dự kiến (tuỳ chọn)
          </label>
          <input
            type="date"
            value={draft.examDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDraft((d) => ({ ...d, examDate: e.target.value }))}
            className="w-full h-9 rounded-xl px-3 text-sm font-semibold text-white bg-white/10 border border-white/20 focus:outline-none focus:border-amber-400 focus:bg-white/15 transition-all"
            style={{ colorScheme: "dark" }}
          />
        </div>

        {/* Save button */}
        <Button
          onClick={handleSave}
          className="w-full h-10 font-black text-sm rounded-xl gap-2 border-none"
          style={{ background: "linear-gradient(135deg, #fbbf24, #f97316)", color: "#1e1b4b" }}
        >
          <CheckCircle2 className="w-4 h-4" />
          Lưu Mục Tiêu
        </Button>
      </div>
    </div>
  );
}
