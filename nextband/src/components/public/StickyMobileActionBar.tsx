import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function StickyMobileActionBar() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Hiện thanh khi cuộn qua Hero (khoảng 420px)
      if (window.scrollY > 420) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Thanh hành động nhanh di động"
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 p-3 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] sm:hidden transition-all duration-300 animate-in slide-in-from-bottom"
      )}
    >
      <div className="flex items-center gap-2.5 max-w-md mx-auto">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-brand-blue uppercase tracking-wide">
            <Sparkles className="h-3 w-3 text-amber-500 shrink-0" />
            <span className="truncate">NextBand by ARIS</span>
          </div>
          <p className="text-[11px] text-muted-foreground truncate">
            Đánh giá năng lực &amp; lộ trình cá nhân
          </p>
        </div>

        <Button
          size="sm"
          onClick={() => navigate("/assessment")}
          className="rounded-xl px-4 py-2 text-xs font-black bg-brand-red hover:bg-brand-red-hover text-white shadow-sm shrink-0 gap-1.5"
        >
          <span>Kiểm tra ngay</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </aside>
  );
}
