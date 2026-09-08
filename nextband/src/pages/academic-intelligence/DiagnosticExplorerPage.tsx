import { Stethoscope, CheckCircle, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function DiagnosticExplorerPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-teal-500/40 text-teal-400 bg-teal-500/10 font-mono text-[10px]">
            MODULE 2 • DIAGNOSTIC ENGINE
          </Badge>
          <span className="text-xs text-slate-500 font-mono">Phase C Specification</span>
        </div>
        <h1 className="text-2xl font-bold text-white mt-1.5 font-mono">Diagnostic Engine Telemetry</h1>
        <p className="text-sm text-slate-400 mt-1">
          Giám sát các bộ quy tắc tất định (Deterministic Rules), giả thuyết bẫy lỗi học thuật và trích đoạn văn bản chứng minh.
        </p>
      </div>

      {/* Active Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-slate-800 bg-slate-900/60">
          <CardHeader className="pb-3">
            <Badge variant="outline" className="w-fit text-[10px] border-amber-500/30 text-amber-400 bg-amber-500/10 font-mono">
              RULE_001_WORD_MATCHING
            </Badge>
            <CardTitle className="text-sm font-bold text-white mt-2">
              Bẫy Trùng Từ (Distractor Overlap)
            </CardTitle>
            <CardDescription className="text-xs text-slate-400">
              Phát hiện học sinh chọn đáp án vì thấy từ vựng trùng khớp bài đọc nhưng bản chất ngữ cảnh đối lập.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-xs font-mono text-slate-400 border-t border-slate-800/80 pt-3">
            Status: <span className="text-emerald-400 font-semibold">ACTIVE</span> • Confidence: 0.85
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900/60">
          <CardHeader className="pb-3">
            <Badge variant="outline" className="w-fit text-[10px] border-amber-500/30 text-amber-400 bg-amber-500/10 font-mono">
              RULE_002_EXTREME_QUALIFIER
            </Badge>
            <CardTitle className="text-sm font-bold text-white mt-2">
              Bẫy Tuyệt Đối Hóa (Extreme Qualifiers)
            </CardTitle>
            <CardDescription className="text-xs text-slate-400">
              Phát hiện câu hỏi dùng always/never/completely trong khi đoạn văn chỉ nêu often/partly.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-xs font-mono text-slate-400 border-t border-slate-800/80 pt-3">
            Status: <span className="text-emerald-400 font-semibold">ACTIVE</span> • Confidence: 0.90
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900/60">
          <CardHeader className="pb-3">
            <Badge variant="outline" className="w-fit text-[10px] border-amber-500/30 text-amber-400 bg-amber-500/10 font-mono">
              RULE_003_WORD_LIMIT
            </Badge>
            <CardTitle className="text-sm font-bold text-white mt-2">
              Lỗi Vượt Quá Số Từ (Word Count Violation)
            </CardTitle>
            <CardDescription className="text-xs text-slate-400">
              Phát hiện câu trả lời đúng từ vựng nhưng vi phạm giới hạn NO MORE THAN N WORDS.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-xs font-mono text-slate-400 border-t border-slate-800/80 pt-3">
            Status: <span className="text-emerald-400 font-semibold">ACTIVE</span> • Confidence: 0.95
          </CardContent>
        </Card>
      </div>

      <div className="p-6 border border-dashed border-slate-800 rounded-lg text-center bg-slate-950/50">
        <Stethoscope className="h-8 w-8 text-slate-600 mx-auto mb-2" />
        <div className="text-sm font-medium text-slate-300">Sẵn Sàng Cho Phase C: Diagnostic Hypotheses Stream</div>
        <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
          Hiển thị real-time dòng giả thuyết chẩn đoán được gắn vào từng câu hỏi kèm snippet bằng chứng của học sinh.
        </p>
      </div>
    </div>
  );
}
