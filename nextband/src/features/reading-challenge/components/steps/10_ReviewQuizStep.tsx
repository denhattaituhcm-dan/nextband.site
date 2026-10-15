import React, { useState } from 'react';
import { ReviewQuizQuestion } from '../../types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, CheckCircle2, XCircle, Sparkles, RefreshCcw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ReviewQuizStepProps {
  questions: ReviewQuizQuestion[];
  unitNumber: number;
  onComplete: (score: number) => void;
  onResetUnit?: () => void;
}

export const ReviewQuizStep: React.FC<ReviewQuizStepProps> = ({
  questions,
  unitNumber,
  onComplete,
  onResetUnit,
}) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isFinished, setIsFinished] = useState(false);

  const handleSelect = (questionId: string, optionKey: string) => {
    if (isFinished) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionKey }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (answers[q.id]?.toLowerCase() === q.correctAnswer.toLowerCase()) {
        score++;
      }
    });
    return score;
  };

  const handleSubmit = () => {
    setIsFinished(true);
    const score = calculateScore();
    onComplete(score);
  };

  const allAnswered = questions.every((q) => answers[q.id]);
  const score = calculateScore();
  const percentage = Math.round((score / questions.length) * 100);

  const partAQuestions = questions.filter((q) => q.part === 'A');
  const partBQuestions = questions.filter((q) => q.part === 'B');

  const renderQuestionCard = (q: ReviewQuizQuestion) => {
    const userVal = answers[q.id];
    const isCorrect = userVal === q.correctAnswer;

    return (
      <Card key={q.id} className="border border-border/70 rounded-2xl overflow-hidden shadow-xs">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-start justify-between gap-3 border-b pb-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-sky-100 text-sky-800 dark:bg-sky-900/60 dark:text-sky-300 text-xs font-bold flex items-center justify-center shrink-0">
                {q.questionNumber}
              </span>
              <p className="text-sm sm:text-base font-semibold text-foreground">
                {q.question}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            {q.options.map((opt) => {
              const isSelected = userVal === opt.key;
              let style = 'border-border/60 hover:border-sky-300';

              if (isFinished) {
                if (opt.key === q.correctAnswer) {
                  style = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold';
                } else if (isSelected && !isCorrect) {
                  style = 'border-rose-400 bg-rose-50 text-rose-900 line-through';
                } else {
                  style = 'opacity-50';
                }
              } else if (isSelected) {
                style = 'border-sky-600 bg-sky-50 dark:bg-sky-950/50 text-sky-900 dark:text-sky-100 font-bold ring-2 ring-sky-500/40';
              }

              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => handleSelect(q.id, opt.key)}
                  disabled={isFinished}
                  className={`text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${style}`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full border text-[11px] font-bold flex items-center justify-center uppercase shrink-0">
                      {opt.key}
                    </span>
                    <span>{opt.text}</span>
                  </div>

                  {isFinished && opt.key === q.correctAnswer && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                  {isFinished && isSelected && !isCorrect && (
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {isFinished && (
            <div className="p-3 bg-muted/60 rounded-xl text-xs text-foreground/80">
              <span className="font-bold text-sky-600">Explanation: </span>
              {q.explanation}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-indigo-500/10 border border-amber-200/60 dark:border-amber-900/60 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Vocabulary and Idiom Review (10 Questions)
              </h2>
              <p className="text-sm text-muted-foreground">
                Part A: Vocabulary & Idioms (1-7) • Part B: Word Forms (8-10)
              </p>
            </div>
          </div>

          {isFinished && (
            <div className="text-right">
              <span className="text-xs uppercase font-bold tracking-wider text-muted-foreground">Mastery Score</span>
              <p className="text-3xl font-extrabold text-amber-600 dark:text-amber-400">
                {score} / {questions.length} ({percentage}%)
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Completion Banner */}
      {isFinished && (
        <Card className="border-2 border-emerald-500/60 bg-emerald-50/50 dark:bg-emerald-950/30 rounded-3xl overflow-hidden animate-in zoom-in-95">
          <CardContent className="p-6 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-600 mx-auto flex items-center justify-center">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-foreground">
              🎉 Congratulations! You have fully completed Unit {unitNumber}!
            </h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Your results and responses have been recorded. You can return to the Challenge Hub to explore more units or reset to practice again.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <Link to="/reading-challenge">
                <Button className="rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-semibold px-5">
                  <Home className="w-4 h-4 mr-2" />
                  Return to Hub
                </Button>
              </Link>
              {onResetUnit && (
                <Button variant="outline" onClick={onResetUnit} className="rounded-2xl text-xs">
                  <RefreshCcw className="w-3.5 h-3.5 mr-1" />
                  Practice Again
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Part A Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b pb-2">
          <span className="font-bold text-sm text-foreground uppercase tracking-wide">
            Part A: Choose the best word or phrase to fill in the blank (1-7)
          </span>
        </div>
        {partAQuestions.map(renderQuestionCard)}
      </div>

      {/* Part B Section */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center gap-2 border-b pb-2">
          <span className="font-bold text-sm text-foreground uppercase tracking-wide">
            Part B: Choose the correct form of the word to fill in the blank (8-10)
          </span>
        </div>
        {partBQuestions.map(renderQuestionCard)}
      </div>

      {!isFinished && (
        <div className="pt-4 flex justify-end">
          <Button
            type="button"
            disabled={!allAnswered}
            onClick={handleSubmit}
            className="rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-semibold px-6 py-5 shadow-lg shadow-amber-600/20"
          >
            Submit Final Review Quiz
            <Trophy className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
};
