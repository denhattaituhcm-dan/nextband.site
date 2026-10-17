/**
 * TEACHER HOST VIEW (/arena/host)
 * Màn hình trình chiếu của Giáo viên cho phòng học 10-20 học viên.
 * Hỗ trợ 3 chế độ:
 * 1. 'CLASSIC': Kahoot Cổ Điển (Đua điểm trắc nghiệm)
 * 2. 'GOLD_QUEST': Cướp Vàng (Mở rương, Live Gold Leaderboard, Cướp vàng trực tiếp giữa học sinh)
 * 3. 'ARENA_100': Đấu Trường 100 (Sinh tồn qua các vòng, trụ hạng tìm người sống sót cuối cùng)
 * Mặc định: Giữ nguyên chế độ Cổ điển nếu giáo viên không chỉnh gì trong Cài đặt.
 */

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useArenaAudio } from '@/hooks/arena/useArenaAudio';
import { ArenaLobbyKahoot, LobbyPlayer } from '@/components/arena/ArenaLobbyKahoot';
import { arenaApi } from '@/lib/api';
import { ArenaIncenseTimer } from '@/components/arena/ArenaIncenseTimer';
import { TeacherContextualButton } from '@/components/arena/TeacherContextualButton';
import { HostSettingsModal, RoomSettings, DEFAULT_ROOM_SETTINGS } from '@/components/arena/HostSettingsModal';
import { ArenaRulesModal } from '@/components/arena/ArenaRulesModal';
import { ArenaPodiumView } from '@/components/arena/ArenaPodiumView';
import { ArenaFreeFireLeaderboard } from '@/components/arena/ArenaFreeFireLeaderboard';
import { ArenaState, HostCommandType, PlayerPublicRank } from '@/lib/arena/types';
import { ARENA_COLLOCATION_QUESTIONS, ArenaQuestion } from '@/lib/arena/questions';
import { Volume2, VolumeX, CheckCircle2, Sparkles, Settings, Trophy, Maximize, Minimize, Flame, Zap, Users, BookOpen, HelpCircle, Shield, Heart } from 'lucide-react';

interface PlayerAnswerRecord {
  playerId: string;
  nickname: string;
  optionId: string;
  timeLeft: number;
  score: number;
  gold?: number;
}

