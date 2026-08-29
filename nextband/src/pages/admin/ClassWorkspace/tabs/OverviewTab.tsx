import React from "react";
import { useWorkspace } from "../WorkspaceProvider";
import { NotificationBar } from "../components/NotificationBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  BookOpen,
  Clock,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  FileCheck,
  Inbox,
  Calendar,
  GraduationCap,
  Sparkles,
  Award,
} from "lucide-react";

export const OverviewTab: React.FC = () => {
  const {
    classData,
    totalHomeworks,
    progressPercent,
    pendingReviewsCount,
    setActiveTab,
  } = useWorkspace();

  const activeStudents = classData?.activeStudents || [];
  const studentsCount = activeStudents.length || classData?.studentCount || 0;
  const submissions = classData?.submissions || [];
  const teacherName = classData?.teacher?.fullName || classData?.teacher_name || "Chưa phân công";
  const courseTitle = classData?.course?.title || classData?.courseTitle || (classData?.target_band ? `Target Band ${classData.target_band}` : "IELTS Course");
  
  const submittedCount = submissions.filter((s: any) => s.status === "submitted" || s.status === "SUBMITTED" || s.status === "graded" || s.status === "GRADED").length;
  const gradedCount = submissions.filter((s: any) => s.status === "graded" || s.status === "GRADED").length;
  const pendingCount = pendingReviewsCount;
  const totalAssignedSlots = Math.max(1, studentsCount * totalHomeworks);
  const unsubmittedCount = Math.max(0, totalAssignedSlots - submittedCount);

  // Percent breakdown for segmented bar
  const gradedPercent = Math.min(100, Math.round((gradedCount / totalAssignedSlots) * 100));
  const pendingPercent = Math.min(100 - gradedPercent, Math.round((pendingCount / totalAssignedSlots) * 100));

  return (
    <div className="space-y-6 pt-2">
      {/* ========================================================================= */}
      {/* 1. TOP 4 HIGH-CONTRAST KPI CARDS                                          */}
      {/* ========================================================================= */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* KPI 1: Sĩ số lớp */}
        <div className="rounded-2xl border border-blue-200/80 dark:border-blue-900/60 bg-gradient-to-br from-blue-50/70 via-card to-blue-100/30 p-4 shadow-xs hover:shadow-md transition-all space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-300">
              Sĩ số lớp học
            </span>
            <div className="p-2 rounded-xl bg-blue-600 text-white shadow-xs">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-black text-slate-900 dark:text-slate-100">
                {studentsCount}
              </span>
              <span className="text-xs font-bold text-blue-700 dark:text-blue-400">
                học viên
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              {studentsCount > 0 ? "Đang theo học lộ trình" : "Chưa có học viên"}
            </p>
          </div>
        </div>

        {/* KPI 2: Tổng số bài tập */}
        <div className="rounded-2xl border border-purple-200/80 dark:border-purple-900/60 bg-gradient-to-br from-purple-50/70 via-card to-purple-100/30 p-4 shadow-xs hover:shadow-md transition-all space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-900 dark:text-purple-300">
              Lộ trình bài tập
            </span>
            <div className="p-2 rounded-xl bg-purple-600 text-white shadow-xs">
              <BookOpen className="h-4 w-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-black text-slate-900 dark:text-slate-100">
                {totalHomeworks}
              </span>
              <span className="text-xs font-bold text-purple-700 dark:text-purple-400">
                bài học
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5 truncate" title={courseTitle}>
              {courseTitle}
            </p>
          </div>
        </div>

        {/* KPI 3: Bài chờ chấm (Cần hành động khẩn cấp) */}
        <div
          onClick={() => setActiveTab("grading")}
          className={`rounded-2xl border-2 p-4 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-3 ${
            pendingCount > 0
              ? "border-amber-400 bg-gradient-to-br from-amber-50 via-card to-amber-100/40 dark:from-amber-950/30 dark:border-amber-700"
              : "border-slate-200 dark:border-slate-800 bg-card"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">
              Bài chờ chấm
            </span>
            <div className={`p-2 rounded-xl text-white shadow-xs ${pendingCount > 0 ? "bg-amber-500 animate-pulse" : "bg-slate-400"}`}>
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className={`text-3xl font-black ${pendingCount > 0 ? "text-amber-600 dark:text-amber-400" : "text-slate-900 dark:text-slate-100"}`}>
                {pendingCount}
              </span>
              <span className="text-xs font-bold text-amber-700 dark:text-amber-400">
                bài chờ
              </span>
            </div>
            <div className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 flex items-center gap-1 mt-0.5">
              {pendingCount > 0 ? (
                <>Vào khay chấm ngay <ArrowRight className="h-3 w-3" /></>
              ) : (
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">🟢 Đã chấm xong tất cả</span>
              )}
            </div>
          </div>
        </div>

        {/* KPI 4: Tiến độ lớp */}
        <div className="rounded-2xl border border-emerald-200/80 dark:border-emerald-900/60 bg-gradient-to-br from-emerald-50/70 via-card to-emerald-100/30 p-4 shadow-xs hover:shadow-md transition-all space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-300">
              Tiến độ hoàn tất
            </span>
            <div className="p-2 rounded-xl bg-emerald-600 text-white shadow-xs">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                {progressPercent}%
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              {submittedCount}/{totalAssignedSlots} lượt nộp bài
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. CLASS PROGRESS MULTI-TONE SEGMENTED BAR                                */}
      {/* ========================================================================= */}
      <Card className="p-5 border bg-card rounded-2xl shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Award className="h-4 w-4 text-emerald-600" />
              Tiến độ bài tập toàn lớp (Completion Velocity)
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              Tỷ lệ hoàn thành được tính trên toàn bộ học viên và các bài học trong khoá
            </p>
          </div>
          <Badge variant="outline" className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50/80 border-emerald-300 self-start sm:self-auto">
            {submittedCount}/{totalAssignedSlots} lượt nộp ({progressPercent}%)
          </Badge>
        </div>

        {/* Segmented Multi-Tone Progress Bar */}
        <div className="space-y-2">
          <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
            {gradedPercent > 0 && (
              <div
                style={{ width: `${gradedPercent}%` }}
                className="bg-emerald-500 h-full transition-all duration-500"
                title={`Đã chấm xong: ${gradedCount} bài (${gradedPercent}%)`}
              />
            )}
            {pendingPercent > 0 && (
              <div
                style={{ width: `${pendingPercent}%` }}
                className="bg-amber-400 h-full transition-all duration-500"
                title={`Chờ chấm: ${pendingCount} bài (${pendingPercent}%)`}
              />
            )}
          </div>

          {/* Progress Legend */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-medium pt-1">
            <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 inline-block" />
              Đã chấm: <strong>{gradedCount} ({gradedPercent}%)</strong>
            </span>
            <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400 inline-block" />
              Chờ chấm: <strong>{pendingCount} ({pendingPercent}%)</strong>
            </span>
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-700 inline-block" />
              Chưa nộp: <strong>{unsubmittedCount}</strong>
            </span>
          </div>
        </div>
      </Card>

      {/* ========================================================================= */}
      {/* 3. OPERATIONAL BREAKDOWN (4 VIVID STATUS BOXES)                           */}
      {/* ========================================================================= */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
          Phân bố tình trạng nộp bài chi tiết
        </h4>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Box 1: Đã nộp */}
          <div className="p-4 rounded-2xl border border-blue-200 dark:border-blue-900 bg-gradient-to-b from-blue-50/50 to-card shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-blue-700 dark:text-blue-300">
              <span className="text-[11px] font-bold uppercase tracking-wider">Bài đã nộp</span>
              <FileCheck className="h-4 w-4" />
            </div>
            <p className="text-2xl font-black text-blue-900 dark:text-blue-100">{submittedCount}</p>
            <p className="text-[11px] text-muted-foreground">Tổng bài học viên đã gửi lên</p>
          </div>

          {/* Box 2: Đã chấm */}
          <div className="p-4 rounded-2xl border border-emerald-200 dark:border-emerald-900 bg-gradient-to-b from-emerald-50/50 to-card shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-emerald-700 dark:text-emerald-300">
              <span className="text-[11px] font-bold uppercase tracking-wider">Bài đã chấm</span>
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <p className="text-2xl font-black text-emerald-700 dark:text-emerald-300">{gradedCount}</p>
            <p className="text-[11px] text-muted-foreground">Đã trả nhận xét và điểm số</p>
          </div>

          {/* Box 3: Chờ chấm */}
          <div
            onClick={() => setActiveTab("grading")}
            className="p-4 rounded-2xl border border-amber-300 dark:border-amber-800 bg-gradient-to-b from-amber-50/70 to-card shadow-2xs space-y-2 cursor-pointer hover:border-amber-400 transition-colors"
          >
            <div className="flex items-center justify-between text-amber-700 dark:text-amber-300">
              <span className="text-[11px] font-bold uppercase tracking-wider">Bài chờ chấm</span>
              <Clock className="h-4 w-4" />
            </div>
            <p className="text-2xl font-black text-amber-600 dark:text-amber-400">{pendingCount}</p>
            <p className="text-[11px] text-amber-700 font-semibold flex items-center gap-1">
              Nhấn để vào chấm <ArrowRight className="h-3 w-3" />
            </p>
          </div>

          {/* Box 4: Chưa nộp */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-b from-slate-50 to-card shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">Chưa nộp</span>
              <Inbox className="h-4 w-4" />
            </div>
            <p className="text-2xl font-black text-slate-700 dark:text-slate-300">{unsubmittedCount}</p>
            <p className="text-[11px] text-muted-foreground">Lượt bài trong hạn hoặc đang làm</p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. QUICK NAVIGATION SHORTCUTS                                             */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Button
          variant="outline"
          onClick={() => setActiveTab("homework")}
          className="h-auto p-3.5 justify-start text-left bg-card hover:bg-emerald-50/50 hover:border-emerald-300 border-slate-200 rounded-xl transition-all group"
        >
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 mr-3 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <Calendar className="h-4 w-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-foreground">Nội dung & Hạn nộp Bài tập</div>
            <div className="text-[11px] text-muted-foreground">Xem checklist 4 kỹ năng & cài deadline</div>
          </div>
        </Button>

        <Button
          variant="outline"
          onClick={() => setActiveTab("students")}
          className="h-auto p-3.5 justify-start text-left bg-card hover:bg-blue-50/50 hover:border-blue-300 border-slate-200 rounded-xl transition-all group"
        >
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 mr-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <Users className="h-4 w-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-foreground">Học viên & Điểm danh</div>
            <div className="text-[11px] text-muted-foreground">Điểm danh theo buổi & xuất báo cáo phụ huynh</div>
          </div>
        </Button>

        <Button
          variant="outline"
          onClick={() => setActiveTab("grading")}
          className="h-auto p-3.5 justify-start text-left bg-card hover:bg-amber-50/50 hover:border-amber-300 border-slate-200 rounded-xl transition-all group"
        >
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 mr-3 group-hover:bg-amber-600 group-hover:text-white transition-colors">
            <Clock className="h-4 w-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-foreground">Khay Chấm bài lớp</div>
            <div className="text-[11px] text-muted-foreground">Chấm bài theo tiêu chí IELTS & gửi nhận xét</div>
          </div>
        </Button>
      </div>

      {/* ========================================================================= */}
      {/* 5. DAILY NOTIFICATION EVENTS                                              */}
      {/* ========================================================================= */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          Thông báo vận hành hôm nay
        </h3>
        <NotificationBar classId={classData?.id} />
      </div>
    </div>
  );
};
