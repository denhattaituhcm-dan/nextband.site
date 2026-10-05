import React, { useState } from "react";
import { Sparkles, CheckCircle2, ArrowRight, BookOpen, AlertCircle, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface MicroQuizQuestion {
  id: string;
  category: string;
  skill: string;
  targetLevel: string;
  prompt: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    reason: string;
    bandImpact: string;
  }[];
}

const SAMPLE_QUESTIONS: MicroQuizQuestion[] = [
  {
    id: "writing-task2",
    category: "Writing Task 2",
    skill: "Collocation & Lexical Resource",
    targetLevel: "Band 6.0 → 7.0+",
    prompt: "Chọn cách nâng cấp câu sau để đạt tiêu chuẩn diễn đạt học thuật tự nhiên (C1):",
    options: [
      {
        id: "a",
        text: "Investing in green energy brings many good results for people.",
        isCorrect: false,
        reason: "Cụm 'brings many good results' là văn nói dịch thô (word-by-word), chỉ ở mức Band 5.5 - 6.0.",
        bandImpact: "Mức trần 6.0 Lexical Resource",
      },
      {
        id: "b",
        text: "Allocating funds to renewable energy yields profound societal benefits.",
        isCorrect: true,
        reason: "Sử dụng collocation học thuật chuẩn C1 ('yield benefits', 'renewable energy') tự nhiên, mạch lạc.",
        bandImpact: "Mở khóa Band 7.0+ Lexical Resource",
      },
      {
        id: "c",
        text: "Government must do investment in clean power to make life better.",
        isCorrect: false,
        reason: "Lỗi kết hợp từ vựng 'do investment' (thay vì make/allocate) và văn phong chưa đạt tính khách quan.",
        bandImpact: "Lỗi dùng từ sơ cấp (Band 5.0)",
      },
    ],
  },
  {
    id: "reading-trap",
    category: "Reading Trap",
    skill: "Distractor & Paraphrasing",
    targetLevel: "Band 6.5 → 7.5+",
    prompt: "Đoạn văn: 'The council barely endorsed the proposal.' — Nhận định nào chuẩn xác nhất?",
    options: [
      {
        id: "a",
        text: "Hội đồng hoàn toàn đồng thuận và phê duyệt đề xuất.",
        isCorrect: false,
        reason: "Bẫy từ phủ định bán phần: 'barely' có nghĩa là hầu như không/rất miễn cưỡng, không phải hoàn toàn.",
        bandImpact: "Bẫy Overlooking Negation (Thường mất 0.5 Band)",
      },
      {
        id: "b",
        text: "Hội đồng hầu như không tán thành (hoặc chỉ phê duyệt trong gang tấc).",
        isCorrect: true,
        reason: "Nắm vững bản chất sắc thái nghĩa của trạng từ giới hạn 'barely' giúp tránh bẫy True/False/Not Given.",
        bandImpact: "Chuẩn xác tư duy Reading Band 7.5+",
      },
    ],
  },
];

interface HeroDiagnosticHookProps {
  onStartFullAssessment?: () => void;
}

