import React, { useState, useEffect, useRef, useMemo } from "react";
import { SchemaVisionItem, ImageSchemaTag } from "@/data/vocab-c2/types";
import { C2ModeSharedProps } from "./ArenaHeader";
import { speakC2Word } from "../engine/cognitiveAudio";
import { Volume2, ChevronLeft, ChevronRight, Sparkles, RefreshCw, Layers } from "lucide-react";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isContrastMode, setIsContrastMode] = useState(false);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<string | null>(null);
  const [isQuizAnswered, setIsQuizAnswered] = useState(false);
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
  }, [currentIndex, unit]);

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

    const { primaryColor, secondaryColor, velocityFactor, particleCount, vectorPattern } =
      currentItem.simulationConfig;

    const activeColor = isContrastMode ? secondaryColor : primaryColor;
    const count = particleCount || 60;
    const speed = velocityFactor * (isContrastMode ? -1 : 1);

    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 2 * Math.abs(speed),
        vy: (Math.random() - 0.5) * 2 * Math.abs(speed),
        radius: Math.random() * 2.5 + 1.2,
        color: activeColor,
        alpha: Math.random() * 0.7 + 0.3,
      });
    }
    particlesRef.current = particles;

    let time = 0;
    const render = () => {
      time += 0.02;
      ctx.fillStyle = "rgba(11, 15, 25, 0.25)";
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Draw force-field rings
      ctx.beginPath();
      ctx.arc(centerX, centerY, 70 + Math.sin(time * 2) * 8, 0, Math.PI * 2);
      ctx.strokeStyle = `${activeColor}22`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(centerX, centerY, 110 + Math.cos(time * 1.5) * 6, 0, Math.PI * 2);
      ctx.strokeStyle = `${activeColor}11`;
      ctx.lineWidth = 1;
      ctx.stroke();

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (vectorPattern === "ascend") {
          p.y -= Math.abs(speed) * 1.8;
          p.x += Math.sin(time + i) * 0.5;
          if (p.y < 0) p.y = height;
        } else if (vectorPattern === "descend") {
          p.y += Math.abs(speed) * 1.8;
          p.x += Math.cos(time + i) * 0.5;
          if (p.y > height) p.y = 0;
        } else if (vectorPattern === "converge") {
          const dx = centerX - p.x;
          const dy = centerY - p.y;
          p.x += dx * 0.02 * Math.abs(speed);
          p.y += dy * 0.02 * Math.abs(speed);
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

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Simulation Window Card */}
      <div className="relative rounded-2xl border border-cyan-500/30 bg-[#0B0F19] overflow-hidden shadow-2xl shadow-cyan-950/40">
        {/* Top Bar Navigation */}
        <div className="px-5 py-3 border-b border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              SCHEMA {currentIndex + 1} / {items.length}
            </span>
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              {currentItem.imageSchemaTag}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsContrastMode((prev) => !prev)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border cursor-pointer ${
                isContrastMode
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-xs shadow-amber-500/20"
                  : "bg-cyan-500/10 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/20"
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              {isContrastMode ? "ĐANG SOI: CONTRAST" : "CHUYỂN: CONTRAST WORD [SPACE]"}
            </button>
          </div>
        </div>

        {/* Canvas Simulation Viewport */}
        <div className="relative h-[260px] w-full bg-[#070A12] flex items-center justify-center">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

          {/* Center Dynamic Word Overlay */}
          <div className="relative z-10 text-center pointer-events-none px-4">
            <div className="inline-flex items-center gap-2 mb-1">
              <span
                className={`text-3xl sm:text-4xl font-black tracking-tight drop-shadow-md transition-colors duration-300 ${
                  isContrastMode ? "text-amber-400" : "text-cyan-300"
                }`}
              >
                {activeDisplayWord}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  speakC2Word(activeDisplayWord);
                }}
                className="pointer-events-auto p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                title="Phát âm chuẩn C2"
              >
                <Volume2 className="w-4 h-4 text-cyan-300" />
              </button>
            </div>
            <p className="text-xs font-mono text-slate-300">{currentItem.ipa}</p>
            <p className="text-xs text-cyan-200/80 max-w-md mx-auto mt-2 italic font-serif">
              "{activeDisplayMetaphor}"
            </p>
          </div>

          {/* Left / Right Nav Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-xl bg-black/60 border border-white/10 text-slate-300 hover:text-white hover:bg-black/90 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-xl bg-black/60 border border-white/10 text-slate-300 hover:text-white hover:bg-black/90 transition-all cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Detailed Linguistic Card Bottom */}
        <div className="p-5 bg-[#0D1322] border-t border-white/10 space-y-3">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-sm font-bold text-emerald-400 font-mono">
              [{currentItem.pos}]
            </span>
            <p className="text-sm font-semibold text-white leading-relaxed">
              {currentItem.definitionEn}
            </p>
          </div>
          <p className="text-xs text-slate-300 bg-white/5 p-2.5 rounded-xl border border-white/5">
            🇻🇳 <strong className="text-cyan-300 font-bold">Nghĩa tiếng Việt:</strong>{" "}
            {currentItem.definitionVi}
          </p>
          <p className="text-xs text-slate-400 italic font-mono border-l-2 border-cyan-500/50 pl-3">
            "{currentItem.exampleSentence}"
          </p>
        </div>
      </div>

      {/* Spatial Schema Calibration Quiz (Active Retrieval) */}
      <div className="rounded-2xl border border-white/10 bg-[#0B0F19] p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-200">
              Kiểm Tra Phản Xạ Schema [Active Recall Quiz]
            </h3>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            Bấm chọn từ C2 ứng với quỹ đạo không gian trên
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {quizChoices.map((wordOption, idx) => {
            const isTarget = wordOption === currentItem.word;
            let btnStyle = "bg-white/5 border-white/10 text-slate-200 hover:bg-white/10";

            if (isQuizAnswered) {
              if (isTarget) {
                btnStyle = "bg-emerald-500/20 border-emerald-500/60 text-emerald-300 font-black shadow-xs shadow-emerald-500/30";
              } else if (selectedQuizAnswer === wordOption) {
                btnStyle = "bg-rose-500/20 border-rose-500/60 text-rose-300 font-bold";
              } else {
                btnStyle = "opacity-40 bg-white/5 border-transparent text-slate-500";
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
                <span className="truncate w-full text-center">{wordOption}</span>
              </button>
            );
          })}
        </div>

        {isQuizAnswered && (
          <div className="pt-2 flex items-center justify-between animate-in fade-in duration-200">
            <p className="text-xs font-bold text-slate-300">
              {selectedQuizAnswer === currentItem.word ? (
                <span className="text-emerald-400">⚡ Xuất sắc! Phản xạ C2 chính xác.</span>
              ) : (
                <span className="text-rose-400">
                  ⚠️ Chưa đúng. Đáp án chuẩn là:{" "}
                  <strong className="text-white underline">{currentItem.word}</strong>
                </span>
              )}
            </p>
            <button
              onClick={handleNext}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition-all shadow-md shadow-cyan-500/20 cursor-pointer flex items-center gap-1.5"
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
