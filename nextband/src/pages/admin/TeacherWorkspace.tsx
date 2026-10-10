import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  classesApi,
  examsApi,
  submissionsApi,
  attendanceApi,
  periodicReportsApi,
  formatStorageUrl,
  radarApi,
  interventionApi,
  teachersApi,
  type AtRiskStudent,
} from "@/lib/api";
import { AudioStorageService } from "@/lib/audioStorageService";
import { deriveHomeworkStatus, HomeworkStatus } from "@/types/homework";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  BookOpen,
  Calendar,
  Send,
  Loader2,
  Award,
  FolderOpen,
  AlertTriangle,
  FileText,
  ExternalLink,
  Clock,
  Share2,
} from "lucide-react";
import { ProgressReportModal } from "@/components/admin/ProgressReportModal";
import { WorkbookStatusBadge } from "@/components/admin/WorkbookStatusBadge";
import { TeacherHeader } from "@/components/admin/TeacherHeader";
import { TeacherStudentsColumn } from "@/components/admin/TeacherStudentsColumn";
import { TeacherWorkbookColumn } from "@/components/admin/TeacherWorkbookColumn";
import {
  deriveSubmissionTiming,
  selectCanonicalSubmission,
  compareHomeworkOrder,
} from "@/lib/homeworkStatusHelper";
import { generateParentProgressMessage } from "@/lib/reminderMessageHelper";
import {
  SentenceFeedbackItem,
  parseStructuredFeedback,
  CriteriaScores,
  calculateSpeakingBand,
  calculateWritingBand,
} from "@/lib/sentenceFeedback";
import { calculateGradingSla, summarizeSlaStats } from "@/lib/gradingSla";
import { mapToProgressReportData } from "@/lib/progressReportMapper";
import { FocusGradingView } from "@/components/admin/FocusGradingView";
import { TeacherPreviewColumn } from "@/components/admin/TeacherPreviewColumn";
import {
  detectExamSkill,
  isAutoGradedExam,
  getSkillBadgeConfig,
  ExamSkillType,
} from "@/lib/examSkillHelper";

export type { SentenceFeedbackItem };

// Model Workbook Homework Item (Gắn với Buổi học / Lesson)
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

export interface WorkspaceStudent {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  phone?: string;
  parentName?: string;
  parentPhone?: string;
  parentToken?: string;
  targetBand?: string | number;
  totalAssignedCount: number;
  submittedCount: number;
  gradedCount: number;
  pendingCount: number;
  unsubmittedCount: number;
  hasPending: boolean;
  homeworks: any[];
}

