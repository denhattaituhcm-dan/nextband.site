import React, { useState, useEffect } from 'react';
import { UnitConfig, GlossaryItem } from '../../types';
import { ModernAudioBar } from '../shared/ModernAudioBar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Play, 
  CheckCircle2, 
  Timer, 
  ChevronRight, 
  BookOpen, 
  BookMarked,
  Sun,
  Coffee,
  Moon,
  AlignLeft,
  ListOrdered
} from 'lucide-react';

interface ReadingPassageStepProps {
  unit: UnitConfig;
  savedWpm?: number;
  savedSeconds?: number;
  onComplete: (wpm?: number, readingSeconds?: number) => void;
}

type ComfortTheme = 'clean' | 'warm' | 'dark';
type ComfortFontSize = 'normal' | 'large' | 'xlarge';
type ReadingLayoutMode = 'paragraphs' | 'numbered_lines';

export const ReadingPassageStep: React.FC<ReadingPassageStepProps> = ({
  unit,
  savedWpm,
  savedSeconds,
  onComplete,
}) => {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  // Reading Comfort States
  const [theme, setTheme] = useState<ComfortTheme>('clean');
  const [fontSize, setFontSize] = useState<ComfortFontSize>('normal');
  const [layoutMode, setLayoutMode] = useState<ReadingLayoutMode>('paragraphs');

  // WPM Timer State
  const [isReadingTimerActive, setIsReadingTimerActive] = useState(false);
  const [readingSeconds, setReadingSeconds] = useState<number>(savedSeconds || 0);
  const [hasFinishedReading, setHasFinishedReading] = useState<boolean>(Boolean(savedWpm));
  const [calculatedWpm, setCalculatedWpm] = useState<number | null>(savedWpm || null);

  // Timer tick
  useEffect(() => {
    let interval: any = null;
    if (isReadingTimerActive) {
      interval = setInterval(() => {
        setReadingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isReadingTimerActive]);

  const handleStartTimer = () => {
    setReadingSeconds(0);
    setHasFinishedReading(false);
    setIsReadingTimerActive(true);
  };

  const handleDoneReading = () => {
    setIsReadingTimerActive(false);
    setHasFinishedReading(true);

    const minutes = Math.max(readingSeconds / 60, 0.1);
    const wpm = Math.round(unit.wordCount / minutes);
    setCalculatedWpm(wpm);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  // Sort glossary by phrase length descending to match multi-word phrases first
  const sortedGlossary = [...unit.glossary].sort((a, b) => b.word.length - a.word.length);

  // Dynamic typography classes based on Reading Comfort
  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'large':
        return 'text-lg sm:text-xl leading-relaxed sm:leading-loose';
      case 'xlarge':
        return 'text-xl sm:text-2xl leading-loose sm:leading-[2.5]';
      case 'normal':
      default:
        return 'text-base sm:text-lg leading-loose';
    }
  };

  const getThemeClass = () => {
    switch (theme) {
      case 'warm':
        return 'bg-[#fcf8f2] dark:bg-[#201c18] text-[#2c261e] dark:text-[#ede4d8] border-[#e8ded0] dark:border-[#383028] shadow-md';
      case 'dark':
        return 'bg-slate-900 text-slate-100 border-slate-800 shadow-md';
      case 'clean':
      default:
        return 'bg-card text-foreground border-border/80 shadow-sm';
    }
  };

  // Render a passage line or paragraph with inline floating popovers for each glossary term
  const renderTextWithGlossary = (text: string) => {
    if (!sortedGlossary.length) return text;

    const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`\\b(${sortedGlossary.map((g) => escapeRegExp(g.word)).join('|')})\\b`, 'gi');

    const elements: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = pattern.exec(text)) !== null) {
      const matchIndex = match.index;
      const matchedWord = match[0];

      if (matchIndex > lastIndex) {
        elements.push(text.substring(lastIndex, matchIndex));
      }

      const item = sortedGlossary.find(
        (g) => g.word.toLowerCase() === matchedWord.toLowerCase()
      );

      if (item) {
        elements.push(
          <Popover key={`pop-${matchIndex}-${matchedWord}`}>
            <PopoverTrigger asChild>
              <button
                type="button"
                onClick={() => setSelectedWord(item.word)}
                className="inline-flex items-center text-sky-700 dark:text-sky-300 font-semibold underline decoration-dotted decoration-sky-400 underline-offset-4 hover:bg-sky-100 dark:hover:bg-sky-950/60 rounded px-1 transition-colors cursor-pointer group"
                title={`Tra nghĩa từ vựng: ${item.word}`}
              >
                <span>{matchedWord}</span>
                <span className="text-[10px] text-sky-500 font-mono ml-0.5 opacity-70 group-hover:opacity-100">ℹ️</span>
              </button>
            </PopoverTrigger>
            <PopoverContent
              side="top"
              align="center"
              sideOffset={8}
              className="w-80 p-4 rounded-2xl shadow-xl border-sky-200 dark:border-sky-800 bg-card text-card-foreground z-50 animate-in fade-in zoom-in-95"
            >
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold font-mono px-2 py-0.5 bg-sky-100 text-sky-800 dark:bg-sky-900/60 dark:text-sky-300 rounded-md">
                      Line {item.line}
                    </span>
                    <span className="font-extrabold text-foreground text-sm uppercase tracking-wide">
                      {item.word}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950 px-2 py-0.5 rounded-full border border-sky-200/60 dark:border-sky-800/60">
                    {item.vietnameseMeaning}
                  </span>
                </div>

                <div className="text-foreground/90 leading-relaxed flex items-start gap-2">
                  <BookMarked className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                  <p>
                    <span className="font-semibold text-muted-foreground mr-1">Định nghĩa:</span>
                    <span className="italic font-medium">{item.definition}</span>
                  </p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        );
      } else {
        elements.push(matchedWord);
      }

      lastIndex = pattern.lastIndex;
    }

    if (lastIndex < text.length) {
      elements.push(text.substring(lastIndex));
    }

    return elements;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* 1. Integrated Audio & Reading Speed Bar */}
      <div className="space-y-3">
        <ModernAudioBar audioUrl={unit.audioReadingUrl} title={`Reading Track 1: ${unit.title}`} />

        <div className="bg-gradient-to-r from-sky-50 via-emerald-50/50 to-indigo-50/40 dark:from-slate-900 dark:via-emerald-950/20 dark:to-slate-900 border border-sky-200/80 dark:border-sky-800/60 rounded-3xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold shrink-0">
              <Timer className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-foreground">Đo tốc độ đọc hiểu (Reading WPM)</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 font-semibold">
                  {unit.wordCount} words
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isReadingTimerActive
                  ? `Đang bấm giờ: ${formatTimer(readingSeconds)}... Đọc theo tốc độ tự nhiên của bạn!`
                  : hasFinishedReading && calculatedWpm
                  ? `Thời gian đọc: ${formatTimer(readingSeconds)} • Tốc độ: ${calculatedWpm} từ/phút (WPM)!`
                  : 'Gợi ý: Lượt 1 đọc lướt bấm giờ, Lượt 2 vừa nghe audio vừa tra từ vựng.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {!isReadingTimerActive && !hasFinishedReading && (
              <Button
                type="button"
                onClick={handleStartTimer}
                className="rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs px-4 h-9 shadow-sm"
              >
                <Play className="w-3.5 h-3.5 mr-1.5 fill-white" />
                Bắt đầu đọc (Bấm giờ)
              </Button>
            )}

            {isReadingTimerActive && (
              <Button
                type="button"
                onClick={handleDoneReading}
                className="rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-4 h-9 shadow-sm animate-pulse"
              >
                <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                Đã đọc xong
              </Button>
            )}

            {hasFinishedReading && (
              <Button
                type="button"
                variant="outline"
                onClick={handleStartTimer}
                className="rounded-2xl text-xs h-9"
              >
                Bấm giờ lại
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Reading Controls: Size, Theme, and Layout Mode */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3.5 bg-card border rounded-2xl shadow-2xs">
        <div className="flex flex-wrap items-center gap-3">
          {/* Layout Mode (Paragraphs vs Numbered Lines) */}
          <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setLayoutMode('paragraphs')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${
                layoutMode === 'paragraphs' ? 'bg-background shadow-xs font-bold text-sky-600' : 'text-muted-foreground'
              }`}
              title="Đọc theo đoạn văn trôi chảy (Khuyên dùng)"
            >
              <AlignLeft className="w-3.5 h-3.5" />
              <span>Đoạn văn tự nhiên</span>
            </button>
            <button
              type="button"
              onClick={() => setLayoutMode('numbered_lines')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${
                layoutMode === 'numbered_lines' ? 'bg-background shadow-xs font-bold text-sky-600' : 'text-muted-foreground'
              }`}
              title="Hiện số dòng sách giáo khoa (Line numbers)"
            >
              <ListOrdered className="w-3.5 h-3.5" />
              <span>Số dòng sách</span>
            </button>
          </div>

          {/* Font Size Selector */}
          <div className="flex items-center gap-1.5 bg-muted/60 p-1 rounded-xl text-xs font-bold">
            <span className="text-[11px] text-muted-foreground px-1 select-none">Cỡ chữ:</span>
            <button
              type="button"
              onClick={() => setFontSize('normal')}
              className={`px-2 py-0.5 rounded-lg transition-all ${
                fontSize === 'normal' ? 'bg-background shadow-xs text-sky-600' : 'text-muted-foreground'
              }`}
            >
              A
            </button>
            <button
              type="button"
              onClick={() => setFontSize('large')}
              className={`px-2 py-0.5 rounded-lg text-sm transition-all ${
                fontSize === 'large' ? 'bg-background shadow-xs text-sky-600' : 'text-muted-foreground'
              }`}
            >
              A+
            </button>
            <button
              type="button"
              onClick={() => setFontSize('xlarge')}
              className={`px-2 py-0.5 rounded-lg text-base transition-all ${
                fontSize === 'xlarge' ? 'bg-background shadow-xs text-sky-600' : 'text-muted-foreground'
              }`}
            >
              A++
            </button>
          </div>

          {/* Theme Toggles */}
          <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-xl text-xs">
            <button
              type="button"
              onClick={() => setTheme('clean')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                theme === 'clean' ? 'bg-background shadow-xs font-bold text-foreground' : 'text-muted-foreground'
              }`}
              title="Màu trắng sáng"
            >
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline">Sáng</span>
            </button>
            <button
              type="button"
              onClick={() => setTheme('warm')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                theme === 'warm' ? 'bg-[#ede4d8] text-[#2c261e] shadow-xs font-bold' : 'text-muted-foreground'
              }`}
              title="Màu giấy vàng dịu mắt"
            >
              <Coffee className="w-3.5 h-3.5 text-amber-700" />
              <span className="hidden sm:inline">Dịu mắt</span>
            </button>
            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                theme === 'dark' ? 'bg-slate-800 text-white shadow-xs font-bold' : 'text-muted-foreground'
              }`}
              title="Màu tối tập trung"
            >
              <Moon className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden sm:inline">Tối</span>
            </button>
          </div>
        </div>

        <span className="text-[11px] text-sky-600 dark:text-sky-400 font-medium">
          💡 Chạm vào từ có gạch chân để tra nghĩa tiếng Việt tức thì
        </span>
      </div>

      {/* 3. Main Reading Area: Ergonomic width + Sticky Glossary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (Passage) */}
        <article
          className={`lg:col-span-8 rounded-3xl p-6 sm:p-10 select-text space-y-6 transition-colors duration-300 ${getThemeClass()}`}
        >
          <div className="border-b border-border/50 pb-4 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                Unit {unit.unitNumber} • {unit.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-0.5">
                {unit.title}
              </h2>
            </div>
            <div className="text-right text-xs opacity-75">
              <span className="font-mono font-bold">{unit.wordCount}</span> words
            </div>
          </div>

          {/* Reading Presentation */}
          {layoutMode === 'paragraphs' && unit.passageParagraphs && unit.passageParagraphs.length > 0 ? (
            <div className={`space-y-4 font-serif max-w-2xl mx-auto ${getFontSizeClass()}`}>
              {unit.passageParagraphs.map((para, idx) => (
                <p key={idx} className="indent-6 leading-relaxed">
                  {renderTextWithGlossary(para)}
                </p>
              ))}
            </div>
          ) : (
            <div className={`space-y-2 font-serif max-w-2xl mx-auto ${getFontSizeClass()}`}>
              {unit.passageNumberedLines.map((line, idx) => (
                <div key={idx} className="flex items-start gap-3 sm:gap-4 group">
                  <span className="w-7 sm:w-8 shrink-0 text-right font-mono text-xs font-bold opacity-50 select-none pt-1">
                    {line.lineNumber ? line.lineNumber : ''}
                  </span>
                  <p className="flex-1">
                    {renderTextWithGlossary(line.text)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </article>

        {/* Right Column (Sticky Side Glossary Panel) */}
        <aside className="lg:col-span-4 space-y-4 lg:sticky lg:top-20">
          <div className="bg-card border border-border/80 rounded-3xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <BookMarked className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <h3 className="font-bold text-sm text-foreground">Từ vựng bài đọc (Glossary)</h3>
              </div>
              <span className="text-[11px] font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                {unit.glossary.length} từ trọng tâm
              </span>
            </div>

            <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
              {unit.glossary.map((item, idx) => {
                const isSelected = selectedWord?.toLowerCase() === item.word.toLowerCase();

                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedWord(item.word)}
                    className={`p-3 rounded-2xl border text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-sky-50 dark:bg-sky-950/60 border-sky-300 dark:border-sky-700 shadow-xs'
                        : 'bg-muted/30 hover:bg-muted/70 border-border/60'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 dark:bg-sky-900/60 dark:text-sky-300">
                          L.{item.line}
                        </span>
                        <span className="font-bold text-foreground uppercase tracking-wide">
                          {item.word}
                        </span>
                      </div>
                      <span className="text-[11px] font-medium text-sky-600 dark:text-sky-400">
                        {item.vietnameseMeaning}
                      </span>
                    </div>

                    <p className="text-muted-foreground leading-normal italic font-serif">
                      {item.definition}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>
      </div>

      {/* Footer Navigation */}
      <div className="pt-4 flex justify-end">
        <Button
          type="button"
          onClick={() => onComplete(calculatedWpm || undefined, readingSeconds || undefined)}
          className="rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-semibold px-6 py-5 shadow-lg shadow-sky-600/20"
        >
          <BookOpen className="w-4 h-4 mr-2" />
          Tiếp tục sang Trả lời câu hỏi (Comprehension)
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};
