import {
  IQuestionEvaluator,
  ITextNormalizer,
  QuestionEvaluationResult,
  ScoringQuestion,
  StudentRawAnswer,
} from "../types.js";

export class ManualEvaluator implements IQuestionEvaluator {
  public supportedTypes = [
    "essay",
    "writing",
    "speaking",
    "ielts_writing_task1",
    "ielts_writing_task2",
    "ielts_speaking_part1",
    "ielts_speaking_part2",
    "ielts_speaking_part3",
    "manual_grade",
    "open_question",
  ];

  public canEvaluate(questionType: string): boolean {
    return this.supportedTypes.includes(questionType?.toLowerCase());
  }

  public evaluate(
    question: ScoringQuestion,
    studentAnswer: StudentRawAnswer | undefined,
    _normalizer: ITextNormalizer,
  ): QuestionEvaluationResult {
    const isHolistic =
      question.assessmentMode === "HOLISTIC" ||
      question.scoreScope === "HOLISTIC" ||
      question.sectionType === "writing" ||
      question.questionType === "essay" ||
      question.questionType === "ielts_writing_task1" ||
      question.questionType === "ielts_writing_task2" ||
      question.questionType === "writing";

    const assessmentMode = question.assessmentMode || (isHolistic ? "HOLISTIC" : "MANUAL_ITEM");
    const scoreScope = question.scoreScope || (isHolistic ? "HOLISTIC" : "ITEM");
    const maxScore = isHolistic ? null : (question.points && question.points > 0 ? question.points : 1);

    return {
      questionId: question.id,
      questionType: question.questionType,
      isManual: true,
      assessmentMode,
      scoreScope,
      holisticParentId: question.holisticParentId || null,
      isCorrect: null, // INVARIANT #2: isCorrect is strictly null for subjective items
      score: null,     // INVARIANT #1: score is null until authoritatively awarded by teacher
      maxScore,
      correctCount: 0,
      itemCount: 1,
      details: [
        {
          key: "manual",
          studentValue: studentAnswer?.answerText || studentAnswer?.audioUrl || null,
          correctValue: null,
          isCorrect: null,
          score: null,
        },
      ],
    };
  }
}
