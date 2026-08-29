import React from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Clock,
  RotateCcw,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  BookOpen,
  FileEdit,
} from "lucide-react";
import { routes } from "@/lib/routes";
import { ActionQueueItem } from "@/lib/homeworkStatusHelper";

interface StudentMissionQueueProps {
  missions: ActionQueueItem[];
  enrolledClassId?: string;
}

export function StudentMissionQueue({
  missions,
  enrolledClassId,
}: StudentMissionQueueProps) {
  const navigate = useNavigate();
  const topMissions = missions.slice(0, 3);

  // ─── Zero Pending Missions: "Không có bài quá hạn" ────────────────────
  if (topMissions.length === 0) {
    return (
      <Card className="rounded-2xl border border-emerald-200/80 bg-gradient-to-r from-emerald-50/50 via-white to-emerald-50/30 p-5 md:p-6 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shrink-0 shadow-2xs">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm md:text-base font-bold text-slate-900 flex items-center gap-2">
                Không có bài quá hạn
                <Badge className="bg-emerald-100 text-emerald-800 border-0 text-[10px] font-bold">
                  ✓ Giữ nhịp rất tốt
                </Badge>
              </h2>
              <p className="text-xs text-slate-600 italic">
                “Giữ được nhịp này rất tốt. Kỷ luật đều đặn mới là thứ kéo Band đi lên.” — <strong className="not-italic text-slate-800">Huyền Cơ</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {enrolledClassId && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/app/class/${enrolledClassId}/lessons`)}
                className="text-xs font-semibold h-8 rounded-lg border-slate-200 text-slate-700 hover:bg-slate-50 gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                <span>Kho bài lớp</span>
              </Button>
            )}
          </div>
        </div>
      </Card>
    );
  }

  // ─── Active Mission Queue (Single Point of Focus: Chỉ bài Top 1 nổi bật) ─
  return (
    <Card className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm md:text-base font-bold text-slate-900 flex items-center gap-2">
              Nhiệm Vụ Cần Xử Lý
              <Badge variant="secondary" className="bg-slate-100 text-slate-700 text-[10px] h-4 px-1.5 font-bold">
                {topMissions.length}
              </Badge>
            </h2>
            <p className="text-[11px] text-slate-500">
              Sắp xếp theo thứ tự ưu tiên sư phạm: Cần sửa ➔ Quá hạn ➔ Sắp đến hạn
            </p>
          </div>
        </div>

        {enrolledClassId && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/app/class/${enrolledClassId}/lessons`)}
            className="text-xs text-slate-600 hover:text-slate-900 font-semibold h-8 gap-1"
          >
            Xem tất cả kho bài <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        )}
      </div>

      {/* Grid: Bài Top 1 nổi bật với Solid Button, Bài 2 & 3 dùng Outline Button */}
      <div className="grid gap-3.5 sm:grid-cols-3">
        {topMissions.map((item, index) => {
          const isTopOne = index === 0; // Bài ưu tiên số 1 tuyệt đối
          const isRevision = item.status === "REVISION_REQUIRED";
          const isOverdue = item.status === "OVERDUE";
          const isDueSoon = item.priority === 3;

          return (
            <div
              key={item.id}
              className={`rounded-xl p-4 border transition-all flex flex-col justify-between space-y-3.5 ${
                isTopOne
                  ? isRevision
                    ? "bg-amber-50/40 border-amber-300 ring-1 ring-amber-300/30"
                    : isOverdue
                    ? "bg-rose-50/40 border-rose-300 ring-1 ring-rose-300/30"
                    : "bg-indigo-50/30 border-indigo-200 ring-1 ring-indigo-200/30"
                  : "bg-white border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="space-y-2">
                {/* Status Badge & Countdown */}
                <div className="flex items-center justify-between gap-1">
                  {isRevision ? (
                    <Badge className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold gap-1">
                      <RotateCcw className="w-3 h-3" /> Cần sửa bài
                    </Badge>
                  ) : isOverdue ? (
                    <Badge className="bg-rose-100 text-rose-800 border border-rose-300 text-[10px] font-bold gap-1">
                      <AlertTriangle className="w-3 h-3" /> Quá hạn nộp
                    </Badge>
                  ) : isDueSoon ? (
                    <Badge className="bg-slate-100 text-slate-700 border border-slate-300 text-[10px] font-bold gap-1">
                      <Clock className="w-3 h-3" /> Sắp đến hạn
                    </Badge>
                  ) : (
                    <Badge className="bg-slate-100 text-slate-600 border-0 text-[10px] font-medium">
                      Bài tiếp theo
                    </Badge>
                  )}

                  {item.countdown && (
                    <span className="text-[10px] font-mono text-slate-500 font-medium">
                      {item.countdown.text}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-bold text-xs md:text-sm text-slate-900 line-clamp-2 leading-snug">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-[11px] text-slate-500 line-clamp-1">
                    {item.description}
                  </p>
                )}
              </div>

              {/* Action Button: Top 1 mang Solid Action Color, Top 2/3 mang Neutral Outline */}
              <Button
                size="sm"
                onClick={() => {
                  if (isRevision && item.submission?.id) {
                    navigate(routes.student.submission(item.submission.id));
                  } else {
                    navigate(routes.exam.take(item.examId || item.id));
                  }
                }}
                className={`w-full font-bold text-xs h-8.5 rounded-lg transition-all gap-1.5 ${
                  isTopOne
                    ? isRevision
                      ? "bg-amber-600 hover:bg-amber-700 text-white shadow-xs"
                      : isOverdue
                      ? "bg-rose-600 hover:bg-rose-700 text-white shadow-xs"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs"
                    : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 shadow-none"
                }`}
              >
                {isRevision ? (
                  <>
                    <FileEdit className="w-3.5 h-3.5" />
                    <span>{isTopOne ? "Sửa bài ưu tiên ➔" : "Sửa bài"}</span>
                  </>
                ) : isOverdue ? (
                  <>
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>{isTopOne ? "Nộp bù ưu tiên ➔" : "Nộp bù"}</span>
                  </>
                ) : (
                  <>
                    <span>{isTopOne ? "Bắt đầu làm bài ➔" : "Làm bài"}</span>
                  </>
                )}
              </Button>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
