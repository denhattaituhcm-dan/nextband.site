import React from "react";
import { HuyenCoProps } from "./HuyenCoState";
import { HuyenCoBaseSvg } from "./assets/HuyenCoBaseSvg";
import { cn } from "@/lib/utils";

export const HuyenCo: React.FC<HuyenCoProps> = ({
  state = "IDLE",
  size = 48,
  variant = "inline",
  showBadgeRing,
  className,
}) => {
  const numericSize =
    typeof size === "number"
      ? size
      : parseInt(size, 10) || 48;

  const isLauncher = variant === "launcher" || showBadgeRing === true;

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center relative select-none pointer-events-none",
        isLauncher &&
          "rounded-full bg-gradient-to-b from-red-950 via-amber-950/40 to-slate-950 border border-amber-500/40 shadow-inner p-1",
        className
      )}
      style={{ width: numericSize, height: numericSize }}
    >
      <HuyenCoBaseSvg state={state} size={isLauncher ? numericSize - 6 : numericSize} />
    </div>
  );
};
