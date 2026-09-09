import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Award,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Target,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import {
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

const TIERS_DISPLAY = [
  {
    key: "TIER_1" as DisciplineTierKey,
    label: "Cấp 1 · 50–69%",
    minRate: 50,
    maxRate: 70,
    threshold: 0.5,
    reward: "200.000đ",
    desc: "Khấu trừ học phí",
  },
  {
    key: "TIER_2" as DisciplineTierKey,
    label: "Cấp 2 · 70–79%",
    minRate: 70,
    maxRate: 80,
    threshold: 0.7,
    reward: "300.000đ",
    desc: "Khấu trừ học phí",
  },
  {
    key: "TIER_3" as DisciplineTierKey,
    label: "Cấp 3 · 80–89%",
    minRate: 80,
    maxRate: 90,
    threshold: 0.8,
    reward: "400.000đ",
    desc: "Khấu trừ học phí",
  },
  {
    key: "TIER_4" as DisciplineTierKey,
    label: "Cấp 4 · Từ 90%",
    minRate: 90,
    maxRate: 101,
    threshold: 0.9,
    reward: "500.000đ",
    desc: "Mức Danh Dự Tối Đa",
    isHonors: true,
  },
];

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
    motivationalQuote,
  } = standing;

  return (
    <div className="relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden transition-all">
      {/* Top accent gradient bar */}
      <div className="h-1 w-full bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600" />

      {/* Header */}
      <div className="p-5 sm:p-6 pb-4 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 tracking-tight">
                Học Bổng Kỷ Luật ARIS
              </h3>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                Discipline &amp; Excellence
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Quy chế cam kết danh dự · Khấu trừ học phí khóa kế tiếp khi hoàn thành tối thiểu 50% bài tập quy định.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          {effectiveTier ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Đã kích hoạt: {effectiveTier.rewardFormatted}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              Chưa đạt mốc sàn 50%
            </span>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => setGoalModalOpen(true)}
            className="h-8 px-3 rounded-lg border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 gap-1.5 cursor-pointer"
          >
            <Target className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Mục tiêu: {targetTierConfig.subTitle}</span>
          </Button>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 sm:p-6 space-y-6">
        {/* Progress & Target section */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs flex-wrap gap-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              Tiến độ hoàn thành BTVN
            </span>
            <div className="flex items-center gap-2">
              <span className="tabular-nums text-slate-600 dark:text-slate-400">
                Đã nộp: <strong className="text-slate-900 dark:text-slate-100 font-bold">{submittedCount}</strong> / {totalHomeworks} bài
              </span>
              <span className="font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 tabular-nums text-xs">
                {currentHomeworkRate}%
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="relative pt-1 pb-5">
            <div className="relative w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full transition-all duration-500 rounded-full"
                style={{
                  width: `${Math.min(100, Math.max(0, currentHomeworkRate))}%`,
                  background: currentHomeworkRate >= 50
                    ? "linear-gradient(90deg, #10b981, #059669)"
                    : "linear-gradient(90deg, #f59e0b, #d97706)",
                }}
              />
            </div>
            {/* 50% activation milestone marker */}
            <div className="absolute top-0 flex flex-col items-center pointer-events-none -translate-x-1/2" style={{ left: "50%" }}>
              <div className="w-0.5 h-3.5 bg-slate-400 dark:bg-slate-500 z-10" />
              <div className="mt-1 text-[10px] font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap bg-white dark:bg-slate-850 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 shadow-xs">
                Mốc kích hoạt (50%)
              </div>
            </div>
          </div>

          {/* Status notice */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-0.5">
            <span className={currentHomeworkRate >= 50 ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-amber-600 dark:text-amber-400 font-medium"}>
              {currentHomeworkRate >= 50
                ? "✓ Đã vượt ngưỡng an toàn học bổng ARIS"
                : "⚠ Chưa đạt điều kiện kích hoạt quỹ học bổng"}
            </span>
            <span className="text-[11px] text-slate-400">
              Tiêu chuẩn chuyên cần: ≥ 90%
            </span>
          </div>
        </div>

        {/* 4 Tier Columns */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
            Bảng Phân Cấp Học Bổng
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {TIERS_DISPLAY.map((tier) => {
              const isAchieved = currentHomeworkRate >= tier.minRate;
              const isCurrentActive = currentHomeworkRate >= tier.minRate && currentHomeworkRate < tier.maxRate;
              const isTarget = targetGoal === tier.key;
              const neededToReach = Math.max(0, Math.ceil(totalHomeworks * tier.threshold) - submittedCount);

              return (
                <div
                  key={tier.key}
                  className={`rounded-xl p-3.5 flex flex-col justify-between space-y-3 transition-all relative overflow-hidden border ${
                    isCurrentActive
                      ? "border-amber-400 dark:border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 shadow-xs ring-1 ring-amber-400/30"
                      : isTarget
                      ? "border-dashed border-indigo-400 dark:border-indigo-600 bg-indigo-50/30 dark:bg-indigo-950/20"
                      : "border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40"
                  } ${(!isAchieved && !isTarget) ? "opacity-80" : "opacity-100"}`}
                >
                  {tier.isHonors && (
                    <div className="absolute top-0 right-0 text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-bl-md bg-gradient-to-r from-amber-500 to-amber-600 text-white">
                      HONORS TIER
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        {tier.label}
                      </span>
                      {isCurrentActive && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 uppercase tracking-wider">
                          Hiện tại
                        </span>
                      )}
                    </div>

                    <div className="text-xl font-black tabular-nums text-slate-900 dark:text-slate-100 leading-none">
                      {tier.reward}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      {tier.desc}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-xs">
                    {isAchieved ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {tier.isHonors ? "Đạt mức tối đa" : "Đã đạt chỉ tiêu"}
                      </span>
                    ) : (
                      <span className="text-slate-600 dark:text-slate-400 font-medium">
                        Cần thêm <strong className="text-slate-900 dark:text-slate-200 font-bold">{neededToReach}</strong> bài
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="px-5 sm:px-6 py-4 bg-slate-50/80 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
          <Sparkles className="w-4 h-4 shrink-0 text-amber-500" />
          <span className="text-xs leading-relaxed">
            {motivationalQuote}
          </span>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
          <div className="text-left sm:text-right">
            <span className="text-[10px] text-slate-400 dark:text-slate-500 block uppercase tracking-wider">
              Dự toán học bổng
            </span>
            <span className="text-xl font-black tabular-nums text-emerald-600 dark:text-emerald-400">
              +{rewardFormatted}
            </span>
          </div>

          <Button
            size="sm"
            onClick={() => setReEnrollModalOpen(true)}
            className="h-9 px-4 rounded-xl font-bold text-xs gap-2 shadow-xs bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white cursor-pointer transition-all"
          >
            <Award className="w-3.5 h-3.5 text-amber-400 dark:text-amber-600" />
            <span>Tái Đăng Ký Khóa Tiếp Theo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
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
