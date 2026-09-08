import { Cpu, RefreshCw, LineChart, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function StudentModelPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-purple-500/40 text-purple-400 bg-purple-500/10 font-mono text-[10px]">
              MODULE 4 • BAYESIAN STUDENT MODEL
            </Badge>
            <span className="text-xs text-slate-500 font-mono">Phase E Specification</span>
          </div>
          <h1 className="text-2xl font-bold text-white mt-1.5 font-mono">Student Model & Recompute</h1>
          <p className="text-sm text-slate-400 mt-1">
            Không gian kiểm định vector năng lực học sinh, tham số phân phối Beta (α, β) và kích hoạt Tái tính toán tất định.
          </p>
        </div>

        <Button
          variant="outline"
          className="border-purple-500/40 bg-purple-950/40 hover:bg-purple-900/60 text-purple-300 text-xs gap-2"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Deterministic Full Recompute</span>
        </Button>
      </div>

      {/* Model Contract Explanation */}
      <Card className="border-slate-800 bg-slate-900/60">
        <CardHeader>
          <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
            <Cpu className="h-4 w-4 text-purple-400" />
            Hợp Đồng Toán Học Bayesian Conjugate Prior (Beta-Binomial)
          </CardTitle>
          <CardDescription className="text-xs text-slate-400">
            UI chỉ là Observability Layer. Toàn bộ tính toán được bảo đảm bởi Domain Math Module và Sổ cái Bằng chứng.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div className="p-3 rounded bg-slate-950 border border-slate-800">
              <div className="text-slate-400 uppercase text-[10px]">Expected Value (Mastery)</div>
              <div className="text-white font-bold text-sm mt-1">E[Θ] = α / (α + β)</div>
              <p className="text-[10px] text-slate-500 mt-1 font-sans">Kỳ vọng xác suất làm chủ vi kỹ năng</p>
            </div>
            <div className="p-3 rounded bg-slate-950 border border-slate-800">
              <div className="text-slate-400 uppercase text-[10px]">Uncertainty (Variance)</div>
              <div className="text-cyan-400 font-bold text-sm mt-1">Var[Θ] = (αβ)/((α+β)²(α+β+1))</div>
              <p className="text-[10px] text-slate-500 mt-1 font-sans">Độ bất định dữ liệu học sinh</p>
            </div>
            <div className="p-3 rounded bg-slate-950 border border-slate-800">
              <div className="text-slate-400 uppercase text-[10px]">Uniform Prior Baseline</div>
              <div className="text-emerald-400 font-bold text-sm mt-1">Beta(1.0, 1.0)</div>
              <p className="text-[10px] text-slate-500 mt-1 font-sans">Mặc định ban đầu khi chưa có evidence</p>
            </div>
          </div>

          <div className="p-6 border border-dashed border-slate-800 rounded-lg text-center bg-slate-950/50">
            <LineChart className="h-8 w-8 text-slate-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-slate-300">Sẵn Sàng Cho Phase E: Student Profile Inspector</div>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
              Cho phép tra cứu từng học sinh, xem đường cong tiến trình tích lũy bằng chứng và kích hoạt recompute kiểm chứng 1:1.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
