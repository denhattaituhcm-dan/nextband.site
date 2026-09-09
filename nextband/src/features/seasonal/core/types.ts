/**
 * ARIS Seasonal Layer - Core Data Types & Contracts
 */

export type SeasonalEventType = "TET" | "TEACHERS_DAY" | "BACK_TO_SCHOOL" | "MID_AUTUMN";

export interface SeasonalUIConfig {
  showBlossom: boolean;
  showEnvelopes: boolean;
  showModal: boolean;
  showPetals: boolean;
  playChime: boolean;
  bannerTitle?: string;
  bannerSubtitle?: string;
}

export interface SeasonalRewardPoolItem {
  id: string;
  tier: "SMALL" | "MEDIUM" | "LARGE" | "SPECIAL";
  amount: number;
  totalSlots: number;
  claimedSlots: number;
}

export interface SeasonalEventSummary {
  id: string;
  code: string;
  name: string;
  type: SeasonalEventType;
  isActive: boolean;
  startAt: string | null;
  endAt: string | null;
  budgetCap: number;
  totalSlots: number;
  claimedSlots: number;
  remainingSlots: number;
  totalCashBudget: number;
  spentCashBudget: number;
  remainingCashBudget: number;
  uiConfig: SeasonalUIConfig;
  pools?: SeasonalRewardPoolItem[];
}

export interface SeasonalStudentProgress {
  claimedExamIds: string[];
  totalCashEarned: number;
  totalHonorXp: number;
  claimsCount: number;
  history: Array<{
    id: string;
    homeworkId: string;
    rewardType: "CASH" | "VOUCHER" | "HONOR_XP";
    amount: number;
    claimedAt: string;
  }>;
}

export interface SeasonalClaimResult {
  success: boolean;
  isFirstClaim: boolean;
  rewardType: "CASH" | "VOUCHER" | "HONOR_XP";
  amount: number;
  totalCashEarned: number;
  totalHonorXp: number;
  isPoolExhausted: boolean;
  message?: string;
}
