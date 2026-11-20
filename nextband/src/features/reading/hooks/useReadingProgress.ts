import { useCallback, useEffect, useState } from "react";

export const READING_PROGRESS_STORAGE_KEY = "nextband_reading_case_progress_v1";
const READING_PROGRESS_EVENT = "nextband_reading_progress_updated";

export interface CaseReadingProgress {
  caseId: string;
  scrollPercent: number;
  tasksCompleted: number;
  autopsyCompleted: boolean;
  isRead: boolean;
  manualReadOverride?: boolean;
  lastReadAt: string;
}

export type ReadingProgressMap = Record<string, CaseReadingProgress>;

export function createEmptyCaseProgress(caseId: string): CaseReadingProgress {
  return {
    caseId,
    scrollPercent: 0,
    tasksCompleted: 0,
    autopsyCompleted: false,
    isRead: false,
    lastReadAt: new Date().toISOString(),
  };
}

export function readProgressFromStorage(storage?: Storage): ReadingProgressMap {
  try {
    const store = storage ?? (typeof window !== "undefined" ? window.localStorage : undefined);
    if (!store) return {};
    const raw = store.getItem(READING_PROGRESS_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as ReadingProgressMap) : {};
  } catch {
    return {};
  }
}

export function writeProgressToStorage(map: ReadingProgressMap, storage?: Storage): void {
  try {
    const store = storage ?? (typeof window !== "undefined" ? window.localStorage : undefined);
    if (!store) return;
    store.setItem(READING_PROGRESS_STORAGE_KEY, JSON.stringify(map));
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent(READING_PROGRESS_EVENT));
    }
  } catch {
    // Ignore storage quota or private-mode errors gracefully
  }
}

function resolveIsRead(entry: Omit<CaseReadingProgress, "isRead">): boolean {
  if (typeof entry.manualReadOverride === "boolean") {
    return entry.manualReadOverride;
  }
  return entry.scrollPercent >= 85 || entry.autopsyCompleted;
}

export function computeNextScrollProgress(
  existing: CaseReadingProgress | undefined,
  caseId: string,
  nextPercent: number,
  nowIso = new Date().toISOString()
): CaseReadingProgress {
  const base = existing ?? createEmptyCaseProgress(caseId);
  const clamped = Math.max(0, Math.min(100, Math.round(nextPercent)));
  const scrollPercent = Math.max(base.scrollPercent, clamped);
  const partial = {
    ...base,
    caseId,
    scrollPercent,
    lastReadAt: nowIso,
  };
  return {
    ...partial,
    isRead: resolveIsRead(partial),
  };
}

export function computeNextTasksProgress(
  existing: CaseReadingProgress | undefined,
  caseId: string,
  tasksCompleted: number,
  autopsyCompleted?: boolean,
  nowIso = new Date().toISOString()
): CaseReadingProgress {
  const base = existing ?? createEmptyCaseProgress(caseId);
  const nextAutopsy = autopsyCompleted !== undefined ? base.autopsyCompleted || autopsyCompleted : base.autopsyCompleted;
  const partial = {
    ...base,
    caseId,
    tasksCompleted: Math.max(0, Math.min(4, tasksCompleted)),
    autopsyCompleted: nextAutopsy,
    lastReadAt: nowIso,
  };
  return {
    ...partial,
    isRead: resolveIsRead(partial),
  };
}

export function toggleManualReadProgress(
  existing: CaseReadingProgress | undefined,
  caseId: string,
  nowIso = new Date().toISOString()
): CaseReadingProgress {
  const base = existing ?? createEmptyCaseProgress(caseId);
  const nextReadState = !base.isRead;
  return {
    ...base,
    caseId,
    manualReadOverride: nextReadState,
    isRead: nextReadState,
    lastReadAt: nowIso,
  };
}

export function useReadingProgress() {
  const [progressMap, setProgressMap] = useState<ReadingProgressMap>(() => readProgressFromStorage());

  useEffect(() => {
    const sync = () => setProgressMap(readProgressFromStorage());
    const handleStorage = (e: StorageEvent) => {
      if (e.key === READING_PROGRESS_STORAGE_KEY) {
        sync();
      }
    };

    window.addEventListener(READING_PROGRESS_EVENT, sync);
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener(READING_PROGRESS_EVENT, sync);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const updateScrollProgress = useCallback((caseId: string, percent: number) => {
    setProgressMap((prev) => {
      const current = prev[caseId];
      const nextEntry = computeNextScrollProgress(current, caseId, percent);
      if (
        current &&
        current.scrollPercent === nextEntry.scrollPercent &&
        current.isRead === nextEntry.isRead
      ) {
        return prev;
      }
      const nextMap = { ...prev, [caseId]: nextEntry };
      writeProgressToStorage(nextMap);
      return nextMap;
    });
  }, []);

  const updateTasksProgress = useCallback((caseId: string, tasksCompleted: number, autopsyCompleted?: boolean) => {
    setProgressMap((prev) => {
      const current = prev[caseId];
      const nextEntry = computeNextTasksProgress(current, caseId, tasksCompleted, autopsyCompleted);
      if (
        current &&
        current.tasksCompleted === nextEntry.tasksCompleted &&
        current.autopsyCompleted === nextEntry.autopsyCompleted &&
        current.isRead === nextEntry.isRead
      ) {
        return prev;
      }
      const nextMap = { ...prev, [caseId]: nextEntry };
      writeProgressToStorage(nextMap);
      return nextMap;
    });
  }, []);

  const toggleReadStatus = useCallback((caseId: string) => {
    setProgressMap((prev) => {
      const nextEntry = toggleManualReadProgress(prev[caseId], caseId);
      const nextMap = { ...prev, [caseId]: nextEntry };
      writeProgressToStorage(nextMap);
      return nextMap;
    });
  }, []);

  return {
    progressMap,
    updateScrollProgress,
    updateTasksProgress,
    toggleReadStatus,
  };
}
