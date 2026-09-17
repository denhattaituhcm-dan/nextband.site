/**
 * TEACHER HOST VIEW (/arena/host)
 * Màn hình trình chiếu của Giáo viên cho phòng học 10-20 học viên.
 * Hỗ trợ 2 chế độ:
 * 1. 'CLASSIC': Kahoot Cổ Điển (Đua điểm trắc nghiệm)
 * 2. 'GOLD_QUEST': Cướp Vàng (Mở rương, Live Gold Leaderboard, Cướp vàng trực tiếp giữa học sinh)
 * Mặc định: Giữ nguyên chế độ Cổ điển nếu giáo viên không chỉnh gì trong Cài đặt.
 */

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useArenaAudio } from '@/hooks/arena/useArenaAudio';
import { ArenaLobbyKahoot, LobbyPlayer } from '@/components/arena/ArenaLobbyKahoot';
import { ArenaIncenseTimer } from '@/components/arena/ArenaIncenseTimer';
import { TeacherContextualButton } from '@/components/arena/TeacherContextualButton';
import { HostSettingsModal, RoomSettings, DEFAULT_ROOM_SETTINGS } from '@/components/arena/HostSettingsModal';
import { ArenaPodiumView } from '@/components/arena/ArenaPodiumView';
import { ArenaState, HostCommandType, PlayerPublicRank } from '@/lib/arena/types';
import { ARENA_COLLOCATION_QUESTIONS, ArenaQuestion } from '@/lib/arena/questions';
import { Volume2, VolumeX, CheckCircle2, Sparkles, Settings, Trophy } from 'lucide-react';

interface PlayerAnswerRecord {
  playerId: string;
  nickname: string;
  optionId: string;
  timeLeft: number;
  score: number;
  gold?: number;
}

