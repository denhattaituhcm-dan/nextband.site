import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";
import { canonicalScoringService } from "../src/services/scoring/CanonicalScoringService.js";
import { getEvaluatorForType } from "../src/services/scoring/evaluators/index.js";
import { defaultTextNormalizer } from "../src/services/scoring/TextNormalizer.js";

const fixturesPath = join(__dirname, "fixtures", "golden_scoring_fixtures.json");
const fixtures: any[] = JSON.parse(readFileSync(fixturesPath, "utf-8"));

describe("GATE G2-1 & G2-3: CANONICAL SCORING ENGINE SPECIFICATION & GOLDEN FIXTURES", () => {
  it("Loaded all golden test fixtures", () => {
    expect(fixtures.length).toBeGreaterThanOrEqual(25);
  });

  describe("1. Individual Evaluator Verification Against Golden Fixtures", () => {
    for (const fixture of fixtures) {
      it(`[${fixture.id}] ${fixture.name}`, () => {
        const evaluator = getEvaluatorForType(fixture.question.questionType);
        const result = evaluator.evaluate(
          fixture.question,
          fixture.studentAnswer,
          defaultTextNormalizer,
        );

        expect(result.score).toBe(fixture.expected.score);
        expect(result.maxScore).toBe(fixture.expected.maxScore);
        expect(result.correctCount).toBe(fixture.expected.correctCount);
        expect(result.itemCount).toBe(fixture.expected.itemCount);
        expect(result.isCorrect).toBe(fixture.expected.isCorrect);

        if (fixture.expected.isManual !== undefined) {
          expect(result.isManual).toBe(fixture.expected.isManual);
        }
      });
    }
  });

  describe("2. Regression Assertions: Critical Denominator & Penalty Bugs", () => {
    it("CRITICAL BUG REGRESSION: 3-blank fill-in-blank question MUST result in itemCount = 3 (NEVER 5)", () => {
      const fix = fixtures.find((f) => f.id === "FILL-007");
      expect(fix).toBeDefined();

      const evaluator = getEvaluatorForType(fix.question.questionType);
      const res = evaluator.evaluate(fix.question, fix.studentAnswer, defaultTextNormalizer);

      expect(res.itemCount).toBe(3);
      expect(res.maxScore).toBe(3);
      expect(res.correctCount).toBe(3);
      expect(res.score).toBe(3);
    });

    it("MULTI-SELECT CHOICE: Partial credit 1 of 2 correct gets 1 point with NO negative penalty", () => {
      const fix = fixtures.find((f) => f.id === "MCQ-M-002");
      expect(fix).toBeDefined();

      const evaluator = getEvaluatorForType(fix.question.questionType);
      const res = evaluator.evaluate(fix.question, fix.studentAnswer, defaultTextNormalizer);

      expect(res.itemCount).toBe(2);
      expect(res.maxScore).toBe(2);
      expect(res.correctCount).toBe(1);
      expect(res.score).toBe(1);
      expect(res.isCorrect).toBe(false);
    });
  });

  describe("3. Holistic Exam Attempt Evaluation (CanonicalScoringService)", () => {
    it("Evaluates a full mixed-format exam attempt accurately", () => {
      const fix1 = fixtures.find((f) => f.id === "MCQ-S-001")!;
      const fix2 = fixtures.find((f) => f.id === "MCQ-M-001")!;
      const fix3 = fixtures.find((f) => f.id === "FILL-007")!;

      const examStructure = {
        sections: [
          {
            id: "sec-1",
            title: "Listening & Reading",
            questionGroups: [
              {
                id: "grp-1",
                questions: [
                  fix1.question, // MCQ-S-001 (1 pt)
                  fix2.question, // MCQ-M-001 (2 pts, 2 items)
                  fix3.question, // FILL-007 (3 pts, 3 items)
                ],
              },
            ],
          },
        ],
      };

      const studentAnswers = [
        fix1.studentAnswer,
        fix2.studentAnswer,
        fix3.studentAnswer,
      ];

      const summary = canonicalScoringService.evaluateExamAttempt(examStructure, studentAnswers);

      expect(summary.status).toBe("GRADED");
      expect(summary.totalScore).toBe(6); // 1 + 2 + 3 = 6
      expect(summary.maxScore).toBe(6);
      expect(summary.correctAnswers).toBe(6); // 1 (single) + 2 (multi) + 3 (blanks) = 6
      expect(summary.totalQuestions).toBe(6); // 1 + 2 + 3 = 6
      expect(summary.hasManualQuestions).toBe(false);
      expect(summary.percentage).toBe(100);
    });

    it("Marks exam attempt as SUBMITTED when containing subjective questions (Writing)", () => {
      const fix1 = fixtures.find((f) => f.id === "MCQ-S-001")!;
      const fixManual = fixtures.find((f) => f.id === "MAN-002")!;

      const examStructure = {
        sections: [
          {
            id: "sec-1",
            questionGroups: [
              {
                id: "grp-1",
                questions: [
                  fix1.question, // MCQ-S-001 (1 pt)
                  fixManual.question, // MAN-002 (Writing Task 2, 6 pts)
                ],
              },
            ],
          },
        ],
      };

      const studentAnswers = [
        fix1.studentAnswer,
        fixManual.studentAnswer,
      ];

      const summary = canonicalScoringService.evaluateExamAttempt(examStructure, studentAnswers);

      expect(summary.status).toBe("SUBMITTED");
      expect(summary.hasManualQuestions).toBe(true);
      expect(summary.totalScore).toBe(1); // Only auto-graded objective part scored
      expect(summary.correctAnswers).toBe(1);
    });
  });
});
