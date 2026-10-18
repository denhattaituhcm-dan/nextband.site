import React, { useState } from 'react';
import { PuzzleScenario } from '../types';
import { soundEffects } from '../utils/soundEffects';

interface IeltsMetaphorBridgeProps {
  puzzle: PuzzleScenario;
}

export const IeltsMetaphorBridge: React.FC<IeltsMetaphorBridgeProps> = ({ puzzle }) => {
  const bridge = puzzle.ieltsBridge;
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  // Reset challenge state when puzzle changes
  React.useEffect(() => {
    setSelectedAnswer(null);
    setHasAnswered(false);
  }, [puzzle.id]);

  if (!bridge) return null;

  const handleSelectOption = (opt: string) => {
    if (hasAnswered) return;
    setSelectedAnswer(opt);
    setHasAnswered(true);
    if (opt === bridge.microChallenge.correctAnswer) {
      soundEffects.playSuccess();
    } else {
      soundEffects.playThud();
    }
  };

  const isCorrect = selectedAnswer === bridge.microChallenge.correctAnswer;

  return (
    <div className="mt-4 p-5 rounded-2xl bg-gradient-to-br from-indigo-50/90 via-sky-50/60 to-purple-50/80 border-2 border-indigo-200/90 shadow-md">
      {/* Header with Band 9.0 badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-mono text-xs font-black tracking-wide shadow-xs">
            IELTS 8.5+ BRIDGE
          </span>
          <span className="text-sm font-black text-indigo-950">
            {bridge.metaphorTitle}
          </span>
        </div>
        <span className="text-xs font-semibold text-indigo-600 flex items-center gap-1">
          <span>🧠</span>
          <span>Chuyển hóa nhận thức vật lý sang bài thi</span>
        </span>
      </div>

      {/* Cognitive Metaphor Explanation */}
      <p className="mt-3 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
        {bridge.academicExplanation}
      </p>

      {/* High-value Collocations */}
      <div className="mt-3.5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-800 block mb-1.5">
          🎯 Cụm Collocations band 8.0+ xuất hiện trong Reading/Writing:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {bridge.collocationPills.map((pill) => (
            <span
              key={pill}
              className="px-2.5 py-1 rounded-md bg-white border border-indigo-200 text-indigo-900 font-bold text-xs shadow-2xs hover:border-indigo-400 transition-colors"
            >
              {pill}
            </span>
          ))}
        </div>
      </div>

      {/* Authentic Band 8.5+ Task 2 Example */}
      <div className="mt-4 p-3.5 rounded-xl bg-white/95 border border-indigo-200/80 shadow-xs">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="font-bold text-emerald-700 uppercase tracking-wider">
            {bridge.writingExample.band} Sentence:
          </span>
          <span className="text-[11px] text-slate-600 font-semibold">Writing Task 2 Context</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-800 italic leading-snug font-serif">
          &ldquo;
          {bridge.writingExample.sentence.split(new RegExp(`\\b(${bridge.writingExample.targetPreposition})\\b`, 'i')).map((part, i) => {
            if (part.toLowerCase() === bridge.writingExample.targetPreposition.toLowerCase()) {
              return (
                <span key={i} className="font-sans font-black text-indigo-600 underline underline-offset-4 not-italic px-0.5">
                  {part}
                </span>
              );
            }
            return part;
          })}
          &rdquo;
        </p>
      </div>

      {/* Interactive Micro-Challenge */}
      <div className="mt-4 pt-3.5 border-t border-indigo-100">
        <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900 mb-2">
          <span>⚡</span>
          <span>Thử sức phản xạ ngay: Điền giới từ đúng</span>
        </div>

        <div className="p-3 bg-indigo-100/60 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 leading-snug">
          {bridge.microChallenge.prompt}
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2.5">
          {bridge.microChallenge.options.map((opt) => {
            const isSelected = selectedAnswer === opt;
            const isTarget = opt === bridge.microChallenge.correctAnswer;
            let btnStyle = 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200';

            if (hasAnswered) {
              if (isTarget) {
                btnStyle = 'bg-emerald-600 text-white border-emerald-600 font-black shadow-sm';
              } else if (isSelected) {
                btnStyle = 'bg-rose-600 text-white border-rose-600 font-black';
              } else {
                btnStyle = 'bg-slate-100 text-slate-400 border-slate-200 opacity-60';
              }
            }

            return (
              <button
                key={opt}
                type="button"
                disabled={hasAnswered}
                onClick={() => handleSelectOption(opt)}
                className={`py-2 px-3 rounded-xl border font-bold text-xs uppercase tracking-wide transition-all active:scale-95 cursor-pointer shadow-xs ${btnStyle}`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {/* Challenge Feedback */}
        {hasAnswered && (
          <div
            className={`mt-2.5 p-3 rounded-xl text-xs font-medium leading-relaxed animate-fadeIn ${
              isCorrect
                ? 'bg-emerald-50 border border-emerald-300 text-emerald-950'
                : 'bg-rose-50 border border-rose-300 text-rose-950'
            }`}
          >
            <div className="font-bold flex items-center gap-1 mb-0.5">
              <span>{isCorrect ? '✓ Chuẩn xác!' : '✕ Chưa chuẩn!'}</span>
              <span>Đáp án đúng là: <strong className="uppercase font-black">{bridge.microChallenge.correctAnswer}</strong></span>
            </div>
            <p className="text-slate-600">{bridge.microChallenge.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
};
