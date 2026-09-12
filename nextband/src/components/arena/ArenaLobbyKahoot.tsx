/**
 * ARENA LOBBY KAHOOT COMPONENT
 * Thiết kế chuẩn phong cách Kahoot:
 * - Top Banner trắng nổi bật chứa:
 *   + Hướng dẫn: "Tham gia tại nextband.vn/arena/join hoặc quét mã QR"
 *   + Game PIN siêu lớn: 111999
 *   + Mã vạch QR Code để học viên quét camera điện thoại là vào thẳng phòng
 * - Khu vực bên dưới: Vòng tròn đếm sĩ số và danh sách ô thẻ học viên nảy ra ngay khi join
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

  // Link đầy đủ kèm mã PIN để khi quét QR học viên không cần gõ lại PIN
  const fullJoinUrlWithPin = `${joinUrl}?pin=${pinCode}`;
  
  // Tạo mã QR vector chất lượng cao thông qua Google Chart API / QR Server
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(fullJoinUrlWithPin)}&margin=4`;

  const getAvatarUrl = (seed?: number | string, name?: string) => {
    const avatarKey = seed || name || 'student';
    return `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(String(avatarKey))}`;
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center space-y-8 animate-fadeIn">
      {/* KAHOOT TOP BANNER: Trắng tương phản cực mạnh, chuẩn xác như màn chiếu Kahoot */}
      <div className="w-full bg-white text-slate-900 rounded-3xl shadow-2xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6 border-4 border-slate-200">
        {/* Cột trái: Hướng dẫn truy cập */}
        <div className="text-center md:text-left space-y-1">
          <span className="text-xs md:text-sm font-extrabold text-slate-500 uppercase tracking-wider block">
            Tham gia tại
          </span>
          <p className="text-xl md:text-2xl font-black text-indigo-950 font-mono tracking-tight underline">
            {typeof window !== 'undefined' ? `${window.location.host}/arena/join` : 'nextband.vn/arena/join'}
          </p>
          <span className="text-xs text-slate-400 font-semibold block">
            hoặc dùng camera điện thoại quét mã QR bên cạnh
          </span>
        </div>

        {/* Cột giữa: GAME PIN cỡ lớn */}
        <div className="text-center px-6 py-2 bg-slate-100/80 rounded-2xl border border-slate-200">
          <span className="text-xs font-black text-slate-500 uppercase tracking-widest block">
            MÃ PIN PHÒNG
          </span>
          <span className="text-4xl md:text-6xl font-black text-slate-950 tracking-widest font-mono">
            {pinCode.length === 6 ? `${pinCode.slice(0, 3)} ${pinCode.slice(3)}` : pinCode}
          </span>
        </div>

        {/* Cột phải: Mã vạch QR Code quét vào ngay */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="p-2 bg-white rounded-2xl border-2 border-slate-300 shadow-md">
            <img
              src={qrCodeUrl}
              alt={`QR Code PIN ${pinCode}`}
              className="w-24 h-24 md:w-28 md:h-28 rounded-lg object-contain"
              loading="eager"
            />
          </div>
          <span className="text-[11px] font-black text-indigo-900 uppercase tracking-wider">
            Quét mã vào ngay
          </span>
        </div>
      </div>

      {/* Thông số phòng & Vòng tròn tiến trình đếm số học viên */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full">
        <div className="relative w-32 h-32 md:w-36 md:h-36 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="70"
              cy="70"
              r="58"
              className="stroke-slate-900 fill-none"
              strokeWidth="9"
            />
            <circle
              cx="70"
              cy="70"
              r="58"
              className="stroke-orange-500 fill-none transition-all duration-500 ease-out"
              strokeWidth="9"
              strokeDasharray={364}
              strokeDashoffset={Math.max(0, 364 - (364 * Math.min(currentCount, maxSlots)) / maxSlots)}
              strokeLinecap="round"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-0.5">
            <span className="text-3xl md:text-4xl font-black text-white">{currentCount}</span>
            <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider">Học viên</span>
          </div>
        </div>

        <div className="text-center md:text-left space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-400 text-xs font-bold uppercase tracking-wider">
            <Users className="w-4 h-4" /> Sảnh chờ thi đấu · {currentCount}/{maxSlots}
          </div>
          <h3 className="text-xl md:text-2xl font-black text-white">
            {currentCount === 0 ? 'Đang đợi học viên tham gia...' : `${currentCount} học viên đã sẵn sàng!`}
          </h3>
          <p className="text-xs text-slate-400">
            Màn hình sẽ tự động cập nhật ngay khi học sinh tham gia bằng điện thoại
          </p>
        </div>
      </div>

      {/* Grid of Slots (10 ô học viên phong cách Kahoot) */}
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
