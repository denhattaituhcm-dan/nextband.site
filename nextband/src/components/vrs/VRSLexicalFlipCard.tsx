import React, { useState } from 'react';
import { RotateCw, Sparkles, AlertCircle, CheckCircle2, Lightbulb } from 'lucide-react';

export interface VRSLexicalFlipCardProps {
  flipCard: {
    frontText: string;
    backText: string;
    explanation: string;
  };
  bandLevel?: string; // Ví dụ: 'Band 3.0 → 3.5', 'Band 3.5 → 4.0', 'Band 4.0 → 4.5'
}

export default function VRSLexicalFlipCard({ flipCard, bandLevel }: VRSLexicalFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Phân tích dải band thực tế của bài học (chuẩn lớp đầu ra 4.0, nâng cấp từ câu 3.0 lên tối đa 4.5)
  const [fromBand, toBand] = React.useMemo(() => {
    if (bandLevel) {
      if (bandLevel.includes('→')) {
        const parts = bandLevel.split('→').map((s) => s.trim());
        return [parts[0] || 'Band 3.0', parts[1] || 'Band 4.0'];
      }
      if (bandLevel.includes('->')) {
        const parts = bandLevel.split('->').map((s) => s.trim());
        return [parts[0] || 'Band 3.0', parts[1] || 'Band 4.0'];
      }
      return ['Band 3.0 – 3.5', bandLevel];
    }
    return ['Band 3.0', 'Band 4.0 – 4.5'];
  }, [bandLevel]);

  const handleFlip = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setIsFlipped((prev) => !prev);
  };

  return (
    <div className="space-y-3 select-none">
      {/* Header bar with controls */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded-md bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300">
            <RotateCw className="w-3.5 h-3.5" />
          </span>
          <span className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-200">
            Thẻ Lật Nâng Cấp Diễn Đạt (Lexical Flip)
          </span>
        </div>

        <button
          type="button"
          onClick={handleFlip}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer ${
            isFlipped
              ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20'
          }`}
        >
          <RotateCw className={`w-3.5 h-3.5 ${isFlipped ? 'text-rose-600' : 'text-white'}`} />
          <span>{isFlipped ? `Lật lại câu gốc (${fromBand}) ↺` : `Lật xem câu nâng cấp (${toBand}) ↺`}</span>
        </button>
      </div>

      {/* 3D Flip Card Canvas */}
      <div
        className="perspective-1000 w-full min-h-[150px] sm:min-h-[140px] cursor-pointer group"
        onClick={handleFlip}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleFlip();
          }
        }}
        aria-label="Lật thẻ nâng cấp diễn đạt"
      >
        <div
          className={`relative w-full h-full min-h-[150px] sm:min-h-[140px] duration-500 transform-style-3d transition-transform ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* ════════════════════════════════════════════════
              MẶT TRƯỚC (FRONT FACE - CÂU GỐC BAND 3.0 / CỘC LỐC)
              ════════════════════════════════════════════════ */}
          <div className={`absolute inset-0 backface-hidden flip-face-front rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-rose-50/70 via-white to-amber-50/40 dark:from-slate-900 dark:to-slate-800 border-2 border-rose-200 dark:border-rose-900/60 shadow-xs flex flex-col justify-between group-hover:border-rose-300 group-hover:shadow-sm transition-all ${isFlipped ? 'pointer-events-none z-0' : 'pointer-events-auto z-10'}`}>
            {/* Header tags */}
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-rose-100 dark:border-rose-900/40">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-rose-100/80 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 text-xs font-bold tracking-wide">
                <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                MẶT TRƯỚC · CÂU GỐC ({fromBand})
              </span>
              <span className="text-[11px] font-medium text-rose-600/80 dark:text-rose-400">
                ⚠️ Diễn đạt cộc lốc / quá ngắn
              </span>
            </div>

            {/* Core Sentence Text */}
            <div className="py-2">
              <p className="text-base sm:text-[17px] font-semibold text-rose-950 dark:text-rose-100 leading-relaxed">
                "{flipCard.frontText}"
              </p>
            </div>

            {/* Footer Prompt */}
            <div className="pt-2 border-t border-rose-100/80 dark:border-rose-900/30 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300 font-medium">
                👆 Bấm vào thẻ để lật xem bản nâng cấp ({toBand})
              </span>
              <span className="font-mono text-[11px] font-semibold text-rose-600 bg-rose-50 dark:bg-rose-950/50 px-2 py-0.5 rounded border border-rose-200 dark:border-rose-800">
                1 / 2
              </span>
            </div>
          </div>

          {/* ════════════════════════════════════════════════
              MẶT SAU (BACK FACE - NÂNG CẤP CHUẨN ĐẦU RA 4.0 - TỐI ĐA 4.5)
              ════════════════════════════════════════════════ */}
          <div className={`absolute inset-0 backface-hidden flip-face-back rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-emerald-50 via-white to-teal-50/70 dark:from-slate-900 dark:to-emerald-950/30 border-2 border-emerald-500 dark:border-emerald-500/80 shadow-md flex flex-col justify-between group-hover:border-emerald-600 transition-all ${isFlipped ? 'pointer-events-auto z-10' : 'pointer-events-none z-0'}`}>
            {/* Header tags */}
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-emerald-100 dark:border-emerald-900/40">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                MẶT SAU · NÂNG CẤP ({toBand})
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Nối ý tự nhiên · Chuẩn đầu ra
              </span>
            </div>

            {/* Core Sentence Text */}
            <div className="py-2">
              <p className="text-base sm:text-[17px] font-bold text-emerald-950 dark:text-emerald-100 leading-relaxed">
                "{flipCard.backText}"
              </p>
            </div>

            {/* Footer Prompt */}
            <div className="pt-2 border-t border-emerald-100 dark:border-emerald-900/30 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-300 font-medium">
                ↺ Bấm vào thẻ để lật lại câu gốc ({fromBand}) đối chiếu
              </span>
              <span className="font-mono text-[11px] font-semibold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                2 / 2
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Pedagogical Explanation Box */}
      <div className="p-3 sm:p-3.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/25 border border-amber-200/90 dark:border-amber-800/40 flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
        <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-900 dark:text-slate-100 font-semibold">Bí quyết nối câu: </strong>
          {flipCard.explanation}
        </p>
      </div>
    </div>
  );
}
