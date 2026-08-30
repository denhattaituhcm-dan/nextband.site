import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Trophy, Sparkles, ChevronDown, ChevronUp, Compass, ArrowRight, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { routes } from "@/lib/routes";
import { AscentLessonNode } from "@/components/student/AcademicAscentWorld";
import { useSpatialCapability } from "@/lib/spatial/useSpatialCapability";
import { SpatialAtmosphereCanvas } from "./SpatialAtmosphereCanvas";
import { SpatialCurriculumNode } from "./SpatialCurriculumNode";
import { SPATIAL_TOKENS } from "@/lib/spatial/spatial-tokens";

export interface SpatialCurriculumPathProps {
  courseTitle: string;
  className: string;
  currentBand: number;
  targetBand: number;
  lessons: AscentLessonNode[];
  onSelectLesson?: (lesson: AscentLessonNode) => void;
  enrolledClassId?: string;
}

export const SpatialCurriculumPath: React.FC<SpatialCurriculumPathProps> = ({
  courseTitle,
  className,
  currentBand,
  targetBand,
  lessons = [],
  onSelectLesson,
}) => {
  const navigate = useNavigate();
  const capability = useSpatialCapability();
  const [isFullViewExpanded, setIsFullViewExpanded] = useState(false);

  // 1. Identify current active index
  const currentIndex = useMemo(() => {
    if (!lessons || lessons.length === 0) return 0;
    const pendingIdx = lessons.findIndex(
      (l) =>
        l.status === "REVISION_REQUIRED" ||
        l.status === "OVERDUE" ||
        l.status === "IN_PROGRESS" ||
        l.status === "UPCOMING"
    );
    return pendingIdx >= 0 ? pendingIdx : Math.max(0, lessons.length - 1);
  }, [lessons]);

  const currentNode = lessons[currentIndex] || lessons[0];

  // 2. Compute Chapter statistics
  const chapters = useMemo(() => {
    const ch1 = lessons.filter((l) => l.chapterIndex === 1);
    const ch2 = lessons.filter((l) => l.chapterIndex === 2);
    const ch3 = lessons.filter((l) => l.chapterIndex === 3);

    const calcCompleted = (arr: AscentLessonNode[]) =>
      arr.filter((l) => l.status === "GRADED" || l.status === "SUBMITTED").length;

    return [
      {
        index: 1,
        title: "FOUNDATION",
        subtitle: "Nền tảng & Cấu trúc câu",
        lessons: ch1,
        total: ch1.length || 9,
        completed: calcCompleted(ch1),
      },
      {
        index: 2,
        title: "CORE SKILLS",
        subtitle: "Chiến thuật Đọc & Viết",
        lessons: ch2,
        total: ch2.length || 9,
        completed: calcCompleted(ch2),
      },
      {
        index: 3,
        title: "PERFORMANCE",
        subtitle: "Tối ưu hóa & Thi thử",
        lessons: ch3,
        total: ch3.length || 9,
        completed: calcCompleted(ch3),
      },
    ];
  }, [lessons]);

  // 3. Focus Zone: Windowing around current index (2 past, 1 current, 3 future)
  const visibleLessons = useMemo(() => {
    if (isFullViewExpanded || lessons.length <= 7) return lessons;
    const start = Math.max(0, currentIndex - 2);
    const end = Math.min(lessons.length, currentIndex + 4);
    return lessons.slice(start, end);
  }, [lessons, currentIndex, isFullViewExpanded]);

  const completedCount = lessons.filter(
    (l) => l.status === "GRADED" || l.status === "SUBMITTED"
  ).length;
  const totalCount = lessons.length || 27;
  const progressPercentage = Math.round((completedCount / totalCount) * 100);

  const handleLessonAction = (node: AscentLessonNode) => {
    if (onSelectLesson) {
      onSelectLesson(node);
      return;
    }

    if (node.status === "GRADED" && node.submission?.id) {
      navigate(routes.student.submission(node.submission.id));
    } else {
      navigate(`/exam/${node.examId}?returnUrl=/app`);
    }
  };

  return (
    <nav
      aria-label="Lộ trình học thuật ARIS"
      className="space-y-6 select-none"
    >
      {/* ─── LEVEL 01: DESTINATION & IDENTITY HEADER ────────────────────── */}
      <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-7 md:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        {/* Soft Ambient Depth Glow */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-400">
                {className} · {courseTitle}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Hành Trình Chinh Phục Band {targetBand.toFixed(1)}
            </h1>

            <div className="flex items-center gap-3 text-xs text-slate-300 font-mono pt-1">
              <span>
                Khởi đầu: <strong className="text-white">Band {currentBand.toFixed(1)}</strong>
              </span>
              <span className="text-slate-600">→</span>
              <span className="text-amber-400 font-bold">
                Mục tiêu: Band {targetBand.toFixed(1)}
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">
                Đã hoàn thành <strong className="text-white">{completedCount}/{totalCount}</strong> bài ({progressPercentage}%)
              </span>
            </div>
          </div>

          {/* Chapter Progress Indicators */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {chapters.map((ch) => {
              const isChComplete = ch.completed >= ch.total;
              const isChActive = !isChComplete && completedCount >= (ch.index - 1) * 9;

              return (
                <div
                  key={ch.index}
                  className={`px-3.5 py-2.5 rounded-2xl border transition-all text-xs shrink-0 ${
                    isChComplete
                      ? "bg-slate-800/80 border-slate-700 text-slate-300"
                      : isChActive
                      ? "bg-indigo-950/70 border-indigo-500/60 text-white shadow-sm ring-1 ring-indigo-400/20"
                      : "bg-slate-900/50 border-slate-800/80 text-slate-500 opacity-60"
                  }`}
                >
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    Chapter 0{ch.index}
                  </div>
                  <div className="font-extrabold text-xs mt-0.5">{ch.title}</div>
                  <div className="text-[10.5px] font-mono text-slate-400 mt-0.5">
                    {ch.completed}/{ch.total} bài
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── LEVEL 02: THE SPATIAL ASCENT ENVIRONMENT ─────────────────────── */}
      <div className="rounded-3xl border border-slate-200/90 bg-gradient-to-b from-[#FAF9F6] via-white to-slate-50 p-6 sm:p-8 md:p-10 shadow-sm relative overflow-hidden">
        {/* Procedural Topographic Background */}
        <SpatialAtmosphereCanvas capability={capability} />

        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-slate-200/70 pb-4 mb-8 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-slate-700" />
              <span className="text-xs font-black uppercase tracking-wider text-slate-700 font-mono">
                ARIS SPATIAL CURRICULUM
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Vật thể hóa toàn bộ lộ trình chinh phục học thuật của bạn
            </p>
          </div>

          {/* Toggle Full Map / Focus Zone */}
          {lessons.length > 7 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsFullViewExpanded(!isFullViewExpanded)}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl h-8 px-3 gap-1.5 cursor-pointer"
            >
              <span>{isFullViewExpanded ? "Thu gọn Focus Zone" : "Xem toàn bộ 27 bài"}</span>
              {isFullViewExpanded ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </Button>
          )}
        </div>

        {/* ─── SPATIAL PATH VIEWPORT ────────────────────────────────────────── */}
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          {/* 1. SUMMIT DESTINATION LANDMARK */}
          <div className="flex flex-col items-center justify-center text-center pb-8 pt-2">
            <div className="relative group">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 text-slate-950 flex items-center justify-center text-2xl shadow-xl shadow-amber-400/20 border-2 border-white ring-4 ring-amber-300/30 transition-transform group-hover:scale-105 duration-300">
                <Trophy className="w-8 h-8 fill-current" />
              </div>
            </div>

            <div className="mt-3 space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100 text-amber-900 font-mono text-[10.5px] font-black uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span>SUMMIT ĐÍCH ĐẾN · BAND {targetBand.toFixed(1)}</span>
              </div>
              <h3 className="text-sm sm:text-base font-black text-slate-900">
                Đỉnh Cao Học Thuật ARIS &amp; Học Bổng Kỷ Luật 500k
              </h3>
            </div>

            {/* Connecting Vertical Energy Spine */}
            <div className="w-0.5 h-10 bg-gradient-to-b from-amber-300 to-slate-300 my-2" />
          </div>

          {/* 2. DOMINANT HERO ACTION PLATFORM ("YOU ARE HERE") */}
          {currentNode && (
            <div className="relative z-20 my-6 transition-all duration-300">
              {/* Focus Anchor Badge */}
              <div className="flex items-center gap-2 mb-2 pl-3 sm:pl-4">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping" />
                <span className="text-[11px] font-black uppercase tracking-widest text-rose-600 font-mono bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200 shadow-2xs">
                  ★ YOU ARE HERE · VỊ TRÍ HIỆN TẠI
                </span>
              </div>

              {/* Spatial Elevated Platform */}
              <div
                className="rounded-3xl bg-white border-2 border-slate-900 p-6 sm:p-7 md:p-8 space-y-5 relative overflow-hidden"
                style={{
                  boxShadow: SPATIAL_TOKENS.elevation.hero.shadow,
                }}
              >
                {/* Top Crimson Energy Accent */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-rose-600" />

                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-2 max-w-xl">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-white font-mono font-black text-xs">
                        BUỔI {String(currentNode.order).padStart(2, "0")} / 27
                      </span>
                      <span className="text-xs font-bold text-slate-500 font-mono">
                        Chapter 0{currentNode.chapterIndex} · {currentNode.chapterTitle}
                      </span>
                      {currentNode.status === "REVISION_REQUIRED" && (
                        <Badge className="bg-amber-100 text-amber-900 border-amber-300 text-[10px] font-bold">
                          ⚠️ Cần Sửa Bài (Attempt 2)
                        </Badge>
                      )}
                      {currentNode.status === "OVERDUE" && (
                        <Badge className="bg-rose-100 text-rose-800 border-rose-300 text-[10px] font-bold">
                          Quá hạn nộp
                        </Badge>
                      )}
                    </div>

                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                      {currentNode.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {currentNode.description ||
                        "Tập trung bóc tách bản chất kiến thức, rèn luyện cấu trúc ngữ pháp và phản xạ bài thi."}
                    </p>
                  </div>

                  {/* Estimated Time Indicator */}
                  <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-3 text-right shrink-0">
                    <div className="text-[10px] font-mono font-bold uppercase text-slate-400">
                      Thời lượng
                    </div>
                    <div className="text-sm font-black text-slate-900 font-mono mt-0.5">
                      ~{currentNode.estimatedMinutes || 35} PHÚT
                    </div>
                  </div>
                </div>

                {/* Primary Action CTA */}
                <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs text-slate-500 font-medium">
                    {currentNode.deadlineText ? (
                      <span>
                        Hạn nộp: <strong className="text-slate-800">{currentNode.deadlineText}</strong>
                      </span>
                    ) : (
                      <span>Hoàn thành bài tập để duy trì chuỗi tiến độ</span>
                    )}
                  </div>

                  <Button
                    size="lg"
                    onClick={() => handleLessonAction(currentNode)}
                    className="w-full sm:w-auto h-12 px-8 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm shadow-lg shadow-rose-600/20 gap-2.5 transition-all active:scale-98 cursor-pointer"
                  >
                    <span>
                      {currentNode.status === "REVISION_REQUIRED"
                        ? "Tiến hành sửa bài ngay"
                        : "Bắt đầu bài học ngay"}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* 3. CONTINUOUS SPATIAL NODES LIST */}
          <div className="space-y-3.5 relative">
            {/* Visual connecting spinal cord */}
            <div className="absolute left-6 sm:left-8 top-4 bottom-4 w-0.5 bg-slate-200/80 -z-0" />

            <ol className="space-y-3.5 list-none p-0 m-0">
              {visibleLessons.map((node, idx) => (
                <li key={node.id}>
                  <SpatialCurriculumNode
                    node={node}
                    isCurrent={node.id === currentNode?.id}
                    capability={capability}
                    onSelect={handleLessonAction}
                    index={idx}
                    totalNodes={visibleLessons.length}
                  />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </nav>
  );
};
