import React from "react";
import { PartRecorder } from "./PartRecorder";

interface SpeakingPanelProps {
  sessionId: string;
  title: string;
  part1Questions: string[];
  part2Topic: string;
  part2Cues: string[];
  onPart1Recorded: (storagePath: string) => void;
  onPart2Recorded: (storagePath: string) => void;
}

export function SpeakingPanel({
  sessionId,
  title: _title,
  part1Questions,
  part2Topic,
  part2Cues,
  onPart1Recorded,
  onPart2Recorded,
}: SpeakingPanelProps) {
  return (
    <div className="space-y-6">

      {/* ── Part 1 card ── */}
      <div className="p-5 sm:p-6 rounded-3xl bg-card border border-border space-y-3.5 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-brand-blue uppercase tracking-wide">
            Part 1 — Phỏng vấn ngắn
          </span>
          <span className="text-xs font-extrabold text-muted-foreground">1 – 2 phút</span>
        </div>

        <div className="space-y-2.5">
          {part1Questions.map((q, idx) => (
            <p key={idx} className="text-sm sm:text-base font-bold text-foreground leading-relaxed">
              {q}
            </p>
          ))}
        </div>

        <PartRecorder
          partLabel="Part 1"
          questionId="speaking_part1"
          sessionId={sessionId}
          maxDurationSeconds={120}
          onUploaded={onPart1Recorded}
        />
      </div>

      {/* ── Part 2 card ── */}
      <div className="p-5 sm:p-6 rounded-3xl bg-card border border-border space-y-3.5 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-brand-blue uppercase tracking-wide">
            Part 2 — Trình bày chủ đề
          </span>
          <span className="text-xs font-extrabold text-muted-foreground">1 – 2.5 phút</span>
        </div>

        <p className="text-sm sm:text-base font-bold text-foreground leading-relaxed">{part2Topic}</p>

        <div className="p-4 rounded-2xl bg-muted/50 border border-border/80 space-y-1.5 text-xs text-muted-foreground">
          <p className="font-bold text-foreground">You should say:</p>
          <ul className="list-disc pl-4 space-y-1">
            {part2Cues.map((cue, idx) => (
              <li key={idx}>{cue}</li>
            ))}
          </ul>
        </div>

        <PartRecorder
          partLabel="Part 2"
          questionId="speaking_part2"
          sessionId={sessionId}
          maxDurationSeconds={150}
          onUploaded={onPart2Recorded}
        />
      </div>
    </div>
  );
}
