import { describe, it, expect } from "vitest";
import { EvcUnitDataSchema } from "../../../data/essentialVocab/schema";
import { EVC5_UNIT01_DATA } from "../../../data/essentialVocab/books/evc5/unit01.looking-good";
import { EVC5_UNIT02_DATA } from "../../../data/essentialVocab/books/evc5/unit02.personality-and-behaviour";
import { EVC5_UNIT03_DATA } from "../../../data/essentialVocab/books/evc5/unit03.bad-feelings";
import { EVC5_UNIT04_DATA } from "../../../data/essentialVocab/books/evc5/unit04.good-feelings";
import { EVC5_UNIT05_DATA } from "../../../data/essentialVocab/books/evc5/unit05.communication";
import { EVC5_UNIT06_DATA } from "../../../data/essentialVocab/books/evc5/unit06.getting-on-with-other-people";
import { EVC5_UNIT07_DATA } from "../../../data/essentialVocab/books/evc5/unit07.illness-and-disease";
import { EVC5_UNIT08_DATA } from "../../../data/essentialVocab/books/evc5/unit08.keeping-fit-and-healthy";
import { EVC5_UNIT09_DATA } from "../../../data/essentialVocab/books/evc5/unit09.at-the-dentists";
import { EVC5_UNIT10_DATA } from "../../../data/essentialVocab/books/evc5/unit10.accidents-and-emergencies";
import { EVC5_UNIT11_DATA } from "../../../data/essentialVocab/books/evc5/unit11.working";
import { EVC5_UNIT12_DATA } from "../../../data/essentialVocab/books/evc5/unit12.cooking";
import { EVC5_UNIT13_DATA } from "../../../data/essentialVocab/books/evc5/unit13.eating-and-drinking";
import { EVC5_UNIT14_DATA } from "../../../data/essentialVocab/books/evc5/unit14.eating-out";
import { EVC5_UNIT15_DATA } from "../../../data/essentialVocab/books/evc5/unit15.household-equipment";
import {
  resolveEvcUnitId,
  getEvcUnitSummary,
  loadEvcUnit,
} from "../../../data/essentialVocab/registry";
import { evaluateOpenClozeBlank } from "../answerNormalizer";
import {
  gradeStage1Exercise,
  gradeStage2Exercise,
  gradeStage3Exercise,
  gradeStage4Exercise,
} from "../exerciseGrader";
import { calculateClientSm2Transition } from "../sm2Client";
import { reconcileStageAttempt } from "../../../../../server/services/essentialVocab/progressReconciler";

