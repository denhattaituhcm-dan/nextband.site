import { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { classesApi, usersApi, coursesApi, sessionsApi, generateSessionDates, roomsApi } from "@/lib/api";
import { useBranch } from "@/contexts/BranchContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectSeparator,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  ArrowUpDown,
  Users,
  Loader2,
  Calendar,
  GraduationCap,
  School,
  AlertCircle,
  MoreVertical,
  ArrowRight,
  CheckCircle2,
  Clock,
  Filter,
  BookOpen,
  MapPin,
  Building2,
  Crown,
  Sparkles,
  ArrowDownUp,
  X,
} from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { DataTablePagination } from "@/components/admin/DataTablePagination";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";
import { getCourseBrand } from "@/lib/courseBrand";

export interface LevelRoadmapConfig {
  key: "leader" | "master" | "builder" | "dreamer" | "starter";
  name: string;
  band: string;
  duration: string;
  entry: string;
  target: string;
  theme: {
    badgeClass: string;
    borderClass: string;
    bgSoftClass: string;
    textClass: string;
    dotClass: string;
    durationBadgeClass: string;
    accentHex: string;
  };
}

export const IELTS_LEVEL_ROADMAP: LevelRoadmapConfig[] = [
  {
    key: "leader",
    name: "KHÓA LEADER",
    band: "6.0 → 6.5+",
    duration: "10 TUẦN",
    entry: "IELTS 6.0",
    target: "Chinh phục 6.5+",
    theme: {
      badgeClass: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800",
      borderClass: "border-rose-200/80 dark:border-rose-900/60",
      bgSoftClass: "bg-rose-50/40 dark:bg-rose-950/10",
      textClass: "text-rose-700 dark:text-rose-300",
      dotClass: "bg-rose-500",
      durationBadgeClass: "bg-gradient-to-br from-red-600 to-rose-700 text-white shadow-xs",
      accentHex: "#DC342D",
    },
  },
  {
    key: "master",
    name: "KHÓA MASTER",
    band: "5.0 → 6.0",
    duration: "09 TUẦN",
    entry: "IELTS 5.0",
    target: "Bứt phá 6.0",
    theme: {
      badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800",
      borderClass: "border-emerald-200/80 dark:border-emerald-900/60",
      bgSoftClass: "bg-emerald-50/40 dark:bg-emerald-950/10",
      textClass: "text-emerald-700 dark:text-emerald-300",
      dotClass: "bg-emerald-500",
      durationBadgeClass: "bg-gradient-to-br from-emerald-600 to-green-700 text-white shadow-xs",
      accentHex: "#289B6E",
    },
  },
  {
    key: "builder",
    name: "KHÓA BUILDER",
    band: "4.0 → 5.0",
    duration: "09 TUẦN",
    entry: "IELTS 4.0",
    target: "Nền tảng vững chắc",
    theme: {
      badgeClass: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-800",
      borderClass: "border-orange-200/80 dark:border-orange-900/60",
      bgSoftClass: "bg-orange-50/40 dark:bg-orange-950/10",
      textClass: "text-orange-700 dark:text-orange-300",
      dotClass: "bg-orange-500",
      durationBadgeClass: "bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-xs",
      accentHex: "#EE8722",
    },
  },
  {
    key: "dreamer",
    name: "KHÓA DREAMER",
    band: "3.0 → 4.0",
    duration: "09 TUẦN",
    entry: "IELTS 3.0",
    target: "Xây nền tảng toàn diện",
    theme: {
      badgeClass: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800",
      borderClass: "border-blue-200/80 dark:border-blue-900/60",
      bgSoftClass: "bg-blue-50/40 dark:bg-blue-950/10",
      textClass: "text-blue-700 dark:text-blue-300",
      dotClass: "bg-blue-500",
      durationBadgeClass: "bg-gradient-to-br from-blue-600 to-sky-700 text-white shadow-xs",
      accentHex: "#2582D7",
    },
  },
  {
    key: "starter",
    name: "KHÓA STARTER",
    band: "ĐẦU RA 3.0",
    duration: "09 TUẦN",
    entry: "Các bạn mất gốc tiếng Anh",
    target: "Đạt đầu ra 3.0",
    theme: {
      badgeClass: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200 dark:bg-fuchsia-950/40 dark:text-fuchsia-300 dark:border-fuchsia-800",
      borderClass: "border-fuchsia-200/80 dark:border-fuchsia-900/60",
      bgSoftClass: "bg-fuchsia-50/40 dark:bg-fuchsia-950/10",
      textClass: "text-fuchsia-700 dark:text-fuchsia-300",
      dotClass: "bg-fuchsia-500",
      durationBadgeClass: "bg-gradient-to-br from-fuchsia-600 to-pink-600 text-white shadow-xs",
      accentHex: "#D83A94",
    },
  },
];

type SortField = "name" | "createdAt";

// Tên các ngày trong tuần (0=CN, 1=T2 ... 6=T7)
const WEEKDAY_LABELS = [
  { value: 1, label: "Thứ 2" },
  { value: 2, label: "Thứ 3" },
  { value: 3, label: "Thứ 4" },
  { value: 4, label: "Thứ 5" },
  { value: 5, label: "Thứ 6" },
  { value: 6, label: "Thứ 7" },
  { value: 0, label: "CN" },
];

const emptyForm = {
  name: "",
  description: "",
  courseId: "",
  branchId: "",
  roomId: "",
  teacherId: "",
  startDate: "",
  endDate: "",
  isActive: true,
  weekdays: [] as number[],
  startTime: "18:00",
  endTime: "20:00",
  totalSessions: 27,
};

