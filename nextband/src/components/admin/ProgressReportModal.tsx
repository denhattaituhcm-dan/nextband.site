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
  User,
  Users,
  Calendar,
  PieChart,
  CheckCircle2,
  Home,
  Check,
  AlertTriangle,
  Star,
  MapPin,
  Globe,
  BarChart3,
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
  "IELTS beginner",
  "IELTS 5.0",
  "IELTS 5.5",
  "IELTS 6.0",
  "IELTS 6.5+",
  "IELTS 7.0+",
  "IELTS 7.5+",
];

export function ProgressReportModal({
  open,
  onOpenChange,
  data,
  onSaveReport,
}: ProgressReportModalProps) {
  // Target Band state
  const [targetBand, setTargetBand] = useState(
    data.student?.targetBand || "IELTS beginner"
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

  const studentName = data.student?.name || "Nguyễn Minh Anh";
  const className = data.student?.className || "M01 07.2026";
  const teacherName = data.student?.teacherName || "Admin NextBand";
  const periodStr = `${data.period?.from || "01/07/2026"} — ${data.period?.to || "29/08/2026"}`;
  const exportDateStr = data.generatedAt || new Date().toLocaleDateString("vi-VN");

  // KPI Calculations
  const courseProgressPct = data.courseProgress?.percent ?? 0;
  const courseCompletedSessions = data.courseProgress?.completedSessions ?? 0;
  const courseTotalSessions = data.courseProgress?.totalSessions ?? 27;
  const attendanceRate = data.attendance ? data.attendance.rate : 100;
  const hwCompleted = data.homework?.completed ?? 3;
  const hwTotal = data.homework?.totalAssigned ?? 29;
  const hwCompletionPct = data.homework?.completionRate ?? (hwTotal > 0 ? Math.round((hwCompleted / hwTotal) * 100) : 10);

  // Time metrics
  const totalMinutes = data.homework?.totalTimeSpentMinutes || 60;
  const hoursFormatted = (totalMinutes / 60).toFixed(1);
  const avgMinutes = data.homework?.avgTimeSpentMinutes || (hwCompleted > 0 ? Math.round(totalMinutes / hwCompleted) : 20);

  const classCurrent = data.classInfo?.currentStudents || 4;
  const classMax = data.classInfo?.maxStudents || 10;

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

    const fav = await tryLoad("/favicon.png");
    if (fav && fav.naturalWidth > 0) return fav;

    const direct = await tryLoad("/Logo.png");
    if (direct && direct.naturalWidth > 0) return direct;

    const fav96 = await tryLoad("/favicon-96x96.png");
    if (fav96 && fav96.naturalWidth > 0) return fav96;

    return null;
  };

  /**
   * Draw the Light Professional Academic Progress Report onto HTML5 Canvas (2x Retina)
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
    const height = 1140;
    const canvas = document.createElement("canvas");
    canvas.width = width * 2;
    canvas.height = height * 2;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D context not available");

    ctx.scale(2, 2);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // 1. Crisp White Background with subtle card shadow / clean border
    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "#ffffff";
    drawRoundedRect(ctx, 16, 16, width - 32, height - 32, 16, "#ffffff", "#e2e8f0", 1.5);

    // 2. Header Section
    // Logo Container on Left
    const logoX = 40;
    const logoY = 38;
    const logoW = 120;
    const logoH = 58;

    if (logoImg && logoImg.naturalWidth > 0) {
      const scale = Math.min(logoW / logoImg.naturalWidth, logoH / logoImg.naturalHeight, 1);
      const drawW = logoImg.naturalWidth * scale;
      const drawH = logoImg.naturalHeight * scale;
      const drawX = logoX;
      const drawY = logoY + (logoH - drawH) / 2;
      ctx.drawImage(logoImg, drawX, drawY, drawW, drawH);
    } else {
      // Fallback ARIS text
      ctx.fillStyle = "#dc2626";
      ctx.font = `900 28px ${FONT_FAMILY}`;
      ctx.fillText("ARIS", logoX, logoY + 38);
      ctx.fillStyle = "#0284c7";
      ctx.font = `800 14px ${FONT_FAMILY}`;
      ctx.fillText("IELTS", logoX, logoY + 54);
    }

    // Top Brand Tag
    ctx.fillStyle = "#2563eb";
    ctx.font = `800 12.5px ${FONT_FAMILY}`;
    ctx.fillText("HỌC VIỆN NGÔN NGỮ HỌC THUẬT ARIS", 180, 48);

    // Report Title
    ctx.fillStyle = "#0f172a";
    ctx.font = `800 24px ${FONT_FAMILY}`;
    ctx.fillText("BÁO CÁO TIẾN ĐỘ HỌC TẬP", 180, 78);

    // Period subtitle
    ctx.fillStyle = "#64748b";
    ctx.font = `500 13px ${FONT_FAMILY}`;
    ctx.fillText(`🗓  Kỳ báo cáo: ${periodStr}`, 180, 102);

    // Header Right Badge: Academic Progress Report
    drawRoundedRect(ctx, width - 230, 44, 190, 34, 8, "#eff6ff", "#bfdbfe", 1.2);
    ctx.fillStyle = "#2563eb";
    ctx.font = `800 10.5px ${FONT_FAMILY}`;
    ctx.fillText("📊  ACADEMIC PROGRESS REPORT", width - 218, 65);

    let currY = 126;

    // 3. Student Card
    const studentCardH = 110;
    drawRoundedRect(ctx, 36, currY, width - 72, studentCardH, 14, "#ffffff", "#e2e8f0", 1.2);

    // Avatar Circle on Left
    const avX = 72;
    const avY = currY + studentCardH / 2;
    ctx.beginPath();
    ctx.arc(avX, avY, 32, 0, Math.PI * 2);
    ctx.fillStyle = "#e0f2fe";
    ctx.fill();

    // Draw user icon in avatar
    ctx.fillStyle = "#0284c7";
    ctx.beginPath();
    ctx.arc(avX, avY - 8, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(avX, avY + 22, 19, Math.PI * 1.15, Math.PI * 1.85, false);
    ctx.fill();

    // Student Information
    const infoX = 124;
    ctx.fillStyle = "#0f172a";
    ctx.font = `800 17px ${FONT_FAMILY}`;
    ctx.fillText(`HỌC VIÊN: ${studentName.toUpperCase()}`, infoX, currY + 34);

    ctx.fillStyle = "#475569";
    ctx.font = `600 13px ${FONT_FAMILY}`;
    ctx.fillText(`🗓  Lớp học: ${className}`, infoX, currY + 60);
    ctx.fillText(`👤  Giảng viên: ${teacherName}`, infoX + 180, currY + 60);

    ctx.fillStyle = "#64748b";
    ctx.font = `500 12.5px ${FONT_FAMILY}`;
    ctx.fillText(`👥  Sĩ số: ${classCurrent} học viên (tối đa ${classMax} HV)`, infoX, currY + 86);

    // Target Band Badge on Right
    drawRoundedRect(ctx, width - 270, currY + 20, 218, 36, 8, "#fff1f2", "#fecaca", 1.2);
    ctx.fillStyle = "#991b1b";
    ctx.font = `700 12.5px ${FONT_FAMILY}`;
    ctx.fillText(`🎯 Target:`, width - 258, currY + 43);
    ctx.fillStyle = "#dc2626";
    ctx.font = `800 13px ${FONT_FAMILY}`;
    ctx.fillText(`${targetBand}`, width - 188, currY + 43);

    currY += studentCardH + 16;

    // 4. 3 Core HUD Stat Pods (Light, modern clean cards with icons)
    const cardGap = 14;
    const totalW = width - 72;
    const cardW = (totalW - cardGap * 2) / 3;
    const cardH = 126;

    const kpis = [
      {
        label: "TIẾN ĐỘ KHÓA HỌC",
        val: `${courseProgressPct}%`,
        color: "#2563eb",
        bgColor: "#ffffff",
        borderColor: "#e2e8f0",
        iconBg: "#eff6ff",
        iconSymbol: "⏱",
        percent: courseProgressPct,
        sub: `Đã hoàn thành ${courseCompletedSessions}/${courseTotalSessions} buổi`,
      },
      {
        label: "CHUYÊN CẦN",
        val: `${attendanceRate}%`,
        color: "#16a34a",
        bgColor: "#ffffff",
        borderColor: "#e2e8f0",
        iconBg: "#f0fdf4",
        iconSymbol: "✓",
        percent: attendanceRate,
        sub: "Tham gia đầy đủ 100%",
      },
      {
        label: "BÀI TẬP VỀ NHÀ",
        val: `${hwCompleted}/${hwTotal}`,
        color: "#ea580c",
        bgColor: "#ffffff",
        borderColor: "#e2e8f0",
        iconBg: "#fff7ed",
        iconSymbol: "🏠",
        percent: hwCompletionPct,
        sub: `Đạt ${hwCompletionPct}% hoàn thành`,
      },
    ];

    kpis.forEach((kpi, idx) => {
      const kX = 36 + idx * (cardW + cardGap);
      drawRoundedRect(ctx, kX, currY, cardW, cardH, 12, kpi.bgColor, kpi.borderColor, 1.2);

      // Icon circle
      const icX = kX + 32;
      const icY = currY + 36;
      ctx.beginPath();
      ctx.arc(icX, icY, 20, 0, Math.PI * 2);
      ctx.fillStyle = kpi.iconBg;
      ctx.fill();

      ctx.fillStyle = kpi.color;
      ctx.font = `bold 16px ${FONT_FAMILY}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(kpi.iconSymbol, icX, icY);
      ctx.textAlign = "start";
      ctx.textBaseline = "alphabetic";

      // Label & Value
      ctx.fillStyle = kpi.color;
      ctx.font = `800 11.5px ${FONT_FAMILY}`;
      ctx.fillText(kpi.label, kX + 62, currY + 28);

      ctx.font = `800 30px ${FONT_FAMILY}`;
      ctx.fillText(kpi.val, kX + 62, currY + 60);

      // Subtitle
      ctx.fillStyle = "#64748b";
      ctx.font = `500 12px ${FONT_FAMILY}`;
      ctx.fillText(kpi.sub, kX + 16, currY + 86);

      // Progress bar
      const pBarX = kX + 16;
      const pBarY = currY + 98;
      const pBarW = cardW - 32;
      const pBarH = 8;
      drawRoundedRect(ctx, pBarX, pBarY, pBarW, pBarH, 4, "#f1f5f9");
      const pBarFill = Math.min(pBarW, Math.max(0, (pBarW * kpi.percent) / 100));
      if (pBarFill > 0) {
        drawRoundedRect(ctx, pBarX, pBarY, pBarFill, pBarH, 4, kpi.color);
      }
    });

    currY += cardH + 22;

    // Helper function for Section Number Circle & Title
    const drawSectionTitle = (num: string, title: string, y: number) => {
      // Circle number
      ctx.beginPath();
      ctx.arc(48, y - 5, 12, 0, Math.PI * 2);
      ctx.fillStyle = "#2563eb";
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.font = `800 12px ${FONT_FAMILY}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(num, 48, y - 5);
      ctx.textAlign = "start";
      ctx.textBaseline = "alphabetic";

      // Title
      ctx.fillStyle = "#0f172a";
      ctx.font = `800 15px ${FONT_FAMILY}`;
      ctx.fillText(title, 68, y);
    };

    // 5. Section 1: BÀI TẬP VỀ NHÀ & CHẤT LƯỢNG BÀI LÀM
    drawSectionTitle("1", "BÀI TẬP VỀ NHÀ & CHẤT LƯỢNG BÀI LÀM", currY);
    currY += 12;

    const hw = data.homework;
    const hwBoxH = 196;
    drawRoundedRect(ctx, 36, currY, width - 72, hwBoxH, 12, "#ffffff", "#e2e8f0", 1.2);

    // Row 1: Mức độ hoàn thành
    ctx.fillStyle = "#16a34a";
    ctx.font = `800 13.5px ${FONT_FAMILY}`;
    ctx.fillText(`✓  Hoàn thành: ${hw.completed} / ${hw.totalAssigned} bài (${hwCompletionPct}%)`, 56, currY + 30);

    if (hw.overdue > 0) {
      ctx.fillStyle = "#dc2626";
      ctx.font = `700 13px ${FONT_FAMILY}`;
      ctx.fillText(`⚠  Quá hạn: ${hw.overdue} bài`, 340, currY + 30);
    } else {
      ctx.fillStyle = "#64748b";
      ctx.font = `600 13px ${FONT_FAMILY}`;
      ctx.fillText(`•  Đang làm: ${hw.inProgress} bài`, 340, currY + 30);
    }

    ctx.fillStyle = "#64748b";
    ctx.font = `600 13px ${FONT_FAMILY}`;
    ctx.fillText(`•  Chưa nộp: ${hw.unsubmitted} bài`, 530, currY + 30);

    // Progress Bar
    const hwBarX = 56;
    const hwBarY = currY + 44;
    const hwBarW = width - 112;
    const hwBarH = 8;
    drawRoundedRect(ctx, hwBarX, hwBarY, hwBarW, hwBarH, 4, "#f1f5f9");
    const hwFillW = Math.min(hwBarW, Math.max(0, (hwBarW * hwCompletionPct) / 100));
    if (hwFillW > 0) {
      drawRoundedRect(ctx, hwBarX, hwBarY, hwFillW, hwBarH, 4, "#16a34a");
    }

    // Row 2: TỔNG THỜI LƯỢNG RÈN LUYỆN
    drawRoundedRect(ctx, 56, currY + 64, width - 112, 34, 8, "#f0f9ff", "#bae6fd", 1);
    ctx.fillStyle = "#0284c7";
    ctx.font = `800 12.5px ${FONT_FAMILY}`;
    ctx.fillText(
      `⏱️  TỔNG THỜI LƯỢNG RÈN LUYỆN: ${totalMinutes} phút (~${hoursFormatted} giờ)`,
      70,
      currY + 85
    );
    ctx.fillStyle = "#d97706";
    ctx.font = `700 12px ${FONT_FAMILY}`;
    ctx.fillText(`• Trung bình: ${avgMinutes} phút/bài`, width - 250, currY + 85);

    // Row 3: Kết quả chấm
    ctx.fillStyle = "#1e293b";
    ctx.font = `600 13px ${FONT_FAMILY}`;
    const avgScoreStr = hw.averageScore ? `Điểm TB: ${hw.averageScore}` : "Điểm TB: 2.5/10";
    const passRateStr = `Đạt chuẩn: ${hw.passedCount || 1} bài  |  Cần cải thiện: ${hw.needsImprovementCount || 2} bài`;
    ctx.fillText(`•  Đã chấm & phản hồi: ${hw.gradedCount}/${hw.completed} bài   |   ${avgScoreStr}   |   ${passRateStr}`, 56, currY + 124);

    // Row 4: Nguồn chấm
    ctx.fillStyle = "#64748b";
    ctx.font = `500 12.5px ${FONT_FAMILY}`;
    ctx.fillText(
      `•  Nguồn chấm: ${hw.autoGradedCount || 1} bài tự động · ${hw.teacherGradedCount || 2} bài giáo viên chấm & nhận xét`,
      56,
      currY + 150
    );

    // Row 5: Speaking & Writing
    const spkAvg = hw.skillAverages?.speaking;
    const wrtAvg = hw.skillAverages?.writing;
    const spkText = spkAvg ? `Speaking: ${spkAvg.averageBand} (${spkAvg.count} bài)` : "Speaking: 0.0 (1 bài)";
    const wrtText = wrtAvg ? `Writing: ${wrtAvg.averageBand} (${wrtAvg.count} bài)` : "Writing: 6.5 (1 bài)";

    ctx.fillStyle = "#334155";
    ctx.font = `600 12.5px ${FONT_FAMILY}`;
    ctx.fillText(
      `•  TB kỹ năng (GV chấm): 🗣️  ${spkText}   |   ✍️  ${wrtText}`,
      56,
      currY + 176
    );

    currY += hwBoxH + 24;

    // 6. Section 2: NHẬN XÉT CHUYÊN MÔN CỦA GIẢNG VIÊN
    drawSectionTitle("2", "NHẬN XÉT CHUYÊN MÔN CỦA GIẢNG VIÊN", currY);
    currY += 12;

    const subCardH = 76;
    const subCardGap = 10;

    const renderFeedbackCard = (
      y: number,
      title: string,
      content: string,
      accentColor: string,
      iconBg: string,
      iconSymbol: string
    ) => {
      drawRoundedRect(ctx, 36, y, width - 72, subCardH, 10, "#ffffff", "#e2e8f0", 1.2);

      // Left Accent Border
      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.roundRect(36, y, 4.5, subCardH, [10, 0, 0, 10]);
      ctx.fill();

      // Icon circle
      const icX = 64;
      const icY = y + subCardH / 2;
      ctx.beginPath();
      ctx.arc(icX, icY, 18, 0, Math.PI * 2);
      ctx.fillStyle = iconBg;
      ctx.fill();

      ctx.fillStyle = accentColor;
      ctx.font = `bold 15px ${FONT_FAMILY}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(iconSymbol, icX, icY);
      ctx.textAlign = "start";
      ctx.textBaseline = "alphabetic";

      // Title & Text
      ctx.fillStyle = accentColor;
      ctx.font = `800 12.5px ${FONT_FAMILY}`;
      ctx.fillText(title, 94, y + 24);

      ctx.fillStyle = "#334155";
      ctx.font = `500 12.5px ${FONT_FAMILY}`;
      drawWrappedText(ctx, content, 94, y + 46, width - 180, 18, 2);
    };

    // Sub-card 1: Điểm mạnh
    renderFeedbackCard(
      currY,
      "ĐIỂM MẠNH HỌC VIÊN",
      strengths,
      "#16a34a",
      "#dcfce7",
      "★"
    );

    // Sub-card 2: Điểm cần chú ý
    currY += subCardH + subCardGap;
    renderFeedbackCard(
      currY,
      "ĐIỂM CẦN CHÚ Ý & CẢI THIỆN",
      weaknesses,
      "#ea580c",
      "#ffedd5",
      "⚠"
    );

    // Sub-card 3: Khuyến nghị & Kế hoạch
    currY += subCardH + subCardGap;
    renderFeedbackCard(
      currY,
      "KHUYẾN NGHỊ & KẾ HOẠCH RÈN LUYỆN",
      recommendations,
      "#0284c7",
      "#e0f2fe",
      "🎯"
    );

    // 7. Footer & Brand Identity
    const footY = height - 42;
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(36, footY - 14);
    ctx.lineTo(width - 36, footY - 14);
    ctx.stroke();

    ctx.fillStyle = "#64748b";
    ctx.font = `500 12px ${FONT_FAMILY}`;
    ctx.fillText("📍  68B, Phan Bội Châu, P. Dĩ An, TP.HCM", 36, footY + 4);

    ctx.fillText("🌐  Website: nextband.site", 360, footY + 4);

    ctx.fillText(`🗓  Ngày xuất: ${exportDateStr}`, width - 210, footY + 4);

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
      <DialogContent className="max-w-5xl max-h-[94vh] overflow-y-auto p-5 sm:p-6 rounded-2xl bg-white text-slate-900 border border-slate-200 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-base font-bold flex items-center gap-2 text-blue-600">
            <FileText className="w-4 h-4 text-blue-600" />
            Báo Cáo Tiến Độ Học Tập — Academic Progress Report
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: FORM CHỈNH SỬA THÔNG TIN & NHẬN XÉT CỦA GIÁO VIÊN */}
          <div className="lg:col-span-5 space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            {/* Target Band */}
            <div className="space-y-1.5 pb-3 border-b border-slate-200">
              <Label className="text-[11.5px] font-bold text-red-600 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-red-600" />
                Mục tiêu đầu ra (Target Band)
              </Label>
              <Input
                value={targetBand}
                onChange={(e) => setTargetBand(e.target.value)}
                className="h-8 text-xs bg-white border-slate-300 text-red-600 font-bold focus-visible:ring-red-400"
                placeholder="Ví dụ: IELTS beginner, IELTS 6.5+..."
              />
              <div className="flex flex-wrap gap-1 pt-1">
                {TARGET_PRESETS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setTargetBand(preset)}
                    className={`px-2 py-0.5 text-[10.5px] rounded-md font-semibold transition-colors ${
                      targetBand === preset
                        ? "bg-red-600 text-white font-bold shadow-sm"
                        : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            <div className="font-bold text-blue-700 flex items-center gap-1.5 pb-0.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Nhận Xét Chuyên Môn Của Giảng Viên
            </div>

            <div className="space-y-1">
              <Label className="text-[11px] font-bold text-emerald-700">
                1. Điểm mạnh học viên
              </Label>
              <Textarea
                rows={2}
                value={strengths}
                onChange={(e) => setStrengths(e.target.value)}
                placeholder="Ví dụ: Tiếp thu bài học tốt, tích cực tham gia các hoạt động luyện tập trên lớp."
                className="text-xs resize-none bg-white border-slate-300 text-slate-800 focus-visible:ring-emerald-400"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-[11px] font-bold text-amber-700">
                2. Điểm cần chú ý cải thiện
              </Label>
              <Textarea
                rows={2}
                value={weaknesses}
                onChange={(e) => setWeaknesses(e.target.value)}
                placeholder="Ví dụ: Cần chú ý độ chính xác về cấu trúc ngữ pháp và mở rộng vốn từ vựng học thuật."
                className="text-xs resize-none bg-white border-slate-300 text-slate-800 focus-visible:ring-amber-400"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-[11px] font-bold text-sky-700">
                3. Khuyến nghị & Kế hoạch rèn luyện
              </Label>
              <Textarea
                rows={3}
                value={recommendations}
                onChange={(e) => setRecommendations(e.target.value)}
                placeholder="Ví dụ: Duy trì 20–30 phút tự học mỗi ngày, hoàn thành đầy đủ bài tập được giao đúng hạn."
                className="text-xs resize-none bg-white border-slate-300 text-slate-800 focus-visible:ring-sky-400"
              />
            </div>
          </div>

          {/* RIGHT: MODERN LIGHT THEME LIVE PREVIEW */}
          <div
            ref={cardRef}
            className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 space-y-3.5 shadow-md text-slate-900 text-xs relative overflow-hidden"
          >
            {/* Header Banner */}
            <div className="flex items-center justify-between gap-3 pb-1 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 flex items-center justify-center shrink-0">
                  <SiteLogo fallbackSrc="/favicon.png" className="w-full h-full object-contain" />
                </div>
                <div>
                  <div className="text-[10px] font-extrabold uppercase tracking-wide text-blue-600">
                    HỌC VIỆN NGÔN NGỮ HỌC THUẬT ARIS
                  </div>
                  <div className="text-base font-extrabold tracking-tight text-slate-900">
                    BÁO CÁO TIẾN ĐỘ HỌC TẬP
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>Kỳ báo cáo: {periodStr}</span>
                  </div>
                </div>
              </div>
              <div className="hidden sm:block">
                <Badge variant="outline" className="text-[10px] font-bold text-blue-600 border-blue-200 bg-blue-50/60 px-2.5 py-1 flex items-center gap-1.5">
                  <BarChart3 className="w-3 h-3 text-blue-600" />
                  ACADEMIC PROGRESS REPORT
                </Badge>
              </div>
            </div>

            {/* Student Info Card */}
            <div className="p-3.5 bg-white rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center shrink-0">
                  <User className="w-6 h-6 text-sky-600" />
                </div>
                <div>
                  <div className="font-extrabold text-xs text-slate-900">
                    HỌC VIÊN: {studentName.toUpperCase()}
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-600 pt-0.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      Lớp học: <strong className="text-slate-800">{className}</strong>
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3 text-slate-400" />
                      Giảng viên: <strong className="text-slate-800">{teacherName}</strong>
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 pt-0.5 flex items-center gap-1">
                    <Users className="w-3 h-3 text-slate-400" />
                    Sĩ số: <strong className="text-slate-700">{classCurrent} học viên</strong> (tối đa {classMax} HV)
                  </div>
                </div>
              </div>

              {/* Target pill */}
              <div className="self-stretch sm:self-center bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-xl text-center shrink-0 flex items-center justify-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-red-500" />
                <span className="text-[11px] text-red-800 font-semibold">Target:</span>
                <span className="text-[11.5px] font-extrabold text-red-600">{targetBand}</span>
              </div>
            </div>

            {/* 3 Core Stats Cards */}
            <div className="grid grid-cols-3 gap-2.5">
              {/* Card 1: Tiến độ khóa học */}
              <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                    <PieChart className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-[9.5px] text-blue-600 font-extrabold uppercase truncate">
                    TIẾN ĐỘ KHÓA HỌC
                  </div>
                </div>
                <div className="text-lg font-extrabold text-blue-600 pl-1">{courseProgressPct}%</div>
                <div className="text-[10px] text-slate-500 pl-1 truncate">
                  Đã hoàn thành {courseCompletedSessions}/{courseTotalSessions} buổi
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden mt-1">
                  <div
                    style={{ width: `${courseProgressPct}%` }}
                    className="h-full bg-blue-600 rounded-full"
                  />
                </div>
              </div>

              {/* Card 2: Chuyên cần */}
              <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-[9.5px] text-emerald-600 font-extrabold uppercase truncate">
                    CHUYÊN CẦN
                  </div>
                </div>
                <div className="text-lg font-extrabold text-emerald-600 pl-1">
                  {attendanceRate}%
                </div>
                <div className="text-[10px] text-slate-500 pl-1 truncate">
                  Tham gia đầy đủ 100%
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden mt-1">
                  <div
                    style={{ width: `${attendanceRate}%` }}
                    className="h-full bg-emerald-500 rounded-full"
                  />
                </div>
              </div>

              {/* Card 3: Bài tập về nhà */}
              <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 shrink-0">
                    <Home className="w-4 h-4 text-orange-600" />
                  </div>
                  <div className="text-[9.5px] text-orange-600 font-extrabold uppercase truncate">
                    BÀI TẬP VỀ NHÀ
                  </div>
                </div>
                <div className="text-lg font-extrabold text-orange-600 pl-1">
                  {hwCompleted}/{hwTotal}
                </div>
                <div className="text-[10px] text-slate-500 pl-1 truncate">
                  Đạt {hwCompletionPct}% hoàn thành
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden mt-1">
                  <div
                    style={{ width: `${hwCompletionPct}%` }}
                    className="h-full bg-orange-500 rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* Section 1: BÀI TẬP VỀ NHÀ & CHẤT LƯỢNG BÀI LÀM */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                  1
                </div>
                <div className="font-extrabold text-xs text-slate-900">
                  BÀI TẬP VỀ NHÀ & CHẤT LƯỢNG BÀI LÀM
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 text-[11px] space-y-2 shadow-sm">
                <div className="flex justify-between font-semibold text-slate-700">
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    Hoàn thành: {hwCompleted} / {hwTotal} bài ({hwCompletionPct}%)
                  </span>
                  {data.homework.overdue > 0 ? (
                    <span className="text-rose-600 font-bold flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-rose-600" />
                      Quá hạn: {data.homework.overdue} bài
                    </span>
                  ) : (
                    <span className="text-slate-500">• Chưa nộp: {data.homework.unsubmitted} bài</span>
                  )}
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    style={{ width: `${hwCompletionPct}%` }}
                    className="h-full bg-emerald-500 rounded-full"
                  />
                </div>

                {/* Duration Badge */}
                <div className="px-2.5 py-1.5 bg-sky-50 rounded-lg border border-sky-200 flex items-center justify-between text-[11px]">
                  <span className="font-bold text-sky-700 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-sky-600" />
                    TỔNG THỜI LƯỢNG RÈN LUYỆN: {totalMinutes} phút (~{hoursFormatted} giờ)
                  </span>
                  <span className="text-amber-700 font-bold">• Trung bình: {avgMinutes} phút/bài</span>
                </div>

                <div className="text-[11px] text-slate-700 flex flex-wrap justify-between gap-1 pt-0.5">
                  <span>
                    • Đã chấm & phản hồi: <strong>{data.homework.gradedCount}/{hwCompleted} bài</strong> | Điểm TB: <strong>{data.homework.averageScore || "2.5/10"}</strong> | Đạt chuẩn: <strong className="text-emerald-600">{data.homework.passedCount || 1} bài</strong> | Cần cải thiện: <strong className="text-amber-600">{data.homework.needsImprovementCount || 2} bài</strong>
                  </span>
                </div>
                <div className="text-[10.5px] text-slate-500">
                  • Nguồn chấm: {data.homework.autoGradedCount || 1} bài tự động · {data.homework.teacherGradedCount || 2} bài giáo viên chấm & nhận xét
                </div>
                <div className="text-[11px] font-semibold text-indigo-700 pt-1 border-t border-slate-100 flex flex-wrap items-center gap-x-3 gap-y-0.5">
                  <span className="font-bold text-slate-700">• TB Kỹ năng (GV chấm):</span>
                  <span>
                    🗣️ Speaking:{" "}
                    <strong className="text-slate-900">
                      {data.homework.skillAverages?.speaking
                        ? `${data.homework.skillAverages.speaking.averageBand} (${data.homework.skillAverages.speaking.count} bài)`
                        : "0.0 (1 bài)"}
                    </strong>
                  </span>
                  <span className="text-slate-300">|</span>
                  <span>
                    ✍️ Writing:{" "}
                    <strong className="text-slate-900">
                      {data.homework.skillAverages?.writing
                        ? `${data.homework.skillAverages.writing.averageBand} (${data.homework.skillAverages.writing.count} bài)`
                        : "6.5 (1 bài)"}
                    </strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Section 2: NHẬN XÉT CHUYÊN MÔN CỦA GIẢNG VIÊN */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                  2
                </div>
                <div className="font-extrabold text-xs text-slate-900">
                  NHẬN XÉT CHUYÊN MÔN CỦA GIẢNG VIÊN
                </div>
              </div>

              {/* Sub-card 1: Điểm mạnh */}
              <div className="p-2.5 bg-white rounded-xl border border-slate-200 border-l-4 border-l-emerald-500 shadow-sm flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Star className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                </div>
                <div>
                  <div className="font-bold text-[11px] text-emerald-700">ĐIỂM MẠNH HỌC VIÊN</div>
                  <div className="text-[11px] text-slate-700 pt-0.5">{strengths}</div>
                </div>
              </div>

              {/* Sub-card 2: Cần chú ý */}
              <div className="p-2.5 bg-white rounded-xl border border-slate-200 border-l-4 border-l-amber-500 shadow-sm flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertTriangle className="w-4 h-4 fill-amber-500 text-amber-500" />
                </div>
                <div>
                  <div className="font-bold text-[11px] text-amber-700">ĐIỂM CẦN CHÚ Ý & CẢI THIỆN</div>
                  <div className="text-[11px] text-slate-700 pt-0.5">{weaknesses}</div>
                </div>
              </div>

              {/* Sub-card 3: Khuyến nghị & kế hoạch */}
              <div className="p-2.5 bg-white rounded-xl border border-slate-200 border-l-4 border-l-sky-500 shadow-sm flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Target className="w-4 h-4 text-sky-600" />
                </div>
                <div>
                  <div className="font-bold text-[11px] text-sky-700">KHUYẾN NGHỊ & KẾ HOẠCH RÈN LUYỆN</div>
                  <div className="text-[11px] text-slate-700 pt-0.5">{recommendations}</div>
                </div>
              </div>
            </div>

            {/* Footer watermark */}
            <div className="pt-2 text-[10px] text-slate-500 flex flex-wrap items-center justify-between border-t border-slate-100 gap-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                68B, Phan Bội Châu, P. Dĩ An, TP.HCM
              </span>
              <span className="flex items-center gap-1">
                <Globe className="w-3 h-3 text-slate-400" />
                Website: nextband.site
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                Ngày xuất: {exportDateStr}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-3 border-t border-slate-200">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="rounded-xl font-medium border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
          >
            Đóng
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleDownloadImage}
            className="rounded-xl font-bold gap-1.5 bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200"
          >
            <Download className="w-3.5 h-3.5 text-blue-600" />
            Tải ảnh PNG
          </Button>

          <Button
            variant="default"
            size="sm"
            disabled={isExporting}
            onClick={handleCopyImage}
            className="rounded-xl font-bold gap-1.5 bg-blue-600 hover:bg-blue-700 text-white shadow-md"
          >
            <Copy className="w-3.5 h-3.5" />
            {isExporting ? "Đang tạo ảnh..." : "Sao chép ảnh (Dán vào Zalo)"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


