import React, { useState, useEffect, useRef } from "react";
import { lexiconApi, CognitiveWord } from "../../lib/lexiconApi";
import { Volume2, Check, BookmarkPlus, Loader2, X } from "lucide-react";

interface SelectionPosition {
  x: number;
  y: number;
}

export const CognitiveWordPopover: React.FC = () => {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [contextSentence, setContextSentence] = useState<string>("");
  const [position, setPosition] = useState<SelectionPosition | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<CognitiveWord | null>(null);
  const [saved, setSaved] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseUp = (e: MouseEvent) => {
      // Nếu click bên trong popover thì không đóng/trigger lại
      if (popoverRef.current && popoverRef.current.contains(e.target as Node)) {
        return;
      }

      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) {
        return;
      }

      const text = selection.toString().trim();
      // Chỉ kích hoạt khi bôi đen từ đơn hoặc cụm ngắn 1-3 từ tiếng Anh
      if (text.length > 0 && text.length < 35 && text.split(/\s+/).length <= 3) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        // Lấy câu văn bao quanh chứa từ vựng
        const containerText = range.startContainer.parentElement?.textContent || text;
        const sentenceMatch = containerText.match(/[^.!?]*\b[A-Za-z0-9'-]+\b[^.!?]*/g);
        const matchingSentence = sentenceMatch?.find((s) => s.includes(text)) || containerText;

        const cleanWord = text.replace(/^[^\w]+|[^\w]+$/g, "");
        if (cleanWord.length > 1) {
          setSelectedWord(cleanWord);
          setContextSentence(matchingSentence.trim());
          setPosition({
            x: Math.max(10, Math.min(window.innerWidth - 380, rect.left + window.scrollX)),
            y: rect.bottom + window.scrollY + 8,
          });
          setSaved(false);
          setSaveError(null);
          fetchWordInsight(cleanWord, matchingSentence.trim());
        }
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        // Click ra ngoài popover -> đóng popover
        setPosition(null);
        setSelectedWord(null);
        setData(null);
        setSaveError(null);
      }
    };

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  const fetchWordInsight = async (word: string, context: string) => {
    setLoading(true);
    try {
      const res = await lexiconApi.lookup(word, context);
      setData(res);
    } catch (err) {
      console.error("Failed to lookup word insight:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveWord = async () => {
    if (saving || saved) return;
    setSaving(true);
    setSaveError(null);
    try {
      const wordToSave = data?.word || selectedWord || "";
      const contextToSave = contextSentence || data?.sourceContext || "";
      await lexiconApi.save({
        word: wordToSave,
        sourceContext: contextToSave,
        wordId: data?.id,
      });
      setSaved(true);
    } catch (err: any) {
      console.error("Failed to save vocabulary:", err);
      setSaveError(err?.message || "Không thể lưu vào Sổ từ. Vui lòng thử lại!");
    } finally {
      setSaving(false);
    }
  };

  const playAudio = () => {
    if (data?.audioUrl) {
      const audio = new Audio(data.audioUrl);
      audio.play().catch(() => {});
    }
  };

  if (!position || !selectedWord) return null;

  return (
    <div
      ref={popoverRef}
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 9999,
      }}
      className="w-84 sm:w-96 bg-white dark:bg-slate-900 border-2 border-rose-200/80 dark:border-rose-900/50 rounded-2xl shadow-[0_12px_35px_rgba(225,29,72,0.18)] dark:shadow-[0_12px_35px_rgba(0,0,0,0.5)] p-4 text-slate-800 dark:text-slate-100 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-sm"
    >
      {/* Header: Gradient Banner & Word Info */}
      <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-rose-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 flex items-center justify-center text-white shadow-sm shrink-0">
            <BookmarkPlus className="w-4 h-4" />
          </div>
          <div className="flex items-baseline gap-2 min-w-0 flex-wrap">
            <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white capitalize">
              {data?.word || selectedWord}
            </span>
            {data?.ipa && (
              <span className="text-xs text-rose-500/90 dark:text-rose-400 font-mono font-medium">
                {data.ipa}
              </span>
            )}
            {data?.cefrLevel && (
              <span className="px-2 py-0.5 text-[10px] font-bold bg-rose-500 text-white rounded-full shadow-sm">
                {data.cefrLevel}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {data?.audioUrl && (
            <button
              onClick={playAudio}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
              title="Phát âm"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setPosition(null)}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-6 flex flex-col items-center justify-center gap-2 text-rose-500">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="text-xs font-medium text-slate-500">Đang tra cứu từ điển tri nhận...</span>
        </div>
      ) : (
        <div className="space-y-3 text-xs leading-relaxed">
          {/* CORE IDEA */}
          <div className="bg-gradient-to-br from-rose-50/70 to-pink-50/40 dark:from-slate-800/80 dark:to-slate-800/40 p-2.5 rounded-xl border border-rose-100/80 dark:border-slate-700/60">
            <div className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-1 flex items-center gap-1">
              <span>✨</span> Bản chất cốt lõi (Core Idea)
            </div>
            <div className="font-semibold text-slate-800 dark:text-slate-100">
              {data?.coreIdea || "Khái niệm trong ngữ cảnh học thuật."}
            </div>
          </div>

          {/* WORD FORMATION */}
          {data?.wordFormation && (
            <div className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-0.5">
                Cấu trúc hình thái (Word Formation)
              </div>
              <div className="text-slate-700 dark:text-slate-200 font-mono text-[11px] font-medium">
                {[data.wordFormation.prefix, data.wordFormation.root, data.wordFormation.suffix]
                  .filter(Boolean)
                  .join(" + ")}
              </div>
            </div>
          )}

          {/* CONTEXT GỐC */}
          {contextSentence && (
            <div className="bg-amber-50/70 dark:bg-amber-950/30 p-2.5 rounded-xl border border-amber-200/60 dark:border-amber-900/40">
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-0.5 flex items-center gap-1">
                <span>📖</span> Ngữ cảnh trong bài
              </div>
              <div className="text-slate-700 dark:text-slate-300 italic">
                "{contextSentence}"
              </div>
            </div>
          )}

          {/* COLLOCATIONS */}
          {data?.collocations && data.collocations.length > 0 && (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Cụm từ học thuật đi kèm
              </div>
              <div className="flex flex-wrap gap-1.5">
                {data.collocations.map((col, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-rose-50 text-rose-700 border border-rose-200/70 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/50 rounded-md font-medium text-[11px]"
                  >
                    {col}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ERROR ALERT IF SAVE FAILS */}
          {saveError && (
            <div className="text-[11px] font-medium text-rose-600 bg-rose-50 border border-rose-200 p-2 rounded-lg">
              ⚠️ {saveError}
            </div>
          )}

          {/* ACTION BUTTON - Nổi bật rực rỡ như ảnh tham khảo */}
          <div className="pt-2 border-t border-rose-100 dark:border-slate-800">
            <button
              onClick={handleSaveWord}
              disabled={saved || saving}
              className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-md active:scale-98 ${
                saved
                  ? "bg-emerald-500 text-white shadow-emerald-500/25 cursor-default"
                  : "bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white shadow-rose-500/30 hover:shadow-rose-500/40"
              }`}
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Đang lưu vào Sổ từ...
                </>
              ) : saved ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  Đã lưu vào Sổ từ thành công!
                </>
              ) : (
                <>
                  <BookmarkPlus className="w-4 h-4" />
                  Lưu vào Sổ từ
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
