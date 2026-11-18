import React from 'react';
import { UnitConfig, StepType, LEARNING_PHASES } from '../../types';
import { ORDERED_STEPS, SyncStatus } from '../../hooks/useUnitProgress';
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
  Layers,
  CloudUpload,
  HardDrive
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SiteLogo } from '@/components/common/SiteLogo';

interface ChallengeHeaderProps {
  unit: UnitConfig;
  currentStepIndex: number;
  completedSteps: StepType[];
  syncStatus?: SyncStatus;
  isAuthenticated?: boolean;
  onSelectStep?: (index: number) => void;
}

export const ChallengeHeader: React.FC<ChallengeHeaderProps> = ({
  unit,
  currentStepIndex,
  completedSteps,
  syncStatus = 'local',
  isAuthenticated = false,
  onSelectStep,
}) => {
  const progressPercent = Math.round(
    (completedSteps.length / ORDERED_STEPS.length) * 100
  );

  const currentPhase = LEARNING_PHASES.find((p) => p.stepIndexes.includes(currentStepIndex)) || LEARNING_PHASES[0];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        {/* Left: Back & Unit Indicator */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/" title="Quay về trang chủ NextBand" className="flex items-center group shrink-0">
            <SiteLogo
              alt="NextBand Logo"
              className="h-8 w-8 object-contain transition-transform group-hover:scale-105"
            />
          </Link>
          <div className="h-5 w-px bg-border/60" />
          <Link to="/reading-challenge" title="Quay về lộ trình bài đọc">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300">
                Unit {unit.unitNumber}
              </span>
              <h1 className="text-sm font-bold text-foreground truncate max-w-[160px] sm:max-w-xs">
                {unit.title}
              </h1>
            </div>
            
            {/* Phase indicator */}
            <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
              <span className="font-semibold text-sky-600 dark:text-sky-400">
                Chặng {currentPhase.id}/4: {currentPhase.name}
              </span>
              <span>•</span>
              <span className="hidden sm:inline">Bước {currentStepIndex + 1}/10: {formatStepName(ORDERED_STEPS[currentStepIndex])}</span>
            </div>
          </div>
        </div>

        {/* Center: Progress & Sync Indicator */}
        <div className="hidden md:flex flex-col gap-1 items-end min-w-[180px]">
          <div className="w-full flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              {isAuthenticated ? (
                syncStatus === 'syncing' ? (
                  <span className="flex items-center gap-1 text-[11px] text-amber-600">
                    <CloudUpload className="w-3.5 h-3.5 animate-bounce" />
                    Đang lưu cloud...
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[11px] text-emerald-600">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Đồng bộ Cloud
                  </span>
                )
              ) : (
                <span className="flex items-center gap-1 text-[11px] text-slate-500">
                  <HardDrive className="w-3.5 h-3.5" />
                  Lưu trên máy
                </span>
              )}
            </div>
            <span className="font-bold text-sky-600 dark:text-sky-400">{progressPercent}%</span>
          </div>
          <Progress value={progressPercent} className="h-2 w-full bg-sky-100 dark:bg-slate-800" />
        </div>

        {/* Right: 4 Phases Grouped Step Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {LEARNING_PHASES.map((phase) => {
            const isPhaseActive = phase.id === currentPhase.id;
            const phaseCompleted = phase.steps.every((s) => completedSteps.includes(s));

            return (
              <div
                key={phase.id}
                className={`flex items-center gap-1 p-1 rounded-xl transition-all ${
                  isPhaseActive
                    ? 'bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800'
                    : 'bg-muted/40'
                }`}
                title={`Chặng ${phase.id}: ${phase.name}`}
              >
                {phase.stepIndexes.map((idx) => {
                  const step = ORDERED_STEPS[idx];
                  const isCompleted = completedSteps.includes(step);
                  const isCurrent = idx === currentStepIndex;

                  return (
                    <button
                      key={step}
                      type="button"
                      onClick={() => onSelectStep?.(idx)}
                      title={`Bước ${idx + 1}: ${formatStepName(step)}`}
                      className={`relative flex items-center justify-center w-6 h-6 rounded-lg text-[11px] font-bold transition-all ${
                        isCurrent
                          ? 'bg-sky-600 text-white ring-2 ring-sky-300 dark:ring-sky-700 shadow-sm scale-110'
                          : isCompleted
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                          : 'bg-background/80 text-muted-foreground hover:bg-background'
                      }`}
                    >
                      {isCompleted && !isCurrent ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <span>{idx + 1}</span>
                      )}
                    </button>
                  );
                })}
              </div>
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
      return 'Khởi động';
    case 'vocab_preview':
      return 'Nối nghĩa từ vựng';
    case 'reading_passage':
      return 'Đọc bài hiểu sâu';
    case 'comprehension':
      return 'Trả lời câu hỏi';
    case 'idioms':
      return 'Thành ngữ';
    case 'summary':
      return 'Tóm tắt bài';
    case 'listening_dictation':
      return 'Nghe hội thoại';
    case 'grammar_inline':
      return 'Ngữ pháp';
    case 'guided_writing':
      return 'Luyện viết đoạn';
    case 'review_quiz':
      return 'Kiểm tra tổng hợp';
  }
}
