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
