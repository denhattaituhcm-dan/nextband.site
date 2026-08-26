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
      className="fixed z-50 -translate-x-1/2 -translate-y-full mb-2 w-80 max-w-[90vw] rounded-xl border border-stone-200 bg-white p-4 text-stone-900 shadow-2xl animate-in fade-in zoom-in-95 duration-150"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 border-b border-stone-100 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-base font-black text-emerald-800 capitalize tracking-wide">
              {term.term}
            </span>
            {term.pronunciation && 
              term.pronunciation.replace(/[^a-z]/gi, "").toLowerCase() !== term.term.replace(/[^a-z]/gi, "").toLowerCase() && (
              <span className="text-[11px] font-mono text-stone-500">
                {term.pronunciation}
              </span>
            )}
            <button
              onClick={handlePlayAudio}
              className="rounded-full p-1 text-stone-400 hover:bg-stone-100 hover:text-emerald-700 transition-colors cursor-pointer"
              title="Phát âm"
            >
              <Volume2 className="h-4 w-4" />
            </button>
          </div>
          {term.pos && !["content word", "phrase"].includes(term.pos.toLowerCase()) && (
            <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
              {term.pos}
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-1 text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Content */}
      <div className="mt-2.5 space-y-2 text-xs">
        {term.meaning_en && 
          term.meaning_en.toLowerCase().trim() !== term.term.toLowerCase().trim() &&
          term.meaning_en.toLowerCase().trim() !== term.meaning_vi.toLowerCase().trim() &&
          !term.meaning_en.toLowerCase().startsWith("academic term:") &&
          !term.meaning_en.toLowerCase().startsWith("contextual phrase:") &&
          !term.meaning_en.toLowerCase().startsWith("vocabulary in context:") && (
          <div>
            <p className="text-stone-700 font-normal leading-relaxed">
              {term.meaning_en}
            </p>
          </div>
        )}

        {term.meaning_vi && 
          term.meaning_vi.toLowerCase().trim() !== term.term.toLowerCase().trim() && (
          <div className="rounded-lg bg-emerald-50 p-2.5 border border-emerald-200/80">
            <p className="font-bold text-emerald-900 text-sm">
              {term.meaning_vi.replace(/^(🇻🇳|VN|vn|Cụm từ:|Từ vựng:)\s*/i, "").trim()}
            </p>
          </div>
        )}

        {term.context_note && 
          !term.context_note.includes("Xuất hiện trong hồ sơ vụ án để xây dựng") && (
          <div className="rounded-md bg-stone-50 p-2 text-[11px] text-stone-600 border border-stone-200/60">
            <span className="font-bold text-stone-700 block mb-0.5">📌 Trong ngữ cảnh này:</span>
            {term.context_note}
          </div>
        )}
      </div>

      {/* Footer action */}
      {onSave && (
        <div className="mt-3 flex justify-end border-t border-stone-100 pt-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onSave(term.term)}
            className="h-7 text-xs text-stone-600 hover:text-emerald-800 hover:bg-emerald-50 font-medium"
          >
            <BookmarkCheck className="mr-1.5 h-3.5 w-3.5 text-emerald-600" />
            {isSaved ? "Đã lưu vào sổ tay" : "Lưu vào sổ từ"}
          </Button>
        </div>
      )}

      {/* Little arrow */}
      <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 border-solid border-t-white border-t-8 border-x-transparent border-x-8 border-b-0 drop-shadow-xs" />
    </div>
  );
};
