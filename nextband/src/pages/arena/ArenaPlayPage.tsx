/**
 * STUDENT PLAY HUD (/arena/play)
 * Giao diện tương tác trực tiếp của học sinh trên Mobile.
 * Hỗ trợ cả 2 chế độ:
 * - 'CLASSIC': Trả lời câu hỏi -> Khóa câu -> Xem micro-feedback kết quả
 * - 'GOLD_QUEST': Trả lời đúng -> Hiện 3 Rương Kho Báu -> Mở rương / Cướp vàng bạn cùng lớp!
 */

import React, { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useArenaAudio } from '@/hooks/arena/useArenaAudio';
import { StudentAnswerCard } from '@/components/arena/StudentAnswerCard';
import { ArenaIncenseTimer } from '@/components/arena/ArenaIncenseTimer';
import { GoldQuestChestModal } from '@/components/arena/GoldQuestChestModal';
import { ArenaQuestionOption, PlayerPublicRank } from '@/lib/arena/types';
import { ARENA_COLLOCATION_QUESTIONS, ArenaQuestion } from '@/lib/arena/questions';
import { CheckCircle2, XCircle, Trophy, Sparkles, Medal, Crown } from 'lucide-react';
import { PvZCardAvatar } from '@/components/arena/PvZCardAvatar';
import { CHARACTER_AVATARS, getCharacterBySeed } from '@/lib/arena/characterCatalog';
import { ArenaErrorBoundary } from '@/components/arena/ArenaErrorBoundary';
import { useArenaSelfHealing } from '@/hooks/arena/useArenaSelfHealing';
import { arenaTelemetry } from '@/lib/arena/arenaTelemetry';

interface PlayerCandidate {
  name: string;
  gold: number;
}

type StudentGameState =
  | 'LOBBY_WAITING'
  | 'QUESTION_LIVE'
  | 'ROUND_LOCKED'
  | 'ROUND_REVEAL'
  | 'LEADERBOARD'
  | 'PODIUM';

