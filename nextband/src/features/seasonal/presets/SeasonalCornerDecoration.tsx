import React from "react";
import { SeasonalEventType } from "../core/types";
import { TetBlossomBranch } from "./tet/TetBlossomBranch";

interface SeasonalCornerDecorationProps {
  type: SeasonalEventType;
}

export function SeasonalCornerDecoration({ type }: SeasonalCornerDecorationProps) {
  if (type === "TET") {
    return <TetBlossomBranch />;
  }

  if (type === "TEACHERS_DAY") {
    // 20/11: Nhành hoa tri ân điểm 10 & bút nghiên thanh tao góc trên bên phải
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
          {/* Elegant branch / ribbon */}
          <path
            d="M320 0 C270 30, 210 50, 160 40 C110 30, 70 70, 40 115 C25 140, 15 170, 5 190"
            stroke="#15803d"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Sub twig */}
          <path
            d="M180 42 C160 65, 130 80, 100 85"
            stroke="#166534"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Golden Ribbon Streamer */}
          <path
            d="M320 15 C260 45, 230 20, 180 60 C140 95, 110 70, 80 130"
            stroke="#f59e0b"
            strokeWidth="2.5"
            strokeDasharray="4 3"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Leaf sprigs */}
          <path d="M140 38 Q130 20 115 28 Q130 40 140 38" fill="#22c55e" opacity="0.9" />
          <path d="M220 30 Q215 10 200 18 Q210 32 220 30" fill="#22c55e" opacity="0.9" />
          <path d="M70 95 Q55 85 50 100 Q65 105 70 95" fill="#16a34a" opacity="0.9" />

          {/* Teacher Day Rose / Carnation 1 (Crimson Rose) */}
          <g transform="translate(240, 32) scale(1.1)">
            <circle cx="0" cy="0" r="14" fill="#e11d48" opacity="0.9" />
            <circle cx="-3" cy="-3" r="10" fill="#be123c" />
            <circle cx="2" cy="2" r="6" fill="#f43f5e" />
            <circle cx="0" cy="0" r="3" fill="#fbbf24" />
          </g>

          {/* Teacher Day Carnation 2 (Warm Golden Sun Flower) */}
          <g transform="translate(160, 48) scale(1.25)">
            <circle cx="0" cy="-10" r="6.5" fill="#fbbf24" stroke="#d97706" strokeWidth="0.8" />
            <circle cx="10" cy="-2" r="6.5" fill="#fbbf24" stroke="#d97706" strokeWidth="0.8" />
            <circle cx="6" cy="8" r="6.5" fill="#fbbf24" stroke="#d97706" strokeWidth="0.8" />
            <circle cx="-6" cy="8" r="6.5" fill="#fbbf24" stroke="#d97706" strokeWidth="0.8" />
            <circle cx="-10" cy="-2" r="6.5" fill="#fbbf24" stroke="#d97706" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="4.5" fill="#b45309" />
            <circle cx="0" cy="0" r="2" fill="#fef3c7" />
          </g>

          {/* Rose 3 (Gentle Pink Rose) */}
          <g transform="translate(100, 85) scale(0.95)">
            <circle cx="0" cy="0" r="12" fill="#f43f5e" />
            <circle cx="-2" cy="-2" r="8" fill="#fb7185" />
            <circle cx="1" cy="1" r="5" fill="#fda4af" />
            <circle cx="0" cy="0" r="2" fill="#fff" />
          </g>

          {/* Rose 4 (Tip Rose) */}
          <g transform="translate(45, 125) scale(0.85)">
            <circle cx="0" cy="0" r="10" fill="#e11d48" />
            <circle cx="-2" cy="-1" r="6" fill="#f43f5e" />
            <circle cx="0" cy="0" r="2" fill="#fbbf24" />
          </g>

          {/* Badge Tri Ân / Bút Điểm 10 */}
          <g transform="translate(200, 75) rotate(-15)">
            <rect x="0" y="0" width="38" height="20" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" />
            <text x="19" y="14" fill="#92400e" fontSize="9.5" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
              TRI ÂN
            </text>
          </g>
        </svg>
      </div>
    );
  }

  if (type === "BACK_TO_SCHOOL") {
    // Khai giảng: Chuông vàng, trang sách & ngôi sao tựu trường
    return (
      <div
        className="fixed top-0 right-0 pointer-events-none z-30 select-none overflow-hidden opacity-90 transition-opacity duration-500 hover:opacity-100"
        style={{ width: "min(300px, 42vw)", height: "min(200px, 30vw)" }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 300 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          {/* Blue decorative ribbon garland */}
          <path
            d="M300 0 C250 40, 200 45, 140 30 C90 20, 50 60, 20 100"
            stroke="#2563eb"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Sparkles / Stars */}
          <circle cx="80" cy="30" r="3" fill="#f59e0b" />
          <circle cx="160" cy="70" r="4" fill="#3b82f6" />
          <circle cx="230" cy="20" r="2.5" fill="#f59e0b" />

          {/* Golden School Bell */}
          <g transform="translate(220, 25) rotate(15)">
            <path
              d="M12 2 C10 2 8 4 8 7 L6 20 L2 24 L22 24 L18 20 L16 7 C16 4 14 2 12 2 Z"
              fill="#fbbf24"
              stroke="#d97706"
              strokeWidth="1.5"
            />
            <circle cx="12" cy="26" r="2.5" fill="#b45309" />
          </g>

          {/* Open Book Icon */}
          <g transform="translate(135, 35)">
            <path
              d="M0 6 C8 2, 16 3, 20 6 C24 3, 32 2, 40 6 L40 24 C32 20, 24 21, 20 24 C16 21, 8 20, 0 24 Z"
              fill="#ffffff"
              stroke="#1d4ed8"
              strokeWidth="1.5"
            />
            <line x1="20" y1="6" x2="20" y2="24" stroke="#1d4ed8" strokeWidth="1.5" />
          </g>

          {/* Band Boost Badge */}
          <g transform="translate(60, 65) rotate(-10)">
            <rect x="0" y="0" width="46" height="18" rx="5" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
            <text x="23" y="13" fill="#1e40af" fontSize="9" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">
              BAND 7.5+
            </text>
          </g>
        </svg>
      </div>
    );
  }

  if (type === "MID_AUTUMN") {
    // Tết Trung Thu: Đèn lồng đỏ & ánh trăng vàng
    return (
      <div
        className="fixed top-0 right-0 pointer-events-none z-30 select-none overflow-hidden opacity-90 transition-opacity duration-500 hover:opacity-100"
        style={{ width: "min(300px, 42vw)", height: "min(200px, 30vw)" }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 300 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          {/* Bamboo string / Moon branch */}
          <path
            d="M300 10 C240 25, 180 20, 120 40 C70 60, 40 90, 15 130"
            stroke="#78350f"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Glowing Full Moon Accent */}
          <circle cx="250" cy="35" r="26" fill="#fef08a" opacity="0.6" />
          <circle cx="250" cy="35" r="20" fill="#fde047" opacity="0.8" />

          {/* Hanging Red Lantern 1 */}
          <g transform="translate(170, 30)">
            <line x1="12" y1="0" x2="12" y2="12" stroke="#d97706" strokeWidth="1.5" />
            <rect x="2" y="12" width="20" height="26" rx="10" fill="#dc2626" stroke="#b91c1c" strokeWidth="1" />
            <rect x="6" y="10" width="12" height="4" fill="#fbbf24" />
            <rect x="6" y="36" width="12" height="4" fill="#fbbf24" />
            {/* Tassel */}
            <line x1="12" y1="40" x2="12" y2="55" stroke="#fbbf24" strokeWidth="2" />
          </g>

          {/* Hanging Star Lantern 2 */}
          <g transform="translate(90, 45) scale(0.9)">
            <line x1="15" y1="0" x2="15" y2="15" stroke="#d97706" strokeWidth="1.5" />
            <polygon
              points="15,15 19,25 30,25 21,32 25,42 15,35 5,42 9,32 0,25 11,25"
              fill="#fbbf24"
              stroke="#d97706"
              strokeWidth="1"
            />
          </g>
        </svg>
      </div>
    );
  }

  return null;
}
