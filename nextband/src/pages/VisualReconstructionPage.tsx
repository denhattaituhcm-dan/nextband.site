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

interface WeekTheme {
  primary: string;
  badgeBg: string;
  badgeText: string;
  cardBg: string;
  cardBorder: string;
  cardGlow: string;
  accentBar: string;
  titleGradient: string;
  accentText: string;
  timelineSelected: string;
  timelineBorderAccent: string;
  timelineInactiveBadge: string;
  watermarkColor: string;
  ambientAura: string;
}

const WEEK_THEMES: Record<number, WeekTheme> = {
  1: {
    primary: 'emerald',
    badgeBg: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white',
    badgeText: 'text-emerald-700',
    cardBg: 'bg-gradient-to-br from-emerald-50/90 via-white to-teal-50/60',
    cardBorder: 'border-2 border-emerald-500/80',
    cardGlow: 'card-glow-mastery-emerald',
    accentBar: 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600',
    titleGradient: 'from-emerald-950 via-teal-900 to-emerald-900',
    accentText: 'text-emerald-800',
    timelineSelected: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_8px_20px_-6px_rgba(16,185,129,0.4)]',
    timelineBorderAccent: 'border-l-4 border-l-emerald-500',
    timelineInactiveBadge: 'text-emerald-700 bg-emerald-50 border border-emerald-200/60',
    watermarkColor: 'text-emerald-950/[0.05]',
    ambientAura: 'bg-emerald-500/10',
  },
  2: {
    primary: 'indigo',
    badgeBg: 'bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-600 text-white',
    badgeText: 'text-indigo-700',
    cardBg: 'bg-gradient-to-br from-indigo-50/90 via-white to-violet-50/60',
    cardBorder: 'border-2 border-indigo-500/80',
    cardGlow: 'card-glow-mastery-indigo',
    accentBar: 'bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600',
    titleGradient: 'from-indigo-950 via-indigo-900 to-violet-950',
    accentText: 'text-indigo-900',
    timelineSelected: 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-[0_8px_20px_-6px_rgba(79,70,229,0.4)]',
    timelineBorderAccent: 'border-l-4 border-l-indigo-500',
    timelineInactiveBadge: 'text-indigo-700 bg-indigo-50 border border-indigo-200/60',
    watermarkColor: 'text-indigo-950/[0.06]',
    ambientAura: 'bg-indigo-500/10',
  },
  3: {
    primary: 'amber',
    badgeBg: 'bg-gradient-to-r from-amber-600 via-amber-700 to-orange-600 text-white',
    badgeText: 'text-amber-700',
    cardBg: 'bg-gradient-to-br from-amber-50/90 via-white to-orange-50/60',
    cardBorder: 'border-2 border-amber-500/80',
    cardGlow: 'card-glow-mastery-gold',
    accentBar: 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600',
    titleGradient: 'from-amber-950 via-orange-950 to-amber-900',
    accentText: 'text-amber-900',
    timelineSelected: 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-[0_8px_20px_-6px_rgba(245,158,11,0.4)]',
    timelineBorderAccent: 'border-l-4 border-l-amber-500',
    timelineInactiveBadge: 'text-amber-800 bg-amber-50 border border-amber-200/60',
    watermarkColor: 'text-amber-950/[0.05]',
    ambientAura: 'bg-amber-500/10',
  },
  4: {
    primary: 'sky',
    badgeBg: 'bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-600 text-white',
    badgeText: 'text-sky-700',
    cardBg: 'bg-gradient-to-br from-sky-50/90 via-white to-blue-50/60',
    cardBorder: 'border-2 border-sky-500/80',
    cardGlow: 'card-glow-mastery-sky',
    accentBar: 'bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600',
    titleGradient: 'from-sky-950 via-cyan-950 to-blue-950',
    accentText: 'text-sky-900',
    timelineSelected: 'bg-gradient-to-r from-sky-600 to-cyan-600 text-white shadow-[0_8px_20px_-6px_rgba(2,132,199,0.4)]',
    timelineBorderAccent: 'border-l-4 border-l-sky-500',
    timelineInactiveBadge: 'text-sky-800 bg-sky-50 border border-sky-200/60',
    watermarkColor: 'text-sky-950/[0.05]',
    ambientAura: 'bg-sky-500/10',
  },
  5: {
    primary: 'rose',
    badgeBg: 'bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 text-white',
    badgeText: 'text-rose-700',
    cardBg: 'bg-gradient-to-br from-rose-50/90 via-white to-pink-50/60',
    cardBorder: 'border-2 border-rose-500/80',
    cardGlow: 'card-glow-mastery-rose',
    accentBar: 'bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600',
    titleGradient: 'from-rose-950 via-pink-900 to-rose-900',
    accentText: 'text-rose-900',
    timelineSelected: 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-[0_8px_20px_-6px_rgba(225,29,72,0.4)]',
    timelineBorderAccent: 'border-l-4 border-l-rose-500',
    timelineInactiveBadge: 'text-rose-800 bg-rose-50 border border-rose-200/60',
    watermarkColor: 'text-rose-950/[0.05]',
    ambientAura: 'bg-rose-500/10',
  },
  6: {
    primary: 'purple',
    badgeBg: 'bg-gradient-to-r from-purple-600 to-violet-600 text-white',
    badgeText: 'text-purple-700',
    cardBg: 'bg-gradient-to-br from-purple-50/90 via-white to-violet-50/60',
    cardBorder: 'border-2 border-purple-500/80',
    cardGlow: 'card-glow-mastery-purple',
    accentBar: 'bg-gradient-to-r from-purple-500 via-violet-500 to-purple-600',
    titleGradient: 'from-purple-950 via-violet-900 to-purple-900',
    accentText: 'text-purple-900',
    timelineSelected: 'bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-[0_8px_20px_-6px_rgba(147,51,234,0.4)]',
    timelineBorderAccent: 'border-l-4 border-l-purple-500',
    timelineInactiveBadge: 'text-purple-800 bg-purple-50 border border-purple-200/60',
    watermarkColor: 'text-purple-950/[0.05]',
    ambientAura: 'bg-purple-500/10',
  },
  7: {
    primary: 'teal',
    badgeBg: 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white',
    badgeText: 'text-teal-700',
    cardBg: 'bg-gradient-to-br from-teal-50/90 via-white to-emerald-50/60',
    cardBorder: 'border-2 border-teal-500/80',
    cardGlow: 'card-glow-mastery-teal',
    accentBar: 'bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600',
    titleGradient: 'from-teal-950 via-emerald-900 to-teal-900',
    accentText: 'text-teal-900',
    timelineSelected: 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-[0_8px_20px_-6px_rgba(13,148,136,0.4)]',
    timelineBorderAccent: 'border-l-4 border-l-teal-500',
    timelineInactiveBadge: 'text-teal-800 bg-teal-50 border border-teal-200/60',
    watermarkColor: 'text-teal-950/[0.05]',
    ambientAura: 'bg-teal-500/10',
  },
  8: {
    primary: 'slate',
    badgeBg: 'bg-gradient-to-r from-slate-700 to-zinc-800 text-white',
    badgeText: 'text-slate-700',
    cardBg: 'bg-gradient-to-br from-slate-100/90 via-white to-zinc-100/60',
    cardBorder: 'border-2 border-slate-500/80',
    cardGlow: 'card-glow-mastery-slate',
    accentBar: 'bg-gradient-to-r from-slate-600 via-zinc-600 to-slate-700',
    titleGradient: 'from-slate-950 via-zinc-900 to-slate-900',
    accentText: 'text-slate-900',
    timelineSelected: 'bg-gradient-to-r from-slate-700 to-zinc-800 text-white shadow-[0_8px_20px_-6px_rgba(51,65,85,0.4)]',
    timelineBorderAccent: 'border-l-4 border-l-slate-500',
    timelineInactiveBadge: 'text-slate-800 bg-slate-100 border border-slate-300/70',
    watermarkColor: 'text-slate-950/[0.05]',
    ambientAura: 'bg-slate-500/10',
  },
  9: {
    primary: 'blue',
    badgeBg: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white',
    badgeText: 'text-blue-700',
    cardBg: 'bg-gradient-to-br from-blue-50/90 via-white to-indigo-50/60',
    cardBorder: 'border-2 border-blue-500/80',
    cardGlow: 'card-glow-mastery-blue',
    accentBar: 'bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600',
    titleGradient: 'from-blue-950 via-indigo-900 to-blue-900',
    accentText: 'text-blue-900',
    timelineSelected: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_8px_20px_-6px_rgba(37,99,235,0.4)]',
    timelineBorderAccent: 'border-l-4 border-l-blue-500',
    timelineInactiveBadge: 'text-blue-800 bg-blue-50 border border-blue-200/60',
    watermarkColor: 'text-blue-950/[0.05]',
    ambientAura: 'bg-blue-500/10',
  },
};

