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
import { calculateStudentJourney } from "@/lib/studentJourney";
import {
  Layers,
  WifiOff,
  AlertCircle,
  RefreshCw,
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

  // ARIS Student Journey calculations
  const journey = useMemo(() => {
    return calculateStudentJourney(userSubmissions, 5.5, 6.5);
  }, [userSubmissions]);

  // Trạng thái sư phạm của Huyền Cơ Lão Nhân
  const huanCoState = useMemo(() => {
    return getHuanCoState({
      actionQueue,
      submittedCount,
      gradedCount,
      pendingCount,
      enrolledClassName: activeClassName,
      courseTitle,
    });
  }, [actionQueue, submittedCount, gradedCount, pendingCount, activeClassName, courseTitle]);

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
            />

            {/* 2. MISSION QUEUE: Hàng Đợi Nhiệm Vụ Tiêu Điểm Max 3 Items (10% Focus Action) */}
            <StudentMissionQueue
              missions={actionQueue}
              enrolledClassId={enrolledClassId}
            />

            {/* 3. SKILL MATRIX & TEACHER DEBRIEF: Năng Lực 4 Kỹ Năng & Báo Cáo Sửa Lỗi (70% Academic Base) */}
            <StudentSkillMatrix
              skills={journey.skills}
              latestSubmission={userSubmissions[0]}
            />

            {/* HUYỀN CƠ LÃO NHÂN FLOATING MASCOT */}
            <HuanCoMascot state={huanCoState} />
          </div>
        )}
      </div>
    </div>
  );
}
