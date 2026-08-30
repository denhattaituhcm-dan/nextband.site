import { detectExamSkill } from "@/lib/examSkillHelper";
import { useMemo, useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { submissionsApi } from "@/lib/api";
import { resolveExitDestination } from "@/lib/exitContext";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Trophy,
  Eye,
  EyeOff,
  MessageSquare,
  Edit3,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { AnswerResultCard } from "@/components/submission/AnswerResultCard";
import { VisualDiffViewer } from "@/components/submission/VisualDiffViewer";
import { parseStructuredFeedback } from "@/lib/sentenceFeedback";
import {
  aggregateObjectiveBattleDebrief,
  QuestionTypeStat,
} from "@/lib/objectiveEvidenceAggregator";
import { ReadingBattleDebriefView } from "@/components/submission/ReadingBattleDebriefView";
import { QuestionTypeRevengeModal } from "@/components/submission/QuestionTypeRevengeModal";
import { RichContent } from "@/components/exam/RichContent";
import { convertOptionValToIndex } from "@/components/exam/MatchingRenderer";
import { getFillBlankBlankCount } from "@/lib/fillBlank";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  CanonicalSubmissionStatus,
  normalizeSubmissionStatus,
  isSubmissionGraded,
  isSubmissionCompleted,
} from "@/lib/submissionStatus";
import { calculateGradingSla } from "@/lib/gradingSla";
import { routes } from "@/lib/routes";
import { submissionKeys } from "@/lib/queryKeys";
import {
  evaluateAllAchievedMilestones,
  selectHighestPriorityPendingMilestone,
  DecisionMilestone,
  CourseLessonItem,
} from "@/lib/milestoneEngine";
import { CelebrationModal } from "@/components/celebration/CelebrationModal";
import { milestonesApi, coursesApi } from "@/lib/api";

const statusConfig: Record<
  CanonicalSubmissionStatus,
  {
    label: string;
    variant: "default" | "secondary" | "outline" | "destructive";
    icon: React.ElementType;
  }
> = {
  IN_PROGRESS: { label: "Đang làm", variant: "secondary", icon: Clock },
  SUBMITTED: {
    label: "Chờ chấm",
    variant: "outline",
    icon: AlertCircle,
  },
  GRADED: { label: "Đã chấm điểm", variant: "default", icon: CheckCircle2 },
  EXPIRED: { label: "Hết giờ", variant: "destructive", icon: AlertCircle },
  ABANDONED: { label: "Đã hủy", variant: "outline", icon: AlertCircle },
};

import { compareCanonicalOrder, isSubjectiveQuestion } from "@/lib/questionOrder";

const getOrderValue = (item: any) => {
  const order = item?.orderIndex ?? item?.order_index;
  return typeof order === "number" ? order : 0;
};

const getCreatedValue = (item: any) => {
  const raw = item?.createdAt ?? item?.created_at;
  const t = raw ? new Date(raw).getTime() : 0;
  return Number.isFinite(t) ? t : 0;
};

const compareByDisplayOrder = compareCanonicalOrder;

const sectionHasQuestions = (section: any) =>
  (section?.questionGroups || []).some(
    (group: any) => Array.isArray(group?.questions) && group.questions.length > 0,
  );

const getQuestionText = (question: any) =>
  question?.questionText || question?.question_text || "";

const getQuestionType = (question: any) =>
  question?.questionType || question?.question_type || "";

const getCorrectAnswer = (question: any) =>
  question?.correctAnswer || question?.correct_answer || null;

const getQuestionOptions = (question: any) =>
  Array.isArray(question?.options) ? question.options : [];

const getQuestionAssessmentWeight = (question: any) => {
  if (getQuestionType(question) === "fill_blank") {
    const blankCount = getFillBlankBlankCount(getCorrectAnswer(question));
    if (blankCount > 0) return blankCount;
  }
  return Math.max(1, Number(question?.points || 1));
};

