import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, CheckCircle2, Compass } from "lucide-react";
import { getRecommendedNextCases } from "@/data/readingCases/caseRegistry";
import { ReadingProgressMap } from "../hooks/useReadingProgress";

interface NextReadsSectionProps {
  currentCaseId: string;
  progressMap: ReadingProgressMap;
  compact?: boolean;
}

export const NextReadsSection: React.FC<NextReadsSectionProps> = ({
  currentCaseId,
  progressMap,
  compact = false,
}) => {
  const recommended = useMemo(() => {
    const readIds = new Set(
      Object.values(progressMap)
        .filter((p) => p.isRead)
        .map((p) => p.caseId)
    );
    return getRecommendedNextCases(currentCaseId, readIds, 3);
  }, [currentCaseId, progressMap]);

  if (recommended.length === 0) return null;

  return (
    <section
      className={`rounded-2xl border border-stone-200/90 bg-white shadow-xs ${
        compact ? "p-4 sm:p-5" : "p-5 sm:p-7"
      } space-y-4 font-sans`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center shrink-0">
            <Compass className="h-4 w-4 text-amber-700" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-stone-900">
              Đọc tiếp gợi ý cho bạn
            </h3>
            <p className="text-[11px] text-stone-500">
              Ưu tiên bài bạn chưa đọc, cùng mạch chủ đề hoặc trình độ tiếp nối
            </p>
          </div>
        </div>
        <Link
          to="/reading#tu-sach"
          className="inline-flex items-center gap-1 text-xs font-semibold text-stone-600 hover:text-stone-950 transition-colors self-start sm:self-auto"
        >
          <BookOpen className="h-3.5 w-3.5" />
          <span>Xem cả tủ sách</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {recommended.map((item) => {
          const itemProgress = progressMap[item.id];
          const isRead = Boolean(itemProgress?.isRead);
          return (
            <Link
              key={item.id}
              to={`/reading/${item.id}`}
              className="group rounded-xl border border-stone-200/90 bg-[#FAF8F5]/70 hover:bg-white hover:border-stone-300 hover:shadow-md transition-all p-4 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-1.5 flex-wrap">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-stone-900 text-white">
                    {item.cefrLabel} · Band {item.ieltsBand.toFixed(1)}
                  </span>
                  {isRead ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      <CheckCircle2 className="h-3 w-3" />
                      Đã đọc
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-stone-500 truncate max-w-[120px]">
                      {item.publication}
                    </span>
                  )}
                </div>

                <h4 className="font-serif text-sm font-bold text-stone-900 group-hover:text-amber-800 transition-colors leading-snug line-clamp-2">
                  {item.titleVi}
                </h4>

                <p className="text-[11px] text-stone-500 italic line-clamp-2 leading-relaxed">
                  {item.titleEn}
                </p>
              </div>

              <div className="pt-2 border-t border-stone-200/70 flex items-center justify-between text-[11px]">
                <span className="text-stone-500">{item.displayReadTime}</span>
                <span className="font-bold text-amber-800 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  {isRead ? "Đọc lại" : "Đọc tiếp"}
                  <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
