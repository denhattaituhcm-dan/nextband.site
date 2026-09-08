import React from "react";
import { Stethoscope, Flame, Sparkles, Activity, ShieldAlert, Award, Compass } from "lucide-react";
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
  const progressRatio = Math.min(100, Math.max(0, ((currentBand - minBound) / (maxBound - minBound)) * 100));

  const shouldShowCourseTitle =
    courseTitle && !className.toLowerCase().includes(courseTitle.toLowerCase());

  return (
    <div className="relative rounded-2xl bg-[#FFFFFF] border border-[#E5E0D8] p-5 sm:p-6 shadow-xs space-y-5 transition-all">
      {/* 1. Header: Dossier Identity & Institutional Tag */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F0EBE1] pb-3.5">
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FAF8F4] border border-[#E5E0D8] text-[11px] font-mono font-semibold text-[#4A3B2C]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            <span className="tracking-wide">MÃ LỚP:</span>
            <span className="font-bold text-[#1E293B] uppercase">{className}</span>
            {shouldShowCourseTitle && (
              <span className="text-[#8C7A6B]">({courseTitle})</span>
            )}
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FAF8F4] border border-[#E5E0D8] text-[11px] font-mono font-semibold text-[#64748B]">
            <Activity className="w-3 h-3 text-[#8C6D3B]" />
            <span className="tracking-widest uppercase">HỒ SƠ CHẨN ĐOÁN NĂNG LỰC</span>
          </div>
        </div>

        {streak && streakCount > 0 && (
          <div
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FFFDF7] border border-[#E8DFC8] text-[11px] font-mono font-bold text-[#8C6D3B]"
            title="Chuỗi bài tập nộp liên tiếp đúng hạn"
          >
            <Flame className="w-3.5 h-3.5 text-[#D97706]" />
            <span>KỶ LUẬT: {streakCount} BÀI LIÊN TIẾP</span>
          </div>
        )}
      </div>

      {/* 2. Candidate Diagnosis & Metric Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
        <div className="space-y-1">
          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8C7A6B] flex items-center gap-1.5">
            <span>HỌC VIÊN LÂM SÀNG</span>
            <span className="text-[#CBD5E1]">/</span>
            <span className="text-[#8C6D3B]">{currentRealm.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0F172A] uppercase font-mono">
              {studentName || "Học viên"}
            </h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#F5EFE6] text-[#5A3E1B] border border-[#DEC8A9]">
              {currentRealm.name}
            </span>
          </div>
        </div>

        {/* Diagnostic Band Numerical Snapshot */}
        <div className="flex items-baseline gap-2 font-mono sm:text-right bg-[#FAF8F4] px-3.5 py-1.5 rounded-lg border border-[#EBE5DB]">
          <span className="text-[#64748B] text-[11px] uppercase tracking-wider">Đo lường:</span>
          <span className="text-xl sm:text-2xl font-bold text-[#0F172A] tabular-nums">
            Band {currentBand.toFixed(1)}
          </span>
          <span className="text-[#8C7A6B] text-xs font-semibold tabular-nums">
            / Mục tiêu {targetBand.toFixed(1)}
          </span>
        </div>
      </div>

      {/* 3. Clinical Slider Track (Thước đo chẩn đoán mỏng, vạch tick rõ ràng) */}
      <div className="space-y-2 pt-1">
        <div className="relative flex items-center justify-between py-1">
          {/* Main Track Background */}
          <div className="absolute left-0 right-0 h-1.5 bg-[#EAE6DF] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#9E7D47] to-[#5A3E1B] rounded-full transition-all duration-500"
              style={{
                width: `${progressRatio}%`,
              }}
            />
          </div>

          {/* Tick 1: Khởi điểm */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFFFFF] border-2 border-[#94A3B8]" />
          </div>

          {/* Tick 2: Mốc hiện tại */}
          <div
            className="absolute z-10 -translate-x-1/2 flex flex-col items-center"
            style={{ left: `${Math.min(98, Math.max(2, progressRatio))}%` }}
          >
            <div className="w-3.5 h-3.5 rounded-full bg-[#5A3E1B] border-2 border-white shadow-xs" />
          </div>

          {/* Tick 3: Đích đến */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFFFFF] border-2 border-[#8C6D3B]" />
          </div>
        </div>

        {/* Scale Labels (Tabular Numbers) */}
        <div className="flex items-center justify-between text-[11px] font-mono pt-1 text-[#64748B]">
          <div className="flex items-center gap-1">
            <span className="text-[#94A3B8]">Khởi điểm:</span>
            <span className="font-semibold text-[#334155] tabular-nums">{minBound.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-1 font-bold text-[#5A3E1B]">
            <span>Hiện tại:</span>
            <span className="tabular-nums">Band {currentBand.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-1 text-[#8C6D3B]">
            <span>Đích đến:</span>
            <span className="font-bold tabular-nums">{targetBand.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* 4. Clinical Diagnosis Note Box (Ghi chú chẩn đoán lâm sàng) */}
      <div className="text-xs text-[#475569] flex items-center gap-2.5 bg-[#FAF8F4] px-3.5 py-2.5 rounded-xl border border-[#EAE5DC]">
        <Stethoscope className="w-4 h-4 text-[#8C6D3B] shrink-0" />
        <span className="leading-relaxed">
          {currentBand >= targetBand ? (
            <span className="text-[#15803D] font-medium">
              Chẩn đoán chuyên môn: Học viên đã đạt và vượt chuẩn đầu ra Band {targetBand.toFixed(1)}. Khuyến nghị duy trì cường độ tự luận.
            </span>
          ) : distanceToNext > 0 ? (
            <span>
              <strong className="text-[#1E293B]">Ghi chú lâm sàng:</strong> Khoảng cách đo lường là <strong className="text-[#8C6D3B] font-mono tabular-nums">{distanceToNext} Band</strong> để chạm ngưỡng {nextRealmName} (Band {nextBandThreshold.toFixed(1)}).
            </span>
          ) : (
            <span>
              <strong className="text-[#1E293B]">Tiến độ hành động:</strong> Lộ trình năng lực đang bám sát mục tiêu Band {targetBand.toFixed(1)}.
            </span>
          )}
        </span>
      </div>
    </div>
  );
}
