import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import {
  classesApi,
  coursesApi,
  OperationsKpiSummary,
} from "@/lib/api";
import { useBranch } from "@/contexts/BranchContext";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Building2,
  Users,
  CheckCircle2,
  AlertTriangle,
  Search,
  Filter,
  ArrowRight,
  Calendar,
  Clock,
  Sparkles,
  ExternalLink,
  RotateCcw,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock3,
} from "lucide-react";

export default function ClassOperationsPage() {
  const navigate = useNavigate();
  const { selectedBranch, branches } = useBranch();

  // Search & Filter State
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);

  // Debounce search effect (350ms)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1); // Reset to page 1 on new search term
    }, 350);
    return () => clearTimeout(handler);
  }, [search]);

  // Reset page when branch or filters change
  useEffect(() => {
    setPage(1);
  }, [selectedBranch, courseFilter, statusFilter]);

  // 1. Overview KPI Query (Aggregated from Backend directly, Zero client-side computation)
  const {
    data: kpiResponse,
    isLoading: isKpiLoading,
    refetch: refetchKpi,
  } = useQuery({
    queryKey: ["class-operations-kpi", selectedBranch],
    queryFn: () => classesApi.getOperationsKpiSummary(selectedBranch),
    staleTime: 30000,
  });

  const kpiData: OperationsKpiSummary = useMemo(() => {
    return (
      kpiResponse?.data || {
        totalClasses: 0,
        activeClasses: 0,
        upcomingClasses: 0,
        completedClasses: 0,
        totalEnrollments: 0,
        totalRoomCapacity: 0,
        occupancyRate: 0,
        averageAttendanceRate: 0,
        alertClassesCount: 0,
      }
    );
  }, [kpiResponse]);

  // 2. Courses query for filter dropdown
  const { data: coursesData } = useQuery({
    queryKey: ["courses-list-filter"],
    queryFn: () => coursesApi.list({ limit: 100 }),
    staleTime: 60000,
  });
  const coursesList = useMemo(() => coursesData?.data || [], [coursesData]);

  // 3. Server-side Paginated Classes List
  const {
    data: listResponse,
    isLoading: isListLoading,
    isFetching: isListFetching,
    refetch: refetchList,
  } = useQuery({
    queryKey: [
      "class-operations-list",
      selectedBranch,
      debouncedSearch,
      courseFilter,
      statusFilter,
      page,
      limit,
    ],
    queryFn: () => {
      let isActiveParam: boolean | undefined = undefined;
      if (statusFilter === "active") isActiveParam = true;
      if (statusFilter === "closed") isActiveParam = false;

      return classesApi.list({
        search: debouncedSearch || undefined,
        courseId: courseFilter !== "all" ? courseFilter : undefined,
        isActive: isActiveParam,
        branchId: selectedBranch !== "ALL" ? selectedBranch : undefined,
        scope: "all",
        page,
        limit,
      });
    },
    staleTime: 15000,
  });

  const classes = useMemo(() => listResponse?.data || [], [listResponse?.data]);
  const meta = listResponse?.meta || { total: 0, totalPages: 1 };

  // Current active branch name display
  const currentBranchName = useMemo(() => {
    if (selectedBranch === "ALL") return "Toàn bộ hệ thống";
    const found = branches.find((b) => b.id === selectedBranch);
    return found ? found.name : "Cơ sở đã chọn";
  }, [selectedBranch, branches]);

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8 max-w-[1700px] mx-auto min-h-screen">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100 dark:bg-indigo-950/40 dark:border-indigo-900/60">
              <Building2 className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                Thông tin lớp học
                <Badge variant="outline" className="text-xs font-semibold px-2 py-0.5 text-indigo-700 bg-indigo-50 border-indigo-200">
                  Operations Master
                </Badge>
              </h1>
              <p className="text-xs md:text-sm text-slate-500 mt-0.5">
                Bảng điều khiển quản trị trung tâm dành riêng cho Admin & Quản lý vận hành • Phạm vi:{" "}
                <span className="font-semibold text-slate-700 dark:text-slate-300">{currentBranchName}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              refetchKpi();
              refetchList();
            }}
            className="text-xs gap-1.5 h-9"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isListFetching ? "animate-spin" : ""}`} />
            Làm mới số liệu
          </Button>
          <Button
            size="sm"
            onClick={() => navigate("/admin/classes")}
            className="text-xs gap-1.5 h-9 bg-slate-900 text-white hover:bg-slate-800"
          >
            <GraduationCap className="w-4 h-4" />
            Sang màn hình Lớp học (Tác nghiệp)
          </Button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PHẦN 1: THẺ CHỈ SỐ TỔNG QUAN (OVERVIEW KPI CARDS - ZERO CLIENT COMPUTE)  */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Tổng số lớp */}
        <Card className="border border-slate-200/80 shadow-xs relative overflow-hidden bg-gradient-to-br from-white to-slate-50/60 dark:from-slate-900 dark:to-slate-900/60">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Tổng số lớp học
              </span>
              <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/50">
                <Building2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {isKpiLoading ? "..." : kpiData.totalClasses}
              </span>
              <span className="text-xs text-slate-500">lớp tổng thể</span>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-[11px] font-medium text-slate-600 dark:text-slate-400 border-t pt-2.5">
              <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {kpiData.activeClasses} Đang học
              </span>
              <span>•</span>
              <span className="text-blue-600 font-semibold">{kpiData.upcomingClasses} Sắp mở</span>
              <span>•</span>
              <span className="text-slate-500">{kpiData.completedClasses} Đã đóng</span>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Sĩ số / Sức chứa & Tỷ lệ lấp đầy */}
        <Card className="border border-slate-200/80 shadow-xs relative overflow-hidden bg-gradient-to-br from-white to-slate-50/60 dark:from-slate-900 dark:to-slate-900/60">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Sĩ số / Sức chứa phòng
              </span>
              <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {isKpiLoading ? "..." : kpiData.totalEnrollments}
              </span>
              <span className="text-xs text-slate-500">
                / {kpiData.totalRoomCapacity} chỗ
              </span>
              <Badge
                variant="outline"
                className={`ml-auto text-xs font-bold ${
                  kpiData.occupancyRate >= 75
                    ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                    : kpiData.occupancyRate >= 50
                    ? "bg-amber-50 text-amber-700 border-amber-300"
                    : "bg-rose-50 text-rose-700 border-rose-300"
                }`}
              >
                {isKpiLoading ? "..." : `${kpiData.occupancyRate}% Lấp đầy`}
              </Badge>
            </div>
            <div className="mt-3">
              <Progress
                value={Math.min(100, kpiData.occupancyRate)}
                className="h-1.5 bg-slate-100"
              />
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Tỷ lệ chuyên cần trung bình */}
        <Card className="border border-slate-200/80 shadow-xs relative overflow-hidden bg-gradient-to-br from-white to-slate-50/60 dark:from-slate-900 dark:to-slate-900/60">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-cyan-500" />
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Chuyên cần trung bình
              </span>
              <div className="p-1.5 rounded-lg bg-teal-50 text-teal-600 dark:bg-teal-950/50">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {isKpiLoading ? "..." : `${kpiData.averageAttendanceRate}%`}
              </span>
              <span className="text-xs text-slate-500">toàn bộ cơ sở</span>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-500 border-t pt-2.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Được tính tự động từ bảng điểm danh thực tế</span>
            </div>
          </CardContent>
        </Card>

        {/* Card 4: Lớp cần chú ý (Financial / Operational Alerts) */}
        <Card className="border border-slate-200/80 shadow-xs relative overflow-hidden bg-gradient-to-br from-white to-slate-50/60 dark:from-slate-900 dark:to-slate-900/60">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-rose-500" />
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Lớp cần chú ý (Alerts)
              </span>
              <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600 dark:bg-rose-950/50">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span
                className={`text-3xl font-black tracking-tight ${
                  kpiData.alertClassesCount > 0 ? "text-rose-600" : "text-emerald-600"
                }`}
              >
                {isKpiLoading ? "..." : kpiData.alertClassesCount}
              </span>
              <span className="text-xs text-slate-500">lớp cảnh báo</span>
            </div>
            <div className="mt-3 flex items-center gap-1 text-[11px] font-medium text-slate-500 border-t pt-2.5">
              {kpiData.alertClassesCount > 0 ? (
                <span className="text-rose-600 font-medium">
                  Sĩ số quá ít &lt; 6 HV hoặc dưới điểm hòa vốn
                </span>
              ) : (
                <span className="text-emerald-600 font-medium">
                  Tất cả các lớp đều đạt chuẩn sĩ số vận hành
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ========================================================================= */}
      {/* PHẦN 2: BỘ LỌC THÔNG MINH (SMART FILTERS BAR)                             */}
      {/* ========================================================================= */}
      <Card className="border border-slate-200/80 shadow-xs">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            {/* Search Input Debounced */}
            <div className="relative flex-1 min-w-[260px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Tìm nhanh theo Mã lớp, Tên lớp, Giáo viên..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9 text-xs sm:text-sm bg-slate-50/50 border-slate-200 focus:bg-white transition-colors"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 p-0.5"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Filter: Khóa học */}
              <div className="w-[180px]">
                <Select value={courseFilter} onValueChange={setCourseFilter}>
                  <SelectTrigger className="h-9 text-xs">
                    <SelectValue placeholder="Chương trình học" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="text-xs">
                      Tất cả khóa học
                    </SelectItem>
                    {coursesList.map((course: any) => (
                      <SelectItem key={course.id} value={course.id} className="text-xs">
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Filter: Trạng thái */}
              <div className="w-[160px]">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="h-9 text-xs">
                    <SelectValue placeholder="Trạng thái lớp" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="text-xs">
                      Tất cả trạng thái
                    </SelectItem>
                    <SelectItem value="active" className="text-xs">
                      🟢 Đang học (Active)
                    </SelectItem>
                    <SelectItem value="closed" className="text-xs">
                      ⚪ Đã đóng / Tạm hoãn
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Page size limit */}
              <div className="w-[110px]">
                <Select
                  value={String(limit)}
                  onValueChange={(val) => {
                    setLimit(Number(val));
                    setPage(1);
                  }}
                >
                  <SelectTrigger className="h-9 text-xs">
                    <SelectValue placeholder="Hiển thị" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15" className="text-xs">
                      15 dòng/trang
                    </SelectItem>
                    <SelectItem value="25" className="text-xs">
                      25 dòng/trang
                    </SelectItem>
                    <SelectItem value="50" className="text-xs">
                      50 dòng/trang
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ========================================================================= */}
      {/* PHẦN 3: BẢNG DỮ LIỆU TRUNG TÂM (MASTER DATA TABLE)                        */}
      {/* ========================================================================= */}
      <Card className="border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/80 dark:bg-slate-800/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[200px] text-xs font-bold text-slate-700 dark:text-slate-200">
                  Identities (Mã & Tên lớp)
                </TableHead>
                <TableHead className="w-[200px] text-xs font-bold text-slate-700 dark:text-slate-200">
                  Human (Giáo viên)
                </TableHead>
                <TableHead className="w-[200px] text-xs font-bold text-slate-700 dark:text-slate-200">
                  Schedule (Lịch & Phòng)
                </TableHead>
                <TableHead className="w-[180px] text-xs font-bold text-slate-700 dark:text-slate-200">
                  Timeline (Tiến độ buổi học)
                </TableHead>
                <TableHead className="w-[160px] text-xs font-bold text-slate-700 dark:text-slate-200 text-center">
                  Capacity (Sĩ số / Chỗ)
                </TableHead>
                <TableHead className="w-[160px] text-xs font-bold text-slate-700 dark:text-slate-200 text-center">
                  Health Check (Cảnh báo)
                </TableHead>
                <TableHead className="w-[140px] text-xs font-bold text-slate-700 dark:text-slate-200 text-right">
                  Actions (Thao tác)
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isListLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-48 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                      <span className="text-xs">Đang tải dữ liệu vận hành lớp học...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : classes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-48 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Filter className="w-8 h-8 text-slate-300" />
                      <p className="text-sm font-semibold text-slate-700">
                        Không tìm thấy lớp học nào phù hợp
                      </p>
                      <p className="text-xs text-slate-400">
                        Thử điều chỉnh từ khóa tìm kiếm hoặc bỏ bớt các bộ lọc bên trên.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                classes.map((c: any) => {
                  const studentCount = c._count?.students || 0;
                  const roomCap = c.room?.capacity || 15;
                  const occupancy = Math.round((studentCount / roomCap) * 100);

                  // Financial health evaluation
                  let capacityColor = "bg-emerald-50 text-emerald-700 border-emerald-200";
                  let capacityStatus = "Đạt chỉ tiêu";
                  if (studentCount < 6 || occupancy < 50) {
                    capacityColor = "bg-rose-50 text-rose-700 border-rose-200";
                    capacityStatus = "Thiếu sĩ số";
                  } else if (occupancy < 75) {
                    capacityColor = "bg-amber-50 text-amber-700 border-amber-200";
                    capacityStatus = "Đủ hòa vốn";
                  }

                  // Progress calculation
                  const totalSessions = c.totalSessions || 27;
                  const completedSessions = c.completedSessions || 0;
                  const progressPct =
                    totalSessions > 0
                      ? Math.min(100, Math.round((completedSessions / totalSessions) * 100))
                      : 0;

                  return (
                    <TableRow key={c.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Cột 1: Mã & Tên lớp (1-Click sang ACADEMICS) */}
                      <TableCell className="align-middle">
                        <Link
                          to={`/admin/classes/${c.id}`}
                          className="group block font-bold text-slate-900 hover:text-indigo-600 transition-colors"
                        >
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-xs text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100 group-hover:bg-indigo-100">
                              {c.name}
                            </span>
                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-600" />
                          </div>
                          <div className="text-[11px] text-slate-500 font-normal mt-0.5 line-clamp-1">
                            {c.course?.title || "Chưa gán khóa học"}
                          </div>
                        </Link>
                      </TableCell>

                      {/* Cột 2: Giáo viên */}
                      <TableCell className="align-middle">
                        {c.teacher ? (
                          <div className="flex items-center gap-2">
                            <Avatar className="w-7 h-7 border">
                              <AvatarFallback className="text-[10px] bg-indigo-100 text-indigo-700 font-bold">
                                {c.teacher.fullName ? c.teacher.fullName.slice(0, 2).toUpperCase() : "GV"}
                              </AvatarFallback>
                            </Avatar>
                            <div className="text-xs">
                              <p className="font-semibold text-slate-900 line-clamp-1">
                                {c.teacher.fullName}
                              </p>
                              <p className="text-[10px] text-slate-400 line-clamp-1">
                                {c.teacher.email}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <Badge variant="outline" className="text-[11px] font-normal text-slate-400 bg-slate-50">
                            Chưa gán GV
                          </Badge>
                        )}
                      </TableCell>

                      {/* Cột 3: Lịch & Phòng */}
                      <TableCell className="align-middle">
                        <div className="space-y-1 text-xs">
                          <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{c.room?.name ? `Phòng ${c.room.name}` : "Chưa chọn phòng"}</span>
                            {c.branch?.name && (
                              <span className="text-[10px] text-slate-400 font-normal">
                                ({c.branch.code || c.branch.name})
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            <span>
                              {c.startDate
                                ? new Date(c.startDate).toLocaleDateString("vi-VN")
                                : "Chưa đặt ngày"}
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      {/* Cột 4: Tiến độ */}
                      <TableCell className="align-middle">
                        <div className="space-y-1.5 w-[150px]">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-slate-500">Tiến độ</span>
                            <span className="font-semibold text-slate-700">
                              {completedSessions}/{totalSessions} buổi
                            </span>
                          </div>
                          <Progress value={progressPct} className="h-1.5 bg-slate-100" />
                        </div>
                      </TableCell>

                      {/* Cột 5: Capacity */}
                      <TableCell className="align-middle text-center">
                        <div className="inline-flex flex-col items-center">
                          <span className="text-sm font-bold text-slate-900">
                            {studentCount} / {roomCap} HV
                          </span>
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium border mt-0.5 ${capacityColor}`}
                          >
                            {occupancy}% ({capacityStatus})
                          </span>
                        </div>
                      </TableCell>

                      {/* Cột 6: Health Check */}
                      <TableCell className="align-middle text-center">
                        <div className="inline-flex flex-col items-center gap-1">
                          {c.isActive ? (
                            <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-200">
                              Đang mở
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-[10px] bg-slate-50 text-slate-600 border-slate-200">
                              Đã đóng
                            </Badge>
                          )}

                          {c.pendingSubmissionsCount > 0 ? (
                            <span className="text-[10px] text-amber-600 font-semibold bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                              {c.pendingSubmissionsCount} bài chưa chấm
                            </span>
                          ) : (
                            <span className="text-[10px] text-slate-400">
                              Bài tập ổn định
                            </span>
                          )}
                        </div>
                      </TableCell>

                      {/* Cột 7: Actions */}
                      <TableCell className="align-middle text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/admin/classes/${c.id}`)}
                            title="Mở màn hình lớp học chi tiết"
                            className="h-8 px-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 text-xs gap-1"
                          >
                            Tác nghiệp
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>

        {/* Server-side Pagination Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 border-t bg-slate-50/50 text-xs text-slate-600">
          <div>
            Hiển thị trang <span className="font-semibold text-slate-900">{page}</span> /{" "}
            <span className="font-semibold text-slate-900">{meta.totalPages || 1}</span> (Tổng số{" "}
            <span className="font-semibold text-slate-900">{meta.total}</span> lớp)
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1 || isListLoading}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="h-8 text-xs gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Trước
            </Button>
            <div className="text-xs font-semibold px-2">
              Trang {page}
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= (meta.totalPages || 1) || isListLoading}
              onClick={() => setPage((p) => p + 1)}
              className="h-8 text-xs gap-1"
            >
              Sau
              <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
