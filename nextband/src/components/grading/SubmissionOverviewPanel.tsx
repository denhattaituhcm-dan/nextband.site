import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  BookOpen,
  Volume2,
  FileText,
  Award,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileAudio,
  CheckCircle,
  XCircle,
  Headphones,
} from "lucide-react";
import { RichContent } from "@/components/exam/RichContent";
import { formatStorageUrl } from "@/lib/api";
import { AudioStorageService } from "@/lib/audioStorageService";
import {
  detectExamSkill,
  isAutoGradedExam,
  getSkillBadgeConfig,
  ExamSkillType,
} from "@/lib/examSkillHelper";

interface SubmissionOverviewPanelProps {
  homework: {
    id: string;
    title: string;
    type: string;
    skill?: ExamSkillType;
    isAutoGraded?: boolean;
    status: string;
    score?: number | null;
    bandScore?: number | null;
    objectiveScore?: number | null;
    criteriaScores?: any;
    feedback?: string | null;
    primaryErrorCategory?: string | null;
    revisionRequired?: boolean;
    submittedAt?: string;
  };
  student: {
    id: string;
    fullName: string;
    avatarUrl?: string;
  };
  className?: string;
  isSpeaking: boolean;
  resolvedAnswers: any[];
  submissionDetail?: any;
  onOpenFocusMode: () => void;
}

