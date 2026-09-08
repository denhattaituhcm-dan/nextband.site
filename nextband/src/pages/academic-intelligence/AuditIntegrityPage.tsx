import { ShieldAlert, CheckCircle2, AlertTriangle, FileCode } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function AuditIntegrityPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-rose-500/40 text-rose-400 bg-rose-500/10 font-mono text-[10px]">
            MODULE 5 • AUDIT & INTEGRITY
          </Badge>
          <span className="text-xs text-slate-500 font-mono">Phase F Specification</span>
        </div>
        <h1 className="text-2xl font-bold text-white mt-1.5 font-mono">Audit & Data Integrity</h1>
        <p className="text-sm text-slate-400 mt-1">
          Kiểm toán tính toàn vẹn của Sổ cái bằng chứng, phát hiện bản ghi mồ côi (phantom evidence) và xác nhận tính tái lập toán học.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-slate-800 bg-slate-900/60">
          <CardHeader>
            <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              Recomputability Verification Gate
            </CardTitle>
            <CardDescription className="text-xs text-slate-400">
              Cơ chế kiểm tra tự động: Xóa snapshot bảng Derived Cache và đối chiếu byte-for-byte với trạng thái gốc.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-xs text-slate-300 font-mono space-y-2">
            <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800">
              <span>Section 16 Final Gate Test:</span>
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40">PASSED 100%</Badge>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800">
              <span>Adversarial Corruption Resilience:</span>
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40">VERIFIED</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900/60">
          <CardHeader>
            <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              Data Integrity & Anomaly Scanner
            </CardTitle>
            <CardDescription className="text-xs text-slate-400">
              Quét các giá trị bất thường (out of bounds outcomes, invalid weights, phantom rows).
            </CardDescription>
          </CardHeader>
          <CardContent className="text-xs text-slate-300 font-mono space-y-2">
            <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800">
              <span>Phantom Evidence Records:</span>
              <span className="text-emerald-400 font-bold">0 Detected</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800">
              <span>Out-of-bound Outcomes [0.0, 1.0]:</span>
              <span className="text-emerald-400 font-bold">0 Violations</span>
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
