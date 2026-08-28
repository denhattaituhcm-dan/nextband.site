import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { classesApi, examsApi, submissionsApi, attendanceApi, periodicReportsApi, formatStorageUrl } from "@/lib/api";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import {
  School,
  User,
  BookOpen,
  Calendar,
  Send,
  Loader2,
  RefreshCw,
  GraduationCap,
  Award,
  ChevronRight,
  FolderOpen,
  AlertTriangle,
  FileText,
  ExternalLink,
} from "lucide-react";
import { ProgressReportModal } from "@/components/admin/ProgressReportModal";
import {
  deriveSubmissionTiming,
  selectCanonicalSubmission,
  compareHomeworkOrder,
} from "@/lib/homeworkStatusHelper";
import {
  SentenceFeedbackItem,
  parseStructuredFeedback,
  CriteriaScores,
} from "@/lib/sentenceFeedback";
import { calculateGradingSla, summarizeSlaStats } from "@/lib/gradingSla";
import { mapToProgressReportData } from "@/lib/progressReportMapper";
import { WritingGrader } from "@/components/grading/WritingGrader";
import { SpeakingGrader } from "@/components/grading/SpeakingGrader";
import { ExamPreviewPanel } from "@/components/grading/ExamPreviewPanel";
import { SubmissionOverviewPanel } from "@/components/grading/SubmissionOverviewPanel";