export default function ArenaHostPage() {
  const [searchParams] = useSearchParams();
  const [pinCode] = useState<string>(() => {
    const urlPin = searchParams.get('pin');
    if (urlPin && urlPin.trim().length === 6) return urlPin.trim();
    return '111999';
  });

  const [state, setState] = useState<ArenaState>('LOBBY');
  
  // Cài đặt thông số phòng (Mặc định chuẩn nếu giáo viên không chỉnh gì)
  const [roomSettings, setRoomSettings] = useState<RoomSettings>(DEFAULT_ROOM_SETTINGS);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Quản lý câu hỏi đa vòng & Tổng điểm tích lũy qua các vòng
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [cumulativeScores, setCumulativeScores] = useState<Record<string, number>>({});

  const currentQuestion = ARENA_COLLOCATION_QUESTIONS[questionIndex] || ARENA_COLLOCATION_QUESTIONS[0];
  const totalQuestions = ARENA_COLLOCATION_QUESTIONS.length;
  const isLastRound = questionIndex >= totalQuestions - 1;

  // Phòng rỗng 100%, chỉ có học sinh thật tham gia qua Broadcast
  const [players, setPlayers] = useState<LobbyPlayer[]>([]);
  const [answers, setAnswers] = useState<Record<string, PlayerAnswerRecord>>({});
  const [playerGoldMap, setPlayerGoldMap] = useState<Record<string, number>>({});
  const [liveLogs, setLiveLogs] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(DEFAULT_ROOM_SETTINGS.timeLimit);

  const {
    isBgmEnabled,
    playLobbyBgm,
    stopLobbyBgm,
    startQuestionSuspense,
    stopQuestionSuspense,
    toggleBgm,
    playCorrectSound,
    playClimberSound,
    playPodiumSound,
    playClickSound,
  } = useArenaAudio();

  const channelRef = useRef<any>(null);
  const stateRef = useRef<ArenaState>(state);
  stateRef.current = state;
  const currentQuestionRef = useRef<ArenaQuestion>(currentQuestion);
  currentQuestionRef.current = currentQuestion;
  const roomSettingsRef = useRef<RoomSettings>(roomSettings);
  roomSettingsRef.current = roomSettings;
  const pinCodeRef = useRef<string>(pinCode);
  pinCodeRef.current = pinCode;

  // Lắng nghe học sinh tham gia realtime và các sự kiện cướp vàng qua Supabase Broadcast Channel
  useEffect(() => {
    if (!pinCode) return;

    const channelName = `arena-room-${pinCode}`;
    const topic = `realtime:${channelName}`;
    
    // Dọn dẹp channel cũ nếu còn tồn tại trong bộ nhớ Supabase client
    const existing = supabase.getChannels().find((c) => c.topic === topic);
    if (existing) {
      supabase.removeChannel(existing);
    }

    const channel = supabase.channel(channelName, {
      config: {
        broadcast: { ack: true, self: false },
        presence: { key: 'host' },
      },
    });

    const registerPlayer = (p: {
      id?: string;
      name?: string;
      nickname?: string;
      avatarSeed?: any;
      avatarId?: any;
      rank?: string;
      joinedAt?: string;
    }) => {
      const playerName = (p.name || p.nickname || '').trim();
      if (!playerName || playerName === 'host') return;
      const playerId = p.id || `p_${playerName}`;

      setPlayers((prev) => {
        const existingIdx = prev.findIndex((item) => item.id === playerId || item.name.toLowerCase() === playerName.toLowerCase());
        if (existingIdx >= 0) {
          return prev;
        }
        return [
          ...prev,
          {
            id: playerId,
            name: playerName,
            avatarSeed: p.avatarSeed ?? p.avatarId ?? playerName,
            rank: p.rank || 'Học viên',
            joinedAt: p.joinedAt || new Date().toISOString(),
          },
        ];
      });

      setPlayerGoldMap((prev) => ({ ...prev, [playerName]: prev[playerName] ?? 0 }));

      // Phản hồi ACK xác nhận cho học sinh
      try {
        channel.send({
          type: 'broadcast',
          event: 'player-joined-ack',
          payload: {
            playerId: playerId,
            pin: pinCode,
            accepted: true,
          },
        });
      } catch (err) {
        console.warn('[ArenaHost] Error sending player-joined-ack:', err);
      }
    };

    channel
      .on('presence', { event: 'sync' }, () => {
        const presenceState = channel.presenceState();
        Object.values(presenceState).forEach((presences: any) => {
          if (Array.isArray(presences)) {
            presences.forEach((p: any) => registerPlayer(p));
          }
        });
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        if (Array.isArray(newPresences)) {
          newPresences.forEach((p: any) => registerPlayer(p));
        }
      })
      .on('broadcast', { event: 'player-joined' }, ({ payload }) => {
        if (!payload) return;
        registerPlayer(payload);
        playClickSound();
      })
      .on('broadcast', { event: 'player-sync-request' }, ({ payload }) => {
        if (!payload || !payload.playerId) return;
        if (payload.nickname || payload.name) {
          registerPlayer({ id: payload.playerId, name: payload.nickname || payload.name });
        }
        // Phản hồi trạng thái hiện tại của phòng cho học sinh
        try {
          channel.send({
            type: 'broadcast',
            event: 'player-sync-response',
            payload: {
              targetPlayerId: payload.playerId,
              pin: pinCodeRef.current,
              state: stateRef.current,
              questionIndex,
              totalQuestions,
              question: currentQuestionRef.current,
              timeLeft,
              gameMode: roomSettingsRef.current.gameMode,
            },
          });
        } catch (err) {
          console.warn('[ArenaHost] Error sending player-sync-response:', err);
        }
      })
      .on('broadcast', { event: 'player-answered' }, ({ payload }) => {
        if (!payload || !payload.nickname) return;
        const optionId = payload.optionId;
        const isCorrect = optionId === currentQuestionRef.current.correctOptionId;
        
        let score = 0;
        if (isCorrect) {
          if (roomSettingsRef.current.scoringMode === 'double') {
            score = (100 + (payload.timeLeft || 1) * 10) * 2;
          } else if (roomSettingsRef.current.scoringMode === 'no_points') {
            score = 0;
          } else {
            score = 100 + (payload.timeLeft || 1) * 10;
          }
        }

        setAnswers((prev) => ({
          ...prev,
          [payload.nickname]: {
            playerId: payload.nickname,
            nickname: payload.nickname,
            optionId,
            timeLeft: payload.timeLeft || 0,
            score,
            gold: payload.gold || 0,
          },
        }));

        if (score > 0) {
          setCumulativeScores((prev) => ({
            ...prev,
            [payload.nickname]: (prev[payload.nickname] || 0) + score,
          }));
        }
      })
      .on('broadcast', { event: 'gold-updated' }, ({ payload }) => {
        if (payload?.nickname && typeof payload.gold === 'number') {
          setPlayerGoldMap((prev) => ({ ...prev, [payload.nickname]: payload.gold }));
        }
      })
      .on('broadcast', { event: 'gold-steal-event' }, ({ payload }) => {
        const { thiefName, victimName, amount } = payload;
        if (thiefName && victimName && amount) {
          setPlayerGoldMap((prev) => {
            const victimCurrent = prev[victimName] || 0;
            const thiefCurrent = prev[thiefName] || 0;
            return {
              ...prev,
              [victimName]: Math.max(0, victimCurrent - amount),
              [thiefName]: thiefCurrent + amount,
            };
          });

          // Gửi thông báo cho nạn nhân biết vừa bị cướp
          try {
            channel.send({
              type: 'broadcast',
              event: 'gold-stolen-from-you',
              payload: { victimName, amount },
            });
          } catch (e) {}

          // Thêm thông báo vào Live feed trên máy chiếu
          const logMsg = `🚨 [${thiefName}] vừa cướp ${amount} vàng từ [${victimName}]!`;
          setLiveLogs((prev) => [logMsg, ...prev.slice(0, 4)]);
          playClimberSound();
        }
      })
      .subscribe((status) => {
        console.log(`[ArenaHost] Channel arena-room-${pinCode} status:`, status);
      });

    channelRef.current = channel;

    return () => {
      supabase.removeChannel(channel);
    };
  }, [pinCode]);

  // Ping định kỳ học sinh đang chờ trong Lobby để sync danh sách
  useEffect(() => {
    if (state !== 'LOBBY' || !channelRef.current) return;
    const interval = setInterval(() => {
      channelRef.current?.send({
        type: 'broadcast',
        event: 'lobby-ping',
      });
    }, 2500);
    return () => clearInterval(interval);
  }, [state]);

  // Định kỳ gửi danh sách người chơi và số vàng sang các học sinh để làm mục tiêu cướp vàng
  useEffect(() => {
    if (!channelRef.current || players.length === 0) return;
    const candidates = players.map((p) => ({
      name: p.name,
      gold: playerGoldMap[p.name] || 0,
    }));
    channelRef.current.send({
      type: 'broadcast',
      event: 'players-sync',
      payload: { players: candidates },
    });
  }, [players, playerGoldMap]);

  // Tính toán tỷ lệ phần trăm phân bố đáp án thực tế từ học sinh thật
  const distribution = useMemo(() => {
    const total = Object.keys(answers).length;
    if (total === 0) {
      return { A: 0, B: 0, C: 0, D: 0 };
    }
    const counts = { A: 0, B: 0, C: 0, D: 0 };
    Object.values(answers).forEach((ans) => {
      if (ans.optionId === 'opt_A') counts.A++;
      else if (ans.optionId === 'opt_B') counts.B++;
      else if (ans.optionId === 'opt_C') counts.C++;
      else if (ans.optionId === 'opt_D') counts.D++;
    });

    return {
      A: Math.round((counts.A / total) * 100),
      B: Math.round((counts.B / total) * 100),
      C: Math.round((counts.C / total) * 100),
      D: Math.round((counts.D / total) * 100),
    };
  }, [answers]);

  // Bảng xếp hạng toàn diện tất cả người chơi
  const allRankings: PlayerPublicRank[] = useMemo(() => {
    if (roomSettings.gameMode === 'GOLD_QUEST') {
      const sorted = Object.entries(playerGoldMap).sort(([, a], [, b]) => b - a);
      return sorted.map(([name, gold], idx) => ({
        rank: idx + 1,
        playerId: name,
        nickname: name,
        totalScore: gold,
      }));
    }

    const scoreMap: Record<string, number> = { ...cumulativeScores };
    players.forEach((p) => {
      if (scoreMap[p.name] === undefined) {
        scoreMap[p.name] = 0;
      }
    });

    const sorted = Object.entries(scoreMap).sort(([, a], [, b]) => b - a);
    return sorted.map(([name, score], idx) => ({
      rank: idx + 1,
      playerId: name,
      nickname: name,
      totalScore: score,
    }));
  }, [cumulativeScores, playerGoldMap, players, roomSettings.gameMode]);

  const topFive: PlayerPublicRank[] = useMemo(() => allRankings.slice(0, 5), [allRankings]);

  // Phát BGM ở Lobby
  useEffect(() => {
    if (state === 'LOBBY') {
      playLobbyBgm();
    } else {
      stopLobbyBgm();
    }
  }, [state, playLobbyBgm, stopLobbyBgm]);

  // Bộ đếm lùi thời gian khi câu hỏi đang LIVE
  useEffect(() => {
    if (state !== 'QUESTION_LIVE') return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          stopQuestionSuspense();
          setState('ANSWER_LOCKED');
          if (channelRef.current) {
            channelRef.current.send({
              type: 'broadcast',
              event: 'round-locked',
            });
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [state, stopQuestionSuspense]);

  // Điều phối chuyển trạng thái bằng Single Button
  const handleExecuteCommand = useCallback(
    (command: HostCommandType) => {
      switch (command) {
        case 'START_ARENA':
          setQuestionIndex(0);
          setAnswers({});
          setCumulativeScores({});
          setState('QUESTION_LIVE');
          setTimeLeft(roomSettings.timeLimit);
          startQuestionSuspense(roomSettings.timeLimit);
          if (channelRef.current) {
            const firstQ = ARENA_COLLOCATION_QUESTIONS[0];
            const payload = {
              pin: pinCode,
              timeLimit: roomSettings.timeLimit,
              gameMode: roomSettings.gameMode,
              questionIndex: 0,
              totalQuestions: ARENA_COLLOCATION_QUESTIONS.length,
              question: firstQ,
            };
            channelRef.current.send({
              type: 'broadcast',
              event: 'question-live',
              payload,
            });
            channelRef.current.send({
              type: 'broadcast',
              event: 'arena-started',
              payload,
            });
          }
          break;
        case 'LOCK_ROUND':
          stopQuestionSuspense();
          setState('ANSWER_LOCKED');
          if (channelRef.current) {
            channelRef.current.send({
              type: 'broadcast',
              event: 'round-locked',
            });
          }
          break;
        case 'REVEAL_DISTRIBUTION':
          setState('REVEAL_DISTRIBUTION');
          if (channelRef.current) {
            channelRef.current.send({
              type: 'broadcast',
              event: 'show-distribution',
              payload: { distribution },
            });
          }
          break;
        case 'REVEAL_PERSONAL':
          playCorrectSound();
          setState('REVEAL_PERSONAL');
          if (channelRef.current) {
            channelRef.current.send({
              type: 'broadcast',
              event: 'round-reveal',
              payload: {
                correctOptionId: currentQuestion.correctOptionId,
                explanation: currentQuestion.correctExplanation,
              },
            });
          }
          break;
        case 'START_DEBRIEF':
          setState('TEACHER_DEBRIEF');
          break;
        case 'SHOW_LEADERBOARD':
          playClimberSound();
          setState('LEADERBOARD');
          if (channelRef.current) {
            channelRef.current.send({
              type: 'broadcast',
              event: 'show-leaderboard',
              payload: {
                rankings: allRankings,
              },
            });
          }
          break;
        case 'NEXT_ROUND':
          if (isLastRound) {
            stopQuestionSuspense();
            playPodiumSound();
            setState('PODIUM');
            if (channelRef.current) {
              channelRef.current.send({
                type: 'broadcast',
                event: 'arena-finished',
                payload: {
                  podium: allRankings.slice(0, 3),
                  rankings: allRankings,
                },
              });
            }
          } else {
            const nextIdx = questionIndex + 1;
            setQuestionIndex(nextIdx);
            setAnswers({});
            setTimeLeft(roomSettings.timeLimit);
            setState('QUESTION_LIVE');
            startQuestionSuspense(roomSettings.timeLimit);
            if (channelRef.current) {
              const nextQ = ARENA_COLLOCATION_QUESTIONS[nextIdx];
              channelRef.current.send({
                type: 'broadcast',
                event: 'question-live',
                payload: {
                  pin: pinCode,
                  timeLimit: roomSettings.timeLimit,
                  gameMode: roomSettings.gameMode,
                  questionIndex: nextIdx,
                  totalQuestions: ARENA_COLLOCATION_QUESTIONS.length,
                  question: nextQ,
                },
              });
            }
          }
          break;
        case 'RESTART_ARENA':
          stopQuestionSuspense();
          setQuestionIndex(0);
          setAnswers({});
          setCumulativeScores({});
          setState('LOBBY');
          if (channelRef.current) {
            channelRef.current.send({
              type: 'broadcast',
              event: 'arena-reset',
            });
          }
          break;
      }
    },
    [
      pinCode,
      playCorrectSound,
      playClimberSound,
      playPodiumSound,
      startQuestionSuspense,
      stopQuestionSuspense,
      roomSettings.timeLimit,
      roomSettings.gameMode,
      distribution,
      currentQuestion,
      isLastRound,
      questionIndex,
      allRankings,
    ]
  );

  const joinUrl = typeof window !== 'undefined' ? `${window.location.origin}/arena/join` : '/arena/join';

  return (
    <div className="min-h-screen bg-[#150a33] text-white flex flex-col justify-between p-6 select-none font-sans bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2a135e] via-[#150a33] to-[#0a051b]">
      {/* Top Header Bar */}
      <header className="flex items-center justify-between border-b border-purple-900/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 font-black text-sm">
            NQ
          </div>
          <div>
            <h1 className="text-base font-black tracking-wide text-slate-200">NEXTQUIZ</h1>
            <span className="text-xs text-purple-300/70 font-medium">
              NextQuiz Classroom Engine · {roomSettings.gameMode === 'GOLD_QUEST' ? 'Chế độ Cướp Vàng 💰' : 'Chế độ Cổ điển 🎯'}
            </span>
          </div>
        </div>

        {/* Nút Cài đặt & Music Toggle */}
        <div className="flex items-center gap-3">
          {state === 'LOBBY' && (
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="flex items-center gap-2 px-3.5 py-1.5 bg-purple-900/40 hover:bg-purple-800/60 border border-purple-500/30 text-xs font-bold rounded-full transition-all cursor-pointer text-purple-200 hover:text-white"
            >
              <Settings className="w-4 h-4 text-purple-300" />
              <span>Cài đặt ({roomSettings.gameMode === 'GOLD_QUEST' ? 'Cướp Vàng' : 'Cổ Điển'})</span>
            </button>
          )}

          <button
            onClick={toggleBgm}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-purple-950/60 hover:bg-purple-900/60 border border-purple-800/60 text-xs font-bold rounded-full transition-all cursor-pointer text-slate-300"
          >
            {isBgmEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-emerald-400" /> Nhạc bật
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-slate-500" /> Nhạc tắt
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Classroom Projection Display */}
      <main className="flex-1 flex flex-col items-center justify-center my-6 text-center max-w-6xl mx-auto w-full">
        {state === 'LOBBY' && (
          <ArenaLobbyKahoot
            players={players}
            maxSlots={roomSettings.maxSlots}
            pinCode={pinCode}
            joinUrl={typeof window !== 'undefined' ? `${window.location.origin}/arena/join` : 'https://nextband.site/arena/join'}
          />
        )}

        {state === 'QUESTION_LIVE' && (
          <div className="w-full space-y-6">
            <div className="text-purple-300 text-xs font-mono font-bold tracking-widest uppercase flex items-center justify-center gap-2">
              <span>CÂU HỎI {questionIndex + 1} / {totalQuestions} · IELTS COLLOCATION ({roomSettings.timeLimit} GIÂY)</span>
              {roomSettings.gameMode === 'GOLD_QUEST' && (
                <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-400/40 rounded-full text-[10px]">
                  💰 CƯỚP VÀNG LIVE
                </span>
              )}
            </div>

            {/* Prompt */}
            <h2 className="text-2xl md:text-4xl font-extrabold text-white max-w-3xl mx-auto leading-relaxed">
              "{currentQuestion.prompt}"
            </h2>

            {/* Incense Timer */}
            <ArenaIncenseTimer timeLeftSeconds={timeLeft} totalTimeSeconds={roomSettings.timeLimit} />

            {/* 4 Cards Hiển thị trên máy chiếu */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-w-2xl mx-auto pt-2">
              {currentQuestion.options.map((opt) => (
                <div
                  key={opt.id}
                  className="p-3.5 rounded-xl bg-purple-950/50 border border-purple-800/60 flex items-center gap-3 text-left shadow-md"
                >
                  <span className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-500/40 flex items-center justify-center font-black text-xs text-orange-400">
                    {opt.label}
                  </span>
                  <span className="font-bold text-sm text-slate-200">{opt.text}</span>
                </div>
              ))}
            </div>

            <div className="text-xs text-purple-200/80">
              Đã nhận câu trả lời: <span className="text-orange-400 font-bold">{Object.keys(answers).length}</span> / {players.length} học viên
            </div>

            {/* Live Feed cảnh báo cướp vàng nếu ở chế độ GOLD_QUEST */}
            {roomSettings.gameMode === 'GOLD_QUEST' && liveLogs.length > 0 && (
              <div className="max-w-md mx-auto p-3 bg-black/40 border border-amber-500/30 rounded-2xl text-left space-y-1 animate-fadeIn">
                <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider block">
                  ⚡ Nhật ký cướp vàng trực tiếp:
                </span>
                {liveLogs.map((log, i) => (
                  <div key={i} className="text-xs text-amber-200 font-semibold truncate">
                    {log}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {state === 'ANSWER_LOCKED' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center mx-auto text-red-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-black text-white">ĐÃ KHÓA CÂU TRẢ LỜI</h2>
            <p className="text-purple-200/80 text-sm">
              Đã nhận {Object.keys(answers).length} câu trả lời. Chuẩn bị xem phổ đáp án của lớp.
            </p>
          </div>
        )}

        {(state === 'REVEAL_DISTRIBUTION' || state === 'REVEAL_PERSONAL' || state === 'TEACHER_DEBRIEF') && (
          <div className="w-full space-y-6">
            <div className="text-purple-300 text-xs font-mono font-bold tracking-widest uppercase">
              PHÂN PHỐI ĐÁP ÁN CỦA LỚP (CÂU {questionIndex + 1}/{totalQuestions})
            </div>

            {/* Distribution Bar Chart */}
            <div className="grid grid-cols-4 gap-4 max-w-xl mx-auto items-end h-48 pt-6">
              {currentQuestion.options.map((opt) => {
                const pct = distribution[opt.label] || 0;
                const isCorrect = opt.id === currentQuestion.correctOptionId;
                return (
                  <div key={opt.id} className="flex flex-col items-center gap-2 h-full justify-end">
                    <span className="text-sm font-black text-white">{pct}%</span>
                    <div
                      className={`w-full rounded-xl transition-all duration-700 ${
                        state !== 'REVEAL_DISTRIBUTION' && isCorrect
                          ? 'bg-emerald-500 shadow-lg shadow-emerald-500/30'
                          : 'bg-purple-950/60 border border-purple-800/40'
                      }`}
                      style={{ height: `${Math.max(15, pct * 1.8)}px` }}
                    />
                    <span
                      className={`text-xs font-bold truncate max-w-full px-1 ${
                        state !== 'REVEAL_DISTRIBUTION' && isCorrect
                          ? 'text-emerald-400 font-black'
                          : 'text-purple-300'
                      }`}
                    >
                      {opt.label}. {opt.text}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Misconception Academic Diagnostic */}
            {state === 'TEACHER_DEBRIEF' && roomSettings.showDebrief && currentQuestion.misconception && (
              <div className="max-w-xl mx-auto p-4 bg-red-950/40 border border-red-500/30 rounded-2xl text-left animate-fadeIn space-y-1">
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider block mb-1">
                  💡 Chẩn đoán Bẫy Misconception: {currentQuestion.misconception.diagnosticTitle}
                </span>
                <p className="text-sm text-slate-300 leading-relaxed font-medium">
                  {currentQuestion.misconception.explanation}
                </p>
              </div>
            )}
          </div>
        )}

        {state === 'LEADERBOARD' && (
          <div className="w-full max-w-md mx-auto space-y-4 animate-fadeIn">
            <div className="text-purple-300 text-xs font-mono font-bold tracking-widest uppercase mb-4 flex items-center justify-center gap-1.5">
              {roomSettings.gameMode === 'GOLD_QUEST' ? (
                <>💰 BẢNG VÀNG ĐẠI GIA LỚP HỌC</>
              ) : (
                <>🎯 BẢNG XẾP HẠNG TOP 5 CỦA LỚP</>
              )}
            </div>
            {topFive.length === 0 ? (
              <p className="text-sm text-purple-300/70">Chưa có học sinh nào nộp câu trả lời</p>
            ) : (
              topFive.map((p) => (
                <div
                  key={p.playerId}
                  className="flex items-center justify-between p-3.5 bg-purple-950/50 border border-purple-800/50 rounded-2xl shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black ${
                        p.rank === 1
                          ? 'bg-amber-400 text-slate-950'
                          : p.rank === 2
                          ? 'bg-slate-300 text-slate-950'
                          : p.rank === 3
                          ? 'bg-amber-700 text-white'
                          : 'bg-purple-900 text-purple-300'
                      }`}
                    >
                      {p.rank}
                    </div>
                    <span className="font-extrabold text-white text-sm">{p.nickname}</span>
                  </div>
                  <span className="text-sm font-black text-amber-400 font-mono flex items-center gap-1">
                    {p.totalScore} {roomSettings.gameMode === 'GOLD_QUEST' ? '🪙' : 'pts'}
                  </span>
                </div>
              ))
            )}
          </div>
        )}

        {state === 'PODIUM' && (
          <ArenaPodiumView
            rankings={allRankings}
            gameMode={roomSettings.gameMode}
            onRestart={() => handleExecuteCommand('RESTART_ARENA')}
          />
        )}
      </main>

      {/* Bottom Contextual Control Footer */}
      <footer className="flex justify-center border-t border-purple-900/40 pt-4">
        <TeacherContextualButton
          state={state}
          onExecuteCommand={handleExecuteCommand}
          isLastRound={isLastRound}
        />
      </footer>

      {/* Modal Cài đặt thông số trận đấu */}
      <HostSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={roomSettings}
        onSaveSettings={(newSet) => setRoomSettings(newSet)}
      />
    </div>
  );
}


