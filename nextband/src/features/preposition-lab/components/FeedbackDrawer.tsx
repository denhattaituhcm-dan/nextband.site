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
      className={`mt-4 p-4 rounded-2xl border transition-all duration-300 ${
        isCanonical
          ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-100'
          : isNuanced
          ? 'bg-amber-950/40 border-amber-500/40 text-amber-100'
          : 'bg-rose-950/30 border-rose-500/40 text-rose-100'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
              isCanonical
                ? 'bg-emerald-500 text-slate-950'
                : isNuanced
                ? 'bg-amber-500 text-slate-950'
                : 'bg-rose-500 text-white'
            }`}
          >
            {isCanonical ? 'Natural & Motivated' : isNuanced ? 'Nuanced / Contextual' : 'Notice the Contrast'}
          </span>
          <span className="text-xs text-slate-400 font-mono">
            Lindstromberg Ch.{puzzle.sourceReference.chapter} (pp. {puzzle.sourceReference.printedPages})
          </span>
        </div>

        {/* Vietnamese Insight Toggle Button */}
        <button
          type="button"
          onClick={onToggleViInsight}
          className="text-xs font-medium text-sky-400 hover:text-sky-300 underline underline-offset-2 flex items-center gap-1 shrink-0"
        >
          <span>🇻🇳</span>
          <span>{showViInsight ? 'Hide Tiếng Việt' : 'Giải thích (VN)'}</span>
        </button>
      </div>

      {/* English Cognitive Feedback */}
      <div className="mt-3 text-sm leading-relaxed font-normal text-slate-200">
        <p>{selectedOption.explanation.en}</p>
      </div>

      {/* Optional Vietnamese Contrast Drawer */}
      {showViInsight && (
        <div className="mt-2.5 p-2.5 bg-slate-900/70 border border-slate-700/60 rounded-xl text-xs leading-relaxed text-slate-300 animate-fadeIn">
          <span className="font-semibold text-amber-300 block mb-1">
            Góc nhìn ngôn ngữ học (L1 Transfer Insight):
          </span>
          {selectedOption.explanation.vi}
        </div>
      )}

      {/* Action to advance */}
      <div className="mt-4 pt-3 border-t border-slate-700/50 flex items-center justify-between">
        <div className="text-xs text-slate-400">
          Principle: <span className="text-slate-200 font-medium">{puzzle.pedagogicalTakeaway.principleName}</span>
        </div>

        <button
          type="button"
          onClick={onNext}
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm shadow-md transition-all active:scale-95 flex items-center gap-2"
        >
          <span>{isLastPuzzle ? 'View Final Summary' : 'Next Scenario'}</span>
          <span>➔</span>
        </button>
      </div>
    </div>
  );
};
