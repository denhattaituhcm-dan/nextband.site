import {
  IQuestionEvaluator,
  ItemEvaluationDetail,
  ITextNormalizer,
  QuestionEvaluationResult,
  ScoringQuestion,
  StudentRawAnswer,
} from "../types.js";

type MatchingPairsMap = Record<string, unknown>;

function isPairsRecord(value: unknown): value is MatchingPairsMap {
  return typeof value === "object" && value !== null;
}

function extractPairsMap(value: unknown): MatchingPairsMap {
  if (!isPairsRecord(value)) {
    return {};
  }
  if (isPairsRecord(value.pairs)) {
    return value.pairs;
  }
  return value;
}

export class MatchingEvaluator implements IQuestionEvaluator {
  public supportedTypes = [
    "matching",
    "matrix_matching",
    "pair_matching",
    "matching_features",
    "matching_headings",
  ];

  public canEvaluate(questionType: string): boolean {
    return this.supportedTypes.includes(questionType?.toLowerCase());
  }

  public evaluate(
    question: ScoringQuestion,
    studentAnswer: StudentRawAnswer | undefined,
    normalizer: ITextNormalizer,
  ): QuestionEvaluationResult {
    const rawCorrect = (question.correctAnswer || "").trim();
    const rawStudent = studentAnswer?.answerText;
    const defaultPoints = question.points && question.points > 0 ? question.points : 1;

    const parsedCorrect = normalizer.parseJsonSafe(rawCorrect, null);
    const targetPairs: MatchingPairsMap = extractPairsMap(parsedCorrect);

    const pairKeys = Object.keys(targetPairs);
    const pairsCount = pairKeys.length;

    // Fallback if not JSON
    if (pairsCount === 0) {
      const isMatch = normalizer.areEquivalent(rawStudent, rawCorrect);
      return {
        questionId: question.id,
        questionType: question.questionType,
        isManual: false,
        assessmentMode: "OBJECTIVE",
        scoreScope: "ITEM",
        isCorrect: isMatch,
        score: isMatch ? defaultPoints : 0,
        maxScore: defaultPoints,
        correctCount: isMatch ? 1 : 0,
        itemCount: 1,
      };
    }

    // Parse student pairs
    let studentPairs: MatchingPairsMap = {};
    if (isPairsRecord(rawStudent)) {
      studentPairs = extractPairsMap(rawStudent);
    } else if (typeof rawStudent === "string" && rawStudent.trim()) {
      const parsed = normalizer.parseJsonSafe(rawStudent, {});
      studentPairs = extractPairsMap(parsed);
    }

    const maxScore = defaultPoints >= pairsCount ? defaultPoints : pairsCount;
    const pointPerPair = maxScore / pairsCount;

    let correctPairs = 0;
    const details: ItemEvaluationDetail[] = [];

    for (const key of pairKeys) {
      const expectedVal = targetPairs[key];
      const actualVal = studentPairs[key];

      let isPairMatch = false;

      const expectedIdx = normalizer.normalizeOptionIndex(expectedVal);
      const actualIdx = normalizer.normalizeOptionIndex(actualVal);

      if (expectedIdx !== null && actualIdx !== null) {
        isPairMatch = expectedIdx === actualIdx;
      } else {
        isPairMatch = normalizer.areEquivalent(actualVal, expectedVal);
      }

      if (isPairMatch) {
        correctPairs++;
      }

      details.push({
        key,
        studentValue: actualVal,
        correctValue: expectedVal,
        isCorrect: isPairMatch,
        score: isPairMatch ? pointPerPair : 0,
      });
    }

    const finalScore = correctPairs * pointPerPair;

    return {
      questionId: question.id,
      questionType: question.questionType,
      isManual: false,
      assessmentMode: "OBJECTIVE",
      scoreScope: "ITEM",
      isCorrect: correctPairs === pairsCount,
      score: finalScore,
      maxScore,
      correctCount: correctPairs,
      itemCount: pairsCount,
      details,
    };
  }
}
