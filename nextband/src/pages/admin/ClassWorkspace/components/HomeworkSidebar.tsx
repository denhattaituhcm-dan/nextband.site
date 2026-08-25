import React from "react";
import { Badge } from "@/components/ui/badge";
import { HeatmapBar } from "./HeatmapBar";
import { AlertTriangle, Calendar, Clock } from "lucide-react";

export interface HomeworkItemData {
  id: string;
  hwNum: string;
  title: string;
  submittedCount: number;
  waitingReviewCount: number;
  gradedCount: number;
  progressPercent: number;
  deadline?: string | Date | null;
  deadlineSource?: "MANUAL" | "AUTO";
  skills: any[];
  pendingSubmissions: any[];
}

interface HomeworkSidebarProps {
  homeworkList: HomeworkItemData[];
  selectedHwId: string;
  onSelectHw: (id: string) => void;
  totalStudents: number;
}

export const HomeworkSidebar: React.FC<HomeworkSidebarProps> = ({
  homeworkList,
  selectedHwId,
  onSelectHw,
  totalStudents,
}) => {
  const formatShortDate = (d?: string | Date | null) => {
    if (!d) return null;
    const date = new Date(d);
    if (isNaN(date.getTime())) return null;
    return date.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" });
  };

  return (
    <div className="border rounded-xl bg-card p-2 space-y-1.5 max-h-[560px] overflow-y-auto">
      <div className="px-2 py-1.5 text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center justify-between border-b pb-2 mb-1">
        <span>Bài học ({homeworkList.length})</span>
        <span>Chỉ số Workload</span>
      </div>

      {homeworkList.map((hw) => {
        const isSelected = hw.id === selectedHwId;
        const isLowProgress = hw.progressPercent < 30 && totalStudents > 0;
        const formattedDeadline = formatShortDate(hw.deadline);

        return (
          <div
            key={hw.id}
            onClick={() => onSelectHw(hw.id)}
            className={`p-2.5 rounded-lg border cursor-pointer transition-all ${
              isSelected
                ? "border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 font-semibold shadow-sm"
                : "hover:bg-muted/40 border-transparent"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-xs text-slate-900 dark:text-slate-100 truncate max-w-[130px]">
                  {hw.title}
                </span>
                {isLowProgress && (
                  <span title="Tỷ lệ nộp bài thấp">
                    <AlertTriangle className="h-3.5 w-3.5 text-rose-500" />
                  </span>
                )}
              </div>

              {/* Workload Metric: Submitted & Waiting Review */}
              <div className="flex items-center gap-1 text-[11px]">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {hw.submittedCount}/{totalStudents} Nộp
                </span>
                {hw.waitingReviewCount > 0 && (
                  <Badge className="bg-amber-500 text-white text-[10px] px-1 py-0 font-mono">
                    {hw.waitingReviewCount} Chờ
                  </Badge>
                )}
              </div>
            </div>

            {/* Deadline & Provenance Row */}
            <div className="flex items-center justify-between text-[10px] text-muted-foreground mt-1.5">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3 text-slate-400" />
                <span>Hạn: {formattedDeadline || "Tự động"}</span>
              </span>
              {hw.deadlineSource === "MANUAL" ? (
                <span className="text-[9px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-100/60 dark:bg-emerald-950/60 px-1 py-0.2 rounded border border-emerald-200 dark:border-emerald-800">
                  Thủ công
                </span>
              ) : (
                <span className="text-[9px] text-slate-400">
                  Tự động
                </span>
              )}
            </div>

            {/* Heatmap Bar */}
            <div className="mt-2">
              <HeatmapBar percent={hw.progressPercent} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
