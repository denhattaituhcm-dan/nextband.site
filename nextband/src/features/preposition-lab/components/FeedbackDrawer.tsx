import React from 'react';
import { PrepositionOption, PuzzleScenario } from '../types';

interface FeedbackDrawerProps {
  puzzle: PuzzleScenario;
  selectedOption: PrepositionOption | null;
  hasTestedPrediction: boolean;
  showViInsight: boolean;
  onToggleViInsight: () => void;
  onNext: () => void;
  isLastPuzzle: boolean;
}

export const FeedbackDrawer: React.FC<FeedbackDrawerProps> = ({
  puzzle,
  selectedOption,
  hasTestedPrediction,
  showViInsight,
  onToggleViInsight,
  onNext,
  isLastPuzzle,
}) => {
  if (!hasTestedPrediction || !selectedOption) {
    return null;
  }

  const isCanonical = selectedOption.fit === 'canonical';
  const isNuanced = selectedOption.fit === 'nuanced';

  return (
    <div
      className={`mt-4 p-5 rounded-2xl border shadow-md transition-all duration-300 ${
        isCanonical
          ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
          : isNuanced
          ? 'bg-amber-50/80 border-amber-300 text-amber-950'
          : 'bg-rose-50/80 border-rose-300 text-rose-950'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-sm ${
              isCanonical
                ? 'bg-emerald-600 text-white'
                : isNuanced
                ? 'bg-amber-600 text-white'
                : 'bg-rose-600 text-white'
            }`}
          >
            {isCanonical ? '✓ Tự nhiên & Chuẩn xác' : isNuanced ? '⚠️ Sắc thái ngữ cảnh' : '💡 Nhận diện sự khác biệt'}
          </span>
          <span className="text-xs text-slate-500 font-mono">
            Sách Lindstromberg Ch.{puzzle.sourceReference.chapter} (tr. {puzzle.sourceReference.printedPages})
          </span>
        </div>

        {/* English Explanation Toggle Button */}
        <button
          type="button"
          onClick={onToggleViInsight}
          className="text-xs font-bold text-sky-700 hover:text-sky-800 underline underline-offset-2 flex items-center gap-1 shrink-0 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs cursor-pointer"
        >
          <span>🇬🇧</span>
          <span>{showViInsight ? 'Ẩn English' : 'Xem bản tiếng Anh (EN)'}</span>
        </button>
      </div>

      {/* Primary Vietnamese Explanation for A2-B1 Learners */}
      <div className="mt-3.5 text-sm sm:text-base leading-relaxed font-medium text-slate-800">
        <p className="flex items-start gap-2">
          <span className="text-base">💡</span>
          <span>{selectedOption.explanation.vi}</span>
        </p>
      </div>

      {/* Optional English Academic Insight Drawer */}
      {showViInsight && (
        <div className="mt-3 p-3.5 bg-white/90 border border-slate-200 rounded-xl text-xs sm:text-sm leading-relaxed text-slate-700 shadow-xs animate-fadeIn">
          <span className="font-bold text-sky-800 block mb-1">
            Academic English Explanation:
          </span>
          {selectedOption.explanation.en}
        </div>
      )}

      {/* Action to advance */}
      <div className="mt-4 pt-3.5 border-t border-slate-200/80 flex items-center justify-between">
        <div className="text-xs text-slate-500">
          Quy luật cốt lõi: <span className="text-slate-900 font-bold">{puzzle.pedagogicalTakeaway.principleName}</span>
        </div>

        <button
          type="button"
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-extrabold text-sm shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
        >
          <span>{isLastPuzzle ? 'Xem tổng kết bài học' : 'Kịch bản tiếp theo'}</span>
          <span>➔</span>
        </button>
      </div>
    </div>
  );
};
