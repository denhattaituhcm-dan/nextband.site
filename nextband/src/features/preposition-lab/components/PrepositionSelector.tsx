import React from 'react';
import { PrepositionId, PrepositionOption } from '../types';

interface PrepositionSelectorProps {
  options: PrepositionOption[];
  selectedId: PrepositionId | null;
  onSelect: (id: PrepositionId) => void;
  disabled: boolean;
}

export const PrepositionSelector: React.FC<PrepositionSelectorProps> = ({
  options,
  selectedId,
  onSelect,
  disabled,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full my-3">
      {options.map((option) => {
        const isSelected = selectedId === option.id;
        return (
          <button
            key={option.id}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(option.id)}
            className={`
              relative min-h-[52px] px-4 py-3 rounded-xl font-bold text-base tracking-wide
              transition-all duration-200 select-none flex items-center justify-center
              touch-manipulation border-2
              ${
                isSelected
                  ? 'bg-sky-500 text-white border-sky-300 shadow-md shadow-sky-500/25 scale-[1.02]'
                  : 'bg-slate-800/80 hover:bg-slate-750 text-slate-200 border-slate-700/80 hover:border-slate-600 active:scale-95'
              }
              ${disabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}
            `}
            aria-pressed={isSelected}
          >
            <span>{option.label}</span>
            {isSelected && (
              <span className="absolute -top-2 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-sky-300 text-[10px] text-slate-900 items-center justify-center font-black">
                  ✓
                </span>
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
