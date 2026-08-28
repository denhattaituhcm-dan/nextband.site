export type AssessmentMode = "OBJECTIVE" | "MANUAL_ITEM" | "HOLISTIC";
export type ScoreScope = "ITEM" | "HOLISTIC";

export interface ScoringQuestion {
  id: string;
  questionType: string;
  questionText?: string | null;
  options?: any;
  correctAnswer?: string | null;
  points?: number | null;
  orderIndex?: number;
  selectionMode?: "single" | "multiple";
  maxSelections?: number;
  assessmentMode?: AssessmentMode;
  scoreScope?: ScoreScope;
  holisticParentId?: string | null;
  sectionType?: string | null;
}

export interface StudentRawAnswer {
  questionId: string;
  answerText?: any;
  audioUrl?: string | null;
}

export interface ItemEvaluationDetail {
  key: string;
  studentValue: any;
  correctValue: any;
  isCorrect: boolean | null;
  score: number | null;
}

export interface QuestionEvaluationResult {
  questionId: string;
  questionType: string;
  isManual: boolean;
  assessmentMode: AssessmentMode;
  scoreScope: ScoreScope;
  holisticParentId?: string | null;
  isCorrect: boolean | null;
  score: number | null;
  maxScore: number | null;
  correctCount: number;
  itemCount: number;
  details?: ItemEvaluationDetail[];
}

export interface SubmissionGradingSummary {
  totalScore: number;
  maxScore: number;
  correctAnswers: number;
  totalQuestions: number;
  hasManualQuestions: boolean;
  status: "GRADED" | "SUBMITTED";
  percentage: number;
  bandScore?: number;
  evaluatedAnswers: QuestionEvaluationResult[];
}

export interface ITextNormalizer {
  normalizeText(raw: unknown): string;
  normalizeAlternatives(raw: unknown): string[];
  normalizeOptionIndex(val: unknown): number | null;
  parseJsonSafe<T = any>(val: unknown, fallback?: T): T;
  areEquivalent(studentText: unknown, correctText: unknown): boolean;
}

export interface IQuestionEvaluator {
  supportedTypes: string[];
  canEvaluate(questionType: string): boolean;
  evaluate(
    question: ScoringQuestion,
    studentAnswer: StudentRawAnswer | undefined,
    normalizer: ITextNormalizer,
  ): QuestionEvaluationResult;
}
