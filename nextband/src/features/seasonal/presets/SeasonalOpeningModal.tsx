import React, { useEffect, useState } from "react";
import { Sparkles, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SeasonalEventType } from "../core/types";
import { getSeasonalTheme } from "../core/seasonalThemeAdapter";

export interface SeasonalOpeningModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: SeasonalEventType;
  rewardType: "CASH" | "VOUCHER" | "HONOR_XP";
  amount: number;
  totalAccumulated: number;
  examTitle?: string;
  isPoolExhausted?: boolean;
}

/**
 * Lightweight Web Audio Synthesizer for Festive Chime (Pentatonic scale)
 */
function playFestiveChime() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

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
    // Audio safeguard
  }
}

export function SeasonalOpeningModal({
  isOpen,
  onClose,
  type = "TET",
  rewardType,
  amount,
  totalAccumulated,
  examTitle,
  isPoolExhausted,
}: SeasonalOpeningModalProps) {
  const theme = getSeasonalTheme(type);
  const [proverb] = useState(() => theme.getRandomProverb());

  useEffect(() => {
    if (isOpen) {
      playFestiveChime();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isCash = rewardType === "CASH";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className={`relative w-full max-w-md ${theme.modalBgGradient} text-white rounded-3xl border-2 ${theme.modalBorder} shadow-2xl p-6 md:p-8 space-y-6 overflow-hidden`}>
        {/* Decorative Golden Corner Accents */}
        <div className="absolute top-2 left-2 text-amber-400/50 text-xs select-none">❖</div>
        <div className="absolute top-2 right-2 text-amber-400/50 text-xs select-none">❖</div>
        <div className="absolute bottom-2 left-2 text-amber-400/50 text-xs select-none">❖</div>
        <div className="absolute bottom-2 right-2 text-amber-400/50 text-xs select-none">❖</div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Ribbon */}
        <div className="text-center space-y-1 pt-2">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${theme.modalBadgeBg} ${theme.modalBadgeText} border ${theme.modalBadgeBorder} text-xs font-bold uppercase tracking-wider`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>{theme.modalEventTitle}</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h2 className="text-2xl font-black text-amber-100 tracking-tight">
            {theme.modalHeadingSuccess}
          </h2>
          {examTitle && (
            <p className="text-xs text-white/70 truncate max-w-xs mx-auto">
              Bài tập: <span className="text-amber-200 font-semibold">{examTitle}</span>
            </p>
          )}
        </div>

        {/* Central Graphic Item based on Event Theme */}
        <div className="flex flex-col items-center justify-center py-2 relative">
          <div className="w-32 h-44 relative bg-gradient-to-b from-amber-600 to-yellow-800 rounded-2xl border-2 border-amber-300/80 shadow-xl flex flex-col items-center justify-between p-3 select-none">
            {/* Open Flap Indicator */}
            <div className="w-full h-8 bg-black/20 rounded-t-xl border-b border-amber-300/30 flex items-center justify-center">
              <span className="text-amber-300 text-xs font-black tracking-widest">ARIS</span>
            </div>

            {/* Center Theme Seal */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-yellow-500 text-amber-950 flex flex-col items-center justify-center font-black shadow-md border-2 border-amber-100">
              <span className="text-2xl">{theme.icon}</span>
              <span className="text-[8px] font-bold uppercase tracking-tighter mt-0.5">
                {type === "TEACHERS_DAY" ? "TRI ÂN" : type === "BACK_TO_SCHOOL" ? "TỰU TRƯỜNG" : type === "MID_AUTUMN" ? "ĐÊM TRĂNG" : "ĐẮC THẮNG"}
              </span>
            </div>

            {/* Bottom Text */}
            <div className="text-[10px] text-amber-100 font-bold uppercase text-center truncate w-full">
              {theme.badgeLabel}
            </div>
          </div>

          {/* Reward Amount Callout */}
          <div className="mt-4 text-center space-y-1">
            <div className="text-xs text-white/80 font-medium">
              {isCash ? `${theme.modalGiftTitle}:` : "Phần thưởng danh dự trao tặng:"}
            </div>
            <div className="text-3xl font-black text-amber-300 tracking-tight drop-shadow-sm">
              {isCash
                ? `+${amount.toLocaleString("vi-VN")} VNĐ`
                : `+${amount} XP (${theme.modalHonorBadge})`}
            </div>
            {isPoolExhausted && (
              <div className="text-[11px] text-amber-200/80 italic">
                (Đã đạt giới hạn quỹ tiền mặt — Nhận phần thưởng Danh Dự bứt phá Band)
              </div>
            )}
          </div>
        </div>

        {/* Speech from Viện Trưởng Huyền Cơ */}
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-400/20 text-xs space-y-1.5">
          <div className="flex items-center gap-1.5 text-amber-300 font-bold text-[11px]">
            <Heart className="w-3.5 h-3.5 fill-amber-300" />
            <span>{theme.modalWisdomTitle}:</span>
          </div>
          <p className="text-white/90 italic leading-relaxed">
            “{proverb}”
          </p>
        </div>

        {/* Total Wallet Status & Confirm Button */}
        <div className="space-y-3 pt-1 border-t border-white/10">
          <div className="flex items-center justify-between text-xs text-white/80 font-semibold px-1">
            <span>Tổng tích lũy sự kiện:</span>
            <span className="text-amber-300 font-black text-sm">
              {totalAccumulated > 0
                ? `${totalAccumulated.toLocaleString("vi-VN")}đ`
                : `${amount > 0 ? amount.toLocaleString("vi-VN") : 0}đ`}
            </span>
          </div>

          <Button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-stone-950 font-black text-sm py-5 rounded-2xl shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            Đã Tiếp Nhận & Tiếp Tục Làm Bài
          </Button>
        </div>
      </div>
    </div>
  );
}
