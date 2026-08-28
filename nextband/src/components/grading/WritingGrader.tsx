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
  HelpCircle,
  BookOpen,
} from "lucide-react";
import { SentenceLevelGrader } from "@/components/grading/SentenceLevelGrader";
import { WritingRubricCard } from "@/components/grading/WritingRubricCard";
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
  passage?: string;
  answerText?: string;
  score?: number | null;
  feedback?: string | null;
}

interface WritingGraderProps {
  submissionId: string;
  studentName: string;
  className?: string;
  homeworkTitle: string;
  answers: WritingAnswerItem[];
  isSubmitting: boolean;
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
  answers,
  isSubmitting,
  onGradeSubmit,
}: WritingGraderProps) {
  const [activeTaskIndex, setActiveTaskIndex] = useState<number>(0);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  // Per-task local state mapped by questionId
  const [taskStates, setTaskStates] = useState<
    Record<
      string,
      {
        criteriaScores: CriteriaScores;
        sentenceFeedbacks: SentenceFeedbackItem[];
        feedback: string;
        primaryErrorCategory: ErrorCategory;
        revisionRequired: boolean;
      }
    >
  >({});

  // Initialize task states from answers props
  useEffect(() => {
    const nextStates: typeof taskStates = {};
    answers.forEach((ans) => {
      const structured = parseStructuredFeedback(ans.feedback);
      nextStates[ans.questionId] = {
        criteriaScores: structured.criteriaScores || {
          taskResponse: null,
          coherence: null,
          lexical: null,
          grammar: null,
        },
        sentenceFeedbacks: structured.sentenceFeedbacks || [],
        feedback: structured.text || ans.feedback || "",
        primaryErrorCategory: structured.primaryErrorCategory || "STRUCTURE",
        revisionRequired: !!structured.revisionRequired,
      };
    });
    setTaskStates(nextStates);
    setIsDirty(false);
  }, [answers]);

  const activeAnswer = answers[activeTaskIndex] || answers[0];
  const activeQuestionId = activeAnswer?.questionId;
  const currentTaskState = taskStates[activeQuestionId] || {
    criteriaScores: { taskResponse: null, coherence: null, lexical: null, grammar: null },
    sentenceFeedbacks: [],
    feedback: "",
    primaryErrorCategory: "STRUCTURE",
    revisionRequired: false,
  };

  const handleUpdateActiveTask = (
    updater: Partial<typeof currentTaskState>
  ) => {
    if (!activeQuestionId) return;
    setTaskStates((prev) => ({
      ...prev,
      [activeQuestionId]: {
        ...prev[activeQuestionId],
        ...updater,
      },
    }));
    setIsDirty(true);
  };

  // Compute calculated band for all tasks
  const overallBandPreview = useMemo(() => {
    const validScores: number[] = [];
    answers.forEach((ans) => {
      const state = taskStates[ans.questionId];
      if (state?.criteriaScores) {
        const bandStr = calculateWritingBand(state.criteriaScores);
        const b = parseFloat(bandStr);
        if (!isNaN(b) && b > 0) validScores.push(b);
      }
    });

    if (validScores.length === 0) return "—";
    if (validScores.length === 2) {
      // Standard IELTS Task 1 (1/3) + Task 2 (2/3) preview
      const weighted = (validScores[0] + 2 * validScores[1]) / 3;
      return (Math.round(weighted * 2) / 2).toFixed(1);
    }
    const avg = validScores.reduce((a, b) => a + b, 0) / validScores.length;
    return (Math.round(avg * 2) / 2).toFixed(1);
  }, [answers, taskStates]);

  const handleSave = async (finalize: boolean) => {
    const gradesPayload = answers.map((ans) => {
      const state = taskStates[ans.questionId] || currentTaskState;
      const bandStr = calculateWritingBand(state.criteriaScores);
      const score = parseFloat(bandStr) || 0;

      return {
        answerId: ans.id,
        questionId: ans.questionId,
        score,
        feedback: state.feedback,
        criteriaScores: state.criteriaScores,
        sentenceFeedbacks: state.sentenceFeedbacks,
        primaryErrorCategory: state.revisionRequired ? state.primaryErrorCategory : null,
        revisionRequired: state.revisionRequired,
      };
    });

    const activeState = taskStates[activeQuestionId] || currentTaskState;

    await onGradeSubmit({
      grades: gradesPayload,
      options: {
        feedback: activeState.feedback,
        primaryErrorCategory: activeState.revisionRequired ? activeState.primaryErrorCategory : null,
        revisionRequired: activeState.revisionRequired,
        criteriaScores: activeState.criteriaScores,
        sentenceFeedbacks: activeState.sentenceFeedbacks,
        finalize,
      },
    });

    setIsDirty(false);
  };

  if (!activeAnswer) {
    return (
      <div className="h-full flex items-center justify-center p-8 text-center text-xs text-slate-400">
        Không có câu trả lời Writing nào trong bài làm này.
      </div>
    );
  }

  const wordCount = (activeAnswer.answerText || "").trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="flex-1 bg-white flex flex-col justify-between overflow-hidden h-full">
      {/* Top Header */}
      <div className="p-3.5 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-900">{homeworkTitle}</span>
            <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200 text-[10px] font-semibold">
              ✍️ Writing
            </Badge>
            {isDirty ? (
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-[10px]">
                <Clock className="w-3 h-3 mr-1" /> Chưa lưu
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px]">
                <CheckCircle2 className="w-3 h-3 mr-1" /> Đã lưu
              </Badge>
            )}
          </div>
          <div className="text-[11px] text-slate-600 font-medium flex items-center gap-2 mt-1">
            <span className="font-bold text-blue-700">{studentName}</span>
            <span>•</span>
            <span className="text-slate-500">{className}</span>
            <span>•</span>
            <span className="text-slate-500 font-bold">Overall Band: {overallBandPreview}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
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
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold h-8 text-xs px-3 shadow-xs gap-1.5"
          >
            {isSubmitting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
            Trả bài 🚀
          </Button>
        </div>
      </div>

      {/* Multi-task Selector Tabs if > 1 Writing Question */}
      {answers.length > 1 && (
        <div className="px-4 py-2 bg-slate-100/70 border-b border-slate-200 flex items-center gap-2 overflow-x-auto shrink-0">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mr-1">
            Nhiệm vụ:
          </span>
          {answers.map((ans, idx) => (
            <Button
              key={ans.questionId}
              type="button"
              size="sm"
              variant={activeTaskIndex === idx ? "default" : "outline"}
              onClick={() => setActiveTaskIndex(idx)}
              className="h-7 text-xs font-semibold gap-1.5"
            >
              <FileText className="h-3 w-3" />
              <span>{ans.questionTitle || `Writing Task ${idx + 1}`}</span>
            </Button>
          ))}
        </div>
      )}

      {/* Main Body - 2-Column Side-by-Side Split View for Ergonomic Grading */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
          {/* CỘT TRÁI (7 COLS): ĐỀ BÀI + BÀI LÀM HỌC VIÊN */}
          <div className="xl:col-span-7 space-y-4">
            {/* Đề bài (Prompt) */}
            <Card className="border border-blue-200/80 shadow-2xs rounded-xl p-4 bg-blue-50/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5 uppercase tracking-wider">
                  <HelpCircle className="h-4 w-4 text-blue-600" />
                  Yêu cầu Đề bài (Task Prompt)
                </span>
                {activeAnswer.questionTitle && (
                  <Badge variant="outline" className="bg-blue-100/80 text-blue-800 border-blue-300 text-[10px] font-bold">
                    {activeAnswer.questionTitle}
                  </Badge>
                )}
              </div>

              {activeAnswer.questionText ? (
                <p className="text-xs text-slate-800 leading-relaxed font-medium whitespace-pre-line bg-white/80 p-3 rounded-lg border border-blue-100">
                  {activeAnswer.questionText}
                </p>
              ) : (
                <p className="text-xs text-slate-500 italic bg-white/60 p-2.5 rounded-lg">
                  (Đề bài chung: {homeworkTitle})
                </p>
              )}

              {activeAnswer.passage && (
                <div className="pt-2 border-t border-blue-200/60 space-y-1">
                  <span className="text-[10px] font-bold text-blue-800 uppercase flex items-center gap-1">
                    <BookOpen className="h-3 w-3 text-blue-600" />
                    Tài liệu / Đoạn văn kèm theo:
                  </span>
                  <div className="text-xs text-slate-700 bg-white p-3 rounded-lg border border-blue-100 max-h-48 overflow-y-auto leading-relaxed">
                    {activeAnswer.passage}
                  </div>
                </div>
              )}
            </Card>

            {/* Bài làm học viên */}
            <Card className="border border-slate-200/80 shadow-2xs rounded-xl p-4 bg-white space-y-3">
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <FileText className="h-4 w-4 text-slate-600" />
                  Bài Làm Học Viên
                </span>
                <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {wordCount} từ
                </span>
              </div>

              <SentenceLevelGrader
                essayText={activeAnswer.answerText || ""}
                sentenceFeedbacks={currentTaskState.sentenceFeedbacks}
                onChange={(feedbacks) => handleUpdateActiveTask({ sentenceFeedbacks: feedbacks })}
              />
            </Card>
          </div>

          {/* CỘT PHẢI (5 COLS): BẢNG ĐIỂM 4 TIÊU CHÍ + NHẬN XÉT + ATTEMPT 2 */}
          <div className="xl:col-span-5 space-y-4">
            {/* 4-Criteria Writing Rubric Card */}
            <WritingRubricCard
              scores={currentTaskState.criteriaScores}
              onChange={(updatedScores) => handleUpdateActiveTask({ criteriaScores: updatedScores })}
              disabled={isSubmitting}
            />

            {/* General Teacher Notes Textarea */}
            <Card className="border border-slate-200/80 shadow-2xs rounded-xl p-4 space-y-2 bg-white">
              <Label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                Nhận xét chi tiết của Giáo viên
              </Label>
              <Textarea
                value={currentTaskState.feedback}
                onChange={(e) => handleUpdateActiveTask({ feedback: e.target.value })}
                placeholder="Gõ nhận xét cho học viên (Ví dụ: Bài làm tốt, phát triển luận điểm rõ ràng, cần chú ý thì động từ ở đoạn thân bài 2...)"
                className="min-h-[110px] text-xs font-sans border-slate-200 focus-visible:ring-1 focus-visible:ring-blue-500/40 leading-relaxed"
              />
            </Card>

            {/* Revision / Attempt 2 Control Section */}
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
                  checked={currentTaskState.revisionRequired}
                  onCheckedChange={(checked) => handleUpdateActiveTask({ revisionRequired: checked })}
                />
              </div>

              {currentTaskState.revisionRequired && (
                <div className="space-y-1.5 p-3 rounded-lg bg-amber-50/60 border border-amber-200">
                  <Label className="text-[11px] font-bold text-amber-900">
                    Lỗi chính cần tập trung khắc phục (Primary Error)
                  </Label>
                  <Select
                    value={currentTaskState.primaryErrorCategory}
                    onValueChange={(val: any) => handleUpdateActiveTask({ primaryErrorCategory: val })}
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
          </div>
        </div>
      </div>
    </div>
  );
}
