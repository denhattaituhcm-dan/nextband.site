import React, { useState } from 'react';
import { VRSRevealInteraction } from '@/types/vrs';

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
      <p className="text-sm font-medium text-muted-foreground">
        {model.prompt}
      </p>

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
              <div className="p-4 flex items-center justify-between border-b bg-muted/20">
                <div className="flex items-center gap-3">
                  <span className={'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ' + (isOpen ? 'bg-primary text-primary-foreground' : 'bg-muted/60')}>
                    {card.step}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    {card.label}
                  </span>
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  {card.cognitiveFunction}
                </span>
              </div>

              {/* Card Body */}
              {isOpen ? (
                <div className="p-5">
                  <p className="text-base font-semibold">
                    "{cardContent}"
                  </p>

                  {/* Branch Options */}
                  {card.branchOptions && (
                    <div className="mt-4 p-3 rounded-lg bg-muted/20 border">
                      <p className="text-xs font-bold uppercase text-muted-foreground mb-2">
                        💡 Nhánh Tư Duy Mở Rộng:
                      </p>
                      <div className="flex items-center gap-2">
                        {card.branchOptions.map((bo) => {
                          const isActive = selectedBranches[card.step] === bo.branchName || (!selectedBranches[card.step] && bo.branchName === 'CONTRAST');
                          return (
                            <button
                              key={bo.branchName}
                              onClick={() => chooseBranch(card.step, bo.branchName)}
                              className={'text-xs px-3 py-1 rounded-md font-semibold transition-all ' + (isActive ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80')}
                            >
                              {bo.branchName}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <p className="text-sm text-muted-foreground mt-3 bg-muted/10 p-2.5 rounded-md border border-dashed">
                    💡 <span className="font-semibold">Chú thích sư phạm:</span> {card.pedagogyNote}
                  </p>
                </div>
              ) : (
                <div className="p-4 flex items-center justify-center text-muted-foreground">
                  {isNextToOpen ? (
                    <span className="text-sm font-semibold text-primary">
                      👆 Click mở tầng thẻ tiếp theo →
                    </span>
                  ) : (
                    <span className="text-xs">Khóa 🔒</span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Full Mosaic Summary */}
      {allRevealed && (
        <div className="p-6 rounded-xl bg-primary/10 border-2 border-primary/30">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase px-2.5 py-1 rounded bg-primary text-primary-foreground">
              ✨ HỢP NHẤT CÂU TRẢ LỜI ĐA TẦNG
            </span>
          </div>
          <p className="text-base font-medium leading-relaxed">
            {model.fullMosaicSummary}
          </p>
        </div>
      )}
    </div>
  );
}
