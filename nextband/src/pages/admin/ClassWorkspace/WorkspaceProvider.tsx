import React, { createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { classesApi, sessionsApi, examsApi, submissionsApi, normalizeSession, lessonsApi } from "@/lib/api";
import { resolveEffectiveDeadline } from "@/lib/homeworkStatusHelper";

interface WorkspaceContextType {
  classId: string;
  classData: any;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  refetchClass: () => void;
  currentHomework: number;
  totalHomeworks: number;
  progressPercent: number;
  pendingReviewsCount: number;
  overdueCount: number;
  isAddStudentModalOpen: boolean;
  setIsAddStudentModalOpen: (open: boolean) => void;
  openAddStudentModal: () => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export const WorkspaceProvider: React.FC<{
  classId: string;
  children: React.ReactNode;
}> = ({ classId, children }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);

  const {
    data: classData,
    isLoading,
    isError,
    error,
    refetch: refetchClass,
  } = useQuery({
    queryKey: ["admin-class-workspace", classId],
    queryFn: async () => {
      const [cls, rawSessions] = await Promise.all([
        classesApi.getById(classId),
        sessionsApi.list(classId),
      ]);

      // Single-point normalization of sessions
      const canonicalSessions = (rawSessions || []).map(normalizeSession);

      // Single canonical mapping for students from class_students / profiles
      const canonicalStudents = cls.students || cls.class_students || [];
      const activeStudents = canonicalStudents.filter(
        (s: any) => s.isActive !== false && s.status !== "suspended" && s.status !== "inactive"
      );

      // Fetch course homeworks/exams and class-specific deadlines
      let lessons: any[] = [];
      const targetCourseId = cls.courseId || cls.course_id;
      if (targetCourseId) {
        try {
          const [lessonRes, examRes] = await Promise.all([
            lessonsApi.getClassLessons(classId).catch((err) => {
              console.warn("[WorkspaceProvider] lessonsApi.getClassLessons warning:", err);
              return null;
            }),
            examsApi.list({ courseId: targetCourseId, limit: 100 }).catch((err) => {
              console.warn("[WorkspaceProvider] examsApi.list warning:", err);
              return { data: [] };
            }),
          ]);

          const rawExams: any[] = examRes?.data || [];
          const projectionLessons: any[] = lessonRes?.data?.lessons || [];

          if (rawExams.length > 0) {
            lessons = rawExams.map((exam: any, idx: number) => {
              const matchedProj = projectionLessons.find((p: any) => p.id === exam.id);
              const lessonOrder = exam.week || (idx + 1);

              let effectiveDeadline = matchedProj?.homework?.deadline;
              let deadlineSource = matchedProj?.homework?.deadlineSource || "AUTO";

              const matchingSession = canonicalSessions.find(
                (s: any) => s.sessionNumber === lessonOrder || s.examId === exam.id || s.lessonId === exam.id
              );
              const sessionDate =
                (matchingSession as any)?.scheduledDate ||
                (matchingSession as any)?.plannedDate ||
                (matchingSession as any)?.sessionDate ||
                null;

              if (!effectiveDeadline) {
                const auto = resolveEffectiveDeadline({
                  classStartDate: cls.startDate || cls.start_date || cls.createdAt || cls.created_at,
                  sessionDate,
                  lessonWeek: lessonOrder,
                  defaultOffsetDays: 7,
                });
                effectiveDeadline = auto.effectiveDeadline;
                deadlineSource = auto.deadlineSource;
              }

              return {
                ...exam,
                week: lessonOrder,
                lessonOrder,
                deadline: effectiveDeadline,
                deadlineSource,
                homework: {
                  id: exam.id,
                  title: exam.title,
                  deadline: effectiveDeadline,
                  deadlineSource,
                },
                exam_sections: exam.exam_sections || matchedProj?.exam_sections || matchedProj?.sections || [],
              };
            });
          } else if (projectionLessons.length > 0) {
            lessons = projectionLessons;
          }
        } catch (examErr) {
          console.warn("[WorkspaceProvider] Could not fetch exams/lessons:", examErr);
        }
      }

      // Fetch submissions for this class
      let submissions: any[] = [];
      try {
        const subRes = await submissionsApi.list({ classId, limit: 200 });
        submissions = subRes.data || [];
      } catch (subErr) {
        console.warn("[WorkspaceProvider] Could not fetch submissions:", subErr);
      }

      // Enrich activeStudents with live real-time metrics
      const enrichedActiveStudents = activeStudents.map((st: any) => {
        const studentId = st.studentId || st.student_id || st.id || st.userId;
        const studentSubs = submissions.filter(
          (s: any) => (s.studentId || s.student_id || s.userId) === studentId
        );

        // Submissions matched to published lessons
        const completedHw = studentSubs.filter(
          (s: any) =>
            s.status === "submitted" ||
            s.status === "graded" ||
            s.status === "SUBMITTED" ||
            s.status === "GRADED"
        ).length;

        // Structured homework items for Progress Strip
        const homeworkItems = lessons.map((lesson: any, i: number) => {
          const hwNumber = i + 1;
          const sub = studentSubs.find(
            (s: any) =>
              s.examId === lesson.id ||
              s.exam_id === lesson.id ||
              s.homework_id === lesson.id ||
              s.lesson_id === lesson.id
          );
          const isGraded = sub?.status === "graded" || sub?.status === "GRADED";
          const isSubmitted = sub?.status === "submitted" || sub?.status === "SUBMITTED" || isGraded;
          const isOverdue =
            !isSubmitted &&
            lesson.deadline &&
            new Date().getTime() > new Date(lesson.deadline).getTime();

          const status = isGraded || isSubmitted ? "done" : isOverdue ? "missed" : "pending";
          return {
            hwNumber,
            title: lesson.title || `Homework ${hwNumber}`,
            status,
            score: sub?.totalScore ?? sub?.total_score ?? null,
            examId: lesson.id,
          };
        });

        // Attendance stats
        const studentAttendances = canonicalSessions
          .map((sess: any) => {
            const att = (sess.attendance || []).find(
              (a: any) => (a.studentId || a.student_id) === studentId
            );
            return att?.status || "UNMARKED";
          })
          .filter((status: string) => status !== "UNMARKED");

        const presentCount = studentAttendances.filter(
          (stt: string) => stt === "PRESENT" || stt === "present"
        ).length;
        const totalMarked = studentAttendances.length;
        const attendanceRate =
          totalMarked > 0 ? Math.round((presentCount / totalMarked) * 100) : undefined;

        // Feedback history
        const feedbackHistory = studentSubs
          .filter((s: any) => s.feedback || s.teacherFeedback)
          .map((s: any) => ({
            hw: s.exam?.title || "Bài tập",
            date:
              s.gradedAt || s.createdAt
                ? new Date(s.gradedAt || s.createdAt).toLocaleDateString("vi-VN")
                : "",
            note: s.feedback || s.teacherFeedback,
          }));

        return {
          ...st,
          studentId,
          totalHomeworks: lessons.length,
          completedHw,
          homeworkItems,
          attendanceRate,
          feedbackHistory,
        };
      });

      return {
        ...cls,
        students: canonicalStudents,
        activeStudents: enrichedActiveStudents,
        studentCount: enrichedActiveStudents.length,
        sessions: canonicalSessions,
        lessons,
        submissions,
      };
    },
    enabled: !!classId,
  });

  const openAddStudentModal = () => setIsAddStudentModalOpen(true);

  const totalHomeworks = classData?.lessons?.length || 0;
  const activeStudentsList = classData?.activeStudents || [];
  const submissions = classData?.submissions || [];
  
  const pendingReviewsCount = submissions.filter(
    (s: any) => s.grade_status === "pending" || s.status === "submitted" || s.status === "SUBMITTED"
  ).length;

  const overdueCount = submissions.filter(
    (s: any) => s.status === "overdue" || s.status === "OVERDUE"
  ).length;

  const gradedSubmissionsCount = submissions.filter(
    (s: any) => s.grade_status === "graded" || s.status === "graded" || s.status === "GRADED"
  ).length;

  const currentHomework = totalHomeworks > 0 ? Math.min(gradedSubmissionsCount + 1, totalHomeworks) : 0;
  const totalAssigned = totalHomeworks * Math.max(1, activeStudentsList.length);
  const progressPercent = totalHomeworks > 0 && activeStudentsList.length > 0
    ? Math.round((gradedSubmissionsCount / totalAssigned) * 100)
    : 0;

  return (
    <WorkspaceContext.Provider
      value={{
        classId,
        classData,
        isLoading,
        isError,
        error: error as Error | null,
        activeTab,
        setActiveTab,
        refetchClass,
        currentHomework,
        totalHomeworks,
        progressPercent: Math.min(100, progressPercent),
        pendingReviewsCount,
        overdueCount,
        isAddStudentModalOpen,
        setIsAddStudentModalOpen,
        openAddStudentModal,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
};
