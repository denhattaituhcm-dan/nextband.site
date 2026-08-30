import React from "react";
import { HuyenCoState } from "./HuyenCoState";

interface BaseSvgProps {
  state: HuyenCoState;
  size: number;
}

export const HuyenCoBaseSvg: React.FC<BaseSvgProps> = ({ state, size }) => {
  // CSS animation classes based on state
  const isThinking = state === "THINKING";
  const isCurious = state === "CURIOUS";
  const isUnderstanding = state === "UNDERSTANDING";
  const isExplaining = state === "EXPLAINING";
  const isEncouraging = state === "ENCOURAGING";
  const isRemembered = state === "REMEMBERED";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="select-none overflow-visible transition-all duration-300"
    >
      <defs>
        <radialGradient id="huyenCoGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.6" />
          <stop offset="60%" stopColor="#38BDF8" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="robeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="50%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>

      {/* Layer 1: Ether Glow Aura */}
      <circle
        cx="60"
        cy="60"
        r="48"
        fill="url(#huyenCoGlow)"
        className={`transition-all duration-500 ${
          isThinking ? "animate-pulse opacity-90 scale-105" : "opacity-50"
        }`}
      />

      {/* Layer 2: Body / Robe */}
      <path
        d="M32 96 C32 72, 45 66, 60 66 C75 66, 88 72, 88 96 Z"
        fill="url(#robeGrad)"
        stroke="url(#goldGrad)"
        strokeWidth="1.5"
      />
      <path
        d="M48 67 L60 80 L72 67"
        fill="none"
        stroke="url(#goldGrad)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Layer 3: Head & Hair (Pure CSS Transitions) */}
      <g
        className={`transition-transform duration-300 origin-[60px_52px] ${
          isCurious
            ? "rotate-6 -translate-y-0.5"
            : isThinking
            ? "-rotate-3 animate-bounce"
            : isUnderstanding
            ? "translate-y-1"
            : isRemembered
            ? "-rotate-4 -translate-y-1"
            : "animate-pulse"
        }`}
      >
        {/* Hair bun */}
        <circle cx="60" cy="24" r="14" fill="#020617" />
        <circle cx="60" cy="24" r="15" fill="none" stroke="url(#goldGrad)" strokeWidth="1" />

        {/* Head Base */}
        <circle cx="60" cy="46" r="22" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />

        {/* Hair Bangs */}
        <path
          d="M39 42 C44 32, 54 30, 60 35 C66 30, 76 32, 81 42 C74 38, 66 38, 60 41 C54 38, 46 38, 39 42 Z"
          fill="#020617"
        />

        {/* Eyes */}
        <g className="transition-transform duration-200">
          <circle cx="51" cy="47" r="3" fill="#0F172A" />
          <circle cx="52" cy="46" r="1" fill="#FFFFFF" />
          <circle cx="69" cy="47" r="3" fill="#0F172A" />
          <circle cx="70" cy="46" r="1" fill="#FFFFFF" />
        </g>

        {/* Eyebrows */}
        <path d="M48 41 Q51 39 54 41" fill="none" stroke="#64748B" strokeWidth="1" strokeLinecap="round" />
        <path d="M66 41 Q69 39 72 41" fill="none" stroke="#64748B" strokeWidth="1" strokeLinecap="round" />

        {/* Mouth */}
        {isExplaining || isEncouraging ? (
          <path d="M56 54 Q60 58 64 54" fill="none" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
        ) : isThinking ? (
          <path d="M57 55 L63 55" fill="none" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
        ) : (
          <path d="M57 54 Q60 56 63 54" fill="none" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
        )}

        {/* Third-Eye Wisdom Mark */}
        <circle cx="60" cy="38" r="1.5" fill="#F59E0B" />
      </g>

      {/* Magic Sparks */}
      {(isExplaining || isRemembered || isEncouraging) && (
        <g>
          <circle cx="28" cy="40" r="1.5" fill="#FCD34D" className="animate-ping" />
          <circle cx="92" cy="44" r="1.5" fill="#38BDF8" className="animate-pulse" />
        </g>
      )}
    </svg>
  );
};
