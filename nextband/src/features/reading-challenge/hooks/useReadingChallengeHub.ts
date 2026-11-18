import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { readingChallengeApi, ReadingChallengeProgressRecord, SaveUnitProgressPayload } from '@/lib/api/domains/reading-challenge.api';
import { LOCAL_STORAGE_PREFIX, readLocalUnitProgress, writeLocalUnitProgress } from './useUnitProgress';
import { UNITS_CATALOG } from '../data';
import { UnitProgressState } from '../types';

export interface HubUnitOverview {
  unitNumber: number;
  title: string;
  category: string;
  isLocked: boolean;
  isCompleted: boolean;
  completedStepsCount: number;
  totalStepsCount: number;
  currentStepIndex: number;
  progressPercent: number;
  readingWpm?: number | null;
  latestScore?: number | null;
  lastPracticedAt?: string;
  hasStarted: boolean;
}

export function getAllLocalUnits(): Record<number, UnitProgressState> {
  const map: Record<number, UnitProgressState> = {};
  for (let i = 1; i <= 20; i++) {
    const saved = readLocalUnitProgress(i);
    if (saved) {
      map[i] = saved;
    }
  }
  return map;
}

export function useReadingChallengeHub() {
  const { isAuthenticated, user, isLoading: isAuthLoading } = useAuth();
  const [localMap, setLocalMap] = useState<Record<number, UnitProgressState>>(() => getAllLocalUnits());
  const [serverUnits, setServerUnits] = useState<ReadingChallengeProgressRecord[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasMergedGuestRef = useRef(false);

  // 1. Initial Local Scan & Cloud Sync
  const refreshHubData = useCallback(async () => {
    // Re-scan local storage
    const currentLocals = getAllLocalUnits();
    setLocalMap(currentLocals);

    if (!isAuthenticated || isAuthLoading) return;

    setIsSyncing(true);
    setError(null);
    try {
      // Check if we need to sync local guest progress to cloud
      const guestUnitsToSync: SaveUnitProgressPayload[] = [];
      for (const [unitNumStr, state] of Object.entries(currentLocals)) {
        const uNum = parseInt(unitNumStr, 10);
        if (state.completedSteps.length > 0 || state.writingDraft || state.readingWpm) {
          guestUnitsToSync.push({
            unitNumber: uNum,
            currentStepIndex: state.currentStepIndex,
            completedSteps: state.completedSteps,
            stepAnswers: state.stepAnswers,
            readingWpm: state.readingWpm,
            readingSeconds: state.readingSeconds,
            scores: state.scores,
            writingDraft: state.writingDraft,
            isUnitCompleted: state.isUnitCompleted,
          });
        }
      }

      let cloudData: { units: ReadingChallengeProgressRecord[]; summary: any };
      if (guestUnitsToSync.length > 0 && !hasMergedGuestRef.current) {
        hasMergedGuestRef.current = true;
        cloudData = await readingChallengeApi.syncGuestProgress(guestUnitsToSync);
      } else {
        cloudData = await readingChallengeApi.getAllProgress();
      }

      setServerUnits(cloudData.units);

      // Reconcile and write back to local storage
      for (const sUnit of cloudData.units) {
        const existingLocal = currentLocals[sUnit.unitNumber];
        const mergedCompleted = Array.from(
          new Set([...(existingLocal?.completedSteps || []), ...sUnit.completedSteps])
        );
        const mergedState: UnitProgressState = {
          currentStepIndex: Math.max(existingLocal?.currentStepIndex || 0, sUnit.currentStepIndex),
          completedSteps: mergedCompleted as any,
          stepAnswers: { ...(sUnit.stepAnswers || {}), ...(existingLocal?.stepAnswers || {}) },
          readingWpm: existingLocal?.readingWpm || sUnit.readingWpm || undefined,
          readingSeconds: existingLocal?.readingSeconds || sUnit.readingSeconds || undefined,
          scores: { ...(sUnit.scores || {}), ...(existingLocal?.scores || {}) },
          writingDraft: existingLocal?.writingDraft || sUnit.writingDraft || '',
          isUnitCompleted: existingLocal?.isUnitCompleted || sUnit.isUnitCompleted || mergedCompleted.length >= 10,
          lastUpdated: sUnit.updatedAt || new Date().toISOString(),
        };
        writeLocalUnitProgress(sUnit.unitNumber, mergedState);
      }

      setLocalMap(getAllLocalUnits());
    } catch (err: any) {
      console.warn('[HubSync] Error fetching cloud progress:', err?.message);
      setError(err?.message || 'Không thể đồng bộ tiến độ từ máy chủ');
    } finally {
      setIsSyncing(false);
    }
  }, [isAuthenticated, isAuthLoading]);

  useEffect(() => {
    refreshHubData();
  }, [refreshHubData]);

  // Compute unit overview for all 20 units
  const unitsOverview = useMemo<HubUnitOverview[]>(() => {
    return Array.from({ length: 20 }, (_, i) => {
      const unitNumber = i + 1;
      const catalogItem = UNITS_CATALOG.find((u) => u.unitNumber === unitNumber);
      const localState = localMap[unitNumber];
      const serverState = serverUnits.find((s) => s.unitNumber === unitNumber);

      const title = catalogItem?.title || `Unit ${unitNumber}`;
      const category = catalogItem?.category || 'Non-Fiction';
      const isLocked = Boolean(catalogItem?.isLocked);

      const completedSteps = localState?.completedSteps || (serverState?.completedSteps as any) || [];
      const isCompleted = Boolean(
        localState?.isUnitCompleted || serverState?.isUnitCompleted || completedSteps.length >= 10
      );
      const completedStepsCount = completedSteps.length;
      const progressPercent = Math.min(100, Math.round((completedStepsCount / 10) * 100));
      const hasStarted = completedStepsCount > 0 || Boolean(localState?.writingDraft);

      // Calculate latest score if review quiz was completed
      const latestQuizScore =
        localState?.scores?.reviewQuizScore ?? serverState?.scores?.reviewQuizScore ?? null;

      const readingWpm = localState?.readingWpm || serverState?.readingWpm || null;

      return {
        unitNumber,
        title,
        category,
        isLocked,
        isCompleted,
        completedStepsCount,
        totalStepsCount: 10,
        currentStepIndex: localState?.currentStepIndex || serverState?.currentStepIndex || 0,
        progressPercent,
        readingWpm,
        latestScore: latestQuizScore,
        lastPracticedAt: localState?.lastUpdated || serverState?.lastPracticedAt,
        hasStarted,
      };
    });
  }, [localMap, serverUnits]);

  // Find Continue Learning target:
  // 1. Most recently practiced unit that is not completed
  // 2. Or first unstarted unit
  // 3. Or Unit 1
  const continueUnit = useMemo(() => {
    const inProgress = unitsOverview
      .filter((u) => u.hasStarted && !u.isCompleted)
      .sort((a, b) => {
        const tA = a.lastPracticedAt ? new Date(a.lastPracticedAt).getTime() : 0;
        const tB = b.lastPracticedAt ? new Date(b.lastPracticedAt).getTime() : 0;
        return tB - tA;
      });

    if (inProgress.length > 0) return inProgress[0];

    const firstUnstarted = unitsOverview.find((u) => !u.hasStarted && !u.isLocked);
    return firstUnstarted || unitsOverview[0];
  }, [unitsOverview]);

  const completedCount = unitsOverview.filter((u) => u.isCompleted).length;
  const startedCount = unitsOverview.filter((u) => u.hasStarted).length;
  const overallPercent = Math.round((completedCount / 20) * 100);

  const validWpms = unitsOverview
    .map((u) => u.readingWpm)
    .filter((w): w is number => typeof w === 'number' && w > 0);
  const averageWpm = validWpms.length > 0
    ? Math.round(validWpms.reduce((a, b) => a + b, 0) / validWpms.length)
    : null;

  return {
    unitsOverview,
    continueUnit,
    completedCount,
    startedCount,
    overallPercent,
    averageWpm,
    isSyncing,
    error,
    isAuthenticated,
    user,
    refreshHubData,
  };
}