const DEFAULT_WEEK_THEME = WEEK_THEMES[2];

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

  const currentTheme = useMemo(() => {
    return WEEK_THEMES[currentWeekMeta.week] || DEFAULT_WEEK_THEME;
  }, [currentWeekMeta.week]);

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
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/70">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              Tái Dựng Bài Học
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[9px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 text-white shadow-[0_2px_6px_rgba(245,158,11,0.35)] ring-1 ring-amber-400/40">
                NEW
              </span>
            </span>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-medium text-slate-600">Khóa Dreamer (Mục tiêu 4.0)</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              9 tuần
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              27 bài học
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
                  const wmTheme = WEEK_THEMES[wm.week] || DEFAULT_WEEK_THEME;

                  return (
                    <button
                      key={wm.week}
                      onClick={() => setSelectedWeek(wm.week)}
                      className={`w-full text-left p-3 rounded-xl transition-all duration-200 relative z-10 flex items-start gap-3.5 group cursor-pointer ${
                        isSelected
                          ? `${wmTheme.timelineSelected} translate-x-1`
                          : isActive
                          ? 'bg-indigo-50/70 hover:bg-indigo-50 text-slate-800 border border-indigo-200/80 shadow-xs'
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
                            <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-white' : 'bg-indigo-600'} animate-pulse`} />
                          </div>
                        ) : (
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-mono font-bold transition-colors ${
                            isSelected ? 'border-white/40 bg-white/20 text-white' : 'border-slate-300 bg-white text-slate-400 group-hover:border-slate-400'
                          }`}>
                            {wm.week}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded transition-colors ${
                            isSelected ? 'text-white/95 bg-white/20' : wmTheme.timelineInactiveBadge
                          }`}>
                            TUẦN 0{wm.week}
                          </span>
                          <span className={`text-[10px] font-mono font-semibold ${
                            isSelected ? 'text-white/90' : 'text-slate-500'
                          }`}>
                            {wm.progressPercent}%
                          </span>
                        </div>
                        <p className={`text-xs font-semibold truncate mt-1 ${
                          isSelected ? 'text-white font-bold' : isActive ? 'text-indigo-950 font-bold' : 'text-slate-800'
                        }`}>
                          {wm.title}
                        </p>
                        {wm.homeworkPendingCount > 0 && (
                          <p className={`text-[10px] font-medium mt-1 flex items-center gap-1 ${
                            isSelected ? 'text-white/80' : 'text-amber-600'
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
              {/* TẦNG 2: WHAT AM I LEARNING? (Thẻ Tiêu Đề & Trọng Tâm Tuần Có Màu Sắc Nổi Bật) */}
              <section className={`${currentTheme.cardBg} text-slate-900 rounded-3xl p-8 sm:p-9 shadow-[0_12px_36px_-8px_rgba(79,70,229,0.18)] relative overflow-hidden ${currentTheme.cardBorder} ${currentTheme.cardGlow}`}>
                {/* Decorative Top Accent Bar */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 ${currentTheme.accentBar}`} />

                {/* Subtle Ambient Light Aura */}
                <div className={`absolute -top-20 -right-20 w-56 h-56 rounded-full ${currentTheme.ambientAura} blur-3xl pointer-events-none`} />

                {/* Subtle Spatial Watermark Number */}
                <div className={`absolute -right-4 -bottom-8 select-none pointer-events-none font-mono font-black text-9xl ${currentTheme.watermarkColor} tracking-tighter`}>
                  0{currentWeekMeta.week}
                </div>

                <div className="relative z-10 max-w-2xl">
                  {/* Top Folio / Breadcrumb Pill */}
                  <div className="flex flex-wrap items-center gap-2.5 mb-3.5">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider px-3 py-1 rounded-xl ${currentTheme.badgeBg} shadow-sm`}>
                      <Sparkles className="w-3.5 h-3.5 text-white/90" />
                      TRỌNG TÂM TUẦN 0{currentWeekMeta.week}
                    </span>
                    <span className="text-slate-300">/</span>
                    <span className="text-xs font-semibold tracking-wide text-slate-500">
                      Mục tiêu đầu ra Band 4.0
                    </span>
                  </div>

                  {/* THẺ TÊN TIÊU ĐỀ CHỦ ĐỀ TUẦN: TỔ CHỨC KHÔNG GIAN & LOGIC */}
                  <div className="mb-2.5">
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-3">
                      <span className={`bg-gradient-to-r ${currentTheme.titleGradient} bg-clip-text text-transparent`}>
                        {currentWeekMeta.title}
                      </span>
                    </h2>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    Trọng tâm tuần này: <span className={`${currentTheme.accentText} font-semibold`}>{currentWeekMeta.theme}</span>. Nắm vững ngữ pháp nền tảng, tránh bẫy đọc hiểu và luyện phản xạ nói tự tin.
                  </p>
                </div>
              </section>

              {/* 3 LESSON MODULES (WRITING - READING - SPEAKING) */}
              <div>
                <div className="flex items-center justify-between mb-4 px-1">
                  <h3 className="text-base font-bold text-slate-900">
                    Bài học trong tuần
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">
                    Chọn bài để bắt đầu học
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
                            <span className="text-[11px] font-mono font-bold tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100 flex items-center gap-1.5">
                              <Cpu className="w-3.5 h-3.5" />
                              Writing · Buổi 1
                            </span>
                            {isWritingDone && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-xs">
                                <Sparkles className="w-3 h-3 text-emerald-600" /> Đã hoàn thành
                              </span>
                            )}
                          </div>

                          <h4 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                            {writingLesson.title}
                          </h4>
                          <p className="text-xs text-slate-500 mt-1 mb-5 line-clamp-2">
                            {writingLesson.subtitle}
                          </p>

                          {/* Visual Mechanism Miniature */}
                          <div className={`py-4 px-3.5 rounded-2xl border mb-6 transition-colors ${
                            isWritingDone ? 'bg-emerald-50/40 border-emerald-200/70' : 'bg-slate-50/80 border-slate-200/80'
                          }`}>
                            <div className="text-[11px] font-bold text-slate-600 mb-2.5 flex items-center gap-1.5">
                              <Layers className="w-3.5 h-3.5 text-indigo-600" />
                              Cấu trúc câu cơ bản
                            </div>
                            {/* Tactile Connectors */}
                            <div className="flex items-center justify-center gap-2 text-xs font-bold py-2.5 bg-white rounded-xl border border-slate-200 shadow-xs text-slate-700">
                              <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200/80 font-medium">Chủ ngữ (S)</span>
                              <span className="text-slate-300 font-bold">+</span>
                              <span className="px-2.5 py-1 rounded-lg bg-orange-50 text-orange-700 border border-orange-200/80 font-medium">Động từ (V)</span>
                              <span className="text-slate-300 font-bold">+</span>
                              <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200/80 font-medium">Tân ngữ (O)</span>
                            </div>
                          </div>
                        </div>

                        {/* CTA & Homework */}
                        <div className="pt-4 border-t border-slate-100 space-y-3">
                          <button
                            onClick={() => setActiveLesson(writingLesson)}
                            className={`w-full py-3 px-4 rounded-xl text-xs font-bold text-white transition-all flex items-center justify-center gap-2 cursor-pointer active:translate-y-0.5 ${
                              isWritingDone
                                ? 'bg-emerald-600 hover:bg-emerald-700 shadow-[0_4px_14px_rgba(5,150,105,0.35)]'
                                : 'bg-indigo-600 hover:bg-indigo-700 shadow-[0_4px_14px_rgba(79,70,229,0.3)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.4)]'
                            }`}
                          >
                            {isWritingDone ? 'Ôn tập lại' : 'Vào học bài'}
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>

                          <div className="bg-slate-50/80 px-3 py-2 rounded-xl border border-slate-200/80 flex items-center justify-between text-[11px]">
                            <span className="text-slate-600 font-medium truncate">
                              Bài tập Buổi 1
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

                  {/* 2. READING MODULE: EVIDENCE SCALE LAB */}
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
                            <span className="text-[11px] font-mono font-bold tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 flex items-center gap-1.5">
                              <Scale className="w-3.5 h-3.5" />
                              Reading · Buổi 2
                            </span>
                            {isReadingDone && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 shadow-xs">
                                <Sparkles className="w-3 h-3 text-amber-600" /> Đã hoàn thành
                              </span>
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
                            <div className="text-[11px] font-bold text-slate-600 mb-2.5 flex items-center gap-1.5">
                              <Scale className="w-3.5 h-3.5 text-amber-600" />
                              Đối chiếu thông tin
                            </div>
                            {/* Scale Balance Tactile */}
                            <div className="flex items-center justify-center gap-3 text-xs font-bold py-2.5 px-3 bg-white rounded-xl border border-slate-200 shadow-xs text-slate-700">
                              <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200/80 font-semibold">Nhận định</span>
                              <span className="text-amber-600 font-bold text-base">⚖</span>
                              <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200/80 font-semibold">Bằng chứng</span>
                            </div>
                          </div>
                        </div>

                        {/* CTA & Homework */}
                        <div className="pt-4 border-t border-slate-100 space-y-3">
                          <button
                            onClick={() => setActiveLesson(readingLesson)}
                            className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-[0_4px_18px_rgba(217,119,6,0.35)] hover:shadow-[0_6px_22px_rgba(217,119,6,0.45)] active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
                          >
                            Ôn tập lại
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>

                          <div className="bg-amber-50/70 px-3 py-2 rounded-xl border border-amber-200/80 flex items-center justify-between text-[11px]">
                            <span className="text-slate-700 font-medium truncate">
                              Bài tập Buổi 2
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
                            <span className="text-[11px] font-mono font-bold tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 flex items-center gap-1.5">
                              <Layers className="w-3.5 h-3.5" />
                              Speaking · Buổi 3
                            </span>
                            {isSpeakingDone && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-xs">
                                <Sparkles className="w-3 h-3 text-emerald-600" /> Đã hoàn thành
                              </span>
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
                            <div className="text-[11px] font-bold text-slate-600 mb-2 flex items-center gap-1.5">
                              <Layers className="w-3.5 h-3.5 text-emerald-600" />
                              3 bước trả lời lưu loát
                            </div>
                            {/* Cascade Steps */}
                            <div className="space-y-1.5 text-xs py-2 px-2.5 bg-white rounded-xl border border-slate-200 shadow-xs text-slate-700">
                              <div className="flex items-center justify-between bg-emerald-50/80 px-2.5 py-1.5 rounded-lg text-emerald-900 font-medium">
                                <span>1. Trả lời trực diện</span>
                                <span className="text-[10px] text-emerald-700 font-semibold">Ý chính</span>
                              </div>
                              <div className="flex items-center justify-between bg-slate-50 px-2.5 py-1.5 rounded-lg text-slate-700 font-medium">
                                <span>2. Giải thích lý do</span>
                                <span className="text-[10px] text-slate-500 font-semibold">Tại sao</span>
                              </div>
                              <div className="flex items-center justify-between bg-slate-50 px-2.5 py-1.5 rounded-lg text-slate-700 font-medium">
                                <span>3. Mở rộng câu trả lời</span>
                                <span className="text-[10px] text-indigo-600 font-semibold">Ví dụ thêm</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* CTA & Homework */}
                        <div className="pt-4 border-t border-slate-100 space-y-3">
                          <button
                            onClick={() => setActiveLesson(speakingLesson)}
                            className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-[0_4px_14px_rgba(5,150,105,0.3)] hover:shadow-[0_6px_20px_rgba(5,150,105,0.4)] active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
                          >
                            {isSpeakingDone ? 'Ôn tập lại' : 'Vào học bài'}
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>

                          <div className="bg-slate-50/80 px-3 py-2 rounded-xl border border-slate-200/80 flex items-center justify-between text-[11px]">
                            <span className="text-slate-600 font-medium truncate">
                              Bài tập Buổi 3
                            </span>
                            {isSpeakingDone ? (
                              <span className="text-emerald-700 font-semibold flex items-center gap-1 shrink-0 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60 text-[10px]">
                                <CheckCircle2 className="w-3 h-3" /> Đã hoàn thành
                              </span>
                            ) : (
                              <span className="text-slate-500 font-medium flex items-center gap-1 shrink-0 bg-slate-100 px-2 py-0.5 rounded-md text-[10px]">
                                Chưa làm
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
            {/* 1. EDITORIAL HERO CARD - TỔNG QUAN BÀI HỌC */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-[0_10px_30px_-10px_rgba(15,23,42,0.06)] mb-10 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono font-bold tracking-wider px-3 py-1 rounded-lg bg-indigo-600 text-white shadow-xs">
                    {activeLesson.skill.charAt(0).toUpperCase() + activeLesson.skill.slice(1)} · Buổi {activeLesson.day}
                  </span>
                  <span className="text-xs font-mono font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                    Tuần 0{activeLesson.week}
                  </span>
                  <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/60 px-2.5 py-1 rounded-lg">
                    {activeLesson.stages.length} chặng
                  </span>
                </div>

                <button
                  onClick={() => setActiveLesson(null)}
                  className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white text-slate-700 hover:text-indigo-700 hover:border-indigo-300 transition-all shadow-xs self-start sm:self-auto cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Quay lại lộ trình
                </button>
              </div>

              <div className="pt-5">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {activeLesson.title}
                </h2>
                <p className="text-sm font-medium text-indigo-900/80 mt-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                  {activeLesson.subtitle}
                </p>
                <div className="mt-4 p-4 rounded-2xl bg-slate-50/90 border border-slate-200/70 flex items-start gap-3">
                  <BookOpen className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    <span className="font-bold text-slate-800">Mục tiêu: </span>
                    {activeLesson.coreCompetency}
                  </p>
                </div>
              </div>
            </div>

            {/* 2. CHUỖI CHẶNG THỰC HÀNH */}
            <div className="space-y-8">
              {activeLesson.stages.map((stage, sIdx) => {
                const isTransfer = stage.interactionModel.type === 'transfer_test';
                const isBuild = (stage.interactionModel as any).mode === 'build';
                const isBreak = (stage.interactionModel as any).mode === 'break_and_repair';

                return (
                  <section 
                    key={stage.stageNumber} 
                    className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-[0_6px_24px_-6px_rgba(15,23,42,0.05)] hover:shadow-[0_12px_32px_-8px_rgba(15,23,42,0.08)] transition-all duration-300 relative"
                  >
                    {/* Stage Header Band */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-6 border-b border-slate-100">
                      <div className="flex items-center gap-3.5">
                        <span className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-700 font-mono font-black text-lg flex items-center justify-center shrink-0 shadow-xs">
                          0{stage.stageNumber}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                              Chặng {stage.stageNumber}
                            </span>
                            <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                              isBuild
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                                : isBreak
                                ? 'bg-rose-50 text-rose-700 border border-rose-200/60'
                                : 'bg-indigo-50 text-indigo-700 border border-indigo-200/60'
                            }`}>
                              {isBuild ? '✦ Lắp ráp câu' : isBreak ? '💥 Sửa lỗi câu' : '⚖ Xác minh logic'}
                            </span>
                          </div>
                          <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mt-1">
                            {stage.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Pedagogical Purpose Callout */}
                    <div className="mb-6 py-3 px-4 rounded-xl bg-slate-50 border-l-3 border-indigo-500 text-xs text-slate-600 leading-relaxed">
                      <span className="font-bold text-slate-800">Mục tiêu: </span>
                      {stage.pedagogicalObjective}
                    </div>

                    {/* Interactive Component Surface */}
                    <div className="pt-1">
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
                            🎯 Thử thách vận dụng
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
                <h3 className="text-2xl font-bold text-slate-900 mt-1">
                  Bài tập về nhà
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
                    Bài tập Tuần {activeLesson.week} · Buổi {activeLesson.day}
                  </div>
                  <div className="text-lg font-bold text-white">
                    Luyện tập thực hành để nắm vững kiến thức
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
                  Hoàn thành & Làm bài tập
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
