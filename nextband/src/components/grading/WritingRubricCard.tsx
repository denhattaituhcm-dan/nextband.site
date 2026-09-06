import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Award } from "lucide-react";
import { CriteriaScores, calculateWritingBand } from "@/lib/sentenceFeedback";
import { WritingRubricModal } from "@/components/grading/WritingRubricModal";

interface WritingRubricCardProps {
  scores: CriteriaScores;
  onChange: (updated: CriteriaScores) => void;
  disabled?: boolean;
}

const BAND_OPTIONS = ["1.0", "2.0", "3.0", "4.0", "5.0", "6.0", "7.0", "8.0", "9.0"];

function getOptionsForValue(currentVal?: number | null): string[] {
  if (currentVal == null || isNaN(currentVal)) return BAND_OPTIONS;
  const formatted = currentVal.toFixed(1);
  if (BAND_OPTIONS.includes(formatted)) return BAND_OPTIONS;
  return [...BAND_OPTIONS, formatted].sort((a, b) => parseFloat(a) - parseFloat(b));
}

export function WritingRubricCard({ scores, onChange, disabled = false }: WritingRubricCardProps) {
  const [showRubricModal, setShowRubricModal] = useState(false);
  const calculatedBand = useMemo(() => calculateWritingBand(scores), [scores]);

  const handleScoreChange = (field: keyof CriteriaScores, val: string) => {
    const num = parseFloat(val);
    onChange({
      ...scores,
      [field]: isNaN(num) ? null : num,
    });
  };

  return (
    <>
      <WritingRubricModal open={showRubricModal} onOpenChange={setShowRubricModal} />
      <Card className="border border-slate-200 shadow-2xs rounded-xl p-3.5 space-y-3 bg-white font-sans">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <button
            type="button"
            onClick={() => setShowRubricModal(true)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-blue-700 hover:bg-blue-50 px-2 py-1 -ml-2 rounded-lg transition-all cursor-pointer group focus:outline-none focus:ring-1 focus:ring-blue-300"
            title="Click để xem bảng mô tả tiêu chí chấm Writing Task 2 (Band Descriptors 4.0 - 8.0)"
          >
            <Award className="h-3.5 w-3.5 text-blue-600 group-hover:scale-110 transition-transform" />
            <span className="group-hover:underline">Tiêu chí Writing</span>
            <span className="text-[10px] font-semibold text-blue-600 bg-blue-100/80 group-hover:bg-blue-200 px-1.5 py-0.5 rounded border border-blue-200 transition-colors">
              Xem mô tả band
            </span>
          </button>
          <div className="text-xs font-extrabold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-200">
            Band: {calculatedBand}
          </div>
        </div>

      <div className="grid grid-cols-2 gap-2.5 pt-0.5">
        <div className="space-y-1">
          <Label className="text-xs font-bold text-slate-700">TR</Label>
          <Select
            value={scores.taskResponse != null ? String(scores.taskResponse.toFixed(1)) : ""}
            onValueChange={(v) => handleScoreChange("taskResponse", v)}
            disabled={disabled}
          >
            <SelectTrigger className="h-8 text-xs font-bold bg-slate-50 border-slate-200">
              <SelectValue placeholder="—" />
            </SelectTrigger>
            <SelectContent>
              {getOptionsForValue(scores.taskResponse).map((v) => (
                <SelectItem key={v} value={v} className="text-xs font-bold">{v}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label className="text-xs font-bold text-slate-700">CC</Label>
          <Select
            value={scores.coherence != null ? String(scores.coherence.toFixed(1)) : ""}
            onValueChange={(v) => handleScoreChange("coherence", v)}
            disabled={disabled}
          >
            <SelectTrigger className="h-8 text-xs font-bold bg-slate-50 border-slate-200">
              <SelectValue placeholder="—" />
            </SelectTrigger>
            <SelectContent>
              {getOptionsForValue(scores.coherence).map((v) => (
                <SelectItem key={v} value={v} className="text-xs font-bold">{v}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label className="text-xs font-bold text-slate-700">LR</Label>
          <Select
            value={scores.lexical != null ? String(scores.lexical.toFixed(1)) : ""}
            onValueChange={(v) => handleScoreChange("lexical", v)}
            disabled={disabled}
          >
            <SelectTrigger className="h-8 text-xs font-bold bg-slate-50 border-slate-200">
              <SelectValue placeholder="—" />
            </SelectTrigger>
            <SelectContent>
              {getOptionsForValue(scores.lexical).map((v) => (
                <SelectItem key={v} value={v} className="text-xs font-bold">{v}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label className="text-xs font-bold text-slate-700">GRA</Label>
          <Select
            value={scores.grammar != null ? String(scores.grammar.toFixed(1)) : ""}
            onValueChange={(v) => handleScoreChange("grammar", v)}
            disabled={disabled}
          >
            <SelectTrigger className="h-8 text-xs font-bold bg-slate-50 border-slate-200">
              <SelectValue placeholder="—" />
            </SelectTrigger>
            <SelectContent>
              {getOptionsForValue(scores.grammar).map((v) => (
                <SelectItem key={v} value={v} className="text-xs font-bold">{v}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  </>
  );
}
