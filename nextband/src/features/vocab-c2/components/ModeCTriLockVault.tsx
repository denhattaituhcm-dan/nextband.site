import React, { useState, useEffect, useRef, useMemo } from "react";
import { TriLockPuzzle, MorphologicalFamily } from "@/data/vocab-c2/types";
import { C2ModeSharedProps } from "./ArenaHeader";
import { Lock, Unlock, Key, ArrowRight, ShieldCheck, Sparkles, BookOpen } from "lucide-react";

export const ModeCTriLockVault: React.FC<C2ModeSharedProps> = ({ unit, onRecordAttempt }) => {
  const [activeSubView, setActiveSubView] = useState<"trilock" | "morphology">("trilock");

  // Sub-View 1: Tri-Lock Vault
  const [triIndex, setTriIndex] = useState(0);
  const [unlockedStages, setUnlockedStages] = useState<[boolean, boolean, boolean]>([false, false, false]);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [isVaultCracked, setIsVaultCracked] = useState(false);
  const triStartTimeRef = useRef<number>(Date.now());

  const triPuzzles: TriLockPuzzle[] = unit.triLockPuzzles || [];
  const currentPuzzle: TriLockPuzzle | undefined = triPuzzles[triIndex];

  // Sub-View 2: Morphological Root Reactor
  const [morphIndex, setMorphIndex] = useState(0);
  const [selectedMorphAnswer, setSelectedMorphAnswer] = useState<string | null>(null);
  const [isMorphSubmitted, setIsMorphSubmitted] = useState(false);
  const morphStartTimeRef = useRef<number>(Date.now());

  const morphFamilies: MorphologicalFamily[] = unit.morphologicalFamilies || [];
  const currentMorph: MorphologicalFamily | undefined = morphFamilies[morphIndex];

  useEffect(() => {
    triStartTimeRef.current = Date.now();
    setUnlockedStages([false, false, false]);
    setSelectedWord(null);
    setIsVaultCracked(false);
  }, [triIndex]);

  useEffect(() => {
    morphStartTimeRef.current = Date.now();
    setSelectedMorphAnswer(null);
    setIsMorphSubmitted(false);
  }, [morphIndex]);

  // 4 Word Options for Tri-Lock
  const triOptions = useMemo(() => {
    if (!currentPuzzle) return [];
    const pool = triPuzzles.filter((p) => p.id !== currentPuzzle.id).map((p) => p.targetWord);
    const shuffled = pool.sort(() => 0.5 - Math.random()).slice(0, 3);
    const combined = [currentPuzzle.targetWord, ...shuffled];
    return combined.sort(() => 0.5 - Math.random());
  }, [currentPuzzle, triPuzzles]);

  // Keyboard navigation (1-4)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (activeSubView === "trilock" && !isVaultCracked && currentPuzzle) {
        if (["1", "2", "3", "4"].includes(e.key)) {
          const idx = parseInt(e.key) - 1;
          if (idx < triOptions.length) {
            handleCrackAttempt(triOptions[idx]);
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSubView, isVaultCracked, currentPuzzle, triOptions]);

  const handleCrackAttempt = (chosenWord: string) => {
    if (isVaultCracked || !currentPuzzle) return;
    const latency = Date.now() - triStartTimeRef.current;
    const isCorrect = chosenWord.toLowerCase() === currentPuzzle.targetWord.toLowerCase();

    setSelectedWord(chosenWord);

    if (isCorrect) {
      setUnlockedStages([true, true, true]);
      setIsVaultCracked(true);
    } else {
      setUnlockedStages([false, false, false]);
    }

    onRecordAttempt({
      itemId: currentPuzzle.id,
      word: currentPuzzle.targetWord,
      mode: "trilock",
      isCorrect,
      latencyMs: latency,
      meaningVi: currentPuzzle.meaningVi,
      imageSchemaTag: currentPuzzle.imageSchemaTag,
    });
  };

  const nextTriPuzzle = () => {
    setTriIndex((prev) => (prev < triPuzzles.length - 1 ? prev + 1 : 0));
  };

  // Morphology choices
  const morphChoices = useMemo(() => {
    if (!currentMorph) return [];
    const target = currentMorph.targetAnswer;
    const allForms: string[] = [];
    if (currentMorph.forms.noun) allForms.push(...currentMorph.forms.noun);
    if (currentMorph.forms.verb) allForms.push(...currentMorph.forms.verb);
    if (currentMorph.forms.adjective) allForms.push(...currentMorph.forms.adjective);
    if (currentMorph.forms.adverb) allForms.push(...currentMorph.forms.adverb);

    const filtered = Array.from(new Set(allForms.filter((w) => w !== target)));
    const distractors = filtered.sort(() => 0.5 - Math.random()).slice(0, 3);
    const combined = [target, ...distractors];
    return combined.sort(() => 0.5 - Math.random());
  }, [currentMorph]);

  const handleSelectMorph = (choice: string) => {
    if (isMorphSubmitted || !currentMorph) return;
    const latency = Date.now() - morphStartTimeRef.current;
    const isCorrect = choice.toLowerCase() === currentMorph.targetAnswer.toLowerCase();

    setSelectedMorphAnswer(choice);
    setIsMorphSubmitted(true);

    onRecordAttempt({
      itemId: currentMorph.id,
      word: currentMorph.targetAnswer,
      mode: "trilock",
      isCorrect,
      latencyMs: latency,
      meaningVi: currentMorph.meaningVi,
      imageSchemaTag: currentMorph.imageSchemaTag,
    });
  };

  const nextMorph = () => {
    setMorphIndex((prev) => (prev < morphFamilies.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Sub-View Switcher Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2">
        <button
          onClick={() => setActiveSubView("trilock")}
          className={`px-4 py-2 rounded-xl text-xs font-black tracking-wide uppercase transition-all cursor-pointer flex items-center gap-2 ${
            activeSubView === "trilock"
              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-xs shadow-cyan-500/20"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Key className="w-4 h-4 text-cyan-400" />
          <span>Sub-View 1: The Tri-Lock Vault [Three of a Kind]</span>
        </button>
        <button
          onClick={() => setActiveSubView("morphology")}
          className={`px-4 py-2 rounded-xl text-xs font-black tracking-wide uppercase transition-all cursor-pointer flex items-center gap-2 ${
            activeSubView === "morphology"
              ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-xs shadow-amber-500/20"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <BookOpen className="w-4 h-4 text-amber-400" />
          <span>Sub-View 2: Morphological Root Reactor</span>
        </button>
      </div>

      {activeSubView === "trilock" ? (
        currentPuzzle ? (
          <div className="rounded-3xl p-6 sm:p-8 bg-[#0D1322] border border-cyan-500/30 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                  TRI-LOCK CIPHER {triIndex + 1} / {triPuzzles.length}
                </span>
                <p className="text-xs text-slate-400 mt-0.5">
                  1 Từ C2 duy nhất mở khóa đồng thời cả 3 buồng ngữ cảnh!
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3].map((num, i) => (
                  <div
                    key={num}
                    className={`p-2 rounded-xl border flex items-center gap-1 font-mono text-xs font-black transition-all ${
                      unlockedStages[i]
                        ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-xs shadow-cyan-400/30"
                        : "bg-white/5 border-white/10 text-slate-500"
                    }`}
                  >
                    {unlockedStages[i] ? (
                      <Unlock className="w-3.5 h-3.5" />
                    ) : (
                      <Lock className="w-3.5 h-3.5" />
                    )}
                    <span>TUMBLER {num}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3 Encrypted Sentence Chambers */}
            <div className="space-y-3.5">
              {currentPuzzle.sentences.map((sent, idx) => {
                const parts = sent.split("___");
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border transition-all ${
                      isVaultCracked
                        ? "bg-cyan-500/10 border-cyan-500/40 text-white"
                        : "bg-black/30 border-white/10 text-slate-300"
                    }`}
                  >
                    <div className="flex items-baseline gap-2.5">
                      <span className="text-xs font-mono font-black text-cyan-400 shrink-0">
                        CHAMBER {idx + 1}:
                      </span>
                      <p className="text-sm font-serif leading-relaxed">
                        {parts[0]}
                        <span
                          className={`font-mono font-black px-2 py-0.5 rounded-lg border mx-1 ${
                            isVaultCracked
                              ? "bg-cyan-400 text-slate-950 border-cyan-300 shadow-xs shadow-cyan-400/50"
                              : "bg-white/10 text-cyan-300 border-cyan-500/30"
                          }`}
                        >
                          {isVaultCracked ? currentPuzzle.targetWord : "____"}
                        </span>
                        {parts[1]}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Root / Semantic Clue */}
            <div className="flex items-center justify-between text-xs text-slate-400 bg-white/5 p-3 rounded-xl border border-white/5 font-mono">
              <span>💡 Root Clue: {currentPuzzle.rootHint}</span>
              <span>IPA: {currentPuzzle.ipa}</span>
            </div>

            {/* 4 Precision Stem Key Options */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {triOptions.map((opt, idx) => {
                const isTarget = opt.toLowerCase() === currentPuzzle.targetWord.toLowerCase();
                let style = "bg-white/5 border-white/10 text-white hover:bg-white/15";

                if (selectedWord) {
                  if (isTarget) {
                    style = "bg-cyan-500/30 border-cyan-400 text-cyan-200 font-black shadow-lg shadow-cyan-500/30";
                  } else if (selectedWord === opt) {
                    style = "bg-rose-500/20 border-rose-400 text-rose-300 font-bold";
                  } else {
                    style = "opacity-40 bg-white/5 border-transparent text-slate-500";
                  }
                }

                return (
                  <button
                    key={opt + idx}
                    onClick={() => handleCrackAttempt(opt)}
                    disabled={isVaultCracked}
                    className={`p-3.5 rounded-2xl border text-sm font-bold transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${style}`}
                  >
                    <span className="text-[10px] opacity-60 font-mono">[{idx + 1}]</span>
                    <span className="truncate w-full text-center">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Vault Cracked Celebration & Nuances */}
            {isVaultCracked && (
              <div className="p-5 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 space-y-3 animate-in fade-in duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-cyan-300" />
                    <span className="text-sm font-black text-cyan-200">
                      ⚡ VAULT CRACKED! Từ chuẩn: {currentPuzzle.targetWord.toUpperCase()}
                    </span>
                  </div>
                  <button
                    onClick={nextTriPuzzle}
                    className="px-4 py-1.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Mở khóa ổ tiếp theo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-xs text-slate-300 font-mono">
                  {currentPuzzle.nuanceNotes.map((note, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                      <strong className="text-cyan-400">Lock {idx + 1}:</strong> {note}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-slate-400 text-center">Không có puzzle Tri-Lock.</p>
        )
      ) : (
        /* Morphological Root Reactor */
        currentMorph ? (
          <div className="rounded-3xl p-6 sm:p-8 bg-[#0D1322] border border-amber-500/30 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
                  MORPHOLOGICAL REACTOR {morphIndex + 1} / {morphFamilies.length}
                </span>
                <p className="text-xs text-slate-400 mt-0.5">
                  Biến đổi gốc từ sang đúng hình thái cú pháp ngữ cảnh yêu cầu
                </p>
              </div>
              <span className="text-xs font-mono text-amber-300 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30">
                ROOT: {currentMorph.rootWord.toUpperCase()}
              </span>
            </div>

            {/* Cloze Prompt Sentence */}
            <div className="p-5 rounded-2xl bg-black/40 border border-white/10">
              <p className="text-base font-serif text-white leading-relaxed">
                {currentMorph.transformationPrompt}
              </p>
            </div>

            {/* Derivative Options */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {morphChoices.map((choice, idx) => {
                const isTarget = choice.toLowerCase() === currentMorph.targetAnswer.toLowerCase();
                let style = "bg-white/5 border-white/10 text-white hover:bg-white/15";

                if (isMorphSubmitted) {
                  if (isTarget) {
                    style = "bg-emerald-500/20 border-emerald-400 text-emerald-300 font-black shadow-lg shadow-emerald-500/20";
                  } else if (selectedMorphAnswer === choice) {
                    style = "bg-rose-500/20 border-rose-400 text-rose-300 font-bold";
                  } else {
                    style = "opacity-40 bg-white/5 border-transparent text-slate-500";
                  }
                }

                return (
                  <button
                    key={choice + idx}
                    onClick={() => handleSelectMorph(choice)}
                    disabled={isMorphSubmitted}
                    className={`p-3.5 rounded-2xl border text-sm font-bold transition-all cursor-pointer flex items-center justify-center ${style}`}
                  >
                    <span>{choice}</span>
                  </button>
                );
              })}
            </div>

            {isMorphSubmitted && (
              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 flex items-center justify-between animate-in fade-in duration-200">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-amber-300">
                    Target POS: <span className="underline">{currentMorph.targetPos}</span> | Đáp án:{" "}
                    <strong className="text-white">{currentMorph.targetAnswer}</strong>
                  </p>
                  <p className="text-xs text-slate-300">{currentMorph.explanationVi}</p>
                </div>
                <button
                  onClick={nextMorph}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <span>Tiếp tục</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="text-slate-400 text-center">Không có dữ liệu Morphological Families.</p>
        )
      )}
    </div>
  );
};
