import { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usersApi } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  User,
  ArrowUpDown,
  Plus,
  Edit,
  Loader2,
  MoreVertical,
  Info,
  CheckSquare,
  Square,
  FileSpreadsheet,
  RefreshCw,
  Lock,
  Unlock,
  Key,
  PauseCircle,
  PlayCircle,
  Archive,
  Trash2,
  Clock,
  BookOpen,
  GraduationCap,
  AlertTriangle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DataTablePagination } from "@/components/admin/DataTablePagination";
import { StudentWorkspaceDrawer } from "@/components/admin/StudentWorkspaceDrawer";
import { useSearchParams, useNavigate } from "react-router-dom";

type SortField = "fullName" | "email" | "createdAt";

const emptyForm = {
  email: "",
  password: "",
  fullName: "",
  role: "student",
  gender: "",
  dateOfBirth: "",
  phone: "",
  parentName: "",
  parentPhone: "",
  certificateBand: "",
  certificateType: "",
  certificateUrl: "",
  certificateVerified: false,
};

export default function AdminUsers() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialRole = searchParams.get("role") || "student";
  const statusParam = searchParams.get("status");
  const courseIdParam = searchParams.get("courseId");
  const classIdParam = searchParams.get("classId");

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [roleFilter] = useState<string>(initialRole);
  
  // Bulk Action Mode State
  const [bulkMode, setBulkMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Drawer & Workspace State
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Create / Edit Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [form, setForm] = useState(emptyForm);

  // Role Promotion Dialog state
  const [promoteDialogUser, setPromoteDialogUser] = useState<any>(null);
  const [suspensionDialogUser, setSuspensionDialogUser] = useState<any>(null);
  const [suspensionForm, setSuspensionForm] = useState({
    suspendedAt: new Date().toISOString().split("T")[0],
    expectedReturnDate: "",
    suspensionReason: "",
  });

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading } = useQuery({
    queryKey: [
      "admin-students-management",
      debouncedSearch,
      courseIdParam,
      classIdParam,
      statusParam,
      page,
      pageSize,
    ],
    queryFn: () =>
      usersApi.getStudentManagement({
        page,
        limit: pageSize,
        search: debouncedSearch || undefined,
        courseId: courseIdParam || undefined,
        classId: classIdParam || undefined,
        status: statusParam || undefined,
      }),
  });

  const promoteMutation = useMutation({
    mutationFn: async ({ id, role }: { id: string; role: string }) => {
      return usersApi.update(id, { role });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin-students-management"] });
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.invalidateQueries({ queryKey: ["admin-teachers"] });
      queryClient.invalidateQueries({ queryKey: ["teachers-list"] });
      toast({
        title: "Chuyển đổi vai trò thành công",
        description: `Đã chuyển tài khoản sang vai trò ${variables.role === "teacher" ? "Giáo viên" : "Học viên"}`,
      });
      setPromoteDialogUser(null);
    },
    onError: (err: any) => {
      toast({
        title: "Lỗi",
        description: err?.message || "Không thể chuyển đổi vai trò",
        variant: "destructive",
      });
    },
  });

  const toggleLockMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      return usersApi.update(id, { isActive });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-students-management"] });
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast({ title: "Đã cập nhật trạng thái tài khoản" });
    },
  });

  const toggleReservationMutation = useMutation({
    mutationFn: async ({
      id,
      isReserved,
      suspendedAt,
      expectedReturnDate,
      suspensionReason,
    }: {
      id: string;
      isReserved: boolean;
      suspendedAt?: string;
      expectedReturnDate?: string;
      suspensionReason?: string;
    }) => {
      return usersApi.update(id, {
        isReserved,
        status: isReserved ? "suspended" : "active",
        suspendedAt,
        expectedReturnDate,
        suspensionReason,
      });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin-students-management"] });
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.invalidateQueries({ queryKey: ["class-workspace"] });
      setSuspensionDialogUser(null);
      toast({
        title: variables.isReserved ? "Đã đặt bảo lưu" : "Đã mở bảo lưu",
        description: variables.isReserved
          ? "Đã chuyển học viên sang trạng thái Bảo lưu"
          : "Đã mở lại trạng thái học tập bình thường",
      });
    },
    onError: (err: any) => {
      toast({
        title: "Lỗi",
        description: err?.message || "Không thể thay đổi trạng thái bảo lưu",
        variant: "destructive",
      });
    },
  });

  const createMutation = useMutation({
    mutationFn: (body: typeof emptyForm) => usersApi.create(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-students-management"] });
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast({ title: "Đã tạo học viên mới thành công" });
      setDialogOpen(false);
      setForm(emptyForm);
    },
    onError: (err: any) => {
      const msg = err?.message || err?.response?.data?.message || err?.response?.data?.error || "Không thể tạo người dùng";
      toast({ title: "Lỗi", description: msg, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, ...body }: any) => usersApi.update(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-students-management"] });
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast({ title: "Đã cập nhật thông tin học viên" });
      setDialogOpen(false);
      setEditingUser(null);
      setForm(emptyForm);
    },
    onError: (err: any) => {
      const msg = err?.message || err?.response?.data?.message || err?.response?.data?.error || "Không thể cập nhật";
      toast({ title: "Lỗi", description: msg, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => usersApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-students-management"] });
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast({ title: "Đã xóa vĩnh viễn dữ liệu học viên" });
    },
    onError: (err: any) => {
      const msg = err?.message || err?.response?.data?.error || "Không thể xóa dữ liệu học viên";
      toast({ title: "Lỗi", description: msg, variant: "destructive" });
    },
  });

  const archiveMutation = useMutation({
    mutationFn: ({ id, reason, metadata }: { id: string; reason: string; metadata: any }) =>
      usersApi.update(id, {
        isActive: false,
        bio: JSON.stringify({ isReserved: true, archiveReason: reason, ...metadata }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-students-management"] });
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast({ title: "Thành công", description: "Đã lưu trữ hồ sơ học viên thành công" });
      setDrawerOpen(false);
    },
    onError: (err: any) => {
      toast({ title: "Lỗi", description: err?.message || "Không thể lưu trữ học viên", variant: "destructive" });
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
      className="cursor-pointer hover:bg-muted/50 transition-colors select-none"
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

  const openCreate = () => {
    setEditingUser(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (user: any, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setEditingUser(user);
    setForm({
      email: user.email || "",
      password: "",
      fullName: user.fullName || "",
      role: user.roles?.[0] || "student",
      gender: user.gender || "",
      dateOfBirth: user.dateOfBirth || "",
      phone: user.phone || "",
      parentName: user.parentName || "",
      parentPhone: user.parentPhone || "",
      certificateBand: user.certificateBand || "",
      certificateType: user.certificateType || "",
      certificateUrl: user.certificateUrl || "",
      certificateVerified: user.certificateVerified || false,
    });
    setDialogOpen(true);
  };

  const handleRowClick = (user: any) => {
    if (bulkMode) return;
    setSelectedStudent(user);
    setDrawerOpen(true);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked && usersList) {
      setSelectedIds(usersList.map((u: any) => u.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const rawUsersList = (data as any)?.data || (data as any)?.users || (Array.isArray(data) ? data : []);
  const usersList = rawUsersList;
  const total = (data as any)?.meta?.total ?? (data as any)?.total ?? usersList.length;
  const totalPages = (data as any)?.meta?.totalPages ?? (data as any)?.totalPages ?? 1;

  // Render Operational Academic Health Badge (Calculated 100% at Server)
  const renderAcademicHealth = (score: number | null) => {
    if (score === null || score === undefined) {
      return (
        <Badge variant="outline" className="bg-slate-50 text-slate-500 border-slate-200 font-normal text-[11px]">
          ⚪ N/A (—)
        </Badge>
      );
    }

    const isHealthy = score >= 80;
    const isNeedsAttention = score >= 50 && score < 80;

    return (
      <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
        <Badge
          variant="outline"
          className={
            isHealthy
              ? "bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold text-[11px]"
              : isNeedsAttention
              ? "bg-amber-50 text-amber-700 border-amber-200 font-semibold text-[11px]"
              : "bg-red-50 text-red-700 border-red-200 font-semibold text-[11px]"
          }
        >
          {isHealthy ? `🟢 Healthy (${score})` : isNeedsAttention ? `🟡 Attention (${score})` : `🔴 Risk (${score})`}
        </Badge>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs text-xs">
              <p className="font-bold">Công thức Sức khỏe Học thuật (Server Calculated):</p>
              <p>• Chuyên cần (30%) • Tiến độ bài tập (40%)</p>
              <p>• Tỷ lệ bài đã chấm (30%)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            Học viên
            <Badge variant="secondary" className="text-xs font-normal">
              {total} học viên trong hệ thống
            </Badge>
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Bảng điều hướng vận hành & Quản lý vòng đời học viên
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={bulkMode ? "secondary" : "outline"}
            size="sm"
            onClick={() => {
              setBulkMode(!bulkMode);
              setSelectedIds([]);
            }}
            className="gap-1.5"
          >
            {bulkMode ? <CheckSquare className="h-4 w-4 text-primary" /> : <Square className="h-4 w-4" />}
            {bulkMode ? "Thoát chọn nhiều" : "Chọn nhiều"}
          </Button>
          <Button onClick={openCreate} size="sm" className="gap-1 bg-primary">
            <Plus className="h-4 w-4" />
            Thêm học viên
          </Button>
        </div>
      </div>

      {/* SEARCH & FILTERS BAR */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm theo tên, email hoặc SĐT học viên..."
            className="pl-9 bg-background"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* BULK ACTION BAR WHEN SELECTING ITEMS */}
        {bulkMode && selectedIds.length > 0 && (
          <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 p-1.5 px-3 rounded-lg text-xs animate-in fade-in">
            <span className="font-semibold text-primary">Đã chọn {selectedIds.length} học viên</span>
            <div className="h-4 w-[1px] bg-primary/20 mx-1" />
            <Button size="sm" variant="ghost" className="h-7 text-xs gap-1" onClick={() => toast({ title: "Đã mở dialog đổi lớp hàng loạt" })}>
              <RefreshCw className="h-3.5 w-3.5" /> Đổi lớp
            </Button>
            <Button size="sm" variant="ghost" className="h-7 text-xs gap-1" onClick={() => toast({ title: "Đã xuất file Excel học viên chọn" })}>
              <FileSpreadsheet className="h-3.5 w-3.5" /> Xuất Excel
            </Button>
            <Button size="sm" variant="ghost" className="h-7 text-xs gap-1 text-amber-700 hover:text-amber-800" onClick={() => toast({ title: "Đã chọn lưu trữ hàng loạt" })}>
              <Archive className="h-3.5 w-3.5" /> Lưu trữ
            </Button>
          </div>
        )}
      </div>

      {/* AT-RISK FILTER BANNER */}
      {statusParam === "at-risk" && (
        <div className="flex items-center justify-between p-3 rounded-xl bg-red-50 text-red-800 border border-red-200 text-xs font-medium">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0" />
            <span>
              Đang lọc danh sách: <strong>Học viên có nguy cơ bỏ học</strong> (Điểm chuyên cần &lt; 75% hoặc chỉ số sức khỏe học tập &lt; 60).
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-7 text-xs border-red-300 text-red-700 hover:bg-red-100"
            onClick={() => navigate("/admin/users?role=student")}
          >
            Xem tất cả học viên
          </Button>
        </div>
      )}

      {/* COURSE / CLASS FILTER BANNER */}
      {(courseIdParam || classIdParam) && (
        <div className="flex items-center justify-between p-3 rounded-xl bg-primary/5 text-primary border border-primary/20 text-xs font-medium">
          <div className="flex items-center gap-2">
            <span>Đang lọc học viên theo:</span>
            {courseIdParam && (
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Khóa học: {courseIdParam}
              </Badge>
            )}
            {classIdParam && (
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Lớp học: {classIdParam}
              </Badge>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-7 text-xs"
            onClick={() => navigate("/admin/users?role=student")}
          >
            Xóa bộ lọc
          </Button>
        </div>
      )}

      {/* TABLE SECTION */}
      <div className="border rounded-xl bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              {bulkMode && (
                <TableHead className="w-10">
                  <Checkbox
                    checked={selectedIds.length === usersList.length && usersList.length > 0}
                    onCheckedChange={(checked) => handleSelectAll(!!checked)}
                  />
                </TableHead>
              )}
              <SortHeader field="fullName">Học viên</SortHeader>
              <TableHead>Lớp & Khóa học</TableHead>
              <TableHead className="text-center">Bài tập</TableHead>
              <TableHead className="text-center">Chuyên cần</TableHead>
              <TableHead>Hoạt động cuối</TableHead>
              <TableHead>Sức khỏe Học thuật</TableHead>
              <TableHead className="text-center">Trạng thái</TableHead>
              <TableHead className="w-12 text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={bulkMode ? 9 : 8} className="h-32 text-center">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" />
                </TableCell>
              </TableRow>
            ) : usersList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={bulkMode ? 9 : 8} className="h-32 text-center text-muted-foreground">
                  Không tìm thấy học viên phù hợp
                </TableCell>
              </TableRow>
            ) : (
              usersList.map((user: any) => {
                const isSelected = selectedIds.includes(user.id);
                const isAccountLocked = user.isActive === false;

                return (
                  <TableRow
                    key={user.id}
                    className="cursor-pointer hover:bg-muted/40 transition-colors group"
                    onClick={() => handleRowClick(user)}
                  >
                    {bulkMode && (
                      <TableCell className="w-10" onClick={(e) => handleSelectRow(user.id, e)}>
                        <Checkbox checked={isSelected} />
                      </TableCell>
                    )}

                    {/* STUDENT NAME & AVATAR */}
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 border">
                          <AvatarImage src={user.avatarUrl} />
                          <AvatarFallback className="bg-primary/10 text-primary font-medium text-xs">
                            {user.fullName ? user.fullName.substring(0, 2).toUpperCase() : "HV"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                            {user.fullName || "Chưa đặt tên"}
                          </p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>

                    {/* CLASS & COURSE */}
                    <TableCell className="text-xs">
                      {user.classes && user.classes.length > 0 ? (
                        user.classes.map((c: any) => (
                          <div key={c.id} className="space-y-0.5">
                            <p className="font-medium text-foreground">{c.name}</p>
                            {c.courseTitle && (
                              <p className="text-muted-foreground flex items-center gap-1">
                                <GraduationCap className="h-3 w-3 text-primary" />
                                {c.courseTitle}
                              </p>
                            )}
                          </div>
                        ))
                      ) : (
                        <Badge variant="outline" className="bg-slate-50 text-slate-500 border-slate-200 text-[10px]">
                          ⚪ Chưa xếp lớp
                        </Badge>
                      )}
                    </TableCell>

                    {/* HOMEWORK RATIO */}
                    <TableCell className="text-center text-xs">
                      {user.homework && user.homework.totalAssignedCount > 0 ? (
                        <>
                          <span className="font-semibold text-foreground">
                            {user.homework.submittedCount}/{user.homework.totalAssignedCount}
                          </span>
                          {user.homework.percentage != null && (
                            <span className="text-muted-foreground text-[10px] block">
                              ({user.homework.percentage}%)
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>

                    {/* ATTENDANCE */}
                    <TableCell className="text-center text-xs">
                      {user.attendance && user.attendance.percentage != null ? (
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                          {user.attendance.percentage}%
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>

                    {/* LAST ACTIVITY */}
                    <TableCell text-xs onClick={(e) => e.stopPropagation()}>
                      {user.lastActivity && user.lastActivity.timestamp ? (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-auto p-1 px-2 text-xs font-normal text-muted-foreground hover:text-foreground hover:bg-muted gap-1">
                              <Clock className="h-3.5 w-3.5 text-blue-500" />
                              {new Date(user.lastActivity.timestamp).toLocaleDateString("vi-VN")}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-64 p-3 text-xs space-y-1">
                            <p className="font-bold text-foreground">Hoạt động gần nhất:</p>
                            <p className="text-muted-foreground">
                              Đã nộp <strong>{user.lastActivity.title}</strong>
                              {user.lastActivity.score != null ? ` (Điểm: ${user.lastActivity.score})` : ""}
                            </p>
                            <p className="text-[10px] text-muted-foreground pt-1 border-t mt-1">
                              Lúc {new Date(user.lastActivity.timestamp).toLocaleString("vi-VN")}
                            </p>
                          </PopoverContent>
                        </Popover>
                      ) : (
                        <span className="text-muted-foreground text-xs font-normal">Chưa có hoạt động</span>
                      )}
                    </TableCell>

                    {/* ACADEMIC HEALTH SCORE */}
                    <TableCell>
                      {renderAcademicHealth(user.academicHealth ?? null)}
                    </TableCell>

                    {/* ENROLLMENT / ACCOUNT STATUS (2-TIER) */}
                    <TableCell className="text-center" onClick={(e) => e.stopPropagation()}>
                      <div className="flex flex-col items-center gap-1">
                        {user.isReserved || user.status === "suspended" ? (
                          <div className="flex flex-col items-center gap-0.5">
                            <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 text-[11px] font-medium">
                              ⏸️ Đang bảo lưu
                            </Badge>
                            {user.suspensionInfo?.expectedReturnDate && (
                              <span className="text-[10px] text-amber-700 dark:text-amber-400 font-medium">
                                Hạn: {new Date(user.suspensionInfo.expectedReturnDate).toLocaleDateString("vi-VN")}
                              </span>
                            )}
                          </div>
                        ) : (
                          <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[11px]">
                            🟢 Đang học
                          </Badge>
                        )}
                        {isAccountLocked && (
                          <Badge variant="destructive" className="text-[9px] px-1 py-0">
                            🔒 Khóa TK
                          </Badge>
                        )}
                      </div>
                    </TableCell>

                    {/* CONTEXTUAL ACTION MENU (⋮) */}
                    <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 text-xs">
                          <DropdownMenuItem onClick={() => { setSelectedStudent(user); setDrawerOpen(true); }}>
                            <User className="h-3.5 w-3.5 mr-2 text-blue-500" />
                            Xem hồ sơ (Workspace)
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openEdit(user)}>
                            <Edit className="h-3.5 w-3.5 mr-2 text-slate-500" />
                            Chỉnh sửa thông tin
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setPromoteDialogUser(user)}
                            className="text-indigo-600 focus:text-indigo-700 focus:bg-indigo-50 font-medium"
                          >
                            <GraduationCap className="h-3.5 w-3.5 mr-2 text-indigo-600" />
                            Chuyển thành Giáo viên
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast({ title: "Đã mở Modal Đổi lớp" })}>
                            <RefreshCw className="h-3.5 w-3.5 mr-2 text-emerald-500" />
                            Đổi lớp / Chuyển lớp
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              const isCurrentlyReserved = Boolean(user.isReserved || user.status === "suspended");
                              if (isCurrentlyReserved) {
                                toggleReservationMutation.mutate({ id: user.id, isReserved: false });
                              } else {
                                setSuspensionForm({
                                  suspendedAt: new Date().toISOString().split("T")[0],
                                  expectedReturnDate: user.suspensionInfo?.expectedReturnDate
                                    ? new Date(user.suspensionInfo.expectedReturnDate).toISOString().split("T")[0]
                                    : "",
                                  suspensionReason: user.suspensionInfo?.suspensionReason || "",
                                });
                                setSuspensionDialogUser(user);
                              }
                            }}
                          >
                            {user.isReserved || user.status === "suspended" ? (
                              <>
                                <PlayCircle className="h-3.5 w-3.5 mr-2 text-emerald-600" />
                                Mở lại học tập (Hết bảo lưu)
                              </>
                            ) : (
                              <>
                                <PauseCircle className="h-3.5 w-3.5 mr-2 text-amber-500" />
                                Đặt bảo lưu khóa học
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast({ title: "Đã gửi lại mã Reset mật khẩu" })}>
                            <Key className="h-3.5 w-3.5 mr-2 text-purple-500" />
                            Reset mật khẩu
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toggleLockMutation.mutate({ id: user.id, isActive: isAccountLocked })}>
                            {isAccountLocked ? (
                              <>
                                <Unlock className="h-3.5 w-3.5 mr-2 text-emerald-600" />
                                Mở khóa tài khoản
                              </>
                            ) : (
                              <>
                                <Lock className="h-3.5 w-3.5 mr-2 text-red-500" />
                                Khóa tài khoản
                              </>
                            )}
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

                          {/* VISUAL SEPARATION FOR DANGEROUS LIFECYCLE ACTIONS */}
                          <DropdownMenuItem
                            className="text-amber-800 focus:text-amber-900 focus:bg-amber-50"
                            onClick={() => { setSelectedStudent(user); setDrawerOpen(true); }}
                          >
                            <Archive className="h-3.5 w-3.5 mr-2 text-amber-600" />
                            Lưu trữ học viên...
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem
                            className="text-red-600 focus:text-red-700 focus:bg-red-50 font-medium"
                            onClick={() => { setSelectedStudent(user); setDrawerOpen(true); }}
                          >
                            <Trash2 className="h-3.5 w-3.5 mr-2 text-red-600" />
                            Xóa vĩnh viễn...
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        {/* PAGINATION */}
        {data && (
          <DataTablePagination
            currentPage={page}
            totalPages={totalPages}
            pageSize={pageSize}
            totalItems={total}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
          />
        )}
      </div>

      {/* STUDENT WORKSPACE DRAWER */}
      <StudentWorkspaceDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        student={selectedStudent}
        onArchive={(id, reason, metadata) => {
          archiveMutation.mutate({ id, reason, metadata });
        }}
        onDelete={(id) => {
          deleteMutation.mutate(id);
        }}
        onToggleLock={(id, isLocked) => {
          toggleLockMutation.mutate({ id, isActive: !isLocked });
        }}
        onUpdate={(id, updated) => {
          setSelectedStudent((prev: any) => (prev ? { ...prev, ...updated } : null));
          queryClient.invalidateQueries({ queryKey: ["admin-students-management"] });
          queryClient.invalidateQueries({ queryKey: ["admin-users"] });
        }}
      />

      {/* CREATE / EDIT USER DIALOG */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingUser ? "Chỉnh sửa thông tin học viên" : "Thêm học viên mới"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="space-y-2">
              <Label>Email học viên *</Label>
              <Input
                type="email"
                placeholder="student@gmail.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Họ và tên *</Label>
                <Input
                  placeholder="Nguyễn Văn A"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Số điện thoại</Label>
                <Input
                  placeholder="0901234567"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Vai trò hệ thống</Label>
              <Select
                value={form.role || "student"}
                onValueChange={(val) => setForm({ ...form, role: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn vai trò" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Học viên (Student)</SelectItem>
                  <SelectItem value="teacher">Giáo viên (Teacher)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Tên Phụ huynh</Label>
                <Input
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={form.parentName}
                  onChange={(e) => setForm({ ...form, parentName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>SĐT Phụ huynh</Label>
                <Input
                  placeholder="0909876543"
                  value={form.parentPhone}
                  onChange={(e) => setForm({ ...form, parentPhone: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                disabled={createMutation.isPending || updateMutation.isPending}
                onClick={() => setDialogOpen(false)}
              >
                Hủy
              </Button>
              <Button
                disabled={createMutation.isPending || updateMutation.isPending}
                onClick={() => {
                  if (!form.email || !form.email.includes("@")) {
                    toast({
                      title: "Thiếu thông tin",
                      description: "Vui lòng nhập địa chỉ email hợp lệ",
                      variant: "destructive",
                    });
                    return;
                  }
                  if (!form.fullName || !form.fullName.trim()) {
                    toast({
                      title: "Thiếu thông tin",
                      description: "Vui lòng nhập họ và tên",
                      variant: "destructive",
                    });
                    return;
                  }
                  if (editingUser) {
                    updateMutation.mutate({ id: editingUser.id, ...form });
                  } else {
                    createMutation.mutate(form);
                  }
                }}
              >
                {(createMutation.isPending || updateMutation.isPending) && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {editingUser ? "Lưu cập nhật" : "Tạo học viên"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* CONFIRM ROLE PROMOTION ALERT DIALOG */}
      <AlertDialog
        open={Boolean(promoteDialogUser)}
        onOpenChange={(open) => {
          if (!open) setPromoteDialogUser(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-indigo-600" />
              Chuyển đổi thành Giáo viên
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-2 pt-2">
              <p>
                Bạn có chắc chắn muốn chuyển tài khoản của{" "}
                <strong className="text-foreground">
                  {promoteDialogUser?.fullName || "học viên này"}
                </strong>{" "}
                (<span className="font-mono text-xs">{promoteDialogUser?.email}</span>) sang vai trò{" "}
                <strong className="text-indigo-600">Giáo viên</strong> không?
              </p>
              <p className="text-xs text-muted-foreground">
                Tài khoản này sẽ có quyền truy cập vào Cổng quản lý giảng dạy, chấm bài và quản lý lớp học.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={promoteMutation.isPending}>
              Hủy
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
              disabled={promoteMutation.isPending}
              onClick={() => {
                if (promoteDialogUser) {
                  promoteMutation.mutate({
                    id: promoteDialogUser.id || promoteDialogUser.userId,
                    role: "teacher",
                  });
                }
              }}
            >
              {promoteMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Xác nhận chuyển thành Giáo viên
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* SET SUSPENSION DIALOG */}
      <Dialog
        open={Boolean(suspensionDialogUser)}
        onOpenChange={(open) => {
          if (!open) setSuspensionDialogUser(null);
        }}
      >
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-amber-600">
              <PauseCircle className="h-5 w-5" />
              Đặt bảo lưu khóa học
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2 text-sm">
            <p className="text-xs text-muted-foreground">
              Học viên: <strong className="text-foreground">{suspensionDialogUser?.fullName}</strong> ({suspensionDialogUser?.email})
            </p>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Ngày bắt đầu bảo lưu</Label>
              <Input
                type="date"
                value={suspensionForm.suspendedAt}
                onChange={(e) => setSuspensionForm({ ...suspensionForm, suspendedAt: e.target.value })}
                className="h-9"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Ngày dự kiến quay lại học (Hạn bảo lưu)</Label>
              <Input
                type="date"
                value={suspensionForm.expectedReturnDate}
                onChange={(e) => setSuspensionForm({ ...suspensionForm, expectedReturnDate: e.target.value })}
                className="h-9"
              />
              <p className="text-[11px] text-muted-foreground">
                Hệ thống sẽ nhắc việc trên Dashboard trước ngày này 7 ngày để CSKH chủ động liên hệ.
              </p>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Lý do bảo lưu</Label>
              <Input
                placeholder="VD: Bận thi đại học, đi công tác 2 tháng..."
                value={suspensionForm.suspensionReason}
                onChange={(e) => setSuspensionForm({ ...suspensionForm, suspensionReason: e.target.value })}
                className="h-9"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSuspensionDialogUser(null)}
              disabled={toggleReservationMutation.isPending}
            >
              Hủy
            </Button>
            <Button
              className="bg-amber-600 hover:bg-amber-700 text-white"
              disabled={toggleReservationMutation.isPending}
              onClick={() => {
                if (suspensionDialogUser) {
                  toggleReservationMutation.mutate({
                    id: suspensionDialogUser.id || suspensionDialogUser.userId,
                    isReserved: true,
                    suspendedAt: suspensionForm.suspendedAt || undefined,
                    expectedReturnDate: suspensionForm.expectedReturnDate || undefined,
                    suspensionReason: suspensionForm.suspensionReason || undefined,
                  });
                }
              }}
            >
              {toggleReservationMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Xác nhận đặt bảo lưu
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
