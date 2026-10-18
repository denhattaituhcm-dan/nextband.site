import React, { useState, useEffect, useRef } from "react";
import { getAllC2UnitMetas } from "@/data/vocab-c2";
import { useArenaTheme } from "../context/ThemeContext";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Layers,
  Sparkles,
  BookOpen,
  Compass,
  ArrowRight,
  Brain,
} from "lucide-react";

interface C2UnitHubSelectorProps {
  onSelectUnit: (unitNumber: number) => void;
  initialUnitNumber?: number;
}

// 12 rich visual gradient themes corresponding to the 12 C2 units
const UNIT_3D_THEMES = [
  {
    gradient: "from-emerald-600 via-teal-700 to-cyan-900",
    lightAccent: "border-teal-400 bg-teal-50 text-teal-900",
    glowColor: "rgba(16, 185, 129, 0.4)",
    domainBadge: "🏢 Corporate & Finance",
    icon: "💼",
  },
  {
    gradient: "from-blue-700 via-indigo-800 to-slate-900",
    lightAccent: "border-blue-400 bg-blue-50 text-blue-900",
    glowColor: "rgba(59, 130, 246, 0.4)",
    domainBadge: "🏛️ Politics & Governance",
    icon: "🏛️",
  },
  {
    gradient: "from-amber-600 via-orange-700 to-stone-900",
    lightAccent: "border-amber-400 bg-amber-50 text-amber-900",
    glowColor: "rgba(245, 158, 11, 0.4)",
    domainBadge: "👔 Labor Market & Career",
    icon: "⚖️",
  },
  {
    gradient: "from-rose-700 via-red-900 to-neutral-950",
    lightAccent: "border-rose-400 bg-rose-50 text-rose-900",
    glowColor: "rgba(239, 68, 68, 0.4)",
    domainBadge: "⚖️ Crime, Law & Justice",
    icon: "🚨",
  },
  {
    gradient: "from-violet-700 via-purple-900 to-slate-950",
    lightAccent: "border-purple-400 bg-purple-50 text-purple-900",
    glowColor: "rgba(168, 85, 247, 0.4)",
    domainBadge: "🎭 Human Archetypes",
    icon: "👤",
  },
  {
    gradient: "from-cyan-700 via-sky-800 to-slate-950",
    lightAccent: "border-sky-400 bg-sky-50 text-sky-900",
    glowColor: "rgba(14, 165, 233, 0.4)",
    domainBadge: "🌐 Society & Marginalization",
    icon: "🏙️",
  },
  {
    gradient: "from-green-700 via-emerald-800 to-teal-950",
    lightAccent: "border-emerald-400 bg-emerald-50 text-emerald-900",
    glowColor: "rgba(34, 197, 94, 0.4)",
    domainBadge: "🌿 Ecology & Biosphere",
    icon: "🌱",
  },
  {
    gradient: "from-fuchsia-700 via-pink-800 to-slate-950",
    lightAccent: "border-fuchsia-400 bg-fuchsia-50 text-fuchsia-900",
    glowColor: "rgba(217, 70, 239, 0.4)",
    domainBadge: "🎨 Arts, Culture & Media",
    icon: "🎬",
  },
  {
    gradient: "from-teal-600 via-cyan-800 to-blue-950",
    lightAccent: "border-cyan-400 bg-cyan-50 text-cyan-900",
    glowColor: "rgba(6, 182, 212, 0.4)",
    domainBadge: "🧬 Medicine & Clinical Pathology",
    icon: "🔬",
  },
  {
    gradient: "from-blue-600 via-sky-800 to-indigo-950",
    lightAccent: "border-indigo-400 bg-indigo-50 text-indigo-900",
    glowColor: "rgba(99, 102, 241, 0.4)",
    domainBadge: "🎓 Academia & Pedagogy",
    icon: "📚",
  },
  {
    gradient: "from-orange-600 via-amber-700 to-stone-900",
    lightAccent: "border-amber-400 bg-amber-50 text-amber-900",
    glowColor: "rgba(249, 115, 22, 0.4)",
    domainBadge: "🧭 Travel & Exploration",
    icon: "✈️",
  },
  {
    gradient: "from-purple-700 via-indigo-900 to-slate-950",
    lightAccent: "border-violet-400 bg-violet-50 text-violet-900",
    glowColor: "rgba(139, 92, 246, 0.4)",
    domainBadge: "🏆 Synthesis & C2 Mastery",
    icon: "👑",
  },
];

