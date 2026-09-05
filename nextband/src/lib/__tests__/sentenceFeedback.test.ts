import { describe, it, expect } from "vitest";
import {
  calculateIELTSOverall,
  calculateSkillBand,
  calculateSpeakingBand,
  parseStructuredFeedback,
  serializeStructuredFeedback,
  aggregateSpeakingAnnotations,
  CATEGORY_CRITERION_MAP,
  CATEGORIES_BY_CRITERION,
  type SpeakingCorrectionItem,
  type StructuredFeedbackPayload,
} from "@/lib/sentenceFeedback";



// ─────────────────────────────────────────────────────────────────────────────
// calculateIELTSOverall — official IELTS rounding rules
// ─────────────────────────────────────────────────────────────────────────────

describe("calculateIELTSOverall — IELTS rounding rules", () => {
  // Rule: fraction < 0.25 → round down; 0.25–0.74 → .5; ≥ 0.75 → round up

  it("returns whole number when avg is exact whole", () => {
    expect(calculateIELTSOverall(6)).toBe(6);
    expect(calculateIELTSOverall(7)).toBe(7);
    expect(calculateIELTSOverall(5.5)).toBe(5.5);
  });

  it("rounds down when fraction < 0.25", () => {
    // avg = 6.125 (fraction=0.125) → 6.0
    expect(calculateIELTSOverall([6, 6, 6.5, 6])).toBe(6);
    // avg = 6.0 → 6.0
    expect(calculateIELTSOverall([6, 6, 6, 6])).toBe(6);
    // avg = 5.125 → 5.0
    expect(calculateIELTSOverall([5, 5, 5.5, 5])).toBe(5);
  });

  it("rounds to .5 when fraction is 0.25–0.74", () => {
    // avg = 6.25 (fraction=0.25) → 6.5
    expect(calculateIELTSOverall(6.25)).toBe(6.5);
    // avg = 6.375 (fraction=0.375) → 6.5
    expect(calculateIELTSOverall([6, 6.5, 6.5, 6.5])).toBe(6.5);
    // avg = 6.5 (fraction=0.5) → 6.5
    expect(calculateIELTSOverall(6.5)).toBe(6.5);
    // avg = 6.625 (fraction=0.625) → 6.5  (boundary: 0.625 < 0.75)
    expect(calculateIELTSOverall([6, 7, 6.5, 7])).toBe(6.5);
  });

  it("rounds up when fraction ≥ 0.75", () => {
    // avg = 6.75 → 7.0
    expect(calculateIELTSOverall(6.75)).toBe(7);
    // avg = 6.875 (fraction=0.875) → 7.0
    expect(calculateIELTSOverall([7, 7, 6.5, 7])).toBe(7);
    // avg = 7.75 → 8.0
    expect(calculateIELTSOverall(7.75)).toBe(8);
  });

  it("accepts array of scores", () => {
    expect(calculateIELTSOverall([6, 6.5, 6.5, 7])).toBe(6.5); // avg=6.5
    expect(calculateIELTSOverall([7, 7, 7, 7])).toBe(7);
    expect(calculateIELTSOverall([8, 8.5, 8, 8.5])).toBe(8.5);
  });

  it("handles single score in array", () => {
    expect(calculateIELTSOverall([6.5])).toBe(6.5);
  });

  it("handles empty array", () => {
    expect(calculateIELTSOverall([])).toBe(0);
  });

  it("ignores NaN values in array", () => {
    expect(calculateIELTSOverall([6, NaN, 6.5, 6])).toBe(6); // avg of [6,6.5,6]=6.167 → 6.0
  });
});

describe("calculateSkillBand — single skill criteria average rounds down", () => {
  it("truncates to nearest 0.5 (Math.floor(avg * 2) / 2)", () => {
    // 6.25 -> 6.0
    expect(calculateSkillBand(6.25)).toBe(6.0);
    expect(calculateSkillBand([6, 6, 6, 7])).toBe(6.0);
    // 6.75 -> 6.5
    expect(calculateSkillBand(6.75)).toBe(6.5);
    expect(calculateSkillBand([6, 7, 7, 7])).toBe(6.5);
    // 6.875 -> 6.5
    expect(calculateSkillBand([7, 7, 6.5, 7])).toBe(6.5);
    // 6.5 -> 6.5
    expect(calculateSkillBand(6.5)).toBe(6.5);
    // 6.0 -> 6.0
    expect(calculateSkillBand(6.0)).toBe(6.0);
  });
});

