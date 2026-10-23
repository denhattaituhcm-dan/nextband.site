import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Compass,
  Lock,
  CheckCircle2,
  Clock,
  Sparkles,
  Award,
  Zap,
  ArrowRight,
  Eye,
  AlertTriangle,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Star,
  Trophy,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import { CanonicalVisualStatus } from "@/lib/homeworkStatusHelper";

export interface IsometricHomeworkNode {
  id: string;
  examId?: string;
  title: string;
  description?: string | null;
  hwNum: string | number;
  status: CanonicalVisualStatus | string;
  skillType?: string;
  badge: {
    label: string;
    shortLabel: string;
    badgeClass: string;
  };
  scoreDisplay: {
    isGraded: boolean;
    scoreText: string;
    subText?: string;
  };
  isObjective?: boolean;
  submission?: any;
}

interface IsometricLessonMapProps {
  homeworkList: IsometricHomeworkNode[];
  onOpenHonorCard?: (hw: IsometricHomeworkNode) => void;
  onPrefetchExam?: (examId: string) => void;
}

/* --------------------------------------------------------------------------
   Mini helper: extract band sub-scores from submission if available
   Supports both { TR, CC, LR, GRA } and { TA, cc, lr, gra } variants
   -------------------------------------------------------------------------- */
function extractSubScores(submission: any): { label: string; score: string }[] | null {
  if (!submission) return null;
  const bs = submission.bandScores || submission.band_scores || submission.subScores;
  if (!bs || typeof bs !== "object") return null;

  const mapping: Record<string, string> = {
    TR: "TR", TA: "TR", ta: "TR",
    CC: "CC", cc: "CC",
    LR: "LR", lr: "LR",
    GRA: "GRA", gra: "GRA",
  };

  const result: { label: string; score: string }[] = [];
  for (const [key, label] of Object.entries(mapping)) {
    if (bs[key] !== undefined) {
      const existing = result.find((r) => r.label === label);
      if (!existing) {
        result.push({ label, score: String(bs[key]) });
      }
    }
  }
  return result.length > 0 ? result : null;
}

/* --------------------------------------------------------------------------
   CSS keyframes injected once as a <style> tag
   -------------------------------------------------------------------------- */
const GLOBAL_STYLES = `
  @keyframes iso-float {
    0%, 100% { transform: translateY(-20px); }
    50% { transform: translateY(-28px); }
  }
  @keyframes iso-gold-glow {
    0%, 100% { box-shadow: 0 0 20px 6px rgba(251,191,36,0.35), 0 0 50px 15px rgba(251,191,36,0.15); }
    50% { box-shadow: 0 0 32px 12px rgba(251,191,36,0.55), 0 0 70px 25px rgba(251,191,36,0.25); }
  }
  @keyframes iso-star-burst {
    0% { opacity: 0; transform: scale(0) rotate(0deg); }
    50% { opacity: 1; transform: scale(1.4) rotate(180deg); }
    100% { opacity: 0; transform: scale(0.6) rotate(360deg); }
  }
  @keyframes iso-achievement-in {
    0% { opacity: 0; transform: translateY(12px) scale(0.96); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes iso-ring-spin {
    from { stroke-dashoffset: 220; }
    to   { stroke-dashoffset: 0; }
  }
  @keyframes iso-confetti-drift {
    0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
    100% { transform: translateY(60px) rotate(720deg); opacity: 0; }
  }
  .iso-float-active { animation: iso-float 3s ease-in-out infinite; }
  .iso-gold-glow { animation: iso-gold-glow 2.5s ease-in-out infinite; }
  .iso-achievement-in { animation: iso-achievement-in 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards; }
`;

/* --------------------------------------------------------------------------
   Particle star decorations around completed island
   -------------------------------------------------------------------------- */
