import { useLocation, Link } from "react-router-dom";
import {
  ShieldAlert,
  Database,
  Stethoscope,
  Network,
  Cpu,
  CheckCircle2,
  ChevronLeft,
  Terminal,
  Activity,
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
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const intelligenceNavItems = [
  {
    title: "Command Center",
    url: "/academic-intelligence",
    icon: Activity,
    description: "Tổng quan các tầng bằng chứng",
  },
  {
    title: "Evidence Explorer",
    url: "/academic-intelligence/evidence",
    icon: Database,
    description: "Truy vết chuỗi bằng chứng học tập",
  },
  {
    title: "Diagnostic Engine",
    url: "/academic-intelligence/diagnostic",
    icon: Stethoscope,
    description: "Bộ quy tắc chẩn đoán & bẫy lỗi",
  },
  {
    title: "IELTS Ontology",
    url: "/academic-intelligence/ontology",
    icon: Network,
    description: "Danh mục vi kỹ năng & lỗi",
  },
  {
    title: "Student Model",
    url: "/academic-intelligence/student-model",
    icon: Cpu,
    description: "Năng lực học sinh & tái tính toán",
  },
  {
    title: "Audit & Integrity",
    url: "/academic-intelligence/audit",
    icon: ShieldAlert,
    description: "Kiểm toán toàn vẹn dữ liệu",
  },
];

export function AcademicIntelligenceSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="border-r border-slate-800 bg-slate-950 text-slate-100 dark:bg-slate-950">
      {/* Header */}
      <SidebarHeader className="p-4 border-b border-slate-800/80 bg-slate-900/40">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-200">
            <Activity className="h-4 w-4 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-sm tracking-tight text-slate-100">
                ARIS Academic
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Intelligence & Analysis
            </p>
          </div>
        </div>
      </SidebarHeader>

      {/* Navigation Modules */}
      <SidebarContent className="px-2 py-3">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] font-medium text-slate-400 uppercase tracking-wider px-2">
            Phân hệ học thuật
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-1.5 space-y-0.5">
            <SidebarMenu>
              {intelligenceNavItems.map((item) => {
                const isActive =
                  item.url === "/academic-intelligence"
                    ? location.pathname === "/academic-intelligence"
                    : location.pathname.startsWith(item.url);

                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={`w-full justify-start gap-3 px-3 py-2 rounded transition-colors ${
                        isActive
                          ? "bg-slate-800 text-white font-semibold border border-slate-700 shadow-xs"
                          : "text-slate-300 hover:bg-slate-900 hover:text-white"
                      }`}
                    >
                      <NavLink to={item.url} className="flex items-center w-full">
                        <item.icon
                          className={`h-4 w-4 shrink-0 ${
                            isActive ? "text-emerald-400" : "text-slate-400"
                          }`}
                        />
                        <span className="text-sm">{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer Return Link */}
      <SidebarFooter className="p-3 border-t border-slate-800 bg-slate-900/30">
        <Button
          asChild
          variant="outline"
          size="sm"
          className="w-full justify-start gap-2 border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs"
        >
          <Link to="/admin">
            <ChevronLeft className="h-3.5 w-3.5 text-slate-400" />
            <span>Quay lại Quản trị LMS</span>
          </Link>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
