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
                  {item.visualCueType === "physique-plump-corpulent-obese" && (
                    <svg viewBox="0 0 360 110" className="w-full max-h-32">
                      {/* Background grid guide */}
                      <line x1="120" y1="10" x2="120" y2="100" stroke="#334155" strokeDasharray="3 3" />
                      <line x1="240" y1="10" x2="240" y2="100" stroke="#334155" strokeDasharray="3 3" />

                      {/* Figure 1: PLUMP (Pleasantly rounded / rosy cheek) */}
                      <circle cx="60" cy="32" r="13" fill="#fed7aa" />
                      <ellipse cx="60" cy="70" rx="19" ry="24" fill="#38bdf8" />
                      <circle cx="54" cy="34" r="2.5" fill="#f43f5e" opacity="0.75" />
                      <circle cx="66" cy="34" r="2.5" fill="#f43f5e" opacity="0.75" />
                      <text x="60" y="104" textAnchor="middle" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="bold">
                        PLUMP
                      </text>

                      {/* Figure 2: CORPULENT (Bulky / formal gentlemanly belly) */}
                      <circle cx="180" cy="30" r="14" fill="#fed7aa" />
                      <ellipse cx="180" cy="68" rx="28" ry="26" fill="#a855f7" />
                      {/* Vest / tie detail */}
                      <polygon points="180,48 174,62 186,62" fill="#facc15" />
                      <text x="180" y="104" textAnchor="middle" fill="#c084fc" fontSize="11" fontFamily="monospace" fontWeight="bold">
                        CORPULENT
                      </text>

                      {/* Figure 3: OBESE (Clinical severe excess / medical scale marker) */}
                      <circle cx="300" cy="28" r="14" fill="#fed7aa" />
                      <ellipse cx="300" cy="68" rx="36" ry="28" fill="#f43f5e" />
                      <text x="300" y="65" textAnchor="middle" fill="#ffffff" fontSize="10" fontFamily="sans-serif" fontWeight="900">
                        BMI 35+
                      </text>
                      <text x="300" y="104" textAnchor="middle" fill="#fb7185" fontSize="11" fontFamily="monospace" fontWeight="bold">
                        OBESE
                      </text>
                    </svg>
                  )}
                  {item.visualCueType === "physique-lanky-spindly-gaunt" && (
                    <svg viewBox="0 0 360 110" className="w-full max-h-32">
                      <line x1="120" y1="10" x2="120" y2="100" stroke="#334155" strokeDasharray="3 3" />
                      <line x1="240" y1="10" x2="240" y2="100" stroke="#334155" strokeDasharray="3 3" />

                      {/* Figure 1: LANKY (Tall, long limbs, awkward movement) */}
                      <circle cx="60" cy="20" r="9" fill="#fde68a" />
                      <line x1="60" y1="29" x2="60" y2="60" stroke="#38bdf8" strokeWidth="4" />
                      <line x1="60" y1="60" x2="48" y2="92" stroke="#38bdf8" strokeWidth="3" />
                      <line x1="60" y1="60" x2="74" y2="92" stroke="#38bdf8" strokeWidth="3" />
                      <line x1="60" y1="38" x2="40" y2="52" stroke="#38bdf8" strokeWidth="3" />
                      <line x1="60" y1="38" x2="80" y2="44" stroke="#38bdf8" strokeWidth="3" />
                      <text x="60" y="105" textAnchor="middle" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="bold">
                        LANKY (Lêu nghêu)
                      </text>

                      {/* Figure 2: SPINDLY (Stick-thin / fragile like twigs) */}
                      <circle cx="180" cy="24" r="8" fill="#fde68a" />
                      <line x1="180" y1="32" x2="180" y2="65" stroke="#94a3b8" strokeWidth="2" />
                      <line x1="180" y1="65" x2="172" y2="92" stroke="#94a3b8" strokeWidth="1.5" />
                      <line x1="180" y1="65" x2="188" y2="92" stroke="#94a3b8" strokeWidth="1.5" />
                      <line x1="180" y1="42" x2="166" y2="56" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 1" />
                      <line x1="180" y1="42" x2="194" y2="56" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 1" />
                      <text x="180" y="105" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="monospace" fontWeight="bold">
                        SPINDLY (Khẳng khiu)
                      </text>

                      {/* Figure 3: GAUNT (Hollow cheeks / exhausted from suffering) */}
                      {/* Hollow head silhouette */}
                      <polygon points="300,18 312,28 308,44 292,44 288,28" fill="#fde68a" />
                      <circle cx="295" cy="30" r="2.5" fill="#0f172a" />
                      <circle cx="305" cy="30" r="2.5" fill="#0f172a" />
                      <ellipse cx="300" cy="38" rx="2" ry="3.5" fill="#0f172a" />
                      {/* Hollow cheek shading */}
                      <line x1="293" y1="34" x2="295" y2="40" stroke="#f59e0b" strokeWidth="1.5" />
                      <line x1="307" y1="34" x2="305" y2="40" stroke="#f59e0b" strokeWidth="1.5" />
                      <line x1="300" y1="44" x2="300" y2="70" stroke="#fbbf24" strokeWidth="3" />
                      <line x1="300" y1="70" x2="294" y2="92" stroke="#fbbf24" strokeWidth="2" />
                      <line x1="300" y1="70" x2="306" y2="92" stroke="#fbbf24" strokeWidth="2" />
                      <text x="300" y="105" textAnchor="middle" fill="#fbbf24" fontSize="11" fontFamily="monospace" fontWeight="bold">
                        GAUNT (Hốc hác)
                      </text>
                    </svg>
                  )}
                  {item.visualCueType === "physique-muscular-stout-burly" && (
                    <svg viewBox="0 0 360 110" className="w-full max-h-32">
                      <line x1="120" y1="10" x2="120" y2="100" stroke="#334155" strokeDasharray="3 3" />
                      <line x1="240" y1="10" x2="240" y2="100" stroke="#334155" strokeDasharray="3 3" />

                      {/* Figure 1: MUSCULAR (V-taper athletic cut / defined delts) */}
                      <circle cx="60" cy="24" r="10" fill="#fed7aa" />
                      <polygon points="40,36 80,36 68,68 52,68" fill="#10b981" />
                      <circle cx="40" cy="38" r="6" fill="#059669" />
                      <circle cx="80" cy="38" r="6" fill="#059669" />
                      <rect x="52" y="68" width="6.5" height="24" fill="#334155" />
                      <rect x="61.5" y="68" width="6.5" height="24" fill="#334155" />
                      <text x="60" y="104" textAnchor="middle" fill="#34d399" fontSize="11" fontFamily="monospace" fontWeight="bold">
                        MUSCULAR (Cơ bắp)
                      </text>

                      {/* Figure 2: STOUT (Solid, square/thickset, low center of gravity) */}
                      <circle cx="180" cy="28" r="11" fill="#fed7aa" />
                      <rect x="160" y="42" width="40" height="34" rx="4" fill="#64748b" />
                      <rect x="162" y="76" width="15" height="16" fill="#334155" />
                      <rect x="183" y="76" width="15" height="16" fill="#334155" />
                      <text x="180" y="104" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="monospace" fontWeight="bold">
                        STOUT (Đậm chắc)
                      </text>

                      {/* Figure 3: BURLY (Broad shoulders, heavy bulky frame) */}
                      <circle cx="300" cy="22" r="11" fill="#fed7aa" />
                      {/* Massive traps & chest */}
                      <polygon points="274,34 326,34 318,72 282,72" fill="#ea580c" />
                      <circle cx="272" cy="38" r="8" fill="#c2410c" />
                      <circle cx="328" cy="38" r="8" fill="#c2410c" />
                      <rect x="282" y="72" width="14" height="20" fill="#334155" />
                      <rect x="304" y="72" width="14" height="20" fill="#334155" />
                      <text x="300" y="104" textAnchor="middle" fill="#fb923c" fontSize="11" fontFamily="monospace" fontWeight="bold">
                        BURLY (Đô vạm vỡ)
                      </text>
                    </svg>
                  )}
                  {item.visualCueType === "physique-frail-decrepit-senile" && (
                    <svg viewBox="0 0 360 110" className="w-full max-h-32">
                      <line x1="120" y1="10" x2="120" y2="100" stroke="#334155" strokeDasharray="3 3" />
                      <line x1="240" y1="10" x2="240" y2="100" stroke="#334155" strokeDasharray="3 3" />

                      {/* Figure 1: FRAIL (Delicate, fragile physical structure) */}
                      <circle cx="60" cy="30" r="8" fill="#fde68a" />
                      <path d="M60,38 Q66,54 58,72" stroke="#60a5fa" strokeWidth="2.5" fill="none" />
                      <line x1="58" y1="72" x2="52" y2="92" stroke="#60a5fa" strokeWidth="2" />
                      <line x1="58" y1="72" x2="64" y2="92" stroke="#60a5fa" strokeWidth="2" />
                      {/* Walking stick support */}
                      <line x1="68" y1="56" x2="72" y2="92" stroke="#f59e0b" strokeWidth="2" />
                      <text x="60" y="105" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="monospace" fontWeight="bold">
                        FRAIL (Yếu mỏng)
                      </text>

                      {/* Figure 2: DECREPIT (Stooped posture, severe physical wear of age) */}
                      <circle cx="170" cy="38" r="8.5" fill="#fde68a" />
                      <path d="M170,46 Q184,55 186,74" stroke="#a78bfa" strokeWidth="3" fill="none" />
                      <line x1="186" y1="74" x2="178" y2="92" stroke="#a78bfa" strokeWidth="2.5" />
                      <line x1="186" y1="74" x2="192" y2="92" stroke="#a78bfa" strokeWidth="2.5" />
                      <line x1="162" y1="62" x2="158" y2="92" stroke="#d8b4fe" strokeWidth="2.5" />
                      <text x="180" y="105" textAnchor="middle" fill="#c4b5fd" fontSize="11" fontFamily="monospace" fontWeight="bold">
                        DECREPIT (Già cỗi)
                      </text>

                      {/* Figure 3: SENILE (Mind fade / memory lapses / thought cloud) */}
                      <circle cx="295" cy="40" r="9" fill="#fde68a" />
                      <path d="M295,49 L295,74 L288,92" stroke="#ec4899" strokeWidth="2.5" fill="none" />
                      <line x1="295" y1="74" x2="302" y2="92" stroke="#ec4899" strokeWidth="2" />
                      {/* Faded thought bubble with question mark */}
                      <ellipse cx="320" cy="22" rx="15" ry="11" fill="#475569" stroke="#94a3b8" strokeDasharray="2 2" />
                      <text x="320" y="26" textAnchor="middle" fill="#fde047" fontSize="12" fontWeight="bold">
                        ?
                      </text>
                      <circle cx="308" cy="32" r="2" fill="#94a3b8" />
                      <text x="300" y="105" textAnchor="middle" fill="#f472b6" fontSize="11" fontFamily="monospace" fontWeight="bold">
                        SENILE (Lú lẫn)
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
