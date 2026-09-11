import { useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Settings,
  GraduationCap,
  ChevronLeft,
  ClipboardCheck,
  School,
  ShieldCheck,
  FolderKanban,
  Award,
  Mic,
  UserPlus,
  UserCheck,
  Bell,
  FileCheck,
  TrendingUp,
  Trophy,
  CreditCard,
  BookMarked,
  Sparkles,
  Bot,
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
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { SiteLogo } from "@/components/common/SiteLogo";

interface SidebarItem {
  title: string;
  url: string;
  icon: any;
  iconColor: string;
  iconBg: string;
  adminOnly?: boolean;
}

interface SidebarCategory {
  id: string;
  label: string;
  badge?: string;
  badgeColor?: string;
  items: SidebarItem[];
  showFor: "all" | "admin" | "teacher_or_admin";
}

// 📌 4 NHÓM CHỨC NĂNG KHOA HỌC & TRỰC QUAN
const navigationCategories: SidebarCategory[] = [
  {
    id: "teaching",
    label: "Đào tạo & Giảng dạy",
    badge: "Academics",
    badgeColor: "bg-blue-50 text-blue-600 border-blue-200",
    showFor: "teacher_or_admin",
    items: [
      {
        title: "Lớp học",
        url: "/admin/classes",
        icon: School,
        iconColor: "text-indigo-600",
        iconBg: "bg-indigo-50",
      },
      {
        title: "Chấm bài lớp",
        url: "/admin/teacher-workspace",
        icon: ClipboardCheck,
        iconColor: "text-emerald-600",
        iconBg: "bg-emerald-50",
      },
      {
        title: "Khảo thí thử",
        url: "/admin/assessments",
        icon: FileCheck,
        iconColor: "text-blue-600",
        iconBg: "bg-blue-50",
      },
      {
        title: "Ngân hàng bài",
        url: "/admin/exams",
        icon: FolderKanban,
        iconColor: "text-amber-600",
        iconBg: "bg-amber-50",
      },
      {
        title: "Thi đua lớp học",
        url: "/admin/class-league",
        icon: Trophy,
        iconColor: "text-yellow-600",
        iconBg: "bg-yellow-50",
      },
    ],
  },
  {
    id: "business",
    label: "Tuyển sinh & Tài chính",
    badge: "Operations",
    badgeColor: "bg-emerald-50 text-emerald-600 border-emerald-200",
    showFor: "admin",
    items: [
      {
        title: "Dashboard",
        url: "/admin",
        icon: LayoutDashboard,
        iconColor: "text-sky-600",
        iconBg: "bg-sky-50",
        adminOnly: true,
      },
      {
        title: "Báo cáo định kỳ",
        url: "/admin/reports",
        icon: TrendingUp,
        iconColor: "text-teal-600",
        iconBg: "bg-teal-50",
        adminOnly: true,
      },
      {
        title: "Khách tư vấn (Leads)",
        url: "/admin/leads",
        icon: UserPlus,
        iconColor: "text-rose-600",
        iconBg: "bg-rose-50",
        adminOnly: false,
      },
      {
        title: "Khóa học",
        url: "/admin/courses",
        icon: BookOpen,
        iconColor: "text-violet-600",
        iconBg: "bg-violet-50",
        adminOnly: true,
      },
      {
        title: "Học phí & Công nợ",
        url: "/admin/tuition",
        icon: CreditCard,
        iconColor: "text-emerald-600",
        iconBg: "bg-emerald-50",
        adminOnly: true,
      },
    ],
  },
  {
    id: "users",
    label: "Học viên & Nhân sự",
    badge: "Users & HR",
    badgeColor: "bg-purple-50 text-purple-600 border-purple-200",
    showFor: "admin",
    items: [
      {
        title: "Hồ sơ học viên",
        url: "/admin/students",
        icon: BookMarked,
        iconColor: "text-cyan-600",
        iconBg: "bg-cyan-50",
        adminOnly: false,
      },
      {
        title: "Học viên (QL Tài khoản)",
        url: "/admin/users?role=student",
        icon: Users,
        iconColor: "text-blue-600",
        iconBg: "bg-blue-50",
        adminOnly: true,
      },
      {
        title: "Giáo viên",
        url: "/admin/teachers",
        icon: GraduationCap,
        iconColor: "text-indigo-600",
        iconBg: "bg-indigo-50",
        adminOnly: true,
      },
      {
        title: "Nhân viên",
        url: "/admin/staff",
        icon: UserCheck,
        iconColor: "text-purple-600",
        iconBg: "bg-purple-50",
        adminOnly: true,
      },
      {
        title: "Quản trị viên",
        url: "/admin/admins",
        icon: ShieldCheck,
        iconColor: "text-slate-700",
        iconBg: "bg-slate-100",
        adminOnly: true,
      },
    ],
  },
  {
    id: "tools",
    label: "Công cụ & Hệ thống",
    badge: "System & AI",
    badgeColor: "bg-amber-50 text-amber-600 border-amber-200",
    showFor: "admin",
    items: [
      {
        title: "Speaking Forecast",
        url: "/admin/speaking-forecast",
        icon: Mic,
        iconColor: "text-orange-600",
        iconBg: "bg-orange-50",
        adminOnly: true,
      },
      {
        title: "Evidence",
        url: "/admin/evidence",
        icon: Award,
        iconColor: "text-amber-600",
        iconBg: "bg-amber-50",
        adminOnly: true,
      },
      {
        title: "Academic Intelligence",
        url: "/academic-intelligence",
        icon: Bot,
        iconColor: "text-violet-600",
        iconBg: "bg-violet-50",
        adminOnly: true,
      },
      {
        title: "Thông báo",
        url: "/admin/notifications",
        icon: Bell,
        iconColor: "text-rose-500",
        iconBg: "bg-rose-50",
        adminOnly: false,
      },
      {
        title: "Lễ / Tết",
        url: "/admin/seasonal",
        icon: Sparkles,
        iconColor: "text-pink-600",
        iconBg: "bg-pink-50",
        adminOnly: true,
      },
      {
        title: "Cài đặt",
        url: "/admin/settings",
        icon: Settings,
        iconColor: "text-slate-600",
        iconBg: "bg-slate-100",
        adminOnly: true,
      },
    ],
  },
];

export function AdminSidebar() {
  const location = useLocation();
  const { state } = useSidebar();
  const { isAdmin, isTeacher, isStaff } = useAuth();
  const collapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  const isVisibleForUser = (category: SidebarCategory) => {
    if (category.showFor === "teacher_or_admin") {
      return isAdmin || isTeacher;
    }
    if (category.showFor === "admin") {
      return isAdmin || isStaff;
    }
    return true;
  };

  return (
    <Sidebar collapsible="icon" className="border-r bg-sidebar font-sans">
      <SidebarHeader className="border-b px-4 py-3.5 bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-full items-center justify-start overflow-hidden">
            <SiteLogo
              alt="NextBand Admin Logo"
              className={`transition-all ${collapsed ? "w-8" : "max-h-8 w-auto"}`}
            />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-2 space-y-4">
        {navigationCategories.filter(isVisibleForUser).map((category) => {
          // Lọc item theo role
          const visibleItems = category.items.filter((item) => {
            if (isAdmin) return true;
            if (isStaff && !item.adminOnly) return true;
            return false;
          });

          if (visibleItems.length === 0) return null;

          return (
            <SidebarGroup key={category.id} className="p-0">
              <SidebarGroupLabel className="px-2.5 py-1.5 flex items-center justify-between text-[11px] font-bold tracking-wider uppercase text-slate-500 select-none">
                <span>{category.label}</span>
                {!collapsed && category.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium border ${category.badgeColor}`}
                  >
                    {category.badge}
                  </span>
                )}
              </SidebarGroupLabel>

              <SidebarGroupContent className="mt-1">
                <SidebarMenu className="space-y-0.5">
                  {visibleItems.map((item) => {
                    const active = isActive(item.url);
                    const Icon = item.icon;

                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          isActive={active}
                          tooltip={item.title}
                          className={`transition-all rounded-lg text-sm font-medium ${
                            active
                              ? "bg-blue-50/90 text-blue-700 font-semibold shadow-xs"
                              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                          }`}
                        >
                          <NavLink
                            to={item.url}
                            end={item.url === "/admin"}
                            className="flex items-center gap-2.5 px-2.5 py-2 w-full"
                          >
                            <div
                              className={`flex items-center justify-center h-6 w-6 rounded-md transition-transform duration-150 ${
                                active
                                  ? `${item.iconBg} ${item.iconColor} ring-1 ring-black/5`
                                  : `${item.iconBg} ${item.iconColor} group-hover:scale-105`
                              }`}
                            >
                              <Icon className="h-3.5 w-3.5" />
                            </div>
                            <span className="truncate">{item.title}</span>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>

      <SidebarFooter className="border-t p-3 bg-slate-50/50">
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start text-xs font-medium text-slate-600 hover:text-blue-600 hover:border-blue-200 transition-colors"
          asChild
        >
          <Link to="/app">
            <ChevronLeft className="mr-1.5 h-3.5 w-3.5" />
            {!collapsed && "Về Student Portal"}
          </Link>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

