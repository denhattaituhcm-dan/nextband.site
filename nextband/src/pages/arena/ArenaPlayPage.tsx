/**
 * STUDENT PLAY HUD (/arena/play)
 * Giao diện tương tác trực tiếp của học sinh trên Mobile.
 * Hỗ trợ cả 2 chế độ:
 * - 'CLASSIC': Trả lời câu hỏi -> Khóa câu -> Xem micro-feedback kết quả
 * - 'GOLD_QUEST': Trả lời đúng -> Hiện 3 Rương Kho Báu -> Mở rương / Cướp vàng bạn cùng lớp!
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useArenaAudio } from '@/hooks/arena/useArenaAudio';
import { StudentAnswerCard } from '@/components/arena/StudentAnswerCard';
import { ArenaIncenseTimer } from '@/components/arena/ArenaIncenseTimer';
import { GoldQuestChestModal } from '@/components/arena/GoldQuestChestModal';
import { ArenaQuestionOption } from '@/lib/arena/types';
import { CheckCircle2, XCircle, Trophy, Sparkles } from 'lucide-react';

const DEMO_OPTIONS: ArenaQuestionOption[] = [
  { id: 'opt_A', label: 'A', text: 'make an investment' },
  { id: 'opt_B', label: 'B', text: 'do an investment' },
  { id: 'opt_C', label: 'C', text: 'take an investment' },
  { id: 'opt_D', label: 'D', text: 'create an investment' },
];

interface PlayerCandidate {
  name: string;
  gold: number;
}

export default function ArenaPlayPage() {
  const [searchParams] = useSearchParams();
  const pin = searchParams.get('pin') || '111999';
  const nickname = searchParams.get('name') || 'Học viên';

  const [gameMode, setGameMode] = useState<'CLASSIC' | 'GOLD_QUEST'>('CLASSIC');
  const [gold, setGold] = useState<number>(0);
  const [playersList, setPlayersList] = useState<PlayerCandidate[]>([]);
  const [isChestModalOpen, setIsChestModalOpen] = useState<boolean>(false);

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(15);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);

  const { playClickSound, playCorrectSound, playWrongSound } = useArenaAudio();
  const channelRef = useRef<any>(null);

  // Lắng nghe broadcast từ Host
  useEffect(() => {
    if (!pin) return;
    const channelName = `arena-room-${pin}`;
    const channel = supabase.channel(channelName);

    channel
      .on('broadcast', { event: 'arena-started' }, ({ payload }) => {
        if (payload?.gameMode) setGameMode(payload.gameMode);
        if (payload?.timeLimit) setTimeLeft(payload.timeLimit);
        else setTimeLeft(15);

        setIsLocked(false);
        setHasSubmitted(false);
        setSelectedOptionId(null);
        setShowResult(false);
        setIsChestModalOpen(false);
      })
      .on('broadcast', { event: 'round-locked' }, () => {
        setIsLocked(true);
      })
      .on('broadcast', { event: 'round-reveal' }, () => {
        setShowResult(true);
      })
      .on('broadcast', { event: 'players-sync' }, ({ payload }) => {
        if (payload?.players) {
          setPlayersList(payload.players);
        }
      })
      .on('broadcast', { event: 'gold-stolen-from-you' }, ({ payload }) => {
        if (payload?.victimName?.trim().toLowerCase() === nickname.trim().toLowerCase()) {
          setGold((prev) => Math.max(0, prev - (payload.amount || 0)));
          playWrongSound();
        }
      })
      .subscribe();

    channelRef.current = channel;

    return () => {
      supabase.removeChannel(channel);
    };
  }, [pin, nickname, playWrongSound]);

  // Đếm lùi thời gian vòng
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsLocked(true);
          setTimeout(() => setShowResult(true), 2500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const isCorrect = selectedOptionId === 'opt_A';

  // Xử lý khi học sinh chọn đáp án
  const handleSelectOption = useCallback(
    async (optionId: string) => {
      if (isLocked || hasSubmitted) return;

      playClickSound();
      setSelectedOptionId(optionId);
      setHasSubmitted(true);

      const isAnsCorrect = optionId === 'opt_A';

      // Gửi broadcast đáp án của học sinh lên Host
      if (channelRef.current) {
        channelRef.current.send({
          type: 'broadcast',
          event: 'player-answered',
          payload: {
            nickname,
            optionId,
            timeLeft,
            gold,
          },
        });
      }

      // Nếu đang ở chế độ GOLD_QUEST và trả lời đúng -> Kích hoạt Rương Kho Báu
      if (gameMode === 'GOLD_QUEST' && isAnsCorrect) {
        setTimeout(() => {
          setIsChestModalOpen(true);
        }, 600);
      }
    },
    [isLocked, hasSubmitted, playClickSound, nickname, timeLeft, gold, gameMode]
  );

  // Xử lý khi mở rương nhận vàng
  const handleApplyChestReward = (goldDelta: number) => {
    setGold((prev) => {
      const updated = Math.max(0, prev + goldDelta);
      if (channelRef.current) {
        channelRef.current.send({
          type: 'broadcast',
          event: 'gold-updated',
          payload: { nickname, gold: updated },
        });
      }
      return updated;
    });
  };

  // Xử lý khi cướp vàng của học sinh khác
  const handleStealGold = (victimName: string, stolenAmount: number) => {
    setGold((prev) => {
      const updated = prev + stolenAmount;
      if (channelRef.current) {
        // Báo cho Host và cả phòng
        channelRef.current.send({
          type: 'broadcast',
          event: 'gold-steal-event',
          payload: {
            thiefName: nickname,
            victimName,
            amount: stolenAmount,
          },
        });
      }
      return updated;
    });
  };

  useEffect(() => {
    if (showResult && gameMode === 'CLASSIC') {
      if (isCorrect) {
        playCorrectSound();
      } else {
        playWrongSound();
      }
    }
  }, [showResult, isCorrect, playCorrectSound, playWrongSound, gameMode]);

  return (
    <div className="min-h-screen bg-[#150a33] text-white flex flex-col justify-between p-4 font-sans select-none max-w-lg mx-auto w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2a135e] via-[#150a33] to-[#0a051b]">
      {/* Top Header */}
      <header className="flex items-center justify-between border-b border-purple-900/40 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 font-black text-xs">
            {nickname.charAt(0).toUpperCase()}
          </div>
          <span className="font-black text-sm text-slate-200 truncate max-w-[120px]">
            {nickname}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {gameMode === 'GOLD_QUEST' && (
            <div className="px-3 py-1 bg-amber-500/20 border border-amber-400/40 rounded-full text-xs font-black text-amber-300 font-mono flex items-center gap-1 shadow-sm">
              <span>🪙</span> {gold} Vàng
            </div>
          )}
          <div className="px-2.5 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-mono font-bold text-orange-300">
            PIN: {pin}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-center my-4 space-y-4">
        {!showResult ? (
          <>
            {/* Round info & prompt */}
            <div className="text-center space-y-1">
              <span className="text-[11px] font-mono font-bold text-purple-300 uppercase tracking-widest flex items-center justify-center gap-1">
                {gameMode === 'GOLD_QUEST' ? '💰 CƯỚP VÀNG · TRẢ LỜI ĐỂ MỞ RƯƠNG' : '🎯 CÂU HỎI 1 · 15 GIÂY'}
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
                  {gameMode === 'GOLD_QUEST' && isCorrect
                    ? '✓ Chính xác! Đang chuẩn bị mở Rương Kho Báu...'
                    : '✓ Đã ghi nhận câu trả lời. Đang chờ khóa câu...'}
                </span>
              ) : (
                <span className="text-xs text-purple-300/70">
                  Chạm vào phương án để trả lời
                </span>
              )}
            </div>
          </>
        ) : (
          /* Personal Micro-feedback Screen */
          <div className="space-y-6 text-center animate-fadeIn py-4">
            <div className="flex justify-center">
              {isCorrect ? (
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-full bg-rose-500/20 border-2 border-rose-500 flex items-center justify-center text-rose-400">
                  <XCircle className="w-10 h-10" />
                </div>
              )}
            </div>

            <div className="space-y-1">
              <h2 className="text-3xl font-black text-white">
                {isCorrect ? 'CHÍNH XÁC!' : 'CHƯA CHÍNH XÁC'}
              </h2>
              <p className="text-sm font-semibold text-purple-200">
                {isCorrect ? (gameMode === 'GOLD_QUEST' ? `Kho vàng: ${gold} 🪙` : '+100 Điểm Tốc Độ') : 'Đừng nản lòng, chú ý collocation tiếp theo'}
              </p>
            </div>

            {/* Individual Diagnostic Card */}
            <div className="p-4 bg-purple-950/40 border border-purple-800/60 rounded-2xl text-left space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-purple-300 uppercase">Đáp án chuẩn:</span>
                <span className="font-black text-emerald-400">A. make an investment</span>
              </div>
              <p className="text-xs text-purple-200/80 leading-relaxed">
                Động từ chuẩn đi với "investment" trong học thuật IELTS là <strong>make</strong> (không dùng do/take/create).
              </p>
            </div>

            <div className="pt-2">
              <span className="text-xs text-purple-300/70 font-medium">
                Nhìn lên màn hình của Thầy/Cô để xem phân tích chi tiết.
              </span>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-2 border-t border-purple-900/40 text-[11px] text-purple-300/60 font-medium">
        NextBand Arena · Đấu trường Aris
      </footer>

      {/* Modal Mở Rương Kho Báu & Cướp Vàng */}
      <GoldQuestChestModal
        isOpen={isChestModalOpen}
        onClose={() => setIsChestModalOpen(false)}
        currentGold={gold}
        players={playersList}
        myNickname={nickname}
        onApplyReward={handleApplyChestReward}
        onStealGold={handleStealGold}
      />
    </div>
  );
}
