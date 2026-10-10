import { BookOpen, Award, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WorkbookStatusBadge } from "@/components/admin/WorkbookStatusBadge";
import { AcademicInsightWidget, type PedagogicalProfileData } from "@/components/admin/AcademicInsightWidget";
import { getSkillBadgeConfig } from "@/lib/examSkillHelper";
import type { WorkbookItem } from "@/pages/admin/TeacherWorkspace";

export interface GroupedWorkbookLesson {
  lessonNumber: number;
  lessonTitle: string;
  items: WorkbookItem[];
}

export interface TeacherWorkbookColumnProps {
  currentStudent: any | null;
  groupedWorkbook: GroupedWorkbookLesson[];
  selectedHomeworkId: string;
  slaStats: {
    overdueCount: number;
    approachingCount: number;
    onTrackCount: number;
    totalPending: number;
  };
  workbookSummary: {
    graded: number;
    pending: number;
    inProgress: number;
    overdue: number;
    completed: number;
    totalAssigned: number;
  };
  pedagogicalProfile: PedagogicalProfileData | null;
  reopenTargetId: string | null;
  reopenDate: string;
  onSelectHomework: (id: string) => void;
  onOpenReportModal: () => void;
  onShareParentZalo: () => void;
  onSetReopenTarget: (id: string | null) => void;
  onReopenDateChange: (date: string) => void;
  onConfirmReopen: (item: WorkbookItem) => void;
}

