import { describe, it, expect } from "vitest";
import {
  determineExplanationDepth,
  validateSemanticEntry,
} from "../services/semanticValidator";
import { VocabularyTerm } from "../types";

describe("Semantic Validator & Dynamic Depth Gates", () => {
  it("assigns 'deep' depth to high-leverage and metaphorical terms", () => {
    const term1: VocabularyTerm = {
      term: "dispensing",
      pronunciation: "/dɪˈspɛnsɪŋ/",
      pos: "verb (-ing)",
      meaning_en: "distributing advice",
      meaning_vi: "chia sẻ lời khuyên",
      context_note: "Buffett dispensing advice",
    };
    expect(determineExplanationDepth(term1)).toBe("deep");

    const term2: VocabularyTerm = {
      term: "force multiplier",
      pronunciation: "/fɔːs ˈmʌltɪplaɪər/",
      pos: "noun phrase",
      meaning_en: "a factor increasing effectiveness",
      meaning_vi: "đòn bẩy nhân đôi sức mạnh",
      context_note: "Communication is a force multiplier",
    };
    expect(determineExplanationDepth(term2)).toBe("deep");
  });

  it("assigns 'standard' depth to factual and scientific domain terms", () => {
    const term: VocabularyTerm = {
      term: "supraglacial lake",
      pronunciation: "/ˌsuːprəˈɡleɪʃəl leɪk/",
      pos: "noun phrase",
      meaning_en: "lake on ice sheet",
      meaning_vi: "hồ nước trên mặt băng",
      context_note: "Lake G-4 disappeared",
    };
    expect(determineExplanationDepth(term)).toBe("standard");
  });

  it("assigns 'concise' depth to simple everyday content words", () => {
    const term: VocabularyTerm = {
      term: "reached",
      pronunciation: "/riːtʃt/",
      pos: "verb",
      meaning_en: "arrived at",
      meaning_vi: "đến nơi",
      context_note: "The team reached the site",
    };
    expect(determineExplanationDepth(term)).toBe("concise");
  });

  it("detects oversimplification when 'dispense' is reduced to generic 'give/cho'", () => {
    const oversimplifiedTerm: VocabularyTerm = {
      term: "dispense",
      pronunciation: "/dɪˈspɛns/",
      pos: "verb",
      meaning_en: "give something",
      meaning_vi: "cho",
      context_note: "He dispensed advice",
      humanized: {
        simple_intuition: "dispense chỉ là cho người khác thứ gì đó.",
      },
    };

    const report = validateSemanticEntry(oversimplifiedTerm);
    expect(report.isValid).toBe(false);
    expect(report.flags?.isOversimplified).toBe(true);
    expect(report.warnings?.[0]).toContain("Oversimplification warning");
  });

  it("detects metaphor literalization trap", () => {
    const literalizedTerm: VocabularyTerm = {
      term: "dispensing",
      pronunciation: "/dɪˈspɛnsɪŋ/",
      pos: "verb (-ing)",
      meaning_en: "distributing advice",
      meaning_vi: "chia sẻ lời khuyên",
      context_note: "Buffett dispensing advice",
      humanized: {
        simple_intuition: "dispense là lấy đồ ra từ một cái kho thật hoặc kho chứa vật lý rồi chia cho người khác.",
      },
    };

    const report = validateSemanticEntry(literalizedTerm);
    expect(report.isValid).toBe(false);
    expect(report.flags?.isMetaphorLiteralized).toBe(true);
  });
});
