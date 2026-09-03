import React, { useState, useMemo } from 'react';
import { vrsMockLessons } from '@/data/vrsLessonsData';
import { VRSVisualLesson } from '@/types/vrs';
import VRSSlotSnapInteractive from '@/components/vrs/VRSSlotSnapInteractive';
import VRSVerificationScaleInteractive from '@/components/vrs/VRSVerificationScaleInteractive';
import VRSProgressiveRevealInteractive from '@/components/vrs/VRSProgressiveRevealInteractive';
import VRSBlockReadingMapInteractive from '@/components/vrs/VRSBlockReadingMapInteractive';
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  Layers,
  Scale,
  Cpu,
  BookOpen,
  ArrowLeft,
  Check
} from 'lucide-react';

interface WeekMeta {
  week: number;
  title: string;
  theme: string;
  progressPercent: number;
  status: 'completed' | 'active' | 'available';
  homeworkPendingCount: number;
}

const WEEKS_META: WeekMeta[] = [
  { week: 1, title: 'Nền Tảng Cấu Trúc Câu', theme: 'Động Cơ Mệnh Đề Cốt Lõi & Cơ Chế Phát Âm', progressPercent: 100, status: 'completed', homeworkPendingCount: 0 },
  { week: 2, title: 'Tổ Chức Không Gian & Logic', theme: 'Cổng Kết Nối Động Từ & Bàn Cân Xác Minh Logic', progressPercent: 67, status: 'active', homeworkPendingCount: 1 },
  { week: 3, title: 'Trục Thời Gian & Dữ Liệu Lịch Trình', theme: 'Neo Mốc Thì Quá Khứ - Hiện Tại & Bóc Tách Bằng Chứng', progressPercent: 33, status: 'available', homeworkPendingCount: 2 },
  { week: 4, title: 'Bổ Ngữ & Định Vị Chính Xác', theme: 'Quy Tắc Ghép Tính Từ - Trạng Từ & Bẫy Khái Niệm Y Tế', progressPercent: 0, status: 'available', homeworkPendingCount: 3 },
  { week: 5, title: 'Điểm Neo Giới Từ & Nhân Quả', theme: 'Cụm Giới Từ Cố Định & Chiếu Sáng Câu Chủ Đề Đoạn Văn', progressPercent: 0, status: 'available', homeworkPendingCount: 3 },
  { week: 6, title: 'Mệnh Đề Quan Hệ & Bản Thể', theme: 'Cầu Nối Who/Which Quy Tắc Số 1 & Truy Vết Lịch Sử', progressPercent: 0, status: 'available', homeworkPendingCount: 3 },
  { week: 7, title: 'Dấu Phẩy & Mệnh Đề Quan Hệ', theme: 'Quy Tắc Non-defining Cấm Kỵ Dùng That & Tranh Luận Môi Trường', progressPercent: 0, status: 'available', homeworkPendingCount: 3 },
  { week: 8, title: 'Trọng Tâm Bị Động & Truy Vết Hồ Sơ', theme: 'Đảo Trục Trọng Tâm Be + V3 & Bóc Tách Bẫy Pháp Lý', progressPercent: 0, status: 'available', homeworkPendingCount: 3 },
  { week: 9, title: 'Keo Dán Liên Từ & Câu Phức', theme: 'Bẫy Nhân Quả Song Trùng Because... So & Đối Chiếu Bản Thể', progressPercent: 0, status: 'available', homeworkPendingCount: 3 }
];

