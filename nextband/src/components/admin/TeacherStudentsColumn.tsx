import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TeacherRadarAlerts } from "@/components/admin/TeacherRadarAlerts";
import type { RadarData, AtRiskStudent } from "@/lib/api";

export interface ColumnStudent {
  id: string;
  fullName: string;
  avatarUrl?: string;
  totalAssignedCount: number;
  gradedCount: number;
  pendingCount: number;
  hasPending: boolean;
}

export interface TeacherStudentsColumnProps {
  students: ColumnStudent[];
  selectedStudentId: string;
  studentFilter: "all" | "pending";
  radarData: RadarData | null | undefined;
  interveningStudentId: string | null;
  onSelectStudent: (studentId: string) => void;
  onFilterChange: (filter: "all" | "pending") => void;
  onIntervene: (student: AtRiskStudent) => void;
}

export function TeacherStudentsColumn({
  students,
  selectedStudentId,
  studentFilter,
  radarData,
  interveningStudentId,
  onSelectStudent,
  onFilterChange,
  onIntervene,
}: TeacherStudentsColumnProps) {
  return (
    <div className="w-1/4 min-w-[260px] max-w-[320px] shrink-0 bg-white border-r border-slate-200 flex flex-col justify-between overflow-hidden">
      <div className="p-3.5 border-b border-slate-100 space-y-2.5 shrink-0 bg-slate-50/50">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 tracking-tight flex items-center gap-1.5">
            <User className="h-3.5 w-3.5 text-blue-600" />
            Học viên ({students.length})
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => onFilterChange("all")}
              className={`text-[10px] font-medium px-2 py-0.5 rounded-md border transition-all ${
                studentFilter === "all"
                  ? "bg-slate-800 text-white border-slate-800"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => onFilterChange("pending")}
              className={`text-[10px] font-medium px-2 py-0.5 rounded-md border transition-all ${
                studentFilter === "pending"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-blue-600 border-blue-200 hover:bg-blue-50"
              }`}
            >
              Bài chờ 🔴
            </button>
          </div>
        </div>
      </div>

      {/* 🔴 EARLY-WARNING RADAR (Alert fatigue prevention: 'X học sinh cần chú ý') */}
      <TeacherRadarAlerts
        radarData={radarData}
        interveningStudentId={interveningStudentId}
        onIntervene={onIntervene}
      />

      {/* List Học viên */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {students.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-400">Không có học viên phù hợp</div>
        ) : (
          students.map((st) => {
            const isSelected = st.id === selectedStudentId;
            return (
              <div
                key={st.id}
                onClick={() => onSelectStudent(st.id)}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? "bg-blue-50/70 border-blue-200 shadow-xs"
                    : "bg-white border-transparent hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Avatar className="h-8 w-8 rounded-lg border border-slate-200 shrink-0">
                    <AvatarImage src={st.avatarUrl} />
                    <AvatarFallback className="bg-slate-100 text-slate-700 text-xs font-bold">
                      {st.fullName?.slice(0, 2).toUpperCase() || "HV"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{st.fullName}</p>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium mt-0.5">
                      <span>{st.gradedCount + st.pendingCount} / {st.totalAssignedCount} bài</span>
                      {st.pendingCount > 0 && (
                        <span className="text-blue-600 font-bold">• {st.pendingCount} chờ</span>
                      )}
                    </div>
                  </div>
                </div>

                {st.hasPending && (
                  <span className="h-2 w-2 rounded-full bg-rose-500 shrink-0 ring-2 ring-rose-100" />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
