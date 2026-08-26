import React from "react";

interface CrimeSceneBlueprintProps {
  className?: string;
  isCompact?: boolean;
}

export const CrimeSceneBlueprint: React.FC<CrimeSceneBlueprintProps> = ({
  className = "",
  isCompact = false,
}) => {
  return (
    <div
      className={`rounded-2xl border border-sky-300/80 bg-[#F8FAFC] text-slate-900 overflow-hidden shadow-xs ${className}`}
    >
      {/* Scientific Diagram Header */}
      <div className="flex items-center justify-between border-b border-sky-200 bg-sky-100/70 px-3.5 py-2.5">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-sky-600 animate-pulse" />
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-sky-950">
            SƠ ĐỒ ĐỊA VẬT LÝ · GREENLAND ICE SHEET CROSS-SECTION
          </span>
        </div>
        <span className="font-mono text-[10px] text-sky-800 font-medium">Trạm Summit Alpha-4 · Tỉ lệ 1:1000</span>
      </div>

      {/* Diagram Surface */}
      <div className="p-3 sm:p-5 bg-[#F0F7FF]">
        <svg
          viewBox="0 0 560 340"
          className="w-full h-auto select-none font-sans"
          style={{ maxHeight: isCompact ? "230px" : "350px" }}
        >
          <defs>
            <linearGradient id="iceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E0F2FE" />
              <stop offset="50%" stopColor="#BAE6FD" />
              <stop offset="100%" stopColor="#7DD3FC" />
            </linearGradient>
            <linearGradient id="lakeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#0369A1" />
            </linearGradient>
            <linearGradient id="bedrockGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>
          </defs>

          {/* 1. Ice Sheet Main Body */}
          <rect x="30" y="70" width="500" height="210" fill="url(#iceGrad)" stroke="#38BDF8" strokeWidth="2" rx="4" />

          {/* Ice Strata subtle lines */}
          <line x1="30" y1="120" x2="530" y2="120" stroke="#93C5FD" strokeWidth="1" strokeDasharray="6 4" />
          <line x1="30" y1="180" x2="530" y2="180" stroke="#93C5FD" strokeWidth="1" strokeDasharray="6 4" />
          <line x1="30" y1="230" x2="530" y2="230" stroke="#93C5FD" strokeWidth="1" strokeDasharray="6 4" />

          {/* Depth measurement indicator */}
          <line x1="540" y1="70" x2="540" y2="280" stroke="#0369A1" strokeWidth="1.5" />
          <polyline points="536,76 540,70 544,76" fill="none" stroke="#0369A1" strokeWidth="1.5" />
          <polyline points="536,274 540,280 544,274" fill="none" stroke="#0369A1" strokeWidth="1.5" />
          <text x="548" y="180" textAnchor="start" className="text-[10px] font-mono font-black fill-sky-950">
            850 METERS
          </text>

          {/* 2. Supraglacial Lake Basin (Mặt hồ băng G-4) */}
          <path
            d="M 120,70 Q 280,115 440,70 Z"
            fill="url(#lakeGrad)"
            stroke="#0284C7"
            strokeWidth="2"
          />
          <text x="280" y="55" textAnchor="middle" className="text-[11px] font-black fill-sky-900 uppercase tracking-wide">
            🌊 HỒ BĂNG SUPRAGLACIAL LAKE G-4
          </text>
          <text x="280" y="88" textAnchor="middle" className="text-[9.5px] font-mono font-bold fill-white">
            [Dung tích: 8,000,000 m³ · Biến mất trong 90 phút]
          </text>

          {/* 3. Perimeter Ridges */}
          <path d="M 30,70 Q 75,60 120,70" fill="none" stroke="#64748B" strokeWidth="2.5" />
          <path d="M 440,70 Q 485,60 530,70" fill="none" stroke="#64748B" strokeWidth="2.5" />
          <text x="75" y="50" textAnchor="middle" className="text-[9px] font-mono fill-slate-600 font-bold">
            Gờ băng nguyên vẹn
          </text>
          <text x="485" y="50" textAnchor="middle" className="text-[9px] font-mono fill-slate-600 font-bold">
            (Không có vết tràn)
          </text>

          {/* 4. Vertical Hydro-Fracture Chasm (Khe nứt thủy lực 850m) */}
          <path
            d="M 276,95 L 274,280 L 286,280 L 284,95 Z"
            fill="#0284C7"
            stroke="#0369A1"
            strokeWidth="1.5"
          />
          {/* Water drainage arrows */}
          <polyline points="280,120 280,150 276,142 284,142" stroke="#FFFFFF" strokeWidth="2" fill="none" />
          <polyline points="280,190 280,220 276,212 284,212" stroke="#FFFFFF" strokeWidth="2" fill="none" />

          {/* Crack Label */}
          <g transform="translate(140, 160)">
            <rect x="0" y="0" width="125" height="42" rx="4" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.2" />
            <text x="62" y="16" textAnchor="middle" className="text-[10px] font-black fill-sky-950">
              KHE NỨT THẲNG ĐỨNG
            </text>
            <text x="62" y="32" textAnchor="middle" className="text-[9px] font-mono fill-sky-700">
              (Rộng 1.2m · Sâu 850m)
            </text>
            <line x1="125" y1="21" x2="136" y2="21" stroke="#0284C7" strokeWidth="1.5" />
          </g>

          {/* 5. Sub-Glacial Bedrock Layer */}
          <rect x="30" y="280" width="500" height="45" fill="url(#bedrockGrad)" stroke="#334155" strokeWidth="2" rx="2" />
          <text x="280" y="302" textAnchor="middle" className="text-[10.5px] font-black fill-slate-200">
            LỚP ĐÁ ĐÁY BĂNG (BEDROCK) · NHIỆT ĐỘ CỐ ĐỊNH -1.8°C
          </text>
          <text x="280" y="316" textAnchor="middle" className="text-[9px] font-mono fill-slate-400">
            Hệ thống thoát nước ngầm ra biển (Sub-glacial drainage)
          </text>

          {/* 6. Sensor Nodes */}
          <g transform="translate(390, 260)">
            <circle cx="0" cy="0" r="7" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1.5" />
            <text x="12" y="4" className="text-[9px] font-mono font-bold fill-red-800">
              Cảm biến rung chấn B-02 (03:12 AM)
            </text>
          </g>
        </svg>

        {/* Legend */}
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-sky-200/80 text-[11px] font-semibold text-slate-700">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-sky-600" />
            <span>Hồ băng mặt G-4</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-sky-300" />
            <span>Tầng băng dày 850m</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-800" />
            <span>Khe nứt thủy lực</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
            <span>Lớp đá đáy (-1.8°C)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
