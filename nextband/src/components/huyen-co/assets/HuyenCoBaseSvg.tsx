import React from "react";
import { HuyenCoState } from "../HuyenCoState";

interface BaseSvgProps {
  state: HuyenCoState;
  size: number;
}

export const HuyenCoBaseSvg: React.FC<BaseSvgProps> = ({ state, size }) => {
  // Trạng thái chuyển động
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
        {/* Ether Realm Glow (Hào quang trí tuệ) */}
        <radialGradient id="huyenCoGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.65" />
          <stop offset="50%" stopColor="#B91C1C" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
        </radialGradient>

        {/* Crimson / Burgundy Robe Gradient (Áo choàng đỏ bóc đô tiên phong) */}
        <linearGradient id="huyenCoRobeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#991B1B" />
          <stop offset="50%" stopColor="#7F1D1D" />
          <stop offset="100%" stopColor="#450A0A" />
        </linearGradient>

        {/* Gold Trim Gradient (Viền hoa văn vàng kim) */}
        <linearGradient id="huyenCoGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D97706" />
          <stop offset="35%" stopColor="#F59E0B" />
          <stop offset="70%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>

        {/* White Hair & Beard Gradient (Tóc râu bạc phơ) */}
        <linearGradient id="whiteHairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="65%" stopColor="#F1F5F9" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </linearGradient>

        {/* Skin Tone Gradient */}
        <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF7ED" />
          <stop offset="100%" stopColor="#FFEDD5" />
        </linearGradient>
      </defs>

      {/* Layer 1: Ether Aura / Glow Ring */}
      <circle
        cx="60"
        cy="60"
        r="50"
        fill="url(#huyenCoGlow)"
        className={`transition-all duration-500 origin-center ${
          isThinking
            ? "animate-pulse scale-110 opacity-95"
            : isRemembered || isEncouraging
            ? "animate-ping opacity-60 scale-105"
            : "opacity-45 scale-100"
        }`}
      />

      {/* Layer 2: Robe Body (Áo choàng đỏ viền vàng cổ trang) */}
      <g className="transition-transform duration-300">
        {/* Main Robe Shoulders */}
        <path
          d="M 20 116 C 20 84, 40 70, 60 70 C 80 70, 100 84, 100 116 Z"
          fill="url(#huyenCoRobeGrad)"
          stroke="url(#huyenCoGoldGrad)"
          strokeWidth="1.8"
        />

        {/* Inner Shirt Collar */}
        <path
          d="M 50 70 L 60 84 L 70 70"
          fill="#FEF3C7"
          stroke="url(#huyenCoGoldGrad)"
          strokeWidth="1.2"
        />

        {/* Gold Lapel / Collar Trim Lines */}
        <path
          d="M 40 70 L 60 92 L 80 70"
          fill="none"
          stroke="url(#huyenCoGoldGrad)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M 45 70 L 60 87 L 75 70"
          fill="none"
          stroke="#991B1B"
          strokeWidth="1"
        />
      </g>

      {/* Layer 3: Flowing Back Hair (Tóc bạc rủ sau vai) */}
      <path
        d="M 32 46 C 26 62, 28 82, 36 98 C 30 84, 30 60, 36 46 Z"
        fill="url(#whiteHairGrad)"
        opacity="0.9"
      />
      <path
        d="M 88 46 C 94 62, 92 82, 84 98 C 90 84, 90 60, 84 46 Z"
        fill="url(#whiteHairGrad)"
        opacity="0.9"
      />

      {/* Layer head + facial features (Transforms with state) */}
      <g
        className={`transition-transform duration-300 origin-[60px_52px] ${
          isCurious
            ? "rotate-6 translate-x-0.5 -translate-y-0.5"
            : isThinking
            ? "-rotate-3 -translate-y-1"
            : isUnderstanding
            ? "translate-y-1 rotate-1"
            : isRemembered
            ? "-rotate-2 -translate-y-1"
            : isExplaining
            ? "rotate-2"
            : "animate-pulse"
        }`}
      >
        {/* Layer 4: Hair Bun & Golden Hairpin (Búi tóc & Trâm vàng) */}
        <g id="huyenCoHairBun">
          {/* Hair Bun */}
          <ellipse
            cx="60"
            cy="18"
            rx="12"
            ry="10"
            fill="url(#whiteHairGrad)"
            stroke="#CBD5E1"
            strokeWidth="1"
          />
          {/* Hair bun strands detail */}
          <path
            d="M 53 18 Q 60 14 67 18"
            fill="none"
            stroke="#94A3B8"
            strokeWidth="0.8"
          />
          {/* Golden Hairpin (Trâm cài tóc) */}
          <path
            d="M 40 21 L 78 16"
            stroke="url(#huyenCoGoldGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Hairpin Ornament Bead */}
          <circle cx="79" cy="16" r="2.8" fill="#F59E0B" stroke="#78350F" strokeWidth="0.8" />
          <circle cx="39" cy="21" r="1.8" fill="#FCD34D" />
        </g>

        {/* Layer 5: Head Face Base */}
        <ellipse
          cx="60"
          cy="44"
          rx="18"
          ry="17"
          fill="url(#skinGrad)"
          stroke="#FDBA74"
          strokeWidth="0.8"
        />

        {/* Forehead Side White Locks */}
        <path
          d="M 42 34 C 44 26, 54 24, 60 26 C 66 24, 76 26, 78 34 C 72 30, 66 30, 60 32 C 54 30, 48 30, 42 34 Z"
          fill="url(#whiteHairGrad)"
        />

        {/* Wisdom Mark on Forehead (Ấn hoa quan) */}
        <circle cx="60" cy="33" r="1.8" fill="#F59E0B" stroke="#991B1B" strokeWidth="0.8" />

        {/* Layer 6: Bushy White Eyebrows (Lông mày trắng thông thái) */}
        <g id="huyenCoEyebrows">
          {/* Left Eyebrow */}
          <path
            d={
              isThinking
                ? "M 44 37 Q 51 32 57 36"
                : isCurious
                ? "M 44 34 Q 51 32 57 37"
                : "M 44 36 Q 51 32 57 36"
            }
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path
            d={
              isThinking
                ? "M 44 37 Q 51 32 57 36"
                : isCurious
                ? "M 44 34 Q 51 32 57 37"
                : "M 44 36 Q 51 32 57 36"
            }
            fill="none"
            stroke="#CBD5E1"
            strokeWidth="0.8"
            strokeLinecap="round"
          />

          {/* Right Eyebrow */}
          <path
            d={
              isThinking
                ? "M 63 36 Q 69 32 76 37"
                : isCurious
                ? "M 63 37 Q 69 32 76 34"
                : "M 63 36 Q 69 32 76 36"
            }
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path
            d={
              isThinking
                ? "M 63 36 Q 69 32 76 37"
                : isCurious
                ? "M 63 37 Q 69 32 76 34"
                : "M 63 36 Q 69 32 76 36"
            }
            fill="none"
            stroke="#CBD5E1"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
        </g>

        {/* Layer 7: Eyes (Ánh mắt hiền từ / thông thái) */}
        <g
          className="transition-transform duration-200"
          transform={
            isCurious
              ? "translate(1.5, 0)"
              : isThinking
              ? "translate(0, -1.5)"
              : "translate(0, 0)"
          }
        >
          {/* Eyes contour / lids */}
          {isUnderstanding || isEncouraging || isRemembered ? (
            /* Smiling Crescent Eyes */
            <>
              <path
                d="M 48 42 Q 52 39 56 42"
                fill="none"
                stroke="#1E293B"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M 64 42 Q 68 39 72 42"
                fill="none"
                stroke="#1E293B"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </>
          ) : (
            /* Calm Wise Half-Lidded Eyes */
            <>
              {/* Left Eye */}
              <ellipse cx="52" cy="42" rx="3.2" ry="2.5" fill="#0F172A" />
              <circle cx="53" cy="41" r="1" fill="#FFFFFF" />
              <path
                d="M 47 41 Q 52 39 57 41"
                fill="none"
                stroke="#475569"
                strokeWidth="1"
              />

              {/* Right Eye */}
              <ellipse cx="68" cy="42" rx="3.2" ry="2.5" fill="#0F172A" />
              <circle cx="69" cy="41" r="1" fill="#FFFFFF" />
              <path
                d="M 63 41 Q 68 39 73 41"
                fill="none"
                stroke="#475569"
                strokeWidth="1"
              />
            </>
          )}
        </g>

        {/* Layer 8: Flowing White Mustache & Long Beard (Râu rồng bạc phơ tha thướt) */}
        <g id="huyenCoBeard">
          {/* Flowing Long Beard Base */}
          <path
            d="M 40 48 C 36 70, 44 104, 60 114 C 76 104, 84 70, 80 48 C 72 53, 48 53, 40 48 Z"
            fill="url(#whiteHairGrad)"
            stroke="#CBD5E1"
            strokeWidth="1"
            className={`transition-transform duration-500 ${
              isExplaining ? "animate-pulse" : ""
            }`}
          />

          {/* Beard Texture Strand Lines */}
          <path
            d="M 52 56 Q 50 82 56 104"
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="1"
          />
          <path
            d="M 60 54 Q 60 84 60 110"
            fill="none"
            stroke="#CBD5E1"
            strokeWidth="1.2"
          />
          <path
            d="M 68 56 Q 70 82 64 104"
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="1"
          />

          {/* Mustache Sweeping Over Mouth */}
          <path
            d="M 42 47 Q 52 52 60 49 Q 68 52 78 47 Q 68 56 60 52 Q 52 56 42 47 Z"
            fill="url(#whiteHairGrad)"
            stroke="#E2E8F0"
            strokeWidth="0.8"
          />
        </g>
      </g>

      {/* Layer 9: Magic Sparks / Linh khí trí tuệ (Sparks accent) */}
      {(isExplaining || isRemembered || isEncouraging || isThinking) && (
        <g>
          <circle
            cx="24"
            cy="36"
            r="2"
            fill="#FCD34D"
            className="animate-ping duration-1000"
          />
          <circle
            cx="96"
            cy="42"
            r="1.8"
            fill="#F59E0B"
            className="animate-pulse duration-700"
          />
          {isEncouraging && (
            <circle
              cx="60"
              cy="10"
              r="2.5"
              fill="#FDE047"
              className="animate-bounce"
            />
          )}
        </g>
      )}
    </svg>
  );
};
