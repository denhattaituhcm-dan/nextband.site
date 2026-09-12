/**
 * TEACHER HOST VIEW (/arena/host)
 * Màn hình trình chiếu của Giáo viên cho phòng học 10-20 học viên.
 * Thiết kế Kahoot Top Banner kèm Mã Vạch QR Code và Mã PIN đơn giản 111999 (hoặc tự do tùy biến).
 * Nhận học viên thật 100% qua Supabase Realtime Channel.
 */

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useArenaAudio } from '@/hooks/arena/useArenaAudio';
import { ArenaLobbyKahoot, LobbyPlayer } from '@/components/arena/ArenaLobbyKahoot';
import { ArenaIncenseTimer } from '@/components/arena/ArenaIncenseTimer';
import { TeacherContextualButton } from '@/components/arena/TeacherContextualButton';
import { ArenaState, HostCommandType, PlayerPublicRank } from '@/lib/arena/types';
import { Volume2, VolumeX, CheckCircle2, Sparkles } from 'lucide-react';

interface PlayerAnswerRecord {
  playerId: string;
  nickname: string;
  optionId: string;
  timeLeft: number;
  score: number;
}

export default function ArenaHostPage() {
  const [searchParams] = useSearchParams();
  // Ưu tiên mã PIN đơn giản theo yêu cầu: 111999 (hoặc từ URL nếu có truyền ?pin=...)
  const [pinCode] = useState<string>(() => {
    const urlPin = searchParams.get('pin');
    if (urlPin && urlPin.trim().length === 6) return urlPin.trim();
    return '111999';
  });

  const [state, setState] = useState<ArenaState>('LOBBY');
  // Phòng rỗng 100%, chỉ có học sinh thật tham gia qua Broadcast
  const [players, setPlayers] = useState<LobbyPlayer[]>([]);
  const [answers, setAnswers] = useState<Record<string, PlayerAnswerRecord>>({});
  const [timeLeft, setTimeLeft] = useState<number>(15);

  const {
    isBgmEnabled,
    playLobbyBgm,
    stopLobbyBgm,
    toggleBgm,
    playCorrectSound,
    playClimberSound,
    playPodiumSound,
    playClickSound,
  } = useArenaAudio();

  const channelRef = useRef<any>(null);

  // Lắng nghe học sinh tham gia realtime và gửi đáp án qua Supabase Broadcast Channel
  useEffect(() => {
    if (!pinCode) return;

    const channelName = `arena-room-${pinCode}`;
    const channel = supabase.channel(channelName, {
      config: {
        broadcast: { ack: true },
      },
    });

    channel
      .on('broadcast', { event: 'player-joined' }, ({ payload }) => {
        if (!payload || !payload.name) return;
        setPlayers((prev) => {
          if (prev.some((p) => p.name.trim().toLowerCase() === payload.name.trim().toLowerCase())) {
            return prev;
          }
          return [
            ...prev,
            {
              id: payload.id || `p_${Date.now()}`,
              name: payload.name.trim(),
              avatarSeed: payload.avatarSeed || payload.name,
              rank: payload.rank || 'Học viên',
              joinedAt: payload.joinedAt || new Date().toISOString(),
            },
          ];
        });
        playClickSound();
      })
      .on('broadcast', { event: 'player-answered' }, ({ payload }) => {
        if (!payload || !payload.nickname) return;
        const optionId = payload.optionId;
        const isCorrect = optionId === 'opt_A';
        const speedBonus = (payload.timeLeft || 1) * 10;
        const score = isCorrect ? 100 + speedBonus : 0;

        setAnswers((prev) => ({
          ...prev,
          [payload.nickname]: {
            playerId: payload.nickname,
            nickname: payload.nickname,
            optionId,
            timeLeft: payload.timeLeft || 0,
            score,
          },
        }));
      })
      .subscribe();

    channelRef.current = channel;

    return () => {
      supabase.removeChannel(channel);
    };
  }, [pinCode, playClickSound]);

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

  // Bảng xếp hạng điểm thật
  const topFive: PlayerPublicRank[] = useMemo(() => {
    return Object.values(answers)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map((item, idx) => ({
        rank: idx + 1,
        playerId: item.playerId,
        nickname: item.nickname,
        totalScore: item.score,
      }));
  }, [answers]);

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
          setTimeLeft(15);
          if (channelRef.current) {
            channelRef.current.send({
              type: 'broadcast',
              event: 'arena-started',
              payload: { pin: pinCode },
            });
          }
          break;
        case 'LOCK_ROUND':
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
    [pinCode, playCorrectSound, playClimberSound, playPodiumSound]
  );

  const joinUrl = typeof window !== 'undefined' ? `${window.location.origin}/arena/join` : '/arena/join';

  return (
    <div className="min-h-screen bg-[#150a33] text-white flex flex-col justify-between p-6 select-none font-sans bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2a135e] via-[#150a33] to-[#0a051b]">
      {/* Top Header Bar */}
      <header className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 font-black text-sm">
            NA
          </div>
          <div>
            <h1 className="text-base font-black tracking-wide text-slate-200">CLASS ARENA</h1>
            <span className="text-xs text-slate-500 font-medium">NextBand Classroom Engine</span>
          </div>
        </div>

        {/* Music Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleBgm}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold rounded-full transition-all cursor-pointer text-slate-300"
          >
            {isBgmEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-emerald-400" /> Nhạc đang bật
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-slate-500" /> Đã tắt nhạc
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
            maxSlots={10}
            pinCode={pinCode}
            joinUrl={joinUrl}
          />
        )}

        {state === 'QUESTION_LIVE' && (
          <div className="w-full space-y-6">
            <div className="text-slate-400 text-xs font-mono font-bold tracking-widest uppercase">
              CÂU HỎI 1 / 1 · IELTS COLLOCATION
            </div>

            {/* Prompt */}
            <h2 className="text-2xl md:text-4xl font-extrabold text-white max-w-2xl mx-auto leading-relaxed">
              "The enterprise decided to <span className="text-orange-400 border-b-2 border-orange-400">______</span> an investment in clean technology."
            </h2>

            {/* Incense Timer */}
            <ArenaIncenseTimer timeLeftSeconds={timeLeft} totalTimeSeconds={15} />

            <div className="text-xs text-slate-400">
              Đã nhận câu trả lời: <span className="text-orange-400 font-bold">{Object.keys(answers).length}</span> / {players.length} học viên
            </div>
          </div>
        )}

        {state === 'ANSWER_LOCKED' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center mx-auto text-red-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-black text-white">ĐÃ KHÓA CÂU TRẢ LỜI</h2>
            <p className="text-slate-400 text-sm">
              Đã nhận {Object.keys(answers).length} câu trả lời. Chuẩn bị xem phổ đáp án.
            </p>
          </div>
        )}

        {(state === 'REVEAL_DISTRIBUTION' || state === 'REVEAL_PERSONAL' || state === 'TEACHER_DEBRIEF') && (
          <div className="w-full space-y-6">
            <div className="text-slate-400 text-xs font-mono font-bold tracking-widest uppercase">
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
                        : 'bg-slate-800'
                    }`}
                    style={{ height: `${Math.max(15, item.pct * 1.8)}px` }}
                  />
                  <span
                    className={`text-xs font-bold ${
                      state !== 'REVEAL_DISTRIBUTION' && item.isCorrect
                        ? 'text-emerald-400 font-black'
                        : 'text-slate-400'
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Misconception Academic Diagnostic */}
            {state === 'TEACHER_DEBRIEF' && (
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
            <div className="text-slate-400 text-xs font-mono font-bold tracking-widest uppercase mb-4">
              BẢNG XẾP HẠNG TOP 5 CỦA LỚP
            </div>
            {topFive.length === 0 ? (
              <p className="text-sm text-slate-500">Chưa có học sinh nào nộp câu trả lời</p>
            ) : (
              topFive.map((p) => (
                <div
                  key={p.playerId}
                  className="flex items-center justify-between p-3.5 bg-slate-900 border border-slate-800 rounded-2xl shadow-md"
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
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {p.rank}
                    </div>
                    <span className="font-extrabold text-white text-sm">{p.nickname}</span>
                  </div>
                  <span className="text-sm font-black text-amber-400 font-mono">
                    {p.totalScore} pts
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
            <p className="text-slate-400 text-sm">
              {topFive.length > 0 ? `Đạt ${topFive[0].totalScore} điểm với tốc độ chính xác tuyệt đối.` : 'Không có người trả lời chính xác.'}
            </p>
          </div>
        )}
      </main>

      {/* Bottom Contextual Control Footer */}
      <footer className="flex justify-center border-t border-slate-800 pt-4">
        <TeacherContextualButton state={state} onExecuteCommand={handleExecuteCommand} />
      </footer>
    </div>
  );
}

