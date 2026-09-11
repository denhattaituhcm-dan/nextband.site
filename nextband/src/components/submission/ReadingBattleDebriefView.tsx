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
  onRetryExam?: () => void;
  isRetrying?: boolean;
}

export function ReadingBattleDebriefView({
  debrief,
  onOpenRevenge,
  onRetryExam,
  isRetrying = false,
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

      {/* ACTION CALLOUT: CHO PHÉP LÀM LẠI BÀI TRẮC NGHIỆM ĐỂ CẢI THIỆN ĐIỂM */}
      {weakestType && weakestType.incorrect > 0 && (onRetryExam || onOpenRevenge) && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 font-black text-sm">
              <Swords className="h-4 w-4 text-amber-200" />
              <span>Rèn Luyện Cải Thiện — Làm Lại Bài Này</span>
            </div>
            <p className="text-xs text-orange-100">
              Bạn có thể làm lại để khắc phục các lỗi ở dạng <strong>{weakestType.labelVi}</strong> (chưa đúng {weakestType.incorrect} câu). Hệ thống sẽ chấm máy tự động và huỷ bỏ kết quả bài cũ để ghi nhận bài làm mới của bạn!
            </p>
          </div>

          <Button
            type="button"
            onClick={onRetryExam || (() => onOpenRevenge?.(weakestType))}
            disabled={isRetrying}
            className="bg-white text-orange-700 hover:bg-orange-50 font-extrabold text-xs h-9 px-4 rounded-xl shadow-xs shrink-0 cursor-pointer gap-1.5"
          >
            <span>{isRetrying ? "Đang tạo bài làm..." : "Làm Lại Bài Này"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      )}
    </div>
  );
}
