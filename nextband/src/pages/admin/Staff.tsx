import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { usersApi, branchesApi, Branch } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
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
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  Plus,
  Edit,
  Loader2,
  Mail,
  Phone,
  UserCheck,
  Building2,
  Users2,
  UserPlus,
  CheckCircle2,
  Eye,
  EyeOff,
  Calendar,
  Layers,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { DataTablePagination } from "@/components/admin/DataTablePagination";

type SortField = "fullName" | "email" | "createdAt";
type StatusFilter = "all" | "active" | "inactive";

const emptyForm = {
  email: "",
  password: "",
  fullName: "",
  role: "staff",
  gender: "",
  dateOfBirth: "",
  phone: "",
  branchIds: [] as string[],
};

export default function AdminStaff() {
  const { user: currentUser, refreshUser } = useAuth();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [selectedBranchFilter, setSelectedBranchFilter] = useState<string>("ALL");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [form, setForm] = useState(emptyForm);
  const [showPassword, setShowPassword] = useState(false);

  // Safety Confirmation for deactivating Staff
  const [confirmUser, setConfirmUser] = useState<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Fetch branches
  const { data: branches = [] } = useQuery<Branch[]>({
    queryKey: ["branches-list"],
    queryFn: () => branchesApi.list(),
    staleTime: 5 * 60 * 1000,
  });

  // Fetch staff list
  const { data, isLoading } = useQuery({
    queryKey: [
      "admin-staff",
      debouncedSearch,
      sortField,
      sortOrder,
      page,
      pageSize,
      statusFilter,
      selectedBranchFilter,
    ],
    queryFn: () =>
      usersApi.list({
        page,
        limit: pageSize,
        search: debouncedSearch || undefined,
        role: "staff",
      }),
  });

  const toggleMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      return usersApi.update(id, { isActive });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin-staff"] });
      queryClient.invalidateQueries({ queryKey: ["assignable-staff"] });
      toast({
        title: variables.isActive
          ? "Đã kích hoạt tài khoản nhân viên"
          : "Đã tạm khóa tài khoản nhân viên",
        description: variables.isActive
          ? "Nhân viên có thể đăng nhập và tiếp nhận tư vấn khách hàng."
          : "Nhân viên sẽ không thể đăng nhập hoặc nhận thêm lead mới.",
      });
      setConfirmUser(null);
      if (currentUser && (variables.id === currentUser.id || variables.id === (currentUser as any).userId)) {
        refreshUser();
      }
    },
    onError: () => {
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật trạng thái nhân viên.",
        variant: "destructive",
      });
      setConfirmUser(null);
    },
  });

  const createMutation = useMutation({
    mutationFn: (body: typeof emptyForm) => usersApi.create(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-staff"] });
      queryClient.invalidateQueries({ queryKey: ["assignable-staff"] });
      toast({ title: "Đã tạo tài khoản nhân viên mới" });
      setDialogOpen(false);
      setForm(emptyForm);
    },
    onError: (err: any) => {
      const msg =
        err?.message ||
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Không thể tạo nhân viên. Vui lòng kiểm tra lại thông tin!";
      toast({
        title: "Lỗi",
        description: msg,
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, ...body }: any) => usersApi.update(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-staff"] });
      queryClient.invalidateQueries({ queryKey: ["assignable-staff"] });
      toast({ title: "Đã cập nhật thông tin nhân viên" });
      setDialogOpen(false);
      setEditingUser(null);
      setForm(emptyForm);
    },
    onError: (err: any) => {
      toast({
        title: "Lỗi",
        description: err?.message || "Không thể cập nhật thông tin",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName.trim()) {
      toast({
        title: "Thiếu thông tin",
        description: "Vui lòng nhập họ và tên nhân viên.",
        variant: "destructive",
      });
      return;
    }
    if (!form.email.trim()) {
      toast({
        title: "Thiếu thông tin",
        description: "Vui lòng nhập địa chỉ email.",
        variant: "destructive",
      });
      return;
    }

    if (editingUser) {
      updateMutation.mutate({
        id: editingUser.id,
        email: form.email,
        fullName: form.fullName,
        gender: form.gender,
        dateOfBirth: form.dateOfBirth,
        phone: form.phone,
        branchIds: form.branchIds,
      });
    } else {
      createMutation.mutate({
        ...form,
        role: "staff",
      });
    }
  };

  const openCreateDialog = () => {
    setEditingUser(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEditDialog = (user: any) => {
    setEditingUser(user);
    const userBranchIds = (user.branches || []).map((b: any) => b.id);
    setForm({
      email: user.email || "",
      password: "",
      fullName: user.fullName || "",
      role: "staff",
      gender: user.gender || "",
      dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split("T")[0] : "",
      phone: user.phone || "",
      branchIds: userBranchIds,
    });
    setDialogOpen(true);
  };

  const toggleBranchSelection = (branchId: string) => {
    setForm((prev) => {
      const exists = prev.branchIds.includes(branchId);
      if (exists) {
        return { ...prev, branchIds: prev.branchIds.filter((id) => id !== branchId) };
      } else {
        return { ...prev, branchIds: [...prev.branchIds, branchId] };
      }
    });
  };

  // Filter staff by status & branch in frontend view
  const allStaff = data?.data || [];
  const filteredStaff = allStaff.filter((u: any) => {
    if (statusFilter === "active" && !u.isActive) return false;
    if (statusFilter === "inactive" && u.isActive) return false;
    if (selectedBranchFilter !== "ALL") {
      const hasBranch = (u.branches || []).some((b: any) => b.id === selectedBranchFilter);
      if (!hasBranch) return false;
    }
    return true;
  });

  const totalActive = allStaff.filter((u: any) => u.isActive).length;
  const totalAssignedLeads = allStaff.reduce((sum: number, u: any) => sum + (u.activeLeadCount || 0), 0);

  return (
    <TooltipProvider>
      <div className="space-y-6 p-6 font-sans">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <UserCheck className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
              Quản lý Nhân viên (Tư vấn & CRM)
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Danh sách nhân sự phụ trách tư vấn khách hàng, tuyển sinh và chăm sóc học viên.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={openCreateDialog}
              className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm font-semibold rounded-xl"
            >
              <Plus className="h-4 w-4" />
              Thêm nhân viên
            </Button>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border shadow-none bg-card/60 backdrop-blur">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Tổng nhân viên
                </p>
                <h3 className="text-2xl font-black text-foreground mt-0.5">
                  {data?.meta?.total ?? allStaff.length}
                </h3>
              </div>
              <div className="p-3 bg-indigo-500/10 text-indigo-600 rounded-xl">
                <Users2 className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-none bg-card/60 backdrop-blur">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Đang hoạt động
                </p>
                <h3 className="text-2xl font-black text-emerald-600 mt-0.5">
                  {totalActive}
                </h3>
              </div>
              <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-xl">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-none bg-card/60 backdrop-blur">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Leads đang phụ trách
                </p>
                <h3 className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-0.5">
                  {totalAssignedLeads}
                </h3>
              </div>
              <div className="p-3 bg-indigo-500/10 text-indigo-600 rounded-xl">
                <UserPlus className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-card p-3 rounded-2xl border shadow-sm">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm theo tên, email, số điện thoại..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 text-xs rounded-xl bg-background"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Branch Filter */}
            <Select value={selectedBranchFilter} onValueChange={setSelectedBranchFilter}>
              <SelectTrigger className="h-9 w-[180px] text-xs font-medium rounded-xl">
                <SelectValue placeholder="Tất cả cơ sở" />
              </SelectTrigger>
              <SelectContent className="rounded-xl text-xs">
                <SelectItem value="ALL">Tất cả cơ sở</SelectItem>
                {branches.map((b) => (
                  <SelectItem key={b.id} value={b.id}>
                    {b.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={(val: StatusFilter) => setStatusFilter(val)}>
              <SelectTrigger className="h-9 w-[150px] text-xs font-medium rounded-xl">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent className="rounded-xl text-xs">
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="active">Đang hoạt động</SelectItem>
                <SelectItem value="inactive">Đã tạm khóa</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Staff Table */}
        <div className="border rounded-2xl overflow-hidden bg-card shadow-sm">
          <div className="overflow-x-auto">
            <Table className="min-w-[1000px]">
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead className="font-bold text-xs uppercase tracking-wider whitespace-nowrap min-w-[220px]">
                    Nhân viên
                  </TableHead>
                  <TableHead className="font-bold text-xs uppercase tracking-wider whitespace-nowrap min-w-[140px]">
                    Số điện thoại
                  </TableHead>
                  <TableHead className="font-bold text-xs uppercase tracking-wider whitespace-nowrap min-w-[200px]">
                    Cơ sở trực thuộc
                  </TableHead>
                  <TableHead className="font-bold text-xs uppercase tracking-wider whitespace-nowrap min-w-[170px]">
                    Leads đang phụ trách
                  </TableHead>
                  <TableHead className="font-bold text-xs uppercase tracking-wider whitespace-nowrap min-w-[140px]">
                    Trạng thái
                  </TableHead>
                  <TableHead className="font-bold text-xs uppercase tracking-wider whitespace-nowrap min-w-[130px]">
                    Ngày tham gia
                  </TableHead>
                  <TableHead className="text-right font-bold text-xs uppercase tracking-wider whitespace-nowrap min-w-[100px]">
                    Thao tác
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-48 text-center">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Loader2 className="h-6 w-6 animate-spin text-primary" />
                        <span className="text-xs text-muted-foreground">Đang tải dữ liệu nhân viên...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredStaff.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-48 text-center text-muted-foreground">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <UserCheck className="w-8 h-8 text-muted-foreground/50" />
                        <span className="text-sm font-medium">Không tìm thấy nhân viên phù hợp</span>
                        <p className="text-xs text-muted-foreground">
                          Bạn có thể thêm nhân viên tư vấn mới bằng nút "Thêm nhân viên" ở trên.
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStaff.map((user: any) => {
                    const activeLeads = user.activeLeadCount || 0;
                    const userBranches = user.branches || [];

                    return (
                      <TableRow key={user.id} className="hover:bg-muted/30 transition-colors">
                        {/* Avatar & Name */}
                        <TableCell className="min-w-[220px]">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9 border border-indigo-200">
                              <AvatarImage src={user.avatarUrl || ""} />
                              <AvatarFallback className="bg-indigo-100 text-indigo-700 font-bold text-xs">
                                {user.fullName?.charAt(0) || "S"}
                              </AvatarFallback>
                            </Avatar>
                            <div className="space-y-0.5">
                              <div className="font-bold text-foreground text-sm flex items-center gap-1.5">
                                {user.fullName || "Chưa đặt tên"}
                              </div>
                              <div className="text-xs text-muted-foreground flex items-center gap-1">
                                <Mail className="w-3 h-3 text-muted-foreground/60" />
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </TableCell>

                        {/* Phone */}
                        <TableCell className="min-w-[140px]">
                          {user.phone ? (
                            <a
                              href={`tel:${user.phone}`}
                              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                            >
                              <Phone className="w-3 h-3" />
                              {user.phone}
                            </a>
                          ) : (
                            <span className="text-xs text-muted-foreground italic">—</span>
                          )}
                        </TableCell>

                        {/* Branches */}
                        <TableCell className="min-w-[200px]">
                          {userBranches.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {userBranches.map((b: any) => (
                                <Badge
                                  key={b.id}
                                  variant="outline"
                                  className="text-[11px] font-normal border-primary/20 bg-primary/5 gap-1"
                                >
                                  <Building2 className="w-2.5 h-2.5 text-primary" />
                                  {b.name}
                                </Badge>
                              ))}
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground italic">Tất cả cơ sở</span>
                          )}
                        </TableCell>

                        {/* Active Assigned Leads */}
                        <TableCell className="min-w-[170px]">
                          <Link
                            to={`/admin/leads?assignedTo=${encodeURIComponent(user.userId || user.id)}`}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all bg-indigo-50/80 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-950/30 dark:hover:bg-indigo-900/40 dark:text-indigo-300 border border-indigo-200/60"
                            title="Bấm để xem danh sách lead của nhân viên này"
                          >
                            <UserPlus className="w-3.5 h-3.5" />
                            <span>{activeLeads} leads đang xử lý</span>
                          </Link>
                        </TableCell>

                        {/* Status Switch */}
                        <TableCell className="min-w-[140px]">
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={user.isActive}
                              onCheckedChange={(checked) => {
                                if (!checked) {
                                  setConfirmUser(user);
                                } else {
                                  toggleMutation.mutate({ id: user.id, isActive: true });
                                }
                              }}
                              disabled={toggleMutation.isPending}
                            />
                            <span className={`text-xs font-semibold ${user.isActive ? "text-emerald-600" : "text-rose-500"}`}>
                              {user.isActive ? "Hoạt động" : "Tạm khóa"}
                            </span>
                          </div>
                        </TableCell>

                        {/* Joined Date */}
                        <TableCell className="min-w-[130px] text-xs text-muted-foreground whitespace-nowrap">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-muted-foreground/60" />
                            {user.createdAt
                              ? new Date(user.createdAt).toLocaleDateString("vi-VN")
                              : "—"}
                          </span>
                        </TableCell>

                        {/* Actions */}
                        <TableCell className="text-right min-w-[100px] whitespace-nowrap">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(user)}
                            className="h-8 px-2.5 text-xs gap-1 hover:bg-muted rounded-lg"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>Sửa</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {data?.meta && (
            <div className="p-3 border-t">
              <DataTablePagination
                currentPage={page}
                totalPages={data.meta.totalPages || 1}
                pageSize={pageSize}
                totalItems={data.meta.total}
                onPageChange={(p) => setPage(p)}
                onPageSizeChange={(ps) => {
                  setPageSize(ps);
                  setPage(1);
                }}
              />
            </div>
          )}
        </div>

        {/* Modal: Thêm / Sửa Nhân viên */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-lg rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-indigo-600" />
                {editingUser ? "Chỉnh sửa thông tin nhân viên" : "Thêm nhân viên tư vấn mới"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <Label className="text-xs font-semibold">
                    Họ và tên <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    required
                    placeholder="VD: Nguyễn Văn An"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className="h-9 text-xs rounded-xl"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <Label className="text-xs font-semibold">
                    Địa chỉ Email <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    type="email"
                    required
                    placeholder="VD: nv.an@nextband.site"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="h-9 text-xs rounded-xl"
                  />
                </div>

                {!editingUser && (
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label className="text-xs font-semibold">Mật khẩu đăng nhập</Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Để trống để tạo mật khẩu ngẫu nhiên"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        className="h-9 text-xs rounded-xl pr-9"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Số điện thoại</Label>
                  <Input
                    placeholder="VD: 0981234567"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="h-9 text-xs rounded-xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Giới tính</Label>
                  <Select
                    value={form.gender}
                    onValueChange={(val) => setForm({ ...form, gender: val })}
                  >
                    <SelectTrigger className="h-9 text-xs rounded-xl">
                      <SelectValue placeholder="Chọn giới tính" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl text-xs">
                      <SelectItem value="male">Nam</SelectItem>
                      <SelectItem value="female">Nữ</SelectItem>
                      <SelectItem value="other">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Branch Association */}
              <div className="space-y-2 pt-2 border-t">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                    Cơ sở phụ trách công tác
                  </Label>
                  <span className="text-[11px] text-muted-foreground">
                    (Chọn các cơ sở nhân viên sẽ tiếp nhận lead)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-36 overflow-y-auto p-1 border rounded-xl bg-muted/20">
                  {branches.map((branch) => {
                    const isSelected = form.branchIds.includes(branch.id);
                    return (
                      <button
                        type="button"
                        key={branch.id}
                        onClick={() => toggleBranchSelection(branch.id)}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium border transition-all text-left ${
                          isSelected
                            ? "bg-indigo-50 border-indigo-300 text-indigo-900 dark:bg-indigo-950/40 dark:border-indigo-700 dark:text-indigo-200"
                            : "bg-background border-border text-foreground hover:bg-muted/50"
                        }`}
                      >
                        <span className="truncate">{branch.name}</span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <DialogFooter className="pt-3 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                  className="rounded-xl text-xs"
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold"
                >
                  {(createMutation.isPending || updateMutation.isPending) && (
                    <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                  )}
                  {editingUser ? "Lưu thay đổi" : "Tạo tài khoản"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Confirmation Modal for Deactivating */}
        <AlertDialog open={!!confirmUser} onOpenChange={(open) => !open && setConfirmUser(null)}>
          <AlertDialogContent className="rounded-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-base font-bold text-rose-600">
                Xác nhận tạm khóa tài khoản nhân viên?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-xs text-muted-foreground leading-relaxed">
                Khi tạm khóa tài khoản của <strong>{confirmUser?.fullName || confirmUser?.email}</strong>,
                nhân viên sẽ không thể đăng nhập và không xuất hiện trong danh sách phân bổ lead mới.
                Các lead cũ đã gán cho nhân viên vẫn được bảo lưu an toàn.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="gap-2">
              <AlertDialogCancel className="rounded-xl text-xs">Hủy</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  if (confirmUser) {
                    toggleMutation.mutate({ id: confirmUser.id, isActive: false });
                  }
                }}
                className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold"
              >
                Tạm khóa ngay
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </TooltipProvider>
  );
}
