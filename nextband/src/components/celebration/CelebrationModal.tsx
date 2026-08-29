import React, { useEffect, useState } from "react";
import { Sparkles, Flame, Target, Trophy, Crown, ArrowRight, X } from "lucide-react";
import { DecisionMilestone } from "@/lib/milestoneEngine";
import { Button } from "@/components/ui/button";

interface CelebrationModalProps {
  milestone: DecisionMilestone;
  userId: string;
  onClose: () => void;
}

const iconMap = {
  sparkles: Sparkles,
  flame: Flame,
  target: Target,
  trophy: Trophy,
  crown: Crown,
};

/**
 * Lightweight Web Audio API Synthesizer (No external mp3 assets needed)
 */
function playSynthesizedChime(soundType: "chime_micro" | "chime_macro" | "chime_epic") {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    const notes =
      soundType === "chime_epic"
        ? [523.25, 659.25, 783.99, 1046.5, 1318.51] // C5, E5, G5, C6, E6
        : soundType === "chime_macro"
        ? [523.25, 659.25, 783.99, 1046.5] // C5, E5, G5, C6
        : [523.25, 783.99, 1046.5]; // C5, G5, C6

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);

      gain.gain.setValueAtTime(0.01, ctx.currentTime + idx * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + idx * 0.1 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.1 + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.1);
      osc.stop(ctx.currentTime + idx * 0.1 + 0.45);
    });
  } catch (e) {
    // Audio autostart may be blocked by browser policy
  }
}

export function CelebrationModal({ milestone, userId, onClose }: CelebrationModalProps) {
  const [isOpen, setIsOpen] = useState(true);
  const IconComponent = iconMap[milestone.badge.icon] || Sparkles;

  const handleDismiss = () => {
    setIsOpen(false);
    onClose();
  };

  useEffect(() => {
    playSynthesizedChime(milestone.soundType);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleDismiss();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-2xl transition-all animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Decorative Gradient Ribbon */}
        <div className={`h-3 w-full bg-gradient-to-r ${milestone.badge.accentColor}`} />

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Đóng thông báo"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Header Badge */}
          <div className="flex items-center gap-4">
            <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${milestone.badge.accentColor} text-white shadow-md shadow-indigo-100 shrink-0`}>
              <IconComponent className="w-7 h-7" />
            </div>
            <div>
              <div className="text-[11px] font-bold tracking-wider uppercase text-indigo-600 font-mono">
                {milestone.tier} MILESTONE CLEARED
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                {milestone.badge.title}
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {milestone.badge.subtitle}
              </p>
            </div>
          </div>

          {/* Huan Co Speech Box */}
          <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-5 space-y-3 relative overflow-hidden">
            <div className="flex items-center gap-3">
              <img
                src="/mascot/Huyenco.png"
                alt="Viện Trưởng Huyền Cơ"
                className="w-10 h-10 rounded-full border border-amber-300/60 bg-amber-50 shrink-0 object-cover"
                onError={(e: any) => {
                  e.target.style.display = "none";
                }}
              />
              <div>
                <div className="text-xs font-bold text-slate-900">
                  Viện Trưởng Huyền Cơ Lão Nhân
                </div>
                <div className="text-[11px] text-slate-500">
                  {milestone.copywriting.huanCoGreeting}
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic border-l-2 border-amber-500/80 pl-3 py-0.5">
              "{milestone.copywriting.huanCoSpeech}"
            </p>

            <div className="text-[11px] font-medium text-amber-900/90 font-mono pt-1">
              📜 {milestone.copywriting.proverb}
            </div>
          </div>

          {/* Progress Mini Bar */}
          <div className="space-y-2 bg-slate-50/60 rounded-xl p-3.5 border border-slate-100">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700">Tiến độ chinh phục khóa học</span>
              <span className="font-mono font-bold text-slate-900">
                {milestone.stats.completedLessons}/{milestone.stats.totalLessons} bài ({milestone.stats.progressPercentage}%)
              </span>
            </div>
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${milestone.badge.accentColor} transition-all duration-700 ease-out`}
                style={{ width: `${Math.min(100, milestone.stats.progressPercentage)}%` }}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              onClick={handleDismiss}
              className="w-full sm:w-auto px-6 font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-xs inline-flex items-center justify-center gap-2"
            >
              <span>Tiếp tục tu luyện</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
