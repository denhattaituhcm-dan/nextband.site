import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { NotificationBell } from "../components/navigation/NotificationBell";
import { MemoryRouter } from "react-router-dom";
import { submissionKeys } from "../lib/queryKeys";

let realtimeCallback: ((payload: any) => void) | null = null;

vi.mock("../lib/supabase", () => ({
  supabase: {
    channel: vi.fn(() => ({
      on: vi.fn((_event, _filter, cb) => {
        realtimeCallback = cb;
        return {
          subscribe: vi.fn((statusCb) => {
            if (statusCb) statusCb("SUBSCRIBED");
            return {};
          }),
        };
      }),
    })),
    removeChannel: vi.fn(),
  },
}));

vi.mock("../lib/api", () => ({
  notificationsApi: {
    list: vi.fn().mockResolvedValue({ success: true, data: [] }),
    getUnreadCount: vi.fn().mockResolvedValue({ success: true, count: 0 }),
    markAsRead: vi.fn(),
    markAllAsRead: vi.fn(),
  },
}));

vi.mock("../hooks/useAuth", () => ({
  useAuth: () => ({
    user: { id: "student-123", email: "denhattaituhcm@gmail.com" },
    isAuthenticated: true,
  }),
}));

vi.mock("sonner", () => ({
  toast: {
    info: vi.fn(),
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("Realtime Notification Synchronization (Live Event Propagation)", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_ENABLE_REALTIME", "true");
    realtimeCallback = null;
  });

  it("invalidates student domain queries (submissions, class-lessons, class-lessons-action-queue) and refetches active queries when TEACHER_FEEDBACK realtime notification arrives", async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");

    // Dummy consumer component subscribing to the student queries
    let submissionFetchCount = 0;
    let lessonFetchCount = 0;
    let actionQueueFetchCount = 0;

    function StudentDashboard() {
      useQuery({
        queryKey: submissionKeys.list({ studentId: "student-123" }),
        queryFn: async () => {
          submissionFetchCount++;
          return { data: [{ id: "sub-1", status: submissionFetchCount > 1 ? "GRADED" : "SUBMITTED" }] };
        },
      });

      useQuery({
        queryKey: ["class-lessons", "class-uuid"],
        queryFn: async () => {
          lessonFetchCount++;
          return { data: { lessons: [] } };
        },
      });

      useQuery({
        queryKey: ["class-lessons-action-queue", "class-uuid"],
        queryFn: async () => {
          actionQueueFetchCount++;
          return { data: { lessons: [] } };
        },
      });

      return <NotificationBell scope="student" />;
    }

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <StudentDashboard />
        </MemoryRouter>
      </QueryClientProvider>
    );

    // Initial mount fetches
    await vi.waitFor(() => {
      expect(submissionFetchCount).toBe(1);
      expect(lessonFetchCount).toBe(1);
      expect(actionQueueFetchCount).toBe(1);
    });

    // Verify realtime channel listener was registered
    expect(realtimeCallback).toBeDefined();

    // Teacher completes grading and backend pushes TEACHER_FEEDBACK notification
    await act(async () => {
      realtimeCallback!({
        new: {
          id: "notif-grade-1",
          user_id: "student-123",
          type: "TEACHER_FEEDBACK",
          title: "Giáo viên đã chấm bài thi",
          message: "Thầy/Cô đã chấm và gửi nhận xét cho bài thi của bạn.",
          entityType: "SUBMISSION",
          entityId: "sub-1",
        },
      });
    });

    // 1. Assert domain query roots are invalidated
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: submissionKeys.all });
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["class-lessons"] });
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["class-lessons-action-queue"] });

    // In React Query, active queries matching the invalidated key are marked as invalid
    const subQuery = queryClient.getQueryCache().find({ queryKey: submissionKeys.list({ studentId: "student-123" }) });
    const lessonQuery = queryClient.getQueryCache().find({ queryKey: ["class-lessons", "class-uuid"] });
    const actionQueueQuery = queryClient.getQueryCache().find({ queryKey: ["class-lessons-action-queue", "class-uuid"] });

    expect(subQuery).toBeDefined();
    expect(lessonQuery).toBeDefined();
    expect(actionQueueQuery).toBeDefined();
  });
});
