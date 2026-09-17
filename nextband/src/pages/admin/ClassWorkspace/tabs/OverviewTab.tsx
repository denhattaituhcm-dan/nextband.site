import React from "react";
import { useWorkspace } from "../WorkspaceProvider";
import { NotificationBar } from "../components/NotificationBar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  BookOpen,
  Clock,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  PlayCircle,
  Award,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { isAutoGradedExam } from "@/lib/examSkillHelper";

export const OverviewTab: React.FC = () => {
  const {
    classData,
    totalHomeworks,
    progressPercent,
    pendingReviewsCount,
    setActiveTab,
  } = useWorkspace();
  const navigate = useNavigate();

  const activeStudents = classData?.activeStudents || [];
  const students = classData?.students || [];
  const studentsCount = activeStudents.length || classData?.studentCount || 0;
  const submissions = classData?.submissions || [];
  const sessions = classData?.sessions || [];
  const lessons = classData?.lessons || [];

  const submittedCount = submissions.filter(
    (s: any) =>
      s.status === "submitted" ||
      s.status === "SUBMITTED" ||
      s.status === "graded" ||
      s.status === "GRADED"
  ).length;
  const gradedCount = submissions.filter(
    (s: any) => s.status === "graded" || s.status === "GRADED"
  ).length;
  const pendingCount = pendingReviewsCount;
  const totalAssignedSlots = Math.max(1, studentsCount * totalHomeworks);
  const unsubmittedCount = Math.max(0, totalAssignedSlots - submittedCount);

  // Percent breakdown for segmented bar
  const gradedPercent = Math.min(100, Math.round((gradedCount / totalAssignedSlots) * 100));
  const pendingPercent = Math.min(
    100 - gradedPercent,
    Math.round((pendingCount / totalAssignedSlots) * 100)
  );

  // 1. Pending submissions queue (Top 5 most urgent to grade)
  const pendingQueue = submissions
    .filter((s: any) => {
      const isAuto = isAutoGradedExam(
        s.exam || {
          title: s.title || s.homework_title || s.homework?.title,
          examType: s.examType || s.exam_type || s.type,
        }
      );
      if (isAuto) return false;
      return (
        s.grade_status === "pending" ||
        s.status === "submitted" ||
        s.status === "SUBMITTED"
      );
    })
    .map((s: any) => {
      const targetStudentId = s.studentId || s.student_id;
      const student = students.find(
        (st: any) =>
          st.studentId === targetStudentId ||
          st.student_id === targetStudentId ||
          st.id === targetStudentId ||
          st.userId === targetStudentId ||
          st.student?.id === targetStudentId ||
          st.student?.userId === targetStudentId
      );
      return {
        id: s.id,
        studentId: targetStudentId,
        studentName:
          s.student?.fullName ||
          student?.fullName ||
          student?.full_name ||
          student?.email ||
          "Học viên",
        studentAvatar: s.student?.avatarUrl || student?.avatarUrl,
        homeworkTitle:
          s.exam?.title ||
          s.homework_title ||
          s.title ||
          s.homework?.title ||
          "Bài tập",
        submittedAt: s.submittedAt || s.createdAt || s.created_at,
      };
    })
    .sort((a: any, b: any) => {
      const timeA = a.submittedAt ? new Date(a.submittedAt).getTime() : 0;
      const timeB = b.submittedAt ? new Date(b.submittedAt).getTime() : 0;
      return timeB - timeA;
    });

  // 2. Next upcoming / today session
  const sortedSessions = [...sessions].sort((a: any, b: any) => {
    const numA = Number(a.sessionNumber || a.session_number || 0);
    const numB = Number(b.sessionNumber || b.session_number || 0);
    return numA - numB;
  });

  const nextSession =
    sortedSessions.find((s: any) => s.status === "PLANNED") ||
    sortedSessions[sortedSessions.length - 1] ||
    null;

  const completedSessionsCount = sortedSessions.filter(
    (s: any) => s.status === "COMPLETED"
  ).length;

  const handleOpenTeacherWorkspace = (studentId?: string) => {
    if (classData?.id) {
      navigate(
        `/admin/teacher-workspace?classId=${encodeURIComponent(
          classData.id
        )}${studentId ? `&studentId=${encodeURIComponent(studentId)}` : ""}&filter=pending`
      );
    } else {
      navigate("/admin/teacher-workspace?filter=pending");
    }
  };

  return (
    <div className="space-y-6 pt-2">
      {/* ========================================================================= */}
      {/* 1. TOP ESSENTIAL METRICS (3 CLEAR, NON-REDUNDANT CARDS)                   */}
      {/* ========================================================================= */}
      <div className="grid gap-4 sm:grid-cols-3">
        {/* Card 1: Cần chấm ngay (Action First) */}
        <div
          onClick={() => setActiveTab("grading")}
          className={`rounded-2xl border p-4.5 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between ${
            pendingCount > 0
              ? "border-amber-300 dark:border-amber-700/80 bg-gradient-to-br from-amber-500/10 via-amber-50/40 dark:via-amber-950/20 to-card"
              : "border-slate-200 dark:border-slate-800 bg-card"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-amber-600" />
              Bài chờ chấm
            </span>
            <Badge
              variant={pendingCount > 0 ? "default" : "secondary"}
              className={pendingCount > 0 ? "bg-amber-500 hover:bg-amber-600 text-white font-bold" : ""}
            >
              {pendingCount > 0 ? `${pendingCount} bài cần chấm` : "Đã sạch khay"}
            </Badge>
          </div>

          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className={`text-3xl font-black ${pendingCount > 0 ? "text-amber-600 dark:text-amber-400" : "text-slate-800 dark:text-slate-100"}`}>
                {pendingCount}
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                / {submittedCount} bài học viên nộp
              </span>
            </div>
            <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-amber-700 dark:text-amber-400">
              {pendingCount > 0 ? (
                <>Vào khay chấm ngay <ArrowRight className="h-3.5 w-3.5 ml-0.5" /></>
              ) : (
                <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Tất cả bài đã được chấm xong
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Card 2: Sĩ số & Học viên */}
        <div
          onClick={() => setActiveTab("students")}
          className="rounded-2xl border border-blue-200/80 dark:border-blue-900/60 bg-gradient-to-br from-blue-50/60 via-card to-card p-4.5 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-300 flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-blue-600" />
              Sĩ số lớp học
            </span>
            <Badge variant="outline" className="text-blue-700 dark:text-blue-300 border-blue-200">
              {activeStudents.length} đang học
            </Badge>
          </div>

          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 dark:text-slate-100">
                {studentsCount}
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                học viên trong danh sách
              </span>
            </div>
            <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
              Xem danh sách & Điểm danh <ArrowRight className="h-3.5 w-3.5 ml-0.5" />
            </div>
          </div>
        </div>

        {/* Card 3: Tiến độ buổi học */}
        <div
          onClick={() => setActiveTab("homework")}
          className="rounded-2xl border border-emerald-200/80 dark:border-emerald-900/60 bg-gradient-to-br from-emerald-50/60 via-card to-card p-4.5 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-emerald-600" />
              Tiến độ lộ trình
            </span>
            <Badge variant="outline" className="text-emerald-700 dark:text-emerald-300 border-emerald-200">
              {totalHomeworks} bài học
            </Badge>
          </div>

          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                {completedSessionsCount}/{sessions.length || totalHomeworks}
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                buổi đã hoàn thành ({progressPercent}% nộp bài)
              </span>
            </div>
            <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              Xem chi tiết nội dung bài tập <ArrowRight className="h-3.5 w-3.5 ml-0.5" />
            </div>
          </div>
        </div>
      </div>



      {/* ========================================================================= */}
      {/* 3. MAIN TEACHER ACTIONS: 2 COLUMNS (URGENT GRADING + UPCOMING SESSION)    */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Bài tập cần chấm gần nhất (Action List) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-500" />
              Bài nộp mới nhất cần chấm ({pendingQueue.length})
            </h3>
            {pendingQueue.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleOpenTeacherWorkspace()}
                className="h-7 text-xs font-semibold text-amber-700 dark:text-amber-400 hover:text-amber-800 gap-1 px-2"
              >
                Mở phòng chấm bài
                <ArrowRight className="h-3 w-3" />
              </Button>
            )}
          </div>

          {pendingQueue.length === 0 ? (
            <div className="p-8 text-center border border-dashed rounded-2xl bg-slate-50/50 dark:bg-slate-900/30 space-y-2">
              <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto opacity-80" />
              <p className="text-sm font-semibold text-foreground">Không có bài tập nào đang chờ chấm</p>
              <p className="text-xs text-muted-foreground">
                Tất cả học viên đã nộp bài đều đã được nhận xét và chấm điểm.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {pendingQueue.slice(0, 5).map((item: any) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-xl border bg-card hover:bg-muted/40 transition-colors gap-3 shadow-2xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarImage src={item.studentAvatar} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                        {item.studentName.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                        {item.studentName}
                      </p>
                      <p className="text-[11px] text-muted-foreground truncate" title={item.homeworkTitle}>
                        {item.homeworkTitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] text-muted-foreground hidden sm:inline">
                      {item.submittedAt
                        ? new Date(item.submittedAt).toLocaleDateString("vi-VN", {
                            day: "2-digit",
                            month: "2-digit",
                          })
                        : ""}
                    </span>
                    <Button
                      size="sm"
                      onClick={() => handleOpenTeacherWorkspace(item.studentId)}
                      className="h-7 text-xs bg-amber-500 hover:bg-amber-600 text-white font-medium px-2.5 gap-1 shadow-2xs"
                    >
                      Chấm bài
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}

              {pendingQueue.length > 5 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveTab("grading")}
                  className="w-full text-xs font-semibold h-8 text-muted-foreground hover:text-foreground"
                >
                  Xem thêm {pendingQueue.length - 5} bài chờ chấm khác...
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Buổi học tiếp theo & Hỗ trợ nhanh */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-emerald-600" />
            Buổi học tiếp theo
          </h3>

          <Card className="p-4.5 border rounded-2xl bg-card shadow-2xs space-y-3.5">
            {nextSession ? (
              <>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Badge variant="outline" className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border-emerald-200">
                      Buổi {nextSession.sessionNumber}
                    </Badge>
                    <h4 className="text-sm font-bold mt-1 text-slate-900 dark:text-slate-100">
                      {nextSession.title || `Buổi học số ${nextSession.sessionNumber}`}
                    </h4>
                  </div>
                  <span className="text-xs font-semibold text-muted-foreground">
                    {nextSession.plannedDate || nextSession.scheduledDate
                      ? new Date(nextSession.plannedDate || nextSession.scheduledDate).toLocaleDateString("vi-VN")
                      : "Chưa đặt lịch"}
                  </span>
                </div>

                <div className="text-xs text-muted-foreground space-y-1 bg-muted/40 p-2.5 rounded-xl">
                  <div className="flex items-center justify-between">
                    <span>Thời gian:</span>
                    <span className="font-semibold text-foreground">
                      {nextSession.startTime ? String(nextSession.startTime).slice(11, 16) || "18:00" : "18:00"} -{" "}
                      {nextSession.endTime ? String(nextSession.endTime).slice(11, 16) || "20:00" : "20:00"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Địa điểm:</span>
                    <span className="font-semibold text-foreground">
                      {classData?.branch?.name || "Cơ sở chính"}{classData?.room ? ` (${classData.room.name})` : ""}
                    </span>
                  </div>
                </div>

                <div className="pt-1 flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => setActiveTab("students")}
                    className="w-full text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white h-8 gap-1.5"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Điểm danh buổi này
                  </Button>
                </div>
              </>
            ) : (
              <div className="py-6 text-center text-xs text-muted-foreground">
                Lớp học đã kết thúc hoặc chưa cấu hình lịch học.
              </div>
            )}
          </Card>

          {/* Daily Notifications / Operations */}
          <div className="space-y-2 pt-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-blue-500" />
              Thông báo vận hành lớp
            </h4>
            <NotificationBar classId={classData?.id} />
          </div>
        </div>
      </div>
    </div>
  );
};
