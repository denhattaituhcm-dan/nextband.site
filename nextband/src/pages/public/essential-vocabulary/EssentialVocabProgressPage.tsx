import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/common/SEO";
import {
  ArrowLeft,
  Award,
  BarChart3,
  BookOpen,
  Brain,
  CheckCircle2,
  Clock,
  History,
  Layers,
} from "lucide-react";
import { getEvcBookMeta } from "@/data/essentialVocab/registry";
import { useEssentialVocabProgress } from "@/hooks/useEssentialVocabProgress";
import { useEssentialVocabBookmarks } from "@/hooks/useEssentialVocabBookmarks";

export const EssentialVocabProgressPage: React.FC = () => {
  const book = useMemo(() => getEvcBookMeta("evc-5"), []);
  const { unitsProgress, recentAttempts, summary, isLoading } =
    useEssentialVocabProgress("evc-5");
  const { bookmarks, dueBookmarks } = useEssentialVocabBookmarks();

  const unitMetaMap = useMemo(() => {
    const map: Record<string, (typeof book.units)[number]> = {};
    for (const u of book.units) {
      map[u.unitId] = u;
    }
    return map;
  }, [book.units]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SEO
        title="Thống kê Tiến độ Học tập | Essential Vocabulary in Context"
        description="Bảng phân tích điểm cao nhất (Best Score), điểm gần nhất (Latest Score) và lịch sử làm bài 4 giai đoạn."
      />

      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              to="/essential-vocabulary"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Hub
            </Link>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-emerald-600" />
              <h1 className="text-base font-extrabold text-slate-900 sm:text-lg">
                Tiến độ & Lịch sử Luyện tập
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/essential-vocabulary/unit/evc5-u01"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
            >
              <BookOpen className="h-3.5 w-3.5" />
              Unit 1
            </Link>
            <Link
              to="/essential-vocabulary/review"
              className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700 hover:bg-indigo-100"
            >
              <Brain className="h-3.5 w-3.5" />
              Ôn tập SM-2 ({dueBookmarks.length}/{bookmarks.length})
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* KPI Overview */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>Units hoàn thành đủ 4 Stage</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="mt-2 text-2xl font-extrabold text-slate-900">
              {summary.completedUnitsCount} / {book.totalUnits}
            </div>
            <div className="mt-1 text-xs text-slate-500">
              Đã bắt đầu: {summary.startedUnitsCount} Unit
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>Tổng điểm Best Score</span>
              <Award className="h-4 w-4 text-amber-500" />
            </div>
            <div className="mt-2 text-2xl font-extrabold text-slate-900">
              {summary.totalBestScore}{" "}
              <span className="text-sm font-normal text-slate-400">
                / {summary.totalMaxPossible || 30}
              </span>
            </div>
            <div className="mt-1 text-xs text-emerald-700 font-semibold">
              Độ chính xác tốt nhất: {summary.overallBestAccuracyPct}%
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>Tổng lượt nộp bài (Attempts)</span>
              <History className="h-4 w-4 text-indigo-600" />
            </div>
            <div className="mt-2 text-2xl font-extrabold text-slate-900">
              {recentAttempts.length}
            </div>
            <div className="mt-1 text-xs text-slate-500">
              Lưu đầy đủ lịch sử từng Stage
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>Sổ từ SM-2</span>
              <Brain className="h-4 w-4 text-rose-500" />
            </div>
            <div className="mt-2 text-2xl font-extrabold text-slate-900">
              {bookmarks.length} từ
            </div>
            <div className="mt-1 text-xs text-slate-500">
              Đến hạn ôn tập: {dueBookmarks.length} từ
            </div>
          </div>
        </div>

        {/* Unit Best vs Latest Comparison Table */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                Bảng đối chiếu Best Score vs. Latest Score theo Unit
              </h2>
              <p className="text-xs text-slate-500">
                Điểm cao nhất (Best) được giữ nguyên khi bạn làm lại bất kỳ Stage nào.
              </p>
            </div>
          </div>

          {isLoading ? (
            <p className="py-8 text-center text-sm text-slate-500">
              Đang tải dữ liệu tiến độ...
            </p>
          ) : unitsProgress.length === 0 ? (
            <div className="py-10 text-center">
              <Layers className="mx-auto h-8 w-8 text-slate-400" />
              <p className="mt-2 text-sm font-semibold text-slate-700">
                Bạn chưa hoàn thành bài tập nào.
              </p>
              <Link
                to="/essential-vocabulary/unit/evc5-u01/practice"
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500"
              >
                Làm bài tập Unit 1 ngay
              </Link>
            </div>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                    <th className="px-3 py-2.5 font-bold">Unit</th>
                    <th className="px-3 py-2.5 font-bold">Stage 1 (Best / Latest)</th>
                    <th className="px-3 py-2.5 font-bold">Stage 2 (Best / Latest)</th>
                    <th className="px-3 py-2.5 font-bold">Stage 3 (Best / Latest)</th>
                    <th className="px-3 py-2.5 font-bold">Stage 4 (Best / Latest)</th>
                    <th className="px-3 py-2.5 font-bold">Tổng Best</th>
                    <th className="px-3 py-2.5 font-bold">Tổng Latest</th>
                    <th className="px-3 py-2.5 font-bold">Số lần làm</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {unitsProgress.map((p) => {
                    const meta = unitMetaMap[p.unitId];
                    return (
                      <tr key={p.id} className="hover:bg-slate-50">
                        <td className="px-3 py-3 font-bold text-slate-900">
                          <Link
                            to={`/essential-vocabulary/unit/${p.unitId}/practice`}
                            className="text-indigo-600 hover:underline"
                          >
                            {meta
                              ? `Unit ${meta.unitNumber}: ${meta.title}`
                              : p.unitId}
                          </Link>
                        </td>
                        <td className="px-3 py-3">
                          <strong>{p.bestStage1Score ?? "—"}</strong> /{" "}
                          {p.latestStage1Score ?? "—"} ({p.stage1MaxScore})
                        </td>
                        <td className="px-3 py-3">
                          <strong>{p.bestStage2Score ?? "—"}</strong> /{" "}
                          {p.latestStage2Score ?? "—"} ({p.stage2MaxScore})
                        </td>
                        <td className="px-3 py-3">
                          <strong>{p.bestStage3Score ?? "—"}</strong> /{" "}
                          {p.latestStage3Score ?? "—"} ({p.stage3MaxScore})
                        </td>
                        <td className="px-3 py-3">
                          <strong>{p.bestStage4Score ?? "—"}</strong> /{" "}
                          {p.latestStage4Score ?? "—"} ({p.stage4MaxScore})
                        </td>
                        <td className="px-3 py-3 font-extrabold text-emerald-700">
                          {p.bestTotalScore}/{p.totalMaxScore} ({p.bestAccuracyPct}%)
                        </td>
                        <td className="px-3 py-3 font-semibold text-slate-700">
                          {p.latestTotalScore}/{p.totalMaxScore} (
                          {p.latestAccuracyPct}%)
                        </td>
                        <td className="px-3 py-3 text-slate-600">
                          {p.attemptsCount} lượt
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Attempt History Timeline */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-extrabold text-slate-900">
            Lịch sử các lượt nộp bài gần đây ({recentAttempts.length})
          </h2>
          {recentAttempts.length === 0 ? (
            <p className="mt-3 text-xs text-slate-500">
              Chưa có lượt nộp bài nào được ghi nhận.
            </p>
          ) : (
            <div className="mt-4 space-y-2.5">
              {recentAttempts.map((att) => {
                const meta = unitMetaMap[att.unitId];
                return (
                  <div
                    key={att.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="rounded-lg bg-indigo-100 px-2.5 py-1 font-bold text-indigo-800">
                        Stage {att.stage}
                      </span>
                      <div>
                        <div className="font-bold text-slate-900">
                          {meta
                            ? `Unit ${meta.unitNumber}: ${meta.title}`
                            : att.unitId}{" "}
                          {att.stage === 4 && (
                            <span className="ml-1 rounded bg-slate-200 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-slate-700">
                              {att.mode}
                            </span>
                          )}
                        </div>
                        <div className="mt-0.5 flex items-center gap-2 text-[11px] text-slate-500">
                          <Clock className="h-3 w-3" />
                          {new Date(att.submittedAt).toLocaleString("vi-VN")}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="rounded-lg bg-white px-3 py-1 font-extrabold text-slate-900 shadow-sm">
                        {att.score}/{att.maxScore} ({att.accuracyPct}%)
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default EssentialVocabProgressPage;