export function TeacherWorkbookColumn({
  currentStudent,
  groupedWorkbook,
  selectedHomeworkId,
  slaStats,
  workbookSummary,
  pedagogicalProfile,
  reopenTargetId,
  reopenDate,
  onSelectHomework,
  onOpenReportModal,
  onShareParentZalo,
  onSetReopenTarget,
  onReopenDateChange,
  onConfirmReopen,
}: TeacherWorkbookColumnProps) {
  return (
    <div className="w-1/3 min-w-[320px] max-w-[420px] shrink-0 bg-slate-50/30 border-r border-slate-200 flex flex-col justify-between overflow-hidden">
      <div className="p-3.5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between shrink-0">
        <div>
          <span className="text-xs font-bold text-slate-800 tracking-tight flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5 text-blue-600" />
            Sổ Bài Tập {currentStudent ? `— ${currentStudent.fullName}` : ""}
          </span>
          <span className="text-[10px] text-slate-500">
            {currentStudent ? "Danh sách bài tập được giao" : "Chọn học viên để xem bài"}
          </span>
        </div>

        {/* Status counter indicators */}
        <div className="flex items-center gap-1.5 text-[10px] font-mono">
          {slaStats.totalPending > 0 ? (
            <>
              {slaStats.overdueCount > 0 && (
                <span className="px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 font-bold" title="Quá hạn SLA 7 ngày">
                  🔴 {slaStats.overdueCount} quá hạn
                </span>
              )}
              {slaStats.approachingCount > 0 && (
                <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-300 font-bold" title="Sắp đến hạn SLA (≤ 2 ngày)">
                  ⚠️ {slaStats.approachingCount} sắp hạn
                </span>
              )}
              {slaStats.onTrackCount > 0 && (
                <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium" title="Trong hạn SLA (> 2 ngày)">
                  ⏱ {slaStats.onTrackCount} trong hạn
                </span>
              )}
            </>
          ) : (
            <>
              <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold" title="Đã chấm">
                🟢 {workbookSummary.graded}
              </span>
              <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200" title="Chưa làm">
                ⚪ {workbookSummary.inProgress}
              </span>
            </>
          )}
          {currentStudent && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={onOpenReportModal}
                className="h-6 text-[10px] font-bold px-2 ml-1 text-blue-700 border-blue-200 hover:bg-blue-50 gap-1 shadow-2xs"
              >
                <Award className="h-3 w-3" />
                Báo cáo
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={onShareParentZalo}
                className="h-6 text-[10px] font-bold px-2 text-emerald-700 border-emerald-200 hover:bg-emerald-50 gap-1 shadow-2xs"
                title="Tự động tạo tin nhắn, sao chép vào Clipboard và mở Zalo Phụ huynh"
              >
                <Share2 className="h-3 w-3 text-emerald-600" />
                Gửi Zalo
              </Button>
            </>
          )}
        </div>
      </div>

      {/* List Buổi học & Bài tập trong Sổ */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {/* 💡 ACADEMIC INSIGHT (PHASE 4: DỮ LIỆU SƯ PHẠM THUẦN TÚY) */}
        {currentStudent && pedagogicalProfile && (
          <AcademicInsightWidget profile={pedagogicalProfile} />
        )}

        {!currentStudent ? (
          <div className="p-8 text-center text-xs text-slate-400">
            Chọn học viên bên trái để xem sổ bài tập.
          </div>
        ) : groupedWorkbook.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">
            Không có bài tập nào được giao cho học viên này.
          </div>
        ) : (
          groupedWorkbook.map((group) => {
            const firstSkill = group.items[0]?.skill;
            const allSameSkill = group.items.length > 0 && group.items.every((it) => it.skill === firstSkill);
            const groupLabel = allSameSkill
              ? `BUỔI ${group.lessonNumber}: KỸ NĂNG ${getSkillBadgeConfig(firstSkill || "objective").shortLabel}`
              : `BUỔI ${group.lessonNumber}: TỔNG HỢP (${group.items.length} BÀI TẬP)`;

            return (
              <div key={group.lessonNumber} className="space-y-1.5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-200/60 px-2.5 py-1 rounded-md">
                  📖 {groupLabel}
                </div>

                <div className="space-y-1">
                  {group.items.map((item) => {
                    const isSelected = item.id === selectedHomeworkId;
                    const isReopenOpen = reopenTargetId === item.id;
                    const itemSkillConfig = getSkillBadgeConfig(item.skill || "objective");

                    return (
                      <div
                        key={item.id}
                        onClick={() => onSelectHomework(item.id)}
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer space-y-1.5 ${
                          isSelected
                            ? "bg-white border-blue-500 shadow-sm ring-1 ring-blue-500/20"
                            : "bg-white/80 border-slate-200/80 hover:bg-white hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1.5">
                          <div className="flex items-center gap-1.5 min-w-0 flex-1">
                            <Badge
                              variant="outline"
                              className={`text-[9px] px-1.5 py-0 h-4 font-bold shrink-0 ${itemSkillConfig.badgeClass}`}
                            >
                              {itemSkillConfig.shortLabel}
                            </Badge>
                            <span className="text-xs font-semibold text-slate-800 truncate">
                              {item.title}
                            </span>
                          </div>
                          <WorkbookStatusBadge item={item} />
                        </div>

                        {/* Dòng Quá hạn -> nút Gia hạn mở Inline */}
                        {item.isOverdue && item.status !== "graded" && item.status !== "submitted" && (
                          <div className="text-[10px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-100">
                            <span>Hạn: {item.dueDate}</span>
                            {!isReopenOpen ? (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onSetReopenTarget(item.id);
                                }}
                                className="text-blue-600 font-bold hover:underline"
                              >
                                [Gia hạn]
                              </button>
                            ) : (
                              <div
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-1 bg-slate-50 p-1 rounded border border-slate-200"
                              >
                                <Input
                                  type="date"
                                  value={reopenDate}
                                  onChange={(e) => onReopenDateChange(e.target.value)}
                                  className="h-6 text-[9px] w-24 bg-white"
                                />
                                <Button
                                  size="sm"
                                  onClick={() => onConfirmReopen(item)}
                                  className="h-6 text-[9px] px-2 bg-slate-900 text-white"
                                >
                                  Lưu
                                </Button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
