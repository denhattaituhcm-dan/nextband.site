import React, { useState, useMemo } from 'react';
import { vrsMockLessons } from '@/data/vrsLessonsData';
import { VRSVisualLesson } from '@/types/vrs';
import VRSSlotSnapInteractive from '@/components/vrs/VRSSlotSnapInteractive';
import VRSVerificationScaleInteractive from '@/components/vrs/VRSVerificationScaleInteractive';
import VRSProgressiveRevealInteractive from '@/components/vrs/VRSProgressiveRevealInteractive';
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
  { week: 1, title: 'Sentence Foundations', theme: 'Clause Core Engine & Sound Mechanics', progressPercent: 100, status: 'completed', homeworkPendingCount: 0 },
  { week: 2, title: 'Spatial & Logical Organisation', theme: 'Verb Compatibility & Logic Verification', progressPercent: 67, status: 'active', homeworkPendingCount: 1 },
  { week: 3, title: 'Timeline & Evidence Lab', theme: 'Tense Anchoring & Semantic Boundaries', progressPercent: 33, status: 'available', homeworkPendingCount: 2 },
  { week: 4, title: 'Modifiers & Precision', theme: 'Attachment Rules & Technical Traps', progressPercent: 0, status: 'available', homeworkPendingCount: 3 },
  { week: 5, title: 'Prepositional Anchors', theme: 'Fixed Collocations & Cause Reasoning', progressPercent: 0, status: 'available', homeworkPendingCount: 3 },
  { week: 6, title: 'Relative Clauses & Identity', theme: 'Complex Synthesis & Contrast Prefs', progressPercent: 0, status: 'available', homeworkPendingCount: 3 },
  { week: 7, title: 'Punctuation & Conditionals', theme: 'Non-defining Rules & Deep Loyalty', progressPercent: 0, status: 'available', homeworkPendingCount: 3 },
  { week: 8, title: 'Passive Focus & Crime Trace', theme: 'Object Inversion & Motive Verification', progressPercent: 0, status: 'available', homeworkPendingCount: 3 },
  { week: 9, title: 'Subordinating Clause Glue', theme: 'Conjunction Traps & Growth Synthesis', progressPercent: 0, status: 'available', homeworkPendingCount: 3 }
];

