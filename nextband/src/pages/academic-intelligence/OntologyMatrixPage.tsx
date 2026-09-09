import { useState, useEffect } from "react";
import { Network, AlertCircle, RefreshCw, AlertTriangle, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { academicIntelligenceApi } from "@/lib/api";

export default function OntologyMatrixPage() {
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await academicIntelligenceApi.getOntologyOverview();
      setData(res);
    } catch (err: any) {
      setError(err.message || "Không thể tải bản đồ Ontology.");
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
          <h1 className="text-2xl font-bold text-white tracking-tight">IELTS Ontology</h1>
          <p className="text-sm text-slate-300 mt-1">
            Danh mục chuẩn hóa 22 vi kỹ năng và 12 định nghĩa bẫy lỗi IELTS dùng trong toàn hệ thống.
          </p>
        </div>

        <Button
          onClick={loadData}
          disabled={isLoading}
          className="border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs gap-2 shadow-xs"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin text-sky-400" : "text-slate-300"}`} />
          <span>Làm mới danh mục</span>
        </Button>
      </div>

      {error && (
        <div className="p-3 rounded-md bg-rose-950/40 border border-rose-800 text-xs text-rose-300 flex items-center gap-2 font-mono">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Tabs Switcher: Micro-Skills vs Error Definitions */}
      <Tabs defaultValue="skills" className="space-y-4">
        <TabsList className="bg-slate-900 border border-slate-800 p-1">
          <TabsTrigger value="skills" className="text-xs font-mono gap-2 data-[state=active]:bg-slate-800 text-slate-300">
            <Network className="h-3.5 w-3.5 text-amber-400" />
            <span>22 Micro-Skills ({data?.skillsCount || 0})</span>
          </TabsTrigger>
          <TabsTrigger value="errors" className="text-xs font-mono gap-2 data-[state=active]:bg-slate-800 text-slate-300">
            <AlertCircle className="h-3.5 w-3.5 text-rose-400" />
            <span>12 Error Definitions ({data?.errorsCount || 0})</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Micro-Skills */}
        <TabsContent value="skills" className="space-y-3">
          {isLoading ? (
            <div className="text-xs text-slate-500 py-12 text-center font-mono">
              Đang tải danh mục vi kỹ năng...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(data?.skills || []).map((s: any) => (
                <div
                  key={s.code}
                  className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono space-y-2 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-amber-300 font-bold truncate">{s.code}</div>
                      <div className="text-[11px] text-slate-300 font-sans mt-0.5">{s.name}</div>
                    </div>
                    <Badge variant="outline" className="border-slate-800 bg-slate-900 text-slate-400 text-[9px] shrink-0">
                      {s.macroSkill}
                    </Badge>
                  </div>

                  {s.description && (
                    <p className="text-[11px] text-slate-400 font-sans">{s.description}</p>
                  )}

                  <div className="text-[10px] text-slate-500 pt-1.5 border-t border-slate-900 flex items-center justify-between">
                    <span>Tier: <strong className="text-slate-300">{s.realmTier}</strong></span>
                    <span>Bằng chứng tích lũy: <strong className="text-emerald-400">{s.evidenceCount}</strong></span>
                    <span>Câu hỏi gắn tag: <strong className="text-cyan-400">{s.taggedQuestionsCount}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Tab 2: Error Definitions */}
        <TabsContent value="errors" className="space-y-3">
          {isLoading ? (
            <div className="text-xs text-slate-500 py-12 text-center font-mono">
              Đang tải danh mục định nghĩa lỗi...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(data?.errors || []).map((e: any) => (
                <div
                  key={e.code}
                  className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono space-y-2 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-rose-400 font-bold truncate">{e.code}</div>
                      <div className="text-[11px] text-slate-300 font-sans mt-0.5">{e.name}</div>
                    </div>
                    <Badge variant="outline" className="border-rose-900/60 bg-rose-950/40 text-rose-300 text-[9px] shrink-0">
                      {e.severity}
                    </Badge>
                  </div>

                  {e.description && (
                    <p className="text-[11px] text-slate-400 font-sans">{e.description}</p>
                  )}

                  <div className="text-[10px] text-slate-500 pt-1.5 border-t border-slate-900 flex items-center justify-between">
                    <span>Nhóm: <strong className="text-slate-300">{e.category}</strong></span>
                    <span>Số lần xuất hiện: <strong className="text-amber-400">{e.hypothesisCount}</strong></span>
                    <span>Taxonomy: <strong className="text-slate-400">v{e.taxonomyVersion}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <div className="p-6 border border-dashed border-slate-800 rounded-lg text-center bg-slate-950/50">
        <Tag className="h-8 w-8 text-slate-600 mx-auto mb-2" />
        <div className="text-sm font-medium text-slate-300">Sẵn Sàng Cho Phase D: Matrix Editor</div>
        <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
          Công cụ gán nhãn trọng số câu hỏi - vi kỹ năng (QuestionSkillTag) dành cho Academic Director và chuyên gia biên soạn đề thi.
        </p>
      </div>
    </div>
  );
}
