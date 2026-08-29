import React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CourseData } from "@/constants/courses";
import { CourseGoldMedal } from "@/components/public/CourseGoldMedal";

interface CourseRoadmapRowProps {
  course: CourseData;
  onTrialClick: (slug: string) => void;
  onDetailClick: (slug: string) => void;
  className?: string;
}

// Config theme visual cho từng Rank theo phong cách chuẩn Ảnh 1
const RANK_CONFIGS: Record<
  string,
  {
    themeColor: string;
    borderAccent: string;
    badgeStyle: string;
    leftGradient: string;
    leftGlow: string;
    targetBadgeBg: string;
    targetBadgeText: string;
    targetBadgeBorder: string;
    cardBg: string;
    cardBorder: string;
    priceColor: string;
  }
> = {
  starter: {
    themeColor: "#DE2D66",
    borderAccent: "border-l-[#DE2D66]",
    badgeStyle: "from-[#F43F5E] via-[#E11D48] to-[#BE123C]",
    leftGradient: "linear-gradient(135deg, #FF6584 0%, #DE2D66 50%, #B8184C 100%)",
    leftGlow: "rgba(222, 45, 102, 0.35)",
    targetBadgeBg: "bg-[#DE2D66]/10",
    targetBadgeText: "text-[#DE2D66]",
    targetBadgeBorder: "border-[#DE2D66]/40",
    cardBg: "bg-[#FFF9FB]",
    cardBorder: "border-[#DE2D66]/30",
    priceColor: "text-[#DE2D66]",
  },
  dreamer: {
    themeColor: "#1E58B8",
    borderAccent: "border-l-[#1E58B8]",
    badgeStyle: "from-[#3B82F6] via-[#2563EB] to-[#1D4ED8]",
    leftGradient: "linear-gradient(135deg, #3A7BFB 0%, #1E58B8 50%, #103F8A 100%)",
    leftGlow: "rgba(30, 88, 184, 0.35)",
    targetBadgeBg: "bg-[#1E58B8]/10",
    targetBadgeText: "text-[#1E58B8]",
    targetBadgeBorder: "border-[#1E58B8]/40",
    cardBg: "bg-[#F8FAFF]",
    cardBorder: "border-[#1E58B8]/30",
    priceColor: "text-[#1E58B8]",
  },
  builder: {
    themeColor: "#E05A12",
    borderAccent: "border-l-[#E05A12]",
    badgeStyle: "from-[#FB923C] via-[#EA580C] to-[#C2410C]",
    leftGradient: "linear-gradient(135deg, #FFA043 0%, #E05A12 50%, #B84206 100%)",
    leftGlow: "rgba(224, 90, 18, 0.35)",
    targetBadgeBg: "bg-[#E05A12]/10",
    targetBadgeText: "text-[#E05A12]",
    targetBadgeBorder: "border-[#E05A12]/40",
    cardBg: "bg-[#FFFBF7]",
    cardBorder: "border-[#E05A12]/30",
    priceColor: "text-[#E05A12]",
  },
  master: {
    themeColor: "#2D7738",
    borderAccent: "border-l-[#2D7738]",
    badgeStyle: "from-[#4ADE80] via-[#16A34A] to-[#15803D]",
    leftGradient: "linear-gradient(135deg, #4AA358 0%, #2D7738 50%, #1D5425 100%)",
    leftGlow: "rgba(45, 119, 56, 0.35)",
    targetBadgeBg: "bg-[#2D7738]/10",
    targetBadgeText: "text-[#2D7738]",
    targetBadgeBorder: "border-[#2D7738]/40",
    cardBg: "bg-[#F9FCF9]",
    cardBorder: "border-[#2D7738]/30",
    priceColor: "text-[#2D7738]",
  },
  leader: {
    themeColor: "#BA1A1A",
    borderAccent: "border-l-[#BA1A1A]",
    badgeStyle: "from-[#EF4444] via-[#DC2626] to-[#991B1B]",
    leftGradient: "linear-gradient(135deg, #E63946 0%, #BA1A1A 50%, #7F0E0E 100%)",
    leftGlow: "rgba(186, 26, 26, 0.35)",
    targetBadgeBg: "bg-[#BA1A1A]/10",
    targetBadgeText: "text-[#BA1A1A]",
    targetBadgeBorder: "border-[#BA1A1A]/40",
    cardBg: "bg-[#FFF8F8]",
    cardBorder: "border-[#BA1A1A]/30",
    priceColor: "text-[#BA1A1A]",
  },
};

