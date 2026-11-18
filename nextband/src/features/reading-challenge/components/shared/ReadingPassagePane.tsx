import React, { useState } from 'react';
import { UnitConfig, GlossaryItem } from '../../types';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { BookOpen, BookMarked, AlignLeft, ListOrdered } from 'lucide-react';

interface ReadingPassagePaneProps {
  unit: UnitConfig;
  className?: string;
}

export const ReadingPassagePane: React.FC<ReadingPassagePaneProps> = ({ unit, className = '' }) => {
  const [layoutMode, setLayoutMode] = useState<'paragraphs' | 'numbered'>('paragraphs');
  const sortedGlossary = [...unit.glossary].sort((a, b) => b.word.length - a.word.length);

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
          <Popover key={`pane-pop-${matchIndex}-${matchedWord}`}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center text-sky-700 dark:text-sky-300 font-semibold underline decoration-dotted decoration-sky-400 underline-offset-4 hover:bg-sky-100 dark:hover:bg-sky-950/60 rounded px-1 transition-colors cursor-pointer group"
                title={`Tra nghĩa: ${item.word}`}
              >
                <span>{matchedWord}</span>
                <span className="text-[10px] text-sky-500 font-mono ml-0.5 opacity-70 group-hover:opacity-100">ℹ️</span>
              </button>
            </PopoverTrigger>
            <PopoverContent
              side="top"
              align="center"
              sideOffset={8}
              className="w-72 p-3.5 rounded-2xl shadow-xl border-sky-200 dark:border-sky-800 bg-card text-card-foreground z-50 text-xs animate-in fade-in"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b pb-1.5">
                  <span className="font-extrabold text-foreground uppercase tracking-wide">
                    {item.word}
                  </span>
                  <span className="text-sky-600 font-medium">
                    {item.vietnameseMeaning}
                  </span>
                </div>
                <p className="text-muted-foreground italic font-serif leading-normal">
                  {item.definition}
                </p>
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
    <div className={`bg-card border rounded-3xl p-5 shadow-xs flex flex-col h-full max-h-[82vh] overflow-hidden ${className}`}>
      {/* Pane Header */}
      <div className="border-b pb-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-sky-600" />
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300">
            Bài đọc đối chiếu
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-muted/60 p-0.5 rounded-lg text-[11px]">
            <button
              type="button"
              onClick={() => setLayoutMode('paragraphs')}
              className={`px-2 py-0.5 rounded transition-all ${
                layoutMode === 'paragraphs' ? 'bg-background shadow-xs font-bold text-sky-600' : 'text-muted-foreground'
              }`}
              title="Đoạn văn"
            >
              <AlignLeft className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={() => setLayoutMode('numbered')}
              className={`px-2 py-0.5 rounded transition-all ${
                layoutMode === 'numbered' ? 'bg-background shadow-xs font-bold text-sky-600' : 'text-muted-foreground'
              }`}
              title="Số dòng"
            >
              <ListOrdered className="w-3 h-3" />
            </button>
          </div>
          <span className="text-[11px] font-mono text-muted-foreground">{unit.wordCount}w</span>
        </div>
      </div>

      <div className="pt-2 pb-1 shrink-0">
        <h4 className="font-extrabold text-sm text-foreground">{unit.title}</h4>
      </div>

      {/* Pane Content */}
      <div className="flex-1 overflow-y-auto pr-1.5 space-y-3.5 text-sm sm:text-base font-serif leading-relaxed text-foreground/90 select-text">
        {layoutMode === 'paragraphs' && unit.passageParagraphs && unit.passageParagraphs.length > 0 ? (
          unit.passageParagraphs.map((para, idx) => (
            <p key={idx} className="indent-4 leading-relaxed">
              {renderTextWithGlossary(para)}
            </p>
          ))
        ) : (
          <div className="space-y-1.5 text-sm">
            {unit.passageNumberedLines.map((line, idx) => (
              <div key={idx} className="flex items-start gap-2 group">
                <span className="w-6 shrink-0 text-right font-mono text-[11px] font-bold text-muted-foreground/60 select-none pt-0.5">
                  {line.lineNumber ? line.lineNumber : ''}
                </span>
                <p className="flex-1 leading-normal">
                  {renderTextWithGlossary(line.text)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pt-2 border-t text-[11px] text-muted-foreground flex items-center justify-between shrink-0">
        <span>💡 Chạm vào từ gạch chân để tra nghĩa</span>
        <span className="font-semibold text-sky-600">{unit.glossary.length} từ vựng</span>
      </div>
    </div>
  );
};
