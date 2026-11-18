import React, { useState } from "react";
import { Volume2, Sparkles, Lightbulb, MessageCircle, ArrowRight } from "lucide-react";
import { MangaComicDialogue, MangaCharacter } from "@/data/idioms/unit02_manga";

interface MangaComicDialogueBoxProps {
  dialogue?: MangaComicDialogue;
  targetIdiom?: string;
  className?: string;
}

// 100% Vector SVG Avatars for Doraemon Characters
const MangaAvatar: React.FC<{
  character: MangaCharacter["avatar"];
  emotion?: MangaCharacter["emotion"];
  size?: number;
}> = ({ character, emotion = "neutral", size = 56 }) => {
  return (
    <div
      className="relative shrink-0 rounded-2xl bg-white border-2 border-slate-900 shadow-sm flex items-center justify-center overflow-hidden"
      style={{ width: size, height: size }}
    >
      {character === "doraemon" && (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Blue Head */}
          <circle cx="50" cy="46" r="42" fill="#1E88E5" stroke="#1A202C" strokeWidth="3" />
          {/* White Face Inner */}
          <ellipse cx="50" cy="52" rx="34" ry="28" fill="#FFFFFF" stroke="#1A202C" strokeWidth="2.5" />
          {/* Collar Red */}
          <rect x="22" y="84" width="56" height="8" rx="4" fill="#D32F2F" stroke="#1A202C" strokeWidth="2" />
          {/* Golden Bell */}
          <circle cx="50" cy="88" r="6" fill="#FDD835" stroke="#1A202C" strokeWidth="1.5" />
          <line x1="44" y1="88" x2="56" y2="88" stroke="#1A202C" strokeWidth="1.5" />
          {/* Red Nose */}
          <circle cx="50" cy="38" r="7.5" fill="#E53935" stroke="#1A202C" strokeWidth="2" />
          <circle cx="48" cy="36" r="2" fill="#FFFFFF" />
          {/* Nose to mouth vertical line */}
          <line x1="50" y1="45.5" x2="50" y2="60" stroke="#1A202C" strokeWidth="2" />
          {/* Whiskers */}
          <line x1="22" y1="45" x2="38" y2="47" stroke="#1A202C" strokeWidth="2" />
          <line x1="20" y1="52" x2="38" y2="52" stroke="#1A202C" strokeWidth="2" />
          <line x1="22" y1="59" x2="38" y2="57" stroke="#1A202C" strokeWidth="2" />
          <line x1="78" y1="45" x2="62" y2="47" stroke="#1A202C" strokeWidth="2" />
          <line x1="80" y1="52" x2="62" y2="52" stroke="#1A202C" strokeWidth="2" />
          <line x1="78" y1="59" x2="62" y2="57" stroke="#1A202C" strokeWidth="2" />

          {/* Eyes depending on emotion */}
          {emotion === "happy" || emotion === "smug" ? (
            <>
              {/* Happy curved eyes */}
              <path d="M 36 28 Q 42 22 47 28" fill="none" stroke="#1A202C" strokeWidth="3" strokeLinecap="round" />
              <path d="M 53 28 Q 58 22 64 28" fill="none" stroke="#1A202C" strokeWidth="3" strokeLinecap="round" />
              {/* Smiling mouth */}
              <path d="M 34 60 Q 50 76 66 60" fill="#E53935" stroke="#1A202C" strokeWidth="2" />
            </>
          ) : emotion === "crying" ? (
            <>
              <circle cx="41" cy="28" r="7" fill="#FFFFFF" stroke="#1A202C" strokeWidth="2" />
              <circle cx="59" cy="28" r="7" fill="#FFFFFF" stroke="#1A202C" strokeWidth="2" />
              {/* Tears flowing */}
              <path d="M 38 34 Q 35 48 37 60" fill="none" stroke="#29B6F6" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M 62 34 Q 65 48 63 60" fill="none" stroke="#29B6F6" strokeWidth="3.5" strokeLinecap="round" />
              {/* Wavy mouth */}
              <path d="M 38 64 Q 45 60 50 64 T 62 64" fill="none" stroke="#1A202C" strokeWidth="2.5" />
            </>
          ) : emotion === "sweat" ? (
            <>
              {/* Swirly/nervous eyes */}
              <circle cx="41" cy="28" r="7" fill="#FFFFFF" stroke="#1A202C" strokeWidth="2" />
              <circle cx="59" cy="28" r="7" fill="#FFFFFF" stroke="#1A202C" strokeWidth="2" />
              <circle cx="42" cy="28" r="2.5" fill="#1A202C" />
              <circle cx="58" cy="28" r="2.5" fill="#1A202C" />
              <path d="M 38 63 Q 50 58 62 63" fill="none" stroke="#1A202C" strokeWidth="2" />
              {/* Sweat drop on temple */}
              <path d="M 76 18 C 76 18 84 26 84 31 C 84 35 80 38 76 38 C 72 38 68 35 68 31 C 68 26 76 18 76 18 Z" fill="#29B6F6" stroke="#0288D1" strokeWidth="1" />
            </>
          ) : (
            <>
              {/* Normal eyes */}
              <ellipse cx="41" cy="28" rx="7" ry="9" fill="#FFFFFF" stroke="#1A202C" strokeWidth="2" />
              <ellipse cx="59" cy="28" rx="7" ry="9" fill="#FFFFFF" stroke="#1A202C" strokeWidth="2" />
              <circle cx="43" cy="28" r="3" fill="#1A202C" />
              <circle cx="57" cy="28" r="3" fill="#1A202C" />
              <circle cx="44" cy="27" r="1" fill="#FFFFFF" />
              <circle cx="58" cy="27" r="1" fill="#FFFFFF" />
              {/* Gentle mouth */}
              <path d="M 38 60 Q 50 68 62 60" fill="none" stroke="#1A202C" strokeWidth="2" />
            </>
          )}
        </svg>
      )}

      {character === "nobita" && (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Shirt Yellow */}
          <path d="M 20 86 Q 50 82 80 86 L 85 100 L 15 100 Z" fill="#FBC02D" stroke="#1A202C" strokeWidth="2" />
          <path d="M 42 86 L 50 94 L 58 86 Z" fill="#FFFFFF" stroke="#1A202C" strokeWidth="1.5" />
          {/* Face peach */}
          <circle cx="50" cy="50" r="35" fill="#FFE0B2" stroke="#1A202C" strokeWidth="2.5" />
          {/* Hair Dark Bowl */}
          <path d="M 18 45 C 18 20 40 12 50 12 C 60 12 82 20 82 45 C 78 35 65 24 50 25 C 35 24 22 35 18 45 Z" fill="#3E2723" stroke="#1A202C" strokeWidth="2.5" />
          {/* Big Round Glasses */}
          <circle cx="36" cy="50" r="13" fill="#FFFFFF" fillOpacity="0.8" stroke="#212121" strokeWidth="3" />
          <circle cx="64" cy="50" r="13" fill="#FFFFFF" fillOpacity="0.8" stroke="#212121" strokeWidth="3" />
          <line x1="49" y1="50" x2="51" y2="50" stroke="#212121" strokeWidth="3" />

          {/* Expressions */}
          {emotion === "crying" ? (
            <>
              {/* Wailing mouth */}
              <ellipse cx="50" cy="68" rx="8" ry="10" fill="#D32F2F" stroke="#1A202C" strokeWidth="2" />
              {/* Tears flowing */}
              <path d="M 30 55 Q 24 66 28 80" fill="none" stroke="#29B6F6" strokeWidth="4" strokeLinecap="round" />
              <path d="M 70 55 Q 76 66 72 80" fill="none" stroke="#29B6F6" strokeWidth="4" strokeLinecap="round" />
              {/* Squeezed eyes */}
              <path d="M 30 50 L 42 50" stroke="#1A202C" strokeWidth="3" />
              <path d="M 58 50 L 70 50" stroke="#1A202C" strokeWidth="3" />
            </>
          ) : emotion === "sleepy" ? (
            <>
              {/* Sleeping lines */}
              <path d="M 32 50 Q 36 54 40 50" fill="none" stroke="#1A202C" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 60 50 Q 64 54 68 50" fill="none" stroke="#1A202C" strokeWidth="2.5" strokeLinecap="round" />
              {/* Sleep bubble / open mouth */}
              <circle cx="50" cy="67" r="4" fill="#D32F2F" />
              <text x="76" y="35" fontSize="14" fontWeight="bold" fill="#3F51B5">Z</text>
            </>
          ) : emotion === "sweat" ? (
            <>
              <circle cx="36" cy="50" r="3" fill="#1A202C" />
              <circle cx="64" cy="50" r="3" fill="#1A202C" />
              <path d="M 44 68 Q 50 63 56 68" fill="none" stroke="#1A202C" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 78 26 C 78 26 84 32 84 36 C 84 39 81 41 78 41 C 75 41 72 39 72 36 C 72 32 78 26 78 26 Z" fill="#29B6F6" />
            </>
          ) : emotion === "happy" || emotion === "smug" ? (
            <>
              <path d="M 32 48 Q 36 44 40 48" fill="none" stroke="#1A202C" strokeWidth="3" strokeLinecap="round" />
              <path d="M 60 48 Q 64 44 68 48" fill="none" stroke="#1A202C" strokeWidth="3" strokeLinecap="round" />
              <path d="M 42 66 Q 50 74 58 66" fill="#D32F2F" stroke="#1A202C" strokeWidth="2" />
            </>
          ) : (
            <>
              <circle cx="36" cy="50" r="3" fill="#1A202C" />
              <circle cx="64" cy="50" r="3" fill="#1A202C" />
              <path d="M 44 66 Q 50 70 56 66" fill="none" stroke="#1A202C" strokeWidth="2" strokeLinecap="round" />
            </>
          )}
        </svg>
      )}

      {character === "suneo" && (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Turquoise Shirt */}
          <path d="M 20 86 Q 50 82 80 86 L 85 100 L 15 100 Z" fill="#00ACC1" stroke="#1A202C" strokeWidth="2" />
          {/* Face peach */}
          <circle cx="50" cy="52" r="33" fill="#FFE0B2" stroke="#1A202C" strokeWidth="2.5" />
          {/* Suneo Iconic 3-Pointed Hair */}
          <path d="M 18 45 C 18 22 35 15 50 15 C 65 15 82 20 88 35 C 96 36 94 25 86 16 C 72 10 40 8 20 22 C 10 30 12 40 18 45 Z" fill="#263238" stroke="#1A202C" strokeWidth="2.5" />
          {/* Fox Spiky Tuft */}
          <polygon points="76,28 98,34 82,42" fill="#263238" stroke="#1A202C" strokeWidth="2" />
          {/* Sharp Fox Eyes */}
          <path d="M 32 46 Q 40 44 44 50" fill="none" stroke="#1A202C" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 58 50 Q 62 44 70 46" fill="none" stroke="#1A202C" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="39" cy="48" r="2" fill="#1A202C" />
          <circle cx="63" cy="48" r="2" fill="#1A202C" />
          {/* Pointy fox snout mouth */}
          <path d="M 44 64 Q 60 62 70 58 Q 58 72 44 64 Z" fill="#E53935" stroke="#1A202C" strokeWidth="2" />
        </svg>
      )}

      {character === "chaien" && (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Orange Shirt with brown zig-zag */}
          <path d="M 15 84 Q 50 80 85 84 L 90 100 L 10 100 Z" fill="#F4511E" stroke="#1A202C" strokeWidth="2" />
          <path d="M 25 90 L 35 96 L 45 90 L 55 96 L 65 90 L 75 96" fill="none" stroke="#4E342E" strokeWidth="3" />
          {/* Big Head */}
          <rect x="20" y="24" width="60" height="60" rx="18" fill="#FFE0B2" stroke="#1A202C" strokeWidth="2.5" />
          {/* Buzzcut Flat Hair */}
          <path d="M 18 36 C 18 16 35 12 50 12 C 65 12 82 16 82 36 L 82 40 L 18 40 Z" fill="#212121" stroke="#1A202C" strokeWidth="2.5" />
          {/* Eyes & Eyebrows */}
          <line x1="28" y1="42" x2="42" y2="45" stroke="#1A202C" strokeWidth="3" strokeLinecap="round" />
          <line x1="58" y1="45" x2="72" y2="42" stroke="#1A202C" strokeWidth="3" strokeLinecap="round" />
          <circle cx="35" cy="50" r="3" fill="#1A202C" />
          <circle cx="65" cy="50" r="3" fill="#1A202C" />
          {/* Round Red Nose */}
          <ellipse cx="50" cy="54" rx="6" ry="4" fill="#FFAB91" stroke="#1A202C" strokeWidth="1.5" />
          {/* Loud Mouth */}
          <ellipse cx="50" cy="68" rx="12" ry="7" fill="#C62828" stroke="#1A202C" strokeWidth="2" />
        </svg>
      )}

      {character === "shizuka" && (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Pink Dress */}
          <path d="M 22 86 Q 50 82 78 86 L 82 100 L 18 100 Z" fill="#EC407A" stroke="#1A202C" strokeWidth="2" />
          <circle cx="50" cy="86" r="4" fill="#FFFFFF" />
          {/* Twin Pigtails with Ribbons */}
          <circle cx="16" cy="44" r="9" fill="#212121" stroke="#1A202C" strokeWidth="2" />
          <circle cx="84" cy="44" r="9" fill="#212121" stroke="#1A202C" strokeWidth="2" />
          <rect x="22" y="42" width="6" height="6" rx="2" fill="#E91E63" />
          <rect x="72" y="42" width="6" height="6" rx="2" fill="#E91E63" />
          {/* Face peach */}
          <circle cx="50" cy="52" r="32" fill="#FFE0B2" stroke="#1A202C" strokeWidth="2.5" />
          {/* Bangs */}
          <path d="M 22 45 C 22 25 36 18 50 18 C 64 18 78 25 78 45 C 72 36 62 34 50 34 C 38 34 28 36 22 45 Z" fill="#212121" stroke="#1A202C" strokeWidth="2" />
          {/* Pretty Almond Anime Eyes */}
          <ellipse cx="38" cy="52" rx="5" ry="7" fill="#212121" />
          <ellipse cx="62" cy="52" rx="5" ry="7" fill="#212121" />
          <circle cx="39" cy="50" r="2" fill="#FFFFFF" />
          <circle cx="63" cy="50" r="2" fill="#FFFFFF" />
          {/* Gentle Blush */}
          <ellipse cx="32" cy="62" rx="4" ry="2" fill="#F48FB1" opacity="0.8" />
          <ellipse cx="68" cy="62" rx="4" ry="2" fill="#F48FB1" opacity="0.8" />
          {/* Cute smile */}
          <path d="M 45 64 Q 50 68 55 64" fill="none" stroke="#D81B60" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
    </div>
  );
};

