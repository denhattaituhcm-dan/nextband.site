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

  return (
    <div className="rounded-2xl bg-white border border-slate-200/90 p-6 md:p-7 shadow-xs space-y-5">
      {/* Top Header: Badge Cảnh Giới & Lớp học & Streak */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 text-white text-xs font-semibold">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span className="tracking-wide uppercase font-mono text-[11px]">
              CẢNH GIỚI: {currentRealm.name} · BAND {currentBand.toFixed(1)}
            </span>
          </div>

          {streak && streak.streakDays > 0 && (
            <div
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-bold ${
                streak.fireStatus === "blazing"
                  ? "bg-rose-50 border-rose-200 text-rose-700"
                  : "bg-amber-50 border-amber-200 text-amber-700"
              }`}
              title="Chuỗi ngày học liên tục"
            >
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>Chuỗi {streak.streakDays} Ngày</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
          <span className="font-semibold text-slate-800">{className}</span>
          <span className="text-slate-400">({courseTitle})</span>
        </div>
      </div>

      {/* Main Journey Stage Content */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Hành trình của {studentName || "Học viên"}
            </h1>
            {motivation?.tag && (
              <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 text-[11px] font-bold">
                <Sparkles className="w-3 h-3 mr-1" />
                {motivation.tag}
              </Badge>
            )}
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {motivation?.copy || `${currentRealm.description}. Trọng tâm chặng: Chinh phục mốc ${nextRealmName} (Band ${nextBandThreshold.toFixed(1)}).`}
          </p>
        </div>

        {/* Milestone Steps Indicator (Tối giản, chân thực, không vẽ bar ảo) */}
        <div className="flex items-center gap-2 sm:gap-3 bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 shrink-0 self-start md:self-auto">
          <div className="text-center">
            <div className="text-[10px] uppercase font-bold text-slate-400 font-mono">Khởi đầu</div>
            <div className="text-xs font-bold text-slate-700">{currentRealm.minBand.toFixed(1)}</div>
          </div>

          <div className="h-0.5 w-6 sm:w-10 bg-slate-300 relative">
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-indigo-600 ring-2 ring-indigo-100" />
          </div>

          <div className="text-center">
            <div className="text-[10px] uppercase font-bold text-indigo-700 font-mono">Hiện tại</div>
            <div className="text-xs font-bold text-indigo-950">Band {currentBand.toFixed(1)}</div>
          </div>

          <div className="h-0.5 w-6 sm:w-10 bg-slate-300 relative">
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-slate-400" />
          </div>

          <div className="text-center">
            <div className="text-[10px] uppercase font-bold text-amber-700 font-mono">Mục tiêu</div>
            <div className="text-xs font-bold text-amber-900">Band {targetBand.toFixed(1)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
