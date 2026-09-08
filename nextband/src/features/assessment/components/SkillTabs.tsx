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
    <div className={cn("w-full grid grid-cols-5 gap-1.5 sm:gap-2 p-1.5 bg-muted/70 backdrop-blur-sm rounded-2xl border border-border/80 shadow-xs", className)}>
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
              "w-full flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer text-center",
              isActive
                ? "bg-card text-brand-blue shadow-sm shadow-brand-blue/15 border border-brand-blue/30 font-black ring-1 ring-brand-blue/20"
                : "text-muted-foreground hover:text-foreground hover:bg-card/60",
            )}
          >
            <Icon className={cn("w-4 h-4 shrink-0", isActive ? "text-brand-blue" : "text-muted-foreground")} />
            <span className="truncate">{tab.baseLabel}</span>
            <span className={cn("hidden sm:inline-block text-[11px] font-semibold opacity-80 shrink-0", isActive ? "text-brand-blue" : "text-muted-foreground")}>
              {tab.duration}
            </span>
          </button>
        );
      })}
    </div>
  );
}
