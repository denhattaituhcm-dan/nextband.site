import React from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";

interface TetEnvelopeBadgeProps {
  isCompleted: boolean;
  isClaimed: boolean;
  claimedAmount?: number;
  rewardType?: "CASH" | "VOUCHER" | "HONOR_XP";
  onClaim?: () => void;
  isClaiming?: boolean;
}

export function TetEnvelopeBadge({
  isCompleted,
  isClaimed,
  claimedAmount,
  rewardType = "CASH",
  onClaim,
  isClaiming = false,
}: TetEnvelopeBadgeProps) {
  // Case 1: Already claimed for this homework
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

  // Case 2: Homework completed, ready to claim/open envelope!
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

  // Case 3: Homework not yet completed (teaser / motivation)
  return (
    <div
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200/70 dark:border-red-900/50 text-red-700 dark:text-red-400 text-[11px] font-semibold opacity-85"
      title="Hoàn thành bài tập để nhận lượt khai lộc đầu xuân"
    >
      <span className="text-xs">🧧</span>
      <span>Khai Bút Nhận Lộc</span>
    </div>
  );
}
