import { useState, useEffect, useMemo } from "react";
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
} from "lucide-react";
import { SentenceLevelGrader } from "@/components/grading/SentenceLevelGrader";
import { WritingRubricCard } from "@/components/grading/WritingRubricCard";
import { RichContent } from "@/components/exam/RichContent";
import { AnswerResultCard } from "@/components/submission/AnswerResultCard";
import {
  CriteriaScores,
  SentenceFeedbackItem,
  ErrorCategory,
  parseStructuredFeedback,
  calculateWritingBand,
} from "@/lib/sentenceFeedback";
import { calculateGradingSla } from "@/lib/gradingSla";
import { compareCanonicalOrder } from "@/lib/questionOrder";
import { getFillBlankBlankCount } from "@/lib/fillBlank";
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
    let qCount = 0;
    sections.forEach((sec: any) => {
      (sec.questionGroups || []).forEach((grp: any) => {
        qCount += (grp.questions || []).length;
      });
    });
    return qCount > 1 || isAutoGraded || detectedSkill === "reading" || detectedSkill === "listening" || detectedSkill === "reading_listening";
  }, [sections, isAutoGraded, detectedSkill]);

  // Primary single answer for subjective/writing mode
  const currentAnswer = answers[0] || rawAnswers[0];
  const questionId = currentAnswer?.questionId || currentAnswer?.question_id || "";
  const answerId = currentAnswer?.id;

  // Toggle mode: Bật chấm 4 tiêu chí IELTS vs Tắt (Chấm điểm trực tiếp cho viết câu)
  const [useRubric, setUseRubric] = useState<boolean>(!isAutoGraded);
  const [directScore, setDirectScore] = useState<string>("");

  // Local grading state
  const [criteriaScores, setCriteriaScores] = useState<CriteriaScores>({
    taskResponse: null,
    coherence: null,
    lexical: null,
    grammar: null,
  });
  const [sentenceFeedbacks, setSentenceFeedbacks] = useState<SentenceFeedbackItem[]>([]);
  const [feedbackText, setFeedbackText] = useState<string>("");
  const [primaryErrorCategory, setPrimaryErrorCategory] = useState<ErrorCategory>("STRUCTURE");
  const [revisionRequired, setRevisionRequired] = useState<boolean>(false);

  // Hydrate from existing draft or prefill auto-graded score
  useEffect(() => {
    if (isAutoGraded) {
      setUseRubric(false);
      const autoScore =
        submissionDetail?.bandScore ??
        submissionDetail?.band_score ??
        submissionDetail?.totalScore ??
        submissionDetail?.total_score ??
        currentAnswer?.score;
      if (autoScore != null && Number(autoScore) > 0) {
        setDirectScore(String(autoScore));
      }
    }

    if (!currentAnswer) return;
    const rawFb = currentAnswer.feedback || submissionDetail?.feedback || "";
    const structured = parseStructuredFeedback(rawFb);

    const hasCriteria = !!structured.criteriaScores && (
      structured.criteriaScores.taskResponse != null ||
      structured.criteriaScores.coherence != null ||
      structured.criteriaScores.lexical != null ||
      structured.criteriaScores.grammar != null
    );

    if (hasCriteria && !isAutoGraded) {
      setUseRubric(true);
      setDirectScore("");
    } else if (currentAnswer.score != null && Number(currentAnswer.score) > 0 && !isAutoGraded) {
      setUseRubric(false);
      setDirectScore(String(currentAnswer.score));
    } else if (!isAutoGraded) {
      const wordCount = (currentAnswer.answerText || "").trim().split(/\s+/).filter(Boolean).length;
      setUseRubric(wordCount >= 60);
    }

    setCriteriaScores(
      structured.criteriaScores || {
        taskResponse: null,
        coherence: null,
        lexical: null,
        grammar: null,
      }
    );
    setSentenceFeedbacks(structured.sentenceFeedbacks || []);
    setFeedbackText(structured.text || (typeof rawFb === "string" && !rawFb.startsWith("{") ? rawFb : ""));
    setPrimaryErrorCategory(structured.primaryErrorCategory || submissionDetail?.primaryErrorCategory || "STRUCTURE");
    setRevisionRequired(!!(structured.revisionRequired || submissionDetail?.revisionRequired));
    setIsDirty(false);
  }, [currentAnswer, isAutoGraded, submissionDetail]);

  // Live Overall Band calculation preview
  const overallBandPreview = useMemo(() => {
    return calculateWritingBand(criteriaScores);
  }, [criteriaScores]);

  const displayScore = useRubric
    ? overallBandPreview
    : directScore.trim()
    ? `Band ${parseFloat(directScore).toFixed(1)}`
    : "—";

  const handleSave = async (finalize: boolean) => {
    let score: number = 0;
    let finalCriteriaScores: CriteriaScores | null = null;

    if (useRubric) {
      const bandStr = calculateWritingBand(criteriaScores);
      score = parseFloat(bandStr) || 0;
      finalCriteriaScores = criteriaScores;
    } else {
      score = parseFloat(directScore) || 0;
      finalCriteriaScores = null;
    }

    // Build grades payload for all answers or target answer
    const gradesPayload = rawAnswers.length > 0
      ? rawAnswers.map((a: any, idx: number) => {
          if (idx === activeAnswerIndex || rawAnswers.length === 1) {
            return {
              answerId: a.id,
              questionId: a.questionId || a.question_id,
              score,
              feedback: feedbackText,
              criteriaScores: finalCriteriaScores || undefined,
              sentenceFeedbacks,
              primaryErrorCategory: revisionRequired ? primaryErrorCategory : null,
              revisionRequired,
            };
          }
          return {
            answerId: a.id,
            questionId: a.questionId || a.question_id,
            score: a.score != null ? Number(a.score) : 0,
            feedback: a.feedback || undefined,
          };
        })
      : [
          {
            answerId,
            questionId,
            score,
            feedback: feedbackText,
            criteriaScores: finalCriteriaScores || undefined,
            sentenceFeedbacks,
            primaryErrorCategory: revisionRequired ? primaryErrorCategory : null,
            revisionRequired,
          },
        ];

    await onGradeSubmit({
      grades: gradesPayload,
      totalScore: score > 0 ? score : undefined,
      options: {
        feedback: feedbackText,
        primaryErrorCategory: revisionRequired ? primaryErrorCategory : null,
        revisionRequired,
        criteriaScores: finalCriteriaScores,
        sentenceFeedbacks,
        finalize,
      },
    });

    setIsDirty(false);
    setLastSavedTime(new Date());
  };

  const rawAnswerText = currentAnswer?.answerText || "";
  const wordCount = rawAnswerText.trim() ? rawAnswerText.trim().split(/\s+/).filter(Boolean).length : 0;
  const promptTitle = (currentAnswer?.questionTitle ? currentAnswer.questionTitle.replace(/<[^>]*>/g, " ").trim() : "") || "Yêu cầu Đề bài (Prompt)";

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
                {useRubric ? "Overall Band" : "Điểm trực tiếp"}: {displayScore}
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
            /* CASE 2: SINGLE ESSAY / WRITING TASK (Document View) */
            <>
              {/* ĐỀ BÀI (Question & Task Specification) */}
              <Card className="border border-blue-200 shadow-xs rounded-2xl p-5 bg-blue-50/60 space-y-3 font-sans">
                <div className="flex items-center justify-between border-b border-blue-100/80 pb-2.5">
                  <span className="text-xs font-extrabold text-blue-900 flex items-center gap-1.5 uppercase tracking-wider">
                    <BookOpen className="h-4 w-4 text-blue-600" />
                    {promptTitle}
                  </span>
                  <Badge variant="outline" className="bg-blue-100/70 text-blue-800 border-blue-200 text-[11px] font-bold">
                    Đề bài
                  </Badge>
                </div>

                {/* Question instructions if available */}
                {currentAnswer?.instructions && (
                  <div className="text-xs text-slate-700 font-normal bg-white/90 p-3 rounded-xl border border-blue-100 leading-relaxed shadow-2xs">
                    <RichContent html={currentAnswer.instructions} />
                  </div>
                )}

                {/* Question prompt text */}
                {currentAnswer?.questionText && (
                  <div className="text-sm text-slate-900 leading-relaxed font-normal bg-white/60 p-3.5 rounded-xl border border-blue-100/70">
                    <RichContent html={currentAnswer.questionText} />
                  </div>
                )}

                {/* Task Passage / Image / Chart if present */}
                {currentAnswer?.passage && (
                  <div className="pt-2 border-t border-blue-100">
                    <div className="text-sm text-slate-800 leading-relaxed max-h-96 overflow-y-auto bg-white/90 p-3.5 rounded-xl border border-blue-100">
                      <RichContent html={currentAnswer.passage} variant="passage" />
                    </div>
                  </div>
                )}
              </Card>

              {/* BÀI LÀM CỦA HỌC VIÊN (Student Essay - Document Style) */}
              <Card className="border border-slate-200 shadow-xs rounded-2xl p-6 bg-white space-y-4 font-sans">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-slate-700" />
                    <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">
                      Bài Làm Của Học Viên
                    </h3>
                  </div>
                  <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                    {wordCount} từ
                  </span>
                </div>

                {rawAnswerText.trim() ? (
                  <div className="text-sm font-sans leading-relaxed text-slate-900 select-text">
                    <SentenceLevelGrader
                      essayText={rawAnswerText}
                      sentenceFeedbacks={sentenceFeedbacks}
                      onChange={(feedbacks) => {
                        setSentenceFeedbacks(feedbacks);
                        setIsDirty(true);
                      }}
                    />
                  </div>
                ) : (
                  <div className="p-8 text-center text-xs text-slate-400 italic">
                    Học viên nộp bài nhưng chưa có nội dung văn bản.
                  </div>
                )}
              </Card>
            </>
          )}
        </div>

        {/* RIGHT COLUMN (32%): GRADING CONTROLS (STICKY) */}
        <aside className="lg:col-span-4 h-full overflow-y-auto p-5 border-l border-slate-200 bg-white space-y-4 shadow-xs">
          {/* PHƯƠNG THỨC CHẤM BÀI (Quick Band vs Chi Tiết 4 Tiêu Chí) */}
          <div className="space-y-1.5 font-sans">
            <Label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5 text-blue-600" />
              Phương thức chấm bài:
            </Label>
            <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl border border-slate-200 gap-1">
              <button
                type="button"
                onClick={() => {
                  setUseRubric(false);
                  setIsDirty(true);
                }}
                className={`py-1.5 px-2 text-xs font-extrabold rounded-lg transition-all text-center ${
                  !useRubric
                    ? "bg-white text-blue-700 shadow-xs border border-slate-200"
                    : "text-slate-600 hover:text-slate-900 font-semibold"
                }`}
              >
                Band Tổng Hợp (Quick Band)
              </button>
              <button
                type="button"
                onClick={() => {
                  setUseRubric(true);
                  setIsDirty(true);
                }}
                className={`py-1.5 px-2 text-xs font-extrabold rounded-lg transition-all text-center ${
                  useRubric
                    ? "bg-white text-blue-700 shadow-xs border border-slate-200"
                    : "text-slate-600 hover:text-slate-900 font-semibold"
                }`}
              >
                Chi Tiết 4 Tiêu Chí
              </button>
            </div>
          </div>

          {/* NẾU CHỌN CHI TIẾT 4 TIÊU CHÍ: HIỆN RUBRIC CARD (TR, CC, LR, GRA) */}
          {useRubric ? (
            <WritingRubricCard
              scores={criteriaScores}
              onChange={(updated) => {
                setCriteriaScores(updated);
                setIsDirty(true);
              }}
              disabled={isSubmitting}
            />
          ) : (
            /* NẾU CHỌN BAND TỔNG HỢP: HIỆN CHỌN BAND NHANH (4.0 - 9.0) DÀNH CHO BÀI VIẾT CÂU */
            <Card className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50 space-y-3 font-sans">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-bold text-slate-800 flex items-center gap-1">
                  <Award className="h-3.5 w-3.5 text-blue-600" />
                  Band Score bài làm (Thang 4.0 – 8.0)
                </Label>
                {directScore && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setDirectScore("");
                      setIsDirty(true);
                    }}
                    className="h-5 px-1.5 text-[10px] text-slate-400 hover:text-slate-600"
                  >
                    Xóa
                  </Button>
                )}
              </div>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                Đánh giá chất lượng tổng thể bài làm / điểm số theo chuẩn IELTS Band.
              </p>
              <div className="grid grid-cols-5 gap-1.5">
                {["4.0", "4.5", "5.0", "5.5", "6.0", "6.5", "7.0", "7.5", "8.0"].map((b) => (
                  <Button
                    key={b}
                    type="button"
                    variant={directScore === b ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setDirectScore(b);
                      setIsDirty(true);
                    }}
                    className={`h-8 text-xs font-bold ${
                      directScore === b
                        ? "bg-blue-600 text-white hover:bg-blue-700 shadow-xs"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    Band {b}
                  </Button>
                ))}
              </div>
            </Card>
          )}

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
