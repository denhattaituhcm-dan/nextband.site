import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getUnitByNumber } from '../data';
import { useUnitProgress, ORDERED_STEPS } from '../hooks/useUnitProgress';
import { ChallengeHeader } from '../components/layout/ChallengeHeader';

// 10 Steps
import { PreReadingStep } from '../components/steps/01_PreReadingStep';
import { VocabPreviewStep } from '../components/steps/02_VocabPreviewStep';
import { ReadingPassageStep } from '../components/steps/03_ReadingPassageStep';
import { ComprehensionStep } from '../components/steps/04_ComprehensionStep';
import { IdiomsStep } from '../components/steps/05_IdiomsStep';
import { SummaryStep } from '../components/steps/06_SummaryStep';
import { ListeningDictationStep } from '../components/steps/07_ListeningDictationStep';
import { GrammarInlineStep } from '../components/steps/08_GrammarInlineStep';
import { GuidedWritingStep } from '../components/steps/09_GuidedWritingStep';
import { ReviewQuizStep } from '../components/steps/10_ReviewQuizStep';
import { SidePassageDrawer } from '../components/shared/SidePassageDrawer';
import { ReadingPassagePane } from '../components/shared/ReadingPassagePane';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

export const ChallengeUnitPage: React.FC = () => {
  const { unitId } = useParams<{ unitId: string }>();
  const parsedUnitNumber = parseInt(unitId || '1', 10);
  const unit = getUnitByNumber(parsedUnitNumber);

  const {
    progress,
    currentStep,
    currentStepIndex,
    completedSteps,
    syncStatus,
    isAuthenticated,
    goToStepIndex,
    completeStep,
    nextStep,
    prevStep,
    saveWritingDraft,
    resetProgress,
  } = useUnitProgress(unit ? unit.unitNumber : 0);

  if (!unit) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Không tìm thấy bài học</h2>
          <p className="text-muted-foreground text-sm">
            Unit {unitId} hiện chưa khả dụng hoặc đang được hoàn thiện.
          </p>
          <Link to="/reading-challenge">
            <Button className="rounded-2xl">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại danh sách Unit
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const isSplitScreenStep = currentStep === 'comprehension' || currentStep === 'idioms' || currentStep === 'summary';

  const renderActiveStep = () => {
    switch (currentStep) {
      case 'pre_reading':
        return (
          <PreReadingStep
            config={unit.preReading}
            onComplete={() => {
              completeStep('pre_reading');
              nextStep();
            }}
          />
        );

      case 'vocab_preview':
        return (
          <VocabPreviewStep
            config={unit.vocabPreview}
            savedAnswers={progress.stepAnswers?.vocab_preview}
            savedScore={progress.scores?.vocabPreviewScore}
            onComplete={(score, answers) => {
              completeStep('vocab_preview', answers, { vocabPreviewScore: score });
              nextStep();
            }}
          />
        );

      case 'reading_passage':
        return (
          <ReadingPassageStep
            unit={unit}
            savedWpm={progress.readingWpm}
            savedSeconds={progress.readingSeconds}
            onComplete={(wpm, readingSeconds) => {
              completeStep('reading_passage', { wpm, readingSeconds });
              nextStep();
            }}
          />
        );

      case 'comprehension':
        return (
          <ComprehensionStep
            questions={unit.readingComprehension}
            savedAnswers={progress.stepAnswers?.comprehension}
            savedScore={progress.scores?.comprehensionScore}
            onComplete={(score, answers) => {
              completeStep('comprehension', answers, { comprehensionScore: score });
              nextStep();
            }}
          />
        );

      case 'idioms':
        return (
          <IdiomsStep
            idioms={unit.idioms}
            savedAnswers={progress.stepAnswers?.idioms}
            savedScore={progress.scores?.idiomsScore}
            onComplete={(score, answers) => {
              completeStep('idioms', answers, { idiomsScore: score });
              nextStep();
            }}
          />
        );

      case 'summary':
        return (
          <SummaryStep
            summary={unit.summary}
            savedAnswers={progress.stepAnswers?.summary}
            savedScore={progress.scores?.summaryScore}
            onComplete={(score, answers) => {
              completeStep('summary', answers, { summaryScore: score });
              nextStep();
            }}
          />
        );

      case 'listening_dictation':
        return (
          <ListeningDictationStep
            config={unit.listeningDictation}
            savedAnswers={progress.stepAnswers?.listening_dictation}
            savedComprehensionScore={progress.scores?.listeningScore}
            savedAccuracy={progress.scores?.dictationAccuracy}
            onComplete={(comprehensionScore, accuracy) => {
              completeStep('listening_dictation', null, { 
                listeningScore: comprehensionScore,
                dictationAccuracy: accuracy 
              });
              nextStep();
            }}
          />
        );

      case 'grammar_inline':
        return (
          <GrammarInlineStep
            config={unit.grammar}
            savedAnswers={progress.stepAnswers?.grammar_inline}
            savedScore={progress.scores?.grammarScore}
            onComplete={(score, answers) => {
              completeStep('grammar_inline', answers, { grammarScore: score });
              nextStep();
            }}
          />
        );

      case 'guided_writing':
        return (
          <GuidedWritingStep
            config={unit.guidedWriting}
            initialDraft={progress.writingDraft}
            onSaveDraft={saveWritingDraft}
            onComplete={(writing) => {
              saveWritingDraft(writing);
              completeStep('guided_writing', { text: writing });
              nextStep();
            }}
          />
        );

      case 'review_quiz':
        return (
          <ReviewQuizStep
            questions={unit.reviewQuiz}
            unitNumber={unit.unitNumber}
            savedAnswers={progress.stepAnswers?.review_quiz}
            savedScore={progress.scores?.reviewQuizScore}
            readingWpm={progress.readingWpm}
            onComplete={(score, answers) => {
              completeStep('review_quiz', answers, { reviewQuizScore: score });
            }}
            onResetUnit={resetProgress}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 flex flex-col">
      <ChallengeHeader
        unit={unit}
        currentStepIndex={currentStepIndex}
        completedSteps={completedSteps}
        syncStatus={syncStatus}
        isAuthenticated={isAuthenticated}
        onSelectStep={goToStepIndex}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        {/* Split-screen layout for comprehension, idioms, summary on desktop */}
        {isSplitScreenStep ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Sticky Reading Passage Reference */}
            <aside className="hidden lg:block lg:col-span-5 lg:sticky lg:top-20">
              <ReadingPassagePane unit={unit} />
            </aside>

            {/* Right Column: Step exercise */}
            <div className="lg:col-span-7">
              {renderActiveStep()}
            </div>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            {renderActiveStep()}
          </div>
        )}

        {/* Global Bottom Step Navigation */}
        <div className="max-w-4xl mx-auto mt-10 pt-6 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
          <Button
            type="button"
            variant="ghost"
            disabled={currentStepIndex === 0}
            onClick={prevStep}
            className="rounded-xl text-xs"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Bước trước
          </Button>

          <span>
            Bước {currentStepIndex + 1} / {ORDERED_STEPS.length}
          </span>

          <Button
            type="button"
            variant="ghost"
            disabled={currentStepIndex === ORDERED_STEPS.length - 1}
            onClick={nextStep}
            className="rounded-xl text-xs"
          >
            Bước tiếp theo
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </main>

      {/* Floating Side-Passage Slide-over Drawer for mobile screens */}
      {isSplitScreenStep && (
        <div className="lg:hidden">
          <SidePassageDrawer unit={unit} />
        </div>
      )}
    </div>
  );
};
