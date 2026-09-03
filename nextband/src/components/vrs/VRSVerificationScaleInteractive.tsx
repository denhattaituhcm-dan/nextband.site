import React, { useState } from 'react';
import { VRSScaleInteraction } from '@/types/vrs';

interface Props {
  model: VRSScaleInteraction;
}

export default function VRSVerificationScaleInteractive({ model }: Props) {
  const [selectedVerdict, setSelectedVerdict] = useState<string | null>(null);
  const [showInsight, setShowInsight] = useState(false);

  const isCorrect = selectedVerdict === model.verdict;

  const handleSelect = (v: 'true' | 'false' | 'not_given') => {
    const upper = v === 'true' ? 'TRUE' : v === 'false' ? 'FALSE' : 'NOT GIVEN';
    selectedVerdict !== upper && setSelectedVerdict(upper);
    setShowInsight(true);
  };

  return (
    <div className="space-y-6">
      <p className="text-sm font-medium text-muted-foreground">
        {model.prompt}
      </p>

      {/* The 2-Plate Scale Canvas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 rounded-xl bg-muted/10 border">
        {/* Left Plate: Statement */}
        <div className="p-5 rounded-lg bg-card border-2 border-primary/30 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase px-2 py-0.5 rounded bg-primary/10 text-primary">
              ĐĨA TRÁI: CÂU ĐỀ BÀI
            </span>
          </div>
          <p className="font-semibold text-base mb-4">{model.statement.rawText}</p>
          <div className="flex flex-wrap gap-2">
            {model.statement.deconstructedVariables.map((v, i) => (
              <span
                key={i}
                className={'text-xs px-2.5 py-1 rounded-md font-medium ' + (v.isTrapWord ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/40' : 'bg-muted')}
              >
                {v.isTrapWord && '⚠ '}{v.text}
              </span>
            ))}
          </div>
        </div>

        {/* Right Plate: Passage Evidence */}
        <div className="p-5 rounded-lg bg-card border-2 border-blue-500/30 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase px-2 py-0.5 rounded bg-blue-500/10 text-blue-500">
              ĐĨA PHảI: BẰNG CHỨNG BÀI ĐỌC
            </span>
          </div>
          <p className="font-semibold text-base mb-4">{model.passageEvidence.rawText}</p>
          <div className="flex flex-wrap gap-2">
            {model.passageEvidence.targetVariables.map((v, i) => (
              <span
                key={i}
                className="text-xs px-2.5 py-1 rounded-md font-bold bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/40"
              >
                🔎 {v.text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Verdict Selector */}
      <div className="flex items-center justify-center gap-4">
        {(['true', 'false', 'not_given'] as const).map((v) => {
          const label = v === 'true' ? 'TRUE' : v === 'false' ? 'FALSE' : 'NOT GIVEN';
          const isSelected = selectedVerdict === label;
          return (
            <button
              key={v}
              onClick={() => handleSelect(v)}
              className={'px-6 py-2.5 rounded-xl font-bold text-sm transition-all ' + (isSelected ? 'bg-primary text-primary-foreground scale-105 shadow-md' : 'bg-muted text-muted-foreground hover:bg-muted/80')}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Insight Drawer */}
      {showInsight && (
        <div className={'p-5 rounded-xl border ' + (isCorrect ? 'bg-green-500/10 border-green-500/30' : 'bg-amber-500/10 border-amber-500/30')}>
          <div className="flex items-start gap-3">
            <span className="text-2xl">{isCorrect ? '🎉' : '🤔'}</span>
            <div>
              <h5 className={'font-bold ' + (isCorrect ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400')}>
                {isCorrect ? 'Chính xác tuyệt đối!' : 'Cân lệch về đối chiếu thực tế'}
              </h5>
              <p className="text-sm text-muted-foreground mt-1">
                {model.pedagogicalInsight}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
