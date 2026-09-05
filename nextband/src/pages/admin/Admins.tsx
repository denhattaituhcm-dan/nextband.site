import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usersApi } from "@/lib/api";
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
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  ArrowUpDown,
  Plus,
  Edit,
  Loader2,
  Mail,
  Phone,
  ShieldCheck,
  Eye,
  EyeOff,
  AlertTriangle,
  RefreshCw,
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
  role: "admin",
  gender: "",
  dateOfBirth: "",
  phone: "",
};

export default function AdminAdmins() {
  const { user: currentUser, refreshUser } = useAuth();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
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

  // Safety Confirmation for deactivating Admin
  const [confirmUser, setConfirmUser] = useState<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [
      "admin-admins",
      debouncedSearch,
      sortField,
      sortOrder,
      page,
      pageSize,
    ],
    queryFn: () =>
      usersApi.list({
        page,
        limit: pageSize,
        search: debouncedSearch || undefined,
        role: "admin",
      }),
  });

  const toggleMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      return usersApi.update(id, { isActive });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin-admins"] });
      toast({
        title: variables.isActive
          ? "Đã kích hoạt lại quyền Quản trị viên"
          : "Đã thu hồi quyền Quản trị viên (Trạng thái tắt)",
        description: variables.isActive
          ? "Tài khoản hiện có toàn quyền Quản trị hệ thống."
          : "Tài khoản đã chuyển sang trạng thái tắt, lưu trong danh sách chờ kích hoạt lại.",
      });
      setConfirmUser(null);
      if (currentUser && (variables.id === currentUser.id || variables.id === (currentUser as any).userId)) {
        refreshUser();
      }
    },
    onError: () => {
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật trạng thái quyền quản trị viên.",
        variant: "destructive",
      });
      setConfirmUser(null);
    },
  });

  const createMutation = useMutation({
    mutationFn: (body: typeof emptyForm) => usersApi.create(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-admins"] });
      toast({ title: "Đã thêm quản trị viên mới" });
      setDialogOpen(false);
      setForm(emptyForm);
    },
    onError: (err: any) => {
      const msg = err?.message || err?.response?.data?.message || err?.response?.data?.error || "Không thể tạo quản trị viên. Vui lòng kiểm tra dữ liệu!";
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
      queryClient.invalidateQueries({ queryKey: ["admin-admins"] });
      toast({ title: "Đã cập nhật thông tin quản trị viên" });
      setDialogOpen(false);
      setEditingUser(null);
      setForm(emptyForm);
    },
    onError: () => {
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật thông tin",
        variant: "destructive",
      });
    },
  });

  const openCreate = () => {
    setEditingUser(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (user: any) => {
    setEditingUser(user);
    setForm({
      email: user.email || "",
      password: "",
      fullName: user.fullName || "",
      role: "admin",
      gender: user.gender || "",
      dateOfBirth: user.dateOfBirth
        ? new Date(user.dateOfBirth).toISOString().split("T")[0]
        : "",
      phone: user.phone || "",
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.email || !form.email.includes("@")) {
      toast({
        title: "Thiếu thông tin",
        description: "Vui lòng nhập địa chỉ email hợp lệ",
        variant: "destructive",
      });
      return;
    }

    if (editingUser) {
      const { password, ...rest } = form;
      updateMutation.mutate({ id: editingUser.id, ...rest });
    } else {
      createMutation.mutate(form);
    }
  };

  const rawAdmins = data?.data || [];
  const totalPages = data?.meta?.totalPages || 1;
  const total = data?.meta?.total || 0;

  const activeCount = rawAdmins.filter((a: any) => a.isActive !== false).length;
  const inactiveCount = rawAdmins.filter((a: any) => a.isActive === false).length;

  const filteredAdmins = rawAdmins.filter((admin: any) => {
    const isActive = admin.isActive !== false;
    if (statusFilter === "active") return isActive;
    if (statusFilter === "inactive") return !isActive;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
            <ShieldCheck className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Quản lý Quản trị viên (Admin)</h1>
            <p className="text-sm text-muted-foreground">
              {total} tài khoản admin • {activeCount} đang hoạt động • {inactiveCount} đã tắt (chờ kích hoạt)
            </p>
          </div>
        </div>
        <Button onClick={openCreate} className="bg-amber-600 hover:bg-amber-700 text-white self-start sm:self-auto">
          <Plus className="mr-2 h-4 w-4" />
          Thêm Quản trị viên
        </Button>
      </div>

      {/* Toolbar: Search + Status Filter Chips */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm theo email hoặc tên admin..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {[
            { id: "all", label: `Tất cả (${total})` },
            { id: "active", label: `Đang hoạt động (${activeCount})` },
            { id: "inactive", label: `Đã tắt (${inactiveCount})` },
          ].map((chip) => (
            <Button
              key={chip.id}
              variant={statusFilter === chip.id ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(chip.id as StatusFilter)}
              className="h-8 rounded-full text-xs"
            >
              {chip.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg bg-white shadow-xs overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Quản trị viên</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>SĐT</TableHead>
              <TableHead>Ngày tạo</TableHead>
              <TableHead>Quyền Admin</TableHead>
              <TableHead className="w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-amber-600" />
                    Đang tải...
                  </div>
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                  <div className="flex flex-col items-center gap-3">
                    <AlertTriangle className="h-8 w-8 text-destructive" />
                    <p className="text-sm font-medium">Không thể tải danh sách quản trị viên</p>
                    <Button variant="outline" size="sm" onClick={() => refetch()}>
                      <RefreshCw className="mr-2 h-3.5 w-3.5" />
                      Thử lại
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredAdmins.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  {search
                    ? "Không tìm thấy quản trị viên phù hợp"
                    : statusFilter === "inactive"
                    ? "Không có quản trị viên nào ở trạng thái tắt"
                    : "Chưa có tài khoản Admin nào"}
                </TableCell>
              </TableRow>
            ) : (
              filteredAdmins.map((admin: any) => {
                const isAccountActive = admin.isActive !== false;
                const isSelf =
                  currentUser &&
                  (admin.id === currentUser.id ||
                    admin.id === (currentUser as any).userId ||
                    admin.email === currentUser.email);

                return (
                  <TableRow
                    key={admin.id}
                    className={!isAccountActive ? "bg-slate-50/70 text-slate-500" : undefined}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={admin.avatarUrl || undefined} />
                          <AvatarFallback
                            className={
                              isAccountActive
                                ? "bg-amber-100 text-amber-800 font-bold"
                                : "bg-slate-200 text-slate-600 font-bold"
                            }
                          >
                            <ShieldCheck className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <span
                            className={`font-semibold block ${
                              isAccountActive ? "text-slate-900" : "text-slate-600"
                            }`}
                          >
                            {admin.fullName || "Admin System"}
                            {isSelf && (
                              <span className="ml-1.5 text-xs text-amber-600 font-normal">
                                (Bạn)
                              </span>
                            )}
                          </span>
                          {isAccountActive ? (
                            <Badge className="bg-amber-500 hover:bg-amber-600 text-white text-[10px] gap-1">
                              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                              Admin (Hoạt động)
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="bg-slate-100 text-slate-600 border-slate-300 text-[10px] gap-1"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                              Đã tắt (Chờ kích hoạt lại)
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm font-medium text-slate-700">
                      <div className="flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-slate-400" />
                        {admin.email}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {admin.phone ? (
                        <div className="flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5 text-slate-400" />
                          {admin.phone}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(admin.createdAt).toLocaleDateString("vi-VN")}
                    </TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="inline-block">
                              <Switch
                                checked={isAccountActive}
                                disabled={isSelf || toggleMutation.isPending}
                                onCheckedChange={(checked) => {
                                  if (!checked) {
                                    setConfirmUser(admin);
                                  } else {
                                    toggleMutation.mutate({
                                      id: admin.id,
                                      isActive: true,
                                    });
                                  }
                                }}
                                aria-label={`Trạng thái quyền Admin của ${admin.fullName || admin.email}`}
                              />
                            </span>
                          </TooltipTrigger>
                          {isSelf && (
                            <TooltipContent>
                              <p>Không thể tự tắt quyền quản trị của chính mình</p>
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => openEdit(admin)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

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

      {/* Safety Confirmation Dialog */}
      <AlertDialog
        open={!!confirmUser}
        onOpenChange={(open) => !open && setConfirmUser(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Thu hồi quyền Quản trị viên?
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-2 text-sm text-muted-foreground pt-2">
                <p>
                  Bạn có chắc chắn muốn thu hồi quyền quản trị của{" "}
                  <strong className="text-foreground">
                    {confirmUser?.fullName || confirmUser?.email}
                  </strong>
                  ?
                </p>
                <div className="rounded-md bg-amber-50 border border-amber-200 p-3 text-xs text-amber-900 space-y-1">
                  <p className="font-semibold flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-amber-600" />
                    Lưu giữ trong danh sách ở trạng thái tắt:
                  </p>
                  <p>• Tài khoản sẽ tạm ngưng quyền truy cập quản trị hệ thống.</p>
                  <p>
                    • Tài khoản <strong>vẫn được giữ trong danh sách này</strong> và có thể{" "}
                    <strong>kích hoạt lại bất kỳ lúc nào</strong> bằng công tắc.
                  </p>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (confirmUser) {
                  toggleMutation.mutate({
                    id: confirmUser.id,
                    isActive: false,
                  });
                }
              }}
            >
              {toggleMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Xác nhận tắt quyền
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Create / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-amber-700">
              <ShieldCheck className="h-5 w-5" />
              {editingUser ? "Chỉnh sửa Admin" : "Thêm Quản trị viên mới"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            {editingUser ? (
              <div className="space-y-2">
                <Label>Email Đăng nhập *</Label>
                <Input
                  type="email"
                  placeholder="admin@ielts.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <Label>Email Đăng nhập *</Label>
                  <Input
                    type="email"
                    placeholder="admin@ielts.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Mật khẩu * (Hiển thị trực tiếp)</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Mật khẩu Admin"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      className="pr-10 font-mono bg-amber-50/40 border-amber-200 font-bold"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label>Họ và Tên Admin *</Label>
              <Input
                placeholder="VD: Nguyễn Văn Admin"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Số điện thoại liên hệ</Label>
              <Input
                placeholder="0901234567"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Hủy
            </Button>
            <Button
              onClick={handleSave}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold"
              disabled={
                !form.email ||
                (!editingUser && !form.password) ||
                createMutation.isPending ||
                updateMutation.isPending
              }
            >
              {(createMutation.isPending || updateMutation.isPending) && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {editingUser ? "Lưu thay đổi" : "Tạo Admin"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
