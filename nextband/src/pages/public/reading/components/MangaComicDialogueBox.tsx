import React, { useState, useEffect } from "react";
import { Volume2, Sparkles, Lightbulb, MessageCircle } from "lucide-react";
import { MangaComicDialogue, MangaCharacter } from "@/data/idioms/manga/types";

interface MangaComicDialogueBoxProps {
  dialogue?: MangaComicDialogue;
  targetIdiom?: string;
  className?: string;
}

const KNOWN_EMOTION_AVATARS = new Set([
  "chaien_angry",
  "chaien_happy",
  "doraemon_angry",
  "doraemon_happy",
  "doraemon_sad",
  "doraemon_whistle",
  "doraemon_wink",
  "nobita_exhausted",
  "nobita_point",
  "nobita_scratch",
  "shizuka_aodai",
  "shizuka_smile",
  "suneo_smug",
]);

const VERB_GROUPS: ReadonlyArray<ReadonlySet<string>> = [
  new Set(["be", "am", "is", "are", "was", "were", "been", "being", "it's", "that's", "he's", "she's", "you're", "we're", "they're", "i'm"]),
  new Set(["have", "has", "had", "having", "got", "get", "gets", "getting", "with", "need", "needs"]),
  new Set(["do", "does", "did", "done", "doing"]),
  new Set(["don't", "doesn't", "didn't", "not", "won't", "wouldn't", "can't", "couldn't", "never", "aren't", "isn't", "wasn't", "weren't"]),
  new Set(["get", "gets", "got", "gotten", "getting"]),
  new Set(["go", "goes", "went", "gone", "going"]),
  new Set(["come", "comes", "came", "coming"]),
  new Set(["make", "makes", "made", "making"]),
  new Set(["take", "takes", "took", "taken", "taking"]),
  new Set(["give", "gives", "gave", "given", "giving"]),
  new Set(["lose", "loses", "lost", "losing"]),
  new Set(["run", "runs", "ran", "running"]),
  new Set(["bear", "bears", "bore", "borne", "bearing"]),
  new Set(["fall", "falls", "fell", "fallen", "falling"]),
  new Set(["feel", "feels", "felt", "feeling"]),
  new Set(["leave", "leaves", "left", "leaving"]),
  new Set(["put", "puts", "putting"]),
  new Set(["set", "sets", "setting"]),
  new Set(["bite", "bites", "bit", "bitten", "biting"]),
  new Set(["wear", "wears", "wore", "worn", "wearing"]),
  new Set(["let", "lets", "letting"]),
  new Set(["send", "sends", "sent", "sending"]),
  new Set(["shake", "shakes", "shook", "shaken", "shaking"]),
  new Set(["slip", "slips", "slipped", "slipping"]),
  new Set(["stir", "stirs", "stirred", "stirring"]),
  new Set(["stick", "sticks", "stuck", "sticking"]),
  new Set(["drop", "drops", "dropped", "dropping"]),
  new Set(["twist", "twists", "twisted", "twisting"]),
  new Set(["open", "opens", "opened", "opening"]),
  new Set(["reduce", "reduces", "reduced", "reducing"]),
  new Set(["kick", "kicks", "kicked", "kicking"]),
  new Set(["want", "wants", "wanted", "wanting"]),
  new Set(["die", "dies", "died", "dying"]),
  new Set(["bury", "buries", "buried", "burying"]),
  new Set(["jump", "jumps", "jumped", "jumping"]),
  new Set(["grin", "grins", "grinned", "grinning"]),
  new Set(["poke", "pokes", "poked", "poking"]),
  new Set(["pull", "pulls", "pulled", "pulling"]),
  new Set(["treat", "treats", "treated", "treating"]),
  new Set(["offer", "offers", "offered", "offering"]),
  new Set(["butter", "butters", "buttered", "buttering"]),
  new Set(["feed", "feeds", "fed", "feeding"]),
  new Set(["spoon-feed", "spoon-feeds", "spoon-fed", "spoon-feeding"]),
  new Set(["badger", "badgers", "badgered", "badgering"]),
  new Set(["act", "acts", "acted", "acting", "behave", "behaves", "behaved", "behaving"]),
  new Set(["could", "can", "will", "would"]),
  new Set(["keep", "keeps", "kept", "keeping"]),
  new Set(["break", "breaks", "broke", "broken", "breaking"]),
  new Set(["jog", "jogs", "jogged", "jogging"]),
  new Set(["stand", "stands", "stood", "standing"]),
  new Set(["look", "looks", "looked", "looking"]),
  new Set(["bring", "brings", "brought", "bringing"]),
  new Set(["start", "starts", "started", "starting"]),
  new Set(["hit", "hits", "hitting"]),
  new Set(["drift", "drifts", "drifted", "drifting"]),
  new Set(["strike", "strikes", "struck", "striking"]),
  new Set(["improve", "improves", "improved", "improving"]),
  new Set(["chicken", "chickens", "chickened", "chickening"]),
  new Set(["know", "knows", "knew", "known", "knowing", "learn", "learns", "learned"]),
  new Set(["reach", "reaches", "reached", "reaching"]),
  new Set(["drive", "drives", "drove", "driven", "driving"]),
  new Set(["weep", "weeps", "wept", "weeping"]),
  new Set(["rack", "racks", "racked", "racking"]),
  new Set(["cross", "crosses", "crossed", "crossing"]),
  new Set(["stab", "stabs", "stabbed", "stabbing"]),
  new Set(["catch", "catches", "caught", "catching"]),
  new Set(["agree", "agrees", "agreed", "agreeing"]),
  new Set(["fight", "fights", "fought", "fighting"]),
  new Set(["hold", "holds", "held", "holding"]),
  new Set(["meet", "meets", "met", "meeting"]),
  new Set(["fling", "flings", "flung", "flinging"]),
  new Set(["on", "off"]),
  new Set(["that", "this"]),
  new Set(["a", "an", "the", "my", "your", "his", "her", "our", "their"]),
  new Set(["name", "title"]),
];

