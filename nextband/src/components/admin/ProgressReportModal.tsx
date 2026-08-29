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
  Clock,
  Sparkles,
  Target,
} from "lucide-react";
import { toast } from "sonner";
import { ProgressReportData } from "@/types/progressReport";
import { SiteLogo } from "@/components/common/SiteLogo";

interface ProgressReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: ProgressReportData;
  onSaveReport?: (evaluation: {
    strengths: string;
    weaknesses: string;
    recommendations: string;
    nextGoals?: string[];
    targetBand?: string;
  }) => Promise<void>;
}

const TARGET_PRESETS = [
  "IELTS 5.5",
  "IELTS 6.0",
  "IELTS 6.5+",
  "IELTS 7.0+",
  "IELTS 7.5+",
  "IELTS 8.0+",
];

export function ProgressReportModal({
  open,
  onOpenChange,
  data,
  onSaveReport,
}: ProgressReportModalProps) {
  // Target Band state
  const [targetBand, setTargetBand] = useState(
    data.student?.targetBand || "IELTS 6.5+"
  );

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

  const [isExporting, setIsExporting] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Sync state when data changes
  useEffect(() => {
    if (data.student?.targetBand) setTargetBand(data.student.targetBand);
    if (data.teacherEvaluation?.strengths) setStrengths(data.teacherEvaluation.strengths);
    if (data.teacherEvaluation?.weaknesses) setWeaknesses(data.teacherEvaluation.weaknesses);
    if (data.teacherEvaluation?.recommendations) setRecommendations(data.teacherEvaluation.recommendations);
    if (data.teacherNote && !data.teacherEvaluation?.strengths) {
      setStrengths(data.teacherNote);
    }
  }, [data]);

  const studentName = data.student?.name || "Học viên";
  const className = data.student?.className || "Lớp học";
  const teacherName = data.student?.teacherName || "Giảng viên phụ trách";
  const periodStr = `${data.period?.from || ""} — ${data.period?.to || ""}`;

  // KPI Calculations
  const courseProgressPct = data.courseProgress?.percent ?? 60;
  const attendanceRate = data.attendance ? data.attendance.rate : 100;
  const hwCompleted = data.homework?.completed ?? 0;
  const hwTotal = data.homework?.totalAssigned ?? 0;
  const hwCompletionPct = data.homework?.completionRate ?? (hwTotal > 0 ? Math.round((hwCompleted / hwTotal) * 100) : 0);

  // Time metrics (Tactical Duration)
  const totalMinutes = data.homework?.totalTimeSpentMinutes || Math.max(1, hwCompleted * 20);
  const hoursFormatted = (totalMinutes / 60).toFixed(1);
  const avgMinutes = data.homework?.avgTimeSpentMinutes || (hwCompleted > 0 ? Math.round(totalMinutes / hwCompleted) : 20);

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
   * Helper to draw text with multi-line wrapping
   */
  const drawWrappedText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number,
    maxLines: number = 3
  ): number => {
    const words = (text || "").trim().split(/\s+/);
    let line = "";
    let currentY = y;
    let linesCount = 0;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + (line ? " " : "") + words[n];
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;

      if (testWidth > maxWidth && n > 0) {
        if (linesCount >= maxLines - 1) {
          ctx.fillText(line + "...", x, currentY);
          return currentY + lineHeight;
        }
        ctx.fillText(line, x, currentY);
        line = words[n];
        currentY += lineHeight;
        linesCount++;
      } else {
        line = testLine;
      }
    }
    if (line) {
      ctx.fillText(line, x, currentY);
      currentY += lineHeight;
    }
    return currentY;
  };

  /**
   * Preload Logo Image
   */
  const loadLogoImage = async (): Promise<HTMLImageElement | null> => {
    if (typeof document !== "undefined") {
      const previewImg = cardRef.current?.querySelector("img") as HTMLImageElement | null;
      if (previewImg && previewImg.complete && previewImg.naturalWidth > 0) {
        return previewImg;
      }
    }

    const tryLoad = (src: string): Promise<HTMLImageElement | null> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
        img.src = src;
        setTimeout(() => resolve(null), 2000);
      });
    };

    const direct = await tryLoad("/Logo.png");
    if (direct && direct.naturalWidth > 0) return direct;

    const fallback = await tryLoad("/favicon.png");
    if (fallback && fallback.naturalWidth > 0) return fallback;

    return null;
  };

  /**
   * Draw the Tactical Esports HUD Academic Progress Report onto HTML5 Canvas (2x Retina)
   */
  const drawReportToCanvas = async (): Promise<HTMLCanvasElement> => {
    if (typeof document !== "undefined" && document.fonts) {
      try {
        await document.fonts.ready;
      } catch (e) {
        console.warn("Fonts ready fallback:", e);
      }
    }

    const logoImg = await loadLogoImage();

    const width = 760;
    const height = 918;
    const canvas = document.createElement("canvas");
    canvas.width = width * 2;
    canvas.height = height * 2;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D context not available");

    ctx.scale(2, 2);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // 1. Tactical Deep Charcoal / Navy Background
    ctx.fillStyle = "#080e1a";
    ctx.fillRect(0, 0, width, height);

    // Subtle Tactical Grid / Ambient Glow
    const gradient = ctx.createRadialGradient(width / 2, 80, 20, width / 2, 80, 450);
    gradient.addColorStop(0, "rgba(2, 132, 199, 0.12)");
    gradient.addColorStop(1, "rgba(8, 14, 26, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Outer Tactical Border
    drawRoundedRect(ctx, 14, 14, width - 28, height - 28, 16, undefined, "#1e293b", 1.5);

    // 2. Header Banner (Cyber Plate)
    drawRoundedRect(ctx, 22, 22, width - 44, 94, 12, "#0d1728", "#1e3a5f", 1.2);

    // Logo Container on Left
    drawRoundedRect(ctx, 36, 32, 74, 74, 10, "#ffffff", "#38bdf8", 1.5);
    if (logoImg && logoImg.naturalWidth > 0) {
      const boxX = 36;
      const boxY = 32;
      const boxSize = 74;
      const padding = 6;
      const maxW = boxSize - padding * 2;
      const maxH = boxSize - padding * 2;
      const scale = Math.min(maxW / logoImg.naturalWidth, maxH / logoImg.naturalHeight, 1);
      const drawW = logoImg.naturalWidth * scale;
      const drawH = logoImg.naturalHeight * scale;
      const drawX = boxX + (boxSize - drawW) / 2;
      const drawY = boxY + (boxSize - drawH) / 2;
      ctx.drawImage(logoImg, drawX, drawY, drawW, drawH);
    } else {
      ctx.fillStyle = "#0c1e38";
      ctx.font = `900 18px ${FONT_FAMILY}`;
      ctx.fillText("ARIS", 52, 74);
    }

    // Top Brand Tag (Electric Cyan)
    ctx.fillStyle = "#38bdf8";
    ctx.font = `800 11.5px ${FONT_FAMILY}`;
    ctx.fillText("HỌC VIỆN NGÔN NGỮ HỌC THUẬT ARIS", 124, 49);

    // Report Title
    ctx.fillStyle = "#ffffff";
    ctx.font = `800 22px ${FONT_FAMILY}`;
    ctx.fillText("BÁO CÁO TIẾN ĐỘ HỌC TẬP", 124, 76);

    // Period sub-badge (Muted Steel Slate)
    ctx.fillStyle = "#94a3b8";
    ctx.font = `500 12.5px ${FONT_FAMILY}`;
    ctx.fillText(`Kỳ báo cáo: ${periodStr}`, 124, 98);

    // Esports Tactical Tag on Right
    drawRoundedRect(ctx, width - 248, 44, 214, 34, 8, "rgba(56, 189, 248, 0.1)", "#38bdf8", 1);
    ctx.fillStyle = "#38bdf8";
    ctx.font = `800 10.5px ${FONT_FAMILY}`;
    ctx.fillText("ACADEMIC PROGRESS REPORT", width - 236, 66);

    let currY = 126;

    // 3. Player Plate (Thông tin học viên & Quy mô lớp)
    const classCurrent = data.classInfo?.currentStudents || 6;
    const classMax = data.classInfo?.maxStudents || 10;

    drawRoundedRect(ctx, 22, currY, width - 44, 92, 10, "#0e182a", "#1e2c45", 1);

    // Left Cyan Energy Bar
    ctx.fillStyle = "#0284c7";
    ctx.beginPath();
    ctx.roundRect(22, currY, 5, 92, [10, 0, 0, 10]);
    ctx.fill();

    // Student Name
    ctx.fillStyle = "#ffffff";
    ctx.font = `800 18px ${FONT_FAMILY}`;
    ctx.fillText(`HỌC VIÊN: ${studentName.toUpperCase()}`, 40, currY + 29);

    // Class and Teacher Info
    ctx.fillStyle = "#cbd5e1";
    ctx.font = `700 13px ${FONT_FAMILY}`;
    ctx.fillText(`• Lớp học: ${className}`, 40, currY + 55);
    ctx.fillText(`• Giảng viên: ${teacherName}`, 246, currY + 55);

    // Target Band Badge (Flame Amber / Gold)
    drawRoundedRect(ctx, 470, currY + 38, 230, 26, 6, "rgba(245, 158, 11, 0.15)", "#f59e0b", 1);
    ctx.fillStyle = "#fbbf24";
    ctx.font = `800 12px ${FONT_FAMILY}`;
    ctx.fillText(`🎯 Target: ${targetBand}`, 482, currY + 55);

    // Sĩ số
    ctx.fillStyle = "#94a3b8";
    ctx.font = `600 12.5px ${FONT_FAMILY}`;
    ctx.fillText(`• Sĩ số: ${classCurrent} học viên (tối đa ${classMax} HV)`, 40, currY + 77);

    currY += 104;

    // 4. 3 Core HUD Stat Pods (High contrast, clean gauges)
    const cardGap = 12;
    const totalW = width - 44;
    const cardW = (totalW - cardGap * 2) / 3;
    const cardH = 92;

    const kpis = [
      {
        label: "TIẾN ĐỘ KHÓA HỌC",
        val: `${courseProgressPct}%`,
        color: "#38bdf8",
        bg: "#0c1a2f",
        border: "#0284c7",
        sub: data.courseProgress?.totalSessions
          ? `Đã hoàn thành ${data.courseProgress.completedSessions || 0}/${data.courseProgress.totalSessions} buổi`
          : "Theo phân phối buổi học",
      },
      {
        label: "CHUYÊN CẦN",
        val: `${attendanceRate}%`,
        color: "#10b981",
        bg: "#06221d",
        border: "#059669",
        sub: data.attendance && data.attendance.total > 0
          ? `Có mặt ${data.attendance.present}/${data.attendance.total} buổi`
          : "Tham gia đầy đủ 100%",
      },
      {
        label: "BÀI TẬP VỀ NHÀ",
        val: `${hwCompleted}/${hwTotal}`,
        color: "#fbbf24",
        bg: "#241805",
        border: "#d97706",
        sub: `Đạt ${hwCompletionPct}% hoàn thành`,
      },
    ];

    kpis.forEach((kpi, idx) => {
      const kX = 22 + idx * (cardW + cardGap);
      drawRoundedRect(ctx, kX, currY, cardW, cardH, 10, kpi.bg, kpi.border, 1.2);

      ctx.fillStyle = "#94a3b8";
      ctx.font = `800 11px ${FONT_FAMILY}`;
      ctx.fillText(kpi.label, kX + 16, currY + 23);

      ctx.fillStyle = kpi.color;
      ctx.font = `800 30px ${FONT_FAMILY}`;
      ctx.fillText(kpi.val, kX + 16, currY + 56);

      ctx.fillStyle = "#cbd5e1";
      ctx.font = `600 11.5px ${FONT_FAMILY}`;
      ctx.fillText(kpi.sub, kX + 16, currY + 77);
    });

    currY += cardH + 18;

    // Helper function for Section Headers (Esports HUD Style)
    const drawSectionHeader = (title: string, y: number) => {
      ctx.fillStyle = "#38bdf8";
      ctx.font = `800 14px ${FONT_FAMILY}`;
      ctx.fillText(title, 22, y);

      ctx.strokeStyle = "#1e3a5f";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(22, y + 6);
      ctx.lineTo(width - 22, y + 6);
      ctx.stroke();
    };

    // 5. Section 01: BÀI TẬP VỀ NHÀ & CHẤT LƯỢNG BÀI LÀM (Battle Record & Duration)
    drawSectionHeader("1. BÀI TẬP VỀ NHÀ & CHẤT LƯỢNG BÀI LÀM", currY);
    currY += 16;

    const hw = data.homework;
    const hwBoxH = 168;
    drawRoundedRect(ctx, 22, currY, width - 44, hwBoxH, 10, "#0c1524", "#1e2c45", 1);

    // Lớp 1: Mức độ hoàn thành
    ctx.fillStyle = "#10b981";
    ctx.font = `800 14px ${FONT_FAMILY}`;
    ctx.fillText(`✓ Hoàn thành: ${hw.completed} / ${hw.totalAssigned} bài (${hwCompletionPct}%)`, 38, currY + 26);

    if (hw.overdue > 0) {
      ctx.fillStyle = "#f43f5e";
      ctx.font = `700 13.5px ${FONT_FAMILY}`;
      ctx.fillText(`⚠ Quá hạn: ${hw.overdue} bài`, 340, currY + 26);
    } else {
      ctx.fillStyle = "#94a3b8";
      ctx.font = `600 13px ${FONT_FAMILY}`;
      ctx.fillText(`• Đang làm: ${hw.inProgress} bài`, 340, currY + 26);
    }

    ctx.fillStyle = "#64748b";
    ctx.font = `600 13px ${FONT_FAMILY}`;
    ctx.fillText(`• Chưa nộp: ${hw.unsubmitted} bài`, 530, currY + 26);

    // Tactical Progress Bar (Energy Bar)
    const hwBarX = 38;
    const hwBarY = currY + 38;
    const hwBarW = width - 76;
    const hwBarH = 8;
    drawRoundedRect(ctx, hwBarX, hwBarY, hwBarW, hwBarH, 4, "#1e293b");
    const hwFillW = Math.min(hwBarW, Math.max(0, (hwBarW * hwCompletionPct) / 100));
    if (hwFillW > 0) {
      drawRoundedRect(ctx, hwBarX, hwBarY, hwFillW, hwBarH, 4, "#10b981");
    }

    // Lớp 2: NEW DURATION METRICS (TỔNG THỜI LƯỢNG RÈN LUYỆN)
    drawRoundedRect(ctx, 38, currY + 54, width - 76, 28, 6, "#13233a", "#0284c7", 1);
    ctx.fillStyle = "#38bdf8";
    ctx.font = `800 12.5px ${FONT_FAMILY}`;
    ctx.fillText(
      `⏱️ TỔNG THỜI LƯỢNG RÈN LUYỆN: ${totalMinutes} phút (~${hoursFormatted} giờ)`,
      48,
      currY + 72
    );
    ctx.fillStyle = "#fbbf24";
    ctx.font = `700 12px ${FONT_FAMILY}`;
    ctx.fillText(`• Trung bình: ${avgMinutes} phút/bài`, width - 230, currY + 72);

    // Lớp 3: Đánh giá chất lượng & Kết quả chấm
    ctx.fillStyle = "#e2e8f0";
    ctx.font = `700 13px ${FONT_FAMILY}`;
    const avgScoreStr = hw.averageScore ? `Điểm TB: ${hw.averageScore}` : "Điểm TB: Đang tích lũy";
    const passRateStr = `Đạt chuẩn: ${hw.passedCount || 0} bài  |  Cần cải thiện: ${hw.needsImprovementCount || 0} bài`;
    ctx.fillText(`• Đã chấm & phản hồi: ${hw.gradedCount}/${hw.completed} bài   |   ${avgScoreStr}   |   ${passRateStr}`, 38, currY + 106);

    // Lớp 4: Nguồn chấm điểm thực tế
    ctx.fillStyle = "#94a3b8";
    ctx.font = `600 12.5px ${FONT_FAMILY}`;
    ctx.fillText(
      `• Nguồn chấm: ${hw.autoGradedCount || 0} bài tự động · ${hw.teacherGradedCount || 0} bài giáo viên chấm & nhận xét`,
      38,
      currY + 130
    );

    // Lớp 5: Điểm TB Speaking & Writing
    const spkAvg = hw.skillAverages?.speaking;
    const wrtAvg = hw.skillAverages?.writing;
    const spkText = spkAvg ? `Speaking: ${spkAvg.averageBand} (${spkAvg.count} bài)` : "Speaking: Đang tích lũy";
    const wrtText = wrtAvg ? `Writing: ${wrtAvg.averageBand} (${wrtAvg.count} bài)` : "Writing: Đang tích lũy";

    ctx.fillStyle = "#a5b4fc";
    ctx.font = `700 12.5px ${FONT_FAMILY}`;
    ctx.fillText(
      `• TB Kỹ năng (GV chấm): 🗣️ ${spkText}   |   ✍️ ${wrtText}`,
      38,
      currY + 152
    );

    currY += hwBoxH + 18;

    // 6. Section 02: NHẬN XÉT CHUYÊN MÔN CỦA GIẢNG VIÊN (3 Tactical Debrief Modules)
    drawSectionHeader("2. NHẬN XÉT CHUYÊN MÔN CỦA GIẢNG VIÊN", currY);
    currY += 16;

    const subCardH = 82;
    const subCardGap = 10;

    // Sub-card 1: Điểm mạnh (Tactical Emerald)
    const sc1Y = currY;
    drawRoundedRect(ctx, 22, sc1Y, width - 44, subCardH, 8, "#06221d", "#059669", 1);
    ctx.fillStyle = "#10b981";
    ctx.font = `800 13px ${FONT_FAMILY}`;
    ctx.fillText("✓ Điểm mạnh học viên:", 36, sc1Y + 23);
    ctx.fillStyle = "#e2e8f0";
    ctx.font = `500 13px ${FONT_FAMILY}`;
    drawWrappedText(ctx, strengths || "Tiếp thu tốt kiến thức trên lớp, chủ động tương tác.", 36, sc1Y + 44, width - 72, 19, 2);

    // Sub-card 2: Cần cải thiện (Tactical Amber)
    const sc2Y = sc1Y + subCardH + subCardGap;
    drawRoundedRect(ctx, 22, sc2Y, width - 44, subCardH, 8, "#241805", "#d97706", 1);
    ctx.fillStyle = "#fbbf24";
    ctx.font = `800 13px ${FONT_FAMILY}`;
    ctx.fillText("⚠ Điểm cần chú ý cải thiện:", 36, sc2Y + 23);
    ctx.fillStyle = "#e2e8f0";
    ctx.font = `500 13px ${FONT_FAMILY}`;
    drawWrappedText(ctx, weaknesses || "Cần chú ý cẩn thận hơn về cấu trúc ngữ pháp và từ vựng học thuật.", 36, sc2Y + 44, width - 72, 19, 2);

    // Sub-card 3: Khuyến nghị & Kế hoạch hành động (Tactical Cyan)
    const sc3Y = sc2Y + subCardH + subCardGap;
    drawRoundedRect(ctx, 22, sc3Y, width - 44, subCardH, 8, "#0c1a2f", "#0284c7", 1);
    ctx.fillStyle = "#38bdf8";
    ctx.font = `800 13px ${FONT_FAMILY}`;
    ctx.fillText("★ Khuyến nghị & Kế hoạch rèn luyện:", 36, sc3Y + 23);
    ctx.fillStyle = "#e2e8f0";
    ctx.font = `500 13px ${FONT_FAMILY}`;
    drawWrappedText(ctx, recommendations || "Dành thêm 20-30 phút tự học mỗi ngày, hoàn thành bài tập đúng hạn.", 36, sc3Y + 44, width - 72, 19, 2);

    // 7. Footer & Brand Identity (Watermark)
    ctx.strokeStyle = "#1e293b";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(22, height - 38);
    ctx.lineTo(width - 22, height - 38);
    ctx.stroke();

    ctx.fillStyle = "#64748b";
    ctx.font = `600 11.5px ${FONT_FAMILY}`;
    ctx.fillText("68B, Phan Bội Châu, P. Dĩ An, TP.HCM", 22, height - 18);

    ctx.fillStyle = "#94a3b8";
    ctx.font = `500 11.5px ${FONT_FAMILY}`;
    ctx.fillText(`Website: nextband.site   |   Ngày xuất: ${data.generatedAt}`, width - 280, height - 18);

    return canvas;
  };

  /**
   * Copy Image to Clipboard
   */
  const handleCopyImage = async () => {
    setIsExporting(true);
    try {
      if (onSaveReport) {
        await onSaveReport({
          strengths,
          weaknesses,
          recommendations,
          targetBand,
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
          console.warn("Clipboard fallback to download:", clipErr);
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
   * Download PNG
   */
  const handleDownloadImage = async () => {
    try {
      if (onSaveReport) {
        await onSaveReport({
          strengths,
          weaknesses,
          recommendations,
          targetBand,
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
      <DialogContent className="max-w-4xl max-h-[94vh] overflow-y-auto p-5 sm:p-6 rounded-2xl bg-slate-950 text-slate-100 border border-slate-800">
        <DialogHeader>
          <DialogTitle className="text-base font-bold flex items-center gap-2 text-sky-400">
            <FileText className="w-4 h-4 text-sky-400" />
            Báo Cáo Tiến Độ Học Tập — Academic Progress Report
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* LEFT: FORM CHỈNH SỬA THÔNG TIN & NHẬN XÉT CỦA GIÁO VIÊN */}
          <div className="lg:col-span-5 space-y-4 bg-slate-900/90 p-4 rounded-xl border border-slate-800 text-xs">
            {/* Target Band */}
            <div className="space-y-1.5 pb-2 border-b border-slate-800">
              <Label className="text-[11.5px] font-bold text-amber-400 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-amber-400" />
                Mục tiêu đầu ra (Target Band)
              </Label>
              <Input
                value={targetBand}
                onChange={(e) => setTargetBand(e.target.value)}
                className="h-8 text-xs bg-slate-950 border-slate-700 text-amber-300 font-bold"
                placeholder="Ví dụ: IELTS 6.5+"
              />
              <div className="flex flex-wrap gap-1 pt-1">
                {TARGET_PRESETS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setTargetBand(preset)}
                    className={`px-2 py-0.5 text-[10px] rounded-md font-semibold transition-colors ${
                      targetBand === preset
                        ? "bg-amber-500 text-slate-950 font-bold"
                        : "bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700"
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            <div className="font-bold text-sky-400 flex items-center gap-1.5 pb-0.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              Nhận Xét Chuyên Môn Của Giảng Viên
            </div>

            <div className="space-y-1">
              <Label className="text-[11px] font-bold text-emerald-400">
                1. Điểm mạnh học viên
              </Label>
              <Textarea
                rows={2}
                value={strengths}
                onChange={(e) => setStrengths(e.target.value)}
                placeholder="Ví dụ: Tiếp thu từ vựng nhanh, phát âm chuẩn..."
                className="text-xs resize-none bg-slate-950 border-slate-700 text-slate-200"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-[11px] font-bold text-amber-400">
                2. Điểm cần chú ý cải thiện
              </Label>
              <Textarea
                rows={2}
                value={weaknesses}
                onChange={(e) => setWeaknesses(e.target.value)}
                placeholder="Ví dụ: Cần chú ý chia thì, cấu trúc câu Writing..."
                className="text-xs resize-none bg-slate-950 border-slate-700 text-slate-200"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-[11px] font-bold text-sky-400">
                3. Khuyến nghị & Kế hoạch rèn luyện
              </Label>
              <Textarea
                rows={3}
                value={recommendations}
                onChange={(e) => setRecommendations(e.target.value)}
                placeholder="Ví dụ: Dành 20-30 phút ôn lại từ vựng mỗi ngày, nghe lại audio mẫu Speaking..."
                className="text-xs resize-none bg-slate-950 border-slate-700 text-slate-200"
              />
            </div>
          </div>

          {/* RIGHT: TACTICAL ESPORTS LIVE PREVIEW */}
          <div
            ref={cardRef}
            className="lg:col-span-7 rounded-2xl border border-slate-800 bg-[#080e1a] p-4 space-y-3 shadow-2xl text-slate-100 text-xs relative overflow-hidden"
          >
            {/* Ambient Lighting */}
            <div className="absolute top-0 left-1/4 w-1/2 h-20 bg-sky-500/10 blur-3xl pointer-events-none" />

            {/* Header Banner */}
            <div className="bg-[#0d1728] border border-sky-900/50 text-white p-3 rounded-xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-lg bg-white p-1 flex items-center justify-center shrink-0 shadow-md">
                  <SiteLogo className="w-full h-full object-contain" />
                </div>
                <div>
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-sky-400">
                    HỌC VIỆN NGÔN NGỮ HỌC THUẬT ARIS
                  </div>
                  <div className="text-sm font-extrabold tracking-wide text-white">
                    BÁO CÁO TIẾN ĐỘ HỌC TẬP
                  </div>
                  <div className="text-[10.5px] text-slate-400">
                    Kỳ báo cáo: {periodStr}
                  </div>
                </div>
              </div>
              <div className="hidden sm:block">
                <Badge variant="outline" className="text-[9.5px] font-bold text-sky-400 border-sky-400/40 bg-sky-950/60">
                  ACADEMIC REPORT
                </Badge>
              </div>
            </div>

            {/* Player Plate */}
            <div className="p-3 bg-[#0e182a] rounded-xl border border-slate-800 space-y-1.5 relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-sky-500 rounded-l-xl" />
              <div className="font-extrabold text-xs text-white pl-1.5 flex items-center justify-between">
                <span>HỌC VIÊN: {studentName.toUpperCase()}</span>
                <span className="text-[11px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
                  🎯 Target: {targetBand}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 pl-1.5">
                <span>• Lớp: <strong className="text-white">{className}</strong></span>
                <span>• Giảng viên: <strong className="text-white">{teacherName}</strong></span>
              </div>
              <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800 pl-1.5">
                • Sĩ số: <strong className="text-slate-200">{data.classInfo?.currentStudents || 6} học viên</strong> (tối đa {data.classInfo?.maxStudents || 10} HV)
              </div>
            </div>

            {/* 3 Core HUD Stat Pods */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 bg-[#0c1a2f] rounded-lg border border-sky-800/60 text-center">
                <div className="text-[9.5px] text-sky-400 font-extrabold uppercase">TIẾN ĐỘ KHÓA HỌC</div>
                <div className="text-base font-extrabold text-sky-400 my-0.5">{courseProgressPct}%</div>
                <div className="text-[10px] text-slate-400 truncate">
                  {data.courseProgress?.totalSessions
                    ? `${data.courseProgress.completedSessions || 0}/${data.courseProgress.totalSessions} buổi`
                    : "Theo phân phối"}
                </div>
              </div>

              <div className="p-2 bg-[#06221d] rounded-lg border border-emerald-800/60 text-center">
                <div className="text-[9.5px] text-emerald-400 font-extrabold uppercase">CHUYÊN CẦN</div>
                <div className="text-base font-extrabold text-emerald-400 my-0.5">
                  {attendanceRate}%
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {data.attendance && data.attendance.total > 0
                    ? `Có mặt ${data.attendance.present}/${data.attendance.total} buổi`
                    : "Đầy đủ 100%"}
                </div>
              </div>

              <div className="p-2 bg-[#241805] rounded-lg border border-amber-800/60 text-center">
                <div className="text-[9.5px] text-amber-400 font-extrabold uppercase">BÀI TẬP VỀ NHÀ</div>
                <div className="text-base font-extrabold text-amber-400 my-0.5">
                  {hwCompleted}/{hwTotal}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  Đạt {hwCompletionPct}% hoàn thành
                </div>
              </div>
            </div>

            {/* Mục 1: BÀI TẬP VỀ NHÀ & CHẤT LƯỢNG BÀI LÀM */}
            <div className="space-y-1">
              <div className="font-extrabold text-[11px] text-sky-400 flex justify-between">
                <span>1. BÀI TẬP VỀ NHÀ & CHẤT LƯỢNG BÀI LÀM</span>
                {data.homework.averageScore && (
                  <span className="text-amber-400 font-bold">Điểm TB: {data.homework.averageScore}</span>
                )}
              </div>
              <div className="p-2.5 bg-[#0c1524] rounded-lg border border-slate-800 text-[11px] space-y-1.5">
                <div className="flex justify-between font-semibold">
                  <span className="text-emerald-400">✓ Hoàn thành: {hwCompleted}/{hwTotal} ({hwCompletionPct}%)</span>
                  {data.homework.overdue > 0 ? (
                    <span className="text-rose-400 font-bold">⚠ Quá hạn: {data.homework.overdue} bài</span>
                  ) : (
                    <span className="text-slate-400">• Chưa nộp: {data.homework.unsubmitted} bài</span>
                  )}
                </div>

                {/* Tactical Energy Bar */}
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    style={{ width: `${hwCompletionPct}%` }}
                    className="h-full bg-emerald-500 rounded-full"
                  />
                </div>

                {/* Duration Badge */}
                <div className="px-2 py-1 bg-[#13233a] rounded border border-sky-800/60 flex items-center justify-between text-[10.5px]">
                  <span className="font-bold text-sky-300">⏱️ Tổng thời lượng: {totalMinutes} phút (~{hoursFormatted}h)</span>
                  <span className="text-amber-300 font-semibold">TB: {avgMinutes} phút/bài</span>
                </div>

                <div className="text-[10.5px] text-slate-300 flex justify-between pt-0.5">
                  <span>Đã chấm: <strong className="text-white">{data.homework.gradedCount}/{hwCompleted}</strong> | Đạt chuẩn: <strong className="text-emerald-400">{data.homework.passedCount || 0}</strong> | Cần sửa: <strong className="text-amber-400">{data.homework.needsImprovementCount || 0}</strong></span>
                </div>
                <div className="text-[10px] text-slate-400">
                  • Nguồn chấm: {data.homework.autoGradedCount || 0} bài tự động · {data.homework.teacherGradedCount || 0} bài GV chấm & nhận xét
                </div>
                <div className="text-[10.5px] font-semibold text-indigo-300 pt-1 border-t border-slate-800 flex flex-wrap items-center gap-x-2.5 gap-y-0.5">
                  <span className="font-bold text-slate-300">• TB Kỹ năng (GV chấm):</span>
                  <span>
                    🗣️ Speaking:{" "}
                    <strong className="text-white">
                      {data.homework.skillAverages?.speaking
                        ? `${data.homework.skillAverages.speaking.averageBand} (${data.homework.skillAverages.speaking.count} bài)`
                        : "Đang tích lũy"}
                    </strong>
                  </span>
                  <span className="text-slate-600">|</span>
                  <span>
                    ✍️ Writing:{" "}
                    <strong className="text-white">
                      {data.homework.skillAverages?.writing
                        ? `${data.homework.skillAverages.writing.averageBand} (${data.homework.skillAverages.writing.count} bài)`
                        : "Đang tích lũy"}
                    </strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Mục 2: NHẬN XÉT CHUYÊN MÔN CỦA GIẢNG VIÊN (3 Tactical Pods) */}
            <div className="space-y-1.5">
              <div className="font-extrabold text-[11px] text-sky-400">
                2. NHẬN XÉT CHUYÊN MÔN CỦA GIẢNG VIÊN
              </div>
              <div className="p-2 bg-[#06221d] rounded-lg border border-emerald-800/60 text-[11px] text-slate-200">
                <span className="font-bold text-emerald-400">✓ Điểm mạnh: </span>
                <span>{strengths}</span>
              </div>
              <div className="p-2 bg-[#241805] rounded-lg border border-amber-800/60 text-[11px] text-slate-200">
                <span className="font-bold text-amber-400">⚠ Cần cải thiện: </span>
                <span>{weaknesses}</span>
              </div>
              <div className="p-2 bg-[#0c1a2f] rounded-lg border border-sky-800/60 text-[11px] text-slate-200">
                <span className="font-bold text-sky-400">★ Khuyến nghị & Kế hoạch rèn luyện: </span>
                <span>{recommendations}</span>
              </div>
            </div>

            {/* Footer watermark */}
            <div className="pt-1 text-[9.5px] text-slate-500 flex items-center justify-between border-t border-slate-800">
              <span>68B, Phan Bội Châu, P. Dĩ An, TP.HCM</span>
              <span>nextband.site</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-3 border-t border-slate-800">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="rounded-xl font-medium border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800"
          >
            Đóng
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleDownloadImage}
            className="rounded-xl font-bold gap-1.5 bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700"
          >
            <Download className="w-3.5 h-3.5 text-sky-400" />
            Tải ảnh PNG
          </Button>

          <Button
            variant="default"
            size="sm"
            disabled={isExporting}
            onClick={handleCopyImage}
            className="rounded-xl font-bold gap-1.5 bg-sky-600 hover:bg-sky-500 text-white shadow-md font-semibold"
          >
            <Copy className="w-3.5 h-3.5" />
            {isExporting ? "Đang tạo ảnh..." : "Sao chép ảnh (Dán vào Zalo)"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

