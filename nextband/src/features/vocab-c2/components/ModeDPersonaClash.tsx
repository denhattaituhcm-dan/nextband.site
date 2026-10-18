import React, { useState, useEffect, useRef, useMemo } from "react";
import { PersonaCard, BinaryPrecisionItem } from "@/data/vocab-c2/types";
import { C2ModeSharedProps } from "./ArenaHeader";
import { useArenaTheme } from "../context/ThemeContext";
import { Swords, Shield, Timer, ArrowRight, Sparkles, Scale, RefreshCw } from "lucide-react";

export const ModeDPersonaClash: React.FC<C2ModeSharedProps> = ({ unit, onRecordAttempt }) => {
  const { theme } = useArenaTheme();
  const isPaperTheme = theme === "paper";
  const isSlateTheme = theme === "slate";

  const [activeSubView, setActiveSubView] = useState<"clash" | "binary">("clash");

  // Sub-View 1: Persona Card Clash (5.0s countdown)
  const [cardIndex, setCardIndex] = useState(0);
  const [timeLeftMs, setTimeLeftMs] = useState(5000);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [selectedCounter, setSelectedCounter] = useState<string | null>(null);
  const [isDuelResolved, setIsDuelResolved] = useState(false);
  const duelStartTimeRef = useRef<number>(Date.now());

  const cards: PersonaCard[] = unit.personaCards || [];
  const currentCard: PersonaCard | undefined = cards[cardIndex];

  // Sub-View 2: Fifty-Fifty Binary Precision
  const [binaryIndex, setBinaryIndex] = useState(0);
  const [selectedBinaryChoice, setSelectedBinaryChoice] = useState<string | null>(null);
  const [isBinaryResolved, setIsBinaryResolved] = useState(false);
  const binaryStartTimeRef = useRef<number>(Date.now());

  const binaryPairs: BinaryPrecisionItem[] = unit.binaryPrecisionPairs || [];
  const currentBinary: BinaryPrecisionItem | undefined = binaryPairs[binaryIndex];

  // 5.0s Duel Countdown
  useEffect(() => {
    let animId: number;
    duelStartTimeRef.current = Date.now();
    setTimeLeftMs(5000);
    setIsTimerActive(true);
    setSelectedCounter(null);
    setIsDuelResolved(false);

    const tick = () => {
      const elapsed = Date.now() - duelStartTimeRef.current;
      const remaining = Math.max(0, 5000 - elapsed);
      setTimeLeftMs(remaining);

      if (remaining > 0 && !isDuelResolved) {
        animId = requestAnimationFrame(tick);
      } else if (remaining === 0 && !isDuelResolved) {
        setIsDuelResolved(true);
        if (currentCard) {
          onRecordAttempt({
            itemId: currentCard.id,
            word: currentCard.word,
            mode: "persona",
            isCorrect: false,
            latencyMs: 5000,
            meaningVi: currentCard.meaningVi,
          });
        }
      }
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [cardIndex, unit]);

  useEffect(() => {
    binaryStartTimeRef.current = Date.now();
    setSelectedBinaryChoice(null);
    setIsBinaryResolved(false);
  }, [binaryIndex, unit]);

  // 4 Counter Choices
  const counterOptions = useMemo(() => {
    if (!currentCard) return [];
    const pool = [currentCard.semanticOpposite, ...currentCard.distractors];
    return pool.sort(() => 0.5 - Math.random());
  }, [currentCard]);

  // Keyboard controls (1-4)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (activeSubView === "clash" && !isDuelResolved && currentCard) {
        if (["1", "2", "3", "4"].includes(e.key)) {
          const idx = parseInt(e.key) - 1;
          if (idx < counterOptions.length) {
            handleDeployCounter(counterOptions[idx]);
          }
        }
      } else if (activeSubView === "binary" && !isBinaryResolved && currentBinary) {
        if (e.key === "1") handleSelectBinary(currentBinary.wordA);
        if (e.key === "2") handleSelectBinary(currentBinary.wordB);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSubView, isDuelResolved, currentCard, counterOptions, isBinaryResolved, currentBinary]);

  const handleDeployCounter = (choice: string) => {
    if (isDuelResolved || !currentCard) return;
    const latency = Date.now() - duelStartTimeRef.current;
    const isCorrect = choice.toLowerCase() === currentCard.semanticOpposite.toLowerCase();

    setSelectedCounter(choice);
    setIsDuelResolved(true);
    setIsTimerActive(false);

    onRecordAttempt({
      itemId: currentCard.id,
      word: currentCard.word,
      mode: "persona",
      isCorrect,
      latencyMs: latency,
      meaningVi: currentCard.meaningVi,
      imageSchemaTag: currentCard.imageSchemaTag,
    });
  };

  const nextCard = () => {
    setCardIndex((prev) => (prev < cards.length - 1 ? prev + 1 : 0));
  };

  const handleSelectBinary = (choice: string) => {
    if (isBinaryResolved || !currentBinary) return;
    const latency = Date.now() - binaryStartTimeRef.current;
    const isCorrect = choice.toLowerCase() === currentBinary.correctWord.toLowerCase();

    setSelectedBinaryChoice(choice);
    setIsBinaryResolved(true);

    onRecordAttempt({
      itemId: currentBinary.id,
      word: currentBinary.correctWord,
      mode: "persona",
      isCorrect,
      latencyMs: latency,
      meaningVi: currentBinary.distinctionVi,
    });
  };

  const nextBinary = () => {
    setBinaryIndex((prev) => (prev < binaryPairs.length - 1 ? prev + 1 : 0));
  };

  const timerPercent = (timeLeftMs / 5000) * 100;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Sub-View Switcher Tabs */}
      <div
        className={`flex items-center gap-2 border-b pb-2 ${
          isPaperTheme ? "border-[#E2D9CC]" : "border-white/10"
        }`}
      >
        <button
          onClick={() => setActiveSubView("clash")}
          className={`px-4 py-2 rounded-xl text-xs font-black tracking-wide uppercase transition-all cursor-pointer flex items-center gap-2 ${
            activeSubView === "clash"
              ? isPaperTheme
                ? "bg-rose-100 text-rose-950 border border-rose-300 shadow-xs"
                : "bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-xs shadow-rose-500/20"
              : isPaperTheme
              ? "text-slate-600 hover:text-black"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Swords className={`w-4 h-4 ${isPaperTheme ? "text-rose-700" : "text-rose-400"}`} />
          <span>Sub-View 1: Persona Clash (5.0s Counter Duel)</span>
        </button>
        <button
          onClick={() => setActiveSubView("binary")}
          className={`px-4 py-2 rounded-xl text-xs font-black tracking-wide uppercase transition-all cursor-pointer flex items-center gap-2 ${
            activeSubView === "binary"
              ? isPaperTheme
                ? "bg-teal-100 text-teal-900 border border-teal-300 shadow-xs"
                : "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-xs shadow-cyan-500/20"
              : isPaperTheme
              ? "text-slate-600 hover:text-black"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Scale className={`w-4 h-4 ${isPaperTheme ? "text-teal-700" : "text-cyan-400"}`} />
          <span>Sub-View 2: Fifty-Fifty Binary Precision</span>
        </button>
      </div>

      {activeSubView === "clash" ? (
        currentCard ? (
          <div
            className={`rounded-3xl p-6 sm:p-8 border shadow-xl space-y-6 ${
              isPaperTheme
                ? "bg-[#FAF7F2] border-[#E2D9CC] text-slate-900"
                : isSlateTheme
                ? "bg-[#0F172A] border-slate-700/80 text-slate-100"
                : "bg-[#0D1322] border-rose-500/30 text-slate-100 shadow-2xl"
            }`}
          >
            {/* Countdown Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span
                  className={`flex items-center gap-1 ${
                    isPaperTheme ? "text-rose-800 font-bold" : "text-rose-400"
                  }`}
                >
                  <Timer className="w-3.5 h-3.5" />
                  THỜI GIAN ĐỐI KHÁNG PHẢN XẠ
                </span>
                <span className={`font-black ${isPaperTheme ? "text-slate-900" : "text-white"}`}>
                  {(timeLeftMs / 1000).toFixed(2)}s
                </span>
              </div>
              <div
                className={`h-2 w-full rounded-full overflow-hidden border ${
                  isPaperTheme ? "bg-slate-200 border-slate-300" : "bg-black/60 border-white/10"
                }`}
              >
                <div
                  className={`h-full transition-all duration-75 ${
                    timerPercent > 40
                      ? isPaperTheme
                        ? "bg-rose-600"
                        : "bg-rose-500"
                      : "bg-red-600 animate-pulse"
                  }`}
                  style={{ width: `${timerPercent}%` }}
                />
              </div>
            </div>

            {/* Opponent's Deployed Archetype Card */}
            <div
              className={`rounded-2xl p-6 border text-center space-y-3 relative overflow-hidden ${
                isPaperTheme
                  ? "bg-white border-rose-200 shadow-xs"
                  : "bg-gradient-to-b from-rose-950/40 to-black/60 border-rose-500/40"
              }`}
            >
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${
                  isPaperTheme
                    ? "bg-rose-50 border-rose-300 text-rose-900"
                    : "bg-rose-500/20 border-rose-500/30 text-rose-300"
                }`}
              >
                OPPONENT DEPLOYS: {currentCard.archetypeTitle}
              </div>

              <div>
                <span
                  className={`text-4xl sm:text-5xl font-black tracking-tight drop-shadow-xs font-serif ${
                    isPaperTheme ? "text-slate-900" : "text-white"
                  }`}
                >
                  {currentCard.word}
                </span>
                <p
                  className={`text-xs font-mono mt-1 ${
                    isPaperTheme ? "text-slate-600 font-semibold" : "text-slate-300"
                  }`}
                >
                  {currentCard.ipa}
                </p>
              </div>

              <p
                className={`text-sm max-w-lg mx-auto font-serif leading-relaxed ${
                  isPaperTheme ? "text-slate-800" : "text-slate-200"
                }`}
              >
                "{currentCard.meaningEn}"
              </p>

              <div
                className={`flex items-center justify-center gap-6 pt-2 font-mono text-xs ${
                  isPaperTheme ? "text-slate-600 font-medium" : "text-slate-400"
                }`}
              >
                <span>⚔️ POWER: {currentCard.powerStat}</span>
                <span>🎯 PRECISION: {currentCard.precisionStat}</span>
              </div>

              <p
                className={`text-xs italic font-mono pt-1 ${
                  isPaperTheme ? "text-rose-900 font-medium" : "text-rose-300/80"
                }`}
              >
                Scenario: {currentCard.battleScenario}
              </p>
            </div>

            {/* Instruction */}
            <div className="text-center">
              <span
                className={`text-xs font-mono uppercase tracking-widest ${
                  isPaperTheme ? "text-slate-600 font-semibold" : "text-slate-400"
                }`}
              >
                TRIỂN KHAI THẺ ĐỐI LẬP (SEMANTIC OPPOSITE) ĐỂ BẺ GÃY KHIÊN THỦ!
              </span>
            </div>

            {/* 4 Counter Choices */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {counterOptions.map((opt, idx) => {
                const isTarget = opt.toLowerCase() === currentCard.semanticOpposite.toLowerCase();
                let style = isPaperTheme
                  ? "bg-white border-slate-300 text-slate-800 hover:bg-slate-100 hover:border-slate-400 shadow-xs"
                  : "bg-white/5 border-white/10 text-white hover:bg-white/15 hover:border-rose-400/40";

                if (isDuelResolved) {
                  if (isTarget) {
                    style = isPaperTheme
                      ? "bg-emerald-100 border-emerald-500 text-emerald-950 font-black shadow-md"
                      : "bg-emerald-500/20 border-emerald-400 text-emerald-300 font-black shadow-lg shadow-emerald-500/20";
                  } else if (selectedCounter === opt) {
                    style = isPaperTheme
                      ? "bg-rose-100 border-rose-400 text-rose-950 font-bold"
                      : "bg-rose-500/20 border-rose-400 text-rose-300 font-bold";
                  } else {
                    style = isPaperTheme
                      ? "opacity-40 bg-slate-100 border-transparent text-slate-400"
                      : "opacity-40 bg-white/5 border-transparent text-slate-500";
                  }
                }

                return (
                  <button
                    key={opt + idx}
                    onClick={() => handleDeployCounter(opt)}
                    disabled={isDuelResolved}
                    className={`p-4 rounded-2xl border text-sm font-bold transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${style}`}
                  >
                    <span className="text-[10px] opacity-60 font-mono">[{idx + 1}]</span>
                    <span className="truncate w-full text-center">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Duel Resolution Banner */}
            {isDuelResolved && (
              <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-2 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-rose-300 font-mono">
                    ✦ Thẻ khắc chế chuẩn: {currentCard.semanticOpposite.toUpperCase()}
                  </span>
                  <button
                    onClick={nextCard}
                    className="px-4 py-1.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-black text-xs transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Trận tiếp theo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs text-slate-300">{currentCard.counterExplanationVi}</p>
              </div>
            )}
          </div>
        ) : (
          <p className="text-slate-400 text-center">Không có Persona Card.</p>
        )
      ) : (
        /* Fifty-Fifty Binary Precision */
        currentBinary ? (
          <div className="rounded-3xl p-6 sm:p-8 bg-[#0D1322] border border-cyan-500/30 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                  BINARY PRECISION PAIR {binaryIndex + 1} / {binaryPairs.length}
                </span>
                <p className="text-xs text-slate-400 mt-0.5">
                  Phân biệt sắc thái giữa 2 từ C2 dễ nhầm lẫn
                </p>
              </div>
            </div>

            {/* Cloze Sentence */}
            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 text-center">
              <p className="text-lg font-serif text-white leading-relaxed max-w-2xl mx-auto">
                {currentBinary.contextSentence.replace("___", " [ ? ] ")}
              </p>
            </div>

            {/* 2 Binary Precision Choices */}
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              {[currentBinary.wordA, currentBinary.wordB].map((wordChoice, idx) => {
                const isTarget = wordChoice.toLowerCase() === currentBinary.correctWord.toLowerCase();
                let style = "bg-white/5 border-white/10 text-white hover:bg-white/15 hover:border-cyan-400/40";

                if (isBinaryResolved) {
                  if (isTarget) {
                    style = "bg-cyan-500/20 border-cyan-400 text-cyan-300 font-black shadow-lg shadow-cyan-500/20";
                  } else if (selectedBinaryChoice === wordChoice) {
                    style = "bg-rose-500/20 border-rose-400 text-rose-300 font-bold";
                  } else {
                    style = "opacity-40 bg-white/5 border-transparent text-slate-500";
                  }
                }

                return (
                  <button
                    key={wordChoice + idx}
                    onClick={() => handleSelectBinary(wordChoice)}
                    disabled={isBinaryResolved}
                    className={`py-4 px-6 rounded-2xl border text-base font-bold transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${style}`}
                  >
                    <span className="text-[11px] opacity-60 font-mono">[{idx + 1}]</span>
                    <span>{wordChoice}</span>
                  </button>
                );
              })}
            </div>

            {isBinaryResolved && (
              <div className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-500/40 space-y-2 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-cyan-300">
                    Phân biệt chuẩn C2:
                  </span>
                  <button
                    onClick={nextBinary}
                    className="px-4 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Cặp tiếp theo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs text-slate-200">{currentBinary.distinctionVi}</p>
              </div>
            )}
          </div>
        ) : (
          <p className="text-slate-400 text-center">Không có Binary Precision Pairs.</p>
        )
      )}
    </div>
  );
};
