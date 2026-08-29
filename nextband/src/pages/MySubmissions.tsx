import { useState, useCallback, useMemo } from "react";
import { useQuery, useQueries } from "@tanstack/react-query";
import { submissionsApi } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { DataTablePagination } from "@/components/admin/DataTablePagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  Loader2,
  Search,
  X,
  Trophy,
  Award,
  BookOpen,
  Calendar,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  CanonicalSubmissionStatus,
  normalizeSubmissionStatus,
} from "@/lib/submissionStatus";
import { calculateGradingSla } from "@/lib/gradingSla";
import { routes } from "@/lib/routes";
import { submissionKeys } from "@/lib/queryKeys";
import { detectExamSkill, getSkillBadgeConfig } from "@/lib/examSkillHelper";

const statusConfig: Record<
  CanonicalSubmissionStatus,
  {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info" | "muted";
    icon: React.ElementType;
  }
> = {
  IN_PROGRESS: { label: "Đang làm", variant: "info", icon: Clock },
  SUBMITTED: { label: "Chờ chấm", variant: "warning", icon: AlertCircle },
  GRADED: { label: "Đã chấm", variant: "success", icon: CheckCircle2 },
  EXPIRED: { label: "Hết giờ", variant: "destructive", icon: AlertCircle },
  ABANDONED: { label: "Đã hủy", variant: "outline", icon: AlertCircle },
};

const STATUS_OPTIONS = [
  { value: "all", label: "Tất cả trạng thái" },
  { value: "GRADED", label: "Đã chấm / Có điểm" },
  { value: "SUBMITTED", label: "Chờ chấm" },
  { value: "IN_PROGRESS", label: "Đang làm dở" },
];

