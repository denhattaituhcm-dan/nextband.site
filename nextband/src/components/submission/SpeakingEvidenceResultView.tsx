import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Sparkles, AlertCircle, Award, Volume2, Info } from "lucide-react";
import { SpeakingEvidenceTagDTO } from "@/contracts/speaking-evidence.contract";
import { speakingEvidenceApi } from "@/lib/speakingEvidenceApi";

interface SpeakingEvidenceResultViewProps {
  criteriaScores?: {
    fluencyAndCoherence?: number | null;
    lexical?: number | null;
    grammar?: number | null;
    pronunciation?: number | null;
    speakingTags?: string[];
  } | null;
  submissionId?: string;
}

export function SpeakingEvidenceResultView({
  criteriaScores,
  submissionId,
}: SpeakingEvidenceResultViewProps) {
  const [allTags, setAllTags] = useState<SpeakingEvidenceTagDTO[]>([]);
  const [activeTagIds, setActiveTagIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    let isMounted = true;
    async function loadTags() {
      try {
        const res = await speakingEvidenceApi.getTags();
        if (!isMounted) return;
        setAllTags(res.tags);

        // Load active tags from database if submissionId provided
        const tagSet = new Set<string>();
        if (submissionId) {
          try {
            const evList = await speakingEvidenceApi.getAssessmentEvidence(submissionId);
            if (isMounted) {
              evList.forEach((e) => tagSet.add(e.tagId));
            }
          } catch (e) {
            // fallback
          }
        }

        // Fallback or union with criteriaScores.speakingTags
        if (Array.isArray(criteriaScores?.speakingTags)) {
          criteriaScores.speakingTags.forEach((tid) => tagSet.add(tid));
        }

        if (isMounted) {
          setActiveTagIds(tagSet);
        }
      } catch (err) {
        console.warn("[SpeakingEvidenceResultView] Failed to load tags:", err);
      }
    }
    loadTags();
    return () => {
      isMounted = false;
    };
  }, [submissionId, criteriaScores]);

  const hasScores =
    criteriaScores &&
    (criteriaScores.fluencyAndCoherence != null ||
      criteriaScores.lexical != null ||
      criteriaScores.grammar != null ||
      criteriaScores.pronunciation != null);

  const selectedTags = allTags.filter((t) => activeTagIds.has(t.id));
  const strengths = selectedTags.filter((t) => t.polarity === "STRENGTH");
  const issues = selectedTags.filter((t) => t.polarity === "ISSUE");

  if (!hasScores && selectedTags.length === 0) {
    return null;
  }

  return (
    <div className="rounded-xl border border-orange-200 bg-orange-50/40 dark:bg-orange-950/20 dark:border-orange-900 p-4 space-y-3.5 mt-3 font-sans">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-orange-200/60 pb-2.5">
        <div className="flex items-center gap-2">
          <Award className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          <h4 className="text-xs font-extrabold text-orange-950 dark:text-orange-200 uppercase tracking-wider">
            Báo cáo kỹ thuật Speaking (ARIS Evidence v1.0)
          </h4>
        </div>
        {selectedTags.length > 0 && (
          <span className="text-[11px] font-bold text-orange-800 dark:text-orange-300">
            {selectedTags.length} đặc trưng ghi nhận
          </span>
        )}
      </div>

      {/* 4 Official Criteria Scores */}
      {hasScores && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-lg p-2.5 text-center">
            <span className="text-[10px] font-bold text-slate-500 block uppercase">Fluency & Coh</span>
            <span className="text-base font-extrabold text-slate-900 dark:text-slate-100">
              {criteriaScores?.fluencyAndCoherence != null ? criteriaScores.fluencyAndCoherence.toFixed(1) : "—"}
            </span>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-lg p-2.5 text-center">
            <span className="text-[10px] font-bold text-slate-500 block uppercase">Lexical Resource</span>
            <span className="text-base font-extrabold text-slate-900 dark:text-slate-100">
              {criteriaScores?.lexical != null ? criteriaScores.lexical.toFixed(1) : "—"}
            </span>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-lg p-2.5 text-center">
            <span className="text-[10px] font-bold text-slate-500 block uppercase">Grammar Range</span>
            <span className="text-base font-extrabold text-slate-900 dark:text-slate-100">
              {criteriaScores?.grammar != null ? criteriaScores.grammar.toFixed(1) : "—"}
            </span>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-lg p-2.5 text-center">
            <span className="text-[10px] font-bold text-slate-500 block uppercase">Pronunciation</span>
            <span className="text-base font-extrabold text-slate-900 dark:text-slate-100">
              {criteriaScores?.pronunciation != null ? criteriaScores.pronunciation.toFixed(1) : "—"}
            </span>
          </div>
        </div>
      )}

      {/* STRENGTHS (ĐIỂM SÁNG) */}
      {strengths.length > 0 && (
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Điểm sáng quan sát được (Năng lực tích cực):</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {strengths.map((tag) => (
              <span
                key={tag.id}
                title={tag.descriptionVi}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-100 text-emerald-900 border border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-200 dark:border-emerald-800 shadow-2xs"
              >
                <span>🌟 {tag.labelVi}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ISSUES (ĐIỂM CẦN LƯU Ý) */}
      {issues.length > 0 && (
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 dark:text-amber-300">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>Điểm cần lưu ý để bứt phá band điểm:</span>
          </div>
          <div className="space-y-1.5">
            {issues.map((tag) => (
              <div
                key={tag.id}
                className="p-2.5 rounded-lg text-xs bg-amber-100/70 border border-amber-300 text-amber-950 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-200 space-y-0.5"
              >
                <div className="font-bold flex items-center gap-1.5">
                  <span>⚠️ {tag.labelVi}</span>
                  <Badge variant="outline" className="text-[10px] py-0 px-1.5 bg-amber-200/60 border-amber-400 text-amber-900 font-mono">
                    {tag.criterion}
                  </Badge>
                </div>
                <p className="text-[11px] text-amber-900/80 dark:text-amber-300/90 leading-relaxed pl-4">
                  {tag.descriptionVi}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
