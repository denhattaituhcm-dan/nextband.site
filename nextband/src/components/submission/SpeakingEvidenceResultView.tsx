import React, { useEffect, useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Award,
  Sparkles,
  Target,
  AlertTriangle,
  Star,
  CheckCircle2,
  Volume2,
  Play,
  RotateCcw,
  ArrowRight,
} from "lucide-react";
import {
  CriteriaScores,
  SpeakingCorrectionItem,
  SpeakingStrengthTag,
  SpeakingTeacherSummary,
  SpeakingRetryMission,
  SpeakingSentenceAnnotation,
  SpeakingDiagnosticCategory,
  SpeakingPriority,
  CATEGORY_LABEL_VI,
  PRIORITY_CONFIG,
  PRESET_STRENGTH_TAGS,
  calculateSpeakingBand,
} from "@/lib/sentenceFeedback";
import { cn } from "@/lib/utils";

interface SpeakingEvidenceResultViewProps {
  criteriaScores?: CriteriaScores | null;
  submissionId?: string;
  speakingAnnotations?: SpeakingSentenceAnnotation[];
  speakingCorrections?: SpeakingCorrectionItem[];
  speakingStrengths?: string[];
  speakingSummary?: SpeakingTeacherSummary;
  speakingRetryMission?: SpeakingRetryMission;
  onPlaySentenceAudio?: (startMs: number, endMs: number) => void;
}