export const MangaComicDialogueBox: React.FC<MangaComicDialogueBoxProps> = ({
  dialogue,
  targetIdiom = "",
  className = "",
}) => {
  const [speakingLine, setSpeakingLine] = useState<string | null>(null);

  if (!dialogue) {
    return (
      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center">
        <MessageCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
        <p className="text-xs text-slate-500">Manga bối cảnh cho thành ngữ này đang được cập nhật thêm.</p>
      </div>
    );
  }

  const { context_situation, characterA, characterB, punchline_tip } = dialogue;

  const playVoice = (text: string, identifier: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setSpeakingLine(identifier);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.92;
      utterance.onend = () => setSpeakingLine(null);
      utterance.onerror = () => setSpeakingLine(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Helper to highlight the target idiom in dialogue text
  const renderHighlightedLine = (text: string) => {
    if (!targetIdiom) return text;
    // Extract base words of the idiom for flexible match
    const cleanTarget = targetIdiom.replace(/[()]/g, "").trim();
    const regex = new RegExp(`(${cleanTarget})`, "gi");
    const parts = text.split(regex);
    return (
      <>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <span
              key={i}
              className="px-1.5 py-0.5 rounded-md bg-amber-300 text-slate-950 font-black underline decoration-amber-600 decoration-2 shadow-xs"
            >
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div className={`w-full space-y-4 select-text ${className}`}>
      {/* Manga Strip Container */}
      <div className="relative rounded-3xl border-2 border-slate-900 bg-[#FFFDF9] p-4 sm:p-5 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] overflow-hidden">
        {/* Subtle comic halftone dots watermark */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage: "radial-gradient(#000 1.5px, transparent 1.5px)",
            backgroundSize: "12px 12px",
          }}
        />

        {/* Top Header Badge */}
        <div className="relative z-10 flex items-center justify-between flex-wrap gap-2 pb-3 mb-3 border-b-2 border-slate-900/10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider bg-slate-900 text-white shadow-xs">
              4-KOMA MANGA
            </span>
            <span className="text-xs font-black text-amber-900 flex items-center gap-1">
              <span>🎏</span> Bối cảnh thực chiến Doraemon
            </span>
          </div>

          <span className="text-[11px] font-bold text-slate-500 italic">
            Bấm 🔊 để nghe nhân vật phát âm
          </span>
        </div>

        {/* Situation Intro if present */}
        {context_situation && (
          <div className="relative z-10 mb-3.5 p-2.5 rounded-xl bg-amber-100/60 border border-amber-300/80 text-xs text-amber-950 font-medium leading-relaxed flex items-start gap-2">
            <span className="text-sm shrink-0">🎬</span>
            <p>
              <strong className="font-extrabold text-amber-900">Bối cảnh: </strong>
              {context_situation}
            </p>
          </div>
        )}

        {/* Two-Panel Manga Strip */}
        <div className="relative z-10 space-y-3.5">
          {/* Panel 1: Character A (Setup) */}
          <div className="flex items-start gap-3">
            <MangaAvatar character={characterA.avatar} emotion={characterA.emotion} size={54} />

            <div className="flex-1 relative">
              <div className="inline-block px-2 py-0.5 mb-1 rounded text-[10px] font-black uppercase tracking-wider bg-slate-200 text-slate-800">
                {characterA.name}
              </div>

              {/* Comic Speech Bubble */}
              <div className="relative bg-white border-2 border-slate-900 rounded-2xl rounded-tl-xs p-3 shadow-xs">
                {/* Speech tail */}
                <div className="absolute -left-2 top-2 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-slate-900 border-b-8 border-b-transparent" />
                <div className="absolute -left-1 top-2.5 w-0 h-0 border-t-6 border-t-transparent border-r-6 border-r-white border-b-6 border-b-transparent" />

                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    "{renderHighlightedLine(characterA.line_en)}"
                  </p>

                  <button
                    type="button"
                    onClick={() => playVoice(characterA.line_en, "charA")}
                    className={`shrink-0 p-1.5 rounded-lg border cursor-pointer transition ${
                      speakingLine === "charA"
                        ? "bg-amber-500 text-white border-amber-600 animate-pulse"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-300"
                    }`}
                    title="Nghe phát âm câu thoại"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-[11px] text-slate-500 font-medium italic mt-1.5 pt-1.5 border-t border-slate-100">
                  {characterA.line_vi}
                </p>
              </div>
            </div>
          </div>

          {/* Panel 2: Character B (Punchline with Idiom) */}
          <div className="flex items-start gap-3 flex-row-reverse">
            <MangaAvatar character={characterB.avatar} emotion={characterB.emotion} size={54} />

            <div className="flex-1 relative text-right">
              <div className="inline-block px-2 py-0.5 mb-1 rounded text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 font-bold shadow-xs">
                {characterB.name} (Tung Idiom)
              </div>

              {/* Comic Speech Bubble */}
              <div className="relative bg-linear-to-b from-amber-50/90 to-white border-2 border-slate-900 rounded-2xl rounded-tr-xs p-3 shadow-xs text-left">
                {/* Speech tail on right */}
                <div className="absolute -right-2 top-2 w-0 h-0 border-t-8 border-t-transparent border-l-8 border-l-slate-900 border-b-8 border-b-transparent" />
                <div className="absolute -right-1 top-2.5 w-0 h-0 border-t-6 border-t-transparent border-l-6 border-l-white border-b-6 border-b-transparent" />

                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    "{renderHighlightedLine(characterB.line_en)}"
                  </p>

                  <button
                    type="button"
                    onClick={() => playVoice(characterB.line_en, "charB")}
                    className={`shrink-0 p-1.5 rounded-lg border cursor-pointer transition ${
                      speakingLine === "charB"
                        ? "bg-amber-500 text-white border-amber-600 animate-pulse"
                        : "bg-amber-100 text-amber-900 hover:bg-amber-200 border-amber-300"
                    }`}
                    title="Nghe phát âm câu thoại"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-[11px] text-slate-600 font-medium italic mt-1.5 pt-1.5 border-t border-amber-200/60">
                  {characterB.line_vi}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Punchline Formula Box: Nói sao cho sang & ấn tượng? */}
      <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/50 p-4 space-y-3">
        <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-indigo-900">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Bí kíp thực tế: Dùng sao cho ấn tượng?</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
          {/* Ordinary Way */}
          <div className="p-3 rounded-xl bg-white/90 border border-slate-200 space-y-1">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1">
              <span>😐</span> Nói thông thường (Band 5.5):
            </span>
            <p className="text-slate-700 italic font-serif leading-relaxed">
              "{punchline_tip.ordinary_way}"
            </p>
          </div>

          {/* Punchline Idiom Way */}
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-300 space-y-1">
            <span className="text-[10px] font-black uppercase text-amber-800 tracking-wider flex items-center gap-1">
              <span>🔥</span> Dùng Idiom ấn tượng (Band 7.5+):
            </span>
            <p className="text-slate-900 font-bold leading-relaxed">
              "{punchline_tip.punchline_idiom}"
            </p>
          </div>
        </div>

        {/* Why It Hits / Moment of Impact */}
        <div className="p-3 rounded-xl bg-white border border-indigo-100 text-xs text-indigo-950 space-y-1">
          <span className="font-extrabold text-indigo-900 flex items-center gap-1">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>Thời điểm & Cảm xúc ăn điểm (The Punchline):</span>
          </span>
          <p className="leading-relaxed text-slate-700">
            {punchline_tip.why_it_hits}
          </p>
        </div>
      </div>
    </div>
  );
};
