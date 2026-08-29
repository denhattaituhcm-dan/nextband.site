import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { submissionsApi, usersApi } from "@/lib/api";
import { submissionKeys } from "@/lib/queryKeys";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  ShieldCheck,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  Mic,
  PenTool,
  Award,
  Layers,
  Clock,
  Target,
  ArrowRight,
  Loader2,
  Printer,
  Compass,
  FileText,
  Flame,
  Zap,
  Trophy,
  ArrowUpRight,
  GraduationCap,
  HelpCircle,
} from "lucide-react";
import { aggregateWritingEvidence } from "@/lib/writingEvidenceAggregator";
import {
  QUESTION_TYPE_METADATA,
  QuestionTypeStat,
} from "@/lib/objectiveEvidenceAggregator";
import { QuestionTypeRevengeModal } from "@/components/submission/QuestionTypeRevengeModal";
import { cn } from "@/lib/utils";

export default function StudentAnalyticsPage() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();

  // If teacher or admin passes ?studentId=..., load that student, else use logged-in user
  const targetStudentId = searchParams.get("studentId") || user?.id;
  const isViewingOther = targetStudentId !== user?.id;

  const [activeTab, setActiveTab] = useState<string>("overview");
  const [revengeTargetType, setRevengeTargetType] = useState<QuestionTypeStat | null>(null);
  const [isRevengeModalOpen, setIsRevengeModalOpen] = useState<boolean>(false);
  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState<boolean>(false);

  // Fetch Student Profile (if teacher/admin viewing another student)
  const { data: studentProfileData } = useQuery({
    queryKey: ["user-profile-analytics", targetStudentId],
    queryFn: () => usersApi.getById(targetStudentId!),
    enabled: !!targetStudentId && isViewingOther,
    staleTime: 1000 * 60 * 5,
  });

  const studentName = isViewingOther
    ? studentProfileData?.fullName || studentProfileData?.email || "Học viên"
    : user?.fullName || "Bạn";

  // Fetch Submissions for this student
  const { data: submissionsData, isLoading } = useQuery({
    queryKey: submissionKeys.profileSubmissions(targetStudentId),
    queryFn: () =>
      submissionsApi.list({ studentId: targetStudentId, limit: 300 }).catch(() => ({ data: [] })),
    enabled: !!targetStudentId,
    staleTime: 1000 * 60 * 2,
  });

  const submissions = useMemo(() => {
    return Array.isArray(submissionsData?.data) ? submissionsData.data : [];
  }, [submissionsData]);

  // 1. WRITING EVIDENCE AGGREGATION
  const writingProfile = useMemo(() => {
    return aggregateWritingEvidence(submissions);
  }, [submissions]);

  // 2. OBJECTIVE QUESTION TYPE AGGREGATION (Reading & Listening)
  const { readingStats, listeningStats, overallObjectiveAccuracy, allObjectiveQuestionsCount } =
    useMemo(() => {
      const readMap: Record<string, { total: number; correct: number; incorrectIds: string[] }> = {};
      const listMap: Record<string, { total: number; correct: number; incorrectIds: string[] }> = {};

      let totalObj = 0;
      let totalCorrect = 0;

      submissions.forEach((sub) => {
        if (!Array.isArray(sub?.answers)) return;

        const isListeningSubmission =
          sub?.exam?.examType === "LISTENING" ||
          sub?.exam?.title?.toLowerCase().includes("listening");

        sub.answers.forEach((ans: any) => {
          const qType = ans?.question?.questionType || ans?.questionType;
          if (!qType) return;

          const isCorrect = ans.score != null ? ans.score > 0 : false;
          totalObj++;
          if (isCorrect) totalCorrect++;

          const targetMap = isListeningSubmission || qType === "listening" ? listMap : readMap;
          if (!targetMap[qType]) {
            targetMap[qType] = { total: 0, correct: 0, incorrectIds: [] };
          }
          targetMap[qType].total++;
          if (isCorrect) {
            targetMap[qType].correct++;
          } else {
            targetMap[qType].incorrectIds.push(ans.questionId || ans.id);
          }
        });
      });

      const mapToStats = (
        map: Record<string, { total: number; correct: number; incorrectIds: string[] }>
      ): QuestionTypeStat[] => {
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
              incorrectQuestionIds: data.incorrectIds,
            };
          })
          .sort((a, b) => a.accuracyPercent - b.accuracyPercent);
      };

      const overallAccuracy = totalObj > 0 ? Math.round((totalCorrect / totalObj) * 100) : 0;

      return {
        readingStats: mapToStats(readMap),
        listeningStats: mapToStats(listMap),
        overallObjectiveAccuracy: overallAccuracy,
        allObjectiveQuestionsCount: totalObj,
      };
    }, [submissions]);

  // 3. SPEAKING EVIDENCE AGGREGATION
  const speakingStats = useMemo(() => {
    let count = 0;
    const criterionScores: { fc: number[]; lr: number[]; gr: number[]; pr: number[] } = {
      fc: [],
      lr: [],
      gr: [],
      pr: [],
    };
    const tagFrequency: Record<string, number> = {};

    submissions.forEach((sub) => {
      const isSpeaking =
        sub?.exam?.examType === "SPEAKING" || sub?.exam?.title?.toLowerCase().includes("speaking");
      if (!isSpeaking) return;
      count++;

      (sub.answers || []).forEach((ans: any) => {
        try {
          if (ans?.feedback && typeof ans.feedback === "string" && ans.feedback.startsWith("{")) {
            const parsed = JSON.parse(ans.feedback);
            const cs = parsed?.criteriaScores;
            if (cs) {
              if (cs.fluencyAndCoherence != null) criterionScores.fc.push(Number(cs.fluencyAndCoherence));
              if (cs.lexical != null) criterionScores.lr.push(Number(cs.lexical));
              if (cs.grammar != null) criterionScores.gr.push(Number(cs.grammar));
              if (cs.pronunciation != null) criterionScores.pr.push(Number(cs.pronunciation));
              if (Array.isArray(cs.speakingTags)) {
                cs.speakingTags.forEach((t: string) => {
                  tagFrequency[t] = (tagFrequency[t] || 0) + 1;
                });
              }
            }
          }
        } catch {
          // ignore
        }
      });
    });

    const avg = (arr: number[]) => (arr.length > 0 ? (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1) : "—");

    return {
      totalSpeakingSubmissions: count,
      avgScores: {
        fc: avg(criterionScores.fc),
        lr: avg(criterionScores.lr),
        gr: avg(criterionScores.gr),
        pr: avg(criterionScores.pr),
      },
      tagFrequency,
    };
  }, [submissions]);

  // Extract Actual Mistakes and Teacher Corrections for the Cheat Sheet
  const actualReviewedSentences = useMemo(() => {
    const list: Array<{ sentence: string; tag: string; labelVi: string; note: string; category: string }> = [];

    submissions.forEach((sub) => {
      if (!Array.isArray(sub?.answers)) return;
      sub.answers.forEach((ans: any) => {
        try {
          if (ans?.feedback && typeof ans.feedback === "string" && ans.feedback.startsWith("{")) {
            const parsed = JSON.parse(ans.feedback);
            if (Array.isArray(parsed.sentenceFeedbacks)) {
              parsed.sentenceFeedbacks.forEach((fb: any) => {
                if (fb.category !== "PRAISE") {
                  list.push({
                    sentence: fb.sentence || "",
                    tag: fb.tag || "Lỗi ngữ pháp",
                    labelVi: fb.tag || "Lỗi câu văn",
                    note: fb.note || "Cần chú ý sửa câu theo nhận xét của giáo viên",
                    category: fb.category || "GRAMMAR",
                  });
                }
              });
            }
          }
        } catch {
          // ignore
        }
      });
    });

    return list.slice(0, 10);
  }, [submissions]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
        <p className="text-sm font-medium text-slate-500">Đang tổng hợp dữ liệu tự soi chiếu năng lực...</p>
      </div>
    );
  }

  // Top 2 Bottlenecks for Band Killer Simulator
  const topWritingIssue = writingProfile.topGrammarIssues[0] || writingProfile.topExpressionIssues[0];
  const weakestReading = readingStats.find((s) => s.incorrect > 0);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-16 font-sans text-slate-900 dark:text-slate-100">
      {/* ========================================================================= */}
      {/* 1. HIGH-END ACADEMIC HEADER & PHILOSOPHICAL BANNER                        */}
      {/* ========================================================================= */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 p-6 sm:p-8 text-white shadow-xl border border-slate-800/80">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <div className="px-3 py-1 rounded-full bg-indigo-500/25 text-indigo-200 border border-indigo-400/40 text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                <Compass className="w-3.5 h-3.5 text-indigo-300" />
                <span>Tấm Gương Tự Soi Chiếu Năng Lực (Metacognitive Mirror)</span>
              </div>
              <Badge variant="outline" className="bg-emerald-500/20 text-emerald-300 border-emerald-400/40 text-[11px] font-bold">
                Dữ liệu Human-Verified
              </Badge>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-xs">
              Hiểu Rõ Bản Thân — Bước Đột Phá Vào Cảnh Giới IELTS Cao Hơn
            </h1>

            <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
              {isViewingOther
                ? `Hồ sơ tự soi chiếu năng lực của học viên: ${studentName}`
                : "Không thể nâng Band điểm nếu tiếp tục làm bài trong sự mù mờ. Khi bạn nhìn thấy chính xác ranh giới của những thói quen sai lầm vô thức, bạn đã bước một chân sang ngưỡng tinh thông."}
            </p>
          </div>

          {/* Quick Action Button for Personal Error Cheat Sheet */}
          <div className="shrink-0">
            <Button
              type="button"
              onClick={() => setIsCheatSheetOpen(true)}
              className="h-11 px-5 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-black text-xs shadow-lg border border-white/20 gap-2 cursor-pointer transition-all hover:scale-[1.02]"
            >
              <FileText className="w-4 h-4 text-orange-600" />
              <span>Sổ Tay Bẫy Lỗi Cá Nhân Hóa</span>
            </Button>
          </div>
        </div>

        {/* Subtle background glow */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* ========================================================================= */}
      {/* 2. BAND KILLER & ROI SIMULATOR (ĐIỂM NGHẼN TRỌNG TÂM CẦN GỠ BỎ)            */}
      {/* ========================================================================= */}
      {(topWritingIssue || weakestReading) && (
        <div className="p-5 sm:p-6 rounded-3xl border-2 border-amber-300 bg-amber-50/50 dark:bg-amber-950/20 dark:border-amber-800/80 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200 dark:border-amber-800/60 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-800 dark:text-amber-300">
                <Target className="h-5 w-5 text-amber-700 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-amber-950 dark:text-amber-200 uppercase tracking-wider">
                  Điểm Nghẽn Trọng Tâm &amp; Dự Phóng Tăng Band (+0.5 Band ROI)
                </h3>
                <p className="text-xs text-amber-900/80 dark:text-amber-300/80">
                  Gỡ bỏ 2 nút thắt lặp lại nhiều nhất này để mở khóa ngưỡng Band điểm tiếp theo
                </p>
              </div>
            </div>

            <Badge className="bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs px-3 py-1 self-start sm:self-auto">
              Dự kiến bứt phá: +0.5 BAND 🚀
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Bottleneck 1: Writing */}
            {topWritingIssue && (
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800/60 space-y-2 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-xs font-black flex items-center justify-center">1</span>
                    <span>Writing: {topWritingIssue.labelVi}</span>
                  </span>
                  <Badge variant="outline" className="text-[10px] font-bold bg-amber-50 text-amber-800 border-amber-300">
                    Lặp lại {topWritingIssue.count} lần
                  </Badge>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed pl-7">
                  👉 <strong>Chiến lược khắc phục:</strong> {topWritingIssue.tip}
                </p>
              </div>
            )}

            {/* Bottleneck 2: Reading */}
            {weakestReading && (
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800/60 space-y-2 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-xs font-black flex items-center justify-center">2</span>
                    <span>Reading: Dạng {weakestReading.labelVi}</span>
                  </span>
                  <Badge variant="outline" className="text-[10px] font-bold bg-rose-50 text-rose-700 border-rose-200">
                    Chính xác: {weakestReading.accuracyPercent}%
                  </Badge>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed pl-7">
                  👉 <strong>Chiến lược khắc phục:</strong> {weakestReading.remediationAdvice}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. THREE CORE COMPETENCY KPI CARDS                                        */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Writing Card */}
        <Card className="border border-slate-200 dark:border-slate-800 shadow-2xs rounded-2xl bg-white dark:bg-slate-900">
          <CardHeader className="p-5 pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <PenTool className="w-3.5 h-3.5 text-blue-600" /> Kỹ năng Viết (Writing)
              </span>
              <Badge variant="outline" className="text-[10px] font-bold bg-blue-50 text-blue-700 border-blue-200">
                {writingProfile.totalGradedSubmissions} bài chấm
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-5 pt-0 space-y-1.5">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900 dark:text-slate-100 tabular-nums">
                {writingProfile.recoveringErrors.length}
              </span>
              <span className="text-xs font-semibold text-emerald-600">lỗi đã khắc phục thành công 🎉</span>
            </div>
            <p className="text-[11px] text-slate-500">
              {writingProfile.totalPraisePoints} điểm sáng câu văn được giáo viên ghi nhận
            </p>
          </CardContent>
        </Card>

        {/* Objective Reading & Listening Card */}
        <Card className="border border-slate-200 dark:border-slate-800 shadow-2xs rounded-2xl bg-white dark:bg-slate-900">
          <CardHeader className="p-5 pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-orange-600" /> Trắc Nghiệm (Reading/Listening)
              </span>
              <Badge variant="outline" className="text-[10px] font-bold bg-orange-50 text-orange-700 border-orange-200">
                {allObjectiveQuestionsCount} câu làm
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-5 pt-0 space-y-1.5">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-orange-600 tabular-nums">
                {overallObjectiveAccuracy}%
              </span>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">độ chính xác trung bình</span>
            </div>
            <p className="text-[11px] text-slate-500">
              {weakestReading
                ? `Dạng cần lưu ý: ${weakestReading.labelVi} (${weakestReading.accuracyPercent}%)`
                : "Đang duy trì độ chính xác cao"}
            </p>
          </CardContent>
        </Card>

        {/* Speaking Card */}
        <Card className="border border-slate-200 dark:border-slate-800 shadow-2xs rounded-2xl bg-white dark:bg-slate-900">
          <CardHeader className="p-5 pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Mic className="w-3.5 h-3.5 text-purple-600" /> Kỹ năng Nói (Speaking)
              </span>
              <Badge variant="outline" className="text-[10px] font-bold bg-purple-50 text-purple-700 border-purple-200">
                {speakingStats.totalSpeakingSubmissions} bài thu âm
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-5 pt-0 space-y-1.5">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-purple-700 dark:text-purple-400 tabular-nums">
                {speakingStats.avgScores.pr !== "—" ? `PR ${speakingStats.avgScores.pr}` : "Đang cập nhật"}
              </span>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                • FC {speakingStats.avgScores.fc} • LR {speakingStats.avgScores.lr}
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Đánh giá chuẩn xác trên 4 tiêu chí chính thức của kỳ thi IELTS
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ========================================================================= */}
      {/* 4. 4-SKILL COMPREHENSIVE TABS                                             */}
      {/* ========================================================================= */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-4">
        <TabsList className="grid grid-cols-4 h-11 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl text-xs">
          <TabsTrigger
            value="overview"
            className="font-bold text-xs gap-1.5 data-[state=active]:bg-white data-[state=active]:shadow-xs rounded-xl"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tổng quan 4 kỹ năng</span>
            <span className="sm:hidden">Tổng quan</span>
          </TabsTrigger>

          <TabsTrigger
            value="writing"
            className="font-bold text-xs gap-1.5 data-[state=active]:bg-white data-[state=active]:shadow-xs rounded-xl"
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Writing ({writingProfile.totalGradedSubmissions})</span>
          </TabsTrigger>

          <TabsTrigger
            value="reading"
            className="font-bold text-xs gap-1.5 data-[state=active]:bg-white data-[state=active]:shadow-xs rounded-xl"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Reading ({readingStats.length})</span>
          </TabsTrigger>

          <TabsTrigger
            value="speaking"
            className="font-bold text-xs gap-1.5 data-[state=active]:bg-white data-[state=active]:shadow-xs rounded-xl"
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Speaking ({speakingStats.totalSpeakingSubmissions})</span>
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: OVERVIEW */}
        <TabsContent value="overview" className="space-y-4 m-0 focus-visible:outline-hidden">
          {/* RECOVERY TRAJECTORY SHOWCASE */}
          {writingProfile.recoveringErrors.length > 0 && (
            <Card className="border border-emerald-300 bg-emerald-50/40 dark:bg-emerald-950/20 shadow-2xs rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 dark:text-emerald-200 uppercase tracking-wider">
                <TrendingUp className="h-4 w-4 text-emerald-600" />
                <span>Tiến Bộ Thực Tế: Các Lỗi Đã Khắc Phục Thành Công</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {writingProfile.recoveringErrors.map((rec, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs flex items-center justify-between shadow-2xs"
                  >
                    <div>
                      <p className="font-bold text-slate-900 dark:text-slate-100">{rec.labelVi}</p>
                      <span className="text-[10px] text-slate-500">
                        {rec.initialCount} lần đầu ➔ còn {rec.recentCount} lần
                      </span>
                    </div>
                    <Badge className="bg-emerald-600 text-white font-extrabold text-[10px] px-2.5 py-0.5">
                      Giảm {rec.reductionPercentage}% 🎉
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* PRAISE SUPERPOWERS */}
          {writingProfile.praiseHighlights.length > 0 && (
            <Card className="border border-slate-200 dark:border-slate-800 shadow-2xs rounded-2xl p-5 space-y-3 bg-white dark:bg-slate-900">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                <Sparkles className="h-4 w-4 text-emerald-600" />
                <span>Điểm Sáng Đã Được Giáo Viên Chứng Thực (Superpowers)</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {writingProfile.praiseHighlights.map((p, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-950 border border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-200 shadow-2xs"
                  >
                    <span>🌟 {p.labelVi}</span>
                    <Badge variant="outline" className="bg-emerald-200/80 border-emerald-400 text-[10px] px-1.5 py-0">
                      {p.count} lần
                    </Badge>
                  </span>
                ))}
              </div>
            </Card>
          )}
        </TabsContent>

        {/* TAB 2: WRITING DEEP DIVE */}
        <TabsContent value="writing" className="space-y-4 m-0 focus-visible:outline-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Grammar Issues */}
            <Card className="border border-slate-200 dark:border-slate-800 shadow-2xs rounded-2xl p-5 space-y-3 bg-white dark:bg-slate-900">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span>Ngữ Pháp Cần Chú Ý (Grammar Accuracy)</span>
                </span>
              </div>
              <div className="space-y-2">
                {writingProfile.topGrammarIssues.length > 0 ? (
                  writingProfile.topGrammarIssues.map((item, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border text-xs space-y-1">
                      <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                        <span>{item.labelVi}</span>
                        <span className="text-[10px] font-mono text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                          {item.count} lần mắc
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">{item.tip}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 italic py-2">Không ghi nhận lỗi ngữ pháp lặp lại.</p>
                )}
              </div>
            </Card>

            {/* Expression Issues */}
            <Card className="border border-slate-200 dark:border-slate-800 shadow-2xs rounded-2xl p-5 space-y-3 bg-white dark:bg-slate-900">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-blue-500" />
                  <span>Diễn Đạt &amp; Vốn Từ (Lexical Resource)</span>
                </span>
              </div>
              <div className="space-y-2">
                {writingProfile.topExpressionIssues.length > 0 ? (
                  writingProfile.topExpressionIssues.map((item, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border text-xs space-y-1">
                      <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                        <span>{item.labelVi}</span>
                        <span className="text-[10px] font-mono text-blue-800 bg-blue-100 px-2 py-0.5 rounded-full border border-blue-300">
                          {item.count} lần mắc
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">{item.tip}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 italic py-2">Không ghi nhận lỗi diễn đạt lặp lại.</p>
                )}
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* TAB 3: READING & OBJECTIVE DEEP DIVE */}
        <TabsContent value="reading" className="space-y-4 m-0 focus-visible:outline-hidden">
          <Card className="border border-slate-200 dark:border-slate-800 shadow-sm rounded-2xl p-5 space-y-4 bg-white dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                  Bản Đồ Độ Chính Xác Phân Bổ Theo Dạng Câu Hỏi IELTS
                </h3>
                <p className="text-xs text-slate-500">
                  Dữ liệu tự động ghi nhận qua toàn bộ các bài làm Reading của bạn
                </p>
              </div>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300 text-xs font-bold px-2.5 py-1">
                {readingStats.length} Dạng bài
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {readingStats.map((item, idx) => {
                const isWeak = item.status === "CRITICAL_WEAKNESS";
                const isMastered = item.status === "STRONG_MASTERY";

                return (
                  <div
                    key={item.questionType}
                    className={cn(
                      "p-4 rounded-2xl border flex flex-col justify-between space-y-3 transition-all",
                      isWeak
                        ? "bg-rose-50/50 border-rose-200 dark:bg-rose-950/20 dark:border-rose-900"
                        : isMastered
                        ? "bg-emerald-50/50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-900"
                        : "bg-slate-50/70 border-slate-200 dark:bg-slate-800/40 dark:border-slate-700"
                    )}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                          <span className="w-5 h-5 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-[10px] font-mono flex items-center justify-center font-bold">
                            #{idx + 1}
                          </span>
                          <span>{item.labelVi}</span>
                        </span>
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-xs font-extrabold px-2 py-0.5 tabular-nums",
                            isWeak
                              ? "bg-rose-100 text-rose-800 border-rose-300"
                              : isMastered
                              ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                              : "bg-slate-200 text-slate-700 border-slate-300"
                          )}
                        >
                          {item.correct}/{item.total} ({item.accuracyPercent}%)
                        </Badge>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        {item.descriptionVi}
                      </p>
                    </div>

                    {item.incorrect > 0 && (
                      <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 dark:border-slate-800">
                        <span className="text-[10px] text-rose-700 dark:text-rose-400 font-bold truncate max-w-[65%]">
                          💡 {item.remediationAdvice}
                        </span>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setRevengeTargetType(item);
                            setIsRevengeModalOpen(true);
                          }}
                          className="h-7 text-[11px] font-extrabold text-orange-700 border-orange-300 hover:bg-orange-50 shrink-0 gap-1"
                        >
                          <span>Luyện phục thù</span>
                          <ArrowRight className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </TabsContent>

        {/* TAB 4: SPEAKING DEEP DIVE */}
        <TabsContent value="speaking" className="space-y-4 m-0 focus-visible:outline-hidden">
          <Card className="border border-slate-200 dark:border-slate-800 shadow-sm rounded-2xl p-5 space-y-4 bg-white dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                  Điểm Trung Bình 4 Tiêu Chí IELTS Speaking
                </h3>
                <p className="text-xs text-slate-500">
                  Tổng hợp từ {speakingStats.totalSpeakingSubmissions} bài thu âm được giám khảo chấm điểm
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-4 rounded-2xl border bg-slate-50 dark:bg-slate-800/40 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Fluency &amp; Coherence
                </span>
                <span className="text-2xl font-black text-slate-900 dark:text-slate-100 tabular-nums">
                  {speakingStats.avgScores.fc}
                </span>
                <span className="text-[10px] text-slate-500 block">Độ trôi chảy &amp; mạch lạc</span>
              </div>

              <div className="p-4 rounded-2xl border bg-slate-50 dark:bg-slate-800/40 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Lexical Resource
                </span>
                <span className="text-2xl font-black text-slate-900 dark:text-slate-100 tabular-nums">
                  {speakingStats.avgScores.lr}
                </span>
                <span className="text-[10px] text-slate-500 block">Vốn từ &amp; Collocation</span>
              </div>

              <div className="p-4 rounded-2xl border bg-slate-50 dark:bg-slate-800/40 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Grammar Range
                </span>
                <span className="text-2xl font-black text-slate-900 dark:text-slate-100 tabular-nums">
                  {speakingStats.avgScores.gr}
                </span>
                <span className="text-[10px] text-slate-500 block">Độ chuẩn xác ngữ pháp</span>
              </div>

              <div className="p-4 rounded-2xl border bg-slate-50 dark:bg-slate-800/40 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Pronunciation
                </span>
                <span className="text-2xl font-black text-slate-900 dark:text-slate-100 tabular-nums">
                  {speakingStats.avgScores.pr}
                </span>
                <span className="text-[10px] text-slate-500 block">Phát âm &amp; Ngữ điệu</span>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* ========================================================================= */}
      {/* 5. MODAL: SỔ TAY BẪY LỖI BỎ TÚI CÁ NHÂN HÓA (PRINTABLE CHEAT SHEET)         */}
      {/* ========================================================================= */}
      <Dialog open={isCheatSheetOpen} onOpenChange={setIsCheatSheetOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 font-sans">
          <DialogHeader className="border-b border-slate-200 pb-4 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-orange-600 text-white">
                  <FileText className="h-5 w-5" />
                </div>
                <DialogTitle className="text-base font-extrabold uppercase text-slate-900">
                  Sổ Tay Bẫy Lỗi Cá Nhân Hóa (My Error Cheat Sheet)
                </DialogTitle>
              </div>
              <DialogDescription className="text-xs text-slate-500">
                Tài liệu bỏ túi tổng hợp chính xác các câu văn bạn từng viết sai và lời chữa của thầy cô để ôn tập 15 phút trước giờ thi thật.
              </DialogDescription>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => window.print()}
              className="text-xs font-bold gap-1.5 border-slate-300 shrink-0"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>In Sổ Tay</span>
            </Button>
          </DialogHeader>

          <div className="space-y-5 py-3 text-slate-900">
            {/* Section 1: Actual Reviewed Sentences */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 text-blue-700">
                <PenTool className="w-4 h-4" />
                <span>1. Những câu văn bạn từng viết sai &amp; Cách thầy cô hướng dẫn sửa:</span>
              </h4>

              {actualReviewedSentences.length > 0 ? (
                <div className="space-y-2.5">
                  {actualReviewedSentences.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="bg-amber-100 text-amber-900 border-amber-300 text-[10px] font-bold">
                          {item.labelVi}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <p className="font-mono text-xs bg-rose-50 p-2 rounded border border-rose-200 text-rose-900">
                          ❌ Câu bạn viết: "{item.sentence}"
                        </p>
                        <p className="text-xs bg-emerald-50 p-2 rounded border border-emerald-200 text-emerald-950 font-semibold">
                          💡 Giáo viên hướng dẫn: {item.note}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-xs text-slate-400 bg-slate-50 rounded-xl border border-dashed">
                  Chưa có câu chữa chi tiết. Hoàn thành thêm bài nộp để cập nhật sổ tay!
                </div>
              )}
            </div>

            {/* Section 2: Top Reading Traps */}
            {weakestReading && (
              <div className="space-y-2.5 pt-3 border-t border-slate-200">
                <h4 className="text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 text-orange-700">
                  <BookOpen className="w-4 h-4" />
                  <span>2. Bẫy Reading bạn cần lưu ý nhất:</span>
                </h4>
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-xs space-y-1">
                  <span className="font-bold text-amber-950">Dạng bài: {weakestReading.labelVi}</span>
                  <p className="text-slate-700 leading-relaxed">{weakestReading.remediationAdvice}</p>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* REVENGE PRACTICE MODAL */}
      <QuestionTypeRevengeModal
        isOpen={isRevengeModalOpen}
        onClose={() => setIsRevengeModalOpen(false)}
        typeStat={revengeTargetType}
      />
    </div>
  );
}