export const C2UnitHubSelector: React.FC<C2UnitHubSelectorProps> = ({
  onSelectUnit,
  initialUnitNumber = 1,
}) => {
  const units = getAllC2UnitMetas();
  const [activeIndex, setActiveIndex] = useState(
    Math.max(0, Math.min(units.length - 1, initialUnitNumber - 1))
  );
  const { theme, setTheme } = useArenaTheme();
  const isPaperTheme = theme === "paper";
  const isSlateTheme = theme === "slate";

  const containerRef = useRef<HTMLDivElement>(null);

  const prevUnit = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : units.length - 1));
  };

  const nextUnit = () => {
    setActiveIndex((prev) => (prev < units.length - 1 ? prev + 1 : 0));
  };

  // Keyboard left / right / Enter support
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
        onSelectUnit(units[activeIndex].unitNumber);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, units, onSelectUnit]);

  const activeUnit = units[activeIndex];
  const activeThemeMeta = UNIT_3D_THEMES[activeIndex % UNIT_3D_THEMES.length];

  return (
    <div
      ref={containerRef}
      className={`min-h-[85vh] flex flex-col justify-between p-4 sm:p-8 select-none transition-colors duration-500 overflow-hidden ${
        isPaperTheme
          ? "bg-[#F7F3EC] text-slate-900"
          : isSlateTheme
          ? "bg-[#090E17] text-slate-100"
          : "bg-[#050811] text-slate-100"
      }`}
    >
      {/* Top Header & Context */}
      <div className="max-w-6xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest font-mono border ${
                isPaperTheme
                  ? "bg-teal-100 text-teal-900 border-teal-300"
                  : "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
              }`}
            >
              C2 COGNITIVE ARCHIVE
            </span>
            <span
              className={`text-xs font-mono font-bold ${
                isPaperTheme ? "text-slate-500" : "text-slate-400"
              }`}
            >
              12 CAMBRIDGE ADVANCED THEMES
            </span>
          </div>
          <h1
            className={`text-2xl sm:text-3xl font-black tracking-tight mt-1 ${
              isPaperTheme ? "font-serif text-slate-900" : "text-white"
            }`}
          >
            Chọn Chủ Đề Chinh Phục C2 Lexicon
          </h1>
          <p
            className={`text-xs sm:text-sm mt-0.5 ${
              isPaperTheme ? "text-slate-600" : "text-slate-400"
            }`}
          >
            Cuộn hoặc dùng phím <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-black/10 dark:bg-white/10">←</kbd> <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-black/10 dark:bg-white/10">→</kbd> để đổi chủ đề 3D, nhấn <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-black/10 dark:bg-white/10">Enter</kbd> để vào học.
          </p>
        </div>

        {/* Right side: Quick pagination indicator & Theme Tri-Toggle */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Theme Tri-Toggle */}
          <div
            className={`flex items-center p-1 rounded-xl border ${
              isPaperTheme
                ? "bg-white border-[#E2D9CC] shadow-xs"
                : isSlateTheme
                ? "bg-slate-900 border-slate-700"
                : "bg-slate-900/90 border-slate-800"
            }`}
          >
            <button
              type="button"
              onClick={() => setTheme("paper")}
              title="Chế độ Academic Paper (Giấy ngà)"
              className={`px-2 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                isPaperTheme
                  ? "bg-amber-100 text-amber-900 shadow-xs border border-amber-300"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <span className="text-amber-600">☀️</span>
              <span className="hidden sm:inline">Paper</span>
            </button>
            <button
              type="button"
              onClick={() => setTheme("slate")}
              title="Chế độ Executive Slate"
              className={`px-2 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                isSlateTheme
                  ? "bg-slate-800 text-sky-300 shadow-xs border border-slate-600"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <span className="text-sky-400">🌙</span>
              <span className="hidden sm:inline">Slate</span>
            </button>
            <button
              type="button"
              onClick={() => setTheme("cyber")}
              title="Chế độ Cyber Arena"
              className={`px-2 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                theme === "cyber"
                  ? "bg-cyan-500/20 text-[#00F5D4] shadow-xs border border-cyan-500/40"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <span className="text-cyan-400">✨</span>
              <span className="hidden sm:inline">Cyber</span>
            </button>
          </div>

          <div className="flex items-center gap-2 font-mono text-sm font-black px-3 py-1.5 rounded-xl border border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/5">
            <span className={isPaperTheme ? "text-teal-800" : "text-cyan-400"}>
              UNIT {String(activeUnit.unitNumber).padStart(2, "0")}
            </span>
            <span className="text-slate-400">/ 12</span>
          </div>
        </div>
      </div>

      {/* 3D Cylindrical / Carousel Stage */}
      <div className="relative max-w-5xl mx-auto w-full h-[460px] sm:h-[480px] flex items-center justify-center perspective-[1200px] my-auto">
        {/* Carousel Navigator Arrows */}
        <button
          onClick={prevUnit}
          aria-label="Previous Unit"
          className={`absolute left-0 sm:-left-4 z-30 p-3 sm:p-4 rounded-full border shadow-xl cursor-pointer transition-all hover:scale-110 active:scale-95 ${
            isPaperTheme
              ? "bg-white/90 border-[#E2D9CC] text-slate-800 hover:bg-white shadow-stone-300"
              : "bg-slate-900/80 border-white/20 text-white hover:bg-slate-800 backdrop-blur-md"
          }`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextUnit}
          aria-label="Next Unit"
          className={`absolute right-0 sm:-right-4 z-30 p-3 sm:p-4 rounded-full border shadow-xl cursor-pointer transition-all hover:scale-110 active:scale-95 ${
            isPaperTheme
              ? "bg-white/90 border-[#E2D9CC] text-slate-800 hover:bg-white shadow-stone-300"
              : "bg-slate-900/80 border-white/20 text-white hover:bg-slate-800 backdrop-blur-md"
          }`}
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* 3D Stack of Cards */}
        <div className="relative w-full h-full flex items-center justify-center">
          {units.map((unit, index) => {
            const offset = index - activeIndex;
            // Only render items within window of 2 to keep smooth 60fps
            if (Math.abs(offset) > 2) return null;

            const isCenter = offset === 0;
            const themeMeta = UNIT_3D_THEMES[index % UNIT_3D_THEMES.length];

            // 3D Matrix Transform Calculation
            const translateX = offset * 210; // spread horizontally
            const translateZ = -Math.abs(offset) * 160; // push background depth
            const rotateY = offset * -28; // cylindrical curve angle
            const scale = 1 - Math.abs(offset) * 0.12;
            const opacity = isCenter ? 1 : Math.max(0.25, 1 - Math.abs(offset) * 0.4);
            const zIndex = 20 - Math.abs(offset) * 5;

            return (
              <div
                key={unit.unitNumber}
                onClick={() => {
                  if (isCenter) {
                    onSelectUnit(unit.unitNumber);
                  } else {
                    setActiveIndex(index);
                  }
                }}
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                  boxShadow: isCenter
                    ? isPaperTheme
                      ? "0 25px 50px -12px rgba(0, 0, 0, 0.18)"
                      : `0 25px 50px -12px ${themeMeta.glowColor}`
                    : "none",
                }}
                className={`absolute w-[290px] sm:w-[350px] h-[400px] sm:h-[430px] rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-500 ease-out cursor-pointer border select-none ${
                  isCenter
                    ? isPaperTheme
                      ? "bg-white border-[#E2D9CC] text-slate-900 ring-4 ring-teal-600/20"
                      : "bg-slate-900/90 border-cyan-400/50 text-white backdrop-blur-xl ring-2 ring-cyan-400/40"
                    : isPaperTheme
                    ? "bg-[#FAF7F2] border-slate-200 text-slate-700 hover:border-slate-400"
                    : "bg-[#0B101D]/80 border-white/10 text-slate-300 hover:border-white/30 backdrop-blur-sm"
                }`}
              >
                {/* Top Badge: Domain & Unit Index */}
                <div className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-xl text-xs font-mono font-black border flex items-center gap-1.5 ${
                      isCenter
                        ? isPaperTheme
                          ? "bg-teal-50 border-teal-200 text-teal-900"
                          : "bg-cyan-500/20 border-cyan-400 text-cyan-200"
                        : isPaperTheme
                        ? "bg-slate-100 border-slate-200 text-slate-600"
                        : "bg-white/5 border-white/10 text-slate-400"
                    }`}
                  >
                    <span className="text-base">{themeMeta.icon}</span>
                    <span>UNIT {String(unit.unitNumber).padStart(2, "0")}</span>
                  </span>

                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                      isPaperTheme
                        ? "bg-slate-100 border-slate-200 text-slate-600 font-bold"
                        : "bg-black/30 border-white/10 text-slate-400"
                    }`}
                  >
                    {unit.pdfPages}
                  </span>
                </div>

                {/* 3D Visual Gradient Pillar */}
                <div
                  className={`w-full h-28 sm:h-32 rounded-2xl p-4 flex flex-col justify-end bg-gradient-to-br ${themeMeta.gradient} text-white shadow-md relative overflow-hidden transition-all duration-300`}
                >
                  <div className="absolute top-2 right-3 opacity-20 text-4xl font-mono font-black select-none pointer-events-none">
                    C2
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider opacity-90 font-bold">
                    {themeMeta.domainBadge}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-xs font-mono font-black text-white">
                      {unit.lexiconCount}+ Lexemes
                    </span>
                    {unit.isFullVerticalSlice && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-400/90 text-amber-950 font-black">
                        DEEP C2
                      </span>
                    )}
                  </div>
                </div>

                {/* Main Content Details */}
                <div className="space-y-1.5">
                  <h2
                    className={`text-lg sm:text-xl font-black leading-snug line-clamp-1 ${
                      isPaperTheme ? "font-serif text-slate-900" : "text-white"
                    }`}
                  >
                    {unit.titleEn}
                  </h2>
                  <p
                    className={`text-xs line-clamp-2 leading-relaxed ${
                      isPaperTheme ? "text-slate-600" : "text-slate-400"
                    }`}
                  >
                    {unit.themeSummaryVi}
                  </p>
                </div>

                {/* Bottom Action Button */}
                <div className="pt-2 border-t border-black/5 dark:border-white/10">
                  {isCenter ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectUnit(unit.unitNumber);
                      }}
                      className={`w-full py-2.5 px-4 rounded-xl font-black text-xs transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 ${
                        isPaperTheme
                          ? "bg-teal-700 hover:bg-teal-800 text-white shadow-teal-700/20"
                          : "bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-cyan-400/30"
                      }`}
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>VÀO HỌC & CHINH PHỤC BÀI NÀY</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <div
                      className={`w-full py-2 rounded-xl text-center text-xs font-bold ${
                        isPaperTheme ? "text-slate-500" : "text-slate-400"
                      }`}
                    >
                      Nhấn để xem bài này
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Unit Scroller Dots & Navigation Helper */}
      <div className="max-w-4xl mx-auto w-full pt-4 flex flex-col items-center gap-3">
        {/* 12 Dots Selector */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto p-1.5 rounded-full border border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/5">
          {units.map((u, i) => (
            <button
              key={u.unitNumber}
              onClick={() => setActiveIndex(i)}
              title={`Unit ${u.unitNumber}: ${u.titleEn}`}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                activeIndex === i
                  ? isPaperTheme
                    ? "w-8 bg-teal-700"
                    : "w-8 bg-cyan-400"
                  : isPaperTheme
                  ? "w-2.5 bg-slate-300 hover:bg-slate-400"
                  : "w-2.5 bg-slate-600 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>

        {/* Feature Badges across the 7 Modes */}
        <div className="flex items-center justify-center flex-wrap gap-2 text-[11px] font-mono opacity-80">
          <span className="flex items-center gap-1">
            <Layers className="w-3 h-3 text-teal-600" /> A: Schema
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" /> B: Synapse
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Brain className="w-3 h-3 text-cyan-500" /> C: Tri-Lock
          </span>
          <span>•</span>
          <span>D: Persona</span>
          <span>•</span>
          <span>E: Chronicles</span>
          <span>•</span>
          <span>Gradients</span>
          <span>•</span>
          <span>Frames</span>
        </div>
      </div>
    </div>
  );
};
