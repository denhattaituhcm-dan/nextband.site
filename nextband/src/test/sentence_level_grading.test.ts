import { describe, it, expect } from "vitest";
import {
  segmentEssayIntoSentences,
  segmentEssayIntoParagraphs,
  parseStructuredFeedback,
  serializeStructuredFeedback,
  PRESET_ERROR_TAGS,
  SentenceFeedbackItem,
} from "@/lib/sentenceFeedback";
import { diffWords, diffSentences } from "diff";

describe("🎯 Sentence-Level Grading & Feedback Serialization Test Suite", () => {
  const sampleEssay = `Education is a cornerstone of modern society. However, many students struggle with academic pressure! Do schools provide enough support? In conclusion, balanced education is essential.`;

  it("1.1 should accurately segment essay text into distinct sentences", () => {
    const sentences = segmentEssayIntoSentences(sampleEssay);
    expect(sentences.length).toBe(4);
    expect(sentences[0]).toBe("Education is a cornerstone of modern society.");
    expect(sentences[1]).toBe("However, many students struggle with academic pressure!");
    expect(sentences[2]).toBe("Do schools provide enough support?");
    expect(sentences[3]).toBe("In conclusion, balanced education is essential.");
  });

  it("1.2 should handle single-line essays and edge case whitespace without crashing", () => {
    expect(segmentEssayIntoSentences("")).toEqual([]);
    expect(segmentEssayIntoSentences("   ")).toEqual([]);
    expect(segmentEssayIntoSentences("Single sentence without delimiter")).toEqual([
      "Single sentence without delimiter",
    ]);
  });

  it("1.3 should correctly serialize and parse structured sentence feedbacks", () => {
    const sentenceFeedbacks: SentenceFeedbackItem[] = [
      {
        sentenceIndex: 0,
        originalSentence: "Education is a cornerstone of modern society.",
        category: "GRAMMAR",
        tag: "Subject-Verb Agreement",
        note: "Check plural noun",
        suggestedSentence: "Education remains a cornerstone of modern society.",
      },
      {
        sentenceIndex: 1,
        originalSentence: "However, many students struggle with academic pressure!",
        category: "EXPRESSION",
        tag: "Word Choice / Collocation",
        note: "Avoid exclamation in academic writing",
      },
    ];

    const serialized = serializeStructuredFeedback({
      text: "Good essay overall, but needs revision.",
      primaryErrorCategory: "GRAMMAR",
      revisionRequired: true,
      criteriaScores: {
        taskResponse: 6.5,
        coherence: 6.0,
        lexical: 6.0,
        grammar: 5.5,
      },
      sentenceFeedbacks,
      tabSwitchCount: 2,
    });

    const parsed = parseStructuredFeedback(serialized);
    expect(parsed.text).toBe("Good essay overall, but needs revision.");
    expect(parsed.primaryErrorCategory).toBe("GRAMMAR");
    expect(parsed.revisionRequired).toBe(true);
    expect(parsed.criteriaScores?.taskResponse).toBe(6.5);
    expect(parsed.tabSwitchCount).toBe(2);
    expect(parsed.sentenceFeedbacks?.length).toBe(2);
    expect(parsed.sentenceFeedbacks?.[0].category).toBe("GRAMMAR");
    expect(parsed.sentenceFeedbacks?.[0].suggestedSentence).toBe(
      "Education remains a cornerstone of modern society."
    );
  });

  it("1.4 should gracefully parse raw string feedback (backward compatibility)", () => {
    const rawPlainString = "Bài viết tốt, chú ý từ vựng.";
    const parsed = parseStructuredFeedback(rawPlainString);
    expect(parsed.text).toBe("Bài viết tốt, chú ý từ vựng.");
    expect(parsed.sentenceFeedbacks).toEqual([]);
  });

  it("1.5 should contain verified preset tags for all 4 error categories", () => {
    expect(PRESET_ERROR_TAGS.GRAMMAR).toContain("Subject-Verb Agreement");
    expect(PRESET_ERROR_TAGS.EXPRESSION).toContain("Word Choice / Collocation");
    expect(PRESET_ERROR_TAGS.STRUCTURE).toContain("Missing Transition / Linking");
    expect(PRESET_ERROR_TAGS.CONCEPT).toContain("Idea Off-topic");
  });

  it("1.6 should correctly compute word diffs between Attempt 1 and Attempt 2", () => {
    const attempt1 = "The government should ban cars in cities.";
    const attempt2 = "The government ought to restrict private vehicles in urban areas.";

    const changes = diffWords(attempt1, attempt2);
    expect(changes.length).toBeGreaterThan(1);

    const hasAdded = changes.some((c) => c.added);
    const hasRemoved = changes.some((c) => c.removed);
    expect(hasAdded).toBe(true);
    expect(hasRemoved).toBe(true);
  });

  it("1.7 should calculate accurate skill overall band from 4 criteria with floor to nearest 0.5 rule", async () => {
    const { calculateSpeakingBand, calculateWritingBand } = await import("@/lib/sentenceFeedback");

    // Case 1: FC=5, LR=6, GRA=5, PR=6 -> avg=5.5 -> Band 5.5
    expect(
      calculateSpeakingBand({
        fluencyAndCoherence: 5,
        lexical: 6,
        grammar: 5,
        pronunciation: 6,
      })
    ).toBe("5.5");

    // Case 2: FC=5, LR=6, GRA=5, PR=5 -> avg=5.25 -> Band 5.0 (Floor to nearest 0.5: .25 -> .0)
    expect(
      calculateSpeakingBand({
        fluencyAndCoherence: 5,
        lexical: 6,
        grammar: 5,
        pronunciation: 5,
      })
    ).toBe("5.0");

    // Case 3: FC=6, LR=7, GRA=6, PR=6 -> avg=6.25 -> Band 6.0 (User screenshot case)
    expect(
      calculateSpeakingBand({
        fluencyAndCoherence: 6,
        lexical: 7,
        grammar: 6,
        pronunciation: 6,
      })
    ).toBe("6.0");

    // Case 4: TR=6, CC=6, LR=6, GRA=5 -> avg=5.75 -> Band 5.5 (Floor to nearest 0.5: .75 -> .5)
    expect(
      calculateWritingBand({
        taskResponse: 6,
        coherence: 6,
        lexical: 6,
        grammar: 5,
      })
    ).toBe("5.5");

    // Case 5: TR=7, CC=7, LR=7, GRA=6 -> avg=6.75 -> Band 6.5
    expect(
      calculateWritingBand({
        taskResponse: 7,
        coherence: 7,
        lexical: 7,
        grammar: 6,
      })
    ).toBe("6.5");

    // Case 6: TR=7, CC=7, LR=7, GRA=7 -> avg=7.0 -> Band 7.0
    expect(
      calculateWritingBand({
        taskResponse: 7,
        coherence: 7,
        lexical: 7,
        grammar: 7,
      })
    ).toBe("7.0");
  });

  it("1.8 should correctly preserve numbered list sentences on separate lines without isolating numbers", () => {
    const studentAnswer = `1. Playing video games can cause harm to childrens health.
2. My group will carry out a survey about reading habits of young people.
3. Parents should encourage children to play sports to maitain mental health.
4. Serious air polution in big city cause harm to people's heanth.`;

    const sentences = segmentEssayIntoSentences(studentAnswer);
    expect(sentences).toEqual([
      "1. Playing video games can cause harm to childrens health.",
      "2. My group will carry out a survey about reading habits of young people.",
      "3. Parents should encourage children to play sports to maitain mental health.",
      "4. Serious air polution in big city cause harm to people's heanth.",
    ]);

    const { paragraphs } = segmentEssayIntoParagraphs(studentAnswer);
    expect(paragraphs.length).toBe(4);
    expect(paragraphs[0][0].text).toBe("1. Playing video games can cause harm to childrens health.");
    expect(paragraphs[0][0].globalIndex).toBe(0);
    expect(paragraphs[1][0].text).toBe("2. My group will carry out a survey about reading habits of young people.");
    expect(paragraphs[1][0].globalIndex).toBe(1);
    expect(paragraphs[2][0].text).toBe("3. Parents should encourage children to play sports to maitain mental health.");
    expect(paragraphs[2][0].globalIndex).toBe(2);
    expect(paragraphs[3][0].text).toBe("4. Serious air polution in big city cause harm to people's heanth.");
    expect(paragraphs[3][0].globalIndex).toBe(3);
  });

  it("1.9 should not split on abbreviations or decimal numbers", () => {
    const textWithAbbr = "Dr. Smith met Mr. Brown at 3.50 pm. They discussed IELTS preparation.";
    const sentences = segmentEssayIntoSentences(textWithAbbr);
    expect(sentences.length).toBe(2);
    expect(sentences[0]).toBe("Dr. Smith met Mr. Brown at 3.50 pm.");
    expect(sentences[1]).toBe("They discussed IELTS preparation.");
  });
});
