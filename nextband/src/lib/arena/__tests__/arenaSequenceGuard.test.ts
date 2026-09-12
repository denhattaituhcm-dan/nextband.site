import { describe, it, expect } from 'vitest';
import { validateIncomingSequence, validateSubmissionTiming } from '../arenaSequenceGuard';

describe('ArenaSequenceGuard (Event Ordering & Clock skew)', () => {
  it('chấp nhận sequence tăng đơn điệu', () => {
    const state = { lastSequence: 5 };
    const res = validateIncomingSequence(state, 6);

    expect(res.isAccepted).toBe(true);
    expect(res.reason).toBe('VALID');
    expect(res.nextSequence).toBe(6);
  });

  it('thả rơi (Drop) event đến muộn (Out-of-order)', () => {
    const state = { lastSequence: 10 };
    const res = validateIncomingSequence(state, 8); // Event số 8 đến sau event số 10

    expect(res.isAccepted).toBe(false);
    expect(res.reason).toBe('STALE_OUT_OF_ORDER');
    expect(res.nextSequence).toBe(10); // Không bị giật lùi sequence
  });

  it('thả rơi (Drop) duplicate event có sequence trùng nhau', () => {
    const state = { lastSequence: 10 };
    const res = validateIncomingSequence(state, 10);

    expect(res.isAccepted).toBe(false);
    expect(res.reason).toBe('DUPLICATE_SEQUENCE');
    expect(res.nextSequence).toBe(10);
  });
});

describe('ArenaSubmissionTiming (Server Authority Timing)', () => {
  const deadlineAt = 10000;

  it('chấp nhận bài nộp trước deadline', () => {
    const res = validateSubmissionTiming(9500, deadlineAt);
    expect(res.isValid).toBe(true);
    expect(res.status).toBe('ACCEPTED');
  });

  it('chấp nhận bài nộp trong khoảng Grace Period 500ms bù trễ mạng', () => {
    const res = validateSubmissionTiming(10300, deadlineAt, 500);
    expect(res.isValid).toBe(true);
    expect(res.status).toBe('ACCEPTED');
  });

  it('từ chối bài nộp quá hạn Grace Period', () => {
    const res = validateSubmissionTiming(10600, deadlineAt, 500);
    expect(res.isValid).toBe(false);
    expect(res.status).toBe('LATE_REJECTED');
  });
});
