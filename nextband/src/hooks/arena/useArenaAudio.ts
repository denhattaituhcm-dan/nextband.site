/**
 * USE ARENA AUDIO (CUSTOM HOOK)
 * Tuân thủ Hiến pháp Điều 13 (Hook điều phối UI & Sound)
 * Quản lý: Nhạc nền Lobby (gathering.mp3), Click sound, Đúng/Sai, Thăng hạng, Podium
 */

import { useRef, useState, useCallback, useEffect } from 'react';

export function useArenaAudio() {
  const [isBgmEnabled, setIsBgmEnabled] = useState(true);
  const bgmRef = useRef<HTMLAudioElement | null>(null);

  // Khởi tạo và phát BGM Lobby
  const playLobbyBgm = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (!bgmRef.current) {
      bgmRef.current = new Audio('/assets/Arena/gathering.mp3');
      bgmRef.current.loop = true;
      bgmRef.current.volume = 0.35;
    }
    if (isBgmEnabled) {
      bgmRef.current.play().catch(() => {
        // Trình duyệt chặn autoplay khi chưa có user interaction
      });
    }
  }, [isBgmEnabled]);

  // Dừng BGM
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

  // Phát sound effect ngắn
  const playSound = useCallback((soundPath: string, volume = 0.7) => {
    if (typeof window === 'undefined') return;
    try {
      const sound = new Audio(soundPath);
      sound.volume = volume;
      sound.play().catch(() => {});
    } catch {
      // Bỏ qua lỗi audio
    }
  }, []);

  const playClickSound = useCallback(() => {
    // Có thể rung nhẹ thiết bị học sinh (Haptic)
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(20);
      } catch {}
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
    };
  }, [stopLobbyBgm]);

  return {
    isBgmEnabled,
    playLobbyBgm,
    stopLobbyBgm,
    toggleBgm,
    playClickSound,
    playCorrectSound,
    playWrongSound,
    playClimberSound,
    playPodiumSound,
  };
}
