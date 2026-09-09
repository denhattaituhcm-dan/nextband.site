import React, { useState, useEffect } from "react";

interface TetFallingPetalsProps {
  initialActive?: boolean;
}

export function TetFallingPetals({ initialActive = false }: TetFallingPetalsProps) {
  const [isEnabled, setIsEnabled] = useState(() => {
    const saved = localStorage.getItem("aris_tet_falling_petals");
    return saved !== null ? saved === "true" : initialActive;
  });

  useEffect(() => {
    localStorage.setItem("aris_tet_falling_petals", String(isEnabled));
  }, [isEnabled]);

  if (!isEnabled) {
    return (
      <button
        onClick={() => setIsEnabled(true)}
        className="fixed bottom-4 right-4 z-40 text-[11px] font-medium px-2.5 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs border border-amber-200 dark:border-amber-900/50 text-amber-700 dark:text-amber-300 shadow-xs hover:bg-white flex items-center gap-1.5 transition-all opacity-70 hover:opacity-100"
        title="Bật hiệu ứng hoa mai rơi"
      >
        <span>🌸</span>
        <span>Bật hoa rơi</span>
      </button>
    );
  }

  // Generate fixed positions for 10 graceful petals
  const petals = [
    { id: 1, left: "10%", delay: "0s", duration: "11s", size: 14 },
    { id: 2, left: "25%", delay: "2.5s", duration: "14s", size: 18 },
    { id: 3, left: "40%", delay: "5s", duration: "10s", size: 12 },
    { id: 4, left: "55%", delay: "1.2s", duration: "13s", size: 16 },
    { id: 5, left: "70%", delay: "4s", duration: "12s", size: 15 },
    { id: 6, left: "85%", delay: "6.5s", duration: "15s", size: 13 },
    { id: 7, left: "95%", delay: "3s", duration: "11s", size: 17 },
  ];

  return (
    <>
      <div
        className="fixed inset-0 pointer-events-none z-20 overflow-hidden"
        aria-hidden="true"
      >
        <style>{`
          @keyframes tetPetalFall {
            0% {
              transform: translateY(-50px) translateX(0) rotate(0deg);
              opacity: 0;
            }
            10% {
              opacity: 0.85;
            }
            90% {
              opacity: 0.7;
            }
            100% {
              transform: translateY(105vh) translateX(90px) rotate(360deg);
              opacity: 0;
            }
          }
          .tet-petal-item {
            animation-name: tetPetalFall;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
          }
        `}</style>

        {petals.map((p) => (
          <div
            key={p.id}
            className="absolute tet-petal-item select-none"
            style={{
              left: p.left,
              top: "-40px",
              animationDelay: p.delay,
              animationDuration: p.duration,
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
          >
            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 0 C15 5, 18 10, 10 20 C2 10, 5 5, 10 0"
                fill="#fcd34d"
                stroke="#f59e0b"
                strokeWidth="0.5"
                opacity="0.85"
              />
              <circle cx="10" cy="14" r="1.5" fill="#dc2626" opacity="0.7" />
            </svg>
          </div>
        ))}
      </div>

      <button
        onClick={() => setIsEnabled(false)}
        className="fixed bottom-4 right-4 z-40 text-[11px] font-medium px-2.5 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 shadow-xs hover:bg-white flex items-center gap-1.5 transition-all opacity-60 hover:opacity-100"
        title="Tắt hiệu ứng hoa rơi"
      >
        <span>🌸</span>
        <span>Tắt hoa rơi</span>
      </button>
    </>
  );
}
