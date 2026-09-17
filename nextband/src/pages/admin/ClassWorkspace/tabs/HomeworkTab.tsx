import React, { useState } from "react";
import { useWorkspace } from "../WorkspaceProvider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HomeworkSidebar, HomeworkItemData } from "../components/HomeworkSidebar";

import { PendingSubmissionsList } from "../components/PendingSubmissionsList";
import { SetHomeworkDeadlineModal } from "../components/SetHomeworkDeadlineModal";
import {
  formatVietnameseDeadline,
  formatDeadlineCountdown,
  filterCanonicalSubmissionsForHomework,
} from "@/lib/homeworkStatusHelper";
import { BookOpen, Users, Inbox, PlusCircle, Calendar, Clock, Edit3, Bell, Copy, Check, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { isAutoGradedExam } from "@/lib/examSkillHelper";
import { useToast } from "@/hooks/use-toast";

export const HomeworkTab: React.FC = () => {
  const { classData, setActiveTab, refetchClass } = useWorkspace();
  const [isDeadlineModalOpen, setIsDeadlineModalOpen] = useState(false);

  const lessons = classData?.lessons || [];
  const submissions = classData?.submissions || [];
  const students = classData?.students || [];
  const totalStudents = students.length || 0;

  // Transform lessons to Course-driven Homework list with real workload, deadline & heatmap metrics
  const homeworkList: HomeworkItemData[] = lessons.map((lesson: any, i: number) => {
    const hwNum = String(i + 1).padStart(2, "0");
    const hwTitle = lesson.title || `Homework ${hwNum}`;
    const deadline = lesson.deadline || lesson.homework?.deadline || null;
    const deadlineSource: "MANUAL" | "AUTO" = lesson.deadlineSource || lesson.homework?.deadlineSource || "AUTO";
    
    // Calculate submissions strictly belonging to this lesson/homework canonical ID
    const lessonSubmissions = filterCanonicalSubmissionsForHomework(submissions, lesson.id);
    const isLessonAutoGraded = isAutoGradedExam(lesson);

    const pendingSubmissions = isLessonAutoGraded
      ? []
      : lessonSubmissions
          .filter((s: any) => s.grade_status === "pending" || s.status === "submitted" || s.status === "SUBMITTED")
          .map((s: any) => {
            const targetStudentId = s.studentId || s.student_id || s.student?.id;
            const student = students.find(
              (st: any) =>
                (st.studentId || st.student_id || st.student?.userId || st.student?.id || st.id) === targetStudentId
            );
            return {
              id: s.id,
              studentName: s.student?.fullName || student?.fullName || student?.full_name || student?.email || "Học viên",
              submittedAt: (s.submittedAt || s.createdAt || s.created_at)
                ? new Date(s.submittedAt || s.createdAt || s.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                : "Chưa xác định",
            };
          });

    const submittedCount = lessonSubmissions.length;
    const waitingReviewCount = pendingSubmissions.length;
    const gradedCount = lessonSubmissions.filter(
      (s: any) => s.grade_status === "graded" || s.status === "graded" || isLessonAutoGraded
    ).length;

    // Progress percentage of total enrolled class (Heatmap metric)
    const progressPercent =
      totalStudents > 0
        ? Math.min(100, Math.round((submittedCount / totalStudents) * 100))
        : 0;

    // Map DB sections if present, otherwise map standard activity types
    const dbSections = lesson.exam_sections || lesson.sections || [];
    let skills = dbSections.map((sec: any) => ({
      type: sec.section_type || "general",
      name: sec.title || `Skill - ${(sec.section_type || "general").toUpperCase()}`,
      detail: sec.instructions || `Nội dung luyện tập phần ${(sec.section_type || "general").toUpperCase()}`,
    }));

    // Fallback if no sections in DB yet
    if (skills.length === 0) {
      skills = [
        { type: "listening", name: "Listening Activity", detail: "Luyện nghe chọn đáp án & hoàn thành ghi chú" },
        { type: "reading", name: "Reading Activity", detail: "Đọc hiểu passage & trả lời câu hỏi" },
        { type: "writing", name: "Writing Activity", detail: "Bài luận ngắn / Phản hồi câu hỏi" },
        { type: "speaking", name: "Speaking Activity", detail: "Ghi âm bài nói theo yêu cầu" },
      ];
    }

    // Session metadata
    const sessionDate = lesson.sessionDate || lesson.homework?.sessionDate || null;
    const sessionNumber = lesson.sessionNumber ?? lesson.homework?.sessionNumber ?? (i + 1);
    const sessionStatus = lesson.sessionStatus || lesson.homework?.sessionStatus;

    return {
      id: lesson.id || `hw-${i + 1}`,
      hwNum,
      title: hwTitle,
      submittedCount,
      waitingReviewCount,
      gradedCount,
      progressPercent,
      deadline,
      deadlineSource,
      sessionDate,
      sessionNumber,
      sessionStatus,
      skills,
      pendingSubmissions,
    };
  });

  // Determine the most recent passed homework that students should do
  // (e.g. Session date <= now or completed session, falling back to nearest deadline or first item)
  const defaultHwId = React.useMemo(() => {
    if (homeworkList.length === 0) return "";
    const now = Date.now();

    // 1. First priority: Check homeworks whose linked session has already passed (sessionDate <= now)
    const passedSessionHomeworks = homeworkList.filter((hw) => {
      if (!hw.sessionDate) return false;
      const t = new Date(hw.sessionDate).getTime();
      return !isNaN(t) && t <= now;
    });

    if (passedSessionHomeworks.length > 0) {
      // Pick the latest passed session (closest to now)
      passedSessionHomeworks.sort((a, b) => {
        const timeA = new Date(a.sessionDate!).getTime();
        const timeB = new Date(b.sessionDate!).getTime();
        return timeB - timeA;
      });
      return passedSessionHomeworks[0].id;
    }

    // 2. Second priority: Check if any session is marked as COMPLETED
    const completedSessionHw = homeworkList.filter((hw) => hw.sessionStatus === "COMPLETED");
    if (completedSessionHw.length > 0) {
      return completedSessionHw[completedSessionHw.length - 1].id;
    }

    // 3. Third priority: Check deadline passed or upcoming
    const pastDeadlineHws = homeworkList.filter((hw) => {
      if (!hw.deadline) return false;
      const t = new Date(hw.deadline).getTime();
      return !isNaN(t) && t <= now;
    });
    if (pastDeadlineHws.length > 0) {
      pastDeadlineHws.sort((a, b) => new Date(b.deadline!).getTime() - new Date(a.deadline!).getTime());
      return pastDeadlineHws[0].id;
    }

    // Default to the first homework
    return homeworkList[0]?.id || "";
  }, [homeworkList]);

  const [userSelectedHwId, setUserSelectedHwId] = useState<string | null>(null);
  const selectedHwId = userSelectedHwId || defaultHwId;
  const selectedHw = homeworkList.find((hw) => hw.id === selectedHwId) || homeworkList[0] || null;
  const selectedCountdown = selectedHw?.deadline ? formatDeadlineCountdown(selectedHw.deadline) : null;
  
  // Empty State handling if course has 0 exams in DB
  if (homeworkList.length === 0) {
    return (
      <div className="pt-4 text-center">
        <div className="p-12 border rounded-xl bg-card text-center space-y-3">
          <Inbox className="h-10 w-10 text-muted-foreground mx-auto" />
          <h4 className="text-base font-bold">Khóa học này chưa được khởi tạo nội dung học</h4>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Chưa tìm thấy bản ghi bài tập nào thuộc khóa học này trong cơ sở dữ liệu. Vui lòng liên hệ Quản trị viên để bổ sung dữ liệu nội dung học.
          </p>
          <Button asChild size="sm" className="mt-2 gap-1.5 bg-emerald-600 hover:bg-emerald-700">
            <Link to="/admin/courses">
              <PlusCircle className="h-4 w-4" />
              Quản trị viên bổ sung dữ liệu
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const { toast } = useToast();
  const [copiedReminder, setCopiedReminder] = useState(false);

  const handleCopyReminder = () => {
    if (!selectedHw) return;
    const origin = window.location.origin;
    const examUrl = `${origin}/exam/${selectedHw.id}`;
    const deadlineText = selectedHw.deadline ? formatVietnameseDeadline(selectedHw.deadline) : "theo thông báo";
    const className = classData?.name || classData?.title || "Lớp học";

    const reminderMessage = `🔔 [NHẮC NHỞ BÀI TẬP - ${className.toUpperCase()}]
📌 Bài tập: ${selectedHw.title}
⏰ Hạn nộp: ${deadlineText}

👉 Các bạn bấm vào link bên dưới để đăng nhập và vào thẳng bài làm nhé:
🔗 ${examUrl}

Chúc các bạn hoàn thành bài tập thật tốt! 💪`;

    navigator.clipboard.writeText(reminderMessage).then(() => {
      setCopiedReminder(true);
      toast({
        title: "Đã sao chép nội dung & link nhắc bài!",
        description: "Bạn có thể dán (Paste) ngay vào Zalo group của lớp.",
      });
      setTimeout(() => setCopiedReminder(false), 2500);
    }).catch(() => {
      // Fallback if clipboard API fails
      toast({
        variant: "destructive",
        title: "Lỗi sao chép",
        description: "Không thể tự động sao chép. Vui lòng thử lại.",
      });
    });
  };

  return (
    <div className="space-y-4 pt-2">
      {/* Header Banner */}
      <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/20 p-3.5 rounded-xl">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-emerald-500 text-white">
            <BookOpen className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Nội dung học tập & Heatmap Tiến độ (Course-Driven Curriculum)
            </h3>
            <p className="text-xs text-muted-foreground">
              Toàn bộ bài học mở hoàn toàn. Theo dõi chỉ số Workload (bài chờ chấm), Deadline & Heatmap nộp bài trực tiếp ở Sidebar.
            </p>
          </div>
        </div>
        <Badge variant="outline" className="font-mono text-xs border-emerald-500 text-emerald-700 bg-emerald-50">
          {homeworkList.length} Bài học
        </Badge>
      </div>

      {/* 2-Column Course-driven Layout */}
      <div className="grid gap-6 md:grid-cols-12 min-h-[540px]">
        {/* Left Column: HomeworkSidebar Component */}
        <div className="md:col-span-4">
          <HomeworkSidebar
            homeworkList={homeworkList}
            selectedHwId={selectedHw?.id || ""}
            onSelectHw={setUserSelectedHwId}
            totalStudents={totalStudents}
          />
        </div>

        {/* Right Column: Dynamic ActivityChecklist, Deadline Controls & PendingSubmissionsList */}
        <div className="md:col-span-8">
          {selectedHw ? (
            <Card className="h-full border bg-card flex flex-col justify-between">
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100">
                      {selectedHw.title}
                    </CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs font-semibold text-emerald-700 border-emerald-300">
                      Đã nộp: {selectedHw.submittedCount}/{totalStudents} HV ({selectedHw.progressPercent}%)
                    </Badge>
                    {selectedHw.waitingReviewCount > 0 && (
                      <Badge className="bg-amber-500 text-white text-xs font-bold">
                        {selectedHw.waitingReviewCount} bài chờ chấm
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-5 space-y-4 flex-1 overflow-y-auto">
                {/* Deadline Management Control Strip */}
                <div className="p-3.5 rounded-xl border bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${selectedHw.deadlineSource === 'MANUAL' ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' : 'bg-blue-500/15 text-blue-600 dark:text-blue-400'}`}>
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                          Hạn nộp: {formatVietnameseDeadline(selectedHw.deadline)}
                        </span>
                        {selectedHw.deadlineSource === "MANUAL" ? (
                          <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-mono">
                            Gán thủ công
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-[10px] font-mono text-blue-700 border-blue-300 bg-blue-50/60 dark:text-blue-300 dark:border-blue-800">
                            Tự động theo tuần
                          </Badge>
                        )}
                      </div>
                      <p className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                        <Clock className="h-3 w-3 text-slate-400" />
                        {selectedCountdown ? (
                          selectedCountdown.isOverdue ? (
                            <span className="text-rose-600 dark:text-rose-400 font-semibold">{selectedCountdown.text}</span>
                          ) : (
                            <span className="text-emerald-700 dark:text-emerald-400 font-medium">Thời gian còn lại: {selectedCountdown.text}</span>
                          )
                        ) : (
                          <span>Hạn hoàn thành toàn bộ hoạt động của bài học này</span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <Button
                      size="sm"
                      onClick={handleCopyReminder}
                      className="text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white gap-1.5 h-8.5 px-3 shadow-xs"
                    >
                      {copiedReminder ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-300" />
                          Đã chép link!
                        </>
                      ) : (
                        <>
                          <Bell className="h-3.5 w-3.5" />
                          Nhắc bài tập (Zalo)
                        </>
                      )}
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setIsDeadlineModalOpen(true)}
                      className="text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5 h-8.5 px-3 shadow-xs"
                    >
                      <Calendar className="h-3.5 w-3.5" />
                      Cài đặt / Gia hạn
                    </Button>
                  </div>
                </div>

                {/* Workload Metric Summary */}
                <div className="p-3 rounded-xl border bg-muted/20 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
                    <Users className="h-4 w-4 text-emerald-600" />
                    Thống kê nộp bài: <strong className="text-slate-900 dark:text-slate-100">{selectedHw.submittedCount}/{totalStudents} HV</strong>
                  </span>
                  <div className="flex items-center gap-3 font-semibold">
                    <span className="text-amber-600">🟡 {selectedHw.waitingReviewCount} Chờ chấm</span>
                    <span className="text-emerald-600">🟢 {selectedHw.gradedCount} Đã xong</span>
                  </div>
                </div>

                {/* Zalo Reminder Quick Action Box */}
                <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-blue-600 text-white mt-0.5">
                      <Send className="h-4 w-4" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        Link nhắc làm bài tập trực tiếp (Zalo Group)
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Học viên nhấn link này, sau khi đăng nhập sẽ tự động được đưa thẳng vào giao diện làm bài tập này.
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <code className="text-[11px] font-mono text-blue-700 dark:text-blue-300 bg-blue-100/70 dark:bg-blue-900/40 px-2 py-0.5 rounded select-all break-all">
                          {window.location.origin}/exam/{selectedHw.id}
                        </code>
                      </div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={handleCopyReminder}
                    className="text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white gap-1.5 h-8.5 px-3 shrink-0 self-end sm:self-auto"
                  >
                    {copiedReminder ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-300" />
                        Đã sao chép!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        Sao chép lời nhắc
                      </>
                    )}
                  </Button>
                </div>



                {/* Modular PendingSubmissionsList Component */}
                <PendingSubmissionsList
                  homeworkTitle={selectedHw.title}
                  pendingSubmissions={selectedHw.pendingSubmissions}
                  onGradeClick={() => setActiveTab("grading")}
                />
              </CardContent>
            </Card>
          ) : (
            <div className="h-full flex items-center justify-center p-8 border rounded-xl bg-card text-muted-foreground text-sm">
              Chọn bài học từ danh sách bên trái để xem chi tiết.
            </div>
          )}
        </div>
      </div>

      {/* Set Homework Deadline Modal */}
      {selectedHw && (
        <SetHomeworkDeadlineModal
          open={isDeadlineModalOpen}
          onOpenChange={setIsDeadlineModalOpen}
          classId={classData?.id || ""}
          className={classData?.name}
          lessonId={selectedHw.id}
          lessonTitle={selectedHw.title}
          currentDeadline={selectedHw.deadline ?? null}
          deadlineSource={selectedHw.deadlineSource || "AUTO"}
          onSuccess={() => refetchClass()}
        />
      )}
    </div>
  );
};
