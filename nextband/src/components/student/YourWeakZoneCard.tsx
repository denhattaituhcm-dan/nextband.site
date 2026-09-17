import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Flame, Zap, RotateCcw, ArrowRight, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import { studentPracticeApi } from '@/lib/api';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

export const YourWeakZoneCard: React.FC = () => {
  const [weakZone, setWeakZone] = useState<any>(null);
  const [errorBank, setErrorBank] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isErrorBankOpen, setIsErrorBankOpen] = useState(false);
  const [drillModalOpen, setDrillModalOpen] = useState(false);
  const [drillData, setDrillData] = useState<any>(null);
  const [isGeneratingDrill, setIsGeneratingDrill] = useState(false);
  const [isSubmittingDrill, setIsSubmittingDrill] = useState(false);
  const [drillResult, setDrillResult] = useState<any>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [drillAnswers, setDrillAnswers] = useState<Record<string, string>>({});

  // Single question retry in Error Bank
  const [retryAnswers, setRetryAnswers] = useState<Record<string, string>>({});
  const [retryResults, setRetryResults] = useState<Record<string, { isCorrect: boolean; correctAnswer: string; explanation?: string }>>({});
  const [isRetryingMap, setIsRetryingMap] = useState<Record<string, boolean>>({});

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [wz, eb] = await Promise.all([
        studentPracticeApi.getWeakZone().catch(() => null),
        studentPracticeApi.getErrorBank().catch(() => []),
      ]);
      setWeakZone(wz);
      setErrorBank(eb || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStartDrill = async () => {
    try {
      setIsGeneratingDrill(true);
      const qType = weakZone?.topWeakness?.questionType || 'matching';
      const drill = await studentPracticeApi.generateWeakZoneDrill(qType, 6);
      setDrillData(drill);
      setCurrentQuestionIdx(0);
      setDrillAnswers({});
      setDrillResult(null);
      setDrillModalOpen(true);
    } catch (err) {
      alert('Không thể tạo bài luyện tập tức thì.');
    } finally {
      setIsGeneratingDrill(false);
    }
  };

  const handleSubmitDrill = async () => {
    try {
      setIsSubmittingDrill(true);
      const qType = drillData?.questionType || 'matching';
      const result = await studentPracticeApi.submitDrill(qType, drillAnswers);
      setDrillResult(result);
      // Reload weak zone & error bank in background
      loadData();
    } catch (err) {
      alert('Lỗi khi nộp bài chấm điểm. Vui lòng thử lại.');
    } finally {
      setIsSubmittingDrill(false);
    }
  };

  const handleRetrySingle = async (questionId: string) => {
    const ans = retryAnswers[questionId];
    if (!ans) return;

    try {
      setIsRetryingMap((prev) => ({ ...prev, [questionId]: true }));
      const res = await studentPracticeApi.retrySingleError(questionId, ans);
      setRetryResults((prev) => ({ ...prev, [questionId]: res }));
      if (res.isCorrect) {
        // Tự động xóa khỏi Error Bank sau 2 giây
        setTimeout(() => {
          setErrorBank((prev) => prev.filter((item) => item.questionId !== questionId));
        }, 2000);
      }
    } catch (err) {
      alert('Không thể kiểm tra câu trả lời.');
    } finally {
      setIsRetryingMap((prev) => ({ ...prev, [questionId]: false }));
    }
  };

  if (isLoading || (!weakZone?.topWeakness && errorBank.length === 0)) return null;
  const weakness = weakZone?.topWeakness;
  const currentQ = drillData?.questions?.[currentQuestionIdx];

  return (
    <>
      <Card className="border-amber-500/40 bg-gradient-to-br from-amber-500/10 via-card to-background shadow-sm relative overflow-hidden rounded-2xl mb-4">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500" />
        <CardHeader className="pb-3 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/20 text-amber-500 ring-4 ring-amber-500/10">
                <Flame className="h-4 w-4" />
              </span>
              <div>
                <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                  <span>Your Weak Zone — Vùng Cần Bứt Phá</span>
                  <Badge variant="outline" className="text-[10px] bg-amber-500/10 text-amber-600 border-amber-300 font-mono">AI Error Intelligence</Badge>
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground mt-0.5">Hệ thống tự động chẩn đoán dạng bài bạn cần cải thiện nhất từ các bài nộp gần đây.</CardDescription>
              </div>
            </div>
            {errorBank.length > 0 && (
              <Button variant="outline" size="sm" onClick={() => setIsErrorBankOpen(true)} className="text-xs font-semibold border-rose-200 text-rose-600 hover:bg-rose-50 h-8 gap-1">
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Error Bank ({errorBank.length} câu sai)</span>
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-1 pb-4">
          {weakness && (
            <div className="bg-card/70 border border-border/80 rounded-xl p-3 sm:p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge className="bg-rose-500/10 text-rose-600 border-rose-200 text-xs">{weakness.skill}</Badge>
                  <span className="font-bold text-sm text-foreground">{weakness.label}</span>
                  <span className="text-xs font-mono text-muted-foreground">(Chính xác: <strong className="text-rose-500">{weakness.accuracy}%</strong>)</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">{weakness.diagnosisVi}</p>
              </div>
              <Button onClick={handleStartDrill} disabled={isGeneratingDrill} className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs h-9 px-4 gap-2 shrink-0">
                <Zap className="w-3.5 h-3.5 fill-white" />
                <span>{isGeneratingDrill ? 'Đang tạo bài...' : 'Luyện ngay 6 câu dạng này'}</span>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* MODAL ERROR BANK WITH RETRY INLINE */}
      <Dialog open={isErrorBankOpen} onOpenChange={setIsErrorBankOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base font-bold text-foreground">
              <RotateCcw className="w-4 h-4 text-rose-500" />
              <span>Personal Error Bank — Sổ Tay Lỗi Sai</span>
              <Badge className="bg-rose-50 text-rose-700 border-rose-200 text-xs">{errorBank.length} câu cần khắc phục</Badge>
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">Làm lại đúng câu hỏi để tự động gỡ lỗi khỏi danh sách.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-3">
            {errorBank.map((err, idx) => {
              const res = retryResults[err.questionId];
              const isRetrying = isRetryingMap[err.questionId];

              return (
                <div key={err.id || idx} className="border border-border/80 rounded-xl p-3.5 bg-muted/20 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-foreground flex items-center gap-1.5">
                      <span className="h-5 w-5 rounded-full bg-rose-100 text-rose-700 font-bold inline-flex items-center justify-center text-[10px]">{idx + 1}</span>
                      {err.examTitle}
                    </span>
                    <Badge variant="outline" className="text-[10px]">{err.label}</Badge>
                  </div>
                  <div className="text-xs text-foreground font-medium bg-card p-2.5 rounded-lg border border-border/50">{err.prompt}</div>
                  
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <div className="text-xs text-rose-600 bg-rose-50 px-2 py-1 rounded font-medium">
                      Lỗi trước đây: <strong>{err.studentAnswer || '(Để trống)'}</strong>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Nhập đáp án thử lại..."
                        value={retryAnswers[err.questionId] || ''}
                        onChange={(e) => setRetryAnswers({ ...retryAnswers, [err.questionId]: e.target.value })}
                        className="text-xs p-1.5 px-2.5 rounded-lg border border-border bg-card w-40"
                      />
                      <Button
                        size="sm"
                        disabled={isRetrying || !retryAnswers[err.questionId]}
                        onClick={() => handleRetrySingle(err.questionId)}
                        className="text-xs h-7 px-3 bg-primary text-white font-semibold"
                      >
                        {isRetrying ? 'Kiểm tra...' : 'Sửa lỗi'}
                      </Button>
                    </div>
                  </div>

                  {res && (
                    <div className={`p-2.5 rounded-lg text-xs font-medium flex items-center justify-between ${res.isCorrect ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'}`}>
                      <div className="flex items-center gap-1.5">
                        {res.isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-rose-600" />}
                        <span>{res.isCorrect ? 'Chính xác! Câu này sẽ tự động được gỡ khỏi Error Bank.' : `Chưa đúng! Đáp án đúng: ${res.correctAnswer}`}</span>
                      </div>
                    </div>
                  )}

                  {err.explanation && <p className="text-[11px] text-muted-foreground italic border-l-2 border-amber-400 pl-2">💡 Giải thích: {err.explanation}</p>}
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>

      {/* MODAL DRILL WITH INSTANT GRADING & MASTERY FEEDBACK */}
      <Dialog open={drillModalOpen} onOpenChange={setDrillModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between text-base font-bold">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>Luyện tập mục tiêu: {drillData?.label}</span>
              </div>
              {!drillResult && (
                <Badge variant="outline" className="text-xs font-mono">Câu {currentQuestionIdx + 1}/{drillData?.questions?.length || 0}</Badge>
              )}
            </DialogTitle>
          </DialogHeader>

          {drillResult ? (
            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-primary/10 border border-emerald-500/30 text-center space-y-2">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-1">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  Hoàn thành! Bạn đạt {drillResult.correct}/{drillResult.total} câu ({drillResult.accuracy}%)
                </h3>
                <p className="text-xs text-muted-foreground">
                  +{drillResult.masteryGained}% điểm Mastery vào hồ sơ học thuật của bạn!
                </p>
              </div>

              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {drillResult.results.map((r: any, rIdx: number) => (
                  <div key={r.questionId || rIdx} className={`p-3 rounded-xl border text-xs space-y-1.5 ${r.isCorrect ? 'border-emerald-200 bg-emerald-50/40' : 'border-rose-200 bg-rose-50/40'}`}>
                    <div className="flex items-center justify-between font-semibold">
                      <span className="text-foreground">Câu {rIdx + 1}: {r.prompt}</span>
                      {r.isCorrect ? (
                        <Badge className="bg-emerald-100 text-emerald-700 border-0 text-[10px]">Đúng</Badge>
                      ) : (
                        <Badge className="bg-rose-100 text-rose-700 border-0 text-[10px]">Sai</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-[11px]">
                      <span>Bạn chọn: <strong>{r.studentAnswer || '(Trống)'}</strong></span>
                      {!r.isCorrect && <span className="text-emerald-700 font-bold">Đáp án đúng: {r.correctAnswer}</span>}
                    </div>
                    {r.explanation && <p className="text-[10px] text-muted-foreground italic">💡 {r.explanation}</p>}
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t text-right">
                <Button onClick={() => setDrillModalOpen(false)} className="text-xs bg-primary text-white font-bold">
                  Đóng & Trở về
                </Button>
              </div>
            </div>
          ) : currentQ ? (
            <div className="space-y-4 pt-2">
              {currentQ.passage && (
                <div className="max-h-40 overflow-y-auto p-3 bg-muted/40 rounded-xl text-xs leading-relaxed text-muted-foreground border">
                  <div className="font-bold text-foreground mb-1">Đoạn trích bài đọc:</div>
                  {currentQ.passage}
                </div>
              )}
              <div className="text-sm font-semibold text-foreground p-3 rounded-xl bg-card border">{currentQ.prompt}</div>
              {Array.isArray(currentQ.options) && currentQ.options.length > 0 ? (
                <div className="space-y-2">
                  {currentQ.options.map((opt: any, oIdx: number) => {
                    const optVal = typeof opt === 'string' ? opt : opt.text || opt.value || opt.label;
                    const optKey = typeof opt === 'string' ? String.fromCharCode(65 + oIdx) : opt.key || String.fromCharCode(65 + oIdx);
                    const isSelected = drillAnswers[currentQ.id] === optKey;
                    return (
                      <button
                        key={oIdx}
                        type="button"
                        onClick={() => setDrillAnswers((prev) => ({ ...prev, [currentQ.id]: optKey }))}
                        className={`w-full text-left p-3 rounded-xl border text-xs flex items-center justify-between transition-colors ${isSelected ? 'border-primary bg-primary/10 text-primary font-bold' : 'border-border bg-card hover:bg-muted/50 text-foreground'}`}
                      >
                        <span><strong className="mr-2 font-mono">{optKey}.</strong> {optVal}</span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <input
                  type="text"
                  placeholder="Nhập câu trả lời..."
                  value={drillAnswers[currentQ.id] || ''}
                  onChange={(e) => setDrillAnswers((prev) => ({ ...prev, [currentQ.id]: e.target.value }))}
                  className="w-full p-2.5 text-xs rounded-xl border border-border bg-card"
                />
              )}
              <div className="flex items-center justify-between pt-2 border-t">
                <Button variant="outline" size="sm" disabled={currentQuestionIdx === 0} onClick={() => setCurrentQuestionIdx((p) => p - 1)} className="text-xs">Câu trước</Button>
                {currentQuestionIdx < (drillData?.questions?.length || 0) - 1 ? (
                  <Button size="sm" onClick={() => setCurrentQuestionIdx((p) => p + 1)} className="text-xs gap-1">
                    <span>Câu tiếp theo</span>
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                ) : (
                  <Button size="sm" disabled={isSubmittingDrill} onClick={handleSubmitDrill} className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
                    {isSubmittingDrill ? 'Đang chấm điểm...' : 'Nộp bài & Chấm điểm tức thì'}
                  </Button>
                )}
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
};