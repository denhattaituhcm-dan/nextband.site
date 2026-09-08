import { useState, useEffect } from "react";
import { Stethoscope, AlertTriangle, ShieldCheck, RefreshCw, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { academicIntelligenceApi } from "@/lib/api";

export default function DiagnosticExplorerPage() {
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await academicIntelligenceApi.getDiagnosticsOverview();
      setData(res);
    } catch (err: any) {
      setError(err.message || "Không thể tải dữ liệu chẩn đoán.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-teal-500/40 text-teal-400 bg-teal-500/10 font-mono text-[10px]">
              MODULE 2 • DIAGNOSTIC ENGINE
            </Badge>
            <Badge variant="outline" className="border-slate-700 bg-slate-900 text-slate-400 font-mono text-[10px]">
              DETERMINISTIC RULES • HYPOTHESIS ONLY
            </Badge>
          </div>
          <h1 className="text-2xl font-bold text-white mt-1.5 font-mono">Diagnostic Engine Telemetry</h1>
          <p className="text-sm text-slate-400 mt-1">
            Giám sát các bộ quy tắc phát hiện bẫy lỗi học thuật. Giả thuyết chẩn đoán hoàn toàn độc lập và không sửa đổi bài nộp gốc.
          </p>
        </div>

        <Button
          onClick={loadData}
          disabled={isLoading}
          variant="outline"
          className="border-teal-500/40 bg-teal-950/40 hover:bg-teal-900/60 text-teal-300 text-xs gap-2 font-mono"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin text-teal-400" : ""}`} />
          <span>Làm Mới</span>
        </Button>
      </div>

      {error && (
        <div className="p-3 rounded-md bg-rose-950/40 border border-rose-800 text-xs text-rose-300 flex items-center gap-2 font-mono">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Active Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(data?.activeRules || []).map((rule: any) => (
          <Card key={rule.ruleCode} className="border-slate-800 bg-slate-900/60">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="w-fit text-[10px] border-amber-500/30 text-amber-400 bg-amber-500/10 font-mono">
                  {rule.ruleCode}
                </Badge>
                <span className="text-[10px] text-slate-500 font-mono">Conf: {rule.confidence}</span>
              </div>
              <CardTitle className="text-sm font-bold text-white mt-2">
                {rule.name}
              </CardTitle>
              <CardDescription className="text-xs text-slate-400">
                {rule.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-xs font-mono text-slate-400 border-t border-slate-800/80 pt-3 flex items-center justify-between">
              <span>Mã lỗi: <code className="text-teal-400">{rule.errorCode}</code></span>
              <span className="text-emerald-400 font-semibold">{rule.status}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stream of Recent Diagnostic Hypotheses */}
      <Card className="border-slate-800 bg-slate-900/60">
        <CardHeader className="pb-3 border-b border-slate-800/80">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
              <Stethoscope className="h-4 w-4 text-teal-400" />
              <span>Dòng Giả Thuyết Chẩn Đoán Gần Đây (Tổng: {data?.totalHypotheses || 0})</span>
            </CardTitle>
            <Badge variant="outline" className="text-[10px] border-teal-800 bg-teal-950/50 text-teal-300 font-mono">
              DiagnosticEvidence Ledger
            </Badge>
          </div>
          <CardDescription className="text-xs text-slate-400">
            Mỗi bản ghi đại diện cho một giả thuyết lỗi được suy diễn từ bài nộp, có kèm trích dẫn văn bản học thuật.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          {isLoading ? (
            <div className="text-xs text-slate-500 py-12 text-center font-mono">
              Đang tải danh sách giả thuyết chẩn đoán...
            </div>
          ) : !data?.recentHypotheses || data.recentHypotheses.length === 0 ? (
            <div className="p-8 text-center border border-dashed border-slate-800 rounded-lg bg-slate-950/40 text-xs text-slate-500">
              Chưa có bản ghi giả thuyết chẩn đoán nào trong hệ thống.
            </div>
          ) : (
            <div className="space-y-3">
              {data.recentHypotheses.map((h: any) => (
                <div
                  key={h.id}
                  className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono space-y-2 hover:border-slate-700 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[10px] border-teal-700 bg-teal-950/40 text-teal-300">
                        {h.errorCode}
                      </Badge>
                      <span className="text-white font-semibold font-sans">{h.errorName}</span>
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Rule: <span className="text-amber-300">{h.ruleCode}</span> • Conf: <span className="text-white font-bold">{h.confidence}</span>
                    </div>
                  </div>

                  {h.questionText && (
                    <div className="text-[11px] text-slate-400 font-sans line-clamp-1 pl-1">
                      Câu hỏi: <span className="text-slate-300">{h.questionText}</span>
                    </div>
                  )}

                  {h.evidenceSnippet && (
                    <div className="p-2 rounded bg-slate-900 border border-slate-800/80 text-[11px] text-teal-200/90 italic">
                      "{h.evidenceSnippet}"
                    </div>
                  )}

                  <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-900 flex items-center justify-between font-mono">
                    <span>Học sinh: {h.studentName} ({h.studentEmail})</span>
                    <span>{new Date(h.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