describe("Essential Vocabulary in Context — Schema, Grader & Progress Engine", () => {
  it("validates Book 5 Unit 1 ('Looking good') with exact 32 glossary entries (33 headwords) and 30 questions", () => {
    const parsed = EvcUnitDataSchema.parse(EVC5_UNIT01_DATA);

    expect(parsed.unitId).toBe("evc5-u01");
    expect(parsed.glossary.length).toBe(32);

    // Count primary + alternate headwords (excluding US spelling aliases on jewellery/make-up)
    const gemEntry = parsed.glossary.find((e) => e.entryId === "evc5-u01-w15");
    expect(gemEntry?.displayHeadword).toBe("gem or gemstone");
    expect(gemEntry?.primaryHeadword).toBe("gem");
    expect(gemEntry?.alternateHeadwords).toContain("gemstone");

    expect(parsed.exercises.stage1.questions.length).toBe(10);
    expect(parsed.exercises.stage2.questions.length).toBe(5);
    expect(parsed.exercises.stage3.blanks.length).toBe(5);
    expect(parsed.exercises.stage4.blanks.length).toBe(10);

    // Every linkedEntryId across all 4 stages must exist in the Unit 1 glossary
    const validIds = new Set(parsed.glossary.map((g) => g.entryId));
    for (const q of parsed.exercises.stage1.questions) {
      expect(validIds.has(q.linkedEntryId)).toBe(true);
    }
    for (const q of parsed.exercises.stage2.questions) {
      expect(validIds.has(q.answerLinkedEntryId)).toBe(true);
    }
    for (const b of parsed.exercises.stage3.blanks) {
      expect(validIds.has(b.linkedEntryId)).toBe(true);
    }
    for (const b of parsed.exercises.stage4.blanks) {
      expect(validIds.has(b.linkedEntryId)).toBe(true);
    }
  });

  it("supports Book 3 units with 5 blanks in Stage 4 (25 total questions) without schema changes", () => {
    const mockBook3Unit = {
      ...EVC5_UNIT01_DATA,
      unitId: "evc3-u01",
      bookId: "evc-3" as const,
      exercises: {
        ...EVC5_UNIT01_DATA.exercises,
        stage4: {
          ...EVC5_UNIT01_DATA.exercises.stage4,
          blanks: EVC5_UNIT01_DATA.exercises.stage4.blanks.slice(0, 5),
        },
      },
    };

    const parsed = EvcUnitDataSchema.parse(mockBook3Unit);
    expect(parsed.bookId).toBe("evc-3");
    expect(parsed.exercises.stage4.blanks.length).toBe(5);
  });

  it("resolves flexible unit slugs deterministically", () => {
    expect(resolveEvcUnitId("1")).toBe("evc5-u01");
    expect(resolveEvcUnitId("u1")).toBe("evc5-u01");
    expect(resolveEvcUnitId("evc5-u1")).toBe("evc5-u01");
    expect(resolveEvcUnitId("evc5-u01")).toBe("evc5-u01");
    expect(getEvcUnitSummary("1")?.title).toBe("Looking good");
  });

  it("evaluates Stage 4 Open Cloze blanks using the 4-tier normalizer", () => {
    const blanks = EVC5_UNIT01_DATA.exercises.stage4.blanks;
    const blank1 = blanks[0]; // designers
    const blank2 = blanks[1]; // high-heeled
    const blank3 = blanks[2]; // jewellery (variant: jewelry)
    const blank5 = blanks[4]; // rubies (near-miss: ruby, gems)
    const blank6 = blanks[5]; // bangles (verified alt: bracelets)

    // Tier 1: Canonical
    expect(evaluateOpenClozeBlank("  Designers ", blank1).matchTier).toBe(
      "CORRECT_CANONICAL"
    );

    // Tier 2: Orthographic UK/US Variant
    const v3 = evaluateOpenClozeBlank("jewelry", blank3);
    expect(v3.isCorrect).toBe(true);
    expect(v3.matchTier).toBe("CORRECT_VARIANT");

    // Tier 3: Human-Verified Contextual Alternative
    const alt6 = evaluateOpenClozeBlank("bracelets", blank6);
    expect(alt6.isCorrect).toBe(true);
    expect(alt6.matchTier).toBe("CORRECT_VERIFIED_ALT");

    // Tier 4: Morphological / Orthographic Near-Misses (0 points + targeted feedback)
    const miss1 = evaluateOpenClozeBlank("designer", blank1);
    expect(miss1.isCorrect).toBe(false);
    expect(miss1.matchTier).toBe("INCORRECT_NEAR_MISS");
    expect(miss1.feedbackMessage).toContain("designers");

    const miss2 = evaluateOpenClozeBlank("high heeled", blank2);
    expect(miss2.isCorrect).toBe(false);
    expect(miss2.matchTier).toBe("INCORRECT_NEAR_MISS");

    const miss5 = evaluateOpenClozeBlank("ruby", blank5);
    expect(miss5.isCorrect).toBe(false);
    expect(miss5.matchTier).toBe("INCORRECT_NEAR_MISS");
  });

  it("grades all 4 stages of Unit 1 accurately against the official Answer Key", () => {
    // Stage 1: 1:(3), 2:(4), 3:(1), 4:(2), 5:(4), 6:(2), 7:(3), 8:(4), 9:(1), 10:(3)
    const s1 = gradeStage1Exercise(EVC5_UNIT01_DATA.exercises.stage1, {
      "evc5-u01-s1-q01": 3,
      "evc5-u01-s1-q02": 4,
      "evc5-u01-s1-q03": 1,
      "evc5-u01-s1-q04": 2,
      "evc5-u01-s1-q05": 4,
      "evc5-u01-s1-q06": 2,
      "evc5-u01-s1-q07": 3,
      "evc5-u01-s1-q08": 4,
      "evc5-u01-s1-q09": 1,
      "evc5-u01-s1-q10": 3,
    });
    expect(s1.score).toBe(10);
    expect(s1.accuracyPct).toBe(100);

    // Stage 2: 1:(4), 2:(1), 3:(3), 4:(4), 5:(2)
    const s2 = gradeStage2Exercise(EVC5_UNIT01_DATA.exercises.stage2, {
      "evc5-u01-s2-q01": 4,
      "evc5-u01-s2-q02": 1,
      "evc5-u01-s2-q03": 3,
      "evc5-u01-s2-q04": 4,
      "evc5-u01-s2-q05": 2,
    });
    expect(s2.score).toBe(5);

    // Stage 3: 1:E, 2:F, 3:C, 4:B, 5:J
    const s3 = gradeStage3Exercise(EVC5_UNIT01_DATA.exercises.stage3, {
      "evc5-u01-s3-b01": "E",
      "evc5-u01-s3-b02": "F",
      "evc5-u01-s3-b03": "C",
      "evc5-u01-s3-b04": "B",
      "evc5-u01-s3-b05": "J",
    });
    expect(s3.score).toBe(5);

    // Stage 4: canonical answers
    const s4 = gradeStage4Exercise(EVC5_UNIT01_DATA.exercises.stage4, {
      "evc5-u01-s4-b01": "designers",
      "evc5-u01-s4-b02": "high-heeled",
      "evc5-u01-s4-b03": "jewellery",
      "evc5-u01-s4-b04": "necklace",
      "evc5-u01-s4-b05": "rubies",
      "evc5-u01-s4-b06": "bangles",
      "evc5-u01-s4-b07": "rings",
      "evc5-u01-s4-b08": "casual",
      "evc5-u01-s4-b09": "make-up",
      "evc5-u01-s4-b10": "earrings",
    });
    expect(s4.score).toBe(10);
  });

  it("preserves bestStageScores when a learner retries a stage with a lower score", () => {
    const firstAttempt = reconcileStageAttempt(null, {
      stage: 1,
      score: 9,
      maxScore: 10,
      contentVersion: 1,
      stageMaxScores: { stage1: 10, stage2: 5, stage3: 5, stage4: 10 },
    });

    expect(firstAttempt.bestStage1Score).toBe(9);
    expect(firstAttempt.latestStage1Score).toBe(9);

    const lowerRetry = reconcileStageAttempt(firstAttempt, {
      stage: 1,
      score: 6,
      maxScore: 10,
      contentVersion: 1,
      stageMaxScores: { stage1: 10, stage2: 5, stage3: 5, stage4: 10 },
    });

    expect(lowerRetry.bestStage1Score).toBe(9);
    expect(lowerRetry.latestStage1Score).toBe(6);
    expect(lowerRetry.bestTotalScore).toBe(9);
    expect(lowerRetry.latestTotalScore).toBe(6);
    expect(lowerRetry.attemptsCount).toBe(2);
  });

  it("calculates SM-2 transitions deterministically for AGAIN, HARD, GOOD, and EASY", () => {
    const initial = {
      intervalDays: 1,
      easeFactor: 2.5,
      masteryState: 0,
      masteryScore: 0.1,
      nextReviewAt: new Date().toISOString(),
      totalReviews: 0,
      failedReviews: 0,
      history: [],
    };

    const afterGood = calculateClientSm2Transition(initial, "GOOD", 1200);
    expect(afterGood.intervalDays).toBe(3);
    expect(afterGood.masteryScore).toBe(0.35);
    expect(afterGood.totalReviews).toBe(1);

    const afterAgain = calculateClientSm2Transition(afterGood, "AGAIN", 1500);
    expect(afterAgain.intervalDays).toBe(1);
    expect(afterAgain.failedReviews).toBe(1);
    expect(afterAgain.easeFactor).toBe(2.3);
  });

  it("validates Units 2, 3, 4, 5, 6, 7, 8, 9, and 10 (270 total questions, inline_four_option & box_word_bank variants, verified answer keys)", async () => {
    const units = [
      EVC5_UNIT02_DATA,
      EVC5_UNIT03_DATA,
      EVC5_UNIT04_DATA,
      EVC5_UNIT05_DATA,
      EVC5_UNIT06_DATA,
      EVC5_UNIT07_DATA,
      EVC5_UNIT08_DATA,
      EVC5_UNIT09_DATA,
      EVC5_UNIT10_DATA,
      EVC5_UNIT11_DATA,
      EVC5_UNIT12_DATA,
      EVC5_UNIT13_DATA,
      EVC5_UNIT14_DATA,
      EVC5_UNIT15_DATA,
    ];

    for (const u of units) {
      const parsed = EvcUnitDataSchema.parse(u);
      expect(parsed.exercises.stage1.questions.length).toBe(10);
      expect(parsed.exercises.stage2.questions.length).toBe(5);
      expect(parsed.exercises.stage3.blanks.length).toBe(5);
      expect(parsed.exercises.stage4.blanks.length).toBe(10);

      const validEntryIds = new Set(parsed.glossary.map((g) => g.entryId));
      for (const q of parsed.exercises.stage1.questions) {
        expect(validEntryIds.has(q.linkedEntryId)).toBe(true);
      }
      for (const q of parsed.exercises.stage2.questions) {
        expect(validEntryIds.has(q.answerLinkedEntryId)).toBe(true);
      }
      for (const b of parsed.exercises.stage3.blanks) {
        expect(validEntryIds.has(b.linkedEntryId)).toBe(true);
      }
      for (const b of parsed.exercises.stage4.blanks) {
        expect(validEntryIds.has(b.linkedEntryId)).toBe(true);
      }
    }

    // Verify inline_four_option grading on Unit 2 Stage 3 (1:4, 2:3, 3:2, 4:3, 5:1)
    const u2s3 = gradeStage3Exercise(EVC5_UNIT02_DATA.exercises.stage3, {
      "evc5-u02-s3-b01": 4,
      "evc5-u02-s3-b02": 3,
      "evc5-u02-s3-b03": 2,
      "evc5-u02-s3-b04": 3,
      "evc5-u02-s3-b05": 1,
    });
    expect(u2s3.score).toBe(5);

    // Verify box_word_bank grading on Unit 7 Stage 3 (1:B, 2:D, 3:F, 4:H, 5:J)
    const u7s3 = gradeStage3Exercise(EVC5_UNIT07_DATA.exercises.stage3, {
      "evc5-u07-s3-b01": "B",
      "evc5-u07-s3-b02": "D",
      "evc5-u07-s3-b03": "F",
      "evc5-u07-s3-b04": "H",
      "evc5-u07-s3-b05": "J",
    });
    expect(u7s3.score).toBe(5);

    // Verify inline_four_option grading on Unit 10 Stage 3 (1:4, 2:1, 3:2, 4:3, 5:2)
    const u10s3 = gradeStage3Exercise(EVC5_UNIT10_DATA.exercises.stage3, {
      "evc5-u10-s3-b01": 4,
      "evc5-u10-s3-b02": 1,
      "evc5-u10-s3-b03": 2,
      "evc5-u10-s3-b04": 3,
      "evc5-u10-s3-b05": 2,
    });
    expect(u10s3.score).toBe(5);

    // Verify lazy loader resolves Units 1..15
    for (const slug of [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
    ]) {
      const loaded = await loadEvcUnit(slug);
      expect(loaded).not.toBeNull();
      expect(loaded?.unitNumber).toBe(Number(slug));
    }
  });
});
