import React from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { SeasonalEventType } from "../core/types";
import { getSeasonalTheme } from "../core/seasonalThemeAdapter";

interface SeasonalEnvelopeBadgeProps {
  type?: SeasonalEventType;
  isCompleted: boolean;
  isClaimed: boolean;
  claimedAmount?: number;
  rewardType?: "CASH" | "VOUCHER" | "HONOR_XP";
  onClaim?: () => void;
  isClaiming?: boolean;
  isOverdue?: boolean;
}

export function SeasonalEnvelopeBadge({
  type = "TET",
  isCompleted,
  isClaimed,
  claimedAmount,
  rewardType = "CASH",
  onClaim,
  isClaiming = false,
  isOverdue = false,
}: SeasonalEnvelopeBadgeProps) {
  const theme = getSeasonalTheme(type);

  // Case 1: Overdue homeworks lose reward privilege
  if (isOverdue && !isClaimed) {
    return null;
  }

  // Case 2: Already claimed for this homework
  if (isClaimed) {
    const displayText =
      rewardType === "CASH" && claimedAmount
        ? `+${claimedAmount.toLocaleString("vi-VN")}đ`
        : `+${claimedAmount || 200} XP`;

    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-bold shadow-2xs ${theme.envelopeClaimedStyle}`}>
        <span className="text-sm">{theme.envelopeClaimedIcon}</span>
        <span>{theme.envelopeClaimedLabel}:</span>
        <span className="font-extrabold">{displayText}</span>
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 ml-0.5" />
      </div>
    );
  }

  // Case 3: Homework completed on time, ready to claim/open!
  if (isCompleted) {
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClaim?.();
        }}
        disabled={isClaiming}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black shadow-sm border animate-pulse hover:animate-none transition-transform hover:scale-105 active:scale-95 cursor-pointer ${theme.envelopeReadyStyle}`}
        title={`Bấm để ${theme.envelopeReadyLabel.toLowerCase()}`}
      >
        <span className="text-sm">{theme.envelopeReadyIcon}</span>
        <span>{isClaiming ? "Đang mở..." : theme.envelopeReadyLabel}</span>
        <Sparkles className="w-3.5 h-3.5 text-amber-200 fill-amber-200" />
      </button>
    );
  }

  // Case 4: Homework not yet completed (teaser / motivation: strictly informational, cannot open until completed)
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-bold ${theme.envelopeTeaserStyle}`}
      title={theme.envelopeTeaserTitle}
    >
      <span className="text-xs">{theme.envelopeTeaserIcon}</span>
      <span>{theme.envelopeTeaserLabel}</span>
    </div>
  );
}
