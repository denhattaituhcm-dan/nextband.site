import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/common/SEO";
import {
  ArrowLeft,
  BarChart3,
  BookOpen,
  Brain,
  CheckCircle2,
  Clock,
  RotateCcw,
  Sparkles,
  Volume2,
} from "lucide-react";
import { useEssentialVocabBookmarks } from "@/hooks/useEssentialVocabBookmarks";
import type { Sm2ReviewRating } from "@/lib/essentialVocab/sm2Client";

function speakEnglish(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-GB";
    u.rate = 0.95;
    window.speechSynthesis.speak(u);
  } catch {
    // Ignore speech synthesis errors
  }
}

export const EssentialVocabReviewPage: React.FC = () => {
  const { bookmarks, dueBookmarks, isLoading, submitBookmarkReview } =
    useEssentialVocabBookmarks();

  const [reviewAllMode, setReviewAllMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionReviewedCount, setSessionReviewedCount] = useState(0);
  const [cardStartTime, setCardStartTime] = useState<number>(Date.now());

  const reviewQueue = useMemo(() => {
    if (reviewAllMode) return bookmarks;
    return dueBookmarks.length > 0 ? dueBookmarks : bookmarks;
  }, [reviewAllMode, dueBookmarks, bookmarks]);

  const currentCard = reviewQueue[currentIndex] ?? null;

  const handleRateCard = async (rating: Sm2ReviewRating) => {
    if (!currentCard) return;
    const latencyMs = Math.max(200, Date.now() - cardStartTime);
    await submitBookmarkReview(currentCard.id, rating, latencyMs);
    setSessionReviewedCount((c) => c + 1);
    setIsFlipped(false);
    setCardStartTime(Date.now());
    if (currentIndex + 1 < reviewQueue.length) {
      setCurrentIndex((i) => i + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SEO
        title="Ôn tập từ vựng SM-2 | Essential Vocabulary in Context"
        description="Hệ thống ôn tập lặp lại ngắt quãng Spaced Repetition SM-2 cho Sổ từ Essential Vocabulary in Context."
      />

      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              to="/essential-vocabulary"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Hub
            </Link>
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-indigo-600" />
              <h1 className="text-base font-extrabold text-slate-900 sm:text-lg">
                Ôn tập từ vựng SM-2
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/essential-vocabulary/unit/evc5-u01"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
            >
              <BookOpen className="h-3.5 w-3.5" />
              Unit 1
            </Link>
            <Link
              to="/essential-vocabulary/progress"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
            >
              <BarChart3 className="h-3.5 w-3.5 text-emerald-600" />
              Tiến độ
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        {/* Top Stats */}
        <div className="mb-6 grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs text-slate-500">Tổng từ đã lưu</div>
            <div className="mt-1 text-2xl font-extrabold text-slate-900">
              {bookmarks.length}
            </div>
          </div>
          <div className="rounded-2xl border border-indigo-200 bg-indigo-50/70 p-4 shadow-sm">
            <div className="text-xs font-medium text-indigo-700">
              Đến hạn ôn hôm nay
            </div>
            <div className="mt-1 text-2xl font-extrabold text-indigo-900">
              {dueBookmarks.length}
            </div>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 shadow-sm">
            <div className="text-xs font-medium text-emerald-700">
              Đã ôn trong phiên này
            </div>
            <div className="mt-1 text-2xl font-extrabold text-emerald-900">
              {sessionReviewedCount}
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <p className="text-sm text-slate-500">Đang tải Sổ từ SM-2...</p>
          </div>
        ) : bookmarks.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <Sparkles className="mx-auto h-10 w-10 text-indigo-500" />
            <h2 className="mt-3 text-lg font-extrabold text-slate-900">
              Sổ từ SM-2 của bạn đang trống
            </h2>
            <p className="mx-auto mt-1 max-w-md text-xs leading-relaxed text-slate-500">
              Hãy vào Glossary của Unit 1 hoặc bấm “Lưu từ làm sai” sau khi chấm điểm
              bài tập để đưa từ vựng vào chu kỳ lặp lại ngắt quãng SM-2.
            </p>
            <Link
              to="/essential-vocabulary/unit/evc5-u01/glossary"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-500"
            >
              <BookOpen className="h-4 w-4" />
              Mở Glossary Unit 1: Looking good
            </Link>
          </div>
        ) : currentCard ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>
                Thẻ {currentIndex + 1} / {reviewQueue.length} · Nguồn:{" "}
                <strong className="text-slate-700">
                  {currentCard.unitId.toUpperCase()} ({currentCard.sourceContext})
                </strong>
              </span>
              <button
                type="button"
                onClick={() => {
                  setReviewAllMode((v) => !v);
                  setCurrentIndex(0);
                  setIsFlipped(false);
                }}
                className="font-semibold text-indigo-600 hover:underline"
              >
                {reviewAllMode
                  ? "Chỉ ôn từ đến hạn"
                  : `Ôn toàn bộ ${bookmarks.length} từ`}
              </button>
            </div>

            {/* Flashcard */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <span className="rounded-lg bg-indigo-100 px-2.5 py-1 text-xs font-bold italic text-indigo-800">
                    {currentCard.pos}
                  </span>
                  {currentCard.inflectionsText && (
                    <span className="ml-2 text-xs text-slate-500">
                      {currentCard.inflectionsText}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Clock className="h-3.5 w-3.5" />
                  Chu kỳ: {currentCard.intervalDays} ngày · Ease:{" "}
                  {currentCard.easeFactor}
                </div>
              </div>

              <div className="my-8 text-center">
                <div className="inline-flex items-center gap-3">
                  <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                    {currentCard.headword}
                  </h2>
                  <button
                    type="button"
                    onClick={() => speakEnglish(currentCard.headword)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700 hover:bg-indigo-100 hover:text-indigo-700"
                  >
                    <Volume2 className="h-4 w-4" />
                  </button>
                </div>
                {currentCard.ipa && (
                  <p className="mt-1 font-mono text-sm text-slate-500">
                    {currentCard.ipa}
                  </p>
                )}
              </div>

              {!isFlipped ? (
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setIsFlipped(true)}
                    className="rounded-2xl bg-slate-900 px-8 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
                  >
                    Lật thẻ xem Định nghĩa & Ngữ cảnh
                  </button>
                </div>
              ) : (
                <div className="space-y-4 border-t border-slate-200 pt-6">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Định nghĩa tiếng Anh (Context Definition)
                    </div>
                    <p className="mt-1 text-base font-semibold text-slate-900">
                      {currentCard.definitionEn}
                    </p>
                    <p className="mt-1 text-sm font-bold text-indigo-700">
                      → {currentCard.meaningVi}
                    </p>
                  </div>

                  {currentCard.exampleEn && (
                    <div className="rounded-xl bg-slate-50 p-3.5">
                      <div className="text-[11px] font-bold uppercase text-slate-400">
                        Câu ví dụ trong bài
                      </div>
                      <p className="mt-1 text-sm italic text-slate-700">
                        “{currentCard.exampleEn}”
                      </p>
                    </div>
                  )}

                  {/* SM-2 Rating Buttons */}
                  <div className="pt-3">
                    <div className="mb-2 text-center text-xs font-semibold text-slate-500">
                      Mức độ ghi nhớ của bạn (Thuật toán SM-2):
                    </div>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      <button
                        type="button"
                        onClick={() => handleRateCard("AGAIN")}
                        className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-xs font-bold text-rose-800 hover:bg-rose-100"
                      >
                        Quên (Again)
                        <div className="mt-0.5 text-[10px] font-normal">
                          Ôn lại sau 1 ngày
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRateCard("HARD")}
                        className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs font-bold text-amber-800 hover:bg-amber-100"
                      >
                        Khó (Hard)
                        <div className="mt-0.5 text-[10px] font-normal">
                          Tăng nhẹ chu kỳ
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRateCard("GOOD")}
                        className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-xs font-bold text-emerald-800 hover:bg-emerald-100"
                      >
                        Nhớ tốt (Good)
                        <div className="mt-0.5 text-[10px] font-normal">
                          Chu kỳ chuẩn SM-2
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRateCard("EASY")}
                        className="rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-2.5 text-xs font-bold text-indigo-800 hover:bg-indigo-100"
                      >
                        Rất dễ (Easy)
                        <div className="mt-0.5 text-[10px] font-normal">
                          Giãn chu kỳ x1.3
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
};

export default EssentialVocabReviewPage;
