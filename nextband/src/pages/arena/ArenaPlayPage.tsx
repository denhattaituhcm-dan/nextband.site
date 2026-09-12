/**
 * STUDENT PLAY HUD (/arena/play)
 * Giao diện tương tác trực tiếp của học sinh trên Mobile.
 * Tích hợp: 4 Thẻ đáp án rõ chữ, Click sound + Tactile vibration,
 * và Màn hình Micro-feedback cá nhân sau khi giáo viên công bố kết quả.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useArenaAudio } from '@/hooks/arena/useArenaAudio';
import { StudentAnswerCard } from '@/components/arena/StudentAnswerCard';
import { ArenaIncenseTimer } from '@/components/arena/ArenaIncenseTimer';
import { ArenaQuestionOption } from '@/lib/arena/types';
import { CheckCircle2, XCircle, Trophy, Sparkles } from 'lucide-react';

const DEMO_OPTIONS: ArenaQuestionOption[] = [
  { id: 'opt_A', label: 'A', text: 'make an investment' },
  { id: 'opt_B', label: 'B', text: 'do an investment' },
  { id: 'opt_C', label: 'C', text: 'take an investment' },
  { id: 'opt_D', label: 'D', text: 'create an investment' },
];

export default function ArenaPlayPage() {
  const [searchParams] = useSearchParams();
  const pin = searchParams.get('pin') || '839210';
  const nickname = searchParams.get('name') || 'Học viên';

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(15);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);

  const { playClickSound, playCorrectSound, playWrongSound } = useArenaAudio();

  // Đếm lùi thời gian vòng
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsLocked(true);
          // Tự động reveal kết quả sau khi hết giờ một nhịp (giả lập delay của Host)
          setTimeout(() => setShowResult(true), 2500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Xử lý khi học sinh chọn đáp án
  const handleSelectOption = useCallback(
    (optionId: string) => {
      if (isLocked || hasSubmitted) return;

      playClickSound();
      setSelectedOptionId(optionId);
      setHasSubmitted(true);
    },
    [isLocked, hasSubmitted, playClickSound]
  );

  const isCorrect = selectedOptionId === 'opt_A';

  useEffect(() => {
    if (showResult) {
      if (isCorrect) {
        playCorrectSound();
      } else {
        playWrongSound();
      }
    }
  }, [showResult, isCorrect, playCorrectSound, playWrongSound]);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between p-4 font-sans select-none max-w-lg mx-auto w-full">
      {/* Top Header */}
      <header className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 font-black text-xs">
            {nickname.charAt(0).toUpperCase()}
          </div>
          <span className="font-black text-sm text-slate-200 truncate max-w-[120px]">
            {nickname}
          </span>
        </div>

        <div className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-xs font-mono font-bold text-orange-400">
          PIN: {pin}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-center my-4 space-y-4">
        {!showResult ? (
          <>
            {/* Round info & prompt */}
            <div className="text-center space-y-1">
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                CÂU HỎI 1 · 15 GIÂY
              </span>
              <h2 className="text-lg font-bold text-white leading-snug">
                "The enterprise decided to ______ an investment in clean technology."
              </h2>
            </div>

            {/* Incense Timer */}
            <ArenaIncenseTimer timeLeftSeconds={timeLeft} totalTimeSeconds={15} />

            {/* 4 Interactive Answer Cards */}
            <div className="grid grid-cols-1 gap-2.5 pt-2">
              {DEMO_OPTIONS.map((opt) => (
                <StudentAnswerCard
                  key={opt.id}
                  option={opt}
                  isSelected={selectedOptionId === opt.id}
                  isLocked={isLocked || hasSubmitted}
                  onSelect={handleSelectOption}
                />
              ))}
            </div>

            {/* Status notice */}
            <div className="text-center">
              {hasSubmitted ? (
                <span className="text-xs text-emerald-400 font-bold animate-pulse">
                  ✓ Đã ghi nhận câu trả lời. Đang chờ khóa câu...
                </span>
              ) : (
                <span className="text-xs text-slate-500">
                  Chạm vào phương án để trả lời
                </span>
              )}
            </div>
          </>
        ) : (
          /* Personal Micro-feedback Screen */
          <div className="space-y-6 text-center animate-fadeIn py-4">
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${
                isCorrect
                  ? 'bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400'
                  : 'bg-red-500/20 border-2 border-red-500 text-red-400'
              }`}
            >
              {isCorrect ? (
                <CheckCircle2 className="w-10 h-10" />
              ) : (
                <XCircle className="w-10 h-10" />
              )}
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-black text-white">
                {isCorrect ? 'CHÍNH XÁC TUYỆT ĐỐI!' : 'CHƯA CHÍNH XÁC!'}
              </h3>
              <p className="text-xs text-slate-400">
                {isCorrect
                  ? 'Bạn đã chọn đúng Collocation chuẩn xác.'
                  : 'Rất tiếc! "make an investment" mới là Collocation đúng.'}
              </p>
            </div>

            {/* Score & Rank Card */}
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl max-w-xs mx-auto space-y-3 shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs text-slate-400 font-medium">Điểm câu này</span>
                <span className="text-base font-black text-amber-400 font-mono">
                  {isCorrect ? '+115 pts' : '+0 pts'}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs text-slate-400 font-medium">Hạng hiện tại</span>
                <div className="flex items-center gap-1.5 font-bold text-white text-sm">
                  <Trophy className="w-4 h-4 text-amber-400" /> #{isCorrect ? '1' : '8'}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Khoảng cách Top 5</span>
                <span className="text-xs font-bold text-emerald-400">
                  {isCorrect ? 'Đang trong Top 5' : 'Cách 15 pts'}
                </span>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-xs text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              Chuẩn bị cho câu tiếp theo
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center text-[10px] text-slate-600 border-t border-slate-800 pt-2 font-mono">
        NEXTBAND ARENA ENGINE · REALTIME
      </footer>
    </div>
  );
}
