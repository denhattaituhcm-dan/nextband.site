export type Sm2ReviewRating = "AGAIN" | "HARD" | "GOOD" | "EASY";

export interface Sm2StateInput {
  intervalDays: number;
  easeFactor: number;
  masteryState: number;
  masteryScore: number;
  totalReviews: number;
  failedReviews: number;
  history: unknown;
}

export interface Sm2HistoryEntry {
  date: string;
  result: "PASS" | "FAIL";
  rating: Sm2ReviewRating;
  latencyMs: number | null;
}

export interface Sm2StateOutput {
  intervalDays: number;
  easeFactor: number;
  masteryState: number;
  masteryScore: number;
  nextReviewAt: Date;
  totalReviews: number;
  failedReviews: number;
  history: Sm2HistoryEntry[];
}

/**
 * Pure deterministic SM-2 spaced repetition state calculator.
 * Shared across Essential Vocabulary in Context, Vocab in Use, and Lexicon SRS.
 */
export function calculateSm2Transition(
  current: Sm2StateInput,
  options: {
    rating?: Sm2ReviewRating;
    isCorrect?: boolean;
    latencyMs?: number;
    now?: Date;
  }
): Sm2StateOutput {
  const now = options.now ?? new Date();
  const rating: Sm2ReviewRating =
    options.rating ?? (options.isCorrect ? "GOOD" : "AGAIN");
  const isPass = rating !== "AGAIN";

  let interval = Math.max(1, current.intervalDays || 1);
  let ease = current.easeFactor || 2.5;
  let masteryState = current.masteryState || 0;
  let masteryScore = current.masteryScore ?? 0.1;

  if (rating === "AGAIN") {
    interval = 1;
    ease = Math.round(Math.max(1.3, ease - 0.2) * 100) / 100;
    masteryScore = Math.round(Math.max(0.1, masteryScore - 0.2) * 100) / 100;
    masteryState = 1; // LEARNING
  } else if (rating === "HARD") {
    interval = interval <= 1 ? 2 : Math.max(interval + 1, Math.round(interval * 1.2));
    ease = Math.round(Math.max(1.3, ease - 0.15) * 100) / 100;
    masteryScore = Math.round(Math.min(1.0, masteryScore + 0.12) * 100) / 100;
    if (masteryScore >= 0.9) masteryState = 3;
    else if (masteryScore >= 0.6) masteryState = 2;
    else masteryState = 1;
  } else if (rating === "GOOD") {
    if (interval === 1) interval = 3;
    else if (interval === 3) interval = 7;
    else if (interval === 7) interval = 14;
    else interval = Math.max(interval + 1, Math.round(interval * ease));

    masteryScore = Math.round(Math.min(1.0, masteryScore + 0.25) * 100) / 100;
    if (masteryScore >= 0.9) masteryState = 3;
    else if (masteryScore >= 0.6) masteryState = 2;
    else masteryState = 1;
  } else {
    // EASY
    if (interval === 1) interval = 4;
    else if (interval <= 3) interval = 8;
    else if (interval <= 7) interval = 16;
    else interval = Math.max(interval + 2, Math.round(interval * ease * 1.3));

    ease = Math.round(Math.min(3.0, ease + 0.15) * 100) / 100;
    masteryScore = Math.round(Math.min(1.0, masteryScore + 0.35) * 100) / 100;
    if (masteryScore >= 0.9) masteryState = 3;
    else if (masteryScore >= 0.6) masteryState = 2;
    else masteryState = 1;
  }

  const nextReviewAt = new Date(now.getTime() + interval * 24 * 60 * 60 * 1000);
  const existingHistory = Array.isArray(current.history)
    ? (current.history as Sm2HistoryEntry[])
    : [];

  const newEntry: Sm2HistoryEntry = {
    date: now.toISOString(),
    result: isPass ? "PASS" : "FAIL",
    rating,
    latencyMs: options.latencyMs ?? null,
  };

  return {
    intervalDays: interval,
    easeFactor: ease,
    masteryState,
    masteryScore,
    nextReviewAt,
    totalReviews: (current.totalReviews || 0) + 1,
    failedReviews: isPass ? current.failedReviews || 0 : (current.failedReviews || 0) + 1,
    history: [...existingHistory.slice(-49), newEntry],
  };
}
