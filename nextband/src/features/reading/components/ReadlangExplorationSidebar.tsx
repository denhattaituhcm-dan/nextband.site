import React, { useMemo } from "react";
import { VocabularyTerm } from "../types";
import {
  Volume2,
  Sparkles,
  BookmarkPlus,
  BookmarkCheck,
  ArrowLeft,
  Lightbulb,
  Target,
  Repeat,
  AlertTriangle,
  Zap,
  Tag,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { humanizeVocabularyTerm } from "../services/humanizationEngine";
import { sanitizeVocabularyTerm } from "../services/contentSanitizer";
import { validateSemanticEntry } from "../services/semanticValidator";

interface ReadlangExplorationSidebarProps {
  activeTerm: VocabularyTerm | null;
  savedTerms: string[];
  onToggleSave: (term: string) => void;
  onBackToTasks?: () => void;
}

export const ReadlangExplorationSidebar: React.FC<ReadlangExplorationSidebarProps> = ({
  activeTerm,
  savedTerms,
  onToggleSave,
  onBackToTasks,
}) => {
  const isSaved = activeTerm ? savedTerms.includes(activeTerm.term) : false;

  // Process term through the 7-stage pipeline:
  // 1. Validate -> 2. Humanize -> 3. Sanitize
  const processedTerm = useMemo(() => {
    if (!activeTerm) return null;
    const validated = { ...activeTerm, validation_report: validateSemanticEntry(activeTerm) };
    const humanized = humanizeVocabularyTerm(validated);
    return sanitizeVocabularyTerm(humanized);
  }, [activeTerm]);

  const handlePlayAudio = () => {
    if (!processedTerm) return;
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(processedTerm.term);
      utterance.lang = "en-US";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!processedTerm) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center text-stone-500 space-y-4 min-h-[360px]">
        <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shadow-xs">
          <Sparkles className="h-6 w-6 text-emerald-600" />
        </div>
        <div className="space-y-1.5 max-w-xs">
          <p className="text-sm font-bold text-stone-800">Không Gian Đọc Thư Giãn</p>
          <p className="text-xs text-stone-500 leading-relaxed">
            Nhấp vào bất kỳ từ vựng hoặc câu văn nào trong bài đọc để xem giải nghĩa sâu, bản chất ngữ nghĩa và ngữ cảnh ứng dụng.
          </p>
        </div>
        {onBackToTasks && (
          <button
            onClick={onBackToTasks}
            className="text-xs font-medium text-amber-800 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 px-3.5 py-1.5 rounded-full border border-amber-200/80 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Lightbulb className="h-3.5 w-3.5 text-amber-600" />
            Xem các câu hỏi suy ngẫm
          </button>
        )}
      </div>
    );
  }

  const cleanVi = (processedTerm.meaning_vi || "")
    .replace(/^Cụm từ:\s*/i, "")
    .replace(/^Từ vựng:\s*/i, "");

  const h = processedTerm.humanized;
  const isDeep = processedTerm.depth === "deep";

  return (
    <div className="p-4 sm:p-5 space-y-4 animate-in fade-in duration-150 font-sans">
      {/* Top action bar */}
      <div className="flex items-center justify-between border-b border-stone-100 pb-3">
        {onBackToTasks && (
          <button
            onClick={onBackToTasks}
            className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Quay lại câu hỏi</span>
          </button>
        )}
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onToggleSave(processedTerm.term)}
          className={`h-7 px-2.5 text-xs gap-1.5 rounded-lg ${
            isSaved ? "text-emerald-700 bg-emerald-50 font-bold" : "text-stone-600 hover:bg-stone-100"
          }`}
        >
          {isSaved ? (
            <>
              <BookmarkCheck className="h-3.5 w-3.5 text-emerald-600" />
              Đã lưu vào sổ từ
            </>
          ) : (
            <>
              <BookmarkPlus className="h-3.5 w-3.5" />
              Lưu từ vựng
            </>
          )}
        </Button>
      </div>

      {/* Main Term Header - First Screen Comprehension */}
      <div className="space-y-2.5">
        <div className="flex items-start gap-2.5">
          <button
            onClick={handlePlayAudio}
            className="mt-0.5 rounded-full p-2.5 bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-all cursor-pointer shrink-0 shadow-xs"
            title="Nghe phát âm chuẩn"
          >
            <Volume2 className="h-4 w-4" />
          </button>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2 flex-wrap">
              <h3 className="text-xl font-black text-emerald-950 tracking-tight leading-tight">
                {processedTerm.term}
              </h3>
              {processedTerm.pronunciation && (
                <span className="text-xs font-mono text-stone-500">
                  {processedTerm.pronunciation}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 mt-1 flex-wrap">
              {processedTerm.pos && (
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded border border-emerald-300">
                  {processedTerm.pos}
                </span>
              )}
              {isDeep && (
                <span className="inline-flex items-center text-[10px] font-bold tracking-wider text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded border border-amber-300">
                  <Sparkles className="h-3 w-3 text-amber-600 inline mr-1" />
                  Khái niệm đòn bẩy
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Vietnamese Gloss Label (Nhãn tham khảo nhanh) */}
        <div className="rounded-xl bg-emerald-50/90 border border-emerald-300 p-3 text-stone-900 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider flex items-center gap-1 mb-0.5">
            <Tag className="h-3 w-3 text-emerald-700" />
            Nhãn dịch tham khảo (Gloss):
          </span>
          <p className="text-base font-black text-emerald-950">
            {cleanVi}
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* HUMANIZED PEDAGOGICAL BREAKDOWN (Zero Framework Jargon / Pure Teacher Voice) */}
      {/* ========================================================================= */}
      <div className="space-y-3.5 text-xs text-stone-800 leading-relaxed">
        
        {/* 1. HIỂU ĐƠN GIẢN (Simple Intuition) */}
        {h?.simple_intuition && (
          <div className="space-y-1.5">
            <p className="font-bold text-emerald-950 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
              <Lightbulb className="h-3.5 w-3.5 text-emerald-600" />
              Hiểu đơn giản
            </p>
            <div className="bg-[#f0fdf4] p-3.5 rounded-xl border border-emerald-200 text-emerald-950 space-y-1.5">
              <p className="font-medium leading-relaxed">
                {h.simple_intuition}
              </p>
              {processedTerm.meaning_en && processedTerm.meaning_en !== processedTerm.term && (
                <p className="text-[11px] italic text-emerald-800 pt-1 border-t border-emerald-100">
                  &ldquo;{processedTerm.meaning_en}&rdquo;
                </p>
              )}
            </div>
          </div>
        )}

        {/* 2. TRONG CÂU NÀY (In-context Story) */}
        {h?.in_context_story && (
          <div className="space-y-1.5">
            <p className="font-bold text-amber-950 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
              <Target className="h-3.5 w-3.5 text-amber-600" />
              Trong câu này
            </p>
            <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200 text-amber-950 font-medium">
              {h.in_context_story}
            </div>
          </div>
        )}

        {/* 3. BẠN SẼ GẶP NÓ Ở NHỮNG ĐÂU? (Real-world Transfers) */}
        {h?.real_world_transfers && h.real_world_transfers.length > 0 && (
          <div className="space-y-1.5">
            <p className="font-bold text-indigo-950 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
              <Repeat className="h-3.5 w-3.5 text-indigo-600" />
              Bạn sẽ gặp nó ở những đâu?
            </p>
            <div className="space-y-2">
              {h.real_world_transfers.map((ex, idx) => (
                <div key={idx} className="bg-indigo-50/60 p-2.5 rounded-xl border border-indigo-100 space-y-1">
                  {ex.domain_label && (
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-indigo-800 uppercase px-1.5 py-0.5 rounded bg-indigo-100">
                        {ex.domain_label}
                      </span>
                    </div>
                  )}
                  <p className="font-serif italic text-stone-900 text-xs">
                    &ldquo;{ex.sentence}&rdquo;
                  </p>
                  {ex.connection_note && (
                    <p className="text-[11px] text-indigo-950 font-medium pt-0.5 flex items-center gap-1">
                      <ArrowRight className="h-3 w-3 text-indigo-600 shrink-0" />
                      <em>{ex.connection_note}</em>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. PHÂN BIỆT & ĐỪNG HIỂU NHẦM (Nuance Distinction & Boundary) */}
        {h?.nuance_warning && (
          <div className="space-y-1.5">
            <p className="font-bold text-purple-950 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
              <AlertTriangle className="h-3.5 w-3.5 text-purple-600" />
              Phân biệt & Lưu ý
            </p>
            <div className="bg-purple-50/60 p-3 rounded-xl border border-purple-200 text-purple-950 space-y-2 text-[11px]">
              <p className="leading-relaxed whitespace-pre-line">{h.nuance_warning}</p>
            </div>
          </div>
        )}

        {/* 5. CÁCH NHẬN DIỆN KHI ĐỌC / DÙNG (Retrieval Heuristic) */}
        {h?.retrieval_tip && (
          <div className="space-y-1.5">
            <p className="font-bold text-emerald-950 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
              <Zap className="h-3.5 w-3.5 text-emerald-600" />
              Cách nhận diện khi đọc
            </p>
            <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/30 text-emerald-950 font-semibold text-[11px] leading-relaxed">
              {h.retrieval_tip}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
