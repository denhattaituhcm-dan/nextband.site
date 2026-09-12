/**
 * TEACHER HOST VIEW (/arena/host)
 * Màn hình trình chiếu của Giáo viên cho phòng học 10-20 học viên.
 * Tích hợp: Pop-in Avatar, Nhạc nền gathering.mp3, Nén nhang Incense Timer,
 * Single Contextual Button, Biểu đồ phân phối đáp án, và Chẩn đoán Misconception.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useArenaAudio } from '@/hooks/arena/useArenaAudio';
import { ArenaPopInBadges, ArenaLobbyPlayer } from '@/components/arena/ArenaPopInBadges';
import { ArenaIncenseTimer } from '@/components/arena/ArenaIncenseTimer';
import { TeacherContextualButton } from '@/components/arena/TeacherContextualButton';
import { ArenaState, HostCommandType, PlayerPublicRank } from '@/lib/arena/types';
import { Volume2, VolumeX, Users, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ArenaHostPage() {
  const [pinCode] = useState<string>('839210');
  const [state, setState] = useState<ArenaState>('LOBBY');
  const [players] = useState<ArenaLobbyPlayer[]>([
    { id: 'p1', nickname: 'Bảo Nam' },
    { id: 'p2', nickname: 'Phương Linh' },
    { id: 'p3', nickname: 'Minh Huy' },
    { id: 'p4', nickname: 'Tuấn Kiệt' },
    { id: 'p5', nickname: 'Khánh An' },
  ]);
  const [timeLeft, setTimeLeft] = useState<number>(15);
  const [distribution] = useState<Record<string, number>>({
    A: 65, // make an investment (Correct)
    B: 20, // do an investment (Collocation Error)
    C: 10, // take
    D: 5,  // create
  });
  const [topFive] = useState<PlayerPublicRank[]>([
    { rank: 1, playerId: 'p1', nickname: 'Bảo Nam', totalScore: 115 },
    { rank: 2, playerId: 'p3', nickname: 'Minh Huy', totalScore: 110 },
    { rank: 3, playerId: 'p2', nickname: 'Phương Linh', totalScore: 105 },
    { rank: 4, playerId: 'p5', nickname: 'Khánh An', totalScore: 100 },
    { rank: 5, playerId: 'p4', nickname: 'Tuấn Kiệt', totalScore: 95 },
  ]);

  const {
    isBgmEnabled,
    playLobbyBgm,
    stopLobbyBgm,
    toggleBgm,
    playCorrectSound,
    playClimberSound,
    playPodiumSound,
  } = useArenaAudio();

  // Tự động bật BGM khi vào Lobby
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
          break;
        case 'LOCK_ROUND':
          setState('ANSWER_LOCKED');
          break;
        case 'REVEAL_DISTRIBUTION':
          setState('REVEAL_DISTRIBUTION');
          break;
        case 'REVEAL_PERSONAL':
          playCorrectSound();
          setState('REVEAL_PERSONAL');
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
    [playCorrectSound, playClimberSound, playPodiumSound]
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between p-6 select-none font-sans">
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

        {/* PIN Code & Music Toggle */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-900 border border-slate-800 rounded-full">
            <span className="text-xs text-slate-400 font-bold uppercase">Mã PIN:</span>
            <span className="text-xl font-black text-orange-400 tracking-widest font-mono">
              {pinCode}
            </span>
          </div>

          <button
            onClick={toggleBgm}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold rounded-full transition-all cursor-pointer text-slate-300"
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
      <main className="flex-1 flex flex-col items-center justify-center my-6 text-center max-w-4xl mx-auto w-full">
        {state === 'LOBBY' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-400 text-xs font-black tracking-wider uppercase">
              <Users className="w-4 h-4" /> {players.length} Học viên đã sẵn sàng
            </div>
            <div className="space-y-2">
              <p className="text-sm md:text-base font-semibold text-slate-400">
                Học viên truy cập <span className="text-white underline font-mono font-bold">{typeof window !== 'undefined' ? `${window.location.host}/arena/join` : '/arena/join'}</span>
              </p>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                Nhập mã PIN <span className="text-orange-400 font-mono tracking-widest">{pinCode}</span> để tham gia
              </h2>
            </div>

            {/* Pop-in Avatar Badges */}
            <ArenaPopInBadges players={players} />
          </div>
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
          </div>
        )}

        {state === 'ANSWER_LOCKED' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center mx-auto text-red-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-black text-white">ĐÃ KHÓA CÂU TRẢ LỜI</h2>
            <p className="text-slate-400 text-sm">Toàn bộ 100% học sinh đã nộp bài. Chuẩn bị xem phổ đáp án.</p>
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
                  💡 Chẩn đoán Bẫy Misconception (20% học sinh mắc phải):
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
            {topFive.map((p) => (
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
            ))}
          </div>
        )}

        {state === 'PODIUM' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-400/10 border border-amber-400/30 rounded-full text-amber-300 text-xs font-black uppercase">
              <Sparkles className="w-4 h-4" /> Bục Vinh Danh Quán Quân
            </div>
            <h2 className="text-4xl font-black text-amber-400">CHÚC MỪNG {topFive[0].nickname}!</h2>
            <p className="text-slate-400 text-sm">
              Đạt điểm số cao nhất với tốc độ chính xác tuyệt đối.
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