export function stripHtmlTags(html?: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function cleanPromptHtml(html?: string): string {
  if (!html) return "";
  return html
    .replace(/<p>\s*<br\s*\/?>\s*<\/p>/gi, "")
    .replace(/(<br\s*\/?>)+$/gi, "")
    .trim();
}

export function SubmissionOverviewPanel({
  homework,
  student,
  className = "Lớp IELTS",
  isSpeaking,
  resolvedAnswers,
  submissionDetail,
  onOpenFocusMode,
}: SubmissionOverviewPanelProps) {
  const currentAnswer = resolvedAnswers[0];
  const detectedSkill: ExamSkillType = homework.skill || detectExamSkill(homework);
  const isAutoGraded = homework.isAutoGraded ?? isAutoGradedExam(homework);
  const skillBadge = getSkillBadgeConfig(detectedSkill);

  const totalQuestions = resolvedAnswers.length || 11;
  const answeredQuestions = resolvedAnswers.filter((a) => !!(a.answerText || a.audioUrl)).length;
  const correctQuestions = resolvedAnswers.filter((a) => a.score != null && Number(a.score) > 0).length;
  const correctScore = homework.objectiveScore ?? homework.score ?? (correctQuestions > 0 ? correctQuestions : answeredQuestions);

  const hasStudentActivity = answeredQuestions > 0 || homework.status === "submitted" || homework.status === "graded" || (homework.score != null && Number(homework.score) > 0);

  const isGraded = homework.status === "graded" || isAutoGraded || (homework.score != null && Number(homework.score) > 0);
  const bandScore = homework.score ?? homework.bandScore ?? homework.objectiveScore ?? null;

  const criteria = currentAnswer?.feedback
    ? (() => {
        try {
          const parsed = JSON.parse(currentAnswer.feedback);
          return parsed.criteriaScores || homework.criteriaScores || null;
        } catch {
          return homework.criteriaScores || null;
        }
      })()
    : homework.criteriaScores || null;

  const rawFeedback = currentAnswer?.feedback
    ? (() => {
        try {
          const parsed = JSON.parse(currentAnswer.feedback);
          return parsed.text || homework.feedback || "";
        } catch {
          return currentAnswer.feedback || homework.feedback || "";
        }
      })()
    : homework.feedback || "";

  const rawAnswerText = currentAnswer?.answerText || "";
  const wordCount = rawAnswerText.trim() ? rawAnswerText.trim().split(/\s+/).filter(Boolean).length : 0;
  const rawAudioUrl =
    (currentAnswer?.audioUrl && currentAnswer.audioUrl.trim().length > 0)
      ? currentAnswer.audioUrl.trim()
      : AudioStorageService.isAudio(currentAnswer?.answerText)
      ? currentAnswer?.answerText?.trim() || ""
      : (resolvedAnswers.find((a) => (a.audioUrl && a.audioUrl.trim().length > 0) || AudioStorageService.isAudio(a.answerText))?.audioUrl ||
         resolvedAnswers.find((a) => AudioStorageService.isAudio(a.answerText))?.answerText ||
         "");

  const promptTitle = stripHtmlTags(currentAnswer?.questionTitle) || (isSpeaking ? "Đề bài Speaking" : isAutoGraded ? "Nội dung Bài thi" : "Đề bài Writing");
  const promptText = cleanPromptHtml(currentAnswer?.questionText || "");
  const promptPassage = cleanPromptHtml(currentAnswer?.passage || "");
  const instructions = cleanPromptHtml(currentAnswer?.instructions || "");

  const totalQuestions = resolvedAnswers.length;
  const answeredQuestions = resolvedAnswers.filter((a) => !!(a.answerText || a.audioUrl)).length;

  return (
    <div className="h-full flex flex-col bg-slate-50/40 overflow-hidden">
      {/* Top Header Card */}
      <div className="p-4 bg-white border-b border-slate-200 shrink-0 space-y-3 shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-extrabold text-slate-900 truncate">{homework.title}</span>
              <Badge
                variant="outline"
                className={`text-xs font-semibold ${skillBadge.badgeClass}`}
              >
                {skillBadge.label}
              </Badge>
              <Badge
                variant="outline"
                className={
                  isGraded
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200 text-xs font-semibold"
                    : "bg-blue-50 text-blue-700 border-blue-200 text-xs font-semibold"
                }
              >
                {isGraded ? "Đã chấm điểm" : "Chờ chấm"}
              </Badge>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Học viên: <span className="font-bold text-blue-700">{student.fullName}</span> • {className}
            </p>
          </div>
        </div>

        {/* NÚT CHÍNH VÀO CHẤM / XEM BÀI */}
        <Button
          onClick={onOpenFocusMode}
          className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs gap-2 text-xs transition-all"
        >
          <ExternalLink className="h-4 w-4" />
          <span>
            {isGraded || isAutoGraded
              ? "Xem chi tiết bài làm & đáp án (Focus Mode) 🚀"
              : "Vào giao diện chấm bài (Focus Mode) 🚀"}
          </span>
        </Button>
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* THẺ 1: KHÁI QUÁT ĐỀ BÀI */}
        <Card className="p-4 border-slate-200 bg-white shadow-2xs rounded-xl space-y-2">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wider">
              <BookOpen className="h-3.5 w-3.5 text-blue-600" />
              {promptTitle}
            </span>
          </div>

          {instructions && (
            <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100 leading-relaxed font-normal">
              <RichContent html={instructions} />
            </div>
          )}

          {promptText && (
            <div className="text-xs text-slate-900 font-normal leading-relaxed">
              <RichContent html={promptText} />
            </div>
          )}

          {promptPassage && (
            <div className="pt-1.5 border-t border-slate-100 text-xs text-slate-700 leading-relaxed max-h-48 overflow-y-auto">
              <RichContent html={promptPassage} variant="passage" />
            </div>
          )}
        </Card>

        {/* THẺ 2: KHÁI QUÁT BÀI LÀM CỦA HỌC VIÊN */}
        <Card className="p-4 border-slate-200 bg-white shadow-2xs rounded-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              {isSpeaking ? (
                <Volume2 className="h-3.5 w-3.5 text-orange-600" />
              ) : isAutoGraded ? (
                <BookOpen className="h-3.5 w-3.5 text-indigo-600" />
              ) : (
                <FileText className="h-3.5 w-3.5 text-teal-600" />
              )}
              Bài làm của học viên
            </span>
            {isSpeaking ? (
              rawAudioUrl ? (
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px]">
                  Audio khả dụng
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-slate-100 text-slate-500 border-slate-200 text-[10px]">
                  Chưa nộp audio
                </Badge>
              )
            ) : isAutoGraded || totalQuestions > 1 ? (
              <span className="text-[11px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                Đã làm {answeredQuestions}/{totalQuestions} câu
              </span>
            ) : (
              <span className="text-[11px] font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                {wordCount} từ
              </span>
            )}
          </div>

          {isSpeaking ? (
            rawAudioUrl ? (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <audio
                  controls
                  src={formatStorageUrl(rawAudioUrl)}
                  className="w-full h-10 rounded"
                />
                <p className="text-[11px] text-slate-500 text-center">
                  Nghe nhanh file ghi âm của học viên trước khi vào phòng chấm.
                </p>
              </div>
            ) : (
              <div className="p-6 text-center text-xs text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200 flex flex-col items-center gap-1.5">
                <FileAudio className="h-8 w-8 text-slate-300" />
                <span>Học viên chưa gửi file ghi âm.</span>
              </div>
            )
          ) : isAutoGraded || totalQuestions > 1 ? (
            <div className="space-y-2">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700 space-y-1">
                <p className="font-semibold text-slate-900">
                  Tổng quan: {answeredQuestions}/{totalQuestions} câu hỏi đã được làm.
                </p>
                <p className="text-[11px] text-slate-500">
                  Bấm "Xem chi tiết bài làm & đáp án" để xem đối chiếu đầy đủ từng câu hỏi với đáp án học viên và đáp án chuẩn.
                </p>
              </div>

              {resolvedAnswers.slice(0, 3).map((ans, idx) => (
                <div key={ans.questionId || idx} className="p-2.5 bg-white rounded-lg border border-slate-200 text-xs space-y-1">
                  <div className="font-semibold text-slate-800 line-clamp-1">
                    Câu {idx + 1}: {stripHtmlTags(ans.questionText) || "Câu hỏi"}
                  </div>
                  <div className="text-slate-600 text-[11px]">
                    <span className="font-medium text-slate-500">Bài làm: </span>
                    <span className="font-semibold text-blue-700">{ans.answerText || "(Chưa trả lời)"}</span>
                  </div>
                </div>
              ))}
              {totalQuestions > 3 && (
                <p className="text-center text-[11px] text-slate-400">... và còn {totalQuestions - 3} câu hỏi khác</p>
              )}
            </div>
          ) : rawAnswerText.trim() ? (
            <div className="text-xs text-slate-800 font-serif leading-relaxed line-clamp-6 bg-slate-50/50 p-3 rounded-xl border border-slate-100 whitespace-pre-wrap">
              {rawAnswerText}
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-slate-400 italic bg-slate-50 rounded-xl border border-dashed border-slate-200">
              Học viên nộp bài nhưng chưa có văn bản.
            </div>
          )}
        </Card>

        {/* THẺ 3: KHÁI QUÁT KẾT QUẢ ĐÃ CHẤM (HOẶC BẢN NHÁP) */}
        <Card className="p-4 border-slate-200 bg-white shadow-2xs rounded-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5 text-blue-600" />
              Kết quả chấm điểm {isAutoGraded ? "(Tự động)" : "(Giáo viên)"}
            </span>
            {isGraded ? (
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] font-bold">
                <CheckCircle2 className="w-3 h-3 mr-1" /> {isAutoGraded ? "Đã chấm tự động" : "Đã chấm chính thức"}
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-[10px] font-semibold">
                <Clock className="w-3 h-3 mr-1" /> Chưa hoàn tất
              </Badge>
            )}
          </div>

          {hasStudentActivity || isGraded || (bandScore != null && Number(bandScore) > 0) ? (
            <div className="space-y-3">
              {/* Overall Score / Band */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50/60 border border-blue-100">
                <span className="text-xs font-bold text-blue-900">
                  {isAutoGraded || (!isSpeaking && detectedSkill !== "writing")
                    ? "Kết quả làm bài (Tự động)"
                    : "Overall Band Score"}
                </span>
                <span className="text-lg font-black text-blue-700 font-mono">
                  {isAutoGraded || (!isSpeaking && detectedSkill !== "writing") ? (
                    `${correctScore}/${totalQuestions} câu`
                  ) : bandScore != null && !isNaN(Number(bandScore)) ? (
                    `Band ${Number(bandScore).toFixed(1)}`
                  ) : (
                    "Đã chấm chính thức"
                  )}
                </span>
              </div>

              {/* 4 Criteria Scores (if writing/speaking) */}
              {criteria && !isAutoGraded && (
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {isSpeaking ? (
                    <>
                      <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 flex justify-between">
                        <span className="text-slate-600 font-medium">Fluency (FC):</span>
                        <span className="font-bold text-slate-900 font-mono">
                          {criteria.fluencyAndCoherence != null ? Number(criteria.fluencyAndCoherence).toFixed(1) : "—"}
                        </span>
                      </div>
                      <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 flex justify-between">
                        <span className="text-slate-600 font-medium">Lexical (LR):</span>
                        <span className="font-bold text-slate-900 font-mono">
                          {criteria.lexical != null ? Number(criteria.lexical).toFixed(1) : "—"}
                        </span>
                      </div>
                      <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 flex justify-between">
                        <span className="text-slate-600 font-medium">Grammar (GRA):</span>
                        <span className="font-bold text-slate-900 font-mono">
                          {criteria.grammar != null ? Number(criteria.grammar).toFixed(1) : "—"}
                        </span>
                      </div>
                      <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 flex justify-between">
                        <span className="text-slate-600 font-medium">Pronun (PR):</span>
                        <span className="font-bold text-slate-900 font-mono">
                          {criteria.pronunciation != null ? Number(criteria.pronunciation).toFixed(1) : "—"}
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 flex justify-between">
                        <span className="text-slate-600 font-medium">Task Resp (TR):</span>
                        <span className="font-bold text-slate-900 font-mono">
                          {criteria.taskResponse != null ? Number(criteria.taskResponse).toFixed(1) : "—"}
                        </span>
                      </div>
                      <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 flex justify-between">
                        <span className="text-slate-600 font-medium">Coherence (CC):</span>
                        <span className="font-bold text-slate-900 font-mono">
                          {criteria.coherence != null ? Number(criteria.coherence).toFixed(1) : "—"}
                        </span>
                      </div>
                      <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 flex justify-between">
                        <span className="text-slate-600 font-medium">Lexical (LR):</span>
                        <span className="font-bold text-slate-900 font-mono">
                          {criteria.lexical != null ? Number(criteria.lexical).toFixed(1) : "—"}
                        </span>
                      </div>
                      <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 flex justify-between">
                        <span className="text-slate-600 font-medium">Grammar (GRA):</span>
                        <span className="font-bold text-slate-900 font-mono">
                          {criteria.grammar != null ? Number(criteria.grammar).toFixed(1) : "—"}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Nhận xét */}
              {rawFeedback && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                  <span className="text-[11px] font-bold text-slate-700">Nhận xét của Giáo viên:</span>
                  <p className="text-xs text-slate-600 leading-relaxed italic">{rawFeedback}</p>
                </div>
              )}

              {/* Attempt 2 Status */}
              {homework.revisionRequired && (
                <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 flex items-center gap-2 text-xs text-amber-900">
                  <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                  <span>
                    Đã yêu cầu sửa bài (Attempt 2) • Lỗi trọng tâm:{" "}
                    <strong>{homework.primaryErrorCategory || "STRUCTURE"}</strong>
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 text-center text-xs text-slate-500 bg-slate-50/60 rounded-xl border border-slate-100 space-y-1">
              <p className="font-semibold text-slate-700">
                {isAutoGraded ? "Học viên chưa làm bài này." : "Bài thi chưa được chấm điểm."}
              </p>
              <p className="text-[11px] text-slate-400">
                Nhấn nút "Xem chi tiết bài làm & đáp án" bên trên để mở phòng xem toàn màn hình.
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
