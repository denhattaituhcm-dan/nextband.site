import { useMemo } from "react";
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
import { CriteriaScores, calculateSpeakingBand } from "@/lib/sentenceFeedback";

interface SpeakingRubricCardProps {
  scores: CriteriaScores;
  onChange: (updated: CriteriaScores) => void;
  disabled?: boolean;
}

const BAND_OPTIONS = ["4.0", "4.5", "5.0", "5.5", "6.0", "6.5", "7.0", "7.5", "8.0", "8.5", "9.0"];

export function SpeakingRubricCard({ scores, onChange, disabled = false }: SpeakingRubricCardProps) {
  const calculatedBand = useMemo(() => calculateSpeakingBand(scores), [scores]);

  const handleScoreChange = (field: keyof CriteriaScores, val: string) => {
    const num = parseFloat(val);
    onChange({
      ...scores,
      [field]: isNaN(num) ? null : num,
    });
  };

  return (
    <Card className="border border-slate-200/80 shadow-2xs rounded-xl p-4 space-y-3 bg-white">
      <div className="flex items-center justify-between border-b pb-2">
        <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
          <Award className="h-3.5 w-3.5 text-orange-600" />
          Đánh giá Band Score (IELTS Speaking 4 Tiêu chí)
        </span>
        <div className="text-xs font-extrabold text-orange-700 bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200">
          Overall Band: {calculatedBand}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <div className="space-y-1">
          <Label className="text-[11px] font-medium text-slate-600">Fluency & Coherence (FC)</Label>
          <Select
            value={scores.fluencyAndCoherence != null ? String(scores.fluencyAndCoherence.toFixed(1)) : ""}
            onValueChange={(v) => handleScoreChange("fluencyAndCoherence", v)}
            disabled={disabled}
          >
            <SelectTrigger className="h-8 text-xs font-bold bg-slate-50 border-slate-200">
              <SelectValue placeholder="Chọn điểm FC..." />
            </SelectTrigger>
            <SelectContent>
              {BAND_OPTIONS.map((v) => (
                <SelectItem key={v} value={v} className="text-xs font-semibold">{v}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label className="text-[11px] font-medium text-slate-600">Lexical Resource (LR)</Label>
          <Select
            value={scores.lexical != null ? String(scores.lexical.toFixed(1)) : ""}
            onValueChange={(v) => handleScoreChange("lexical", v)}
            disabled={disabled}
          >
            <SelectTrigger className="h-8 text-xs font-bold bg-slate-50 border-slate-200">
              <SelectValue placeholder="Chọn điểm LR..." />
            </SelectTrigger>
            <SelectContent>
              {BAND_OPTIONS.map((v) => (
                <SelectItem key={v} value={v} className="text-xs font-semibold">{v}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label className="text-[11px] font-medium text-slate-600">Grammatical Range & Accuracy (GRA)</Label>
          <Select
            value={scores.grammar != null ? String(scores.grammar.toFixed(1)) : ""}
            onValueChange={(v) => handleScoreChange("grammar", v)}
            disabled={disabled}
          >
            <SelectTrigger className="h-8 text-xs font-bold bg-slate-50 border-slate-200">
              <SelectValue placeholder="Chọn điểm GRA..." />
            </SelectTrigger>
            <SelectContent>
              {BAND_OPTIONS.map((v) => (
                <SelectItem key={v} value={v} className="text-xs font-semibold">{v}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label className="text-[11px] font-medium text-slate-600">Pronunciation (PR)</Label>
          <Select
            value={scores.pronunciation != null ? String(scores.pronunciation.toFixed(1)) : ""}
            onValueChange={(v) => handleScoreChange("pronunciation", v)}
            disabled={disabled}
          >
            <SelectTrigger className="h-8 text-xs font-bold bg-slate-50 border-slate-200">
              <SelectValue placeholder="Chọn điểm PR..." />
            </SelectTrigger>
            <SelectContent>
              {BAND_OPTIONS.map((v) => (
                <SelectItem key={v} value={v} className="text-xs font-semibold">{v}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
}
