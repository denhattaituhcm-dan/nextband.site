import QRCode from "qrcode";

/**
 * ARIS Study Buddy Pass Helper Utilities
 * Generates referral codes, copyable messages, and canvas export.
 */

export function generateReferralCode(fullName?: string, userId?: string): string {
  if (!fullName && !userId) return "ARIS-BUDDY";

  // Clean ASCII name
  const cleanName = (fullName || "HOCVIEN")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toUpperCase();

  const namePart = cleanName.slice(0, 5) || "ARIS";
  const idPart = (userId || "8888").replace(/[^a-zA-Z0-9]/g, "").slice(-4).toUpperCase();

  return `ARIS-${namePart}${idPart}`;
}

export function getBuddyShareText(studentName: string, referralCode: string, targetUrl: string): string {
  return `Ê, tao đang học lớp IELTS bên ARIS thấy giáo viên chữa bài bóc tách lỗi chi tiết lắm.\n\nTao gửi mày Thẻ Học Cùng Bạn (Mã: ${referralCode}), mày đăng ký được giảm 200.000đ học phí và được ưu tiên xếp vào học chung lớp với tao luôn:\n\n👉 ${targetUrl}`;
}

/**
 * Helper to load an image promise
 */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = src;
  });
}

/**
 * Pure Canvas High-Resolution (1200x760) Image Generator for Study Buddy Pass
 * Renders a pixel-perfect PNG matching the Zalo-inspired social card with Dynamic QR Code.
 */
