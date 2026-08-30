/**
 * ARIS Spatial Design System — Core Tokens (Phase 1)
 *
 * Defines physical depth, elevation planes, light fields, materials, and spring easing curves.
 * 100% pure CSS/SVG ready, zero external 3D runtime dependencies.
 */

export const SPATIAL_TOKENS = {
  // ─── 1. ELEVATION & DEPTH (Physical Z-planes & Soft Ambient Occlusion) ──
  elevation: {
    ground: {
      z: 0,
      shadow: "none",
      transform: "translateZ(0px)",
    },
    recessed: {
      z: -1,
      shadow: "inset 0 2px 4px 0 rgba(15, 23, 42, 0.08), inset 0 1px 2px 0 rgba(15, 23, 42, 0.06)",
      transform: "translateZ(-2px)",
    },
    surface: {
      z: 1,
      shadow: "0 2px 6px -1px rgba(15, 23, 42, 0.05), 0 1px 4px -1px rgba(15, 23, 42, 0.03)",
      transform: "translateZ(2px)",
    },
    floating: {
      z: 2,
      shadow: "0 12px 28px -6px rgba(15, 23, 42, 0.08), 0 8px 12px -6px rgba(15, 23, 42, 0.04)",
      transform: "translateZ(8px)",
    },
    hero: {
      z: 3,
      shadow: "0 25px 50px -12px rgba(15, 23, 42, 0.12), 0 12px 24px -8px rgba(15, 23, 42, 0.06)",
      transform: "translateZ(16px)",
    },
    hoverLift: {
      z: 4,
      shadow: "0 32px 64px -14px rgba(15, 23, 42, 0.16), 0 16px 32px -10px rgba(15, 23, 42, 0.08)",
      transform: "translateY(-6px) translateZ(24px)",
    },
  },

  // ─── 2. MATERIALS & SURFACES ───────────────────────────────────────────
  materials: {
    matteCompleted: {
      background: "linear-gradient(145deg, #0F172A 0%, #1E293B 100%)",
      border: "1px solid rgba(255, 255, 255, 0.16)",
      insetCheck: "drop-shadow(0 1px 2px rgba(0,0,0,0.5))",
      textColor: "#F8FAFC",
      badgeBg: "rgba(16, 185, 129, 0.15)",
      badgeBorder: "rgba(16, 185, 129, 0.3)",
      badgeColor: "#10B981",
    },
    activeLuminous: {
      background: "linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)",
      border: "2px solid #0F172A",
      edgeGlow: "0 0 0 1px rgba(225, 29, 72, 0.2), 0 0 32px -4px rgba(225, 29, 72, 0.28)",
      accentBand: "hsl(var(--brand-red))",
      textColor: "#0F172A",
      badgeBg: "rgba(225, 29, 72, 0.1)",
      badgeBorder: "rgba(225, 29, 72, 0.25)",
      badgeColor: "#E11D48",
    },
    upcomingQuiet: {
      background: "#FFFFFF",
      border: "1px solid rgba(226, 232, 240, 0.9)",
      textColor: "#475569",
      badgeBg: "rgba(241, 245, 249, 0.8)",
      badgeBorder: "rgba(203, 213, 225, 0.6)",
      badgeColor: "#64748B",
    },
    lockedSubdued: {
      background: "rgba(248, 250, 252, 0.75)",
      border: "1px dashed rgba(203, 213, 225, 0.8)",
      textColor: "#94A3B8",
      badgeBg: "rgba(241, 245, 249, 0.5)",
      badgeBorder: "rgba(226, 232, 240, 0.6)",
      badgeColor: "#94A3B8",
      opacity: 0.6,
    },
    milestoneMonolith: {
      background: "linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)",
      border: "1.5px solid #F59E0B",
      edgeGlow: "0 0 24px -2px rgba(245, 158, 11, 0.35)",
      textColor: "#78350F",
      badgeBg: "rgba(245, 158, 11, 0.15)",
      badgeBorder: "rgba(245, 158, 11, 0.35)",
      badgeColor: "#B45309",
    },
    revisionAlert: {
      background: "linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 100%)",
      border: "1.5px solid #E11D48",
      edgeGlow: "0 0 24px -2px rgba(225, 29, 72, 0.3)",
      textColor: "#9F1239",
      badgeBg: "rgba(225, 29, 72, 0.15)",
      badgeBorder: "rgba(225, 29, 72, 0.3)",
      badgeColor: "#E11D48",
    },
  },

  // ─── 3. LIGHTING & OPTICS ──────────────────────────────────────────────
  lighting: {
    ambientTop: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99, 102, 241, 0.07), transparent)",
    contourMesh: "rgba(148, 163, 184, 0.10)",
    laserCompleted: "hsl(var(--brand-blue))",
    laserActivePulse: "hsl(var(--brand-red))",
    laserInactive: "rgba(203, 213, 225, 0.75)",
  },

  // ─── 4. KINETICS & MOTION TIMING (Apple Spring Physics) ───────────────
  motion: {
    springSmooth: "cubic-bezier(0.16, 1, 0.3, 1)",
    springSnappy: "cubic-bezier(0.25, 1, 0.5, 1)",
    pulseTravelDurationMs: 800,
    hoverTransitionDurationMs: 240,
    breathingCycleDurationSec: 4.0,
  },
} as const;

export type SpatialNodeType = "COMPLETED" | "ACTIVE_CURRENT" | "UPCOMING" | "LOCKED" | "MILESTONE" | "REVISION";
