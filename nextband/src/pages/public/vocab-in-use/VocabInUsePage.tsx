import React, { useState, useEffect, useMemo } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { SEO } from "@/components/common/SEO";
import {
  ArrowLeft,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Columns2,
  Compass,
  FileText,
  Layers,
  PenTool,
  RotateCcw,
  Sparkles,
  Volume2,
  XCircle,
  Lock,
  Check,
  ChevronRight
} from "lucide-react";
import {
  VOCAB_IN_USE_UNITS,
  ROADMAP_CHAPTERS,
  getVocabInUseUnit,
  LexiconItem,
  ExerciseBlock,
  GapFillExercise,
  ClassifierExercise,
  SentenceUpgradeExercise
} from "@/data/vocabInUse";

const BOOKMARKS_STORAGE_KEY = "nb_vocab_in_use_bookmarks_v1";
const PROGRESS_STORAGE_KEY = "nb_vocab_in_use_progress_v1";

type ViewMode = "split" | "left" | "right" | "bookmarks";

interface SavedBookmarkItem {
  unitId: number;
  unitTitle: string;
  lexicon: LexiconItem;
}

function speakEnglish(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-GB";
    utterance.rate = 0.92;
    window.speechSynthesis.speak(utterance);
  } catch {
    // Graceful noop if speech synthesis is unavailable
  }
}

function normalizeAnswer(val: string): string {
  return val.trim().toLowerCase().replace(/\s+/g, " ");
}

function isGapCorrect(
  userAnswer: string,
  correctAnswer: string,
  acceptedAnswers?: string[]
): boolean {
  const normalized = normalizeAnswer(userAnswer);
  if (!normalized) return false;
  const targets = [correctAnswer, ...(acceptedAnswers || [])].map(normalizeAnswer);
  return targets.includes(normalized);
}

interface ExerciseScore {
  correct: number;
  total: number;
}

function computeExerciseScore(
  exercise: ExerciseBlock,
  answers: Record<string, string>,
  subAnswers: Record<string, string>
): ExerciseScore {
  if (exercise.kind === "gap_fill") {
    let correct = 0;
    for (const q of exercise.questions) {
      if (isGapCorrect(answers[q.id] || "", q.answer, q.acceptedAnswers)) {
        correct += 1;
      }
    }
    return { correct, total: exercise.questions.length };
  }

  if (exercise.kind === "classifier") {
    let correct = 0;
    for (const q of exercise.questions) {
      const catMatches = answers[q.id] === q.correctCategory;
      if (!catMatches) continue;
      if (
        q.subCorrectAnswer &&
        q.correctCategory === answers[q.id]
      ) {
        const subOk = isGapCorrect(
          subAnswers[q.id] || "",
          q.subCorrectAnswer,
          q.subAcceptedAnswers
        );
        if (subOk) correct += 1;
      } else {
        correct += 1;
      }
    }
    return { correct, total: exercise.questions.length };
  }

  let correct = 0;
  for (const q of exercise.questions) {
    if (answers[q.id] === q.correctOption) {
      correct += 1;
    }
  }
  return { correct, total: exercise.questions.length };
}

