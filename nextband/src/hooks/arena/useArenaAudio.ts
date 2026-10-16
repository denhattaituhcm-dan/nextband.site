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

  // Phát tiếng gõ nhịp nhẹ nhàng (warm woodblock tick) mô phỏng đồng hồ học tập
  const playSuspenseBeep = useCallback((isUrgent = false) => {
    if (!isBgmEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Sử dụng sóng hình sin thuần túy (sine) dịu tai, không dùng sawtooth gây chói
      osc.type = 'sine';
      
      if (isUrgent) {
        // 5 giây cuối: Tiếng gõ nhịp mộc kép nhẹ nhàng (520Hz -> 380Hz) thay vì tiếng còi báo động 1200Hz
        osc.frequency.setValueAtTime(520, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(380, ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.06);
      } else {
        // Nhịp bình thường: Tiếng tích tắc mộc ấm áp 330Hz (E4) rất êm dịu
        osc.frequency.setValueAtTime(330, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.04);
      }
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

  const playSound = useCallback((soundPath: string, volume = 0.5) => {
    if (typeof window === 'undefined' || !isBgmEnabled) return;
    try {
      const sound = new Audio(soundPath);
      sound.volume = volume;
      sound.play().catch(() => {});
    } catch {}
  }, [isBgmEnabled]);

  // Click trên máy học sinh: ưu tiên haptic vibration (rung kín đáo), không phát loa ngoài gây ồn phòng
  const playClickSound = useCallback((playSoundAudio = false) => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try { navigator.vibrate(15); } catch {}
    }
    // Mặc định không phát loa ngoài trên điện thoại học sinh để tránh dội âm 30 máy
    if (playSoundAudio) {
      playSound('/sound/Da_hieu.mp3', 0.2);
    }
  }, [playSound]);

  const playCorrectSound = useCallback(() => {
    playSound('/sound/Dung.mp3', 0.5);
  }, [playSound]);

  const playWrongSound = useCallback(() => {
    playSound('/sound/Sai.mp3', 0.4);
  }, [playSound]);

  const playClimberSound = useCallback(() => {
    playSound('/images/levelup.mp3', 0.5);
  }, [playSound]);

  const playPodiumSound = useCallback(() => {
    playSound('/sound/thang_cap.mp3', 0.6);
  }, [playSound]);

  // Tiếng trống dồn dập kịch tính (Drum Roll) trước khi công bố Quán quân
  const playDrumroll = useCallback((durationMs = 2000) => {
    if (!isBgmEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      // Buffer noise giả lập snare drum roll
      const bufferSize = ctx.sampleRate * (durationMs / 1000);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.5;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      // Bandpass filter tạo chất âm snare drum
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(240, ctx.currentTime);
      filter.Q.setValueAtTime(3.0, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.35, ctx.currentTime + durationMs / 1000 - 0.05);
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + durationMs / 1000);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
      noise.stop(ctx.currentTime + durationMs / 1000);
    } catch {}
  }, [getAudioContext, isBgmEnabled]);

  // Âm hưởng kèn đồng kịch tính (Fanfare Chords) khi Quán quân xuất hiện
  const playChampionFanfare = useCallback(() => {
    if (!isBgmEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      // Hợp âm chiến thắng rạng rỡ (C Major chord progression: C4 - E4 - G4 - C5)
      const notes = [261.63, 329.63, 392.00, 523.25];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);
        
        gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.12);
        osc.stop(ctx.currentTime + 1.8);
      });
    } catch {}
  }, [getAudioContext, isBgmEnabled]);

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
    playDrumroll,
    playChampionFanfare,
  };
}
