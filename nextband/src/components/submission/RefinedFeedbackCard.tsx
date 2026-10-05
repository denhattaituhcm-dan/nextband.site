import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  Edit3,
  Loader2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Target,
  FileCheck,
} from "lucide-react";
import { parseStructuredFeedback, SentenceFeedbackItem } from "@/lib/sentenceFeedback";

interface RefinedFeedbackCardProps {
  feedback: any;
  resolvedSkill: string;
  totalScore?: number | string | null;
  revisionRequired?: boolean;
  primaryErrorCategory?: string | null;
  isStartingRevision?: boolean;
  onStartRevision?: () => void;
}

export function RefinedFeedbackCard({
  feedback,
  resolvedSkill,
  totalScore,
  revisionRequired,
  primaryErrorCategory,
  isStartingRevision,
  onStartRevision,
}: RefinedFeedbackCardProps) {
  const parsed = React.useMemo(() => parseStructuredFeedback(feedback), [feedback]);

  const candidateText = (parsed.text || parsed.speakingSummary?.teacherNote || "").trim();
  const feedbackText =
    candidateText && !candidateText.startsWith("{") && !candidateText.startsWith("[")
      ? candidateText
      : typeof feedback === "string" && !feedback.trim().startsWith("{") && !feedback.trim().startsWith("[")
      ? feedback.trim()
      : "";

  const criteria = parsed.criteriaScores;
  const isWriting = resolvedSkill === "writing";
  const isSpeaking = resolvedSkill === "speaking";
  const hasCriteria = isWriting || isSpeaking;

  const criteriaList = React.useMemo(() => {
    if (!criteria) return [];
    if (isWriting) {
      return [
        { key: "TR", label: "Task Response (TR)", score: criteria.taskResponse },
        { key: "CC", label: "Coherence & Cohesion (CC)", score: criteria.coherence },
        { key: "LR", label: "Lexical Resource (LR)", score: criteria.lexical },
        { key: "GRA", label: "Grammar Range (GRA)", score: criteria.grammar },
      ];
    }
    if (isSpeaking) {
      return [
        { key: "FC", label: "Fluency & Coherence (FC)", score: criteria.fluencyAndCoherence ?? criteria.coherence },
        { key: "LR", label: "Lexical Resource (LR)", score: criteria.lexical },
        { key: "GRA", label: "Grammar Range (GRA)", score: criteria.grammar },
        { key: "PR", label: "Pronunciation (PR)", score: criteria.pronunciation },
      ];
    }
    return [];
  }, [criteria, isWriting, isSpeaking]);

  const sentenceFeedbacks: SentenceFeedbackItem[] = React.useMemo(() => {
    if (Array.isArray(parsed.sentenceFeedbacks) && parsed.sentenceFeedbacks.length > 0) {
      return parsed.sentenceFeedbacks;
    }
    return [];
  }, [parsed.sentenceFeedbacks]);

  const mainError = primaryErrorCategory || parsed.primaryErrorCategory;
  const hasAnyContent = Boolean(
    feedbackText ||
    revisionRequired ||
    sentenceFeedbacks.length > 0 ||
    criteriaList.some((c) => c.score != null)
  );

  if (!hasAnyContent) return null;

  return (
    <Card className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-xs space-y-5">
      {/* 1. Header & Main Error Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
            <MessageSquare className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              Phản Hồi & Đánh Giá Của Giáo Viên
            </h2>
            <p className="text-xs text-muted-foreground font-medium">
              Chuẩn tiêu chí học thuật IELTS · Đánh giá chuyên môn
            </p>
          </div>
        </div>

        {mainError && (
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300/80 font-bold text-xs px-2.5 py-1 gap-1"
          >
            <Target className="h-3 w-3 text-amber-600" />
            <span>Lỗi chính: {mainError}</span>
          </Badge>
        )}
      </div>

      {/* 2. Qualitative Feedback Text */}
      {feedbackText ? (
        <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
          <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap font-normal">
            {feedbackText}
          </p>
        </div>
      ) : criteriaList.some((c) => c.score != null) ? (
        <p className="text-xs text-muted-foreground italic">
          Giáo viên đã hoàn tất chấm điểm chi tiết theo 4 tiêu chí chuẩn IELTS dưới đây.
        </p>
      ) : null}

      {/* 3. IELTS 4-Criteria Score Matrix with Visual Progress Bars */}
      {hasCriteria && criteriaList.some((c) => c.score != null) && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
              Điểm Thành Phần (Chuẩn IELTS)
            </span>
            {totalScore != null && (
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200">
                Overall: Band {totalScore}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {criteriaList.map((item) => {
              const numericScore = typeof item.score === "number" ? item.score : Number(item.score);
              const percent = !isNaN(numericScore) ? Math.min(100, Math.round((numericScore / 9.0) * 100)) : 0;

              return (
                <div
                  key={item.key}
                  className="p-3.5 rounded-xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/30 space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {item.label}
                    </span>
                    <span className="font-extrabold text-sm text-slate-900 dark:text-slate-100 tabular-nums">
                      {item.score != null ? `Band ${item.score}` : "—"}
                    </span>
                  </div>

                  {item.score != null && (
                    <div className="w-full bg-slate-200/70 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. Top Sentence Action Items (If sentence-level feedback exists) */}
      {sentenceFeedbacks.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-1.5">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Chi tiết câu cần sửa ({sentenceFeedbacks.length} vị trí)
            </h3>
          </div>

          <div className="space-y-2.5">
            {sentenceFeedbacks.slice(0, 3).map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-amber-200/80 dark:border-amber-900/50 bg-amber-50/30 dark:bg-amber-950/15 space-y-2 text-xs"
              >
                {item.originalSentence && (
                  <div>
                    <span className="font-bold text-slate-500 uppercase text-[10px] block">
                      Câu học viên viết:
                    </span>
                    <p className="text-slate-900 dark:text-slate-100 font-medium line-through decoration-rose-500/70">
                      {item.originalSentence}
                    </p>
                  </div>
                )}

                {item.suggestedSentence && (
                  <div>
                    <span className="font-bold text-emerald-600 uppercase text-[10px] block">
                      Gợi ý viết chuẩn:
                    </span>
                    <p className="text-emerald-950 dark:text-emerald-200 font-semibold bg-emerald-50 dark:bg-emerald-950/50 p-2 rounded-lg border border-emerald-200/60">
                      {item.suggestedSentence}
                    </p>
                  </div>
                )}

                {item.note && (
                  <p className="text-slate-600 dark:text-slate-400 italic">
                    💡 Nhận xét: {item.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Revision Required CTA Block */}
      {revisionRequired && (
        <div className="p-4 rounded-xl border border-amber-300 bg-amber-500/10 dark:border-amber-700 dark:bg-amber-950/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-amber-950 dark:text-amber-200 flex items-center gap-1.5">
              <AlertCircle className="h-4 w-4 text-amber-600 shrink-0" />
              <span>Yêu cầu làm bài sửa (Attempt 2)</span>
            </p>
            <p className="text-[11px] text-amber-800 dark:text-amber-300 font-medium">
              Hãy viết lại bài sửa dựa trên nhận xét và gợi ý của giáo viên để khắc phục lỗi.
            </p>
          </div>

          {onStartRevision && (
            <Button
              onClick={onStartRevision}
              disabled={isStartingRevision}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs gap-1.5 rounded-xl shadow-xs shrink-0 self-stretch sm:self-auto"
            >
              {isStartingRevision ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Edit3 className="h-3.5 w-3.5" />
              )}
              <span>Làm bài sửa (Attempt 2)</span>
            </Button>
          )}
        </div>
      )}
    </Card>
  );
}
