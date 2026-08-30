import React, { useRef, useEffect } from "react";
import { SpatialCapability } from "@/lib/spatial/useSpatialCapability";

interface SpatialAtmosphereCanvasProps {
  capability: SpatialCapability;
  className?: string;
}

/**
 * Topographic contour curves and ambient micro-dust.
 * Zero external libraries, purely procedural and CPU throttled.
 */
export const SpatialAtmosphereCanvas: React.FC<SpatialAtmosphereCanvasProps> = ({
  capability,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (capability.tier === "STATIC_SPATIAL") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth || 800);
    let height = (canvas.height = canvas.offsetHeight || 600);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || 800;
      height = canvas.height = canvas.offsetHeight || 600;
    };

    window.addEventListener("resize", handleResize);

    // Particle field
    const particleCount = capability.tier === "FULL_SPATIAL" ? 28 : 12;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.15,
      speedY: (Math.random() - 0.5) * 0.15,
      opacity: Math.random() * 0.35 + 0.1,
    }));

    let step = 0;

    const render = () => {
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      step += 0.003;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw procedural topographic contour lines (Subtle depth grid)
      ctx.lineWidth = 1;
      const numLines = capability.tier === "FULL_SPATIAL" ? 5 : 3;

      for (let i = 0; i < numLines; i++) {
        ctx.beginPath();
        const baseOffset = (i * height) / (numLines + 1);
        ctx.strokeStyle = `rgba(148, 163, 184, ${0.04 + i * 0.015})`;

        for (let x = 0; x <= width; x += 25) {
          const y =
            baseOffset +
            Math.sin(x * 0.003 + step + i * 1.2) * 22 +
            Math.cos(x * 0.006 - step * 0.8) * 14;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // 2. Draw ambient micro particles (Knowledge stardust)
      if (capability.allowParticles) {
        ctx.fillStyle = "rgba(99, 102, 241, 0.4)";
        for (const p of particles) {
          p.x += p.speedX;
          p.y += p.speedY;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(99, 102, 241, ${p.opacity})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [capability]);

  if (capability.tier === "STATIC_SPATIAL") {
    return (
      <div
        className={`absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] ${className}`}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ opacity: 0.85 }}
    />
  );
};
