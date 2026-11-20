import { describe, it, expect } from "vitest";
import {
  ALL_READING_CASES,
  READING_CASE_CATALOG,
  getRecommendedNextCases,
} from "@/data/readingCases/caseRegistry";
import { getParagraphTranslationVi } from "@/data/readingCases/caseTranslationsVi";
import { extractCaseGlossary } from "../services/caseGlossaryService";
import { lookupWord } from "../services/readingDictionary";
import {
  computeNextScrollProgress,
  computeNextTasksProgress,
  toggleManualReadProgress,
} from "../hooks/useReadingProgress";

describe("Reading Analysis Upgrade — Data, Glossary, Lemmatization & Progress", () => {
  it("provides complete Vietnamese translations (>= 40 chars) for 100% of paragraphs across all 15 cases", () => {
    const cases = Object.values(ALL_READING_CASES);
    expect(cases).toHaveLength(15);

    for (const readingCase of cases) {
      for (const source of readingCase.sources) {
        for (const para of source.paragraphs) {
          const vi = getParagraphTranslationVi(readingCase.id, para.id, para.text_vi);
          expect(
            vi,
            `Missing Vietnamese translation for ${readingCase.id} -> ${para.id}`
          ).toBeTruthy();
          expect(
            (vi || "").trim().length,
            `Translation too short for ${readingCase.id} -> ${para.id}`
          ).toBeGreaterThanOrEqual(40);
        }
      }
    }
  });

  it("organizes READING_CASE_CATALOG with all 15 cases matching actual level distribution", () => {
    expect(READING_CASE_CATALOG).toHaveLength(15);

    const tierCounts = READING_CASE_CATALOG.reduce(
      (acc, item) => {
        acc[item.levelTier] += 1;
        return acc;
      },
      { foundation: 0, c1: 0, c2: 0 }
    );

    expect(tierCounts.foundation).toBe(2);
    expect(tierCounts.c1).toBe(8);
    expect(tierCounts.c2).toBe(5);
  });

  it("recommends 3 next reading cases excluding current case and prioritizing unread articles", () => {
    const readIds = new Set<string>(["case-003", "case-004"]);
    const recs = getRecommendedNextCases("case-002", readIds, 3);

    expect(recs).toHaveLength(3);
    expect(recs.some((item) => item.id === "case-002")).toBe(false);
    expect(recs.some((item) => readIds.has(item.id))).toBe(false);
  });

  it("extracts >= 10 curated glossary entries with valid paragraph numbers across all 15 cases", () => {
    for (const readingCase of Object.values(ALL_READING_CASES)) {
      const { curated, paragraphNumberMap } = extractCaseGlossary(readingCase);
      expect(
        curated.length,
        `Expected >= 10 curated glossary entries for ${readingCase.id}`
      ).toBeGreaterThanOrEqual(10);

      for (const item of curated) {
        expect(item.paragraphNumber).toBeGreaterThanOrEqual(1);
        expect(paragraphNumberMap[item.paragraphId]).toBe(item.paragraphNumber);
      }
    }
  });

  it("improves lemmatization lookup for possessive, doubled-consonant, plural -ies, and comparative forms", () => {
    const buffettPossessive = lookupWord("Buffett's", "case-002");
    expect(buffettPossessive).not.toBeNull();

    const stopped = lookupWord("stopped", "case-002", "They stopped immediately.");
    expect(stopped).not.toBeNull();

    const running = lookupWord("running", "case-002", "Algorithms are running fast.");
    expect(running).not.toBeNull();

    const strategies = lookupWord("strategies", "case-008");
    expect(strategies).not.toBeNull();

    const stronger = lookupWord("stronger", "case-002");
    expect(stronger).not.toBeNull();
    expect(stronger?.meaning_vi.toLowerCase()).not.toBe("stronger");
  });

  it("tracks reading progress accurately with auto-complete at >= 85% scroll and manual toggle override", () => {
    const p50 = computeNextScrollProgress(undefined, "case-002", 50);
    expect(p50.scrollPercent).toBe(50);
    expect(p50.isRead).toBe(false);

    // Scroll never regresses below peak
    const p30 = computeNextScrollProgress(p50, "case-002", 30);
    expect(p30.scrollPercent).toBe(50);

    // >= 85% automatically marks as read
    const p88 = computeNextScrollProgress(p30, "case-002", 88);
    expect(p88.scrollPercent).toBe(88);
    expect(p88.isRead).toBe(true);

    // Manual override toggles read status explicitly
    const unreadManual = toggleManualReadProgress(p88, "case-002");
    expect(unreadManual.isRead).toBe(false);
    expect(unreadManual.manualReadOverride).toBe(false);

    const readManual = toggleManualReadProgress(unreadManual, "case-002");
    expect(readManual.isRead).toBe(true);
    expect(readManual.manualReadOverride).toBe(true);

    // Autopsy completion marks as read when no manual override exists
    const autopsyDone = computeNextTasksProgress(p50, "case-003", 4, true);
    expect(autopsyDone.autopsyCompleted).toBe(true);
    expect(autopsyDone.isRead).toBe(true);
  });
});
