import React, { useState } from "react";
import { Check, Lock, Award, ArrowRight, AlertTriangle, Sparkles } from "lucide-react";
import { AscentLessonNode } from "@/components/student/AcademicAscentWorld";
import { SPATIAL_TOKENS, SpatialNodeType } from "@/lib/spatial/spatial-tokens";
import { SpatialCapability } from "@/lib/spatial/useSpatialCapability";

interface SpatialCurriculumNodeProps {
  node: AscentLessonNode;
  isCurrent: boolean;
  capability: SpatialCapability;
  onSelect: (node: AscentLessonNode) => void;
  index: number;
  totalNodes: number;
}

export const SpatialCurriculumNode: React.FC<SpatialCurriculumNodeProps> = ({
  node,
  isCurrent,
  capability,
  onSelect,
  index,
  totalNodes,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Derive semantic node type
  const isCompleted = node.status === "GRADED" || node.status === "SUBMITTED";
  const isRevision = node.status === "REVISION_REQUIRED";
  const isMilestone = node.isMilestone || node.order % 9 === 0;
  const isLocked = !isCompleted && !isCurrent && !isRevision && index > (totalNodes * 0.8); // gentle fade for distant nodes

  let nodeType: SpatialNodeType = "UPCOMING";
  if (isRevision) nodeType = "REVISION";
  else if (isCurrent) nodeType = "ACTIVE_CURRENT";
  else if (isMilestone) nodeType = "MILESTONE";
  else if (isCompleted) nodeType = "COMPLETED";
  else if (isLocked) nodeType = "LOCKED";

  // Visual materials based on token system
  const material =
    nodeType === "COMPLETED"
      ? SPATIAL_TOKENS.materials.matteCompleted
      : nodeType === "ACTIVE_CURRENT"
      ? SPATIAL_TOKENS.materials.activeLuminous
      : nodeType === "MILESTONE"
      ? SPATIAL_TOKENS.materials.milestoneMonolith
      : nodeType === "REVISION"
      ? SPATIAL_TOKENS.materials.revisionAlert
      : nodeType === "LOCKED"
      ? SPATIAL_TOKENS.materials.lockedSubdued
      : SPATIAL_TOKENS.materials.upcomingQuiet;

  const elevationStyle = isHovered && capability.allowHoverLift
    ? SPATIAL_TOKENS.elevation.hoverLift
    : isCurrent
    ? SPATIAL_TOKENS.elevation.floating
    : SPATIAL_TOKENS.elevation.surface;

  return (
    <div
      className="relative group transition-all"
      style={{
        transition: `transform ${SPATIAL_TOKENS.motion.hoverTransitionDurationMs}ms ${SPATIAL_TOKENS.motion.springSmooth}, box-shadow ${SPATIAL_TOKENS.motion.hoverTransitionDurationMs}ms ease`,
        transform: elevationStyle.transform,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. Breathing Ambient Halo for Current Focus */}
      {isCurrent && capability.tier !== "STATIC_SPATIAL" && (
        <div
          className="absolute -inset-2.5 rounded-3xl bg-rose-500/15 blur-md pointer-events-none animate-pulse"
          style={{ animationDuration: `${SPATIAL_TOKENS.motion.breathingCycleDurationSec}s` }}
        />
      )}

      {/* 2. Interactive Main Node Button */}
      <button
        type="button"
        onClick={() => onSelect(node)}
        aria-current={isCurrent ? "step" : undefined}
        aria-label={`Buổi ${node.order}: ${node.title} - ${isCompleted ? "Đã hoàn thành" : isCurrent ? "Vị trí hiện tại" : "Chưa hoàn thành"}`}
        className="w-full text-left rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4 relative z-10 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 cursor-pointer select-none"
        style={{
          background: material.background,
          border: material.border,
          boxShadow: elevationStyle.shadow,
          opacity: "opacity" in material ? material.opacity : 1,
        }}
      >
        {/* Left Side: Glyph / Puck Object */}
        <div className="flex items-center gap-4 min-w-0">
          {/* Spatial 3D Puck */}
          <div
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-mono font-black text-sm shrink-0 transition-transform shadow-xs relative overflow-hidden"
            style={{
              background:
                nodeType === "COMPLETED"
                  ? "#0F172A"
                  : nodeType === "ACTIVE_CURRENT"
                  ? "#E11D48"
                  : nodeType === "MILESTONE"
                  ? "#F59E0B"
                  : nodeType === "REVISION"
                  ? "#E11D48"
                  : "#F1F5F9",
              color:
                nodeType === "UPCOMING" || nodeType === "LOCKED" ? "#475569" : "#FFFFFF",
            }}
          >
            {/* Top Inset Highlight */}
            <div className="absolute inset-x-0 top-0 h-1/3 bg-white/15 pointer-events-none" />

            {nodeType === "COMPLETED" ? (
              <Check className="w-5 h-5 text-emerald-400 stroke-[3]" />
            ) : nodeType === "ACTIVE_CURRENT" ? (
              <span className="text-white text-xs font-mono font-black">
                {String(node.order).padStart(2, "0")}
              </span>
            ) : nodeType === "MILESTONE" ? (
              <Award className="w-5 h-5 text-white" />
            ) : nodeType === "REVISION" ? (
              <AlertTriangle className="w-5 h-5 text-white" />
            ) : nodeType === "LOCKED" ? (
              <Lock className="w-4 h-4 text-slate-400" />
            ) : (
              <span>{String(node.order).padStart(2, "0")}</span>
            )}
          </div>

          {/* Node Text Hierarchy */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-slate-400">
                Buổi {String(node.order).padStart(2, "0")} · Chapter 0{node.chapterIndex}
              </span>

              {isMilestone && (
                <span className="px-2 py-0.5 rounded-full bg-amber-100/90 text-amber-900 font-mono text-[10px] font-extrabold border border-amber-300/60 inline-flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-600" /> Milestone
                </span>
              )}

              {isCurrent && (
                <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 font-mono text-[10px] font-black border border-rose-200 inline-flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping" />
                  YOU ARE HERE
                </span>
              )}

              {isRevision && (
                <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-mono text-[10px] font-bold border border-rose-300">
                  Cần nộp lại
                </span>
              )}
            </div>

            <h4
              className="text-sm sm:text-base font-extrabold truncate mt-1 tracking-tight"
              style={{ color: material.textColor }}
            >
              {node.title}
            </h4>

            {node.description && (
              <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                {node.description}
              </p>
            )}
          </div>
        </div>

        {/* Right Side: Action Indicator */}
        <div className="shrink-0 flex items-center gap-2 text-xs font-bold">
          {isCompleted ? (
            <span className="text-emerald-600 flex items-center gap-1 font-mono text-xs hidden sm:flex">
              Đã xong <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 transition-transform" />
            </span>
          ) : isCurrent ? (
            <span className="px-3.5 py-1.5 rounded-xl bg-rose-600 text-white font-mono font-bold text-xs shadow-xs flex items-center gap-1.5 group-hover:bg-rose-700 transition-colors">
              Tiếp tục <ArrowRight className="w-3.5 h-3.5" />
            </span>
          ) : (
            <span className="text-slate-400 font-mono text-xs hidden sm:inline">
              ~{node.estimatedMinutes || 35}p
            </span>
          )}
        </div>
      </button>

      {/* 3. Hover Floating Information Sheet (Progressive Detail) */}
      {isHovered && capability.tier === "FULL_SPATIAL" && (
        <div className="absolute left-1/2 -top-12 -translate-x-1/2 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-[11px] font-mono shadow-xl border border-slate-700 pointer-events-none z-30 whitespace-nowrap animate-in fade-in zoom-in-95 duration-150 flex items-center gap-2">
          <span>Buổi {node.order}</span>
          <span className="text-slate-500">•</span>
          <span>{node.chapterTitle}</span>
          <span className="text-slate-500">•</span>
          <span className={isCompleted ? "text-emerald-400" : isCurrent ? "text-rose-400" : "text-slate-300"}>
            {isCompleted ? "Xem lại bài nộp" : isCurrent ? "Đang học" : "Chưa làm"}
          </span>
        </div>
      )}
    </div>
  );
};
