/**
 * USE ARENA AUDIO (CUSTOM HOOK)
 * Quản lý:
 * - Nhạc nền Lobby (gathering.mp3)
 * - NHẠC ĐẾM NGƯỢC HỒI HỘP KHI LIVE CÂU HỎI (Kèm âm thanh tích tắc dồn dập ở 5 giây cuối)
 * - Hiệu ứng âm thanh: Đúng/Sai, Thăng hạng, Podium, Mở rương, Cướp vàng
 * Sử dụng Web Audio API thuần túy tạo nhịp tim & tích tắc kịch tính không sợ thiếu file.
 */

import { useRef, useState, useCallback, useEffect } from 'react';

export function useArenaAudio() {
  const [isBgmEnabled, setIsBgmEnabled] = useState(true);
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const suspenseTimerRef = useRef<any>(null);

  // Lấy hoặc khởi tạo Web Audio Context
  const getAudioContext = useCallback(() => {
    if (typeof window === 'undefined') return null;
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {});
    }
    return audioCtxRef.current;
  }, []);

  // Phát tiếng tích tắc/nhịp tim hồi hộp kịch tính bằng Web Audio API
  const playSuspenseBeep = useCallback((isUrgent = false) => {
    if (!isBgmEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = isUrgent ? 'sawtooth' : 'sine';
      // Tần số cao hơn và dồn dập hơn khi cận giờ
      osc.frequency.setValueAtTime(isUrgent ? 880 : 440, ctx.currentTime);
      if (isUrgent) {
        osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.08);
      }

      gain.gain.setValueAtTime(isUrgent ? 0.25 : 0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (isUrgent ? 0.12 : 0.08));

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + (isUrgent ? 0.12 : 0.08));
    } catch {
      // Ignore
    }
  }, [getAudioContext, isBgmEnabled]);

  // Bắt đầu nhịp nhạc đếm lùi hồi hộp (Suspense Music loop)
  const startQuestionSuspense = useCallback((totalSeconds: number) => {
    if (suspenseTimerRef.current) clearInterval(suspenseTimerRef.current);
    
    let currentSec = totalSeconds;
    // Bắt đầu nhịp tim đếm ngược mỗi giây
    playSuspenseBeep(false);

    suspenseTimerRef.current = setInterval(() => {
      currentSec -= 1;
      if (currentSec <= 0) {
        clearInterval(suspenseTimerRef.current);
        return;
      }
      // Khi còn <= 5 giây: âm thanh dồn dập báo động khẩn cấp
      const isUrgent = currentSec <= 5;
      playSuspenseBeep(isUrgent);
    }, 1000);
  }, [playSuspenseBeep]);

  // Dừng nhạc đếm lùi
  const stopQuestionSuspense = useCallback(() => {
    if (suspenseTimerRef.current) {
      clearInterval(suspenseTimerRef.current);
      suspenseTimerRef.current = null;
    }
  }, []);

  // Khởi tạo và phát BGM Lobby
  const playLobbyBgm = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (!bgmRef.current) {
      bgmRef.current = new Audio('/assets/Arena/gathering.mp3');
      bgmRef.current.loop = true;
      bgmRef.current.volume = 0.35;
    }
    if (isBgmEnabled) {
      bgmRef.current.play().catch(() => {});
    }
  }, [isBgmEnabled]);

  // Dừng BGM Lobby
  const stopLobbyBgm = useCallback(() => {
    if (bgmRef.current) {
      bgmRef.current.pause();
      bgmRef.current.currentTime = 0;
    }
  }, []);

  // Bật / tắt BGM cho GV điều khiển
  const toggleBgm = useCallback(() => {
    setIsBgmEnabled((prev) => {
      const next = !prev;
      if (bgmRef.current) {
        if (next) {
          bgmRef.current.play().catch(() => {});
        } else {
          bgmRef.current.pause();
        }
      }
      return next;
    });
  }, []);

  const playSound = useCallback((soundPath: string, volume = 0.7) => {
    if (typeof window === 'undefined' || !isBgmEnabled) return;
    try {
      const sound = new Audio(soundPath);
      sound.volume = volume;
      sound.play().catch(() => {});
    } catch {}
  }, [isBgmEnabled]);

  const playClickSound = useCallback(() => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try { navigator.vibrate(20); } catch {}
    }
    playSound('/sound/Da_hieu.mp3', 0.5);
  }, [playSound]);

  const playCorrectSound = useCallback(() => {
    playSound('/sound/Dung.mp3', 0.8);
  }, [playSound]);

  const playWrongSound = useCallback(() => {
    playSound('/sound/Sai.mp3', 0.8);
  }, [playSound]);

  const playClimberSound = useCallback(() => {
    playSound('/images/levelup.mp3', 0.8);
  }, [playSound]);

  const playPodiumSound = useCallback(() => {
    playSound('/sound/thang_cap.mp3', 0.9);
  }, [playSound]);

  useEffect(() => {
    return () => {
      stopLobbyBgm();
      stopQuestionSuspense();
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [stopLobbyBgm, stopQuestionSuspense]);

  return {
    isBgmEnabled,
    playLobbyBgm,
    stopLobbyBgm,
    startQuestionSuspense,
    stopQuestionSuspense,
    toggleBgm,
    playClickSound,
    playCorrectSound,
    playWrongSound,
    playClimberSound,
    playPodiumSound,
  };
}
