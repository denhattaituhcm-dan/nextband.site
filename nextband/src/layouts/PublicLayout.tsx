import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { ConsultationBubble } from "@/components/public/ConsultationBubble";
import { useAuth } from "@/hooks/useAuth";

export default function PublicLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Detect if user just landed on a public page from an OAuth redirect or saved redirect target
  const isAuthRedirecting = Boolean(
    (typeof window !== "undefined" &&
      (window.location.hash.includes("access_token") ||
        window.location.hash.includes("refresh_token") ||
        window.location.search.includes("code="))) ||
      (typeof sessionStorage !== "undefined" &&
        sessionStorage.getItem("auth_redirect_target") &&
        (isLoading || user))
  );

  // If user just authenticated via OAuth and landed on a public page, redirect inside
  useEffect(() => {
    if (isLoading || !user) return;

    const savedTarget = sessionStorage.getItem("auth_redirect_target");
    const hasAuthHash =
      window.location.hash.includes("access_token") ||
      window.location.hash.includes("refresh_token") ||
      window.location.search.includes("code=");

    if (savedTarget || hasAuthHash) {
      if (savedTarget) {
        sessionStorage.removeItem("auth_redirect_target");
      }
      const destination = savedTarget || "/app";
      const target = destination === "/" ? "/app" : destination;

      if (user.roles?.includes("admin")) {
        const adminTarget = target.startsWith("/admin") ? target : "/admin";
        navigate(adminTarget, { replace: true });
      } else if (user.roles?.includes("teacher")) {
        const teacherTarget = target.startsWith("/admin") && target !== "/admin" ? target : "/admin/teacher-workspace";
        navigate(teacherTarget, { replace: true });
      } else {
        navigate(target, { replace: true });
      }
    }
  }, [user, isLoading, navigate]);

  if (isAuthRedirecting) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center space-y-3 p-12 bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-medium text-muted-foreground animate-pulse">
          Đang chuyển hướng vào hệ thống...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-clip flex flex-col bg-background text-foreground selection:bg-primary-soft selection:text-primary">
      <PublicHeader />
      <main className="flex-1 w-full max-w-full overflow-x-clip">
        <Outlet />
      </main>
      <PublicFooter />
      <ConsultationBubble />
    </div>
  );
}

