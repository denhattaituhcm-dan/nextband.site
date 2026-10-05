import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  Clock,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Calendar,
  Flame,
  ListTodo,
  Sparkles,
} from "lucide-react";
import { ActionQueueItem, CanonicalVisualStatus } from "@/lib/homeworkStatusHelper";

export type MissionItem = ActionQueueItem;

interface TodayMissionCardProps {
  actionQueue: MissionItem[];
  classId?: string;
  className?: string;
}

export function TodayMissionCard({
  actionQueue,
  classId,
  className = "Lớp học",
}: TodayMissionCardProps) {
  const navigate = useNavigate();

  // Filter only items that actually require student action
  const actionableItems = React.useMemo(() => {
    return actionQueue.filter((item) =>
      ["REVISION_REQUIRED", "OVERDUE", "IN_PROGRESS", "UPCOMING"].includes(
        item.status
      )
    );
  }, [actionQueue]);

  // Spotlight up to top 3 highest-priority tasks
  const topMissions = React.useMemo(() => {
    return actionableItems.slice(0, 3);
  }, [actionableItems]);

  const handleOpenExam = (item: MissionItem) => {
    const targetExamId = item.examId || item.id;
    if (!targetExamId) return;
    const isRevision = item.status === "REVISION_REQUIRED";
    const targetUrl = isRevision
      ? `/exam/${targetExamId}?isRevision=true`
      : `/exam/${targetExamId}`;
    navigate(targetUrl);
  };

  const getStatusBadge = (status: CanonicalVisualStatus, countdown?: string) => {
    switch (status) {
      case "REVISION_REQUIRED":
        return (
          <Badge
            variant="outline"
            className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30 font-bold text-[11px] gap-1 px-2.5 py-0.5"
          >
            <AlertTriangle className="h-3 w-3 shrink-0 text-amber-600" />
            <span>Cần sửa bài (Attempt 2)</span>
          </Badge>
        );
      case "OVERDUE":
        return (
          <Badge
            variant="outline"
            className="bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/30 font-bold text-[11px] gap-1 px-2.5 py-0.5"
          >
            <Clock className="h-3 w-3 shrink-0 text-rose-600" />
            <span>Quá hạn</span>
          </Badge>
        );
      case "IN_PROGRESS":
        return (
          <Badge
            variant="outline"
            className="bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30 font-bold text-[11px] gap-1 px-2.5 py-0.5"
          >
            <span>Đang làm dở</span>
          </Badge>
        );
      default:
        if (countdown) {
          return (
            <Badge
              variant="outline"
              className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30 font-bold text-[11px] gap-1 px-2.5 py-0.5"
            >
              <Clock className="h-3 w-3 shrink-0 text-amber-600" />
              <span>Hạn nộp: {countdown}</span>
            </Badge>
          );
        }
        return (
          <Badge
            variant="outline"
            className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700 font-semibold text-[11px] px-2.5 py-0.5"
          >
            <span>Bài tập mới</span>
          </Badge>
        );
    }
  };

  return (
    <Card className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs overflow-hidden">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <ListTodo className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                Nhiệm Vụ Cần Làm
              </h2>
              {actionableItems.length > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[11px] font-black bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800">
                  {actionableItems.length} bài
                </span>
              )}
            </div>
            <p className="text-[11px] text-muted-foreground font-medium">
              Ưu tiên theo thứ tự khẩn cấp · {className}
            </p>
          </div>
        </div>

        {classId && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/app/class/${classId}/lessons`)}
            className="h-8 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 self-start sm:self-auto gap-1"
          >
            <span>Xem toàn bộ lộ trình lớp</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>

      {/* Content list */}
      <div className="p-4 sm:p-5">
        {topMissions.length === 0 ? (
          <div className="py-6 px-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-300 flex items-center justify-center shrink-0">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-bold text-emerald-950 dark:text-emerald-200">
                  Bạn đã hoàn thành toàn bộ bài tập hiện tại!
                </p>
                <p className="text-xs text-emerald-800/80 dark:text-emerald-400 font-medium">
                  Không có bài tập nào tồn đọng. Hãy xem lại nhận xét các bài đã nộp hoặc chuẩn bị cho buổi học tiếp theo.
                </p>
              </div>
            </div>

            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate("/app/my-submissions")}
              className="text-xs font-bold border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-100/60 shrink-0"
            >
              Xem kết quả đã nộp
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {topMissions.map((item, idx) => {
              const countdownText =
                typeof item.countdown === "string"
                  ? item.countdown
                  : item.countdown?.text;
              const isRevision = item.status === "REVISION_REQUIRED";
              const isOverdue = item.status === "OVERDUE";
              const isDueSoon = Boolean(countdownText) && !isOverdue && !isRevision;

              return (
                <div
                  key={item.id || idx}
                  className={`group relative rounded-xl p-4 border transition-all duration-200 flex flex-col justify-between gap-3 ${
                    isRevision
                      ? "bg-amber-50/40 dark:bg-amber-950/15 border-amber-200 dark:border-amber-800/60 hover:border-amber-400"
                      : isOverdue
                      ? "bg-rose-50/40 dark:bg-rose-950/15 border-rose-200 dark:border-rose-800/60 hover:border-rose-400"
                      : isDueSoon
                      ? "bg-amber-50/30 dark:bg-amber-950/10 border-amber-200/80 dark:border-amber-800/40 hover:border-amber-300"
                      : "bg-white dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700/60 hover:border-indigo-300 dark:hover:border-indigo-700"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      {getStatusBadge(item.status, countdownText)}
                      <span className="text-[11px] font-bold text-slate-400">
                        #{idx + 1}
                      </span>
                    </div>

                    <h3
                      className="font-bold text-sm text-slate-900 dark:text-slate-100 line-clamp-2 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
                      title={item.title}
                    >
                      {item.title}
                    </h3>

                    {countdownText && !isOverdue && !isRevision && (
                      <p className="text-[11px] text-muted-foreground flex items-center gap-1 font-medium">
                        <Clock className="h-3 w-3 shrink-0 text-slate-400" />
                        <span>Còn lại: {countdownText}</span>
                      </p>
                    )}
                  </div>

                  <Button
                    size="sm"
                    onClick={() => handleOpenExam(item)}
                    className={`w-full h-8 text-xs font-bold rounded-lg gap-1.5 transition-all shadow-2xs ${
                      isRevision
                        ? "bg-amber-600 hover:bg-amber-700 text-white"
                        : isOverdue
                        ? "bg-rose-600 hover:bg-rose-700 text-white"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white"
                    }`}
                  >
                    <span>{isRevision ? "Làm bài sửa ngay" : "Làm bài ngay"}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Card>
  );
}
