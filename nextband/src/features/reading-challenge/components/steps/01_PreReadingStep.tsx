import React, { useState } from 'react';
import { PreReadingConfig, PredictivePollClaim } from '../../types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Lightbulb, 
  Eye, 
  CheckCircle, 
  ChevronRight, 
  MessageSquareQuote,
  HelpCircle,
  Sparkles,
  Check,
  X,
  Vote
} from 'lucide-react';

interface PreReadingStepProps {
  config: PreReadingConfig;
  onComplete: () => void;
}

// Fallback claims generator from questions if predictivePoll is not defined
function getDefaultPollClaims(config: PreReadingConfig): PredictivePollClaim[] {
  if (config.predictivePoll && config.predictivePoll.length > 0) {
    return config.predictivePoll;
  }

  // Derive 3 engaging claims from questions & prompt
  return [
    {
      id: 'poll-1',
      claim: config.questions[0]?.question
        ? `I predict that: ${config.questions[0].question.replace(/\?$/, '')}.`
        : 'The reading passage presents unexpected facts about this topic.',
      isTrueInPassage: true,
      explanation: config.questions[0]?.sampleAnswer || 'This topic is explored in detail in the passage.',
    },
    {
      id: 'poll-2',
      claim: config.questions[1]?.question
        ? `People generally believe that: ${config.questions[1].question.replace(/\?$/, '')}.`
        : 'The passage contradicts common knowledge regarding this topic.',
      isTrueInPassage: false,
      explanation: config.questions[1]?.sampleAnswer || 'Read the passage to verify the surprising details.',
    },
    {
      id: 'poll-3',
      claim: config.questions[2]?.question
        ? `The facts show that: ${config.questions[2].question.replace(/\?$/, '')}.`
        : 'Special techniques or unique methods are used according to the text.',
      isTrueInPassage: true,
      explanation: config.questions[2]?.sampleAnswer || 'Confirmed by the reading passage.',
    },
  ];
}

