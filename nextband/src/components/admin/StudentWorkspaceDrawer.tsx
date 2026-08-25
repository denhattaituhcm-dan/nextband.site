import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { usersApi } from "@/lib/api";
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ExternalLink,
  MessageSquare,
  RefreshCw,
  PauseCircle,
  PlayCircle,
  Key,
  Info,
  AlertTriangle,
  CheckCircle2,
  Clock,
  BookOpen,
  Calendar,
  Phone,
  ShieldAlert,
  Archive,
  Trash2,
  UserCheck,
  GraduationCap,
  Edit,
  User,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StudentWorkspaceDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: any | null;
  onArchive: (id: string, reason: string, metadata: any) => void;
  onDelete: (id: string) => void;
  onToggleLock: (id: string, isLocked: boolean) => void;
  onUpdate?: (id: string, data: any) => void;
}

export function StudentWorkspaceDrawer({
  open,
  onOpenChange,
  student,
  onArchive,
  onDelete,
  onToggleLock,
  onUpdate,
}: StudentWorkspaceDrawerProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Edit Profile / Rename Student Dialog State
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Sync state whenever student changes
  useEffect(() => {
    if (student) {
      setFullName(student.fullName || student.full_name || "");
      setPhone(student.phone || "");
      setParentName(student.parentName || student.parent_name || "");
      setParentPhone(student.parentPhone || student.parent_phone || "");
    }
  }, [student]);

  // Archive Dialog State
  const [archiveDialogOpen, setArchiveDialogOpen] = useState(false);
  const [archiveReason, setArchiveReason] = useState("long_term_pause");
  const [returnDate, setReturnDate] = useState("");
  const [transferClass, setTransferClass] = useState("");
  const [archiveNotes, setArchiveNotes] = useState("");

  // Hard Delete Confirm Dialog State
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  // Reservation Toggle State
  const [isTogglingReservation, setIsTogglingReservation] = useState(false);

  if (!student) return null;

  const handleSaveProfile = async () => {
    if (!fullName.trim()) {
      toast({ title: "Lỗi", description: "Họ và tên học viên không được để trống", variant: "destructive" });
      return;
    }
    setIsSaving(true);
    try {
      const studentId = student.id || student.userId;
      const updatePayload = {
        fullName: fullName.trim(),
        phone: phone.trim(),
        parentName: parentName.trim(),
        parentPhone: parentPhone.trim(),
      };

      await usersApi.update(studentId, updatePayload);

      // Mutate local object so UI reflects changes immediately
      student.fullName = fullName.trim();
      student.phone = phone.trim();
      student.parentName = parentName.trim();
      student.parentPhone = parentPhone.trim();

      // Invalidate queries so tables and related views refresh
      queryClient.invalidateQueries({ queryKey: ["admin-students-management"] });
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.invalidateQueries({ queryKey: ["class-workspace"] });

      toast({ title: "Thành công", description: "Đã cập nhật tên và thông tin học viên" });
      setEditDialogOpen(false);

      if (onUpdate) {
        onUpdate(studentId, updatePayload);
      }
    } catch (err: any) {
      toast({ title: "Lỗi", description: err.message || "Không thể cập nhật thông tin học viên", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };


  // 1. Classes & Course info
  const primaryClass = student.classes?.[0];
  const classNames = student.classes && student.classes.length > 0
    ? student.classes.map((c: any) => c.name).join(", ")
    : (student.className || "Chưa xếp lớp");
  const courseName = student.courseName || primaryClass?.courseTitle || (primaryClass ? "Chưa có tên khóa" : "");
  
  // Teacher info from assigned class
  const teacherNames = student.classes && student.classes.length > 0
    ? student.classes.map((c: any) => c.teacherName).filter(Boolean).join(", ")
    : null;
  const teacherName = teacherNames || student.teacherName || primaryClass?.teacherName || "Chưa phân công";

  // 2. Academic Health & Operational Data
  const healthScore = student.academicHealth != null 
    ? student.academicHealth 
    : (student.healthScore != null ? student.healthScore : null);
  const isHealthy = healthScore != null && healthScore >= 80;
  const isNeedsAttention = healthScore != null && healthScore >= 60 && healthScore < 80;

  // Homework progress
  const hwRatio = student.homework
    ? (student.homework.totalAssignedCount > 0
        ? `${student.homework.submittedCount}/${student.homework.totalAssignedCount} (${student.homework.percentage ?? 0}%)`
        : student.homework.submittedCount > 0
          ? `${student.homework.submittedCount} bài đã nộp`
          : "Chưa có bài tập")
    : (student.hwRatio || "Chưa có bài tập");

  // Attendance rate
  const attendanceRate = student.attendance && student.attendance.percentage != null
    ? `${student.attendance.percentage}% (${student.attendance.attendedCount}/${student.attendance.totalSessions} buổi)`
    : (student.attendanceRate || "Chưa có dữ liệu");

  // Last Activity
  const lastActivity = student.lastActivity;
  const lastActivityText = lastActivity?.timestamp
    ? new Date(lastActivity.timestamp).toLocaleString("vi-VN")
    : (student.lastActivityText || "Chưa có hoạt động");

  const isAccountLocked = student.isActive === false;
  const isClassSuspended = student.classes?.some((c: any) => c.status === "SUSPENDED");
  const isBioReserved = !!(student.bio?.includes('"isReserved":true') || student.bio?.includes('"status":"suspended"') || student.bio === "RESERVED");
  const isReserved = Boolean(student.isReserved || student.status === "suspended" || isClassSuspended || isBioReserved);

  // Guardian info
  const parentNameDisplay = student.parentName || student.parent_name || "";
  const parentPhoneDisplay = student.parentPhone || student.parent_phone || "";
  const lastContactDate = student.lastContactDate || "";

  const handleToggleReservation = async () => {
    setIsTogglingReservation(true);
    const studentId = student.id || student.userId;
    const nextReservedState = !isReserved;

    try {
      await usersApi.update(studentId, {
        isReserved: nextReservedState,
        status: nextReservedState ? "suspended" : "active",
      });

      // Mutate local object so UI reflects changes immediately
      student.isReserved = nextReservedState;
      student.status = nextReservedState ? "suspended" : "active";
      if (student.classes) {
        student.classes.forEach((c: any) => {
          c.status = nextReservedState ? "SUSPENDED" : "ACTIVE";
        });
      }

      // Invalidate queries so tables and related views refresh
      queryClient.invalidateQueries({ queryKey: ["admin-students-management"] });
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.invalidateQueries({ queryKey: ["class-workspace"] });

      if (nextReservedState) {
        toast({
          title: "Đã đặt bảo lưu",
          description: `Đã chuyển học viên ${student.fullName || fullName || ""} sang trạng thái Bảo lưu`,
        });
      } else {
        toast({
          title: "Đã mở bảo lưu",
          description: `Đã mở lại trạng thái học tập bình thường cho học viên ${student.fullName || fullName || ""}`,
        });
      }

      if (onUpdate) {
        onUpdate(studentId, {
          isReserved: nextReservedState,
          status: nextReservedState ? "suspended" : "active",
        });
      }
    } catch (err: any) {
      toast({
        title: "Lỗi",
        description: err.message || "Không thể cập nhật trạng thái bảo lưu",
        variant: "destructive",
      });
    } finally {
      setIsTogglingReservation(false);
    }
  };

  const handleConfirmArchive = async () => {
    const studentId = student.id || student.userId;
    try {
      await usersApi.update(studentId, {
        isReserved: true,
        status: "suspended",
      });
      student.isReserved = true;
      student.status = "suspended";
      if (student.classes) {
        student.classes.forEach((c: any) => {
          c.status = "SUSPENDED";
        });
      }
      queryClient.invalidateQueries({ queryKey: ["admin-students-management"] });
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.invalidateQueries({ queryKey: ["class-workspace"] });

      onArchive(studentId, archiveReason, {
        returnDate,
        transferClass,
        notes: archiveNotes,
      });
      setArchiveDialogOpen(false);
      toast({ title: "Đã chuyển học viên sang mục Lưu trữ và Bảo lưu" });

      if (onUpdate) {
        onUpdate(studentId, { isReserved: true, status: "suspended" });
      }
    } catch (err: any) {
      toast({ title: "Lỗi", description: err.message || "Không thể lưu trữ", variant: "destructive" });
    }
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmText.toUpperCase() !== "DELETE") {
      toast({ title: "Lỗi", description: "Vui lòng nhập chính xác chữ DELETE để xác nhận", variant: "destructive" });
      return;
    }
    onDelete(student.id);
    setDeleteDialogOpen(false);
    onOpenChange(false);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="right" className="w-full sm:max-w-xl p-0 flex flex-col h-full bg-background overflow-hidden border-l">
          {/* 1. STICKY HEADER */}
          <div className="p-4 border-b bg-muted/20 flex items-center justify-between sticky top-0 z-10 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <Avatar className="h-11 w-11 border">
                <AvatarImage src={student.avatarUrl} />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {fullName ? fullName.substring(0, 2).toUpperCase() : "HV"}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-base text-foreground leading-none">
                    {fullName || "Học viên chưa đặt tên"}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-muted-foreground hover:text-primary rounded-md"
                    title="Đổi tên / Chỉnh sửa thông tin học viên"
                    onClick={() => setEditDialogOpen(true)}
                  >
                    <Edit className="h-3.5 w-3.5" />
                  </Button>
                  <Badge
                    variant={isAccountLocked ? "destructive" : isReserved ? "outline" : "secondary"}
                    className={
                      isAccountLocked
                        ? "text-[10px] px-1.5 py-0"
                        : isReserved
                        ? "text-[10px] px-2 py-0.5 bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-700 font-semibold"
                        : "text-[10px] px-1.5 py-0 text-emerald-700 bg-emerald-50 border-emerald-200"
                    }
                  >
                    {isAccountLocked ? "🔒 Đã khóa TK" : isReserved ? "⏸️ Đang bảo lưu" : "🟢 Hoạt động"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {classNames} • {student.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 text-xs text-primary border-primary/30 hover:bg-primary/5 font-semibold"
                onClick={() => setEditDialogOpen(true)}
              >
                <Edit className="h-3.5 w-3.5" />
                Đổi tên
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-1 text-xs text-muted-foreground hover:text-foreground"
                onClick={() => toast({ title: "Hồ sơ học viên", description: `ID: ${student.id || student.userId}` })}
              >
                Mở toàn trang
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          {/* SCROLLABLE BODY CONTENT */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {/* 2. QUICK ACTIONS */}
            <div className="grid grid-cols-5 gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex flex-col h-14 items-center justify-center gap-1 text-[11px] font-normal border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors"
                onClick={() => setEditDialogOpen(true)}
              >
                <Edit className="h-4 w-4 text-primary" />
                Đổi tên / Sửa
              </Button>
              <Button variant="outline" size="sm" className="flex flex-col h-14 items-center justify-center gap-1 text-[11px] font-normal" onClick={() => toast({ title: "Nhắn tin", description: `Gửi thông báo đến ${student.email}` })}>
                <MessageSquare className="h-4 w-4 text-primary" />
                Nhắn tin
              </Button>
              <Button variant="outline" size="sm" className="flex flex-col h-14 items-center justify-center gap-1 text-[11px] font-normal" onClick={() => toast({ title: "Đổi lớp", description: "Vui lòng vào chi tiết Lớp học để gán học viên" })}>
                <RefreshCw className="h-4 w-4 text-primary" />
                Đổi lớp
              </Button>
              <Button
                variant={isReserved ? "default" : "outline"}
                size="sm"
                disabled={isTogglingReservation}
                className={`flex flex-col h-14 items-center justify-center gap-1 text-[11px] transition-all relative group ${
                  isReserved
                    ? "bg-amber-500 hover:bg-amber-600 text-white dark:bg-amber-600 dark:hover:bg-amber-700 font-semibold shadow-xs ring-2 ring-amber-300 dark:ring-amber-800"
                    : "font-normal border-amber-500/30 hover:bg-amber-50 hover:text-amber-700 dark:hover:bg-amber-950/40"
                }`}
                onClick={handleToggleReservation}
                title={isReserved ? "Click để Mở bảo lưu (Tiếp tục học)" : "Click để Đặt bảo lưu học viên"}
              >
                {isReserved ? (
                  <PlayCircle className="h-4 w-4 text-white animate-pulse" />
                ) : (
                  <PauseCircle className="h-4 w-4 text-amber-600" />
                )}
                {isReserved ? "Mở bảo lưu" : "Bảo lưu"}
              </Button>
              <Button variant="outline" size="sm" className="flex flex-col h-14 items-center justify-center gap-1 text-[11px] font-normal" onClick={() => toast({ title: "Reset mật khẩu", description: "Đã gửi hướng dẫn reset mật khẩu về email học viên" })}>
                <Key className="h-4 w-4 text-muted-foreground" />
                Reset Pass
              </Button>
            </div>

            {/* 3. MINI NOTIFICATIONS / STATUS BADGES */}
            <div className="flex flex-wrap gap-2">
              {isAccountLocked ? (
                <Badge variant="destructive" className="text-xs py-1 px-2.5 flex items-center gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  Tài khoản đang bị khóa
                </Badge>
              ) : isReserved ? (
                <Badge variant="outline" className="text-xs py-1 px-2.5 text-amber-800 bg-amber-50 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-700 flex items-center gap-1.5 font-medium">
                  <PauseCircle className="h-3.5 w-3.5 text-amber-600" />
                  Học viên đang trong trạng thái Bảo lưu
                </Badge>
              ) : healthScore != null && healthScore < 60 ? (
                <Badge variant="destructive" className="text-xs py-1 px-2.5 flex items-center gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  Cần hỗ trợ học thuật
                </Badge>
              ) : (!student.classes || student.classes.length === 0) ? (
                <Badge variant="outline" className="text-xs py-1 px-2.5 text-muted-foreground flex items-center gap-1.5">
                  <Info className="h-3.5 w-3.5" />
                  Chưa phân lớp học
                </Badge>
              ) : (
                <Badge variant="outline" className="text-xs py-1 px-2.5 text-emerald-700 bg-emerald-50 border-emerald-200 flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Hoạt động bình thường
                </Badge>
              )}
            </div>

            {/* 4. CURRENT FOCUS / RECENT ACTIVITY */}
            <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-transparent border border-primary/20 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5" />
                  Trọng tâm & Hoạt động gần nhất
                </span>
                {lastActivity?.timestamp && (
                  <Badge variant="outline" className="bg-background text-[10px]">
                    {new Date(lastActivity.timestamp).toLocaleDateString("vi-VN")}
                  </Badge>
                )}
              </div>
              {lastActivity ? (
                <>
                  <p className="font-medium text-sm">{lastActivity.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {lastActivity.description || (lastActivity.score != null ? `Điểm số: ${lastActivity.score}` : "Đã hoàn thành")}
                  </p>
                </>
              ) : (
                <p className="text-xs text-muted-foreground">Chưa có bài tập hoặc nhiệm vụ học tập ghi nhận gần đây.</p>
              )}
            </div>

            {/* 5. ACADEMIC HEALTH & OVERVIEW */}
            <div className="border rounded-xl p-4 bg-card space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">Sức khỏe Học thuật</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs text-xs space-y-1">
                        <p className="font-bold">Công thức Academic Health Score:</p>
                        <p>• Tỷ lệ điểm danh: 30%</p>
                        <p>• Hoàn thành bài tập: 40%</p>
                        <p>• Tỷ lệ bài đã chấm: 30%</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex items-center gap-2">
                  {healthScore != null ? (
                    <>
                      <span className={`text-lg font-bold ${isHealthy ? "text-success" : isNeedsAttention ? "text-warning" : "text-destructive"}`}>
                        {healthScore}/100
                      </span>
                      <Badge variant={isHealthy ? "success" : isNeedsAttention ? "warning" : "destructive"}>
                        {isHealthy ? (
                          <>
                            <CheckCircle2 className="h-3 w-3" /> Tốt
                          </>
                        ) : isNeedsAttention ? (
                          <>
                            <AlertTriangle className="h-3 w-3" /> Cần chú ý
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="h-3 w-3" /> Rủi ro cao
                          </>
                        )}
                      </Badge>
                    </>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-muted-foreground font-medium">Chưa đánh giá</span>
                      <Badge variant="outline" className="text-[10px] text-muted-foreground">Chưa có dữ liệu</Badge>
                    </div>
                  )}
                </div>
              </div>

              <Progress value={healthScore ?? 0} className="h-2" />

              <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t">
                <div>
                  <span className="text-muted-foreground">Lớp & Khóa:</span>
                  <p className="font-medium mt-0.5">
                    {classNames} {courseName ? `(${courseName})` : ""}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Giáo viên phụ trách:</span>
                  <p className="font-medium mt-0.5 flex items-center gap-1">
                    <GraduationCap className="h-3.5 w-3.5 text-primary" />
                    {teacherName}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Tiến độ bài tập:</span>
                  <p className="font-medium mt-0.5">{hwRatio}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Chuyên cần:</span>
                  <p className="font-medium mt-0.5">{attendanceRate}</p>
                </div>
              </div>
            </div>

            {/* 6. GUARDIAN / PARENT SECTION */}
            <div className="border rounded-xl p-4 bg-muted/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <UserCheck className="h-3.5 w-3.5" />
                  Thông tin Phụ huynh (Guardian)
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 text-[11px] text-muted-foreground hover:text-primary gap-1 p-1 px-2"
                  onClick={() => setEditDialogOpen(true)}
                >
                  <Edit className="h-3 w-3" /> Chỉnh sửa
                </Button>
              </div>
              <div className="flex items-center justify-between text-xs pt-1">
                <div>
                  <p className="font-semibold text-sm">{parentNameDisplay || "Chưa cập nhật"}</p>
                  <p className="text-muted-foreground flex items-center gap-1 mt-0.5">
                    <Phone className="h-3 w-3" /> {parentPhoneDisplay || "Chưa có SĐT"}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-muted-foreground">Lần liên hệ cuối:</span>
                  <p className="font-medium">{lastContactDate || "Chưa ghi nhận"}</p>
                </div>
              </div>
            </div>

            {/* 7. UNIFIED TIMELINE (GitHub Activity Style) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  Dòng thời gian hoạt động (Timeline)
                </span>
                <span className="text-[11px] text-muted-foreground">Gần nhất: {lastActivityText}</span>
              </div>

              {student.recentActivities && student.recentActivities.length > 0 ? (
                <div className="relative pl-4 space-y-4 border-l-2 border-muted ml-2 text-xs">
                  {student.recentActivities.map((act: any, idx: number) => {
                    const isSubmission = act.type === "submission";
                    const isAttendance = act.type === "attendance";

                    return (
                      <div key={idx} className="relative">
                        <div className={`absolute -left-[21px] top-0.5 rounded-full p-0.5 ${
                          isSubmission ? "bg-success text-success-foreground" :
                          isAttendance ? "bg-primary text-primary-foreground" :
                          "bg-muted-foreground text-background"
                        }`}>
                          {isSubmission ? <CheckCircle2 className="h-3 w-3" /> :
                           isAttendance ? <Calendar className="h-3 w-3" /> :
                           <User className="h-3 w-3" />}
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-foreground">{act.title}</p>
                            <span className="text-[10px] text-muted-foreground">
                              {act.timestamp ? new Date(act.timestamp).toLocaleDateString("vi-VN") : ""}
                            </span>
                          </div>
                          {act.description && (
                            <p className="text-muted-foreground mt-0.5">{act.description}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-4 border rounded-lg bg-muted/10 text-center text-xs text-muted-foreground">
                  Chưa có lịch sử hoạt động ghi nhận cho học viên này.
                </div>
              )}
            </div>

            <Separator />

            {/* 8. LIFECYCLE MANAGEMENT (Quản lý vòng đời nhạy cảm) */}
            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-1.5 text-destructive font-semibold text-xs uppercase tracking-wider">
                <ShieldAlert className="h-4 w-4 text-destructive" />
                Quản lý vòng đời tài khoản
              </div>
              <p className="text-xs text-muted-foreground">
                Thực hiện các thao tác lưu trữ dữ liệu hoặc thay đổi trạng thái hoạt động vĩnh viễn của học viên.
              </p>

              <div className="flex items-center justify-between gap-2 pt-1">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={isTogglingReservation}
                  className={`w-full gap-1.5 text-xs transition-colors ${
                    isReserved
                      ? "border-emerald-500/50 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 font-semibold"
                      : "border-warning/40 text-foreground hover:bg-warning/10"
                  }`}
                  onClick={isReserved ? handleToggleReservation : () => setArchiveDialogOpen(true)}
                >
                  {isReserved ? (
                    <>
                      <PlayCircle className="h-3.5 w-3.5 text-emerald-600 animate-pulse" />
                      Mở lại trạng thái học
                    </>
                  ) : (
                    <>
                      <Archive className="h-3.5 w-3.5 text-warning" />
                      Lưu trữ / Đặt bảo lưu...
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-destructive/40 text-destructive hover:bg-destructive/10 gap-1.5 text-xs"
                  onClick={() => setDeleteDialogOpen(true)}
                >
                  <Trash2 className="h-3.5 w-3.5 text-destructive" />
                  Xóa vĩnh viễn...
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* DIALOG: EDIT STUDENT PROFILE / RENAME */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base">
              <Edit className="h-4 w-4 text-primary" />
              Chỉnh sửa thông tin & Đổi tên học viên
            </DialogTitle>
            <DialogDescription className="text-xs">
              Cập nhật họ tên thật và thông tin liên lạc của học viên để hiển thị chuẩn xác trên hệ thống và báo cáo học tập.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3.5 py-2 text-xs">
            <div className="p-2.5 rounded-lg bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-slate-700 dark:text-slate-300">
              <p className="font-semibold text-blue-900 dark:text-blue-300">• Email tài khoản: <span className="font-mono text-xs">{student.email}</span></p>
              <p className="text-[11px] text-blue-700 dark:text-blue-400 mt-0.5">Hệ thống có thể đã lấy tên mặc định từ Google Email. Bạn có thể đổi sang họ tên thật có dấu đầy đủ của học viên dưới đây.</p>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-foreground">
                Họ và tên học viên (Họ tên thật) *
              </Label>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ví dụ: Trương Bích Vân"
                className="h-9 text-xs font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-foreground">
                Số điện thoại học viên
              </Label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ví dụ: 0901234567"
                className="h-9 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1 border-t">
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-foreground">
                  Tên Phụ huynh (Guardian)
                </Label>
                <Input
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Văn A"
                  className="h-9 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-foreground">
                  SĐT Phụ huynh
                </Label>
                <Input
                  value={parentPhone}
                  onChange={(e) => setParentPhone(e.target.value)}
                  placeholder="0909876543"
                  className="h-9 text-xs"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setEditDialogOpen(false)}>
              Hủy
            </Button>
            <Button
              size="sm"
              disabled={isSaving}
              onClick={handleSaveProfile}
              className="bg-primary gap-1.5 font-semibold"
            >
              {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* DIALOG 1: ARCHIVE WITH METADATA */}
      <Dialog open={archiveDialogOpen} onOpenChange={setArchiveDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Archive className="h-5 w-5 text-amber-600" />
              Lưu trữ hồ sơ Học viên
            </DialogTitle>
            <DialogDescription>
              Hồ sơ học viên sẽ được chuyển sang mục Lưu trữ (Archived). Mọi dữ liệu bài tập và lịch sử học tập vẫn được bảo toàn nguyên vẹn.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Lý do lưu trữ *</Label>
              <Select value={archiveReason} onValueChange={setArchiveReason}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn lý do" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="finished">Hoàn thành khóa học (Graduated)</SelectItem>
                  <SelectItem value="long_term_pause">Bảo lưu dài hạn</SelectItem>
                  <SelectItem value="transfer">Chuyển cơ sở / Chuyển lớp</SelectItem>
                  <SelectItem value="refund">Rút học phí / Bỏ học (Dropout)</SelectItem>
                  <SelectItem value="duplicate">Tài khoản trùng / Thử nghiệm</SelectItem>
                  <SelectItem value="other">Lý do khác</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* METADATA DỰA TRÊN LÝ DO */}
            {archiveReason === "long_term_pause" && (
              <div className="space-y-2">
                <Label>Ngày dự kiến quay lại học</Label>
                <Input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
              </div>
            )}

            {archiveReason === "transfer" && (
              <div className="space-y-2">
                <Label>Lớp / Cơ sở chuyển tới</Label>
                <Input placeholder="Ví dụ: IELTS Master 01 - Cơ sở Quận 3" value={transferClass} onChange={(e) => setTransferClass(e.target.value)} />
              </div>
            )}

            <div className="space-y-2">
              <Label>Ghi chú bổ sung</Label>
              <Textarea
                placeholder="Nhập chi tiết thông tin hỗ trợ bảo lưu / lưu trữ..."
                value={archiveNotes}
                onChange={(e) => setArchiveNotes(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setArchiveDialogOpen(false)}>Hủy</Button>
            <Button className="bg-warning hover:bg-warning/90 text-warning-foreground" onClick={handleConfirmArchive}>
              Xác nhận Lưu trữ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* DIALOG 2: HARD DELETE PERMANENTLY CONFIRMATION */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Cảnh báo: Xóa vĩnh viễn dữ liệu
            </DialogTitle>
            <DialogDescription className="text-destructive/80">
              Hành động này sẽ <strong>xóa vĩnh viễn</strong> tài khoản học viên <strong>{student.fullName}</strong> cùng toàn bộ bài nộp, điểm số và nhận xét. Hành động này không thể hoàn tác!
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-2">
            <Label className="text-xs">Gõ chữ <strong>DELETE</strong> để xác nhận hành động xóa nguy hiểm:</Label>
            <Input
              placeholder="Nhập DELETE"
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              className="border-destructive/40 focus-visible:ring-destructive font-mono"
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Hủy</Button>
            <Button
              variant="destructive"
              disabled={deleteConfirmText.toUpperCase() !== "DELETE"}
              onClick={handleConfirmDelete}
            >
              Xóa vĩnh viễn
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
