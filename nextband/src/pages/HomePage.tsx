import { useState, useMemo, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { classesApi, submissionsApi, lessonsApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { HomeworkEmptyState } from "@/components/homework/HomeworkEmptyState";
import { AnnouncementBanner } from "@/components/AnnouncementBanner";
import { useStudentLifecycle } from "@/hooks/useStudentLifecycle";
import {
  deriveCanonicalVisualStatus,
  deriveSubmissionTiming,
  formatDeadlineCountdown,
  formatVietnameseDeadline,
  sortStudentActionQueue,
  compareHomeworkOrder,
} from "@/lib/homeworkStatusHelper";
import { getHuanCoState } from "@/lib/huanCoState";
import { routes } from "@/lib/routes";
import { submissionKeys } from "@/lib/queryKeys";
import { HuanCoMascot } from "@/components/mascot/HuanCoMascot";
import { DisciplineScholarshipTracker } from "@/components/student/DisciplineScholarshipTracker";
import { isScholarshipEligible } from "@/lib/disciplineScholarshipHelper";
import { AcademicAscentWorld, AscentLessonNode } from "@/components/student/AcademicAscentWorld";
import { calculateStudentJourney, resolveCourseBands } from "@/lib/studentJourney";
import { calculateStudentStreak } from "@/lib/studentStreakHelper";
import { detectExamSkill, isObjectiveSkill } from "@/lib/examSkillHelper";
import { getCourseBrand } from "@/lib/courseBrand";
import {
  evaluateAllAchievedMilestones,
  selectHighestPriorityPendingMilestone,
  DecisionMilestone,
  CourseLessonItem,
  inferLessonSemanticType,
} from "@/lib/milestoneEngine";
import { CelebrationModal } from "@/components/celebration/CelebrationModal";
import { milestonesApi, attendanceApi } from "@/lib/api";
import { ExamGoalCard } from "@/components/student/ExamGoalCard";
import { Badge } from "@/components/ui/badge";
import { useSeasonalEvent } from "@/features/seasonal/hooks/useSeasonalEvent";
import {
  Layers,
  WifiOff,
  AlertCircle,
  RefreshCw,
  Calendar,
  Clock,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Trophy,
  Award,
  ExternalLink,
  FileCheck,
} from "lucide-react";


// ─── Lifecycle-derived sub-views ─────────────────────────────────────────────

function LifecycleLoadingSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-36 rounded-2xl bg-slate-200" />
      <div className="h-44 rounded-2xl bg-slate-200" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-56 rounded-2xl bg-slate-200" />
        <div className="h-56 rounded-2xl bg-slate-200" />
      </div>
    </div>
  );
}

function LifecycleErrorBanner({
  icon,
  title,
  message,
  onRetry,
}: {
  icon: React.ReactNode;
  title: string;
  message: string;
  onRetry: () => void;
}) {
  return (
    <Card className="rounded-2xl border border-destructive/20 bg-destructive/5 p-8 flex flex-col items-center justify-center gap-4 text-center min-h-[220px]">
      <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
        {icon}
      </div>
      <div className="space-y-1.5 max-w-sm">
        <h2 className="text-base font-extrabold text-foreground">{title}</h2>
        <p className="text-xs text-muted-foreground leading-relaxed">{message}</p>
      </div>
      <Button
        onClick={onRetry}
        variant="outline"
        size="sm"
        className="gap-2 border-destructive/30 text-destructive hover:bg-destructive/10 font-bold"
      >
        <RefreshCw className="h-3.5 w-3.5" />
        Thử lại
      </Button>
    </Card>
  );
}

