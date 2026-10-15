import React from 'react';
import { UnitConfig, StepType } from '../../types';
import { ORDERED_STEPS } from '../../hooks/useUnitProgress';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  HelpCircle, 
  Sparkles, 
  CheckCircle2, 
  Volume2, 
  BookOpen, 
  PenTool, 
  Layers 
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface ChallengeHeaderProps {
  unit: UnitConfig;
  currentStepIndex: number;
  completedSteps: StepType[];
  onSelectStep?: (index: number) => void;
}

const STEP_ICONS: Record<StepType, React.ReactNode> = {
  pre_reading: <HelpCircle className="w-3.5 h-3.5" />,
  vocab_preview: <Sparkles className="w-3.5 h-3.5" />,
  reading_passage: <BookOpen className="w-3.5 h-3.5" />,
  comprehension: <CheckCircle2 className="w-3.5 h-3.5" />,
  idioms: <Layers className="w-3.5 h-3.5" />,
  summary: <PenTool className="w-3.5 h-3.5" />,
  listening_dictation: <Volume2 className="w-3.5 h-3.5" />,
  grammar_inline: <Layers className="w-3.5 h-3.5" />,
  guided_writing: <PenTool className="w-3.5 h-3.5" />,
  review_quiz: <Sparkles className="w-3.5 h-3.5" />,
};

export const ChallengeHeader: React.FC<ChallengeHeaderProps> = ({
  unit,
  currentStepIndex,
  completedSteps,
  onSelectStep,
}) => {
  const progressPercent = Math.round(
    (completedSteps.length / ORDERED_STEPS.length) * 100
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-xs">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Left: Back & Unit Indicator */}
        <div className="flex items-center gap-3">
          <Link to="/reading-challenge">
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300">
                Unit {unit.unitNumber}
              </span>
              <h1 className="text-sm font-semibold text-foreground truncate max-w-[200px] sm:max-w-xs">
                {unit.title}
              </h1>
            </div>
            <p className="text-xs text-muted-foreground hidden sm:block">
              Step {currentStepIndex + 1} of {ORDERED_STEPS.length}: {formatStepName(ORDERED_STEPS[currentStepIndex])}
            </p>
          </div>
        </div>

        {/* Center: Progress Tracker */}
        <div className="flex-1 max-w-xs hidden md:flex flex-col gap-1.5 items-end">
          <div className="w-full flex items-center justify-between text-xs">
            <span className="text-muted-foreground font-medium">Unit Progress</span>
            <span className="font-semibold text-sky-600 dark:text-sky-400">{progressPercent}%</span>
          </div>
          <Progress value={progressPercent} className="h-2 w-full bg-sky-100 dark:bg-slate-800" />
        </div>

        {/* Right: Quick Step Pills */}
        <div className="flex items-center gap-1 overflow-x-auto max-w-[180px] sm:max-w-none py-1">
          {ORDERED_STEPS.map((step, idx) => {
            const isCompleted = completedSteps.includes(step);
            const isCurrent = idx === currentStepIndex;

            return (
              <button
                key={step}
                onClick={() => onSelectStep?.(idx)}
                title={`Step ${idx + 1}: ${formatStepName(step)}`}
                className={`relative flex items-center justify-center w-7 h-7 rounded-full text-xs font-semibold transition-all ${
                  isCurrent
                    ? 'bg-sky-600 text-white ring-2 ring-sky-300 dark:ring-sky-700 shadow-sm scale-110'
                    : isCompleted
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                    : 'bg-muted/70 text-muted-foreground hover:bg-muted'
                }`}
              >
                {isCompleted && !isCurrent ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <span>{idx + 1}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

function formatStepName(step: StepType): string {
  switch (step) {
    case 'pre_reading':
      return 'Pre-Reading';
    case 'vocab_preview':
      return 'Vocabulary Preview';
    case 'reading_passage':
      return 'Reading Passage';
    case 'comprehension':
      return 'Comprehension';
    case 'idioms':
      return 'Idioms';
    case 'summary':
      return 'Summary';
    case 'listening_dictation':
      return 'Listening & Dictation';
    case 'grammar_inline':
      return 'Grammar Inline';
    case 'guided_writing':
      return 'Guided Writing';
    case 'review_quiz':
      return 'Review Quiz';
  }
}
