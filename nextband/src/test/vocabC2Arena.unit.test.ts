import { describe, it, expect } from "vitest";
import { VOCAB_C2_UNITS, getC2UnitByNumber, getAllC2UnitMetas } from "@/data/vocab-c2";
import { evaluateLatency, getRankForXp, CULTIVATION_RANKS } from "@/features/vocab-c2/engine/spacedRetrievalEngine";

describe("LEXICON OVERDRIVE: C2 COGNITIVE ARENA Data & Engine Tests", () => {
  it("should have all 12 units loaded in registry", () => {
    expect(VOCAB_C2_UNITS.length).toBe(12);
    for (let u = 1; u <= 12; u++) {
      const unit = getC2UnitByNumber(u);
      expect(unit).toBeDefined();
      expect(unit.unitNumber).toBe(u);
      expect(unit.schemaItems.length).toBeGreaterThan(0);
      expect(unit.collocationPairs.length).toBeGreaterThan(0);
      expect(unit.domainSortItems.length).toBeGreaterThan(0);
      expect(unit.triLockPuzzles.length).toBeGreaterThan(0);
      expect(unit.morphologicalFamilies.length).toBeGreaterThan(0);
      expect(unit.personaCards.length).toBeGreaterThan(0);
      expect(unit.binaryPrecisionPairs.length).toBeGreaterThan(0);
      expect(unit.narrativeChronicle.segments.length).toBeGreaterThan(0);
    }
  });

  it("should have deep full vertical slice for Units 1, 4, 5, and 9", () => {
    const u1 = getC2UnitByNumber(1);
    expect(u1.isFullVerticalSlice).toBe(true);
    expect(u1.schemaItems.length).toBeGreaterThanOrEqual(6);
    expect(u1.collocationPairs.length).toBeGreaterThanOrEqual(8);
    expect(u1.personaCards.length).toBeGreaterThanOrEqual(6);

    const u4 = getC2UnitByNumber(4);
    expect(u4.isFullVerticalSlice).toBe(true);
    expect(u4.schemaItems.length).toBeGreaterThanOrEqual(6);
    expect(u4.collocationPairs.length).toBeGreaterThanOrEqual(8);

    const u5 = getC2UnitByNumber(5);
    expect(u5.isFullVerticalSlice).toBe(true);
    expect(u5.personaCards.length).toBeGreaterThanOrEqual(8);
    expect(u5.narrativeChronicle.title).toContain("The Hopeless Romantic");

    const u9 = getC2UnitByNumber(9);
    expect(u9.isFullVerticalSlice).toBe(true);
    expect(u9.triLockPuzzles.length).toBeGreaterThanOrEqual(5);
    expect(u9.binaryPrecisionPairs.length).toBeGreaterThanOrEqual(6);
    expect(u9.narrativeChronicle.title).toContain("Coming to Terms with Cancer");
  });

  it("should evaluate response latency according to cognitive tiers", () => {
    const reflex = evaluateLatency(850);
    expect(reflex.tier).toBe("NATIVE_REFLEX");
    expect(reflex.xpMultiplier).toBe(1.5);

    const fluent = evaluateLatency(1800);
    expect(fluent.tier).toBe("FLUENT_RETRIEVAL");
    expect(fluent.xpMultiplier).toBe(1.2);

    const deliberate = evaluateLatency(3400);
    expect(deliberate.tier).toBe("DELIBERATE_RECALL");
    expect(deliberate.xpMultiplier).toBe(1.0);

    // Cognitive Deliberation for Nuance Modes
    const hasty = evaluateLatency(600, "persona");
    expect(hasty.tier).toBe("HASTY_GUESS");
    expect(hasty.xpMultiplier).toBe(0.8);

    const scholarDeliberate = evaluateLatency(3500, "persona");
    expect(scholarDeliberate.tier).toBe("DELIBERATE_RECALL");
    expect(scholarDeliberate.isDeliberateScholar).toBe(true);
    expect(scholarDeliberate.xpMultiplier).toBe(1.6);
  });

  it("should progress through 6 Cultivation Ranks correctly", () => {
    expect(CULTIVATION_RANKS.length).toBe(6);
    expect(getRankForXp(0).id).toBe("LEXICAL_NOVICE");
    expect(getRankForXp(600).id).toBe("SEMANTIC_ADEPT");
    expect(getRankForXp(2000).id).toBe("SYNTACTIC_VANGUARD");
    expect(getRankForXp(4000).id).toBe("COLLOCATION_SOVEREIGN");
    expect(getRankForXp(8000).id).toBe("RHETORIC_GRANDMASTER");
    expect(getRankForXp(15000).id).toBe("COGNITIVE_APEX");
  });

  it("should return valid unit metadata across all units", () => {
    const metas = getAllC2UnitMetas();
    expect(metas.length).toBe(12);
    metas.forEach((m) => {
      expect(m.lexiconCount).toBeGreaterThan(5);
    });
  });
});
