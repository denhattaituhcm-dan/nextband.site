import React from "react";
import { Compass, Flame, Sparkles } from "lucide-react";
import { StudentJourneyOverview } from "@/lib/studentJourney";
import { StudentMotivationResult } from "@/lib/studentMotivationCopy";
import { StudentStreakData } from "@/lib/studentStreakHelper";

interface StudentStageBannerProps {
  studentName: string;
  className: string;
  courseTitle: string;
  journey: StudentJourneyOverview;
  motivation?: StudentMotivationResult | null;
  streak?: StudentStreakData | null;
}

export function StudentStageBanner({
  studentName,
  className,
  courseTitle,
  journey,
  motivation,
  streak,
}: StudentStageBannerProps) {
  const {
    currentRealm,
    currentBand,
    targetBand,
    entryBand = 3.0,
    nextRealmName,
    nextBandThreshold,
  } = journey;

  const distanceToNext = Math.max(0, Number((nextBandThreshold - currentBand).toFixed(1)));
  const streakCount = streak?.streakCount ?? streak?.streakDays ?? 0;

  // Calculate accurate progress fraction from Entry Band to Target Band
  const minBound = entryBand !== undefined ? entryBand : currentRealm.minBand;
  const maxBound = Math.max(minBound + 0.5, targetBand);
  const progressRatio = Math.min(100, Math.max(10, ((currentBand - minBound) / (maxBound - minBound)) * 100));

  const shouldShowCourseTitle =
    courseTitle && !className.toLowerCase().includes(courseTitle.toLowerCase());

  return (
    <div className="relative rounded-2xl bg-gradient-to-r from-[#0b3b82] via-[#0d275a] to-[#061533] text-white border-2 border-sky-500/30 p-6 md:p-7 shadow-xl shadow-blue-950/40 space-y-6 overflow-hidden">
      {/* Esports Dynamic Lighting / Flares */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-sky-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-20 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(56,189,248,0.15),transparent_60%)] pointer-events-none" />

      {/* Decorative cyber grid accent lines */}
      <div className="absolute top-0 right-0 w-36 h-full bg-[linear-gradient(135deg,transparent_25%,rgba(56,189,248,0.05)_50%,transparent_75%)] pointer-events-none" />

      {/* Top Header: Lớp học & Streak */}
      <div className="relative flex flex-wrap items-center justify-between gap-3 border-b border-sky-400/20 pb-4">
        <div className="flex items-center gap-2 text-xs">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/80 border border-sky-400/40 shadow-xs text-sky-200">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-black uppercase tracking-wider text-white">{className}</span>
            {shouldShowCourseTitle && (
              <span className="text-sky-300/80 font-medium">({courseTitle})</span>
            )}
          </div>
        </div>

        {streak && streakCount > 0 && (
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wide shadow-md transition-all ${
              streak.fireStatus === "blazing"
                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white border border-amber-300/60 shadow-orange-500/30"
                : "bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 border border-yellow-200/80 shadow-amber-400/20"
            }`}
            title="Chuỗi bài tập nộp liên tiếp"
          >
            <Flame className="w-4 h-4 fill-current animate-bounce" />
            <span>Chuỗi {streakCount} Bài Đúng Hạn</span>
          </div>
        )}
      </div>

      {/* Hero Content: Cảnh giới & Tên học viên */}
      <div className="relative space-y-5">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-6 bg-amber-400 rounded-full inline-block" />
            <span className="text-[11px] font-black uppercase tracking-widest text-sky-300 font-mono">
              HÀNH TRÌNH IELTS · RANK STAGE
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md shadow-amber-400/20 border border-amber-300">
              <Compass className="w-4 h-4 stroke-[2.5]" />
              <span>{currentRealm.name} · BAND {currentBand.toFixed(1)}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-sm">
              Hành trình của {studentName || "Học viên"}
            </h1>
          </div>
        </div>

        {/* Milestone Steps Indicator */}
        <div className="space-y-2.5 pt-1 max-w-2xl">
          {/* Progress Bar Track */}
          <div className="relative flex items-center justify-between py-1">
            <div className="absolute left-0 right-0 h-2 bg-blue-950/80 rounded-full border border-sky-400/30 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sky-400 via-blue-400 to-amber-400 rounded-full shadow-md shadow-amber-400/30 transition-all duration-500"
                style={{
                  width: `${progressRatio}%`,
                }}
              />
            </div>

            {/* Start point */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-3.5 h-3.5 rounded-full bg-sky-900 border-2 border-sky-400 shadow-sm" />
            </div>

            {/* Current point */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-5 h-5 rounded-full bg-amber-400 border-2 border-slate-950 ring-4 ring-amber-400/30 shadow-md shadow-amber-400/50" />
            </div>

            {/* Target point */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-4 h-4 rounded-full bg-blue-900 border-2 border-sky-300 shadow-sm" />
            </div>
          </div>

          {/* Labels Underneath */}
          <div className="flex items-center justify-between text-xs pt-0.5">
            <div className="text-sky-200/80 font-mono font-medium">
              Khởi đầu <strong className="text-white font-bold">{minBound.toFixed(1)}</strong>
            </div>
            <div className="text-amber-300 font-mono font-bold drop-shadow-xs">
              Hiện tại <strong className="text-white font-extrabold text-sm">Band {currentBand.toFixed(1)}</strong>
            </div>
            <div className="text-sky-200/80 font-mono font-medium">
              Mục tiêu <strong className="text-white font-bold">{targetBand.toFixed(1)}</strong>
            </div>
          </div>
        </div>

        {/* Single Crisp Subline */}
        <div className="pt-2 text-xs text-sky-100 flex items-center gap-2 bg-blue-950/50 p-2.5 rounded-xl border border-sky-400/20">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
          <span>
            {currentBand >= targetBand
              ? `Đã hoàn thành xuất sắc mục tiêu Band ${targetBand.toFixed(1)} của khóa học!`
              : distanceToNext > 0
              ? `Còn ${distanceToNext} Band để chạm mốc ${nextRealmName} (Band ${nextBandThreshold.toFixed(1)}).`
              : `Đang tiến bước vững chắc tới mục tiêu Band ${targetBand.toFixed(1)}.`}
          </span>
        </div>
      </div>
    </div>
  );
}
