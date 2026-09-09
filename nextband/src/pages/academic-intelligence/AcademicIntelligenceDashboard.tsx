import { useQuery } from "@tanstack/react-query";
import { academicIntelligenceApi } from "@/lib/api";
import {
  Database,
  Cpu,
  Layers,
  Network,
  ShieldCheck,
  ArrowRight,
  RefreshCw,
  Clock,
  Sparkles,
  Info,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function AcademicIntelligenceDashboard() {
  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["academic-intelligence-overview"],
    queryFn: academicIntelligenceApi.getOverview,
    staleTime: 1000 * 30, // 30s
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Academic Intelligence Command Center
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            Tổng quan và giám sát các tầng bằng chứng học thuật, quan sát năng lực vi mô và phân bổ xác suất.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => refetch()}
            disabled={isFetching}
            className="border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs gap-1.5 shadow-xs"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isFetching ? "animate-spin text-sky-400" : "text-slate-300"}`} />
            <span>Làm mới dữ liệu</span>
          </Button>
        </div>
      </div>

      {/* 3 Evidence Layers Architecture Strip */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-emerald-400" />
            <h2 className="text-base font-semibold text-white tracking-tight">
              Cấu Trúc 3 Tầng Dữ Liệu Bằng Chứng Học Thuật
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Evidence-First Data Architecture
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Layer 1: Raw Academic Evidence */}
          <Card className="border-slate-800 bg-slate-900/60 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-[10px] border-blue-500/30 text-blue-400 bg-blue-500/10 font-mono">
                  TẦNG 1: RAW EVIDENCE
                </Badge>
                <Database className="h-4 w-4 text-blue-400" />
              </div>
              <CardTitle className="text-base font-bold text-white mt-2">
                Raw Academic Evidence
              </CardTitle>
              <CardDescription className="text-xs text-slate-400">
                Sự thật học thuật bất biến: Bài thi, câu hỏi gốc và điểm số chấm bài.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Submissions</div>
                  <div className="text-xl font-bold text-white font-mono mt-0.5">
                    {isLoading ? "..." : data?.layers.layer1RawEvidence.totalSubmissions.toLocaleString() || "0"}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Questions</div>
                  <div className="text-xl font-bold text-white font-mono mt-0.5">
                    {isLoading ? "..." : data?.layers.layer1RawEvidence.totalQuestions.toLocaleString() || "0"}
                  </div>
                </div>
              </div>
              <Link
                to="/academic-intelligence/evidence"
                className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors pt-2 font-medium"
              >
                <span>Tra cứu bài nộp gốc</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </CardContent>
          </Card>

          {/* Layer 2: Student Skill Evidence */}
          <Card className="border-slate-800 bg-slate-900/60 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-[10px] border-emerald-500/30 text-emerald-400 bg-emerald-500/10 font-mono">
                  TẦNG 2: NORMALIZED EVIDENCE
                </Badge>
                <Network className="h-4 w-4 text-emerald-400" />
              </div>
              <CardTitle className="text-base font-bold text-white mt-2">
                Student Skill Evidence
              </CardTitle>
              <CardDescription className="text-xs text-slate-400">
                Quan sát vi kỹ năng đã chuẩn hóa & giả thuyết chẩn đoán bẫy lỗi.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Skill Evidences</div>
                  <div className="text-xl font-bold text-emerald-400 font-mono mt-0.5">
                    {isLoading ? "..." : data?.layers.layer2SkillEvidence.totalObservations.toLocaleString() || "0"}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Diagnostics</div>
                  <div className="text-xl font-bold text-teal-400 font-mono mt-0.5">
                    {isLoading ? "..." : data?.layers.layer2SkillEvidence.totalDiagnosticHypotheses.toLocaleString() || "0"}
                  </div>
                </div>
              </div>
              <Link
                to="/academic-intelligence/diagnostic"
                className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 transition-colors pt-2 font-medium"
              >
                <span>Xem telemetry chẩn đoán lỗi</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </CardContent>
          </Card>

          {/* Layer 3: Student Skill Mastery */}
          <Card className="border-slate-800 bg-slate-900/60 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-500" />
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-[10px] border-purple-500/30 text-purple-400 bg-purple-500/10 font-mono">
                  TẦNG 3: DERIVED CACHE
                </Badge>
                <Cpu className="h-4 w-4 text-purple-400" />
              </div>
              <CardTitle className="text-base font-bold text-white mt-2">
                Student Skill Mastery
              </CardTitle>
              <CardDescription className="text-xs text-slate-400">
                Bảng cache phân phối Bayesian Beta. Tái tính toán 100% khi recompute.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Snapshots</div>
                  <div className="text-xl font-bold text-purple-300 font-mono mt-0.5">
                    {isLoading ? "..." : data?.layers.layer3DerivedMastery.totalMasterySnapshots.toLocaleString() || "0"}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Học sinh theo dõi</div>
                  <div className="text-xl font-bold text-white font-mono mt-0.5">
                    {isLoading ? "..." : data?.layers.layer2SkillEvidence.activeTrackedStudents.toLocaleString() || "0"}
                  </div>
                </div>
              </div>
              <Link
                to="/academic-intelligence/student-model"
                className="inline-flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 transition-colors pt-2 font-medium"
              >
                <span>Kiểm tra Student Model & Recompute</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Ontology & Taxonomy Overview */}
      <div className="border border-slate-800 bg-slate-900/40 rounded-lg p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Network className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">
                Bản Đồ Kỹ Năng Cốt Lõi IELTS (Minimal Ontology v1.0.0)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Đồng bộ hóa 22 vi kỹ năng theo chuẩn cấp bậc ARIS-7 và 12 định nghĩa bẫy lỗi học thuật.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div>
              <span className="text-slate-400">Skills: </span>
              <span className="text-white font-bold">{data?.ontology.totalSkills || 22}</span>
            </div>
            <div>
              <span className="text-slate-400">Error Defs: </span>
              <span className="text-white font-bold">{data?.ontology.totalErrorDefinitions || 12}</span>
            </div>
            <div>
              <span className="text-slate-400">Question Tags: </span>
              <span className="text-white font-bold">{data?.ontology.totalQuestionTags || 0}</span>
            </div>
            <Link
              to="/academic-intelligence/ontology"
              className="text-xs text-amber-400 hover:text-amber-300 font-medium ml-2"
            >
              Chi tiết →
            </Link>
          </div>
        </div>
      </div>

      {/* Recomputability & Provenance Guarantee Note */}
      <div className="bg-slate-900/90 border border-emerald-500/30 rounded-lg p-4 text-xs text-slate-300 flex items-start gap-3">
        <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-semibold text-white">
            Bảo Chứng Tính Bất Biến & Khả Năng Tái Lập 1:1 (Evidence Ledger Contract)
          </div>
          <p className="text-slate-400 leading-relaxed">
            Hệ điều hành đảm bảo: Toàn bộ bảng <code className="text-emerald-300 bg-slate-950 px-1 py-0.5 rounded font-mono">StudentSkillMastery</code>{" "}
            có thể bị xóa sạch tại bất kỳ thời điểm nào. Khi chạy hàm recompute, kết quả năng lực học sinh được khôi phục 100% nguyên trạng từ con số 0 chỉ dựa vào Sổ cái bằng chứng{" "}
            <code className="text-emerald-300 bg-slate-950 px-1 py-0.5 rounded font-mono">StudentSkillEvidence</code>.
          </p>
        </div>
      </div>
    </div>
  );
}
