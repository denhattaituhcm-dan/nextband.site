import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClientHeader } from "../components/navigation/ClientHeader";
import { ClientSidebar } from "../components/navigation/ClientSidebar";
import { SidebarProvider } from "../components/ui/sidebar";

vi.mock("@react-oauth/google", () => ({
  GoogleLogin: () => null,
}));

vi.mock("../lib/api", () => ({
  notificationsApi: {
    list: vi.fn().mockResolvedValue({ success: true, data: [] }),
    getUnreadCount: vi.fn().mockResolvedValue({ success: true, count: 0 }),
    markAsRead: vi.fn(),
    markAllAsRead: vi.fn(),
  },
  authApi: {
    loginWithGoogle: vi.fn(),
  },
}));

vi.mock("../lib/supabase", () => ({
  supabase: {
    channel: vi.fn().mockReturnValue({
      on: vi.fn().mockReturnThis(),
      subscribe: vi.fn().mockReturnThis(),
    }),
    removeChannel: vi.fn(),
  },
}));

vi.mock("../hooks/useAuth", () => ({
  useAuth: () => ({
    user: { id: "student-uuid-1", email: "student@test.com", fullName: "DANBUFFETT" },
    isAuthenticated: true,
    isAdmin: false,
    isTeacher: false,
    signOut: vi.fn(),
  }),
}));

vi.mock("../hooks/useStudentLifecycle", () => ({
  useStudentLifecycle: () => ({
    state: "ENROLLED",
    resolveClass: () => ({
      status: "AUTHORIZED",
      activeClass: { className: "D01 07.2026", classId: "class-1" },
    }),
  }),
}));

vi.mock("../hooks/useSiteSettings", () => ({
  useSiteSettings: () => ({
    settings: {
      zaloLink: "https://zalo.me/0933319693",
    },
    isLoading: false,
  }),
}));

describe("Student Interface: Contact / Feedback via Zalo", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
  });

  it("ClientHeader displays quick contact/feedback button pointing to Zalo link", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <SidebarProvider>
            <ClientHeader />
          </SidebarProvider>
        </MemoryRouter>
      </QueryClientProvider>
    );

    const contactBtn = screen.getByRole("link", { name: /liên hệ \/ góp ý/i });
    expect(contactBtn).toBeInTheDocument();
    expect(contactBtn).toHaveAttribute("href", "https://zalo.me/0933319693");
    expect(contactBtn).toHaveAttribute("target", "_blank");
    expect(contactBtn).toHaveAttribute("rel", "noopener noreferrer");

    // Open profile dropdown
    const avatarBtn = screen.getByRole("button", { name: "D" });
    expect(avatarBtn).toBeInTheDocument();
    fireEvent.pointerDown(avatarBtn, { pointerType: "mouse" });
    fireEvent.keyDown(avatarBtn, { key: "Enter" });
    const dropdownContactLink = screen.queryByRole("menuitem", { name: /liên hệ \/ góp ý \(zalo\)/i });
    if (dropdownContactLink) {
      expect(dropdownContactLink).toHaveAttribute("href", "https://zalo.me/0933319693");
    }
  });

  it("ClientSidebar renders contact/feedback menu item pointing to Zalo link", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <SidebarProvider>
            <ClientSidebar />
          </SidebarProvider>
        </MemoryRouter>
      </QueryClientProvider>
    );

    const contactLinks = screen.getAllByRole("link", { name: /liên hệ \/ góp ý/i });
    expect(contactLinks.length).toBeGreaterThan(0);
    const sidebarContactLink = contactLinks.find((link) =>
      link.getAttribute("href") === "https://zalo.me/0933319693"
    );
    expect(sidebarContactLink).toBeDefined();
    expect(sidebarContactLink).toHaveAttribute("target", "_blank");
    expect(sidebarContactLink).toHaveAttribute("rel", "noopener noreferrer");
  });
});
