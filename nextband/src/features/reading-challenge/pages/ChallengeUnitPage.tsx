import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getUnitByNumber } from '../data';
import { useUnitProgress } from '../hooks/useUnitProgress';
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
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const ChallengeUnitPage: React.FC = () => {
  const { unitId } = useParams<{ unitId: string }>();
  const parsedUnitNumber = parseInt(unitId || '1', 10);
  const unit = getUnitByNumber(parsedUnitNumber);

  const {
    currentStep,
    currentStepIndex,
    completedSteps,
    progress,
    goToStepIndex,
    completeStep,
    nextStep,
    saveWritingDraft,
    resetProgress,
  } = useUnitProgress(unit ? unit.unitNumber : 0);

  if (!unit) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Unit not found</h2>
          <p className="text-muted-foreground text-sm">
            Unit {unitId} is not available or still under development.
          </p>
          <Link to="/reading-challenge">
            <Button className="rounded-2xl">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Catalog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

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
            onComplete={(score) => {
              completeStep('review_quiz', null, { reviewQuizScore: score });
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
        onSelectStep={goToStepIndex}
      />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8">
        {renderActiveStep()}
      </main>

      {/* Side-Passage Slide-over Drawer for Steps 4 (Comprehension), 5 (Idioms), 6 (Summary) */}
      {(currentStep === 'comprehension' || currentStep === 'idioms' || currentStep === 'summary') && (
        <SidePassageDrawer unit={unit} />
      )}
    </div>
  );
};
