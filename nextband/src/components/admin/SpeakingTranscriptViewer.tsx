import React, { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw, Volume2, Edit2, Check, AlertCircle, Sparkles, Wand2, FileText, Loader2, AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { API_BASE_URL, getAuthToken, formatStorageUrl } from "@/lib/api";
import { supabase } from "@/lib/supabase";
import { AudioStorageService } from "@/lib/audioStorageService";
import { cn } from "@/lib/utils";

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
  submissionId?: string;
  answerId?: string;
  questionId?: string;
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
 * Split plain text into default segments with evenly distributed durations
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

  const avgDurationMs = Math.max(2000, Math.floor((totalDurationMs || 60000) / sentences.length));
  return sentences.map((sentence, idx) => ({
    id: `seg-${idx + 1}`,
    startMs: idx * avgDurationMs,
    endMs: (idx + 1) * avgDurationMs,
    text: sentence,
  }));
}

/**
 * Safe parser for raw text or JSON serialized { rawText, segments }
 */
function parseInitialTranscript(raw?: string | null): { rawText: string; segments: TranscriptSegment[] } {
  if (!raw || !raw.trim()) {
    return { rawText: "", segments: [] };
  }

  try {
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.segments) && parsed.segments.length > 0) {
      return {
        rawText: parsed.rawText || parsed.text || "",
        segments: parsed.segments.map((s: any, idx: number) => ({
          id: s.id || `seg-${idx + 1}`,
          startMs: typeof s.startMs === "number" ? s.startMs : Math.round((s.start || 0) * 1000),
          endMs: typeof s.endMs === "number" ? s.endMs : Math.round((s.end || 0) * 1000),
          text: (s.text || "").trim(),
          editedText: s.editedText,
        })),
      };
    }
  } catch {
    // If not JSON, treat as raw plain text
  }

  return {
    rawText: raw,
    segments: generateDefaultSegments(raw),
  };
}