describe("calculateSpeakingBand — returns string with .toFixed(1)", () => {

  it("returns — when scores is null/undefined", () => {
    expect(calculateSpeakingBand(null)).toBe("—");
    expect(calculateSpeakingBand(undefined)).toBe("—");
    expect(calculateSpeakingBand({})).toBe("—");
  });

  it("rounds down to nearest 0.5 within a single skill (4 component criteria)", () => {
    // avg = 6.25 -> 6.0 (NOT 6.5)
    expect(calculateSpeakingBand({ fluencyAndCoherence: 6, pronunciation: 6, lexical: 6, grammar: 7 })).toBe("6.0");
    // avg = 6.75 -> 6.5 (NOT 7.0)
    expect(calculateSpeakingBand({ fluencyAndCoherence: 6, pronunciation: 7, lexical: 7, grammar: 7 })).toBe("6.5");
    // avg = 6.5 -> 6.5
    expect(calculateSpeakingBand({ fluencyAndCoherence: 6.5, pronunciation: 6.5, lexical: 6.5, grammar: 6.5 })).toBe("6.5");
    // avg = 6.875 -> 6.5 (NOT 7.0)
    expect(calculateSpeakingBand({ fluencyAndCoherence: 7, pronunciation: 7, lexical: 6.5, grammar: 7 })).toBe("6.5");
  });

  it("handles partial scores", () => {
    // Only 2 scores provided: [6, 7] -> avg = 6.5 -> 6.5
    expect(calculateSpeakingBand({ fluencyAndCoherence: 6, pronunciation: 7 })).toBe("6.5");
  });
});


// ─────────────────────────────────────────────────────────────────────────────
// Taxonomy integrity — CATEGORY_CRITERION_MAP vs CATEGORIES_BY_CRITERION
// ─────────────────────────────────────────────────────────────────────────────