export default function AdminClasses() {
  const { user, isAdmin, isTeacher } = useAuth();
  const { selectedBranch, branches, primaryBranch } = useBranch();
  const [searchParams] = useSearchParams();
  const initialFilter = searchParams.get("filter") || "all";
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState(initialFilter);

  useEffect(() => {
    const urlFilter = searchParams.get("filter");
    if (urlFilter) {
      setStatusFilter(urlFilter);
    }
  }, [searchParams]);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const [levelSortOrder, setLevelSortOrder] = useState<"desc" | "asc">("desc");
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [deleteClass, setDeleteClass] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<any>(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const teacherIdParam = searchParams.get("teacherId");
  const courseIdParam = searchParams.get("courseId");

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [
      "admin-classes",
      selectedBranch,
      debouncedSearch,
      teacherIdParam,
      courseIdParam,
      statusFilter,
      sortField,
      sortOrder,
      page,
      pageSize,
    ],
    queryFn: () => {
      const isActiveParam =
        statusFilter === "inactive"
          ? false
          : statusFilter === "all" || statusFilter.startsWith("course_")
          ? undefined
          : true;
      return classesApi.list({
        search: debouncedSearch || undefined,
        isActive: isActiveParam,
        branchId: selectedBranch !== "ALL" ? selectedBranch : undefined,
        teacherId: teacherIdParam || undefined,
        courseId: courseIdParam || undefined,
        page,
        limit: pageSize,
      });
    },
  });

  const { data: coursesData } = useQuery({
    queryKey: ["courses-list"],
    queryFn: () => coursesApi.list({ limit: 100 }),
  });

  const { data: teachersData } = useQuery({
    queryKey: ["teachers-list"],
    queryFn: () => usersApi.list({ role: "teacher", limit: 100 }),
  });

  const courses = coursesData?.data || [];
  const teachers = teachersData?.data || [];

  const rawClasses = data?.data;
  const classes = useMemo(() => rawClasses || [], [rawClasses]);

  const total = data?.meta?.total || 0;

  const totalPages = data?.meta?.totalPages || 1;

  const activeClassesCount = useMemo(() => {
    return (rawClasses || []).filter((c: any) => c.isActive !== false).length;
  }, [rawClasses]);

  const totalStudentsCount = useMemo(() => {
    return (rawClasses || []).reduce((acc: number, c: any) => {
      const studentCount = c.studentsCount || c.student_count || c._count?.students || (c.students ? c.students.length : 0);
      return acc + (typeof studentCount === "number" ? studentCount : 0);
    }, 0);
  }, [rawClasses]);

  const filteredClasses = useMemo(() => {
    let result = [...(rawClasses || [])];

    // Client-side text search (covering className, teacher, branch, room, course title, brand name, band)
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase().trim();
      result = result.filter((c: any) => {
        const courseMatch = courses.find(
          (crs: any) => crs.id === (c.courseId || c.course_id || c.course?.id)
        );
        const courseTitle = (courseMatch?.title || c.course?.title || "").toLowerCase();
        const brand = getCourseBrand(courseMatch || c.course || c.name);
        const brandName = (brand.name || "").toLowerCase();
        const brandBand = (brand.band || "").toLowerCase();
        const className = (c.name || "").toLowerCase();
        const teacherName = (c.teacher?.fullName || "").toLowerCase();
        const branchName = (c.branch?.name || "").toLowerCase();
        const roomName = (c.room?.name || "").toLowerCase();

        return (
          className.includes(q) ||
          teacherName.includes(q) ||
          branchName.includes(q) ||
          roomName.includes(q) ||
          courseTitle.includes(q) ||
          brandName.includes(q) ||
          brandBand.includes(q)
        );
      });
    }

    // Filter by course dropdown selection
    if (statusFilter.startsWith("course_")) {
      const targetCourseKey = statusFilter.replace("course_", "");
      result = result.filter((c: any) => {
        const courseMatch = courses.find(
          (crs: any) => crs.id === (c.courseId || c.course_id || c.course?.id)
        );
        const brand = getCourseBrand(courseMatch || c.course || c.name);
        return brand.key === targetCourseKey;
      });
    } else if (statusFilter === "active") {
      result = result.filter((c: any) => c.isActive !== false);
    } else if (statusFilter === "inactive") {
      result = result.filter((c: any) => c.isActive === false);
    } else if (statusFilter === "low-fill") {
      result = result.filter((c: any) => {
        const studentCount =
          c.studentsCount || c.student_count || c._count?.students || (c.students ? c.students.length : 0);
        const capacity = c.room?.capacity || 15;
        return capacity > 0 && studentCount / capacity < 0.5;
      });
    } else if (statusFilter === "no_teacher") {
      result = result.filter((c: any) => !c.teacherId && !c.teacher?.id && !c.teacher?.fullName);
    }

    return result.sort((a: any, b: any) => {
      const mult = sortOrder === "asc" ? 1 : -1;
      if (sortField === "name") {
        return (a.name || "").localeCompare(b.name || "") * mult;
      }
      if (sortField === "createdAt") {
        return (
          (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) *
          mult
        );
      }
      return 0;
    });
  }, [rawClasses, sortField, sortOrder, statusFilter, debouncedSearch, courses]);

  const roadmapLevels = useMemo(() => {
    return levelSortOrder === "asc"
      ? [...IELTS_LEVEL_ROADMAP].reverse()
      : IELTS_LEVEL_ROADMAP;
  }, [levelSortOrder]);

  const getClassesForLevel = (levelKey: string) => {
    return filteredClasses.filter((c: any) => {
      const courseMatch = courses.find(
        (crs: any) => crs.id === (c.courseId || c.course_id || c.course?.id)
      );
      const brand = getCourseBrand(courseMatch || c.course || c.name);
      return brand.key === levelKey;
    });
  };

  const getDbCourseForLevel = (levelKey: string) => {
    return courses.find((crs: any) => {
      const brand = getCourseBrand(crs);
      return brand.key === levelKey;
    });
  };

  const otherClasses = useMemo(() => {
    const coreKeys = new Set<string>(IELTS_LEVEL_ROADMAP.map((l) => l.key));
    return filteredClasses.filter((c: any) => {
      const courseMatch = courses.find(
        (crs: any) => crs.id === (c.courseId || c.course_id || c.course?.id)
      );
      const brand = getCourseBrand(courseMatch || c.course || c.name);
      return !coreKeys.has(brand.key);
    });
  }, [filteredClasses, courses]);

  const createMutation = useMutation({
    mutationFn: async (body: typeof emptyForm) => {
      const created = await classesApi.create({
        name: body.name,
        description: body.description,
        courseId: body.courseId || null,
        branchId: body.branchId || null,
        roomId: body.roomId || null,
        teacherId: body.teacherId || null,
        startDate: body.startDate || null,
        endDate: body.endDate || null,
        isActive: body.isActive,
      });

      if (created?.id && body.startDate && body.weekdays.length > 0) {
        try {
          await sessionsApi.generateForClass(created.id, {
            startDate: body.startDate,
            weekdays: body.weekdays,
            totalSessions: body.totalSessions || 27,
            startTime: body.startTime || "18:00",
            endTime: body.endTime || "20:00",
          });
        } catch (sessErr) {
          console.warn("Could not generate sessions for new class:", sessErr);
        }
      }
      return created;
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["admin-classes"] });
      toast({ title: "Đã tạo lớp học thành công" });
      setDialogOpen(false);
      setForm(emptyForm);
    },
    onError: (err: any) => {
      toast({
        title: "Lỗi",
        description: err?.message || "Không thể tạo lớp học",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (body: typeof emptyForm & { id: string }) => {
      const updated = await classesApi.update(body.id, {
        name: body.name,
        description: body.description,
        courseId: body.courseId || null,
        branchId: body.branchId || null,
        roomId: body.roomId || null,
        teacherId: body.teacherId || null,
        startDate: body.startDate || null,
        endDate: body.endDate || null,
        isActive: body.isActive,
      });
      return updated;
    },
    onSuccess: async (_data, variables) => {
      await queryClient.refetchQueries({ queryKey: ["admin-classes"] });
      if (variables?.id) {
        queryClient.invalidateQueries({ queryKey: ["class", variables.id] });
        queryClient.invalidateQueries({ queryKey: ["class-sessions", variables.id] });
      }
      toast({ title: "Đã cập nhật lớp học" });
      setDialogOpen(false);
      setEditingClass(null);
      setForm(emptyForm);
    },
    onError: (err: any) => {
      toast({
        title: "Lỗi",
        description: err?.message || "Không thể cập nhật",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => classesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-classes"] });
      toast({ title: "Đã xóa", description: "Lớp học đã được xóa" });
      setDeleteClass(null);
    },
  });

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const SortHeader = ({
    field,
    children,
  }: {
    field: SortField;
    children: React.ReactNode;
  }) => (
    <TableHead
      className="cursor-pointer hover:bg-muted/50 transition-colors"
      onClick={() => toggleSort(field)}
    >
      <div className="flex items-center gap-1">
        {children}
        <ArrowUpDown
          className={`h-3 w-3 ${sortField === field ? "text-primary" : "text-muted-foreground"}`}
        />
      </div>
    </TableHead>
  );

  const openCreate = (defaultCourseId?: string) => {
    setEditingClass(null);
    const defaultBranchId = selectedBranch !== "ALL" ? selectedBranch : (primaryBranch?.id || branches[0]?.id || "");
    const matchedCourse = courses.find((c: any) => c.id === defaultCourseId);
    const inferredSessions = matchedCourse?.totalLessons || matchedCourse?.lessons?.length || 27;
    setForm({
      ...emptyForm,
      courseId: defaultCourseId || "",
      totalSessions: inferredSessions,
      branchId: defaultBranchId,
      teacherId: !isAdmin && isTeacher ? (user?.id || "") : "",
    });
    setDialogOpen(true);
  };

  const openEdit = async (cls: any) => {
    setEditingClass(cls);
    const initialForm: ClassForm = {
      name: cls.name || "",
      description: cls.description || "",
      courseId: cls.courseId || cls.course_id || cls.course?.id || "",
      branchId: cls.branchId || cls.branch_id || cls.branch?.id || "",
      roomId: cls.roomId || cls.room_id || cls.room?.id || "",
      teacherId: cls.teacherId || cls.teacher_id || cls.teacher?.id || "",
      startDate: cls.startDate
        ? new Date(cls.startDate).toISOString().split("T")[0]
        : "",
      endDate: cls.endDate
        ? new Date(cls.endDate).toISOString().split("T")[0]
        : "",
      isActive: cls.isActive ?? true,
      weekdays: Array.isArray(cls.weekdays) ? cls.weekdays : [],
      startTime: cls.startTime || "18:00",
      endTime: cls.endTime || "20:00",
      totalSessions: cls.totalSessions ?? 27,
    };
    setForm(initialForm);
    setDialogOpen(true);

    try {
      const [fullClass, sessions] = await Promise.all([
        classesApi.getById(cls.id).catch(() => null),
        sessionsApi.list(cls.id).catch(() => []),
      ]);

      const weekdaysSet = new Set<number>();
      let foundStartTime = initialForm.startTime;
      let foundEndTime = initialForm.endTime;

      if (Array.isArray(sessions) && sessions.length > 0) {
        sessions.forEach((s: any) => {
          const dateStr = s.plannedDate || s.sessionDate;
          if (dateStr) {
            const [y, m, d] = String(dateStr).split("T")[0].split("-").map(Number);
            if (y && m && d) {
              const dt = new Date(y, m - 1, d);
              weekdaysSet.add(dt.getDay());
            }
          }
          if (s.startTime && (!foundStartTime || foundStartTime === "18:00")) {
            foundStartTime = s.startTime.slice(0, 5);
          }
          if (s.endTime && (!foundEndTime || foundEndTime === "20:00")) {
            foundEndTime = s.endTime.slice(0, 5);
          }
        });
      }

      const inferredWeekdays = weekdaysSet.size > 0
        ? Array.from(weekdaysSet).sort((a, b) => (a === 0 ? 7 : a) - (b === 0 ? 7 : b))
        : initialForm.weekdays;

      const courseMatch = courses.find(
        (c: any) => c.id === (fullClass?.courseId || fullClass?.course_id || initialForm.courseId)
      );
      const totalSessionsCount = (Array.isArray(sessions) && sessions.length > 0)
        ? sessions.length
        : (courseMatch?.totalLessons || 27);

      setForm((prev) => ({
        ...prev,
        name: fullClass?.name ?? prev.name,
        description: fullClass?.description ?? prev.description,
        courseId: fullClass?.courseId || fullClass?.course_id || prev.courseId,
        branchId: fullClass?.branchId || fullClass?.branch_id || fullClass?.branch?.id || prev.branchId,
        roomId: fullClass?.roomId || fullClass?.room_id || fullClass?.room?.id || prev.roomId,
        teacherId: fullClass?.teacherId || fullClass?.teacher_id || fullClass?.teacher?.id || prev.teacherId,
        startDate: fullClass?.startDate
          ? new Date(fullClass.startDate).toISOString().split("T")[0]
          : prev.startDate,
        endDate: fullClass?.endDate
          ? new Date(fullClass.endDate).toISOString().split("T")[0]
          : prev.endDate,
        isActive: fullClass?.isActive ?? prev.isActive,
        weekdays: inferredWeekdays,
        startTime: foundStartTime,
        endTime: foundEndTime,
        totalSessions: totalSessionsCount,
      }));
    } catch (e) {
      console.warn("Failed to load full class info for edit:", e);
    }
  };

  const handleSave = () => {
    if (editingClass) {
      updateMutation.mutate({ id: editingClass.id, ...form });
    } else {
      createMutation.mutate(form);
    }
  };

  const renderClassRow = (cls: any) => {
    const totalSessions = cls.totalSessions || 27;
    const currentHw = cls.completedSessions || cls.homeworkCount || 0;
    const progressPercent =
      totalSessions > 0
        ? Math.min(100, Math.round((currentHw / totalSessions) * 100))
        : 0;
    const pendingCount = cls.pendingSubmissionsCount || 0;

    const courseMatch = courses.find(
      (c: any) => c.id === (cls.courseId || cls.course_id || cls.course?.id)
    );
    const brand = getCourseBrand(courseMatch || cls.course || cls.name);

    return (
      <TableRow
        key={cls.id}
        tabIndex={0}
        role="button"
        className="cursor-pointer hover:bg-muted/50 focus:bg-muted/60 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors group"
        onClick={() => navigate(`/admin/classes/${cls.id}`)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            navigate(`/admin/classes/${cls.id}`);
          }
        }}
      >
        <TableCell className="font-semibold text-slate-900 dark:text-slate-100">
          <div className="flex items-center gap-3">
            <div
              className={`h-9 w-9 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 border shadow-2xs ${brand.avatarClass}`}
              title={`${brand.name} (${brand.band})`}
            >
              {brand.code}
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="group-hover:text-primary transition-colors font-semibold truncate">
                  {cls.name}
                </span>
                {cls.isActive === false && (
                  <Badge
                    variant="outline"
                    className="text-[10px] text-muted-foreground py-0 px-1.5 h-4"
                  >
                    Tạm dừng
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-1.5 mt-0.5 text-xs">
                <span className={`font-semibold text-[11px] ${brand.textClass}`}>
                  {brand.name}
                </span>
                {brand.band && (
                  <span className="text-[10px] text-muted-foreground font-mono">
                    • {brand.band}
                  </span>
                )}
              </div>
            </div>
          </div>
        </TableCell>
        <TableCell>
          {cls.branch ? (
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                <MapPin className="h-3 w-3 text-emerald-600" />
                {cls.branch.name}
              </span>
              {cls.room && (
                <span className="text-[11px] text-muted-foreground">
                  {cls.room.name}
                </span>
              )}
            </div>
          ) : (
            <span className="text-xs text-muted-foreground italic">Chưa gán</span>
          )}
        </TableCell>
        <TableCell>
          {cls.teacher?.fullName ? (
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={cls.teacher.avatarUrl} />
                <AvatarFallback className="text-xs bg-emerald-100 text-emerald-800">
                  {cls.teacher.fullName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{cls.teacher.fullName}</span>
            </div>
          ) : (
            <Badge variant="secondary" className="text-xs text-amber-700 bg-amber-50">
              Chưa phân công
            </Badge>
          )}
        </TableCell>
        <TableCell>
          <Badge variant="outline" className="gap-1.5 font-normal">
            <Users className="h-3 w-3 text-muted-foreground" />
            {cls._count?.students || 0} HV
          </Badge>
        </TableCell>
        <TableCell>
          <Badge
            variant="secondary"
            className="font-medium text-emerald-700 bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-300"
          >
            HW {currentHw} / {totalSessions}
          </Badge>
        </TableCell>
        <TableCell className="w-36">
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{progressPercent}%</span>
            </div>
            <Progress value={progressPercent} className="h-1.5" />
          </div>
        </TableCell>
        <TableCell>
          {pendingCount > 0 ? (
            <Badge className="bg-amber-500 hover:bg-amber-600 text-white gap-1 font-normal">
              <Clock className="h-3 w-3" />
              🔴 {pendingCount} cần chấm
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="text-emerald-600 border-emerald-200 bg-emerald-50/50 gap-1 font-normal"
            >
              ✓ Đã hoàn thành
            </Badge>
          )}
        </TableCell>
        <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-end gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2.5 text-xs text-slate-700 hover:text-emerald-600 hover:bg-emerald-50"
              onClick={() => navigate(`/admin/classes/${cls.id}`)}
            >
              Workspace
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Button>
            {isAdmin && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate(`/admin/classes/${cls.id}`)}>
                    <BookOpen className="mr-2 h-4 w-4 text-emerald-600" />
                    Mở Workspace
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => openEdit(cls)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Sửa thông tin
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => setDeleteClass({ id: cls.id, name: cls.name })}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Xóa lớp
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20">
            <School className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Quản lý lớp học</h1>
            <p className="text-sm text-muted-foreground">
              Vận hành và theo dõi tiến độ các lớp học theo từng cấp độ chuẩn trong lộ trình
            </p>
          </div>
        </div>
        {isAdmin && (
          <Button onClick={() => openCreate()}>
            <Plus className="mr-2 h-4 w-4" />
            Thêm lớp học
          </Button>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-emerald-500 bg-card">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground">Lớp hoạt động</p>
              <h3 className="text-2xl font-bold mt-1 text-emerald-600">{activeClassesCount} lớp</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Trên tổng số {total} lớp</p>
            </div>
            <div className="p-2.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 bg-card">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground">Tổng học viên</p>
              <h3 className="text-2xl font-bold mt-1 text-blue-600">{totalStudentsCount} HV</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Đang tham gia học</p>
            </div>
            <div className="p-2.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              <Users className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500 bg-card">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground">Bài cần chấm</p>
              <h3 className="text-2xl font-bold mt-1 text-amber-600">
                {classes.reduce((sum: number, c: any) => sum + (c.pendingSubmissionsCount || 0), 0)} bài
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">Đang chờ phản hồi</p>
            </div>
            <div className="p-2.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
              <Clock className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-rose-500 bg-card">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground">Homework quá hạn</p>
              <h3 className="text-2xl font-bold mt-1 text-rose-600">
                {classes.reduce((sum: number, c: any) => sum + (c.overdueCount || 0), 0)} bài
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">Cần nhắc nhở HV</p>
            </div>
            <div className="p-2.5 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
              <AlertCircle className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm theo tên lớp, giáo viên, khóa học..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          {/* Nút đảo chiều thứ tự lộ trình Level */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLevelSortOrder(levelSortOrder === "desc" ? "asc" : "desc")}
            className="h-10 text-xs gap-1.5 border-dashed text-muted-foreground hover:text-foreground hidden sm:flex"
            title="Đổi thứ tự Level"
          >
            <ArrowDownUp className="h-3.5 w-3.5" />
            <span>Lộ trình: {levelSortOrder === "desc" ? "6.5+ → 3.0" : "3.0 → 6.5+"}</span>
          </Button>

          {/* Dropdown tìm / lọc nâng cao theo khóa và trạng thái (ảnh 3) */}
          <Filter className="h-4 w-4 text-muted-foreground hidden sm:inline-block" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[250px] font-medium">
              <SelectValue placeholder="Lọc danh sách" />
            </SelectTrigger>
            <SelectContent className="max-h-[380px]">
              <SelectItem value="all">
                <span className="font-semibold">Tất cả lớp</span>
              </SelectItem>

              <SelectSeparator />
              <div className="px-2 py-1.5 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                Tìm theo khóa học
              </div>
              <SelectItem value="course_leader">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
                  <span className="font-medium text-rose-700 dark:text-rose-300">Khóa LEADER (6.0 → 6.5+)</span>
                </div>
              </SelectItem>
              <SelectItem value="course_master">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                  <span className="font-medium text-emerald-700 dark:text-emerald-300">Khóa MASTER (5.0 → 6.0)</span>
                </div>
              </SelectItem>
              <SelectItem value="course_builder">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                  <span className="font-medium text-amber-700 dark:text-amber-300">Khóa BUILDER (4.0 → 5.0)</span>
                </div>
              </SelectItem>
              <SelectItem value="course_dreamer">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
                  <span className="font-medium text-blue-700 dark:text-blue-300">Khóa DREAMER (3.0 → 4.0)</span>
                </div>
              </SelectItem>
              <SelectItem value="course_starter">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-500 shrink-0" />
                  <span className="font-medium text-fuchsia-700 dark:text-fuchsia-300">Khóa STARTER (Đầu ra 3.0)</span>
                </div>
              </SelectItem>

              <SelectSeparator />
              <div className="px-2 py-1.5 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                Tìm theo trạng thái
              </div>
              <SelectItem value="active">🟢 Đang hoạt động</SelectItem>
              <SelectItem value="low-fill">🔴 Sĩ số thấp (&lt; 50%)</SelectItem>
              <SelectItem value="inactive">⚪ Đã kết thúc</SelectItem>
              <SelectItem value="no_teacher">⚠️ Chưa có giáo viên</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {(teacherIdParam || courseIdParam || statusFilter !== "all" || debouncedSearch) && (
        <div className="flex flex-wrap items-center gap-2 p-2.5 rounded-lg bg-primary/5 border border-primary/20 text-xs text-primary font-medium">
          <span>Đang lọc:</span>
          {statusFilter.startsWith("course_") && (
            <Badge variant="secondary" className="gap-1 bg-primary/10 text-primary">
              Khóa: {IELTS_LEVEL_ROADMAP.find((l) => l.key === statusFilter.replace("course_", ""))?.name || statusFilter}
            </Badge>
          )}
          {statusFilter === "active" && (
            <Badge variant="secondary" className="gap-1 bg-primary/10 text-primary">
              🟢 Đang hoạt động
            </Badge>
          )}
          {statusFilter === "low-fill" && (
            <Badge variant="secondary" className="gap-1 bg-primary/10 text-primary">
              🔴 Sĩ số thấp (&lt; 50%)
            </Badge>
          )}
          {statusFilter === "inactive" && (
            <Badge variant="secondary" className="gap-1 bg-primary/10 text-primary">
              ⚪ Đã kết thúc
            </Badge>
          )}
          {statusFilter === "no_teacher" && (
            <Badge variant="secondary" className="gap-1 bg-primary/10 text-primary">
              ⚠️ Chưa có giáo viên
            </Badge>
          )}
          {debouncedSearch && (
            <Badge variant="secondary" className="gap-1 bg-primary/10 text-primary">
              Từ khóa: "{debouncedSearch}"
            </Badge>
          )}
          {teacherIdParam && (
            <Badge variant="secondary" className="gap-1 bg-primary/10 text-primary">
              Giáo viên: {teachers.find((t: any) => t.id === teacherIdParam || t.user_id === teacherIdParam)?.fullName || teacherIdParam}
            </Badge>
          )}
          {courseIdParam && (
            <Badge variant="secondary" className="gap-1 bg-primary/10 text-primary">
              Khóa học: {courses.find((c: any) => c.id === courseIdParam)?.title || courseIdParam}
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setStatusFilter("all");
              setSearch("");
              navigate("/admin/classes");
            }}
            className="h-6 text-xs px-2 ml-auto text-muted-foreground hover:text-foreground gap-1"
          >
            <X className="h-3 w-3" />
            Xóa bộ lọc
          </Button>
        </div>
      )}

      {isLoading ? (
        <div className="border rounded-xl bg-card p-12 text-center text-muted-foreground shadow-xs">
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin text-emerald-600" />
            Đang tải danh sách lớp học...
          </div>
        </div>
      ) : isError ? (
        <div className="border rounded-xl bg-card p-12 text-center text-destructive shadow-xs">
          <div className="flex flex-col items-center justify-center gap-2">
            <AlertCircle className="h-5 w-5" />
            <span>Không thể tải danh sách lớp học</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              className="mt-2 text-foreground"
            >
              Thử lại
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {roadmapLevels
            .filter((level) => {
              if (statusFilter.startsWith("course_")) {
                return statusFilter === `course_${level.key}`;
              }
              return true;
            })
            .map((level) => {
              const levelClasses = getClassesForLevel(level.key);
              const matchedDbCourse = getDbCourseForLevel(level.key);

              return (
                <div
                  key={level.key}
                  className={`rounded-2xl border shadow-sm overflow-hidden transition-all bg-card ${level.theme.borderClass}`}
                >
                  {/* Level Header Banner - Styled after Image 2 */}
                  <div
                    className={`p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b ${level.theme.bgSoftClass}`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                      {/* Huy hiệu số tuần như ảnh 2 */}
                      <div
                        className={`flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl shrink-0 ${level.theme.durationBadgeClass}`}
                      >
                        <span className="text-base sm:text-lg font-black tracking-tight leading-none">
                          {level.duration.split(" ")[0]}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5 opacity-90">
                          {level.duration.split(" ")[1]}
                        </span>
                      </div>

                      {/* Tiêu đề cấp độ, Badge Band & Bullets */}
                      <div className="space-y-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <div className="flex items-center gap-1.5">
                            <Crown className={`h-4 w-4 sm:h-5 sm:w-5 ${level.theme.textClass}`} />
                            <h2 className={`text-base sm:text-lg font-black tracking-tight ${level.theme.textClass}`}>
                              {level.name}
                            </h2>
                          </div>

                          <Badge
                            variant="outline"
                            className={`font-bold text-xs px-2.5 py-0.5 rounded-full ${level.theme.badgeClass}`}
                          >
                            {level.band}
                          </Badge>

                          <Badge
                            variant="secondary"
                            className="text-xs font-semibold"
                          >
                            {levelClasses.length > 0
                              ? `${levelClasses.length} lớp học`
                              : "0 lớp"}
                          </Badge>
                        </div>

                        {/* Thông tin đầu vào & mục tiêu chuẩn theo ảnh 2 */}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <span className={`w-1.5 h-1.5 rounded-full ${level.theme.dotClass}`} />
                            <span><strong>Đầu vào:</strong> {level.entry}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <span className={`w-1.5 h-1.5 rounded-full ${level.theme.dotClass}`} />
                            <span><strong>Mục tiêu:</strong> {level.target}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Nút hành động nhanh trong Header */}
                    <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                      {isAdmin && (
                        <Button
                          size="sm"
                          variant="outline"
                          className={`h-8 text-xs font-semibold gap-1.5 bg-background hover:bg-background/80 ${level.theme.textClass} ${level.theme.borderClass}`}
                          onClick={() => openCreate(matchedDbCourse?.id)}
                        >
                          <Plus className="h-3.5 w-3.5" />
                          Thêm lớp {level.key.toUpperCase()}
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Bảng danh sách lớp của Level hoặc Trạng thái trống (ảnh 2) */}
                  {levelClasses.length > 0 ? (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader className="bg-muted/30">
                          <TableRow>
                            <SortHeader field="name">Lớp học</SortHeader>
                            <TableHead>Cơ sở / Phòng</TableHead>
                            <TableHead>Giáo viên</TableHead>
                            <TableHead>Học viên</TableHead>
                            <TableHead>Homework</TableHead>
                            <TableHead>Tiến độ</TableHead>
                            <TableHead>Cần chấm</TableHead>
                            <TableHead className="w-[140px] text-right">Thao tác</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {levelClasses.map((cls: any) => renderClassRow(cls))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    /* Level chưa có lớp: Để trống trang nhã kèm nút mở lớp */
                    <div className="py-9 px-4 text-center bg-card flex flex-col items-center justify-center gap-2 border-t border-dashed">
                      <div className={`p-3 rounded-full bg-muted/60 ${level.theme.textClass}`}>
                        <School className="h-6 w-6 opacity-60" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {debouncedSearch
                          ? `Không tìm thấy lớp học nào khớp với "${debouncedSearch}" trong cấp độ này`
                          : statusFilter !== "all" && !statusFilter.startsWith("course_")
                          ? `Chưa có lớp học nào thỏa mãn bộ lọc trong cấp độ này`
                          : (
                            <>
                              Chưa có lớp học nào thuộc <strong>{level.name}</strong> ({level.band})
                            </>
                          )}
                      </p>
                      {isAdmin && !debouncedSearch && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className={`text-xs gap-1.5 mt-1 font-semibold ${level.theme.textClass} hover:${level.theme.bgSoftClass}`}
                          onClick={() => openCreate(matchedDbCourse?.id)}
                        >
                          <Plus className="h-3.5 w-3.5" />
                          Mở lớp học đầu tiên cho {level.name}
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

          {/* Khối các lớp học khác / ngoài 5 level chính (nếu có) */}
          {(!statusFilter.startsWith("course_") || statusFilter === "course_other") && otherClasses.length > 0 && (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden bg-card">
              <div className="p-4 sm:p-5 flex items-center justify-between border-b bg-slate-50/60 dark:bg-slate-900/20">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300 font-bold">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-800 dark:text-slate-200">
                      Khóa học & Chuyên đề khác
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Các lớp thuộc khóa bổ trợ, thi thử hoặc kiểm tra đầu vào
                    </p>
                  </div>
                </div>
                <Badge variant="secondary">{otherClasses.length} lớp học</Badge>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-muted/30">
                    <TableRow>
                      <SortHeader field="name">Lớp học</SortHeader>
                      <TableHead>Cơ sở / Phòng</TableHead>
                      <TableHead>Giáo viên</TableHead>
                      <TableHead>Học viên</TableHead>
                      <TableHead>Homework</TableHead>
                      <TableHead>Tiến độ</TableHead>
                      <TableHead>Cần chấm</TableHead>
                      <TableHead className="w-[140px] text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {otherClasses.map((cls: any) => renderClassRow(cls))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </div>
      )}

      <CreateEditClassDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editingClass={editingClass}
        form={form}
        setForm={setForm}
        courses={courses}
        teachers={teachers}
        branches={branches}
        onSave={handleSave}
        isSaving={createMutation.isPending || updateMutation.isPending}
      />

      <DeleteConfirmDialog
        open={!!deleteClass}
        onOpenChange={(open) => !open && setDeleteClass(null)}
        onConfirm={() => deleteClass && deleteMutation.mutate(deleteClass.id)}
        loading={deleteMutation.isPending}
        title="Xóa lớp học?"
        description={`Bạn có chắc chắn muốn xóa lớp "${deleteClass?.name}"? Tất cả học viên sẽ bị gỡ khỏi lớp.`}
      />
    </div>
  );
}

// =============================================
// CreateEditClassDialog – Form Tạo / Chỉnh sửa Lớp học
// Bao gồm: Lịch học hàng tuần + Preview buổi học
// =============================================
interface ClassForm {
  name: string;
  description: string;
  courseId: string;
  branchId: string;
  roomId: string;
  teacherId: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  weekdays: number[];
  startTime: string;
  endTime: string;
  totalSessions: number;
}

function CreateEditClassDialog({
  open,
  onOpenChange,
  editingClass,
  form,
  setForm,
  courses,
  teachers,
  branches,
  onSave,
  isSaving,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  editingClass: any;
  form: ClassForm;
  setForm: (f: ClassForm) => void;
  courses: any[];
  teachers: any[];
  branches: any[];
  onSave: () => void;
  isSaving: boolean;
}) {
  const { data: roomsData } = useQuery({
    queryKey: ["branch-rooms", form.branchId],
    queryFn: () => roomsApi.list(form.branchId),
    enabled: !!form.branchId && form.branchId !== "__none__",
  });
  const rooms = roomsData || [];

  // Preview lịch học – tính realtime khi chọn ngày bắt đầu + thứ
  const previewDates = useMemo(() => {
    if (!form.startDate || form.weekdays.length === 0) return [];
    return generateSessionDates(form.startDate, form.weekdays, form.totalSessions);
  }, [form.startDate, form.weekdays, form.totalSessions]);

  const toggleWeekday = (day: number) => {
    const has = form.weekdays.includes(day);
    setForm({
      ...form,
      weekdays: has
        ? form.weekdays.filter((d) => d !== day)
        : [...form.weekdays, day].sort((a, b) => (a === 0 ? 7 : a) - (b === 0 ? 7 : b)),
    });
  };

  const formatDate = (iso: string) => {
    const [y, m, d] = iso.split("-");
    return `${d}/${m}/${y}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingClass ? "Chỉnh sửa lớp học" : "Tạo lớp học mới"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          {/* Tên lớp */}
          <div className="space-y-2">
            <Label>Tên lớp *</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="VD: IELTS Foundation 01"
            />
          </div>

          {/* Cơ sở & Phòng học */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5 font-semibold text-slate-700">
                <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                Cơ sở / Chi nhánh *
              </Label>
              {branches.length === 0 ? (
                <div className="rounded-lg border border-dashed p-2 text-xs text-muted-foreground bg-slate-50">
                  Chưa có cơ sở nào.{" "}
                  <Link to="/admin/settings" className="text-primary underline font-medium hover:text-primary/80">
                    Thêm cơ sở tại Cài đặt
                  </Link>
                </div>
              ) : (
                <Select
                  value={form.branchId || "__none__"}
                  onValueChange={(v) => {
                    const val = v === "__none__" ? "" : v;
                    setForm({ ...form, branchId: val, roomId: "" });
                  }}
                >
                  <SelectTrigger className="bg-slate-50 border-slate-200">
                    <SelectValue placeholder="Chọn cơ sở..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__none__">
                      <span className="text-muted-foreground">— Chọn cơ sở —</span>
                    </SelectItem>
                    {branches.map((b: any) => (
                      <SelectItem key={b.id} value={b.id}>
                        <span className="font-medium text-slate-800">
                          {b.name} {b.isPrimary && "★ (Cơ sở chính)"}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-1.5 font-semibold text-slate-700">
                <School className="h-3.5 w-3.5 text-blue-600" />
                Phòng học
              </Label>
              <Select
                value={form.roomId || "__none__"}
                onValueChange={(v) => setForm({ ...form, roomId: v === "__none__" ? "" : v })}
                disabled={!form.branchId || form.branchId === "__none__"}
              >
                <SelectTrigger className="bg-slate-50 border-slate-200">
                  <SelectValue placeholder={!form.branchId || form.branchId === "__none__" ? "Chọn cơ sở trước" : "Chọn phòng học..."} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__none__">
                    <span className="text-muted-foreground">— Không gán phòng —</span>
                  </SelectItem>
                  {rooms.map((r: any) => (
                    <SelectItem key={r.id} value={r.id}>
                      <span>{r.name} {r.capacity ? `(${r.capacity} chỗ)` : ""}</span>
                    </SelectItem>
                  ))}
                  {form.branchId && form.branchId !== "__none__" && rooms.length === 0 && (
                    <div className="p-2 text-xs text-muted-foreground text-center">
                      Cơ sở này chưa có phòng học.{" "}
                      <Link to="/admin/settings" className="text-primary underline font-medium">
                        Thêm phòng
                      </Link>
                    </div>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>


          {/* Khóa học */}
          <div className="space-y-2">
            <Label className="flex items-center gap-1.5 font-bold text-slate-700">
              <BookOpen className="h-3.5 w-3.5 text-blue-600" />
              Khóa học / Chương trình đào tạo
            </Label>
            <Select
              value={form.courseId}
              onValueChange={(v) => {
                const selectedCourseId = v === "__none__" ? "" : v;
                const matchedCourse = courses.find((c: any) => c.id === selectedCourseId);
                const inferredSessions = matchedCourse?.totalLessons || matchedCourse?.lessons?.length || 27;
                setForm({
                  ...form,
                  courseId: selectedCourseId,
                  totalSessions: inferredSessions,
                });
              }}
            >
              <SelectTrigger className="bg-slate-50 border-slate-200 font-medium">
                <SelectValue placeholder="Chọn khóa học..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__none__">
                  <span className="text-muted-foreground">— Chọn khóa học —</span>
                </SelectItem>
                {courses.map((c: any) => (
                  <SelectItem key={c.id} value={c.id}>
                    <span className="font-semibold text-slate-800">
                      {c.title} {c.totalLessons ? `(${c.totalLessons} buổi)` : ""}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Giáo viên */}
          <div className="space-y-2">
            <Label className="flex items-center gap-1.5">
              <GraduationCap className="h-3.5 w-3.5" />
              Giáo viên phụ trách
            </Label>
            <Select
              value={form.teacherId}
              onValueChange={(v) => setForm({ ...form, teacherId: v === "__none__" ? "" : v })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn giáo viên" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__none__">
                  <span className="text-muted-foreground">— Không chọn —</span>
                </SelectItem>
                {teachers.map((t: any) => (
                  <SelectItem key={t.id} value={t.id}>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={t.avatarUrl || undefined} />
                        <AvatarFallback className="bg-amber-500/10 text-amber-600 text-xs">
                          <GraduationCap className="h-3 w-3" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{t.fullName || "Chưa đặt tên"}</span>
                        <span className="text-xs text-muted-foreground">{t.email}</span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Ngày bắt đầu */}
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              Ngày bắt đầu
            </Label>
            <Input
              type="date"
              value={form.startDate}
              onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            />
          </div>

          {/* LỊCH HỌC HÀNG TUẦN */}
          <div className="space-y-3 rounded-xl border border-emerald-200 bg-emerald-50/40 p-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-bold text-emerald-800 flex items-center gap-1.5">
                📅 LỊCH HỌC HÀNG TUẦN
              </Label>
              {form.weekdays.length > 0 && (
                <span className="text-xs text-emerald-700 font-medium">
                  {form.weekdays.length} ngày/tuần
                </span>
              )}
            </div>

            {/* 7 nút toggle ngày */}
            <div className="flex gap-2 flex-wrap">
              {WEEKDAY_LABELS.map(({ value, label }) => {
                const active = form.weekdays.includes(value);
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => toggleWeekday(value)}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold border-2 transition-all ${
                      active
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                        : "bg-white text-slate-600 border-slate-200 hover:border-emerald-400"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Giờ học */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              <div className="space-y-1.5">
                <Label className="text-xs text-slate-600">Giờ bắt đầu</Label>
                <Input
                  type="time"
                  value={form.startTime}
                  onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                  className="text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-slate-600">Giờ kết thúc</Label>
                <Input
                  type="time"
                  value={form.endTime}
                  onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                  className="text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-slate-600 flex items-center justify-between">
                  <span>Tổng số buổi</span>
                  <span className="text-[10px] text-muted-foreground font-normal">(Theo giáo trình)</span>
                </Label>
                <Input
                  type="number"
                  readOnly
                  disabled
                  value={form.totalSessions}
                  className="text-sm bg-slate-100 dark:bg-slate-800 font-semibold cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* PREVIEW lịch học */}
          {previewDates.length > 0 && (
            <div className="rounded-xl border bg-muted/30 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-700">
                  📋 Preview lịch học ({previewDates.length} buổi)
                </span>
                <span className="text-xs text-muted-foreground">
                  Kết thúc: {formatDate(previewDates[previewDates.length - 1])}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-44 overflow-y-auto">
                {previewDates.map((date, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 rounded-md bg-white border px-2 py-1 text-xs"
                  >
                    <span className="text-emerald-600 font-semibold min-w-[44px]">
                      Buổi {i + 1}
                    </span>
                    <span className="text-slate-600">{formatDate(date)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trạng thái kích hoạt */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label>Kích hoạt</Label>
              <div className="text-sm text-muted-foreground">Cho phép truy cập lớp học</div>
            </div>
            <Switch
              checked={form.isActive}
              onCheckedChange={(checked) => setForm({ ...form, isActive: checked })}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button onClick={onSave} disabled={!form.name || isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {editingClass ? "Lưu thay đổi" : "Tạo lớp"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
