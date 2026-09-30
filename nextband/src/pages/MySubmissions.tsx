import { useState, useCallback, useMemo } from "react";
import { useQuery, useQueries } from "@tanstack/react-query";
import { submissionsApi, lessonsApi } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { useStudentLifecycle } from "@/hooks/useStudentLifecycle";
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
  Zap,
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
import { detectExamSkill, getSkillBadgeConfig, ExamSkillType } from "@/lib/examSkillHelper";
import { parseWeekAndDay, compareHomeworkOrder } from "@/lib/homeworkStatusHelper";

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
  { value: "GRADED", label: "✓ Đã chấm / Có điểm" },
  { value: "SUBMITTED", label: "⏳ Chờ chấm" },
  { value: "IN_PROGRESS", label: "🔄 Đang làm dở" },
  { value: "UNSUBMITTED", label: "⚡ Chưa làm (Cần làm ngay)" },
  { value: "REVISION_REQUIRED", label: "⚠️ Cần sửa bài (Attempt 2)" },
];

const SKILL_PILL_OPTIONS: { value: string; label: string }[] = [
  { value: "all", label: "Tất cả" },
  { value: "writing", label: "✍️ Writing" },
  { value: "speaking", label: "🗣️ Speaking" },
  { value: "listening", label: "🎧 Listening" },
  { value: "reading", label: "📖 Reading" },
  { value: "grammar", label: "📝 Grammar" },
];

const ERROR_CATEGORY_CONFIG: Record<
  string,
  { label: string; badgeClass: string; dotClass: string }
