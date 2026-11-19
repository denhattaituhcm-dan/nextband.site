import { useState, useEffect, useCallback, useRef } from 'react';
import { StepType, UnitProgressState, ORDERED_STEPS } from '../types';
import { useAuth } from '@/hooks/useAuth';
import { readingChallengeApi, SaveUnitProgressPayload } from '@/lib/api/domains/reading-challenge.api';

export { ORDERED_STEPS };

export const LOCAL_STORAGE_PREFIX = 'rc1_unit_progress_';

export const getDefaultProgress = (): UnitProgressState => ({
  currentStepIndex: 0,
  completedSteps: [],
  stepAnswers: {},
  scores: {},
  writingDraft: '',
  isUnitCompleted: false,
  lastUpdated: new Date().toISOString(),
});

export type SyncStatus = 'synced' | 'syncing' | 'local' | 'error';

export function readLocalUnitProgress(unitNumber: number): UnitProgressState | null {
  try {
    const raw = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}${unitNumber}`);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn(`Failed to read Unit ${unitNumber} from localStorage`, e);
  }
  return null;
}

export function writeLocalUnitProgress(unitNumber: number, state: UnitProgressState): void {
  try {
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}${unitNumber}`, JSON.stringify(state));
  } catch (e) {
    console.error(`Failed to write Unit ${unitNumber} to localStorage`, e);
  }
}

