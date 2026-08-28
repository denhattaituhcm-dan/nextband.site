import { useState, useEffect, useMemo } from "react";
import { Card } from "@/components/ui/card";
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
} from "lucide-react";
import { SentenceLevelGrader } from "@/components/grading/SentenceLevelGrader";
import { WritingRubricCard } from "@/components/grading/WritingRubricCard";
import { RichContent } from "@/components/exam/RichContent";
import {
  CriteriaScores,
  SentenceFeedbackItem,
  ErrorCategory,
  parseStructuredFeedback,
  calculateWritingBand,
} from "@/lib/sentenceFeedback";
import { calculateGradingSla } from "@/lib/gradingSla";

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

export function WritingGrader({
  submissionId,
  studentName,
  className = "Lớp IELTS",
  homeworkTitle,
  submissionStatus = "SUBMITTED",
  submittedAt,
  answers,
  isSubmitting,
  onBack,
  onGradeSubmit,
}: WritingGraderProps) {
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [lastSavedTime, setLastSavedTime] = useState<Date | null>(null);

  // In this system: 1 Writing Submission = 1 Task/Question = 1 Answer
  const currentAnswer = answers[0];
  const questionId = currentAnswer?.questionId || "";
  const answerId = currentAnswer?.id;

  // Toggle mode: Bật chấm 4 tiêu chí IELTS vs Tắt (Chấm điểm trực tiếp cho viết câu)
  const [useRubric, setUseRubric] = useState<boolean>(true);
  const [directScore, setDirectScore] = useState<string>("");

  // Local grading state for this single answer
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

  // Hydrate from existing draft on mount / answer update
  useEffect(() => {
    if (!currentAnswer) return;
    const structured = parseStructuredFeedback(currentAnswer.feedback);

    const hasCriteria = !!structured.criteriaScores && (
      structured.criteriaScores.taskResponse != null ||
      structured.criteriaScores.coherence != null ||
      structured.criteriaScores.lexical != null ||
      structured.criteriaScores.grammar != null
    );

    if (hasCriteria) {
      setUseRubric(true);
      setDirectScore("");
    } else if (currentAnswer.score != null && Number(currentAnswer.score) > 0) {
      setUseRubric(false);
      setDirectScore(String(currentAnswer.score));
    } else {
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
    setFeedbackText(structured.text || currentAnswer.feedback || "");
    setPrimaryErrorCategory(structured.primaryErrorCategory || "STRUCTURE");
    setRevisionRequired(!!structured.revisionRequired);
    setIsDirty(false);
  }, [currentAnswer]);

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
    if (!questionId) return;

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

    const gradesPayload = [
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

  if (!currentAnswer) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center text-sm text-slate-400 bg-white">
        <FileText className="h-10 w-10 text-slate-300 mb-2" />
        <p>Không tìm thấy bài làm của học sinh trong bài nộp này.</p>
        {onBack && (
          <Button variant="outline" size="sm" onClick={onBack} className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-1.5" /> Quay lại danh sách
          </Button>
        )}
      </div>
    );
  }

  const rawAnswerText = currentAnswer.answerText || "";
  const wordCount = rawAnswerText.trim() ? rawAnswerText.trim().split(/\s+/).filter(Boolean).length : 0;
  const promptTitle = (currentAnswer.questionTitle ? currentAnswer.questionTitle.replace(/<[^>]*>/g, " ").trim() : "") || "Yêu cầu Đề bài (Writing Prompt)";

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
              <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200 text-[11px] font-semibold">
                ✍️ Writing
              </Badge>
              <Badge
                variant="outline"
                className={
                  submissionStatus === "GRADED"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200 text-[11px]"
                    : "bg-blue-50 text-blue-700 border-blue-200 text-[11px]"
                }
              >
                {submissionStatus === "GRADED" ? "Đã chấm điểm" : "Chờ chấm"}
              </Badge>
              {submissionStatus !== "GRADED" && submittedAt && (() => {
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

      {/* Main Focus Layout: 68% Left (Question + Essay Document) | 32% Right (Grading Panel) */}
      <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* LEFT COLUMN (68%): READING & ANNOTATION SURFACE */}
        <div className="lg:col-span-8 h-full overflow-y-auto p-6 space-y-6 bg-slate-50/50">
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
            {currentAnswer.instructions && (
              <div className="text-xs text-slate-700 font-medium bg-white/90 p-3 rounded-xl border border-blue-100 leading-relaxed shadow-2xs">
                <RichContent html={currentAnswer.instructions} />
              </div>
            )}

            {/* Question prompt text */}
            {currentAnswer.questionText && (
              <div className="text-sm text-slate-900 leading-relaxed font-semibold bg-white/60 p-3.5 rounded-xl border border-blue-100/70">
                <RichContent html={currentAnswer.questionText} />
              </div>
            )}

            {/* Task Passage / Image / Chart if present */}
            {currentAnswer.passage && (
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
            <Card className="border border-slate-200 shadow-2xs rounded-xl p-4 space-y-3 bg-white font-sans">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <Label className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                  <Award className="h-4 w-4 text-blue-600" />
                  Band Score bài làm (Thang 4.0 - 8.0)
                </Label>
                <div className="text-xs font-extrabold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-200">
                  {directScore ? `Band ${directScore}` : "—"}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[11px] text-slate-500 font-medium">
                  Đánh giá chất lượng tổng thể bài viết câu / dịch câu theo chuẩn IELTS Band.
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 gap-2 pt-1">
                  {["4.0", "4.5", "5.0", "5.5", "6.0", "6.5", "7.0", "7.5", "8.0"].map((pt) => (
                    <button
                      key={pt}
                      type="button"
                      onClick={() => {
                        setDirectScore(pt);
                        setIsDirty(true);
                      }}
                      className={`py-2 text-xs font-extrabold rounded-lg border transition-all ${
                        directScore === pt
                          ? "bg-blue-600 text-white border-blue-600 shadow-2xs scale-[1.02]"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                      }`}
                    >
                      Band {pt}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {/* Teacher General Feedback Textarea */}
          <Card className="border border-slate-200/80 shadow-2xs rounded-xl p-4 space-y-2 bg-slate-50/40">
            <Label className="text-xs font-bold text-slate-900 flex items-center justify-between">
              <span>Nhận xét / Góp ý sửa câu của Giáo viên</span>
            </Label>
            <Textarea
              value={feedbackText}
              onChange={(e) => {
                setFeedbackText(e.target.value);
                setIsDirty(true);
              }}
              placeholder="Gõ nhận xét, gợi ý sửa câu hoặc đáp án mẫu cho học viên..."
              className="min-h-[120px] text-xs font-sans border-slate-200 focus-visible:ring-1 focus-visible:ring-blue-500/40 leading-relaxed bg-white"
            />
          </Card>

          {/* Revision Required (Attempt 2) Switch */}
          <Card className="border border-slate-200/80 shadow-2xs rounded-xl p-4 space-y-3 bg-white">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                  Yêu cầu học viên sửa bài (Attempt 2)
                </Label>
                <p className="text-[11px] text-slate-500">
                  Bật nếu học viên cần nộp bài sửa trước khi tính hoàn thành.
                </p>
              </div>
              <Switch
                checked={revisionRequired}
                onCheckedChange={(checked) => {
                  setRevisionRequired(checked);
                  setIsDirty(true);
                }}
              />
            </div>

            {revisionRequired && (
              <div className="space-y-1.5 p-3 rounded-lg bg-amber-50/60 border border-amber-200">
                <Label className="text-[11px] font-bold text-amber-900">
                  Lỗi chính cần tập trung khắc phục (Primary Error)
                </Label>
                <Select
                  value={primaryErrorCategory}
                  onValueChange={(val: any) => {
                    setPrimaryErrorCategory(val);
                    setIsDirty(true);
                  }}
                >
                  <SelectTrigger className="h-8 text-xs font-bold bg-white border-amber-300 text-amber-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CONCEPT" className="text-xs font-semibold">
                      CONCEPT — Hiểu sai đề / Luận điểm chưa phù hợp
                    </SelectItem>
                    <SelectItem value="STRUCTURE" className="text-xs font-semibold">
                      STRUCTURE — Bố cục chưa chuẩn / Thiếu liên kết (Coherence & Cohesion)
                    </SelectItem>
                    <SelectItem value="EXPRESSION" className="text-xs font-semibold">
                      EXPRESSION — Dùng từ chưa chuẩn / Thiếu tự nhiên (Lexical Resource)
                    </SelectItem>
                    <SelectItem value="GRAMMAR" className="text-xs font-semibold">
                      GRAMMAR — Sai ngữ pháp / Thì / Dấu câu
                    </SelectItem>
                    <SelectItem value="OTHER" className="text-xs font-semibold">
                      OTHER — Lỗi khác / Dịch sai nghĩa / Bỏ sót ý
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </Card>
        </aside>
      </div>
    </div>
  );
}
