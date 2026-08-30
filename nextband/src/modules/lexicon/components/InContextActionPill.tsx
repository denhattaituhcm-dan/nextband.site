import React from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InContextActionPillProps {
  rect: DOMRect | null;
  onUnderstand: () => void;
}

export const InContextActionPill: React.FC<InContextActionPillProps> = ({
  rect,
  onUnderstand,
}) => {
  if (!rect) return null;

  // Calculate fixed position right above the text selection
  const top = Math.max(10, rect.top + window.scrollY - 42);
  const left = Math.max(10, rect.left + window.scrollX + rect.width / 2 - 60);

  return (
    <div
      data-lexicon-ui="pill"
      style={{
        position: "absolute",
        top: `${top}px`,
        left: `${left}px`,
        zIndex: 9999,
      }}
      className="animate-in fade-in zoom-in-95 duration-150"
    >
      <Button
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onUnderstand();
        }}
        className="h-8 rounded-full bg-slate-900 text-amber-400 hover:bg-slate-800 shadow-md border border-amber-400/30 px-3 text-xs font-medium flex items-center gap-1.5 transition-all transform hover:scale-105"
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        <span>Hiểu từ này</span>
      </Button>
    </div>
  );
};
