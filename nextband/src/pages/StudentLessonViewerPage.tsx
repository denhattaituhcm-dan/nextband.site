import { useMemo, useState, useEffect } from "react";
import { useParams, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { lessonsApi, submissionsApi, examsApi } from "@/lib/api";
import {
  deriveCanonicalVisualStatus,
  formatDeadlineCountdown,
  deriveSubmissionTiming,
  compareHomeworkOrder,
  selectCanonicalSubmission,
  CanonicalVisualStatus,
} from "@/lib/homeworkStatusHelper";
import {
  detectExamSkill,
  getSkillBadgeConfig,
  formatSkillScoreDisplay,
  isObjectiveSkill,
} from "@/lib/examSkillHelper";
import { routes } from "@/lib/routes";
import { submissionKeys } from "@/lib/queryKeys";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HomeworkSkillMatrixCard } from "@/components/student/HomeworkSkillMatrixCard";
import { useAuth } from "@/hooks/useAuth";
import { useStudentLifecycle } from "@/hooks/useStudentLifecycle";
import { useGatewayHealth } from "@/hooks/useGatewayHealth";
import { isValidUUID, classifyClassError } from "@/lib/classContext";
import {
  BookOpen,
  ArrowLeft,
  Headphones,
  FileText,
  Mic,
  HelpCircle,
  Edit3,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  AlertTriangle,
  RefreshCw,
  Sparkles,
  WifiOff,
  Calendar,
  LayoutGrid,
  Award,
  Flame,
} from "lucide-react";
import { HonorReportCardModal } from "@/components/student/HonorReportCardModal";
import { useSeasonalEvent } from "@/features/seasonal/hooks/useSeasonalEvent";
import { SeasonalCornerDecoration } from "@/features/seasonal/presets/SeasonalCornerDecoration";
import { TetFallingPetals } from "@/features/seasonal/presets/tet/TetFallingPetals";
import { SeasonalEnvelopeBadge } from "@/features/seasonal/presets/SeasonalEnvelopeBadge";
import { SeasonalOpeningModal } from "@/features/seasonal/presets/SeasonalOpeningModal";

