import React, { useState } from "react";
import { HuyenCoProps, HUYEN_CO_STATE_MAP } from "./HuyenCoState";
import { HuyenCoBaseSvg } from "./assets/HuyenCoBaseSvg";
import { cn } from "@/lib/utils";

export const HuyenCo: React.FC<HuyenCoProps> = ({
  state = "NEUTRAL",
  size = 48,
  variant = "inline",
  showBadgeRing,
  className,
  altText,
}) => {
  const [imgError, setImgError] = useState(false);
  const meta = HUYEN_CO_STATE_MAP[state] || HUYEN_CO_STATE_MAP.NEUTRAL;
  const assetKey = meta.assetKey;

  const numericSize =
    typeof size === "number"
      ? size
      : parseInt(size, 10) || 48;

  const isLauncher = variant === "launcher" || showBadgeRing === true;
  const isPortrait = variant === "portrait" || numericSize >= 120;
  const imageSrc = `/assets/mascot/huyen_co_${assetKey}.webp`;
  const defaultAlt = altText || `Huyền Cơ Lão Nhân — ${meta.label}`;

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center relative select-none shrink-0 transition-transform duration-300",
        isLauncher &&
          "rounded-full bg-gradient-to-b from-slate-900 via-[#0f294d] to-slate-950 border border-brand-red/30 shadow-md p-1",
        isPortrait && "drop-shadow-md",
        className
      )}
      style={{ width: numericSize, height: numericSize }}
      title={`${defaultAlt} (${meta.voiceTone})`}
    >
      {!imgError ? (
        <picture className="w-full h-full flex items-center justify-center overflow-hidden rounded-full">
          <source srcSet={imageSrc} type="image/webp" />
          <img
            src={imageSrc}
            alt={defaultAlt}
            width={numericSize}
            height={numericSize}
            loading={isPortrait ? "lazy" : "eager"}
            onError={() => setImgError(true)}
            className={cn(
              "w-full h-full object-cover object-top transition-all duration-300",
              "hover:scale-105 motion-reduce:hover:scale-100"
            )}
          />
        </picture>
      ) : (
        <HuyenCoBaseSvg state={state} size={isLauncher ? numericSize - 6 : numericSize} />
      )}
    </div>
  );
};