export default function SubmissionDetail() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, isAdmin, isTeacher } = useAuth();
  const submissionId = id || searchParams.get("submissionId") || undefined;
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
  const [showVisualDiff, setShowVisualDiff] = useState(true);
  const [isStartingRevision, setIsStartingRevision] = useState(false);

  const handleStartRevision = async () => {
    const targetExamId = submission?.examId || submission?.exam_id || exam?.id;
    if (!targetExamId) return;
    setIsStartingRevision(true);
    try {
      const revisionSub = await submissionsApi.startRevision({
        examId: targetExamId,
        clonePreviousAnswers: true,
      });
      toast.success("Đã tạo phiên làm bài sửa (Attempt 2). Bài làm cũ của bạn được bảo toàn nguyên vẹn.");
      navigate(routes.exam.take(targetExamId, { submissionId: revisionSub.id, isRevision: true }));
    } catch (err: any) {
      toast.error(err.message || "Không thể tạo bài sửa.");
    } finally {
      setIsStartingRevision(false);
    }
  };

  const { data: submission, isLoading } = useQuery({
    queryKey: submissionKeys.detail(submissionId || ""),
    queryFn: () => submissionsApi.getById(submissionId!),
    enabled: !!submissionId && isAuthenticated,
    staleTime: 0,
    refetchOnWindowFocus: true,
    // Cross-Client Sync: Smart polling every 15s when waiting for teacher grading (SUBMITTED)
    refetchInterval: (query) => {
      const data = query.state.data;
      const status = data?.status ? String(data.status).toUpperCase() : "";
      return status === "SUBMITTED" ? 15000 : false;
    },
  });

  const targetExamId = submission?.examId || submission?.exam_id;
  const targetStudentId = submission?.studentId || submission?.student_id;

  const { data: allStudentSubmissionsData } = useQuery({
    queryKey: ["all-student-submissions", targetStudentId],
    queryFn: () => submissionsApi.list({ studentId: targetStudentId, limit: 100 }),
    enabled: !!targetStudentId && isAuthenticated,
    staleTime: 1000 * 60,
  });

  const { data: siblingSubmissionsData } = useQuery({
    queryKey: submissionKeys.siblings(targetExamId, targetStudentId),
    queryFn: () => submissionsApi.list({ examId: targetExamId, studentId: targetStudentId, limit: 10 }),
    enabled: !!targetExamId && !!targetStudentId && isAuthenticated,
    staleTime: 1000 * 30,
  });

  const [activeMilestone, setActiveMilestone] = useState<DecisionMilestone | null>(null);

  // Milestone evaluation with Canonical DB Claim
  useEffect(() => {
    if (!user?.id || !submission || activeMilestone) return;
    const isJustSubmitted = (location.state as any)?.justSubmitted;
    if (!isJustSubmitted) return;

    const completedSubs = (allStudentSubmissionsData?.data || []).filter(
      (s: any) => isSubmissionCompleted(s.status)
    );
    const uniqueExamIds = new Set(completedSubs.map((s: any) => s.examId || s.exam_id).filter(Boolean));
    if (targetExamId) uniqueExamIds.add(targetExamId);

    const examData = submission.exam || (location.state as any)?.milestoneContext;
    const courseId = examData?.courseId || "default";

    // Build course structure
    const totalCount = 27;
    const lessons: CourseLessonItem[] = [];
    for (let w = 1; w <= 9; w++) {
      for (let d = 1; d <= 3; d++) {
        const order = (w - 1) * 3 + d;
        lessons.push({
          id: `exam-${order}`,
          title: `Week ${w} - Day ${d}`,
          semanticType: "REGULAR",
          weekGroup: w,
          orderInWeek: d,
          isCompleted: order <= uniqueExamIds.size,
        });
      }
    }

    const allMilestones = evaluateAllAchievedMilestones({ courseId, lessons });
    
    // Check with backend DB claims
    milestonesApi.getClaims().then((claimedList) => {
      const claimedSet = new Set(claimedList);
      const pending = selectHighestPriorityPendingMilestone(allMilestones, claimedSet);
      if (pending) {
        // Atomic claim on server
        milestonesApi.claim(pending.key).then((res) => {
          if (res.isFirstClaim) {
            setActiveMilestone(pending);
          }
        });
      }
    });
  }, [submission, allStudentSubmissionsData, user?.id, location.state, targetExamId, activeMilestone]);

  const siblingSubmissions = siblingSubmissionsData?.data || [];
  const sortedAttempts = useMemo(() => {
    return [...siblingSubmissions].sort(
      (a: any, b: any) =>
        new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime()
    );
  }, [siblingSubmissions]);

  // Attempt 1 vs Attempt 2 texts for diff comparison
  const diffComparisonData = useMemo(() => {
    if (sortedAttempts.length < 2) return null;
    const attempt1 = sortedAttempts[0];
    const attempt2 = sortedAttempts[sortedAttempts.length - 1];

    const essayAns1 = (attempt1.answers || []).find(
      (a: any) => typeof a.answerText === "string" && a.answerText.trim().length > 20
    );
    const essayAns2 = (attempt2.answers || []).find(
      (a: any) => typeof a.answerText === "string" && a.answerText.trim().length > 20
    );

    if (!essayAns1?.answerText || !essayAns2?.answerText) return null;
    if (essayAns1.answerText === essayAns2.answerText) return null; // No difference

    return {
      attempt1Text: essayAns1.answerText,
      attempt2Text: essayAns2.answerText,
    };
  }, [sortedAttempts]);

  const exam = submission?.exam;
  const sections = useMemo(() => {
    if (!exam) return [];
    const rawSections = exam.sections || exam.exam_sections || [];
    return rawSections
      .map((sec: any) => ({
        ...sec,
        questionGroups: (sec.questionGroups || sec.question_groups || [])
          .map((g: any) => ({
            ...g,
            questions: (g.questions || []).sort(compareCanonicalOrder),
          }))
          .sort(compareCanonicalOrder),
      }))
      .sort(compareCanonicalOrder);
  }, [exam]);

  const answers = submission?.answers || [];

  const answerMap = useMemo(() => {
    const map: Record<string, any> = {};
    answers?.forEach((a: any) => {
      map[a.questionId || a.question_id] = a;
    });
    return map;
  }, [answers]);

  const allQuestions = useMemo(() => {
    if (!sections) return [];
    return sections.flatMap((sec: any) =>
      (sec.questionGroups || []).flatMap((g: any) =>
        (g.questions || []).map((q: any) => ({ ...q, sectionType: sec.sectionType }))
      ),
    );
  }, [sections]);

  const { objectiveQuestions, subjectiveQuestions } = useMemo(() => {
    const obj: any[] = [];
    const subj: any[] = [];
    allQuestions.forEach((q) => {
      if (isSubjectiveQuestion(q, q.sectionType)) {
        subj.push(q);
      } else {
        obj.push(q);
      }
    });
    return { objectiveQuestions: obj, subjectiveQuestions: subj };
  }, [allQuestions]);

  const totalQuestionsCount = allQuestions.reduce(
    (sum: number, q: any) => sum + getQuestionAssessmentWeight(q),
    0,
  );
  const totalPoints = totalQuestionsCount;
  const isGraded = isSubmissionGraded(submission?.status);
  const answeredCount = useMemo(() => {
    return allQuestions.reduce((sum: number, q: any) => {
      const answer = answerMap[q.id];
      if (!answer) return sum;

      if (getQuestionType(q) === "fill_blank") {
        try {
          const parsed = JSON.parse(answer.answerText || "{}");
          if (parsed && typeof parsed === "object") {
            const filledCount = Object.values(parsed).filter(
              (value) => String(value ?? "").trim() !== "",
            ).length;
            return sum + filledCount;
          }
        } catch {
          // Fallback to treating any non-empty text as answered
        }
      }

      const hasAnswer =
        (typeof answer.answerText === "string" &&
          answer.answerText.trim() !== "") ||
        !!answer.audioUrl;
      return sum + (hasAnswer ? 1 : 0);
    }, 0);
  }, [allQuestions, answerMap]);

  const completionRate = useMemo(() => {
    if (totalQuestionsCount === 0) return 0;
    return Math.round((answeredCount / totalQuestionsCount) * 100);
  }, [answeredCount, totalQuestionsCount]);

  // Objective Questions Auto-grading (frontend verification & fallback)
  const objectiveGradedResults = useMemo(() => {
    if (objectiveQuestions.length === 0) return null;

    let correctCount = 0;
    let gradableCount = 0;

    for (const question of objectiveQuestions) {
      if (!question.correctAnswer) continue;

      const questionWeight = getQuestionAssessmentWeight(question);
      gradableCount += questionWeight;
      const answer = answerMap[question.id];
      if (!answer?.answerText) continue;

      const studentText = answer.answerText;
      const correctText = question.correctAnswer.trim();

      // Handle fill_blank with JSON answers
      if (question.questionType === "fill_blank") {
        try {
          const parsedStudent = JSON.parse(studentText);
          const parsedCorrect = JSON.parse(correctText);
          if (typeof parsedStudent === "object" && typeof parsedCorrect === "object" &&
              parsedStudent !== null && parsedCorrect !== null) {
            let correctBlanks = 0;
            for (const key of Object.keys(parsedCorrect)) {
              const correctVal = String(parsedCorrect[key] || "").trim();
              const studentVal = String(parsedStudent[key] || "").trim();
              const alternatives = correctVal.split("|").map((a: string) => a.trim().toLowerCase());
              if (alternatives.includes(studentVal.toLowerCase())) {
                correctBlanks++;
              }
            }
            correctCount += correctBlanks;
            continue;
          }
        } catch {
          // Not JSON, fall through
        }
      }

      // Handle matching
      if (question.questionType === "matching") {
        try {
          const parsedStudent = JSON.parse(studentText);
          const parsedCorrect = JSON.parse(correctText);
          if (parsedCorrect?.pairs && typeof parsedCorrect.pairs === "object") {
            const keys = Object.keys(parsedCorrect.pairs);
            if (keys.length > 0) {
              let correctPairs = 0;
              for (const k of keys) {
                const studentIdx = convertOptionValToIndex(parsedStudent?.[k]);
                const correctIdx = convertOptionValToIndex(parsedCorrect.pairs[k]);
                if (studentIdx !== null && correctIdx !== null && studentIdx === correctIdx) {
                  correctPairs++;
                }
              }
              correctCount += (correctPairs / keys.length) * questionWeight;
              continue;
            }
          }
        } catch {}
      }

      const alternatives = correctText
        .split("|")
        .map((a: string) => a.trim())
        .filter(Boolean);

      if (
        (question.questionType === "multiple_choice" ||
          question.questionType === "listening") &&
        alternatives.length > 1
      ) {
        let studentSelections: string[] = [];
        try {
          const parsed = JSON.parse(studentText);
          if (Array.isArray(parsed)) {
            studentSelections = parsed.map((v) => String(v).trim());
          }
        } catch {
          studentSelections = studentText
            .split("|")
            .flatMap((part: string) => part.split(","))
            .map((v: string) => v.trim())
            .filter(Boolean);
        }

        const normalizedStudent = Array.from(
          new Set(studentSelections.map((v) => v.toLowerCase())),
        ).sort();
        const normalizedCorrect = Array.from(
          new Set(alternatives.map((v) => v.toLowerCase())),
        ).sort();
        if (
          normalizedStudent.length === normalizedCorrect.length &&
          normalizedStudent.every((value, idx) => value === normalizedCorrect[idx])
        ) {
          correctCount += questionWeight;
        }
      } else {
        const normalizedAlternatives = alternatives.map((a) => a.toLowerCase());
        if (normalizedAlternatives.includes(studentText.trim().toLowerCase())) {
          correctCount += questionWeight;
        }
      }
    }

    return {
      correctAnswers: Math.round(correctCount * 100) / 100,
      totalQuestions: gradableCount,
    };
  }, [objectiveQuestions, answerMap]);

  const hasSubjectiveOnly = subjectiveQuestions.length > 0 && objectiveQuestions.length === 0;
  const isMixedExam = subjectiveQuestions.length > 0 && objectiveQuestions.length > 0;
  const isObjectiveOnly = objectiveQuestions.length > 0 && subjectiveQuestions.length === 0;

  // Objective stats to display
  const objCorrect = objectiveGradedResults?.correctAnswers ?? 0;
  const objTotal = objectiveGradedResults?.totalQuestions ?? objectiveQuestions.length;
  const objPercentage = objTotal > 0 ? Math.round((objCorrect / objTotal) * 100) : 0;

  // Automated Question-Type Battle Debrief & Revenge Loop
  const [revengeTargetType, setRevengeTargetType] = useState<QuestionTypeStat | null>(null);
  const [isRevengeModalOpen, setIsRevengeModalOpen] = useState<boolean>(false);

  const objectiveBattleDebrief = useMemo(() => {
    if (!objectiveQuestions || objectiveQuestions.length === 0) return null;
    const formattedQuestions = objectiveQuestions.map((q: any) => ({
      id: q.id,
      questionType: getQuestionType(q) || q.questionType || "multiple_choice",
      questionText: getQuestionText(q),
      correctAnswer: getCorrectAnswer(q),
    }));
    return aggregateObjectiveBattleDebrief(formattedQuestions, answerMap);
  }, [objectiveQuestions, answerMap]);

  const handleBack = () => {
    const destination = resolveExitDestination(
      submission?.exam,
      searchParams,
      location.state,
    );
    navigate(destination);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Không tìm thấy bài làm này</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={handleBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Quay lại
        </Button>
      </div>
    );
  }

  const canonicalStatus = normalizeSubmissionStatus(submission?.status);
  const status = statusConfig[canonicalStatus] || statusConfig.IN_PROGRESS;
  const StatusIcon = status.icon;

  let questionCounter = 0;

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
      {/* Milestone Celebration Modal */}
      {activeMilestone && user?.id && (
        <CelebrationModal
          milestone={activeMilestone}
          userId={user.id}
          onClose={() => setActiveMilestone(null)}
        />
      )}

      {/* Back */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleBack}
      >
        <ArrowLeft className="h-4 w-4 mr-1" /> Quay lại
      </Button>

      {/* Header card */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/80 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
                  Kết Quả Bài Làm
                </span>
                <span className="text-xs text-muted-foreground">
                  {exam?.course?.title || exam?.course_title || "Luyện thi IELTS"}
                </span>
              </div>
              <h1 className="text-xl font-bold text-foreground">
                {exam?.title || "Bài thi"}
              </h1>
              <div className="flex items-center gap-2 flex-wrap text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                <Badge variant="secondary">
                  {(exam?.examType || exam?.exam_type || "EXAM")?.toUpperCase()}
                </Badge>
              </div>
            </div>
            <Badge
              variant={status.variant}
              className="gap-1.5 px-3 py-1.5 text-sm"
            >
              <StatusIcon className="h-4 w-4" />
              {status.label}
            </Badge>
          </div>

          <Separator />

          {/* DEDICATED RESULT STAT CARDS BY EXAM NATURE */}
          {hasSubjectiveOnly ? (
            /* CASE 1: PURE SUBJECTIVE EXAM (e.g. Writing, Speaking, Essay Translations) */
            <div className="space-y-3">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-1">
                {/* Status Card */}
                <div className="rounded-xl border border-amber-200 bg-amber-50/60 dark:bg-amber-950/20 dark:border-amber-800/60 p-4 flex flex-col items-center justify-center text-center">
                  <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
                    <Clock className="h-4 w-4" />
                    <span>Trạng Thái</span>
                  </div>
                  <p className="text-base sm:text-lg font-bold text-amber-800 dark:text-amber-300">
                    {isGraded ? "Đã chấm điểm" : "Chờ giáo viên chấm"}
                  </p>
                </div>

                {/* Answered Questions Card */}
                <div className="rounded-xl border border-blue-200 bg-blue-50/60 dark:bg-blue-950/20 dark:border-blue-800/60 p-4 flex flex-col items-center justify-center text-center">
                  <div className="flex items-center gap-1.5 text-blue-700 dark:text-blue-400 font-bold text-xs uppercase tracking-wider mb-1">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Đã Trả Lời</span>
                  </div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-blue-700 dark:text-blue-400 tabular-nums">
                    {answeredCount}
                    <span className="text-xs font-medium text-blue-600/70 ml-1">/ {totalQuestionsCount} câu</span>
                  </p>
                </div>

                {/* Exam Category Card */}
                <div className="rounded-xl border border-purple-200 bg-purple-50/60 dark:bg-purple-950/20 dark:border-purple-800/60 p-4 flex flex-col items-center justify-center text-center">
                  <div className="flex items-center gap-1.5 text-purple-700 dark:text-purple-400 font-bold text-xs uppercase tracking-wider mb-1">
                    <Sparkles className="h-4 w-4" />
                    <span>Hình Thức</span>
                  </div>
                  <p className="text-base sm:text-lg font-bold text-purple-800 dark:text-purple-300">
                    Bài tập Tự Luận
                  </p>
                </div>

                {/* Submission Time Card */}
                <div className="rounded-xl border border-slate-200 bg-slate-50 dark:bg-slate-900/40 dark:border-slate-800 p-4 flex flex-col items-center justify-center text-center">
                  <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-bold text-xs uppercase tracking-wider mb-1">
                    <Clock className="h-4 w-4" />
                    <span>Thời Gian Nộp</span>
                  </div>
                  <p className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200">
                    {submission?.submittedAt || submission?.submitted_at
                      ? format(
                          new Date(submission.submittedAt || submission.submitted_at),
                          "HH:mm · dd/MM",
                          { locale: vi }
                        )
                      : "—"}
                  </p>
                </div>
              </div>

              {!isGraded && (
                <div className="p-3.5 rounded-xl border border-blue-200/90 bg-blue-50/70 dark:bg-blue-950/30 dark:border-blue-800/70 text-xs text-blue-900 dark:text-blue-200 flex items-start gap-2.5">
                  <Clock className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <p className="font-bold">
                      Bài làm đã được ghi nhận và đang chờ giáo viên chấm chữa.
                    </p>
                    <p className="text-blue-800/90 dark:text-blue-300 leading-relaxed font-medium">
                      Giáo viên phụ trách sẽ chấm chữa chi tiết và gửi phản hồi cho bạn trong vòng <strong>tối đa 7 ngày</strong>
                      {submission?.submittedAt || submission?.submitted_at ? (
                        <> (Dự kiến trước <strong>{calculateGradingSla(submission.submittedAt || submission.submitted_at, null, "SUBMITTED").formattedDeadline}</strong>)</>
                      ) : null}
                      . Bạn sẽ nhận được thông báo ngay khi bài được trả.
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : isMixedExam ? (
            /* CASE 2: MIXED EXAM (e.g. Vocabulary MCQ + Translation/Essay Questions) */
            <div className="space-y-3">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-1">
                {/* Objective Correct */}
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 dark:bg-emerald-950/20 dark:border-emerald-800/60 p-4 flex flex-col items-center justify-center text-center">
                  <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Trắc Nghiệm Đúng</span>
                  </div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-emerald-700 dark:text-emerald-400 tabular-nums">
                    {objCorrect}
                    <span className="text-xs font-medium text-emerald-600/70 ml-1">/ {objTotal}</span>
                  </p>
                </div>

                {/* Objective Accuracy */}
                <div className="rounded-xl border border-blue-200 bg-blue-50/60 dark:bg-blue-950/20 dark:border-blue-800/60 p-4 flex flex-col items-center justify-center text-center">
                  <div className="flex items-center gap-1.5 text-blue-700 dark:text-blue-400 font-bold text-xs uppercase tracking-wider mb-1">
                    <Trophy className="h-4 w-4" />
                    <span>Độ Chính Xác TN</span>
                  </div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-blue-700 dark:text-blue-400 tabular-nums">
                    {objPercentage}%
                  </p>
                </div>

                {/* Subjective Pending Count */}
                <div className="rounded-xl border border-amber-200 bg-amber-50/60 dark:bg-amber-950/20 dark:border-amber-800/60 p-4 flex flex-col items-center justify-center text-center">
                  <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
                    <Clock className="h-4 w-4" />
                    <span>Phần Tự Luận</span>
                  </div>
                  <p className="text-lg sm:text-xl font-bold text-amber-800 dark:text-amber-300">
                    {isGraded ? "Đã chấm" : `⏳ ${subjectiveQuestions.length} câu chờ chấm`}
                  </p>
                </div>

                {/* Total Submission Time */}
                <div className="rounded-xl border border-slate-200 bg-slate-50 dark:bg-slate-900/40 dark:border-slate-800 p-4 flex flex-col items-center justify-center text-center">
                  <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-bold text-xs uppercase tracking-wider mb-1">
                    <Clock className="h-4 w-4" />
                    <span>Thời Gian Nộp</span>
                  </div>
                  <p className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200">
                    {submission?.submittedAt || submission?.submitted_at
                      ? format(
                          new Date(submission.submittedAt || submission.submitted_at),
                          "HH:mm · dd/MM",
                          { locale: vi }
                        )
                      : "—"}
                  </p>
                  <span className="text-[11px] text-muted-foreground mt-0.5">
                    Đã làm: {answeredCount}/{totalQuestionsCount} câu
                  </span>
                </div>
              </div>

              {!isGraded && (
                <div className="p-3.5 rounded-xl border border-blue-200/80 bg-blue-50/60 dark:bg-blue-950/20 dark:border-blue-800/60 text-xs text-blue-900 dark:text-blue-200 flex items-center gap-2.5">
                  <AlertCircle className="h-4 w-4 text-blue-600 shrink-0" />
                  <span>
                    Điểm phần trắc nghiệm đã được chấm tự động. {subjectiveQuestions.length} câu tự luận đang chờ giáo viên xem và chấm điểm chi tiết.
                  </span>
                </div>
              )}
            </div>
          ) : (
            /* CASE 3: PURE OBJECTIVE EXAM (e.g. Reading, Listening) */
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-1">
              {/* Correct Answers Card */}
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 dark:bg-emerald-950/20 dark:border-emerald-800/60 p-4 flex flex-col items-center justify-center text-center">
                <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Câu Đúng</span>
                </div>
                <p className="text-2xl sm:text-3xl font-extrabold text-emerald-700 dark:text-emerald-400 tabular-nums">
                  {objCorrect}
                  <span className="text-xs font-medium text-emerald-600/70 ml-1">/ {objTotal}</span>
                </p>
              </div>

              {/* Wrong Answers Card */}
              <div className="rounded-xl border border-rose-200 bg-rose-50/60 dark:bg-rose-950/20 dark:border-rose-800/60 p-4 flex flex-col items-center justify-center text-center">
                <div className="flex items-center gap-1.5 text-rose-700 dark:text-rose-400 font-bold text-xs uppercase tracking-wider mb-1">
                  <AlertCircle className="h-4 w-4" />
                  <span>Câu Sai</span>
                </div>
                <p className="text-2xl sm:text-3xl font-extrabold text-rose-700 dark:text-rose-400 tabular-nums">
                  {Math.max(0, objTotal - objCorrect)}
                  <span className="text-xs font-medium text-rose-600/70 ml-1">câu</span>
                </p>
              </div>

              {/* Accuracy Percentage Card */}
              <div className="rounded-xl border border-blue-200 bg-blue-50/60 dark:bg-blue-950/20 dark:border-blue-800/60 p-4 flex flex-col items-center justify-center text-center">
                <div className="flex items-center gap-1.5 text-blue-700 dark:text-blue-400 font-bold text-xs uppercase tracking-wider mb-1">
                  <Trophy className="h-4 w-4" />
                  <span>Độ Chính Xác</span>
                </div>
                <p className="text-2xl sm:text-3xl font-extrabold text-blue-700 dark:text-blue-400 tabular-nums">
                  {objPercentage}%
                </p>
              </div>

              {/* Total Score / Completion Card */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 dark:bg-slate-900/40 dark:border-slate-800 p-4 flex flex-col items-center justify-center text-center">
                <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-bold text-xs uppercase tracking-wider mb-1">
                  <Clock className="h-4 w-4" />
                  <span>Thời Gian Nộp</span>
                </div>
                <p className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200">
                  {submission?.submittedAt || submission?.submitted_at
                    ? format(
                        new Date(submission.submittedAt || submission.submitted_at),
                        "HH:mm · dd/MM",
                        { locale: vi }
                      )
                    : "—"}
                </p>
                <span className="text-[11px] text-muted-foreground mt-0.5">
                  Đã làm: {answeredCount}/{totalQuestionsCount} câu
                </span>
              </div>
            </div>
          )}

          {/* AUTOMATED OBJECTIVE QUESTION-TYPE BATTLE DEBRIEF (Reading / Listening) */}
          {objectiveBattleDebrief && objectiveBattleDebrief.totalQuestions > 0 && (
            <div className="mt-4">
              <ReadingBattleDebriefView
                debrief={objectiveBattleDebrief}
                onOpenRevenge={(typeStat) => {
                  setRevengeTargetType(typeStat);
                  setIsRevengeModalOpen(true);
                }}
              />
            </div>
          )}

          {/* QUESTION TYPE REVENGE PRACTICE MODAL */}
          <QuestionTypeRevengeModal
            isOpen={isRevengeModalOpen}
            onClose={() => setIsRevengeModalOpen(false)}
            typeStat={revengeTargetType}
          />

          {/* Teacher total score display (if teacher graded) */}
          {isGraded && submission.totalScore != null && (
            <div className="mt-3 p-4 rounded-xl border border-primary/20 bg-primary/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                <span className="font-bold text-sm text-foreground">
                  {["speaking", "writing"].includes(detectExamSkill(submission.exam || { title: submission.examTitle }))
                    ? "Kết Quả Chấm Điểm Giáo Viên:"
                    : "Kết Quả Làm Bài Tự Động:"}
                </span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-primary">
                  {["speaking", "writing"].includes(detectExamSkill(submission.exam || { title: submission.examTitle }))
                    ? `Band ${submission.totalScore}`
                    : submission.totalScore}
                </span>
                {!["speaking", "writing"].includes(detectExamSkill(submission.exam || { title: submission.examTitle })) && (
                  <span className="text-sm text-muted-foreground font-semibold"> / {totalPoints} câu</span>
                )}
              </div>
            </div>
          )}

          {/* TEACHER QUALITATIVE FEEDBACK & REVISION REQUIRED BLOCK (P1 Lean Learning Loop) */}
          {(() => {
            const parsed = parseStructuredFeedback(submission.feedback);
            const feedbackText = parsed.text || (typeof submission.feedback === "string" && !submission.feedback.startsWith("{") ? submission.feedback : "");
            const hasFeedback = !!feedbackText || !!submission.revisionRequired || parsed.sentenceFeedbacks?.length > 0;
            if (!hasFeedback) return null;

            return (
              <Card className="mt-3 border border-amber-200/90 bg-amber-50/50 dark:bg-amber-950/20 dark:border-amber-800/80 p-4 rounded-xl space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-amber-700 dark:text-amber-400" />
                    <span className="font-bold text-sm text-amber-950 dark:text-amber-200">
                      Phản Hồi & Đánh Giá Của Giáo Viên
                    </span>
                  </div>
                  {(submission.primaryErrorCategory || parsed.primaryErrorCategory) && (
                    <Badge variant="outline" className="bg-amber-100 dark:bg-amber-900/50 border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-300 font-bold text-xs">
                      Lỗi chính: {submission.primaryErrorCategory || parsed.primaryErrorCategory}
                    </Badge>
                  )}
                </div>

                {feedbackText && (
                  <p className="text-xs text-amber-900/90 dark:text-amber-200/90 whitespace-pre-wrap leading-relaxed">
                    {feedbackText}
                  </p>
                )}

                {submission.revisionRequired && (
                  <div className="pt-3 border-t border-amber-200 dark:border-amber-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="text-xs font-semibold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                      <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
                      <span>Giáo viên yêu cầu viết bài sửa (Attempt 2) để khắc phục lỗi được chỉ ra.</span>
                    </div>
                    <Button
                      onClick={handleStartRevision}
                      disabled={isStartingRevision}
                      className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs gap-1.5 rounded-xl shadow-xs shrink-0"
                    >
                      {isStartingRevision ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Edit3 className="h-3.5 w-3.5" />
                      )}
                      <span>Làm bài sửa (Attempt 2)</span>
                    </Button>
                  </div>
                )}
              </Card>
            );
          })()}

          {/* VISUAL DIFF VIEWER (Comparing Attempt 1 vs Attempt 2 if present) */}
          {diffComparisonData && (
            <div className="mt-4 space-y-2">
              <VisualDiffViewer
                attempt1Text={diffComparisonData.attempt1Text}
                attempt2Text={diffComparisonData.attempt2Text}
              />
            </div>
          )}

          <Separator />

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">
                Đáp án đúng
              </p>
              <p className="text-xs text-muted-foreground">
                Bật để hiện toàn bộ đáp án đúng, kể cả các câu học sinh chưa chọn.
              </p>
            </div>
            <Button
              type="button"
              variant={showCorrectAnswers ? "default" : "outline"}
              onClick={() => setShowCorrectAnswers((current) => !current)}
              className="gap-2 self-start sm:self-auto"
            >
              {showCorrectAnswers ? (
                <>
                  <EyeOff className="h-4 w-4" />
                  Ẩn đáp án đúng
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4" />
                  Hiện đáp án đúng
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sections */}
      {sections
        ?.filter(sectionHasQuestions)
        .sort(compareByDisplayOrder)
        .map((section: any) => {
        const sectionGroups = (section.questionGroups || []).sort(
          compareByDisplayOrder,
        );

        return (
          <div key={section.id} className="space-y-4">
            <CardHeader className="px-0 pb-2">
              <CardTitle className="text-lg">
                {section.title}
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  ({section.sectionType})
                </span>
              </CardTitle>
            </CardHeader>

            {section.instructions && (
              <Card className="border border-muted/60 bg-muted/20">
                <CardContent className="prose prose-sm max-w-none dark:prose-invert text-foreground">
                  <RichContent html={section.instructions} />
                </CardContent>
              </Card>
            )}

            {section.sectionType === "listening" &&
              (isAdmin || isTeacher) &&
              section.audioScript &&
              submission?.status !== "in_progress" && (
                <Card className="bg-muted/30 border-muted/50">
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm font-semibold">
                      Transcript sau khi nộp
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-sm max-w-none text-foreground">
                    <RichContent html={section.audioScript} />
                  </CardContent>
                </Card>
              )}

            {sectionGroups.map((group: any, groupIndex: number) => (
              <div key={group.id || groupIndex} className="space-y-3">
                {(group.title || group.instructions) && (
                  <div className="pl-1 space-y-1">
                    {group.title && (
                      <h3 className="font-semibold text-sm">{group.title}</h3>
                    )}
                    {group.instructions && (
                      <div className="text-xs text-muted-foreground prose prose-sm max-w-none">
                        <RichContent html={group.instructions} />
                      </div>
                    )}
                  </div>
                )}

                {group.passage && (
                  <Card className="border border-muted/60 bg-muted/10">
                    <CardContent className="prose prose-sm max-w-none dark:prose-invert text-foreground">
                      <RichContent html={group.passage} variant="passage" />
                    </CardContent>
                  </Card>
                )}

                {(group.questions || [])
                  .sort(compareByDisplayOrder)
                  .map((question: any) => {
                    questionCounter++;
                    const answer = answerMap[question.id];

                    return (
                      <AnswerResultCard
                        key={question.id}
                        questionIndex={questionCounter}
                        questionText={getQuestionText(question)}
                        questionType={getQuestionType(question)}
                        correctAnswer={getCorrectAnswer(question)}
                        points={getQuestionAssessmentWeight(question)}
                        options={getQuestionOptions(question)}
                        showCorrectAnswers={showCorrectAnswers}
                        answerText={answer?.answerText || null}
                        audioUrl={answer?.audioUrl || null}
                        score={answer?.score ?? null}
                        feedback={answer?.feedback ?? null}
                        isGraded={isGraded}
                        isSubmitted={isSubmissionCompleted(submission?.status)}
                        sectionType={section.sectionType}
                        assessmentMode={question.assessmentMode}
                        scoreScope={question.scoreScope}
                        holisticParentId={question.holisticParentId}
                        holisticParentScore={submission?.totalScore ?? null}
                      />
                    );
                  })}
              </div>
            ))}
          </div>
        );
        })}
    </div>
  );
}
