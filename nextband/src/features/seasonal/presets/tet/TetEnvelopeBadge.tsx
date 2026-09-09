import React from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";

interface TetEnvelopeBadgeProps {
  isCompleted: boolean;
  isClaimed: boolean;
  claimedAmount?: number;
  rewardType?: "CASH" | "VOUCHER" | "HONOR_XP";
  onClaim?: () => void;
  isClaiming?: boolean;
  isOverdue?: boolean;
}

export function TetEnvelopeBadge({
  isCompleted,
  isClaimed,
  claimedAmount,
  rewardType = "CASH",
  onClaim,
  isClaiming = false,
  isOverdue = false,
}: TetEnvelopeBadgeProps) {
  // Case 1: Overdue homeworks lose lucky money privilege
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
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-400/40 text-amber-700 dark:text-amber-300 text-xs font-bold shadow-2xs">
        <span className="text-sm">🧧</span>
        <span>Đã Khai Lộc:</span>
        <span className="font-extrabold text-amber-600 dark:text-amber-400">{displayText}</span>
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 ml-0.5" />
      </div>
    );
  }

  // Case 3: Homework completed on time, ready to claim/open envelope!
  if (isCompleted) {
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClaim?.();
        }}
        disabled={isClaiming}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-black shadow-sm shadow-red-500/30 border border-amber-300/60 animate-pulse hover:animate-none transition-transform hover:scale-105 active:scale-95 cursor-pointer"
        title="Bấm để mở bao lì xì khai bút"
      >
        <span className="text-sm">🧧</span>
        <span>{isClaiming ? "Đang mở..." : "Mở Lộc Ngay"}</span>
        <Sparkles className="w-3.5 h-3.5 text-amber-200 fill-amber-200" />
      </button>
    );
  }

  // Case 4: Homework not yet completed (teaser / motivation: strictly informational, cannot open until completed)
  return (
    <div
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-500/10 dark:bg-red-950/30 border border-red-300/60 dark:border-red-900/60 text-red-700 dark:text-red-300 text-[11px] font-bold"
      title="Hoàn thành & nộp bài đúng hạn để mở bao lì xì này"
    >
      <span className="text-xs">🧧</span>
      <span>Nộp bài để mở lộc</span>
    </div>
  );
}
