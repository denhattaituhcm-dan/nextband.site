/**
 * Risk Engine Service — NextBand LBOS
 *
 * Mục tiêu: Đừng để giáo viên bỏ sót một học sinh sắp mất học bổng.
 *
 * Logic cốt lõi (3 câu hỏi):
 *   1. Học sinh còn thiếu bài đủ điều kiện không?
 *   2. Nếu không nộp các bài đó, có mất tier không?
 *   3. Còn bao nhiêu thời gian?
 *
 * Quy tắc bất biến:
 *   - H_open = 0 → NONE, bất kể bất kỳ điều gì khác.
 *   - Risk chỉ khi H_open > 0 VÀ worst-case sẽ mất tier.
 *   - "Eligible" = task có deadline trong cửa sổ đánh giá hiện tại.
 *   - PerformanceLevel / Trajectory / RiskLevel là 3 trục độc lập.
 */

// ---------------------------------------------------------------------------
// Types — chỉ plain data, không import Prisma ở đây để giữ pure / testable
// ---------------------------------------------------------------------------

export interface EligibleTask {
  /** Unique identifier của ClassExamAssignment */
  assignmentId: string;
  examId: string;
  deadline: Date | null;
}

export interface CompletedTask {
  examId: string;
  submittedAt: Date;
}

/**
 * Input được chuẩn bị bởi caller (service/cron) từ DB.
 * evaluateStudentRisk() là pure function — không query DB.
 */
export interface RiskEvaluationInput {
  /** Các bài đủ điều kiện trong cửa sổ hiện tại */
  eligibleTasks: EligibleTask[];
  /** Trong eligible tasks — bài đã nộp thành công */
  completedTaskExamIds: Set<string>;
  /** Ngưỡng hw_rate tối thiểu để giữ tier hiện tại (0–100) */
  currentTierThreshold: number;
  /** Thời điểm đánh giá (thường là "now") */
  now: Date;
  /** Cut-off time của tuần (Sunday 18:15 VN) */
  weekDeadline: Date;
}

export type RiskLevel = 'NONE' | 'WATCH' | 'AT_RISK' | 'CRITICAL';
export type PerformanceLevel = 'LOW' | 'ON_TRACK' | 'STRONG';
export type Trajectory = 'RISING' | 'STABLE' | 'DECLINING';

export interface RiskEvaluationResult {
  riskLevel: RiskLevel;
  /** Các bài đủ điều kiện nhưng chưa nộp */
  openTasks: EligibleTask[];
  /** Số bài cần nộp thêm để giữ tier (0 nếu đã đủ) */
  requiredAdditionalTasks: number;
  /** Lý do ngắn gọn, dành cho Radar UI (không phải AI narrative) */
  riskReason: string | null;
  /** Tỷ lệ hoàn thành worst-case (nếu không nộp bài nào nữa) */
  worstCaseRate: number;
}

// ---------------------------------------------------------------------------
// Task eligibility — một hàm đơn giản, không framework
// ---------------------------------------------------------------------------

/**
 * Kiểm tra một task có đủ điều kiện tính vào rủi ro học bổng không.
 *
 * Quy tắc:
 *   - Task phải có deadline (không có deadline = không tính scholarship)
 *   - Deadline phải nằm trong (class.startDate, weekDeadline]
 *   - Task đã PUBLISHED (caller đảm bảo — chỉ truyền tasks đã published)
 */
export function isEligibleForScholarship(
  task: { deadline: Date | null },
  context: { windowStart: Date; windowEnd: Date }
): boolean {
  if (!task.deadline) return false;
  return task.deadline > context.windowStart && task.deadline <= context.windowEnd;
}

// ---------------------------------------------------------------------------
// Scholarship threshold lookup — mirror của snapshot.service.ts
// ---------------------------------------------------------------------------

/** Ngưỡng tối thiểu (%) để giữ tier. TIER_1=50, TIER_2=70, TIER_3=80, TIER_4=90 */
export const TIER_THRESHOLDS: Record<string, number> = {
  TIER_4: 90,
  TIER_3: 80,
  TIER_2: 70,
  TIER_1: 50,
  NONE: 0,
};

// ---------------------------------------------------------------------------
// Core: evaluateStudentRisk — pure function, fully unit-testable
// ---------------------------------------------------------------------------

/**
 * Đánh giá rủi ro học bổng của một học sinh.
 *
 * @param input - Dữ liệu đã chuẩn bị từ DB
 * @returns RiskEvaluationResult
 */
