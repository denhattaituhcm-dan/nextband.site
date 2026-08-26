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
                {activeTerm.term}
              </h3>
              {activeTerm.pronunciation && (
                <span className="text-xs font-mono text-stone-500">
                  {activeTerm.pronunciation}
                </span>
              )}
            </div>
            {activeTerm.pos && (
              <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded border border-emerald-300">
                {activeTerm.pos}
              </span>
            )}
          </div>
        </div>

        {/* Vietnamese Gloss Label (Nhãn tham khảo) */}
        <div className="rounded-xl bg-emerald-50/90 border border-emerald-300 p-3 text-stone-900 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider block mb-0.5">
            🏷️ Nhãn dịch tham khảo (Gloss):
          </span>
          <p className="text-base font-black text-emerald-950">
            {cleanVi}
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* COGNITIVE & TRI NHẬN FRAMEWORK BREAKDOWN                                  */}
      {/* ========================================================================= */}
      <div className="space-y-4 text-xs text-stone-800 leading-relaxed">
        
        {/* 1. CORE CONCEPT (Khái Niệm Lõi & Mental Representation) */}
        <div className="space-y-1.5">
          <p className="font-bold text-emerald-950 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
            <span className="text-sm">🧠</span> 1. Khái Niệm Lõi (Core Concept):
          </p>
          <div className="bg-[#f0fdf4] p-3.5 rounded-xl border border-emerald-200 text-emerald-950 space-y-2">
            <p className="font-medium leading-relaxed">
              {activeTerm.cognitive?.core_concept || (
                <>
                  Khi người bản ngữ dùng từ <strong>&ldquo;{activeTerm.term}&rdquo;</strong>, họ không chỉ dùng một nhãn dịch mà đang hình dung một trạng thái/hành động mang bản chất: <em>&ldquo;{cleanVi.split("/")[0].trim()}&rdquo;</em>.
                </>
              )}
            </p>
            {activeTerm.meaning_en && activeTerm.meaning_en !== activeTerm.term && (
              <p className="text-[11px] italic text-emerald-800 pt-1 border-t border-emerald-100">
                &ldquo;{activeTerm.meaning_en}&rdquo;
              </p>
            )}
          </div>
        </div>

        {/* 2. COGNITIVE FRAME (Khung Tri Nhận & Mental Scene) */}
        {activeTerm.cognitive?.cognitive_frame && (
          <div className="space-y-1.5">
            <p className="font-bold text-sky-950 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
              <span className="text-sm">🖼️</span> 2. Khung Cảnh Tâm Trí (Mental Scene):
            </p>
            <div className="bg-sky-50/80 p-3 rounded-xl border border-sky-200 text-sky-950 space-y-1.5 text-[11px]">
              <p className="font-medium text-sky-900">
                {activeTerm.cognitive.cognitive_frame.mental_scene}
              </p>
              {activeTerm.cognitive.cognitive_frame.actor && (
                <div className="grid grid-cols-2 gap-1.5 pt-1.5 border-t border-sky-100 text-[10px] text-stone-600">
                  <div>• <strong>Tác thể:</strong> {activeTerm.cognitive.cognitive_frame.actor}</div>
                  <div>• <strong>Đối tượng:</strong> {activeTerm.cognitive.cognitive_frame.recipient}</div>
                  {activeTerm.cognitive.cognitive_frame.entity && (
                    <div className="col-span-2">• <strong>Thực thể trao/chuyển:</strong> {activeTerm.cognitive.cognitive_frame.entity}</div>
                  )}
                  {activeTerm.cognitive.cognitive_frame.recipient_choice && (
                    <div className="col-span-2 text-sky-800 font-semibold">• <strong>Quyền lựa chọn:</strong> {activeTerm.cognitive.cognitive_frame.recipient_choice}</div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 3. MEANING IN THIS SENTENCE (Ngữ Cảnh Bài Đọc) */}
        {(activeTerm.cognitive?.meaning_in_context || activeTerm.context_note) && (
          <div className="space-y-1.5">
            <p className="font-bold text-amber-950 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
              <span className="text-sm">📌</span> 3. Trong Ngữ Cảnh Câu Hiện Tại:
            </p>
            <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200 text-amber-950 font-medium">
              {activeTerm.cognitive?.meaning_in_context || activeTerm.context_note}
            </div>
          </div>
        )}

        {/* 4. TRANSFER TO NEW CONTEXTS (Chuyển Sang Bối Cảnh Mới & Semantic Invariant) */}
        {activeTerm.cognitive?.transfer_contexts && activeTerm.cognitive.transfer_contexts.length > 0 && (
          <div className="space-y-1.5">
            <p className="font-bold text-indigo-950 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
              <span className="text-sm">🔄</span> 4. Chuyển Bối Cảnh & Điểm Chung Ý Niệm:
            </p>
            <div className="space-y-2">
              {activeTerm.cognitive.transfer_contexts.map((ex, idx) => (
                <div key={idx} className="bg-indigo-50/60 p-2.5 rounded-xl border border-indigo-100 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-indigo-800 uppercase px-1.5 py-0.5 rounded bg-indigo-100">
                      {ex.domain_label}
                    </span>
                  </div>
                  <p className="font-serif italic text-stone-900 text-xs">
                    &ldquo;{ex.sentence}&rdquo;
                  </p>
                  <p className="text-[11px] text-indigo-950 font-medium pt-0.5">
                    💡 <em>Điểm chung ý niệm:</em> {ex.invariant_connection}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. CONTRAST & BOUNDARIES (Phân Biệt Từ Gần Nghĩa & Ranh Giới Sai Lầm) */}
        {(activeTerm.cognitive?.contrast || activeTerm.cognitive?.boundaries) && (
          <div className="space-y-1.5">
            <p className="font-bold text-purple-950 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
              <span className="text-sm">⚖️</span> 5. Phân Biệt Sắc Thái & Ranh Giới:
            </p>
            <div className="bg-purple-50/60 p-3 rounded-xl border border-purple-200 text-purple-950 space-y-2 text-[11px]">
              {activeTerm.cognitive.contrast && (
                <div>
                  <strong className="text-purple-900 block mb-0.5">So sánh với từ gần nghĩa:</strong>
                  <p className="leading-relaxed">{activeTerm.cognitive.contrast}</p>
                </div>
              )}
              {activeTerm.cognitive.boundaries && (
                <div className="pt-1.5 border-t border-purple-200">
                  <strong className="text-red-800 block mb-0.5">⚠️ Ranh giới sử dụng (Lưu ý tránh nhầm):</strong>
                  <p className="leading-relaxed text-stone-700">{activeTerm.cognitive.boundaries}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 6. RETRIEVAL RULE (Quy Tắc Tự Nhận Diện) */}
        {activeTerm.cognitive?.retrieval_rule && (
          <div className="space-y-1.5">
            <p className="font-bold text-emerald-950 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
              <span className="text-sm">⚡</span> 6. Quy Tắc Tự Nhận Diện (Retrieval Rule):
            </p>
            <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/30 text-emerald-950 font-semibold text-[11px] leading-relaxed">
              {activeTerm.cognitive.retrieval_rule}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
