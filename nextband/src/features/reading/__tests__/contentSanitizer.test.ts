import { describe, it, expect } from "vitest";
import {
  sanitizeLearnerText,
  sanitizeIpaPhonetics,
  sanitizeVocabularyTerm,
} from "../services/contentSanitizer";

describe("Content Sanitizer Layer", () => {
  it("preserves 100% of IPA phonetic symbols and slashes", () => {
    const rawIpa = "/dɪˈspɛnsɪŋ/";
    const result = sanitizeIpaPhonetics(rawIpa);
    expect(result).toBe("/dɪˈspɛnsɪŋ/");

    const complexIpa = " krɪˈvæs ";
    expect(sanitizeIpaPhonetics(complexIpa)).toBe("/krɪˈvæs/");

    const specialSymbols = "/ˌhɒrɪˈzɒntəl kəˈlæps/";
    expect(sanitizeIpaPhonetics(specialSymbols)).toBe("/ˌhɒrɪˈzɒntəl kəˈlæps/");
  });

  it("preserves Vietnamese accented characters and standard punctuation", () => {
    const vietnamese = "Hồ chứa 8 triệu m³ nước băng tan trước khi bất ngờ biến mất. Cấp phát thuốc từ kho dược.";
    expect(sanitizeLearnerText(vietnamese)).toBe(vietnamese);
  });

  it("safely strips namespaced tokens, citation markers, and debug tags", () => {
    const dirty = "dispense là cấp phát [cite: p01] {{INTERNAL_SLOT}} __SYSTEM_TOKEN__ theo quy trình <INTERNAL_REF>.";
    const cleaned = sanitizeLearnerText(dirty);
    expect(cleaned).toBe("dispense là cấp phát theo quy trình.");
  });

  it("does NOT blind-regex valid single braces or brackets like {formal} or [verb]", () => {
    const textWithFormal = "Đây là cách diễn đạt {formal} trong văn bản.";
    expect(sanitizeLearnerText(textWithFormal)).toBe("Đây là cách diễn đạt {formal} trong văn bản.");
  });

  it("removes JSON artifacts and unescapes quotes and newlines", () => {
    const escaped = 'Buffett nói: \\"Giao tiếp là đòn bẩy\\".\\\\nĐây là dòng 2.';
    const cleaned = sanitizeLearnerText(escaped);
    expect(cleaned).toBe('Buffett nói: "Giao tiếp là đòn bẩy".\nĐây là dòng 2.');
  });

  it("removes invisible Unicode control characters without mangling text", () => {
    const withInvisible = "dispense\u200B\uFEFF advice";
    expect(sanitizeLearnerText(withInvisible)).toBe("dispense advice");
  });

  it("recursively sanitizes an entire VocabularyTerm object", () => {
    const dirtyTerm = {
      term: "dispensing",
      pronunciation: "dɪˈspɛnsɪŋ",
      pos: "verb (-ing)",
      meaning_en: 'distributing \\"advice\\"',
      meaning_vi: "chia sẻ [cite: p02]",
      context_note: "Warren Buffett  \\n  dispensing advice.",
      humanized: {
        simple_intuition: "dispense {{SLOT}} là đưa ra từ nguồn có sẵn.",
        real_world_transfers: [
          {
            domain_label: "Y tế",
            sentence: "The pharmacy dispenses medication.",
            connection_note: "Cấp phát thuốc.",
          },
        ],
      },
    };

    const clean = sanitizeVocabularyTerm(dirtyTerm);
    expect(clean.pronunciation).toBe("/dɪˈspɛnsɪŋ/");
    expect(clean.meaning_en).toBe('distributing "advice"');
    expect(clean.meaning_vi).toBe("chia sẻ");
    expect(clean.humanized?.simple_intuition).toBe("dispense là đưa ra từ nguồn có sẵn.");
  });
});
