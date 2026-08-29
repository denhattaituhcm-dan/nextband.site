import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Swords,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Trophy,
} from "lucide-react";
import { QuestionTypeStat } from "@/lib/objectiveEvidenceAggregator";
import { cn } from "@/lib/utils";

interface QuestionTypeRevengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  typeStat: QuestionTypeStat | null;
}

interface PracticeQuestion {
  id: string;
  questionText: string;
  passageSnippet?: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

// Sample transfer practice bank for common question types
const SAMPLE_REVENGE_BANKS: Record<string, PracticeQuestion[]> = {
  true_false_not_given: [
    {
      id: "rev-tf-1",
      passageSnippet: "The British Library houses over 170 million items from many countries, in many languages and in many formats.",
      questionText: "The British Library exclusively contains items originating from the United Kingdom.",
      options: ["TRUE", "FALSE", "NOT GIVEN"],
      correctAnswer: "FALSE",
      explanation: "Bài đọc nêu rõ thư viện chứa tư liệu 'from many countries', do đó khẳng định chỉ chứa đồ từ UK ('exclusively') là FALSE.",
    },
    {
      id: "rev-tf-2",
      passageSnippet: "Studies show that moderate coffee consumption may lower the risk of several chronic diseases.",
      questionText: "Coffee consumption eliminates the possibility of heart disease.",
      options: ["TRUE", "FALSE", "NOT GIVEN"],
      correctAnswer: "FALSE",
      explanation: "'May lower risk' (có thể giảm nguy cơ) trái ngược hoàn toàn với 'eliminates possibility' (loại bỏ hoàn toàn khả năng).",
    },
    {
      id: "rev-tf-3",
      passageSnippet: "The construction of the Sydney Opera House began in March 1959 and was completed in 1973.",
      questionText: "The architect received a major international award in 1970.",
      options: ["TRUE", "FALSE", "NOT GIVEN"],
      correctAnswer: "NOT GIVEN",
      explanation: "Bài đọc chỉ nói về thời gian xây dựng (1959-1973), hoàn toàn không nhắc đến việc kiến trúc sư có nhận giải thưởng năm 1970 hay không.",
    },
    {
      id: "rev-tf-4",
      passageSnippet: "Solar panels convert sunlight directly into electricity using the photovoltaic effect.",
      questionText: "Photovoltaic technology enables the direct transformation of solar energy into electrical power.",
      options: ["TRUE", "FALSE", "NOT GIVEN"],
      correctAnswer: "TRUE",
      explanation: "Đây là câu paraphrase chuẩn xác: 'convert sunlight directly into electricity' = 'transformation of solar energy into electrical power'.",
    },
  ],
  matching_headings: [
    {
      id: "rev-hd-1",
      passageSnippet: "In recent years, urban planners have increasingly prioritized green spaces. Parks and rooftop gardens not only reduce the urban heat island effect but also improve residents' mental well-being and encourage physical activities.",
      questionText: "Chọn tiêu đề phù hợp nhất cho đoạn văn trên:",
      options: [
        "The multifaceted benefits of urban green spaces",
        "The financial costs of maintaining rooftop gardens",
        "How climate change threatens city infrastructure",
        "A historical review of urban planning in Europe",
      ],
      correctAnswer: "The multifaceted benefits of urban green spaces",
      explanation: "Đoạn văn liệt kê nhiều lợi ích: giảm nhiệt độ đô thị, nâng cao sức khỏe tinh thần, khuyến khích vận động (multifaceted benefits).",
    },
    {
      id: "rev-hd-2",
      passageSnippet: "Despite the widespread adoption of automation in manufacturing, human supervision remains indispensable. Workers are required to handle unexpected software glitches, perform delicate maintenance, and make ethical quality-control decisions.",
      questionText: "Chọn tiêu đề phù hợp nhất cho đoạn văn trên:",
      options: [
        "The complete obsolescence of manual labor",
        "The enduring necessity of human oversight in automated industries",
        "Training procedures for industrial robots",
        "Ethical dilemmas in computer programming",
      ],
      correctAnswer: "The enduring necessity of human oversight in automated industries",
      explanation: "Ý chính của đoạn là dù tự động hóa phát triển, sự giám sát của con người vẫn là không thể thiếu (enduring necessity of human oversight).",
    },
    {
      id: "rev-hd-3",
      passageSnippet: "Global supply chains are vulnerable to unexpected bottlenecks. Natural disasters, geopolitical friction, and port congestion can disrupt the flow of essential components, forcing companies to hold larger inventory reserves.",
      questionText: "Chọn tiêu đề phù hợp nhất cho đoạn văn trên:",
      options: [
        "Key vulnerabilities and disruptions in international logistics",
        "Why just-in-time manufacturing is always optimal",
        "The history of maritime navigation",
        "How natural disasters decrease product demand",
      ],
      correctAnswer: "Key vulnerabilities and disruptions in international logistics",
      explanation: "Đoạn văn nêu bật các yếu tố gây tắc nghẽn và tính dễ bị tổn thương của chuỗi cung ứng toàn cầu.",
    },
    {
      id: "rev-hd-4",
      passageSnippet: "Language acquisition in early childhood occurs with astonishing rapidity. By listening to caregivers and interacting with their environment, infants map complex grammatical rules without formal instruction.",
      questionText: "Chọn tiêu đề phù hợp nhất cho đoạn văn trên:",
      options: [
        "Natural and effortless language development in infants",
        "Formal grammatical training for preschool teachers",
        "The differences between adult and child memory",
        "Speech therapy techniques for toddlers",
      ],
      correctAnswer: "Natural and effortless language development in infants",
      explanation: "Đoạn văn mô tả quá trình học ngôn ngữ tự nhiên, không cần giảng dạy chính thức của trẻ nhỏ.",
    },
  ],
};

export function QuestionTypeRevengeModal({
  isOpen,
  onClose,
  typeStat,
}: QuestionTypeRevengeModalProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!typeStat) return null;

