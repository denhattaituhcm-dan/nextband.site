import React from "react";
import { Sparkles } from "lucide-react";
import { SeasonalEventType } from "../core/types";
import { getSeasonalTheme } from "../core/seasonalThemeAdapter";

interface SeasonalWalletHeaderBadgeProps {
  type?: SeasonalEventType;
  totalCash: number;
  totalXp: number;
  remainingSlots?: number;
  onClick?: () => void;
}

export function SeasonalWalletHeaderBadge({
  type = "TET",
  totalCash,
  totalXp,
  remainingSlots,
  onClick,
}: SeasonalWalletHeaderBadgeProps) {
  const theme = getSeasonalTheme(type);

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl ${theme.headerWalletGradient} text-white shadow-xs border ${theme.headerWalletBorder} select-none cursor-default transition-all hover:shadow-md`}
    >
      <span className="text-base leading-none">{theme.headerWalletIcon}</span>
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5">
          <span className={`text-[10px] font-semibold ${theme.headerWalletSubColor} uppercase tracking-wider`}>
            {theme.headerWalletLabel}
          </span>
          {remainingSlots !== undefined && (
            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-black/20 text-white/90">
              Còn {remainingSlots} suất
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 font-black text-xs leading-none mt-0.5">
          {totalCash > 0 ? (
            <span className={`${theme.headerWalletAmountColor} tracking-tight`}>
              {totalCash.toLocaleString("vi-VN")}đ
            </span>
          ) : (
            <span className="text-white/90">0đ</span>
          )}
          {totalXp > 0 && (
            <span className="text-[10px] text-white/80 font-bold ml-1">
              +{totalXp} XP
            </span>
          )}
        </div>
      </div>
      <Sparkles className="w-3.5 h-3.5 text-amber-200 fill-amber-200 shrink-0 ml-0.5" />
    </div>
  );
}
