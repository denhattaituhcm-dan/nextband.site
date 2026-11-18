import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { SiteLogo } from '@/components/common/SiteLogo';
import { SEO } from '@/components/common/SEO';
import { 
  BookOpen, 
  Sparkles, 
  Trophy, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  Compass,
  Home,
  Timer,
  Play,
  RotateCcw,
  CloudUpload,
  HardDrive,
  LogIn,
  Search,
  Filter,
  Layers,
  Award
} from 'lucide-react';
import { useReadingChallengeHub } from '../hooks/useReadingChallengeHub';

export const ChallengeHubPage: React.FC = () => {
  const {
    unitsOverview,
    continueUnit,
    completedCount,
    startedCount,
    overallPercent,
    averageWpm,
    isSyncing,
    isAuthenticated,
    user,
  } = useReadingChallengeHub();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPhase, setSelectedPhase] = useState<'all' | '1' | '2' | '3' | '4'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'in_progress' | 'completed' | 'unstarted'>('all');

  const filteredUnits = useMemo(() => {
    return unitsOverview.filter((u) => {
      // Search
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch = !q || u.title.toLowerCase().includes(q) || u.category.toLowerCase().includes(q) || String(u.unitNumber) === q;
      if (!matchesSearch) return false;

      // Phase filter: 1 (1-5), 2 (6-10), 3 (11-15), 4 (16-20)
      if (selectedPhase !== 'all') {
        const phaseNum = parseInt(selectedPhase, 10);
        const minUnit = (phaseNum - 1) * 5 + 1;
        const maxUnit = phaseNum * 5;
        if (u.unitNumber < minUnit || u.unitNumber > maxUnit) return false;
      }

      // Status filter
      if (selectedStatus === 'completed' && !u.isCompleted) return false;
      if (selectedStatus === 'in_progress' && (!u.hasStarted || u.isCompleted)) return false;
      if (selectedStatus === 'unstarted' && u.hasStarted) return false;

      return true;
    });
  }, [unitsOverview, searchQuery, selectedPhase, selectedStatus]);

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 pb-20">
      <SEO
        title="Thử thách đọc hiểu (Reading Challenge 1) | NextBand IELTS"
        description="Lộ trình 20 bài đọc hiểu học thuật tích hợp đo tốc độ WPM, trắc nghiệm ngữ cảnh, nghe hội thoại và bài kiểm tra tổng hợp."
      />

      {/* Top Navigation Bar with Logo */}
      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 h-14 sm:h-16 flex items-center justify-between">
          <Link
            to="/"
            title="Quay về trang chủ NextBand"
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none transition-transform active:scale-95"
          >
            <SiteLogo
              alt="NextBand Logo"
              className="h-8 w-8 sm:h-9 sm:w-9 object-contain transition-transform group-hover:scale-105 shrink-0"
            />
            <div className="flex flex-col">
              <span className="font-black text-sm sm:text-base tracking-wider text-foreground leading-none">
                NEXTBAND
              </span>
              <span className="text-[10px] text-muted-foreground font-medium tracking-wide">
                Học liệu tự học
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Cloud Sync Status Indicator */}
            {isAuthenticated ? (
              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                {isSyncing ? (
                  <>
                    <CloudUpload className="w-3.5 h-3.5 animate-bounce text-emerald-600" />
                    <span>Đang đồng bộ Cloud...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Cloud Sync: {user?.fullName || user?.email?.split('@')[0] || 'Đã kết nối'}</span>
                  </>
                )}
              </div>
            ) : (
              <Link
                to="/auth/login"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors"
                title="Đăng nhập để đồng bộ kết quả lên tài khoản"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Đăng nhập đồng bộ</span>
              </Link>
            )}

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-muted-foreground hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-950/50 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Trang chủ</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Banner with Guided Path */}
      <section className="bg-gradient-to-b from-sky-500/10 via-indigo-500/5 to-transparent border-b border-sky-100 dark:border-sky-900/40">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-3.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 text-xs font-bold tracking-wide uppercase">
              <Compass className="w-3.5 h-3.5" />
              Lộ trình Đọc hiểu Tương tác (A2 - B1)
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
              Reading Challenge 1
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Hành trình rèn luyện 20 bài đọc hiểu đa lĩnh vực. Tích hợp đo tốc độ đọc WPM, mở rộng từ vựng, nghe đối thoại và kiểm tra tổng hợp.
            </p>

            {/* KPI Cards Strip */}
            <div className="w-full pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-card border shadow-xs text-left">
                <span className="text-[11px] font-semibold text-muted-foreground block">Hoàn thành:</span>
                <p className="text-xl sm:text-2xl font-black text-foreground mt-0.5">
                  {completedCount} <span className="text-xs font-normal text-muted-foreground">/ 20 Unit</span>
                </p>
                <div className="mt-1">
                  <Progress value={overallPercent} className="h-1.5 w-full bg-muted" />
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-card border shadow-xs text-left">
                <span className="text-[11px] font-semibold text-muted-foreground block">Tiến độ tổng thể:</span>
                <p className="text-xl sm:text-2xl font-black text-sky-600 mt-0.5">
                  {overallPercent}%
                </p>
                <span className="text-[10px] text-muted-foreground mt-1 block">
                  Đã bắt đầu: {startedCount} Unit
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-card border shadow-xs text-left">
                <span className="text-[11px] font-semibold text-muted-foreground block">Tốc độ đọc WPM:</span>
                <p className="text-xl sm:text-2xl font-black text-emerald-600 mt-0.5">
                  {averageWpm ? `${averageWpm}` : '--'} <span className="text-xs font-normal text-muted-foreground">từ/phút</span>
                </p>
                <span className="text-[10px] text-muted-foreground mt-1 block">
                  Trung bình các bài đã đọc
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-card border shadow-xs text-left">
                <span className="text-[11px] font-semibold text-muted-foreground block">Cấu trúc mỗi bài:</span>
                <p className="text-xl sm:text-2xl font-black text-indigo-600 mt-0.5">
                  4 <span className="text-xs font-normal text-muted-foreground">Chặng học</span>
                </p>
                <span className="text-[10px] text-muted-foreground mt-1 block">
                  10 bước khép kín
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-6xl mx-auto px-4 mt-6 space-y-6">
        {/* Continue Learning Banner */}
        {continueUnit && (
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-lg shadow-sky-600/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in">
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider">
                  {continueUnit.hasStarted && !continueUnit.isCompleted ? 'Học tiếp bài đang dở' : 'Bắt đầu bài tiếp theo'}
                </span>
                <span className="text-xs text-white/80">•</span>
                <span className="text-xs font-semibold text-white/90">Unit {continueUnit.unitNumber}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                {continueUnit.title}
              </h2>
              <p className="text-xs sm:text-sm text-white/85">
                {continueUnit.hasStarted && !continueUnit.isCompleted
                  ? `Bạn đang ở Bước ${continueUnit.currentStepIndex + 1}/10 (Tiến độ ${continueUnit.progressPercent}%). Nhấn tiếp tục để học ngay!`
                  : `Chủ đề: ${continueUnit.category} • Bài đọc chuẩn 10 bước với audio giọng đọc bản xứ.`}
              </p>
            </div>

            <Link to={`/reading-challenge/${continueUnit.unitNumber}`} className="shrink-0 w-full sm:w-auto">
              <Button className="w-full sm:w-auto rounded-2xl bg-white hover:bg-slate-100 text-sky-700 font-bold px-6 py-5 shadow-sm text-sm transition-transform active:scale-95">
                <Play className="w-4 h-4 mr-2 fill-sky-700" />
                {continueUnit.hasStarted && !continueUnit.isCompleted ? 'Tiếp tục học ngay' : `Bắt đầu Unit ${continueUnit.unitNumber}`}
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        )}

        {/* Guest Auth Reminder Banner (if not logged in) */}
        {!isAuthenticated && (
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs sm:text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <HardDrive className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Chế độ Khách (Guest):</strong> Tiến độ và đáp án đang được lưu an toàn trên trình duyệt này. Hãy <strong>Đăng nhập</strong> để đồng bộ đa thiết bị và lưu vĩnh viễn vào hồ sơ học viên.
              </span>
            </div>
            <Link to="/auth/login" className="shrink-0 self-end sm:self-auto">
              <Button size="sm" variant="outline" className="rounded-xl text-xs h-8 font-bold border-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900">
                <LogIn className="w-3.5 h-3.5 mr-1.5" />
                Đăng nhập tài khoản
              </Button>
            </Link>
          </div>
        )}

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 bg-card border rounded-2xl shadow-2xs">
          {/* Search box */}
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm bài học theo tên, chủ đề, số Unit..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-muted/50 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Phase Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 text-xs">
            <button
              type="button"
              onClick={() => setSelectedPhase('all')}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                selectedPhase === 'all'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              Tất cả (20)
            </button>
            <button
              type="button"
              onClick={() => setSelectedPhase('1')}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                selectedPhase === '1'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              Chặng 1 (1-5)
            </button>
            <button
              type="button"
              onClick={() => setSelectedPhase('2')}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                selectedPhase === '2'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              Chặng 2 (6-10)
            </button>
            <button
              type="button"
              onClick={() => setSelectedPhase('3')}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                selectedPhase === '3'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              Chặng 3 (11-15)
            </button>
            <button
              type="button"
              onClick={() => setSelectedPhase('4')}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                selectedPhase === '4'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              Chặng 4 (16-20)
            </button>
          </div>
        </div>

        {/* 20 Unit Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredUnits.map((u) => {
            const isAvailable = !u.isLocked;
            const imageUrl = `/images/reading-challenge/unit-${String(u.unitNumber).padStart(2, '0')}.png`;

            const badgeColors = [
              'bg-amber-500 text-white',
              'bg-blue-600 text-white',
              'bg-purple-600 text-white',
              'bg-sky-600 text-white',
              'bg-emerald-600 text-white',
              'bg-rose-500 text-white',
              'bg-indigo-600 text-white',
              'bg-teal-600 text-white',
            ];
            const badgeColorClass = badgeColors[(u.unitNumber - 1) % badgeColors.length];

            return (
              <Card
                key={u.unitNumber}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col ${
                  isAvailable
                    ? 'hover:border-sky-400 hover:shadow-lg bg-card group'
                    : 'opacity-65 bg-muted/30 border-dashed cursor-not-allowed'
                }`}
              >
                {/* Thumbnail Header */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={imageUrl}
                    alt={u.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as any).style.display = 'none';
                    }}
                  />

                  {/* Gradient shadow overlay for badge readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

                  {/* Top-left Category Pill */}
                  <div className="absolute top-2.5 left-2.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-black/50 backdrop-blur-md text-white text-[11px] font-medium shadow-sm">
                    <BookOpen className="w-3 h-3 text-sky-400" />
                    <span className="truncate max-w-[130px]">{u.category}</span>
                  </div>

                  {/* Top-right Status Pill */}
                  <div className="absolute top-2.5 right-2.5">
                    {u.isCompleted ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white backdrop-blur-md shadow-sm">
                        <CheckCircle2 className="w-3 h-3 text-white" />
                        Đã xong 10/10
                      </span>
                    ) : u.hasStarted ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500 text-white backdrop-blur-md shadow-sm">
                        Đang học ({u.completedStepsCount}/10)
                      </span>
                    ) : isAvailable ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sky-600 text-white backdrop-blur-md shadow-sm">
                        Sẵn sàng
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-black/60 text-slate-300 backdrop-blur-md">
                        <Lock className="w-2.5 h-2.5" />
                        Khóa
                      </span>
                    )}
                  </div>

                  {/* Bottom-left Unit Badge */}
                  <div className={`absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold shadow-md tracking-wide ${badgeColorClass}`}>
                    Unit {u.unitNumber}
                  </div>
                </div>

                {/* Card Body */}
                <CardContent className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <h3
                      className="font-bold text-sm sm:text-base text-foreground group-hover:text-sky-600 transition-colors line-clamp-1 mb-1"
                      title={u.title}
                    >
                      {u.title}
                    </h3>
                    
                    <div className="space-y-2 mt-2 mb-3">
                      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                        <span>Tiến độ bài học:</span>
                        <span className="font-bold text-foreground">{u.progressPercent}%</span>
                      </div>
                      <Progress value={u.progressPercent} className="h-1.5 w-full bg-muted" />

                      {u.readingWpm && (
                        <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                          <Timer className="w-3 h-3" />
                          Tốc độ đọc: {u.readingWpm} từ/phút
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border/50">
                    {isAvailable ? (
                      <Link to={`/reading-challenge/${u.unitNumber}`} className="block">
                        <Button
                          className={`w-full rounded-xl text-xs font-bold h-9 shadow-sm transition-transform active:scale-95 ${
                            u.isCompleted
                              ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                              : u.hasStarted
                              ? 'bg-sky-600 hover:bg-sky-500 text-white'
                              : 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900'
                          }`}
                        >
                          {u.isCompleted ? (
                            <>
                              <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                              Ôn lại Unit {u.unitNumber}
                            </>
                          ) : u.hasStarted ? (
                            <>
                              Học tiếp Bước {u.currentStepIndex + 1}
                              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                            </>
                          ) : (
                            <>
                              Bắt đầu Unit {u.unitNumber}
                              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                            </>
                          )}
                        </Button>
                      </Link>
                    ) : (
                      <Button disabled variant="outline" className="w-full rounded-xl text-xs h-9">
                        Sắp ra mắt
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
};
