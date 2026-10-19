import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Volume2,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  RotateCcw,
  Sparkles,
  BookOpen,
  History,
  Lightbulb,
  ExternalLink,
  Star,
  CheckCircle2,
  Layers,
  ArrowRight,
} from "lucide-react";

export interface IdiomItemForDeck {
  id: string;
  idiom: string;
  phonetic?: string;
  meaning_vi: string;
  meaning_en?: string;
  example_sentence: string;
  example_sentence_vi?: string;
  audio_url?: string;
  register?: string;
  frequency?: string;
  moduleId: string;
  moduleTitle: string;
  origin?: string;
  metaphor_breakdown?: string;
  usage_notes?: string;
  ielts_speaking_application?: string;
  ielts_writing_application?: string;
  cognitive_anchor?: {
    hook_question: string;
    vivid_mental_image: string;
    core_essence: string;
    quick_scenario: string;
  };
  register_info?: {
    badge: string;
    explanation: string;
    is_ielts_writing_safe: boolean;
  };
}

interface IdiomsStackedDeckProps {
  idioms: IdiomItemForDeck[];
  etymologyData?: Record<string, { summary: string; full_story?: string; visual_anchor?: string }>;
  bookmarkedIds: Set<string>;
  onToggleBookmark: (id: string) => void;
  listenedIds: Set<string>;
  currentlyPlayingAudio: string | null;
  onPlayAudio: (audioUrl: string, id: string) => void;
}

