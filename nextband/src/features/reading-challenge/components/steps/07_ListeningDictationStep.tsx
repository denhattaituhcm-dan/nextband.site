import React, { useState } from 'react';
import { ListeningDictationConfig } from '../../types';
import { ModernAudioBar } from '../shared/ModernAudioBar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Volume2, CheckCircle2, ChevronRight, ArrowRight, Eye, HelpCircle } from 'lucide-react';
import * as Diff from 'diff';

interface ListeningDictationStepProps {
  config: ListeningDictationConfig;
  onComplete: (comprehensionScore: number, dictationAccuracy: number) => void;
}

export const ListeningDictationStep: React.FC<ListeningDictationStepProps> = ({
  config,
  onComplete,
}) => {
  const [userTranscript, setUserTranscript] = useState('');
  const [isDictationEvaluated, setIsDictationEvaluated] = useState(false);
  const [showFullTranscript, setShowFullTranscript] = useState(false);

  // Comprehension questions state (3 questions from textbook)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isComprehensionSubmitted, setIsComprehensionSubmitted] = useState(false);

  const cleanText = (str: string) =>
    str
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'’]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();

  const calculateAccuracy = () => {
    const original = cleanText(config.fullTranscript);
    const typed = cleanText(userTranscript);

    if (!typed) return 0;

    const originalWords = original.split(' ');
    const typedWords = typed.split(' ');

    let matched = 0;
    typedWords.forEach((word) => {
      if (originalWords.includes(word)) {
        matched++;
      }
    });

    const acc = Math.round((matched / Math.max(originalWords.length, 1)) * 100);
    return Math.min(100, Math.max(0, acc));
  };

  const calculateComprehensionScore = () => {
    let count = 0;
    config.questions.forEach((q) => {
      if (selectedAnswers[q.id]?.toLowerCase() === q.correctAnswer.toLowerCase()) {
        count++;
      }
    });
    return count;
  };

  const handleSelectOption = (questionId: string, key: string) => {
    if (isComprehensionSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: key }));
  };

  const allComprehensionAnswered = config.questions.every((q) => selectedAnswers[q.id]);
  const comprehensionScore = calculateComprehensionScore();
  const accuracy = calculateAccuracy();

  const diffResult = Diff.diffWords(
    cleanText(config.fullTranscript),
    cleanText(userTranscript)
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="bg-gradient-to-r from-violet-500/10 to-sky-500/10 border border-violet-100 dark:border-violet-900/60 rounded-3xl p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-violet-500/20 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Listening & Dictation (Track {config.trackNumber})
              </h2>
              <p className="text-sm text-muted-foreground">
                Listen to the dialogue, answer comprehension questions, and practice dictation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Audio Playback Bar */}
      <ModernAudioBar audioUrl={config.audioUrl} title={`${config.dialogTitle} (Track ${config.trackNumber})`} badge="Dialogue" />

      {/* Section 1: Textbook 3 Comprehension Questions */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-violet-600" />
          Listening Comprehension Questions
        </h3>

        {config.questions.map((q) => {
          const userAns = selectedAnswers[q.id];
          const isCorrect = userAns === q.correctAnswer;

          return (
            <Card key={q.id} className="border border-border/70 rounded-2xl overflow-hidden shadow-xs">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-violet-100 text-violet-800 dark:bg-violet-900/60 dark:text-violet-300 text-xs font-bold flex items-center justify-center shrink-0">
                    {q.questionNumber}
                  </span>
                  <p className="text-sm sm:text-base font-semibold text-foreground">
                    {q.questionText}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {q.options.map((opt) => {
                    const isSelected = userAns === opt.key;
                    let style = 'border-border/60 hover:border-violet-300';

                    if (isComprehensionSubmitted) {
                      if (opt.key === q.correctAnswer) {
                        style = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold';
                      } else if (isSelected && !isCorrect) {
                        style = 'border-rose-400 bg-rose-50 text-rose-900 line-through';
                      } else {
                        style = 'opacity-50';
                      }
                    } else if (isSelected) {
                      style = 'border-violet-600 bg-violet-50 dark:bg-violet-950/50 text-violet-900 dark:text-violet-100 font-bold';
                    }

                    return (
                      <button
                        key={opt.key}
                        type="button"
                        disabled={isComprehensionSubmitted}
                        onClick={() => handleSelectOption(q.id, opt.key)}
                        className={`text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-center gap-2.5 ${style}`}
                      >
                        <span className="w-5 h-5 rounded-full border text-[11px] font-bold flex items-center justify-center uppercase shrink-0">
                          {opt.key}
                        </span>
                        <span>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                {isComprehensionSubmitted && q.explanation && (
                  <p className="text-xs text-muted-foreground pt-1 italic">
                    💡 {q.explanation}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}

        {!isComprehensionSubmitted && (
          <div className="flex justify-end">
            <Button
              type="button"
              disabled={!allComprehensionAnswered}
              onClick={() => setIsComprehensionSubmitted(true)}
              className="rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs h-9 font-semibold"
            >
              Check Listening Comprehension
            </Button>
          </div>
        )}
      </div>

      {/* Section 2: Transcript Dictation & Auto-Check */}
      <Card className="border border-border/70 rounded-3xl overflow-hidden shadow-xs mt-6">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Transcript Dictation Practice:
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowFullTranscript(!showFullTranscript)}
              className="text-xs h-7 rounded-xl"
            >
              <Eye className="w-3.5 h-3.5 mr-1" />
              {showFullTranscript ? 'Hide Dialogue Transcript' : 'Show Dialogue Transcript'}
            </Button>
          </div>

          {showFullTranscript && (
            <div className="p-4 bg-muted/60 rounded-2xl text-xs sm:text-sm text-foreground/80 space-y-1.5 animate-in fade-in">
              <p className="font-bold text-sky-600">Full Transcript:</p>
              <pre className="whitespace-pre-wrap font-sans leading-relaxed">
                {config.fullTranscript}
              </pre>
            </div>
          )}

          <Textarea
            value={userTranscript}
            onChange={(e) => setUserTranscript(e.target.value)}
            disabled={isDictationEvaluated}
            placeholder="Type what you hear from the audio track here..."
            className="min-h-[120px] rounded-2xl resize-none font-sans text-sm p-4 border-dashed"
          />

          {isDictationEvaluated && (
            <div className="p-4 rounded-2xl bg-muted/30 border space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-muted-foreground uppercase">
                  Real-time Diff Analysis:
                </span>
                <span className="text-xs font-bold text-violet-600">
                  Accuracy: {accuracy}%
                </span>
              </div>
              <div className="text-sm leading-relaxed font-mono flex flex-wrap gap-1.5">
                {diffResult.map((part, index) => {
                  if (part.added) {
                    return (
                      <span key={index} className="bg-rose-100 text-rose-800 dark:bg-rose-950 px-1 rounded line-through">
                        {part.value}
                      </span>
                    );
                  }
                  if (part.removed) {
                    return (
                      <span key={index} className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 px-1 rounded font-bold">
                        [{part.value}]
                      </span>
                    );
                  }
                  return <span key={index} className="text-foreground">{part.value}</span>;
                })}
              </div>
            </div>
          )}

          {!isDictationEvaluated && (
            <div className="flex justify-end">
              <Button
                type="button"
                onClick={() => setIsDictationEvaluated(true)}
                className="rounded-xl text-xs h-9 bg-slate-800 text-white"
              >
                Evaluate Dictation
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Completion Button */}
      <div className="pt-4 flex justify-end">
        <Button
          type="button"
          onClick={() => onComplete(comprehensionScore, accuracy)}
          className="rounded-2xl bg-violet-600 hover:bg-violet-500 text-white font-semibold px-6 py-5 shadow-lg shadow-violet-600/20"
        >
          Continue to Grammar
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};
