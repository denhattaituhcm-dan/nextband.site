import React, { useState, useRef, useEffect } from "react";
import { CASE_001 } from "@/data/readingCases/case001";
import { VocabularyTerm } from "@/features/reading/types";
import { ContextualGlossTooltip } from "@/features/reading/components/ContextualGlossTooltip";
import { CaseAutopsyView } from "@/features/reading/components/CaseAutopsyView";
import {
  lookupWord,
  isContentWord,
  MULTI_WORD_PHRASES,
} from "@/features/reading/services/readingDictionary";
import { Button } from "@/components/ui/button";
import {
  FileText,
  UserCheck,
  Cpu,
  HelpCircle,
  CheckCircle,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Info,
  Layers,
} from "lucide-react";
import { SEO } from "@/components/common/SEO";

export default function ReadingCasePage() {
  const readingCase = CASE_001;

  // Active source filter (or all)
  const [activeSourceId, setActiveSourceId] = useState<string>("all");

  // Vocabulary Gloss State
  const [activeGloss, setActiveGloss] = useState<{
    term: VocabularyTerm;
    position: { top: number; left: number };
  } | null>(null);
  const [savedTerms, setSavedTerms] = useState<string[]>([]);
  const [hasInteractedGloss, setHasInteractedGloss] = useState(false);

  // Investigation Tasks State
  const [taskAnswers, setTaskAnswers] = useState<Record<string, string>>({});
  const [selectedEvidenceSentence, setSelectedEvidenceSentence] = useState<string | null>(null);

  // Final Deduction State
  const [finalHypothesis, setFinalHypothesis] = useState<string | null>(null);
  const [selectedEvidenceIds, setSelectedEvidenceIds] = useState<string[]>([]);

  // Page View State: "investigating" | "autopsy"
  const [viewState, setViewState] = useState<"investigating" | "autopsy">("investigating");

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleWindowClick = () => setActiveGloss(null);
    window.addEventListener("click", handleWindowClick);
    return () => window.removeEventListener("click", handleWindowClick);
  }, []);

  // Active translated words map (token key -> translation text)
  const [activeTranslatedWords, setActiveTranslatedWords] = useState<Record<string, VocabularyTerm>>({});

  const handleWordClick = (e: React.MouseEvent, termObj: VocabularyTerm, wordKey?: string) => {
    e.stopPropagation();
    
    // Auto-pronounce using SpeechSynthesis API (Readlang feature)
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(termObj.term);
      utterance.lang = "en-US";
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }

    // Toggle inline translation tag
    const key = wordKey || termObj.term.toLowerCase();
    setActiveTranslatedWords((prev) => {
      if (prev[key]) {
        const next = { ...prev };
        delete next[key];
        return next;
      }
      return { ...prev, [key]: termObj };
    });

    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setActiveGloss({
      term: termObj,
      position: {
        top: rect.top - 8,
        left: rect.left + rect.width / 2,
      },
    });
    setHasInteractedGloss(true);
  };

  const handleSentenceClick = (sentenceText: string) => {
    setSelectedEvidenceSentence(sentenceText);
  };

  const toggleEvidenceId = (evId: string) => {
    setSelectedEvidenceIds((prev) =>
      prev.includes(evId) ? prev.filter((id) => id !== evId) : [...prev, evId]
    );
  };

  const handleSaveTerm = (term: string) => {
    setSavedTerms((prev) =>
      prev.includes(term) ? prev.filter((t) => t !== term) : [...prev, term]
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
    setViewState("investigating");
  };

  // Helper to parse a sentence into tokens where all content words and multi-word idioms are clickable
  const renderSentenceWords = (sentence: string, sentenceIdx: number, paragraphId: string) => {
    // 1. Identify multi-word phrases and protect them
    const phraseMatches: { start: number; end: number; phrase: string }[] = [];
    
    for (const phrase of MULTI_WORD_PHRASES) {
      const regex = new RegExp(`\\b${phrase}\\b`, "gi");
      let match;
      while ((match = regex.exec(sentence)) !== null) {
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
        const termData = lookupWord(segment.text) || {
          term: segment.text,
          pronunciation: `/${segment.text.toLowerCase()}/`,
          pos: "phrase",
          meaning_en: `Contextual phrase: ${segment.text}`,
          meaning_vi: `Cụm từ: ${segment.text}`,
          context_note: "Cụm từ ngữ cảnh trong hồ sơ.",
        };
        const isTranslated = Boolean(activeTranslatedWords[termKey]);
        const shortVi = termData.meaning_vi.split("/")[0].replace(/\(.*?\)/g, "").trim();

        return (
          <span
            key={`phrase-${segIdx}`}
            className="relative inline-block my-1 mx-0.5 align-baseline"
          >
            {isTranslated && (
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap text-[11px] font-bold text-[#14532d] bg-[#dcfce7] px-2 py-0.5 rounded border border-[#86efac] shadow-xs animate-in fade-in zoom-in-95 duration-150 pointer-events-none flex items-center justify-center">
                {shortVi}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#dcfce7] border-r border-b border-[#86efac] rotate-45" />
              </span>
            )}
            <span
              onClick={(e) => handleWordClick(e, termData, termKey)}
              className={`cursor-pointer font-semibold rounded px-1.5 py-0.5 transition-all duration-150 select-none ${
                isTranslated
                  ? "bg-[#369E7A] text-white shadow-xs"
                  : "bg-emerald-100/90 hover:bg-emerald-200/90 text-emerald-950 border-b-2 border-emerald-600"
              }`}
              title="Click để tra cứu nghĩa theo ngữ cảnh"
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
          const termData = lookupWord(token) || {
            term: token,
            pronunciation: `/${token.toLowerCase()}/`,
            pos: "content word",
            meaning_en: `Academic term: ${token}`,
            meaning_vi: `Từ vựng: ${token}`,
            context_note: "Từ vựng trong bài đọc.",
          };
          const isTranslated = Boolean(activeTranslatedWords[termKey]);
          const shortVi = termData.meaning_vi.split("/")[0].replace(/\(.*?\)/g, "").trim();

          return (
            <span
              key={`tok-${segIdx}-${tokIdx}`}
              className="relative inline-block my-1 mx-0.5 align-baseline"
            >
              {isTranslated && (
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap text-[11px] font-bold text-[#14532d] bg-[#dcfce7] px-2 py-0.5 rounded border border-[#86efac] shadow-xs animate-in fade-in zoom-in-95 duration-150 pointer-events-none flex items-center justify-center">
                  {shortVi}
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#dcfce7] border-r border-b border-[#86efac] rotate-45" />
                </span>
              )}
              <span
                onClick={(e) => handleWordClick(e, termData, termKey)}
                className={`cursor-pointer rounded px-1 py-0.5 transition-all duration-150 select-none ${
                  isTranslated
                    ? "bg-[#369E7A] text-white font-semibold shadow-xs"
                    : "font-normal text-stone-800 hover:text-emerald-950 hover:bg-emerald-100/80 hover:underline decoration-emerald-500"
                }`}
                title="Click để tra cứu nghĩa theo ngữ cảnh"
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
    // Break into sentences
    const sentences = text.split(/(?<=[.!?])\s+/);

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

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col font-sans">
      <SEO
        title={`Case #001: ${readingCase.title} | ARIS IELTS Reading`}
        description="Vụ án Căn Phòng Khóa Kín - Thử thách giải mã đọc hiểu IELTS Band 5.0"
      />

      {/* Top Case Header Bar */}
      <div className="border-b border-stone-200/90 bg-[#FAF8F5]/95 sticky top-0 z-30 backdrop-blur-md px-4 py-3 sm:px-6 shadow-xs">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-amber-100 border border-amber-300 text-amber-900 font-black text-xs">
              #01
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-black text-stone-900 uppercase tracking-wide">
                  {readingCase.title}
                </h1>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800">
                  {readingCase.level.realm_name_vi} · Band {readingCase.level.ielts_band.toFixed(1)}
                </span>
                <span className="text-xs text-amber-500 hidden sm:inline-block">★★☆☆</span>
              </div>
              <p className="text-[11px] text-stone-500 hidden sm:block">
                {readingCase.universe.name} · Thời lượng khuyến nghị: ~15 phút
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!hasInteractedGloss && (
              <div className="hidden md:flex items-center gap-1.5 text-xs text-amber-900 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                <span>Mẹo: Click bất kỳ từ vựng nào để tra cứu giải nghĩa theo ngữ cảnh</span>
              </div>
            )}
            <div className="text-xs font-mono text-stone-700 bg-white px-2.5 py-1 rounded-md border border-stone-200 shadow-xs">
              Tasks: {Object.keys(taskAnswers).length + (selectedEvidenceSentence ? 1 : 0)} / 4
            </div>
          </div>
        </div>
      </div>

      {/* Main Split-View Layout */}
      <div className="flex-1 mx-auto max-w-7xl w-full p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: MULTI-SOURCE DOSSIER (7 Columns on large screens ~ 58%)      */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Source Tab Filter */}
            <div className="flex items-center gap-2 border-b border-stone-200 pb-3 overflow-x-auto">
              <Button
                size="sm"
                variant={activeSourceId === "all" ? "default" : "ghost"}
                onClick={() => setActiveSourceId("all")}
                className={`text-xs h-8 rounded-lg ${
                  activeSourceId === "all"
                    ? "bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shadow-xs"
                    : "bg-white/80 border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-white"
                }`}
              >
                <Layers className="h-3.5 w-3.5 mr-1.5" />
                Toàn Bộ Hồ Sơ (3 Nguồn)
              </Button>
              {readingCase.sources.map((src, idx) => (
                <Button
                  key={src.id}
                  size="sm"
                  variant={activeSourceId === src.id ? "default" : "ghost"}
                  onClick={() => setActiveSourceId(src.id)}
                  className={`text-xs h-8 rounded-lg whitespace-nowrap ${
                    activeSourceId === src.id
                      ? "bg-stone-800 text-white font-bold"
                      : "bg-white/80 border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-white"
                  }`}
                >
                  {idx === 0 && <FileText className="h-3.5 w-3.5 mr-1.5 text-blue-400" />}
                  {idx === 1 && <UserCheck className="h-3.5 w-3.5 mr-1.5 text-emerald-400" />}
                  {idx === 2 && <Cpu className="h-3.5 w-3.5 mr-1.5 text-purple-400" />}
                  Source {idx + 1}
                </Button>
              ))}
            </div>

            {/* Dossier Document Cards */}
            <div className="space-y-6">
              {readingCase.sources
                .filter((src) => activeSourceId === "all" || activeSourceId === src.id)
                .map((src, idx) => (
                  <div
                    key={src.id}
                    className="rounded-2xl border border-stone-200/90 bg-white p-5 sm:p-7 shadow-xs relative overflow-hidden"
                  >
                    {/* Source Header */}
                    <div className="flex items-start justify-between gap-2 border-b border-stone-100 pb-3 mb-5">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-stone-600 px-2 py-0.5 rounded bg-stone-100 border border-stone-200">
                            SOURCE #{idx + 1}
                          </span>
                          <span className="text-xs text-stone-500">{src.subtitle}</span>
                        </div>
                        <h2 className="text-base sm:text-lg font-bold text-stone-900 mt-1.5">
                          {src.title}
                        </h2>
                      </div>
                    </div>

                    {/* Paragraphs */}
                    <div className="space-y-4 text-sm sm:text-[15px]">
                      {src.paragraphs.map((p) => (
                        <div key={p.id}>
                          {renderInteractiveText(p.text, p.id)}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: INVESTIGATION & REASONING PANEL (5 Columns ~ 42%)           */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-20">
            <div className="rounded-2xl border border-stone-200/90 bg-white p-5 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-5">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-amber-600" />
                  <h3 className="font-extrabold text-stone-900 text-sm sm:text-base uppercase tracking-wide">
                    Hồ Sơ Thử Thách Nhận Thức
                  </h3>
                </div>
                <span className="text-xs font-mono text-stone-500">4 Tasks</span>
              </div>

              {/* Tasks List */}
              <div className="space-y-6">
                
                {/* Task 1: FIND */}
                <div className="rounded-xl border border-stone-200/80 bg-[#FAF9F6] p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
                      TASK 01 · FIND (Locating Detail)
                    </span>
                    {taskAnswers["task-01"] && (
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                    )}
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-stone-800 leading-snug">
                    {readingCase.tasks[0].question}
                  </p>
                  {"options" in readingCase.tasks[0] && (
                    <div className="space-y-1.5 pt-1">
                      {readingCase.tasks[0].options.map((opt) => (
                        <label
                          key={opt.id}
                          className={`flex items-start gap-2.5 p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                            taskAnswers["task-01"] === opt.id
                              ? "bg-amber-50 border-amber-400 text-amber-950 font-medium ring-1 ring-amber-400/40"
                              : "border-stone-200/80 bg-white hover:bg-stone-50 text-stone-700"
                          }`}
                        >
                          <input
                            type="radio"
                            name="task-01"
                            checked={taskAnswers["task-01"] === opt.id}
                            onChange={() => setTaskAnswers({ ...taskAnswers, "task-01": opt.id })}
                            className="mt-0.5 text-amber-600 focus:ring-0"
                          />
                          <span>
                            <strong className="mr-1">{opt.id}.</strong> {opt.text}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Task 2: MATCH */}
                <div className="rounded-xl border border-stone-200/80 bg-[#FAF9F6] p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                      TASK 02 · MATCH (Cross-Source Timeline)
                    </span>
                    {taskAnswers["task-02"] && (
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                    )}
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-stone-800 leading-snug">
                    {readingCase.tasks[1].question}
                  </p>
                  {"options" in readingCase.tasks[1] && (
                    <div className="space-y-1.5 pt-1">
                      {readingCase.tasks[1].options.map((opt) => (
                        <label
                          key={opt.id}
                          className={`flex items-start gap-2.5 p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                            taskAnswers["task-02"] === opt.id
                              ? "bg-amber-50 border-amber-400 text-amber-950 font-medium ring-1 ring-amber-400/40"
                              : "border-stone-200/80 bg-white hover:bg-stone-50 text-stone-700"
                          }`}
                        >
                          <input
                            type="radio"
                            name="task-02"
                            checked={taskAnswers["task-02"] === opt.id}
                            onChange={() => setTaskAnswers({ ...taskAnswers, "task-02": opt.id })}
                            className="mt-0.5 text-amber-600 focus:ring-0"
                          />
                          <span>
                            <strong className="mr-1">{opt.id}.</strong> {opt.text}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Task 3: INFER */}
                <div className="rounded-xl border border-stone-200/80 bg-[#FAF9F6] p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded bg-purple-100 text-purple-800 border border-purple-200">
                      TASK 03 · INFER (Boundary-Restricted)
                    </span>
                    {taskAnswers["task-03"] && (
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                    )}
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-stone-800 leading-snug">
                    {readingCase.tasks[2].question}
                  </p>
                  {"options" in readingCase.tasks[2] && (
                    <div className="space-y-1.5 pt-1">
                      {readingCase.tasks[2].options.map((opt) => (
                        <label
                          key={opt.id}
                          className={`flex items-start gap-2.5 p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                            taskAnswers["task-03"] === opt.id
                              ? "bg-amber-50 border-amber-400 text-amber-950 font-medium ring-1 ring-amber-400/40"
                              : "border-stone-200/80 bg-white hover:bg-stone-50 text-stone-700"
                          }`}
                        >
                          <input
                            type="radio"
                            name="task-03"
                            checked={taskAnswers["task-03"] === opt.id}
                            onChange={() => setTaskAnswers({ ...taskAnswers, "task-03": opt.id })}
                            className="mt-0.5 text-amber-600 focus:ring-0"
                          />
                          <span>
                            <strong className="mr-1">{opt.id}.</strong> {opt.text}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Task 4: PROVE (Click-to-Source) */}
                <div className="rounded-xl border border-stone-200/80 bg-[#FAF9F6] p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-200">
                      TASK 04 · PROVE (Click Câu Làm Bằng Chứng)
                    </span>
                    {selectedEvidenceSentence && (
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                    )}
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-stone-800 leading-snug">
                    {readingCase.tasks[3].instruction}
                  </p>
                  
                  <div className="rounded-lg bg-white p-3 border border-stone-200 text-xs">
                    {selectedEvidenceSentence ? (
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Câu văn đã chọn làm bằng chứng:
                        </span>
                        <p className="italic text-stone-800 bg-emerald-50/60 p-2.5 rounded border border-emerald-200/60 leading-relaxed">
                          "{selectedEvidenceSentence}"
                        </p>
                      </div>
                    ) : (
                      <p className="text-stone-500 italic">
                        👉 Hãy click trực tiếp vào câu văn trong <strong>Source 1 (Cột Trái)</strong> để ghim làm bằng chứng.
                      </p>
                    )}
                  </div>
                </div>

                {/* Final Deduction Section */}
                <div className="border-t border-stone-200 pt-5 space-y-4">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-amber-600" />
                    <h4 className="font-black text-stone-900 text-sm uppercase tracking-wide">
                      Final Deduction: Kết Án
                    </h4>
                  </div>

                  <p className="text-xs text-stone-700 font-medium">
                    {readingCase.final_deduction.question}
                  </p>

                  <div className="space-y-2">
                    {readingCase.final_deduction.options.map((opt) => (
                      <label
                        key={opt.id}
                        className={`flex items-start gap-2.5 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                          finalHypothesis === opt.id
                            ? "bg-amber-50 border-amber-400 text-amber-950 font-medium ring-1 ring-amber-400/40"
                            : "border-stone-200/80 bg-white hover:bg-stone-50 text-stone-700"
                        }`}
                      >
                        <input
                          type="radio"
                          name="final_hypothesis"
                          checked={finalHypothesis === opt.id}
                          onChange={() => setFinalHypothesis(opt.id)}
                          className="mt-0.5 text-amber-600 focus:ring-0"
                        />
                        <span>
                          <strong className="mr-1">{opt.id}.</strong> {opt.text}
                        </span>
                      </label>
                    ))}
                  </div>

                  {/* Required Supporting Evidence Selection */}
                  <div className="space-y-2 pt-2">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-stone-600">
                      Chọn ĐÚNG 2 chứng cứ chứng minh kết luận trên:
                    </p>
                    <div className="space-y-1.5">
                      {readingCase.final_deduction.required_evidence_pool.map((ev) => {
                        const isChecked = selectedEvidenceIds.includes(ev.id);
                        return (
                          <label
                            key={ev.id}
                            className={`flex items-start gap-2.5 p-2 rounded-lg border text-xs cursor-pointer transition-all ${
                              isChecked
                                ? "bg-amber-50 border-amber-300 text-amber-950 font-medium"
                                : "border-stone-200/80 bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-50"
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
                    onClick={() => setViewState("autopsy")}
                    className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-md ${
                      canSubmitAutopsy
                        ? "bg-amber-500 hover:bg-amber-600 text-slate-950 cursor-pointer shadow-amber-500/20"
                        : "bg-stone-200 text-stone-400 cursor-not-allowed"
                    }`}
                  >
                    Xem Báo Cáo Phá Án (Case Autopsy)
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  {!canSubmitAutopsy && (
                    <p className="text-[11px] text-center text-stone-500">
                      Cần hoàn thành đủ 4 Tasks + Chọn Giả Thuyết + Chọn Bằng Chứng để mở khóa Autopsy.
                    </p>
                  )}
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Contextual Gloss Tooltip */}
      {activeGloss && (
        <ContextualGlossTooltip
          term={activeGloss.term}
          position={activeGloss.position}
          onClose={() => setActiveGloss(null)}
          onSave={handleSaveTerm}
          isSaved={savedTerms.includes(activeGloss.term.term)}
        />
      )}
    </div>
  );
}
