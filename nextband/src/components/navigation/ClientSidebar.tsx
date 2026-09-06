import { useLocation } from "react-router-dom";
import {
  Compass,
  BookOpen,
  GraduationCap,
  User,
  Briefcase,
  ShieldCheck,
  Home,
  Sparkles,
  Workflow,
  CalendarCheck,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { useStudentLifecycle } from "@/hooks/useStudentLifecycle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SiteLogo } from "@/components/common/SiteLogo";

interface NavItem {
  title: string;
  url: string;
  icon: any;
  description: string;
  badge?: string;
}

interface NavGroup {
  groupLabel?: string;
  items: NavItem[];
}

const fullNavigationGroups: NavGroup[] = [
  {
    items: [
      {
        title: "Tổng quan",
        url: "/app",
        icon: Compass,
        description: "IELTS Command Center",
      },
      {
        title: "Lớp của tôi",
        url: "/app/my-courses",
        icon: BookOpen,
        description: "Lớp học và lộ trình",
      },
      {
        title: "Chuyên cần & Tiến độ",
        url: "/app/attendance",
        icon: CalendarCheck,
        description: "Điểm danh chuyên cần & tổng quan BTVN",
      },
      {
        title: "Bài Học Trực Quan",
        url: "/app/reconstruction",
        icon: Workflow,
        description: "Bài học tương tác & trực quan hóa tư duy",
        badge: "New",
      },
      {
        title: "Reading Universe",
        url: "/reading",
        icon: Sparkles,
        description: "Thư viện đọc hiểu & Phá án",
      },
      {
        title: "Kết quả & Nhận xét",
        url: "/app/my-submissions",
        icon: GraduationCap,
        description: "Lịch sử nộp bài & Đánh giá",
      },
      {
        title: "Thống kê năng lực",
        url: "/app/analytics",
        icon: ShieldCheck,
        description: "Phân tích lỗi & Điểm mạnh",
      },
      {
        title: "Cá nhân",
        url: "/app/profile",
        icon: User,
        description: "Thông tin cá nhân",
      },
    ],
  },
];

const preEnrollmentGroups: NavGroup[] = [
  {
    items: [
      {
        title: "Chào mừng",
        url: "/app",
        icon: Home,
        description: "Trang hỗ trợ & Kích hoạt",
      },
      {
        title: "Cá nhân",
        url: "/app/profile",
        icon: User,
        description: "Thông tin cá nhân",
      },
    ],
  },
];

export function ClientSidebar() {
  const location = useLocation();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { user } = useAuth();
  const { state: lifecycleState } = useStudentLifecycle();

  const isTeacher = user?.roles?.includes("teacher");
  const isAdmin = user?.roles?.includes("admin");

  /**
   * INVARIANT-01 & INVARIANT-05:
   * Menu is only reduced to preEnrollmentGroups when Backend
   * authoritatively confirms no enrollment (state === "PRE_ENROLLMENT").
   *
   * For LOADING, API_ERROR, NETWORK_ERROR → keep fullNavigationGroups.
   */
  const navigationGroups = lifecycleState === "PRE_ENROLLMENT"
    ? preEnrollmentGroups
    : fullNavigationGroups;

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar collapsible="icon" className="border-r border-slate-200 bg-white">
      <SidebarHeader className="border-b border-slate-100 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-full items-center justify-start overflow-hidden">
            <SiteLogo
              alt="NextBand Logo"
              className={`transition-all ${collapsed ? "w-8" : "max-h-8 w-auto"}`}
            />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-1.5 py-2">
        {navigationGroups.map((group, index) => (
          <SidebarGroup key={group.groupLabel || index} className="py-1.5">
            {group.groupLabel && (
              <SidebarGroupLabel className="text-[10px] font-bold tracking-wider text-slate-400 px-2.5 uppercase font-mono">
                {group.groupLabel}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.url)}
                      tooltip={item.title}
                      className="rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 data-[active=true]:bg-indigo-50 data-[active=true]:text-indigo-700 data-[active=true]:font-bold"
                    >
                      <NavLink
                        to={item.url}
                        end={item.url === "/app"}
                        className="flex items-center gap-2.5 text-xs py-2 w-full group"
                        activeClassName="bg-indigo-50 text-indigo-700 font-bold"
                      >
                        <item.icon className="h-4 w-4 shrink-0 text-slate-500 group-data-[active=true]:text-indigo-600" />
                        <span className="truncate">{item.title}</span>
                        {!collapsed && item.badge && (
                          <span className="ml-auto shrink-0 relative inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest text-white bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-500 shadow-[0_2px_10px_rgba(217,70,239,0.35)] ring-1 ring-white/30 backdrop-blur-xs">
                            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/25 via-transparent to-transparent opacity-60 pointer-events-none" />
                            <span className="relative drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]">{item.badge}</span>
                          </span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        {/* Workspace Switcher for Teachers & Admins */}
        {(isTeacher || isAdmin) && (
          <SidebarGroup className="mt-auto border-t border-slate-100 pt-2">
            <SidebarGroupLabel className="text-[10px] font-bold tracking-wider text-slate-400 px-2.5 uppercase font-mono">
              KHÔNG GIAN LÀM VIỆC
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {isTeacher && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Teacher Workspace">
                      <NavLink
                        to="/admin/teacher-workspace"
                        className="flex items-center gap-2.5 text-xs text-indigo-700 font-medium hover:bg-indigo-50"
                      >
                        <Briefcase className="h-4 w-4 shrink-0 text-indigo-600" />
                        <span>Teacher Workspace</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
                {isAdmin && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Quản trị hệ thống">
                      <NavLink
                        to="/admin"
                        className="flex items-center gap-2.5 text-xs text-amber-700 font-medium hover:bg-amber-50"
                      >
                        <ShieldCheck className="h-4 w-4 shrink-0 text-amber-600" />
                        <span>Quản trị hệ thống</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-100 p-3.5">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 border border-slate-200">
            <AvatarImage src={user?.avatarUrl || undefined} />
            <AvatarFallback className="bg-slate-100 text-slate-700 text-xs font-bold">
              {user?.fullName?.charAt(0) || <User className="h-3.5 w-3.5" />}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs font-bold text-slate-800 truncate">
                {user?.fullName || "Học viên"}
              </span>
              <span className="text-[11px] text-slate-500 truncate">
                {user?.email}
              </span>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
