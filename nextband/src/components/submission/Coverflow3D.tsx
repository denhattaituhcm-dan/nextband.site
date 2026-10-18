import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  RotateCcw,
  Eye,
  Zap,
  ArrowRight,
  MessageSquare,
  Tag,
  BookOpen,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { routes } from "@/lib/routes";
import { calculateGradingSla } from "@/lib/gradingSla";
import { getSkillBadgeConfig, ExamSkillType } from "@/lib/examSkillHelper";

export interface CoverflowItem {
  id: string;
  examId: string;
  title: string;
  description?: string | null;
  lessonTitle?: string;
  week: number;
  day: number | null;
  skillType: ExamSkillType | string;
  canonicalStatus: "GRADED" | "SUBMITTED" | "IN_PROGRESS" | "UNSUBMITTED" | "EXPIRED" | "ABANDONED";
  submission?: any;
}

interface Coverflow3DProps {
  items: CoverflowItem[];
  errorCategoryConfig: Record<string, { label: string; badgeClass: string; dotClass: string }>;
}

const SKILL_THEME_GRADIENTS: Record<string, { bg: string; banner: string; text: string }> = {
  writing: {
    bg: "from-amber-500/10 via-orange-500/5 to-transparent",
    banner: "from-amber-500 to-orange-600",
    text: "text-amber-700",
  },
  speaking: {
    bg: "from-rose-500/10 via-pink-500/5 to-transparent",
    banner: "from-rose-500 to-pink-600",
    text: "text-rose-700",
  },
  listening: {
    bg: "from-sky-500/10 via-blue-500/5 to-transparent",
    banner: "from-sky-500 to-indigo-600",
    text: "text-sky-700",
  },
  reading: {
    bg: "from-emerald-500/10 via-teal-500/5 to-transparent",
    banner: "from-emerald-600 to-teal-700",
    text: "text-emerald-700",
  },
  grammar: {
    bg: "from-violet-500/10 via-purple-500/5 to-transparent",
    banner: "from-purple-600 to-indigo-700",
    text: "text-purple-700",
  },
};

