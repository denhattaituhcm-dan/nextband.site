import React, { useRef, useState, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { formatStorageUrl } from "@/lib/api";
import { cn } from "@/lib/utils";

interface AcademicAudioPlayerProps {
  audioUrl: string;
  className?: string;
}

export function AcademicAudioPlayer({ audioUrl, className }: AcademicAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const maxTimeRef = useRef(0);

  // Auto detect duration
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
    }
  };

  // Prevent seeking forward beyond listened threshold
  const handleSeeking = useCallback(() => {
    if (!audioRef.current) return;
    if (audioRef.current.currentTime > maxTimeRef.current + 1) {
      audioRef.current.currentTime = maxTimeRef.current;
      setCurrentTime(maxTimeRef.current);
    }
  }, []);

  const handleTimeUpdate = useCallback(() => {
    if (!audioRef.current) return;
    const cur = audioRef.current.currentTime;
    setCurrentTime(cur);
    if (cur > maxTimeRef.current) {
      maxTimeRef.current = cur;
    }
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    if (audioRef.current) {
      audioRef.current.volume = val;
      audioRef.current.muted = val === 0;
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.muted = false;
      audioRef.current.volume = volume || 0.8;
      setIsMuted(false);
    } else {
      audioRef.current.muted = true;
      setIsMuted(true);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className={cn(
        "p-4 sm:p-5 rounded-2xl bg-card border border-border shadow-xs space-y-3.5",
        className,
      )}
    >
      <audio
        ref={audioRef}
        src={formatStorageUrl(audioUrl)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onSeeking={handleSeeking}
        onEnded={() => setIsPlaying(false)}
        preload="auto"
      />

      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Play/Pause Button & Status */}
        <div className="flex items-center gap-3.5">
          <button
            type="button"
            onClick={togglePlay}
            className="w-11 h-11 rounded-2xl bg-brand-blue hover:bg-brand-blue-hover text-white flex items-center justify-center shadow-md transition-transform active:scale-95 cursor-pointer shrink-0"
            title={isPlaying ? "Tạm dừng" : "Phát audio"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-foreground">Audio Khảo Thí</span>
              {isPlaying && (
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  Đang phát
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Soundwave Animation & Timers */}
        <div className="flex-1 max-w-md flex flex-col justify-center gap-1.5">
          {/* Waveform Visualization Bars */}
          <div className="flex items-center justify-between gap-0.5 h-6 px-1">
            {[40, 65, 85, 30, 75, 100, 50, 80, 95, 45, 60, 90, 70, 85, 55, 100, 75, 60, 90, 40, 70, 85, 95, 60, 45, 80].map(
              (heightPercent, idx) => {
                const barPercent = (idx / 26) * 100;
                const isPassed = barPercent <= progressPercent;
                return (
                  <span
                    key={idx}
                    style={{ height: `${heightPercent}%` }}
                    className={cn(
                      "w-1 sm:w-1.5 rounded-full transition-all duration-150",
                      isPassed ? "bg-brand-blue" : "bg-muted-foreground/20",
                      isPlaying && isPassed && "opacity-90 animate-pulse",
                    )}
                  />
                );
              },
            )}
          </div>

          {/* Progress Bar Container */}
          <div className="relative w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 bottom-0 bg-brand-blue transition-all duration-100 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Timers */}
          <div className="flex items-center justify-between text-[11px] font-mono font-bold text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume Controls */}
        <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
          <button
            type="button"
            onClick={toggleMute}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
            title={isMuted ? "Bật tiếng" : "Tắt tiếng"}
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4 text-destructive" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-16 sm:w-20 h-1.5 accent-brand-blue bg-muted rounded-lg cursor-pointer"
            title="Âm lượng"
          />
        </div>
      </div>
    </div>
  );
}
