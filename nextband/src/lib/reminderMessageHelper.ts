/**
 * Canonical Reminder Message Helper — NextBand LBOS
 *
 * Single Source of Truth (SSOT) for generating structured parent notification
 * and reminder messages across Student Workspaces, Teacher Workspaces, and Parent Hub.
 *
 * Separation of Concerns:
 * - Message Generation (Nội dung thông điệp chuẩn): Pure function, client & server safe.
 * - Channel Transport (Kênh gửi: Clipboard, Zalo, SMS, Webhook): Managed by caller.
 */

export interface ParentProgressMessageContext {
  parentName?: string | null;
  studentName: string;
  completedCount: number;
  totalAssigned: number;
  gradedCount: number;
  parentToken?: string | null;
  appBaseUrl?: string;
}


/**
 * Generates the canonical teacher-to-parent weekly homework and progress update message.
 */
export function generateParentProgressMessage(context: ParentProgressMessageContext): string {
  const parentGreeting = context.parentName ? `kính chào ${context.parentName}` : "xin chào Phụ huynh";
  const student = context.studentName || "em";
  const baseUrl = context.appBaseUrl || (typeof window !== "undefined" ? window.location.origin : "https://nextband.site");
  const reportUrl = context.parentToken ? `${baseUrl}/p/${context.parentToken}` : baseUrl;

  const hwRate = context.totalAssigned > 0
    ? Math.round((context.completedCount / context.totalAssigned) * 100)
    : 100;

  return [
    `Dạ ${parentGreeting},`,
    `Em là giáo viên phụ trách cháu ${student} tại NextBand.`,
    `Em gửi báo cáo tiến độ học tập và rèn luyện của con tuần này:`,
    `• Hoàn thành BTVN: ${context.completedCount}/${context.totalAssigned} bài (${hwRate}%)`,
    `• Đã chấm chi tiết: ${context.gradedCount} bài`,
    "",
    `Ba mẹ xem toàn bộ phân tích lỗi sai và tiến độ học tập trực tuyến của con tại đây nhé:`,
    `👉 ${reportUrl}`,
    "",
    `(Hệ thống tự động cập nhật không cần mật khẩu)`
  ].join("\n");
}
