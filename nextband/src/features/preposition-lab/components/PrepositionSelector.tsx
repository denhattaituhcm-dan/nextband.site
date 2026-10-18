import React from 'react';
import { PrepositionId, PrepositionOption } from '../types';

interface PrepositionSelectorProps {
  options: PrepositionOption[];
  selectedId: PrepositionId | null;
  onSelect: (id: PrepositionId) => void;
  disabled: boolean;
  hasTestedPrediction?: boolean;
}

export const PrepositionSelector: React.FC<PrepositionSelectorProps> = ({
  options,
  selectedId,
  onSelect,
  disabled,
  hasTestedPrediction = false,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full my-3">
      {options.map((option) => {
        const isSelected = selectedId === option.id;

        // Visual styles after prediction test
        let postTestStyle = '';
        if (hasTestedPrediction && isSelected) {
          if (option.fit === 'canonical') {
            postTestStyle = 'bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-500/30';
          } else if (option.fit === 'nuanced') {
            postTestStyle = 'bg-amber-500 text-white border-amber-300 shadow-md shadow-amber-500/30';
          } else {
            postTestStyle = 'bg-rose-600 text-white border-rose-400 shadow-md shadow-rose-500/30 animate-shake';
          }
        } else if (isSelected) {
          postTestStyle = 'bg-sky-600 text-white border-sky-400 shadow-md shadow-sky-600/30 scale-[1.02]';
        } else {
          postTestStyle = 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 hover:border-slate-300 shadow-sm active:scale-95';
        }

        return (
          <button
            key={option.id}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(option.id)}
            className={`
              relative min-h-[52px] px-4 py-3 rounded-2xl font-bold text-base tracking-wide
              transition-all duration-200 select-none flex items-center justify-center
              touch-manipulation border-2 ${postTestStyle}
              ${disabled ? 'opacity-80 cursor-default' : 'cursor-pointer'}
            `}
            aria-pressed={isSelected}
          >
            <span>{option.label}</span>
            {isSelected && (
              <span className="absolute -top-2 -right-1 flex h-5 w-5">
                {hasTestedPrediction && option.fit === 'canonical' ? (
                  <span className="relative inline-flex rounded-full h-5 w-5 bg-white border border-emerald-600 text-[11px] text-emerald-600 items-center justify-center font-black shadow-xs">
                    ✓
                  </span>
                ) : hasTestedPrediction && option.fit === 'nuanced' ? (
                  <span className="relative inline-flex rounded-full h-5 w-5 bg-white border border-amber-500 text-[11px] text-amber-600 items-center justify-center font-black shadow-xs">
                    ⚠️
                  </span>
                ) : hasTestedPrediction && option.fit === 'misconception' ? (
                  <span className="relative inline-flex rounded-full h-5 w-5 bg-white border border-rose-600 text-[11px] text-rose-600 items-center justify-center font-black shadow-xs">
                    ✕
                  </span>
                ) : (
                  <span className="relative inline-flex rounded-full h-5 w-5 bg-white border border-sky-600 text-[11px] text-sky-600 items-center justify-center font-black shadow-xs">
                    ✓
                  </span>
                )}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
