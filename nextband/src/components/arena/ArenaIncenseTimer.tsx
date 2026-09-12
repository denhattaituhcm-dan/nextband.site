/**
 * ARENA INCENSE TIMER (SUSPENSE PROGRESS BAR)
 * Tuân thủ Hiến pháp Điều 12 & Điều 41 (Tối giản & Trực quan)
 * Kế thừa ý tưởng từ BattleHUD.tsx: Thanh thời gian nén nhang cháy với đốm than đỏ & khói.
 */

import React from 'react';

interface ArenaIncenseTimerProps {
  timeLeftSeconds: number;
  totalTimeSeconds: number;
}

export const ArenaIncenseTimer: React.FC<ArenaIncenseTimerProps> = React.memo(
  ({ timeLeftSeconds, totalTimeSeconds }) => {
    const safeTotal = Math.max(1, totalTimeSeconds);
    const percentage = Math.max(0, Math.min(100, (timeLeftSeconds / safeTotal) * 100));
    const isUrgent = timeLeftSeconds <= 3;

    return (
      <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto my-3">
        {/* Track Container */}
        <div className="relative w-full h-3 bg-slate-950/80 rounded-full border border-slate-800 p-0.5 flex items-center shadow-inner">
          {/* Unburnt Coating (Phần nhang chưa cháy) */}
          <div
            className="h-full bg-gradient-to-r from-amber-700 via-amber-800 to-stone-900 rounded-full transition-all duration-300 ease-linear relative flex items-center"
            style={{ width: `${percentage}%` }}
          >
            {/* The burning ember (Đốm than đỏ rực ở đầu nén nhang) */}
            {timeLeftSeconds > 0 && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 pointer-events-none">
                <div
                  className={`w-3.5 h-3.5 rounded-full ${
                    isUrgent
                      ? 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,1)] animate-ping'
                      : 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)] animate-pulse'
                  }`}
                />
              </div>
            )}
          </div>
        </div>

        {/* Seconds countdown text */}
        <span
          className={`text-xs font-black tracking-widest mt-1.5 font-mono ${
            isUrgent ? 'text-red-500 animate-pulse' : 'text-amber-400/80'
          }`}
        >
          {timeLeftSeconds}s
        </span>
      </div>
    );
  }
);

ArenaIncenseTimer.displayName = 'ArenaIncenseTimer';