> = {
  STRUCTURE: {
    label: "Cấu trúc câu",
    badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
    dotClass: "bg-blue-500",
  },
  CONCEPT: {
    label: "Ý tưởng & Logic",
    badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
    dotClass: "bg-amber-500",
  },
  EXPRESSION: {
    label: "Từ vựng & Diễn đạt",
    badgeClass: "bg-purple-50 text-purple-700 border-purple-200",
    dotClass: "bg-purple-500",
  },
  GRAMMAR: {
    label: "Ngữ pháp / Dấu câu",
    badgeClass: "bg-rose-50 text-rose-700 border-rose-200",
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

interface WeekGroupItem {
  id: string;
  examId: string;
  title: string;
  description?: string;
  courseTitle?: string;
  skillType: ExamSkillType;
  submission: any | null;
  canonicalStatus: CanonicalSubmissionStatus | "UNSUBMITTED";
  week: number;
  day: number;
  deadline?: string | null;
}

export default function MySubmissions() {
  const { user, isAuthenticated } = useAuth();
  const { enrollments } = useStudentLifecycle();
  const enrolledClass = enrollments?.[0];
  const enrolledClassId = enrolledClass?.classId;

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [skillFilter, setSkillFilter] = useState("all");
  const [errorFilter, setErrorFilter] = useState("all");

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
      }, 350);
    },
    [debounceTimer],
  );

  const handleStatusChange = useCallback((value: string) => {
    setStatusFilter(value);
  }, []);

  const handleCategoryFilter = useCallback((value: string) => {
    setErrorFilter(value);
  }, []);

  // Fetch full submissions list of student (limit 150)
  const { data: allUserSubmissionsData, isLoading: submissionsLoading } = useQuery({
    queryKey: ["my-submissions-all-stats", user?.id],
    queryFn: () => submissionsApi.list({ limit: 150 }),
    enabled: isAuthenticated && !!user?.id,
    staleTime: 1000 * 20,
    refetchOnWindowFocus: true,
    refetchInterval: (query) => {
      const items = query.state.data?.data || [];
      const hasPending = items.some(
        (s: any) => String(s.status || "").toUpperCase() === "SUBMITTED"
      );
      return hasPending ? 20000 : false;
    },
  });

  const allSubmissions = useMemo(() => {
    return Array.isArray(allUserSubmissionsData?.data) ? allUserSubmissionsData.data : [];
  }, [allUserSubmissionsData]);

  // Fetch class lessons to discover ALL assigned exercises in curriculum (including unsubmitted ones)
  const { data: classLessonData, isLoading: classLessonsLoading } = useQuery({
    queryKey: ["class-lessons-for-submissions", enrolledClassId],
    queryFn: () => lessonsApi.getClassLessons(enrolledClassId || ""),
    enabled: !!enrolledClassId && isAuthenticated,
    staleTime: 1000 * 60 * 3,
    refetchOnWindowFocus: false,
  });

  const classLessons = useMemo(() => {
    return Array.isArray(classLessonData?.data?.lessons) ? classLessonData.data.lessons : [];
  }, [classLessonData]);

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

    return {
      counts,
      revisionRequiredCount,
      resolvedAttempt2Count,
      totalFeedbackCount: Object.values(counts).reduce((s, c) => s + c, 0),
    };
  }, [allSubmissions]);

  // Combine Class Curriculum & Submissions into Unified Exercise Items
  const unifiedItems = useMemo<WeekGroupItem[]>(() => {
    // 1. Group submissions by examId, pick the highest precedence/latest submission
    const submissionByExamId = new Map<string, any>();
    allSubmissions.forEach((sub: any) => {
      const eId = sub.examId || sub.exam_id || sub.exam?.id;
      if (!eId) return;
      const existing = submissionByExamId.get(eId);
      if (!existing) {
        submissionByExamId.set(eId, sub);
      } else {
        const existingStatus = normalizeSubmissionStatus(existing.status);
        const currentStatus = normalizeSubmissionStatus(sub.status);
        const getPriority = (st: CanonicalSubmissionStatus) =>
          st === "GRADED" ? 4 : st === "SUBMITTED" ? 3 : st === "IN_PROGRESS" ? 2 : 1;
        if (getPriority(currentStatus) > getPriority(existingStatus)) {
          submissionByExamId.set(eId, sub);
        } else if (getPriority(currentStatus) === getPriority(existingStatus)) {
          const tCur = new Date(sub.submittedAt || sub.createdAt || 0).getTime();
          const tExt = new Date(existing.submittedAt || existing.createdAt || 0).getTime();
          if (tCur > tExt) submissionByExamId.set(eId, sub);
        }
      }
    });

    const items: WeekGroupItem[] = [];
    const processedExamIds = new Set<string>();

    // 2. Add all exercises from curriculum if available
    classLessons.forEach((lesson: any) => {
      const examId = lesson.id;
      if (!examId) return;
      processedExamIds.add(examId);

      const sub = submissionByExamId.get(examId) || null;
      const title = lesson.title || sub?.exam?.title || sub?.examTitle || "Bài tập";
      const { week, day } = parseWeekAndDay(title, lesson.week ?? lesson.lessonOrder);
      const skillType = detectExamSkill(lesson.exam || sub?.exam || { title });

      let canonicalStatus: CanonicalSubmissionStatus | "UNSUBMITTED" = "UNSUBMITTED";
      if (sub) {
        canonicalStatus = normalizeSubmissionStatus(sub.status);
      }

      items.push({
        id: examId,
        examId,
        title,
        description: lesson.description || sub?.exam?.description,
        courseTitle: lesson.course?.title || sub?.exam?.course?.title || enrolledClass?.courseTitle,
        skillType,
        submission: sub,
        canonicalStatus,
        week,
        day,
        deadline: lesson.homework?.deadline,
      });
    });

    // 3. Add any submissions that weren't in classLessons (e.g. standalone/mock exams)
    allSubmissions.forEach((sub: any) => {
      const examId = sub.examId || sub.exam_id || sub.exam?.id;
      if (!examId || processedExamIds.has(examId)) return;
      processedExamIds.add(examId);

      const title = sub.exam?.title || sub.examTitle || "Bài tập";
      const { week, day } = parseWeekAndDay(title);
      const skillType = detectExamSkill(sub.exam || { title });
      const canonicalStatus = normalizeSubmissionStatus(sub.status);

      items.push({
        id: examId,
        examId,
        title,
        description: sub.exam?.description,
        courseTitle: sub.exam?.course?.title || enrolledClass?.courseTitle,
        skillType,
        submission: sub,
        canonicalStatus,
        week,
        day,
      });
    });

    // 4. Sort by compareHomeworkOrder (Week 1 -> Week 2 -> ... Day 1 -> Day 2 -> ...)
    return items.sort((a, b) => compareHomeworkOrder(a, b));
  }, [allSubmissions, classLessons, enrolledClass?.courseTitle]);

  // Overall counts for summary pills
  const totalStats = useMemo(() => {
    let graded = 0;
    let pending = 0;
    let inProgress = 0;
    let unsubmitted = 0;

    unifiedItems.forEach((item) => {
      if (item.canonicalStatus === "GRADED") graded++;
      else if (item.canonicalStatus === "SUBMITTED") pending++;
      else if (item.canonicalStatus === "IN_PROGRESS") inProgress++;
      else if (item.canonicalStatus === "UNSUBMITTED") unsubmitted++;
    });

    return { graded, pending, inProgress, unsubmitted, total: unifiedItems.length };
  }, [unifiedItems]);

  // Filter items by Search, Status, Skill, and Error Category
  const filteredItems = useMemo(() => {
    return unifiedItems.filter((item) => {
      // 1. Search term
      if (debouncedSearch) {
        const term = debouncedSearch.toLowerCase();
        const matchesTerm =
          item.title.toLowerCase().includes(term) ||
          item.courseTitle?.toLowerCase().includes(term) ||
          item.description?.toLowerCase().includes(term);
        if (!matchesTerm) return false;
      }

      // 2. Status filter
      if (statusFilter !== "all") {
        if (statusFilter === "REVISION_REQUIRED") {
          if (!item.submission?.revisionRequired) return false;
        } else if (statusFilter === "UNSUBMITTED") {
          if (item.canonicalStatus !== "UNSUBMITTED") return false;
        } else if (item.canonicalStatus !== statusFilter) {
          return false;
        }
      }

      // 3. Skill filter
      if (skillFilter !== "all") {
        if (skillFilter === "writing" && item.skillType !== "writing") return false;
        if (skillFilter === "speaking" && item.skillType !== "speaking") return false;
        if (skillFilter === "listening" && item.skillType !== "listening") return false;
        if (skillFilter === "reading" && item.skillType !== "reading") return false;
        if (skillFilter === "grammar" && !["grammar", "objective"].includes(item.skillType)) return false;
      }

      // 4. Error Category filter
      if (errorFilter !== "all") {
        if (item.submission?.primaryErrorCategory !== errorFilter) return false;
      }

      return true;
    });
  }, [unifiedItems, debouncedSearch, statusFilter, skillFilter, errorFilter]);

  // Group filtered items by Week
  const groupedByWeek = useMemo(() => {
    const groups: { weekNumber: number; title: string; items: WeekGroupItem[] }[] = [];
    const weekMap = new Map<number, WeekGroupItem[]>();

    filteredItems.forEach((item) => {
      const w = item.week;
      if (!weekMap.has(w)) {
        weekMap.set(w, []);
      }
      weekMap.get(w)!.push(item);
    });

    const sortedWeeks = Array.from(weekMap.keys()).sort((a, b) => a - b);
    sortedWeeks.forEach((w) => {
      const items = weekMap.get(w)!;
      const title = w === 999 ? "Đề thi & Luyện tập Tổng hợp" : `Tuần ${w}`;
      groups.push({
        weekNumber: w,
        title,
        items,
      });
    });

    return groups;
  }, [filteredItems]);

  const isLoading = submissionsLoading || (!!enrolledClassId && classLessonsLoading);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header Section (Pure Light Mode Daylight aesthetic) */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="h-6 w-6 text-amber-500" />
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Bảo Tàng Chiến Tích
            </h1>
            {enrolledClass?.className && (
              <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 font-semibold text-xs">
                {enrolledClass.className}
              </Badge>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Lưu giữ kết quả, xem nhận xét chi tiết của giáo viên và theo dõi tiến trình làm bài theo từng Tuần học
          </p>
        </div>

        {/* Quick summary stats */}
        <div className="flex items-center gap-2.5 text-xs flex-wrap">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-bold">{totalStats.graded}</span> Đã chấm
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="font-bold">{totalStats.pending}</span> Chờ chấm
          </div>
          {totalStats.unsubmitted > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 font-medium">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span className="font-bold">{totalStats.unsubmitted}</span> Cần làm bù
            </div>
          )}
        </div>
      </div>

      {/* Error Spotlight & Attempt 2 Status Summary Banner */}
      {errorSpotlight.totalFeedbackCount > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl border border-amber-200/90 bg-gradient-to-r from-amber-50/80 via-orange-50/50 to-white space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-500/15 text-amber-700">
                <Tag className="h-4 w-4" />
              </div>
              <span className="font-bold text-sm text-slate-900">
                Gương Soi Nhóm Lỗi & Tiến Trình Sửa Bài (Attempt 2)
              </span>
            </div>
            <div className="flex items-center gap-2 flex-wrap text-xs">
              {errorSpotlight.resolvedAttempt2Count > 0 && (
                <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-full border border-emerald-300">
                  <CheckCircle className="h-3.5 w-3.5" />
                  Đã khắc phục xong {errorSpotlight.resolvedAttempt2Count} bài
                </span>
              )}
              {errorSpotlight.revisionRequiredCount > 0 && (
                <span className="inline-flex items-center gap-1 font-semibold text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-full border border-amber-300">
                  <AlertCircle className="h-3.5 w-3.5 text-amber-600" />
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
                      ? "border-indigo-600 bg-indigo-50/60 shadow-xs"
                      : "border-slate-200/90 bg-white hover:bg-slate-50 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[11px] font-semibold text-slate-600 line-clamp-1">
                      {config.label}
                    </span>
                    <span className={`w-2 h-2 rounded-full shrink-0 ${config.dotClass}`} />
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-extrabold text-slate-900">{count}</span>
                    <span className="text-[10px] text-slate-500">lần lưu ý</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Filter & Skill Bar (All 5 Skills: Writing, Speaking, Listening, Reading, Grammar) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200/90 shadow-xs">
        {/* 5 Skill Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {SKILL_PILL_OPTIONS.map((pill) => {
            const isSelected = skillFilter === pill.value;
            return (
              <button
                key={pill.value}
                type="button"
                onClick={() => setSkillFilter(pill.value)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  isSelected
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-indigo-600"
                }`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>

        {/* Search & Status filter */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <Input
              placeholder="Tìm bài tập..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-8 pr-7 h-9 text-xs bg-slate-50 border-slate-200 rounded-xl w-36 sm:w-44 focus:bg-white"
            />
            {search && (
              <button
                onClick={() => handleSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          <Select value={statusFilter} onValueChange={handleStatusChange}>
            <SelectTrigger className="h-9 w-full sm:w-[190px] text-xs bg-slate-50 border-slate-200 rounded-xl font-medium text-slate-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value} className="text-xs">
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active Filter Badges */}
      {(errorFilter !== "all" || statusFilter !== "all" || skillFilter !== "all") && (
        <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500">
          <span>Đang lọc:</span>
          {skillFilter !== "all" && (
            <Badge variant="secondary" className="gap-1 text-xs bg-slate-100 text-slate-700">
              Kỹ năng: {SKILL_PILL_OPTIONS.find((s) => s.value === skillFilter)?.label}
              <button onClick={() => setSkillFilter("all")} className="ml-1 hover:text-slate-900">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {statusFilter !== "all" && (
            <Badge variant="secondary" className="gap-1 text-xs bg-slate-100 text-slate-700">
              Trạng thái: {STATUS_OPTIONS.find((o) => o.value === statusFilter)?.label}
              <button onClick={() => setStatusFilter("all")} className="ml-1 hover:text-slate-900">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {errorFilter !== "all" && (
            <Badge variant="secondary" className="gap-1 text-xs bg-slate-100 text-slate-700">
              Nhóm lỗi: {ERROR_CATEGORY_CONFIG[errorFilter]?.label || errorFilter}
              <button onClick={() => setErrorFilter("all")} className="ml-1 hover:text-slate-900">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          <button
            onClick={() => {
              setSkillFilter("all");
              setStatusFilter("all");
              setErrorFilter("all");
            }}
            className="text-xs text-indigo-600 font-semibold underline hover:opacity-80 ml-1"
          >
            Xóa bộ lọc
          </button>
        </div>
      )}

      {/* Content Area: Grouped by Week */}
      {isLoading ? (
        <div className="space-y-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-12 w-full rounded-2xl" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(3)].map((_, j) => (
                  <Skeleton key={j} className="h-56 w-full rounded-2xl" />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : groupedByWeek.length > 0 ? (
        <div className="space-y-8">
          {groupedByWeek.map((group) => {
            const completedCount = group.items.filter(
              (item) => item.canonicalStatus === "GRADED"
            ).length;
            const progressPercent = group.items.length > 0
              ? Math.round((completedCount / group.items.length) * 100)
              : 0;

            return (
              <div key={group.weekNumber} className="space-y-3">
                {/* Week Header */}
                <div className="flex items-center justify-between bg-white px-4 py-3 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                      {group.weekNumber === 999 ? "TEST" : `W${group.weekNumber}`}
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-slate-900">
                        {group.title}
                      </h2>
                      <p className="text-xs text-slate-500">
                        {group.items.length} bài tập • Đã nộp {completedCount}/{group.items.length} bài
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      Tiến độ: {progressPercent}%
                    </span>
                  </div>
                </div>

                {/* Exercises Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.items.map((item) => {
                    const submission = item.submission;
                    const canonicalStatus = item.canonicalStatus;
                    const isUnsubmitted = canonicalStatus === "UNSUBMITTED";
                    const isSubjective = ["writing", "speaking"].includes(item.skillType);
                    const skillBadge = getSkillBadgeConfig(item.skillType);

                    // Attempt 2 / Revision state
                    const isRevisionRequired = !!submission?.revisionRequired;
                    const isAttempt2 = submission?.attemptNumber && submission?.attemptNumber >= 2;

                    // Objective scoring
                    const hasObjectiveScore =
                      !isSubjective &&
                      submission?.correctAnswers != null &&
                      submission?.totalQuestions != null;
                    const objectivePercent =
                      hasObjectiveScore && submission.totalQuestions > 0
                        ? Math.round((submission.correctAnswers / submission.totalQuestions) * 100)
                        : null;

                    // Subjective grading
                    const isGradedSubjective =
                      isSubjective &&
                      canonicalStatus === "GRADED" &&
                      submission?.totalScore != null;

                    // Error Category metadata
                    const rawCategory = submission?.primaryErrorCategory;
                    const errorMeta = rawCategory ? ERROR_CATEGORY_CONFIG[rawCategory] : null;

                    return (
                      <div
                        key={item.id}
                        className={`group relative flex flex-col justify-between p-4.5 rounded-2xl border transition-all duration-200 ${
                          isUnsubmitted
                            ? "bg-rose-50/20 border-2 border-dashed border-rose-300 hover:shadow-md hover:border-rose-400"
                            : isRevisionRequired
                            ? "bg-amber-50/40 border-2 border-amber-300 hover:shadow-md"
                            : canonicalStatus === "GRADED"
                            ? "bg-white border-2 border-emerald-200/80 hover:shadow-md hover:border-emerald-300"
                            : "bg-white border border-slate-200 hover:shadow-md hover:border-indigo-300"
                        }`}
                      >
                        <div>
                          {/* Card Top: Skill & Status Badge */}
                          <div className="flex items-center justify-between gap-2 mb-2.5">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <Badge
                                variant="outline"
                                className={`font-medium px-2.5 py-0.5 text-xs ${skillBadge.badgeClass}`}
                              >
                                {skillBadge.label}
                              </Badge>
                              {isAttempt2 && (
                                <Badge variant="secondary" className="text-[10px] px-2 py-0 bg-slate-100 text-slate-700 font-semibold">
                                  Attempt 2
                                </Badge>
                              )}
                            </div>

                            {/* Status label */}
                            {isUnsubmitted ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full border border-rose-200">
                                ⚠️ Chưa làm
                              </span>
                            ) : canonicalStatus === "GRADED" ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                ✓ Đã chấm
                              </span>
                            ) : canonicalStatus === "SUBMITTED" ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                                ⏳ Chờ chấm
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                                🔄 Đang làm
                              </span>
                            )}
                          </div>

                          {/* Card Title & Course */}
                          <div className="space-y-0.5 mb-3">
                            <h3
                              className="font-bold text-slate-900 text-sm line-clamp-2 group-hover:text-indigo-600 transition-colors"
                              title={item.title}
                            >
                              {item.title}
                            </h3>
                            {item.description && (
                              <p className="text-xs text-slate-500 line-clamp-1">
                                {item.description}
                              </p>
                            )}
                          </div>

                          {/* Teacher Diagnostic Error Tag & Attempt 2 Notice */}
                          {(errorMeta || isRevisionRequired) && (
                            <div className="mb-3 space-y-1.5">
                              {errorMeta && (
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
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
                                <div className="p-2 rounded-lg bg-amber-100/70 border border-amber-300 text-[11px] text-amber-900 flex items-start gap-1.5">
                                  <AlertCircle className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
                                  <span className="font-semibold leading-tight">
                                    Giáo viên yêu cầu viết bài sửa (Attempt 2)
                                  </span>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Hero Metric Box (Clear distinction between Subjective vs Objective vs Unsubmitted) */}
                          <div className="rounded-xl p-3 text-center mb-3">
                            {isUnsubmitted ? (
                              <div className="bg-rose-100/60 border border-rose-200 rounded-xl p-3 text-center">
                                <div className="text-xs font-bold text-rose-800">
                                  Chưa nộp bài tập tuần này
                                </div>
                                <p className="text-[11px] text-rose-700 mt-0.5">
                                  Hãy hoàn thành ngay để giáo viên chấm và không bị tụt lại
                                </p>
                              </div>
                            ) : isSubjective ? (
                              isGradedSubjective ? (
                                <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 text-center">
                                  <div className="text-[11px] font-semibold text-emerald-800">
                                    Điểm tổng giáo viên
                                  </div>
                                  <div className="text-2xl font-black text-emerald-600">
                                    Band {submission.totalScore}
                                  </div>
                                  <p className="text-[11px] text-slate-500 mt-0.5 flex items-center justify-center gap-1">
                                    <MessageSquare className="h-3 w-3 opacity-70" />
                                    Đã có nhận xét & đánh giá chi tiết
                                  </p>
                                </div>
                              ) : canonicalStatus === "SUBMITTED" ? (
                                <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3 text-center">
                                  <div className="text-xs font-bold text-amber-800">
                                    Đã nộp bài thành công!
                                  </div>
                                  <div className="text-xs font-semibold text-amber-600 mt-1">
                                    Giáo viên đang đọc & chấm bài
                                  </div>
                                  {submission?.submittedAt && (() => {
                                    const sla = calculateGradingSla(submission.submittedAt, null, "SUBMITTED");
                                    return (
                                      <p className="text-[11px] text-slate-500 mt-0.5">
                                        Dự kiến trả bài: {sla.formattedDeadline}
                                      </p>
                                    );
                                  })()}
                                </div>
                              ) : (
                                <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-3 text-center">
                                  <div className="text-xs font-bold text-blue-800">
                                    Đang làm dở
                                  </div>
                                  <p className="text-[11px] text-slate-500 mt-0.5">
                                    Chưa nộp bài viết/nói
                                  </p>
                                </div>
                              )
                            ) : (
                              // Objective exams (Reading, Listening, Grammar)
                              hasObjectiveScore ? (
                                <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-3 text-center">
                                  <div className="text-[11px] font-semibold text-blue-800">
                                    Kết quả làm bài
                                  </div>
                                  <div className="text-2xl font-black text-blue-600">
                                    {submission.correctAnswers} / {submission.totalQuestions}{" "}
                                    <span className="text-xs font-normal text-slate-500">
                                      ({objectivePercent}%)
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">
                                    {objectivePercent && objectivePercent >= 80 ? "Đạt chuẩn tuần" : "Đã hoàn thành"}
                                  </p>
                                </div>
                              ) : (
                                <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-3 text-center">
                                  <div className="text-xs font-bold text-blue-800">
                                    Đang làm dở
                                  </div>
                                  <p className="text-[11px] text-slate-500 mt-0.5">
                                    Hệ thống đã tự động lưu nháp
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        </div>

                        {/* Card Footer: Date & Single Call-To-Action Button */}
                        <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                          <div className="flex items-center gap-1.5 text-[11px]">
                            <Calendar className="h-3.5 w-3.5 shrink-0 opacity-70" />
                            <span>
                              {submission?.startedAt || submission?.createdAt
                                ? format(
                                    new Date(submission.startedAt || submission.createdAt),
                                    "dd/MM/yyyy",
                                    { locale: vi }
                                  )
                                : "Chưa làm"}
                            </span>
                          </div>

                          <div>
                            {isUnsubmitted ? (
                              <Button
                                size="sm"
                                className="h-8 px-3.5 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-lg shadow-xs flex items-center gap-1.5"
                                asChild
                              >
                                <Link to={routes.exam.take(item.examId)}>
                                  <Zap className="h-3.5 w-3.5" />
                                  Làm ngay
                                </Link>
                              </Button>
                            ) : isRevisionRequired ? (
                              <Button
                                size="sm"
                                className="h-8 text-xs font-bold rounded-lg bg-amber-600 hover:bg-amber-700 text-white shadow-xs"
                                asChild
                              >
                                <Link to={routes.student.submission(submission.id)}>
                                  <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                                  Sửa bài (Attempt 2)
                                </Link>
                              </Button>
                            ) : canonicalStatus === "IN_PROGRESS" ? (
                              <Button
                                size="sm"
                                className="h-8 text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs"
                                asChild
                              >
                                <Link to={routes.exam.take(item.examId)}>
                                  Làm tiếp
                                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                                </Link>
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 text-xs font-semibold rounded-lg border-slate-200 hover:bg-slate-50 text-slate-700"
                                asChild
                              >
                                <Link to={routes.student.submission(submission.id)}>
                                  <Eye className="mr-1.5 h-3.5 w-3.5 text-slate-500" />
                                  {canonicalStatus === "GRADED" ? "Xem nhận xét" : "Xem bài nộp"}
                                </Link>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 px-4 border rounded-3xl bg-white shadow-xs">
          <div className="h-16 w-16 mx-auto mb-4 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Trophy className="h-8 w-8 opacity-80" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-1">
            {debouncedSearch || statusFilter !== "all" || skillFilter !== "all"
              ? "Không tìm thấy bài tập nào phù hợp"
              : "Bảo tàng chưa có chiến tích"}
          </h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">
            {debouncedSearch || statusFilter !== "all" || skillFilter !== "all"
              ? "Hãy thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc."
              : "Mọi hành trình vạn dặm đều bắt đầu từ bài luyện tập đầu tiên. Hãy bắt đầu ngay!"}
          </p>
          {!debouncedSearch && statusFilter === "all" && skillFilter === "all" && (
            <Button asChild className="font-semibold rounded-xl px-6 bg-indigo-600 hover:bg-indigo-700 text-white">
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
