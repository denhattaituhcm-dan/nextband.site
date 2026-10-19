import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Volume2 } from "lucide-react";

interface CuratorBook {
  caseId: string;
  dewey: string;
  spineTitle: string;
  coverTitle: string;
  subtitle: string;
  image: string;
  sourceLabel: string;
  wordCount: string;
  lexiconCount: string;
  thicknessPx: number;
  spineColor: string;
  coverBg: string;
  ribbonColor?: "red" | "gold";
  ribbonLabel?: string;
  isSpotlight?: boolean;
}

const CURATED_BOOKS: CuratorBook[] = [
  {
    caseId: "case-014",
    dewey: "GEO\n579.5",
    spineTitle: "WORLD OF FUNGI",
    coverTitle: "The Wondrous World of Fungi",
    subtitle: "Nấm tử thần Death Cap, Mycobiome & Thời trang sinh học",
    image: "https://images.unsplash.com/photo-1546842931-886c185b4c8c?w=600&auto=format&fit=crop&q=80",
    sourceLabel: "NAT GEO • APR 2024",
    wordCount: "1,820 từ",
    lexiconCount: "100% Lexicon Phủ",
    thicknessPx: 28,
    spineColor: "linear-gradient(90deg, #121A15 0%, #203126 55%, #15201A 100%)",
    coverBg: "#131C16",
  },
  {
    caseId: "case-015",
    dewey: "ARC\n933.0",
    spineTitle: "SCENES IN STONE",
    coverTitle: "Surprising Scenes in Stone",
    subtitle: "Khám phá chấn động 1.600 năm tại Huqoq, Galilee",
    image: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=600&auto=format&fit=crop&q=80",
    sourceLabel: "NAT GEO • APR 2024",
    wordCount: "2,140 từ",
    lexiconCount: "439 Content Words (100%)",
    thicknessPx: 38,
    spineColor: "linear-gradient(90deg, #24160F 0%, #432A1C 55%, #251710 100%)",
    coverBg: "#221812",
    ribbonColor: "red",
    ribbonLabel: "Ấn bản đọc dở",
    isSpotlight: true,
  },
  {
    caseId: "case-007",
    dewey: "SOC\n304.6",
    spineTitle: "DEMOGRAPHIC",
    coverTitle: "The Demographic Winter",
    subtitle: "Bức tranh già hóa dân số & Nền kinh tế suy thoái",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&auto=format&fit=crop&q=80",
    sourceLabel: "THE ATLANTIC",
    wordCount: "1,650 từ",
    lexiconCount: "Tier 1 & 2 Cognitive",
    thicknessPx: 32,
    spineColor: "linear-gradient(90deg, #0F1920 0%, #1A2F3D 55%, #101B23 100%)",
    coverBg: "#101920",
    ribbonColor: "gold",
    ribbonLabel: "28 Từ vựng Tier 1",
  },
  {
    caseId: "case-001",
    dewey: "GEO\n551.4",
    spineTitle: "GLACIAL LAKE",
    coverTitle: "Glacial Lake Outburst",
    subtitle: "Hiểm họa vỡ hồ băng ngầm trên dãy Himalaya",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=80",
    sourceLabel: "CAMBRIDGE ESSAY",
    wordCount: "1,420 từ",
    lexiconCount: "100% Lexicon • Band 8.0+",
    thicknessPx: 22,
    spineColor: "linear-gradient(90deg, #0C1D22 0%, #173842 55%, #0E2228 100%)",
    coverBg: "#0D1C22",
  },
  {
    caseId: "case-002",
    dewey: "LEAD\n158.1",
    spineTitle: "WARREN BUFFETT",
    coverTitle: "Kỹ Năng Đòn Bẩy Trong Kỷ Nguyên AI",
    subtitle: "Triết lý 80% thời gian trầm ngâm & Đòn bẩy trí tuệ",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80",
    sourceLabel: "FAST COMPANY",
    wordCount: "1,200 từ",
    lexiconCount: "100% Lexicon Phủ",
    thicknessPx: 24,
    spineColor: "linear-gradient(90deg, #1A130E 0%, #35251B 55%, #1C140F 100%)",
    coverBg: "#1D1612",
  },
];

