import React, { useState } from 'react';
import { UnitConfig, GlossaryItem } from '../../types';
import { useSmartNotebook } from '../../hooks/useSmartNotebook';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  BookOpen,
  X,
  BookMarked,
  Plus,
  Check,
  Maximize2,
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';

interface SidePassageDrawerProps {
  unit: UnitConfig;
}

export const SidePassageDrawer: React.FC<SidePassageDrawerProps> = ({ unit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const { isWordSaved, saveWord, removeWord } = useSmartNotebook();

  // Sort glossary by phrase length descending to match multi-word phrases first
  const sortedGlossary = [...unit.glossary].sort((a, b) => b.word.length - a.word.length);

  // Render passage line with clickable glossary popovers and save-to-notebook capability
  const renderLineWithGlossary = (text: string) => {
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
        const saved = isWordSaved(item.word, unit.unitNumber);

        elements.push(
          <Popover key={`side-pop-${matchIndex}-${matchedWord}`}>
            <PopoverTrigger asChild>
              <button
                type="button"
                onClick={() => setSelectedWord(item.word)}
                className="inline-flex items-center text-sky-700 dark:text-sky-300 font-semibold underline decoration-dotted decoration-sky-400 underline-offset-4 hover:bg-sky-100 dark:hover:bg-sky-950/60 rounded px-1 transition-colors cursor-pointer group"
                title={`Click for definition: ${item.word}`}
              >
                <span>{matchedWord}</span>
                <span className="text-[10px] text-sky-500 font-mono ml-0.5 opacity-70 group-hover:opacity-100">ℹ️</span>
              </button>
            </PopoverTrigger>
            <PopoverContent
              side="left"
              align="center"
              sideOffset={10}
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

                <div className="pt-2 border-t flex justify-end">
                  {saved ? (
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => removeWord(item.word)}
                      className="h-7 text-xs rounded-xl text-emerald-600 border-emerald-300 bg-emerald-50 dark:bg-emerald-950/40"
                    >
                      <Check className="w-3.5 h-3.5 mr-1" />
                      Đã lưu vào sổ từ
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
                      Lưu vào sổ từ
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
    <>
      {/* Floating trigger button positioned on the right edge */}
      <div className="fixed right-4 bottom-20 z-40">
        <Button
          type="button"
          onClick={() => setIsOpen(true)}
          className="rounded-full bg-sky-600 hover:bg-sky-500 text-white font-bold shadow-xl shadow-sky-600/30 flex items-center gap-2 px-4 py-6 border-2 border-white/20 transition-all hover:scale-105 active:scale-95"
          title="Mở bài đọc để đối chiếu thông tin (Slide-over)"
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-xs sm:text-sm">📖 Xem lại bài đọc</span>
        </Button>
      </div>

      {/* Slide-over backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 transition-opacity animate-in fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-over panel */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[540px] md:w-[620px] bg-card border-l shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b flex items-center justify-between bg-muted/30">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600">
                Đối chiếu bài đọc • Unit {unit.unitNumber}
              </span>
              <h3 className="text-base font-bold text-foreground truncate max-w-[320px] sm:max-w-md">
                {unit.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="rounded-xl h-9 w-9 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Informative notification strip */}
        <div className="px-5 py-2.5 bg-sky-50/70 dark:bg-sky-950/40 border-b border-sky-100 dark:border-sky-900/50 flex items-center justify-between text-xs text-sky-800 dark:text-sky-200">
          <div className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-sky-600 shrink-0" />
            <span>Click vào từ có gạch chân để xem định nghĩa hoặc lưu vào sổ từ.</span>
          </div>
          <span className="font-mono font-bold text-[11px]">{unit.wordCount} words</span>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 select-text">
          {/* Passage lines with line numbers */}
          <div className="space-y-2 font-serif text-base sm:text-lg leading-loose text-foreground/90">
            {unit.passageNumberedLines.map((line, idx) => (
              <div key={idx} className="flex items-start gap-3 group">
                <span className="w-7 shrink-0 text-right font-mono text-xs font-bold text-muted-foreground/60 select-none pt-1">
                  {line.lineNumber ? line.lineNumber : ''}
                </span>
                <p className="flex-1 leading-relaxed">
                  {renderLineWithGlossary(line.text)}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Glossary section inside drawer */}
          <div className="mt-8 pt-6 border-t space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <BookMarked className="w-3.5 h-3.5 text-sky-600" />
                Textbook Footnote Glossary:
              </span>
              <span className="text-[11px] text-muted-foreground">
                {unit.glossary.length} terms
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {unit.glossary.map((item, idx) => {
                const saved = isWordSaved(item.word, unit.unitNumber);
                return (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-muted/30 border border-border/70 flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground uppercase tracking-wide">
                          {item.word}
                        </span>
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 dark:bg-sky-900/60 dark:text-sky-300">
                          L.{item.line}
                        </span>
                        <span className="text-sky-600 dark:text-sky-400 font-medium">
                          {item.vietnameseMeaning}
                        </span>
                      </div>
                      <p className="text-muted-foreground italic font-serif">
                        {item.definition}
                      </p>
                    </div>

                    <Button
                      type="button"
                      size="sm"
                      variant={saved ? 'outline' : 'ghost'}
                      onClick={() => {
                        if (saved) {
                          removeWord(item.word);
                        } else {
                          saveWord({
                            word: item.word,
                            definition: item.definition,
                            vietnameseMeaning: item.vietnameseMeaning,
                            unitNumber: unit.unitNumber,
                            unitTitle: unit.title,
                          });
                        }
                      }}
                      className={`h-7 px-2 text-[11px] rounded-lg shrink-0 ${
                        saved
                          ? 'text-emerald-600 border-emerald-300 bg-emerald-50 dark:bg-emerald-950/40'
                          : 'text-sky-600 hover:text-sky-700 hover:bg-sky-50'
                      }`}
                    >
                      {saved ? (
                        <>
                          <Check className="w-3 h-3 mr-1" />
                          Đã lưu
                        </>
                      ) : (
                        <>
                          <Plus className="w-3 h-3 mr-1" />
                          Lưu sổ từ
                        </>
                      )}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t bg-muted/20 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Bấm nút ngoài hoặc "Đóng" để tiếp tục làm bài
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="rounded-xl text-xs h-8"
          >
            Đóng bảng đọc
          </Button>
        </div>
      </aside>
    </>
  );
};
