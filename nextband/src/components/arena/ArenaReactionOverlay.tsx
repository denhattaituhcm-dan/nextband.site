import React, { useEffect, useState, useRef } from 'react';
import { PlayerReactionPayload } from '@/lib/arena/types';

interface FloatingReaction extends PlayerReactionPayload {
  xPercent: number;
  durationMs: number;
}

interface ArenaReactionOverlayProps {
  latestReaction: PlayerReactionPayload | null;
}

export const ArenaReactionOverlay: React.FC<ArenaReactionOverlayProps> = React.memo(({ latestReaction }) => {
  const [particles, setParticles] = useState<FloatingReaction[]>([]);
  const timeoutsRef = useRef<Set<NodeJS.Timeout>>(new Set());

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current.clear();
    };
  }, []);

  useEffect(() => {
    if (!latestReaction) return;

    // Sinh vị trí ngẫu nhiên từ 10% đến 88% chiều rộng màn chiếu
    const xPercent = 10 + Math.random() * 78;
    const durationMs = 2200 + Math.random() * 600;

    const newParticle: FloatingReaction = {
      ...latestReaction,
      xPercent,
      durationMs,
    };

    setParticles((prev) => [...prev.slice(-25), newParticle]);

    const timer = setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== latestReaction.id));
      timeoutsRef.current.delete(timer);
    }, durationMs);

    timeoutsRef.current.add(timer);
  }, [latestReaction]);

  if (particles.length === 0) return null;

  return (
    <>
      <style>{`
        @keyframes arenaFloatUp {
          0% {
            transform: translateY(0) scale(0.6) rotate(0deg);
            opacity: 0;
          }
          15% {
            opacity: 1;
            transform: translateY(-40px) scale(1.15) rotate(-4deg);
          }
          50% {
            transform: translateY(-180px) scale(1) rotate(6deg);
            opacity: 0.95;
          }
          85% {
            opacity: 0.7;
            transform: translateY(-320px) scale(0.95) rotate(-3deg);
          }
          100% {
            transform: translateY(-420px) scale(0.8) rotate(0deg);
            opacity: 0;
          }
        }
        .arena-particle-float {
          animation: arenaFloatUp cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute bottom-10 flex flex-col items-center arena-particle-float"
            style={{
              left: `${p.xPercent}%`,
              animationDuration: `${p.durationMs}ms`,
            }}
          >
            <span className="text-3xl sm:text-4xl md:text-5xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
              {p.emoji}
            </span>
            {p.senderName && (
              <span className="mt-1 px-2.5 py-0.5 rounded-full bg-purple-950/85 border border-purple-400/40 text-[10px] sm:text-xs font-black text-amber-300 shadow-lg backdrop-blur-sm whitespace-nowrap">
                {p.senderName}
              </span>
            )}
          </div>
        ))}
      </div>
    </>
  );
});

ArenaReactionOverlay.displayName = 'ArenaReactionOverlay';
