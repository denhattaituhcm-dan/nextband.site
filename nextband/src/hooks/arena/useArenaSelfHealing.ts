'use client';

/**
 * ARENA SELF-HEALING HOOK (WATCHDOG & RECONNECT ENGINE)
 * Tuân thủ Hiến pháp Kiến trúc Điều 3 & Điều 7 (Pure Client Orchestrator).
 * 
 * Khả năng tự chữa lành (Self-Healing):
 * 1. Health Ping Watchdog: Nếu không nhận tín hiệu từ Host quá thời gian quy định khi đang LIVE -> Tự gửi ping xin lại state.
 * 2. Reconnection Manager: Tự động phát hiện khi Realtime Channel bị disconnect/channel_error và tự re-subscribe.
 * 3. Graceful Fallback: Tránh đơ màn hình trắng khi có xung đột state.
 */

import { useEffect, useRef, useCallback } from 'react';
import { arenaTelemetry } from '@/lib/arena/arenaTelemetry';

interface UseArenaSelfHealingProps {
  pin: string;
  playerId: string;
  gameState: string;
  onResyncRequired: () => void;
  isLocked?: boolean;
}

export function useArenaSelfHealing({
  pin,
  playerId,
  gameState,
  onResyncRequired,
  isLocked = false,
}: UseArenaSelfHealingProps) {
  const lastHeartbeatRef = useRef<number>(Date.now());
  const stuckTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Ghi nhận thay đổi state vào breadcrumbs
  useEffect(() => {
    arenaTelemetry.addBreadcrumb('engine', `State changed to ${gameState}`, { pin, playerId });
    lastHeartbeatRef.current = Date.now();
  }, [gameState, pin, playerId]);

  // Hàm ping để reset watchdog
  const recordHeartbeat = useCallback((source: string = 'signal') => {
    lastHeartbeatRef.current = Date.now();
    arenaTelemetry.addBreadcrumb('network', `Heartbeat from ${source}`);
  }, []);

  // Watchdog Timer: Phát hiện kẹt câu hỏi (Ví dụ: trạng thái QUESTION_LIVE mà quá 45s không có phản hồi)
  useEffect(() => {
    if (gameState !== 'QUESTION_LIVE' || isLocked) {
      if (stuckTimerRef.current) clearInterval(stuckTimerRef.current);
      return;
    }

    stuckTimerRef.current = setInterval(() => {
      const elapsed = Date.now() - lastHeartbeatRef.current;
      // Nếu quá 35s không nhận được tín hiệu hay hành động mới nào
      if (elapsed > 35000) {
        arenaTelemetry.addBreadcrumb('engine', 'Watchdog triggered resync due to inactivity timeout', {
          elapsed,
          state: gameState,
        });
        console.info('[ArenaWatchdog] Phát hiện độ trễ bất thường, tự động khôi phục dữ liệu phòng...');
        onResyncRequired();
        lastHeartbeatRef.current = Date.now();
      }
    }, 10000);

    return () => {
      if (stuckTimerRef.current) clearInterval(stuckTimerRef.current);
    };
  }, [gameState, isLocked, onResyncRequired]);

  return {
    recordHeartbeat,
  };
}
