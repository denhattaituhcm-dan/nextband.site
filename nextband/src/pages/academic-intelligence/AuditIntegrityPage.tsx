import { useState, useEffect } from "react";
import { ShieldCheck, CheckCircle2, AlertTriangle, RefreshCw, Activity, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { academicIntelligenceApi } from "@/lib/api";

export default function AuditIntegrityPage() {
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const runAudit = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await academicIntelligenceApi.runIntegrityAudit();
      setData(res);
    } catch (err: any) {
      setError(err.message || "Không thể thực thi quét kiểm toán tính toàn vẹn.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    runAudit();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Audit & Integrity</h1>
          <p className="text-sm text-slate-300 mt-1">
            Kiểm toán tính toàn vẹn của sổ cái bằng chứng và xác nhận 4 định đề học thuật (Invariants).
          </p>
        </div>

        <Button
          onClick={runAudit}
          disabled={isLoading}
          className="border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs gap-2 shadow-xs"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin text-sky-400" : "text-slate-300"}`} />
          <span>{isLoading ? "Đang quét..." : "Quét toàn vẹn dữ liệu"}</span>
        </Button>
      </div>

      {error && (
        <div className="p-3 rounded-md bg-rose-950/40 border border-rose-800 text-xs text-rose-300 flex items-center gap-2 font-mono">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Summary Status Strip */}
      <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-2.5">
          {data?.isClean ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          ) : (
            <AlertTriangle className="h-5 w-5 text-amber-400" />
          )}
          <div>
            <div className="text-white font-bold">
              {data?.isClean ? "SỔ CÁI BẰNG CHỨNG ĐẠT CHUẨN TOÀN VẸN 100%" : "CẢNH BÁO TOÀN VẸN DỮ LIỆU"}
            </div>
            <div className="text-slate-400 text-[11px] font-sans">
              Thời điểm quét gần nhất: {data ? new Date(data.timestamp).toLocaleString() : "Đang kiểm tra..."}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-slate-400 text-[11px]">
          <div>
            Evidences: <strong className="text-white">{data?.telemetry?.totalEvidences || 0}</strong>
          </div>
          <div>
            Masteries: <strong className="text-white">{data?.telemetry?.totalMasteries || 0}</strong>
          </div>
          <div>
            Diagnostics: <strong className="text-white">{data?.telemetry?.totalDiagnosticHypotheses || 0}</strong>
          </div>
        </div>
      </div>

      {/* Audit Invariants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Verification Gates */}
        <Card className="border-slate-800 bg-slate-900/60">
          <CardHeader>
            <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>4 Cổng Bất Biến Học Thuật (Academic Invariants)</span>
            </CardTitle>
            <CardDescription className="text-xs text-slate-400">
              Kiểm chứng các điều kiện ràng buộc cốt lõi của Training OS.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2.5 text-xs font-mono">
            {(data?.auditGates || []).map((gate: any, idx: number) => (
              <div
                key={idx}
                className="p-2.5 rounded bg-slate-950 border border-slate-800 flex items-start justify-between gap-2"
              >
                <div className="space-y-0.5">
                  <div className="text-white font-semibold">{gate.gateName}</div>
                  <div className="text-[11px] text-slate-400 font-sans">{gate.description}</div>
                </div>
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40 text-[9px] shrink-0 font-mono">
                  {gate.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Anomaly Detection Scan */}
        <Card className="border-slate-800 bg-slate-900/60">
          <CardHeader>
            <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
              <Activity className="h-4 w-4 text-cyan-400" />
              <span>Quét Bất Thường Dữ Liệu (Anomaly Telemetry)</span>
            </CardTitle>
            <CardDescription className="text-xs text-slate-400">
              Quét các giá trị outcome ngoài [0.0, 1.0], trọng số ≤ 0, hoặc bản ghi ma.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2.5 text-xs font-mono">
            <div className="p-3 rounded bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-slate-300">Out of bounds outcomes:</div>
                <div className="text-[10px] text-slate-500 font-sans">Bằng chứng có outcome &lt; 0.0 hoặc &gt; 1.0</div>
              </div>
              <span className={`font-bold ${data?.anomalies?.outOfBoundsOutcomes === 0 ? "text-emerald-400" : "text-rose-400"}`}>
                {data?.anomalies?.outOfBoundsOutcomes ?? 0} phát hiện
              </span>
            </div>

            <div className="p-3 rounded bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-slate-300">Invalid evidence weights:</div>
                <div className="text-[10px] text-slate-500 font-sans">Bằng chứng có trọng số weight ≤ 0 hoặc NaN</div>
              </div>
              <span className={`font-bold ${data?.anomalies?.invalidWeights === 0 ? "text-emerald-400" : "text-rose-400"}`}>
                {data?.anomalies?.invalidWeights ?? 0} phát hiện
              </span>
            </div>

            <div className="p-3 rounded bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-slate-300">Phantom evidence records:</div>
                <div className="text-[10px] text-slate-500 font-sans">Bản ghi mồ côi không có học sinh hoặc vi kỹ năng</div>
              </div>
              <span className={`font-bold ${data?.anomalies?.phantomEvidences === 0 ? "text-emerald-400" : "text-rose-400"}`}>
                {data?.anomalies?.phantomEvidences ?? 0} phát hiện
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="p-6 border border-dashed border-slate-800 rounded-lg text-center bg-slate-950/50">
        <ShieldAlert className="h-8 w-8 text-slate-600 mx-auto mb-2" />
        <div className="text-sm font-medium text-slate-300">Sẵn Sàng Cho Phase F: Integrity Scanner & Recompute Suite</div>
        <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
          Bộ công cụ kiểm định tối cao cho Academic Director và Data Integrity Auditor.
        </p>
      </div>
    </div>
  );
}
