/**
 * ARENA LOBBY KAHOOT COMPONENT - ULTRA-VISIBILITY UPGRADE
 * Tối ưu tầm nhìn máy chiếu xa 4m - 10m:
 * - Mã vạch QR Code SIÊU LỚN (kích thước ~200px - 260px) chiếm vị trí trang trọng, camera điện thoại ngồi xa quét bắt nét tức thì
 * - Tương tác click phóng to Modal Full màn hình nếu cần quét ở cự ly cực xa
 * - Mã PIN 111 999 siêu to khổng lồ
 * - Phối màu chuẩn Canva & Kahoot Candy Pop
 */

import React, { useState } from 'react';
import { Users, UserCheck, Sparkles, QrCode, Maximize2, X } from 'lucide-react';
import { PvZCardAvatar } from '@/components/arena/PvZCardAvatar';
import { getCharacterBySeed } from '@/lib/arena/characterCatalog';

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
  maxSlots = 24,
  pinCode,
  joinUrl = '/arena/join',
}) => {
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const currentCount = players.length;
  const fullJoinUrlWithPin = `${joinUrl}?pin=${pinCode}&v=2`;
  
  // Tạo mã QR vector siêu nét, kích thước phân giải gốc 500x500
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(fullJoinUrlWithPin)}&margin=2&format=svg`;

  const getAvatarUrl = (seed?: number | string, name?: string) => {
    const avatarKey = seed || name || 'student';
    return `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(String(avatarKey))}`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col items-center space-y-7 animate-fadeIn select-none">
      {/* KAHOOT ULTRA-BANNER: Mã vạch QR phóng to gấp 3 lần để ngồi xa 4m-6m vẫn quét cực nhạy */}
      <div className="w-full bg-white text-slate-900 rounded-[2.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.5)] p-5 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8 border-4 border-purple-200">
        
        {/* CỘT 1: Hướng dẫn tham gia & Link web */}
        <div className="text-center lg:text-left space-y-2 flex-1">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-100 text-purple-900 rounded-full text-xs md:text-sm font-black uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-purple-600 animate-spin" /> Tham gia trận đấu
          </div>
          <p className="text-2xl md:text-3xl lg:text-4xl font-black text-[#46178f] font-mono tracking-tight underline cursor-pointer hover:text-purple-600 transition-colors">
            {typeof window !== 'undefined' ? `${window.location.host}/arena/join` : 'nextband.vn/arena/join'}
          </p>
          <p className="text-sm md:text-base text-slate-600 font-bold">
            📱 Dùng Camera điện thoại quét mã vạch bên cạnh để vào ngay!
          </p>
        </div>

        {/* CỘT 2: GAME PIN SIÊU TO KHỔNG LỒ */}
        <div className="text-center px-8 md:px-10 py-4 bg-gradient-to-b from-slate-50 to-purple-50 rounded-3xl border-2 border-purple-200 shadow-inner">
          <span className="text-xs md:text-sm font-black text-purple-600 uppercase tracking-widest block mb-1">
            MÃ PIN TRẬN ĐẤU
          </span>
          <span className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-950 tracking-widest font-mono drop-shadow-md">
            {pinCode.length === 6 ? `${pinCode.slice(0, 3)} ${pinCode.slice(3)}` : pinCode}
          </span>
        </div>

        {/* CỘT 3: MÃ VẠCH QR CODE SIÊU LỚN (ĐƯỢC NÂNG CẤP KÍCH THƯỚC ĐỂ NGỒI XA QUÉT DỄ DÀNG) */}
        <div className="flex flex-col items-center gap-2 relative group">
          <div 
            onClick={() => setIsQrModalOpen(true)}
            className="p-3 bg-white rounded-3xl border-4 border-purple-300 shadow-2xl cursor-pointer transform hover:scale-105 transition-all duration-300 relative"
            title="Bấm để phóng to mã QR toàn màn hình"
          >
            <img
              src={qrCodeUrl}
              alt={`Mã QR PIN ${pinCode}`}
              className="w-44 h-44 sm:w-52 sm:h-52 md:w-56 md:h-56 rounded-2xl object-contain"
              loading="eager"
            />
            <div className="absolute inset-0 bg-purple-900/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="px-3 py-1 bg-slate-950/80 text-white rounded-full text-xs font-bold flex items-center gap-1">
                <Maximize2 className="w-3.5 h-3.5" /> Bấm để phóng to
              </span>
            </div>
          </div>
          <span className="text-xs md:text-sm font-black text-purple-950 uppercase tracking-wider flex items-center gap-1.5 animate-pulse">
            <QrCode className="w-4 h-4 text-purple-700" /> Quét mã vào ngay
          </span>
        </div>
      </div>

      {/* POPUP PHÓNG TO MÃ QR KHỔNG LỒ (NẾU PHÒNG HỌC QUÁ RỘNG) */}
      {isQrModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-6 animate-in fade-in zoom-in-95 duration-200"
          onClick={() => setIsQrModalOpen(false)}
        >
          <div 
            className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl flex flex-col items-center space-y-6 max-w-lg w-full text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsQrModalOpen(false)}
              className="absolute top-5 right-5 w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-all cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-1">
              <h3 className="text-2xl md:text-3xl font-black text-slate-900">QUÉT MÃ VÀO PHÒNG</h3>
              <p className="text-base font-bold text-purple-700">Mã PIN: {pinCode}</p>
            </div>

            <div className="p-4 bg-white rounded-3xl border-4 border-purple-400 shadow-inner">
              <img
                src={qrCodeUrl}
                alt={`Mã QR Full ${pinCode}`}
                className="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-2xl object-contain"
              />
            </div>

            <p className="text-xs text-slate-500 font-semibold">
              Học viên giơ điện thoại từ bất cứ vị trí nào trong phòng để quét mã
            </p>
          </div>
        </div>
      )}

      {/* BRANDING HEADER: "Đấu trường Aris" & Sĩ số phòng */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full px-4 pt-1">
        <div className="flex items-center gap-3 mb-2 md:mb-0">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-orange-500/30">
            🔥
          </div>
          <div className="text-left">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white drop-shadow-md">
              ĐẤU TRƯỜNG ARIS
            </h2>
            <span className="text-xs text-purple-200/80 font-bold uppercase tracking-wider">
              NextQuiz Classroom
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
            <div
              key={p.id || idx}
              className={`p-3.5 ${palette.bg} border-2 ${palette.border} rounded-2xl flex flex-col items-center text-center space-y-2 shadow-xl ${palette.glow} animate-in fade-in zoom-in-75 duration-300 transform hover:-translate-y-1 transition-all min-h-[180px] justify-between cursor-default relative`}
            >
              {/* Thẻ bài Avatar Sprite */}
              <div className="relative pt-0.5">
                <PvZCardAvatar seed={p.avatarSeed !== undefined ? p.avatarSeed : p.name} size="md" />
                <span className="absolute -top-1 -right-2 w-5 h-5 bg-emerald-400 border-2 border-white rounded-full flex items-center justify-center shadow-md">
                  <UserCheck className="w-3 h-3 text-slate-900" />
                </span>
              </div>

              {/* Tên học sinh & Tên nhân vật */}
              <div className="w-full">
                <p className="text-sm font-black text-white truncate max-w-[120px] mx-auto tracking-wide drop-shadow-sm">
                  {p.name}
                </p>
                <span className="text-[10px] font-bold text-amber-300 block truncate max-w-[120px] mx-auto mt-0.5">
                  {getCharacterBySeed(p.avatarSeed !== undefined ? p.avatarSeed : p.name).name}
                </span>
              </div>

              <div className="w-full py-1 bg-black/25 rounded-lg text-[10px] font-black text-emerald-300 uppercase tracking-wider flex items-center justify-center gap-1 border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                Sẵn sàng
              </div>
            </div>
          ) : (
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
