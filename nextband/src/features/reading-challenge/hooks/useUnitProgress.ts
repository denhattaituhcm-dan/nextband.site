import { useState, useEffect, useCallback } from 'react';
import { StepType, UnitProgressState } from '../types';
import { supabase } from '@/lib/supabase';

export const ORDERED_STEPS: StepType[] = [
  'pre_reading',
  'vocab_preview',
  'reading_passage',
  'comprehension',
  'idioms',
  'summary',
  'listening_dictation',
  'grammar_inline',
  'guided_writing',
  'review_quiz',
];

const LOCAL_STORAGE_PREFIX = 'rc1_unit_progress_';

const getDefaultProgress = (): UnitProgressState => ({
  currentStepIndex: 0,
  completedSteps: [],
  stepAnswers: {},
  scores: {},
  writingDraft: '',
  isUnitCompleted: false,
  lastUpdated: new Date().toISOString(),
});

export function useUnitProgress(unitNumber: number) {
  const storageKey = `${LOCAL_STORAGE_PREFIX}${unitNumber}`;

  const [progress, setProgress] = useState<UnitProgressState>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to read progress from localStorage', e);
    }
    return getDefaultProgress();
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save progress to localStorage', e);
    }
  }, [storageKey, progress]);

  // Attempt sync with Supabase when step or unit is finished
  const syncWithSupabase = useCallback(async (stateToSave: UnitProgressState) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user?.id) return;

      // Upsert into a generic student progress/metadata record if available
      await supabase.from('reading_challenge_progress').upsert({
        user_id: session.user.id,
        unit_number: unitNumber,
        completed_steps: stateToSave.completedSteps,
        scores: stateToSave.scores,
        is_completed: stateToSave.isUnitCompleted,
        writing_draft: stateToSave.writingDraft,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id,unit_number' });
    } catch {
      // Graceful fallback to local storage
    }
  }, [unitNumber]);

  const currentStep = ORDERED_STEPS[progress.currentStepIndex] || 'pre_reading';

  const goToStepIndex = useCallback((index: number) => {
    if (index >= 0 && index < ORDERED_STEPS.length) {
      setProgress((prev) => ({
        ...prev,
        currentStepIndex: index,
        lastUpdated: new Date().toISOString(),
      }));
    }
  }, []);

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
      
      const newStepAnswers = answers
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

      // Non-blocking sync
      syncWithSupabase(updatedState);
      return updatedState;
    });
  }, [syncWithSupabase]);

  const nextStep = useCallback(() => {
    setProgress((prev) => {
      const nextIdx = Math.min(prev.currentStepIndex + 1, ORDERED_STEPS.length - 1);
      return {
        ...prev,
        currentStepIndex: nextIdx,
        lastUpdated: new Date().toISOString(),
      };
    });
  }, []);

  const prevStep = useCallback(() => {
    setProgress((prev) => {
      const nextIdx = Math.max(prev.currentStepIndex - 1, 0);
      return {
        ...prev,
        currentStepIndex: nextIdx,
        lastUpdated: new Date().toISOString(),
      };
    });
  }, []);

  const saveWritingDraft = useCallback((draft: string) => {
    setProgress((prev) => ({
      ...prev,
      writingDraft: draft,
      lastUpdated: new Date().toISOString(),
    }));
  }, []);

  const resetProgress = useCallback(() => {
    const fresh = getDefaultProgress();
    setProgress(fresh);
    localStorage.removeItem(storageKey);
  }, [storageKey]);

  return {
    progress,
    currentStep,
    currentStepIndex: progress.currentStepIndex,
    totalSteps: ORDERED_STEPS.length,
    isFirstStep: progress.currentStepIndex === 0,
    isLastStep: progress.currentStepIndex === ORDERED_STEPS.length - 1,
    isCompleted: progress.isUnitCompleted,
    completedSteps: progress.completedSteps,
    goToStep,
    goToStepIndex,
    completeStep,
    nextStep,
    prevStep,
    saveWritingDraft,
    resetProgress,
  };
}
