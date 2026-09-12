import { useState, useEffect, useRef } from 'react';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExamTimerProps {
  duration?: number; // in minutes
  initialSeconds?: number;
  onTimeUp?: () => void;
  size?: 'default' | 'large' | 'small';
}

export function ExamTimer({
  duration = 60,
  initialSeconds,
  onTimeUp,
  size = 'default',
}: ExamTimerProps) {
  const safeDuration = Math.max(60, duration || 60);
  const timeUpTriggeredRef = useRef(false);
  const [timeLeft, setTimeLeft] = useState(
    typeof initialSeconds === "number" && initialSeconds > 0 ? initialSeconds : safeDuration * 60,
  );

  useEffect(() => {
    if (typeof initialSeconds === "number" && initialSeconds > 0) {
      setTimeLeft(initialSeconds);
      timeUpTriggeredRef.current = false;
      return;
    }
    setTimeLeft(safeDuration * 60);
    timeUpTriggeredRef.current = false;
  }, [safeDuration, initialSeconds]);

  const onTimeUpRef = useRef(onTimeUp);
  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (!timeUpTriggeredRef.current) {
            timeUpTriggeredRef.current = true;
            onTimeUpRef.current?.();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;
  const formattedTime =
    hours > 0
      ? `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      : `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const isLow = timeLeft < 300; // Less than 5 minutes
  const isCritical = timeLeft < 60; // Less than 1 minute

  if (size === 'large') {
    return (
      <div
        title="Thời gian còn lại của bài thi"
        className={cn(
          'inline-flex items-center gap-3 px-5 py-2.5 rounded-full font-mono transition-all backdrop-blur-md shadow-xs',
          isCritical
            ? 'bg-rose-500/15 text-rose-700 border border-rose-400 animate-pulse'
            : isLow
            ? 'bg-amber-500/15 text-amber-800 border border-amber-400'
            : 'bg-white/85 text-[#1d1d1f] border border-black/[0.08] shadow-2xs'
        )}
      >
        <div className="relative flex items-center justify-center">
          <Clock className={cn("h-5 w-5 shrink-0", isCritical ? "text-rose-600" : isLow ? "text-amber-600" : "text-[#86868b]")} />
          {!isCritical && <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 animate-ping opacity-75" />}
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[9px] font-sans font-extrabold text-[#86868b] uppercase tracking-widest">Thời gian còn lại</span>
          <span className="text-xl font-black tracking-wider">
            {formattedTime}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      title="Thời gian còn lại của bài thi"
      className={cn(
        'inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full transition-all backdrop-blur-md font-mono text-xs sm:text-sm font-black',
        isCritical
          ? 'bg-rose-500/15 text-rose-700 border border-rose-400 animate-pulse'
          : isLow
          ? 'bg-amber-500/15 text-amber-800 border border-amber-400'
          : 'bg-slate-100/90 text-[#1d1d1f] border border-black/[0.06] shadow-2xs'
      )}
    >
      <Clock className={cn("h-3.5 w-3.5 shrink-0", isCritical ? "text-rose-600" : isLow ? "text-amber-600" : "text-[#86868b]")} />
      <span className="tracking-tight">{formattedTime}</span>
    </div>
  );
}
