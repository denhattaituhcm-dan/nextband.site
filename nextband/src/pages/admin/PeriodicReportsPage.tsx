import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { reportsApi, PeriodicReportData } from "@/lib/api";
import { useBranch } from "@/contexts/BranchContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import {
  TrendingUp,
  FileText,
  Copy,
  Check,
  Printer,
  Calendar,
  Building2,
  Users,
  GraduationCap,
  School,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Layers,
  Sparkles,
  BookOpen,
  LayoutGrid,
  AlignLeft,
  CalendarRange,
  ArrowUpRight,
  UserCheck,
  Award,
} from "lucide-react";

export default function PeriodicReportsPage() {
  const { toast } = useToast();
  const { selectedBranch, setSelectedBranch, currentBranch, branches, canSelectAll } = useBranch();

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentQuarter = Math.ceil(currentMonth / 3);

  const [periodType, setPeriodType] = useState<"YEAR" | "QUARTER" | "MONTH" | "CUSTOM">("YEAR");
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [selectedQuarter, setSelectedQuarter] = useState<number>(currentQuarter);
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);

  // Custom date range state (Defaults to year-to-date)
  const defaultFrom = `${currentYear}-01-01`;
  const defaultTo = new Date().toISOString().split("T")[0];
  const [customStartDate, setCustomStartDate] = useState<string>(defaultFrom);
  const [customEndDate, setCustomEndDate] = useState<string>(defaultTo);

  const [copied, setCopied] = useState(false);
  const [summaryViewMode, setSummaryViewMode] = useState<"visual" | "text">("visual");

  const yearOptions = useMemo(() => {
    return [currentYear, currentYear - 1, currentYear - 2, currentYear - 3];
  }, [currentYear]);

  // Fetch report data
  const { data: report, isLoading, isError, refetch } = useQuery<PeriodicReportData>({
    queryKey: [
      "admin-periodic-report",
      periodType,
      selectedYear,
      periodType === "MONTH" ? selectedMonth : undefined,
      periodType === "QUARTER" ? selectedQuarter : undefined,
      periodType === "CUSTOM" ? customStartDate : undefined,
      periodType === "CUSTOM" ? customEndDate : undefined,
      selectedBranch,
    ],
    queryFn: () =>
      reportsApi.getPeriodicReport({
        periodType,
        year: selectedYear,
        month: periodType === "MONTH" ? selectedMonth : undefined,
        quarter: periodType === "QUARTER" ? selectedQuarter : undefined,
        startDate: periodType === "CUSTOM" ? customStartDate : undefined,
        endDate: periodType === "CUSTOM" ? customEndDate : undefined,
        branchId: selectedBranch,
      }),
  });

  const handleCopySummary = async () => {
    if (!report?.summaryText) return;
    try {
      await navigator.clipboard.writeText(report.summaryText);
      setCopied(true);
      toast({
        title: "Đã sao chép tóm tắt!",
        description: "Bản báo cáo điều hành đã sẵn sàng để dán vào Word, Google Docs hoặc Email.",
      });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast({
        variant: "destructive",
        title: "Không thể sao chép",
        description: "Vui lòng chọn thủ công đoạn văn bản.",
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto print:p-0 print:space-y-4 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden bg-card/60 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border shadow-sm">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                  Báo cáo & Tổng kết Hoạt động
                </h1>
                <Badge className="bg-primary/15 text-primary border-primary/30 font-semibold px-2 py-0.5 text-[11px]">
                  Định kỳ
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                Tổng hợp chỉ số toàn diện theo Tháng, Quý hoặc Năm phục vụ công tác điều hành & hoạch định.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="text-xs h-9 gap-1.5 bg-background shadow-xs hover:bg-muted"
          >
            <Printer className="h-4 w-4 text-muted-foreground" />
            In báo cáo
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={handleCopySummary}
            disabled={!report || isLoading}
            className="text-xs h-9 gap-1.5 shadow-sm font-medium transition-all"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-300" /> : <Copy className="h-4 w-4" />}
            {copied ? "Đã sao chép Word" : "Sao chép tóm tắt Word"}
          </Button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <Card className="border-slate-200/90 dark:border-border shadow-sm bg-card overflow-hidden">
        <div className="bg-muted/40 px-4 py-2.5 border-b flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
            <Calendar className="h-3.5 w-3.5 text-primary" />
            <span>Bộ lọc báo cáo</span>
          </div>
          {report && (
            <Badge variant="outline" className="text-[11px] font-medium bg-background text-muted-foreground">
              {report.period.periodLabel} • {report.period.branchName}
            </Badge>
          )}
        </div>
        <CardContent className="p-4 sm:p-5">
          <div className="flex flex-wrap items-end gap-4 lg:gap-6">
            {/* Period Type Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                Chu kỳ tổng kết
              </label>
              <div className="inline-flex rounded-lg border bg-muted/50 p-1 gap-1">
                {(["YEAR", "QUARTER", "MONTH", "CUSTOM"] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setPeriodType(type)}
                    className={`px-3 py-1.5 text-xs rounded-md transition-all font-medium ${
                      periodType === type
                        ? "bg-background text-foreground shadow-xs font-semibold border border-border/60 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                    }`}
                  >
                    {type === "YEAR"
                      ? "Cả năm"
                      : type === "QUARTER"
                      ? "Theo Quý"
                      : type === "MONTH"
                      ? "Theo Tháng"
                      : "Tùy chọn ngày"}
                  </button>
                ))}
              </div>
            </div>

            {/* If Not CUSTOM: Year / Quarter / Month Selectors */}
            {periodType !== "CUSTOM" && (
              <>
                {/* Year Selector */}
                <div className="space-y-1.5 min-w-[120px]">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                    Năm
                  </label>
                  <Select
                    value={String(selectedYear)}
                    onValueChange={(val) => setSelectedYear(Number(val))}
                  >
                    <SelectTrigger className="h-9 text-xs bg-background">
                      <SelectValue placeholder="Chọn năm" />
                    </SelectTrigger>
                    <SelectContent>
                      {yearOptions.map((y) => (
                        <SelectItem key={y} value={String(y)} className="text-xs">
                          Năm {y}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Quarter Selector (if QUARTER) */}
                {periodType === "QUARTER" && (
                  <div className="space-y-1.5 min-w-[140px]">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                      Quý
                    </label>
                    <Select
                      value={String(selectedQuarter)}
                      onValueChange={(val) => setSelectedQuarter(Number(val))}
                    >
                      <SelectTrigger className="h-9 text-xs bg-background">
                        <SelectValue placeholder="Chọn quý" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1" className="text-xs">Quý 1 (T1 – T3)</SelectItem>
                        <SelectItem value="2" className="text-xs">Quý 2 (T4 – T6)</SelectItem>
                        <SelectItem value="3" className="text-xs">Quý 3 (T7 – T9)</SelectItem>
                        <SelectItem value="4" className="text-xs">Quý 4 (T10 – T12)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Month Selector (if MONTH) */}
                {periodType === "MONTH" && (
                  <div className="space-y-1.5 min-w-[120px]">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                      Tháng
                    </label>
                    <Select
                      value={String(selectedMonth)}
                      onValueChange={(val) => setSelectedMonth(Number(val))}
                    >
                      <SelectTrigger className="h-9 text-xs bg-background">
                        <SelectValue placeholder="Chọn tháng" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                          <SelectItem key={m} value={String(m)} className="text-xs">
                            Tháng {m}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </>
            )}

            {/* If CUSTOM: Date Pickers */}
            {periodType === "CUSTOM" && (
              <div className="flex flex-wrap items-end gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                    Từ ngày
                  </label>
                  <input
                    type="date"
                    value={customStartDate}
                    onChange={(e) => setCustomStartDate(e.target.value)}
                    className="h-9 text-xs px-3 py-1 rounded-md border bg-background text-foreground shadow-xs focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                    Đến ngày
                  </label>
                  <input
                    type="date"
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e.target.value)}
                    className="h-9 text-xs px-3 py-1 rounded-md border bg-background text-foreground shadow-xs focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                {/* Presets */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                    Phím tắt nhanh
                  </label>
                  <div className="flex items-center gap-1.5 h-9">
                    <button
                      type="button"
                      onClick={() => {
                        const now = new Date();
                        const curYear = now.getFullYear();
                        const syStart = now.getMonth() >= 8 ? `${curYear}-09-01` : `${curYear - 1}-09-01`;
                        const syEnd = now.getMonth() >= 8 ? `${curYear + 1}-08-31` : `${curYear}-08-31`;
                        setCustomStartDate(syStart);
                        setCustomEndDate(syEnd);
                      }}
                      className="h-9 px-2.5 text-[11px] rounded-md bg-secondary/80 hover:bg-secondary border font-medium text-secondary-foreground transition-all shadow-xs"
                    >
                      Niên khóa (01/09 – 31/08)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const now = new Date();
                        const sixMonthsAgo = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
                        setCustomStartDate(sixMonthsAgo.toISOString().split("T")[0]);
                        setCustomEndDate(now.toISOString().split("T")[0]);
                      }}
                      className="h-9 px-2.5 text-[11px] rounded-md bg-secondary/80 hover:bg-secondary border font-medium text-secondary-foreground transition-all shadow-xs"
                    >
                      6 tháng gần đây
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Branch Selector */}
            <div className="space-y-1.5 min-w-[200px] sm:ml-auto">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                Phạm vi cơ sở
              </label>
              <Select
                value={selectedBranch}
                onValueChange={(val) => setSelectedBranch(val)}
              >
                <SelectTrigger className="h-9 text-xs bg-background">
                  <div className="flex items-center gap-1.5 truncate">
                    <Building2 className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <SelectValue placeholder="Chọn cơ sở" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {canSelectAll && (
                    <SelectItem value="ALL" className="text-xs font-medium">
                      Toàn bộ hệ thống
                    </SelectItem>
                  )}
                  {branches.map((b) => (
                    <SelectItem key={b.id} value={b.id} className="text-xs">
                      {b.name} ({b.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading state */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center p-16 space-y-4 border rounded-2xl bg-card/60 shadow-sm">
          <div className="h-9 w-9 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm font-medium text-muted-foreground animate-pulse">
            Đang tổng hợp các chỉ số hoạt động định kỳ...
          </p>
        </div>
      )}

      {/* Error state */}
      {isError && (
        <Card className="border-destructive/30 bg-destructive/5 p-6 text-center shadow-sm">
          <AlertCircle className="h-8 w-8 text-destructive mx-auto mb-2" />
          <h3 className="font-semibold text-destructive">Không thể tải báo cáo</h3>
          <p className="text-xs text-muted-foreground mt-1 mb-4">
            Đã có lỗi xảy ra trong quá trình tổng hợp số liệu.
          </p>
          <Button size="sm" variant="outline" onClick={() => refetch()}>
            Thử lại
          </Button>
        </Card>
      )}

      {/* Main Report Content */}
      {report && !isLoading && (
        <div className="space-y-6">
          {/* Print Header */}
          <div className="hidden print:block border-b pb-4 mb-4">
            <h2 className="text-xl font-bold uppercase tracking-tight">
              Báo Cáo Hoạt Động Định Kỳ — NextBand IELTS
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Kỳ báo cáo: {report.period.periodLabel} • Phạm vi: {report.period.branchName} • Thời gian xuất: {new Date().toLocaleDateString("vi-VN")}
            </p>
          </div>

          {/* 1. Executive Summary Box */}
          <Card className="border-indigo-200/70 dark:border-indigo-900/50 bg-gradient-to-br from-indigo-50/50 via-card to-background shadow-sm overflow-hidden">
            <CardHeader className="p-4 sm:p-5 pb-3 border-b bg-indigo-500/[0.04] dark:bg-indigo-500/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <CardTitle className="text-base font-bold tracking-tight text-foreground flex items-center gap-2">
                    Tóm tắt Điều hành
                    <Badge variant="outline" className="bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border-indigo-200 text-[11px] font-semibold">
                      {report.period.periodLabel}
                    </Badge>
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Phạm vi: <span className="font-medium text-foreground">{report.period.branchName}</span>
                  </p>
                </div>
              </div>

              {/* View Switcher & Copy Action */}
              <div className="flex items-center gap-2 self-start sm:self-auto print:hidden">
                <div className="inline-flex rounded-lg border bg-muted/60 p-0.5 gap-0.5">
                  <button
                    type="button"
                    onClick={() => setSummaryViewMode("visual")}
                    className={`px-2.5 py-1 text-xs rounded-md transition-all flex items-center gap-1 font-medium ${
                      summaryViewMode === "visual"
                        ? "bg-background text-foreground shadow-xs font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <LayoutGrid className="h-3 w-3" />
                    Trực quan
                  </button>
                  <button
                    type="button"
                    onClick={() => setSummaryViewMode("text")}
                    className={`px-2.5 py-1 text-xs rounded-md transition-all flex items-center gap-1 font-medium ${
                      summaryViewMode === "text"
                        ? "bg-background text-foreground shadow-xs font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <AlignLeft className="h-3 w-3" />
                    Văn bản Word
                  </button>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopySummary}
                  className="h-7 text-xs text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-950 border-indigo-200 gap-1.5"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Đã chép" : "Sao chép"}
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-4 sm:p-5">
              {summaryViewMode === "visual" ? (
                <div className="grid gap-3.5 sm:grid-cols-2">
                  {/* Section 1: Quy mô & Đào tạo */}
                  <div className="p-3.5 rounded-xl border border-blue-100 dark:border-blue-900/40 bg-blue-50/40 dark:bg-blue-950/20 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-800 dark:text-blue-300">
                      <GraduationCap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <span>1. Quy mô & Đào tạo</span>
                    </div>
                    <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1 leading-relaxed">
                      <p>
                        • Mở mới: <span className="font-semibold text-blue-700 dark:text-blue-300">{report.classes.opened} lớp</span> • Hoàn thành: <span className="font-medium">{report.classes.completed} lớp</span> • Đang chạy: <span className="font-semibold">{report.classes.runningAtEnd} lớp</span>
                      </p>
                      <p>
                        • Sĩ số trung bình: <span className="font-semibold text-blue-700 dark:text-blue-300">{report.classes.avgClassSize} học viên/lớp</span>
                      </p>
                      <p>
                        • Đăng ký mới: <span className="font-semibold">{report.students.newEnrollments} hv</span> • Đang học cuối kỳ: <span className="font-semibold text-blue-700 dark:text-blue-300">{report.students.activeAtEnd} hv</span>
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        • Hoàn thành khóa: {report.students.graduated} hv | Bảo lưu: {report.students.reserved} hv | Thôi học: {report.students.dropped !== null ? `${report.students.dropped} hv` : "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Section 2: Tuyển sinh & Phát triển */}
                  <div className="p-3.5 rounded-xl border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                      <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      <span>2. Tuyển sinh & Phát triển</span>
                    </div>
                    <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1 leading-relaxed">
                      <p>
                        • Tiếp nhận: <span className="font-semibold">{report.admissions.newLeads} leads</span> • Khảo thí test: <span className="font-medium">{report.admissions.placementTests} lượt</span>
                      </p>
                      <p>
                        • Chốt đăng ký: <span className="font-bold text-emerald-700 dark:text-emerald-300">{report.admissions.enrolled} học viên</span>
                        <Badge className="ml-2 text-[10px] font-bold bg-emerald-600 text-white px-1.5 py-0 h-4">
                          Chuyển đổi {report.admissions.conversionRate}%
                        </Badge>
                      </p>
                      {report.admissions.bySource.length > 0 && (
                        <p className="text-[11px] text-muted-foreground truncate">
                          • Nguồn chính: {report.admissions.bySource.slice(0, 2).map((s) => `${s.source} (${s.enrolled} chốt)`).join(", ")}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Section 3: Đội ngũ Giảng viên */}
                  <div className="p-3.5 rounded-xl border border-purple-100 dark:border-purple-900/40 bg-purple-50/40 dark:bg-purple-950/20 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-purple-800 dark:text-purple-300">
                      <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      <span>3. Đội ngũ Giảng viên</span>
                    </div>
                    <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1 leading-relaxed">
                      <p>
                        • Quy mô cuối kỳ: <span className="font-bold text-purple-700 dark:text-purple-300">{report.teachers.endOfPeriod} giáo viên</span> (Đầu kỳ: {report.teachers.startOfPeriod})
                      </p>
                      <p>
                        • Biến động: Tuyển mới <span className="font-semibold text-emerald-600">+{report.teachers.newlyRecruited}</span> • Nghỉ / thôi dạy <span className="font-semibold text-rose-600">-{report.teachers.resigned}</span>
                      </p>
                    </div>
                  </div>

                  {/* Section 4: Hoạt động Học thuật */}
                  <div className="p-3.5 rounded-xl border border-amber-100 dark:border-amber-900/40 bg-amber-50/40 dark:bg-amber-950/20 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300">
                      <BookOpen className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      <span>4. Hoạt động Học thuật</span>
                    </div>
                    <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1 leading-relaxed">
                      <p>
                        • Buổi học tổ chức: <span className="font-semibold">{report.academic.totalSessions} buổi</span> • Lượt điểm danh: <span className="font-medium">{report.academic.totalAttendances}</span>
                      </p>
                      <p>
                        • Chuyên cần: <span className="font-bold text-amber-700 dark:text-amber-300">{report.academic.attendanceRate}%</span> • Tỷ lệ nộp bài tập: <span className="font-semibold">{report.academic.submissionRate}%</span> ({report.academic.homeworkSubmitted}/{report.academic.homeworkAssigned})
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed text-foreground bg-card p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs overflow-x-auto">
                  {report.summaryText}
                </pre>
              )}
            </CardContent>
          </Card>

          {/* 2. Four Key Indicator Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Card 1: Tuyển sinh */}
            <Card className="relative overflow-hidden border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <div className="h-1.5 w-full bg-blue-500" />
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Tuyển sinh
                  </span>
                  <div className="h-8 w-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-foreground">
                    {report.admissions.enrolled}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">học viên chốt</span>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-2 text-xs space-y-2 border-t mt-1 bg-muted/20">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Leads tiếp nhận:</span>
                  <span className="font-semibold text-foreground">{report.admissions.newLeads}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Lượt test đầu vào:</span>
                  <span className="font-semibold text-foreground">{report.admissions.placementTests}</span>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-dashed">
                  <span className="text-muted-foreground font-medium">Tỷ lệ chuyển đổi:</span>
                  <Badge className="text-[10px] font-bold bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-blue-200">
                    {report.admissions.conversionRate}%
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Card 2: Học viên */}
            <Card className="relative overflow-hidden border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <div className="h-1.5 w-full bg-emerald-500" />
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Quy mô Học viên
                  </span>
                  <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                    <Users className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-foreground">
                    {report.students.activeAtEnd}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">đang học cuối kỳ</span>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-2 text-xs space-y-2 border-t mt-1 bg-muted/20">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Đăng ký mới:</span>
                  <span className="font-semibold text-foreground">{report.students.newEnrollments}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Hoàn thành khóa:</span>
                  <span className="font-semibold text-emerald-600">{report.students.graduated}</span>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-dashed">
                  <span className="text-muted-foreground font-medium">Bảo lưu / Thôi học:</span>
                  <span className="font-semibold text-foreground">
                    {report.students.reserved} BL • {report.students.dropped !== null ? `${report.students.dropped} TH` : "N/A"}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Card 3: Lớp học */}
            <Card className="relative overflow-hidden border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <div className="h-1.5 w-full bg-amber-500" />
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    Lớp học
                  </span>
                  <div className="h-8 w-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
                    <School className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-foreground">
                    {report.classes.opened}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">lớp mở mới</span>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-2 text-xs space-y-2 border-t mt-1 bg-muted/20">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Lớp hoàn thành:</span>
                  <span className="font-semibold text-foreground">{report.classes.completed}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Đang chạy cuối kỳ:</span>
                  <span className="font-semibold text-foreground">{report.classes.runningAtEnd}</span>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-dashed">
                  <span className="text-muted-foreground font-medium">Sĩ số trung bình:</span>
                  <Badge className="text-[10px] font-bold bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 border-amber-200">
                    {report.classes.avgClassSize} hv/lớp
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Card 4: Giáo viên & Đào tạo */}
            <Card className="relative overflow-hidden border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <div className="h-1.5 w-full bg-purple-500" />
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                    Đội ngũ & Học thuật
                  </span>
                  <div className="h-8 w-8 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center">
                    <GraduationCap className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-foreground">
                    {report.teachers.endOfPeriod}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">giáo viên cuối kỳ</span>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-2 text-xs space-y-2 border-t mt-1 bg-muted/20">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Tuyển mới / Nghỉ:</span>
                  <span className="font-semibold text-foreground">
                    <span className="text-emerald-600">+{report.teachers.newlyRecruited}</span> / <span className="text-rose-600">-{report.teachers.resigned}</span>
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Buổi học tổ chức:</span>
                  <span className="font-semibold text-foreground">{report.academic.totalSessions}</span>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-dashed">
                  <span className="text-muted-foreground font-medium">Tỷ lệ chuyên cần:</span>
                  <Badge className="text-[10px] font-bold bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 border-purple-200">
                    {report.academic.attendanceRate}%
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 3. Detailed Data Tables (2 Columns) */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Table 1: Phân tích Nguồn Tuyển sinh */}
            <Card className="border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden">
              <CardHeader className="p-4 pb-3 border-b bg-muted/40 flex flex-row items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-md bg-blue-500/10 text-blue-600">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-bold text-foreground">
                      Hiệu quả theo Nguồn Tuyển sinh
                    </CardTitle>
                    <p className="text-[11px] text-muted-foreground">Bóc tách lượng lead và tỷ lệ chốt đăng ký</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-[11px] font-semibold bg-background">
                  Tổng: {report.admissions.newLeads} leads
                </Badge>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-muted/20">
                    <TableRow className="text-xs hover:bg-transparent">
                      <TableHead className="py-2.5 font-semibold text-foreground">Nguồn tiếp cận</TableHead>
                      <TableHead className="py-2.5 text-right font-semibold text-foreground">Số Leads</TableHead>
                      <TableHead className="py-2.5 text-right font-semibold text-foreground">Đã nhập học</TableHead>
                      <TableHead className="py-2.5 text-right font-semibold text-foreground">Chuyển đổi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {report.admissions.bySource.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8 text-xs text-muted-foreground">
                          Chưa có dữ liệu nguồn tuyển sinh trong kỳ này.
                        </TableCell>
                      </TableRow>
                    ) : (
                      report.admissions.bySource.map((s, idx) => (
                        <TableRow key={s.source} className={`text-xs hover:bg-muted/40 transition-colors ${idx % 2 === 1 ? 'bg-muted/10' : ''}`}>
                          <TableCell className="font-medium py-3 text-foreground">{s.source}</TableCell>
                          <TableCell className="text-right py-3 font-medium text-muted-foreground">{s.leads}</TableCell>
                          <TableCell className="text-right py-3 font-bold text-emerald-600">
                            {s.enrolled}
                          </TableCell>
                          <TableCell className="text-right py-3">
                            <div className="flex items-center justify-end gap-2">
                              <div className="w-12 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden hidden sm:block">
                                <div
                                  className="h-full bg-emerald-500 rounded-full"
                                  style={{ width: `${Math.min(s.conversionRate, 100)}%` }}
                                />
                              </div>
                              <Badge
                                variant="outline"
                                className={`text-[10px] font-bold ${
                                  s.conversionRate > 0
                                    ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300"
                                    : "bg-muted text-muted-foreground"
                                }`}
                              >
                                {s.conversionRate}%
                              </Badge>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Table 2: Bóc tách theo Cơ sở */}
            <Card className="border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden">
              <CardHeader className="p-4 pb-3 border-b bg-muted/40 flex flex-row items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-md bg-primary/10 text-primary">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-bold text-foreground">
                      Quy mô & Lấp đầy theo Cơ sở
                    </CardTitle>
                    <p className="text-[11px] text-muted-foreground">Tình hình phân bổ phòng học, lớp và học viên</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-[11px] font-semibold bg-background">
                  {report.branches.length} cơ sở
                </Badge>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-muted/20">
                    <TableRow className="text-xs hover:bg-transparent">
                      <TableHead className="py-2.5 font-semibold text-foreground">Cơ sở</TableHead>
                      <TableHead className="py-2.5 text-right font-semibold text-foreground">Phòng học</TableHead>
                      <TableHead className="py-2.5 text-right font-semibold text-foreground">Lớp tổ chức</TableHead>
                      <TableHead className="py-2.5 text-right font-semibold text-foreground">Học viên</TableHead>
                      <TableHead className="py-2.5 text-right font-semibold text-foreground">Tỷ lệ lấp đầy</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {report.branches.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-xs text-muted-foreground">
                          Chưa có dữ liệu cơ sở.
                        </TableCell>
                      </TableRow>
                    ) : (
                      report.branches.map((b, idx) => (
                        <TableRow key={b.id} className={`text-xs hover:bg-muted/40 transition-colors ${idx % 2 === 1 ? 'bg-muted/10' : ''}`}>
                          <TableCell className="py-3">
                            <div className="font-semibold text-foreground">{b.name}</div>
                            <div className="text-[10px] text-muted-foreground">{b.code}</div>
                          </TableCell>
                          <TableCell className="text-right py-3 text-muted-foreground">{b.roomsCount}</TableCell>
                          <TableCell className="text-right py-3 font-semibold text-foreground">{b.classesCount}</TableCell>
                          <TableCell className="text-right py-3 font-bold text-primary">
                            {b.studentsCount}
                          </TableCell>
                          <TableCell className="text-right py-3">
                            <div className="flex items-center justify-end gap-2">
                              <div className="w-12 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden hidden sm:block">
                                <div
                                  className={`h-full rounded-full ${
                                    b.fillRate >= 70
                                      ? "bg-emerald-500"
                                      : b.fillRate >= 40
                                      ? "bg-blue-500"
                                      : "bg-slate-400"
                                  }`}
                                  style={{ width: `${Math.min(b.fillRate, 100)}%` }}
                                />
                              </div>
                              <Badge
                                variant="outline"
                                className={`text-[10px] font-bold ${
                                  b.fillRate >= 70
                                    ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300"
                                    : b.fillRate >= 40
                                    ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300"
                                    : "bg-muted text-muted-foreground"
                                }`}
                              >
                                {b.fillRate}%
                              </Badge>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            {/* Table 3: Bóc tách Hiệu quả theo Nhân viên Tư vấn (Staff Performance) */}
            {report.admissions.byStaff && report.admissions.byStaff.length > 0 && (
              <Card className="border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden lg:col-span-2">
                <CardHeader className="p-4 pb-3 border-b bg-muted/40 flex flex-row items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-md bg-indigo-500/10 text-indigo-600">
                      <UserCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-bold text-foreground">
                        Hiệu quả Tư vấn theo Nhân viên (Staff / CRM Performance)
                      </CardTitle>
                      <p className="text-[11px] text-muted-foreground">
                        Thống kê số lượng leads được phân bổ và tỷ lệ chốt học viên theo từng tư vấn viên
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-[11px] font-semibold bg-background">
                    {report.admissions.byStaff.length} người phụ trách
                  </Badge>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader className="bg-muted/20">
                      <TableRow className="text-xs hover:bg-transparent">
                        <TableHead className="py-2.5 font-semibold text-foreground">Người phụ trách</TableHead>
                        <TableHead className="py-2.5 text-right font-semibold text-foreground">Leads tiếp nhận</TableHead>
                        <TableHead className="py-2.5 text-right font-semibold text-foreground">Chốt nhập học</TableHead>
                        <TableHead className="py-2.5 text-right font-semibold text-foreground">Tỷ lệ chốt</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {report.admissions.byStaff.map((staff, idx) => (
                        <TableRow
                          key={staff.staffId}
                          className={`text-xs hover:bg-muted/40 transition-colors ${idx % 2 === 1 ? 'bg-muted/10' : ''}`}
                        >
                          <TableCell className="py-3 font-medium text-foreground flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-indigo-600/10 text-indigo-600 text-[10px] flex items-center justify-center font-bold shrink-0">
                              {staff.staffName.charAt(0)}
                            </div>
                            <div>
                              <div className="font-semibold">{staff.staffName}</div>
                              {staff.email && <div className="text-[10px] text-muted-foreground">{staff.email}</div>}
                            </div>
                          </TableCell>
                          <TableCell className="text-right py-3 font-medium text-muted-foreground">
                            {staff.leads}
                          </TableCell>
                          <TableCell className="text-right py-3 font-bold text-emerald-600">
                            {staff.enrolled}
                          </TableCell>
                          <TableCell className="text-right py-3">
                            <div className="flex items-center justify-end gap-2">
                              <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden hidden sm:block">
                                <div
                                  className="h-full bg-indigo-500 rounded-full"
                                  style={{ width: `${Math.min(staff.conversionRate, 100)}%` }}
                                />
                              </div>
                              <Badge
                                variant="outline"
                                className={`text-[10px] font-bold ${
                                  staff.conversionRate > 0
                                    ? "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-300"
                                    : "bg-muted text-muted-foreground"
                                }`}
                              >
                                {staff.conversionRate}%
                              </Badge>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

