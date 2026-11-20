import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { ALL_READING_CASES } from "@/data/readingCases/caseRegistry";
import { getParagraphTranslationVi } from "@/data/readingCases/caseTranslationsVi";
import { CaseGlossaryItem, VocabularyTerm } from "@/features/reading/types";
import { CaseAutopsyView } from "@/features/reading/components/CaseAutopsyView";
import { CaseGlossaryPanel } from "@/features/reading/components/CaseGlossaryPanel";
import { NextReadsSection } from "@/features/reading/components/NextReadsSection";
import {
  lookupWord,
  isContentWord,
} from "@/features/reading/services/readingDictionary";
import {
  extractCaseGlossary,
  getCompiledCasePhrases,
} from "@/features/reading/services/caseGlossaryService";
import { sanitizeLearnerText } from "@/features/reading/services/contentSanitizer";
import { CrimeSceneBlueprint } from "@/features/reading/components/CrimeSceneBlueprint";
import { ReadlangExplorationSidebar } from "@/features/reading/components/ReadlangExplorationSidebar";
import { WritingDebateChamber } from "@/features/reading/components/WritingDebateChamber";
import { useReadingProgress } from "@/features/reading/hooks/useReadingProgress";
import { Button } from "@/components/ui/button";
import {
  ReadingSettingsPopover,
  ReaderSettings,
} from "@/features/reading/components/ReadingSettingsPopover";
import "@/features/reading/reading-container.css";
import {
  FileText,
  UserCheck,
  Cpu,
  HelpCircle,
  CheckCircle,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Layers,
  Map as MapIcon,
  BookOpen,
  BookMarked,
  Languages,
  Check,
  X,
  Volume2,
} from "lucide-react";
import { SEO } from "@/components/common/SEO";