const PRONOUN_TOKENS = new Set([
  "someone's",
  "one's",
  "my",
  "your",
  "his",
  "her",
  "its",
  "our",
  "their",
  "someone",
  "me",
  "you",
  "him",
  "us",
  "them",
  "it",
  "i",
  "he",
  "she",
  "we",
  "they",
  "you've",
  "i've",
  "we've",
  "they've",
  "he's",
  "she's",
  "you'd",
  "she'd",
  "he'd",
  "i'd",
  "they'd",
  "myself",
  "yourself",
  "himself",
  "herself",
  "ourselves",
  "themselves",
  "oneself",
]);

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function tokenToPattern(tok: string): { pat: string; isPronoun: boolean } {
  const low = tok.toLowerCase();
  if (PRONOUN_TOKENS.has(low)) {
    return { pat: "(?:[A-Za-z']+(?:\\s+[A-Za-z']+){0,2})", isPronoun: true };
  }
  for (const grp of VERB_GROUPS) {
    if (grp.has(low)) {
      const alts = Array.from(grp)
        .sort((a, b) => b.length - a.length)
        .map((w) => escapeRegExp(w))
        .join("|");
      return { pat: `(?:${alts})`, isPronoun: false };
    }
  }
  const esc = escapeRegExp(tok).replace(/-/g, "[\\s-]");
  if (low.endsWith("s") && low.length > 3) {
    const base = escapeRegExp(tok.slice(0, -1)).replace(/-/g, "[\\s-]");
    return { pat: `(?:${esc}|${base})`, isPronoun: false };
  }
  return { pat: `(?:${esc}(?:s|es|ed|ing)?)`, isPronoun: false };
}

