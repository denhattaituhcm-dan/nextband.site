import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { SEO } from "@/components/common/SEO";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  Brain,
  CheckCircle2,
  Eye,
  EyeOff,
  HelpCircle,
  Layers,
  RotateCcw,
  Search,
  Sparkles,
  Volume2,
  XCircle,
} from "lucide-react";
import { useEssentialVocabUnit } from "@/hooks/useEssentialVocabUnit";
import { useEssentialVocabBookmarks } from "@/hooks/useEssentialVocabBookmarks";
import { useEssentialVocabProgress } from "@/hooks/useEssentialVocabProgress";
import {
  gradeStage1Exercise,
  gradeStage2Exercise,
  gradeStage3Exercise,
  gradeStage4Exercise,
  type GradedStageSummary,
} from "@/lib/essentialVocab/exerciseGrader";
import type { EvcGlossaryEntry } from "@/data/essentialVocab/schema";

function speakEnglish(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-GB";
    u.rate = 0.95;
    window.speechSynthesis.speak(u);
  } catch {
    // Ignore speech synthesis errors
  }
}

type ActiveTab = "glossary" | "practice";
type ActiveStage = 1 | 2 | 3 | 4;

export const EssentialVocabUnitPage: React.FC = () => {
  const { unitSlug } = useParams<{ unitSlug: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const { canonicalUnitId, unitSummary, unitData, isLoading, error } =
    useEssentialVocabUnit(unitSlug, "evc-5");

  const {
    bookmarks,
    dueBookmarks,
    isBookmarked,
    toggleEntrySenseBookmark,
    bookmarkMissedEntries,
  } = useEssentialVocabBookmarks(canonicalUnitId);

  const { activeUnitProgress, recordStageAttempt } = useEssentialVocabProgress(
    "evc-5",
    canonicalUnitId
  );

  const initialTab: ActiveTab = location.pathname.endsWith("/practice")
    ? "practice"
    : "glossary";
  const [activeTab, setActiveTab] = useState<ActiveTab>(initialTab);
  const [activeStage, setActiveStage] = useState<ActiveStage>(1);

  useEffect(() => {
    if (location.pathname.endsWith("/practice")) {
      setActiveTab("practice");
    } else if (location.pathname.endsWith("/glossary")) {
      setActiveTab("glossary");
    }
  }, [location.pathname]);

  const switchTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    navigate(`/essential-vocabulary/unit/${canonicalUnitId}/${tab}`, {
      replace: true,
    });
  };

  // Glossary filters
  const [glossarySearch, setGlossarySearch] = useState("");
  const [posFilter, setPosFilter] = useState<string>("ALL");
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);

  // Exercise answers & graded states
  const [stage1Answers, setStage1Answers] = useState<Record<string, number>>({});
  const [stage2Answers, setStage2Answers] = useState<Record<string, number>>({});
  const [stage3Answers, setStage3Answers] = useState<Record<string, string>>({});
  const [stage4Answers, setStage4Answers] = useState<Record<string, string>>({});
  const [stage4Mode, setStage4Mode] = useState<"assisted" | "hard">("assisted");

  const [gradedResults, setGradedResults] = useState<
     Partial<Record<ActiveStage, GradedStageSummary>>
  >({});
  const [isSubmittingStage, setIsSubmittingStage] = useState(false);
  const [bookmarkToast, setBookmarkToast] = useState<string | null>(null);

  useEffect(() => {
    setStage1Answers({});
    setStage2Answers({});
    setStage3Answers({});
    setStage4Answers({});
    setGradedResults({});
    setBookmarkToast(null);
    setActiveStage(1);
  }, [canonicalUnitId]);

  const entriesById = useMemo(() => {
    const map: Record<string, EvcGlossaryEntry> = {};
    if (!unitData) return map;
    for (const entry of unitData.glossary) {
      map[entry.entryId] = entry;
    }
    return map;
  }, [unitData]);

  const filteredGlossary = useMemo(() => {
    if (!unitData) return [];
    const q = glossarySearch.trim().toLowerCase();
    return unitData.glossary.filter((entry) => {
      if (
        onlyBookmarked &&
        !entry.senses.some((s) =>
          isBookmarked(entry.unitId, entry.entryId, s.senseNumber)
        )
      ) {
        return false;
      }
      if (
        posFilter !== "ALL" &&
        !entry.senses.some((s) => s.pos === posFilter)
      ) {
        return false;
      }
      if (!q) return true;
      return (
        entry.displayHeadword.toLowerCase().includes(q) ||
        entry.senses.some(
          (s) =>
            s.definitionEn.toLowerCase().includes(q) ||
            s.meaningVi.toLowerCase().includes(q)
        )
      );
    });
  }, [unitData, glossarySearch, posFilter, onlyBookmarked, isBookmarked]);

  const allHeadwordsList = useMemo(() => {
    if (!unitData) return [];
    return unitData.glossary.map((e) => e.displayHeadword);
  }, [unitData]);

  const usedStage3Letters = useMemo(() => {
    return new Set(
      Object.values(stage3Answers)
        .map((v) => v?.trim().toUpperCase())
        .filter(Boolean)
    );
  }, [stage3Answers]);

  const handleGradeStage = async (stage: ActiveStage) => {
    if (!unitData) return;
    setIsSubmittingStage(true);
    setBookmarkToast(null);

    let summary: GradedStageSummary;
    if (stage === 1) {
      summary = gradeStage1Exercise(unitData.exercises.stage1, stage1Answers);
    } else if (stage === 2) {
      summary = gradeStage2Exercise(unitData.exercises.stage2, stage2Answers);
    } else if (stage === 3) {
      summary = gradeStage3Exercise(unitData.exercises.stage3, stage3Answers);
    } else {
      summary = gradeStage4Exercise(unitData.exercises.stage4, stage4Answers);
    }

    setGradedResults((prev) => ({ ...prev, [stage]: summary }));

    try {
      await recordStageAttempt({
        bookId: unitData.bookId,
        unitId: unitData.unitId,
        contentVersion: unitData.contentVersion,
        stage,
        mode: stage === 4 ? stage4Mode : "assisted",
        score: summary.score,
        maxScore: summary.maxScore,
        stageMaxScores: {
          stage1: unitData.exercises.stage1.questions.length,
          stage2: unitData.exercises.stage2.questions.length,
          stage3: unitData.exercises.stage3.blanks.length,
          stage4: unitData.exercises.stage4.blanks.length,
        },
        durationSec: 0,
        answersSnapshot: summary.items.map((item) => ({
          itemId: item.itemId,
          submittedValue: item.submittedValue,
          isCorrect: item.isCorrect,
          matchTier: item.matchTier,
          canonicalAnswer: item.canonicalAnswer,
        })),
        wrongEntryIds: summary.wrongEntryIds,
      });
    } catch {
      // Surface error via hook state if needed; grading result remains visible
    } finally {
      setIsSubmittingStage(false);
    }
  };

  const handleResetStage = (stage: ActiveStage) => {
    setGradedResults((prev) => {
      const next = { ...prev };
      delete next[stage];
      return next;
    });
    if (stage === 1) setStage1Answers({});
    if (stage === 2) setStage2Answers({});
    if (stage === 3) setStage3Answers({});
    if (stage === 4) setStage4Answers({});
    setBookmarkToast(null);
  };

  const handleBookmarkWrongWords = async (stage: ActiveStage) => {
    const res = gradedResults[stage];
    if (!res || res.wrongEntryIds.length === 0) return;
    const missedEntries = res.wrongEntryIds
      .map((id) => entriesById[id])
      .filter(Boolean);
    const count = await bookmarkMissedEntries(
      missedEntries,
      `stage_${stage}` as any
    );
    setBookmarkToast(
      count > 0
        ? `Đã thêm ${count} từ làm sai vào Sổ từ SM-2!`
        : "Tất cả các từ làm sai đã có sẵn trong Sổ từ của bạn."
    );
  };

  const renderPassageWithBlanks = (
    template: string,
    renderBlank: (blankNumber: number) => React.ReactNode
  ) => {
    const paragraphs = template.split("\n\n");
    return paragraphs.map((para, pIdx) => {
      const segments = para.split(/(\{\{\d+\}\})/g);
      return (
        <p
          key={pIdx}
          className="mb-4 text-sm leading-8 text-slate-800 sm:text-base sm:leading-9"
        >
          {segments.map((seg, sIdx) => {
            const match = seg.match(/^\{\{(\d+)\}\}$/);
            if (match) {
              const num = Number(match[1]);
              return (
                <React.Fragment key={sIdx}>{renderBlank(num)}</React.Fragment>
              );
            }
            return <span key={sIdx}>{seg}</span>;
          })}
        </p>
      );
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
          <p className="mt-3 text-sm font-medium text-slate-600">
            Đang tải dữ liệu Unit...
          </p>
        </div>
      </div>
    );
  }

  if (error || !unitData) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-12">
        <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <AlertCircle className="mx-auto h-10 w-10 text-amber-500" />
          <h1 className="mt-4 text-xl font-bold text-slate-900">
            {unitSummary
              ? `Unit ${unitSummary.unitNumber}: ${unitSummary.title}`
              : "Không tìm thấy Unit"}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            {error || "Unit này hiện chưa khả dụng."}
          </p>
          <Link
            to="/essential-vocabulary"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-indigo-500"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay về danh sách 20 Units
          </Link>
        </div>
      </div>
    );
  }

  const currentStageResult = gradedResults[activeStage];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SEO
        title={`Unit ${unitData.unitNumber}: ${unitData.title} | Essential Vocabulary in Context`}
        description={`Học ${unitData.glossary.length} mục từ vựng và 30 bài tập ngữ cảnh 4 giai đoạn chủ đề ${unitData.title} (${unitData.subtitleVi}).`}
      />

      {/* Sticky Top Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              to="/essential-vocabulary"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              20 Units
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-indigo-100 px-2 py-0.5 text-[11px] font-bold text-indigo-700">
                  Book 5 · Unit {unitData.unitNumber}
                </span>
                <h1 className="text-base font-extrabold text-slate-900 sm:text-lg">
                  {unitData.title}
                </h1>
              </div>
              <p className="text-xs text-slate-500">{unitData.subtitleVi}</p>
            </div>
          </div>

          {/* Mode Tabs: Glossary vs Practice */}
          <div className="flex items-center gap-2">
            <div className="inline-flex rounded-xl border border-slate-200 bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => switchTab("glossary")}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  activeTab === "glossary"
                    ? "bg-white text-indigo-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <BookOpen className="h-3.5 w-3.5" />
                Glossary ({unitData.glossary.length})
              </button>
              <button
                type="button"
                onClick={() => switchTab("practice")}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  activeTab === "practice"
                    ? "bg-white text-indigo-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                4-Stage Practice (30 câu)
              </button>
            </div>

            <Link
              to="/essential-vocabulary/review"
              className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-2 text-xs font-bold text-indigo-700 hover:bg-indigo-100"
            >
              <Brain className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Ôn tập</span> (
              {dueBookmarks.length}/{bookmarks.length})
            </Link>

            <Link
              to="/essential-vocabulary/progress"
              className="hidden items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 md:inline-flex"
            >
              <BarChart3 className="h-3.5 w-3.5 text-emerald-600" />
              Tiến độ
            </Link>
          </div>
        </div>
      </header>

      {/* Unit Progress Summary Banner */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="font-semibold text-slate-700">
              Tiến độ Unit {unitData.unitNumber}:
            </span>
            {[
              {
                stage: 1 as const,
                label: "Stage 1: Contextual MCQ",
                best: activeUnitProgress?.bestStage1Score,
                latest: activeUnitProgress?.latestStage1Score,
                max: 10,
              },
              {
                stage: 2 as const,
                label: "Stage 2: Synonyms",
                best: activeUnitProgress?.bestStage2Score,
                latest: activeUnitProgress?.latestStage2Score,
                max: 5,
              },
              {
                stage: 3 as const,
                label: "Stage 3: Boxed Cloze",
                best: activeUnitProgress?.bestStage3Score,
                latest: activeUnitProgress?.latestStage3Score,
                max: 5,
              },
              {
                stage: 4 as const,
                label: "Stage 4: Open Cloze",
                best: activeUnitProgress?.bestStage4Score,
                latest: activeUnitProgress?.latestStage4Score,
                max: 10,
              },
            ].map((s) => (
              <button
                key={s.stage}
                type="button"
                onClick={() => {
                  switchTab("practice");
                  setActiveStage(s.stage);
                }}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs transition ${
                  activeTab === "practice" && activeStage === s.stage
                    ? "border-indigo-500 bg-indigo-50 font-bold text-indigo-800"
                    : s.best !== null && s.best !== undefined
                    ? "border-emerald-200 bg-emerald-50/70 font-medium text-emerald-900"
                    : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <span>{s.label}:</span>
                <strong>
                  {s.best !== null && s.best !== undefined
                    ? `${s.best}/${s.max}`
                    : `—/${s.max}`}
                </strong>
              </button>
            ))}
          </div>

          {activeUnitProgress && (
            <div className="flex items-center gap-3 text-xs">
              <span className="rounded-lg bg-emerald-50 px-2.5 py-1 font-bold text-emerald-800">
                Best: {activeUnitProgress.bestTotalScore}/
                {activeUnitProgress.totalMaxScore} (
                {activeUnitProgress.bestAccuracyPct}%)
              </span>
              <span className="rounded-lg bg-slate-100 px-2.5 py-1 font-medium text-slate-700">
                Latest: {activeUnitProgress.latestTotalScore}/
                {activeUnitProgress.totalMaxScore}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {activeTab === "glossary" ? (
          /* ================= GLOSSARY VIEW ================= */
          <div>
            <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Bảng từ vựng ngữ cảnh ({unitData.glossary.length} mục từ ·{" "}
                  {unitSummary?.headwordCount ?? unitData.glossary.length} headwords)
                </h2>
                <p className="text-xs text-slate-500">
                  Đọc kỹ định nghĩa, từ loại, biến thể chia từ và ví dụ trước khi bước
                  vào 4 bài tập thực hành.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={glossarySearch}
                    onChange={(e) => setGlossarySearch(e.target.value)}
                    placeholder="Tìm từ, nghĩa tiếng Việt..."
                    className="w-52 rounded-xl border border-slate-200 py-1.5 pl-8 pr-3 text-xs focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <select
                  value={posFilter}
                  onChange={(e) => setPosFilter(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 focus:outline-none"
                >
                  <option value="ALL">Tất cả từ loại</option>
                  <option value="noun">noun</option>
                  <option value="plural noun">plural noun</option>
                  <option value="adjective">adjective</option>
                  <option value="verb">verb</option>
                  <option value="phrasal verb">phrasal verb</option>
                  <option value="phrase">phrase</option>
                </select>

                <button
                  type="button"
                  onClick={() => setOnlyBookmarked((v) => !v)}
                  className={`inline-flex items-center gap-1 rounded-xl border px-3 py-1.5 text-xs font-semibold transition ${
                    onlyBookmarked
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Bookmark className="h-3.5 w-3.5" />
                  Đã lưu ({bookmarks.length})
                </button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {filteredGlossary.map((entry) => (
                <div
                  key={entry.entryId}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-200"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-extrabold text-slate-900">
                          {entry.displayHeadword}
                        </h3>
                        {entry.ipa && (
                          <span className="font-mono text-xs text-slate-500">
                            {entry.ipa}
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => speakEnglish(entry.primaryHeadword)}
                          title="Nghe phát âm"
                          className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition hover:bg-indigo-100 hover:text-indigo-700"
                        >
                          <Volume2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {entry.testedInStages.length > 0 && (
                        <div className="mt-1 flex flex-wrap items-center gap-1">
                          {entry.testedInStages.map((st) => (
                            <span
                              key={st}
                              className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600"
                            >
                              Xuất hiện ở Stage {st}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Multi-sense list */}
                  <div className="mt-3 space-y-3">
                    {entry.senses.map((sense) => {
                      const saved = isBookmarked(
                        entry.unitId,
                        entry.entryId,
                        sense.senseNumber
                      );

                      return (
                        <div
                          key={sense.senseNumber}
                          className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex flex-wrap items-center gap-1.5">
                              {entry.senses.length > 1 && (
                                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[11px] font-bold text-white">
                                  {sense.senseNumber}
                                </span>
                              )}
                              <span className="rounded-md bg-indigo-100 px-2 py-0.5 text-xs font-bold italic text-indigo-800">
                                {sense.pos}
                              </span>
                              {sense.usageConstraint && (
                                <span className="text-xs font-medium text-amber-700">
                                  {sense.usageConstraint}
                                </span>
                              )}
                              {sense.inflections && (
                                <span className="text-xs text-slate-500">
                                  {sense.inflections.rawText}
                                </span>
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                toggleEntrySenseBookmark(
                                  entry,
                                  sense.senseNumber,
                                  "glossary"
                                )
                              }
                              className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                                saved
                                  ? "bg-indigo-600 text-white"
                                  : "border border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:text-indigo-700"
                              }`}
                            >
                              {saved ? (
                                <>
                                  <BookmarkCheck className="h-3.5 w-3.5" />
                                  Đã lưu
                                </>
                              ) : (
                                <>
                                  <Bookmark className="h-3.5 w-3.5" />
                                  Lưu SM-2
                                </>
                              )}
                            </button>
                          </div>

                          <p className="mt-2 text-sm font-medium text-slate-800">
                            {sense.definitionEn}
                          </p>
                          <p className="mt-1 text-xs font-semibold text-indigo-700">
                            → {sense.meaningVi}
                          </p>

                          <div className="mt-2 space-y-1 border-t border-slate-200/70 pt-2">
                            {sense.examplesEn.map((ex, idx) => (
                              <p
                                key={idx}
                                className="text-xs italic text-slate-600"
                              >
                                “{ex}”
                              </p>
                            ))}
                          </div>

                          {sense.collocations.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {sense.collocations.map((col, idx) => (
                                <span
                                  key={idx}
                                  className="rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-medium text-slate-700"
                                >
                                  {col}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={() => switchTab("practice")}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500"
              >
                Chuyển sang Làm bài tập 4 Giai đoạn
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          /* ================= 4-STAGE PRACTICE VIEW ================= */
          <div>
            {/* Stage Stepper */}
            <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {[
                {
                  stage: 1 as const,
                  title: "Exercise 1",
                  subtitle: "Contextual MCQ (10 câu)",
                },
                {
                  stage: 2 as const,
                  title: "Exercise 2",
                  subtitle: "Synonym Replacement (5 câu)",
                },
                {
                  stage: 3 as const,
                  title: "Exercise 3",
                  subtitle: "Guided Box Cloze (5 câu)",
                },
                {
                  stage: 4 as const,
                  title: "Exercise 4",
                  subtitle: "Open Cloze Passage (10 câu)",
                },
              ].map((s) => {
                const isCurrent = activeStage === s.stage;
                const graded = gradedResults[s.stage];
                return (
                  <button
                    key={s.stage}
                    type="button"
                    onClick={() => {
                      setActiveStage(s.stage);
                      setBookmarkToast(null);
                    }}
                    className={`flex flex-col items-start rounded-2xl border p-3.5 text-left transition ${
                      isCurrent
                        ? "border-indigo-600 bg-indigo-600 text-white shadow-md"
                        : "border-slate-200 bg-white text-slate-800 hover:border-indigo-300"
                    }`}
                  >
                    <div className="flex w-full items-center justify-between">
                      <span
                        className={`text-xs font-extrabold uppercase tracking-wider ${
                          isCurrent ? "text-indigo-200" : "text-indigo-600"
                        }`}
                      >
                        {s.title}
                      </span>
                      {graded && (
                        <span
                          className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                            isCurrent
                              ? "bg-white/20 text-white"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {graded.score}/{graded.maxScore}
                        </span>
                      )}
                    </div>
                    <div className="mt-1 text-xs font-semibold">
                      {s.subtitle}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Post-Submission Result Banner */}
            {currentStageResult && (
              <div className="mb-6 rounded-2xl border border-indigo-200 bg-indigo-50/80 p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white">
                      <Award className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900">
                        Kết quả Exercise {activeStage}:{" "}
                        <span className="text-indigo-700">
                          {currentStageResult.score}/{currentStageResult.maxScore}
                        </span>{" "}
                        ({currentStageResult.accuracyPct}%)
                      </h3>
                      <p className="text-xs text-slate-600">
                        Điểm cao nhất (Best Score) luôn được bảo toàn ngay cả khi bạn
                        làm lại.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {currentStageResult.wrongEntryIds.length > 0 && (
                      <button
                        type="button"
                        onClick={() => handleBookmarkWrongWords(activeStage)}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-amber-600 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-amber-500"
                      >
                        <Bookmark className="h-3.5 w-3.5" />
                        Lưu {currentStageResult.wrongEntryIds.length} từ làm sai vào
                        SM-2
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => handleResetStage(activeStage)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      Làm lại Stage {activeStage}
                    </button>

                    {activeStage < 4 && (
                      <button
                        type="button"
                        onClick={() =>
                          setActiveStage((s) => (s + 1) as ActiveStage)
                        }
                        className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500"
                      >
                        Sang Stage {activeStage + 1}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {bookmarkToast && (
                  <div className="mt-3 rounded-xl bg-emerald-100 px-3 py-2 text-xs font-semibold text-emerald-800">
                    {bookmarkToast}
                  </div>
                )}
              </div>
            )}

            {/* ================= STAGE 1: CONTEXTUAL MCQ ================= */}
            {activeStage === 1 && (
              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                    Exercise 1 · Contextual Sentence Multiple Choice
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {unitData.exercises.stage1.instructions}
                  </p>
                </div>

                {unitData.exercises.stage1.questions.map((q) => {
                  const selected = stage1Answers[q.questionId];
                  const itemResult = currentStageResult?.items.find(
                    (i) => i.itemId === q.questionId
                  );

                  return (
                    <div
                      key={q.questionId}
                      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                    >
                      <div className="flex items-start gap-3">
                        <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-700">
                          {q.questionNumber}
                        </span>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-slate-900 sm:text-base">
                            {q.promptWithBlank}
                          </p>

                          <div className="mt-3 grid gap-2 sm:grid-cols-2">
                            {q.options.map((opt) => {
                              const isChosen = selected === opt.optionNumber;
                              const isCorrectOpt =
                                opt.optionNumber === q.correctOptionNumber;

                              let btnStyle =
                                "border-slate-200 bg-slate-50 text-slate-800 hover:border-indigo-300";
                              if (itemResult) {
                                if (isCorrectOpt) {
                                  btnStyle =
                                    "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold";
                                } else if (isChosen && !isCorrectOpt) {
                                  btnStyle =
                                    "border-rose-400 bg-rose-50 text-rose-900 line-through";
                                }
                              } else if (isChosen) {
                                btnStyle =
                                  "border-indigo-600 bg-indigo-50 text-indigo-900 font-bold";
                              }

                              return (
                                <button
                                  key={opt.optionNumber}
                                  type="button"
                                  disabled={Boolean(itemResult)}
                                  onClick={() =>
                                    setStage1Answers((prev) => ({
                                      ...prev,
                                      [q.questionId]: opt.optionNumber,
                                    }))
                                  }
                                  className={`flex items-center justify-between rounded-xl border px-3.5 py-2.5 text-left text-xs sm:text-sm transition ${btnStyle}`}
                                >
                                  <span>
                                    <strong className="mr-1.5">
                                      ({opt.optionNumber})
                                    </strong>
                                    {opt.text}
                                  </span>
                                  {itemResult && isCorrectOpt && (
                                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                                  )}
                                  {itemResult && isChosen && !isCorrectOpt && (
                                    <XCircle className="h-4 w-4 text-rose-600" />
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {itemResult && (
                            <div
                              className={`mt-3 rounded-xl p-3 text-xs ${
                                itemResult.isCorrect
                                  ? "bg-emerald-50 text-emerald-900"
                                  : "bg-amber-50 text-amber-900"
                              }`}
                            >
                              <div className="font-bold">
                                Đáp án đúng: {itemResult.canonicalDisplay}
                              </div>
                              <div className="mt-1">
                                {itemResult.feedbackVi || itemResult.feedbackEn}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {!currentStageResult && (
                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      disabled={isSubmittingStage}
                      onClick={() => handleGradeStage(1)}
                      className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500"
                    >
                      Chấm điểm Exercise 1
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ================= STAGE 2: SYNONYM / COLLOCATION MCQ ================= */}
            {activeStage === 2 && (
              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                    Exercise 2 · Synonym Replacement in Context
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {unitData.exercises.stage2.instructions}
                  </p>
                </div>

                {unitData.exercises.stage2.questions.map((q) => {
                  const selected = stage2Answers[q.questionId];
                  const itemResult = currentStageResult?.items.find(
                    (i) => i.itemId === q.questionId
                  );

                  // Highlight underlined target word in sentenceContext
                  const parts = q.sentenceContext
                    ? q.sentenceContext.split(
                        new RegExp(`(${q.targetWordOrPhrase})`, "i")
                      )
                    : [q.targetWordOrPhrase];

                  return (
                    <div
                      key={q.questionId}
                      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                    >
                      <div className="flex items-start gap-3">
                        <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-700">
                          {q.questionNumber}
                        </span>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-slate-900 sm:text-base">
                            {parts.map((part, idx) =>
                              part.toLowerCase() ===
                              q.targetWordOrPhrase.toLowerCase() ? (
                                <span
                                  key={idx}
                                  className="rounded bg-amber-100 px-1.5 py-0.5 font-extrabold text-amber-900 underline decoration-amber-600 decoration-2 underline-offset-4"
                                >
                                  {part}
                                </span>
                              ) : (
                                <span key={idx}>{part}</span>
                              )
                            )}
                          </p>

                          <div className="mt-3 grid gap-2 sm:grid-cols-2">
                            {q.options.map((opt) => {
                              const isChosen = selected === opt.optionNumber;
                              const isCorrectOpt =
                                opt.optionNumber === q.correctOptionNumber;

                              let btnStyle =
                                "border-slate-200 bg-slate-50 text-slate-800 hover:border-indigo-300";
                              if (itemResult) {
                                if (isCorrectOpt) {
                                  btnStyle =
                                    "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold";
                                } else if (isChosen && !isCorrectOpt) {
                                  btnStyle =
                                    "border-rose-400 bg-rose-50 text-rose-900 line-through";
                                }
                              } else if (isChosen) {
                                btnStyle =
                                  "border-indigo-600 bg-indigo-50 text-indigo-900 font-bold";
                              }

                              return (
                                <button
                                  key={opt.optionNumber}
                                  type="button"
                                  disabled={Boolean(itemResult)}
                                  onClick={() =>
                                    setStage2Answers((prev) => ({
                                      ...prev,
                                      [q.questionId]: opt.optionNumber,
                                    }))
                                  }
                                  className={`flex items-center justify-between rounded-xl border px-3.5 py-2.5 text-left text-xs sm:text-sm transition ${btnStyle}`}
                                >
                                  <span>
                                    <strong className="mr-1.5">
                                      ({opt.optionNumber})
                                    </strong>
                                    {opt.text}
                                  </span>
                                  {itemResult && isCorrectOpt && (
                                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                                  )}
                                  {itemResult && isChosen && !isCorrectOpt && (
                                    <XCircle className="h-4 w-4 text-rose-600" />
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {itemResult && (
                            <div
                              className={`mt-3 rounded-xl p-3 text-xs ${
                                itemResult.isCorrect
                                  ? "bg-emerald-50 text-emerald-900"
                                  : "bg-amber-50 text-amber-900"
                              }`}
                            >
                              <div className="font-bold">
                                Từ đồng nghĩa thay thế cho “{q.targetWordOrPhrase}”:{" "}
                                {itemResult.canonicalDisplay}
                              </div>
                              <div className="mt-1">
                                {itemResult.feedbackVi || itemResult.feedbackEn}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {!currentStageResult && (
                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      disabled={isSubmittingStage}
                      onClick={() => handleGradeStage(2)}
                      className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500"
                    >
                      Chấm điểm Exercise 2
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ================= STAGE 3: GUIDED CLOZE (BOX OR INLINE) ================= */}
            {activeStage === 3 && (
              <div className="space-y-5">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-amber-600">
                    Exercise 3 ·{" "}
                    {unitData.exercises.stage3.variant === "box_word_bank"
                      ? "Guided Passage Cloze (Box A–J)"
                      : "Guided Passage Cloze (Inline 4-Option)"}
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {unitData.exercises.stage3.instructions}
                  </p>

                  {/* Word Bank A-J (only when variant is box_word_bank) */}
                  {unitData.exercises.stage3.variant === "box_word_bank" && (
                    <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 sm:grid-cols-5">
                      {unitData.exercises.stage3.wordBank.map((wb) => {
                        const isUsed = usedStage3Letters.has(wb.letter);
                        return (
                          <div
                            key={wb.letter}
                            className={`flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-xs ${
                              isUsed
                                ? "border-indigo-200 bg-indigo-50/60 text-indigo-400 line-through"
                                : "border-white bg-white font-semibold text-slate-800 shadow-sm"
                            }`}
                          >
                            <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-slate-900 text-[11px] font-bold text-white">
                              {wb.letter}
                            </span>
                            <span>{wb.word}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Passage with Inline Selectors */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  {unitData.exercises.stage3.passageTitle && (
                    <h3 className="mb-3 text-base font-extrabold text-slate-900">
                      {unitData.exercises.stage3.passageTitle}
                    </h3>
                  )}

                  {renderPassageWithBlanks(
                    unitData.exercises.stage3.passageTemplate,
                    (blankNum) => {
                      const blankObj = unitData.exercises.stage3.blanks.find(
                        (b) => b.blankNumber === blankNum
                      );
                      if (!blankObj) return null;

                      const selectedVal =
                        stage3Answers[blankObj.blankId] ?? "";
                      const itemResult = currentStageResult?.items.find(
                        (i) => i.itemId === blankObj.blankId
                      );

                      return (
                        <span className="mx-1 inline-flex items-center gap-1 align-baseline">
                          <span className="rounded bg-indigo-100 px-1.5 py-0.5 text-xs font-bold text-indigo-800">
                            ({blankNum})
                          </span>
                          <select
                            disabled={Boolean(itemResult)}
                            value={selectedVal}
                            onChange={(e) =>
                              setStage3Answers((prev) => ({
                                ...prev,
                                [blankObj.blankId]: e.target.value,
                              }))
                            }
                            className={`rounded-lg border px-2 py-1 text-xs font-bold focus:outline-none sm:text-sm ${
                              itemResult
                                ? itemResult.isCorrect
                                  ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                                  : "border-rose-400 bg-rose-50 text-rose-900"
                                : selectedVal
                                ? "border-indigo-500 bg-indigo-50 text-indigo-900"
                                : "border-slate-300 bg-slate-50 text-slate-700"
                            }`}
                          >
                            <option value="">
                              {unitData.exercises.stage3.variant ===
                              "box_word_bank"
                                ? "— Chọn A–J —"
                                : "— Chọn (1)–(4) —"}
                            </option>
                            {unitData.exercises.stage3.variant ===
                              "box_word_bank" &&
                              unitData.exercises.stage3.wordBank.map((wb) => (
                                <option key={wb.letter} value={wb.letter}>
                                  ({wb.letter}) {wb.word}
                                </option>
                              ))}
                            {unitData.exercises.stage3.variant ===
                              "inline_four_option" &&
                              "options" in blankObj &&
                              blankObj.options.map((opt) => (
                                <option
                                  key={opt.optionNumber}
                                  value={String(opt.optionNumber)}
                                >
                                  ({opt.optionNumber}) {opt.text}
                                </option>
                              ))}
                          </select>
                        </span>
                      );
                    }
                  )}

                  {currentStageResult && (
                    <div className="mt-6 space-y-2 border-t border-slate-200 pt-4">
                      <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                        Giải thích chi tiết từng chỗ trống
                      </h4>
                      {currentStageResult.items.map((item) => (
                        <div
                          key={item.itemId}
                          className={`rounded-xl p-3 text-xs ${
                            item.isCorrect
                              ? "bg-emerald-50 text-emerald-900"
                              : "bg-amber-50 text-amber-900"
                          }`}
                        >
                          <strong>
                            Chỗ trống ({item.itemNumber}) — Đáp án đúng:{" "}
                            {item.canonicalDisplay}
                          </strong>
                          <p className="mt-0.5">
                            {item.feedbackVi || item.feedbackEn}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {!currentStageResult && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      disabled={isSubmittingStage}
                      onClick={() => handleGradeStage(3)}
                      className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500"
                    >
                      Chấm điểm Exercise 3
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ================= STAGE 4: OPEN CLOZE PASSAGE ================= */}
            {activeStage === 4 && (
              <div className="space-y-5">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-rose-600">
                        Exercise 4 · Open Cloze Passage ({unitData.exercises.stage4.blanks.length} blanks)
                      </p>
                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {unitData.exercises.stage4.instructions}
                      </p>
                    </div>

                    {/* Assisted vs Hard Mode Toggle */}
                    <div className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-100 p-1">
                      <button
                        type="button"
                        onClick={() => setStage4Mode("assisted")}
                        className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                          stage4Mode === "assisted"
                            ? "bg-white text-indigo-700 shadow-sm"
                            : "text-slate-600"
                        }`}
                      >
                        <Eye className="h-3.5 w-3.5" />
                        Assisted Mode (Có gợi ý từ gốc)
                      </button>
                      <button
                        type="button"
                        onClick={() => setStage4Mode("hard")}
                        className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                          stage4Mode === "hard"
                            ? "bg-slate-900 text-white shadow-sm"
                            : "text-slate-600"
                        }`}
                      >
                        <EyeOff className="h-3.5 w-3.5" />
                        Hard Mode (Tự nhớ 100%)
                      </button>
                    </div>
                  </div>

                  {stage4Mode === "assisted" && (
                    <div className="mt-4 rounded-xl border border-indigo-100 bg-indigo-50/60 p-3">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-800">
                        <Sparkles className="h-3.5 w-3.5" />
                        Danh sách từ gốc trong Unit {unitData.unitNumber} (Lưu ý: Bạn cần tự chia danh từ số
                        nhiều / động từ cho đúng ngữ pháp của chỗ trống!):
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {allHeadwordsList.map((hw) => (
                          <span
                            key={hw}
                            className="rounded-md border border-indigo-200/80 bg-white px-2 py-0.5 text-[11px] font-medium text-slate-700"
                          >
                            {hw}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Open Cloze Passage */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  {unitData.exercises.stage4.passageTitle && (
                    <h3 className="mb-3 text-base font-extrabold text-slate-900">
                      {unitData.exercises.stage4.passageTitle}
                    </h3>
                  )}

                  {renderPassageWithBlanks(
                    unitData.exercises.stage4.passageTemplate,
                    (blankNum) => {
                      const blankObj = unitData.exercises.stage4.blanks.find(
                        (b) => b.blankNumber === blankNum
                      );
                      if (!blankObj) return null;

                      const val = stage4Answers[blankObj.blankId] ?? "";
                      const itemResult = currentStageResult?.items.find(
                        (i) => i.itemId === blankObj.blankId
                      );

                      return (
                        <span className="mx-1 inline-flex items-center gap-1 align-baseline">
                          <span className="rounded bg-rose-100 px-1.5 py-0.5 text-xs font-bold text-rose-800">
                            ({blankNum})
                          </span>
                          <input
                            type="text"
                            disabled={Boolean(itemResult)}
                            value={val}
                            onChange={(e) =>
                              setStage4Answers((prev) => ({
                                ...prev,
                                [blankObj.blankId]: e.target.value,
                              }))
                            }
                            placeholder={
                              stage4Mode === "assisted"
                                ? blankObj.grammaticalHint
                                : "..."
                            }
                            className={`w-36 rounded-lg border px-2.5 py-1 text-xs font-bold focus:outline-none sm:w-44 sm:text-sm ${
                              itemResult
                                ? itemResult.isCorrect
                                  ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                                  : itemResult.matchTier ===
                                    "INCORRECT_NEAR_MISS"
                                  ? "border-amber-500 bg-amber-50 text-amber-900"
                                  : "border-rose-400 bg-rose-50 text-rose-900"
                                : "border-slate-300 bg-slate-50 text-slate-900 focus:border-indigo-500 focus:bg-white"
                            }`}
                          />
                        </span>
                      );
                    }
                  )}

                  {currentStageResult && (
                    <div className="mt-6 space-y-2.5 border-t border-slate-200 pt-4">
                      <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                        Phân tích 4 tầng đáp án (Canonical · Variant · Contextual
                        Alt · Near-Miss)
                      </h4>
                      {currentStageResult.items.map((item) => (
                        <div
                          key={item.itemId}
                          className={`rounded-xl p-3.5 text-xs ${
                            item.isCorrect
                              ? "bg-emerald-50 text-emerald-900"
                              : item.matchTier === "INCORRECT_NEAR_MISS"
                              ? "border border-amber-300 bg-amber-50 text-amber-950"
                              : "bg-rose-50 text-rose-900"
                          }`}
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <strong>
                              Chỗ trống ({item.itemNumber}) · Bạn điền:{" "}
                              <span className="underline">
                                {String(item.submittedValue || "(trống)")}
                              </span>
                            </strong>
                            <span className="rounded bg-white/80 px-2 py-0.5 text-[11px] font-bold">
                              Đáp án chuẩn: {item.canonicalDisplay}
                            </span>
                          </div>
                          <p className="mt-1">
                            {item.feedbackVi || item.feedbackEn}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {!currentStageResult && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      disabled={isSubmittingStage}
                      onClick={() => handleGradeStage(4)}
                      className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500"
                    >
                      Chấm điểm Exercise 4 (Open Cloze)
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Quick Unit Switcher Footer (Units 1-5) */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-xs font-bold text-slate-600">
            Chuyển nhanh giữa các Unit đã mở (Book 5):
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "evc5-u01", num: 1, title: "Looking good" },
              { id: "evc5-u02", num: 2, title: "Personality & behaviour" },
              { id: "evc5-u03", num: 3, title: "Bad feelings" },
              { id: "evc5-u04", num: 4, title: "Good feelings" },
              { id: "evc5-u05", num: 5, title: "Communication" },
              { id: "evc5-u06", num: 6, title: "Getting on with people" },
              { id: "evc5-u07", num: 7, title: "Illness and disease" },
              { id: "evc5-u08", num: 8, title: "Keeping fit & healthy" },
              { id: "evc5-u09", num: 9, title: "At the dentist's" },
              { id: "evc5-u10", num: 10, title: "Accidents & emergencies" },
              { id: "evc5-u11", num: 11, title: "Working" },
              { id: "evc5-u12", num: 12, title: "Cooking" },
              { id: "evc5-u13", num: 13, title: "Eating and drinking" },
              { id: "evc5-u14", num: 14, title: "Eating out" },
              { id: "evc5-u15", num: 15, title: "Household equipment" },
              { id: "evc5-u16", num: 16, title: "Household jobs" },
              { id: "evc5-u17", num: 17, title: "Tools" },
              { id: "evc5-u18", num: 18, title: "Gardens & gardening" },
              { id: "evc5-u19", num: 19, title: "Games & sports" },
              { id: "evc5-u20", num: 20, title: "Religions & festivals" },
            ].map((u) => {
              const active = u.id === unitData.unitId;
              return (
                <Link
                  key={u.id}
                  to={`/essential-vocabulary/unit/${u.id}/${activeTab}`}
                  className={`rounded-xl border px-3 py-1.5 text-xs font-bold transition ${
                    active
                      ? "border-indigo-600 bg-indigo-600 text-white"
                      : "border-slate-200 bg-slate-50 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50"
                  }`}
                >
                  U{u.num}: {u.title}
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default EssentialVocabUnitPage;
