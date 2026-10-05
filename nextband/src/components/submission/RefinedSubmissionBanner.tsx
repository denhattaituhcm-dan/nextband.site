import React from "react";
import { CheckCircle2, Clock, Trophy, Award, AlertCircle } from "lucide-react";

interface RefinedSubmissionBannerProps {
  isFinalExam: boolean;
  isGraded: boolean;
  score?: number | string | null;
  answeredCount: number;
  totalQuestionsCount: number;
  isObjectiveExam: boolean;
  objPercentage?: number;
}

export function RefinedSubmissionBanner({
  isFinalExam,
  isGraded,
  score,
  answeredCount,
  totalQuestionsCount,
  isObjectiveExam,
  objPercentage = 0,
}: RefinedSubmissionBannerProps) {
  // Case 1: Final exam sealed
  if (isFinalExam && !isGraded) {
    return (
      <div className="rounded-2xl border border-indigo-200/80 bg-gradient-to-r from-indigo-50/90 via-slate-50 to-blue-50/90 dark:from-indigo-950/40 dark:to-slate-900 dark:border-indigo-800/60 p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 shadow-xs flex items-center justify-center text-xl shrink-0 border border-indigo-200/60">
              🔒
            </div>
            <div className="space-y-0.5">
              <h2 className="text-base font-extrabold text-indigo-950 dark:text-indigo-100 tracking-tight">
                Bài thi kết khóa đã được niêm phong
              </h2>
              <p className="text-xs text-indigo-900/90 dark:text-indigo-300 font-medium">
                Hội đồng chuyên môn đang chấm điểm toàn diện. Bảng điểm 4 kỹ năng chính thức sẽ được công bố khi hoàn tất.
              </p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200 text-xs font-bold flex items-center gap-1.5 border border-indigo-200 dark:border-indigo-700 shrink-0 self-start sm:self-auto">
            <span>⏳</span> Chờ công bố điểm
          </span>
        </div>
      </div>
    );
  }

  // Case 2: Graded submission
  if (isGraded) {
    const numericScore = typeof score === "number" ? score : parseFloat(String(score || 0));
    const isHighPerformance = (!isNaN(numericScore) && numericScore >= 7.0) || objPercentage >= 80;

    return (
      <div
        className={`rounded-2xl border p-4 sm:p-5 shadow-xs ${
          isHighPerformance
            ? "border-emerald-200/90 bg-gradient-to-r from-emerald-50/80 via-slate-50 to-teal-50/80 dark:from-emerald-950/30 dark:to-slate-900 dark:border-emerald-800/60"
            : "border-slate-200/90 bg-gradient-to-r from-slate-50 via-white to-blue-50/50 dark:from-slate-900 dark:to-slate-800/50 dark:border-slate-800"
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl shadow-xs flex items-center justify-center shrink-0 border ${
                isHighPerformance
                  ? "bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border-emerald-200"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200"
              }`}
            >
              {isHighPerformance ? <Trophy className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
            </div>
            <div className="space-y-0.5">
              <h2 className="text-base font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                {isHighPerformance
                  ? "Kết quả đánh giá: Đạt chuẩn xuất sắc"
                  : "Báo cáo kết quả và sửa lỗi"}
              </h2>
              <p className="text-xs text-muted-foreground font-medium">
                {isHighPerformance
                  ? "Bạn đã hoàn thành tốt các yêu cầu của bài tập. Hãy xem chi tiết điểm thành phần bên dưới."
                  : "Hãy phân tích kỹ các câu cần sửa và phản hồi của giáo viên bên dưới để tối ưu điểm số lần sau."}
              </p>
            </div>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 border shrink-0 self-start sm:self-auto ${
              isHighPerformance
                ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-300"
                : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300"
            }`}
          >
            <span>{isHighPerformance ? "🏅 Chuẩn Đầu Ra" : "📋 Báo Cáo Năng Lực"}</span>
          </span>
        </div>
      </div>
    );
  }

  // Case 3: Waiting for grading
  return (
    <div className="rounded-2xl border border-blue-200/80 bg-gradient-to-r from-blue-50/70 via-slate-50 to-indigo-50/70 dark:from-blue-950/30 dark:to-slate-900 dark:border-blue-800/60 p-4 sm:p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 shadow-xs flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 border border-blue-200/60">
            <Clock className="h-5 w-5" />
          </div>
          <div className="space-y-0.5">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              Bài làm đã được ghi nhận ({answeredCount}/{totalQuestionsCount} câu)
            </h2>
            <p className="text-xs text-muted-foreground font-medium">
              Giáo viên sẽ chấm chữa chi tiết và gửi phản hồi cho bạn trong thời gian sớm nhất.
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 text-xs font-bold flex items-center gap-1.5 border border-blue-200 dark:border-blue-800 shrink-0 self-start sm:self-auto">
          <span>⏳</span> Đang chờ chấm
        </span>
      </div>
    </div>
  );
}
