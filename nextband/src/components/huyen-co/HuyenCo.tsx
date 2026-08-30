import React from "react";
import { HuyenCoProps } from "./HuyenCoState";
import { HuyenCoBaseSvg } from "./assets/HuyenCoBaseSvg";
import { cn } from "@/lib/utils";

export const HuyenCo: React.FC<HuyenCoProps> = ({
  state = "IDLE",
  size = 48,
  className,
}) => {
  const numericSize =
    typeof size === "number"
      ? size
      : parseInt(size, 10) || 48;

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center relative select-none pointer-events-none",
        className
      )}
      style={{ width: numericSize, height: numericSize }}
    >
      <HuyenCoBaseSvg state={state} size={numericSize} />
    </div>
  );
};
