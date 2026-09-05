/**
 * Communication Service — NextBand LBOS
 *
 * Abstraction layer for communication channels.
 * Prevents the Risk Engine / Intervention workflow from coupling tightly to Zalo.
 * Currently uses ZaloAdapter as the default implementation.
 */

export interface CommunicationChannelAdapter {
  name: string;
  generateReminderLink(context: {
    recipientPhone: string;
    studentName: string;
    riskReason?: string | null;
    openTaskCount: number;
    parentToken?: string | null;
  }): string;
}

export class ZaloChannelAdapter implements CommunicationChannelAdapter {
  name = 'ZALO';

  generateReminderLink(context: {
    recipientPhone: string;
    studentName: string;
    riskReason?: string | null;
    openTaskCount: number;
    parentToken?: string | null;
  }): string {
    const cleanPhone = context.recipientPhone.replace(/\D/g, '');
    const parentHubUrl = context.parentToken
      ? `${process.env.APP_BASE_URL || 'https://nextband.site'}/p/${context.parentToken}`
      : '';

    const message = `Dạ NextBand xin chào Phụ huynh em ${context.studentName},\n` +
      `Thầy cô gửi thông tin theo dõi tiến độ tuần này của con. Hiện tại con còn ${context.openTaskCount} bài tập cần hoàn thành để bảo toàn mục tiêu học bổng và lộ trình học.\n` +
      (parentHubUrl ? `👉 Ba Mẹ xem chi tiết báo cáo và động viên con tại: ${parentHubUrl}\n` : '') +
      `Cần hỗ trợ thêm, Ba Mẹ nhắn lại giúp thầy cô nhé!`;

    const encoded = encodeURIComponent(message);
    return `https://zalo.me/${cleanPhone}?text=${encoded}`;
  }
}

export class CommunicationService {
  private defaultAdapter: CommunicationChannelAdapter;

  constructor(adapter?: CommunicationChannelAdapter) {
    this.defaultAdapter = adapter || new ZaloChannelAdapter();
  }

  getReminderLink(context: {
    recipientPhone: string;
    studentName: string;
    riskReason?: string | null;
    openTaskCount: number;
    parentToken?: string | null;
  }): string {
    return this.defaultAdapter.generateReminderLink(context);
  }
}
