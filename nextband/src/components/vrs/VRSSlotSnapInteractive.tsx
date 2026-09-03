import React, { useState } from 'react';
import { VRSSlotSnapInteraction } from '@/types/vrs';

interface Props {
  model: VRSSlotSnapInteraction;
}

export default function VRSSlotSnapInteractive({ model }: Props) {
  const [isScanned, setIsScanned] = useState(false);
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  const [hasCollision, setHasCollision] = useState(false);
  const [repairedText, setRepairedText] = useState<string | null>(null);

  const isBreakMode = model.mode === 'break_and_repair';

  const toggleToken = (id: string) => {
    if (isBreakMode) {
      const next = selectedTokens.includes(id)
        ? selectedTokens.filter((t) => t !== id)
        : [...selectedTokens, id];
      setSelectedTokens(next);

      if (model.collisionTarget) {
        const [t1, t2] = model.collisionTarget.conflictingTokenIds;
        if (next.includes(t1) && next.includes(t2)) {
          setHasCollision(true);
        } else {
          setIsCollisionFalse();
        }
      }
    }
  };

  const setIsCollisionFalse = () => {
    setHasCollision(false);
  };

  const applyRepair = (repairId: string) => {
    const opt = model.collisionTarget?.repairOptions.find((o) => o.id === repairId);
    if (opt) {
      setRepairedText(opt.resultText);
      setHasCollision(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">
          {model.prompt}
        </p>
        {!isBreakMode && (
          <button
            onClick={() => setIsScanned(!isScanned)}
            className="text-xs px-3 py-1.5 rounded-md bg-primary text-primary-foreground font-semibold"
          >
            {isScanned ? 'Thu gọn' : 'Quét giải phẩu' + ' ✨'}
          </button>
        )}
      </div>

      {/* Syntax Blocks Canvas */}
      <div className="p-8 rounded-xl bg-muted/10 border flex flex-wrap items-center justify-center gap-4 min-h-[120px]">
        {model.tokens.map((token) => {
          const isSelected = selectedTokens.includes(token.id);
          const isConflict = hasCollision && model.collisionTarget?.conflictingTokenIds.includes(token.id);
          const isTargetRepair = model.collisionTarget?.repairOptions.some((o) => o.targetTokenId === token.id);
          const displayText = (repairedText && isTargetRepair) ? repairedText : token.text;

          let borderBgClass = 'bg-card border-border hover:border-primary/50';
          if (isConflict) {
            borderBgClass = 'bg-destructive/20 border-destructive animate-pulse';
          } else if (isSelected) {
            borderBgClass = 'bg-primary/15 border-primary';
          }

          return (
            <div
              key={token.id}
              onClick={() => toggleToken(token.id)}
              className={'cursor-pointer transition-all duration-200 p-3 rounded-lg border-2 flex flex-col items-center min-w-[100px] ' + borderBgClass}
            >
              <span className="font-semibold text-base">{displayText}</span>
              {!isBreakMode && isScanned && (
                <span className="text-[0.65rem] font-bold uppercase tracking-wider mt-1 px-1.5 rounded bg-muted">
                  {token.role.replace('_', ' ')}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Collision Alert & Surgery Drawer */}
      {hasCollision && model.collisionTarget && (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/30">
          <div className="flex items-start gap-3">
            <span className="text-xl">⚠️</span>
            <div>
              <h5 className="font-bold text-destructive">{model.collisionTarget.errorMessage}</h5>
              <p className="text-sm text-muted-foreground mt-1">
                Hãy phẫu thuật cấu trúc bằng cách chọn phương án chỉnh sửa:
              </p>
              <div className="flex items-center gap-3 mt-3">
                {model.collisionTarget.repairOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => applyRepair(opt.id)}
                    className="py-1.5 px-3.5 rounded-md text-sm font-semibold bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    ✨ {opt.explanation}
                  </button>
               ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {repairedText && (
        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
          <p className="text-sm font-semibold text-green-600 dark:text-green-400">
            🎉 Phẫu thuật thành công! Câu văn đã khớp quan hệ cúpháp vững chắc.
          </p>
        </div>
      )}
    </div>
  );
}
