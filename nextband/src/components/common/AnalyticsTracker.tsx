import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  initAnalytics,
  setAnalyticsUserProperties,
  trackEvent,
  trackPageView,
} from "@/lib/analytics";

/**
 * Mounts once inside BrowserRouter + AuthProvider to:
 * 1. Initialize GA4 (if VITE_GA_MEASUREMENT_ID is configured)
 * 2. Sync user_properties (is_logged_in, user_role) & first-time login event
 * 3. Track SPA route page views
 */
export function AnalyticsTracker() {
  const { pathname, search } = useLocation();
  const { user, isLoading } = useAuth();
  const lastTrackedUserIdRef = useRef<string | null>(null);

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    if (isLoading) return;
    const primaryRole = user?.roles?.includes("admin")
      ? "admin"
      : user?.roles?.includes("teacher")
      ? "teacher"
      : user
      ? "student"
      : "guest";

    setAnalyticsUserProperties({
      is_logged_in: user ? "yes" : "no",
      user_role: primaryRole,
    });

    if (user?.id && lastTrackedUserIdRef.current !== user.id) {
      lastTrackedUserIdRef.current = user.id;
      try {
        const storageKey = "nb_ga_logged_uid";
        if (sessionStorage.getItem(storageKey) !== user.id) {
          sessionStorage.setItem(storageKey, user.id);
          trackEvent("login", { user_role: primaryRole });
        }
      } catch {
        // Ignore storage errors in restricted browsing modes
      }
    }
  }, [user, isLoading]);

  useEffect(() => {
    trackPageView(`${pathname}${search}`);
  }, [pathname, search]);

  return null;
}
