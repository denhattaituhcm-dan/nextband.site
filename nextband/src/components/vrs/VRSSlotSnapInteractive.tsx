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

      {/* Syntax Blocks Canvas - Tactile Academic Surface */}
      <div className="py-8 px-6 sm:px-10 rounded-2xl bg-slate-50/70 border border-slate-200/80 shadow-[inset_0_1px_3px_rgba(15,23,42,0.03)] flex flex-wrap items-center justify-center gap-3.5 min-h-[140px] relative">
        <div className="absolute top-2.5 left-3.5 text-[10px] font-mono tracking-widest uppercase text-slate-400 font-semibold select-none">
          SYNTAX COMPONENT WORKBENCH
        </div>

        {model.tokens.map((token) => {
          const isSelected = selectedTokens.includes(token.id);
          const isConflict = hasCollision && model.collisionTarget?.conflictingTokenIds.includes(token.id);
          const isTargetRepair = model.collisionTarget?.repairOptions.some((o) => o.targetTokenId === token.id);
          const displayText = (repairedText && isTargetRepair) ? repairedText : token.text;

          // Tactile Elevation & State Styling
          let tokenStyles = 'bg-white border-slate-200 text-slate-800 shadow-[0_2px_4px_rgba(15,23,42,0.06),0_1px_2px_rgba(15,23,42,0.04)] hover:shadow-[0_6px_16px_rgba(15,23,42,0.08)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-xs border';
          
          if (isConflict) {
            tokenStyles = 'bg-rose-50 border-rose-300 text-rose-900 shadow-[0_0_0_2px_rgba(244,63,94,0.2),0_4px_12px_rgba(244,63,94,0.15)] animate-pulse -translate-y-0.5 border';
          } else if (isSelected) {
            tokenStyles = 'bg-indigo-600 border-indigo-700 text-white shadow-[0_6px_20px_rgba(79,70,229,0.35)] -translate-y-1 font-semibold border';
          }

          return (
            <button
              key={token.id}
              type="button"
              onClick={() => toggleToken(token.id)}
              className={`transition-all duration-200 px-5 py-3 rounded-xl flex flex-col items-center min-w-[110px] select-none cursor-pointer focus:outline-hidden ${tokenStyles}`}
            >
              <span className="text-base tracking-tight">{displayText}</span>
              {!isBreakMode && isScanned && (
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider mt-1 px-1.5 py-0.5 rounded ${
                  isSelected ? 'bg-indigo-700/80 text-indigo-100' : 'bg-slate-100 text-slate-500'
                }`}>
                  {token.role.replace('_', ' ')}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Collision Alert & Surgery Drawer: Academic Diagnosis */}
      {hasCollision && model.collisionTarget && (
        <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200/80 shadow-xs">
          <div className="flex items-start gap-3.5">
            <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
              !
            </span>
            <div className="flex-1">
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-700">
                LỖI XUNG ĐỘT CÚ PHÁP PHÁT HIỆN
              </div>
              <h5 className="font-semibold text-slate-900 text-sm mt-0.5 leading-snug">
                {model.collisionTarget.errorMessage}
              </h5>
              <p className="text-xs text-slate-600 mt-1">
                Chọn phương án chuẩn hóa giải phẫu cấu trúc để phục hồi tính toàn vẹn:
              </p>
              <div className="flex flex-wrap items-center gap-2.5 mt-3.5">
                {model.collisionTarget.repairOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => applyRepair(opt.id)}
                    className="py-2 px-4 rounded-xl text-xs font-semibold bg-white border border-rose-300 text-rose-800 hover:bg-rose-600 hover:text-white hover:border-rose-600 hover:shadow-md transition-all active:translate-y-0.5 shadow-xs flex items-center gap-1.5"
                  >
                    <span>✦</span>
                    {opt.explanation}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Academic Verification Annotation (Thay cho Alert box xanh) */}
      {repairedText && (
        <div className="p-4 rounded-2xl bg-emerald-50/60 border-l-4 border-emerald-500 border-y border-r border-slate-200/60 transition-all">
          <div className="flex items-start gap-3">
            <span className="text-emerald-700 font-bold text-sm">✓</span>
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800">
                STRUCTURE VERIFIED · CÚ PHÁP ĐÃ KHỚP CHUẨN
              </span>
              <p className="text-xs text-slate-700 mt-0.5 leading-relaxed font-medium">
                Quan hệ ngữ pháp được tái lập bền vững. Tân ngữ trực tiếp kết hợp trơn tru với động từ bare infinitive không gây xung đột kép.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