export function HeroDiagnosticHook({ onStartFullAssessment }: HeroDiagnosticHookProps) {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const currentQ = SAMPLE_QUESTIONS[activeTab];
  const selectedObj = currentQ.options.find((o) => o.id === selectedOption);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    setSelectedOption(null);
  };

  return (
    <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl border-2 border-white/90 bg-card/95 backdrop-blur-md p-6 sm:p-7 shadow-xl shadow-blue-950/5 space-y-4 text-left transition-all">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-border/70 pb-3.5">
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-brand-blue font-extrabold">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>Thử Nghiệm Chẩn Đoán 30s</span>
          </div>
          <h4 className="font-black text-foreground text-base sm:text-lg">
            Bóc Tách Tư Duy Ngôn Ngữ
          </h4>
        </div>
        <span className="px-2.5 py-1 rounded-xl bg-brand-red/10 text-brand-red border border-brand-red/20 text-[11px] font-black uppercase tracking-wider">
          ARIS Diagnostic
        </span>
      </div>

      {/* Tabs Switcher */}
      <div className="flex p-1 bg-slate-100 rounded-xl gap-1 text-xs font-bold text-slate-600">
        {SAMPLE_QUESTIONS.map((q, idx) => (
          <button
            key={q.id}
            type="button"
            onClick={() => handleTabChange(idx)}
            className={cn(
              "flex-1 py-1.5 px-2.5 rounded-lg transition-all text-center",
              activeTab === idx
                ? "bg-white text-foreground shadow-xs font-extrabold"
                : "hover:text-foreground"
            )}
          >
            {q.category}
          </button>
        ))}
      </div>

      {/* Question Prompt */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[11px] text-muted-foreground font-semibold">
          <span>Kỹ năng: <strong className="text-foreground">{currentQ.skill}</strong></span>
          <span className="text-brand-blue font-bold">{currentQ.targetLevel}</span>
        </div>
        <p className="text-xs sm:text-sm font-semibold text-foreground leading-snug">
          {currentQ.prompt}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-2 pt-1">
        {currentQ.options.map((opt) => {
          const isSelected = selectedOption === opt.id;
          const showState = selectedOption !== null;

          let btnClass = "border-slate-200/90 bg-background hover:border-brand-blue/40";
          if (showState) {
            if (opt.isCorrect) {
              btnClass = "border-emerald-500 bg-emerald-50/70 text-emerald-950 font-semibold";
            } else if (isSelected && !opt.isCorrect) {
              btnClass = "border-rose-400 bg-rose-50/70 text-rose-950";
            } else {
              btnClass = "border-slate-200/50 bg-background/50 opacity-60";
            }
          }

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setSelectedOption(opt.id)}
              className={cn(
                "w-full p-3 rounded-xl border text-left text-xs sm:text-[13px] leading-relaxed transition-all flex items-start gap-2.5 shadow-2xs group",
                btnClass
              )}
            >
              <span
                className={cn(
                  "w-5 h-5 rounded-md flex items-center justify-center font-mono font-bold text-[11px] shrink-0 mt-0.5 transition-colors",
                  showState && opt.isCorrect
                    ? "bg-emerald-600 text-white"
                    : showState && isSelected && !opt.isCorrect
                    ? "bg-rose-500 text-white"
                    : "bg-slate-100 text-slate-600 group-hover:bg-brand-blue group-hover:text-white"
                )}
              >
                {opt.id.toUpperCase()}
              </span>
              <span className="flex-1">{opt.text}</span>
            </button>
          );
        })}
      </div>

      {/* Real-time Diagnostic Feedback */}
      {selectedObj ? (
        <div
          className={cn(
            "p-3 rounded-xl border space-y-1.5 animate-in fade-in zoom-in-95 duration-200 text-xs",
            selectedObj.isCorrect
              ? "bg-emerald-50/90 border-emerald-300 text-emerald-900"
              : "bg-amber-50/90 border-amber-300 text-amber-900"
          )}
        >
          <div className="flex items-center justify-between font-extrabold text-[11px]">
            <span className="flex items-center gap-1.5">
              {selectedObj.isCorrect ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Chính xác — Tư duy đúng bản chất</span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-3.5 w-3.5 text-amber-600" />
                  <span>Điểm nghẽn cần can thiệp</span>
                </>
              )}
            </span>
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/80 border border-black/10">
              {selectedObj.bandImpact}
            </span>
          </div>
          <p className="leading-relaxed text-[11px] sm:text-xs">
            {selectedObj.reason}
          </p>
        </div>
      ) : (
        <div className="py-2 text-center text-[11px] text-muted-foreground flex items-center justify-center gap-1.5 bg-slate-50/80 rounded-xl border border-dashed border-slate-200">
          <HelpCircle className="h-3.5 w-3.5 text-slate-400" />
          <span>Bấm chọn 1 phương án để xem cơ chế chẩn đoán lỗi của ARIS</span>
        </div>
      )}

      {/* Mini CTA Footer inside Widget */}
      <div className="pt-2 border-t border-border/60 flex items-center justify-between text-xs">
        <span className="text-[11px] text-muted-foreground font-medium">
          Muốn bóc tách 4 kỹ năng của bạn?
        </span>
        <button
          type="button"
          onClick={onStartFullAssessment}
          className="inline-flex items-center gap-1 font-bold text-brand-red hover:underline text-xs"
        >
          <span>Khám phá ngay</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
