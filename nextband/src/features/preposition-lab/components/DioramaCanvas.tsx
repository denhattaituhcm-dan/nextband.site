import React from 'react';
import { PuzzleScenario, SceneActionState, PrepositionId, AssessmentFit } from '../types';
import { soundEffects } from '../utils/soundEffects';

interface DioramaCanvasProps {
  puzzle: PuzzleScenario;
  actionState: SceneActionState;
  onManipulate: () => void;
  snapZone?: 'table' | 'rim' | 'cavity';
  onSnapZoneChange?: (zone: 'table' | 'rim' | 'cavity') => void;
  tiltAngle?: number;
  selectedOptionId?: PrepositionId | null;
  selectedOptionFit?: AssessmentFit | null;
  hasTestedPrediction?: boolean;
}

export const DioramaCanvas: React.FC<DioramaCanvasProps> = ({
  puzzle,
  actionState,
  onManipulate,
  snapZone = 'cavity',
  onSnapZoneChange,
  tiltAngle = 0,
  selectedOptionId = null,
  selectedOptionFit = null,
  hasTestedPrediction = false,
}) => {
  const isManipulated = actionState === 'manipulated' || actionState === 'revealed';

  // State for tactile interactive dragging with spring & velocity
  const [dragOffset, setDragOffset] = React.useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = React.useState(false);
  const [isSpringReleasing, setIsSpringReleasing] = React.useState(false);
  const lastVelocity = React.useRef({ x: 0, y: 0 });
  const lastPos = React.useRef({ x: 0, y: 0, time: 0 });

  // Reset drag offset when puzzle changes
  React.useEffect(() => {
    setDragOffset({ x: 0, y: 0 });
    setIsDragging(false);
    setIsSpringReleasing(false);
  }, [puzzle.id]);

  const handlePointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    setIsDragging(true);
    setIsSpringReleasing(false);
    lastPos.current = { x: e.clientX, y: e.clientY, time: performance.now() };

    // Play appropriate sound depending on scenario
    if (puzzle.order === 5) {
      soundEffects.playClink();
    } else {
      soundEffects.playPickUp();
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const now = performance.now();
    const dt = Math.max(1, now - lastPos.current.time);
    lastVelocity.current = {
      x: ((e.clientX - lastPos.current.x) / dt) * 16,
      y: ((e.clientY - lastPos.current.y) / dt) * 16,
    };
    lastPos.current = { x: e.clientX, y: e.clientY, time: now };

    setDragOffset((prev) => {
      // Elastic rubber-band resistance near boundaries
      const newX = Math.max(-110, Math.min(110, prev.x + e.movementX));
      const newY = Math.max(-95, Math.min(15, prev.y + e.movementY));
      return { x: newX, y: newY };
    });

    // Sound effect on aggressive dragging/escaping
    if (puzzle.order === 4 && dragOffset.y < -30 && Math.abs(lastVelocity.current.y) > 4) {
      soundEffects.playWhoosh();
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    (e.target as Element).releasePointerCapture?.(e.pointerId);

    // Spring elastic snap back
    setIsSpringReleasing(true);
    soundEffects.playSnap();

    // Smoothly bounce back after short spring effect
    setTimeout(() => {
      setDragOffset({ x: 0, y: 0 });
      setIsSpringReleasing(false);
    }, 450);
  };

  // Check if player selected a specific misconception for dramatic physics
  const isAboveFailure = hasTestedPrediction && puzzle.order === 2 && selectedOptionId === 'above';
  const isAppleInFailure = hasTestedPrediction && puzzle.order === 3 && selectedOptionId === 'in';
  const isSmokeUnderFailure = hasTestedPrediction && puzzle.order === 4 && selectedOptionId === 'under';
  const isNailOnFailure = hasTestedPrediction && puzzle.order === 5 && selectedOptionId === 'on';

  return (
    <div className="relative w-full aspect-[16/10] max-h-[340px] bg-gradient-to-b from-slate-50 via-sky-50/40 to-slate-100 rounded-2xl border border-slate-200/90 shadow-lg overflow-hidden select-none flex flex-col items-center justify-center p-3">
      {/* Background Subtle Modern Lab Grid */}
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Responsive SVG Scene */}
      <svg
        viewBox="0 0 500 300"
        className="w-full h-full max-h-[280px] drop-shadow-sm cursor-grab active:cursor-grabbing touch-none"
        role="img"
        aria-label={`Interactive 2.5D scene for ${puzzle.title}`}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
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
            {/* The Ceramic Bowl (movable by drag or action button) */}
            <g
              className={
                isDragging
                  ? ''
                  : isSpringReleasing
                  ? 'transition-transform duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]'
                  : 'transition-transform duration-700 ease-out'
              }
              transform={`translate(${isManipulated ? 70 : dragOffset.x}, 0)`}
              onPointerDown={handlePointerDown}
            >
              {/* Bowl Shadow */}
              <ellipse cx="250" cy="222" rx="72" ry="16" fill="rgba(0,0,0,0.15)" />
              {/* Bowl Outer Shell */}
              <path
                d="M 180,180 Q 180,225 250,225 Q 320,225 320,180 Z"
                fill="url(#bowlCeramic)"
                stroke="#0284c7"
                strokeWidth="2"
              />
              {/* Bowl Cavity Inner Rim */}
              <ellipse cx="250" cy="180" rx="70" ry="18" fill="#0369a1" stroke="#38bdf8" strokeWidth="1" />
              <ellipse cx="250" cy="181" rx="60" ry="13" fill="#0c4a6e" />

              {/* The Orange inside the cavity */}
              {snapZone === 'cavity' && (
                <g className="transition-transform duration-300">
                  <circle cx="250" cy="184" r="22" fill="#f97316" stroke="#ea580c" strokeWidth="1.5" />
                  <ellipse cx="244" cy="176" rx="6" ry="4" fill="#fdba74" opacity="0.85" />
                  <circle cx="250" cy="164" r="2.5" fill="#4ade80" />
                  <path d="M 250,164 Q 256,160 258,162" stroke="#16a34a" strokeWidth="1.5" fill="none" />
                </g>
              )}
            </g>

            {/* Orange on table */}
            {snapZone === 'table' && (
              <g className="transition-transform duration-300">
                <ellipse cx="120" cy="235" rx="18" ry="6" fill="rgba(0,0,0,0.2)" />
                <circle cx="120" cy="220" r="22" fill="#f97316" stroke="#ea580c" strokeWidth="1.5" />
                <ellipse cx="114" cy="212" rx="6" ry="4" fill="#fdba74" opacity="0.85" />
                <circle cx="120" cy="200" r="2.5" fill="#4ade80" />
              </g>
            )}

            {/* Orange on rim */}
            {snapZone === 'rim' && (
              <g
                className={
                isDragging
                  ? ''
                  : isSpringReleasing
                  ? 'transition-transform duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]'
                  : 'transition-transform duration-700 ease-out'
              }
                transform={`translate(${isManipulated ? 70 : dragOffset.x}, 0)`}
              >
                <circle cx="180" cy="165" r="20" fill="#f97316" stroke="#ea580c" strokeWidth="1.5" />
                <ellipse cx="175" cy="158" rx="5" ry="3" fill="#fdba74" opacity="0.85" />
              </g>
            )}
          </g>
        )}

        {/* SCENARIO 2: OVERFLOWING BOWL (FRUIT STACK) */}
        {puzzle.order === 2 && (
          <g>
            {/* The Bowl and Lower Fruits */}
            <g
              className={
                isDragging
                  ? ''
                  : isSpringReleasing
                  ? 'transition-transform duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]'
                  : 'transition-transform duration-700 ease-out'
              }
              transform={`translate(${isManipulated ? 70 : dragOffset.x}, 0)`}
              onPointerDown={handlePointerDown}
            >
              {/* Bowl Shadow */}
              <ellipse cx="240" cy="224" rx="75" ry="18" fill="rgba(0,0,0,0.15)" />
              {/* Bowl Outer Shell */}
              <path
                d="M 165,175 Q 165,225 240,225 Q 315,225 315,175 Z"
                fill="url(#bowlCeramic)"
                stroke="#0284c7"
                strokeWidth="2"
              />
              <ellipse cx="240" cy="175" rx="75" ry="18" fill="#075985" />

              {/* Cluster of Green Apples */}
              <circle cx="205" cy="172" r="19" fill="#84cc16" stroke="#4d7c0f" strokeWidth="1.5" />
              <circle cx="240" cy="174" r="20" fill="#65a30d" stroke="#3f6212" strokeWidth="1.5" />
              <circle cx="272" cy="170" r="19" fill="#84cc16" stroke="#4d7c0f" strokeWidth="1.5" />
              <circle cx="222" cy="155" r="18" fill="#a3e635" stroke="#4d7c0f" strokeWidth="1.5" />
              <circle cx="258" cy="154" r="18" fill="#84cc16" stroke="#3f6212" strokeWidth="1.5" />

              {/* CANONICAL BEHAVIOR: Banana travels with the bowl */}
              {!isAboveFailure && (
                <g
                  transform="translate(236, 126) rotate(-8)"
                  filter={isManipulated ? 'url(#glowEffect)' : undefined}
                >
                  <path
                    d="M -45,0 Q 0,-22 45,10 Q 0,-5 -45,0 Z"
                    fill="#eab308"
                    stroke="#a16207"
                    strokeWidth="2.5"
                  />
                  <circle cx="-45" cy="0" r="3" fill="#713f12" />
                  <circle cx="45" cy="10" r="3.5" fill="#713f12" />
                </g>
              )}
            </g>

            {/* DRAMATIC FAILURE IF CHOSE 'ABOVE': Banana stays suspended in mid-air then drops! */}
            {isAboveFailure && (
              <g className="animate-bounce">
                <g transform="translate(236, 126) rotate(-8)">
                  <path
                    d="M -45,0 Q 0,-22 45,10 Q 0,-5 -45,0 Z"
                    fill="#eab308"
                    stroke="#a16207"
                    strokeWidth="2.5"
                  />
                  <circle cx="-45" cy="0" r="3" fill="#713f12" />
                  <circle cx="45" cy="10" r="3.5" fill="#713f12" />
                </g>
                <text x="236" y="105" fill="#dc2626" fontSize="11" textAnchor="middle" fontWeight="black">
                  👻 Quả chuối lơ lửng nếu là ABOVE!
                </text>
              </g>
            )}

            {/* Visual Guide: Dotted boundary of physical rim */}
            <line
              x1="150"
              y1="175"
              x2="330"
              y2="175"
              stroke="#0284c7"
              strokeDasharray="4 4"
              strokeWidth="1.5"
              opacity="0.7"
            />
            <text x="335" y="179" fill="#0284c7" fontSize="10" fontFamily="sans-serif" fontWeight="bold">
              Vành miệng bát
            </text>
          </g>
        )}

        {/* SCENARIO 3: COVER OR CONTAINER (INVERTED BOWL & APPLE) */}
        {puzzle.order === 3 && (
          <g>
            {/* The Red Apple on Tabletop (Subject remains stationary on table) */}
            {/* If player wrongly picked 'IN', apple levitates awkwardly with the bowl before dropping! */}
            <g
              className={isAppleInFailure ? 'animate-bounce' : ''}
              transform={
                isAppleInFailure
                  ? `translate(0, ${isManipulated ? -65 : dragOffset.y * 0.7})`
                  : 'translate(0, 0)'
              }
            >
              <ellipse cx="250" cy="222" rx="18" ry="6" fill="rgba(0,0,0,0.4)" />
              <circle cx="250" cy="208" r="21" fill="#ef4444" stroke="#dc2626" strokeWidth="1.5" />
              <ellipse cx="244" cy="200" rx="6" ry="4" fill="#fca5a5" opacity="0.75" />
              <path d="M 250,188 Q 252,180 256,182" stroke="#78350f" strokeWidth="2" fill="none" />
              <circle cx="257" cy="182" r="2" fill="#22c55e" />

              {isAppleInFailure && (
                <text x="250" y="172" fill="#dc2626" fontSize="10" textAnchor="middle" fontWeight="black">
                  ❌ Táo không thể dính theo bát nếu chỉ là úp lên!
                </text>
              )}
            </g>

            {/* The Inverted Bowl (Lifts straight up or responds to pointer drag) */}
            <g
              className={
                isDragging
                  ? ''
                  : isSpringReleasing
                  ? 'transition-transform duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] cursor-grab active:cursor-grabbing'
                  : 'transition-transform duration-700 ease-out cursor-grab active:cursor-grabbing'
              }
              transform={`translate(0, ${isManipulated ? -85 : Math.min(0, dragOffset.y)})`}
              onPointerDown={handlePointerDown}
            >
              {/* Bowl Shadow (shrinks when lifted) */}
              <ellipse
                cx="250"
                cy="222"
                rx={isManipulated || dragOffset.y < -20 ? '40' : '75'}
                ry={isManipulated || dragOffset.y < -20 ? '8' : '16'}
                fill="rgba(0,0,0,0.3)"
                opacity={isManipulated || dragOffset.y < -20 ? 0.3 : 0.7}
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

            {/* Canonical indicator when lifted properly under */}
            {(isManipulated || dragOffset.y < -30) && !isAppleInFailure && (
              <g className="transition-opacity duration-500">
                <rect x="170" y="85" width="160" height="26" rx="6" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" className="drop-shadow-sm" />
                <text x="250" y="102" fill="#0284c7" fontSize="11" textAnchor="middle" fontWeight="bold">
                  Bát nhấc lên ➔ Táo ở lại bàn (UNDER)
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
              className={
                isDragging
                  ? ''
                  : isSpringReleasing
                  ? 'transition-transform duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] cursor-grab active:cursor-grabbing'
                  : 'transition-transform duration-700 ease-out cursor-grab active:cursor-grabbing'
              }
              transform={
                isManipulated || tiltAngle > 0
                  ? 'rotate(-16 325 220)'
                  : dragOffset.y < -10
                  ? `rotate(${Math.max(-25, dragOffset.y * 0.4)} 325 220)`
                  : 'rotate(0 325 220)'
              }
              onPointerDown={handlePointerDown}
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
            {(isManipulated || tiltAngle > 0 || dragOffset.y < -15) && (
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

                {isSmokeUnderFailure ? (
                  <g>
                    <rect x="25" y="75" width="160" height="34" rx="8" fill="#ef4444" stroke="#fca5a5" strokeWidth="1.5" />
                    <text x="105" y="90" fill="#ffffff" fontSize="11" textAnchor="middle" fontWeight="bold">
                      Khí bay lên & thoát mất!
                    </text>
                    <text x="105" y="103" fill="#fef2f2" fontSize="9" textAnchor="middle">
                      UNDER không giam được khí nhẹ
                    </text>
                  </g>
                ) : (
                  <g>
                    <rect x="40" y="80" width="130" height="28" rx="8" fill="#581c87" stroke="#e9d5ff" strokeWidth="1.5" />
                    <text x="105" y="98" fill="#ffffff" fontSize="12" textAnchor="middle" fontWeight="bold">
                      Khói thoát ra ngoài!
                    </text>
                  </g>
                )}
              </g>
            )}

            {!isManipulated && tiltAngle === 0 && dragOffset.y >= -15 && (
              <g>
                <rect x="175" y="98" width="150" height="26" rx="8" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" className="drop-shadow-sm" />
                <text x="250" y="115" fill="#0369a1" fontSize="11" textAnchor="middle" fontWeight="bold">
                  Bát úp kín: Khói bị nhốt (IN)
                </text>
              </g>
            )}
          </g>
        )}

        {/* SCENARIO 5: THE TRANSFER TEST (PROTRUDING NAIL IN WOOD) */}
        {puzzle.order === 5 && (
          <g>
            {/* The Moving Wood Plank */}
            <g
              className={
                isDragging
                  ? ''
                  : isSpringReleasing
                  ? 'transition-transform duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] cursor-grab active:cursor-grabbing'
                  : 'transition-transform duration-700 ease-out cursor-grab active:cursor-grabbing'
              }
              transform={`translate(${isManipulated ? 65 : dragOffset.x}, 0)`}
              onPointerDown={handlePointerDown}
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

              {/* Grip Entry Point Hole on Wood Surface */}
              <ellipse cx="180" cy="200" rx="4" ry="7" fill="#451a03" />

              {/* Embedded 30% Tip (Grip line inside the wood) */}
              {!isNailOnFailure && (
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
              )}

              {/* CANONICAL BEHAVIOR: Nail is locked in wood and moves with it */}
              {!isNailOnFailure && (
                <g>
                  {/* Protruding 70% Shaft in Air */}
                  <rect x="80" y="196" width="100" height="8" rx="2" fill="url(#metalNail)" stroke="#334155" strokeWidth="1" />
                  {/* Flat Nail Head */}
                  <rect x="75" y="193" width="7" height="14" rx="1.5" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
                </g>
              )}
            </g>

            {/* DRAMATIC FAILURE IF CHOSE 'ON': Nail slips off surface and drops to table! */}
            {isNailOnFailure && (
              <g className="animate-bounce">
                {/* Disconnected nail slipping on table surface */}
                <g transform="translate(110, 225) rotate(15)">
                  <rect x="0" y="0" width="100" height="8" rx="2" fill="url(#metalNail)" stroke="#334155" strokeWidth="1" />
                  <rect x="-5" y="-3" width="7" height="14" rx="1.5" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
                </g>
                <rect x="70" y="140" width="170" height="30" rx="6" fill="#ef4444" stroke="#fca5a5" strokeWidth="1.5" />
                <text x="155" y="159" fill="#ffffff" fontSize="11" textAnchor="middle" fontWeight="bold">
                  ❌ Nếu là ON, đinh sẽ trượt rơi!
                </text>
              </g>
            )}

            {/* Dimensional Callouts */}
            {!isNailOnFailure && (
              <g>
                <line x1="80" y1="184" x2="178" y2="184" stroke="#94a3b8" strokeWidth="1" />
                <text x="129" y="178" fill="#94a3b8" fontSize="10" textAnchor="middle">
                  70% thò ra ngoài
                </text>

                <line x1="180" y1="184" x2="222" y2="184" stroke="#fbbf24" strokeWidth="1" />
                <text x="201" y="178" fill="#fbbf24" fontSize="10" textAnchor="middle" fontWeight="bold">
                  Khóa chặt (IN)
                </text>
              </g>
            )}
          </g>
        )}

        {/* SCENARIO LEVEL 2: SCENARIO 1 - THE WALL & THE PICTURE */}
        {puzzle.id === 'p2-1-wall-and-picture' && (
          <g>
            {/* 3D Brick Wall Perspective Section */}
            <g>
              {/* Wall Surface (Vertical plane) */}
              <rect x="140" y="70" width="220" height="150" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" />
              {/* Subtle mortar lines */}
              <line x1="140" y1="120" x2="360" y2="120" stroke="#e2e8f0" strokeWidth="1.5" />
              <line x1="140" y1="170" x2="360" y2="170" stroke="#e2e8f0" strokeWidth="1.5" />
              <line x1="250" y1="70" x2="250" y2="120" stroke="#e2e8f0" strokeWidth="1.5" />
              <line x1="200" y1="120" x2="200" y2="170" stroke="#e2e8f0" strokeWidth="1.5" />
              <line x1="300" y1="120" x2="300" y2="170" stroke="#e2e8f0" strokeWidth="1.5" />
            </g>

            {/* The Framed Painting (draggable against the wall) */}
            <g
              className={
                isDragging
                  ? ''
                  : isSpringReleasing
                  ? 'transition-transform duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] cursor-grab active:cursor-grabbing'
                  : 'transition-transform duration-700 ease-out cursor-grab active:cursor-grabbing'
              }
              transform={`translate(${dragOffset.x}, ${isManipulated ? -20 : dragOffset.y})`}
              onPointerDown={handlePointerDown}
            >
              {/* Frame Drop Shadow */}
              <rect x="202" y="97" width="96" height="76" rx="4" fill="rgba(0,0,0,0.15)" />
              {/* Wooden Frame */}
              <rect x="200" y="95" width="96" height="76" rx="4" fill="#b45309" stroke="#78350f" strokeWidth="2" />
              {/* Canvas Art */}
              <rect x="208" y="103" width="80" height="60" rx="2" fill="#38bdf8" />
              <circle cx="230" cy="120" r="12" fill="#facc15" />
              <polygon points="212,158 240,135 260,158" fill="#15803d" />
              <polygon points="245,158 268,140 286,158" fill="#166534" />
              {/* Hanging Cord */}
              <line x1="248" y1="85" x2="235" y2="95" stroke="#475569" strokeWidth="1.5" />
              <line x1="248" y1="85" x2="261" y2="95" stroke="#475569" strokeWidth="1.5" />
              <circle cx="248" cy="85" r="3" fill="#334155" />
            </g>

            {/* Label callout */}
            <rect x="180" y="235" width="140" height="24" rx="6" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
            <text x="250" y="251" fill="#475569" fontSize="10" textAnchor="middle" fontWeight="bold">
              Tì lên bề mặt phẳng (ON)
            </text>
          </g>
        )}

        {/* SCENARIO LEVEL 2: SCENARIO 2 - THE TABLETOP SPILL */}
        {puzzle.id === 'p2-2-tabletop-spill' && (
          <g>
            {/* Table Surface */}
            <polygon points="80,140 420,140 370,240 130,240" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />

            {/* Spilled Glass */}
            <g
              className={
                isDragging
                  ? ''
                  : isSpringReleasing
                  ? 'transition-transform duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] cursor-grab active:cursor-grabbing'
                  : 'transition-transform duration-700 ease-out cursor-grab active:cursor-grabbing'
              }
              transform={`translate(${isManipulated ? 40 : dragOffset.x}, 0)`}
              onPointerDown={handlePointerDown}
            >
              {/* Overturned Glass Silhouette */}
              <path d="M 170,175 L 215,165 L 220,185 L 175,195 Z" fill="url(#glassBowl)" stroke="#0284c7" strokeWidth="1.5" />
              <ellipse cx="218" cy="175" rx="5" ry="10" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5" />
            </g>

            {/* Free Spreading Water Puddle on Flat Table */}
            <path
              d={
                isManipulated
                  ? "M 220,185 Q 260,175 320,185 Q 360,200 330,215 Q 270,225 230,210 Q 210,195 220,185 Z"
                  : "M 220,185 Q 240,180 270,185 Q 290,195 270,205 Q 240,210 230,200 Z"
              }
              fill="#38bdf8"
              opacity="0.75"
              className="transition-all duration-700"
            />
            <text x="280" y="200" fill="#0369a1" fontSize="11" fontWeight="bold">
              {isManipulated ? 'Nước lan trên mặt phẳng (ON)' : 'Vũng nước loang (ON)'}
            </text>
          </g>
        )}

        {/* SCENARIO LEVEL 2: SCENARIO 3 - THE CORNER PARADOX */}
        {puzzle.id === 'p2-3-corner-paradox' && (
          <g>
            {/* 3D Room Corner Walls */}
            <polygon points="70,50 250,90 250,230 70,190" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1.5" />
            <polygon points="250,90 430,50 430,190 250,230" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
            {/* Corner seam line */}
            <line x1="250" y1="90" x2="250" y2="230" stroke="#94a3b8" strokeWidth="2.5" />

            {/* Bookshelf tucked inside the corner */}
            <g
              className={
                isDragging
                  ? ''
                  : isSpringReleasing
                  ? 'transition-transform duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] cursor-grab active:cursor-grabbing'
                  : 'transition-transform duration-700 ease-out cursor-grab active:cursor-grabbing'
              }
              transform={`translate(${isManipulated ? 0 : dragOffset.x}, ${isManipulated ? -15 : dragOffset.y})`}
              onPointerDown={handlePointerDown}
            >
              {/* Bookshelf 3D Box */}
              <rect x="220" y="110" width="60" height="100" rx="3" fill="#b45309" stroke="#78350f" strokeWidth="2" />
              {/* Shelves and colorful books */}
              <rect x="226" y="122" width="48" height="6" fill="#78350f" />
              <rect x="228" y="128" width="8" height="24" fill="#ef4444" />
              <rect x="238" y="132" width="8" height="20" fill="#3b82f6" />
              <rect x="248" y="130" width="8" height="22" fill="#10b981" />
              <rect x="226" y="156" width="48" height="6" fill="#78350f" />
              <rect x="230" y="162" width="10" height="26" fill="#eab308" />
              <rect x="242" y="166" width="10" height="22" fill="#8b5cf6" />
            </g>

            <rect x="180" y="240" width="140" height="24" rx="6" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" />
            <text x="250" y="256" fill="#0369a1" fontSize="10" textAnchor="middle" fontWeight="bold">
              Góc phòng ôm trọn (IN)
            </text>
          </g>
        )}

        {/* SCENARIO LEVEL 2: SCENARIO 4 - THE COMMUTER'S VEHICLE */}
        {puzzle.id === 'p2-4-commuters-vehicle' && (
          <g>
            {/* The Express Bus Body */}
            <g
              className={
                isDragging
                  ? ''
                  : isSpringReleasing
                  ? 'transition-transform duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] cursor-grab active:cursor-grabbing'
                  : 'transition-transform duration-700 ease-out cursor-grab active:cursor-grabbing'
              }
              transform={`translate(${isManipulated ? 50 : dragOffset.x}, 0)`}
              onPointerDown={handlePointerDown}
            >
              {/* Bus Outer Shell */}
              <rect x="130" y="110" width="250" height="100" rx="16" fill="#0284c7" stroke="#0369a1" strokeWidth="2.5" />
              {/* Windows & Walkable Aisle Floor */}
              <rect x="150" y="125" width="210" height="40" rx="4" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" />
              {/* Walking Passenger Silhouettes inside */}
              <circle cx="180" cy="140" r="8" fill="#1e293b" />
              <rect x="174" y="148" width="12" height="16" rx="3" fill="#1e293b" />
              <circle cx="230" cy="140" r="8" fill="#1e293b" />
              <rect x="224" y="148" width="12" height="16" rx="3" fill="#1e293b" />
              <circle cx="280" cy="140" r="8" fill="#1e293b" />
              <rect x="274" y="148" width="12" height="16" rx="3" fill="#1e293b" />
              {/* Walkable aisle floor platform line */}
              <line x1="150" y1="165" x2="360" y2="165" stroke="#f59e0b" strokeWidth="3" />
              {/* Wheels */}
              <circle cx="180" cy="215" r="18" fill="#1e293b" stroke="#64748b" strokeWidth="4" />
              <circle cx="330" cy="215" r="18" fill="#1e293b" stroke="#64748b" strokeWidth="4" />
            </g>

            <rect x="160" y="245" width="180" height="24" rx="6" fill="#ffffff" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="250" y="261" fill="#b45309" fontSize="10" textAnchor="middle" fontWeight="bold">
              Mặt sàn đứng đi lại được (ON)
            </text>
          </g>
        )}

        {/* SCENARIO LEVEL 2: SCENARIO 5 - THE MAP & THE PIN */}
        {puzzle.id === 'p2-5-map-and-pin' && (
          <g>
            {/* Folded Map Canvas */}
            <polygon points="110,80 390,80 370,220 90,220" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
            {/* Map Roads / Demarcations */}
            <path d="M 120,150 Q 240,140 370,160" stroke="#cbd5e1" strokeWidth="8" fill="none" />
            <path d="M 230,80 Q 250,150 240,220" stroke="#f59e0b" strokeWidth="6" fill="none" />

            {/* Target Coordinate Crosshair and Map Pin */}
            <g
              className={
                isDragging
                  ? ''
                  : isSpringReleasing
                  ? 'transition-transform duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] cursor-grab active:cursor-grabbing'
                  : 'transition-transform duration-700 ease-out cursor-grab active:cursor-grabbing'
              }
              transform={`translate(${dragOffset.x}, ${isManipulated ? -15 : dragOffset.y})`}
              onPointerDown={handlePointerDown}
            >
              {/* Point Target Pulse */}
              <circle cx="245" cy="145" r="22" fill="#ef4444" opacity="0.2" className="animate-ping" />
              <circle cx="245" cy="145" r="6" fill="#ef4444" />
              {/* Standing Map Pin Marker */}
              <path d="M 245,145 C 230,120 230,105 245,105 C 260,105 260,120 245,145 Z" fill="#ef4444" stroke="#991b1b" strokeWidth="1.5" />
              <circle cx="245" cy="115" r="4" fill="#ffffff" />
            </g>

            <rect x="170" y="235" width="160" height="24" rx="6" fill="#ffffff" stroke="#ef4444" strokeWidth="1.5" />
            <text x="250" y="251" fill="#991b1b" fontSize="10" textAnchor="middle" fontWeight="bold">
              Toạ độ điểm hội tụ (AT)
            </text>
          </g>
        )}

        {/* Dynamic Elastic Tension Cord when actively dragging */}
        {isDragging && (dragOffset.x !== 0 || dragOffset.y !== 0) && (
          <g className="pointer-events-none opacity-60">
            <line
              x1="250"
              y1="220"
              x2={250 + dragOffset.x}
              y2={220 + dragOffset.y}
              stroke="#0284c7"
              strokeWidth="2.5"
              strokeDasharray="4 3"
            />
            <circle cx={250 + dragOffset.x} cy={220 + dragOffset.y} r="5" fill="#0284c7" opacity="0.8" />
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
          {puzzle.id === 'p1-placement-basics' && (isManipulated ? 'Đặt lại vị trí' : 'Đẩy trượt cái bát ➔')}
          {puzzle.id === 'p2-overflowing-bowl' && (isManipulated ? 'Đặt lại vị trí' : 'Đẩy trượt cái bát ➔')}
          {puzzle.id === 'p3-cover-or-container' && (isManipulated ? 'Hạ bát xuống' : 'Nhấc bổng bát lên ⬆️')}
          {puzzle.id === 'p4-smoke-challenge' && (isManipulated ? 'Úp kín bát lại' : 'Nhấc nghiêng mép bát ↗️')}
          {puzzle.id === 'p5-transfer-test' && (isManipulated ? 'Đặt lại thanh gỗ' : 'Trượt thanh gỗ ➔')}
          {puzzle.id === 'p2-1-wall-and-picture' && (isManipulated ? 'Hạ tranh xuống' : 'Nhấc tranh áp tường ➔')}
          {puzzle.id === 'p2-2-tabletop-spill' && (isManipulated ? 'Lau sạch bàn' : 'Làm đổ cốc nước ➔')}
          {puzzle.id === 'p2-3-corner-paradox' && (isManipulated ? 'Kéo ra ngoài' : 'Kê sát vào góc tường ➔')}
          {puzzle.id === 'p2-4-commuters-vehicle' && (isManipulated ? 'Dừng xe buýt' : 'Khởi hành xe buýt ➔')}
          {puzzle.id === 'p2-5-map-and-pin' && (isManipulated ? 'Thu lại định vị' : 'Ghim toạ độ điểm ➔')}
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
