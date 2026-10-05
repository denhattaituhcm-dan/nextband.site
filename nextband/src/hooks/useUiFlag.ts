import { useState, useEffect, useMemo } from "react";
import { useSiteSettings } from "./useSiteSettings";

export type UiFlagKey =
  | "ui_today_mission"
  | "ui_my_courses_nav"
  | "ui_feedback_v2"
  | "ui_exam_zen";

const DEFAULT_FLAGS: Record<UiFlagKey, boolean> = {
  ui_today_mission: true, // Phase 1: Today Mission Card on Dashboard
  ui_my_courses_nav: true, // Phase 1: My Courses navigation item in Sidebar
  ui_feedback_v2: true,    // Phase 2: Refined feedback & error highlights
  ui_exam_zen: true,       // Phase 3: Focused exam mode enhancements
};

/**
 * Robust UI Feature Flag hook with cascading priority:
 * 1. URL search params (e.g. ?ui_today_mission=false or ?ui_today_mission=true) for instant testing / debugging
 * 2. LocalStorage override (key: `nb_flag_${flagKey}`)
 * 3. Global site settings (`siteSettings.flags?.[flagKey]`)
 * 4. Code default
 */
export function useUiFlag(flagKey: UiFlagKey): boolean {
  const { settings } = useSiteSettings();

  const [localOverride, setLocalOverride] = useState<boolean | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      // 1. URL search param check
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has(flagKey)) {
        return urlParams.get(flagKey) === "true";
      }
      // 2. LocalStorage check
      const stored = localStorage.getItem(`nb_flag_${flagKey}`);
      if (stored !== null) {
        return stored === "true";
      }
    } catch {
      // Fallback
    }
    return null;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleStorageChange = () => {
      try {
        const stored = localStorage.getItem(`nb_flag_${flagKey}`);
        if (stored !== null) {
          setLocalOverride(stored === "true");
        }
      } catch {
        // Fallback
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [flagKey]);

  return useMemo(() => {
    if (localOverride !== null) {
      return localOverride;
    }
    const serverFlag = (settings as any)?.flags?.[flagKey];
    if (typeof serverFlag === "boolean") {
      return serverFlag;
    }
    return DEFAULT_FLAGS[flagKey] ?? false;
  }, [localOverride, settings, flagKey]);
}
