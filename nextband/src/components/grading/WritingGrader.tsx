import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Send,
  Save,
  Loader2,
  AlertTriangle,
  FileText,
  CheckCircle2,
  Clock,
  BookOpen,
  ArrowLeft,
  Award,
  Eye,
  EyeOff,
  Headphones,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import { SentenceLevelGrader } from "@/components/grading/SentenceLevelGrader";
import { WritingRubricCard } from "@/components/grading/WritingRubricCard";
import { RichContent } from "@/components/exam/RichContent";
import { AnswerResultCard } from "@/components/submission/AnswerResultCard";
import {
  CriteriaScores,
  SentenceFeedbackItem,
  DiscourseFeedbackItem,
  EssayDiagnosticPayload,
  ErrorCategory,
  parseStructuredFeedback,
  calculateWritingBand,
} from "@/lib/sentenceFeedback";
import { calculateGradingSla } from "@/lib/gradingSla";
import { compareCanonicalOrder } from "@/lib/questionOrder";
import { getFillBlankBlankCount } from "@/lib/fillBlank";
import { formatStorageUrl, diagnoseWritingEssay } from "@/lib/api";
import {
  detectExamSkill,
  isAutoGradedExam,
  getSkillBadgeConfig,
  ExamSkillType,
} from "@/lib/examSkillHelper";

export interface WritingAnswerItem {
  id?: string;
  questionId: string;
  questionTitle?: string;
  questionText?: string;
  instructions?: string;
  passage?: string;
  imageUrl?: string | null;
  answerText?: string;
  score?: number | null;
  feedback?: string | null;
}

interface WritingGraderProps {
  submissionId: string;
  studentName: string;
  className?: string;
  homeworkTitle: string;
  submissionStatus?: string;
  submittedAt?: string;
  answers: WritingAnswerItem[];
  submissionDetail?: any;
  skill?: ExamSkillType;
  isAutoGraded?: boolean;
  isSubmitting: boolean;
  onBack?: () => void;
  onGradeSubmit: (payload: {
    grades: Array<{
      answerId?: string;
      questionId: string;
      score: number;
      feedback?: string;
      criteriaScores?: CriteriaScores;
      sentenceFeedbacks?: SentenceFeedbackItem[];
      primaryErrorCategory?: ErrorCategory | null;
      revisionRequired?: boolean;
    }>;
    totalScore?: number;
    options: {
      feedback?: string;
      primaryErrorCategory?: ErrorCategory | null;
      revisionRequired?: boolean;
      criteriaScores?: CriteriaScores | null;
      sentenceFeedbacks?: SentenceFeedbackItem[];
      finalize: boolean;
    };
  }) => Promise<void>;
}

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

