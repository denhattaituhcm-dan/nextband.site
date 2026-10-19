import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

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
  ribbonColor?: "red" | "gold" | "emerald";
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
    spineColor: "linear-gradient(90deg, #1C2620 0%, #2D4133 55%, #1F2E24 100%)",
    coverBg: "#1E2A22",
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
    spineColor: "linear-gradient(90deg, #3A2318 0%, #5C3A27 55%, #3D2619 100%)",
    coverBg: "#2E1C13",
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
    spineColor: "linear-gradient(90deg, #182631 0%, #2A4557 55%, #1B2D3A 100%)",
    coverBg: "#1A2834",
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
    thicknessPx: 24,
    spineColor: "linear-gradient(90deg, #162B32 0%, #254B57 55%, #19343D 100%)",
    coverBg: "#172E37",
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
    thicknessPx: 26,
    spineColor: "linear-gradient(90deg, #2D1E16 0%, #4D3425 55%, #332117 100%)",
    coverBg: "#2B1C14",
    ribbonColor: "emerald",
    ribbonLabel: "Kinh điển",
  },
  {
    caseId: "case-003",
    dewey: "AI\n006.3",
    spineTitle: "GENERATIVE AI",
    coverTitle: "The Generative AI Paradox",
    subtitle: "Intellectual Displacement vs Human Agency",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
    sourceLabel: "THE GUARDIAN",
    wordCount: "1,550 từ",
    lexiconCount: "IELTS Band 7.5+",
    thicknessPx: 30,
    spineColor: "linear-gradient(90deg, #2A1D36 0%, #46305C 55%, #30203F 100%)",
    coverBg: "#261932",
    ribbonColor: "gold",
    ribbonLabel: "Công nghệ mới",
  },
  {
    caseId: "case-004",
    dewey: "EDU\n371.3",
    spineTitle: "EDTECH DELUSION",
    coverTitle: "The EdTech Delusion",
    subtitle: "Screen-Based Learning & Xói mòn năng lực đọc sâu",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&auto=format&fit=crop&q=80",
    sourceLabel: "GUARDIAN OPINION",
    wordCount: "1,480 từ",
    lexiconCount: "Tư duy phản biện",
    thicknessPx: 25,
    spineColor: "linear-gradient(90deg, #182C29 0%, #284D47 55%, #1C3632 100%)",
    coverBg: "#172A27",
  },
  {
    caseId: "case-005",
    dewey: "ENV\n333.7",
    spineTitle: "TECHNO-FIX MYTH",
    coverTitle: "The Techno-Fix Myth",
    subtitle: "Vì sao công nghệ xanh đơn thuần không thể đảo ngược biến đổi khí hậu",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&auto=format&fit=crop&q=80",
    sourceLabel: "PLANETARY BOUNDARIES",
    wordCount: "1,620 từ",
    lexiconCount: "Học thuật cao cấp",
    thicknessPx: 28,
    spineColor: "linear-gradient(90deg, #322514 0%, #563E1F 55%, #3A2A15 100%)",
    coverBg: "#2B1E0F",
  },
  {
    caseId: "case-006",
    dewey: "SOC\n302.3",
    spineTitle: "LONELINESS EPIDEMIC",
    coverTitle: "The Loneliness Epidemic",
    subtitle: "Thuật toán mạng xã hội & Sự cô lập cộng đồng hiện đại",
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=600&auto=format&fit=crop&q=80",
    sourceLabel: "SOCIOLOGY TODAY",
    wordCount: "1,510 từ",
    lexiconCount: "Tâm lý học xã hội",
    thicknessPx: 27,
    spineColor: "linear-gradient(90deg, #301822 0%, #52283A 55%, #381A27 100%)",
    coverBg: "#29131C",
  },
  {
    caseId: "case-008",
    dewey: "ECON\n337.1",
    spineTitle: "DEGLOBALISATION",
    coverTitle: "The Deglobalisation Trap",
    subtitle: "Vũ khí hóa chuỗi cung ứng & Cái giá đắt của tự cung tự cấp",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80",
    sourceLabel: "THE ECONOMIST",
    wordCount: "1,750 từ",
    lexiconCount: "IELTS Band 8.0+",
    thicknessPx: 34,
    spineColor: "linear-gradient(90deg, #1C2738 0%, #2F425E 55%, #202D40 100%)",
    coverBg: "#1A2536",
    ribbonColor: "red",
    ribbonLabel: "Kinh tế vĩ mô",
  },
];

