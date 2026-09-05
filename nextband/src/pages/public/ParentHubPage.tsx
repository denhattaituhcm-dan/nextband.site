import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { parentHubApi, ParentReportData } from "@/lib/api";
import {
  Flame,
  CheckCircle2,
  AlertTriangle,
  Award,
  BookOpen,
  Calendar,
  Sparkles,
  Heart,
  ChevronRight,
  ShieldCheck,
  Send,
  PhoneCall,
  MessageCircle,
  Clock,
  User,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function ParentHubPage() {
  const { token } = useParams<{ token: string }>();
  const queryClient = useQueryClient();

  const [isReEnrollModalOpen, setIsReEnrollModalOpen] = useState(false);
  const [parentPhoneInput, setParentPhoneInput] = useState("");
  const [hasCheered, setHasCheered] = useState(false);

  // Fetch Parent Hub Report Data
  const {
    data: report,
    isLoading,
    isError,
    error,
  } = useQuery<ParentReportData>({
    queryKey: ["parent-report", token],
    queryFn: () => parentHubApi.getParentReport(token || ""),
    enabled: !!token,
    staleTime: 0, // Always fresh on Zalo In-App Browser
  });

  // Cheer Mutation
  const cheerMutation = useMutation({
    mutationFn: () => parentHubApi.cheerStudent(token || ""),
    onSuccess: () => {
      setHasCheered(true);
      toast.success("❤️ Đã gửi lời khen và động viên đến con!");
      queryClient.invalidateQueries({ queryKey: ["parent-report", token] });
    },
    onError: (err: any) => {
      toast.error(err.message || "Không thể gửi lời động viên lúc này");
    },
  });

  // Re-Enrollment Request Mutation
  const reEnrollMutation = useMutation({
    mutationFn: (phone: string) =>
      parentHubApi.requestReEnrollment({
        token,
        parentPhone: phone,
        scholarshipAmount: report?.snapshot.scholarshipAmount || 500000,
      }),
    onSuccess: (data) => {
      setIsReEnrollModalOpen(false);
      toast.success("Đã tiếp nhận yêu cầu! Đang mở Zalo tư vấn viên...");
      setTimeout(() => {
        if (data.zaloDeepLink) {
          window.location.href = data.zaloDeepLink;
        }
      }, 800);
    },
    onError: (err: any) => {
      toast.error(err.message || "Không thể gửi yêu cầu tái tục");
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-white">
        <div className="w-10 h-10 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-xs font-semibold text-slate-400 tracking-wider uppercase animate-pulse">
          Đang tải báo cáo tiến độ NextBand...
        </p>
      </div>
    );
  }

  if (isError || !report) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center text-white">
        <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-4">
          <AlertTriangle className="w-7 h-7" />
        </div>
        <h1 className="text-lg font-bold text-slate-100">Liên kết không hợp lệ hoặc đã đổi</h1>
        <p className="text-xs text-slate-400 mt-2 max-w-sm">
          Đường dẫn báo cáo có thể đã được cập nhật bởi giáo viên để bảo mật. Quý phụ huynh vui lòng liên hệ giáo viên phụ trách để nhận lại liên kết mới.
        </p>
      </div>
    );
  }

  const { student, classInfo, snapshot, teacherEvaluation, canReEnroll, hotlinePhone } = report;
  const currentWeek = snapshot.weekNumber || classInfo.currentWeek || 1;
  const totalWeeks = classInfo.totalWeeks || 10;
  const scholarshipAmountFormatted = `${(snapshot.scholarshipAmount || 0).toLocaleString("vi-VN")}đ`;
  const isTierEligible = snapshot.scholarshipAmount > 0;

  const handleOpenReEnroll = () => {
    setParentPhoneInput(student.parentPhone || "");
    setIsReEnrollModalOpen(true);
  };

  const handleConfirmReEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    reEnrollMutation.mutate(parentPhoneInput);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center selection:bg-amber-500/30">
      {/* Mobile-First Frame: 430px max width for mobile feel on desktop */}
      <div className="w-full max-w-md flex flex-col min-h-screen pb-12 shadow-2xl bg-slate-900 border-x border-slate-800/80">
        
        {/* 1. TOP HEADER & BRAND BAR */}
        <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md px-5 py-3.5 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-300 p-0.5 shadow-md shadow-amber-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center">
                <span className="font-black text-xs text-amber-400 tracking-tighter">NB</span>
              </div>
            </div>
            <div>
              <div className="text-[13px] font-black tracking-tight text-white flex items-center gap-1.5">
                NextBand Hub
                <Badge variant="outline" className="text-[9px] px-1.5 py-0 h-4 border-amber-500/40 text-amber-400 bg-amber-500/10 font-bold uppercase">
                  Parent View
                </Badge>
              </div>
              <div className="text-[10px] text-slate-400 font-medium">Báo cáo minh bạch & Kỷ luật học tập</div>
            </div>
          </div>

          <Badge className="bg-slate-800 hover:bg-slate-800 text-slate-300 text-[10.5px] font-bold border border-slate-700 px-2.5 py-1">
            Tuần {currentWeek} / {totalWeeks}
          </Badge>
        </header>

        {/* 2. STUDENT HERO CARD */}
        <div className="p-4 pt-5">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/90 via-slate-850 to-slate-900 border border-slate-700/60 p-4 shadow-lg">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-start gap-3.5">
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 p-0.5 shadow-md shrink-0">
                <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center overflow-hidden">
                  {student.avatarUrl ? (
                    <img src={student.avatarUrl} alt={student.name} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-6 h-6 text-amber-400" />
                  )}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-white truncate">{student.name}</h2>
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                </div>
                <div className="text-xs text-slate-400 mt-0.5 truncate flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  Lớp: <span className="font-medium text-slate-200">{student.className}</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1.5">
                  <span>GV: <span className="text-slate-300 font-medium">{student.teacherName}</span></span>
                  <span className="text-slate-600">•</span>
                  <Badge variant="secondary" className="text-[10px] py-0 px-1.5 bg-blue-950/60 text-blue-300 border border-blue-800/50">
                    {student.targetBand || "IELTS Target"}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Quick Micro Status */}
            <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                Chốt tuần: 18:00 Chủ Nhật
              </span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Đã đóng băng dữ liệu
              </span>
            </div>
          </div>
        </div>

        {/* 3. DISCIPLINE & HOMEWORK METRICS (Clean Luxury Grid) */}
        <div className="px-4 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            Kỷ Luật Rèn Luyện Tuần Này
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {/* Homework Progress Pod */}
            <div className="bg-slate-850 rounded-xl p-3.5 border border-slate-800 relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-semibold text-slate-400">Bài Tập Về Nhà</div>
                <div className="text-2xl font-black text-white mt-1">
                  {snapshot.hwCompleted}
                  <span className="text-xs font-medium text-slate-400">/{snapshot.hwTotal} bài</span>
                </div>
              </div>

              <div className="mt-3">
                <div className="flex justify-between text-[10px] font-bold mb-1">
                  <span className="text-slate-400">Tỷ lệ hoàn thành</span>
                  <span className={snapshot.hwRate >= 80 ? "text-emerald-400" : "text-amber-400"}>
                    {snapshot.hwRate}%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      snapshot.hwRate >= 80 ? "bg-emerald-500" : "bg-amber-500"
                    }`}
                    style={{ width: `${Math.min(100, snapshot.hwRate)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Streak & Habit Pod */}
            <div className="bg-slate-850 rounded-xl p-3.5 border border-slate-800 relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-semibold text-slate-400 flex items-center justify-between">
                  <span>Chuỗi Kỷ Luật</span>
                  <span className="text-base">🔥</span>
                </div>
                <div className="text-2xl font-black text-amber-400 mt-1 flex items-baseline gap-1">
                  {snapshot.streakDays}
                  <span className="text-xs font-medium text-slate-400">bài đúng hạn</span>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10.5px] text-slate-300 flex items-center justify-between">
                <span>Chuyên cần:</span>
                <span className="font-bold text-emerald-400">{snapshot.attendanceRate}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. ARIS SCHOLARSHIP CARD (Loss Aversion Engine) */}
        <div className="px-4 mt-4">
          <div className="rounded-2xl bg-gradient-to-br from-amber-500/15 via-slate-850 to-slate-900 border border-amber-500/30 p-4 shadow-xl relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/40 text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider flex items-center gap-1">
                  <Award className="w-3 h-3 text-amber-400" />
                  Học Bổng Kỷ Luật ARIS
                </Badge>
                <div className="text-xs text-slate-400 mt-1">Mức thưởng đang bảo lưu cho khóa tiếp theo:</div>
              </div>
              <div className="text-right">
                <div className="text-xl font-black text-amber-400 tracking-tight">
                  {scholarshipAmountFormatted}
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">
                  {snapshot.scholarshipTier !== "NONE" ? snapshot.scholarshipTier.replace("_", " ") : "Chưa đạt mốc"}
                </div>
              </div>
            </div>

            {/* Loss Aversion Warning Banner */}
            <div className="mt-3.5 p-2.5 rounded-xl bg-slate-900/80 border border-amber-500/25 flex items-start gap-2 text-xs">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-[11.5px] text-slate-300 leading-relaxed font-medium">
                {snapshot.lossAversionNote ||
                  "Duy trì tỷ lệ nộp bài đúng hạn từ 90% để giữ chắc 500.000đ học bổng cho khóa học tiếp theo."}
              </div>
            </div>
          </div>
        </div>

        {/* 5. TEACHER STRUCTURED EVALUATION */}
        <div className="px-4 mt-5 space-y-2.5">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <MessageCircle className="w-3.5 h-3.5 text-blue-400" />
            Nhận Xét Từ Giảng Viên
          </div>

          <div className="bg-slate-850 rounded-2xl p-4 border border-slate-800 space-y-3 text-xs leading-relaxed">
            {/* Strengths */}
            <div className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                ★
              </div>
              <div>
                <div className="font-bold text-emerald-400 text-[11px] uppercase tracking-wide">Điểm mạnh</div>
                <div className="text-slate-300 mt-0.5">{teacherEvaluation.strengths}</div>
              </div>
            </div>

            {/* Weaknesses / Points to watch */}
            <div className="flex items-start gap-2.5 pt-2.5 border-t border-slate-800/80">
              <div className="w-5 h-5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                !
              </div>
              <div>
                <div className="font-bold text-amber-400 text-[11px] uppercase tracking-wide">Cần chú ý & Cải thiện</div>
                <div className="text-slate-300 mt-0.5">{teacherEvaluation.weaknesses}</div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="flex items-start gap-2.5 pt-2.5 border-t border-slate-800/80">
              <div className="w-5 h-5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                🎯
              </div>
              <div>
                <div className="font-bold text-blue-400 text-[11px] uppercase tracking-wide">Định hướng tuần tới</div>
                <div className="text-slate-300 mt-0.5">{teacherEvaluation.recommendations}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 6. TWO-WAY EMOTIONAL TOUCHPOINT (THẢ TIM) */}
        <div className="px-4 mt-5">
          <Button
            variant="outline"
            onClick={() => cheerMutation.mutate()}
            disabled={hasCheered || cheerMutation.isPending || snapshot.parentEncouraged}
            className={`w-full h-11 rounded-xl text-xs font-bold transition-all border ${
              hasCheered || snapshot.parentEncouraged
                ? "bg-rose-500/15 border-rose-500/30 text-rose-300"
                : "bg-slate-850 hover:bg-slate-800 text-slate-200 border-slate-700 hover:border-rose-500/50"
            }`}
          >
            <Heart
              className={`w-4 h-4 mr-2 ${
                hasCheered || snapshot.parentEncouraged ? "fill-rose-500 text-rose-500 animate-bounce" : "text-rose-400"
              }`}
            />
            {hasCheered || snapshot.parentEncouraged
              ? "Đã gửi lời khen và thả tim cho con tuần này ❤️"
              : "Thả tim động viên con tuần này ❤️"}
          </Button>
        </div>

        {/* 7. RE-ENROLLMENT GOLDEN RETENTION BANNER (Tuần 8-10 hoặc khi có thể tái tục) */}
        <div className="px-4 mt-6">
          <div className="rounded-2xl p-4 bg-gradient-to-br from-amber-500/20 via-amber-600/10 to-slate-900 border-2 border-amber-400/40 shadow-xl relative">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wide">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Đặc Quyền Giữ Chỗ Khóa Kế Tiếp
            </div>

            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Quỹ Học bổng Kỷ luật <span className="font-bold text-amber-300">{scholarshipAmountFormatted}</span> của em{" "}
              <span className="font-bold text-white">{student.name}</span> đã sẵn sàng áp dụng khấu trừ trực tiếp cho khóa học tiếp theo.
            </p>

            <Button
              onClick={handleOpenReEnroll}
              className="w-full mt-3.5 h-12 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
            >
              <span>Bảo Lưu Học Bổng & Tái Tục Khóa Mới</span>
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </Button>
          </div>
        </div>

        {/* 8. FOOTER DIRECT SUPPORT */}
        <footer className="px-5 mt-8 pt-5 border-t border-slate-800/80 text-center space-y-2">
          <div className="text-xs text-slate-400">Cần hỗ trợ trực tiếp từ Ban Đào Tạo NextBand?</div>
          <div className="flex items-center justify-center gap-3">
            <a
              href={`https://zalo.me/${hotlinePhone}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold hover:bg-blue-500/20 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Zalo Hotline: {hotlinePhone}
            </a>
          </div>
          <div className="text-[10px] text-slate-600 pt-2">
            © NextBand IELTS Academy — Hệ thống Báo cáo Học tập Độc quyền
          </div>
        </footer>
      </div>

      {/* MODAL XÁC NHẬN TÁI TỤC & MỞ ZALO */}
      <Dialog open={isReEnrollModalOpen} onOpenChange={setIsReEnrollModalOpen}>
        <DialogContent className="max-w-sm rounded-2xl bg-slate-900 border border-slate-700 text-white p-5">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-amber-400 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              Xác Nhận Giữ Chỗ & Học Bổng
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-300 pt-1 leading-relaxed">
              Hệ thống sẽ lưu yêu cầu bảo lưu học bổng{" "}
              <span className="font-bold text-amber-400">{scholarshipAmountFormatted}</span> của em{" "}
              <span className="font-bold text-white">{student.name}</span> và chuyển sang Zalo của Tư vấn viên NextBand để giữ chỗ ngay.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleConfirmReEnroll} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-slate-300">
                Số điện thoại Zalo của Phụ huynh
              </Label>
              <Input
                type="tel"
                value={parentPhoneInput}
                onChange={(e) => setParentPhoneInput(e.target.value)}
                placeholder="Nhập số điện thoại Zalo (ví dụ: 0912345678)"
                required
                className="bg-slate-800 border-slate-700 text-white text-xs h-10 focus-visible:ring-amber-400"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsReEnrollModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={reEnrollMutation.isPending}
                size="sm"
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold gap-1.5 shadow-md shadow-amber-500/20"
              >
                {reEnrollMutation.isPending ? "Đang xử lý..." : "Tiếp tục sang Zalo"}
                <Send className="w-3.5 h-3.5" />
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
