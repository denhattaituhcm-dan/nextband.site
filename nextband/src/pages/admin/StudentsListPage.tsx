import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { usersApi, classesApi } from "@/lib/api";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Search,
  BookMarked,
  GraduationCap,
  Clock,
  Phone,
  ArrowRight,
  Loader2,
  TrendingUp,
  RefreshCw,
} from "lucide-react";
import { DataTablePagination } from "@/components/admin/DataTablePagination";

export default function StudentsListPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [selectedClassId, setSelectedClassId] = useState(searchParams.get("classId") || "all");
  const [selectedStatus, setSelectedStatus] = useState(searchParams.get("status") || "all");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const pageSize = 12;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    const nextParams = new URLSearchParams();
    if (debouncedSearch) nextParams.set("search", debouncedSearch);
    if (selectedClassId !== "all") nextParams.set("classId", selectedClassId);
    if (selectedStatus !== "all") nextParams.set("status", selectedStatus);
    if (page > 1) nextParams.set("page", String(page));
    setSearchParams(nextParams, { replace: true });
  }, [debouncedSearch, selectedClassId, selectedStatus, page, setSearchParams]);

  const { data: classesData } = useQuery({
    queryKey: ["active-classes-students-list"],
    queryFn: () => classesApi.list({ isActive: true, limit: 100 }),
    staleTime: 1000 * 60 * 5,
  });
  const classesList = (classesData?.data || []) as any[];

  const { data, isLoading, refetch } = useQuery({
    queryKey: [
      "students-strategic-list",
      debouncedSearch,
      selectedClassId === "all" ? undefined : selectedClassId,
      selectedStatus === "all" ? undefined : selectedStatus,
      page,
      pageSize,
    ],
    queryFn: () =>
      usersApi.getStudentManagement({
        page,
        limit: pageSize,
        search: debouncedSearch || undefined,
        classId: selectedClassId === "all" ? undefined : selectedClassId,
        status: selectedStatus === "all" ? undefined : selectedStatus,
      }),
    staleTime: 1000 * 60 * 2,
  });

  const rawStudents = (data as any)?.data || [];
  const total = (data as any)?.meta?.total ?? rawStudents.length;
  const totalPages = (data as any)?.meta?.totalPages ?? Math.ceil(total / pageSize) ?? 1;

  const renderHealthIndicator = (score: number | null) => {
    if (score === null || score === undefined) {
      return (
        <Badge variant="outline" className="bg-slate-50 text-slate-500 border-slate-200 text-xs">
          ⚪ Chưa đánh giá
        </Badge>
      );
    }

    if (score >= 80) {
      return (
        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-300 font-semibold text-xs gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
          🟢 Tốt ({score}/100)
        </Badge>
      );
    }
    if (score >= 55) {
      return (
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-300 font-semibold text-xs gap-1">
          <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
          🟡 Chú ý ({score}/100)
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-300 font-semibold text-xs gap-1">
        <span className="w-2 h-2 rounded-full bg-rose-500 inline-block animate-ping" />
        🔴 Nguy cơ ({score}/100)
      </Badge>
    );
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <BookMarked className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                Hồ sơ Chiến lược Học viên
                <Badge variant="secondary" className="text-xs font-normal">
                  {total} học viên
                </Badge>
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                Academic Strategic Memory &mdash; Nắm rõ tiến trình, điểm nghẽn học thuật và lịch sử can thiệp của từng học viên
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            className="h-9 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Làm mới
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/admin/reports")}
            className="h-9 gap-1.5 text-xs"
          >
            <TrendingUp className="h-3.5 w-3.5 text-primary" />
            Báo cáo định kỳ
          </Button>
        </div>
      </div>

      <Card className="border-border/60 shadow-xs">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm học viên theo tên, email, SĐT phụ huynh..."
                className="pl-9 h-9 text-xs"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div>
              <Select value={selectedClassId} onValueChange={(val) => { setSelectedClassId(val); setPage(1); }}>
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue placeholder="Lọc theo lớp học" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả lớp học</SelectItem>
                  {classesList.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name} {c.course?.title ? `(${c.course.title})` : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select value={selectedStatus} onValueChange={(val) => { setSelectedStatus(val); setPage(1); }}>
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue placeholder="Tình trạng học tập" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="active">🟢 Đang học bình thường</SelectItem>
                  <SelectItem value="at-risk">🔴 Cần chú ý / Nguy cơ (Risk)</SelectItem>
                  <SelectItem value="suspended">⏸️ Đang bảo lưu</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="border rounded-xl bg-card shadow-xs overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead className="font-semibold text-xs">Học viên & Phụ huynh</TableHead>
              <TableHead className="font-semibold text-xs">Lớp & Giáo viên</TableHead>
              <TableHead className="font-semibold text-xs text-center">Đầu vào ➔ Mục tiêu</TableHead>
              <TableHead className="font-semibold text-xs text-center">BTVN (Nộp/Giao)</TableHead>
              <TableHead className="font-semibold text-xs text-center">Chuyên cần</TableHead>
              <TableHead className="font-semibold text-xs text-center">Sức khỏe Học thuật</TableHead>
              <TableHead className="font-semibold text-xs">Chăm sóc Phụ huynh</TableHead>
              <TableHead className="font-semibold text-xs text-right pr-4">Hồ sơ 360°</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="h-40 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    <span className="text-xs text-muted-foreground">Đang tải hồ sơ chiến lược học viên...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : rawStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-40 text-center text-muted-foreground text-xs">
                  Không tìm thấy học viên nào phù hợp với bộ lọc tìm kiếm.
                </TableCell>
              </TableRow>
            ) : (
              rawStudents.map((st: any) => {
                const effectiveId = st.id || st.userId;
                const baseline = st.diagnosticBaseline;
                const inputBand = baseline?.estimatedBand || "Chưa test";
                const targetBand = baseline?.targetBand || (st.convertedLead?.goal ? `Target: ${st.convertedLead.goal}` : "6.5");
                const currentClass = st.classes?.[0];
                const teacherName = currentClass?.teacherName || "Chưa phân GV";
                const parentName = st.parentName || st.convertedLead?.fullName || "Chưa có tên PH";
                const parentPhone = st.parentPhone || st.convertedLead?.phone || st.phone;

                return (
                  <TableRow
                    key={effectiveId}
                    className="cursor-pointer hover:bg-muted/30 transition-colors group"
                    onClick={() => navigate(`/admin/students/${effectiveId}`)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-border">
                          <AvatarImage src={st.avatarUrl} />
                          <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                            {st.fullName ? st.fullName.substring(0, 2).toUpperCase() : "HV"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-bold text-sm text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                            {st.fullName || "Học viên"}
                            {st.isReserved && (
                              <Badge variant="outline" className="text-[10px] px-1.5 py-0 bg-amber-50 text-amber-800 border-amber-300">
                                Bảo lưu
                              </Badge>
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground">{st.email}</p>
                          {parentPhone && (
                            <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                              <Phone className="h-3 w-3 text-emerald-600" />
                              <span className="font-medium text-foreground">{parentName}:</span> {parentPhone}
                            </p>
                          )}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="text-xs">
                      {currentClass ? (
                        <div className="space-y-1">
                          <p className="font-semibold text-foreground">{currentClass.name}</p>
                          <p className="text-muted-foreground flex items-center gap-1">
                            <GraduationCap className="h-3.5 w-3.5 text-primary" />
                            {teacherName}
                          </p>
                          {currentClass.courseTitle && (
                            <Badge variant="secondary" className="text-[10px] font-normal px-1.5 py-0">
                              {currentClass.courseTitle}
                            </Badge>
                          )}
                        </div>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground text-[10px]">
                          ⚪ Chưa xếp lớp
                        </Badge>
                      )}
                    </TableCell>

                    <TableCell className="text-center text-xs">
                      <div className="inline-flex flex-col items-center">
                        <div className="flex items-center gap-1 font-bold text-xs">
                          <span className="text-muted-foreground">{inputBand}</span>
                          <span className="text-primary font-bold">➔</span>
                          <span className="text-primary px-1.5 py-0.5 rounded bg-primary/10">
                            Band {targetBand}
                          </span>
                        </div>
                        {baseline?.levelTitle && (
                          <span className="text-[10px] text-muted-foreground mt-0.5">
                            {baseline.levelTitle}
                          </span>
                        )}
                      </div>
                    </TableCell>

                    <TableCell className="text-center text-xs">
                      {st.homework && st.homework.totalAssignedCount > 0 ? (
                        <div>
                          <p className="font-bold text-foreground">
                            {st.homework.submittedCount}/{st.homework.totalAssignedCount}
                          </p>
                          <Badge
                            variant="outline"
                            className={`text-[10px] px-1.5 py-0 mt-0.5 ${
                              (st.homework.percentage ?? 0) >= 80
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : (st.homework.percentage ?? 0) >= 50
                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                : "bg-rose-50 text-rose-700 border-rose-200"
                            }`}
                          >
                            {st.homework.percentage}% hoàn thành
                          </Badge>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>

                    <TableCell className="text-center text-xs">
                      {st.attendance && st.attendance.percentage != null ? (
                        <div>
                          <p className="font-bold text-foreground">
                            {st.attendance.attendedCount}/{st.attendance.totalSessions} buổi
                          </p>
                          <Badge
                            variant="outline"
                            className={`text-[10px] px-1.5 py-0 mt-0.5 ${
                              st.attendance.percentage >= 85
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : st.attendance.percentage >= 70
                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                : "bg-rose-50 text-rose-700 border-rose-200"
                            }`}
                          >
                            {st.attendance.percentage}% có mặt
                          </Badge>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>

                    <TableCell className="text-center">
                      {renderHealthIndicator(st.academicHealth ?? null)}
                    </TableCell>

                    <TableCell className="text-xs">
                      <div className="space-y-0.5">
                        <p className="font-medium text-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          {st.lastContactDate || (st.lastActivity?.timestamp ? new Date(st.lastActivity.timestamp).toLocaleDateString("vi-VN") : "Chưa liên hệ")}
                        </p>
                        <p className="text-[11px] text-muted-foreground truncate max-w-[160px]">
                          {st.convertedLead?.notes || "Theo dõi định kỳ"}
                        </p>
                      </div>
                    </TableCell>

                    <TableCell className="text-right pr-4" onClick={(e) => e.stopPropagation()}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 gap-1 text-xs font-semibold text-primary hover:text-primary hover:bg-primary/10"
                        onClick={() => navigate(`/admin/students/${effectiveId}`)}
                      >
                        <span>Chiến lược</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        <div className="p-3 border-t bg-muted/10 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Hiển thị <strong>{rawStudents.length}</strong> / <strong>{total}</strong> học viên
          </p>
          <DataTablePagination
            currentPage={page}
            totalPages={totalPages}
            pageSize={pageSize}
            totalItems={total}
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={() => {}}
          />
        </div>
      </div>
    </div>
  );
}
