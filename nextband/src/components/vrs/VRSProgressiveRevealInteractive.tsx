import React, { useState } from 'react';
import { VRSRevealInteraction } from '@/types/vrs';
import VRSLexicalFlipCard from './VRSLexicalFlipCard';

interface Props {
  model: VRSRevealInteraction;
}

export default function VRSProgressiveRevealInteractive({ model }: Props) {
  const [openedSteps, setOpenedSteps] = useState<number[]>([1]);
  const [selectedBranches, setSelectedBranches] = useState<Record<number, string>>({});

  const toggleStep = (step: number) => {
    if (!openedSteps.includes(step)) {
      setOpenedSteps([...openedSteps, step]);
    }
  };

  const chooseBranch = (step: number, branchName: string) => {
    setSelectedBranches({
      ...selectedBranches,
      [step]: branchName,
    });
  };

  const allRevealed = model.cards.every((c) => openedSteps.includes(c.step));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2.5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
        <p className="text-sm font-semibold text-slate-800">
          {model.prompt}
        </p>
      </div>

      {/* Cards Progressive Stack */}
      <div className="space-y-4">
        {model.cards.map((card) => {
          const isOpen = openedSteps.includes(card.step);
          const isNextToOpen = !isOpen && openedSteps.includes(card.step - 1);

          const activeBranch = card.branchOptions?.find(
            (bo) => bo.branchName === selectedBranches[card.step]
          );
          const cardContent = activeBranch ? activeBranch.content : card.content;

          return (
            <div
              key={card.step}
              className={'rounded-xl border-2 transition-all duration-300 overflow-hidden ' +
                (isOpen
                  ? 'bg-card border-primary/40 shadow-sm'
                  : isNextToOpen
                  ? 'bg-muted/20 border-dashed border-primary/50 cursor-pointer'
                  : 'bg-muted/10 border-border/40 cursor-not-allowed opacity-60')}
              onClick={() => {
                isNextToOpen && toggleStep(card.step);
              }}
            >
              {/* Card Header */}
              <div className="p-4 flex items-center justify-between border-b bg-muted/20">
                <div className="flex items-center gap-3">
                  <span className={'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ' + (isOpen ? 'bg-primary text-primary-foreground' : 'bg-muted/60')}>
                    {card.step}
                  </span>
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-primary">
                    {card.label}
                  </span>
                  {card.bandLevel && (
                    <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                      {card.bandLevel}
                    </span>
                  )}
                </div>
                <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                  {card.cognitiveFunction}
                </span>
              </div>

              {/* Card Body */}
              {isOpen ? (
                <div className="p-5 space-y-4">
                  <div className="p-4 sm:p-5 rounded-xl bg-background border shadow-xs">
                    <p className="text-base sm:text-lg font-semibold leading-relaxed text-foreground">
                      "{cardContent}"
                    </p>
                  </div>

                  {/* 3D Flip-Card Lexical Upgrade Tool */}
                  {card.flipCard && (
                    <VRSLexicalFlipCard flipCard={card.flipCard} bandLevel={card.bandLevel} />
                  )}

                  {/* Vowel Pronunciation Highlights (Bám sát phần 1 Pronunciation của Coursebook) */}
                  {card.vowelHighlight && card.vowelHighlight.length > 0 && (
                    <div className="p-3.5 sm:p-4 rounded-xl bg-primary/5 border border-primary/20">
                      <p className="text-xs sm:text-sm font-bold uppercase text-primary mb-2.5 flex items-center gap-1.5">
                        🎙️ Điểm Huyệt Phát Âm Nguyên Âm (Coursebook Focus):
                      </p>
                      <div className="flex flex-wrap gap-2.5">
                        {card.vowelHighlight.map((vh, i) => (
                          <div key={i} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background border text-xs sm:text-sm shadow-2xs">
                            <span className="font-bold text-foreground text-sm">{vh.word}</span>
                            <span className="text-xs text-muted-foreground font-mono">{vh.phonetic}</span>
                            <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-mono text-xs font-bold">
                              {vh.vowelSound}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Branch Options */}
                  {card.branchOptions && (
                    <div className="p-3.5 sm:p-4 rounded-xl bg-muted/30 border">
                      <p className="text-xs sm:text-sm font-bold uppercase text-muted-foreground mb-2.5">
                        💡 Rẽ Nhánh Lập Luận (Branching Stance):
                      </p>
                      <div className="flex flex-wrap items-center gap-2.5">
                        {card.branchOptions.map((bo) => {
                          const isActive = selectedBranches[card.step] === bo.branchName || (!selectedBranches[card.step] && bo.branchName === 'CONTRAST');
                          return (
                            <button
                              key={bo.branchName}
                              onClick={() => chooseBranch(card.step, bo.branchName)}
                              className={'text-xs sm:text-sm px-4 py-2 rounded-xl font-semibold transition-all cursor-pointer ' + (isActive ? 'bg-primary text-primary-foreground shadow-xs' : 'bg-muted hover:bg-muted/80 text-muted-foreground')}
                            >
                              {bo.branchName}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <p className="text-xs sm:text-sm text-muted-foreground bg-muted/10 p-3.5 rounded-xl border border-dashed leading-relaxed">
                    📌 <span className="font-semibold text-foreground">Chiến lược sư phạm:</span> {card.pedagogyNote}
                  </p>
                </div>
              ) : (
                <div className="p-4 sm:p-5 flex items-center justify-center text-muted-foreground">
                  {isNextToOpen ? (
                    <span className="text-sm font-semibold text-primary animate-pulse">
                      👆 Click mở tầng thẻ tiếp theo ({card.label}) →
                    </span>
                  ) : (
                    <span className="text-xs sm:text-sm flex items-center gap-1.5 text-muted-foreground/60">
                      🔒 Mở tầng trên trước để mở khóa
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Full Mosaic Summary */}
      {allRevealed && (
        <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/40 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-black uppercase px-3 py-1 rounded-lg bg-primary text-primary-foreground tracking-wider">
              ✨ BÀI NÓI HOÀN CHỈNH ĐÃ HỢP NHẤT
            </span>
            <span className="text-xs sm:text-sm font-semibold text-primary">Mục tiêu đầu ra: Band 4.0 (Tối đa 4.5)</span>
          </div>
          <p className="text-base sm:text-lg font-semibold leading-relaxed text-foreground">
            "{model.fullMosaicSummary}"
          </p>
          <div className="pt-2 flex items-center justify-between text-xs sm:text-sm text-muted-foreground border-t border-primary/20">
            <span>💡 Áp dụng nhịp điệu ngắt nghỉ và luyến âm tự nhiên giữa các tầng câu.</span>
          </div>
        </div>
      )}
    </div>
  );
}
