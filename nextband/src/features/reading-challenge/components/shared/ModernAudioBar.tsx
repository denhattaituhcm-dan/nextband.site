import React from 'react';
import { useReadingAudio } from '../../hooks/useReadingAudio';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  FastForward, 
  Headphones 
} from 'lucide-react';

interface ModernAudioBarProps {
  audioUrl: string;
  title?: string;
  badge?: string;
}

export const ModernAudioBar: React.FC<ModernAudioBarProps> = ({
  audioUrl,
  title = 'Audio Narration',
  badge = 'HQ Audio',
}) => {
  const {
    isPlaying,
    currentTime,
    duration,
    playbackRate,
    isMuted,
    togglePlay,
    seek,
    changeSpeed,
    toggleMute,
  } = useReadingAudio(audioUrl);

  const formatTime = (secs: number) => {
    if (!Number.isFinite(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const speedCycle = () => {
    if (playbackRate === 1.0) changeSpeed(1.25);
    else if (playbackRate === 1.25) changeSpeed(0.85);
    else changeSpeed(1.0);
  };

  const handleSliderSeek = (values: number[]) => {
    if (values[0] !== undefined) {
      seek(values[0]);
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-sky-50 to-indigo-50/60 dark:from-sky-950/30 dark:to-slate-900/40 border border-sky-200/60 dark:border-sky-800/40 rounded-2xl p-3 sm:p-4 shadow-sm mb-6 transition-all">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-sky-500/10 dark:bg-sky-500/20 flex items-center justify-center text-sky-600 dark:text-sky-400">
            <Headphones className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-semibold text-foreground tracking-tight">{title}</h4>
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-sky-200/70 text-sky-800 dark:bg-sky-900/60 dark:text-sky-300">
                {badge}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Native Speaker Accent (Compass Publishing)</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          {/* Speed Toggle */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={speedCycle}
            className="h-8 px-2 text-xs font-semibold rounded-lg hover:bg-sky-200/50 dark:hover:bg-sky-900/40 text-sky-700 dark:text-sky-300"
          >
            <FastForward className="w-3.5 h-3.5 mr-1" />
            {playbackRate}x
          </Button>

          {/* Mute Button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            className="h-8 w-8 rounded-lg hover:bg-sky-200/50 dark:hover:bg-sky-900/40 text-muted-foreground"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Play Controls & Seek Bar */}
      <div className="flex items-center gap-3">
        <Button
          type="button"
          onClick={togglePlay}
          size="icon"
          className="h-10 w-10 shrink-0 rounded-full bg-sky-600 hover:bg-sky-500 text-white shadow-md transition-transform active:scale-95"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => seek(Math.max(0, currentTime - 5))}
          title="Rewind 5s"
          className="h-8 w-8 text-muted-foreground hover:text-foreground hidden sm:inline-flex"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </Button>

        <div className="flex-1 flex items-center gap-2">
          <span className="text-xs font-mono text-muted-foreground min-w-[36px] text-right">
            {formatTime(currentTime)}
          </span>

          <Slider
            value={[currentTime]}
            max={duration > 0 ? duration : 100}
            step={0.5}
            onValueChange={handleSliderSeek}
            className="cursor-pointer"
          />

          <span className="text-xs font-mono text-muted-foreground min-w-[36px]">
            {formatTime(duration)}
          </span>
        </div>
      </div>
    </div>
  );
};
