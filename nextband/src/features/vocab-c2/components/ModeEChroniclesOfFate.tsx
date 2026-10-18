import React, { useState, useEffect, useRef } from "react";
import { NarrativeChronicle, NarrativeSegment, NarrativeChoice } from "@/data/vocab-c2/types";
import { C2ModeSharedProps } from "./ArenaHeader";
import { useArenaTheme } from "../context/ThemeContext";
import {
  BookOpen,
  AlertOctagon,
  CheckCircle2,
  RotateCcw,
  ArrowRight,
  Sparkles,
  MapPin,
  CloudRain,
  UserCheck,
  Compass,
  MessageSquare,
  ShieldAlert,
} from "lucide-react";

export const ModeEChroniclesOfFate: React.FC<C2ModeSharedProps> = ({ unit, onRecordAttempt }) => {
  const { theme } = useArenaTheme();
  const isPaperTheme = theme === "paper";
  const isSlateTheme = theme === "slate";

  const chronicle: NarrativeChronicle | undefined = unit.narrativeChronicle;
  const segments: NarrativeSegment[] = chronicle?.segments || [];

  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<NarrativeChoice | null>(null);
  const [activeParadox, setActiveParadox] = useState<NarrativeChoice | null>(null);
  const [isSegmentSolved, setIsSegmentSolved] = useState(false);
  const segmentStartTimeRef = useRef<number>(Date.now());

  const currentSegment: NarrativeSegment | undefined = segments[currentSegmentIndex];

  useEffect(() => {
    segmentStartTimeRef.current = Date.now();
    setSelectedChoice(null);
    setActiveParadox(null);
    setIsSegmentSolved(false);
  }, [currentSegmentIndex, unit]);

  // Keyboard navigation (1-4)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (!isSegmentSolved && !activeParadox && currentSegment) {
        if (["1", "2", "3", "4"].includes(e.key)) {
          const idx = parseInt(e.key) - 1;
          if (idx < currentSegment.choices.length) {
            handleChoose(currentSegment.choices[idx]);
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSegmentSolved, activeParadox, currentSegment]);

  const handleChoose = (choice: NarrativeChoice) => {
    if (isSegmentSolved || !currentSegment) return;
    const latency = Date.now() - segmentStartTimeRef.current;
    setSelectedChoice(choice);

    if (choice.isCorrect) {
      setIsSegmentSolved(true);
      setActiveParadox(null);
    } else {
      setActiveParadox(choice);
    }

    onRecordAttempt({
      itemId: currentSegment.id,
      word: choice.word,
      mode: "chronicles",
      isCorrect: choice.isCorrect,
      latencyMs: latency,
      meaningVi: choice.nuanceExplanationVi,
      imageSchemaTag: currentSegment.imageSchemaTag,
    });
  };

  const handleRewindTimeline = () => {
    setActiveParadox(null);
    setSelectedChoice(null);
  };

  const handleNextChapter = () => {
    if (currentSegmentIndex < segments.length - 1) {
      setCurrentSegmentIndex((prev) => prev + 1);
    } else {
      setCurrentSegmentIndex(0);
    }
  };

  // Helper to extract character avatar & role
  const parseSpeakerInfo = (rawSpeaker: string) => {
    const match = rawSpeaker.match(/^([^(]+)(?:\(([^)]+)\))?/);
    const name = match ? match[1].trim() : rawSpeaker;
    const tone = match && match[2] ? match[2].trim() : "Serious & Formal";

    let avatarEmoji = "👔";
    if (name.toLowerCase().includes("diana") || name.toLowerCase().includes("legal") || name.toLowerCase().includes("officer")) {
      avatarEmoji = "⚖️";
    } else if (name.toLowerCase().includes("vance") || name.toLowerCase().includes("director")) {
      avatarEmoji = "💼";
    } else if (name.toLowerCase().includes("judge") || name.toLowerCase().includes("magistrate")) {
      avatarEmoji = "🏛️";
    } else if (name.toLowerCase().includes("doctor") || name.toLowerCase().includes("oncologist")) {
      avatarEmoji = "🩺";
    }

    return { name, tone, avatarEmoji };
  };

  if (!chronicle || segments.length === 0) {
    return (
      <div className="p-8 text-center text-slate-400">
        Không có dữ liệu Chronicles of Fate cho Unit này.
      </div>
    );
  }

  const speaker = currentSegment ? parseSpeakerInfo(currentSegment.speakerOrMood) : null;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Novel Setting & Cinematic Visual Stage */}
      <div
        className={`rounded-3xl border shadow-xl relative overflow-hidden transition-all ${
          isPaperTheme
            ? "bg-[#FAF7F2] border-[#E2D9CC] text-slate-900"
            : isSlateTheme
            ? "bg-[#0F172A] border-slate-700/80 text-slate-100"
            : "bg-gradient-to-r from-[#0D1322] to-[#121A30] border-cyan-500/20 text-slate-100 shadow-2xl"
        }`}
      >
        {/* Cinematic Scene Banner with Atmospheric Lighting */}
        <div
          className={`p-6 sm:p-8 border-b relative ${
            isPaperTheme
              ? "bg-gradient-to-r from-amber-50/80 via-white to-amber-100/60 border-slate-200"
              : isSlateTheme
              ? "bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-slate-700"
              : "bg-gradient-to-r from-cyan-950/40 via-slate-950 to-blue-950/40 border-white/10"
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <BookOpen className={`w-4 h-4 ${isPaperTheme ? "text-teal-700" : "text-cyan-400"}`} />
                <span
                  className={`text-[11px] font-black uppercase tracking-widest font-mono ${
                    isPaperTheme ? "text-teal-800" : "text-cyan-400"
                  }`}
                >
                  VISUAL NOVEL CLOZE SIMULATION • CHAPTER {currentSegmentIndex + 1} OF {segments.length}
                </span>
              </div>
              <h2
                className={`text-2xl sm:text-3xl font-black tracking-tight font-serif ${
                  isPaperTheme ? "text-slate-900" : "text-white"
                }`}
              >
                {chronicle.title}
              </h2>
              <p
                className={`text-sm font-serif italic ${
                  isPaperTheme ? "text-slate-600 font-medium" : "text-slate-300"
                }`}
              >
                {chronicle.subtitleVi}
              </p>
            </div>

            {/* Chapter Progress Indicators */}
            <div className="flex items-center gap-1.5 self-start lg:self-auto">
              {segments.map((seg, i) => (
                <button
                  key={seg.id}
                  onClick={() => setCurrentSegmentIndex(i)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    currentSegmentIndex === i
                      ? isPaperTheme
                        ? "bg-teal-700 text-white font-black shadow-xs"
                        : "bg-cyan-500 text-slate-950 font-black shadow-md shadow-cyan-500/20"
                      : isPaperTheme
                      ? "bg-white text-slate-600 border border-slate-300 hover:bg-slate-100"
                      : "bg-white/5 text-slate-400 hover:text-white"
                  }`}
                >
                  <span>Ch.{i + 1}</span>
                  {i < currentSegmentIndex && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                </button>
              ))}
            </div>
          </div>

          {/* Prominent Cinematic Stage Narration (LỜI DẪN BỐI CẢNH ĐIỆN ẢNH - ĐƯỢC ĐẶT NỔI BẬT) */}
          <div
            className={`mt-5 p-4 rounded-2xl border text-sm flex flex-col sm:flex-row sm:items-center gap-3 ${
              isPaperTheme
                ? "bg-white/90 border-amber-200/90 text-slate-800 shadow-xs"
                : "bg-black/60 border-cyan-500/30 text-slate-200"
            }`}
          >
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xl">🎬</span>
              <span
                className={`text-xs font-mono font-black uppercase tracking-wider ${
                  isPaperTheme ? "text-amber-900" : "text-cyan-300"
                }`}
              >
                BỐI CẢNH HIỆN TRƯỜNG:
              </span>
            </div>
            <p className="font-serif italic leading-relaxed text-sm">
              "{chronicle.settingDescription}"
            </p>
          </div>
        </div>

        {/* Narrative Interactive Passage & Character Dialogue */}
        {currentSegment && (
          <div className="p-6 sm:p-8 space-y-6">
            {/* Character Dialogue Box (Bong bóng hội thoại kèm Avatar nhân vật) */}
            <div
              className={`p-6 sm:p-7 rounded-3xl border shadow-sm space-y-4 ${
                isPaperTheme
                  ? "bg-white border-slate-200 text-slate-900 shadow-xs"
                  : "bg-black/50 border-white/10 text-slate-100 shadow-inner"
              }`}
            >
              {/* Speaker Header Card */}
              <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shadow-xs border ${
                      isPaperTheme
                        ? "bg-amber-100 border-amber-300"
                        : "bg-cyan-950/60 border-cyan-500/40 text-cyan-300"
                    }`}
                  >
                    {speaker?.avatarEmoji}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4
                        className={`text-base font-black tracking-tight font-serif ${
                          isPaperTheme ? "text-slate-900" : "text-white"
                        }`}
                      >
                        {speaker?.name}
                      </h4>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${
                          isPaperTheme
                            ? "bg-slate-100 text-slate-700 border-slate-300"
                            : "bg-white/10 text-slate-300 border-white/10"
                        }`}
                      >
                        {currentSegment.chapterLabel}
                      </span>
                    </div>
                    <span
                      className={`text-xs italic font-serif ${
                        isPaperTheme ? "text-slate-500" : "text-slate-400"
                      }`}
                    >
                      Thần thái: {speaker?.tone}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono opacity-60">
                  <MessageSquare className="w-4 h-4" />
                  <span className="hidden sm:inline">Lời Thoại Nhân Vật</span>
                </div>
              </div>

              {/* Dialogue Cloze Text with Blank */}
              <div className="text-lg sm:text-xl font-serif leading-relaxed pt-1">
                <span className="text-2xl text-teal-700 dark:text-cyan-400 font-serif mr-1">“</span>
                {currentSegment.promptTextBefore}
                <span
                  className={`font-mono font-black px-3.5 py-1.5 rounded-xl border mx-2 transition-all inline-block shadow-sm ${
                    isSegmentSolved
                      ? isPaperTheme
                        ? "bg-teal-700 text-white border-teal-800"
                        : "bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-md shadow-cyan-400/20"
                      : isPaperTheme
                      ? "bg-amber-50 text-amber-900 border-amber-300 animate-pulse font-bold"
                      : "bg-white/10 text-cyan-200 border-cyan-500/40 animate-pulse font-bold"
                  }`}
                >
                  {isSegmentSolved ? currentSegment.correctWord : " [ ? ] "}
                </span>
                {currentSegment.promptTextAfter}
                <span className="text-2xl text-teal-700 dark:text-cyan-400 font-serif ml-1">”</span>
              </div>
            </div>

            {/* 4 Strategic C2 Lexicon Choices */}
            <div className="space-y-2">
              <span
                className={`text-xs font-mono font-bold uppercase tracking-wider block ${
                  isPaperTheme ? "text-slate-600" : "text-slate-400"
                }`}
              >
                Lựa chọn từ vựng C2 ăn khớp nhất với văn phong & ngữ cảnh nhân vật:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {currentSegment.choices.map((choice, idx) => {
                  let style = isPaperTheme
                    ? "bg-white border-slate-300 text-slate-800 hover:bg-slate-100 hover:border-slate-400 shadow-xs"
                    : "bg-white/5 border-white/10 text-white hover:bg-white/15 hover:border-cyan-400/40";

                  if (isSegmentSolved && choice.isCorrect) {
                    style = isPaperTheme
                      ? "bg-emerald-100 border-emerald-500 text-emerald-950 font-black shadow-md ring-2 ring-emerald-600"
                      : "bg-emerald-500/20 border-emerald-400 text-emerald-300 font-black shadow-lg shadow-emerald-500/20 ring-2 ring-emerald-400";
                  }

                  return (
                    <button
                      key={choice.word + idx}
                      onClick={() => handleChoose(choice)}
                      disabled={isSegmentSolved || activeParadox !== null}
                      className={`p-4 rounded-2xl border text-sm font-bold transition-all cursor-pointer flex items-center justify-between ${style}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs opacity-60 font-mono px-2 py-0.5 rounded bg-black/5 dark:bg-white/10">
                          [{idx + 1}]
                        </span>
                        <span className="text-base font-black">{choice.word}</span>
                      </div>
                      {isSegmentSolved && choice.isCorrect && (
                        <CheckCircle2
                          className={`w-5 h-5 ${isPaperTheme ? "text-emerald-700" : "text-emerald-400"}`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Correct Timeline Resolution (Phân tích chuẩn phong cách C2 khi chọn đúng) */}
            {isSegmentSolved && (
              <div
                className={`p-6 rounded-2xl border space-y-3 animate-in fade-in duration-300 ${
                  isPaperTheme
                    ? "bg-emerald-50 border-emerald-300 text-emerald-950 shadow-xs"
                    : "bg-emerald-950/40 border-emerald-500/40 text-emerald-100 shadow-xl"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className={`w-5 h-5 ${isPaperTheme ? "text-emerald-700" : "text-emerald-400"}`} />
                    <span className="text-sm font-black font-mono">
                      ⚡ DÒNG THỜI GIAN CHÍNH XÁC: {currentSegment.correctWord.toUpperCase()}
                    </span>
                  </div>
                  <button
                    onClick={handleNextChapter}
                    className={`px-4 py-2 rounded-xl font-black text-xs transition-all shadow-md cursor-pointer flex items-center gap-1.5 self-start sm:self-auto ${
                      isPaperTheme
                        ? "bg-teal-700 hover:bg-teal-800 text-white"
                        : "bg-emerald-500 hover:bg-emerald-400 text-slate-950"
                    }`}
                  >
                    <span>
                      {currentSegmentIndex < segments.length - 1
                        ? "Tiến đến Chương tiếp theo ➔"
                        : "Hoàn thành toàn bộ Cốt truyện"}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p
                  className={`text-xs leading-relaxed font-sans pt-2 border-t ${
                    isPaperTheme ? "border-emerald-200 text-slate-800" : "border-white/10 text-slate-200"
                  }`}
                >
                  💡 <strong className={isPaperTheme ? "text-teal-900" : "text-emerald-300"}>Sắc thái chuẩn xác:</strong>{" "}
                  {currentSegment.choices.find((c) => c.isCorrect)?.nuanceExplanationVi}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Timeline Paradox Modal / Overlay (Khi chọn phương án gây nhiễu) */}
      {activeParadox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className={`max-w-md w-full rounded-3xl border p-6 shadow-2xl space-y-4 ${
              isPaperTheme
                ? "bg-[#FAF7F2] border-rose-400 text-slate-900 shadow-rose-900/20"
                : "bg-[#0F1420] border-rose-500/50 text-slate-100 shadow-rose-950/60"
            }`}
          >
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
              <AlertOctagon className="w-5 h-5 shrink-0" />
              <span className="text-xs font-black uppercase tracking-wider font-mono">
                TIMELINE PARADOX • {activeParadox.consequenceTitle}
              </span>
            </div>

            <div>
              <p className="text-sm font-serif italic leading-relaxed">
                "{activeParadox.whatIfFeedbackEn}"
              </p>
            </div>

            <div
              className={`p-3.5 rounded-xl border space-y-1 ${
                isPaperTheme
                  ? "bg-amber-50 border-amber-200 text-amber-950"
                  : "bg-black/50 border-white/5 text-amber-200"
              }`}
            >
              <span className="text-[11px] font-bold font-mono">
                🇻🇳 Phân tích sai số ngữ nghĩa (Tại sao từ này lệch tông C2?):
              </span>
              <p className="text-xs leading-relaxed font-sans opacity-95">
                {activeParadox.nuanceExplanationVi}
              </p>
            </div>

            <button
              onClick={handleRewindTimeline}
              className="w-full py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>QUAY NGƯỢC THỜI GIAN & CHỌN LẠI</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

