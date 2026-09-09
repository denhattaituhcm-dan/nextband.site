import React, { useRef, useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Check, Shield, Heart, FileCheck, Award } from "lucide-react";
import { toast } from "sonner";
import { SiteLogo } from "@/components/common/SiteLogo";

export type HonorCardReportType = "DAILY_LOG" | "MILESTONE_HONOR";

export interface HonorReportCardModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  reportType?: HonorCardReportType;
  metricDiscipline?: string;
  metricScore?: string;
  examTitle?: string;
  courseTitle?: string;
  dateStr?: string;
}

/**
 * Helper to wrap text into multiple lines fitting maxWidth on canvas
 */
function wrapCanvasText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const testWidth = ctx.measureText(testLine).width;
    if (testWidth > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines;
}

export function HonorReportCardModal({
  open,
  onOpenChange,
  studentName,
  reportType = "DAILY_LOG",
  metricDiscipline = "100% Hoàn thành",
  metricScore = "Đã nộp bài đầy đủ",
  examTitle = "Bài tập rèn luyện",
  courseTitle = "Hệ thống Bác sĩ học thuật ARIS",
  dateStr = new Date().toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }),
}: HonorReportCardModalProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const isHonor = reportType === "MILESTONE_HONOR";

  // Configuration based on mode
  const badgeTitle = isHonor ? "CHỨNG NHẬN VINH DANH" : "PHIẾU GHI NHẬN HỌC TẬP";
  const mainCardTitle = isHonor ? "BÁO CÁO PHẪU THUẬT NĂNG LỰC" : "PHIẾU GHI NHẬN RÈN LUYỆN";
  const studentHonorRole = isHonor ? "HỌC VIÊN VINH DANH" : "HỌC VIÊN NỖ LỰC";
  const quoteText = isHonor
    ? "“Mọi điểm nghẽn tư duy đều được phẫu thuật và chữa lành. Nỗ lực bền bỉ hôm nay là sự đền đáp xứng đáng nhất cho niềm tin và sự đầu tư của Gia đình.”"
    : "“Mỗi bài tập hoàn thành là một bước tiến vững chắc trên hành trình làm chủ IELTS. Nỗ lực rèn luyện hôm nay là lời khẳng định ý chí vươn lên, đền đáp xứng đáng niềm tin và sự đồng hành của Gia đình.”";

  const sealTitle = isHonor ? "XÁC THỰC BỞI HỘI ĐỒNG BÁC SĨ HỌC THUẬT ARIS" : "CHỨNG THỰC BỞI HỆ THỐNG ĐÀO TẠO ARIS";
  const sealText = isHonor ? "★ 100% ★" : "✓ VERIFIED";
  const sealSub = isHonor ? "VERIFIED" : "OFFICIAL";

  // Generate crisp high-resolution PNG with bright, balanced academic certificate layout
  const handleDownloadImage = useCallback(async () => {
    setIsDownloading(true);
    try {
      // Golden ratio certificate dimension (1080 x 1260) - balanced, no awkward stretching
      const width = 1080;
      const height = 1260;
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("Cannot get canvas context");
      }

      // 1. Premium bright background (Warm white / pearl ivory with soft gradient)
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      if (isHonor) {
        bgGrad.addColorStop(0, "#ffffff");
        bgGrad.addColorStop(0.5, "#fffdf5");
        bgGrad.addColorStop(1, "#fefce8");
      } else {
        bgGrad.addColorStop(0, "#ffffff");
        bgGrad.addColorStop(0.5, "#f8fafc");
        bgGrad.addColorStop(1, "#f0f7ff");
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle radial warmth in center
      const centerGlow = ctx.createRadialGradient(width / 2, height / 2, 60, width / 2, height / 2, 580);
      centerGlow.addColorStop(0, isHonor ? "rgba(254, 240, 138, 0.2)" : "rgba(224, 242, 254, 0.35)");
      centerGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = centerGlow;
      ctx.fillRect(0, 0, width, height);

      // 2. Subtle luxury academic guilloche / grid lines
      ctx.strokeStyle = isHonor ? "rgba(217, 119, 6, 0.035)" : "rgba(2, 132, 199, 0.035)";
      ctx.lineWidth = 1;
      const gridSize = 45;
      for (let x = 46; x <= width - 46; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 46);
        ctx.lineTo(x, height - 46);
        ctx.stroke();
      }
      for (let y = 46; y <= height - 46; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(46, y);
        ctx.lineTo(width - 46, y);
        ctx.stroke();
      }

      // Subtle telemetry wave in background
      ctx.strokeStyle = isHonor ? "rgba(217, 119, 6, 0.07)" : "rgba(2, 132, 199, 0.07)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(60, 480);
      ctx.lineTo(320, 480);
      ctx.lineTo(360, 440);
      ctx.lineTo(400, 520);
      ctx.lineTo(440, 420);
      ctx.lineTo(480, 500);
      ctx.lineTo(520, 480);
      ctx.lineTo(width - 60, 480);
      ctx.stroke();

      // 3. Luxurious outer double border
      const primaryBorderColor = isHonor ? "#b45309" : "#0284c7";
      const secondaryBorderColor = isHonor ? "rgba(217, 119, 6, 0.28)" : "rgba(2, 132, 199, 0.28)";

      // Outer border
      ctx.strokeStyle = primaryBorderColor;
      ctx.lineWidth = 3.5;
      ctx.strokeRect(32, 32, width - 64, height - 64);

      // Inner border
      ctx.strokeStyle = secondaryBorderColor;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(46, 46, width - 92, height - 92);

      // Corner ornaments
      const cornerColor = isHonor ? "#d97706" : "#0284c7";
      const drawCorner = (cx: number, cy: number, rot: number) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rot);
        ctx.strokeStyle = cornerColor;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, 24);
        ctx.lineTo(0, 0);
        ctx.lineTo(24, 0);
        ctx.stroke();
        // Dot at corner
        ctx.fillStyle = cornerColor;
        ctx.beginPath();
        ctx.arc(6, 6, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      };
      drawCorner(46, 46, 0);
      drawCorner(width - 46, 46, Math.PI / 2);
      drawCorner(width - 46, height - 46, Math.PI);
      drawCorner(46, height - 46, (Math.PI * 3) / 2);

      // 4. Logo drawing with robust fallback chain
      try {
        const previewImg = cardRef.current?.querySelector("img") as HTMLImageElement | null;
        let loadedImg: HTMLImageElement | null = null;

        if (previewImg && previewImg.complete && previewImg.naturalWidth > 0) {
          loadedImg = previewImg;
        } else {
          const candidates = ["/Logo.png", "/logo.png", "/favicon.png", "/favicon-96x96.png"];
          for (const src of candidates) {
            try {
              const img = new Image();
              img.crossOrigin = "anonymous";
              await new Promise((res, rej) => {
                img.onload = () => res(img);
                img.onerror = rej;
                img.src = src;
              });
              if (img.naturalWidth > 0) {
                loadedImg = img;
                break;
              }
            } catch {
              // try next
            }
          }
        }

        if (loadedImg) {
          const logoSize = 96;
          ctx.drawImage(loadedImg, width / 2 - logoSize / 2, 86, logoSize, logoSize);
        } else {
          ctx.fillStyle = cornerColor;
          ctx.beginPath();
          ctx.arc(width / 2, 134, 42, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#ffffff";
          ctx.font = "900 28px 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif";
          ctx.textAlign = "center";
          ctx.fillText("ARIS", width / 2, 144);
        }
      } catch {
        ctx.fillStyle = cornerColor;
        ctx.beginPath();
        ctx.arc(width / 2, 134, 42, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#ffffff";
        ctx.font = "900 28px 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("ARIS", width / 2, 144);
      }

      // Wait for fonts to be ready
      if (typeof document !== "undefined" && document.fonts) {
        try {
          await document.fonts.ready;
        } catch {
          // continue
        }
      }

      // 5. System Header Text
      ctx.fillStyle = "#334155";
      ctx.font = "bold 20px 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("ARIS CLINICAL ACADEMIC SYSTEM", width / 2, 218);

      ctx.fillStyle = isHonor ? "#b45309" : "#0284c7";
      ctx.font = "bold 16px 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif";
      ctx.fillText(badgeTitle, width / 2, 246);

      // Decorative divider
      ctx.strokeStyle = isHonor ? "rgba(217, 119, 6, 0.35)" : "rgba(2, 132, 199, 0.35)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(width / 2 - 200, 274);
      ctx.lineTo(width / 2 + 200, 274);
      ctx.stroke();

      // Diamond ornament
      ctx.fillStyle = cornerColor;
      ctx.save();
      ctx.translate(width / 2, 274);
      ctx.rotate(Math.PI / 4);
      ctx.fillRect(-4, -4, 8, 8);
      ctx.restore();

      // 6. Certificate Title
      ctx.fillStyle = "#0f172a";
      ctx.font = "900 38px 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif";
      ctx.fillText(mainCardTitle, width / 2, 326);

      // Exam Pill badge (auto-adjusts font size and pill width to prevent overflow)
      const examTitleFormatted = `HỌC PHẦN: ${examTitle.toUpperCase()}`;
      let examFontSize = 16;
      ctx.font = `bold ${examFontSize}px 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif`;
      let examTextWidth = ctx.measureText(examTitleFormatted).width;
      while (examTextWidth > 760 && examFontSize > 12) {
        examFontSize -= 1;
        ctx.font = `bold ${examFontSize}px 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif`;
        examTextWidth = ctx.measureText(examTitleFormatted).width;
      }

      const pillPaddingX = 22;
      const pillW = Math.min(840, examTextWidth + pillPaddingX * 2);
      const pillH = 32;
      const pillX = (width - pillW) / 2;
      const pillY = 344;

      ctx.fillStyle = isHonor ? "#fef3c7" : "#f0f9ff";
      ctx.strokeStyle = isHonor ? "rgba(217, 119, 6, 0.3)" : "rgba(2, 132, 199, 0.3)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.roundRect(pillX, pillY, pillW, pillH, 16);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = isHonor ? "#92400e" : "#0369a1";
      ctx.textAlign = "center";
      ctx.fillText(examTitleFormatted, width / 2, pillY + 22);

      // 7. Student Name
      ctx.fillStyle = "#64748b";
      ctx.font = "700 15px 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif";
      ctx.fillText(studentHonorRole, width / 2, 418);

      let nameFontSize = 52;
      const studentNameUpper = studentName.toUpperCase();
      ctx.font = `900 ${nameFontSize}px 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif`;
      while (ctx.measureText(studentNameUpper).width > 840 && nameFontSize > 26) {
        nameFontSize -= 2;
        ctx.font = `900 ${nameFontSize}px 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif`;
      }
      ctx.fillStyle = isHonor ? "#78350f" : "#0f172a";
      ctx.fillText(studentNameUpper, width / 2, 472);

      // Subtle decorative underline below name
      ctx.strokeStyle = isHonor ? "rgba(217, 119, 6, 0.3)" : "rgba(2, 132, 199, 0.3)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(width / 2 - 120, 492);
      ctx.lineTo(width / 2 + 120, 492);
      ctx.stroke();

      // 8. Metric Cards (Clean, bright, elegant boxes with left accent bar)
      const boxW = 860;
      const boxH = 76;
      const boxX = (width - boxW) / 2;

      // Card 1: Discipline Metric
      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = isHonor ? "rgba(217, 119, 6, 0.35)" : "rgba(2, 132, 199, 0.3)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(boxX, 522, boxW, boxH, 16);
      ctx.fill();
      ctx.stroke();

      // Left accent strip
      ctx.fillStyle = isHonor ? "#d97706" : "#0284c7";
      ctx.beginPath();
      ctx.roundRect(boxX, 522, 6, boxH, [16, 0, 0, 16]);
      ctx.fill();

      ctx.fillStyle = isHonor ? "#b45309" : "#0284c7";
      ctx.font = "bold 20px 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("⚡ KỶ LUẬT HỌC TẬP:", boxX + 28, 569);

      let discFontSize = 22;
      ctx.font = `bold ${discFontSize}px 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif`;
      while (ctx.measureText(metricDiscipline).width > 480 && discFontSize > 14) {
        discFontSize -= 1;
        ctx.font = `bold ${discFontSize}px 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif`;
      }
      ctx.fillStyle = "#0f172a";
      ctx.textAlign = "right";
      ctx.fillText(metricDiscipline, boxX + boxW - 28, 569);

      // Card 2: Competence Metric
      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = isHonor ? "rgba(217, 119, 6, 0.35)" : "rgba(2, 132, 199, 0.3)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(boxX, 614, boxW, boxH, 16);
      ctx.fill();
      ctx.stroke();

      // Left accent strip
      ctx.fillStyle = isHonor ? "#b45309" : "#0369a1";
      ctx.beginPath();
      ctx.roundRect(boxX, 614, 6, boxH, [16, 0, 0, 16]);
      ctx.fill();

      ctx.fillStyle = isHonor ? "#b45309" : "#0284c7";
      ctx.font = "bold 20px 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("🩺 CHẨN ĐOÁN NĂNG LỰC:", boxX + 28, 661);

      let scoreFontSize = 22;
      ctx.font = `bold ${scoreFontSize}px 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif`;
      while (ctx.measureText(metricScore).width > 480 && scoreFontSize > 14) {
        scoreFontSize -= 1;
        ctx.font = `bold ${scoreFontSize}px 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif`;
      }
      ctx.fillStyle = "#0f172a";
      ctx.textAlign = "right";
      ctx.fillText(metricScore, boxX + boxW - 28, 661);

      // 9. Emotional Message (Dynamically wrapped, safe margins, never overflows)
      ctx.textAlign = "center";
      ctx.fillStyle = "#334155";
      ctx.font = "italic 20px 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif";

      const quoteLines = wrapCanvasText(ctx, quoteText, 820);
      const quoteStartY = 738;
      const quoteLineHeight = 32;
      quoteLines.forEach((line, idx) => {
        ctx.fillText(line, width / 2, quoteStartY + idx * quoteLineHeight);
      });

      // 10. Official Stamp & Seal Area
      const sealY = 938;
      const sealColor = isHonor ? "#d97706" : "#0284c7";
      const ribbonColor = isHonor ? "#b45309" : "#0369a1";

      // Ribbon details below seal
      ctx.fillStyle = ribbonColor;
      ctx.beginPath();
      ctx.moveTo(width / 2 - 40, sealY + 35);
      ctx.lineTo(width / 2 - 58, sealY + 115);
      ctx.lineTo(width / 2 - 32, sealY + 100);
      ctx.lineTo(width / 2 - 8, sealY + 120);
      ctx.lineTo(width / 2 - 14, sealY + 35);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(width / 2 + 40, sealY + 35);
      ctx.lineTo(width / 2 + 58, sealY + 115);
      ctx.lineTo(width / 2 + 32, sealY + 100);
      ctx.lineTo(width / 2 + 8, sealY + 120);
      ctx.lineTo(width / 2 + 14, sealY + 35);
      ctx.fill();

      // Outer seal circle
      ctx.fillStyle = sealColor;
      ctx.beginPath();
      ctx.arc(width / 2, sealY, 68, 0, Math.PI * 2);
      ctx.fill();

      // Inner white seal circle
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(width / 2, sealY, 60, 0, Math.PI * 2);
      ctx.fill();

      // Decorative dashed ring
      ctx.strokeStyle = isHonor ? "#d97706" : "#0284c7";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.arc(width / 2, sealY, 54, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = isHonor ? "#b45309" : "#0369a1";
      ctx.font = "bold 13px 'Plus Jakarta Sans', system-ui, sans-serif";
      ctx.fillText("ARIS CLINICAL", width / 2, sealY - 18);

      ctx.fillStyle = isHonor ? "#d97706" : "#0284c7";
      ctx.font = "900 22px 'Plus Jakarta Sans', system-ui, sans-serif";
      ctx.fillText(sealText, width / 2, sealY + 10);

      ctx.fillStyle = isHonor ? "#92400e" : "#0369a1";
      ctx.font = "bold 12px 'Plus Jakarta Sans', system-ui, sans-serif";
      ctx.fillText(sealSub, width / 2, sealY + 30);

      // Certification title below seal
      ctx.fillStyle = "#0f172a";
      ctx.font = "bold 19px 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif";
      ctx.fillText(sealTitle, width / 2, 1082);

      // Verification Code & Date
      ctx.fillStyle = "#64748b";
      ctx.font = "500 14px 'Plus Jakarta Sans', system-ui, sans-serif";
      const certCode = `#ARIS-MED-${Date.now().toString(36).toUpperCase()}`;
      ctx.fillText(`MÃ XÁC THỰC: ${certCode}  ·  NGÀY: ${dateStr}`, width / 2, 1115);

      // Footer branding
      ctx.fillStyle = "#94a3b8";
      ctx.font = "600 12px 'Plus Jakarta Sans', system-ui, sans-serif";
      ctx.fillText("HỆ THỐNG ĐÀO TẠO BÁC SĨ HỌC THUẬT ARIS · NEXTBAND.SITE", width / 2, 1145);

      // Download trigger
      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataUrl;
      const filePrefix = isHonor ? "Bao_Cao_Vinh_Danh_ARIS" : "Phieu_Ghi_Nhan_Hoc_Tap_ARIS";
      a.download = `${filePrefix}_${studentName.replace(/\s+/g, "_")}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      toast.success(isHonor ? "Đã tải thẻ vinh danh thành công!" : "Đã tải phiếu ghi nhận thành công!", {
        description: "Bạn có thể gửi ngay qua Zalo để chia sẻ cùng Ba Mẹ.",
      });
    } catch (err) {
      console.error(err);
      toast.error("Không thể tải ảnh. Vui lòng thử lại!");
    } finally {
      setIsDownloading(false);
    }
  }, [studentName, isHonor, badgeTitle, mainCardTitle, studentHonorRole, quoteText, sealTitle, sealText, sealSub, metricDiscipline, metricScore, examTitle, dateStr]);

  const handleCopyText = () => {
    const text = isHonor
      ? `Kính gửi Ba Mẹ, con vừa đạt cột mốc học tập vinh danh tại ARIS với kết quả: ${metricScore}, kỷ luật: ${metricDiscipline}. Cảm ơn Ba Mẹ đã luôn tin tưởng và đồng hành cùng con! ❤️`
      : `Kính gửi Ba Mẹ, hôm nay con đã hoàn thành bài tập [${examTitle}] tại ARIS với kết quả: ${metricScore}, kỷ luật: ${metricDiscipline}. Con đang nỗ lực từng ngày để tiến bộ hơn nữa! ❤️`;
    navigator.clipboard.writeText(text);
    setHasCopied(true);
    toast.success("Đã sao chép lời nhắn gửi Ba Mẹ!");
    setTimeout(() => setHasCopied(false), 3000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md sm:max-w-lg p-0 bg-slate-950 border-slate-800 text-white shadow-2xl rounded-3xl max-h-[90vh] flex flex-col overflow-hidden">
        <DialogHeader className="p-4 sm:p-5 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isHonor ? "bg-amber-400" : "bg-sky-400"} animate-ping`} />
              <DialogTitle className={`text-sm sm:text-base font-extrabold ${isHonor ? "text-amber-400" : "text-sky-400"} uppercase tracking-wider flex items-center gap-1.5`}>
                {isHonor ? <Award className="w-4 h-4 text-amber-400" /> : <FileCheck className="w-4 h-4 text-sky-400" />}
                {badgeTitle}
              </DialogTitle>
            </div>
            <Badge variant="outline" className="text-[10px] text-slate-300 border-slate-700 bg-slate-800/60">
              Chính Thức
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {isHonor
              ? "Xuất chứng nhận vinh danh cột mốc để ghi nhận nỗ lực xuất sắc của bạn."
              : "Phiếu ghi nhận kết quả và kỷ luật làm bài hôm nay để gửi thông tin cho phụ huynh."}
          </p>
        </DialogHeader>

        {/* Live Visual Card Preview - Bright, prestigious certificate styling */}
        <div className="p-4 sm:p-6 bg-slate-900/80 flex flex-col items-center flex-1 overflow-y-auto">
          <div
            ref={cardRef}
            className={`w-full max-w-sm rounded-2xl p-5 border-2 ${
              isHonor
                ? "border-amber-400/80 bg-gradient-to-b from-white via-amber-50/40 to-yellow-50/20 shadow-amber-500/10"
                : "border-sky-400/80 bg-gradient-to-b from-white via-sky-50/40 to-blue-50/20 shadow-sky-500/10"
            } shadow-2xl space-y-3.5 relative overflow-hidden text-slate-900`}
          >
            {/* Top Accent Line */}
            <div
              className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${
                isHonor ? "from-amber-400 via-yellow-300 to-amber-500" : "from-sky-400 via-blue-500 to-sky-400"
              }`}
            />

            {/* Header: Logo & Title */}
            <div className="text-center space-y-1.5 pt-1">
              <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-white border border-slate-200/80 shadow-sm mb-0.5">
                <SiteLogo
                  className="w-10 h-10 object-contain"
                  alt="ARIS Logo"
                  fallbackSrc="/Logo.png"
                />
              </div>
              <div className="text-[10px] font-extrabold tracking-widest text-slate-500 font-sans">
                ARIS CLINICAL ACADEMIC SYSTEM
              </div>
              <div
                className={`text-xs font-black uppercase tracking-wider ${
                  isHonor ? "text-amber-700" : "text-sky-700"
                }`}
              >
                {mainCardTitle}
              </div>
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-600 truncate max-w-[280px] mx-auto">
                Học phần: {examTitle}
              </div>
            </div>

            {/* Student Name */}
            <div className="text-center py-2 border-y border-slate-200/80">
              <span className="text-[10px] uppercase tracking-widest text-slate-500 block font-sans font-bold">
                {studentHonorRole}
              </span>
              <h3 className={`text-xl font-black uppercase tracking-tight ${isHonor ? "text-amber-950" : "text-slate-900"}`}>
                {studentName}
              </h3>
            </div>

            {/* Metrics: Clean, bright, elegant boxes */}
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-white border border-sky-200 shadow-sm flex items-center justify-between text-xs gap-2">
                <span className="text-sky-700 font-bold flex items-center gap-1.5 shrink-0">
                  ⚡ Kỷ luật học tập:
                </span>
                <span className="font-sans font-extrabold text-slate-900 text-right truncate tabular-nums">
                  {metricDiscipline}
                </span>
              </div>
              <div
                className={`p-3 rounded-xl bg-white border ${
                  isHonor ? "border-amber-200" : "border-sky-200"
                } shadow-sm flex items-center justify-between text-xs gap-2`}
              >
                <span
                  className={`${
                    isHonor ? "text-amber-700" : "text-sky-700"
                  } font-bold flex items-center gap-1.5 shrink-0`}
                >
                  🩺 Chẩn đoán năng lực:
                </span>
                <span className="font-sans font-extrabold text-slate-900 text-right truncate tabular-nums">
                  {metricScore}
                </span>
              </div>
            </div>

            {/* Emotional Quote */}
            <div className="text-center px-2 py-1">
              <p className="text-[11.5px] italic text-slate-600 leading-relaxed font-sans font-medium">
                {quoteText}
              </p>
            </div>

            {/* Stamp & Footer */}
            <div className="pt-2.5 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500 font-sans">
              <div className={`flex items-center gap-1 font-bold ${isHonor ? "text-amber-700" : "text-sky-700"}`}>
                <Shield className="w-3.5 h-3.5" />
                <span>{isHonor ? "ARIS HONOR VERIFIED" : "ARIS ACADEMIC VERIFIED"}</span>
              </div>
              <span>{dateStr}</span>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 sm:p-5 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-2.5 justify-between shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyText}
            className="w-full sm:w-auto h-9 text-xs border-slate-700 bg-slate-800/80 text-slate-200 hover:bg-slate-700 font-bold rounded-xl gap-1.5"
          >
            {hasCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Đã chép lời nhắn</span>
              </>
            ) : (
              <>
                <Heart className="w-3.5 h-3.5 text-rose-400" />
                <span>Chép lời nhắn Ba Mẹ</span>
              </>
            )}
          </Button>

          <Button
            size="sm"
            onClick={handleDownloadImage}
            disabled={isDownloading}
            className={`w-full sm:w-auto h-9 text-xs font-black rounded-xl gap-1.5 shadow-md cursor-pointer ${
              isHonor
                ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950"
                : "bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white"
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isDownloading ? "Đang xuất ảnh..." : "Tải ảnh gửi Ba Mẹ"}</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}


