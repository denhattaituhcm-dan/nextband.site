import React, { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Copy,
  Download,
  FileText,
  CheckCircle2,
  AlertCircle,
  Clock,
  Award,
  TrendingUp,
  BookOpen,
  CalendarCheck,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { ProgressReportData } from "@/types/progressReport";

interface ProgressReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: ProgressReportData;
  onSaveReport?: (evaluation: {
    strengths: string;
    weaknesses: string;
    recommendations: string;
    nextGoals: string[];
  }) => Promise<void>;
}

export function ProgressReportModal({
  open,
  onOpenChange,
  data,
  onSaveReport,
}: ProgressReportModalProps) {
  // Structured Teacher Comments State
  const [strengths, setStrengths] = useState(
    data.teacherEvaluation?.strengths ||
      "Tiếp thu bài học tốt, tích cực tham gia các hoạt động luyện tập trên lớp."
  );
  const [weaknesses, setWeaknesses] = useState(
    data.teacherEvaluation?.weaknesses ||
      "Cần chú ý độ chính xác về cấu trúc ngữ pháp và mở rộng vốn từ vựng học thuật."
  );
  const [recommendations, setRecommendations] = useState(
    data.teacherEvaluation?.recommendations ||
      "Duy trì 20–30 phút tự học mỗi ngày, hoàn thành đầy đủ bài tập được giao đúng hạn."
  );
  const [goal1, setGoal1] = useState(
    data.teacherEvaluation?.nextGoals?.[0] || "Duy trì tỷ lệ chuyên cần ≥ 90%"
  );
  const [goal2, setGoal2] = useState(
    data.teacherEvaluation?.nextGoals?.[1] || "Hoàn thành 100% bài tập được giao đúng hạn"
  );
  const [goal3, setGoal3] = useState(
    data.teacherEvaluation?.nextGoals?.[2] || "Cải thiện độ chính xác bài kiểm tra lên ≥ 6.0"
  );

  const [isExporting, setIsExporting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Sync state when data changes
  useEffect(() => {
    if (data.teacherEvaluation?.strengths) setStrengths(data.teacherEvaluation.strengths);
    if (data.teacherEvaluation?.weaknesses) setWeaknesses(data.teacherEvaluation.weaknesses);
    if (data.teacherEvaluation?.recommendations) setRecommendations(data.teacherEvaluation.recommendations);
    if (data.teacherEvaluation?.nextGoals?.[0]) setGoal1(data.teacherEvaluation.nextGoals[0]);
    if (data.teacherEvaluation?.nextGoals?.[1]) setGoal2(data.teacherEvaluation.nextGoals[1]);
    if (data.teacherEvaluation?.nextGoals?.[2]) setGoal3(data.teacherEvaluation.nextGoals[2]);
    if (data.teacherNote && !data.teacherEvaluation?.strengths) {
      setStrengths(data.teacherNote);
    }
  }, [data]);

  const studentName = data.student?.name || "Học viên";
  const className = data.student?.className || "Lớp học";
  const teacherName = data.student?.teacherName || "Giảng viên phụ trách";
  const targetBand = data.student?.targetBand || "IELTS 6.0+";
  const periodStr = `${data.period?.from || ""} — ${data.period?.to || ""}`;

  // KPI Calculations
  const courseProgressPct = data.courseProgress?.percent ?? 60;
  const attendanceRate = data.attendance ? data.attendance.rate : 100;
  const hwCompleted = data.homework?.completed ?? 0;
  const hwTotal = data.homework?.totalAssigned ?? 0;
  const hwCompletionPct = data.homework?.completionRate ?? (hwTotal > 0 ? Math.round((hwCompleted / hwTotal) * 100) : 0);
  const latestBand = data.assessment?.latestOverall || (data.recentResults?.[0]?.score ? String(data.recentResults[0].score) : "Đang cập nhật");

  const FONT_FAMILY = "'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

  const drawRoundedRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number = 8,
    fillColor?: string,
    strokeColor?: string,
    lineWidth: number = 1
  ) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();

    if (fillColor) {
      ctx.fillStyle = fillColor;
      ctx.fill();
    }
    if (strokeColor) {
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    }
  };

  /**
   * Draw the Academic Progress Report onto an HTML5 Canvas with 2x Retina sharpness & high-fidelity typography
   */
  const drawReportToCanvas = async (): Promise<HTMLCanvasElement> => {
    // 1. Wait for Google Web Fonts (Plus Jakarta Sans & Inter) to be fully loaded in browser
    if (typeof document !== "undefined" && document.fonts) {
      try {
        await document.fonts.ready;
      } catch (e) {
        console.warn("Fonts ready promise error, fallback:", e);
      }
    }

    const width = 800;
    const height = 1180;
    const canvas = document.createElement("canvas");
    canvas.width = width * 2;
    canvas.height = height * 2;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D context not available");

    ctx.scale(2, 2);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // 1. Background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    // Outer subtle border
    drawRoundedRect(ctx, 16, 16, width - 32, height - 32, 12, undefined, "#e2e8f0", 1);

    // 2. Header Banner (Deep Navy Brand)
    drawRoundedRect(ctx, 20, 20, width - 40, 95, 10, "#0c1e38");

    // Top brand tag
    ctx.fillStyle = "#38bdf8";
    ctx.font = `800 11px ${FONT_FAMILY}`;
    ctx.fillText("HỌC VIỆN NGÔN NGỮ HỌC THUẬT ARIS", 44, 46);

    // Report Title
    ctx.fillStyle = "#ffffff";
    ctx.font = `800 20px ${FONT_FAMILY}`;
    ctx.fillText("BÁO CÁO TIẾN ĐỘ HỌC TẬP", 44, 72);

    // Period & Academic sub-badge
    ctx.fillStyle = "#94a3b8";
    ctx.font = `500 12px ${FONT_FAMILY}`;
    ctx.fillText(`Kỳ báo cáo: ${periodStr}`, 44, 95);

    ctx.fillStyle = "#38bdf8";
    ctx.font = `800 12px ${FONT_FAMILY}`;
    ctx.fillText("ACADEMIC PROGRESS REPORT", width - 240, 72);

    let currY = 130;

    // 3. Section 01: THÔNG TIN HỌC VIÊN & QUY MÔ LỚP HỌC (THUẦN DỮ LIỆU)
    const classCurrent = data.classInfo?.currentStudents || 6;
    const classMax = data.classInfo?.maxStudents || 10;

    drawRoundedRect(ctx, 36, currY, width - 72, 78, 8, "#f8fafc", "#e2e8f0", 1);

    // Left accent bar
    ctx.fillStyle = "#0284c7";
    ctx.beginPath();
    ctx.roundRect(36, currY, 4, 78, [8, 0, 0, 8]);
    ctx.fill();

    ctx.fillStyle = "#0f172a";
    ctx.font = `800 15px ${FONT_FAMILY}`;
    ctx.fillText(`HỌC VIÊN: ${studentName.toUpperCase()}`, 48, currY + 24);

    ctx.fillStyle = "#475569";
    ctx.font = `500 12px ${FONT_FAMILY}`;
    ctx.fillText(`• Lớp học: ${className}`, 48, currY + 46);
    ctx.fillText(`• Giảng viên: ${teacherName}`, 260, currY + 46);
    ctx.fillText(`• Mục tiêu đầu ra: ${targetBand}`, 500, currY + 46);

    // Quy mô lớp học (Factual metrics, no marketing buzzwords)
    ctx.fillStyle = "#0369a1";
    ctx.font = `700 12px ${FONT_FAMILY}`;
    ctx.fillText(`• QUY MÔ LỚP: ${classCurrent} / ${classMax} học viên (Sĩ số hiện tại / Sĩ số tối đa)`, 48, currY + 68);

    currY += 92;

    // 4. Section 02: 4 KPI CARDS TỔNG QUAN (Màu sắc học thuật nhất quán, không phán xét)
    const cardW = (width - 72 - 36) / 4;
    const cardH = 68;

    const kpis = [
      { label: "TIẾN ĐỘ KHÓA HỌC", val: `${courseProgressPct}%`, color: "#0284c7", sub: "Theo phân phối buổi" },
      { label: "CHUYÊN CẦN", val: `${attendanceRate}%`, color: "#0f172a", sub: data.attendance ? `${data.attendance.present}/${data.attendance.total} buổi` : "Chuẩn" },
      { label: "BÀI TẬP", val: `${hwCompleted}/${hwTotal}`, color: "#0f172a", sub: `Đạt ${hwCompletionPct}%` },
      { label: "ĐÁNH GIÁ GẦN NHẤT", val: String(latestBand).replace("Band ", ""), color: "#7c3aed", sub: "IELTS Scale" },
    ];

    kpis.forEach((kpi, idx) => {
      const kX = 36 + idx * (cardW + 12);
      drawRoundedRect(ctx, kX, currY, cardW, cardH, 8, "#f8fafc", "#e2e8f0", 1);

      ctx.fillStyle = "#64748b";
      ctx.font = `700 9.5px ${FONT_FAMILY}`;
      ctx.fillText(kpi.label, kX + 12, currY + 18);

      ctx.fillStyle = kpi.color;
      ctx.font = `800 19px ${FONT_FAMILY}`;
      ctx.fillText(kpi.val, kX + 12, currY + 42);

      ctx.fillStyle = "#94a3b8";
      ctx.font = `500 10.5px ${FONT_FAMILY}`;
      ctx.fillText(kpi.sub, kX + 12, currY + 58);
    });

    currY += cardH + 18;

    // Helper function to draw Section Header
    const drawSectionHeader = (title: string, y: number) => {
      ctx.fillStyle = "#0f172a";
      ctx.font = `800 13px ${FONT_FAMILY}`;
      ctx.fillText(title, 36, y);

      ctx.strokeStyle = "#cbd5e1";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(36, y + 6);
      ctx.lineTo(width - 36, y + 6);
      ctx.stroke();
    };

    // 5. Section 03: CHUYÊN CẦN
    drawSectionHeader("1. CHUYÊN CẦN & THAM GIA LỚP HỌC", currY);
    currY += 16;

    drawRoundedRect(ctx, 36, currY, width - 72, 54, 8, "#f8fafc", "#e2e8f0", 1);

    if (data.attendance && data.attendance.total > 0) {
      const att = data.attendance;
      ctx.fillStyle = "#1e293b";
      ctx.font = `500 12px ${FONT_FAMILY}`;
      ctx.fillText(
        `• Có mặt: ${att.present} buổi   |   • Đi muộn: ${att.late || 0} buổi   |   • Vắng không phép: ${att.absent} buổi   |   • Nghỉ phép: ${att.excused || 0} buổi`,
        52,
        currY + 24
      );

      // Progress Bar (Màu xanh thương hiệu nhất quán, không phán xét đỏ/vàng)
      const barX = 52;
      const barY = currY + 34;
      const barW = width - 104;
      const barH = 8;
      drawRoundedRect(ctx, barX, barY, barW, barH, 4, "#e2e8f0");

      const fillW = Math.min(barW, Math.max(0, (barW * att.rate) / 100));
      drawRoundedRect(ctx, barX, barY, fillW, barH, 4, "#0284c7");
    } else {
      ctx.fillStyle = "#64748b";
      ctx.font = `italic 500 12px ${FONT_FAMILY}`;
      ctx.fillText("Học viên duy trì tham gia đầy đủ các buổi học theo đúng lịch trình của khóa.", 52, currY + 32);
    }

    currY += 68;

    // 6. Section 04: BÀI TẬP VỀ NHÀ (3 LỚP THÔNG TIN: TIẾN ĐỘ + CHẤT LƯỢNG + NGUỒN CHẤM THỰC TẾ)
    drawSectionHeader("2. BÀI TẬP VỀ NHÀ & CHẤT LƯỢNG BÀI LÀM", currY);
    currY += 16;

    const hw = data.homework;
    const hwBoxH = 76;
    drawRoundedRect(ctx, 36, currY, width - 72, hwBoxH, 8, "#f8fafc", "#e2e8f0", 1);

    // Lớp 1: Mức độ hoàn thành
    ctx.fillStyle = "#059669";
    ctx.font = `700 12px ${FONT_FAMILY}`;
    ctx.fillText(`✓ Hoàn thành: ${hw.completed} / ${hw.totalAssigned} bài (${hwCompletionPct}%)`, 52, currY + 22);

    if (hw.overdue > 0) {
      ctx.fillStyle = "#e11d48";
      ctx.font = `700 12px ${FONT_FAMILY}`;
      ctx.fillText(`⚠ Quá hạn: ${hw.overdue} bài`, 340, currY + 22);
    } else {
      ctx.fillStyle = "#475569";
      ctx.font = `500 12px ${FONT_FAMILY}`;
      ctx.fillText(`• Đang thực hiện: ${hw.inProgress} bài`, 340, currY + 22);
    }

    ctx.fillStyle = "#64748b";
    ctx.font = `500 12px ${FONT_FAMILY}`;
    ctx.fillText(`• Chưa nộp: ${hw.unsubmitted} bài`, 540, currY + 22);

    // Lớp 2: Đánh giá chất lượng & Kết quả chấm
    ctx.fillStyle = "#1e293b";
    ctx.font = `500 11.5px ${FONT_FAMILY}`;
    const avgScoreStr = hw.averageScore ? `Điểm TB: ${hw.averageScore}` : "Điểm TB: Đang tích lũy";
    const passRateStr = `Đạt yêu cầu: ${hw.passedCount || 0} bài  |  Cần cải thiện: ${hw.needsImprovementCount || 0} bài`;
    ctx.fillText(`• Đã chấm & phản hồi: ${hw.gradedCount}/${hw.completed} bài   |   ${avgScoreStr}   |   ${passRateStr}`, 52, currY + 44);

    // Lớp 3: Nguồn chấm điểm thực tế từ submission (Chấm tự động vs Giáo viên chấm & phản hồi)
    ctx.fillStyle = "#0369a1";
    ctx.font = `600 11px ${FONT_FAMILY}`;
    ctx.fillText(
      `• Nguồn chấm: ${hw.autoGradedCount || 0} bài chấm tự động  ·  ${hw.teacherGradedCount || 0} bài giáo viên chấm & nhận xét`,
      52,
      currY + 64
    );

    currY += hwBoxH + 16;

    // 7. Section 05: KẾT QUẢ ĐÁNH GIÁ NĂNG LỰC
    drawSectionHeader("3. KẾT QUẢ ĐÁNH GIÁ NĂNG LỰC GẦN ĐÂY", currY);
    currY += 16;

    const hasResults = data.recentResults && data.recentResults.length > 0;
    if (hasResults) {
      const resCount = Math.min(3, data.recentResults.length);
      const boxH = resCount * 28 + 14;
      drawRoundedRect(ctx, 36, currY, width - 72, boxH, 8, "#f8fafc", "#e2e8f0", 1);

      data.recentResults.slice(0, 3).forEach((res, idx) => {
        const itemY = currY + 20 + idx * 26;
        ctx.fillStyle = "#1e293b";
        ctx.font = `500 12px ${FONT_FAMILY}`;
        ctx.fillText(`• ${res.title}`, 52, itemY);

        if (res.score != null) {
          ctx.fillStyle = "#0284c7";
          ctx.font = `700 12.5px ${FONT_FAMILY}`;
          ctx.fillText(`${res.score}`, width - 130, itemY);
        }
      });

      currY += boxH + 14;
    } else {
      drawRoundedRect(ctx, 36, currY, width - 72, 42, 8, "#f8fafc", "#e2e8f0", 1);

      ctx.fillStyle = "#64748b";
      ctx.font = `italic 500 12px ${FONT_FAMILY}`;
      ctx.fillText("Chưa có đủ dữ liệu đánh giá định kỳ để xác định xu hướng tiến bộ.", 52, currY + 26);
      currY += 56;
    }

    // 8. Section 06: NHẬN XÉT CỦA GIÁO VIÊN
    drawSectionHeader("4. NHẬN XÉT CHUYÊN MÔN CỦA GIẢNG VIÊN", currY);
    currY += 16;

    drawRoundedRect(ctx, 36, currY, width - 72, 130, 8, "#fefce8", "#fef08a", 1);

    // Strengths
    ctx.fillStyle = "#15803d";
    ctx.font = `700 11.5px ${FONT_FAMILY}`;
    ctx.fillText("✓ Điểm mạnh:", 52, currY + 24);
    ctx.fillStyle = "#1e293b";
    ctx.font = `500 11.5px ${FONT_FAMILY}`;
    ctx.fillText(strengths.trim().slice(0, 95) || "Tiếp thu tốt kiến thức trên lớp", 140, currY + 24);

    // Weaknesses
    ctx.fillStyle = "#b45309";
    ctx.font = `700 11.5px ${FONT_FAMILY}`;
    ctx.fillText("⚠ Cần cải thiện:", 52, currY + 58);
    ctx.fillStyle = "#1e293b";
    ctx.font = `500 11.5px ${FONT_FAMILY}`;
    ctx.fillText(weaknesses.trim().slice(0, 95) || "Cần chú ý cẩn thận hơn khi làm bài tập", 140, currY + 58);

    // Recommendations
    ctx.fillStyle = "#0369a1";
    ctx.font = `700 11.5px ${FONT_FAMILY}`;
    ctx.fillText("★ Khuyến nghị:", 52, currY + 92);
    ctx.fillStyle = "#1e293b";
    ctx.font = `500 11.5px ${FONT_FAMILY}`;
    ctx.fillText(recommendations.trim().slice(0, 95) || "Dành thêm 20-30 phút tự học mỗi ngày", 140, currY + 92);

    currY += 144;

    // 9. Section 07: MỤC TIÊU GIAI ĐOẠN TIẾP THEO
    drawSectionHeader("5. TRỌNG TÂM & MỤC TIÊU GIAI ĐOẠN TIẾP THEO", currY);
    currY += 16;

    drawRoundedRect(ctx, 36, currY, width - 72, 80, 8, "#f0fdf4", "#bbf7d0", 1);

    const goals = [goal1, goal2, goal3].filter(Boolean);
    if (goals.length > 0) {
      goals.forEach((g, idx) => {
        ctx.fillStyle = "#166534";
        ctx.font = `600 12px ${FONT_FAMILY}`;
        ctx.fillText(`•  ${g}`, 52, currY + 24 + idx * 24);
      });
    } else {
      ctx.fillStyle = "#166534";
      ctx.font = `500 12px ${FONT_FAMILY}`;
      ctx.fillText("•  Duy trì tỷ lệ chuyên cần 100% các buổi học", 52, currY + 24);
      ctx.fillText("•  Hoàn thành đầy đủ các bài tập tự học trên hệ thống", 52, currY + 48);
    }

    // 10. Footer & Brand Identity
    ctx.strokeStyle = "#e2e8f0";
    ctx.beginPath();
    ctx.moveTo(36, height - 52);
    ctx.lineTo(width - 36, height - 52);
    ctx.stroke();

    ctx.fillStyle = "#64748b";
    ctx.font = `600 10.5px ${FONT_FAMILY}`;
    ctx.fillText("HỌC VIỆN NGÔN NGỮ HỌC THUẬT ARIS — HỌC TIẾNG ANH TỪ BẢN CHẤT", 36, height - 32);
    ctx.fillText(`Website: nextband.site   |   Ngày xuất: ${data.generatedAt}`, width - 290, height - 32);

    return canvas;
  };

  /**
   * Action 1 (Primary): Copy Image to Clipboard
   */
  const handleCopyImage = async () => {
    setIsExporting(true);
    try {
      if (onSaveReport) {
        await onSaveReport({
          strengths,
          weaknesses,
          recommendations,
          nextGoals: [goal1, goal2, goal3],
        });
      }

      const canvas = await drawReportToCanvas();
      canvas.toBlob(async (blob) => {
        if (!blob) {
          toast.error("Không thể tạo ảnh báo cáo");
          setIsExporting(false);
          return;
        }

        try {
          if (navigator.clipboard && typeof ClipboardItem !== "undefined") {
            await navigator.clipboard.write([
              new ClipboardItem({ "image/png": blob }),
            ]);
            toast.success("Đã sao chép ảnh báo cáo! Hãy mở Zalo và nhấn Ctrl+V để gửi cho phụ huynh.");
          } else {
            handleDownloadImage();
          }
        } catch (clipErr) {
          console.warn("Clipboard copy failed, fallback to download:", clipErr);
          handleDownloadImage();
        } finally {
          setIsExporting(false);
        }
      }, "image/png");
    } catch (err: any) {
      toast.error(err.message || "Lỗi khi tạo ảnh");
      setIsExporting(false);
    }
  };

  /**
   * Action 2 (Secondary): Download PNG
   */
  const handleDownloadImage = async () => {
    try {
      if (onSaveReport) {
        await onSaveReport({
          strengths,
          weaknesses,
          recommendations,
          nextGoals: [goal1, goal2, goal3],
        });
      }

      const canvas = await drawReportToCanvas();
      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      const safeName = studentName.replace(/[^a-zA-Z0-9\u00C0-\u024F\u1E00-\u1EFF]/g, "_");
      a.download = `Bao_cao_tien_do_${safeName}.png`;
      a.href = dataUrl;
      a.click();
      toast.success("Đã tải tệp ảnh báo cáo PNG về máy.");
    } catch (err: any) {
      toast.error("Không thể tải ảnh: " + err.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[92vh] overflow-y-auto p-6 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-base font-bold flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            Báo Cáo Tiến Độ Học Tập — ARIS Academic Report
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* LEFT: FORM NHẬP NHẬN XÉT CỦA GIÁO VIÊN */}
          <div className="lg:col-span-5 space-y-3.5 bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
            <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 pb-1 border-b">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Nhận Xét Chuyên Môn Của Giáo Viên
            </div>

            <div className="space-y-1">
              <Label className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                1. Điểm mạnh học viên
              </Label>
              <Textarea
                rows={2}
                value={strengths}
                onChange={(e) => setStrengths(e.target.value)}
                placeholder="Ví dụ: Tiếp thu từ vựng nhanh, phát âm chuẩn..."
                className="text-xs resize-none bg-white dark:bg-slate-950"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-[11px] font-bold text-amber-700 dark:text-amber-400">
                2. Điểm cần cải thiện
              </Label>
              <Textarea
                rows={2}
                value={weaknesses}
                onChange={(e) => setWeaknesses(e.target.value)}
                placeholder="Ví dụ: Cần chú ý chia thì, cấu trúc câu Writing..."
                className="text-xs resize-none bg-white dark:bg-slate-950"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-[11px] font-bold text-sky-700 dark:text-sky-400">
                3. Khuyến nghị tự học
              </Label>
              <Textarea
                rows={2}
                value={recommendations}
                onChange={(e) => setRecommendations(e.target.value)}
                placeholder="Ví dụ: Dành 20-30 phút ôn lại từ vựng mỗi ngày..."
                className="text-xs resize-none bg-white dark:bg-slate-950"
              />
            </div>

            <div className="space-y-1.5 pt-1 border-t">
              <Label className="text-[11px] font-bold text-indigo-700 dark:text-indigo-400">
                4. Mục tiêu giai đoạn tiếp theo (3 mục tiêu)
              </Label>
              <Input
                value={goal1}
                onChange={(e) => setGoal1(e.target.value)}
                className="h-7 text-xs bg-white dark:bg-slate-950"
                placeholder="Mục tiêu 1"
              />
              <Input
                value={goal2}
                onChange={(e) => setGoal2(e.target.value)}
                className="h-7 text-xs bg-white dark:bg-slate-950"
                placeholder="Mục tiêu 2"
              />
              <Input
                value={goal3}
                onChange={(e) => setGoal3(e.target.value)}
                className="h-7 text-xs bg-white dark:bg-slate-950"
                placeholder="Mục tiêu 3"
              />
            </div>
          </div>

          {/* RIGHT: LIVE CARD PREVIEW */}
          <div
            ref={cardRef}
            className="lg:col-span-7 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 space-y-3.5 shadow-sm text-slate-900 dark:text-slate-100 text-xs"
          >
            {/* Header Banner */}
            <div className="bg-[#0c1e38] text-white p-3.5 rounded-lg space-y-0.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-sky-400">
                HỌC VIỆN NGÔN NGỮ HỌC THUẬT ARIS
              </div>
              <div className="text-sm font-extrabold tracking-wide">
                BÁO CÁO TIẾN ĐỘ HỌC TẬP
              </div>
              <div className="text-[10.5px] text-slate-300">
                Kỳ báo cáo: {periodStr}
              </div>
            </div>

            {/* Student Info */}
            <div className="p-2.5 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1.5">
              <div className="font-bold text-xs text-slate-900 dark:text-white">
                HỌC VIÊN: {studentName.toUpperCase()}
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 dark:text-slate-300">
                <span>• Lớp: <strong>{className}</strong></span>
                <span>• Giảng viên: <strong>{teacherName}</strong></span>
                <span>• Mục tiêu: <strong>{targetBand}</strong></span>
                <span>• Ngày xuất: <strong>{data.generatedAt}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 pt-1 border-t border-slate-200/60 dark:border-slate-800 text-[11px]">
                <span className="font-bold text-sky-700 dark:text-sky-400">QUY MÔ LỚP:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {data.classInfo?.currentStudents || 6} / {data.classInfo?.maxStudents || 10} học viên (Sĩ số hiện tại / Tối đa)
                </span>
              </div>
            </div>

            {/* 4 KPI Cards */}
            <div className="grid grid-cols-4 gap-1.5">
              <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 text-center">
                <div className="text-[9px] text-slate-500 font-semibold">TIẾN ĐỘ</div>
                <div className="text-sm font-extrabold text-sky-600">{courseProgressPct}%</div>
              </div>
              <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 text-center">
                <div className="text-[9px] text-slate-500 font-semibold">CHUYÊN CẦN</div>
                <div className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                  {attendanceRate}%
                </div>
              </div>
              <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 text-center">
                <div className="text-[9px] text-slate-500 font-semibold">BÀI TẬP</div>
                <div className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                  {hwCompleted}/{hwTotal}
                </div>
              </div>
              <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 text-center">
                <div className="text-[9px] text-slate-500 font-semibold">ĐÁNH GIÁ</div>
                <div className="text-xs font-extrabold text-purple-600 truncate mt-0.5">
                  {String(latestBand).replace("Band ", "")}
                </div>
              </div>
            </div>

            {/* Attendance */}
            <div className="space-y-1">
              <div className="font-bold text-[11px] text-slate-800 dark:text-slate-200">
                1. CHUYÊN CẦN LỚP HỌC
              </div>
              <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-300">
                {data.attendance && data.attendance.total > 0 ? (
                  <>• Có mặt: <strong>{data.attendance.present}/{data.attendance.total}</strong> buổi | Đi muộn: <strong>{data.attendance.late || 0}</strong> | Vắng: <strong>{data.attendance.absent}</strong> ({data.attendance.rate}%)</>
                ) : (
                  <>• Chuyên cần lớp học: <strong>Đạt 100%</strong> (Tham gia đầy đủ các buổi)</>
                )}
              </div>
            </div>

            {/* Homework */}
            <div className="space-y-1">
              <div className="font-bold text-[11px] text-slate-800 dark:text-slate-200 flex justify-between">
                <span>2. BÀI TẬP VỀ NHÀ & CHẤT LƯỢNG BÀI LÀM</span>
                {data.homework.averageScore && (
                  <span className="text-sky-600 font-semibold">Điểm TB: {data.homework.averageScore}</span>
                )}
              </div>
              <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 text-[11px] space-y-1">
                <div className="flex justify-between font-medium">
                  <span className="text-emerald-600 font-bold">✓ Hoàn thành: {hwCompleted}/{hwTotal} ({hwCompletionPct}%)</span>
                  {data.homework.overdue > 0 ? (
                    <span className="text-rose-600 font-bold">⚠ Quá hạn: {data.homework.overdue} bài</span>
                  ) : (
                    <span className="text-slate-500">• Chưa nộp: {data.homework.unsubmitted} bài</span>
                  )}
                </div>
                <div className="text-[10.5px] text-slate-600 dark:text-slate-300 flex justify-between">
                  <span>Đã chấm & phản hồi: <strong>{data.homework.gradedCount}/{hwCompleted}</strong> bài | Đạt chuẩn: <strong className="text-emerald-600">{data.homework.passedCount || 0}</strong> | Cần cải thiện: <strong className="text-amber-600">{data.homework.needsImprovementCount || 0}</strong></span>
                </div>
                <div className="text-[10px] text-sky-700 dark:text-sky-400">
                  • Nguồn chấm: {data.homework.autoGradedCount || 0} bài chấm tự động · {data.homework.teacherGradedCount || 0} bài giáo viên chấm & nhận xét
                </div>
                {data.homework.overdueTitles && data.homework.overdueTitles.length > 0 && (
                  <div className="text-[10.5px] text-rose-600 font-medium pt-0.5">
                    Cần làm bù: {data.homework.overdueTitles.join(", ")}
                  </div>
                )}
              </div>
            </div>

            {/* Assessment results */}
            <div className="space-y-1">
              <div className="font-bold text-[11px] text-slate-800 dark:text-slate-200">
                3. KẾT QUẢ ĐÁNH GIÁ
              </div>
              <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 text-[11px]">
                {data.recentResults && data.recentResults.length > 0 ? (
                  data.recentResults.slice(0, 2).map((r, i) => (
                    <div key={i} className="flex justify-between py-0.5">
                      <span>• {r.title}</span>
                      <span className="font-bold text-sky-600">{r.score}</span>
                    </div>
                  ))
                ) : (
                  <span className="italic text-slate-500">Chưa có đủ dữ liệu đánh giá định kỳ để xác định xu hướng.</span>
                )}
              </div>
            </div>

            {/* Teacher Notes Preview */}
            <div className="p-2.5 bg-amber-50/70 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-900 text-[11px] space-y-1 text-slate-800 dark:text-slate-200">
              <div className="font-bold text-amber-900 dark:text-amber-300">4. NHẬN XÉT CỦA GIÁO VIÊN</div>
              <div><strong className="text-emerald-700">Điểm mạnh:</strong> {strengths.slice(0, 70)}...</div>
              <div><strong className="text-amber-700">Cải thiện:</strong> {weaknesses.slice(0, 70)}...</div>
              <div><strong className="text-sky-700">Khuyến nghị:</strong> {recommendations.slice(0, 70)}...</div>
            </div>

            {/* Footer watermark */}
            <div className="pt-1 text-[10px] text-slate-400 flex items-center justify-between border-t">
              <span>Học Viện ARIS — Học Tiếng Anh Từ Bản Chất</span>
              <span>nextband.site</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-3 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="rounded-xl font-medium"
          >
            Đóng
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleDownloadImage}
            className="rounded-xl font-bold gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            Tải ảnh PNG
          </Button>

          <Button
            variant="default"
            size="sm"
            disabled={isExporting}
            onClick={handleCopyImage}
            className="rounded-xl font-bold gap-1.5 bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
          >
            <Copy className="w-3.5 h-3.5" />
            {isExporting ? "Đang tạo ảnh..." : "Sao chép ảnh (Dán vào Zalo)"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

