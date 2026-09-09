import React, { useEffect, useState } from "react";
import { Sparkles, X, CheckCircle2, Award, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TET_THEME } from "./theme";

export interface TetOpeningModalProps {
  isOpen: boolean;
  onClose: () => void;
  rewardType: "CASH" | "VOUCHER" | "HONOR_XP";
  amount: number;
  totalAccumulated: number;
  examTitle?: string;
  isPoolExhausted?: boolean;
}

/**
 * Lightweight Web Audio Synthesizer for Festive Tet Chime (Pentatonic scales)
 */
function playFestiveTetChime() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    // Pentatonic festive chime: C5, D5, E5, G5, A5, C6
    const notes = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5];

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0.01, ctx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + idx * 0.08 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + idx * 0.08 + 0.55);
    });
  } catch {
    // Browser audio policy safeguard
  }
}

export function TetOpeningModal({
  isOpen,
  onClose,
  rewardType,
  amount,
  totalAccumulated,
  examTitle,
  isPoolExhausted,
}: TetOpeningModalProps) {
  const [proverb] = useState(() => TET_THEME.getRandomProverb());

  useEffect(() => {
    if (isOpen) {
      playFestiveTetChime();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isCash = rewardType === "CASH";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-gradient-to-b from-red-900 via-slate-900 to-slate-950 text-white rounded-3xl border-2 border-amber-400/80 shadow-2xl p-6 md:p-8 space-y-6 overflow-hidden">
        {/* Decorative Golden Corner Accents */}
        <div className="absolute top-2 left-2 text-amber-400/50 text-xs select-none">❖</div>
        <div className="absolute top-2 right-2 text-amber-400/50 text-xs select-none">❖</div>
        <div className="absolute bottom-2 left-2 text-amber-400/50 text-xs select-none">❖</div>
        <div className="absolute bottom-2 right-2 text-amber-400/50 text-xs select-none">❖</div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Ribbon */}
        <div className="text-center space-y-1 pt-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Khai Bút Đầu Xuân</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </div>
          <h2 className="text-2xl font-black text-amber-100 tracking-tight">
            Mở Lộc Tri Thức Thành Công!
          </h2>
          {examTitle && (
            <p className="text-xs text-white/70 truncate max-w-xs mx-auto">
              Bài tập: <span className="text-amber-200 font-semibold">{examTitle}</span>
            </p>
          )}
        </div>

        {/* Central Red Envelope Graphic with Open Flap */}
        <div className="flex flex-col items-center justify-center py-2 relative">
          <div className="w-32 h-44 relative bg-gradient-to-b from-red-600 to-rose-700 rounded-2xl border-2 border-amber-300/80 shadow-xl flex flex-col items-center justify-between p-3 select-none">
            {/* Open Flap Indicator */}
            <div className="w-full h-8 bg-red-700/60 rounded-t-xl border-b border-amber-300/30 flex items-center justify-center">
              <span className="text-amber-300 text-xs font-black tracking-widest">ARIS</span>
            </div>

            {/* Center Gold Seal */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-yellow-500 text-red-900 flex flex-col items-center justify-center font-black shadow-md border-2 border-amber-100">
              <span className="text-xl">LỘC</span>
              <span className="text-[9px] font-bold uppercase tracking-tighter">Đắc Thắng</span>
            </div>

            {/* Bottom Text */}
            <div className="text-[10px] text-amber-200/90 font-bold uppercase">
              Xuân Đinh Mùi
            </div>
          </div>

          {/* Reward Amount Callout */}
          <div className="mt-4 text-center space-y-1">
            <div className="text-xs text-white/80 font-medium">
              {isCash ? "Lì xì may mắn trao tặng:" : "Phần thưởng danh dự trao tặng:"}
            </div>
            <div className="text-3xl font-black text-amber-300 tracking-tight drop-shadow-sm">
              {isCash
                ? `+${amount.toLocaleString("vi-VN")} VNĐ`
                : `+${amount} XP Danh Dự`}
            </div>
            {isPoolExhausted && (
              <div className="text-[11px] text-amber-200/80 italic">
                (Đã hoàn thành phân bổ lộc tiền mặt — Nhận Lộc Danh Dự bứt phá Band)
              </div>
            )}
          </div>
        </div>

        {/* Speech from Viện Trưởng Huyền Cơ */}
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-400/20 text-xs space-y-1.5">
          <div className="flex items-center gap-1.5 text-amber-300 font-bold text-[11px]">
            <Heart className="w-3.5 h-3.5 fill-amber-300" />
            <span>Lời Chúc Đầu Năm Từ Viện Trưởng Huyền Cơ:</span>
          </div>
          <p className="text-white/90 italic leading-relaxed">
            “{proverb}”
          </p>
        </div>

        {/* Total Wallet Status & Confirm Button */}
        <div className="space-y-3 pt-1 border-t border-white/10">
          <div className="flex items-center justify-between text-xs text-white/80 font-semibold px-1">
            <span>Tổng lộc xuân em đã tích lũy:</span>
            <span className="text-amber-300 font-black text-sm">
              {totalAccumulated > 0
                ? `${totalAccumulated.toLocaleString("vi-VN")}đ`
                : `${amount} XP`}
            </span>
          </div>

          <Button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-black py-5 rounded-2xl shadow-lg shadow-amber-500/20 text-sm gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Tiếp Tục Rèn Luyện</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
