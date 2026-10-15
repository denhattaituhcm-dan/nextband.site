import React, { useState } from 'react';
import { SummaryConfig } from '../../types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PenTool, CheckCircle2, ChevronRight, ArrowRight, Languages } from 'lucide-react';

interface SummaryStepProps {
  summary: SummaryConfig;
  onComplete: (score: number, answers: string[]) => void;
}

export const SummaryStep: React.FC<SummaryStepProps> = ({ summary, onComplete }) => {
  const [blankAnswers, setBlankAnswers] = useState<string[]>(
    new Array(summary.correctAnswers.length).fill('')
  );
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showVietnamese, setShowVietnamese] = useState(false);

  const handleWordSelect = (word: string) => {
    if (isSubmitted) return;
    setSelectedWord(selectedWord === word ? null : word);
  };

  const handleBlankClick = (blankIdx: number) => {
    if (isSubmitted) return;
    if (selectedWord) {
      const next = [...blankAnswers];
      next[blankIdx] = selectedWord;
      setBlankAnswers(next);
      setSelectedWord(null);
    } else {
      // Clear blank
      const next = [...blankAnswers];
      next[blankIdx] = '';
      setBlankAnswers(next);
    }
  };

  const calculateScore = () => {
    let score = 0;
    summary.correctAnswers.forEach((ans, idx) => {
      if (blankAnswers[idx]?.toLowerCase().trim() === ans.toLowerCase().trim()) {
        score++;
      }
    });
    return score;
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleContinue = () => {
    onComplete(calculateScore(), blankAnswers);
  };

  const allFilled = blankAnswers.every((ans) => Boolean(ans));
  const score = calculateScore();

  // Render text segments
  const parts = summary.passageTemplate.split(/\[BLANK_\d+\]/);

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-100 dark:border-emerald-900/60 rounded-3xl p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <PenTool className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Unit Summary
              </h2>
              <p className="text-sm text-muted-foreground">
                Fill in the blanks with the correct words to summarize the reading.
              </p>
            </div>
          </div>

          {isSubmitted && (
            <div className="text-right">
              <span className="text-xs uppercase font-bold tracking-wider text-muted-foreground">Score</span>
              <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                {score} / {summary.correctAnswers.length}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Word Bank Chips */}
      <Card className="border border-border/70 rounded-3xl overflow-hidden shadow-xs">
        <CardContent className="p-5">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
            Target Word Bank:
          </span>
          <div className="flex flex-wrap gap-2.5">
            {summary.wordBank.map((word) => {
              const isUsed = blankAnswers.includes(word);
              const isSelected = selectedWord === word;

              return (
                <button
                  key={word}
                  type="button"
                  disabled={isSubmitted}
                  onClick={() => handleWordSelect(word)}
                  className={`px-4 py-2 rounded-2xl border text-sm font-semibold transition-all ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-600 scale-105 shadow-sm'
                      : isUsed
                      ? 'opacity-40 border-dashed bg-muted line-through'
                      : 'hover:border-emerald-400 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30'
                  }`}
                >
                  {word}
                </button>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground mt-3 italic">
            💡 Tap a word above, then tap a blank line below to place it.
          </p>
        </CardContent>
      </Card>

      {/* Interactive Passage Card */}
      <Card className="border border-border/70 rounded-3xl overflow-hidden shadow-xs">
        <CardContent className="p-6 sm:p-8 space-y-4">
          <div className="text-base sm:text-lg leading-loose font-serif text-foreground/90">
            {parts.map((textPart, idx) => {
              if (idx === parts.length - 1) {
                return <span key={idx}>{textPart}</span>;
              }

              const userVal = blankAnswers[idx];
              const isCorrect = userVal?.toLowerCase() === summary.correctAnswers[idx].toLowerCase();

              let blankStyle = 'bg-muted/80 border-dashed border-sky-400 text-sky-700 dark:text-sky-300';
              if (isSubmitted) {
                blankStyle = isCorrect
                  ? 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold'
                  : 'bg-rose-100 border-rose-500 text-rose-900 font-bold line-through';
              } else if (userVal) {
                blankStyle = 'bg-sky-100 border-sky-500 text-sky-900 font-bold';
              }

              return (
                <React.Fragment key={idx}>
                  <span>{textPart}</span>
                  <button
                    type="button"
                    onClick={() => handleBlankClick(idx)}
                    disabled={isSubmitted}
                    className={`inline-flex items-center justify-center min-w-[90px] px-3 py-1 mx-1.5 rounded-xl border-2 text-sm transition-all font-sans ${blankStyle}`}
                  >
                    {userVal || `(${idx + 1}) _____`}
                  </button>
                  {isSubmitted && !isCorrect && (
                    <span className="text-xs font-bold text-emerald-600 font-sans mx-1">
                      [{summary.correctAnswers[idx]}]
                    </span>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Vietnamese Translation Toggle */}
          {summary.vietnameseTranslation && (
            <div className="pt-4 border-t">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowVietnamese(!showVietnamese)}
                className="text-xs rounded-xl"
              >
                <Languages className="w-3.5 h-3.5 mr-1" />
                {showVietnamese ? 'Hide Translation' : 'View Vietnamese Translation'}
              </Button>

              {showVietnamese && (
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground p-3 bg-muted/40 rounded-xl leading-relaxed animate-in fade-in">
                  {summary.vietnameseTranslation}
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="pt-4 flex justify-end">
        {!isSubmitted ? (
          <Button
            type="button"
            disabled={!allFilled}
            onClick={handleSubmit}
            className="rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-5 shadow-lg shadow-emerald-600/20"
          >
            Check Summary
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleContinue}
            className="rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-5 shadow-lg shadow-teal-600/20"
          >
            Continue to Listening & Dictation
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
};
