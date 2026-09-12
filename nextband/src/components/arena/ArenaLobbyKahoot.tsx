/**
 * ARENA LOBBY KAHOOT COMPONENT
 * Tái sử dụng phong cách hiển thị Lobby Kahoot từ tab Đấu trường cũ:
 * - Vòng tròn SVG đếm số học viên tham gia / đồng môn
 * - Grid các ô slot học viên:
 *   + Khi có học viên: Avatar Dicebear + tên + Sẵn sàng
 *   + Khi chưa có: Ô dashed "Đang đợi..."
 * Tuân thủ Hiến pháp:
 * - Điều 12 (Component chỉ render)
 * - Điều 41 (Zero-Fluff UI & Web Standards thuần túy)
 */

import React from 'react';
import { Users, UserCheck } from 'lucide-react';

export interface LobbyPlayer {
  id: string;
  name: string;
  avatarSeed?: number | string;
  rank?: string;
  joinedAt?: string;
}

interface ArenaLobbyKahootProps {
  players: LobbyPlayer[];
  maxSlots?: number;
  pinCode: string;
  joinUrl?: string;
}

export const ArenaLobbyKahoot: React.FC<ArenaLobbyKahootProps> = React.memo(({
  players,
  maxSlots = 10,
  pinCode,
  joinUrl = '/arena/join',
}) => {
  const currentCount = players.length;
  const circumference = 440;
  const strokeDashoffset = Math.max(0, circumference - (circumference * Math.min(currentCount, maxSlots)) / maxSlots);

  const getAvatarUrl = (seed?: number | string, name?: string) => {
    const avatarKey = seed || name || 'student';
    return `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(String(avatarKey))}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center space-y-6 animate-fadeIn">
      {/* Header Info */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-400 text-xs font-black tracking-wider uppercase">
          <Users className="w-4 h-4" /> Sảnh chờ thi đấu · {currentCount}/{maxSlots}
        </div>
        
        <p className="text-sm md:text-base font-semibold text-slate-400">
          Học viên truy cập <span className="text-white underline font-mono font-bold">{joinUrl}</span>
        </p>

        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          Nhập mã PIN <span className="text-orange-400 font-mono tracking-widest">{pinCode}</span> để tham gia
        </h2>
      </div>

      {/* Central Ring Progress */}
      <div className="relative w-36 h-36 md:w-40 md:h-40 mx-auto flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r="70"
            className="stroke-slate-900 fill-none"
            strokeWidth="10"
          />
          <circle
            cx="80"
            cy="80"
            r="70"
            className="stroke-orange-500 fill-none transition-all duration-500 ease-out"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-0.5">
          <span className="text-3xl md:text-4xl font-extrabold text-white">{currentCount}</span>
          <span className="text-[11px] font-bold text-orange-300 uppercase tracking-wider">Học viên</span>
        </div>
      </div>

      {/* Grid of Slots */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5 w-full">
        {Array.from({ length: maxSlots }).map((_, idx) => {
          const p = players[idx];
          return p ? (
            <div
              key={p.id || idx}
              className="p-3.5 bg-slate-900/90 border border-orange-500/40 rounded-2xl flex flex-col items-center text-center space-y-2 shadow-lg shadow-orange-500/5 animate-in fade-in zoom-in-75 duration-300 transform hover:scale-105 transition-all min-h-[140px] justify-between"
            >
              <img
                src={getAvatarUrl(p.avatarSeed, p.name)}
                alt={p.name}
                className="w-12 h-12 rounded-full border-2 border-orange-400 bg-slate-950 p-1 object-cover"
                loading="lazy"
              />
              <div className="w-full">
                <p className="text-xs md:text-sm font-bold text-white truncate max-w-[120px] mx-auto">
                  {p.name}
                </p>
                {p.rank && (
                  <p className="text-[10px] font-semibold px-2 py-0.5 bg-slate-800 text-orange-300 rounded-full inline-block mt-0.5 border border-orange-500/20">
                    {p.rank}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                <UserCheck className="w-3 h-3" />
                <span>Sẵn sàng</span>
              </div>
            </div>
          ) : (
            <div
              key={`empty_${idx}`}
              className="p-3.5 bg-slate-950/40 border border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center text-center text-slate-600 min-h-[140px] transition-colors"
            >
              <Users className="w-6 h-6 text-slate-700 mb-1.5 animate-pulse" />
              <p className="text-[11px] font-medium text-slate-600">Đang đợi...</p>
            </div>
          );
        })}
      </div>
    </div>
  );
});

ArenaLobbyKahoot.displayName = 'ArenaLobbyKahoot';