const STAR_POSITIONS = [
  { top: "-18px", left: "50%", delay: "0s", size: "10px", color: "#fbbf24" },
  { top: "-8px", left: "85%", delay: "0.3s", size: "8px", color: "#a78bfa" },
  { top: "10px", left: "95%", delay: "0.6s", size: "6px", color: "#34d399" },
  { top: "-8px", left: "15%", delay: "0.45s", size: "8px", color: "#fbbf24" },
  { top: "10px", left: "5%", delay: "0.15s", size: "6px", color: "#f472b6" },
  { top: "32px", left: "90%", delay: "0.9s", size: "5px", color: "#fbbf24" },
  { top: "32px", left: "10%", delay: "0.75s", size: "5px", color: "#a78bfa" },
];

function ParticleStars() {
  return (
    <>
      {STAR_POSITIONS.map((s, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animation: `iso-star-burst 2.2s ${s.delay} ease-in-out infinite`,
          }}
        >
          {/* ★ unicode star */}
          <svg viewBox="0 0 24 24" fill={s.color} width="100%" height="100%">
            <path d="M12 2l2.9 8.9H23l-7.3 5.3L18.5 25 12 19.7 5.5 25l2.8-8.8L1 10.9h8.1z" />
          </svg>
        </div>
      ))}
    </>
  );
}

/* --------------------------------------------------------------------------
   Circular Score Ring SVG
   -------------------------------------------------------------------------- */