export function buildIdiomRegex(targetIdiom: string, flags: string): RegExp | null {
  if (!targetIdiom || !targetIdiom.trim()) return null;
  try {
    let cleaned = targetIdiom
      .trim()
      .replace(/[!?.]+$/, "")
      .trim()
      .replace(/\s*\((?:to|with|of|on|in|for|at|from|about|by)\)\s*$/i, "")
      .replace(/\s+on\s+it$/i, "")
      .replace(/^(?:it's|it)\s+/i, "")
      .replace(/^almost\s+/i, "")
      .replace(/^\([^)]+\)\s+/i, "")
      .replace(/\s*\(someone\)\s*$/i, "")
      .replace(/\s+someone$/i, "")
      .replace(/[()]/g, "")
      .trim();

    if (!cleaned) return null;

    let tokens = cleaned.split(/\s+/);
    let leadingPrefix = "";

    if (tokens.length >= 2 && (tokens[0].toLowerCase() === "a" || tokens[0].toLowerCase() === "an")) {
      tokens = tokens.slice(1);
      leadingPrefix = "(?:(?:a|an|the|my|your|his|her|our|their)\\s+(?:[A-Za-z-]+\\s+)?)?";
    } else if (tokens.length >= 2 && tokens[0].toLowerCase() === "not") {
      tokens = tokens.slice(1);
      leadingPrefix =
        "(?:(?:do|does|did|will|would|can|could|are|is|was|were)n't(?:\\s+(?:really|going\\s+to))?|(?:do|does|did|will|would|can|could|is|are|was|were|he's|she's|it's|they're|we're|you're|i'm)?\\s*not(?:\\s+going\\s+to)?|never|won't|can't)\\s+";
    } else if (
      tokens.length >= 3 &&
      ["behaved", "took", "had", "have"].includes(tokens[0].toLowerCase())
    ) {
      const firstPat = tokenToPattern(tokens[0]).pat;
      tokens = tokens.slice(1);
      leadingPrefix = `(?:${firstPat}\\s+)?`;
    }

    const joiner =
      "[\\s-]+(?:(?:to|that|of|completely|totally|really|just|right|a\\s+bit|quite|very|so|too|all|whole|major|serious|true|truly|longtime|giant|real|total|complete|huge|massive|fond|warm|joyful|wonderful|enthusiastic|fair|overtime|exact|even|more|finally|happy|childhood|pottery|service|workers|friends|him|her|me|us|them|half|the|theater|audience)[\\s-]+)*";

    const parts: string[] = [];
    tokens.forEach((t, idx) => {
      const { pat, isPronoun } = tokenToPattern(t);
      if (idx === 0) {
        parts.push(pat);
      } else if (isPronoun) {
        parts.push(`(?:${joiner}${pat})?`);
      } else {
        parts.push(`${joiner}${pat}`);
      }
    });

    const fullPat = leadingPrefix + parts.join("");
    return new RegExp(`\\b(${fullPat})\\b`, flags);
  } catch {
    return null;
  }
}

export function renderHighlightedIdiomText(
  text: string,
  targetIdiom: string,
  highlightClassName = "px-1.5 py-0.5 rounded-md bg-amber-300 text-slate-950 font-black underline decoration-amber-600 decoration-2 shadow-xs"
): React.ReactNode {
  if (!text) return text;
  const regex = buildIdiomRegex(targetIdiom, "gi");
  if (!regex) return text;
  const parts = text.split(regex);
  if (parts.length <= 1) return text;
  return (
    <>
      {parts.map((part, i) =>
        part && i % 2 === 1 ? (
          <span key={i} className={highlightClassName}>
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}

// Crisp, authentic Doraemon & Extended Anime character avatar
const MangaAvatar: React.FC<{
  character: string;
  emotion?: string;
  name: string;
  size?: number;
}> = ({ character, emotion, name, size = 50 }) => {
  const emotionKey = emotion ? `${character}_${emotion}` : "";
  const primarySrc =
    emotionKey && KNOWN_EMOTION_AVATARS.has(emotionKey)
      ? `/manga/characters/${emotionKey}.png`
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
            target.parentElement.classList.add(
              "flex",
              "items-center",
              "justify-center",
              "bg-amber-100",
              "font-black",
              "text-amber-900"
            );
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

  useEffect(() => {
    setSpeakingLine(null);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [dialogue]);

  const resolvedTurns: MangaCharacter[] = dialogue?.turns ?? [];

  if (!dialogue || resolvedTurns.length === 0) {
    return (
      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
        <MessageCircle className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
        <p className="text-xs text-slate-500">
          Manga bối cảnh cho thành ngữ này đang được cập nhật thêm.
        </p>
      </div>
    );
  }

  const { context_situation, punchline_tip } = dialogue;
  const avatarSize = resolvedTurns.length >= 3 ? 46 : 50;

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

  const hasIdiomMatch = (text: string): boolean => {
    const regex = buildIdiomRegex(targetIdiom, "i");
    return regex ? regex.test(text) : false;
  };

  const firstMatchedIdx = resolvedTurns.findIndex((t) => hasIdiomMatch(t.line_en));

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

        {/* Flexible 2-4 Dialogue Panels */}
        <div className="relative z-10 space-y-2.5">
          {resolvedTurns.map((turn, idx) => {
            const isRight = idx % 2 === 1;
            const isAccent =
              firstMatchedIdx >= 0
                ? hasIdiomMatch(turn.line_en)
                : idx === resolvedTurns.length - 1;
            const voiceKey = `turn-${idx}`;
            const isSpeaking = speakingLine === voiceKey;

            return (
              <div
                key={voiceKey}
                className={`flex items-start gap-2.5 ${isRight ? "flex-row-reverse" : ""}`}
              >
                <MangaAvatar
                  character={turn.avatar}
                  emotion={turn.emotion}
                  name={turn.name}
                  size={avatarSize}
                />

                <div className={`flex-1 relative ${isRight ? "text-right" : ""}`}>
                  <span
                    className={`inline-block px-2 py-0.5 mb-1 rounded text-[10px] font-black uppercase tracking-wider ${
                      isAccent
                        ? "bg-amber-400 text-slate-950 font-bold shadow-xs"
                        : "bg-slate-200 text-slate-800"
                    }`}
                  >
                    {turn.name}
                  </span>

                  {/* Comic Speech Bubble */}
                  <div
                    className={`relative border-2 border-slate-900 rounded-2xl p-2.5 shadow-xs text-left ${
                      isRight ? "rounded-tr-xs" : "rounded-tl-xs"
                    } ${
                      isAccent
                        ? "bg-linear-to-b from-amber-50/90 to-white"
                        : "bg-white"
                    }`}
                  >
                    {/* Speech tail */}
                    {isRight ? (
                      <>
                        <div className="absolute -right-2 top-2 w-0 h-0 border-t-6 border-t-transparent border-l-6 border-l-slate-900 border-b-6 border-b-transparent" />
                        <div className="absolute -right-1 top-2.5 w-0 h-0 border-t-5 border-t-transparent border-l-5 border-l-white border-b-5 border-b-transparent" />
                      </>
                    ) : (
                      <>
                        <div className="absolute -left-2 top-2 w-0 h-0 border-t-6 border-t-transparent border-r-6 border-r-slate-900 border-b-6 border-b-transparent" />
                        <div className="absolute -left-1 top-2.5 w-0 h-0 border-t-5 border-t-transparent border-r-5 border-r-white border-b-5 border-b-transparent" />
                      </>
                    )}

                    <div className="flex items-start justify-between gap-1.5">
                      <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                        "{renderHighlightedIdiomText(turn.line_en, targetIdiom)}"
                      </p>

                      <button
                        type="button"
                        onClick={() => playVoice(turn.line_en, voiceKey)}
                        className={`shrink-0 p-1.5 rounded-lg border cursor-pointer transition ${
                          isSpeaking
                            ? "bg-amber-500 text-white border-amber-600 animate-pulse"
                            : isAccent
                              ? "bg-amber-100 text-amber-900 hover:bg-amber-200 border-amber-300"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-300"
                        }`}
                        title="Nghe phát âm"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p
                      className={`text-[10.5px] font-medium italic mt-1 pt-1 border-t ${
                        isAccent
                          ? "text-slate-600 border-amber-200/60"
                          : "text-slate-500 border-slate-100"
                      }`}
                    >
                      {turn.line_vi}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
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
              "{renderHighlightedIdiomText(punchline_tip.punchline_idiom, targetIdiom)}"
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
