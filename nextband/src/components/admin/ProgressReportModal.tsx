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
  Target,
  GraduationCap,
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
    nextGoals: string[];
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
  const [goal1, setGoal1] = useState(
    data.teacherEvaluation?.nextGoals?.[0] || "Duy trì tỷ lệ chuyên cần ≥ 90%"
  );
  const [goal2, setGoal2] = useState(
    data.teacherEvaluation?.nextGoals?.[1] || "Hoàn thành 100% bài tập được giao đúng hạn"
  );
  const [goal3, setGoal3] = useState(
    data.teacherEvaluation?.nextGoals?.[2] || "Cải thiện độ chính xác bài kiểm tra lên ≥ 6.5"
  );

  const [isExporting, setIsExporting] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Sync state when data changes
  useEffect(() => {
    if (data.student?.targetBand) setTargetBand(data.student.targetBand);
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
  const periodStr = `${data.period?.from || ""} — ${data.period?.to || ""}`;

  // KPI Calculations
  const courseProgressPct = data.courseProgress?.percent ?? 60;
  const attendanceRate = data.attendance ? data.attendance.rate : 100;
  const hwCompleted = data.homework?.completed ?? 0;
  const hwTotal = data.homework?.totalAssigned ?? 0;
  const hwCompletionPct = data.homework?.completionRate ?? (hwTotal > 0 ? Math.round((hwCompleted / hwTotal) * 100) : 0);

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
   * Helper to draw text with multi-line wrapping so text never gets chopped on canvas
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
   * Preload the ARIS Logo Image safely from preview DOM or direct path
   */
  const loadLogoImage = async (): Promise<HTMLImageElement | null> => {
    // 1. Try to grab existing loaded image element from live preview DOM
    if (typeof document !== "undefined") {
      const previewImg = cardRef.current?.querySelector("img") as HTMLImageElement | null;
      if (previewImg && previewImg.complete && previewImg.naturalWidth > 0) {
        return previewImg;
      }
    }

    // 2. Fallback: try loading directly without crossOrigin restriction
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
   * Draw the Academic Progress Report onto an HTML5 Canvas with 2x Retina sharpness & high-fidelity typography
   */
  const drawReportToCanvas = async (): Promise<HTMLCanvasElement> => {
    // 1. Wait for Web Fonts to be ready
    if (typeof document !== "undefined" && document.fonts) {
      try {
        await document.fonts.ready;
      } catch (e) {
        console.warn("Fonts ready promise error, fallback:", e);
      }
    }

    // Preload Logo
    const logoImg = await loadLogoImage();

    const width = 760;
    const height = 980;
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
    drawRoundedRect(ctx, 12, 12, width - 24, height - 24, 14, undefined, "#e2e8f0", 1.5);

    // 2. Header Banner (Deep Navy Brand with subtle styling)
    drawRoundedRect(ctx, 20, 18, width - 40, 92, 12, "#0b1a30");

    // White Logo Container on Left
    drawRoundedRect(ctx, 32, 28, 72, 72, 10, "#ffffff", "#38bdf8", 1.5);
    if (logoImg && logoImg.naturalWidth > 0) {
      const boxX = 32;
      const boxY = 28;
      const boxSize = 72;
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
      ctx.fillText("ARIS", 48, 68);
    }

    // Top brand tag
    ctx.fillStyle = "#38bdf8";
    ctx.font = `800 11.5px ${FONT_FAMILY}`;
    ctx.fillText("HỌC VIỆN NGÔN NGỮ HỌC THUẬT ARIS", 118, 44);

    // Report Title
    ctx.fillStyle = "#ffffff";
    ctx.font = `800 22px ${FONT_FAMILY}`;
    ctx.fillText("BÁO CÁO TIẾN ĐỘ HỌC TẬP", 118, 71);

    // Period sub-badge
    ctx.fillStyle = "#94a3b8";
    ctx.font = `500 12.5px ${FONT_FAMILY}`;
    ctx.fillText(`Kỳ báo cáo: ${periodStr}`, 118, 93);

    // Academic Tag on Right
    drawRoundedRect(ctx, width - 240, 42, 210, 34, 17, "rgba(56, 189, 248, 0.12)", "#38bdf8", 1);
    ctx.fillStyle = "#38bdf8";
    ctx.font = `800 11px ${FONT_FAMILY}`;
    ctx.fillText("ACADEMIC PROGRESS REPORT", width - 228, 64);

    let currY = 120;

    // 3. Section 01: THÔNG TIN HỌC VIÊN & QUY MÔ LỚP HỌC
    const classCurrent = data.classInfo?.currentStudents || 6;
    const classMax = data.classInfo?.maxStudents || 10;

    drawRoundedRect(ctx, 20, currY, width - 40, 92, 10, "#f8fafc", "#e2e8f0", 1);

    // Left accent bar
    ctx.fillStyle = "#0284c7";
    ctx.beginPath();
    ctx.roundRect(20, currY, 5, 92, [10, 0, 0, 10]);
    ctx.fill();

    ctx.fillStyle = "#0f172a";
    ctx.font = `800 17.5px ${FONT_FAMILY}`;
    ctx.fillText(`HỌC VIÊN: ${studentName.toUpperCase()}`, 38, currY + 28);

    // Class and Teacher Info
    ctx.fillStyle = "#334155";
    ctx.font = `700 13.5px ${FONT_FAMILY}`;
    ctx.fillText(`• Lớp học: ${className}`, 38, currY + 54);
    ctx.fillText(`• Giảng viên: ${teacherName}`, 240, currY + 54);

    // Highlighted Target Band Badge
    ctx.fillStyle = "#4338ca";
    ctx.font = `800 14px ${FONT_FAMILY}`;
    ctx.fillText(`• Mục tiêu đầu ra: ${targetBand}`, 470, currY + 54);

    // Sĩ số lớp học
    ctx.fillStyle = "#0369a1";
    ctx.font = `700 13px ${FONT_FAMILY}`;
    ctx.fillText(`• Sĩ số: ${classCurrent} học viên (tối đa ${classMax} HV)`, 38, currY + 77);

    currY += 104;

    // 4. Section 02: 3 KPI CARDS TỔNG QUAN (To rõ, lớn cho mobile)
    const cardGap = 14;
    const totalW = width - 40;
    const cardW = (totalW - cardGap * 2) / 3;
    const cardH = 94;

    const kpis = [
      {
        label: "TIẾN ĐỘ KHÓA HỌC",
        val: `${courseProgressPct}%`,
        color: "#0284c7",
        bg: "#f0f9ff",
        border: "#bae6fd",
        sub: data.courseProgress?.totalSessions
          ? `Đã hoàn thành ${data.courseProgress.completedSessions || 0}/${data.courseProgress.totalSessions} buổi`
          : "Theo phân phối buổi học",
      },
      {
        label: "CHUYÊN CẦN",
        val: `${attendanceRate}%`,
        color: "#0f172a",
        bg: "#f8fafc",
        border: "#cbd5e1",
        sub: data.attendance && data.attendance.total > 0
          ? `Có mặt ${data.attendance.present}/${data.attendance.total} buổi (Vắng ${data.attendance.absent})`
          : "Tham gia đầy đủ 100%",
      },
      {
        label: "BÀI TẬP VỀ NHÀ",
        val: `${hwCompleted}/${hwTotal}`,
        color: "#15803d",
        bg: "#f0fdf4",
        border: "#bbf7d0",
        sub: `Đạt ${hwCompletionPct}% tỷ lệ hoàn thành`,
      },
    ];

    kpis.forEach((kpi, idx) => {
      const kX = 20 + idx * (cardW + cardGap);
      drawRoundedRect(ctx, kX, currY, cardW, cardH, 10, kpi.bg, kpi.border, 1.2);

      ctx.fillStyle = "#64748b";
      ctx.font = `700 12px ${FONT_FAMILY}`;
      ctx.fillText(kpi.label, kX + 16, currY + 24);

      ctx.fillStyle = kpi.color;
      ctx.font = `800 32px ${FONT_FAMILY}`;
      ctx.fillText(kpi.val, kX + 16, currY + 58);

      ctx.fillStyle = "#64748b";
      ctx.font = `600 12.5px ${FONT_FAMILY}`;
      ctx.fillText(kpi.sub, kX + 16, currY + 80);
    });

    currY += cardH + 20;

    // Helper function to draw Section Header
    const drawSectionHeader = (title: string, y: number) => {
      ctx.fillStyle = "#0f172a";
      ctx.font = `800 15px ${FONT_FAMILY}`;
      ctx.fillText(title, 20, y);

      ctx.strokeStyle = "#cbd5e1";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(20, y + 6);
      ctx.lineTo(width - 20, y + 6);
      ctx.stroke();
    };

    // 5. Section 01: BÀI TẬP VỀ NHÀ & CHẤT LƯỢNG BÀI LÀM (3 Lớp thông tin + Thanh tiến độ trực quan)
    drawSectionHeader("1. BÀI TẬP VỀ NHÀ & CHẤT LƯỢNG BÀI LÀM", currY);
    currY += 16;

    const hw = data.homework;
    const hwBoxH = 126;
    drawRoundedRect(ctx, 20, currY, width - 40, hwBoxH, 10, "#f8fafc", "#e2e8f0", 1);

    // Lớp 1: Mức độ hoàn thành
    ctx.fillStyle = "#059669";
    ctx.font = `800 14.5px ${FONT_FAMILY}`;
    ctx.fillText(`✓ Hoàn thành: ${hw.completed} / ${hw.totalAssigned} bài (${hwCompletionPct}%)`, 36, currY + 27);

    if (hw.overdue > 0) {
      ctx.fillStyle = "#e11d48";
      ctx.font = `700 14px ${FONT_FAMILY}`;
      ctx.fillText(`⚠ Quá hạn: ${hw.overdue} bài`, 340, currY + 27);
    } else {
      ctx.fillStyle = "#475569";
      ctx.font = `600 14px ${FONT_FAMILY}`;
      ctx.fillText(`• Đang thực hiện: ${hw.inProgress} bài`, 340, currY + 27);
    }

    ctx.fillStyle = "#64748b";
    ctx.font = `600 14px ${FONT_FAMILY}`;
    ctx.fillText(`• Chưa nộp: ${hw.unsubmitted} bài`, 530, currY + 27);

    // Visual Mini Progress Bar
    const hwBarX = 36;
    const hwBarY = currY + 41;
    const hwBarW = width - 72;
    const hwBarH = 10;
    drawRoundedRect(ctx, hwBarX, hwBarY, hwBarW, hwBarH, 5, "#e2e8f0");
    const hwFillW = Math.min(hwBarW, Math.max(0, (hwBarW * hwCompletionPct) / 100));
    if (hwFillW > 0) {
      drawRoundedRect(ctx, hwBarX, hwBarY, hwFillW, hwBarH, 5, "#10b981");
    }

    // Lớp 2: Đánh giá chất lượng & Kết quả chấm
    ctx.fillStyle = "#1e293b";
    ctx.font = `700 13.5px ${FONT_FAMILY}`;
    const avgScoreStr = hw.averageScore ? `Điểm TB: ${hw.averageScore}` : "Điểm TB: Đang tích lũy";
    const passRateStr = `Đạt chuẩn: ${hw.passedCount || 0} bài  |  Cần cải thiện: ${hw.needsImprovementCount || 0} bài`;
    ctx.fillText(`• Đã chấm & phản hồi: ${hw.gradedCount}/${hw.completed} bài   |   ${avgScoreStr}   |   ${passRateStr}`, 36, currY + 76);

    // Lớp 3: Nguồn chấm điểm thực tế từ submission (Chấm tự động vs Giáo viên chấm & phản hồi)
    ctx.fillStyle = "#0369a1";
    ctx.font = `700 13px ${FONT_FAMILY}`;
    ctx.fillText(
      `• Nguồn chấm: ${hw.autoGradedCount || 0} bài tự động · ${hw.teacherGradedCount || 0} bài giáo viên chấm & nhận xét`,
      36,
      currY + 104
    );

    currY += hwBoxH + 20;

    // 6. Section 02: NHẬN XÉT CỦA GIÁO VIÊN (3 Cards màu sắc riêng biệt, chữ to rõ ràng)
    drawSectionHeader("2. NHẬN XÉT CHUYÊN MÔN CỦA GIẢNG VIÊN", currY);
    currY += 16;

    const subCardH = 78;
    const subCardGap = 10;

    // Sub-card 1: Điểm mạnh
    const sc1Y = currY;
    drawRoundedRect(ctx, 20, sc1Y, width - 40, subCardH, 8, "#f0fdf4", "#bbf7d0", 1);
    ctx.fillStyle = "#15803d";
    ctx.font = `800 14px ${FONT_FAMILY}`;
    ctx.fillText("✓ Điểm mạnh học viên:", 34, sc1Y + 23);
    ctx.fillStyle = "#1e293b";
    ctx.font = `500 13.5px ${FONT_FAMILY}`;
    drawWrappedText(ctx, strengths || "Tiếp thu tốt kiến thức trên lớp, chủ động tương tác.", 34, sc1Y + 44, width - 68, 20, 2);

    // Sub-card 2: Cần cải thiện
    const sc2Y = sc1Y + subCardH + subCardGap;
    drawRoundedRect(ctx, 20, sc2Y, width - 40, subCardH, 8, "#fffbeb", "#fde68a", 1);
    ctx.fillStyle = "#b45309";
    ctx.font = `800 14px ${FONT_FAMILY}`;
    ctx.fillText("⚠ Điểm cần chú ý cải thiện:", 34, sc2Y + 23);
    ctx.fillStyle = "#1e293b";
    ctx.font = `500 13.5px ${FONT_FAMILY}`;
    drawWrappedText(ctx, weaknesses || "Cần chú ý cẩn thận hơn về cấu trúc ngữ pháp và từ vựng học thuật.", 34, sc2Y + 44, width - 68, 20, 2);

    // Sub-card 3: Khuyến nghị
    const sc3Y = sc2Y + subCardH + subCardGap;
    drawRoundedRect(ctx, 20, sc3Y, width - 40, subCardH, 8, "#f0f9ff", "#bae6fd", 1);
    ctx.fillStyle = "#0369a1";
    ctx.font = `800 14px ${FONT_FAMILY}`;
    ctx.fillText("★ Khuyến nghị từ giảng viên:", 34, sc3Y + 23);
    ctx.fillStyle = "#1e293b";
    ctx.font = `500 13.5px ${FONT_FAMILY}`;
    drawWrappedText(ctx, recommendations || "Dành thêm 20-30 phút tự học mỗi ngày, hoàn thành bài tập đúng hạn.", 34, sc3Y + 44, width - 68, 20, 2);

    currY = sc3Y + subCardH + 20;

    // 7. Section 03: MỤC TIÊU GIAI ĐOẠN TIẾP THEO
    drawSectionHeader("3. TRỌNG TÂM & MỤC TIÊU GIAI ĐOẠN TIẾP THEO", currY);
    currY += 16;

    const goalsBoxH = 96;
    drawRoundedRect(ctx, 20, currY, width - 40, goalsBoxH, 10, "#f0fdf4", "#bbf7d0", 1);

    const goals = [goal1, goal2, goal3].filter(Boolean);
    if (goals.length > 0) {
      goals.forEach((g, idx) => {
        ctx.fillStyle = "#166534";
        ctx.font = `700 14px ${FONT_FAMILY}`;
        ctx.fillText(`🎯  ${g}`, 36, currY + 28 + idx * 24);
      });
    } else {
      ctx.fillStyle = "#166534";
      ctx.font = `600 14px ${FONT_FAMILY}`;
      ctx.fillText("🎯  Duy trì tỷ lệ chuyên cần 100% các buổi học", 36, currY + 28);
      ctx.fillText("🎯  Hoàn thành đầy đủ các bài tập tự học trên hệ thống", 36, currY + 54);
    }

    // 8. Footer & Brand Identity (Địa chỉ trung tâm & Ngày xuất)
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(20, height - 42);
    ctx.lineTo(width - 20, height - 42);
    ctx.stroke();

    ctx.fillStyle = "#475569";
    ctx.font = `700 12px ${FONT_FAMILY}`;
    ctx.fillText("68B, Phan Bội Châu, P. Dĩ An, TP.HCM", 20, height - 20);

    ctx.fillStyle = "#64748b";
    ctx.font = `500 12px ${FONT_FAMILY}`;
    ctx.fillText(`Website: nextband.site   |   Ngày xuất: ${data.generatedAt}`, width - 290, height - 20);

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
      <DialogContent className="max-w-4xl max-h-[94vh] overflow-y-auto p-5 sm:p-6 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-base font-bold flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            Báo Cáo Tiến Độ Học Tập — ARIS Academic Report
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* LEFT: FORM CHỈNH SỬA THÔNG TIN & NHẬN XÉT CỦA GIÁO VIÊN */}
          <div className="lg:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
            {/* Section 0: Mục tiêu đầu ra */}
            <div className="space-y-1.5 pb-2 border-b border-slate-200 dark:border-slate-800">
              <Label className="text-[11.5px] font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" />
                Mục tiêu đầu ra (Target Band)
              </Label>
              <Input
                value={targetBand}
                onChange={(e) => setTargetBand(e.target.value)}
                className="h-8 text-xs bg-white dark:bg-slate-950 font-semibold"
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
                        ? "bg-indigo-600 text-white"
                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 pb-0.5">
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

            <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
              <Label className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                4. Trọng tâm & Mục tiêu giai đoạn tới (3 mục tiêu)
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
            <div className="bg-[#0b1a30] text-white p-3.5 rounded-lg flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-lg bg-white p-1 flex items-center justify-center shrink-0">
                  <SiteLogo className="w-full h-full object-contain" />
                </div>
                <div>
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
              </div>
              <div className="hidden sm:block">
                <Badge variant="outline" className="text-[9.5px] font-bold text-sky-400 border-sky-400/40 bg-sky-400/10">
                  ACADEMIC REPORT
                </Badge>
              </div>
            </div>

            {/* Student Info */}
            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1.5">
              <div className="font-bold text-xs text-slate-900 dark:text-white">
                HỌC VIÊN: {studentName.toUpperCase()}
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 dark:text-slate-300">
                <span>• Lớp: <strong>{className}</strong></span>
                <span>• Giảng viên: <strong>{teacherName}</strong></span>
                <span className="text-indigo-700 dark:text-indigo-300">• Mục tiêu: <strong>{targetBand}</strong></span>
                <span>• Ngày xuất: <strong>{data.generatedAt}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 pt-1.5 border-t border-slate-200/60 dark:border-slate-800 text-[11px]">
                <span className="font-bold text-sky-700 dark:text-sky-400">• Sĩ số:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {data.classInfo?.currentStudents || 6} học viên (tối đa {data.classInfo?.maxStudents || 10} HV)
                </span>
              </div>
            </div>

            {/* 3 KPI Cards (Wider, no text overflow) */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="p-2.5 bg-sky-50 dark:bg-sky-950/40 rounded-lg border border-sky-200 dark:border-sky-800 text-center">
                <div className="text-[10px] text-sky-700 dark:text-sky-300 font-bold">TIẾN ĐỘ KHÓA HỌC</div>
                <div className="text-base font-extrabold text-sky-600 my-0.5">{courseProgressPct}%</div>
                <div className="text-[10px] text-slate-500 truncate">
                  {data.courseProgress?.totalSessions
                    ? `${data.courseProgress.completedSessions || 0}/${data.courseProgress.totalSessions} buổi`
                    : "Theo phân phối"}
                </div>
              </div>
              <div className="p-2.5 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-center">
                <div className="text-[10px] text-slate-600 dark:text-slate-400 font-bold">CHUYÊN CẦN</div>
                <div className="text-base font-extrabold text-slate-900 dark:text-slate-100 my-0.5">
                  {attendanceRate}%
                </div>
                <div className="text-[10px] text-slate-500 truncate">
                  {data.attendance && data.attendance.total > 0
                    ? `Có mặt ${data.attendance.present}/${data.attendance.total} buổi`
                    : "Đầy đủ 100%"}
                </div>
              </div>
              <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-800 text-center">
                <div className="text-[10px] text-emerald-700 dark:text-emerald-300 font-bold">BÀI TẬP VỀ NHÀ</div>
                <div className="text-base font-extrabold text-emerald-700 dark:text-emerald-400 my-0.5">
                  {hwCompleted}/{hwTotal}
                </div>
                <div className="text-[10px] text-slate-500 truncate">
                  Đạt {hwCompletionPct}% hoàn thành
                </div>
              </div>
            </div>

            {/* Homework */}
            <div className="space-y-1">
              <div className="font-bold text-[11px] text-slate-800 dark:text-slate-200 flex justify-between">
                <span>1. BÀI TẬP VỀ NHÀ & CHẤT LƯỢNG BÀI LÀM</span>
                {data.homework.averageScore && (
                  <span className="text-sky-600 font-semibold">Điểm TB: {data.homework.averageScore}</span>
                )}
              </div>
              <div className="p-2.5 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-[11px] space-y-1.5">
                <div className="flex justify-between font-medium">
                  <span className="text-emerald-600 font-bold">✓ Hoàn thành: {hwCompleted}/{hwTotal} ({hwCompletionPct}%)</span>
                  {data.homework.overdue > 0 ? (
                    <span className="text-rose-600 font-bold">⚠ Quá hạn: {data.homework.overdue} bài</span>
                  ) : (
                    <span className="text-slate-500">• Chưa nộp: {data.homework.unsubmitted} bài</span>
                  )}
                </div>
                {/* Visual bar */}
                <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div
                    style={{ width: `${hwCompletionPct}%` }}
                    className="h-full bg-emerald-500 rounded-full"
                  />
                </div>
                <div className="text-[10.5px] text-slate-600 dark:text-slate-300 flex justify-between">
                  <span>Đã chấm: <strong>{data.homework.gradedCount}/{hwCompleted}</strong> | Đạt chuẩn: <strong className="text-emerald-600">{data.homework.passedCount || 0}</strong> | Cần cải thiện: <strong className="text-amber-600">{data.homework.needsImprovementCount || 0}</strong></span>
                </div>
                <div className="text-[10px] text-sky-700 dark:text-sky-400">
                  • Nguồn chấm: {data.homework.autoGradedCount || 0} bài tự động · {data.homework.teacherGradedCount || 0} bài giáo viên chấm & nhận xét
                </div>
              </div>
            </div>

            {/* Teacher Notes Preview (3 separate colored cards) */}
            <div className="space-y-1.5">
              <div className="font-bold text-[11px] text-slate-800 dark:text-slate-200">
                2. NHẬN XÉT CHUYÊN MÔN CỦA GIẢNG VIÊN
              </div>
              <div className="p-2.5 bg-emerald-50/80 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-900 text-[11px] text-slate-800 dark:text-slate-200">
                <span className="font-bold text-emerald-800 dark:text-emerald-300">✓ Điểm mạnh: </span>
                <span>{strengths}</span>
              </div>
              <div className="p-2.5 bg-amber-50/80 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-900 text-[11px] text-slate-800 dark:text-slate-200">
                <span className="font-bold text-amber-800 dark:text-amber-300">⚠ Cần cải thiện: </span>
                <span>{weaknesses}</span>
              </div>
              <div className="p-2.5 bg-sky-50/80 dark:bg-sky-950/20 rounded-lg border border-sky-200 dark:border-sky-900 text-[11px] text-slate-800 dark:text-slate-200">
                <span className="font-bold text-sky-800 dark:text-sky-300">★ Khuyến nghị: </span>
                <span>{recommendations}</span>
              </div>
            </div>

            {/* Goals */}
            <div className="p-2.5 bg-emerald-50/60 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-900 text-[11px] space-y-1 text-emerald-900 dark:text-emerald-300">
              <div className="font-bold">3. TRỌNG TÂM & MỤC TIÊU GIAI ĐOẠN TIẾP THEO</div>
              <div className="text-[10.5px]">🎯 {goal1}</div>
              <div className="text-[10.5px]">🎯 {goal2}</div>
              <div className="text-[10.5px]">🎯 {goal3}</div>
            </div>

            {/* Footer watermark */}
            <div className="pt-1.5 text-[10px] text-slate-400 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
              <span>68B, Phan Bội Châu, P. Dĩ An, TP.HCM</span>
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

