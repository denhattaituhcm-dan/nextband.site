/**
 * Lightweight GA4 Analytics Helper for NextBand
 * Activates automatically when VITE_GA_MEASUREMENT_ID is configured in environment variables.
 * Safe no-op when unconfigured (no mock data, no console noise).
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const MEASUREMENT_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID || "").trim();
let isInitialized = false;

export function isAnalyticsEnabled(): boolean {
  return Boolean(MEASUREMENT_ID) && typeof window !== "undefined";
}

export function initAnalytics(): void {
  if (!isAnalyticsEnabled() || isInitialized) return;
  isInitialized = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", MEASUREMENT_ID, {
    send_page_view: false, // Tracked explicitly on SPA route changes
  });

  const existing = document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`);
  if (!existing) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(MEASUREMENT_ID)}`;
    document.head.appendChild(script);
  }
}

export function trackPageView(path: string, title?: string): void {
  if (!isAnalyticsEnabled() || !window.gtag) return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_title: title || document.title,
    page_location: window.location.href,
  });
}

export function setAnalyticsUserProperties(props: {
  is_logged_in: "yes" | "no";
  user_role?: string;
}): void {
  if (!isAnalyticsEnabled() || !window.gtag) return;
  window.gtag("set", "user_properties", props);
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean | undefined>
): void {
  if (!isAnalyticsEnabled() || !window.gtag) return;
  window.gtag("event", eventName, params || {});
}