function ScoreRing({ score }: { score: string }) {
  // Attempt to parse a numeric band for ring fill (0-9 scale)
  const numeric = parseFloat(score);
  const pct = isNaN(numeric) ? 0.8 : Math.min(1, numeric / 9);
  const r = 34;
  const circumference = 2 * Math.PI * r; // ≈213.6
  const dashOffset = circumference * (1 - pct);

  return (
    <div className="relative flex-shrink-0 flex items-center justify-center">
      <svg width="88" height="88" viewBox="0 0 88 88">
        {/* Background track */}
        <circle cx="44" cy="44" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
        {/* Progress arc */}
        <circle
          cx="44"
          cy="44"
          r={r}
          fill="none"
          stroke="url(#scoreGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          transform="rotate(-90 44 44)"
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.34,1.56,0.64,1)" }}
        />
        <defs>
          <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
      </svg>
      {/* Center label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[11px] font-bold text-amber-300/70 leading-none uppercase tracking-wide">Band</span>
        <span className="text-xl font-black text-white leading-tight">{score}</span>
      </div>
    </div>
  );
}

export const IsometricLessonMap: React.FC<IsometricLessonMapProps> = ({
  homeworkList,
  onOpenHonorCard,
  onPrefetchExam,
}) => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const mapCanvasRef = useRef<HTMLDivElement>(null);

  // Inject global CSS animations once
  useEffect(() => {
    if (document.getElementById("iso-map-styles")) return;
    const style = document.createElement("style");
    style.id = "iso-map-styles";
    style.textContent = GLOBAL_STYLES;
    document.head.appendChild(style);
    return () => { /* leave styles for reuse */ };
  }, []);

  // Find index of first uncompleted/actionable exercise or default to last
  const initialActiveIndex = useMemo(() => {
    const idx = homeworkList.findIndex(
      (hw) => hw.status === "UNSUBMITTED" || hw.status === "OVERDUE" || hw.status === "IN_PROGRESS"
    );
    return idx !== -1 ? idx : Math.max(0, homeworkList.length - 1);
  }, [homeworkList]);

  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

  // Keep active index in bounds
  useEffect(() => {
    if (activeIndex >= homeworkList.length) {
      setActiveIndex(Math.max(0, homeworkList.length - 1));
    }
  }, [homeworkList.length, activeIndex]);

  const activeNode = homeworkList[activeIndex];

  // Map coordinates in 2.5D Isometric space
  const nodePositions = useMemo(() => {
    const spacingY = 110;
    return homeworkList.map((_, idx) => {
      const zig = Math.sin(idx * 0.9) * 90;
      const x = 320 + zig + (idx % 2 === 0 ? 30 : -30);
      const y = idx * spacingY + 80;
      return { x, y, idx };
    });
  }, [homeworkList]);

  // Center camera on active node
  const scrollToActiveNode = useCallback((idx: number, smooth = true) => {
    const pos = nodePositions[idx];
    if (!pos || !containerRef.current) return;
    const container = containerRef.current;
    container.scrollTo({
      top: Math.max(0, pos.y - container.clientHeight / 2 + 100),
      left: Math.max(0, pos.x - container.clientWidth / 2 + 80),
      behavior: smooth ? "smooth" : "auto",
    });
  }, [nodePositions]);

  useEffect(() => {
    scrollToActiveNode(activeIndex);
  }, [activeIndex, scrollToActiveNode]);

  // Primary navigation action
  const handlePrimaryAction = useCallback((hw: IsometricHomeworkNode) => {
    if (
      hw.submission?.id &&
      (hw.status === "GRADED" || hw.status === "REVISION_REQUIRED" || hw.status === "SUBMITTED")
    ) {
      navigate(routes.student.submission(hw.submission.id));
    } else {
      const examId = hw.examId || hw.id;
      if (examId) navigate(routes.exam.take(examId));
    }
  }, [navigate]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) return;

      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        setActiveIndex((prev) => Math.min(homeworkList.length - 1, prev + 1));
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        setActiveIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === "Enter" && activeNode) {
        e.preventDefault();
        handlePrimaryAction(activeNode);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeNode, homeworkList.length, handlePrimaryAction]);

  // SVG curved path
  const pathD = useMemo(() => {
    if (nodePositions.length === 0) return "";
    let d = `M ${nodePositions[0].x} ${nodePositions[0].y}`;
    for (let i = 1; i < nodePositions.length; i++) {
      const prev = nodePositions[i - 1];
      const curr = nodePositions[i];
      const midY = (prev.y + curr.y) / 2;
      d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
    }
    return d;
  }, [nodePositions]);

  if (homeworkList.length === 0) return null;

  return (
    <div className="relative w-full rounded-3xl bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 border border-indigo-900/40 shadow-2xl overflow-hidden select-none">
      {/* ── Top HUD ─────────────────────────────────────────────────────────── */}
      <div className="relative z-30 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-500/20 bg-slate-900/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600/30 border border-indigo-400/40 text-indigo-400 flex items-center justify-center shadow-lg">
            <Compass className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black tracking-widest text-indigo-300 uppercase">
                BẢN ĐỒ LỘ TRÌNH 2.5D ISOMETRIC
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {homeworkList.length} Trạm Đảo
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5 flex-wrap">
              <span>Click đảo đang chọn hoặc nhấn</span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-bold bg-slate-800 border border-slate-700 rounded text-slate-300">Enter</kbd>
              <span>để vào học. Dùng</span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-bold bg-slate-800 border border-slate-700 rounded text-slate-300">↑</kbd>
              <kbd className="px-1.5 py-0.5 text-[10px] font-bold bg-slate-800 border border-slate-700 rounded text-slate-300">↓</kbd>
              <span>để nhảy trạm.</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button
            size="sm"
            variant="outline"
            onClick={() => scrollToActiveNode(initialActiveIndex)}
            className="h-8 text-xs font-bold bg-indigo-950/60 border-indigo-800/60 text-indigo-200 hover:bg-indigo-900/80 rounded-xl gap-1.5"
            title="Đưa góc nhìn về trạm cần làm hôm nay"
          >
            <Compass className="w-3.5 h-3.5 text-indigo-400" />
            <span>Về trạm hiện tại</span>
          </Button>

          <div className="flex items-center gap-1 px-3 py-1 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-200 font-mono text-xs font-bold">
            <span className="text-indigo-400">TRẠM #{String(activeIndex + 1).padStart(2, "0")}</span>
            <span className="text-slate-500">/</span>
            <span>{String(homeworkList.length).padStart(2, "0")}</span>
          </div>
        </div>
      </div>

      {/* ── Main 2.5D World Stage ────────────────────────────────────────────── */}
      <div
        ref={containerRef}
        className="relative h-[560px] sm:h-[620px] overflow-auto scroll-smooth scrollbar-thin scrollbar-thumb-indigo-900/50"
        style={{ perspective: "1000px" }}
      >
        {/* Ocean Background */}
        <div
          ref={mapCanvasRef}
          className="relative min-w-[800px] min-h-[1000px] py-16 px-8"
          style={{
            height: `${(nodePositions[nodePositions.length - 1]?.y ?? 0) + 260}px`,
            backgroundColor: "#0d1527",
            backgroundImage: `
              radial-gradient(circle at 50% 30%, rgba(30, 58, 138, 0.4) 0%, rgba(13, 21, 39, 0.95) 75%),
              radial-gradient(circle at 20% 70%, rgba(14, 165, 233, 0.08) 0%, transparent 40%),
              radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.08) 0%, transparent 40%),
              linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: "100% 100%, 100% 100%, 100% 100%, 64px 64px, 64px 64px",
          }}
        >
          {/* SVG Path */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: "drop-shadow(0 0 12px rgba(99, 102, 241, 0.4))" }}>
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="50%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>
            </defs>
            <path d={pathD} fill="none" stroke="rgba(99, 102, 241, 0.25)" strokeWidth="12" strokeLinecap="round" />
            <path d={pathD} fill="none" stroke="url(#pathGradient)" strokeWidth="4" strokeDasharray="8 8" strokeLinecap="round" />
          </svg>

          {/* Island Station Nodes */}
          {homeworkList.map((hw, idx) => {
            const pos = nodePositions[idx];
            if (!pos) return null;

            const isCurrent = idx === activeIndex;
            const isCompleted = hw.status === "GRADED";
            const isPending = hw.status === "SUBMITTED";
            const isOverdue = hw.status === "OVERDUE";
            const isRevision = hw.status === "REVISION_REQUIRED";
            const isFoggy = idx > activeIndex + 2;

            // Skill landmark image
            const lowerTitle = (hw.title || "").toLowerCase();
            const skill = (hw.skillType || "").toLowerCase();
            let landmarkImg = "/images/game-map/reading-library.png";
            let landmarkAlt = "Reading Library";

            if (lowerTitle.includes("final") || lowerTitle.includes("test") || hw.hwNum === 999) {
              landmarkImg = "/images/game-map/final-test.png";
              landmarkAlt = "Final Test Castle";
            } else if (skill === "speaking" || lowerTitle.includes("spk") || lowerTitle.includes("nói")) {
              landmarkImg = "/images/game-map/speaking-mic.png";
              landmarkAlt = "Speaking Arena";
            } else if (skill === "listening" || lowerTitle.includes("lis") || lowerTitle.includes("nghe")) {
              landmarkImg = "/images/game-map/listening-lighthouse.png";
              landmarkAlt = "Listening Lighthouse";
            } else if (skill === "writing" || lowerTitle.includes("wri") || lowerTitle.includes("viết")) {
              landmarkImg = "/images/game-map/reading-library.png";
              landmarkAlt = "Writing Academy";
            }

            return (
              <div
                key={hw.id}
                onClick={() => {
                  if (isCurrent) {
                    // Second click on active island = navigate immediately
                    handlePrimaryAction(hw);
                  } else {
                    setActiveIndex(idx);
                    if (onPrefetchExam) onPrefetchExam(hw.examId || hw.id);
                  }
                }}
                className={`absolute transition-all duration-500 cursor-pointer ${
                  isCurrent ? "z-40" : "z-20 hover:scale-110"
                } ${isFoggy ? "opacity-35 blur-[1.5px]" : "opacity-100"}`}
                style={{
                  left: `${pos.x}px`,
                  top: `${pos.y}px`,
                  transform: "translate(-50%, -50%)",
                }}
                title={isCurrent ? `Click để ${isCompleted ? "xem kết quả" : "vào học"} → ${hw.title}` : hw.title}
              >
                <div className="relative group flex flex-col items-center justify-center">

                  {/* ── Active beacon ring ── */}
                  {isCurrent && !isCompleted && (
                    <div className="absolute -inset-8 rounded-full animate-ping opacity-25 bg-indigo-500 pointer-events-none" />
                  )}

                  {/* ── GRADED: Golden Achievement Aura ── */}
                  {isCompleted && isCurrent && (
                    <>
                      <div
                        className="absolute -inset-10 rounded-full pointer-events-none iso-gold-glow"
                        style={{ backgroundColor: "transparent" }}
                      />
                      <div className="absolute -inset-6 rounded-full pointer-events-none opacity-30 animate-ping"
                        style={{ backgroundColor: "rgba(251,191,36,0.4)" }}
                      />
                    </>
                  )}

                  {/* ── Top landmark / victory flag ── */}
                  <div
                    className={`relative z-20 flex flex-col items-center transition-transform duration-300 pointer-events-none ${
                      isCurrent ? "iso-float-active" : ""
                    }`}
                    style={{ transform: isCurrent ? undefined : "translateY(-6px)" }}
                  >
                    {isCompleted ? (
                      /* ── Victory Flag + Particle Stars ── */
                      <div className="relative flex flex-col items-center">
                        {/* Particles around completed island */}
                        <ParticleStars />

                        <img
                          src="/images/game-map/victory-flag.png"
                          alt="Victory Flag"
                          className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-xl"
                          style={{ filter: "drop-shadow(0 0 12px rgba(251,191,36,0.7))" }}
                        />

                        {/* Mini gold score badge on flag */}
                        <div className="-mt-2 px-2.5 py-0.5 rounded-full font-extrabold text-[11px] shadow-xl border flex items-center gap-1"
                          style={{
                            background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                            borderColor: "#fde68a",
                            color: "#1c1917",
                          }}
                        >
                          <Star className="w-3 h-3 fill-yellow-900 text-yellow-900" />
                          <span>{hw.scoreDisplay.scoreText}</span>
                        </div>
                      </div>
                    ) : (
                      /* ── Skill Landmark ── */
                      <div className="relative flex flex-col items-center">
                        <img
                          src={landmarkImg}
                          alt={landmarkAlt}
                          className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-xl"
                        />
                        {isOverdue ? (
                          <div className="-mt-1 px-2 py-0.5 rounded-full bg-rose-600 text-white font-bold text-[10px] shadow-lg border border-rose-300 flex items-center gap-1 animate-bounce">
                            <AlertTriangle className="w-3 h-3" />
                            <span>Quá hạn</span>
                          </div>
                        ) : isPending ? (
                          <div className="-mt-1 px-2 py-0.5 rounded-full bg-indigo-600 text-white font-bold text-[10px] shadow-lg border border-indigo-300 flex items-center gap-1">
                            <Clock className="w-3 h-3 animate-spin" />
                            <span>Chờ chấm</span>
                          </div>
                        ) : isRevision ? (
                          <div className="-mt-1 px-2 py-0.5 rounded-full bg-amber-600 text-white font-bold text-[10px] shadow-lg border border-amber-300 flex items-center gap-1 animate-bounce">
                            <RotateCcw className="w-3 h-3" />
                            <span>Cần sửa</span>
                          </div>
                        ) : isFoggy ? (
                          <div className="-mt-1 p-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700 shadow-md">
                            <Lock className="w-3 h-3" />
                          </div>
                        ) : (
                          <div className="-mt-1 px-2 py-0.5 rounded-full bg-slate-900/90 text-indigo-300 font-black text-[10px] border border-indigo-500/40 shadow-md">
                            {hw.badge.shortLabel}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* ── Floating Island Meadow Base ── */}
                  <div className="relative z-10 -mt-6">
                    <img
                      src="/images/game-map/floating-meadow.png"
                      alt="Floating Island"
                      className={`w-32 h-24 sm:w-36 sm:h-28 object-contain transition-all duration-300 ${
                        isCurrent
                          ? isCompleted
                            ? "drop-shadow-[0_15px_30px_rgba(251,191,36,0.55)] brightness-115"
                            : "drop-shadow-[0_15px_25px_rgba(99,102,241,0.6)] brightness-110"
                          : isCompleted
                          ? "drop-shadow-[0_10px_20px_rgba(16,185,129,0.45)]"
                          : isOverdue
                          ? "drop-shadow-[0_10px_20px_rgba(244,63,94,0.5)]"
                          : "drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
                      }`}
                    />
                    {/* Station number */}
                    <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md font-mono text-[10px] font-black shadow-md border ${
                      isCompleted
                        ? "bg-amber-900/80 border-amber-600/60 text-amber-200"
                        : "bg-slate-900/80 border-slate-700 text-white"
                    }`}>
                      #{hw.hwNum}
                    </div>
                  </div>

                  {/* ── "Tap lần 2 để vào" hint on active ── */}
                  {isCurrent && (
                    <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-lg text-[10px] font-bold text-slate-300/80 bg-slate-900/70 border border-slate-700/50 pointer-events-none backdrop-blur-sm">
                      {isCompleted ? "Click để xem kết quả →" : "Click để vào học →"}
                    </div>
                  )}

                  {/* ── Fog cloud on locked islands ── */}
                  {isFoggy && (
                    <img
                      src="/images/game-map/cloud.png"
                      alt="Fog Cloud"
                      className="absolute -bottom-4 -right-4 w-28 h-20 object-contain opacity-80 pointer-events-none z-30"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Bottom Drawer: Active Island Detail ─────────────────────────────── */}
      {activeNode && (
        <div className="relative z-30 bg-slate-900/95 border-t border-indigo-900/60 backdrop-blur-xl iso-achievement-in">
          {/* ── ACHIEVEMENT PANEL (when GRADED) ── */}
          {activeNode.status === "GRADED" && (() => {
            const subScores = extractSubScores(activeNode.submission);
            const scoreText = activeNode.scoreDisplay.scoreText;
            const subText = activeNode.scoreDisplay.subText;

            return (
              <div className="p-4 sm:p-5 border-b border-amber-900/30"
                style={{
                  background: "linear-gradient(135deg, rgba(120,53,15,0.35) 0%, rgba(6,78,59,0.30) 50%, rgba(30,27,75,0.35) 100%)",
                }}
              >
                <div className="max-w-4xl mx-auto">
                  {/* Header banner */}
                  <div className="flex items-center gap-2 mb-3">
                    <Trophy className="w-5 h-5 text-amber-400 flex-shrink-0" style={{ filter: "drop-shadow(0 0 6px rgba(251,191,36,0.8))" }} />
                    <span className="text-sm font-black text-amber-300 tracking-wide uppercase">
                      🎉 Thành tựu chinh phục — {activeNode.title}
                    </span>
                  </div>

                  {/* Score row */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    {/* Circular Band Score Ring */}
                    <ScoreRing score={scoreText} />

                    {/* Sub-scores + meta */}
                    <div className="flex-1 space-y-2">
                      {subScores && subScores.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {subScores.map((s) => (
                            <div key={s.label} className="flex flex-col items-center px-3 py-1.5 rounded-xl border border-amber-500/20 bg-amber-900/20 min-w-[52px]">
                              <span className="text-[10px] font-bold text-amber-300/70 uppercase tracking-wide">{s.label}</span>
                              <span className="text-base font-black text-amber-200">{s.score}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {subText && (
                        <p className="text-xs text-emerald-300/80 flex items-center gap-1.5">
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                          {subText}
                        </p>
                      )}

                      {/* Motivational tag */}
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Đã hoàn thành xuất sắc
                        </span>
                        {activeNode.isObjective === false && (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                            <Star className="w-3 h-3 fill-purple-400 text-purple-400" />
                            Có nhận xét chi tiết từ GV
                          </span>
                        )}
                      </div>
                    </div>

                    {/* CTA buttons for GRADED */}
                    <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
                      <Button
                        size="sm"
                        onClick={() => handlePrimaryAction(activeNode)}
                        className="h-10 px-5 font-bold text-sm rounded-xl shadow-lg gap-2 w-full sm:w-auto"
                        style={{
                          background: "linear-gradient(135deg, #059669, #0d9488)",
                          boxShadow: "0 4px 20px rgba(5,150,105,0.4)",
                        }}
                      >
                        <Eye className="w-4 h-4" />
                        <span>Xem Nhận Xét Chi Tiết</span>
                      </Button>

                      {onOpenHonorCard && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onOpenHonorCard(activeNode)}
                          className="h-9 px-4 text-xs font-bold bg-amber-500/10 border-amber-500/40 text-amber-300 hover:bg-amber-500/20 rounded-xl gap-1.5 w-full sm:w-auto"
                        >
                          <Award className="w-3.5 h-3.5 text-amber-400" />
                          <span>🤩 Khoe Ba Mẹ</span>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* ── Standard Info Row (all states, compact for GRADED) ── */}
          <div className="p-4 sm:p-5">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              {/* Station Title & Metadata */}
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-lg bg-indigo-600 text-white font-mono font-bold text-xs">
                    TRẠM #{activeNode.hwNum}
                  </span>
                  <Badge variant="outline" className={`text-xs font-bold ${activeNode.badge.badgeClass}`}>
                    {activeNode.badge.label}
                  </Badge>
                  {activeNode.status === "OVERDUE" && (
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Cần làm bù ngay
                    </span>
                  )}
                  {activeNode.status === "SUBMITTED" && (
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-bold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      Giáo viên đang chấm
                    </span>
                  )}
                  {activeNode.status === "REVISION_REQUIRED" && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1">
                      <RotateCcw className="w-3.5 h-3.5" />
                      Yêu cầu sửa bài
                    </span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-black text-white truncate" title={activeNode.title}>
                  {activeNode.title}
                </h3>
                {activeNode.description && (
                  <p className="text-xs text-slate-400 line-clamp-1">{activeNode.description}</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2.5 shrink-0">
                {/* Prev / Next navigation */}
                <div className="flex items-center gap-1 mr-2">
                  <button
                    type="button"
                    onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
                    disabled={activeIndex === 0}
                    className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Trạm trước (Phím ↑)"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveIndex((prev) => Math.min(homeworkList.length - 1, prev + 1))}
                    disabled={activeIndex === homeworkList.length - 1}
                    className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Trạm kế tiếp (Phím ↓)"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Primary CTA — hidden for GRADED (already shown in achievement panel) */}
                {activeNode.status !== "GRADED" && (
                  <Button
                    size="sm"
                    onClick={() => handlePrimaryAction(activeNode)}
                    className={`h-9 px-5 font-bold text-xs rounded-xl shadow-lg gap-2 ${
                      activeNode.status === "OVERDUE"
                        ? "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-900/50"
                        : activeNode.status === "REVISION_REQUIRED"
                        ? "bg-amber-600 hover:bg-amber-700 text-white shadow-amber-900/50"
                        : activeNode.status === "SUBMITTED"
                        ? "bg-slate-700 hover:bg-slate-600 text-white"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-900/50"
                    }`}
                  >
                    {activeNode.status === "OVERDUE" ? (
                      <><Zap className="w-3.5 h-3.5" /><span>Làm Bù Ngay</span></>
                    ) : activeNode.status === "REVISION_REQUIRED" ? (
                      <><RotateCcw className="w-3.5 h-3.5" /><span>Làm Bài Sửa (Attempt 2)</span></>
                    ) : activeNode.status === "SUBMITTED" ? (
                      <><Eye className="w-3.5 h-3.5" /><span>Xem Bài Nộp</span></>
                    ) : (
                      <><Sparkles className="w-3.5 h-3.5" /><span>Vào Học &amp; Làm Bài</span></>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
