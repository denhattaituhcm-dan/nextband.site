import React, { useRef, useEffect } from "react";
import { RendererProps } from "../CharacterContract";
import { HUYEN_CO_STATE_MAP } from "../HuyenCoState";
import { cn } from "@/lib/utils";

export const WebMRenderer: React.FC<RendererProps> = ({
  state,
  altText,
  className,
  onFallback,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const meta = HUYEN_CO_STATE_MAP[state] || HUYEN_CO_STATE_MAP.NEUTRAL;
  const webmSrc = `/assets/mascot/huyen_co_${meta.assetKey}.webm`;

  useEffect(() => {
    if (videoRef.current) {
      try {
        const playPromise = videoRef.current.play();
        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch(() => {
            // Autoplay may need user gesture or is suppressed in low power mode
          });
        }
      } catch {
        // Safe ignore in headless/test environments
      }
    }
  }, [state]);

  return (
    <div className={cn("w-full h-full relative overflow-hidden flex items-center justify-center", className)}>
      <video
        ref={videoRef}
        src={webmSrc}
        autoPlay
        loop
        muted
        playsInline
        aria-label={altText}
        onError={() => {
          // Trigger fallback when WebM asset is not present or cannot be decoded
          onFallback?.();
        }}
        className="w-full h-full object-cover object-center transition-opacity duration-300"
      />
    </div>
  );
};
