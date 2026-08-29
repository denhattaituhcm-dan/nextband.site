import { describe, it, expect } from "vitest";
import { aggregateWritingEvidence } from "../../nextband/src/lib/writingEvidenceAggregator.js";
import {
  aggregateObjectiveBattleDebrief,
  isQuestionAnswerCorrect,
} from "../../nextband/src/lib/objectiveEvidenceAggregator.js";

describe("Writing & Objective Learning Evidence Aggregators", () => {
  describe("Writing Evidence Aggregator", () => {
    it("should aggregate sentence-level feedback across multiple submissions", () => {
      const mockSubmissions = [
        {
          id: "sub-1",
          status: "GRADED",
          submittedAt: "2026-08-01T08:00:00Z",
          answers: [
            {
              id: "ans-1",
              sentenceFeedbacks: [
                {
                  sentenceIndex: 0,
                  sentence: "He go to school every day.",
                  category: "GRAMMAR",
                  tag: "Subject-Verb Agreement",
                  note: "Phải dùng goes",
                },
                {
                  sentenceIndex: 1,
                  sentence: "The pollution is severe.",
                  category: "PRAISE",
                  tag: "Good Vocabulary / Collocation",
                  note: "Dùng từ chính xác",
                },
              ],
            },
          ],
        },
        {
          id: "sub-2",
          status: "GRADED",
          submittedAt: "2026-08-05T08:00:00Z",
          answers: [
            {
              id: "ans-2",
              sentenceFeedbacks: [
                {
                  sentenceIndex: 0,
                  sentence: "She go to market.",
                  category: "GRAMMAR",
                  tag: "Subject-Verb Agreement",
                  note: "Phải dùng goes",
                },
              ],
            },
          ],
        },
        {
          id: "sub-3",
          status: "GRADED",
          submittedAt: "2026-08-10T08:00:00Z",
          answers: [
            {
              id: "ans-3",
              sentenceFeedbacks: [
                {
                  sentenceIndex: 0,
                  sentence: "They arrived on time.",
                  category: "PRAISE",
                  tag: "Good Vocabulary / Collocation",
                  note: "Câu chuẩn",
                },
              ],
            },
          ],
        },
      ];

      const profile = aggregateWritingEvidence(mockSubmissions);

      expect(profile.totalGradedSubmissions).toBe(3);
      expect(profile.totalSentencesReviewed).toBe(4);
      expect(profile.totalErrorsFound).toBe(2);
      expect(profile.totalPraisePoints).toBe(2);

      // Top grammar issue should be Subject-Verb Agreement
      expect(profile.topGrammarIssues).toHaveLength(1);
      expect(profile.topGrammarIssues[0].tag).toBe("Subject-Verb Agreement");
      expect(profile.topGrammarIssues[0].count).toBe(2);
      expect(profile.topGrammarIssues[0].labelVi).toBe("Hòa hợp Chủ ngữ - Động từ");

      // Recovery Detection: Subject-Verb Agreement was in early (sub 1, 2) but dropped in recent (sub 3)
      expect(profile.recoveringErrors.length).toBeGreaterThan(0);
      expect(profile.recoveringErrors[0].tag).toBe("Subject-Verb Agreement");
      expect(profile.recoveringErrors[0].status).toBe("RECOVERED");
      expect(profile.recoveringErrors[0].reductionPercentage).toBe(100);
    });
  });

  describe("Objective Question-Type Evidence Aggregator", () => {
    it("should correctly evaluate answer correctness with multiple alternatives", () => {
      expect(isQuestionAnswerCorrect(1, "true", "TRUE")).toBe(true);
      expect(isQuestionAnswerCorrect(null, "center", "center | centre")).toBe(true);
      expect(isQuestionAnswerCorrect(null, "centre", "center | centre")).toBe(true);
      expect(isQuestionAnswerCorrect(null, "wrong", "center | centre")).toBe(false);
    });

    it("should aggregate questions by questionType and rank critical weaknesses", () => {
      const mockQuestions = [
        { id: "q1", questionType: "true_false_not_given", questionText: "Q1", correctAnswer: "TRUE" },
        { id: "q2", questionType: "true_false_not_given", questionText: "Q2", correctAnswer: "FALSE" },
        { id: "q3", questionType: "matching_headings", questionText: "Q3", correctAnswer: "Section A" },
        { id: "q4", questionType: "multiple_choice", questionText: "Q4", correctAnswer: "A" },
      ];

      const mockAnswersMap = {
        q1: { answerText: "FALSE", score: 0 }, // wrong TFNG
        q2: { answerText: "FALSE", score: 1 }, // correct TFNG
        q3: { answerText: "Section B", score: 0 }, // wrong Heading (0/1 = 0%)
        q4: { answerText: "A", score: 1 }, // correct MC (1/1 = 100%)
      };

      const debrief = aggregateObjectiveBattleDebrief(mockQuestions, mockAnswersMap);

      expect(debrief.totalQuestions).toBe(4);
      expect(debrief.totalCorrect).toBe(2);
      expect(debrief.overallAccuracyPercent).toBe(50);

      // 3 Question types found
      expect(debrief.typeStats).toHaveLength(3);

      // Weakest type should be matching_headings (0%)
      expect(debrief.weakestType?.questionType).toBe("matching_headings");
      expect(debrief.weakestType?.accuracyPercent).toBe(0);

      // Strengths should include multiple_choice (100%)
      expect(debrief.strengths.map((s) => s.questionType)).toContain("multiple_choice");
    });

    it("should detect deterministic fill-in-the-blank errors (Word Limit Breach & Spelling)", () => {
      const mockQuestions = [
        {
          id: "q-fill-1",
          questionType: "fill_blank",
          questionText: "Complete with NO MORE THAN 2 WORDS:",
          correctAnswer: "bus station",
        },
        {
          id: "q-fill-2",
          questionType: "fill_blank",
          questionText: "Enter the facility name:",
          correctAnswer: "accommodation",
        },
      ];

      const mockAnswersMap = {
        // 3 words written for 2-word limit
        "q-fill-1": { answerText: "at the bus station", score: 0 },
        // Typo: distance 1 from accommodation
        "q-fill-2": { answerText: "accomodation", score: 0 },
      };

      const debrief = aggregateObjectiveBattleDebrief(mockQuestions, mockAnswersMap);

      expect(debrief.deterministicErrors).toHaveLength(2);

      const wordLimitErr = debrief.deterministicErrors.find((e) => e.errorType === "WORD_LIMIT_BREACH");
      expect(wordLimitErr).toBeDefined();
      expect(wordLimitErr?.studentAnswer).toBe("at the bus station");

      const spellingErr = debrief.deterministicErrors.find((e) => e.errorType === "SPELLING_ERROR");
      expect(spellingErr).toBeDefined();
      expect(spellingErr?.studentAnswer).toBe("accomodation");
      expect(spellingErr?.correctAnswer).toBe("accommodation");
    });
  });
});
