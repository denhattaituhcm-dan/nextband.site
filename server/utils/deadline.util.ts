/**
 * Pure Utility for Automatic & Manual Deadline Calculations & Submission Timing
 * Follows Golden Architecture Invariants: Pure, Deterministic, 1-indexed LessonOrder.
 * OVERDUE is derived, SUBMITTED + LATE are independent.
 */

export type DeadlineSource = "MANUAL" | "AUTO" | "NONE";

export interface DeadlineCalculationParams {
  classStartDate?: Date | string | null | undefined;
  sessionDate?: Date | string | null | undefined;
  lessonOrder?: number; // 1-indexed (Lesson 1 = week 1, Lesson 2 = week 2...)
  defaultOffsetDays?: number; // Default 7 days
}

export interface ResolveDeadlineParams {
  classStartDate?: Date | string | null | undefined;
  sessionDate?: Date | string | null | undefined;
  lessonWeek?: number; // 1-indexed (Week 1, Week 2...)
  manualDeadline?: Date | string | null;
  defaultOffsetDays?: number;
}

export interface DeadlineResolution {
  effectiveDeadline: Date;
  deadlineSource: "MANUAL" | "AUTO";
}

export interface SubmissionTiming {
  isLate: boolean;
  lateDays: number;
}

/**
 * Calculates default automatic deadline:
 * Rule 1: If sessionDate exists for the session, deadline is sessionDate + offsetDays (default 7 days) at 23:59:59.999.
 * Rule 2: Fallback to classStartDate + (lessonOrder * offsetDays) at 23:59:59.999.
 */
export function calculateAutomaticDeadline(params: DeadlineCalculationParams): Date {
  const offsetDays = Math.max(1, params.defaultOffsetDays || 7);

  if (params.sessionDate) {
    const sDate = new Date(params.sessionDate);
    if (!isNaN(sDate.getTime())) {
      const targetMs = sDate.getTime() + offsetDays * 24 * 60 * 60 * 1000;
      const deadline = new Date(targetMs);
      deadline.setHours(23, 59, 59, 999);
      return deadline;
    }
  }

  const baseDate = params.classStartDate ? new Date(params.classStartDate) : new Date();
  const order = Math.max(1, Math.floor(Number(params.lessonOrder) || 1));
  const targetMs = baseDate.getTime() + order * offsetDays * 24 * 60 * 60 * 1000;
  const deadline = new Date(targetMs);
  deadline.setHours(23, 59, 59, 999);
  return deadline;
}

/**
 * Resolves the effective deadline with strict provenance: MANUAL override > AUTO calculation.
 */
export function resolveEffectiveDeadline(params: ResolveDeadlineParams): DeadlineResolution {
  if (params.manualDeadline) {
    return {
      effectiveDeadline: new Date(params.manualDeadline),
      deadlineSource: "MANUAL",
    };
  }

  const auto = calculateAutomaticDeadline({
    classStartDate: params.classStartDate,
    sessionDate: params.sessionDate,
    lessonOrder: params.lessonWeek,
    defaultOffsetDays: params.defaultOffsetDays,
  });

  return {
    effectiveDeadline: auto,
    deadlineSource: "AUTO",
  };
}

/**
 * Determines whether a submission was handed in late and calculates the number of late days.
 * Invariant: SUBMITTED + LATE exists independently from OVERDUE.
 */
export function calculateSubmissionTiming(
  submittedAt: Date | string | null | undefined,
  effectiveDeadline: Date | string | null | undefined
): SubmissionTiming {
  if (!submittedAt || !effectiveDeadline) {
    return { isLate: false, lateDays: 0 };
  }

  const subMs = new Date(submittedAt).getTime();
  const deadMs = new Date(effectiveDeadline).getTime();

  if (isNaN(subMs) || isNaN(deadMs) || subMs <= deadMs) {
    return { isLate: false, lateDays: 0 };
  }

  const diffMs = subMs - deadMs;
  const lateDays = Math.max(1, Math.floor(diffMs / (24 * 60 * 60 * 1000)));

  return {
    isLate: true,
    lateDays,
  };
}