export default function VisualReconstructionPage() {
  const [selectedWeek, setSelectedWeek] = useState<number>(2);
  const [activeLesson, setActiveLesson] = useState<VRSVisualLesson | null>(null);

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {!activeLesson ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* TẦNG 1: WHERE AM I? (Vertical Progression Rail - 3 Cols on LG) */}
            <aside className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Progression Rail
                </h3>
                <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                  9 Weeks
                </span>
              </div>

              <nav className="space-y-1.5" aria-label="Weeks Progression">
                {WEEKS_META.map((wm) => {
                  const isSelected = wm.week === selectedWeek;
                  const isCompleted = wm.progressPercent === 100;
                  const isActive = wm.status === 'active';

                  return (
                    <button
                      key={wm.week}
                      onClick={() => setSelectedWeek(wm.week)}
                      className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 border ${
                        isSelected
                          ? 'bg-indigo-50/80 border-indigo-200 text-indigo-950 shadow-xs'
                          : 'bg-white border-transparent hover:border-slate-200 hover:bg-slate-50/80 text-slate-700'
                      }`}
                    >
                      {/* Status Icon */}
                      <div className="mt-0.5 shrink-0">
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : isActive ? (
                          <div className="w-4 h-4 rounded-full border-2 border-indigo-600 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-slate-300" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Tuần {wm.week}
                          </span>
                          <span className="text-[11px] font-semibold text-slate-500">
                            {wm.progressPercent}%
                          </span>
                        </div>
                        <p className={`text-xs font-semibold truncate mt-0.5 ${isSelected ? 'text-indigo-950' : 'text-slate-800'}`}>
                          {wm.title}
                        </p>
                        {wm.homeworkPendingCount > 0 && (
                          <p className="text-[10px] text-amber-600 font-medium mt-1">
                            {wm.homeworkPendingCount} homework pending
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </nav>
            </aside>

            {/* MAIN CONTENT AREA: TẦNG 2, 3, 4 (9 Cols on LG) */}
            <main className="lg:col-span-9 space-y-6">
              {/* TẦNG 2: WHAT AM I LEARNING? (Week Hero Banner) */}
              <section className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 shadow-sm relative overflow-hidden border border-slate-800">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold uppercase px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      WEEK 0{currentWeekMeta.week}
                    </span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs font-medium text-slate-300">
                      Target Band 4.0 Focus
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight text-white mb-2">
                    {currentWeekMeta.title}
                  </h2>
                  <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                    Chủ đề trọng tâm: {currentWeekMeta.theme}. Bóc tách cơ chế ngữ pháp, cô lập bằng chứng đọc hiểu và làm chủ cấu trúc phản xạ nói.
                  </p>
                </div>
              </section>

              {/* TẦNG 3 & 4: 3 COGNITIVE MODULES (WRITING - READING - SPEAKING) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* 1. WRITING MODULE: SENTENCE BUILDER ENGINE */}
                {writingLesson && (
                  <div className="bg-white border border-indigo-100 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-indigo-300 transition-all group">
                    <div>
                      {/* Header Badge */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-bold uppercase px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100 flex items-center gap-1.5">
                          <Cpu className="w-3 h-3" />
                          WRITING · DAY 1
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400">Day 1</span>
                      </div>

                      <h4 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {writingLesson.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 mb-4">
                        {writingLesson.subtitle}
                      </p>

                      {/* Visual Mechanism Miniature (Interactive Preview) */}
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 mb-4">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 mb-2 flex items-center gap-1">
                          <Layers className="w-3 h-3" />
                          Sentence Slot Engine
                        </div>
                        <div className="flex items-center justify-center gap-1.5 font-mono text-[11px] font-bold py-2 bg-white rounded-lg border border-slate-200 text-slate-700">
                          <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">[ S ]</span>
                          <span className="text-slate-300">+</span>
                          <span className="px-1.5 py-0.5 rounded bg-orange-50 text-orange-700 border border-orange-200">[ FV ]</span>
                          <span className="text-slate-300">+</span>
                          <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">[ O ]</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                          {writingLesson.coreCompetency}
                        </p>
                      </div>
                    </div>

                    {/* TẦNG 4: LEARNING LOOP & HOMEWORK BRIDGE */}
                    <div className="pt-3 border-t border-slate-100 space-y-3">
                      {/* Learning Loop Status */}
                      <div className="flex items-center justify-between text-[11px] font-semibold">
                        <span className="text-slate-400">LEARNING LOOP:</span>
                        <div className="flex items-center gap-1 text-[10px] font-bold">
                          <span className="text-emerald-600 flex items-center gap-0.5">
                            <Check className="w-3 h-3" /> LEARN
                          </span>
                          <span className="text-slate-300">→</span>
                          <span className="text-indigo-600 flex items-center gap-0.5">
                            <Sparkles className="w-3 h-3" /> REBUILD
                          </span>
                          <span className="text-slate-300">→</span>
                          <span className="text-amber-600">HOMEWORK</span>
                        </div>
                      </div>

                      {/* Main Action Button */}
                      <button
                        onClick={() => setActiveLesson(writingLesson)}
                        className="w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        Khám Phá Cơ Chế
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      {/* Homework Link Pill */}
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-200 flex items-center justify-between text-[11px]">
                        <span className="text-slate-600 font-medium truncate">
                          HW W{selectedWeek}D1
                        </span>
                        <span className="text-amber-600 font-semibold flex items-center gap-1 shrink-0">
                          <Clock className="w-3 h-3" /> Cần làm
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. READING MODULE: EVIDENCE SCALE LAB */}
                {readingLesson && (
                  <div className="bg-white border border-amber-100 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-amber-300 transition-all group">
                    <div>
                      {/* Header Badge */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-bold uppercase px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 border border-amber-100 flex items-center gap-1.5">
                          <Scale className="w-3 h-3" />
                          READING · DAY 2
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400">Day 2</span>
                      </div>

                      <h4 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                        {readingLesson.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 mb-4">
                        {readingLesson.subtitle}
                      </p>

                      {/* Visual Mechanism Miniature (Evidence Scale) */}
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 mb-4">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-amber-700 mb-2 flex items-center gap-1">
                          <Scale className="w-3 h-3" />
                          Logic Verification Scale
                        </div>
                        <div className="flex items-center justify-between font-mono text-[10px] font-bold py-2 px-2.5 bg-white rounded-lg border border-slate-200 text-slate-700">
                          <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">CLAIM</span>
                          <span className="text-amber-600 text-sm">⚖</span>
                          <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">EVIDENCE</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                          {readingLesson.coreCompetency}
                        </p>
                      </div>
                    </div>

                    {/* TẦNG 4: LEARNING LOOP & HOMEWORK BRIDGE */}
                    <div className="pt-3 border-t border-slate-100 space-y-3">
                      {/* Learning Loop Status */}
                      <div className="flex items-center justify-between text-[11px] font-semibold">
                        <span className="text-slate-400">LEARNING LOOP:</span>
                        <div className="flex items-center gap-1 text-[10px] font-bold">
                          <span className="text-emerald-600 flex items-center gap-0.5">
                            <Check className="w-3 h-3" /> LEARN
                          </span>
                          <span className="text-slate-300">→</span>
                          <span className="text-amber-600 flex items-center gap-0.5">
                            <Sparkles className="w-3 h-3" /> REBUILD
                          </span>
                          <span className="text-slate-300">→</span>
                          <span className="text-emerald-600">DONE</span>
                        </div>
                      </div>

                      {/* Main Action Button */}
                      <button
                        onClick={() => setActiveLesson(readingLesson)}
                        className="w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-amber-600 text-white hover:bg-amber-700 transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        Khám Phá Cơ Chế
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      {/* Homework Link Pill */}
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-200 flex items-center justify-between text-[11px]">
                        <span className="text-slate-600 font-medium truncate">
                          HW W{selectedWeek}D2
                        </span>
                        <span className="text-emerald-600 font-semibold flex items-center gap-1 shrink-0">
                          <CheckCircle2 className="w-3 h-3" /> Hoàn thành
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. SPEAKING MODULE: RESPONSE BUILDER CASCADE */}
                {speakingLesson && (
                  <div className="bg-white border border-emerald-100 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-emerald-300 transition-all group">
                    <div>
                      {/* Header Badge */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-bold uppercase px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center gap-1.5">
                          <Layers className="w-3 h-3" />
                          SPEAKING · DAY 3
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400">Day 3</span>
                      </div>

                      <h4 className="text-base font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                        {speakingLesson.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 mb-4">
                        {speakingLesson.subtitle}
                      </p>

                      {/* Visual Mechanism Miniature (Progressive Reveal Stack) */}
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 mb-4">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 mb-2 flex items-center gap-1">
                          <Layers className="w-3 h-3" />
                          4-Tier Response Cascade
                        </div>
                        <div className="space-y-1 font-mono text-[9px] font-bold py-1 px-2 bg-white rounded-lg border border-slate-200 text-slate-600">
                          <div className="flex items-center justify-between bg-emerald-50/60 px-1.5 py-0.5 rounded text-emerald-800">
                            <span>1. STANCE</span>
                            <span className="text-[8px] font-normal text-slate-400">Trực diện</span>
                          </div>
                          <div className="flex items-center justify-between bg-slate-50 px-1.5 py-0.5 rounded text-slate-700">
                            <span>2. WHY?</span>
                            <span className="text-[8px] font-normal text-slate-400">Lý do</span>
                          </div>
                          <div className="flex items-center justify-between bg-slate-50 px-1.5 py-0.5 rounded text-slate-700">
                            <span>3. DEVELOP</span>
                            <span className="text-[8px] font-normal text-indigo-500">Branch ±</span>
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                          {speakingLesson.coreCompetency}
                        </p>
                      </div>
                    </div>

                    {/* TẦNG 4: LEARNING LOOP & HOMEWORK BRIDGE */}
                    <div className="pt-3 border-t border-slate-100 space-y-3">
                      {/* Learning Loop Status */}
                      <div className="flex items-center justify-between text-[11px] font-semibold">
                        <span className="text-slate-400">LEARNING LOOP:</span>
                        <div className="flex items-center gap-1 text-[10px] font-bold">
                          <span className="text-emerald-600 flex items-center gap-0.5">
                            <Check className="w-3 h-3" /> LEARN
                          </span>
                          <span className="text-slate-300">→</span>
                          <span className="text-emerald-600 flex items-center gap-0.5">
                            <Sparkles className="w-3 h-3" /> REBUILD
                          </span>
                          <span className="text-slate-300">→</span>
                          <span className="text-slate-400">CHƯA LÀM</span>
                        </div>
                      </div>

                      {/* Main Action Button */}
                      <button
                        onClick={() => setActiveLesson(speakingLesson)}
                        className="w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        Khám Phá Cơ Chế
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      {/* Homework Link Pill */}
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-200 flex items-center justify-between text-[11px]">
                        <span className="text-slate-600 font-medium truncate">
                          HW W{selectedWeek}D3
                        </span>
                        <span className="text-slate-500 font-medium flex items-center gap-1 shrink-0">
                          Chưa bắt đầu
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </main>
          </div>
        ) : (
          /* LABWORK FOCUS CANVAS (Khi học sinh bấm "Khám Phá Cơ Chế") */
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            {/* Header & Back Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-bold uppercase px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {activeLesson.skill} · Day {activeLesson.day}
                  </span>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-xs font-medium text-slate-500">
                    Tuần {activeLesson.week}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900">{activeLesson.title}</h2>
                <p className="text-sm text-slate-500 mt-0.5">{activeLesson.subtitle}</p>
              </div>

              <button
                onClick={() => setActiveLesson(null)}
                className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors shadow-xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Quay Lại Bản Đồ Tuần
              </button>
            </div>

            {/* Stages / Cognitive Engines */}
            <div className="space-y-8">
              {activeLesson.stages.map((stage) => (
                <div key={stage.stageNumber} className="border border-slate-200 rounded-2xl p-6 bg-slate-50/50">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-mono">
                        {stage.stageNumber}
                      </span>
                      {stage.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-500 mb-4 pl-8">
                    {stage.pedagogicalObjective}
                  </p>

                  {/* Interactive Component Mount */}
                  <div className="p-5 sm:p-6 rounded-xl bg-white border border-slate-200 shadow-xs">
                    {stage.interactionModel.type === 'slot_snap' && (
                      <VRSSlotSnapInteractive model={stage.interactionModel as any} />
                    )}
                    {stage.interactionModel.type === 'verification_scale' && (
                      <VRSVerificationScaleInteractive model={stage.interactionModel as any} />
                    )}
                    {stage.interactionModel.type === 'progressive_reveal' && (
                      <VRSProgressiveRevealInteractive model={stage.interactionModel as any} />
                    )}
                    {stage.interactionModel.type === 'transfer_test' && (
                      <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 text-center">
                        <p className="text-xs font-bold text-indigo-900 mb-1">
                          🎯 THỬ THÁCH CHUYỂN GIAO NĂNG LỰC
                        </p>
                        <p className="text-xs text-indigo-700">
                          {stage.interactionModel.prompt}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Two-Way Homework Loop Bridge */}
            <div className="mt-8 p-6 rounded-2xl bg-indigo-50/80 border border-indigo-200 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-indigo-950 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  Vòng Lặp Nhận Thức: Áp Dụng Sang Homework
                </h4>
                <p className="text-xs text-indigo-800 mt-1 max-w-xl leading-relaxed">
                  {activeLesson.bridgeToHomework.promptText}
                </p>
              </div>
              <button className="py-2.5 px-5 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shrink-0 shadow-xs flex items-center gap-2">
                Bắt Đầu Làm Bài Tập W{activeLesson.week}D{activeLesson.day}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
