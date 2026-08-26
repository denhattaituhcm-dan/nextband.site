import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { classesApi, ClassGraduationSummary, ClassGraduationStudent } from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import {
  GraduationCap,
  Award,
  CheckCircle2,
  AlertTriangle,
  Clock,
  BookOpen,
  Calendar,
  Users,
  Download,
  Lock,
  Sparkles,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ClassGraduationModalProps {
  classId: string;
  isOpen: boolean;
  onClose: () => void;
  isAlreadyClosed?: boolean;
}

export const ClassGraduationModal: React.FC<ClassGraduationModalProps> = ({
  classId,
  isOpen,
  onClose,
  isAlreadyClosed = false,
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [confirmCloseOpen, setConfirmCloseOpen] = useState(false);

  const { data: summary, isLoading } = useQuery<ClassGraduationSummary>({
    queryKey: ["class-graduation-summary", classId],
    queryFn: () => classesApi.getGraduationSummary(classId),
    enabled: isOpen && !!classId,
  });

  const closeMutation = useMutation({
    mutationFn: () => classesApi.close(classId),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["admin-class", classId] });
      queryClient.invalidateQueries({ queryKey: ["admin-classes"] });
      queryClient.invalidateQueries({ queryKey: ["class-graduation-summary", classId] });
      toast({
        title: "Đóng lớp thành công! 🎓",
        description: res.message || "Lớp học đã được đóng và kết quả tốt nghiệp đã được lưu.",
      });
      setConfirmCloseOpen(false);
    },
    onError: (err: any) => {
      toast({
        title: "Lỗi đóng lớp",
        description: err.message || "Không thể đóng lớp học, vui lòng thử lại.",
        variant: "destructive",
      });
      setConfirmCloseOpen(false);
    },
  });

  const handleExportCSV = () => {
    if (!summary || !summary.students) return;

    const headers = [
      "Họ và tên",
      "Email",
      "Số bài đã nộp",
      "Tổng số bài tập",
      "Tỷ lệ hoàn thành (%)",
      "Số bài đúng hạn",
      "Số bài nộp quá hạn",
      "Tỷ lệ quá hạn (%)",
      "Số buổi có mặt",
      "Tổng số buổi học",
      "Chuyên cần (%)",
      "Danh hiệu vinh danh",
    ];

    const rows = summary.students.map((s) => [
      `"${s.fullName}"`,
      `"${s.email}"`,
      s.submittedCount,
      s.totalHomeworks,
      `${s.completionRate}%`,
      s.onTimeCount,
      s.overdueCount,
      `${s.overdueRate}%`,
      s.attendedSessions,
      s.totalSessions,
      `${s.attendanceRate}%`,
      s.isHonorRoll ? "Thủ khoa Kỷ luật (100% đúng hạn)" : s.completionRate >= 80 ? "Hoàn thành tốt" : "Cần cải thiện",
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Tong_ket_tot_nghiep_${summary.className.replace(/\s+/g, "_")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Đã xuất báo cáo tốt nghiệp!",
      description: "File CSV đã được tải về máy để chuẩn bị bằng khen và phần thưởng.",
    });
  };

  const honorRollStudents = summary?.students?.filter((s) => s.isHonorRoll) || [];

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0 overflow-hidden rounded-2xl">
          {/* DIALOG HEADER */}
          <DialogHeader className="p-5 pb-4 border-b bg-gradient-to-r from-amber-500/10 via-card to-background">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500 text-white shadow-md">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <DialogTitle className="text-lg font-bold text-foreground">
                    Báo Cáo Tổng Kết & Vinh Danh Tốt Nghiệp
                  </DialogTitle>
                  {isAlreadyClosed || summary?.status === "CLOSED" ? (
                    <Badge variant="secondary" className="bg-slate-100 text-slate-700 text-[10px] font-bold">
                      ĐÃ ĐÓNG LỚP
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] font-bold">
                      SẴN SÀNG TỔNG KẾT
                    </Badge>
                  )}
                </div>
                <DialogDescription className="text-xs text-muted-foreground">
                  Lớp: <span className="font-bold text-foreground">{summary?.className || "..."}</span> · Khóa: {summary?.courseTitle} · GV: {summary?.teacherName}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {/* CONTENT AREA */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {isLoading ? (
              <div className="py-16 text-center text-muted-foreground flex flex-col items-center justify-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
                <p className="text-xs font-semibold">Đang tổng hợp dữ liệu nộp bài & chuyên cần toàn khóa...</p>
              </div>
            ) : !summary ? (
              <div className="py-12 text-center text-xs text-muted-foreground">
                Không thể tải dữ liệu tổng kết lớp học.
              </div>
            ) : (
              <>
                {/* 1. TOP METRICS CARDS */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl border bg-card text-center space-y-0.5">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Học viên</p>
                    <p className="text-xl font-black text-foreground">{summary.totalStudents}</p>
                    <p className="text-[10px] text-muted-foreground">toàn khóa</p>
                  </div>

                  <div className="p-3 rounded-xl border bg-card text-center space-y-0.5">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Tổng buổi học</p>
                    <p className="text-xl font-black text-foreground">{summary.totalSessions}</p>
                    <p className="text-[10px] text-muted-foreground">buổi trên lớp</p>
                  </div>

                  <div className="p-3 rounded-xl border bg-card text-center space-y-0.5">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Tổng bài tập</p>
                    <p className="text-xl font-black text-foreground">{summary.totalHomeworks}</p>
                    <p className="text-[10px] text-muted-foreground">bài tập về nhà</p>
                  </div>

                  <div className="p-3 rounded-xl border border-amber-300 bg-amber-50/60 dark:bg-amber-950/20 text-center space-y-0.5 shadow-2xs">
                    <p className="text-[10px] text-amber-800 dark:text-amber-300 uppercase font-black tracking-wider flex items-center justify-center gap-1">
                      <Sparkles className="h-3 w-3 text-amber-600" />
                      Vinh danh 100%
                    </p>
                    <p className="text-xl font-black text-amber-700 dark:text-amber-400">
                      {summary.honorRollCount} <span className="text-xs font-normal">học viên</span>
                    </p>
                    <p className="text-[10px] text-amber-700 font-bold">Kỷ luật tuyệt đối</p>
                  </div>
                </div>

                {/* 2. HONOR ROLL SHOWCASE BANNER */}
                {honorRollStudents.length > 0 && (
                  <div className="rounded-2xl border border-amber-300 dark:border-amber-700 bg-gradient-to-br from-amber-100/60 via-amber-50/40 to-background p-4 shadow-sm space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500 text-white shadow-xs">
                          <Award className="h-4 w-4" />
                        </div>
                        <h4 className="text-xs font-black uppercase tracking-wider text-amber-950 dark:text-amber-200">
                          BẢNG VÀNG KỶ LUẬT TOÀN KHÓA (100% NỘP BÀI ĐÚNG HẠN & HỢP LỆ)
                        </h4>
                      </div>
                      <Badge className="bg-amber-600 text-white font-bold text-[10px]">
                        {honorRollStudents.length} học viên đạt chuẩn
                      </Badge>
                    </div>

                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 pt-1">
                      {honorRollStudents.map((st) => (
                        <div
                          key={st.studentId}
                          className="flex items-center gap-2.5 p-2.5 rounded-xl border border-amber-200/80 bg-card/90 shadow-2xs"
                        >
                          <Avatar className="h-8 w-8 ring-2 ring-amber-400">
                            <AvatarImage src={st.avatarUrl} />
                            <AvatarFallback className="bg-amber-100 text-amber-800 text-xs font-bold">
                              {st.fullName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold text-foreground truncate">{st.fullName}</p>
                            <p className="text-[10px] text-amber-700 font-semibold flex items-center gap-1">
                              <CheckCircle2 className="h-3 w-3 text-emerald-600 inline" />
                              {st.submittedCount}/{st.totalHomeworks} bài đúng hạn (100%)
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. DETAILED STUDENT GRADUATION TABLE */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                    <span>Kết quả chi tiết từng học viên ({summary.students.length})</span>
                    <span className="text-[10px] font-normal normal-case">
                      Xếp loại: 100% nộp đúng hạn = 🎖️ Thủ khoa · $\ge 80\%$ = 🟢 Hoàn thành · $&lt; 80\%$ = 🟡 Cần cải thiện
                    </span>
                  </h4>

                  <div className="border rounded-xl overflow-hidden bg-card shadow-2xs">
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-muted/40 text-muted-foreground font-semibold border-b">
                          <tr>
                            <th className="p-3 pl-4">Học viên</th>
                            <th className="p-3 text-center">Bài tập nộp</th>
                            <th className="p-3 text-center">Đúng hạn</th>
                            <th className="p-3 text-center">Quá hạn</th>
                            <th className="p-3 text-center">Chuyên cần</th>
                            <th className="p-3 text-right pr-4">Danh hiệu</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {summary.students.map((st) => (
                            <tr key={st.studentId} className="hover:bg-muted/30 transition-colors">
                              {/* Học viên */}
                              <td className="p-3 pl-4 font-semibold text-foreground">
                                <div className="flex items-center gap-2.5">
                                  <Avatar className="h-7 w-7">
                                    <AvatarImage src={st.avatarUrl} />
                                    <AvatarFallback className="bg-muted text-muted-foreground text-[10px] font-bold">
                                      {st.fullName.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <span>{st.fullName}</span>
                                    <span className="text-[10px] text-muted-foreground block">{st.email}</span>
                                  </div>
                                </div>
                              </td>

                              {/* Bài tập nộp */}
                              <td className="p-3 text-center">
                                <span className="font-bold text-foreground">
                                  {st.submittedCount}/{st.totalHomeworks}
                                </span>
                                <span className="text-[10px] text-muted-foreground block">
                                  ({st.completionRate}%)
                                </span>
                              </td>

                              {/* Đúng hạn */}
                              <td className="p-3 text-center font-semibold text-emerald-600">
                                {st.onTimeCount} bài
                              </td>

                              {/* Quá hạn */}
                              <td className="p-3 text-center">
                                {st.overdueCount > 0 ? (
                                  <span className="font-bold text-rose-600">
                                    {st.overdueCount} bài ({st.overdueRate}%)
                                  </span>
                                ) : (
                                  <span className="text-muted-foreground">0%</span>
                                )}
                              </td>

                              {/* Chuyên cần */}
                              <td className="p-3 text-center">
                                <span className="font-bold text-foreground">
                                  {st.attendedSessions}/{st.totalSessions}
                                </span>
                                <span className="text-[10px] text-muted-foreground block">
                                  ({st.attendanceRate}%)
                                </span>
                              </td>

                              {/* Danh hiệu */}
                              <td className="p-3 text-right pr-4">
                                {st.isHonorRoll ? (
                                  <Badge className="bg-amber-500 text-white font-bold text-[10px] shadow-2xs gap-1">
                                    <Award className="h-3 w-3" />
                                    🎖️ Kỷ luật Xuất sắc
                                  </Badge>
                                ) : st.completionRate >= 80 ? (
                                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] font-semibold">
                                    🟢 Hoàn thành
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-[10px]">
                                    🟡 Cần cải thiện
                                  </Badge>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* DIALOG FOOTER */}
          <DialogFooter className="p-4 border-t bg-muted/20 flex flex-col sm:flex-row items-center justify-between gap-2.5">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleExportCSV}
              disabled={isLoading || !summary}
              className="text-xs h-9 gap-1.5 w-full sm:w-auto"
            >
              <Download className="h-3.5 w-3.5" />
              Xuất danh sách vinh danh (CSV)
            </Button>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <Button type="button" variant="ghost" size="sm" onClick={onClose} className="text-xs h-9">
                Đóng lại
              </Button>

              {!isAlreadyClosed && summary?.status !== "CLOSED" && (
                <Button
                  type="button"
                  size="sm"
                  onClick={() => setConfirmCloseOpen(true)}
                  disabled={isLoading || closeMutation.isPending}
                  className="text-xs h-9 gap-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-sm"
                >
                  <Lock className="h-3.5 w-3.5" />
                  Xác nhận Đóng lớp chính thức
                </Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* CONFIRMATION ALERT DIALOG */}
      <AlertDialog open={confirmCloseOpen} onOpenChange={setConfirmCloseOpen}>
        <AlertDialogContent className="max-w-md rounded-2xl">
          <AlertDialogHeader>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-600 mb-2">
              <Lock className="h-5 w-5" />
            </div>
            <AlertDialogTitle className="text-base font-bold">
              Xác nhận đóng lớp học "{summary?.className}"?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs text-muted-foreground space-y-2">
              <p>
                Khi đóng lớp học:
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Trạng thái lớp chuyển thành <strong>CLOSED</strong>.</li>
                <li>Tất cả học viên active được đánh dấu <strong>COMPLETED (Tốt nghiệp)</strong>.</li>
                <li>Gửi thông báo hoàn thành khóa học đến toàn bộ học viên.</li>
                <li>Kết quả nộp bài và chuyên cần toàn khóa sẽ được lưu vĩnh viễn vào hồ sơ.</li>
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-xs h-8">Hủy bỏ</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => closeMutation.mutate()}
              disabled={closeMutation.isPending}
              className="text-xs h-8 bg-rose-600 hover:bg-rose-700 text-white font-bold"
            >
              {closeMutation.isPending ? "Đang đóng lớp..." : "Đồng ý Đóng lớp"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
