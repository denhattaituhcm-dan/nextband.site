/**
 * STUDENT JOIN PAGE (/arena/join)
 * Màn hình nhập mã PIN và Nickname cho học viên trên điện thoại.
 * Tối giản tối đa (Zero-Fluff), tham gia < 10 giây.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function ArenaJoinPage() {
  const navigate = useNavigate();
  const [pin, setPin] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!pin.trim() || !nickname.trim()) {
      setError('Vui lòng nhập đầy đủ mã PIN và Tên');
      return;
    }

    setIsLoading(true);

    try {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('arena_pin', pin.trim());
        sessionStorage.setItem('arena_nickname', nickname.trim());
      }

      // Chuyển hướng sang màn hình thi đấu
      navigate(`/arena/play?pin=${pin.trim()}&name=${encodeURIComponent(nickname.trim())}`);
    } catch (err: any) {
      setError(err.message || 'Lỗi tham gia phòng');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4 font-sans select-none">
      <div className="w-full max-w-sm space-y-6">
        {/* Title & Brand */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" /> NextBand Arena
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">VÀO PHÒNG ĐẤU</h1>
          <p className="text-xs text-slate-400">Nhập mã PIN hiển thị trên màn chiếu của Giáo viên</p>
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
              placeholder="VD: 839210"
              className="w-full px-4 py-3.5 bg-slate-900 border border-slate-800 focus:border-orange-500 rounded-xl text-center text-2xl font-black tracking-widest text-orange-400 font-mono outline-none transition-all placeholder:text-slate-600 placeholder:text-base placeholder:tracking-normal placeholder:font-sans"
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
              className="w-full px-4 py-3.5 bg-slate-900 border border-slate-800 focus:border-orange-500 rounded-xl text-white font-bold outline-none transition-all placeholder:text-slate-600"
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