export default function ArenaPlayPage() {
  const [searchParams] = useSearchParams();
  const pin = searchParams.get('pin') || '111999';
  const nickname = searchParams.get('name') || 'Học viên';
  const playerId = searchParams.get('playerId') || `p_${Date.now()}`;
  const paramAvatarId = searchParams.get('plantId');
  const storedAvatarId = typeof window !== 'undefined' ? sessionStorage.getItem('arena_plant_id') : null;
  const avatarId = paramAvatarId !== null && paramAvatarId !== undefined 
    ? Number(paramAvatarId) 
    : (storedAvatarId ? Number(storedAvatarId) : getCharacterBySeed(nickname).id);
  const currentCharacter = CHARACTER_AVATARS[avatarId] || getCharacterBySeed(nickname);

  const [gameState, setGameState] = useState<StudentGameState>('LOBBY_WAITING');
  const [gameMode, setGameMode] = useState<'CLASSIC' | 'GOLD_QUEST'>('CLASSIC');
  const [gold, setGold] = useState<number>(0);
  const [playersList, setPlayersList] = useState<PlayerCandidate[]>([]);
  const [isChestModalOpen, setIsChestModalOpen] = useState<boolean>(false);

  // Câu hỏi động nhận từ Host
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [totalQuestions, setTotalQuestions] = useState<number>(ARENA_COLLOCATION_QUESTIONS.length);
  const [currentQuestion, setCurrentQuestion] = useState<ArenaQuestion>(ARENA_COLLOCATION_QUESTIONS[0]);
  const [myRanking, setMyRanking] = useState<{ rank: number; totalScore: number } | null>(null);
  const [topRankings, setTopRankings] = useState<PlayerPublicRank[]>([]);

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(15);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isJoinedAcknowledged, setIsJoinedAcknowledged] = useState<boolean>(false);

  const { playClickSound, playCorrectSound, playWrongSound } = useArenaAudio();
  const channelRef = useRef<any>(null);

  const nicknameRef = useRef<string>(nickname);
  nicknameRef.current = nickname;
  const avatarIdRef = useRef<number>(avatarId);
  avatarIdRef.current = avatarId;
  const gameStateRef = useRef<StudentGameState>(gameState);
  gameStateRef.current = gameState;
  const playClickSoundRef = useRef(playClickSound);
  playClickSoundRef.current = playClickSound;
  const playWrongSoundRef = useRef(playWrongSound);
  playWrongSoundRef.current = playWrongSound;

  // Self-Healing Watchdog: Tự động khôi phục nếu mất đồng bộ hoặc drop kết nối
  const handleResyncRequired = useCallback(() => {
    if (channelRef.current) {
      channelRef.current.send({
        type: 'broadcast',
        event: 'player-sync-request',
        payload: { playerId, nickname },
      });
    }
  }, [playerId, nickname]);

  const { recordHeartbeat } = useArenaSelfHealing({
    pin,
    playerId,
    gameState,
    onResyncRequired: handleResyncRequired,
    isLocked,
  });

  // Hỗ trợ HTML5 BroadcastChannel đồng bộ cục bộ tức thì cho máy cùng tab/cùng trình duyệt
  useEffect(() => {
    if (typeof window === 'undefined' || !('BroadcastChannel' in window) || !pin) return;
    try {
      const bc = new BroadcastChannel(`arena-local-sync-${pin}`);
      bc.postMessage({
        type: 'player-joined',
        payload: {
          id: playerId,
          name: nickname,
          avatarSeed: avatarId,
          rank: 'Học viên',
          joinedAt: new Date().toISOString(),
        },
      });
      return () => bc.close();
    } catch {}
  }, [pin, playerId, nickname, avatarId]);

  // Lắng nghe broadcast và Presence từ Host
  useEffect(() => {
    if (!pin) return;
    const channelName = `arena-room-${pin}`;

    const channel = supabase.channel(channelName, {
      config: {
        broadcast: { ack: true, self: true },
        presence: { key: nickname },
      },
    });

    const announcePresence = async () => {
      try {
        await channel.send({
          type: 'broadcast',
          event: 'player-joined',
          payload: {
            id: playerId,
            name: nicknameRef.current,
            avatarSeed: avatarIdRef.current,
            rank: 'Học viên',
            joinedAt: new Date().toISOString(),
          },
        });
      } catch (e) {
        console.warn('[NextQuiz] Error sending player-joined:', e);
      }

      try {
        await channel.send({
          type: 'broadcast',
          event: 'player-sync-request',
          payload: {
            playerId,
            nickname: nicknameRef.current,
          },
        });
      } catch (e) {
        console.warn('[NextQuiz] Error sending player-sync-request:', e);
      }

      try {
        await channel.track({
          id: playerId,
          name: nicknameRef.current,
          avatarSeed: avatarIdRef.current,
          rank: 'Học viên',
          joinedAt: new Date().toISOString(),
        });
      } catch (e) {
        console.warn('[NextQuiz] Error tracking presence:', e);
      }
    };

    channel
      .on('broadcast', { event: 'player-joined-ack' }, ({ payload }) => {
        if (!payload || payload.playerId === playerId || payload.accepted) {
          setIsJoinedAcknowledged(true);
        }
      })
      .on('broadcast', { event: 'player-sync-response' }, ({ payload }) => {
        if (payload?.targetPlayerId === playerId || !payload?.targetPlayerId) {
          setIsJoinedAcknowledged(true);
          if (payload?.gameMode) setGameMode(payload.gameMode);
          if (payload?.state) {
            if (payload.state === 'QUESTION_LIVE') setGameState('QUESTION_LIVE');
            else if (payload.state === 'ANSWER_LOCKED') setGameState('ROUND_LOCKED');
            else if (payload.state === 'REVEAL_DISTRIBUTION' || payload.state === 'REVEAL_PERSONAL') setGameState('ROUND_REVEAL');
            else if (payload.state === 'LEADERBOARD') setGameState('LEADERBOARD');
            else if (payload.state === 'PODIUM') setGameState('PODIUM');
          }
          if (typeof payload?.timeLeft === 'number') setTimeLeft(payload.timeLeft);
          if (payload?.question) setCurrentQuestion(payload.question);
          if (typeof payload?.questionIndex === 'number') setQuestionIndex(payload.questionIndex);
          if (typeof payload?.totalQuestions === 'number') setTotalQuestions(payload.totalQuestions);
        }
      })
      .on('broadcast', { event: 'lobby-ping' }, () => {
        recordHeartbeat('lobby-ping');
        setIsJoinedAcknowledged(true);
        announcePresence();
      })
      .on('broadcast', { event: 'question-live' }, ({ payload }) => {
        recordHeartbeat('question-live');
        setIsJoinedAcknowledged(true);
        if (payload?.gameMode) setGameMode(payload.gameMode);
        if (payload?.timeLimit) setTimeLeft(payload.timeLimit);
        else setTimeLeft(15);

        if (payload?.question) setCurrentQuestion(payload.question);
        if (typeof payload?.questionIndex === 'number') setQuestionIndex(payload.questionIndex);
        if (typeof payload?.totalQuestions === 'number') setTotalQuestions(payload.totalQuestions);

        setGameState('QUESTION_LIVE');
        setIsLocked(false);
        setHasSubmitted(false);
        setSelectedOptionId(null);
        setShowResult(false);
        setIsChestModalOpen(false);
        playClickSoundRef.current();
      })
      .on('broadcast', { event: 'arena-started' }, ({ payload }) => {
        setIsJoinedAcknowledged(true);
        if (payload?.gameMode) setGameMode(payload.gameMode);
        if (payload?.timeLimit) setTimeLeft(payload.timeLimit);
        else setTimeLeft(15);

        if (payload?.question) setCurrentQuestion(payload.question);
        if (typeof payload?.questionIndex === 'number') setQuestionIndex(payload.questionIndex);
        if (typeof payload?.totalQuestions === 'number') setTotalQuestions(payload.totalQuestions);

        setGameState('QUESTION_LIVE');
        setIsLocked(false);
        setHasSubmitted(false);
        setSelectedOptionId(null);
        setShowResult(false);
        setIsChestModalOpen(false);
        playClickSoundRef.current();
      })
      .on('broadcast', { event: 'round-locked' }, () => {
        setIsLocked(true);
        setGameState('ROUND_LOCKED');
      })
      .on('broadcast', { event: 'round-reveal' }, () => {
        setShowResult(true);
        setGameState('ROUND_REVEAL');
      })
      .on('broadcast', { event: 'show-leaderboard' }, ({ payload }) => {
        setGameState('LEADERBOARD');
        if (payload?.rankings && Array.isArray(payload.rankings)) {
          setTopRankings(payload.rankings.slice(0, 5));
          const me = payload.rankings.find(
            (r: PlayerPublicRank) => r.playerId === playerId || r.nickname?.trim().toLowerCase() === nicknameRef.current.trim().toLowerCase()
          );
          if (me) {
            setMyRanking({ rank: me.rank, totalScore: me.totalScore });
          }
        }
      })
      .on('broadcast', { event: 'arena-finished' }, ({ payload }) => {
        setGameState('PODIUM');
        if (payload?.rankings && Array.isArray(payload.rankings)) {
          setTopRankings(payload.rankings.slice(0, 3));
          const me = payload.rankings.find(
            (r: PlayerPublicRank) => r.playerId === playerId || r.nickname?.trim().toLowerCase() === nicknameRef.current.trim().toLowerCase()
          );
          if (me) {
            setMyRanking({ rank: me.rank, totalScore: me.totalScore });
          }
        }
      })
      .on('broadcast', { event: 'arena-reset' }, () => {
        setGameState('LOBBY_WAITING');
        setIsLocked(false);
        setHasSubmitted(false);
        setSelectedOptionId(null);
        setShowResult(false);
        setIsChestModalOpen(false);
        setGold(0);
        setMyRanking(null);
        setQuestionIndex(0);
        setCurrentQuestion(ARENA_COLLOCATION_QUESTIONS[0]);
      })
      .on('broadcast', { event: 'players-sync' }, ({ payload }) => {
        if (payload?.players) {
          setPlayersList(payload.players);
          if (payload.players.some((item: any) => item.name?.trim().toLowerCase() === nicknameRef.current.trim().toLowerCase())) {
            setIsJoinedAcknowledged(true);
          }
        }
      })
      .on('broadcast', { event: 'gold-stolen-from-you' }, ({ payload }) => {
        if (payload?.victimName?.trim().toLowerCase() === nicknameRef.current.trim().toLowerCase()) {
          setGold((prev) => Math.max(0, prev - (payload.amount || 0)));
          playWrongSoundRef.current();
        }
      });

    channel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        announcePresence();
      }
    });

    channelRef.current = channel;

    // Định kỳ gửi thông báo hiện diện lên Host khi đang ở sảnh chờ để chắc chắn Host không bỏ sót
    const heartbeatTimer = setInterval(() => {
      if (gameStateRef.current === 'LOBBY_WAITING') {
        announcePresence();
      }
    }, 2000);

    return () => {
      clearInterval(heartbeatTimer);
      supabase.removeChannel(channel);
    };
  }, [pin, playerId]);

  // Đếm lùi thời gian vòng: CHỈ chạy khi trận đấu ĐÃ BẮT ĐẦU (QUESTION_LIVE) và chưa bị khóa
  useEffect(() => {
    if (gameState !== 'QUESTION_LIVE' || isLocked) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsLocked(true);
          setGameState('ROUND_LOCKED');
          setTimeout(() => {
            setShowResult(true);
            setGameState('ROUND_REVEAL');
          }, 2500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameState, isLocked]);

  const isCorrect = selectedOptionId === currentQuestion.correctOptionId;

  // Xử lý khi học sinh chọn đáp án
  const handleSelectOption = useCallback(
    async (optionId: string) => {
      if (isLocked || hasSubmitted) return;

      playClickSound();
      setSelectedOptionId(optionId);
      setHasSubmitted(true);

      const isAnsCorrect = optionId === currentQuestion.correctOptionId;

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
    <div className="min-h-screen min-h-[100dvh] bg-[#150a33] text-white flex flex-col justify-between p-4 font-sans select-none max-w-lg mx-auto w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2a135e] via-[#150a33] to-[#0a051b]">
      {/* Top Header */}
      <header className="flex items-center justify-between border-b border-purple-900/40 pb-3">
        <div className="flex items-center gap-2.5">
          <PvZCardAvatar avatarId={avatarId} seed={avatarId} size="sm" />
          <div>
            <span className="font-black text-sm text-slate-200 truncate max-w-[120px] block">
              {nickname}
            </span>
            <span className="text-[10px] font-bold text-amber-300 block">
              {currentCharacter.name}
            </span>
          </div>
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
        {gameState === 'LOBBY_WAITING' ? (
          /* SẢNH CHỜ HỌC VIÊN - CHUẨN KAHOOT ZERO-FLUFF & PVZ AVATAR */
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-5 py-4 animate-fadeIn">
            <div className="relative">
              <PvZCardAvatar avatarId={avatarId} seed={avatarId} size="xl" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-emerald-500 border-3 border-[#150a33] flex items-center justify-center shadow-lg">
                <span className="w-3 h-3 rounded-full bg-white animate-ping" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold shadow-sm ${
                isJoinedAcknowledged 
                  ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400' 
                  : 'bg-amber-500/15 border border-amber-500/30 text-amber-300'
              }`}>
                <span className={`w-2 h-2 rounded-full ${isJoinedAcknowledged ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400 animate-ping'}`} /> 
                {isJoinedAcknowledged ? 'ĐÃ VÀO PHÒNG (ĐÃ KẾT NỐI MÀN CHIẾU)' : 'ĐANG KẾT NỐI MÀN CHIẾU...'}
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">{nickname}</h2>
              <p className="text-sm font-bold text-amber-300">
                ⭐ Linh vật: {currentCharacter.name}
              </p>
              <p className="text-xs text-slate-300 max-w-xs mx-auto pt-1">
                Nhìn lên màn chiếu của giáo viên. Trận đấu sẽ bắt đầu ngay khi giáo viên bấm Bắt đầu!
              </p>
            </div>

            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl w-full max-w-xs space-y-2.5 text-xs text-slate-300 backdrop-blur-sm">
              <div className="flex justify-between items-center text-slate-400">
                <span>Phòng đấu PIN:</span>
                <span className="font-mono font-black text-orange-400 text-sm tracking-wider">{pin}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Trạng thái:</span>
                <span className={`font-bold flex items-center gap-1.5 ${isJoinedAcknowledged ? 'text-emerald-400' : 'text-amber-400'}`}>
                  <span className={`w-2 h-2 rounded-full ${isJoinedAcknowledged ? 'bg-emerald-400 animate-ping' : 'bg-amber-400 animate-pulse'}`} /> 
                  {isJoinedAcknowledged ? 'Sẵn sàng thi đấu' : 'Đang đồng bộ với Host...'}
                </span>
              </div>
            </div>
          </div>
        ) : gameState === 'LEADERBOARD' ? (
          /* MÀN HÌNH BẢNG XẾP HẠNG TRÊN ĐIỆN THOẠI */
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 py-6 animate-fadeIn">
            <div className="p-6 bg-gradient-to-br from-purple-900/60 to-purple-950/80 border border-purple-700/50 rounded-3xl w-full max-w-xs space-y-4 shadow-2xl">
              <span className="text-xs uppercase font-black text-purple-300 tracking-wider flex items-center justify-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-400" /> VỊ TRÍ CỦA BẠN
              </span>
              <div className="w-20 h-20 rounded-2xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center mx-auto text-3xl font-black text-amber-300 shadow-lg shadow-amber-500/20">
                #{myRanking?.rank ?? 1}
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-black text-white">{nickname}</h3>
                <p className="text-amber-400 font-mono font-black text-base">
                  {myRanking?.totalScore ?? (gameMode === 'GOLD_QUEST' ? gold : 0)}{' '}
                  {gameMode === 'GOLD_QUEST' ? '🪙 Vàng' : 'Điểm'}
                </p>
              </div>
            </div>

            <div className="text-xs text-purple-300/80 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Đang đợi giáo viên chuyển sang câu hỏi tiếp theo...
            </div>
          </div>
        ) : gameState === 'PODIUM' ? (
          /* MÀN HÌNH KẾT THÚC / PODIUM TRÊN ĐIỆN THOẠI */
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 py-6 animate-fadeIn">
            <div className="w-20 h-20 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center mx-auto text-4xl text-amber-300 animate-bounce">
              👑
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-white">TRẬN ĐẤU HOÀN TẤT!</h2>
              <p className="text-amber-300 font-bold text-lg">
                Thứ hạng chung cuộc: #{myRanking?.rank ?? 1}
              </p>
              <p className="text-xs text-purple-200/80 max-w-xs mx-auto">
                Chúc mừng bạn đã hoàn thành xuất sắc tất cả các vòng đấu IELTS Collocation hôm nay!
              </p>
            </div>
          </div>
        ) : !showResult ? (
          <>
            {/* Round info & prompt */}
            <div className="text-center space-y-1">
              <span className="text-[11px] font-mono font-bold text-purple-300 uppercase tracking-widest flex items-center justify-center gap-1">
                {gameMode === 'GOLD_QUEST'
                  ? `💰 CƯỚP VÀNG · CÂU ${questionIndex + 1}/${totalQuestions}`
                  : `🎯 CÂU HỎI ${questionIndex + 1}/${totalQuestions} · 15 GIÂY`}
              </span>
              <h2 className="text-lg md:text-xl font-bold text-white leading-snug">
                "{currentQuestion.prompt}"
              </h2>
            </div>

            {/* Incense Timer */}
            <ArenaIncenseTimer timeLeftSeconds={timeLeft} totalTimeSeconds={15} />

            {/* 4 Interactive Answer Cards */}
            <div className="grid grid-cols-1 gap-2.5 pt-2">
              {currentQuestion.options.map((opt) => (
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
                <span className="font-black text-emerald-400">{currentQuestion.correctAnswerText}</span>
              </div>
              <p className="text-xs text-purple-200/80 leading-relaxed">
                {currentQuestion.correctExplanation}
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
        NextQuiz
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
