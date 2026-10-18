import React from 'react';
import { LEVEL_1_PUZZLES } from '../data/level-1.data';

interface CompletionSummaryProps {
  onReplay: () => void;
}

export const CompletionSummary: React.FC<CompletionSummaryProps> = ({ onReplay }) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl text-slate-100">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-400/30 text-sky-400 text-2xl mb-1">
          🎓
        </div>
        <h2 className="text-2xl font-black text-white tracking-tight">
          Level 1 Complete: Containment & Covers
        </h2>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          You uncovered the cognitive principles behind English prepositions from Seth Lindstromberg’s research.
        </p>
      </div>

      {/* Visual Principles Grid */}
      <div className="mt-6 space-y-3">
        {LEVEL_1_PUZZLES.map((puzzle) => (
          <div
            key={puzzle.id}
            className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/50 flex items-start gap-3.5"
          >
            <div className="w-7 h-7 rounded-lg bg-sky-500/20 border border-sky-500/40 text-sky-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              {puzzle.order}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-slate-200">
                  {puzzle.pedagogicalTakeaway.principleName}
                </span>
                <span className="text-[11px] text-sky-400 font-mono">
                  (pp. {puzzle.sourceReference.printedPages})
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {puzzle.pedagogicalTakeaway.en}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Core Epiphany Card */}
      <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-sky-950/40 via-indigo-950/30 to-slate-900 border border-sky-500/30 text-xs leading-relaxed text-sky-200">
        <span className="font-bold text-sky-400 block mb-1">
          💡 The Big Takeaway (Geometry vs Function):
        </span>
        English prepositions do not merely describe static shapes. They encode <strong>active functions</strong>:
        whether an object is supported against gravity, trapped from escaping, or gripped and moving together as cargo.
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={onReplay}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 font-bold text-sm border border-slate-600 transition-all flex items-center justify-center gap-2"
        >
          <span>🔄</span>
          <span>Replay Level 1</span>
        </button>
        <button
          type="button"
          disabled
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-850 text-slate-500 font-bold text-sm border border-slate-800 cursor-not-allowed flex items-center justify-center gap-2"
        >
          <span>Level 2: Path & Perspective (Coming Next)</span>
          <span>🔒</span>
        </button>
      </div>
    </div>
  );
};
