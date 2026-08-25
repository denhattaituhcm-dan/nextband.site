import React from "react";

export type HomeworkStatus = "done" | "late" | "missed" | "pending";

export interface HomeworkStripItem {
  hwNumber: number;
  title?: string;
  status: HomeworkStatus;
  score?: number | null;
  examId?: string;
}

interface HomeworkProgressStripProps {
  totalHomeworks?: number;
  completedCount?: number;
  items?: HomeworkStripItem[];
  onSelectHomework?: (hwNumber: number, item?: HomeworkStripItem) => void;
}

export const HomeworkProgressStrip: React.FC<HomeworkProgressStripProps> = ({
  totalHomeworks = 0,
  completedCount = 0,
  items: customItems,
  onSelectHomework,
}) => {
  const items: HomeworkStripItem[] = customItems && customItems.length > 0
    ? customItems
    : Array.from({ length: totalHomeworks }, (_, i) => {
        const hwNumber = i + 1;
        const status: HomeworkStatus = hwNumber <= completedCount ? "done" : "pending";
        return { hwNumber, status };
      });

  const effectiveTotal = items.length > 0 ? items.length : totalHomeworks;

  const getStatusSymbol = (status: HomeworkStatus) => {
    switch (status) {
      case "done":
        return { icon: "✓", bg: "bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300" };
      case "late":
        return { icon: "⏰", bg: "bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-950 dark:text-amber-300" };
      case "missed":
        return { icon: "❌", bg: "bg-rose-100 text-rose-700 border-rose-300 dark:bg-rose-950 dark:text-rose-300" };
      default:
        return { icon: "○", bg: "bg-muted text-muted-foreground border-slate-200" };
    }
  };

  if (effectiveTotal === 0) {
    return (
      <div className="p-3 rounded-lg border bg-muted/10 text-center text-xs text-muted-foreground">
        Lớp học chưa có bài tập được xuất bản.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
        <span>Tiến độ {effectiveTotal} bài tập (Click ô để xem bài)</span>
        <span className="flex items-center gap-3">
          <span className="flex items-center gap-1"><span className="text-emerald-600 font-bold">✓</span> Đã làm</span>
          <span className="flex items-center gap-1">⏰ Trễ</span>
          <span className="flex items-center gap-1">❌ Bỏ bài</span>
          <span className="flex items-center gap-1">○ Chưa học</span>
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5 p-3 rounded-lg border bg-muted/20">
        {items.map((item) => {
          const { icon, bg } = getStatusSymbol(item.status);
          return (
            <button
              key={item.hwNumber}
              onClick={() => onSelectHomework?.(item.hwNumber, item)}
              title={item.title || `Homework ${item.hwNumber}`}
              className={`h-7 w-7 rounded border text-xs font-semibold flex items-center justify-center transition-transform hover:scale-110 focus:outline-none focus:ring-1 focus:ring-emerald-500 ${bg}`}
            >
              {icon}
            </button>
          );
        })}
      </div>
    </div>
  );
};
