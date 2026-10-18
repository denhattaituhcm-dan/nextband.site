import React, { useState, useEffect, useRef, useMemo } from "react";
import { CollocationPairItem, DomainSortItem } from "@/data/vocab-c2/types";
import { C2ModeSharedProps } from "./ArenaHeader";
import { useArenaTheme } from "../context/ThemeContext";
import {
  Zap,
  Timer,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Layers,
  Trophy,
  BookOpen,
  Eye,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import { evaluateLatency } from "../engine/spacedRetrievalEngine";

export const ModeBSynapseSlash: React.FC<C2ModeSharedProps> = ({ unit, onRecordAttempt }) => {
  const { theme } = useArenaTheme();
  const isPaperTheme = theme === "paper";
  const isSlateTheme = theme === "slate";

  const [activeTab, setActiveTab] = useState<"collocation" | "domain">("collocation");
  const [collocationMode, setCollocationMode] = useState<"study" | "blitz">("study");

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
      <div
        className={`flex flex-wrap items-center justify-between gap-3 border-b pb-3 ${
          isPaperTheme ? "border-[#E2D9CC]" : "border-white/10"
        }`}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("collocation")}
            className={`px-3.5 py-2 rounded-xl text-xs font-black tracking-wide uppercase transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "collocation"
                ? isPaperTheme
                  ? "bg-teal-100 text-teal-900 border border-teal-300 shadow-xs"
                  : "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-xs shadow-cyan-500/20"
                : isPaperTheme
                ? "text-slate-600 hover:text-black"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Zap className={`w-4 h-4 ${isPaperTheme ? "text-teal-700" : "text-cyan-400"}`} />
            <span>Sub-Arena 1: Collocation Katana Blitz</span>
          </button>

          <button
            onClick={() => setActiveTab("domain")}
            className={`px-3.5 py-2 rounded-xl text-xs font-black tracking-wide uppercase transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "domain"
                ? isPaperTheme
                  ? "bg-amber-100 text-amber-900 border border-amber-300 shadow-xs"
                  : "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-xs shadow-amber-500/20"
                : isPaperTheme
                ? "text-slate-600 hover:text-black"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Layers className={`w-4 h-4 ${isPaperTheme ? "text-amber-700" : "text-amber-400"}`} />
            <span>Sub-Arena 2: 5-Way Domain Sorter</span>
          </button>
        </div>

        {/* Study Mode vs Blitz Mode Toggle */}
        {activeTab === "collocation" && (
          <div
            className={`flex items-center p-1 rounded-xl border text-xs font-bold ${
              isPaperTheme
                ? "bg-white border-[#E2D9CC] shadow-xs"
                : isSlateTheme
                ? "bg-slate-900 border-slate-700"
                : "bg-slate-900/90 border-slate-800"
            }`}
          >
            <button
              onClick={() => setCollocationMode("study")}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                collocationMode === "study"
                  ? isPaperTheme
                    ? "bg-teal-700 text-white shadow-xs font-black"
                    : "bg-cyan-500 text-slate-950 shadow-xs font-black"
                  : isPaperTheme
                  ? "text-slate-600 hover:text-slate-900"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Hồ Sơ Nạp Từ (Study First)</span>
            </button>
            <button
              onClick={() => setCollocationMode("blitz")}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                collocationMode === "blitz"
                  ? isPaperTheme
                    ? "bg-amber-700 text-white shadow-xs font-black"
                    : "bg-amber-500 text-slate-950 shadow-xs font-black"
                  : isPaperTheme
                  ? "text-slate-600 hover:text-slate-900"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Đua Blitz (60s Timer)</span>
            </button>
          </div>
        )}
      </div>

      {activeTab === "collocation" ? (
        collocationMode === "study" ? (
          /* PRE-STUDY DOSSIER (Học trước khi thi) */
          <div className="space-y-4 animate-in fade-in duration-200">
            <div
              className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isPaperTheme
                  ? "bg-[#FAF7F2] border-[#E2D9CC] text-slate-900"
                  : isSlateTheme
                  ? "bg-[#0F172A] border-slate-700/80 text-slate-100"
                  : "bg-[#0B0F19] border-white/10 text-slate-100"
              }`}
            >
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className={isPaperTheme ? "text-teal-700" : "text-cyan-400"} />
                  Hồ Sơ Cụm Từ C2 Cần Nạp (Collocation Dossier)
                </h3>
                <p
                  className={`text-xs mt-0.5 ${
                    isPaperTheme ? "text-slate-600 font-medium" : "text-slate-400"
                  }`}
                >
                  Nghiên cứu kỹ các cặp từ C2 và ngữ cảnh trước khi bước vào phòng đấu tốc độ 60s!
                </p>
              </div>

              <button
                onClick={() => setCollocationMode("blitz")}
                className={`px-4 py-2 rounded-xl font-black text-xs transition-all shadow-md cursor-pointer flex items-center gap-2 ${
                  isPaperTheme
                    ? "bg-teal-700 hover:bg-teal-800 text-white"
                    : "bg-cyan-500 hover:bg-cyan-400 text-slate-950"
                }`}
              >
                <span>Bắt đầu Đua Blitz 60s</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Grid of Collocation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {colPairs.map((pair, idx) => (
                <div
                  key={pair.id || idx}
                  className={`p-4 rounded-2xl border transition-all ${
                    isPaperTheme
                      ? "bg-white border-[#E2D9CC] shadow-xs hover:border-teal-400"
                      : isSlateTheme
                      ? "bg-[#131C31] border-slate-700/80 hover:border-cyan-500/50"
                      : "bg-[#0D1322] border-white/10 hover:border-cyan-500/40"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`text-base font-black tracking-tight font-serif ${
                        isPaperTheme ? "text-slate-900" : "text-cyan-300"
                      }`}
                    >
                      {pair.columnA}{" "}
                      <span className={isPaperTheme ? "text-amber-700 font-sans" : "text-amber-400 font-sans"}>
                        + {pair.columnB}
                      </span>
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                        isPaperTheme
                          ? "bg-slate-100 text-slate-600 border-slate-200"
                          : "bg-white/5 text-slate-400 border-white/10"
                      }`}
                    >
                      {pair.imageSchemaTag}
                    </span>
                  </div>

                  <p
                    className={`text-xs font-medium mb-2 ${
                      isPaperTheme ? "text-slate-800" : "text-slate-200"
                    }`}
                  >
                    🇻🇳 <strong>Nghĩa:</strong> {pair.meaningVi}
                  </p>

                  <div
                    className={`text-xs p-2.5 rounded-xl border-l-2 font-serif italic leading-relaxed ${
                      isPaperTheme
                        ? "bg-[#FAF7F2] border-teal-600 text-slate-800"
                        : "bg-black/30 border-cyan-400 text-slate-300"
                    }`}
                  >
                    "{pair.example}"
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Collocation Katana Blitz (60s timer) */
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Top HUD: Score + Timer */}
            <div
              className={`flex items-center justify-between p-4 rounded-2xl border ${
                isPaperTheme
                  ? "bg-[#FAF7F2] border-[#E2D9CC] text-slate-900 shadow-xs"
                  : isSlateTheme
                  ? "bg-[#0F172A] border-slate-700/80 text-slate-100"
                  : "bg-[#0B0F19] border-white/10 text-slate-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`text-xs font-mono ${isPaperTheme ? "text-slate-600" : "text-slate-400"}`}>
                  BLITZ SCORE
                </span>
                <span
                  className={`text-xl font-black font-mono ${
                    isPaperTheme ? "text-teal-800" : "text-cyan-300"
                  }`}
                >
                  {score} XP
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Timer className={`w-4 h-4 ${timeLeft <= 10 ? "text-rose-500 animate-pulse" : isPaperTheme ? "text-amber-700" : "text-amber-400"}`} />
                <span
                  className={`text-lg font-black font-mono ${
                    timeLeft <= 10
                      ? "text-rose-500 animate-pulse"
                      : isPaperTheme
                      ? "text-slate-900"
                      : "text-white"
                  }`}
                >
                  {timeLeft}s
                </span>
                {!isTimerRunning && timeLeft === 60 && (
                  <span className={`text-[11px] ${isPaperTheme ? "text-slate-600" : "text-slate-400"}`}>
                    (Tự kích hoạt khi bấm đáp án)
                  </span>
                )}
              </div>
            </div>

            {currentPair ? (
              <div
                className={`relative rounded-3xl p-8 border text-center overflow-hidden transition-all shadow-xl ${
                  isPaperTheme
                    ? "bg-[#FAF7F2] border-[#E2D9CC] text-slate-900"
                    : isSlateTheme
                    ? "bg-[#0F172A] border-slate-700/80 text-slate-100"
                    : "bg-[#0D1322] border-cyan-500/30 text-slate-100"
                } ${slashTrigger ? "scale-[1.01] border-teal-500 shadow-teal-500/30" : ""}`}
              >
                {/* Slash Laser Line Effect */}
                {slashTrigger && (
                  <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center">
                    <div className="w-full h-1 bg-teal-400 shadow-[0_0_20px_#0F766E] rotate-[-15deg] animate-in fade-in zoom-in duration-200" />
                  </div>
                )}

                <div className="flex items-center justify-center gap-2 mb-2">
                  <span
                    className={`text-xs font-mono uppercase tracking-widest ${
                      isPaperTheme ? "text-teal-800 font-bold" : "text-cyan-400/80"
                    }`}
                  >
                    SNAP THE COLLOCATE [COLUMN A ➔ COLUMN B]
                  </span>
                </div>

                {/* Huge Column A Trigger Word */}
                <div className="my-6">
                  <span
                    className={`text-4xl sm:text-5xl font-black tracking-tight drop-shadow-xs ${
                      isPaperTheme ? "text-slate-900 font-serif" : "text-white"
                    }`}
                  >
                    {currentPair.columnA} + _____ ?
                  </span>
                </div>

                {/* 4 Fast-Fire Options */}
                <div className="grid grid-cols-2 gap-3 max-w-xl mx-auto my-6">
                  {colOptions.map((opt, idx) => {
                    const isTarget = opt === currentPair.columnB;
                    let style = isPaperTheme
                      ? "bg-white border-slate-300 text-slate-800 hover:bg-slate-100 hover:border-slate-400 shadow-xs"
                      : "bg-white/5 border-white/10 text-white hover:bg-white/15 hover:border-cyan-500/40";

                    if (isAnswered) {
                      if (isTarget) {
                        style = isPaperTheme
                          ? "bg-emerald-100 border-emerald-500 text-emerald-950 font-black shadow-md"
                          : "bg-emerald-500/20 border-emerald-400 text-emerald-300 font-black shadow-lg shadow-emerald-500/20";
                      } else if (selectedColChoice === opt) {
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
                  <div
                    className={`pt-5 border-t text-left space-y-2.5 animate-in fade-in duration-200 ${
                      isPaperTheme ? "border-slate-200" : "border-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-base font-black font-serif ${
                          isPaperTheme ? "text-teal-900" : "text-cyan-300"
                        }`}
                      >
                        ✦ {currentPair.fullCollocation}
                      </span>
                      <button
                        onClick={nextCollocation}
                        className={`px-4 py-2 rounded-xl font-black text-xs transition-all shadow-md cursor-pointer flex items-center gap-1.5 ${
                          isPaperTheme
                            ? "bg-teal-700 hover:bg-teal-800 text-white"
                            : "bg-cyan-500 hover:bg-cyan-400 text-slate-950"
                        }`}
                      >
                        <span>Cặp tiếp theo</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p
                      className={`text-xs ${
                        isPaperTheme ? "text-slate-800 font-medium" : "text-slate-300"
                      }`}
                    >
                      🇻🇳 <strong>Ý nghĩa:</strong> {pairMeaningViOrFallback(currentPair)}
                    </p>
                    <div
                      className={`text-xs p-3 rounded-xl border-l-2 font-serif italic ${
                        isPaperTheme
                          ? "bg-white border-teal-600 text-slate-800"
                          : "bg-black/30 border-cyan-400 text-slate-300"
                      }`}
                    >
                      "{currentPair.example}"
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-slate-400 text-center">Không có collocation data.</p>
            )}
          </div>
        )
      ) : (
        /* 5-Way Domain Sorter */
        <div className="space-y-6">
          <div
            className={`flex items-center justify-between p-4 rounded-2xl border ${
              isPaperTheme
                ? "bg-[#FAF7F2] border-[#E2D9CC] text-slate-900 shadow-xs"
                : isSlateTheme
                ? "bg-[#0F172A] border-slate-700/80 text-slate-100"
                : "bg-[#0B0F19] border-white/10 text-slate-100"
            }`}
          >
            <span
              className={`text-xs font-mono ${
                isPaperTheme ? "text-slate-600 font-medium" : "text-slate-400"
              }`}
            >
              TIẾN ĐỘ: {domainIndex + 1} / {domainItems.length}
            </span>
            <span
              className={`text-sm font-black font-mono ${
                isPaperTheme ? "text-amber-800" : "text-amber-300"
              }`}
            >
              ĐIỂM SẮP XẾP: {domainScore} XP
            </span>
          </div>

          {currentDomainItem ? (
            <div
              className={`rounded-3xl p-8 border text-center shadow-xl space-y-6 ${
                isPaperTheme
                  ? "bg-[#FAF7F2] border-[#E2D9CC] text-slate-900"
                  : isSlateTheme
                  ? "bg-[#0F172A] border-slate-700/80 text-slate-100"
                  : "bg-[#0D1322] border-amber-500/30 text-slate-100"
              }`}
            >
              <span
                className={`text-xs font-mono uppercase tracking-widest ${
                  isPaperTheme ? "text-amber-800 font-bold" : "text-amber-400"
                }`}
              >
                ĐIỀU HƯỚNG THUẬT NGỮ VÀO BUCKET CHUYÊN NGÀNH
              </span>

              {/* Active Falling Jargon Term */}
              <div
                className={`p-6 rounded-2xl border max-w-md mx-auto ${
                  isPaperTheme
                    ? "bg-white border-slate-300 shadow-xs"
                    : "bg-black/40 border-white/10"
                }`}
              >
                <span
                  className={`text-3xl font-black tracking-tight font-serif ${
                    isPaperTheme ? "text-slate-900" : "text-white"
                  }`}
                >
                  "{currentDomainItem.term}"
                </span>
                <p
                  className={`text-xs mt-2 font-mono ${
                    isPaperTheme ? "text-slate-600 font-medium" : "text-slate-400"
                  }`}
                >
                  {currentDomainItem.clueEn}
                </p>
                {currentDomainItem.meaningVi && (
                  <p
                    className={`text-xs mt-1 font-sans ${
                      isPaperTheme ? "text-teal-800 font-semibold" : "text-cyan-300"
                    }`}
                  >
                    🇻🇳 {currentDomainItem.meaningVi}
                  </p>
                )}
              </div>

              {domainFeedback && (
                <div
                  className={`p-3 rounded-xl text-xs font-bold font-mono transition-all ${
                    domainFeedback.isCorrect
                      ? isPaperTheme
                        ? "bg-emerald-100 text-emerald-950 border border-emerald-400"
                        : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      : isPaperTheme
                      ? "bg-rose-100 text-rose-950 border border-rose-400"
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
                    className={`p-3.5 rounded-2xl border font-bold text-xs transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                      isPaperTheme
                        ? "bg-white border-slate-300 text-slate-800 hover:bg-amber-50 hover:border-amber-400 shadow-xs"
                        : "bg-white/5 border-white/10 hover:border-amber-400/60 hover:bg-amber-500/10 text-white"
                    }`}
                  >
                    <span
                      className={`text-[10px] font-mono ${
                        isPaperTheme ? "text-amber-800 font-bold" : "text-amber-400"
                      }`}
                    >
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

function pairMeaningViOrFallback(pair: CollocationPairItem): string {
  return pair.meaningVi || "Cụm từ kết hợp C2 tự nhiên theo chuẩn văn phong học thuật.";
}
