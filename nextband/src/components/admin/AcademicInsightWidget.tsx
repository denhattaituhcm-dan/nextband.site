import { Lightbulb, ChevronRight, CheckCircle2, HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface PedagogicalSkillItem {
  skillId: string;
  skillName: string;
  macroSkill?: string;
  status?: string;
  statusLabel: string;
  accuracyText: string;
  evidenceCount?: number;
  isStableObservation?: boolean;
  frequentMistake?: string;
  actionTip?: string;
}

export interface PedagogicalProfileData {
  studentId?: string;
  overallStatus: "NEEDS_ATTENTION" | "ON_TRACK" | "INSUFFICIENT_DATA" | string;
  overallSummary: string;
  skillsRequiringAttention: PedagogicalSkillItem[];
  progressingSkills: PedagogicalSkillItem[];
  insufficientDataSkills: PedagogicalSkillItem[];
  [key: string]: unknown;
}

export interface AcademicInsightWidgetProps {
  profile: PedagogicalProfileData;
}

export function AcademicInsightWidget({ profile }: AcademicInsightWidgetProps) {
  return (
    <div className="p-3 bg-gradient-to-br from-indigo-50/70 via-blue-50/50 to-white rounded-xl border border-indigo-100/90 shadow-2xs space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-950">
          <Lightbulb className="h-4 w-4 text-amber-500 fill-amber-400" />
          <span>Academic Insight</span>
          <Badge
            variant="outline"
            className={`text-[9px] px-1.5 py-0 h-4 font-semibold ${
              profile.overallStatus === "NEEDS_ATTENTION"
                ? "bg-rose-50 text-rose-700 border-rose-200"
                : profile.overallStatus === "INSUFFICIENT_DATA"
                ? "bg-slate-100 text-slate-600 border-slate-200"
                : "bg-emerald-50 text-emerald-700 border-emerald-200"
            }`}
          >
            {profile.overallStatus === "NEEDS_ATTENTION"
              ? "Cần can thiệp"
              : profile.overallStatus === "INSUFFICIENT_DATA"
              ? "Chưa đủ dữ liệu"
              : "Đang tiến bộ"}
          </Badge>
        </div>

        <a
          href="/academic-intelligence/evidence"
          target="_blank"
          rel="noreferrer"
          className="text-[10px] text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-0.5"
          title="Mở Evidence Explorer để xem chi tiết từng câu trả lời"
        >
          Xem bằng chứng
          <ChevronRight className="h-3 w-3" />
        </a>
      </div>

      <p className="text-[11px] text-slate-600 leading-snug">
        {profile.overallSummary}
      </p>

      {/* Kỹ năng cần chú ý */}
      {profile.skillsRequiringAttention.length > 0 && (
        <div className="space-y-1.5 pt-1 border-t border-indigo-100/70">
          <span className="text-[10px] font-bold text-rose-800 uppercase tracking-wider block">
            ⚠️ Điểm cần chú ý:
          </span>
          <div className="space-y-1.5">
            {profile.skillsRequiringAttention.map((sk) => (
              <div
                key={sk.skillId}
                className="bg-white/90 p-2 rounded-lg border border-rose-100 text-[11px] space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800">
                    {sk.skillName}
                  </span>
                  <Badge
                    variant="outline"
                    className="text-[9px] bg-rose-50 text-rose-700 border-rose-200 h-4"
                  >
                    {sk.statusLabel}
                  </Badge>
                </div>
                <div className="text-[10px] text-slate-500">{sk.accuracyText}</div>
                {sk.frequentMistake && (
                  <div className="text-[10px] text-amber-900 bg-amber-50/80 p-1.5 rounded">
                    <span className="font-bold">Thói quen sai: </span>
                    {sk.frequentMistake}
                  </div>
                )}
                {sk.actionTip && (
                  <div className="text-[10px] text-blue-900 bg-blue-50/80 p-1.5 rounded">
                    <span className="font-bold">Gợi ý cho giáo viên: </span>
                    {sk.actionTip}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Kỹ năng đang tiến bộ */}
      {profile.progressingSkills.length > 0 && (
        <div className="pt-1 border-t border-indigo-100/70 space-y-1">
          <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
            ✨ Kỹ năng vững / đang tiến bộ:
          </span>
          <div className="flex flex-wrap gap-1">
            {profile.progressingSkills.map((sk) => (
              <span
                key={sk.skillId}
                className="inline-flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 py-0.5 rounded"
              >
                <CheckCircle2 className="h-2.5 w-2.5 text-emerald-600" />
                {sk.skillName} ({sk.statusLabel})
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Chưa đủ dữ liệu */}
      {profile.insufficientDataSkills.length > 0 && (
        <div className="pt-1 text-[10px] text-slate-500 italic flex items-center gap-1">
          <HelpCircle className="h-3 w-3 text-slate-400 shrink-0" />
          <span>
            {profile.insufficientDataSkills.length} kỹ năng khác chưa đủ dữ liệu quan sát (&lt; 3 câu).
          </span>
        </div>
      )}
    </div>
  );
}
