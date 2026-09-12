/**
 * ARENA SEQUENCE GUARD (PURE DOMAIN FUNCTION)
 * Tuân thủ Hiến pháp Điều 7 (Pure Function) và Nguyên tắc Kỹ thuật:
 * Chống Event Out-of-Order & Lọc Duplicate Submissions
 */

export interface SequenceGuardState {
  lastSequence: number;
}

export interface SequenceValidationResult {
  isAccepted: boolean;
  reason?: 'STALE_OUT_OF_ORDER' | 'DUPLICATE_SEQUENCE' | 'VALID';
  nextSequence: number;
}

/**
 * Kiểm tra tính hợp lệ của sequence khi nhận Realtime Event từ Server.
 * Nếu event.sequence <= lastSequence -> Thả rơi (Drop) ngay lập tức.
 */
export function validateIncomingSequence(
  currentState: SequenceGuardState,
  incomingSequence: number
): SequenceValidationResult {
  if (incomingSequence < currentState.lastSequence) {
    return {
      isAccepted: false,
      reason: 'STALE_OUT_OF_ORDER',
      nextSequence: currentState.lastSequence,
    };
  }

  if (incomingSequence === currentState.lastSequence) {
    return {
      isAccepted: false,
      reason: 'DUPLICATE_SEQUENCE',
      nextSequence: currentState.lastSequence,
    };
  }

  return {
    isAccepted: true,
    reason: 'VALID',
    nextSequence: incomingSequence,
  };
}

/**
 * Kiểm tra xem lượt nộp bài của học sinh có vượt quá deadline hay không
 * với Grace Period (ân hạn độ trễ mạng).
 */
export function validateSubmissionTiming(
  receivedAt: number,
  deadlineAt: number,
  gracePeriodMs: number = 500
): { isValid: boolean; status: 'ACCEPTED' | 'LATE_REJECTED' } {
  if (receivedAt > deadlineAt + gracePeriodMs) {
    return { isValid: false, status: 'LATE_REJECTED' };
  }
  return { isValid: true, status: 'ACCEPTED' };
}
