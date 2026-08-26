import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { statsApi, coursesApi } from "@/lib/api";
import { useBranch } from "@/contexts/BranchContext";
import {
  BookOpen,
  Users,
  GraduationCap,
  ChevronRight,
  CalendarRange,
  CheckCircle2,
  XCircle,
  Clock,
  FileCheck,
  School,
  ArrowRight,
  TrendingUp,
  Building2,
  MapPin,
  Layers,
  AlertTriangle,
  UserPlus,
  UserCheck,
  PauseCircle,
  FileText,
  Sparkles,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { AnnouncementBanner } from "@/components/AnnouncementBanner";
import { AlertWidget } from "@/components/AlertWidget";

export default function AdminDashboard() {
  const { selectedBranch, setSelectedBranch, currentBranch, branches, canSelectAll } = useBranch();

  // 1. Fetch Aggregated Management Summary
  const { data: dashboardSummary, isLoading: isSummaryLoading } = useQuery({
    queryKey: ["admin-dashboard-summary", selectedBranch],
    queryFn: () => statsApi.getDashboardSummary({ branchId: selectedBranch }),
  });

  // 2. Monthly Attendance
  const currentYear = new Date().getFullYear();
  const [period, setPeriod] = useState<string>(() =>
    String(new Date().getMonth() + 1).padStart(2, "0")
  );

  const { data: attendanceSummary, isLoading: isAttendanceLoading } = useQuery({
    queryKey: ["admin-attendance-monthly", currentYear, period],
    queryFn: () => statsApi.getMonthlyAttendance({ year: currentYear, month: period }),
  });

  const monthLabel = useMemo(() => {
    if (period === "year" || period === "all") return `Cả năm ${currentYear}`;
    return `Tháng ${Number(period)}/${currentYear}`;
  }, [currentYear, period]);

  const periods = useMemo(
    () => [
      ...Array.from({ length: 12 }, (_, i) => ({
        key: String(i + 1).padStart(2, "0"),
        label: `Tháng ${i + 1}`,
      })),
      { key: "year", label: "Cả năm" },
    ],
    []
  );

  // 3. Academic programs for quick check
  const { data: coursesData } = useQuery({
    queryKey: ["dashboard-courses"],
    queryFn: () => coursesApi.list({ limit: 5 }),
  });

  const courses = coursesData?.data || [];

  // Core 4 KPIs
  const coreKPIs = [
    {
      title: "Học viên Active",
      value: dashboardSummary?.kpis?.activeStudents ?? 0,
      subtext: "Đang theo học chính thức",
      icon: Users,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-500/10",
      link: "/admin/users?role=student",
    },
    {
      title: "Lead mới (7 ngày)",
      value: dashboardSummary?.kpis?.newLeads ?? 0,
      subtext: "Khách tư vấn phát sinh",
      icon: UserPlus,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-500/10",
      link: "/admin/leads?status=NEW",
    },
    {
      title: "Lớp đang chạy",
      value: dashboardSummary?.kpis?.activeClasses ?? 0,
      subtext: "Đang diễn ra bài giảng",
      icon: School,
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-500/10",
      link: "/admin/classes",
    },
    {
      title: "Tỷ lệ lấp đầy phòng",
      value: `${dashboardSummary?.kpis?.averageFillRate ?? 0}%`,
      subtext: "Công suất học viên / phòng",
      icon: TrendingUp,
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-500/10",
      link: "/admin/classes?filter=low-fill",
    },
  ];

  const actionItems = dashboardSummary?.actionItems || [];
  const funnel = dashboardSummary?.funnel;
  const teachers = dashboardSummary?.teachers || [];

  return (
    <div className="space-y-6 pb-12">
      {/* HEADER BAR */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Admin Executive Dashboard</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Bảng điều khiển vận hành & chỉ số ra quyết định quản lý
          </p>
        </div>
      </div>

      {/* Scope Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border bg-card/60 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {selectedBranch === "ALL" ? (
              <Layers className="h-5 w-5" />
            ) : (
              <MapPin className="h-5 w-5" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phạm vi dữ liệu:</span>
              <Badge variant={selectedBranch === "ALL" ? "secondary" : "default"} className="font-medium text-xs">
                {selectedBranch === "ALL" ? "Toàn bộ hệ thống" : currentBranch?.name || "Cơ sở"}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {selectedBranch === "ALL"
                ? `Đang tổng hợp số liệu từ tất cả ${branches.length} chi nhánh hoạt động`
                : `${currentBranch?.address || "Không có địa chỉ"} ${currentBranch?.phone ? `• Hotline: ${currentBranch.phone}` : ""}`}
            </p>
          </div>
        </div>

        {selectedBranch !== "ALL" && canSelectAll && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedBranch("ALL")}
            className="text-xs h-8"
          >
            <Layers className="h-3.5 w-3.5 mr-1.5 text-primary" />
            Xem toàn hệ thống
          </Button>
        )}
      </div>

      {/* Announcements / Alerts */}
      <AnnouncementBanner scopeRole="admin" />
      <AlertWidget role="admin" />

      {/* Multi-branch Breakdown when selectedBranch === 'ALL' */}
      {selectedBranch === "ALL" && branches.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold tracking-tight flex items-center gap-2">
              <Building2 className="h-4 w-4 text-primary" />
              Tổng quan các Chi nhánh ({branches.length})
            </h2>
            <span className="text-xs text-muted-foreground">
              Bấm vào chi nhánh để chuyển đổi góc nhìn
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {branches.map((b) => (
              <Card
                key={b.id}
                className="hover:border-primary/50 transition-all cursor-pointer hover:shadow-md bg-card/80 group"
                onClick={() => setSelectedBranch(b.id)}
              >
                <CardContent className="p-3.5 space-y-2.5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-xs text-foreground group-hover:text-primary transition-colors">
                        {b.name}
                      </h4>
                      <p className="text-[11px] text-muted-foreground">{b.code}</p>
                    </div>
                    <Badge variant="outline" className="text-[9px] font-semibold bg-emerald-50 text-emerald-700 border-emerald-200">
                      Hoạt động
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 pt-2 border-t text-center">
                    <div className="bg-muted/40 p-1.5 rounded-lg">
                      <p className="text-[9px] text-muted-foreground font-medium">Lớp học</p>
                      <p className="text-xs font-bold text-foreground mt-0.5">{b._count?.classes || 0}</p>
                    </div>
                    <div className="bg-muted/40 p-1.5 rounded-lg">
                      <p className="text-[9px] text-muted-foreground font-medium">Phòng</p>
                      <p className="text-xs font-bold text-foreground mt-0.5">{b._count?.rooms || 0}</p>
                    </div>
                    <div className="bg-muted/40 p-1.5 rounded-lg">
                      <p className="text-[9px] text-muted-foreground font-medium">Leads</p>
                      <p className="text-xs font-bold text-primary mt-0.5">{b._count?.leads || 0}</p>
                    </div>
                  </div>

                  <div className="text-[10px] text-primary flex items-center justify-end font-medium group-hover:translate-x-0.5 transition-transform">
                    Xem cơ sở này
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* 1. CORE 4 KPI CARDS */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {coreKPIs.map((stat) => (
          <Link key={stat.title} to={stat.link} className="block group">
            <Card className="hover:border-primary/50 transition-all hover:shadow-md h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-semibold text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg ${stat.bgColor} group-hover:scale-105 transition-transform`}
                >
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-black text-foreground">
                  {isSummaryLoading ? "—" : stat.value}
                </div>
                <p className="text-[11px] text-muted-foreground mt-1 flex items-center justify-between">
                  <span>{stat.subtext}</span>
                  <span className="text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Xem chi tiết →
                  </span>
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* 2. CẦN XỬ LÝ NGAY (ACTION ITEMS BOX) */}
      <Card className="border-amber-400/60 dark:border-amber-600/50 bg-gradient-to-br from-amber-500/5 via-card to-background shadow-sm overflow-hidden">
        <CardHeader className="pb-3 border-b bg-amber-500/10 dark:bg-amber-950/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white shadow-sm">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <div>
                <CardTitle className="text-base font-extrabold text-amber-950 dark:text-amber-200">
                  CẦN XỬ LÝ NGAY
                </CardTitle>
                <CardDescription className="text-xs text-amber-900/80 dark:text-amber-400">
                  Các sự vụ vận hành phát sinh vi phạm ngưỡng an toàn cần Admin can thiệp
                </CardDescription>
              </div>
            </div>
            <Badge className="bg-amber-600 text-white font-bold text-xs">
              {actionItems.reduce((acc, item) => acc + item.count, 0)} sự vụ
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-3">
          <div className="grid gap-2.5 sm:grid-cols-2">
            {actionItems.map((item) => {
              const isHigh = item.severity === "HIGH";
              const isZero = item.count === 0;

              return (
                <Link
                  key={item.key}
                  to={item.link}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-xl border transition-all group",
                    isZero
                      ? "bg-muted/20 border-muted text-muted-foreground opacity-75 hover:opacity-100"
                      : isHigh
                      ? "bg-rose-50/70 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900 hover:border-rose-400 hover:shadow-xs"
                      : "bg-amber-50/70 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900 hover:border-amber-400 hover:shadow-xs"
                  )}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-lg font-black text-xs flex-shrink-0",
                        isZero
                          ? "bg-muted text-muted-foreground"
                          : isHigh
                          ? "bg-rose-600 text-white"
                          : "bg-amber-600 text-white"
                      )}
                    >
                      {item.count}
                    </div>
                    <div className="truncate">
                      <p
                        className={cn(
                          "text-xs font-bold truncate group-hover:text-primary transition-colors",
                          isZero ? "text-muted-foreground" : "text-foreground"
                        )}
                      >
                        {item.label}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {isZero ? "Đang trong tầm kiểm soát" : isHigh ? "Mức độ: Cao (Ưu tiên số 1)" : "Mức độ: Trung bình"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center text-xs font-bold text-primary group-hover:translate-x-0.5 transition-transform flex-shrink-0">
                    <span>Xử lý</span>
                    <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 3. TWO COLUMNS: STUDENT VITALS & ADMISSION FUNNEL */}
      <div className="grid gap-5 md:grid-cols-2">
        {/* Nhịp đập học viên */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3 border-b bg-muted/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-600" />
                <CardTitle className="text-sm font-bold">Nhịp đập Học vụ (Student Vitals)</CardTitle>
              </div>
              <Button variant="ghost" size="sm" asChild className="h-7 text-xs text-primary">
                <Link to="/admin/users?role=student">
                  Quản lý học viên
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            <div className="grid grid-cols-3 gap-2.5">
              <div className="p-3 rounded-xl border bg-card text-center space-y-1">
                <div className="flex items-center justify-center gap-1 text-[11px] text-muted-foreground font-medium">
                  <UserCheck className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Đang học</span>
                </div>
                <div className="text-xl font-bold text-foreground">
                  {funnel?.students?.active ?? 0}
                </div>
                <div className="text-[10px] text-emerald-600 font-medium">Bình thường</div>
              </div>

              <div className="p-3 rounded-xl border border-rose-200 bg-rose-50/40 dark:bg-rose-950/20 text-center space-y-1">
                <div className="flex items-center justify-center gap-1 text-[11px] text-rose-700 font-medium">
                  <AlertTriangle className="h-3.5 w-3.5 text-rose-600" />
                  <span>Nguy cơ</span>
                </div>
                <div className="text-xl font-bold text-rose-700">
                  {funnel?.students?.atRisk ?? 0}
                </div>
                <Link
                  to="/admin/users?role=student&status=at-risk"
                  className="text-[10px] text-rose-600 font-bold hover:underline block"
                >
                  Can thiệp →
                </Link>
              </div>

              <div className="p-3 rounded-xl border border-amber-200 bg-amber-50/40 dark:bg-amber-950/20 text-center space-y-1">
                <div className="flex items-center justify-center gap-1 text-[11px] text-amber-700 font-medium">
                  <PauseCircle className="h-3.5 w-3.5 text-amber-600" />
                  <span>Bảo lưu</span>
                </div>
                <div className="text-xl font-bold text-amber-700">
                  {funnel?.students?.reserved ?? 0}
                </div>
                <div className="text-[10px] text-amber-600 font-medium">Chờ kích hoạt lại</div>
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground text-center">
              💡 Học viên có nguy cơ được phát hiện tự động dựa trên số buổi vắng liên tiếp và tốc độ nộp bài.
            </p>
          </CardContent>
        </Card>

        {/* Phễu tuyển sinh 7 ngày */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3 border-b bg-muted/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserPlus className="h-4 w-4 text-purple-600" />
                <CardTitle className="text-sm font-bold">Phễu Tuyển sinh (7 ngày qua)</CardTitle>
              </div>
              <Button variant="ghost" size="sm" asChild className="h-7 text-xs text-primary">
                <Link to="/admin/leads">
                  Xem danh sách Leads
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-2.5 rounded-xl border bg-card space-y-1">
                <p className="text-[10px] text-muted-foreground font-medium">1. Lead mới</p>
                <p className="text-lg font-bold text-foreground">{funnel?.leads?.new ?? 0}</p>
                <p className="text-[9px] text-muted-foreground">Tiếp nhận</p>
              </div>

              <div className="p-2.5 rounded-xl border bg-card space-y-1">
                <p className="text-[10px] text-muted-foreground font-medium">2. Đã Test</p>
                <p className="text-lg font-bold text-foreground">{funnel?.leads?.tested ?? 0}</p>
                <p className="text-[9px] text-muted-foreground">Khảo thí</p>
              </div>

              <div className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/50 text-center space-y-1">
                <p className="text-[10px] text-emerald-800 font-medium">3. Nhập học</p>
                <p className="text-lg font-bold text-emerald-700">{funnel?.leads?.enrolled ?? 0}</p>
                <p className="text-[9px] text-emerald-600 font-bold">Enrolled</p>
              </div>

              <div className="p-2.5 rounded-xl border border-purple-200 bg-purple-50/50 text-center space-y-1">
                <p className="text-[10px] text-purple-800 font-medium">Chuyển đổi</p>
                <p className="text-lg font-black text-purple-700">{funnel?.leads?.conversionRate ?? 0}%</p>
                <p className="text-[9px] text-purple-600 font-medium">Tỷ lệ chốt</p>
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground text-center">
              🎯 Tỷ lệ Enrolled được tính trên các học viên hoàn tất thủ tục và được cấp tài khoản học viên chính thức.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 4. FACULTY WORKLOAD & SLA TABLE */}
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-3 border-b bg-muted/20">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600">
              <GraduationCap className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-sm font-bold">Tải Công Việc & Kỷ Luật Giảng Viên (Faculty Workload)</CardTitle>
              <CardDescription className="text-xs">
                Đo lường minh bạch số lớp phụ trách, bài chờ chấm và các bài quá hạn SLA 48h
              </CardDescription>
            </div>
          </div>
          <Button variant="outline" size="sm" asChild className="text-xs h-8">
            <Link to="/admin/teachers">
              Quản lý giáo viên
              <ChevronRight className="h-3.5 w-3.5 ml-1" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          {teachers.length === 0 ? (
            <div className="p-8 text-center text-xs text-muted-foreground">
              Chưa có giáo viên nào trong chi nhánh này.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-muted/40 text-muted-foreground font-semibold border-b">
                  <tr>
                    <th className="p-3 pl-4">Giáo viên</th>
                    <th className="p-3 text-center">Lớp phụ trách</th>
                    <th className="p-3 text-center">Tổng học viên</th>
                    <th className="p-3 text-center">Bài chờ chấm</th>
                    <th className="p-3 text-center">Quá hạn SLA (&gt;48h)</th>
                    <th className="p-3 text-right pr-4">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {teachers.map((t) => (
                    <tr key={t.id} className="hover:bg-muted/30 transition-colors">
                      <td className="p-3 pl-4 font-semibold text-foreground flex items-center gap-2.5">
                        <Avatar className="h-7 w-7">
                          <AvatarImage src={t.avatarUrl} />
                          <AvatarFallback className="bg-amber-100 text-amber-700 text-[10px] font-bold">
                            {t.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <span>{t.name}</span>
                          <span className="text-[10px] text-muted-foreground block">{t.email}</span>
                        </div>
                      </td>
                      <td className="p-3 text-center font-semibold">{t.activeClassesCount} lớp</td>
                      <td className="p-3 text-center">{t.totalStudents} HV</td>
                      <td className="p-3 text-center font-bold text-foreground">{t.pendingGrading} bài</td>
                      <td className="p-3 text-center">
                        {t.overdueGrading > 0 ? (
                          <Badge variant="destructive" className="text-[10px] font-bold px-1.5 py-0">
                            🚨 {t.overdueGrading} bài trễ
                          </Badge>
                        ) : (
                          <span className="text-emerald-600 font-semibold flex items-center justify-center gap-1">
                            <CheckCircle2 className="h-3.5 w-3.5" /> Đúng hạn
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-right pr-4">
                        <Button variant="ghost" size="sm" asChild className="h-7 text-xs text-primary font-bold">
                          <Link to={`/admin/teacher-workspace?id=${t.id}`}>
                            Bàn chấm bài →
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 5. ATTENDANCE MONTHLY CARD (PRESERVED & ENHANCED) */}
      <Card className="overflow-hidden border shadow-sm">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b bg-muted/20">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
              <CalendarRange className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                Báo cáo Chuyên cần theo tháng
                <Badge variant="outline" className="text-xs font-normal text-emerald-700 bg-emerald-50 border-emerald-200">
                  {monthLabel}
                </Badge>
              </CardTitle>
              <CardDescription className="text-xs">
                Tổng hợp lịch học, lượt có mặt, vắng và tỷ lệ chuyên cần của toàn bộ các lớp
              </CardDescription>
            </div>
          </div>
          <Button variant="outline" size="sm" asChild className="hidden sm:inline-flex text-xs h-8">
            <Link to="/admin/classes">
              Quản lý lớp học
              <ChevronRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 pt-4">
          {/* Period selector buttons */}
          <div className="overflow-x-auto pb-1 -mx-1 px-1">
            <div className="flex items-center gap-1.5 min-w-max">
              {periods.map((item) => (
                <Button
                  key={item.key}
                  type="button"
                  size="sm"
                  variant={period === item.key ? "default" : "outline"}
                  className={cn(
                    "h-8 rounded-full px-3 text-xs transition-all font-medium",
                    period === item.key
                      ? "bg-emerald-600 hover:bg-emerald-600/90 text-white shadow-xs"
                      : "hover:bg-muted text-muted-foreground"
                  )}
                  onClick={() => setPeriod(item.key)}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>

          {/* KPI Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            <div className="p-3 rounded-xl border bg-slate-50/70 space-y-1">
              <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
                <span>Số buổi học</span>
                <School className="h-3.5 w-3.5 text-slate-500" />
              </div>
              <div className="text-lg font-bold text-slate-900">
                {attendanceSummary?.totalSessions ?? 0} <span className="text-xs font-normal text-muted-foreground">buổi</span>
              </div>
              <div className="text-[10px] text-muted-foreground">
                {attendanceSummary?.completedSessions ?? 0} buổi đã chốt
              </div>
            </div>

            <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-1">
              <div className="flex items-center justify-between text-xs text-emerald-700 font-medium">
                <span>Lượt có mặt</span>
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              </div>
              <div className="text-lg font-bold text-emerald-700">
                {attendanceSummary?.totalPresent ?? 0} <span className="text-xs font-normal text-emerald-600/80">lượt</span>
              </div>
              <div className="text-[10px] text-emerald-600/80">
                {attendanceSummary?.lateCount ? `${attendanceSummary.lateCount} đi muộn` : "Đầy đủ"}
              </div>
            </div>

            <div className="p-3 rounded-xl border border-rose-200 bg-rose-50/50 space-y-1">
              <div className="flex items-center justify-between text-xs text-rose-700 font-medium">
                <span>Lượt vắng</span>
                <XCircle className="h-3.5 w-3.5 text-rose-600" />
              </div>
              <div className="text-lg font-bold text-rose-700">
                {attendanceSummary?.totalAbsent ?? 0} <span className="text-xs font-normal text-rose-600/80">lượt</span>
              </div>
              <div className="text-[10px] text-rose-600/80">Vắng không phép</div>
            </div>

            <div className="p-3 rounded-xl border border-purple-200 bg-purple-50/50 space-y-1">
              <div className="flex items-center justify-between text-xs text-purple-700 font-medium">
                <span>Nghỉ có phép</span>
                <FileCheck className="h-3.5 w-3.5 text-purple-600" />
              </div>
              <div className="text-lg font-bold text-purple-700">
                {attendanceSummary?.totalExcused ?? 0} <span className="text-xs font-normal text-purple-600/80">lượt</span>
              </div>
              <div className="text-[10px] text-purple-600/80">Có đơn xin phép</div>
            </div>

            <div className="p-3 rounded-xl border border-amber-200 bg-amber-50/50 space-y-1">
              <div className="flex items-center justify-between text-xs text-amber-700 font-medium">
                <span>Đi muộn</span>
                <Clock className="h-3.5 w-3.5 text-amber-600" />
              </div>
              <div className="text-lg font-bold text-amber-700">
                {attendanceSummary?.lateCount ?? 0} <span className="text-xs font-normal text-amber-600/80">lượt</span>
              </div>
              <div className="text-[10px] text-amber-600/80">Được tính có mặt</div>
            </div>

            <div className="p-3 rounded-xl border border-blue-200 bg-blue-50/50 space-y-1">
              <div className="flex items-center justify-between text-xs text-blue-700 font-medium">
                <span>Chuyên cần</span>
                <TrendingUp className="h-3.5 w-3.5 text-blue-600" />
              </div>
              <div className="text-lg font-bold text-blue-700">
                {attendanceSummary?.attendanceRate != null
                  ? Math.round(attendanceSummary.attendanceRate * 100)
                  : 100}
                %
              </div>
              <div className="text-[10px] text-blue-600/80">
                {attendanceSummary?.activeClassesCount ?? 0} lớp có lịch học
              </div>
            </div>
          </div>

          {/* Breakdown By Class in this month */}
          <div className="space-y-2 pt-1">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Tổng hợp theo từng lớp ({attendanceSummary?.byClass?.length || 0} lớp trong {monthLabel})
            </h4>

            {isAttendanceLoading ? (
              <div className="p-6 text-center text-xs text-muted-foreground">
                Đang tải dữ liệu điểm danh...
              </div>
            ) : !attendanceSummary?.byClass || attendanceSummary.byClass.length === 0 ? (
              <div className="p-6 border border-dashed rounded-xl text-center text-xs text-muted-foreground bg-muted/10">
                Không có buổi học hoặc bản ghi điểm danh nào trong {monthLabel}.
              </div>
            ) : (
              <div className="border rounded-xl overflow-hidden bg-card">
                <div className="grid grid-cols-12 bg-muted/40 p-2.5 px-3.5 text-xs font-semibold text-muted-foreground border-b">
                  <span className="col-span-4">Lớp học</span>
                  <span className="col-span-2 text-center">Số buổi</span>
                  <span className="col-span-2 text-center text-emerald-700">Có mặt</span>
                  <span className="col-span-2 text-center text-rose-700">Vắng</span>
                  <span className="col-span-2 text-right">Chuyên cần</span>
                </div>
                <div className="divide-y text-xs">
                  {attendanceSummary.byClass.map((cls) => (
                    <div
                      key={cls.classId}
                      className="grid grid-cols-12 p-2.5 px-3.5 items-center hover:bg-muted/30 transition-colors gap-1"
                    >
                      <div className="col-span-4 min-w-0 pr-2">
                        <Link
                          to={`/admin/classes/${cls.classId}`}
                          className="font-semibold text-foreground hover:text-emerald-600 hover:underline truncate block"
                          title={cls.className}
                        >
                          {cls.className}
                        </Link>
                        <div className="text-[10px] text-muted-foreground truncate">
                          GV: {cls.teacherName} · {cls.totalStudents} học viên
                        </div>
                      </div>
                      <div className="col-span-2 text-center">
                        <span className="font-semibold text-foreground">{cls.totalSessions}</span>
                        <span className="text-[10px] text-muted-foreground block">
                          ({cls.completedSessions} đã chốt)
                        </span>
                      </div>
                      <div className="col-span-2 text-center font-semibold text-emerald-600">
                        {cls.totalPresent}
                        {cls.lateCount > 0 && (
                          <span className="text-[10px] text-amber-600 block">
                            ({cls.lateCount} muộn)
                          </span>
                        )}
                      </div>
                      <div className="col-span-2 text-center">
                        <span className={cls.totalAbsent > 0 ? "font-semibold text-rose-600" : "text-muted-foreground"}>
                          {cls.totalAbsent}
                        </span>
                        {cls.totalExcused > 0 && (
                          <span className="text-[10px] text-purple-600 block">
                            ({cls.totalExcused} phép)
                          </span>
                        )}
                      </div>
                      <div className="col-span-2 text-right">
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-[10px] font-bold",
                            cls.attendanceRate >= 0.9
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : cls.attendanceRate >= 0.75
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-rose-50 text-rose-700 border-rose-200"
                          )}
                        >
                          {Math.round(cls.attendanceRate * 100)}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 6. ACADEMIC PROGRAMS WIDGET (BOTTOM) */}
      <Card>
        <CardHeader className="pb-3 border-b bg-muted/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <BookOpen className="h-4 w-4" />
              </div>
              <div>
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  Academic Programs ({coursesData?.meta?.total || courses.length})
                </CardTitle>
                <CardDescription className="text-xs">Tra cứu nhanh trạng thái các khóa học đang triển khai</CardDescription>
              </div>
            </div>
            <Button variant="outline" size="sm" asChild className="text-xs h-8">
              <Link to="/admin/courses">
                Quản lý khóa học
                <ChevronRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {courses.length === 0 ? (
            <div className="p-6 text-center text-xs text-muted-foreground">
              Chưa có chương trình đào tạo nào.
            </div>
          ) : (
            <div className="divide-y text-xs">
              {courses.slice(0, 5).map((c: any) => (
                <div key={c.id} className="flex items-center justify-between p-3 px-4 hover:bg-muted/30 transition-colors">
                  <span className="font-semibold text-foreground truncate max-w-sm">{c.title}</span>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="outline"
                      className={
                        c.isPublished
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px]"
                          : "bg-amber-50 text-amber-700 border-amber-200 text-[10px]"
                      }
                    >
                      {c.isPublished ? "🟢 Active" : "🟡 Draft"}
                    </Badge>
                    <span className="text-muted-foreground text-[11px]">Level: {c.level || "Foundation"}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
