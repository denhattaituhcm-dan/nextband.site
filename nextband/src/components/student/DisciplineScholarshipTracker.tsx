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

interface DisciplineScholarshipTrackerProps {
  submittedCount: number;
  totalHomeworks: number;
  attendanceRate?: number;
  studentId?: string;
  classId?: string;
}

export function DisciplineScholarshipTracker({
  submittedCount,
  totalHomeworks,
  attendanceRate = 1.0,
  studentId,
  classId,
}: DisciplineScholarshipTrackerProps) {
  const [goalModalOpen, setGoalModalOpen] = useState(false);
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

  const isFlawless = effectiveTier?.key === "TIER_3";

  return (
    <Card className="rounded-3xl border border-slate-200/90 bg-white shadow-xs overflow-hidden">
      {/* Top Accent Strip */}
      <div
        className={`h-1.5 w-full ${
          isFlawless
            ? "bg-gradient-to-r from-amber-400 via-rose-500 to-amber-400"
            : rewardAmount > 0
            ? "bg-gradient-to-r from-indigo-500 via-blue-500 to-teal-400"
            : "bg-slate-300"
        }`}
      />

      <div className="p-5 sm:p-6 md:p-7 space-y-6">
        {/* Header Row: Title & Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-xl shrink-0 shadow-xs ${
                isFlawless
                  ? "bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 shadow-amber-500/20"
                  : rewardAmount > 0
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              {isFlawless ? "🔥" : rewardAmount > 0 ? "⚡" : "🎯"}
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 font-mono">
                  HỌC BỔNG KỶ LUẬT ARIS
                </span>
                {effectiveTier ? (
                  <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-0 text-[10px] font-bold px-2 py-0">
                    ✓ ĐANG GIỮ MỐC {effectiveTier.rewardFormatted}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-slate-500 border-slate-200 text-[10px] font-semibold">
                    Chưa đạt mốc tối thiểu
                  </Badge>
                )}
              </div>

              <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                {statusMessage}
              </h3>
            </div>
          </div>

          {/* Right Action: Button Đổi Mục Tiêu */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setGoalModalOpen(true)}
            className="h-9 px-4 rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs gap-1.5 shadow-2xs self-start sm:self-auto cursor-pointer"
          >
            <Target className="w-3.5 h-3.5 text-rose-600" />
            <span>Mục tiêu: {targetTierConfig.subTitle}</span>
          </Button>
        </div>

        {/* 3-Step Milestone Stepper */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span className="text-slate-500 font-mono text-[11px]">Tiến độ nộp BTVN</span>
            <span className="text-slate-900 font-mono">
              Đã nộp: <strong className="text-rose-600 font-black">{submittedCount}</strong> / {totalHomeworks} bài ({currentHomeworkRate}%)
            </span>
          </div>

          {/* Progress Bar with Milestone Markers */}
          <div className="relative">
            {/* Background Track */}
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200/80">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  isFlawless
                    ? "bg-gradient-to-r from-amber-400 via-rose-500 to-amber-500"
                    : currentHomeworkRate >= 90
                    ? "bg-gradient-to-r from-indigo-500 to-blue-600"
                    : currentHomeworkRate >= 80
                    ? "bg-gradient-to-r from-blue-400 to-blue-600"
                    : "bg-slate-400"
                }`}
                style={{ width: `${Math.min(100, Math.max(8, currentHomeworkRate))}%` }}
              />
            </div>

            {/* Stepping Pills under the bar */}
            <div className="grid grid-cols-3 gap-2 pt-3">
              {/* Step 1: 80% */}
              <div
                className={`p-3 rounded-2xl border text-center transition-all ${
                  currentHomeworkRate >= 80
                    ? "bg-blue-50/80 border-blue-200 text-blue-900 shadow-2xs"
                    : "bg-slate-50 border-slate-200/70 text-slate-400 opacity-70"
                }`}
              >
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider">
                  Cấp 1 · 80% BTVN
                </div>
                <div className="text-sm font-black mt-0.5">200.000đ</div>
                <div className="text-[10px] font-semibold text-slate-500 mt-0.5">Khấu trừ khóa sau</div>
              </div>

              {/* Step 2: 90% */}
              <div
                className={`p-3 rounded-2xl border text-center transition-all ${
                  currentHomeworkRate >= 90
                    ? "bg-indigo-50/80 border-indigo-200 text-indigo-900 shadow-2xs ring-1 ring-indigo-400/30"
                    : "bg-slate-50 border-slate-200/70 text-slate-400 opacity-70"
                }`}
              >
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider">
                  Cấp 2 · 90% BTVN
                </div>
                <div className="text-sm font-black mt-0.5">300.000đ</div>
                <div className="text-[10px] font-semibold text-slate-500 mt-0.5">Khấu trừ khóa sau</div>
              </div>

              {/* Step 3: 100% */}
              <div
                className={`p-3 rounded-2xl border text-center transition-all ${
                  currentHomeworkRate === 100
                    ? "bg-gradient-to-b from-amber-50 to-amber-100/60 border-amber-300 text-amber-950 shadow-md ring-2 ring-amber-400/30"
                    : "bg-slate-50 border-slate-200/70 text-slate-400 opacity-70"
                }`}
              >
                <div className="text-[10px] font-mono font-black uppercase tracking-wider text-amber-700">
                  Cấp 3 · Kỷ Luật Thép
                </div>
                <div className="text-sm font-black text-slate-900 mt-0.5">500.000đ</div>
                <div className="text-[10px] font-bold text-amber-800 mt-0.5">Tối đa 100%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Motivational Callout & Missable Tolerance Indicator */}
        <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-700 font-medium">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <span>{motivationalQuote}</span>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[11px] text-slate-500 block">
              Dự toán học bổng khóa tiếp theo:
            </span>
            <span className="text-base font-black text-rose-600 font-mono">
              +{rewardFormatted}
            </span>
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
    </Card>
  );
}
