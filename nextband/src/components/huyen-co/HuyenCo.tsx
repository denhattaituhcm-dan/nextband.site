import React from "react";
import { HuyenCoProps, HUYEN_CO_STATE_MAP } from "./HuyenCoState";
import { HuyenCoRenderer } from "./HuyenCoRenderer";
import { RenderTier } from "./CharacterContract";
import { cn } from "@/lib/utils";

export const HuyenCo: React.FC<HuyenCoProps> = ({
  state = "NEUTRAL",
  size = 48,
  variant = "inline",
  renderMode = "auto",
  showBadgeRing,
  className,
  altText,
}) => {
  const meta = HUYEN_CO_STATE_MAP[state] || HUYEN_CO_STATE_MAP.NEUTRAL;

  const numericSize =
    typeof size === "number"
      ? size
      : parseInt(size as string, 10) || 48;

  const isLauncher = variant === "launcher" || showBadgeRing === true;
  const isPortrait = variant === "portrait" || numericSize >= 120;
  const defaultAlt =
    altText || `Huyền Cơ Lão Nhân — ${meta.label} (${meta.fanGesture})`;

  // Map renderMode to RenderTier
  const renderTier: RenderTier =
    renderMode === "webgl" ? "glb" : renderMode === "webm" ? "webm" : renderMode === "image" ? "static" : "auto";

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center relative select-none shrink-0 transition-transform duration-300",
        isPortrait && "drop-shadow-xl",
        className
      )}
      style={{ width: numericSize, height: numericSize }}
      title={`${defaultAlt} — "${meta.fanGesture}"`}
    >
      <div className="w-full h-full flex items-center justify-center overflow-hidden rounded-full relative">
        <HuyenCoRenderer
          state={state}
          size={numericSize}
          variant={variant}
          renderTier={renderTier}
          altText={defaultAlt}
        />
      </div>
    </div>
  );
};