export default function ReadingCasePage() {
  const { caseId } = useParams<{ caseId?: string }>();

  const activeCaseId = caseId && ALL_READING_CASES[caseId] ? caseId : "case-001";
  const [selectedCaseId, setSelectedCaseId] = useState<string>(activeCaseId);

  const readingCase = ALL_READING_CASES[selectedCaseId] || ALL_READING_CASES["case-001"];

  // Reading Progress Tracker (scroll %, tasks completed, read/unread toggle)
  const {
    progressMap,
    updateScrollProgress,
    updateTasksProgress,
    toggleReadStatus,
  } = useReadingProgress();

  // Reader Settings (Font size, line height, font family, theme, alignment, opt-in readingMode)
  const [readerSettings, setReaderSettings] = useState<ReaderSettings>(() => {
    try {
      const saved = localStorage.getItem("nextband_reading_settings");
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          fontSize: parsed.fontSize || 16,
          lineHeight: parsed.lineHeight || "relaxed",
          fontFamily: parsed.fontFamily || "sans",
          theme: parsed.theme || "light",
          textAlign: parsed.textAlign || "left",
          readingMode: parsed.readingMode === "bilingual" ? "bilingual" : "english",
        };
      }
    } catch {}
    return {
      fontSize: 16,
      lineHeight: "relaxed",
      fontFamily: "sans",
      theme: "light",
      textAlign: "left",
      readingMode: "english",
    };
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleUpdateReaderSettings = (updates: Partial<ReaderSettings>) => {
    setReaderSettings((prev) => {
      const next = { ...prev, ...updates };
      try {
        localStorage.setItem("nextband_reading_settings", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const readingMode = readerSettings.readingMode ?? "english";

  // Hover Context Teaser State
  const [isIntroHovered, setIsIntroHovered] = useState(false);

  // Active source filter (or all)
  const [activeSourceId, setActiveSourceId] = useState<string>("all");

  // Saved Terms (local UI state; no backend sync per scope)
  const [savedTerms, setSavedTerms] = useState<string[]>([]);

  // Investigation Tasks State
  const [taskAnswers, setTaskAnswers] = useState<Record<string, string>>({});
  const [selectedEvidenceSentence, setSelectedEvidenceSentence] = useState<string | null>(null);

  // Final Deduction State
  const [finalHypothesis, setFinalHypothesis] = useState<string | null>(null);
  const [selectedEvidenceIds, setSelectedEvidenceIds] = useState<string[]>([]);

  // Page View State: "investigating" | "autopsy"
  const [viewState, setViewState] = useState<"investigating" | "autopsy">("investigating");

  // Active translated words map (token key -> VocabularyTerm)
  const [activeTranslatedWords, setActiveTranslatedWords] = useState<Record<string, VocabularyTerm>>({});

  // Per-paragraph quick translation toggle in English-only mode
  const [expandedParagraphTranslations, setExpandedParagraphTranslations] = useState<Record<string, boolean>>({});
  const [flashedParagraphId, setFlashedParagraphId] = useState<string | null>(null);

  // Right Panel Tab State: "tasks" | "glossary" | "explain"
  const [rightPanelTab, setRightPanelTab] = useState<"tasks" | "glossary" | "explain">("explain");
  const [activeExplainTerm, setActiveExplainTerm] = useState<VocabularyTerm | null>(null);
  const [activeGlossaryKey, setActiveGlossaryKey] = useState<string | null>(null);

  // Non-hijacking Quick Peek Bar when user clicks a word while on Góc Chiêm Nghiệm
  const [quickPeekTerm, setQuickPeekTerm] = useState<VocabularyTerm | null>(null);

  // Mobile (< lg) section switcher
  const [mobileSection, setMobileSection] = useState<"article" | "tasks" | "glossary" | "explain">("article");

  const leftScrollRef = useRef<HTMLDivElement | null>(null);
  const flashTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const targetCaseId = caseId && ALL_READING_CASES[caseId] ? caseId : "case-001";
    if (targetCaseId !== selectedCaseId) {
      setSelectedCaseId(targetCaseId);
      setActiveSourceId("all");
      setTaskAnswers({});
      setSelectedEvidenceSentence(null);
      setFinalHypothesis(null);
      setSelectedEvidenceIds([]);
      setViewState("investigating");
      setActiveExplainTerm(null);
      setActiveGlossaryKey(null);
      setQuickPeekTerm(null);
      setActiveTranslatedWords({});
      setExpandedParagraphTranslations({});
      setFlashedParagraphId(null);
      setRightPanelTab("tasks");
      setMobileSection("article");
    }
  }, [caseId, selectedCaseId]);

  useEffect(() => {
    return () => {
      if (flashTimerRef.current) {
        window.clearTimeout(flashTimerRef.current);
      }
    };
  }, []);

  // Pre-compile glossary and phrase matchers once per case
  const glossaryData = useMemo(() => extractCaseGlossary(readingCase), [readingCase]);
  const compiledPhrases = useMemo(() => getCompiledCasePhrases(readingCase), [readingCase]);

  const glossaryLookupByTerm = useMemo(() => {
    const map = new Map<string, CaseGlossaryItem>();
    for (const item of glossaryData.allMatched) {
      map.set(item.key, item);
      map.set(item.term.toLowerCase(), item);
      map.set(item.matchedForm.toLowerCase(), item);
    }
    return map;
  }, [glossaryData]);

  // Completed tasks tracking
  const completedTasksCount =
    (taskAnswers["task-01"] ? 1 : 0) +
    (taskAnswers["task-02"] ? 1 : 0) +
    (taskAnswers["task-03"] ? 1 : 0) +
    (selectedEvidenceSentence ? 1 : 0);

  useEffect(() => {
    if (completedTasksCount > 0) {
      updateTasksProgress(selectedCaseId, completedTasksCount);
    }
  }, [completedTasksCount, selectedCaseId, updateTasksProgress]);

  // Track scroll progress on mobile window when left container does not scroll independently
  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.innerWidth >= 1024 || viewState !== "investigating") return;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 50) return;
      const pct = Math.min(100, Math.max(0, Math.round((window.scrollY / docHeight) * 100)));
      updateScrollProgress(selectedCaseId, pct);
    };
    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, [selectedCaseId, updateScrollProgress, viewState]);

  const handleDesktopArticleScroll = useCallback(() => {
    const el = leftScrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollHeight - el.clientHeight;
    if (maxScroll <= 40) return;
    const pct = Math.min(100, Math.max(0, Math.round((el.scrollTop / maxScroll) * 100)));
    updateScrollProgress(selectedCaseId, pct);
  }, [selectedCaseId, updateScrollProgress]);

  const handleWordClick = (e: React.MouseEvent, termObj: VocabularyTerm, wordKey?: string) => {
    e.stopPropagation();

    // Pronounce single clicked word cleanly
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(termObj.term);
      utterance.lang = "en-US";
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }

    // Preserve signature floating Vietnamese pill above the clicked word
    const key = wordKey || termObj.term.toLowerCase();
    const wasTranslated = Boolean(activeTranslatedWords[key]);
    setActiveTranslatedWords((prev) => {
      if (prev[key]) {
        const next = { ...prev };
        delete next[key];
        return next;
      }
      return { ...prev, [key]: termObj };
    });

    const normalizedTerm = termObj.term.trim().toLowerCase();
    const matchedGlossaryItem =
      glossaryLookupByTerm.get(normalizedTerm) ||
      glossaryData.allMatched.find(
        (g) =>
          g.key === normalizedTerm ||
          g.matchedForm.toLowerCase() === normalizedTerm
      );

    setActiveExplainTerm(termObj);
    setActiveGlossaryKey(matchedGlossaryItem ? matchedGlossaryItem.key : null);

    // Two-tier lookup without hijacking "Góc Chiêm Nghiệm"
    if (rightPanelTab === "tasks") {
      setQuickPeekTerm(wasTranslated ? null : termObj);
    } else if (rightPanelTab === "glossary") {
      if (!matchedGlossaryItem) {
        setQuickPeekTerm(wasTranslated ? null : termObj);
      } else {
        setQuickPeekTerm(null);
      }
    } else {
      setQuickPeekTerm(null);
    }
  };

  const handleJumpToParagraphFromGlossary = (item: CaseGlossaryItem) => {
    if (activeSourceId !== "all" && activeSourceId !== item.sourceId) {
      setActiveSourceId("all");
    }
    setActiveGlossaryKey(item.key);
    setActiveExplainTerm(item.termData);
    setMobileSection("article");

    window.requestAnimationFrame(() => {
      const paraEl = document.getElementById(`para-${item.paragraphId}`);
      if (paraEl) {
        if (typeof paraEl.scrollIntoView === "function") {
          paraEl.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        // Auto-reveal signature floating gloss on the matching word/phrase in that paragraph
        const candidates = paraEl.querySelectorAll<HTMLElement>("[data-term-key]");
        const targetLower = item.term.trim().toLowerCase();
        const formLower = item.matchedForm.trim().toLowerCase();
        for (const node of candidates) {
          const canon = (node.dataset.termCanonical || "").toLowerCase();
          const text = (node.textContent || "").trim().toLowerCase();
          if (canon === targetLower || text === formLower || text === targetLower) {
            const foundKey = node.dataset.termKey;
            if (foundKey) {
              setActiveTranslatedWords((prev) => ({
                ...prev,
                [foundKey]: item.termData,
              }));
            }
            break;
          }
        }
      }

      setFlashedParagraphId(item.paragraphId);
      if (flashTimerRef.current) {
        window.clearTimeout(flashTimerRef.current);
      }
      flashTimerRef.current = window.setTimeout(() => {
        setFlashedParagraphId(null);
      }, 2100);
    });
  };

  const handleInspectDeepFromGlossary = (item: CaseGlossaryItem) => {
    setActiveGlossaryKey(item.key);
    setActiveExplainTerm(item.termData);
    setQuickPeekTerm(null);
    setRightPanelTab("explain");
    setMobileSection("explain");
  };

  const handleSaveTerm = (term: string) => {
    setSavedTerms((prev) =>
      prev.includes(term) ? prev.filter((t) => t !== term) : [...prev, term]
    );
  };

  const handleSentenceClick = (sentenceText: string) => {
    setSelectedEvidenceSentence(sentenceText);
  };

  const toggleParagraphTranslation = (paragraphId: string) => {
    setExpandedParagraphTranslations((prev) => ({
      ...prev,
      [paragraphId]: !prev[paragraphId],
    }));
  };

  const toggleEvidenceId = (evId: string) => {
    setSelectedEvidenceIds((prev) =>
      prev.includes(evId) ? prev.filter((id) => id !== evId) : [...prev, evId]
    );
  };

  // Check if all 4 tasks are completed
  const isAllTasksCompleted =
    Boolean(taskAnswers["task-01"]) &&
    Boolean(taskAnswers["task-02"]) &&
    Boolean(taskAnswers["task-03"]) &&
    Boolean(selectedEvidenceSentence);

  const canSubmitAutopsy =
    isAllTasksCompleted &&
    Boolean(finalHypothesis) &&
    selectedEvidenceIds.length > 0;

  const handleReset = () => {
    setTaskAnswers({});
    setSelectedEvidenceSentence(null);
    setFinalHypothesis(null);
    setSelectedEvidenceIds([]);
    setActiveTranslatedWords({});
    setQuickPeekTerm(null);
    setViewState("investigating");
  };

  // Helper to parse a sentence into tokens where all content words and multi-word idioms are clickable
  const renderSentenceWords = (sentence: string, sentenceIdx: number, paragraphId: string) => {
    // 1. Identify multi-word phrases and protect them using pre-compiled matchers
    const phraseMatches: { start: number; end: number; phrase: string }[] = [];

    for (const matcher of compiledPhrases) {
      matcher.regex.lastIndex = 0;
      let match;
      while ((match = matcher.regex.exec(sentence)) !== null) {
        phraseMatches.push({
          start: match.index,
          end: match.index + match[0].length,
          phrase: match[0],
        });
      }
    }

    // Sort non-overlapping phrases
    phraseMatches.sort((a, b) => a.start - b.start);
    const filteredPhrases: typeof phraseMatches = [];
    let lastEnd = 0;
    for (const pm of phraseMatches) {
      if (pm.start >= lastEnd) {
        filteredPhrases.push(pm);
        lastEnd = pm.end;
      }
    }

    // Break sentence into segments: either a multi-word phrase or a substring of single words
    const segments: { isPhrase: boolean; text: string }[] = [];
    let cursor = 0;
    for (const pm of filteredPhrases) {
      if (pm.start > cursor) {
        segments.push({ isPhrase: false, text: sentence.slice(cursor, pm.start) });
      }
      segments.push({ isPhrase: true, text: sentence.slice(pm.start, pm.end) });
      cursor = pm.end;
    }
    if (cursor < sentence.length) {
      segments.push({ isPhrase: false, text: sentence.slice(cursor) });
    }

    return segments.map((segment, segIdx) => {
      if (segment.isPhrase) {
        const termKey = `${paragraphId}-s${sentenceIdx}-p${segIdx}-${segment.text.toLowerCase()}`;
        const termData = lookupWord(segment.text, selectedCaseId, sentence) || {
          term: segment.text,
          pronunciation: "",
          pos: "",
          meaning_en: "",
          meaning_vi: segment.text,
          context_note: "",
        };
        const isTranslated = Boolean(activeTranslatedWords[termKey]);
        const shortVi = sanitizeLearnerText(
          (termData.meaning_vi || "")
            .replace(/^Từ vựng:\s*/i, "")
            .replace(/^Cụm từ:\s*/i, "")
            .split("/")[0]
            .replace(/\(.*?\)/g, "")
        ).normalize("NFC");

        const isCuratedChunk = Boolean(termData.collocation_pattern || termData.why_it_matters || termData.learning_value_score);

        return (
          <span
            key={`phrase-${segIdx}`}
            className="relative inline mx-0.5"
          >
            {isTranslated && (
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap text-[11px] font-semibold text-[#8B3A22] bg-[#FAF4ED] px-2.5 py-0.5 rounded-full border border-[#DFCBB9] shadow-sm animate-in fade-in zoom-in-95 duration-150 pointer-events-none flex items-center justify-center font-sans tracking-tight">
                {shortVi}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#FAF4ED] border-r border-b border-[#DFCBB9] rotate-45" />
              </span>
            )}
            <span
              data-term-key={termKey}
              data-term-canonical={termData.term.toLowerCase()}
              onClick={(e) => handleWordClick(e, termData, termKey)}
              className={`cursor-pointer transition-all duration-150 select-none ${
                isTranslated
                  ? "bg-[#F5E6DD] text-[#8B3A22] px-1.5 py-0.5 rounded-md font-semibold shadow-xs"
                  : isCuratedChunk
                  ? "border-b-[1.5px] border-dashed border-[#C86D51] text-[#2C2623] hover:bg-[#F8EBE5] hover:text-[#9C4124] hover:border-transparent px-0.5 rounded"
                  : "border-b border-dotted border-stone-300 text-[#2C2623] hover:text-stone-950 hover:border-stone-500 px-0.5"
              }`}
              title={isCuratedChunk ? "High-Value Lexical Chunk · Click để xem cấu trúc & chuyển giao" : "Click để tra cứu nghĩa"}
            >
              {segment.text}
            </span>
          </span>
        );
      }

      // For non-phrase text, split into words and non-word separators
      const tokens = segment.text.split(/(\b[\w'-]+\b)/g);
      return tokens.map((token, tokIdx) => {
        if (!token) return null;
        if (isContentWord(token)) {
          const termKey = `${paragraphId}-s${sentenceIdx}-t${segIdx}-${tokIdx}-${token.toLowerCase()}`;
          const termData = lookupWord(token, selectedCaseId, sentence) || {
            term: token,
            pronunciation: "",
            pos: "",
            meaning_en: "",
            meaning_vi: token,
            context_note: "",
          };
          const isTranslated = Boolean(activeTranslatedWords[termKey]);
          const shortVi = sanitizeLearnerText(
            (termData.meaning_vi || "")
              .replace(/^Từ vựng:\s*/i, "")
              .replace(/^Cụm từ:\s*/i, "")
              .split("/")[0]
              .replace(/\(.*?\)/g, "")
          ).normalize("NFC");

          return (
            <span
              key={`tok-${segIdx}-${tokIdx}`}
              className="relative inline mx-0.5"
            >
              {isTranslated && (
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap text-[11px] font-semibold text-[#8B3A22] bg-[#FAF4ED] px-2 py-0.5 rounded-full border border-[#DFCBB9] shadow-sm animate-in fade-in zoom-in-95 duration-150 pointer-events-none flex items-center justify-center font-sans tracking-tight">
                  {shortVi}
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#FAF4ED] border-r border-b border-[#DFCBB9] rotate-45" />
                </span>
              )}
              <span
                data-term-key={termKey}
                data-term-canonical={termData.term.toLowerCase()}
                onClick={(e) => handleWordClick(e, termData, termKey)}
                className={`cursor-pointer transition-all duration-150 select-none ${
                  isTranslated
                    ? "bg-[#F5E6DD] text-[#8B3A22] px-1 py-0.5 rounded font-semibold shadow-xs"
                    : "text-[#2C2623] hover:text-[#9C4124] hover:bg-stone-100/80 px-0.5 rounded border-b border-transparent hover:border-stone-300"
                }`}
                title="Click để tra cứu nghĩa"
              >
                {token}
              </span>
            </span>
          );
        }
        return <React.Fragment key={`tok-${segIdx}-${tokIdx}`}>{token}</React.Fragment>;
      });
    });
  };

  // Helper to render paragraph with clickable vocabulary words
  const renderInteractiveText = (text: string, paragraphId: string) => {
    // Break into sentences cleanly without splitting on decimals or abbreviations
    const sentences = text
      .split(/(?<=[.!?])\s+(?=[A-Z“"'])/)
      .filter((s) => s.trim().length > 0);

    return (
      <div className="space-y-2">
        {sentences.map((sentence, sIdx) => {
          const isSelectedEvidence = selectedEvidenceSentence === sentence;

          return (
            <p
              key={sIdx}
              onClick={() => handleSentenceClick(sentence)}
              className={`rounded-lg px-3 py-2 transition-all leading-[2.2] cursor-pointer ${
                isSelectedEvidence
                  ? "bg-amber-100/80 border-l-4 border-amber-500 text-amber-950 font-medium shadow-xs"
                  : "hover:bg-stone-100/80 border-l-4 border-transparent"
              }`}
            >
              {renderSentenceWords(sentence, sIdx, paragraphId)}
            </p>
          );
        })}
      </div>
    );
  };

  // Case Autopsy Screen (Post-submission)
  if (viewState === "autopsy") {
    return (
      <div className="min-h-screen bg-[#FAF8F5] text-stone-900 py-10 font-sans">
        <SEO
          title={`${readingCase.title} - The Case Autopsy | ARIS IELTS`}
          description="Báo cáo chẩn đoán năng lực đọc hiểu chuyên sâu"
        />
        <CaseAutopsyView
          readingCase={readingCase}
          taskAnswers={taskAnswers}
          selectedEvidenceSentence={selectedEvidenceSentence}
          finalHypothesis={finalHypothesis}
          selectedEvidenceIds={selectedEvidenceIds}
          onRetry={handleReset}
        />
      </div>
    );
  }

  const currentProgress = progressMap[selectedCaseId];
  const isCurrentRead = Boolean(currentProgress?.isRead);
  const currentScrollPercent = currentProgress?.scrollPercent ?? 0;

  return (
    <div className="min-h-screen lg:h-screen w-full bg-[#FBFBFA] text-stone-900 font-sans flex flex-col lg:overflow-hidden select-text">
      <SEO
        title={`${readingCase.title} - IELTS Reading Case Studio`}
        description="IELTS Academic Case Study Reading Studio - Dual-Panel Independent Investigation System"
      />

      {/* Top Fixed Case Header Bar + Slim Reading Progress Strip */}
      <header className="relative h-14 border-b border-stone-200/90 bg-[#FAF8F5] z-30 backdrop-blur-md px-4 sm:px-6 shadow-xs flex items-center justify-between shrink-0">
        <div className="w-full flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* Back to Reading Library */}
            <Link
              to="/reading"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-stone-100 text-stone-700 hover:text-stone-900 text-xs font-bold transition-all border border-stone-200/90 shrink-0 shadow-xs active:scale-95"
              title="Quay lại Thư viện bài đọc"
            >
              <ArrowLeft className="h-3.5 w-3.5 text-stone-500" />
              <span className="hidden sm:inline">Thư viện</span>
            </Link>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-xs sm:text-sm font-black text-stone-900 uppercase tracking-wide truncate max-w-[200px] sm:max-w-md lg:max-w-xl">
                  {readingCase.title}
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 shrink-0 hidden sm:inline-flex">
                  {readingCase.level.realm_name_vi} · Band {readingCase.level.ielts_band.toFixed(1)}
                </span>
              </div>
              <p className="text-[10px] text-stone-500 hidden md:block truncate">
                {readingCase.universe.name} · Thời lượng: ~{readingCase.estimated_minutes} phút
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Mark as Read Toggle Pill */}
            <button
              type="button"
              onClick={() => toggleReadStatus(selectedCaseId)}
              className={`flex items-center gap-1.5 h-8 px-2.5 sm:px-3 rounded-full border text-xs font-bold transition-all cursor-pointer active:scale-95 ${
                isCurrentRead
                  ? "bg-emerald-600 text-white border-emerald-700 shadow-xs hover:bg-emerald-700"
                  : "bg-white hover:bg-stone-100 text-stone-700 border-stone-300"
              }`}
              title={isCurrentRead ? "Bấm để bỏ đánh dấu đã đọc" : "Đánh dấu hoàn thành bài đọc này"}
            >
              {isCurrentRead ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Đã đọc</span>
                </>
              ) : (
                <>
                  <Check className="h-3.5 w-3.5 text-stone-500" />
                  <span className="hidden sm:inline">Đánh dấu đã đọc</span>
                </>
              )}
            </button>

            {/* Reading Typography & Size Settings Popover */}
            <ReadingSettingsPopover
              settings={readerSettings}
              onChange={handleUpdateReaderSettings}
              isOpen={isSettingsOpen}
              onToggle={() => setIsSettingsOpen((prev) => !prev)}
              onClose={() => setIsSettingsOpen(false)}
            />

            {/* Hover/Click Context Intro Teaser */}
            <div
              className="relative"
              onMouseEnter={() => setIsIntroHovered(true)}
              onMouseLeave={() => setIsIntroHovered(false)}
            >
              <button
                type="button"
                onClick={() => setIsIntroHovered((prev) => !prev)}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-sky-100/90 hover:bg-sky-200 text-sky-950 border border-sky-300 text-xs font-black transition-all shadow-xs cursor-pointer active:scale-95"
              >
                <Sparkles className="h-3.5 w-3.5 text-sky-700 animate-pulse" />
                <span className="hidden sm:inline">💡 Bối cảnh bài viết</span>
                <span className="sm:hidden">💡 Bối cảnh</span>
              </button>

              {/* Hover/Click Context Popover */}
              {isIntroHovered && (
                <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-2xl border border-sky-300 bg-[#FFFDF9] p-4 text-stone-900 shadow-2xl z-40 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center gap-2 border-b border-sky-200 pb-2 mb-2.5">
                    <span className="text-base">
                      {selectedCaseId === "case-001" ? "❄️" : selectedCaseId === "case-002" ? "📈" : "📖"}
                    </span>
                    <h4 className="text-xs sm:text-sm font-black text-sky-950 uppercase tracking-wide">
                      {readingCase.title}
                    </h4>
                  </div>
                  {selectedCaseId === "case-001" ? (
                    <div className="space-y-2 text-xs text-stone-700 leading-relaxed">
                      <p>
                        <strong className="text-sky-950 font-bold">03:15 AM tại Băng tầng Greenland:</strong> Một hồ nước băng trên mặt (Supraglacial Lake G-4) dung tích 8,000,000 m³ bất ngờ biến mất hoàn toàn trong 90 phút.
                      </p>
                      <div className="rounded-xl bg-sky-50 p-2.5 border border-sky-200 space-y-1 text-[11px] text-sky-950 font-medium">
                        <p>• Gờ băng xung quanh hồ nguyên vẹn — không hề có dòng nước tràn qua bề mặt.</p>
                        <p>• Xuất hiện khe nứt sâu 850m xuyên thủng toàn bộ dải băng tới lớp đá đáy.</p>
                        <p>• Cảm biến địa chấn ghi nhận sóng xung kích thẳng đứng lúc 03:12 AM.</p>
                      </div>
                      <CrimeSceneBlueprint isCompact className="mt-2" />
                      <p className="font-semibold text-stone-800 pt-1 text-[11px]">
                        Nước đã thoát đi theo cơ chế nào? Đối chiếu 3 nguồn tài liệu bên dưới để tìm ra lời giải thích khoa học chuẩn xác nhất!
                      </p>
                    </div>
                  ) : selectedCaseId === "case-002" ? (
                    <div className="space-y-2 text-xs text-stone-700 leading-relaxed">
                      <p>
                        <strong className="text-sky-950 font-bold">Fast Company Analysis:</strong> Trong kỷ nguyên AI tạo sinh có thể viết code và soạn kế hoạch kinh doanh trong vài giây, kỹ năng giao tiếp thấu cảm giữa người với người trở thành lợi thế cạnh tranh sống còn.
                      </p>
                      <div className="rounded-xl bg-sky-50 p-2.5 border border-sky-200 space-y-1 text-[11px] text-sky-950 font-medium">
                        <p>• Bằng chứng duy nhất Warren Buffett treo tại văn phòng: Chứng chỉ Dale Carnegie 1952.</p>
                        <p>• Khách hàng mua sự tự tin, nhà đầu tư rót vốn cho người sáng lập mà họ tin tưởng.</p>
                        <p>• 3 thói quen chuyển hóa: Tò mò thay vì định kiến, phản hồi liên tục, lắng nghe để thấu hiểu.</p>
                      </div>
                      <p className="font-semibold text-stone-800 pt-1 text-[11px]">
                        Đối chiếu các nguồn tư liệu để phân tích nguyên lý lãi kép của kỹ năng giao tiếp theo Warren Buffett!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2 text-xs text-stone-700 leading-relaxed">
                      <p>
                        <strong className="text-sky-950 font-bold">{readingCase.universe.name}:</strong> Phân tích chuyên sâu với góc nhìn học thuật đa chiều cùng {readingCase.sources.length} nguồn tài liệu đối chiếu.
                      </p>
                      <div className="rounded-xl bg-sky-50 p-2.5 border border-sky-200 space-y-1 text-[11px] text-sky-950 font-medium">
                        <p>• Cấp độ: {readingCase.level.realm_name_vi} (IELTS Band {readingCase.level.ielts_band.toFixed(1)}).</p>
                        <p>• Thời lượng ước tính: ~{readingCase.estimated_minutes} phút tập trung.</p>
                        <p>• Nguồn đối chiếu: {readingCase.sources.length} tài liệu học thuật chọn lọc.</p>
                      </div>
                      <p className="font-semibold text-stone-800 pt-1 text-[11px]">
                        Chạm vào từ bất kỳ để hiện nhãn dịch trên đầu chữ và trả lời các gợi ý suy ngẫm ở khung bên phải!
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Reading Progress Bar */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-[3px] bg-stone-200/70 overflow-hidden"
        >
          <div
            className={`h-full transition-all duration-300 ${
              isCurrentRead ? "bg-emerald-500" : "bg-amber-500"
            }`}
            style={{ width: `${isCurrentRead ? 100 : currentScrollPercent}%` }}
          />
        </div>
      </header>

      {/* Mobile Section Switcher (< lg) */}
      <div className="lg:hidden sticky top-0 z-20 border-b border-stone-200 bg-[#FAF8F5]/95 backdrop-blur-md px-3 py-2">
        <div className="grid grid-cols-4 gap-1 bg-stone-200/70 p-1 rounded-xl text-[11px] font-bold">
          <button
            type="button"
            onClick={() => setMobileSection("article")}
            className={`py-1.5 px-1.5 rounded-lg transition-all cursor-pointer truncate ${
              mobileSection === "article"
                ? "bg-white text-stone-900 shadow-xs"
                : "text-stone-600"
            }`}
          >
            Bài đọc
          </button>
          <button
            type="button"
            onClick={() => {
              setMobileSection("tasks");
              setRightPanelTab("tasks");
            }}
            className={`py-1.5 px-1.5 rounded-lg transition-all cursor-pointer truncate ${
              mobileSection === "tasks"
                ? "bg-white text-stone-900 shadow-xs"
                : "text-stone-600"
            }`}
          >
            Chiêm nghiệm ({completedTasksCount}/4)
          </button>
          <button
            type="button"
            onClick={() => {
              setMobileSection("glossary");
              setRightPanelTab("glossary");
            }}
            className={`py-1.5 px-1.5 rounded-lg transition-all cursor-pointer truncate ${
              mobileSection === "glossary"
                ? "bg-white text-stone-900 shadow-xs"
                : "text-stone-600"
            }`}
          >
            Từ vựng ({glossaryData.curated.length})
          </button>
          <button
            type="button"
            onClick={() => {
              setMobileSection("explain");
              setRightPanelTab("explain");
            }}
            className={`py-1.5 px-1.5 rounded-lg transition-all cursor-pointer truncate ${
              mobileSection === "explain"
                ? "bg-white text-emerald-900 shadow-xs"
                : "text-stone-600"
            }`}
          >
            Giải nghĩa
          </button>
        </div>
      </div>

      {/* Main Dual-Column Split Layout with Independent Scrolling on Desktop */}
      <main className="flex-1 w-full lg:overflow-hidden">
        <div className="lg:h-full grid grid-cols-1 lg:grid-cols-12">

          {/* ========================================================================= */}
          {/* LEFT COLUMN: MULTI-SOURCE DOSSIER (Independent Scroll, 7 Cols ~ 58%)      */}
          {/* ========================================================================= */}
          <section
            className={`lg:col-span-7 lg:h-full flex-col lg:overflow-hidden bg-[#FBFBFA] relative ${
              mobileSection === "article" ? "flex" : "hidden lg:flex"
            }`}
          >

            {/* Source Tab Filter + Opt-in Bilingual Toggle (Fixed Header of Left Column) */}
            <div className="border-b border-stone-200/90 bg-[#FAF8F5] px-4 sm:px-6 lg:px-8 py-2.5 shrink-0 z-10 flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar no-scrollbar">
                <Button
                  size="sm"
                  variant={activeSourceId === "all" ? "default" : "ghost"}
                  onClick={() => setActiveSourceId("all")}
                  className={`text-xs h-8 rounded-lg ${
                    activeSourceId === "all"
                      ? "bg-sky-600 hover:bg-sky-700 text-white font-bold shadow-xs"
                      : "bg-white border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-white"
                  }`}
                >
                  <Layers className="h-3.5 w-3.5 mr-1.5" />
                  Toàn bộ bài đọc ({readingCase.sources.length} Nguồn)
                </Button>
                {readingCase.sources.map((src, idx) => (
                  <Button
                    key={src.id}
                    size="sm"
                    variant={activeSourceId === src.id ? "default" : "ghost"}
                    onClick={() => setActiveSourceId(src.id)}
                    className={`text-xs h-8 rounded-lg whitespace-nowrap ${
                      activeSourceId === src.id
                        ? "bg-slate-800 text-white font-bold"
                        : "bg-white/80 border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-white"
                    }`}
                  >
                    {idx === 0 && <FileText className="h-3.5 w-3.5 mr-1.5 text-sky-400" />}
                    {idx === 1 && <UserCheck className="h-3.5 w-3.5 mr-1.5 text-emerald-400" />}
                    {idx === 2 && <Cpu className="h-3.5 w-3.5 mr-1.5 text-purple-400" />}
                    Nguồn {idx + 1}
                  </Button>
                ))}
                {readingCase.id === "case-001" && (
                  <Button
                    size="sm"
                    variant={activeSourceId === "diagram" ? "default" : "ghost"}
                    onClick={() => setActiveSourceId("diagram")}
                    className={`text-xs h-8 rounded-lg whitespace-nowrap ${
                      activeSourceId === "diagram"
                        ? "bg-sky-700 text-white font-bold shadow-xs"
                        : "bg-sky-50 border border-sky-200 text-sky-900 hover:bg-sky-100"
                    }`}
                  >
                    <MapIcon className="h-3.5 w-3.5 mr-1.5 text-sky-600" />
                    Sơ Đồ Mặt Cắt Địa Chất (Map)
                  </Button>
                )}
              </div>

              {/* Opt-in Reading Mode Toggle: Chỉ tiếng Anh (default) ↔ Song ngữ */}
              <div
                role="group"
                aria-label="Chế độ hiển thị bài đọc"
                className="inline-flex items-center gap-1 bg-stone-200/75 p-0.5 rounded-xl border border-stone-300/60 shrink-0"
              >
                <button
                  type="button"
                  onClick={() => handleUpdateReaderSettings({ readingMode: "english" })}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    readingMode === "english"
                      ? "bg-white text-stone-900 shadow-xs"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  Chỉ tiếng Anh
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateReaderSettings({ readingMode: "bilingual" })}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    readingMode === "bilingual"
                      ? "bg-stone-900 text-white shadow-xs"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  <Languages className="h-3 w-3" />
                  <span>Song ngữ</span>
                </button>
              </div>
            </div>

            {/* Dossier Document Cards (Scrollable content area with CSS Container Query) */}
            <div
              ref={leftScrollRef}
              onScroll={handleDesktopArticleScroll}
              className="reading-canvas-cq flex-1 lg:overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 custom-scrollbar"
            >
              {/* Standalone Diagram Tab View */}
              {activeSourceId === "diagram" && readingCase.id === "case-001" && (
                <div className="animate-in fade-in duration-150 space-y-3">
                  <div className="rounded-xl bg-sky-50 p-3 border border-sky-200 text-xs text-sky-950 font-medium">
                    💡 <strong>Sơ đồ địa vật lý:</strong> Mặt cắt dải băng Greenland dày 850m, vị trí hồ băng G-4, khe nứt thủy lực thẳng đứng và lớp đá đáy bedrock.
                  </div>
                  <CrimeSceneBlueprint />
                </div>
              )}

              {/* Text Sources */}
              {activeSourceId !== "diagram" &&
                readingCase.sources
                  .filter((src) => activeSourceId === "all" || activeSourceId === src.id)
                  .map((src, idx) => {
                    const cardThemeClass =
                      readerSettings.theme === "eink"
                        ? "bg-[#FAF4E6] text-[#2C2213] border-[#E2D5B8]"
                        : readerSettings.theme === "dark"
                        ? "bg-[#1C1917] text-[#E7E5E4] border-[#292524]"
                        : "bg-white text-stone-900 border-stone-200/90";

                    const translationBoxClass =
                      readerSettings.theme === "eink"
                        ? "bg-[#F3E9D2]/85 border-[#DCCBA6] text-[#433319]"
                        : readerSettings.theme === "dark"
                        ? "bg-stone-800/80 border-stone-700 text-stone-200"
                        : "bg-[#FAF8F5] border-stone-200/90 text-stone-700";

                    const fontClass =
                      readerSettings.fontFamily === "serif"
                        ? "font-serif"
                        : readerSettings.fontFamily === "mono"
                        ? "font-mono"
                        : "font-sans";

                    const leadingClass =
                      readerSettings.lineHeight === "loose"
                        ? "leading-loose"
                        : readerSettings.lineHeight === "normal"
                        ? "leading-normal"
                        : "leading-relaxed";

                    const alignClass =
                      readerSettings.textAlign === "justify"
                        ? "text-justify"
                        : "text-left";

                    return (
                      <div
                        key={src.id}
                        className={`rounded-2xl border p-5 sm:p-7 shadow-xs relative overflow-hidden transition-colors ${cardThemeClass}`}
                      >
                        {/* Source Header */}
                        <div className="flex items-start justify-between gap-2 border-b border-stone-200/60 pb-3 mb-5">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-stone-600 px-2 py-0.5 rounded bg-stone-100/80 border border-stone-200">
                                SOURCE #{idx + 1}
                              </span>
                              <span className="text-xs text-stone-500">{src.subtitle}</span>
                            </div>
                            <h2
                              className={`text-base sm:text-lg font-bold mt-1.5 ${
                                readerSettings.theme === "dark" ? "text-stone-100" : "text-stone-900"
                              }`}
                            >
                              {src.title}
                            </h2>
                          </div>
                        </div>

                        {/* Bilingual Column Headers (shown on container >= 720px when Song ngữ is opted in) */}
                        {readingMode === "bilingual" && (
                          <div className="reading-bilingual-col-headers pb-2 mb-3 border-b border-stone-200/70 text-[10px] font-mono font-bold uppercase tracking-widest text-stone-500">
                            <span>ENGLISH (Chạm từng chữ để tra · Chạm câu chọn dẫn chứng)</span>
                            <span>TIẾNG VIỆT (Gióng hàng từng đoạn)</span>
                          </div>
                        )}

                        {/* Paragraphs with customizable reader typography & optional bilingual layout */}
                        <div
                          className={`space-y-6 ${fontClass} ${leadingClass} ${alignClass}`}
                          style={{ fontSize: `${readerSettings.fontSize}px` }}
                        >
                          {src.paragraphs.map((p) => {
                            const paraNumber = glossaryData.paragraphNumberMap[p.id] ?? 1;
                            const viText = getParagraphTranslationVi(selectedCaseId, p.id, p.text_vi);
                            const isParaTranslationOpen = Boolean(expandedParagraphTranslations[p.id]);
                            const isFlashed = flashedParagraphId === p.id;

                            if (readingMode === "bilingual") {
                              return (
                                <div
                                  key={p.id}
                                  id={`para-${p.id}`}
                                  className={`p-2 -mx-2 rounded-xl transition-all ${
                                    isFlashed ? "reading-para-flash" : ""
                                  }`}
                                >
                                  <div className="flex items-center gap-2 mb-1.5 px-2">
                                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200/80">
                                      Đoạn {paraNumber}
                                    </span>
                                  </div>
                                  <div className="reading-bilingual-grid">
                                    <div className="min-w-0">
                                      {renderInteractiveText(p.text, p.id)}
                                    </div>
                                    <div
                                      className={`rounded-xl border p-3.5 text-sm leading-relaxed font-sans ${translationBoxClass}`}
                                    >
                                      <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700 mr-1.5">
                                        [{paraNumber}]
                                      </span>
                                      {viText || "Chưa có bản dịch cho đoạn này."}
                                    </div>
                                  </div>
                                </div>
                              );
                            }

                            return (
                              <div
                                key={p.id}
                                id={`para-${p.id}`}
                                className={`p-2 -mx-2 rounded-xl transition-all space-y-2 ${
                                  isFlashed ? "reading-para-flash" : ""
                                }`}
                              >
                                <div className="flex items-center justify-between gap-2 px-3">
                                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400">
                                    Đoạn {paraNumber}
                                  </span>
                                  {viText && (
                                    <button
                                      type="button"
                                      onClick={() => toggleParagraphTranslation(p.id)}
                                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-sans font-semibold border transition-colors cursor-pointer ${
                                        isParaTranslationOpen
                                          ? "bg-amber-50 border-amber-300 text-amber-900"
                                          : "bg-stone-50/80 hover:bg-stone-100 border-stone-200/80 text-stone-500 hover:text-stone-800"
                                      }`}
                                    >
                                      <Languages className="h-3 w-3" />
                                      <span>{isParaTranslationOpen ? "Ẩn dịch" : "Dịch đoạn"}</span>
                                    </button>
                                  )}
                                </div>

                                <div>{renderInteractiveText(p.text, p.id)}</div>

                                {viText && isParaTranslationOpen && (
                                  <div
                                    className={`mx-3 rounded-xl border p-3.5 text-sm leading-relaxed font-sans animate-in fade-in duration-150 ${translationBoxClass}`}
                                  >
                                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700 mr-1.5">
                                      Bản dịch đoạn {paraNumber}:
                                    </span>
                                    {viText}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* Attached Diagram in Source 1 (Only for Case 001) */}
                        {readingCase.id === "case-001" && src.id === "source-01" && (
                          <div className="mt-6 pt-5 border-t border-stone-200/70">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                                <MapIcon className="h-3.5 w-3.5 text-sky-600" />
                                📎 Phụ lục: Sơ đồ mặt cắt địa chất băng tầng G-4
                              </span>
                            </div>
                            <CrimeSceneBlueprint isCompact />
                          </div>
                        )}
                      </div>
                    );
                  })}

              {/* IELTS Task 2 Writing Debate Chamber (Persistent Community Knowledge Base) */}
              <WritingDebateChamber caseId={selectedCaseId} />

              {/* Recommended Next Readings */}
              <NextReadsSection
                currentCaseId={selectedCaseId}
                progressMap={progressMap}
                compact
              />
            </div>

            {/* Compact Non-Hijacking Quick-Peek Bar (when clicking words while on Góc Chiêm Nghiệm) */}
            {quickPeekTerm && (
              <div className="sticky lg:absolute bottom-3 left-3 right-3 z-30 mx-auto max-w-2xl rounded-2xl border border-stone-300 bg-[#28221F] text-white px-4 py-3 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-150">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 space-y-1">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="font-serif text-base font-bold text-amber-200">
                        {quickPeekTerm.term}
                      </span>
                      {quickPeekTerm.pronunciation && (
                        <span className="text-xs font-mono text-white/60">
                          {quickPeekTerm.pronunciation}
                        </span>
                      )}
                      {quickPeekTerm.pos && (
                        <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/10 text-white/80">
                          {quickPeekTerm.pos}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-white/90 leading-snug line-clamp-2">
                      {sanitizeLearnerText(
                        (quickPeekTerm.meaning_vi || "")
                          .replace(/^Cụm từ:\s*/i, "")
                          .replace(/^Từ vựng:\s*/i, "")
                      ).normalize("NFC")}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        if ("speechSynthesis" in window) {
                          window.speechSynthesis.cancel();
                          const u = new SpeechSynthesisUtterance(quickPeekTerm.term);
                          u.lang = "en-US";
                          u.rate = 0.95;
                          window.speechSynthesis.speak(u);
                        }
                      }}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-amber-200 transition-colors cursor-pointer"
                      title="Nghe phát âm từ này"
                    >
                      <Volume2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveExplainTerm(quickPeekTerm);
                        setQuickPeekTerm(null);
                        setRightPanelTab("explain");
                        setMobileSection("explain");
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-colors cursor-pointer"
                    >
                      <span>Giải nghĩa sâu</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuickPeekTerm(null)}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors cursor-pointer"
                      aria-label="Đóng thanh tra nhanh"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: INVESTIGATION, GLOSSARY & EXPLAIN PANEL (~ 42%)             */}
          {/* ========================================================================= */}
          <section
            className={`lg:col-span-5 lg:h-full flex-col lg:overflow-hidden bg-white border-t lg:border-t-0 lg:border-l border-stone-200 ${
              mobileSection !== "article" ? "flex" : "hidden lg:flex"
            }`}
          >
            {/* Right Panel Tabs: Tasks vs Glossary vs Explain */}
            <div className="border-b border-stone-200/90 bg-[#FAF8F5] px-4 sm:px-6 py-2.5 shrink-0 z-10">
              <div className="grid grid-cols-3 gap-1 bg-stone-200/60 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => {
                    setRightPanelTab("tasks");
                    setMobileSection("tasks");
                  }}
                  className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    rightPanelTab === "tasks"
                      ? "bg-white text-stone-900 shadow-xs font-black"
                      : "text-stone-600 hover:text-stone-900 hover:bg-white/40"
                  }`}
                >
                  <BookOpen className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                  <span className="truncate">Góc Chiêm Nghiệm</span>
                  <span className="text-[10px] font-mono px-1 rounded-full bg-stone-100 text-stone-700 shrink-0">
                    {completedTasksCount}/4
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setRightPanelTab("glossary");
                    setMobileSection("glossary");
                    setQuickPeekTerm(null);
                  }}
                  className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    rightPanelTab === "glossary"
                      ? "bg-white text-amber-950 shadow-xs font-black"
                      : "text-stone-600 hover:text-stone-900 hover:bg-white/40"
                  }`}
                >
                  <BookMarked className="h-3.5 w-3.5 text-amber-700 shrink-0" />
                  <span className="truncate">Từ vựng</span>
                  <span className="text-[10px] font-mono px-1 rounded-full bg-amber-100/90 text-amber-900 shrink-0">
                    {glossaryData.curated.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setRightPanelTab("explain");
                    setMobileSection("explain");
                    setQuickPeekTerm(null);
                  }}
                  className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    rightPanelTab === "explain"
                      ? "bg-white text-emerald-950 shadow-xs font-black"
                      : "text-stone-600 hover:text-stone-900 hover:bg-white/40"
                  }`}
                >
                  <Sparkles className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">Giải Nghĩa Sâu</span>
                  {activeExplainTerm && (
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  )}
                </button>
              </div>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 lg:overflow-y-auto custom-scrollbar">
              {/* TAB 1: CASE GLOSSARY (2-way sync with reading paragraphs) */}
              {rightPanelTab === "glossary" && (
                <CaseGlossaryPanel
                  curatedItems={glossaryData.curated}
                  allItems={glossaryData.allMatched}
                  activeKey={activeGlossaryKey}
                  onJumpToParagraph={handleJumpToParagraphFromGlossary}
                  onInspectDeep={handleInspectDeepFromGlossary}
                />
              )}

              {/* TAB 2: READLANG EXPLAIN SIDEBAR */}
              {rightPanelTab === "explain" && (
                <ReadlangExplorationSidebar
                  activeTerm={activeExplainTerm}
                  savedTerms={savedTerms}
                  onToggleSave={handleSaveTerm}
                  onBackToTasks={() => {
                    setRightPanelTab("tasks");
                    setMobileSection("tasks");
                  }}
                />
              )}

              {/* TAB 3: TASKS & FINAL DEDUCTION */}
              {rightPanelTab === "tasks" && (() => {
                const task1Obj = readingCase.tasks[0] && "options" in readingCase.tasks[0] ? readingCase.tasks[0] : undefined;
                const task2Obj = readingCase.tasks[1] && "options" in readingCase.tasks[1] ? readingCase.tasks[1] : undefined;
                const task3Obj = readingCase.tasks[2] && "options" in readingCase.tasks[2] ? readingCase.tasks[2] : undefined;
                const task4Obj = readingCase.tasks[3] && "target_sentence" in readingCase.tasks[3] ? readingCase.tasks[3] : undefined;

                const isTask1Correct = Boolean(task1Obj && taskAnswers["task-01"] === task1Obj.answer);
                const isTask2Correct = Boolean(task2Obj && taskAnswers["task-02"] === task2Obj.answer);
                const isTask3Correct = Boolean(task3Obj && taskAnswers["task-03"] === task3Obj.answer);
                const isTask4Correct = Boolean(
                  task4Obj && selectedEvidenceSentence &&
                  (task4Obj.target_sentence.includes(selectedEvidenceSentence.trim().slice(0, 30)) ||
                   selectedEvidenceSentence.includes(task4Obj.target_sentence.trim().slice(0, 30)))
                );

                const correctHyp = readingCase.final_deduction.correct_hypothesis;
                const isFinalHypCorrect = finalHypothesis === correctHyp;

                return (
                  <div className="p-4 sm:p-6 divide-y divide-stone-200/80 space-y-6">
                    {/* Task 1: FIND */}
                    {task1Obj && (
                      <div className="space-y-3 pt-0 first:pt-0">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200/60">
                            GỢI Ý 1 · CHI TIẾT BÀI ĐỌC
                          </span>
                          {taskAnswers["task-01"] && (
                            isTask1Correct ? (
                              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                                <CheckCircle className="h-3.5 w-3.5" /> Đúng
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-100/80 px-2 py-0.5 rounded-full">
                                Sai
                              </span>
                            )
                          )}
                        </div>
                        <p className="text-xs sm:text-sm font-semibold text-stone-800 leading-snug">
                          {task1Obj.question}
                        </p>
                        <div className="space-y-1.5 pt-1">
                          {task1Obj.options.map((opt) => {
                            const userAns = taskAnswers["task-01"];
                            const isAnswered = Boolean(userAns);
                            const isThisSelected = userAns === opt.id;
                            const isCorrectOpt = opt.id === task1Obj.answer;

                            let cardStyle = "border-stone-200/80 bg-stone-50/50 hover:bg-stone-100/70 text-stone-700";
                            if (isAnswered) {
                              if (isThisSelected && isCorrectOpt) {
                                cardStyle = "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-1 ring-emerald-500/40";
                              } else if (isThisSelected && !isCorrectOpt) {
                                cardStyle = "bg-rose-50 border-rose-400 text-rose-950 font-bold ring-1 ring-rose-400/40";
                              } else if (!isThisSelected && isCorrectOpt) {
                                cardStyle = "bg-emerald-50/60 border-emerald-300 text-emerald-900 font-semibold";
                              }
                            }

                            return (
                              <label
                                key={opt.id}
                                className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${cardStyle}`}
                              >
                                <input
                                  type="radio"
                                  name="task-01"
                                  checked={taskAnswers["task-01"] === opt.id}
                                  onChange={() => setTaskAnswers({ ...taskAnswers, "task-01": opt.id })}
                                  className="mt-0.5 text-emerald-600 focus:ring-0"
                                />
                                <span>
                                  <strong className="mr-1">{opt.id}.</strong> {opt.text}
                                </span>
                              </label>
                            );
                          })}
                        </div>

                        {/* Instant Explanation for Task 1 */}
                        {taskAnswers["task-01"] && (
                          <div className={`p-3 rounded-xl border text-xs leading-relaxed animate-in fade-in duration-150 ${
                            isTask1Correct
                              ? "bg-emerald-50/80 border-emerald-200 text-emerald-950"
                              : "bg-rose-50/80 border-rose-200 text-rose-950"
                          }`}>
                            <p className="font-bold flex items-center gap-1.5 mb-1">
                              {isTask1Correct ? (
                                <span className="text-emerald-800">✅ Chính xác!</span>
                              ) : (
                                <span className="text-rose-800">❌ Chưa chính xác. Đáp án đúng là {task1Obj.answer}.</span>
                              )}
                            </p>
                            {task1Obj.explanation && (
                              <p className="text-stone-700">
                                💡 <strong>Giải thích:</strong> {task1Obj.explanation}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Task 2: MATCH */}
                    {task2Obj && (
                      <div className="space-y-3 pt-6">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-900 border border-emerald-200/60">
                            GỢI Ý 2 · ĐỐI CHIẾU Ý TƯỞNG
                          </span>
                          {taskAnswers["task-02"] && (
                            isTask2Correct ? (
                              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                                <CheckCircle className="h-3.5 w-3.5" /> Đúng
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-100/80 px-2 py-0.5 rounded-full">
                                Sai
                              </span>
                            )
                          )}
                        </div>
                        <p className="text-xs sm:text-sm font-semibold text-stone-800 leading-snug">
                          {task2Obj.question}
                        </p>
                        <div className="space-y-1.5 pt-1">
                          {task2Obj.options.map((opt) => {
                            const userAns = taskAnswers["task-02"];
                            const isAnswered = Boolean(userAns);
                            const isThisSelected = userAns === opt.id;
                            const isCorrectOpt = opt.id === task2Obj.answer;

                            let cardStyle = "border-stone-200/80 bg-stone-50/50 hover:bg-stone-100/70 text-stone-700";
                            if (isAnswered) {
                              if (isThisSelected && isCorrectOpt) {
                                cardStyle = "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-1 ring-emerald-500/40";
                              } else if (isThisSelected && !isCorrectOpt) {
                                cardStyle = "bg-rose-50 border-rose-400 text-rose-950 font-bold ring-1 ring-rose-400/40";
                              } else if (!isThisSelected && isCorrectOpt) {
                                cardStyle = "bg-emerald-50/60 border-emerald-300 text-emerald-900 font-semibold";
                              }
                            }

                            return (
                              <label
                                key={opt.id}
                                className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${cardStyle}`}
                              >
                                <input
                                  type="radio"
                                  name="task-02"
                                  checked={taskAnswers["task-02"] === opt.id}
                                  onChange={() => setTaskAnswers({ ...taskAnswers, "task-02": opt.id })}
                                  className="mt-0.5 text-emerald-600 focus:ring-0"
                                />
                                <span>
                                  <strong className="mr-1">{opt.id}.</strong> {opt.text}
                                </span>
                              </label>
                            );
                          })}
                        </div>

                        {/* Instant Explanation for Task 2 */}
                        {taskAnswers["task-02"] && (
                          <div className={`p-3 rounded-xl border text-xs leading-relaxed animate-in fade-in duration-150 ${
                            isTask2Correct
                              ? "bg-emerald-50/80 border-emerald-200 text-emerald-950"
                              : "bg-rose-50/80 border-rose-200 text-rose-950"
                          }`}>
                            <p className="font-bold flex items-center gap-1.5 mb-1">
                              {isTask2Correct ? (
                                <span className="text-emerald-800">✅ Chính xác!</span>
                              ) : (
                                <span className="text-rose-800">❌ Chưa chính xác. Đáp án đúng là {task2Obj.answer}.</span>
                              )}
                            </p>
                            {task2Obj.explanation && (
                              <p className="text-stone-700">
                                💡 <strong>Giải thích:</strong> {task2Obj.explanation}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Task 3: INFER */}
                    {task3Obj && (
                      <div className="space-y-3 pt-6">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-50 text-purple-900 border border-purple-200/60">
                            GỢI Ý 3 · SUY NGẪM & GÓC NHÌN
                          </span>
                          {taskAnswers["task-03"] && (
                            isTask3Correct ? (
                              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                                <CheckCircle className="h-3.5 w-3.5" /> Đúng
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-100/80 px-2 py-0.5 rounded-full">
                                Sai
                              </span>
                            )
                          )}
                        </div>
                        <p className="text-xs sm:text-sm font-semibold text-stone-800 leading-snug">
                          {task3Obj.question}
                        </p>
                        <div className="space-y-1.5 pt-1">
                          {task3Obj.options.map((opt) => {
                            const userAns = taskAnswers["task-03"];
                            const isAnswered = Boolean(userAns);
                            const isThisSelected = userAns === opt.id;
                            const isCorrectOpt = opt.id === task3Obj.answer;

                            let cardStyle = "border-stone-200/80 bg-stone-50/50 hover:bg-stone-100/70 text-stone-700";
                            if (isAnswered) {
                              if (isThisSelected && isCorrectOpt) {
                                cardStyle = "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-1 ring-emerald-500/40";
                              } else if (isThisSelected && !isCorrectOpt) {
                                cardStyle = "bg-rose-50 border-rose-400 text-rose-950 font-bold ring-1 ring-rose-400/40";
                              } else if (!isThisSelected && isCorrectOpt) {
                                cardStyle = "bg-emerald-50/60 border-emerald-300 text-emerald-900 font-semibold";
                              }
                            }

                            return (
                              <label
                                key={opt.id}
                                className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${cardStyle}`}
                              >
                                <input
                                  type="radio"
                                  name="task-03"
                                  checked={taskAnswers["task-03"] === opt.id}
                                  onChange={() => setTaskAnswers({ ...taskAnswers, "task-03": opt.id })}
                                  className="mt-0.5 text-emerald-600 focus:ring-0"
                                />
                                <span>
                                  <strong className="mr-1">{opt.id}.</strong> {opt.text}
                                </span>
                              </label>
                            );
                          })}
                        </div>

                        {/* Instant Explanation for Task 3 */}
                        {taskAnswers["task-03"] && (
                          <div className={`p-3 rounded-xl border text-xs leading-relaxed animate-in fade-in duration-150 ${
                            isTask3Correct
                              ? "bg-emerald-50/80 border-emerald-200 text-emerald-950"
                              : "bg-rose-50/80 border-rose-200 text-rose-950"
                          }`}>
                            <p className="font-bold flex items-center gap-1.5 mb-1">
                              {isTask3Correct ? (
                                <span className="text-emerald-800">✅ Chính xác!</span>
                              ) : (
                                <span className="text-rose-800">❌ Chưa chính xác. Đáp án đúng là {task3Obj.answer}.</span>
                              )}
                            </p>
                            {task3Obj.explanation && (
                              <p className="text-stone-700">
                                💡 <strong>Giải thích:</strong> {task3Obj.explanation}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Task 4: PROVE (Click-to-Source) */}
                    {task4Obj && (
                      <div className="space-y-3 pt-6">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200/60">
                            GỢI Ý 4 · CÂU VĂN TÂM ĐẮC
                          </span>
                          {selectedEvidenceSentence && (
                            isTask4Correct ? (
                              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                                <CheckCircle className="h-3.5 w-3.5" /> Đúng
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-100/80 px-2 py-0.5 rounded-full">
                                Chưa đúng
                              </span>
                            )
                          )}
                        </div>
                        <p className="text-xs sm:text-sm font-semibold text-stone-800 leading-snug">
                          {task4Obj.instruction}
                        </p>
                        
                        {selectedEvidenceSentence ? (
                          <div className="space-y-2.5">
                            <div className={`p-3 rounded-xl border leading-relaxed text-xs italic ${
                              isTask4Correct
                                ? "bg-emerald-50 border-emerald-300 text-emerald-950 font-medium"
                                : "bg-rose-50 border-rose-300 text-rose-950"
                            }`}>
                              &ldquo;{selectedEvidenceSentence}&rdquo;
                            </div>

                            {/* Instant Explanation for Task 4 */}
                            <div className={`p-3 rounded-xl border text-xs leading-relaxed ${
                              isTask4Correct
                                ? "bg-emerald-50/80 border-emerald-200 text-emerald-950"
                                : "bg-rose-50/80 border-rose-200 text-rose-950"
                            }`}>
                              {isTask4Correct ? (
                                <p>
                                  ✅ <strong>Chính xác!</strong> {task4Obj.explanation || "Câu văn đã chọn hoàn toàn chính xác theo yêu cầu chứng minh."}
                                </p>
                              ) : (
                                <p>
                                  ❌ <strong>Chưa chính xác.</strong> Câu bạn chọn không chứa đúng bằng chứng yêu cầu. Hãy click lại câu văn thích hợp trong các nguồn đọc ở cột bên trái.
                                </p>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="p-3.5 rounded-xl border border-dashed border-stone-200 bg-stone-50/60 text-xs text-stone-500 text-center">
                            👉 Nhấp trực tiếp vào câu văn trong bài đọc (cột trái) để ghim làm dẫn chứng.
                          </div>
                        )}
                      </div>
                    )}

                    {/* Final Deduction Section */}
                    <div className="pt-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <HelpCircle className="h-4 w-4 text-amber-600" />
                        <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider">
                          ĐÚC KẾT & CHIÊM NGHIỆM
                        </h4>
                      </div>

                      <p className="text-xs text-stone-700 font-medium leading-relaxed">
                        {readingCase.final_deduction.question}
                      </p>

                      <div className="space-y-2">
                        {readingCase.final_deduction.options.map((opt) => {
                          const isAnswered = Boolean(finalHypothesis);
                          const isThisSelected = finalHypothesis === opt.id;
                          const isCorrectOpt = opt.id === correctHyp;

                          let cardStyle = "border-stone-200/80 bg-stone-50/50 hover:bg-stone-100/70 text-stone-700";
                          if (isAnswered) {
                            if (isThisSelected && isCorrectOpt) {
                              cardStyle = "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-1 ring-emerald-500/40";
                            } else if (isThisSelected && !isCorrectOpt) {
                              cardStyle = "bg-rose-50 border-rose-400 text-rose-950 font-bold ring-1 ring-rose-400/40";
                            } else if (!isThisSelected && isCorrectOpt) {
                              cardStyle = "bg-emerald-50/60 border-emerald-300 text-emerald-900 font-semibold";
                            }
                          }

                          return (
                            <label
                              key={opt.id}
                              className={`flex items-start gap-2.5 p-3 rounded-xl border text-xs cursor-pointer transition-all ${cardStyle}`}
                            >
                              <input
                                type="radio"
                                name="final_hypothesis"
                                checked={finalHypothesis === opt.id}
                                onChange={() => setFinalHypothesis(opt.id)}
                                className="mt-0.5 text-emerald-600 focus:ring-0"
                              />
                              <span>
                                <strong className="mr-1">{opt.id.replace("hyp-", "Nhận định ")}:</strong> {opt.text}
                              </span>
                            </label>
                          );
                        })}
                      </div>

                      {/* Instant Explanation for Final Deduction */}
                      {finalHypothesis && (
                        <div className={`p-3 rounded-xl border text-xs leading-relaxed animate-in fade-in duration-150 ${
                          isFinalHypCorrect
                            ? "bg-emerald-50/80 border-emerald-200 text-emerald-950"
                            : "bg-rose-50/80 border-rose-200 text-rose-950"
                        }`}>
                          <p className="font-bold flex items-center gap-1.5 mb-1">
                            {isFinalHypCorrect ? (
                              <span className="text-emerald-800">✅ Đúc Kết Rất Sâu Sắc!</span>
                            ) : (
                              <span className="text-rose-800">❌ Chưa chính xác. Đáp án đúng là {correctHyp.replace("hyp-", "Nhận định ")}.</span>
                            )}
                          </p>
                          {readingCase.final_deduction.explanation && (
                            <p className="text-stone-700">
                              💡 <strong>Giải thích:</strong> {readingCase.final_deduction.explanation}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Required Supporting Evidence Selection */}
                      <div className="space-y-2 pt-2">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-stone-600">
                          Gợi ý chọn các nhận định then chốt làm sáng tỏ thông điệp trên:
                        </p>
                        <div className="space-y-1.5">
                          {readingCase.final_deduction.required_evidence_pool.map((ev) => {
                            const isChecked = selectedEvidenceIds.includes(ev.id);
                            return (
                              <label
                                key={ev.id}
                                className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                                  isChecked
                                    ? "bg-amber-50 border-amber-300 text-amber-950 font-medium"
                                    : "border-stone-200/80 bg-stone-50/50 text-stone-600 hover:text-stone-900 hover:bg-stone-100/70"
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => toggleEvidenceId(ev.id)}
                                  className="mt-0.5 rounded text-amber-600 focus:ring-0"
                                />
                                <span>{ev.label}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      {/* Submit Button */}
                      <Button
                        disabled={!canSubmitAutopsy}
                        onClick={() => {
                          updateTasksProgress(selectedCaseId, completedTasksCount, true);
                          setViewState("autopsy");
                        }}
                        className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-md ${
                          canSubmitAutopsy
                            ? "bg-amber-500 hover:bg-amber-600 text-slate-950 cursor-pointer shadow-amber-500/20"
                            : "bg-stone-200 text-stone-400 cursor-not-allowed"
                        }`}
                      >
                        Xem Đúc Kết Bài Đọc (Takeaways & Insights)
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>

                      {!canSubmitAutopsy && (
                        <p className="text-[11px] text-center text-stone-500">
                          Gợi ý: Trả lời các câu hỏi suy ngẫm để mở khóa phần tổng kết chuyên sâu.
                        </p>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
