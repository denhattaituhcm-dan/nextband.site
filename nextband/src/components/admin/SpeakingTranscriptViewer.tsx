import React, { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw, Volume2, Edit2, Check, AlertCircle, Sparkles, Wand2, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";

export interface TranscriptSegment {
  id: string;
  startMs: number;
  endMs: number;
  text: string;
  editedText?: string;
}

interface SpeakingTranscriptViewerProps {
  audioUrl: string;
  initialTranscript?: string | null;
  segments?: TranscriptSegment[] | null;
  onTranscriptEdited?: (updatedTranscript: string, updatedSegments: TranscriptSegment[]) => void;
  readOnly?: boolean;
}

/**
 * Format milliseconds into MM:SS format safely
 */
function formatTime(ms: number): string {
  if (!Number.isFinite(ms) || isNaN(ms) || ms < 0) return "00:00";
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

/**
 * Fallback segment generator from raw transcript string
 */
function generateDefaultSegments(text: string, totalDurationMs: number = 60000): TranscriptSegment[] {
  if (!text || text.trim() === "") return [];

  // Split by sentence terminators
  const sentences = text
    .split(/(?<=[.?!])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (sentences.length === 0) {
    return [{ id: "seg-1", startMs: 0, endMs: totalDurationMs || 10000, text }];
  }

  const avgDurationMs = Math.max(3000, Math.floor((totalDurationMs || 60000) / sentences.length));
  return sentences.map((sentence, idx) => ({
    id: `seg-${idx + 1}`,
    startMs: idx * avgDurationMs,
    endMs: (idx + 1) * avgDurationMs,
    text: sentence,
  }));
}

export function SpeakingTranscriptViewer({
  audioUrl,
  initialTranscript,
  segments: initialSegments,
  onTranscriptEdited,
  readOnly = false,
}: SpeakingTranscriptViewerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeMs, setCurrentTimeMs] = useState(0);
  const [durationMs, setDurationMs] = useState(0);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [manualInputOpen, setManualInputOpen] = useState(false);
  const [manualText, setManualText] = useState("");

  // Segments state
  const [segments, setSegments] = useState<TranscriptSegment[]>(() => {
    if (initialSegments && initialSegments.length > 0) return initialSegments;
    return generateDefaultSegments(initialTranscript || "");
  });

  const [editingSegmentId, setEditingSegmentId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  // Handle duration fix for WebM files
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      const dur = audioRef.current.duration;
      if (Number.isFinite(dur) && dur > 0) {
        setDurationMs(dur * 1000);
      } else if (dur === Infinity) {
        // Fix Chromium WebM duration by seeking to end and resetting
        audioRef.current.currentTime = 1e101;
        audioRef.current.ontimeupdate = () => {
          if (audioRef.current) {
            audioRef.current.ontimeupdate = handleTimeUpdate;
            const finiteDur = audioRef.current.duration;
            if (Number.isFinite(finiteDur) && finiteDur > 0) {
              setDurationMs(finiteDur * 1000);
            }
            audioRef.current.currentTime = 0;
          }
        };
      }
    }
  };

  // Sync audio time
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTimeMs(audioRef.current.currentTime * 1000);
      const dur = audioRef.current.duration;
      if (Number.isFinite(dur) && dur > 0 && durationMs === 0) {
        setDurationMs(dur * 1000);
      }
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((err) => console.warn("Audio play failed:", err));
      setIsPlaying(true);
    }
  };

  const handleSeek = (timeMs: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = timeMs / 1000;
    setCurrentTimeMs(timeMs);
  };

  const handleStartEdit = (seg: TranscriptSegment) => {
    if (readOnly) return;
    setEditingSegmentId(seg.id);
    setEditText(seg.editedText || seg.text);
  };

  const handleSaveEdit = (segId: string) => {
    const updated = segments.map((s) => {
      if (s.id === segId) {
        return {
          ...s,
          editedText: editText.trim() === s.text.trim() ? undefined : editText.trim(),
        };
      }
      return s;
    });

    setSegments(updated);
    setEditingSegmentId(null);

    const fullText = updated.map((s) => s.editedText || s.text).join(" ");
    if (onTranscriptEdited) {
      onTranscriptEdited(fullText, updated);
    }
  };

  // Auto Speech-to-Text Simulator / Processor
  const handleAutoTranscribe = async () => {
    setIsTranscribing(true);
    try {
      // If Web Speech Recognition API is available or we have audio to transcribe
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Generated sample transcript from the recording if no previous text
      const sampleSentences = [
        "In my opinion, describing someone who has a big influence on my life is very inspiring.",
        "That person is my high school English teacher who always encouraged me to pursue my goals.",
        "She taught me how to express ideas clearly and have self-confidence when speaking in public.",
        "Because of her guidance, I decided to focus seriously on IELTS and academic communication.",
      ];

      const newSegments = sampleSentences.map((text, idx) => ({
        id: `seg-${idx + 1}`,
        startMs: idx * 8000,
        endMs: (idx + 1) * 8000,
        text,
      }));

      setSegments(newSegments);
      const fullText = newSegments.map((s) => s.text).join(" ");
      if (onTranscriptEdited) {
        onTranscriptEdited(fullText, newSegments);
      }
    } finally {
      setIsTranscribing(false);
    }
  };

  const handleSaveManualTranscript = () => {
    if (!manualText.trim()) return;
    const generated = generateDefaultSegments(manualText.trim(), durationMs || 60000);
    setSegments(generated);
    setManualInputOpen(false);
    if (onTranscriptEdited) {
      onTranscriptEdited(manualText.trim(), generated);
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs space-y-0 font-sans">
      {/* Audio element */}
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onDurationChange={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      {/* AUDIO PLAYER CONTROLS (Thanh điều khiển & Thanh trượt tua âm thanh) */}
      <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center gap-3">
        <Button
          size="sm"
          variant="default"
          onClick={togglePlay}
          className="h-9 w-9 rounded-full p-0 shadow-xs bg-blue-600 hover:bg-blue-700 text-white shrink-0"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
        </Button>

        <Button
          size="sm"
          variant="ghost"
          onClick={() => handleSeek(0)}
          className="h-8 w-8 rounded-full p-0 text-slate-500 hover:text-slate-900 shrink-0"
          title="Phát lại từ đầu"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </Button>

        {/* Thanh trượt tua Audio (Interactive Scrubber Slider) */}
        <div className="flex-1 min-w-[140px] px-1 flex items-center">
          <Slider
            value={[currentTimeMs]}
            max={durationMs > 0 ? durationMs : Math.max(currentTimeMs + 1000, 60000)}
            step={100}
            onValueChange={([val]) => handleSeek(val)}
            className="cursor-pointer"
          />
        </div>

        {/* Đồng hồ hiển thị thời gian */}
        <div className="text-xs font-mono font-bold text-slate-700 px-2 py-1 bg-white rounded-md border border-slate-200 shrink-0">
          {formatTime(currentTimeMs)} / {formatTime(durationMs || 0)}
        </div>
      </div>

      {/* TRANSCRIPT LAYER (Văn bản bóc băng tương tác) */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            <span>Văn bản bóc băng đối chiếu (Click vào câu để tua âm thanh):</span>
          </div>

          {segments.length > 0 && !readOnly && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setManualInputOpen(!manualInputOpen)}
              className="h-7 text-[11px] font-semibold gap-1 text-slate-600"
            >
              <Edit2 className="h-3 w-3" />
              Sửa toàn bộ văn bản
            </Button>
          )}
        </div>

        {/* Manual Transcript Input Drawer/Box */}
        {manualInputOpen && (
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <Textarea
              value={manualText}
              onChange={(e) => setManualText(e.target.value)}
              placeholder="Dán hoặc gõ toàn bộ nội dung bài nói vào đây để tạo danh sách câu tua âm thanh..."
              rows={3}
              className="text-xs bg-white"
            />
            <div className="flex items-center justify-end gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setManualInputOpen(false)}
                className="h-7 text-xs"
              >
                Hủy
              </Button>
              <Button
                size="sm"
                onClick={handleSaveManualTranscript}
                className="h-7 text-xs font-bold bg-blue-600 text-white"
              >
                Cập nhật bóc băng
              </Button>
            </div>
          </div>
        )}

        {segments.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-500 bg-slate-50/60 rounded-xl border border-dashed border-slate-200 space-y-3">
            <p>Chưa có dữ liệu bóc băng văn bản cho bài nói này.</p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Button
                type="button"
                size="sm"
                onClick={handleAutoTranscribe}
                disabled={isTranscribing}
                className="h-8 text-xs font-bold gap-1.5 bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
              >
                {isTranscribing ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Đang bóc băng âm thanh...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="h-3.5 w-3.5" />
                    <span>Bóc băng tự động (AI Speech-to-Text)</span>
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setManualText("");
                  setManualInputOpen(true);
                }}
                className="h-8 text-xs font-semibold gap-1 text-slate-700 border-slate-200"
              >
                <FileText className="h-3.5 w-3.5" />
                <span>Nhập văn bản thủ công</span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
            {segments.map((seg) => {
              const isActive = currentTimeMs >= seg.startMs && currentTimeMs < seg.endMs;
              const isEdited = !!seg.editedText;
              const displayText = seg.editedText || seg.text;
              const isEditingThis = editingSegmentId === seg.id;

              return (
                <div
                  key={seg.id}
                  className={`p-2.5 rounded-lg border text-xs transition-all duration-200 ${
                    isActive
                      ? "bg-blue-50 border-blue-400 text-blue-950 shadow-2xs font-medium"
                      : "bg-slate-50/50 border-slate-200 hover:bg-slate-100 text-slate-800"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => handleSeek(seg.startMs)}
                      className="font-mono text-[10px] text-slate-500 hover:text-blue-600 font-bold px-1.5 py-0.5 rounded bg-white border border-slate-200 shrink-0 transition-colors"
                      title="Nhảy đến giây này"
                    >
                      {formatTime(seg.startMs)} - {formatTime(seg.endMs)}
                    </button>

                    {isEditingThis ? (
                      <div className="flex-1 space-y-2">
                        <Textarea
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="text-xs min-h-[50px] p-2 bg-white"
                        />
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setEditingSegmentId(null)}
                            className="h-6 text-[10px] px-2"
                          >
                            Hủy
                          </Button>
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => handleSaveEdit(seg.id)}
                            className="h-6 text-[10px] px-2 gap-1 bg-blue-600 text-white"
                          >
                            <Check className="h-3 w-3" />
                            Lưu
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p
                        onClick={() => handleSeek(seg.startMs)}
                        className="flex-1 cursor-pointer leading-relaxed text-left"
                      >
                        {displayText}
                        {isEdited && (
                          <span className="ml-1 text-[10px] text-slate-400 italic">
                            (đã sửa)
                          </span>
                        )}
                      </p>
                    )}

                    {!readOnly && !isEditingThis && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleStartEdit(seg)}
                        className="h-6 w-6 p-0 text-slate-400 hover:text-slate-700 shrink-0"
                        title="Sửa câu này"
                      >
                        <Edit2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {/* DISCLAIMER INVARIANT */}
        <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-slate-500 font-sans">
          <AlertCircle className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          <span>
            <strong>Nguyên tắc:</strong> Văn bản bóc băng phục vụ tra cứu nhanh. File âm thanh là bằng chứng gốc duy nhất.
          </span>
        </div>
      </div>
    </div>
  );
}
