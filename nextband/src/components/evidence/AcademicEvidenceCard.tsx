import React, { useEffect, useState } from "react";
import { submissionsApi } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sparkles,
  Activity,
  ChevronRight,
  Flame,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface StudentAcademicEvidenceStats {
  studentId: string;
  totalDetected: number;
  totalRevisionRequested: number;
  totalCorrected: number;
  totalRetained: number;
  totalRecurred: number;
  recoveryRate: number;
  retentionRate: number;
  episodes: {
    retained: any[];
    monitoring: any[];
    recurred: any[];
    pendingRevision: any[];
    observed: any[];
  };
}

interface AcademicEvidenceCardProps {
  studentId: string;
  studentName?: string;
  variant?: "teacher-compact" | "student-dashboard";
  className?: string;
}

export const AcademicEvidenceCard: React.FC<AcademicEvidenceCardProps> = ({
  studentId,
  studentName,
  variant = "student-dashboard",
  className,
}) => {
  const [data, setData] = useState<StudentAcademicEvidenceStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"retained" | "monitoring" | "recurred" | "pending">("retained");

  useEffect(() => {
    let isMounted = true;
    if (!studentId) return;

    setLoading(true);
    submissionsApi
      .getStudentAcademicEvidence(studentId)
      .then((res) => {
        if (isMounted && res) {
          setData(res);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [studentId]);

  if (loading) {
    if (variant === "teacher-compact") {
      return (
        <div className="flex items-center gap-2 p-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-500 animate-pulse">
          <Activity className="h-3.5 w-3.5 animate-spin text-teal-600" />
          <span>Đang tải tiền sử lỗi học viên...</span>
        </div>
      );
    }
    return (
      <Card className="border border-slate-200 rounded-2xl p-5 bg-white animate-pulse">
        <div className="h-5 bg-slate-100 rounded w-1/3 mb-4" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="h-16 bg-slate-100 rounded-xl" />
          <div className="h-16 bg-slate-100 rounded-xl" />
          <div className="h-16 bg-slate-100 rounded-xl" />
          <div className="h-16 bg-slate-100 rounded-xl" />
        </div>
      </Card>
    );
  }

  // If no episodes at all
  if (!data || data.totalDetected === 0) {
    if (variant === "teacher-compact") {
      return null;
    }
    return (
      <Card className={cn("border border-dashed border-slate-200 rounded-2xl p-6 bg-slate-50/50 text-center", className)}>
        <Sparkles className="h-8 w-8 text-teal-600 mx-auto mb-2 opacity-60" />
        <p className="text-xs font-semibold text-slate-700">Chưa ghi nhận tiền sử lỗi sai cần can thiệp</p>
        <p className="text-[11px] text-slate-500 mt-1">
          Hệ thống sẽ tự động theo dõi chu trình Sửa lỗi ➔ Duy trì khi giáo viên chấm bài tập.
        </p>
      </Card>
    );
  }

  const { retained = [], monitoring = [], recurred = [], pendingRevision = [] } = data.episodes || {};

  // ─────────────────────────────────────────────────────────────
  // VARIANT 1: TEACHER COMPACT BAR (For Teacher Workspace Header)
  // ─────────────────────────────────────────────────────────────
  if (variant === "teacher-compact") {
    return (
      <div className={cn("p-2.5 px-3.5 bg-white border border-slate-200 shadow-2xs rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs", className)}>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-slate-900 flex items-center gap-1.5 shrink-0">
            <Activity className="h-3.5 w-3.5 text-teal-600" />
            <span>Tiền sử lỗi {studentName ? `(${studentName})` : ""}:</span>
          </span>

          {/* Retained badges */}
          {retained.slice(0, 2).map((ep: any) => (
            <Badge
              key={ep.id}
              variant="outline"
              className="bg-emerald-50 text-emerald-800 border-emerald-300 text-[10px] font-semibold flex items-center gap-1"
              title="Đã duy trì sạch lỗi qua nhiều bài tập độc lập"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
              <span>🟢 {ep.errorTag}</span>
              <span className="text-[9px] opacity-75">({ep.cleanStreakCount} bài sạch)</span>
            </Badge>
          ))}

          {/* Recurred warnings */}
          {recurred.slice(0, 2).map((ep: any) => (
            <Badge
              key={ep.id}
              variant="outline"
              className="bg-rose-50 text-rose-800 border-rose-300 text-[10px] font-bold flex items-center gap-1 animate-pulse"
              title="Lỗi từng sửa nhưng đã tái phát ở bài mới"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-rose-600" />
              <span>🔴 {ep.errorTag}</span>
              <span className="text-[9px] opacity-75">(Tái phạm {ep.recurrenceCount}x)</span>
            </Badge>
          ))}

          {/* Monitoring badges */}
          {monitoring.slice(0, 1).map((ep: any) => (
            <Badge
              key={ep.id}
              variant="outline"
              className="bg-amber-50 text-amber-800 border-amber-300 text-[10px] font-medium flex items-center gap-1"
              title="Đang theo dõi sạch lỗi"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              <span>🟡 {ep.errorTag}</span>
            </Badge>
          ))}

          {/* Pending revision badges */}
          {pendingRevision.slice(0, 1).map((ep: any) => (
            <Badge
              key={ep.id}
              variant="outline"
              className="bg-slate-100 text-slate-700 border-slate-300 text-[10px] font-medium"
              title="Đang yêu cầu sửa bài"
            >
              <span>⚪ Chờ sửa: {ep.errorTag}</span>
            </Badge>
          ))}
        </div>

        {/* Mini KPI indicators */}
        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600 shrink-0">
          <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
            Recovery: {data.recoveryRate}%
          </span>
          <span className="text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
            Retention: {data.retentionRate}%
          </span>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // VARIANT 2: STUDENT DASHBOARD SHOWCASE (For Student Analytics)
  // ─────────────────────────────────────────────────────────────
  const currentTabList =
    activeTab === "retained"
      ? retained
      : activeTab === "monitoring"
      ? monitoring
      : activeTab === "recurred"
      ? recurred
      : pendingRevision;

  return (
    <Card className={cn("border border-slate-200 rounded-2xl bg-white shadow-2xs overflow-hidden", className)}>
      <CardHeader className="p-5 border-b border-slate-100 bg-gradient-to-r from-teal-50/50 to-emerald-50/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <CardTitle className="text-sm font-black flex items-center gap-2 text-slate-900">
              <ShieldCheck className="h-4 w-4 text-teal-600" />
              <span>Hồ Sơ Năng Lực Sửa Lỗi & Độ Bền Kiến Thức (Academic Evidence)</span>
            </CardTitle>
            <p className="text-xs text-slate-600">
              Đo lường năng lực thực chất theo chu trình: <strong>Detected ➔ Corrected ➔ Retained</strong>
            </p>
          </div>

          {/* Academic Evidence KPI Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="p-2 px-3 rounded-xl bg-white border border-emerald-200 shadow-2xs text-center">
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block">
                Tỷ lệ Phục hồi (Recovery)
              </span>
              <span className="text-sm font-black text-emerald-700">{data.recoveryRate}%</span>
            </div>
            <div className="p-2 px-3 rounded-xl bg-white border border-teal-200 shadow-2xs text-center">
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block">
                Tỷ lệ Duy trì (Retention)
              </span>
              <span className="text-sm font-black text-teal-700">{data.retentionRate}%</span>
            </div>
          </div>
        </div>

        {/* Tab Selection Filter */}
        <div className="flex items-center gap-1.5 pt-3 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab("retained")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shrink-0",
              activeTab === "retained"
                ? "bg-emerald-600 text-white shadow-2xs"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            )}
          >
            <span>🟢 Đã duy trì (Retained)</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 font-black">
              {retained.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("monitoring")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shrink-0",
              activeTab === "monitoring"
                ? "bg-amber-600 text-white shadow-2xs"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            )}
          >
            <span>🟡 Đang theo dõi (Monitoring)</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 font-black">
              {monitoring.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("recurred")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shrink-0",
              activeTab === "recurred"
                ? "bg-rose-600 text-white shadow-2xs"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            )}
          >
            <span>🔴 Cần củng cố (Recurred)</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 font-black">
              {recurred.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("pending")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shrink-0",
              activeTab === "pending"
                ? "bg-slate-700 text-white shadow-2xs"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            )}
          >
            <span>⚪ Chờ làm lại bài sửa</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 font-black">
              {pendingRevision.length}
            </span>
          </button>
        </div>
      </CardHeader>

      <CardContent className="p-5">
        {currentTabList.length === 0 ? (
          <div className="text-center py-6 text-slate-500 text-xs">
            Không có lỗi nào ở trạng thái này.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentTabList.map((ep: any) => {
              const isRetained = ep.status === "RETAINED";
              const isRecurred = ep.status === "RECURRED";
              const isMonitoring = ep.status === "MONITORING" || ep.status === "CORRECTED";

              return (
                <div
                  key={ep.id}
                  className={cn(
                    "p-3.5 rounded-xl border text-xs space-y-2 transition-all shadow-2xs",
                    isRetained
                      ? "bg-emerald-50/40 border-emerald-200"
                      : isRecurred
                      ? "bg-rose-50/40 border-rose-200"
                      : isMonitoring
                      ? "bg-amber-50/40 border-amber-200"
                      : "bg-slate-50/50 border-slate-200"
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-900 text-sm">{ep.errorTag}</span>
                      <Badge variant="outline" className="text-[10px] font-semibold bg-white border-slate-300">
                        {ep.category}
                      </Badge>
                    </div>

                    {isRetained && (
                      <Badge className="bg-emerald-600 text-white text-[10px] font-black gap-1">
                        <CheckCircle2 className="h-3 w-3" /> Đã duy trì 🎉
                      </Badge>
                    )}
                    {isRecurred && (
                      <Badge className="bg-rose-600 text-white text-[10px] font-black gap-1">
                        <AlertTriangle className="h-3 w-3" /> Tái phát {ep.recurrenceCount}x
                      </Badge>
                    )}
                    {isMonitoring && (
                      <Badge className="bg-amber-500 text-white text-[10px] font-bold gap-1">
                        <Clock className="h-3 w-3" /> Sạch {ep.cleanStreakCount || 1}/2 bài
                      </Badge>
                    )}
                  </div>

                  {/* Context sentence if present */}
                  {ep.initialSentence && (
                    <div className="text-slate-600 italic bg-white/80 p-2 rounded-lg border border-slate-200/80 text-[11px] leading-relaxed">
                      "{ep.initialSentence}"
                    </div>
                  )}

                  {/* Teacher Feedback / Guidance */}
                  {ep.teacherFeedback && (
                    <p className="text-slate-700 text-[11px]">
                      <strong>Nhận xét:</strong> {ep.teacherFeedback}
                    </p>
                  )}

                  {/* Status Note */}
                  <div className="text-[10px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-200/60">
                    <span>Kỹ năng: {ep.skill}</span>
                    {isRetained && <span>Đã hình thành phản xạ tự nhiên</span>}
                    {isRecurred && <span className="text-rose-600 font-bold">Cần giáo viên củng cố lại</span>}
                    {isMonitoring && <span>Cần thêm {Math.max(0, 2 - (ep.cleanStreakCount || 0))} bài sạch để đạt Retained</span>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
