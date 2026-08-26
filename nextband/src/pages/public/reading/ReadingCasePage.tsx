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
import { CrimeSceneBlueprint } from "@/features/reading/components/CrimeSceneBlueprint";
import { ReadlangExplorationSidebar } from "@/features/reading/components/ReadlangExplorationSidebar";
import { Button } from "@/components/ui/button";
import {
  ReadingSettingsPopover,
  ReaderSettings,
} from "@/features/reading/components/ReadingSettingsPopover";
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
  Map as MapIcon,
} from "lucide-react";
import { SEO } from "@/components/common/SEO";

export default function ReadingCasePage() {
  const readingCase = CASE_001;

  // Reader Settings (Font size, line height, font family, theme, alignment)
  const [readerSettings, setReaderSettings] = useState<ReaderSettings>(() => {
    try {
      const saved = localStorage.getItem("nextband_reading_settings");
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      fontSize: 16,
      lineHeight: "relaxed",
      fontFamily: "sans",
      theme: "light",
      textAlign: "left",
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

  // Hover Context Teaser State
  const [isIntroHovered, setIsIntroHovered] = useState(false);

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

  // Right Panel Tab State: "tasks" | "explain"
  const [rightPanelTab, setRightPanelTab] = useState<"tasks" | "explain">("tasks");
  const [activeExplainTerm, setActiveExplainTerm] = useState<VocabularyTerm | null>(null);

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

    // Automatically set active explain term and switch to Explain sidebar (Readlang style)
    setActiveExplainTerm(termObj);
    setRightPanelTab("explain");

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

  const handleSaveTerm = (term: string) => {
    setSavedTerms((prev) =>
      prev.includes(term) ? prev.filter((t) => t !== term) : [...prev, term]
    );
  };

  const handleSentenceClick = (sentenceText: string) => {
    setSelectedEvidenceSentence(sentenceText);
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
          pronunciation: "",
          pos: "",
          meaning_en: "",
          meaning_vi: segment.text,
          context_note: "",
        };
        const isTranslated = Boolean(activeTranslatedWords[termKey]);
        const shortVi = (termData.meaning_vi || "")
          .replace(/^Từ vựng:\s*/i, "")
          .replace(/^Cụm từ:\s*/i, "")
          .split("/")[0]
          .replace(/\(.*?\)/g, "")
          .trim();

        return (
          <span
            key={`phrase-${segIdx}`}
            className="relative inline mx-0.5"
          >
            {isTranslated && (
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap text-[11px] font-bold text-[#14532d] bg-[#dcfce7] px-2 py-0.5 rounded border border-[#86efac] shadow-xs animate-in fade-in duration-150 pointer-events-none flex items-center justify-center">
                {shortVi}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#dcfce7] border-r border-b border-[#86efac] rotate-45" />
              </span>
            )}
            <span
              onClick={(e) => handleWordClick(e, termData, termKey)}
              className={`cursor-pointer transition-colors select-none ${
                isTranslated
                  ? "font-bold text-emerald-950 underline decoration-emerald-600 decoration-2"
                  : "text-stone-800 hover:text-stone-950 hover:underline decoration-stone-300"
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
            pronunciation: "",
            pos: "",
            meaning_en: "",
            meaning_vi: token,
            context_note: "",
          };
          const isTranslated = Boolean(activeTranslatedWords[termKey]);
          const shortVi = (termData.meaning_vi || "")
          .replace(/^Từ vựng:\s*/i, "")
          .replace(/^Cụm từ:\s*/i, "")
          .split("/")[0]
          .replace(/\(.*?\)/g, "")
          .trim();

          return (
            <span
              key={`tok-${segIdx}-${tokIdx}`}
              className="relative inline mx-0.5"
            >
              {isTranslated && (
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap text-[11px] font-bold text-[#14532d] bg-[#dcfce7] px-2 py-0.5 rounded border border-[#86efac] shadow-xs animate-in fade-in duration-150 pointer-events-none flex items-center justify-center">
                  {shortVi}
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#dcfce7] border-r border-b border-[#86efac] rotate-45" />
                </span>
              )}
              <span
                onClick={(e) => handleWordClick(e, termData, termKey)}
                className={`cursor-pointer transition-colors select-none ${
                  isTranslated
                    ? "font-bold text-emerald-950 underline decoration-emerald-600 decoration-2"
                    : "text-stone-800 hover:text-stone-950 hover:underline decoration-stone-300"
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

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col font-sans">
      <SEO
        title={`Case #001: ${readingCase.title} | ARIS IELTS Reading`}
        description="Vụ án Khoa học Greenland: Sự Biến Mất Của Hồ Băng - Khảo hạch đọc hiểu IELTS Band 5.0"
      />

      {/* Top Case Header Bar */}
      <div className="border-b border-stone-200/90 bg-[#FAF8F5]/95 sticky top-0 z-30 backdrop-blur-md px-4 py-3 sm:px-6 shadow-xs">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-sky-100 border border-sky-300 text-sky-950 font-black text-xs">
              #01
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-black text-stone-900 uppercase tracking-wide">
                  {readingCase.title}
                </h1>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800">
                  {readingCase.level.realm_name_vi} · Band {readingCase.level.ielts_band.toFixed(1)}
                </span>
                <span className="text-xs text-amber-500 hidden sm:inline-block">★★☆☆</span>
              </div>
              <p className="text-[11px] text-stone-500 hidden sm:block">
                {readingCase.universe.name} · Thời lượng khuyến nghị: ~10 phút
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
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
                onClick={() => setIsIntroHovered((prev) => !prev)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-100/90 hover:bg-sky-200 text-sky-950 border border-sky-300 text-xs font-black transition-all shadow-xs cursor-pointer active:scale-95"
              >
                <Sparkles className="h-3.5 w-3.5 text-sky-700 animate-pulse" />
                <span>💡 Bối cảnh hồ sơ nghiên cứu</span>
              </button>

              {/* Hover/Click Context Popover */}
              {isIntroHovered && (
                <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-2xl border border-sky-300 bg-[#FFFDF9] p-4 text-stone-900 shadow-2xl z-40 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center gap-2 border-b border-sky-200 pb-2 mb-2.5">
                    <span className="text-base">❄️</span>
                    <h4 className="text-xs sm:text-sm font-black text-sky-950 uppercase tracking-wide">
                      Hồ sơ nghiên cứu: Hồ Băng Greenland
                    </h4>
                  </div>
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
                </div>
              )}
            </div>

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
                    ? "bg-sky-600 hover:bg-sky-700 text-white font-bold shadow-xs"
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
                      ? "bg-slate-800 text-white font-bold"
                      : "bg-white/80 border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-white"
                  }`}
                >
                  {idx === 0 && <FileText className="h-3.5 w-3.5 mr-1.5 text-sky-400" />}
                  {idx === 1 && <UserCheck className="h-3.5 w-3.5 mr-1.5 text-emerald-400" />}
                  {idx === 2 && <Cpu className="h-3.5 w-3.5 mr-1.5 text-purple-400" />}
                  Source {idx + 1}
                </Button>
              ))}
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
            </div>

            {/* Dossier Document Cards */}
            <div className="space-y-6">
              {/* Standalone Diagram Tab View */}
              {activeSourceId === "diagram" && (
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
                            <h2 className="text-base sm:text-lg font-bold text-stone-900 mt-1.5">
                              {src.title}
                            </h2>
                          </div>
                        </div>

                        {/* Paragraphs with customizable reader typography */}
                        <div
                          className={`space-y-4 ${fontClass} ${leadingClass} ${alignClass}`}
                          style={{ fontSize: `${readerSettings.fontSize}px` }}
                        >
                          {src.paragraphs.map((p) => (
                            <div key={p.id}>
                              {renderInteractiveText(p.text, p.id)}
                            </div>
                          ))}
                        </div>

                        {/* Attached Diagram in Source 1 */}
                        {src.id === "source-01" && (
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
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: INVESTIGATION & REASONING PANEL (5 Columns ~ 42%)           */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-20">
            <div className="rounded-2xl border border-stone-200/90 bg-white shadow-xs overflow-hidden">
              {/* Right Panel Tabs: Tasks vs Explain */}
              <div className="flex items-center border-b border-stone-200 bg-stone-50/80 p-1.5 gap-1.5">
                <button
                  onClick={() => setRightPanelTab("tasks")}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    rightPanelTab === "tasks"
                      ? "bg-white text-stone-900 shadow-xs border border-stone-200/80 font-black"
                      : "text-stone-600 hover:text-stone-900 hover:bg-stone-100/60"
                  }`}
                >
                  <ShieldAlert className="h-3.5 w-3.5 text-amber-600" />
                  <span>Khảo Hạch (Tasks)</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-stone-100 text-stone-700">
                    {Object.keys(taskAnswers).length + (selectedEvidenceSentence ? 1 : 0)}/4
                  </span>
                </button>

                <button
                  onClick={() => setRightPanelTab("explain")}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    rightPanelTab === "explain"
                      ? "bg-white text-emerald-950 shadow-xs border border-stone-200/80 font-black"
                      : "text-stone-600 hover:text-stone-900 hover:bg-stone-100/60"
                  }`}
                >
                  <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Giải Thích (Explain)</span>
                  {activeExplainTerm && (
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  )}
                </button>
              </div>

              {/* TAB 1: READLANG EXPLAIN SIDEBAR */}
              {rightPanelTab === "explain" && (
                <ReadlangExplorationSidebar
                  activeTerm={activeExplainTerm}
                  savedTerms={savedTerms}
                  onToggleSave={handleSaveTerm}
                  onBackToTasks={() => setRightPanelTab("tasks")}
                />
              )}

              {/* TAB 2: TASKS & FINAL DEDUCTION */}
              {rightPanelTab === "tasks" && (
                <div className="p-5 sm:p-6 space-y-6">
                  {/* Tasks List */}
                  <div className="space-y-6">
                    
                    {/* Task 1: FIND */}
                    <div className="rounded-xl border border-stone-200/80 bg-[#FAF9F6] p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
                          TASK 01 · FIND (Locating Detail)
                        </span>
                        {taskAnswers["task-01"] && (
                          taskAnswers["task-01"] === "B" ? (
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
                        {readingCase.tasks[0].question}
                      </p>
                      {"options" in readingCase.tasks[0] && (
                        <div className="space-y-1.5 pt-1">
                          {readingCase.tasks[0].options.map((opt) => {
                            const userAns = taskAnswers["task-01"];
                            const isAnswered = Boolean(userAns);
                            const isThisSelected = userAns === opt.id;
                            const isCorrectOpt = opt.id === "B";

                            let cardStyle = "border-stone-200/80 bg-white hover:bg-stone-50 text-stone-700";
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
                                className={`flex items-start gap-2.5 p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${cardStyle}`}
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
                      )}

                      {/* Instant Explanation for Task 1 */}
                      {taskAnswers["task-01"] && (
                        <div className={`p-3 rounded-xl border text-xs leading-relaxed animate-in fade-in duration-150 ${
                          taskAnswers["task-01"] === "B"
                            ? "bg-emerald-50/80 border-emerald-200 text-emerald-950"
                            : "bg-rose-50/80 border-rose-200 text-rose-950"
                        }`}>
                          <p className="font-bold flex items-center gap-1.5 mb-1">
                            {taskAnswers["task-01"] === "B" ? (
                              <span className="text-emerald-800">✅ Chính xác!</span>
                            ) : (
                              <span className="text-rose-800">❌ Chưa chính xác. Đáp án đúng là B.</span>
                            )}
                          </p>
                          <p className="text-stone-700">
                            💡 <strong>Giải thích:</strong> Trong Source 1 (đoạn 2) ghi rõ: <em>&ldquo;The perimeter ice ridges showed no signs of overflow or horizontal collapse&rdquo;</em> chứng minh nước không hề tràn qua bề mặt hay làm sụp các gờ băng xung quanh.
                          </p>
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
                          taskAnswers["task-02"] === "C" ? (
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
                        {readingCase.tasks[1].question}
                      </p>
                      {"options" in readingCase.tasks[1] && (
                        <div className="space-y-1.5 pt-1">
                          {readingCase.tasks[1].options.map((opt) => {
                            const userAns = taskAnswers["task-02"];
                            const isAnswered = Boolean(userAns);
                            const isThisSelected = userAns === opt.id;
                            const isCorrectOpt = opt.id === "C";

                            let cardStyle = "border-stone-200/80 bg-white hover:bg-stone-50 text-stone-700";
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
                                className={`flex items-start gap-2.5 p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${cardStyle}`}
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
                      )}

                      {/* Instant Explanation for Task 2 */}
                      {taskAnswers["task-02"] && (
                        <div className={`p-3 rounded-xl border text-xs leading-relaxed animate-in fade-in duration-150 ${
                          taskAnswers["task-02"] === "C"
                            ? "bg-emerald-50/80 border-emerald-200 text-emerald-950"
                            : "bg-rose-50/80 border-rose-200 text-rose-950"
                        }`}>
                          <p className="font-bold flex items-center gap-1.5 mb-1">
                            {taskAnswers["task-02"] === "C" ? (
                              <span className="text-emerald-800">✅ Chính xác!</span>
                            ) : (
                              <span className="text-rose-800">❌ Chưa chính xác. Đáp án đúng là C.</span>
                            )}
                          </p>
                          <p className="text-stone-700">
                            💡 <strong>Giải thích:</strong> Dr. Vance giả thuyết nhiệt địa nhiệt/núi lửa làm ấm đá đáy (Source 2), nhưng số liệu cảm biến viễn thám tại Source 3 chứng minh nhiệt độ đá đáy cố định ở mức -1.8°C suốt quá trình xả nước, bác bỏ hoàn toàn giả thuyết làm ấm.
                          </p>
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
                          taskAnswers["task-03"] === "A" ? (
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
                        {readingCase.tasks[2].question}
                      </p>
                      {"options" in readingCase.tasks[2] && (
                        <div className="space-y-1.5 pt-1">
                          {readingCase.tasks[2].options.map((opt) => {
                            const userAns = taskAnswers["task-03"];
                            const isAnswered = Boolean(userAns);
                            const isThisSelected = userAns === opt.id;
                            const isCorrectOpt = opt.id === "A";

                            let cardStyle = "border-stone-200/80 bg-white hover:bg-stone-50 text-stone-700";
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
                                className={`flex items-start gap-2.5 p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${cardStyle}`}
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
                      )}

                      {/* Instant Explanation for Task 3 */}
                      {taskAnswers["task-03"] && (
                        <div className={`p-3 rounded-xl border text-xs leading-relaxed animate-in fade-in duration-150 ${
                          taskAnswers["task-03"] === "A"
                            ? "bg-emerald-50/80 border-emerald-200 text-emerald-950"
                            : "bg-rose-50/80 border-rose-200 text-rose-950"
                        }`}>
                          <p className="font-bold flex items-center gap-1.5 mb-1">
                            {taskAnswers["task-03"] === "A" ? (
                              <span className="text-emerald-800">✅ Chính xác!</span>
                            ) : (
                              <span className="text-rose-800">❌ Chưa chính xác. Đáp án đúng là A.</span>
                            )}
                          </p>
                          <p className="text-stone-700">
                            💡 <strong>Giải thích:</strong> Cảm biến áp suất ghi nhận sóng xung kích thẳng đứng cực lớn lúc 03:12 AM (Source 3), đúng 3 phút trước khi nước bắt đầu rút ồ ạt lúc 03:15 AM, chứng minh vết nứt lớn đã mở toang xuyên suốt dải băng ngay tại thời điểm này.
                          </p>
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
                          selectedEvidenceSentence === "However, the crevasse extends straight down through the entire 850-meter ice sheet, so the water drained directly to the bedrock." ? (
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
                        {readingCase.tasks[3].instruction}
                      </p>
                      
                      <div className="rounded-lg bg-white p-3 border border-stone-200 text-xs">
                        {selectedEvidenceSentence ? (
                          <div className="space-y-2">
                            <span className="text-[11px] font-bold text-stone-800 flex items-center gap-1">
                              Câu văn đã chọn:
                            </span>
                            <p className={`p-2.5 rounded border leading-relaxed italic ${
                              selectedEvidenceSentence === "However, the crevasse extends straight down through the entire 850-meter ice sheet, so the water drained directly to the bedrock."
                                ? "bg-emerald-50 border-emerald-300 text-emerald-950 font-medium"
                                : "bg-rose-50 border-rose-300 text-rose-950"
                            }`}>
                              &ldquo;{selectedEvidenceSentence}&rdquo;
                            </p>

                            {/* Instant Explanation for Task 4 */}
                            <div className={`p-2.5 rounded-lg border text-xs leading-relaxed ${
                              selectedEvidenceSentence === "However, the crevasse extends straight down through the entire 850-meter ice sheet, so the water drained directly to the bedrock."
                                ? "bg-emerald-50/80 border-emerald-200 text-emerald-950"
                                : "bg-rose-50/80 border-rose-200 text-rose-950"
                            }`}>
                              {selectedEvidenceSentence === "However, the crevasse extends straight down through the entire 850-meter ice sheet, so the water drained directly to the bedrock." ? (
                                <p>
                                  ✅ <strong>Chính xác!</strong> Câu văn tại Source 1 (đoạn 3) nêu rõ khe nứt đâm thẳng qua toàn bộ 850m tầng băng tới tận lớp đá đáy (bedrock).
                                </p>
                              ) : (
                                <p>
                                  ❌ <strong>Chưa chính xác.</strong> Câu bạn chọn không chứa bằng chứng trực tiếp về độ sâu 850m và đường thoát nước xuống đá đáy. Hãy click vào câu cuối ở đoạn 3 của Source 1.
                                </p>
                              )}
                            </div>
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
                    {readingCase.final_deduction.options.map((opt) => {
                      const isAnswered = Boolean(finalHypothesis);
                      const isThisSelected = finalHypothesis === opt.id;
                      const isCorrectOpt = opt.id === "hyp-2";

                      let cardStyle = "border-stone-200/80 bg-white hover:bg-stone-50 text-stone-700";
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
                            <strong className="mr-1">{opt.id.replace("hyp-", "Giả thuyết ")}:</strong> {opt.text}
                          </span>
                        </label>
                      );
                    })}
                  </div>

                  {/* Instant Explanation for Final Deduction */}
                  {finalHypothesis && (
                    <div className={`p-3 rounded-xl border text-xs leading-relaxed animate-in fade-in duration-150 ${
                      finalHypothesis === "hyp-2"
                        ? "bg-emerald-50/80 border-emerald-200 text-emerald-950"
                        : "bg-rose-50/80 border-rose-200 text-rose-950"
                    }`}>
                      <p className="font-bold flex items-center gap-1.5 mb-1">
                        {finalHypothesis === "hyp-2" ? (
                          <span className="text-emerald-800">✅ Kết Luận Chính Xác!</span>
                        ) : (
                          <span className="text-rose-800">❌ Chưa chính xác. Kết luận đúng là Fast Hydro-Fracturing.</span>
                        )}
                      </p>
                      <p className="text-stone-700">
                        💡 <strong>Giải thích:</strong> Áp lực cơ học từ 8 triệu m³ nước kết hợp biến dạng bề mặt (nhô lên 18cm) đã kích hoạt hiện tượng nứt gãy thủy lực nhanh, mở toang vết nứt thẳng đứng sâu 850m xuyên suốt dải băng tới lớp đá đáy.
                      </p>
                    </div>
                  )}

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
          )}
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
