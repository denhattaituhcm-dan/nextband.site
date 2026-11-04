export type AssessmentMode = "OBJECTIVE" | "MANUAL_ITEM" | "HOLISTIC";
export type ScoreScope = "ITEM" | "HOLISTIC";

export interface ScoringQuestion {
  id: string;
  questionType: string;
  questionText?: string | null;
  options?: unknown;
  correctAnswer?: string | null;
  points?: number | null;
  orderIndex?: number;
  selectionMode?: "single" | "multiple";
  maxSelections?: number;
  isMultiChoice?: boolean | null;
  is_multi_choice?: boolean | null;
  assessmentMode?: AssessmentMode;
  scoreScope?: ScoreScope;
  holisticParentId?: string | null;
  sectionType?: string | null;
}

export interface ScoringQuestionInput {
  id: string;
  questionType?: string | null;
  question_type?: string | null;
  questionText?: string | null;
  question_text?: string | null;
  options?: unknown;
  correctAnswer?: string | null;
  correct_answer?: string | null;
  points?: number | string | null;
  orderIndex?: number | null;
  order_index?: number | null;
  selectionMode?: "single" | "multiple" | string | null;
  maxSelections?: number | null;
  isMultiChoice?: boolean | null;
  is_multi_choice?: boolean | null;
  assessmentMode?: AssessmentMode | string | null;
  scoreScope?: ScoreScope | string | null;
  holisticParentId?: string | null;
  sectionType?: string | null;
  [key: string]: unknown;
}

export interface ScoringQuestionGroupInput {
  id?: string | null;
  questions?: ReadonlyArray<ScoringQuestionInput> | null;
  [key: string]: unknown;
}

export interface ScoringSectionInput {
  id?: string | null;
  title?: string | null;
  sectionType?: string | null;
  section_type?: string | null;
  questionGroups?: ReadonlyArray<ScoringQuestionGroupInput> | null;
  [key: string]: unknown;
}

export interface ExamStructureInput {
  id?: string | null;
  sections?: ReadonlyArray<ScoringSectionInput> | null;
  [key: string]: unknown;
}

export interface StudentRawAnswer {
  questionId: string;
  answerText?: unknown;
  audioUrl?: string | null;
}

export interface ItemEvaluationDetail {
  key: string;
  studentValue: unknown;
  correctValue: unknown;
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
  parseJsonSafe<T = unknown>(val: unknown, fallback?: unknown): T;
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