// Model Workbook Homework Item (Gắn với Buổi học / Lesson)
interface WorkbookItem {
  id: string;
  submissionId?: string;
  answerId?: string;
  lessonNumber: number;
  lessonTitle: string;
  orderIndex: number;
  title: string;
  type: "writing" | "speaking" | "homework";
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

export default function TeacherWorkspace() {
  const { toast } = useToast();
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
  }, [classesData, urlClassId, urlTeacherId]);

  useEffect(() => {
    if (urlStudentId && !selectedStudentId) {
      setSelectedStudentId(urlStudentId);
    }
  }, [urlStudentId]);

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

          const isRevision = !!(structured.revisionRequired ?? firstAnswer?.revisionRequired ?? sub?.revisionRequired ?? sub?.revision_required);
          const canonicalStatus = deriveHomeworkStatus(
            sub ? { ...sub, revisionRequired: isRevision } : null,
          );
          const normalizedStatus =
            canonicalStatus === "REVISION_REQUIRED"
              ? "needs_revision"
              : canonicalStatus === "GRADED"
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

          const subAnswers = (sub?.answers || []).map((a: any) => {
            const matchedQ = examQuestions.find((q) => q.id === a.questionId || q.id === a.question_id);
            return {
              id: a.id,
              questionId: a.questionId || a.question_id,
              questionTitle: matchedQ?.groupTitle || matchedQ?.title || "",
              questionText: matchedQ?.questionText || matchedQ?.question_text || "",
              answerText: a.answerText || a.studentAnswer || "",
              audioUrl: a.audioUrl || "",
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
            type:
              String(ex.examType || "").toLowerCase() === "speaking" ||
              String(ex.title || "").toLowerCase().includes("speaking") ||
              !!firstAnswer?.audioUrl
                ? "speaking"
                : "writing",
            status: normalizedStatus,
            isOverdue: false,
            score: sub?.totalScore ?? sub?.total_score ?? sub?.bandScore ?? null,
            bandScore: sub?.bandScore ?? sub?.band_score ?? null,
            objectiveScore: sub?.objectiveScore ?? sub?.objective_score ?? null,
            criteriaScores: structured.criteriaScores || firstAnswer?.criteriaScores || sub?.criteriaScores || null,
            feedback: structured.text || rawFeedback,
            primaryErrorCategory: structured.primaryErrorCategory || firstAnswer?.primaryErrorCategory || sub?.primaryErrorCategory || null,
            revisionRequired: isRevision,
            sentenceFeedbacks: structured.sentenceFeedbacks || [],
            submittedAt: sub?.submittedAt || sub?.submitted_at,
            answerText: firstAnswer?.answerText || firstAnswer?.studentAnswer || "",
            audioUrl: firstAnswer?.audioUrl || "",
            answers: finalAnswers,
          };
        });

        const submittedCount = homeworks.filter((h: any) => h.status === "submitted" || h.status === "graded").length;
        const gradedCount = homeworks.filter((h: any) => h.status === "graded").length;
        const pendingCount = homeworks.filter((h: any) => h.status === "submitted").length;
        const unsubmittedCount = homeworks.filter((h: any) => h.status === "unsubmitted").length;

        return {
          id: studentId,
          fullName: studentName,
          email: st.email || "",
          avatarUrl,
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
  const students = useMemo(() => {
    if (!workspaceData?.students) return [];
    return workspaceData.students.map((s: any) => ({
      id: s.id,
      fullName: s.fullName,
      email: s.email,
      avatarUrl: s.avatarUrl,
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
        type: (
          String(hw.type || "").toLowerCase() === "speaking" ||
          String(hw.title || "").toLowerCase().includes("speaking") ||
          !!hw.audioUrl
            ? "speaking"
            : "writing"
        ) as "writing" | "speaking",
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
  const { data: currentSubmissionDetail } = useQuery({
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

  const isAudioFile = (val?: string) => {
    if (!val) return false;
    const lower = String(val).toLowerCase().trim();
    return (
      lower.endsWith(".webm") ||
      lower.endsWith(".mp3") ||
      lower.endsWith(".wav") ||
      lower.endsWith(".ogg") ||
      lower.endsWith(".m4a") ||
      lower.includes("speaking-recordings/") ||
      lower.includes("/audio/")
    );
  };

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
              imageUrl: q.imageUrl || q.image_url || null,
            });
          });
        });
      });

      const answerByQuestionId = new Map(
        (currentSubmissionDetail.answers || []).map((a: any) => [a.questionId || a.question_id, a])
      );

      if (examQuestions.length > 0) {
        return examQuestions.map((q) => {
          const a: any = answerByQuestionId.get(q.id);
          const rawAns = a?.answerText || a?.studentAnswer || "";
          const rawAudio = a?.audioUrl || "";
          const resolvedAudioUrl = rawAudio || (isAudioFile(rawAns) ? rawAns : "");
          const resolvedAnswerText = isAudioFile(rawAns) ? "" : rawAns;

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
          };
        });
      }

      return currentSubmissionDetail.answers.map((a: any) => {
        const rawAns = a.answerText || a.studentAnswer || "";
        const rawAudio = a.audioUrl || "";
        const resolvedAudioUrl = rawAudio || (isAudioFile(rawAns) ? rawAns : "");
        const resolvedAnswerText = isAudioFile(rawAns) ? "" : rawAns;

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
        };
      });
    }
    return currentHomework?.answers || [];
  }, [currentSubmissionDetail, currentHomework]);

  const isSpeaking = useMemo(() => {
    if (!currentHomework) return false;
    const hwType = String(currentHomework.type || "").toLowerCase();
    const hwTitle = String(currentHomework.title || "").toLowerCase();
    const secType = String(currentSubmissionDetail?.exam?.sections?.[0]?.sectionType || "").toLowerCase();
    const examType = String(currentSubmissionDetail?.exam?.examType || "").toLowerCase();
    const hasAudio = resolvedAnswers.some((a) => (!!a.audioUrl && a.audioUrl.trim().length > 0) || isAudioFile(a.answerText));
    return (
      hwType === "speaking" ||
      secType === "speaking" ||
      examType === "speaking" ||
      hwTitle.includes("speaking") ||
      hasAudio
    );
  }, [currentHomework, currentSubmissionDetail, resolvedAnswers]);

  const slaStats = useMemo(() => {
    if (!currentStudent?.homeworkItems) {
      return { overdueCount: 0, approachingCount: 0, onTrackCount: 0, totalPending: 0, gradedCount: 0 };
    }
    const pendingItems = currentStudent.homeworkItems.filter((i: any) => i.status === "submitted");
    return summarizeSlaStats(pendingItems);
  }, [currentStudent]);

  const workbookSummary = useMemo(() => {
    if (!currentStudent) return { graded: 0, pending: 0, inProgress: 0, overdue: 0 };
    return {
      graded: currentStudent.gradedCount || 0,
      pending: currentStudent.pendingCount || 0,
      inProgress: currentStudent.unsubmittedCount || 0,
      overdue: slaStats.overdueCount,
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
      studentName: currentStudent?.fullName || "Học viên",
      className: currentClass?.name || "Lớp học",
      teacherName: currentClass?.teacher?.fullName || null,
      targetBand:
        currentStudent?.targetBand ||
        currentStudent?.target_band ||
        currentStudent?.targetScore ||
        currentClass?.target_band ||
        currentClass?.targetBand ||
        (currentClass?.course?.level ? `IELTS ${currentClass.course.level}` : null),
      programTitle: currentClass?.course?.title || currentClass?.name || null,
      periodFrom: classStartDate,
      periodTo: new Date(),
      courseProgress: {
        completedSessions: attendanceData?.completedSessions,
        totalSessions: attendanceData?.totalSessions,
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
        currentStudents: students.length || 6,
        maxStudents: currentClass?.room?.capacity || 10,
        classModel: (students.length || 6) <= 10 ? "Nhóm nhỏ tương tác cao" : "Lớp tiêu chuẩn",
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
    nextGoals: string[];
  }) => {
    if (!selectedClassId || !currentStudent?.id) return;
    try {
      await periodicReportsApi.save(selectedClassId, currentStudent.id, {
        strengths: evalData.strengths,
        weaknesses: evalData.weaknesses,
        recommendations: evalData.recommendations,
        nextGoals: evalData.nextGoals,
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
        await submissionsApi.grade(
          currentHomework.submissionId,
          payload.grades,
          payload.totalScore,
          payload.options
        );

        if (payload.options.finalize) {
          toast({
            title: "Đã trả bài thành công 🎉",
            description: `Đã lưu điểm cho học viên ${currentStudent.fullName}.${payload.options.revisionRequired ? " (Đã gửi yêu cầu sửa bài Attempt 2)" : ""}`,
          });

          refetchWorkspace();

          // 🟢 LOGIC TỰ ĐỘNG CHUYỂN BÀI CHỜ CHẤM THEO QUEUE (Cột 2 / Cột 1)
          const nextPendingInWorkbook = workbookItems.find(
            (h) => h.status === "submitted" && h.id !== currentHomework.id
          );

          if (nextPendingInWorkbook) {
            setSelectedHomeworkId(nextPendingInWorkbook.id);
          } else {
            // Nếu học viên hiện tại đã hết bài chờ chấm, nhảy sang học viên có bài chờ chấm tiếp theo trong Queue Cột 1
            const nextStudentWithPending = students.find(
              (s: any) => s.hasPending && s.id !== currentStudent.id
            );
            if (nextStudentWithPending) {
              setSelectedStudentId(nextStudentWithPending.id);
              setSelectedHomeworkId("");
            }
          }
        } else {
          toast({
            title: "Đã lưu nháp thành công 💾",
            description: "Điểm và nhận xét đã được lưu. Học viên chưa thấy kết quả cho đến khi Trả bài.",
          });
          refetchWorkspace();
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

  // Render Status Badge
  const renderStatusBadge = (item: WorkbookItem) => {
    if (item.isOverdue && item.status !== "graded" && item.status !== "submitted") {
      return (
        <Badge variant="outline" className="bg-slate-900 text-white border-slate-900 text-[10px]">
          ⚫ Quá hạn
        </Badge>
      );
    }

    switch (item.status) {
      case "graded":
        return (
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px]">
            🟢 Band {item.score ?? "6.5"} {item.submissionTiming?.isLate ? `(Trễ ${item.submissionTiming.lateDays}d)` : ""}
          </Badge>
        );
      case "submitted": {
        const sla = calculateGradingSla(item.submittedAt, null, "submitted");
        let badgeStyle = "bg-blue-50 text-blue-700 border-blue-200";
        if (sla.status === "OVERDUE") {
          badgeStyle = "bg-rose-50 text-rose-700 border-rose-200 font-bold";
        } else if (sla.status === "APPROACHING") {
          badgeStyle = "bg-amber-50 text-amber-800 border-amber-300 font-bold";
        }
        return (
          <Badge variant="outline" className={`text-[10px] ${badgeStyle}`} title={`Nộp: ${sla.formattedSubmitted} • Hạn SLA: ${sla.formattedDeadline}`}>
            {sla.badgeText}
          </Badge>
        );
      }
      case "in_progress":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-[10px]">
            🟡 Đang làm
          </Badge>
        );
      case "needs_revision":
        return (
          <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200 text-[10px]">
            🔴 Cần sửa
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200 text-[10px]">
            ⚪ Chưa làm
          </Badge>
        );
    }
  };

  // 🌟 FOCUS GRADING MODE: DÀNH 100% DIỆN TÍCH CHO VIỆC ĐỌC BÀI VÀ CHẤM BÀI (ẨN HOÀN TOÀN HEADER CỦA WORKSPACE) 🌟
  if (isFocusMode && currentStudent && currentHomework && currentHomework.submissionId && currentHomework.status !== "unsubmitted") {
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
            isSubmitting={isSubmitting}
            onBack={() => setIsFocusMode(false)}
            onGradeSubmit={handleGradeSubmit}
          />
        ) : (
          <WritingGrader
            submissionId={currentHomework.submissionId}
            studentName={currentStudent.fullName}
            className={currentClass?.name || "Lớp IELTS"}
            homeworkTitle={currentHomework.title}
            submissionStatus={currentHomework.status}
            submittedAt={currentHomework.submittedAt}
            answers={resolvedAnswers}
            isSubmitting={isSubmitting}
            onBack={() => setIsFocusMode(false)}
            onGradeSubmit={handleGradeSubmit}
          />
        )}
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* 🟢 HEADER TIÊU CHUẨN (CHỈ HIỆN TRONG CHẾ ĐỘ 3 CỘT) */}
      <header className="bg-white border-b border-slate-200 px-6 py-3 shrink-0 flex items-center justify-between shadow-2xs z-10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-50 border border-blue-100 text-blue-600">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-slate-900 tracking-tight">Teacher Workspace</h1>
              <p className="text-[11px] text-slate-500">Sổ bài tập & Chấm bài Học viên</p>
            </div>
          </div>

          <div className="h-6 w-[1px] bg-slate-200 mx-1" />

          {/* Bộ chọn Lớp học */}
          <div className="flex items-center gap-2">
            <School className="h-4 w-4 text-slate-400" />
            <Select value={selectedClassId} onValueChange={(val) => {
              setSelectedClassId(val);
              setSelectedStudentId("");
              setSelectedHomeworkId("");
            }}>
              <SelectTrigger className="w-[260px] h-9 text-xs font-semibold bg-slate-50 border-slate-200">
                <SelectValue placeholder="Chọn Lớp học phụ trách..." />
              </SelectTrigger>
              <SelectContent>
                {classes.map((c: any) => (
                  <SelectItem key={c.id} value={c.id} className="text-xs">
                    {c.name} {c.target_band ? `(Target Band ${c.target_band})` : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => refetchWorkspace()} className="h-8 text-xs text-slate-500 hover:text-slate-900">
            <RefreshCw className="h-3.5 w-3.5 mr-1" />
            Làm mới
          </Button>
        </div>
      </header>

      {/* 📐 BỐ CỤC 3 CỘT SINGLE-SCREEN WORKBOOK VIEWER */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* ========================================================================= */}
        {/* CỘT 1: DANH SÁCH HỌC VIÊN TRONG LỚP (KÈM CHỈ SỐ TIẾN ĐỘ 12/27)            */}
        {/* ========================================================================= */}
          <div className="w-1/4 min-w-[260px] max-w-[320px] bg-white border-r border-slate-200 flex flex-col justify-between overflow-hidden">
            <div className="p-3.5 border-b border-slate-100 space-y-2.5 shrink-0 bg-slate-50/50">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 tracking-tight flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-blue-600" />
                  Học viên ({filteredStudents.length})
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => setStudentFilter("all")}
                    className={`text-[10px] font-medium px-2 py-0.5 rounded-md border transition-all ${
                      studentFilter === "all"
                        ? "bg-slate-800 text-white border-slate-800"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    Tất cả
                  </button>
                  <button
                    onClick={() => setStudentFilter("pending")}
                    className={`text-[10px] font-medium px-2 py-0.5 rounded-md border transition-all ${
                      studentFilter === "pending"
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-blue-600 border-blue-200 hover:bg-blue-50"
                    }`}
                  >
                    Bài chờ 🔴
                  </button>
                </div>
              </div>
            </div>

            {/* List Học viên */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {filteredStudents.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400">Không có học viên phù hợp</div>
              ) : (
                filteredStudents.map((st: any) => {
                  const isSelected = st.id === selectedStudentId;
                  return (
                    <div
                      key={st.id}
                      onClick={() => {
                        setSelectedStudentId(st.id);
                        setSelectedHomeworkId("");
                      }}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? "bg-blue-50/70 border-blue-200 shadow-xs"
                          : "bg-white border-transparent hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Avatar className="h-8 w-8 rounded-lg border border-slate-200 shrink-0">
                          <AvatarImage src={st.avatarUrl} />
                          <AvatarFallback className="bg-slate-100 text-slate-700 text-xs font-bold">
                            {st.fullName?.slice(0, 2).toUpperCase() || "HV"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 truncate">{st.fullName}</p>
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium mt-0.5">
                            <span>{st.gradedCount + st.pendingCount} / {st.totalAssignedCount} bài</span>
                            {st.pendingCount > 0 && (
                              <span className="text-blue-600 font-bold">• {st.pendingCount} chờ</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {st.hasPending && (
                        <span className="h-2 w-2 rounded-full bg-rose-500 shrink-0 ring-2 ring-rose-100" />
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CỘT 2: SỔ BÀI TẬP WORKBOOK (BUỔI HỌC & TRẠNG THÁI NỘP BÀI)                 */}
          {/* ========================================================================= */}
          <div className="w-1/3 min-w-[320px] max-w-[420px] bg-slate-50/30 border-r border-slate-200 flex flex-col justify-between overflow-hidden">
            <div className="p-3.5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between shrink-0">
              <div>
                <span className="text-xs font-bold text-slate-800 tracking-tight flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5 text-blue-600" />
                  Sổ Bài Tập {currentStudent ? `— ${currentStudent.fullName}` : ""}
                </span>
                <span className="text-[10px] text-slate-500">
                  {currentStudent ? "Danh sách bài tập được giao" : "Chọn học viên để xem bài"}
                </span>
              </div>

              {/* Status counter indicators */}
              <div className="flex items-center gap-1.5 text-[10px] font-mono">
                {slaStats.totalPending > 0 ? (
                  <>
                    {slaStats.overdueCount > 0 && (
                      <span className="px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 font-bold" title="Quá hạn SLA 7 ngày">
                        🔴 {slaStats.overdueCount} quá hạn
                      </span>
                    )}
                    {slaStats.approachingCount > 0 && (
                      <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-300 font-bold" title="Sắp đến hạn SLA (≤ 2 ngày)">
                        ⚠️ {slaStats.approachingCount} sắp hạn
                      </span>
                    )}
                    {slaStats.onTrackCount > 0 && (
                      <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium" title="Trong hạn SLA (> 2 ngày)">
                        ⏱ {slaStats.onTrackCount} trong hạn
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold" title="Đã chấm">
                      🟢 {workbookSummary.graded}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200" title="Chưa làm">
                      ⚪ {workbookSummary.inProgress}
                    </span>
                  </>
                )}
                {currentStudent && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsReportModalOpen(true)}
                    className="h-6 text-[10px] font-bold px-2 ml-1 text-blue-700 border-blue-200 hover:bg-blue-50 gap-1 shadow-2xs"
                  >
                    <Award className="h-3 w-3" />
                    Báo cáo
                  </Button>
                )}
              </div>
            </div>

            {/* List Buổi học & Bài tập trong Sổ */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {!currentStudent ? (
                <div className="p-8 text-center text-xs text-slate-400">
                  Chọn học viên bên trái để xem sổ bài tập.
                </div>
              ) : groupedWorkbook.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400">
                  Không có bài tập nào được giao cho học viên này.
                </div>
              ) : (
                groupedWorkbook.map((group) => (
                  <div key={group.lessonNumber} className="space-y-1.5">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-200/60 px-2.5 py-1 rounded-md">
                      📖 BUỔI {group.lessonNumber}: KỸ NĂNG {group.items[0]?.type.toUpperCase()}
                    </div>

                    <div className="space-y-1">
                      {group.items.map((item) => {
                        const isSelected = item.id === selectedHomeworkId;
                        const isReopenOpen = reopenTargetId === item.id;

                        return (
                          <div
                            key={item.id}
                            onClick={() => setSelectedHomeworkId(item.id)}
                            className={`p-2.5 rounded-xl border transition-all cursor-pointer space-y-1.5 ${
                              isSelected
                                ? "bg-white border-blue-500 shadow-sm ring-1 ring-blue-500/20"
                                : "bg-white/80 border-slate-200/80 hover:bg-white hover:border-slate-300"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-slate-800 truncate max-w-[200px]">
                                {item.title}
                              </span>
                              {renderStatusBadge(item)}
                            </div>

                            {/* Dòng Quá hạn -> nút Gia hạn mở Inline */}
                            {item.isOverdue && item.status !== "graded" && item.status !== "submitted" && (
                              <div className="text-[10px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-100">
                                <span>Hạn: {item.dueDate}</span>
                                {!isReopenOpen ? (
                                  <button
                                    onClick={() => setReopenTargetId(item.id)}
                                    className="text-blue-600 font-bold hover:underline"
                                  >
                                    [Gia hạn]
                                  </button>
                                ) : (
                                  <div className="flex items-center gap-1 bg-slate-50 p-1 rounded border border-slate-200">
                                    <Input
                                      type="date"
                                      value={reopenDate}
                                      onChange={(e) => setReopenDate(e.target.value)}
                                      className="h-6 text-[9px] w-24 bg-white"
                                    />
                                    <Button size="sm" onClick={() => handleConfirmReopen(item)} className="h-6 text-[9px] px-2 bg-slate-900 text-white">
                                      Lưu
                                    </Button>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CỘT 3: PREVIEW & XEM KHÁI QUÁT BÀI NỘP / KẾT QUẢ ĐÃ CHẤM                  */}
          {/* ========================================================================= */}
          <div className="flex-1 bg-white flex flex-col justify-between overflow-hidden">
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
                onOpenFocusMode={() => setIsFocusMode(true)}
              />
            )}
          </div>
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

