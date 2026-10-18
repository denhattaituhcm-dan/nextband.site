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
      <div className="w-full min-h-[calc(100vh-80px)] py-8 px-4 flex items-center justify-center bg-slate-950">
        <CompletionSummary onReplay={handleReplay} />
      </div>
    );
  }

  return (
    <div className="w-full min-h-[calc(100vh-80px)] py-6 px-3 sm:px-6 bg-slate-950 text-slate-100 flex flex-col items-center select-none">
      <div className="w-full max-w-2xl flex flex-col gap-4">
        {/* Top Header & Progression Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-400 font-mono text-xs font-bold uppercase tracking-wider border border-sky-500/30">
                Level 1: Puzzles
              </span>
              <span className="text-xs text-slate-400">
                Scenario {puzzle.order} of {LEVEL_1_PUZZLES.length}
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-black text-white mt-0.5">
              {puzzle.title}
            </h1>
            <p className="text-xs text-slate-400">
              {puzzle.subtitle}
            </p>
          </div>

          {/* Hint Toggle */}
          <button
            type="button"
            onClick={() => setShowHint((prev) => !prev)}
            className={`p-2 rounded-xl border transition-all text-xs flex items-center gap-1.5 ${
              showHint
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
            aria-label="Toggle Hint"
          >
            <span>💡</span>
            <span className="hidden sm:inline font-medium">Hint</span>
          </button>
        </div>

        {/* Progress Dots */}
        <div className="flex gap-1.5 w-full">
          {LEVEL_1_PUZZLES.map((p, idx) => (
            <div
              key={p.id}
              className={`h-1.5 rounded-full flex-1 transition-all ${
                idx === currentPuzzleIndex
                  ? 'bg-sky-400 shadow-sm shadow-sky-400/50'
                  : idx < currentPuzzleIndex
                  ? 'bg-sky-800'
                  : 'bg-slate-800'
              }`}
            />
          ))}
        </div>

        {/* Expandable Hint Banner */}
        {showHint && (
          <div className="p-3 bg-amber-950/30 border border-amber-500/40 rounded-xl text-xs text-amber-200 animate-fadeIn">
            <span className="font-bold text-amber-400 mr-1.5">Observation Hint:</span>
            {puzzle.hint.en}
            {showViInsight && (
              <span className="block mt-1 text-amber-300/90 italic">
                (Gợi ý: {puzzle.hint.vi})
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
        />

        {/* Central Sentence Prompt & Prediction Interface */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg flex flex-col items-center text-center">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">
            Predict the natural relationship:
          </span>

          <div className="text-lg sm:text-xl font-medium text-slate-200 leading-snug my-1.5">
            <span>{puzzle.sentencePrompt.lead} </span>
            <span
              className={`inline-block px-3 py-0.5 mx-1.5 rounded-lg border-2 font-bold tracking-wide transition-all ${
                selectedOption
                  ? 'bg-sky-500/20 text-sky-300 border-sky-400'
                  : 'border-dashed border-slate-600 text-slate-500 min-w-[70px]'
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
          />

          {/* Test Prediction Primary CTA */}
          {!hasTestedPrediction ? (
            <button
              type="button"
              disabled={!selectedPreposition}
              onClick={handleTestPrediction}
              className={`
                w-full max-w-sm mt-2 py-3 rounded-xl font-bold text-sm tracking-wide
                transition-all duration-200 flex items-center justify-center gap-2 shadow-md
                ${
                  selectedPreposition
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white cursor-pointer active:scale-95 shadow-sky-500/20'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/60'
                }
              `}
            >
              <span>🔬 Test My Prediction</span>
            </button>
          ) : (
            <div className="text-xs text-sky-400 font-medium mt-1">
              ✓ Prediction recorded and physical reaction tested below
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
          isLastPuzzle={currentPuzzleIndex === LEVEL_1_PUZZLES.length - 1}
        />
      </div>
    </div>
  );
};
