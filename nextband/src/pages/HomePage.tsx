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

  // KPI submissions — only load when ENROLLED
  const { data: submissionsData } = useQuery({
    queryKey: submissionKeys.kpis(user?.id),
    queryFn: () => submissionsApi.list({ studentId: user?.id, limit: 100 }).catch(() => ({ data: [] })),
    enabled: !!user?.id && state === "ENROLLED",
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: true,
  });

  const userSubmissions = Array.isArray(submissionsData?.data) ? submissionsData.data : [];
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
    staleTime: 1000 * 60 * 2,
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
    staleTime: 1000 * 60 * 2,
  });

  const studentAttendanceRecord = attendanceData?.success && attendanceData?.data?.students?.[0] ? attendanceData.data.students[0] : null;
  const attendanceRate = studentAttendanceRecord?.attendanceRate ?? 100;
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
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Next Class Session Spotlight */}
                <Card className={`relative overflow-hidden md:col-span-7 p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${cardTheme.cardBorder} ${cardTheme.cardBg}`}>
                  <div className={`absolute top-0 left-0 right-0 h-1.5 ${cardTheme.topLine}`} />
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

                  <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <h4 className="font-extrabold text-base text-foreground flex items-center gap-2">
                        <Calendar className={`h-4 w-4 ${cardTheme.icon} shrink-0`} />
                        <span>
                          {nextSession?.lessonTitle || `Buổi số ${nextSession?.sessionNumber || 1} / 27`}
                        </span>
                      </h4>
                      <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground/70" />
                        <span>
                          {nextSession?.sessionDate
                            ? `Ngày ${new Date(nextSession.sessionDate).toLocaleDateString("vi-VN", { weekday: "long", day: "2-digit", month: "2-digit", year: "numeric" })}`
                            : "Theo lịch xếp của lớp học"}
                        </span>
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => navigate(`/app/attendance?classId=${enrolledClassId}`)}
                      className="flex items-center gap-2 group cursor-pointer hover:opacity-85 transition-opacity p-1.5 -m-1 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/70 shadow-2xs"
                      title="Xem chi tiết lịch học & điểm danh chuyên cần"
                    >
                      <span className="text-xs text-muted-foreground font-medium">Chuyên cần:</span>
                      <span className={`text-sm font-black tabular-nums ${attendanceRate >= 85 ? "text-emerald-600" : "text-amber-600"}`}>
                        {attendanceRate}%
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {attendanceRate >= 85 ? "✓ Đạt chuẩn đầu ra" : "⚠ Cần lưu ý"}
                      </span>
                    </button>
                  </div>
                </Card>

                {/* IELTS Exam Goal Card */}
                <div className="md:col-span-5">
                  <ExamGoalCard userId={user?.id} classId={enrolledClassId} />
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

            {/* 2. ACADEMIC ASCENT WORLD (Signature Spatial Environment: One Action · One Journey · One Goal) */}
            <AcademicAscentWorld
              courseTitle={courseTitle}
              className={activeClassName}
              currentBand={journey.currentBand ?? courseBands.entryBand}
              targetBand={journey.targetBand ?? courseBands.targetBand}
              lessons={ascentLessons}
              enrolledClassId={enrolledClassId}
            />

            {/* HUYỀN CƠ LÃO NHÂN FLOATING MASCOT */}
            <HuanCoMascot state={huanCoState} />
          </div>
        )}
      </div>
    </div>
  );
}