export default function VocabInUsePage() {
  const { unitId: unitParam } = useParams<{ unitId?: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const parsedUnitId = unitParam ? parseInt(unitParam, 10) : 1;
  const activeUnit = useMemo(
    () => getVocabInUseUnit(Number.isNaN(parsedUnitId) ? 1 : parsedUnitId),
    [parsedUnitId]
  );

  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [selectedLexiconId, setSelectedLexiconId] = useState<string>(
    activeUnit.lexicon[0]?.id || ""
  );
  const [roadmapOpen, setRoadmapOpen] = useState(false);

  // Answers & checked status per exercise
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [subAnswers, setSubAnswers] = useState<Record<string, string>>({});
  const [checkedExercises, setCheckedExercises] = useState<Record<string, boolean>>({});
  const [focusedGapId, setFocusedGapId] = useState<string | null>(null);

  // Persistent Bookmarks (unitId:lexiconId)
  const [bookmarkedKeys, setBookmarkedKeys] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore storage errors
    }
    return [];
  });

  // Persistent Exercise Progress (exerciseId -> "correct/total")
  const [exerciseProgress, setExerciseProgress] = useState<
    Record<string, ExerciseScore>
  >(() => {
    try {
      const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch {
      // ignore storage errors
    }
    return {};
  });

  useEffect(() => {
    setSelectedLexiconId(activeUnit.lexicon[0]?.id || "");
    setFocusedGapId(null);
  }, [activeUnit.unitId, activeUnit.lexicon]);

  useEffect(() => {
    try {
      localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarkedKeys));
    } catch {
      // ignore storage errors
    }
  }, [bookmarkedKeys]);

  useEffect(() => {
    try {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(exerciseProgress));
    } catch {
      // ignore storage errors
    }
  }, [exerciseProgress]);

  const activeLexicon = useMemo(
    () =>
      activeUnit.lexicon.find((l) => l.id === selectedLexiconId) ||
      activeUnit.lexicon[0],
    [activeUnit, selectedLexiconId]
  );

  const handleSelectUnit = (targetId: number) => {
    const baseRoute = location.pathname.startsWith("/reading/vocab-in-use")
      ? "/reading/vocab-in-use"
      : "/vocab-in-use";
    navigate(`${baseRoute}/${targetId}`);
    if (viewMode === "bookmarks") {
      setViewMode("split");
    }
  };

  const makeBookmarkKey = (uId: number, lexId: string) => `${uId}:${lexId}`;

  const isLexiconBookmarked = (uId: number, lexId: string) =>
    bookmarkedKeys.includes(makeBookmarkKey(uId, lexId));

  const toggleBookmark = (uId: number, lexId: string) => {
    const key = makeBookmarkKey(uId, lexId);
    setBookmarkedKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const savedBookmarkItems: SavedBookmarkItem[] = useMemo(() => {
    const result: SavedBookmarkItem[] = [];
    for (const unit of VOCAB_IN_USE_UNITS) {
      for (const lex of unit.lexicon) {
        if (bookmarkedKeys.includes(makeBookmarkKey(unit.unitId, lex.id))) {
          result.push({
            unitId: unit.unitId,
            unitTitle: `Unit ${unit.unitId}: ${unit.titleEn}`,
            lexicon: lex
          });
        }
      }
    }
    return result;
  }, [bookmarkedKeys]);

  const handleCheckExercise = (exercise: ExerciseBlock) => {
    const score = computeExerciseScore(exercise, answers, subAnswers);
    setCheckedExercises((prev) => ({ ...prev, [exercise.id]: true }));
    setExerciseProgress((prev) => ({ ...prev, [exercise.id]: score }));
  };

  const handleResetExercise = (exercise: ExerciseBlock) => {
    const qIds = new Set(exercise.questions.map((q) => q.id));
    setAnswers((prev) => {
      const next = { ...prev };
      qIds.forEach((id) => delete next[id]);
      return next;
    });
    setSubAnswers((prev) => {
      const next = { ...prev };
      qIds.forEach((id) => delete next[id]);
      return next;
    });
    setCheckedExercises((prev) => ({ ...prev, [exercise.id]: false }));
  };

  const handleWordBankPick = (exercise: GapFillExercise, word: string) => {
    if (checkedExercises[exercise.id]) return;
    const targetId =
      focusedGapId && exercise.questions.some((q) => q.id === focusedGapId)
        ? focusedGapId
        : exercise.questions.find((q) => !(answers[q.id] || "").trim())?.id ||
          exercise.questions[0]?.id;

    if (!targetId) return;
    setAnswers((prev) => ({ ...prev, [targetId]: word }));

    const nextEmpty = exercise.questions.find(
      (q) => q.id !== targetId && !(answers[q.id] || "").trim()
    );
    setFocusedGapId(nextEmpty ? nextEmpty.id : null);
  };

  const unitCompletedCount = activeUnit.exercises.filter(
    (ex) => Boolean(exerciseProgress[ex.id])
  ).length;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D2825] font-sans selection:bg-[#F2DBD3] selection:text-[#2D2825]">
      <SEO
        title={`Unit ${activeUnit.unitId}: ${activeUnit.titleEn} — Vocabulary in Use Studio | NextBand`}
        description={activeUnit.summaryVi}
      />

      {/* Top Studio Header */}
      <header className="sticky top-0 z-40 border-b border-[#EAE3D9] bg-[#002147] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              to="/reading"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors shrink-0"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Tab Đọc</span>
            </Link>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-amber-400/20 text-amber-200 border border-amber-400/30">
                  Vocabulary in Use · {activeUnit.cefr}
                </span>
                <span className="text-[11px] text-slate-300 hidden md:inline">
                  2-Page Interactive Studio
                </span>
              </div>
              <h1 className="text-sm sm:text-base font-serif font-bold text-white truncate mt-0.5">
                Unit {activeUnit.unitId}: {activeUnit.titleEn}
              </h1>
            </div>
          </div>

          {/* View Mode Controls */}
          <div className="flex items-center gap-1.5 bg-white/10 p-1 rounded-xl border border-white/15 shrink-0">
            <button
              type="button"
              onClick={() => setViewMode("split")}
              className={`hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                viewMode === "split"
                  ? "bg-white text-[#002147] shadow-xs"
                  : "text-slate-200 hover:text-white"
              }`}
            >
              <Columns2 className="h-3.5 w-3.5" />
              <span>2 Trang đối xứng</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode("left")}
              className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                viewMode === "left"
                  ? "bg-white text-[#002147] shadow-xs"
                  : "text-slate-200 hover:text-white"
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Trang Trái · Đọc</span>
              <span className="sm:hidden">Đọc</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode("right")}
              className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                viewMode === "right"
                  ? "bg-white text-[#002147] shadow-xs"
                  : "text-slate-200 hover:text-white"
              }`}
            >
              <PenTool className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Trang Phải · Bài tập</span>
              <span className="sm:hidden">Bài tập</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode("bookmarks")}
              className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                viewMode === "bookmarks"
                  ? "bg-amber-400 text-[#002147] shadow-xs"
                  : "text-slate-200 hover:text-white"
              }`}
            >
              <Bookmark className="h-3.5 w-3.5" />
              <span>Sổ từ ({savedBookmarkItems.length})</span>
            </button>
          </div>
        </div>
      </header>

      {/* Unit Switcher Strip & Book Roadmap */}
      <section className="border-b border-[#EAE3D9] bg-[#F4EFE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {VOCAB_IN_USE_UNITS.map((unit) => {
                const isSelected = unit.unitId === activeUnit.unitId;
                return (
                  <button
                    key={unit.unitId}
                    type="button"
                    onClick={() => handleSelectUnit(unit.unitId)}
                    className={`px-3.5 py-2 rounded-xl text-left transition-all border cursor-pointer ${
                      isSelected
                        ? "bg-[#002147] text-white border-[#002147] shadow-md"
                        : "bg-white text-[#2D2825] border-[#E0D6C6] hover:border-[#C86D51]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                          isSelected
                            ? "bg-amber-400 text-[#002147]"
                            : "bg-[#EFE9DF] text-[#7A6452]"
                        }`}
                      >
                        UNIT {unit.unitId}
                      </span>
                      <span className="text-xs font-bold">{unit.titleEn}</span>
                    </div>
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => setRoadmapOpen((prev) => !prev)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white/80 hover:bg-white text-[#7A6452] border border-dashed border-[#CBBBA4] transition cursor-pointer"
              >
                <Layers className="h-3.5 w-3.5 text-[#C86D51]" />
                <span>Lộ trình toàn sách (100 Units)</span>
                <ChevronRight
                  className={`h-3.5 w-3.5 transition-transform ${
                    roadmapOpen ? "rotate-90" : ""
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center gap-3 text-xs text-[#6E645D]">
              <span>{activeUnit.lexicon.length} từ vựng trọng tâm</span>
              <span>·</span>
              <span className="font-semibold text-[#C86D51]">
                Đã luyện {unitCompletedCount}/{activeUnit.exercises.length} bài
              </span>
            </div>
          </div>

          {roadmapOpen && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2 animate-in fade-in duration-150">
              {ROADMAP_CHAPTERS.map((chap) => (
                <div
                  key={chap.chapterNumber}
                  className={`rounded-2xl p-4 border ${
                    chap.status === "live"
                      ? "bg-white border-emerald-200 shadow-xs"
                      : "bg-[#FAF7F2]/80 border-[#E5DCCD]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#7A6452] font-bold">
                      {chap.unitRange}
                    </span>
                    {chap.status === "live" ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        Đang mở · Units 1–3
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#EFE9DF] text-[#7A7067]">
                        <Lock className="h-2.5 w-2.5" /> Sắp xuất bản
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif font-bold text-sm text-[#241F1C]">
                    {chap.titleEn}
                  </h3>
                  <p className="text-xs text-[#6E645D] mb-2">{chap.titleVi}</p>
                  <ul className="space-y-1 text-[11px] text-[#7A7067]">
                    {chap.sampleTopics.map((topic) => (
                      <li key={topic} className="flex items-start gap-1.5">
                        <span className="text-[#C86D51]">•</span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {viewMode === "bookmarks" ? (
          <BookmarksDeckView
            items={savedBookmarkItems}
            onRemove={(uId, lexId) => toggleBookmark(uId, lexId)}
            onJumpToUnit={(uId, lexId) => {
              handleSelectUnit(uId);
              setSelectedLexiconId(lexId);
              setViewMode("split");
            }}
          />
        ) : (
          <div
            className={
              viewMode === "split"
                ? "grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
                : "max-w-4xl mx-auto"
            }
          >
            {/* LEFT PAGE: Interactive Passage + Lexicon Inspector + Theory Cards */}
            {(viewMode === "split" || viewMode === "left") && (
              <section
                aria-label="Trang trái: Bài đọc ngữ cảnh & Lý thuyết"
                className={`${
                  viewMode === "split" ? "lg:col-span-6" : ""
                } space-y-6`}
              >
                {/* Interactive Passage Card */}
                <div className="bg-white rounded-3xl border border-[#E6DDD0] shadow-sm overflow-hidden">
                  <div className="px-6 py-4 bg-[#002147] text-white flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-amber-300" />
                      <span className="text-xs font-mono uppercase tracking-wider">
                        Trang Trái · Bài đọc Ngữ cảnh
                      </span>
                    </div>
                    <span className="text-[11px] text-amber-200 bg-white/10 px-2.5 py-0.5 rounded-full">
                      Chạm từ gạch chân để tra cứu
                    </span>
                  </div>

                  <div className="p-6 sm:p-7 space-y-5">
                    <div>
                      <h2 className="font-serif text-xl sm:text-2xl text-[#241F1C] font-semibold leading-snug">
                        {activeUnit.passageTitle}
                      </h2>
                      <p className="text-xs text-[#8A7E75] mt-1">
                        {activeUnit.passageSubtitle}
                      </p>
                    </div>

                    <div className="space-y-4 font-serif text-base sm:text-[17px] leading-relaxed text-[#2E2723]">
                      {activeUnit.passageParagraphs.map((paragraph, pIdx) => (
                        <p key={pIdx}>
                          {paragraph.map((token, tIdx) => {
                            if (!token.lexiconId) {
                              return (
                                <React.Fragment key={tIdx}>
                                  {token.text}
                                </React.Fragment>
                              );
                            }
                            const isActiveToken =
                              token.lexiconId === activeLexicon?.id;
                            return (
                              <button
                                key={tIdx}
                                type="button"
                                onClick={() => {
                                  if (token.lexiconId) {
                                    setSelectedLexiconId(token.lexiconId);
                                  }
                                }}
                                className={`inline cursor-pointer px-1 py-0.5 rounded transition-all font-semibold border-b-2 ${
                                  isActiveToken
                                    ? "bg-[#C86D51] text-white border-[#C86D51] shadow-xs"
                                    : "bg-[#FBEBE5]/70 text-[#9C4124] border-dashed border-[#C86D51] hover:bg-[#FBEBE5]"
                                }`}
                              >
                                {token.text}
                              </button>
                            );
                          })}
                        </p>
                      ))}
                    </div>

                    {/* Quick Target Lexicon Strip */}
                    <div className="pt-4 border-t border-[#F2ECE2]">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-[#8A7E75] mb-2">
                        Danh mục từ vựng mục tiêu ({activeUnit.lexicon.length}):
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {activeUnit.lexicon.map((lex) => {
                          const isSelected = lex.id === activeLexicon?.id;
                          const isSaved = isLexiconBookmarked(
                            activeUnit.unitId,
                            lex.id
                          );
                          return (
                            <button
                              key={lex.id}
                              type="button"
                              onClick={() => setSelectedLexiconId(lex.id)}
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
                                isSelected
                                  ? "bg-[#002147] text-white"
                                  : "bg-[#FAF7F2] text-[#4E453E] border border-[#E6DDD0] hover:border-[#C86D51]"
                              }`}
                            >
                              <span>{lex.word}</span>
                              {isSaved && (
                                <BookmarkCheck className="h-3 w-3 text-amber-400 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lexicon Inspector Card */}
                {activeLexicon && (
                  <div
                    data-testid="lexicon-inspector"
                    className="rounded-3xl bg-[#241F1C] text-white p-6 shadow-xl border border-white/10 space-y-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/10 pb-3">
                      <div>
                        <div className="flex flex-wrap items-baseline gap-2.5">
                          <h3 className="font-serif text-2xl font-bold text-amber-200">
                            {activeLexicon.word}
                          </h3>
                          <span className="text-sm font-mono text-white/70">
                            {activeLexicon.ipa}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span className="text-[11px] font-mono uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded text-white/80">
                            {activeLexicon.pos}
                          </span>
                          {activeLexicon.registerNote && (
                            <span className="text-[11px] bg-amber-500/20 text-amber-200 px-2 py-0.5 rounded">
                              {activeLexicon.registerNote}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => speakEnglish(activeLexicon.word)}
                          aria-label={`Nghe phát âm ${activeLexicon.word}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition cursor-pointer"
                        >
                          <Volume2 className="h-3.5 w-3.5 text-amber-300" />
                          <span>Nghe phát âm</span>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            toggleBookmark(activeUnit.unitId, activeLexicon.id)
                          }
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                            isLexiconBookmarked(
                              activeUnit.unitId,
                              activeLexicon.id
                            )
                              ? "bg-amber-400 text-[#241F1C]"
                              : "bg-white/10 hover:bg-white/20 text-white"
                          }`}
                        >
                          {isLexiconBookmarked(
                            activeUnit.unitId,
                            activeLexicon.id
                          ) ? (
                            <>
                              <BookmarkCheck className="h-3.5 w-3.5" />
                              <span>Đã lưu</span>
                            </>
                          ) : (
                            <>
                              <Bookmark className="h-3.5 w-3.5" />
                              <span>Lưu sổ từ</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2.5 text-sm">
                      <p className="text-white/95 leading-relaxed">
                        <strong className="text-amber-200">Nghĩa tiếng Việt:</strong>{" "}
                        {activeLexicon.meaningVi}
                      </p>
                      <p className="text-white/75 text-xs leading-relaxed">
                        <strong className="text-white/90">English definition:</strong>{" "}
                        {activeLexicon.meaningEn}
                      </p>
                      <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-amber-100/90 leading-relaxed">
                        <strong className="text-amber-300">Sắc thái & Ghi nhớ:</strong>{" "}
                        {activeLexicon.nuanceTip}
                      </div>
                      <div className="flex items-center justify-between gap-2 pt-1 text-xs text-white/80 italic">
                        <span>“{activeLexicon.example}”</span>
                        <button
                          type="button"
                          onClick={() => speakEnglish(activeLexicon.example)}
                          title="Nghe câu ví dụ"
                          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-amber-200 shrink-0 cursor-pointer"
                        >
                          <Volume2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Structured Theory Cards (Sections A, B, C, D) */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#7A6452] px-1">
                    <Compass className="h-3.5 w-3.5 text-[#C86D51]" />
                    <span>Hệ thống hóa Kiến thức Ngữ pháp & Từ vựng</span>
                  </div>
                  {activeUnit.theorySections.map((section) => (
                    <div
                      key={section.key}
                      className="bg-white rounded-2xl border border-[#E6DDD0] p-5 space-y-3"
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-7 h-7 rounded-lg bg-[#002147] text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                          {section.key}
                        </span>
                        <div>
                          <h4 className="font-serif font-bold text-base text-[#241F1C]">
                            {section.title}
                          </h4>
                          <p className="text-xs text-[#8A7E75]">
                            {section.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2.5 pl-10">
                        {section.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EFE9DF] space-y-1"
                          >
                            <div className="text-xs font-bold text-[#002147]">
                              {item.label}
                            </div>
                            <p className="text-xs text-[#4E453E] leading-relaxed">
                              {item.detail}
                            </p>
                            {item.example && (
                              <p className="text-[11px] italic text-[#9C4124]">
                                Ex: {item.example}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* RIGHT PAGE: Interactive Curated Exercises */}
            {(viewMode === "split" || viewMode === "right") && (
              <section
                aria-label="Trang phải: Bài tập tương tác"
                className={`${
                  viewMode === "split" ? "lg:col-span-6" : ""
                } space-y-6`}
              >
                <div className="bg-white rounded-3xl border border-[#E6DDD0] p-5 flex items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#FBEBE5] text-[#C86D51] flex items-center justify-center shrink-0">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div>
                      <h2 className="font-serif text-lg font-bold text-[#241F1C]">
                        Trang Phải · Bài tập Tuyển chọn Trực quan
                      </h2>
                      <p className="text-xs text-[#7A7067]">
                        Chọn lọc các bài tập đắt giá nhất — làm trực tiếp và xem giải thích tức thì.
                      </p>
                    </div>
                  </div>
                </div>

                {activeUnit.exercises.map((exercise) => {
                  const isChecked = Boolean(checkedExercises[exercise.id]);
                  const score = isChecked
                    ? computeExerciseScore(exercise, answers, subAnswers)
                    : null;

                  return (
                    <div
                      key={exercise.id}
                      data-testid={`exercise-${exercise.id}`}
                      className="bg-white rounded-3xl border border-[#E6DDD0] shadow-sm overflow-hidden"
                    >
                      <div className="px-6 py-4 border-b border-[#F2ECE2] bg-[#FAF7F2]/60 flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#C86D51] font-bold">
                            {exercise.sourceNote}
                          </span>
                          <h3 className="font-serif text-lg font-bold text-[#241F1C] mt-0.5">
                            {exercise.title}
                          </h3>
                        </div>

                        {score && (
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              score.correct === score.total
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                                : "bg-amber-100 text-amber-900 border border-amber-200"
                            }`}
                          >
                            Kết quả: {score.correct}/{score.total}
                          </span>
                        )}
                      </div>

                      <div className="p-6 space-y-5">
                        <p className="text-xs sm:text-sm text-[#5E544C] leading-relaxed">
                          {exercise.instruction}
                        </p>

                        {exercise.kind === "gap_fill" && (
                          <GapFillExerciseBody
                            exercise={exercise}
                            answers={answers}
                            isChecked={isChecked}
                            focusedGapId={focusedGapId}
                            onFocusGap={(qId) => setFocusedGapId(qId)}
                            onChangeAnswer={(qId, value) =>
                              setAnswers((prev) => ({ ...prev, [qId]: value }))
                            }
                            onPickWordBank={(word) =>
                              handleWordBankPick(exercise, word)
                            }
                          />
                        )}

                        {exercise.kind === "classifier" && (
                          <ClassifierExerciseBody
                            exercise={exercise}
                            answers={answers}
                            subAnswers={subAnswers}
                            isChecked={isChecked}
                            onSelectCategory={(qId, catKey) =>
                              setAnswers((prev) => ({ ...prev, [qId]: catKey }))
                            }
                            onChangeSubAnswer={(qId, value) =>
                              setSubAnswers((prev) => ({
                                ...prev,
                                [qId]: value
                              }))
                            }
                          />
                        )}

                        {exercise.kind === "sentence_upgrade" && (
                          <SentenceUpgradeExerciseBody
                            exercise={exercise}
                            answers={answers}
                            isChecked={isChecked}
                            onSelectOption={(qId, option) =>
                              setAnswers((prev) => ({ ...prev, [qId]: option }))
                            }
                          />
                        )}

                        {/* Action Bar */}
                        <div className="pt-3 border-t border-[#F2ECE2] flex flex-wrap items-center justify-between gap-3">
                          <button
                            type="button"
                            onClick={() => handleResetExercise(exercise)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#6E645D] hover:bg-[#FAF7F2] border border-[#E6DDD0] transition cursor-pointer"
                          >
                            <RotateCcw className="h-3.5 w-3.5" />
                            <span>Làm lại</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleCheckExercise(exercise)}
                            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-[#002147] hover:bg-[#00336E] text-white shadow-sm transition cursor-pointer"
                          >
                            <Check className="h-3.5 w-3.5" />
                            <span>Kiểm tra đáp án</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

interface GapFillBodyProps {
  exercise: GapFillExercise;
  answers: Record<string, string>;
  isChecked: boolean;
  focusedGapId: string | null;
  onFocusGap: (qId: string) => void;
  onChangeAnswer: (qId: string, value: string) => void;
  onPickWordBank: (word: string) => void;
}

function GapFillExerciseBody({
  exercise,
  answers,
  isChecked,
  focusedGapId,
  onFocusGap,
  onChangeAnswer,
  onPickWordBank
}: GapFillBodyProps) {
  return (
    <div className="space-y-4">
      {exercise.wordBank && exercise.wordBank.length > 0 && (
        <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EAE1D3] space-y-2">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#8A7E75]">
            Kho mảnh ghép (chạm để điền vào ô đang chọn):
          </div>
          <div className="flex flex-wrap gap-2">
            {exercise.wordBank.map((word) => (
              <button
                key={word}
                type="button"
                disabled={isChecked}
                onClick={() => onPickWordBank(word)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-[#DCCFBE] text-[#241F1C] hover:border-[#C86D51] hover:bg-[#FBEBE5] disabled:opacity-50 transition cursor-pointer"
              >
                {word}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        {exercise.questions.map((q, index) => {
          const val = answers[q.id] || "";
          const ok =
            isChecked && isGapCorrect(val, q.answer, q.acceptedAnswers);
          const isFocused = focusedGapId === q.id;

          return (
            <div
              key={q.id}
              className={`p-4 rounded-2xl border transition ${
                isChecked
                  ? ok
                    ? "bg-emerald-50/70 border-emerald-200"
                    : "bg-rose-50/70 border-rose-200"
                  : isFocused
                  ? "bg-white border-[#C86D51] ring-2 ring-[#C86D51]/15"
                  : "bg-[#FAF7F2]/40 border-[#EAE1D3]"
              }`}
            >
              <div className="text-sm text-[#241F1C] leading-relaxed flex flex-wrap items-center gap-1.5">
                <span className="font-mono text-xs font-bold text-[#8A7E75] mr-1">
                  {index + 1}.
                </span>
                {q.promptBefore && <span>{q.promptBefore}</span>}
                <input
                  type="text"
                  value={val}
                  disabled={isChecked}
                  onFocus={() => onFocusGap(q.id)}
                  onChange={(e) => onChangeAnswer(q.id, e.target.value)}
                  placeholder="Điền hoặc chọn từ..."
                  aria-label={`Câu ${index + 1}`}
                  className="px-2.5 py-1 rounded-lg border border-[#CBBBA4] bg-white text-xs sm:text-sm font-semibold text-[#002147] min-w-[140px] focus:outline-none focus:border-[#002147]"
                />
                {q.promptAfter && <span>{q.promptAfter}</span>}
              </div>

              {q.hint && !isChecked && (
                <p className="text-[11px] text-[#8A7E75] mt-1.5">
                  Gợi ý: {q.hint}
                </p>
              )}

              {isChecked && (
                <div className="mt-2.5 pt-2.5 border-t border-black/5 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-semibold">
                    {ok ? (
                      <span className="text-emerald-700 inline-flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Chính xác!
                      </span>
                    ) : (
                      <span className="text-rose-700 inline-flex items-center gap-1">
                        <XCircle className="h-3.5 w-3.5" /> Đáp án chuẩn:{" "}
                        <strong className="underline">{q.answer}</strong>
                      </span>
                    )}
                  </div>
                  <p className="text-[#4E453E]">{q.explanationVi}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface ClassifierBodyProps {
  exercise: ClassifierExercise;
  answers: Record<string, string>;
  subAnswers: Record<string, string>;
  isChecked: boolean;
  onSelectCategory: (qId: string, catKey: string) => void;
  onChangeSubAnswer: (qId: string, value: string) => void;
}

function ClassifierExerciseBody({
  exercise,
  answers,
  subAnswers,
  isChecked,
  onSelectCategory,
  onChangeSubAnswer
}: ClassifierBodyProps) {
  return (
    <div className="space-y-4">
      {/* Category Legend */}
      <div className="grid sm:grid-cols-2 gap-2">
        {exercise.categories.map((cat) => (
          <div
            key={cat.key}
            className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EAE1D3]"
          >
            <div className="text-xs font-bold text-[#002147]">{cat.label}</div>
            <div className="text-[11px] text-[#6E645D]">{cat.description}</div>
          </div>
        ))}
      </div>

      {/* Questions */}
      <div className="space-y-3">
        {exercise.questions.map((q, idx) => {
          const picked = answers[q.id];
          const subVal = subAnswers[q.id] || "";
          const catCorrect = picked === q.correctCategory;
          const subRequired = Boolean(q.subCorrectAnswer && picked === q.correctCategory);
          const subOk = subRequired
            ? isGapCorrect(subVal, q.subCorrectAnswer!, q.subAcceptedAnswers)
            : true;
          const isRowOk = isChecked && catCorrect && subOk;

          return (
            <div
              key={q.id}
              className={`p-4 rounded-2xl border space-y-2.5 ${
                isChecked
                  ? isRowOk
                    ? "bg-emerald-50/70 border-emerald-200"
                    : "bg-rose-50/70 border-rose-200"
                  : "bg-[#FAF7F2]/40 border-[#EAE1D3]"
              }`}
            >
              <p className="text-sm text-[#241F1C] leading-relaxed">
                <span className="font-mono text-xs font-bold text-[#8A7E75] mr-1.5">
                  {idx + 1}.
                </span>
                {q.prompt}
              </p>

              <div className="flex flex-wrap gap-2">
                {exercise.categories.map((cat) => {
                  const selected = picked === cat.key;
                  return (
                    <button
                      key={cat.key}
                      type="button"
                      disabled={isChecked}
                      onClick={() => onSelectCategory(q.id, cat.key)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                        selected
                          ? "bg-[#002147] text-white border-[#002147]"
                          : "bg-white text-[#2D2825] border-[#DCCFBE] hover:border-[#C86D51]"
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              {q.subPrompt && picked === "YES" && (
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-xs font-medium text-[#5E544C]">
                    {q.subPrompt}
                  </span>
                  <input
                    type="text"
                    value={subVal}
                    disabled={isChecked}
                    onChange={(e) => onChangeSubAnswer(q.id, e.target.value)}
                    placeholder="Nhập từ sau ghép..."
                    className="px-2.5 py-1 rounded-lg border border-[#CBBBA4] bg-white text-xs font-semibold text-[#002147]"
                  />
                </div>
              )}

              {isChecked && (
                <div className="pt-2 border-t border-black/5 text-xs space-y-1">
                  <div className="font-semibold">
                    {isRowOk ? (
                      <span className="text-emerald-700 inline-flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Chính xác!
                      </span>
                    ) : (
                      <span className="text-rose-700 inline-flex items-center gap-1">
                        <XCircle className="h-3.5 w-3.5" /> Đáp án:{" "}
                        <strong>
                          {q.correctCategory}
                          {q.subCorrectAnswer ? ` (${q.subCorrectAnswer})` : ""}
                        </strong>
                      </span>
                    )}
                  </div>
                  <p className="text-[#4E453E]">{q.explanationVi}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface SentenceUpgradeBodyProps {
  exercise: SentenceUpgradeExercise;
  answers: Record<string, string>;
  isChecked: boolean;
  onSelectOption: (qId: string, option: string) => void;
}

function SentenceUpgradeExerciseBody({
  exercise,
  answers,
  isChecked,
  onSelectOption
}: SentenceUpgradeBodyProps) {
  return (
    <div className="space-y-3.5">
      {exercise.questions.map((q, idx) => {
        const picked = answers[q.id];
        const ok = isChecked && picked === q.correctOption;

        return (
          <div
            key={q.id}
            className={`p-4 rounded-2xl border space-y-2.5 ${
              isChecked
                ? ok
                  ? "bg-emerald-50/70 border-emerald-200"
                  : "bg-rose-50/70 border-rose-200"
                : "bg-[#FAF7F2]/40 border-[#EAE1D3]"
            }`}
          >
            <div>
              <p className="text-sm font-medium text-[#241F1C]">
                <span className="font-mono text-xs font-bold text-[#8A7E75] mr-1.5">
                  {idx + 1}.
                </span>
                {q.originalSentence}
              </p>
              {q.promptCue && (
                <p className="text-[11px] text-[#8A7E75] mt-0.5 pl-4">
                  Ngữ cảnh: {q.promptCue}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              {q.options.map((option) => {
                const isSelected = picked === option;
                const isCorrectOpt = option === q.correctOption;

                let btnClass =
                  "bg-white text-[#2D2825] border-[#DCCFBE] hover:border-[#C86D51]";
                if (isChecked) {
                  if (isCorrectOpt) {
                    btnClass =
                      "bg-emerald-600 text-white border-emerald-600 font-semibold";
                  } else if (isSelected && !isCorrectOpt) {
                    btnClass =
                      "bg-rose-600 text-white border-rose-600 line-through";
                  } else {
                    btnClass = "bg-white/60 text-[#8A7E75] border-[#EAE1D3]";
                  }
                } else if (isSelected) {
                  btnClass =
                    "bg-[#002147] text-white border-[#002147] font-semibold";
                }

                return (
                  <button
                    key={option}
                    type="button"
                    disabled={isChecked}
                    onClick={() => onSelectOption(q.id, option)}
                    className={`w-full text-left px-3.5 py-2 rounded-xl text-xs sm:text-sm border transition cursor-pointer ${btnClass}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {isChecked && (
              <p className="text-xs text-[#4E453E] pt-1.5 border-t border-black/5">
                <strong className={ok ? "text-emerald-700" : "text-rose-700"}>
                  Giải thích:
                </strong>{" "}
                {q.explanationVi}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

interface BookmarksDeckProps {
  items: SavedBookmarkItem[];
  onRemove: (unitId: number, lexiconId: string) => void;
  onJumpToUnit: (unitId: number, lexiconId: string) => void;
}

function BookmarksDeckView({
  items,
  onRemove,
  onJumpToUnit
}: BookmarksDeckProps) {
  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto bg-white rounded-3xl border border-[#E6DDD0] p-10 text-center space-y-3">
        <Bookmark className="h-10 w-10 text-[#C86D51] mx-auto opacity-75" />
        <h2 className="font-serif text-xl font-bold text-[#241F1C]">
          Sổ từ cá nhân đang trống
        </h2>
        <p className="text-sm text-[#6E645D]">
          Hãy chạm vào các từ vựng được gạch chân trong bài đọc Trang Trái và nhấn{" "}
          <strong>Lưu sổ từ</strong> để tạo bộ ôn tập riêng của bạn.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl font-bold text-[#241F1C]">
          Sổ từ vựng Đã lưu ({items.length})
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(({ unitId, unitTitle, lexicon }) => (
          <div
            key={`${unitId}:${lexicon.id}`}
            className="bg-white rounded-2xl border border-[#E6DDD0] p-5 space-y-3 flex flex-col justify-between shadow-xs"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FAF7F2] text-[#7A6452] border border-[#EAE1D3]">
                  {unitTitle}
                </span>
                <button
                  type="button"
                  onClick={() => speakEnglish(lexicon.word)}
                  className="p-1.5 rounded-lg bg-[#FAF7F2] hover:bg-[#EFE9DF] text-[#002147] cursor-pointer"
                  aria-label={`Nghe ${lexicon.word}`}
                >
                  <Volume2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#241F1C]">
                  {lexicon.word}
                </h3>
                <p className="text-xs font-mono text-[#8A7E75]">
                  {lexicon.ipa} · {lexicon.pos}
                </p>
              </div>
              <p className="text-xs text-[#2D2825] font-medium">
                {lexicon.meaningVi}
              </p>
              <p className="text-[11px] text-[#6E645D] italic">
                “{lexicon.example}”
              </p>
            </div>

            <div className="pt-3 border-t border-[#F2ECE2] flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => onJumpToUnit(unitId, lexicon.id)}
                className="text-xs font-semibold text-[#C86D51] hover:underline cursor-pointer"
              >
                Mở lại ngữ cảnh →
              </button>
              <button
                type="button"
                onClick={() => onRemove(unitId, lexicon.id)}
                className="text-xs text-[#8A7E75] hover:text-rose-600 cursor-pointer"
              >
                Bỏ lưu
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
