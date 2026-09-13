/**
 * ARENA PODIUM VIEW
 * Bục vinh danh Olympic 3 cấp (Top 1, 2, 3) chuẩn phong cách Kahoot.
 * Hiển thị huy chương, tổng điểm/vàng và nút Bắt đầu trận mới.
 */

import React from 'react';
import { Trophy, Medal, RotateCcw, Crown, Sparkles, Award } from 'lucide-react';
import { PlayerPublicRank } from '@/lib/arena/types';

interface ArenaPodiumViewProps {
  rankings: PlayerPublicRank[];
  gameMode?: 'CLASSIC' | 'GOLD_QUEST';
  onRestart?: () => void;
}

export const ArenaPodiumView: React.FC<ArenaPodiumViewProps> = React.memo(({
  rankings,
  gameMode = 'CLASSIC',
  onRestart,
}) => {
  const first = rankings[0];
  const second = rankings[1];
  const third = rankings[2];
  const rest = rankings.slice(3, 5);

  const unitLabel = gameMode === 'GOLD_QUEST' ? '🪙 Vàng' : 'pts';

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center py-6 px-4 space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/20 border border-amber-400/40 rounded-full text-amber-300 text-xs font-black uppercase tracking-widest shadow-lg">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" /> BẢNG VINH DANH CHUNG CUỘC
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          QUÁN QUÂN NEXTQUIZ 🏆
        </h1>
        <p className="text-sm text-purple-200/80 font-medium">
          Chúc mừng các chiến binh xuất sắc nhất của trận đấu hôm nay!
        </p>
      </div>

      {/* Olympic 3-tier Podium */}
      <div className="flex items-end justify-center gap-3 md:gap-6 w-full max-w-2xl pt-8 pb-4">
        {/* Hạng 2 (Silver) */}
        <div className="flex-1 flex flex-col items-center space-y-3">
          {second ? (
            <div className="flex flex-col items-center space-y-1 animate-fadeIn">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-slate-300/20 border-2 border-slate-300 flex items-center justify-center text-2xl md:text-3xl font-black text-slate-200 shadow-xl shadow-slate-400/20">
                {second.nickname.charAt(0).toUpperCase()}
              </div>
              <span className="font-black text-sm md:text-base text-slate-200 truncate max-w-[110px]">
                {second.nickname}
              </span>
              <span className="text-xs md:text-sm font-black text-slate-300 font-mono">
                {second.totalScore} {unitLabel}
              </span>
            </div>
          ) : (
            <div className="h-20" />
          )}
          <div className="w-full h-32 md:h-40 bg-gradient-to-t from-slate-800 to-slate-600 rounded-t-2xl border-t-4 border-slate-300 flex flex-col items-center justify-center text-white shadow-2xl">
            <Medal className="w-8 h-8 text-slate-300 mb-1" />
            <span className="text-3xl font-black">2</span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-300">Á QUÂN</span>
          </div>
        </div>

        {/* Hạng 1 (Gold - Cao nhất) */}
        <div className="flex-1 flex flex-col items-center space-y-3 -mt-6">
          {first ? (
            <div className="flex flex-col items-center space-y-1 relative animate-fadeIn">
              <div className="absolute -top-7 text-amber-400 animate-bounce">
                <Crown className="w-8 h-8 fill-amber-400" />
              </div>
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-amber-400/20 border-4 border-amber-400 flex items-center justify-center text-3xl md:text-4xl font-black text-amber-300 shadow-2xl shadow-amber-500/40">
                {first.nickname.charAt(0).toUpperCase()}
              </div>
              <span className="font-black text-base md:text-lg text-amber-300 truncate max-w-[130px]">
                {first.nickname}
              </span>
              <span className="text-sm md:text-base font-black text-amber-400 font-mono">
                {first.totalScore} {unitLabel}
              </span>
            </div>
          ) : (
            <div className="h-24" />
          )}
          <div className="w-full h-44 md:h-56 bg-gradient-to-t from-amber-700 via-amber-600 to-amber-500 rounded-t-2xl border-t-4 border-amber-300 flex flex-col items-center justify-center text-white shadow-2xl shadow-amber-500/30">
            <Trophy className="w-10 h-10 text-amber-200 mb-1 animate-pulse" />
            <span className="text-4xl md:text-5xl font-black">1</span>
            <span className="text-[11px] uppercase font-black tracking-widest text-amber-100">QUÁN QUÂN</span>
          </div>
        </div>

        {/* Hạng 3 (Bronze) */}
        <div className="flex-1 flex flex-col items-center space-y-3">
          {third ? (
            <div className="flex flex-col items-center space-y-1 animate-fadeIn">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-amber-800/20 border-2 border-amber-700 flex items-center justify-center text-2xl md:text-3xl font-black text-amber-600 shadow-xl shadow-amber-800/20">
                {third.nickname.charAt(0).toUpperCase()}
              </div>
              <span className="font-black text-sm md:text-base text-amber-500 truncate max-w-[110px]">
                {third.nickname}
              </span>
              <span className="text-xs md:text-sm font-black text-amber-600 font-mono">
                {third.totalScore} {unitLabel}
              </span>
            </div>
          ) : (
            <div className="h-20" />
          )}
          <div className="w-full h-24 md:h-32 bg-gradient-to-t from-amber-950 to-amber-800 rounded-t-2xl border-t-4 border-amber-700 flex flex-col items-center justify-center text-white shadow-2xl">
            <Award className="w-7 h-7 text-amber-600 mb-1" />
            <span className="text-2xl font-black">3</span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">HẠNG 3</span>
          </div>
        </div>
      </div>

      {/* Honor Roll: Hạng 4 & 5 nếu có */}
      {rest.length > 0 && (
        <div className="w-full max-w-md space-y-2 pt-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300/80 block text-center">
            BẢNG DANH DỰ (TOP 4 & 5)
          </span>
          <div className="grid grid-cols-1 gap-2">
            {rest.map((p) => (
              <div
                key={p.playerId}
                className="flex items-center justify-between px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-md bg-purple-900/60 border border-purple-700 flex items-center justify-center text-xs font-black text-purple-300">
                    {p.rank}
                  </span>
                  <span className="text-sm font-bold text-slate-200">{p.nickname}</span>
                </div>
                <span className="text-xs font-mono font-bold text-amber-400">
                  {p.totalScore} {unitLabel}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Button: Chơi lại trận mới */}
      {onRestart && (
        <div className="pt-4">
          <button
            onClick={onRestart}
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-base md:text-lg rounded-2xl shadow-xl shadow-orange-500/20 transition-all cursor-pointer transform hover:scale-105 active:scale-95"
          >
            <RotateCcw className="w-5 h-5" /> BẮT ĐẦU TRẬN MỚI (VỀ SẢNH CHỜ)
          </button>
        </div>
      )}
    </div>
  );
});

ArenaPodiumView.displayName = 'ArenaPodiumView';
