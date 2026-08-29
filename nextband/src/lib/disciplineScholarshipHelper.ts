/**
 * ARIS Discipline Scholarship (Học Bổng Kỷ Luật) Engine & State Helper
 * Synchronized with ARIS Course Policy:
 * - Cấp 1: BTVN >= 80% & Chuyên cần >= 90% -> 200.000đ
 * - Cấp 2: BTVN >= 90% & Chuyên cần >= 90% -> 300.000đ
 * - Cấp 3: BTVN 100% & Chuyên cần >= 90% -> 500.000đ
 */

export type DisciplineTierKey = "TIER_1" | "TIER_2" | "TIER_3";

export interface DisciplineTierConfig {
  key: DisciplineTierKey;
  levelName: string;
  subTitle: string;
  minHomeworkRate: number; // 0.8, 0.9, 1.0
  minAttendanceRate: number; // 0.9 for all tiers
  rewardAmount: number; // in VND
  rewardFormatted: string;
  badgeLabel: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  icon: string;
  description: string;
}

export const DISCIPLINE_TIERS: Record<DisciplineTierKey, DisciplineTierConfig> = {
  TIER_1: {
    key: "TIER_1",
    levelName: "Cấp 1 — Duy Trì Vững Vàng",
    subTitle: "Mục tiêu 80% BTVN",
    minHomeworkRate: 0.8,
    minAttendanceRate: 0.9,
    rewardAmount: 200000,
    rewardFormatted: "200.000đ",
    badgeLabel: "HỌC BỔNG 200K",
    colorClass: "text-blue-600 dark:text-blue-400",
    bgClass: "bg-blue-50 dark:bg-blue-950/30",
    borderClass: "border-blue-200 dark:border-blue-800",
    icon: "🌿",
    description: "Hoàn thành tối thiểu 80% bài tập đúng hạn & chuyên cần 90%. Khấu trừ 200k vào khóa tiếp theo.",
  },
  TIER_2: {
    key: "TIER_2",
    levelName: "Cấp 2 — Bứt Phá Chiến Thuật",
    subTitle: "Mục tiêu 90% BTVN",
    minHomeworkRate: 0.9,
    minAttendanceRate: 0.9,
    rewardAmount: 300000,
    rewardFormatted: "300.000đ",
    badgeLabel: "HỌC BỔNG 300K",
    colorClass: "text-indigo-600 dark:text-indigo-400",
    bgClass: "bg-indigo-50 dark:bg-indigo-950/30",
    borderClass: "border-indigo-200 dark:border-indigo-800",
    icon: "⚡",
    description: "Hoàn thành tối thiểu 90% bài tập đúng hạn & chuyên cần 90%. Khấu trừ 300k vào khóa tiếp theo.",
  },
  TIER_3: {
    key: "TIER_3",
    levelName: "Cấp 3 — Kỷ Luật Thép",
    subTitle: "Mục tiêu 100% Tuyệt Đối",
    minHomeworkRate: 1.0,
    minAttendanceRate: 0.9,
    rewardAmount: 500000,
    rewardFormatted: "500.000đ",
    badgeLabel: "HỌC BỔNG 500K",
    colorClass: "text-amber-600 dark:text-amber-400",
    bgClass: "bg-amber-50 dark:bg-amber-950/30",
    borderClass: "border-amber-300 dark:border-amber-700",
    icon: "🔥",
    description: "Không bỏ lỡ bất kỳ bài tập nào (100% đúng hạn) & chuyên cần 90%. Khấu trừ 500k vào khóa tiếp theo.",
  },
};

export interface DisciplineCalculationInput {
  submittedCount: number;
  totalHomeworks: number;
  attendanceRate?: number;
  targetTier?: DisciplineTierKey;
}

export interface DisciplineCalculationResult {
  currentHomeworkRate: number; // percentage from 0 to 100
  effectiveTier: DisciplineTierConfig | null;
  targetTierConfig: DisciplineTierConfig;
  rewardAmount: number;
  rewardFormatted: string;
  isMeetingTarget: boolean;
  maxAllowedMisses: number;
  missedCount: number;
  remainingAllowedMisses: number;
  statusMessage: string;
  motivationalQuote: string;
  attendanceRate: number;
}

const STORAGE_PREFIX = "aris_discipline_goal_";

/**
 * Gets student's saved goal tier from localStorage or defaults to TIER_2 (90% - Recommended)
 */
export function getSavedDisciplineGoal(studentId?: string, classId?: string): DisciplineTierKey {
  if (!studentId) return "TIER_2";
  const key = `${STORAGE_PREFIX}${studentId}_${classId || "global"}`;
  try {
    const saved = localStorage.getItem(key) as DisciplineTierKey;
    if (saved && DISCIPLINE_TIERS[saved]) {
      return saved;
    }
  } catch {
    // ignore storage error
  }
  return "TIER_2";
}

