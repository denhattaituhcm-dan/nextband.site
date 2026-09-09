import { useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usersApi, submissionsApi, interventionsApi, periodicReportsApi, classesApi } from "@/lib/api";
import { submissionKeys } from "@/lib/queryKeys";
import { aggregateWritingEvidence } from "@/lib/writingEvidenceAggregator";
import { QUESTION_TYPE_METADATA, QuestionTypeStat } from "@/lib/objectiveEvidenceAggregator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ArrowLeft,
  BookMarked,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Phone,
  Calendar,
  Clock,
  GraduationCap,
  Sparkles,
  Plus,
  Send,
  MessageSquare,
  FileText,
  TrendingUp,
  Award,
  Target,
  UserCheck,
  ExternalLink,
  ChevronRight,
  Flame,
  Zap,
  HelpCircle,
  BarChart2,
  CheckSquare,
  Printer,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function StudentStrategicDossierPage() {
  const { id: studentId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState<string>("overview");

  // Fetch Student 360 View Model
  const { data: student, isLoading: isStudentLoading } = useQuery({
    queryKey: ["student-strategic-dossier", studentId],
    queryFn: () => usersApi.getStudentDossier(studentId!),
    enabled: !!studentId,
    staleTime: 1000 * 60 * 2,
  });

  // Fetch Submissions for academic deep dive (Writing & Objective items)
  const { data: submissionsData } = useQuery({
    queryKey: submissionKeys.profileSubmissions(studentId),
    queryFn: () => submissionsApi.list({ studentId, limit: 300 }).catch(() => ({ data: [] })),
    enabled: !!studentId,
    staleTime: 1000 * 60 * 2,
  });
  const submissions = useMemo(() => {
    return Array.isArray(submissionsData?.data) ? submissionsData.data : [];
  }, [submissionsData]);

  // Writing Evidence Aggregation
  const writingProfile = useMemo(() => {
    return aggregateWritingEvidence(submissions);
  }, [submissions]);

  // Objective Reading & Listening Aggregation
  const { readingStats, listeningStats, overallObjectiveAccuracy } = useMemo(() => {
    const readMap: Record<string, { total: number; correct: number }> = {};
    const listMap: Record<string, { total: number; correct: number }> = {};
    let totalObj = 0;
    let totalCorrect = 0;

    submissions.forEach((sub: any) => {
      if (!Array.isArray(sub?.answers)) return;
      const isListening =
        sub?.exam?.examType === "LISTENING" ||
        sub?.exam?.title?.toLowerCase().includes("listening");

      sub.answers.forEach((ans: any) => {
        const qType = ans?.question?.questionType || ans?.questionType;
        if (!qType) return;
        const isCorrect = ans.score != null ? ans.score > 0 : false;
        totalObj++;
        if (isCorrect) totalCorrect++;

        const targetMap = isListening || qType === "listening" ? listMap : readMap;
        if (!targetMap[qType]) {
          targetMap[qType] = { total: 0, correct: 0 };
        }
        targetMap[qType].total++;
        if (isCorrect) targetMap[qType].correct++;
      });
    });

    const mapToStats = (map: Record<string, { total: number; correct: number }>): QuestionTypeStat[] => {
      return Object.entries(map)
        .map(([typeKey, data]) => {
          const meta = QUESTION_TYPE_METADATA[typeKey] || {
            typeKey,
            labelVi: typeKey.replace(/_/g, " ").toUpperCase(),
            skill: "Reading / Listening",
            descriptionVi: "Dạng bài trắc nghiệm",
            remediationAdvice: "Rèn luyện thêm kỹ thuật định vị thông tin.",
          };
          const accuracyPercent = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
          let status: "CRITICAL_WEAKNESS" | "NEEDS_IMPROVEMENT" | "STRONG_MASTERY" = "NEEDS_IMPROVEMENT";
          if (accuracyPercent < 50 && data.total - data.correct > 0) {
            status = "CRITICAL_WEAKNESS";
          } else if (accuracyPercent >= 75) {
            status = "STRONG_MASTERY";
          }

          return {
            questionType: typeKey,
            labelVi: meta.labelVi,
            skill: meta.skill,
            descriptionVi: meta.descriptionVi,
            remediationAdvice: meta.remediationAdvice,
            total: data.total,
            correct: data.correct,
            incorrect: data.total - data.correct,
            accuracyPercent,
            status,
            incorrectQuestionIds: [],
          };
        })
        .sort((a, b) => a.accuracyPercent - b.accuracyPercent);
    };

    return {
      readingStats: mapToStats(readMap),
      listeningStats: mapToStats(listMap),
      overallObjectiveAccuracy: totalObj > 0 ? Math.round((totalCorrect / totalObj) * 100) : 0,
    };
  }, [submissions]);

  // Speaking Metrics
  const speakingStats = useMemo(() => {
    let count = 0;
    const scores: { fc: number[]; lr: number[]; gr: number[]; pr: number[] } = { fc: [], lr: [], gr: [], pr: [] };

    submissions.forEach((sub: any) => {
      const isSpeaking = sub?.exam?.examType === "SPEAKING" || sub?.exam?.title?.toLowerCase().includes("speaking");
      if (!isSpeaking) return;
      count++;
      (sub.answers || []).forEach((ans: any) => {
        try {
          if (ans?.feedback && typeof ans.feedback === "string" && ans.feedback.startsWith("{")) {
            const parsed = JSON.parse(ans.feedback);
            const cs = parsed?.criteriaScores;
            if (cs?.fluencyCoherence) scores.fc.push(Number(cs.fluencyCoherence));
            if (cs?.lexicalResource) scores.lr.push(Number(cs.lexicalResource));
            if (cs?.grammaticalRangeAccuracy) scores.gr.push(Number(cs.grammaticalRangeAccuracy));
            if (cs?.pronunciation) scores.pr.push(Number(cs.pronunciation));
          }
        } catch {
          // ignore
        }
      });
    });

    const avg = (arr: number[]) => (arr.length > 0 ? (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1) : "—");
    return {
      count,
      avgFC: avg(scores.fc),
      avgLR: avg(scores.lr),
      avgGR: avg(scores.gr),
      avgPR: avg(scores.pr),
    };
  }, [submissions]);

  // Interventions Log (OP-GAP-01)
  const { data: interventions = [], isLoading: isInterventionsLoading } = useQuery({
    queryKey: ["student-interventions-dossier", studentId],
    queryFn: () => interventionsApi.listByStudent(studentId!),
    enabled: !!studentId,
  });

  // Periodic Report / Teacher Evaluation
  const primaryClassId = student?.classes?.[0]?.id;
  const { data: latestEvaluation } = useQuery({
    queryKey: ["student-periodic-report-dossier", primaryClassId, studentId],
    queryFn: () => (primaryClassId && studentId ? periodicReportsApi.getLatest(primaryClassId, studentId) : null),
    enabled: !!primaryClassId && !!studentId,
  });

  // Quick Modal: Add New Intervention / Guardian Call
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [callForm, setCallForm] = useState({
    category: "PARENT_COMMUNICATION",
    title: "",
    notes: "",
    actionTaken: "",
    agreedPlan: "",
    followUpDate: "",
    status: "RESOLVED",
  });
  const [isSubmittingCall, setIsSubmittingCall] = useState(false);

  const handleSaveCall = async () => {
    if (!callForm.notes.trim()) {
      toast({ title: "Lỗi", description: "Vui lòng nhập nội dung trao đổi với phụ huynh", variant: "destructive" });
      return;
    }
    setIsSubmittingCall(true);
    try {
      await interventionsApi.create({
        studentId: studentId!,
        classId: primaryClassId || null,
        category: callForm.category,
        title: callForm.title || "Cuộc gọi chăm sóc & cập nhật phụ huynh",
        notes: callForm.notes,
        actionTaken: callForm.actionTaken || null,
        agreedPlan: callForm.agreedPlan || null,
        followUpDate: callForm.followUpDate || null,
        status: callForm.status,
      });

      queryClient.invalidateQueries({ queryKey: ["student-interventions-dossier", studentId] });
      queryClient.invalidateQueries({ queryKey: ["student-strategic-dossier", studentId] });
      toast({
        title: "Đã lưu nhật ký chăm sóc",
        description: "Ghi chép trao đổi với phụ huynh đã được lưu vào Hồ sơ chiến lược.",
      });
      setCallModalOpen(false);
      setCallForm({
        category: "PARENT_COMMUNICATION",
        title: "",
        notes: "",
        actionTaken: "",
        agreedPlan: "",
        followUpDate: "",
        status: "RESOLVED",
      });
    } catch (err: any) {
      toast({ title: "Lỗi", description: err.message || "Không thể lưu nhật ký", variant: "destructive" });
    } finally {
      setIsSubmittingCall(false);
    }
  };

  if (isStudentLoading) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-xs text-muted-foreground">Đang tổng hợp Hồ sơ Chiến lược 360°...</p>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="p-8 text-center space-y-4">
        <AlertTriangle className="h-10 w-10 text-amber-500 mx-auto" />
        <h2 className="text-lg font-bold">Không tìm thấy hồ sơ học viên</h2>
        <Button variant="outline" onClick={() => navigate("/admin/students")}>
          Quay lại danh sách
        </Button>
      </div>
    );
  }

  const baseline = student.diagnosticBaseline;
  const currentBand = baseline?.estimatedBand || "5.0";
  const targetBand = baseline?.targetBand || (student.convertedLead?.goal ? student.convertedLead.goal : "6.5");
  const healthScore = student.academicHealth;
  const attendanceRate = student.attendance?.percentage != null ? `${student.attendance.percentage}%` : "—";
  const homeworkRate = student.homework?.percentage != null ? `${student.homework.percentage}%` : "—";
  const currentClass = student.classes?.[0];
  const teacherName = currentClass?.teacherName || "Chưa phân GV";
  const parentName = student.parentName || student.convertedLead?.fullName || "Chưa cập nhật";
  const parentPhone = student.parentPhone || student.convertedLead?.phone || student.phone;

  // Build Unified Strategic Timeline Events
  const timelineEvents = [
    ...(baseline?.testDate
      ? [
          {
            date: new Date(baseline.testDate),
            title: `Khảo thí đầu vào: Band ${baseline.estimatedBand || "—"}`,
            category: "ASSESSMENT",
            desc: `Độ chính xác: ${baseline.accuracyPercent || "—"}% • Mục tiêu: Band ${targetBand}`,
            badge: "Entry Baseline",
            badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
          },
        ]
      : []),
    ...(student.recentActivities || []).map((act: any) => ({
      date: new Date(act.timestamp),
      title: act.title,
      category: act.type === "submission" ? "SUBMISSION" : act.type === "attendance" ? "ATTENDANCE" : "GENERAL",
      desc: act.description || "",
      badge: act.type === "submission" ? "Bài nộp" : act.type === "attendance" ? "Điểm danh" : "Hệ thống",
      badgeColor: act.type === "submission" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-blue-50 text-blue-700 border-blue-200",
    })),
    ...interventions.map((inv: any) => ({
      date: new Date(inv.createdAt),
      title: inv.title || "Can thiệp học vụ / Chăm sóc phụ huynh",
      category: "INTERVENTION",
      desc: inv.notes,
      badge: inv.category === "PARENT_COMMUNICATION" ? "📞 Phụ huynh" : "⚠️ Can thiệp",
      badgeColor: "bg-amber-50 text-amber-800 border-amber-300",
    })),
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="space-y-6 pb-16">
      {/* 1. TOP BAR NAVIGATION */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/admin/students")}
          className="gap-1.5 text-xs text-muted-foreground hover:text-foreground -ml-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Danh sách học viên</span>
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            className="h-8 gap-1.5 text-xs text-muted-foreground"
          >
            <Printer className="h-3.5 w-3.5" />
            In hồ sơ tư vấn
          </Button>
          <Button
            size="sm"
            onClick={() => setCallModalOpen(true)}
            className="h-8 gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
          >
            <Phone className="h-3.5 w-3.5" />
            Ghi nhận cuộc gọi PH
          </Button>
        </div>
      </div>

      {/* 2. STRATEGIC EXECUTIVE HEADER */}
      <Card className="border-border/80 shadow-xs bg-gradient-to-r from-card via-card to-muted/20">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Left: Identity */}
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16 border-2 border-primary/20 shadow-xs">
                <AvatarImage src={student.avatarUrl} />
                <AvatarFallback className="bg-primary/10 text-primary font-black text-lg">
                  {student.fullName ? student.fullName.substring(0, 2).toUpperCase() : "HV"}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
                    {student.fullName || "Học viên"}
                  </h1>
                  <Badge variant="secondary" className="text-xs font-semibold">
                    {currentClass?.name || "Chưa xếp lớp"}
                  </Badge>
                  {student.isReserved && (
                    <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300 font-bold text-xs">
                      ⏸️ Đang bảo lưu
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {currentClass?.courseTitle || "Lộ trình IELTS"} • GV: <strong>{teacherName}</strong>
                </p>
                <div className="flex items-center gap-3 pt-1 text-xs text-muted-foreground flex-wrap">
                  <span>Email: <strong className="text-foreground">{student.email}</strong></span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-medium">
                    <Phone className="h-3.5 w-3.5" />
                    PH: <strong>{parentName}</strong> ({parentPhone || "Chưa có SĐT"})
                  </span>
                </div>
              </div>
            </div>

            {/* Right: 4 Big Strategic Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-background border text-center shadow-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                  Band Đầu Vào
                </span>
                <span className="text-xl font-black text-indigo-600 block mt-0.5">
                  {currentBand}
                </span>
                <span className="text-[10px] text-muted-foreground">Diagnostic</span>
              </div>

              <div className="p-3 rounded-xl bg-background border text-center shadow-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                  Mục Tiêu
                </span>
                <span className="text-xl font-black text-primary block mt-0.5">
                  Band {targetBand}
                </span>
                <span className="text-[10px] text-muted-foreground">Target Out</span>
              </div>

              <div className="p-3 rounded-xl bg-background border text-center shadow-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                  Sức Khỏe Học Vụ
                </span>
                <span className={`text-xl font-black block mt-0.5 ${
                  (healthScore ?? 0) >= 80 ? "text-emerald-600" : (healthScore ?? 0) >= 55 ? "text-amber-600" : "text-rose-600"
                }`}>
                  {healthScore != null ? `${healthScore}/100` : "—"}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {(healthScore ?? 0) >= 80 ? "🟢 Ổn định" : (healthScore ?? 0) >= 55 ? "🟡 Chú ý" : "🔴 Nguy cơ"}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-background border text-center shadow-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                  Chuyên Cần
                </span>
                <span className="text-xl font-black text-foreground block mt-0.5">
                  {attendanceRate}
                </span>
                <span className="text-[10px] text-muted-foreground">BTVN: {homeworkRate}</span>
              </div>
            </div>
          </div>

          {/* 3. EXECUTIVE ALERT & DIRECT COUNSELING BRIEF */}
          <div className="mt-5 p-3.5 rounded-xl bg-primary/5 border border-primary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-start gap-2.5">
              <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-primary mr-1.5 uppercase tracking-wide">
                  Tóm tắt trả lời Phụ huynh (Academic Brief):
                </span>
                <span className="text-foreground leading-relaxed">
                  {healthScore != null && healthScore < 60
                    ? `Học viên hiện đang ở Band ${currentBand}, mục tiêu ${targetBand}. Tiến độ BTVN đang chậm (${homeworkRate}), chuyên cần ${attendanceRate}. Cần ưu tiên củng cố bài tập và liên hệ phụ huynh hỗ trợ giám sát nhịp học.`
                    : `Học viên duy trì nhịp học tốt với sức khỏe học tập ${healthScore ?? 85}/100. Điểm chuyên cần đạt ${attendanceRate}, hoàn thành ${homeworkRate} bài tập được giao. Đang bám sát lộ trình đạt Band ${targetBand}.`}
                </span>
              </div>
            </div>

            <Button
              size="sm"
              variant="outline"
              onClick={() => setActiveTab("timeline")}
              className="h-7 text-[11px] shrink-0 font-medium"
            >
              Xem dòng thời gian
              <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 4. SIX STRATEGIC TABS */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-6 h-11 bg-muted/60 p-1 rounded-xl text-xs font-semibold">
          <TabsTrigger value="overview">1. Tổng quan</TabsTrigger>
          <TabsTrigger value="academic">2. Năng lực (4 KN)</TabsTrigger>
          <TabsTrigger value="discipline">3. Hành vi học tập</TabsTrigger>
          <TabsTrigger value="teacher">4. Giáo viên</TabsTrigger>
          <TabsTrigger value="guardian">5. Chăm sóc PH</TabsTrigger>
          <TabsTrigger value="timeline">6. Timeline</TabsTrigger>
        </TabsList>

        {/* TAB 1: TỔNG QUAN */}
        <TabsContent value="overview" className="space-y-4 m-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-border/80 md:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  Mục tiêu IELTS & Lộ trình Cam kết
                </CardTitle>
                <CardDescription className="text-xs">
                  Khoảng cách từ năng lực khởi điểm tới band điểm kỳ vọng
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-xs">
                <div className="p-3.5 rounded-xl bg-muted/30 border space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">Tiến trình đạt Band:</span>
                    <span className="font-bold text-foreground">{currentBand} ➔ Band {targetBand}</span>
                  </div>
                  <Progress value={65} className="h-2.5" />
                  <div className="flex justify-between text-[11px] text-muted-foreground pt-1">
                    <span>Đầu vào: {currentBand}</span>
                    <span className="text-primary font-semibold">Đang ở giai đoạn tăng tốc</span>
                    <span>Đích đến: {targetBand}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-lg border bg-card space-y-1">
                    <span className="text-muted-foreground block text-[11px]">Khóa học hiện tại:</span>
                    <p className="font-bold text-sm text-foreground">{currentClass?.courseTitle || "Chưa rõ khóa"}</p>
                    <p className="text-[11px] text-muted-foreground">Lớp: {currentClass?.name}</p>
                  </div>
                  <div className="p-3 rounded-lg border bg-card space-y-1">
                    <span className="text-muted-foreground block text-[11px]">Giáo viên chủ nhiệm:</span>
                    <p className="font-bold text-sm text-foreground">{teacherName}</p>
                    <p className="text-[11px] text-muted-foreground">Theo dõi học vụ sát sao</p>
                  </div>
                </div>

                {student.convertedLead && (
                  <div className="p-3 rounded-lg border bg-amber-500/5 border-amber-500/20 space-y-1.5">
                    <span className="font-bold text-amber-900 dark:text-amber-300 text-[11px] uppercase tracking-wider block">
                      Nhu cầu & Kỳ vọng ban đầu từ gia đình (CRM Lead):
                    </span>
                    <p className="text-foreground leading-relaxed text-[11px]">
                      {student.convertedLead.goal || "Chưa ghi nhận mục tiêu ban đầu"}
                    </p>
                    {student.convertedLead.notes && (
                      <p className="text-muted-foreground italic text-[11px]">
                        &ldquo;{student.convertedLead.notes}&rdquo;
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-border/80">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-emerald-600" />
                  Thông tin Gia đình & Liên hệ
                </CardTitle>
                <CardDescription className="text-xs">
                  Đầu mối liên lạc chính khi xảy ra biến động học vụ
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3.5 text-xs">
                <div className="space-y-1">
                  <span className="text-muted-foreground text-[11px]">Phụ huynh / Người bảo hộ:</span>
                  <p className="font-bold text-sm text-foreground">{parentName}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-muted-foreground text-[11px]">Số điện thoại liên lạc:</span>
                  <p className="font-mono font-bold text-sm text-emerald-600 flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5" />
                    {parentPhone || "Chưa cập nhật"}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-muted-foreground text-[11px]">Email học viên:</span>
                  <p className="font-mono text-xs text-foreground">{student.email}</p>
                </div>

                <Separator />

                <div className="pt-1">
                  <Button
                    size="sm"
                    className="w-full gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-700 font-semibold"
                    onClick={() => setCallModalOpen(true)}
                  >
                    <Phone className="h-3.5 w-3.5" />
                    Ghi chép trao đổi với PH
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* TAB 2: NĂNG LỰC 4 KỸ NĂNG (HỌC THUẬT SÂU) */}
        <TabsContent value="academic" className="space-y-4 m-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border/80">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-bold flex items-center justify-between">
                  <span>Reading: Dạng câu hỏi & Độ chính xác</span>
                  <Badge variant="outline" className="text-xs">
                    {readingStats.length} dạng bài
                  </Badge>
                </CardTitle>
                <CardDescription className="text-xs">
                  Phát hiện chính xác dạng bài học viên đang bị kéo điểm xuống
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                {readingStats.length === 0 ? (
                  <p className="text-muted-foreground py-6 text-center text-xs">
                    Chưa có bài tập Reading nộp để tổng hợp dạng bài.
                  </p>
                ) : (
                  readingStats.map((item) => (
                    <div key={item.questionType} className="p-2.5 rounded-lg border bg-card space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-foreground">{item.labelVi}</span>
                        <Badge
                          variant="outline"
                          className={
                            item.accuracyPercent >= 75
                              ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                              : item.accuracyPercent >= 50
                              ? "bg-amber-50 text-amber-700 border-amber-300"
                              : "bg-rose-50 text-rose-700 border-rose-300"
                          }
                        >
                          {item.accuracyPercent}% ({item.correct}/{item.total})
                        </Badge>
                      </div>
                      <Progress value={item.accuracyPercent} className="h-1.5" />
                      {item.accuracyPercent < 50 && (
                        <p className="text-[11px] text-rose-600 dark:text-rose-400 font-medium">
                          ⚠️ Lỗ hổng: {item.remediationAdvice}
                        </p>
                      )}
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            <Card className="border-border/80">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-bold flex items-center justify-between">
                  <span>Listening: Dạng câu hỏi & Độ chính xác</span>
                  <Badge variant="outline" className="text-xs">
                    {listeningStats.length} dạng bài
                  </Badge>
                </CardTitle>
                <CardDescription className="text-xs">
                  Phân tích kỹ năng nghe hiểu chi tiết và bẫy phát âm
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                {listeningStats.length === 0 ? (
                  <p className="text-muted-foreground py-6 text-center text-xs">
                    Chưa có bài tập Listening nộp để tổng hợp dạng bài.
                  </p>
                ) : (
                  listeningStats.map((item) => (
                    <div key={item.questionType} className="p-2.5 rounded-lg border bg-card space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-foreground">{item.labelVi}</span>
                        <Badge
                          variant="outline"
                          className={
                            item.accuracyPercent >= 75
                              ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                              : item.accuracyPercent >= 50
                              ? "bg-amber-50 text-amber-700 border-amber-300"
                              : "bg-rose-50 text-rose-700 border-rose-300"
                          }
                        >
                          {item.accuracyPercent}% ({item.correct}/{item.total})
                        </Badge>
                      </div>
                      <Progress value={item.accuracyPercent} className="h-1.5" />
                      {item.accuracyPercent < 50 && (
                        <p className="text-[11px] text-rose-600 dark:text-rose-400 font-medium">
                          ⚠️ Lỗ hổng: {item.remediationAdvice}
                        </p>
                      )}
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            <Card className="border-border/80">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-bold flex items-center justify-between">
                  <span>Writing: Tiêu chí & Lỗi sai lặp lại</span>
                  <Badge variant="outline" className="text-xs">
                    {writingProfile.totalGradedSubmissions} bài đã chấm
                  </Badge>
                </CardTitle>
                <CardDescription className="text-xs">
                  Bằng chứng về ngữ pháp, phát triển ý và cấu trúc câu
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                {writingProfile.topGrammarIssues.length === 0 ? (
                  <p className="text-muted-foreground py-6 text-center text-xs">
                    Chưa ghi nhận lỗi sai Writing nổi bật.
                  </p>
                ) : (
                  <div className="space-y-2">
                    <p className="font-bold text-[11px] text-muted-foreground uppercase tracking-wider">
                      Lỗi ngữ pháp & Diễn đạt lặp lại nhiều nhất:
                    </p>
                    {writingProfile.topGrammarIssues.slice(0, 4).map((issue) => (
                      <div key={issue.tag} className="p-2 rounded-lg bg-muted/40 border flex items-start justify-between gap-2">
                        <div>
                          <span className="font-semibold text-foreground">{issue.labelVi}</span>
                          <p className="text-[11px] text-muted-foreground mt-0.5">{issue.tip}</p>
                        </div>
                        <Badge variant="secondary" className="text-[10px] shrink-0">
                          {issue.count} lần
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-border/80">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-bold flex items-center justify-between">
                  <span>Speaking: Điểm trung bình theo 4 tiêu chí</span>
                  <Badge variant="outline" className="text-xs">
                    {speakingStats.count} lượt đánh giá
                  </Badge>
                </CardTitle>
                <CardDescription className="text-xs">
                  FC (Trôi chảy), LR (Từ vựng), GRA (Ngữ pháp), PR (Phát âm)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl border bg-card text-center">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold block">Fluency (FC)</span>
                    <span className="text-lg font-black text-primary block mt-0.5">{speakingStats.avgFC}</span>
                    <span className="text-[10px] text-muted-foreground">Độ trôi chảy & mạch lạc</span>
                  </div>
                  <div className="p-3 rounded-xl border bg-card text-center">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold block">Lexical (LR)</span>
                    <span className="text-lg font-black text-primary block mt-0.5">{speakingStats.avgLR}</span>
                    <span className="text-[10px] text-muted-foreground">Vốn từ & collocations</span>
                  </div>
                  <div className="p-3 rounded-xl border bg-card text-center">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold block">Grammar (GRA)</span>
                    <span className="text-lg font-black text-primary block mt-0.5">{speakingStats.avgGR}</span>
                    <span className="text-[10px] text-muted-foreground">Cấu trúc & độ chính xác</span>
                  </div>
                  <div className="p-3 rounded-xl border bg-card text-center">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold block">Pronunciation</span>
                    <span className="text-lg font-black text-primary block mt-0.5">{speakingStats.avgPR}</span>
                    <span className="text-[10px] text-muted-foreground">Phát âm & ngữ điệu</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* TAB 3: HÀNH VI HỌC TẬP & NHỊP ĐỘ */}
        <TabsContent value="discipline" className="space-y-4 m-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-border/80 md:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <Flame className="h-4 w-4 text-orange-500" />
                  Kỷ luật & Nhịp độ học tập (Learning Rhythm)
                </CardTitle>
                <CardDescription className="text-xs">
                  Theo dõi sự đều đặn của bài tập và cảnh báo các giai đoạn bị mất nhịp
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-xs">
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl border bg-muted/20 text-center">
                    <span className="text-[11px] text-muted-foreground block">BTVN Hoàn thành</span>
                    <span className="text-xl font-black text-foreground block mt-0.5">
                      {student.homework?.submittedCount || 0}/{student.homework?.totalAssignedCount || 0}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-semibold">{homeworkRate}</span>
                  </div>

                  <div className="p-3 rounded-xl border bg-muted/20 text-center">
                    <span className="text-[11px] text-muted-foreground block">Điểm danh có mặt</span>
                    <span className="text-xl font-black text-foreground block mt-0.5">
                      {student.attendance?.attendedCount || 0}/{student.attendance?.totalSessions || 0}
                    </span>
                    <span className="text-[10px] text-primary font-semibold">{attendanceRate}</span>
                  </div>

                  <div className="p-3 rounded-xl border bg-muted/20 text-center">
                    <span className="text-[11px] text-muted-foreground block">Bài đã được chấm</span>
                    <span className="text-xl font-black text-foreground block mt-0.5">
                      {student.homework?.gradedCount || 0} bài
                    </span>
                    <span className="text-[10px] text-muted-foreground">Có feedback chi tiết</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border bg-card space-y-2">
                  <span className="font-bold text-foreground text-xs block">
                    Phát hiện giai đoạn mất nhịp học tập:
                  </span>
                  {student.attendance && student.attendance.percentage != null && student.attendance.percentage < 75 ? (
                    <p className="text-rose-700 dark:text-rose-400 text-xs leading-relaxed">
                      ⚠️ Cảnh báo: Tỷ lệ chuyên cần của học viên đang dưới 75%. Những đợt nghỉ học liền nhau là nguyên nhân lớn nhất khiến tốc độ tiếp thu kiến thức và phản xạ ngôn ngữ bị chậm lại đáng kể.
                    </p>
                  ) : (
                    <p className="text-emerald-700 dark:text-emerald-400 text-xs leading-relaxed">
                      ✅ Học viên duy trì nhịp học ổn định. Không ghi nhận các khoảng đứt gãy chuyên cần nghiêm trọng trong 30 ngày qua.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/80">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  Hoạt động gần nhất
                </CardTitle>
                <CardDescription className="text-xs">
                  Mốc thời gian tương tác mới nhất với LMS
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                {student.lastActivity ? (
                  <div className="p-3 rounded-xl border bg-primary/5 border-primary/20 space-y-1">
                    <span className="text-[10px] font-bold text-primary uppercase">Mới nhất:</span>
                    <p className="font-bold text-foreground text-xs">{student.lastActivity.title}</p>
                    <p className="text-muted-foreground text-[11px]">{student.lastActivity.description}</p>
                    <span className="text-[10px] text-muted-foreground block pt-1 border-t mt-1">
                      {new Date(student.lastActivity.timestamp).toLocaleString("vi-VN")}
                    </span>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-xs">Chưa có hoạt động nộp bài gần đây.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* TAB 4: GIÁO VIÊN & ĐÁNH GIÁ ĐỊNH KỲ */}
        <TabsContent value="teacher" className="space-y-4 m-0">
          <Card className="border-border/80">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-primary" />
                Đánh giá Định kỳ & Lời khuyên từ Giáo viên Chủ nhiệm
              </CardTitle>
              <CardDescription className="text-xs">
                Ghi nhận chuyên môn trực tiếp từ giáo viên đứng lớp ({teacherName})
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              {latestEvaluation ? (
                <div className="space-y-3">
                  {latestEvaluation.strengths && (
                    <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-1">
                      <span className="font-bold text-emerald-800 dark:text-emerald-300 block text-xs">
                        • Điểm mạnh học thuật:
                      </span>
                      <p className="text-foreground leading-relaxed">{latestEvaluation.strengths}</p>
                    </div>
                  )}

                  {latestEvaluation.weaknesses && (
                    <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-1">
                      <span className="font-bold text-amber-800 dark:text-amber-300 block text-xs">
                        • Điểm cần tập trung khắc phục:
                      </span>
                      <p className="text-foreground leading-relaxed">{latestEvaluation.weaknesses}</p>
                    </div>
                  )}

                  {latestEvaluation.recommendations && (
                    <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 space-y-1">
                      <span className="font-bold text-primary block text-xs">
                        • Đề xuất & Lộ trình giai đoạn tới:
                      </span>
                      <p className="text-foreground leading-relaxed">{latestEvaluation.recommendations}</p>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-[11px] text-muted-foreground pt-2 border-t">
                    <span>Người đánh giá: <strong>{latestEvaluation.teacher?.fullName || teacherName}</strong></span>
                    <span>Cập nhật: {new Date(latestEvaluation.updatedAt || latestEvaluation.createdAt).toLocaleDateString("vi-VN")}</span>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center text-muted-foreground text-xs space-y-2">
                  <p>Chưa có nhận xét định kỳ chính thức từ giáo viên phụ trách lớp.</p>
                  <p className="text-[11px]">Giáo viên có thể nhập nhận xét trực tiếp trong không gian lớp học.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 5: CHĂM SÓC PHỤ HUYNH & NHẬT KÝ CAN THIỆP */}
        <TabsContent value="guardian" className="space-y-4 m-0">
          <Card className="border-border/80">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <Phone className="h-4 w-4 text-emerald-600" />
                  Nhật ký Chăm sóc Phụ huynh & Can thiệp Học vụ
                </CardTitle>
                <CardDescription className="text-xs">
                  Lưu trữ các cuộc gọi, vấn đề gia đình quan tâm và cam kết tiếp theo
                </CardDescription>
              </div>
              <Button
                size="sm"
                className="h-8 text-xs gap-1.5 bg-emerald-600 hover:bg-emerald-700"
                onClick={() => setCallModalOpen(true)}
              >
                <Plus className="h-3.5 w-3.5" />
                Ghi nhận cuộc gọi mới
              </Button>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              {isInterventionsLoading ? (
                <div className="py-6 text-center text-muted-foreground text-xs">
                  Đang tải nhật ký chăm sóc...
                </div>
              ) : interventions.length === 0 ? (
                <div className="py-8 text-center text-muted-foreground text-xs border border-dashed rounded-xl">
                  Chưa có cuộc gọi chăm sóc hoặc can thiệp học vụ nào được ghi lại.
                </div>
              ) : (
                <div className="space-y-3">
                  {interventions.map((item: any) => (
                    <div key={item.id} className="p-3.5 rounded-xl border bg-card space-y-2 shadow-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs font-semibold bg-primary/5 text-primary border-primary/20">
                            {item.category === "PARENT_COMMUNICATION" ? "📞 Cuộc gọi PH" : "⚠️ Can thiệp học vụ"}
                          </Badge>
                          <span className="font-bold text-foreground">{item.title || "Ghi nhận chăm sóc"}</span>
                        </div>
                        <span className="text-[11px] text-muted-foreground">
                          {new Date(item.createdAt).toLocaleString("vi-VN")}
                        </span>
                      </div>

                      <p className="text-foreground text-xs leading-relaxed whitespace-pre-wrap">
                        {item.notes}
                      </p>

                      {(item.actionTaken || item.agreedPlan) && (
                        <div className="p-2.5 rounded-lg bg-muted/30 text-[11px] space-y-1">
                          {item.actionTaken && (
                            <p><strong>Đã thực hiện:</strong> {item.actionTaken}</p>
                          )}
                          {item.agreedPlan && (
                            <p><strong>Cam kết / Kế hoạch tiếp theo:</strong> {item.agreedPlan}</p>
                          )}
                        </div>
                      )}

                      <div className="flex justify-between items-center text-[10px] text-muted-foreground pt-1 border-t">
                        <span>Ghi nhận bởi: <strong>{item.authorName || "Nhân viên học vụ"}</strong></span>
                        {item.followUpDate && (
                          <span className="text-amber-700 dark:text-amber-400 font-semibold">
                            Hạn theo dõi tiếp: {new Date(item.followUpDate).toLocaleDateString("vi-VN")}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 6: UNIFIED ACADEMIC JOURNEY TIMELINE */}
        <TabsContent value="timeline" className="space-y-4 m-0">
          <Card className="border-border/80">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                Dòng Thời Gian Câu Chuyện Học Tập (Academic Storyline)
              </CardTitle>
              <CardDescription className="text-xs">
                Toàn bộ biến chuyển từ ngày bắt đầu, các mốc phát hiện lỗ hổng, bài can thiệp tới tiến bộ thực tế
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {timelineEvents.length === 0 ? (
                <p className="text-center text-muted-foreground text-xs py-8">
                  Chưa có sự kiện nào ghi nhận trong dòng thời gian.
                </p>
              ) : (
                <div className="relative pl-6 space-y-6 border-l-2 border-primary/30 ml-3 text-xs">
                  {timelineEvents.map((evt, idx) => (
                    <div key={idx} className="relative group">
                      <div className="absolute -left-[31px] top-0.5 rounded-full p-1 bg-background border-2 border-primary text-primary shadow-xs">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-foreground text-sm">{evt.title}</span>
                          <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${evt.badgeColor}`}>
                            {evt.badge}
                          </Badge>
                          <span className="text-[11px] text-muted-foreground">
                            {evt.date.toLocaleDateString("vi-VN")}
                          </span>
                        </div>
                        {evt.desc && (
                          <p className="text-muted-foreground text-xs leading-relaxed max-w-2xl">
                            {evt.desc}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* MODAL: ADD PARENT CALL / INTERVENTION */}
      <Dialog open={callModalOpen} onOpenChange={setCallModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base font-bold">
              <Phone className="h-4 w-4 text-emerald-600" />
              Ghi chép Cuộc gọi Phụ huynh / Can thiệp Học vụ
            </DialogTitle>
            <DialogDescription className="text-xs">
              Lưu lại nội dung trao đổi để toàn bộ ban cố vấn & admin nắm rõ tình hình học viên
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3.5 py-2 text-xs">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Loại ghi chép</Label>
              <Select
                value={callForm.category}
                onValueChange={(val) => setCallForm({ ...callForm, category: val })}
              >
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PARENT_COMMUNICATION">📞 Cuộc gọi Phụ huynh định kỳ</SelectItem>
                  <SelectItem value="ACADEMIC_RISK">⚠️ Cảnh báo Nguy cơ học tập</SelectItem>
                  <SelectItem value="ATTENDANCE">🗓️ Nhắc nhở Chuyên cần / Vắng học</SelectItem>
                  <SelectItem value="HOMEWORK">📝 Đôn đốc Bài tập về nhà</SelectItem>
                  <SelectItem value="MOTIVATION">💡 Tư vấn Động lực / Tâm lý</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Tiêu đề cuộc gọi</Label>
              <Input
                placeholder="Ví dụ: Báo cáo kết quả tuần 3 & trao đổi về Writing"
                value={callForm.title}
                onChange={(e) => setCallForm({ ...callForm, title: e.target.value })}
                className="h-9 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Nội dung trao đổi & Vấn đề phụ huynh quan tâm *</Label>
              <Textarea
                placeholder="Phụ huynh chia sẻ con đang bận thi ở trường, mong muốn giáo viên nhắc con nộp bài Writing bù..."
                value={callForm.notes}
                onChange={(e) => setCallForm({ ...callForm, notes: e.target.value })}
                rows={3}
                className="text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Cam kết / Kế hoạch tiếp theo</Label>
              <Input
                placeholder="Con sẽ nộp bù bài Task 2 trước thứ 6"
                value={callForm.agreedPlan}
                onChange={(e) => setCallForm({ ...callForm, agreedPlan: e.target.value })}
                className="h-9 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Hạn theo dõi tiếp (Follow-up date)</Label>
              <Input
                type="date"
                value={callForm.followUpDate}
                onChange={(e) => setCallForm({ ...callForm, followUpDate: e.target.value })}
                className="h-9 text-xs"
              />
            </div>
          </div>

          <DialogFooter className="gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setCallModalOpen(false)}>
              Hủy
            </Button>
            <Button
              size="sm"
              disabled={isSubmittingCall}
              onClick={handleSaveCall}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
            >
              {isSubmittingCall ? "Đang lưu..." : "Lưu vào Hồ sơ"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
