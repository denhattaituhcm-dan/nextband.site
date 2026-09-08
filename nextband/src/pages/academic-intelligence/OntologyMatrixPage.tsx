import { Network, Tag, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function OntologyMatrixPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-amber-500/40 text-amber-400 bg-amber-500/10 font-mono text-[10px]">
            MODULE 3 • ONTOLOGY & TAXONOMY
          </Badge>
          <span className="text-xs text-slate-500 font-mono">Phase D Specification</span>
        </div>
        <h1 className="text-2xl font-bold text-white mt-1.5 font-mono">IELTS Ontology & Question Tags</h1>
        <p className="text-sm text-slate-400 mt-1">
          Bản đồ 22 vi kỹ năng, 12 định nghĩa bẫy lỗi học thuật và ma trận gán nhãn câu hỏi (QuestionSkillTag).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-slate-800 bg-slate-900/60">
          <CardHeader>
            <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
              <Network className="h-4 w-4 text-amber-400" />
              22 Atomic Micro-Skills (IELTS Minimal Ontology v1.0.0)
            </CardTitle>
            <CardDescription className="text-xs text-slate-400">
              Phân cấp theo 4 cấp độ kỹ năng gắn liền với Khung cấp bậc ARIS-7: FOUNDATION, INTERMEDIATE, ADVANCED, MASTERY.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-xs font-mono">
            <div className="p-2 rounded bg-slate-950 border border-slate-800 text-slate-300">
              • R_MS_QUALIFIER_SENSITIVITY (Độ nhạy từ hạn định)
            </div>
            <div className="p-2 rounded bg-slate-950 border border-slate-800 text-slate-300">
              • R_MS_PARAPHRASE_DISCRIMINATION (Phân biệt Paraphrase)
            </div>
            <div className="p-2 rounded bg-slate-950 border border-slate-800 text-slate-300">
              • R_MS_TOPIC_SENTENCE_FILTER (Lọc ý chính đoạn văn)
            </div>
            <div className="p-2 rounded bg-slate-950 border border-slate-800 text-slate-400">
              + 19 vi kỹ năng khác trong kho dữ liệu...
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900/60">
          <CardHeader>
            <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-rose-400" />
              12 Error Definitions (Error Taxonomy Matrix)
            </CardTitle>
            <CardDescription className="text-xs text-slate-400">
              Chuẩn hóa các nguyên nhân tâm lý và tư duy khiến học sinh vấp bẫy đề thi.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-xs font-mono">
            <div className="p-2 rounded bg-slate-950 border border-slate-800 text-slate-300">
              • ERR_WORD_MATCHING_TRAP (Bẫy trùng từ)
            </div>
            <div className="p-2 rounded bg-slate-950 border border-slate-800 text-slate-300">
              • ERR_EXTREME_QUALIFIER (Bẫy tuyệt đối hóa)
            </div>
            <div className="p-2 rounded bg-slate-950 border border-slate-800 text-slate-300">
              • ERR_WORD_LIMIT_EXCEEDED (Quá số từ cho phép)
            </div>
            <div className="p-2 rounded bg-slate-950 border border-slate-800 text-slate-400">
              + 9 mã lỗi học thuật khác...
            </div>
          </CardContent>
        </Card>
      </div>

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
