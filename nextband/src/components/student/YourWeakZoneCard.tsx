import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Flame, Zap, RotateCcw, ArrowRight } from 'lucide-react';
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
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [drillAnswers, setDrillAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    async function loadData() {
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
    }
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
      setDrillModalOpen(true);
    } catch (err) {
      alert('Không thể tạo bài luyện tập tức thì.');
    } finally {
      setIsGeneratingDrill(false);
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

      {/* MODAL ERROR BANK */}
      <Dialog open={isErrorBankOpen} onOpenChange={setIsErrorBankOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base font-bold text-foreground">
              <RotateCcw className="w-4 h-4 text-rose-500" />
              <span>Personal Error Bank — Sổ Tay Lỗi Sai</span>
              <Badge className="bg-rose-50 text-rose-700 border-rose-200 text-xs">{errorBank.length} câu cần khắc phục</Badge>
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">Tổng hợp các câu sai trong bài tập. Luyện lại để khắc phục lỗ hổng kiến thức.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 mt-3">
            {errorBank.map((err, idx) => (
              <div key={err.id || idx} className="border border-border/80 rounded-xl p-3 bg-muted/20 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-foreground flex items-center gap-1.5">
                    <span className="h-5 w-5 rounded-full bg-rose-100 text-rose-700 font-bold inline-flex items-center justify-center text-[10px]">{idx + 1}</span>
                    {err.examTitle}
                  </span>
                  <Badge variant="outline" className="text-[10px]">{err.label}</Badge>
                </div>
                <div className="text-xs text-foreground font-medium bg-card p-2.5 rounded-lg border border-border/50">{err.prompt}</div>
                <div className="text-xs text-rose-600 bg-rose-50 px-2 py-0.5 rounded inline-block font-medium">Đáp án của bạn: <strong>{err.studentAnswer || '(Để trống)'}</strong></div>
                {err.explanation && <p className="text-[11px] text-muted-foreground italic border-l-2 border-amber-400 pl-2">💡 {err.explanation}</p>}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* MODAL DRILL */}
      <Dialog open={drillModalOpen} onOpenChange={setDrillModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base font-bold">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Luyện tập mục tiêu: {drillData?.label}</span>
              <Badge variant="outline" className="text-xs font-mono">Câu {currentQuestionIdx + 1}/{drillData?.questions?.length || 0}</Badge>
            </DialogTitle>
          </DialogHeader>
          {currentQ && (
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
                  <Button size="sm" onClick={() => { alert('Hoàn thành bài luyện tập dạng yếu!'); setDrillModalOpen(false); }} className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold">Hoàn thành & Lưu</Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};