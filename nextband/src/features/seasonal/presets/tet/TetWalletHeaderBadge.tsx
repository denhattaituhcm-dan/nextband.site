import React from "react";
import { Sparkles } from "lucide-react";

interface TetWalletHeaderBadgeProps {
  totalCash: number;
  totalXp: number;
  remainingSlots?: number;
  onClick?: () => void;
}

export function TetWalletHeaderBadge({
  totalCash,
  totalXp,
  remainingSlots,
  onClick,
}: TetWalletHeaderBadgeProps) {
  return (
    <div
      onClick={onClick}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white shadow-xs border border-amber-300/40 select-none cursor-default transition-all hover:shadow-md"
    >
      <span className="text-base leading-none">🧧</span>
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-semibold text-amber-100 uppercase tracking-wider">
            Lộc Khai Bút
          </span>
          {remainingSlots !== undefined && (
            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-black/20 text-amber-200">
              Còn {remainingSlots} suất
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 font-black text-xs leading-none mt-0.5">
          {totalCash > 0 ? (
            <span className="text-amber-200 tracking-tight">
              {totalCash.toLocaleString("vi-VN")}đ
            </span>
          ) : (
            <span className="text-amber-100">0đ</span>
          )}
          {totalXp > 0 && (
            <span className="text-[10px] text-white/90 font-bold ml-1">
              +{totalXp} XP
            </span>
          )}
        </div>
      </div>
      <Sparkles className="w-3.5 h-3.5 text-amber-200 fill-amber-200 shrink-0 ml-0.5" />
    </div>
  );
}
