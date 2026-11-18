import { describe, it, expect } from 'vitest';
import { VOCAB_C1_UNITS } from '@/data/vocabC1Unit1';
import { getPodsForUnit } from '@/pages/public/vocab-c1/c1ClusterEngine';

describe('Vocab C1 Semantic Cluster Engine & Challenge Protocol', () => {
  it('should have 12 units available in the dataset', () => {
    expect(VOCAB_C1_UNITS.length).toBe(12);
  });

  it('should generate valid semantic pods for all 12 units', () => {
    VOCAB_C1_UNITS.forEach((unit) => {
      const pods = getPodsForUnit(unit);
      expect(pods.length).toBeGreaterThanOrEqual(2);

      // Verify each pod
      pods.forEach((pod) => {
        expect(pod.id).toBeDefined();
        expect(pod.titleVi).toBeTruthy();
        expect(pod.badge).toBeTruthy();
        expect(pod.words.length).toBeGreaterThan(0);
        expect(pod.dilemmas.length).toBe(pod.words.length);

        // Verify each dilemma
        pod.dilemmas.forEach((dilemma) => {
          expect(dilemma.id).toBeTruthy();
          expect(dilemma.scenarioEn).toContain('________');
          expect(dilemma.options.length).toBeGreaterThanOrEqual(2);
          expect(dilemma.options).toContain(dilemma.correctWord);
          expect(dilemma.explanationVi).toBeTruthy();
        });
      });
    });
  });

  it('should correctly cluster Unit 2 (Physique, 22 words) into 5 distinct pods', () => {
    const unit2 = VOCAB_C1_UNITS.find((u) => u.unitId === 2);
    expect(unit2).toBeDefined();
    if (!unit2) return;

    const pods = getPodsForUnit(unit2);
    expect(pods.length).toBe(5);

    // Pod 1: Round/Fat
    expect(pods[0].badge).toBe('Dáng Tròn');
    const pod1Words = pods[0].words.map((w) => w.word);
    expect(pod1Words).toContain('plump');
    expect(pod1Words).toContain('corpulent');
    expect(pod1Words).toContain('obese');

    // Pod 2: Muscular
    expect(pods[1].badge).toBe('Vạm Vỡ');
    const pod2Words = pods[1].words.map((w) => w.word);
    expect(pod2Words).toContain('muscular');
    expect(pod2Words).toContain('burly');

    // Pod 3: Lanky/Spindly
    expect(pods[2].badge).toBe('Dáng Gầy');
    const pod3Words = pods[2].words.map((w) => w.word);
    expect(pod3Words).toContain('lanky');
    expect(pod3Words).toContain('spindly');
  });

  it('should correctly preserve explicit contrastiveRecall when present (Unit 1 & 2)', () => {
    const unit1 = VOCAB_C1_UNITS[0];
    const pods = getPodsForUnit(unit1);
    const pod1 = pods[0];
    const adventurousDilemma = pod1.dilemmas.find((d) => d.targetWord === 'adventurous');

    expect(adventurousDilemma).toBeDefined();
    expect(adventurousDilemma?.correctWord).toBe('adventurous');
    expect(adventurousDilemma?.options).toContain('brave');
  });
});
