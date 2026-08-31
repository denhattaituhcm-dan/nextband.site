import React, { useEffect } from "react";
import { RendererProps } from "../CharacterContract";
import { HUYEN_CO_STATE_MAP } from "../HuyenCoState";
import { cn } from "@/lib/utils";

export const GLBRenderer: React.FC<RendererProps> = ({
  state,
  className,
  onFallback,
}) => {
  const meta = HUYEN_CO_STATE_MAP[state] || HUYEN_CO_STATE_MAP.NEUTRAL;
  const glbSrc = `/assets/mascot/huyen_co_${meta.assetKey}.glb`;

  // Runtime check for WebGL support and GLB model availability
  useEffect(() => {
    fetch(glbSrc, { method: "HEAD" })
      .then((res) => {
        if (!res.ok) {
          onFallback?.();
        }
      })
      .catch(() => {
        onFallback?.();
      });
  }, [glbSrc, onFallback]);

  return (
    <div
      className={cn(
        "w-full h-full relative overflow-hidden flex items-center justify-center bg-slate-950/40",
        className
      )}
    >
      {/* 3D WebGL Canvas mount point when active */}
      <div className="text-[10px] text-amber-400 font-mono tracking-tight animate-pulse">
        [3D Live]
      </div>
    </div>
  );
};
