/**
 * ARENA SCORE ENGINE (PURE FUNCTION)
 * Tuân thủ Hiến pháp Điều 7 (Pure Function) & Thang điểm Accuracy First:
 * Total = Base Accuracy (100) + Speed Bonus (0-15) + Streak Bonus (0-30)
 */

export interface ScoreEvaluationInput {
  isCorrect: boolean;
  timeSpentMs: number;
  totalTimeAllowedMs: number;
  currentStreak: number;
}

export interface ScoreEvaluationResult {
  scoreAwarded: number;
  baseScore: number;
  speedBonus: number;
  streakBonus: number;
  nextStreak: number;
}

export function evaluateSubmissionScore(input: ScoreEvaluationInput): ScoreEvaluationResult {
  const { isCorrect, timeSpentMs, totalTimeAllowedMs, currentStreak } = input;

  if (!isCorrect) {
    return {
      scoreAwarded: 0,
      baseScore: 0,
      speedBonus: 0,
      streakBonus: 0,
      nextStreak: 0, // Reset streak khi sai
    };
  }

  // 1. Base Accuracy Score
  const baseScore = 100;

  // 2. Step Speed Bonus (Dựa trên tỷ lệ thời gian còn lại)
  const remainingRatio = Math.max(0, (totalTimeAllowedMs - timeSpentMs) / totalTimeAllowedMs);
  let speedBonus = 0;

  if (remainingRatio >= 0.75) {
    speedBonus = 15; // Nhanh nhất (dùng <= 25% thời gian)
  } else if (remainingRatio >= 0.5) {
    speedBonus = 10; // 25% - 50% thời gian
  } else if (remainingRatio >= 0.25) {
    speedBonus = 5;  // 50% - 75% thời gian
  } else {
    speedBonus = 0;  // > 75% thời gian
  }

  // 3. Consistency Bonus (Streak bậc thang)
  const nextStreak = currentStreak + 1;
  let streakBonus = 0;

  if (nextStreak >= 7) {
    streakBonus = 30; // Mức trần
  } else if (nextStreak >= 5) {
    streakBonus = 20;
  } else if (nextStreak >= 3) {
    streakBonus = 10;
  }

  const scoreAwarded = baseScore + speedBonus + streakBonus;

  return {
    scoreAwarded,
    baseScore,
    speedBonus,
    streakBonus,
    nextStreak,
  };
}
