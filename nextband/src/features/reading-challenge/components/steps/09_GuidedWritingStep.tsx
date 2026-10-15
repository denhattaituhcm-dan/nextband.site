import React, { useState, useMemo, useEffect } from 'react';
import { GuidedWritingConfig } from '../../types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  PenTool, 
  ChevronRight, 
  Eye, 
  Sparkles, 
  CheckCircle2, 
  RotateCcw, 
  Lightbulb, 
  Check, 
  AlertCircle,
  Copy,
  Puzzle,
  FileEdit
} from 'lucide-react';

interface GuidedWritingStepProps {
  config: GuidedWritingConfig;
  initialDraft?: string;
  onSaveDraft?: (text: string) => void;
  onComplete: (writing: string) => void;
}

interface SentenceItem {
  id: number;
  question: string;
  targetSentence: string;
  tokens: string[];
}

// Chunker helper to split sentence into natural pedagogical blocks
function getSentenceTokens(sentence: string): string[] {
  const words = sentence.trim().split(/\s+/);
  if (words.length <= 7) return words;

  const chunks: string[] = [];
  let current: string[] = [];

  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    current.push(w);
    const hasPunct = /[,;:.!?]$/.test(w);
    if ((hasPunct && current.length >= 2) || current.length >= 3 || i === words.length - 1) {
      chunks.push(current.join(' '));
      current = [];
    }
  }

  if (current.length > 0) {
    if (chunks.length > 0 && current.length === 1) {
      chunks[chunks.length - 1] += ' ' + current.join(' ');
    } else {
      chunks.push(current.join(' '));
    }
  }

  return chunks;
}

// Deterministic or seeded-like shuffle that doesn't match original order if possible
function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  // If array has >= 2 items and randomly matches original, swap first two
  if (copy.length >= 2 && copy.every((val, idx) => val === array[idx])) {
    [copy[0], copy[1]] = [copy[1], copy[0]];
  }
  return copy;
}

// Clean string normalization for matching
function normalizeText(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]/g, '');
}

