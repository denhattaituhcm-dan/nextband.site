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
            x: Math.max(10, Math.min(window.innerWidth - 340, rect.left + window.scrollX)),
            y: rect.bottom + window.scrollY + 8,
          });
          setSaved(false);
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
    if (!data || saving || saved) return;
    setSaving(true);
    try {
      await lexiconApi.save({
        word: data.word,
        sourceContext: contextSentence || data.sourceContext || "",
        wordId: data.id,
      });
      setSaved(true);
    } catch (err) {
      console.error("Failed to save vocabulary:", err);
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
      className="w-80 sm:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl p-4 text-slate-800 dark:text-slate-100 animate-in fade-in zoom-in-95 duration-150"
    >
      {/* Header: Word + IPA + Audio + Close */}
      <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-2 mb-3">
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white capitalize">
            {data?.word || selectedWord}
          </span>
          {data?.ipa && (
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              {data.ipa}
            </span>
          )}
          {data?.cefrLevel && (
            <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 rounded border border-blue-200 dark:border-blue-800">
              {data.cefrLevel}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {data?.audioUrl && (
            <button
              onClick={playAudio}
              className="p-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-colors"
              title="Phát âm"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setPosition(null)}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-6 flex flex-col items-center justify-center gap-2 text-slate-400">
          <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
          <span className="text-xs">Đang giải mã bản chất tri nhận...</span>
        </div>
      ) : (
        <div className="space-y-3 text-xs leading-relaxed">
          {/* CORE IDEA */}
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-0.5">
              Bản chất cốt lõi (Core Idea)
            </div>
            <div className="font-medium text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-800/60 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
              {data?.coreIdea || "Khái niệm trong ngữ cảnh học thuật."}
            </div>
          </div>

          {/* WORD FORMATION (chỉ hiện khi có dữ liệu tin cậy) */}
          {data?.wordFormation && (
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-0.5">
                Cấu trúc hình thái (Word Formation)
              </div>
              <div className="text-slate-600 dark:text-slate-300 font-mono text-[11px]">
                {[data.wordFormation.prefix, data.wordFormation.root, data.wordFormation.suffix]
                  .filter(Boolean)
                  .join(" + ")}
              </div>
            </div>
          )}

          {/* CONTEXT GỐC */}
          {contextSentence && (
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-0.5">
                Ngữ cảnh trong bài (Context)
              </div>
              <div className="text-slate-600 dark:text-slate-400 italic bg-amber-50/50 dark:bg-amber-950/20 p-1.5 rounded border border-amber-100 dark:border-amber-900/30">
                "{contextSentence}"
              </div>
            </div>
          )}

          {/* COLLOCATIONS */}
          {data?.collocations && data.collocations.length > 0 && (
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-0.5">
                Cụm từ học thuật đi kèm (Collocations)
              </div>
              <div className="flex flex-wrap gap-1.5">
                {data.collocations.map((col, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-[11px]"
                  >
                    {col}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ACTION BUTTON: Sạch sẽ, không XP, không Game hóa */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <button
              onClick={handleSaveWord}
              disabled={saved || saving}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                saved
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800"
                  : "bg-slate-900 text-white hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500"
              }`}
            >
              {saving ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : saved ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  Đã lưu vào Sổ từ
                </>
              ) : (
                <>
                  <BookmarkPlus className="w-3.5 h-3.5" />
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