export default function StudentLessonViewerPage() {
  const { classId } = useParams<{ classId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { state: lifecycleState, resolveClass } = useStudentLifecycle();
  const { isHealthy: isGatewayHealthy, isWarmingUp: isGatewayWarmingUp, checkHealthNow } = useGatewayHealth();
  const [isHonorCardOpen, setIsHonorCardOpen] = useState(false);

  const {
    isEventActive: isSeasonalActive,
    eventType: seasonalEventType,
    isTet,
    uiConfig: seasonalUiConfig,
    studentProgress: seasonalProgress,
    activeEvent: seasonalActiveEvent,
    isHomeworkClaimed,
    getClaimedAmount,
    handleClaim: handleSeasonalClaim,
    isClaiming: isSeasonalClaiming,
    activeClaimModal,
    closeClaimModal,
  } = useSeasonalEvent();

  const activeTab = searchParams.get("tab") || "practice-list";

  useEffect(() => {
    if (searchParams.get("tab") === "attendance-schedule") {
      navigate(`/app/attendance?classId=${classId}`, { replace: true });
    }
  }, [searchParams, classId, navigate]);

  const handleTabChange = (val: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (val === "practice-list") {
        next.delete("tab");
      } else {
        next.set("tab", val);
      }
      return next;
    }, { replace: true });
  };

  const handlePrefetchExam = (targetExamId?: string) => {
    if (!targetExamId) return;
    queryClient.prefetchQuery({
      queryKey: ["exam", targetExamId],
      queryFn: () => examsApi.getById(targetExamId),
      staleTime: 1000 * 60 * 5,
    });
  };

  const handleOpenExam = (targetExamId: string) => {
    const returnUrl = location.pathname;
    navigate(`/exam/${targetExamId}?returnUrl=${encodeURIComponent(returnUrl)}`, {
      state: {
        exitContext: {
          destination: returnUrl,
          source: "class_lessons",
          classId,
          examId: targetExamId,
        },
        returnUrl,
      },
    });
  };

  const {
    data: classLessonData,
    isLoading: isLessonsLoading,
    isError: isLessonsError,
    error: lessonsError,
    refetch: refetchLessons,
  } = useQuery({
    queryKey: ["class-lessons", classId],
    queryFn: () => lessonsApi.getClassLessons(classId || ""),
    enabled: !!classId && isValidUUID(classId),
    retry: 2,
    staleTime: 1000 * 60 * 2,
  });

  const {
    data: submissionsData,
    isLoading: isSubmissionsLoading,
  } = useQuery({
    queryKey: submissionKeys.list({ studentId: user?.id }),
    queryFn: () => submissionsApi.list({ studentId: user?.id, limit: 100 }),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: true,
  });

  const classData = classLessonData?.data || {};
  const rawLessons = classData?.lessons;
  const lessons = useMemo(() => {
    if (!Array.isArray(rawLessons)) return [];
    return [...rawLessons].sort(compareHomeworkOrder);
  }, [rawLessons]);

  const isLoading = isLessonsLoading || isSubmissionsLoading;

  if (!classId || !isValidUUID(classId)) {
    return (
      <div className="container max-w-4xl py-12 px-4 text-center space-y-4">
        <div className="p-4 rounded-2xl bg-destructive/10 text-destructive max-w-md mx-auto space-y-2 border border-destructive/20">
          <AlertCircle className="w-8 h-8 mx-auto" />
          <h2 className="text-lg font-bold">Mã lớp học không hợp lệ</h2>
          <p className="text-xs text-muted-foreground">
            Đường dẫn không hợp lệ hoặc lớp học không tồn tại trên hệ thống.
          </p>
        </div>
        <Button onClick={() => navigate("/app")} variant="outline" className="font-bold rounded-xl">
          Quay lại Bàn làm việc
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container max-w-4xl py-8 px-4 space-y-6 animate-pulse">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-muted" />
          <div className="space-y-2 flex-1">
            <div className="h-6 bg-muted rounded-md w-1/3" />
            <div className="h-4 bg-muted rounded-md w-1/4" />
          </div>
        </div>
        <div className="h-36 bg-muted rounded-2xl" />
        <div className="space-y-3 pt-4">
          <div className="h-20 bg-muted rounded-xl" />
          <div className="h-20 bg-muted rounded-xl" />
          <div className="h-20 bg-muted rounded-xl" />
        </div>
      </div>
    );
  }

  if (isLessonsError || !classLessonData?.data) {
    const errorDetails = classifyClassError(lessonsError);
    return (
      <div className="container max-w-md py-16 px-4 text-center space-y-6 mx-auto">
        <div className="w-14 h-14 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center mx-auto shadow-xs border border-destructive/20">
          <AlertCircle className="w-7 h-7" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-extrabold text-foreground tracking-tight">
            {errorDetails.type === "AUTH_REQUIRED"
              ? "Yêu cầu đăng nhập lại"
              : errorDetails.type === "NETWORK_ERROR"
              ? "Không thể kết nối máy chủ"
              : "Không thể tải bài tập Lớp học"}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
            {errorDetails.message}
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Button onClick={() => refetchLessons()} variant="default" className="font-bold rounded-xl gap-2">
            <RefreshCw className="w-4 h-4" />
            Thử lại
          </Button>
          <Button onClick={() => navigate("/app")} variant="outline" className="font-bold rounded-xl">
            Về Trang Chính
          </Button>
        </div>
      </div>
    );
  }

  const userSubmissions = Array.isArray(submissionsData?.data) ? submissionsData.data : [];

  const homeworkList = lessons.map((item: any, idx: number) => {
    const sub = selectCanonicalSubmission(userSubmissions, item.id) || item.submission;
    const deadline = item.homework?.deadline;
    const visualStatus = deriveCanonicalVisualStatus({
      submissionStatus: sub?.status,
      revisionRequired: sub?.revisionRequired,
      deadline,
    });
    const countdown = formatDeadlineCountdown(deadline);
    const submissionTiming = deriveSubmissionTiming(sub?.submittedAt || sub?.createdAt, deadline);

    const skill = detectExamSkill({
      title: item.title,
      sections: item.sections,
      answers: sub?.answers,
      submission: sub,
    });
    const badge = getSkillBadgeConfig(skill);
    const scoreDisplay = formatSkillScoreDisplay(skill, sub);
    const isObjective = isObjectiveSkill(skill);

    return {
      id: item.id,
      examId: item.id,
      hwNum: String(idx + 1).padStart(2, "0"),
      title: item.title || `Homework ${String(idx + 1).padStart(2, "0")}`,
      description: item.description || `Bài tập buổi ${idx + 1}`,
      status: visualStatus,
      deadline,
      deadlineSource: item.homework?.deadlineSource,
      countdown,
      submissionTiming,
      resources: item.resources || [],
      submission: sub,
      sections: item.sections || [],
      skill,
      badge,
      scoreDisplay,
      isObjective,
      week: item.week || Math.ceil((idx + 1) / 3),
      lessonOrder: idx + 1,
    };
  });

  // Calculate list of eligible homeworks that carry lucky envelopes / reward badges:
  // 1. Must NOT be overdue (or if already claimed, remains visible to show reward badge)
  // 2. Capped at maxEligibleHomeworks (default 5 from seasonalUiConfig)
  const maxSeasonalHomeworks = seasonalUiConfig?.maxEligibleHomeworks || 5;
  const eligibleHomeworkIdsForSeasonal = (() => {
    if (!isSeasonalActive) return new Set<string>();

    const set = new Set<string>();
    for (const hw of homeworkList) {
      const hwId = hw.examId || hw.id;
      const isClaimed = isHomeworkClaimed(hwId);
      const isOverdue = hw.status === "OVERDUE";

      // If already claimed, student keeps the earned badge
      if (isClaimed) {
        set.add(hwId);
        continue;
      }

      // If not overdue, eligible for envelope up to max quota
      if (!isOverdue && set.size < maxSeasonalHomeworks) {
        set.add(hwId);
      }
    }
    return set;
  })();

  const nextHomework = homeworkList.find((hw) => hw.status === "REVISION_REQUIRED" || hw.status === "OVERDUE" || hw.status === "UPCOMING" || hw.status === "IN_PROGRESS") || homeworkList[0];

  const overdueCount = homeworkList.filter((hw) => hw.status === "OVERDUE").length;
  const notStartedCount = homeworkList.filter((hw) => hw.status === "UPCOMING" || hw.status === "IN_PROGRESS").length;
  const submittedCount = homeworkList.filter((hw) => hw.status === "SUBMITTED").length;
  const reviewedCount = homeworkList.filter((hw) => hw.status === "GRADED").length;

  // Recent completed homework (prioritize graded, then submitted)
  const recentCompletedHomework =
    homeworkList.find((hw) => hw.status === "GRADED") ||
    homeworkList.find((hw) => hw.status === "SUBMITTED") ||
    homeworkList.find((hw) => hw.status === "REVISION_REQUIRED") ||
    null;

  // Milestone eligibility: milestone achieved (>= 25%, >= 50%, >= 75%, 100%) or high reviewed score
  const totalHomeworksCount = homeworkList.length || 1;
  const completionRate = Math.round((submittedCount / totalHomeworksCount) * 100);
  const isEligibleForMilestone = completionRate >= 25 || reviewedCount >= 5;

  const getStatusBadge = (
    status: CanonicalVisualStatus,
    countdown?: { text: string; isOverdue: boolean; urgencyLevel?: string; badgeClass?: string } | null,
    timing?: { isLate: boolean; lateDays: number }
  ) => {
    switch (status) {
      case "OVERDUE":
        return (
          <Badge variant="destructive" className="bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-300 dark:border-rose-800 font-bold gap-1 animate-pulse">
            <AlertCircle className="h-3 w-3 text-rose-600 dark:text-rose-400" />
            {countdown?.text || "Quá hạn nộp"}
          </Badge>
        );
      case "REVISION_REQUIRED":
        return (
          <Badge variant="destructive" className="bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800 font-bold gap-1">
            <AlertTriangle className="h-3 w-3 text-amber-600 dark:text-amber-400" />
            Cần sửa bài (Attempt 2)
          </Badge>
        );
      case "GRADED":
        return (
          <Badge variant="success" className="gap-1">
            <CheckCircle2 className="h-3 w-3" />
            {timing?.isLate ? `Đã hoàn thành (Trễ ${timing.lateDays} ngày)` : "Đã hoàn thành"}
          </Badge>
        );
      case "SUBMITTED":
        return (
          <Badge variant="warning" className="gap-1">
            <Clock className="h-3 w-3" />
            {timing?.isLate ? `Chờ phản hồi (Trễ ${timing.lateDays} ngày)` : "Chờ phản hồi"}
          </Badge>
        );
      case "IN_PROGRESS":
        return (
          <Badge variant="info">
            <Edit3 className="h-3 w-3" />
            Đang làm
          </Badge>
        );
      case "UPCOMING":
      default: {
        if (!countdown) {
          return (
            <Badge variant="outline" className="text-muted-foreground">
              Chưa làm
            </Badge>
          );
        }
        const isCritical = countdown.urgencyLevel === "CRITICAL";
        const isWarning = countdown.urgencyLevel === "WARNING";
        return (
          <Badge
            variant="outline"
            className={`font-mono gap-1 text-[11px] ${
              countdown.badgeClass || (isCritical ? "bg-rose-600 text-white animate-pulse" : isWarning ? "bg-amber-500/15 text-amber-800 border-amber-300 font-bold" : "text-muted-foreground")
            }`}
          >
            {isCritical ? (
              <Flame className="h-3 w-3 text-white" />
            ) : isWarning ? (
              <AlertTriangle className="h-3 w-3 text-amber-600" />
            ) : (
              <Calendar className="h-3 w-3" />
            )}
            {countdown.text}
          </Badge>
        );
      }
    }
  };

  const getSkillIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "listening":
        return <Headphones className="h-3.5 w-3.5 text-listening" />;
      case "reading":
        return <BookOpen className="h-3.5 w-3.5 text-reading" />;
      case "writing":
        return <FileText className="h-3.5 w-3.5 text-writing" />;
      case "speaking":
        return <Mic className="h-3.5 w-3.5 text-speaking" />;
      default:
        return <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 space-y-6">
        {/* HEADER & BACK TO WELCOME */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <Button variant="ghost" size="icon" onClick={() => navigate("/app")} className="rounded-full shrink-0">
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </Button>
            <div className="min-w-0">
              {classData.courseTitle && (
                <p className="text-[11px] font-semibold text-muted-foreground truncate">
                  Khóa {classData.courseTitle}
                </p>
              )}
              <h1 className="text-lg sm:text-2xl font-bold text-foreground tracking-tight truncate">
                Lớp {classData.className}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              size="sm"
              onClick={() => setIsHonorCardOpen(true)}
              className={`text-xs font-bold rounded-xl gap-1.5 shadow-xs cursor-pointer ${
                isEligibleForMilestone
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950"
                  : "bg-slate-900 hover:bg-slate-800 text-white border border-slate-700"
              }`}
            >
              {isEligibleForMilestone ? <Award className="w-3.5 h-3.5 text-slate-950" /> : <FileText className="w-3.5 h-3.5 text-sky-400" />}
              <span className="hidden sm:inline">
                {isEligibleForMilestone ? "🎖️ Báo Cáo Vinh Danh Cột Mốc" : "📄 Phiếu Báo Cáo Gửi Ba Mẹ"}
              </span>
              <span className="sm:hidden">
                {isEligibleForMilestone ? "Báo Cáo Cột Mốc" : "Phiếu Báo Cáo"}
              </span>
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate("/app")} className="hidden sm:inline-flex text-xs font-semibold rounded-xl">
              Về Sảnh Chính
            </Button>
          </div>
        </div>

        {/* Clinical Honor / Daily Report Card Modal */}
        <HonorReportCardModal
          open={isHonorCardOpen}
          onOpenChange={setIsHonorCardOpen}
          studentName={user?.fullName || user?.email?.split("@")[0] || "Học viên"}
          reportType={isEligibleForMilestone ? "MILESTONE_HONOR" : "DAILY_LOG"}
          examTitle={
            recentCompletedHomework?.title ||
            classData.courseTitle ||
            `Lớp ${classData.className || "IELTS"}`
          }
          courseTitle={classData.courseTitle || "Hệ thống Bác sĩ học thuật ARIS"}
          metricDiscipline={
            isEligibleForMilestone
              ? `${submittedCount}/${homeworkList.length} Bài đã nộp (${completionRate}%)`
              : recentCompletedHomework
              ? "Hoàn thành 100% bài nộp"
              : `${submittedCount}/${homeworkList.length} Bài đã nộp`
          }
          metricScore={
            recentCompletedHomework?.scoreDisplay?.isGraded
              ? recentCompletedHomework.scoreDisplay.scoreText
              : reviewedCount > 0
              ? `${reviewedCount} bài đã có điểm & nhận xét`
              : recentCompletedHomework
              ? "Đã nộp bài đầy đủ"
              : `${submittedCount} bài đã hoàn thành`
          }
        />

        {/* CIRCUIT BREAKER / GATEWAY STATUS BANNER */}
        {isGatewayWarmingUp && (
          <div className="bg-warning/10 border border-warning/30 text-warning-foreground px-4 py-3 rounded-2xl flex items-center justify-between gap-3 text-xs shadow-xs animate-in fade-in duration-300">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-warning/20 text-warning flex items-center justify-center shrink-0">
                <WifiOff className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-foreground">Đang kết nối đến máy chủ phòng thi</p>
                <p className="text-muted-foreground text-[11px] mt-0.5">
                  Dịch vụ phòng thi đang được chuẩn bị. Bạn vẫn có thể xem danh sách bài học, nhưng bắt đầu làm bài có thể cần đợi vài giây.
                </p>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => checkHealthNow()}
              className="h-8 text-xs border-warning/40 hover:bg-warning/20 shrink-0 gap-1.5 font-semibold rounded-xl"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Kiểm tra lại
            </Button>
          </div>
        )}

        {/* HERO PRACTICE BANNER FOR THIS CLASS (L1 Hero Layer) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 bg-primary text-primary-foreground p-6 md:p-8 rounded-2xl shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                Sẵn sàng làm bài hôm nay
              </h2>
              <p className="text-xs md:text-sm text-primary-foreground/90 mt-1">
                Toàn bộ {homeworkList.length} bài tập của khóa học đã sẵn sàng. Hãy chọn bài tập để thực hành ngay.
              </p>
            </div>

            {nextHomework && (
              <div className="pt-3 border-t border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-primary-foreground/80">
                    Bài tập cần làm tiếp theo:
                  </span>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2 mt-0.5">
                    {nextHomework.title}
                    {getStatusBadge(nextHomework.status)}
                  </h3>
                </div>

                <Button
                  onClick={() => handleOpenExam(nextHomework.examId || nextHomework.id)}
                  onMouseEnter={() => handlePrefetchExam(nextHomework.examId || nextHomework.id)}
                  onFocus={() => handlePrefetchExam(nextHomework.examId || nextHomework.id)}
                  className="bg-white text-primary hover:bg-white/95 font-bold px-6 py-2.5 rounded-xl text-xs shadow-xs shrink-0"
                >
                  <span>Làm bài ngay</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            )}
          </div>

          {/* SIDEBAR KPI SUMMARY */}
          <div className="md:col-span-4 bg-card p-5 md:p-6 rounded-2xl border border-border/70 shadow-xs flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Tình trạng Bài tập cá nhân
              </h3>
              <FileText className="w-4 h-4 text-primary" />
            </div>

            <div className={`grid ${overdueCount > 0 ? "grid-cols-4" : "grid-cols-3"} gap-2 text-center`}>
              {overdueCount > 0 && (
                <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-300 dark:border-rose-800">
                  <span className="text-[10px] text-rose-700 dark:text-rose-400 font-bold block">Quá hạn</span>
                  <div className="font-bold text-rose-700 dark:text-rose-400 text-base mt-0.5">{overdueCount}</div>
                </div>
              )}
              <div className="p-2.5 rounded-xl bg-muted/30 border border-border/50">
                <span className="text-[10px] text-muted-foreground font-medium block">Chưa làm</span>
                <div className="font-bold text-foreground text-base mt-0.5">{notStartedCount}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-warning/5 border border-warning/20">
                <span className="text-[10px] text-warning font-semibold block">Đã nộp</span>
                <div className="font-bold text-warning text-base mt-0.5">{submittedCount}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-success/5 border border-success/20">
                <span className="text-[10px] text-success font-semibold block">Đã chấm</span>
                <div className="font-bold text-success text-base mt-0.5">{reviewedCount}</div>
              </div>
            </div>

            <div className={`p-3 rounded-xl text-xs font-medium leading-relaxed ${overdueCount > 0 ? "bg-rose-500/10 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-300" : "bg-primary-soft border border-primary/20 text-primary"}`}>
              {overdueCount > 0 ? (
                <span><strong>Lưu ý khẩn:</strong> Bạn có {overdueCount} bài tập đã quá hạn. Hãy làm bù ngay để kịp tiến độ lớp.</span>
              ) : (
                <span><strong>Gợi ý:</strong> Nộp bài tập sớm để nhận bài chấm chi tiết từ Giáo viên.</span>
              )}
            </div>
          </div>
        </div>

        {/* TABS CONTAINER: 1. Practice List | 2. 5-Skill Overview Matrix | 3. Class Schedule & Attendance */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-3">
            <TabsList className="bg-muted/60 p-1 rounded-xl h-auto">
              <TabsTrigger
                value="practice-list"
                className="rounded-lg py-2 px-4 text-xs font-bold gap-2 data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-xs transition-all"
              >
                <Edit3 className="w-4 h-4 text-primary" />
                <span>Danh sách Bài tập ({homeworkList.length})</span>
              </TabsTrigger>
              <TabsTrigger
                value="skill-matrix"
                className="rounded-lg py-2 px-4 text-xs font-bold gap-2 data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-xs transition-all"
              >
                <LayoutGrid className="w-4 h-4 text-indigo-600" />
                <span>Khái Quát 5 Kỹ Năng</span>
              </TabsTrigger>
            </TabsList>

            <div className="text-xs text-muted-foreground hidden sm:block">
              Khóa học: <strong className="text-foreground">{classData.courseTitle || "IELTS"}</strong> · Lớp <strong className="text-foreground">{classData.className}</strong>
            </div>
          </div>

          {/* TAB 1: MAIN PRACTICE LIST SECTION */}
          <TabsContent value="practice-list" className="space-y-4 pt-1 outline-hidden">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
                <Edit3 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                Danh sách Bài tập ({homeworkList.length})
              </h2>
            </div>

            {homeworkList.length === 0 ? (
              <Card className="p-10 text-center space-y-4 border-dashed rounded-2xl bg-muted/20">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="space-y-1 max-w-md mx-auto">
                  <h3 className="font-bold text-base text-foreground">Lớp học chưa có bài tập nào được giao</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Toàn bộ danh sách bài tập của khóa học sẽ hiển thị tại đây ngay khi giáo viên cập nhật bài tập mới.
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate("/app")} className="rounded-xl font-bold">
                  Quay lại Bàn làm việc
                </Button>
              </Card>
            ) : (
              <div className="grid gap-3">
                {homeworkList.map((hw) => {
                  const isOverdue = hw.status === "OVERDUE";
                  const isRevision = hw.status === "REVISION_REQUIRED";

                  return (
                    <Card
                      key={hw.id}
                      onMouseEnter={() => handlePrefetchExam(hw.examId || hw.id)}
                      className={`p-3.5 sm:p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 ${
                        isOverdue
                          ? "border-rose-300 dark:border-rose-800 bg-rose-500/5 hover:border-rose-500 shadow-xs"
                          : isRevision
                          ? "border-amber-300 dark:border-amber-800 bg-amber-500/5 hover:border-amber-500"
                          : "border-border bg-card hover:border-primary/40 hover:shadow-xs"
                      }`}
                    >
                      <div className="space-y-2 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="outline" className={`text-[10px] font-bold px-2 py-0.5 shrink-0 ${hw.badge.badgeClass}`}>
                            {hw.badge.shortLabel}
                          </Badge>
                          <h3 className={`font-bold text-sm leading-snug break-words ${isOverdue ? "text-rose-900 dark:text-rose-200" : "text-foreground"}`}>
                            {hw.title}
                          </h3>
                          {getStatusBadge(hw.status, hw.countdown, hw.submissionTiming)}
                          {isSeasonalActive && seasonalUiConfig.showEnvelopes && eligibleHomeworkIdsForSeasonal.has(hw.examId || hw.id) &&
                            // Chỉ gắn lộc vào bài CHƯA NỘP. Bài đã nộp (SUBMITTED/GRADED) chỉ hiện nếu đã claimed ("Đã Khai Lộc").
                            (!(hw.status === "GRADED" || hw.status === "SUBMITTED") || isHomeworkClaimed(hw.examId || hw.id)) && (
                            <SeasonalEnvelopeBadge
                              type={seasonalEventType}
                              isCompleted={hw.status === "GRADED" || hw.status === "SUBMITTED"}
                              isClaimed={isHomeworkClaimed(hw.examId || hw.id)}
                              claimedAmount={getClaimedAmount(hw.examId || hw.id)}
                              onClaim={() => handleSeasonalClaim(hw.examId || hw.id, hw.title)}
                              isClaiming={isSeasonalClaiming}
                              isOverdue={isOverdue}
                            />
                          )}
                        </div>

                        {hw.description && (
                          <p className="text-xs text-foreground/80 leading-relaxed line-clamp-2">
                            {hw.description}
                          </p>
                        )}

                        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground pt-0.5">
                          <span className="font-medium text-muted-foreground">
                            {hw.isObjective ? "Trắc nghiệm" : "Tự luận"}
                          </span>
                          {hw.scoreDisplay.isGraded && (
                            <>
                              <span className="text-muted-foreground/40">·</span>
                              <span className="font-semibold text-primary">
                                {hw.scoreDisplay.scoreText}
                                {hw.scoreDisplay.subText && (
                                  <span className="text-muted-foreground font-normal ml-1">({hw.scoreDisplay.subText})</span>
                                )}
                              </span>
                            </>
                          )}
                          {hw.resources && hw.resources.length > 0 && (
                            <div className="flex items-center gap-1.5 ml-auto sm:ml-0">
                              {hw.resources.map((res: any, idx: number) => (
                                <span
                                  key={idx}
                                  className="inline-flex items-center gap-1 text-[10px] font-semibold bg-muted text-foreground px-1.5 py-0.5 rounded-md"
                                >
                                  {getSkillIcon(res.type)}
                                  {res.type?.toUpperCase()}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0 pt-1 sm:pt-0 w-full sm:w-auto">
                        {/* Score Preview on desktop */}
                        <div className="text-right hidden sm:block">
                          <div className={`text-xs font-black tabular-nums ${hw.scoreDisplay.isGraded ? "text-primary" : "text-muted-foreground"}`}>
                            {hw.scoreDisplay.scoreText}
                          </div>
                          <div className="text-[10px] text-muted-foreground">
                            {hw.scoreDisplay.subText}
                          </div>
                        </div>

                        <Button
                          size="sm"
                          variant={hw.status === "GRADED" ? "outline" : "default"}
                          className={`w-full sm:w-auto font-bold text-xs gap-1.5 rounded-xl ${
                            isOverdue
                              ? "bg-rose-600 hover:bg-rose-700 text-white shadow-xs"
                              : isRevision
                              ? "bg-amber-600 hover:bg-amber-700 text-white shadow-xs"
                              : ""
                          }`}
                          onMouseEnter={() => handlePrefetchExam(hw.examId || hw.id)}
                          onFocus={() => handlePrefetchExam(hw.examId || hw.id)}
                          onClick={() => {
                            if (
                              hw.submission?.id &&
                              (hw.status === "GRADED" ||
                                hw.status === "REVISION_REQUIRED" ||
                                hw.status === "SUBMITTED")
                            ) {
                              navigate(routes.student.submission(hw.submission.id));
                            } else {
                              handleOpenExam(hw.examId || hw.id);
                            }
                          }}
                        >
                          {isOverdue
                            ? "🚨 Làm bù ngay"
                            : isRevision
                            ? "Làm bài sửa (Attempt 2)"
                            : hw.status === "GRADED"
                            ? "Xem phản hồi"
                            : hw.status === "SUBMITTED"
                            ? "Xem bài làm"
                            : "Làm bài ngay"}
                        </Button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          {/* TAB 2: 5-SKILL OVERVIEW MATRIX */}
          <TabsContent value="skill-matrix" className="pt-1 outline-hidden">
            <HomeworkSkillMatrixCard
              homeworkList={homeworkList}
              onOpenExam={handleOpenExam}
              onViewSubmission={(submissionId) => navigate(routes.student.submission(submissionId))}
              className={classData.className}
              courseTitle={classData.courseTitle}
            />
          </TabsContent>
        </Tabs>

        {/* ARIS Seasonal Layer */}
        {isSeasonalActive && seasonalUiConfig.showBlossom && (
          <SeasonalCornerDecoration type={seasonalEventType} />
        )}
        {isSeasonalActive && isTet && seasonalUiConfig.showPetals && <TetFallingPetals />}
        {isSeasonalActive && activeClaimModal && (
          <SeasonalOpeningModal
            isOpen={activeClaimModal.isOpen}
            onClose={closeClaimModal}
            type={seasonalEventType}
            rewardType={activeClaimModal.rewardType}
            amount={activeClaimModal.amount}
            totalAccumulated={activeClaimModal.totalAccumulated}
            examTitle={activeClaimModal.examTitle}
            isPoolExhausted={activeClaimModal.isPoolExhausted}
          />
        )}
      </div>
    </div>
  );
}
