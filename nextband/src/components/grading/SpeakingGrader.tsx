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
  Mic,
  Volume2,
  CheckCircle2,
  Clock,
  FileAudio,
  HelpCircle,
  BookOpen,
} from "lucide-react";
import { SpeakingRubricCard } from "@/components/grading/SpeakingRubricCard";
import {
  CriteriaScores,
  ErrorCategory,
  parseStructuredFeedback,
  calculateSpeakingBand,
} from "@/lib/sentenceFeedback";
import { formatStorageUrl } from "@/lib/api";

export interface SpeakingAnswerItem {
  id?: string;
  questionId: string;
  questionTitle?: string;
  questionText?: string;
  passage?: string;
  audioUrl?: string | null;
  score?: number | null;
  feedback?: string | null;
}

interface SpeakingGraderProps {
  submissionId: string;
  studentName: string;
  className?: string;
  homeworkTitle: string;
  answers: SpeakingAnswerItem[];
  isSubmitting: boolean;
  onGradeSubmit: (payload: {
    grades: Array<{
      answerId?: string;
      questionId: string;
      score: number;
      feedback?: string;
      criteriaScores?: CriteriaScores;
      primaryErrorCategory?: ErrorCategory | null;
      revisionRequired?: boolean;
    }>;
    totalScore?: number;
    options: {
      feedback?: string;
      primaryErrorCategory?: ErrorCategory | null;
      revisionRequired?: boolean;
      criteriaScores?: CriteriaScores | null;
      finalize: boolean;
    };
  }) => Promise<void>;
}

