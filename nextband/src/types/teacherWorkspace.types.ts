import type { ExamSkillType } from "@/lib/examSkillHelper";
import type { SentenceFeedbackItem } from "@/lib/sentenceFeedback";

/**
 * Shared Workbook types for Teacher Workspace.
 * Extracted to break circular dependencies between TeacherWorkspace page and TeacherWorkbookColumn component.
 */
export interface WorkbookItem {
  id: string;
  submissionId?: string;
  answerId?: string;
  lessonNumber: number;
  lessonTitle: string;
  orderIndex: number;
  title: string;
  type: string;
  skill?: ExamSkillType;
  isAutoGraded?: boolean;
  dueDate?: string;
  status: "unsubmitted" | "in_progress" | "submitted" | "graded" | "needs_revision";
  isOverdue: boolean;
  submissionTiming?: {
    isLate: boolean;
    lateDays: number;
  };
  score?: number;
  feedback?: string;
  primaryErrorCategory?: "CONCEPT" | "STRUCTURE" | "EXPRESSION" | "GRAMMAR" | null;
  revisionRequired?: boolean;
  sentenceFeedbacks?: SentenceFeedbackItem[];
  submittedAt?: string;
  answerText?: string;
  audioUrl?: string;
  objectiveScore?: number;
  bandScore?: number;
  criteriaScores?: any;
  answers: Array<{
    id?: string;
    questionId: string;
    questionTitle?: string;
    questionText?: string;
    answerText?: string;
    audioUrl?: string;
    score?: number | null;
    feedback?: string | null;
  }>;
}