export function useUnitProgress(unitNumber: number) {
  const { isAuthenticated, user } = useAuth();
  const [syncStatus, setSyncStatus] = useState<SyncStatus>(isAuthenticated ? 'syncing' : 'local');
  const [syncError, setSyncError] = useState<string | null>(null);

  // 1. Initial State from localStorage (Local-first, 0 latency)
  const [progress, setProgress] = useState<UnitProgressState>(() => {
    return readLocalUnitProgress(unitNumber) || getDefaultProgress();
  });

  const hasCloudReconciledRef = useRef(false);

  // 2. Cloud Reconciliation on mount or when user logs in
  useEffect(() => {
    if (!isAuthenticated || hasCloudReconciledRef.current || unitNumber < 1) return;

    let isMounted = true;
    const reconcileFromCloud = async () => {
      setSyncStatus('syncing');
      setSyncError(null);
      try {
        const cloudRecord = await readingChallengeApi.getUnitProgress(unitNumber);
        if (!isMounted) return;

        if (cloudRecord) {
          setProgress((prevLocal) => {
            const mergedCompleted = Array.from(
              new Set([...prevLocal.completedSteps, ...(cloudRecord.completedSteps as StepType[])])
            );

            const mergedAnswers = {
              ...(cloudRecord.stepAnswers || {}),
              ...prevLocal.stepAnswers,
            };

            const mergedScores = {
              ...(cloudRecord.scores || {}),
              ...prevLocal.scores,
            };

            // Keep max scores
            for (const [k, v] of Object.entries(cloudRecord.scores || {})) {
              if (typeof v === 'number') {
                const scoreKey = k as keyof NonNullable<UnitProgressState['scores']>;
                mergedScores[scoreKey] = Math.max(mergedScores[scoreKey] ?? 0, v);
              }
            }

            const isCompleted = prevLocal.isUnitCompleted || cloudRecord.isUnitCompleted || mergedCompleted.length >= 10;
            const currentIdx = Math.max(prevLocal.currentStepIndex, cloudRecord.currentStepIndex);

            const reconciled: UnitProgressState = {
              currentStepIndex: currentIdx,
              completedSteps: mergedCompleted,
              stepAnswers: mergedAnswers,
              readingWpm: prevLocal.readingWpm || cloudRecord.readingWpm || undefined,
              readingSeconds: prevLocal.readingSeconds || cloudRecord.readingSeconds || undefined,
              scores: mergedScores,
              writingDraft: prevLocal.writingDraft || cloudRecord.writingDraft || '',
              isUnitCompleted: isCompleted,
              lastUpdated: new Date().toISOString(),
            };

            writeLocalUnitProgress(unitNumber, reconciled);
            return reconciled;
          });
        }
        hasCloudReconciledRef.current = true;
        setSyncStatus('synced');
      } catch (err: any) {
        if (!isMounted) return;
        console.warn(`[Sync] Cloud load for Unit ${unitNumber} failed:`, err?.message);
        setSyncStatus('local');
        setSyncError(err?.message || 'Không thể đồng bộ từ máy chủ');
      }
    };

    reconcileFromCloud();
    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, unitNumber]);

  // Sync to Cloud helper
  const syncToCloud = useCallback(async (stateToSync: UnitProgressState) => {
    if (!isAuthenticated || unitNumber < 1) {
      setSyncStatus('local');
      return;
    }

    setSyncStatus('syncing');
    setSyncError(null);
    try {
      const payload: SaveUnitProgressPayload = {
        unitNumber,
        currentStepIndex: stateToSync.currentStepIndex,
        completedSteps: stateToSync.completedSteps,
        stepAnswers: stateToSync.stepAnswers,
        readingWpm: stateToSync.readingWpm,
        readingSeconds: stateToSync.readingSeconds,
        scores: stateToSync.scores,
        writingDraft: stateToSync.writingDraft,
        isUnitCompleted: stateToSync.isUnitCompleted,
      };

      await readingChallengeApi.saveUnitProgress(unitNumber, payload);
      setSyncStatus('synced');
    } catch (err: any) {
      console.warn(`[Sync] Save to cloud failed for Unit ${unitNumber}:`, err?.message);
      setSyncStatus('error');
      setSyncError(err?.message || 'Lỗi lưu lên máy chủ');
    }
  }, [isAuthenticated, unitNumber]);

  const currentStep = ORDERED_STEPS[progress.currentStepIndex] || 'pre_reading';

  const goToStepIndex = useCallback((index: number) => {
    if (index >= 0 && index < ORDERED_STEPS.length) {
      setProgress((prev) => {
        const nextState = {
          ...prev,
          currentStepIndex: index,
          lastUpdated: new Date().toISOString(),
        };
        writeLocalUnitProgress(unitNumber, nextState);
        syncToCloud(nextState);
        return nextState;
      });
    }
  }, [unitNumber, syncToCloud]);

  const goToStep = useCallback((step: StepType) => {
    const idx = ORDERED_STEPS.indexOf(step);
    if (idx !== -1) {
      goToStepIndex(idx);
    }
  }, [goToStepIndex]);

  const completeStep = useCallback((
    step: StepType,
    answers?: any,
    scoresUpdate?: Partial<UnitProgressState['scores']>
  ) => {
    setProgress((prev) => {
      const newCompleted = prev.completedSteps.includes(step)
        ? prev.completedSteps
        : [...prev.completedSteps, step];

      const newStepAnswers = answers !== undefined
        ? { ...prev.stepAnswers, [step]: answers }
        : prev.stepAnswers;

      const newScores = scoresUpdate
        ? { ...prev.scores, ...scoresUpdate }
        : prev.scores;

      const isCompleted = newCompleted.length === ORDERED_STEPS.length;

      const updatedState: UnitProgressState = {
        ...prev,
        completedSteps: newCompleted,
        stepAnswers: newStepAnswers,
        scores: newScores,
        isUnitCompleted: isCompleted,
        lastUpdated: new Date().toISOString(),
      };

      writeLocalUnitProgress(unitNumber, updatedState);
      syncToCloud(updatedState);
      return updatedState;
    });
  }, [unitNumber, syncToCloud]);

  const nextStep = useCallback(() => {
    setProgress((prev) => {
      const nextIdx = Math.min(prev.currentStepIndex + 1, ORDERED_STEPS.length - 1);
      const nextState = {
        ...prev,
        currentStepIndex: nextIdx,
        lastUpdated: new Date().toISOString(),
      };
      writeLocalUnitProgress(unitNumber, nextState);
      syncToCloud(nextState);
      return nextState;
    });
  }, [unitNumber, syncToCloud]);

  const prevStep = useCallback(() => {
    setProgress((prev) => {
      const nextIdx = Math.max(prev.currentStepIndex - 1, 0);
      const nextState = {
        ...prev,
        currentStepIndex: nextIdx,
        lastUpdated: new Date().toISOString(),
      };
      writeLocalUnitProgress(unitNumber, nextState);
      syncToCloud(nextState);
      return nextState;
    });
  }, [unitNumber, syncToCloud]);

  const saveWritingDraft = useCallback((draft: string) => {
    setProgress((prev) => {
      const nextState = {
        ...prev,
        writingDraft: draft,
        lastUpdated: new Date().toISOString(),
      };
      writeLocalUnitProgress(unitNumber, nextState);
      syncToCloud(nextState);
      return nextState;
    });
  }, [unitNumber, syncToCloud]);

  const resetProgress = useCallback(() => {
    const fresh = getDefaultProgress();
    setProgress(fresh);
    writeLocalUnitProgress(unitNumber, fresh);
    if (isAuthenticated) {
      syncToCloud(fresh);
    }
  }, [unitNumber, isAuthenticated, syncToCloud]);

  return {
    progress,
    currentStep,
    currentStepIndex: progress.currentStepIndex,
    totalSteps: ORDERED_STEPS.length,
    isFirstStep: progress.currentStepIndex === 0,
    isLastStep: progress.currentStepIndex === ORDERED_STEPS.length - 1,
    isCompleted: progress.isUnitCompleted,
    completedSteps: progress.completedSteps,
    syncStatus,
    syncError,
    isAuthenticated,
    goToStep,
    goToStepIndex,
    completeStep,
    nextStep,
    prevStep,
    saveWritingDraft,
    resetProgress,
  };
}
