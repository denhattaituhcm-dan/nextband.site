import { useState, useEffect, useCallback, useMemo } from "react";
import {
  UserArenaState,
  WordMasteryRecord,
  getInitialArenaState,
  saveArenaState,
  getRankForXp,
  evaluateLatency,
  CULTIVATION_RANKS,
} from "./spacedRetrievalEngine";
import {
  playSlashSound,
  playLockCrackSound,
  playCardClashSound,
  playChronicleChoiceSound,
  playRankUpSound,
} from "./cognitiveAudio";
import { AttemptPayload, CultivationRankInfo, MistakeHeatItem } from "../components/ArenaHeader";

export function useLexiconEngine(currentUnitNumber: number = 1) {
  const [state, setState] = useState<UserArenaState>(getInitialArenaState);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Sync to localStorage
  useEffect(() => {
    saveArenaState(state);
  }, [state]);

  const currentRank = useMemo(() => getRankForXp(state.totalXp), [state.totalXp]);

  const nextRank = useMemo(() => {
    const idx = CULTIVATION_RANKS.findIndex((r) => r.id === currentRank.id);
    if (idx !== -1 && idx < CULTIVATION_RANKS.length - 1) {
      return CULTIVATION_RANKS[idx + 1];
    }
    return null;
  }, [currentRank]);

  const rankProgressPercent = useMemo(() => {
    if (!nextRank || nextRank.minXp === null) return 100;
    const base = currentRank.minXp;
    const ceiling = nextRank.minXp;
    const progress = ((state.totalXp - base) / (ceiling - base)) * 100;
    return Math.min(100, Math.max(0, Math.round(progress)));
  }, [state.totalXp, currentRank, nextRank]);

  const headerRankInfo: CultivationRankInfo = useMemo(() => ({
    title: currentRank.title,
    subtitle: currentRank.subtitle,
    minXp: currentRank.minXp,
    nextRankXp: nextRank?.minXp || null,
    auraColor: currentRank.auraColor,
    badgeText: currentRank.badgeText,
  }), [currentRank, nextRank]);

  const mistakes: MistakeHeatItem[] = useMemo(() => {
    return Object.values(state.records)
      .filter((r) => r.heatLevel > 0)
      .sort((a, b) => b.heatLevel - a.heatLevel)
      .map((r) => ({
        itemId: r.itemId,
        word: r.word,
        meaningVi: r.meaningVi,
        mode: r.lastMode,
        heatLevel: r.heatLevel,
        failCount: r.mistakeCount,
        lastLatencyMs: r.lastLatencyMs || undefined,
        imageSchemaTag: r.imageSchemaTag,
      }));
  }, [state.records]);

  const recordAttempt = useCallback(
    (payload: AttemptPayload) => {
      const { itemId, word, mode, isCorrect, latencyMs, meaningVi, imageSchemaTag } = payload;
      const evaluation = evaluateLatency(latencyMs, mode);

      // Sound triggers
      if (soundEnabled) {
        if (mode === "synapse") {
          playSlashSound(state.currentCombo + (isCorrect ? 1 : 0));
        } else if (mode === "trilock") {
          playLockCrackSound(isCorrect ? 3 : 1);
        } else if (mode === "persona") {
          playCardClashSound(isCorrect);
        } else if (mode === "chronicles") {
          playChronicleChoiceSound(isCorrect);
        }
      }

      setState((prev) => {
        const prevRecord: WordMasteryRecord = prev.records[word] || {
          itemId,
          word,
          unitNumber: currentUnitNumber,
          attempts: 0,
          correctCount: 0,
          mistakeCount: 0,
          bestLatencyMs: null,
          lastLatencyMs: null,
          lastMode: mode,
          heatLevel: 0,
          nextReviewTimestamp: Date.now(),
          meaningVi,
          imageSchemaTag,
        };

        const newAttempts = prevRecord.attempts + 1;
        const newCorrectCount = prevRecord.correctCount + (isCorrect ? 1 : 0);
        const newMistakeCount = prevRecord.mistakeCount + (isCorrect ? 0 : 1);

        let newHeatLevel = prevRecord.heatLevel;
        if (isCorrect) {
          newHeatLevel = Math.max(0, newHeatLevel - 1);
        } else {
          newHeatLevel = Math.min(3, newHeatLevel + 1);
        }

        const newBestLatency =
          isCorrect && (prevRecord.bestLatencyMs === null || latencyMs < prevRecord.bestLatencyMs)
            ? latencyMs
            : prevRecord.bestLatencyMs;

        const updatedRecord: WordMasteryRecord = {
          ...prevRecord,
          attempts: newAttempts,
          correctCount: newCorrectCount,
          mistakeCount: newMistakeCount,
          lastLatencyMs: latencyMs,
          bestLatencyMs: newBestLatency,
          lastMode: mode,
          heatLevel: newHeatLevel,
          meaningVi: meaningVi || prevRecord.meaningVi,
          imageSchemaTag: imageSchemaTag || prevRecord.imageSchemaTag,
        };

        // Combos and XP
        let newCombo = isCorrect ? prev.currentCombo + 1 : 0;
        let newMaxCombo = Math.max(prev.maxCombo, newCombo);

        let earnedXp = 0;
        if (isCorrect) {
          const baseXP = 80;
          const comboBonus = Math.min(newCombo * 10, 100);
          earnedXp = Math.round((baseXP + comboBonus) * evaluation.xpMultiplier);
        }

        const newTotalXp = prev.totalXp + earnedXp;

        // Rank up sound
        const oldRank = getRankForXp(prev.totalXp);
        const nextEvaluatedRank = getRankForXp(newTotalXp);
        if (soundEnabled && nextEvaluatedRank.level > oldRank.level) {
          playRankUpSound();
        }

        const newMastered = [...prev.masteredWords];
        if (isCorrect && newHeatLevel === 0 && !newMastered.includes(word)) {
          newMastered.push(word);
        }

        return {
          ...prev,
          totalXp: newTotalXp,
          currentCombo: newCombo,
          maxCombo: newMaxCombo,
          masteredWords: newMastered,
          records: {
            ...prev.records,
            [word]: updatedRecord,
          },
        };
      });
    },
    [soundEnabled, currentUnitNumber, state.currentCombo]
  );

  const clearMistake = useCallback((word: string) => {
    setState((prev) => {
      const rec = prev.records[word];
      if (!rec) return prev;
      return {
        ...prev,
        records: {
          ...prev.records,
          [word]: {
            ...rec,
            heatLevel: 0,
          },
        },
      };
    });
  }, []);

  return {
    state,
    soundEnabled,
    setSoundEnabled,
    currentRank,
    nextRank,
    rankProgressPercent,
    headerRankInfo,
    mistakes,
    recordAttempt,
    clearMistake,
  };
}
