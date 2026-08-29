import React from "react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Check, Sparkles, AlertCircle, Info } from "lucide-react";
import { SpeakingEvidenceTagDTO, SpeakingCriterion } from "../../contracts/speaking-evidence.contract";
import { cn } from "@/lib/utils";

interface SpeakingEvidenceTagGroupProps {
  criterion: SpeakingCriterion;
  tags: SpeakingEvidenceTagDTO[];
  selectedTagIds: Set<string>;
  onToggleTag: (tagId: string, criterion: SpeakingCriterion) => void;
  disabled?: boolean;
}

export function SpeakingEvidenceTagGroup({
  criterion,
  tags,
  selectedTagIds,
  onToggleTag,
  disabled = false,
}: SpeakingEvidenceTagGroupProps) {
  const issues = tags.filter((t) => t.polarity === "ISSUE");
  const strengths = tags.filter((t) => t.polarity === "STRENGTH");

  return (
    <TooltipProvider delayDuration={200}>
      <div className="space-y-2.5 pt-1.5 border-t border-slate-100">
        {/* ISSUES / CẦN LƯU Ý */}
        {issues.length > 0 && (
          <div className="space-y-1.5">
            <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-800">
              <AlertCircle className="w-3 h-3 text-amber-600" />
              <span>Điểm cần lưu ý (Lỗi quan sát):</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {issues.map((tag) => {
                const isSelected = selectedTagIds.has(tag.id);
                return (
                  <Tooltip key={tag.id}>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        disabled={disabled}
                        onClick={() => onToggleTag(tag.id, criterion)}
                        className={cn(
                          "px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer select-none text-left border flex items-center gap-1.5",
                          isSelected
                            ? "bg-amber-500 text-white border-amber-600 shadow-xs font-semibold"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-amber-50 hover:text-amber-900 hover:border-amber-300",
                          disabled && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        <span>{tag.labelVi}</span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs text-xs p-2.5 bg-slate-900 text-slate-50">
                      <p className="font-semibold text-amber-300 mb-1">{tag.labelVi}</p>
                      <p className="text-slate-300 mb-1.5">{tag.descriptionVi}</p>
                      <div className="text-[11px] border-t border-slate-700 pt-1.5 text-slate-300 space-y-1">
                        <p><strong className="text-emerald-400">Gắn khi:</strong> {tag.inclusionRule}</p>
                        <p><strong className="text-rose-400">Không gắn khi:</strong> {tag.exclusionRule}</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </div>
        )}

        {/* STRENGTHS / ĐIỂM SÁNG */}
        {strengths.length > 0 && (
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-800">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span>Điểm sáng quan sát được (Năng lực tích cực):</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {strengths.map((tag) => {
                const isSelected = selectedTagIds.has(tag.id);
                return (
                  <Tooltip key={tag.id}>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        disabled={disabled}
                        onClick={() => onToggleTag(tag.id, criterion)}
                        className={cn(
                          "px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer select-none text-left border flex items-center gap-1.5",
                          isSelected
                            ? "bg-emerald-600 text-white border-emerald-700 shadow-xs font-semibold"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-emerald-50 hover:text-emerald-900 hover:border-emerald-300",
                          disabled && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        <span>{tag.labelVi}</span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs text-xs p-2.5 bg-slate-900 text-slate-50">
                      <p className="font-semibold text-emerald-300 mb-1">{tag.labelVi}</p>
                      <p className="text-slate-300 mb-1.5">{tag.descriptionVi}</p>
                      <div className="text-[11px] border-t border-slate-700 pt-1.5 text-slate-300 space-y-1">
                        <p><strong className="text-emerald-400">Gắn khi:</strong> {tag.inclusionRule}</p>
                        <p><strong className="text-rose-400">Không gắn khi:</strong> {tag.exclusionRule}</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
