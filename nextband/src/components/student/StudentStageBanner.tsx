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
    <div className="relative rounded-2xl bg-[#002147] text-white border border-slate-700/60 p-6 md:p-7 shadow-lg shadow-[#002147]/20 space-y-6 overflow-hidden">
      {/* Top Header: Lớp học & Trạng thái chuyên cần / chuỗi nộp bài */}
      <div className="relative flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2 text-xs">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 border border-white/15 text-white">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-bold uppercase tracking-wider">{className}</span>
            {shouldShowCourseTitle && (
              <span className="text-white/70 font-medium">({courseTitle})</span>
            )}
          </div>
          <span className="text-white/60 font-mono text-[11px] hidden sm:inline">
            HỒ SƠ NĂNG LỰC HỌC VIÊN
          </span>
        </div>

        {streak && streakCount > 0 && (
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-semibold text-white/90"
            title="Chuỗi bài tập nộp liên tiếp đúng hạn"
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Kỷ luật: {streakCount} bài đúng hạn</span>
          </div>
        )}
      </div>

      {/* Academic Status Core: Trình độ hiện tại & Mục tiêu */}
      <div className="relative space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div className="space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-widest text-white/60 font-mono">
              Trạng thái năng lực hiện tại
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {studentName || "Học viên"}
              </h1>
              <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-brand-blue/25 text-sky-200 border border-brand-blue/40">
                {currentRealm.name}
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-2 font-mono sm:text-right">
            <span className="text-white/60 text-xs uppercase">Điểm đo lường:</span>
            <span className="text-2xl sm:text-3xl font-black text-white">
              Band {currentBand.toFixed(1)}
            </span>
            <span className="text-white/40 text-xs">/ Mục tiêu {targetBand.toFixed(1)}</span>
          </div>
        </div>

        {/* Linear Academic Progress Bar */}
        <div className="space-y-2 pt-1 max-w-full">
          <div className="relative flex items-center justify-between py-1">
            <div className="absolute left-0 right-0 h-2 bg-black/40 rounded-full border border-white/10 overflow-hidden">
              <div
                className="h-full bg-brand-blue rounded-full transition-all duration-500"
                style={{
                  width: `${progressRatio}%`,
                }}
              />
            </div>

            {/* Start point */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-slate-800 border-2 border-white/40" />
            </div>

            {/* Current point */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-4 h-4 rounded-full bg-white border-2 border-brand-blue shadow-sm" />
            </div>

            {/* Target point */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-slate-800 border-2 border-amber-400/80" />
            </div>
          </div>

          {/* Scale Labels */}
          <div className="flex items-center justify-between text-xs font-mono pt-1 text-white/60">
            <div>
              Khởi điểm: <strong className="text-white font-medium">{minBound.toFixed(1)}</strong>
            </div>
            <div>
              Hiện tại: <strong className="text-white font-bold">Band {currentBand.toFixed(1)}</strong>
            </div>
            <div>
              Đích đến: <strong className="text-amber-300 font-bold">{targetBand.toFixed(1)}</strong>
            </div>
          </div>
        </div>

        {/* Academic Insight Subline */}
        <div className="pt-2 text-xs text-white/80 flex items-center gap-2.5 bg-black/25 px-3.5 py-2.5 rounded-xl border border-white/10">
          <Sparkles className="w-4 h-4 text-sky-400 shrink-0" />
          <span>
            {currentBand >= targetBand
              ? `Hồ sơ năng lực ghi nhận: Học viên đã hoàn thành xuất sắc mục tiêu Band ${targetBand.toFixed(1)}.`
              : distanceToNext > 0
              ? `Chẩn đoán chặng: Khoảng cách hiện tại là ${distanceToNext} Band để chạm chuẩn đầu ra ${nextRealmName} (Band ${nextBandThreshold.toFixed(1)}).`
              : `Lộ trình đang bám sát mục tiêu Band ${targetBand.toFixed(1)}.`}
          </span>
        </div>
      </div>
    </div>
  );
}
