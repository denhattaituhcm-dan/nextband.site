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
import { RichContent } from "@/components/exam/RichContent";
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
  instructions?: string;
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
  submissionStatus?: string;
  answers: SpeakingAnswerItem[];
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
  studentName,
  className = "Lớp IELTS",
  homeworkTitle,
  submissionStatus = "SUBMITTED",
  answers,
  isSubmitting,
  onBack,
  onGradeSubmit,
}: SpeakingGraderProps) {
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [lastSavedTime, setLastSavedTime] = useState<Date | null>(null);

  // 1 Speaking Submission = 1 Assignment Question = 1 Student Recording Answer
  const currentAnswer = answers[0];
  const questionId = currentAnswer?.questionId || "";
  const answerId = currentAnswer?.id;

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
    if (!questionId) return;

    const bandStr = calculateSpeakingBand(criteriaScores);
    const score = parseFloat(bandStr) || 0;

    const gradesPayload = [
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

      {/* Main Focus Layout: 68% Left (Prompt + Audio Player) | 32% Right (Grading Panel) */}
      <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* LEFT COLUMN (68%): PROMPT & AUDIO PLAYBACK */}
        <div className="lg:col-span-8 h-full overflow-y-auto p-6 space-y-6 bg-slate-50/50">
          {/* ĐỀ BÀI (Speaking Question / Cue Card) */}
          <Card className="border border-orange-200/80 shadow-xs rounded-2xl p-5 bg-white space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <span className="text-xs font-extrabold text-orange-900 flex items-center gap-1.5 uppercase tracking-wider">
                <BookOpen className="h-4 w-4 text-orange-600" />
                {currentAnswer.questionTitle || "Yêu cầu Đề bài (Speaking Prompt)"}
              </span>
            </div>

            {/* Instructions */}
            {currentAnswer.instructions && (
              <div className="text-xs text-slate-600 font-medium bg-orange-50/50 p-3 rounded-xl border border-orange-100 leading-relaxed">
                {currentAnswer.instructions}
              </div>
            )}

            {/* Question Text */}
            {currentAnswer.questionText && (
              <div className="text-sm text-slate-900 leading-relaxed font-semibold">
                <RichContent html={currentAnswer.questionText} />
              </div>
            )}

            {/* Cue Card / Passage */}
            {currentAnswer.passage && (
              <div className="pt-2 border-t border-slate-100">
                <div className="text-sm text-slate-800 leading-relaxed max-h-96 overflow-y-auto">
                  <RichContent html={currentAnswer.passage} variant="passage" />
                </div>
              </div>
            )}
          </Card>

          {/* BẢN THU ÂM CỦA HỌC VIÊN */}
          <Card className="border border-slate-200 shadow-xs rounded-2xl p-6 bg-white space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-orange-600" />
                <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">
                  Bản Thu Âm Của Học Viên
                </h3>
              </div>
              {currentAnswer.audioUrl ? (
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">
                  Audio khả dụng
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-slate-100 text-slate-500 border-slate-200 text-xs">
                  Chưa nộp file âm thanh
                </Badge>
              )}
            </div>

            {currentAnswer.audioUrl ? (
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <audio
                  controls
                  src={formatStorageUrl(currentAnswer.audioUrl)}
                  className="w-full h-12 rounded"
                />
                <p className="text-xs text-slate-500 text-center">
                  Giáo viên có thể nghe, tạm dừng và tua lại để đánh giá từng tiêu chí Fluency, Lexical, Grammar và Pronunciation.
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