export const MasterCuratorShelf: React.FC = () => {
  const [activeCaseId, setActiveCaseId] = useState<string>("case-015");
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Play subtle wood friction audio via Web Audio API (No external file needed)
  const playTactileWoodSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(85, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.15);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(320, ctx.currentTime);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.19);
    } catch {
      // Silent fallback if audio policy prevents autoplay
    }
  };

  const handleMouseEnter = (caseId: string) => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    hoverTimerRef.current = setTimeout(() => {
      setActiveCaseId(caseId);
      playTactileWoodSound();
    }, 120); // 120ms Intentional Tactile Delay
  };

  const handleMouseLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    };
  }, []);

  const activeBook = CURATED_BOOKS.find((b) => b.caseId === activeCaseId) || CURATED_BOOKS[1];

  return (
    <section className="my-8 rounded-3xl bg-[#14100D] border border-[#2D221A] p-5 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.45)] relative overflow-hidden">
      {/* Top Header of the Shelf */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#291F18] pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#F59E0B]" />
          <span className="font-serif text-sm tracking-wide text-amber-200/90 font-medium uppercase">
            Tủ Sách Tuyển Chọn Học Thuật · The Curator's 2.5D Shelf
          </span>
        </div>
        <div className="text-[11px] font-sans text-neutral-400">
          Rê chuột dừng 120ms để rút sách • Click để vào đọc sâu
        </div>
      </div>

      {/* 3D Shelf Stage */}
      <div 
        className="relative py-8 px-4 flex justify-center items-end gap-5 md:gap-7 overflow-x-auto no-scrollbar min-h-[380px]"
        style={{
          perspective: "1400px",
          perspectiveOrigin: "50% 35%",
          transformStyle: "preserve-3d",
        }}
      >
        {CURATED_BOOKS.map((book) => {
          const isActive = book.caseId === activeCaseId;

          return (
            <Link
              key={book.caseId}
              to={`/reading/${book.caseId}`}
              onMouseEnter={() => handleMouseEnter(book.caseId)}
              onMouseLeave={handleMouseLeave}
              className={`relative block transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.25,1)] cursor-pointer select-none ${
                isActive ? "z-40" : "z-10"
              }`}
              style={{
                width: "175px",
                height: "275px",
                transformStyle: "preserve-3d",
                transform: isActive
                  ? "rotateY(-8deg) translateZ(60px) translateY(-8px) scale(1.05)"
                  : "rotateY(-18deg) translateZ(0px)",
                filter: isActive
                  ? "drop-shadow(0 25px 35px rgba(0,0,0,0.85)) drop-shadow(0 0 15px rgba(212, 175, 55, 0.2))"
                  : "drop-shadow(4px 12px 18px rgba(0,0,0,0.65))",
                marginLeft: isActive ? "10px" : "0px",
                marginRight: isActive ? "14px" : "0px",
              }}
            >
              {/* Spine with Variable Thickness */}
              <div
                className="absolute left-0 top-0 h-full flex flex-col justify-between items-center py-2.5 px-1 rounded-l-sm"
                style={{
                  width: `${book.thicknessPx}px`,
                  transformOrigin: "left center",
                  transform: "rotateY(-90deg)",
                  background: book.spineColor,
                  boxShadow:
                    "inset 0 0 10px rgba(0,0,0,0.9), inset 2px 0 3px rgba(255,255,255,0.15), inset -2px 0 3px rgba(0,0,0,0.6)",
                }}
              >
                {/* Top Rib */}
                <div className="w-full h-1 bg-white/20 shadow-sm" />

                {/* Dewey Decimal Tag */}
                <div className="w-[85%] bg-[#E8DFC8] text-[#1A1612] font-mono font-bold text-[7.5px] p-0.5 rounded-[1px] text-center leading-tight shadow-sm border border-[#7D6B56]">
                  {book.dewey.split("\n").map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>

                {/* Vertical Spine Title */}
                <span className="text-[9px] font-serif font-semibold tracking-widest uppercase rotate-90 whitespace-nowrap text-amber-200/90 my-auto">
                  {book.spineTitle}
                </span>

                {/* Bottom Rib */}
                <div className="w-full h-1 bg-white/20 shadow-sm" />

                {/* Case Code */}
                <span className="text-[8px] font-mono text-amber-300 font-bold">
                  {book.caseId.toUpperCase().replace("CASE-", "C-")}
                </span>
              </div>

              {/* Silk Ribbon Bookmark */}
              {book.ribbonColor && (
                <div
                  className="absolute bottom-[-28px] left-1/2 -translate-x-1/2 w-3 h-8 shadow-md z-10"
                  style={{
                    background:
                      book.ribbonColor === "red"
                        ? "linear-gradient(135deg, #8E1B1B 0%, #C93B3B 50%, #681111 100%)"
                        : "linear-gradient(135deg, #A87E24 0%, #E5BD56 50%, #876215 100%)",
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 50% 80%, 0% 100%)",
                  }}
                  title={book.ribbonLabel}
                />
              )}

              {/* Front Cover */}
              <div
                className="absolute inset-0 rounded-r-md rounded-l-[1px] p-3 flex flex-col justify-between overflow-hidden border border-white/10"
                style={{
                  backgroundColor: book.coverBg,
                  boxShadow: "inset 4px 0 8px rgba(0,0,0,0.5)",
                }}
              >
                <div className="relative">
                  <img
                    src={book.image}
                    alt={book.coverTitle}
                    className="w-full h-32 object-cover rounded shadow-md mb-2"
                  />
                  {book.isSpotlight ? (
                    <span className="absolute top-1 right-1 bg-amber-500 text-black text-[8px] font-serif font-bold px-1.5 py-0.5 rounded shadow">
                      ĐANG ĐỌC DỞ
                    </span>
                  ) : (
                    <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/75 text-neutral-300 text-[7.5px] font-mono border border-white/10">
                      {book.sourceLabel}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <span className="text-[8.5px] font-mono text-amber-400 font-semibold tracking-wider uppercase block truncate">
                    {book.sourceLabel}
                  </span>
                  <h4 className="text-xs font-serif font-bold text-white leading-tight line-clamp-2">
                    {book.coverTitle}
                  </h4>
                  <div className="flex items-center justify-between text-[9px] font-mono text-neutral-400 pt-1 border-t border-white/10">
                    <span>{book.wordCount}</span>
                    <span className="text-emerald-400 font-bold">{book.lexiconCount}</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Realistic Wood Shelf Ledge & Floor Reflection */}
      <div className="relative mt-[-8px] z-20">
        {/* Top Edge */}
        <div
          className="h-2 w-full"
          style={{
            background: "linear-gradient(90deg, #2E1F16 0%, #614432 25%, #4A3325 70%, #281B13 100%)",
            boxShadow: "inset 0 1px 2px rgba(255,255,255,0.25)",
            transform: "skewX(-45deg)",
            transformOrigin: "bottom",
          }}
        />
        {/* Front Wood Ledge */}
        <div
          className="h-5 w-full rounded-sm"
          style={{
            background: "linear-gradient(180deg, #4A3325 0%, #251810 50%, #0F0A07 100%)",
            boxShadow:
              "0 14px 28px rgba(0,0,0,0.9), inset 0 1px 1px rgba(255,255,255,0.25), inset 0 -2px 4px rgba(0,0,0,0.8)",
          }}
        />
        {/* Reflection */}
        <div
          className="absolute top-full left-0 right-0 h-24 pointer-events-none opacity-40 blur-[2px]"
          style={{
            background: "linear-gradient(to bottom, rgba(212, 175, 55, 0.08) 0%, rgba(255,255,255,0.02) 30%, transparent 80%)",
            transformOrigin: "top center",
            transform: "scaleY(-1)",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, transparent 85%)",
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, transparent 85%)",
          }}
        />
      </div>

      {/* Inspection HUD Bar at Bottom */}
      <div className="mt-10 pt-4 border-t border-[#291F18] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0F0B09]/90 p-4 rounded-2xl border border-amber-500/15">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold border border-amber-500/30">
              {activeBook.dewey.replace("\n", " ")}
            </span>
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wide">
              {activeBook.sourceLabel}
            </span>
          </div>
          <h3 className="text-sm sm:text-base font-serif font-bold text-white">
            {activeBook.coverTitle}
          </h3>
          <p className="text-xs text-neutral-300 font-serif italic max-w-xl">
            {activeBook.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-4 self-end sm:self-center">
          <div className="text-right font-mono text-xs hidden md:block">
            <div className="text-neutral-400">{activeBook.wordCount}</div>
            <div className="text-emerald-400 font-bold">{activeBook.lexiconCount}</div>
          </div>
          <Link
            to={`/reading/${activeBook.caseId}`}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-serif font-bold text-xs tracking-wider transition-all shadow-md shadow-amber-500/20 flex items-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>RÚT ẤN BẢN ĐỌC SÂU</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
