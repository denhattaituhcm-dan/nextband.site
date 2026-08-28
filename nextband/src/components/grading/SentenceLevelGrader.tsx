import { useState, useMemo } from "react";
import {
  ErrorCategory,
  SentenceFeedbackItem,
  segmentEssayIntoSentences,
  PRESET_ERROR_TAGS,
  CATEGORY_COLORS,
} from "@/lib/sentenceFeedback";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CheckCircle2,
  Sparkles,
  AlertCircle,
  Trash2,
  Edit3,
  MessageSquare,
  ArrowRight,
  Lightbulb,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SentenceLevelGraderProps {
  essayText: string;
  sentenceFeedbacks: SentenceFeedbackItem[];
  onChange?: (updated: SentenceFeedbackItem[]) => void;
  readOnly?: boolean;
}

export function SentenceLevelGrader({
  essayText,
  sentenceFeedbacks = [],
  onChange,
  readOnly = false,
}: SentenceLevelGraderProps) {
  const sentences = useMemo(() => segmentEssayIntoSentences(essayText), [essayText]);

  const feedbackMap = useMemo(() => {
    const map = new Map<number, SentenceFeedbackItem>();
    sentenceFeedbacks.forEach((item) => {
      map.set(item.sentenceIndex, item);
    });
    return map;
  }, [sentenceFeedbacks]);

  // Dialog state for active sentence being annotated
  const [activeSentenceIndex, setActiveSentenceIndex] = useState<number | null>(null);
  const [category, setCategory] = useState<ErrorCategory>("GRAMMAR");
  const [tag, setTag] = useState<string>(PRESET_ERROR_TAGS.GRAMMAR[0]);
  const [note, setNote] = useState<string>("");
  const [suggestedSentence, setSuggestedSentence] = useState<string>("");

  const handleOpenDialog = (index: number) => {
    const existing = feedbackMap.get(index);
    setActiveSentenceIndex(index);
    if (existing) {
      setCategory(existing.category || "GRAMMAR");
      setTag(existing.tag || PRESET_ERROR_TAGS[existing.category || "GRAMMAR"][0]);
      setNote(existing.note || "");
      setSuggestedSentence(existing.suggestedSentence || "");
    } else {
      setCategory("GRAMMAR");
      setTag(PRESET_ERROR_TAGS.GRAMMAR[0]);
      setNote("");
      setSuggestedSentence("");
    }
  };

  const handleSaveSentenceFeedback = () => {
    if (activeSentenceIndex === null || !onChange) return;

    const originalSentence = sentences[activeSentenceIndex] || "";
    const newItem: SentenceFeedbackItem = {
      sentenceIndex: activeSentenceIndex,
      originalSentence,
      category,
      tag: tag.trim() || PRESET_ERROR_TAGS[category][0],
      note: note.trim(),
      suggestedSentence: suggestedSentence.trim() || undefined,
    };

    const nextList = sentenceFeedbacks.filter(
      (item) => item.sentenceIndex !== activeSentenceIndex
    );
    nextList.push(newItem);
    nextList.sort((a, b) => a.sentenceIndex - b.sentenceIndex);

    onChange(nextList);
    setActiveSentenceIndex(null);
  };

  const handleDeleteSentenceFeedback = () => {
    if (activeSentenceIndex === null || !onChange) return;
    const nextList = sentenceFeedbacks.filter(
      (item) => item.sentenceIndex !== activeSentenceIndex
    );
    onChange(nextList);
    setActiveSentenceIndex(null);
  };

  // Stats
  const categoryCounts = useMemo(() => {
    const counts: Record<ErrorCategory, number> = {
      PRAISE: 0,
      GRAMMAR: 0,
      EXPRESSION: 0,
      STRUCTURE: 0,
      CONCEPT: 0,
      OTHER: 0,
    };
    sentenceFeedbacks.forEach((fb) => {
      if (counts[fb.category] !== undefined) {
        counts[fb.category]++;
      }
    });
    return counts;
  }, [sentenceFeedbacks]);

  if (!essayText || essayText.trim() === "") {
    return (
      <div className="p-4 text-center text-xs text-muted-foreground bg-muted/20 rounded-xl border border-dashed">
        Chưa có nội dung văn bản bài làm.
      </div>
    );
  }

  return (
    <div className="space-y-3 font-sans">
      {/* Header Bar with Action Tip & Summary Badges */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200/80 dark:border-slate-800 text-xs">
        <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
          <Sparkles className="h-3.5 w-3.5 text-primary shrink-0" />
          <span>
            {readOnly
              ? `Đánh giá chi tiết (${sentenceFeedbacks.length} câu có ghi chú):`
              : "Click vào bất kỳ câu nào dưới đây để gắn lỗi hoặc khen câu hay (Praise):"}
          </span>
        </div>

        {/* Category count breakdown */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {sentenceFeedbacks.length === 0 ? (
            <span className="text-[11px] text-muted-foreground italic">
              {readOnly ? "Không có câu nào bị gắn lỗi." : "Chưa gắn ghi chú câu nào (Tất cả câu mặc định đạt yêu cầu)."}
            </span>
          ) : (
            (Object.keys(categoryCounts) as ErrorCategory[]).map((cat) => {
              const count = categoryCounts[cat];
              if (count === 0) return null;
              const color = CATEGORY_COLORS[cat];
              return (
                <Badge
                  key={cat}
                  variant="outline"
                  className={cn("text-[10px] px-1.5 py-0.5 font-semibold", color.badgeBg)}
                >
                  {cat === "PRAISE" ? `🌟 Khen ngợi: ${count}` : `${cat}: ${count}`}
                </Badge>
              );
            })
          )}
        </div>
      </div>

      {/* Interactive Sentence-by-Sentence Reader */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-neutral-950 text-sm leading-relaxed space-y-2">
        <div className="flex flex-wrap gap-x-1.5 gap-y-2 select-text">
          {sentences.map((sentence, idx) => {
            const feedback = feedbackMap.get(idx);
            const isFlagged = !!feedback;
            const categoryStyle = feedback ? CATEGORY_COLORS[feedback.category] : null;

            return (
              <span
                key={idx}
                onClick={() => handleOpenDialog(idx)}
                className={cn(
                  "inline-block rounded-md px-1.5 py-0.5 transition-all cursor-pointer relative group",
                  isFlagged
                    ? cn(
                        "font-medium border shadow-2xs",
                        categoryStyle?.highlightBg,
                        categoryStyle?.border,
                        categoryStyle?.text
                      )
                    : "hover:bg-slate-100 dark:hover:bg-slate-800/80 text-foreground border border-transparent"
                )}
                title={
                  feedback
                    ? `[${feedback.category}] ${feedback.tag}: ${feedback.note}`
                    : readOnly
                    ? ""
                    : "Click để chỉnh sửa / khen ngợi câu này"
                }
              >
                <span className="inline-block">{sentence}</span>

                {/* Number tag for flagged sentences */}
                {isFlagged && (
                  <span
                    className={cn(
                      "ml-1 text-[10px] font-bold px-1 py-0.2 rounded uppercase inline-flex items-center align-baseline",
                      categoryStyle?.badgeBg
                    )}
                  >
                    {feedback.category === "PRAISE" ? "⭐ " : ""}{feedback.tag}
                  </span>
                )}
              </span>
            );
          })}
        </div>
      </div>

      {/* Render feedback card list if in readOnly mode or for easy review */}
      {sentenceFeedbacks.length > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <div className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <span>Tổng hợp câu có ghi chú sửa bài ({sentenceFeedbacks.length}):</span>
          </div>

          <div className="grid gap-2 text-xs">
            {sentenceFeedbacks.map((item) => {
              const color = CATEGORY_COLORS[item.category] || CATEGORY_COLORS.GRAMMAR;
              return (
                <div
                  key={item.sentenceIndex}
                  className={cn(
                    "p-3 rounded-xl border space-y-1.5 transition-all",
                    color.bg,
                    color.border
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className={cn("text-[10px] font-bold", color.badgeBg)}>
                        Câu #{item.sentenceIndex + 1}
                      </Badge>
                      <Badge variant="outline" className="text-[10px] font-bold uppercase">
                        {item.category === "PRAISE" ? "🌟 KHEN NGỢI" : item.category}
                      </Badge>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {item.tag}
                      </span>
                    </div>

                    {!readOnly && (
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => handleOpenDialog(item.sentenceIndex)}
                        className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                      >
                        <Edit3 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>

                  {/* Original sentence quote */}
                  <div className="pl-2 border-l-2 border-slate-300 dark:border-slate-700 text-muted-foreground italic line-clamp-2">
                    "{item.originalSentence}"
                  </div>

                  {/* Teacher Note */}
                  {item.note && (
                    <div className="text-slate-800 dark:text-slate-200 font-medium whitespace-pre-wrap">
                      <strong>{item.category === "PRAISE" ? "Lời khen:" : "Nhận xét:"}</strong> {item.note}
                    </div>
                  )}

                  {/* Suggested Rewrite */}
                  {item.suggestedSentence && (
                    <div className="flex items-start gap-1.5 p-2 rounded-lg bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200 text-xs">
                      <Lightbulb className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <div className="whitespace-pre-wrap">
                        <strong>{item.category === "PRAISE" ? "Gợi ý nâng cao:" : "Gợi ý viết lại:"}</strong> {item.suggestedSentence}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* DIALOG FOR EDITING SENTENCE ANNOTATION */}
      <Dialog
        open={activeSentenceIndex !== null}
        onOpenChange={(open) => {
          if (!open) setActiveSentenceIndex(null);
        }}
      >
        <DialogContent className="sm:max-w-4xl lg:max-w-5xl w-[94vw] max-h-[92vh] overflow-y-auto p-6 sm:p-8 rounded-3xl">
          <DialogHeader className="border-b border-slate-100 pb-3.5">
            <DialogTitle className="text-lg font-black flex items-center gap-2.5 text-slate-900">
              <Edit3 className="h-5 w-5 text-blue-600" />
              {activeSentenceIndex !== null && (
                <span>Chỉnh sửa & Góp ý Câu #{activeSentenceIndex + 1}</span>
              )}
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm text-slate-500">
              Khen ngợi câu viết tốt (Praise) hoặc gắn nhóm lỗi cần sửa và ghi gợi ý câu mẫu cho học sinh.
            </DialogDescription>
          </DialogHeader>

          {activeSentenceIndex !== null && (
            <div className="space-y-5 py-3 font-sans">
              {/* Original sentence banner */}
              <div className="p-4 sm:p-5 bg-slate-50/80 rounded-2xl border border-slate-200 text-sm sm:text-base font-medium text-slate-900 italic leading-relaxed shadow-2xs">
                <span className="font-extrabold text-slate-600 not-italic text-xs uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5 text-blue-600" />
                  Câu gốc của học sinh:
                </span>
                "{sentences[activeSentenceIndex]}"
              </div>

              {/* Error / Praise Category Selector */}
              <div className="space-y-2">
                <Label className="text-xs sm:text-sm font-extrabold text-slate-800">
                  Phân loại nhận xét (Category):
                </Label>
                <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                  <Button
                    type="button"
                    variant={category === "PRAISE" ? "default" : "outline"}
                    size="sm"
                    disabled={readOnly}
                    onClick={() => {
                      setCategory("PRAISE");
                      setTag(PRESET_ERROR_TAGS.PRAISE[0]);
                    }}
                    className={cn(
                      "text-xs sm:text-sm h-9 sm:h-10 font-bold transition-all rounded-xl",
                      category === "PRAISE"
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600 shadow-xs"
                        : "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100"
                    )}
                  >
                    🌟 PRAISE
                  </Button>
                  {(["GRAMMAR", "EXPRESSION", "STRUCTURE", "CONCEPT", "OTHER"] as ErrorCategory[]).map(
                    (cat) => (
                      <Button
                        key={cat}
                        type="button"
                        variant={category === cat ? "default" : "outline"}
                        size="sm"
                        disabled={readOnly}
                        onClick={() => {
                          setCategory(cat);
                          setTag(PRESET_ERROR_TAGS[cat][0]);
                        }}
                        className={cn(
                          "text-xs sm:text-sm h-9 sm:h-10 font-bold transition-all rounded-xl",
                          category === cat
                            ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                        )}
                      >
                        {cat === "OTHER" ? "OTHER" : cat}
                      </Button>
                    )
                  )}
                </div>
              </div>

              {/* Quick Tag Pills */}
              <div className="space-y-2">
                <Label className="text-xs sm:text-sm font-extrabold text-slate-800">
                  {category === "PRAISE" ? "Nhãn khen ngợi / Điểm sáng (Tag):" : "Nhãn lỗi chi tiết (Tag):"}
                </Label>
                <div className="flex flex-wrap gap-2 p-3 border border-slate-200 rounded-2xl bg-slate-50/50">
                  {PRESET_ERROR_TAGS[category].map((presetTag) => (
                    <button
                      key={presetTag}
                      type="button"
                      disabled={readOnly}
                      onClick={() => setTag(presetTag)}
                      className={cn(
                        "text-xs sm:text-sm px-3 py-1.5 rounded-xl border font-medium transition-all text-left",
                        tag === presetTag
                          ? category === "PRAISE"
                            ? "bg-emerald-600 text-white border-emerald-600 font-bold shadow-2xs"
                            : "bg-blue-600 text-white border-blue-600 font-bold shadow-2xs"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                      )}
                    >
                      {presetTag}
                    </button>
                  ))}
                </div>
                <Input
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  placeholder={category === "PRAISE" ? "Hoặc tự gõ nhãn khen khác..." : "Hoặc tự gõ nhãn lỗi khác..."}
                  className="h-9 sm:h-10 text-xs sm:text-sm mt-2 bg-white border-slate-200 rounded-xl"
                  disabled={readOnly}
                />
              </div>

              {/* 2 Cột Rộng Rãi: Ghi chú của GV & Gợi ý viết lại */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
                {/* Teacher Note */}
                <div className="space-y-2">
                  <Label className="text-xs sm:text-sm font-extrabold text-slate-800">
                    {category === "PRAISE" ? "Lời khen & Nhận xét của giáo viên (Praise Note):" : "Ghi chú & Chỉ lỗi của giáo viên (Note):"}
                  </Label>
                  <Textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    onKeyDown={(e) => {
                      e.stopPropagation();
                      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                        e.preventDefault();
                        handleSaveSentenceFeedback();
                      }
                    }}
                    placeholder={
                      category === "PRAISE"
                        ? "Khen ngợi cách dùng từ, cấu trúc nâng cao, lập luận tự nhiên..."
                        : "Chỉ rõ điểm sai hoặc lưu ý ngữ pháp..."
                    }
                    rows={4}
                    className="min-h-[120px] text-xs sm:text-sm border-slate-200 bg-white leading-relaxed focus-visible:ring-1 focus-visible:ring-blue-500 rounded-xl p-3 whitespace-pre-wrap"
                    disabled={readOnly}
                  />
                  <p className="text-[11px] text-slate-400">
                    Mẹo: Nhấn <strong>Enter</strong> để xuống dòng, <strong>Ctrl + Enter</strong> để lưu nhanh.
                  </p>
                </div>

                {/* Suggested Rewrite */}
                <div className="space-y-2">
                  <Label className="text-xs sm:text-sm font-extrabold text-emerald-800 flex items-center gap-1.5">
                    <Lightbulb className="h-4 w-4 text-emerald-600" />
                    <span>
                      {category === "PRAISE"
                        ? "Gợi ý cách viết nâng cao hơn (Optional Upgrade):"
                        : "Gợi ý viết lại câu chuẩn (Suggested Rewrite):"}
                    </span>
                  </Label>
                  <Textarea
                    value={suggestedSentence}
                    onChange={(e) => setSuggestedSentence(e.target.value)}
                    onKeyDown={(e) => {
                      e.stopPropagation();
                      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                        e.preventDefault();
                        handleSaveSentenceFeedback();
                      }
                    }}
                    placeholder={
                      category === "PRAISE"
                        ? "(Tùy chọn) Gợi ý cách diễn đạt band 8.0+ cao cấp hơn..."
                        : "Gõ câu viết lại mẫu để học sinh tham khảo..."
                    }
                    rows={4}
                    className="min-h-[120px] text-xs sm:text-sm border-emerald-300 bg-emerald-50/30 text-slate-900 leading-relaxed focus-visible:ring-1 focus-visible:ring-emerald-500 rounded-xl p-3 whitespace-pre-wrap"
                    disabled={readOnly}
                  />
                  <p className="text-[11px] text-emerald-600/70">
                    Mẹo: Nhấn <strong>Enter</strong> để xuống dòng, <strong>Ctrl + Enter</strong> để lưu nhanh.
                  </p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="flex items-center justify-between gap-2 sm:justify-between pt-4 border-t border-slate-100">
            {feedbackMap.has(activeSentenceIndex || 0) && !readOnly ? (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleDeleteSentenceFeedback}
                className="h-9 sm:h-10 text-xs sm:text-sm gap-1.5 font-semibold rounded-xl"
              >
                <Trash2 className="h-4 w-4" />
                <span>Xóa ghi chú câu này</span>
              </Button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2.5">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setActiveSentenceIndex(null)}
                className="h-9 sm:h-10 text-xs sm:text-sm font-medium text-slate-600 rounded-xl px-4"
              >
                Đóng
              </Button>
              {!readOnly && (
                <Button
                  type="button"
                  size="sm"
                  onClick={handleSaveSentenceFeedback}
                  className="h-9 sm:h-10 text-xs sm:text-sm font-extrabold gap-1.5 bg-blue-600 hover:bg-blue-700 text-white shadow-xs px-6 rounded-xl"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Lưu nhận xét</span>
                </Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
