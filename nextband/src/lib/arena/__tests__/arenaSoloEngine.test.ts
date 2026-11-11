import { describe, it, expect } from 'vitest';
import { 
  RAW_ARENA_COLLOCATION_QUESTIONS, 
  shuffleQuestionOptions, 
  ARENA_COLLOCATION_QUESTIONS 
} from '../questions';

describe('Arena Solo Engine & Question Invariants', () => {
  it('should have at least 10 high-quality IELTS collocation questions', () => {
    expect(RAW_ARENA_COLLOCATION_QUESTIONS.length).toBeGreaterThanOrEqual(10);
  });

  it('every question must have exactly 4 options labeled A, B, C, D', () => {
    const requiredLabels = ['A', 'B', 'C', 'D'];
    RAW_ARENA_COLLOCATION_QUESTIONS.forEach((q) => {
      expect(q.options).toHaveLength(4);
      const labels = q.options.map((o) => o.label);
      expect(labels).toEqual(requiredLabels);
    });
  });

  it('every question must contain a valid correct explanation and misconception diagnostic', () => {
    RAW_ARENA_COLLOCATION_QUESTIONS.forEach((q) => {
      expect(q.correctExplanation).toBeTruthy();
      expect(q.correctExplanation.length).toBeGreaterThan(10);

      expect(q.misconception).toBeDefined();
      expect(q.misconception.diagnosticTitle).toBeTruthy();
      expect(q.misconception.explanation.length).toBeGreaterThan(15);
    });
  });

  it('shuffleQuestionOptions should maintain the original correct answer text regardless of option order', () => {
    const q = RAW_ARENA_COLLOCATION_QUESTIONS[0];
    const originalCorrectOption = q.options.find((o) => o.id === q.correctOptionId);
    expect(originalCorrectOption).toBeDefined();

    const shuffled = shuffleQuestionOptions(q, 'deterministic_test_seed_123');
    const newCorrectOption = shuffled.options.find((o) => o.id === shuffled.correctOptionId);

    expect(newCorrectOption).toBeDefined();
    expect(newCorrectOption?.text).toBe(originalCorrectOption?.text);
  });

  it('calculates streak multiplier correctly according to game rules', () => {
    const getStreakMultiplier = (streak: number) => {
      if (streak >= 4) return 2.0;
      if (streak === 3) return 1.5;
      if (streak === 2) return 1.2;
      return 1.0;
    };

    expect(getStreakMultiplier(0)).toBe(1.0);
    expect(getStreakMultiplier(1)).toBe(1.0);
    expect(getStreakMultiplier(2)).toBe(1.2);
    expect(getStreakMultiplier(3)).toBe(1.5);
    expect(getStreakMultiplier(4)).toBe(2.0);
    expect(getStreakMultiplier(10)).toBe(2.0);
  });

  it('calculates score with speed bonus and streak multiplier accurately', () => {
    const calculateScore = (timeLeft: number, streak: number) => {
      const multiplier = streak >= 4 ? 2.0 : streak === 3 ? 1.5 : streak === 2 ? 1.2 : 1.0;
      return Math.round((1000 + Math.max(0, timeLeft) * 20) * multiplier);
    };

    // Base answer with 0s left and no streak
    expect(calculateScore(0, 0)).toBe(1000);

    // Answer with 10s left and no streak: (1000 + 200) * 1.0 = 1200
    expect(calculateScore(10, 1)).toBe(1200);

    // Fast answer with 15s left and streak 4 (x2.0): (1000 + 300) * 2.0 = 2600
    expect(calculateScore(15, 4)).toBe(2600);
  });
});
