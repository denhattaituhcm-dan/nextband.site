import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  Swords,
  Layers,
  ArrowRight,
  HelpCircle,
  Clock,
  SpellCheck,
  FileWarning,
} from "lucide-react";
import {
  ObjectiveBattleDebrief,
  QuestionTypeStat,
} from "@/lib/objectiveEvidenceAggregator";
import { cn } from "@/lib/utils";

interface ReadingBattleDebriefViewProps {
  debrief: ObjectiveBattleDebrief;
  onOpenRevenge?: (typeStat: QuestionTypeStat) => void;
}

export function ReadingBattleDebriefView({
  debrief,
  onOpenRevenge,
}: ReadingBattleDebriefViewProps) {
  if (!debrief || debrief.totalQuestions === 0) {
    return null;
  }

  const {
    overallAccuracyPercent,
    totalCorrect,
    totalQuestions,
    weakestType,
    criticalWeaknesses,
    strengths,
    typeStats,
    deterministicErrors,
  } = debrief;

  return (
    <div className="rounded-2xl border border-blue-200 bg-white dark:bg-slate-900 shadow-sm p-5 space-y-4 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span>Báo Cáo Hiệu Suất Theo Dạng Bài</span>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-[10px] font-bold">
                Tự động gom bằng chứng
              </Badge>
            </h3>
            <p className="text-xs text-slate-500">
              Phân tích độ chính xác dựa trên từng dạng câu hỏi chuẩn IELTS trong bài thi này
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-500 block uppercase">Độ chính xác</span>
            <span className="text-lg font-black text-blue-700 dark:text-blue-400 tabular-nums">
              {overallAccuracyPercent}%
              <span className="text-xs font-normal text-slate-400 ml-1">({totalCorrect}/{totalQuestions})</span>
            </span>
          </div>
        </div>
      </div>

      {/* QUESTION TYPE BREAKDOWN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
        {typeStats.map((item) => {
          const isCritical = item.status === "CRITICAL_WEAKNESS";
          const isMastered = item.status === "STRONG_MASTERY";

          return (
            <div
              key={item.questionType}
              className={cn(
                "p-3.5 rounded-xl border transition-all flex flex-col justify-between space-y-2.5",
                isCritical
                  ? "bg-rose-50/60 border-rose-200 dark:bg-rose-950/20 dark:border-rose-900"
                  : isMastered
                  ? "bg-emerald-50/60 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-900"
                  : "bg-slate-50/70 border-slate-200 dark:bg-slate-800/40 dark:border-slate-700"
              )}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                    {isCritical && <AlertTriangle className="h-3.5 w-3.5 text-rose-600 shrink-0" />}
                    {isMastered && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />}
                    <span>{item.labelVi}</span>
                  </span>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[10px] font-extrabold tabular-nums",
                      isCritical
                        ? "bg-rose-100 text-rose-800 border-rose-300"
                        : isMastered
                        ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                        : "bg-slate-200 text-slate-700 border-slate-300"
                    )}
                  >
                    {item.correct}/{item.total} ({item.accuracyPercent}%)
                  </Badge>
                </div>

                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.descriptionVi}
                </p>
              </div>

              {/* Action / Remediation Tip if incorrect */}
              {item.incorrect > 0 ? (
                <div className="text-[11px] text-rose-900 dark:text-rose-300 bg-white/80 dark:bg-slate-900/80 p-2 rounded-lg border border-rose-200/70 flex items-start gap-1.5">
                  <span className="font-bold text-rose-700 shrink-0">💡 Lời khuyên:</span>
                  <span>{item.remediationAdvice}</span>
                </div>
              ) : (
                <div className="text-[11px] text-emerald-900 dark:text-emerald-300 bg-white/80 dark:bg-slate-900/80 p-2 rounded-lg border border-emerald-200/70 flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3 text-emerald-600" />
                  <span className="font-semibold">Bạn đã xử lý tuyệt đối chính xác 100% dạng câu hỏi này!</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* DETERMINISTIC FILL-IN-THE-BLANK ERRORS (IF ANY) */}
      {deterministicErrors.length > 0 && (
        <div className="rounded-xl border border-amber-300 bg-amber-50/70 dark:bg-amber-950/30 p-3.5 space-y-2 mt-2">
          <div className="flex items-center gap-1.5 text-xs font-extrabold text-amber-900 dark:text-amber-200">
            <FileWarning className="h-4 w-4 text-amber-600" />
            <span>Lỗi Thao Tác Điền Từ (Xác thực 100% bằng máy):</span>
          </div>
          <div className="space-y-1.5">
            {deterministicErrors.map((err, idx) => (
              <div
                key={idx}
                className="bg-white/90 dark:bg-slate-900/90 p-2.5 rounded-lg text-xs border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    {err.errorType === "WORD_LIMIT_BREACH" ? (
                      <Badge variant="outline" className="bg-rose-100 text-rose-800 border-rose-300 text-[10px] font-bold">
                        Quá số từ
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300 text-[10px] font-bold">
                        Chính tả
                      </Badge>
                    )}
                    <span className="font-bold text-slate-800 dark:text-slate-200">{err.labelVi}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">{err.explanation}</p>
                </div>
                <div className="text-[11px] font-mono text-slate-500 shrink-0 bg-slate-50 dark:bg-slate-800 p-1.5 rounded border">
                  Bạn gõ: <span className="text-rose-600 font-bold">{err.studentAnswer}</span> ➔ Đúng: <span className="text-emerald-600 font-bold">{err.correctAnswer}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 1-CLICK REVENGE LOOP ACTION CALLOUT */}
      {weakestType && weakestType.incorrect > 0 && onOpenRevenge && (
        <div className="p-4 rounded-xl bg-linear-to-r from-orange-500 to-amber-600 text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 font-black text-sm">
              <Swords className="h-4 w-4 text-amber-200" />
              <span>Phục Thù Kỹ Năng — Master Dạng Bài!</span>
            </div>
            <p className="text-xs text-orange-100">
              Bạn đang gặp khó khăn ở dạng <strong>{weakestType.labelVi}</strong> (chưa đúng {weakestType.incorrect} câu).
              Luyện ngay 4 câu tương tự để lấy lại phong độ!
            </p>
          </div>

          <Button
            type="button"
            onClick={() => onOpenRevenge(weakestType)}
            className="bg-white text-orange-700 hover:bg-orange-50 font-extrabold text-xs h-9 px-4 rounded-xl shadow-xs shrink-0 cursor-pointer gap-1.5"
          >
            <span>Phục Thù Dạng Bài Ngay</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      )}
    </div>
  );
}
