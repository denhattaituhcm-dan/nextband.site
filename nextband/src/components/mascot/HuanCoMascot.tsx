import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { HuanCoState } from "@/lib/huanCoState";
import { HuyenCo } from "@/components/huyen-co";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, X, BookOpen, AlertCircle, Award } from "lucide-react";

interface HuanCoMascotProps {
  state: HuanCoState;
  className?: string;
}

export function HuanCoMascot({ state, className = "" }: HuanCoMascotProps) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isDodging, setIsDodging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const prevAdviceRef = useRef<string>(state.advice);

  const isCelebration = state.visualLevel === "celebration" || state.visualLevel === "ceremony";
  const isConcerned = state.visualLevel === "concerned";

  // Task 5: Disable/hide Huyen Co mascot interactions in Exam Mode
  const isExamMode =
    typeof window !== "undefined" &&
    (window.location.pathname.includes("/exam") ||
      window.location.pathname.includes("/simulation") ||
      window.location.pathname.includes("/real-test"));

  if (isExamMode) return null;

  // 1. One-shot Spring Bounce: Triggered subtly once when advice/trigger changes
  useEffect(() => {
    if (state.advice && state.advice !== prevAdviceRef.current) {
      prevAdviceRef.current = state.advice;
      setIsBouncing(true);
      const timer = setTimeout(() => setIsBouncing(false), 650);
      return () => clearTimeout(timer);
    }
  }, [state.advice]);

  // 2. Spatial Smart Evasion (Contextual Dodge):
  // When the cursor is working in the nearby bottom-right quadrant,
  // the mascot softly fades and shifts to yield focus to the student,
  // unless hovered directly or the dialog is open.
  useEffect(() => {
    if (isOpen) {
      setIsDodging(false);
      return;
    }

    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || isOpen) return;

      rafId = requestAnimationFrame(() => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const distance = Math.hypot(dx, dy);

        // Proximity threshold: 140px dodge boundary, 180px restore boundary
        if (distance < 140 && !isHovered) {
          setIsDodging(true);
        } else if (distance > 180) {
          setIsDodging(false);
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [isOpen, isHovered]);

  const handleCtaClick = () => {
    if (state.ctaPath) {
      setIsOpen(false);
      navigate(state.ctaPath);
    }
  };

  // Determine ambient halo tint based on state urgency & visual level
  const ambientHaloColor = isCelebration
    ? "bg-amber-400/30"
    : state.urgency === "RED"
    ? "bg-rose-500/25"
    : state.urgency === "ORANGE"
    ? "bg-amber-500/25"
    : state.urgency === "GREEN"
    ? "bg-emerald-500/20"
    : "bg-primary/20";

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => {
        setIsHovered(true);
        setIsDodging(false);
      }}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 select-none transition-all duration-300 ease-out ${
        isDodging && !isHovered && !isOpen
          ? "opacity-30 scale-90 translate-x-2 translate-y-2 pointer-events-auto"
          : "opacity-100 scale-100 translate-x-0 translate-y-0"
      } ${className}`}
    >
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={`group relative flex items-center justify-center p-1 rounded-full transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-hidden cursor-pointer ${
              isBouncing ? "animate-companion-spring" : ""
            }`}
            aria-label="Mở bảng chỉ dẫn của Huyền Cơ Lão Nhân"
          >
            {/* Subtle Spatial Ambient Aura (Breathing Realm Glow) */}
            <span
              className={`absolute -inset-1.5 rounded-full ${ambientHaloColor} blur-md transition-opacity duration-500 animate-spatial-aura pointer-events-none`}
            />

            {/* Mascot Circular Avatar - Wise Old Sage SVG HuyenCo Character */}
            <div
              className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden shadow-lg border-2 bg-slate-950 flex items-center justify-center transition-all ${state.ringColorClass}`}
            >
              <HuyenCo variant="launcher" state={isCelebration ? "ENCOURAGING" : isConcerned ? "THINKING" : "IDLE"} size={54} />
            </div>

            {/* Subtle Notification Dot (Static, non-flashing) */}
            <span
              className={`absolute top-1 right-1 w-3.5 h-3.5 rounded-full border-2 border-background shadow-xs ${state.dotColorClass}`}
            />

            {/* Quick Teaser Label on Desktop Hover */}
            <div className="hidden sm:group-hover:flex absolute right-full mr-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-card/95 border border-border shadow-md text-xs font-semibold text-foreground whitespace-nowrap items-center gap-1.5 backdrop-blur-xs pointer-events-none animate-in fade-in zoom-in-95">
              <span>Huyền Cơ Lão Nhân</span>
              <span className={`w-2 h-2 rounded-full ${state.dotColorClass}`} />
            </div>
          </button>
        </PopoverTrigger>

        <PopoverContent
          side="top"
          align="end"
          sideOffset={12}
          className="w-[calc(100vw-2.5rem)] sm:w-96 p-0 rounded-2xl border border-border/80 bg-card shadow-2xl overflow-hidden animate-in fade-in zoom-in-95"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-muted/40 border-b border-border/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-border/80 shadow-2xs shrink-0 flex items-center justify-center bg-slate-950">
                <HuyenCo variant="inline" state="IDLE" size={32} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-xs text-foreground tracking-tight">
                    Huyền Cơ Lão Nhân
                  </h3>
                  <Badge
                    variant="outline"
                    className={`text-[10px] h-4 px-1.5 font-bold uppercase ${
                      state.urgency === "RED"
                        ? "bg-rose-500/10 text-rose-600 border-rose-300"
                        : state.urgency === "ORANGE"
                        ? "bg-amber-500/10 text-amber-600 border-amber-300"
                        : state.urgency === "YELLOW"
                        ? "bg-amber-400/15 text-amber-700 border-amber-300"
                        : state.urgency === "GREEN"
                        ? "bg-emerald-500/10 text-emerald-600 border-emerald-300"
                        : "bg-primary/10 text-primary border-primary/20"
                    }`}
                  >
                    {state.badgeText}
                  </Badge>
                </div>
                <p className="text-[10px] text-muted-foreground font-medium">
                  {state.realm?.academicRank
                    ? `${state.realm.academicRank} • ${state.realm.realmName}`
                    : "Chỉ Dẫn Đồng Hành"}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
              aria-label="Đóng bảng chỉ dẫn"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-4 space-y-3.5">
            {/* Reward Banner if present */}
            {state.reward && (
              <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-semibold">
                <span className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>{state.reward.label || "Thành tích đạt được"}</span>
                </span>
                {state.reward.xp && <span className="font-bold">+{state.reward.xp} XP</span>}
              </div>
            )}

            {/* Quote with Mascot Voice */}
            <div className="relative p-3 rounded-xl bg-primary-soft/40 border border-primary/15 text-foreground space-y-1">
              <span className="text-xs font-serif italic leading-relaxed block text-foreground/90">
                “{state.quote}”
              </span>
            </div>

            {/* Concrete Action Card */}
            <div className="p-3 rounded-xl bg-card border border-border/70 shadow-2xs space-y-1.5">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                {isConcerned ? (
                  <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                )}
                <span>Mục tiêu hiện tại</span>
              </div>
              <p className="text-xs font-semibold text-foreground leading-snug">
                {state.advice}
              </p>
            </div>

            {/* Single Clear CTA Button */}
            {state.ctaLabel && state.ctaPath && (
              <Button
                onClick={handleCtaClick}
                className={`w-full font-bold text-xs h-9 rounded-xl gap-2 shadow-xs transition-all ${
                  state.urgency === "RED"
                    ? "bg-rose-600 hover:bg-rose-700 text-white"
                    : state.urgency === "ORANGE"
                    ? "bg-amber-600 hover:bg-amber-700 text-white"
                    : ""
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span className="truncate">{state.ctaLabel}</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </Button>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

