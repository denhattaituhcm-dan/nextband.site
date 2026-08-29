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
 * Pure Canvas Ultra-High-Resolution (2400x1520 Retina 2X) Image Generator for Study Buddy Pass
 * Renders a razor-sharp PNG with true transparent rounded corners matching the live web view.
 */
export async function generateBuddyPassCanvas(params: {
  studentName: string;
  className: string;
  referralCode: string;
  targetUrl: string;
}): Promise<HTMLCanvasElement> {
  const scale = 2; // 2X Super-Sampling for Retina 4K sharpness
  const baseWidth = 1200;
  const baseHeight = 760;
  const width = baseWidth * scale;
  const height = baseHeight * scale;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context not available");

  // Enable high-quality image smoothing
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  // Generate Ultra-HD QR Code data URL (680px)
  const qrDataUrl = await QRCode.toDataURL(params.targetUrl, {
    width: 680,
    margin: 1,
    color: {
      dark: "#17243A",
      light: "#FFFFFF",
    },
    errorCorrectionLevel: "H",
  });

  const qrImage = await loadImage(qrDataUrl);

  // Scale context so we can use base coordinates (1200x760) with 2X subpixel rendering
  ctx.save();
  ctx.scale(scale, scale);

  const cardPad = 8;
  const cardW = baseWidth - cardPad * 2;
  const cardH = baseHeight - cardPad * 2;
  const cardRadius = 38;

  // 1. Clear full canvas to transparent (Bo góc trong suốt)
  ctx.clearRect(0, 0, baseWidth, baseHeight);

  // 2. Clip strictly to Rounded Card Area (Các góc bên ngoài hoàn toàn trong suốt)
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(cardPad, cardPad, cardW, cardH, cardRadius);
  ctx.clip();

  // 3. Background Surface inside the Card (Warm White #FCFDFE)
  ctx.fillStyle = "#FCFDFE";
  ctx.fillRect(cardPad, cardPad, cardW, cardH);

  // 4. Soft Sky Blue Wave Gradient on Bottom-Left Corner with Boosted Saturation
  const waveGrad = ctx.createLinearGradient(0, 260, 520, baseHeight);
  waveGrad.addColorStop(0, "rgba(125, 211, 252, 0.75)");
  waveGrad.addColorStop(0.6, "rgba(186, 230, 253, 0.45)");
  waveGrad.addColorStop(1, "rgba(224, 242, 254, 0.15)");
  ctx.fillStyle = waveGrad;
  ctx.beginPath();
  ctx.moveTo(cardPad, baseHeight);
  ctx.lineTo(cardPad, 430);
  ctx.bezierCurveTo(160, 380, 300, 530, 460, 450);
  ctx.bezierCurveTo(600, 370, 700, 550, 830, 490);
  ctx.lineTo(830, baseHeight);
  ctx.closePath();
  ctx.fill();

  // 5. Dot Matrix Pattern on Top-Right
  ctx.fillStyle = "rgba(22, 135, 167, 0.32)";
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      ctx.beginPath();
      ctx.arc(baseWidth - 180 + c * 14, 50 + r * 14, 2.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Restore clip for internal elements, keep card clip
  ctx.restore();

  // 6. Outer Rounded Card Border (Vẽ viền bo góc sắc nét)
  ctx.strokeStyle = "#CBD5E1";
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.roundRect(cardPad, cardPad, cardW, cardH, cardRadius);
  ctx.stroke();

  // 7. Header: Logo & Badge
  // Logo: ARIS (Navy #17243A) + IELTS (Red #D6284B)
  ctx.font = "900 36px 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif";
  ctx.fillStyle = "#17243A";
  ctx.fillText("ARIS", 68, 92);
  const arisWidth = ctx.measureText("ARIS").width;

  ctx.fillStyle = "#D6284B";
  ctx.fillText("IELTS", 68 + arisWidth + 12, 92);

  // Red accent line under ARIS
  ctx.fillStyle = "#D6284B";
  ctx.beginPath();
  ctx.roundRect(68, 106, 92, 6, 3);
  ctx.fill();

  // Header Right: STUDY BUDDY PASS Badge (#1687A7)
  ctx.fillStyle = "#1687A7";
  ctx.font = "800 20px monospace";
  ctx.textAlign = "right";
  ctx.fillText("STUDY BUDDY PASS  👥❤️", baseWidth - 68, 92);
  ctx.textAlign = "left";

  // 8. Left Column: Inviter Info
  // Icon Badge "BẠN ĐƯỢC MỜI BỞI"
  ctx.fillStyle = "#1687A7";
  ctx.font = "800 17px monospace";
  ctx.fillText("👤  BẠN ĐƯỢC MỜI BỞI", 68, 190);

  // Inviter Name
  ctx.fillStyle = "#17243A";
  const nameToDisplay = params.studentName.toUpperCase();
  if (nameToDisplay.length > 20) {
    ctx.font = "900 38px 'Plus Jakarta Sans', system-ui, sans-serif";
  } else {
    ctx.font = "900 48px 'Plus Jakarta Sans', system-ui, sans-serif";
  }
  ctx.fillText(nameToDisplay, 68, 252);

  // Class Name
  ctx.fillStyle = "#475569";
  ctx.font = "700 22px 'Plus Jakarta Sans', system-ui, sans-serif";
  ctx.fillText(params.className, 68, 296);

  // 9. Middle: 3D Heart Envelope Graphic
  const envX = 540;
  const envY = 220;

  // Envelope Body
  ctx.fillStyle = "#60A5FA";
  ctx.beginPath();
  ctx.roundRect(envX, envY, 86, 58, 10);
  ctx.fill();

  // Flap Lines
  ctx.strokeStyle = "#3B82F6";
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(envX, envY + 6);
  ctx.lineTo(envX + 43, envY + 34);
  ctx.lineTo(envX + 86, envY + 6);
  ctx.stroke();

  // Letter Paper
  ctx.fillStyle = "#FFFFFF";
  ctx.beginPath();
  ctx.roundRect(envX + 12, envY - 24, 62, 44, 6);
  ctx.fill();
  ctx.strokeStyle = "#CBD5E1";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Heart on Letter
  ctx.fillStyle = "#D6284B";
  ctx.font = "26px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("❤️", envX + 43, envY + 6);
  ctx.textAlign = "left";

  // Sparkles around Envelope
  ctx.font = "20px sans-serif";
  ctx.fillText("✨", envX - 20, envY - 14);
  ctx.fillText("✨", envX + 86, envY - 10);
  ctx.fillText("✨", envX - 12, envY + 56);

  // 10. Right Column: Benefits Box (High Contrast Gold/Amber #FCD34D)
  const boxX = 690;
  const boxY = 155;
  const boxW = 442;
  const boxH = 180;

  ctx.fillStyle = "#FFFBEB";
  ctx.beginPath();
  ctx.roundRect(boxX, boxY, boxW, boxH, 22);
  ctx.fill();
  ctx.strokeStyle = "#FCD34D";
  ctx.lineWidth = 3;
  ctx.stroke();

  // Benefit 1: Discount
  // Red Circle Tag Icon
  ctx.fillStyle = "#D6284B";
  ctx.beginPath();
  ctx.arc(boxX + 44, boxY + 48, 24, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 20px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("%", boxX + 44, boxY + 55);
  ctx.textAlign = "left";

  // Discount Text
  ctx.fillStyle = "#D6284B";
  ctx.font = "900 24px 'Plus Jakarta Sans', system-ui, sans-serif";
  ctx.fillText("GIẢM 200.000đ", boxX + 82, boxY + 44);
  ctx.fillStyle = "#334155";
  ctx.font = "700 16px 'Plus Jakarta Sans', system-ui, sans-serif";
  ctx.fillText("cho mỗi khóa học", boxX + 82, boxY + 70);

  // Benefit 2: Priority Grouping
  // Blue Circle Group Icon
  ctx.fillStyle = "#E0F2FE";
  ctx.beginPath();
  ctx.arc(boxX + 44, boxY + 126, 24, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#BAE6FD";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = "#1687A7";
  ctx.font = "20px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("👥", boxX + 44, boxY + 133);
  ctx.textAlign = "left";

  // Group Text
  ctx.fillStyle = "#17243A";
  ctx.font = "900 24px 'Plus Jakarta Sans', system-ui, sans-serif";
  ctx.fillText("ƯU TIÊN", boxX + 82, boxY + 122);
  ctx.fillStyle = "#334155";
  ctx.font = "700 16px 'Plus Jakarta Sans', system-ui, sans-serif";
  ctx.fillText("học cùng lớp", boxX + 82, boxY + 148);

  // 11. Tear-Off Line: Scissors + Dashed Line (#38BDF8)
  ctx.fillStyle = "#1687A7";
  ctx.font = "bold 26px sans-serif";
  ctx.fillText("✂", 64, 400);

  ctx.beginPath();
  ctx.setLineDash([14, 10]);
  ctx.strokeStyle = "#38BDF8";
  ctx.lineWidth = 3;
  ctx.moveTo(105, 394);
  ctx.lineTo(baseWidth - 68, 394);
  ctx.stroke();
  ctx.setLineDash([]);

  // 12. Footer Left: Referral Code & Message
  ctx.fillStyle = "#1687A7";
  ctx.font = "800 18px monospace";
  ctx.fillText("MÃ MỜI", 68, 450);

  // Code Box with Crisp Teal Border (#1687A7)
  const codeBoxW = 460;
  const codeBoxH = 70;
  ctx.fillStyle = "#FFFFFF";
  ctx.beginPath();
  ctx.roundRect(68, 468, codeBoxW, codeBoxH, 18);
  ctx.fill();
  ctx.strokeStyle = "#1687A7";
  ctx.lineWidth = 3;
  ctx.stroke();

  // Referral Code Monospace Text
  ctx.fillStyle = "#17243A";
  ctx.font = "900 32px monospace";
  ctx.letterSpacing = "4px";
  ctx.fillText(params.referralCode, 94, 515);
  ctx.letterSpacing = "0px";

  // Code Box Sparkle
  ctx.fillStyle = "#1687A7";
  ctx.font = "bold 18px monospace";
  ctx.fillText("\\ | /", 68 + codeBoxW - 48, 458);

  // Web Link & Social Message
  ctx.fillStyle = "#1687A7";
  ctx.font = "bold 18px monospace";
  ctx.fillText("🌐 Kích hoạt tại: nextband.site/buddy", 68, 576);

  ctx.fillStyle = "#334155";
  ctx.font = "700 16px 'Plus Jakarta Sans', system-ui, sans-serif";
  ctx.fillText("❤️ Chia sẻ thẻ này với bạn bè để cùng nhau chinh phục IELTS!", 68, 608);

  // 13. Footer Right: Dynamic QR Code Container
  const qrBoxSize = 180;
  const qrX = baseWidth - 68 - qrBoxSize;
  const qrY = 465;

  // Curved Arrow pointing to QR
  ctx.strokeStyle = "#1687A7";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(qrX - 25, qrY + 70, 22, Math.PI * 0.9, Math.PI * 1.6, false);
  ctx.stroke();
  // Arrow head
  ctx.fillStyle = "#1687A7";
  ctx.beginPath();
  ctx.moveTo(qrX - 10, qrY + 54);
  ctx.lineTo(qrX - 24, qrY + 48);
  ctx.lineTo(qrX - 18, qrY + 62);
  ctx.closePath();
  ctx.fill();

  // "SCAN TO JOIN" Label
  ctx.fillStyle = "#1687A7";
  ctx.font = "900 18px monospace";
  ctx.textAlign = "center";
  ctx.fillText("SCAN TO JOIN  \\ | /", qrX + qrBoxSize / 2, 442);
  ctx.textAlign = "left";

  // White Card behind QR with soft shadow
  ctx.fillStyle = "#FFFFFF";
  ctx.beginPath();
  ctx.roundRect(qrX, qrY, qrBoxSize, qrBoxSize, 22);
  ctx.fill();
  ctx.strokeStyle = "#CBD5E1";
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Draw QR Image onto Canvas
  ctx.drawImage(qrImage, qrX + 10, qrY + 10, qrBoxSize - 20, qrBoxSize - 20);

  ctx.restore(); // Restore scale

  return canvas;
}

/**
 * Downloads the Study Buddy Pass image as a PNG file.
 */
export async function exportBuddyPassToPng(params: {
  studentName: string;
  className: string;
  referralCode: string;
  targetUrl: string;
}): Promise<void> {
  const canvas = await generateBuddyPassCanvas(params);
  const dataUrl = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.download = `${params.referralCode || "ARIS-BUDDY"}.png`;
  link.href = dataUrl;
  link.click();
}

/**
 * Copies the Study Buddy Pass card directly to clipboard as an image (PNG Blob).
 * Allows users to paste directly (Ctrl+V) into Zalo, Messenger, etc.
 */
export async function copyBuddyPassImageToClipboard(params: {
  studentName: string;
  className: string;
  referralCode: string;
  targetUrl: string;
}): Promise<void> {
  const canvas = await generateBuddyPassCanvas(params);

  return new Promise((resolve, reject) => {
    canvas.toBlob(async (blob) => {
      if (!blob) {
        reject(new Error("Không thể tạo dữ liệu ảnh từ thẻ."));
        return;
      }
      try {
        if (navigator.clipboard && typeof ClipboardItem !== "undefined") {
          const item = new ClipboardItem({ "image/png": blob });
          await navigator.clipboard.write([item]);
          resolve();
        } else {
          throw new Error("Trình duyệt không hỗ trợ sao chép ảnh trực tiếp vào Clipboard.");
        }
      } catch (err) {
        reject(err);
      }
    }, "image/png");
  });
}

