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
  RotateCcw,
  Tag,
  CheckCircle,
  HelpCircle,
  MessageSquare,
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
  { value: "REVISION_REQUIRED", label: "⚠️ Cần sửa bài (Attempt 2)" },
  { value: "GRADED", label: "Đã chấm / Có điểm" },
  { value: "SUBMITTED", label: "Chờ chấm" },
  { value: "IN_PROGRESS", label: "Đang làm dở" },
];

const ERROR_CATEGORY_CONFIG: Record<
  string,
  { label: string; badgeClass: string; dotClass: string }
> = {
  STRUCTURE: {
    label: "Cấu trúc câu",
    badgeClass: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    dotClass: "bg-blue-500",
  },
  CONCEPT: {
    label: "Ý tưởng & Logic",
    badgeClass: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    dotClass: "bg-amber-500",
  },
  EXPRESSION: {
    label: "Từ vựng & Diễn đạt",
    badgeClass: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800",
    dotClass: "bg-purple-500",
  },
  GRAMMAR: {
    label: "Ngữ pháp / Dấu câu",
    badgeClass: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800",
    dotClass: "bg-rose-500",
  },
};

const ERROR_FILTER_OPTIONS = [
  { value: "all", label: "Tất cả nhóm lỗi" },
  { value: "STRUCTURE", label: "Cấu trúc câu (Structure)" },
  { value: "CONCEPT", label: "Ý tưởng & Logic (Concept)" },
  { value: "EXPRESSION", label: "Từ vựng & Diễn đạt (Expression)" },
  { value: "GRAMMAR", label: "Ngữ pháp & Dấu câu (Grammar)" },
];

