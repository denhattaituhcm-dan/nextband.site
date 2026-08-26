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
      className={`rounded-2xl border border-amber-300/80 bg-[#FFFDF9] text-stone-900 overflow-hidden shadow-xs ${className}`}
    >
      {/* Blueprint Header */}
      <div className="flex items-center justify-between border-b border-amber-200 bg-amber-100/70 px-3.5 py-2">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-amber-600 animate-pulse" />
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-amber-950">
            SƠ ĐỒ HIỆN TRƯỜNG · ARCHIVE ROOM B-12
          </span>
        </div>
        <span className="font-mono text-[10px] text-amber-800/80 font-medium">Tỉ lệ 1:50 · Viện St. Jude</span>
      </div>

      {/* Blueprint Visual Surface */}
      <div className="p-3 sm:p-5 bg-[#FAF7F0]">
        <svg
          viewBox="0 0 520 320"
          className="w-full h-auto select-none font-sans"
          style={{ maxHeight: isCompact ? "230px" : "340px" }}
        >
          {/* Grid Background */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E7E2D5" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="520" height="320" fill="url(#grid)" />

          {/* Outer Room Walls */}
          <rect
            x="35"
            y="25"
            width="450"
            height="270"
            rx="6"
            fill="#FFFFFF"
            stroke="#44403C"
            strokeWidth="3.5"
          />

          {/* Dimension indicator */}
          <text x="260" y="18" textAnchor="middle" className="text-[10px] font-mono font-bold fill-stone-500">
            CHIỀU DÀI: 6.50 METERS
          </text>
          <text x="20" y="160" textAnchor="middle" transform="rotate(-90 20 160)" className="text-[10px] font-mono font-bold fill-stone-500">
            CHIỀU RỘNG: 4.20 METERS
          </text>

          {/* 1. Main Wooden Door */}
          <g transform="translate(35, 110)">
            <rect x="-8" y="0" width="8" height="70" fill="#78350F" stroke="#451A03" strokeWidth="1.5" />
            {/* Door Swing Arc */}
            <path
              d="M 0 0 A 70 70 0 0 1 70 70"
              fill="none"
              stroke="#D97706"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
            <rect x="0" y="66" width="70" height="4" fill="#B45309" />
            <text x="14" y="-6" className="text-[10.5px] font-black fill-amber-950">
              🚪 CỬA GỖ (WOODEN DOOR)
            </text>
            <text x="14" y="86" className="text-[9px] font-mono fill-stone-600 font-bold">
              [Chốt khóa từ bên trong]
            </text>
          </g>

          {/* 2. Steel Safe */}
          <g transform="translate(355, 45)">
            <rect
              x="0"
              y="0"
              width="110"
              height="65"
              rx="4"
              fill="#F0F9FF"
              stroke="#0284C7"
              strokeWidth="2"
            />
            {/* Vault Open Door */}
            <line x1="0" y1="0" x2="-25" y2="-20" stroke="#0284C7" strokeWidth="2.5" />
            <text x="55" y="24" textAnchor="middle" className="text-[10.5px] font-black fill-sky-950">
              🔒 KÉT SẮT THÉP
            </text>
            <text x="55" y="40" textAnchor="middle" className="text-[9.5px] font-mono fill-sky-800">
              (Steel Safe)
            </text>
            <text x="55" y="55" textAnchor="middle" className="text-[9px] font-bold fill-red-600">
              [Vị trí để Đề thi Alpha]
            </text>
          </g>

          {/* 3. Ceiling Air Vent */}
          <g transform="translate(415, 205)">
            <rect
              x="0"
              y="0"
              width="60"
              height="70"
              fill="#FEF3C7"
              stroke="#D97706"
              strokeWidth="2"
              strokeDasharray="4 2"
            />
            <line x1="0" y1="0" x2="60" y2="70" stroke="#D97706" strokeWidth="0.8" />
            <line x1="60" y1="0" x2="0" y2="70" stroke="#D97706" strokeWidth="0.8" />
            <text x="30" y="-8" textAnchor="middle" className="text-[10px] font-black fill-amber-950">
              🌀 ỐNG THÔNG GIÓ
            </text>
            <text x="30" y="85" textAnchor="middle" className="text-[9px] font-mono fill-amber-900 font-bold">
              (Ceiling Air Vent)
            </text>
          </g>

          {/* 4. Central Workstation Desk & Prof Vance */}
          <g transform="translate(185, 115)">
            <rect
              x="0"
              y="0"
              width="130"
              height="80"
              rx="4"
              fill="#F5F5F4"
              stroke="#57534E"
              strokeWidth="2"
            />
            {/* Chair */}
            <circle cx="65" cy="40" r="15" fill="#E2E8F0" stroke="#475569" strokeWidth="1.5" />
            <text x="65" y="44" textAnchor="middle" className="text-[9.5px] font-black fill-slate-900">
              GS. Vance
            </text>

            <text x="65" y="-8" textAnchor="middle" className="text-[10.5px] font-black fill-stone-900">
              BÀN LÀM VIỆC TRUNG TÂM
            </text>
            <text x="65" y="70" textAnchor="middle" className="text-[9px] font-mono fill-stone-600 font-medium">
              (Central Desk)
            </text>
          </g>

          {/* 5. Control Panel inside room */}
          <g transform="translate(50, 85)">
            <rect x="0" y="0" width="14" height="18" rx="2" fill="#10B981" stroke="#047857" strokeWidth="1.5" />
            <text x="20" y="13" className="text-[9px] font-mono fill-emerald-950 font-bold">
              Control Panel (Quẹt thẻ)
            </text>
          </g>
        </svg>

        {/* Legend / Key Findings */}
        <div className="mt-3.5 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-amber-200/80 text-[11px] font-semibold text-stone-700">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-800" />
            <span>Cửa gỗ chính</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-sky-600" />
            <span>Két sắt thép</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
            <span>Ống thông gió trần</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />
            <span>Bảng quẹt thẻ trong</span>
          </div>
        </div>
      </div>
    </div>
  );
};
