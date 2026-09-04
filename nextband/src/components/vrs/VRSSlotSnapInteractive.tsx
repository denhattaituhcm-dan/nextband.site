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

  const getRoleLabel = (role: string) => {
    switch (role.toLowerCase()) {
      case 'subject':
        return 'Chủ ngữ (S)';
      case 'fv_core':
      case 'verb':
        return 'Động từ (V)';
      case 'object':
        return 'Tân ngữ (O)';
      case 'predicate':
        return 'Vị ngữ';
      case 'modifier':
        return 'Bổ ngữ';
      case 'relative_clause':
        return 'Mệnh đề QH';
      case 'connector':
        return 'Liên từ';
      default:
        return role.replace('_', ' ');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          <p className="text-sm font-semibold text-slate-800">
            {model.prompt}
          </p>
        </div>
        {!isBreakMode && (
          <button
            onClick={() => setIsScanned(!isScanned)}
            className="text-xs px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-xs hover:shadow-md transition-all shrink-0 cursor-pointer"
          >
            {isScanned ? 'Thu gọn' : '✦ Tách thành phần câu'}
          </button>
        )}
      </div>

      {/* Syntax Blocks Canvas - Tactile Academic Surface */}
      <div className="py-10 px-6 sm:px-10 rounded-2xl bg-slate-50/50 border border-slate-200 flex flex-wrap items-center justify-center gap-4 min-h-[150px] relative">
        <div className="absolute top-3 left-4 text-[10px] font-mono tracking-wider uppercase text-slate-400 font-bold select-none">
          CÁC THÀNH PHẦN TRONG CÂU
        </div>

        {model.tokens.map((token) => {
          const isSelected = selectedTokens.includes(token.id);
          const isConflict = hasCollision && model.collisionTarget?.conflictingTokenIds.includes(token.id);
          const isTargetRepair = model.collisionTarget?.repairOptions.some((o) => o.targetTokenId === token.id);
          const displayText = (repairedText && isTargetRepair) ? repairedText : token.text;

          // Tactile Elevation & State Styling
          let tokenStyles = 'bg-white border-slate-300/90 text-slate-800 shadow-[0_3px_8px_rgba(15,23,42,0.06)] hover:border-indigo-400 hover:shadow-[0_8px_20px_rgba(79,70,229,0.12)] hover:-translate-y-1 active:translate-y-0 border';
          
          if (isConflict) {
            tokenStyles = 'bg-rose-50 border-rose-400 text-rose-900 shadow-[0_0_0_3px_rgba(244,63,94,0.25),0_6px_16px_rgba(244,63,94,0.18)] animate-pulse -translate-y-1 border';
          } else if (isSelected) {
            tokenStyles = 'bg-indigo-600 border-indigo-700 text-white shadow-[0_8px_24px_rgba(79,70,229,0.4)] -translate-y-1.5 font-bold border';
          }

          return (
            <button
              key={token.id}
              type="button"
              onClick={() => toggleToken(token.id)}
              className={`transition-all duration-200 px-6 py-3.5 rounded-2xl flex flex-col items-center min-w-[120px] select-none cursor-pointer focus:outline-hidden ${tokenStyles}`}
            >
              <span className="text-base tracking-tight">{displayText}</span>
              {!isBreakMode && isScanned && (
                <span className={`text-[10px] font-bold tracking-wide mt-1.5 px-2 py-0.5 rounded-md ${
                  isSelected ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-100 text-indigo-800 border border-slate-200'
                }`}>
                  {getRoleLabel(token.role)}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Collision Alert & Surgery Drawer */}
      {hasCollision && model.collisionTarget && (
        <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200/80 shadow-xs">
          <div className="flex items-start gap-3.5">
            <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
              !
            </span>
            <div className="flex-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-rose-700">
                PHÁT HIỆN LỖI SAI TRONG CÂU
              </div>
              <h5 className="font-semibold text-slate-900 text-sm mt-0.5 leading-snug">
                {model.collisionTarget.errorMessage}
              </h5>
              <p className="text-xs text-slate-600 mt-1">
                Chọn cách sửa đúng:
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

      {/* Verification Annotation */}
      {repairedText && (
        <div className="p-4 rounded-2xl bg-emerald-50/60 border-l-4 border-emerald-500 border-y border-r border-slate-200/60 transition-all">
          <div className="flex items-start gap-3">
            <span className="text-emerald-700 font-bold text-sm">✓</span>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                CHÚC MỪNG! CÂU ĐÃ ĐƯỢC SỬA ĐÚNG
              </span>
              <p className="text-xs text-slate-700 mt-0.5 leading-relaxed font-medium">
                Cấu trúc câu hiện tại đã chuẩn ngữ pháp, các từ kết hợp hài hòa và không còn lỗi thừa động từ.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