describe("Taxonomy integrity", () => {
  it("every category in CATEGORIES_BY_CRITERION maps back to the correct criterion", () => {
    for (const [criterion, categories] of Object.entries(CATEGORIES_BY_CRITERION)) {
      for (const cat of categories) {
        expect(CATEGORY_CRITERION_MAP[cat as keyof typeof CATEGORY_CRITERION_MAP]).toBe(criterion);
      }
    }
  });

  it("every entry in CATEGORY_CRITERION_MAP appears in CATEGORIES_BY_CRITERION", () => {
    for (const [category, criterion] of Object.entries(CATEGORY_CRITERION_MAP)) {
      const criterionCategories = CATEGORIES_BY_CRITERION[criterion as keyof typeof CATEGORIES_BY_CRITERION];
      expect(criterionCategories).toContain(category);
    }
  });

  it("total category count is 30", () => {
    const total = Object.values(CATEGORIES_BY_CRITERION).reduce((sum, cats) => sum + cats.length, 0);
    expect(total).toBe(30);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// serialize → parse roundtrip (Speaking 4–3–1 fields)
// ─────────────────────────────────────────────────────────────────────────────

describe("serializeStructuredFeedback / parseStructuredFeedback — Speaking 4–3–1 roundtrip", () => {
  const correction: SpeakingCorrectionItem = {
    id: "c1",
    priority: "P1",
    criterion: "GRA",
    category: "TENSE",
    timestamp: { start: 109, end: 116 },
    segmentId: "seg-3",
    studentSaid: "He would be Sơn Tùng MTP",
    correction: "He is Sơn Tùng MTP",
    note: "Simple present for general facts",
  };

  const payload: StructuredFeedbackPayload = {
    text: "",
    criteriaScores: { fluencyAndCoherence: 6, lexical: 6.5, grammar: 6, pronunciation: 6.5 },
    speakingCorrections: [correction],
    speakingStrengths: ["pr_ending_sound", "fc_fluent"],
    speakingSummary: {
      strongestPoint: "Phát âm âm cuối rõ",
      mainArea: "Ngữ pháp thì",
      nextTarget: "Sửa câu dùng thì hiện tại đơn",
      teacherNote: "Em cần luyện thêm thì hiện tại.",
    },
    speakingRetryMission: {
      originalSentence: "He would be Sơn Tùng MTP",
      targetSentence: "He is Sơn Tùng MTP",
      missionPrompt: "Nói lại câu này mà không nhìn gợi ý",
    },
  };

  it("roundtrips speakingCorrections correctly", () => {
    const serialized = serializeStructuredFeedback(payload);
    const parsed = parseStructuredFeedback(serialized);

    expect(parsed.speakingCorrections).toHaveLength(1);
    const c = parsed.speakingCorrections![0];
    expect(c.id).toBe("c1");
    expect(c.priority).toBe("P1");
    expect(c.criterion).toBe("GRA");
    expect(c.category).toBe("TENSE");
    expect(c.timestamp).toEqual({ start: 109, end: 116 });
    expect(c.segmentId).toBe("seg-3");
    expect(c.studentSaid).toBe("He would be Sơn Tùng MTP");
    expect(c.correction).toBe("He is Sơn Tùng MTP");
    expect(c.note).toBe("Simple present for general facts");
  });

  it("roundtrips speakingStrengths correctly", () => {
    const parsed = parseStructuredFeedback(serializeStructuredFeedback(payload));
    expect(parsed.speakingStrengths).toEqual(["pr_ending_sound", "fc_fluent"]);
  });

  it("roundtrips speakingSummary correctly", () => {
    const parsed = parseStructuredFeedback(serializeStructuredFeedback(payload));
    expect(parsed.speakingSummary?.strongestPoint).toBe("Phát âm âm cuối rõ");
    expect(parsed.speakingSummary?.teacherNote).toBe("Em cần luyện thêm thì hiện tại.");
  });

  it("roundtrips speakingRetryMission correctly", () => {
    const parsed = parseStructuredFeedback(serializeStructuredFeedback(payload));
    expect(parsed.speakingRetryMission?.originalSentence).toBe("He would be Sơn Tùng MTP");
    expect(parsed.speakingRetryMission?.targetSentence).toBe("He is Sơn Tùng MTP");
  });

  it("omits undefined speaking fields from serialized JSON (keeps payload clean)", () => {
    const minimalPayload: StructuredFeedbackPayload = {
      criteriaScores: { fluencyAndCoherence: 6 },
    };
    const serialized = serializeStructuredFeedback(minimalPayload);
    const json = JSON.parse(serialized);
    expect(json.speakingCorrections).toBeUndefined();
    expect(json.speakingStrengths).toBeUndefined();
    expect(json.speakingSummary).toBeUndefined();
    expect(json.speakingRetryMission).toBeUndefined();
  });

  it("parses legacy feedback (plain text string, no JSON)", () => {
    const legacy = "Good vocabulary but grammar needs work.";
    const parsed = parseStructuredFeedback(legacy);
    expect(parsed.text).toBe(legacy);
    expect(parsed.sentenceFeedbacks).toEqual([]);
    expect(parsed.speakingCorrections).toBeUndefined();
  });

  it("parses legacy JSON without speaking fields gracefully", () => {
    const legacyJson = JSON.stringify({
      text: "Old feedback",
      criteriaScores: { fluencyAndCoherence: 6, grammar: 6 },
      sentenceFeedbacks: [],
    });
    const parsed = parseStructuredFeedback(legacyJson);
    expect(parsed.text).toBe("Old feedback");
    expect(parsed.speakingCorrections).toBeUndefined();
    expect(parsed.speakingRetryMission).toBeUndefined();
  });
});

describe("aggregateSpeakingAnnotations (Diagnostic Engine)", () => {
  it("aggregates sentence annotations into 4–3–1 diagnostic structure automatically", () => {
    const annotations = [
      {
        id: "ann-1",
        segmentId: "seg-1",
        startMs: 0,
        endMs: 5000,
        text: "Today I would like to talk about my favorite singer.",
        kind: "STRENGTH" as const,
        criterion: "FC" as const,
        category: "fc_fluent",
      },
      {
        id: "ann-2",
        segmentId: "seg-2",
        startMs: 5000,
        endMs: 12000,
        text: "He would be Sơn Tùng MTP who is one of the most famous singers.",
        kind: "ISSUE" as const,
        criterion: "GRA" as const,
        category: "TENSE",
        correction: "He is Sơn Tùng MTP...",
      },
      {
        id: "ann-3",
        segmentId: "seg-3",
        startMs: 12000,
        endMs: 18000,
        text: "His music is very morning and exciting.",
        kind: "ISSUE" as const,
        criterion: "LR" as const,
        category: "WORD_CHOICE",
        correction: "His music is modern and exciting.",
      },
    ];

    const aggregated = aggregateSpeakingAnnotations(annotations);

    // 3 Priority issues (P1, P2)
    expect(aggregated.speakingCorrections).toHaveLength(2);
    expect(aggregated.speakingCorrections[0].priority).toBe("P1");
    expect(aggregated.speakingCorrections[0].category).toBe("TENSE");
    expect(aggregated.speakingCorrections[1].priority).toBe("P2");
    expect(aggregated.speakingCorrections[1].category).toBe("WORD_CHOICE");

    // Strengths
    expect(aggregated.speakingStrengths).toContain("fc_fluent");

    // 1 Retry Mission from P1
    expect(aggregated.speakingRetryMission).toBeDefined();
    expect(aggregated.speakingRetryMission?.originalSentence).toBe("He would be Sơn Tùng MTP who is one of the most famous singers.");
    expect(aggregated.speakingRetryMission?.targetSentence).toBe("He is Sơn Tùng MTP...");

    // Summary
    expect(aggregated.speakingSummary.strongestPoint).toBeDefined();
    expect(aggregated.speakingSummary.mainArea).toContain("Sai thì / thể");
  });
});


