import React, { useState, useEffect, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Lock,
  Save,
  CheckCheck,
  Loader2,
  Zap,
  RotateCcw,
  Unlock,
  CalendarPlus,
  CalendarOff,
  Users,
  Sparkles,
  Info,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import {
  attendanceApi,
  sessionsApi,
  CanonicalSessionDTO,
  invalidateClassWorkspace,
  AttendanceStatus,
} from "@/lib/api";
import { useWorkspace } from "../../WorkspaceProvider";

interface StudentAttendanceItem {
  studentId: string;
  studentName: string;
  avatarUrl?: string;
  status: AttendanceStatus;
  note?: string | null;
}

interface SessionData {
  sessionId: string;
  sessionNumber: number;
  sessionTitle: string;
  sessionDate: string;
  status: "SCHEDULED" | "COMPLETED" | "CANCELLED";
  completedAt?: string;
  summary: {
    total: number;
    present: number;
    absent: number;
    late: number;
    excused: number;
    unmarked: number;
  };
  students: StudentAttendanceItem[];
}

interface AttendanceSheetProps {
  classId: string;
  sessions: CanonicalSessionDTO[];
  onRefreshMatrix?: () => void;
}

export const AttendanceSheet: React.FC<AttendanceSheetProps> = ({ classId, sessions, onRefreshMatrix }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { classData, refetchClass } = useWorkspace();

  // Active students from class workspace
  const activeStudents = useMemo(() => {
    return classData?.activeStudents || classData?.students || [];
  }, [classData]);

  const [selectedSessionId, setSelectedSessionId] = useState<string>(sessions[0]?.id || "");
  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [completing, setCompleting] = useState<boolean>(false);
  const [generatingSessions, setGeneratingSessions] = useState<boolean>(false);
  const [dayOffModalOpen, setDayOffModalOpen] = useState<boolean>(false);
  const [dayOffReason, setDayOffReason] = useState<string>("");
  const [processingDayOff, setProcessingDayOff] = useState<boolean>(false);
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [items, setItems] = useState<StudentAttendanceItem[]>([]);
  const [localSessionStatuses, setLocalSessionStatuses] = useState<Record<string, "SCHEDULED" | "COMPLETED" | "CANCELLED">>({});

  // Tính toán thông tin buổi học bù tiếp theo dựa trên lịch cố định
  const nextSessionPreview = useMemo(() => {
    if (!sessions || sessions.length === 0) return null;

    // 1. Xác định thứ trong tuần (weekdays) của lớp (0: CN, 1: T2, ..., 6: T7)
    const weekdaysSet = new Set<number>();
    const classSchedules = classData?.schedules || classData?.class_schedules || [];
    if (Array.isArray(classSchedules) && classSchedules.length > 0) {
      classSchedules.forEach((sc: any) => {
        if (typeof sc.dayOfWeek === "number") weekdaysSet.add(sc.dayOfWeek);
      });
    }

    sessions.forEach((s) => {
      const dStr = s.scheduledDate || (s as any).plannedDate || (s as any).sessionDate;
      if (dStr) {
        const [y, m, d] = dStr.slice(0, 10).split("-").map(Number);
        if (y && m && d) {
          const dt = new Date(y, m - 1, d);
          weekdaysSet.add(dt.getDay());
        }
      }
    });

    const weekdays = weekdaysSet.size > 0 ? Array.from(weekdaysSet) : [6, 0];

    // 2. Tìm số thứ tự buổi học lớn nhất và ngày cuối cùng
    let maxSessionNumber = 0;
    let maxDateStr = "";

    sessions.forEach((s) => {
      if (s.sessionNumber > maxSessionNumber) {
        maxSessionNumber = s.sessionNumber;
      }
      const dStr = s.scheduledDate || (s as any).plannedDate || (s as any).sessionDate;
      if (dStr && dStr.slice(0, 10) > maxDateStr) {
        maxDateStr = dStr.slice(0, 10);
      }
    });

    const nextSessionNumber = maxSessionNumber + 1;

    // 3. Tính ngày của buổi tiếp theo (bắt đầu từ ngày sau maxDateStr)
    const [y, m, d] = (maxDateStr || new Date().toISOString().slice(0, 10)).split("-").map(Number);
    const cur = new Date(y, m - 1, d);
    cur.setDate(cur.getDate() + 1);

    let nextDateStr = "";
    let safety = 60;
    while (!nextDateStr && safety > 0) {
      safety--;
      const dow = cur.getDay();
      if (weekdays.includes(dow)) {
        const mm = String(cur.getMonth() + 1).padStart(2, "0");
        const dd = String(cur.getDate()).padStart(2, "0");
        nextDateStr = `${cur.getFullYear()}-${mm}-${dd}`;
      } else {
        cur.setDate(cur.getDate() + 1);
      }
    }

    const dayNames = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
    const [ny, nm, nd] = (nextDateStr || "").split("-").map(Number);
    const nextDt = new Date(ny, (nm || 1) - 1, nd || 1);
    const nextDayName = dayNames[nextDt.getDay()] || "—";
    const formattedNextDate = nextDateStr ? `${String(nd).padStart(2, "0")}/${String(nm).padStart(2, "0")}/${ny}` : "—";

    const weekdaysLabels = weekdays
      .sort((a, b) => (a === 0 ? 7 : a) - (b === 0 ? 7 : b))
      .map((w) => dayNames[w])
      .join(", ");

    return {
      nextSessionNumber,
      nextDateStr,
      formattedNextDate,
      nextDayName,
      weekdaysLabels,
    };
  }, [sessions, classData]);

  // Synchronize localSessionStatuses and selectedSessionId when sessions prop changes
  useEffect(() => {
    if (sessions && sessions.length > 0) {
      setLocalSessionStatuses((prev) => {
        const next = { ...prev };
        sessions.forEach((s) => {
          if (!next[s.id] || (s.status === "COMPLETED" && next[s.id] !== "COMPLETED")) {
            next[s.id] = s.status;
          }
        });
        return next;
      });

      const exists = sessions.some((s) => s.id === selectedSessionId);
      if (!exists || !selectedSessionId) {
        setSelectedSessionId(sessions[0].id);
      }
    } else {
      setSelectedSessionId("");
    }
  }, [sessions, selectedSessionId]);

  const fetchSessionAttendance = React.useCallback(async (sessionId: string) => {
    setLoading(true);
    try {
      const res = await attendanceApi.getSessionAttendance(classId, sessionId);
      const data = res?.data;

      if (data) {
        setSessionData(data as SessionData);
        if (data.status) {
          setLocalSessionStatuses((prev) => ({
            ...prev,
            [sessionId]: data.status as "SCHEDULED" | "COMPLETED" | "CANCELLED",
          }));
        }

        // Map and merge with active students to ensure all class students are listed
        const existingRecords = data.students || [];
        const mergedItems: StudentAttendanceItem[] = activeStudents.map((st: any) => {
          const stId = st.studentId || st.id;
          const found = existingRecords.find((r: any) => r.studentId === stId);

          return {
            studentId: stId,
            studentName: st.fullName,
            avatarUrl: st.avatarUrl,
            status: found ? found.status : "UNMARKED",
            note: found ? (found.notes || found.note || "") : "",
          };
        });

        // If no activeStudents in context yet, use what the API returned
        setItems(mergedItems.length > 0 ? mergedItems : existingRecords);
      } else {
        // Fallback default list from activeStudents
        setItems(
          activeStudents.map((st: any) => ({
            studentId: st.studentId || st.id,
            studentName: st.fullName,
            avatarUrl: st.avatarUrl,
            status: "UNMARKED",
            note: "",
          }))
        );
      }
    } catch (err: any) {
      console.warn("[AttendanceSheet] Fetch attendance error:", err);
      // Populate with active students as fallback so UI remains functional
      setItems(
        activeStudents.map((st: any) => ({
          studentId: st.studentId || st.id,
          studentName: st.fullName,
          avatarUrl: st.avatarUrl,
          status: "UNMARKED",
          note: "",
        }))
      );
    } finally {
      setLoading(false);
    }
  }, [classId, activeStudents]);

  // Load session attendance
  useEffect(() => {
    if (!selectedSessionId) {
      setItems([]);
      setSessionData(null);
      return;
    }
    fetchSessionAttendance(selectedSessionId);
  }, [selectedSessionId, fetchSessionAttendance]);

  const handleStatusChange = (studentId: string, newStatus: AttendanceStatus) => {
    setItems((prev) =>
      prev.map((item) => (item.studentId === studentId ? { ...item, status: newStatus } : item))
    );
  };

  const handleNoteChange = (studentId: string, newNote: string) => {
    setItems((prev) =>
      prev.map((item) => (item.studentId === studentId ? { ...item, note: newNote } : item))
    );
  };

  // 1-Click: Tất cả có mặt
  const handleMarkAllPresent = () => {
    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        status: "PRESENT",
      }))
    );
    toast({
      title: "Đã chọn Có mặt",
      description: "Đã đánh dấu tất cả học viên có mặt trong buổi học này.",
    });
  };

  // Báo nghỉ toàn bộ lớp và tự động đôn thêm 1 buổi bù theo lịch cố định
  const handleConfirmDayOffAndExtend = async () => {
    if (!selectedSessionId) return;
    setProcessingDayOff(true);
    try {
      const reasonNote = dayOffReason.trim() || "Nghỉ do sự cố / Lễ Tết";

      // 1. Cập nhật trạng thái cả lớp sang EXCUSED (Có phép)
      const updatedItems = items.map((item) => ({
        ...item,
        status: "EXCUSED" as AttendanceStatus,
        note: reasonNote,
      }));
      setItems(updatedItems);

      // 2. Lưu điểm danh buổi này
      const payload = updatedItems.map((it) => ({
        studentId: it.studentId,
        status: it.status,
        note: it.note || null,
      }));
      await attendanceApi.markAttendance(classId, selectedSessionId, payload);

      // 3. Tự động thêm 1 buổi tiếp theo vào cuối lịch
      const newSession = await sessionsApi.appendNextSession(classId, {
        reason: reasonNote,
        title: nextSessionPreview ? `Buổi ${nextSessionPreview.nextSessionNumber}` : undefined,
      });

      toast({
        title: "Đã báo nghỉ & Đôn thêm buổi học bù",
        description: `Toàn bộ học viên đã được ghi nhận Nghỉ có phép. Đã tự động thêm Buổi ${nextSessionPreview?.nextSessionNumber || newSession.sessionNumber} (${nextSessionPreview?.formattedNextDate || ""}) vào lịch học.`,
      });

      invalidateClassWorkspace(queryClient, classId);
      refetchClass();
      if (onRefreshMatrix) onRefreshMatrix();
      setDayOffModalOpen(false);
      setDayOffReason("");
    } catch (err: any) {
      toast({
        title: "Lỗi báo nghỉ",
        description: err.message || "Không thể báo nghỉ và thêm buổi bù",
        variant: "destructive",
      });
    } finally {
      setProcessingDayOff(false);
    }
  };

  // Đặt lại điểm danh
  const handleResetAttendance = () => {
    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        status: "UNMARKED",
        note: "",
      }))
    );
    toast({
      title: "Đã đặt lại",
      description: "Trạng thái điểm danh đã được đặt lại.",
    });
  };

  // Lưu nháp điểm danh
  const handleSaveAttendance = async () => {
    if (!selectedSessionId) return;
    setSaving(true);
    try {
      const payload = items.map((it) => ({
        studentId: it.studentId,
        status: it.status,
        note: it.note || null,
      }));

      await attendanceApi.markAttendance(classId, selectedSessionId, payload);
      toast({ title: "Thành công", description: "Đã lưu bảng điểm danh thành công." });
      invalidateClassWorkspace(queryClient, classId);
      if (onRefreshMatrix) onRefreshMatrix();
    } catch (err: any) {
      toast({ title: "Lỗi", description: err.message || "Không thể lưu điểm danh", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  // Chốt hoàn tất buổi học (COMPLETED)
  const handleCompleteSession = async () => {
    if (!selectedSessionId) return;

    const unmarked = items.filter((it) => it.status === "UNMARKED");
    if (unmarked.length > 0) {
      toast({
        title: "Chưa thể chốt buổi học",
        description: `Còn ${unmarked.length} học viên chưa được điểm danh. Vui lòng chọn trạng thái cho tất cả học viên trước khi chốt.`,
        variant: "destructive",
      });
      return;
    }

    setCompleting(true);
    try {
      const payload = items.map((it) => ({
        studentId: it.studentId,
        status: it.status,
        note: it.note || null,
      }));
      await attendanceApi.markAttendance(classId, selectedSessionId, payload);
      await attendanceApi.completeSession(classId, selectedSessionId);

      setSessionData((prev) => (prev ? { ...prev, status: "COMPLETED" } : null));
      setLocalSessionStatuses((prev) => ({
        ...prev,
        [selectedSessionId]: "COMPLETED",
      }));
      toast({ title: "Thành công", description: "Buổi học đã được chốt và khóa điểm danh." });
      invalidateClassWorkspace(queryClient, classId);
      refetchClass();
      if (onRefreshMatrix) onRefreshMatrix();
    } catch (err: any) {
      toast({ title: "Lỗi", description: err.message || "Không thể chốt buổi học", variant: "destructive" });
    } finally {
      setCompleting(false);
    }
  };

  // Mở lại điểm danh cho buổi đã chốt
  const handleUnlockSession = async () => {
    if (!selectedSessionId) return;
    try {
      await attendanceApi.unlockSession(classId, selectedSessionId);
      setSessionData((prev) => (prev ? { ...prev, status: "SCHEDULED" } : null));
      setLocalSessionStatuses((prev) => ({
        ...prev,
        [selectedSessionId]: "SCHEDULED",
      }));
      toast({ title: "Đã mở lại", description: "Buổi học đã được mở lại để chỉnh sửa điểm danh." });
      invalidateClassWorkspace(queryClient, classId);
      refetchClass();
      if (onRefreshMatrix) onRefreshMatrix();
    } catch (err: any) {
      toast({ title: "Lỗi", description: err.message || "Không thể mở lại buổi học", variant: "destructive" });
    }
  };

  // Tự động khởi tạo danh sách buổi học nếu lớp chưa có buổi nào
  const handleGenerateSessions = async () => {
    setGeneratingSessions(true);
    try {
      const today = new Date().toISOString().split("T")[0];
      const totalToGenerate = classData?.lessons?.length || 24;

      await sessionsApi.generateForClass(classId, {
        startDate: today,
        weekdays: [1, 3, 5], // Thứ 2, 4, 6
        totalSessions: totalToGenerate,
        startTime: "18:00",
        endTime: "20:00",
      });

      toast({
        title: "Khởi tạo thành công",
        description: `Đã tự động tạo ${totalToGenerate} buổi học cho lớp.`,
      });
      invalidateClassWorkspace(queryClient, classId);
      refetchClass();
    } catch (err: any) {
      toast({
        title: "Lỗi khởi tạo",
        description: err.message || "Không thể tạo buổi học",
        variant: "destructive",
      });
    } finally {
      setGeneratingSessions(false);
    }
  };

  const currentSelectedStatus = localSessionStatuses[selectedSessionId] || sessionData?.status || "SCHEDULED";
  const isCompleted = currentSelectedStatus === "COMPLETED";

  // Summary counts
  const presentCount = items.filter((it) => it.status === "PRESENT").length;
  const lateCount = items.filter((it) => it.status === "LATE").length;
  const absentCount = items.filter((it) => it.status === "ABSENT").length;
  const excusedCount = items.filter((it) => it.status === "EXCUSED").length;
  const unmarkedCount = items.filter((it) => it.status === "UNMARKED").length;

  // Render empty state if no sessions exist
  if (sessions.length === 0) {
    return (
      <div className="p-8 border rounded-2xl bg-card text-center space-y-4 shadow-xs">
        <CalendarPlus className="h-12 w-12 text-emerald-600 mx-auto" />
        <div className="space-y-1">
          <h4 className="text-base font-bold text-foreground">Lớp học chưa có danh sách buổi học</h4>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Lớp học hiện chưa có buổi học nào trong lịch trình. Vui lòng bấm nút bên dưới để tự động tạo danh sách các buổi học và bắt đầu điểm danh.
          </p>
        </div>
        <Button
          size="sm"
          className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 font-semibold shadow-sm"
          disabled={generatingSessions}
          onClick={handleGenerateSessions}
        >
          {generatingSessions ? <Loader2 className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4" />}
          Khởi tạo danh sách buổi học ngay
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 pt-2">
      {/* Top Session Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl border bg-card shadow-xs">
        <div className="flex flex-wrap items-center gap-3">
          <label className="text-xs font-semibold text-muted-foreground whitespace-nowrap">Chọn Buổi học:</label>
          <Select value={selectedSessionId} onValueChange={setSelectedSessionId}>
            <SelectTrigger className="w-[440px] max-w-full h-9 text-xs font-medium bg-background">
              <SelectValue placeholder="Chọn buổi học" />
            </SelectTrigger>
            <SelectContent className="max-h-[340px]">
              {sessions.map((s) => {
                const dateStr = s.scheduledDate || "";
                const formattedDate = dateStr ? dateStr.slice(0, 10).split("-").reverse().join("/") : "—";
                const lessonLabel = s.lessonTitle || `Lesson ${s.sessionNumber}`;
                const effectiveStatus = localSessionStatuses[s.id] || s.status || "SCHEDULED";
                const isItemCompleted = effectiveStatus === "COMPLETED";
                const isItemCancelled = effectiveStatus === "CANCELLED";

                return (
                  <SelectItem
                    key={s.id}
                    value={s.id}
                    className={`text-xs font-medium py-2 px-3 my-0.5 rounded-lg transition-all cursor-pointer border border-transparent hover:bg-red-50 hover:text-red-900 hover:border-red-200 focus:bg-red-50 focus:text-red-900 focus:border-red-200 data-[highlighted]:bg-red-50 data-[highlighted]:text-red-900 data-[highlighted]:border-red-200 data-[highlighted]:font-semibold ${
                      isItemCompleted
                        ? "bg-emerald-50/50 text-emerald-950 font-medium"
                        : isItemCancelled
                        ? "bg-rose-50/40 text-rose-800"
                        : "text-slate-800"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full gap-3">
                      <span className="truncate">
                        Buổi {s.sessionNumber} • {formattedDate} • {lessonLabel}
                      </span>
                      {isItemCompleted ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100/90 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                          ✓ Đã chốt
                        </span>
                      ) : isItemCancelled ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-100/90 px-2 py-0.5 rounded-full border border-rose-200 shrink-0">
                          🚫 Đã hủy
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full border border-amber-200 shrink-0">
                          ⏳ Chưa chốt
                        </span>
                      )}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>

          {isCompleted ? (
            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 text-xs gap-1">
              <Lock className="h-3 w-3 text-emerald-600" />
              Buổi học đã chốt (Khóa điểm danh)
            </Badge>
          ) : (
            <Badge variant="outline" className="text-xs text-amber-700 bg-amber-50 border-amber-200">
              Buổi học chưa chốt
            </Badge>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {!isCompleted ? (
            <>
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs gap-1.5 text-emerald-700 border-emerald-200 hover:bg-emerald-50"
                onClick={handleMarkAllPresent}
                disabled={saving || loading || items.length === 0}
              >
                <Zap className="h-3.5 w-3.5 fill-current text-emerald-600" />
                Tất cả có mặt
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs gap-1.5 text-purple-700 border-purple-200 bg-purple-50/50 hover:bg-purple-100/70"
                onClick={() => setDayOffModalOpen(true)}
                disabled={saving || loading || items.length === 0}
              >
                <CalendarOff className="h-3.5 w-3.5 text-purple-600" />
                Nghỉ (Đôn lịch)
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-xs text-muted-foreground hover:text-foreground gap-1"
                onClick={handleResetAttendance}
                disabled={saving || loading || items.length === 0}
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Đặt lại
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs gap-1.5"
                onClick={handleSaveAttendance}
                disabled={saving || loading || items.length === 0}
              >
                {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                Lưu nháp
              </Button>

              <Button
                size="sm"
                className="h-8 text-xs bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5"
                onClick={handleCompleteSession}
                disabled={completing || saving || loading || items.length === 0}
              >
                {completing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <CheckCheck className="h-3.5 w-3.5" />}
                Chốt điểm danh buổi học
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs gap-1.5 border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100"
              onClick={handleUnlockSession}
            >
              <Unlock className="h-3.5 w-3.5 text-amber-600" />
              Mở lại điểm danh
            </Button>
          )}
        </div>
      </div>

      {/* Summary Stat Pills */}
      {items.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-lg bg-muted text-muted-foreground font-semibold">
            Tổng: {items.length} học viên
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3 text-emerald-600" /> Có mặt: {presentCount}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 font-semibold flex items-center gap-1">
            <Clock className="h-3 w-3 text-amber-600" /> Đi muộn: {lateCount}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-800 border border-rose-200 font-semibold flex items-center gap-1">
            <XCircle className="h-3 w-3 text-rose-600" /> Vắng mặt: {absentCount}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-800 border border-purple-200 font-semibold flex items-center gap-1">
            <AlertCircle className="h-3 w-3 text-purple-600" /> Có phép: {excusedCount}
          </span>
          {unmarkedCount > 0 && (
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 border font-semibold animate-pulse">
              Chưa điểm danh: {unmarkedCount}
            </span>
          )}
        </div>
      )}

      {/* Main Attendance Table */}
      {loading ? (
        <div className="p-12 text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin text-emerald-600" />
          Đang tải dữ liệu điểm danh...
        </div>
      ) : items.length === 0 ? (
        <div className="p-8 border rounded-xl bg-card text-center space-y-2">
          <Users className="h-8 w-8 text-muted-foreground mx-auto" />
          <p className="text-xs text-muted-foreground font-medium">Chưa có học viên nào trong lớp để điểm danh.</p>
        </div>
      ) : (
        <div className="border rounded-xl bg-card overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="w-[280px]">Học viên</TableHead>
                <TableHead>Trạng thái điểm danh</TableHead>
                <TableHead className="w-[280px]">Ghi chú</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((student) => (
                <TableRow key={student.studentId} className="hover:bg-red-50/60 hover:border-l-4 hover:border-l-red-500 transition-all cursor-pointer">
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={student.avatarUrl} />
                        <AvatarFallback className="text-xs bg-emerald-100 text-emerald-800">
                          {(student.studentName || "HV").slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm text-foreground">{student.studentName}</div>
                        {student.status === "UNMARKED" && (
                          <span className="text-[11px] text-amber-600 font-medium">Chưa chọn trạng thái</span>
                        )}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <Button
                        type="button"
                        size="sm"
                        variant={student.status === "PRESENT" ? "default" : "outline"}
                        disabled={isCompleted}
                        className={`h-7 px-2.5 text-xs font-semibold gap-1 ${
                          student.status === "PRESENT" ? "bg-emerald-600 hover:bg-emerald-700 text-white" : ""
                        }`}
                        onClick={() => handleStatusChange(student.studentId, "PRESENT")}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" /> Có mặt
                      </Button>

                      <Button
                        type="button"
                        size="sm"
                        variant={student.status === "LATE" ? "default" : "outline"}
                        disabled={isCompleted}
                        className={`h-7 px-2.5 text-xs font-semibold gap-1 ${
                          student.status === "LATE" ? "bg-amber-600 hover:bg-amber-700 text-white" : ""
                        }`}
                        onClick={() => handleStatusChange(student.studentId, "LATE")}
                      >
                        <Clock className="h-3.5 w-3.5" /> Đi muộn
                      </Button>

                      <Button
                        type="button"
                        size="sm"
                        variant={student.status === "ABSENT" ? "default" : "outline"}
                        disabled={isCompleted}
                        className={`h-7 px-2.5 text-xs font-semibold gap-1 ${
                          student.status === "ABSENT" ? "bg-rose-600 hover:bg-rose-700 text-white" : ""
                        }`}
                        onClick={() => handleStatusChange(student.studentId, "ABSENT")}
                      >
                        <XCircle className="h-3.5 w-3.5" /> Vắng mặt
                      </Button>

                      <Button
                        type="button"
                        size="sm"
                        variant={student.status === "EXCUSED" ? "default" : "outline"}
                        disabled={isCompleted}
                        className={`h-7 px-2.5 text-xs font-semibold gap-1 ${
                          student.status === "EXCUSED" ? "bg-purple-600 hover:bg-purple-700 text-white" : ""
                        }`}
                        onClick={() => handleStatusChange(student.studentId, "EXCUSED")}
                      >
                        <AlertCircle className="h-3.5 w-3.5" /> Có phép
                      </Button>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Input
                      disabled={isCompleted}
                      placeholder="Nhập ghi chú (nếu có)"
                      className="h-8 text-xs max-w-xs"
                      value={student.note || ""}
                      onChange={(e) => handleNoteChange(student.studentId, e.target.value)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Modal xác nhận Báo nghỉ buổi học & Đôn lịch bù */}
      <Dialog open={dayOffModalOpen} onOpenChange={setDayOffModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base font-bold text-foreground">
              <CalendarOff className="h-5 w-5 text-purple-600" />
              Báo nghỉ buổi học & Đôn thêm buổi bù
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Đánh dấu toàn bộ học viên nghỉ có phép do sự cố (cúp điện, thời tiết...) hoặc nghỉ Lễ/Tết và tự động kéo dài lịch học thêm 1 buổi.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Box thông tin tóm tắt */}
            <div className="p-3.5 rounded-xl bg-purple-50/60 border border-purple-200/80 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-purple-950">Buổi học hiện tại:</span>
                <Badge variant="outline" className="bg-white text-purple-900 border-purple-200 font-bold">
                  {(() => {
                    const cur = sessions.find((s) => s.id === selectedSessionId);
                    const formatted = cur?.scheduledDate ? cur.scheduledDate.slice(0, 10).split("-").reverse().join("/") : "—";
                    return `Buổi ${cur?.sessionNumber || 1} • ${formatted}`;
                  })()}
                </Badge>
              </div>

              <div className="text-xs text-purple-900 leading-relaxed">
                👉 Tất cả <strong>{items.length} học viên</strong> trong buổi này sẽ được chuyển sang trạng thái <strong>Có phép (Nghỉ)</strong>.
              </div>

              {nextSessionPreview && (
                <div className="pt-2 border-t border-purple-200/60 space-y-1.5 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-purple-950">
                    <Sparkles className="h-3.5 w-3.5 text-purple-600" />
                    Tự động thêm 1 buổi bù tiếp theo:
                  </div>
                  <div className="grid grid-cols-2 gap-2 bg-white/80 p-2.5 rounded-lg border border-purple-100 text-xs">
                    <div>
                      <span className="text-muted-foreground text-[11px] block">Buổi học bù:</span>
                      <span className="font-bold text-foreground">Buổi {nextSessionPreview.nextSessionNumber}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-[11px] block">Ngày học ({nextSessionPreview.nextDayName}):</span>
                      <span className="font-bold text-emerald-700">{nextSessionPreview.formattedNextDate}</span>
                    </div>
                    <div className="col-span-2 text-[11px] text-muted-foreground">
                      Lịch cố định của lớp: <span className="font-medium text-foreground">{nextSessionPreview.weekdaysLabels}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Nhập lý do nghỉ */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground flex items-center justify-between">
                <span>Lý do nghỉ (tuỳ chọn):</span>
                <span className="text-[11px] text-muted-foreground font-normal">Ghi chú vào điểm danh</span>
              </label>
              <Input
                placeholder="VD: Cúp điện đột xuất, Nghỉ lễ, Giáo viên bận..."
                value={dayOffReason}
                onChange={(e) => setDayOffReason(e.target.value)}
                className="text-xs h-9"
              />

              {/* Gợi ý lý do nhanh */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  "Cúp điện đột xuất",
                  "Nghỉ Lễ / Tết",
                  "Thời tiết xấu / Mưa bão",
                  "Sự cố phòng học",
                  "Giáo viên bận đột xuất",
                ].map((reason) => (
                  <button
                    key={reason}
                    type="button"
                    onClick={() => setDayOffReason(reason)}
                    className="text-[11px] px-2 py-0.5 rounded-md border bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  >
                    + {reason}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 text-xs"
              onClick={() => setDayOffModalOpen(false)}
              disabled={processingDayOff}
            >
              Hủy
            </Button>
            <Button
              type="button"
              size="sm"
              className="h-8 text-xs bg-purple-600 hover:bg-purple-700 text-white gap-1.5 font-semibold"
              onClick={handleConfirmDayOffAndExtend}
              disabled={processingDayOff}
            >
              {processingDayOff ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <CalendarPlus className="h-3.5 w-3.5" />
              )}
              Xác nhận báo nghỉ & Thêm buổi bù
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
