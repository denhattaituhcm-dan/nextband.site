import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  DialogDescription,
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
} from "@/components/ui/select";
import {
  DollarSign,
  CreditCard,
  AlertCircle,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  RefreshCw,
  Loader2,
  Users,
  School,
  Edit,
  Phone,
  Mail,
  Receipt,
  FileSpreadsheet,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { tuitionApi } from "@/lib/api";
import { useBranch } from "@/contexts/BranchContext";

export default function TuitionManagement() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { selectedBranch } = useBranch();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  // Form states for modal
  const [formTuitionFee, setFormTuitionFee] = useState<number>(0);
  const [formPaidAmount, setFormPaidAmount] = useState<number>(0);
  const [formPaymentStatus, setFormPaymentStatus] = useState<string>("UNPAID");
  const [formPaymentNote, setFormPaymentNote] = useState<string>("");
  const [formExternalRef, setFormExternalRef] = useState<string>("");

  // Fetch tuition summary
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["tuition-summary", selectedBranch],
    queryFn: () => tuitionApi.getSummary({ branchId: selectedBranch }),
  });

  // Mutation to update student tuition
  const updateMutation = useMutation({
    mutationFn: async ({ classStudentId, payload }: { classStudentId: string; payload: any }) => {
      return tuitionApi.updateStudentTuition(classStudentId, payload);
    },
    onSuccess: () => {
      toast({
        title: "Thành công",
        description: "Đã cập nhật thông tin học phí của học viên.",
      });
      setEditModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["tuition-summary"] });
      queryClient.invalidateQueries({ queryKey: ["students-management"] });
    },
    onError: (err: any) => {
      toast({
        title: "Lỗi",
        description: err?.message || "Không thể cập nhật học phí.",
        variant: "destructive",
      });
    },
  });

  const handleOpenEdit = (record: any) => {
    setSelectedStudent(record);
    setFormTuitionFee(record.tuitionFee || 0);
    setFormPaidAmount(record.paidAmount || 0);
    setFormPaymentStatus(record.paymentStatus || "UNPAID");
    setFormPaymentNote(record.paymentNote || "");
    setFormExternalRef(record.externalRef || "");
    setEditModalOpen(true);
  };

  const handleSaveTuition = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent) return;

    updateMutation.mutate({
      classStudentId: selectedStudent.id,
      payload: {
        tuitionFee: Number(formTuitionFee),
        paidAmount: Number(formPaidAmount),
        paymentStatus: formPaymentStatus,
        paymentNote: formPaymentNote.trim() || null,
        externalRef: formExternalRef.trim() || null,
      },
    });
  };

  const kpis = data?.kpis || {
    totalExpectedTuition: 0,
    totalCollectedTuition: 0,
    totalOutstandingTuition: 0,
    collectionRate: 100,
    fullyPaidCount: 0,
    partialPaidCount: 0,
    unpaidCount: 0,
  };

  const receivables = (data?.outstandingReceivables || []).filter((r: any) => {
    const matchesSearch =
      search === "" ||
      r.studentName?.toLowerCase().includes(search.toLowerCase()) ||
      r.studentPhone?.includes(search) ||
      r.className?.toLowerCase().includes(search.toLowerCase()) ||
      r.externalRef?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" ||
      (statusFilter === "UNPAID" && r.paymentStatus === "UNPAID") ||
      (statusFilter === "PARTIAL" && r.paymentStatus === "PARTIAL") ||
      (statusFilter === "PAID" && r.paymentStatus === "PAID");

    return matchesSearch && matchesStatus;
  });

  const classBreakdown = data?.classBreakdown || [];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-primary" />
            Học phí & Quản lý Công nợ
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Tổng quan tài chính học vụ, theo dõi tiến độ thu phí và nhắc hẹn học viên còn công nợ.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => refetch()} className="gap-1.5">
            <RefreshCw className="h-4 w-4" />
            Làm mới
          </Button>
        </div>
      </div>

      {/* 1. KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Expected */}
        <Card className="border-border/60 shadow-sm bg-gradient-to-br from-card to-muted/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">
              Tổng học phí dự kiến
            </CardTitle>
            <div className="p-2 bg-blue-100 dark:bg-blue-950/50 rounded-full text-blue-700 dark:text-blue-300">
              <DollarSign className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground font-mono">
              {Number(kpis.totalExpectedTuition).toLocaleString("vi-VN")} đ
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Tính trên {kpis.totalStudentsCount || 0} lượt học viên đang theo học
            </p>
          </CardContent>
        </Card>

        {/* Total Collected */}
        <Card className="border-border/60 shadow-sm bg-gradient-to-br from-card to-emerald-50/20 dark:to-emerald-950/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-emerald-800 dark:text-emerald-400">
              Đã thu thực tế
            </CardTitle>
            <div className="p-2 bg-emerald-100 dark:bg-emerald-950/50 rounded-full text-emerald-700 dark:text-emerald-300">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 font-mono">
              {Number(kpis.totalCollectedTuition).toLocaleString("vi-VN")} đ
            </div>
            <p className="text-xs text-emerald-600/80 mt-1 flex items-center gap-1 font-medium">
              Đạt {kpis.collectionRate}% mục tiêu ({kpis.fullyPaidCount} bạn đóng đủ)
            </p>
          </CardContent>
        </Card>

        {/* Total Outstanding */}
        <Card className="border-border/60 shadow-sm bg-gradient-to-br from-card to-amber-50/30 dark:to-amber-950/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-amber-800 dark:text-amber-400">
              Công nợ còn tồn
            </CardTitle>
            <div className="p-2 bg-amber-100 dark:bg-amber-950/50 rounded-full text-amber-700 dark:text-amber-300">
              <Clock className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-700 dark:text-amber-400 font-mono">
              {Number(kpis.totalOutstandingTuition).toLocaleString("vi-VN")} đ
            </div>
            <p className="text-xs text-amber-700/80 mt-1">
              Cần thu từ {kpis.partialPaidCount + kpis.unpaidCount} học viên
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 2. OUTSTANDING RECEIVABLES TABLE */}
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="pb-3 border-b border-border/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                Danh sách học viên còn công nợ & Đang thu phí
              </CardTitle>
              <CardDescription>
                Theo dõi các khoản chưa hoàn tất, ghi chú hẹn ngày đóng và cập nhật tiến độ thanh toán.
              </CardDescription>
            </div>
            {/* Search & Filter */}
            <div className="flex items-center gap-2">
              <div className="relative w-48 sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm học viên, SĐT, lớp..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 text-xs h-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36 text-xs h-9">
                  <Filter className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">Tất cả ({receivables.length})</SelectItem>
                  <SelectItem value="PARTIAL">Đóng một phần</SelectItem>
                  <SelectItem value="UNPAID">Chưa đóng</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="font-semibold">Học viên</TableHead>
                <TableHead className="font-semibold">Lớp & Khóa</TableHead>
                <TableHead className="font-semibold text-right">Học phí</TableHead>
                <TableHead className="font-semibold text-right">Đã nộp</TableHead>
                <TableHead className="font-semibold text-right text-amber-700">Còn nợ</TableHead>
                <TableHead className="font-semibold text-center">Trạng thái</TableHead>
                <TableHead className="font-semibold">Ghi chú / Hẹn ngày</TableHead>
                <TableHead className="w-20 text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-32 text-center">
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                      Đang tải danh sách công nợ...
                    </div>
                  </TableCell>
                </TableRow>
              ) : receivables.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-32 text-center text-muted-foreground">
                    <div className="flex flex-col items-center justify-center gap-1.5 py-4">
                      <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                      <p className="font-medium text-sm text-foreground">Không có công nợ tồn đọng</p>
                      <p className="text-xs">Tất cả học viên trong bộ lọc đã hoàn tất học phí.</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                receivables.map((r: any) => (
                  <TableRow key={r.id} className="hover:bg-muted/30 transition-colors">
                    {/* Student info */}
                    <TableCell>
                      <div className="font-semibold text-sm text-foreground">{r.studentName}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                        {r.studentPhone && (
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" /> {r.studentPhone}
                          </span>
                        )}
                        {r.externalRef && (
                          <Badge variant="outline" className="text-[10px] px-1 py-0 font-mono">
                            {r.externalRef}
                          </Badge>
                        )}
                      </div>
                    </TableCell>

                    {/* Class & Course */}
                    <TableCell>
                      <div className="font-medium text-xs text-foreground">{r.className}</div>
                      <div className="text-[11px] text-muted-foreground">{r.courseTitle}</div>
                    </TableCell>

                    {/* Tuition Fee */}
                    <TableCell className="text-right text-xs font-mono font-medium">
                      {Number(r.tuitionFee).toLocaleString("vi-VN")} đ
                    </TableCell>

                    {/* Paid Amount */}
                    <TableCell className="text-right text-xs font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
                      {Number(r.paidAmount).toLocaleString("vi-VN")} đ
                    </TableCell>

                    {/* Outstanding Amount */}
                    <TableCell className="text-right text-xs font-mono text-amber-700 dark:text-amber-400 font-bold">
                      {Number(r.outstandingAmount).toLocaleString("vi-VN")} đ
                    </TableCell>

                    {/* Payment Status */}
                    <TableCell className="text-center">
                      {r.paymentStatus === "PAID" ? (
                        <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-0 text-[11px]">
                          Đã đóng đủ
                        </Badge>
                      ) : r.paymentStatus === "PARTIAL" ? (
                        <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-0 text-[11px]">
                          Đóng một phần
                        </Badge>
                      ) : r.paymentStatus === "WAIVED" ? (
                        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-0 text-[11px]">
                          Miễn phí
                        </Badge>
                      ) : (
                        <Badge variant="destructive" className="text-[11px]">
                          Chưa đóng
                        </Badge>
                      )}
                    </TableCell>

                    {/* Payment Note */}
                    <TableCell className="text-xs text-muted-foreground max-w-xs truncate">
                      {r.paymentNote || <span className="italic text-muted-foreground/50">Không có ghi chú</span>}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenEdit(r)}
                        className="h-8 gap-1 text-xs"
                      >
                        <Edit className="h-3.5 w-3.5" />
                        Cập nhật
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 3. CLASS FINANCIAL BREAKDOWN */}
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="pb-3 border-b border-border/40">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <School className="h-4 w-4 text-primary" />
            Tổng hợp Học phí theo Lớp học
          </CardTitle>
          <CardDescription>
            Theo dõi tỷ lệ thu học phí và đánh giá hiệu quả kinh tế trên từng lớp.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="font-semibold">Lớp học</TableHead>
                <TableHead className="font-semibold">Khóa học & GV</TableHead>
                <TableHead className="font-semibold text-center">Sĩ số</TableHead>
                <TableHead className="font-semibold text-right">Tổng dự thu</TableHead>
                <TableHead className="font-semibold text-right text-emerald-700">Đã thu</TableHead>
                <TableHead className="font-semibold text-right text-amber-700">Còn nợ</TableHead>
                <TableHead className="font-semibold text-center">Tỷ lệ thu</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classBreakdown.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-muted-foreground text-sm">
                    Chưa có dữ liệu lớp học
                  </TableCell>
                </TableRow>
              ) : (
                classBreakdown.map((c: any) => (
                  <TableRow key={c.classId} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-semibold text-sm">{c.className}</TableCell>
                    <TableCell>
                      <div className="text-xs font-medium">{c.courseTitle}</div>
                      <div className="text-[11px] text-muted-foreground">GV: {c.teacherName}</div>
                    </TableCell>
                    <TableCell className="text-center text-xs font-mono">
                      {c.totalStudents} HV
                    </TableCell>
                    <TableCell className="text-right text-xs font-mono">
                      {Number(c.totalExpected).toLocaleString("vi-VN")} đ
                    </TableCell>
                    <TableCell className="text-right text-xs font-mono font-semibold text-emerald-700">
                      {Number(c.totalCollected).toLocaleString("vi-VN")} đ
                    </TableCell>
                    <TableCell className="text-right text-xs font-mono font-semibold text-amber-700">
                      {Number(c.totalOutstanding).toLocaleString("vi-VN")} đ
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="inline-flex items-center gap-1.5">
                        <div className="w-16 bg-muted rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-emerald-600 h-full rounded-full"
                            style={{ width: `${Math.min(100, c.collectionRate)}%` }}
                          />
                        </div>
                        <span className="text-xs font-mono font-medium">{c.collectionRate}%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* MODAL CẬP NHẬT HỌC PHÍ HỌC VIÊN */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Cập nhật học phí học viên</DialogTitle>
            <DialogDescription>
              {selectedStudent?.studentName} — Lớp {selectedStudent?.className}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveTuition} className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Học phí thỏa thuận (đ)
                </label>
                <Input
                  type="number"
                  min="0"
                  step="50000"
                  value={formTuitionFee}
                  onChange={(e) => setFormTuitionFee(Number(e.target.value))}
                  required
                />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Số tiền đã đóng (đ)
                </label>
                <Input
                  type="number"
                  min="0"
                  step="50000"
                  value={formPaidAmount}
                  onChange={(e) => setFormPaidAmount(Number(e.target.value))}
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-foreground block mb-1">
                Trạng thái thanh toán
              </label>
              <Select value={formPaymentStatus} onValueChange={setFormPaymentStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UNPAID">Chưa đóng (UNPAID)</SelectItem>
                  <SelectItem value="PARTIAL">Đóng một phần (PARTIAL)</SelectItem>
                  <SelectItem value="PAID">Đã đóng đủ (PAID)</SelectItem>
                  <SelectItem value="WAIVED">Miễn phí / Học bổng (WAIVED)</SelectItem>
                  <SelectItem value="REFUNDED">Đã hoàn tiền (REFUNDED)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs font-medium text-foreground block mb-1">
                Mã chứng từ / Biên lai ngoài
              </label>
              <Input
                placeholder="VD: PT-2026-088, CK VCB 123..."
                value={formExternalRef}
                onChange={(e) => setFormExternalRef(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs font-medium text-foreground block mb-1">
                Ghi chú thu tiền / Hẹn ngày đóng nốt
              </label>
              <Input
                placeholder="VD: Đã đóng đợt 1, hẹn nộp 2tr ngày 15/09..."
                value={formPaymentNote}
                onChange={(e) => setFormPaymentNote(e.target.value)}
              />
            </div>

            <DialogFooter className="pt-3">
              <Button type="button" variant="outline" onClick={() => setEditModalOpen(false)}>
                Hủy
              </Button>
              <Button type="submit" disabled={updateMutation.isPending}>
                {updateMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Lưu thông tin
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
