import React, { useState } from 'react';
import { VocabPreviewConfig } from '../../types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, CheckCircle2, ChevronRight, XCircle, ArrowRight, RefreshCcw } from 'lucide-react';

interface VocabPreviewStepProps {
  config: VocabPreviewConfig;
  onComplete: (score: number, answers: Record<string, string>) => void;
}

export const VocabPreviewStep: React.FC<VocabPreviewStepProps> = ({ config, onComplete }) => {
  const [userMatches, setUserMatches] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelectLetter = (itemId: string, letter: string) => {
    if (isSubmitted) return;
    setUserMatches((prev) => ({ ...prev, [itemId]: letter }));
  };

  const calculateScore = () => {
    let count = 0;
    config.items.forEach((item) => {
      if (userMatches[item.id]?.toLowerCase() === item.correctDefinitionLetter.toLowerCase()) {
        count++;
      }
    });
    return count;
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleContinue = () => {
    const score = calculateScore();
    onComplete(score, userMatches);
  };

  const allSelected = config.items.every((item) => userMatches[item.id]);
  const score = calculateScore();

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500/10 via-sky-500/10 to-indigo-500/10 border border-sky-100 dark:border-sky-900/60 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Vocabulary Preview (Matching)
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                {config.instruction}
              </p>
            </div>
          </div>

          {isSubmitted && (
            <div className="text-right">
              <span className="text-xs uppercase font-bold tracking-wider text-muted-foreground">Score</span>
              <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                {score} / {config.items.length}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Target Definitions Key Box (a to f) */}
      <Card className="border border-sky-200/60 dark:border-sky-900/40 bg-sky-50/40 dark:bg-sky-950/20 rounded-3xl overflow-hidden">
        <CardContent className="p-5">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-800 dark:text-sky-300 block mb-3">
            Available Definitions & Synonyms:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {config.definitions.map((def) => (
              <div
                key={def.letter}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-background/80 border text-xs sm:text-sm font-medium"
              >
                <span className="w-6 h-6 rounded-lg bg-sky-100 text-sky-800 dark:bg-sky-900/60 dark:text-sky-300 font-bold flex items-center justify-center shrink-0 uppercase">
                  {def.letter}
                </span>
                <span className="text-foreground/90">{def.text}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 6 Sentences with Underlined Target Words */}
      <div className="space-y-3.5">
        {config.items.map((item, idx) => {
          const selectedLetter = userMatches[item.id];
          const isCorrect = selectedLetter?.toLowerCase() === item.correctDefinitionLetter.toLowerCase();

          // Render sentence with clear underline badge
          const sentenceParts = item.sentenceWithUnderline.split(item.underlinedWord);

          return (
            <Card
              key={item.id}
              className={`rounded-2xl border transition-all ${
                isSubmitted
                  ? isCorrect
                    ? 'border-emerald-500/60 bg-emerald-50/20 dark:bg-emerald-950/20'
                    : 'border-rose-400/60 bg-rose-50/20 dark:bg-rose-950/20'
                  : 'hover:border-sky-300'
              }`}
            >
              <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1 flex-1">
                  <div className="flex items-start gap-2.5 text-sm sm:text-base font-medium text-foreground">
                    <span className="text-xs font-bold text-muted-foreground mt-1 shrink-0">
                      {idx + 1}.
                    </span>
                    <p className="leading-relaxed">
                      {sentenceParts[0]}
                      <span className="font-bold text-sky-600 dark:text-sky-400 underline decoration-sky-500 decoration-2 underline-offset-4">
                        {item.underlinedWord}
                      </span>
                      {sentenceParts[1]}
                    </p>
                  </div>

                  {item.vietnameseMeaning && (
                    <p className="text-xs text-muted-foreground pl-6 italic">
                      🇻🇳 Nghĩa: {item.vietnameseMeaning}
                    </p>
                  )}
                </div>

                {/* Letter Selection Chips */}
                <div className="flex items-center gap-1.5 shrink-0 pl-6 sm:pl-0">
                  {config.definitions.map((def) => {
                    const isLetterActive = selectedLetter === def.letter;
                    let chipStyle = 'border-border/60 hover:border-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/40';

                    if (isSubmitted) {
                      if (def.letter === item.correctDefinitionLetter) {
                        chipStyle = 'bg-emerald-600 text-white border-emerald-600 font-bold';
                      } else if (isLetterActive && !isCorrect) {
                        chipStyle = 'bg-rose-500 text-white border-rose-500 line-through';
                      } else {
                        chipStyle = 'opacity-40';
                      }
                    } else if (isLetterActive) {
                      chipStyle = 'bg-sky-600 text-white border-sky-600 font-bold shadow-xs';
                    }

                    return (
                      <button
                        key={def.letter}
                        type="button"
                        disabled={isSubmitted}
                        onClick={() => handleSelectLetter(item.id, def.letter)}
                        className={`w-8 h-8 rounded-xl border text-xs uppercase font-bold flex items-center justify-center transition-all ${chipStyle}`}
                      >
                        {def.letter}
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="pt-4 flex justify-end">
        {!isSubmitted ? (
          <Button
            type="button"
            disabled={!allSelected}
            onClick={handleSubmit}
            className="rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-semibold px-6 py-5 shadow-lg shadow-sky-600/20"
          >
            Check Matching Answers
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleContinue}
            className="rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-5 shadow-lg shadow-emerald-600/20"
          >
            Continue to Reading Passage
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
};
