import React, { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { SEO } from "@/components/common/SEO";
import {
  Volume2,
  ArrowRight,
  Compass,
  BookOpen,
  Sparkles,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";
import { MasterCuratorShelf } from "@/features/reading/components/MasterCuratorShelf";
import { VOCAB_IN_USE_UNITS } from "@/data/vocabInUse";
import {
  READING_CASE_CATALOG,
  READING_LEVEL_TIERS,
  READING_TOPICS,
} from "@/data/readingCases/caseRegistry";
import {
  ReadingLevelTier,
  ReadingStatusFilter,
  ReadingTopicFilter,
} from "@/features/reading/types";
import { useReadingProgress } from "@/features/reading/hooks/useReadingProgress";
import "@/features/reading/reading-container.css";

const VALID_LEVELS = new Set<ReadingLevelTier>(["all", "foundation", "c1", "c2"]);
const VALID_TOPICS = new Set<ReadingTopicFilter>([
  "all",
  "mindset",
  "science",
  "tech",
  "education",
  "society",
  "economics",
]);
const VALID_STATUSES = new Set<ReadingStatusFilter>(["all", "unread", "read"]);

export default function ReadingUniversePage() {
  const [popoverOpen, setPopoverOpen] = useState(true);
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { progressMap } = useReadingProgress();

  const rawLevel = searchParams.get("level") as ReadingLevelTier | null;
  const rawTopic = searchParams.get("topic") as ReadingTopicFilter | null;
  const rawStatus = searchParams.get("status") as ReadingStatusFilter | null;

  const selectedLevel: ReadingLevelTier =
    rawLevel && VALID_LEVELS.has(rawLevel) ? rawLevel : "all";
  const selectedTopic: ReadingTopicFilter =
    rawTopic && VALID_TOPICS.has(rawTopic) ? rawTopic : "all";
  const selectedStatus: ReadingStatusFilter =
    rawStatus && VALID_STATUSES.has(rawStatus) ? rawStatus : "all";

  const updateFilterParams = (updates: {
    level?: ReadingLevelTier;
    topic?: ReadingTopicFilter;
    status?: ReadingStatusFilter;
  }) => {
    const next = new URLSearchParams(searchParams);
    const nextLevel = updates.level ?? selectedLevel;
    const nextTopic = updates.topic ?? selectedTopic;
    const nextStatus = updates.status ?? selectedStatus;

    if (nextLevel === "all") next.delete("level");
    else next.set("level", nextLevel);

    if (nextTopic === "all") next.delete("topic");
    else next.set("topic", nextTopic);

    if (nextStatus === "all") next.delete("status");
    else next.set("status", nextStatus);

    setSearchParams(next, { replace: true });
  };

  const resetAllFilters = () => {
    const next = new URLSearchParams(searchParams);
    next.delete("level");
    next.delete("topic");
    next.delete("status");
    setSearchParams(next, { replace: true });
  };

  const readCount = useMemo(
    () =>
      READING_CASE_CATALOG.filter((item) => Boolean(progressMap[item.id]?.isRead))
        .length,
    [progressMap]
  );

  const levelCounts = useMemo(() => {
    const counts: Record<ReadingLevelTier, number> = {
      all: 0,
      foundation: 0,
      c1: 0,
      c2: 0,
    };
    for (const item of READING_CASE_CATALOG) {
      const topicMatch =
        selectedTopic === "all" || item.topics.includes(selectedTopic);
      const isRead = Boolean(progressMap[item.id]?.isRead);
      const statusMatch =
        selectedStatus === "all" ||
        (selectedStatus === "read" && isRead) ||
        (selectedStatus === "unread" && !isRead);
      if (topicMatch && statusMatch) {
        counts.all += 1;
        counts[item.levelTier] += 1;
      }
    }
    return counts;
  }, [progressMap, selectedStatus, selectedTopic]);

  const filteredCatalog = useMemo(() => {
    return READING_CASE_CATALOG.filter((item) => {
      const levelMatch =
        selectedLevel === "all" || item.levelTier === selectedLevel;
      const topicMatch =
        selectedTopic === "all" || item.topics.includes(selectedTopic);
      const isRead = Boolean(progressMap[item.id]?.isRead);
      const statusMatch =
        selectedStatus === "all" ||
        (selectedStatus === "read" && isRead) ||
        (selectedStatus === "unread" && !isRead);
      return levelMatch && topicMatch && statusMatch;
    });
  }, [progressMap, selectedLevel, selectedStatus, selectedTopic]);

  const handleRandomDiscovery = () => {
    const unread = READING_CASE_CATALOG.filter(
      (item) => !progressMap[item.id]?.isRead
    );
    const pool = unread.length > 0 ? unread : READING_CASE_CATALOG;
    const picked = pool[Math.floor(Math.random() * pool.length)] || READING_CASE_CATALOG[0];
    navigate(`/reading/${picked.id}`);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D2825] font-sans selection:bg-[#F2DBD3] selection:text-[#2D2825]">
      <SEO
        title="ARIS Reading Library — Chạm từng chữ. Thấu hiểu cả thế giới."
        description="Không gian đọc học thuật và tích lũy vốn từ tự nhiên. Nhấp vào từ bất kỳ để thấu hiểu nghĩa ngữ cảnh và nghe phát âm chuẩn bản ngữ."
      />

      {/* Academic Sub-nav Header */}
      <nav className="border-b border-[#EAE3D9] bg-[#FAF7F2]/95 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          {/* Navigation Tabs */}
          <div className="flex items-center gap-6 sm:gap-8 text-xs font-medium text-[#7A7067]">
            <a
              href="#tu-sach"
              className="text-[#2D2825] font-semibold border-b-2 border-[#2D2825] pb-1 transition-all"
            >
              Tủ sách tương tác
            </a>
            <Link
              to="/ielts-speaking-forecast"
              className="hover:text-[#2D2825] transition-colors pb-1 flex items-center gap-1.5 font-semibold text-[#002147]"
            >
              <span>Speaking Forecast</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-rose-100 text-rose-700 font-bold">HOT</span>
            </Link>
            <a
              href="#von-tu"
              className="hover:text-[#2D2825] transition-colors pb-1"
            >
              Vốn từ tích lũy
            </a>
          </div>

          {/* Right Meta Info */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-[#9E948A] hidden sm:inline">
              VOLUME 2026.10
            </span>
            <button
              type="button"
              onClick={handleRandomDiscovery}
              className="px-3.5 py-1.5 rounded-full bg-[#EFE9DF] text-[#635951] text-xs font-semibold hover:bg-[#E5DDCF] transition cursor-pointer"
            >
              Khám phá ngẫu nhiên 🎲
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-16 sm:space-y-20">
        {/* Hero Section with Interactive Playground */}
        <section className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#241F1C] tracking-tight font-normal leading-[1.15]">
            Chạm từng chữ.
            <br />
            <em className="italic text-[#C86D51] font-normal">
              Thấu hiểu cả thế giới.
            </em>
          </h1>

          {/* The "Show, Don't Tell" Micro-interactive Box */}
          <div className="bg-white rounded-3xl border border-[#E8E1D5] p-6 sm:p-9 shadow-sm shadow-[#2D2825]/5 text-left relative max-w-3xl mx-auto mt-8">
            <div className="flex items-center justify-between text-xs text-[#A1978E] pb-4 border-b border-[#F2ECE2]">
              <span className="font-mono tracking-wider text-[11px]">
                ▶ TRẢI NGHIỆM ĐỌC THỬ TẠI CHỖ
              </span>
              <span className="text-[#C86D51] bg-[#FBEBE5] px-3 py-1 rounded-full font-medium text-xs">
                Chạm từ gạch chân ↘
              </span>
            </div>

            <p className="text-xl sm:text-2xl text-[#2E2723] leading-relaxed pt-6 pb-2 font-serif font-normal">
              “Warren Buffett spent eighty percent of his day{" "}
              <button
                type="button"
                onClick={() => setPopoverOpen(!popoverOpen)}
                className={`relative cursor-pointer inline-block border-b-2 border-dashed border-[#C86D51] pb-0.5 text-[#9C4124] font-semibold transition-all px-1 rounded-sm ${
                  popoverOpen ? "bg-[#FBEBE5] border-transparent" : "hover:bg-[#FBEBE5]"
                }`}
              >
                leveraging
              </button>{" "}
              quiet reflection instead of endless meetings.”
            </p>

            {/* Popover Simulation */}
            {popoverOpen && (
              <div className="mt-5 p-5 sm:p-6 rounded-2xl bg-[#28221F] text-white relative shadow-2xl border border-white/5 space-y-3 transition-all animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-2xl text-amber-200 font-medium tracking-wide">
                      leveraging
                    </span>
                    <span className="text-white/60 text-sm font-mono">
                      /ˈlev.ɚ.ɪdʒ.ɪŋ/
                    </span>
                    <span className="text-[11px] uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded text-white/80 font-mono">
                      verb · transitive
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if ("speechSynthesis" in window) {
                        const utterance = new SpeechSynthesisUtterance("leveraging");
                        utterance.lang = "en-US";
                        window.speechSynthesis.speak(utterance);
                      }
                    }}
                    className="text-white/90 hover:text-white text-xs flex items-center gap-1.5 bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    <Volume2 className="h-3.5 w-3.5 text-amber-300" />
                    <span>Nghe bản xứ</span>
                  </button>
                </div>

                <p className="text-sm sm:text-base text-white/90 leading-relaxed font-light pt-1">
                  <strong className="text-amber-200 font-medium text-base">
                    Đòn bẩy / Khai thác tối đa:
                  </strong>{" "}
                  Sử dụng một nguồn lực có sẵn (thời gian, kiến thức, sự tập trung) để tạo ra hiệu quả hoặc sức ảnh hưởng vượt trội gấp bội.
                </p>

                <div className="text-xs text-white/50 pt-2 border-t border-white/5 flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="italic font-serif text-sm text-white/70">
                    Collocation thường gặp:
                  </span>
                  <span>• leverage resources</span>
                  <span>• leverage technology</span>
                  <span>• strategic leverage</span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Master Curator 2.5D Shelf Spotlight */}
        <MasterCuratorShelf />

        {/* Reading Feed Section */}
        <section id="tu-sach" className="space-y-6 pt-2">
          <div className="space-y-4 border-b border-[#EAE3D9] pb-5">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#241F1C]">
                  Bài đọc tuyển chọn tuần này
                </h2>
                <p className="text-xs text-[#8C827A] mt-1 font-light">
                  Không bài tập, không đếm ngược — chỉ có kiến thức và từ vựng tinh chọn.
                </p>
              </div>

              {/* Overall Reading Progress + Read Status Filter */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E5DDCF] text-xs font-semibold text-[#4E453E] shadow-2xs">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  <span>
                    Đã đọc {readCount}/{READING_CASE_CATALOG.length} bài
                  </span>
                </span>

                <div
                  role="group"
                  aria-label="Lọc theo trạng thái đọc"
                  className="inline-flex items-center gap-1 bg-[#EFE9DF] p-0.5 rounded-xl"
                >
                  {(
                    [
                      { id: "all", label: "Tất cả" },
                      { id: "unread", label: "Chưa đọc" },
                      { id: "read", label: "Đã đọc" },
                    ] as const
                  ).map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => updateFilterParams({ status: st.id })}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition cursor-pointer ${
                        selectedStatus === st.id
                          ? "bg-[#2D2825] text-white shadow-2xs"
                          : "text-[#635951] hover:text-[#2D2825]"
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Level Tiers Filter Bar (URL synced ?level=...) */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#8C827A] mr-1">
                  Trình độ:
                </span>
                {READING_LEVEL_TIERS.map((tier) => {
                  const isActive = selectedLevel === tier.id;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => updateFilterParams({ level: tier.id })}
                      title={tier.description}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer border ${
                        isActive
                          ? "bg-[#C86D51] text-white border-[#B55B3F] shadow-xs"
                          : "bg-white text-[#574D44] border-[#E5DDCF] hover:border-[#C86D51]/60 hover:text-[#2D2825]"
                      }`}
                    >
                      <span>{tier.shortLabel}</span>
                      <span
                        className={`ml-1.5 text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-[#EFE9DF] text-[#635951]"
                        }`}
                      >
                        {levelCounts[tier.id]}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Topic Filter Bar (URL synced ?topic=...) */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#8C827A] mr-1">
                  Chủ đề:
                </span>
                {READING_TOPICS.map((topic) => (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => updateFilterParams({ topic: topic.id })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                      selectedTopic === topic.id
                        ? "bg-[#2D2825] text-white"
                        : "bg-[#EFE9DF] text-[#635951] hover:bg-[#E5DDCF]"
                    }`}
                  >
                    {topic.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Data-Driven Reading Cards Grid with CSS Container Queries */}
          {filteredCatalog.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#DFD5C7] bg-white p-10 text-center space-y-3">
              <p className="font-serif text-xl text-[#2D2825]">
                Không có bài đọc nào khớp với bộ lọc hiện tại
              </p>
              <p className="text-xs text-[#8C827A]">
                Hãy thử chọn lại trình độ, chủ đề hoặc trạng thái đọc khác.
              </p>
              <button
                type="button"
                onClick={resetAllFilters}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2D2825] text-white text-xs font-semibold hover:bg-[#3F3834] transition cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Đặt lại bộ lọc</span>
              </button>
            </div>
          ) : (
            <div className="reading-shelf-cq">
              <div className="reading-shelf-grid">
                {filteredCatalog.map((item) => {
                  const prog = progressMap[item.id];
                  const isRead = Boolean(prog?.isRead);
                  const scrollPercent = prog?.scrollPercent ?? 0;
                  const tasksCompleted = prog?.tasksCompleted ?? 0;
                  const inProgress = !isRead && (scrollPercent > 0 || tasksCompleted > 0);
                  const isBrokenImg = Boolean(brokenImages[item.id]);

                  const pubBadgeClass =
                    item.publicationBadgeVariant === "red"
                      ? "bg-[#E53E3E] text-white font-bold tracking-wider"
                      : item.publicationBadgeVariant === "amber"
                      ? "bg-[#D97706] text-white font-bold tracking-wider"
                      : item.publicationBadgeVariant === "teal"
                      ? "bg-[#0D9488] text-white font-bold tracking-wider"
                      : item.publicationBadgeVariant === "gold"
                      ? "bg-[#F59E0B] text-[#2D2825] font-bold tracking-wider"
                      : "bg-white/90 text-[#2D2825] font-medium";

                  return (
                    <article
                      key={item.id}
                      className="reading-card-cq group bg-white rounded-2xl border border-[#EAE3D9] overflow-hidden hover:border-[#C86D51]/50 hover:shadow-xl hover:shadow-[#2D2825]/5 transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        <div className="aspect-[16/9] bg-[#EFE9DF] relative overflow-hidden">
                          {!isBrokenImg ? (
                            <img
                              src={item.imageUrl}
                              alt={item.imageAlt}
                              onError={() =>
                                setBrokenImages((prev) => ({
                                  ...prev,
                                  [item.id]: true,
                                }))
                              }
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                          ) : (
                            <div
                              className="w-full h-full p-5 flex flex-col justify-between bg-[#F3ECE1] relative"
                              style={{
                                backgroundImage:
                                  "radial-gradient(rgba(45,40,37,0.08) 1px, transparent 1px)",
                                backgroundSize: "14px 14px",
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <span
                                  className="h-9 w-9 rounded-xl flex items-center justify-center text-white text-xs font-mono font-black shadow-xs"
                                  style={{ backgroundColor: item.accentColor }}
                                >
                                  {item.publicationMonogram}
                                </span>
                              </div>
                              <div className="flex items-end justify-between">
                                <span className="text-[11px] font-mono uppercase tracking-wider text-[#635951]">
                                  {item.publication}
                                </span>
                                <span className="font-serif text-4xl font-black text-[#2D2825]/15 leading-none select-none">
                                  {item.cefrLabel}
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Top-left Source & Topic Badges */}
                          <div className="absolute top-3.5 left-3.5 right-3.5 flex items-start justify-between gap-2 pointer-events-none">
                            <div className="flex flex-wrap gap-1.5">
                              <span className="px-2.5 py-1 rounded-md bg-[#2D2825]/85 backdrop-blur-md text-white text-[11px] font-medium">
                                {item.badgeCategory}
                              </span>
                              <span
                                className={`px-2.5 py-1 rounded-md backdrop-blur-md text-[11px] ${pubBadgeClass}`}
                              >
                                {item.publication}
                              </span>
                            </div>

                            {/* Top-right Level & Read Status Badges */}
                            <div className="flex flex-col items-end gap-1 shrink-0">
                              <span className="px-2 py-0.5 rounded-md bg-white/95 backdrop-blur-md text-[#2D2825] text-[10px] font-mono font-bold shadow-xs border border-black/5">
                                {item.cefrLabel} · {item.ieltsBand.toFixed(1)}
                              </span>
                              {isRead && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-600/95 backdrop-blur-md text-white text-[10px] font-bold shadow-xs">
                                  <CheckCircle2 className="h-3 w-3" />
                                  Đã đọc
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="reading-card-body space-y-2.5">
                          {/* Quiet Academic Metadata */}
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#8A7E75] font-light">
                            <span>{item.readingNumber}</span>
                            <span>·</span>
                            <span>{item.displayReadTime}</span>
                            <span>·</span>
                            <span
                              className="font-semibold"
                              style={{ color: item.accentColor }}
                            >
                              {item.highlightMeta}
                            </span>
                            {item.subMeta && (
                              <>
                                <span>·</span>
                                <span>{item.subMeta}</span>
                              </>
                            )}
                          </div>

                          <h3 className="reading-card-title font-serif font-medium text-[#241F1C] group-hover:text-[#C86D51] transition-colors">
                            <Link to={`/reading/${item.id}`}>
                              {item.titleVi}
                            </Link>
                          </h3>

                          <p className="text-xs text-[#7D736A] italic leading-snug line-clamp-2">
                            {item.titleEn}
                          </p>

                          {item.summaryVi && (
                            <p className="text-sm text-[#6E645D] leading-relaxed line-clamp-3 font-light pt-0.5">
                              {item.summaryVi}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="px-6 sm:px-7 pb-5 pt-3 border-t border-[#F5EFE7] flex items-center justify-between gap-3 text-xs text-[#8C827A]">
                        <div className="min-w-0 flex-1">
                          {isRead ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              Đã hoàn thành
                            </span>
                          ) : inProgress ? (
                            <div className="space-y-1 max-w-[160px]">
                              <div className="flex items-center justify-between text-[10px] font-medium text-[#635951]">
                                <span>Đang đọc {scrollPercent}%</span>
                                {tasksCompleted > 0 && <span>{tasksCompleted}/4 câu</span>}
                              </div>
                              <div className="h-1.5 w-full rounded-full bg-[#EFE9DF] overflow-hidden">
                                <div
                                  className="h-full bg-[#C86D51] rounded-full transition-all"
                                  style={{ width: `${Math.max(8, scrollPercent)}%` }}
                                />
                              </div>
                            </div>
                          ) : (
                            <span className="text-[11px] text-[#9E948A]">
                              Band {item.ieltsBand.toFixed(1)} · {item.cefrLabel}
                            </span>
                          )}
                        </div>

                        <Link
                          to={`/reading/${item.id}`}
                          className="group-hover:translate-x-1 transition-transform font-semibold flex items-center gap-1 shrink-0"
                          style={{ color: item.accentColor }}
                        >
                          {isRead
                            ? "Đọc lại"
                            : inProgress
                            ? "Tiếp tục đọc"
                            : "Bắt đầu đọc"}{" "}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {/* Academic Reading Methodology Philosophy Section */}
        <section id="phuong-phap" className="border-t border-[#ECE5DD] pt-14 pb-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#C86D51] font-medium flex items-center justify-center gap-1.5">
              <Compass className="h-3.5 w-3.5 text-[#C86D51]" />
              Triết lý học từ bản chất
            </span>
            <h4 className="font-serif text-2xl sm:text-3xl text-[#221C18] font-normal">
              Đọc không phải để đối phó thi cử. Đọc là để mở rộng nhãn quan.
            </h4>
            <p className="text-xs sm:text-sm text-[#73685E] leading-relaxed font-light">
              Khi rũ bỏ đồng hồ đếm ngược và áp lực chọn đáp án trắc nghiệm, bộ não sẽ bước vào trạng thái tiếp nhận ngôn ngữ tự nhiên nhất: quan sát cấu trúc ngữ pháp, chiêm nghiệm ý tưởng và thẩm thấu từ vựng đúng ngữ cảnh sống.
            </p>
          </div>
        </section>

        {/* Digitized Vocabulary in Use Shelf Section (#von-tu) */}
        <section
          id="von-tu"
          className="rounded-3xl bg-white border border-[#E5DCCD] p-6 sm:p-9 shadow-sm space-y-6"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#F2ECE2] pb-5">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-[#FBEBE5] text-[#9C4124] font-semibold">
                <Sparkles className="h-3.5 w-3.5" />
                Tủ sách Số hóa · Interactive 2-Page Spread
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#241F1C]">
                English Vocabulary in Use (C1–C2 Studio)
              </h2>
              <p className="text-sm sm:text-base text-[#4E453E] max-w-2xl font-light leading-relaxed">
                Mô hình học 2 trang đối xứng: <strong>Trang trái</strong> đọc bài ngữ cảnh tích hợp tra từ & phát âm bản xứ tức thì; <strong>Trang phải</strong> luyện các dạng bài tập tuyển chọn trực quan có chấm điểm và giải thích song ngữ.
              </p>
            </div>
            <Link
              to="/vocab-in-use"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#002147] hover:bg-[#00336E] text-white text-sm font-bold tracking-wide transition shadow-sm shrink-0 self-start md:self-auto"
            >
              <BookOpen className="h-4 w-4 text-amber-300" />
              <span>Xem danh mục &amp; Chọn Unit</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {VOCAB_IN_USE_UNITS.map((unit) => (
              <Link
                key={unit.unitId}
                to={`/vocab-in-use/${unit.unitId}`}
                className="group rounded-2xl border border-[#EAE3D9] bg-[#FAF7F2]/60 hover:bg-white hover:border-[#C86D51]/60 hover:shadow-md transition-all p-5 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2 text-xs font-mono">
                    <span className="px-2 py-0.5 rounded bg-[#002147] text-white font-bold">
                      UNIT {unit.unitId}
                    </span>
                    <span className="text-[#574D44]">
                      {unit.cefr} · {unit.estimatedMinutes} phút
                    </span>
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1F1A17] group-hover:text-[#C86D51] transition-colors leading-snug">
                    {unit.titleEn}
                  </h3>
                  <p className="text-sm font-medium text-[#574D44]">
                    {unit.titleVi}
                  </p>
                  <p className="text-sm text-[#4E453E] leading-relaxed line-clamp-3">
                    {unit.summaryVi}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#EAE3D9] flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-[#574D44]">
                    {unit.lexicon.length} từ · {unit.exercises.length} bài luyện
                  </span>
                  <span className="font-semibold text-[#C86D51] inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Học ngay <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Digitized Essential Vocabulary in Context 5 Shelf Section */}
        <section className="rounded-3xl bg-white border border-[#E5DCCD] p-6 sm:p-9 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#F2ECE2] pb-5">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-indigo-50 text-indigo-700 font-semibold">
                <Sparkles className="h-3.5 w-3.5" />
                Tủ sách Số hóa · 4-Stage Contextual Mastery
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#241F1C]">
                Essential Vocabulary in Context 5 (20 Units)
              </h2>
              <p className="text-sm sm:text-base text-[#4E453E] max-w-2xl font-light leading-relaxed">
                Hệ thống học từ vựng theo chủ đề qua <strong>Glossary đa nghĩa</strong> và <strong>4 cấp độ bài tập thực hành</strong> (Contextual MCQ → Synonym Replacement → Guided Cloze → Open Cloze) tích hợp Sổ từ SM-2.
              </p>
            </div>
            <Link
              to="/essential-vocabulary"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold tracking-wide transition shadow-sm shrink-0 self-start md:self-auto"
            >
              <BookOpen className="h-4 w-4 text-indigo-100" />
              <span>Mở Hub 20 Units</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { id: "evc5-u01", num: 1, title: "Looking good", vi: "Thời trang, trang sức & diện mạo", words: 32 },
              { id: "evc5-u02", num: 2, title: "Personality and behaviour", vi: "Tính cách & hành vi ứng xử", words: 29 },
              { id: "evc5-u03", num: 3, title: "Bad feelings", vi: "Cảm xúc tiêu cực & tâm trạng", words: 29 },
              { id: "evc5-u04", num: 4, title: "Good feelings", vi: "Cảm xúc tích cực & niềm vui", words: 29 },
              { id: "evc5-u05", num: 5, title: "Communication", vi: "Giao tiếp, ngôn ngữ & tín hiệu", words: 30 },
            ].map((u) => (
              <Link
                key={u.id}
                to={`/essential-vocabulary/unit/${u.id}`}
                className="group rounded-2xl border border-[#EAE3D9] bg-[#FAF7F2]/60 hover:bg-white hover:border-indigo-400 hover:shadow-md transition-all p-4 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1.5">
                  <span className="inline-block px-2 py-0.5 rounded bg-indigo-600 text-white text-[11px] font-mono font-bold">
                    UNIT {u.num}
                  </span>
                  <h3 className="font-serif text-base font-bold text-[#1F1A17] group-hover:text-indigo-600 transition-colors leading-snug">
                    {u.title}
                  </h3>
                  <p className="text-xs text-[#574D44]">{u.vi}</p>
                </div>
                <div className="pt-2 border-t border-[#EAE3D9] flex items-center justify-between text-xs">
                  <span className="text-[#574D44]">{u.words} mục từ · 30 câu</span>
                  <span className="font-semibold text-indigo-600 inline-flex items-center gap-0.5">
                    Học <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Footer Note */}
      <footer className="border-t border-[#EAE3D9] py-8 text-center text-xs text-[#A1978E] mt-12 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#2D2825]">Thư viện đọc hiểu tương tác</span>
            <span>· Tích lũy vốn từ học thuật tự nhiên</span>
          </div>
          <div>
            Chạm từng chữ · Thấu hiểu cả thế giới
          </div>
        </div>
      </footer>
    </div>
  );
}
