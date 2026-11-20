import React, { useEffect, useMemo, useState } from "react";
import { CaseGlossaryItem } from "../types";
import { sanitizeLearnerText } from "../services/contentSanitizer";
import { BookMarked, Search, Sparkles, ArrowRight, MapPin } from "lucide-react";

interface CaseGlossaryPanelProps {
  curatedItems: CaseGlossaryItem[];
  allItems: CaseGlossaryItem[];
  activeKey: string | null;
  onJumpToParagraph: (item: CaseGlossaryItem) => void;
  onInspectDeep: (item: CaseGlossaryItem) => void;
}

export const CaseGlossaryPanel: React.FC<CaseGlossaryPanelProps> = ({
  curatedItems,
  allItems,
  activeKey,
  onJumpToParagraph,
  onInspectDeep,
}) => {
  const [scope, setScope] = useState<"curated" | "all">("curated");
  const [query, setQuery] = useState("");

  // If the user clicked a word outside curated list while viewing glossary, switch to "all" so it highlights visibly
  useEffect(() => {
    if (!activeKey) return;
    const inCurated = curatedItems.some((item) => item.key === activeKey);
    const inAll = allItems.some((item) => item.key === activeKey);
    if (!inCurated && inAll && scope === "curated") {
      setScope("all");
    }
  }, [activeKey, curatedItems, allItems, scope]);

  useEffect(() => {
    if (!activeKey) return;
    const elId = `glossary-item-${activeKey.replace(/[^a-z0-9]+/gi, "-")}`;
    const el = document.getElementById(elId);
    if (el && typeof el.scrollIntoView === "function") {
      el.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [activeKey, scope]);

  const baseList = scope === "curated" ? curatedItems : allItems;

  const filteredList = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return baseList;
    return baseList.filter((item) => {
      const vi = (item.termData.meaning_vi || "").toLowerCase();
      return (
        item.term.toLowerCase().includes(q) ||
        item.matchedForm.toLowerCase().includes(q) ||
        vi.includes(q)
      );
    });
  }, [baseList, query]);

  return (
    <div className="p-4 sm:p-5 space-y-4 font-sans">
      {/* Header & Filter Controls */}
      <div className="space-y-3 border-b border-stone-200/80 pb-3.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <BookMarked className="h-4 w-4 text-amber-700" />
            <h3 className="text-xs font-black uppercase tracking-wider text-stone-900">
              Từ vựng bài này
            </h3>
          </div>
          <span className="text-[11px] text-stone-500 font-medium">
            Chạm <strong className="text-stone-700">Đoạn n</strong> để nhảy tới chữ
          </span>
        </div>

        {/* Scope Switcher */}
        <div className="grid grid-cols-2 gap-1.5 bg-stone-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setScope("curated")}
            className={`py-1.5 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              scope === "curated"
                ? "bg-white text-stone-900 shadow-xs"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            Trọng tâm ({curatedItems.length})
          </button>
          <button
            type="button"
            onClick={() => setScope("all")}
            className={`py-1.5 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              scope === "all"
                ? "bg-white text-stone-900 shadow-xs"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            Toàn bài ({allItems.length})
          </button>
        </div>

        {/* Search box */}
        <div className="relative">
          <Search className="h-3.5 w-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm nhanh từ vựng hoặc nghĩa tiếng Việt..."
            className="w-full h-8 pl-8 pr-3 rounded-lg border border-stone-200 bg-stone-50/70 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:bg-white"
          />
        </div>
      </div>

      {/* Glossary Cards List */}
      {filteredList.length === 0 ? (
        <div className="rounded-xl border border-dashed border-stone-200 bg-stone-50/60 p-6 text-center text-xs text-stone-500">
          Không tìm thấy từ vựng phù hợp với từ khóa &ldquo;{query}&rdquo;.
        </div>
      ) : (
        <div className="space-y-2.5">
          {filteredList.map((item) => {
            const isActive = activeKey === item.key;
            const domId = `glossary-item-${item.key.replace(/[^a-z0-9]+/gi, "-")}`;
            const cleanedVi = sanitizeLearnerText(
              (item.termData.meaning_vi || "")
                .replace(/^Cụm từ:\s*/i, "")
                .replace(/^Từ vựng:\s*/i, "")
            ).normalize("NFC");

            const showInflected =
              item.matchedForm.trim().toLowerCase() !== item.term.trim().toLowerCase();

            const tierLabel =
              item.tier === "chunk"
                ? "Cụm đắt giá"
                : item.tier === "deep"
                ? "Khái niệm sâu"
                : "Học thuật";

            const tierClass =
              item.tier === "chunk"
                ? "bg-amber-100/90 text-amber-900 border-amber-300/80"
                : item.tier === "deep"
                ? "bg-emerald-100/80 text-emerald-900 border-emerald-300/70"
                : "bg-stone-100 text-stone-700 border-stone-200";

            return (
              <div
                key={item.id}
                id={domId}
                className={`rounded-xl border p-3.5 transition-all space-y-2 ${
                  isActive
                    ? "ring-2 ring-amber-400 bg-amber-50/70 border-amber-300 shadow-xs"
                    : "bg-white border-stone-200/90 hover:border-stone-300 hover:shadow-2xs"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 space-y-1">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="font-serif text-base font-bold text-stone-900 leading-snug">
                        {item.term}
                      </span>
                      {item.termData.pronunciation && (
                        <span className="text-[11px] font-mono text-stone-500">
                          {item.termData.pronunciation}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${tierClass}`}
                      >
                        {tierLabel}
                      </span>
                      {item.termData.pos && (
                        <span className="text-[10px] font-mono uppercase text-stone-600 bg-stone-100 px-1.5 py-0.5 rounded">
                          {item.termData.pos}
                        </span>
                      )}
                      {showInflected && (
                        <span className="text-[10px] text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/70">
                          trong bài: <strong>{item.matchedForm}</strong>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Jump to Paragraph Pill */}
                  <button
                    type="button"
                    onClick={() => onJumpToParagraph(item)}
                    className="shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-950 border border-stone-200 hover:border-amber-300 text-[11px] font-bold transition-colors cursor-pointer"
                    title={`Nhảy tới Đoạn ${item.paragraphNumber} trong bài đọc`}
                  >
                    <MapPin className="h-3 w-3 text-amber-700" />
                    <span>Đoạn {item.paragraphNumber}</span>
                  </button>
                </div>

                {/* Meaning & Context Note */}
                <div className="space-y-1">
                  <p className="text-xs font-bold text-stone-900 leading-snug">
                    {cleanedVi}
                  </p>
                  {item.termData.context_note && (
                    <p className="text-[11px] text-stone-600 leading-relaxed line-clamp-2">
                      {item.termData.context_note}
                    </p>
                  )}
                </div>

                {/* Deep Explanation Trigger */}
                <div className="pt-1 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => onInspectDeep(item)}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200/80 transition-colors cursor-pointer"
                  >
                    <Sparkles className="h-3 w-3 text-emerald-600" />
                    <span>Giải nghĩa sâu</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
