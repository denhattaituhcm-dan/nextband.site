import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/common/SEO";
import {
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  Bookmark,
  Brain,
  CheckCircle2,
  Compass,
  Filter,
  Layers,
  Lock,
  Search,
  Sparkles,
} from "lucide-react";
import { getEvcBookMeta } from "@/data/essentialVocab/registry";
import { useEssentialVocabProgress } from "@/hooks/useEssentialVocabProgress";
import { useEssentialVocabBookmarks } from "@/hooks/useEssentialVocabBookmarks";

export const EssentialVocabHubPage: React.FC = () => {
  const book = useMemo(() => getEvcBookMeta("evc-5"), []);
  const { unitsProgress, summary } = useEssentialVocabProgress("evc-5");
  const { bookmarks, dueBookmarks } = useEssentialVocabBookmarks();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTheme, setSelectedTheme] = useState<string>("ALL");

  const themes = useMemo(() => {
    const unique = Array.from(new Set(book.units.map((u) => u.themeCategory)));
    return ["ALL", ...unique];
  }, [book.units]);

  const progressByUnitId = useMemo(() => {
    const map: Record<string, (typeof unitsProgress)[number]> = {};
    for (const p of unitsProgress) {
      map[p.unitId] = p;
    }
    return map;
  }, [unitsProgress]);

  const filteredUnits = useMemo(() => {
    return book.units.filter((u) => {
      const matchesTheme =
        selectedTheme === "ALL" || u.themeCategory === selectedTheme;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        u.title.toLowerCase().includes(q) ||
        u.subtitleVi.toLowerCase().includes(q) ||
        u.themeCategory.toLowerCase().includes(q) ||
        String(u.unitNumber) === q;
      return matchesTheme && matchesQuery;
    });
  }, [book.units, selectedTheme, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SEO
        title="Essential Vocabulary in Context 5 | NextBand IELTS"
        description="Hệ thống học từ vựng theo ngữ cảnh 4 giai đoạn (Contextual MCQ, Synonym Replacement, Guided Cloze, Open Cloze) kết hợp Spaced Repetition SM-2."
      />

      {/* Top Navigation */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-sm font-semibold text-slate-500 transition hover:text-slate-900"
            >
              NextBand
            </Link>
            <span className="text-slate-300">/</span>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-xs font-bold text-white">
                EVC
              </span>
              <span className="font-bold text-slate-900">
                Essential Vocabulary in Context
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/vocab-in-use"
              className="hidden items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-100 sm:inline-flex"
            >
              <Compass className="h-3.5 w-3.5 text-indigo-600" />
              Vocab in Use
            </Link>
            <Link
              to="/essential-vocabulary/review"
              className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-100"
            >
              <Brain className="h-3.5 w-3.5" />
              Ôn tập SM-2
              {dueBookmarks.length > 0 && (
                <span className="rounded-full bg-indigo-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
                  {dueBookmarks.length}
                </span>
              )}
            </Link>
            <Link
              to="/essential-vocabulary/progress"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              <BarChart3 className="h-3.5 w-3.5 text-emerald-600" />
              Tiến độ
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b border-slate-200 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300">
                <Sparkles className="h-3.5 w-3.5" />
                {book.cefrBand} · Target IELTS {book.ieltsTargetBand}
              </div>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                {book.title}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                Làm chủ từ vựng theo chủ đề qua lộ trình 4 bước từ nhận diện ngữ cảnh đến
                tự điền đoạn văn (Open Cloze), tích hợp Sổ từ đa nghĩa và thuật toán lặp
                lại ngắt quãng SM-2.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  to="/essential-vocabulary/unit/evc5-u01/practice"
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition hover:bg-indigo-400"
                >
                  <Layers className="h-4 w-4" />
                  Làm bài tập Unit 1: Looking good (30 câu)
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/essential-vocabulary/unit/evc5-u01/glossary"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/15"
                >
                  <BookOpen className="h-4 w-4" />
                  Tra cứu từ vựng
                </Link>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:col-span-5 lg:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Units hoàn thành</span>
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="mt-2 text-2xl font-extrabold">
                  {summary.completedUnitsCount}{" "}
                  <span className="text-sm font-normal text-slate-400">
                    / {book.totalUnits}
                  </span>
                </div>
                <div className="mt-1 text-[11px] text-slate-400">
                  Đã bắt đầu: {summary.startedUnitsCount} Unit
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Độ chính xác tốt nhất</span>
                  <Award className="h-4 w-4 text-amber-400" />
                </div>
                <div className="mt-2 text-2xl font-extrabold">
                  {summary.overallBestAccuracyPct}%
                </div>
                <div className="mt-1 text-[11px] text-slate-400">
                  Điểm cao nhất: {summary.totalBestScore}/{summary.totalMaxPossible || 30}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Từ đã lưu (Sổ từ)</span>
                  <Bookmark className="h-4 w-4 text-indigo-400" />
                </div>
                <div className="mt-2 text-2xl font-extrabold">
                  {bookmarks.length}
                </div>
                <div className="mt-1 text-[11px] text-slate-400">
                  Lưu từ Glossary & câu làm sai
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Đến hạn ôn tập SM-2</span>
                  <Brain className="h-4 w-4 text-rose-400" />
                </div>
                <div className="mt-2 text-2xl font-extrabold">
                  {dueBookmarks.length}
                </div>
                <div className="mt-1 text-[11px] text-slate-400">
                  <Link
                    to="/essential-vocabulary/review"
                    className="underline hover:text-white"
                  >
                    Mở hàng đợi ôn tập →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* 4-Stage Pipeline Strip */}
          <div className="mt-8 grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-4">
            <div className="rounded-xl bg-white/5 px-3.5 py-2.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-300">
                Stage 1 · 10 câu
              </div>
              <div className="mt-0.5 text-xs font-semibold text-white">
                Contextual Sentence MCQ
              </div>
              <div className="text-[11px] text-slate-400">
                Chọn từ đúng theo ngữ cảnh câu đơn
              </div>
            </div>
            <div className="rounded-xl bg-white/5 px-3.5 py-2.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                Stage 2 · 5 câu
              </div>
              <div className="mt-0.5 text-xs font-semibold text-white">
                Synonym & Collocation
              </div>
              <div className="text-[11px] text-slate-400">
                Thay thế từ đồng nghĩa & kết hợp từ
              </div>
            </div>
            <div className="rounded-xl bg-white/5 px-3.5 py-2.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                Stage 3 · 5 chỗ trống
              </div>
              <div className="mt-0.5 text-xs font-semibold text-white">
                Guided Passage Cloze (A–J)
              </div>
              <div className="text-[11px] text-slate-400">
                Điền từ vào đoạn văn có từ gây nhiễu
              </div>
            </div>
            <div className="rounded-xl bg-white/5 px-3.5 py-2.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-rose-300">
                Stage 4 · 10 chỗ trống
              </div>
              <div className="mt-0.5 text-xs font-semibold text-white">
                Open Cloze (Assisted / Hard)
              </div>
              <div className="text-[11px] text-slate-400">
                Tự điền & chia từ loại trong đoạn văn
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Units Grid */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Danh sách 20 Units ({filteredUnits.length})
            </h2>
            <p className="text-xs text-slate-500">
              Mỗi Unit gồm Bảng từ vựng ngữ cảnh (Glossary) và 30 câu hỏi thực hành 4
              cấp độ.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm Unit hoặc chủ đề..."
                className="w-56 rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5">
              <Filter className="h-3.5 w-3.5 text-slate-400" />
              <select
                value={selectedTheme}
                onChange={(e) => setSelectedTheme(e.target.value)}
                className="bg-transparent text-xs font-medium text-slate-700 focus:outline-none"
              >
                {themes.map((t) => (
                  <option key={t} value={t}>
                    {t === "ALL" ? "Tất cả chủ đề" : t}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredUnits.map((unit) => {
            const prog = progressByUnitId[unit.unitId];
            const mask = prog?.completedStagesMask ?? 0;
            const isFullyCompleted = (mask & 15) === 15;

            return (
              <div
                key={unit.unitId}
                className={`group flex flex-col justify-between rounded-2xl border p-5 transition ${
                  unit.isAvailable
                    ? "border-slate-200 bg-white shadow-sm hover:border-indigo-300 hover:shadow-md"
                    : "border-slate-200/70 bg-slate-100/70 opacity-75"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700">
                      Unit {unit.unitNumber}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500">
                      {unit.themeCategory}
                    </span>
                  </div>

                  <h3 className="mt-3 text-lg font-bold text-slate-900 group-hover:text-indigo-600">
                    {unit.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {unit.subtitleVi}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] text-slate-600">
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 font-medium">
                      {unit.glossaryEntryCount} mục từ ({unit.headwordCount} từ)
                    </span>
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 font-medium">
                      {unit.totalQuestions} câu hỏi
                    </span>
                  </div>

                  {/* Stage Completion Badges */}
                  <div className="mt-4 grid grid-cols-4 gap-1.5">
                    {[
                      { stage: 1, label: "S1", best: prog?.bestStage1Score, max: unit.stageMaxScores.stage1 },
                      { stage: 2, label: "S2", best: prog?.bestStage2Score, max: unit.stageMaxScores.stage2 },
                      { stage: 3, label: "S3", best: prog?.bestStage3Score, max: unit.stageMaxScores.stage3 },
                      { stage: 4, label: "S4", best: prog?.bestStage4Score, max: unit.stageMaxScores.stage4 },
                    ].map((s) => {
                      const done = (mask & (1 << (s.stage - 1))) !== 0;
                      return (
                        <div
                          key={s.stage}
                          className={`rounded-lg border px-2 py-1 text-center text-[11px] ${
                            done
                              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                              : "border-slate-200 bg-slate-50 text-slate-500"
                          }`}
                        >
                          <div className="font-bold">{s.label}</div>
                          <div className="text-[10px]">
                            {s.best !== null && s.best !== undefined
                              ? `${s.best}/${s.max}`
                              : `—/${s.max}`}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {prog && (
                    <div className="mt-3 flex items-center justify-between rounded-lg bg-slate-50 px-3 py-1.5 text-[11px] text-slate-600">
                      <span>
                        Best:{" "}
                        <strong className="text-slate-900">
                          {prog.bestTotalScore}/{prog.totalMaxScore}
                        </strong>{" "}
                        ({prog.bestAccuracyPct}%)
                      </span>
                      <span>
                        Latest:{" "}
                        <strong className="text-slate-700">
                          {prog.latestTotalScore}/{prog.totalMaxScore}
                        </strong>
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-5 border-t border-slate-100 pt-4">
                  {unit.isAvailable ? (
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/essential-vocabulary/unit/${unit.unitId}/practice`}
                        className="flex-1 rounded-xl bg-indigo-600 px-3 py-2 text-center text-xs font-bold text-white transition hover:bg-indigo-500 shadow-xs"
                      >
                        {isFullyCompleted ? "Luyện lại (30 câu)" : "Làm bài tập (30 câu)"}
                      </Link>
                      <Link
                        to={`/essential-vocabulary/unit/${unit.unitId}/glossary`}
                        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-center text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        Từ vựng
                      </Link>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-1.5 rounded-xl bg-slate-200/70 px-3 py-2 text-xs font-medium text-slate-500">
                      <Lock className="h-3.5 w-3.5" />
                      Đang số hóa (Phase 3–4)
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default EssentialVocabHubPage;