export default function ArenaHostPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const rawPin = searchParams.get('pin');
  const [pinCode] = useState<string>(() => {
    if (rawPin && rawPin.trim().length === 6) return rawPin.trim();
    return '';
  });

  // Chặn truy cập nếu không có mã PIN hợp lệ từ router/admin
  useEffect(() => {
    if (!pinCode) {
      alert('Không tìm thấy mã PIN phòng thi đấu hợp lệ. Vui lòng mở phòng từ trang Quản Trị Trò Chơi!');
      navigate('/admin/game-arena');
    }
  }, [pinCode, navigate]);

  const [state, setState] = useState<ArenaState>('LOBBY');
  
  // Cài đặt thông số phòng (Mặc định chuẩn nếu giáo viên không chỉnh gì)
  const [roomSettings, setRoomSettings] = useState<RoomSettings>(DEFAULT_ROOM_SETTINGS);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isRulesOpen, setIsRulesOpen] = useState<boolean>(false);

  // Quản lý câu hỏi đa vòng & Tổng điểm tích lũy qua các vòng
  const [roomId, setRoomId] = useState<string>('');
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [cumulativeScores, setCumulativeScores] = useState<Record<string, number>>({});
  const [activeQuestion, setActiveQuestion] = useState<ArenaQuestion>(ARENA_COLLOCATION_QUESTIONS[0]);
  const [totalQuestions, setTotalQuestions] = useState<number>(ARENA_COLLOCATION_QUESTIONS.length);

  const currentQuestion = activeQuestion;
  const isLastRound = questionIndex >= totalQuestions - 1;

  // Phòng rỗng 100%, chỉ có học sinh thật tham gia qua Broadcast
  const [players, setPlayers] = useState<LobbyPlayer[]>([]);
  const [answers, setAnswers] = useState<Record<string, PlayerAnswerRecord>>({});
  const [playerGoldMap, setPlayerGoldMap] = useState<Record<string, number>>({});
  // Trạng thái sinh tồn cho Đấu Trường 100 (ARENA_100)
  const [playerLivesMap, setPlayerLivesMap] = useState<Record<string, number>>({});
  const [playerStreakMap, setPlayerStreakMap] = useState<Record<string, number>>({});
  const [eliminatedRoundMap, setEliminatedRoundMap] = useState<Record<string, number>>({});
  const [roundProcessedIndex, setRoundProcessedIndex] = useState<number>(-1);
  const [liveLogs, setLiveLogs] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(DEFAULT_ROOM_SETTINGS.timeLimit);

  const {
    isBgmEnabled,
    playLobbyBgm,
    stopLobbyBgm,
    startQuestionSuspense,
    stopQuestionSuspense,
    playCountdownBeep,
    toggleBgm,
    playCorrectSound,
    playClimberSound,
    playPodiumSound,
    playClickSound,
  } = useArenaAudio();

  // Chế độ toàn màn hình cho Giáo viên trình chiếu
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const toggleFullScreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.warn('Lỗi bật toàn màn hình:', err);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch((err) => {
          console.warn('Lỗi tắt toàn màn hình:', err);
        });
      }
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Đếm ngược 3 giây khởi động kịch tính trước Câu 1
  const [startCountdown, setStartCountdown] = useState<number | null>(null);
  const countdownTimerRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
      }
    };
  }, []);

  const channelRef = useRef<any>(null);
  const stateRef = useRef<ArenaState>(state);
  stateRef.current = state;
  const currentQuestionRef = useRef<ArenaQuestion>(currentQuestion);
  currentQuestionRef.current = currentQuestion;
  const roomSettingsRef = useRef<RoomSettings>(roomSettings);
  roomSettingsRef.current = roomSettings;
  const pinCodeRef = useRef<string>(pinCode);
  pinCodeRef.current = pinCode;
  const playerLivesMapRef = useRef<Record<string, number>>(playerLivesMap);
  playerLivesMapRef.current = playerLivesMap;

  const registerPlayer = useCallback((p: {
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
    setPlayerLivesMap((prev) => ({
      ...prev,
      [playerName]: prev[playerName] ?? roomSettingsRef.current.survivalInitialLives,
    }));

    // Phản hồi ACK xác nhận cho học sinh qua Supabase channel nếu có
    try {
      channelRef.current?.send({
        type: 'broadcast',
        event: 'player-joined-ack',
        payload: {
          playerId: playerId,
          pin: pinCodeRef.current,
          accepted: true,
        },
      });
    } catch (err) {
      console.warn('[ArenaHost] Error sending player-joined-ack:', err);
    }
  }, []);

  // Hỗ trợ HTML5 BroadcastChannel cho cùng thiết bị/nhiều tab
  useEffect(() => {
    if (typeof window === 'undefined' || !('BroadcastChannel' in window) || !pinCode) return;
    try {
      const bc = new BroadcastChannel(`arena-local-sync-${pinCode}`);
      bc.onmessage = (event) => {
        const { type, payload } = event.data || {};
        if (type === 'player-joined' && payload) {
          registerPlayer(payload);
          playClickSound();
        }
      };
      return () => bc.close();
    } catch {}
  }, [pinCode, registerPlayer, playClickSound]);

  // Phase 5: Khôi phục toàn bộ Snapshot trạng thái phòng từ Server sau khi F5/Mất kết nối
  const reclaimRoomSnapshot = useCallback(async () => {
    if (!pinCode) return;
    const hostToken = typeof window !== 'undefined' ? sessionStorage.getItem(`arena_host_token_${pinCode}`) : null;

    try {
      if (hostToken) {
        const snapshot = await arenaApi.reclaimHostSnapshot({ pin: pinCode, hostToken });
        if (snapshot) {
          // Khôi phục trạng thái State Machine của phòng
          if (snapshot.status) {
            const mappedState = snapshot.status === 'ROUND_REVEAL' ? 'REVEAL_PERSONAL' : (snapshot.status as ArenaState);
            setState(mappedState);
          }
          if (typeof snapshot.currentRound === 'number') {
            setQuestionIndex(snapshot.currentRound);
          }
          if (snapshot.participants) {
            setPlayers(
              snapshot.participants.map((p: any) => ({
                id: p.id,
                name: p.nickname,
                avatarSeed: p.avatarId,
                rank: 'Học viên',
                joinedAt: p.joinedAt,
                isOnline: true,
              }))
            );
            const scoreObj: Record<string, number> = {};
            const goldObj: Record<string, number> = {};
            snapshot.participants.forEach((p: any) => {
              scoreObj[p.nickname] = p.totalScore || 0;
              goldObj[p.nickname] = p.totalGold || 0;
            });
            setCumulativeScores(scoreObj);
            setPlayerGoldMap(goldObj);
            setPlayerLivesMap((prev) => {
              const next = { ...prev };
              snapshot.participants.forEach((p: any) => {
                if (next[p.nickname] === undefined) {
                  next[p.nickname] = roomSettingsRef.current.survivalInitialLives;
                }
              });
              return next;
            });
          }
          if (snapshot.roomId) {
            setRoomId(snapshot.roomId);
          }
          if (snapshot.question) {
            setActiveQuestion(snapshot.question);
          }
          if (typeof snapshot.totalQuestions === 'number') {
            setTotalQuestions(snapshot.totalQuestions);
          }
          if (snapshot.currentRoundAnswers) {
            setAnswers(snapshot.currentRoundAnswers);
          }
          return;
        }
      }

      // Nếu không có hostToken hoặc fallback cơ bản
      const roomData = await arenaApi.getRoomByPin(pinCode);
      if (roomData) {
        if (roomData.id) setRoomId(roomData.id);
        if ((roomData as any).participants) {
          const dbParticipants = (roomData as any).participants;
          setPlayers((prev) => {
            return dbParticipants.map((p: any) => {
              const existing = prev.find((item) => item.id === p.id || item.name.toLowerCase() === p.nickname.toLowerCase());
              return {
                id: p.id,
                name: p.nickname,
                avatarSeed: p.avatarId,
                rank: 'Học viên',
                joinedAt: p.joinedAt,
                isOnline: existing ? existing.isOnline : true,
              };
            });
          });
        }
      }
    } catch (e) {
      console.warn('[ArenaHost] Lỗi khôi phục snapshot Host từ DB:', e);
    }
  }, [pinCode]);

  // Load danh sách người chơi và khôi phục Snapshot ban đầu khi Host mở phòng/F5
  useEffect(() => {
    reclaimRoomSnapshot();
  }, [reclaimRoomSnapshot]);

  // Đồng bộ Presence để xác định ai đang Online / Offline (Không xóa khỏi danh sách khi mất mạng)
  useEffect(() => {
    if (!pinCode) return;

    const channelName = `arena-room-${pinCode}`;
    const channel = supabase.channel(channelName, {
      config: {
        broadcast: { ack: true, self: true },
        presence: { key: 'host' },
      },
    });

    channel
      .on('presence', { event: 'sync' }, () => {
        const presenceState = channel.presenceState();
        const onlineNames = new Set<string>();

        Object.values(presenceState).forEach((presences: any) => {
          if (Array.isArray(presences)) {
            presences.forEach((p: any) => {
              const name = (p.name || p.nickname || '').trim().toLowerCase();
              if (name && name !== 'host') {
                onlineNames.add(name);
              }
            });
          }
        });

        // Cập nhật trạng thái isOnline cho danh sách người chơi từ Database
        setPlayers((prev) =>
          prev.map((player) => ({
            ...player,
            isOnline: onlineNames.has(player.name.toLowerCase()),
          }))
        );

        // Fetch lại DB nếu có học sinh mới vừa handshake
        reclaimRoomSnapshot();
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        reclaimRoomSnapshot();
        playClickSound();
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        // Học sinh rớt mạng -> Chỉ cập nhật isOnline = false, KHÔNG xóa khỏi phòng
        const leftNames = new Set<string>();
        if (Array.isArray(leftPresences)) {
          leftPresences.forEach((p: any) => {
            const name = (p.name || p.nickname || '').trim().toLowerCase();
            if (name) leftNames.add(name);
          });
        }

        setPlayers((prev) =>
          prev.map((player) =>
            leftNames.has(player.name.toLowerCase())
              ? { ...player, isOnline: false }
              : player
          )
        );
      })
      .on('broadcast', { event: 'player-joined' }, ({ payload }) => {
        if (!payload) return;
        registerPlayer(payload);
        playClickSound();
      })
      .on('broadcast', { event: 'player-sync-request' }, ({ payload }) => {
        if (!payload || !payload.playerId) return;
        const reqName = (payload.nickname || payload.name || '').trim();
        if (reqName) {
          registerPlayer({ id: payload.playerId, name: reqName });
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
              survivalInitialLives: roomSettingsRef.current.survivalInitialLives,
              lives: reqName ? playerLivesMapRef.current[reqName] : undefined,
            },
          });
        } catch (err) {
          console.warn('[ArenaHost] Error sending player-sync-response:', err);
        }
      })
      .on('broadcast', { event: 'player-answered' }, ({ payload }) => {
        if (!payload || !payload.nickname) return;
        const playerKey = payload.nickname.trim().toLowerCase();

        // Chống tính điểm và cộng dồn trùng lặp cho cùng một học sinh trong cùng lượt câu hỏi
        if (answers[playerKey] || answers[payload.nickname]) {
          return;
        }

        const optionId = payload.optionId;
        const isCorrect = optionId === currentQuestionRef.current.correctOptionId;
        const isArena100 = roomSettingsRef.current.gameMode === 'ARENA_100';
        const curLives = playerLivesMapRef.current[payload.nickname] ?? roomSettingsRef.current.survivalInitialLives;
        const isAlreadyEliminated = isArena100 && curLives <= 0;

        let score = 0;
        if (isCorrect && !isAlreadyEliminated) {
          const isFinalQuestion = totalQuestions > 0 && questionIndex >= totalQuestions - 1;
          const isClassicMode = roomSettingsRef.current.gameMode === 'CLASSIC';
          const finalMultiplier = (isClassicMode && isFinalQuestion) ? 2 : 1;

          if (roomSettingsRef.current.scoringMode === 'double') {
            score = (100 + (payload.timeLeft || 1) * 10) * 2 * finalMultiplier;
          } else if (roomSettingsRef.current.scoringMode === 'no_points') {
            score = 0;
          } else {
            score = (100 + (payload.timeLeft || 1) * 10) * finalMultiplier;
          }
        }

        setAnswers((prev) => {
          if (prev[payload.nickname]) return prev;
          return {
            ...prev,
            [payload.nickname]: {
              playerId: payload.nickname,
              nickname: payload.nickname,
              optionId,
              timeLeft: payload.timeLeft || 0,
              score,
              gold: payload.gold || 0,
            },
          };
        });

        if (score > 0) {
          setCumulativeScores((prev) => {
            // Kiểm tra một lần nữa trong updater callback để an toàn tuyệt đối
            if (answers[payload.nickname]) return prev;
            return {
              ...prev,
              [payload.nickname]: (prev[payload.nickname] || 0) + score,
            };
          });
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
      });

    channelRef.current = channel;

    channel.subscribe((status) => {
      console.log(`[ArenaHost] Channel arena-room-${pinCode} status:`, status);
      if (status === 'SUBSCRIBED') {
        // Báo cho mọi học sinh đang chờ biết Host đã sẵn sàng tiếp nhận
        try {
          channel.send({
            type: 'broadcast',
            event: 'lobby-ping',
          });
        } catch (e) {}
      }
    });

    return () => {
      channelRef.current = null;
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

  // Định kỳ gửi danh sách người chơi, số vàng và số mạng sinh tồn sang các học sinh
  useEffect(() => {
    if (!channelRef.current || players.length === 0) return;
    const candidates = players.map((p) => ({
      name: p.name,
      gold: playerGoldMap[p.name] || 0,
      lives: playerLivesMap[p.name] ?? roomSettings.survivalInitialLives,
      maxLives: roomSettings.survivalInitialLives,
    }));
    channelRef.current.send({
      type: 'broadcast',
      event: 'players-sync',
      payload: {
        players: candidates,
        gameMode: roomSettings.gameMode,
        survivalInitialLives: roomSettings.survivalInitialLives,
      },
    });
  }, [players, playerGoldMap, playerLivesMap, roomSettings.gameMode, roomSettings.survivalInitialLives]);

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

  // Số người chơi còn trụ lại trong Đấu Trường 100
  const survivingPlayersCount = useMemo(() => {
    if (roomSettings.gameMode !== 'ARENA_100') return players.length;
    return players.filter((p) => (playerLivesMap[p.name] ?? roomSettings.survivalInitialLives) > 0).length;
  }, [players, playerLivesMap, roomSettings.gameMode, roomSettings.survivalInitialLives]);

  // Điều kiện kết thúc sớm Đấu Trường 100: Khi đã có >= 2 người chơi mà chỉ còn <= 1 người trụ lại (hoặc đã ở vòng cuối)
  const isSurvivalShowdownOver = useMemo(() => {
    if (roomSettings.gameMode !== 'ARENA_100') return false;
    if (players.length >= 2 && survivingPlayersCount <= 1 && questionIndex >= 0 && roundProcessedIndex === questionIndex) {
      return true;
    }
    if (players.length === 1 && survivingPlayersCount === 0 && roundProcessedIndex === questionIndex) {
      return true;
    }
    return false;
  }, [roomSettings.gameMode, players.length, survivingPlayersCount, questionIndex, roundProcessedIndex]);

  const effectiveIsLastRound = isLastRound || isSurvivalShowdownOver;

  // Bảng xếp hạng toàn diện tất cả người chơi
  const allRankings: PlayerPublicRank[] = useMemo(() => {
    if (roomSettings.gameMode === 'GOLD_QUEST') {
      const sorted = Object.entries(playerGoldMap).sort(([, a], [, b]) => b - a);
      return sorted.map(([name, gold], idx) => {
        const found = players.find(p => p.name.toLowerCase() === name.toLowerCase() || p.id === name);
        return {
          rank: idx + 1,
          playerId: name,
          nickname: name,
          totalScore: gold,
          avatarSeed: found?.avatarSeed !== undefined ? found.avatarSeed : name,
        };
      });
    }

    if (roomSettings.gameMode === 'ARENA_100') {
      const maxLives = roomSettings.survivalInitialLives;
      const list = players.map((p) => {
        const lives = playerLivesMap[p.name] ?? maxLives;
        const score = cumulativeScores[p.name] || 0;
        const elimRound = eliminatedRoundMap[p.name] ?? -1;
        return {
          name: p.name,
          lives,
          maxLives,
          isEliminated: lives <= 0,
          elimRound,
          score,
          avatarSeed: p.avatarSeed !== undefined ? p.avatarSeed : p.name,
        };
      });

      // Sắp xếp: 1. Còn sống trước -> 2. Nhiều mạng hơn -> 3. Nếu đã bị loại thì bị loại ở vòng muộn hơn xếp trên -> 4. Điểm tốc độ cao hơn
      list.sort((a, b) => {
        if (a.isEliminated !== b.isEliminated) return a.isEliminated ? 1 : -1;
        if (b.lives !== a.lives) return b.lives - a.lives;
        if (a.isEliminated && b.isEliminated && b.elimRound !== a.elimRound) {
          return b.elimRound - a.elimRound;
        }
        return b.score - a.score;
      });

      return list.map((item, idx) => ({
        rank: idx + 1,
        playerId: item.name,
        nickname: item.name,
        totalScore: item.score,
        avatarSeed: item.avatarSeed,
        lives: item.lives,
        maxLives: item.maxLives,
        isEliminated: item.isEliminated,
      }));
    }

    const scoreMap: Record<string, number> = { ...cumulativeScores };
    players.forEach((p) => {
      if (scoreMap[p.name] === undefined) {
        scoreMap[p.name] = 0;
      }
    });

    const sorted = Object.entries(scoreMap).sort(([, a], [, b]) => b - a);
    return sorted.map(([name, score], idx) => {
      const found = players.find(p => p.name.toLowerCase() === name.toLowerCase() || p.id === name);
      return {
        rank: idx + 1,
        playerId: name,
        nickname: name,
        totalScore: score,
        avatarSeed: found?.avatarSeed !== undefined ? found.avatarSeed : name,
      };
    });
  }, [cumulativeScores, playerGoldMap, playerLivesMap, eliminatedRoundMap, players, roomSettings.gameMode, roomSettings.survivalInitialLives]);


  // Cho phép Host kick học viên ra khỏi sảnh chờ để họ có thể tự vào lại
  const handleKickPlayer = useCallback(
    async (player: LobbyPlayer) => {
      const confirmKick = window.confirm(
        `Bạn có chắc muốn mời học viên "${player.name}" ra khỏi sảnh chờ để bạn ấy có thể tự vào lại không?`
      );
      if (!confirmKick) return;

      try {
        const hostToken = typeof window !== 'undefined' ? sessionStorage.getItem(`arena_host_token_${pinCode}`) : null;
        if (!hostToken) {
          alert('Không tìm thấy Host Token. Vui lòng thử lại!');
          return;
        }

        // 1. Gọi backend xóa participant khỏi Database
        await arenaApi.kickParticipant({
          pin: pinCode,
          hostToken,
          participantId: player.id,
        });

        // 2. Gửi Supabase Realtime broadcast thông báo cho học viên
        if (channelRef.current) {
          channelRef.current.send({
            type: 'broadcast',
            event: 'player-kicked',
            payload: {
              participantId: player.id,
              nickname: player.name,
              pin: pinCode,
            },
          });
        }

        // 3. Đồng bộ tab cục bộ (nếu test cùng trình duyệt)
        try {
          if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
            const bc = new BroadcastChannel(`arena-local-sync-${pinCode}`);
            bc.postMessage({
              type: 'player-kicked',
              payload: {
                participantId: player.id,
                nickname: player.name,
              },
            });
            bc.close();
          }
        } catch (e) {}

        // 4. Xóa khỏi danh sách người chơi tại Host
        setPlayers((prev) => prev.filter((p) => p.id !== player.id && p.name.toLowerCase() !== player.name.toLowerCase()));
      } catch (err: any) {
        console.error('[ArenaHost] Lỗi kick học viên:', err);
        alert(err.message || 'Không thể mời học viên ra khỏi phòng.');
      }
    },
    [pinCode]
  );

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

  // Điều phối chuyển trạng thái bằng Single Button (Server-Authoritative)
  const handleExecuteCommand = useCallback(
    async (command: HostCommandType) => {
      const hostToken = typeof window !== 'undefined' ? sessionStorage.getItem(`arena_host_token_${pinCode}`) : null;
      let serverQuestion: any = null;
      let serverTotal = totalQuestions;

      // Đồng bộ lệnh lên Server Authoritative State Machine trước khi phát Broadcast
      if (roomId && hostToken) {
        try {
          const res = await arenaApi.executeHostCommand({
            roomId,
            commandId: crypto.randomUUID ? crypto.randomUUID() : `cmd_${Date.now()}_${Math.random()}`,
            action: command,
            pin: pinCode,
            hostToken,
            gameMode: roomSettings.gameMode,
          });
          if (res?.question) {
            serverQuestion = res.question;
            setActiveQuestion(res.question);
          }
          if (typeof res?.totalQuestions === 'number') {
            serverTotal = res.totalQuestions;
            setTotalQuestions(res.totalQuestions);
          }
        } catch (e) {
          console.warn('[ArenaHost] Server command failed, continuing with client broadcast:', e);
        }
      }

      const runQuestionCountdown = (targetIndex: number, targetQuestion: any, totalQ: number, isInitialStart = false) => {
        if (countdownTimerRef.current) {
          clearInterval(countdownTimerRef.current);
          countdownTimerRef.current = null;
        }

        const isFinal = targetIndex >= totalQ - 1;
        const basePayload = {
          pin: pinCode,
          timeLimit: roomSettings.timeLimit,
          gameMode: roomSettings.gameMode,
          survivalInitialLives: roomSettings.survivalInitialLives,
          questionIndex: targetIndex,
          totalQuestions: totalQ,
          question: targetQuestion,
          isFinalQuestion: isFinal,
        };

        setStartCountdown(3);
        playCountdownBeep(3);

        if (channelRef.current) {
          channelRef.current.send({
            type: 'broadcast',
            event: 'arena-countdown',
            payload: { ...basePayload, countdown: 3 },
          });
        }

        let currentCount = 3;
        countdownTimerRef.current = setInterval(() => {
          currentCount -= 1;
          if (currentCount > 0) {
            setStartCountdown(currentCount);
            playCountdownBeep(currentCount);
            if (channelRef.current) {
              channelRef.current.send({
                type: 'broadcast',
                event: 'arena-countdown',
                payload: { ...basePayload, countdown: currentCount },
              });
            }
          } else if (currentCount === 0) {
            setStartCountdown(0);
            playCountdownBeep(0);
            if (channelRef.current) {
              channelRef.current.send({
                type: 'broadcast',
                event: 'arena-countdown',
                payload: { ...basePayload, countdown: 0 },
              });
            }
          } else {
            clearInterval(countdownTimerRef.current);
            countdownTimerRef.current = null;
            setStartCountdown(null);
            setState('QUESTION_LIVE');
            setTimeLeft(roomSettings.timeLimit);
            startQuestionSuspense(roomSettings.timeLimit);

            if (channelRef.current) {
              channelRef.current.send({
                type: 'broadcast',
                event: 'question-live',
                payload: basePayload,
              });
              if (isInitialStart) {
                channelRef.current.send({
                  type: 'broadcast',
                  event: 'arena-started',
                  payload: basePayload,
                });
              }
            }
          }
        }, 1000);
      };

      switch (command) {
        case 'START_ARENA': {
          setQuestionIndex(0);
          setAnswers({});
          setCumulativeScores({});
          setRoundProcessedIndex(-1);
          setEliminatedRoundMap({});
          setPlayerStreakMap({});
          setLiveLogs([]);
          // Khởi tạo đủ mạng cho toàn bộ chiến binh
          const initialLivesObj: Record<string, number> = {};
          players.forEach((p) => {
            initialLivesObj[p.name] = roomSettings.survivalInitialLives;
          });
          setPlayerLivesMap(initialLivesObj);
          stopLobbyBgm();

          const qToBroadcast = serverQuestion || currentQuestion;
          runQuestionCountdown(0, qToBroadcast, serverTotal, true);
          break;
        }
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
        case 'REVEAL_PERSONAL': {
          playCorrectSound();
          setState('REVEAL_PERSONAL');

          // Xử lý luật sinh tồn Đấu Trường 100 (Trừ mạng câu sai/hết giờ & Hồi mạng khi Streak x3)
          let survivalUpdates: Record<string, { lives: number; maxLives: number; delta: number; streak: number; isEliminated: boolean }> | undefined = undefined;

          if (roomSettings.gameMode === 'ARENA_100' && roundProcessedIndex !== questionIndex) {
            setRoundProcessedIndex(questionIndex);
            const maxL = roomSettings.survivalInitialLives;
            const nextLivesMap: Record<string, number> = { ...playerLivesMap };
            const nextStreakMap: Record<string, number> = { ...playerStreakMap };
            const nextElimMap: Record<string, number> = { ...eliminatedRoundMap };
            const roundEvents: string[] = [];
            survivalUpdates = {};

            players.forEach((p) => {
              const name = p.name;
              const prevLives = nextLivesMap[name] ?? maxL;
              const prevStreak = nextStreakMap[name] ?? 0;

              // Nếu học viên đã bị loại từ vòng trước -> Giữ nguyên trạng thái Khán giả / Thử sức
              if (prevLives <= 0) {
                nextLivesMap[name] = 0;
                survivalUpdates![name] = {
                  lives: 0,
                  maxLives: maxL,
                  delta: 0,
                  streak: 0,
                  isEliminated: true,
                };
                return;
              }

              const ans = answers[name];
              const isAnsCorrect = Boolean(ans && ans.optionId === currentQuestion.correctOptionId);

              if (isAnsCorrect) {
                const newStreak = prevStreak + 1;
                nextStreakMap[name] = newStreak;
                let newLives = prevLives;
                let delta = 0;

                // Cơ chế Hồi mạng: Đạt chuỗi 3 câu đúng liên tiếp (Streak x3, x6, x9...) và đang bị mất mạng
                if (maxL > 1 && newStreak > 0 && newStreak % 3 === 0 && prevLives < maxL) {
                  newLives = Math.min(maxL, prevLives + 1);
                  delta = 1;
                  roundEvents.push(`💖 [${name}] đạt chuỗi ${newStreak} câu đúng liên tiếp và hồi phục +1 mạng!`);
                }

                nextLivesMap[name] = newLives;
                survivalUpdates![name] = {
                  lives: newLives,
                  maxLives: maxL,
                  delta,
                  streak: newStreak,
                  isEliminated: false,
                };
              } else {
                // Trả lời sai hoặc hết giờ chưa chốt -> Mất 1 mạng
                const newLives = Math.max(0, prevLives - 1);
                nextLivesMap[name] = newLives;
                nextStreakMap[name] = 0;

                if (newLives === 0) {
                  nextElimMap[name] = questionIndex;
                  roundEvents.push(`💀 [${name}] đã hết mạng và dừng bước tại Câu ${questionIndex + 1}!`);
                } else {
                  roundEvents.push(`💔 [${name}] mất 1 mạng (còn ${newLives}/${maxL} ❤️)`);
                }

                survivalUpdates![name] = {
                  lives: newLives,
                  maxLives: maxL,
                  delta: -1,
                  streak: 0,
                  isEliminated: newLives === 0,
                };
              }
            });

            setPlayerLivesMap(nextLivesMap);
            setPlayerStreakMap(nextStreakMap);
            setEliminatedRoundMap(nextElimMap);
            if (roundEvents.length > 0) {
              setLiveLogs((prev) => [...roundEvents, ...prev].slice(0, 6));
            }
          }

          if (channelRef.current) {
            channelRef.current.send({
              type: 'broadcast',
              event: 'round-reveal',
              payload: {
                correctOptionId: currentQuestion.correctOptionId,
                explanation: currentQuestion.correctExplanation,
                survivalUpdates,
              },
            });
          }
          break;
        }
        case 'START_DEBRIEF':
          setState('TEACHER_DEBRIEF');
          break;
        case 'SHOW_LEADERBOARD':
          if (effectiveIsLastRound) {
            // Ở câu hỏi cuối cùng hoặc khi Đấu Trường 100 đã tìm ra Quán quân trụ lại cuối cùng
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
          }
          break;
        case 'NEXT_ROUND': {
          if (effectiveIsLastRound) {
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
            const nextQ = serverQuestion || currentQuestion;
            runQuestionCountdown(nextIdx, nextQ, serverTotal, false);
          }
          break;
        }
        case 'RESTART_ARENA':
          if (countdownTimerRef.current) {
            clearInterval(countdownTimerRef.current);
            countdownTimerRef.current = null;
          }
          setStartCountdown(null);
          stopQuestionSuspense();
          setQuestionIndex(0);
          setAnswers({});
          setCumulativeScores({});
          setRoundProcessedIndex(-1);
          setEliminatedRoundMap({});
          setPlayerStreakMap({});
          setLiveLogs([]);
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
      roomSettings.survivalInitialLives,
      distribution,
      currentQuestion,
      effectiveIsLastRound,
      questionIndex,
      allRankings,
      roomId,
      totalQuestions,
      players,
      playerLivesMap,
      playerStreakMap,
      eliminatedRoundMap,
      roundProcessedIndex,
      answers,
      stopLobbyBgm,
      playCountdownBeep,
    ]
  );

  // Phím tắt bàn phím (Enter / Space) dành riêng cho Giáo viên/Host trên Máy tính
  const lastKeyTriggerRef = useRef<number>(0);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Bỏ qua nếu đang mở modal cài đặt/hướng dẫn hoặc đang gõ phím trong input/textarea
      if (isSettingsOpen || isRulesOpen) return;
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();

        // Debounce 400ms để tránh tình trạng bấm đúp nhảy cóc qua màn hình
        const now = Date.now();
        if (now - lastKeyTriggerRef.current < 400) return;
        lastKeyTriggerRef.current = now;

        // Xác định lệnh tiếp theo dựa trên trạng thái hiện tại của phòng
        switch (state) {
          case 'LOBBY':
            handleExecuteCommand('START_ARENA');
            break;
          case 'QUESTION_LIVE':
            handleExecuteCommand('LOCK_ROUND');
            break;
          case 'ANSWER_LOCKED':
            handleExecuteCommand('REVEAL_DISTRIBUTION');
            break;
          case 'REVEAL_DISTRIBUTION':
            handleExecuteCommand('REVEAL_PERSONAL');
            break;
          case 'REVEAL_PERSONAL':
            handleExecuteCommand(effectiveIsLastRound ? 'NEXT_ROUND' : 'START_DEBRIEF');
            break;
          case 'TEACHER_DEBRIEF':
            handleExecuteCommand(effectiveIsLastRound ? 'NEXT_ROUND' : 'SHOW_LEADERBOARD');
            break;
          case 'LEADERBOARD':
            handleExecuteCommand('NEXT_ROUND');
            break;
          case 'PODIUM':
            handleExecuteCommand('RESTART_ARENA');
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state, effectiveIsLastRound, isSettingsOpen, isRulesOpen, handleExecuteCommand]);

  const joinUrl = typeof window !== 'undefined' ? `${window.location.origin}/arena/join` : '/arena/join';

  const modeBadgeLabel =
    roomSettings.gameMode === 'GOLD_QUEST'
      ? 'Chế độ Cướp Vàng 💰'
      : roomSettings.gameMode === 'ARENA_100'
      ? `Đấu Trường 100 🛡️ (${roomSettings.survivalInitialLives} ❤️)`
      : 'Chế độ Cổ điển 🎯';

  const modeShortLabel =
    roomSettings.gameMode === 'GOLD_QUEST'
      ? 'Cướp Vàng'
      : roomSettings.gameMode === 'ARENA_100'
      ? `Đấu Trường 100 · ${roomSettings.survivalInitialLives}❤️`
      : 'Cổ Điển';

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
              NextQuiz Classroom Engine · {modeBadgeLabel}
            </span>
          </div>
        </div>

        {/* Badge Sĩ số học viên tại Sảnh chờ hoặc Bộ đếm Sinh Tồn Đấu Trường 100 */}
        {state === 'LOBBY' ? (
          <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/20 border-2 border-emerald-400/50 text-emerald-200 font-extrabold text-xs md:text-sm shadow-lg shadow-emerald-950/60 animate-pulse">
            <Users className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" />
            <span className="font-mono text-base md:text-lg text-emerald-300">{players.length}</span>
            <span>HỌC VIÊN ĐÃ VÀO</span>
          </div>
        ) : roomSettings.gameMode === 'ARENA_100' && state !== 'PODIUM' ? (
          <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-rose-500/20 border-2 border-rose-400/60 text-rose-200 font-extrabold text-xs md:text-sm shadow-lg shadow-rose-950/60">
            <Shield className="w-4 h-4 md:w-5 md:h-5 text-rose-400" />
            <span>TRỤ HẠNG:</span>
            <span className="font-mono text-base md:text-lg text-amber-300">
              {survivingPlayersCount} / {players.length}
            </span>
            <span className="hidden sm:inline">CHIẾN BINH</span>
          </div>
        ) : null}

        {/* Nút Hướng dẫn & Nội quy, Cài đặt & Music Toggle */}
        <div className="flex items-center gap-3">
          {state === 'LOBBY' && (
            <>
              <button
                onClick={() => setIsRulesOpen(true)}
                className="flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-amber-400/50 text-xs font-bold rounded-full transition-all cursor-pointer text-amber-300 hover:text-amber-200 shadow-sm"
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Hướng dẫn & Nội quy</span>
              </button>

              <button
                onClick={() => setIsSettingsOpen(true)}
                className="flex items-center gap-2 px-3.5 py-1.5 bg-purple-900/40 hover:bg-purple-800/60 border border-purple-500/30 text-xs font-bold rounded-full transition-all cursor-pointer text-purple-200 hover:text-white"
              >
                <Settings className="w-4 h-4 text-purple-300" />
                <span>Cài đặt ({modeShortLabel})</span>
              </button>
            </>
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

          {/* Nút Toàn màn hình cho Máy chiếu lớp học */}
          <button
            onClick={toggleFullScreen}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-purple-950/60 hover:bg-purple-900/60 border border-purple-800/60 text-xs font-bold rounded-full transition-all cursor-pointer text-slate-300 hover:text-white"
            title={isFullscreen ? 'Thu nhỏ màn hình (ESC)' : 'Trình chiếu Toàn màn hình (F11)'}
          >
            {isFullscreen ? (
              <>
                <Minimize className="w-4 h-4 text-amber-400" />
                <span>Thu nhỏ</span>
              </>
            ) : (
              <>
                <Maximize className="w-4 h-4 text-purple-300" />
                <span>Toàn màn hình</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Classroom Projection Display */}
      <main className="flex-1 flex flex-col items-center justify-center my-6 text-center max-w-6xl mx-auto w-full">
        {/* Animated Countdown Overlay before Questions (Kèm thông báo Câu Quyết Định ở câu cuối) */}
        {startCountdown !== null && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/95 backdrop-blur-md animate-in fade-in duration-200">
            {isLastRound ? (
              // CÂU HỎI QUYẾT ĐỊNH (FINAL ROUND)
              <div className="relative flex flex-col items-center justify-center space-y-6 max-w-2xl px-4 animate-in zoom-in-95 duration-300">
                <div className="px-6 py-2 rounded-full bg-gradient-to-r from-amber-500/20 via-rose-500/30 to-amber-500/20 border-2 border-amber-400 text-amber-300 font-black text-xs md:text-sm uppercase tracking-widest shadow-2xl shadow-amber-950/80 flex items-center gap-2.5 animate-pulse">
                  <Flame className="w-5 h-5 text-amber-400 animate-bounce" />
                  <span>CHẶNG VỀ ĐÍCH · CÂU HỎI QUYẾT ĐỊNH</span>
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </div>

                <div className="relative">
                  <div className="absolute -inset-10 rounded-full bg-gradient-to-r from-amber-500/40 via-rose-600/40 to-yellow-500/40 blur-3xl animate-pulse" />
                  <div className="relative flex items-center justify-center w-52 h-52 rounded-full bg-gradient-to-br from-amber-500 via-rose-600 to-amber-700 border-4 border-amber-200/90 shadow-2xl shadow-amber-500/60">
                    <span className="text-8xl md:text-9xl font-black text-white tracking-wider drop-shadow-lg animate-in zoom-in-50 duration-300" key={startCountdown}>
                      {startCountdown > 0 ? startCountdown : 'GO!'}
                    </span>
                  </div>
                </div>

                <div className="text-center space-y-2.5">
                  <h3 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 drop-shadow-md">
                    {startCountdown > 0 ? `CÂU ${questionIndex + 1} / ${totalQuestions}: CÂU QUYẾT ĐỊNH!` : 'BẮT ĐẦU VÒNG CHUNG CUỘC!'}
                  </h3>
                  <div className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-200 font-extrabold text-sm md:text-base shadow-inner">
                    <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300 animate-pulse" />
                    {roomSettings.gameMode === 'CLASSIC'
                      ? '🎯 ĐIỂM SỐ NHÂN ĐÔI (x2) · CƠ HỘI LỘI NGƯỢC DÒNG!'
                      : roomSettings.gameMode === 'ARENA_100'
                      ? `🛡️ VÒNG CHUNG KẾT ĐẤU TRƯỜNG 100 · CÒN ${survivingPlayersCount} CHIẾN BINH TRỤ HẠNG!`
                      : '💰 RƯƠNG VÀNG CUỐI CÙNG · BỨT PHÁ VỀ ĐÍCH!'}
                  </div>
                  <p className="text-sm md:text-base text-amber-200/80 font-medium">
                    Cả lớp tập trung cao độ — Câu hỏi này sẽ định đoạt ngôi vị Quán quân!
                  </p>
                </div>
              </div>
            ) : (
              // CÂU HỎI THƯỜNG
              <div className="relative flex flex-col items-center justify-center space-y-6">
                <div className="px-5 py-1.5 rounded-full bg-purple-900/60 border border-purple-500/40 text-purple-300 font-bold text-xs uppercase tracking-widest shadow-lg shadow-purple-950/50">
                  CÂU {questionIndex + 1} / {totalQuestions} ·{' '}
                  {roomSettings.gameMode === 'ARENA_100'
                    ? `Đấu Trường 100 (Còn ${survivingPlayersCount}/${players.length} trụ lại)`
                    : 'NextQuiz Arena'}
                </div>

                <div className="relative">
                  <div className="absolute -inset-8 rounded-full bg-purple-600/30 blur-2xl animate-pulse" />
                  <div className="relative flex items-center justify-center w-48 h-48 rounded-full bg-gradient-to-br from-purple-600 to-indigo-800 border-4 border-purple-300/60 shadow-2xl shadow-purple-600/50">
                    <span className="text-7xl md:text-8xl font-black text-white tracking-wider animate-in zoom-in-50 duration-300" key={startCountdown}>
                      {startCountdown > 0 ? startCountdown : 'GO!'}
                    </span>
                  </div>
                </div>

                <div className="text-center space-y-1">
                  <h3 className="text-xl md:text-2xl font-black text-white">
                    {startCountdown > 0 ? `Chuẩn bị bước vào Câu ${questionIndex + 1}!` : 'BẮT ĐẦU!'}
                  </h3>
                  <p className="text-sm text-purple-300/80 font-medium">
                    Tập trung quan sát và chọn đáp án chính xác nhất
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {state === 'LOBBY' && (
          <ArenaLobbyKahoot
            players={players}
            maxSlots={roomSettings.maxSlots}
            pinCode={pinCode}
            joinUrl={joinUrl}
            onKickPlayer={handleKickPlayer}
            onOpenRules={() => setIsRulesOpen(true)}
          />
        )}

        {state === 'QUESTION_LIVE' && (
          <div className="w-full space-y-6">
            <div className="text-purple-300 text-xs font-mono font-bold tracking-widest uppercase flex items-center justify-center gap-2 flex-wrap">
              <span>CÂU HỎI {questionIndex + 1} / {totalQuestions} · IELTS COLLOCATION ({roomSettings.timeLimit} GIÂY)</span>
              {roomSettings.gameMode === 'GOLD_QUEST' ? (
                <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-400/40 rounded-full text-[10px]">
                  💰 CƯỚP VÀNG LIVE
                </span>
              ) : roomSettings.gameMode === 'ARENA_100' ? (
                <span className="px-2.5 py-0.5 bg-rose-500/20 text-rose-300 border border-rose-400/50 rounded-full text-[10px] font-black flex items-center gap-1">
                  🛡️ ĐẤU TRƯỜNG 100 · {survivingPlayersCount}/{players.length} TRỤ HẠNG
                </span>
              ) : (
                isLastRound && (
                  <span className="px-2.5 py-0.5 bg-gradient-to-r from-amber-500/30 to-orange-500/30 text-amber-300 border border-amber-400/50 rounded-full text-[10px] font-black animate-pulse flex items-center gap-1 shadow-sm">
                    ⚡ CÂU CUỐI X2 ĐIỂM
                  </span>
                )
              )}
            </div>

            {/* Prompt */}
            <h2 className="text-2xl md:text-4xl font-extrabold text-white max-w-3xl mx-auto leading-relaxed">
              "{currentQuestion.prompt}"
            </h2>

            {/* Incense Timer */}
            <ArenaIncenseTimer timeLeftSeconds={timeLeft} totalTimeSeconds={roomSettings.timeLimit} />

            {/* 4 Cards Hiển thị trên máy chiếu */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-w-3xl mx-auto pt-2">
              {currentQuestion.options.map((opt) => (
                <div
                  key={opt.id}
                  className="p-3.5 rounded-xl bg-purple-950/50 border border-purple-800/60 flex items-start gap-3 text-left shadow-md"
                >
                  <span className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-500/40 flex items-center justify-center font-black text-xs text-orange-400 shrink-0 mt-0.5">
                    {opt.label}
                  </span>
                  <span className="font-bold text-sm md:text-base text-slate-200 leading-snug break-words flex-1">
                    {opt.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Thống kê số lượng học viên đã trả lời (Làm nổi bật rõ ràng cho máy chiếu) */}
            <div className="max-w-md mx-auto mt-2 p-3 rounded-2xl bg-purple-950/70 border-2 border-purple-500/40 shadow-xl shadow-purple-950/60 backdrop-blur-sm">
              <div className="flex items-center justify-between gap-4 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs md:text-sm font-extrabold uppercase tracking-wider text-purple-200">
                    Tiến độ nộp bài
                  </span>
                </div>
                <div className="flex items-baseline gap-1 font-mono">
                  <span className="text-2xl md:text-3xl font-black text-amber-300 drop-shadow-[0_2px_10px_rgba(251,191,36,0.5)]">
                    {Object.keys(answers).length}
                  </span>
                  <span className="text-sm md:text-base font-bold text-purple-300/80">
                    / {players.length}
                  </span>
                  <span className="text-xs font-semibold text-purple-200 ml-1">học viên</span>
                </div>
              </div>

              {/* Thanh tiến độ trực quan */}
              <div className="w-full h-3 bg-purple-900/60 rounded-full overflow-hidden p-0.5 border border-purple-700/50">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-emerald-400 rounded-full transition-all duration-300 shadow-sm"
                  style={{
                    width: `${players.length > 0 ? Math.min(100, Math.round((Object.keys(answers).length / players.length) * 100)) : 0}%`,
                  }}
                />
              </div>
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

            {/* Distribution Bar Chart - Cố định track chiều cao, thanh % co giãn độc lập, nhãn không bị tràn */}
            <div className="grid grid-cols-4 gap-4 max-w-xl mx-auto h-56 pt-2 pb-2">
              {currentQuestion.options.map((opt) => {
                const pct = distribution[opt.label] || 0;
                const isCorrect = opt.id === currentQuestion.correctOptionId;
                return (
                  <div key={opt.id} className="flex flex-col items-center h-full justify-between">
                    {/* Phần trên: Số % và Cột Bar trong track cố định */}
                    <div className="w-full flex-1 flex flex-col items-center justify-end min-h-0 pb-2">
                      <span className="text-sm font-black text-white mb-1.5">{pct}%</span>
                      <div className="w-full max-w-[80px] h-32 flex items-end justify-center">
                        <div
                          className={`w-full rounded-xl transition-all duration-700 ${
                            state !== 'REVEAL_DISTRIBUTION' && isCorrect
                              ? 'bg-emerald-500 shadow-lg shadow-emerald-500/30'
                              : 'bg-purple-950/80 border border-purple-800/60'
                          }`}
                          style={{ height: `${Math.max(8, pct)}%` }}
                        />
                      </div>
                    </div>
                    {/* Phần dưới: Nhãn đáp án luôn cố định bên dưới, không bị cột bar đè */}
                    <span
                      title={`${opt.label}. ${opt.text}`}
                      className={`text-xs font-bold truncate w-full px-1 py-1 text-center block ${
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

            {/* Bảng Trạng Thái Sinh Tồn Đấu Trường 100 sau khi công bố đáp án */}
            {roomSettings.gameMode === 'ARENA_100' && state !== 'REVEAL_DISTRIBUTION' && (
              <div className="max-w-3xl mx-auto p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider">
                  <span className="text-rose-300 flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-rose-400" /> Sàn Đấu Sinh Tồn Đấu Trường 100
                  </span>
                  <span className="text-amber-300">
                    {isSurvivalShowdownOver
                      ? '🏆 ĐÃ TÌM RA QUÁN QUÂN TRỤ HẠNG CUỐI CÙNG!'
                      : `Còn ${survivingPlayersCount} / ${players.length} chiến binh trụ lại`}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 justify-center max-h-28 overflow-y-auto p-1">
                  {players.map((p) => {
                    const lives = playerLivesMap[p.name] ?? roomSettings.survivalInitialLives;
                    const isOut = lives <= 0;
                    return (
                      <div
                        key={p.id}
                        className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 border transition-all ${
                          isOut
                            ? 'bg-slate-900/70 border-slate-700/50 text-slate-500 line-through opacity-60'
                            : 'bg-rose-500/20 border-rose-400/50 text-white shadow-sm'
                        }`}
                      >
                        <span className="truncate max-w-[110px]">{p.name}</span>
                        <span className="text-[10px]">
                          {isOut ? '💀' : '❤️'.repeat(lives)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Misconception Academic Diagnostic */}
            {state === 'TEACHER_DEBRIEF' && roomSettings.showDebrief && currentQuestion.misconception && (
              <div className="max-w-xl mx-auto mt-4 p-4 bg-red-950/60 border border-red-500/40 rounded-2xl text-left animate-fadeIn space-y-1 shadow-lg">
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider block mb-1">
                  💡 Chẩn đoán Bẫy Misconception: {currentQuestion.misconception.diagnosticTitle}
                </span>
                <p className="text-sm text-slate-200 leading-relaxed font-medium">
                  {currentQuestion.misconception.explanation}
                </p>
              </div>
            )}
          </div>
        )}

        {state === 'LEADERBOARD' && (
          <ArenaFreeFireLeaderboard
            rankings={allRankings}
            answers={answers}
            players={players}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            gameMode={roomSettings.gameMode}
          />
        )}

        {state === 'PODIUM' && (
          <ArenaPodiumView
            rankings={allRankings}
            players={players}
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
          isLastRound={effectiveIsLastRound}
          playerCount={players.length}
        />
      </footer>

      {/* Modal Cài đặt thông số trận đấu */}
      <HostSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={roomSettings}
        onSaveSettings={(newSet) => setRoomSettings(newSet)}
      />

      {/* Modal Hướng dẫn trả lời & Nội quy thi đấu */}
      <ArenaRulesModal
        isOpen={isRulesOpen}
        onClose={() => setIsRulesOpen(false)}
        gameMode={roomSettings.gameMode}
        survivalInitialLives={roomSettings.survivalInitialLives}
      />
    </div>
  );
}


