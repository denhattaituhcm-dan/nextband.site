import { describe, it, expect } from "vitest";
import { canonicalScoringService } from "../services/scoring/CanonicalScoringService.js";
import { getEvaluatorForType } from "../services/scoring/evaluators/index.js";
import { defaultTextNormalizer } from "../services/scoring/TextNormalizer.js";
import { ScoreAggregator } from "../services/scoring/ScoreAggregator.js";

describe("GATE G4: ASSESSMENT SCORING & SEMANTIC GRADING INTEGRITY", () => {
  describe("Invariant 1 & 2: Holistic and Manual Items Produce Semantic Nulls, Never False Zeros", () => {
    it("Evaluates Holistic Writing Item without False Zero or False Incorrect", () => {
      const evaluator = getEvaluatorForType("essay");
      const question = {
        id: "q-writing-1",
        questionType: "essay",
        questionText: "Write an essay about renewable energy.",
        points: 9,
        assessmentMode: "HOLISTIC" as const,
        scoreScope: "HOLISTIC" as const,
        sectionType: "writing",
      };
      const studentAnswer = {
        questionId: "q-writing-1",
        answerText: "In contemporary society, renewable energy plays a pivotal role...",
      };

      const result = evaluator.evaluate(question, studentAnswer, defaultTextNormalizer);

      expect(result.assessmentMode).toBe("HOLISTIC");
      expect(result.scoreScope).toBe("HOLISTIC");
      expect(result.score).toBeNull(); // MUST be null, not 0
      expect(result.isCorrect).toBeNull(); // MUST be null, not false
      expect(result.maxScore).toBeNull(); // Holistic items do not own a standalone denominator
      expect(result.isManual).toBe(true);
      expect(result.details?.[0].score).toBeNull();
      expect(result.details?.[0].isCorrect).toBeNull();
    });

    it("Evaluates Manual Item (Speaking) as Pending Null prior to Teacher Evaluation", () => {
      const evaluator = getEvaluatorForType("ielts_speaking_part1");
      const question = {
        id: "q-speaking-1",
        questionType: "ielts_speaking_part1",
        questionText: "Tell me about your hometown.",
        points: 3,
        assessmentMode: "MANUAL_ITEM" as const,
        scoreScope: "ITEM" as const,
        sectionType: "speaking",
      };
      const studentAnswer = {
        questionId: "q-speaking-1",
        audioUrl: "/uploads/speaking_attempt1.mp3",
      };

      const result = evaluator.evaluate(question, studentAnswer, defaultTextNormalizer);

      expect(result.assessmentMode).toBe("MANUAL_ITEM");
      expect(result.scoreScope).toBe("ITEM");
      expect(result.score).toBeNull(); // Pending teacher grading
      expect(result.isCorrect).toBeNull(); // Subjective item has no boolean correctness
      expect(result.maxScore).toBe(3);
      expect(result.isManual).toBe(true);
    });

    it("Evaluates Objective Items strictly with Boolean Correctness and Exact Points", () => {
      const evaluator = getEvaluatorForType("multiple_choice");
      const question = {
        id: "q-mcq-1",
        questionType: "multiple_choice",
        correctAnswer: "B",
        points: 1,
        options: ["A", "B", "C", "D"],
      };

      // Correct attempt
      const correctRes = evaluator.evaluate(
        question,
        { questionId: "q-mcq-1", answerText: "B" },
        defaultTextNormalizer
      );
      expect(correctRes.assessmentMode).toBe("OBJECTIVE");
      expect(correctRes.scoreScope).toBe("ITEM");
      expect(correctRes.isCorrect).toBe(true);
      expect(correctRes.score).toBe(1);

      // Incorrect attempt
      const incorrectRes = evaluator.evaluate(
        question,
        { questionId: "q-mcq-1", answerText: "A" },
        defaultTextNormalizer
      );
      expect(incorrectRes.assessmentMode).toBe("OBJECTIVE");
      expect(incorrectRes.scoreScope).toBe("ITEM");
      expect(incorrectRes.isCorrect).toBe(false);
      expect(incorrectRes.score).toBe(0);
    });
  });

  describe("Score Aggregator: Decoupled Holistic and Objective Aggregation", () => {
    it("Does not coerce Holistic / Pending manual nulls to zero in objective total score", () => {
      const aggregator = new ScoreAggregator();

      const evaluations = [
        {
          questionId: "q-reading-1",
          questionType: "multiple_choice",
          isManual: false,
          assessmentMode: "OBJECTIVE" as const,
          scoreScope: "ITEM" as const,
          isCorrect: true,
          score: 1,
          maxScore: 1,
          correctCount: 1,
          itemCount: 1,
        },
        {
          questionId: "q-reading-2",
          questionType: "multiple_choice",
          isManual: false,
          assessmentMode: "OBJECTIVE" as const,
          scoreScope: "ITEM" as const,
          isCorrect: false,
          score: 0,
          maxScore: 1,
          correctCount: 0,
          itemCount: 1,
        },
        {
          questionId: "q-writing-1",
          questionType: "essay",
          isManual: true,
          assessmentMode: "HOLISTIC" as const,
          scoreScope: "HOLISTIC" as const,
          isCorrect: null,
          score: null,
          maxScore: null,
          correctCount: 0,
          itemCount: 1,
        },
      ];

      const summary = aggregator.aggregate(evaluations);

      expect(summary.status).toBe("SUBMITTED"); // Requires teacher grading
      expect(summary.hasManualQuestions).toBe(true);
      expect(summary.totalScore).toBe(1); // Only counts auto objective score (1/2)
      expect(summary.correctAnswers).toBe(1);
      expect(summary.totalQuestions).toBe(3);
    });
  });

  describe("Canonical Scoring Service: Full Attempt Resolving", () => {
    it("Correctly resolves mixed section exam attempt and marks status as SUBMITTED", () => {
      const examStructure = {
        sections: [
          {
            id: "sec-reading",
            sectionType: "reading",
            questionGroups: [
              {
                questions: [
                  {
                    id: "q-r1",
                    questionType: "true_false_not_given",
                    correctAnswer: "TRUE",
                    points: 1,
                  },
                ],
              },
            ],
          },
          {
            id: "sec-writing",
            sectionType: "writing",
            questionGroups: [
              {
                questions: [
                  {
                    id: "q-w1",
                    questionType: "essay",
                    questionText: "Writing task 2 prompt",
                    points: 9,
                  },
                ],
              },
            ],
          },
        ],
      };

      const studentAnswers = [
        { questionId: "q-r1", answerText: "TRUE" },
        { questionId: "q-w1", answerText: "This essay discusses..." },
      ];

      const summary = canonicalScoringService.evaluateExamAttempt(examStructure, studentAnswers);

      expect(summary.status).toBe("SUBMITTED");
      expect(summary.hasManualQuestions).toBe(true);

      const r1Eval = summary.evaluatedAnswers.find((e) => e.questionId === "q-r1");
      expect(r1Eval?.assessmentMode).toBe("OBJECTIVE");
      expect(r1Eval?.isCorrect).toBe(true);
      expect(r1Eval?.score).toBe(1);

      const w1Eval = summary.evaluatedAnswers.find((e) => e.questionId === "q-w1");
      expect(w1Eval?.assessmentMode).toBe("HOLISTIC");
      expect(w1Eval?.scoreScope).toBe("HOLISTIC");
      expect(w1Eval?.isCorrect).toBeNull();
      expect(w1Eval?.score).toBeNull();
    });
  });
});
