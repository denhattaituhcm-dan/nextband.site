import React from "react";
import { Compass, Flame, Sparkles } from "lucide-react";
import { StudentJourneyOverview } from "@/lib/studentJourney";
import { StudentMotivationResult } from "@/lib/studentMotivationCopy";
import { StudentStreakData } from "@/lib/studentStreakHelper";
import { Badge } from "@/components/ui/badge";

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
  const { currentRealm, currentBand, targetBand, nextRealmName, nextBandThreshold } = journey;
  const distanceToNext = Math.max(0, Number((nextBandThreshold - currentBand).toFixed(1)));

  return (
    <div className="rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white border border-slate-800 p-6 md:p-7 shadow-lg space-y-6 relative overflow-hidden">
      {/* Ambient background light */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header: Lớp học & Streak */}
      <div className="relative flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-white uppercase tracking-wider">{className}</span>
          <span className="text-slate-400">({courseTitle})</span>
        </div>

        {streak && streak.streakDays > 0 && (
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
              streak.fireStatus === "blazing"
                ? "bg-rose-500/20 text-rose-400 border border-rose-500/40"
                : "bg-amber-500/20 text-amber-400 border border-amber-500/40"
            }`}
            title="Chuỗi ngày học liên tục"
          >
            <Flame className="w-3.5 h-3.5 fill-current" />
            <span>Chuỗi {streak.streakDays} Ngày</span>
          </div>
        )}
      </div>

      {/* Hero Content: Cảnh giới & Tên học viên */}
      <div className="relative space-y-5">
        <div className="space-y-1.5">
          <div className="text-[11px] font-black uppercase tracking-widest text-slate-400 font-mono">
            HÀNH TRÌNH IELTS
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-xs">
              <Compass className="w-3.5 h-3.5" />
              <span>{currentRealm.name} · BAND {currentBand.toFixed(1)}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Hành trình của {studentName || "Học viên"}
            </h1>
          </div>
        </div>

        {/* Milestone Steps Indicator */}
        <div className="space-y-2 pt-1 max-w-2xl">
          {/* Progress Bar Track */}
          <div className="relative flex items-center justify-between">
            <div className="absolute left-0 right-0 h-1 bg-slate-800 rounded-full" />
            <div
              className="absolute left-0 h-1 bg-gradient-to-r from-amber-400 to-indigo-400 rounded-full shadow-xs"
              style={{
                width: `${Math.min(100, Math.max(15, ((currentBand - currentRealm.minBand) / Math.max(0.1, targetBand - currentRealm.minBand)) * 100))}%`,
              }}
            />

            {/* Start point */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-slate-700 border-2 border-slate-900" />
            </div>

            {/* Current point */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-4 h-4 rounded-full bg-amber-400 border-2 border-slate-950 ring-4 ring-amber-400/20" />
            </div>

            {/* Target point */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-3.5 h-3.5 rounded-full bg-slate-600 border-2 border-slate-900" />
            </div>
          </div>

          {/* Labels Underneath */}
          <div className="flex items-center justify-between text-xs pt-1">
            <div className="text-slate-400 font-mono">
              Khởi đầu <strong className="text-slate-200">{currentRealm.minBand.toFixed(1)}</strong>
            </div>
            <div className="text-amber-300 font-mono font-bold">
              Hiện tại <strong className="text-white">Band {currentBand.toFixed(1)}</strong>
            </div>
            <div className="text-slate-400 font-mono">
              Mục tiêu <strong className="text-slate-200">{targetBand.toFixed(1)}</strong>
            </div>
          </div>
        </div>

        {/* Single Crisp Subline */}
        <div className="pt-2 text-xs text-slate-300 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>
            {distanceToNext > 0
              ? `Còn ${distanceToNext} Band để chạm mốc ${nextRealmName} (Band ${nextBandThreshold.toFixed(1)}).`
              : `Đã hoàn thành xuất sắc mục tiêu chặng hiện tại.`}
          </span>
        </div>
      </div>
    </div>
  );
}
