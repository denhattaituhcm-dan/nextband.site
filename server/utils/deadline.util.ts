/**
 * Pure Utility for Automatic & Manual Deadline Calculations
 * Follows Golden Architecture Invariants: Pure, Deterministic, 1-indexed LessonOrder.
 */

export type DeadlineSource = "MANUAL" | "AUTO" | "NONE";

export interface DeadlineCalculationParams {
  classStartDate: Date | string | null | undefined;
  lessonOrder: number; // 1-indexed (Lesson 1 = week 1, Lesson 2 = week 2...)
}

/**
 * Calculates default automatic deadline based on Class Start Date and Lesson Order.
 * Rule: Lesson N expires at the end of Week N (N * 7 days after classStartDate) at 23:59:59.999.
 */
export function calculateAutomaticDeadline(params: DeadlineCalculationParams): Date {
  const baseDate = params.classStartDate ? new Date(params.classStartDate) : new Date();
  const order = Math.max(1, Math.floor(Number(params.lessonOrder) || 1));

  // Lesson 1 -> 7 days after start date, Lesson 2 -> 14 days after start date
  const targetMs = baseDate.getTime() + order * 7 * 24 * 60 * 60 * 1000;
  const deadline = new Date(targetMs);
  deadline.setHours(23, 59, 59, 999);
  return deadline;
}
