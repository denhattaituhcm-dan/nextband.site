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
      className={`rounded-2xl border border-stone-300/80 bg-[#FAF9F6] text-stone-900 overflow-hidden shadow-xs ${className}`}
    >
      {/* Blueprint Header */}
      <div className="flex items-center justify-between border-b border-stone-200 bg-stone-100/80 px-3.5 py-2">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-stone-700">
            DIAGRAM 01 · ARCHIVE ROOM B-12 (MẶT BẰNG HIỆN TRƯỜNG)
          </span>
        </div>
        <span className="font-mono text-[10px] text-stone-400">Scale: 1:50 | St. Jude Archive</span>
      </div>

      {/* Blueprint Visual Surface */}
      <div className="p-3 sm:p-4">
        <svg
          viewBox="0 0 520 320"
          className="w-full h-auto select-none font-sans"
          style={{ maxHeight: isCompact ? "220px" : "320px" }}
        >
          {/* Outer Room Walls */}
          <rect
            x="30"
            y="25"
            width="460"
            height="270"
            rx="6"
            fill="#FFFFFF"
            stroke="#44403C"
            strokeWidth="3.5"
          />

          {/* Dimension indicator */}
          <text x="260" y="18" textAnchor="middle" className="text-[10px] font-mono fill-stone-400">
            6.50 METERS
          </text>
          <text x="18" y="160" textAnchor="middle" transform="rotate(-90 18 160)" className="text-[10px] font-mono fill-stone-400">
            4.20 METERS
          </text>

          {/* 1. Main Wooden Door */}
          <g transform="translate(30, 110)">
            <rect x="-8" y="0" width="8" height="70" fill="#78350F" stroke="#451A03" strokeWidth="1.5" />
            {/* Door Swing Arc */}
            <path
              d="M 0 0 A 70 70 0 0 1 70 70"
              fill="none"
              stroke="#D97706"
              strokeWidth="1.2"
              strokeDasharray="3 3"
            />
            <rect x="0" y="66" width="70" height="4" fill="#B45309" />
            <text x="12" y="-6" className="text-[10px] font-bold fill-amber-900">
              CỬA GỖ (WOODEN DOOR)
            </text>
            <text x="12" y="86" className="text-[9px] font-mono fill-red-600 font-bold">
              [LOCKED] Khóa chốt từ bên trong
            </text>
          </g>

          {/* 2. Steel Safe */}
          <g transform="translate(360, 45)">
            <rect
              x="0"
              y="0"
              width="105"
              height="65"
              rx="4"
              fill="#F5F5F4"
              stroke="#0284C7"
              strokeWidth="2"
            />
            {/* Vault Open Door */}
            <line x1="0" y1="0" x2="-25" y2="-20" stroke="#0284C7" strokeWidth="2.5" />
            <text x="52" y="24" textAnchor="middle" className="text-[10px] font-bold fill-sky-900">
              KÉT SẮT THÉP
            </text>
            <text x="52" y="38" textAnchor="middle" className="text-[9px] font-mono fill-stone-500">
              (Steel Safe)
            </text>
            <text x="52" y="52" textAnchor="middle" className="text-[9px] font-bold fill-red-600">
              ● MỞ TOANG (OPEN)
            </text>
          </g>

          {/* 3. Ceiling Air Vent */}
          <g transform="translate(420, 210)">
            <rect
              x="0"
              y="0"
              width="55"
              height="65"
              fill="#FEF3C7"
              stroke="#D97706"
              strokeWidth="2"
              strokeDasharray="4 2"
            />
            <line x1="0" y1="0" x2="55" y2="65" stroke="#D97706" strokeWidth="0.8" />
            <line x1="55" y1="0" x2="0" y2="65" stroke="#D97706" strokeWidth="0.8" />
            <text x="27" y="-8" textAnchor="middle" className="text-[9.5px] font-bold fill-amber-950">
              ỐNG THÔNG GIÓ
            </text>
            <text x="27" y="80" textAnchor="middle" className="text-[9px] font-mono fill-amber-800 font-bold">
              30 × 40 CM
            </text>
          </g>

          {/* 4. Central Workstation Desk & Prof Vance */}
          <g transform="translate(190, 120)">
            <rect
              x="0"
              y="0"
              width="120"
              height="75"
              rx="4"
              fill="#E7E5E4"
              stroke="#57534E"
              strokeWidth="1.8"
            />
            {/* Chair */}
            <circle cx="60" cy="37" r="14" fill="#CBD5E1" stroke="#475569" strokeWidth="1.2" />
            <text x="60" y="41" textAnchor="middle" className="text-[9px] font-bold fill-slate-800">
              GS. Vance
            </text>

            <text x="60" y="-8" textAnchor="middle" className="text-[10px] font-bold fill-stone-800">
              BÀN LÀM VIỆC TRUNG TÂM
            </text>
            <text x="60" y="65" textAnchor="middle" className="text-[8.5px] font-mono fill-red-700 font-bold">
              (Bất tỉnh / Unconscious)
            </text>
          </g>

          {/* 5. Control Panel inside room */}
          <g transform="translate(45, 90)">
            <rect x="0" y="0" width="12" height="15" rx="2" fill="#10B981" stroke="#047857" strokeWidth="1" />
            <text x="18" y="11" className="text-[8.5px] font-mono fill-emerald-800 font-semibold">
              Control Panel
            </text>
          </g>
        </svg>

        {/* Legend / Key Findings */}
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2.5 border-t border-stone-200 text-[10px] font-medium text-stone-600">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-700" />
            <span>Cửa gỗ: Khóa chốt từ</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-sky-600" />
            <span>Két sắt: Bị mở toang</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            <span>Ống gió: Rộng 30x40cm</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-600" />
            <span>Bảng điều khiển quẹt thẻ</span>
          </div>
        </div>
      </div>
    </div>
  );
};
