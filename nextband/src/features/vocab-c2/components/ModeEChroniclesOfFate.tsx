import React, { useState, useEffect, useRef } from "react";
import { NarrativeChronicle, NarrativeSegment, NarrativeChoice } from "@/data/vocab-c2/types";
import { C2ModeSharedProps } from "./ArenaHeader";
import { BookOpen, AlertOctagon, CheckCircle2, RotateCcw, ArrowRight, Sparkles } from "lucide-react";

export const ModeEChroniclesOfFate: React.FC<C2ModeSharedProps> = ({ unit, onRecordAttempt }) => {
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

  if (!chronicle || segments.length === 0) {
    return (
      <div className="p-8 text-center text-slate-400">
        Không có dữ liệu Chronicles of Fate cho Unit này.
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Novel Setting Header */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#0D1322] to-[#121A30] border border-cyan-500/20 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <span className="text-[11px] font-black uppercase tracking-widest text-cyan-400 font-mono">
              INTERACTIVE STORY SIMULATION • CHAPTER {currentSegmentIndex + 1} OF {segments.length}
            </span>
            <h2 className="text-2xl font-black text-white tracking-tight">
              {chronicle.title}
            </h2>
            <p className="text-xs text-slate-300 font-serif italic">
              {chronicle.subtitleVi}
            </p>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-400 font-mono max-w-xs text-right">
            {chronicle.settingDescription}
          </div>
        </div>

        {/* Narrative Passage Box */}
        {currentSegment && (
          <div className="py-8 space-y-6">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {currentSegment.chapterLabel}
              </span>
              <span className="text-xs font-serif text-slate-400 italic">
                [{currentSegment.speakerOrMood}]
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-black/50 border border-white/10 text-lg sm:text-xl font-serif text-slate-100 leading-relaxed shadow-inner">
              {currentSegment.promptTextBefore}
              <span
                className={`font-mono font-black px-3 py-1 rounded-xl border mx-1.5 transition-all inline-block ${
                  isSegmentSolved
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-md shadow-cyan-400/20"
                    : "bg-white/10 text-cyan-200 border-cyan-500/40 animate-pulse"
                }`}
              >
                {isSegmentSolved ? currentSegment.correctWord : " [ ? ] "}
              </span>
              {currentSegment.promptTextAfter}
            </div>

            {/* 4 Choices */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto pt-2">
              {currentSegment.choices.map((choice, idx) => {
                let style = "bg-white/5 border-white/10 text-white hover:bg-white/15 hover:border-cyan-400/40";

                if (isSegmentSolved && choice.isCorrect) {
                  style = "bg-emerald-500/20 border-emerald-400 text-emerald-300 font-black shadow-lg shadow-emerald-500/20";
                }

                return (
                  <button
                    key={choice.word + idx}
                    onClick={() => handleChoose(choice)}
                    disabled={isSegmentSolved || activeParadox !== null}
                    className={`p-4 rounded-2xl border text-sm font-bold transition-all cursor-pointer flex items-center justify-between ${style}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs opacity-50 font-mono">[{idx + 1}]</span>
                      <span className="text-base font-black">{choice.word}</span>
                    </div>
                    {isSegmentSolved && choice.isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Correct Timeline Resolution */}
            {isSegmentSolved && (
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 space-y-3 animate-in fade-in duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-emerald-400" />
                    <span className="text-sm font-black text-emerald-200">
                      ⚡ DÒNG THỜI GIAN CHÍNH XÁC: {currentSegment.correctWord.toUpperCase()}
                    </span>
                  </div>
                  <button
                    onClick={handleNextChapter}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <span>
                      {currentSegmentIndex < segments.length - 1
                        ? "Chương tiếp theo"
                        : "Hoàn thành cốt truyện"}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {currentSegment.choices.find((c) => c.isCorrect)?.nuanceExplanationVi}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Timeline Paradox Modal / Overlay */}
      {activeParadox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="max-w-md w-full rounded-3xl bg-[#0F1420] border border-rose-500/50 p-6 shadow-2xl shadow-rose-950/60 space-y-4">
            <div className="flex items-center gap-2 text-rose-400">
              <AlertOctagon className="w-5 h-5" />
              <span className="text-xs font-black uppercase tracking-wider font-mono">
                TIMELINE PARADOX • {activeParadox.consequenceTitle}
              </span>
            </div>

            <div>
              <p className="text-sm text-slate-200 leading-relaxed font-serif italic">
                "{activeParadox.whatIfFeedbackEn}"
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-black/50 border border-white/5 space-y-1">
              <span className="text-[11px] font-bold text-amber-300 font-mono">
                🇻🇳 Phân tích sắc thái (Why this nuance fails):
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeParadox.nuanceExplanationVi}
              </p>
            </div>

            <button
              onClick={handleRewindTimeline}
              className="w-full py-3 px-4 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-black text-xs transition-all shadow-lg shadow-rose-500/30 cursor-pointer flex items-center justify-center gap-2"
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
