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
  BookOpen,
  ArrowLeft,
} from "lucide-react";
import { SpeakingRubricCard } from "@/components/grading/SpeakingRubricCard";
import { SpeakingTranscriptViewer } from "@/components/admin/SpeakingTranscriptViewer";
import { RichContent } from "@/components/exam/RichContent";
import {
  CriteriaScores,
  ErrorCategory,
  parseStructuredFeedback,
  calculateSpeakingBand,
} from "@/lib/sentenceFeedback";
import { formatStorageUrl } from "@/lib/api";
import { calculateGradingSla } from "@/lib/gradingSla";

import { cn } from "@/lib/utils";
import { AudioStorageService } from "@/lib/audioStorageService";

export interface SpeakingAnswerItem {
  id?: string;
  questionId: string;
  questionTitle?: string;
  questionText?: string;
  instructions?: string;
  passage?: string;
  audioUrl?: string | null;
  answerText?: string;
  score?: number | null;
  feedback?: string | null;
}

interface SpeakingGraderProps {
  submissionId: string;
  studentName: string;
  className?: string;
  homeworkTitle: string;
  submissionStatus?: string;
  submittedAt?: string;
  answers: SpeakingAnswerItem[];
  submissionDetail?: any;
  isSubmitting: boolean;
  onBack?: () => void;
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
  submissionId,
  studentName,
  className = "Lớp IELTS",
  homeworkTitle,
  submissionStatus = "SUBMITTED",
  submittedAt,
  answers,
  submissionDetail,
  isSubmitting,
  onBack,
  onGradeSubmit,
}: SpeakingGraderProps) {
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [lastSavedTime, setLastSavedTime] = useState<Date | null>(null);

  // Determine initial active index: prioritize answer with audio recording
  const initialIndex = useMemo(() => {
    if (!answers || answers.length === 0) return 0;
    const idxWithAudio = answers.findIndex(
      (a) => (a.audioUrl && a.audioUrl.trim().length > 0) || AudioStorageService.isAudio(a.answerText)
    );
    return idxWithAudio >= 0 ? idxWithAudio : 0;
  }, [answers]);

  const [activeAnswerIndex, setActiveAnswerIndex] = useState<number>(initialIndex);

  // Sync active answer index if answers change
  useEffect(() => {
    setActiveAnswerIndex((prev) => (prev < answers.length ? prev : 0));
  }, [answers.length]);

  const currentAnswer = answers[activeAnswerIndex] || answers[0];
  const questionId = currentAnswer?.questionId || "";
  const answerId = currentAnswer?.id;

  // Robust audio resolution with multiple fallbacks
  const resolvedAudioUrl = useMemo(() => {
    if (currentAnswer?.audioUrl && currentAnswer.audioUrl.trim().length > 0) {
      return currentAnswer.audioUrl.trim();
    }
    if (AudioStorageService.isAudio(currentAnswer?.answerText)) {
      return (currentAnswer?.answerText || "").trim();
    }
    // Fallback: look in other answers of the submission
    const otherWithAudio = answers.find(
      (a) => (a.audioUrl && a.audioUrl.trim().length > 0) || AudioStorageService.isAudio(a.answerText)
    );
    if (otherWithAudio) {
      return (otherWithAudio.audioUrl || otherWithAudio.answerText || "").trim();
    }
    // Fallback: look in submissionDetail raw answers if available
    const rawDetailAnswers = submissionDetail?.answers || [];
    const matchedRaw = rawDetailAnswers.find(
      (a: any) =>
        (a.audioUrl && a.audioUrl.trim().length > 0) ||
        (a.audio_url && a.audio_url.trim().length > 0) ||
        AudioStorageService.isAudio(a.answerText || a.answer_text || a.studentAnswer)
    );
    if (matchedRaw) {
      return (
        matchedRaw.audioUrl ||
        matchedRaw.audio_url ||
        matchedRaw.answerText ||
        matchedRaw.answer_text ||
        matchedRaw.studentAnswer ||
        ""
      ).trim();
    }
    return "";
  }, [currentAnswer, answers, submissionDetail]);

  const [criteriaScores, setCriteriaScores] = useState<CriteriaScores>({
    fluencyAndCoherence: null,
    lexical: null,
    grammar: null,
    pronunciation: null,
  });
  const [feedbackText, setFeedbackText] = useState<string>("");
  const [primaryErrorCategory, setPrimaryErrorCategory] = useState<ErrorCategory>("STRUCTURE");
  const [revisionRequired, setRevisionRequired] = useState<boolean>(false);

  useEffect(() => {
    if (!currentAnswer) return;
    const structured = parseStructuredFeedback(currentAnswer.feedback);

    setCriteriaScores(
      structured.criteriaScores || {
        fluencyAndCoherence: null,
        lexical: null,
        grammar: null,
        pronunciation: null,
      }
    );
    setFeedbackText(structured.text || currentAnswer.feedback || "");
    setPrimaryErrorCategory(structured.primaryErrorCategory || "STRUCTURE");
    setRevisionRequired(!!structured.revisionRequired);
    setIsDirty(false);
  }, [currentAnswer]);

  const overallBandPreview = useMemo(() => {
    return calculateSpeakingBand(criteriaScores);
  }, [criteriaScores]);

  const handleSave = async (finalize: boolean) => {
    if (!questionId && answers.length === 0) return;

    const bandStr = calculateSpeakingBand(criteriaScores);
    const score = parseFloat(bandStr) || 0;

    const gradesPayload = answers.length > 0
      ? answers.map((ans, idx) => {
          if (idx === activeAnswerIndex || answers.length === 1) {
            return {
              answerId: ans.id,
              questionId: ans.questionId,
              score,
              feedback: feedbackText,
              criteriaScores,
              primaryErrorCategory: revisionRequired ? primaryErrorCategory : null,
              revisionRequired,
            };
          }
          return {
            answerId: ans.id,
            questionId: ans.questionId,
            score: ans.score ?? score,
            feedback: ans.feedback || "",
          };
        })
      : [
          {
            answerId,
            questionId,
            score,
            feedback: feedbackText,
            criteriaScores,
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
        finalize,
      },
    });

    setIsDirty(false);
    setLastSavedTime(new Date());
  };

  if (!currentAnswer) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center text-sm text-slate-400 bg-white">
        <Mic className="h-10 w-10 text-slate-300 mb-2" />
        <p>Không tìm thấy bài làm Speaking nào trong bài nộp này.</p>
        {onBack && (
          <Button variant="outline" size="sm" onClick={onBack} className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-1.5" /> Quay lại danh sách
          </Button>
        )}
      </div>
    );
  }

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
              <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 text-[11px] font-semibold">
                🎙️ Speaking
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

      {/* Main Focus Layout: 68% Left (Prompt + Audio Player) | 32% Right (Grading Panel) */}
      <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* LEFT COLUMN (68%): PROMPT & AUDIO PLAYBACK */}
        <div className="lg:col-span-8 h-full overflow-y-auto p-6 space-y-6 bg-slate-50/50">
          {/* MULTI-PART SELECTOR TABS (If exam has multiple questions / parts) */}
          {answers.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-xs font-bold text-slate-500 mr-1 shrink-0">Chọn phần thi:</span>
              {answers.map((ans, idx) => {
                const hasAudio = !!(ans.audioUrl || AudioStorageService.isAudio(ans.answerText));
                const isSelected = idx === activeAnswerIndex;
                const partLabel = ans.questionTitle ? ans.questionTitle.replace(/<[^>]*>/g, " ").trim() : `Part ${idx + 1}`;
                return (
                  <button
                    key={ans.questionId || idx}
                    type="button"
                    onClick={() => setActiveAnswerIndex(idx)}
                    className={cn(
                      "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border shadow-2xs shrink-0 cursor-pointer",
                      isSelected
                        ? "bg-orange-600 text-white border-orange-600 shadow-orange-500/20"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                    )}
                  >
                    <span>{partLabel}</span>
                    {hasAudio ? (
                      <span
                        className={cn("w-2 h-2 rounded-full", isSelected ? "bg-white" : "bg-emerald-500")}
                        title="Đã có file ghi âm"
                      />
                    ) : (
                      <span
                        className={cn("w-1.5 h-1.5 rounded-full", isSelected ? "bg-orange-300" : "bg-slate-300")}
                        title="Chưa có file ghi âm"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* ĐỀ BÀI (Speaking Question / Cue Card) */}
          <Card className="border border-amber-200 shadow-xs rounded-2xl p-5 bg-amber-50/60 space-y-3 font-sans">
            <div className="flex items-center justify-between border-b border-amber-100/80 pb-2.5">
              <span className="text-xs font-extrabold text-amber-900 flex items-center gap-1.5 uppercase tracking-wider">
                <BookOpen className="h-4 w-4 text-orange-600" />
                {(currentAnswer?.questionTitle ? currentAnswer.questionTitle.replace(/<[^>]*>/g, " ").trim() : "") || "Yêu cầu Đề bài (Speaking Prompt)"}
              </span>
              <Badge variant="outline" className="bg-amber-100/70 text-amber-800 border-amber-200 text-[11px] font-bold">
                Đề bài
              </Badge>
            </div>

            {/* Instructions */}
            {currentAnswer?.instructions && (
              <div className="text-xs text-slate-700 font-normal bg-white/90 p-3 rounded-xl border border-amber-100 leading-relaxed shadow-2xs">
                <RichContent html={currentAnswer.instructions} />
              </div>
            )}

            {/* Question Text */}
            {currentAnswer?.questionText && (
              <div className="text-sm text-slate-900 leading-relaxed font-normal bg-white/60 p-3.5 rounded-xl border border-amber-100/70">
                <RichContent html={currentAnswer.questionText} />
              </div>
            )}

            {/* Cue Card / Passage */}
            {currentAnswer?.passage && (
              <div className="pt-2 border-t border-amber-100">
                <div className="text-sm text-slate-800 leading-relaxed max-h-96 overflow-y-auto bg-white/90 p-3.5 rounded-xl border border-amber-100">
                  <RichContent html={currentAnswer.passage} variant="passage" />
                </div>
              </div>
            )}
          </Card>

          {/* BẢN THU ÂM & BÓC BĂNG ĐỐI CHIẾU CỦA HỌC VIÊN */}
          <Card className="border border-slate-200 shadow-xs rounded-2xl p-6 bg-white space-y-4 font-sans">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-orange-600" />
                <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">
                  Bản Thu Âm & Bóc Băng Văn Bản (Speech-to-Text)
                </h3>
              </div>
              {resolvedAudioUrl ? (
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs font-semibold">
                  Audio & Transcript khả dụng
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-slate-100 text-slate-500 border-slate-200 text-xs">
                  Chưa nộp file âm thanh
                </Badge>
              )}
            </div>

            {resolvedAudioUrl ? (
              <div className="space-y-3">
                <SpeakingTranscriptViewer
                  audioUrl={resolvedAudioUrl}
                  initialTranscript={AudioStorageService.isAudio(currentAnswer?.answerText) ? undefined : currentAnswer?.answerText || undefined}
                  submissionId={submissionId}
                  answerId={answerId}
                  questionId={questionId}
                  onTranscriptEdited={(_updatedTranscript) => {
                    setIsDirty(true);
                  }}
                />
                <p className="text-[11px] text-slate-500 text-center font-sans">
                  💡 Bạn có thể click vào bất kỳ đoạn văn bản nào để tua âm thanh đến đúng mốc thời gian đó và nghe lại.
                </p>
              </div>
            ) : (
              <div className="p-10 text-center text-xs text-slate-400 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 flex flex-col items-center gap-2">
                <FileAudio className="h-10 w-10 text-slate-300" />
                <span>Học viên chưa nộp file ghi âm cho bài tập này.</span>
              </div>
            )}
          </Card>
        </div>

        {/* RIGHT COLUMN (32%): GRADING CONTROLS (STICKY) */}
        <aside className="lg:col-span-4 h-full overflow-y-auto p-5 border-l border-slate-200 bg-white space-y-5 shadow-xs">
          {/* Rubric Card */}
          <SpeakingRubricCard
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
              placeholder="Gõ nhận xét chi tiết cho học viên (Ví dụ: Phát âm tự nhiên, vốn từ phong phú, cần cải thiện tính liên kết câu...)"
              className="min-h-[120px] text-xs font-sans border-slate-200 focus-visible:ring-1 focus-visible:ring-blue-500/40 leading-relaxed bg-white"
            />
          </Card>

          {/* Revision Required (Attempt 2) Switch */}
          <Card className="border border-slate-200/80 shadow-2xs rounded-xl p-4 space-y-3 bg-white">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                  Yêu cầu học viên thu âm lại (Attempt 2)
                </Label>
                <p className="text-[11px] text-slate-500">
                  Bật nếu học viên cần nộp bản thu âm mới trước khi tính hoàn thành.
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
                    <SelectItem value="OTHER" className="text-xs font-semibold">
                      OTHER — Lỗi khác / Ghi chú riêng
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