export function SpeakingEvidenceResultView({
  criteriaScores,
  submissionId,
  speakingAnnotations = [],
  speakingCorrections = [],
  speakingStrengths = [],
  speakingSummary,
  speakingRetryMission,
  onPlaySentenceAudio,
}: SpeakingEvidenceResultViewProps) {
  const overallBand = useMemo(() => calculateSpeakingBand(criteriaScores), [criteriaScores]);

  const hasScores =
    criteriaScores &&
    (criteriaScores.fluencyAndCoherence != null ||
      criteriaScores.lexical != null ||
      criteriaScores.grammar != null ||
      criteriaScores.pronunciation != null);

  const has431Data =
    speakingCorrections.length > 0 ||
    speakingStrengths.length > 0 ||
    !!speakingRetryMission ||
    speakingAnnotations.length > 0 ||
    !!speakingSummary;

  if (!hasScores && !has431Data) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-5 mt-4 font-sans shadow-xs">
      {/* ── 1. Header & IELTS Overall Profile ──────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold">
            🎙️
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">
              Báo Cáo Chẩn Đoán Kỹ Thuật Speaking (4–3–1)
            </h3>
            <p className="text-[11px] text-slate-500">
              Phân tích theo 4 tiêu chí IELTS · 3 lỗi ưu tiên · 1 nhiệm vụ luyện lại
            </p>
          </div>
        </div>

        {overallBand !== "—" && (
          <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 px-3 py-1.5 rounded-xl">
            <span className="text-xs font-semibold text-orange-900">Overall Band:</span>
            <span className="text-base font-black text-orange-600">{overallBand}</span>
          </div>
        )}
      </div>

      {/* 4 Criteria Band Scores */}
      {hasScores && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-3 text-center">
            <span className="text-[10px] font-bold text-slate-500 block uppercase tracking-wider">Fluency & Coh</span>
            <span className="text-lg font-black text-slate-900">
              {criteriaScores?.fluencyAndCoherence != null ? criteriaScores.fluencyAndCoherence.toFixed(1) : "—"}
            </span>
          </div>
          <div className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-3 text-center">
            <span className="text-[10px] font-bold text-slate-500 block uppercase tracking-wider">Lexical Resource</span>
            <span className="text-lg font-black text-slate-900">
              {criteriaScores?.lexical != null ? criteriaScores.lexical.toFixed(1) : "—"}
            </span>
          </div>
          <div className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-3 text-center">
            <span className="text-[10px] font-bold text-slate-500 block uppercase tracking-wider">Grammar Range</span>
            <span className="text-lg font-black text-slate-900">
              {criteriaScores?.grammar != null ? criteriaScores.grammar.toFixed(1) : "—"}
            </span>
          </div>
          <div className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-3 text-center">
            <span className="text-[10px] font-bold text-slate-500 block uppercase tracking-wider">Pronunciation</span>
            <span className="text-lg font-black text-slate-900">
              {criteriaScores?.pronunciation != null ? criteriaScores.pronunciation.toFixed(1) : "—"}
            </span>
          </div>
        </div>
      )}

      {/* ── 2. The Destination: 1 Retry Mission ───────────────────────────── */}
      {speakingRetryMission && (
        <Card className="border-2 border-orange-300 bg-linear-to-r from-orange-50 via-amber-50 to-orange-50/30 p-4 rounded-xl space-y-3 shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Target className="h-4 w-4 text-orange-600" />
              <h4 className="text-xs font-black text-orange-950 uppercase tracking-wider">
                Nhiệm Vụ Luyện Lại (Next Mission)
              </h4>
            </div>
            <Badge className="bg-orange-600 text-white font-bold text-[10px]">Cần thực hiện</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            <div className="p-3 bg-white/90 rounded-lg border border-orange-200 space-y-1">
              <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">❌ Câu đã nói:</span>
              <p className="text-slate-800 font-medium italic">"{speakingRetryMission.originalSentence}"</p>
            </div>
            <div className="p-3 bg-white/90 rounded-lg border border-emerald-300 space-y-1">
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">✅ Câu mục tiêu cần nói:</span>
              <p className="text-emerald-950 font-semibold">"{speakingRetryMission.targetSentence}"</p>
            </div>
          </div>

          {speakingRetryMission.missionPrompt && (
            <p className="text-xs font-medium text-orange-900 bg-orange-100/70 px-3 py-1.5 rounded-md flex items-center gap-1.5">
              <span>🎯</span>
              <span><strong>Mục tiêu:</strong> {speakingRetryMission.missionPrompt}</span>
            </p>
          )}
        </Card>
      )}

      {/* ── 3. 3 Priority Diagnostic Errors (P1 Fix First, P2 Improve, P3 Refine) ── */}
      {speakingCorrections.length > 0 && (
        <div className="space-y-2.5">
          <div className="flex items-center gap-1.5">
            <AlertTriangle className="h-4 w-4 text-rose-600" />
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              3 Lỗi Ưu Tiên Cần Khắc Phục (Priority Diagnosis)
            </h4>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {speakingCorrections.map((corr) => {
              const pConfig = PRIORITY_CONFIG[corr.priority];
              const isP1 = corr.priority === "P1";

              return (
                <div
                  key={corr.id || corr.priority}
                  className={cn(
                    "p-3.5 rounded-xl border text-xs space-y-2 transition-all",
                    isP1
                      ? "bg-rose-50/60 border-rose-300"
                      : corr.priority === "P2"
                      ? "bg-amber-50/50 border-amber-200"
                      : "bg-sky-50/40 border-sky-200"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "px-1.5 py-0.5 rounded text-[10px] font-black",
                        isP1
                          ? "bg-rose-600 text-white"
                          : corr.priority === "P2"
                          ? "bg-amber-500 text-white"
                          : "bg-sky-600 text-white"
                      )}>
                        {corr.priority}
                      </span>
                      <span className="font-bold text-slate-900 text-xs">
                        {pConfig?.labelVi || corr.priority}
                      </span>
                      <Badge variant="outline" className="text-[10px] font-mono border-slate-300 bg-white">
                        {corr.criterion} · {CATEGORY_LABEL_VI[corr.category] || corr.category}
                      </Badge>
                    </div>

                    {corr.timestamp && onPlaySentenceAudio && (
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => onPlaySentenceAudio(corr.timestamp!.start, corr.timestamp!.end)}
                        className="h-6 px-2 text-[10px] font-bold text-blue-700 hover:bg-white gap-1"
                      >
                        <Play className="h-3 w-3" /> Nghe lại câu
                      </Button>
                    )}
                  </div>

                  <div className="space-y-1 pl-1">
                    <p className="text-[11px] text-slate-600">
                      <strong className="text-rose-700">❌ Em đã nói:</strong> "{corr.studentSaid}"
                    </p>
                    {corr.correction && (
                      <p className="text-[11px] text-emerald-800 font-medium">
                        <strong className="text-emerald-700">✅ Cách nói chuẩn hơn:</strong> "{corr.correction}"
                      </p>
                    )}
                    {corr.note && (
                      <p className="text-[10px] text-slate-500 italic bg-white/70 p-1.5 rounded border border-slate-200/60">
                        💬 <strong>Ghi chú giáo viên:</strong> {corr.note}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── 4. Strengths (Điểm Sáng Quan Sát Được) ────────────────────────── */}
      {speakingStrengths.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5">
            <Star className="h-4 w-4 text-emerald-600" />
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              Điểm Sáng Đã Thể Hiện Tốt (Strengths)
            </h4>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {speakingStrengths.map((strId) => {
              const preset = PRESET_STRENGTH_TAGS.find((t) => t.id === strId);
              const label = preset ? preset.labelVi : strId;
              const criterion = preset ? preset.criterion : "PR";

              return (
                <span
                  key={strId}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-2xs"
                >
                  <span className="text-[10px] font-mono text-emerald-600">[{criterion}]</span>
                  <span>🌟 {label}</span>
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* ── 5. Teacher Summary Guidance ───────────────────────────────────── */}
      {speakingSummary && (speakingSummary.strongestPoint || speakingSummary.mainArea || speakingSummary.nextTarget || speakingSummary.teacherNote) && (
        <Card className="border border-slate-200 bg-slate-50/60 p-3.5 rounded-xl space-y-2 text-xs">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
            Tóm Tắt Hướng Dẫn Của Giáo Viên
          </span>

          {speakingSummary.strongestPoint && (
            <p className="text-slate-800">
              <strong className="text-emerald-700">💪 Điểm sáng nổi bật:</strong> {speakingSummary.strongestPoint}
            </p>
          )}

          {speakingSummary.mainArea && (
            <p className="text-slate-800">
              <strong className="text-rose-700">🎯 Cần khắc phục chính:</strong> {speakingSummary.mainArea}
            </p>
          )}

          {speakingSummary.nextTarget && (
            <p className="text-slate-800">
              <strong className="text-blue-700">🚀 Mục tiêu tiếp theo:</strong> {speakingSummary.nextTarget}
            </p>
          )}

          {speakingSummary.teacherNote && (
            <div className="pt-2 border-t border-slate-200 text-slate-700 italic">
              <strong>Ghi chú thêm:</strong> {speakingSummary.teacherNote}
            </div>
          )}
        </Card>
      )}
    </div>
  );
}

