import React, { useState } from 'react';
import { GrammarConfig } from '../../types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, CheckCircle2, ChevronRight, ArrowRight, BookMarked } from 'lucide-react';

interface GrammarInlineStepProps {
  config: GrammarConfig;
  onComplete: (score: number, answers: Record<string, string>) => void;
}

export const GrammarInlineStep: React.FC<GrammarInlineStepProps> = ({
  config,
  onComplete,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelect = (questionId: string, option: string) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const calculateScore = () => {
    let count = 0;
    config.questions.forEach((q) => {
      if (selectedAnswers[q.id]?.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim()) {
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
    onComplete(score, selectedAnswers);
  };

  const allAnswered = config.questions.every((q) => selectedAnswers[q.id]);
  const score = calculateScore();

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-100 dark:border-cyan-900/60 rounded-3xl p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Grammar Focus: {config.title}
              </h2>
              <p className="text-sm text-muted-foreground">
                Read the grammar principle and choose the correct word in parentheses.
              </p>
            </div>
          </div>

          {isSubmitted && (
            <div className="text-right">
              <span className="text-xs uppercase font-bold tracking-wider text-muted-foreground">Score</span>
              <p className="text-2xl font-extrabold text-cyan-600 dark:text-cyan-400">
                {score} / {config.questions.length}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Grammar Rule Box */}
      <Card className="border border-cyan-200/60 dark:border-cyan-800/60 bg-cyan-50/30 dark:bg-cyan-950/20 rounded-3xl overflow-hidden shadow-xs">
        <CardContent className="p-6 space-y-3">
          <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-300 font-bold text-sm">
            <BookMarked className="w-4 h-4" />
            <span>Grammar Rule & Context</span>
          </div>
          <p className="text-sm leading-relaxed text-foreground/90 font-medium">
            {config.ruleExplanation}
          </p>
          {config.sampleSentences && config.sampleSentences.length > 0 && (
            <div className="pt-2 border-t border-cyan-200/40 dark:border-cyan-800/40 text-xs text-muted-foreground space-y-1">
              <span className="font-semibold text-foreground">Examples from the reading:</span>
              <ul className="list-disc pl-4 space-y-0.5 italic">
                {config.sampleSentences.map((s, idx) => (
                  <li key={idx}>"{s}"</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Inline Choice Questions */}
      <div className="space-y-4">
        {config.questions.map((q, idx) => {
          const userVal = selectedAnswers[q.id];
          const isCorrect = userVal === q.correctAnswer;

          return (
            <Card key={q.id} className="border border-border/70 rounded-3xl overflow-hidden shadow-xs">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between border-b pb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <span>Exercise {idx + 1}</span>
                  {isSubmitted && (
                    <span className={isCorrect ? 'text-emerald-600' : 'text-rose-500'}>
                      {isCorrect ? 'Correct!' : 'Incorrect'}
                    </span>
                  )}
                </div>

                {/* Sentence with parenthesized inline options */}
                <div className="text-base sm:text-lg leading-relaxed text-foreground font-serif">
                  {q.sentenceBefore && <span>{q.sentenceBefore} </span>}

                  <span className="inline-flex items-center gap-1 mx-1.5 p-1 bg-muted/70 rounded-2xl border font-sans text-sm">
                    {q.options.map((opt) => {
                      const isOptionSelected = userVal === opt;
                      let btnStyle = 'hover:bg-background text-muted-foreground';

                      if (isSubmitted) {
                        if (opt === q.correctAnswer) {
                          btnStyle = 'bg-emerald-600 text-white font-bold shadow-xs';
                        } else if (isOptionSelected && !isCorrect) {
                          btnStyle = 'bg-rose-500 text-white line-through font-bold';
                        } else {
                          btnStyle = 'opacity-40';
                        }
                      } else if (isOptionSelected) {
                        btnStyle = 'bg-cyan-600 text-white font-bold shadow-xs';
                      }

                      return (
                        <button
                          key={opt}
                          type="button"
                          disabled={isSubmitted}
                          onClick={() => handleSelect(q.id, opt)}
                          className={`px-3 py-1 rounded-xl font-medium transition-all ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </span>

                  <span> {q.sentenceAfter}</span>
                </div>

                {isSubmitted && (
                  <div className="p-3 bg-muted/60 rounded-xl text-xs text-foreground/80">
                    <span className="font-bold text-cyan-600">Explanation: </span>
                    {q.explanation}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Footer */}
      <div className="pt-4 flex justify-end">
        {!isSubmitted ? (
          <Button
            type="button"
            disabled={!allAnswered}
            onClick={handleSubmit}
            className="rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-6 py-5 shadow-lg shadow-cyan-600/20"
          >
            Check Grammar Choices
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleContinue}
            className="rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-semibold px-6 py-5 shadow-lg shadow-sky-600/20"
          >
            Continue to Guided Writing
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
};
