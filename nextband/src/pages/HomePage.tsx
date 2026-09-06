import { useState, useMemo } from "react";
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
import { StudentStageBanner } from "@/components/student/StudentStageBanner";
import { StudentMissionQueue } from "@/components/student/StudentMissionQueue";
import { StudentSkillMatrix } from "@/components/student/StudentSkillMatrix";
import { ClassLeaderboardWidget } from "@/components/student/ClassLeaderboardWidget";
import { DisciplineScholarshipTracker } from "@/components/student/DisciplineScholarshipTracker";
import { AcademicAscentWorld, AscentLessonNode } from "@/components/student/AcademicAscentWorld";
import { calculateStudentJourney, resolveCourseBands } from "@/lib/studentJourney";
import { getStudentMotivationCopy } from "@/lib/studentMotivationCopy";
import { calculateStudentStreak } from "@/lib/studentStreakHelper";
import {
  evaluateAllAchievedMilestones,
  selectHighestPriorityPendingMilestone,
  DecisionMilestone,
  CourseLessonItem,
  inferLessonSemanticType,
} from "@/lib/milestoneEngine";
import { CelebrationModal } from "@/components/celebration/CelebrationModal";
import { milestonesApi, attendanceApi } from "@/lib/api";
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
    ["submitted", "SUBMITTED", "graded", "GRADED"].includes(s.status)
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

  useMemo(() => {
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

  // Leaderboard data for class & motivation context
  const { data: leaderboardData } = useQuery({
    queryKey: ["class-leaderboard-home", enrolledClassId],
    queryFn: () => classesApi.getLeaderboard(enrolledClassId || ""),
    enabled: !!enrolledClassId && state === "ENROLLED",
    staleTime: 1000 * 60 * 2,
  });

  // Daily Streak Engine
  const streak = useMemo(() => {
    return calculateStudentStreak(userSubmissions, user?.id);
  }, [userSubmissions, user?.id]);

  // Motivational Micro-Copy Engine
  const motivation = useMemo(() => {
    return getStudentMotivationCopy({
      actionQueue,
      leaderboardData: leaderboardData || null,
      submittedCount,
      gradedCount,
      pendingCount,
    });
  }, [actionQueue, leaderboardData, submittedCount, gradedCount, pendingCount]);

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
    <div className="min-h-screen bg-slate-50/60 pb-16">
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

            {/* 1. STAGE BANNER: Cảnh Giới & Điểm Neo Chặng Đường (20% Progression) */}
            <StudentStageBanner
              studentName={user?.fullName || "Học viên"}
              className={activeClassName}
              courseTitle={courseTitle}
              journey={journey}
              motivation={motivation}
              streak={streak}
            />

            {/* 1.2 NEXT SESSION & ATTENDANCE QUICK SPOTLIGHT */}
            {enrolledClassId && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Next Class Session Spotlight */}
                <Card className="md:col-span-7 p-4 sm:p-5 rounded-2xl border bg-card shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between pb-3 border-b">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                        Buổi Học Tiếp Theo · Lớp {activeClassName}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/app/class/${enrolledClassId}/lessons`)}
                      className="h-7 text-xs font-bold text-primary gap-1 px-2.5 rounded-lg hover:bg-primary/5"
                    >
                      <span>Vào Lớp Học</span>
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>

                  <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <h4 className="font-extrabold text-base text-foreground flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary shrink-0" />
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
                      className="flex items-center gap-2 group cursor-pointer hover:opacity-80 transition-opacity p-1 -m-1 rounded-lg"
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

                {/* Quick 5-Skill Homework Hub Link */}
                <Card className="md:col-span-5 p-4 sm:p-5 rounded-2xl border bg-gradient-to-br from-indigo-50/50 via-card to-card border-indigo-100 dark:border-indigo-900/40 shadow-xs flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-800">
                        Bảng Khái Quát Bài Tập
                      </span>
                      <span className="text-xs font-bold text-foreground tabular-nums">
                        {submittedCount} / {rawLessons?.length || 27} bài
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-foreground pt-1">
                      5 Kỹ năng: Grammar, Listening, Reading, Writing, Speaking
                    </h4>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      Phân bổ rõ ràng giữa điểm trắc nghiệm (1đ/câu) và Band điểm IELTS tự luận do giáo viên chấm.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-indigo-100/60 dark:border-indigo-900/30 flex items-center justify-end">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/app/class/${enrolledClassId}/lessons?tab=skill-matrix`)}
                      className="h-7 text-xs font-bold border-indigo-200 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 rounded-lg gap-1"
                    >
                      <span>Tra cứu tiến độ 5 kỹ năng</span>
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </Card>
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
