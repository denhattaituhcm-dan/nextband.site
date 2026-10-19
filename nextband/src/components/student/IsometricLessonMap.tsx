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
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Flag,
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

export const IsometricLessonMap: React.FC<IsometricLessonMapProps> = ({
  homeworkList,
  onOpenHonorCard,
  onPrefetchExam,
}) => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const mapCanvasRef = useRef<HTMLDivElement>(null);

  // Find index of first uncompleted/actionable exercise or default to 0
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
  // Nodes follow a sinuous winding path (zigzag) going upwards diagonally
  const nodePositions = useMemo(() => {
    const spacingX = 170;
    const spacingY = 110;
    return homeworkList.map((_, idx) => {
      // Zigzag curve: alternating X offset to mimic natural mountain/island archipelago
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
    const targetScrollTop = pos.y - container.clientHeight / 2 + 100;
    const targetScrollLeft = pos.x - container.clientWidth / 2 + 80;

    container.scrollTo({
      top: Math.max(0, targetScrollTop),
      left: Math.max(0, targetScrollLeft),
      behavior: smooth ? "smooth" : "auto",
    });
  }, [nodePositions]);

  // Scroll to active on mount and index change
  useEffect(() => {
    scrollToActiveNode(activeIndex);
  }, [activeIndex, scrollToActiveNode]);

  // Keyboard navigation: ArrowUp/Down to step through path, Enter to action
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

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
  }, [activeNode, homeworkList.length]);

  const handlePrimaryAction = (hw: IsometricHomeworkNode) => {
    if (
      hw.submission?.id &&
      (hw.status === "GRADED" || hw.status === "REVISION_REQUIRED" || hw.status === "SUBMITTED")
    ) {
      navigate(routes.student.submission(hw.submission.id));
    } else {
      const examId = hw.examId || hw.id;
      if (examId) navigate(routes.exam.take(examId));
    }
  };

  // SVG curved path connecting all island stations
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
      {/* Top HUD bar with stats, guide & navigation compass */}
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
              <span>Dùng phím</span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-bold bg-slate-800 border border-slate-700 rounded text-slate-300">
                ↑
              </kbd>
              <kbd className="px-1.5 py-0.5 text-[10px] font-bold bg-slate-800 border border-slate-700 rounded text-slate-300">
                ↓
              </kbd>
              <span>để nhảy trạm chéo, nhấn</span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-bold bg-slate-800 border border-slate-700 rounded text-slate-300">
                Enter
              </kbd>
              <span>để vào học.</span>
            </p>
          </div>
        </div>

        {/* Controls: Focus Station & Progress counter */}
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

      {/* Main 2.5D Isometric World Stage */}
      <div
        ref={containerRef}
        className="relative h-[560px] sm:h-[620px] overflow-auto scroll-smooth scrollbar-thin scrollbar-thumb-indigo-900/50"
        style={{ perspective: "1000px" }}
      >
        {/* Isometric Grid Background Pattern */}
        <div
          ref={mapCanvasRef}
          className="relative min-w-[750px] min-h-[1000px] py-12 px-6"
          style={{
            height: `${nodePositions[nodePositions.length - 1]?.y + 240}px`,
            backgroundImage: `
              radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.08) 0%, transparent 60%),
              linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: "100% 100%, 60px 60px, 60px 60px",
          }}
        >
          {/* Animated SVG Path connecting island nodes */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ filter: "drop-shadow(0 0 12px rgba(99, 102, 241, 0.4))" }}
          >
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="50%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>
            </defs>

            {/* Background Glow Path */}
            <path
              d={pathD}
              fill="none"
              stroke="rgba(99, 102, 241, 0.25)"
              strokeWidth="12"
              strokeLinecap="round"
            />
            {/* Dashed Golden/Neon Road */}
            <path
              d={pathD}
              fill="none"
              stroke="url(#pathGradient)"
              strokeWidth="4"
              strokeDasharray="8 8"
              strokeLinecap="round"
            />
          </svg>

          {/* Island Station Nodes rendered in Isometric 2.5D coordinates */}
          {homeworkList.map((hw, idx) => {
            const pos = nodePositions[idx];
            if (!pos) return null;

            const isCurrent = idx === activeIndex;
            const isCompleted = hw.status === "GRADED";
            const isPending = hw.status === "SUBMITTED";
            const isOverdue = hw.status === "OVERDUE";
            const isRevision = hw.status === "REVISION_REQUIRED";

            // Fog of war: stations far ahead from active node have fog effect
            const isFoggy = idx > activeIndex + 2;

            // Island 2.5D Styling
            let islandColorClass = "from-slate-700 to-slate-900 border-slate-600";
            let glowShadow = "rgba(100, 116, 139, 0.2)";
            if (isCompleted) {
              islandColorClass = "from-emerald-500 via-teal-600 to-emerald-800 border-emerald-400";
              glowShadow = "rgba(16, 185, 129, 0.45)";
            } else if (isOverdue) {
              islandColorClass = "from-rose-500 via-red-600 to-rose-800 border-rose-400";
              glowShadow = "rgba(244, 63, 94, 0.55)";
            } else if (isRevision) {
              islandColorClass = "from-amber-500 via-orange-600 to-amber-800 border-amber-400";
              glowShadow = "rgba(245, 158, 11, 0.5)";
            } else if (isPending) {
              islandColorClass = "from-indigo-500 via-blue-600 to-indigo-800 border-indigo-400";
              glowShadow = "rgba(99, 102, 241, 0.5)";
            } else if (isCurrent) {
              islandColorClass = "from-indigo-600 via-violet-600 to-purple-800 border-indigo-300";
              glowShadow = "rgba(129, 140, 248, 0.65)";
            }

            return (
              <div
                key={hw.id}
                onClick={() => {
                  setActiveIndex(idx);
                  if (onPrefetchExam) onPrefetchExam(hw.examId || hw.id);
                }}
                className={`absolute transition-all duration-500 cursor-pointer ${
                  isCurrent ? "z-40 scale-110" : "z-20 hover:scale-105"
                } ${isFoggy ? "opacity-35 blur-[1.5px]" : "opacity-100"}`}
                style={{
                  left: `${pos.x}px`,
                  top: `${pos.y}px`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {/* 2.5D Isometric Diamond / Hexagonal Island Platform */}
                <div className="relative group">
                  {/* Spotlight Pulsing Beacon Ring for Current Active Station */}
                  {isCurrent && (
                    <div
                      className="absolute -inset-6 rounded-full animate-ping opacity-30 pointer-events-none"
                      style={{ backgroundColor: glowShadow }}
                    />
                  )}

                  {/* Island 3D Base Thickness Shadow */}
                  <div
                    className="w-24 h-24 rounded-3xl bg-slate-950/80 absolute top-3 left-0 right-0 mx-auto blur-[3px]"
                    style={{ transform: "rotateX(60deg) rotateZ(-45deg)" }}
                  />

                  {/* Island Top Plate in Isometric projection */}
                  <div
                    className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${islandColorClass} border-2 flex items-center justify-center transition-all duration-300 shadow-xl`}
                    style={{
                      transform: isCurrent
                        ? "rotateX(60deg) rotateZ(-45deg) translateZ(35px)"
                        : "rotateX(60deg) rotateZ(-45deg) translateZ(10px)",
                      boxShadow: `0 15px 30px ${glowShadow}`,
                    }}
                  >
                    {/* Inner Island Texture & Symbol */}
                    <div className="text-white font-black text-sm tracking-wider font-mono">
                      #{hw.hwNum}
                    </div>
                  </div>

                  {/* Flag or Badge Pin perched on top of Island */}
                  <div
                    className="absolute -top-7 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none transition-transform"
                    style={{
                      transform: isCurrent ? "translateY(-18px)" : "translateY(0)",
                    }}
                  >
                    {isCompleted ? (
                      <div className="px-2 py-0.5 rounded-full bg-emerald-500 text-white font-extrabold text-[10px] shadow-lg flex items-center gap-1 border border-emerald-300">
                        <Flag className="w-3 h-3 text-emerald-100 fill-emerald-100" />
                        <span>{hw.scoreDisplay.scoreText}</span>
                      </div>
                    ) : isOverdue ? (
                      <div className="px-2 py-0.5 rounded-full bg-rose-600 text-white font-bold text-[10px] shadow-lg flex items-center gap-1 animate-bounce">
                        <AlertTriangle className="w-3 h-3" />
                        <span>Quá hạn</span>
                      </div>
                    ) : isPending ? (
                      <div className="px-2 py-0.5 rounded-full bg-indigo-600 text-white font-bold text-[10px] shadow-lg flex items-center gap-1">
                        <Clock className="w-3 h-3 animate-spin" />
                        <span>Chờ chấm</span>
                      </div>
                    ) : isFoggy ? (
                      <div className="p-1 rounded-full bg-slate-800/80 text-slate-400 border border-slate-700">
                        <Lock className="w-3 h-3" />
                      </div>
                    ) : (
                      <div className="px-2 py-0.5 rounded-full bg-slate-800/90 text-indigo-300 font-bold text-[10px] border border-indigo-500/40 shadow-md">
                        {hw.badge.shortLabel}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Bottom Drawer: Active Island Detail Card */}
      {activeNode && (
        <div className="relative z-30 p-4 sm:p-5 bg-slate-900/95 border-t border-indigo-900/60 backdrop-blur-xl">
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
                {activeNode.status === "GRADED" && (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Đã hoàn thành ({activeNode.scoreDisplay.scoreText})
                  </span>
                )}
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
              </div>

              <h3 className="text-base sm:text-lg font-black text-white truncate" title={activeNode.title}>
                {activeNode.title}
              </h3>
              {activeNode.description && (
                <p className="text-xs text-slate-400 line-clamp-1">{activeNode.description}</p>
              )}
            </div>

            {/* Actions for current active island */}
            <div className="flex items-center gap-2.5 shrink-0">
              {/* Previous / Next station quick buttons */}
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

              {activeNode.status === "GRADED" && onOpenHonorCard && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onOpenHonorCard(activeNode)}
                  className="h-9 px-3 text-xs font-bold bg-amber-500/10 border-amber-500/40 text-amber-300 hover:bg-amber-500/20 rounded-xl gap-1.5"
                >
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Khoe Ba Mẹ</span>
                </Button>
              )}

              <Button
                size="sm"
                onClick={() => handlePrimaryAction(activeNode)}
                className={`h-9 px-5 font-bold text-xs rounded-xl shadow-lg gap-2 ${
                  activeNode.status === "OVERDUE"
                    ? "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-900/50"
                    : activeNode.status === "REVISION_REQUIRED"
                    ? "bg-amber-600 hover:bg-amber-700 text-white shadow-amber-900/50"
                    : activeNode.status === "GRADED"
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-900/50"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-900/50"
                }`}
              >
                {activeNode.status === "OVERDUE" ? (
                  <>
                    <Zap className="w-3.5 h-3.5" />
                    <span>Làm Bù Ngay</span>
                  </>
                ) : activeNode.status === "REVISION_REQUIRED" ? (
                  <>
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Làm Bài Sửa (Attempt 2)</span>
                  </>
                ) : activeNode.status === "GRADED" ? (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    <span>Xem Nhận Xét</span>
                  </>
                ) : activeNode.status === "SUBMITTED" ? (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    <span>Xem Bài Nộp</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Vào Học & Làm Bài</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
