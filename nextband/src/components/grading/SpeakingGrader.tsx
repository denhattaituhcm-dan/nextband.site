import { useState, useEffect, useMemo, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Send,
  Save,
  Loader2,
  AlertTriangle,
  Mic,
  Volume2,
  CheckCircle2,
  Clock,
  FileAudio,
  BookOpen,
  ArrowLeft,
  Plus,
  Trash2,
  Tag,
  Star,
  Target,
  RefreshCw,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { SpeakingRubricCard } from "@/components/grading/SpeakingRubricCard";
import {
  SpeakingTranscriptViewer,
  type AnnotateSegmentPayload,
  type SegmentAnnotationBadge,
} from "@/components/admin/SpeakingTranscriptViewer";
import { RichContent } from "@/components/exam/RichContent";
import {
  CriteriaScores,
  ErrorCategory,
  parseStructuredFeedback,
  calculateSpeakingBand,
  // 4–3–1 types
  SpeakingSentenceAnnotation,
  aggregateSpeakingAnnotations,
  SpeakingCorrectionItem,
  SpeakingStrengthTag,
  SpeakingTeacherSummary,
  SpeakingRetryMission,
  SpeakingPriority,
  SpeakingCriterion,
  SpeakingDiagnosticCategory,
  CATEGORIES_BY_CRITERION,
  CATEGORY_LABEL_VI,
  PRIORITY_CONFIG,
  PRESET_STRENGTH_TAGS,
  serializeStructuredFeedback,
} from "@/lib/sentenceFeedback";

import { formatStorageUrl } from "@/lib/api";
import { calculateGradingSla } from "@/lib/gradingSla";

import { cn } from "@/lib/utils";
import { AudioStorageService } from "@/lib/audioStorageService";
import { speakingEvidenceApi } from "@/lib/speakingEvidenceApi";
import {
  SpeakingEvidenceTagDTO,
  SpeakingEvidenceGroupedDTO,
} from "@/contracts/speaking-evidence.contract";
import { SpeakingEvidenceTagGroup } from "@/components/grading/SpeakingEvidenceTagGroup";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Sparkles } from "lucide-react";


export interface SpeakingAnswerItem {
  id?: string;
  questionId: string;
  questionTitle?: string;
  questionText?: string;
  instructions?: string;
  passage?: string;
  imageUrl?: string | null;
  audioUrl?: string | null;
  answerText?: string;
  score?: number | null;
  feedback?: string | null;
}

interface SpeakingGraderProps {
  submissionId: string;
  studentName: string;
  className?: string;
  homeworkTitle: string;
  submissionStatus?: string;
  submittedAt?: string;
  answers: SpeakingAnswerItem[];
  submissionDetail?: any;
  isSubmitting: boolean;
  onBack?: () => void;
  onGradeSubmit: (payload: {
    grades: Array<{
      answerId?: string;
      questionId: string;
      score: number;
      feedback?: string;
      criteriaScores?: CriteriaScores;
      primaryErrorCategory?: ErrorCategory | null;
      revisionRequired?: boolean;
    }>;
    totalScore?: number;
    options: {
      feedback?: string;
      primaryErrorCategory?: ErrorCategory | null;
      revisionRequired?: boolean;
      criteriaScores?: CriteriaScores | null;
      finalize: boolean;
    };
  }) => Promise<void>;
}