export const IdiomsStackedDeck: React.FC<IdiomsStackedDeckProps> = ({
  idioms,
  etymologyData = {},
  bookmarkedIds,
  onToggleBookmark,
  listenedIds,
  currentlyPlayingAudio,
  onPlayAudio,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [deckList, setDeckList] = useState<IdiomItemForDeck[]>([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardTab, setCardTab] = useState<"front" | "context" | "etymology" | "exam">("front");
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | "up" | null>(null);

  // Sync idioms into deck
  useEffect(() => {
    setDeckList(idioms);
    setCurrentIndex(0);
    setIsFlipped(false);
    setCardTab("front");
  }, [idioms]);

  const currentCard = deckList[currentIndex];
  const etym = currentCard ? etymologyData[currentCard.id] : undefined;

  const nextCard = useCallback(() => {
    if (currentIndex < deckList.length - 1) {
      setSwipeDirection("right");
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setIsFlipped(false);
        setCardTab("front");
        setSwipeDirection(null);
        setDragOffset({ x: 0, y: 0 });
      }, 260);
    }
  }, [currentIndex, deckList.length]);

  const prevCard = useCallback(() => {
    if (currentIndex > 0) {
      setSwipeDirection("left");
      setTimeout(() => {
        setCurrentIndex((prev) => prev - 1);
        setIsFlipped(false);
        setCardTab("front");
        setSwipeDirection(null);
        setDragOffset({ x: 0, y: 0 });
      }, 260);
    }
  }, [currentIndex]);

  const shuffleDeck = () => {
    const shuffled = [...deckList].sort(() => Math.random() - 0.5);
    setDeckList(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setCardTab("front");
  };

  const restartDeck = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setCardTab("front");
    setDragOffset({ x: 0, y: 0 });
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowRight") nextCard();
      else if (e.key === "ArrowLeft") prevCard();
      else if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextCard, prevCard]);

  // Touch & Pointer Gesture Handling
  const handlePointerDown = (e: React.PointerEvent) => {
    // Only drag from top card if not clicking on interactive elements
    if ((e.target as HTMLElement).closest("button, a, input, [role='button']")) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    setDragOffset({ x: dx, y: dy });
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset.x > 90) {
      nextCard();
    } else if (dragOffset.x < -90) {
      nextCard(); // dismiss
    } else {
      setDragOffset({ x: 0, y: 0 });
    }
  };

  if (!deckList || deckList.length === 0) {
    return (
      <div className="py-16 text-center bg-white rounded-3xl border border-[#EAE3D9] p-8 shadow-xs">
        <Layers className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-slate-800">Không tìm thấy thẻ thành ngữ nào</h3>
        <p className="text-sm text-slate-500 mt-1">Vui lòng điều chỉnh bộ lọc hoặc chọn Unit khác.</p>
      </div>
    );
  }

  // Visible cards in fan/stack (up to 4 cards)
  const stackCards = useMemo(() => {
    const list: { item: IdiomItemForDeck; offset: number }[] = [];
    for (let i = 0; i < 4; i++) {
      const idx = currentIndex + i;
      if (idx < deckList.length) {
        list.push({ item: deckList[idx], offset: i });
      }
    }
    return list;
  }, [currentIndex, deckList]);

  const progressPercent = Math.round(((currentIndex + 1) / deckList.length) * 100);

  return (
    <div className="w-full flex flex-col items-center select-none py-4">
      {/* Top Deck Stats & Controls */}
      <div className="w-full max-w-2xl flex items-center justify-between gap-3 px-2 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-amber-700 bg-amber-100/90 px-3 py-1 rounded-full border border-amber-300">
            Card Fan 2.5D
          </span>
          <span className="text-xs font-bold text-[#635951]">
            Thẻ {currentIndex + 1} / {deckList.length}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="hidden sm:flex items-center gap-2 flex-1 max-w-xs mx-4">
          <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-amber-500 to-[#002147] transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-[11px] font-bold text-slate-500">{progressPercent}%</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={shuffleDeck}
            title="Xáo trộn xấp thẻ (Shuffle)"
            className="p-2 rounded-xl bg-white border border-[#EAE3D9] text-[#635951] hover:text-[#002147] hover:bg-slate-50 shadow-xs cursor-pointer transition"
          >
            <Shuffle className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={restartDeck}
            title="Bắt đầu lại từ đầu"
            className="p-2 rounded-xl bg-white border border-[#EAE3D9] text-[#635951] hover:text-[#002147] hover:bg-slate-50 shadow-xs cursor-pointer transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2.5D Stack Container */}
      <div
        className="relative w-full max-w-xl h-[470px] sm:h-[490px] flex items-center justify-center"
        style={{ perspective: "1200px" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {stackCards
          .slice()
          .reverse()
          .map(({ item, offset }) => {
            const isTop = offset === 0;
            const isBookmarked = bookmarkedIds.has(item.id);
            const isPlaying = currentlyPlayingAudio === item.audio_url;

            // 2.5D Transform calculations
            // Each card behind is slightly scaled down, translated Y up, and rotated slightly to fan out
            const fanRotations = [0, -3.5, 4, -6.5];
            const baseRot = fanRotations[offset] || 0;
            const baseScale = 1 - offset * 0.045;
            const baseTranslateY = offset * 14;
            const baseTranslateZ = -offset * 45;
            const zIndex = 30 - offset;
            const opacity = 1 - offset * 0.16;

            // Extra drag transforms for top card
            const dragX = isTop ? dragOffset.x : 0;
            const dragY = isTop ? dragOffset.y : 0;
            const dynamicRot = isTop ? baseRot + dragX * 0.08 : baseRot;

            let exitClass = "";
            if (isTop && swipeDirection === "right") {
              exitClass = "translate-x-[150%] rotate-20 opacity-0 pointer-events-none";
            } else if (isTop && swipeDirection === "left") {
              exitClass = "-translate-x-[150%] -rotate-20 opacity-0 pointer-events-none";
            }

            return (
              <div
                key={item.id}
                className={`absolute inset-0 w-full h-full transition-all ${
                  isDragging && isTop ? "duration-75 cursor-grabbing" : "duration-300 ease-out"
                } ${exitClass}`}
                style={{
                  transform: `translate3d(${dragX}px, ${baseTranslateY + dragY}px, ${baseTranslateZ}px) rotateZ(${dynamicRot}deg) scale(${baseScale})`,
                  zIndex,
                  opacity,
                  transformOrigin: "bottom center",
                }}
              >
                <div
                  className={`relative w-full h-full bg-white rounded-3xl border-2 ${
                    isTop ? "border-amber-400/80 shadow-2xl ring-1 ring-amber-200/60" : "border-[#EAE3D9] shadow-lg"
                  } p-6 sm:p-7 flex flex-col justify-between overflow-hidden bg-linear-to-b from-white via-white to-amber-50/20`}
                >
                  {/* Subtle Card Background Watermark */}
                  <div className="absolute -bottom-8 -right-8 pointer-events-none opacity-[0.03] select-none">
                    <BookOpen className="w-64 h-64 text-[#002147]" />
                  </div>

                  {/* Header row of Card */}
                  <div className="relative z-10 flex items-start justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-slate-900 text-white shadow-xs">
                        Module {item.moduleId}
                      </span>
                      {item.register && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-amber-100 text-amber-900 border border-amber-300">
                          {item.register}
                        </span>
                      )}
                      {listenedIds.has(item.id) && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" /> Đã nghe
                        </span>
                      )}
                    </div>

                    {/* Bookmark & Audio Controls */}
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleBookmark(item.id);
                        }}
                        className={`p-2 rounded-xl transition cursor-pointer ${
                          isBookmarked
                            ? "bg-amber-500 text-white shadow-xs scale-105"
                            : "bg-slate-100 text-slate-500 hover:text-amber-600 hover:bg-amber-50"
                        }`}
                        title={isBookmarked ? "Bỏ lưu thành ngữ" : "Lưu vào sổ tay"}
                      >
                        <Star className={`w-4 h-4 ${isBookmarked ? "fill-white" : ""}`} />
                      </button>

                      {item.audio_url && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onPlayAudio(item.audio_url!, item.id);
                          }}
                          className={`p-2 rounded-xl transition cursor-pointer flex items-center gap-1 ${
                            isPlaying
                              ? "bg-emerald-600 text-white animate-pulse shadow-md"
                              : "bg-[#002147] text-white hover:bg-[#003366] shadow-xs"
                          }`}
                          title="Nghe phát âm chuẩn bản xứ"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Body Content based on Active Card Tab */}
                  <div className="relative z-10 flex-1 my-3 overflow-y-auto pr-1">
                    {/* Primary Mode: Front view */}
                    {cardTab === "front" && (
                      <div className="space-y-4 pt-1">
                        <div>
                          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                            {item.idiom}
                          </h2>
                          {item.phonetic && (
                            <p className="text-xs sm:text-sm font-mono text-slate-400 mt-0.5">{item.phonetic}</p>
                          )}
                        </div>

                        {/* Vietnamese Meaning pill */}
                        <div className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-3.5">
                          <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block mb-1">
                            Ý nghĩa tiếng Việt:
                          </span>
                          <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                            {item.meaning_vi}
                          </p>
                          {item.meaning_en && (
                            <p className="text-xs text-slate-600 mt-1 italic font-serif">
                              Definition: "{item.meaning_en}"
                            </p>
                          )}
                        </div>

                        {/* Cognitive Mental Hook if available */}
                        {item.cognitive_anchor && (
                          <div className="bg-indigo-50/70 border border-indigo-200 rounded-2xl p-3 text-xs text-indigo-950">
                            <span className="font-extrabold text-indigo-800 flex items-center gap-1 mb-1">
                              <Lightbulb className="w-3.5 h-3.5" /> Bản chất nhận thức:
                            </span>
                            <p className="italic leading-relaxed">
                              "{item.cognitive_anchor.core_essence}"
                            </p>
                          </div>
                        )}

                        {/* Example Sentence with highlight */}
                        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 space-y-1">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                            Ví dụ thực tế:
                          </span>
                          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                            "{item.example_sentence}"
                          </p>
                          {item.example_sentence_vi && (
                            <p className="text-xs text-slate-500 italic">
                              ({item.example_sentence_vi})
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Etymology Mode */}
                    {cardTab === "etymology" && (
                      <div className="space-y-3 pt-1 text-xs sm:text-sm">
                        <div className="flex items-center gap-1.5 text-amber-800 font-extrabold">
                          <History className="w-4 h-4" />
                          <span>Nguồn gốc & Điển tích lịch sử</span>
                        </div>
                        {etym?.summary ? (
                          <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 text-slate-800 leading-relaxed space-y-2">
                            <p className="font-semibold">{etym.summary}</p>
                            {etym.full_story && (
                              <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-amber-200/60">
                                {etym.full_story}
                              </p>
                            )}
                          </div>
                        ) : (
                          <div className="bg-slate-50 rounded-2xl p-4 text-slate-500 italic">
                            {item.origin || "Thành ngữ dân gian phổ biến được ghi nhận qua nhiều thế kỷ đàm thoại Anh ngữ."}
                          </div>
                        )}
                        {item.metaphor_breakdown && (
                          <div className="p-3 bg-sky-50 rounded-xl border border-sky-200 text-xs text-sky-900">
                            <span className="font-bold block mb-0.5">Hình tượng ẩn dụ:</span>
                            {item.metaphor_breakdown}
                          </div>
                        )}
                      </div>
                    )}

                    {/* IELTS Exam Applications Mode */}
                    {cardTab === "exam" && (
                      <div className="space-y-3 pt-1 text-xs sm:text-sm">
                        <div className="flex items-center gap-1.5 text-indigo-900 font-extrabold">
                          <Sparkles className="w-4 h-4 text-amber-500" />
                          <span>Ứng dụng IELTS Band 7.5+</span>
                        </div>
                        {item.ielts_speaking_application && (
                          <div className="bg-indigo-50/80 border border-indigo-200 rounded-2xl p-3.5 space-y-1">
                            <span className="text-[10px] font-black uppercase text-indigo-700 tracking-wider">
                              Speaking Part 1/2/3:
                            </span>
                            <p className="text-xs text-indigo-950 font-medium leading-relaxed">
                              {item.ielts_speaking_application}
                            </p>
                          </div>
                        )}
                        {item.ielts_writing_application && (
                          <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-3.5 space-y-1">
                            <span className="text-[10px] font-black uppercase text-emerald-700 tracking-wider">
                              Writing Task 2 Band Note:
                            </span>
                            <p className="text-xs text-emerald-950 font-medium leading-relaxed">
                              {item.ielts_writing_application}
                            </p>
                          </div>
                        )}
                        {item.usage_notes && (
                          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs text-slate-600">
                            <span className="font-bold text-slate-700 block mb-0.5">Lưu ý khi dùng:</span>
                            {item.usage_notes}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Bottom Navigation & Tabs of Card */}
                  <div className="relative z-10 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    {/* Micro Tabs within Top Card */}
                    {isTop ? (
                      <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                        <button
                          type="button"
                          onClick={() => setCardTab("front")}
                          className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                            cardTab === "front" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
                          }`}
                        >
                          Cơ bản
                        </button>
                        <button
                          type="button"
                          onClick={() => setCardTab("etymology")}
                          className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                            cardTab === "etymology" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
                          }`}
                        >
                          Điển tích
                        </button>
                        <button
                          type="button"
                          onClick={() => setCardTab("exam")}
                          className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                            cardTab === "exam" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
                          }`}
                        >
                          IELTS Tips
                        </button>
                      </div>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-medium italic">
                        Vuốt hoặc bấm nút Next để xem thẻ này
                      </span>
                    )}

                    {/* Hint for interaction */}
                    <div className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                      <span>Kéo sang phải để qua</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* Floating Bottom Navigator for Deck */}
      <div className="mt-8 flex items-center gap-4">
        <button
          type="button"
          onClick={prevCard}
          disabled={currentIndex === 0}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm border transition shadow-xs cursor-pointer ${
            currentIndex === 0
              ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
              : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Thẻ trước</span>
        </button>

        {/* Counter Badge */}
        <div className="px-4 py-2 rounded-2xl bg-slate-900 text-white font-mono text-xs font-black shadow-md">
          {currentIndex + 1} / {deckList.length}
        </div>

        <button
          type="button"
          onClick={nextCard}
          disabled={currentIndex === deckList.length - 1}
          className={`flex items-center gap-1.5 px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition shadow-md cursor-pointer ${
            currentIndex === deckList.length - 1
              ? "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
              : "bg-amber-500 hover:bg-amber-600 text-white hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
          }`}
        >
          <span>Thẻ tiếp theo</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Keyboard Shortcut Guidance */}
      <div className="mt-3 flex items-center gap-3 text-[11px] text-slate-400 font-medium">
        <span>Mẹo phím tắt:</span>
        <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-300 text-slate-600 font-mono text-[10px]">
          ← Thẻ trước
        </kbd>
        <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-300 text-slate-600 font-mono text-[10px]">
          → Thẻ kế
        </kbd>
      </div>
    </div>
  );
};
