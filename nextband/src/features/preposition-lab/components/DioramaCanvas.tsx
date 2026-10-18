import React from 'react';
import { PuzzleScenario, SceneActionState } from '../types';

interface DioramaCanvasProps {
  puzzle: PuzzleScenario;
  actionState: SceneActionState;
  onManipulate: () => void;
  snapZone?: 'table' | 'rim' | 'cavity';
  onSnapZoneChange?: (zone: 'table' | 'rim' | 'cavity') => void;
  tiltAngle?: number;
}

export const DioramaCanvas: React.FC<DioramaCanvasProps> = ({
  puzzle,
  actionState,
  onManipulate,
  snapZone = 'cavity',
  onSnapZoneChange,
  tiltAngle = 0,
}) => {
  const isManipulated = actionState === 'manipulated' || actionState === 'revealed';

  // Render specific diorama based on puzzle order (1..5)
  return (
    <div className="relative w-full aspect-[16/10] max-h-[340px] bg-gradient-to-b from-slate-50 via-sky-50/40 to-slate-100 rounded-2xl border border-slate-200/90 shadow-lg overflow-hidden select-none flex flex-col items-center justify-center p-3">
      {/* Background Subtle Modern Lab Grid */}
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Responsive SVG Scene */}
      <svg
        viewBox="0 0 500 300"
        className="w-full h-full max-h-[280px] drop-shadow-sm"
        role="img"
        aria-label={`Interactive 2.5D scene for ${puzzle.title}`}
      >
        <defs>
          <linearGradient id="tableGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f1f5f9" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
          <linearGradient id="bowlCeramic" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>
          <linearGradient id="glassBowl" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.85)" />
            <stop offset="50%" stopColor="rgba(186, 230, 253, 0.45)" />
            <stop offset="100%" stopColor="rgba(125, 211, 252, 0.3)" />
          </linearGradient>
          <linearGradient id="smokeGradient" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#9333ea" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#c084fc" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#e879f9" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="woodTexture" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="50%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#92400e" />
          </linearGradient>
          <linearGradient id="metalNail" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="50%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
          <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Base Tabletop Perspective Surface (Light Birch / Modern Lab Counter) */}
        <polygon
          points="50,220 450,220 410,270 90,270"
          fill="url(#tableGradient)"
          stroke="#94a3b8"
          strokeWidth="1.5"
        />
        {/* Table Bevel Edge */}
        <polygon
          points="90,270 410,270 410,278 90,278"
          fill="#94a3b8"
        />

        {/* SCENARIO 1: PLACEMENT BASICS */}
        {puzzle.order === 1 && (
          <g>
            {/* The Ceramic Bowl (moves right when manipulated) */}
            <g
              className="transition-transform duration-700 ease-out"
              transform={isManipulated ? 'translate(70, 0)' : 'translate(0, 0)'}
            >
              {/* Bowl Shadow */}
              <ellipse cx="250" cy="222" rx="72" ry="16" fill="rgba(0,0,0,0.35)" />
              {/* Bowl Outer Shell */}
              <path
                d="M 180,180 Q 180,225 250,225 Q 320,225 320,180 Z"
                fill="url(#bowlCeramic)"
                stroke="#7dd3fc"
                strokeWidth="1.5"
              />
              {/* Bowl Cavity Inner Rim */}
              <ellipse cx="250" cy="180" rx="70" ry="18" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1" />
              <ellipse cx="250" cy="181" rx="60" ry="13" fill="#075985" />

              {/* The Orange inside the cavity */}
              {snapZone === 'cavity' && (
                <g className="transition-transform duration-300">
                  <circle cx="250" cy="184" r="22" fill="#f97316" stroke="#ea580c" strokeWidth="1.5" />
                  {/* Highlight */}
                  <ellipse cx="244" cy="176" rx="6" ry="4" fill="#fdba74" opacity="0.75" />
                  <circle cx="250" cy="164" r="2.5" fill="#4ade80" />
                  <path d="M 250,164 Q 256,160 258,162" stroke="#16a34a" strokeWidth="1.5" fill="none" />
                </g>
              )}
            </g>

            {/* Optional other snap placements for Orange */}
            {snapZone === 'table' && (
              <g className="transition-transform duration-300">
                <ellipse cx="120" cy="235" rx="18" ry="6" fill="rgba(0,0,0,0.4)" />
                <circle cx="120" cy="220" r="22" fill="#f97316" stroke="#ea580c" strokeWidth="1.5" />
                <ellipse cx="114" cy="212" rx="6" ry="4" fill="#fdba74" opacity="0.75" />
                <circle cx="120" cy="200" r="2.5" fill="#4ade80" />
              </g>
            )}

            {snapZone === 'rim' && (
              <g
                className="transition-transform duration-700 ease-out"
                transform={isManipulated ? 'translate(70, 0)' : 'translate(0, 0)'}
              >
                <circle cx="180" cy="165" r="20" fill="#f97316" stroke="#ea580c" strokeWidth="1.5" />
                <ellipse cx="175" cy="158" rx="5" ry="3" fill="#fdba74" opacity="0.75" />
              </g>
            )}
          </g>
        )}

        {/* SCENARIO 2: OVERFLOWING BOWL (FRUIT STACK) */}
        {puzzle.order === 2 && (
          <g
            className="transition-transform duration-700 ease-out"
            transform={isManipulated ? 'translate(60, 0)' : 'translate(0, 0)'}
          >
            {/* Bowl Shadow */}
            <ellipse cx="240" cy="224" rx="75" ry="18" fill="rgba(0,0,0,0.35)" />
            {/* Bowl Outer Shell */}
            <path
              d="M 165,175 Q 165,225 240,225 Q 315,225 315,175 Z"
              fill="url(#bowlCeramic)"
              stroke="#7dd3fc"
              strokeWidth="1.5"
            />
            <ellipse cx="240" cy="175" rx="75" ry="18" fill="#075985" />

            {/* Cluster of Green Apples sitting in the brim */}
            <circle cx="205" cy="172" r="19" fill="#84cc16" stroke="#65a30d" strokeWidth="1.5" />
            <circle cx="240" cy="174" r="20" fill="#65a30d" stroke="#4d7c0f" strokeWidth="1.5" />
            <circle cx="272" cy="170" r="19" fill="#84cc16" stroke="#65a30d" strokeWidth="1.5" />
            <circle cx="222" cy="155" r="18" fill="#a3e635" stroke="#65a30d" strokeWidth="1.5" />
            <circle cx="258" cy="154" r="18" fill="#84cc16" stroke="#4d7c0f" strokeWidth="1.5" />

            {/* The Top Banana (Subject) arched 40px ABOVE the physical rim */}
            <g
              transform="translate(236, 126) rotate(-8)"
              filter={isManipulated ? 'url(#glowEffect)' : undefined}
            >
              <path
                d="M -45,0 Q 0,-22 45,10 Q 0,-5 -45,0 Z"
                fill="#eab308"
                stroke="#ca8a04"
                strokeWidth="2.5"
              />
              {/* Banana Tips */}
              <circle cx="-45" cy="0" r="3" fill="#713f12" />
              <circle cx="45" cy="10" r="3.5" fill="#713f12" />
            </g>

            {/* Visual Guide: Dotted boundary of physical rim */}
            <line
              x1="150"
              y1="175"
              x2="330"
              y2="175"
              stroke="#38bdf8"
              strokeDasharray="4 4"
              strokeWidth="1.2"
              opacity="0.6"
            />
            <text x="335" y="179" fill="#38bdf8" fontSize="10" fontFamily="sans-serif">
              Rim level
            </text>
          </g>
        )}

        {/* SCENARIO 3: COVER OR CONTAINER (INVERTED BOWL & APPLE) */}
        {puzzle.order === 3 && (
          <g>
            {/* The Red Apple on Tabletop (Subject remains stationary) */}
            <g>
              <ellipse cx="250" cy="222" rx="18" ry="6" fill="rgba(0,0,0,0.4)" />
              <circle cx="250" cy="208" r="21" fill="#ef4444" stroke="#dc2626" strokeWidth="1.5" />
              <ellipse cx="244" cy="200" rx="6" ry="4" fill="#fca5a5" opacity="0.75" />
              <path d="M 250,188 Q 252,180 256,182" stroke="#78350f" strokeWidth="2" fill="none" />
              <circle cx="257" cy="182" r="2" fill="#22c55e" />
            </g>

            {/* The Inverted Bowl (Lifts 80px straight up when manipulated) */}
            <g
              className="transition-transform duration-700 ease-out"
              transform={isManipulated ? 'translate(0, -85)' : 'translate(0, 0)'}
            >
              {/* Bowl Shadow (shrinks when lifted) */}
              <ellipse
                cx="250"
                cy="222"
                rx={isManipulated ? '40' : '75'}
                ry={isManipulated ? '8' : '16'}
                fill="rgba(0,0,0,0.3)"
                opacity={isManipulated ? 0.3 : 0.7}
              />
              {/* Inverted Ceramic Bowl Body */}
              <path
                d="M 175,220 Q 175,160 250,160 Q 325,160 325,220 Z"
                fill="url(#glassBowl)"
                stroke="#38bdf8"
                strokeWidth="2"
              />
              {/* Inverted Base Ring on top */}
              <ellipse cx="250" cy="160" rx="30" ry="7" fill="#0284c7" stroke="#7dd3fc" strokeWidth="1.5" />
              {/* Rim on table */}
              <ellipse cx="250" cy="220" rx="75" ry="14" fill="none" stroke="#7dd3fc" strokeWidth="1.5" />
            </g>

            {/* Indicator label when lifted */}
            {isManipulated && (
              <g className="transition-opacity duration-500">
                <line x1="250" y1="130" x2="250" y2="150" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)" />
                <rect x="175" y="95" width="150" height="26" rx="6" fill="#ffffff" stroke="#f59e0b" strokeWidth="1.5" className="drop-shadow-sm" />
                <text x="250" y="112" fill="#b45309" fontSize="11" textAnchor="middle" fontWeight="bold">
                  Bát nhấc lên: Táo ở lại bàn!
                </text>
              </g>
            )}
          </g>
        )}

        {/* SCENARIO 4: THE SMOKE CHALLENGE (TRAPPED ESCAPE) */}
        {puzzle.order === 4 && (
          <g>
            {/* Table Shadow */}
            <ellipse cx="250" cy="222" rx="75" ry="16" fill="rgba(0,0,0,0.3)" />

            {/* Inverted Glass Bowl & Trapped Smoke */}
            <g
              className="transition-transform duration-700 ease-out"
              transform={isManipulated || tiltAngle > 0 ? 'rotate(-16 325 220)' : 'rotate(0 325 220)'}
            >
              {/* Smoke clouds inside inverted bowl */}
              <path
                d="M 185,215 Q 185,165 250,165 Q 315,165 315,215 Z"
                fill="url(#smokeGradient)"
              />
              <circle cx="230" cy="195" r="18" fill="#c084fc" opacity="0.6" filter="url(#glowEffect)" />
              <circle cx="270" cy="190" r="22" fill="#d8b4fe" opacity="0.5" filter="url(#glowEffect)" />
              <circle cx="250" cy="180" r="16" fill="#e9d5ff" opacity="0.7" />

              {/* The Glass Inverted Dome with crisp reflections */}
              <path
                d="M 175,220 Q 175,155 250,155 Q 325,155 325,220 Z"
                fill="url(#glassBowl)"
                stroke="#0284c7"
                strokeWidth="2.5"
              />
              {/* Top Glass Foot Ring */}
              <ellipse cx="250" cy="155" rx="28" ry="7" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" />
              {/* Bottom Rim */}
              <ellipse cx="250" cy="220" rx="75" ry="14" fill="none" stroke="#0369a1" strokeWidth="2.5" />
            </g>

            {/* Escaping Smoke wisps when tilted or manipulated */}
            {(isManipulated || tiltAngle > 0) && (
              <g className="transition-opacity duration-500 animate-pulse">
                <path
                  d="M 170,215 Q 130,190 120,150 Q 110,110 140,80"
                  stroke="#9333ea"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.85"
                />
                <circle cx="130" cy="140" r="12" fill="#c084fc" opacity="0.8" />
                <circle cx="140" cy="80" r="16" fill="#d8b4fe" opacity="0.7" />
                <rect x="40" y="80" width="130" height="28" rx="8" fill="#581c87" stroke="#e9d5ff" strokeWidth="1.5" />
                <text x="105" y="98" fill="#ffffff" fontSize="12" textAnchor="middle" fontWeight="bold">
                  Khói thoát ra ngoài!
                </text>
              </g>
            )}

            {!isManipulated && tiltAngle === 0 && (
              <g>
                <rect x="175" y="98" width="150" height="26" rx="8" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" className="drop-shadow-sm" />
                <text x="250" y="115" fill="#0369a1" fontSize="11" textAnchor="middle" fontWeight="bold">
                  Bát úp kín: Khói bị nhốt
                </text>
              </g>
            )}
          </g>
        )}

        {/* SCENARIO 5: THE TRANSFER TEST (PROTRUDING NAIL IN WOOD) */}
        {puzzle.order === 5 && (
          <g
            className="transition-transform duration-700 ease-out"
            transform={isManipulated ? 'translate(65, 0)' : 'translate(0, 0)'}
          >
            {/* Wooden Plank Shadow */}
            <rect x="180" y="240" width="160" height="15" rx="6" fill="rgba(0,0,0,0.3)" />

            {/* Wooden Plank (3D Isometric Box) */}
            <g>
              {/* Top face */}
              <polygon points="180,180 340,180 320,160 160,160" fill="#b45309" stroke="#92400e" strokeWidth="1" />
              {/* Front face */}
              <rect x="180" y="180" width="160" height="60" rx="4" fill="url(#woodTexture)" stroke="#78350f" strokeWidth="1.5" />
              {/* Wood Grain Lines */}
              <path d="M 190,195 Q 240,192 330,196" stroke="#78350f" strokeWidth="1" opacity="0.6" fill="none" />
              <path d="M 190,215 Q 260,218 330,214" stroke="#78350f" strokeWidth="1" opacity="0.6" fill="none" />
            </g>

            {/* The Iron Nail: 30% embedded in the wood, 70% protruding to the left */}
            <g>
              {/* Protruding 70% Shaft in Air */}
              <rect x="80" y="196" width="100" height="8" rx="2" fill="url(#metalNail)" stroke="#334155" strokeWidth="1" />
              {/* Flat Nail Head */}
              <rect x="75" y="193" width="7" height="14" rx="1.5" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />

              {/* Grip Entry Point Hole on Wood Surface */}
              <ellipse cx="180" cy="200" rx="4" ry="7" fill="#451a03" />

              {/* Embedded 30% Tip (Ghost line inside the wood to show grip) */}
              <rect
                x="180"
                y="197"
                width="42"
                height="6"
                fill="#475569"
                stroke="#fbbf24"
                strokeDasharray="2 2"
                strokeWidth="1.5"
                opacity="0.85"
              />
            </g>

            {/* Dimensional Callouts */}
            <line x1="80" y1="184" x2="178" y2="184" stroke="#94a3b8" strokeWidth="1" />
            <text x="129" y="178" fill="#94a3b8" fontSize="10" textAnchor="middle">
              70% in air
            </text>

            <line x1="180" y1="184" x2="222" y2="184" stroke="#fbbf24" strokeWidth="1" />
            <text x="201" y="178" fill="#fbbf24" fontSize="10" textAnchor="middle" fontWeight="bold">
              Grip
            </text>
          </g>
        )}
      </svg>

      {/* Interactive Controls Overlay Bar */}
      <div className="mt-2 w-full flex items-center justify-between px-2 gap-2 text-xs">
        <div className="flex items-center gap-1.5 text-slate-500">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold tracking-wide">
            {isManipulated ? 'Đã chạy mô phỏng' : 'Sẵn sàng tương tác'}
          </span>
        </div>

        {/* Action Button to test movement */}
        <button
          type="button"
          onClick={onManipulate}
          className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 active:scale-95 text-white font-bold shadow-md hover:shadow-sky-500/20 transition-all flex items-center gap-1.5 text-xs touch-manipulation cursor-pointer"
        >
          {puzzle.order === 1 && (isManipulated ? 'Đặt lại vị trí' : 'Đẩy trượt cái bát ➔')}
          {puzzle.order === 2 && (isManipulated ? 'Đặt lại vị trí' : 'Đẩy trượt cái bát ➔')}
          {puzzle.order === 3 && (isManipulated ? 'Hạ bát xuống' : 'Nhấc bổng bát lên ⬆️')}
          {puzzle.order === 4 && (isManipulated ? 'Úp kín bát lại' : 'Nhấc nghiêng mép bát ↗️')}
          {puzzle.order === 5 && (isManipulated ? 'Đặt lại thanh gỗ' : 'Trượt thanh gỗ ➔')}
        </button>
      </div>

      {/* Snap Zone Selector for Puzzle 1 */}
      {puzzle.order === 1 && onSnapZoneChange && (
        <div className="absolute top-3 left-3 flex gap-1.5 bg-white/95 p-1 rounded-xl border border-slate-300 shadow-sm backdrop-blur-sm text-[11px]">
          <span className="text-slate-500 px-1 py-0.5 font-medium">Vị trí:</span>
          {(['cavity', 'rim', 'table'] as const).map((zone) => (
            <button
              key={zone}
              type="button"
              onClick={() => onSnapZoneChange(zone)}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                snapZone === zone
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {zone === 'cavity' ? 'Trong lòng bát' : zone === 'rim' ? 'Trên mép vành' : 'Trên mặt bàn'}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
