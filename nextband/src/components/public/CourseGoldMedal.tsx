import React from "react";

interface CourseGoldMedalProps {
  className?: string;
  size?: number;
}

export function CourseGoldMedal({ className, size = 68 }: CourseGoldMedalProps) {
  return (
    <div
      className={className}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_6px_14px_rgba(0,0,0,0.28)]"
      >
        <defs>
          {/* Outer ring gold gradient */}
          <linearGradient id="goldRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF7C2" />
            <stop offset="25%" stopColor="#DFB748" />
            <stop offset="50%" stopColor="#9B6C14" />
            <stop offset="75%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#784B06" />
          </linearGradient>

          {/* Inner ring gradient */}
          <linearGradient id="goldInnerGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#784B06" />
            <stop offset="30%" stopColor="#FDE68A" />
            <stop offset="60%" stopColor="#B38020" />
            <stop offset="90%" stopColor="#FFF7C2" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>

          {/* Center disc subtle metallic gradient */}
          <radialGradient id="centerDiscGrad" cx="38%" cy="32%" r="68%">
            <stop offset="0%" stopColor="#FFFDF5" />
            <stop offset="35%" stopColor="#FBE493" />
            <stop offset="70%" stopColor="#D8A53B" />
            <stop offset="100%" stopColor="#986510" />
          </radialGradient>

          {/* Crown embossed gold fill */}
          <linearGradient id="crownGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7A4802" />
            <stop offset="50%" stopColor="#5E3500" />
            <stop offset="100%" stopColor="#3D1E00" />
          </linearGradient>

          {/* Glare specular highlight */}
          <linearGradient id="glareGrad" x1="20%" y1="10%" x2="80%" y2="90%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Outer Ring Thick Border */}
        <circle cx="50" cy="50" r="48" fill="url(#goldRimGrad)" />

        {/* Middle Groove Ring */}
        <circle cx="50" cy="50" r="42" fill="#5E3802" />
        <circle cx="50" cy="50" r="39.5" fill="url(#goldInnerGrad)" />

        {/* Inner Coin Center Disc */}
        <circle cx="50" cy="50" r="34" fill="url(#centerDiscGrad)" />

        {/* Specular Highlight Overlay (Glass/Sheen effect) */}
        <path
          d="M20 30 C30 17, 65 15, 79 27 C68 37, 35 43, 20 30 Z"
          fill="url(#glareGrad)"
        />

        {/* 5-Point Crown Icon (Embossed) */}
        <g transform="translate(24, 28) scale(0.52)">
          {/* Subtle light drop highlight behind */}
          <path
            d="M50 78 L12 36 L28 42 L50 18 L72 42 L88 36 Z"
            fill="#FFF5BA"
            transform="translate(0, 1.5)"
          />
          {/* Main Crown Body */}
          <path
            d="M50 76 L12 34 L28 40 L50 16 L72 40 L88 34 Z"
            fill="url(#crownGrad)"
          />
          {/* Crown Base Bar */}
          <rect
            x="14"
            y="72"
            width="72"
            height="8"
            rx="4"
            fill="url(#crownGrad)"
          />
          {/* Crown Jewels */}
          <circle cx="12" cy="34" r="4.5" fill="#FFF2AD" />
          <circle cx="50" cy="16" r="5.5" fill="#FFF2AD" />
          <circle cx="88" cy="34" r="4.5" fill="#FFF2AD" />
          <circle cx="34" cy="27" r="3.5" fill="#FFF2AD" />
          <circle cx="66" cy="27" r="3.5" fill="#FFF2AD" />
        </g>
      </svg>
    </div>
  );
}