export function SpeakingTranscriptViewer({
  audioUrl,
  initialTranscript,
  segments: initialSegments,
  submissionId,
  answerId,
  questionId,
  onTranscriptEdited,
  readOnly = false,
}: SpeakingTranscriptViewerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeMs, setCurrentTimeMs] = useState(0);
  const [durationMs, setDurationMs] = useState(0);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcribeError, setTranscribeError] = useState<string | null>(null);
  const [manualInputOpen, setManualInputOpen] = useState(false);
  const [manualText, setManualText] = useState("");

  // Segments state
  const [segments, setSegments] = useState<TranscriptSegment[]>(() => {
    if (initialSegments && initialSegments.length > 0) return initialSegments;
    return parseInitialTranscript(initialTranscript).segments;
  });

  const [editingSegmentId, setEditingSegmentId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [resolvedAudioSrc, setResolvedAudioSrc] = useState<string>(audioUrl);

  const resolveAudio = useCallback(async (forceRefresh = false) => {
    if (!audioUrl) {
      setResolvedAudioSrc("");
      return;
    }
    setIsAudioLoading(true);
    setAudioError(null);
    try {
      const src = await AudioStorageService.resolvePlayableUrl(audioUrl, forceRefresh);
      setResolvedAudioSrc(src || formatStorageUrl(audioUrl));
    } catch (err: any) {
      console.warn("[SpeakingTranscriptViewer] Audio resolution error:", err);
      setResolvedAudioSrc(formatStorageUrl(audioUrl) || audioUrl);
    } finally {
      setIsAudioLoading(false);
    }
  }, [audioUrl]);

  useEffect(() => {
    resolveAudio(false);
  }, [resolveAudio]);

  // Sync state if initialTranscript changes externally
  useEffect(() => {
    if (initialSegments && initialSegments.length > 0) {
      setSegments(initialSegments);
    } else if (initialTranscript) {
      const parsed = parseInitialTranscript(initialTranscript);
      if (parsed.segments.length > 0) {
        setSegments(parsed.segments);
      }
    }
  }, [initialTranscript, initialSegments]);

  // Handle duration fix for WebM files
  const handleLoadedMetadata = () => {
    setAudioError(null);
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

  const handleAudioError = () => {
    setIsPlaying(false);
    const mediaErr = audioRef.current?.error;
    let msg = "Không thể tải hoặc phát tệp âm thanh này.";
    if (mediaErr?.code === 4) {
      msg = "Định dạng âm thanh không được hỗ trợ hoặc đường dẫn tệp đã hết hạn / không tồn tại.";
    } else if (mediaErr?.code === 2) {
      msg = "Lỗi kết nối mạng khi tải tệp âm thanh.";
    }
    setAudioError(msg);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setAudioError(null);
        })
        .catch((err) => {
          console.warn("Audio play failed:", err);
          setIsPlaying(false);
          setAudioError("Không thể phát âm thanh. Vui lòng bấm 'Tải lại' hoặc kiểm tra kết nối mạng.");
        });
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

    const fullPayload = JSON.stringify({
      rawText: updated.map((s) => s.editedText || s.text).join(" "),
      segments: updated,
    });

    if (onTranscriptEdited) {
      onTranscriptEdited(fullPayload, updated);
    }
  };

  // Call NextBand Fastify Backend STT Endpoint
  const handleAutoTranscribe = async () => {
    setIsTranscribing(true);
    setTranscribeError(null);
    try {
      const token = await getAuthToken();
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch(`${API_BASE_URL}/speaking/transcribe`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          submissionId,
          answerId,
          questionId,
          storagePath: audioUrl,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.status === "FAILED") {
        throw new Error(data.error || "Không thể bóc băng tệp âm thanh này.");
      }

      const newSegments: TranscriptSegment[] = (data.segments || []).map((s: any, idx: number) => ({
        id: s.id || `seg-${idx + 1}`,
        startMs: s.startMs || 0,
        endMs: s.endMs || 0,
        text: s.text || "",
      }));

      setSegments(newSegments);

      const serializedPayload = JSON.stringify({
        rawText: data.rawText || newSegments.map((s) => s.text).join(" "),
        segments: newSegments,
      });

      if (onTranscriptEdited) {
        onTranscriptEdited(serializedPayload, newSegments);
      }
    } catch (err: any) {
      console.error("[SpeechToText Error]", err);
      setTranscribeError(err?.message || "Bóc băng thất bại. Vui lòng kiểm tra lại dịch vụ STT.");
    } finally {
      setIsTranscribing(false);
    }
  };

  const handleSaveManualTranscript = () => {
    if (!manualText.trim()) return;
    const generated = generateDefaultSegments(manualText.trim(), durationMs || 60000);
    setSegments(generated);
    setManualInputOpen(false);
    setTranscribeError(null);

    const serializedPayload = JSON.stringify({
      rawText: manualText.trim(),
      segments: generated,
    });

    if (onTranscriptEdited) {
      onTranscriptEdited(serializedPayload, generated);
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs space-y-0 font-sans">
      {/* Audio element */}
      <audio
        ref={audioRef}
        src={resolvedAudioSrc || audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onDurationChange={handleLoadedMetadata}
        onError={handleAudioError}
        onEnded={() => setIsPlaying(false)}
      />

      {/* AUDIO PLAYER CONTROLS */}
      <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center gap-3">
        <Button
          size="sm"
          variant="default"
          onClick={togglePlay}
          disabled={isAudioLoading}
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

        {/* Interactive Scrubber Slider */}
        <div className="flex-1 min-w-[140px] px-1 flex items-center">
          <Slider
            value={[currentTimeMs]}
            max={durationMs > 0 ? durationMs : Math.max(currentTimeMs + 1000, 60000)}
            step={100}
            onValueChange={([val]) => handleSeek(val)}
            className="cursor-pointer"
          />
        </div>

        {/* Time display */}
        <div className="text-xs font-mono font-bold text-slate-700 px-2 py-1 bg-white rounded-md border border-slate-200 shrink-0">
          {formatTime(currentTimeMs)} / {formatTime(durationMs || 0)}
        </div>

        {/* Force Reload Audio Button */}
        <Button
          size="sm"
          variant="ghost"
          onClick={() => resolveAudio(true)}
          disabled={isAudioLoading}
          className="h-8 px-2 text-slate-500 hover:text-slate-900 text-xs font-semibold shrink-0 gap-1"
          title="Tải lại link âm thanh (làm mới signed URL nếu hết hạn)"
        >
          <RefreshCw className={cn("h-3.5 w-3.5", isAudioLoading && "animate-spin text-blue-600")} />
          <span className="hidden sm:inline">Tải lại</span>
        </Button>
      </div>

      {/* Audio Playback Error Warning */}
      {audioError && (
        <div className="p-3 bg-amber-50 border-b border-amber-200 text-xs text-amber-900 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
            <span>{audioError}</span>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => resolveAudio(true)}
            className="h-6 text-[11px] font-bold border-amber-300 text-amber-800 hover:bg-amber-100 shrink-0 gap-1"
          >
            <RefreshCw className="h-3 w-3" /> Thử tải lại
          </Button>
        </div>
      )}

      {/* TRANSCRIPT LAYER */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            <span>Văn bản bóc băng đối chiếu (Click vào câu để tua âm thanh):</span>
          </div>

          <div className="flex items-center gap-2">
            {/* NÚT CHUYỂN AUDIO THÀNH VĂN BẢN (SPEECH-TO-TEXT) DÀNH CHO GIÁO VIÊN */}
            {!readOnly && (
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={handleAutoTranscribe}
                disabled={isTranscribing}
                className="h-7 text-[11px] font-bold gap-1 text-blue-700 border-blue-200 bg-blue-50/50 hover:bg-blue-100/80 shadow-2xs"
                title="Dùng AI nhận diện giọng nói tự động bóc băng đoạn audio này thành văn bản"
              >
                {isTranscribing ? (
                  <>
                    <Loader2 className="h-3 w-3 animate-spin text-blue-600" />
                    <span>Đang bóc băng AI...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="h-3 w-3 text-blue-600" />
                    <span>{segments.length > 0 ? "Bóc băng lại bằng AI" : "Chuyển audio thành text (AI)"}</span>
                  </>
                )}
              </Button>
            )}

            {segments.length > 0 && !readOnly && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setManualText(segments.map((s) => s.editedText || s.text).join(" "));
                  setManualInputOpen(!manualInputOpen);
                }}
                className="h-7 text-[11px] font-semibold gap-1 text-slate-600 hover:text-slate-900"
              >
                <Edit2 className="h-3 w-3" />
                Sửa toàn bộ văn bản
              </Button>
            )}
          </div>
        </div>

        {/* Error notification banner */}
        {transcribeError && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2 animate-in fade-in">
            <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1 space-y-1">
              <p className="font-semibold">{transcribeError}</p>
              <p className="text-[11px] text-rose-600">
                Bạn có thể bấm <strong>Nhập văn bản thủ công</strong> hoặc thử lại bóc băng.
              </p>
            </div>
          </div>
        )}

        {/* Manual Transcript Input Box */}
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
                    <span>Đang gửi audio đến STT service...</span>
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
