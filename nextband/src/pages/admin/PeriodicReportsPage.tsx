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
    <div className="space-y-6 max-w-7xl mx-auto print:p-0 print:space-y-4">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">Báo cáo & Tổng kết Hoạt động</h1>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs font-semibold">
              Định kỳ
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Tổng kết dữ liệu toàn diện theo Tháng, Quý hoặc Năm phục vụ công tác viết báo cáo và hoạch định.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="text-xs h-9 gap-1.5"
          >
            <Printer className="h-4 w-4" />
            In báo cáo
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={handleCopySummary}
            disabled={!report || isLoading}
            className="text-xs h-9 gap-1.5 shadow-sm bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-300" /> : <Copy className="h-4 w-4" />}
            {copied ? "Đã sao chép Word" : "Sao chép tóm tắt Word"}
          </Button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <Card className="bg-card/80 border shadow-sm print:hidden">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Period Type Selector */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Chu kỳ tổng kết
              </label>
              <div className="flex rounded-lg border bg-muted/40 p-0.5">
                {(["YEAR", "QUARTER", "MONTH", "CUSTOM"] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setPeriodType(type)}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                      periodType === type
                        ? "bg-background text-foreground shadow-sm font-semibold"
                        : "text-muted-foreground hover:text-foreground"
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
                <div className="space-y-1 min-w-[120px]">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Năm
                  </label>
                  <Select
                    value={String(selectedYear)}
                    onValueChange={(val) => setSelectedYear(Number(val))}
                  >
                    <SelectTrigger className="h-8 text-xs">
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
                  <div className="space-y-1 min-w-[120px]">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Quý
                    </label>
                    <Select
                      value={String(selectedQuarter)}
                      onValueChange={(val) => setSelectedQuarter(Number(val))}
                    >
                      <SelectTrigger className="h-8 text-xs">
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
                  <div className="space-y-1 min-w-[120px]">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Tháng
                    </label>
                    <Select
                      value={String(selectedMonth)}
                      onValueChange={(val) => setSelectedMonth(Number(val))}
                    >
                      <SelectTrigger className="h-8 text-xs">
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

            {/* If CUSTOM: Date Pickers (Từ ngày ... Đến ngày ...) */}
            {periodType === "CUSTOM" && (
              <div className="flex flex-wrap items-center gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Từ ngày
                  </label>
                  <input
                    type="date"
                    value={customStartDate}
                    onChange={(e) => setCustomStartDate(e.target.value)}
                    className="h-8 text-xs px-2.5 py-1 rounded-md border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Đến ngày
                  </label>
                  <input
                    type="date"
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e.target.value)}
                    className="h-8 text-xs px-2.5 py-1 rounded-md border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                {/* Presets */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Phím tắt nhanh
                  </label>
                  <div className="flex items-center gap-1.5 pt-0.5">
                    <button
                      type="button"
                      onClick={() => {
                        const now = new Date();
                        const curYear = now.getFullYear();
                        // School year: 01/09 last year to 31/08 this year
                        const syStart = now.getMonth() >= 8 ? `${curYear}-09-01` : `${curYear - 1}-09-01`;
                        const syEnd = now.getMonth() >= 8 ? `${curYear + 1}-08-31` : `${curYear}-08-31`;
                        setCustomStartDate(syStart);
                        setCustomEndDate(syEnd);
                      }}
                      className="px-2 py-1 text-[11px] rounded bg-muted/60 hover:bg-muted font-medium text-foreground transition-colors"
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
                      className="px-2 py-1 text-[11px] rounded bg-muted/60 hover:bg-muted font-medium text-foreground transition-colors"
                    >
                      6 tháng gần đây
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Branch Selector */}
            <div className="space-y-1 min-w-[180px]">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Phạm vi cơ sở
              </label>
              <Select
                value={selectedBranch}
                onValueChange={(val) => setSelectedBranch(val)}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder="Chọn cơ sở" />
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
        <div className="flex flex-col items-center justify-center p-16 space-y-4 border rounded-xl bg-card/50">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground animate-pulse">
            Đang tổng hợp các sự kiện lịch sử của trung tâm...
          </p>
        </div>
      )}

      {/* Error state */}
      {isError && (
        <Card className="border-destructive/30 bg-destructive/5 p-6 text-center">
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
          <Card className="border-primary/20 bg-gradient-to-br from-primary/[0.04] to-card shadow-sm overflow-hidden">
            <CardHeader className="p-4 pb-2 border-b bg-primary/[0.02] flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <CardTitle className="text-sm font-bold tracking-tight">
                  Tóm tắt Điều hành ({report.period.periodLabel})
                </CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopySummary}
                className="h-7 text-xs text-primary hover:bg-primary/10 gap-1.5 print:hidden"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Đã chép" : "Sao chép"}
              </Button>
            </CardHeader>
            <CardContent className="p-4">
              <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm leading-relaxed text-foreground/90 bg-card/60 p-4 rounded-lg border">
                {report.summaryText}
              </pre>
            </CardContent>
          </Card>

          {/* 2. Four Key Indicator Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Card 1: Tuyển sinh */}
            <Card className="border shadow-sm hover:border-primary/40 transition-colors">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
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
                  <span className="text-xs text-muted-foreground">học viên chốt</span>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-1 text-xs space-y-1.5 border-t mt-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Leads mới:</span>
                  <span className="font-semibold">{report.admissions.newLeads}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Lượt test đầu vào:</span>
                  <span className="font-semibold">{report.admissions.placementTests}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tỷ lệ chuyển đổi:</span>
                  <Badge variant="secondary" className="text-[10px] font-bold bg-blue-50 text-blue-700">
                    {report.admissions.conversionRate}%
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Card 2: Học viên */}
            <Card className="border shadow-sm hover:border-primary/40 transition-colors">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
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
                  <span className="text-xs text-muted-foreground">đang học cuối kỳ</span>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-1 text-xs space-y-1.5 border-t mt-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Đăng ký mới:</span>
                  <span className="font-semibold">{report.students.newEnrollments}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Hoàn thành khóa:</span>
                  <span className="font-semibold text-emerald-600">{report.students.graduated}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bảo lưu / Thôi học:</span>
                  <span className="text-muted-foreground">
                    {report.students.reserved} BL • {report.students.dropped} TH
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Card 3: Lớp học */}
            <Card className="border shadow-sm hover:border-primary/40 transition-colors">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
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
                  <span className="text-xs text-muted-foreground">lớp mở mới</span>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-1 text-xs space-y-1.5 border-t mt-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Lớp hoàn thành:</span>
                  <span className="font-semibold">{report.classes.completed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Đang chạy cuối kỳ:</span>
                  <span className="font-semibold">{report.classes.runningAtEnd}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sĩ số trung bình:</span>
                  <Badge variant="secondary" className="text-[10px] font-bold bg-amber-50 text-amber-700">
                    {report.classes.avgClassSize} hv/lớp
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Card 4: Giáo viên & Đào tạo */}
            <Card className="border shadow-sm hover:border-primary/40 transition-colors">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
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
                  <span className="text-xs text-muted-foreground">giáo viên cuối kỳ</span>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-1 text-xs space-y-1.5 border-t mt-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tuyển mới / Nghỉ:</span>
                  <span className="font-semibold">
                    +{report.teachers.newlyRecruited} / -{report.teachers.resigned}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Buổi học tổ chức:</span>
                  <span className="font-semibold">{report.academic.totalSessions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tỷ lệ chuyên cần:</span>
                  <Badge variant="secondary" className="text-[10px] font-bold bg-purple-50 text-purple-700">
                    {report.academic.attendanceRate}%
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 3. Detailed Data Tables (2 Columns) */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Table 1: Phân tích Nguồn Tuyển sinh */}
            <Card className="border shadow-sm">
              <CardHeader className="p-4 pb-2 border-b bg-muted/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                    <CardTitle className="text-sm font-bold">
                      Hiệu quả theo Nguồn Tuyển sinh
                    </CardTitle>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Tổng: {report.admissions.newLeads} leads
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="text-xs">
                      <TableHead className="py-2.5">Nguồn tiếp cận</TableHead>
                      <TableHead className="py-2.5 text-right">Số Leads</TableHead>
                      <TableHead className="py-2.5 text-right">Đã nhập học</TableHead>
                      <TableHead className="py-2.5 text-right">Chuyển đổi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {report.admissions.bySource.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-6 text-xs text-muted-foreground">
                          Chưa có dữ liệu nguồn tuyển sinh trong kỳ này.
                        </TableCell>
                      </TableRow>
                    ) : (
                      report.admissions.bySource.map((s) => (
                        <TableRow key={s.source} className="text-xs">
                          <TableCell className="font-medium py-2.5">{s.source}</TableCell>
                          <TableCell className="text-right py-2.5">{s.leads}</TableCell>
                          <TableCell className="text-right py-2.5 font-semibold text-emerald-600">
                            {s.enrolled}
                          </TableCell>
                          <TableCell className="text-right py-2.5">
                            <Badge variant="outline" className="text-[10px] font-semibold">
                              {s.conversionRate}%
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Table 2: Bóc tách theo Cơ sở */}
            <Card className="border shadow-sm">
              <CardHeader className="p-4 pb-2 border-b bg-muted/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-primary" />
                    <CardTitle className="text-sm font-bold">
                      Quy mô & Lấp đầy theo Cơ sở
                    </CardTitle>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {report.branches.length} chi nhánh
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="text-xs">
                      <TableHead className="py-2.5">Cơ sở</TableHead>
                      <TableHead className="py-2.5 text-right">Phòng học</TableHead>
                      <TableHead className="py-2.5 text-right">Lớp tổ chức</TableHead>
                      <TableHead className="py-2.5 text-right">Học viên</TableHead>
                      <TableHead className="py-2.5 text-right">Lấp đầy</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {report.branches.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6 text-xs text-muted-foreground">
                          Chưa có dữ liệu cơ sở.
                        </TableCell>
                      </TableRow>
                    ) : (
                      report.branches.map((b) => (
                        <TableRow key={b.id} className="text-xs">
                          <TableCell className="py-2.5">
                            <div className="font-semibold text-foreground">{b.name}</div>
                            <div className="text-[10px] text-muted-foreground">{b.code}</div>
                          </TableCell>
                          <TableCell className="text-right py-2.5">{b.roomsCount}</TableCell>
                          <TableCell className="text-right py-2.5 font-medium">{b.classesCount}</TableCell>
                          <TableCell className="text-right py-2.5 font-semibold text-primary">
                            {b.studentsCount}
                          </TableCell>
                          <TableCell className="text-right py-2.5">
                            <Badge
                              variant="outline"
                              className={`text-[10px] font-semibold ${
                                b.fillRate >= 70
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                  : b.fillRate >= 40
                                  ? "bg-blue-50 text-blue-700 border-blue-200"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {b.fillRate}%
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
