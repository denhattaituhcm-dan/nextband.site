import React from "react";
import { useParams } from "react-router-dom";
import { WorkspaceProvider, useWorkspace } from "./WorkspaceProvider";
import { FixedHeader } from "./components/FixedHeader";
import { WorkspaceSkeleton } from "./components/WorkspaceSkeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { OverviewTab } from "./tabs/OverviewTab";
import { StudentsTab } from "./tabs/StudentsTab";
import { HomeworkTab } from "./tabs/HomeworkTab";
import { GradingTab } from "./tabs/GradingTab";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  RotateCcw,
  LayoutDashboard,
  BookOpen,
  Users,
  FileCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TabDef {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  activeClasses: string;
  hoverClasses: string;
  iconColor: string;
  badge?: {
    count: number | string;
    show: boolean;
    isAlert?: boolean;
  };
}

const WorkspaceInner: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    isLoading,
    isError,
    error,
    refetchClass,
    totalHomeworks,
    pendingReviewsCount,
    classData,
  } = useWorkspace();

  if (isLoading) {
    return <WorkspaceSkeleton type="overview" />;
  }

  if (isError) {
    return (
      <div className="p-8 border rounded-xl bg-card text-center space-y-3 max-w-md mx-auto my-12 shadow-xs">
        <AlertCircle className="h-10 w-10 text-rose-500 mx-auto" />
        <h4 className="text-base font-bold text-foreground">Không thể tải dữ liệu lớp học</h4>
        <p className="text-xs text-muted-foreground">
          {error?.message || "Đã xảy ra lỗi khi tải thông tin lớp học. Vui lòng kiểm tra lại kết nối."}
        </p>
        <Button size="sm" variant="outline" onClick={() => refetchClass()} className="gap-1.5">
          <RotateCcw className="h-3.5 w-3.5" />
          Thử lại
        </Button>
      </div>
    );
  }

  const studentsCount =
    (classData?.activeStudents || classData?.students || []).length ||
    classData?.studentCount ||
    0;

  const tabsConfig: TabDef[] = [
    {
      id: "overview",
      label: "Tổng quan",
      icon: LayoutDashboard,
      activeClasses:
        "data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:shadow-blue-500/25 data-[state=active]:ring-2 data-[state=active]:ring-blue-500/20",
      hoverClasses: "hover:text-blue-700 hover:bg-blue-50/70 dark:hover:bg-blue-950/40",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      id: "homework",
      label: "Nội dung & Bài tập",
      icon: BookOpen,
      activeClasses:
        "data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:shadow-purple-500/25 data-[state=active]:ring-2 data-[state=active]:ring-purple-500/20",
      hoverClasses: "hover:text-purple-700 hover:bg-purple-50/70 dark:hover:bg-purple-950/40",
      iconColor: "text-purple-600 dark:text-purple-400",
      badge: {
        count: `${totalHomeworks} bài`,
        show: totalHomeworks > 0,
      },
    },
    {
      id: "students",
      label: "Học viên & Điểm danh",
      icon: Users,
      activeClasses:
        "data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-teal-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:shadow-emerald-500/25 data-[state=active]:ring-2 data-[state=active]:ring-emerald-500/20",
      hoverClasses: "hover:text-emerald-700 hover:bg-emerald-50/70 dark:hover:bg-emerald-950/40",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      badge: {
        count: `${studentsCount} HV`,
        show: studentsCount > 0,
      },
    },
    {
      id: "grading",
      label: "Chấm bài",
      icon: FileCheck,
      activeClasses:
        "data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:via-orange-500 data-[state=active]:to-rose-500 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:shadow-amber-500/25 data-[state=active]:ring-2 data-[state=active]:ring-amber-500/20",
      hoverClasses: "hover:text-amber-700 hover:bg-amber-50/70 dark:hover:bg-amber-950/40",
      iconColor: "text-amber-600 dark:text-amber-400",
      badge: {
        count: `${pendingReviewsCount} chờ`,
        show: true,
        isAlert: pendingReviewsCount > 0,
      },
    },
  ];

  const contentThemeMap: Record<string, string> = {
    overview:
      "bg-gradient-to-b from-blue-50/60 via-blue-50/15 to-transparent border-blue-200/80 dark:from-blue-950/20 dark:border-blue-900/40 shadow-xs",
    homework:
      "bg-gradient-to-b from-purple-50/60 via-purple-50/15 to-transparent border-purple-200/80 dark:from-purple-950/20 dark:border-purple-900/40 shadow-xs",
    students:
      "bg-gradient-to-b from-emerald-50/60 via-emerald-50/15 to-transparent border-emerald-200/80 dark:from-emerald-950/20 dark:border-emerald-900/40 shadow-xs",
    grading:
      "bg-gradient-to-b from-amber-50/60 via-amber-50/15 to-transparent border-amber-200/80 dark:from-amber-950/20 dark:border-amber-900/40 shadow-xs",
  };

  return (
    <div className="space-y-4">
      {/* Clean Identity Header */}
      <FixedHeader />

      {/* Main 4 Core View Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-3">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-slate-100/90 dark:bg-slate-900/80 p-1.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 gap-1.5 h-auto shadow-inner">
          {tabsConfig.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className={cn(
                  "relative flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm tracking-tight transition-all duration-200 cursor-pointer select-none",
                  "text-slate-600 dark:text-slate-400 bg-transparent shadow-none border-0",
                  tab.hoverClasses,
                  tab.activeClasses
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 shrink-0 transition-transform",
                    isActive ? "text-white scale-110" : tab.iconColor
                  )}
                />
                <span>{tab.label}</span>
                {tab.badge && tab.badge.show && (
                  <span
                    className={cn(
                      "text-[10px] font-bold px-2 py-0.5 rounded-full border transition-all shrink-0",
                      isActive
                        ? "bg-white/20 text-white border-white/30"
                        : tab.badge.isAlert
                        ? "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800 animate-pulse"
                        : "bg-slate-200/80 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"
                    )}
                  >
                    {tab.badge.count}
                  </span>
                )}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* Themed dynamic content container */}
        <div
          className={cn(
            "rounded-2xl p-4 sm:p-5 border transition-all duration-300 ease-in-out",
            contentThemeMap[activeTab] || contentThemeMap.overview
          )}
        >
          <TabsContent value="overview" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
            <OverviewTab />
          </TabsContent>
          <TabsContent value="homework" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
            <HomeworkTab />
          </TabsContent>
          <TabsContent value="students" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
            <StudentsTab />
          </TabsContent>
          <TabsContent value="grading" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
            <GradingTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default function ClassWorkspaceRoot() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div className="p-8 text-center text-muted-foreground">Không tìm thấy mã lớp học.</div>;
  }

  return (
    <WorkspaceProvider classId={id}>
      <WorkspaceInner />
    </WorkspaceProvider>
  );
}
