import React from "react";
import { Headphones, Clock, Bookmark } from "lucide-react";
import { AssessmentQuestion } from "../domain/assessment.types";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FillBlankHtmlRenderer, hasFillBlankPlaceholders } from "@/components/exam/FillBlankHtmlRenderer";
import { AcademicAudioPlayer } from "./AcademicAudioPlayer";
import { sanitizeHtml } from "@/lib/sanitize";

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
      {/* Audio Player Card with Academic Waveform */}
      <Card className="rounded-3xl border border-border/80 bg-gradient-to-b from-card via-card to-muted/20 shadow-sm shadow-black/5 overflow-hidden">
        <CardContent className="p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-blue to-blue-700 text-white flex items-center justify-center shadow-md shadow-brand-blue/20">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-foreground">Listening</h3>
                <p className="text-xs text-muted-foreground">
                  Nghe đoạn audio và trả lời các câu hỏi bên dưới (Audio phát 1 lần theo tiến độ)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-brand-blue/10 text-brand-blue border border-brand-blue/20">
                <Clock className="w-3 h-3" />
                Gợi ý: ~10 phút
              </span>
              <span className="hidden sm:inline-block px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-600 border border-amber-500/20">
                Không tua
              </span>
              <Badge variant="outline" className="text-xs font-bold bg-background">
                {totalItemCount} Câu hỏi
              </Badge>
            </div>
          </div>

          {/* High Fidelity Academic Audio Player */}
          <AcademicAudioPlayer audioUrl={audioUrl} />
        </CardContent>
      </Card>

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
                        value={typeof answers?.[q.id] === "string" ? answers[q.id] : ""}
                        onChange={(e) => onAnswerChange(q.id, e.target.value)}
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

