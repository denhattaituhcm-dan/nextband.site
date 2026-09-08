import React from "react";
import { PenTool, AlertCircle, CheckCircle2, Clock, ShieldAlert } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { sanitizeHtml } from "@/lib/sanitize";
import { toast } from "sonner";

interface WritingPanelProps {
  title: string;
  prompt: string;
  guidelines: string[];
  maxWords?: number;
  value: string;
  onChange: (text: string) => void;
  pasteCount?: number;
  onPasteDetected?: (pastedLength: number) => void;
}

export function WritingPanel({
  title,
  prompt,
  guidelines,
  maxWords = 350,
  value,
  onChange,
  pasteCount = 0,
  onPasteDetected,
}: WritingPanelProps) {
  const wordsCount = value
    ? value
        .trim()
        .split(/\s+/)
        .filter((w) => w.length > 0).length
    : 0;

  const isOverLimit = wordsCount > maxWords;
  const hasHtml = prompt && prompt.includes("<") && prompt.includes(">");

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    // Cho phép paste bình thường (không e.preventDefault)
    const text = e.clipboardData?.getData("text") || "";
    const nextCount = (pasteCount || 0) + 1;
    if (onPasteDetected) {
      onPasteDetected(text.length);
    }
    toast.warning(`Hệ thống ghi nhận thao tác dán văn bản (${nextCount} lần).`, {
      description: "Để kết quả đánh giá năng lực ARIS chính xác nhất, bạn nên tự gõ nội dung bài viết trực tiếp.",
      duration: 4500,
    });
  };

  return (
    <div className="space-y-6">
      {/* Section Header Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-brand-blue-soft/30 to-background border border-border shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-blue text-white flex items-center justify-center shadow-xs">
            <PenTool className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-foreground">{title}</h3>
            <p className="text-xs text-muted-foreground">
              Viết đoạn văn ngắn (khuyến nghị 100–150 từ, tối đa {maxWords} từ). Thí sinh có thể làm bài hoặc bỏ qua nếu chưa tự tin.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {pasteCount > 0 && (
            <Badge
              variant="outline"
              className="text-amber-700 bg-amber-50 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800 gap-1 text-[11px] font-semibold"
            >
              <ShieldAlert className="w-3 h-3 text-amber-600" />
              Dán {pasteCount} lần
            </Badge>
          )}
          <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-brand-blue/10 text-brand-blue border border-brand-blue/20">
            <Clock className="w-3 h-3" />
            Gợi ý: ~20 phút
          </span>
          <Badge
            variant="outline"
            className={`text-xs font-bold ${
              isOverLimit
                ? "bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 border-red-300 dark:border-red-800"
                : wordsCount > 0
                ? "bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800"
                : "bg-background text-muted-foreground"
            }`}
          >
            {isOverLimit
              ? `Vượt giới hạn: ${wordsCount}/${maxWords} từ`
              : wordsCount > 0
              ? `${wordsCount} từ (Tối đa ${maxWords})`
              : `0 / tối đa ${maxWords} từ`}
          </Badge>
        </div>
      </div>

      {/* Writing Prompt Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-card border border-border space-y-4 shadow-xs">
        <div className="space-y-2">
          <span className="text-xs font-bold text-brand-blue uppercase tracking-wide">
            Kỹ Năng Viết (Writing Task 2)
          </span>
          {hasHtml ? (
            <div
              className="text-sm sm:text-base font-bold text-foreground leading-relaxed prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(prompt) }}
            />
          ) : (
            <p className="text-sm sm:text-base font-bold text-foreground leading-relaxed">
              {prompt}
            </p>
          )}
        </div>

        {/* Guidelines */}
        <div className="p-4 rounded-2xl bg-muted/50 border border-border/80 space-y-2">
          <h5 className="text-xs font-extrabold text-foreground">Gợi ý phát triển ý tưởng & Quy định độ dài:</h5>
          <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-4">
            {guidelines.map((g, i) => (
              <li key={i}>{g}</li>
            ))}
            <li className="font-semibold text-foreground/80">
              Độ dài khuyến nghị: <strong>100 – 150 từ</strong> (Không bắt buộc số từ tối thiểu, giới hạn tối đa {maxWords} từ để tránh spam).
            </li>
          </ul>
        </div>

        {/* Writing Textarea with Anti-spam Length Limit */}
        <div className="space-y-2 pt-2">
          <Textarea
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            onPaste={handlePaste}
            placeholder="Type your essay / paragraph response here in English (Hoặc để trống nếu chưa làm)..."
            rows={10}
            maxLength={3500}
            className={`w-full rounded-2xl border text-sm leading-relaxed p-4 font-sans transition-all ${
              isOverLimit
                ? "border-red-400 focus:border-red-500 ring-1 ring-red-400/30 bg-red-50/10"
                : "border-border focus:border-brand-blue"
            }`}
          />

          {/* Warning / Feedback Bar */}
          {isOverLimit && (
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 text-red-700 dark:text-red-300 text-xs font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>
                Bài viết đang vượt quá {wordsCount - maxWords} từ so với giới hạn tối đa ({maxWords} từ). Vui lòng cô đọng lại để bài viết hợp lệ.
              </span>
            </div>
          )}

          {pasteCount > 0 && (
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 text-amber-800 dark:text-amber-300 text-xs font-medium">
              <ShieldAlert className="w-4 h-4 shrink-0 text-amber-600" />
              <span>
                <strong>Lưu ý chống gian lận:</strong> Hệ thống đã ghi nhận {pasteCount} lần dán nội dung từ bên ngoài. Dữ liệu này được lưu kèm bài thi để Hội đồng khảo thí đối soát độ trung thực.
              </span>
            </div>
          )}

          <div className="flex justify-between items-center text-xs text-muted-foreground pt-1">
            <span>
              {wordsCount === 0
                ? "Thí sinh có thể để trống phần này nếu chưa tự tin về kỹ năng viết."
                : isOverLimit
                ? "Vui lòng rút ngắn nội dung trước khi nộp bài."
                : "Bài viết sẽ được ghi nhận và chuyển cho Giảng viên/AI chấm chuyên sâu."}
            </span>
            <span
              className={
                isOverLimit
                  ? "text-red-600 dark:text-red-400 font-extrabold"
                  : wordsCount > 0
                  ? "text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1"
                  : "text-muted-foreground"
              }
            >
              {wordsCount > 0 && !isOverLimit && <CheckCircle2 className="w-3.5 h-3.5" />}
              {wordsCount} / {maxWords} từ
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
