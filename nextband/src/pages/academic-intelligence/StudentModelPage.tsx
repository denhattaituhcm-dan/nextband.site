import { useState, useEffect } from "react";
import { Cpu, RefreshCw, Users, ShieldCheck, Database, CheckCircle2, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { academicIntelligenceApi } from "@/lib/api";

interface StudentItem {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  submissionCount: number;
  evidenceCount: number;
  masteryCount: number;
}

interface MasteryItem {
  skillCode: string;
  skillName: string;
  category: string;
  alphaSuccess: number;
  betaFailure: number;
  totalEvidence: number;
  posteriorMean: number;
  uncertainty: number;
  lastObservedAt?: string;
  recomputedAt: string;
}

interface StudentMasteryData {
  student: { userId: string; email: string; fullName?: string; avatarUrl?: string };
  totalEvidences: number;
  masteryCount: number;
  masteries: MasteryItem[];
}

export default function StudentModelPage() {
  const [students, setStudents] = useState<StudentItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  const [isLoadingStudents, setIsLoadingStudents] = useState(true);
  const [isLoadingMastery, setIsLoadingMastery] = useState(false);
  const [isRecomputing, setIsRecomputing] = useState(false);

  const [masteryData, setMasteryData] = useState<StudentMasteryData | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 1. Tải danh sách học sinh
  useEffect(() => {
    async function loadStudents() {
      setIsLoadingStudents(true);
      try {
        const list = await academicIntelligenceApi.getStudents();
        setStudents(list);
        if (list.length > 0 && !selectedStudentId) {
          setSelectedStudentId(list[0].id);
        }
      } catch (err: any) {
        setErrorMessage(err.message || "Không thể tải danh mục học sinh.");
      } finally {
        setIsLoadingStudents(false);
      }
    }
    loadStudents();
  }, []);

  // 2. Tải vector năng lực của học sinh được chọn
  useEffect(() => {
    if (!selectedStudentId) return;

    async function loadMastery() {
      setIsLoadingMastery(true);
      setStatusMessage(null);
      setErrorMessage(null);
      try {
        const data = await academicIntelligenceApi.getStudentMastery(selectedStudentId);
        setMasteryData(data);
      } catch (err: any) {
        setErrorMessage(err.message || "Không thể tải vector năng lực học sinh.");
        setMasteryData(null);
      } finally {
        setIsLoadingMastery(false);
      }
    }
    loadMastery();
  }, [selectedStudentId]);

  // 3. Kích hoạt Deterministic Recomputation
  const handleRecompute = async () => {
    if (!selectedStudentId || isRecomputing) return;

    setIsRecomputing(true);
    setStatusMessage(null);
    setErrorMessage(null);
    try {
      const res = await academicIntelligenceApi.recomputeStudentMastery(selectedStudentId);
      setStatusMessage(`Đã tái tính toán thành công ${res.skillsRecomputed} vi kỹ năng trực tiếp từ StudentSkillEvidence.`);
      // Tải lại snapshot vừa ghi đè
      const refreshed = await academicIntelligenceApi.getStudentMastery(selectedStudentId);
      setMasteryData(refreshed);
    } catch (err: any) {
      setErrorMessage(err.message || "Lỗi khi chạy tái tính toán.");
    } finally {
      setIsRecomputing(false);
    }
  };

  const filteredStudents = students.filter(
    (s) =>
      s.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-purple-500/40 text-purple-400 bg-purple-500/10 font-mono text-[10px]">
              PHASE 3 • BAYESIAN STUDENT MODEL
            </Badge>
            <Badge variant="outline" className="border-amber-500/40 text-amber-300 bg-amber-500/10 font-mono text-[10px]">
              DERIVED STATE — KHÔNG PHẢI EVIDENCE GỐC
            </Badge>
          </div>
          <h1 className="text-2xl font-bold text-white mt-1.5 font-mono">Student Model & Deterministic Recompute</h1>
          <p className="text-sm text-slate-400 mt-1">
            Mô hình năng lực Bayesian Beta-Binomial: Đọc StudentSkillEvidence $\to$ Tính $\alpha, \beta$ $\to$ Cập nhật StudentSkillMastery.
          </p>
        </div>

        <Button
          onClick={handleRecompute}
          disabled={!selectedStudentId || isRecomputing || isLoadingMastery}
          variant="outline"
          className="border-purple-500/50 bg-purple-950/50 hover:bg-purple-900/60 text-purple-200 text-xs gap-2 font-mono"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isRecomputing ? "animate-spin text-purple-400" : ""}`} />
          <span>{isRecomputing ? "Đang Tái Tính Toán..." : "Tái Tính Toán Tất Định (Recompute)"}</span>
        </Button>
      </div>

      {/* Model Invariants Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
        <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-start gap-2.5">
          <Database className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-white font-bold">Source of Truth Duy Nhất</div>
            <div className="text-slate-400 text-[11px] font-sans mt-0.5">
              Chỉ đọc <code className="text-emerald-400">StudentSkillEvidence</code>. Tuyệt đối không đọc snapshot cũ hay chẩn đoán lỗi để tính.
            </div>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-start gap-2.5">
          <Cpu className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-white font-bold">Pure Domain Beta Math</div>
            <div className="text-slate-400 text-[11px] font-sans mt-0.5">
              α = α₀ + Σ(w·y), β = β₀ + Σ(w·(1-y)). Không heuristic hay decay bí mật.
            </div>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-start gap-2.5">
          <ShieldCheck className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-white font-bold">Drop & Rebuild Khôi Phục 1:1</div>
            <div className="text-slate-400 text-[11px] font-sans mt-0.5">
              Xóa sạch bảng <code className="text-cyan-400">StudentSkillMastery</code> $\to$ Chạy lại Recompute $\to$ Khôi phục chính xác 100%.
            </div>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {statusMessage && (
        <div className="p-3 rounded-md bg-emerald-950/40 border border-emerald-800 text-xs text-emerald-300 flex items-center gap-2 font-mono">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}
      {errorMessage && (
        <div className="p-3 rounded-md bg-rose-950/40 border border-rose-800 text-xs text-rose-300 flex items-center gap-2 font-mono">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main Grid: Student Selector + Mastery Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Step 1: Chọn Học Sinh */}
        <Card className="border-slate-800 bg-slate-900/60 lg:col-span-1">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-400" />
                <span>Chọn Học Sinh ({students.length})</span>
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-slate-400">
              Tra cứu hồ sơ năng lực Bayesian của học viên
            </CardDescription>
            <div className="pt-2">
              <Input
                placeholder="Tìm học sinh theo tên/email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8 text-xs bg-slate-950 border-slate-800 text-slate-200 placeholder:text-slate-600"
              />
            </div>
          </CardHeader>
          <CardContent>
            {isLoadingStudents ? (
              <div className="text-xs text-slate-500 py-8 text-center">Đang tải danh sách học sinh...</div>
            ) : filteredStudents.length === 0 ? (
              <div className="text-xs text-slate-500 py-8 text-center">Không tìm thấy học sinh phù hợp.</div>
            ) : (
              <div className="max-h-96 overflow-y-auto space-y-1.5 pr-1">
                {filteredStudents.map((stu) => {
                  const isSelected = selectedStudentId === stu.id;
                  return (
                    <button
                      key={stu.id}
                      type="button"
                      onClick={() => setSelectedStudentId(stu.id)}
                      className={`w-full text-left p-2.5 rounded-md border transition-all flex items-center justify-between text-xs ${
                        isSelected
                          ? "bg-purple-950/50 border-purple-600 text-white shadow-sm"
                          : "bg-slate-950/60 border-slate-800/80 text-slate-300 hover:bg-slate-900 hover:text-white"
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <div className="font-semibold truncate">{stu.fullName || stu.email}</div>
                        <div className="text-[11px] text-slate-500 truncate font-mono">{stu.email}</div>
                      </div>
                      <div className="text-right shrink-0 text-[10px] font-mono space-y-0.5">
                        <Badge variant="outline" className="border-slate-800 bg-slate-900 text-slate-400 text-[9px]">
                          {stu.evidenceCount} evidences
                        </Badge>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Step 2: Bảng Vector Năng Lực (StudentSkillMastery) */}
        <Card className="border-slate-800 bg-slate-900/60 lg:col-span-2">
          <CardHeader className="pb-3 border-b border-slate-800/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-purple-400" />
                  <span>Vector Năng Lực (StudentSkillMastery)</span>
                </CardTitle>
                <CardDescription className="text-xs text-slate-400 mt-0.5">
                  {masteryData?.student ? (
                    <span>
                      Học sinh: <strong className="text-slate-200">{masteryData.student.fullName || masteryData.student.email}</strong> •{" "}
                      Tổng bằng chứng: <strong className="text-emerald-400">{masteryData.totalEvidences}</strong> •{" "}
                      Vi kỹ năng: <strong className="text-purple-400">{masteryData.masteryCount}</strong>
                    </span>
                  ) : (
                    "Hãy chọn một học sinh từ danh sách bên trái"
                  )}
                </CardDescription>
              </div>

              <Badge variant="outline" className="text-[10px] border-purple-800/60 bg-purple-950/40 text-purple-300 font-mono w-fit">
                Conjugate Prior: Beta(1.0, 1.0)
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="pt-4">
            {isLoadingMastery ? (
              <div className="text-xs text-slate-500 py-16 text-center font-mono">
                Đang truy xuất tham số phân phối Bayesian...
              </div>
            ) : !masteryData || masteryData.masteries.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-slate-800 rounded-lg bg-slate-950/40 space-y-2">
                <Cpu className="h-7 w-7 text-slate-600 mx-auto" />
                <div className="text-xs text-slate-300 font-semibold">Chưa có bản ghi StudentSkillMastery</div>
                <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                  Học sinh chưa có bài nộp nào sinh ra bằng chứng hoặc chưa được chạy recompute. Bấm nút "Tái Tính Toán Tất Định" phía trên để khởi tạo từ StudentSkillEvidence.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {masteryData.masteries.map((m) => (
                    <div
                      key={m.skillCode}
                      className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono space-y-2 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-purple-300 font-bold truncate">{m.skillCode}</div>
                          <div className="text-[11px] text-slate-400 font-sans truncate max-w-[220px]">
                            {m.skillName}
                          </div>
                        </div>
                        <Badge variant="outline" className="border-slate-800 bg-slate-900 text-slate-400 text-[9px] shrink-0">
                          {m.category}
                        </Badge>
                      </div>

                      {/* Progress Bar representation of Posterior Mean */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-slate-400 font-sans">Mức độ làm chủ (E[θ]):</span>
                          <span className="text-emerald-400 font-bold font-mono">{(m.posteriorMean * 100).toFixed(1)}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-emerald-400 rounded-full"
                            style={{ width: `${Math.min(100, Math.max(0, m.posteriorMean * 100))}%` }}
                          />
                        </div>
                      </div>

                      {/* Mathematical Parameters Grid */}
                      <div className="grid grid-cols-4 gap-1 text-[10px] pt-2 border-t border-slate-900 text-slate-400">
                        <div>
                          <div>α (Success):</div>
                          <div className="text-white font-bold">{m.alphaSuccess.toFixed(1)}</div>
                        </div>
                        <div>
                          <div>β (Failure):</div>
                          <div className="text-white font-bold">{m.betaFailure.toFixed(1)}</div>
                        </div>
                        <div>
                          <div>N (Observations):</div>
                          <div className="text-cyan-400 font-bold">{m.totalEvidence}</div>
                        </div>
                        <div>
                          <div>Var[θ]:</div>
                          <div className="text-slate-300 font-bold">{m.uncertainty.toFixed(4)}</div>
                        </div>
                      </div>

                      {/* Timestamp Provenance */}
                      <div className="text-[9px] text-slate-500 pt-1 border-t border-slate-900/80 flex items-center justify-between">
                        <span>Observed: {m.lastObservedAt ? new Date(m.lastObservedAt).toLocaleDateString() : "Chưa có"}</span>
                        <span>Recomputed: {new Date(m.recomputedAt).toLocaleTimeString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
