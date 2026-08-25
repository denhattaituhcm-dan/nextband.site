/**
 * Canonical Homework Status & Visual Priority Helper
 * Implements strict pedagogical priority order:
 * REVISION_REQUIRED (Priority 1) > OVERDUE (Priority 2) > DUE_SOON (Priority 3) > UPCOMING (Priority 4)
 * Invariants: OVERDUE is derived only. SUBMITTED + LATE exist independently.
 */

export type CanonicalVisualStatus =
  | "GRADED"            // Đã chấm điểm hoàn tất
  | "REVISION_REQUIRED" // Đã chấm nhưng cần làm bài sửa (Attempt 2)
  | "SUBMITTED"         // Đã nộp bài chờ chấm (Dù nộp sau deadline vẫn tính là SUBMITTED)
  | "OVERDUE"           // Quá hạn chưa nộp (now > deadline && chưa nộp)
  | "IN_PROGRESS"       // Đang làm trong hạn
  | "UPCOMING";         // Chưa làm và còn trong hạn

export interface VisualStatusParams {
  submissionStatus?: string | null;
  revisionRequired?: boolean;
  deadline?: string | Date | null;
  now?: number;
}

export interface SubmissionTiming {
  isLate: boolean;
  lateDays: number;
}

export interface ActionQueueItem {
  id: string;
  examId?: string;
  title: string;
  description?: string;
  status: CanonicalVisualStatus;
  deadline?: string | Date | null;
  countdown?: { text: string; isOverdue: boolean } | null;
  submissionTiming?: SubmissionTiming;
  resources?: any[];
  submission?: any;
  priority: number; // 1 = REVISION_REQUIRED, 2 = OVERDUE, 3 = DUE_SOON, 4 = UPCOMING
}

/**
 * Pure domain function to derive canonical visual status with strict precedence.
 */
export function deriveCanonicalVisualStatus(params: VisualStatusParams): CanonicalVisualStatus {
  const { submissionStatus, revisionRequired, deadline, now = Date.now() } = params;
  const rawStatus = (submissionStatus || "").toUpperCase().trim();

  // 1. GRADED & REVISION (Highest priority)
  if (rawStatus === "GRADED") {
    return revisionRequired ? "REVISION_REQUIRED" : "GRADED";
  }

  // 2. SUBMITTED / GRADING (If submitted, NEVER marked as overdue)
  if (rawStatus === "SUBMITTED" || rawStatus === "GRADING") {
    return "SUBMITTED";
  }

  // 3. OVERDUE (Only when NOT submitted and deadline has passed)
  if (deadline) {
    const deadlineMs = new Date(deadline).getTime();
    if (!isNaN(deadlineMs) && now > deadlineMs) {
      return "OVERDUE";
    }
  }

  // 4. IN_PROGRESS (Currently drafting within deadline)
  if (rawStatus === "IN_PROGRESS") {
    return "IN_PROGRESS";
  }

  // 5. UPCOMING / NOT_STARTED (Default)
  return "UPCOMING";
}

/**
 * Determines whether a submitted attempt was late without altering SUBMITTED visual state.
 */
