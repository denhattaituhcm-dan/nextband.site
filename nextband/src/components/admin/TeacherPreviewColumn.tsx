import { ExamPreviewPanel } from "@/components/grading/ExamPreviewPanel";
import { SubmissionOverviewPanel } from "@/components/grading/SubmissionOverviewPanel";
import type { ExamSkillType } from "@/lib/examSkillHelper";

export interface PreviewStudent {
  id: string;
  fullName: string;
  avatarUrl?: string;
}

export interface PreviewHomework {
  id: string;
  title: string;
  type: string;
  status: string;
  dueDate?: string;
  submissionId?: string;
  skill?: ExamSkillType;
  isAutoGraded?: boolean;
  score?: number | null;
  bandScore?: number | null;
  objectiveScore?: number | null;
  criteriaScores?: any;
  feedback?: string | null;
  primaryErrorCategory?: string | null;
  revisionRequired?: boolean;
  submittedAt?: string;
}

export interface PreviewClass {
  name?: string;
}

export interface TeacherPreviewColumnProps {
  currentStudent: PreviewStudent | null;
  currentHomework: PreviewHomework | null | undefined;
  currentClass: PreviewClass | null | undefined;
  isSpeaking: boolean;
  resolvedAnswers: any[];
  currentSubmissionDetail: any;
  onOpenFocusMode: () => void;
}

export function TeacherPreviewColumn({
  currentStudent,
  currentHomework,
  currentClass,
  isSpeaking,
  resolvedAnswers,
  currentSubmissionDetail,
  onOpenFocusMode,
}: TeacherPreviewColumnProps) {
  return (
    <div className="flex-1 min-w-[360px] bg-white flex flex-col justify-between overflow-hidden">
      {!currentStudent ? (
        <div className="h-full flex items-center justify-center p-8 text-center text-xs text-slate-400">
          Chọn một học viên từ danh sách để xem bài làm và chấm điểm.
        </div>
      ) : !currentHomework ? (
        <div className="h-full flex items-center justify-center p-8 text-center text-xs text-slate-400">
          Chọn một bài tập trong sổ bài tập để chấm điểm hoặc xem đề bài.
        </div>
      ) : !currentHomework.submissionId || currentHomework.status === "unsubmitted" ? (
        <ExamPreviewPanel
          examId={currentHomework.id}
          homeworkTitle={currentHomework.title}
          studentName={currentStudent.fullName}
          className={currentClass?.name || "Lớp IELTS"}
          status={currentHomework.status}
          dueDate={currentHomework.dueDate}
        />
      ) : (
        <SubmissionOverviewPanel
          homework={currentHomework}
          student={currentStudent}
          className={currentClass?.name || "Lớp IELTS"}
          isSpeaking={isSpeaking}
          resolvedAnswers={resolvedAnswers}
          submissionDetail={currentSubmissionDetail}
          onOpenFocusMode={onOpenFocusMode}
        />
      )}
    </div>
  );
}
