import React, { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { HomeworkProgressStrip } from "./HomeworkProgressStrip";
import { CheckCircle2, MessageSquare, Clock, UserMinus, FileText, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usersApi } from "@/lib/api";
import { toast } from "sonner";

interface StudentDrawerProps {
  student: any | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRemoveStudent?: (student: any) => void;
  onOpenReport?: (student: any) => void;
  onUpdateStudent?: (studentId: string, data: any) => void;
}

export const StudentDrawer: React.FC<StudentDrawerProps> = ({
  student,
  open,
  onOpenChange,
  onRemoveStudent,
  onOpenReport,
  onUpdateStudent,
}) => {
  const queryClient = useQueryClient();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (student) {
      setFullName(student.fullName || "");
      setPhone(student.phone || "");
    }
  }, [student]);

  if (!student) return null;

  const handleSaveProfile = async () => {
    if (!fullName.trim()) {
      toast.error("Họ và tên học viên không được để trống");
      return;
    }
    setIsSaving(true);
    try {
      const studentId = student.studentId || student.id;
      await usersApi.update(studentId, {
        fullName: fullName.trim(),
        phone: phone.trim(),
      });

      student.fullName = fullName.trim();
      student.phone = phone.trim();

      queryClient.invalidateQueries({ queryKey: ["class-workspace"] });
      queryClient.invalidateQueries({ queryKey: ["admin-students-management"] });
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });

      toast.success("Đã cập nhật họ tên học viên thành công");
      setEditDialogOpen(false);

      if (onUpdateStudent) {
        onUpdateStudent(studentId, { fullName: fullName.trim(), phone: phone.trim() });
      }
    } catch (err: any) {
      toast.error(err.message || "Không thể cập nhật tên học viên");
    } finally {
      setIsSaving(false);
    }
  };

  // Feedback history from real submissions
  const feedbackHistory: any[] = student?.feedbackHistory || [];

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-full sm:max-w-2xl p-6 overflow-y-auto space-y-6">
          <SheetHeader className="px-0 pt-0 border-b pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={student.avatarUrl} />
                  <AvatarFallback className="bg-emerald-100 text-emerald-800 font-bold">
                    {(fullName || "HV")?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-1.5">
                    <SheetTitle className="text-xl font-bold">
                      {fullName || "Học viên"}
                    </SheetTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-muted-foreground hover:text-primary rounded-md"
                      title="Đổi tên / Chỉnh sửa học viên"
                      onClick={() => setEditDialogOpen(true)}
                    >
                      <Edit className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <SheetDescription className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                    <span>{student.email}</span>
                    <span>•</span>
                    <Badge
                      variant="outline"
                      className={
                        student.is_active === false || student.status === "suspended" || student.isReserved
                          ? "text-xs text-amber-700 bg-amber-50 border-amber-300 font-medium"
                          : "text-xs text-emerald-600 bg-emerald-50"
                      }
                    >
                      {student.status === "suspended" || student.isReserved
                        ? "⏸️ Đang bảo lưu"
                        : student.is_active === false
                        ? "🔒 Tạm nghỉ / Khóa"
                        : "Active Student"}
                    </Badge>
                  </SheetDescription>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setEditDialogOpen(true)}
                  className="gap-1.5 text-xs font-semibold border-primary/30 text-primary hover:bg-primary/5 shrink-0"
                >
                  <Edit className="h-3.5 w-3.5" />
                  Đổi tên
                </Button>
                {onOpenReport && (
                  <Button
                    size="sm"
                    onClick={() => onOpenReport(student)}
                    className="gap-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs shrink-0"
                    title="Đánh giá cuối khóa & Xuất thẻ báo cáo học tập"
                  >
                    <FileText className="h-4 w-4" />
                    Báo cáo
                  </Button>
                )}
              </div>
            </div>
          </SheetHeader>

          {/* Homework Progress Strip */}
          <HomeworkProgressStrip
            totalHomeworks={student.totalHomeworks || 0}
            completedCount={student.completedHw || 0}
            items={student.homeworkItems}
            onSelectHomework={(hwNum, item) => {
              if (item?.title) {
                toast.info(`Bài tập ${hwNum}: ${item.title} (${item.status === 'done' ? 'Đã nộp' : item.status === 'missed' ? 'Quá hạn' : 'Chưa nộp'})`);
              }
            }}
          />

          {/* Teacher Feedback History Timeline */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-emerald-600" />
              Lịch sử nhận xét của giáo viên
            </h4>
            {(student.feedbackHistory || feedbackHistory).length === 0 ? (
              <div className="p-6 border rounded-lg bg-muted/20 text-center text-xs text-muted-foreground">
                Chưa có nhận xét nào cho học viên này.
              </div>
            ) : (
              <div className="space-y-3 pl-2 border-l-2 border-slate-200 dark:border-slate-800">
                {(student.feedbackHistory || feedbackHistory).map((item: any, idx: number) => (
                  <div key={idx} className="relative pl-4 space-y-1">
                    <div className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-background" />
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-900 dark:text-slate-100">{item.hw}</span>
                      <span className="text-muted-foreground">{item.date}</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 bg-muted/40 p-2.5 rounded-md">
                      {item.note}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Class Membership Action */}
          {onRemoveStudent && (
            <div className="pt-4 border-t space-y-2">
              <div className="flex items-center justify-between p-3 rounded-lg bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40">
                <div>
                  <h5 className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <UserMinus className="h-3.5 w-3.5 text-rose-600" />
                    Rút học viên khỏi lớp
                  </h5>
                  <p className="text-[11px] text-muted-foreground">
                    Gỡ học viên khỏi lớp này. Hồ sơ và bài làm tổng thể vẫn được bảo lưu.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-rose-600 border-rose-200 hover:bg-rose-100 hover:text-rose-700 text-xs shrink-0"
                  onClick={() => onRemoveStudent(student)}
                >
                  Đưa ra khỏi lớp
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* EDIT STUDENT PROFILE / RENAME DIALOG */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base">
              <Edit className="h-4 w-4 text-primary" />
              Đổi tên & Chỉnh sửa thông tin học viên
            </DialogTitle>
            <DialogDescription className="text-xs">
              Cập nhật họ tên thật có dấu của học viên để hiển thị chuẩn xác trên lớp học và báo cáo.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-2 text-xs">
            <div className="p-2.5 rounded-lg bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-slate-700 dark:text-slate-300">
              <p className="font-semibold text-blue-900 dark:text-blue-300">• Email tài khoản: <span className="font-mono text-xs">{student.email}</span></p>
              <p className="text-[11px] text-blue-700 dark:text-blue-400 mt-0.5">Tên hiển thị mặc định từ Google Email có thể chưa chuẩn. Bạn có thể đổi sang họ tên thật tại đây.</p>
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
                Số điện thoại
              </Label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ví dụ: 0901234567"
                className="h-9 text-xs"
              />
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
    </>
  );
};

