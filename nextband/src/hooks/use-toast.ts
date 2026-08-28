import * as React from "react";
import { toast as sonnerToast } from "sonner";
import type { ToastActionElement, ToastProps } from "@/components/ui/toast";

type ToasterToast = ToastProps & {
  id?: string;
  duration?: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

type Toast = Omit<ToasterToast, "id">;

function toast({ title, description, variant, duration }: Toast) {
  const message = typeof title === "string" ? title : (title ? String(title) : "");
  const opts: any = {};
  if (description) opts.description = description;
  if (duration) opts.duration = duration;

  if (variant === "destructive") {
    return sonnerToast.error(message || (description as string) || "Đã xảy ra lỗi", opts);
  }
  return sonnerToast.success(message || (description as string) || "Thành công", opts);
}

function useToast() {
  return {
    toast,
    dismiss: (toastId?: string) => {
      if (toastId) sonnerToast.dismiss(toastId);
      else sonnerToast.dismiss();
    },
    toasts: [] as ToasterToast[],
  };
}

export { useToast, toast };
