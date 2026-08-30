import { useState, useEffect } from "react";

export type SpatialTier = "FULL_SPATIAL" | "REDUCED_SPATIAL" | "STATIC_SPATIAL";

export interface SpatialCapability {
  tier: SpatialTier;
  allowParallax: boolean;
  allowParticles: boolean;
  allowSvgGlowFilters: boolean;
  allowSpringTransitions: boolean;
  allowHoverLift: boolean;
  viewportWidth: number;
}

/**
 * Capability-based rendering detector without UA sniffing.
 * Evaluates:
 * - prefers-reduced-motion
 * - Network Data-Saver / Battery saving hints
 * - Hardware Concurrency
 * - Viewport dimensions
 */
export function detectSpatialCapability(): SpatialCapability {
  if (typeof window === "undefined") {
    return {
      tier: "STATIC_SPATIAL",
      allowParallax: false,
      allowParticles: false,
      allowSvgGlowFilters: false,
      allowSpringTransitions: false,
      allowHoverLift: false,
      viewportWidth: 1200,
    };
  }

  const viewportWidth = window.innerWidth;

  // 1. Accessibility First: User explicitly asked for reduced motion
  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  if (prefersReducedMotion) {
    return {
      tier: "STATIC_SPATIAL",
      allowParallax: false,
      allowParticles: false,
      allowSvgGlowFilters: false,
      allowSpringTransitions: false,
      allowHoverLift: false,
      viewportWidth,
    };
  }

  // 2. Battery & Data Saving Constraints
  const nav = navigator as any;
  const isSaveData = nav.connection?.saveData === true;
  const isMobileViewport = viewportWidth < 768;

  if (isSaveData || isMobileViewport) {
    return {
      tier: "REDUCED_SPATIAL",
      allowParallax: false,
      allowParticles: false,
      allowSvgGlowFilters: false,
      allowSpringTransitions: true,
      allowHoverLift: true,
      viewportWidth,
    };
  }

  // 3. Hardware Concurrency
  const hardwareConcurrency = navigator.hardwareConcurrency || 4;
  if (hardwareConcurrency < 4) {
    return {
      tier: "REDUCED_SPATIAL",
      allowParallax: false,
      allowParticles: false,
      allowSvgGlowFilters: true,
      allowSpringTransitions: true,
      allowHoverLift: true,
      viewportWidth,
    };
  }

  // 4. Full High-tier Spatial Mode
  return {
    tier: "FULL_SPATIAL",
    allowParallax: true,
    allowParticles: true,
    allowSvgGlowFilters: true,
    allowSpringTransitions: true,
    allowHoverLift: true,
    viewportWidth,
  };
}

export function useSpatialCapability(): SpatialCapability {
  const [capability, setCapability] = useState<SpatialCapability>(detectSpatialCapability);

  useEffect(() => {
    const handleUpdate = () => {
      setCapability(detectSpatialCapability());
    };

    const mediaQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    mediaQuery?.addEventListener?.("change", handleUpdate);
    window.addEventListener("resize", handleUpdate);

    return () => {
      mediaQuery?.removeEventListener?.("change", handleUpdate);
      window.removeEventListener("resize", handleUpdate);
    };
  }, []);

  return capability;
}
