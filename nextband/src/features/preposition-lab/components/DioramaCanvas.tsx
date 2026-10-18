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
    if (puzzle.id === 'p5-transfer-test') {
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
    if (puzzle.id === 'p4-smoke-challenge' && dragOffset.y < -30 && Math.abs(lastVelocity.current.y) > 4) {
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
  const isAboveFailure = hasTestedPrediction && puzzle.id === 'p2-overflowing-bowl' && selectedOptionId === 'above';
  const isAppleInFailure = hasTestedPrediction && puzzle.id === 'p3-cover-or-container' && selectedOptionId === 'in';
  const isSmokeUnderFailure = hasTestedPrediction && puzzle.id === 'p4-smoke-challenge' && selectedOptionId === 'under';
  const isNailOnFailure = hasTestedPrediction && puzzle.id === 'p5-transfer-test' && selectedOptionId === 'on';

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
          <linearGradient id="tumblerGlass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.85)" />
            <stop offset="30%" stopColor="rgba(224, 242, 254, 0.45)" />
            <stop offset="70%" stopColor="rgba(186, 230, 253, 0.3)" />
            <stop offset="100%" stopColor="rgba(125, 211, 252, 0.6)" />
          </linearGradient>
          <linearGradient id="waterSpillGradient" x1="0" y1="0" x2="1" y2="0.8">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.85" />
          </linearGradient>
          <radialGradient id="waterDropletGradient" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#38bdf8" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.95" />
          </radialGradient>
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
          <radialGradient id="pinSphereGradient" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#f87171" />
            <stop offset="40%" stopColor="#ef4444" />
            <stop offset="75%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#7f1d1d" />
          </radialGradient>
          <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Base Tabletop Perspective Surface - strictly rendered for tabletop scenarios */}
        {[
          'p1-placement-basics',
          'p2-overflowing-bowl',
          'p3-cover-or-container',
          'p4-smoke-challenge',
          'p5-transfer-test',
        ].includes(puzzle.id) && (
          <g>
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
          </g>
        )}

        {/* SCENARIO 1: PLACEMENT BASICS */}
        {puzzle.id === 'p1-placement-basics' && (
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
        {puzzle.id === 'p2-overflowing-bowl' && (
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
        {puzzle.id === 'p3-cover-or-container' && (
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
        {puzzle.id === 'p4-smoke-challenge' && (
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
        {puzzle.id === 'p5-transfer-test' && (
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
            {/* Gallery Wall Background (Vertical plane) */}
            <rect x="50" y="45" width="400" height="185" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            {/* Architectural Baseboard Trim */}
            <rect x="50" y="230" width="400" height="22" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="50" y1="234" x2="450" y2="234" stroke="#ffffff" strokeWidth="1" />

            {/* Subtle vertical wall paneling / mortar lines */}
            <line x1="50" y1="110" x2="450" y2="110" stroke="#f1f5f9" strokeWidth="1.5" />
            <line x1="50" y1="170" x2="450" y2="170" stroke="#f1f5f9" strokeWidth="1.5" />
            <line x1="150" y1="45" x2="150" y2="230" stroke="#f1f5f9" strokeWidth="1.5" />
            <line x1="350" y1="45" x2="350" y2="230" stroke="#f1f5f9" strokeWidth="1.5" />

            {/* Embedded electrical socket in wall demonstrating IN vs ON */}
            <g transform="translate(100, 150)">
              <rect x="0" y="0" width="26" height="34" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
              <circle cx="9" cy="13" r="1.5" fill="#475569" />
              <circle cx="17" cy="13" r="1.5" fill="#475569" />
              <circle cx="9" cy="23" r="1.5" fill="#475569" />
              <circle cx="17" cy="23" r="1.5" fill="#475569" />
              <text x="13" y="46" fill="#94a3b8" fontSize="8" textAnchor="middle">
                (IN the wall)
              </text>
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
              {/* Frame Drop Shadow on vertical wall surface */}
              <rect x="198" y="93" width="104" height="82" rx="4" fill="rgba(0,0,0,0.14)" />
              {/* Wooden Frame */}
              <rect x="195" y="90" width="104" height="82" rx="4" fill="#b45309" stroke="#78350f" strokeWidth="2.5" />
              <rect x="201" y="96" width="92" height="70" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
              {/* Canvas Art */}
              <rect x="205" y="100" width="84" height="62" rx="2" fill="#38bdf8" />
              <circle cx="228" cy="116" r="11" fill="#facc15" />
              <polygon points="208,162 238,132 260,162" fill="#15803d" />
              <polygon points="245,162 270,138 288,162" fill="#166534" />
              {/* Specular glass gleam across painting */}
              <path d="M 210,105 L 245,105 L 225,155 L 210,155 Z" fill="#ffffff" opacity="0.25" />
              {/* Hanging Cord & Anchor Nail */}
              <line x1="247" y1="78" x2="232" y2="90" stroke="#475569" strokeWidth="1.5" />
              <line x1="247" y1="78" x2="262" y2="90" stroke="#475569" strokeWidth="1.5" />
              <circle cx="247" cy="78" r="3.5" fill="#334155" stroke="#94a3b8" strokeWidth="1" />
            </g>

            {/* Label callout */}
            <rect x="155" y="235" width="190" height="26" rx="6" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" className="drop-shadow-sm" />
            <text x="250" y="252" fill="#0369a1" fontSize="11" textAnchor="middle" fontWeight="bold">
              Bức tranh tì trên mặt phẳng (ON the wall)
            </text>
          </g>
        )}

        {/* SCENARIO LEVEL 2: SCENARIO 2 - THE TABLETOP SPILL */}
        {puzzle.id === 'p2-2-tabletop-spill' && (
          <g>
            {/* Table Surface with light wood finish */}
            <polygon
              points="60,165 440,165 405,255 95,255"
              fill="#f8fafc"
              stroke="#cbd5e1"
              strokeWidth="1.5"
            />
            {/* Table bevel edge shadow */}
            <polygon
              points="95,255 405,255 405,263 95,263"
              fill="#94a3b8"
            />

            {/* Subtle table grain / reflection lines */}
            <line x1="80" y1="195" x2="420" y2="195" stroke="#f1f5f9" strokeWidth="2" opacity="0.8" />
            <line x1="75" y1="225" x2="415" y2="225" stroke="#f1f5f9" strokeWidth="2" opacity="0.8" />

            {/* --- 1. SPILLED WATER PUDDLE (Multi-layer realistic fluid) --- */}
            <g className="transition-all duration-700">
              {/* Layer 1: Puddle Soft Drop Shadow / Meniscus Contact */}
              <path
                d={
                  isManipulated
                    ? "M 188,206 C 205,178 265,168 335,174 C 400,180 435,200 410,224 C 385,248 300,252 235,246 C 195,240 188,222 188,206 Z"
                    : "M 188,206 C 205,188 238,182 280,186 C 322,190 350,202 338,218 C 322,234 275,238 235,234 C 200,228 188,220 188,206 Z"
                }
                fill="rgba(2, 132, 199, 0.18)"
                transform="translate(1, 2.5)"
              />

              {/* Layer 2: Main Translucent Water Body with Gradient */}
              <path
                d={
                  isManipulated
                    ? "M 188,206 C 205,178 265,168 335,174 C 400,180 435,200 410,224 C 385,248 300,252 235,246 C 195,240 188,222 188,206 Z"
                    : "M 188,206 C 205,188 238,182 280,186 C 322,190 350,202 338,218 C 322,234 275,238 235,234 C 200,228 188,220 188,206 Z"
                }
                fill="url(#waterSpillGradient)"
                stroke="#0284c7"
                strokeWidth="1.2"
                strokeOpacity="0.75"
              />

              {/* Layer 3: Inner Caustic Light Diffusion Lobe */}
              <path
                d={
                  isManipulated
                    ? "M 205,204 C 220,186 265,178 320,184 C 370,190 395,205 375,220 C 350,235 290,238 245,234 C 215,228 205,216 205,204 Z"
                    : "M 202,204 C 215,192 242,188 275,192 C 305,196 324,204 314,215 C 300,226 265,228 238,225 C 215,220 202,214 202,204 Z"
                }
                fill="#ffffff"
                opacity="0.22"
              />

              {/* Layer 4: Specular Surface Highlights (Gleams & Meniscus Reflections) */}
              <path
                d={
                  isManipulated
                    ? "M 225,186 C 265,178 315,180 360,190"
                    : "M 220,194 C 248,188 280,190 310,198"
                }
                fill="none"
                stroke="#ffffff"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.85"
              />
              <path
                d={
                  isManipulated
                    ? "M 245,238 C 290,242 345,236 380,224"
                    : "M 235,228 C 265,232 300,228 325,220"
                }
                fill="none"
                stroke="#e0f2fe"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.7"
              />

              {/* Layer 5: Satellite Water Droplets Scattered with Spherical Gradients */}
              <g className="transition-all duration-700">
                {/* Droplet 1 (Top right) */}
                <circle
                  cx={isManipulated ? 395 : 348}
                  cy={isManipulated ? 175 : 182}
                  r="5"
                  fill="url(#waterDropletGradient)"
                  stroke="#0284c7"
                  strokeWidth="0.75"
                />
                <circle
                  cx={isManipulated ? 393.5 : 346.5}
                  cy={isManipulated ? 173.5 : 180.5}
                  r="1.8"
                  fill="#ffffff"
                />

                {/* Droplet 2 (Far right splash) */}
                <circle
                  cx={isManipulated ? 430 : 362}
                  cy={isManipulated ? 208 : 205}
                  r="3.5"
                  fill="url(#waterDropletGradient)"
                  stroke="#0284c7"
                  strokeWidth="0.75"
                />
                <circle
                  cx={isManipulated ? 429 : 361}
                  cy={isManipulated ? 207 : 204}
                  r="1.2"
                  fill="#ffffff"
                />

                {/* Droplet 3 (Bottom edge) */}
                <circle
                  cx={isManipulated ? 360 : 315}
                  cy={isManipulated ? 245 : 235}
                  r="4"
                  fill="url(#waterDropletGradient)"
                  stroke="#0284c7"
                  strokeWidth="0.75"
                />
                <circle
                  cx={isManipulated ? 358.5 : 313.5}
                  cy={isManipulated ? 243.5 : 233.5}
                  r="1.5"
                  fill="#ffffff"
                />

                {/* Droplet 4 (Top center small splash) */}
                <circle
                  cx={isManipulated ? 295 : 270}
                  cy={isManipulated ? 168 : 178}
                  r="3"
                  fill="url(#waterDropletGradient)"
                  stroke="#0284c7"
                  strokeWidth="0.75"
                />
                <circle
                  cx={isManipulated ? 294 : 269}
                  cy={isManipulated ? 167 : 177}
                  r="1.1"
                  fill="#ffffff"
                />
              </g>
            </g>

            {/* --- 2. FALLEN GLASS TUMBLER (Tactile & Draggable) --- */}
            <g
              className={
                isDragging
                  ? ''
                  : isSpringReleasing
                  ? 'transition-transform duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] cursor-grab active:cursor-grabbing'
                  : 'transition-transform duration-700 ease-out cursor-grab active:cursor-grabbing'
              }
              transform={`translate(${isManipulated ? -15 : dragOffset.x}, ${dragOffset.y})`}
              onPointerDown={handlePointerDown}
            >
              {/* Glass Shadow on tabletop */}
              <ellipse cx="145" cy="216" rx="42" ry="9" fill="rgba(0,0,0,0.14)" />

              {/* Glass Body (horizontal tipped over) */}
              <path
                d="M 112,192 L 186,196 L 186,216 L 112,216 Z"
                fill="url(#tumblerGlass)"
                stroke="#0284c7"
                strokeWidth="1.5"
              />

              {/* Heavy Solid Glass Base (Refraction & thickness) */}
              <path
                d="M 112,192 L 122,193 L 122,215 L 112,216 Z"
                fill="#bae6fd"
                stroke="#0284c7"
                strokeWidth="1.2"
                opacity="0.8"
              />
              <line x1="117" y1="194" x2="117" y2="214" stroke="#0284c7" strokeWidth="1" opacity="0.6" />

              {/* Glass Rim Opening facing the water spill */}
              <ellipse
                cx="186"
                cy="206"
                rx="6"
                ry="10"
                fill="rgba(186, 230, 253, 0.45)"
                stroke="#0284c7"
                strokeWidth="1.5"
              />
              <ellipse
                cx="186"
                cy="206"
                rx="4"
                ry="8"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="1"
              />

              {/* Specular White Glass Reflection Streaks */}
              <line
                x1="125"
                y1="195"
                x2="182"
                y2="198"
                stroke="#ffffff"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.9"
              />
              <line
                x1="125"
                y1="199"
                x2="178"
                y2="201"
                stroke="#ffffff"
                strokeWidth="1"
                strokeLinecap="round"
                opacity="0.6"
              />

              {/* Glass Lip Outpouring: Liquid trickling from rim onto the table */}
              <path
                d="M 186,204 Q 192,206 190,214 Q 186,216 186,214 Z"
                fill="#38bdf8"
                opacity="0.9"
              />
            </g>

            {/* Dynamic Label Badge */}
            <g className="transition-all duration-500">
              <rect
                x="200"
                y="95"
                width="200"
                height="32"
                rx="8"
                fill="#ffffff"
                stroke="#0284c7"
                strokeWidth="1.5"
                className="drop-shadow-sm"
              />
              <text x="300" y="115" fill="#0369a1" fontSize="11" textAnchor="middle" fontWeight="bold">
                {isManipulated ? '💧 Nước loang rộng trên mặt bàn (ON)' : '💧 Cốc đổ nước tràn trên bàn (ON)'}
              </text>
            </g>
          </g>
        )}

        {/* SCENARIO LEVEL 2: SCENARIO 3 - THE CORNER PARADOX */}
        {puzzle.id === 'p2-3-corner-paradox' && (
          <g>
            {/* 3D Room Corner Walls with subtle lighting & vertical paneling */}
            <polygon points="50,40 250,85 250,225 50,180" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            <polygon points="250,85 450,40 450,180 250,225" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1.5" />
            {/* Corner vertical seam line */}
            <line x1="250" y1="85" x2="250" y2="225" stroke="#94a3b8" strokeWidth="2.5" />

            {/* Baseboard Skirting along walls */}
            <polygon points="50,172 250,217 250,225 50,180" fill="#cbd5e1" />
            <polygon points="250,217 450,172 450,180 250,225" fill="#94a3b8" />

            {/* Parquet Hardwood Floor in 3D Perspective */}
            <polygon points="50,180 250,225 450,180 250,270" fill="#fef3c7" stroke="#cbd5e1" strokeWidth="1.2" />
            {/* Perspective Wood Plank Lines */}
            <line x1="150" y1="202" x2="150" y2="248" stroke="#fde68a" strokeWidth="1.5" />
            <line x1="200" y1="214" x2="200" y2="259" stroke="#fde68a" strokeWidth="1.5" />
            <line x1="250" y1="225" x2="250" y2="270" stroke="#f59e0b" strokeWidth="2" />
            <line x1="300" y1="214" x2="300" y2="259" stroke="#fde68a" strokeWidth="1.5" />
            <line x1="350" y1="202" x2="350" y2="248" stroke="#fde68a" strokeWidth="1.5" />

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
              {/* Floor Contact Shadow */}
              <ellipse cx="250" cy="222" rx="38" ry="9" fill="rgba(0,0,0,0.18)" />

              {/* Bookshelf 3D Box */}
              <rect x="218" y="105" width="64" height="112" rx="4" fill="#b45309" stroke="#78350f" strokeWidth="2" />
              {/* Shelves and colorful books */}
              <rect x="224" y="118" width="52" height="6" fill="#78350f" />
              <rect x="226" y="124" width="8" height="26" fill="#ef4444" />
              <rect x="236" y="128" width="8" height="22" fill="#3b82f6" />
              <rect x="246" y="126" width="8" height="24" fill="#10b981" />
              <rect x="256" y="130" width="8" height="20" fill="#f59e0b" />

              <rect x="224" y="154" width="52" height="6" fill="#78350f" />
              <rect x="228" y="160" width="10" height="28" fill="#eab308" />
              <rect x="240" y="164" width="10" height="24" fill="#8b5cf6" />
              <rect x="252" y="162" width="10" height="26" fill="#06b6d4" />

              <rect x="224" y="190" width="52" height="6" fill="#78350f" />
              <rect x="230" y="196" width="12" height="18" fill="#ec4899" />
              <rect x="244" y="198" width="12" height="16" fill="#64748b" />
            </g>

            {/* Label callout */}
            <rect x="160" y="235" width="180" height="26" rx="6" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" className="drop-shadow-sm" />
            <text x="250" y="252" fill="#0369a1" fontSize="11" textAnchor="middle" fontWeight="bold">
              Góc phòng 3D ôm trọn (IN the corner)
            </text>
          </g>
        )}

        {/* SCENARIO LEVEL 2: SCENARIO 4 - THE COMMUTER'S VEHICLE */}
        {puzzle.id === 'p2-4-commuters-vehicle' && (
          <g>
            {/* Urban Street Environment */}
            {/* Distant building skyline backdrop */}
            <rect x="40" y="60" width="420" height="135" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
            <rect x="70" y="110" width="45" height="85" fill="#e2e8f0" />
            <rect x="130" y="90" width="60" height="105" fill="#cbd5e1" />
            <rect x="330" y="100" width="50" height="95" fill="#e2e8f0" />
            <rect x="395" y="80" width="55" height="115" fill="#cbd5e1" />

            {/* Sidewalk Curb */}
            <polygon points="30,192 470,192 455,206 45,206" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
            {/* Asphalt Road Surface in perspective */}
            <polygon points="45,206 455,206 480,268 20,268" fill="#334155" stroke="#1e293b" strokeWidth="1" />
            {/* Yellow Dashed Highway Divider Line */}
            <line x1="50" y1="242" x2="450" y2="242" stroke="#facc15" strokeWidth="3" strokeDasharray="18 14" />

            {/* The Express Bus Body (Tactile & Draggable) */}
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
              {/* Wheel Asphalt Shadows */}
              <ellipse cx="180" cy="226" rx="26" ry="7" fill="rgba(0,0,0,0.4)" />
              <ellipse cx="330" cy="226" rx="26" ry="7" fill="rgba(0,0,0,0.4)" />

              {/* Bus Outer Shell */}
              <rect x="125" y="108" width="260" height="102" rx="14" fill="#0284c7" stroke="#0369a1" strokeWidth="2.5" />

              {/* Roof Light Strip */}
              <rect x="155" y="108" width="200" height="4" fill="#38bdf8" />

              {/* Digital LED Route Display */}
              <rect x="160" y="115" width="90" height="10" rx="2" fill="#0f172a" />
              <text x="205" y="123" fill="#facc15" fontSize="8" fontFamily="monospace" fontWeight="black" textAnchor="middle">
                EXPRESS 85
              </text>

              {/* Panoramic Passenger Windows */}
              <rect x="145" y="128" width="220" height="42" rx="4" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" />

              {/* Walking / Standing Passenger Silhouettes inside */}
              <circle cx="175" cy="142" r="8" fill="#1e293b" />
              <rect x="169" y="150" width="12" height="18" rx="3" fill="#1e293b" />
              <circle cx="225" cy="142" r="8" fill="#1e293b" />
              <rect x="219" y="150" width="12" height="18" rx="3" fill="#1e293b" />
              <circle cx="275" cy="142" r="8" fill="#1e293b" />
              <rect x="269" y="150" width="12" height="18" rx="3" fill="#1e293b" />
              <circle cx="325" cy="142" r="8" fill="#1e293b" />
              <rect x="319" y="150" width="12" height="18" rx="3" fill="#1e293b" />

              {/* Walkable Aisle Floor Platform Line (Gold Highlight) */}
              <line x1="145" y1="168" x2="365" y2="168" stroke="#f59e0b" strokeWidth="3.5" />

              {/* Front Headlights & Rear Taillights */}
              <rect x="382" y="180" width="4" height="12" rx="1" fill="#fef08a" />
              <rect x="125" y="180" width="4" height="12" rx="1" fill="#ef4444" />

              {/* Heavy Duty Wheels */}
              <circle cx="180" cy="214" r="18" fill="#1e293b" stroke="#64748b" strokeWidth="5" />
              <circle cx="180" cy="214" r="7" fill="#cbd5e1" />
              <circle cx="330" cy="214" r="18" fill="#1e293b" stroke="#64748b" strokeWidth="5" />
              <circle cx="330" cy="214" r="7" fill="#cbd5e1" />
            </g>

            {/* Label callout */}
            <rect x="150" y="235" width="200" height="26" rx="6" fill="#ffffff" stroke="#f59e0b" strokeWidth="1.5" className="drop-shadow-sm" />
            <text x="250" y="252" fill="#b45309" fontSize="11" textAnchor="middle" fontWeight="bold">
              Mặt sàn đứng đi lại được ➔ Dùng ON (ON the bus)
            </text>
          </g>
        )}

        {/* SCENARIO LEVEL 2: SCENARIO 5 - THE MAP & THE PIN (HIGH-FIDELITY CARTOGRAPHIC DIORAMA) */}
        {puzzle.id === 'p2-5-map-and-pin' && (
          <g>
            {/* 1. Architectural Cutting Mat / Drafting Desk Background */}
            <polygon points="35,50 465,50 435,265 65,265" fill="#0f172a" stroke="#334155" strokeWidth="2" />
            {/* Grid markings on the cutting mat */}
            <line x1="55" y1="100" x2="445" y2="100" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 4" />
            <line x1="55" y1="155" x2="445" y2="155" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 4" />
            <line x1="55" y1="210" x2="445" y2="210" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 4" />
            <line x1="150" y1="50" x2="150" y2="265" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 4" />
            <line x1="250" y1="50" x2="250" y2="265" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 4" />
            <line x1="350" y1="50" x2="350" y2="265" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 4" />

            {/* 2. Tri-Fold 3D Topographic Map */}
            {/* Map Cast Drop Shadow on desk */}
            <polygon points="70,68 425,78 410,252 60,242" fill="rgba(0,0,0,0.4)" />

            {/* Map Panel 1 (Left Fold) */}
            <polygon points="75,65 190,74 184,245 65,235" fill="#fefce8" stroke="#d97706" strokeWidth="1.2" />
            {/* Map Panel 2 (Center Fold - Primary Area) */}
            <polygon points="190,74 310,68 316,240 184,245" fill="#fffbeb" stroke="#d97706" strokeWidth="1.2" />
            {/* Map Panel 3 (Right Fold) */}
            <polygon points="310,68 425,76 415,248 316,240" fill="#fef9c3" stroke="#d97706" strokeWidth="1.2" />

            {/* Crease Lighting / Fold Lines */}
            <line x1="190" y1="74" x2="184" y2="245" stroke="#d97706" strokeWidth="1.5" opacity="0.6" />
            <line x1="310" y1="68" x2="316" y2="240" stroke="#d97706" strokeWidth="1.5" opacity="0.6" />

            {/* Topographic Contour Lines */}
            <path d="M 80,105 Q 130,85 180,110 T 300,95 T 410,115" stroke="#d97706" strokeWidth="1" fill="none" opacity="0.3" />
            <path d="M 85,185 Q 140,165 200,195 T 320,175 T 405,195" stroke="#d97706" strokeWidth="1" fill="none" opacity="0.3" />

            {/* Meandering Blue River */}
            <path d="M 90,115 Q 165,100 235,160 T 405,135" stroke="#38bdf8" strokeWidth="8" fill="none" opacity="0.85" />
            {/* Highway Bridge over River */}
            <rect x="232" y="150" width="26" height="12" rx="2" fill="#94a3b8" stroke="#475569" strokeWidth="1" />

            {/* Shaded Territorial Zone (Demonstrating IN the border zone) */}
            <polygon
              points="105,80 220,86 210,145 95,140"
              fill="rgba(16, 185, 129, 0.18)"
              stroke="#10b981"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
            <text x="155" y="112" fill="#047857" fontSize="8" fontWeight="bold" textAnchor="middle">
              Khu vực kiểm soát (IN)
            </text>

            {/* International Border Trajectory Line (Demonstrating ON the border line) */}
            <line x1="330" y1="72" x2="330" y2="244" stroke="#6366f1" strokeWidth="2" strokeDasharray="5 3" />
            <text x="335" y="105" fill="#4f46e5" fontSize="8" fontWeight="bold">
              Đường biên (ON)
            </text>

            {/* Two Major Intersecting Arterial Highways */}
            {/* North-South Highway */}
            <path d="M 250,70 L 250,242" stroke="#475569" strokeWidth="10" strokeLinecap="round" />
            <path d="M 250,70 L 250,242" stroke="#facc15" strokeWidth="1.5" strokeDasharray="6 5" />
            {/* East-West Highway */}
            <path d="M 80,155 L 415,155" stroke="#475569" strokeWidth="10" strokeLinecap="round" />
            <path d="M 80,155 L 415,155" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="6 5" />

            {/* Border Checkpoint Guard Booth at (250, 155) */}
            <rect x="234" y="145" width="12" height="16" rx="2" fill="#1e293b" stroke="#cbd5e1" strokeWidth="1" />
            <rect x="236" y="148" width="8" height="5" fill="#38bdf8" />
            <line x1="246" y1="154" x2="272" y2="154" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="4 2" />

            {/* Target 0-D Coordinate Sonar Pulse at Intersection */}
            <circle cx="250" cy="155" r="18" fill="none" stroke="#ef4444" strokeWidth="1.5" className="animate-ping" opacity="0.8" />
            <circle cx="250" cy="155" r="28" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            <circle cx="250" cy="155" r="4.5" fill="#ef4444" />
            <circle cx="250" cy="155" r="1.5" fill="#ffffff" />
            {/* Crosshairs */}
            <line x1="220" y1="155" x2="280" y2="155" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="250" y1="125" x2="250" y2="185" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 2" />

            {/* 3. The 3D Metal Location Pin (Tactile & Draggable) */}
            <g
              className={
                isDragging
                  ? ''
                  : isSpringReleasing
                  ? 'transition-transform duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] cursor-grab active:cursor-grabbing'
                  : 'transition-transform duration-700 ease-out cursor-grab active:cursor-grabbing'
              }
              transform={`translate(${dragOffset.x}, ${isManipulated ? -18 : dragOffset.y})`}
              onPointerDown={handlePointerDown}
            >
              {/* Pin Drop Shadow on map paper */}
              <ellipse cx="258" cy="158" rx="14" ry="5" fill="rgba(0,0,0,0.35)" />

              {/* Tapered Chrome Needle Shaft */}
              <polygon points="248.5,125 251.5,125 250,155" fill="url(#metalNail)" stroke="#334155" strokeWidth="0.75" />

              {/* Pin Head - 3D Sphere with Metallic Bevel */}
              <circle cx="250" cy="115" r="15" fill="url(#pinSphereGradient)" stroke="#7f1d1d" strokeWidth="1.5" />
              {/* Metallic Inner Ring */}
              <circle cx="250" cy="115" r="9" fill="#dc2626" stroke="#fca5a5" strokeWidth="1" />
              {/* Center Bullseye Dot */}
              <circle cx="250" cy="115" r="4" fill="#ffffff" />
              <circle cx="250" cy="115" r="1.8" fill="#991b1b" />
              {/* Specular 3D Reflection Glint */}
              <ellipse cx="245" cy="109" rx="4.5" ry="2.5" fill="#ffffff" opacity="0.9" />
            </g>

            {/* Label callout */}
            <rect x="150" y="235" width="200" height="26" rx="6" fill="#ffffff" stroke="#ef4444" strokeWidth="1.5" className="drop-shadow-sm" />
            <text x="250" y="252" fill="#991b1b" fontSize="11" textAnchor="middle" fontWeight="bold">
              Toạ độ điểm hội tụ 0-D ➔ Dùng AT (AT the border)
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
      {puzzle.id === 'p1-placement-basics' && onSnapZoneChange && (
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
