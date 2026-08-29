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
 * Pure Canvas 1200x630 Image Generator for Study Buddy Pass
 * Renders a pixel-perfect PNG without external DOM-capture libraries.
 */
export async function exportBuddyPassToPng(params: {
  studentName: string;
  className: string;
  referralCode: string;
  targetUrl: string;
}): Promise<void> {
  const width = 1200;
  const height = 630;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // 1. Background Surface (Warm White #FAF9F6)
  ctx.fillStyle = "#FAF9F6";
  ctx.fillRect(0, 0, width, height);

  // 2. Subtle Outer Border
  ctx.strokeStyle = "rgba(0, 0, 0, 0.08)";
  ctx.lineWidth = 2;
  ctx.strokeRect(30, 30, width - 60, height - 60);

  // 3. Header: Logo & Title
  ctx.fillStyle = "#171717";
  ctx.font = "900 28px sans-serif";
  ctx.fillText("ARIS IELTS", 70, 95);

  ctx.fillStyle = "#737373";
  ctx.font = "bold 18px monospace";
  ctx.textAlign = "right";
  ctx.fillText("STUDY BUDDY PASS", width - 70, 95);
  ctx.textAlign = "left";

  // Red accent line
  ctx.fillStyle = "#E11D48";
  ctx.fillRect(70, 115, width - 140, 4);

  // 4. Inviter Information
  ctx.fillStyle = "#737373";
  ctx.font = "bold 18px sans-serif";
  ctx.fillText("BẠN ĐƯỢC MỜI BỞI", 70, 185);

  ctx.fillStyle = "#171717";
  ctx.font = "900 46px sans-serif";
  ctx.fillText(params.studentName.toUpperCase(), 70, 245);

  ctx.fillStyle = "#737373";
  ctx.font = "500 22px sans-serif";
  ctx.fillText(params.className, 70, 285);

  // 5. Privilege Box (Benefit Container)
  const boxX = 70;
  const boxY = 320;
  const boxW = 540;
  const boxH = 95;
  const boxR = 16;

  ctx.fillStyle = "rgba(0, 0, 0, 0.03)";
  ctx.beginPath();
  ctx.roundRect(boxX, boxY, boxW, boxH, boxR);
  ctx.fill();
  ctx.strokeStyle = "rgba(0, 0, 0, 0.08)";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = "#E11D48";
  ctx.font = "900 24px sans-serif";
  ctx.fillText("GIẢM 200.000Đ HỌC PHÍ", boxX + 24, boxY + 42);

  ctx.fillStyle = "#171717";
  ctx.font = "bold 20px sans-serif";
  ctx.fillText("+ ƯU TIÊN HỌC CÙNG LỚP", boxX + 24, boxY + 76);

  // 6. Tear Line (Dashed divider)
  ctx.beginPath();
  ctx.setLineDash([8, 8]);
  ctx.strokeStyle = "rgba(0, 0, 0, 0.15)";
  ctx.lineWidth = 2;
  ctx.moveTo(70, 465);
  ctx.lineTo(width - 70, 465);
  ctx.stroke();
  ctx.setLineDash([]);

  // 7. Footer: Referral Code
  ctx.fillStyle = "#737373";
  ctx.font = "bold 16px monospace";
  ctx.fillText("MÃ MỜI KÍCH HOẠT", 70, 515);

  // Code badge
  const codeBoxW = 300;
  const codeBoxH = 54;
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.beginPath();
  ctx.roundRect(70, 530, codeBoxW, codeBoxH, 10);
  ctx.fill();
  ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
  ctx.stroke();

  ctx.fillStyle = "#171717";
  ctx.font = "900 30px monospace";
  ctx.fillText(params.referralCode, 86, 568);

  // 8. Footer Right: URL & Instructions
  ctx.textAlign = "right";
  ctx.fillStyle = "#737373";
  ctx.font = "bold 18px monospace";
  ctx.fillText("KÍCH HOẠT TẠI", width - 70, 530);

  ctx.fillStyle = "#171717";
  ctx.font = "900 24px monospace";
  ctx.fillText("nextband.site/buddy", width - 70, 568);

  // Download Trigger
  const dataUrl = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.download = `ARIS_StudyBuddyPass_${params.referralCode}.png`;
  link.href = dataUrl;
  link.click();
}
