/**
 * STUDENT JOIN PAGE (/arena/join)
 * Màn hình nhập mã PIN và Nickname cho học viên trên điện thoại.
 * Tự động điền mã PIN từ URL khi học viên quét mã QR (ví dụ: /arena/join?pin=111999).
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function ArenaJoinPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [pin, setPin] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Tự động nhận mã PIN nếu học viên quét mã QR
  useEffect(() => {
    const urlPin = searchParams.get('pin');
    if (urlPin && urlPin.trim().length === 6) {
      setPin(urlPin.trim());
    } else {
      // Gợi ý mã PIN mặc định 111999
      setPin('111999');
    }
  }, [searchParams]);

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanPin = pin.trim();
    const cleanNick = nickname.trim();

    if (!cleanPin || cleanPin.length !== 6) {
      setError('Mã PIN phải gồm 6 chữ số');
      return;
    }

    if (!cleanNick) {
      setError('Vui lòng nhập tên của bạn');
      return;
    }

    setIsLoading(true);

    try {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('arena_pin', cleanPin);
        sessionStorage.setItem('arena_nickname', cleanNick);
      }

      // Phát broadcast tới Host phòng
      const channel = supabase.channel(`arena-room-${cleanPin}`);
      
      await new Promise<void>((resolve) => {
        channel.subscribe(async (status) => {
          if (status === 'SUBSCRIBED') {
            await channel.send({
              type: 'broadcast',
              event: 'player-joined',
              payload: {
                id: `p_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
                name: cleanNick,
                avatarSeed: cleanNick,
                rank: 'Học viên',
                joinedAt: new Date().toISOString(),
              },
            });
            resolve();
          }
        });
        // Timeout an toàn 1.5s nếu mạng chậm
        setTimeout(resolve, 1500);
      });

      // Chuyển hướng sang màn hình thi đấu
      navigate(`/arena/play?pin=${cleanPin}&name=${encodeURIComponent(cleanNick)}`);
    } catch (err: any) {
      setError(err.message || 'Lỗi tham gia phòng');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#150a33] text-white flex flex-col items-center justify-center p-4 font-sans select-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2a135e] via-[#150a33] to-[#0a051b]">
      <div className="w-full max-w-sm space-y-6">
        {/* Title & Brand */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" /> NextQuiz
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">VÀO PHÒNG ĐẤU</h1>
          <p className="text-xs text-slate-400">Nhập mã PIN hiển thị trên màn chiếu hoặc quét mã QR</p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleJoin} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
              Mã PIN (6 số)
            </label>
            <input
              type="text"
              maxLength={6}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
              placeholder="VD: 111999"
              className="w-full px-4 py-3.5 bg-white/10 border border-white/20 backdrop-blur-md focus:border-orange-500 rounded-xl text-center text-2xl font-black tracking-widest text-orange-400 font-mono outline-none transition-all placeholder:text-slate-600 placeholder:text-base placeholder:tracking-normal placeholder:font-sans"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
              Tên / Biệt danh của bạn
            </label>
            <input
              type="text"
              maxLength={20}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="VD: Bảo Nam"
              className="w-full px-4 py-3.5 bg-white/10 border border-white/20 backdrop-blur-md focus:border-orange-500 rounded-xl text-white font-bold outline-none transition-all placeholder:text-slate-600"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-950/40 border border-red-500/30 rounded-xl text-xs text-red-400 text-center font-semibold">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-base rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            {isLoading ? 'Đang vào phòng...' : (
              <>
                THAM GIA NGAY <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

