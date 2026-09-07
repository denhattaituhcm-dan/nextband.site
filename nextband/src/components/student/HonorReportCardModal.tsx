import React, { useRef, useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Check, Sparkles, Shield, Heart } from "lucide-react";
import { toast } from "sonner";

interface HonorReportCardModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
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
  metricDiscipline = "100% Hoàn thành đúng hạn",
  metricScore = "Đạt chuẩn học thuật",
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

      // 2. Telemetry precision grid lines (Clinical Academic Doctor aesthetic)
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

      // ECG Pulse telemetry wave in background
      ctx.strokeStyle = "rgba(234, 179, 8, 0.08)";
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
      ctx.strokeStyle = "rgba(212, 175, 55, 0.4)";
      ctx.lineWidth = 4;
      ctx.strokeRect(40, 40, width - 80, height - 80);

      ctx.strokeStyle = "rgba(212, 175, 55, 0.15)";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(55, 55, width - 110, height - 110);

      // Corner ornaments
      const drawCorner = (cx: number, cy: number, rot: number) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rot);
        ctx.strokeStyle = "#eab308";
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

      // 4. Logo drawing
      try {
        const logoImg = new Image();
        logoImg.crossOrigin = "anonymous";
        await new Promise((resolve, reject) => {
          logoImg.onload = resolve;
          logoImg.onerror = reject;
          logoImg.src = "/Logo.png";
        });
        const logoSize = 140;
        ctx.drawImage(logoImg, width / 2 - logoSize / 2, 120, logoSize, logoSize);
      } catch {
        ctx.fillStyle = "#eab308";
        ctx.beginPath();
        ctx.arc(width / 2, 190, 50, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#0a0f1d";
        ctx.font = "bold 50px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("A", width / 2, 208);
      }

      // 5. System Header Text
      ctx.fillStyle = "#e2e8f0";
      ctx.font = "bold 32px serif, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("ARIS CLINICAL ACADEMIC SYSTEM", width / 2, 310);

      ctx.fillStyle = "rgba(148, 163, 184, 0.8)";
      ctx.font = "500 22px sans-serif";
      ctx.fillText("HỆ THỐNG PHẪU THUẬT NĂNG LỰC & CHẨN ĐOÁN HỌC THUẬT", width / 2, 350);

      // Decorative divider
      ctx.strokeStyle = "rgba(212, 175, 55, 0.5)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(width / 2 - 250, 390);
      ctx.lineTo(width / 2 + 250, 390);
      ctx.stroke();

      // Diamond ornament
      ctx.fillStyle = "#eab308";
      ctx.fillRect(width / 2 - 5, 385, 10, 10);

      // 6. Certificate Title
      ctx.fillStyle = "#f8fafc";
      ctx.font = "900 52px serif, sans-serif";
      ctx.fillText("BÁO CÁO PHẪU THUẬT NĂNG LỰC", width / 2, 470);

      ctx.fillStyle = "#38bdf8";
      ctx.font = "bold 22px monospace";
      ctx.fillText(`HỌC PHẦN: ${examTitle.toUpperCase()}`, width / 2, 520);

      // 7. Student Name (Hero focus)
      ctx.fillStyle = "rgba(148, 163, 184, 0.7)";
      ctx.font = "600 20px sans-serif";
      ctx.fillText("HỌC VIÊN VINH DANH", width / 2, 600);

      ctx.fillStyle = "#fef08a";
      ctx.font = "900 76px serif, sans-serif";
      ctx.fillText(studentName.toUpperCase(), width / 2, 680);

      // 8. Metric Cards (2 Sleek clinical badges)
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
      ctx.font = "bold 26px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("⚡ CHỈ SỐ SINH TỒN KỶ LUẬT:", boxX + 40, 805);

      ctx.fillStyle = "#ffffff";
      ctx.font = "900 32px monospace";
      ctx.textAlign = "right";
      ctx.fillText(metricDiscipline, boxX + boxW - 40, 805);

      // Card 2: Competence Metric
      ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
      ctx.strokeStyle = "rgba(234, 179, 8, 0.4)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(boxX, 880, boxW, boxH, 20);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#facc15";
      ctx.font = "bold 26px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("🩺 CHẨN ĐOÁN NĂNG LỰC:", boxX + 40, 945);

      ctx.fillStyle = "#ffffff";
      ctx.font = "900 32px monospace";
      ctx.textAlign = "right";
      ctx.fillText(metricScore, boxX + boxW - 40, 945);

      // 9. Emotional Message (Touching parents & honoring sacrifice)
      ctx.textAlign = "center";
      ctx.fillStyle = "#f1f5f9";
      ctx.font = "italic 32px Georgia, serif";

      const line1 = "“Mọi điểm nghẽn tư duy đều đã được phẫu thuật và chữa lành.";
      const line2 = "Nỗ lực bền bỉ hôm nay là sự đền đáp xứng đáng nhất";
      const line3 = "cho niềm tin và khoản đầu tư của Gia đình.”";

      ctx.fillText(line1, width / 2, 1070);
      ctx.fillText(line2, width / 2, 1120);
      ctx.fillText(line3, width / 2, 1170);

      // 10. Official Stamp & Seal Area
      const sealY = 1360;
      ctx.fillStyle = "#eab308";
      ctx.beginPath();
      ctx.arc(width / 2, sealY, 90, 0, Math.PI * 2);
      ctx.fill();

      // Ribbon details below seal
      ctx.fillStyle = "#ca8a04";
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

      ctx.fillStyle = "#fef08a";
      ctx.font = "bold 20px sans-serif";
      ctx.fillText("ARIS CLINICAL", width / 2, sealY - 20);
      ctx.font = "bold 36px serif";
      ctx.fillText("★ 100% ★", width / 2, sealY + 15);
      ctx.font = "bold 18px sans-serif";
      ctx.fillText("VERIFIED", width / 2, sealY + 45);

      // Verification code & authority footer
      ctx.fillStyle = "#e2e8f0";
      ctx.font = "bold 24px sans-serif";
      ctx.fillText("XÁC THỰC BỞI HỘI ĐỒNG BÁC SĨ HỌC THUẬT ARIS", width / 2, 1630);

      ctx.fillStyle = "rgba(148, 163, 184, 0.8)";
      ctx.font = "18px monospace";
      const certCode = `#ARIS-MED-${Date.now().toString(36).toUpperCase()}`;
      ctx.fillText(`MÃ CHỨNG THỰC LÂM SÀNG: ${certCode} · NGÀY: ${dateStr}`, width / 2, 1670);

      // Download trigger
      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `Bao_Cao_Hoc_Thuat_ARIS_${studentName.replace(/\s+/g, "_")}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      toast.success("Đã tải thẻ vinh danh thành công!", {
        description: "Bạn có thể gửi ngay qua Zalo để chia sẻ niềm tự hào cùng Ba Mẹ.",
      });
    } catch (err) {
      console.error(err);
      toast.error("Không thể tải ảnh. Vui lòng thử lại!");
    } finally {
      setIsDownloading(false);
    }
  }, [studentName, metricDiscipline, metricScore, examTitle, dateStr]);

  const handleCopyText = () => {
    const text = `Kính gửi Ba Mẹ, hôm nay con đã hoàn thành xuất sắc thử thách học tập tại ARIS với kết quả: ${metricScore}, kỷ luật: ${metricDiscipline}. Cảm ơn Ba Mẹ đã luôn tin tưởng và đồng hành cùng con! ❤️`;
    navigator.clipboard.writeText(text);
    setHasCopied(true);
    toast.success("Đã sao chép lời nhắn gửi Ba Mẹ!");
    setTimeout(() => setHasCopied(false), 3000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md sm:max-w-lg p-0 overflow-hidden bg-slate-950 border-amber-500/30 text-white shadow-2xl rounded-3xl">
        <DialogHeader className="p-4 sm:p-5 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              <DialogTitle className="text-sm sm:text-base font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Thẻ Báo Cáo Bác Sĩ Học Thuật
              </DialogTitle>
            </div>
            <Badge variant="outline" className="text-[10px] text-slate-400 border-slate-700">
              Chính Thức
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Chủ động xuất chứng nhận nỗ lực để chia sẻ niềm tự hào và tri ân những người bảo trợ bạn.
          </p>
        </DialogHeader>

        {/* Live Visual Card Preview */}
        <div className="p-4 sm:p-6 bg-slate-950 flex flex-col items-center">
          <div
            ref={cardRef}
            className="w-full max-w-sm rounded-2xl p-5 border-2 border-amber-500/40 bg-gradient-to-b from-[#0B132B] via-[#0D1B2A] to-[#080C16] shadow-xl space-y-4 relative overflow-hidden"
          >
            {/* Top Accent Lines */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-sky-400 to-amber-400" />

            {/* Header: Logo & Title */}
            <div className="text-center space-y-1">
              <div className="inline-flex items-center justify-center p-1 rounded-xl bg-white/5 border border-white/10 mb-1">
                <img
                  src="/Logo.png"
                  alt="ARIS Logo"
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>
              <div className="text-[10px] font-black tracking-widest text-slate-300 font-mono">
                ARIS CLINICAL ACADEMIC SYSTEM
              </div>
              <div className="text-xs font-serif font-black text-amber-300 uppercase tracking-wide">
                Báo Cáo Phẫu Thuật Năng Lực
              </div>
            </div>

            {/* Student Name */}
            <div className="text-center py-1 border-y border-amber-500/20">
              <span className="text-[9px] uppercase tracking-widest text-slate-400 block font-sans">
                Học Viên Vinh Danh
              </span>
              <h3 className="text-lg font-black text-amber-100 font-serif uppercase tracking-tight">
                {studentName}
              </h3>
            </div>

            {/* Metrics */}
            <div className="space-y-2">
              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-sky-500/30 flex items-center justify-between text-xs">
                <span className="text-sky-300 font-bold flex items-center gap-1">
                  ⚡ Kỷ luật sinh tồn:
                </span>
                <span className="font-mono font-black text-white">{metricDiscipline}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-amber-500/30 flex items-center justify-between text-xs">
                <span className="text-amber-300 font-bold flex items-center gap-1">
                  🩺 Chẩn đoán năng lực:
                </span>
                <span className="font-mono font-black text-white">{metricScore}</span>
              </div>
            </div>

            {/* Emotional Quote */}
            <div className="text-center px-1">
              <p className="text-[11px] italic font-serif text-slate-300 leading-relaxed">
                “Mọi điểm nghẽn tư duy đều được phẫu thuật và chữa lành. Nỗ lực hôm nay là lời khẳng định: Niềm tin và khoản đầu tư của Gia đình đang tạo ra kết quả.”
              </p>
            </div>

            {/* Stamp & Footer */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <div className="flex items-center gap-1 text-amber-400">
                <Shield className="w-3.5 h-3.5" />
                <span className="font-bold">ARIS VERIFIED</span>
              </div>
              <span>{dateStr}</span>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 sm:p-5 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-2.5 justify-between">
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
            className="w-full sm:w-auto h-9 text-xs bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black rounded-xl gap-1.5 shadow-md cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isDownloading ? "Đang xuất ảnh..." : "Tải ảnh khoe Ba Mẹ"}</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