export default function VisualReconstructionPage() {
  const [selectedWeek, setSelectedWeek] = useState<number>(2);
  const [activeLesson, setActiveLesson] = useState<VRSVisualLesson | null>(null);
  // Track lessons marked completed; default W2D2 reading is completed in mock
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(['dreamer_w2d2']);

  const currentWeekMeta = useMemo(() => {
    return WEEKS_META.find((w) => w.week === selectedWeek) || WEEKS_META[0];
  }, [selectedWeek]);

  const weekLessons = useMemo(() => {
    return vrsMockLessons.filter((lesson) => lesson.week === selectedWeek);
  }, [selectedWeek]);

  const writingLesson = weekLessons.find((l) => l.skill === 'writing');
  const readingLesson = weekLessons.find((l) => l.skill === 'reading');
  const speakingLesson = weekLessons.find((l) => l.skill === 'speaking');

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900">
      {/* Top Breadcrumb & Target Banner */}
      <header className="border-b border-slate-200 bg-white px-6 py-3.5 sticky top-0 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold tracking-wide uppercase bg-indigo-50 text-indigo-700 border border-indigo-200">
              <Cpu className="w-3.5 h-3.5" />
              ARIS VRS · COGNITIVE RECONSTRUCTION
            </span>
            <span className="text-slate-300">/</span>
            <span className="text-sm font-semibold text-slate-700">DREAMER (MỤC TIÊU 4.0)</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              9 Tuần Trọng Tâm
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              27 Module Nhận Thức
            </span>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {!activeLesson ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* TẦNG 1: WHERE AM I? (Academic Curriculum Timeline Rail - 3 Cols on LG) */}
            <aside className="lg:col-span-3 bg-white/80 backdrop-blur-xs border border-slate-200/80 rounded-2xl p-5 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.04)]">
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-900">
                  Lộ Trình Tái Dựng
                </h3>
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                  9 Tuần
                </span>
              </div>

              {/* Connected Timeline List */}
              <nav className="relative space-y-1" aria-label="Weeks Progression">
                {/* Visual Continuous Stem Line */}
                <div className="absolute left-[23px] top-4 bottom-4 w-px bg-slate-200/90 pointer-events-none -z-0" />

                {WEEKS_META.map((wm) => {
                  const isSelected = wm.week === selectedWeek;
                  const isCompleted = wm.progressPercent === 100;
                  const isActive = wm.status === 'active';

                    return (
                    <button
                      key={wm.week}
                      onClick={() => setSelectedWeek(wm.week)}
                      className={`w-full text-left p-3 rounded-xl transition-all duration-200 relative z-10 flex items-start gap-3.5 group ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-[0_8px_20px_-6px_rgba(79,70,229,0.35)] translate-x-1'
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      {/* Status Point on Timeline */}
                      <div className="mt-0.5 shrink-0">
                        {isCompleted ? (
                          <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        ) : isActive ? (
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center border-2 ${isSelected ? 'border-white bg-indigo-700' : 'border-indigo-600 bg-white'}`}>
                            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                          </div>
                        ) : (
                          <div className={`w-5 h-5 rounded-full border bg-white flex items-center justify-center text-[10px] font-mono font-bold ${
                            isSelected ? 'border-indigo-400 text-indigo-100' : 'border-slate-300 text-slate-400 group-hover:border-slate-400'
                          }`}>
                            {wm.week}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                            isSelected ? 'text-indigo-200' : 'text-slate-400'
                          }`}>
                            TUẦN 0{wm.week}
                          </span>
                          <span className={`text-[10px] font-mono font-semibold ${
                            isSelected ? 'text-indigo-100' : 'text-slate-500'
                          }`}>
                            {wm.progressPercent}%
                          </span>
                        </div>
                        <p className={`text-xs font-semibold truncate mt-0.5 ${
                          isSelected ? 'text-white font-bold' : 'text-slate-800'
                        }`}>
                          {wm.title}
                        </p>
                        {wm.homeworkPendingCount > 0 && (
                          <p className={`text-[10px] font-medium mt-1 flex items-center gap-1 ${
                            isSelected ? 'text-amber-200' : 'text-amber-600'
                          }`}>
                            <Clock className="w-2.5 h-2.5" />
                            {wm.homeworkPendingCount} bài tập chờ
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </nav>
            </aside>

            {/* MAIN CONTENT AREA: TẦNG 2, 3, 4 (9 Cols on LG) */}
            <main className="lg:col-span-9 space-y-8">
              {/* TẦNG 2: WHAT AM I LEARNING? (Academic Spatial Hero Monograph - Clean Light Theme) */}
              <section className="bg-gradient-to-br from-white via-indigo-50/30 to-blue-50/50 text-slate-900 rounded-3xl p-8 sm:p-9 shadow-[0_10px_30px_-10px_rgba(79,70,229,0.08)] relative overflow-hidden border border-indigo-100/90">
                {/* Subtle Spatial Watermark Number */}
                <div className="absolute -right-4 -bottom-8 select-none pointer-events-none font-mono font-black text-9xl text-indigo-950/[0.04] tracking-tighter">
                  0{currentWeekMeta.week}
                </div>

                <div className="relative z-10 max-w-2xl">
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mb-2">
                    {currentWeekMeta.title}
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    Trọng tâm khảo cứu: <span className="text-indigo-900 font-semibold">{currentWeekMeta.theme}</span>. Bóc tách cơ chế ngữ pháp cốt lõi, loại trừ bẫy nhận định bằng chứng và tự động hoá tư duy phản xạ giao tiếp.
                  </p>
                </div>
              </section>

              {/* TẦNG 3 & 4: 3 TACTILE COGNITIVE MODULES (WRITING - READING - SPEAKING) */}
              <div>
                <div className="flex items-center justify-between mb-4 px-1">
                  <h3 className="text-base font-bold text-slate-900">
                    3 Khối Bài Học Trong Tuần
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">
                    Nhấp chọn cơ chế để thực hành sâu
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* 1. WRITING MODULE: SENTENCE BUILDER ENGINE */}
                  {writingLesson && (() => {
                    const isWritingDone = completedLessonIds.includes(writingLesson.id);
                    return (
                      <div className={`bg-white rounded-3xl p-6 flex flex-col justify-between transition-all duration-500 group relative overflow-hidden ${
                        isWritingDone
                          ? 'card-glow-mastery-emerald border-2 border-emerald-500/80 -translate-y-1'
                          : 'shadow-[0_4px_24px_-4px_rgba(15,23,42,0.06)] border border-slate-200/80 hover:shadow-[0_12px_32px_-8px_rgba(15,23,42,0.12)] hover:-translate-y-1'
                      }`}>
                        {/* Background Aura Light if completed */}
                        {isWritingDone && (
                          <div className="absolute -top-16 -right-16 w-36 h-36 rounded-full bg-emerald-400/20 blur-2xl pointer-events-none" />
                        )}

                        <div>
                          {/* Header Folio */}
                          <div className="flex items-center justify-between mb-3.5">
                            <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100 flex items-center gap-1.5">
                              <Cpu className="w-3.5 h-3.5" />
                              VIẾT · BUỔI 1
                            </span>
                            {isWritingDone ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-xs animate-pulse">
                                <Sparkles className="w-3 h-3 text-emerald-600" /> ĐÃ HOÀN THÀNH
                              </span>
                            ) : (
                              <span className="text-xs font-mono font-semibold text-slate-400">01/03</span>
                            )}
                          </div>

                          <h4 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                            {writingLesson.title}
                          </h4>
                          <p className="text-xs text-slate-500 mt-1 mb-5 line-clamp-2">
                            {writingLesson.subtitle}
                          </p>

                          {/* Visual Mechanism Miniature (Tactile Preview) */}
                          <div className={`py-4 px-3.5 rounded-2xl border mb-6 transition-colors ${
                            isWritingDone ? 'bg-emerald-50/40 border-emerald-200/70' : 'bg-slate-50/80 border-slate-200/80'
                          }`}>
                            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1">
                              <Layers className="w-3 h-3 text-indigo-600" />
                              Mô Hình Cú Pháp Câu
                            </div>
                            {/* Tactile Connectors */}
                            <div className="flex items-center justify-center gap-1.5 font-mono text-xs font-bold py-2.5 bg-white rounded-xl border border-slate-200 shadow-xs text-slate-700">
                              <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs">[ S ]</span>
                              <span className="text-slate-300 font-bold">+</span>
                              <span className="px-2 py-0.5 rounded-md bg-orange-50 text-orange-700 border border-orange-200 shadow-xs">[ FV ]</span>
                              <span className="text-slate-300 font-bold">+</span>
                              <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 shadow-xs">[ O ]</span>
                            </div>
                            <p className="text-[11px] text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                              {writingLesson.coreCompetency}
                            </p>
                          </div>
                        </div>

                        {/* Learning Loop & Tactile CTA */}
                        <div className="pt-4 border-t border-slate-100 space-y-3.5">
                          <div className="flex items-center justify-between text-[10px] font-mono">
                            <span className="text-slate-400 font-bold">CYCLE:</span>
                            <div className="flex items-center gap-1 font-semibold">
                              <span className="text-emerald-600 flex items-center gap-0.5">
                                <Check className="w-3 h-3" /> LEARN
                              </span>
                              <span className="text-slate-300">→</span>
                              <span className="text-indigo-600 flex items-center gap-0.5">
                                <Sparkles className="w-3 h-3" /> REBUILD
                              </span>
                              <span className="text-slate-300">→</span>
                              <span className={isWritingDone ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'}>
                                {isWritingDone ? 'DONE' : 'HW'}
                              </span>
                            </div>
                          </div>

                          {/* Tactile Button */}
                          <button
                            onClick={() => setActiveLesson(writingLesson)}
                            className={`w-full py-3 px-4 rounded-xl text-xs font-bold text-white transition-all flex items-center justify-center gap-2 cursor-pointer active:translate-y-0.5 ${
                              isWritingDone
                                ? 'bg-emerald-600 hover:bg-emerald-700 shadow-[0_4px_14px_rgba(5,150,105,0.35)]'
                                : 'bg-indigo-600 hover:bg-indigo-700 shadow-[0_4px_14px_rgba(79,70,229,0.3)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.4)]'
                            }`}
                          >
                            {isWritingDone ? 'Ôn Luyện Lại Cơ Chế' : 'Khám Phá Cơ Chế'}
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>

                          {/* Homework Link Pill */}
                          <div className="bg-slate-50/80 px-3 py-2 rounded-xl border border-slate-200/80 flex items-center justify-between text-[11px]">
                            <span className="text-slate-600 font-mono font-medium truncate">
                              HW W{selectedWeek}D1
                            </span>
                            {isWritingDone ? (
                              <span className="text-emerald-700 font-semibold flex items-center gap-1 shrink-0 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60 text-[10px]">
                                <CheckCircle2 className="w-3 h-3" /> Đã hoàn thành
                              </span>
                            ) : (
                              <span className="text-amber-700 font-semibold flex items-center gap-1 shrink-0 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60 text-[10px]">
                                <Clock className="w-3 h-3" /> Cần làm
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* 2. READING MODULE: EVIDENCE SCALE LAB (Đã hoàn thành - Phát sáng Hoàng Kim/Mastery) */}
                  {readingLesson && (() => {
                    const isReadingDone = completedLessonIds.includes(readingLesson.id);
                    return (
                      <div className={`bg-white rounded-3xl p-6 flex flex-col justify-between transition-all duration-500 group relative overflow-hidden ${
                        isReadingDone
                          ? 'card-glow-mastery-gold border-2 border-amber-400/90 -translate-y-1'
                          : 'shadow-[0_4px_24px_-4px_rgba(15,23,42,0.06)] border border-slate-200/80 hover:shadow-[0_12px_32px_-8px_rgba(15,23,42,0.12)] hover:-translate-y-1'
                      }`}>
                        {/* Background Aura Light if completed */}
                        {isReadingDone && (
                          <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-amber-300/25 blur-2xl pointer-events-none" />
                        )}

                        <div>
                          {/* Header Folio */}
                          <div className="flex items-center justify-between mb-3.5">
                            <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 flex items-center gap-1.5">
                              <Scale className="w-3.5 h-3.5" />
                              ĐỌC · BUỔI 2
                            </span>
                            {isReadingDone ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 shadow-xs">
                                <Sparkles className="w-3 h-3 text-amber-600" /> ĐÃ HOÀN THÀNH
                              </span>
                            ) : (
                              <span className="text-xs font-mono font-semibold text-slate-400">02/03</span>
                            )}
                          </div>

                          <h4 className="text-lg font-bold text-slate-900 group-hover:text-amber-700 transition-colors leading-snug">
                            {readingLesson.title}
                          </h4>
                          <p className="text-xs text-slate-500 mt-1 mb-5 line-clamp-2">
                            {readingLesson.subtitle}
                          </p>

                          {/* Visual Mechanism Miniature (Evidence Scale) */}
                          <div className={`py-4 px-3.5 rounded-2xl border mb-6 transition-colors ${
                            isReadingDone ? 'bg-amber-50/40 border-amber-200/70' : 'bg-slate-50/80 border-slate-200/80'
                          }`}>
                            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1">
                              <Scale className="w-3 h-3 text-amber-600" />
                              Bàn Cân Đối Chiếu Bằng Chứng
                            </div>
                            {/* Scale Balance Tactile */}
                            <div className="flex items-center justify-between font-mono text-xs font-bold py-2.5 px-3 bg-white rounded-xl border border-slate-200 shadow-xs text-slate-700">
                              <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 shadow-xs">NHẬN ĐỊNH</span>
                              <span className="text-amber-600 font-bold text-base">⚖</span>
                              <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs">BẰNG CHỨNG</span>
                            </div>
                            <p className="text-[11px] text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                              {readingLesson.coreCompetency}
                            </p>
                          </div>
                        </div>

                        {/* Learning Loop & Tactile CTA */}
                        <div className="pt-4 border-t border-slate-100 space-y-3.5">
                          <div className="flex items-center justify-between text-[10px] font-mono">
                            <span className="text-slate-400 font-bold">CHU TRÌNH:</span>
                            <div className="flex items-center gap-1 font-semibold">
                              <span className="text-emerald-600 flex items-center gap-0.5">
                                <Check className="w-3 h-3" /> HỌC
                              </span>
                              <span className="text-slate-300">→</span>
                              <span className="text-amber-600 flex items-center gap-0.5">
                                <Sparkles className="w-3 h-3" /> TÁI DỰNG
                              </span>
                              <span className="text-slate-300">→</span>
                              <span className="text-emerald-600 font-bold">XONG</span>
                            </div>
                          </div>

                          {/* Tactile Button */}
                          <button
                            onClick={() => setActiveLesson(readingLesson)}
                            className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-[0_4px_18px_rgba(217,119,6,0.35)] hover:shadow-[0_6px_22px_rgba(217,119,6,0.45)] active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
                          >
                            Ôn Luyện Lại Cơ Chế
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>

                          {/* Homework Link Pill */}
                          <div className="bg-amber-50/70 px-3 py-2 rounded-xl border border-amber-200/80 flex items-center justify-between text-[11px]">
                            <span className="text-slate-700 font-mono font-medium truncate">
                              HW W{selectedWeek}D2
                            </span>
                            <span className="text-emerald-700 font-semibold flex items-center gap-1 shrink-0 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60 text-[10px]">
                              <CheckCircle2 className="w-3 h-3" /> Đã hoàn thành
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* 3. SPEAKING MODULE: RESPONSE BUILDER CASCADE */}
                  {speakingLesson && (() => {
                    const isSpeakingDone = completedLessonIds.includes(speakingLesson.id);
                    return (
                      <div className={`bg-white rounded-3xl p-6 flex flex-col justify-between transition-all duration-500 group relative overflow-hidden ${
                        isSpeakingDone
                          ? 'card-glow-mastery-emerald border-2 border-emerald-500/80 -translate-y-1'
                          : 'shadow-[0_4px_24px_-4px_rgba(15,23,42,0.06)] border border-slate-200/80 hover:shadow-[0_12px_32px_-8px_rgba(15,23,42,0.12)] hover:-translate-y-1'
                      }`}>
                        {/* Background Aura Light if completed */}
                        {isSpeakingDone && (
                          <div className="absolute -top-16 -right-16 w-36 h-36 rounded-full bg-emerald-400/20 blur-2xl pointer-events-none" />
                        )}

                        <div>
                          {/* Header Folio */}
                          <div className="flex items-center justify-between mb-3.5">
                            <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 flex items-center gap-1.5">
                              <Layers className="w-3.5 h-3.5" />
                              NÓI · BUỔI 3
                            </span>
                            {isSpeakingDone ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-xs">
                                <Sparkles className="w-3 h-3 text-emerald-600" /> ĐÃ HOÀN THÀNH
                              </span>
                            ) : (
                              <span className="text-xs font-mono font-semibold text-slate-400">03/03</span>
                            )}
                          </div>

                          <h4 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                            {speakingLesson.title}
                          </h4>
                          <p className="text-xs text-slate-500 mt-1 mb-5 line-clamp-2">
                            {speakingLesson.subtitle}
                          </p>

                          {/* Visual Mechanism Miniature (Cascade Stack) */}
                          <div className={`py-4 px-3.5 rounded-2xl border mb-6 transition-colors ${
                            isSpeakingDone ? 'bg-emerald-50/40 border-emerald-200/70' : 'bg-slate-50/80 border-slate-200/80'
                          }`}>
                            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1">
                              <Layers className="w-3 h-3 text-emerald-600" />
                              Bậc Thang 4 Bước Phản Xạ Nói
                            </div>
                            {/* Cascade Steps */}
                            <div className="space-y-1 font-mono text-[10px] font-bold py-1.5 px-2 bg-white rounded-xl border border-slate-200 shadow-xs text-slate-600">
                              <div className="flex items-center justify-between bg-emerald-50/80 px-2 py-1 rounded-md text-emerald-800">
                                <span>1. STANCE</span>
                                <span className="text-[9px] font-normal text-emerald-600">Trực diện</span>
                              </div>
                              <div className="flex items-center justify-between bg-slate-50 px-2 py-1 rounded-md text-slate-700">
                                <span>2. WHY?</span>
                                <span className="text-[9px] font-normal text-slate-400">Lý giải</span>
                              </div>
                              <div className="flex items-center justify-between bg-slate-50 px-2 py-1 rounded-md text-slate-700">
                                <span>3. DEVELOP</span>
                                <span className="text-[9px] font-normal text-indigo-500">Phát triển +</span>
                              </div>
                            </div>
                            <p className="text-[11px] text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                              {speakingLesson.coreCompetency}
                            </p>
                          </div>
                        </div>

                        {/* Learning Loop & Tactile CTA */}
                        <div className="pt-4 border-t border-slate-100 space-y-3.5">
                          <div className="flex items-center justify-between text-[10px] font-mono">
                            <span className="text-slate-400 font-bold">CYCLE:</span>
                            <div className="flex items-center gap-1 font-semibold">
                              <span className="text-emerald-600 flex items-center gap-0.5">
                                <Check className="w-3 h-3" /> LEARN
                              </span>
                              <span className="text-slate-300">→</span>
                              <span className="text-emerald-600 flex items-center gap-0.5">
                                <Sparkles className="w-3 h-3" /> REBUILD
                              </span>
                              <span className="text-slate-300">→</span>
                              <span className={isSpeakingDone ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
                                {isSpeakingDone ? 'DONE' : 'CHƯA LÀM'}
                              </span>
                            </div>
                          </div>

                          {/* Tactile Button */}
                          <button
                            onClick={() => setActiveLesson(speakingLesson)}
                            className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-[0_4px_14px_rgba(5,150,105,0.3)] hover:shadow-[0_6px_20px_rgba(5,150,105,0.4)] active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
                          >
                            {isSpeakingDone ? 'Ôn Luyện Lại Cơ Chế' : 'Khám Phá Cơ Chế'}
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>

                          {/* Homework Link Pill */}
                          <div className="bg-slate-50/80 px-3 py-2 rounded-xl border border-slate-200/80 flex items-center justify-between text-[11px]">
                            <span className="text-slate-600 font-mono font-medium truncate">
                              HW W{selectedWeek}D3
                            </span>
                            {isSpeakingDone ? (
                              <span className="text-emerald-700 font-semibold flex items-center gap-1 shrink-0 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60 text-[10px]">
                                <CheckCircle2 className="w-3 h-3" /> Đã hoàn thành
                              </span>
                            ) : (
                              <span className="text-slate-500 font-medium flex items-center gap-1 shrink-0 bg-slate-100 px-2 py-0.5 rounded-md text-[10px]">
                                Chưa bắt đầu
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </main>
          </div>
        ) : (
          /* ========================================================================= */
          /* LABWORK FOCUS CANVAS: ARIS DIGITAL COURSEBOOK (Academic Spatial UI)      */
          /* ========================================================================= */
          <div className="max-w-4xl mx-auto py-4 px-2 sm:px-6">
            {/* Editorial Coursebook Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-12 border-b border-slate-200/80 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-md">
                    COURSEBOOK · {activeLesson.skill} · DAY {activeLesson.day}
                  </span>
                  <span className="text-slate-400">·</span>
                  <span className="text-xs font-mono font-medium text-slate-500">
                    WEEK 0{activeLesson.week}
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {activeLesson.title}
                </h2>
                <p className="text-base text-slate-600 mt-1 font-normal leading-relaxed">
                  {activeLesson.subtitle}
                </p>
              </div>

              <button
                onClick={() => setActiveLesson(null)}
                className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-all shadow-xs hover:shadow-sm self-start sm:self-auto shrink-0 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Về Bản Đồ Tuần
              </button>
            </div>

            {/* Stages / Cognitive Engines: Phân cấp Editorial (Bỏ bớt container lồng hộp) */}
            <div className="space-y-16">
              {activeLesson.stages.map((stage) => {
                const isTransfer = stage.interactionModel.type === 'transfer_test';

                return (
                  <section key={stage.stageNumber} className="relative">
                    {/* Editorial Landmark Number */}
                    <div className="flex items-baseline gap-4 mb-4">
                      <span className="text-3xl sm:text-4xl font-mono font-extrabold text-slate-300 select-none">
                        0{stage.stageNumber}
                      </span>
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-widest text-indigo-600 font-bold">
                          {isTransfer ? 'TRANSFER CHALLENGE' : 'COGNITIVE STAGE'}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
                          {stage.title}
                        </h3>
                        <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                          {stage.pedagogicalObjective}
                        </p>
                      </div>
                    </div>

                    {/* Interactive Component Mount (Không đóng hộp thô kệch) */}
                    <div className="mt-6 pt-2">
                      {stage.interactionModel.type === 'slot_snap' && (
                        <VRSSlotSnapInteractive model={stage.interactionModel as any} />
                      )}
                      {stage.interactionModel.type === 'verification_scale' && (
                        <VRSVerificationScaleInteractive model={stage.interactionModel as any} />
                      )}
                      {stage.interactionModel.type === 'progressive_reveal' && (
                        <VRSProgressiveRevealInteractive model={stage.interactionModel as any} />
                      )}
                      {stage.interactionModel.type === 'block_reading_map' && (
                        <VRSBlockReadingMapInteractive model={stage.interactionModel as any} />
                      )}
                      {stage.interactionModel.type === 'transfer_test' && (
                        <div className="py-8 px-6 rounded-2xl bg-indigo-50/50 border border-indigo-100/80 text-center">
                          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-indigo-700 bg-white px-3 py-1 rounded-full shadow-xs border border-indigo-100 inline-block mb-3">
                            🎯 THỬ THÁCH CHUYỂN GIAO NĂNG LỰC
                          </span>
                          <p className="text-sm text-indigo-950 font-medium max-w-lg mx-auto leading-relaxed">
                            {stage.interactionModel.prompt}
                          </p>
                        </div>
                      )}
                    </div>
                  </section>
                );
              })}
            </div>

            {/* Editorial Landmark & Two-Way Homework Loop Bridge */}
            <section className="relative mt-20 pt-12 pb-6 border-t border-slate-200/80">
              <div className="max-w-xl mb-8">
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-indigo-600">
                  TRANSFER TO ACTION · VÒNG LẶP CHUYỂN GIAO
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">
                  Áp Dụng Sang Bài Tập Về Nhà
                </h3>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                  {activeLesson.bridgeToHomework.promptText}
                </p>
              </div>

              {/* Action Monograph Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-[0_16px_36px_-10px_rgba(15,23,42,0.3)] flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
                <div className="space-y-1 text-center md:text-left">
                  <div className="text-xs font-mono text-indigo-300 uppercase tracking-wider font-semibold flex items-center gap-2 justify-center md:justify-start">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    HOMEWORK MODULE · W{activeLesson.week}D{activeLesson.day}
                  </div>
                  <div className="text-lg font-bold text-white">
                    Kiểm chứng phản xạ tự thân với bài tập thực chiến
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (!completedLessonIds.includes(activeLesson.id)) {
                      setCompletedLessonIds([...completedLessonIds, activeLesson.id]);
                    }
                    setActiveLesson(null);
                  }}
                  className="py-3.5 px-6 rounded-2xl text-xs font-bold bg-white text-slate-950 hover:bg-emerald-50 hover:text-emerald-950 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all shrink-0 flex items-center gap-2 cursor-pointer"
                >
                  Hoàn Thành & Sang Homework
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