export default function MySubmissions() {
  const { user, isAuthenticated } = useAuth();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [errorFilter, setErrorFilter] = useState("all");
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

  const handleCategoryFilter = useCallback((value: string) => {
    setErrorFilter(value);
    setPage(1);
  }, []);

  // Fetch paginated submissions
  const apiStatus = statusFilter === "REVISION_REQUIRED" ? undefined : (statusFilter !== "all" ? statusFilter : undefined);
  const { data, isLoading } = useQuery({
    queryKey: submissionKeys.list({ page, pageSize, search: debouncedSearch, status: apiStatus }),
    queryFn: () =>
      submissionsApi.list({
        page,
        limit: pageSize,
        status: apiStatus,
      }),
    enabled: isAuthenticated,
    staleTime: 1000 * 30,
    refetchOnWindowFocus: true,
  });

  // Query all recent submissions of student (limit 150) for overall error spotlight & recovery stats
  const { data: allUserSubmissionsData } = useQuery({
    queryKey: ["my-submissions-all-stats", user?.id],
    queryFn: () => submissionsApi.list({ limit: 150 }),
    enabled: isAuthenticated && !!user?.id,
    staleTime: 1000 * 60,
  });

  const allSubmissions = useMemo(() => {
    return Array.isArray(allUserSubmissionsData?.data) ? allUserSubmissionsData.data : [];
  }, [allUserSubmissionsData]);

  // Thống kê lỗi thường gặp và số bài đã sửa được Attempt 2
  const errorSpotlight = useMemo(() => {
    const counts: Record<string, number> = {
      STRUCTURE: 0,
      CONCEPT: 0,
      EXPRESSION: 0,
      GRAMMAR: 0,
    };
    let revisionRequiredCount = 0;
    let resolvedAttempt2Count = 0;

    // Group by examId to detect Attempt 1 vs Attempt 2
    const examMap: Record<string, any[]> = {};
    allSubmissions.forEach((sub: any) => {
      const eId = sub.examId || sub.exam_id;
      if (eId) {
        if (!examMap[eId]) examMap[eId] = [];
        examMap[eId].push(sub);
      }
    });

    Object.values(examMap).forEach((list) => {
      list.sort((a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime());
      const att1 = list[0];
      const att2 = list.length > 1 ? list[1] : null;

      if (att1?.primaryErrorCategory && counts[att1.primaryErrorCategory] !== undefined) {
        counts[att1.primaryErrorCategory]++;
      }
      if (att1?.revisionRequired) {
        if (att2) {
          const rawStatus2 = String(att2.status || "").toUpperCase();
          if (rawStatus2 === "GRADED" && att2.revisionRequired === false) {
            resolvedAttempt2Count++;
          } else if (att2.revisionRequired) {
            revisionRequiredCount++;
          }
        } else {
          revisionRequiredCount++;
        }
      }
    });

    const topIssues = Object.entries(counts)
      .filter(([_, count]) => count > 0)
      .sort((a, b) => b[1] - a[1]);

    return {
      counts,
      topIssues,
      revisionRequiredCount,
      resolvedAttempt2Count,
      totalFeedbackCount: Object.values(counts).reduce((s, c) => s + c, 0),
    };
  }, [allSubmissions]);

  const rawSubmissions = data?.data || [];

  // Client-side search & category & revisionRequired filters
  const filteredSubmissions = useMemo(() => {
    return rawSubmissions.filter((s: any) => {
      if (debouncedSearch) {
        const term = debouncedSearch.toLowerCase();
        const matchesTerm =
          s.exam?.title?.toLowerCase().includes(term) ||
          s.exam?.course?.title?.toLowerCase().includes(term);
        if (!matchesTerm) return false;
      }

      if (statusFilter === "REVISION_REQUIRED" && !s.revisionRequired) {
        return false;
      }

      if (errorFilter !== "all") {
        if (s.primaryErrorCategory !== errorFilter) {
          return false;
        }
      }

      return true;
    });
  }, [rawSubmissions, debouncedSearch, statusFilter, errorFilter]);

  const totalItems = data?.meta?.total || 0;
  const totalPages = data?.meta?.totalPages || Math.ceil(totalItems / pageSize);

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
            Lưu giữ, soi chiếu nhóm lỗi cần khắc phục và theo dõi tiến trình sửa bài Attempt 2
          </p>
        </div>

        {totalItems > 0 && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold self-start sm:self-auto">
            <Award className="h-4 w-4" />
            <span>{totalItems} bài đã thực hiện</span>
          </div>
        )}
      </div>

      {/* Error Spotlight & Attempt 2 Status Summary Banner */}
      {errorSpotlight.totalFeedbackCount > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl border border-amber-200/80 bg-gradient-to-r from-amber-50/70 via-orange-50/40 to-background dark:border-amber-900/50 dark:from-amber-950/20 dark:via-orange-950/10 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-500/15 text-amber-700 dark:text-amber-400">
                <Tag className="h-4 w-4" />
              </div>
              <span className="font-bold text-sm text-foreground">
                Gương Soi Nhóm Lỗi & Tiến Trình Sửa Bài (Attempt 2)
              </span>
            </div>
            <div className="flex items-center gap-2 flex-wrap text-xs">
              {errorSpotlight.resolvedAttempt2Count > 0 && (
                <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-100/60 dark:bg-emerald-950/50 px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
                  <CheckCircle className="h-3.5 w-3.5" />
                  Đã khắc phục xong {errorSpotlight.resolvedAttempt2Count} bài
                </span>
              )}
              {errorSpotlight.revisionRequiredCount > 0 && (
                <span className="inline-flex items-center gap-1 font-semibold text-amber-800 dark:text-amber-300 bg-amber-100/70 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-300 dark:border-amber-800">
                  <AlertCircle className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                  {errorSpotlight.revisionRequiredCount} bài cần làm Attempt 2
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
            {Object.entries(ERROR_CATEGORY_CONFIG).map(([key, config]) => {
              const count = errorSpotlight.counts[key] || 0;
              const isSelected = errorFilter === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setErrorFilter(isSelected ? "all" : key)}
                  className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? "border-primary bg-primary/10 shadow-xs"
                      : "border-border/60 bg-card/60 hover:bg-card hover:border-border"
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[11px] font-semibold text-muted-foreground line-clamp-1">
                      {config.label}
                    </span>
                    <span className={`w-2 h-2 rounded-full shrink-0 ${config.dotClass}`} />
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-extrabold text-foreground">{count}</span>
                    <span className="text-[10px] text-muted-foreground">lần lưu ý</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

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

        {/* Filter by primary error category */}
        <Select value={errorFilter} onValueChange={handleCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[210px] bg-card">
            <SelectValue placeholder="Lọc theo nhóm lỗi" />
          </SelectTrigger>
          <SelectContent>
            {ERROR_FILTER_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Filter by status */}
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

      {/* Active Filter Badges */}
      {(errorFilter !== "all" || statusFilter !== "all") && (
        <div className="flex items-center gap-2 flex-wrap text-xs text-muted-foreground">
          <span>Đang lọc:</span>
          {errorFilter !== "all" && (
            <Badge variant="secondary" className="gap-1 text-xs">
              Nhóm lỗi: {ERROR_CATEGORY_CONFIG[errorFilter]?.label || errorFilter}
              <button
                onClick={() => setErrorFilter("all")}
                className="ml-1 hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {statusFilter !== "all" && (
            <Badge variant="secondary" className="gap-1 text-xs">
              Trạng thái: {STATUS_OPTIONS.find((o) => o.value === statusFilter)?.label}
              <button
                onClick={() => setStatusFilter("all")}
                className="ml-1 hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          <button
            onClick={() => {
              setErrorFilter("all");
              setStatusFilter("all");
            }}
            className="text-xs text-primary underline hover:opacity-80 ml-1"
          >
            Xóa bộ lọc
          </button>
        </div>
      )}

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

              // Error Category metadata
              const rawCategory = submission.primaryErrorCategory;
              const errorMeta = rawCategory ? ERROR_CATEGORY_CONFIG[rawCategory] : null;

              // Attempt 2 / Revision state
              const isRevisionRequired = !!submission.revisionRequired;
              const isAttempt2 = submission.attemptNumber && submission.attemptNumber >= 2;

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
                if (!isRevisionRequired && isAttempt2) {
                  achievementSeal = {
                    label: "✨ Đã sửa xong",
                    className: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
                  };
                } else {
                  achievementSeal = {
                    label: "Đã hoàn thành",
                    className: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30",
                  };
                }
              }

              return (
                <div
                  key={submission.id}
                  className={`group relative flex flex-col justify-between p-5 rounded-2xl border transition-all duration-200 ${
                    isRevisionRequired
                      ? "border-amber-300 bg-amber-50/30 dark:bg-amber-950/15 dark:border-amber-800/70 hover:shadow-md"
                      : "bg-card/60 backdrop-blur-sm hover:bg-card hover:shadow-md hover:border-primary/30"
                  }`}
                >
                  <div>
                    {/* Card Top: Skill & Status / Seal */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <Badge
                          variant="outline"
                          className={`font-medium px-2.5 py-0.5 text-xs ${skillBadge.badgeClass}`}
                        >
                          {skillBadge.label}
                        </Badge>
                        {isAttempt2 && (
                          <Badge variant="secondary" className="text-[10px] px-2 py-0 bg-slate-100 dark:bg-slate-800 font-semibold">
                            Attempt 2
                          </Badge>
                        )}
                      </div>

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
                    <div className="space-y-1 mb-3">
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

                    {/* Teacher Diagnostic Error Tag & Attempt 2 Notice */}
                    {(errorMeta || isRevisionRequired) && (
                      <div className="mb-3 space-y-1.5">
                        {errorMeta && (
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1">
                              <Tag className="h-3 w-3 opacity-70" />
                              Lỗi chính:
                            </span>
                            <span
                              className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${errorMeta.badgeClass}`}
                            >
                              {errorMeta.label}
                            </span>
                          </div>
                        )}

                        {isRevisionRequired && (
                          <div className="p-2 rounded-lg bg-amber-100/70 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-800/80 text-[11px] text-amber-900 dark:text-amber-200 flex items-start gap-1.5">
                            <AlertCircle className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                            <span className="font-semibold leading-tight">
                              Giáo viên yêu cầu viết bài sửa (Attempt 2)
                            </span>
                          </div>
                        )}
                      </div>
                    )}

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
                          <p className="text-[11px] text-muted-foreground mt-0.5 font-medium flex items-center justify-center gap-1">
                            <MessageSquare className="h-3 w-3 opacity-70" />
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

                    <div className="flex items-center gap-2 justify-end flex-wrap">
                      {canonicalStatus === "IN_PROGRESS" ? (
                        <Button size="sm" className="h-8 text-xs font-semibold rounded-lg w-full sm:w-auto" asChild>
                          <Link to={routes.exam.take(submission.examId)}>
                            Tiếp tục
                            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                          </Link>
                        </Button>
                      ) : isRevisionRequired ? (
                        <Button size="sm" className="h-8 text-xs font-bold rounded-lg bg-amber-600 hover:bg-amber-700 text-white w-full sm:w-auto shadow-xs" asChild>
                          <Link to={routes.student.submission(submission.id)}>
                            <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                            Sửa bài (Attempt 2)
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

                      {!latestReviewLoading && latestReviewLink && !isRevisionRequired && (
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
