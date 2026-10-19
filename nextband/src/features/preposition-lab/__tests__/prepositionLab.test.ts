import { describe, it, expect } from 'vitest';
import { LEVEL_1_PUZZLES } from '../data/level-1.data';

describe('Preposition Lab: Level 1 Data Contract & Cognitive Scenarios', () => {
  it('contains exactly five sequential puzzles for Level 1', () => {
    expect(LEVEL_1_PUZZLES).toHaveLength(5);
    expect(LEVEL_1_PUZZLES.map((p) => p.order)).toEqual([1, 2, 3, 4, 5]);
  });

  it('guarantees each puzzle has exactly one canonical option and distinct explanations', () => {
    LEVEL_1_PUZZLES.forEach((puzzle) => {
      const canonicals = puzzle.options.filter((o) => o.fit === 'canonical');
      expect(canonicals.length).toBe(1);

      // Verify each option has bilingual explanations
      puzzle.options.forEach((opt) => {
        expect(opt.explanation.en.length).toBeGreaterThan(15);
        expect(opt.explanation.vi.length).toBeGreaterThan(15);
      });

      // Verify academic source reference is present
      expect(puzzle.sourceReference.chapter).toBeGreaterThan(0);
      expect(puzzle.sourceReference.printedPages.length).toBeGreaterThan(0);
    });
  });

  it('verifies Puzzle 2 (Overflowing bowl) treats IN as canonical and ON as nuanced', () => {
    const p2 = LEVEL_1_PUZZLES[1];
    expect(p2.id).toBe('p2-overflowing-bowl');

    const inOption = p2.options.find((o) => o.id === 'in');
    const onOption = p2.options.find((o) => o.id === 'on');
    const aboveOption = p2.options.find((o) => o.id === 'above');

    expect(inOption?.fit).toBe('canonical');
    expect(onOption?.fit).toBe('nuanced');
    expect(aboveOption?.fit).toBe('misconception');
  });

  it('verifies Puzzle 3 (Inverted bowl & apple) treats UNDER as canonical and IN as misconception', () => {
    const p3 = LEVEL_1_PUZZLES[2];
    expect(p3.id).toBe('p3-cover-or-container');

    const underOption = p3.options.find((o) => o.id === 'under');
    const inOption = p3.options.find((o) => o.id === 'in');

    expect(underOption?.fit).toBe('canonical');
    expect(inOption?.fit).toBe('misconception');
  });

  it('verifies Puzzle 4 (Smoke challenge) has exact prompt sentence "There is smoke in the bowl."', () => {
    const p4 = LEVEL_1_PUZZLES[3];
    expect(p4.id).toBe('p4-smoke-challenge');
    expect(p4.sentencePrompt.lead).toBe('There is smoke');
    expect(p4.sentencePrompt.exampleFullSentence).toBe('There is smoke in the bowl.');

    const inOption = p4.options.find((o) => o.id === 'in');
    expect(inOption?.fit).toBe('canonical');
  });

  it('verifies Puzzle 5 (Transfer test) evaluates mechanical grip as IN', () => {
    const p5 = LEVEL_1_PUZZLES[4];
    expect(p5.id).toBe('p5-transfer-test');

    const inOption = p5.options.find((o) => o.id === 'in');
    expect(inOption?.fit).toBe('canonical');
  });
});

describe('Preposition Lab: Level 2 & Level 3 Data Contract & Cognitive Scenarios', () => {
  it('contains exactly five sequential puzzles for Level 2 and Level 3', async () => {
    const { LEVEL_2_PUZZLES } = await import('../data/level-2.data');
    const { LEVEL_3_PUZZLES } = await import('../data/level-3.data');

    expect(LEVEL_2_PUZZLES).toHaveLength(5);
    expect(LEVEL_2_PUZZLES.map((p) => p.order)).toEqual([1, 2, 3, 4, 5]);

    expect(LEVEL_3_PUZZLES).toHaveLength(5);
    expect(LEVEL_3_PUZZLES.map((p) => p.order)).toEqual([1, 2, 3, 4, 5]);
  });

  it('verifies Level 3 canonical choices and cognitive principles', async () => {
    const { LEVEL_3_PUZZLES } = await import('../data/level-3.data');

    // Scenario 1: Jumper -> OVER
    const p1 = LEVEL_3_PUZZLES[0];
    expect(p1.id).toBe('p3-1-arc-of-the-jumper');
    expect(p1.options.find((o) => o.id === 'over')?.fit).toBe('canonical');
    expect(p1.options.find((o) => o.id === 'above')?.fit).toBe('misconception');

    // Scenario 2: Cloud -> ABOVE
    const p2 = LEVEL_3_PUZZLES[1];
    expect(p2.id).toBe('p3-2-cloud-and-mountain');
    expect(p2.options.find((o) => o.id === 'above')?.fit).toBe('canonical');

    // Scenario 3: Blanket -> OVER
    const p3 = LEVEL_3_PUZZLES[2];
    expect(p3.id).toBe('p3-3-blanket-and-sleeper');
    expect(p3.options.find((o) => o.id === 'over')?.fit).toBe('canonical');

    // Scenario 4: Submarine -> BELOW
    const p4 = LEVEL_3_PUZZLES[3];
    expect(p4.id).toBe('p3-4-submerged-submarine');
    expect(p4.options.find((o) => o.id === 'below')?.fit).toBe('canonical');

    // Scenario 5: Helicopter -> OVER
    const p5 = LEVEL_3_PUZZLES[4];
    expect(p5.id).toBe('p3-5-radar-altitude-lock');
    expect(p5.options.find((o) => o.id === 'over')?.fit).toBe('canonical');
  });

  it('guarantees each Level 3 scenario has valid IELTS bridge and micro-challenge', async () => {
    const { LEVEL_3_PUZZLES } = await import('../data/level-3.data');

    LEVEL_3_PUZZLES.forEach((puzzle) => {
      expect(puzzle.ieltsBridge).toBeDefined();
      expect(puzzle.ieltsBridge?.microChallenge.prompt).toContain('______');
      expect(puzzle.ieltsBridge?.microChallenge.options.length).toBeGreaterThanOrEqual(3);
      expect(puzzle.ieltsBridge?.collocationPills.length).toBeGreaterThanOrEqual(3);
    });
  });
});
