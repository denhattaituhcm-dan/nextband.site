import React, { useState, useEffect, useRef, useMemo } from "react";
import { SchemaVisionItem, ImageSchemaTag } from "@/data/vocab-c2/types";
import { C2ModeSharedProps } from "./ArenaHeader";
import { speakC2Word } from "../engine/cognitiveAudio";
import { useArenaTheme } from "../context/ThemeContext";
import { Volume2, ChevronLeft, ChevronRight, Sparkles, RefreshCw, Layers, Image as ImageIcon } from "lucide-react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
}

export const ModeASchemaVision: React.FC<C2ModeSharedProps> = ({ unit, onRecordAttempt }) => {
  const { theme } = useArenaTheme();
  const [subTab, setSubTab] = useState<"explore" | "drill">("explore");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isContrastMode, setIsContrastMode] = useState(false);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<string | null>(null);
  const [isQuizAnswered, setIsQuizAnswered] = useState(false);
  const [visualMode, setVisualMode] = useState<"image" | "particle">("image");
  const [imageError, setImageError] = useState(false);
  const quizStartTimeRef = useRef<number>(Date.now());

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  const items = unit.schemaItems || [];
  const currentItem: SchemaVisionItem | undefined = items[currentIndex];

  useEffect(() => {
    quizStartTimeRef.current = Date.now();
    setSelectedQuizAnswer(null);
    setIsQuizAnswered(false);
    setIsContrastMode(false);
    setImageError(false);
  }, [currentIndex, unit, subTab]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === "Space") {
        e.preventDefault();
        setIsContrastMode((prev) => !prev);
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [items.length]);

  // HTML5 Canvas 2D Force-Field Particle Visualizer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !currentItem) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = 260);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || 600;
      height = canvas.height = 260;
    };
    window.addEventListener("resize", handleResize);

    const isPaperTheme = theme === "paper";
    const isSlateTheme = theme === "slate";

    const { primaryColor, secondaryColor, velocityFactor, particleCount, vectorPattern } =
      currentItem.simulationConfig;

    const baseColor = isContrastMode ? secondaryColor : primaryColor;
    // Tinh chỉnh màu cho Paper theme (đậm đà, học thuật, dễ thấy trên nền giấy)
    const activeColor = isPaperTheme
      ? (isContrastMode ? "#B45309" : "#0D9488")
      : baseColor;

    // Giảm số lượng hạt từ 60 xuống 25 để biến thành ambient background tinh tế thay vì pháo hoa
    const count = Math.min(particleCount ? Math.floor(particleCount * 0.5) : 25, 30);
    const speed = velocityFactor * (isContrastMode ? -1 : 1) * 0.6; // Giảm tốc độ 40% cho dịu mắt

    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5 * Math.abs(speed),
        vy: (Math.random() - 0.5) * 1.5 * Math.abs(speed),
        radius: Math.random() * 2.0 + 1.0,
        color: activeColor,
        alpha: isPaperTheme ? Math.random() * 0.4 + 0.2 : Math.random() * 0.35 + 0.15,
      });
    }
    particlesRef.current = particles;

    let time = 0;
    const render = () => {
      time += 0.015;

      // Nền Canvas theo từng theme:
      if (isPaperTheme) {
        ctx.fillStyle = "rgba(244, 245, 247, 0.4)";
      } else if (isSlateTheme) {
        ctx.fillStyle = "rgba(15, 23, 42, 0.3)";
      } else {
        ctx.fillStyle = "rgba(11, 15, 25, 0.25)";
      }
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Draw subtle force-field rings
      ctx.beginPath();
      ctx.arc(centerX, centerY, 70 + Math.sin(time * 2) * 6, 0, Math.PI * 2);
      ctx.strokeStyle = isPaperTheme ? `${activeColor}18` : `${activeColor}22`;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(centerX, centerY, 110 + Math.cos(time * 1.5) * 5, 0, Math.PI * 2);
      ctx.strokeStyle = isPaperTheme ? `${activeColor}0f` : `${activeColor}11`;
      ctx.lineWidth = 1;
      ctx.stroke();

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (vectorPattern === "ascend") {
          p.y -= Math.abs(speed) * 1.2;
          p.x += Math.sin(time + i) * 0.4;
          if (p.y < 0) p.y = height;
        } else if (vectorPattern === "descend") {
          p.y += Math.abs(speed) * 1.2;
          p.x += Math.cos(time + i) * 0.4;
          if (p.y > height) p.y = 0;
        } else if (vectorPattern === "converge") {
          const dx = centerX - p.x;
          const dy = centerY - p.y;
          p.x += dx * 0.015 * Math.abs(speed);
          p.y += dy * 0.015 * Math.abs(speed);
          if (Math.hypot(dx, dy) < 15) {
            p.x = Math.random() * width;
            p.y = Math.random() * height;
          }
        } else if (vectorPattern === "diverge" || vectorPattern === "breach") {
          const dx = p.x - centerX;
          const dy = p.y - centerY;
          const dist = Math.hypot(dx, dy) || 1;
          p.x += (dx / dist) * Math.abs(speed) * 2;
          p.y += (dy / dist) * Math.abs(speed) * 2;
          if (p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
            p.x = centerX + (Math.random() - 0.5) * 40;
            p.y = centerY + (Math.random() - 0.5) * 40;
          }
        } else if (vectorPattern === "collide") {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        } else {
          // oscillate
          p.x += Math.sin(time * 2 + i) * speed * 2;
          p.y += Math.cos(time * 1.5 + i) * speed * 1.5;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      animationFrameIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, [currentIndex, isContrastMode, currentItem]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
  };

  const quizChoices = useMemo(() => {
    if (!currentItem) return [];
    const pool = items.filter((x) => x.id !== currentItem.id).map((x) => x.word);
    const shuffledDistractors = pool.sort(() => 0.5 - Math.random()).slice(0, 3);
    const combined = [currentItem.word, ...shuffledDistractors];
    return combined.sort(() => 0.5 - Math.random());
  }, [currentItem, items]);

  const handleSelectQuiz = (chosenWord: string) => {
    if (isQuizAnswered || !currentItem) return;
    const latency = Date.now() - quizStartTimeRef.current;
    const isCorrect = chosenWord === currentItem.word;
    setSelectedQuizAnswer(chosenWord);
    setIsQuizAnswered(true);

    onRecordAttempt({
      itemId: currentItem.id,
      word: currentItem.word,
      mode: "schema",
      isCorrect,
      latencyMs: latency,
      meaningVi: currentItem.definitionVi,
      imageSchemaTag: currentItem.imageSchemaTag,
    });
  };

  if (!currentItem) {
    return (
      <div className="p-8 text-center text-slate-400">
        Không có dữ liệu Schema Vision cho Unit này.
      </div>
    );
  }

  const activeDisplayWord = isContrastMode ? currentItem.contrastWord : currentItem.word;
  const activeDisplayMetaphor = isContrastMode
    ? currentItem.contrastVisualMetaphor
    : currentItem.visualMetaphor;

  const isPaperTheme = theme === "paper";
  const isSlateTheme = theme === "slate";

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Simulation Window Card */}
      <div
        className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
          isPaperTheme
            ? "bg-[#FAF7F2] border border-[#E2D9CC] shadow-xl text-[#1E293B]"
            : isSlateTheme
            ? "bg-[#0F172A] border border-slate-700/80 shadow-2xl text-slate-100"
            : "bg-[#0B0F19] border border-cyan-500/30 shadow-2xl shadow-cyan-950/40 text-slate-100"
        }`}
      >
        {/* Top Bar Navigation */}
        <div
          className={`px-5 py-3 border-b flex items-center justify-between backdrop-blur-md ${
            isPaperTheme
              ? "bg-[#F3EDE2]/80 border-[#E2D9CC]"
              : isSlateTheme
              ? "bg-slate-900/70 border-slate-700/80"
              : "bg-black/40 border-white/10"
          }`}
        >
          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider font-mono ${
                isPaperTheme
                  ? "bg-[#0F766E]/15 text-[#0F766E] border border-[#0F766E]/30"
                  : "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
              }`}
            >
              SCHEMA {currentIndex + 1} / {items.length}
            </span>
            <span
              className={`text-xs font-mono flex items-center gap-1 ${
                isPaperTheme ? "text-slate-600 font-medium" : "text-slate-400"
              }`}
            >
              <Layers className={`w-3.5 h-3.5 ${isPaperTheme ? "text-[#0F766E]" : "text-cyan-400"}`} />
              {currentItem.imageSchemaTag}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Toggle giữa Hình minh họa Split-Screen và Particle Forcefield */}
            <button
              onClick={() => setVisualMode((prev) => (prev === "image" ? "particle" : "image"))}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border cursor-pointer ${
                visualMode === "image"
                  ? isPaperTheme
                    ? "bg-teal-50 text-teal-800 border-teal-300 shadow-xs"
                    : "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                  : isPaperTheme
                  ? "bg-white text-slate-600 border-slate-300"
                  : "bg-white/5 text-slate-400 border-white/10"
              }`}
              title="Chuyển đổi giữa Tranh minh họa trực quan và Hạt chuyển động"
            >
              {visualMode === "image" ? (
                <>
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Ảnh trực quan</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Hạt động lực</span>
                </>
              )}
            </button>

            <button
              onClick={() => setIsContrastMode((prev) => !prev)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border cursor-pointer ${
                isContrastMode
                  ? isPaperTheme
                    ? "bg-amber-100 text-amber-900 border-amber-300 shadow-xs"
                    : "bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-xs shadow-amber-500/20"
                  : isPaperTheme
                  ? "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                  : "bg-cyan-500/10 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/20"
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              {isContrastMode ? "ĐANG SOI: CONTRAST" : "CHUYỂN: CONTRAST WORD [SPACE]"}
            </button>
          </div>
        </div>

        {/* Visual Simulation / Editorial Image Viewport */}
        <div
          className={`relative h-[280px] sm:h-[300px] w-full flex items-center justify-center transition-colors overflow-hidden ${
            isPaperTheme ? "bg-[#F7F4EE]" : isSlateTheme ? "bg-[#0A101D]" : "bg-[#070A12]"
          }`}
        >
          {/* Background Illustration if in Image mode and file exists */}
          {visualMode === "image" && !imageError && (
            <div className="absolute inset-0 w-full h-full">
              <img
                src={`/images/vocab-c2/schema/${currentItem.id}.jpg`}
                alt={`${currentItem.word} vs ${currentItem.contrastWord}`}
                onError={() => setImageError(true)}
                className="w-full h-full object-cover opacity-85 transition-opacity duration-500"
              />
              <div
                className={`absolute inset-0 ${
                  isPaperTheme
                    ? "bg-gradient-to-t from-[#FAF7F2] via-white/40 to-[#FAF7F2]/60"
                    : isSlateTheme
                    ? "bg-gradient-to-t from-[#0F172A] via-black/40 to-[#0F172A]/70"
                    : "bg-gradient-to-t from-[#0B0F19] via-black/50 to-[#0B0F19]/70"
                }`}
              />
            </div>
          )}

          {/* Fallback hoặc Chế độ Particle Simulation */}
          {(visualMode === "particle" || imageError) && (
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
          )}

          {/* Center Dynamic Word Overlay */}
          <div className="relative z-10 text-center pointer-events-none px-4">
            <div className="inline-flex items-center gap-2.5 mb-1.5">
              <span
                className={`text-3xl sm:text-5xl font-black tracking-tight transition-colors duration-300 ${
                  isPaperTheme
                    ? isContrastMode
                      ? "text-amber-800 drop-shadow-sm"
                      : "text-slate-900 drop-shadow-sm"
                    : isContrastMode
                    ? "text-amber-400 drop-shadow-md"
                    : isSlateTheme
                    ? "text-sky-300 drop-shadow-md"
                    : "text-cyan-300 drop-shadow-md"
                }`}
              >
                {activeDisplayWord}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  speakC2Word(activeDisplayWord);
                }}
                className={`pointer-events-auto p-2 rounded-full transition-all cursor-pointer shadow-md ${
                  isPaperTheme
                    ? "bg-white/95 hover:bg-white text-slate-800 border border-slate-300 backdrop-blur-xs"
                    : "bg-black/60 hover:bg-black/80 text-white backdrop-blur-xs border border-white/20"
                }`}
                title="Phát âm chuẩn C2 (en-GB)"
              >
                <Volume2
                  className={`w-4 h-4 ${isPaperTheme ? "text-slate-800" : "text-cyan-300"}`}
                />
              </button>
            </div>
            <p
              className={`text-sm font-mono tracking-wide ${
                isPaperTheme ? "text-slate-700 font-bold" : "text-slate-200"
              }`}
            >
              {currentItem.ipa}
            </p>
            <p
              className={`text-sm max-w-lg mx-auto mt-2 italic font-serif leading-relaxed px-3 py-1 rounded-xl backdrop-blur-xs ${
                isPaperTheme
                  ? "text-slate-800 font-semibold bg-white/60 border border-black/5"
                  : "text-cyan-200 bg-black/40 border border-white/10"
              }`}
            >
              "{activeDisplayMetaphor}"
            </p>
          </div>

          {/* Left / Right Nav Arrows */}
          <button
            onClick={handlePrev}
            aria-label="Previous Word"
            className={`absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-xl transition-all cursor-pointer shadow-md ${
              isPaperTheme
                ? "bg-white/90 border border-slate-300 text-slate-700 hover:bg-white hover:text-black"
                : "bg-black/60 border border-white/10 text-slate-300 hover:text-white hover:bg-black/90"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next Word"
            className={`absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-xl transition-all cursor-pointer shadow-md ${
              isPaperTheme
                ? "bg-white/90 border border-slate-300 text-slate-700 hover:bg-white hover:text-black"
                : "bg-black/60 border border-white/10 text-slate-300 hover:text-white hover:bg-black/90"
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Detailed Linguistic Card Bottom - Editorial High Legibility */}
        <div
          className={`p-6 border-t space-y-3.5 transition-colors ${
            isPaperTheme
              ? "bg-[#FAF7F2] border-[#E2D9CC]"
              : isSlateTheme
              ? "bg-[#131C31] border-slate-700/80"
              : "bg-[#0D1322] border-white/10"
          }`}
        >
          <div className="flex flex-wrap items-baseline gap-2.5">
            <span
              className={`text-xs font-black font-mono uppercase px-2 py-0.5 rounded ${
                isPaperTheme
                  ? "bg-teal-100 text-teal-800 border border-teal-300"
                  : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
              }`}
            >
              {currentItem.pos}
            </span>
            <p
              className={`text-base font-semibold leading-relaxed ${
                isPaperTheme ? "text-slate-900 font-serif" : "text-white"
              }`}
            >
              {currentItem.definitionEn}
            </p>
          </div>

          <div
            className={`p-3.5 rounded-xl border text-sm leading-relaxed ${
              isPaperTheme
                ? "bg-white border-[#E2D9CC] text-slate-800 shadow-xs"
                : "bg-white/5 border-white/5 text-slate-200"
            }`}
          >
            🇻🇳{" "}
            <strong className={isPaperTheme ? "text-slate-900 font-bold" : "text-cyan-300 font-bold"}>
              Nghĩa tiếng Việt:
            </strong>{" "}
            <span>{currentItem.definitionVi}</span>
          </div>

          {/* Context Example Sentence with High Contrast Callout */}
          <div
            className={`text-sm sm:text-base p-3.5 rounded-xl border-l-4 leading-relaxed font-serif ${
              isPaperTheme
                ? "bg-slate-100/90 border-teal-600 text-slate-900 italic font-medium"
                : isSlateTheme
                ? "bg-slate-900/60 border-sky-400 text-slate-100 italic"
                : "bg-black/30 border-cyan-400 text-slate-200 italic"
            }`}
          >
            "{currentItem.exampleSentence}"
          </div>
        </div>
      </div>

      {/* Spatial Schema Calibration Quiz (Active Retrieval - Masked Cloze) */}
      <div
        className={`rounded-2xl p-5 shadow-lg space-y-4 transition-all ${
          isPaperTheme
            ? "bg-[#FAF7F2] border border-[#E2D9CC] text-slate-900"
            : isSlateTheme
            ? "bg-[#0F172A] border border-slate-700/80 text-slate-100"
            : "bg-[#0B0F19] border border-white/10 text-slate-100"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className={`w-4 h-4 ${isPaperTheme ? "text-teal-700" : "text-cyan-400"}`} />
            <h3 className="text-sm font-extrabold uppercase tracking-wider">
              Thử Thách Truy Hồi Chủ Động [Masked Active Retrieval]
            </h3>
          </div>
          <span
            className={`text-xs font-mono ${
              isPaperTheme ? "text-slate-600 font-medium" : "text-slate-400"
            }`}
          >
            Điền từ C2 chính xác vào ngữ cảnh thực tế bên dưới
          </span>
        </div>

        {/* Masked Contextual Prompt Box */}
        <div
          className={`p-4 rounded-xl border leading-relaxed font-serif ${
            isPaperTheme
              ? "bg-white border-slate-300 text-slate-900 shadow-xs"
              : "bg-black/40 border-white/10 text-slate-200"
          }`}
        >
          <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold">
            <span
              className={`px-2 py-0.5 rounded uppercase ${
                isPaperTheme
                  ? "bg-teal-100 text-teal-900 border border-teal-200"
                  : "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
              }`}
            >
              Manh mối Quỹ đạo: {currentItem.imageSchemaTag}
            </span>
            <span className={isPaperTheme ? "text-slate-600" : "text-slate-400"}>
              ({currentItem.pos})
            </span>
          </div>

          <p className="text-sm sm:text-base italic">
            "{getMaskedExampleSentence(currentItem.exampleSentence, currentItem.word)}"
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {quizChoices.map((wordOption, idx) => {
            const isTarget = wordOption.toLowerCase() === currentItem.word.toLowerCase();
            let btnStyle = isPaperTheme
              ? "bg-white border-slate-300 text-slate-800 hover:bg-slate-100 hover:border-slate-400 shadow-xs"
              : "bg-white/5 border-white/10 text-slate-200 hover:bg-white/10";

            if (isQuizAnswered) {
              if (isTarget) {
                btnStyle = isPaperTheme
                  ? "bg-emerald-100 border-emerald-500 text-emerald-950 font-black shadow-sm"
                  : "bg-emerald-500/20 border-emerald-500/60 text-emerald-300 font-black shadow-xs shadow-emerald-500/30";
              } else if (selectedQuizAnswer === wordOption) {
                btnStyle = isPaperTheme
                  ? "bg-rose-100 border-rose-400 text-rose-950 font-bold"
                  : "bg-rose-500/20 border-rose-500/60 text-rose-300 font-bold";
              } else {
                btnStyle = isPaperTheme
                  ? "opacity-40 bg-slate-100 border-transparent text-slate-400"
                  : "opacity-40 bg-white/5 border-transparent text-slate-500";
              }
            }

            return (
              <button
                key={wordOption + idx}
                onClick={() => handleSelectQuiz(wordOption)}
                disabled={isQuizAnswered}
                className={`py-3 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${btnStyle}`}
              >
                <span className="text-[10px] opacity-60 font-mono">[{idx + 1}]</span>
                <span className="truncate w-full text-center text-sm font-black">{wordOption}</span>
              </button>
            );
          })}
        </div>

        {isQuizAnswered && (
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in duration-200">
            <p className="text-xs font-bold">
              {selectedQuizAnswer?.toLowerCase() === currentItem.word.toLowerCase() ? (
                <span className={isPaperTheme ? "text-emerald-800" : "text-emerald-400"}>
                  ⚡ Xuất sắc! Phản xạ tri nhận C2 chính xác trong ngữ cảnh.
                </span>
              ) : (
                <span className={isPaperTheme ? "text-rose-800" : "text-rose-400"}>
                  ⚠️ Chưa chính xác. Từ chuẩn xác cho ngữ cảnh trên là:{" "}
                  <strong className="underline">{currentItem.word}</strong>
                </span>
              )}
            </p>
            <button
              onClick={handleNext}
              className={`px-4 py-2 rounded-xl font-black text-xs transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5 ${
                isPaperTheme
                  ? "bg-teal-700 hover:bg-teal-800 text-white"
                  : "bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20"
              }`}
            >
              <span>Từ tiếp theo</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

function getMaskedExampleSentence(sentence: string, targetWord: string): string {
  if (!sentence || !targetWord) return sentence;
  const regex = new RegExp(`\\b(${targetWord}[a-z]*)\\b`, "gi");
  return sentence.replace(regex, " [ ______ ] ");
}
