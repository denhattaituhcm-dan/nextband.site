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
import { CheckCircle2, XCircle, Trophy, Sparkles, Medal, Crown, BookOpen, Flame, Zap, Clock } from 'lucide-react';
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
  const [gameMode, setGameMode] = useState<'CLASSIC' | 'GOLD_QUEST' | 'ARENA_100'>('CLASSIC');
  const [gold, setGold] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);
  const [maxLives, setMaxLives] = useState<number>(3);
  const [lastLifeDelta, setLastLifeDelta] = useState<number>(0);
  const [wasEliminatedBeforeRound, setWasEliminatedBeforeRound] = useState<boolean>(false);
  const [playersList, setPlayersList] = useState<PlayerCandidate[]>([]);
  const [isChestModalOpen, setIsChestModalOpen] = useState<boolean>(false);
  const [isKicked, setIsKicked] = useState<boolean>(false);
  const [streak, setStreak] = useState<number>(0);

  // Câu hỏi động nhận từ Host
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [totalQuestions, setTotalQuestions] = useState<number>(ARENA_COLLOCATION_QUESTIONS.length);
  const [currentQuestion, setCurrentQuestion] = useState<ArenaQuestion>(ARENA_COLLOCATION_QUESTIONS[0]);
  const [myRanking, setMyRanking] = useState<{ rank: number; totalScore: number } | null>(null);
  const [topRankings, setTopRankings] = useState<PlayerPublicRank[]>([]);

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [roundTimeLimit, setRoundTimeLimit] = useState<number>(15);
  const [timeLeft, setTimeLeft] = useState<number>(15);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isJoinedAcknowledged, setIsJoinedAcknowledged] = useState<boolean>(false);
  const [startCountdown, setStartCountdown] = useState<number | null>(null);
  const isFinalRound = Boolean(totalQuestions > 0 && questionIndex >= totalQuestions - 1);

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
  const isSubmittingRef = useRef<boolean>(false);
  const submittedQuestionIdsRef = useRef<Set<string>>(new Set());
  const handleConfirmAnswerRef = useRef<(fallbackId?: string) => void>(() => {});
  const roundRevealAppliedRef = useRef<number>(-1);
  const livesRef = useRef<number>(lives);
  livesRef.current = lives;

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
            setIsKicked(true);
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
          if (typeof payload?.survivalInitialLives === 'number') setMaxLives(payload.survivalInitialLives);
          if (typeof payload?.lives === 'number') setLives(payload.lives);
          if (payload?.state) {
            if (payload.state === 'QUESTION_LIVE') setGameState('QUESTION_LIVE');
            else if (payload.state === 'ANSWER_LOCKED') setGameState('ROUND_LOCKED');
            else if (payload.state === 'REVEAL_DISTRIBUTION' || payload.state === 'REVEAL_PERSONAL') setGameState('ROUND_REVEAL');
            else if (payload.state === 'LEADERBOARD') setGameState('LEADERBOARD');
            else if (payload.state === 'PODIUM') setGameState('PODIUM');
          }
          if (typeof payload?.timeLeft === 'number') setTimeLeft(payload.timeLeft);
          if (payload?.question) setCurrentQuestion(payload.question);
          if (typeof payload?.totalQuestions === 'number') setTotalQuestions(payload.totalQuestions);
          if (typeof payload?.questionIndex === 'number') {
            const newIndex = payload.questionIndex;
            setQuestionIndex(newIndex);
            const questionKey = `${payload.question?.id || currentQuestion.id}_${newIndex}`;
            if (submittedQuestionIdsRef.current.has(questionKey)) {
              setHasSubmitted(true);
            }
          }
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
        if (typeof payload?.questionIndex === 'number') {
          setQuestionIndex(payload.questionIndex);
          if (payload.questionIndex === 0 && payload.countdown === 3) {
            const initL = typeof payload?.survivalInitialLives === 'number' ? payload.survivalInitialLives : 3;
            setMaxLives(initL);
            setLives(initL);
            setWasEliminatedBeforeRound(false);
            setLastLifeDelta(0);
            roundRevealAppliedRef.current = -1;
          } else if (payload.countdown === 3) {
            setWasEliminatedBeforeRound(livesRef.current <= 0);
            setLastLifeDelta(0);
          }
        }
        if (typeof payload?.totalQuestions === 'number') setTotalQuestions(payload.totalQuestions);
        if (payload?.gameMode) setGameMode(payload.gameMode);
        if (typeof payload?.survivalInitialLives === 'number') setMaxLives(payload.survivalInitialLives);
        if (payload?.timeLimit) {
          setTimeLeft(payload.timeLimit);
          setRoundTimeLimit(payload.timeLimit);
        }

        // Chuẩn bị cho vòng mới: Xóa trạng thái câu cũ để hiển thị màn hình đệm
        setHasSubmitted(false);
        setSelectedOptionId(null);
        setShowResult(false);
        setIsLocked(false);
        setIsChestModalOpen(false);
      })
      .on('broadcast', { event: 'question-live' }, ({ payload }) => {
        recordHeartbeat('question-live');
        setIsJoinedAcknowledged(true);
        setStartCountdown(null);
        if (payload?.gameMode) setGameMode(payload.gameMode);
        if (typeof payload?.survivalInitialLives === 'number') setMaxLives(payload.survivalInitialLives);
        if (payload?.timeLimit) {
          setTimeLeft(payload.timeLimit);
          setRoundTimeLimit(payload.timeLimit);
        } else {
          setTimeLeft(15);
          setRoundTimeLimit(15);
        }

        if (payload?.question) setCurrentQuestion(payload.question);
        if (typeof payload?.questionIndex === 'number') {
          setQuestionIndex(payload.questionIndex);
          if (payload.questionIndex === 0) {
            const initL = typeof payload?.survivalInitialLives === 'number' ? payload.survivalInitialLives : 3;
            setMaxLives(initL);
            setLives(initL);
            setWasEliminatedBeforeRound(false);
            roundRevealAppliedRef.current = -1;
          } else {
            setWasEliminatedBeforeRound(livesRef.current <= 0);
          }
        }
        if (typeof payload?.totalQuestions === 'number') setTotalQuestions(payload.totalQuestions);

        setLastLifeDelta(0);
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
        const initL = typeof payload?.survivalInitialLives === 'number' ? payload.survivalInitialLives : 3;
        setMaxLives(initL);
        setLives(initL);
        setWasEliminatedBeforeRound(false);
        setLastLifeDelta(0);
        roundRevealAppliedRef.current = -1;

        if (payload?.timeLimit) {
          setTimeLeft(payload.timeLimit);
          setRoundTimeLimit(payload.timeLimit);
        } else {
          setTimeLeft(15);
          setRoundTimeLimit(15);
        }

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
        // Khi Host khóa câu hỏi, chỉ khóa giao diện, tuyệt đối không tự động nộp câu trả lời chưa xác nhận
        setIsLocked(true);
        setGameState('ROUND_LOCKED');
      })
      .on('broadcast', { event: 'round-reveal' }, ({ payload }) => {
        if (payload?.survivalUpdates) {
          const myKey = Object.keys(payload.survivalUpdates).find(
            (k) => k.trim().toLowerCase() === nicknameRef.current.trim().toLowerCase()
          );
          if (myKey) {
            const myStat = payload.survivalUpdates[myKey];
            setLives(myStat.lives);
            setMaxLives(myStat.maxLives);
            setLastLifeDelta(myStat.delta);
            setStreak(myStat.streak);
            roundRevealAppliedRef.current = Date.now();
          }
        }
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
            if (typeof me.lives === 'number') setLives(me.lives);
            if (typeof me.maxLives === 'number') setMaxLives(me.maxLives);
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
            if (typeof me.lives === 'number') setLives(me.lives);
            if (typeof me.maxLives === 'number') setMaxLives(me.maxLives);
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
        setLives(maxLives);
        setWasEliminatedBeforeRound(false);
        setLastLifeDelta(0);
        setMyRanking(null);
        setQuestionIndex(0);
        setCurrentQuestion(ARENA_COLLOCATION_QUESTIONS[0]);
      })
      .on('broadcast', { event: 'players-sync' }, ({ payload }) => {
        if (payload?.gameMode) setGameMode(payload.gameMode);
        if (typeof payload?.survivalInitialLives === 'number') setMaxLives(payload.survivalInitialLives);
        if (payload?.players) {
          setPlayersList(payload.players);
          const me = payload.players.find(
            (item: any) => item.name?.trim().toLowerCase() === nicknameRef.current.trim().toLowerCase()
          );
          if (me) {
            setIsJoinedAcknowledged(true);
            if (typeof me.lives === 'number') setLives(me.lives);
            if (typeof me.maxLives === 'number') setMaxLives(me.maxLives);
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
          setIsKicked(true);
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
          // Khi hết thời gian, khóa vòng thi ngay lập tức. Tuyệt đối không tự động nộp bài (auto-submit) nếu học sinh chưa chủ động bấm Xác nhận.
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

  const isCorrect = hasSubmitted && selectedOptionId === currentQuestion.correctOptionId;
  const isUnanswered = !hasSubmitted;

  // Xử lý khi học sinh chọn một phương án (cho phép đổi trước khi bấm Xác nhận)
  const handleSelectOption = useCallback(
    (optionId: string) => {
      if (isLocked || hasSubmitted || isSubmittingRef.current) return;
      playClickSound();
      setSelectedOptionId(optionId);
    },
    [isLocked, hasSubmitted, playClickSound]
  );

  // Xử lý khi học sinh bấm nút xác nhận chốt đáp án
  const handleConfirmAnswer = useCallback(
    async (fallbackOptionId?: string) => {
      const optionId = fallbackOptionId || selectedOptionId;
      const questionKey = `${currentQuestion.id}_${questionIndex}`;

      // Chặn ngay lập tức mọi race condition, multi-touch hoặc click liên tục (Synchronous Lock Guard)
      if (
        !optionId ||
        isLocked ||
        hasSubmittedRef.current ||
        isSubmittingRef.current ||
        submittedQuestionIdsRef.current.has(questionKey)
      ) {
        return;
      }

      // Khóa tức thì đồng bộ trước mọi tác vụ async
      isSubmittingRef.current = true;
      hasSubmittedRef.current = true;
      submittedQuestionIdsRef.current.add(questionKey);
      setHasSubmitted(true);
      setIsSubmitting(true);
      playClickSound();

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
          await arenaApi.submitAnswer({
            roomId,
            playerSessionToken: playerToken,
            questionId: currentQuestion.id,
            roundIndex: questionIndex,
            selectedOptionId: optionId,
            clientTelemetryTime: new Date().toISOString(),
          });
        } catch (err: any) {
          console.warn('[ArenaPlayPage] submitAnswer response/status:', err?.message || err);
          // Nếu server báo đã nộp trước đó (ALREADY_SUBMITTED), tiếp tục giữ khóa an toàn
        } finally {
          setIsSubmitting(false);
          isSubmittingRef.current = false;
        }
      } else {
        setIsSubmitting(false);
        isSubmittingRef.current = false;
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
    if (!showResult) return;
    if (gameMode === 'CLASSIC') {
      if (hasSubmitted && isCorrect) {
        setStreak((prev) => prev + 1);
        playCorrectSound();
      } else {
        setStreak(0);
        playWrongSound();
      }
    } else if (gameMode === 'ARENA_100') {
      if (hasSubmitted && isCorrect) {
        playCorrectSound();
      } else {
        playWrongSound();
      }
      // Fallback tính mạng cục bộ nếu chưa nhận gói survivalUpdates từ Host (ví dụ khi hết giờ tự mở showResult)
      if (roundRevealAppliedRef.current !== questionIndex && Date.now() - roundRevealAppliedRef.current > 2000) {
        roundRevealAppliedRef.current = questionIndex;
        if (!wasEliminatedBeforeRound && livesRef.current > 0) {
          if (hasSubmitted && isCorrect) {
            setStreak((prev) => {
              const nextS = prev + 1;
              if (maxLives > 1 && nextS % 3 === 0 && livesRef.current < maxLives) {
                setLives((l) => Math.min(maxLives, l + 1));
                setLastLifeDelta(1);
              }
              return nextS;
            });
          } else {
            setStreak(0);
            setLives((l) => Math.max(0, l - 1));
            setLastLifeDelta(-1);
          }
        }
      }
    }
  }, [showResult, hasSubmitted, isCorrect, playCorrectSound, playWrongSound, gameMode, questionIndex, wasEliminatedBeforeRound, maxLives]);

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
          {gameMode === 'ARENA_100' && (
            <div
              className={`px-3 py-1 rounded-full text-xs font-black flex items-center gap-1 shadow-sm border ${
                lives > 0
                  ? 'bg-rose-500/20 border-rose-400/50 text-rose-200'
                  : 'bg-slate-800/80 border-slate-600/50 text-slate-300'
              }`}
            >
              {lives > 0 ? (
                <>
                  <span>
                    {Array.from({ length: maxLives }).map((_, i) => (
                      <span key={i} className={i < lives ? 'opacity-100' : 'opacity-25 grayscale'}>
                        ❤️
                      </span>
                    ))}
                  </span>
                  <span className="ml-0.5 text-[10px] text-rose-300 font-mono">
                    {lives}/{maxLives}
                  </span>
                </>
              ) : (
                <span className="text-[10px] text-amber-300">👀 Chế độ Thử Sức</span>
              )}
            </div>
          )}
          <div className="px-2.5 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-mono font-bold text-orange-300">
            PIN: {pin}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-center my-2 space-y-2">
        {startCountdown !== null ? (
          /* MÀN HÌNH ĐẾM LÙI TRƯỚC CÂU HỎI (KÈM CÂU QUYẾT ĐỊNH CHO CÂU CUỐI) */
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 py-6 animate-in zoom-in-95 duration-200">
            {isFinalRound ? (
              // CÂU HỎI QUYẾT ĐỊNH (FINAL ROUND)
              <>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-950/90 via-rose-950/90 to-amber-950/90 border-2 border-amber-400 text-amber-300 text-xs font-black tracking-wide uppercase shadow-lg shadow-amber-950/50 animate-pulse">
                  <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
                  <span>CÂU QUYẾT ĐỊNH · ĐIỂM SỐ x2!</span>
                </div>

                <div className="relative">
                  <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-amber-500/40 via-rose-600/40 to-yellow-500/40 blur-2xl animate-pulse" />
                  <div className="relative flex items-center justify-center w-40 h-40 rounded-full bg-gradient-to-br from-amber-500 via-rose-600 to-amber-700 border-4 border-amber-200 shadow-2xl shadow-amber-500/60">
                    <span className="text-7xl font-black text-white tracking-wider" key={startCountdown}>
                      {startCountdown > 0 ? startCountdown : 'GO!'}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 px-3">
                  <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400">
                    {startCountdown > 0 ? `Câu ${questionIndex + 1} / ${totalQuestions} (Câu Cuối!)` : 'BẮT ĐẦU!'}
                  </h2>
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs font-bold shadow-inner">
                    <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300 animate-pulse" />
                    {gameMode === 'CLASSIC'
                      ? '🎯 Nhân đôi x2 điểm số · Cơ hội bứt phá!'
                      : gameMode === 'ARENA_100'
                      ? '🛡️ Chặng cuối Đấu Trường 100 · Trụ vững đến cùng!'
                      : '💰 Rương vàng cuối cùng · Về đích!'}
                  </div>
                  <p className="text-[11px] text-amber-300/80 pt-0.5">
                    Nhìn lên màn chiếu đọc đề và bấm nút trả lời thật nhanh!
                  </p>
                </div>
              </>
            ) : (
              // CÂU HỎI THƯỜNG
              <>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/60 border border-purple-500/40 text-purple-200 text-xs font-bold tracking-wide uppercase shadow-lg">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>CÂU {questionIndex + 1} / {totalQuestions}</span>
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
                    {startCountdown > 0 ? `Chuẩn bị bước vào Câu ${questionIndex + 1}!` : 'BẮT ĐẦU!'}
                  </h2>
                  <p className="text-xs text-purple-200/80 max-w-xs mx-auto">
                    Nhìn lên màn chiếu để đọc câu hỏi và bấm nút màu tương ứng!
                  </p>
                </div>
              </>
            )}
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
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-2 animate-fadeIn w-full max-w-sm mx-auto">
            <div className="p-4 sm:p-5 bg-gradient-to-br from-purple-900/60 to-purple-950/80 border-2 border-purple-500/40 rounded-3xl w-full space-y-3 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase font-black text-purple-300 tracking-wider flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-amber-400" /> VỊ TRÍ CỦA BẠN
                </span>
                <span className="text-xs font-mono font-bold text-amber-400">
                  {myRanking ? (myRanking.rank === 1 ? '👑 DẪN ĐẦU' : `Cách Top 1: ${Math.max(0, (topRankings[0]?.totalScore || 0) - (myRanking.totalScore || 0))}đ`) : ''}
                </span>
              </div>

              <div className="flex items-center gap-4 bg-purple-950/60 p-3 rounded-2xl border border-purple-700/50">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-2xl font-black text-amber-300 shadow shrink-0">
                  #{myRanking?.rank ?? '--'}
                </div>
                <div className="text-left flex-1 min-w-0">
                  <h3 className="text-lg font-black text-white truncate">{nickname}</h3>
                  <p className="text-amber-400 font-mono font-black text-sm">
                    {myRanking?.totalScore ?? (gameMode === 'GOLD_QUEST' ? gold : 0)}{' '}
                    {gameMode === 'GOLD_QUEST' ? '🪙 Vàng' : 'Điểm'}
                  </p>
                  {gameMode === 'ARENA_100' && (
                    <span className="text-[11px] font-bold text-rose-300 block mt-0.5">
                      {lives > 0 ? `Còn ${lives}/${maxLives} ❤️ trụ hạng` : '👀 Chế độ Thử Sức'}
                    </span>
                  )}
                </div>
                <PvZCardAvatar avatarId={avatarId} seed={avatarId} size="sm" />
              </div>

              {/* Top 3 Leadboard Preview */}
              {topRankings.length > 0 && (
                <div className="pt-2 border-t border-purple-800/40 space-y-1.5 text-left">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Top dẫn đầu hiện tại:
                  </span>
                  <div className="space-y-1">
                    {topRankings.slice(0, 3).map((r) => (
                      <div
                        key={r.playerId}
                        className={`flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-bold ${
                          r.playerId === playerId || r.nickname?.trim().toLowerCase() === nicknameRef.current.trim().toLowerCase()
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
                            : 'bg-white/5 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="font-mono font-black text-amber-400 w-4">#{r.rank}</span>
                          <span className="truncate">{r.nickname}</span>
                        </div>
                        <span className="font-mono text-amber-300 ml-2">
                          {gameMode === 'ARENA_100' && r.lives !== undefined ? `${'❤️'.repeat(Math.max(0, r.lives))} · ` : ''}
                          {r.totalScore}đ
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="text-xs text-purple-300/80 flex items-center justify-center gap-2 pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Đang đợi giáo viên chuyển câu tiếp theo...
            </div>
          </div>
        ) : gameState === 'PODIUM' ? (
          /* MÀN HÌNH KẾT THÚC / PODIUM TRÊN ĐIỆN THOẠI */
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-4 animate-fadeIn">
            <div className="relative">
              <PvZCardAvatar avatarId={avatarId} seed={avatarId} size="lg" />
              <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-amber-400 text-purple-950 flex items-center justify-center font-black text-lg border-2 border-amber-200 shadow-lg">
                {(myRanking?.rank ?? 1) === 1 ? '👑' : (myRanking?.rank ?? 1) === 2 ? '🥈' : (myRanking?.rank ?? 1) === 3 ? '🥉' : `#${myRanking?.rank ?? 1}`}
              </div>
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-black text-white">TRẬN ĐẤU HOÀN TẤT!</h2>
              <p className="text-amber-300 font-black text-lg sm:text-xl">
                Hạng #{myRanking?.rank ?? 1} · {myRanking?.totalScore ?? (gameMode === 'GOLD_QUEST' ? gold : 0)}{' '}
                {gameMode === 'GOLD_QUEST' ? '🪙 Vàng' : 'Điểm'}
              </p>
              <p className="text-xs text-purple-200/80 max-w-xs mx-auto">
                Chúc mừng {nickname} ({currentCharacter.name}) đã hoàn thành tất cả các câu hỏi!
              </p>

              {/* Nút Mở Sổ Tay Học Thuật & Luyện Lại Câu Sai */}
              <div className="pt-3 max-w-xs mx-auto">
                <button
                  onClick={() => setIsRevengeModalOpen(true)}
                  className="w-full py-3.5 px-5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-sm border-2 border-purple-400 shadow-[0_4px_0_0_#3b0764] active:translate-y-1 active:shadow-none flex items-center justify-center gap-2.5 transition select-none cursor-pointer"
                >
                  <BookOpen className="w-5 h-5 text-purple-200" />
                  <span>Sổ Tay Học Thuật ({wrongQuestions.length} câu)</span>
                </button>
              </div>
            </div>
          </div>
        ) : !showResult ? (
          <>
            {/* Banner thông báo Chế độ Thử sức nếu học sinh đã hết mạng trong ARENA_100 */}
            {gameMode === 'ARENA_100' && lives <= 0 && (
              <div className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-400/40 text-amber-200 text-[11px] font-bold text-center">
                👀 Bạn đã hết mạng trụ hạng — Vẫn được chọn đáp án để tự ôn luyện & ghi vào Sổ Tay Học Thuật!
              </div>
            )}

            {/* Round info & prompt */}
            <div className="text-center space-y-0.5">
              <span className="text-[11px] font-mono font-bold text-purple-300 uppercase tracking-widest flex items-center justify-center gap-1">
                {gameMode === 'GOLD_QUEST'
                  ? `💰 CƯỚP VÀNG · CÂU ${questionIndex + 1}/${totalQuestions}`
                  : gameMode === 'ARENA_100'
                  ? `🛡️ ĐẤU TRƯỜNG 100 · CÂU ${questionIndex + 1}/${totalQuestions} · ${roundTimeLimit} GIÂY`
                  : totalQuestions > 0 && questionIndex >= totalQuestions - 1
                  ? `⚡ CÂU CUỐI CÙNG (X2 ĐIỂM) · CÂU ${questionIndex + 1}/${totalQuestions}`
                  : `🎯 CÂU HỎI ${questionIndex + 1}/${totalQuestions} · ${roundTimeLimit} GIÂY`}
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white leading-snug px-2">
                "{currentQuestion.prompt}"
              </h2>
            </div>

            {/* Incense Timer */}
            <ArenaIncenseTimer timeLeftSeconds={timeLeft} totalTimeSeconds={roundTimeLimit} />

            {/* 4 Interactive Answer Cards */}
            <div className="grid grid-cols-1 gap-2 pt-1">
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

            {/* Action Bar: Nút Xác Nhận Đáp Án ghim cố định ở đáy (Sticky Bottom) chống trôi/khuất màn hình mobile */}
            {!hasSubmitted && !isLocked ? (
              <div className="sticky bottom-0 z-30 pt-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))] bg-gradient-to-t from-[#150a33] via-[#150a33]/95 to-transparent backdrop-blur-sm animate-fadeIn">
                <button
                  type="button"
                  onClick={() => handleConfirmAnswer()}
                  disabled={!selectedOptionId || isSubmitting}
                  className={`w-full py-3.5 sm:py-4 px-6 rounded-2xl font-black text-base sm:text-lg flex items-center justify-center gap-2.5 transition-all select-none cursor-pointer ${
                    selectedOptionId && !isSubmitting
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-white border-2 border-emerald-300 shadow-[0_4px_0_0_#064e3b] active:translate-y-1 active:shadow-[0_1px_0_0_#064e3b]'
                      : isSubmitting
                      ? 'bg-emerald-700/80 text-white/90 border-2 border-emerald-500/50 cursor-wait'
                      : 'bg-white/10 text-white/40 border-2 border-white/10 cursor-not-allowed opacity-60'
                  }`}
                >
                  <CheckCircle2 className={`w-5 h-5 sm:w-6 sm:h-6 ${isSubmitting ? 'animate-spin' : ''}`} />
                  <span>
                    {isSubmitting
                      ? 'ĐANG GỬI BÀI...'
                      : selectedOptionId
                      ? `XÁC NHẬN ĐÁP ÁN ${currentQuestion.options.find((o) => o.id === selectedOptionId)?.label}`
                      : 'CHỌN 1 ĐÁP ÁN ĐỂ XÁC NHẬN'}
                  </span>
                </button>
              </div>
            ) : (
              /* Status notice when submitted or locked: Ghim cố định rõ ràng */
              <div className="sticky bottom-0 z-30 pt-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))] bg-gradient-to-t from-[#150a33] via-[#150a33]/95 to-transparent text-center backdrop-blur-sm">
                {hasSubmitted ? (
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-500/20 border-2 border-emerald-400/50 text-emerald-200 font-extrabold text-xs sm:text-sm shadow-xl shadow-emerald-950/60">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>
                      {gameMode === 'GOLD_QUEST' && isCorrect
                        ? '✓ Đã chốt đáp án! Đang chuẩn bị mở Rương Kho Báu...'
                        : `✓ Đã chốt đáp án ${currentQuestion.options.find((o) => o.id === selectedOptionId)?.label || ''}! Hãy nhìn lên màn hình.`}
                    </span>
                  </div>
                ) : (
                  <span className="text-xs text-amber-300 font-semibold inline-block py-2">
                    ⏱ Đã hết thời gian trả lời câu này
                  </span>
                )}
              </div>
            )}
          </>
        ) : (
          /* Personal Micro-feedback Screen */
          <div className="space-y-4 text-center animate-fadeIn py-2">
            <div className="flex justify-center">
              {isUnanswered ? (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-500/20 border-2 border-amber-500 flex items-center justify-center text-amber-400 animate-pulse">
                  <Clock className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>
              ) : isCorrect ? (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 animate-bounce">
                  <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>
              ) : (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-rose-500/20 border-2 border-rose-500 flex items-center justify-center text-rose-400">
                  <XCircle className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                {isUnanswered ? 'HẾT GIỜ CHƯA CHỐT!' : isCorrect ? 'CHÍNH XÁC!' : 'CHƯA CHÍNH XÁC'}
              </h2>
              <p className="text-xs sm:text-sm font-bold text-purple-200">
                {gameMode === 'ARENA_100' ? (
                  wasEliminatedBeforeRound ? (
                    isCorrect
                      ? '👏 Tuyệt vời! Bạn vẫn trả lời đúng trong Chế độ Thử Sức!'
                      : '💡 Đã lưu câu này vào Sổ Tay Học Thuật để bạn ôn tập!'
                  ) : isCorrect ? (
                    lastLifeDelta > 0
                      ? `💖 CHUỖI ${streak} CÂU ĐÚNG! HỒI PHỤC +1 MẠNG (Còn ${lives}/${maxLives} ❤️)`
                      : `🛡️ Trụ hạng an toàn! (Còn ${lives}/${maxLives} ❤️ · Chuỗi ${streak}/3 hồi mạng)`
                  ) : lives > 0 ? (
                    `💔 Mất 1 mạng! Bạn còn ${lives}/${maxLives} ❤️ để tiếp tục chiến đấu!`
                  ) : (
                    '💀 Bạn đã hết mạng trụ hạng! Chuyển sang Chế độ Thử Sức từ câu sau.'
                  )
                ) : isUnanswered ? (
                  'Bạn chưa kịp bấm Xác nhận trước khi hết giờ (0 điểm)'
                ) : isCorrect ? (
                  gameMode === 'GOLD_QUEST'
                    ? `Kho vàng: ${gold} 🪙`
                    : totalQuestions > 0 && questionIndex >= totalQuestions - 1
                    ? '⚡ ĐÃ NHÂN ĐÔI ĐIỂM CÂU CUỐI (X2)!'
                    : streak > 1
                    ? `🔥 Chuỗi ${streak} câu đúng liên tiếp! (+100 Điểm Tốc Độ)`
                    : '+100 Điểm Tốc Độ'
                ) : (
                  'Đừng nản lòng, chú ý collocation tiếp theo'
                )}
              </p>
            </div>

            {/* Individual Diagnostic Card */}
            <div className="p-3 sm:p-4 bg-purple-950/40 border border-purple-800/60 rounded-2xl text-left space-y-1.5 max-w-sm mx-auto w-full">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-purple-300 uppercase">Đáp án chuẩn:</span>
                <span className="font-black text-emerald-400">{currentQuestion.correctAnswerText}</span>
              </div>
              <p className="text-xs text-purple-200/80 leading-relaxed">
                {currentQuestion.correctExplanation}
              </p>
            </div>

            <div className="pt-1">
              <span className="text-xs text-purple-300/80 font-medium">
                {questionIndex >= totalQuestions - 1 ? (
                  <span className="text-amber-300 font-bold block bg-amber-500/10 border border-amber-500/30 p-2.5 rounded-xl animate-pulse">
                    🏁 Câu hỏi cuối cùng đã kết thúc! Hãy ngẩng đầu nhìn lên màn chiếu lớn để theo dõi BỤC VINH DANH QUÁN QUÂN!
                  </span>
                ) : (
                  'Nhìn lên màn hình của Thầy/Cô để xem phân tích chi tiết.'
                )}
              </span>
            </div>
          </div>
        )}
      </main>

      {/* Modal Thông Báo Khi Host Mời Ra Khỏi Phòng */}
      {isKicked && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#180c38] border-2 border-purple-500/50 rounded-3xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-3xl mx-auto">
              👋
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-black text-white">Bạn Đã Rời Sảnh Chờ</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Host đã mời bạn ra khỏi sảnh chờ để bạn có thể đổi tên hoặc chọn lại linh vật.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                window.location.href = `/arena/join?pin=${pin}`;
              }}
              className="w-full py-3.5 bg-[#ea580c] hover:bg-[#c2410c] text-white font-black text-sm rounded-2xl border-2 border-orange-400 shadow-[0_4px_0_0_#9a3412] active:translate-y-1 active:shadow-none transition-all cursor-pointer"
            >
              Vào lại phòng đấu
            </button>
          </div>
        </div>
      )}

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
