import React, { useState } from 'react';
import { ReadingComprehensionQuestion } from '../../types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ChevronRight, HelpCircle, ArrowRight } from 'lucide-react';

interface ComprehensionStepProps {
  questions: ReadingComprehensionQuestion[];
  onComplete: (score: number, answers: Record<string, string>) => void;
}

export const ComprehensionStep: React.FC<ComprehensionStepProps> = ({ questions, onComplete }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelect = (questionId: string, optionKey: string) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionKey }));
  };

  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });
    return correctCount;
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleContinue = () => {
    const score = calculateScore();
    onComplete(score, selectedAnswers);
  };

  const allAnswered = questions.every((q) => selectedAnswers[q.id]);
  const score = calculateScore();

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="bg-gradient-to-r from-sky-500/10 to-emerald-500/10 border border-sky-100 dark:border-sky-900/60 rounded-3xl p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Reading Comprehension
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Select the best answer for each question based on the reading text.
            </p>
          </div>
          {isSubmitted && (
            <div className="text-right">
              <span className="text-xs uppercase font-bold tracking-wider text-muted-foreground">Score</span>
              <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                {score} / {questions.length}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {questions.map((q) => {
          const userAns = selectedAnswers[q.id];
          const isCorrect = userAns === q.correctAnswer;

          return (
            <Card key={q.id} className="border border-border/70 rounded-3xl overflow-hidden shadow-xs">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-900/70 dark:text-sky-300 text-sm font-bold flex items-center justify-center shrink-0">
                    {q.questionNumber}
                  </span>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground leading-snug">
                    {q.questionText}
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-2.5 pt-2">
                  {q.options.map((opt) => {
                    const isOptionSelected = userAns === opt.key;
                    let optionStyles = 'border-border/60 hover:border-sky-300 hover:bg-sky-50/30';

                    if (isSubmitted) {
                      if (opt.key === q.correctAnswer) {
                        optionStyles = 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold ring-1 ring-emerald-500';
                      } else if (isOptionSelected && !isCorrect) {
                        optionStyles = 'border-rose-400 bg-rose-50/70 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 line-through';
                      } else {
                        optionStyles = 'opacity-60 border-border/40';
                      }
                    } else if (isOptionSelected) {
                      optionStyles = 'border-sky-600 bg-sky-50 dark:bg-sky-950/50 text-sky-900 dark:text-sky-100 ring-2 ring-sky-500/40 font-semibold';
                    }

                    return (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => handleSelect(q.id, opt.key)}
                        disabled={isSubmitted}
                        className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all flex items-center justify-between text-sm sm:text-base ${optionStyles}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full border text-xs font-bold flex items-center justify-center uppercase shrink-0">
                            {opt.key}
                          </span>
                          <span>{opt.text}</span>
                        </div>

                        {isSubmitted && opt.key === q.correctAnswer && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        )}
                        {isSubmitted && isOptionSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {isSubmitted && (
                  <div className="mt-4 p-3.5 rounded-2xl bg-muted/50 border text-xs sm:text-sm text-foreground/80">
                    <span className="font-bold text-sky-600 block mb-0.5">Explanation:</span>
                    {q.explanation}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="pt-4 flex justify-end">
        {!isSubmitted ? (
          <Button
            type="button"
            disabled={!allAnswered}
            onClick={handleSubmit}
            className="rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-semibold px-6 py-5 shadow-lg shadow-sky-600/20"
          >
            Check Answers
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleContinue}
            className="rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-5 shadow-lg shadow-emerald-600/20"
          >
            Continue to Idioms
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
};