  const questions =
    SAMPLE_REVENGE_BANKS[typeStat.questionType] ||
    SAMPLE_REVENGE_BANKS["true_false_not_given"];

  const handleSelect = (qId: string, value: string) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id]?.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()) {
        correct++;
      }
    });
    return correct;
  };

  const correctCount = calculateScore();
  const isMastered = isSubmitted && correctCount >= 3;

  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-6 font-sans">
        <DialogHeader className="space-y-1 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300">
              <Swords className="h-5 w-5" />
            </div>
            <DialogTitle className="text-base font-extrabold text-slate-900 dark:text-slate-100">
              Phục Thù Kỹ Năng — Dạng Bài: {typeStat.labelVi}
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs text-slate-500">
            Luyện tập 4 câu hỏi chuyển giao (Transfer Practice) cùng dạng bài để phá vỡ điểm yếu và mở khóa thành tựu làm chủ dạng bài.
          </DialogDescription>
        </DialogHeader>

        {/* RESULTS CELEBRATION (AFTER SUBMIT) */}
        {isSubmitted && (
          <div
            className={cn(
              "p-4 rounded-xl border text-center space-y-2 animate-in fade-in zoom-in-95 duration-200",
              isMastered
                ? "bg-emerald-50 border-emerald-300 text-emerald-950 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-200"
                : "bg-amber-50 border-amber-300 text-amber-950 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-200"
            )}
          >
            <div className="flex items-center justify-center gap-1.5 text-base font-black">
              {isMastered ? (
                <>
                  <Trophy className="h-5 w-5 text-emerald-600 animate-bounce" />
                  <span>XUẤT SẮC! ĐÃ LÀM CHỦ DẠNG BÀI ({correctCount}/4 CÂU ĐÚNG)</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 text-amber-600" />
                  <span>KẾT QUẢ: {correctCount}/4 CÂU ĐÚNG — CỐ GẮNG THÊM MỘT CHÚT!</span>
                </>
              )}
            </div>
            <p className="text-xs">
              {isMastered
                ? "Bạn đã chứng minh khả năng phản xạ và xử lý bẫy của dạng bài này rất vững vàng. Tiến độ Mastery đã được cập nhật!"
                : "Hãy đọc kỹ phần giải thích chi tiết phía dưới để hiểu sâu bẫy ngữ cảnh trước khi thử lại."}
            </p>
          </div>
        )}

        {/* QUESTIONS LIST */}
        <div className="space-y-4 py-2">
          {questions.map((q, idx) => {
            const studentAns = selectedAnswers[q.id];
            const isCorrect = isSubmitted && studentAns?.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();
            const isWrong = isSubmitted && !isCorrect;

            return (
              <div
                key={q.id}
                className={cn(
                  "p-4 rounded-xl border space-y-3 transition-all",
                  isCorrect
                    ? "bg-emerald-50/40 border-emerald-300 dark:bg-emerald-950/20 dark:border-emerald-800"
                    : isWrong
                    ? "bg-rose-50/40 border-rose-300 dark:bg-rose-950/20 dark:border-rose-800"
                    : "bg-slate-50/60 border-slate-200 dark:bg-slate-800/40 dark:border-slate-700"
                )}
              >
                {/* Passage Snippet */}
                {q.passageSnippet && (
                  <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs italic text-slate-700 dark:text-slate-300 leading-relaxed">
                    "{q.passageSnippet}"
                  </div>
                )}

                {/* Question Prompt */}
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-relaxed">
                    {q.questionText}
                  </p>
                </div>

                {/* Options Radio */}
                <RadioGroup
                  value={studentAns || ""}
                  onValueChange={(val) => handleSelect(q.id, val)}
                  className="space-y-1.5 pl-7"
                >
                  {q.options.map((opt) => {
                    const isOptionSelected = studentAns === opt;
                    const isOptionCorrect = isSubmitted && opt === q.correctAnswer;
                    const isOptionWrongSelected = isSubmitted && isOptionSelected && opt !== q.correctAnswer;

                    return (
                      <div
                        key={opt}
                        onClick={() => handleSelect(q.id, opt)}
                        className={cn(
                          "flex items-center gap-2 p-2 rounded-lg text-xs font-medium cursor-pointer border transition-all",
                          isOptionCorrect
                            ? "bg-emerald-100 text-emerald-950 border-emerald-400 font-bold"
                            : isOptionWrongSelected
                            ? "bg-rose-100 text-rose-950 border-rose-400 line-through"
                            : isOptionSelected
                            ? "bg-orange-100 text-orange-950 border-orange-400 font-bold"
                            : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                        )}
                      >
                        <RadioGroupItem value={opt} id={`${q.id}-${opt}`} disabled={isSubmitted} />
                        <Label htmlFor={`${q.id}-${opt}`} className="cursor-pointer flex-1 text-xs">
                          {opt}
                        </Label>
                        {isOptionCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                        {isOptionWrongSelected && <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />}
                      </div>
                    );
                  })}
                </RadioGroup>

                {/* Explanation after submit */}
                {isSubmitted && (
                  <div className="text-[11px] bg-white/90 dark:bg-slate-900/90 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 leading-relaxed">
                    <span className="font-bold text-blue-700 dark:text-blue-400">💡 Phân tích đáp án: </span>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* FOOTER ACTIONS */}
        <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            className="text-xs text-slate-500 hover:text-slate-800"
          >
            Đóng lại
          </Button>

          <div className="flex items-center gap-2">
            {isSubmitted ? (
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                className="text-xs font-bold gap-1.5 border-slate-300"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Luyện tập lại
              </Button>
            ) : (
              <Button
                type="button"
                onClick={() => setIsSubmitted(true)}
                disabled={Object.keys(selectedAnswers).length === 0}
                className="bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs px-5 shadow-xs gap-1.5"
              >
                <span>Kiểm Tra Kết Quả</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
