import { useRef, useEffect, useCallback } from "react";

export interface MicroTiltOptions {
  /** Góc nghiêng tối đa theo độ (mặc định: 5 độ) */
  maxTilt?: number;
  /** Khoảng cách phối cảnh 3D (mặc định: 1000px) */
  perspective?: number;
  /** Tỉ lệ phóng khi hover (mặc định: 1.015) */
  scale?: number;
  /** Tự động làm phẳng khi hover lên selector con cụ thể (mặc định: "button, a, input, [data-tilt-flatten='true']") */
  flattenOnSelector?: string;
  /** Tắt hiệu ứng nếu cần */
  disabled?: boolean;
}

/**
 * useMicroTilt - Custom Hook 2.5D Micro-Tilt siêu nhẹ, zero re-render.
 *
 * Đặc điểm kỹ thuật:
 * 1. Zero useState trong pointermove: Sử dụng useRef + requestAnimationFrame ghi trực tiếp
 *    vào element.style và CSS variables (--rx, --ry, --gx, --gy).
 * 2. Easing khi chuột rời thẻ: Trả thẻ về trạng thái cân bằng với cubic-bezier(0.23, 1, 0.32, 1).
 * 3. Tự động vô hiệu hóa trên màn hình cảm ứng (hover: none) và tôn trọng prefers-reduced-motion.
 * 4. Hỗ trợ tự động làm phẳng góc nghiêng khi di chuột vào nút bấm / CTA để bảo toàn UX click.
 */
export function useMicroTilt<T extends HTMLElement>({
  maxTilt = 5,
  perspective = 1000,
  scale = 1.015,
  flattenOnSelector = "button, a, input, [data-tilt-flatten='true']",
  disabled = false,
}: MicroTiltOptions = {}) {
  const elementRef = useRef<T | null>(null);
  const rafIdRef = useRef<number | null>(null);

  const resetTilt = useCallback(
    (smooth = true) => {
      const el = elementRef.current;
      if (!el) return;

      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }

      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
      el.style.setProperty("--tilt-scale", "1");
      el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;

      if (smooth) {
        el.style.transition = "transform 0.65s cubic-bezier(0.23, 1, 0.32, 1)";
      } else {
        el.style.transition = "none";
      }
    },
    [perspective]
  );

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      const el = elementRef.current;
      if (!el || disabled) return;

      // Kiểm tra accessibility & touch input
      if (typeof window !== "undefined") {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        if (window.matchMedia("(hover: none)").matches) return;
      }

      // UX Guard: Tự động làm phẳng nếu người dùng đang di chuột trên nút bấm / CTA bên trong
      if (flattenOnSelector) {
        const target = e.target as HTMLElement | null;
        if (target && target.closest(flattenOnSelector)) {
          resetTilt(true);
          return;
        }
      }

      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }

      rafIdRef.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        if (!rect.width || !rect.height) return;

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Chuẩn hóa tọa độ từ -1 đến +1 quanh tâm thẻ
        const normX = (x / rect.width) * 2 - 1;
        const normY = (y / rect.height) * 2 - 1;

        const rx = Number((normY * -maxTilt).toFixed(2));
        const ry = Number((normX * maxTilt).toFixed(2));

        // Tỉ lệ phần trăm vị trí chuột cho hiệu ứng ánh sáng / glare
        const gx = Number(((x / rect.width) * 100).toFixed(1));
        const gy = Number(((y / rect.height) * 100).toFixed(1));

        el.style.setProperty("--rx", `${rx}deg`);
        el.style.setProperty("--ry", `${ry}deg`);
        el.style.setProperty("--gx", `${gx}%`);
        el.style.setProperty("--gy", `${gy}%`);
        el.style.setProperty("--tilt-scale", `${scale}`);

        el.style.transform = `perspective(${perspective}px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(${scale}, ${scale}, 1)`;
        el.style.transition = "transform 0.12s cubic-bezier(0.25, 1, 0.5, 1)";
      });
    },
    [disabled, flattenOnSelector, maxTilt, perspective, scale, resetTilt]
  );

  const handlePointerLeave = useCallback(() => {
    resetTilt(true);
  }, [resetTilt]);

  useEffect(() => {
    const el = elementRef.current;
    if (!el || disabled) return;

    // Khởi tạo style 3D ban đầu
    el.style.transformStyle = "preserve-3d";
    el.style.backfaceVisibility = "hidden";
    el.style.willChange = "transform";

    el.addEventListener("pointermove", handlePointerMove, { passive: true });
    el.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    return () => {
      el.removeEventListener("pointermove", handlePointerMove);
      el.removeEventListener("pointerleave", handlePointerLeave);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [handlePointerMove, handlePointerLeave, disabled]);

  return { ref: elementRef, resetTilt };
}
