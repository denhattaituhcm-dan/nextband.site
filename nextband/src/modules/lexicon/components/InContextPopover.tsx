import React, { useState } from "react";
import { Sparkles, Bookmark, BookmarkCheck, Brain, X, Volume2, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ContextualLearningPayload } from "../types";
import { HuyenCo, HuyenCoState } from "@/components/huyen-co";

interface InContextPopoverProps {
  rect: DOMRect | null;
  selectedText: string;
  loading: boolean;
  data: ContextualLearningPayload | null;
  error?: string | null;
  onClose: () => void;
  onSave: () => void;
  isSaved?: boolean;
}

export const InContextPopover: React.FC<InContextPopoverProps> = ({
  rect,
  selectedText,
  loading,
  data,
  error,
  onClose,
  onSave,
  isSaved = false,
}) => {
  const [showMentalModel, setShowMentalModel] = useState(false);

  // Determine Huyen Co Character State based on UI interaction
  const huyenCoState: HuyenCoState = loading
    ? "THINKING"
    : isSaved
    ? "ENCOURAGING"
    : showMentalModel
    ? "EXPLAINING"
    : "UNDERSTANDING";

  if (!rect) return null;

  // Calculate position (below selection if space permits, else above)
  const top = Math.max(10, rect.bottom + window.scrollY + 8);
  const left = Math.min(
    window.innerWidth - 340,
    Math.max(10, rect.left + window.scrollX - 40)
  );

  const speakWord = (word: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div
      data-lexicon-ui="popover"
      style={{
        position: "absolute",
        top: `${top}px`,
        left: `${left}px`,
        zIndex: 9999,
        width: "330px",
      }}
      className="bg-slate-900/95 backdrop-blur-md text-slate-100 rounded-xl p-4 shadow-2xl border border-slate-700/60 animate-in fade-in zoom-in-95 duration-200"
    >
      {/* Header bar */}
      <div className="flex items-start justify-between border-b border-slate-800 pb-2.5 mb-3">
        <div className="flex items-center gap-2.5">
          <HuyenCo variant="inline" state={huyenCoState} size={40} />
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-base text-amber-300 capitalize">
                {data?.normalizedTerm || selectedText}
              </h4>
              {data?.ipa && (
                <span className="text-xs text-slate-400 font-mono">
                  {data.ipa}
                </span>
              )}
              <button
                onClick={() => speakWord(data?.normalizedTerm || selectedText)}
                className="text-slate-400 hover:text-amber-300 transition-colors p-0.5"
                title="Phát âm"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>
            {data?.partOfSpeech && (
              <Badge
                variant="outline"
                className="mt-1 text-[10px] uppercase border-slate-700 text-slate-400 px-1.5 py-0"
              >
                {data.partOfSpeech}
              </Badge>
            )}
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-200 p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Loading state: Skeleton mượt mà */}
      {loading && (
        <div className="space-y-3 py-1 animate-pulse">
          <div className="h-4 bg-slate-800 rounded w-3/4"></div>
          <div className="h-3 bg-slate-800/60 rounded w-full"></div>
          <div className="h-3 bg-slate-800/60 rounded w-5/6"></div>
          <div className="pt-2 flex justify-between">
            <div className="h-7 bg-slate-800 rounded w-28"></div>
            <div className="h-7 bg-slate-800 rounded w-20"></div>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="py-2 text-xs text-rose-400 space-y-2">
          <p>{error}</p>
          <Button
            size="sm"
            variant="outline"
            onClick={onClose}
            className="w-full h-7 text-xs border-slate-700 text-slate-300"
          >
            Đóng
          </Button>
        </div>
      )}

      {/* Main Content (Glance Layer 1) */}
      {!loading && data && (
        <div className="space-y-3 text-xs">
          {/* Core Meaning */}
          <div>
            <span className="text-[11px] font-medium text-slate-400 block mb-0.5">
              Nghĩa cốt lõi:
            </span>
            <p className="font-medium text-slate-200">{data.coreMeaningEn}</p>
          </div>

          {/* Context Insight */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-2.5">
            <span className="text-[11px] font-semibold text-amber-400 block mb-1">
              Trong câu này:
            </span>
            <p className="text-amber-100/90 leading-relaxed">
              {data.inContextExplanationVi}
            </p>
          </div>

          {/* Deep Dive Toggle (Layer 2: Mental Model) */}
          {data.mentalModel && (
            <div className="pt-1 border-t border-slate-800/80">
              <button
                onClick={() => setShowMentalModel(!showMentalModel)}
                className="w-full flex items-center justify-between text-xs text-amber-300 hover:text-amber-200 py-1 font-medium transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <Brain className="w-3.5 h-3.5" />
                  <span>🧠 Hình dung tư duy</span>
                </div>
                {showMentalModel ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </button>

              {showMentalModel && (
                <div className="mt-2 p-2.5 bg-slate-800/70 rounded-lg space-y-2.5 text-slate-300 border border-slate-700/50 animate-in fade-in duration-150">
                  <p className="italic text-[11px] leading-relaxed text-slate-300">
                    "{data.mentalModel}"
                  </p>

                  {data.ieltsPatterns && data.ieltsPatterns.length > 0 && (
                    <div className="pt-1.5 border-t border-slate-700/40">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block mb-1">
                        Mẫu dùng IELTS (Collocations):
                      </span>
                      <ul className="space-y-1">
                        {data.ieltsPatterns.map((pat, idx) => (
                          <li
                            key={idx}
                            className="text-[11px] text-amber-200/90 flex items-center gap-1.5"
                          >
                            <span className="w-1 h-1 rounded-full bg-amber-400"></span>
                            <span>{pat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Footer Action Bar */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-800">
            <span className="text-[10px] text-slate-500">NextBand Lexicon Layer</span>
            <Button
              size="sm"
              onClick={onSave}
              disabled={isSaved}
              className={`h-7 px-3 text-xs font-medium gap-1.5 transition-all ${
                isSaved
                  ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
                  : "bg-amber-400 text-slate-950 hover:bg-amber-300"
              }`}
            >
              {isSaved ? (
                <>
                  <BookmarkCheck className="w-3.5 h-3.5" />
                  <span>Đã lưu</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>+ Lưu từ</span>
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
