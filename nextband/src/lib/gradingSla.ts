import { format, addDays, differenceInMilliseconds } from "date-fns";
import { vi } from "date-fns/locale";

/**
 * Grading SLA Helper (Hệ thống quản lý SLA chấm trả bài trung tâm)
 * Quy chuẩn: 7 ngày (lịch) tính từ thời điểm học viên nộp bài (submittedAt).
 */

export const GRADING_SLA_DAYS = 7;
export const GRADING_SLA_MS = GRADING_SLA_DAYS * 24 * 60 * 60 * 1000;

export type GradingSlaTier = "ON_TRACK" | "APPROACHING" | "OVERDUE" | "GRADED" | "NOT_SUBMITTED";

export interface SlaInfo {
  status: GradingSlaTier;
  deadlineDate: Date | null;
  submittedDate: Date | null;
  gradedDate: Date | null;
  remainingMs: number;
  remainingDays: number;
  remainingHours: number;
  overdueMs: number;
  overdueDays: number;
  overdueHours: number;
  formattedRemaining: string; // e.g. "Còn 4 ngày 12 giờ" or "Quá hạn 1 ngày"
  formattedDeadline: string;  // e.g. "04/09/2026"
  formattedSubmitted: string; // e.g. "28/08/2026 10:00"
  badgeText: string;
  badgeVariant: "emerald" | "amber" | "rose" | "slate";
  isOverdue: boolean;
  isApproaching: boolean;
}

/**
 * Calculate the SLA state for a submission based on submittedAt, gradedAt, and status
 */
export function calculateGradingSla(
  submittedAt?: string | Date | null,
  gradedAt?: string | Date | null,
  status?: string | null
): SlaInfo {
  if (!submittedAt) {
    return {
      status: "NOT_SUBMITTED",
      deadlineDate: null,
      submittedDate: null,
      gradedDate: null,
      remainingMs: 0,
      remainingDays: 0,
      remainingHours: 0,
      overdueMs: 0,
      overdueDays: 0,
      overdueHours: 0,
      formattedRemaining: "Chưa nộp",
      formattedDeadline: "—",
      formattedSubmitted: "—",
      badgeText: "Chưa nộp",
      badgeVariant: "slate",
      isOverdue: false,
      isApproaching: false,
    };
  }

  const subDate = new Date(submittedAt);
  if (isNaN(subDate.getTime())) {
    return {
      status: "NOT_SUBMITTED",
      deadlineDate: null,
      submittedDate: null,
      gradedDate: null,
      remainingMs: 0,
      remainingDays: 0,
      remainingHours: 0,
      overdueMs: 0,
      overdueDays: 0,
      overdueHours: 0,
      formattedRemaining: "Không xác định",
      formattedDeadline: "—",
      formattedSubmitted: "—",
      badgeText: "Chưa nộp",
      badgeVariant: "slate",
      isOverdue: false,
      isApproaching: false,
    };
  }

  const deadlineDate = addDays(subDate, GRADING_SLA_DAYS);
  const now = new Date();
  const formattedDeadline = format(deadlineDate, "dd/MM/yyyy", { locale: vi });
  const formattedSubmitted = format(subDate, "dd/MM/yyyy HH:mm", { locale: vi });

  const normalizedStatus = (status || "").toUpperCase();
  if (normalizedStatus === "GRADED" || gradedAt) {
    const grDate = gradedAt ? new Date(gradedAt) : now;
    return {
      status: "GRADED",
      deadlineDate,
      submittedDate: subDate,
      gradedDate: grDate,
      remainingMs: 0,
      remainingDays: 0,
      remainingHours: 0,
      overdueMs: 0,
      overdueDays: 0,
      overdueHours: 0,
      formattedRemaining: "Đã trả bài",
      formattedDeadline,
      formattedSubmitted,
      badgeText: "Đã chấm",
      badgeVariant: "emerald",
      isOverdue: false,
      isApproaching: false,
    };
  }

  const remainingMs = differenceInMilliseconds(deadlineDate, now);

  if (remainingMs < 0) {
    const overdueMs = Math.abs(remainingMs);
    const overdueDays = Math.floor(overdueMs / (24 * 60 * 60 * 1000));
    const overdueHours = Math.floor((overdueMs % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const text = overdueDays > 0 ? `Quá hạn ${overdueDays} ngày` : `Quá hạn ${overdueHours} giờ`;

    return {
      status: "OVERDUE",
      deadlineDate,
      submittedDate: subDate,
      gradedDate: null,
      remainingMs,
      remainingDays: 0,
      remainingHours: 0,
      overdueMs,
      overdueDays,
      overdueHours,
      formattedRemaining: text,
      formattedDeadline,
      formattedSubmitted,
      badgeText: `🔴 ${text}`,
      badgeVariant: "rose",
      isOverdue: true,
      isApproaching: false,
    };
  }

  const remainingDays = Math.floor(remainingMs / (24 * 60 * 60 * 1000));
  const remainingHours = Math.floor((remainingMs % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const displayDays = Math.ceil(remainingMs / (24 * 60 * 60 * 1000));

  if (remainingDays <= 2) {
    const text = remainingDays > 0 ? `Còn ${remainingDays} ngày ${remainingHours}h` : `Còn ${remainingHours} giờ`;
    return {
      status: "APPROACHING",
      deadlineDate,
      submittedDate: subDate,
      gradedDate: null,
      remainingMs,
      remainingDays,
      remainingHours,
      overdueMs: 0,
      overdueDays: 0,
      overdueHours: 0,
      formattedRemaining: text,
      formattedDeadline,
      formattedSubmitted,
      badgeText: `⚠️ ${text}`,
      badgeVariant: "amber",
      isOverdue: false,
      isApproaching: true,
    };
  }

  const text = `Còn ${displayDays} ngày`;
  return {
    status: "ON_TRACK",
    deadlineDate,
    submittedDate: subDate,
    gradedDate: null,
    remainingMs,
    remainingDays: displayDays,
    remainingHours,
    overdueMs: 0,
    overdueDays: 0,
    overdueHours: 0,
    formattedRemaining: text,
    formattedDeadline,
    formattedSubmitted,
    badgeText: `⏱ ${text}`,
    badgeVariant: "emerald",
    isOverdue: false,
    isApproaching: false,
  };
}

/**
 * Summarize SLA statistics for a collection of submissions
 */
export function summarizeSlaStats(submissions: Array<{ submittedAt?: string | null; gradedAt?: string | null; status?: string | null }>) {
  let overdueCount = 0;
  let approachingCount = 0;
  let onTrackCount = 0;
  let gradedCount = 0;

  for (const s of submissions) {
    const sla = calculateGradingSla(s.submittedAt, s.gradedAt, s.status);
    if (sla.status === "OVERDUE") overdueCount++;
    else if (sla.status === "APPROACHING") approachingCount++;
    else if (sla.status === "ON_TRACK") onTrackCount++;
    else if (sla.status === "GRADED") gradedCount++;
  }

  return {
    totalPending: overdueCount + approachingCount + onTrackCount,
    overdueCount,
    approachingCount,
    onTrackCount,
    gradedCount,
  };
}
