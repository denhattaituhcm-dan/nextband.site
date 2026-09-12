/**
 * ARENA LOBBY KAHOOT COMPONENT - AESTHETIC UPGRADE (CANVA & KAHOOT PALETTE)
 * Áp dụng triết lý thiết kế đồ họa từ Canva Quiz/Kahoot:
 * - Màu chủ đạo: Nền tím hoàng gia sâu thẳm (#160d38 -> #281559 -> #0d0624)
 * - Top Banner trắng bo góc lớn (pill-card), bóng đổ đa lớp sang trọng (luxury glassmorphism & soft drop shadow)
 * - Logo "Kahoot của Aris" / "NextBand Arena" typography tròn trịa, vui nhộn, tràn đầy năng lượng
 * - Thẻ học viên: Phối màu Candy Pop đa sắc kiểu Kahoot (Tím, Xanh ngọc, Cam đào, Hồng sen, Vàng chanh)
 *   Mỗi thẻ có Avatar nhân vật đáng yêu, tên học sinh rõ nét, trạng thái Ready phát sáng
 * - Hiệu ứng nảy (pop-in bounce) mượt mà khi học viên vào phòng
 */

import React from 'react';
import { Users, UserCheck, Sparkles, QrCode } from 'lucide-react';

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

// Bảng phối màu Candy Pop vui tươi lấy cảm hứng từ các mẫu Canva Quiz & Kahoot
const CARD_PALETTES = [
  { bg: 'bg-[#46178f]', border: 'border-[#8e44ad]', badge: 'bg-[#6c3483]', text: 'text-purple-100', glow: 'shadow-purple-900/40' },
  { bg: 'bg-[#1368ce]', border: 'border-[#3498db]', badge: 'bg-[#1b4f72]', text: 'text-blue-100', glow: 'shadow-blue-900/40' },
  { bg: 'bg-[#d89e00]', border: 'border-[#f39c12]', badge: 'bg-[#7d6608]', text: 'text-amber-100', glow: 'shadow-amber-900/40' },
  { bg: 'bg-[#26890c]', border: 'border-[#2ecc71]', badge: 'bg-[#196f3d]', text: 'text-emerald-100', glow: 'shadow-emerald-900/40' },
  { bg: 'bg-[#e21b3c]', border: 'border-[#ff5252]', badge: 'bg-[#78281f]', text: 'text-rose-100', glow: 'shadow-rose-900/40' },
  { bg: 'bg-[#0542ab]', border: 'border-[#4a90e2]', badge: 'bg-[#0b2545]', text: 'text-sky-100', glow: 'shadow-sky-900/40' },
];

