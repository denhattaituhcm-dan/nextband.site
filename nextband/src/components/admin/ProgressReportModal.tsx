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
  Link as LinkIcon,
  MessageSquare,
} from "lucide-react";
import { toast } from "sonner";
import QRCode from "qrcode";
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

  const studentName = data.student?.name || "Học viên";
  const className = data.student?.className || "Lớp học";
  const teacherName = data.student?.teacherName || "Chưa phân công";
  const periodStr =
    data.period?.from && data.period?.to
      ? `${data.period.from} — ${data.period.to}`
      : data.period?.to
      ? `Đến ${data.period.to}`
      : data.period?.from
      ? `Từ ${data.period.from}`
      : "Kỳ học hiện tại";
  const exportDateStr = data.generatedAt || new Date().toLocaleDateString("vi-VN");

  // KPI Calculations (100% Real Data - Zero Fallback Phantoms)
  const courseProgressPct = data.courseProgress?.percent ?? 0;
  const courseCompletedSessions = data.courseProgress?.completedSessions ?? 0;
  const courseTotalSessions = data.courseProgress?.totalSessions ?? 0;
  const hwCompleted = data.homework?.completed ?? 0;
  const hwTotal = data.homework?.totalAssigned ?? 0;
  const hwCompletionPct = data.homework?.completionRate ?? (hwTotal > 0 ? Math.round((hwCompleted / hwTotal) * 100) : 0);

  // Time metrics (Calculated honestly from student submissions)
  const totalMinutes = data.homework?.totalTimeSpentMinutes ?? 0;
  const hoursFormatted = (totalMinutes / 60).toFixed(1);
  const avgMinutes = data.homework?.avgTimeSpentMinutes ?? (hwCompleted > 0 ? Math.round(totalMinutes / hwCompleted) : 0);

  const classCurrent = data.classInfo?.currentStudents ?? 0;
  const classMax = data.classInfo?.maxStudents ?? 10;

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

    const direct = await tryLoad("/logo.png");
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

    const width = 800;
    const height = 1260;
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

    // 2. Header Section (HƯỚNG 1: Loại bỏ logo icon cũ, sử dụng Text thương hiệu ARIS IELTS hiện đại)
    const brandX = 40;
    const brandY = 40;

    // Elegant ARIS Brand Typography
    ctx.fillStyle = "#dc2626";
    ctx.font = `900 32px ${FONT_FAMILY}`;
    ctx.fillText("ARIS", brandX, brandY + 34);

    ctx.fillStyle = "#2563eb";
    ctx.font = `800 16px ${FONT_FAMILY}`;
    ctx.fillText("IELTS", brandX + 88, brandY + 34);

    // Top Sub Brand Tag
    ctx.fillStyle = "#2563eb";
    ctx.font = `800 13px ${FONT_FAMILY}`;
    ctx.fillText("HỌC VIỆN NGÔN NGỮ HỌC THUẬT ARIS", 185, 48);

    // Report Title
    ctx.fillStyle = "#0f172a";
    ctx.font = `800 25px ${FONT_FAMILY}`;
    ctx.fillText("BÁO CÁO TIẾN ĐỘ HỌC TẬP", 185, 78);

    // Period subtitle
    ctx.fillStyle = "#475569";
    ctx.font = `600 14px ${FONT_FAMILY}`;
    ctx.fillText(`🗓  Kỳ báo cáo: ${periodStr}`, 185, 102);

    // Header Right Badge: Academic Progress Report
    drawRoundedRect(ctx, width - 245, 44, 205, 36, 8, "#eff6ff", "#bfdbfe", 1.2);
    ctx.fillStyle = "#2563eb";
    ctx.font = `800 11.5px ${FONT_FAMILY}`;
    ctx.fillText("📊  ACADEMIC PROGRESS REPORT", width - 232, 66);

    let currY = 126;

    // 3. Student Card (Chữ to rõ, dễ đọc trên di động)
    const studentCardH = 114;
    drawRoundedRect(ctx, 36, currY, width - 72, studentCardH, 14, "#ffffff", "#e2e8f0", 1.2);

    // Avatar Circle on Left
    const avX = 76;
    const avY = currY + studentCardH / 2;
    ctx.beginPath();
    ctx.arc(avX, avY, 34, 0, Math.PI * 2);
    ctx.fillStyle = "#e0f2fe";
    ctx.fill();

    // Draw user icon in avatar
    ctx.fillStyle = "#0284c7";
    ctx.beginPath();
    ctx.arc(avX, avY - 8, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(avX, avY + 23, 20, Math.PI * 1.15, Math.PI * 1.85, false);
    ctx.fill();

    // Student Information
    const infoX = 132;
    ctx.fillStyle = "#0f172a";
    ctx.font = `800 18.5px ${FONT_FAMILY}`;
    ctx.fillText(`HỌC VIÊN: ${studentName.toUpperCase()}`, infoX, currY + 34);

    ctx.fillStyle = "#334155";
    ctx.font = `600 14px ${FONT_FAMILY}`;
    ctx.fillText(`🗓  Lớp học: ${className}`, infoX, currY + 62);
    ctx.fillText(`👤  Giảng viên: ${teacherName}`, infoX + 200, currY + 62);

    ctx.fillStyle = "#475569";
    ctx.font = `600 13.5px ${FONT_FAMILY}`;
    ctx.fillText(`👥  Sĩ số: ${classCurrent} học viên (tối đa ${classMax} HV)`, infoX, currY + 90);

    // Target Band Badge on Right
    drawRoundedRect(ctx, width - 275, currY + 20, 235, 38, 8, "#fff1f2", "#fecaca", 1.2);
    ctx.fillStyle = "#991b1b";
    ctx.font = `700 13px ${FONT_FAMILY}`;
    ctx.fillText(`🎯 Target:`, width - 263, currY + 44);
    ctx.fillStyle = "#dc2626";
    ctx.font = `800 14px ${FONT_FAMILY}`;
    ctx.fillText(`${targetBand}`, width - 190, currY + 44);

    currY += studentCardH + 18;

    // 4. 2 Core HUD Stat Pods (Tối ưu bố cục 2 cột sang trọng, trực quan, loại bỏ ô Chuyên Cần ảo)
    const cardGap = 16;
    const totalW = width - 72;
    const cardW = (totalW - cardGap) / 2;
    const cardH = 132;

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
        label: "BÀI TẬP VỀ NHÀ",
        val: `${hwCompleted}/${hwTotal} bài`,
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
      const icX = kX + 36;
      const icY = currY + 40;
      ctx.beginPath();
      ctx.arc(icX, icY, 22, 0, Math.PI * 2);
      ctx.fillStyle = kpi.iconBg;
      ctx.fill();

      ctx.fillStyle = kpi.color;
      ctx.font = `bold 18px ${FONT_FAMILY}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(kpi.iconSymbol, icX, icY);
      ctx.textAlign = "start";
      ctx.textBaseline = "alphabetic";

      // Label & Value
      ctx.fillStyle = kpi.color;
      ctx.font = `800 13px ${FONT_FAMILY}`;
      ctx.fillText(kpi.label, kX + 70, currY + 32);

      ctx.font = `800 32px ${FONT_FAMILY}`;
      ctx.fillText(kpi.val, kX + 70, currY + 68);

      // Subtitle
      ctx.fillStyle = "#475569";
      ctx.font = `600 13px ${FONT_FAMILY}`;
      ctx.fillText(kpi.sub, kX + 20, currY + 98);

      // Progress bar
      const pBarX = kX + 20;
      const pBarY = currY + 108;
      const pBarW = cardW - 40;
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
      ctx.arc(48, y - 5, 13, 0, Math.PI * 2);
      ctx.fillStyle = "#2563eb";
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.font = `800 13px ${FONT_FAMILY}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(num, 48, y - 5);
      ctx.textAlign = "start";
      ctx.textBaseline = "alphabetic";

      // Title
      ctx.fillStyle = "#0f172a";
      ctx.font = `800 16px ${FONT_FAMILY}`;
      ctx.fillText(title, 70, y);
    };

    // 5. Section 1: BÀI TẬP VỀ NHÀ & CHẤT LƯỢNG BÀI LÀM - CHIA THÀNH CÁC Ô NHỎ GRID 2x2
    drawSectionTitle("1", "BÀI TẬP VỀ NHÀ & CHẤT LƯỢNG BÀI LÀM", currY);
    currY += 14;

    const hw = data.homework;
    const subBoxGap = 12;
    const subBoxW = (width - 72 - subBoxGap) / 2;
    const subBoxH = 105;

    // Ô NHỎ 1 (Top-Left): Tiến độ hoàn thành bài tập
    const b1X = 36;
    const b1Y = currY;
    drawRoundedRect(ctx, b1X, b1Y, subBoxW, subBoxH, 12, "#ffffff", "#e2e8f0", 1.2);
    ctx.fillStyle = "#16a34a";
    ctx.font = `800 14px ${FONT_FAMILY}`;
    ctx.fillText(`✓  Hoàn thành: ${hw.completed} / ${hw.totalAssigned} bài (${hwCompletionPct}%)`, b1X + 16, b1Y + 28);

    // Progress bar inside box 1
    const p1X = b1X + 16;
    const p1Y = b1Y + 42;
    const p1W = subBoxW - 32;
    drawRoundedRect(ctx, p1X, p1Y, p1W, 7, 3.5, "#f1f5f9");
    const p1Fill = Math.min(p1W, Math.max(0, (p1W * hwCompletionPct) / 100));
    if (p1Fill > 0) drawRoundedRect(ctx, p1X, p1Y, p1Fill, 7, 3.5, "#16a34a");

    ctx.font = `600 13px ${FONT_FAMILY}`;
    if (hw.overdue > 0) {
      ctx.fillStyle = "#dc2626";
      ctx.fillText(`⚠  Quá hạn: ${hw.overdue} bài`, b1X + 16, b1Y + 76);
    } else {
      ctx.fillStyle = "#64748b";
      ctx.fillText(`•  Đang làm: ${hw.inProgress} bài`, b1X + 16, b1Y + 76);
    }
    ctx.fillStyle = "#475569";
    ctx.fillText(`•  Chưa nộp: ${hw.unsubmitted} bài`, b1X + 180, b1Y + 76);

    // Ô NHỎ 2 (Top-Right): Thời lượng rèn luyện (Dữ liệu thực tế, không bịa đặt)
    const b2X = 36 + subBoxW + subBoxGap;
    const b2Y = currY;
    drawRoundedRect(ctx, b2X, b2Y, subBoxW, subBoxH, 12, "#f0f9ff", "#bae6fd", 1.2);
    ctx.fillStyle = "#0284c7";
    ctx.font = `800 13.5px ${FONT_FAMILY}`;
    ctx.fillText("⏱️  THỜI LƯỢNG RÈN LUYỆN", b2X + 16, b2Y + 28);

    ctx.fillStyle = "#0369a1";
    ctx.font = `800 18px ${FONT_FAMILY}`;
    if (totalMinutes > 0) {
      ctx.fillText(`${totalMinutes} phút (~${hoursFormatted} giờ)`, b2X + 16, b2Y + 58);
      ctx.fillStyle = "#d97706";
      ctx.font = `700 13px ${FONT_FAMILY}`;
      ctx.fillText(`• Trung bình: ${avgMinutes} phút/bài`, b2X + 16, b2Y + 84);
    } else {
      ctx.fillText("0 phút (0.0 giờ)", b2X + 16, b2Y + 58);
      ctx.fillStyle = "#64748b";
      ctx.font = `600 13px ${FONT_FAMILY}`;
      ctx.fillText("• Chưa ghi nhận thời gian làm bài", b2X + 16, b2Y + 84);
    }

    // Ô NHỎ 3 (Bottom-Left): Kết quả & nguồn chấm (Chính xác, không bịa dữ liệu)
    const b3X = 36;
    const b3Y = currY + subBoxH + subBoxGap;
    drawRoundedRect(ctx, b3X, b3Y, subBoxW, subBoxH, 12, "#ffffff", "#e2e8f0", 1.2);
    ctx.fillStyle = "#0f172a";
    ctx.font = `800 14px ${FONT_FAMILY}`;
    ctx.fillText("📝  KẾT QUẢ & NGUỒN CHẤM", b3X + 16, b3Y + 28);

    const avgScoreStr = hw.averageScore ? `Điểm TB: ${hw.averageScore}` : "Điểm TB: Chưa có bài chấm";
    ctx.fillStyle = "#334155";
    ctx.font = `600 13px ${FONT_FAMILY}`;
    ctx.fillText(`•  Đã chấm: ${hw.gradedCount}/${hw.completed} bài (${avgScoreStr})`, b3X + 16, b3Y + 54);

    if (hw.gradedCount > 0) {
      ctx.fillStyle = "#16a34a";
      ctx.fillText(`•  Đạt chuẩn: ${hw.passedCount} bài`, b3X + 16, b3Y + 80);
      ctx.fillStyle = "#d97706";
      ctx.fillText(`•  Cần cải thiện: ${hw.needsImprovementCount} bài`, b3X + 180, b3Y + 80);
    } else {
      ctx.fillStyle = "#64748b";
      ctx.fillText("•  Chưa có dữ liệu bài nộp được chấm", b3X + 16, b3Y + 80);
    }

    // Ô NHỎ 4 (Bottom-Right): Điểm kỹ năng Speaking & Writing (Fix chính xác theo dữ liệu thật)
    const b4X = 36 + subBoxW + subBoxGap;
    const b4Y = currY + subBoxH + subBoxGap;
    drawRoundedRect(ctx, b4X, b4Y, subBoxW, subBoxH, 12, "#ffffff", "#e2e8f0", 1.2);
    ctx.fillStyle = "#4338ca";
    ctx.font = `800 14px ${FONT_FAMILY}`;
    ctx.fillText("🎯  TB KỸ NĂNG (GIÁO VIÊN CHẤM)", b4X + 16, b4Y + 28);

    const spkAvg = hw.skillAverages?.speaking;
    const wrtAvg = hw.skillAverages?.writing;

    // Speaking badge text
    ctx.fillStyle = "#1e293b";
    ctx.font = `700 13px ${FONT_FAMILY}`;
    const spkDisp = spkAvg && spkAvg.count > 0
      ? `Band ${spkAvg.averageBand} (${spkAvg.count} bài)`
      : "Chưa có bài";
    ctx.fillText(`🗣️  Speaking: ${spkDisp}`, b4X + 16, b4Y + 54);

    // Writing badge text (Không bịa 6.5 nếu học viên chưa viết bài)
    const wrtDisp = wrtAvg && wrtAvg.count > 0
      ? `Band ${wrtAvg.averageBand} (${wrtAvg.count} bài)`
      : "Chưa có bài";
    ctx.fillText(`✍️  Writing: ${wrtDisp}`, b4X + 16, b4Y + 80);

    currY += subBoxH * 2 + subBoxGap + 22;

    // 6. Section 2: NHẬN XÉT CHUYÊN MÔN CỦA GIẢNG VIÊN
    drawSectionTitle("2", "NHẬN XÉT CHUYÊN MÔN CỦA GIẢNG VIÊN", currY);
    currY += 14;

    const subCardH = 82;
    const subCardGap = 10;

    const renderFeedbackCard = (
      y: number,
      title: string,
      content: string,
      accentColor: string,
      iconBg: string,
      iconSymbol: string
    ) => {
      drawRoundedRect(ctx, 36, y, width - 72, subCardH, 12, "#ffffff", "#e2e8f0", 1.2);

      // Left Accent Border
      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.roundRect(36, y, 5, subCardH, [12, 0, 0, 12]);
      ctx.fill();

      // Icon circle
      const icX = 64;
      const icY = y + subCardH / 2;
      ctx.beginPath();
      ctx.arc(icX, icY, 19, 0, Math.PI * 2);
      ctx.fillStyle = iconBg;
      ctx.fill();

      ctx.fillStyle = accentColor;
      ctx.font = `bold 16px ${FONT_FAMILY}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(iconSymbol, icX, icY);
      ctx.textAlign = "start";
      ctx.textBaseline = "alphabetic";

      // Title & Text (Tăng font size 14px để đọc rõ ràng trên điện thoại)
      ctx.fillStyle = accentColor;
      ctx.font = `800 13.5px ${FONT_FAMILY}`;
      ctx.fillText(title, 96, y + 26);

      ctx.fillStyle = "#334155";
      ctx.font = `500 13.5px ${FONT_FAMILY}`;
      drawWrappedText(ctx, content, 96, y + 50, width - 180, 20, 2);
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


    // QR Code for Magic Link
    const magicLink = data.parentToken
      ? `${window.location.origin}/p/${data.parentToken}`
      : "https://nextband.site";

    try {
      const qrDataUrl = await QRCode.toDataURL(magicLink, {
        width: 100,
        margin: 1,
        color: { dark: "#0f172a", light: "#ffffff" },
      });
      const qrImg = new Image();
      qrImg.src = qrDataUrl;
      await new Promise((resolve) => {
        qrImg.onload = resolve;
        qrImg.onerror = resolve;
      });
      const qrSize = 52;
      const qrX = width - 36 - qrSize;
      const qrY = footY - qrSize - 12;
      
      // Draw border box for QR
      drawRoundedRect(ctx, qrX - 4, qrY - 4, qrSize + 8, qrSize + 8, 6, "#ffffff", "#e2e8f0", 1);
      ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);
      
      ctx.fillStyle = "#64748b";
      ctx.font = `600 9.5px ${FONT_FAMILY}`;
      ctx.textAlign = "right";
      ctx.fillText("Quét mã xem trực tuyến", qrX - 8, qrY + qrSize / 2 + 3);
      ctx.textAlign = "start";
    } catch (qrErr) {
      console.warn("QR code render skip:", qrErr);
    }

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

  const magicLink = data.parentToken
    ? `${window.location.origin}/p/${data.parentToken}`
    : "https://nextband.site";

  const handleCopyMagicLink = async () => {
    try {
      await navigator.clipboard.writeText(magicLink);
      toast.success("Đã sao chép Magic Link phụ huynh vào bộ nhớ tạm!");
    } catch {
      toast.error("Không thể sao chép liên kết");
    }
  };

  const handleCopyZaloTemplate = async () => {
    const currentW = data.currentWeek || 1;
    const totalW = data.totalWeeks || 10;
    const template = `Dạ NextBand xin gửi quý anh/chị báo cáo tiến độ Tuần ${currentW}/${totalW} của em ${studentName}.\n- Tiến độ khóa học: ${courseProgressPct}% (${courseCompletedSessions}/${courseTotalSessions} buổi)\n- Tỷ lệ BTVN: ${hwCompletionPct}% (${hwCompleted}/${hwTotal} bài)\n- Đang bảo lưu Học bổng Kỷ luật ARIS.\n\nAnh/chị xem chi tiết nhật ký bài tập của con bằng 1 chạm tại:\n👉 ${magicLink}`;
    try {
      await navigator.clipboard.writeText(template);
      toast.success("Đã sao chép tin nhắn Zalo mẫu kèm Magic Link!");
    } catch {
      toast.error("Không thể sao chép");
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
            {/* Header Banner (HƯỚNG 1: Xóa logo cũ, hiển thị text thương hiệu ARIS IELTS) */}
            <div className="flex items-center justify-between gap-3 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="flex items-baseline gap-1.5 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-xl font-black text-rose-600 tracking-tight">ARIS</span>
                  <span className="text-sm font-extrabold text-blue-600 tracking-wide">IELTS</span>
                </div>
                <div>
                  <div className="text-[11px] font-extrabold uppercase tracking-wide text-blue-600">
                    HỌC VIỆN NGÔN NGỮ HỌC THUẬT ARIS
                  </div>
                  <div className="text-lg font-extrabold tracking-tight text-slate-900">
                    BÁO CÁO TIẾN ĐỘ HỌC TẬP
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-1.5 pt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Kỳ báo cáo: {periodStr}</span>
                  </div>
                </div>
              </div>
              <div className="hidden sm:block">
                <Badge variant="outline" className="text-xs font-bold text-blue-600 border-blue-200 bg-blue-50/60 px-3 py-1.5 flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
                  ACADEMIC PROGRESS REPORT
                </Badge>
              </div>
            </div>

            {/* Student Info Card */}
            <div className="p-4 bg-white rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
              <div className="flex items-center gap-3.5">
                <div className="w-13 h-13 rounded-full bg-sky-100 flex items-center justify-center shrink-0 p-3">
                  <User className="w-7 h-7 text-sky-600" />
                </div>
                <div>
                  <div className="font-extrabold text-sm text-slate-900">
                    HỌC VIÊN: {studentName.toUpperCase()}
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600 pt-1">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      Lớp học: <strong className="text-slate-800">{className}</strong>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      Giảng viên: <strong className="text-slate-800">{teacherName}</strong>
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 pt-1 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    Sĩ số: <strong className="text-slate-700">{classCurrent} học viên</strong> (tối đa {classMax} HV)
                  </div>
                </div>
              </div>

              {/* Target pill */}
              <div className="self-stretch sm:self-center bg-rose-50 border border-rose-200 px-3.5 py-2 rounded-xl text-center shrink-0 flex items-center justify-center gap-1.5">
                <Target className="w-4 h-4 text-red-500" />
                <span className="text-xs text-red-800 font-semibold">Target:</span>
                <span className="text-xs font-extrabold text-red-600">{targetBand}</span>
              </div>
            </div>

            {/* 2 Core Stats Cards (Bố cục 2 thẻ cân đối, loại bỏ ô Chuyên Cần ảo) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Card 1: Tiến độ khóa học */}
              <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                    <PieChart className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-xs text-blue-600 font-extrabold uppercase truncate">
                    TIẾN ĐỘ KHÓA HỌC
                  </div>
                </div>
                <div className="text-2xl font-extrabold text-blue-600 pl-1">{courseProgressPct}%</div>
                <div className="text-xs text-slate-500 pl-1 truncate">
                  Đã hoàn thành {courseCompletedSessions}/{courseTotalSessions} buổi
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden mt-1.5">
                  <div
                    style={{ width: `${courseProgressPct}%` }}
                    className="h-full bg-blue-600 rounded-full"
                  />
                </div>
              </div>

              {/* Card 2: Bài tập về nhà */}
              <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 shrink-0">
                    <Home className="w-4 h-4 text-orange-600" />
                  </div>
                  <div className="text-xs text-orange-600 font-extrabold uppercase truncate">
                    BÀI TẬP VỀ NHÀ
                  </div>
                </div>
                <div className="text-2xl font-extrabold text-orange-600 pl-1">
                  {hwCompleted}/{hwTotal} bài
                </div>
                <div className="text-xs text-slate-500 pl-1 truncate">
                  Đạt {hwCompletionPct}% hoàn thành
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden mt-1.5">
                  <div
                    style={{ width: `${hwCompletionPct}%` }}
                    className="h-full bg-orange-500 rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* Section 1: BÀI TẬP VỀ NHÀ & CHẤT LƯỢNG BÀI LÀM - CHIA THÀNH CÁC Ô NHỎ */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                  1
                </div>
                <div className="font-extrabold text-sm text-slate-900">
                  BÀI TẬP VỀ NHÀ & CHẤT LƯỢNG BÀI LÀM
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Ô Nhỏ 1: Tiến độ hoàn thành bài tập */}
                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-emerald-600 flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600" />
                      Hoàn thành: {hwCompleted}/{hwTotal} ({hwCompletionPct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      style={{ width: `${hwCompletionPct}%` }}
                      className="h-full bg-emerald-500 rounded-full"
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-600 pt-0.5">
                    {data.homework.overdue > 0 ? (
                      <span className="text-rose-600 font-semibold flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                        Quá hạn: {data.homework.overdue} bài
                      </span>
                    ) : (
                      <span>• Đang làm: {data.homework.inProgress} bài</span>
                    )}
                    <span>• Chưa nộp: {data.homework.unsubmitted} bài</span>
                  </div>
                </div>

                {/* Ô Nhỏ 2: Thời lượng rèn luyện */}
                <div className="p-3 bg-sky-50/70 rounded-xl border border-sky-200 shadow-sm flex flex-col justify-between">
                  <div className="text-xs font-bold text-sky-800 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-sky-600" />
                    THỜI LƯỢNG RÈN LUYỆN
                  </div>
                  <div className="text-base font-extrabold text-sky-950 py-1">
                    {totalMinutes > 0 ? (
                      <>
                        {totalMinutes} phút <span className="text-xs font-semibold text-slate-600">(~{hoursFormatted} giờ)</span>
                      </>
                    ) : (
                      <>0 phút <span className="text-xs font-semibold text-slate-600">(0.0 giờ)</span></>
                    )}
                  </div>
                  <div className={`text-xs font-bold ${totalMinutes > 0 ? "text-amber-700" : "text-slate-500"}`}>
                    {totalMinutes > 0 ? `• Trung bình: ${avgMinutes} phút/bài` : "• Chưa ghi nhận thời gian làm bài"}
                  </div>
                </div>

                {/* Ô Nhỏ 3: Kết quả & nguồn chấm (Chính xác) */}
                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm space-y-1.5 text-xs text-slate-700">
                  <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-blue-600" />
                    KẾT QUẢ & NGUỒN CHẤM
                  </div>
                  <div>
                    • Đã chấm: <strong>{data.homework.gradedCount}/{hwCompleted} bài</strong>{" "}
                    ({data.homework.averageScore ? `Điểm TB: ${data.homework.averageScore}` : "Điểm TB: Chưa có bài"})
                  </div>
                  {data.homework.gradedCount > 0 ? (
                    <div className="flex items-center gap-3 pt-0.5">
                      <span className="text-emerald-700 font-semibold">• Đạt chuẩn: {data.homework.passedCount}</span>
                      <span className="text-amber-700 font-semibold">• Cần cải thiện: {data.homework.needsImprovementCount}</span>
                    </div>
                  ) : (
                    <div className="text-slate-400 italic">• Chưa có bài nộp được chấm điểm</div>
                  )}
                </div>

                {/* Ô Nhỏ 4: Điểm kỹ năng Speaking & Writing (Chính xác, không bịa) */}
                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm space-y-1.5 text-xs">
                  <div className="font-extrabold text-indigo-700 flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-indigo-600" />
                    TB KỸ NĂNG (GIÁO VIÊN CHẤM)
                  </div>
                  <div className="space-y-1 pt-0.5">
                    <div className="flex items-center justify-between text-slate-700">
                      <span>🗣️ Speaking:</span>
                      <strong className="text-slate-900">
                        {data.homework.skillAverages?.speaking && data.homework.skillAverages.speaking.count > 0
                          ? `Band ${data.homework.skillAverages.speaking.averageBand} (${data.homework.skillAverages.speaking.count} bài)`
                          : "Chưa có bài"}
                      </strong>
                    </div>
                    <div className="flex items-center justify-between text-slate-700">
                      <span>✍️ Writing:</span>
                      <strong className="text-slate-900">
                        {data.homework.skillAverages?.writing && data.homework.skillAverages.writing.count > 0
                          ? `Band ${data.homework.skillAverages.writing.averageBand} (${data.homework.skillAverages.writing.count} bài)`
                          : "Chưa có bài"}
                      </strong>
                    </div>
                  </div>
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
              <div className="p-3 bg-white rounded-xl border border-slate-200 border-l-4 border-l-emerald-500 shadow-sm flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Star className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                </div>
                <div>
                  <div className="font-extrabold text-xs text-emerald-700">ĐIỂM MẠNH HỌC VIÊN</div>
                  <div className="text-xs text-slate-700 pt-0.5 leading-relaxed">{strengths}</div>
                </div>
              </div>

              {/* Sub-card 2: Cần chú ý */}
              <div className="p-3 bg-white rounded-xl border border-slate-200 border-l-4 border-l-amber-500 shadow-sm flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertTriangle className="w-4 h-4 fill-amber-500 text-amber-500" />
                </div>
                <div>
                  <div className="font-extrabold text-xs text-amber-700">ĐIỂM CẦN CHÚ Ý & CẢI THIỆN</div>
                  <div className="text-xs text-slate-700 pt-0.5 leading-relaxed">{weaknesses}</div>
                </div>
              </div>

              {/* Sub-card 3: Khuyến nghị & kế hoạch */}
              <div className="p-3 bg-white rounded-xl border border-slate-200 border-l-4 border-l-sky-500 shadow-sm flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Target className="w-4 h-4 text-sky-600" />
                </div>
                <div>
                  <div className="font-extrabold text-xs text-sky-700">KHUYẾN NGHỊ & KẾ HOẠCH RÈN LUYỆN</div>
                  <div className="text-xs text-slate-700 pt-0.5 leading-relaxed">{recommendations}</div>
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
        <DialogFooter className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-3 border-t border-slate-200">
          <div className="text-[11px] text-slate-500 hidden sm:block">
            * Nhận xét được lưu trực tiếp vào hồ sơ học viên cuối khóa (StudentPeriodicReport).
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="rounded-xl font-medium border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
            >
              Đóng
            </Button>

            {onSaveReport && (
              <Button
                variant="outline"
                size="sm"
                disabled={isExporting}
                onClick={async () => {
                  try {
                    await onSaveReport({
                      strengths,
                      weaknesses,
                      recommendations,
                      targetBand,
                    });
                    toast.success("Đã lưu nhận xét cuối khóa thành công!");
                  } catch (err: any) {
                    toast.error("Lỗi khi lưu nhận xét: " + (err.message || ""));
                  }
                }}
                className="rounded-xl font-bold gap-1.5 border-blue-200 text-blue-700 bg-blue-50/70 hover:bg-blue-100"
              >
                <Check className="w-3.5 h-3.5" />
                Lưu nhận xét
              </Button>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyMagicLink}
              className="rounded-xl font-bold gap-1.5 border-amber-300 text-amber-800 bg-amber-50 hover:bg-amber-100"
            >
              <LinkIcon className="w-3.5 h-3.5 text-amber-600" />
              Copy Link Phụ Huynh
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyZaloTemplate}
              className="rounded-xl font-bold gap-1.5 border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100"
            >
              <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
              Copy Tin Zalo
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
              {isExporting ? "Đang tạo ảnh..." : "Sao chép ảnh (Zalo)"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


