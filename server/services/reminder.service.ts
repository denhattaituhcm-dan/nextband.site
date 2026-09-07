/**
 * Communication & Reminder Service — NextBand LBOS
 *
 * Abstraction layer for communication channels and parent message dispatch.
 * Separates Message Generation (Pure Content SSOT) from Channel Transport (Zalo, Webhook, SMS).
 */

import {
  ParentProgressMessageContext,
  TaskReminderMessageContext,
  generateParentProgressMessage,
  generateTaskReminderMessage,
} from '../../nextband/src/lib/reminderMessageHelper.js';

export {
  ParentProgressMessageContext,
  TaskReminderMessageContext,
  generateParentProgressMessage,
  generateTaskReminderMessage,
};

export interface CommunicationChannelAdapter {
  name: string;
  generateReminderLink(context: TaskReminderMessageContext): string;
}

export class ZaloChannelAdapter implements CommunicationChannelAdapter {
  name = 'ZALO';

  generateReminderLink(context: TaskReminderMessageContext): string {
    const cleanPhone = (context.recipientPhone || '').replace(/\D/g, '');
    const message = generateTaskReminderMessage(context);
    const encoded = encodeURIComponent(message);
    return `https://zalo.me/${cleanPhone}?text=${encoded}`;
  }
}

export class CommunicationService {
  private defaultAdapter: CommunicationChannelAdapter;

  constructor(adapter?: CommunicationChannelAdapter) {
    this.defaultAdapter = adapter || new ZaloChannelAdapter();
  }

  getReminderLink(context: TaskReminderMessageContext): string {
    return this.defaultAdapter.generateReminderLink(context);
  }

  getProgressMessage(context: ParentProgressMessageContext): string {
    return generateParentProgressMessage(context);
  }
}
