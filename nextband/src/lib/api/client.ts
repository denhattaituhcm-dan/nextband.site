import { supabase } from "../supabase";

export const resolveApiBaseUrl = (): string => {
  const envUrl =
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
    (typeof process !== "undefined" && process.env?.VITE_API_URL);

  if (envUrl && !envUrl.includes("localhost") && !envUrl.includes("api.nextband.site")) {
    return envUrl;
  }

  // In browser on production / preview domain, use same-origin /api/v1
  if (typeof window !== "undefined" && !window.location.hostname.includes("localhost")) {
    return "/api/v1";
  }

  if (envUrl && !envUrl.includes("api.nextband.site")) {
    return envUrl;
  }

  return "http://localhost:3000/api/v1";
};

export const API_BASE_URL = resolveApiBaseUrl();

export type ApiErrorCode =
  | "AUTH_ERROR"
  | "PERMISSION_ERROR"
  | "SERVER_ERROR"
  | "NETWORK_ERROR"
  | "NOT_FOUND"
  | "VALIDATION_ERROR"
  | "UNKNOWN";

export class ApiError extends Error {
  public status: number;
  public code: ApiErrorCode;
  public details?: any;

  constructor(
    message: string,
    status: number = 500,
    code: ApiErrorCode = "UNKNOWN",
    details?: any
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export async function handleApiResponse<T = any>(
  res: Response,
  fallbackErrorMsg: string = "Yêu cầu thất bại"
): Promise<T> {
  if (res.ok) {
    return (await res.json()) as T;
  }

  let errorDetails: any = null;
  let errorMessage = fallbackErrorMsg;
  try {
    errorDetails = await res.json();
    if (errorDetails?.error || errorDetails?.message) {
      errorMessage = errorDetails.error || errorDetails.message;
    }
  } catch {
    // Non-JSON response body
  }

  if (res.status === 401) {
    throw new ApiError(
      "Phiên đăng nhập đã hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại.",
      401,
      "AUTH_ERROR",
      errorDetails
    );
  }

  if (res.status === 403) {
    throw new ApiError(
      "Bạn không có quyền thực hiện thao tác này.",
      403,
      "PERMISSION_ERROR",
      errorDetails
    );
  }

  if (res.status === 404) {
    throw new ApiError(
      errorMessage || "Không tìm thấy tài nguyên được yêu cầu.",
      404,
      "NOT_FOUND",
      errorDetails
    );
  }

  if (res.status === 400 || res.status === 422) {
    throw new ApiError(
      errorMessage,
      res.status,
      "VALIDATION_ERROR",
      errorDetails
    );
  }

  if (res.status >= 500) {
    throw new ApiError(
      errorMessage || "Máy chủ gặp sự cố khi xử lý yêu cầu.",
      res.status,
      "SERVER_ERROR",
      errorDetails
    );
  }

  throw new ApiError(errorMessage, res.status, "UNKNOWN", errorDetails);
}

let cachedAccessToken: string | null = null;
let cachedTokenExpiresAt = 0;

if (typeof window !== "undefined") {
  supabase.auth.onAuthStateChange((_event, session) => {
    cachedAccessToken = session?.access_token ?? null;
    cachedTokenExpiresAt = session?.expires_at ?? 0;
  });
}

export const getAuthToken = async (): Promise<string | null> => {
  try {
    const nowSec = Date.now() / 1000;
    if (cachedAccessToken && (!cachedTokenExpiresAt || nowSec < cachedTokenExpiresAt - 120)) {
      return cachedAccessToken;
    }

    const { data: { session } } = await supabase.auth.getSession();
    if (session?.access_token) {
      cachedAccessToken = session.access_token;
      cachedTokenExpiresAt = session.expires_at ?? 0;
      // Auto-refresh token if it expires in less than 2 minutes
      if (cachedTokenExpiresAt && nowSec > cachedTokenExpiresAt - 120) {
        try {
          const { data: refreshed } = await supabase.auth.refreshSession();
          if (refreshed?.session?.access_token) {
            cachedAccessToken = refreshed.session.access_token;
            cachedTokenExpiresAt = refreshed.session.expires_at ?? 0;
            return cachedAccessToken;
          }
        } catch (refreshErr) {
          console.warn("[Auth] Token refresh notice:", refreshErr);
        }
      }
      return session.access_token;
    }

    // Fallback: Check localStorage for cached Supabase session
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("sb-") && key.endsWith("-auth-token")) {
        const raw = localStorage.getItem(key);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed.access_token) {
            cachedAccessToken = parsed.access_token;
            cachedTokenExpiresAt = parsed.expires_at ?? 0;
            return parsed.access_token;
          }
        }
      }
    }
    return null;
  } catch {
    return null;
  }
};