export function evaluateStudentRisk(input: RiskEvaluationInput): RiskEvaluationResult {
  const { eligibleTasks, completedTaskExamIds, currentTierThreshold, now, weekDeadline } = input;

  const totalEligible = eligibleTasks.length;

  // --- Quy tắc bất biến #1: không có bài đủ điều kiện → NONE ---
  if (totalEligible === 0) {
    return noRisk(0, 100);
  }

  // Tách open tasks (eligible nhưng chưa nộp)
  const openTasks = eligibleTasks.filter((t) => !completedTaskExamIds.has(t.examId));
  const completedCount = totalEligible - openTasks.length;

  // --- Quy tắc bất biến #2: H_open = 0 → NONE ---
  if (openTasks.length === 0) {
    const currentRate = (completedCount / totalEligible) * 100;
    return noRisk(openTasks.length, currentRate);
  }

  // Worst-case: nếu không nộp thêm bài nào
  const worstCaseRate = (completedCount / totalEligible) * 100;

  // --- Quy tắc bất biến #3: worst-case vẫn giữ tier → NONE ---
  if (worstCaseRate >= currentTierThreshold) {
    return noRisk(openTasks.length, worstCaseRate);
  }

  // Học sinh SẼ mất tier nếu không nộp thêm bài
  // Tính số bài cần nộp tối thiểu để cứu tier
  const requiredCompletions = Math.ceil((currentTierThreshold / 100) * totalEligible);
  const requiredAdditionalTasks = Math.max(0, requiredCompletions - completedCount);

  // Deadline proximity → mức độ khẩn cấp
  // Dùng deadline gần nhất trong các open tasks (không phải week deadline)
  const soonestOpenDeadline = openTasks
    .filter((t) => t.deadline !== null)
    .map((t) => t.deadline as Date)
    .sort((a, b) => a.getTime() - b.getTime())[0];

  const referenceDeadline = soonestOpenDeadline ?? weekDeadline;
  const hoursUntilDeadline = (referenceDeadline.getTime() - now.getTime()) / (1000 * 60 * 60);

  const riskLevel = classifyRiskByTime(hoursUntilDeadline);

  const missingCount = openTasks.length;
  const riskReason =
    `Thiếu ${missingCount} bài đủ điều kiện. ` +
    `Worst-case: ${Math.round(worstCaseRate)}% — dưới ngưỡng ${currentTierThreshold}% cần thiết. ` +
    `Cần nộp thêm ${requiredAdditionalTasks} bài để giữ tier.`;

  return {
    riskLevel,
    openTasks,
    requiredAdditionalTasks,
    riskReason,
    worstCaseRate,
  };
}

// ---------------------------------------------------------------------------
// PerformanceLevel — độc lập với RiskLevel
// ---------------------------------------------------------------------------

/**
 * Xác định mức độ thể hiện học thuật dựa trên tỷ lệ hoàn thành hiện tại.
 * Độc lập với RiskLevel.
 */
export function classifyPerformanceLevel(hwRate: number): PerformanceLevel {
  if (hwRate >= 90) return 'STRONG';
  if (hwRate >= 60) return 'ON_TRACK';
  return 'LOW';
}

// ---------------------------------------------------------------------------
// Trajectory — độc lập với RiskLevel
// ---------------------------------------------------------------------------

/**
 * So sánh tuần hiện tại với snapshot tuần trước để xác định xu hướng.
 * Chỉ đánh giá DECLINING/RISING nếu chênh lệch đủ có ý nghĩa (>= 10pp).
 *
 * Lưu ý: Không import từ DB ở đây — caller truyền vào hai con số.
 */
export function classifyTrajectory(
  currentHwRate: number,
  previousHwRate: number | null
): Trajectory {
  if (previousHwRate === null) return 'STABLE';
  const delta = currentHwRate - previousHwRate;
  if (delta >= 10) return 'RISING';
  if (delta <= -10) return 'DECLINING';
  return 'STABLE';
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function noRisk(openCount: number, worstCaseRate: number): RiskEvaluationResult {
  return {
    riskLevel: 'NONE',
    openTasks: [],
    requiredAdditionalTasks: 0,
    riskReason: null,
    worstCaseRate,
  };
}

/**
 * Phân loại mức độ khẩn cấp theo thời gian còn lại đến deadline.
 *
 * > 36 giờ  → WATCH    (nhắc nhở, chưa cần can thiệp)
 * 6–36 giờ  → AT_RISK  (cần liên hệ phụ huynh)
 * < 6 giờ  → CRITICAL  (cần hành động ngay)
 */
function classifyRiskByTime(hoursUntilDeadline: number): RiskLevel {
  if (hoursUntilDeadline > 36) return 'WATCH';
  if (hoursUntilDeadline > 6) return 'AT_RISK';
  return 'CRITICAL';
}
