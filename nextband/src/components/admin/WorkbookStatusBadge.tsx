import { Badge } from "@/components/ui/badge";
import { calculateGradingSla } from "@/lib/gradingSla";
import type { ExamSkillType } from "@/lib/examSkillHelper";

export interface WorkbookItemStatusBadgeProps {
  item: {
    status: "unsubmitted" | "in_progress" | "submitted" | "graded" | "needs_revision";
    isOverdue?: boolean;
    skill?: ExamSkillType;
    isAutoGraded?: boolean;
    objectiveScore?: number;
    score?: number;
    bandScore?: number;
    submittedAt?: string;
    submissionTiming?: {
      isLate: boolean;
      lateDays: number;
    };
    answers?: Array<{
      score?: number | null;
      [key: string]: any;
    }>;
  };
}

export function WorkbookStatusBadge({ item }: WorkbookItemStatusBadgeProps) {
  if (item.isOverdue && item.status !== "graded" && item.status !== "submitted") {
    return (
      <Badge variant="outline" className="bg-slate-900 text-white border-slate-900 text-[10px]">
        ⚫ Quá hạn
      </Badge>
    );
  }

  const isManual = item.skill === "speaking" || item.skill === "writing";
  const totalQ = item.answers?.length || 0;
  const correctQ = item.objectiveScore ?? item.score ?? item.answers?.filter((a) => a.score && a.score > 0).length ?? 0;

  switch (item.status) {
    case "graded":
      if (!isManual || item.isAutoGraded) {
        return (
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px]">
            🟢 {totalQ > 0 ? `${correctQ}/${totalQ} câu` : "Đã chấm"} {item.submissionTiming?.isLate ? `(Trễ ${item.submissionTiming.lateDays}d)` : ""}
          </Badge>
        );
      }
      return (
        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px]">
          🟢 {item.bandScore != null || item.score != null ? `Band ${item.bandScore ?? item.score}` : "Đã chấm"} {item.submissionTiming?.isLate ? `(Trễ ${item.submissionTiming.lateDays}d)` : ""}
        </Badge>
      );
    case "submitted": {
      if (!isManual || item.isAutoGraded) {
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-[10px]">
            🔵 {totalQ > 0 ? `${correctQ}/${totalQ} câu` : "Đã nộp"}
          </Badge>
        );
      }
      const sla = calculateGradingSla(item.submittedAt, null, "submitted");
      let badgeStyle = "bg-blue-50 text-blue-700 border-blue-200";
      if (sla.status === "OVERDUE") {
        badgeStyle = "bg-rose-50 text-rose-700 border-rose-200 font-bold";
      } else if (sla.status === "APPROACHING") {
        badgeStyle = "bg-amber-50 text-amber-800 border-amber-300 font-bold";
      }
      return (
        <Badge variant="outline" className={`text-[10px] ${badgeStyle}`} title={`Nộp: ${sla.formattedSubmitted} • Hạn SLA: ${sla.formattedDeadline}`}>
          {sla.badgeText}
        </Badge>
      );
    }
    case "in_progress":
      return (
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-[10px]">
          🟡 Đang làm
        </Badge>
      );
    case "needs_revision":
      return (
        <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200 text-[10px]">
          🔴 Cần sửa
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200 text-[10px]">
          ⚪ Chưa làm
        </Badge>
      );
  }
}
