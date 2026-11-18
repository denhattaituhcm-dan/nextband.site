import React, { useState } from 'react';
import { ReviewQuizQuestion } from '../../types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, CheckCircle2, XCircle, Sparkles, RefreshCcw, Home, ArrowRight, UserCheck, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ReviewQuizStepProps {
  questions: ReviewQuizQuestion[];
  unitNumber: number;
  savedAnswers?: Record<string, string>;
  savedScore?: number;
  readingWpm?: number;
  onComplete: (score: number, answers: Record<string, string>) => void;
  onResetUnit?: () => void;
}

export const ReviewQuizStep: React.FC<ReviewQuizStepProps> = ({
  questions,
  unitNumber,
  savedAnswers = {},
  savedScore,
  readingWpm,
  onComplete,
  onResetUnit,
}) => {
  const { isAuthenticated } = useAuth();
  const [answers, setAnswers] = useState<Record<string, string>>(() => savedAnswers);
  const [isFinished, setIsFinished] = useState<boolean>(() => {
    return savedScore !== undefined || (Object.keys(savedAnswers).length >= questions.length);
  });

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
    onComplete(score, answers);
  };

  const allAnswered = questions.every((q) => answers[q.id]);
  const score = calculateScore();
  const percentage = Math.round((score / questions.length) * 100);

  const partAQuestions = questions.filter((q) => q.part === 'A');
  const partBQuestions = questions.filter((q) => q.part === 'B');

  const nextUnitNumber = unitNumber < 20 ? unitNumber + 1 : null;

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
            <div className="p-3 bg-muted/60 rounded-xl text-xs text-foreground/80 animate-in fade-in">
              <span className="font-bold text-sky-600">Giải thích: </span>
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
                Vocabulary and Idiom Review (Kiểm tra tổng hợp 10 câu)
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                Phần A: Từ vựng & Thành ngữ (1-7) • Phần B: Dạng thức của từ (Word Forms 8-10)
              </p>
            </div>
          </div>

          {isFinished && (
            <div className="text-right">
              <span className="text-xs uppercase font-bold tracking-wider text-muted-foreground">Điểm Quiz</span>
              <p className="text-3xl font-extrabold text-amber-600 dark:text-amber-400">
                {score} / {questions.length} ({percentage}%)
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Completion Banner with Full Unit Harvest */}
      {isFinished && (
        <Card className="border-2 border-emerald-500/60 bg-emerald-50/50 dark:bg-emerald-950/30 rounded-3xl overflow-hidden animate-in zoom-in-95 shadow-md">
          <CardContent className="p-6 sm:p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-600 mx-auto flex items-center justify-center shadow-xs">
              <Sparkles className="w-9 h-9" />
            </div>

            <div>
              <h3 className="text-2xl font-black text-foreground tracking-tight">
                🎉 Xuất sắc! Bạn đã chinh phục trọn vẹn Unit {unitNumber}!
              </h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
                Hệ thống đã tự động lưu lại toàn bộ kết quả, tốc độ đọc và các câu trả lời của bài học này.
              </p>
            </div>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto text-left">
              <div className="p-3 bg-background/90 rounded-2xl border text-xs">
                <span className="text-muted-foreground block text-[11px]">Điểm Review Quiz:</span>
                <span className="text-base font-extrabold text-emerald-600">{score}/{questions.length} ({percentage}%)</span>
              </div>
              <div className="p-3 bg-background/90 rounded-2xl border text-xs">
                <span className="text-muted-foreground block text-[11px]">Tốc độ đọc (WPM):</span>
                <span className="text-base font-extrabold text-sky-600">{readingWpm ? `${readingWpm} từ/phút` : 'Đã hoàn thành'}</span>
              </div>
              <div className="p-3 bg-background/90 rounded-2xl border text-xs col-span-2 sm:col-span-1">
                <span className="text-muted-foreground block text-[11px]">Trạng thái Unit:</span>
                <span className="text-base font-extrabold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Đạt chuẩn 10/10
                </span>
              </div>
            </div>

            {/* Guest Reminder or Sync Status Badge */}
            {!isAuthenticated ? (
              <div className="p-4 bg-sky-50 dark:bg-sky-950/40 rounded-2xl border border-sky-200 dark:border-sky-800 text-xs text-sky-900 dark:text-sky-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-sky-600 shrink-0" />
                  <span>
                    Kết quả đã được lưu tạm an toàn trên máy. <strong>Đăng nhập tài khoản</strong> để đồng bộ đa thiết bị và lưu vĩnh viễn vào hồ sơ học viên.
                  </span>
                </div>
                <Link to="/auth/login" className="shrink-0">
                  <Button size="sm" className="rounded-xl text-xs bg-sky-600 hover:bg-sky-500 text-white font-bold">
                    Đăng nhập ngay
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 text-xs font-semibold">
                <UserCheck className="w-3.5 h-3.5" />
                <span>Tiến độ đã được đồng bộ lên tài khoản học viên NextBand</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link to="/reading-challenge">
                <Button variant="outline" className="rounded-2xl text-xs h-10 px-4">
                  <Home className="w-4 h-4 mr-2" />
                  Về trang lộ trình
                </Button>
              </Link>

              {nextUnitNumber && (
                <Link to={`/reading-challenge/${nextUnitNumber}`}>
                  <Button className="rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs h-10 px-5 shadow-md shadow-sky-600/20">
                    Học tiếp Unit {nextUnitNumber}
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </Link>
              )}

              {onResetUnit && (
                <Button variant="ghost" onClick={onResetUnit} className="rounded-2xl text-xs h-10 text-muted-foreground hover:text-foreground">
                  <RefreshCcw className="w-3.5 h-3.5 mr-1" />
                  Luyện tập lại Unit này
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
            Phần A: Chọn từ hoặc cụm từ thích hợp nhất để điền vào chỗ trống (1-7)
          </span>
        </div>
        {partAQuestions.map(renderQuestionCard)}
      </div>

      {/* Part B Section */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center gap-2 border-b pb-2">
          <span className="font-bold text-sm text-foreground uppercase tracking-wide">
            Phần B: Chọn dạng thức đúng của từ (Word Forms 8-10)
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
            Nộp bài kiểm tra tổng hợp
            <Trophy className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
};
