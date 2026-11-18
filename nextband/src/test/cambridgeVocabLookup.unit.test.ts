import { describe, it, expect } from "vitest";
import {
  getCambridgeUnitData,
  lookupCambridgeWord,
  hasOfflineDefinition,
  getUnitCoreReviewWords,
  getStage1SentenceVi,
  getStage3ParagraphVi,
  extractKeyVocabularyHints
} from "@/data/cambridgeVocab";

describe("Cambridge Vocab B2-C1 Lookup & B1 Support Engine", () => {
  it("resolves Unit 1 target words and Stage 1 options with real IPA and Vietnamese meanings", () => {
    const targets = [
      "relationship",
      "grow up",
      "sibling",
      "maternal",
      "upbringing",
      "resemblance",
      "temperament",
      "close-knit"
    ];
    for (const w of targets) {
      const entry = lookupCambridgeWord(w, 1);
      expect(hasOfflineDefinition(entry)).toBe(true);
      expect(entry.def_vi).not.toContain("Thuật ngữ học thuật cần ghi nhớ");
      expect(entry.ipa).toMatch(/^\/.+\/$/);
    }

    const stage1Options = ["relation", "connection", "filial", "imitation", "reflection"];
    for (const w of stage1Options) {
      const entry = lookupCambridgeWord(w, 1);
      expect(hasOfflineDefinition(entry)).toBe(true);
      expect(entry.def_vi).not.toContain("Thuật ngữ học thuật cần ghi nhớ");
      expect(entry.ipa).not.toBe(`/${w}/`);
    }
  });

  it("resolves every Stage 2 candidate & distractor across all 20 units without placeholder fallbacks", () => {
    for (let unitId = 1; unitId <= 20; unitId++) {
      const unit = getCambridgeUnitData(unitId);
      expect(unit).not.toBeNull();
      if (!unit) continue;

      for (const milestone of unit.stage2_timeline) {
        for (const cand of milestone.candidates) {
          const entry = lookupCambridgeWord(cand, unitId);
          expect(
            hasOfflineDefinition(entry),
            `Unit ${unitId} candidate "${cand}" should have offline definition`
          ).toBe(true);
          expect(entry.def_vi).not.toContain("Thuật ngữ học thuật cần ghi nhớ");
          expect(entry.ipa).not.toBe(`/${cand.toLowerCase()}/`);
        }
      }
    }
  });

  it("lemmatizes inflected Unit 1 context words cleanly", () => {
    const inflected = [
      "establishing",
      "caregivers",
      "dissolves",
      "compels",
      "transient",
      "innate",
      "proponents",
      "hereditary",
      "responsibilities",
      "forebears",
      "deprived",
      "succumb",
      "empirical",
      "inert"
    ];

    for (const w of inflected) {
      const entry = lookupCambridgeWord(w, 1);
      expect(hasOfflineDefinition(entry), `Expected definition for "${w}"`).toBe(true);
      expect(entry.def_vi.length).toBeGreaterThan(2);
    }
  });

  it("provides masked and full Stage 1 translations and Stage 3 paragraph translations for Unit 1", () => {
    const unit1 = getCambridgeUnitData(1);
    expect(unit1).not.toBeNull();
    if (!unit1) return;

    const m1 = unit1.stage1_magnets[0];
    const maskedVi = getStage1SentenceVi(1, m1, false);
    const fullVi = getStage1SentenceVi(1, m1, true);

    expect(maskedVi).toBeTruthy();
    expect(maskedVi).toContain("[ ... ]");
    expect(fullVi).toBeTruthy();
    expect(fullVi).toContain("relationship");

    for (let pIndex = 1; pIndex <= 4; pIndex++) {
      const pVi = getStage3ParagraphVi(1, pIndex);
      expect(pVi).toBeTruthy();
      expect((pVi || "").length).toBeGreaterThan(80);
    }
  });

  it("builds unit-scoped core review queue without unrelated defaults", () => {
    const unit1 = getCambridgeUnitData(1);
    expect(unit1).not.toBeNull();
    if (!unit1) return;

    const coreWords = getUnitCoreReviewWords(unit1);
    expect(coreWords).not.toContain("resit");
    expect(coreWords).not.toContain("grant");
    expect(coreWords).toContain("relationship");
    expect(coreWords).toContain("sibling");
    expect(coreWords).toContain("maternal");
  });

  it("extracts key vocabulary hints from academic sentences", () => {
    const hints = extractKeyVocabularyHints(
      "Psychologists emphasize that establishing a secure emotional relationship in infancy is fundamental.",
      1
    );
    expect(hints.length).toBeGreaterThan(0);
    expect(hints.some(h => h.word.toLowerCase() === "infancy")).toBe(true);
  });
});