export default function TeacherWorkspace() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const urlClassId = searchParams.get("classId");
  const urlTeacherId = searchParams.get("id") || searchParams.get("teacherId");
  const urlStudentId = searchParams.get("studentId");
  const urlFilter = searchParams.get("filter");
  const urlTab = searchParams.get("tab");

  // State quản lý lựa chọn
  const initialStudentFilter = (urlFilter === "overdue" || urlFilter === "pending" || urlTab === "grading") ? "pending" : "all";
  const [selectedClassId, setSelectedClassId] = useState<string>("");
  const [selectedStudentId, setSelectedStudentId] = useState<string>("");
  const [selectedHomeworkId, setSelectedHomeworkId] = useState<string>("");
  const [studentFilter, setStudentFilter] = useState<"all" | "pending">(initialStudentFilter);
  const [isFocusMode, setIsFocusMode] = useState<boolean>(false);

  useEffect(() => {
    if (urlFilter === "overdue" || urlFilter === "pending" || urlTab === "grading") {
      setStudentFilter("pending");
    }
  }, [urlFilter, urlTab]);

  // State Quản lý popup Gia hạn từng bài
  const [reopenTargetId, setReopenTargetId] = useState<string | null>(null);
  const [reopenDate, setReopenDate] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);

  // 1. Fetch danh sách Lớp học phụ trách
  const { data: classesData, isLoading: isClassesLoading } = useQuery({
    queryKey: ["teacher-classes"],
    queryFn: async () => {
      const res = await classesApi.list();
      return res.data || [];
    },
  });

  const classes = useMemo(() => classesData || [], [classesData]);

  useEffect(() => {
    if (classesData && classesData.length > 0) {
      if (urlClassId && classesData.some((c: any) => c.id === urlClassId)) {
        setSelectedClassId(urlClassId);
      } else if (urlTeacherId) {
        const teacherClass = classesData.find(
          (c: any) => c.teacherId === urlTeacherId || c.teacher_id === urlTeacherId
        );
        if (teacherClass) {
          setSelectedClassId(teacherClass.id);
        } else if (!selectedClassId) {
          setSelectedClassId(classesData[0].id);
        }
      } else if (!selectedClassId) {
        setSelectedClassId(classesData[0].id);
      }
    }
  }, [classesData, urlClassId, urlTeacherId, selectedClassId]);

  useEffect(() => {
    if (urlStudentId && !selectedStudentId) {
      setSelectedStudentId(urlStudentId);
    }
  }, [urlStudentId, selectedStudentId]);

  const currentClass = useMemo(() => {
    return classes.find((c: any) => c.id === selectedClassId) || classes[0];
  }, [classes, selectedClassId]);

  // 2. Fetch View Model dữ liệu thật từ Canonical APIs (Classes + Exams + Submissions)
  const { data: workspaceData, isLoading: isWorkspaceLoading, refetch: refetchWorkspace } = useQuery({
    queryKey: ["teacher-workspace-data", selectedClassId],
    queryFn: async () => {
      if (!selectedClassId) return null;
      const cls = await classesApi.getById(selectedClassId);
      if (!cls) return null;

      const courseId = cls.courseId || cls.course_id;
      let exams: any[] = [];
      if (courseId) {
        try {
          const examRes = await examsApi.list({ courseId, limit: 100 });
          const rawExams = examRes.data || [];
          exams = [...rawExams].sort(compareHomeworkOrder);
        } catch (e) {
          console.warn("[TeacherWorkspace] Could not load exams:", e);
        }
      }

      let submissions: any[] = [];
      try {
        const subRes = await submissionsApi.list({ classId: selectedClassId, limit: 200 });
        submissions = subRes.data || [];
      } catch (e) {
        console.warn("[TeacherWorkspace] Could not load submissions:", e);
      }

      const rawStudents = cls.students || cls.class_students || [];
      const canonicalStudents = rawStudents.map((st: any) => {
        const studentId = st.studentId || st.student_id || st.student?.id || st.id;
        const studentName =
          st.student?.fullName ||
          st.fullName ||
          st.full_name ||
          st.name ||
          st.email ||
          "Học viên";
        const avatarUrl = st.student?.avatarUrl || st.avatarUrl || st.avatar_url;

        const candidateIds = [
          st.studentId,
          st.student_id,
          st.id,
          st.student?.id,
          st.student?.userId,
        ].filter(Boolean);

        const studentSubs = submissions.filter(
          (sub: any) =>
            candidateIds.includes(sub.studentId) ||
            candidateIds.includes(sub.student_id) ||
            candidateIds.includes(sub.student?.id) ||
            candidateIds.includes(sub.student?.userId)
        );

        const homeworks = exams.map((ex: any, idx: number) => {
          const sub = selectCanonicalSubmission(studentSubs, ex.id);
          const firstAnswer = sub?.answers?.[0];
          const rawFeedback = firstAnswer?.feedback || sub?.feedback || "";
          const structured = parseStructuredFeedback(rawFeedback);

          const skill = detectExamSkill(ex);
          const isAutoGraded = isAutoGradedExam(ex);

          const isRevision = !!(structured.revisionRequired ?? firstAnswer?.revisionRequired ?? sub?.revisionRequired ?? sub?.revision_required);
          const canonicalStatus = deriveHomeworkStatus(
            sub ? { ...sub, revisionRequired: isRevision } : null,
          );
          const normalizedStatus =
            canonicalStatus === "REVISION_REQUIRED"
              ? "needs_revision"
              : canonicalStatus === "GRADED" || (isAutoGraded && (canonicalStatus === "SUBMITTED" || canonicalStatus === "GRADING" || (sub?.submittedAt && sub?.totalScore != null)))
                ? "graded"
                : canonicalStatus === "SUBMITTED" || canonicalStatus === "GRADING"
                  ? "submitted"
                  : canonicalStatus === "IN_PROGRESS"
                    ? "in_progress"
                    : "unsubmitted";

          // Extract all answers mapped with question details
          const examQuestions: any[] = [];
          (ex.sections || []).forEach((sec: any) => {
            (sec.questionGroups || sec.question_groups || []).forEach((grp: any) => {
              (grp.questions || []).forEach((q: any) => {
                examQuestions.push({
                  ...q,
                  groupTitle: grp.title || (ex.examType === "speaking" ? `Speaking Part ${examQuestions.length + 1}` : `Task ${examQuestions.length + 1}`),
                });
              });
            });
          });

          const isAudioPath = (path?: string) => {
            if (!path || typeof path !== "string") return false;
            const clean = path.trim().toLowerCase();
            return (
              clean.startsWith("http://") ||
              clean.startsWith("https://") ||
              clean.startsWith("blob:") ||
              clean.startsWith("/uploads/") ||
              clean.startsWith("speaking-recordings/") ||
              clean.startsWith("exam-assets/") ||
              clean.endsWith(".webm") ||
              clean.endsWith(".mp3") ||
              clean.endsWith(".wav") ||
              clean.endsWith(".m4a") ||
              clean.endsWith(".ogg")
            );
          };

          const subAnswers = (sub?.answers || []).map((a: any) => {
            const matchedQ = examQuestions.find((q) => q.id === a.questionId || q.id === a.question_id);
            const isMedia = isAudioPath(a.answerText);
            const resolvedAudio = a.audioUrl || (isMedia ? a.answerText : "");
            const resolvedText = isMedia ? "" : (a.answerText || a.studentAnswer || "");

            return {
              id: a.id,
              questionId: a.questionId || a.question_id,
              questionTitle: matchedQ?.groupTitle || matchedQ?.title || "",
              questionText: matchedQ?.questionText || matchedQ?.question_text || "",
              answerText: resolvedText,
              audioUrl: resolvedAudio,
              score: a.score != null ? Number(a.score) : null,
              feedback: a.feedback || "",
            };
          });

          const finalAnswers = subAnswers.length > 0 ? subAnswers : examQuestions.map((q, qIdx) => ({
            questionId: q.id,
            questionTitle: q.groupTitle || (ex.examType === "speaking" ? `Part ${qIdx + 1}` : `Task ${qIdx + 1}`),
            questionText: q.questionText || q.question_text || "",
            answerText: "",
            audioUrl: "",
            score: null,
            feedback: "",
          }));

          return {
            id: ex.id,
            submissionId: sub?.id,
            answerId: firstAnswer?.id || undefined,
            lessonNumber: ex.week || Math.ceil((idx + 1) / 2),
            lessonTitle: `Buổi ${ex.week || Math.ceil((idx + 1) / 2)}`,
            orderIndex: idx + 1,
            title: ex.title || `Bài tập ${String(idx + 1).padStart(2, "0")}`,
            skill,
            isAutoGraded,
            type: skill === "speaking" ? "speaking" : skill === "writing" ? "writing" : skill,
            status: normalizedStatus,
            isOverdue: false,
            score: (() => {
              const isManual = skill === "speaking" || skill === "writing";
              if (isManual) {
                const val = sub?.bandScore ?? sub?.band_score ?? sub?.totalScore ?? sub?.total_score ?? firstAnswer?.score ?? (structured.criteriaScores ? (skill === "speaking" ? calculateSpeakingBand(structured.criteriaScores) : calculateWritingBand(structured.criteriaScores)) : null);
                return val != null && !isNaN(Number(val)) ? Number(val) : null;
              }
              const val = sub?.objectiveScore ?? sub?.objective_score ?? sub?.totalScore ?? sub?.total_score ?? (subAnswers.length > 0 ? subAnswers.filter((a: any) => a.score && a.score > 0).length : null);
              return val != null && !isNaN(Number(val)) ? Number(val) : null;
            })(),
            bandScore: (() => {
              const isManual = skill === "speaking" || skill === "writing";
              if (!isManual) return null;
              const val = sub?.bandScore ?? sub?.band_score ?? sub?.totalScore ?? sub?.total_score ?? firstAnswer?.score ?? (structured.criteriaScores ? (skill === "speaking" ? calculateSpeakingBand(structured.criteriaScores) : calculateWritingBand(structured.criteriaScores)) : null);
              return val != null && !isNaN(Number(val)) ? Number(val) : null;
            })(),
            objectiveScore: (() => {
              const isManual = skill === "speaking" || skill === "writing";
              if (isManual) return null;
              const val = sub?.objectiveScore ?? sub?.objective_score ?? sub?.totalScore ?? sub?.total_score ?? (subAnswers.length > 0 ? subAnswers.filter((a: any) => a.score && a.score > 0).length : null);
              return val != null && !isNaN(Number(val)) ? Number(val) : null;
            })(),
            criteriaScores: structured.criteriaScores || firstAnswer?.criteriaScores || sub?.criteriaScores || null,
            feedback: structured.text || rawFeedback,
            primaryErrorCategory: structured.primaryErrorCategory || firstAnswer?.primaryErrorCategory || sub?.primaryErrorCategory || null,
            revisionRequired: isRevision,
            sentenceFeedbacks: structured.sentenceFeedbacks || [],
            submittedAt: sub?.submittedAt || sub?.submitted_at,
            answerText: finalAnswers[0]?.answerText || "",
            audioUrl: finalAnswers[0]?.audioUrl || "",
            answers: finalAnswers,
          };
        });

        const submittedCount = homeworks.filter((h: any) => h.status === "submitted" || h.status === "graded" || h.status === "needs_revision").length;
        const gradedCount = homeworks.filter((h: any) => h.status === "graded" || h.status === "needs_revision").length;
        const pendingCount = homeworks.filter((h: any) => h.status === "submitted" && !h.isAutoGraded).length;
        const unsubmittedCount = homeworks.filter((h: any) => h.status === "unsubmitted").length;

        return {
          id: studentId,
          fullName: studentName,
          email: st.email || "",
          avatarUrl,
          phone: st.student?.phone || st.phone,
          parentName: st.student?.parentName || st.student?.parent_name || st.parentName || st.parent_name,
          parentPhone: st.student?.parentPhone || st.student?.parent_phone || st.parentPhone || st.parent_phone,
          parentToken: st.student?.parentToken || st.student?.parent_token || st.parentToken || st.parent_token,
          targetBand: st.student?.targetBand || st.student?.target_band || st.student?.targetScore || st.targetBand || st.target_band || st.targetScore,
          totalAssignedCount: exams.length,
          submittedCount,
          gradedCount,
          pendingCount,
          unsubmittedCount,
          hasPending: pendingCount > 0,
          homeworks,
        };
      });

      return {
        students: canonicalStudents,
      };
    },
    enabled: !!selectedClassId,
  });

  // 3. Fetch ma trận điểm danh của lớp để hiển thị chính xác chuyên cần trong báo cáo
  const { data: attendanceData } = useQuery({
    queryKey: ["teacher-attendance-matrix", selectedClassId],
    queryFn: async () => {
      if (!selectedClassId) return null;
      try {
        return await attendanceApi.getAttendanceMatrix(selectedClassId);
      } catch (e) {
        console.warn("[TeacherWorkspace] Could not load attendance matrix:", e);
        return null;
      }
    },
    enabled: !!selectedClassId,
  });

  // Normalize Danh sách Học viên thật từ CSDL
  const students = useMemo<WorkspaceStudent[]>(() => {
    if (!workspaceData?.students) return [];
    return workspaceData.students.map((s: any) => ({
      id: s.id,
      fullName: s.fullName,
      email: s.email,
      avatarUrl: s.avatarUrl,
      phone: s.phone,
      parentName: s.parentName,
      parentPhone: s.parentPhone,
      parentToken: s.parentToken,
      targetBand: s.targetBand,
      totalAssignedCount: s.totalAssignedCount || 0,
      submittedCount: s.submittedCount || 0,
      gradedCount: s.gradedCount || 0,
      pendingCount: s.pendingCount || 0,
      unsubmittedCount: s.unsubmittedCount || 0,
      hasPending: (s.pendingCount || 0) > 0,
      homeworks: s.homeworks || [],
    }));
  }, [workspaceData]);

  useEffect(() => {
    if (!selectedStudentId && students.length > 0) {
      setSelectedStudentId(students[0].id);
    }
  }, [selectedStudentId, students]);

  const filteredStudents = useMemo(() => {
    if (studentFilter === "pending") {
      return students.filter((s: any) => s.hasPending);
    }
    return students;
  }, [students, studentFilter]);

  const currentStudent = useMemo(() => {
    return students.find((s: any) => s.id === selectedStudentId) || null;
  }, [students, selectedStudentId]);

  // 2.5 Query Pedagogical Profile (Chẩn đoán Học thuật dựa trên Evidence & Bayesian)
  const { data: pedagogicalData, isLoading: isPedagogicalLoading } = useQuery({
    queryKey: ["student-pedagogical-profile", currentStudent?.id],
    queryFn: async () => {
      if (!currentStudent?.id) return null;
      try {
        return await teachersApi.getStudentPedagogicalProfile(currentStudent.id);
      } catch (e) {
        console.warn("[TeacherWorkspace] Could not load pedagogical profile:", e);
        return null;
      }
    },
    enabled: !!currentStudent?.id,
  });

  const pedagogicalProfile = pedagogicalData?.profile || null;

  // 3. SỔ WORKBOOK DỮ LIỆU THẬT NHÓM THEO BUỔI HỌC (REAL WORKBOOK ITEMS)
  const workbookItems: WorkbookItem[] = useMemo(() => {
    if (!currentStudent || !currentStudent.homeworks) return [];
    return currentStudent.homeworks.map((hw: any, idx: number) => {
      const deadline = hw.dueDate || hw.deadline;
      const timing = deriveSubmissionTiming(hw.submittedAt, deadline);

      return {
        id: hw.id,
        lessonNumber: hw.lessonNumber || Math.ceil((idx + 1) / 2),
        lessonTitle: hw.lessonTitle || `Buổi ${Math.ceil((idx + 1) / 2)}`,
        orderIndex: idx + 1,
        title: hw.title,
        skill: hw.skill || detectExamSkill(hw),
        isAutoGraded: hw.isAutoGraded ?? isAutoGradedExam(hw),
        type: hw.type || hw.skill || "writing",
        dueDate: deadline,
        status: (hw.status || "unsubmitted") as any,
        isOverdue: false,
        submissionTiming: timing,
        submissionId: hw.submissionId,
        answerId: hw.answerId,
        submittedAt: hw.submittedAt,
        answerText: hw.answerText,
        audioUrl: hw.audioUrl,
        objectiveScore: hw.objectiveScore,
        bandScore: hw.bandScore,
        criteriaScores: hw.criteriaScores,
        feedback: hw.feedback,
        primaryErrorCategory: hw.primaryErrorCategory,
        revisionRequired: hw.revisionRequired,
        sentenceFeedbacks: hw.sentenceFeedbacks || [],
        score: hw.bandScore != null ? hw.bandScore : hw.objectiveScore,
        answers: hw.answers || [],
      };
    });
  }, [currentStudent]);

  // Gom nhóm Workbook theo Buổi học (Lesson)
  const groupedWorkbook = useMemo(() => {
    const map = new Map<number, { lessonTitle: string; items: WorkbookItem[] }>();
    workbookItems.forEach((item) => {
      if (!map.has(item.lessonNumber)) {
        map.set(item.lessonNumber, { lessonTitle: item.lessonTitle, items: [] });
      }
      map.get(item.lessonNumber)!.items.push(item);
    });
    return Array.from(map.entries()).map(([lessonNumber, data]) => ({
      lessonNumber,
      lessonTitle: data.lessonTitle,
      items: data.items,
    }));
  }, [workbookItems]);

  useEffect(() => {
    if (!selectedHomeworkId && workbookItems.length > 0) {
      const pendingHw = workbookItems.find((h) => h.status === "submitted") || workbookItems[0];
      setSelectedHomeworkId(pendingHw.id);
    }
  }, [selectedHomeworkId, workbookItems]);

  const currentHomework = useMemo(() => {
    return workbookItems.find((h) => h.id === selectedHomeworkId) || workbookItems[0];
  }, [workbookItems, selectedHomeworkId]);

  // 4. Fetch detailed submission (with exam sections, question prompts, passages)
  const { data: currentSubmissionDetail, refetch: refetchSubmissionDetail } = useQuery({
    queryKey: ["submission-detail-for-grading", currentHomework?.submissionId],
    queryFn: async () => {
      if (!currentHomework?.submissionId) return null;
      try {
        return await submissionsApi.getById(currentHomework.submissionId);
      } catch (e) {
        return null;
      }
    },
    enabled: !!currentHomework?.submissionId,
  });

  const resolvedAnswers = useMemo(() => {
    if (currentSubmissionDetail && Array.isArray(currentSubmissionDetail.answers) && currentSubmissionDetail.answers.length > 0) {
      const examQuestions: any[] = [];
      (currentSubmissionDetail.exam?.sections || []).forEach((sec: any) => {
        (sec.questionGroups || sec.question_groups || []).forEach((grp: any) => {
          (grp.questions || []).forEach((q: any) => {
            examQuestions.push({
              id: q.id,
              groupTitle: (grp.title ? grp.title.replace(/<[^>]*>/g, " ").trim() : "") || (currentHomework?.type === "speaking" ? "Speaking Task" : "Writing Task"),
              instructions: grp.instructions || sec.instructions || "",
              passage: grp.passage || "",
              questionText: q.questionText || q.question_text || "",
              imageUrl: q.imageUrl || q.image_url || grp.imageUrl || grp.image_url || null,
            });
          });
        });
      });

      const answerByQuestionId = new Map(
        (currentSubmissionDetail.answers || []).map((a: any) => [a.questionId || a.question_id, a])
      );

      if (examQuestions.length > 0) {
        return examQuestions.map((q, idx) => {
          const a: any =
            answerByQuestionId.get(q.id) ||
            (currentSubmissionDetail.answers || [])[idx] ||
            (currentHomework?.answers || [])[idx];
          const rawAns = a?.answerText || a?.answer_text || a?.studentAnswer || "";
          const rawAudio = a?.audioUrl || a?.audio_url || "";
          const rawAudioCandidate = (rawAudio && rawAudio.trim().length > 0) ? rawAudio.trim() : (AudioStorageService.isAudio(rawAns) ? rawAns.trim() : "");
          const resolvedAudioUrl = rawAudioCandidate ? (formatStorageUrl(rawAudioCandidate) || rawAudioCandidate) : "";
          const resolvedAnswerText = AudioStorageService.isAudio(rawAns) ? "" : rawAns;

          return {
            id: a?.id,
            questionId: q.id,
            questionTitle: q.groupTitle,
            instructions: q.instructions,
            passage: q.passage,
            imageUrl: q.imageUrl,
            questionText: q.questionText,
            answerText: resolvedAnswerText,
            audioUrl: resolvedAudioUrl,
            score: a?.score != null ? Number(a?.score) : null,
            feedback: a?.feedback || "",
            criteriaScores: a?.criteriaScores || (a?.feedback ? parseStructuredFeedback(a.feedback).criteriaScores : null) || currentSubmissionDetail?.criteriaScores || null,
          };
        });
      }

      return currentSubmissionDetail.answers.map((a: any) => {
        const rawAns = a.answerText || a.answer_text || a.studentAnswer || "";
        const rawAudio = a.audioUrl || a.audio_url || "";
        const rawAudioCandidate = (rawAudio && rawAudio.trim().length > 0) ? rawAudio.trim() : (AudioStorageService.isAudio(rawAns) ? rawAns.trim() : "");
        const resolvedAudioUrl = rawAudioCandidate ? (formatStorageUrl(rawAudioCandidate) || rawAudioCandidate) : "";
        const resolvedAnswerText = AudioStorageService.isAudio(rawAns) ? "" : rawAns;

        return {
          id: a.id,
          questionId: a.questionId || a.question_id,
          questionTitle: currentHomework?.title || "Task",
          instructions: "",
          passage: "",
          imageUrl: null,
          questionText: "",
          answerText: resolvedAnswerText,
          audioUrl: resolvedAudioUrl,
          score: a.score != null ? Number(a.score) : null,
          feedback: a.feedback || "",
          criteriaScores: a.criteriaScores || (a.feedback ? parseStructuredFeedback(a.feedback).criteriaScores : null) || currentSubmissionDetail?.criteriaScores || null,
        };
      });
    }
    return currentHomework?.answers || [];
  }, [currentSubmissionDetail, currentHomework]);

  const isSpeaking = useMemo(() => {
    if (!currentHomework) return false;
    const detectedSkill = currentHomework.skill || detectExamSkill(currentHomework) || detectExamSkill(currentSubmissionDetail?.exam);
    if (detectedSkill === "speaking") return true;

    const hwType = String(currentHomework.type || "").toLowerCase();
    const hwTitle = String(currentHomework.title || "").toLowerCase();
    const secType = String(currentSubmissionDetail?.exam?.sections?.[0]?.sectionType || "").toLowerCase();
    const examType = String(currentSubmissionDetail?.exam?.examType || "").toLowerCase();
    const hasAudio = resolvedAnswers.some((a) => (!!a.audioUrl && a.audioUrl.trim().length > 0) || AudioStorageService.isAudio(a.answerText));
    return (
      hwType === "speaking" ||
      secType === "speaking" ||
      examType === "speaking" ||
      /\b(spk|speaking)\b/i.test(hwTitle) ||
      hasAudio
    );
  }, [currentHomework, currentSubmissionDetail, resolvedAnswers]);

  const slaStats = useMemo(() => {
    if (!currentStudent?.homeworks) {
      return { overdueCount: 0, approachingCount: 0, onTrackCount: 0, totalPending: 0, gradedCount: 0 };
    }
    const pendingItems = currentStudent.homeworks.filter((i: any) => i.status === "submitted");
    return summarizeSlaStats(pendingItems);
  }, [currentStudent]);

  const workbookSummary = useMemo(() => {
    if (!currentStudent) return { graded: 0, pending: 0, inProgress: 0, overdue: 0, completed: 0, totalAssigned: 0 };
    return {
      graded: currentStudent.gradedCount || 0,
      pending: currentStudent.pendingCount || 0,
      inProgress: currentStudent.unsubmittedCount || 0,
      overdue: slaStats.overdueCount,
      completed: (currentStudent.gradedCount || 0) + (currentStudent.pendingCount || 0),
      totalAssigned: currentStudent.totalAssignedCount || 0,
    };
  }, [currentStudent, slaStats]);

  // 4. Fetch báo cáo định kỳ đã lưu của học viên hiện tại (nếu có)
  const { data: latestPeriodicReport, refetch: refetchPeriodicReport } = useQuery({
    queryKey: ["student-periodic-report", selectedClassId, currentStudent?.id],
    queryFn: async () => {
      if (!selectedClassId || !currentStudent?.id) return null;
      try {
        return await periodicReportsApi.getLatest(selectedClassId, currentStudent.id);
      } catch (e) {
        return null;
      }
    },
    enabled: !!selectedClassId && !!currentStudent?.id,
  });

  // 5. Early-Warning Radar Query (On-demand per class)
  const { data: radarData, refetch: refetchRadar, isLoading: isLoadingRadar } = useQuery({
    queryKey: ["class-radar", selectedClassId],
    queryFn: async () => {
      if (!selectedClassId) return null;
      return await radarApi.getAtRiskStudents(selectedClassId);
    },
    enabled: !!selectedClassId,
    staleTime: 60 * 1000,
  });

  const [interveningStudentId, setInterveningStudentId] = useState<string | null>(null);

  const handleCreateIntervention = async (student: AtRiskStudent) => {
    if (!selectedClassId) return;
    setInterveningStudentId(student.studentId);
    try {
      await interventionApi.create({
        studentId: student.studentId,
        classId: selectedClassId,
        category: "ACADEMIC_RISK",
        title: `Cảnh báo rủi ro học bổng: ${student.riskLevel}`,
        notes: student.riskReason || `Học viên có ${student.openTaskCount} bài tập chưa nộp, tỷ lệ worst-case ${student.worstCaseRate}%.`,
        status: "CONTACTED",
        actionTaken: "Đã mở kênh liên hệ Zalo phụ huynh để nhắc nhở hoàn thành BTVN",
      });

      toast({
        title: "Đã ghi nhận can thiệp",
        description: `Đã tạo nhật ký can thiệp cho học viên ${student.studentName}.`,
      });

      // Mở Zalo channel nếu có phone/token
      if (student.parentToken) {
        const link = `https://nextband.site/p/${student.parentToken}`;
        navigator.clipboard.writeText(link);
        toast({
          title: "Đã copy link Báo cáo Phụ huynh",
          description: "Đã copy magic link gửi Zalo cho phụ huynh.",
        });
      }

      refetchRadar();
    } catch (err: any) {
      toast({
        title: "Lỗi tạo can thiệp",
        description: err.message || "Không thể lưu bản ghi can thiệp.",
        variant: "destructive",
      });
    } finally {
      setInterveningStudentId(null);
    }
  };

  // Data Map cho Báo Cáo Tiến Độ Phụ Huynh
  const reportData = useMemo(() => {
    const studentMatrix = attendanceData?.students?.find(
      (s: any) => s.studentId === currentStudent?.id
    );

    const sortedSessions = [...(attendanceData?.sessions || [])].sort((a: any, b: any) => {
      const numA = Number(a.sessionNumber || a.session_number || 0);
      const numB = Number(b.sessionNumber || b.session_number || 0);
      return numA - numB;
    });
    const firstSessionDate =
      sortedSessions[0]?.sessionDate ||
      sortedSessions[0]?.plannedDate ||
      sortedSessions[0]?.scheduledDate ||
      null;

    const classStartDate =
      currentClass?.startDate ||
      currentClass?.start_date ||
      firstSessionDate ||
      null;

    return mapToProgressReportData({
      classId: selectedClassId,
      studentId: currentStudent?.id,
      parentToken: currentStudent?.parentToken,
      totalWeeks: currentClass?.totalWeeks || currentClass?.total_weeks || 10,
      studentName: currentStudent?.fullName || "Học viên",
      className: currentClass?.name || "Lớp học",
      teacherName: currentClass?.teacher?.fullName || null,
      targetBand:
        currentStudent?.targetBand ||
        currentClass?.target_band ||
        currentClass?.targetBand ||
        (currentClass?.course?.level ? `IELTS ${currentClass.course.level}` : null),
      programTitle: currentClass?.course?.title || currentClass?.name || null,
      periodFrom: classStartDate,
      periodTo: new Date(),
      courseProgress: {
        completedSessions:
          attendanceData?.completedSessions ??
          (attendanceData?.sessions?.filter((s: any) => s.status === "COMPLETED").length || 0),
        totalSessions:
          attendanceData?.totalSessions ??
          attendanceData?.sessions?.length ??
          (currentClass?.sessions?.length || 27),
      },
      attendanceSummary: studentMatrix
        ? {
            present: studentMatrix.presentCount,
            late: studentMatrix.lateCount,
            absent: studentMatrix.absentCount,
            excused: studentMatrix.excusedCount,
            total:
              (studentMatrix.presentCount || 0) +
              (studentMatrix.lateCount || 0) +
              (studentMatrix.absentCount || 0) +
              (studentMatrix.excusedCount || 0),
            rate: studentMatrix.attendanceRate,
          }
        : null,
      classInfo: {
        currentStudents: students.length,
        maxStudents: currentClass?.room?.capacity || 10,
        classModel: (students.length || 0) <= 10 ? "Nhóm nhỏ tương tác cao" : "Lớp tiêu chuẩn",
      },
      homeworks: currentStudent?.homeworks || [],
      teacherEvaluation: latestPeriodicReport
        ? {
            strengths: latestPeriodicReport.strengths || "",
            weaknesses: latestPeriodicReport.weaknesses || "",
            recommendations: latestPeriodicReport.recommendations || "",
            nextGoals: Array.isArray(latestPeriodicReport.nextPeriodGoals)
              ? latestPeriodicReport.nextPeriodGoals
              : [],
          }
        : undefined,
    });
  }, [currentStudent, currentClass, attendanceData, selectedClassId, latestPeriodicReport, students]);

  const handleSaveReport = async (evalData: {
    strengths: string;
    weaknesses: string;
    recommendations: string;
    nextGoals?: string[];
    targetBand?: string;
  }) => {
    if (!selectedClassId || !currentStudent?.id) return;
    try {
      await periodicReportsApi.save(selectedClassId, currentStudent.id, {
        strengths: evalData.strengths,
        weaknesses: evalData.weaknesses,
        recommendations: evalData.recommendations,
        nextGoals: evalData.nextGoals || [],
      });
      refetchPeriodicReport();
    } catch (e: any) {
      console.warn("[TeacherWorkspace] Could not persist periodic report:", e);
    }
  };

  // THAO TÁC LƯU NHÁP / TRẢ BÀI & TỰ ĐỘNG CHUYỂN BÀI THEO QUEUE CHỜ CHẤM
  const handleGradeSubmit = async (payload: {
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
  }) => {
    setIsSubmitting(true);
    try {
      if (currentHomework && currentStudent && currentHomework.submissionId) {
        const computedTotalScore =
          payload.totalScore ??
          (payload.grades && payload.grades.length > 0 ? payload.grades[0].score : undefined);

        const gradeResult = await submissionsApi.grade(
          currentHomework.submissionId,
          payload.grades,
          computedTotalScore,
          payload.options
        );

        // Optimistically update React Query cache for immediate UI responsiveness
        if (gradeResult) {
          queryClient.setQueryData(
            ["submission-detail-for-grading", currentHomework.submissionId],
            gradeResult
          );
        }

        if (selectedClassId) {
          queryClient.setQueryData(
            ["teacher-workspace-data", selectedClassId],
            (oldData: any) => {
              if (!oldData?.students) return oldData;
              const nextStatus = payload.options.finalize
                ? (payload.options.revisionRequired ? "needs_revision" : "graded")
                : undefined;
              return {
                ...oldData,
                students: oldData.students.map((st: any) => {
                  if (st.id !== currentStudent.id) return st;
                  const updatedHws = (st.homeworks || []).map((hw: any) => {
                    if (hw.id !== currentHomework.id && hw.submissionId !== currentHomework.submissionId) return hw;
                    return {
                      ...hw,
                      ...(nextStatus ? { status: nextStatus } : {}),
                      score: computedTotalScore ?? hw.score,
                      bandScore: (currentHomework.skill === "writing" || currentHomework.skill === "speaking") ? (computedTotalScore ?? hw.bandScore) : hw.bandScore,
                      objectiveScore: (currentHomework.skill !== "writing" && currentHomework.skill !== "speaking") ? (computedTotalScore ?? hw.objectiveScore) : hw.objectiveScore,
                      revisionRequired: payload.options.revisionRequired ?? hw.revisionRequired,
                      feedback: payload.options.feedback ?? hw.feedback,
                    };
                  });
                  const pendingCount = updatedHws.filter((h: any) => h.status === "submitted" && !h.isAutoGraded).length;
                  const gradedCount = updatedHws.filter((h: any) => h.status === "graded" || h.status === "needs_revision").length;
                  return {
                    ...st,
                    homeworks: updatedHws,
                    pendingCount,
                    gradedCount,
                    hasPending: pendingCount > 0,
                  };
                }),
              };
            }
          );
        }

        // Refetch fresh data from server (small delay ensures read-after-write consistency
        // so the DB transaction is fully visible before we query it again)
        await new Promise((r) => setTimeout(r, 400));
        await Promise.allSettled([
          refetchWorkspace(),
          refetchSubmissionDetail(),
        ]);

        if (payload.options.finalize) {
          toast({
            title: "Đã trả bài thành công 🎉",
            description: `Đã lưu điểm cho học viên ${currentStudent.fullName}.${payload.options.revisionRequired ? " (Đã gửi yêu cầu sửa bài Attempt 2)" : ""}`,
          });
        } else {
          toast({
            title: "Đã lưu nháp thành công 💾",
            description: "Điểm và nhận xét đã được lưu. Học viên chưa thấy kết quả cho đến khi Trả bài.",
          });
        }
      }
    } catch (err: any) {
      toast({
        title: "Không thể lưu điểm",
        description: err.message || "Đã xảy ra lỗi khi lưu kết quả.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Thao tác Gia hạn ngày cho Lớp học
  const handleConfirmReopen = async (item: WorkbookItem) => {
    if (!reopenDate) {
      toast({
        title: "Vui lòng chọn ngày gia hạn",
        variant: "destructive",
      });
      return;
    }

    try {
      if (selectedClassId && item.id) {
        await classesApi.setHomeworkDeadline(selectedClassId, item.id, new Date(reopenDate).toISOString());
        toast({
          title: "Đã cập nhật hạn nộp bài tập 📅",
          description: `Bài ${item.title} đã gia hạn đến ngày ${reopenDate} cho lớp học.`,
        });
        refetchWorkspace();
        setReopenTargetId(null);
      }
    } catch (err: any) {
      toast({
        title: "Không thể lưu hạn nộp",
        description: err.message || "Đã xảy ra lỗi khi lưu gia hạn.",
        variant: "destructive",
      });
    }
  };



  // 🌟 FOCUS GRADING MODE: DÀNH 100% DIỆN TÍCH CHO VIỆC ĐỌC BÀI VÀ CHẤM BÀI (ẨN HOÀN TOÀN HEADER CỦA WORKSPACE) 🌟
  if (isFocusMode && currentStudent && currentHomework && currentHomework.submissionId && currentHomework.status !== "unsubmitted") {
    return (
      <FocusGradingView
        currentStudent={currentStudent}
        currentHomework={currentHomework}
        currentClass={currentClass}
        resolvedAnswers={resolvedAnswers}
        currentSubmissionDetail={currentSubmissionDetail}
        isSpeaking={isSpeaking}
        isSubmitting={isSubmitting}
        onBack={() => setIsFocusMode(false)}
        onGradeSubmit={handleGradeSubmit}
      />
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* 🟢 HEADER TIÊU CHUẨN (CHỈ HIỆN TRONG CHẾ ĐỘ 3 CỘT) */}
      <TeacherHeader
        classes={classes}
        selectedClassId={selectedClassId}
        onSelectClass={(val) => {
          setSelectedClassId(val);
          setSelectedStudentId("");
          setSelectedHomeworkId("");
        }}
        onRefresh={() => refetchWorkspace()}
      />

      {/* 📐 BỐ CỤC 3 CỘT SINGLE-SCREEN WORKBOOK VIEWER */}
      <div className="flex-1 flex min-h-0 overflow-hidden overflow-x-auto">
        {/* ========================================================================= */}
        {/* CỘT 1: DANH SÁCH HỌC VIÊN TRONG LỚP (KÈM CHỈ SỐ TIẾN ĐỘ 12/27)            */}
        {/* ========================================================================= */}
        <TeacherStudentsColumn
          students={filteredStudents}
          selectedStudentId={selectedStudentId}
          studentFilter={studentFilter}
          radarData={radarData}
          interveningStudentId={interveningStudentId}
          onSelectStudent={(id) => {
            setSelectedStudentId(id);
            setSelectedHomeworkId("");
          }}
          onFilterChange={setStudentFilter}
          onIntervene={handleCreateIntervention}
        />

        {/* ========================================================================= */}
        {/* CỘT 2: SỔ BÀI TẬP WORKBOOK (BUỔI HỌC & TRẠNG THÁI NỘP BÀI)                 */}
        {/* ========================================================================= */}
        <TeacherWorkbookColumn
          currentStudent={currentStudent}
          groupedWorkbook={groupedWorkbook}
          selectedHomeworkId={selectedHomeworkId}
          slaStats={slaStats}
          workbookSummary={workbookSummary}
          pedagogicalProfile={pedagogicalProfile}
          reopenTargetId={reopenTargetId}
          reopenDate={reopenDate}
          onSelectHomework={setSelectedHomeworkId}
          onOpenReportModal={() => setIsReportModalOpen(true)}
          onShareParentZalo={() => {
            const parentPhone = currentStudent?.parentPhone || currentStudent?.phone;
            const parentName = currentStudent?.parentName || "Phụ huynh";
            const studentName = currentStudent?.fullName || "em";
            const parentToken = currentStudent?.parentToken;

            const messageText = generateParentProgressMessage({
              parentName,
              studentName,
              completedCount: workbookSummary.completed,
              totalAssigned: workbookSummary.totalAssigned,
              gradedCount: workbookSummary.graded,
              parentToken,
            });

            navigator.clipboard.writeText(messageText);
            toast({
              title: "📋 Đã sao chép tin nhắn Báo cáo!",
              description: "Đang mở Zalo... Thầy/Cô chỉ cần bấm Ctrl+V để gửi cho Phụ huynh.",
            });

            if (parentPhone) {
              const cleanPhone = String(parentPhone).replace(/[^0-9]/g, "");
              window.open(`https://zalo.me/${cleanPhone}`, "_blank");
            } else {
              toast({
                title: "⚠️ Chưa có SĐT Phụ huynh",
                description: "Đã copy nội dung vào Clipboard. Thầy/Cô vui lòng paste vào Zalo học viên.",
                variant: "destructive",
              });
            }
          }}
          onSetReopenTarget={setReopenTargetId}
          onReopenDateChange={setReopenDate}
          onConfirmReopen={handleConfirmReopen}
        />

          {/* ========================================================================= */}
          {/* CỘT 3: PREVIEW & XEM KHÁI QUÁT BÀI NỘP / KẾT QUẢ ĐÃ CHẤM                  */}
          {/* ========================================================================= */}
          <TeacherPreviewColumn
            currentStudent={currentStudent}
            currentHomework={currentHomework}
            currentClass={currentClass}
            isSpeaking={isSpeaking}
            resolvedAnswers={resolvedAnswers}
            currentSubmissionDetail={currentSubmissionDetail}
            onOpenFocusMode={() => setIsFocusMode(true)}
          />
        </div>

      {/* MODAL BÁO CÁO TIẾN ĐỘ HỌC TẬP (PHỤ HUYNH) */}
      <ProgressReportModal
        open={isReportModalOpen}
        onOpenChange={setIsReportModalOpen}
        data={reportData}
        onSaveReport={handleSaveReport}
      />
    </div>
  );
}