/**
 * Persists student's target discipline goal
 */
export function saveDisciplineGoal(
  tier: DisciplineTierKey,
  studentId?: string,
  classId?: string
): void {
  if (!studentId) return;
  const key = `${STORAGE_PREFIX}${studentId}_${classId || "global"}`;
  try {
    localStorage.setItem(key, tier);
  } catch {
    // ignore storage error
  }
}

/**
 * Computes discipline scholarship standing and remaining tolerance for student
 */
export function calculateDisciplineStanding(
  input: DisciplineCalculationInput
): DisciplineCalculationResult {
  const {
    submittedCount = 0,
    totalHomeworks = 0,
    attendanceRate = 1.0, // defaults to 100% if attendance tracking not yet populated
    targetTier = "TIER_2",
  } = input;

  const targetTierConfig = DISCIPLINE_TIERS[targetTier] || DISCIPLINE_TIERS.TIER_2;

  // If no homework assigned yet, student starts at perfect 100%
  const currentHomeworkRate =
    totalHomeworks > 0 ? Math.min(100, Math.round((submittedCount / totalHomeworks) * 100)) : 100;

  // Determine current active tier achieved
  let effectiveTier: DisciplineTierConfig | null = null;
  const decimalRate = totalHomeworks > 0 ? submittedCount / totalHomeworks : 1.0;

  if (attendanceRate >= 0.9) {
    if (decimalRate >= 1.0 && submittedCount === totalHomeworks) {
      effectiveTier = DISCIPLINE_TIERS.TIER_3;
    } else if (decimalRate >= 0.9) {
      effectiveTier = DISCIPLINE_TIERS.TIER_2;
    } else if (decimalRate >= 0.8) {
      effectiveTier = DISCIPLINE_TIERS.TIER_1;
    }
  }

  const rewardAmount = effectiveTier ? effectiveTier.rewardAmount : 0;
  const rewardFormatted = effectiveTier ? effectiveTier.rewardFormatted : "0đ";

  // Calculate missed count & allowed tolerance for the target goal
  const missedCount = Math.max(0, totalHomeworks - submittedCount);
  
  // Total allowed misses for the entire course to hit target rate
  // e.g. for a 20-hw course at 90%: allowed misses = floor(20 * (1 - 0.9)) = 2
  const maxAllowedMisses = Math.floor(Math.max(1, totalHomeworks) * (1 - targetTierConfig.minHomeworkRate));
  const remainingAllowedMisses = Math.max(0, maxAllowedMisses - missedCount);

  const isMeetingTarget = effectiveTier
    ? effectiveTier.minHomeworkRate >= targetTierConfig.minHomeworkRate
    : decimalRate >= targetTierConfig.minHomeworkRate;

  let statusMessage = "";
  let motivationalQuote = "";

  if (effectiveTier?.key === "TIER_3") {
    statusMessage = "Đang giữ trọn vẹn mốc Kỷ Luật Thép (100% đúng hạn)";
    motivationalQuote = "Phong độ tuyệt đối! Bạn đang nắm chắc 500.000đ học bổng cho khóa kế tiếp.";
  } else if (effectiveTier?.key === "TIER_2") {
    statusMessage = `Đang đạt chuẩn Cấp 2 (${currentHomeworkRate}% BTVN)`;
    motivationalQuote = "Tiến độ rất vững vàng. Bạn đang tạm giữ 300.000đ học bổng cho khóa kế tiếp.";
  } else if (effectiveTier?.key === "TIER_1") {
    statusMessage = `Đang đạt chuẩn Cấp 1 (${currentHomeworkRate}% BTVN)`;
    motivationalQuote = "Giữ nhịp đều đặn. Bạn đang tạm giữ 200.000đ học bổng cho khóa kế tiếp.";
  } else {
    statusMessage = `Hiện đạt ${currentHomeworkRate}% BTVN (Cần đạt tối thiểu 80%)`;
    motivationalQuote = "Nộp đúng hạn các bài tiếp theo để mở khóa Học bổng Kỷ Luật 200k - 500k!";
  }

  return {
    currentHomeworkRate,
    effectiveTier,
    targetTierConfig,
    rewardAmount,
    rewardFormatted,
    isMeetingTarget,
    maxAllowedMisses,
    missedCount,
    remainingAllowedMisses,
    statusMessage,
    motivationalQuote,
    attendanceRate: Math.round(attendanceRate * 100),
  };
}
