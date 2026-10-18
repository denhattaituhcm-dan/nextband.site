import React, { useState, useEffect, useRef, useMemo } from "react";
import { CollocationPairItem, DomainSortItem } from "@/data/vocab-c2/types";
import { C2ModeSharedProps } from "./ArenaHeader";
import { Zap, Timer, CheckCircle2, XCircle, ArrowRight, Layers, Trophy } from "lucide-react";
import { evaluateLatency } from "../engine/spacedRetrievalEngine";

export const ModeBSynapseSlash: React.FC<C2ModeSharedProps> = ({ unit, onRecordAttempt }) => {
  const [activeTab, setActiveTab] = useState<"collocation" | "domain">("collocation");

  // Sub-Arena 1: Collocation Katana Blitz (60s timer)
  const [collocationIndex, setCollocationIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedColChoice, setSelectedColChoice] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [slashTrigger, setSlashTrigger] = useState(false);
  const colStartTimeRef = useRef<number>(Date.now());

  const colPairs: CollocationPairItem[] = unit.collocationPairs || [];
  const currentPair: CollocationPairItem | undefined = colPairs[collocationIndex];

  // Sub-Arena 2: 5-Way Domain Sorter
  const [domainIndex, setDomainIndex] = useState(0);
  const [domainScore, setDomainScore] = useState(0);
  const [domainFeedback, setDomainFeedback] = useState<{ isCorrect: boolean; term: string } | null>(null);
  const domainStartTimeRef = useRef<number>(Date.now());

  const domainItems: DomainSortItem[] = unit.domainSortItems || [];
  const currentDomainItem: DomainSortItem | undefined = domainItems[domainIndex];
  const availableDomains = unit.availableDomains || [
    "Corporate Finance",
    "Mergers & Acquisitions",
    "Market Strategy",
    "Economics",
    "Corporate Governance",
  ];

  // 60s Countdown Timer
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerRunning(false);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isTimerRunning, timeLeft]);

  useEffect(() => {
    colStartTimeRef.current = Date.now();
    setSelectedColChoice(null);
    setIsAnswered(false);
    setSlashTrigger(false);
  }, [collocationIndex]);

  useEffect(() => {
    domainStartTimeRef.current = Date.now();
    setDomainFeedback(null);
  }, [domainIndex]);

  // Collocation 4 options
  const colOptions = useMemo(() => {
    if (!currentPair) return [];
    const pool = colPairs.filter((p) => p.id !== currentPair.id).map((p) => p.columnB);
    const shuffledDistractors = pool.sort(() => 0.5 - Math.random()).slice(0, 3);
    const combined = [currentPair.columnB, ...shuffledDistractors];
    return combined.sort(() => 0.5 - Math.random());
  }, [currentPair, colPairs]);

  // Keyboard controls for fast response (1-4 keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (activeTab === "collocation" && !isAnswered && currentPair) {
        if (["1", "2", "3", "4"].includes(e.key)) {
          const idx = parseInt(e.key) - 1;
          if (idx < colOptions.length) {
            handleSelectCol(colOptions[idx]);
          }
        }
      } else if (activeTab === "domain" && currentDomainItem) {
        const keyNum = parseInt(e.key);
        if (keyNum >= 1 && keyNum <= availableDomains.length) {
          handleSelectDomain(availableDomains[keyNum - 1]);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTab, isAnswered, currentPair, colOptions, currentDomainItem, availableDomains]);

  const handleSelectCol = (choice: string) => {
    if (isAnswered || !currentPair) return;
    const latency = Date.now() - colStartTimeRef.current;
    const isCorrect = choice === currentPair.columnB;

    if (!isTimerRunning && timeLeft > 0) {
      setIsTimerRunning(true);
    }

    setSelectedColChoice(choice);
    setIsAnswered(true);

    if (isCorrect) {
      setSlashTrigger(true);
      setScore((prev) => prev + 100);
      setTimeout(() => setSlashTrigger(false), 500);
    }

    onRecordAttempt({
      itemId: currentPair.id,
      word: currentPair.fullCollocation,
      mode: "synapse",
      isCorrect,
      latencyMs: latency,
      meaningVi: currentPair.meaningVi,
      imageSchemaTag: currentPair.imageSchemaTag,
    });
  };

  const nextCollocation = () => {
    setCollocationIndex((prev) => (prev < colPairs.length - 1 ? prev + 1 : 0));
  };

  const handleSelectDomain = (domainChoice: string) => {
    if (!currentDomainItem) return;
    const latency = Date.now() - domainStartTimeRef.current;
    const isCorrect = domainChoice.toLowerCase() === currentDomainItem.domain.toLowerCase();

    setDomainFeedback({ isCorrect, term: currentDomainItem.term });
    if (isCorrect) setDomainScore((prev) => prev + 80);

    onRecordAttempt({
      itemId: currentDomainItem.id,
      word: currentDomainItem.term,
      mode: "synapse",
      isCorrect,
      latencyMs: latency,
      meaningVi: currentDomainItem.meaningVi,
    });

    setTimeout(() => {
      setDomainIndex((prev) => (prev < domainItems.length - 1 ? prev + 1 : 0));
    }, 600);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Sub-Arena Selector Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2">
        <button
          onClick={() => setActiveTab("collocation")}
          className={`px-4 py-2 rounded-xl text-xs font-black tracking-wide uppercase transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === "collocation"
              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-xs shadow-cyan-500/20"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Zap className="w-4 h-4 text-cyan-400" />
          <span>Sub-Arena 1: Collocation Katana Blitz (60s)</span>
        </button>
        <button
          onClick={() => setActiveTab("domain")}
          className={`px-4 py-2 rounded-xl text-xs font-black tracking-wide uppercase transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === "domain"
              ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-xs shadow-amber-500/20"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Layers className="w-4 h-4 text-amber-400" />
          <span>Sub-Arena 2: 5-Way Domain Sorter</span>
        </button>
      </div>

      {activeTab === "collocation" ? (
        /* Collocation Katana Blitz */
        <div className="space-y-6">
          {/* Top HUD: Score + Timer */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-[#0B0F19] border border-white/10">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-400">BLITZ SCORE</span>
              <span className="text-xl font-black text-cyan-300 font-mono">
                {score} XP
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Timer className={`w-4 h-4 ${timeLeft <= 10 ? "text-rose-400 animate-pulse" : "text-amber-400"}`} />
              <span
                className={`text-lg font-black font-mono ${
                  timeLeft <= 10 ? "text-rose-400 animate-pulse" : "text-white"
                }`}
              >
                {timeLeft}s
              </span>
              {!isTimerRunning && timeLeft === 60 && (
                <span className="text-[11px] text-slate-400">(Tự động kích hoạt khi chọn)</span>
              )}
            </div>
          </div>

          {currentPair ? (
            <div
              className={`relative rounded-3xl p-8 bg-[#0D1322] border border-cyan-500/30 shadow-2xl text-center overflow-hidden transition-all ${
                slashTrigger ? "scale-[1.01] border-cyan-400 shadow-cyan-400/40" : ""
              }`}
            >
              {/* Slash Laser Line Effect */}
              {slashTrigger && (
                <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center">
                  <div className="w-full h-1 bg-cyan-300 shadow-[0_0_20px_#00F5D4] rotate-[-15deg] animate-in fade-in zoom-in duration-200" />
                </div>
              )}

              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400/80">
                SNAP THE COLLOCATE [COLUMN A ➔ COLUMN B]
              </span>

              {/* Huge Column A Trigger Word */}
              <div className="my-6">
                <span className="text-4xl sm:text-5xl font-black tracking-tight text-white drop-shadow-md">
                  {currentPair.columnA} + _____ ?
                </span>
              </div>

              {/* 4 Fast-Fire Options */}
              <div className="grid grid-cols-2 gap-3 max-w-xl mx-auto my-6">
                {colOptions.map((opt, idx) => {
                  const isTarget = opt === currentPair.columnB;
                  let style = "bg-white/5 border-white/10 text-white hover:bg-white/15 hover:border-cyan-500/40";

                  if (isAnswered) {
                    if (isTarget) {
                      style = "bg-emerald-500/20 border-emerald-400 text-emerald-300 font-black shadow-lg shadow-emerald-500/20";
                    } else if (selectedColChoice === opt) {
                      style = "bg-rose-500/20 border-rose-400 text-rose-300 font-bold";
                    } else {
                      style = "opacity-40 bg-white/5 border-transparent text-slate-500";
                    }
                  }

                  return (
                    <button
                      key={opt + idx}
                      onClick={() => handleSelectCol(opt)}
                      disabled={isAnswered}
                      className={`p-4 rounded-2xl border text-sm sm:text-base font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${style}`}
                    >
                      <span className="text-xs opacity-50 font-mono">[{idx + 1}]</span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanatory Breakdown Post-Answer */}
              {isAnswered && (
                <div className="pt-4 border-t border-white/10 text-left space-y-2 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black text-cyan-300 font-mono">
                      ✦ {currentPair.fullCollocation}
                    </span>
                    <button
                      onClick={nextCollocation}
                      className="px-4 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Tiếp tục</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-300">
                    🇻🇳 <strong className="text-white">Ý nghĩa:</strong> {currentPair.meaningVi}
                  </p>
                  <p className="text-xs text-slate-400 italic font-mono">
                    "{currentPair.example}"
                  </p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-slate-400 text-center">Không có collocation data.</p>
          )}
        </div>
      ) : (
        /* 5-Way Domain Sorter */
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-[#0B0F19] border border-white/10">
            <span className="text-xs font-mono text-slate-400">
              TIẾN ĐỘ: {domainIndex + 1} / {domainItems.length}
            </span>
            <span className="text-sm font-black text-amber-300 font-mono">
              ĐIỂM SẮP XẾP: {domainScore} XP
            </span>
          </div>

          {currentDomainItem ? (
            <div className="rounded-3xl p-8 bg-[#0D1322] border border-amber-500/30 text-center shadow-2xl space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
                ĐIỀU HƯỚNG THUẬT NGỮ VÀO BUCKET CHUYÊN NGÀNH
              </span>

              {/* Active Falling Jargon Term */}
              <div className="p-6 rounded-2xl bg-black/40 border border-white/10 max-w-md mx-auto">
                <span className="text-3xl font-black text-white tracking-tight">
                  "{currentDomainItem.term}"
                </span>
                <p className="text-xs text-slate-400 mt-2 font-mono">
                  {currentDomainItem.clueEn}
                </p>
              </div>

              {domainFeedback && (
                <div
                  className={`p-3 rounded-xl text-xs font-bold font-mono transition-all ${
                    domainFeedback.isCorrect
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      : "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                  }`}
                >
                  {domainFeedback.isCorrect ? "⚡ CHÍNH XÁC! +80 XP" : "⚠️ SAI LĨNH VỰC!"}
                </div>
              )}

              {/* 5 Occupational / Thematic Domain Buckets */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-4">
                {availableDomains.map((domainName, idx) => (
                  <button
                    key={domainName + idx}
                    onClick={() => handleSelectDomain(domainName)}
                    className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/60 hover:bg-amber-500/10 text-white font-bold text-xs transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5"
                  >
                    <span className="text-[10px] text-amber-400 font-mono">
                      [{idx + 1}]
                    </span>
                    <span className="truncate w-full text-center">{domainName}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-slate-400 text-center">Không có dữ liệu Domain Sorter.</p>
          )}
        </div>
      )}
    </div>
  );
};
