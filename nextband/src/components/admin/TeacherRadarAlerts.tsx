import { ShieldAlert, TrendingDown, TrendingUp, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { RadarData, AtRiskStudent } from "@/lib/api";

export interface TeacherRadarAlertsProps {
  radarData: RadarData | null | undefined;
  interveningStudentId: string | null;
  onIntervene: (student: AtRiskStudent) => void;
}

export function TeacherRadarAlerts({
  radarData,
  interveningStudentId,
  onIntervene,
}: TeacherRadarAlertsProps) {
  if (!radarData || radarData.watchCount + radarData.atRiskCount + radarData.criticalCount <= 0) {
    return null;
  }

  return (
    <div className="p-2.5 bg-amber-50/70 border-b border-amber-200/60 shrink-0">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <ShieldAlert className="h-3.5 w-3.5 text-amber-700" />
          <span className="text-[11px] font-bold text-amber-900 tracking-tight">
            {radarData.criticalCount + radarData.atRiskCount + radarData.watchCount} học sinh cần chú ý
          </span>
        </div>
        <div className="flex items-center gap-1 text-[9px] font-semibold">
          {radarData.criticalCount > 0 && (
            <span className="px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 border border-rose-200">
              {radarData.criticalCount} Nguy cấp
            </span>
          )}
          {radarData.atRiskCount > 0 && (
            <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 border border-amber-200">
              {radarData.atRiskCount} Rủi ro
            </span>
          )}
          {radarData.watchCount > 0 && (
            <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
              {radarData.watchCount} Theo dõi
            </span>
          )}
        </div>
      </div>

      <div className="space-y-1 max-h-[140px] overflow-y-auto pr-1">
        {radarData.students.map((st) => {
          const isCritical = st.riskLevel === "CRITICAL";
          const isAtRisk = st.riskLevel === "AT_RISK";
          const isWatch = st.riskLevel === "WATCH";

          return (
            <div
              key={st.studentId}
              className={`p-1.5 rounded-lg border text-[11px] flex items-center justify-between transition-all ${
                isCritical
                  ? "bg-rose-50/80 border-rose-200 text-rose-900"
                  : isAtRisk
                  ? "bg-amber-50/80 border-amber-200 text-amber-900"
                  : "bg-slate-50 border-slate-200 text-slate-800"
              }`}
            >
              <div className="min-w-0 flex-1 mr-2">
                <div className="flex items-center gap-1 font-semibold truncate">
                  <span className="truncate">{st.studentName}</span>
                  {st.trajectory === "DECLINING" && (
                    <span title="Xu hướng giảm >=10pp" className="inline-flex items-center shrink-0">
                      <TrendingDown className="h-3 w-3 text-rose-600" />
                    </span>
                  )}
                  {st.trajectory === "RISING" && (
                    <span title="Xu hướng tăng >=10pp" className="inline-flex items-center shrink-0">
                      <TrendingUp className="h-3 w-3 text-emerald-600" />
                    </span>
                  )}
                </div>
                <div className="text-[9.5px] text-slate-500 truncate flex items-center gap-1">
                  <span>Thiếu {st.openTaskCount} bài</span>
                  <span>•</span>
                  <span>Cần +{st.requiredAdditionalTasks} bài</span>
                  <span>•</span>
                  <span>Học bổng: {st.currentScholarshipTier}</span>
                </div>
              </div>

              {/* Can thiệp chỉ nhắc khi CRITICAL hoặc AT_RISK; WATCH chỉ awareness */}
              {(isCritical || isAtRisk) && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onIntervene(st)}
                  disabled={interveningStudentId === st.studentId}
                  className={`h-6 text-[10px] px-2 shrink-0 font-medium ${
                    isCritical
                      ? "bg-rose-600 hover:bg-rose-700 text-white border-rose-600"
                      : "bg-amber-600 hover:bg-amber-700 text-white border-amber-600"
                  }`}
                >
                  <MessageSquare className="h-3 w-3 mr-1" />
                  Nhắc Zalo
                </Button>
              )}
              {isWatch && (
                <span className="text-[9px] text-slate-400 font-medium px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200">
                  Theo dõi
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
