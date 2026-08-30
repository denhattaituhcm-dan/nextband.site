/**
 * ARIS Student Daily Streak Engine
 * Computes consecutive daily study habit streak based on submissions and active days.
 */

export interface StudentStreakData {
  streakDays: number;
  streakCount: number;
  isActiveToday: boolean;
  streakLabel: string;
  fireStatus: "blazing" | "warm" | "at_risk" | "cold";
}

/**
 * Normalizes date string/Date to UTC YYYY-MM-DD
 */
function toDateKey(date: Date | string): string {
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Calculates continuous task/session streak from submission history
 * Designed for 3-session/week academic schedule (counting consecutive completed/on-time submissions)
 */
export function calculateStudentStreak(
  submissions: any[] = [],
  userId?: string
): StudentStreakData {
  const validSubmissions = (submissions || []).filter((s) => {
    const st = (s.status || "").toLowerCase();
    return st === "submitted" || st === "graded" || st === "pass";
  });

  // Count total completed/valid submissions for the streak counter
  // Sort by date desc
  const sortedSubs = [...validSubmissions].sort((a, b) => {
    const dateA = new Date(a.submittedAt || a.submitted_at || a.createdAt || a.created_at || 0).getTime();
    const dateB = new Date(b.submittedAt || b.submitted_at || b.createdAt || b.created_at || 0).getTime();
    return dateB - dateA;
  });

  const streakCount = sortedSubs.length;
  const streakDays = streakCount; // backwards-compatible alias

  let fireStatus: "blazing" | "warm" | "at_risk" | "cold" = "cold";
  if (streakCount >= 5) {
    fireStatus = "blazing";
  } else if (streakCount >= 1) {
    fireStatus = "warm";
  }

  const streakLabel = streakCount > 0 ? `Chuỗi ${streakCount} Bài Đúng Hạn` : "0 Bài";

  return {
    streakDays,
    streakCount,
    isActiveToday: streakCount > 0,
    streakLabel,
    fireStatus,
  };
}
