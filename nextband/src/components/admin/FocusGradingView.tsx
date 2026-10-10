import { SpeakingGrader } from "@/components/grading/SpeakingGrader";
import { WritingGrader } from "@/components/grading/WritingGrader";
import type { CriteriaScores, SentenceFeedbackItem } from "@/lib/sentenceFeedback";
import type { ExamSkillType } from "@/lib/examSkillHelper";

export interface FocusGradingGradePayload {
  grades: Array<{
    answerId?: string;
    questionId: string;
    score: number;
    feedback?: string;
    criteriaScores?: CriteriaScores;
    sentenceFeedbacks?: SentenceFeedbackItem[];
    primaryErrorCategory?: any;
    revisionRequired?: boolean;
  }>;
  totalScore?: number;
  options: {
    feedback?: string;
    primaryErrorCategory?: any;
    revisionRequired?: boolean;
    criteriaScores?: CriteriaScores | null;
    sentenceFeedbacks?: SentenceFeedbackItem[];
    finalize: boolean;
  };
}

export interface FocusGradingStudent {
  id: string;
  fullName: string;
}

export interface FocusGradingHomework {
  id: string;
  submissionId?: string;
  title: string;
  status: string;
  submittedAt?: string;
  skill?: ExamSkillType;
  isAutoGraded?: boolean;
}

export interface FocusGradingClass {
  name?: string;
}

export interface FocusGradingViewProps {
  currentStudent: FocusGradingStudent;
  currentHomework: FocusGradingHomework;
  currentClass: FocusGradingClass | null | undefined;
  resolvedAnswers: any[];
  currentSubmissionDetail: any;
  isSpeaking: boolean;
  isSubmitting: boolean;
  onBack: () => void;
  onGradeSubmit: (payload: FocusGradingGradePayload) => Promise<void>;
}

export function FocusGradingView({
  currentStudent,
  currentHomework,
  currentClass,
  resolvedAnswers,
  currentSubmissionDetail,
  isSpeaking,
  isSubmitting,
  onBack,
  onGradeSubmit,
}: FocusGradingViewProps) {
  if (!currentHomework.submissionId) return null;

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-white font-sans text-slate-900 overflow-hidden">
      {isSpeaking ? (
        <SpeakingGrader
          submissionId={currentHomework.submissionId}
          studentName={currentStudent.fullName}
          className={currentClass?.name || "Lớp IELTS"}
          homeworkTitle={currentHomework.title}
          submissionStatus={currentHomework.status}
          submittedAt={currentHomework.submittedAt}
          answers={resolvedAnswers}
          submissionDetail={currentSubmissionDetail}
          isSubmitting={isSubmitting}
          onBack={onBack}
          onGradeSubmit={onGradeSubmit}
        />
      ) : (
        <WritingGrader
          submissionId={currentHomework.submissionId}
          studentId={currentStudent.id}
          studentName={currentStudent.fullName}
          className={currentClass?.name || "Lớp IELTS"}
          homeworkTitle={currentHomework.title}
          submissionStatus={currentHomework.status}
          submittedAt={currentHomework.submittedAt}
          answers={resolvedAnswers}
          submissionDetail={currentSubmissionDetail}
          skill={currentHomework.skill}
          isAutoGraded={currentHomework.isAutoGraded}
          isSubmitting={isSubmitting}
          onBack={onBack}
          onGradeSubmit={onGradeSubmit}
        />
      )}
    </div>
  );
}
