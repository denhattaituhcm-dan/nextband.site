/**
 * STUDENT PLAY HUD (/arena/play)
 * Giao diện tương tác trực tiếp của học sinh trên Mobile.
 * Hỗ trợ cả 2 chế độ:
 * - 'CLASSIC': Trả lời câu hỏi -> Khóa câu -> Xem micro-feedback kết quả
 * - 'GOLD_QUEST': Trả lời đúng -> Hiện 3 Rương Kho Báu -> Mở rương / Cướp vàng bạn cùng lớp!
 */

import React, { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useArenaAudio } from '@/hooks/arena/useArenaAudio';
import { StudentAnswerCard } from '@/components/arena/StudentAnswerCard';
import { ArenaIncenseTimer } from '@/components/arena/ArenaIncenseTimer';
import { GoldQuestChestModal } from '@/components/arena/GoldQuestChestModal';
import { QuestionTypeRevengeModal, RevengeQuestionItem } from '@/components/arena/QuestionTypeRevengeModal';
import { ArenaQuestionOption, PlayerPublicRank } from '@/lib/arena/types';
import { ARENA_COLLOCATION_QUESTIONS, ArenaQuestion } from '@/lib/arena/questions';
import { CheckCircle2, XCircle, Trophy, Sparkles, Medal, Crown, BookOpen } from 'lucide-react';
import { PvZCardAvatar } from '@/components/arena/PvZCardAvatar';
import { CHARACTER_AVATARS, getCharacterBySeed } from '@/lib/arena/characterCatalog';
import { ArenaErrorBoundary } from '@/components/arena/ArenaErrorBoundary';
import { useArenaSelfHealing } from '@/hooks/arena/useArenaSelfHealing';
import { arenaTelemetry } from '@/lib/arena/arenaTelemetry';
import { arenaApi } from '@/lib/api';

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
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const rawPin = searchParams.get('pin');
  const pin = rawPin && rawPin.trim().length === 6 ? rawPin.trim() : '';

  useEffect(() => {
    if (!pin) {
      navigate('/arena/join');
    }
  }, [pin, navigate]);
  const nickname = searchParams.get('name') || 'Học viên';
  const playerId = searchParams.get('playerId') || `p_${Date.now()}`;
  const rawRoomId = searchParams.get('roomId') || (typeof window !== 'undefined' ? sessionStorage.getItem('arena_room_id') : '');
  const [roomId, setRoomId] = useState<string>(rawRoomId || '');
  const playerToken = typeof window !== 'undefined' ? sessionStorage.getItem('arena_player_token') || '' : '';
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
  const [startCountdown, setStartCountdown] = useState<number | null>(null);

  // State theo dõi các câu làm sai để phục vụ Sổ tay học thuật sau trận
  const [wrongQuestions, setWrongQuestions] = useState<RevengeQuestionItem[]>([]);
  const [isRevengeModalOpen, setIsRevengeModalOpen] = useState<boolean>(false);

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
  const selectedOptionIdRef = useRef<string | null>(selectedOptionId);
  selectedOptionIdRef.current = selectedOptionId;
  const hasSubmittedRef = useRef<boolean>(hasSubmitted);
  hasSubmittedRef.current = hasSubmitted;
  const handleConfirmAnswerRef = useRef<(fallbackId?: string) => void>(() => {});

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

      bc.onmessage = (event) => {
        if (event.data?.type === 'player-kicked') {
          const payload = event.data.payload;
          const myName = nicknameRef.current?.trim().toLowerCase();
          const kickedName = (payload?.nickname || '').trim().toLowerCase();
          if (payload?.participantId === playerId || (kickedName.length > 0 && kickedName === myName)) {
            sessionStorage.removeItem(`arena_session_${pin}`);
            sessionStorage.removeItem(`arena_player_${pin}`);
            alert('Host đã mời bạn ra khỏi sảnh chờ để bạn có thể đặt lại tên hoặc đăng nhập lại.');
            window.location.href = `/arena/join?pin=${pin}`;
          }
        }
      };

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

    const trackPresence = async () => {
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
      })
      .on('broadcast', { event: 'arena-countdown' }, ({ payload }) => {
        setIsJoinedAcknowledged(true);
        if (typeof payload?.countdown === 'number') {
          setStartCountdown(payload.countdown);
          if (payload.countdown === 0) {
            setTimeout(() => setStartCountdown(null), 800);
          }
        }
        if (payload?.question) setCurrentQuestion(payload.question);
        if (typeof payload?.questionIndex === 'number') setQuestionIndex(payload.questionIndex);
        if (typeof payload?.totalQuestions === 'number') setTotalQuestions(payload.totalQuestions);
        if (payload?.gameMode) setGameMode(payload.gameMode);
        if (payload?.timeLimit) setTimeLeft(payload.timeLimit);
      })
      .on('broadcast', { event: 'question-live' }, ({ payload }) => {
        recordHeartbeat('question-live');
        setIsJoinedAcknowledged(true);
        setStartCountdown(null);
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
        setStartCountdown(null);
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
        if (selectedOptionIdRef.current && !hasSubmittedRef.current) {
          handleConfirmAnswerRef.current(selectedOptionIdRef.current);
        }
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
      })
      .on('broadcast', { event: 'player-kicked' }, ({ payload }) => {
        const myName = nicknameRef.current?.trim().toLowerCase();
        const kickedName = (payload?.nickname || '').trim().toLowerCase();
        const isMe =
          payload?.participantId === playerId ||
          (kickedName.length > 0 && kickedName === myName);

        if (isMe) {
          if (typeof window !== 'undefined') {
            sessionStorage.removeItem(`arena_session_${pin}`);
            sessionStorage.removeItem(`arena_player_${pin}`);
          }
          alert('Host đã mời bạn ra khỏi sảnh chờ để bạn có thể đặt lại tên hoặc đăng nhập lại.');
          window.location.href = `/arena/join?pin=${pin}`;
        }
      });

    channel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await trackPresence();
        setIsJoinedAcknowledged(true);
      }
    });

    channelRef.current = channel;

    return () => {
      channel.untrack().catch(() => {});
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
          if (selectedOptionIdRef.current && !hasSubmittedRef.current) {
            handleConfirmAnswerRef.current(selectedOptionIdRef.current);
          }
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

  // Xử lý khi học sinh chọn một phương án (cho phép đổi trước khi bấm Xác nhận)
  const handleSelectOption = useCallback(
    (optionId: string) => {
      if (isLocked || hasSubmitted) return;
      playClickSound();
      setSelectedOptionId(optionId);
    },
    [isLocked, hasSubmitted, playClickSound]
  );

  // Xử lý khi học sinh bấm nút xác nhận chốt đáp án
  const handleConfirmAnswer = useCallback(
    async (fallbackOptionId?: string) => {
      const optionId = fallbackOptionId || selectedOptionId;
      if (!optionId || isLocked || hasSubmitted) return;

      playClickSound();
      setHasSubmitted(true);

      const isAnsCorrect = optionId === currentQuestion.correctOptionId;

      // Thu thập câu trả lời sai vào sổ tay ôn tập cá nhân
      if (!isAnsCorrect) {
        setWrongQuestions((prev) => {
          if (prev.some((q) => q.id === currentQuestion.id)) return prev;
          return [
            ...prev,
            {
              id: currentQuestion.id,
              prompt: currentQuestion.prompt,
              options: currentQuestion.options,
              correctOptionId: currentQuestion.correctOptionId,
              correctAnswerText: currentQuestion.correctAnswerText,
              correctExplanation: currentQuestion.correctExplanation,
              selectedOptionId: optionId,
              isCorrect: false,
            },
          ];
        });
      }

      // Gửi nộp bài Authoritative lên Server
      if (roomId && playerToken) {
        try {
          arenaApi.submitAnswer({
            roomId,
            playerSessionToken: playerToken,
            questionId: currentQuestion.id,
            roundIndex: questionIndex,
            selectedOptionId: optionId,
            clientTelemetryTime: new Date().toISOString(),
          }).catch((err) => {
            console.warn('[ArenaPlayPage] submitAnswer warning:', err);
          });
        } catch (e) {
          console.warn('[ArenaPlayPage] Error initiating submitAnswer:', e);
        }
      }

      // Gửi broadcast đáp án của học sinh lên Host để hiển thị real-time
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
    [
      selectedOptionId,
      isLocked,
      hasSubmitted,
      playClickSound,
      currentQuestion,
      roomId,
      playerToken,
      questionIndex,
      nickname,
      timeLeft,
      gold,
      gameMode,
    ]
  );

  handleConfirmAnswerRef.current = handleConfirmAnswer;

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
        {startCountdown !== null ? (
          /* MÀN HÌNH ĐẾM LÙI KHỞI ĐỘNG CÂU 1 (3... 2... 1... BẮT ĐẦU!) */
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 py-6 animate-in zoom-in-95 duration-200">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/60 border border-purple-500/40 text-purple-200 text-xs font-bold tracking-wide uppercase shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Chuẩn Bị Bắt Đầu!
            </div>

            <div className="relative">
              <div className="absolute -inset-6 rounded-full bg-purple-600/30 blur-xl animate-pulse" />
              <div className="relative flex items-center justify-center w-36 h-36 rounded-full bg-gradient-to-br from-purple-600 to-indigo-800 border-4 border-purple-300/60 shadow-2xl shadow-purple-600/50">
                <span className="text-6xl font-black text-white tracking-wider" key={startCountdown}>
                  {startCountdown > 0 ? startCountdown : 'GO!'}
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-black text-white">
                {startCountdown > 0 ? 'Sẵn sàng chọn đáp án!' : 'BẮT ĐẦU!'}
              </h2>
              <p className="text-xs text-purple-200/80 max-w-xs mx-auto">
                Nhìn lên màn chiếu để đọc câu hỏi và bấm nút màu tương ứng!
              </p>
            </div>
          </div>
        ) : gameState === 'LOBBY_WAITING' ? (
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
                Chúc mừng bạn đã hoàn thành xuất sắc tất cả các vòng đấu hôm nay!
              </p>

              {/* Nút Mở Sổ Tay Học Thuật & Luyện Lại Câu Sai */}
              <div className="pt-4 max-w-xs mx-auto">
                <button
                  onClick={() => setIsRevengeModalOpen(true)}
                  className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-purple-900/50 border border-purple-400/40 flex items-center justify-center gap-2.5 transition active:scale-95"
                >
                  <BookOpen className="w-5 h-5 text-purple-200" />
                  <span>Sổ Tay Học Thuật ({wrongQuestions.length} câu cần củng cố)</span>
                </button>
                <p className="text-[11px] text-purple-300/70 mt-1.5 font-medium">
                  Chạm để xem giải thích bẫy kiến thức & luyện lại ngay
                </p>
              </div>
            </div>
          </div>
        ) : !showResult ? (
          <>
            {/* Round info & prompt */}
            <div className="text-center space-y-1">
              <span className="text-[11px] font-mono font-bold text-purple-300 uppercase tracking-widest flex items-center justify-center gap-1">
                {gameMode === 'GOLD_QUEST'
                  ? `💰 CƯỚP VÀNG · CÂU ${questionIndex + 1}/${totalQuestions}`
                  : totalQuestions > 0 && questionIndex >= totalQuestions - 1
                  ? `⚡ CÂU CUỐI CÙNG (X2 ĐIỂM) · CÂU ${questionIndex + 1}/${totalQuestions}`
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
                  isConfirmed={hasSubmitted && selectedOptionId === opt.id}
                  isLocked={isLocked || hasSubmitted}
                  onSelect={handleSelectOption}
                />
              ))}
            </div>

            {/* Action Bar: Nút Xác Nhận Đáp Án để tránh bấm nhầm */}
            {!hasSubmitted && !isLocked ? (
              <div className="pt-2 animate-fadeIn space-y-2">
                <button
                  type="button"
                  onClick={() => handleConfirmAnswer()}
                  disabled={!selectedOptionId}
                  className={`w-full py-4 px-6 rounded-2xl font-black text-base sm:text-lg flex items-center justify-center gap-2.5 transition-all shadow-xl cursor-pointer ${
                    selectedOptionId
                      ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-emerald-500/30 active:scale-95 animate-pulse'
                      : 'bg-white/10 text-white/40 border border-white/10 cursor-not-allowed opacity-60'
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span>
                    {selectedOptionId
                      ? `XÁC NHẬN ĐÁP ÁN ${currentQuestion.options.find((o) => o.id === selectedOptionId)?.label}`
                      : 'CHỌN 1 ĐÁP ÁN ĐỂ XÁC NHẬN'}
                  </span>
                </button>
                <p className="text-[11px] text-purple-300/80 text-center font-medium">
                  {selectedOptionId
                    ? '💡 Bạn có thể chạm đáp án khác để đổi ý trước khi bấm Xác nhận'
                    : 'Chạm vào 1 đáp án ở trên, sau đó bấm Xác nhận'}
                </p>
              </div>
            ) : (
              /* Status notice when submitted or locked */
              <div className="text-center pt-2">
                {hasSubmitted ? (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-bold text-xs sm:text-sm shadow-md animate-pulse">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>
                      {gameMode === 'GOLD_QUEST' && isCorrect
                        ? '✓ Chính xác! Đang chuẩn bị mở Rương Kho Báu...'
                        : `✓ Đã chốt đáp án ${currentQuestion.options.find((o) => o.id === selectedOptionId)?.label || ''}! Đang chờ khóa câu...`}
                    </span>
                  </div>
                ) : (
                  <span className="text-xs text-slate-400 font-semibold">
                    Đã hết thời gian trả lời
                  </span>
                )}
              </div>
            )}
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
                {isCorrect
                  ? gameMode === 'GOLD_QUEST'
                    ? `Kho vàng: ${gold} 🪙`
                    : totalQuestions > 0 && questionIndex >= totalQuestions - 1
                    ? '⚡ ĐÃ NHÂN ĐÔI ĐIỂM CÂU CUỐI (X2)!'
                    : '+100 Điểm Tốc Độ'
                  : 'Đừng nản lòng, chú ý collocation tiếp theo'}
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
              <span className="text-xs text-purple-300/80 font-medium">
                {questionIndex >= totalQuestions - 1 ? (
                  <span className="text-amber-300 font-bold block bg-amber-500/10 border border-amber-500/30 p-2.5 rounded-xl animate-pulse">
                    🏁 Câu hỏi cuối cùng đã kết thúc! Điểm số chung cuộc đang được giữ bí mật. Hãy ngẩng đầu nhìn lên màn chiếu lớn để theo dõi BỤC VINH DANH QUÁN QUÂN!
                  </span>
                ) : (
                  'Nhìn lên màn hình của Thầy/Cô để xem phân tích chi tiết.'
                )}
              </span>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-2 border-t border-purple-900/40 text-[11px] text-purple-300/60 font-medium">
        NextQuiz
      </footer>

      {/* Modal Sổ Tay Học Thuật & Phục Thù Câu Sai */}
      <QuestionTypeRevengeModal
        isOpen={isRevengeModalOpen}
        onClose={() => setIsRevengeModalOpen(false)}
        wrongQuestions={wrongQuestions}
        allQuestionsCount={totalQuestions}
      />

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
