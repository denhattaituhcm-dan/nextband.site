import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AcademicIntelligenceSidebar } from "@/components/navigation/AcademicIntelligenceSidebar";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Cpu } from "lucide-react";

export default function AcademicIntelligenceLayout() {
  return (
    <SidebarProvider className="h-svh max-h-svh overflow-hidden">
      <div className="h-full flex w-full bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-slate-950 font-sans overflow-hidden">
        <AcademicIntelligenceSidebar />
        <div className="flex-1 min-w-0 flex flex-col h-full overflow-hidden">
          {/* Top Bar */}
          <header className="sticky top-0 shrink-0 z-30 flex h-13 items-center justify-between border-b border-slate-800 bg-slate-950/80 px-4 backdrop-blur">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-slate-400 hover:text-white" />
              <div className="h-4 w-px bg-slate-800" />
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-100">
                  ARIS Academic Intelligence
                </span>
                <span className="text-xs text-slate-500">|</span>
                <span className="text-xs text-slate-400">Control Plane</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-400">
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>Ledger: Immutable</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
                <Cpu className="h-3.5 w-3.5 text-sky-400" />
                <span>Recompute: 100% Deterministic</span>
              </div>
            </div>
          </header>

          {/* Main Body */}
          <main className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-950 text-slate-200">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
