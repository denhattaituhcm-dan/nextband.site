import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";

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
    thicknessPx: 26,
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
    thicknessPx: 32,
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
    thicknessPx: 28,
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
    thicknessPx: 24,
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
    thicknessPx: 28,
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
    thicknessPx: 24,
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
    thicknessPx: 26,
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
    thicknessPx: 25,
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
    thicknessPx: 30,
    spineColor: "linear-gradient(90deg, #1C2738 0%, #2F425E 55%, #202D40 100%)",
    coverBg: "#1A2536",
    ribbonColor: "red",
    ribbonLabel: "Kinh tế vĩ mô",
  },
];

export const MasterCuratorShelf: React.FC = () => {
  const [activeCaseId, setActiveCaseId] = useState<string>("case-015");
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = (caseId: string) => {
    if (activeCaseId !== caseId) {
      setActiveCaseId(caseId);
    }
  };

  const scrollShelf = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const offset = direction === "left" ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const activeBook = CURATED_BOOKS.find((b) => b.caseId === activeCaseId) || CURATED_BOOKS[1];

  return (
    <section className="my-8 rounded-3xl bg-[#ECE2D0] border-2 border-[#D8C7AF] p-5 sm:p-7 shadow-[0_20px_45px_rgba(70,45,20,0.12)] relative overflow-hidden">
      {/* Real Wood Grain Backdrop Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-25 mix-blend-multiply"
        style={{
          backgroundImage: "repeating-linear-gradient(90deg, rgba(120, 80, 40, 0.08) 0px, rgba(120, 80, 40, 0.08) 2px, transparent 2px, transparent 48px)",
        }}
      />

      {/* Top Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D2BFAB] pb-4 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-700 shadow-[0_0_8px_rgba(180,83,9,0.5)]" />
          <h2 className="font-serif text-base sm:text-lg tracking-wide text-[#3C2516] font-bold uppercase flex items-center gap-2">
            <span>Tủ Sách Tuyển Chọn Học Thuật</span>
            <span className="text-[11px] font-sans font-semibold text-amber-900 bg-amber-100/90 border border-amber-300 px-2 py-0.5 rounded-full lowercase">
              10 ấn bản 2.5d
            </span>
          </h2>
        </div>

        {/* Navigation & Hint */}
        <div className="flex items-center gap-3">
          <div className="text-[11px] font-medium text-[#7A6452] hidden sm:block">
            Rê chuột để nhấc sách • Cuộn ngang để xem đủ 10 cuốn
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => scrollShelf("left")}
              title="Cuộn tủ sách sang trái"
              className="p-1.5 rounded-xl bg-white/90 hover:bg-white text-[#4A3222] border border-[#CBB399] shadow-xs cursor-pointer transition hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollShelf("right")}
              title="Cuộn tủ sách sang phải"
              className="p-1.5 rounded-xl bg-white/90 hover:bg-white text-[#4A3222] border border-[#CBB399] shadow-xs cursor-pointer transition hover:scale-105 active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3D Shelf Stage: Books standing firmly upright on shelf with realistic perspective */}
      <div 
        ref={scrollContainerRef}
        className="relative pt-8 pb-3 px-6 flex items-end gap-5 overflow-x-auto scroll-smooth no-scrollbar min-h-[360px]"
        style={{
          perspective: "1000px",
          perspectiveOrigin: "50% 80%",
        }}
      >
        {CURATED_BOOKS.map((book) => {
          const isActive = book.caseId === activeCaseId;

          return (
            <Link
              key={book.caseId}
              to={`/reading/${book.caseId}`}
              onMouseEnter={() => handleMouseEnter(book.caseId)}
              className={`relative block shrink-0 cursor-pointer select-none transition-transform duration-200 ease-out will-change-transform ${
                isActive ? "z-30" : "z-10"
              }`}
              style={{
                width: "172px",
                height: "268px",
                transform: isActive
                  ? "translateY(-22px) scale(1.03)"
                  : "translateY(0px) scale(1)",
                transformOrigin: "bottom center",
              }}
            >
              {/* Natural Book Spine with 3D Bevel Edge */}
              <div
                className="absolute left-0 top-0 h-full flex flex-col justify-between items-center py-2 px-1 rounded-l-[3px] border-r border-black/30"
                style={{
                  width: `${book.thicknessPx}px`,
                  background: book.spineColor,
                  boxShadow:
                    "inset 1px 0 2px rgba(255,255,255,0.25), inset -2px 0 5px rgba(0,0,0,0.6)",
                }}
              >
                {/* Spine Top Emboss */}
                <div className="w-full h-0.5 bg-white/20" />

                {/* Dewey Decimal Tag */}
                <div className="w-[88%] bg-[#F3EBD8] text-[#241A12] font-mono font-bold text-[7px] p-0.5 rounded-[1px] text-center leading-tight shadow-xs border border-[#8C7359]">
                  {book.dewey.split("\n").map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>

                {/* Vertical Spine Title */}
                <span className="text-[8.5px] font-serif font-semibold tracking-widest uppercase rotate-90 whitespace-nowrap text-amber-100 my-auto drop-shadow-xs">
                  {book.spineTitle}
                </span>

                {/* Spine Bottom Emboss */}
                <div className="w-full h-0.5 bg-white/20" />

                {/* Case Code */}
                <span className="text-[7.5px] font-mono text-amber-300 font-bold">
                  {book.caseId.toUpperCase().replace("CASE-", "C-")}
                </span>
              </div>

              {/* Silk Ribbon Bookmark */}
              {book.ribbonColor && (
                <div
                  className="absolute bottom-[-18px] left-[55%] -translate-x-1/2 w-3.5 h-6 shadow-md z-20 pointer-events-none"
                  style={{
                    background:
                      book.ribbonColor === "red"
                        ? "linear-gradient(135deg, #991B1B 0%, #DC2626 50%, #7F1D1D 100%)"
                        : book.ribbonColor === "gold"
                        ? "linear-gradient(135deg, #B45309 0%, #F59E0B 50%, #78350F 100%)"
                        : "linear-gradient(135deg, #065F46 0%, #10B981 50%, #064E3B 100%)",
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 50% 80%, 0% 100%)",
                  }}
                  title={book.ribbonLabel}
                />
              )}

              {/* Front Book Cover (Sits flush to the right of the spine) */}
              <div
                className="absolute top-0 bottom-0 right-0 rounded-r-md p-3 flex flex-col justify-between overflow-hidden border-t border-r border-b border-white/20"
                style={{
                  left: `${book.thicknessPx - 1}px`,
                  backgroundColor: book.coverBg,
                  boxShadow: isActive
                    ? "0 18px 28px rgba(50,30,15,0.35), inset 3px 0 6px rgba(0,0,0,0.5)"
                    : "0 6px 12px rgba(50,30,15,0.18), inset 3px 0 5px rgba(0,0,0,0.4)",
                }}
              >
                {/* Book Thumbnail */}
                <div className="relative">
                  <img
                    src={book.image}
                    alt={book.coverTitle}
                    className="w-full h-32 object-cover rounded shadow-sm mb-2"
                  />
                  {book.isSpotlight ? (
                    <span className="absolute top-1 right-1 bg-amber-500 text-black text-[8px] font-serif font-bold px-1.5 py-0.5 rounded shadow-xs">
                      ĐANG ĐỌC DỞ
                    </span>
                  ) : (
                    <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/75 text-neutral-200 text-[7px] font-mono border border-white/10">
                      {book.sourceLabel}
                    </span>
                  )}
                </div>

                {/* Typography on Cover */}
                <div className="space-y-1">
                  <span className="text-[8px] font-mono text-amber-300 font-semibold tracking-wider uppercase block truncate">
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

              {/* Ground Shadow under each book */}
              <div 
                className={`absolute bottom-[-6px] left-2 right-2 h-2 rounded-full bg-black/35 blur-[3px] transition-opacity duration-200 pointer-events-none ${
                  isActive ? "opacity-20 scale-95" : "opacity-50"
                }`}
              />
            </Link>
          );
        })}
      </div>

      {/* Realistic Solid Oak Shelf Plank (Thanh gỗ đỡ chịu lực phía dưới chân sách) */}
      <div className="relative z-20">
        {/* Top Plane: Where books rest (mặt trên thanh gỗ) */}
        <div
          className="h-3 w-full"
          style={{
            background: "linear-gradient(90deg, #A77348 0%, #C9966B 20%, #B88358 60%, #9B673E 100%)",
            boxShadow: "inset 0 1px 1px rgba(255,255,255,0.6), inset 0 -1px 2px rgba(0,0,0,0.2)",
          }}
        />
        {/* Front Edge: Dày 14px với rãnh chỉ vân gỗ thật */}
        <div
          className="h-4 w-full rounded-b-xs flex flex-col justify-between"
          style={{
            background: "linear-gradient(180deg, #8A572F 0%, #6E401E 50%, #4D2B12 100%)",
            boxShadow: "0 10px 18px rgba(50,28,10,0.35), inset 0 1px 1px rgba(255,255,255,0.25)",
          }}
        >
          {/* Subtle wood bevel groove line */}
          <div className="w-full h-px bg-black/30 mt-1" />
          <div className="w-full h-px bg-white/10 mb-0.5" />
        </div>
      </div>

      {/* Inspection HUD Bar at Bottom - Warm Academic Theme */}
      <div className="mt-7 pt-4 border-t border-[#D5C2AB] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/95 p-4 rounded-2xl border border-[#D5C2AB] shadow-xs backdrop-blur-xs">
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
