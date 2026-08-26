import React from "react";
import { VocabularyTerm } from "../types";
import { Volume2, Sparkles, BookOpen, Check, BookmarkPlus, BookmarkCheck, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  const handlePlayAudio = () => {
    if (!activeTerm) return;
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(activeTerm.term);
      utterance.lang = "en-US";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!activeTerm) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center text-stone-500 space-y-3 min-h-[320px]">
        <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
          <Sparkles className="h-6 w-6" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-bold text-stone-800">Chạm vào bất kỳ từ nào</p>
          <p className="text-xs text-stone-500 max-w-xs leading-relaxed">
            Click vào bất kỳ từ vựng hoặc cụm từ nào trong bài đọc để xem phân tích ngữ cảnh chi tiết chuẩn Readlang.
          </p>
        </div>
      </div>
    );
  }

  // Generate rich contextual explanation
  const cleanVi = activeTerm.meaning_vi.replace(/^Cụm từ:\s*/i, "").replace(/^Từ vựng:\s*/i, "");

  return (
    <div className="p-4 sm:p-5 space-y-5 animate-in fade-in duration-150 font-sans">
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
          onClick={() => onToggleSave(activeTerm.term)}
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

      {/* Main Term Header */}
      <div className="space-y-2">
        <div className="flex items-start gap-2.5">
          <button
            onClick={handlePlayAudio}
            className="mt-0.5 rounded-full p-2 bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-all cursor-pointer shrink-0 shadow-xs"
            title="Nghe phát âm chuẩn"
          >
            <Volume2 className="h-4 w-4" />
          </button>
          <div>
            <h3 className="text-lg font-black text-emerald-950 tracking-tight leading-tight">
              {activeTerm.term}
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              {activeTerm.pronunciation && (
                <span className="text-xs font-mono text-stone-500">
                  {activeTerm.pronunciation}
                </span>
              )}
              {activeTerm.pos && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                  {activeTerm.pos}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Translation Banner */}
        <div className="rounded-xl bg-[#FAF9F5] border border-stone-200 p-3 text-stone-900">
          <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
            <span>🇻🇳 Nghĩa tiếng Việt:</span>
          </div>
          <p className="text-base font-extrabold text-emerald-900 mt-0.5">
            {cleanVi}
          </p>
        </div>
      </div>

      {/* Detailed Contextual Breakdown (Readlang Style) */}
      <div className="space-y-3.5 text-xs text-stone-700 leading-relaxed">
        {/* Section 1: Core Meaning */}
        <div className="space-y-1.5">
          <p className="font-bold text-stone-900 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
            <span className="text-amber-500">💡</span> Định Nghĩa Tổng Quát:
          </p>
          <p className="bg-amber-50/60 p-3 rounded-xl border border-amber-200/60 text-amber-950">
            Từ <strong>&ldquo;{activeTerm.term}&rdquo;</strong> trong tiếng Anh biểu thị ý nghĩa <strong>&ldquo;{cleanVi.split("/")[0].trim()}&rdquo;</strong>.
            {activeTerm.meaning_en && activeTerm.meaning_en !== activeTerm.term && (
              <span className="block mt-1 italic text-stone-600">
                &ldquo;{activeTerm.meaning_en}&rdquo;
              </span>
            )}
          </p>
        </div>

        {/* Section 2: Contextual Application in Glaciology Case */}
        {activeTerm.context_note && (
          <div className="space-y-1.5">
            <p className="font-bold text-stone-900 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
              <span className="text-emerald-600">📌</span> Trong Ngữ Cảnh Bài Đọc Này:
            </p>
            <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200/80 text-emerald-950">
              {activeTerm.context_note}
            </div>
          </div>
        )}

        {/* Section 3: Academic Takeaway */}
        <div className="rounded-xl bg-stone-50 p-3 border border-stone-200/80 space-y-1">
          <span className="font-bold text-stone-800 block text-[11px]">🎯 Ghi chú học thuật IELTS:</span>
          <p className="text-stone-600 text-[11px]">
            Chú ý cách kết hợp từ (collocations) và dạng thức biến đổi của từ trong các văn bản học thuật và báo cáo khoa học.
          </p>
        </div>
      </div>
    </div>
  );
};