export const Coverflow3D: React.FC<Coverflow3DProps> = ({ items, errorCategoryConfig }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Reset or clamp index when items change
  useEffect(() => {
    if (activeIndex >= items.length) {
      setActiveIndex(Math.max(0, items.length - 1));
    }
  }, [items.length, activeIndex]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev < items.length - 1 ? prev + 1 : prev));
  }, [items.length]);

  const activeItem = items[activeIndex];

  // Primary action link for Enter key or main button
  const getPrimaryAction = useCallback(
    (item: CoverflowItem) => {
      const { canonicalStatus, submission, examId } = item;
      const isUnsubmitted = canonicalStatus === "UNSUBMITTED";
      const isRevisionRequired = !!submission?.revisionRequired;

      if (isUnsubmitted || canonicalStatus === "IN_PROGRESS") {
        return {
          label: isUnsubmitted ? "VÀO LÀM BÀI TẬP NGAY" : "TIẾP TỤC LÀM BÀI",
          url: routes.exam.take(examId),
          icon: isUnsubmitted ? Zap : ArrowRight,
          className: isUnsubmitted
            ? "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-200"
            : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200",
        };
      }
      if (isRevisionRequired) {
        return {
          label: "SỬA BÀI (ATTEMPT 2)",
          url: routes.student.submission(submission.id),
          icon: RotateCcw,
          className: "bg-amber-600 hover:bg-amber-700 text-white shadow-amber-200",
        };
      }
      return {
        label: canonicalStatus === "GRADED" ? "XEM CHI TIẾT & NHẬN XÉT" : "XEM LẠI BÀI ĐÃ NỘP",
        url: routes.student.submission(submission.id),
        icon: Eye,
        className:
          canonicalStatus === "GRADED"
            ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200"
            : "bg-slate-800 hover:bg-slate-900 text-white shadow-slate-200",
      };
    },
    []
  );

  // Keyboard navigation: ArrowLeft, ArrowRight, Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if focus is inside input or select
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA" ||
        document.activeElement?.tagName === "SELECT"
      ) {
        return;
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "Enter" && activeItem) {
        e.preventDefault();
        const action = getPrimaryAction(activeItem);
        if (action?.url) {
          navigate(action.url);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext, activeItem, getPrimaryAction, navigate]);

  // Touch Swipe for Mobile / Tablet
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  if (items.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-3xl bg-[#fbf9f5] border border-stone-200/90 shadow-sm p-4 sm:p-7 overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Banner Guide - Matching screenshot 2 aesthetic */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-stone-200/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-stone-200/70 text-stone-700 text-[11px] font-bold tracking-wider uppercase">
              BẢO TÀNG 3D COVERFLOW
            </span>
            <span className="text-xs text-stone-500 font-medium">
              Bộ sưu tập bài tập & nhận xét chiến tích
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1 flex items-center gap-1.5 flex-wrap">
            <span>Cuộn hoặc dùng phím</span>
            <kbd className="px-1.5 py-0.5 text-[10px] font-bold bg-white border border-stone-300 rounded shadow-xs text-stone-700">
              ←
            </kbd>
            <kbd className="px-1.5 py-0.5 text-[10px] font-bold bg-white border border-stone-300 rounded shadow-xs text-stone-700">
              →
            </kbd>
            <span>để đổi bài 3D, nhấn</span>
            <kbd className="px-1.5 py-0.5 text-[10px] font-bold bg-white border border-stone-300 rounded shadow-xs text-stone-700">
              Enter
            </kbd>
            <span>để vào xem chi tiết / làm bài.</span>
          </p>
        </div>

        {/* Counter indicator e.g. "BÀI 05 / 12" */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs tracking-wider uppercase font-bold text-stone-400">BÀI TẬP</span>
          <span className="text-xl sm:text-2xl font-black text-stone-800 font-mono">
            {String(activeIndex + 1).padStart(2, "0")}
            <span className="text-stone-400 font-normal text-sm">
              {" "}
              / {String(items.length).padStart(2, "0")}
            </span>
          </span>
        </div>
      </div>

      {/* 3D Stage / Viewport */}
      <div
        className="relative h-[480px] sm:h-[510px] my-6 flex items-center justify-center overflow-hidden"
        style={{ perspective: "1200px" }}
      >
        {items.map((item, index) => {
          const offset = index - activeIndex;
          const isCenter = offset === 0;

          // Limit rendered cards outside visible range for high performance
          if (Math.abs(offset) > 3) return null;

          const isSubjective = ["writing", "speaking"].includes(item.skillType);
          const skillBadge = getSkillBadgeConfig(item.skillType as ExamSkillType);
          const theme = SKILL_THEME_GRADIENTS[item.skillType] || {
            bg: "from-stone-500/10 to-transparent",
            banner: "from-stone-700 to-stone-900",
            text: "text-stone-700",
          };

          // 3D Matrix Calculations
          const translateX = offset * 210; // spacing between cards
          const translateZ = -Math.abs(offset) * 140; // depth push
          const rotateY = offset * -28; // 3D rotation angle
          const opacity = Math.abs(offset) > 2 ? 0.2 : Math.abs(offset) === 2 ? 0.45 : offset !== 0 ? 0.75 : 1;
          const zIndex = 50 - Math.abs(offset) * 10;
          const scale = isCenter ? 1 : 0.88;

          // Attempt 2 and submission specifics
          const submission = item.submission;
          const canonicalStatus = item.canonicalStatus;
          const isUnsubmitted = canonicalStatus === "UNSUBMITTED";
          const isRevisionRequired = !!submission?.revisionRequired;
          const isAttempt2 = submission?.attemptNumber && submission?.attemptNumber >= 2;
          const rawCategory = submission?.primaryErrorCategory;
          const errorMeta = rawCategory ? errorCategoryConfig[rawCategory] : null;

          const hasObjectiveScore =
            !isSubjective &&
            submission?.correctAnswers != null &&
            submission?.totalQuestions != null;
          const objectivePercent =
            hasObjectiveScore && submission.totalQuestions > 0
              ? Math.round((submission.correctAnswers / submission.totalQuestions) * 100)
              : null;
          const isGradedSubjective =
            isSubjective && canonicalStatus === "GRADED" && submission?.totalScore != null;

          return (
            <div
              key={item.id}
              onClick={() => setActiveIndex(index)}
              className={`absolute top-1/2 left-1/2 w-[310px] sm:w-[350px] -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-500 ease-out`}
              style={{
                transform: `translateX(calc(-50% + ${translateX}px)) translateY(-50%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                opacity,
                zIndex,
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className={`w-full rounded-3xl bg-white border text-left flex flex-col justify-between overflow-hidden shadow-xl transition-all duration-300 ${
                  isCenter
                    ? "ring-4 ring-indigo-500/20 border-indigo-500/40 shadow-2xl"
                    : "border-stone-200/90 hover:border-stone-300"
                }`}
                style={{ height: "460px" }}
              >
                {/* Upper Top: Skill Pill & Week-Day Badge */}
                <div className="p-4 sm:p-5 pb-3">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-xl bg-stone-100 font-bold text-xs text-stone-700 flex items-center gap-1">
                        <BookOpen className="h-3 w-3 text-stone-500" />
                        {item.week === 999 ? "TEST" : `W${item.week}`}
                        {item.day ? ` - D${item.day}` : ""}
                      </span>
                      {isAttempt2 && (
                        <Badge
                          variant="secondary"
                          className="text-[10px] px-2 py-0.5 bg-purple-100 text-purple-800 font-bold"
                        >
                          Attempt 2
                        </Badge>
                      )}
                    </div>

                    {/* Status Badge */}
                    {isUnsubmitted ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                        ⚠️ Chưa làm
                      </span>
                    ) : canonicalStatus === "GRADED" ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="h-3 w-3" /> Đã chấm
                      </span>
                    ) : canonicalStatus === "SUBMITTED" ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                        <Clock className="h-3 w-3" /> Chờ chấm
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                        🔄 Đang làm
                      </span>
                    )}
                  </div>

                  {/* Artwork / Hero Top Card Banner (Matches photo 2 gradient card header) */}
                  <div
                    className={`w-full h-24 rounded-2xl bg-gradient-to-br ${theme.banner} p-3.5 text-white flex flex-col justify-between shadow-inner relative overflow-hidden`}
                  >
                    <div className="flex items-center justify-between z-10">
                      <span className="text-[11px] font-bold tracking-wider uppercase opacity-90 flex items-center gap-1">
                        <Sparkles className="h-3 w-3" />
                        {skillBadge.label}
                      </span>
                      <span className="text-xl font-black opacity-20 font-mono tracking-tighter">
                        {item.skillType.toUpperCase().slice(0, 3)}
                      </span>
                    </div>

                    <div className="z-10">
                      {isGradedSubjective ? (
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xs uppercase font-semibold opacity-90">Band</span>
                          <span className="text-2xl font-black tracking-tight">
                            {submission.totalScore}
                          </span>
                        </div>
                      ) : hasObjectiveScore ? (
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-2xl font-black">
                            {submission.correctAnswers}/{submission.totalQuestions}
                          </span>
                          <span className="text-xs opacity-90">({objectivePercent}%)</span>
                        </div>
                      ) : isUnsubmitted ? (
                        <div className="text-xs font-bold opacity-95">Chưa hoàn thành</div>
                      ) : (
                        <div className="text-xs font-semibold opacity-95">Đang chờ kết quả</div>
                      )}
                    </div>

                    {/* Background visual watermarks */}
                    <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-white/10 blur-xl pointer-events-none" />
                  </div>

                  {/* Exercise Title */}
                  <div className="mt-3.5">
                    <h3
                      className="font-black text-stone-900 text-sm sm:text-base line-clamp-2 leading-snug"
                      title={item.title}
                    >
                      {item.title}
                    </h3>
                    <p className="text-xs text-stone-500 line-clamp-2 mt-1">
                      {item.description || item.lessonTitle || "Bài luyện tập theo khung giáo trình"}
                    </p>
                  </div>

                  {/* Teacher Feedback / Error Notice */}
                  {(errorMeta || isRevisionRequired) && (
                    <div className="mt-2.5">
                      {isRevisionRequired ? (
                        <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 flex items-center gap-1.5">
                          <AlertCircle className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                          <span className="font-semibold line-clamp-1">
                            GV yêu cầu sửa bài (Attempt 2)
                          </span>
                        </div>
                      ) : errorMeta ? (
                        <div className="flex items-center gap-1.5 text-[11px]">
                          <span className="text-stone-500 font-medium flex items-center gap-1">
                            <Tag className="h-3 w-3 opacity-60" /> Lỗi chính:
                          </span>
                          <span
                            className={`font-bold px-2 py-0.5 rounded-md border text-[10px] ${errorMeta.badgeClass}`}
                          >
                            {errorMeta.label}
                          </span>
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>

                {/* Card Bottom CTA & Date */}
                <div className="p-4 sm:p-5 pt-3 border-t border-stone-100 bg-stone-50/60 mt-auto">
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-3">
                    <div className="flex items-center gap-1 text-[11px]">
                      <Calendar className="h-3 w-3 opacity-70" />
                      <span>
                        {submission?.startedAt || submission?.createdAt
                          ? format(
                              new Date(submission.startedAt || submission.createdAt),
                              "dd/MM/yyyy",
                              { locale: vi }
                            )
                          : "Chưa làm"}
                      </span>
                    </div>
                    {isSubjective && canonicalStatus === "GRADED" && (
                      <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" /> Đã có nhận xét
                      </span>
                    )}
                  </div>

                  {(() => {
                    const action = getPrimaryAction(item);
                    const ActionIcon = action.icon;
                    return (
                      <Button
                        size="sm"
                        className={`w-full h-10 font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all ${action.className}`}
                        asChild
                      >
                        <Link to={action.url}>
                          <ActionIcon className="h-3.5 w-3.5" />
                          {action.label}
                        </Link>
                      </Button>
                    );
                  })()}
                </div>
              </div>
            </div>
          );
        })}

        {/* Navigation arrows (Left / Right floating circular buttons like photo 2) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          disabled={activeIndex === 0}
          className={`absolute left-2 sm:left-6 z-50 h-12 w-12 rounded-full bg-white border border-stone-300 shadow-xl flex items-center justify-center text-stone-700 transition-all ${
            activeIndex === 0
              ? "opacity-30 cursor-not-allowed"
              : "hover:bg-stone-50 hover:scale-110 active:scale-95 cursor-pointer"
          }`}
          aria-label="Previous Exercise"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          disabled={activeIndex === items.length - 1}
          className={`absolute right-2 sm:right-6 z-50 h-12 w-12 rounded-full bg-white border border-stone-300 shadow-xl flex items-center justify-center text-stone-700 transition-all ${
            activeIndex === items.length - 1
              ? "opacity-30 cursor-not-allowed"
              : "hover:bg-stone-50 hover:scale-110 active:scale-95 cursor-pointer"
          }`}
          aria-label="Next Exercise"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Bottom Timeline Quick Jump Dots */}
      <div className="flex items-center justify-center gap-1.5 overflow-x-auto max-w-md mx-auto py-2 scrollbar-none">
        {items.map((it, idx) => {
          const isCurrent = idx === activeIndex;
          const isGraded = it.canonicalStatus === "GRADED";
          return (
            <button
              key={it.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`h-2 transition-all rounded-full ${
                isCurrent
                  ? "w-7 bg-indigo-600"
                  : isGraded
                  ? "w-2 bg-emerald-400 hover:bg-emerald-500"
                  : "w-2 bg-stone-300 hover:bg-stone-400"
              }`}
              title={`${it.title} (${it.week === 999 ? "TEST" : `W${it.week}`})`}
            />
          );
        })}
      </div>
    </div>
  );
};
