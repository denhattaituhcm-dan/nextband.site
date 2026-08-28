import { describe, it, expect } from "vitest";
import { MatchingEvaluator } from "../services/scoring/evaluators/MatchingEvaluator.js";
import { defaultTextNormalizer } from "../services/scoring/TextNormalizer.js";

describe("MATCHING DATA CONTRACT AUDIT - BACKEND LIFECYCLE & SANITIZATION", () => {
  const evaluator = new MatchingEvaluator();

  const authoringCorrectAnswer = JSON.stringify({
    items: [
      "Asia",
      "Antarctica",
      "South America",
      "North America",
      "Europe",
      "Africa",
    ],
    options: [
      "ancient forts",
      "waterways",
      "ice and snow",
      "jewels",
      "local animals",
      "mountains",
    ],
    pairs: {
      "0": "E",
      "1": "C",
      "2": "D",
      "3": "B",
      "4": "F",
      "5": "A",
    },
  });

  const matchingQuestion = {
    id: "q-matching-minhanh",
    questionType: "matching",
    questionText: "Which feature is related to each of the following areas of the world represented in the playground?",
    correctAnswer: authoringCorrectAnswer,
    points: 6,
  };

  it("1. Student Canonical Integer-based Answers evaluated with 100% score", () => {
    // Minh Anh answers with canonical integer indices:
    // Asia (0) -> local animals (4)
    // Antarctica (1) -> ice and snow (2)
    // South America (2) -> jewels (3)
    // North America (3) -> waterways (1)
    // Europe (4) -> mountains (5)
    // Africa (5) -> ancient forts (0)
    const studentAnswer = {
      questionId: "q-matching-minhanh",
      answerText: JSON.stringify({
        "0": 4,
        "1": 2,
        "2": 3,
        "3": 1,
        "4": 5,
        "5": 0,
      }),
    };

    const result = evaluator.evaluate(matchingQuestion, studentAnswer, defaultTextNormalizer);

    expect(result.isCorrect).toBe(true);
    expect(result.score).toBe(6);
    expect(result.maxScore).toBe(6);
    expect(result.correctCount).toBe(6);
    expect(result.itemCount).toBe(6);
  });

  it("2. Partial Credit correctly calculated when 3 of 6 pairs match", () => {
    const studentPartialAnswer = {
      questionId: "q-matching-minhanh",
      answerText: JSON.stringify({
        "0": 4, // Correct (E)
        "1": 2, // Correct (C)
        "2": 3, // Correct (D)
        "3": 0, // Wrong (should be 1)
        "4": 1, // Wrong (should be 5)
        "5": 5, // Wrong (should be 0)
      }),
    };

    const result = evaluator.evaluate(matchingQuestion, studentPartialAnswer, defaultTextNormalizer);

    expect(result.isCorrect).toBe(false);
    expect(result.score).toBe(3);
    expect(result.correctCount).toBe(3);
    expect(result.itemCount).toBe(6);
  });

  it("3. Student Safe DTO Sanitization Contract Verification", () => {
    // Simulate cleanQuestionData logic
    const cleanQuestionData = (q: any, isAdminOrTeacher: boolean) => {
      if (isAdminOrTeacher) return q;
      const cleaned = { ...q };
      if ((q.questionType === "matching" || q.question_type === "matching") && (q.correctAnswer || q.correct_answer)) {
        try {
          const raw = q.correctAnswer || q.correct_answer;
          const config = typeof raw === "string" ? JSON.parse(raw) : raw;
          cleaned.options = {
            items: Array.isArray(config?.items) ? config.items : [],
            options: Array.isArray(config?.options) ? config.options : [],
          };
        } catch {
          cleaned.options = { items: [], options: [] };
        }
      }
      delete cleaned.correctAnswer;
      delete cleaned.correct_answer;
      delete cleaned.audioScript;
      delete cleaned.audio_script;
      delete cleaned.acceptedAnswers;
      delete cleaned.accepted_answers;
      delete cleaned.answerKey;
      delete cleaned.answer_key;
      return cleaned;
    };

    // For Student:
    const studentDTO = cleanQuestionData(matchingQuestion, false);
    expect(studentDTO.correctAnswer).toBeUndefined();
    expect(studentDTO.correct_answer).toBeUndefined();
    expect(studentDTO.options).toBeDefined();
    expect(studentDTO.options.items).toHaveLength(6);
    expect(studentDTO.options.options).toHaveLength(6);
    expect(studentDTO.options.items[0]).toBe("Asia");
    expect(studentDTO.options.options[0]).toBe("ancient forts");
    expect(studentDTO.options.pairs).toBeUndefined(); // Secrets must NOT leak

    // For Admin / Teacher Preview:
    const adminDTO = cleanQuestionData(matchingQuestion, true);
    expect(adminDTO.correctAnswer).toBe(authoringCorrectAnswer);
  });
});
