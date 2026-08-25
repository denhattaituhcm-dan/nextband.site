import { useQuery, useQueryClient } from "@tanstack/react-query";
import { classStudentsApi, MyClassEnrollment } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { useCallback, useMemo } from "react";
import { resolveClassContext, ResolveClassResult } from "@/lib/classContext";

/**
 * Authoritative lifecycle states for a student session.
 *
 * State machine (Pure Class Discovery - Single Source of Truth):
 *
 *   LOADING          → query in-flight
 *   PRE_ENROLLMENT   → 200 + data:[]  (Backend confirms: no enrollment)
 *   ENROLLED         → 200 + data:[…] (Backend confirms: has enrollment)
 *   API_ERROR        → 4xx / 5xx
 *   NETWORK_ERROR    → fetch exception / offline / timeout / rejection
 *
 * INVARIANT-01: API failure MUST NEVER produce PRE_ENROLLMENT.
 * INVARIANT-02: PRE_ENROLLMENT MUST ONLY originate from HTTP 200 + data:[].
 * INVARIANT-03: ENROLLED MUST ONLY originate from HTTP 200 + data.length > 0.
 * INVARIANT-04: FAULT ISOLATION: useStudentLifecycle MUST NOT depend on secondary
 *               widgets (workspace, homework, KPI, submissions, exams).
 * INVARIANT-05: TERMINAL STATE GUARANTEE: Every settled query MUST transition out
 *               of LOADING into a deterministic terminal state (isLoading === false).
 */
export type StudentLifecycleState =
  | "LOADING"
  | "PRE_ENROLLMENT"
  | "ENROLLED"
  | "API_ERROR"
  | "NETWORK_ERROR";

export interface StudentLifecycleError {
  httpStatus?: number;
  message: string;
}

const MY_CLASSES_QUERY_KEY = "my-class-memberships" as const;

export function useStudentLifecycle() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const queryClient = useQueryClient();

  // ─── Primary: fetch class memberships from Backend ──────────────────────────
  const {
    data: classesResult,
    isLoading: isLoadingEnrollments,
    isError: isQueryError,
    error: queryError,
    status: queryStatus,
  } = useQuery({
    queryKey: [MY_CLASSES_QUERY_KEY, user?.id],
    queryFn: () => classStudentsApi.getMyClasses(),
    enabled: !!isAuthenticated && !!user?.id,
    staleTime: 1000 * 60 * 2,
    retry: false,
  });

  // ─── Derive authoritative lifecycle state ───────────────────────────────────
  const isQuerySettled = queryStatus === "success" || queryStatus === "error";

  const { state, enrollments, lifecycleError } = useMemo<{
    state: StudentLifecycleState;
    enrollments: MyClassEnrollment[];
    lifecycleError: StudentLifecycleError | undefined;
  }>(() => {
    let s: StudentLifecycleState = "LOADING";
    let e: MyClassEnrollment[] = [];
    let err: StudentLifecycleError | undefined;

    if (isQuerySettled) {
      if (isQueryError || !classesResult) {
        const queryErr = queryError as any;
        const httpStatus = queryErr?.httpStatus || queryErr?.status;
        const message = queryErr?.message || "Không thể kết nối máy chủ";

        if (httpStatus === 401 || httpStatus === 403) {
          s = "API_ERROR";
          err = { httpStatus, message };
        } else if (httpStatus && httpStatus >= 400 && httpStatus < 600) {
          s = "API_ERROR";
          err = { httpStatus, message };
        } else {
          s = "NETWORK_ERROR";
          err = { message };
        }
      } else {
        switch (classesResult.status) {
          case "ok":
            e = classesResult.data || [];
            s = e.length > 0 ? "ENROLLED" : "PRE_ENROLLMENT";
            break;
          case "unauthenticated":
            s = "API_ERROR";
            err = { httpStatus: 401, message: "Phiên đăng nhập đã hết hạn" };
            break;
          case "api_error":
            s = "API_ERROR";
            err = {
              httpStatus: classesResult.httpStatus || 500,
              message: classesResult.message || "Lỗi máy chủ",
            };
            break;
          case "network_error":
            s = "NETWORK_ERROR";
            err = {
              message: classesResult.message || "Không thể kết nối tới máy chủ",
            };
            break;
        }
      }
    } else if (!authLoading && !isAuthenticated) {
      s = "API_ERROR";
      err = { httpStatus: 401, message: "Chưa đăng nhập" };
    } else if (!authLoading && isAuthenticated && !user?.id) {
      s = "API_ERROR";
      err = { httpStatus: 401, message: "Không tìm thấy hồ sơ người dùng" };
    }

    return { state: s, enrollments: e, lifecycleError: err };
  }, [isQuerySettled, isQueryError, classesResult, queryError, authLoading, isAuthenticated, user?.id]);

  const hasEnrollments = state === "ENROLLED";
  const isLoading = state === "LOADING";

  // ─── Pure Context Resolver (No Silent Fallback) ─────────────────────────────
  const resolveClass = useCallback(
    (targetClassId?: string | null): ResolveClassResult => {
      return resolveClassContext(enrollments, targetClassId);
    },
    [enrollments]
  );

  /**
   * Retry: invalidates the primary membership query and resets lifecycle to LOADING.
   */
  const retry = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: [MY_CLASSES_QUERY_KEY, user?.id] });
  }, [queryClient, user?.id]);

  return {
    state,
    enrollments,
    resolveClass,
    lifecycleError,
    hasEnrollments,
    isLoading,
    retry,
  };
}
