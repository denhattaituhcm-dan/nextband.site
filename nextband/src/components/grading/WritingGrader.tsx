import { useState, useEffect, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
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
  studentName,
  className = "Lớp IELTS",
  homeworkTitle,
  submissionStatus = "SUBMITTED",
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

  const handleSave = async (finalize: boolean) => {
    if (!questionId) return;

    const bandStr = calculateWritingBand(criteriaScores);
    const score = parseFloat(bandStr) || 0;

    const gradesPayload = [
      {
        answerId,
        questionId,
        score,
        feedback: feedbackText,
        criteriaScores,
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
        criteriaScores,
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
  const wordCount = rawAnswerText.trim().split(/\s+/).filter(Boolean).length;

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
              <span className="font-bold text-blue-700">{studentName}</span>
              <span>•</span>
              <span className="text-slate-500">{className}</span>
              <span>•</span>
              <span className="text-slate-700 font-bold">Overall Band: {overallBandPreview}</span>
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
          <Card className="border border-blue-200/80 shadow-xs rounded-2xl p-5 bg-white space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <span className="text-xs font-extrabold text-blue-900 flex items-center gap-1.5 uppercase tracking-wider">
                <BookOpen className="h-4 w-4 text-blue-600" />
                {currentAnswer.questionTitle || "Yêu cầu Đề bài (Writing Prompt)"}
              </span>
            </div>

            {/* Question instructions if available */}
            {currentAnswer.instructions && (
              <div className="text-xs text-slate-600 font-medium bg-blue-50/50 p-3 rounded-xl border border-blue-100 leading-relaxed">
                {currentAnswer.instructions}
              </div>
            )}

            {/* Question prompt text */}
            {currentAnswer.questionText && (
              <div className="text-sm text-slate-900 leading-relaxed font-semibold">
                <RichContent html={currentAnswer.questionText} />
              </div>
            )}

            {/* Task Passage / Image / Chart if present */}
            {currentAnswer.passage && (
              <div className="pt-2 border-t border-slate-100">
                <div className="text-sm text-slate-800 leading-relaxed max-h-96 overflow-y-auto">
                  <RichContent html={currentAnswer.passage} variant="passage" />
                </div>
              </div>
            )}
          </Card>

          {/* BÀI LÀM CỦA HỌC VIÊN (Student Essay - Document Style) */}
          <Card className="border border-slate-200 shadow-xs rounded-2xl p-6 bg-white space-y-4">
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
              <div className="text-base font-serif leading-[1.8] text-slate-900 select-text">
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
        <aside className="lg:col-span-4 h-full overflow-y-auto p-5 border-l border-slate-200 bg-white space-y-5 shadow-xs">
          {/* Rubric Card */}
          <WritingRubricCard
            scores={criteriaScores}
            onChange={(updated) => {
              setCriteriaScores(updated);
              setIsDirty(true);
            }}
            disabled={isSubmitting}
          />

          {/* Teacher General Feedback Textarea */}
          <Card className="border border-slate-200/80 shadow-2xs rounded-xl p-4 space-y-2 bg-slate-50/40">
            <Label className="text-xs font-bold text-slate-900 flex items-center justify-between">
              <span>Nhận xét tổng thể của Giáo viên</span>
            </Label>
            <Textarea
              value={feedbackText}
              onChange={(e) => {
                setFeedbackText(e.target.value);
                setIsDirty(true);
              }}
              placeholder="Gõ nhận xét chi tiết cho học viên (Ví dụ: Bố cục rõ ràng, lập luận tốt, cần chú ý thì quá khứ ở đoạn thân bài...)"
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
