import { useState, useEffect, useCallback, useRef, useContext } from "react";
import { AuthContext } from "./useAuth";
import {
  essentialVocabularyApi,
  type EvcAttemptRecord,
  type EvcBookProgressSummary,
  type EvcUnitProgressRecord,
  type SubmitEvcAttemptPayload,
} from "../lib/api/domains/essential-vocabulary.api";

const LOCAL_PROGRESS_KEY = "nextband_evc_progress_v1";
const LOCAL_ATTEMPTS_KEY = "nextband_evc_attempts_v1";

function readLocalProgressMap(): Record<string, EvcUnitProgressRecord> {
  try {
    const raw = localStorage.getItem(LOCAL_PROGRESS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeLocalProgressMap(map: Record<string, EvcUnitProgressRecord>): void {
  try {
    localStorage.setItem(LOCAL_PROGRESS_KEY, JSON.stringify(map));
  } catch {
    // Ignore storage quota errors
  }
}

function readLocalAttempts(): EvcAttemptRecord[] {
  try {
    const raw = localStorage.getItem(LOCAL_ATTEMPTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeLocalAttempts(items: EvcAttemptRecord[]): void {
  try {
    localStorage.setItem(LOCAL_ATTEMPTS_KEY, JSON.stringify(items));
  } catch {
    // Ignore storage quota errors
  }
}

function computeBookSummary(
  bookId: string,
  units: EvcUnitProgressRecord[]
): EvcBookProgressSummary {
  const completedUnitsCount = units.filter(
    (u) => (u.completedStagesMask & 15) === 15
  ).length;
  const startedUnitsCount = units.length;
  const totalBestScore = units.reduce((acc, u) => acc + u.bestTotalScore, 0);
  const totalMaxPossible = units.reduce((acc, u) => acc + u.totalMaxScore, 0);
  const overallBestAccuracyPct =
    totalMaxPossible > 0
      ? Math.round((totalBestScore / totalMaxPossible) * 1000) / 10
      : 0;

  return {
    bookId,
    startedUnitsCount,
    completedUnitsCount,
    totalBestScore,
    totalMaxPossible,
    overallBestAccuracyPct,
  };
}

export function useEssentialVocabProgress(bookId = "evc-5", activeUnitId?: string) {
  const authContext = useContext(AuthContext);
  const isAuthenticated = authContext?.isAuthenticated ?? false;
  const isAuthLoading = authContext?.isLoading ?? false;
  const userId = authContext?.user?.id ?? "guest";

  const [unitsProgress, setUnitsProgress] = useState<EvcUnitProgressRecord[]>([]);
  const [recentAttempts, setRecentAttempts] = useState<EvcAttemptRecord[]>([]);
  const [summary, setSummary] = useState<EvcBookProgressSummary>({
    bookId,
    startedUnitsCount: 0,
    completedUnitsCount: 0,
    totalBestScore: 0,
    totalMaxPossible: 0,
    overallBestAccuracyPct: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const hasMigratedRef = useRef<boolean>(false);

  const loadProgress = useCallback(async () => {
    if (isAuthLoading) return;
    setIsLoading(true);
    setError(null);

    if (!isAuthenticated) {
      const progressMap = readLocalProgressMap();
      const allUnits = Object.values(progressMap).filter(
        (u) => u.bookId === bookId
      );
      const allAttempts = readLocalAttempts().filter((a) =>
        activeUnitId ? a.unitId === activeUnitId : a.bookId === bookId
      );
      setUnitsProgress(allUnits);
      setRecentAttempts(allAttempts.slice(0, 30));
      setSummary(computeBookSummary(bookId, allUnits));
      setIsLoading(false);
      return;
    }

    try {
      const migrationFlagKey = `nextband_evc_prog_migrated_v1_${userId}`;
      const localAttempts = readLocalAttempts();
      if (
        !hasMigratedRef.current &&
        localAttempts.length > 0 &&
        !localStorage.getItem(migrationFlagKey)
      ) {
        hasMigratedRef.current = true;
        await essentialVocabularyApi.syncGuestData({
          bookmarks: [],
          attempts: localAttempts.map((a) => ({
            bookId: (a.bookId as any) || "evc-5",
            unitId: a.unitId,
            contentVersion: a.contentVersion || 1,
            stage: a.stage,
            mode: a.mode || "assisted",
            score: a.score,
            maxScore: a.maxScore,
            stageMaxScores: {
              stage1: 10,
              stage2: 5,
              stage3: 5,
              stage4: a.stage === 4 ? a.maxScore : 10,
            },
            durationSec: a.durationSec || 0,
            clientAttemptKey: a.clientAttemptKey || `guest-${a.id}`,
            answersSnapshot: a.answersSnapshot || [],
            wrongEntryIds: a.wrongEntryIds || [],
          })),
        });
        localStorage.setItem(migrationFlagKey, "1");
      }

      const bookData = await essentialVocabularyApi.getBookProgress(bookId);
      setUnitsProgress(bookData.units);
      setSummary(bookData.summary);

      if (activeUnitId) {
        const unitDetail = await essentialVocabularyApi.getUnitProgress(
          activeUnitId,
          25
        );
        setRecentAttempts(unitDetail.attempts);
      } else {
        setRecentAttempts(bookData.recentAttempts);
      }
    } catch (err: any) {
      setError(err?.message || "Không thể tải tiến độ học tập.");
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, isAuthLoading, userId, bookId, activeUnitId]);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  const recordStageAttempt = useCallback(
    async (payload: SubmitEvcAttemptPayload) => {
      const attemptKey =
        payload.clientAttemptKey ||
        `evc-${payload.unitId}-s${payload.stage}-${Date.now()}`;

      if (!isAuthenticated) {
        const nowIso = new Date().toISOString();
        const progressMap = readLocalProgressMap();
        const existing = progressMap[payload.unitId] ?? null;

        const s1Max = payload.stageMaxScores.stage1;
        const s2Max = payload.stageMaxScores.stage2;
        const s3Max = payload.stageMaxScores.stage3;
        const s4Max = payload.stageMaxScores.stage4;
        const totalMax = s1Max + s2Max + s3Max + s4Max;

        let bestS1 = existing?.bestStage1Score ?? null;
        let bestS2 = existing?.bestStage2Score ?? null;
        let bestS3 = existing?.bestStage3Score ?? null;
        let bestS4 = existing?.bestStage4Score ?? null;

        let latestS1 = existing?.latestStage1Score ?? null;
        let latestS2 = existing?.latestStage2Score ?? null;
        let latestS3 = existing?.latestStage3Score ?? null;
        let latestS4 = existing?.latestStage4Score ?? null;

        if (payload.stage === 1) {
          latestS1 = payload.score;
          bestS1 = bestS1 === null ? payload.score : Math.max(bestS1, payload.score);
        } else if (payload.stage === 2) {
          latestS2 = payload.score;
          bestS2 = bestS2 === null ? payload.score : Math.max(bestS2, payload.score);
        } else if (payload.stage === 3) {
          latestS3 = payload.score;
          bestS3 = bestS3 === null ? payload.score : Math.max(bestS3, payload.score);
        } else {
          latestS4 = payload.score;
          bestS4 = bestS4 === null ? payload.score : Math.max(bestS4, payload.score);
        }

        const completedStagesMask =
          (existing?.completedStagesMask ?? 0) | (1 << (payload.stage - 1));
        const bestTotalScore =
          (bestS1 ?? 0) + (bestS2 ?? 0) + (bestS3 ?? 0) + (bestS4 ?? 0);
        const latestTotalScore =
          (latestS1 ?? 0) + (latestS2 ?? 0) + (latestS3 ?? 0) + (latestS4 ?? 0);
        const bestAccuracyPct =
          totalMax > 0 ? Math.round((bestTotalScore / totalMax) * 1000) / 10 : 0;
        const latestAccuracyPct =
          totalMax > 0
            ? Math.round((latestTotalScore / totalMax) * 1000) / 10
            : 0;

        const updatedProgress: EvcUnitProgressRecord = {
          id: existing?.id ?? `local-prog-${payload.unitId}`,
          userId: "guest",
          bookId: payload.bookId,
          unitId: payload.unitId,
          contentVersion: payload.contentVersion,
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
          firstCompletedAt:
            existing?.firstCompletedAt ??
            ((completedStagesMask & 15) === 15 ? nowIso : null),
          lastPracticedAt: nowIso,
          createdAt: existing?.createdAt ?? nowIso,
          updatedAt: nowIso,
        };

        progressMap[payload.unitId] = updatedProgress;
        writeLocalProgressMap(progressMap);

        const newAttempt: EvcAttemptRecord = {
          id: attemptKey,
          progressId: updatedProgress.id,
          userId: "guest",
          bookId: payload.bookId,
          unitId: payload.unitId,
          contentVersion: payload.contentVersion,
          stage: payload.stage,
          mode: payload.mode,
          score: payload.score,
          maxScore: payload.maxScore,
          accuracyPct:
            payload.maxScore > 0
              ? Math.round((payload.score / payload.maxScore) * 1000) / 10
              : 0,
          durationSec: payload.durationSec,
          answersSnapshot: payload.answersSnapshot,
          wrongEntryIds: payload.wrongEntryIds,
          clientAttemptKey: attemptKey,
          submittedAt: nowIso,
        };

        const allAttempts = [newAttempt, ...readLocalAttempts()].slice(0, 100);
        writeLocalAttempts(allAttempts);

        const allUnits = Object.values(progressMap).filter(
          (u) => u.bookId === bookId
        );
        setUnitsProgress(allUnits);
        setRecentAttempts(
          allAttempts.filter((a) =>
            activeUnitId ? a.unitId === activeUnitId : a.bookId === bookId
          )
        );
        setSummary(computeBookSummary(bookId, allUnits));
        return { progress: updatedProgress, attempt: newAttempt };
      }

      const saved = await essentialVocabularyApi.submitAttempt({
        ...payload,
        clientAttemptKey: attemptKey,
      });
      await loadProgress();
      return saved;
    },
    [isAuthenticated, bookId, activeUnitId, loadProgress]
  );

  const activeUnitProgress = activeUnitId
    ? unitsProgress.find((u) => u.unitId === activeUnitId) ?? null
    : null;

  return {
    unitsProgress,
    activeUnitProgress,
    recentAttempts,
    summary,
    isLoading,
    error,
    recordStageAttempt,
    refreshProgress: loadProgress,
  };
}
