import React, { useState, useCallback, useRef } from 'react';

interface ArenaReactionBarProps {
  onSendReaction: (emoji: string) => void;
  disabled?: boolean;
}

const EMOJI_LIST = [
  { emoji: '🔥', label: 'Cháy quá' },
  { emoji: '👏', label: 'Vỗ tay' },
  { emoji: '🎉', label: 'Ăn mừng' },
  { emoji: '❤️', label: 'Yêu thích' },
  { emoji: '😱', label: 'Sốc' },
];

export const ArenaReactionBar: React.FC<ArenaReactionBarProps> = React.memo(({
  onSendReaction,
  disabled = false,
}) => {
  const [activeEmoji, setActiveEmoji] = useState<string | null>(null);
  const lastSentRef = useRef<number>(0);

  const handleTrigger = useCallback((emoji: string) => {
    if (disabled) return;
    const now = Date.now();
    // Throttle 350ms chống spam nghẽn mạng
    if (now - lastSentRef.current < 350) return;
    lastSentRef.current = now;

    setActiveEmoji(emoji);
    setTimeout(() => setActiveEmoji(null), 250);

    // Haptic vi-rung nhẹ nhàng trên điện thoại học sinh
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try { navigator.vibrate(15); } catch {}
    }

    onSendReaction(emoji);
  }, [disabled, onSendReaction]);

  return (
    <div className="flex items-center justify-center gap-2 py-1.5 px-3 rounded-full bg-purple-950/40 border border-purple-500/30 backdrop-blur-md shadow-lg select-none">
      <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider mr-1 hidden sm:inline">
        Cảm xúc:
      </span>
      {EMOJI_LIST.map(({ emoji, label }) => {
        const isBouncing = activeEmoji === emoji;
        return (
          <button
            key={emoji}
            type="button"
            title={label}
            disabled={disabled}
            onClick={() => handleTrigger(emoji)}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-lg sm:text-xl transition-all duration-150 active:scale-125 hover:bg-white/10 cursor-pointer ${
              isBouncing ? 'scale-135 bg-white/20' : 'scale-100'
            } ${disabled ? 'opacity-40 cursor-not-allowed' : 'opacity-90 hover:opacity-100'}`}
          >
            <span className={isBouncing ? 'animate-bounce' : ''}>{emoji}</span>
          </button>
        );
      })}
    </div>
  );
});

ArenaReactionBar.displayName = 'ArenaReactionBar';
