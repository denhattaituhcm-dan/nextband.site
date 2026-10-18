import React, { useState, useMemo } from 'react';
import { LEVEL_1_PUZZLES } from '../data/level-1.data';
import { PrepositionId, SceneActionState } from '../types';
import { DioramaCanvas } from './DioramaCanvas';
import { PrepositionSelector } from './PrepositionSelector';
import { FeedbackDrawer } from './FeedbackDrawer';
import { CompletionSummary } from './CompletionSummary';

export const PrepositionLabContainer: React.FC = () => {
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [selectedPreposition, setSelectedPreposition] = useState<PrepositionId | null>(null);
  const [actionState, setActionState] = useState<SceneActionState>('idle');
  const [hasTestedPrediction, setHasTestedPrediction] = useState(false);
  const [showViInsight, setShowViInsight] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Puzzle 1 specific placement state
  const [snapZone, setSnapZone] = useState<'table' | 'rim' | 'cavity'>('cavity');

  const puzzle = LEVEL_1_PUZZLES[currentPuzzleIndex];

  const selectedOption = useMemo(() => {
    if (!selectedPreposition) return null;
    return puzzle.options.find((opt) => opt.id === selectedPreposition) || null;
  }, [puzzle, selectedPreposition]);

  // Handle scene manipulation button
  const handleManipulate = () => {
    setActionState((prev) => (prev === 'idle' ? 'manipulated' : 'idle'));
  };

  // Select preposition prediction
  const handleSelectPreposition = (id: PrepositionId) => {
    setSelectedPreposition(id);
  };

  // Test Prediction trigger
  const handleTestPrediction = () => {
    if (!selectedPreposition) return;
    setActionState('manipulated');
    setHasTestedPrediction(true);
  };

  // Advance to next puzzle or completion
  const handleNext = () => {
    if (currentPuzzleIndex < LEVEL_1_PUZZLES.length - 1) {
      setCurrentPuzzleIndex((prev) => prev + 1);
      setSelectedPreposition(null);
      setActionState('idle');
      setHasTestedPrediction(false);
      setShowViInsight(false);
      setShowHint(false);
      setSnapZone('cavity');
    } else {
      setIsCompleted(true);
    }
  };

  // Replay entire level
  const handleReplay = () => {
    setCurrentPuzzleIndex(0);
    setSelectedPreposition(null);
    setActionState('idle');
    setHasTestedPrediction(false);
    setShowViInsight(false);
    setShowHint(false);
    setIsCompleted(false);
    setSnapZone('cavity');
  };

  if (isCompleted) {
    return (
      <div className="w-full min-h-[calc(100vh-80px)] py-8 px-4 flex items-center justify-center bg-slate-50">
        <CompletionSummary onReplay={handleReplay} />
      </div>
    );
  }

  return (
    <div className="w-full min-h-[calc(100vh-80px)] py-6 px-3 sm:px-6 bg-slate-50 text-slate-800 flex flex-col items-center select-none">
      <div className="w-full max-w-2xl flex flex-col gap-4">
        {/* Top Header & Progression Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-sky-100 text-sky-700 font-mono text-xs font-bold uppercase tracking-wider border border-sky-300">
                Level 1: Thí nghiệm
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Màn {puzzle.order} / {LEVEL_1_PUZZLES.length}
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
              {puzzle.title}
            </h1>
            <p className="text-xs text-slate-500">
              {puzzle.subtitle}
            </p>
          </div>

          {/* Hint Toggle */}
          <button
            type="button"
            onClick={() => setShowHint((prev) => !prev)}
            className={`p-2 sm:px-3 rounded-xl border transition-all text-xs flex items-center gap-1.5 cursor-pointer ${
              showHint
                ? 'bg-amber-100 border-amber-300 text-amber-800 shadow-xs'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 shadow-xs'
            }`}
            aria-label="Bật gợi ý"
          >
            <span>💡</span>
            <span className="hidden sm:inline font-bold">Gợi ý</span>
          </button>
        </div>

        {/* Progress Dots */}
        <div className="flex gap-2 w-full">
          {LEVEL_1_PUZZLES.map((p, idx) => (
            <div
              key={p.id}
              className={`h-2 rounded-full flex-1 transition-all ${
                idx === currentPuzzleIndex
                  ? 'bg-sky-600 shadow-sm shadow-sky-600/30'
                  : idx < currentPuzzleIndex
                  ? 'bg-sky-300'
                  : 'bg-slate-200'
              }`}
            />
          ))}
        </div>

        {/* Expandable Hint Banner */}
        {showHint && (
          <div className="p-3.5 bg-amber-50 border border-amber-300 rounded-xl text-xs sm:text-sm text-amber-900 shadow-xs animate-fadeIn">
            <span className="font-bold text-amber-800 mr-1.5">Gợi ý quan sát:</span>
            {puzzle.hint.vi}
            {showViInsight && (
              <span className="block mt-1 text-slate-600 italic">
                (English: {puzzle.hint.en})
              </span>
            )}
          </div>
        )}

        {/* 2.5D Interactive Diorama */}
        <DioramaCanvas
          puzzle={puzzle}
          actionState={actionState}
          onManipulate={handleManipulate}
          snapZone={snapZone}
          onSnapZoneChange={setSnapZone}
          selectedOptionId={selectedPreposition}
          selectedOptionFit={selectedOption?.fit ?? null}
          hasTestedPrediction={hasTestedPrediction}
        />

        {/* Central Sentence Prompt & Prediction Interface */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-md flex flex-col items-center text-center">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
            Dự đoán giới từ tự nhiên nhất:
          </span>

          <div className="text-lg sm:text-xl font-semibold text-slate-900 leading-snug my-2">
            <span>{puzzle.sentencePrompt.lead} </span>
            <span
              className={`inline-block px-4 py-1 mx-1.5 rounded-xl border-2 font-black tracking-wide transition-all ${
                selectedOption
                  ? 'bg-sky-50 text-sky-700 border-sky-500 shadow-xs'
                  : 'border-dashed border-slate-300 text-slate-400 min-w-[80px]'
              }`}
            >
              {selectedOption ? selectedOption.label : '_______'}
            </span>
            <span> {puzzle.sentencePrompt.targetLandmark}</span>
          </div>

          {/* Preposition Selector Chips */}
          <PrepositionSelector
            options={puzzle.options}
            selectedId={selectedPreposition}
            onSelect={handleSelectPreposition}
            disabled={hasTestedPrediction}
            hasTestedPrediction={hasTestedPrediction}
          />

          {/* Test Prediction Primary CTA */}
          {!hasTestedPrediction ? (
            <button
              type="button"
              disabled={!selectedPreposition}
              onClick={handleTestPrediction}
              className={`
                w-full max-w-sm mt-2 py-3.5 rounded-xl font-black text-sm tracking-wide
                transition-all duration-200 flex items-center justify-center gap-2 shadow-md
                ${
                  selectedPreposition
                    ? 'bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white cursor-pointer active:scale-95 shadow-sky-600/25'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                }
              `}
            >
              <span>🔬 Kiểm tra phán đoán (Test Prediction)</span>
            </button>
          ) : (
            <div className="text-xs text-emerald-700 font-bold mt-1.5 flex items-center gap-1.5 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <span>✓</span>
              <span>Đã ghi nhận phán đoán và kích hoạt mô phỏng vật lý bên dưới</span>
            </div>
          )}
        </div>

        {/* Cognitive Feedback Drawer */}
        <FeedbackDrawer
          puzzle={puzzle}
          selectedOption={selectedOption}
          hasTestedPrediction={hasTestedPrediction}
          showViInsight={showViInsight}
          onToggleViInsight={() => setShowViInsight((prev) => !prev)}
          onNext={handleNext}
          onRetry={() => {
            setHasTestedPrediction(false);
            setActionState('idle');
          }}
          isLastPuzzle={currentPuzzleIndex === LEVEL_1_PUZZLES.length - 1}
        />
      </div>
    </div>
  );
};
