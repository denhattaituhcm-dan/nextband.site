import React from 'react';
import { PuzzleScenario } from '../types';

interface IeltsMetaphorBridgeProps {
  puzzle: PuzzleScenario;
}

export const IeltsMetaphorBridge: React.FC<IeltsMetaphorBridgeProps> = ({ puzzle }) => {
  const bridge = puzzle.ieltsBridge;

  if (!bridge) return null;

  return (
    <div className="mt-3.5 p-4 rounded-2xl bg-gradient-to-r from-indigo-50/80 to-sky-50/70 border border-indigo-200/90 shadow-sm text-slate-800">
      {/* Streamlined Header */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-md bg-indigo-600 text-white font-mono text-[11px] font-black uppercase tracking-wider">
            IELTS 8.0+
          </span>
          <span className="text-xs sm:text-sm font-black text-indigo-950">
            {bridge.metaphorTitle}
          </span>
        </div>
      </div>

      {/* Concise Band 8.5 Writing Example */}
      <div className="p-3 rounded-xl bg-white/95 border border-indigo-100 shadow-2xs">
        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center justify-between">
          <span>Writing Task 2 Context</span>
          <span className="text-emerald-700 font-extrabold">{bridge.writingExample.band}</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-900 leading-snug font-medium font-serif italic">
          &ldquo;
          {bridge.writingExample.sentence.split(new RegExp(`\\b(${bridge.writingExample.targetPreposition})\\b`, 'i')).map((part, i) => {
            if (part.toLowerCase() === bridge.writingExample.targetPreposition.toLowerCase()) {
              return (
                <span key={i} className="font-sans font-black text-indigo-600 underline underline-offset-4 not-italic px-0.5">
                  {part}
                </span>
              );
            }
            return part;
          })}
          &rdquo;
        </p>
      </div>

      {/* Collocation Tags */}
      <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
        <span className="text-[11px] font-bold text-indigo-900 mr-1">Cụm hay gặp:</span>
        {bridge.collocationPills.map((pill) => (
          <span
            key={pill}
            className="px-2 py-0.5 rounded-md bg-white border border-indigo-200/80 text-indigo-900 font-semibold text-[11px] shadow-2xs"
          >
            {pill}
          </span>
        ))}
      </div>
    </div>
  );
};