export default function MySubmissions() {
  const { isAuthenticated } = useAuth();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  // Debounce search
  const debounceTimer = useMemo(
    () => ({ id: null as ReturnType<typeof setTimeout> | null }),
    [],
  );
  const handleSearch = useCallback(
    (value: string) => {
      setSearch(value);
      if (debounceTimer.id) clearTimeout(debounceTimer.id);
      debounceTimer.id = setTimeout(() => {
        setDebouncedSearch(value);
        setPage(1);
      }, 400);
    },
    [debounceTimer],
  );

  const handleStatusChange = useCallback((value: string) => {
    setStatusFilter(value);
    setPage(1);
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: submissionKeys.list({ page, pageSize, search: debouncedSearch, status: statusFilter }),
    queryFn: () =>
      submissionsApi.list({
        page,
        limit: pageSize,
        status: statusFilter !== "all" ? statusFilter : undefined,
      }),
    enabled: isAuthenticated,
    staleTime: 1000 * 30,
    refetchOnWindowFocus: true,
  });

  const submissions = data?.data || [];
  const totalItems = data?.meta?.total || 0;
  const totalPages = data?.meta?.totalPages || Math.ceil(totalItems / pageSize);

  // Client-side search filter
  const filteredSubmissions = debouncedSearch
    ? submissions.filter((s: any) => {
        const term = debouncedSearch.toLowerCase();
        return (
          s.exam?.title?.toLowerCase().includes(term) ||
          s.exam?.course?.title?.toLowerCase().includes(term)
        );
      })
    : submissions;

  const examIds = useMemo<string[]>(
    () =>
      Array.from(
        new Set<string>(
          filteredSubmissions
            .map((submission: any) => submission.examId)
            .filter((id: any): id is string => typeof id === "string" && Boolean(id)),
        ),
      ),
    [filteredSubmissions],
  );

  const latestSubmissionQueries = useQueries({
    queries: examIds.map((examId) => ({
      queryKey: submissionKeys.latestByExam(examId),
      queryFn: () => submissionsApi.getLatestByExam(examId),
      enabled: isAuthenticated && !!examId,
      staleTime: 1000 * 30,
    })),
  });

  const latestSubmissionByExam = useMemo(() => {
    const result: Record<string, any | null> = {};
    examIds.forEach((examId, index) => {
      result[examId] = latestSubmissionQueries[index]?.data ?? null;
    });
    return result;
  }, [examIds, latestSubmissionQueries]);

  const latestSubmissionLoadingByExam = useMemo(() => {
    const result: Record<string, boolean> = {};
    examIds.forEach((examId, index) => {
      result[examId] = !!latestSubmissionQueries[index]?.isLoading;
    });
    return result;
  }, [examIds, latestSubmissionQueries]);

  const latestSubmissionErrorByExam = useMemo(() => {
    const result: Record<string, boolean> = {};
    examIds.forEach((examId, index) => {
      result[examId] = !!latestSubmissionQueries[index]?.isError;
    });
    return result;
  }, [examIds, latestSubmissionQueries]);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="h-6 w-6 text-amber-500" />
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              Bảo Tàng Chiến Tích
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Lưu giữ và theo dõi các cột mốc luyện tập bạn đã hoàn thành
          </p>
        </div>

        {totalItems > 0 && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold self-start sm:self-auto">
            <Award className="h-4 w-4" />
            <span>{totalItems} bài đã thực hiện</span>
          </div>
        )}
      </div>

      {/* Search & Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm theo tên bài tập hoặc khóa học..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-9 pr-9 bg-card"
          />
          {search && (
            <button
              onClick={() => handleSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Select value={statusFilter} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-full sm:w-[200px] bg-card">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Content Area */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-2xl" />
          ))}
        </div>
      ) : filteredSubmissions.length > 0 ? (
        <div className="space-y-6">
          {/* Achievement Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5">
            {filteredSubmissions.map((submission: any) => {
              const canonicalStatus = normalizeSubmissionStatus(submission?.status);
              const status = statusConfig[canonicalStatus] || statusConfig.IN_PROGRESS;
              const StatusIcon = status.icon;

              const exam = submission.exam;
              const skillType = detectExamSkill(exam || { title: submission.examTitle });
              const skillBadge = getSkillBadgeConfig(skillType);

              const latestReviewSubmission = submission.examId
                ? latestSubmissionByExam[submission.examId]
                : null;
              const latestReviewLoading = submission.examId
                ? latestSubmissionLoadingByExam[submission.examId]
                : false;
              const latestReviewError = submission.examId
                ? latestSubmissionErrorByExam[submission.examId]
                : false;
              const latestReviewLink = latestReviewSubmission && submission.examId
                ? routes.exam.review(submission.examId, latestReviewSubmission.id)
                : null;

              const courseTitle = exam?.course?.title || "";
              const examTitle = exam?.title || "Bài tập";

              // Score calculation
              const hasObjectiveScore =
                submission.correctAnswers != null && submission.totalQuestions != null;
              const objectivePercent = hasObjectiveScore && submission.totalQuestions > 0
                ? Math.round((submission.correctAnswers / submission.totalQuestions) * 100)
                : null;

              const isGradedSubjective =
                canonicalStatus === "GRADED" && submission.totalScore != null;

              // Seal / Badge logic
              let achievementSeal: { label: string; className: string } | null = null;
              if (hasObjectiveScore && objectivePercent != null) {
                if (objectivePercent === 100) {
                  achievementSeal = {
                    label: "100% Chính xác",
                    className: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
                  };
                } else if (objectivePercent >= 80) {
                  achievementSeal = {
                    label: "Kết quả tốt",
                    className: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
                  };
                }
              } else if (isGradedSubjective) {
                achievementSeal = {
                  label: "Đã hoàn thành",
                  className: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30",
                };
              }

              return (
                <div
                  key={submission.id}
                  className="group relative flex flex-col justify-between p-5 rounded-2xl border bg-card/60 backdrop-blur-sm hover:bg-card hover:shadow-md hover:border-primary/30 transition-all duration-200"
                >
                  <div>
                    {/* Card Top: Skill & Status / Seal */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <Badge
                        variant="outline"
                        className={`font-medium px-2.5 py-0.5 text-xs ${skillBadge.badgeClass}`}
                      >
                        {skillBadge.label}
                      </Badge>

                      {achievementSeal ? (
                        <span
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${achievementSeal.className}`}
                        >
                          {achievementSeal.label}
                        </span>
                      ) : (
                        <Badge variant={status.variant} className="gap-1 text-[11px] px-2 py-0.5">
                          <StatusIcon className="h-3 w-3" />
                          {status.label}
                        </Badge>
                      )}
                    </div>

                    {/* Card Body: Title & Course */}
                    <div className="space-y-1 mb-4">
                      <h3
                        className="font-semibold text-foreground text-base line-clamp-2 group-hover:text-primary transition-colors"
                        title={examTitle}
                      >
                        {examTitle}
                      </h3>
                      {courseTitle && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1.5 line-clamp-1">
                          <BookOpen className="h-3.5 w-3.5 shrink-0 opacity-70" />
                          <span>{courseTitle}</span>
                        </p>
                      )}
                    </div>

                    {/* Hero Metric Box */}
                    <div className="p-3.5 rounded-xl bg-muted/40 border border-border/50 text-center mb-4">
                      {hasObjectiveScore ? (
                        <div>
                          <div className="text-2xl font-bold text-foreground tracking-tight">
                            <span className="text-primary">{submission.correctAnswers}</span>
                            <span className="text-muted-foreground text-lg font-normal">
                              {" "}/ {submission.totalQuestions}
                            </span>
                          </div>
                          <p className="text-[11px] text-muted-foreground mt-0.5 font-medium">
                            Đúng {objectivePercent}% số câu
                          </p>
                        </div>
                      ) : isGradedSubjective ? (
                        <div>
                          <div className="text-2xl font-bold text-primary tracking-tight">
                            Band {submission.totalScore}
                          </div>
                          <p className="text-[11px] text-muted-foreground mt-0.5 font-medium">
                            Đã có nhận xét & đánh giá
                          </p>
                        </div>
                      ) : canonicalStatus === "SUBMITTED" ? (
                        <div className="py-1">
                          <span className="text-sm font-medium text-amber-600 dark:text-amber-400 flex items-center justify-center gap-1.5">
                            <Clock className="h-4 w-4" />
                            Đang chờ chấm
                          </span>
                          {submission.submittedAt && (() => {
                            const sla = calculateGradingSla(submission.submittedAt, null, "SUBMITTED");
                            return (
                              <p className="text-[11px] text-muted-foreground mt-1 font-medium">
                                Dự kiến: {sla.formattedDeadline}
                              </p>
                            );
                          })()}
                        </div>
                      ) : canonicalStatus === "IN_PROGRESS" ? (
                        <div className="py-1">
                          <span className="text-sm font-medium text-blue-600 dark:text-blue-400 flex items-center justify-center gap-1.5">
                            <Sparkles className="h-4 w-4" />
                            Đang làm dở
                          </span>
                          <p className="text-[11px] text-muted-foreground mt-0.5">
                            Chưa nộp bài
                          </p>
                        </div>
                      ) : (
                        <div className="py-1">
                          <span className="text-sm text-muted-foreground">
                            Chưa có điểm
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer: Date & Actions */}
                  <div className="pt-3 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 shrink-0 opacity-70" />
                      <span>
                        {submission.startedAt
                          ? format(new Date(submission.startedAt), "dd/MM/yyyy HH:mm", { locale: vi })
                          : "—"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 justify-end">
                      {canonicalStatus === "IN_PROGRESS" ? (
                        <Button size="sm" className="h-8 text-xs font-semibold rounded-lg w-full sm:w-auto" asChild>
                          <Link to={routes.exam.take(submission.examId)}>
                            Tiếp tục
                            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                          </Link>
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" className="h-8 text-xs rounded-lg hover:bg-primary/5 hover:text-primary w-full sm:w-auto" asChild>
                          <Link to={routes.student.submission(submission.id)}>
                            <Eye className="mr-1.5 h-3.5 w-3.5" />
                            {canonicalStatus === "GRADED" ? "Xem kết quả" : "Xem chi tiết"}
                          </Link>
                        </Button>
                      )}

                      {latestReviewLoading && (
                        <Button size="sm" variant="ghost" className="h-8 text-xs" disabled>
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        </Button>
                      )}

                      {!latestReviewLoading && latestReviewLink && (
                        <Button size="sm" variant="secondary" className="h-8 text-xs rounded-lg" asChild>
                          <Link to={latestReviewLink}>Xem lại</Link>
                        </Button>
                      )}

                      {!latestReviewLoading && !latestReviewLink && latestReviewError && (
                        <span className="text-[10px] text-destructive">Lỗi review</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <DataTablePagination
            currentPage={page}
            totalPages={totalPages}
            pageSize={pageSize}
            totalItems={totalItems}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
          />
        </div>
      ) : (
        <div className="text-center py-16 px-4 border rounded-3xl bg-muted/20 backdrop-blur-sm">
          <div className="h-16 w-16 mx-auto mb-4 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <Trophy className="h-8 w-8 opacity-80" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-1">
            {debouncedSearch || statusFilter !== "all"
              ? "Không tìm thấy bài tập nào phù hợp"
              : "Bảo tàng chưa có chiến tích"}
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-6">
            {debouncedSearch || statusFilter !== "all"
              ? "Hãy thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc trạng thái."
              : "Mọi hành trình vạn dặm đều bắt đầu từ bài luyện tập đầu tiên. Hãy bắt đầu ngay!"}
          </p>
          {!debouncedSearch && statusFilter === "all" && (
            <Button asChild className="font-semibold rounded-xl px-6">
              <Link to="/app">
                Vào làm bài tập lớp học
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
