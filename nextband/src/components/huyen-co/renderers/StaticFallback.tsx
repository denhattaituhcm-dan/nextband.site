import React, { useState } from "react";
import { RendererProps } from "../CharacterContract";
import { HUYEN_CO_STATE_MAP } from "../HuyenCoState";
import { cn } from "@/lib/utils";

export const StaticFallback: React.FC<RendererProps> = ({
  state,
  size,
  variant,
  altText,
  className,
  onFallback,
}) => {
  const [loadError, setLoadError] = useState(false);
  const meta = HUYEN_CO_STATE_MAP[state] || HUYEN_CO_STATE_MAP.NEUTRAL;
  const isPortrait = variant === "portrait" || size >= 120;

  const stateImgSrc = `/assets/mascot/huyen_co_${meta.assetKey}.webp`;
  const masterImgSrc = `/assets/mascot/huyen_co_master.png`;
  const legacyImgSrc = `/mascot/Huyenco.png`;

  if (loadError) {
    return (
      <div
        className={cn(
          "w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-amber-400 font-serif font-bold text-sm border border-amber-500/40 shadow-inner",
          className
        )}
      >
        玄
      </div>
    );
  }

  return (
    <picture className={cn("w-full h-full flex items-center justify-center overflow-hidden", className)}>
      <source srcSet={stateImgSrc} type="image/webp" />
      <source srcSet={masterImgSrc} type="image/png" />
      <img
        src={masterImgSrc}
        alt={altText}
        width={size}
        height={size}
        loading={isPortrait ? "lazy" : "eager"}
        onError={(e) => {
          const target = e.currentTarget as HTMLImageElement;
          if (target.src !== legacyImgSrc && !target.src.endsWith("/mascot/Huyenco.png")) {
            target.src = legacyImgSrc;
          } else {
            setLoadError(true);
            onFallback?.();
          }
        }}
        className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105 motion-reduce:hover:scale-100"
      />
    </picture>
  );
};
