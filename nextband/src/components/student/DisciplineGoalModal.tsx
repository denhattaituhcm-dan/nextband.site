import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Flame,
  Award,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Target,
  ArrowRight,
  Zap,
} from "lucide-react";
import {
  DISCIPLINE_TIERS,
  DisciplineTierKey,
  saveDisciplineGoal,
} from "@/lib/disciplineScholarshipHelper";
import { toast } from "sonner";

interface DisciplineGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentGoal: DisciplineTierKey;
  onGoalChange: (newGoal: DisciplineTierKey) => void;
  studentId?: string;
  classId?: string;
}

export function DisciplineGoalModal({
  isOpen,
  onClose,
  currentGoal,
  onGoalChange,
  studentId,
  classId,
}: DisciplineGoalModalProps) {
  const [selectedTier, setSelectedTier] = useState<DisciplineTierKey>(currentGoal);
  const [isPledged, setIsPledged] = useState(false);

  const handleSave = () => {
    saveDisciplineGoal(selectedTier, studentId, classId);
    onGoalChange(selectedTier);
    setIsPledged(true);
    toast.success(`Đã khóa mục tiêu: ${DISCIPLINE_TIERS[selectedTier].levelName}!`);
    setTimeout(() => {
      setIsPledged(false);
      onClose();
    }, 500);
  };

  const tierKeys: DisciplineTierKey[] = ["TIER_1", "TIER_2", "TIER_3", "TIER_4"];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl rounded-3xl p-6 sm:p-8 bg-white border border-slate-200/90 shadow-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-2 text-center pb-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold font-mono mx-auto">
            <Target className="w-3.5 h-3.5 text-rose-600" />
            <span>CAM KẾT HỌC BỔNG KỶ LUẬT ARIS</span>
          </div>

          <DialogTitle className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Thiết Lập Mục Tiêu Khóa Học
          </DialogTitle>

          <DialogDescription className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Học bổng Kỷ Luật được ghi nhận tự động trên hệ thống NextBand và khấu trừ trực tiếp vào học phí khóa kế tiếp của bạn.
          </DialogDescription>
        </DialogHeader>

        {/* 4 Selectable Tier Cards */}
        <div className="space-y-3 py-2">
          {tierKeys.map((key) => {
            const tier = DISCIPLINE_TIERS[key];
            const isSelected = selectedTier === key;
            const isTopTier = key === "TIER_4";

            return (
              <div
                key={key}
                onClick={() => setSelectedTier(key)}
                className={`relative p-4 sm:p-4.5 rounded-2xl border-2 transition-all cursor-pointer select-none ${
                  isSelected
                    ? isTopTier
                      ? "border-amber-500 bg-amber-50/50 shadow-md shadow-amber-500/10 ring-2 ring-amber-400/20"
                      : "border-slate-900 bg-slate-50 shadow-md ring-2 ring-slate-900/10"
                    : "border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50/40"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-black shrink-0 shadow-2xs ${
                        isSelected
                          ? isTopTier
                            ? "bg-amber-400 text-slate-950"
                            : "bg-slate-900 text-white"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {tier.icon}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-extrabold text-slate-900">
                          {tier.levelName}
                        </h4>
                        {isTopTier && (
                          <Badge className="bg-amber-400 text-slate-950 hover:bg-amber-400 border-0 text-[10px] font-black px-2 py-0">
                            Vinh Danh Top 1
                          </Badge>
                        )}
                        {key === "TIER_3" && (
                          <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100 border-0 text-[10px] font-bold px-2 py-0">
                            Khuyên Dùng
                          </Badge>
                        )}
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {tier.description}
                      </p>
                    </div>
                  </div>

                  {/* Reward Badge */}
                  <div className="text-right shrink-0">
                    <span
                      className={`block font-black text-sm sm:text-base ${
                        isSelected ? "text-rose-600" : "text-slate-700"
                      }`}
                    >
                      {tier.rewardFormatted}
                    </span>
                    <span className="text-[10.5px] font-bold text-slate-400 block font-mono">
                      Khấu trừ
                    </span>
                  </div>
                </div>

                {/* Selection Indicator Dot */}
                <div className="absolute top-4 right-4 sm:hidden">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      isSelected
                        ? "border-rose-600 bg-rose-600 text-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Commitment Statement */}
        <div className="rounded-2xl bg-slate-100/80 border border-slate-200 p-3.5 text-xs text-slate-700 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-slate-900">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Cam Kết Hành Động Tự Thân:</span>
          </div>
          <p className="text-[11.5px] text-slate-600 leading-relaxed pl-5">
            &ldquo;Tôi cam kết duy trì nỗ lực làm bài tập đúng hạn để bứt phá band điểm thực chất và mở khóa học bổng xứng đáng.&rdquo;
          </p>
        </div>

        <DialogFooter className="pt-2 flex flex-col-reverse sm:flex-row gap-2">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            className="rounded-xl text-xs font-bold text-slate-600 h-10"
          >
            Đóng
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            className="rounded-xl text-xs font-extrabold bg-slate-900 hover:bg-slate-800 text-white shadow-md h-10 px-6 gap-2"
          >
            <span>Ký Cam Kết &amp; Khóa Mục Tiêu</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
