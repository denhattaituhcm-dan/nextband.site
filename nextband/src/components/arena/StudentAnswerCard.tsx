/**
 * STUDENT ANSWER CARD (ZERO-FLUFF MOBILE RESPONSE)
 * Tuân thủ Hiến pháp Điều 12 & Điều 41 (Zero-Fluff UI)
 * Hiển thị rõ ràng nội dung phương án + Phản xạ tức thì khi bấm (< 50ms)
 */

import React from 'react';
import { ArenaQuestionOption } from '@/lib/arena/types';

interface StudentAnswerCardProps {
  option: ArenaQuestionOption;
  isSelected: boolean;
  isConfirmed?: boolean;
  isLocked: boolean;
  onSelect: (optionId: string) => void;
}

const OPTION_THEMES: Record<string, { bg: string; border: string; text: string; labelBg: string }> = {
  A: {
    bg: 'bg-red-950/40 hover:bg-red-900/50 active:bg-red-900/70',
    border: 'border-red-500/40',
    text: 'text-red-300',
    labelBg: 'bg-red-500 text-white',
  },
  B: {
    bg: 'bg-blue-950/40 hover:bg-blue-900/50 active:bg-blue-900/70',
    border: 'border-blue-500/40',
    text: 'text-blue-300',
    labelBg: 'bg-blue-500 text-white',
  },
  C: {
    bg: 'bg-amber-950/40 hover:bg-amber-900/50 active:bg-amber-900/70',
    border: 'border-amber-500/40',
    text: 'text-amber-300',
    labelBg: 'bg-amber-500 text-white',
  },
  D: {
    bg: 'bg-emerald-950/40 hover:bg-emerald-900/50 active:bg-emerald-900/70',
    border: 'border-emerald-500/40',
    text: 'text-emerald-300',
    labelBg: 'bg-emerald-500 text-white',
  },
};

export const StudentAnswerCard: React.FC<StudentAnswerCardProps> = React.memo(
  ({ option, isSelected, isConfirmed = false, isLocked, onSelect }) => {
    const theme = OPTION_THEMES[option.label] || OPTION_THEMES.A;

    return (
      <button
        type="button"
        onClick={() => !isLocked && onSelect(option.id)}
        disabled={isLocked}
        className={`w-full p-4 md:p-5 rounded-2xl border text-left flex items-center gap-4 transition-all duration-150 cursor-pointer ${
          isSelected
            ? isConfirmed
              ? 'ring-4 ring-emerald-400 border-emerald-300 bg-emerald-500/25 scale-[1.02] shadow-2xl'
              : 'ring-4 ring-amber-400 border-amber-300 bg-amber-500/20 scale-[1.02] shadow-xl'
            : `${theme.bg} ${theme.border}`
        } ${isLocked ? 'cursor-not-allowed opacity-80' : 'active:scale-95'}`}
      >
        {/* Option Letter Label (A/B/C/D) */}
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-lg shadow-md shrink-0 ${theme.labelBg}`}
        >
          {option.label}
        </div>

        {/* Option Text Content */}
        <div className="flex-1 min-w-0">
          <span className="text-base md:text-lg font-bold text-white leading-snug block">
            {option.text}
          </span>
        </div>

        {/* Status Indicator */}
        {isSelected && (
          isConfirmed ? (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-400 text-slate-950 font-black text-xs shrink-0 shadow animate-in zoom-in-75">
              <span>✓ ĐÃ CHỐT</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-400 text-slate-950 font-black text-xs shrink-0 shadow animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" />
              <span>ĐANG CHỌN</span>
            </div>
          )
        )}
      </button>
    );
  }
);

StudentAnswerCard.displayName = 'StudentAnswerCard';
