const fs = require('fs');

const docContent = `# Hướng Dẫn Thiết Lập Google Apps Script Webhook (Gửi Gmail & Tự Động Ghi Google Sheet)

Tài liệu này hướng dẫn thiết lập hệ thống tự động:
1. Ghi thông tin học viên đăng ký vào **Google Sheets**.
2. Tự động gửi email thông báo tới **\`arisieltsdeeplearning@gmail.com\`** có kèm nút bấm gọi điện ngay.
3. Bảo mật Webhook bằng **Secret Token** chống spam / abuse.
4. **Không phụ thuộc vào máy chủ Render**.

---

## BƯỚC 1: Tạo File Google Sheets & Mở Trình Soạn Thảo Script

1. Truy cập [Google Sheets](https://sheets.new) và tạo một bảng tính mới, đặt tên: \`ARIS IELTS - Danh Sách Học Viên Đăng Ký\`.
2. Trên thanh menu, chọn: **Tiện ích mở rộng (Extensions)** -> **Apps Script**.
3. Xóa hết mã nguồn mặc định và dán toàn bộ đoạn mã bên dưới vào:

\`\`\`javascript
/**
 * ARIS IELTS - Google Apps Script Webhook Handler
 * Chức năng: Nhận Lead từ Vercel API -> Ghi Sheet -> Gửi Gmail
 */

// 1. CẤU HÌNH HỆ THỐNG
const CONFIG = {
  // Đặt mã bí mật (Secret token) trùng khớp với GOOGLE_APPS_SCRIPT_SECRET trên Vercel
  SECRET_TOKEN: "ARIS_LEAD_SECRET_2026_SECURE_TOKEN", 
  
  // Email nhận thông báo
  NOTIFICATION_EMAIL: "arisieltsdeeplearning@gmail.com",
  
  // Tên tiêu đề email
  EMAIL_SENDER_NAME: "ARIS IELTS Academy - Hệ Thống Tuyển Sinh",
};

/**
 * Xử lý HTTP POST Webhook
 */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return responseJSON({ success: false, error: "Empty request payload" }, 400);
    }

    const payload = JSON.parse(e.postData.contents);

    // 1. Kiểm tra Secret Token bảo mật
    const requestSecret = payload.secret || "";
    if (CONFIG.SECRET_TOKEN && requestSecret !== CONFIG.SECRET_TOKEN) {
      return responseJSON({ success: false, error: "Unauthorized: Invalid secret token" }, 401);
    }

    // 2. Trích xuất dữ liệu
    const leadType = payload.leadType || "CONTACT";
    const fullName = payload.fullName || "Học viên";
    const phone = payload.phone || "";
    const email = payload.email || "";
    const course = payload.course || "";
    const preferredSchedule = payload.preferredSchedule || "";
    const message = payload.message || "";
    const source = payload.source || "";
    const leadId = payload.leadId || "";
    
    const formattedDate = Utilities.formatDate(
      new Date(),
      "Asia/Ho_Chi_Minh",
      "dd/MM/yyyy HH:mm:ss"
    );

    // 3. Ghi vào Google Sheets
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    initSheetHeaderIfNeeded(sheet);

    let typeLabel = "Tư Vấn";
    if (leadType === "QUICK_TRIAL") typeLabel = "Học Thử 02 Buổi";
    if (leadType === "ASSESSMENT") typeLabel = "Khảo Thí 1:1";

    sheet.appendRow([
      formattedDate,
      typeLabel,
      fullName,
      phone,
      email,
      course,
      preferredSchedule,
      message,
      source,
      leadId,
      "Chưa liên hệ" // Cột trạng thái xử lý
    ]);

    // 4. Soạn thảo & Gửi Email qua Gmail
    sendNotificationEmail({
      leadType,
      typeLabel,
      fullName,
      phone,
      email,
      course,
      preferredSchedule,
      message,
      source,
      leadId,
      formattedDate,
    });

    return responseJSON({ success: true, message: "Lead saved and email dispatched" }, 200);
  } catch (error) {
    Logger.log("Error in doPost: " + error.toString());
    return responseJSON({ success: false, error: error.toString() }, 500);
  }
}

/**
 * Tự động tạo hàng tiêu đề nếu sheet còn trống
 */
function initSheetHeaderIfNeeded(sheet) {
  if (sheet.getLastRow() === 0) {
    const headers = [
      "Thời Gian",
      "Phân Loại",
      "Họ Và Tên",
      "Số Điện Thoại",
      "Email",
      "Khóa Học",
      "Ca Học Mong Muốn",
      "Mục Tiêu / Lời Nhắn",
      "Nguồn Trang",
      "Mã Lead",
      "Trạng Thái Xử Lý"
    ];
    sheet.appendRow(headers);
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#dc2626");
    headerRange.setFontColor("#ffffff");
    sheet.setFrozenRows(1);
  }
}

/**
 * Gửi email thông báo chuẩn HTML nhận diện ARIS
 */
function sendNotificationEmail(data) {
  const subject = "🔔 [" + data.typeLabel.toUpperCase() + "] Học viên " + data.fullName + " (" + data.phone + ") đăng ký mới";

  const emailRow = data.email ? '<tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Email:</td><td style="padding: 8px 0; color: #0f172a; font-weight: 500;"><a href="mailto:' + data.email + '" style="color: #2563eb; text-decoration: none;">' + data.email + '</a></td></tr>' : '';
  const courseRow = data.course ? '<tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Khóa học:</td><td style="padding: 8px 0; color: #0f172a; font-weight: 700;">' + data.course + '</td></tr>' : '';
  const scheduleRow = data.preferredSchedule ? '<tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Ca học mong muốn:</td><td style="padding: 8px 0; color: #0f172a; font-weight: 600;">' + data.preferredSchedule + '</td></tr>' : '';
  const messageBlock = data.message ? '<div style="margin-bottom: 24px;"><h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 700; color: #334155;">🎯 Chi tiết yêu cầu / Lời nhắn:</h4><div style="background-color: #fef2f2; border-left: 4px solid #dc2626; padding: 12px 16px; font-size: 14px; color: #1e293b; border-radius: 0 8px 8px 0; line-height: 1.6;">' + data.message.replace(/\\n/g, "<br/>") + '</div></div>' : '';

  const htmlBody = '<div style="font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; color: #0f172a;">' +
    '<div style="text-align: center; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 2px solid #f1f5f9;">' +
      '<div style="display: inline-block; padding: 6px 16px; background-color: #fee2e2; color: #dc2626; font-weight: 800; font-size: 12px; text-transform: uppercase; border-radius: 9999px; letter-spacing: 0.05em; margin-bottom: 8px;">' + data.typeLabel + ' Mới</div>' +
      '<h2 style="margin: 0; color: #0f172a; font-size: 22px; font-weight: 800;">HỌC VIỆN ARIS IELTS</h2>' +
      '<p style="margin: 4px 0 0 0; color: #64748b; font-size: 13px;">Thông báo tiếp nhận thông tin học viên tự động</p>' +
    '</div>' +
    '<div style="background-color: #f8fafc; border-radius: 12px; padding: 20px; margin-bottom: 24px; border: 1px solid #e2e8f0;">' +
      '<table style="width: 100%; border-collapse: collapse; font-size: 14px;">' +
        '<tr><td style="padding: 8px 0; color: #64748b; width: 140px; font-weight: 600;">Họ và tên:</td><td style="padding: 8px 0; color: #0f172a; font-weight: 700; font-size: 16px;">' + data.fullName + '</td></tr>' +
        '<tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Số điện thoại / Zalo:</td><td style="padding: 8px 0;"><a href="tel:' + data.phone + '" style="color: #dc2626; font-weight: 800; font-size: 17px; text-decoration: none;">' + data.phone + '</a> <span style="font-size: 12px; color: #64748b; margin-left: 8px;">(Bấm để gọi ngay)</span></td></tr>' +
        emailRow +
        courseRow +
        scheduleRow +
        '<tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Thời gian gửi:</td><td style="padding: 8px 0; color: #334155;">' + data.formattedDate + '</td></tr>' +
      '</table>' +
    '</div>' +
    messageBlock +
    '<div style="text-align: center; padding-top: 16px; border-top: 1px solid #f1f5f9; color: #94a3b8; font-size: 12px;">' +
      '<p style="margin: 0;">Mã Lead: <strong style="font-family: monospace;">' + data.leadId + '</strong></p>' +
      '<p style="margin: 4px 0 0 0;">Vui lòng liên hệ hỗ trợ học viên trong vòng 2–4 giờ làm việc để đạt tỷ lệ chuyển đổi cao nhất.</p>' +
    '</div>' +
  '</div>';

  MailApp.sendEmail({
    to: CONFIG.NOTIFICATION_EMAIL,
    name: CONFIG.EMAIL_SENDER_NAME,
    subject: subject,
    htmlBody: htmlBody,
  });
}

function responseJSON(data, status) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
\`\`\`

---

## BƯỚC 2: Triển Khai Web App (Deploy Web App)

1. Nhấn nút **Lưu** (biểu tượng đĩa mềm 💾) trên Apps Script.
2. Bấm vào nút màu xanh **Triển khai (Deploy)** ở góc trên bên phải -> chọn **Tùy chọn triển khai mới (New deployment)**.
3. Nhấp vào biểu tượng bánh răng ⚙️ bên cạnh "Chọn loại", chọn: **Ứng dụng web (Web app)**.
4. Điền các trường cấu hình:
   * **Mô tả:** \`ARIS Lead Webhook v1\`
   * **Thực thi dưới dạng (Execute as):** \`Tôi (Your Google Account)\`
   * **Ai có quyền truy cập (Who has access):** \`Bất kỳ ai (Anyone)\` *(Quan trọng: phải chọn Anyone để Vercel API có thể gửi request)*.
5. Nhấn **Triển khai (Deploy)**.
6. Cấp quyền truy cập (Authorize Access) theo hướng dẫn của Google khi được yêu cầu.
7. Copy **URL ứng dụng web (Web App URL)** (có dạng \`https://script.google.com/macros/s/AKfycb.../exec\`).

---

## BƯỚC 3: Cấu Hình Biến Môi Trường Trên Vercel

Vào trang quản trị Vercel -> Project của bạn -> **Settings** -> **Environment Variables**, thêm 2 biến sau:

1. **\`GOOGLE_APPS_SCRIPT_WEBHOOK_URL\`**: Dán đường link Web App URL vừa copy ở Bước 2.
2. **\`GOOGLE_APPS_SCRIPT_SECRET\`**: \`ARIS_LEAD_SECRET_2026_SECURE_TOKEN\` (phải trùng với mã đã đặt trong script).

Nhấn **Redeploy** trên Vercel để áp dụng.
`;

fs.writeFileSync('docs/GOOGLE_APPS_SCRIPT_SETUP.md', docContent, 'utf8');
console.log('Successfully written docs/GOOGLE_APPS_SCRIPT_SETUP.md');