export function SpeakingGrader({
  submissionId,
  studentName,
  className = "Lớp IELTS",
  homeworkTitle,
  submissionStatus = "SUBMITTED",
  submittedAt,
  answers,
  submissionDetail,
  isSubmitting,
  onBack,
  onGradeSubmit,
}: SpeakingGraderProps) {
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [lastSavedTime, setLastSavedTime] = useState<Date | null>(null);

  // Determine initial active index: prioritize answer with audio recording
  const initialIndex = useMemo(() => {
    if (!answers || answers.length === 0) return 0;
    const idxWithAudio = answers.findIndex(
      (a) => (a.audioUrl && a.audioUrl.trim().length > 0) || AudioStorageService.isAudio(a.answerText)
    );
    return idxWithAudio >= 0 ? idxWithAudio : 0;
  }, [answers]);

  const [activeAnswerIndex, setActiveAnswerIndex] = useState<number>(initialIndex);

  // Sync active answer index if answers change
  useEffect(() => {
    setActiveAnswerIndex((prev) => (prev < answers.length ? prev : 0));
  }, [answers.length]);

  const currentAnswer = answers[activeAnswerIndex] || answers[0];
  const questionId = currentAnswer?.questionId || "";
  const answerId = currentAnswer?.id;

  // Robust audio resolution with multiple fallbacks
  const resolvedAudioUrl = useMemo(() => {
    let raw = "";
    if (currentAnswer?.audioUrl && currentAnswer.audioUrl.trim().length > 0) {
      raw = currentAnswer.audioUrl.trim();
    } else if (AudioStorageService.isAudio(currentAnswer?.answerText)) {
      raw = (currentAnswer?.answerText || "").trim();
    } else {
      // Fallback: look in other answers of the submission
      const otherWithAudio = answers.find(
        (a) => (a.audioUrl && a.audioUrl.trim().length > 0) || AudioStorageService.isAudio(a.answerText)
      );
      if (otherWithAudio) {
        raw = (otherWithAudio.audioUrl || otherWithAudio.answerText || "").trim();
      } else {
        // Fallback: look in submissionDetail raw answers if available
        const rawDetailAnswers = submissionDetail?.answers || [];
        const matchedRaw = rawDetailAnswers.find(
          (a: any) =>
            (a.audioUrl && a.audioUrl.trim().length > 0) ||
            (a.audio_url && a.audio_url.trim().length > 0) ||
            AudioStorageService.isAudio(a.answerText || a.answer_text || a.studentAnswer)
        );
        if (matchedRaw) {
          raw = (
            matchedRaw.audioUrl ||
            matchedRaw.audio_url ||
            matchedRaw.answerText ||
            matchedRaw.answer_text ||
            matchedRaw.studentAnswer ||
            ""
          ).trim();
        }
      }
    }
    return raw ? (formatStorageUrl(raw) || raw) : "";
  }, [currentAnswer, answers, submissionDetail]);

  const [criteriaScores, setCriteriaScores] = useState<CriteriaScores>({
    fluencyAndCoherence: null,
    lexical: null,
    grammar: null,
    pronunciation: null,
  });

  // ── Speaking 4–3–1 State ───────────────────────────────────────────────────
  const emptyCorrection = (): SpeakingCorrectionItem => ({
    id: crypto.randomUUID(),
    priority: "P1",
    criterion: "GRA",
    category: "TENSE",
    studentSaid: "",
    correction: "",
  });

  // Sentence-level annotations (source of truth from transcript interactions)
  const [speakingAnnotations, setSpeakingAnnotations] = useState<SpeakingSentenceAnnotation[]>([]);
  const [selectedSegment, setSelectedSegment] = useState<AnnotateSegmentPayload | null>(null);

  // Form state for currently selected sentence
  const [formKind, setFormKind] = useState<"ISSUE" | "STRENGTH">("ISSUE");
  const [formCriterion, setFormCriterion] = useState<SpeakingCriterion>("GRA");
  const [formCategory, setFormCategory] = useState<string>("TENSE");
  const [formCorrection, setFormCorrection] = useState<string>("");
  const [formNote, setFormNote] = useState<string>("");

  // Aggregated 4–3–1 output (derived automatically or manual tweak)
  const [speakingCorrections, setSpeakingCorrections] = useState<SpeakingCorrectionItem[]>([]);
  const [speakingStrengths, setSpeakingStrengths] = useState<string[]>([]);
  const [speakingSummary, setSpeakingSummary] = useState<SpeakingTeacherSummary>({});
  const [speakingRetryMission, setSpeakingRetryMission] = useState<SpeakingRetryMission | undefined>(undefined);

  // Derive annotation badges for SpeakingTranscriptViewer
  const derivedAnnotationBadges: SegmentAnnotationBadge[] = useMemo(() => {
    return speakingAnnotations.map((ann) => {
      const isStrength = ann.kind === "STRENGTH";
      const catLabel = isStrength
        ? (PRESET_STRENGTH_TAGS.find((t) => t.id === ann.category)?.labelVi || ann.category)
        : (CATEGORY_LABEL_VI[ann.category as SpeakingDiagnosticCategory] || ann.category);
      return {
        segmentId: ann.segmentId,
        label: `${isStrength ? "✓" : "⚠"} ${ann.criterion} · ${catLabel}`,
        color: isStrength ? "sky" : "rose",
      };
    });
  }, [speakingAnnotations]);

  // Track which priority slot or accordion is expanded
  const [summaryExpanded, setSummaryExpanded] = useState<boolean>(false);

  // Attempt 2 / Revision State
  const [revisionRequired, setRevisionRequired] = useState<boolean>(false);
  const [primaryErrorCategory, setPrimaryErrorCategory] = useState<ErrorCategory>("STRUCTURE");
  // ────────────────────────────────────────────────────────────────────────────

  // ARIS Speaking Evidence State (Dynamic Candidate Taxonomy v1.0)
  const [groupedTags, setGroupedTags] = useState<SpeakingEvidenceGroupedDTO>({
    pr: [],
    fc: [],
    lr: [],
    gra: [],
  });
  const [allEvidenceTags, setAllEvidenceTags] = useState<SpeakingEvidenceTagDTO[]>([]);
  const [selectedEvidenceTagIds, setSelectedEvidenceTagIds] = useState<Set<string>>(new Set());
  const [activeCriterionTab, setActiveCriterionTab] = useState<string>("pr");

  // Load candidate evidence tags from API & existing evidence for this submission
  useEffect(() => {
    let isMounted = true;
    async function loadEvidence() {
      try {
        const res = await speakingEvidenceApi.getTags();
        if (!isMounted) return;
        setGroupedTags(res.grouped);
        setAllEvidenceTags(res.tags);

        if (submissionId) {
          try {
            const existingEvidence = await speakingEvidenceApi.getAssessmentEvidence(submissionId);
            if (!isMounted) return;
            const ids = new Set<string>(existingEvidence.map((e) => e.tagId));

            // Also check criteriaScores.speakingTags fallback
            const structured = parseStructuredFeedback(currentAnswer?.feedback);
            if (Array.isArray((structured?.criteriaScores as any)?.speakingTags)) {
              for (const tid of (structured.criteriaScores as any).speakingTags) {
                ids.add(tid);
              }
            }
            setSelectedEvidenceTagIds(ids);
          } catch (e) {
            console.warn("[SpeakingGrader] Could not load existing assessment evidence:", e);
          }
        }
      } catch (err) {
        console.warn("[SpeakingGrader] Could not load candidate speaking tags:", err);
      }
    }
    loadEvidence();
    return () => {
      isMounted = false;
    };
  }, [submissionId]);

  const handleToggleEvidenceTag = (tagId: string, _criterion: SpeakingCriterion) => {
    setSelectedEvidenceTagIds((prev) => {
      const next = new Set(prev);
      if (next.has(tagId)) {
        next.delete(tagId);
      } else {
        next.add(tagId);
      }
      return next;
    });
    setIsDirty(true);
  };

  // Load existing 4–3–1 data when currentAnswer changes
  useEffect(() => {
    if (!currentAnswer) return;
    const structured = parseStructuredFeedback(currentAnswer.feedback);

    setCriteriaScores(
      structured.criteriaScores || {
        fluencyAndCoherence: null,
        lexical: null,
        grammar: null,
        pronunciation: null,
      }
    );

    // Load Speaking 4–3–1 fields from existing feedback
    const existingAnnotations = structured.speakingAnnotations || [];
    setSpeakingAnnotations(existingAnnotations);
    setSpeakingCorrections(structured.speakingCorrections || []);
    setSpeakingStrengths(structured.speakingStrengths || []);
    setSpeakingSummary(structured.speakingSummary || {});
    setSpeakingRetryMission(structured.speakingRetryMission);

    if (Array.isArray((structured.criteriaScores as any)?.speakingTags)) {
      setSelectedEvidenceTagIds(new Set((structured.criteriaScores as any).speakingTags));
    }

    setPrimaryErrorCategory(structured.primaryErrorCategory || submissionDetail?.primaryErrorCategory || "STRUCTURE");
    setRevisionRequired(!!(structured.revisionRequired || submissionDetail?.revisionRequired));

    setSelectedSegment(null);
    setIsDirty(false);
  }, [currentAnswer, submissionDetail]);

  const overallBandPreview = useMemo(() => {
    return calculateSpeakingBand(criteriaScores);
  }, [criteriaScores]);

  // ── Sentence Annotation Handlers ──────────────────────────────────────────
  const handleSelectSegment = useCallback((payload: AnnotateSegmentPayload) => {
    setSelectedSegment(payload);
    // Find existing annotation for this segment if already diagnosed
    const existing = speakingAnnotations.find((a) => a.segmentId === payload.segmentId);
    if (existing) {
      setFormKind(existing.kind);
      setFormCriterion(existing.criterion);
      setFormCategory(existing.category);
      setFormCorrection(existing.correction || "");
      setFormNote(existing.note || "");
    } else {
      // Default to GRA / TENSE
      setFormKind("ISSUE");
      setFormCriterion("GRA");
      setFormCategory("TENSE");
      setFormCorrection("");
      setFormNote("");
    }
  }, [speakingAnnotations]);

  const handleSaveSentenceAnnotation = useCallback(() => {
    if (!selectedSegment) return;

    const newAnnotation: SpeakingSentenceAnnotation = {
      id: selectedSegment.segmentId,
      segmentId: selectedSegment.segmentId,
      startMs: selectedSegment.startMs,
      endMs: selectedSegment.endMs,
      text: selectedSegment.text,
      kind: formKind,
      criterion: formCriterion,
      category: formCategory,
      correction: formCorrection.trim() || undefined,
      note: formNote.trim() || undefined,
    };

    const updatedAnnotations = [
      ...speakingAnnotations.filter((a) => a.segmentId !== selectedSegment.segmentId),
      newAnnotation,
    ];

    setSpeakingAnnotations(updatedAnnotations);

    // Automatically aggregate into 4–3–1 engine
    const aggregated = aggregateSpeakingAnnotations(updatedAnnotations);
    setSpeakingCorrections(aggregated.speakingCorrections);
    setSpeakingStrengths(aggregated.speakingStrengths);
    setSpeakingSummary((prev) => ({
      ...aggregated.speakingSummary,
      teacherNote: prev.teacherNote, // Preserve manual teacher note
    }));
    if (aggregated.speakingRetryMission) {
      setSpeakingRetryMission(aggregated.speakingRetryMission);
    }

    setIsDirty(true);
  }, [selectedSegment, formKind, formCriterion, formCategory, formCorrection, formNote, speakingAnnotations]);

  const handleDeleteSentenceAnnotation = useCallback((segmentId: string) => {
    const updatedAnnotations = speakingAnnotations.filter((a) => a.segmentId !== segmentId);
    setSpeakingAnnotations(updatedAnnotations);

    const aggregated = aggregateSpeakingAnnotations(updatedAnnotations);
    setSpeakingCorrections(aggregated.speakingCorrections);
    setSpeakingStrengths(aggregated.speakingStrengths);
    setSpeakingSummary((prev) => ({
      ...aggregated.speakingSummary,
      teacherNote: prev.teacherNote,
    }));
    setSpeakingRetryMission(aggregated.speakingRetryMission);

    if (selectedSegment?.segmentId === segmentId) {
      setFormCorrection("");
      setFormNote("");
    }
    setIsDirty(true);
  }, [speakingAnnotations, selectedSegment]);
  // ────────────────────────────────────────────────────────────────────────────


  const handleSave = async (finalize: boolean) => {
    if (!questionId && answers.length === 0) return;

    const bandStr = calculateSpeakingBand(criteriaScores);
    const score = parseFloat(bandStr) || 0;

    const enrichedCriteriaScores: CriteriaScores = {
      ...criteriaScores,
      ...(selectedEvidenceTagIds.size > 0
        ? { speakingTags: Array.from(selectedEvidenceTagIds) }
        : {}),
    };

    // Synchronize speaking evidence tags via API
    if (submissionId && allEvidenceTags.length > 0) {
      const syncItems = Array.from(selectedEvidenceTagIds).map((tagId) => {
        const tagDef = allEvidenceTags.find((t) => t.id === tagId);
        return {
          tagId,
          criterion: (tagDef?.criterion || "PR") as SpeakingCriterion,
        };
      });
      speakingEvidenceApi.syncAssessmentEvidence(submissionId, syncItems).catch((err) => {
        console.error("[SpeakingGrader] Failed to sync evidence tags:", err);
      });
    }

    // Build the speaking 4–3–1 JSON payload
    const feedbackJson = serializeStructuredFeedback({
      criteriaScores: enrichedCriteriaScores,
      revisionRequired,
      primaryErrorCategory: revisionRequired ? primaryErrorCategory : null,
      speakingAnnotations: speakingAnnotations.length > 0 ? speakingAnnotations : undefined,
      speakingCorrections: speakingCorrections.length > 0 ? speakingCorrections : undefined,
      speakingStrengths: speakingStrengths.length > 0 ? speakingStrengths : undefined,
      speakingSummary: (speakingSummary.strongestPoint || speakingSummary.mainArea || speakingSummary.nextTarget || speakingSummary.teacherNote)
        ? speakingSummary
        : undefined,
      speakingRetryMission: speakingRetryMission?.originalSentence ? speakingRetryMission : undefined,
    });


    const gradesPayload = answers.length > 0
      ? answers.map((ans, idx) => {
          if (idx === activeAnswerIndex || answers.length === 1) {
            return {
              answerId: ans.id,
              questionId: ans.questionId,
              score,
              feedback: feedbackJson,
              criteriaScores: enrichedCriteriaScores,
              primaryErrorCategory: revisionRequired ? primaryErrorCategory : null,
              revisionRequired,
              speakingCorrections: speakingCorrections.length > 0 ? speakingCorrections : undefined,
              speakingStrengths: speakingStrengths.length > 0 ? speakingStrengths : undefined,
              speakingSummary: speakingSummary,
              speakingRetryMission: speakingRetryMission,
            };
          }
          return {
            answerId: ans.id,
            questionId: ans.questionId,
            score: ans.score ?? score,
            feedback: ans.feedback || "",
          };
        })
      : [
          {
            answerId,
            questionId,
            score,
            feedback: feedbackJson,
            criteriaScores: enrichedCriteriaScores,
            primaryErrorCategory: revisionRequired ? primaryErrorCategory : null,
            revisionRequired,
            speakingCorrections: speakingCorrections.length > 0 ? speakingCorrections : undefined,
            speakingStrengths: speakingStrengths.length > 0 ? speakingStrengths : undefined,
            speakingSummary: speakingSummary,
            speakingRetryMission: speakingRetryMission,
          },
        ];

    await onGradeSubmit({
      grades: gradesPayload as any,
      totalScore: score > 0 ? score : undefined,
      options: {
        feedback: feedbackJson,
        primaryErrorCategory: revisionRequired ? primaryErrorCategory : null,
        revisionRequired,
        criteriaScores: enrichedCriteriaScores,
        finalize,
      } as any,
    });

    setIsDirty(false);
    setLastSavedTime(new Date());
  };




  if (!currentAnswer) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center text-sm text-slate-400 bg-white">
        <Mic className="h-10 w-10 text-slate-300 mb-2" />
        <p>Không tìm thấy bài làm Speaking nào trong bài nộp này.</p>
        {onBack && (
          <Button variant="outline" size="sm" onClick={onBack} className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-1.5" /> Quay lại danh sách
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="flex-1 bg-slate-50/50 flex flex-col h-full overflow-hidden">
      {/* Top Sticky Header */}
      <header className="px-5 py-3 border-b border-slate-200 bg-white flex items-center justify-between shrink-0 shadow-2xs z-10">
        <div className="flex items-center gap-3">
          {onBack && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 h-8 px-2.5 -ml-1 gap-1 text-xs font-semibold"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Quay lại</span>
            </Button>
          )}

          <div className="h-4 w-px bg-slate-200" />

          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900">{homeworkTitle}</span>
              <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 text-[11px] font-semibold">
                🎙️ Speaking
              </Badge>
              <Badge
                variant="outline"
                className={
                  submissionStatus === "GRADED"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200 text-[11px]"
                    : "bg-blue-50 text-blue-700 border-blue-200 text-[11px]"
                }
              >
                {submissionStatus === "GRADED" ? "Đã chấm điểm" : "Chờ chấm"}
              </Badge>
              {submissionStatus !== "GRADED" && submittedAt && (() => {
                const sla = calculateGradingSla(submittedAt, null, submissionStatus);
                const badgeClass = sla.status === "OVERDUE"
                  ? "bg-rose-50 text-rose-700 border-rose-200 text-[11px] font-bold"
                  : sla.status === "APPROACHING"
                  ? "bg-amber-50 text-amber-800 border-amber-300 text-[11px] font-bold"
                  : "bg-emerald-50 text-emerald-700 border-emerald-200 text-[11px] font-semibold";
                return (
                  <Badge variant="outline" className={badgeClass} title={`Nộp: ${sla.formattedSubmitted} • Hạn trả: ${sla.formattedDeadline}`}>
                    {sla.badgeText} (Hạn: {sla.formattedDeadline})
                  </Badge>
                );
              })()}
              {isDirty ? (
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-[10px]">
                  <Clock className="w-3 h-3 mr-1" /> Chưa lưu
                </Badge>
              ) : lastSavedTime ? (
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px]">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Đã lưu
                </Badge>
              ) : null}
            </div>

            <div className="text-xs text-slate-600 font-medium flex items-center gap-2 mt-0.5">
              <span>Học viên:</span>
              <span className="font-bold text-blue-700">{studentName}</span>
              <span>•</span>
              <span className="text-slate-700 font-bold">Overall Band: {overallBandPreview}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSave(false)}
            disabled={isSubmitting}
            className="h-8 text-xs font-bold gap-1.5 border-slate-300 text-slate-700 hover:bg-slate-100 shadow-2xs"
          >
            {isSubmitting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
            Lưu nháp
          </Button>

          <Button
            type="button"
            onClick={() => handleSave(true)}
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold h-8 text-xs px-3.5 shadow-xs gap-1.5"
          >
            {isSubmitting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
            Trả bài 🚀
          </Button>
        </div>
      </header>

      {/* Main Focus Layout: 68% Left (Prompt + Audio Player) | 32% Right (Grading Panel) */}
      <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* LEFT COLUMN (68%): PROMPT & AUDIO PLAYBACK */}
        <div className="lg:col-span-8 h-full overflow-y-auto p-6 space-y-6 bg-slate-50/50">
          {/* MULTI-PART SELECTOR TABS (If exam has multiple questions / parts) */}
          {answers.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-xs font-bold text-slate-500 mr-1 shrink-0">Chọn phần thi:</span>
              {answers.map((ans, idx) => {
                const hasAudio = !!(ans.audioUrl || AudioStorageService.isAudio(ans.answerText));
                const isSelected = idx === activeAnswerIndex;
                const partLabel = ans.questionTitle ? ans.questionTitle.replace(/<[^>]*>/g, " ").trim() : `Part ${idx + 1}`;
                return (
                  <button
                    key={ans.questionId || idx}
                    type="button"
                    onClick={() => setActiveAnswerIndex(idx)}
                    className={cn(
                      "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border shadow-2xs shrink-0 cursor-pointer",
                      isSelected
                        ? "bg-orange-600 text-white border-orange-600 shadow-orange-500/20"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                    )}
                  >
                    <span>{partLabel}</span>
                    {hasAudio ? (
                      <span
                        className={cn("w-2 h-2 rounded-full", isSelected ? "bg-white" : "bg-emerald-500")}
                        title="Đã có file ghi âm"
                      />
                    ) : (
                      <span
                        className={cn("w-1.5 h-1.5 rounded-full", isSelected ? "bg-orange-300" : "bg-slate-300")}
                        title="Chưa có file ghi âm"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* ĐỀ BÀI (Speaking Question / Cue Card) */}
          <Card className="border border-amber-200 shadow-xs rounded-2xl p-5 bg-amber-50/60 space-y-3 font-sans">
            <div className="flex items-center justify-between border-b border-amber-100/80 pb-2.5">
              <span className="text-xs font-extrabold text-amber-900 flex items-center gap-1.5 uppercase tracking-wider">
                <BookOpen className="h-4 w-4 text-orange-600" />
                {(currentAnswer?.questionTitle ? currentAnswer.questionTitle.replace(/<[^>]*>/g, " ").trim() : "") || "Yêu cầu Đề bài (Speaking Prompt)"}
              </span>
              <Badge variant="outline" className="bg-amber-100/70 text-amber-800 border-amber-200 text-[11px] font-bold">
                Đề bài
              </Badge>
            </div>

            {/* Instructions */}
            {currentAnswer?.instructions && (
              <div className="text-xs text-slate-700 font-normal bg-white/90 p-3 rounded-xl border border-amber-100 leading-relaxed shadow-2xs">
                <RichContent html={currentAnswer.instructions} />
              </div>
            )}

            {/* Question Text */}
            {currentAnswer?.questionText && (
              <div className="text-sm text-slate-900 leading-relaxed font-normal bg-white/60 p-3.5 rounded-xl border border-amber-100/70">
                <RichContent html={currentAnswer.questionText} />
              </div>
            )}

            {/* Prompt image if present */}
            {currentAnswer?.imageUrl && (
              <div className="pt-2 border-t border-amber-100 flex justify-center bg-white/90 p-3 rounded-xl border border-amber-100">
                <img
                  src={formatStorageUrl(currentAnswer.imageUrl)}
                  alt="Speaking Cue Card Diagram / Image"
                  className="max-h-96 w-auto object-contain rounded-lg border shadow-2xs"
                />
              </div>
            )}

            {/* Cue Card / Passage */}
            {currentAnswer?.passage && (
              <div className="pt-2 border-t border-amber-100">
                <div className="text-sm text-slate-800 leading-relaxed max-h-96 overflow-y-auto bg-white/90 p-3.5 rounded-xl border border-amber-100">
                  <RichContent html={currentAnswer.passage} variant="passage" />
                </div>
              </div>
            )}
          </Card>

          {/* BẢN THU ÂM & BÓC BĂNG ĐỐI CHIẾU CỦA HỌC VIÊN */}
          <Card className="border border-slate-200 shadow-xs rounded-2xl p-6 bg-white space-y-4 font-sans">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-orange-600" />
                <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">
                  Bản Thu Âm & Bóc Băng Văn Bản (Speech-to-Text)
                </h3>
              </div>
              {resolvedAudioUrl ? (
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs font-semibold">
                  Audio & Transcript khả dụng
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-slate-100 text-slate-500 border-slate-200 text-xs">
                  Chưa nộp file âm thanh
                </Badge>
              )}
            </div>

            {resolvedAudioUrl ? (
              <div className="space-y-3">
                <SpeakingTranscriptViewer
                  audioUrl={resolvedAudioUrl}
                  initialTranscript={AudioStorageService.isAudio(currentAnswer?.answerText) ? undefined : currentAnswer?.answerText || undefined}
                  submissionId={submissionId}
                  answerId={answerId}
                  questionId={questionId}
                  onTranscriptEdited={(_updatedTranscript) => {
                    setIsDirty(true);
                  }}
                  annotationMode={true}
                  onAnnotateSegment={handleSelectSegment}
                  annotationBadges={derivedAnnotationBadges}
                />
                <p className="text-[11px] text-slate-500 text-center font-sans">
                  💡 Click vào câu để tua audio · Bấm <strong>Gắn lỗi</strong> để chẩn đoán câu tương ứng
                </p>

              </div>
            ) : (
              <div className="p-10 text-center text-xs text-slate-400 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 flex flex-col items-center gap-2">
                <FileAudio className="h-10 w-10 text-slate-300" />
                <span>Học viên chưa nộp file ghi âm cho bài tập này.</span>
              </div>
            )}
          </Card>
        </div>

        {/* RIGHT COLUMN (32%): SENTENCE DIAGNOSTIC PANEL & 4–3–1 AGGREGATOR */}
        <aside className="lg:col-span-4 h-full overflow-y-auto p-5 border-l border-slate-200 bg-white space-y-4 shadow-xs">
          {/* Step 1: IELTS Rubric Card (4 criteria + Overall) */}
          <SpeakingRubricCard
            scores={criteriaScores}
            onChange={(updated) => {
              setCriteriaScores(updated);
              setIsDirty(true);
            }}
            disabled={isSubmitting}
          />

          {/* Step 2: Sentence-Level Diagnosis Panel */}
          <Card className="border border-blue-200 shadow-2xs rounded-xl p-4 space-y-3 bg-white font-sans">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-blue-600" />
                <span className="text-xs font-bold text-slate-900">Chẩn Đoán Theo Câu</span>
              </div>
              <Badge variant="outline" className="text-[11px] font-semibold bg-blue-50 text-blue-700 border-blue-200">
                {speakingAnnotations.length} câu đã gắn
              </Badge>
            </div>

            {selectedSegment ? (
              <div className="space-y-3 animate-in fade-in duration-150">
                {/* Active Sentence Quote & Timestamp */}
                <div className="p-3 bg-blue-50/60 rounded-lg border border-blue-100 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-blue-800 bg-white px-1.5 py-0.5 rounded border border-blue-200">
                      {Math.floor(selectedSegment.startMs / 1000)}s – {Math.floor(selectedSegment.endMs / 1000)}s
                    </span>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelectedSegment(null)}
                      className="h-5 px-1.5 text-[10px] text-slate-500 hover:text-slate-800"
                    >
                      Bỏ chọn câu
                    </Button>
                  </div>
                  <p className="text-xs text-slate-800 font-medium italic leading-relaxed">
                    "{selectedSegment.text}"
                  </p>
                </div>

                {/* Kind Selector: ISSUE vs STRENGTH */}
                <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-lg text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setFormKind("ISSUE");
                      setFormCriterion("GRA");
                      setFormCategory("TENSE");
                    }}
                    className={cn(
                      "py-1.5 rounded-md font-bold text-xs transition-all flex items-center justify-center gap-1",
                      formKind === "ISSUE"
                        ? "bg-white text-rose-700 shadow-xs border border-rose-200"
                        : "text-slate-600 hover:text-slate-900"
                    )}
                  >
                    <span>⚠ Lỗi cần sửa</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFormKind("STRENGTH");
                      setFormCriterion("PR");
                      setFormCategory("pr_ending_sound");
                    }}
                    className={cn(
                      "py-1.5 rounded-md font-bold text-xs transition-all flex items-center justify-center gap-1",
                      formKind === "STRENGTH"
                        ? "bg-white text-emerald-700 shadow-xs border border-emerald-200"
                        : "text-slate-600 hover:text-slate-900"
                    )}
                  >
                    <span>✓ Điểm sáng</span>
                  </button>
                </div>

                {/* Criterion selector (FC, LR, GRA, PR) */}
                <div>
                  <Label className="text-[10px] font-bold text-slate-600 mb-1 block">Tiêu chí IELTS</Label>
                  <div className="grid grid-cols-4 gap-1">
                    {(["PR", "FC", "LR", "GRA"] as SpeakingCriterion[]).map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => {
                          setFormCriterion(c);
                          if (formKind === "ISSUE") {
                            setFormCategory(CATEGORIES_BY_CRITERION[c][0]);
                          } else {
                            const firstStr = PRESET_STRENGTH_TAGS.find((t) => t.criterion === c);
                            setFormCategory(firstStr ? firstStr.id : "pr_ending_sound");
                          }
                        }}
                        className={cn(
                          "py-1 rounded-md text-xs font-bold border transition-all",
                          formCriterion === c
                            ? "bg-blue-600 text-white border-blue-600 shadow-2xs"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                        )}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category selector */}
                <div>
                  <Label className="text-[10px] font-bold text-slate-600 mb-1 block">
                    {formKind === "ISSUE" ? "Loại lỗi quan sát được" : "Năng lực tích cực (Điểm sáng)"}
                  </Label>
                  {formKind === "ISSUE" ? (
                    <Select
                      value={formCategory}
                      onValueChange={(val) => setFormCategory(val)}
                    >
                      <SelectTrigger className="h-8 text-xs font-medium bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES_BY_CRITERION[formCriterion].map((cat) => (
                          <SelectItem key={cat} value={cat} className="text-xs">
                            {CATEGORY_LABEL_VI[cat] || cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Select
                      value={formCategory}
                      onValueChange={(val) => setFormCategory(val)}
                    >
                      <SelectTrigger className="h-8 text-xs font-medium bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {PRESET_STRENGTH_TAGS.filter((t) => t.criterion === formCriterion).map((tag) => (
                          <SelectItem key={tag.id} value={tag.id} className="text-xs">
                            {tag.labelVi}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>

                {/* Correction input (Only needed for ISSUE) */}
                {formKind === "ISSUE" && (
                  <div>
                    <Label className="text-[10px] font-bold text-slate-600 mb-1 block">
                      Cách cải thiện (câu chuẩn hơn, tùy chọn)
                    </Label>
                    <Input
                      value={formCorrection}
                      onChange={(e) => setFormCorrection(e.target.value)}
                      placeholder="Gõ cách nói đúng (VD: He is Son Tung MTP...)"
                      className="h-8 text-xs"
                    />
                  </div>
                )}

                {/* Optional Note */}
                <div>
                  <Label className="text-[10px] font-semibold text-slate-500 mb-1 block">
                    Ghi chú ngắn (tùy chọn)
                  </Label>
                  <Input
                    value={formNote}
                    onChange={(e) => setFormNote(e.target.value)}
                    placeholder="Lưu ý cụ thể cho học viên..."
                    className="h-7 text-xs"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-1">
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleSaveSentenceAnnotation}
                    className="flex-1 h-8 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white gap-1"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Lưu nhận xét câu này
                  </Button>
                  {speakingAnnotations.some((a) => a.segmentId === selectedSegment.segmentId) && (
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteSentenceAnnotation(selectedSegment.segmentId)}
                      className="h-8 text-xs text-rose-600 hover:bg-rose-50 px-2.5"
                      title="Xóa nhận xét của câu này"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-5 text-center text-xs text-slate-500 bg-slate-50/70 rounded-xl border border-dashed border-slate-200 space-y-2">
                <p className="font-semibold text-slate-700">Chưa chọn câu nào</p>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Nhấp vào bất kỳ câu nào trong bản bóc băng bên trái để bắt đầu gắn nhãn lỗi hoặc điểm sáng.
                </p>
              </div>
            )}

            {/* List of diagnosed sentences */}
            {speakingAnnotations.length > 0 && (
              <div className="pt-2 border-t border-slate-100 space-y-1.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Các câu đã chẩn đoán:</p>
                <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
                  {speakingAnnotations.map((ann) => {
                    const isStrength = ann.kind === "STRENGTH";
                    const isSelected = selectedSegment?.segmentId === ann.segmentId;
                    const catLabel = isStrength
                      ? (PRESET_STRENGTH_TAGS.find((t) => t.id === ann.category)?.labelVi || ann.category)
                      : (CATEGORY_LABEL_VI[ann.category as SpeakingDiagnosticCategory] || ann.category);

                    return (
                      <div
                        key={ann.segmentId}
                        onClick={() => handleSelectSegment({ segmentId: ann.segmentId, startMs: ann.startMs, endMs: ann.endMs, text: ann.text })}
                        className={cn(
                          "p-2 rounded-lg border text-xs cursor-pointer flex items-center justify-between gap-2 transition-colors",
                          isSelected
                            ? "bg-blue-50 border-blue-400"
                            : "bg-white hover:bg-slate-50 border-slate-200"
                        )}
                      >
                        <div className="flex items-center gap-1.5 overflow-hidden">
                          <span className={cn(
                            "w-2 h-2 rounded-full shrink-0",
                            isStrength ? "bg-emerald-500" : "bg-rose-500"
                          )} />
                          <span className="font-mono text-[10px] text-slate-500 shrink-0">
                            {Math.floor(ann.startMs / 1000)}s
                          </span>
                          <span className="font-semibold text-[11px] truncate text-slate-800">
                            {ann.criterion} · {catLabel}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 shrink-0">Chỉnh sửa</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </Card>

          {/* Step 3: 4–3–1 Auto-Summary Engine (Collapsible Preview) */}
          <Card className="border border-slate-200 shadow-2xs rounded-xl p-3.5 space-y-3 bg-white font-sans">
            <button
              type="button"
              onClick={() => setSummaryExpanded(!summaryExpanded)}
              className="w-full flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-1.5">
                <Target className="h-4 w-4 text-orange-600" />
                <span className="text-xs font-bold text-slate-900">Bản Tổng Hợp 4–3–1 (Tự sinh từ câu)</span>
              </div>
              <div className="flex items-center gap-1 text-slate-400">
                <span className="text-[11px] text-slate-500">{summaryExpanded ? "Thu gọn" : "Xem chi tiết"}</span>
                {summaryExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
              </div>
            </button>

            {summaryExpanded && (
              <div className="space-y-3 pt-2 border-t border-slate-100 animate-in fade-in">
                {/* 3 Priority Issues */}
                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-rose-600">3 Lỗi Ưu Tiên (P1 / P2 / P3):</p>
                  {speakingCorrections.length > 0 ? (
                    speakingCorrections.map((corr) => (
                      <div key={corr.priority} className="p-2 rounded-lg bg-rose-50/50 border border-rose-200 text-xs space-y-1">
                        <div className="flex items-center gap-1.5">
                          <Badge className="h-4 px-1 text-[9px] bg-rose-600 text-white font-extrabold">{corr.priority}</Badge>
                          <span className="font-bold text-slate-800 text-[11px]">{corr.criterion} · {CATEGORY_LABEL_VI[corr.category] || corr.category}</span>
                        </div>
                        <p className="text-[11px] text-slate-600">❌ "{corr.studentSaid}"</p>
                        {corr.correction && (
                          <p className="text-[11px] text-emerald-700 font-medium">✅ "{corr.correction}"</p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-[11px] text-slate-400 italic">Chưa gắn lỗi nào từ transcript.</p>
                  )}
                </div>

                {/* 1 Retry Mission */}
                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-orange-600">1 Nhiệm Vụ Luyện Lại (Retry Mission):</p>
                  {speakingRetryMission ? (
                    <div className="p-2.5 rounded-lg bg-orange-50/60 border border-orange-200 text-xs space-y-1">
                      <p className="text-[11px] text-slate-700"><strong>Câu gốc:</strong> "{speakingRetryMission.originalSentence}"</p>
                      <p className="text-[11px] text-emerald-800"><strong>Mục tiêu:</strong> "{speakingRetryMission.targetSentence}"</p>
                      <p className="text-[10px] text-orange-800 italic">🎯 {speakingRetryMission.missionPrompt}</p>
                    </div>
                  ) : (
                    <p className="text-[11px] text-slate-400 italic">Sẽ tự động sinh từ lỗi ưu tiên P1.</p>
                  )}
                </div>

                {/* Optional Teacher Note */}
                <div>
                  <Label className="text-[10px] font-semibold text-slate-500 mb-0.5 flex items-center justify-between">
                    <span>Ghi chú thêm của Giáo viên (tùy chọn, tối đa 300 ký tự)</span>
                    <span className={cn("text-[10px]", (speakingSummary.teacherNote?.length || 0) > 280 ? "text-rose-500" : "text-slate-400")}>
                      {speakingSummary.teacherNote?.length || 0}/300
                    </span>
                  </Label>
                  <Textarea
                    value={speakingSummary.teacherNote || ""}
                    onChange={(e) => {
                      if (e.target.value.length <= 300) {
                        setSpeakingSummary((prev) => ({ ...prev, teacherNote: e.target.value }));
                        setIsDirty(true);
                      }
                    }}
                    placeholder="Thêm lưu ý riêng cho học viên..."
                    className="min-h-[50px] text-xs"
                    maxLength={300}
                  />
                </div>
              </div>
            )}
          </Card>

          {/* YÊU CẦU LÀM LẠI BÀI (ATTEMPT 2) */}
          <Card className="border border-amber-200/80 rounded-2xl p-4 bg-amber-50/40 space-y-3 font-sans shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                  Yêu cầu học viên thu âm lại (Attempt 2)
                </Label>
                <p className="text-[11px] text-amber-800/80">
                  Bật nếu học viên cần nộp bản thu âm mới trước khi tính hoàn thành.
                </p>
              </div>
              <Switch
                checked={revisionRequired}
                onCheckedChange={(checked) => {
                  setRevisionRequired(checked);
                  setIsDirty(true);
                }}
                disabled={isSubmitting}
              />
            </div>

            {revisionRequired && (
              <div className="space-y-2 pt-2 border-t border-amber-200/60">
                <Label className="text-[11px] font-bold text-amber-900">
                  Nhóm lỗi chính cần khắc phục (Primary Error):
                </Label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { key: "STRUCTURE", label: "Cấu trúc & Trôi chảy (FC)" },
                    { key: "CONCEPT", label: "Ý tưởng & Logic (Idea)" },
                    { key: "EXPRESSION", label: "Từ vựng (Lexical)" },
                    { key: "GRAMMAR", label: "Phát âm & Ngữ pháp (PR/GRA)" },
                  ].map((cat) => (
                    <button
                      key={cat.key}
                      type="button"
                      onClick={() => {
                        setPrimaryErrorCategory(cat.key as ErrorCategory);
                        setIsDirty(true);
                      }}
                      className={`p-2 rounded-lg text-[10px] font-bold text-left transition-all border ${
                        primaryErrorCategory === cat.key
                          ? "bg-amber-600 text-white border-amber-600 shadow-2xs"
                          : "bg-white text-slate-700 border-amber-200/80 hover:bg-amber-100/50"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </aside>

      </div>
    </div>
  );
}

