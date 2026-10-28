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

  // Phát tiếng đếm ngược 3, 2, 1 kịch tính (Ascending tones) và tiếng Bắt đầu (High chime)
  const playCountdownBeep = useCallback((count: number) => {
    if (!isBgmEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';

      if (count > 0) {
        // 3 -> 440Hz (A4), 2 -> 554Hz (C#5), 1 -> 659Hz (E5)
        const freqs: Record<number, number> = { 3: 440, 2: 554, 1: 659 };
        const freq = freqs[count] || 520;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.22);
      } else {
        // 0 / BẮT ĐẦU: High celebratory chime 880Hz (A5)
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.45);
      }
    } catch {
      // Ignore
    }
  }, [getAudioContext, isBgmEnabled]);

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

  // Âm thanh chốt nhanh khi 100% học sinh trong phòng hoàn thành nộp bài (Double high chime)
  const playFastLockSound = useCallback(() => {
    if (!isBgmEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const freqs = [1046.5, 1318.5];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.18, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.25);
      });
    } catch {}
  }, [getAudioContext, isBgmEnabled]);

  // Âm thanh chuỗi thắng thăng hoa (Streak Multiplier Fanfare)
  const playStreakSound = useCallback((streak: number) => {
    if (!isBgmEnabled || streak < 2) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      let notes = [392.00, 523.25];
      let stepTime = 0.09;
      let duration = 0.4;

      if (streak >= 5) {
        notes = [523.25, 659.25, 783.99, 1046.50];
        stepTime = 0.07;
        duration = 0.65;
      } else if (streak >= 3) {
        notes = [523.25, 659.25, 783.99];
        stepTime = 0.08;
        duration = 0.5;
      }

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = streak >= 5 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * stepTime);

        const vol = streak >= 5 ? 0.22 : 0.16;
        gain.gain.setValueAtTime(vol, now + idx * stepTime);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * stepTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * stepTime);
        osc.stop(now + idx * stepTime + duration);
      });
    } catch {}
  }, [getAudioContext, isBgmEnabled]);


  // Tiếng trống dồn dập kịch tính (Snare Drumroll + Suspense Heartbeat) trước khi công bố Quán quân
  const playDrumroll = useCallback((durationMs = 4000) => {
    if (!isBgmEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const totalSec = durationMs / 1000;

      // 1. Snare Drum Texture: Noise modulated by fast Tremolo LFO (26Hz -> 38Hz)
      const bufferSize = Math.floor(ctx.sampleRate * totalSec);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.7;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      // Dải tần lưới kim loại mặt dưới trống rè (Snare wire rattle: 1500Hz - 3200Hz)
      const snareFilter = ctx.createBiquadFilter();
      snareFilter.type = 'bandpass';
      snareFilter.frequency.setValueAtTime(1600, now);
      snareFilter.Q.setValueAtTime(2.2, now);

      // Tremolo VCA: Mô phỏng dùi trống gõ dồn liên thanh (t-t-t-t-t...) tăng tốc độ
      const tremoloGain = ctx.createGain();
      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(26, now);
      lfo.frequency.exponentialRampToValueAtTime(38, now + totalSec);

      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(0.45, now);

      lfo.connect(lfoGain);
      lfoGain.connect(tremoloGain.gain);
      lfo.start(now);
      lfo.stop(now + totalSec);

      // Master Crescendo: Âm lượng trống dồn tăng dần từ hồi hộp lên bùng nổ
      const rollGain = ctx.createGain();
      rollGain.gain.setValueAtTime(0.08, now);
      rollGain.gain.exponentialRampToValueAtTime(0.45, now + totalSec - 0.08);
      rollGain.gain.linearRampToValueAtTime(0.001, now + totalSec);

      noise.connect(snareFilter);
      snareFilter.connect(tremoloGain);
      tremoloGain.connect(rollGain);
      rollGain.connect(ctx.destination);

      noise.start(now);
      noise.stop(now + totalSec);

      // 2. Nhịp trống định âm / Nhịp tim kịch tính (Suspense Timpani Heartbeat Thuds)
      const thudOffsets = [0.15, 0.95, 1.75, 2.45, 3.05, 3.45, 3.75];
      thudOffsets.forEach((tOffset) => {
        if (tOffset < totalSec - 0.1) {
          const hitTime = now + tOffset;
          const osc = ctx.createOscillator();
          const g = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(115, hitTime);
          osc.frequency.exponentialRampToValueAtTime(45, hitTime + 0.19);

          const intensity = 0.14 + (tOffset / totalSec) * 0.22;
          g.gain.setValueAtTime(intensity, hitTime);
          g.gain.exponentialRampToValueAtTime(0.001, hitTime + 0.22);

          osc.connect(g);
          g.connect(ctx.destination);

          osc.start(hitTime);
          osc.stop(hitTime + 0.22);
        }
      });
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
    playCountdownBeep,
    toggleBgm,
    playClickSound,
    playCorrectSound,
    playWrongSound,
    playClimberSound,
    playPodiumSound,
    playDrumroll,
    playChampionFanfare,
    playFastLockSound,
    playStreakSound,
  };
}
