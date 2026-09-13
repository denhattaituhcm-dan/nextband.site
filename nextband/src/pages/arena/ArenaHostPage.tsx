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
import { ArenaState, HostCommandType, PlayerPublicRank } from '@/lib/arena/types';
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

  // Lắng nghe học sinh tham gia realtime và các sự kiện cướp vàng qua Supabase Broadcast Channel
  useEffect(() => {
    if (!pinCode) return;

    const channelName = `arena-room-${pinCode}`;
    const channel = supabase.channel(channelName, {
      config: {
        broadcast: { ack: true },
        presence: { key: 'host' },
      },
    });

    channel
      .on('presence', { event: 'sync' }, () => {
        const presenceState = channel.presenceState();
        Object.values(presenceState).forEach((presences: any) => {
          presences.forEach((p: any) => {
            if (p.name && p.name !== 'host') {
              setPlayers((prev) => {
                if (prev.some((existing) => existing.name.trim().toLowerCase() === p.name.trim().toLowerCase())) {
                  return prev;
                }
                return [
                  ...prev,
                  {
                    id: p.id || `p_${Date.now()}`,
                    name: p.name.trim(),
                    avatarSeed: p.avatarSeed || p.name,
                    rank: p.rank || 'Học viên',
                    joinedAt: p.joinedAt || new Date().toISOString(),
                  },
                ];
              });
              setPlayerGoldMap((prev) => ({ ...prev, [p.name.trim()]: prev[p.name.trim()] ?? 0 }));
            }
          });
        });
      })
      .on('broadcast', { event: 'player-joined' }, ({ payload }) => {
        if (!payload || !payload.name) return;
        setPlayers((prev) => {
          if (prev.some((p) => p.name.trim().toLowerCase() === payload.name.trim().toLowerCase())) {
            return prev;
          }
          const newPlayer = {
            id: payload.id || `p_${Date.now()}`,
            name: payload.name.trim(),
            avatarSeed: payload.avatarSeed || payload.name,
            rank: payload.rank || 'Học viên',
            joinedAt: payload.joinedAt || new Date().toISOString(),
          };
          return [...prev, newPlayer];
        });
        setPlayerGoldMap((prev) => ({ ...prev, [payload.name.trim()]: 0 }));
        playClickSound();
      })
      .on('broadcast', { event: 'player-answered' }, ({ payload }) => {
        if (!payload || !payload.nickname) return;
        const optionId = payload.optionId;
        const isCorrect = optionId === 'opt_A';
        
        let score = 0;
        if (isCorrect) {
          if (roomSettings.scoringMode === 'double') {
            score = (100 + (payload.timeLeft || 1) * 10) * 2;
          } else if (roomSettings.scoringMode === 'no_points') {
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
          channel.send({
            type: 'broadcast',
            event: 'gold-stolen-from-you',
            payload: { victimName, amount },
          });

          // Thêm thông báo vào Live feed trên máy chiếu
          const logMsg = `🚨 [${thiefName}] vừa cướp ${amount} vàng từ [${victimName}]!`;
          setLiveLogs((prev) => [logMsg, ...prev.slice(0, 4)]);
          playClimberSound();
        }
      })
      .subscribe();

    channelRef.current = channel;

    return () => {
      supabase.removeChannel(channel);
    };
  }, [pinCode, playClickSound, playClimberSound, roomSettings.scoringMode]);

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

  // Bảng xếp hạng: Nếu là Gold Quest thì xếp theo VÀNG, nếu Classic thì xếp theo ĐIỂM
  const topFive: PlayerPublicRank[] = useMemo(() => {
    if (roomSettings.gameMode === 'GOLD_QUEST') {
      return Object.entries(playerGoldMap)
        .sort(([, gA], [, gB]) => gB - gA)
        .slice(0, 5)
        .map(([name, gold], idx) => ({
          rank: idx + 1,
          playerId: name,
          nickname: name,
          totalScore: gold,
        }));
    }

    return Object.values(answers)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map((item, idx) => ({
        rank: idx + 1,
        playerId: item.playerId,
        nickname: item.nickname,
        totalScore: item.score,
      }));
  }, [answers, playerGoldMap, roomSettings.gameMode]);

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
  }, [state]);

  // Điều phối chuyển trạng thái bằng Single Button
  const handleExecuteCommand = useCallback(
    (command: HostCommandType) => {
      switch (command) {
        case 'START_ARENA':
          setState('QUESTION_LIVE');
          setTimeLeft(roomSettings.timeLimit);
          startQuestionSuspense(roomSettings.timeLimit);
          if (channelRef.current) {
            channelRef.current.send({
              type: 'broadcast',
              event: 'arena-started',
              payload: {
                pin: pinCode,
                timeLimit: roomSettings.timeLimit,
                gameMode: roomSettings.gameMode,
              },
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
          break;
        case 'REVEAL_PERSONAL':
          playCorrectSound();
          setState('REVEAL_PERSONAL');
          if (channelRef.current) {
            channelRef.current.send({
              type: 'broadcast',
              event: 'round-reveal',
            });
          }
          break;
        case 'START_DEBRIEF':
          setState('TEACHER_DEBRIEF');
          break;
        case 'SHOW_LEADERBOARD':
          playClimberSound();
          setState('LEADERBOARD');
          break;
        case 'NEXT_ROUND':
          playPodiumSound();
          setState('PODIUM');
          break;
      }
    },
    [pinCode, playCorrectSound, playClimberSound, playPodiumSound, roomSettings.timeLimit, roomSettings.gameMode]
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
            joinUrl={joinUrl}
          />
        )}

        {state === 'QUESTION_LIVE' && (
          <div className="w-full space-y-6">
            <div className="text-purple-300 text-xs font-mono font-bold tracking-widest uppercase flex items-center justify-center gap-2">
              <span>CÂU HỎI 1 / 1 · IELTS COLLOCATION ({roomSettings.timeLimit} GIÂY)</span>
              {roomSettings.gameMode === 'GOLD_QUEST' && (
                <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-400/40 rounded-full text-[10px]">
                  💰 CƯỚP VÀNG LIVE
                </span>
              )}
            </div>

            {/* Prompt */}
            <h2 className="text-2xl md:text-4xl font-extrabold text-white max-w-2xl mx-auto leading-relaxed">
              "The enterprise decided to <span className="text-orange-400 border-b-2 border-orange-400">______</span> an investment in clean technology."
            </h2>

            {/* Incense Timer */}
            <ArenaIncenseTimer timeLeftSeconds={timeLeft} totalTimeSeconds={roomSettings.timeLimit} />

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
              Đã nhận {Object.keys(answers).length} câu trả lời. Chuẩn bị xem phổ đáp án.
            </p>
          </div>
        )}

        {(state === 'REVEAL_DISTRIBUTION' || state === 'REVEAL_PERSONAL' || state === 'TEACHER_DEBRIEF') && (
          <div className="w-full space-y-6">
            <div className="text-purple-300 text-xs font-mono font-bold tracking-widest uppercase">
              PHÂN PHỐI ĐÁP ÁN CỦA LỚP
            </div>

            {/* Distribution Bar Chart */}
            <div className="grid grid-cols-4 gap-4 max-w-xl mx-auto items-end h-48 pt-6">
              {[
                { label: 'A. make', pct: distribution.A, isCorrect: true },
                { label: 'B. do', pct: distribution.B, isCorrect: false },
                { label: 'C. take', pct: distribution.C, isCorrect: false },
                { label: 'D. create', pct: distribution.D, isCorrect: false },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end">
                  <span className="text-sm font-black text-white">{item.pct}%</span>
                  <div
                    className={`w-full rounded-xl transition-all duration-700 ${
                      state !== 'REVEAL_DISTRIBUTION' && item.isCorrect
                        ? 'bg-emerald-500 shadow-lg shadow-emerald-500/30'
                        : 'bg-purple-950/60 border border-purple-800/40'
                    }`}
                    style={{ height: `${Math.max(15, item.pct * 1.8)}px` }}
                  />
                  <span
                    className={`text-xs font-bold ${
                      state !== 'REVEAL_DISTRIBUTION' && item.isCorrect
                        ? 'text-emerald-400 font-black'
                        : 'text-purple-300'
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Misconception Academic Diagnostic */}
            {state === 'TEACHER_DEBRIEF' && roomSettings.showDebrief && (
              <div className="max-w-xl mx-auto p-4 bg-red-950/40 border border-red-500/30 rounded-2xl text-left animate-fadeIn">
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider block mb-1">
                  💡 Chẩn đoán Bẫy Misconception ({distribution.B}% học sinh mắc phải):
                </span>
                <p className="text-sm text-slate-300 leading-relaxed font-medium">
                  Học sinh nhầm lẫn giữa <strong className="text-white">"make an investment"</strong> (Collocation chuẩn) với <strong className="text-red-300">"do an investment"</strong> (Lỗi dịch theo tư duy tiếng Việt: làm/thực hiện đầu tư).
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
          <div className="space-y-6 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-400/10 border border-amber-400/30 rounded-full text-amber-300 text-xs font-black uppercase">
              <Sparkles className="w-4 h-4" /> Bục Vinh Danh Quán Quân
            </div>
            <h2 className="text-4xl font-black text-amber-400">
              {topFive.length > 0 ? `CHÚC MỪNG ${topFive[0].nickname}!` : 'HOÀN THÀNH VÒNG ĐẤU!'}
            </h2>
            <p className="text-purple-200/80 text-sm">
              {topFive.length > 0
                ? (roomSettings.gameMode === 'GOLD_QUEST'
                    ? `Vua Đào Vàng với tổng tài sản tích lũy ${topFive[0].totalScore} vàng!`
                    : `Đạt ${topFive[0].totalScore} điểm với tốc độ chính xác tuyệt đối.`)
                : 'Không có người trả lời chính xác.'}
            </p>
          </div>
        )}
      </main>

      {/* Bottom Contextual Control Footer */}
      <footer className="flex justify-center border-t border-purple-900/40 pt-4">
        <TeacherContextualButton state={state} onExecuteCommand={handleExecuteCommand} />
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


