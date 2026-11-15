import React, { useState, useEffect, useMemo, useRef, useContext } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { SEO } from "@/components/common/SEO";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Clock,
  Columns2,
  Compass,
  FileText,
  Layers,
  PenTool,
  RotateCcw,
  Search,
  Sparkles,
  Volume2,
  XCircle,
  Lock,
  Check,
  AlertTriangle,
  Brain,
  RefreshCw
} from "lucide-react";
import { AuthContext } from "@/hooks/useAuth";
import { useVocabInUseBookmarks } from "@/hooks/useVocabInUseBookmarks";
import { VocabInUseBookmarkRecord } from "@/lib/api/domains/vocab-in-use.api";
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
const HARD_MODE_STORAGE_KEY = "nb_vocab_in_use_hard_mode_v1";
const STUDY_GUIDE_STORAGE_KEY = "nb_vocab_in_use_guide_dismissed_v1";
const SANDBOX_STORAGE_KEY = "nb_vocab_in_use_sandbox_v1";

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
  return val
    .normalize("NFC")
    .trim()
    .toLowerCase()
    .replace(/[\u2018\u2019\u02BC]/g, "'")
    .replace(/(\d),(?=\d{3}\b)/g, "$1")
    .replace(/[\u2010-\u2015-]/g, " ")
    .replace(/[.,;:!?]+$/g, "")
    .replace(/\s+/g, " ")
    .trim();
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

function matchLexiconFromTargetText(
  targetText: string,
  unitLexicon: LexiconItem[]
): LexiconItem[] {
  const normTarget = normalizeAnswer(targetText);
  if (!normTarget) return [];
  return unitLexicon.filter((lex) => {
    const normWord = normalizeAnswer(lex.word);
    const normId = normalizeAnswer(lex.id.replace(/_/g, " "));
    if (normTarget === normWord || normTarget === normId) return true;
    if (normTarget.includes(normWord) || normWord.includes(normTarget)) return true;
    const stem = normWord.length >= 5 ? normWord.slice(0, 5) : normWord;
    return stem.length >= 4 && normTarget.includes(stem);
  });
}

function getMissedLexiconForExercise(
  exercise: ExerciseBlock,
  answers: Record<string, string>,
  subAnswers: Record<string, string>,
  unitLexicon: LexiconItem[]
): LexiconItem[] {
  const missedTargets: string[] = [];

  if (exercise.kind === "gap_fill") {
    for (const q of exercise.questions) {
      if (!isGapCorrect(answers[q.id] || "", q.answer, q.acceptedAnswers)) {
        missedTargets.push(q.answer);
      }
    }
  } else if (exercise.kind === "classifier") {
    for (const q of exercise.questions) {
      const catOk = answers[q.id] === q.correctCategory;
      const subOk = q.subCorrectAnswer
        ? isGapCorrect(subAnswers[q.id] || "", q.subCorrectAnswer, q.subAcceptedAnswers)
        : true;
      if (!catOk || !subOk) {
        missedTargets.push(q.highlightWord);
        if (q.subCorrectAnswer) missedTargets.push(q.subCorrectAnswer);
      }
    }
  } else if (exercise.kind === "sentence_upgrade") {
    for (const q of exercise.questions) {
      if (answers[q.id] !== q.correctOption) {
        missedTargets.push(q.correctOption);
      }
    }
  }

  const matchedMap = new Map<string, LexiconItem>();
  for (const t of missedTargets) {
    for (const lex of matchLexiconFromTargetText(t, unitLexicon)) {
      matchedMap.set(lex.id, lex);
    }
  }
  return Array.from(matchedMap.values());
}

function maskWordInExample(example: string, word: string): string {
  if (!example || !word) return example;
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const exactRegex = new RegExp(`\\b${escaped}[a-z]*\\b`, "gi");
  if (exactRegex.test(example)) {
    return example.replace(exactRegex, "_______");
  }
  const stem = word.length >= 5 ? word.slice(0, 5).replace(/[.*+?^${}()|[\]\\]/g, "\\$&") : "";
  if (stem) {
    const stemRegex = new RegExp(`\\b${stem}[a-z]*\\b`, "gi");
    if (stemRegex.test(example)) {
      return example.replace(stemRegex, "_______");
    }
  }
  return example;
}

function doesDraftUseLexicon(draft: string, lex: LexiconItem): boolean {
  const normDraft = normalizeAnswer(draft);
  if (!normDraft) return false;
  const normWord = normalizeAnswer(lex.word);
  if (!normWord) return false;
  if (normDraft.includes(normWord)) return true;
  const stem = normWord.length >= 6 ? normWord.slice(0, 5) : "";
  return Boolean(stem && normDraft.includes(stem));
}

