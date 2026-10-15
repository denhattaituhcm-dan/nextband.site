import React, { useState, useEffect } from 'react';
import { UnitConfig, GlossaryItem } from '../../types';
import { ModernAudioBar } from '../shared/ModernAudioBar';
import { useSmartNotebook } from '../../hooks/useSmartNotebook';
import { useTextHighlight } from '@/hooks/useTextHighlight';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Play, 
  CheckCircle2, 
  Timer, 
  Highlighter, 
  ChevronRight, 
  BookOpen, 
  Trash2,
  BookMarked,
  Plus,
  Check,
  Sun,
  Coffee,
  Moon,
  BookmarkCheck,
  Eye
} from 'lucide-react';

interface ReadingPassageStepProps {
  unit: UnitConfig;
  onComplete: (wpm?: number, readingSeconds?: number) => void;
}

type ComfortTheme = 'clean' | 'warm' | 'dark';
type ComfortFontSize = 'normal' | 'large' | 'xlarge';

export const ReadingPassageStep: React.FC<ReadingPassageStepProps> = ({ unit, onComplete }) => {
  const { highlights, addHighlight, removeHighlight } = useTextHighlight(`rc1_unit_${unit.unitNumber}`);
  const [highlightColor, setHighlightColor] = useState<'yellow' | 'green'>('yellow');
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  // Smart Notebook Integration
  const { isWordSaved, saveWord, removeWord } = useSmartNotebook();

  // Reading Comfort States
  const [theme, setTheme] = useState<ComfortTheme>('clean');
  const [fontSize, setFontSize] = useState<ComfortFontSize>('normal');

  // WPM Timer State
  const [isReadingTimerActive, setIsReadingTimerActive] = useState(false);
  const [readingSeconds, setReadingSeconds] = useState(0);
  const [hasFinishedReading, setHasFinishedReading] = useState(false);
  const [calculatedWpm, setCalculatedWpm] = useState<number | null>(null);

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

  // Text Selection Highlight & Instant Save
  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    const selectedText = selection.toString().trim();
    if (selectedText.length < 2) return;

    addHighlight({
      startIndex: 0,
      endIndex: selectedText.length,
      color: highlightColor,
      highlightText: selectedText,
      passageId: `unit_${unit.unitNumber}`,
    });

    selection.removeAllRanges();
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

  // Render a passage line with inline floating popovers for each glossary term
  const renderLineWithGlossary = (text: string) => {
    if (!sortedGlossary.length) return text;

    // Build regex alternation for all glossary items in this unit
    const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`\\b(${sortedGlossary.map((g) => escapeRegExp(g.word)).join('|')})\\b`, 'gi');

    const elements: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = pattern.exec(text)) !== null) {
      const matchIndex = match.index;
      const matchedWord = match[0];

      // Push preceding text
      if (matchIndex > lastIndex) {
        elements.push(text.substring(lastIndex, matchIndex));
      }

      // Find matching glossary item
      const item = sortedGlossary.find(
        (g) => g.word.toLowerCase() === matchedWord.toLowerCase()
      );

      if (item) {
        const saved = isWordSaved(item.word, unit.unitNumber);

        elements.push(
          <Popover key={`pop-${matchIndex}-${matchedWord}`}>
            <PopoverTrigger asChild>
              <button
                type="button"
                onClick={() => setSelectedWord(item.word)}
                className="inline-flex items-center text-sky-700 dark:text-sky-300 font-semibold underline decoration-dotted decoration-sky-400 underline-offset-4 hover:bg-sky-100 dark:hover:bg-sky-950/60 rounded px-1 transition-colors cursor-pointer group"
                title={`Click for definition & save: ${item.word}`}
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
                    <span className="font-semibold text-muted-foreground mr-1">Definition:</span>
                    <span className="italic font-medium">{item.definition}</span>
                  </p>
                </div>

                {/* Instant Save to Personal Smart Notebook */}
                <div className="pt-2 border-t flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground">Smart Notebook</span>
                  {saved ? (
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => removeWord(item.word)}
                      className="h-7 text-xs rounded-xl text-emerald-600 border-emerald-300 bg-emerald-50 dark:bg-emerald-950/40"
                    >
                      <Check className="w-3.5 h-3.5 mr-1" />
                      Đã lưu sổ từ
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      size="sm"
                      onClick={() =>
                        saveWord({
                          word: item.word,
                          definition: item.definition,
                          vietnameseMeaning: item.vietnameseMeaning,
                          contextSentence: text,
                          unitNumber: unit.unitNumber,
                          unitTitle: unit.title,
                        })
                      }
                      className="h-7 text-xs rounded-xl bg-sky-600 hover:bg-sky-500 text-white"
                    >
                      <Plus className="w-3.5 h-3.5 mr-1" />
                      ➕ Lưu vào sổ từ
                    </Button>
                  )}
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
      {/* Audio Narration Bar */}
      <ModernAudioBar audioUrl={unit.audioReadingUrl} title={`Reading Track 1: ${unit.title}`} />

      {/* Reading Time & WPM Timer Widget */}
      <div className="bg-gradient-to-r from-sky-50 to-emerald-50/70 dark:from-slate-900 dark:to-emerald-950/30 border border-sky-200/80 dark:border-sky-800/60 rounded-3xl p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold">
            <Timer className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-foreground">Reading Speed & WPM Timer</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 font-semibold">
                {unit.wordCount} words
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {isReadingTimerActive
                ? `Timer running: ${formatTimer(readingSeconds)}... Read at your natural pace!`
                : hasFinishedReading && calculatedWpm
                ? `Reading Time: ${formatTimer(readingSeconds)} • Speed: ${calculatedWpm} Words Per Minute!`
                : 'Click "Start Reading" to measure your reading speed automatically.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isReadingTimerActive && !hasFinishedReading && (
            <Button
              type="button"
              onClick={handleStartTimer}
              className="rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs px-4 h-9 shadow-sm"
            >
              <Play className="w-3.5 h-3.5 mr-1.5 fill-white" />
              Start Reading
            </Button>
          )}

          {isReadingTimerActive && (
            <Button
              type="button"
              onClick={handleDoneReading}
              className="rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-4 h-9 shadow-sm animate-pulse"
            >
              <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
              Done Reading
            </Button>
          )}

          {hasFinishedReading && (
            <Button
              type="button"
              variant="outline"
              onClick={handleStartTimer}
              className="rounded-2xl text-xs h-9"
            >
              Re-time Reading
            </Button>
          )}
        </div>
      </div>

      {/* Reading Comfort & Ergonomics Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3.5 bg-card border rounded-2xl shadow-2xs">
        {/* Left: Text Size & Theme controls */}
        <div className="flex items-center gap-4">
          {/* Font Size Selector */}
          <div className="flex items-center gap-1.5 bg-muted/60 p-1 rounded-xl text-xs font-bold">
            <span className="text-[11px] text-muted-foreground px-1.5 select-none">Size:</span>
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
            <span className="text-[11px] text-muted-foreground px-1.5 select-none font-bold">Paper:</span>
            <button
              type="button"
              onClick={() => setTheme('clean')}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-all ${
                theme === 'clean' ? 'bg-background shadow-xs font-bold text-foreground' : 'text-muted-foreground'
              }`}
              title="Clean White Paper"
            >
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline">Clean</span>
            </button>
            <button
              type="button"
              onClick={() => setTheme('warm')}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-all ${
                theme === 'warm' ? 'bg-[#ede4d8] text-[#2c261e] shadow-xs font-bold' : 'text-muted-foreground'
              }`}
              title="Warm Sepia Eye-Care Paper"
            >
              <Coffee className="w-3.5 h-3.5 text-amber-700" />
              <span className="hidden sm:inline">Sepia</span>
            </button>
            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-all ${
                theme === 'dark' ? 'bg-slate-800 text-white shadow-xs font-bold' : 'text-muted-foreground'
              }`}
              title="Focus Dark Paper"
            >
              <Moon className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden sm:inline">Dark</span>
            </button>
          </div>
        </div>

        {/* Right: Highlighter & Tip */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
            <Highlighter className="w-4 h-4 text-sky-600" />
            <button
              type="button"
              onClick={() => setHighlightColor('yellow')}
              className={`w-5 h-5 rounded-full bg-amber-300 transition-transform ${
                highlightColor === 'yellow' ? 'ring-2 ring-amber-500 scale-110' : 'opacity-70'
              }`}
              title="Yellow Marker"
            />
            <button
              type="button"
              onClick={() => setHighlightColor('green')}
              className={`w-5 h-5 rounded-full bg-emerald-400 transition-transform ${
                highlightColor === 'green' ? 'ring-2 ring-emerald-600 scale-110' : 'opacity-70'
              }`}
              title="Green Marker"
            />
          </div>

          <span className="text-[11px] text-sky-600 dark:text-sky-400 font-medium hidden md:inline">
            💡 Nhấp vào từ vựng để tra nghĩa hoặc lưu nhanh vào Sổ từ
          </span>
        </div>
      </div>

      {/* Main Two-Column Reading Area: Passage on Left (65-75 chars optimal width), Sticky Glossary on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (Passage restricted to ergonomic reading width) */}
        <article
          onMouseUp={handleMouseUp}
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

          {/* Line-by-line format restricted to ergonomic reading width (65-75 chars per line) */}
          <div className={`space-y-2 font-serif max-w-2xl mx-auto ${getFontSizeClass()}`}>
            {unit.passageNumberedLines.map((line, idx) => (
              <div key={idx} className="flex items-start gap-3 sm:gap-4 group">
                <span className="w-7 sm:w-8 shrink-0 text-right font-mono text-xs font-bold opacity-50 select-none pt-1">
                  {line.lineNumber ? line.lineNumber : ''}
                </span>
                <p className="flex-1">
                  {renderLineWithGlossary(line.text)}
                </p>
              </div>
            ))}
          </div>
        </article>

        {/* Right Column (Sticky Side Glossary Panel) */}
        <aside className="lg:col-span-4 space-y-4 lg:sticky lg:top-20">
          <div className="bg-card border border-border/80 rounded-3xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <BookMarked className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <h3 className="font-bold text-sm text-foreground">Textbook Glossary</h3>
              </div>
              <span className="text-[11px] font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                {unit.glossary.length} key terms
              </span>
            </div>

            <p className="text-xs text-muted-foreground">
              Nhấp vào từ để tra nhanh hoặc bấm biểu tượng ➕ để lưu vào Sổ từ vựng cá nhân:
            </p>

            <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
              {unit.glossary.map((item, idx) => {
                const isSelected = selectedWord?.toLowerCase() === item.word.toLowerCase();
                const saved = isWordSaved(item.word, unit.unitNumber);

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

                    <div className="mt-2 pt-2 border-t border-border/40 flex justify-end">
                      {saved ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeWord(item.word);
                          }}
                          className="inline-flex items-center text-[10px] text-emerald-600 font-semibold hover:text-emerald-700"
                        >
                          <Check className="w-3 h-3 mr-1" />
                          Đã lưu sổ từ
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            saveWord({
                              word: item.word,
                              definition: item.definition,
                              vietnameseMeaning: item.vietnameseMeaning,
                              unitNumber: unit.unitNumber,
                              unitTitle: unit.title,
                            });
                          }}
                          className="inline-flex items-center text-[10px] text-sky-600 hover:text-sky-700 font-semibold"
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Lưu vào sổ từ
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>
      </div>

      {/* Highlights Tray */}
      {highlights.length > 0 && (
        <div className="p-4 bg-muted/40 rounded-2xl border space-y-2 text-xs">
          <span className="font-semibold text-muted-foreground">Your Text Highlights ({highlights.length}):</span>
          <div className="flex flex-wrap gap-2">
            {highlights.map((hl) => (
              <span
                key={hl.id}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium border ${
                  hl.color === 'yellow'
                    ? 'bg-amber-100 text-amber-900 border-amber-200'
                    : 'bg-emerald-100 text-emerald-900 border-emerald-200'
                }`}
              >
                "{hl.highlightText}"
                <button
                  type="button"
                  onClick={() => removeHighlight(hl.id)}
                  className="hover:text-red-500"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Footer Navigation */}
      <div className="pt-4 flex justify-end">
        <Button
          type="button"
          onClick={() => onComplete(calculatedWpm || undefined, readingSeconds || undefined)}
          className="rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-semibold px-6 py-5 shadow-lg shadow-sky-600/20"
        >
          <BookOpen className="w-4 h-4 mr-2" />
          Continue to Reading Comprehension
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};
