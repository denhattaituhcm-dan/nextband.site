import React, { useState } from "react";
import { CharacterContract } from "./CharacterContract";
import { StaticFallback, WebMRenderer, GLBRenderer } from "./renderers";

export const HuyenCoRenderer: React.FC<CharacterContract> = ({
  state,
  size,
  variant,
  renderTier,
  className,
  altText = "Huyền Cơ Lão Nhân",
}) => {
  // Cascading fallback state: glb -> webm -> static
  const [activeTier, setActiveTier] = useState<"glb" | "webm" | "static">(() => {
    if (renderTier === "glb") return "glb";
    if (renderTier === "webm") return "webm";
    return "static";
  });

  const handleGlbFallback = () => {
    setActiveTier("webm");
  };

  const handleWebmFallback = () => {
    setActiveTier("static");
  };

  if (activeTier === "glb") {
    return (
      <GLBRenderer
        state={state}
        size={size}
        variant={variant}
        altText={altText}
        className={className}
        onFallback={handleGlbFallback}
      />
    );
  }

  if (activeTier === "webm") {
    return (
      <WebMRenderer
        state={state}
        size={size}
        variant={variant}
        altText={altText}
        className={className}
        onFallback={handleWebmFallback}
      />
    );
  }

  return (
    <StaticFallback
      state={state}
      size={size}
      variant={variant}
      altText={altText}
      className={className}
    />
  );
};
