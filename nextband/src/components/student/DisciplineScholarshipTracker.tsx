import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Flame,
  Award,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Target,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
} from "lucide-react";
import {
  DISCIPLINE_TIERS,
  DisciplineTierKey,
  calculateDisciplineStanding,
  getSavedDisciplineGoal,
} from "@/lib/disciplineScholarshipHelper";
import { DisciplineGoalModal } from "./DisciplineGoalModal";
import { StudentReEnrollmentModal } from "./StudentReEnrollmentModal";

interface DisciplineScholarshipTrackerProps {
  submittedCount: number;
  totalHomeworks: number;
  attendanceRate?: number;
  studentId?: string;
  studentName?: string;
  studentPhone?: string;
  classId?: string;
  className?: string;
  courseTitle?: string;
}

export function DisciplineScholarshipTracker({
  submittedCount,
  totalHomeworks,
  attendanceRate = 1.0,
  studentId,
  studentName,
  studentPhone,
  classId,
  className,
  courseTitle,
}: DisciplineScholarshipTrackerProps) {
  const [goalModalOpen, setGoalModalOpen] = useState(false);
  const [reEnrollModalOpen, setReEnrollModalOpen] = useState(false);
  const [targetGoal, setTargetGoal] = useState<DisciplineTierKey>(() =>
    getSavedDisciplineGoal(studentId, classId)
  );

  const standing = calculateDisciplineStanding({
    submittedCount,
    totalHomeworks,
    attendanceRate,
    targetTier: targetGoal,
  });

  const {
    currentHomeworkRate,
    effectiveTier,
    targetTierConfig,
    rewardAmount,
    rewardFormatted,
    isMeetingTarget,
    remainingAllowedMisses,
    statusMessage,
    motivationalQuote,
  } = standing;

  const isFlawless = effectiveTier?.key === "TIER_4";

  return (
    // Outer wrapper: ivory parchment nền, double-border vàng học thuật
    <div className="relative rounded-2xl overflow-hidden shadow-md"
      style={{
        background: "linear-gradient(135deg, #F7F3ED 0%, #F0EBE0 100%)",
        border: "1px solid #C9A84C",
        boxShadow: "0 0 0 4px #F7F3ED, 0 0 0 5px #C9A84C, 0 4px 24px rgba(121,74,28,0.10)",
      }}
    >
      {/* Ornamental corner accents (CSS pseudo-borders via inset div) */}
      <div className="absolute inset-[6px] rounded-xl pointer-events-none"
        style={{ border: "1px solid rgba(201,168,76,0.35)" }}
      />

      {/* Top ribbon: crimson học thuật */}
      <div className="relative flex items-center justify-center py-2.5 px-6"
        style={{ background: "linear-gradient(90deg, #6B1414 0%, #8B1A1A 50%, #6B1414 100%)" }}
      >
        {/* Side decorative lines */}
        <div className="absolute left-5 right-5 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-60" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-60" />
        </div>

        <div className="relative flex items-center gap-3">
          {/* Shield icon */}
          <div className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #C9A84C, #8B6914)", border: "1.5px solid #F5DFA0" }}
          >
            <Award className="w-4 h-4 text-white" />
          </div>

          <div className="text-center">
            <div className="text-[9px] tracking-[0.25em] font-bold uppercase text-[#C9A84C] opacity-90">
              ACADEMIC SCHOLARSHIP SYSTEM
            </div>
            <div className="text-[14px] tracking-[0.18em] font-black uppercase text-white leading-none mt-0.5"
              style={{ fontFamily: "Georgia, serif", letterSpacing: "0.15em" }}
            >
              HỌC BỔNG KỶ LUẬT ARIS
            </div>
            <div className="flex items-center justify-center gap-2 mt-0.5">
              <div className="h-px w-10 bg-[#C9A84C] opacity-70" />
              <span className="text-[8px] text-[#F5DFA0] tracking-widest uppercase opacity-80">— Discipline &amp; Excellence —</span>
              <div className="h-px w-10 bg-[#C9A84C] opacity-70" />
            </div>
          </div>

          <div className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #C9A84C, #8B6914)", border: "1.5px solid #F5DFA0" }}
          >
            <ShieldCheck className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 sm:p-6 space-y-5">

        {/* Subtitle row: Quy chế + trạng thái + nút mục tiêu */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] tracking-[0.18em] font-bold uppercase text-[#7B1A1A]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              QUY CHẾ KHẾ ƯỚC DANH DỰ
            </span>
            {effectiveTier ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-sm text-[10px] font-bold text-[#166534] border border-[#166534]"
                style={{ background: "rgba(22,101,52,0.07)", letterSpacing: "0.05em" }}
              >
                ✓ ĐÃ KÍCH HOẠT: {effectiveTier.rewardFormatted}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-sm text-[10px] font-semibold text-[#92400E] border border-dashed border-[#C9A84C]"
                style={{ background: "rgba(201,168,76,0.08)" }}
              >
                [Chưa đạt mốc sàn 50%]
              </span>
            )}
          </div>
          <p className="text-[11px] text-[#6B5A43] leading-relaxed max-w-xs"
            style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
          >
            Kích hoạt quỹ khấu trừ học phí khóa kế tiếp khi hoàn thành tối thiểu 50% bài tập quy định.
          </p>
        </div>

        {/* Ornamental divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, #C9A84C 40%, #C9A84C 60%, transparent)" }} />
          <span className="text-[#C9A84C] text-[10px]">◆</span>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, #C9A84C 40%, #C9A84C 60%, transparent)" }} />
        </div>

        {/* Progress + Mục tiêu block */}
        <div className="rounded-lg p-4 sm:p-5 space-y-3"
          style={{ background: "rgba(201,168,76,0.07)", border: "1px solid rgba(201,168,76,0.3)" }}
        >
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-[10px] tracking-[0.15em] font-bold uppercase text-[#7B1A1A]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              CHỈ SỐ HOÀN THÀNH BTVN
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono tabular-nums text-[#3D2B0E]">
                Đã nộp: <strong className="text-[#7B1A1A]">{submittedCount}</strong> / {totalHomeworks} bài
                (<strong className="text-[#7B1A1A]">{currentHomeworkRate}%</strong>)
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setGoalModalOpen(true)}
                className="h-7 px-2.5 rounded border text-[#7B1A1A] font-bold text-[10px] gap-1 cursor-pointer"
                style={{ borderColor: "rgba(123,26,26,0.35)", background: "rgba(123,26,26,0.05)", letterSpacing: "0.05em" }}
              >
                <Target className="w-3 h-3" />
                <span>Mục tiêu: {targetTierConfig.subTitle}</span>
              </Button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="relative pt-1 pb-6">
            <div className="relative w-full h-2.5 rounded-full overflow-hidden"
              style={{ background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)" }}
            >
              <div
                className="h-full transition-all duration-500 rounded-full"
                style={{
                  width: `${Math.min(100, Math.max(0, currentHomeworkRate))}%`,
                  background: currentHomeworkRate >= 50
                    ? "linear-gradient(90deg, #C9A84C, #8B1A1A)"
                    : "linear-gradient(90deg, #94A3B8, #64748B)",
                }}
              />
            </div>
            {/* 50% threshold marker */}
            <div className="absolute top-0 flex flex-col items-center pointer-events-none" style={{ left: "50%" }}>
              <div className="w-[1.5px] h-7 bg-[#8B1A1A] opacity-70" />
              <div className="absolute top-5 -translate-x-1/2 whitespace-nowrap text-[9px] font-bold tracking-wider uppercase text-[#7B1A1A] px-1.5 py-0.5 rounded-sm"
                style={{ background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.4)" }}
              >
                Mốc kích hoạt (50%)
              </div>
            </div>
          </div>

          {/* Status notice */}
          <div className="flex items-center justify-between text-[10px] tracking-wide">
            <span className={`font-semibold flex items-center gap-1 ${currentHomeworkRate < 50 ? "text-[#92400E]" : "text-[#166534]"}`}>
              {currentHomeworkRate < 50
                ? "⚠ Chưa đạt điều kiện kích hoạt quỹ học bổng"
                : "✓ Đã vượt ngưỡng an toàn học bổng ARIS"}
            </span>
            <span className="text-[#8C7A6B]" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
              Tiêu chuẩn chuyên cần: ≥ 90%
            </span>
          </div>
        </div>

        {/* Ornamental divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, #C9A84C 40%, #C9A84C 60%, transparent)" }} />
          <span className="text-[#C9A84C] text-[10px]">◆</span>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, #C9A84C 40%, #C9A84C 60%, transparent)" }} />
        </div>

        {/* Tier header */}
        <div className="text-center">
          <span className="text-[10px] tracking-[0.22em] uppercase font-bold text-[#7B1A1A]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            BẢNG PHÂN CẤP HỌC BỔNG
          </span>
        </div>

        {/* 4 Tier columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Cột 1: Cấp 1 | 50–69% */}
          {(() => {
            const isAchieved = currentHomeworkRate >= 50;
            const isCurrentActive = currentHomeworkRate >= 50 && currentHomeworkRate < 70;
            const isTarget = targetGoal === "TIER_1";
            const neededToReach = Math.max(0, Math.ceil(totalHomeworks * 0.5) - submittedCount);

            return (
              <div
                className="rounded-lg p-3.5 flex flex-col justify-between space-y-2 transition-all"
                style={{
                  background: isCurrentActive
                    ? "linear-gradient(135deg, #FFF8ED, #F7EFD8)"
                    : isAchieved
                    ? "rgba(201,168,76,0.06)"
                    : "rgba(201,168,76,0.03)",
                  border: isCurrentActive
                    ? "1.5px solid #C9A84C"
                    : isTarget
                    ? "1.5px dashed #C9A84C"
                    : "1px solid rgba(201,168,76,0.25)",
                  boxShadow: isCurrentActive ? "0 2px 12px rgba(201,168,76,0.18)" : "none",
                  opacity: (!isAchieved && !isTarget) ? 0.7 : 1,
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] tracking-[0.16em] font-bold uppercase text-[#8C7A6B]">CẤP 1 · 50–69%</span>
                    {isCurrentActive && (
                      <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-sm text-[#7B1A1A] uppercase tracking-wider"
                        style={{ background: "rgba(201,168,76,0.25)", border: "1px solid #C9A84C" }}
                      >HIỆN TẠI</span>
                    )}
                  </div>
                  <div className="text-xl font-black tabular-nums text-[#3D2B0E] leading-none"
                    style={{ fontFamily: "Georgia, serif" }}
                  >200.000đ</div>
                  <div className="text-[10px] text-[#8C7A6B] mt-0.5 italic" style={{ fontFamily: "Georgia, serif" }}>Khấu trừ học phí</div>
                </div>
                <div className="pt-2 text-[10px]" style={{ borderTop: "1px solid rgba(201,168,76,0.25)" }}>
                  {isAchieved ? (
                    <span className="text-[#166534] font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Đã đạt chỉ tiêu
                    </span>
                  ) : (
                    <span className="text-[#7B1A1A] font-medium">Cần thêm {neededToReach} bài</span>
                  )}
                </div>
              </div>
            );
          })()}

          {/* Cột 2: Cấp 2 | 70–79% */}
          {(() => {
            const isAchieved = currentHomeworkRate >= 70;
            const isCurrentActive = currentHomeworkRate >= 70 && currentHomeworkRate < 80;
            const isTarget = targetGoal === "TIER_2";
            const neededToReach = Math.max(0, Math.ceil(totalHomeworks * 0.7) - submittedCount);

            return (
              <div
                className="rounded-lg p-3.5 flex flex-col justify-between space-y-2 transition-all"
                style={{
                  background: isCurrentActive
                    ? "linear-gradient(135deg, #FFF8ED, #F7EFD8)"
                    : isAchieved
                    ? "rgba(201,168,76,0.06)"
                    : "rgba(201,168,76,0.03)",
                  border: isCurrentActive
                    ? "1.5px solid #C9A84C"
                    : isTarget
                    ? "1.5px dashed #C9A84C"
                    : "1px solid rgba(201,168,76,0.25)",
                  boxShadow: isCurrentActive ? "0 2px 12px rgba(201,168,76,0.18)" : "none",
                  opacity: (!isAchieved && !isTarget) ? 0.7 : 1,
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] tracking-[0.16em] font-bold uppercase text-[#8C7A6B]">CẤP 2 · 70–79%</span>
                    {isCurrentActive && (
                      <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-sm text-[#7B1A1A] uppercase tracking-wider"
                        style={{ background: "rgba(201,168,76,0.25)", border: "1px solid #C9A84C" }}
                      >HIỆN TẠI</span>
                    )}
                  </div>
                  <div className="text-xl font-black tabular-nums text-[#3D2B0E] leading-none"
                    style={{ fontFamily: "Georgia, serif" }}
                  >300.000đ</div>
                  <div className="text-[10px] text-[#8C7A6B] mt-0.5 italic" style={{ fontFamily: "Georgia, serif" }}>Khấu trừ học phí</div>
                </div>
                <div className="pt-2 text-[10px]" style={{ borderTop: "1px solid rgba(201,168,76,0.25)" }}>
                  {isAchieved ? (
                    <span className="text-[#166534] font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Đã đạt chỉ tiêu
                    </span>
                  ) : (
                    <span className="text-[#7B1A1A] font-medium">Cần thêm {neededToReach} bài</span>
                  )}
                </div>
              </div>
            );
          })()}

          {/* Cột 3: Cấp 3 | 80–89% */}
          {(() => {
            const isAchieved = currentHomeworkRate >= 80;
            const isCurrentActive = currentHomeworkRate >= 80 && currentHomeworkRate < 90;
            const isTarget = targetGoal === "TIER_3";
            const neededToReach = Math.max(0, Math.ceil(totalHomeworks * 0.8) - submittedCount);

            return (
              <div
                className="rounded-lg p-3.5 flex flex-col justify-between space-y-2 transition-all"
                style={{
                  background: isCurrentActive
                    ? "linear-gradient(135deg, #FFF8ED, #F7EFD8)"
                    : isAchieved
                    ? "rgba(201,168,76,0.06)"
                    : "rgba(201,168,76,0.03)",
                  border: isCurrentActive
                    ? "1.5px solid #C9A84C"
                    : isTarget
                    ? "1.5px dashed #C9A84C"
                    : "1px solid rgba(201,168,76,0.25)",
                  boxShadow: isCurrentActive ? "0 2px 12px rgba(201,168,76,0.18)" : "none",
                  opacity: (!isAchieved && !isTarget) ? 0.7 : 1,
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] tracking-[0.16em] font-bold uppercase text-[#8C7A6B]">CẤP 3 · 80–89%</span>
                    {isCurrentActive && (
                      <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-sm text-[#7B1A1A] uppercase tracking-wider"
                        style={{ background: "rgba(201,168,76,0.25)", border: "1px solid #C9A84C" }}
                      >HIỆN TẠI</span>
                    )}
                  </div>
                  <div className="text-xl font-black tabular-nums text-[#3D2B0E] leading-none"
                    style={{ fontFamily: "Georgia, serif" }}
                  >400.000đ</div>
                  <div className="text-[10px] text-[#8C7A6B] mt-0.5 italic" style={{ fontFamily: "Georgia, serif" }}>Khấu trừ học phí</div>
                </div>
                <div className="pt-2 text-[10px]" style={{ borderTop: "1px solid rgba(201,168,76,0.25)" }}>
                  {isAchieved ? (
                    <span className="text-[#166534] font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Đã đạt chỉ tiêu
                    </span>
                  ) : (
                    <span className="text-[#7B1A1A] font-medium">Cần thêm {neededToReach} bài</span>
                  )}
                </div>
              </div>
            );
          })()}

          {/* Cột 4: Cấp 4 | Từ 90% — HONORS TIER (nổi bật nhất) */}
          {(() => {
            const isAchieved = currentHomeworkRate >= 90;
            const isCurrentActive = isAchieved;
            const isTarget = targetGoal === "TIER_4";
            const neededToReach = Math.max(0, Math.ceil(totalHomeworks * 0.9) - submittedCount);

            return (
              <div
                className="rounded-lg p-3.5 flex flex-col justify-between space-y-2 transition-all relative overflow-hidden"
                style={{
                  background: isCurrentActive
                    ? "linear-gradient(135deg, #7B1A1A 0%, #5A1010 100%)"
                    : isTarget
                    ? "linear-gradient(135deg, #FFF8ED, #F7EFD8)"
                    : "rgba(201,168,76,0.05)",
                  border: isCurrentActive
                    ? "1.5px solid #C9A84C"
                    : isTarget
                    ? "1.5px dashed #C9A84C"
                    : "1px solid rgba(201,168,76,0.25)",
                  boxShadow: isCurrentActive
                    ? "0 4px 20px rgba(123,26,26,0.3)"
                    : "none",
                }}
              >
                {/* Gold corner ribbon */}
                <div className="absolute top-0 right-0 text-[7px] font-black uppercase tracking-widest px-2 py-0.5 rounded-bl-md"
                  style={{
                    background: "linear-gradient(90deg, #C9A84C, #8B6914)",
                    color: "white",
                  }}
                >
                  HONORS TIER
                </div>

                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <span className={`text-[9px] tracking-[0.16em] font-bold uppercase ${isCurrentActive ? "text-[#F5DFA0]" : "text-[#8C6D3B]"}`}>
                      CẤP 4 · TỪ 90%
                    </span>
                  </div>
                  <div className={`text-xl font-black tabular-nums leading-none ${isCurrentActive ? "text-[#F5DFA0]" : "text-[#5A3E1B]"}`}
                    style={{ fontFamily: "Georgia, serif" }}
                  >500.000đ</div>
                  <div className={`text-[10px] mt-0.5 italic font-semibold ${isCurrentActive ? "text-[#C9A84C]" : "text-[#8C6D3B]"}`}
                    style={{ fontFamily: "Georgia, serif" }}
                  >Mức Danh Dự Tối Đa</div>
                </div>

                <div className="pt-2 text-[10px]" style={{ borderTop: `1px solid ${isCurrentActive ? "rgba(201,168,76,0.4)" : "rgba(201,168,76,0.25)"}` }}>
                  {isAchieved ? (
                    <span className={`font-bold flex items-center gap-1 ${isCurrentActive ? "text-[#C9A84C]" : "text-[#166534]"}`}>
                      <CheckCircle2 className="w-3 h-3" /> Đạt danh hiệu tối cao
                    </span>
                  ) : (
                    <span className="text-[#7B1A1A] font-medium">Cần thêm {neededToReach} bài</span>
                  )}
                </div>
              </div>
            );
          })()}
        </div>

        {/* Ornamental divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, #C9A84C 40%, #C9A84C 60%, transparent)" }} />
          <span className="text-[#C9A84C] text-[10px]">◆</span>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, #C9A84C 40%, #C9A84C 60%, transparent)" }} />
        </div>

        {/* Footer CTA */}
        <div className="rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          style={{ background: "rgba(123,26,26,0.05)", border: "1px solid rgba(123,26,26,0.15)" }}
        >
          <div className="flex items-center gap-2 text-[#5A3825]">
            <Sparkles className="w-4 h-4 shrink-0 text-[#C9A84C]" />
            <span className="text-[12px] leading-relaxed italic" style={{ fontFamily: "Georgia, serif" }}>
              {motivationalQuote}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3.5 shrink-0">
            <div className="text-left sm:text-right">
              <span className="text-[10px] text-[#8C7A6B] block tracking-wider uppercase" style={{ fontFamily: "Georgia, serif" }}>
                Dự toán học bổng
              </span>
              <span className="text-xl font-black tabular-nums"
                style={{ fontFamily: "Georgia, serif", color: "#7B1A1A" }}
              >
                +{rewardFormatted}
              </span>
            </div>

            <Button
              size="sm"
              onClick={() => setReEnrollModalOpen(true)}
              className="h-9 px-4 rounded-md font-bold text-xs gap-2 shadow-sm cursor-pointer transition-all text-white"
              style={{
                background: "linear-gradient(135deg, #7B1A1A, #5A1010)",
                border: "1px solid #C9A84C",
                letterSpacing: "0.05em",
                fontFamily: "Georgia, serif",
              }}
            >
              <Award className="w-3.5 h-3.5 text-[#C9A84C]" />
              <span>Tái Đăng Ký Khóa Tiếp Theo</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C9A84C]" />
            </Button>
          </div>
        </div>
      </div>

      {/* Goal Commitment Modal */}
      <DisciplineGoalModal
        isOpen={goalModalOpen}
        onClose={() => setGoalModalOpen(false)}
        currentGoal={targetGoal}
        onGoalChange={setTargetGoal}
        studentId={studentId}
        classId={classId}
      />

      {/* Re-Enrollment & Scholarship Retention Modal */}
      <StudentReEnrollmentModal
        isOpen={reEnrollModalOpen}
        onClose={() => setReEnrollModalOpen(false)}
        classId={classId}
        className={className}
        courseTitle={courseTitle}
        studentId={studentId}
        studentName={studentName}
        studentPhone={studentPhone}
        scholarshipAmount={rewardAmount > 0 ? rewardAmount : 500000}
      />
    </div>
  );
}