export const ArenaLobbyKahoot: React.FC<ArenaLobbyKahootProps> = React.memo(({
  players,
  maxSlots = 12,
  pinCode,
  joinUrl = '/arena/join',
}) => {
  const currentCount = players.length;
  const fullJoinUrlWithPin = `${joinUrl}?pin=${pinCode}`;
  
  // Mã QR độ nét cao với viền trắng tối ưu quét camera
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(fullJoinUrlWithPin)}&margin=4&format=svg`;

  // Avatar phong cách Bottts đáng yêu của Dicebear (chuẩn avatar hoạt hình như Kahoot trong ảnh)
  const getAvatarUrl = (seed?: number | string, name?: string) => {
    const avatarKey = seed || name || 'student';
    return `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(String(avatarKey))}`;
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center space-y-7 animate-fadeIn select-none">
      {/* KAHOOT TOP BANNER: Phong cách Canva Pill Card siêu mịn & tương phản tối thượng */}
      <div className="w-full bg-white text-slate-900 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.4)] p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6 border-4 border-purple-100">
        {/* Cột 1: Hướng dẫn tham gia */}
        <div className="text-center md:text-left space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" /> Tham gia tại
          </div>
          <p className="text-xl md:text-2xl font-black text-[#46178f] font-mono tracking-tight underline cursor-pointer hover:text-purple-600 transition-colors">
            {typeof window !== 'undefined' ? `${window.location.host}/arena/join` : 'nextband.vn/arena/join'}
          </p>
          <span className="text-xs text-slate-500 font-semibold block">
            hoặc mở Camera điện thoại quét mã QR bên phải
          </span>
        </div>

        {/* Cột 2: GAME PIN Cực Lớn */}
        <div className="text-center px-8 py-3 bg-gradient-to-b from-slate-50 to-purple-50/50 rounded-2xl border-2 border-purple-200/80 shadow-inner">
          <span className="text-[11px] font-black text-purple-600 uppercase tracking-widest block">
            MÃ PIN TRẬN ĐẤU
          </span>
          <span className="text-5xl md:text-6xl font-black text-slate-950 tracking-widest font-mono drop-shadow-sm">
            {pinCode.length === 6 ? `${pinCode.slice(0, 3)} ${pinCode.slice(3)}` : pinCode}
          </span>
        </div>

        {/* Cột 3: Mã QR Barcode cao cấp */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="p-2 bg-white rounded-2xl border-2 border-purple-200 shadow-md transform hover:scale-105 transition-transform">
            <img
              src={qrCodeUrl}
              alt={`Mã QR PIN ${pinCode}`}
              className="w-24 h-24 md:w-28 md:h-28 rounded-xl object-contain"
              loading="eager"
            />
          </div>
          <span className="text-[11px] font-black text-purple-900 uppercase tracking-wider flex items-center gap-1">
            <QrCode className="w-3.5 h-3.5 text-purple-700" /> Quét vào ngay
          </span>
        </div>
      </div>

      {/* BRANDING HEADER: "Kahoot của Aris" & Sĩ số phòng */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full px-4 pt-2">
        <div className="flex items-center gap-3 mb-2 md:mb-0">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-orange-500/30">
            🔥
          </div>
          <div className="text-left">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white drop-shadow-md">
              ĐẤU TRƯỜNG ARIS
            </h2>
            <span className="text-xs text-purple-200/80 font-bold uppercase tracking-wider">
              Realtime Classroom Arena
            </span>
          </div>
        </div>

        {/* Counter sĩ số học viên */}
        <div className="flex items-center gap-3 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-xl">
          <div className="w-8 h-8 rounded-full bg-emerald-400/20 border border-emerald-400 flex items-center justify-center text-emerald-400 font-black text-sm">
            {currentCount}
          </div>
          <span className="text-sm font-bold text-slate-100">
            {currentCount === 0 ? 'Đang đợi học viên tham gia...' : `${currentCount} học viên đã vào phòng`}
          </span>
        </div>
      </div>

      {/* GRID CÁC Ô HỌC VIÊN PHONG CÁCH KAHOOT (CANDY POP CARDS) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 w-full pt-1">
        {Array.from({ length: maxSlots }).map((_, idx) => {
          const p = players[idx];
          const palette = CARD_PALETTES[idx % CARD_PALETTES.length];

          return p ? (
            /* Thẻ học viên đã vào phòng: Màu sắc rực rỡ, Avatar hoạt họa, chữ trắng cực nổi */
            <div
              key={p.id || idx}
              className={`p-4 ${palette.bg} border-2 ${palette.border} rounded-2xl flex flex-col items-center text-center space-y-2.5 shadow-xl ${palette.glow} animate-in fade-in zoom-in-75 duration-300 transform hover:-translate-y-1 transition-all min-h-[155px] justify-between cursor-default`}
            >
              <div className="relative">
                <img
                  src={getAvatarUrl(p.avatarSeed, p.name)}
                  alt={p.name}
                  className="w-14 h-14 rounded-2xl bg-white/15 p-1 border-2 border-white/40 shadow-md object-contain"
                  loading="lazy"
                />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-400 border-2 border-white rounded-full flex items-center justify-center">
                  <UserCheck className="w-3 h-3 text-slate-900" />
                </span>
              </div>

              <div className="w-full">
                <p className="text-sm font-black text-white truncate max-w-[110px] mx-auto tracking-wide drop-shadow-sm">
                  {p.name}
                </p>
                <span className={`text-[10px] font-bold px-2 py-0.5 ${palette.badge} text-white/90 rounded-full inline-block mt-1 border border-white/20`}>
                  {p.rank || 'Học viên'}
                </span>
              </div>

              <div className="w-full py-1 bg-black/20 rounded-lg text-[10px] font-black text-emerald-300 uppercase tracking-wider flex items-center justify-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                Sẵn sàng
              </div>
            </div>
          ) : (
            /* Ô chờ trống: Nền mờ sang trọng, đường viền nét đứt tinh tế */
            <div
              key={`empty_${idx}`}
              className="p-4 bg-white/5 border-2 border-dashed border-white/15 rounded-2xl flex flex-col items-center justify-center text-center text-white/30 min-h-[155px] space-y-2 backdrop-blur-xs hover:border-white/25 transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                <Users className="w-5 h-5 text-white/40 animate-pulse" />
              </div>
              <span className="text-[11px] font-bold text-white/40 tracking-wider uppercase">
                Đang đợi...
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
});

ArenaLobbyKahoot.displayName = 'ArenaLobbyKahoot';
