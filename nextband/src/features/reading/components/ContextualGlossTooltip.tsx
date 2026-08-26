import React from "react";
import { VocabularyTerm } from "../types";
import { Volume2, X, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContextualGlossTooltipProps {
  term: VocabularyTerm;
  position: { top: number; left: number };
  onClose: () => void;
  onSave?: (term: string) => void;
  isSaved?: boolean;
}

export const ContextualGlossTooltip: React.FC<ContextualGlossTooltipProps> = ({
  term,
  position,
  onClose,
  onSave,
  isSaved = false,
}) => {
  const handlePlayAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(term.term);
      utterance.lang = "en-US";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
      className="fixed z-50 -translate-x-1/2 -translate-y-full mb-2 w-80 max-w-[90vw] rounded-xl border border-slate-700 bg-slate-900/95 p-4 text-white shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-150"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-base font-extrabold text-amber-400 capitalize tracking-wide">
              {term.term}
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              {term.pronunciation}
            </span>
            <button
              onClick={handlePlayAudio}
              className="rounded-full p-1 text-slate-400 hover:bg-slate-800 hover:text-amber-300 transition-colors"
              title="Phát âm"
            >
              <Volume2 className="h-4 w-4" />
            </button>
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            {term.pos}
          </span>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Content */}
      <div className="mt-2.5 space-y-2 text-xs">
        <div>
          <p className="text-slate-300 font-medium leading-relaxed">
            {term.meaning_en}
          </p>
        </div>

        <div className="rounded-lg bg-amber-500/10 p-2 border border-amber-500/20">
          <p className="font-semibold text-amber-300">
            🇻🇳 {term.meaning_vi}
          </p>
        </div>

        {term.context_note && (
          <div className="rounded-md bg-slate-800/80 p-2 text-[11px] text-slate-300">
            <span className="font-bold text-slate-400 block mb-0.5">📌 Trong ngữ cảnh này:</span>
            {term.context_note}
          </div>
        )}
      </div>

      {/* Footer action */}
      {onSave && (
        <div className="mt-3 flex justify-end border-t border-slate-800/80 pt-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onSave(term.term)}
            className="h-7 text-xs text-slate-300 hover:text-amber-400 hover:bg-slate-800"
          >
            <BookmarkCheck className="mr-1.5 h-3.5 w-3.5 text-amber-400" />
            {isSaved ? "Đã lưu vào sổ tay" : "Lưu vào sổ từ"}
          </Button>
        </div>
      )}

      {/* Little arrow */}
      <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 border-solid border-t-slate-900 border-t-8 border-x-transparent border-x-8 border-b-0" />
    </div>
  );
};