export function WritingGrader({
  submissionId,
  studentName,
  className = "Lớp IELTS",
  homeworkTitle,
  submissionStatus = "SUBMITTED",
  submittedAt,
  answers,
  submissionDetail,
  skill: propSkill,
  isAutoGraded: propIsAutoGraded,
  isSubmitting,
  onBack,
  onGradeSubmit,
}: WritingGraderProps) {
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [lastSavedTime, setLastSavedTime] = useState<Date | null>(null);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState<boolean>(true);

  // Skill detection
  const detectedSkill: ExamSkillType = useMemo(() => {
    if (propSkill) return propSkill;
    if (submissionDetail?.exam) return detectExamSkill(submissionDetail.exam);
    return detectExamSkill({ title: homeworkTitle });
  }, [propSkill, submissionDetail, homeworkTitle]);

  const skillBadge = getSkillBadgeConfig(detectedSkill);

  const isAutoGraded = useMemo(() => {
    if (propIsAutoGraded !== undefined) return propIsAutoGraded;
    if (submissionDetail?.exam) return isAutoGradedExam(submissionDetail.exam);
    return isAutoGradedExam({ title: homeworkTitle, type: detectedSkill });
  }, [propIsAutoGraded, submissionDetail, homeworkTitle, detectedSkill]);

  const sections = submissionDetail?.exam?.sections || [];
  const rawAnswers = submissionDetail?.answers || [];

  const answerMap = useMemo(() => {
    const map: Record<string, any> = {};
    rawAnswers.forEach((a: any) => {
      map[a.questionId || a.question_id] = a;
    });
    return map;
  }, [rawAnswers]);

  const hasMultipleQuestions = useMemo(() => {
    // For Writing skill, ALWAYS use the dedicated Writing grading view with 4-criteria rubric and AI assistance
    if (detectedSkill === "writing") return false;

    let qCount = 0;
    sections.forEach((sec: any) => {
      (sec.questionGroups || []).forEach((grp: any) => {
        qCount += (grp.questions || []).length;
      });
    });
    return qCount > 1 || isAutoGraded || detectedSkill === "reading" || detectedSkill === "listening" || detectedSkill === "reading_listening";
  }, [sections, isAutoGraded, detectedSkill]);

  // All resolved writing questions/tasks to display vertically
  const writingQuestions = useMemo(() => {
    if (answers && answers.length > 0) return answers;
    if (rawAnswers && rawAnswers.length > 0) {
      return rawAnswers.map((a: any, idx: number) => ({
        id: a.id,
        questionId: a.questionId || a.question_id || `q_${idx}`,
        questionTitle: a.questionTitle || homeworkTitle || `Câu ${idx + 1}`,
        instructions: a.instructions || "",
        passage: a.passage || "",
        imageUrl: a.imageUrl || null,
        questionText: a.questionText || a.question_text || "",
        answerText: a.answerText || a.answer_text || a.studentAnswer || "",
        score: a.score != null ? Number(a.score) : null,
        feedback: a.feedback || "",
      }));
    }
    return [];
  }, [answers, rawAnswers, homeworkTitle]);

  // Submission-level 4-criteria rubric scores
  const [criteriaScores, setCriteriaScores] = useState<CriteriaScores>({
    taskResponse: null,
    coherence: null,
    lexical: null,
    grammar: null,
  });

  // Map of questionId -> SentenceFeedbackItem[]
  const [sentenceFeedbacksMap, setSentenceFeedbacksMap] = useState<Record<string, SentenceFeedbackItem[]>>({});
  const [discourseFeedbacks, setDiscourseFeedbacks] = useState<DiscourseFeedbackItem[]>([]);
  const [essayDiagnostic, setEssayDiagnostic] = useState<EssayDiagnosticPayload | null>(null);
  const [feedbackText, setFeedbackText] = useState<string>("");
  const [primaryErrorCategory, setPrimaryErrorCategory] = useState<ErrorCategory>("STRUCTURE");
  const [revisionRequired, setRevisionRequired] = useState<boolean>(false);
  const [isDiagnosing, setIsDiagnosing] = useState<boolean>(false);
  const [aiDiagnosticNotice, setAiDiagnosticNotice] = useState<string | null>(null);

  // Total word count across all student answers
  const totalWordCount = useMemo(() => {
    return writingQuestions.reduce((sum, q) => {
      const text = q.answerText || "";
      const count = text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
      return sum + count;
    }, 0);
  }, [writingQuestions]);

  // Hydrate from existing draft or prefill scores (at submission level)
  useEffect(() => {
    // Check submissionDetail feedback first, then first answer with structured feedback
    const subFb = submissionDetail?.feedback;
    let structured = subFb ? parseStructuredFeedback(subFb) : null;

    if (!structured?.criteriaScores) {
      for (const ans of writingQuestions) {
        if (ans.feedback) {
          const parsed = parseStructuredFeedback(ans.feedback);
          if (parsed.criteriaScores && (parsed.criteriaScores.taskResponse || parsed.criteriaScores.coherence || parsed.criteriaScores.lexical || parsed.criteriaScores.grammar)) {
            structured = parsed;
            break;
          }
        }
      }
    }

    if (!structured) {
      const firstFb = writingQuestions[0]?.feedback || "";
      structured = parseStructuredFeedback(firstFb);
    }

    setCriteriaScores(
      structured?.criteriaScores || {
        taskResponse: null,
        coherence: null,
        lexical: null,
        grammar: null,
      }
    );

    // Hydrate sentence feedbacks per question
    const fbMap: Record<string, SentenceFeedbackItem[]> = {};
    writingQuestions.forEach((q) => {
      const qFb = q.feedback ? parseStructuredFeedback(q.feedback) : null;
      if (qFb?.sentenceFeedbacks && qFb.sentenceFeedbacks.length > 0) {
        fbMap[q.questionId] = qFb.sentenceFeedbacks;
      }
    });
    // Fallback: if only 1 question and structured has sentence feedbacks
    if (Object.keys(fbMap).length === 0 && structured?.sentenceFeedbacks && structured.sentenceFeedbacks.length > 0) {
      const firstQId = writingQuestions[0]?.questionId || "default";
      fbMap[firstQId] = structured.sentenceFeedbacks;
    }
    setSentenceFeedbacksMap(fbMap);

    setDiscourseFeedbacks(structured?.discourseFeedbacks || []);
    setEssayDiagnostic(structured?.essayDiagnostic || null);
    setFeedbackText(structured?.text || (typeof subFb === "string" && !subFb.startsWith("{") ? subFb : ""));
    setPrimaryErrorCategory(structured?.primaryErrorCategory || submissionDetail?.primaryErrorCategory || "STRUCTURE");
    setRevisionRequired(!!(structured?.revisionRequired || submissionDetail?.revisionRequired));
    setIsDirty(false);
  }, [submissionDetail, writingQuestions]);

  const handleAiDiagnose = async () => {
    // Combine text from all writing questions for holistic diagnosis
    const combinedTexts = writingQuestions
      .map((q, idx) => {
        const title = q.questionTitle || `Câu ${idx + 1}`;
        const ans = (q.answerText || "").trim();
        return ans ? `[${title}]\n${ans}` : null;
      })
      .filter(Boolean)
      .join("\n\n");

    if (!combinedTexts || combinedTexts.trim().length === 0) {
      alert("Học sinh chưa có bài viết để chấm.");
      return;
    }

    try {
      setIsDiagnosing(true);
      setAiDiagnosticNotice(null);

      // Extract prompts
      const combinedPrompts = writingQuestions
        .map((q, idx) => {
          const p = [q.instructions, q.questionText].filter(Boolean).join(" - ");
          return p ? `Yêu cầu ${idx + 1}: ${p}` : null;
        })
        .filter(Boolean)
        .join("\n");

      // For primary question or single task, run diagnosis
      const primaryQ = writingQuestions[0];
      const result = await diagnoseWritingEssay({
        essayText: writingQuestions.length === 1 ? (primaryQ?.answerText || "") : combinedTexts,
        promptText: combinedPrompts || (primaryQ?.questionText || ""),
        taskType: homeworkTitle.toLowerCase().includes("task 1") ? "task1" : "task2",
      });

      if (result.success) {
        if (result.sentenceFeedbacks && Array.isArray(result.sentenceFeedbacks)) {
          // If single question, assign directly
          if (writingQuestions.length <= 1 && primaryQ) {
            setSentenceFeedbacksMap({
              [primaryQ.questionId]: result.sentenceFeedbacks,
            });
          } else {
            // Distribute or assign to the first question that has text
            const firstWithText = writingQuestions.find(q => (q.answerText || "").trim().length > 0);
            if (firstWithText) {
              setSentenceFeedbacksMap(prev => ({
                ...prev,
                [firstWithText.questionId]: result.sentenceFeedbacks!,
              }));
            }
          }
        }

        if (result.discourseFeedbacks && Array.isArray(result.discourseFeedbacks)) {
          setDiscourseFeedbacks(result.discourseFeedbacks);
        }

        if (result.essayDiagnostic) {
          setEssayDiagnostic(result.essayDiagnostic);
          if (result.essayDiagnostic.bandScores) {
            setCriteriaScores({
              taskResponse: result.essayDiagnostic.bandScores.taskResponse ?? criteriaScores.taskResponse,
              coherence: result.essayDiagnostic.bandScores.coherence ?? criteriaScores.coherence,
              lexical: result.essayDiagnostic.bandScores.lexical ?? criteriaScores.lexical,
              grammar: result.essayDiagnostic.bandScores.grammar ?? criteriaScores.grammar,
            });
          }
          if (result.essayDiagnostic.summary) {
            const summaryParts: string[] = [];
            if (result.essayDiagnostic.summary.primaryWeakness) {
              summaryParts.push(`⚠️ Điểm cần khắc phục: ${result.essayDiagnostic.summary.primaryWeakness}`);
            }
            if (result.essayDiagnostic.summary.actionableAdvice) {
              summaryParts.push(`🎯 Lời khuyên: ${result.essayDiagnostic.summary.actionableAdvice}`);
            }
            if (result.essayDiagnostic.summary.strengths && result.essayDiagnostic.summary.strengths.length > 0) {
              summaryParts.push(`✨ Điểm sáng: ${result.essayDiagnostic.summary.strengths.join("; ")}`);
            }
            if (summaryParts.length > 0 && !feedbackText.trim()) {
              setFeedbackText(summaryParts.join("\n\n"));
            }
          }
        }
        setIsDirty(true);
        setAiDiagnosticNotice("AI Gemini đã hoàn tất chấm sơ bộ tổng thể bài viết! Thầy/Cô vui lòng duyệt lại điểm 4 tiêu chí.");
      } else {
        alert(result.error || "Không thể thực hiện chấm AI sơ bộ.");
      }
    } catch (err: any) {
      alert(err.message || "Lỗi khi gọi AI Gemini chẩn đoán.");
    } finally {
      setIsDiagnosing(false);
    }
  };

  // Live Overall Band calculation preview from 4 criteria
  const overallBandPreview = useMemo(() => {
    return calculateWritingBand(criteriaScores);
  }, [criteriaScores]);

  const displayScore = overallBandPreview !== "—" ? `Band ${overallBandPreview}` : "—";

  const handleSave = async (finalize: boolean) => {
    const bandStr = calculateWritingBand(criteriaScores);
    const score = parseFloat(bandStr) || 0;
    const finalCriteriaScores = criteriaScores;

    // Collect all sentence feedbacks combined for the submission options
    const allSentenceFeedbacks = Object.values(sentenceFeedbacksMap).flat();

    // Build grades payload for all answers: every question gets the submission overall score and question-specific feedbacks
    const targetAnswers = rawAnswers.length > 0 ? rawAnswers : writingQuestions;
    const gradesPayload = targetAnswers.map((a: any, idx: number) => {
      const qId = a.questionId || a.question_id || writingQuestions[idx]?.questionId || `q_${idx}`;
      const qSentenceFbs = sentenceFeedbacksMap[qId] || [];

      return {
        answerId: a.id,
        questionId: qId,
        score,
        feedback: feedbackText,
        criteriaScores: finalCriteriaScores || undefined,
        sentenceFeedbacks: qSentenceFbs,
        primaryErrorCategory: revisionRequired ? primaryErrorCategory : null,
        revisionRequired,
      };
    });

    await onGradeSubmit({
      grades: gradesPayload,
      totalScore: score > 0 ? score : undefined,
      options: {
        feedback: feedbackText,
        primaryErrorCategory: revisionRequired ? primaryErrorCategory : null,
        revisionRequired,
        criteriaScores: finalCriteriaScores,
        sentenceFeedbacks: allSentenceFeedbacks,
        finalize,
      },
    });

    setIsDirty(false);
    setLastSavedTime(new Date());
  };

  let questionCounter = 0;

  return (
    <div className="flex-1 bg-slate-50/50 flex flex-col h-full overflow-hidden">
      {/* Top Sticky Header */}
      <header className="px-5 py-3 border-b border-slate-200 bg-white flex items-center justify-between shrink-0 shadow-2xs z-10">
        <div className="flex items-center gap-3">
          {onBack && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 h-8 px-2.5 -ml-1 gap-1 text-xs font-semibold"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Quay lại</span>
            </Button>
          )}

          <div className="h-4 w-px bg-slate-200" />

          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900">{homeworkTitle}</span>
              <Badge variant="outline" className={`text-[11px] font-semibold ${skillBadge.badgeClass}`}>
                {skillBadge.label}
              </Badge>
              <Badge
                variant="outline"
                className={
                  submissionStatus === "GRADED" || isAutoGraded
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200 text-[11px]"
                    : "bg-blue-50 text-blue-700 border-blue-200 text-[11px]"
                }
              >
                {submissionStatus === "GRADED" || isAutoGraded ? "Đã chấm điểm" : "Chờ chấm"}
              </Badge>
              {submissionStatus !== "GRADED" && !isAutoGraded && submittedAt && (() => {
                const sla = calculateGradingSla(submittedAt, null, submissionStatus);
                const badgeClass = sla.status === "OVERDUE"
                  ? "bg-rose-50 text-rose-700 border-rose-200 text-[11px] font-bold"
                  : sla.status === "APPROACHING"
                  ? "bg-amber-50 text-amber-800 border-amber-300 text-[11px] font-bold"
                  : "bg-emerald-50 text-emerald-700 border-emerald-200 text-[11px] font-semibold";
                return (
                  <Badge variant="outline" className={badgeClass} title={`Nộp: ${sla.formattedSubmitted} • Hạn trả: ${sla.formattedDeadline}`}>
                    {sla.badgeText} (Hạn: {sla.formattedDeadline})
                  </Badge>
                );
              })()}
              {isDirty ? (
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-[10px]">
                  <Clock className="w-3 h-3 mr-1" /> Chưa lưu
                </Badge>
              ) : lastSavedTime ? (
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px]">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Đã lưu
                </Badge>
              ) : null}
            </div>

            <div className="text-xs text-slate-600 font-medium flex items-center gap-2 mt-0.5">
              <span>Học viên:</span>
              <span className="font-bold text-blue-700">{studentName}</span>
              <span>•</span>
              <span className="text-slate-700 font-bold">
                Overall Band: {displayScore}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSave(false)}
            disabled={isSubmitting}
            className="h-8 text-xs font-bold gap-1.5 border-slate-300 text-slate-700 hover:bg-slate-100 shadow-2xs"
          >
            {isSubmitting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
            Lưu nháp
          </Button>

          <Button
            type="button"
            onClick={() => handleSave(true)}
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold h-8 text-xs px-3.5 shadow-xs gap-1.5"
          >
            {isSubmitting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
            Trả bài 🚀
          </Button>
        </div>
      </header>

      {/* Main Focus Layout: 68% Left (Questions & Answers Surface) | 32% Right (Grading Panel) */}
      <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* LEFT/MIDDLE COLUMN (68%): STUDENT SUBMISSION & ANSWERS SURFACE */}
        <div className="lg:col-span-8 h-full overflow-y-auto p-6 space-y-6 bg-slate-50/50">
          {hasMultipleQuestions && sections.length > 0 ? (
            /* CASE 1: OBJECTIVE / READING / LISTENING / MULTI-QUESTION EXAM REVIEW */
            <div className="space-y-6">
              {/* Header card for Answer Key toggle & instructions */}
              <div className="flex items-center justify-between p-3.5 bg-white border border-slate-200 rounded-2xl shadow-2xs">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-blue-50 text-blue-700">
                    <BookOpen className="h-4 w-4" />
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">
                      Chi tiết bài làm & đối chiếu đáp án học viên
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Hiển thị toàn bộ câu hỏi, đáp án học viên đã chọn và đáp án đúng.
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant={showCorrectAnswers ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowCorrectAnswers(!showCorrectAnswers)}
                  className="h-7 text-xs gap-1.5 shadow-2xs"
                >
                  {showCorrectAnswers ? (
                    <>
                      <EyeOff className="h-3.5 w-3.5" />
                      Ẩn đáp án đúng
                    </>
                  ) : (
                    <>
                      <Eye className="h-3.5 w-3.5" />
                      Hiện đáp án đúng
                    </>
                  )}
                </Button>
              </div>

              {/* Sections & Questions list */}
              {sections
                ?.filter(sectionHasQuestions)
                ?.sort(compareByDisplayOrder)
                ?.map((section: any) => {
                  const sectionGroups = (section.questionGroups || []).sort(compareByDisplayOrder);

                  return (
                    <div key={section.id} className="space-y-4">
                      {/* Section Title */}
                      <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="uppercase font-mono text-[10px] bg-slate-100 text-slate-700">
                            {section.sectionType || "Section"}
                          </Badge>
                          <h3 className="text-sm font-bold text-slate-900">{section.title}</h3>
                        </div>
                      </div>

                      {/* Section instructions */}
                      {section.instructions && (
                        <div className="text-xs text-slate-700 bg-slate-100/70 p-3 rounded-xl border border-slate-200 leading-relaxed font-normal">
                          <RichContent html={section.instructions} />
                        </div>
                      )}

                      {/* Section Audio for Listening */}
                      {section.sectionType === "listening" && section.audioScript && (
                        <Card className="bg-blue-50/40 border-blue-200/80 rounded-2xl">
                          <CardHeader className="py-2.5 px-4">
                            <CardTitle className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                              <Headphones className="h-3.5 w-3.5 text-blue-600" />
                              Audio Transcript (Phần nghe)
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="text-xs text-slate-700 px-4 pb-3">
                            <RichContent html={section.audioScript} />
                          </CardContent>
                        </Card>
                      )}

                      {/* Question Groups */}
                      {sectionGroups.map((group: any, gIdx: number) => (
                        <div key={group.id || gIdx} className="space-y-3">
                          {(group.title || group.instructions) && (
                            <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
                              {group.title && (
                                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                                  {group.title}
                                </h4>
                              )}
                              {group.instructions && (
                                <div className="text-xs text-slate-600 font-normal">
                                  <RichContent html={group.instructions} />
                                </div>
                              )}
                            </div>
                          )}

                          {/* Reading Passage if available */}
                          {group.passage && (
                            <Card className="border border-slate-200 bg-white shadow-2xs rounded-2xl p-4">
                              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
                                <BookOpen className="h-3.5 w-3.5 text-blue-600" />
                                Bài Đọc Hiểu (Reading Passage)
                              </div>
                              <div className="text-xs text-slate-800 leading-relaxed max-h-80 overflow-y-auto pr-1">
                                <RichContent html={group.passage} variant="passage" />
                              </div>
                            </Card>
                          )}

                          {/* Questions in group */}
                          <div className="space-y-3">
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
                                    score={answer?.score != null ? Number(answer?.score) : null}
                                    feedback={answer?.feedback || null}
                                    isGraded={true}
                                    isSubmitted={true}
                                    sectionType={section.sectionType}
                                  />
                                );
                              })}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
            </div>
          ) : (
            /* CASE 2: ESSAY / WRITING TASK (Continuous Vertical Stream matching Student Homework Flow) */
            <div className="space-y-6 font-sans">
              {/* Top Action & Overview Bar for Writing Submission */}
              <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl shadow-2xs">
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-xl bg-blue-50 text-blue-700">
                    <FileText className="h-5 w-5" />
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                      <span>Bài Làm Writing Của Học Viên</span>
                      <Badge variant="outline" className="text-[10px] bg-blue-50 text-blue-700 border-blue-200">
                        {writingQuestions.length} phần bài tập
                      </Badge>
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Đang chấm theo 4 tiêu chí IELTS tổng thể bài nộp • Tổng số từ: <strong className="text-slate-800 font-bold">{totalWordCount} từ</strong>
                    </p>
                  </div>
                </div>

                {!isAutoGraded && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleAiDiagnose}
                    disabled={isDiagnosing || totalWordCount === 0}
                    className="h-8.5 text-xs font-bold bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 border-purple-200 text-purple-700 hover:bg-purple-100 shadow-2xs gap-1.5 cursor-pointer"
                  >
                    <Sparkles className={`h-3.5 w-3.5 text-purple-600 ${isDiagnosing ? "animate-spin" : ""}`} />
                    {isDiagnosing ? "AI Đang Chẩn Đoán..." : "AI Chấm Sơ Bộ Toàn Bài"}
                  </Button>
                )}
              </div>

              {aiDiagnosticNotice && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 shadow-2xs">
                  <Sparkles className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>{aiDiagnosticNotice}</span>
                </div>
              )}

              {/* Continuous Stream of All Writing Questions / Exercises */}
              {writingQuestions.map((qItem, idx) => {
                questionCounter++;
                const itemAnswerText = (qItem.answerText || "").trim();
                const itemWordCount = itemAnswerText ? itemAnswerText.split(/\s+/).filter(Boolean).length : 0;
                const itemTitle = (qItem.questionTitle ? qItem.questionTitle.replace(/<[^>]*>/g, " ").trim() : "") || `Phần ${idx + 1}`;
                const qSentenceFeedbacks = sentenceFeedbacksMap[qItem.questionId] || [];

                return (
                  <div key={qItem.questionId || qItem.id || idx} className="space-y-3">
                    {/* ĐỀ BÀI (Question & Task Specification) */}
                    <Card className="border border-blue-200 shadow-xs rounded-2xl p-5 bg-blue-50/50 space-y-3 font-sans">
                      <div className="flex items-center justify-between border-b border-blue-100/80 pb-2.5">
                        <span className="text-xs font-extrabold text-blue-900 flex items-center gap-2 uppercase tracking-wider">
                          <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[11px] font-bold">
                            {idx + 1}
                          </span>
                          <span>{itemTitle}</span>
                        </span>
                        <Badge variant="outline" className="bg-blue-100/70 text-blue-800 border-blue-200 text-[11px] font-bold">
                          Đề bài
                        </Badge>
                      </div>

                      {/* Question instructions if available */}
                      {qItem.instructions && (
                        <div className="text-xs text-slate-700 font-normal bg-white/90 p-3 rounded-xl border border-blue-100 leading-relaxed shadow-2xs">
                          <RichContent html={qItem.instructions} />
                        </div>
                      )}

                      {/* Question prompt text */}
                      {qItem.questionText && (
                        <div className="text-sm text-slate-900 leading-relaxed font-normal bg-white/60 p-3.5 rounded-xl border border-blue-100/70">
                          <RichContent html={qItem.questionText} />
                        </div>
                      )}

                      {/* Task 1 Chart / Map / Diagram Image if present */}
                      {qItem.imageUrl && (
                        <div className="pt-2 border-t border-blue-100 flex justify-center bg-white/90 p-3 rounded-xl border border-blue-100">
                          <img
                            src={formatStorageUrl(qItem.imageUrl)}
                            alt="Writing Task Prompt Diagram / Chart"
                            className="max-h-96 w-auto object-contain rounded-lg border shadow-2xs"
                          />
                        </div>
                      )}

                      {/* Task Passage if present */}
                      {qItem.passage && (
                        <div className="pt-2 border-t border-blue-100">
                          <div className="text-sm text-slate-800 leading-relaxed max-h-96 overflow-y-auto bg-white/90 p-3.5 rounded-xl border border-blue-100">
                            <RichContent html={qItem.passage} variant="passage" />
                          </div>
                        </div>
                      )}
                    </Card>

                    {/* BÀI LÀM CỦA HỌC VIÊN CHO CÂU NÀY */}
                    <Card className="border border-slate-200 shadow-xs rounded-2xl p-6 bg-white space-y-4 font-sans">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-slate-700" />
                          <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-tight">
                            Bài làm của học viên • Câu {idx + 1}
                          </h3>
                        </div>
                        <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                          {itemWordCount} từ
                        </span>
                      </div>

                      {itemAnswerText ? (
                        <div className="text-sm font-sans leading-relaxed text-slate-900 select-text space-y-4">
                          <SentenceLevelGrader
                            essayText={itemAnswerText}
                            sentenceFeedbacks={qSentenceFeedbacks}
                            onChange={(feedbacks) => {
                              setSentenceFeedbacksMap(prev => ({
                                ...prev,
                                [qItem.questionId]: feedbacks,
                              }));
                              setIsDirty(true);
                            }}
                          />
                        </div>
                      ) : (
                        <div className="p-6 text-center text-xs text-slate-400 italic bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                          Học viên chưa nhập câu trả lời cho phần này.
                        </div>
                      )}
                    </Card>
                  </div>
                );
              })}

              {/* TẦNG 2: DISCOURSE / PARAGRAPH DIAGNOSIS CARDS (If diagnosed) */}
              {discourseFeedbacks.length > 0 && (
                <Card className="p-4 bg-indigo-50/50 border border-indigo-200 rounded-2xl space-y-3 font-sans">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <MessageSquare className="h-4 w-4 text-indigo-600" />
                    <span>Chẩn đoán Cấp Đoạn Văn / Luận Điểm (Tầng 2 - Discourse):</span>
                  </div>
                  <div className="grid gap-2">
                    {discourseFeedbacks.map((item, dIdx) => (
                      <div
                        key={dIdx}
                        className="p-3 bg-white/90 border border-indigo-200/80 rounded-xl text-xs space-y-1 shadow-2xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-indigo-950">
                            Đoạn {item.paragraphIndex + 1}: {item.tag}
                          </span>
                          <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 text-[10px]">
                            {item.category} • {item.severity}
                          </Badge>
                        </div>
                        <p className="text-slate-700 leading-relaxed">{item.note}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN (32%): GRADING CONTROLS (STICKY) */}
        <aside className="lg:col-span-4 h-full overflow-y-auto p-5 border-l border-slate-200 bg-white space-y-4 shadow-xs">
          {/* CHẤM BÀI THEO 4 TIÊU CHÍ IELTS (TR, CC, LR, GRA) */}
          <WritingRubricCard
            scores={criteriaScores}
            onChange={(updated) => {
              setCriteriaScores(updated);
              setIsDirty(true);
            }}
            disabled={isSubmitting}
          />

          {/* NHẬN XÉT & GÓP Ý CỦA GIÁO VIÊN */}
          <div className="space-y-2 font-sans">
            <Label className="text-xs font-bold text-slate-800 flex items-center justify-between">
              <span>Nhận xét / Góp ý sửa câu của Giáo viên</span>
              <span className="text-[10px] text-slate-400 font-normal">Gửi kèm bài trả</span>
            </Label>
            <Textarea
              placeholder="Gõ nhận xét, gợi ý sửa câu hoặc đáp án mẫu cho học viên..."
              value={feedbackText}
              onChange={(e) => {
                setFeedbackText(e.target.value);
                setIsDirty(true);
              }}
              rows={4}
              disabled={isSubmitting}
              className="text-xs bg-slate-50/50 border-slate-200 focus:bg-white resize-none rounded-xl"
            />
          </div>

          {/* YÊU CẦU LÀM LẠI BÀI (ATTEMPT 2) */}
          <Card className="border border-amber-200/80 rounded-2xl p-4 bg-amber-50/40 space-y-3 font-sans">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                <AlertTriangle className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                Yêu cầu học viên sửa bài (Attempt 2)
              </Label>
              <Switch
                checked={revisionRequired}
                onCheckedChange={(checked) => {
                  setRevisionRequired(checked);
                  setIsDirty(true);
                }}
                disabled={isSubmitting}
              />
            </div>

            {revisionRequired && (
              <div className="space-y-2 pt-1 border-t border-amber-200/60">
                <Label className="text-[11px] font-bold text-amber-900">
                  Nhóm lỗi chính cần khắc phục:
                </Label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { key: "STRUCTURE", label: "Cấu trúc câu (Grammar)" },
                    { key: "CONCEPT", label: "Ý tưởng & Logic (Idea)" },
                    { key: "EXPRESSION", label: "Từ vựng (Lexical)" },
                    { key: "GRAMMAR", label: "Chính tả / Dấu câu" },
                  ].map((cat) => (
                    <button
                      key={cat.key}
                      type="button"
                      onClick={() => {
                        setPrimaryErrorCategory(cat.key as ErrorCategory);
                        setIsDirty(true);
                      }}
                      className={`p-2 rounded-lg text-[10px] font-bold text-left transition-all border ${
                        primaryErrorCategory === cat.key
                          ? "bg-amber-600 text-white border-amber-600 shadow-2xs"
                          : "bg-white text-slate-700 border-amber-200/80 hover:bg-amber-100/50"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </aside>
      </div>
    </div>
  );
}
