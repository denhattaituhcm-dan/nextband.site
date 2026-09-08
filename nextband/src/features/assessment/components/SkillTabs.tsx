import React from "react";
import { Headphones, BookOpen, PenTool, Mic, Sparkles } from "lucide-react";
import { AssessmentSkill } from "../domain/assessment.types";
import { cn } from "@/lib/utils";

interface SkillTabsProps {
  activeSkill: AssessmentSkill;
  onSelectSkill: (skill: AssessmentSkill) => void;
  skillCounts: Record<AssessmentSkill, { answered: number; total: number }>;
  className?: string;
}

export function SkillTabs({ activeSkill, onSelectSkill, skillCounts, className }: SkillTabsProps) {
  const tabs: Array<{ id: AssessmentSkill; baseLabel: string; duration: string; icon: any }> = [
    { id: "listening", baseLabel: "Listening", duration: "~10p", icon: Headphones },
    { id: "reading", baseLabel: "Reading", duration: "~15p", icon: BookOpen },
    { id: "grammar", baseLabel: "Grammar", duration: "~5p", icon: Sparkles },
    { id: "writing", baseLabel: "Writing", duration: "~20p", icon: PenTool },
    { id: "speaking", baseLabel: "Speaking", duration: "~10p", icon: Mic },
  ];

  return (
    <div className={cn("flex items-center gap-1.5 p-1 bg-muted/70 backdrop-blur-sm rounded-full border border-border/80 overflow-x-auto no-scrollbar", className)}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeSkill === tab.id;
        const stat = skillCounts[tab.id];
        const isComplete = stat && stat.total > 0 && stat.answered >= stat.total;

        return (
          <button
            key={tab.id}
            onClick={() => onSelectSkill(tab.id)}
            className={cn(
              "flex items-center gap-2 px-3.5 py-1.5 rounded-full font-bold text-xs transition-all duration-200 whitespace-nowrap cursor-pointer",
              isActive
                ? "bg-card text-brand-blue shadow-sm shadow-brand-blue/10 border border-brand-blue/20 font-black"
                : "text-muted-foreground hover:text-foreground hover:bg-card/60",
            )}
          >
            <Icon className={cn("w-3.5 h-3.5", isActive ? "text-brand-blue" : "text-muted-foreground")} />
            <span>{tab.baseLabel}{stat && stat.total > 0 ? ` (${stat.total})` : ""}</span>
            <span className={cn("text-[10px] font-semibold opacity-75", isActive ? "text-brand-blue" : "text-muted-foreground")}>
              {tab.duration}
            </span>
            {stat && stat.total > 0 && (
              <span
                className={cn(
                  "px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ml-0.5",
                  isComplete
                    ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400"
                    : "bg-muted text-muted-foreground",
                )}
              >
                {stat.answered}/{stat.total}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
