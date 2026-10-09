import React from "react";
import { Bookmark } from "lucide-react";
import { AssessmentQuestion } from "../domain/assessment.types";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FillBlankHtmlRenderer, hasFillBlankPlaceholders } from "@/components/exam/FillBlankHtmlRenderer";
import { AcademicAudioPlayer } from "./AcademicAudioPlayer";
import { sanitizeHtml } from "@/lib/sanitize";
import { handleShortAnswerKeyDown } from "@/lib/shortAnswerNavigation";

interface ListeningPanelProps {
  title: string;
  audioUrl: string;
  questions: AssessmentQuestion[];
  answers: Record<string, any>;
  onAnswerChange: (questionId: string, value: any) => void;
  flaggedQuestions?: Set<string>;
  onToggleFlag?: (questionId: string) => void;
}

const cleanSectionTag = (title?: string) => {
  if (!title) return null;
  let clean = title.trim();
  clean = clean.replace(/^(Kỹ\s+năng\s+)?(Đọc\s+hiểu|Đọc|Nghe|Viết|Nói)\s*(\([^)]*\))?:?\s*/i, "");
  clean = clean.replace(/^(Hiểu|Reading|Listening|Grammar|Writing|Speaking)\s*(\([^)]*\))?:?\s*/i, "");
  clean = clean.replace(/\(?(Reading|Listening|Grammar|Writing|Speaking)\)?/gi, "");
  clean = clean.replace(/^(Ngữ\s+pháp\s*(&|và)?\s*Từ\s+vựng)\s*(\([^)]*\))?:?\s*/i, "");
  clean = clean.replace(/^(Chẩn\s+đoán\s+Ngữ\s+pháp\s*(&|và)?\s*Từ\s+vựng)\s*(\([^)]*\))?:?\s*/i, "");
  clean = clean.replace(/\s+/g, " ").trim();
  if (!clean || /^(Đọc\s*hiểu|Đọc|Hiểu|Nghe|Viết|Nói|Listening|Reading|Grammar|Writing|Speaking)$/i.test(clean)) {
    return null;
  }
  return clean;
};

export function ListeningPanel({
  title,
  audioUrl,
  questions,
  answers,
  onAnswerChange,
  flaggedQuestions,
  onToggleFlag,
}: ListeningPanelProps) {
  const totalItemCount = questions.reduce(
    (acc, q) => acc + (q.blankCount && q.blankCount > 1 ? q.blankCount : 1),
    0,
  );

  return (
    <div className="w-full space-y-6">
      {/* High Fidelity Academic Audio Player */}
      <AcademicAudioPlayer audioUrl={audioUrl} />

      {/* Questions List */}
      <div className="space-y-4">
        {questions.map((q) => {
          const promptText = q?.prompt || "";
          const isFillBlankWithSlots = q?.questionType === "fill_blank" && hasFillBlankPlaceholders(promptText);
          const hasHtml = promptText.includes("<") && promptText.includes(">");
          const subTag = cleanSectionTag(q.sectionTitle);
          const isFlagged = flaggedQuestions?.has(q.id);

          return (
            <div
              key={q.id}
              id={`question-${q.id}`}
              className="p-5 sm:p-6 rounded-3xl bg-card border border-border space-y-3.5 transition-all shadow-xs"
            >
              <div className="flex items-center justify-between">
                {subTag ? (
                  <span className="text-xs font-bold text-brand-blue uppercase tracking-wide">
                    {subTag}
                  </span>
                ) : (
                  <span />
                )}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-extrabold text-muted-foreground">
                    {q.blankCount && q.blankCount > 1 ? `${q.blankCount} chỗ trống • ` : ""}Câu {q.orderIndex || 1}
                  </span>
                  {onToggleFlag && (
                    <button
                      type="button"
                      onClick={() => onToggleFlag(q.id)}
                      className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        isFlagged
                          ? "bg-amber-500/15 text-amber-600 border border-amber-500/30"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                      title={isFlagged ? "Bỏ cờ đánh dấu xem lại" : "Đánh dấu xem lại câu này (Flag)"}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isFlagged ? "fill-amber-500 text-amber-500" : ""}`} />
                      <span className="text-[11px]">{isFlagged ? "Đã gắn cờ" : "Cờ"}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Rich FillBlank HTML Slot Renderer */}
              {isFillBlankWithSlots ? (
                <div className="pt-1">
                  <FillBlankHtmlRenderer
                    html={promptText}
                    answers={typeof answers?.[q.id] === "object" ? answers[q.id] || {} : {}}
                    questionId={q.id}
                    startNumber={q.orderIndex || 1}
                    onAnswerChange={onAnswerChange}
                  />
                </div>
              ) : (
                <>
                  {hasHtml ? (
                    <div
                      className="text-sm sm:text-base font-bold text-foreground leading-relaxed prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: sanitizeHtml(promptText) }}
                    />
                  ) : (
                    <p className="text-sm sm:text-base font-bold text-foreground leading-relaxed">
                      {promptText}
                    </p>
                  )}

                  {/* Multiple Choice Options */}
                  {(q.questionType === "multiple_choice" || q.questionType === "true_false_not_given") && Array.isArray(q.options) && q.options.length > 0 && (
                    <RadioGroup
                      value={typeof answers?.[q.id] === "string" ? answers[q.id] : ""}
                      onValueChange={(val) => onAnswerChange(q.id, val)}
                      className="space-y-2 pt-1"
                    >
                      {q.options.map((opt, idx) => {
                        const isChecked = answers?.[q.id] === opt;
                        return (
                          <label
                            key={idx}
                            className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all cursor-pointer text-xs sm:text-sm font-medium ${
                              isChecked
                                ? "bg-brand-blue-soft border-brand-blue/60 text-brand-blue font-bold shadow-xs"
                                : "bg-muted/40 border-border hover:bg-muted/70 text-foreground"
                            }`}
                          >
                            <RadioGroupItem value={opt} id={`${q.id}-opt-${idx}`} />
                            <span className="leading-snug">{opt}</span>
                          </label>
                        );
                      })}
                    </RadioGroup>
                  )}

                  {/* Single Fill in the Blank Input */}
                  {q.questionType === "fill_blank" && (
                    <div className="pt-1">
                      <Input
                        data-short-answer-input="true"
                        value={typeof answers?.[q.id] === "string" ? answers[q.id] : ""}
                        onChange={(e) => onAnswerChange(q.id, e.target.value)}
                        onKeyDown={handleShortAnswerKeyDown}
                        placeholder={q.placeholder || "Nhập câu trả lời của bạn..."}
                        className="h-11 rounded-2xl border-border font-medium text-sm focus:border-brand-blue"
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