export function SpeakingGrader({
  studentName,
  className = "Lớp IELTS",
  homeworkTitle,
  answers,
  isSubmitting,
  onGradeSubmit,
}: SpeakingGraderProps) {
  const [activePartIndex, setActivePartIndex] = useState<number>(0);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  // Per-part local state mapped by questionId
  const [partStates, setPartStates] = useState<
    Record<
      string,
      {
        criteriaScores: CriteriaScores;
        feedback: string;
        primaryErrorCategory: ErrorCategory;
        revisionRequired: boolean;
      }
    >
  >({});

  // Initialize part states from answers props
  useEffect(() => {
    const nextStates: typeof partStates = {};
    answers.forEach((ans) => {
      const structured = parseStructuredFeedback(ans.feedback);
      nextStates[ans.questionId] = {
        criteriaScores: structured.criteriaScores || {
          fluencyAndCoherence: null,
          lexical: null,
          grammar: null,
          pronunciation: null,
        },
        feedback: structured.text || ans.feedback || "",
        primaryErrorCategory: structured.primaryErrorCategory || "STRUCTURE",
        revisionRequired: !!structured.revisionRequired,
      };
    });
    setPartStates(nextStates);
    setIsDirty(false);
  }, [answers]);

  const activeAnswer = answers[activePartIndex] || answers[0];
  const activeQuestionId = activeAnswer?.questionId;
  const currentPartState = partStates[activeQuestionId] || {
    criteriaScores: { fluencyAndCoherence: null, lexical: null, grammar: null, pronunciation: null },
    feedback: "",
    primaryErrorCategory: "STRUCTURE",
    revisionRequired: false,
  };

  const handleUpdateActivePart = (
    updater: Partial<typeof currentPartState>
  ) => {
    if (!activeQuestionId) return;
    setPartStates((prev) => ({
      ...prev,
      [activeQuestionId]: {
        ...prev[activeQuestionId],
        ...updater,
      },
    }));
    setIsDirty(true);
  };

  // Compute calculated band for all parts
  const overallBandPreview = useMemo(() => {
    const validScores: number[] = [];
    answers.forEach((ans) => {
      const state = partStates[ans.questionId];
      if (state?.criteriaScores) {
        const bandStr = calculateSpeakingBand(state.criteriaScores);
        const b = parseFloat(bandStr);
        if (!isNaN(b) && b > 0) validScores.push(b);
      }
    });

    if (validScores.length === 0) return "—";
    const avg = validScores.reduce((a, b) => a + b, 0) / validScores.length;
    return (Math.round(avg * 2) / 2).toFixed(1);
  }, [answers, partStates]);

  const handleSave = async (finalize: boolean) => {
    const gradesPayload = answers.map((ans) => {
      const state = partStates[ans.questionId] || currentPartState;
      const bandStr = calculateSpeakingBand(state.criteriaScores);
      const score = parseFloat(bandStr) || 0;

      return {
        answerId: ans.id,
        questionId: ans.questionId,
        score,
        feedback: state.feedback,
        criteriaScores: state.criteriaScores,
        primaryErrorCategory: state.revisionRequired ? state.primaryErrorCategory : null,
        revisionRequired: state.revisionRequired,
      };
    });

    const activeState = partStates[activeQuestionId] || currentPartState;

    await onGradeSubmit({
      grades: gradesPayload,
      options: {
        feedback: activeState.feedback,
        primaryErrorCategory: activeState.revisionRequired ? activeState.primaryErrorCategory : null,
        revisionRequired: activeState.revisionRequired,
        criteriaScores: activeState.criteriaScores,
        finalize,
      },
    });

    setIsDirty(false);
  };

  if (!activeAnswer) {
    return (
      <div className="h-full flex items-center justify-center p-8 text-center text-xs text-slate-400">
        Không có bài làm Speaking nào được nộp.
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white flex flex-col justify-between overflow-hidden h-full">
      {/* Top Header */}
      <div className="p-3.5 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-900">{homeworkTitle}</span>
            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 text-[10px] font-semibold">
              🎙️ Speaking
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

      {/* Multi-part Selector Tabs if > 1 Speaking Question/Part */}
      {answers.length > 1 && (
        <div className="px-4 py-2 bg-slate-100/70 border-b border-slate-200 flex items-center gap-2 overflow-x-auto shrink-0">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mr-1">
            Phần thi:
          </span>
          {answers.map((ans, idx) => (
            <Button
              key={ans.questionId}
              type="button"
              size="sm"
              variant={activePartIndex === idx ? "default" : "outline"}
              onClick={() => setActivePartIndex(idx)}
              className="h-7 text-xs font-semibold gap-1.5"
            >
              <Mic className="h-3 w-3" />
              <span>{ans.questionTitle || `Speaking Part ${idx + 1}`}</span>
            </Button>
          ))}
        </div>
      )}

      {/* Main Body - 2-Column Side-by-Side Split View for Ergonomic Grading */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
          {/* CỘT TRÁI (7 COLS): ĐỀ BÀI + BẢN THU ÂM */}
          <div className="xl:col-span-7 space-y-4">
            {/* Đề bài (Prompt) */}
            <Card className="border border-orange-200/80 shadow-2xs rounded-xl p-4 bg-orange-50/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-orange-900 flex items-center gap-1.5 uppercase tracking-wider">
                  <HelpCircle className="h-4 w-4 text-orange-600" />
                  Yêu cầu Đề bài (Speaking Prompt)
                </span>
                {activeAnswer.questionTitle && (
                  <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300 text-[10px] font-bold">
                    {activeAnswer.questionTitle}
                  </Badge>
                )}
              </div>

              {activeAnswer.questionText ? (
                <p className="text-xs text-slate-800 leading-relaxed font-medium whitespace-pre-line bg-white/80 p-3 rounded-lg border border-orange-100">
                  {activeAnswer.questionText}
                </p>
              ) : (
                <p className="text-xs text-slate-500 italic bg-white/60 p-2.5 rounded-lg">
                  (Đề bài: {homeworkTitle})
                </p>
              )}

              {activeAnswer.passage && (
                <div className="pt-2 border-t border-orange-200/60 space-y-1">
                  <span className="text-[10px] font-bold text-orange-800 uppercase flex items-center gap-1">
                    <BookOpen className="h-3 w-3 text-orange-600" />
                    Tài liệu / Câu hỏi gợi ý (Cue Card):
                  </span>
                  <div className="text-xs text-slate-700 bg-white p-3 rounded-lg border border-orange-100 leading-relaxed">
                    {activeAnswer.passage}
                  </div>
                </div>
              )}
            </Card>

            {/* Audio Player */}
            <Card className="border border-slate-200/80 shadow-2xs rounded-xl p-4 bg-white space-y-3">
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Volume2 className="h-4 w-4 text-orange-600" />
                  Bản thu âm của Học viên ({activeAnswer.questionTitle || `Part ${activePartIndex + 1}`})
                </span>
                {activeAnswer.audioUrl ? (
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px]">
                    Audio khả dụng
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-slate-100 text-slate-500 border-slate-200 text-[10px]">
                    Chưa có file âm thanh
                  </Badge>
                )}
              </div>

              {activeAnswer.audioUrl ? (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <audio
                    controls
                    src={formatStorageUrl(activeAnswer.audioUrl)}
                    className="w-full h-11 rounded"
                  />
                  <p className="text-[11px] text-slate-500 text-center">
                    Học viên đã nộp bản ghi âm. Giáo viên có thể bấm phát và tua lại để chấm từng tiêu chí.
                  </p>
                </div>
              ) : (
                <div className="p-8 text-center text-xs text-slate-400 bg-slate-50/50 rounded-xl border border-dashed border-slate-200 flex flex-col items-center gap-2">
                  <FileAudio className="h-9 w-9 text-slate-300" />
                  <span>Học viên chưa nộp bản thu âm cho phần thi này.</span>
                </div>
              )}
            </Card>
          </div>

          {/* CỘT PHẢI (5 COLS): BẢNG ĐIỂM 4 TIÊU CHÍ + NHẬN XÉT + ATTEMPT 2 */}
          <div className="xl:col-span-5 space-y-4">
            {/* 4-Criteria Speaking Rubric Card */}
            <SpeakingRubricCard
              scores={currentPartState.criteriaScores}
              onChange={(updatedScores) => handleUpdateActivePart({ criteriaScores: updatedScores })}
              disabled={isSubmitting}
            />

            {/* General Teacher Notes Textarea */}
            <Card className="border border-slate-200/80 shadow-2xs rounded-xl p-4 space-y-2 bg-white">
              <Label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                Nhận xét chi tiết của Giáo viên
              </Label>
              <Textarea
                value={currentPartState.feedback}
                onChange={(e) => handleUpdateActivePart({ feedback: e.target.value })}
                placeholder="Gõ nhận xét cho bài nói của học viên (Ví dụ: Phát âm rõ ràng, từ vựng phong phú, cần chú ý tính mạch lạc và hạn chế ngập ngừng ở Part 2...)"
                className="min-h-[110px] text-xs font-sans border-slate-200 focus-visible:ring-1 focus-visible:ring-blue-500/40 leading-relaxed"
              />
            </Card>

            {/* Revision / Attempt 2 Control Section */}
            <Card className="border border-slate-200/80 shadow-2xs rounded-xl p-4 space-y-3 bg-white">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                    Yêu cầu học viên sửa bài / thu âm lại (Attempt 2)
                  </Label>
                  <p className="text-[11px] text-slate-500">
                    Bật nếu học viên cần nộp bản thu âm mới trước khi tính hoàn thành.
                  </p>
                </div>
                <Switch
                  checked={currentPartState.revisionRequired}
                  onCheckedChange={(checked) => handleUpdateActivePart({ revisionRequired: checked })}
                />
              </div>

              {currentPartState.revisionRequired && (
                <div className="space-y-1.5 p-3 rounded-lg bg-amber-50/60 border border-amber-200">
                  <Label className="text-[11px] font-bold text-amber-900">
                    Lỗi chính cần tập trung khắc phục (Primary Error)
                  </Label>
                  <Select
                    value={currentPartState.primaryErrorCategory}
                    onValueChange={(val: any) => handleUpdateActivePart({ primaryErrorCategory: val })}
                  >
                    <SelectTrigger className="h-8 text-xs font-bold bg-white border-amber-300 text-amber-900">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CONCEPT" className="text-xs font-semibold">
                        CONCEPT — Chưa trả lời đúng trọng tâm câu hỏi
                      </SelectItem>
                      <SelectItem value="STRUCTURE" className="text-xs font-semibold">
                        STRUCTURE — Cấu trúc câu chưa liên kết / Dừng ngập ngừng (Fluency)
                      </SelectItem>
                      <SelectItem value="EXPRESSION" className="text-xs font-semibold">
                        EXPRESSION — Dùng từ chưa chuẩn / Thiếu vốn từ chủ đề (Lexical)
                      </SelectItem>
                      <SelectItem value="GRAMMAR" className="text-xs font-semibold">
                        GRAMMAR — Phát âm sai / Sai ngữ pháp (Pronunciation & Grammar)
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
