/**
 * ARIS Student Daily Streak Engine
 * Computes consecutive daily study habit streak based on submissions and active days.
 */

export interface StudentStreakData {
  streakDays: number;
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
 * Calculates continuous day streak from submission history & client active timestamps
 */
export function calculateStudentStreak(
  submissions: any[] = [],
  userId?: string
): StudentStreakData {
  const activeDateSet = new Set<string>();

  // 1. Record dates from submissions
  (submissions || []).forEach((sub) => {
    const rawDate = sub.submittedAt || sub.submitted_at || sub.createdAt || sub.created_at;
    if (rawDate) {
      const key = toDateKey(rawDate);
      if (key) activeDateSet.add(key);
    }
  });

  // 2. Record today's login / active timestamp from LocalStorage (per user)
  const todayKey = toDateKey(new Date());
  if (userId && typeof window !== "undefined") {
    try {
      const storageKey = `nb_streak_last_seen_${userId}`;
      const historyKey = `nb_streak_history_${userId}`;
      
      const lastSeen = localStorage.getItem(storageKey);
      let localHistory: string[] = [];
      try {
        localHistory = JSON.parse(localStorage.getItem(historyKey) || "[]");
      } catch {}

      if (todayKey && !localHistory.includes(todayKey)) {
        localHistory.push(todayKey);
        // Keep last 60 days
        if (localHistory.length > 60) localHistory.shift();
        localStorage.setItem(historyKey, JSON.stringify(localHistory));
      }
      localStorage.setItem(storageKey, new Date().toISOString());

      localHistory.forEach((k) => {
        if (k) activeDateSet.add(k);
      });
    } catch (e) {
      // LocalStorage access fail-safe
    }
  }

  // 3. Calculate streak count walking backwards from today
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const isActiveToday = activeDateSet.has(todayKey);
  const isActiveYesterday = activeDateSet.has(toDateKey(yesterday));

  let streakDays = 0;
  let cursor = new Date(today);

  // If not active today, check if active yesterday to keep streak alive
  if (!isActiveToday) {
    if (isActiveYesterday) {
      cursor = new Date(yesterday);
    } else {
      // Streak broken
      return {
        streakDays: 0,
        isActiveToday: false,
        streakLabel: "0 Ngày",
        fireStatus: "cold",
      };
    }
  }

  // Count backwards
  while (true) {
    const key = toDateKey(cursor);
    if (activeDateSet.has(key)) {
      streakDays += 1;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }

  let fireStatus: "blazing" | "warm" | "at_risk" | "cold" = "cold";
  if (streakDays >= 5) {
    fireStatus = "blazing";
  } else if (streakDays >= 1) {
    fireStatus = isActiveToday ? "warm" : "at_risk";
  }

  return {
    streakDays,
    isActiveToday,
    streakLabel: `${streakDays} Ngày`,
    fireStatus,
  };
}
