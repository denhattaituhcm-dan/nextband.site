import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Compass,
  GitCompareArrows,
  MessageSquareQuote,
  Eye,
  HelpCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { WordInAction } from "@/data/vocabC1Unit1";

interface SemanticNuanceCardProps {
  item: WordInAction;
  unitWords: WordInAction[];
  isWordPronouncing: boolean;
  onPronounce: (word: string) => void;
  onSelfAssess: (status: "review" | "mastered") => void;
}

export const SemanticNuanceCard: React.FC<SemanticNuanceCardProps> = ({
  item,
  unitWords,
  isWordPronouncing,
  onPronounce,
  onSelfAssess,
}) => {
  const [selectedRecallOption, setSelectedRecallOption] = useState<string | null>(null);
  const [showVisualCue, setShowVisualCue] = useState<boolean>(false);

  // Reset local interactive state when word changes
  useEffect(() => {
    setSelectedRecallOption(null);
    setShowVisualCue(false);
  }, [item.id]);

  // Fallback contrast words if not explicitly defined on the item (for Units 2-12)
  const effectiveContrastWords =
    item.contrastWords && item.contrastWords.length > 0
      ? item.contrastWords
      : unitWords
          .filter((w) => w.id !== item.id)
          .slice(0, 2)
          .map((w) => ({
            word: w.word,
            distinction: `${w.nuance.replace(/^\[|\]$/g, "")} — ${w.viDef}`,
          }));

  const recallQuiz = item.contrastiveRecall;
  const isRecallAnswered = selectedRecallOption !== null;
  const isRecallCorrect =
    recallQuiz &&
    selectedRecallOption?.toLowerCase() === recallQuiz.correctWord.toLowerCase();

  return (
    <div className="space-y-3 text-left pr-1">
      {/* 1. Header: Word, IPA & Primary Nuance Pill */}
      <div className="flex flex-wrap items-baseline justify-between gap-2 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-baseline gap-2.5 flex-wrap">
            <h2
              onClick={() => onPronounce(item.word)}
              className="text-2xl sm:text-3xl font-black tracking-tight font-mono uppercase cursor-pointer transition-all hover:scale-105 active:scale-95 select-none"
              title="Bấm vào để nghe lại phát âm"
            >
              {isWordPronouncing ? (
                <span
                  className="inline-flex whitespace-nowrap"
                  style={{ "--total-chars": item.word.length } as React.CSSProperties}
                >
                  {Array.from(item.word).map((char, cIdx) => (
                    <span
                      key={cIdx}
                      className="academic-char-living"
                      style={{ "--char-index": cIdx } as React.CSSProperties}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              ) : (
                <span className="text-slate-900 hover:text-indigo-600 transition-colors">
                  {item.word}
                </span>
              )}
            </h2>
            <span className="font-mono text-slate-500 text-sm">{item.ipa}</span>
          </div>
          <p className="text-emerald-700 font-bold text-sm sm:text-base mt-1 leading-snug">
            {item.viDef}
          </p>
        </div>

        <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 border border-amber-300 shrink-0">
          {item.nuance}
        </span>
      </div>

      {/* 2. Core Nuance & Micro-Scene Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Core Nuance */}
        <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-mono font-black uppercase tracking-wider text-amber-900">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Core Nuance — Sắc thái cốt lõi</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
            {item.coreNuanceVi || item.enDef}
          </p>
        </div>

        {/* Micro-Scene */}
        <div className="p-3 rounded-xl bg-indigo-50/50 border border-indigo-200/70 space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-mono font-black uppercase tracking-wider text-indigo-900">
            <Compass className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <span>Micro-scene — Tình huống điển hình</span>
          </div>
          {item.microSceneEn ? (
            <div className="space-y-1 text-xs leading-relaxed">
              <p className="text-slate-900 font-medium">{item.microSceneEn}</p>
              {item.microSceneVi && (
                <p className="text-slate-600 italic">{item.microSceneVi}</p>
              )}
            </div>
          ) : (
            <div className="space-y-1 text-xs leading-relaxed">
              <p className="text-slate-800">
                {item.example.split("**").map((chunk, i) =>
                  i % 2 === 1 ? (
                    <span
                      key={i}
                      className="text-indigo-800 font-bold underline decoration-indigo-400"
                    >
                      {chunk}
                    </span>
                  ) : (
                    chunk
                  )
                )}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 3. Contrastive Matrix (Phân biệt từ gần nghĩa) */}
      {effectiveContrastWords.length > 0 && (
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[11px] font-mono font-black uppercase tracking-wider text-slate-700">
              <GitCompareArrows className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span>Contrast — Phân biệt từ gần nghĩa</span>
            </div>
            {item.collocations && item.collocations.length > 0 && (
              <div className="hidden sm:flex items-center gap-1 flex-wrap">
                {item.collocations.slice(0, 3).map((col, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700 font-medium"
                  >
                    {col}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-1.5 text-xs">
            {effectiveContrastWords.map((cw, idx) => {
              const isCurrentWord = cw.word.toLowerCase() === item.word.toLowerCase();
              return (
                <div
                  key={idx}
                  className={`flex items-baseline gap-2 px-2.5 py-1.5 rounded-lg border ${
                    isCurrentWord
                      ? "bg-indigo-50/90 border-indigo-300 text-indigo-950 font-semibold"
                      : "bg-white border-slate-200/80 text-slate-700"
                  }`}
                >
                  <code
                    className={`font-mono font-bold px-1.5 py-0.5 rounded text-xs shrink-0 ${
                      isCurrentWord
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 text-slate-800"
                    }`}
                  >
                    {cw.word}
                  </code>
                  <span className="text-slate-400 shrink-0">→</span>
                  <span className="leading-snug">{cw.distinction}</span>
                </div>
              );
            })}
          </div>

          {/* Usage Connotation & Example Sentence */}
          <div className="pt-1.5 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600">
            {item.usageConnotationVi && (
              <p className="flex items-start gap-1.5">
                <MessageSquareQuote className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-800">Usage:</strong> {item.usageConnotationVi}
                </span>
              </p>
            )}
          </div>
        </div>
      )}

      {/* 4. Optional Visual Cue (Only rendered when pedagogical visual cue is provided) */}
      {(item.visualCueUrl || item.visualCueType) && (
        <div className="p-3 rounded-xl bg-gradient-to-r from-amber-50/90 via-orange-50/60 to-amber-50/90 border-2 border-amber-300 shadow-xs space-y-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-[11px] font-mono font-black uppercase tracking-wider text-amber-900">
              <Eye className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Step 3 • Visual Cue — Gợi ý trực quan phân biệt sắc thái</span>
            </div>
            <button
              type="button"
              onClick={() => setShowVisualCue((prev) => !prev)}
              className="text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-white shadow-2xs transition-all cursor-pointer shrink-0"
            >
              {showVisualCue ? "Ẩn minh họa" : "Mở minh họa trực quan"}
            </button>
          </div>

          {showVisualCue && (
            <div className="pt-1 space-y-2">
              {item.visualCueUrl ? (
                <img
                  src={item.visualCueUrl}
                  alt={item.word}
                  className="w-full max-h-44 object-cover rounded-lg border border-amber-200 bg-white"
                />
              ) : (
                <div className="w-full rounded-lg border border-amber-200 bg-slate-900 p-3 flex items-center justify-center overflow-hidden">
                  {item.visualCueType === "shield-shelter" && (
                    <svg viewBox="0 0 360 110" className="w-full max-h-32">
                      {/* Rain lines */}
                      <g stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.55">
                        <line x1="40" y1="5" x2="25" y2="95" />
                        <line x1="75" y1="5" x2="60" y2="95" />
                        <line x1="110" y1="5" x2="95" y2="95" />
                        <line x1="145" y1="5" x2="130" y2="95" />
                        <line x1="310" y1="5" x2="295" y2="95" />
                      </g>
                      {/* Shelter canopy */}
                      <path d="M175 20 L285 20 L295 36 L165 36 Z" fill="#f59e0b" />
                      <rect x="275" y="36" width="6" height="64" fill="#94a3b8" />
                      {/* Chivalrous figure stepping into rain holding umbrella/coat toward shelter */}
                      <circle cx="135" cy="48" r="9" fill="#38bdf8" />
                      <path d="M123 60 Q135 56 147 60 L152 98 L118 98 Z" fill="#0284c7" />
                      {/* Shield/Umbrella arc protecting the other person */}
                      <path d="M160 28 Q215 12 255 34" stroke="#fbbf24" strokeWidth="4" fill="none" />
                      {/* Protected elderly passenger under dry shelter */}
                      <circle cx="225" cy="52" r="8.5" fill="#fde68a" />
                      <path d="M213 63 Q225 60 237 63 L240 98 L210 98 Z" fill="#10b981" />
                      <text x="18" y="22" fill="#bae6fd" fontSize="10" fontFamily="monospace" fontWeight="bold">
                        CHIVALROUS: Nhường chỗ che chở người yếu thế
                      </text>
                    </svg>
                  )}
                  {item.visualCueType === "cliff-helicopter" && (
                    <svg viewBox="0 0 360 110" className="w-full max-h-32">
                      {/* Jagged cliff on right */}
                      <polygon points="245,5 360,5 360,105 220,105 250,70 230,45" fill="#475569" />
                      {/* Helicopter hovering inches from cliff */}
                      <rect x="75" y="20" width="95" height="3.5" fill="#fbbf24" />
                      <rect x="120" y="23" width="5" height="8" fill="#94a3b8" />
                      <ellipse cx="125" cy="42" rx="34" ry="14" fill="#f97316" />
                      <path d="M60 42 L92 42" stroke="#f97316" strokeWidth="5" />
                      {/* Rescue cable & climber near cliff edge */}
                      <line x1="145" y1="55" x2="215" y2="82" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 2" />
                      <circle cx="218" cy="84" r="6" fill="#38bdf8" />
                      <text x="16" y="96" fill="#fed7aa" fontSize="10" fontFamily="monospace" fontWeight="bold">
                        DARING: Pha cứu hộ sát vách đá rủi ro cực cao
                      </text>
                    </svg>
                  )}
                  {item.visualCueType === "arctic-summit" && (
                    <svg viewBox="0 0 360 110" className="w-full max-h-32">
                      {/* Jagged volcano/arctic peaks */}
                      <polygon points="20,105 95,25 170,105" fill="#334155" />
                      <polygon points="130,105 235,14 335,105" fill="#475569" />
                      <polygon points="212,38 235,14 258,38 245,42 225,36" fill="#f97316" />
                      {/* Intrepid explorer marching forward with flag/gear */}
                      <path d="M55 95 Q135 80 210 42" stroke="#fbbf24" strokeWidth="2.5" strokeDasharray="4 3" fill="none" />
                      <circle cx="205" cy="42" r="6.5" fill="#38bdf8" />
                      <line x1="214" y1="30" x2="214" y2="52" stroke="#f8fafc" strokeWidth="2" />
                      <polygon points="214,30 232,35 214,40" fill="#10b981" />
                      <text x="16" y="20" fill="#a7f3d0" fontSize="10" fontFamily="monospace" fontWeight="bold">
                        INTREPID: Bền bỉ dấn thân vào vùng hiểm địa
                      </text>
                    </svg>
                  )}
                  {item.visualCueType === "monolith-challenge" && (
                    <svg viewBox="0 0 360 110" className="w-full max-h-32">
                      {/* Giant institutional monolith */}
                      <rect x="215" y="10" width="110" height="92" rx="4" fill="#334155" stroke="#64748b" strokeWidth="2" />
                      <text x="232" y="55" fill="#94a3b8" fontSize="11" fontFamily="monospace" fontWeight="bold">
                        ORTHODOXY
                      </text>
                      {/* Small individual projecting a bold shockwave/beam challenging the monolith */}
                      <circle cx="72" cy="64" r="8" fill="#fbbf24" />
                      <path d="M62 74 L82 74 L86 102 L58 102 Z" fill="#f59e0b" />
                      <path d="M88 64 L210 36 L210 88 Z" fill="#f59e0b" opacity="0.28" />
                      <line x1="88" y1="64" x2="212" y2="58" stroke="#fbbf24" strokeWidth="3" />
                      <text x="16" y="22" fill="#fde68a" fontSize="10" fontFamily="monospace" fontWeight="bold">
                        AUDACIOUS: Thách thức táo bạo vượt chuẩn mực
                      </text>
                    </svg>
                  )}
                </div>
              )}
              {item.visualCueCaptionVi && (
                <p className="text-xs text-amber-950 font-medium leading-snug">
                  {item.visualCueCaptionVi}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* 5. Step 4: Contrastive Recall Mini-Check */}
      {recallQuiz && (
        <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-200/80 space-y-2">
          <div className="flex items-center gap-1.5 text-[11px] font-mono font-black uppercase tracking-wider text-emerald-900">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Contrastive Recall — Kiểm tra chọn từ theo ngữ cảnh</span>
          </div>

          <p className="text-xs sm:text-sm font-medium text-slate-900 leading-snug">
            "{recallQuiz.scenarioEn}"
          </p>
          <p className="text-[11px] text-slate-500 italic">{recallQuiz.scenarioVi}</p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {recallQuiz.options.map((opt) => {
              const isSelected = selectedRecallOption === opt;
              const isRightOpt =
                opt.toLowerCase() === recallQuiz.correctWord.toLowerCase();

              let btnStyle =
                "bg-white hover:bg-slate-100 text-slate-800 border-slate-300";
              if (isRecallAnswered) {
                if (isRightOpt) {
                  btnStyle =
                    "bg-emerald-600 text-white border-emerald-700 font-bold shadow-2xs";
                } else if (isSelected && !isRightOpt) {
                  btnStyle = "bg-rose-100 text-rose-800 border-rose-300 line-through";
                } else {
                  btnStyle = "bg-slate-100 text-slate-400 border-slate-200 opacity-70";
                }
              }

              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setSelectedRecallOption(opt)}
                  className={`px-3 py-1 rounded-lg border font-mono text-xs transition-all cursor-pointer ${btnStyle}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {isRecallAnswered && (
            <div
              className={`p-2.5 rounded-lg text-xs flex items-start gap-2 border ${
                isRecallCorrect
                  ? "bg-emerald-100/70 border-emerald-300 text-emerald-950"
                  : "bg-amber-100/80 border-amber-300 text-amber-950"
              }`}
            >
              {isRecallCorrect ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              )}
              <span className="leading-relaxed">{recallQuiz.explanationVi}</span>
            </div>
          )}
        </div>
      )}

      {/* 6. Active Recall Self-Assessment Buttons */}
      <div className="p-3 bg-indigo-50/70 rounded-xl border border-indigo-100 flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-bold text-indigo-950">
          Đánh giá khả năng nắm vững sắc thái:
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onSelfAssess("review")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-all cursor-pointer"
          >
            <span>✗ Cần ôn lại</span>
            <kbd className="font-mono text-2xs bg-white px-1.5 py-0.5 rounded border border-rose-300">
              [1]
            </kbd>
          </button>
          <button
            type="button"
            onClick={() => onSelfAssess("mastered")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <span>✓ Đã phân biệt rõ</span>
            <kbd className="font-mono text-2xs bg-emerald-800 text-white px-1.5 py-0.5 rounded">
              [2]
            </kbd>
          </button>
        </div>
      </div>
    </div>
  );
};
