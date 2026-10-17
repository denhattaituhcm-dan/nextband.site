/**
 * STUDENT ANSWER CARD (ZERO-FLUFF & ZERO-LAYOUT-SHIFT MOBILE RESPONSE)
 * Tuân thủ Hiến pháp Điều 12 & Điều 41 (Zero-Fluff UI) và NextBand Design System (Hard Shadow)
 * - Cố định indicator bên phải, triệt tiêu 100% Layout Shift khi bấm
 * - Tối ưu chiều cao gọn gàng vừa khít màn hình di động (< 60px/thẻ)
 * - Phản xạ tức thì (< 50ms) với xúc giác cơ học lún nhẹ
 */

import React from 'react';
import { ArenaQuestionOption } from '@/lib/arena/types';
import { Check } from 'lucide-react';

interface StudentAnswerCardProps {
  option: ArenaQuestionOption;
  isSelected: boolean;
  isConfirmed?: boolean;
  isLocked: boolean;
  onSelect: (optionId: string) => void;
}

const OPTION_THEMES: Record<
  string,
  {
    bg: string;
    border: string;
    shadow: string;
    labelBg: string;
  }
> = {
  A: {
    bg: 'bg-rose-950/50 hover:bg-rose-900/60',
    border: 'border-rose-500/50',
    shadow: 'shadow-[0_3px_0_0_#4c0519]',
    labelBg: 'bg-rose-500 text-white',
  },
  B: {
    bg: 'bg-blue-950/50 hover:bg-blue-900/60',
    border: 'border-blue-500/50',
    shadow: 'shadow-[0_3px_0_0_#172554]',
    labelBg: 'bg-blue-500 text-white',
  },
  C: {
    bg: 'bg-amber-950/50 hover:bg-amber-900/60',
    border: 'border-amber-500/50',
    shadow: 'shadow-[0_3px_0_0_#451a03]',
    labelBg: 'bg-amber-500 text-white',
  },
  D: {
    bg: 'bg-emerald-950/50 hover:bg-emerald-900/60',
    border: 'border-emerald-500/50',
    shadow: 'shadow-[0_3px_0_0_#022c22]',
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
        className={`w-full p-2.5 sm:p-3.5 rounded-2xl border-2 text-left flex items-center gap-3 transition-all duration-100 cursor-pointer select-none ${
          isSelected
            ? isConfirmed
              ? 'border-emerald-400 bg-emerald-950/80 shadow-[0_3px_0_0_#064e3b]'
              : 'border-amber-400 bg-amber-950/80 shadow-[0_3px_0_0_#78350f]'
            : `${theme.bg} ${theme.border} ${theme.shadow}`
        } ${isLocked ? 'cursor-not-allowed opacity-80' : 'active:translate-y-0.5 active:shadow-none'}`}
      >
        {/* Option Letter Label (A/B/C/D) */}
        <div
          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-black text-base sm:text-lg shadow shrink-0 ${theme.labelBg}`}
        >
          {option.label}
        </div>

        {/* Option Text Content */}
        <div className="flex-1 min-w-0 pr-1">
          <span
            className={`font-bold text-white leading-snug block break-words ${
              option.text.length > 80
                ? 'text-xs'
                : option.text.length > 50
                ? 'text-xs sm:text-sm'
                : 'text-sm sm:text-base'
            }`}
          >
            {option.text}
          </span>
        </div>

        {/* Fixed Width Indicator Container: Triệt tiêu hoàn toàn Layout Shift */}
        <div className="w-8 h-8 flex items-center justify-center shrink-0">
          {isSelected ? (
            isConfirmed ? (
              <div
                className="w-7 h-7 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center border-2 border-emerald-200 shadow animate-in zoom-in-75"
                title="Đã chốt đáp án"
              >
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
            ) : (
              <div
                className="w-7 h-7 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center border-2 border-amber-200 shadow animate-in zoom-in-75"
                title="Đang chọn"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-slate-950 animate-pulse" />
              </div>
            )
          ) : (
            <div className="w-6 h-6 rounded-full border-2 border-white/20" />
          )}
        </div>
      </button>
    );
  }
);

StudentAnswerCard.displayName = 'StudentAnswerCard';
