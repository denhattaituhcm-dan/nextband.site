import React, { useState } from 'react';
import { PreReadingConfig } from '../../types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Lightbulb, 
  Eye, 
  CheckCircle, 
  ChevronRight, 
  MessageSquareQuote,
  Sparkles,
  HelpCircle
} from 'lucide-react';

interface PreReadingStepProps {
  config: PreReadingConfig;
  onComplete: () => void;
}

export const PreReadingStep: React.FC<PreReadingStepProps> = ({ config, onComplete }) => {
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  const handleToggleAnswer = (id: string) => {
    setRevealedAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleRevealAll = () => {
    const all: Record<string, boolean> = {};
    config.questions.forEach((q) => {
      all[q.id] = true;
    });
    setRevealedAnswers(all);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Intro Header Card */}
      <div className="bg-gradient-to-br from-sky-50 via-indigo-50/50 to-amber-50/40 dark:from-slate-900 dark:via-sky-950/40 dark:to-indigo-950/30 border border-sky-100 dark:border-sky-900/60 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold shadow-xs">
            <MessageSquareQuote className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Warm-up & Pre-Reading
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Quan sát hình ảnh và suy ngẫm các câu hỏi thảo luận trước khi đọc bài.
            </p>
          </div>
        </div>

        <p className="text-sm sm:text-base text-foreground/85 leading-relaxed font-medium mt-4">
          {config.introPrompt}
        </p>

        {config.imageUrl && (
          <div className="mt-5 overflow-hidden rounded-2xl border border-sky-200/60 dark:border-sky-800/50 shadow-md group">
            <img
              src={config.imageUrl}
              alt="Pre-reading visual"
              className="w-full h-56 sm:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {config.imageCaption && (
              <div className="bg-background/90 backdrop-blur px-4 py-2 text-xs text-muted-foreground border-t">
                📷 {config.imageCaption}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Discussion Questions Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-foreground flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>Think & Discuss Questions</span>
          </h3>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleRevealAll}
            className="text-xs text-muted-foreground hover:text-foreground h-8 rounded-xl"
          >
            <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-500" />
            Xem tất cả gợi ý mẫu
          </Button>
        </div>

        <div className="space-y-3.5">
          {config.questions.map((q, idx) => {
            const isRevealed = revealedAnswers[q.id];

            return (
              <Card
                key={q.id}
                className="border-border/70 hover:border-sky-300/80 transition-all shadow-xs rounded-2xl overflow-hidden"
              >
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-start gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-sm sm:text-base font-semibold text-foreground leading-snug">
                          {q.question}
                        </p>
                      </div>

                      {q.hint && (
                        <p className="text-xs text-muted-foreground pl-8 italic">
                          💡 Gợi ý tư duy: {q.hint}
                        </p>
                      )}
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleAnswer(q.id)}
                      className={`shrink-0 text-xs h-8 rounded-xl border-dashed transition-colors ${
                        isRevealed ? 'bg-muted text-foreground' : 'text-sky-600 hover:text-sky-700'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5 mr-1" />
                      {isRevealed ? 'Ẩn câu trả lời' : 'Xem câu trả lời mẫu'}
                    </Button>
                  </div>

                  {isRevealed && (
                    <div className="mt-3 ml-8 p-3.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs sm:text-sm text-emerald-950 dark:text-emerald-200 animate-in fade-in slide-in-from-top-2">
                      <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">
                        Câu trả lời mẫu & Ý tưởng (Sample Answer):
                      </span>
                      <p className="leading-relaxed font-serif italic text-foreground/90">
                        "{q.sampleAnswer}"
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Step Completion Action */}
      <div className="pt-4 flex justify-end">
        <Button
          type="button"
          onClick={onComplete}
          className="rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-semibold px-6 py-5 shadow-lg shadow-sky-600/20"
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          Tiếp tục sang Vocab Preview (Step 2)
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};
