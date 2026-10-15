import React, { useState } from 'react';
import { IdiomItem } from '../../types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle2, ChevronRight, Layers, ArrowRight, BookOpen } from 'lucide-react';

interface IdiomsStepProps {
  idioms: IdiomItem[];
  onComplete: (score: number, answers: Record<string, string>) => void;
}

export const IdiomsStep: React.FC<IdiomsStepProps> = ({ idioms, onComplete }) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (idiomId: string, val: string) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({ ...prev, [idiomId]: val }));
  };

  const handleQuickInsert = (idiomId: string, text: string) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({ ...prev, [idiomId]: text }));
  };

  const isAnswerCorrect = (item: IdiomItem, userVal?: string) => {
    if (!userVal) return false;
    const cleanUser = userVal.trim().toLowerCase();
    const cleanCorrect = item.correctAnswer.trim().toLowerCase();
    if (cleanUser === cleanCorrect) return true;
    if (item.acceptableAnswers?.some((a) => a.trim().toLowerCase() === cleanUser)) {
      return true;
    }
    return false;
  };

  const calculateScore = () => {
    let count = 0;
    idioms.forEach((i) => {
      if (isAnswerCorrect(i, answers[i.id])) {
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
    onComplete(score, answers);
  };

  const allAnswered = idioms.every((i) => answers[i.id]?.trim());
  const score = calculateScore();

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-100 dark:border-indigo-900/60 rounded-3xl p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Idiomatic Expressions
              </h2>
              <p className="text-sm text-muted-foreground">
                Fill in the blank with one of the idioms. Change its form if necessary.
              </p>
            </div>
          </div>
          {isSubmitted && (
            <div className="text-right">
              <span className="text-xs uppercase font-bold tracking-wider text-muted-foreground">Score</span>
              <p className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
                {score} / {idioms.length}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Target Idioms Reference Card */}
      <Card className="border border-indigo-200/60 dark:border-indigo-900/40 bg-indigo-50/30 dark:bg-indigo-950/20 rounded-3xl overflow-hidden">
        <CardContent className="p-5 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-800 dark:text-indigo-300 block">
            Target Idioms in this Unit:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {idioms.map((item) => (
              <div key={item.id} className="p-3 bg-background/80 rounded-2xl border text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-indigo-700 dark:text-indigo-300">
                    {item.idiom}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      // Find first unfilled idiom or current
                      const targetId = idioms.find((i) => !answers[i.id])?.id || item.id;
                      handleQuickInsert(targetId, item.idiom);
                    }}
                    className="text-[10px] text-muted-foreground hover:text-indigo-600 font-semibold"
                  >
                    + Tap
                  </button>
                </div>
                <p className="text-muted-foreground">[{item.definition}]</p>
                <p className="text-[11px] italic text-foreground/80">"{item.bookExample}"</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Fill-in-the-blank Exercise List */}
      <div className="space-y-4">
        {idioms.map((item, idx) => {
          const userVal = answers[item.id] || '';
          const isCorrect = isAnswerCorrect(item, userVal);

          // Split prompt by [BLANK]
          const parts = item.sentencePrompt.split('[BLANK]');

          return (
            <Card key={item.id} className="border border-border/70 rounded-3xl overflow-hidden shadow-xs">
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center justify-between border-b pb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <span>Exercise {idx + 1}</span>
                  {isSubmitted && (
                    <span className={isCorrect ? 'text-emerald-600' : 'text-rose-500'}>
                      {isCorrect ? 'Correct!' : `Answer: ${item.correctAnswer}`}
                    </span>
                  )}
                </div>

                <div className="text-base sm:text-lg font-serif text-foreground/90 leading-relaxed flex flex-wrap items-center gap-2">
                  <span>{parts[0]}</span>
                  <Input
                    value={userVal}
                    disabled={isSubmitted}
                    onChange={(e) => handleInputChange(item.id, e.target.value)}
                    placeholder="type idiom..."
                    className={`inline-block w-40 sm:w-48 h-9 text-sm font-sans font-semibold rounded-xl border-2 ${
                      isSubmitted
                        ? isCorrect
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold'
                          : 'border-rose-400 bg-rose-50 text-rose-900 font-bold'
                        : 'border-indigo-300 focus:border-indigo-600'
                    }`}
                  />
                  <span>{parts[1]}</span>
                </div>

                {isSubmitted && (
                  <div className="p-3 bg-muted/60 rounded-xl text-xs text-foreground/80">
                    <span className="font-bold text-indigo-600">Note: </span>
                    {item.explanation}
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
            className="rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-5 shadow-lg shadow-indigo-600/20"
          >
            Check Idioms Answers
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleContinue}
            className="rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-5 shadow-lg shadow-emerald-600/20"
          >
            Continue to Summary
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
};
