import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Play, ArrowRight, Layers } from "lucide-react";
import { VOCAB_C1_UNITS } from "@/data/vocabC1Unit1";

interface C1UnitHub25DSelectorProps {
  onSelectUnit: (unitIndex: number) => void;
  getUnitMeta: (unitId: number) => {
    shortLabel: string;
    themeVi: string;
    descVi: string;
    pages: string;
  };
  initialUnitIndex?: number;
}

export const C1UnitHub25DSelector: React.FC<C1UnitHub25DSelectorProps> = ({
  onSelectUnit,
  getUnitMeta,
  initialUnitIndex = 0,
}) => {
  const units = VOCAB_C1_UNITS;
  const [activeIndex, setActiveIndex] = useState(
    Math.max(0, Math.min(units.length - 1, initialUnitIndex))
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const prevUnit = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : units.length - 1));
  };

  const nextUnit = () => {
    setActiveIndex((prev) => (prev < units.length - 1 ? prev + 1 : 0));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevUnit();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        nextUnit();
      } else if (e.key === "Enter") {
        e.preventDefault();
        onSelectUnit(activeIndex);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, onSelectUnit]);

  // Touch gesture handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diffX = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45; // px threshold

    if (diffX > minSwipeDistance) {
      // Swiped left -> next
      nextUnit();
    } else if (diffX < -minSwipeDistance) {
      // Swiped right -> prev
      prevUnit();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="flex-1 w-full max-w-7xl mx-auto flex flex-col justify-between py-2 sm:py-4 px-3 sm:px-8 select-none overflow-hidden"
    >
      {/* 2.5D Cylindrical Carousel Viewport */}
      <div className="relative w-full flex-1 min-h-[480px] sm:min-h-[550px] flex items-center justify-center perspective-[1300px] my-auto">
        {/* Navigation Left Arrow */}
        <button
          type="button"
          onClick={prevUnit}
          aria-label="Previous Unit"
          className="absolute left-1 sm:left-4 z-30 p-3 sm:p-4 rounded-full border border-slate-200 bg-white/95 text-slate-800 shadow-xl cursor-pointer hover:scale-110 active:scale-95 hover:bg-white transition-all backdrop-blur-md"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Navigation Right Arrow */}
        <button
          type="button"
          onClick={nextUnit}
          aria-label="Next Unit"
          className="absolute right-1 sm:right-4 z-30 p-3 sm:p-4 rounded-full border border-slate-200 bg-white/95 text-slate-800 shadow-xl cursor-pointer hover:scale-110 active:scale-95 hover:bg-white transition-all backdrop-blur-md"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* 2.5D Stack Cards */}
        <div className="relative w-full h-full flex items-center justify-center">
          {units.map((unit, index) => {
            const offset = index - activeIndex;
            // Only render items within window of 2 to keep smooth 60fps
            if (Math.abs(offset) > 2) return null;

            const isCenter = offset === 0;
            const meta = getUnitMeta(unit.unitId);
            const cleanTitle = unit.title.replace(/^Unit \d+:\s*/i, "");
            const previewWords = unit.wordsInAction.slice(0, 5);

            // 2.5D Transform Matrix Calculation
            const translateX = offset * 255; // wider spread spacing for larger cards
            const translateZ = -Math.abs(offset) * 165; // depth
            const rotateY = offset * -25; // 3D angle
            const scale = 1 - Math.abs(offset) * 0.11;
            const opacity = isCenter ? 1 : Math.max(0.28, 1 - Math.abs(offset) * 0.36);
            const zIndex = 20 - Math.abs(offset) * 5;

            return (
              <div
                key={unit.unitId}
                onClick={() => {
                  if (isCenter) {
                    onSelectUnit(index);
                  } else {
                    setActiveIndex(index);
                  }
                }}
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                  boxShadow: isCenter
                    ? "0 25px 50px -12px rgba(79, 70, 229, 0.25), 0 0 0 2px rgba(99, 102, 241, 0.4)"
                    : "0 10px 25px -5px rgba(0, 0, 0, 0.08)",
                }}
                className={`absolute w-[330px] sm:w-[420px] h-[460px] sm:h-[525px] rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-500 ease-out cursor-pointer select-none border ${
                  isCenter
                    ? "bg-white border-indigo-300 text-slate-900 shadow-2xl"
                    : "bg-[#FAFBFD] border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                <div>
                  {/* Top Header Row with Badges */}
                  <div className="p-5 pb-3 flex items-center justify-between">
                    <span
                      className={`px-3.5 py-1 rounded-xl text-xs sm:text-sm font-mono font-black border flex items-center gap-1.5 ${
                        isCenter
                          ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                          : "bg-slate-100 border-slate-200 text-slate-500"
                      }`}
                    >
                      <span>UNIT {unit.unitId < 10 ? `0${unit.unitId}` : unit.unitId}</span>
                    </span>

                    <span className="text-xs font-mono font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg">
                      {meta.pages}
                    </span>
                  </div>

                  {/* 16:9 Cover Image */}
                  <div className="relative aspect-[16/9] w-[calc(100%-2.5rem)] mx-auto overflow-hidden rounded-2xl bg-slate-100 shadow-md border border-slate-100">
                    <img
                      src={`/images/vocab-c1/unit-${unit.unitId < 10 ? `0${unit.unitId}` : unit.unitId}.webp`}
                      alt={cleanTitle}
                      loading="lazy"
                      className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent flex items-end p-3.5">
                      <span className="text-white text-xs sm:text-sm font-bold drop-shadow-sm line-clamp-1">
                        {meta.themeVi}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 pt-4">
                    <h2 className="text-lg sm:text-xl font-black text-slate-900 line-clamp-1 mb-1.5">
                      {cleanTitle}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-3.5">
                      {meta.descVi}
                    </p>

                    {/* Word Tags preview */}
                    <div className="flex flex-wrap gap-1.5">
                      {previewWords.map((w) => (
                        <span
                          key={w.id}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-mono text-xs font-semibold"
                        >
                          {w.word}
                        </span>
                      ))}
                      {unit.wordsInAction.length > previewWords.length && (
                        <span className="px-2 py-1 rounded-lg bg-indigo-50 text-indigo-600 font-mono text-xs font-bold">
                          +{unit.wordsInAction.length - previewWords.length} từ
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className="p-5 pt-3 border-t border-slate-100">
                  {isCenter ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectUnit(index);
                      }}
                      className="w-full py-3 px-4 rounded-xl font-black text-xs sm:text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white shadow-emerald-700/20 active:scale-98"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>VÀO HỌC & CHINH PHỤC BÀI NÀY</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="w-full py-2.5 rounded-xl text-center text-xs sm:text-sm font-bold text-slate-400">
                      Nhấn để xem bài này
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Scroller Dots */}
      <div className="w-full pt-3 flex flex-col items-center gap-2 shrink-0">
        <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-full border border-slate-200 bg-white shadow-xs">
          {units.map((u, i) => (
            <button
              key={u.unitId}
              type="button"
              onClick={() => setActiveIndex(i)}
              title={`Unit ${u.unitId}: ${u.title}`}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                activeIndex === i
                  ? "w-8 bg-emerald-700"
                  : "w-2.5 bg-slate-200 hover:bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
