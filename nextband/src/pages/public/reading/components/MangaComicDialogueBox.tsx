import React, { useState, useEffect } from "react";
import { Volume2, Sparkles, Lightbulb, MessageCircle } from "lucide-react";
import { MangaComicDialogue, MangaCharacter } from "@/data/idioms/manga/types";

interface MangaComicDialogueBoxProps {
  dialogue?: MangaComicDialogue;
  targetIdiom?: string;
  className?: string;
}

// Crisp, authentic Doraemon & Extended Anime character avatar
const MangaAvatar: React.FC<{
  character: string;
  emotion?: string;
  name: string;
  size?: number;
}> = ({ character, emotion, name, size = 52 }) => {
  const primarySrc = emotion
    ? `/manga/characters/${character}_${emotion}.png`
    : `/manga/characters/${character}.png`;
  const fallbackSrc = `/manga/characters/${character}.png`;
  const [src, setSrc] = useState(primarySrc);

  useEffect(() => {
    setSrc(primarySrc);
  }, [primarySrc]);

  return (
    <div
      className="relative shrink-0 rounded-2xl bg-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] overflow-hidden"
      style={{ width: size, height: size }}
    >
      <img
        src={src}
        alt={name}
        className="w-full h-full object-cover object-center"
        loading="lazy"
        onError={(e) => {
          if (src !== fallbackSrc) {
            setSrc(fallbackSrc);
            return;
          }
          const target = e.currentTarget;
          target.style.display = "none";
          if (target.parentElement) {
            target.parentElement.classList.add("flex", "items-center", "justify-center", "bg-amber-100", "font-black", "text-amber-900");
            target.parentElement.innerText = name.slice(0, 1).toUpperCase();
          }
        }}
      />
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
      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
        <MessageCircle className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
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

  // Helper to highlight target idiom in dialogue text
  const renderHighlightedLine = (text: string) => {
    if (!targetIdiom) return text;
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
    <div className={`w-full space-y-3 select-text ${className}`}>
      {/* Manga Strip Container */}
      <div className="relative rounded-2xl border-2 border-slate-900 bg-[#FFFDF9] p-3.5 sm:p-4 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] overflow-hidden">
        {/* Subtle comic halftone dots */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(#000 1.5px, transparent 1.5px)",
            backgroundSize: "12px 12px",
          }}
        />

        {/* Compact 1-line Situation Context */}
        {context_situation && (
          <div className="relative z-10 text-[11px] text-amber-950 font-medium italic mb-3 px-2.5 py-1.5 rounded-xl bg-amber-100/70 border border-amber-300/80 flex items-start gap-1.5 leading-snug">
            <span className="not-italic shrink-0 text-xs">🎬</span>
            <span>
              <strong className="font-bold not-italic text-amber-900">Bối cảnh: </strong>
              {context_situation}
            </span>
          </div>
        )}

        {/* Two Dialogue Panels (Setup & Punchline) */}
        <div className="relative z-10 space-y-3">
          {/* Panel 1: Character A (Setup) */}
          <div className="flex items-start gap-2.5">
            <MangaAvatar character={characterA.avatar} emotion={characterA.emotion} name={characterA.name} size={50} />

            <div className="flex-1 relative">
              <span className="inline-block px-2 py-0.5 mb-1 rounded text-[10px] font-black uppercase tracking-wider bg-slate-200 text-slate-800">
                {characterA.name}
              </span>

              {/* Comic Speech Bubble */}
              <div className="relative bg-white border-2 border-slate-900 rounded-2xl rounded-tl-xs p-2.5 shadow-xs">
                {/* Speech tail */}
                <div className="absolute -left-2 top-2 w-0 h-0 border-t-6 border-t-transparent border-r-6 border-r-slate-900 border-b-6 border-b-transparent" />
                <div className="absolute -left-1 top-2.5 w-0 h-0 border-t-5 border-t-transparent border-r-5 border-r-white border-b-5 border-b-transparent" />

                <div className="flex items-start justify-between gap-1.5">
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
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-[10.5px] text-slate-500 font-medium italic mt-1 pt-1 border-t border-slate-100">
                  {characterA.line_vi}
                </p>
              </div>
            </div>
          </div>

          {/* Panel 2: Character B (Punchline with Idiom) */}
          <div className="flex items-start gap-2.5 flex-row-reverse">
            <MangaAvatar character={characterB.avatar} emotion={characterB.emotion} name={characterB.name} size={50} />

            <div className="flex-1 relative text-right">
              <span className="inline-block px-2 py-0.5 mb-1 rounded text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 font-bold shadow-xs">
                {characterB.name}
              </span>

              {/* Comic Speech Bubble */}
              <div className="relative bg-linear-to-b from-amber-50/90 to-white border-2 border-slate-900 rounded-2xl rounded-tr-xs p-2.5 shadow-xs text-left">
                {/* Speech tail right */}
                <div className="absolute -right-2 top-2 w-0 h-0 border-t-6 border-t-transparent border-l-6 border-l-slate-900 border-b-6 border-b-transparent" />
                <div className="absolute -right-1 top-2.5 w-0 h-0 border-t-5 border-t-transparent border-l-5 border-l-white border-b-5 border-b-transparent" />

                <div className="flex items-start justify-between gap-1.5">
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
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-[10.5px] text-slate-600 font-medium italic mt-1 pt-1 border-t border-amber-200/60">
                  {characterB.line_vi}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Punchline Formula Box: Dùng sao cho ấn tượng */}
      <div className="rounded-2xl border border-indigo-200 bg-indigo-50/50 p-3 sm:p-3.5 space-y-2.5">
        <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-indigo-900">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Bí kíp thực tế: Dùng sao cho ấn tượng</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {/* Ordinary Way */}
          <div className="p-2.5 rounded-xl bg-white/95 border border-slate-200 space-y-0.5">
            <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1">
              <span>😐</span> Nói thông thường:
            </span>
            <p className="text-slate-700 italic font-serif leading-relaxed text-[11.5px]">
              "{punchline_tip.ordinary_way}"
            </p>
          </div>

          {/* Punchline Idiom Way */}
          <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-300 space-y-0.5">
            <span className="text-[10px] font-bold uppercase text-amber-800 tracking-wider flex items-center gap-1">
              <span>🔥</span> Dùng Idiom ấn tượng:
            </span>
            <p className="text-slate-900 font-bold leading-relaxed text-[11.5px]">
              "{punchline_tip.punchline_idiom}"
            </p>
          </div>
        </div>

        {/* Why It Hits / Moment of Impact */}
        <div className="p-2.5 rounded-xl bg-white/95 border border-indigo-100 text-[11px] text-indigo-950 space-y-0.5">
          <span className="font-extrabold text-indigo-900 flex items-center gap-1 text-[10.5px]">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>Thời điểm & Cảm xúc ăn điểm:</span>
          </span>
          <p className="leading-relaxed text-slate-700">
            {punchline_tip.why_it_hits}
          </p>
        </div>
      </div>
    </div>
  );
};