function getCourseCardTheme(brandKey: string) {
  switch (brandKey) {
    case "starter":
      return {
        cardBorder: "border-2 border-fuchsia-200/90 hover:border-fuchsia-300 dark:border-fuchsia-800/80 shadow-sm shadow-fuchsia-500/5",
        cardBg: "bg-gradient-to-br from-white via-white to-fuchsia-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-fuchsia-950/20",
        topLine: "bg-gradient-to-r from-fuchsia-500 to-pink-400",
        headerBorder: "border-fuchsia-100 dark:border-fuchsia-900/40",
        badge: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200/80 dark:bg-fuchsia-950/60 dark:text-fuchsia-300 dark:border-fuchsia-800",
        badgePill: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200/80 dark:bg-fuchsia-950/60 dark:text-fuchsia-300 dark:border-fuchsia-800",
        pulseDot: "bg-fuchsia-500",
        icon: "text-fuchsia-600 dark:text-fuchsia-400",
        primaryButton: "bg-fuchsia-600 hover:bg-fuchsia-700 text-white shadow-xs shadow-fuchsia-600/20",
        secondaryButton: "border-fuchsia-200 text-fuchsia-700 hover:bg-fuchsia-50 hover:border-fuchsia-300 dark:border-fuchsia-800 dark:text-fuchsia-300 dark:hover:bg-fuchsia-950/40",
        accentText: "text-fuchsia-700 dark:text-fuchsia-300",
      };
    case "dreamer":
      return {
        cardBorder: "border-2 border-blue-200/90 hover:border-blue-300 dark:border-blue-800/80 shadow-sm shadow-blue-500/5",
        cardBg: "bg-gradient-to-br from-white via-white to-blue-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950/20",
        topLine: "bg-gradient-to-r from-blue-500 to-sky-400",
        headerBorder: "border-blue-100 dark:border-blue-900/40",
        badge: "bg-blue-50 text-blue-700 border-blue-200/80 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800",
        badgePill: "bg-blue-50 text-blue-700 border-blue-200/80 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800",
        pulseDot: "bg-blue-500",
        icon: "text-blue-600 dark:text-blue-400",
        primaryButton: "bg-blue-600 hover:bg-blue-700 text-white shadow-xs shadow-blue-600/20",
        secondaryButton: "border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-950/40",
        accentText: "text-blue-700 dark:text-blue-300",
      };
    case "builder":
      return {
        cardBorder: "border-2 border-orange-200/90 hover:border-orange-300 dark:border-orange-800/80 shadow-sm shadow-orange-500/5",
        cardBg: "bg-gradient-to-br from-white via-white to-orange-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-orange-950/20",
        topLine: "bg-gradient-to-r from-orange-500 to-amber-400",
        headerBorder: "border-orange-100 dark:border-orange-900/40",
        badge: "bg-orange-50 text-orange-700 border-orange-200/80 dark:bg-orange-950/60 dark:text-orange-300 dark:border-orange-800",
        badgePill: "bg-orange-50 text-orange-700 border-orange-200/80 dark:bg-orange-950/60 dark:text-orange-300 dark:border-orange-800",
        pulseDot: "bg-orange-500",
        icon: "text-orange-600 dark:text-orange-400",
        primaryButton: "bg-orange-600 hover:bg-orange-700 text-white shadow-xs shadow-orange-600/20",
        secondaryButton: "border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-300 dark:border-orange-800 dark:text-orange-300 dark:hover:bg-orange-950/40",
        accentText: "text-orange-700 dark:text-orange-300",
      };
    case "master":
      return {
        cardBorder: "border-2 border-emerald-200/90 hover:border-emerald-300 dark:border-emerald-800/80 shadow-sm shadow-emerald-500/5",
        cardBg: "bg-gradient-to-br from-white via-white to-emerald-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/20",
        topLine: "bg-gradient-to-r from-emerald-500 to-teal-400",
        headerBorder: "border-emerald-100 dark:border-emerald-900/40",
        badge: "bg-emerald-50 text-emerald-700 border-emerald-200/80 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800",
        badgePill: "bg-emerald-50 text-emerald-700 border-emerald-200/80 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800",
        pulseDot: "bg-emerald-500",
        icon: "text-emerald-600 dark:text-emerald-400",
        primaryButton: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs shadow-emerald-600/20",
        secondaryButton: "border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 dark:border-emerald-800 dark:text-emerald-300 dark:hover:bg-emerald-950/40",
        accentText: "text-emerald-700 dark:text-emerald-300",
      };
    case "leader":
      return {
        cardBorder: "border-2 border-rose-200/90 hover:border-rose-300 dark:border-rose-800/80 shadow-sm shadow-rose-500/5",
        cardBg: "bg-gradient-to-br from-white via-white to-rose-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-rose-950/20",
        topLine: "bg-gradient-to-r from-rose-500 to-red-400",
        headerBorder: "border-rose-100 dark:border-rose-900/40",
        badge: "bg-rose-50 text-rose-700 border-rose-200/80 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800",
        badgePill: "bg-rose-50 text-rose-700 border-rose-200/80 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800",
        pulseDot: "bg-rose-500",
        icon: "text-rose-600 dark:text-rose-400",
        primaryButton: "bg-rose-600 hover:bg-rose-700 text-white shadow-xs shadow-rose-600/20",
        secondaryButton: "border-rose-200 text-rose-700 hover:bg-rose-50 hover:border-rose-300 dark:border-rose-800 dark:text-rose-300 dark:hover:bg-rose-950/40",
        accentText: "text-rose-700 dark:text-rose-300",
      };
    case "entrance_thpt":
      return {
        cardBorder: "border-2 border-amber-200/90 hover:border-amber-300 dark:border-amber-800/80 shadow-sm shadow-amber-500/5",
        cardBg: "bg-gradient-to-br from-white via-white to-amber-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-amber-950/20",
        topLine: "bg-gradient-to-r from-amber-500 to-yellow-400",
        headerBorder: "border-amber-100 dark:border-amber-900/40",
        badge: "bg-amber-50 text-amber-700 border-amber-200/80 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800",
        badgePill: "bg-amber-50 text-amber-700 border-amber-200/80 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800",
        pulseDot: "bg-amber-500",
        icon: "text-amber-600 dark:text-amber-400",
        primaryButton: "bg-amber-600 hover:bg-amber-700 text-white shadow-xs shadow-amber-600/20",
        secondaryButton: "border-amber-200 text-amber-700 hover:bg-amber-50 hover:border-amber-300 dark:border-amber-800 dark:text-amber-300 dark:hover:bg-amber-950/40",
        accentText: "text-amber-700 dark:text-amber-300",
      };
    case "luyen_thi_thpt":
      return {
        cardBorder: "border-2 border-teal-200/90 hover:border-teal-300 dark:border-teal-800/80 shadow-sm shadow-teal-500/5",
        cardBg: "bg-gradient-to-br from-white via-white to-teal-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-teal-950/20",
        topLine: "bg-gradient-to-r from-teal-500 to-emerald-400",
        headerBorder: "border-teal-100 dark:border-teal-900/40",
        badge: "bg-teal-50 text-teal-700 border-teal-200/80 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800",
        badgePill: "bg-teal-50 text-teal-700 border-teal-200/80 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800",
        pulseDot: "bg-teal-500",
        icon: "text-teal-600 dark:text-teal-400",
        primaryButton: "bg-teal-600 hover:bg-teal-700 text-white shadow-xs shadow-teal-600/20",
        secondaryButton: "border-teal-200 text-teal-700 hover:bg-teal-50 hover:border-teal-300 dark:border-teal-800 dark:text-teal-300 dark:hover:bg-teal-950/40",
        accentText: "text-teal-700 dark:text-teal-300",
      };
    default:
      return {
        cardBorder: "border-2 border-indigo-200/90 hover:border-indigo-300 dark:border-indigo-800/80 shadow-sm shadow-indigo-500/5",
        cardBg: "bg-gradient-to-br from-white via-white to-indigo-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/20",
        topLine: "bg-gradient-to-r from-indigo-500 to-blue-400",
        headerBorder: "border-indigo-100 dark:border-indigo-900/40",
        badge: "bg-indigo-50 text-indigo-700 border-indigo-200/80 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800",
        badgePill: "bg-indigo-50 text-indigo-700 border-indigo-200/80 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800",
        pulseDot: "bg-indigo-500",
        icon: "text-indigo-600 dark:text-indigo-400",
        primaryButton: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs shadow-indigo-600/20",
        secondaryButton: "border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-300 dark:border-indigo-800 dark:text-indigo-300 dark:hover:bg-indigo-950/40",
        accentText: "text-indigo-700 dark:text-indigo-300",
      };
  }
}

