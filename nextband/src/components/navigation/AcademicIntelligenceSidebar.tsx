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
    badge: "Control",
    description: "Tổng quan 3 tầng bằng chứng & trạng thái",
  },
  {
    title: "Evidence Explorer",
    url: "/academic-intelligence/evidence",
    icon: Database,
    badge: "Layer 1 & 2",
    description: "Sổ cái bằng chứng học thuật bất biến",
  },
  {
    title: "Diagnostic Engine",
    url: "/academic-intelligence/diagnostic",
    icon: Stethoscope,
    badge: "Hypotheses",
    description: "Telemetry bẫy lỗi & các deterministic rules",
  },
  {
    title: "IELTS Ontology",
    url: "/academic-intelligence/ontology",
    icon: Network,
    badge: "Taxonomy",
    description: "Bản đồ vi kỹ năng, lỗi & question tags",
  },
  {
    title: "Student Model",
    url: "/academic-intelligence/student-model",
    icon: Cpu,
    badge: "Bayesian",
    description: "Vector năng lực Beta & Full Recompute",
  },
  {
    title: "Audit & Integrity",
    url: "/academic-intelligence/audit",
    icon: ShieldAlert,
    badge: "Proof",
    description: "Kiểm định tái lập 1:1 & Anomaly scanner",
  },
];

export function AcademicIntelligenceSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="border-r border-slate-800 bg-slate-950 text-slate-100 dark:bg-slate-950">
      {/* Header */}
      <SidebarHeader className="p-4 border-b border-slate-800/80 bg-slate-900/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Terminal className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm tracking-tight text-slate-100">
                  ARIS Academic OS
                </span>
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[10px] text-slate-400 font-mono">
                Control Plane & Observability
              </p>
            </div>
          </div>
        </div>
      </SidebarHeader>

      {/* Navigation Modules */}
      <SidebarContent className="px-2 py-3">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2">
            Hệ Thống 5 Phân Hệ Bằng Chứng
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-1 space-y-1">
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
                      className={`w-full justify-start gap-3 px-3 py-2.5 rounded-md transition-all ${
                        isActive
                          ? "bg-slate-800 text-white font-medium shadow-sm border border-slate-700"
                          : "text-slate-300 hover:bg-slate-900 hover:text-white"
                      }`}
                    >
                      <NavLink to={item.url} className="flex items-center w-full">
                        <item.icon
                          className={`h-4 w-4 shrink-0 ${
                            isActive ? "text-emerald-400" : "text-slate-400"
                          }`}
                        />
                        <span className="truncate text-xs">{item.title}</span>
                        {item.badge && (
                          <Badge
                            variant="outline"
                            className="ml-auto text-[9px] px-1.5 py-0 h-4 border-slate-700 bg-slate-900 text-slate-300 font-mono"
                          >
                            {item.badge}
                          </Badge>
                        )}
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