export const gatewayHealthApi = {
  checkHealth: async (timeoutMs: number = 5000): Promise<{ isHealthy: boolean; latencyMs?: number; statusText?: string }> => {
    const start = Date.now();
    const abortCtrl = new AbortController();
    const timeoutId = setTimeout(() => abortCtrl.abort(), timeoutMs);

    try {
      const res = await fetch(`${API_BASE_URL}/health`, {
        signal: abortCtrl.signal,
      }).finally(() => clearTimeout(timeoutId));

      const latencyMs = Date.now() - start;
      if (res.ok) {
        return { isHealthy: true, latencyMs, statusText: "OK" };
      }
      return { isHealthy: false, latencyMs, statusText: `HTTP ${res.status}` };
    } catch (err: any) {
      clearTimeout(timeoutId);
      const isTimeout = err?.name === "AbortError";
      return {
        isHealthy: false,
        statusText: isTimeout ? "Timeout" : "Connection Failed",
      };
    }
  },
};

export class GatewayUnavailableError extends Error {
  isGatewayError = true;
  httpStatus: number;
  constructor(
    message: string = "Máy chủ đang khởi động lại hoặc kết nối không ổn định. Vui lòng thử lại sau giây lát.",
    status: number = 502
  ) {
    super(message);
    this.name = "GatewayUnavailableError";
    this.httpStatus = status;
  }
}

export interface FetchWithResilienceOptions extends RequestInit {
  retries?: number;
  retryDelayMs?: number;
  timeoutMs?: number;
}

export async function fetchWithResilience(
  url: string,
  options: FetchWithResilienceOptions = {}
): Promise<Response> {
  const {
    retries = 2,
    retryDelayMs = 800,
    timeoutMs = 12000,
    ...fetchOptions
  } = options;

  let attempt = 0;
  while (attempt <= retries) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      }).finally(() => clearTimeout(timer));

      // Gateway / Cloud Cold-start errors: 502 Bad Gateway, 503 Service Unavailable, 504 Gateway Timeout
      if (response.status === 502 || response.status === 503 || response.status === 504) {
        if (attempt < retries) {
          attempt++;
          await new Promise((resolve) => setTimeout(resolve, retryDelayMs * attempt));
          continue;
        }
        throw new GatewayUnavailableError(
          "Máy chủ đang khởi động lại. Vui lòng thử lại sau giây lát.",
          response.status
        );
      }

      return response;
    } catch (err: any) {
      clearTimeout(timer);
      if (err instanceof GatewayUnavailableError) {
        throw err;
      }

      const isAbort = err?.name === "AbortError";
      const isNetwork =
        err instanceof TypeError ||
        isAbort ||
        (err?.message && (
          err.message.toLowerCase().includes("failed to fetch") ||
          err.message.toLowerCase().includes("networkerror") ||
          err.message.toLowerCase().includes("network error")
        ));

      if (isNetwork && attempt < retries) {
        attempt++;
        await new Promise((resolve) => setTimeout(resolve, retryDelayMs * attempt));
        continue;
      }

      if (isNetwork) {
        throw new GatewayUnavailableError(
          "Không thể kết nối tới máy chủ. Đang tự động kết nối lại...",
          502
        );
      }

      throw err;
    }
  }

  throw new GatewayUnavailableError();
}

/**
 * Robust wrapper over fetchWithResilience with automatic Bearer token injection,
 * JSON content-type default, and standardized handling of network errors.
 */
export async function authenticatedFetch(
  url: string,
  options: FetchWithResilienceOptions = {}
): Promise<Response> {
  const token = await getAuthToken();
  const headers = new Headers(options.headers || {});

  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  if (options.body && typeof options.body === "string" && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  return fetchWithResilience(url, {
    ...options,
    headers,
  });
}