export function deriveSubmissionTiming(
  submittedAt: string | Date | null | undefined,
  deadline: string | Date | null | undefined
): SubmissionTiming {
  if (!submittedAt || !deadline) {
    return { isLate: false, lateDays: 0 };
  }

  const subMs = new Date(submittedAt).getTime();
  const deadMs = new Date(deadline).getTime();

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

/**
 * Formats a deadline countdown or overdue duration into human-readable Vietnamese.
 */
export function formatDeadlineCountdown(
  deadline: string | Date | null | undefined,
  now = Date.now()
): { text: string; isOverdue: boolean } | null {
  if (!deadline) return null;
  const targetMs = new Date(deadline).getTime();
  if (isNaN(targetMs)) return null;

  const diffMs = targetMs - now;
  const isOverdue = diffMs < 0;
  const absDiff = Math.abs(diffMs);

  const diffMinutes = Math.floor(absDiff / (1000 * 60));
  const diffHours = Math.floor(absDiff / (1000 * 60 * 60));
  const diffDays = Math.floor(absDiff / (1000 * 60 * 60 * 24));

  if (isOverdue) {
    if (diffDays >= 1) {
      return { text: `Quá hạn ${diffDays} ngày`, isOverdue: true };
    }
    if (diffHours >= 1) {
      return { text: `Quá hạn ${diffHours} giờ`, isOverdue: true };
    }
    return { text: `Quá hạn ${Math.max(1, diffMinutes)} phút`, isOverdue: true };
  }

  // Remaining time
  if (diffDays >= 1) {
    return { text: `Còn ${diffDays} ngày`, isOverdue: false };
  }
  if (diffHours >= 1) {
    return { text: `Còn ${diffHours} giờ`, isOverdue: false };
  }
  return { text: `Còn ${Math.max(1, diffMinutes)} phút`, isOverdue: false };
}

/**
 * Pure helper for calculating automatic deadline on client (matches backend invariant)
 * Rule 1: If sessionDate exists, deadline is sessionDate + offsetDays (default 7 days) at 23:59:59.999.
 * Rule 2: Fallback to classStartDate + (lessonOrder * offsetDays) at 23:59:59.999.
 */
export function calculateAutomaticDeadline(params: {
  classStartDate?: Date | string | null | undefined;
  sessionDate?: Date | string | null | undefined;
  lessonOrder?: number;
  defaultOffsetDays?: number;
}): Date {
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
 * Resolves effective deadline with provenance: MANUAL override > AUTO calculation
 */
export function resolveEffectiveDeadline(params: {
  classStartDate?: Date | string | null | undefined;
  sessionDate?: Date | string | null | undefined;
  lessonWeek?: number;
  manualDeadline?: Date | string | null;
  defaultOffsetDays?: number;
}): { effectiveDeadline: Date; deadlineSource: "MANUAL" | "AUTO" } {
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
 * Formats a Date/string into a clear Vietnamese readable string (e.g. 23:59:59 28/08/2026)
 */
export function formatVietnameseDeadline(deadline: string | Date | null | undefined): string {
  if (!deadline) return "Chưa thiết lập";
  const date = new Date(deadline);
  if (isNaN(date.getTime())) return "Không hợp lệ";

  const timeStr = date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
  const dateStr = date.toLocaleDateString("vi-VN", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return `${timeStr}, ${dateStr}`;
}

/**
 * Sorts student homework list into a strict pedagogical action queue:
 * Priority 1: REVISION_REQUIRED (Cần sửa bài Attempt 2)
 * Priority 2: OVERDUE (Quá hạn)
 * Priority 3: DUE_SOON (Sắp hết hạn trong <= 48 giờ)
 * Priority 4: UPCOMING (Bài tiếp theo)
 */
export function sortStudentActionQueue(
  homeworks: any[],
  now = Date.now()
): ActionQueueItem[] {
  const actionItems: ActionQueueItem[] = [];

  homeworks.forEach((hw) => {
    const status = hw.status as CanonicalVisualStatus;
    // Skip already graded and pending review submissions from urgent action queue
    if (status === "GRADED" || status === "SUBMITTED") {
      return;
    }

    let priority = 4;
    if (status === "REVISION_REQUIRED") {
      priority = 1;
    } else if (status === "OVERDUE") {
      priority = 2;
    } else if (hw.deadline) {
      const diffMs = new Date(hw.deadline).getTime() - now;
      if (diffMs > 0 && diffMs <= 48 * 60 * 60 * 1000) {
        priority = 3; // DUE_SOON
      }
    }

    actionItems.push({
      ...hw,
      priority,
    });
  });

  return actionItems.sort((a, b) => {
    if (a.priority !== b.priority) {
      return a.priority - b.priority;
    }
    const deadA = a.deadline ? new Date(a.deadline).getTime() : Infinity;
    const deadB = b.deadline ? new Date(b.deadline).getTime() : Infinity;
    return deadA - deadB;
  });
}