export const GuidedWritingStep: React.FC<GuidedWritingStepProps> = ({
  config,
  initialDraft = '',
  onSaveDraft,
  onComplete,
}) => {
  // Mode switcher: 'builder' (Interactive auto-graded) | 'free' (Self-practice optional)
  const [activeTab, setActiveTab] = useState<'builder' | 'free'>('builder');

  // Parse model paragraph into individual sentences
  const sentenceItems = useMemo<SentenceItem[]>(() => {
    // Avoid premature splitting on a.m. / p.m.
    const cleanEx = config.exampleText
      .replace(/\n/g, ' ')
      .replace(/(\b[ap]\.m\.)\s+/gi, '$1__SPACE__');

    const rawSentences = cleanEx
      .split(/(?<=[.!?])\s+/)
      .map((s) => s.replace(/__SPACE__/g, ' ').trim())
      .filter((s) => s.length > 0);

    return rawSentences.map((target, idx) => {
      const q = config.promptQuestions[idx] || `(Question ${idx + 1})`;
      return {
        id: idx,
        question: q,
        targetSentence: target,
        tokens: getSentenceTokens(target),
      };
    });
  }, [config.exampleText, config.promptQuestions]);

  // Current sentence being solved
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);

  // Solved states: map sentenceId -> assembled string
  const [solvedSentences, setSolvedSentences] = useState<{ [id: number]: string }>({});

  // Tokens chosen in current builder: array of { token: string, originalIndex: number }
  const [selectedTokens, setSelectedTokens] = useState<{ token: string; key: string }[]>([]);

  // Available tokens for current sentence
  const [availableTokens, setAvailableTokens] = useState<{ token: string; key: string }[]>([]);

  // Validation state: null | 'correct' | 'wrong'
  const [checkStatus, setCheckStatus] = useState<null | 'correct' | 'wrong'>(null);

  // Copied alert
  const [copied, setCopied] = useState(false);

  // Free writing state
  const [freeDraft, setFreeDraft] = useState(initialDraft);
  const [showExample, setShowExample] = useState(false);

  const currentItem = sentenceItems[currentSentenceIndex];

  // Initialize or change available tokens when current sentence changes
  useEffect(() => {
    if (!currentItem) return;

    if (solvedSentences[currentItem.id]) {
      // Already solved
      setCheckStatus('correct');
      const tokensWithKeys = currentItem.tokens.map((t, idx) => ({ token: t, key: `${t}-${idx}` }));
      setSelectedTokens(tokensWithKeys);
      setAvailableTokens([]);
    } else {
      setCheckStatus(null);
      setSelectedTokens([]);
      const tokensWithKeys = currentItem.tokens.map((t, idx) => ({ token: t, key: `${t}-${idx}` }));
      setAvailableTokens(shuffleArray(tokensWithKeys));
    }
  }, [currentSentenceIndex, currentItem, solvedSentences]);

  // Add token to selection
  const handleSelectToken = (tokenObj: { token: string; key: string }) => {
    if (checkStatus === 'correct') return;
    setCheckStatus(null);
    setSelectedTokens((prev) => [...prev, tokenObj]);
    setAvailableTokens((prev) => prev.filter((item) => item.key !== tokenObj.key));
  };

  // Remove token from selection back to bank
  const handleDeselectToken = (tokenObj: { token: string; key: string }) => {
    if (checkStatus === 'correct') return;
    setCheckStatus(null);
    setSelectedTokens((prev) => prev.filter((item) => item.key !== tokenObj.key));
    setAvailableTokens((prev) => [...prev, tokenObj]);
  };

  // Reset current question
  const handleResetCurrent = () => {
    if (!currentItem) return;
    setCheckStatus(null);
    setSelectedTokens([]);
    const tokensWithKeys = currentItem.tokens.map((t, idx) => ({ token: t, key: `${t}-${idx}` }));
    setAvailableTokens(shuffleArray(tokensWithKeys));
  };

  // Provide hint: picks the next correct token and moves it into selected
  const handleHint = () => {
    if (!currentItem || checkStatus === 'correct') return;
    const nextTokenNeeded = currentItem.tokens[selectedTokens.length];
    if (!nextTokenNeeded) return;

    // Find in available tokens
    const foundIdx = availableTokens.findIndex((t) => t.token === nextTokenNeeded);
    if (foundIdx !== -1) {
      const tokenObj = availableTokens[foundIdx];
      setSelectedTokens((prev) => [...prev, tokenObj]);
      setAvailableTokens((prev) => prev.filter((_, i) => i !== foundIdx));
    }
  };

  // Show full solution
  const handleShowSolution = () => {
    if (!currentItem) return;
    const tokensWithKeys = currentItem.tokens.map((t, idx) => ({ token: t, key: `${t}-${idx}` }));
    setSelectedTokens(tokensWithKeys);
    setAvailableTokens([]);
    setCheckStatus('correct');
    setSolvedSentences((prev) => ({
      ...prev,
      [currentItem.id]: currentItem.targetSentence,
    }));
  };

  // Check current answer
  const handleCheck = () => {
    if (!currentItem) return;
    const assembled = selectedTokens.map((t) => t.token).join(' ');
    const isMatch = normalizeText(assembled) === normalizeText(currentItem.targetSentence);

    if (isMatch) {
      setCheckStatus('correct');
      setSolvedSentences((prev) => ({
        ...prev,
        [currentItem.id]: currentItem.targetSentence,
      }));
    } else {
      setCheckStatus('wrong');
    }
  };

  // Move to next question or stay
  const handleNextSentence = () => {
    if (currentSentenceIndex < sentenceItems.length - 1) {
      setCurrentSentenceIndex((prev) => prev + 1);
    }
  };

  const totalQuestions = sentenceItems.length;
  const completedCount = Object.keys(solvedSentences).length;
  const isAllComplete = completedCount === totalQuestions;

  // Final paragraph formed
  const completeParagraph = sentenceItems
    .map((item) => solvedSentences[item.id] || '')
    .filter(Boolean)
    .join(' ');

  const handleCopyParagraph = () => {
    navigator.clipboard.writeText(completeParagraph);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Free writing handlers
  const handleFreeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setFreeDraft(val);
    onSaveDraft?.(val);
  };

  const freeWordCount = freeDraft.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Step Header */}
      <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-emerald-500/10 border border-orange-100 dark:border-orange-900/60 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold shadow-xs">
              <PenTool className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                  Guided Writing: {config.title}
                </h2>
                <span className="text-xs bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 px-2.5 py-0.5 rounded-full font-bold border border-emerald-500/20">
                  Auto-Graded
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">
                Xây dựng và ghép đoạn văn hoàn chỉnh theo câu hỏi gợi ý với đáp án chuẩn.
              </p>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center bg-muted/60 p-1 rounded-2xl border text-xs font-semibold self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab('builder')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === 'builder'
                  ? 'bg-background text-foreground shadow-xs font-bold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Puzzle className="w-3.5 h-3.5 text-orange-600" />
              <span>Sentence Builder ({completedCount}/{totalQuestions})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('free')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === 'free'
                  ? 'bg-background text-foreground shadow-xs font-bold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <FileEdit className="w-3.5 h-3.5 text-sky-600" />
              <span>Tự viết tự do (Tùy chọn)</span>
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'builder' ? (
        <div className="space-y-6">
          {/* Question Navigator Dots */}
          <div className="flex items-center justify-between bg-card border border-border/70 rounded-2xl p-4 shadow-xs">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              {sentenceItems.map((item, idx) => {
                const isSolved = Boolean(solvedSentences[item.id]);
                const isCurrent = idx === currentSentenceIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCurrentSentenceIndex(idx)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      isCurrent
                        ? 'bg-orange-600 text-white shadow-sm'
                        : isSolved
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300/40'
                        : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    {isSolved ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 stroke-[3]" />
                    ) : (
                      <span>#{idx + 1}</span>
                    )}
                    <span>Câu {idx + 1}</span>
                  </button>
                );
              })}
            </div>

            <div className="text-xs font-bold text-muted-foreground whitespace-nowrap pl-3">
              Tiến độ: <span className="text-orange-600">{completedCount}</span> / {totalQuestions} câu
            </div>
          </div>

          {/* Active Question Box */}
          <Card className="border border-border/80 rounded-3xl shadow-sm overflow-hidden">
            <CardContent className="p-6 sm:p-7 space-y-6">
              {/* Prompt Question Display */}
              <div className="bg-orange-50/60 dark:bg-orange-950/30 border border-orange-200/70 dark:border-orange-900/60 rounded-2xl p-4 sm:p-5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-orange-700 dark:text-orange-400 block mb-1">
                  Câu hỏi gợi ý #{currentSentenceIndex + 1}:
                </span>
                <p className="text-base sm:text-lg font-bold text-foreground">
                  {currentItem?.question}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Nhấp chọn các từ/cụm từ bên dưới theo thứ tự chính xác để tạo thành câu trả lời chuẩn.
                </p>
              </div>

              {/* Assembled Sentence Drop Box */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-muted-foreground uppercase tracking-wider">
                    Câu bạn vừa ghép:
                  </span>
                  {selectedTokens.length > 0 && checkStatus !== 'correct' && (
                    <button
                      type="button"
                      onClick={handleResetCurrent}
                      className="text-xs text-muted-foreground hover:text-red-500 flex items-center gap-1 transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Xóa làm lại
                    </button>
                  )}
                </div>

                <div
                  className={`min-h-[72px] p-4 rounded-2xl border-2 flex flex-wrap items-center gap-2 transition-all ${
                    checkStatus === 'correct'
                      ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-500/60 shadow-xs'
                      : checkStatus === 'wrong'
                      ? 'bg-rose-50/70 dark:bg-rose-950/40 border-rose-400/80 shadow-xs'
                      : 'bg-muted/20 border-dashed border-border/90'
                  }`}
                >
                  {selectedTokens.length === 0 ? (
                    <span className="text-xs sm:text-sm text-muted-foreground/60 italic font-medium">
                      Nhấp vào các từ ở ngân hàng từ phía dưới để đưa vào câu tại đây...
                    </span>
                  ) : (
                    selectedTokens.map((item, idx) => (
                      <button
                        key={item.key}
                        type="button"
                        disabled={checkStatus === 'correct'}
                        onClick={() => handleDeselectToken(item)}
                        className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all transform active:scale-95 ${
                          checkStatus === 'correct'
                            ? 'bg-emerald-600 text-white cursor-default'
                            : 'bg-orange-600 text-white hover:bg-orange-700 shadow-xs'
                        }`}
                        title="Bấm để đưa từ này trở lại ngân hàng từ"
                      >
                        {item.token}
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Scrambled Word Bank */}
              {checkStatus !== 'correct' && (
                <div className="space-y-2.5">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                    Ngân hàng từ/cụm từ (Word Bank):
                  </span>
                  <div className="flex flex-wrap gap-2.5 p-4 bg-muted/30 rounded-2xl border">
                    {availableTokens.length === 0 ? (
                      <span className="text-xs text-muted-foreground italic">
                        Đã chọn hết tất cả các từ. Nhấn "Kiểm tra đáp án" bên dưới!
                      </span>
                    ) : (
                      availableTokens.map((item) => (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => handleSelectToken(item)}
                          className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-card border border-border/90 text-foreground hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50/50 dark:hover:bg-orange-950/30 transition-all shadow-2xs active:scale-95"
                        >
                          {item.token}
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Status Alert */}
              {checkStatus === 'correct' && (
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-sm flex items-start gap-3 animate-in fade-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Tuyệt vời! Câu trả lời chính xác:</span>
                    <p className="mt-0.5 font-serif italic text-base">
                      "{currentItem?.targetSentence}"
                    </p>
                  </div>
                </div>
              )}

              {checkStatus === 'wrong' && (
                <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-sm flex items-start gap-3 animate-in fade-in">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Chưa chính xác!</span> Hãy thử sắp xếp lại trật tự các từ hoặc sử dụng nút "Gợi ý" bên dưới nhé.
                  </div>
                </div>
              )}

              {/* Actions Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t">
                <div className="flex items-center gap-2">
                  {checkStatus !== 'correct' && (
                    <>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleHint}
                        disabled={selectedTokens.length >= (currentItem?.tokens.length || 0)}
                        className="rounded-xl text-xs h-9"
                      >
                        <Lightbulb className="w-3.5 h-3.5 mr-1 text-amber-500" />
                        Gợi ý (Hint)
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleShowSolution}
                        className="rounded-xl text-xs h-9 text-muted-foreground hover:text-foreground"
                      >
                        <Eye className="w-3.5 h-3.5 mr-1" />
                        Xem đáp án
                      </Button>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {checkStatus !== 'correct' ? (
                    <Button
                      type="button"
                      disabled={selectedTokens.length === 0}
                      onClick={handleCheck}
                      className="rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold px-6 shadow-md shadow-orange-600/20"
                    >
                      <Check className="w-4 h-4 mr-1.5" />
                      Kiểm tra câu
                    </Button>
                  ) : (
                    currentSentenceIndex < sentenceItems.length - 1 && (
                      <Button
                        type="button"
                        onClick={handleNextSentence}
                        className="rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 shadow-md shadow-emerald-600/20"
                      >
                        Câu tiếp theo
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    )
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Live Paragraph Reconstruction Preview */}
          <Card className="border border-border/80 rounded-3xl overflow-hidden shadow-xs">
            <div className="bg-muted/40 px-6 py-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-500" />
                <h3 className="font-bold text-sm text-foreground">
                  Đoạn văn mẫu hoàn chỉnh đang ghép (Assembled Paragraph):
                </h3>
              </div>
              {isAllComplete && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyParagraph}
                  className="text-xs h-8 rounded-xl"
                >
                  <Copy className="w-3.5 h-3.5 mr-1" />
                  {copied ? 'Đã sao chép!' : 'Sao chép đoạn văn'}
                </Button>
              )}
            </div>

            <CardContent className="p-6">
              <div className="space-y-3">
                {sentenceItems.map((item, idx) => {
                  const isSolved = Boolean(solvedSentences[item.id]);
                  return (
                    <div
                      key={item.id}
                      className={`p-3.5 rounded-2xl text-sm leading-relaxed transition-all ${
                        isSolved
                          ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 text-foreground font-serif'
                          : 'bg-muted/20 border border-dashed border-border/80 text-muted-foreground/60'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                            isSolved
                              ? 'bg-emerald-600 text-white'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <div className="flex-1">
                          {isSolved ? (
                            <span className="font-semibold text-emerald-950 dark:text-emerald-100">
                              {solvedSentences[item.id]}
                            </span>
                          ) : (
                            <span className="italic text-xs text-muted-foreground">
                              {item.question} — (Chưa hoàn thành)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {isAllComplete && (
                <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-200 dark:border-emerald-900/60 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-foreground">
                        Chúc mừng! Bạn đã hoàn thành xuất sắc đoạn văn ({totalQuestions}/{totalQuestions} câu)
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Bạn đã sẵn sàng để làm bài kiểm tra tổng hợp 10 câu (Review Quiz).
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        /* Tab 2: Optional Free Writing Sandbox */
        <Card className="border border-border/70 rounded-3xl overflow-hidden shadow-xs">
          <CardContent className="p-6 sm:p-7 space-y-5">
            <div className="p-4 bg-muted/40 rounded-2xl space-y-2 border">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                Câu hỏi gợi ý để bạn tự viết về bản thân:
              </span>
              <ul className="space-y-1.5 text-sm font-semibold text-foreground">
                {config.promptQuestions.map((q, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-sky-600 font-bold">•</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Đoạn văn mẫu từ sách giáo khoa (Model Example):
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowExample(!showExample)}
                  className="text-xs h-7 rounded-xl"
                >
                  <Eye className="w-3.5 h-3.5 mr-1" />
                  {showExample ? 'Ẩn bài mẫu' : 'Xem bài mẫu'}
                </Button>
              </div>

              {showExample && (
                <div className="p-4 bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-2xl text-xs sm:text-sm text-amber-950 dark:text-amber-200 leading-relaxed font-serif italic animate-in fade-in">
                  "{config.exampleText}"
                </div>
              )}
            </div>

            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground font-semibold">Đoạn văn tự viết của bạn:</span>
                <span className="font-bold text-sky-600">
                  {freeWordCount} từ (Không bắt buộc)
                </span>
              </div>

              <Textarea
                value={freeDraft}
                onChange={handleFreeChange}
                placeholder="Nhập đoạn văn của riêng bạn nếu muốn tự luyện tập thêm..."
                className="min-h-[170px] rounded-2xl resize-none font-serif text-base p-4 leading-relaxed"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Completion Button */}
      <div className="pt-4 flex justify-end">
        <Button
          type="button"
          disabled={!isAllComplete && freeWordCount < 10}
          onClick={() => onComplete(completeParagraph || freeDraft)}
          className={`rounded-2xl font-bold px-7 py-6 text-base transition-all shadow-lg ${
            isAllComplete
              ? 'bg-orange-600 hover:bg-orange-500 text-white shadow-orange-600/25 scale-100 hover:scale-[1.02]'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
          }`}
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Tiếp tục sang Bài kiểm tra tổng hợp (Review Quiz 10 câu)
          <ChevronRight className="w-5 h-5 ml-1" />
        </Button>
      </div>
    </div>
  );
};
