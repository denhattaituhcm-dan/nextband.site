import { useState, useMemo } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useStudentLifecycle } from "@/hooks/useStudentLifecycle";
import { lessonsApi, submissionsApi } from "@/lib/api";
import { isValidUUID } from "@/lib/classContext";
import { getCourseBrand } from "@/lib/courseBrand";
import { submissionKeys } from "@/lib/queryKeys";
import {
  deriveCanonicalVisualStatus,
  compareHomeworkOrder,
  selectCanonicalSubmission,
} from "@/lib/homeworkStatusHelper";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { StudentAttendanceTimeline } from "@/components/student/StudentAttendanceTimeline";
import { ClassLeaderboardWidget } from "@/components/student/ClassLeaderboardWidget";
import {
  CalendarCheck,
  BookOpen,
  GraduationCap,
  RefreshCw,
  ArrowRight,
  FileText,
  ChevronRight,
  TrendingUp,
  Layers,
} from "lucide-react";

export default function StudentAttendanceProgressPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { state, enrollments, isLoading: isLifecycleLoading, retry } = useStudentLifecycle();

  const urlClassId = searchParams.get("classId");

  // Determine active/selected class ID
  const selectedClassId = useMemo(() => {
    if (urlClassId && enrollments.some((e) => e.classId === urlClassId)) {
      return urlClassId;
    }
    return enrollments[0]?.classId || "";
  }, [urlClassId, enrollments]);

  const selectedClass = useMemo(() => {
    return enrollments.find((e) => e.classId === selectedClassId) || enrollments[0] || null;
  }, [selectedClassId, enrollments]);

  const handleSelectClass = (classId: string) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set("classId", classId);
        return next;
      },
      { replace: true }
    );
  };

  // Fetch homework list for the selected class to calculate BTVN overview %
  const {
    data: classLessonData,
    isLoading: isLessonsLoading,
  } = useQuery({
    queryKey: ["class-lessons", selectedClassId],
    queryFn: () => lessonsApi.getClassLessons(selectedClassId),
    enabled: !!selectedClassId && isValidUUID(selectedClassId),
    staleTime: 1000 * 60 * 2,
  });

  // Fetch student submissions
  const {
    data: submissionsData,
    isLoading: isSubmissionsLoading,
  } = useQuery({
    queryKey: submissionKeys.list({ studentId: user?.id }),
    queryFn: () => submissionsApi.list({ studentId: user?.id, limit: 100 }),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 2,
  });

  const rawLessons = classLessonData?.data?.lessons;
  const lessons = useMemo(() => {
    if (!Array.isArray(rawLessons)) return [];
    return [...rawLessons].sort(compareHomeworkOrder);
  }, [rawLessons]);

  const userSubmissions = Array.isArray(submissionsData?.data) ? submissionsData.data : [];

  const homeworkStats = useMemo(() => {
    const homeworkList = lessons.map((item: any) => {
      const sub = selectCanonicalSubmission(userSubmissions, item.id) || item.submission;
      const deadline = item.homework?.deadline;
      const visualStatus = deriveCanonicalVisualStatus({
        submissionStatus: sub?.status,
        revisionRequired: sub?.revisionRequired,
        deadline,
      });
      return {
        id: item.id,
        status: visualStatus,
      };
    });

    const total = homeworkList.length;
    const overdue = homeworkList.filter((hw) => hw.status === "OVERDUE").length;
    const notStarted = homeworkList.filter(
      (hw) => hw.status === "UPCOMING" || hw.status === "IN_PROGRESS"
    ).length;
    const submitted = homeworkList.filter((hw) => hw.status === "SUBMITTED").length;
    const reviewed = homeworkList.filter((hw) => hw.status === "GRADED").length;
    const completed = submitted + reviewed;
    const completionPercent = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      overdue,
      notStarted,
      submitted,
      reviewed,
      completed,
      completionPercent,
    };
  }, [lessons, userSubmissions]);

  const isLoading = isLifecycleLoading || isLessonsLoading;
  const brand = getCourseBrand({
    title: selectedClass?.courseTitle,
    name: selectedClass?.className,
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto space-y-6 animate-pulse pb-16">
        <div className="h-8 bg-muted rounded-md w-1/4" />
        <div className="h-4 bg-muted rounded-md w-1/3" />
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-12">
            <Skeleton className="h-44 w-full rounded-2xl" />
          </div>
          <div className="lg:col-span-7">
            <Skeleton className="h-72 w-full rounded-2xl" />
          </div>
          <div className="lg:col-span-5">
            <Skeleton className="h-72 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (state === "API_ERROR" || state === "NETWORK_ERROR") {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center space-y-4">
        <Card className="p-8 text-center space-y-4 border-destructive/20 bg-destructive/5 rounded-2xl">
          <div className="text-destructive font-bold text-lg">Không thể tải thông tin lớp học</div>
          <p className="text-sm text-muted-foreground">Vui lòng kiểm tra kết nối mạng và thử lại.</p>
          <Button onClick={retry} variant="outline" size="sm" className="gap-2 mx-auto">
            <RefreshCw className="h-4 w-4" />
            Thử lại
          </Button>
        </Card>
      </div>
    );
  }

  if (!enrollments || enrollments.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16 px-4">
        <div className="border rounded-2xl bg-muted/30 p-8 space-y-4">
          <GraduationCap className="h-16 w-16 mx-auto text-muted-foreground/50 mb-2" />
          <h3 className="text-lg font-semibold text-foreground">Bạn chưa được phân vào lớp học nào</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Sau khi được quản trị viên hoặc giáo viên thêm vào lớp, thông tin chuyên cần và tiến độ BTVN sẽ tự động hiển thị tại đây.
          </p>
          <Button asChild variant="outline" className="rounded-xl font-bold">
            <Link to="/app">
              <BookOpen className="mr-2 h-4 w-4" />
              Quay lại Bàn làm việc
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-16">
      {/* 1. TOP HEADER & CLASS SELECTOR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
              <CalendarCheck className="w-3.5 h-3.5 text-emerald-600" />
              Theo dõi Chuyên Cần & Tiến Độ BTVN
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Chuyên Cần & Tổng Quan BTVN
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Theo dõi chi tiết lịch 27 buổi học, tỷ lệ điểm danh chuyên cần và tổng quan tiến độ làm bài tập
          </p>
        </div>

        {/* Action to switch directly into Doing Homework */}
        {selectedClassId && (
          <div className="flex items-center gap-2">
            <Button
              asChild
              className="font-bold text-xs gap-2 rounded-xl px-4 h-10 shadow-xs bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Link to={`/app/class/${selectedClassId}/lessons`}>
                <BookOpen className="h-4 w-4" />
                <span>Vào Làm Bài Tập Về Nhà</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        )}
      </div>

      {/* Class Switcher (if enrolled in multiple classes) */}
      {enrollments.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-semibold text-muted-foreground shrink-0 flex items-center gap-1">
            <Layers className="h-3.5 w-3.5" /> Chọn lớp học:
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            {enrollments.map((enr) => {
              const isSelected = enr.classId === selectedClassId;
              return (
                <button
                  key={enr.classId}
                  onClick={() => handleSelectClass(enr.classId)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary shadow-xs"
                      : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {enr.className} ({enr.courseTitle || "IELTS"})
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. SECTION: TỔNG QUAN TIẾN ĐỘ BÀI TẬP VỀ NHÀ (BTVN %) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">
                Tổng Quan Bài Tập Về Nhà (BTVN)
              </h2>
              <p className="text-xs text-muted-foreground">
                Tiến độ nộp bài của bạn và bảng xếp hạng thi đua bài tập cùng các bạn trong lớp {selectedClass?.className}
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            asChild
            className="text-xs font-bold rounded-xl gap-1.5 border-slate-200"
          >
            <Link to={`/app/class/${selectedClassId}/lessons`}>
              <span>Danh sách bài tập ({homeworkStats.total})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Left card: Personal Homework Completion % & Status KPIs (lg:col-span-5) */}
          <div className="lg:col-span-5 flex">
            <Card className="w-full rounded-2xl border bg-card shadow-xs flex flex-col justify-between p-5 sm:p-6 space-y-5">
              <div>
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      Tiến độ hoàn thành BTVN
                    </span>
                    <h3 className="text-lg font-black text-foreground">
                      Lớp {selectedClass?.className}
                    </h3>
                  </div>
                  <Badge variant="outline" className={`font-bold text-xs ${brand.badgeClass}`}>
                    {brand.band || "Band 4.0"}
                  </Badge>
                </div>

                <div className="pt-4 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-medium text-muted-foreground">Tỷ lệ đã hoàn thành:</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-black text-primary tabular-nums">
                        {homeworkStats.completionPercent}%
                      </span>
                      <span className="text-xs text-muted-foreground font-semibold">
                        ({homeworkStats.completed}/{homeworkStats.total} bài)
                      </span>
                    </div>
                  </div>

                  <Progress value={homeworkStats.completionPercent} className="h-3 bg-muted" />

                  {/* Status Breakdown Grid */}
                  <div className="grid grid-cols-4 gap-2 pt-2 text-center">
                    <div className={`p-2.5 rounded-xl border ${
                      homeworkStats.overdue > 0
                        ? "bg-rose-500/10 border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-400"
                        : "bg-muted/30 border-border/50 text-muted-foreground"
                    }`}>
                      <span className="text-[10px] font-bold block">Quá hạn</span>
                      <span className="text-base font-black mt-0.5 block">{homeworkStats.overdue}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-muted/30 border border-border/50 text-muted-foreground">
                      <span className="text-[10px] font-medium block">Chưa làm</span>
                      <span className="text-base font-black text-foreground mt-0.5 block">{homeworkStats.notStarted}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-warning/10 border border-warning/20 text-warning">
                      <span className="text-[10px] font-semibold block">Đã nộp</span>
                      <span className="text-base font-black mt-0.5 block">{homeworkStats.submitted}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-success/10 border border-success/20 text-success">
                      <span className="text-[10px] font-semibold block">Đã chấm</span>
                      <span className="text-base font-black mt-0.5 block">{homeworkStats.reviewed}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action advice & Button */}
              <div className="pt-4 border-t space-y-3">
                {homeworkStats.overdue > 0 ? (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-300 text-xs font-medium leading-relaxed">
                    <strong>Lưu ý khẩn:</strong> Bạn có {homeworkStats.overdue} bài tập đã quá hạn. Hãy làm bù ngay để bắt kịp tiến độ cả lớp.
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-primary-soft border border-primary/20 text-primary text-xs font-medium leading-relaxed">
                    <strong>Tuyệt vời!</strong> Bạn đang theo sát bài tập của lớp. Hãy duy trì đều đặn mỗi ngày.
                  </div>
                )}

                <Button
                  asChild
                  className="w-full font-bold text-xs gap-2 rounded-xl h-10 shadow-xs"
                >
                  <Link to={`/app/class/${selectedClassId}/lessons`}>
                    <FileText className="w-4 h-4" />
                    <span>Mở Bảng Làm Bài Tập Về Nhà</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-auto" />
                  </Link>
                </Button>
              </div>
            </Card>
          </div>

          {/* Right card: Class Leaderboard Widget (lg:col-span-7) */}
          <div className="lg:col-span-7 flex">
            {selectedClassId ? (
              <ClassLeaderboardWidget
                classId={selectedClassId}
                className={selectedClass?.className || ""}
                currentUserId={user?.id}
                targetBand={brand.band}
                badgeClass={brand.badgeClass}
              />
            ) : null}
          </div>
        </div>
      </section>

      {/* 3. SECTION: QUÁ TRÌNH ĐIỂM DANH & CHUYÊN CẦN */}
      <section className="space-y-4 pt-4 border-t">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
            <CalendarCheck className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">
              Quá Trình Điểm Danh & Lịch Học Chi Tiết
            </h2>
            <p className="text-xs text-muted-foreground">
              Theo dõi chỉ số chuyên cần học tập (chuẩn cam kết đầu ra ≥ 85%) và trạng thái điểm danh từng buổi từ giáo viên
            </p>
          </div>
        </div>

        {selectedClassId && (
          <StudentAttendanceTimeline
            classId={selectedClassId}
            className={selectedClass?.className}
            studentId={user?.id}
          />
        )}
      </section>
    </div>
  );
}
