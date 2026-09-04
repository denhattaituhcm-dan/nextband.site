import React, { useState } from 'react';
import { VRSScaleInteraction } from '@/types/vrs';
import { Search, Compass, ArrowDownRight, Scale, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';

interface Props {
  model: VRSScaleInteraction;
}

export default function VRSVerificationScaleInteractive({ model }: Props) {
  const [selectedVerdict, setSelectedVerdict] = useState<string | null>(null);
  const [showInsight, setShowInsight] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isLocated, setIsLocated] = useState(false);

  const isCorrect = selectedVerdict === model.verdict;

  const handleSelect = (v: 'true' | 'false' | 'not_given') => {
    const upper = v === 'true' ? 'TRUE' : v === 'false' ? 'FALSE' : 'NOT GIVEN';
    selectedVerdict !== upper && setSelectedVerdict(upper);
    setShowInsight(true);
  };

  const handleTriggerScan = () => {
    setIsScanning(true);
    setIsLocated(false);
    setTimeout(() => {
      setIsScanning(false);
      setIsLocated(true);
    }, 900);
  };

  return (
    <div className="space-y-6">
      {/* 1. INTERACTIVE SCANNING RADAR & PASSAGE CONTEXT */}
      {model.passageContext && (
        <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50/70">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200">
                <Compass className="w-4 h-4" />
              </span>
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Scanning Radar · Định vị tọa độ bằng chứng
                </h5>
                <p className="text-sm font-bold text-slate-900">
                  Bài đọc: {model.passageContext.title}
                </p>
              </div>
            </div>

            <button
              onClick={handleTriggerScan}
              disabled={isScanning}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
                isLocated
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              <Search className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
              {isScanning ? 'Đang quét radar từ khóa...' : isLocated ? '✓ Đã khóa tọa độ bằng chứng' : 'Bật Radar Quét Vị Trí (Scan Text) →'}
            </button>
          </div>

          {/* Passage Paragraphs Showcase */}
          <div className="space-y-3">
            {model.passageContext.paragraphs.map((p) => {
              const isTarget = p.id === model.passageContext?.targetParagraphId;
              const isHighlighted = isTarget && isLocated;

              return (
                <div
                  key={p.id}
                  className={`p-4 sm:p-5 rounded-xl transition-all border text-[15px] sm:text-base leading-relaxed ${
                    isHighlighted
                      ? 'bg-amber-50/90 border-amber-300 text-amber-950 shadow-sm ring-2 ring-amber-400/30'
                      : 'bg-white border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-xs mb-2 text-slate-600">
                    <span>{p.label}</span>
                    {isHighlighted && (
                      <span className="text-amber-800 bg-amber-100/90 px-2.5 py-0.5 rounded-md font-mono text-xs flex items-center gap-1 animate-pulse">
                        <ArrowDownRight className="w-3.5 h-3.5" /> Tọa độ phát hiện bằng chứng
                      </span>
                    )}
                  </div>
                  <p>
                    {isHighlighted ? (
                      <span>
                        {p.text.split(model.passageContext.targetSnippet)[0]}
                        <mark className="bg-amber-300 text-amber-950 font-bold px-1.5 py-0.5 rounded border-b-2 border-amber-600">
                          {model.passageContext.targetSnippet}
                        </mark>
                        {p.text.split(model.passageContext.targetSnippet)[1]}
                      </span>
                    ) : (
                      p.text
                    )}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Animated Trajectory Indicator */}
          {isLocated && (
            <div className="mt-3 p-3 rounded-xl bg-indigo-50/90 border border-indigo-200 flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-indigo-900 animate-fadeIn">
              <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>
                Radar đã rút trích thành công bằng chứng từ <strong className="underline">{model.passageContext.targetParagraphId.toUpperCase()}</strong> và đưa thẳng vào Đĩa Phải bên dưới!
              </span>
            </div>
          )}
        </div>
      )}

      {/* 2. THE 2-PLATE SCALE CANVAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6 rounded-2xl bg-slate-50/50 border border-slate-200">
        {/* Left Plate: Statement */}
        <div className="p-5 sm:p-6 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3.5">
              <span className="text-xs font-bold uppercase px-3 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5" />
                ĐĨA TRÁI: CÂU ĐỀ BÀI (STATEMENT)
              </span>
            </div>
            <p className="font-semibold text-base sm:text-lg text-slate-900 mb-4 leading-normal">{model.statement.rawText}</p>
          </div>

          <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100">
            {model.statement.deconstructedVariables.map((v, i) => (
              <span
                key={i}
                className={'text-xs sm:text-sm px-3 py-1.5 rounded-lg font-medium ' + (v.isTrapWord ? 'bg-rose-50 text-rose-700 font-bold border border-rose-200 flex items-center gap-1' : 'bg-slate-100 text-slate-700')}
              >
                {v.isTrapWord && <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />}
                {v.text}
              </span>
            ))}
          </div>
        </div>

        {/* Right Plate: Passage Evidence */}
        <div className="p-5 sm:p-6 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3.5">
              <span className="text-xs font-bold uppercase px-3 py-1 rounded-md bg-amber-50 text-amber-700 border border-amber-100 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5" />
                ĐĨA PHẢI: BẰNG CHỨNG TRÍCH XUẤT (EVIDENCE)
              </span>
            </div>
            <p className="font-semibold text-base sm:text-lg text-slate-900 mb-4 leading-normal">{model.passageEvidence.rawText}</p>
          </div>

          <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100">
            {model.passageEvidence.targetVariables.map((v, i) => (
              <span
                key={i}
                className="text-xs sm:text-sm px-3 py-1.5 rounded-lg font-bold bg-amber-50 text-amber-800 border border-amber-200"
              >
                🔎 {v.text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 3. VERDICT SELECTOR */}
      <div className="flex flex-col items-center gap-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Phán Quyết Bàn Cân Logic
        </span>
        <div className="flex items-center justify-center gap-3">
          {(['true', 'false', 'not_given'] as const).map((v) => {
            const label = v === 'true' ? 'TRUE' : v === 'false' ? 'FALSE' : 'NOT GIVEN';
            const isSelected = selectedVerdict === label;
            return (
              <button
                key={v}
                onClick={() => handleSelect(v)}
                className={'px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all shadow-xs cursor-pointer ' + (isSelected ? 'bg-indigo-600 text-white scale-105 shadow-md ring-2 ring-indigo-300' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50')}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. PEDAGOGICAL INSIGHT DRAWER */}
      {showInsight && (
        <div className={'p-5 rounded-2xl border animate-fadeIn ' + (isCorrect ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950' : 'bg-rose-50/80 border-rose-200 text-rose-950')}>
          <div className="flex items-start gap-3.5">
            <div className="mt-0.5 shrink-0">
              {isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-rose-600" />
              )}
            </div>
            <div>
              <h5 className="font-bold text-base">
                {isCorrect ? 'Chính xác tuyệt đối!' : 'Cân lệch logic — Đối chiếu chưa khớp!'}
              </h5>
              <p className="text-xs sm:text-sm mt-1 leading-relaxed opacity-90">
                {model.pedagogicalInsight}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