export const PreReadingStep: React.FC<PreReadingStepProps> = ({ config, onComplete }) => {
  const [activeTab, setActiveTab] = useState<'poll' | 'discuss'>('poll');
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  // Poll votes: map claimId -> 'True' | 'False'
  const [votes, setVotes] = useState<Record<string, 'True' | 'False'>>({});
  const [isPollSubmitted, setIsPollSubmitted] = useState(false);

  const claims = getDefaultPollClaims(config);

  const handleVote = (id: string, value: 'True' | 'False') => {
    if (isPollSubmitted) return;
    setVotes((prev) => ({ ...prev, [id]: value }));
  };

  const handleToggleDiscussion = (id: string) => {
    setRevealedAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const totalVotes = Object.keys(votes).length;
  const isAllVoted = totalVotes === claims.length;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Intro Header Card */}
      <div className="bg-gradient-to-br from-sky-50 via-indigo-50/50 to-amber-50/40 dark:from-slate-900 dark:via-sky-950/40 dark:to-indigo-950/30 border border-sky-100 dark:border-sky-900/60 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold shadow-xs">
              <MessageSquareQuote className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                  Warm-up & Schema Activation
                </h2>
                <span className="text-xs bg-sky-500/10 text-sky-700 dark:text-sky-300 px-2.5 py-0.5 rounded-full font-bold border border-sky-500/20">
                  Step 1 / 10
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">
                Kích hoạt tri thức nền & dự đoán trước khi đọc bài để tăng tốc độ hiểu.
              </p>
            </div>
          </div>

          {/* Sub-tab switcher */}
          <div className="flex items-center bg-muted/60 p-1 rounded-2xl border text-xs font-semibold self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab('poll')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                activeTab === 'poll'
                  ? 'bg-background text-foreground shadow-xs font-bold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Vote className="w-3.5 h-3.5 text-sky-600" />
              <span>Predictive Quick-Poll</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('discuss')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                activeTab === 'discuss'
                  ? 'bg-background text-foreground shadow-xs font-bold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span>Discussion Qs</span>
            </button>
          </div>
        </div>

        <p className="text-sm sm:text-base text-foreground/80 leading-relaxed font-medium mt-4">
          {config.introPrompt}
        </p>

        {config.imageUrl && (
          <div className="mt-5 overflow-hidden rounded-2xl border border-sky-200/60 dark:border-sky-800/50 shadow-md group">
            <img
              src={config.imageUrl}
              alt="Pre-reading visual"
              className="w-full h-56 sm:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {config.imageCaption && (
              <div className="bg-background/90 backdrop-blur px-4 py-2 text-xs text-muted-foreground border-t">
                📷 {config.imageCaption}
              </div>
            )}
          </div>
        )}
      </div>

      {activeTab === 'poll' ? (
        /* Tab 1: Interactive Predictive Quick-Poll */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <Vote className="w-4 h-4 text-sky-600" />
              <span>Dự đoán nội dung bài đọc (Predictive Quick-Poll)</span>
            </h3>
            <span className="text-xs font-semibold text-muted-foreground">
              Đã vote: <span className="text-sky-600 font-bold">{totalVotes}</span> / {claims.length} câu
            </span>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground">
            Hãy bình chọn xem bạn nghĩ các nhận định dưới đây là <strong>ĐÚNG (True)</strong> hay <strong>SAI (False)</strong>. Bạn sẽ kiểm chứng lại đáp án khi đọc xong bài ở Step 3!
          </p>

          <div className="space-y-3.5">
            {claims.map((item, idx) => {
              const userVote = votes[item.id];
              return (
                <Card
                  key={item.id}
                  className="border-border/70 hover:border-sky-300 transition-all shadow-xs rounded-2xl overflow-hidden"
                >
                  <CardContent className="p-4 sm:p-5 space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-sm sm:text-base font-semibold text-foreground flex-1">
                        {item.claim}
                      </p>
                    </div>

                    {/* Voting Choice Buttons */}
                    <div className="flex items-center gap-3 pl-9">
                      <button
                        type="button"
                        onClick={() => handleVote(item.id, 'True')}
                        className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                          userVote === 'True'
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                            : 'bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground border-border/70'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        TRUE (Đúng)
                      </button>

                      <button
                        type="button"
                        onClick={() => handleVote(item.id, 'False')}
                        className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                          userVote === 'False'
                            ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                            : 'bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground border-border/70'
                        }`}
                      >
                        <X className="w-3.5 h-3.5" />
                        FALSE (Sai)
                      </button>

                      {userVote && (
                        <span className="text-[11px] text-muted-foreground italic ml-2">
                          Đã chọn: <strong className="text-foreground">{userVote}</strong>
                        </span>
                      )}
                    </div>

                    {/* Reveal after voting */}
                    {isPollSubmitted && (
                      <div className="mt-3 ml-9 p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900/60 text-xs text-sky-900 dark:text-sky-200 animate-in fade-in">
                        <div className="flex items-center gap-1.5 font-bold mb-1">
                          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                          <span>Thực tế trong bài đọc:</span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              item.isTrueInPassage ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {item.isTrueInPassage ? 'TRUE' : 'FALSE'}
                          </span>
                        </div>
                        <p className="leading-relaxed opacity-90">{item.explanation}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {!isPollSubmitted ? (
            <div className="pt-2 flex justify-end">
              <Button
                type="button"
                disabled={!isAllVoted}
                onClick={() => setIsPollSubmitted(true)}
                className="rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs px-5 h-9 shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                Khóa dự đoán & Xem phân tích sơ bộ
              </Button>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs flex items-center justify-between">
              <span>🎉 Bạn đã hoàn thành phần dự đoán! Hãy tiếp tục đọc bài để kiểm chứng.</span>
            </div>
          )}
        </div>
      ) : (
        /* Tab 2: Classic Discussion Questions */
        <div className="space-y-4">
          <h3 className="text-base font-bold text-foreground flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            Think & Discuss Questions
          </h3>

          {config.questions.map((q, idx) => {
            const isRevealed = revealedAnswers[q.id];

            return (
              <Card key={q.id} className="border-border/60 hover:border-sky-300/80 transition-all shadow-xs rounded-2xl">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300 text-xs font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <p className="text-sm sm:text-base font-semibold text-foreground">
                          {q.question}
                        </p>
                      </div>

                      {q.hint && (
                        <p className="text-xs text-muted-foreground pl-8 italic">
                          💡 Hint: {q.hint}
                        </p>
                      )}
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleDiscussion(q.id)}
                      className="shrink-0 text-xs h-8 rounded-xl border-dashed"
                    >
                      <Eye className="w-3.5 h-3.5 mr-1" />
                      {isRevealed ? 'Hide Model' : 'View Model'}
                    </Button>
                  </div>

                  {isRevealed && (
                    <div className="mt-4 ml-8 p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 animate-in fade-in slide-in-from-top-2">
                      <span className="font-semibold block mb-1">Sample Answer & Idea:</span>
                      {q.sampleAnswer}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Step Completion Action */}
      <div className="pt-4 flex justify-end">
        <Button
          type="button"
          onClick={onComplete}
          className="rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-semibold px-6 py-5 shadow-lg shadow-sky-600/20"
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          Tiếp tục sang Vocab Preview (Step 2)
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};