export const MasterCuratorShelf: React.FC = () => {
  const [activeCaseId, setActiveCaseId] = useState<string>("case-015");
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Play subtle wood friction audio via Web Audio API (Snappy & immediate)
  const playTactileWoodSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(95, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.12);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(360, ctx.currentTime);

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch {
      // Silent fallback
    }
  };

  // Instant responsive hover without delay
  const handleMouseEnter = (caseId: string) => {
    if (activeCaseId !== caseId) {
      setActiveCaseId(caseId);
      playTactileWoodSound();
    }
  };

  const scrollShelf = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const offset = direction === "left" ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const activeBook = CURATED_BOOKS.find((b) => b.caseId === activeCaseId) || CURATED_BOOKS[1];

  return (
    <section className="my-8 rounded-3xl bg-linear-to-b from-[#F7F2EA] via-[#EDE4D5] to-[#E2D4BF] border border-[#D5C4AA] p-5 sm:p-8 shadow-[0_20px_50px_rgba(100,75,45,0.12)] relative overflow-hidden">
      {/* Subtle wood paneling background texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply"
        style={{
          backgroundImage: "repeating-linear-gradient(90deg, rgba(140, 105, 65, 0.04) 0px, rgba(140, 105, 65, 0.04) 1px, transparent 1px, transparent 60px)",
        }}
      />

      {/* Top Header of the Shelf */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D8C7AF] pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-600 shadow-[0_0_10px_rgba(217,119,6,0.6)]" />
          <h2 className="font-serif text-base sm:text-lg tracking-wide text-[#3C2A1E] font-bold uppercase flex items-center gap-2">
            <span>Tủ Sách Tuyển Chọn Học Thuật</span>
            <span className="text-xs font-sans font-semibold text-amber-800/80 bg-amber-100/90 border border-amber-300/80 px-2.5 py-0.5 rounded-full lowercase">
              10 ấn bản 2.5d
            </span>
          </h2>
        </div>

        {/* Shelf Navigation and Guidance */}
        <div className="flex items-center gap-3">
          <div className="text-[11px] font-medium text-[#7C6A5A] hidden sm:block">
            Rê chuột để rút sách tức thì • Cuộn ngang để xem đủ 10 cuốn
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => scrollShelf("left")}
              title="Cuộn tủ sách sang trái"
              className="p-1.5 rounded-xl bg-white/80 hover:bg-white text-[#5C4534] border border-[#D8C7AF] shadow-xs cursor-pointer transition hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollShelf("right")}
              title="Cuộn tủ sách sang phải"
              className="p-1.5 rounded-xl bg-white/80 hover:bg-white text-[#5C4534] border border-[#D8C7AF] shadow-xs cursor-pointer transition hover:scale-105 active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3D Shelf Stage with Horizontal Scroll */}
      <div 
        ref={scrollContainerRef}
        className="relative py-8 px-4 flex items-end gap-5 md:gap-6 overflow-x-auto scroll-smooth no-scrollbar min-h-[380px]"
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
              className={`relative block shrink-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer select-none ${
                isActive ? "z-40" : "z-10"
              }`}
              style={{
                width: "175px",
                height: "275px",
                transformStyle: "preserve-3d",
                transform: isActive
                  ? "rotateY(-6deg) translateZ(55px) translateY(-14px) scale(1.05)"
                  : "rotateY(-18deg) translateZ(0px)",
                filter: isActive
                  ? "drop-shadow(0 20px 30px rgba(70,45,25,0.4)) drop-shadow(0 0 16px rgba(217, 119, 6, 0.25))"
                  : "drop-shadow(4px 10px 16px rgba(60,40,20,0.25))",
                marginLeft: isActive ? "8px" : "0px",
                marginRight: isActive ? "12px" : "0px",
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
                    "inset 0 0 10px rgba(0,0,0,0.8), inset 2px 0 3px rgba(255,255,255,0.2), inset -2px 0 3px rgba(0,0,0,0.5)",
                }}
              >
                {/* Top Rib */}
                <div className="w-full h-1 bg-white/20 shadow-sm" />

                {/* Dewey Decimal Tag */}
                <div className="w-[85%] bg-[#F3ECDC] text-[#241A12] font-mono font-bold text-[7.5px] p-0.5 rounded-[1px] text-center leading-tight shadow-sm border border-[#9A8167]">
                  {book.dewey.split("\n").map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>

                {/* Vertical Spine Title */}
                <span className="text-[9px] font-serif font-semibold tracking-widest uppercase rotate-90 whitespace-nowrap text-amber-100 my-auto drop-shadow-xs">
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
                  className="absolute bottom-[-26px] left-1/2 -translate-x-1/2 w-3.5 h-8 shadow-md z-10"
                  style={{
                    background:
                      book.ribbonColor === "red"
                        ? "linear-gradient(135deg, #9B1C1C 0%, #D83B3B 50%, #771212 100%)"
                        : book.ribbonColor === "gold"
                        ? "linear-gradient(135deg, #B58525 0%, #F0C65A 50%, #8C6514 100%)"
                        : "linear-gradient(135deg, #0E6548 0%, #17A376 50%, #0B4834 100%)",
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 50% 80%, 0% 100%)",
                  }}
                  title={book.ribbonLabel}
                />
              )}

              {/* Front Cover */}
              <div
                className="absolute inset-0 rounded-r-md rounded-l-[1px] p-3 flex flex-col justify-between overflow-hidden border border-amber-900/15"
                style={{
                  backgroundColor: book.coverBg,
                  boxShadow: "inset 4px 0 8px rgba(0,0,0,0.4)",
                }}
              >
                <div className="relative">
                  <img
                    src={book.image}
                    alt={book.coverTitle}
                    className="w-full h-32 object-cover rounded shadow-md mb-2"
                  />
                  {book.isSpotlight ? (
                    <span className="absolute top-1 right-1 bg-amber-500 text-black text-[8px] font-serif font-bold px-1.5 py-0.5 rounded shadow-sm">
                      ĐANG ĐỌC DỞ
                    </span>
                  ) : (
                    <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/75 text-neutral-200 text-[7.5px] font-mono border border-white/10">
                      {book.sourceLabel}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <span className="text-[8.5px] font-mono text-amber-300 font-semibold tracking-wider uppercase block truncate">
                    {book.sourceLabel}
                  </span>
                  <h4 className="text-xs font-serif font-bold text-white leading-tight line-clamp-2">
                    {book.coverTitle}
                  </h4>
                  <div className="flex items-center justify-between text-[9px] font-mono text-neutral-300 pt-1 border-t border-white/15">
                    <span>{book.wordCount}</span>
                    <span className="text-emerald-300 font-bold">{book.lexiconCount}</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Warm Oak Hardwood Shelf Ledge */}
      <div className="relative mt-[-8px] z-20">
        {/* Top Edge of Hardwood Plank */}
        <div
          className="h-2.5 w-full"
          style={{
            background: "linear-gradient(90deg, #8A5A36 0%, #BA8558 20%, #A06F45 65%, #7D5130 100%)",
            boxShadow: "inset 0 1px 2px rgba(255,255,255,0.45)",
            transform: "skewX(-45deg)",
            transformOrigin: "bottom",
          }}
        />
        {/* Front Hardwood Beam */}
        <div
          className="h-6 w-full rounded-sm"
          style={{
            background: "linear-gradient(180deg, #A87349 0%, #7D5231 45%, #56361E 100%)",
            boxShadow:
              "0 12px 24px rgba(75,50,30,0.35), inset 0 1px 2px rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.6)",
          }}
        />
        {/* Subtle Warm Amber Reflection on Floor */}
        <div
          className="absolute top-full left-0 right-0 h-16 pointer-events-none opacity-30 blur-[2px]"
          style={{
            background: "linear-gradient(to bottom, rgba(186, 133, 88, 0.25) 0%, rgba(255,255,255,0.05) 30%, transparent 80%)",
            transformOrigin: "top center",
            transform: "scaleY(-1)",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, transparent 85%)",
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, transparent 85%)",
          }}
        />
      </div>

      {/* Inspection HUD Bar at Bottom - Warm Academic Theme */}
      <div className="mt-8 pt-4 border-t border-[#D8C7AF] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/90 p-4 rounded-2xl border border-[#D5C4AA] shadow-xs backdrop-blur-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 font-mono text-[10px] font-black border border-amber-300">
              {activeBook.dewey.replace("\n", " ")}
            </span>
            <span className="text-xs font-mono text-[#7C6A5A] uppercase tracking-wide font-semibold">
              {activeBook.sourceLabel}
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-serif font-black text-[#2C1D13]">
            {activeBook.coverTitle}
          </h3>
          <p className="text-xs text-[#6B5747] font-serif italic max-w-xl">
            {activeBook.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-4 self-end sm:self-center">
          <div className="text-right font-mono text-xs hidden md:block">
            <div className="text-[#7C6A5A]">{activeBook.wordCount}</div>
            <div className="text-emerald-700 font-bold">{activeBook.lexiconCount}</div>
          </div>
          <Link
            to={`/reading/${activeBook.caseId}`}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-serif font-bold text-xs tracking-wider transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 cursor-pointer"
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