export async function exportBuddyPassToPng(params: {
  studentName: string;
  className: string;
  referralCode: string;
  targetUrl: string;
}): Promise<void> {
  const width = 1200;
  const height = 760;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Generate QR Code data URL
  const qrDataUrl = await QRCode.toDataURL(params.targetUrl, {
    width: 320,
    margin: 1,
    color: {
      dark: "#0F172A",
      light: "#FFFFFF",
    },
    errorCorrectionLevel: "M",
  });

  const qrImage = await loadImage(qrDataUrl);

  // 1. Background Surface (Clean Warm White #FCFDFE)
  ctx.fillStyle = "#FCFDFE";
  ctx.fillRect(0, 0, width, height);

  // 2. Soft Outer Border & Shadow Simulation
  ctx.strokeStyle = "#E2E8F0";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(24, 24, width - 48, height - 48, 36);
  ctx.stroke();

  // 3. Soft Sky Blue Wave Gradient on Bottom-Left Corner
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(24, 24, width - 48, height - 48, 36);
  ctx.clip();

  const waveGrad = ctx.createLinearGradient(0, 300, 500, 760);
  waveGrad.addColorStop(0, "rgba(186, 230, 253, 0.45)");
  waveGrad.addColorStop(1, "rgba(224, 242, 254, 0.15)");
  ctx.fillStyle = waveGrad;
  ctx.beginPath();
  ctx.moveTo(24, 760);
  ctx.lineTo(24, 460);
  ctx.bezierCurveTo(150, 430, 280, 560, 440, 480);
  ctx.bezierCurveTo(580, 400, 680, 580, 780, 520);
  ctx.lineTo(780, 760);
  ctx.closePath();
  ctx.fill();

  // 4. Dot Matrix Pattern on Top-Right
  ctx.fillStyle = "rgba(2, 132, 199, 0.18)";
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      ctx.beginPath();
      ctx.arc(width - 180 + c * 14, 50 + r * 14, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();

  // 5. Header: Logo & Badge
  // Logo: ARIS (Black) + IELTS (Red)
  ctx.font = "900 36px 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif";
  ctx.fillStyle = "#0F172A";
  ctx.fillText("ARIS", 68, 92);
  const arisWidth = ctx.measureText("ARIS").width;

  ctx.fillStyle = "#E11D48";
  ctx.fillText("IELTS", 68 + arisWidth + 12, 92);

  // Red accent line under ARIS
  ctx.fillStyle = "#E11D48";
  ctx.beginPath();
  ctx.roundRect(68, 106, 92, 5, 3);
  ctx.fill();

  // Header Right: STUDY BUDDY PASS Badge
  ctx.fillStyle = "#0284C7";
  ctx.font = "800 20px monospace";
  ctx.textAlign = "right";
  ctx.fillText("STUDY BUDDY PASS  👥❤️", width - 68, 92);
  ctx.textAlign = "left";

  // 6. Left Column: Inviter Info
  // Icon Badge "BẠN ĐƯỢC MỜI BỞI"
  ctx.fillStyle = "#0284C7";
  ctx.font = "bold 17px monospace";
  ctx.fillText("👤  BẠN ĐƯỢC MỜI BỞI", 68, 190);

  // Inviter Name
  ctx.fillStyle = "#0F172A";
  const nameToDisplay = params.studentName.toUpperCase();
  if (nameToDisplay.length > 20) {
    ctx.font = "900 38px 'Plus Jakarta Sans', system-ui, sans-serif";
  } else {
    ctx.font = "900 48px 'Plus Jakarta Sans', system-ui, sans-serif";
  }
  ctx.fillText(nameToDisplay, 68, 252);

  // Class Name
  ctx.fillStyle = "#64748B";
  ctx.font = "600 22px 'Plus Jakarta Sans', system-ui, sans-serif";
  ctx.fillText(params.className, 68, 296);

  // 7. Middle: 3D Heart Envelope Graphic
  const envX = 540;
  const envY = 220;

  // Envelope Body
  ctx.fillStyle = "#93C5FD";
  ctx.beginPath();
  ctx.roundRect(envX, envY, 84, 56, 10);
  ctx.fill();

  // Flap Lines
  ctx.strokeStyle = "#60A5FA";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(envX, envY + 6);
  ctx.lineTo(envX + 42, envY + 32);
  ctx.lineTo(envX + 84, envY + 6);
  ctx.stroke();

  // Letter Paper
  ctx.fillStyle = "#FFFFFF";
  ctx.beginPath();
  ctx.roundRect(envX + 12, envY - 22, 60, 42, 6);
  ctx.fill();
  ctx.strokeStyle = "rgba(0,0,0,0.06)";
  ctx.lineWidth = 1;
  ctx.stroke();

  // Heart on Letter
  ctx.fillStyle = "#F43F5E";
  ctx.font = "24px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("❤️", envX + 42, envY + 6);
  ctx.textAlign = "left";

  // Sparkles around Envelope
  ctx.font = "18px sans-serif";
  ctx.fillText("✨", envX - 18, envY - 14);
  ctx.fillText("✨", envX + 84, envY - 10);
  ctx.fillText("✨", envX - 10, envY + 54);

  // 8. Right Column: Benefits Box
  const boxX = 690;
  const boxY = 160;
  const boxW = 442;
  const boxH = 175;

  ctx.fillStyle = "#FFFDF7";
  ctx.beginPath();
  ctx.roundRect(boxX, boxY, boxW, boxH, 22);
  ctx.fill();
  ctx.strokeStyle = "rgba(253, 230, 138, 0.9)";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Benefit 1: Discount
  // Red Circle Tag Icon
  ctx.fillStyle = "#EF4444";
  ctx.beginPath();
  ctx.arc(boxX + 42, boxY + 48, 22, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 18px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("%", boxX + 42, boxY + 54);
  ctx.textAlign = "left";

  // Discount Text
  ctx.fillStyle = "#DC2626";
  ctx.font = "900 24px 'Plus Jakarta Sans', system-ui, sans-serif";
  ctx.fillText("GIẢM 200.000đ", boxX + 78, boxY + 44);
  ctx.fillStyle = "#475569";
  ctx.font = "600 16px 'Plus Jakarta Sans', system-ui, sans-serif";
  ctx.fillText("cho mỗi khóa học", boxX + 78, boxY + 68);

  // Benefit 2: Priority Grouping
  // Blue Circle Group Icon
  ctx.fillStyle = "#E0F2FE";
  ctx.beginPath();
  ctx.arc(boxX + 42, boxY + 124, 22, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#0284C7";
  ctx.font = "18px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("👥", boxX + 42, boxY + 130);
  ctx.textAlign = "left";

  // Group Text
  ctx.fillStyle = "#0F172A";
  ctx.font = "900 24px 'Plus Jakarta Sans', system-ui, sans-serif";
  ctx.fillText("ƯU TIÊN", boxX + 78, boxY + 120);
  ctx.fillStyle = "#475569";
  ctx.font = "600 16px 'Plus Jakarta Sans', system-ui, sans-serif";
  ctx.fillText("học cùng lớp", boxX + 78, boxY + 144);

  // 9. Tear-Off Line: Scissors + Dashed Line
  ctx.fillStyle = "#0284C7";
  ctx.font = "bold 24px sans-serif";
  ctx.fillText("✂", 64, 400);

  ctx.beginPath();
  ctx.setLineDash([12, 10]);
  ctx.strokeStyle = "#7DD3FC";
  ctx.lineWidth = 2.5;
  ctx.moveTo(105, 394);
  ctx.lineTo(width - 68, 394);
  ctx.stroke();
  ctx.setLineDash([]);

  // 10. Footer Left: Referral Code & Message
  ctx.fillStyle = "#0284C7";
  ctx.font = "800 18px monospace";
  ctx.fillText("MÃ MỜI", 68, 452);

  // Code Box
  const codeBoxW = 460;
  const codeBoxH = 68;
  ctx.fillStyle = "#FFFFFF";
  ctx.beginPath();
  ctx.roundRect(68, 470, codeBoxW, codeBoxH, 18);
  ctx.fill();
  ctx.strokeStyle = "#38BDF8";
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Referral Code Monospace Text
  ctx.fillStyle = "#0F172A";
  ctx.font = "900 32px monospace";
  ctx.letterSpacing = "4px";
  ctx.fillText(params.referralCode, 94, 516);
  ctx.letterSpacing = "0px";

  // Code Box Sparkle
  ctx.fillStyle = "#38BDF8";
  ctx.font = "bold 16px monospace";
  ctx.fillText("\\ | /", 68 + codeBoxW - 46, 460);

  // Web Link & Social Message
  ctx.fillStyle = "#0284C7";
  ctx.font = "bold 17px monospace";
  ctx.fillText("🌐 Kích hoạt tại: nextband.site/buddy", 68, 576);

  ctx.fillStyle = "#475569";
  ctx.font = "600 16px 'Plus Jakarta Sans', system-ui, sans-serif";
  ctx.fillText("❤️ Chia sẻ thẻ này với bạn bè để cùng nhau chinh phục IELTS!", 68, 608);

  // 11. Footer Right: Dynamic QR Code Container
  const qrBoxSize = 175;
  const qrX = width - 68 - qrBoxSize;
  const qrY = 465;

  // "SCAN TO JOIN" Label
  ctx.fillStyle = "#0284C7";
  ctx.font = "900 18px monospace";
  ctx.textAlign = "center";
  ctx.fillText("SCAN TO JOIN  \\ | /", qrX + qrBoxSize / 2, 442);
  ctx.textAlign = "left";

  // White Card behind QR with soft shadow
  ctx.fillStyle = "#FFFFFF";
  ctx.beginPath();
  ctx.roundRect(qrX, qrY, qrBoxSize, qrBoxSize, 20);
  ctx.fill();
  ctx.strokeStyle = "#E2E8F0";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Draw QR Image onto Canvas
  ctx.drawImage(qrImage, qrX + 10, qrY + 10, qrBoxSize - 20, qrBoxSize - 20);

  // Download Trigger
  const dataUrl = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.download = `ARIS_StudyBuddyPass_${params.referralCode}.png`;
  link.href = dataUrl;
  link.click();
}

