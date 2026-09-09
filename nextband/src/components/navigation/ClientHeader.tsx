import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams, useNavigate } from "react-router-dom";
import { useStudentLifecycle } from "@/hooks/useStudentLifecycle";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { ZaloIcon } from "@/components/common/ZaloIcon";
import { NotificationBell } from "./NotificationBell";

export function ClientHeader() {
  const { user, signOut, isAdmin, isAuthenticated, isTeacher } = useAuth();
  const { settings } = useSiteSettings();
  const navigate = useNavigate();
  const { classId: urlClassId } = useParams<{ classId?: string }>();

  const zaloUrl = settings?.zaloLink || "https://zalo.me";

  const { state, resolveClass } = useStudentLifecycle();

  const resolved = resolveClass(urlClassId);
  const activeClassName =
    state === "ENROLLED" && resolved.status === "AUTHORIZED"
      ? resolved.activeClass.className
      : null;

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <>
      <header className="sticky top-0 shrink-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex items-center gap-3">
              {/* ENROLLED → show active class name */}
              {state === "ENROLLED" && activeClassName && (
                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-soft text-primary border border-primary/20">
                  {activeClassName}
                </span>
              )}

              {/* PRE_ENROLLMENT (Backend-confirmed) → show "Chưa có lớp học" */}
              {state === "PRE_ENROLLMENT" && (
                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-warning/10 text-warning-foreground border border-warning/20">
                  Chưa có lớp học
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Contact / Feedback via Zalo */}
            <a
              href={zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Liên hệ / Góp ý qua Zalo"
              title="Liên hệ / Góp ý qua Zalo"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-medium bg-blue-50/80 hover:bg-blue-100 text-[#0068FF] border border-blue-200/80 hover:border-blue-300 transition-all duration-150 shadow-2xs hover:shadow-xs active:scale-95 group"
            >
              <div className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:scale-110">
                <ZaloIcon className="w-full h-full text-[#0068FF]" />
              </div>
              <span className="hidden sm:inline font-semibold">Liên hệ / Góp ý</span>
            </a>

            <NotificationBell scope={isTeacher ? "teacher" : "student"} />
            {isAdmin && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/admin")}
              >
                Quản trị
              </Button>
            )}
            {!isAdmin && isTeacher && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/admin/teacher-workspace")}
              >
                Bàn làm việc Giáo viên
              </Button>
            )}

            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user?.avatarUrl || undefined} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user?.fullName?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">
                      {user?.fullName || "Người dùng"}
                    </p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Hồ sơ cá nhân
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a
                    href={zaloUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center cursor-pointer text-[#0068FF] font-medium"
                  >
                    <div className="mr-2 h-4 w-4 shrink-0">
                      <ZaloIcon className="w-full h-full text-[#0068FF]" />
                    </div>
                    Liên hệ / Góp ý (Zalo)
                  </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="text-destructive cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </>
  );
}