export default function VocabInUsePage() {
  const { unitId: unitParam } = useParams<{ unitId?: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const baseRoute = location.pathname.startsWith("/reading/vocab-in-use")
    ? "/reading/vocab-in-use"
    : "/vocab-in-use";

  const parsedUnitId = unitParam ? parseInt(unitParam, 10) : null;
  const hasUnitSelection =
    parsedUnitId !== null && !Number.isNaN(parsedUnitId);
  const activeUnit = useMemo(
    () => getVocabInUseUnit(hasUnitSelection ? parsedUnitId! : 1),
    [hasUnitSelection, parsedUnitId]
  );

  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [hardMode, setHardMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem(HARD_MODE_STORAGE_KEY) === "1";
    } catch {
      return false;
    }
  });
  const toggleHardMode = () => {
    setHardMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(HARD_MODE_STORAGE_KEY, next ? "1" : "0");
      } catch {
        // storage unavailable: keep in-memory preference only
      }
      return next;
    });
  };
  const [showStudyGuide, setShowStudyGuide] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STUDY_GUIDE_STORAGE_KEY) !== "1";
    } catch {
      return true;
    }
  });
  const toggleStudyGuide = (nextState?: boolean) => {
    setShowStudyGuide((prev) => {
      const next = typeof nextState === "boolean" ? nextState : !prev;
      try {
        localStorage.setItem(STUDY_GUIDE_STORAGE_KEY, next ? "0" : "1");
      } catch {
        // ignore storage errors
      }
      return next;
    });
  };
  const [sandboxDrafts, setSandboxDrafts] = useState<Record<number, string>>(() => {
    try {
      const raw = localStorage.getItem(SANDBOX_STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });
  const handleUpdateSandboxDraft = (uId: number, text: string) => {
    setSandboxDrafts((prev) => {
      const next = { ...prev, [uId]: text };
      try {
        localStorage.setItem(SANDBOX_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  };
  const [catalogBookmarksOpen, setCatalogBookmarksOpen] = useState(false);
  const [selectedLexiconId, setSelectedLexiconId] = useState<string>(
    activeUnit.lexicon[0]?.id || ""
  );
  const pendingLexiconRef = useRef<string | null>(null);

  // Answers & checked status per exercise
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [subAnswers, setSubAnswers] = useState<Record<string, string>>({});
  const [checkedExercises, setCheckedExercises] = useState<Record<string, boolean>>({});
  const [focusedGapId, setFocusedGapId] = useState<string | null>(null);

  // Synchronized Bookmarks & Spaced Repetition (Guest Local -> Account Server)
  const authContext = useContext(AuthContext);
  const isAuthenticated = authContext?.isAuthenticated ?? false;
  const {
    bookmarkedKeys,
    isLexiconBookmarked,
    toggleBookmark: toggleBookmarkSync,
    batchAddBookmarks,
    isSyncing,
    syncError,
    dueReviewItems,
    submitReview,
  } = useVocabInUseBookmarks(activeUnit.unitId);

  const toggleBookmark = (uId: number, lexId: string) => {
    const targetUnit =
      VOCAB_IN_USE_UNITS.find((u) => u.unitId === uId) || activeUnit;
    const targetLex =
      targetUnit.lexicon.find((l) => l.id === lexId) || activeLexicon;
    if (targetLex) {
      toggleBookmarkSync(uId, targetLex);
    }
  };

  // Persistent Exercise Progress (exerciseId -> ExerciseScore)
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
    const targetLex = pendingLexiconRef.current;
    if (targetLex && activeUnit.lexicon.some((l) => l.id === targetLex)) {
      setSelectedLexiconId(targetLex);
      pendingLexiconRef.current = null;
    } else {
      setSelectedLexiconId(activeUnit.lexicon[0]?.id || "");
    }
    setFocusedGapId(null);
  }, [activeUnit.unitId, activeUnit.lexicon]);

  useEffect(() => {
    try {
      window.scrollTo?.(0, 0);
    } catch {
      // ignore in non-DOM test environments
    }
    if (hasUnitSelection) {
      setCatalogBookmarksOpen(false);
    }
  }, [unitParam, hasUnitSelection]);

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
    navigate(`${baseRoute}/${targetId}`);
    if (viewMode === "bookmarks") {
      setViewMode("split");
    }
  };

  const handleJumpToUnit = (uId: number, lexId: string) => {
    pendingLexiconRef.current = lexId;
    if (hasUnitSelection && uId === activeUnit.unitId) {
      setSelectedLexiconId(lexId);
      pendingLexiconRef.current = null;
      setViewMode("split");
      return;
    }
    handleSelectUnit(uId);
    setViewMode("split");
  };

  const makeBookmarkKey = (uId: number, lexId: string) => `${uId}:${lexId}`;

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

  const currentUnitIndex = VOCAB_IN_USE_UNITS.findIndex(
    (u) => u.unitId === activeUnit.unitId
  );
  const prevUnit =
    currentUnitIndex > 0 ? VOCAB_IN_USE_UNITS[currentUnitIndex - 1] : null;
  const nextUnit =
    currentUnitIndex >= 0 && currentUnitIndex < VOCAB_IN_USE_UNITS.length - 1
      ? VOCAB_IN_USE_UNITS[currentUnitIndex + 1]
      : null;

  if (!hasUnitSelection) {
    return (
      <UnitCatalogView
        baseRoute={baseRoute}
        exerciseProgress={exerciseProgress}
        savedBookmarkItems={savedBookmarkItems}
        bookmarksOpen={catalogBookmarksOpen}
        onToggleBookmarks={setCatalogBookmarksOpen}
        onRemoveBookmark={toggleBookmark}
        onJumpToUnit={handleJumpToUnit}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D2825] font-sans selection:bg-[#F2DBD3] selection:text-[#2D2825]">
      <SEO
        title={`Unit ${activeUnit.unitId}: ${activeUnit.titleEn} — Vocabulary in Use Studio | NextBand`}
        description={activeUnit.summaryVi}
      />

      {/* Top Studio Header (Dedicated Unit Workspace) */}
      <header className="sticky top-0 z-40 border-b border-[#EAE3D9] bg-[#002147] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              to={baseRoute}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors shrink-0"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Chọn Unit</span>
            </Link>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-amber-400/20 text-amber-200 border border-amber-400/30">
                  Vocabulary in Use · {activeUnit.cefr}
                </span>
                <span className="text-xs font-semibold text-amber-200 hidden md:inline">
                  Đã luyện {unitCompletedCount}/{activeUnit.exercises.length} bài
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-serif font-bold text-white truncate mt-0.5">
                Unit {activeUnit.unitId}: {activeUnit.titleEn}
              </h1>
            </div>
          </div>

          {/* View Mode Controls */}
          <div className="flex items-center gap-1.5 bg-white/10 p-1 rounded-xl border border-white/15 shrink-0">
            <button
              type="button"
              data-testid="toggle-study-guide"
              onClick={() => toggleStudyGuide()}
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                showStudyGuide
                  ? "bg-amber-400/25 text-amber-200 border border-amber-300/30"
                  : "text-slate-200 hover:text-white"
              }`}
              title="Bật/tắt hướng dẫn lộ trình 3 bước"
            >
              <Compass className="h-3.5 w-3.5 text-amber-300" />
              <span className="hidden sm:inline">Cách học</span>
            </button>

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

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {viewMode !== "bookmarks" && showStudyGuide && (
          <section
            data-testid="unit-study-guide"
            aria-label="Lộ trình 3 bước học Unit hiệu quả"
            className="bg-gradient-to-r from-[#002147] via-[#0B2E59] to-[#163B6B] text-white rounded-3xl p-5 sm:p-6 shadow-md border border-white/10 space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/15 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-300 shrink-0" />
                <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-amber-200 font-bold">
                  Lộ trình Học Chuẩn Band 7.0 → 8.0+ (3 Bước · {activeUnit.estimatedMinutes} phút)
                </span>
              </div>
              <button
                type="button"
                data-testid="dismiss-study-guide"
                onClick={() => toggleStudyGuide(false)}
                className="text-xs font-semibold px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition cursor-pointer"
              >
                Đã hiểu · Thu gọn
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <div
                onClick={() => setViewMode("left")}
                className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition cursor-pointer space-y-1"
              >
                <div className="text-xs font-mono font-bold text-amber-300 uppercase">
                  Bước 1 · Nạp Ngữ cảnh &amp; Collocations
                </div>
                <p className="text-xs sm:text-sm text-slate-100 leading-relaxed">
                  Đọc bài đọc <strong>Trang Trái</strong>, chạm các từ gạch chân để soi{" "}
                  <em>Ngữ vực (Register) &amp; Ứng dụng IELTS</em> ở khung Inspector rồi đọc bảng lý thuyết A–B–C–D.
                </p>
              </div>

              <div
                onClick={() => setViewMode("right")}
                className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition cursor-pointer space-y-1"
              >
                <div className="text-xs font-mono font-bold text-emerald-300 uppercase">
                  Bước 2 · Truy hồi Chủ động &amp; Đặt câu
                </div>
                <p className="text-xs sm:text-sm text-slate-100 leading-relaxed">
                  Làm bài tập <strong>Trang Phải</strong> (khuyến nghị bật{" "}
                  <strong>Chế độ khó</strong> để ẩn gợi ý) và tự viết 2–3 câu thực chiến ở khung Sandbox cuối bài.
                </p>
              </div>

              <div
                onClick={() => setViewMode("bookmarks")}
                className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition cursor-pointer space-y-1"
              >
                <div className="text-xs font-mono font-bold text-sky-300 uppercase">
                  Bước 3 · Đóng băng Từ Hổng (SM-2)
                </div>
                <p className="text-xs sm:text-sm text-slate-100 leading-relaxed">
                  Lưu nhanh các từ làm sai hoặc từ <em>Productive</em> vào{" "}
                  <strong>Sổ từ</strong> để ôn ngắt quãng 1–3–7–14 ngày bằng thử thách điền khuyết.
                </p>
              </div>
            </div>
          </section>
        )}

        {viewMode === "bookmarks" ? (
          <BookmarksDeckView
            items={savedBookmarkItems}
            onRemove={(uId, lexId) => toggleBookmark(uId, lexId)}
            onJumpToUnit={handleJumpToUnit}
            dueReviewItems={dueReviewItems}
            onSubmitReview={submitReview}
            isAuthenticated={isAuthenticated}
            isSyncing={isSyncing}
            syncError={syncError}
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
                    <span className="text-xs text-amber-200 bg-white/10 px-2.5 py-0.5 rounded-full">
                      Chạm từ gạch chân để tra cứu
                    </span>
                  </div>

                  <div className="p-6 sm:p-7 space-y-5">
                    <div>
                      <h2 className="font-serif text-xl sm:text-2xl text-[#241F1C] font-semibold leading-snug">
                        {activeUnit.passageTitle}
                      </h2>
                      <p className="text-xs sm:text-sm text-[#574D44] mt-1">
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

                    {/* Quick Target Lexicon Strip + Batch Save */}
                    <div className="pt-4 border-t border-[#F2ECE2] space-y-2.5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="text-xs font-mono uppercase tracking-wider text-[#574D44] font-semibold">
                          Danh mục từ vựng mục tiêu ({activeUnit.lexicon.length}):
                        </div>

                        <div className="flex flex-wrap items-center gap-1.5">
                          {activeUnit.lexicon.some(
                            (l) =>
                              l.ieltsUse === "productive" &&
                              !isLexiconBookmarked(activeUnit.unitId, l.id)
                          ) && (
                            <button
                              type="button"
                              data-testid="batch-bookmark-productive"
                              disabled={isSyncing}
                              onClick={() =>
                                batchAddBookmarks(
                                  activeUnit.unitId,
                                  activeUnit.lexicon.filter(
                                    (l) => l.ieltsUse === "productive"
                                  )
                                )
                              }
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition cursor-pointer"
                            >
                              <Bookmark className="h-3 w-3" />
                              <span>+ Lưu từ Productive</span>
                            </button>
                          )}

                          {activeUnit.lexicon.some(
                            (l) => !isLexiconBookmarked(activeUnit.unitId, l.id)
                          ) ? (
                            <button
                              type="button"
                              data-testid="batch-bookmark-unit"
                              disabled={isSyncing}
                              onClick={() =>
                                batchAddBookmarks(
                                  activeUnit.unitId,
                                  activeUnit.lexicon
                                )
                              }
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#FAF7F2] text-[#002147] border border-[#DCCFBE] hover:border-[#002147] transition cursor-pointer"
                            >
                              <Bookmark className="h-3 w-3 text-[#C86D51]" />
                              <span>
                                + Lưu cả Unit (
                                {
                                  activeUnit.lexicon.filter(
                                    (l) =>
                                      !isLexiconBookmarked(
                                        activeUnit.unitId,
                                        l.id
                                      )
                                  ).length
                                }
                                )
                              </span>
                            </button>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-100 text-amber-900">
                              <BookmarkCheck className="h-3 w-3" />
                              Đã lưu trọn Unit
                            </span>
                          )}
                        </div>
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
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs sm:text-sm font-medium transition cursor-pointer ${
                                isSelected
                                  ? "bg-[#002147] text-white"
                                  : "bg-[#FAF7F2] text-[#3A312B] border border-[#E6DDD0] hover:border-[#C86D51]"
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
                        <div className="flex flex-wrap items-center gap-2 mt-1.5">
                          <span className="text-xs font-mono uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded text-white/90">
                            {activeLexicon.pos}
                          </span>
                          {activeLexicon.registerNote && (
                            <span className="text-xs bg-amber-500/20 text-amber-200 px-2.5 py-0.5 rounded font-medium border border-amber-400/25">
                              Ngữ vực: {activeLexicon.registerNote}
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

                    {/* Top Priority IELTS Strategy & Register Badges for Band 7.0+ */}
                    {(activeLexicon.exampleSource ||
                      activeLexicon.ieltsUse ||
                      activeLexicon.usageFlag) && (
                      <div
                        className="flex flex-wrap items-center gap-2 pt-0.5"
                        data-testid="lexicon-meta-badges"
                      >
                        {activeLexicon.ieltsUse && (
                          <span
                            className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${
                              activeLexicon.ieltsUse === "productive"
                                ? "bg-emerald-500/20 text-emerald-200 border-emerald-400/30"
                                : "bg-sky-500/20 text-sky-200 border-sky-400/30"
                            }`}
                          >
                            {activeLexicon.ieltsUse === "productive"
                              ? "🎯 IELTS: Gợi ý dùng được khi nói/viết (Productive)"
                              : "📖 IELTS: Gợi ý chỉ cần nhận biết (Receptive)"}
                          </span>
                        )}
                        {activeLexicon.usageFlag && (
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-200 border border-amber-400/30">
                            {activeLexicon.usageFlag === "informal"
                              ? "⚠️ Thân mật / informal (Tránh viết Task 2)"
                              : activeLexicon.usageFlag === "uk-only"
                                ? "🇬🇧 Thiên về Anh-Anh"
                                : "⚠️ Chủ đề nhạy cảm"}
                          </span>
                        )}
                        {activeLexicon.exampleSource && (
                          <span className="text-xs px-2.5 py-1 rounded-lg bg-white/10 text-white/80">
                            {activeLexicon.exampleSource === "book"
                              ? "Ví dụ: theo sách gốc"
                              : "Ví dụ: ARIS soạn"}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="space-y-3 text-sm sm:text-base">
                      {/* Context & Collocation Example Box */}
                      <div className="p-3.5 rounded-2xl bg-black/30 border border-amber-400/25 flex items-center justify-between gap-3">
                        <div className="space-y-1">
                          <span className="text-[11px] font-mono uppercase tracking-wider text-amber-300/90 font-semibold block">
                            Ngữ cảnh &amp; Cụm kết hợp (Collocation):
                          </span>
                          <p className="text-sm sm:text-base text-white font-serif italic leading-relaxed">
                            “{activeLexicon.example}”
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => speakEnglish(activeLexicon.example)}
                          title="Nghe câu ví dụ"
                          className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-amber-200 shrink-0 cursor-pointer"
                        >
                          <Volume2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm text-amber-100 leading-relaxed">
                        <strong className="text-amber-300">Sắc thái &amp; Cách dùng chuẩn IELTS:</strong>{" "}
                        {activeLexicon.nuanceTip}
                      </div>

                      <p className="text-white/95 leading-relaxed">
                        <strong className="text-amber-200">Nghĩa tiếng Việt:</strong>{" "}
                        {activeLexicon.meaningVi}
                      </p>
                      <p className="text-white/85 text-sm leading-relaxed">
                        <strong className="text-white">English definition:</strong>{" "}
                        {activeLexicon.meaningEn}
                      </p>
                    </div>

                    {/* Quick Word Stepper inside Inspector */}
                    {activeUnit.lexicon.length > 1 && (
                      <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2 text-xs">
                        <button
                          type="button"
                          data-testid="inspector-prev-word"
                          onClick={() => {
                            const idx = activeUnit.lexicon.findIndex(
                              (l) => l.id === activeLexicon.id
                            );
                            const prevIdx =
                              idx > 0 ? idx - 1 : activeUnit.lexicon.length - 1;
                            setSelectedLexiconId(activeUnit.lexicon[prevIdx].id);
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition cursor-pointer"
                        >
                          <ArrowLeft className="h-3.5 w-3.5" />
                          <span>Từ trước</span>
                        </button>

                        <span className="font-mono text-white/70">
                          Từ{" "}
                          {activeUnit.lexicon.findIndex(
                            (l) => l.id === activeLexicon.id
                          ) + 1}{" "}
                          / {activeUnit.lexicon.length}
                        </span>

                        <button
                          type="button"
                          data-testid="inspector-next-word"
                          onClick={() => {
                            const idx = activeUnit.lexicon.findIndex(
                              (l) => l.id === activeLexicon.id
                            );
                            const nextIdx =
                              idx < activeUnit.lexicon.length - 1 ? idx + 1 : 0;
                            setSelectedLexiconId(activeUnit.lexicon[nextIdx].id);
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition cursor-pointer"
                        >
                          <span>Từ tiếp</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Structured Theory Cards (Sections A, B, C, D) */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#574D44] font-semibold px-1">
                    <Compass className="h-4 w-4 text-[#C86D51]" />
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
                          <h4 className="font-serif font-bold text-base sm:text-lg text-[#241F1C]">
                            {section.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-[#574D44]">
                            {section.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2.5 pl-10">
                        {section.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#EFE9DF] space-y-1.5"
                          >
                            <div className="text-sm font-bold text-[#002147]">
                              {item.label}
                            </div>
                            <p className="text-sm text-[#3A312B] leading-relaxed">
                              {item.detail}
                            </p>
                            {item.example && (
                              <p className="text-xs sm:text-sm italic text-[#9C4124]">
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
                <div className="bg-white rounded-3xl border border-[#E6DDD0] p-5 sm:p-6 flex items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#FBEBE5] text-[#C86D51] flex items-center justify-center shrink-0">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1F1A17]">
                        Trang Phải · Bài tập Tuyển chọn Trực quan
                      </h2>
                      <p className="text-sm text-[#4E453E] mt-0.5">
                        Chọn lọc các bài tập đắt giá nhất — làm trực tiếp và xem giải thích tức thì.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-[#E6DDD0] px-5 py-3 flex flex-wrap items-center justify-between gap-3 shadow-xs">
                  <div className="text-sm text-[#4E453E]">
                    <strong className="text-[#1F1A17]">Chế độ khó:</strong>{" "}
                    ẩn kho mảnh ghép và gợi ý ở bài điền từ để tự truy hồi đáp án.
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={hardMode}
                    onClick={toggleHardMode}
                    className={`px-3.5 py-1.5 rounded-xl text-sm font-semibold border transition cursor-pointer ${
                      hardMode
                        ? "bg-[#002147] text-white border-[#002147]"
                        : "bg-white text-[#1F1A17] border-[#DCCFBE] hover:border-[#C86D51]"
                    }`}
                  >
                    {hardMode ? "Đang bật" : "Đang tắt"}
                  </button>
                </div>

                {activeUnit.exercises.map((exercise) => {
                  const isChecked = Boolean(checkedExercises[exercise.id]);
                  const score = isChecked
                    ? computeExerciseScore(exercise, answers, subAnswers)
                    : null;
                  const missedUnbookmarked = isChecked
                    ? getMissedLexiconForExercise(
                        exercise,
                        answers,
                        subAnswers,
                        activeUnit.lexicon
                      ).filter(
                        (lex) => !isLexiconBookmarked(activeUnit.unitId, lex.id)
                      )
                    : [];

                  return (
                    <div
                      key={exercise.id}
                      data-testid={`exercise-${exercise.id}`}
                      className="bg-white rounded-3xl border border-[#E6DDD0] shadow-sm overflow-hidden"
                    >
                      <div className="px-6 py-4 border-b border-[#F2ECE2] bg-[#FAF7F2]/70 flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <span className="text-xs font-mono uppercase tracking-wider text-[#9C4124] font-bold">
                            {exercise.sourceNote}
                          </span>
                          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1F1A17] mt-0.5">
                            {exercise.title}
                          </h3>
                        </div>

                        {score && (
                          <span
                            className={`px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold ${
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
                        <p className="text-sm sm:text-[15px] text-[#3A312B] leading-relaxed">
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
                            hardMode={hardMode}
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

                        {/* Mistake Auto-Capture Banner */}
                        {isChecked && missedUnbookmarked.length > 0 && (
                          <div
                            data-testid={`missed-vocab-banner-${exercise.id}`}
                            className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-wrap items-center justify-between gap-3"
                          >
                            <div className="space-y-1">
                              <div className="text-xs sm:text-sm font-bold text-amber-950">
                                Phát hiện {missedUnbookmarked.length} từ bạn làm chưa đúng chưa có trong Sổ từ:
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {missedUnbookmarked.map((lex) => (
                                  <span
                                    key={lex.id}
                                    className="px-2 py-0.5 rounded-md bg-white border border-amber-300 text-xs font-mono font-bold text-[#9C4124]"
                                  >
                                    {lex.word}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <button
                              type="button"
                              data-testid={`save-missed-vocab-${exercise.id}`}
                              disabled={isSyncing}
                              onClick={() =>
                                batchAddBookmarks(
                                  activeUnit.unitId,
                                  missedUnbookmarked
                                )
                              }
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#C86D51] hover:bg-[#B25A3F] text-white shadow-2xs transition cursor-pointer shrink-0"
                            >
                              <Bookmark className="h-3.5 w-3.5" />
                              <span>
                                Lưu ngay {missedUnbookmarked.length} từ làm sai vào Sổ từ SM-2
                              </span>
                            </button>
                          </div>
                        )}

                        {/* Action Bar */}
                        <div className="pt-3 border-t border-[#F2ECE2] flex flex-wrap items-center justify-between gap-3">
                          <button
                            type="button"
                            onClick={() => handleResetExercise(exercise)}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-[#4E453E] hover:bg-[#FAF7F2] border border-[#E6DDD0] transition cursor-pointer"
                          >
                            <RotateCcw className="h-4 w-4" />
                            <span>Làm lại</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleCheckExercise(exercise)}
                            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold bg-[#002147] hover:bg-[#00336E] text-white shadow-sm transition cursor-pointer"
                          >
                            <Check className="h-4 w-4" />
                            <span>Kiểm tra đáp án</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* IELTS Active Production Sandbox (Band 7.0 -> 8.0+ Output Bridge) */}
                <div
                  data-testid="production-sandbox"
                  className="bg-white rounded-3xl border border-[#E6DDD0] shadow-sm overflow-hidden"
                >
                  <div className="px-6 py-4 border-b border-[#F2ECE2] bg-[#002147] text-white flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold">
                        Bước chuyển hóa · Receptive → Productive
                      </span>
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-white mt-0.5">
                        Thử thách Viết câu IELTS Thực chiến (Active Output Sandbox)
                      </h3>
                    </div>

                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-400/20 text-emerald-200 border border-emerald-400/30">
                      Đã vận dụng:{" "}
                      {
                        activeUnit.lexicon.filter((lex) =>
                          doesDraftUseLexicon(
                            sandboxDrafts[activeUnit.unitId] || "",
                            lex
                          )
                        ).length
                      }
                      /{activeUnit.lexicon.length} từ
                    </span>
                  </div>

                  <div className="p-6 space-y-4">
                    <p className="text-sm text-[#3A312B] leading-relaxed">
                      Để thực sự sở hữu từ vựng ở mức <strong>Band 7.5–8.0+</strong>, hãy tự viết{" "}
                      <strong>2–3 câu trả lời Speaking Part 3 hoặc luận điểm Writing Task 2</strong> về chủ đề{" "}
                      <strong className="text-[#002147]">
                        “{activeUnit.titleEn} ({activeUnit.titleVi})”
                      </strong>{" "}
                      có sử dụng ít nhất 3 từ vựng dưới đây:
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {activeUnit.lexicon.slice(0, 8).map((lex) => {
                        const used = doesDraftUseLexicon(
                          sandboxDrafts[activeUnit.unitId] || "",
                          lex
                        );
                        return (
                          <button
                            key={lex.id}
                            type="button"
                            onClick={() => setSelectedLexiconId(lex.id)}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                              used
                                ? "bg-emerald-600 text-white border-emerald-600"
                                : "bg-[#FAF7F2] text-[#3A312B] border-[#E6DDD0] hover:border-[#002147]"
                            }`}
                          >
                            {used && <CheckCircle2 className="h-3 w-3 shrink-0" />}
                            <span>{lex.word}</span>
                          </button>
                        );
                      })}
                    </div>

                    <textarea
                      data-testid="production-sandbox-input"
                      rows={3}
                      value={sandboxDrafts[activeUnit.unitId] || ""}
                      onChange={(e) =>
                        handleUpdateSandboxDraft(
                          activeUnit.unitId,
                          e.target.value
                        )
                      }
                      placeholder={`Viết thử 2–3 câu vận dụng các từ như "${activeUnit.lexicon[0]?.word}", "${activeUnit.lexicon[1]?.word || ""}"... (Tự động lưu nháp trên trình duyệt)`}
                      className="w-full p-3.5 rounded-2xl border border-[#CBBBA4] bg-[#FAF7F2]/60 text-sm sm:text-base text-[#1F1A17] focus:outline-none focus:border-[#002147] focus:bg-white transition leading-relaxed"
                    />
                  </div>
                </div>
              </section>
            )}
          </div>
        )}

        {viewMode !== "bookmarks" && (
          <nav
            aria-label="Điều hướng Unit"
            className="mt-10 pt-6 border-t border-[#E6DDD0] flex flex-wrap items-center justify-between gap-3"
          >
            <Link
              to={baseRoute}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-[#F4EFE6] text-[#1F1A17] border border-[#DCCFBE] text-sm font-semibold transition shadow-2xs"
            >
              <ArrowLeft className="h-4 w-4 text-[#574D44]" />
              <span>Về trang Chọn Unit</span>
            </Link>

            <div className="flex flex-wrap items-center gap-2.5">
              {prevUnit && (
                <Link
                  to={`${baseRoute}/${prevUnit.unitId}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-[#F4EFE6] text-[#3A312B] border border-[#DCCFBE] text-sm font-semibold transition"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Unit {prevUnit.unitId}: {prevUnit.titleEn}</span>
                </Link>
              )}

              {nextUnit && (
                <Link
                  to={`${baseRoute}/${nextUnit.unitId}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#002147] hover:bg-[#00336E] text-white text-sm font-bold transition shadow-sm"
                >
                  <span>
                    Học tiếp Unit {nextUnit.unitId}: {nextUnit.titleEn}
                  </span>
                  <ArrowRight className="h-4 w-4 text-amber-300" />
                </Link>
              )}
            </div>
          </nav>
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
  hardMode: boolean;
}

function GapFillExerciseBody({
  exercise,
  answers,
  isChecked,
  focusedGapId,
  onFocusGap,
  onChangeAnswer,
  hardMode,
  onPickWordBank
}: GapFillBodyProps) {
  return (
    <div className="space-y-4">
      {!hardMode && exercise.wordBank && exercise.wordBank.length > 0 && (
        <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE1D3] space-y-2.5">
          <div className="text-xs font-mono uppercase tracking-wider text-[#574D44] font-semibold">
            Kho mảnh ghép (chạm để điền vào ô đang chọn):
          </div>
          <div className="flex flex-wrap gap-2">
            {exercise.wordBank.map((word) => (
              <button
                key={word}
                type="button"
                disabled={isChecked}
                onClick={() => onPickWordBank(word)}
                className="px-3.5 py-1.5 rounded-xl text-sm font-bold bg-white border border-[#DCCFBE] text-[#1F1A17] hover:border-[#C86D51] hover:bg-[#FBEBE5] disabled:opacity-50 transition cursor-pointer shadow-2xs"
              >
                {word}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3.5">
        {exercise.questions.map((q, index) => {
          const val = answers[q.id] || "";
          const ok =
            isChecked && isGapCorrect(val, q.answer, q.acceptedAnswers);
          const isFocused = focusedGapId === q.id;

          return (
            <div
              key={q.id}
              className={`p-4 sm:p-5 rounded-2xl border transition ${
                isChecked
                  ? ok
                    ? "bg-emerald-50/70 border-emerald-200"
                    : "bg-rose-50/70 border-rose-200"
                  : isFocused
                  ? "bg-white border-[#C86D51] ring-2 ring-[#C86D51]/15"
                  : "bg-[#FAF7F2]/50 border-[#EAE1D3]"
              }`}
            >
              <div className="text-base sm:text-[17px] font-medium text-[#1F1A17] leading-relaxed flex flex-wrap items-center gap-2">
                <span className="font-mono text-sm font-bold text-[#574D44] mr-0.5">
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
                  className="px-3 py-1.5 rounded-lg border border-[#CBBBA4] bg-white text-sm sm:text-base font-semibold text-[#002147] min-w-[155px] focus:outline-none focus:border-[#002147]"
                />
                {q.promptAfter && <span>{q.promptAfter}</span>}
              </div>

              {!hardMode && q.hint && !isChecked && (
                <p className="text-xs text-[#574D44] mt-2">
                  Gợi ý: {q.hint}
                </p>
              )}

              {isChecked && (
                <div className="mt-3 pt-3 border-t border-black/10 text-sm space-y-1.5">
                  <div className="flex items-center gap-1.5 font-semibold">
                    {ok ? (
                      <span className="text-emerald-700 inline-flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4" /> Chính xác!
                      </span>
                    ) : (
                      <span className="text-rose-700 inline-flex items-center gap-1">
                        <XCircle className="h-4 w-4" /> Đáp án chuẩn:{" "}
                        <strong className="underline">{q.answer}</strong>
                      </span>
                    )}
                  </div>
                  <p className="text-[#3A312B] leading-relaxed">{q.explanationVi}</p>
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
      <div className="grid sm:grid-cols-2 gap-2.5">
        {exercise.categories.map((cat) => (
          <div
            key={cat.key}
            className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EAE1D3]"
          >
            <div className="text-sm font-bold text-[#002147]">{cat.label}</div>
            <div className="text-xs sm:text-sm text-[#4E453E] mt-0.5">{cat.description}</div>
          </div>
        ))}
      </div>

      {/* Questions */}
      <div className="space-y-3.5">
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
              className={`p-4 sm:p-5 rounded-2xl border space-y-3 ${
                isChecked
                  ? isRowOk
                    ? "bg-emerald-50/70 border-emerald-200"
                    : "bg-rose-50/70 border-rose-200"
                  : "bg-[#FAF7F2]/50 border-[#EAE1D3]"
              }`}
            >
              <p className="text-base sm:text-[17px] font-medium text-[#1F1A17] leading-relaxed">
                <span className="font-mono text-sm font-bold text-[#574D44] mr-1.5">
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
                      className={`px-3.5 py-2 rounded-xl text-sm sm:text-base font-semibold border transition cursor-pointer ${
                        selected
                          ? "bg-[#002147] text-white border-[#002147]"
                          : "bg-white text-[#1F1A17] border-[#DCCFBE] hover:border-[#C86D51]"
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              {q.subPrompt && picked === "YES" && (
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-sm font-medium text-[#3A312B]">
                    {q.subPrompt}
                  </span>
                  <input
                    type="text"
                    value={subVal}
                    disabled={isChecked}
                    onChange={(e) => onChangeSubAnswer(q.id, e.target.value)}
                    placeholder="Nhập từ sau ghép..."
                    className="px-3 py-1.5 rounded-lg border border-[#CBBBA4] bg-white text-sm sm:text-base font-semibold text-[#002147]"
                  />
                </div>
              )}

              {isChecked && (
                <div className="pt-2.5 border-t border-black/10 text-sm space-y-1.5">
                  <div className="font-semibold">
                    {isRowOk ? (
                      <span className="text-emerald-700 inline-flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4" /> Chính xác!
                      </span>
                    ) : (
                      <span className="text-rose-700 inline-flex items-center gap-1">
                        <XCircle className="h-4 w-4" /> Đáp án:{" "}
                        <strong>
                          {q.correctCategory}
                          {q.subCorrectAnswer ? ` (${q.subCorrectAnswer})` : ""}
                        </strong>
                      </span>
                    )}
                  </div>
                  <p className="text-[#3A312B] leading-relaxed">{q.explanationVi}</p>
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
              className={`p-4 sm:p-5 rounded-2xl border space-y-3 ${
                isChecked
                  ? ok
                    ? "bg-emerald-50/70 border-emerald-200"
                    : "bg-rose-50/70 border-rose-200"
                  : "bg-[#FAF7F2]/50 border-[#EAE1D3]"
              }`}
            >
              <div>
                <p className="text-base sm:text-[17px] font-medium text-[#1F1A17] leading-relaxed">
                  <span className="font-mono text-sm font-bold text-[#574D44] mr-1.5">
                    {idx + 1}.
                  </span>
                  {q.originalSentence}
                </p>
                {q.promptCue && (
                  <p className="text-xs sm:text-sm text-[#574D44] mt-1 pl-5">
                    Ngữ cảnh: {q.promptCue}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                {q.options.map((option) => {
                  const isSelected = picked === option;
                  const isCorrectOpt = option === q.correctOption;

                  let btnClass =
                    "bg-white text-[#1F1A17] border-[#DCCFBE] hover:border-[#C86D51]";
                  if (isChecked) {
                    if (isCorrectOpt) {
                      btnClass =
                        "bg-emerald-600 text-white border-emerald-600 font-semibold";
                    } else if (isSelected && !isCorrectOpt) {
                      btnClass =
                        "bg-rose-600 text-white border-rose-600 line-through";
                    } else {
                      btnClass = "bg-white/60 text-[#574D44] border-[#EAE1D3]";
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
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-sm sm:text-base border transition cursor-pointer ${btnClass}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {isChecked && (
                <p className="text-sm text-[#3A312B] leading-relaxed pt-2 border-t border-black/10">
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
  dueReviewItems?: VocabInUseBookmarkRecord[];
  onSubmitReview?: (
    bookmarkId: string,
    isCorrect: boolean,
    latencyMs?: number
  ) => Promise<void>;
  isAuthenticated?: boolean;
  isSyncing?: boolean;
  syncError?: string | null;
}

function BookmarksDeckView({
  items,
  onRemove,
  onJumpToUnit,
  dueReviewItems = [],
  onSubmitReview,
  isAuthenticated = false,
  isSyncing = false,
  syncError = null,
}: BookmarksDeckProps) {
  const [reviewIndex, setReviewIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [recallInput, setRecallInput] = useState("");
  const [recallResult, setRecallResult] = useState<"correct" | "wrong" | null>(
    null
  );
  const [isReviewSubmitting, setIsReviewSubmitting] = useState(false);
  const cardShownAtRef = useRef<number>(Date.now());

  const currentDueItem = dueReviewItems[reviewIndex];

  useEffect(() => {
    cardShownAtRef.current = Date.now();
    setRecallInput("");
    setRecallResult(null);
    setIsRevealed(false);
  }, [currentDueItem?.id]);

  const handleCheckRecall = () => {
    if (!currentDueItem) return;
    const ok = isGapCorrect(recallInput, currentDueItem.word);
    setRecallResult(ok ? "correct" : "wrong");
    setIsRevealed(true);
    speakEnglish(currentDueItem.word);
  };

  const handleReviewAnswer = async (isCorrect: boolean) => {
    if (!currentDueItem || !onSubmitReview || isReviewSubmitting) return;
    const latencyMs = Math.max(100, Date.now() - cardShownAtRef.current);
    setIsReviewSubmitting(true);
    try {
      await onSubmitReview(currentDueItem.id, isCorrect, latencyMs);
      setIsRevealed(false);
      setRecallInput("");
      setRecallResult(null);
      if (reviewIndex >= dueReviewItems.length - 1) {
        setReviewIndex(0);
      }
    } finally {
      setIsReviewSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Sync Error Notice */}
      {syncError && (
        <div
          data-testid="sync-error-banner"
          className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-sm flex items-center gap-3"
        >
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
          <div className="flex-1">
            <strong>Thông báo lưu trữ:</strong> {syncError}
          </div>
        </div>
      )}

      {/* Guest Warning / Cloud Sync Badge */}
      {!isAuthenticated && (
        <div className="p-4 rounded-2xl bg-[#002147]/5 border border-[#002147]/10 text-[#002147] text-sm flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Sparkles className="h-4 w-4 text-[#C86D51] shrink-0" />
            <span>
              Bạn đang ở chế độ <strong>Khách</strong>: Từ vựng lưu an toàn trên trình duyệt này.
              Đăng nhập để đồng bộ lên tài khoản và mở khóa chu kỳ ôn tập ngắt quãng (SM-2).
            </span>
          </div>
        </div>
      )}

      {/* Spaced Repetition Due Review Box (Active Cloze Recall) */}
      {isAuthenticated && dueReviewItems.length > 0 && currentDueItem && (
        <div
          data-testid="due-review-card"
          className="p-6 rounded-3xl bg-gradient-to-br from-[#002147] to-[#133560] text-white space-y-4 shadow-md"
        >
          <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-amber-300" />
              <h3 className="font-serif text-lg sm:text-xl font-bold">
                Ôn tập Trí nhớ Dài hạn (SM-2 · Active Recall)
              </h3>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-amber-400 text-[#002147]">
              {reviewIndex + 1} / {dueReviewItems.length} từ đến hạn
            </span>
          </div>

          <div className="space-y-3">
            {/* Meaning Prompt & POS */}
            <div className="flex flex-wrap items-center gap-2">
              {currentDueItem.pos && (
                <span className="text-xs uppercase font-mono px-2.5 py-0.5 rounded bg-amber-400/20 text-amber-200 border border-amber-400/30 font-bold">
                  {currentDueItem.pos}
                </span>
              )}
              <span className="text-base sm:text-lg font-medium text-emerald-200">
                <strong>Nghĩa gợi mở:</strong> {currentDueItem.meaningVi}
              </span>
            </div>

            {/* Cloze Example or Revealed Example */}
            {currentDueItem.example && (
              <p
                data-testid="sm2-example-sentence"
                className="text-sm sm:text-base text-white/90 italic bg-black/20 p-3.5 rounded-2xl border border-white/10"
              >
                “
                {isRevealed
                  ? currentDueItem.example
                  : maskWordInExample(
                      currentDueItem.example,
                      currentDueItem.word
                    )}
                ”
              </p>
            )}

            {!isRevealed ? (
              <div className="space-y-3 pt-1">
                <div className="flex flex-wrap items-center gap-2">
                  <input
                    type="text"
                    data-testid="sm2-recall-input"
                    value={recallInput}
                    onChange={(e) => setRecallInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleCheckRecall();
                      }
                    }}
                    placeholder="Gõ lại từ tiếng Anh cần điền..."
                    className="flex-1 min-w-[200px] px-3.5 py-2 rounded-xl bg-white text-[#002147] font-semibold text-sm sm:text-base focus:outline-none"
                  />
                  <button
                    type="button"
                    data-testid="sm2-check-btn"
                    onClick={handleCheckRecall}
                    className="py-2 px-4 rounded-xl text-sm font-bold bg-amber-400 hover:bg-amber-300 text-[#002147] transition cursor-pointer"
                  >
                    Kiểm tra từ
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsRevealed(true)}
                    className="py-2 px-4 rounded-xl text-sm font-bold bg-white/10 hover:bg-white/20 text-amber-200 transition cursor-pointer"
                  >
                    👁️ Hiện nghĩa tiếng Việt &amp; Sắc thái
                  </button>
                </div>
              </div>
            ) : (
              <div className="pt-3 space-y-3 border-t border-white/10">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-serif font-bold text-amber-200">
                      {currentDueItem.word}
                    </span>
                    {currentDueItem.ipa && (
                      <span className="text-sm font-mono text-white/70">
                        {currentDueItem.ipa}
                      </span>
                    )}
                  </div>

                  {recallResult && (
                    <span
                      data-testid="sm2-recall-feedback"
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        recallResult === "correct"
                          ? "bg-emerald-500/30 text-emerald-100 border border-emerald-400/40"
                          : "bg-rose-500/30 text-rose-100 border border-rose-400/40"
                      }`}
                    >
                      {recallResult === "correct"
                        ? "🎉 Chính xác! Bạn đã tự truy hồi đúng từ vựng."
                        : `Chưa khớp (Bạn gõ: "${recallInput || "trống"}")`}
                    </span>
                  )}
                </div>

                {currentDueItem.nuanceTip && (
                  <p className="text-xs sm:text-sm text-amber-100/90 bg-white/5 p-3 rounded-xl border border-white/10">
                    💡 <strong>Sắc thái &amp; Ghi nhớ:</strong>{" "}
                    {currentDueItem.nuanceTip}
                  </p>
                )}

                <div className="flex flex-wrap gap-3 pt-1">
                  <button
                    type="button"
                    disabled={isReviewSubmitting}
                    onClick={() => handleReviewAnswer(false)}
                    className="flex-1 py-2.5 px-4 rounded-xl text-sm font-bold bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-400/30 transition cursor-pointer"
                  >
                    ❌ Chưa nhớ (Ôn lại sau 1 ngày)
                  </button>
                  <button
                    type="button"
                    disabled={isReviewSubmitting}
                    onClick={() => handleReviewAnswer(true)}
                    className="flex-1 py-2.5 px-4 rounded-xl text-sm font-bold bg-emerald-500/30 hover:bg-emerald-500/40 text-emerald-100 border border-emerald-400/40 transition cursor-pointer"
                  >
                    ✅ Đã nhớ (+{currentDueItem.intervalDays === 1 ? 3 : 7} ngày)
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bookmarks Grid / Empty State */}
      {items.length === 0 ? (
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
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-[#241F1C]">
              Sổ từ vựng Đã lưu ({items.length})
            </h2>
            {isSyncing && (
              <span className="text-xs text-[#574D44] inline-flex items-center gap-1.5 font-medium">
                <RefreshCw className="h-3.5 w-3.5 animate-spin" /> Đang đồng bộ...
              </span>
            )}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map(({ unitId, unitTitle, lexicon }) => (
              <div
                key={`${unitId}:${lexicon.id}`}
                className="bg-white rounded-2xl border border-[#E6DDD0] p-5 space-y-3 flex flex-col justify-between shadow-xs"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-[#FAF7F2] text-[#574D44] border border-[#EAE1D3]">
                      {unitTitle}
                    </span>
                    <button
                      type="button"
                      onClick={() => speakEnglish(lexicon.word)}
                      className="p-1.5 rounded-lg bg-[#FAF7F2] hover:bg-[#EFE9DF] text-[#002147] cursor-pointer"
                      aria-label={`Nghe ${lexicon.word}`}
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1F1A17]">
                      {lexicon.word}
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-[#574D44]">
                      {lexicon.ipa} · {lexicon.pos}
                    </p>
                  </div>
                  <p className="text-sm text-[#2D2825] font-medium">
                    {lexicon.meaningVi}
                  </p>
                  <p className="text-xs sm:text-sm text-[#4E453E] italic">
                    “{lexicon.example}”
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F2ECE2] flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => onJumpToUnit(unitId, lexicon.id)}
                    className="text-xs sm:text-sm font-semibold text-[#C86D51] hover:underline cursor-pointer"
                  >
                    Mở lại ngữ cảnh →
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemove(unitId, lexicon.id)}
                    className="text-xs sm:text-sm text-[#574D44] hover:text-rose-600 cursor-pointer"
                  >
                    Bỏ lưu
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface UnitCatalogViewProps {
  baseRoute: string;
  exerciseProgress: Record<string, ExerciseScore>;
  savedBookmarkItems: SavedBookmarkItem[];
  bookmarksOpen: boolean;
  onToggleBookmarks: (open: boolean) => void;
  onRemoveBookmark: (unitId: number, lexiconId: string) => void;
  onJumpToUnit: (unitId: number, lexiconId: string) => void;
}

function UnitCatalogView({
  baseRoute,
  exerciseProgress,
  savedBookmarkItems,
  bookmarksOpen,
  onToggleBookmarks,
  onRemoveBookmark,
  onJumpToUnit
}: UnitCatalogViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChapter, setSelectedChapter] = useState<string>("all");

  const chapterOptions = useMemo(() => {
    const counts = new Map<string, number>();
    VOCAB_IN_USE_UNITS.forEach((u) => {
      counts.set(u.chapterTitle, (counts.get(u.chapterTitle) || 0) + 1);
    });
    return Array.from(counts.entries()).map(([title, count]) => ({
      title,
      count
    }));
  }, []);

  const totalLexiconCount = useMemo(
    () => VOCAB_IN_USE_UNITS.reduce((sum, u) => sum + u.lexicon.length, 0),
    []
  );
  const totalExercisesCount = useMemo(
    () => VOCAB_IN_USE_UNITS.reduce((sum, u) => sum + u.exercises.length, 0),
    []
  );
  const totalCompletedExercises = useMemo(
    () =>
      VOCAB_IN_USE_UNITS.reduce(
        (sum, u) =>
          sum + u.exercises.filter((ex) => Boolean(exerciseProgress[ex.id])).length,
        0
      ),
    [exerciseProgress]
  );

  const filteredUnits = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return VOCAB_IN_USE_UNITS.filter((u) => {
      const matchesChapter =
        selectedChapter === "all" || u.chapterTitle === selectedChapter;
      if (!matchesChapter) return false;
      if (!q) return true;
      return (
        `unit ${u.unitId}`.includes(q) ||
        u.titleEn.toLowerCase().includes(q) ||
        u.titleVi.toLowerCase().includes(q) ||
        u.summaryVi.toLowerCase().includes(q) ||
        u.chapterTitle.toLowerCase().includes(q) ||
        u.lexicon.some(
          (l) =>
            l.word.toLowerCase().includes(q) ||
            l.meaningVi.toLowerCase().includes(q)
        )
      );
    });
  }, [searchQuery, selectedChapter]);

  return (
    <div
      data-testid="vocab-in-use-catalog"
      className="min-h-screen bg-[#FAF7F2] text-[#2D2825] font-sans selection:bg-[#F2DBD3] selection:text-[#2D2825]"
    >
      <SEO
        title="Danh mục Chủ đề & Chọn Unit — Vocabulary in Use (C1–C2) | NextBand"
        description="Chọn Unit từ giáo trình English Vocabulary in Use Advanced (C1–C2) với mô hình học 2 trang đối xứng: đọc ngữ cảnh tra từ & làm bài tập tuyển chọn trực quan."
      />

      {/* Catalog Header */}
      <header className="sticky top-0 z-40 border-b border-[#EAE3D9] bg-[#002147] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              to="/reading"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors shrink-0"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Tab Đọc</span>
            </Link>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-amber-400/20 text-amber-200 border border-amber-400/30">
                  VOCABULARY IN USE · C1 – C2
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-serif font-bold text-white truncate mt-0.5">
                Danh mục Chủ đề &amp; Chọn Unit
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-white/10 p-1 rounded-xl border border-white/15 shrink-0">
            <button
              type="button"
              onClick={() => onToggleBookmarks(false)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                !bookmarksOpen
                  ? "bg-white text-[#002147] shadow-xs"
                  : "text-slate-200 hover:text-white"
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Danh mục Unit</span>
            </button>

            <button
              type="button"
              onClick={() => onToggleBookmarks(true)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                bookmarksOpen
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
        {bookmarksOpen ? (
          <BookmarksDeckView
            items={savedBookmarkItems}
            onRemove={onRemoveBookmark}
            onJumpToUnit={onJumpToUnit}
          />
        ) : (
          <>
            {/* Hero Banner introducing the book & 2-Page Spread model */}
            <section className="rounded-3xl bg-gradient-to-br from-[#002147] via-[#0B2F5E] to-[#123E78] text-white p-6 sm:p-10 shadow-xl relative overflow-hidden">
              <div className="space-y-6">
                <div className="space-y-3 max-w-3xl">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-200 border border-amber-400/30 text-xs font-mono uppercase tracking-wider font-semibold">
                    <Sparkles className="h-3.5 w-3.5" />
                    English Vocabulary in Use · Advanced (C1–C2)
                  </span>
                  <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white leading-tight">
                    Số hóa Studio Học Từ vựng 2 Trang Đối xứng
                  </h2>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                    Chọn một Unit phù hợp để bước vào phòng học tập trung:{" "}
                    <strong className="text-white">Trang Trái</strong> giúp bạn đọc ngữ cảnh tự nhiên, chạm từ để tra sắc thái và nghe phát âm bản xứ;{" "}
                    <strong className="text-white">Trang Phải</strong> là hệ thống bài tập tuyển chọn trực quan có chấm điểm và giải thích song ngữ tức thì.
                  </p>
                </div>

                {/* 4 Quick Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
                  <div className="rounded-2xl bg-white/10 border border-white/15 p-4">
                    <div className="text-xl sm:text-2xl font-bold text-amber-300 font-mono">
                      100 Units
                    </div>
                    <div className="text-xs sm:text-sm text-slate-200 mt-0.5">
                      Lộ trình toàn sách
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white/10 border border-white/15 p-4">
                    <div className="text-xl sm:text-2xl font-bold text-emerald-300 font-mono">
                      {VOCAB_IN_USE_UNITS.length} Units
                    </div>
                    <div className="text-xs sm:text-sm text-slate-200 mt-0.5">
                      Sẵn sàng học ngay
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white/10 border border-white/15 p-4">
                    <div className="text-xl sm:text-2xl font-bold text-sky-200 font-mono">
                      {totalLexiconCount} mục từ
                    </div>
                    <div className="text-xs sm:text-sm text-slate-200 mt-0.5">
                      Từ vựng trọng tâm C1–C2
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white/10 border border-white/15 p-4">
                    <div className="text-xl sm:text-2xl font-bold text-white font-mono">
                      {totalCompletedExercises}/{totalExercisesCount}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-200 mt-0.5">
                      Bài tập đã hoàn thành
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Search Bar & Chapter Filters */}
            <section
              aria-label="Tìm kiếm Unit"
              className="bg-white rounded-2xl border border-[#E6DDD0] p-4 shadow-2xs space-y-3"
            >
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1">
                  <Search className="h-4 w-4 text-[#574D44] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm Unit theo tên, chủ đề tiếng Việt hoặc từ vựng (e.g., sits, flexi-time, plagiarism)..."
                    aria-label="Tìm kiếm Unit"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#DCCFBE] bg-[#FAF7F2]/60 text-sm sm:text-base text-[#1F1A17] placeholder:text-[#574D44]/70 focus:outline-none focus:border-[#002147] focus:bg-white transition"
                  />
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 text-xs sm:text-sm text-[#4E453E] shrink-0 px-1">
                  <span>
                    Hiển thị{" "}
                    <strong className="text-[#1F1A17]">
                      {filteredUnits.length}/{VOCAB_IN_USE_UNITS.length} Units
                    </strong>
                  </span>
                  {(searchQuery.trim() || selectedChapter !== "all") && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedChapter("all");
                      }}
                      className="text-xs sm:text-sm font-semibold text-[#C86D51] hover:underline cursor-pointer"
                    >
                      Xóa lọc
                    </button>
                  )}
                </div>
              </div>

              {chapterOptions.length > 1 && (
                <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#F2ECE2]">
                  <span className="text-xs font-semibold text-[#574D44] mr-1">
                    Chủ đề:
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedChapter("all")}
                    className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
                      selectedChapter === "all"
                        ? "bg-[#002147] text-white shadow-2xs"
                        : "bg-[#FAF7F2] text-[#4E453E] border border-[#E6DDD0] hover:border-[#002147]"
                    }`}
                  >
                    Tất cả ({VOCAB_IN_USE_UNITS.length})
                  </button>
                  {chapterOptions.map((ch) => (
                    <button
                      key={ch.title}
                      type="button"
                      onClick={() => setSelectedChapter(ch.title)}
                      className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
                        selectedChapter === ch.title
                          ? "bg-[#002147] text-white shadow-2xs"
                          : "bg-[#FAF7F2] text-[#4E453E] border border-[#E6DDD0] hover:border-[#002147]"
                      }`}
                    >
                      {ch.title} ({ch.count})
                    </button>
                  ))}
                </div>
              )}
            </section>

            {/* Digitized Units Grid */}
            <section aria-label="Danh sách Unit" className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#E6DDD0] pb-3">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#9C4124] font-bold">
                    Đã số hóa · Phiên bản Interactive Studio
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1F1A17] mt-0.5">
                    Chọn Unit để Bắt đầu Học &amp; Luyện tập
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#574D44]">
                  Mỗi Unit gồm 1 bài đọc ngữ cảnh + {`3–4`} bài tập trực quan
                </p>
              </div>

              {filteredUnits.length === 0 ? (
                <div className="bg-white rounded-3xl border border-dashed border-[#CBBBA4] p-10 text-center space-y-3">
                  <Search className="h-8 w-8 text-[#574D44] mx-auto opacity-70" />
                  <p className="text-base font-semibold text-[#1F1A17]">
                    Không tìm thấy Unit nào khớp với “{searchQuery}”
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedChapter("all");
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#002147] text-white text-sm font-semibold cursor-pointer"
                  >
                    Hiển thị tất cả Units
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredUnits.map((unit) => {
                    const completedInUnit = unit.exercises.filter((ex) =>
                      Boolean(exerciseProgress[ex.id])
                    ).length;

                    return (
                      <article
                        key={unit.unitId}
                        data-testid={`unit-card-${unit.unitId}`}
                        className="bg-white rounded-3xl border border-[#E6DDD0] hover:border-[#C86D51] shadow-xs hover:shadow-lg transition-all p-6 flex flex-col justify-between gap-5"
                      >
                        <div className="space-y-3.5">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-[#002147] text-white">
                              UNIT {String(unit.unitId).padStart(2, "0")}
                            </span>
                            {completedInUnit > 0 ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                Đã luyện {completedInUnit}/{unit.exercises.length} bài
                              </span>
                            ) : (
                              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#FBEBE5] text-[#9C4124]">
                                Sẵn sàng học
                              </span>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-2 text-xs text-[#574D44] font-medium">
                            <span>{unit.chapterTitle}</span>
                            <span>·</span>
                            <span>{unit.cefr}</span>
                            <span>·</span>
                            <span className="inline-flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {unit.estimatedMinutes} phút
                            </span>
                          </div>

                          <div>
                            <h4 className="font-serif text-xl font-bold text-[#1F1A17] leading-snug">
                              {unit.titleEn}
                            </h4>
                            <p className="text-sm font-semibold text-[#9C4124] mt-1">
                              {unit.titleVi}
                            </p>
                          </div>

                          <p className="text-sm text-[#4E453E] leading-relaxed">
                            {unit.summaryVi}
                          </p>

                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {unit.lexicon.slice(0, 6).map((lex) => (
                              <span
                                key={lex.id}
                                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#FAF7F2] text-[#3A312B] border border-[#E6DDD0]"
                              >
                                {lex.word}
                              </span>
                            ))}
                            {unit.lexicon.length > 6 && (
                              <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#EFE9DF] text-[#574D44]">
                                +{unit.lexicon.length - 6} từ
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="pt-4 border-t border-[#F2ECE2] flex items-center justify-between gap-3">
                          <span className="text-xs sm:text-sm text-[#574D44] font-medium">
                            {unit.lexicon.length} từ · {unit.exercises.length} bài tập
                          </span>
                          <Link
                            to={`${baseRoute}/${unit.unitId}`}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#002147] hover:bg-[#00336E] text-white text-sm font-bold transition shadow-xs shrink-0"
                          >
                            <span>Vào học Unit {unit.unitId}</span>
                            <ArrowRight className="h-4 w-4 text-amber-300" />
                          </Link>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Full Book 100-Unit Roadmap */}
            <section
              aria-label="Lộ trình toàn sách 100 Units"
              className="bg-white rounded-3xl border border-[#E6DDD0] p-6 sm:p-8 space-y-5 shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#F2ECE2] pb-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#9C4124] font-bold">
                    <Layers className="h-3.5 w-3.5" />
                    Cấu trúc Giáo trình Toàn bộ
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1F1A17] mt-1">
                    Lộ trình toàn sách (100 Units)
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#574D44]">
                  Các chương tiếp theo đang được đội ngũ học thuật tiếp tục số hóa
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {ROADMAP_CHAPTERS.map((chap) => (
                  <div
                    key={chap.chapterNumber}
                    className={`rounded-2xl p-4 sm:p-5 border ${
                      chap.status === "live"
                        ? "bg-white border-emerald-200 shadow-xs"
                        : "bg-[#FAF7F2]/80 border-[#E5DCCD]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-[#574D44] font-bold">
                        {chap.unitRange}
                      </span>
                      {chap.status === "live" ? (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                          Hoàn thành · {chap.unitRange}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#EFE9DF] text-[#574D44]">
                          <Lock className="h-3 w-3" /> Sắp xuất bản
                        </span>
                      )}
                    </div>
                    <h4 className="font-serif font-bold text-base sm:text-lg text-[#241F1C]">
                      {chap.titleEn}
                    </h4>
                    <p className="text-sm text-[#4E453E] mb-2.5">{chap.titleVi}</p>
                    <ul className="space-y-1 text-xs sm:text-sm text-[#574D44]">
                      {chap.sampleTopics.map((topic) => (
                        <li key={topic} className="flex items-start gap-1.5">
                          <span className="text-[#C86D51] font-bold">•</span>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
