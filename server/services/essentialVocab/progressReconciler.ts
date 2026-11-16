export interface StageMaxScoresInput {
  stage1: number;
  stage2: number;
  stage3: number;
  stage4: number;
}

export interface ExistingProgressSnapshot {
  contentVersion: number;
  stage1MaxScore: number;
  stage2MaxScore: number;
  stage3MaxScore: number;
  stage4MaxScore: number;
  totalMaxScore: number;
  bestStage1Score: number | null;
  bestStage2Score: number | null;
  bestStage3Score: number | null;
  bestStage4Score: number | null;
  bestTotalScore: number;
  bestAccuracyPct: number;
  latestStage1Score: number | null;
  latestStage2Score: number | null;
  latestStage3Score: number | null;
  latestStage4Score: number | null;
  latestTotalScore: number;
  latestAccuracyPct: number;
  completedStagesMask: number;
  attemptsCount: number;
  needsRevalidation: boolean;
  firstCompletedAt: Date | null;
}

export interface AttemptSubmissionInput {
  stage: 1 | 2 | 3 | 4;
  score: number;
  maxScore: number;
  contentVersion: number;
  stageMaxScores: StageMaxScoresInput;
  now?: Date;
}

export interface ReconciledProgressUpdate {
  contentVersion: number;
  stage1MaxScore: number;
  stage2MaxScore: number;
  stage3MaxScore: number;
  stage4MaxScore: number;
  totalMaxScore: number;
  bestStage1Score: number | null;
  bestStage2Score: number | null;
  bestStage3Score: number | null;
  bestStage4Score: number | null;
  bestTotalScore: number;
  bestAccuracyPct: number;
  latestStage1Score: number | null;
  latestStage2Score: number | null;
  latestStage3Score: number | null;
  latestStage4Score: number | null;
  latestTotalScore: number;
  latestAccuracyPct: number;
  completedStagesMask: number;
  attemptsCount: number;
  needsRevalidation: boolean;
  firstCompletedAt: Date | null;
  lastPracticedAt: Date;
}

function roundPct(numerator: number, denominator: number): number {
  if (denominator <= 0) return 0;
  return Math.round((numerator / denominator) * 1000) / 10;
}

/**
 * Pure deterministic aggregator for Essential Vocabulary Unit Progress.
 * Guarantees that retrying a stage never overwrites a higher historical best score,
 * while accurately updating latestStageScores and handling contentVersion upgrades.
 */
export function reconcileStageAttempt(
  existing: ExistingProgressSnapshot | null,
  attempt: AttemptSubmissionInput
): ReconciledProgressUpdate {
  const now = attempt.now ?? new Date();
  const s1Max = attempt.stageMaxScores.stage1;
  const s2Max = attempt.stageMaxScores.stage2;
  const s3Max = attempt.stageMaxScores.stage3;
  const s4Max = attempt.stageMaxScores.stage4;
  const totalMax = s1Max + s2Max + s3Max + s4Max;

  const clampedScore = Math.max(0, Math.min(attempt.score, attempt.maxScore));

  let bestS1 = existing?.bestStage1Score ?? null;
  let bestS2 = existing?.bestStage2Score ?? null;
  let bestS3 = existing?.bestStage3Score ?? null;
  let bestS4 = existing?.bestStage4Score ?? null;

  let latestS1 = existing?.latestStage1Score ?? null;
  let latestS2 = existing?.latestStage2Score ?? null;
  let latestS3 = existing?.latestStage3Score ?? null;
  let latestS4 = existing?.latestStage4Score ?? null;

  if (attempt.stage === 1) {
    latestS1 = clampedScore;
    bestS1 = bestS1 === null ? clampedScore : Math.max(bestS1, clampedScore);
  } else if (attempt.stage === 2) {
    latestS2 = clampedScore;
    bestS2 = bestS2 === null ? clampedScore : Math.max(bestS2, clampedScore);
  } else if (attempt.stage === 3) {
    latestS3 = clampedScore;
    bestS3 = bestS3 === null ? clampedScore : Math.max(bestS3, clampedScore);
  } else {
    latestS4 = clampedScore;
    bestS4 = bestS4 === null ? clampedScore : Math.max(bestS4, clampedScore);
  }

  // Clamp best scores if a unit's stage max score ever decreased in a new contentVersion
  if (bestS1 !== null) bestS1 = Math.min(bestS1, s1Max);
  if (bestS2 !== null) bestS2 = Math.min(bestS2, s2Max);
  if (bestS3 !== null) bestS3 = Math.min(bestS3, s3Max);
  if (bestS4 !== null) bestS4 = Math.min(bestS4, s4Max);

  const stageBit = 1 << (attempt.stage - 1);
  const completedStagesMask = (existing?.completedStagesMask ?? 0) | stageBit;

  const bestTotalScore =
    (bestS1 ?? 0) + (bestS2 ?? 0) + (bestS3 ?? 0) + (bestS4 ?? 0);
  const latestTotalScore =
    (latestS1 ?? 0) + (latestS2 ?? 0) + (latestS3 ?? 0) + (latestS4 ?? 0);

  const bestAccuracyPct = roundPct(bestTotalScore, totalMax);
  const latestAccuracyPct = roundPct(latestTotalScore, totalMax);

  const isAllStagesCompleted = (completedStagesMask & 15) === 15;
  const firstCompletedAt =
    existing?.firstCompletedAt ?? (isAllStagesCompleted ? now : null);

  return {
    contentVersion: Math.max(existing?.contentVersion ?? 1, attempt.contentVersion),
    stage1MaxScore: s1Max,
    stage2MaxScore: s2Max,
    stage3MaxScore: s3Max,
    stage4MaxScore: s4Max,
    totalMaxScore: totalMax,
    bestStage1Score: bestS1,
    bestStage2Score: bestS2,
    bestStage3Score: bestS3,
    bestStage4Score: bestS4,
    bestTotalScore,
    bestAccuracyPct,
    latestStage1Score: latestS1,
    latestStage2Score: latestS2,
    latestStage3Score: latestS3,
    latestStage4Score: latestS4,
    latestTotalScore,
    latestAccuracyPct,
    completedStagesMask,
    attemptsCount: (existing?.attemptsCount ?? 0) + 1,
    needsRevalidation: false,
    firstCompletedAt,
    lastPracticedAt: now,
  };
}