// ─── Main Student Command Center ──────────────────────────────────────────────

export default function HomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { state, enrollments, lifecycleError, retry } = useStudentLifecycle();

  const [selectedClassIndex, setSelectedClassIndex] = useState(0);
  const enrolledClass = enrollments[selectedClassIndex] ?? enrollments[0];
  const enrolledClassId = enrolledClass?.classId;
  const activeClassName = enrolledClass?.className ?? "Lớp học cá nhân";
  const courseTitle = enrolledClass?.courseTitle ?? "IELTS";

  const {
    isEventActive: isSeasonalActive,
    activeEvent: seasonalActiveEvent,
    uiConfig: seasonalUiConfig,
    theme: seasonalTheme,
  } = useSeasonalEvent();

  // KPI submissions — only load when ENROLLED
  const { data: submissionsData } = useQuery({
    queryKey: submissionKeys.kpis(user?.id),
    queryFn: () => submissionsApi.list({ studentId: user?.id, limit: 50 }).catch(() => ({ data: [] })),
    enabled: !!user?.id && state === "ENROLLED",
    staleTime: 1000 * 60 * 3,
    refetchOnWindowFocus: false,
  });

  const userSubmissions = useMemo(() => {
    return Array.isArray(submissionsData?.data) ? submissionsData.data : [];
  }, [submissionsData?.data]);
  const submittedCount = userSubmissions.filter((s: any) =>
    isScholarshipEligible(s)
  ).length;
  const gradedCount = userSubmissions.filter((s: any) =>
    ["graded", "GRADED"].includes(s.status)
  ).length;
  const pendingCount = userSubmissions.filter((s: any) =>
    ["submitted", "SUBMITTED"].includes(s.status)
  ).length;

  // Lộ trình bài tập lớp học để suy ra Hàng đợi Hành động (Action Queue)
  const { data: classLessonData } = useQuery({
    queryKey: ["class-lessons-action-queue", enrolledClassId],
    queryFn: () => lessonsApi.getClassLessons(enrolledClassId || ""),
    enabled: !!enrolledClassId && state === "ENROLLED",
    staleTime: 1000 * 60 * 3,
    refetchOnWindowFocus: false,
  });

  const rawLessons = classLessonData?.data?.lessons;

  // Hàng đợi hành động 4 tầng ưu tiên: Revision > Overdue > Due Soon > Upcoming
  const actionQueue = useMemo(() => {
    const sortedLessons = [...(rawLessons || [])].sort(compareHomeworkOrder);
    const formatted = sortedLessons.map((item: any, idx: number) => {
      const sub = userSubmissions.find((s: any) => (s.examId || s.exam_id) === item.id) || item.submission;
      const deadline = item.homework?.deadline;
      const status = deriveCanonicalVisualStatus({
        submissionStatus: sub?.status,
        revisionRequired: sub?.revisionRequired,
        deadline,
      });
      const countdown = formatDeadlineCountdown(deadline);
      const submissionTiming = deriveSubmissionTiming(sub?.submittedAt || sub?.createdAt, deadline);

      return {
        id: item.id,
        examId: item.id,
        title: item.title || `Bài tập Buổi ${idx + 1}`,
        description: item.description,
        status,
        deadline,
        countdown,
        submissionTiming,
        submission: sub,
      };
    });

    return sortStudentActionQueue(formatted);
  }, [rawLessons, userSubmissions]);

  // Full 27-Node Academic Ascent World Mapping
  const ascentLessons = useMemo<AscentLessonNode[]>(() => {
    const sortedLessons = [...(rawLessons || [])].sort(compareHomeworkOrder);
    return sortedLessons.map((item: any, idx: number) => {
      const sub = userSubmissions.find((s: any) => (s.examId || s.exam_id) === item.id) || item.submission;
      const deadline = item.homework?.deadline;
      const status = deriveCanonicalVisualStatus({
        submissionStatus: sub?.status,
        revisionRequired: sub?.revisionRequired,
        deadline,
      });
      const chapterIndex = (idx < 9 ? 1 : idx < 18 ? 2 : 3) as 1 | 2 | 3;
      const chapterTitle = idx < 9 ? "FOUNDATION" : idx < 18 ? "CORE SKILLS" : "PERFORMANCE";
      const deadlineText = deadline ? formatVietnameseDeadline(deadline) : undefined;

      return {
        id: item.id,
        examId: item.id,
        order: idx + 1,
        title: item.title || `Bài tập Buổi ${idx + 1}`,
        description: item.description,
        status,
        estimatedMinutes: 35,
        chapterIndex,
        chapterTitle,
        isMilestone: (idx + 1) % 9 === 0,
        deadlineText,
        submission: sub,
      };
    });
  }, [rawLessons, userSubmissions]);

  // Authoritative Course Band Mapping (Starter: 0-3.0, Dreamer: 3.0-4.0, Builder: 4.0-5.0, Master: 5.0-6.0, Leader: 6.0-6.5+)
  const courseBands = useMemo(() => {
    return resolveCourseBands(courseTitle, activeClassName, enrolledClass?.courseId);
  }, [courseTitle, activeClassName, enrolledClass?.courseId]);

  // Course Brand & Card Visual Theme
  const courseBrand = useMemo(() => {
    return getCourseBrand({
      title: courseTitle,
      name: activeClassName,
      courseId: enrolledClass?.courseId,
    });
  }, [courseTitle, activeClassName, enrolledClass?.courseId]);

  const cardTheme = useMemo(() => {
    return getCourseCardTheme(courseBrand.key);
  }, [courseBrand.key]);

  // ARIS Student Journey calculations
  const journey = useMemo(() => {
    return calculateStudentJourney(
      userSubmissions,
      courseBands.entryBand,
      courseBands.targetBand,
      courseBands.entryBand
    );
  }, [userSubmissions, courseBands]);

  // Offline Recovery Milestone Trigger
  const [recoveryMilestone, setRecoveryMilestone] = useState<DecisionMilestone | null>(null);

  useEffect(() => {
    if (!user?.id || !rawLessons || rawLessons.length === 0 || recoveryMilestone) return;

    const lessons: CourseLessonItem[] = rawLessons.map((item: any, idx: number) => {
      const sub = userSubmissions.find((s: any) => (s.examId || s.exam_id) === item.id) || item.submission;
      const isCompleted = sub && ["submitted", "SUBMITTED", "graded", "GRADED"].includes(sub.status);
      const weekGroup = item.week || Math.ceil((idx + 1) / 3);
      const semanticType = inferLessonSemanticType(item.title, idx + 1, rawLessons.length);

      return {
        id: item.id,
        title: item.title || `Lesson ${idx + 1}`,
        semanticType,
        weekGroup,
        orderInWeek: ((idx) % 3) + 1,
        isCompleted: !!isCompleted,
      };
    });

    const allAchieved = evaluateAllAchievedMilestones({
      courseId: enrolledClassId || "home",
      lessons,
    });

    milestonesApi.getClaims().then((claimedList) => {
      const claimedSet = new Set(claimedList);
      const pending = selectHighestPriorityPendingMilestone(allAchieved, claimedSet);
      if (pending) {
        milestonesApi.claim(pending.key).then((res) => {
          if (res.isFirstClaim) {
            setRecoveryMilestone(pending);
          }
        });
      }
    }).catch(() => {
      // Safe fallback for milestone errors
    });
  }, [user?.id, rawLessons, userSubmissions, enrolledClassId, recoveryMilestone]);

  // Attendance & Schedule Matrix query
  const { data: attendanceData } = useQuery({
    queryKey: ["class-attendance-home", enrolledClassId],
    queryFn: () => attendanceApi.getAttendanceMatrix(enrolledClassId || ""),
    enabled: !!enrolledClassId && state === "ENROLLED",
    staleTime: 1000 * 60 * 3,
    refetchOnWindowFocus: false,
  });

  const studentAttendanceRecord = attendanceData?.success
    ? (attendanceData?.data?.students?.find((s: any) => s.studentId === user?.id) || attendanceData?.data?.students?.[0] || null)
    : null;
  const completedSessions = attendanceData?.data?.completedSessions ?? (attendanceData?.data?.sessions?.filter((s: any) => s.status === "COMPLETED").length || 0);
  const hasAttendanceStarted = completedSessions > 0;
  const attendanceRate = hasAttendanceStarted ? (studentAttendanceRecord?.attendanceRate ?? 100) : null;
  const totalSessions = attendanceData?.data?.totalSessions || attendanceData?.data?.sessions?.length || 27;
  const courseProgressPercent = Math.min(100, Math.round((completedSessions / Math.max(totalSessions, 1)) * 100));
  const nextSession = useMemo(() => {
    if (!attendanceData?.data?.sessions) return null;
    const now = new Date();
    return attendanceData.data.sessions.find((s: any) => {
      const d = s.sessionDate ? new Date(s.sessionDate) : null;
      return s.status !== "COMPLETED" && (!d || d >= now);
    }) || attendanceData.data.sessions.find((s: any) => s.status !== "COMPLETED") || attendanceData.data.sessions[0];
  }, [attendanceData]);

  // Daily Streak Engine
  const streak = useMemo(() => {
    return calculateStudentStreak(userSubmissions, user?.id);
  }, [userSubmissions, user?.id]);

  // Trạng thái sư phạm của Huyền Cơ Lão Nhân
  const huanCoState = useMemo(() => {
    return getHuanCoState({
      actionQueue,
      submittedCount,
      gradedCount,
      pendingCount,
      enrolledClassName: activeClassName,
      courseTitle,
      streakDays: streak.streakDays,
      currentBand: journey.currentBand,
    });
  }, [actionQueue, submittedCount, gradedCount, pendingCount, activeClassName, courseTitle, streak.streakDays, journey.currentBand]);

  // Bài tập được chấm/trả mới nhất của học viên
  const latestGradedSubmission = useMemo(() => {
    // Chỉ lấy bài nộp thực sự ĐÃ ĐƯỢC CHẤM ĐIỂM:
    // - Với trắc nghiệm / tự động chấm: status là GRADED và có kết quả câu hỏi
    // - Với tự luận (Writing, Speaking): bắt buộc giáo viên đã chấm (status là GRADED và có người chấm / nhận xét / criteriaScores)
    const validGradedSubs = userSubmissions.filter((s: any) => {
      const status = String(s.status || "").toUpperCase();
      if (status !== "GRADED") return false;

      const examId = s.examId || s.exam_id;
      const matchedLesson = (rawLessons || []).find((l: any) => l.id === examId);
      const examObj = s.exam || matchedLesson || { title: s.examTitle || "" };
      const skill = detectExamSkill(examObj);
      const isObjective = isObjectiveSkill(skill);

      if (isObjective) {
        // Tự động chấm: chỉ cần status GRADED và có số câu đúng hoặc điểm
        return s.correctAnswers != null || s.totalScore != null || s.score != null;
      } else {
        // Tự luận (Writing, Speaking): bắt buộc phải do giáo viên chấm điểm thực tế
        const hasTeacherGrading = !!(s.gradedBy || s.graded_by || s.feedback || s.criteriaScores);
        return hasTeacherGrading && (s.totalScore != null || s.score != null);
      }
    });

    if (validGradedSubs.length === 0) return null;

    // Sắp xếp theo ngày trả điểm / nộp gần nhất
    const sorted = [...validGradedSubs].sort((a: any, b: any) => {
      const timeA = new Date(a.gradedAt || a.graded_at || a.submittedAt || a.submitted_at || a.updatedAt || 0).getTime();
      const timeB = new Date(b.gradedAt || b.graded_at || b.submittedAt || b.submitted_at || b.updatedAt || 0).getTime();
      return timeB - timeA;
    });

    const latest = sorted[0];
    const examId = latest.examId || latest.exam_id;
    const matchedLesson = (rawLessons || []).find((l: any) => l.id === examId);
    const examObj = latest.exam || matchedLesson || { title: latest.examTitle || "" };
    const skill = detectExamSkill(examObj);
    const isObjective = isObjectiveSkill(skill);
    const isTeacherGraded = !isObjective && !!(latest.gradedBy || latest.graded_by || latest.feedback || latest.criteriaScores);

    const examTitle =
      latest.exam?.title ||
      latest.examTitle ||
      matchedLesson?.title ||
      "Bài tập vừa chấm";

    let scoreDisplay = "Đã chấm";
    let scoreSubtext = "";

    if (isObjective) {
      // Chấm tự động: Công bố số câu đúng / tổng số câu
      if (latest.correctAnswers != null && latest.totalQuestions != null && Number(latest.totalQuestions) > 0) {
        const correct = Number(latest.correctAnswers);
        const total = Number(latest.totalQuestions);
        scoreDisplay = `${correct}/${total} câu`;
      } else if (latest.correctAnswers != null) {
        scoreDisplay = `${latest.correctAnswers} câu đúng`;
      } else if (latest.totalScore != null || latest.score != null) {
        const scoreVal = Number(latest.totalScore ?? latest.score);
        scoreDisplay = `${scoreVal} câu đúng`;
      }
      scoreSubtext = "Hệ thống chấm tự động";
    } else {
      // Tự luận: Giáo viên chấm theo IELTS Band
      const bandVal = latest.totalScore != null ? Number(latest.totalScore) : (latest.score != null ? Number(latest.score) : null);
      if (bandVal != null && !isNaN(bandVal)) {
        scoreDisplay = `Band ${bandVal % 1 === 0 ? bandVal.toFixed(1) : bandVal}`;
      } else if (latest.totalScore != null) {
        scoreDisplay = String(latest.totalScore).startsWith("Band") ? latest.totalScore : `Band ${latest.totalScore}`;
      }
      scoreSubtext = "Giáo viên đã trả bài";
    }

    return {
      submissionId: latest.id,
      examId,
      examTitle,
      scoreDisplay,
      scoreSubtext,
      isTeacherGraded,
      isObjective,
      gradedAt: latest.gradedAt || latest.graded_at || latest.submittedAt || latest.submitted_at,
    };
  }, [userSubmissions, rawLessons]);

  // ── State machine render ─────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#1E293B] pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        <AnnouncementBanner scopeRole="student" />

        {/* LOADING */}
        {state === "LOADING" && <LifecycleLoadingSkeleton />}

        {/* NETWORK_ERROR */}
        {state === "NETWORK_ERROR" && (
          <LifecycleErrorBanner
            icon={<WifiOff className="h-6 w-6" />}
            title="Không thể kết nối tới máy chủ"
            message={
              lifecycleError?.message
                ? `Lỗi kết nối: ${lifecycleError.message}. Vui lòng kiểm tra kết nối mạng và thử lại.`
                : "Không thể kết nối tới máy chủ. Vui lòng kiểm tra kết nối mạng và thử lại."
            }
            onRetry={retry}
          />
        )}

        {/* API_ERROR */}
        {state === "API_ERROR" && (
          <LifecycleErrorBanner
            icon={<AlertCircle className="h-6 w-6" />}
            title="Không thể tải thông tin lớp học"
            message={
              lifecycleError?.httpStatus === 401
                ? "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại."
                : lifecycleError?.message
                ? `Lỗi máy chủ: ${lifecycleError.message}. Vui lòng thử lại sau.`
                : "Máy chủ gặp sự cố. Vui lòng thử lại sau."
            }
            onRetry={retry}
          />
        )}

        {/* PRE_ENROLLMENT */}
        {state === "PRE_ENROLLMENT" && (
          <HomeworkEmptyState state="NO_ENROLLMENT" />
        )}

        {/* ENROLLED — Full ARIS IELTS Command Center */}
        {state === "ENROLLED" && (
          <div className="space-y-6">
            {/* Seasonal Festive Welcome Banner (20/11 / Tết / Khai Giảng / Trung Thu) */}
            {isSeasonalActive && (
              <div className={`relative overflow-hidden rounded-2xl ${seasonalTheme.bannerGradient} text-white p-4 sm:p-5 shadow-sm border-2 ${seasonalTheme.bannerBorderColor} flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
                <div className="space-y-1 relative z-10">
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full ${seasonalTheme.bannerBadgeBg} border ${seasonalTheme.bannerBadgeBorder} text-[11px] font-black ${seasonalTheme.bannerBadgeText} uppercase tracking-wider`}>
                    <span>{seasonalTheme.icon}</span>
                    <span>{seasonalActiveEvent?.name || seasonalTheme.name}</span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-amber-100 tracking-tight">
                    {seasonalUiConfig.bannerTitle || seasonalTheme.bannerDefaultTitle}
                  </h2>
                  <p className="text-xs text-white/90 max-w-xl leading-relaxed">
                    {seasonalUiConfig.bannerSubtitle || seasonalTheme.bannerDefaultSubtitle}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0 relative z-10">
                  {enrolledClassId && (
                    <Button
                      size="sm"
                      onClick={() => navigate(`/app/class/${enrolledClassId}/lessons`)}
                      className={`${seasonalTheme.bannerActionBtnBg} ${seasonalTheme.bannerActionBtnText} font-black text-xs px-4 h-9 rounded-xl shadow-xs gap-1.5 cursor-pointer`}
                    >
                      <span>{seasonalTheme.bannerActionIcon} {seasonalTheme.bannerActionText}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>

                {/* Decorative background ambient accents */}
                <div className="absolute right-0 top-0 bottom-0 opacity-15 pointer-events-none text-9xl font-black select-none flex items-center pr-4">
                  {seasonalTheme.bannerWatermark}
                </div>
              </div>
            )}

            {/* Offline Recovery Milestone Celebration Modal */}
            {recoveryMilestone && user?.id && (
              <CelebrationModal
                milestone={recoveryMilestone}
                userId={user.id}
                onClose={() => setRecoveryMilestone(null)}
              />
            )}

            {/* Multi-Class Selector (if student has multiple active enrollments) */}
            {enrollments.length > 1 && (
              <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs shadow-xs">
                <span className="text-slate-500 font-medium flex items-center gap-1">
                  <Layers className="h-3.5 w-3.5 text-indigo-600" /> Đổi lớp học:
                </span>
                <div className="flex items-center gap-1.5 overflow-x-auto">
                  {enrollments.map((item, idx) => {
                    const isSelected = idx === selectedClassIndex;
                    return (
                      <Button
                        key={item.id}
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedClassIndex(idx)}
                        className={`h-6 text-xs rounded-full px-3 transition-all ${
                          isSelected
                            ? "bg-slate-900 text-white font-bold shadow-xs hover:bg-slate-800"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {item.className}
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 1.2 NEXT SESSION & ATTENDANCE QUICK SPOTLIGHT */}
            {enrolledClassId && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                {/* Next Class Session Spotlight */}
                <Card className={`relative overflow-hidden lg:col-span-6 p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between h-full shadow-xs ${cardTheme.cardBorder} ${cardTheme.cardBg}`}>
                  <div className={`absolute top-0 left-0 right-0 h-1.5 ${cardTheme.topLine}`} />
                  
                  {/* Card Header */}
                  <div className={`flex items-center justify-between pb-3 border-b ${cardTheme.headerBorder}`}>
                    <div className="flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${cardTheme.pulseDot} animate-pulse`} />
                      <span className={`text-xs font-bold uppercase tracking-wider ${cardTheme.accentText}`}>
                        Buổi Học Tiếp Theo · Lớp {activeClassName}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => navigate(`/app/class/${enrolledClassId}/lessons`)}
                      className={`h-7 text-xs font-bold gap-1 px-3 rounded-lg ${cardTheme.primaryButton}`}
                    >
                      <span>Vào Lớp Học</span>
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>

                  {/* Main Session Spotlight Info */}
                  <div className="py-3 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className={`font-black text-[11px] px-2.5 py-0.5 ${cardTheme.badge}`}>
                        Buổi {nextSession?.sessionNumber || (completedSessions + 1)} / {totalSessions}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-indigo-500" />
                        <span>
                          {nextSession?.sessionDate
                            ? `Ngày ${new Date(nextSession.sessionDate).toLocaleDateString("vi-VN", { weekday: "long", day: "2-digit", month: "2-digit", year: "numeric" })}`
                            : "Theo lịch xếp của lớp học"}
                        </span>
                      </span>
                    </div>

                    <h3 className="font-extrabold text-base sm:text-lg text-foreground leading-snug tracking-tight">
                      {nextSession?.lessonTitle || `Bài giảng buổi số ${nextSession?.sessionNumber || 1}: Củng cố và nâng cấp năng lực IELTS`}
                    </h3>

                    <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-muted-foreground/70 shrink-0" />
                      <span>{nextSession?.notes || "Chuẩn bị bài tập và tài liệu học tập trước khi vào lớp."}</span>
                    </p>
                  </div>

                  {/* Dual Telemetry Cards: Điểm số bài vừa chấm & Nút xem bài chấm */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-200/60 dark:border-slate-800/80">
                    {/* 1. Điểm số bài vừa chấm */}
                    <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/60 shadow-2xs space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                          <Trophy className="h-3.5 w-3.5 text-amber-500" />
                          Kết quả bài gần nhất
                        </span>
                        <span className={`font-black text-sm tabular-nums ${
                          latestGradedSubmission
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-slate-400"
                        }`}>
                          {latestGradedSubmission ? latestGradedSubmission.scoreDisplay : "Chưa có"}
                        </span>
                      </div>
                      <div className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 truncate" title={latestGradedSubmission?.examTitle || "Chưa có bài nào được chấm"}>
                        {latestGradedSubmission ? latestGradedSubmission.examTitle : "Chưa có bài nộp nào được chấm"}
                      </div>
                      <div className="text-[10px] text-muted-foreground font-medium flex items-center justify-between pt-0.5">
                        <span className="flex items-center gap-1">
                          <span className={`w-1.5 h-1.5 rounded-full ${latestGradedSubmission ? "bg-emerald-500" : "bg-slate-300"}`} />
                          {latestGradedSubmission
                            ? latestGradedSubmission.scoreSubtext || (latestGradedSubmission.isTeacherGraded ? "Giáo viên đã trả bài" : "Hệ thống chấm tự động")
                            : "Đang chờ nộp & chấm"}
                        </span>
                        {latestGradedSubmission?.gradedAt && (
                          <span>
                            {new Date(latestGradedSubmission.gradedAt).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" })}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* 2. Nút bấm truy cập thẳng vào bài làm vừa được chấm */}
                    <button
                      type="button"
                      disabled={!latestGradedSubmission}
                      onClick={() => {
                        if (latestGradedSubmission?.submissionId) {
                          navigate(`/app/submissions/${latestGradedSubmission.submissionId}`);
                        } else if (enrolledClassId) {
                          navigate(`/app/class/${enrolledClassId}/lessons`);
                        }
                      }}
                      className={`p-3 rounded-xl border shadow-2xs text-left transition-all space-y-1.5 ${
                        latestGradedSubmission
                          ? "bg-gradient-to-br from-indigo-50/70 via-white to-purple-50/40 dark:from-slate-800 dark:to-indigo-950/30 border-indigo-200 dark:border-indigo-800 hover:border-indigo-400 hover:shadow-xs cursor-pointer group"
                          : "bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-700/40 opacity-75 cursor-default"
                      }`}
                      title={latestGradedSubmission ? (latestGradedSubmission.isTeacherGraded ? "Bấm để xem chi tiết lời nhận xét & sửa lỗi" : "Bấm để xem đáp án và giải thích chi tiết") : "Chưa có bài tập nào được chấm"}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
                          <FileCheck className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                          {latestGradedSubmission?.isTeacherGraded ? "Xem bài được trả" : "Xem bài đã làm"}
                        </span>
                        <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                          <span>Chi tiết</span>
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                      <div className="text-[11px] font-medium text-slate-600 dark:text-slate-300 line-clamp-1">
                        {latestGradedSubmission
                          ? latestGradedSubmission.isTeacherGraded
                            ? "Xem nhận xét, lời giải & sửa lỗi chi tiết"
                            : "Xem đáp án đúng & giải thích chi tiết từng câu"
                          : "Làm bài tập để nhận nhận xét & điểm số"}
                      </div>
                      <div className="flex items-center justify-between pt-0.5">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100/70 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                          {latestGradedSubmission
                            ? latestGradedSubmission.isTeacherGraded
                              ? "Nhận xét chi tiết"
                              : "Xem giải thích"
                            : "Chờ bài làm"}
                        </span>
                        <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold underline underline-offset-2">
                          Mở bài →
                        </span>
                      </div>
                    </button>
                  </div>
                </Card>

                {/* IELTS Exam Goal Card */}
                <div className="lg:col-span-6 h-full">
                  <ExamGoalCard
                    userId={user?.id}
                    classId={enrolledClassId}
                    initialCurrentBand={journey.currentBand ?? courseBands.entryBand}
                  />
                </div>
              </div>
            )}

            {/* 1.5 DISCIPLINE SCHOLARSHIP TRACKER: Bảng Cam Kết & Thanh Động Lực Học Bổng Kỷ Luật */}
            <DisciplineScholarshipTracker
              submittedCount={submittedCount}
              totalHomeworks={rawLessons?.length || Math.max(submittedCount, 1)}
              studentId={user?.id}
              studentName={user?.fullName || "Học viên"}
              studentPhone={user?.phone || ""}
              classId={enrolledClassId}
              className={activeClassName}
              courseTitle={courseTitle}
            />

            {/* HUYỀN CƠ LÃO NHÂN FLOATING MASCOT */}
            <HuanCoMascot state={huanCoState} />
          </div>
        )}
      </div>
    </div>
  );
}
