import { useQuery } from "@tanstack/react-query";
import { examsApi, formatStorageUrl } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Clock,
  HelpCircle,
  BookOpen,
  Volume2,
  Calendar,
  AlertCircle,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { RichContent } from "@/components/exam/RichContent";

interface ExamPreviewPanelProps {
  examId: string;
  homeworkTitle: string;
  studentName: string;
  className?: string;
  status: string;
  dueDate?: string;
}

export function ExamPreviewPanel({
  examId,
  homeworkTitle,
  studentName,
  className = "Lớp IELTS",
  status,
  dueDate,
}: ExamPreviewPanelProps) {
  const { data: examData, isLoading, error } = useQuery({
    queryKey: ["exam-preview-for-teacher", examId],
    queryFn: () => examsApi.getById(examId),
    enabled: !!examId,
  });

  return (
    <div className="flex-1 bg-white flex flex-col justify-between overflow-hidden h-full">
      {/* Top Header */}
      <div className="p-3.5 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-900">{homeworkTitle}</span>
            <Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-300 text-[10px] font-semibold">
              📖 Xem trước Đề bài
            </Badge>
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-[10px]">
              {status === "in_progress" ? "🟡 Đang làm bài" : "⏳ Chưa nộp bài"}
            </Badge>
          </div>
          <div className="text-[11px] text-slate-600 font-medium flex items-center gap-2 mt-1">
            <span className="font-bold text-blue-700">{studentName}</span>
            <span>•</span>
            <span className="text-slate-500">{className}</span>
            {dueDate && (
              <>
                <span>•</span>
                <span className="text-slate-500 flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> Hạn nộp: {dueDate}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Body: Exam Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Banner Thông báo */}
        <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
          <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Học viên chưa nộp bài làm cho bài tập này.</p>
            <p className="text-[11px] text-amber-800 mt-0.5">
              Giáo viên có thể xem trước nội dung đề bài, các câu hỏi và hướng dẫn dưới đây. Khi học viên nộp bài, khay chấm điểm sẽ tự động kích hoạt.
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="p-12 flex flex-col items-center justify-center gap-2 text-slate-400">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <span className="text-xs">Đang tải nội dung đề bài...</span>
          </div>
        ) : error || !examData ? (
          <div className="p-8 text-center text-xs text-slate-400">
            Không tìm thấy thông tin chi tiết của đề bài này.
          </div>
        ) : (
          <div className="space-y-4">
            {/* Thông tin Tổng quan Đề thi */}
            <Card className="border border-slate-200 shadow-2xs rounded-xl p-4 bg-slate-50/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Thông tin Đề thi
                </span>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Clock className="h-3.5 w-3.5 text-slate-500" />
                  <span>Thời gian: {examData.durationMinutes || 60} phút</span>
                </div>
              </div>
              {examData.description && (
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {examData.description}
                </p>
              )}
            </Card>

            {/* Danh sách Sections / Question Groups / Questions */}
            {(examData.sections || []).map((sec: any, secIdx: number) => (
              <div key={sec.id || secIdx} className="space-y-3">
                <div className="flex items-center gap-2 border-b pb-1">
                  <Badge className="bg-blue-600 text-white text-[10px]">
                    Phần {secIdx + 1}: {sec.title || sec.sectionType?.toUpperCase()}
                  </Badge>
                  {sec.timeLimitMinutes && (
                    <span className="text-[11px] text-slate-500 font-mono">
                      ({sec.timeLimitMinutes} phút)
                    </span>
                  )}
                </div>

                {(sec.questionGroups || sec.question_groups || []).map((grp: any, grpIdx: number) => (
                  <Card
                    key={grp.id || grpIdx}
                    className="border border-slate-200 shadow-2xs rounded-xl p-4 bg-white space-y-3"
                  >
                    {grp.title && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <HelpCircle className="h-3.5 w-3.5 text-blue-600" />
                          {grp.title}
                        </span>
                      </div>
                    )}

                    {grp.instructions && (
                      <div className="text-xs text-slate-700 font-normal bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                        <RichContent html={grp.instructions} />
                      </div>
                    )}

                    {grp.passage && (
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase text-slate-500 flex items-center gap-1">
                          <BookOpen className="h-3 w-3 text-slate-400" />
                          Đoạn văn / Đọc hiểu:
                        </span>
                        <div className="text-xs text-slate-800 bg-slate-50/50 p-3 rounded-lg border border-slate-200 max-h-60 overflow-y-auto leading-relaxed">
                          <RichContent html={grp.passage} variant="passage" />
                        </div>
                      </div>
                    )}

                    {grp.audioUrl && (
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase text-slate-500 flex items-center gap-1">
                          <Volume2 className="h-3 w-3 text-slate-400" />
                          Audio Đề bài:
                        </span>
                        <audio controls preload="metadata" crossOrigin="anonymous" src={formatStorageUrl(grp.audioUrl)} className="w-full h-8" />
                      </div>
                    )}

                    {/* Câu hỏi trong Group */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      {(grp.questions || []).map((q: any, qIdx: number) => (
                        <div
                          key={q.id || qIdx}
                          className="p-3 rounded-lg bg-slate-50/80 border border-slate-200/80 space-y-1.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900">
                              Câu {qIdx + 1} ({q.questionType}):
                            </span>
                            {q.points && (
                              <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                                {q.points} điểm
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-800 leading-relaxed font-normal">
                            <RichContent html={q.questionText || q.question_text || "(Không có nội dung câu hỏi)"} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
