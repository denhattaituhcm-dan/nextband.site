import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
    <Card className="rounded-2xl border border-[#E5E0D8] bg-[#FFFFFF] shadow-xs overflow-hidden">
      {/* 1. Header Khế Ước Danh Dự */}
      <div className="p-5 sm:p-6 md:p-7 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F0EBE1] pb-4">
          <div className="flex items-center gap-3.5">
            {/* Academic Medal Icon */}
            <div className="w-11 h-11 rounded-xl bg-[#FAF8F4] border border-[#E5E0D8] flex items-center justify-center shrink-0 shadow-2xs text-[#8C6D3B]">
              <Award className="w-5 h-5 text-[#8C6D3B]" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#8C6D3B]">
                  QUY CHẾ KHẾ ƯỚC DANH DỰ
                </span>
                {effectiveTier ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#F0FDF4] text-[#166534] border border-[#BBF7D0]">
                    ✓ ĐÃ KÍCH HOẠT: {effectiveTier.rewardFormatted}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#FFFBEB] text-[#92400E] border border-dashed border-[#FCD34D]">
                    [Chưa đạt mốc sàn 50%]
                  </span>
                )}
              </div>

              <h3 className="text-base sm:text-lg font-bold tracking-tight text-[#0F172A]">
                HỌC BỔNG KỶ LUẬT ARIS
              </h3>
              <p className="text-[11px] text-[#64748B] leading-relaxed">
                Kích hoạt quỹ khấu trừ học phí khóa kế tiếp khi hoàn thành tối thiểu 50% bài tập quy định.
              </p>
            </div>
          </div>

          {/* Right Action: Button Chọn / Đổi Mục Tiêu */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setGoalModalOpen(true)}
            className="h-8 px-3 rounded-lg border-[#E2DCD2] bg-[#FAF8F4] hover:bg-[#F3EFE8] text-[#5A3E1B] font-mono font-bold text-xs gap-1.5 shadow-2xs self-start sm:self-auto cursor-pointer"
          >
            <Target className="w-3.5 h-3.5 text-[#8C6D3B]" />
            <span>Mục tiêu: {targetTierConfig.subTitle}</span>
          </Button>
        </div>

        {/* 2. Thước đo Kỷ luật BTVN (Clinical Diagnostic Track) */}
        <div className="space-y-2.5 bg-[#FAF8F4] p-4 sm:p-5 rounded-xl border border-[#EBE5DB]">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#64748B] font-mono text-[11px] uppercase tracking-wide">
              Chỉ số hoàn thành BTVN (Accuracy & Submission)
            </span>
            <span className="text-[#1E293B] font-mono tabular-nums">
              Đã nộp: <strong className="text-[#5A3E1B] font-bold">{submittedCount}</strong> / {totalHomeworks} bài (<strong className="font-bold">{currentHomeworkRate}%</strong>)
            </span>
          </div>

          {/* High-Resolution Diagnostic Meter */}
          <div className="relative pt-2 pb-5">
            {/* Meter Track Base */}
            <div className="relative w-full h-2 bg-[#E2DCD2] rounded-full overflow-hidden">
              {/* Progress Fill */}
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  currentHomeworkRate >= 50
                    ? "bg-gradient-to-r from-[#C2A374] via-[#9E7D47] to-[#5A3E1B]"
                    : "bg-[#94A3B8]"
                }`}
                style={{ width: `${Math.min(100, Math.max(0, currentHomeworkRate))}%` }}
              />
            </div>

            {/* Critical Threshold at 50% */}
            <div
              className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none"
              style={{ left: "50%" }}
            >
              {/* Vertical Dashed Line Marker */}
              <div className="w-[1.5px] h-6 -top-2 bg-[#D97706] border-l border-dashed border-[#D97706]" />
              <div className="absolute top-4 whitespace-nowrap text-[10px] font-mono font-bold text-[#92400E] bg-[#FEF3C7] px-1.5 py-0.5 rounded border border-[#FDE68A] shadow-2xs">
                Mốc sàn kích hoạt học bổng (50%)
              </div>
            </div>
          </div>

          {/* Clinical Status Notice beneath meter */}
          <div className="pt-1 flex items-center justify-between text-[11px] font-mono text-[#64748B]">
            <span className={currentHomeworkRate < 50 ? "text-[#D97706] font-medium" : "text-[#64748B]"}>
              {currentHomeworkRate < 50
                ? "⚠ Cảnh báo lâm sàng: Chưa đạt điều kiện kích hoạt quỹ học bổng"
                : "✓ Đã vượt ngưỡng an toàn học bổng viện ARIS"}
            </span>
            <span className="text-[#8C7A6B]">Tiêu chuẩn chuyên cần: ≥ 90%</span>
          </div>
        </div>

        {/* 3. Bảng phân cấp 4 Cấp độ Học bổng (Institutional Tier Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Cột 1: Cấp 1 | 50–69% */}
          {(() => {
            const isAchieved = currentHomeworkRate >= 50;
            const isCurrentActive = currentHomeworkRate >= 50 && currentHomeworkRate < 70;
            const isTarget = targetGoal === "TIER_1";
            const neededToReach = Math.max(0, Math.ceil(totalHomeworks * 0.5) - submittedCount);

            return (
              <div
                className={`p-3.5 rounded-xl border transition-all text-left flex flex-col justify-between space-y-2 ${
                  isCurrentActive
                    ? "bg-[#FFFDF7] border-[#DEC8A9] shadow-xs ring-1 ring-[#DEC8A9]"
                    : isAchieved
                    ? "bg-[#FDFBF7] border-[#E8DFC8] text-[#4A3B2C]"
                    : isTarget
                    ? "bg-[#FFFFFF] border-dashed border-[#D97706] ring-1 ring-[#FDE68A]"
                    : "bg-[#FAFAFA] border-[#EAE6DF] opacity-75"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8C7A6B]">
                      Cấp 1 · 50–69%
                    </span>
                    {isCurrentActive && (
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-[#F5EFE6] text-[#5A3E1B]">
                        HIỆN TẠI
                      </span>
                    )}
                  </div>
                  <div className="text-base font-black font-mono tracking-tight text-[#0F172A] mt-1 tabular-nums">
                    200.000đ
                  </div>
                  <div className="text-[11px] text-[#64748B] mt-0.5">Khấu trừ khóa sau</div>
                </div>

                <div className="pt-2 border-t border-[#F0EBE1] text-[10px] font-mono">
                  {isAchieved ? (
                    <span className="text-[#166534] font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Đã đạt chỉ tiêu
                    </span>
                  ) : (
                    <span className="text-[#92400E]">
                      Cần thêm {neededToReach} bài
                    </span>
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
                className={`p-3.5 rounded-xl border transition-all text-left flex flex-col justify-between space-y-2 ${
                  isCurrentActive
                    ? "bg-[#FFFDF7] border-[#DEC8A9] shadow-xs ring-1 ring-[#DEC8A9]"
                    : isAchieved
                    ? "bg-[#FDFBF7] border-[#E8DFC8] text-[#4A3B2C]"
                    : isTarget
                    ? "bg-[#FFFFFF] border-dashed border-[#D97706] ring-1 ring-[#FDE68A]"
                    : "bg-[#FAFAFA] border-[#EAE6DF] opacity-75"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8C7A6B]">
                      Cấp 2 · 70–79%
                    </span>
                    {isCurrentActive && (
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-[#F5EFE6] text-[#5A3E1B]">
                        HIỆN TẠI
                      </span>
                    )}
                  </div>
                  <div className="text-base font-black font-mono tracking-tight text-[#0F172A] mt-1 tabular-nums">
                    300.000đ
                  </div>
                  <div className="text-[11px] text-[#64748B] mt-0.5">Khấu trừ khóa sau</div>
                </div>

                <div className="pt-2 border-t border-[#F0EBE1] text-[10px] font-mono">
                  {isAchieved ? (
                    <span className="text-[#166534] font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Đã đạt chỉ tiêu
                    </span>
                  ) : (
                    <span className="text-[#92400E]">
                      Cần thêm {neededToReach} bài
                    </span>
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
                className={`p-3.5 rounded-xl border transition-all text-left flex flex-col justify-between space-y-2 ${
                  isCurrentActive
                    ? "bg-[#FFFDF7] border-[#DEC8A9] shadow-xs ring-1 ring-[#DEC8A9]"
                    : isAchieved
                    ? "bg-[#FDFBF7] border-[#E8DFC8] text-[#4A3B2C]"
                    : isTarget
                    ? "bg-[#FFFFFF] border-dashed border-[#D97706] ring-1 ring-[#FDE68A]"
                    : "bg-[#FAFAFA] border-[#EAE6DF] opacity-75"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8C7A6B]">
                      Cấp 3 · 80–89%
                    </span>
                    {isCurrentActive && (
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-[#F5EFE6] text-[#5A3E1B]">
                        HIỆN TẠI
                      </span>
                    )}
                  </div>
                  <div className="text-base font-black font-mono tracking-tight text-[#0F172A] mt-1 tabular-nums">
                    400.000đ
                  </div>
                  <div className="text-[11px] text-[#64748B] mt-0.5">Khấu trừ khóa sau</div>
                </div>

                <div className="pt-2 border-t border-[#F0EBE1] text-[10px] font-mono">
                  {isAchieved ? (
                    <span className="text-[#166534] font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Đã đạt chỉ tiêu
                    </span>
                  ) : (
                    <span className="text-[#92400E]">
                      Cần thêm {neededToReach} bài
                    </span>
                  )}
                </div>
              </div>
            );
          })()}

          {/* Cột 4: Cấp 4 | Từ 90% (Honors Tier) */}
          {(() => {
            const isAchieved = currentHomeworkRate >= 90;
            const isCurrentActive = isAchieved;
            const isTarget = targetGoal === "TIER_4";
            const neededToReach = Math.max(0, Math.ceil(totalHomeworks * 0.9) - submittedCount);

            return (
              <div
                className={`p-3.5 rounded-xl border transition-all text-left flex flex-col justify-between space-y-2 relative overflow-hidden ${
                  isCurrentActive
                    ? "bg-[#FFFDF7] border-[#8C6D3B] shadow-sm ring-1 ring-[#8C6D3B]"
                    : isTarget
                    ? "bg-[#FFFFFF] border-dashed border-[#D97706] ring-1 ring-[#FDE68A]"
                    : "bg-[#FAFAFA] border-[#EAE6DF] opacity-75"
                }`}
              >
                {/* Top Badge: Honors Tier */}
                <div className="absolute top-0 right-0 bg-[#8C6D3B] text-white text-[8px] font-mono font-bold px-2 py-0.5 rounded-bl-md uppercase">
                  Honors Tier
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8C6D3B]">
                      Cấp 4 · Từ 90%
                    </span>
                  </div>
                  <div className="text-base font-black font-mono tracking-tight text-[#5A3E1B] mt-1 tabular-nums">
                    500.000đ
                  </div>
                  <div className="text-[11px] font-semibold text-[#8C6D3B] mt-0.5">
                    Mức Danh Dự Tối Đa
                  </div>
                </div>

                <div className="pt-2 border-t border-[#F0EBE1] text-[10px] font-mono">
                  {isAchieved ? (
                    <span className="text-[#166534] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Đạt danh hiệu tối cao
                    </span>
                  ) : (
                    <span className="text-[#92400E]">
                      Cần thêm {neededToReach} bài
                    </span>
                  )}
                </div>
              </div>
            );
          })()}
        </div>

        {/* 4. Footer & Nút Hành Động Tái Đăng Ký */}
        <div className="rounded-xl bg-[#FAF8F4] border border-[#E5E0D8] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-[#475569]">
            <Sparkles className="w-4 h-4 text-[#8C6D3B] shrink-0" />
            <span className="leading-relaxed font-medium">{motivationalQuote}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3.5 shrink-0">
            <div className="text-left sm:text-right">
              <span className="text-[11px] text-[#64748B] block font-mono">
                Dự toán học bổng khóa tiếp theo:
              </span>
              <span className="text-lg font-bold text-[#5A3E1B] font-mono tabular-nums">
                +{rewardFormatted}
              </span>
            </div>

            <Button
              size="sm"
              onClick={() => setReEnrollModalOpen(true)}
              className="h-9 px-4 rounded-lg bg-[#4D3117] hover:bg-[#3B291A] text-white font-mono font-bold text-xs gap-2 shadow-sm cursor-pointer transition-all"
            >
              <Award className="w-3.5 h-3.5 text-[#F5DEB3]" />
              <span>Tái Đăng Ký Khóa Tiếp Theo</span>
              <ArrowRight className="w-3.5 h-3.5" />
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
    </Card>
  );
}
