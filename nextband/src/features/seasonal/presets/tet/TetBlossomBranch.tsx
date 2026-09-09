import React from "react";

export function TetBlossomBranch() {
  return (
    <div
      className="fixed top-0 right-0 pointer-events-none z-30 select-none overflow-hidden opacity-90 transition-opacity duration-500 hover:opacity-100"
      style={{ width: "min(320px, 45vw)", height: "min(220px, 35vw)" }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 320 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        {/* Main Branch (Nâu gỗ ấm) */}
        <path
          d="M320 0 C280 25, 230 40, 180 35 C140 30, 95 60, 60 95 C45 110, 25 145, 10 170"
          stroke="#5c3826"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* Secondary twigs */}
        <path
          d="M210 38 C195 55, 175 70, 155 75"
          stroke="#4a2c1d"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M140 32 C125 15, 100 20, 85 25"
          stroke="#4a2c1d"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M85 75 C70 95, 50 110, 35 115"
          stroke="#5c3826"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M40 135 C30 150, 18 160, 5 165"
          stroke="#5c3826"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Small Fresh Spring Green Buds */}
        <circle cx="10" cy="170" r="3.5" fill="#65a30d" />
        <circle cx="85" cy="25" r="3.5" fill="#65a30d" />
        <circle cx="155" cy="75" r="4" fill="#84cc16" />
        <circle cx="270" cy="18" r="4" fill="#65a30d" />

        {/* Blossom 1: Top Right */}
        <g transform="translate(250, 26)">
          <path d="M0 -14 C4 -10, 4 -4, 0 0 C-4 -4, -4 -10, 0 -14" fill="#fbbf24" stroke="#f59e0b" strokeWidth="0.8" />
          <path d="M14 0 C10 4, 4 4, 0 0 C4 -4, 10 -4, 14 0" fill="#fbbf24" stroke="#f59e0b" strokeWidth="0.8" />
          <path d="M8 12 C5 14, 1 10, 0 0 C5 3, 10 7, 8 12" fill="#fbbf24" stroke="#f59e0b" strokeWidth="0.8" />
          <path d="M-8 12 C-5 14, -1 10, 0 0 C-5 3, -10 7, -8 12" fill="#fbbf24" stroke="#f59e0b" strokeWidth="0.8" />
          <path d="M-14 0 C-10 4, -4 4, 0 0 C-4 -4, -10 -4, -14 0" fill="#fbbf24" stroke="#f59e0b" strokeWidth="0.8" />
          <circle cx="0" cy="0" r="3" fill="#dc2626" />
          <circle cx="0" cy="0" r="1.5" fill="#fef08a" />
        </g>

        {/* Blossom 2: Center Major Blossom */}
        <g transform="translate(180, 42) scale(1.2)">
          <circle cx="0" cy="-11" r="7" fill="#fcd34d" stroke="#f59e0b" strokeWidth="0.8" />
          <circle cx="11" cy="-3" r="7" fill="#fcd34d" stroke="#f59e0b" strokeWidth="0.8" />
          <circle cx="7" cy="9" r="7" fill="#fcd34d" stroke="#f59e0b" strokeWidth="0.8" />
          <circle cx="-7" cy="9" r="7" fill="#fcd34d" stroke="#f59e0b" strokeWidth="0.8" />
          <circle cx="-11" cy="-3" r="7" fill="#fcd34d" stroke="#f59e0b" strokeWidth="0.8" />
          <circle cx="0" cy="0" r="4" fill="#dc2626" />
          <circle cx="0" cy="0" r="2" fill="#fef08a" />
        </g>

        {/* Blossom 3: Branch Middle */}
        <g transform="translate(125, 45) scale(0.95)">
          <circle cx="0" cy="-9" r="6" fill="#fbbf24" stroke="#f59e0b" strokeWidth="0.8" />
          <circle cx="9" cy="-2" r="6" fill="#fbbf24" stroke="#f59e0b" strokeWidth="0.8" />
          <circle cx="6" cy="7" r="6" fill="#fbbf24" stroke="#f59e0b" strokeWidth="0.8" />
          <circle cx="-6" cy="7" r="6" fill="#fbbf24" stroke="#f59e0b" strokeWidth="0.8" />
          <circle cx="-9" cy="-2" r="6" fill="#fbbf24" stroke="#f59e0b" strokeWidth="0.8" />
          <circle cx="0" cy="0" r="3.2" fill="#dc2626" />
          <circle cx="0" cy="0" r="1.6" fill="#fef08a" />
        </g>

        {/* Blossom 4: Tip blossom */}
        <g transform="translate(60, 95) scale(1.1)">
          <circle cx="0" cy="-10" r="6.5" fill="#fcd34d" stroke="#f59e0b" strokeWidth="0.8" />
          <circle cx="10" cy="-2" r="6.5" fill="#fcd34d" stroke="#f59e0b" strokeWidth="0.8" />
          <circle cx="6" cy="8" r="6.5" fill="#fcd34d" stroke="#f59e0b" strokeWidth="0.8" />
          <circle cx="-6" cy="8" r="6.5" fill="#fcd34d" stroke="#f59e0b" strokeWidth="0.8" />
          <circle cx="-10" cy="-2" r="6.5" fill="#fcd34d" stroke="#f59e0b" strokeWidth="0.8" />
          <circle cx="0" cy="0" r="3.5" fill="#dc2626" />
          <circle cx="0" cy="0" r="1.8" fill="#fef08a" />
        </g>

        {/* Blossom 5: Lower drooping blossom */}
        <g transform="translate(30, 140) scale(0.85)">
          <circle cx="0" cy="-9" r="6" fill="#fbbf24" stroke="#f59e0b" strokeWidth="0.8" />
          <circle cx="9" cy="-2" r="6" fill="#fbbf24" stroke="#f59e0b" strokeWidth="0.8" />
          <circle cx="6" cy="7" r="6" fill="#fbbf24" stroke="#f59e0b" strokeWidth="0.8" />
          <circle cx="-6" cy="7" r="6" fill="#fbbf24" stroke="#f59e0b" strokeWidth="0.8" />
          <circle cx="-9" cy="-2" r="6" fill="#fbbf24" stroke="#f59e0b" strokeWidth="0.8" />
          <circle cx="0" cy="0" r="3" fill="#dc2626" />
          <circle cx="0" cy="0" r="1.5" fill="#fef08a" />
        </g>
      </svg>
    </div>
  );
}