export function CourseRoadmapRow({
  course,
  onTrialClick,
  onDetailClick,
  className,
}: CourseRoadmapRowProps) {
  const rank = RANK_CONFIGS[course.slug] || RANK_CONFIGS.starter;
  const durationWeeks = course.durationWeeks || (course.slug === "leader" ? 10 : 9);
  const formattedWeeks = durationWeeks < 10 ? `0${durationWeeks}` : `${durationWeeks}`;

  return (
    <div
      id={`course-${course.slug}`}
      className={cn(
        "group relative flex flex-col lg:flex-row items-stretch rounded-3xl transition-all duration-300",
        "bg-card/95 hover:bg-card border shadow-xs hover:shadow-xl hover:-translate-y-0.5",
        rank.cardBorder,
        className
      )}
    >
      {/* ---------------------------------------------------- */}
      {/* ---------------------------------------------------- */}
      {/* KHỐI 1 (TRÁI): THỜI LƯỢNG & HUY HIỆU VÀNG 3D        */}
      {/* ---------------------------------------------------- */}
      <div className="relative flex-shrink-0 flex items-center lg:w-[180px] p-2 lg:p-2.5">
        {/* Main 3D Glossy Badge Container */}
        <div
          className="relative w-full h-24 sm:h-28 lg:h-full min-h-[96px] rounded-2xl sm:rounded-3xl flex items-center justify-between lg:justify-start px-5 lg:px-4 py-3 overflow-hidden text-white"
          style={{
            background: rank.leftGradient,
            boxShadow: `0 10px 24px -4px ${rank.leftGlow}, inset 0 2px 4px rgba(255, 255, 255, 0.4), inset 0 -3px 6px rgba(0, 0, 0, 0.25)`,
          }}
        >
          {/* Glass glare overlay across top-left */}
          <div
            className="absolute -top-12 -left-12 w-36 h-36 rounded-full bg-white/20 blur-xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-black/20 pointer-events-none rounded-2xl"
            aria-hidden="true"
          />

          {/* Duration text */}
          <div className="relative z-10 flex flex-col items-start leading-none select-none">
            <span className="text-3xl sm:text-4xl lg:text-4xl font-black tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
              {formattedWeeks}
            </span>
            <span className="text-xs sm:text-sm font-extrabold tracking-widest mt-1 uppercase text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
              TUẦN
            </span>
          </div>

          {/* Gold Medal Icon on Mobile (inline) */}
          <div className="relative z-10 lg:hidden">
            <CourseGoldMedal size={54} />
          </div>
        </div>

        {/* Gold Medal on Desktop: Positioned overlapping border between Block 1 and Block 2 */}
        <div
          className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 transition-transform duration-300 group-hover:scale-110"
        >
          <CourseGoldMedal size={60} />
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* KHỐI 2 (GIỮA): ĐỊNH VỊ, TIÊU CHÍ & THÔNG SỐ KỸ THUẬT */}
      {/* ---------------------------------------------------- */}
      <div className="flex-1 flex flex-col justify-center p-5 sm:p-6 lg:pl-10 lg:pr-6 space-y-3">
        <div className="space-y-2">
          {/* Header Row: Course Title + Target Band Badge */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <h3
              className="text-2xl sm:text-3xl font-black tracking-tight uppercase transition-colors"
              style={{ color: rank.themeColor }}
            >
              {course.title}
            </h3>

            {/* Target band pill */}
            <span
              className={cn(
                "inline-flex items-center px-3 py-0.5 rounded-full text-xs sm:text-sm font-extrabold tracking-wide border shadow-2xs",
                rank.targetBadgeBg,
                rank.targetBadgeText,
                rank.targetBadgeBorder
              )}
            >
              {course.bandTarget}
            </span>

            {/* Stage pill tag */}
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-muted text-muted-foreground border border-border/60">
              {course.stageNumber}
            </span>
          </div>
        </div>

        {/* Technical specs pill tags (giờ, buổi, sĩ số) */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs sm:text-sm font-semibold bg-muted/80 text-foreground/80 border border-border/60">
            <span>⏱</span>
            <span>{course.durationLabel}</span>
          </span>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs sm:text-sm font-semibold bg-muted/80 text-foreground/80 border border-border/60">
            <span>👥</span>
            <span>{course.classSize}</span>
          </span>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/25">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>02 buổi học thử</span>
          </span>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* KHỐI 3 (PHẢI): HỌC PHÍ & CỤM NÚT HÀNH ĐỘNG (CRO)     */}
      {/* ---------------------------------------------------- */}
      <div className="flex-shrink-0 flex flex-col justify-center items-center lg:items-end p-5 sm:p-6 lg:w-[280px] border-t lg:border-t-0 lg:border-l border-border/70 bg-muted/25 rounded-b-3xl lg:rounded-b-none lg:rounded-r-3xl space-y-3.5">
        {/* Pricing tag */}
        <div className="text-center lg:text-right w-full">
          <div className="flex items-baseline justify-center lg:justify-end gap-1.5 whitespace-nowrap">
            <span
              className="text-2xl sm:text-3xl font-black tracking-tight"
              style={{ color: rank.themeColor }}
            >
              {course.tuition}
            </span>
            <span className="text-xs sm:text-sm font-bold text-muted-foreground whitespace-nowrap">
              / trọn khóa
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Cam kết không phát sinh chi phí
          </p>
        </div>

        {/* Action Button: Nhận lịch học thử (Red Primary CTA) */}
        <Button
          onClick={() => onTrialClick(course.slug)}
          className="w-full rounded-xl h-11 font-extrabold text-sm bg-brand-red hover:bg-brand-red-hover text-white shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
        >
          Nhận lịch học thử
        </Button>

        {/* Secondary Action: Xem chi tiết khóa học */}
        <button
          type="button"
          onClick={() => onDetailClick(course.slug)}
          className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold text-foreground/75 hover:text-brand-red transition-colors py-1 group/link"
        >
          <span>Xem chi tiết khóa học</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
        </button>
      </div>
    </div>
  );
}