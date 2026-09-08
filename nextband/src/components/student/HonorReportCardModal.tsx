import React, { useRef, useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Check, Sparkles, Shield, Heart, FileCheck, Award } from "lucide-react";
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
  const quoteLine1 = isHonor
    ? "“Mọi điểm nghẽn tư duy đều được phẫu thuật và chữa lành."
    : "“Mỗi bài tập hoàn thành là một bước tiến vững chắc trên hành trình làm chủ IELTS.";
  const quoteLine2 = isHonor
    ? "Nỗ lực bền bỉ hôm nay là sự đền đáp xứng đáng nhất"
    : "Nỗ lực rèn luyện hôm nay là lời khẳng định ý chí vươn lên,";
  const quoteLine3 = isHonor
    ? "cho niềm tin và sự đầu tư của Gia đình.”"
    : "đền đáp xứng đáng niềm tin và sự đồng hành của Gia đình.”";

  const sealTitle = isHonor ? "XÁC THỰC BỞI HỘI ĐỒNG BÁC SĨ HỌC THUẬT ARIS" : "CHỨNG THỰC BỞI HỆ THỐNG ĐÀO TẠO ARIS";
  const sealText = isHonor ? "★ 100% ★" : "✓ VERIFIED";
  const sealSub = isHonor ? "VERIFIED" : "OFFICIAL";

  // Generate crisp high-resolution PNG using native HTML5 Canvas
  const handleDownloadImage = useCallback(async () => {
    setIsDownloading(true);
    try {
      const width = 1080;
      const height = 1920;
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("Cannot get canvas context");
      }

      // 1. Background (Midnight obsidian with gradient)
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, "#080c16");
      bgGrad.addColorStop(0.5, "#0d1424");
      bgGrad.addColorStop(1, "#070b14");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Precision grid lines
      ctx.strokeStyle = "rgba(56, 189, 248, 0.04)";
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Telemetry wave in background
      ctx.strokeStyle = isHonor ? "rgba(234, 179, 8, 0.08)" : "rgba(56, 189, 248, 0.08)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(60, 580);
      ctx.lineTo(300, 580);
      ctx.lineTo(360, 520);
      ctx.lineTo(410, 640);
      ctx.lineTo(470, 480);
      ctx.lineTo(530, 610);
      ctx.lineTo(580, 580);
      ctx.lineTo(width - 60, 580);
      ctx.stroke();

      // 3. Luxurious outer double border
      const primaryBorderColor = isHonor ? "rgba(212, 175, 55, 0.4)" : "rgba(56, 189, 248, 0.35)";
      const secondaryBorderColor = isHonor ? "rgba(212, 175, 55, 0.15)" : "rgba(56, 189, 248, 0.12)";
      ctx.strokeStyle = primaryBorderColor;
      ctx.lineWidth = 4;
      ctx.strokeRect(40, 40, width - 80, height - 80);

      ctx.strokeStyle = secondaryBorderColor;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(55, 55, width - 110, height - 110);

      // Corner ornaments
      const cornerColor = isHonor ? "#eab308" : "#38bdf8";
      const drawCorner = (cx: number, cy: number, rot: number) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rot);
        ctx.strokeStyle = cornerColor;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(0, 30);
        ctx.lineTo(0, 0);
        ctx.lineTo(30, 0);
        ctx.stroke();
        ctx.restore();
      };
      drawCorner(40, 40, 0);
      drawCorner(width - 40, 40, Math.PI / 2);
      drawCorner(width - 40, height - 40, Math.PI);
      drawCorner(40, height - 40, (Math.PI * 3) / 2);

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
          const logoSize = 140;
          ctx.drawImage(loadedImg, width / 2 - logoSize / 2, 120, logoSize, logoSize);
        } else {
          ctx.fillStyle = cornerColor;
          ctx.beginPath();
          ctx.arc(width / 2, 190, 50, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#0a0f1d";
          ctx.font = "900 36px 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif";
          ctx.textAlign = "center";
          ctx.fillText("ARIS", width / 2, 202);
        }
      } catch {
        ctx.fillStyle = cornerColor;
        ctx.beginPath();
        ctx.arc(width / 2, 190, 50, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#0a0f1d";
        ctx.font = "900 36px 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("ARIS", width / 2, 202);
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
      ctx.fillStyle = "#e2e8f0";
      ctx.font = "bold 32px 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("ARIS CLINICAL ACADEMIC SYSTEM", width / 2, 310);

      ctx.fillStyle = "rgba(148, 163, 184, 0.8)";
      ctx.font = "500 22px 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif";
      ctx.fillText(badgeTitle, width / 2, 350);

      // Decorative divider
      ctx.strokeStyle = isHonor ? "rgba(212, 175, 55, 0.5)" : "rgba(56, 189, 248, 0.4)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(width / 2 - 250, 390);
      ctx.lineTo(width / 2 + 250, 390);
      ctx.stroke();

      // Diamond ornament
      ctx.fillStyle = cornerColor;
      ctx.fillRect(width / 2 - 5, 385, 10, 10);

      // 6. Certificate Title
      ctx.fillStyle = "#f8fafc";
      ctx.font = "900 50px 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif";
      ctx.fillText(mainCardTitle, width / 2, 470);

      ctx.fillStyle = "#38bdf8";
      ctx.font = "bold 22px 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif";
      ctx.fillText(`HỌC PHẦN: ${examTitle.toUpperCase()}`, width / 2, 520);

      // 7. Student Name
      ctx.fillStyle = "rgba(148, 163, 184, 0.7)";
      ctx.font = "600 20px 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif";
      ctx.fillText(studentHonorRole, width / 2, 600);

      ctx.fillStyle = isHonor ? "#fef08a" : "#ffffff";
      ctx.font = "900 72px 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif";
      ctx.fillText(studentName.toUpperCase(), width / 2, 680);

      // 8. Metric Cards (Clean, modern proportional typography - NO MONOSPACE)
      const boxW = 860;
      const boxH = 110;
      const boxX = (width - boxW) / 2;

      // Card 1: Discipline Metric
      ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
      ctx.strokeStyle = "rgba(56, 189, 248, 0.4)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(boxX, 740, boxW, boxH, 20);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#38bdf8";
      ctx.font = "bold 26px 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("⚡ KỶ LUẬT HỌC TẬP:", boxX + 40, 805);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 30px 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(metricDiscipline, boxX + boxW - 40, 805);

      // Card 2: Competence Metric
      ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
      ctx.strokeStyle = isHonor ? "rgba(234, 179, 8, 0.4)" : "rgba(56, 189, 248, 0.4)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(boxX, 880, boxW, boxH, 20);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = isHonor ? "#facc15" : "#38bdf8";
      ctx.font = "bold 26px 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("🩺 CHẨN ĐOÁN NĂNG LỰC:", boxX + 40, 945);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 30px 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(metricScore, boxX + boxW - 40, 945);

      // 9. Emotional Message
      ctx.textAlign = "center";
      ctx.fillStyle = "#f1f5f9";
      ctx.font = "italic 28px 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif";

      ctx.fillText(quoteLine1, width / 2, 1070);
      ctx.fillText(quoteLine2, width / 2, 1120);
      ctx.fillText(quoteLine3, width / 2, 1170);

      // 10. Official Stamp & Seal Area
      const sealY = 1360;
      ctx.fillStyle = isHonor ? "#eab308" : "#0284c7";
      ctx.beginPath();
      ctx.arc(width / 2, sealY, 90, 0, Math.PI * 2);
      ctx.fill();

      // Ribbon details below seal
      ctx.fillStyle = isHonor ? "#ca8a04" : "#0369a1";
      ctx.beginPath();
      ctx.moveTo(width / 2 - 60, sealY + 60);
      ctx.lineTo(width / 2 - 80, sealY + 180);
      ctx.lineTo(width / 2 - 40, sealY + 160);
      ctx.lineTo(width / 2 - 10, sealY + 190);
      ctx.lineTo(width / 2 - 20, sealY + 60);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(width / 2 + 60, sealY + 60);
      ctx.lineTo(width / 2 + 80, sealY + 180);
      ctx.lineTo(width / 2 + 40, sealY + 160);
      ctx.lineTo(width / 2 + 10, sealY + 190);
      ctx.lineTo(width / 2 + 20, sealY + 60);
      ctx.fill();

      // Inner seal circle
      ctx.fillStyle = "#0a0f1d";
      ctx.beginPath();
      ctx.arc(width / 2, sealY, 78, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = isHonor ? "#fef08a" : "#7dd3fc";
      ctx.font = "bold 20px 'Plus Jakarta Sans', system-ui, sans-serif";
      ctx.fillText("ARIS CLINICAL", width / 2, sealY - 20);
      ctx.font = "bold 32px 'Plus Jakarta Sans', system-ui, sans-serif";
      ctx.fillText(sealText, width / 2, sealY + 15);
      ctx.font = "bold 18px 'Plus Jakarta Sans', system-ui, sans-serif";
      ctx.fillText(sealSub, width / 2, sealY + 45);

      ctx.fillStyle = "#e2e8f0";
      ctx.font = "bold 24px 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif";
      ctx.fillText(sealTitle, width / 2, 1630);

      ctx.fillStyle = "rgba(148, 163, 184, 0.8)";
      ctx.font = "18px 'Plus Jakarta Sans', system-ui, sans-serif";
      const certCode = `#ARIS-MED-${Date.now().toString(36).toUpperCase()}`;
      ctx.fillText(`MÃ XÁC THỰC: ${certCode} · NGÀY: ${dateStr}`, width / 2, 1670);

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
  }, [studentName, isHonor, badgeTitle, mainCardTitle, studentHonorRole, quoteLine1, quoteLine2, quoteLine3, sealTitle, sealText, sealSub, metricDiscipline, metricScore, examTitle, dateStr]);

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
      <DialogContent className="max-w-md sm:max-w-lg p-0 bg-slate-950 border-amber-500/30 text-white shadow-2xl rounded-3xl max-h-[90vh] flex flex-col overflow-hidden">
        <DialogHeader className="p-4 sm:p-5 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isHonor ? "bg-amber-400" : "bg-sky-400"} animate-ping`} />
              <DialogTitle className={`text-sm sm:text-base font-extrabold ${isHonor ? "text-amber-400" : "text-sky-400"} uppercase tracking-wider flex items-center gap-1.5`}>
                {isHonor ? <Award className="w-4 h-4 text-amber-400" /> : <FileCheck className="w-4 h-4 text-sky-400" />}
                {badgeTitle}
              </DialogTitle>
            </div>
            <Badge variant="outline" className="text-[10px] text-slate-400 border-slate-700">
              Chính Thức
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {isHonor
              ? "Xuất chứng nhận vinh danh cột mốc để ghi nhận nỗ lực xuất sắc của bạn."
              : "Phiếu ghi nhận kết quả và kỷ luật làm bài hôm nay để gửi thông tin cho phụ huynh."}
          </p>
        </DialogHeader>

        {/* Live Visual Card Preview */}
        <div className="p-4 sm:p-6 bg-slate-950 flex flex-col items-center flex-1 overflow-y-auto">
          <div
            ref={cardRef}
            className={`w-full max-w-sm rounded-2xl p-5 border-2 ${isHonor ? "border-amber-500/40" : "border-sky-500/40"} bg-gradient-to-b from-[#0B132B] via-[#0D1B2A] to-[#080C16] shadow-xl space-y-4 relative overflow-hidden`}
          >
            {/* Top Accent Lines */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${isHonor ? "from-amber-400 via-sky-400 to-amber-400" : "from-sky-400 via-indigo-400 to-sky-400"}`} />

            {/* Header: Logo & Title */}
            <div className="text-center space-y-1.5">
              <div className="inline-flex items-center justify-center p-1.5 rounded-xl bg-white/10 border border-white/15 shadow-inner mb-0.5">
                <SiteLogo
                  className="w-9 h-9 object-contain"
                  alt="ARIS Logo"
                  fallbackSrc="/Logo.png"
                />
              </div>
              <div className="text-[10px] font-bold tracking-widest text-slate-300 font-sans">
                ARIS CLINICAL ACADEMIC SYSTEM
              </div>
              <div className={`text-xs font-black uppercase tracking-wide ${isHonor ? "text-amber-300" : "text-sky-300"}`}>
                {mainCardTitle}
              </div>
              <div className="text-[11px] font-semibold text-slate-400 truncate max-w-[280px] mx-auto">
                {examTitle}
              </div>
            </div>

            {/* Student Name */}
            <div className="text-center py-1.5 border-y border-slate-700/60">
              <span className="text-[9px] uppercase tracking-widest text-slate-400 block font-sans font-semibold">
                {studentHonorRole}
              </span>
              <h3 className={`text-xl font-black uppercase tracking-tight ${isHonor ? "text-amber-100" : "text-white"}`}>
                {studentName}
              </h3>
            </div>

            {/* Metrics: Clean, balanced tabular font - NO MONOSPACE */}
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-slate-900/90 border border-sky-500/30 flex items-center justify-between text-xs gap-2">
                <span className="text-sky-300 font-bold flex items-center gap-1.5 shrink-0">
                  ⚡ Kỷ luật học tập:
                </span>
                <span className="font-sans font-bold text-white text-right truncate tabular-nums tracking-normal">
                  {metricDiscipline}
                </span>
              </div>
              <div className={`p-3 rounded-xl bg-slate-900/90 border ${isHonor ? "border-amber-500/30" : "border-sky-500/30"} flex items-center justify-between text-xs gap-2`}>
                <span className={`${isHonor ? "text-amber-300" : "text-sky-300"} font-bold flex items-center gap-1.5 shrink-0`}>
                  🩺 Chẩn đoán năng lực:
                </span>
                <span className="font-sans font-bold text-white text-right truncate tabular-nums tracking-normal">
                  {metricScore}
                </span>
              </div>
            </div>

            {/* Emotional Quote */}
            <div className="text-center px-2 py-1">
              <p className="text-[11.5px] italic text-slate-200 leading-relaxed font-sans font-normal antialiased">
                {quoteLine1} {quoteLine2} {quoteLine3}
              </p>
            </div>

            {/* Stamp & Footer */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400 font-sans">
              <div className={`flex items-center gap-1 ${isHonor ? "text-amber-400" : "text-sky-400"}`}>
                <Shield className="w-3.5 h-3.5" />
                <span className="font-bold">{isHonor ? "ARIS HONOR VERIFIED" : "ARIS ACADEMIC VERIFIED"}</span>
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


