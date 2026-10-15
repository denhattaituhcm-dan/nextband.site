import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/common/SEO";
import {
  Volume2,
  ArrowRight,
  Search,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ChevronDown,
  BookOpen,
} from "lucide-react";
import unit01Data from "@/data/idioms/unit01";

export default function EnglishIdiomsHubPage() {
  const [activeTab, setActiveTab] = useState<"learn" | "practice">("learn");
  const [activeModuleFilter, setActiveModuleFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [openDrawers, setOpenDrawers] = useState<Record<string, boolean>>({});
  const [currentlyPlayingAudio, setCurrentlyPlayingAudio] = useState<string | null>(null);
  const [listenedIds, setListenedIds] = useState<Set<string>>(new Set());

  // Audio ref
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Exercise 1.3 State (Group Sorting)
  const [placed13, setPlaced13] = useState<{ YOUNG: string[]; OLD: string[] }>({
    YOUNG: ["bright young things"],
    OLD: [],
  });
  const [feedback13, setFeedback13] = useState<{ status: "correct" | "incorrect" | null; msg: string }>({
    status: null,
    msg: "",
  });

  // Exercise 1.4 State (Listening Fill-in-the-blank)
  const [answers14, setAnswers14] = useState<Record<number, string>>({});
  const [checked14, setChecked14] = useState<Record<number, boolean | null>>({});
  const [showRetry14, setShowRetry14] = useState(false);

  // Exercise 1.5 State (Error Correction)
  const [answers15, setAnswers15] = useState<Record<number, string>>({});
  const [checked15, setChecked15] = useState<Record<number, boolean | null>>({});
  const [showRetry15, setShowRetry15] = useState(false);

  // Exercise 1.6 State (Hangman / Definition fill)
  const [answers16, setAnswers16] = useState<Record<number, string>>({});
  const [checked16, setChecked16] = useState<Record<number, boolean | null>>({});
  const [showRetry16, setShowRetry16] = useState(false);

  // Exercise 1.7 State (Situational Judgment)
  const [selected17, setSelected17] = useState<Record<number, string>>({});
  const [checked17, setChecked17] = useState<Record<number, boolean | null>>({});
  const [showRetry17, setShowRetry17] = useState(false);

  // Clean audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const playAudio = (url: string, idiomId?: string) => {
    if (!audioRef.current) return;

    if (currentlyPlayingAudio === url && !audioRef.current.paused) {
      audioRef.current.pause();
      setCurrentlyPlayingAudio(null);
      return;
    }

    audioRef.current.src = url;
    audioRef.current.play().then(() => {
      setCurrentlyPlayingAudio(url);
      if (idiomId) {
        setListenedIds((prev) => new Set(prev).add(idiomId));
      }
    }).catch((err) => {
      console.warn("Audio playback interrupted or failed:", err);
    });

    audioRef.current.onended = () => {
      setCurrentlyPlayingAudio(null);
    };
  };

  const toggleDrawer = (id: string) => {
    setOpenDrawers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Idioms flat list
  const allIdioms = unit01Data.modules.flatMap((m) =>
    m.idioms.map((idm) => ({
      ...idm,
      moduleId: m.module_id,
      moduleTitle: m.module_title,
    }))
  );

  const filteredIdioms = allIdioms.filter((item) => {
    if (activeModuleFilter !== "ALL" && item.moduleId !== activeModuleFilter) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      item.headword.toLowerCase().includes(q) ||
      item.definition_en.toLowerCase().includes(q) ||
      item.context_sentence.toLowerCase().includes(q) ||
      item.vietnamese.meaning.toLowerCase().includes(q)
    );
  });

  // Highlight keywords
  const renderHighlightedSentence = (sentence: string, headword: string) => {
    const clean = headword.replace(/^(as|in the|that|a|an)\s+/i, "").replace(/one's/i, "").trim();
    const token = clean.split(" ").filter((t) => t.length > 2)[0] || clean;
    const parts = sentence.split(new RegExp(`(${token}[a-z]*|${headword})`, "gi"));
    return parts.map((part, idx) =>
      part.toLowerCase() === token.toLowerCase() || part.toLowerCase() === headword.toLowerCase() ? (
        <mark key={idx} className="bg-purple-100 text-purple-900 font-bold px-1 rounded-xs">
          {part}
        </mark>
      ) : (
        <span key={idx}>{part}</span>
      )
    );
  };

  // EXERCISE 1.3 LOGIC
  const ex13 = unit01Data.exercises.find((e) => e.exercise_id === "1.3");
  const moveToBucket13 = (item: string, group: "YOUNG" | "OLD") => {
    setPlaced13((prev) => {
      const young = prev.YOUNG.filter((x) => x !== item);
      const old = prev.OLD.filter((x) => x !== item);
      if (group === "YOUNG") young.push(item);
      else old.push(item);
      return { YOUNG: young, OLD: old };
    });
  };

  const removeFromBucket13 = (group: "YOUNG" | "OLD", item: string) => {
    if (item === "bright young things") return; // sample
    setPlaced13((prev) => ({
      ...prev,
      [group]: prev[group].filter((x) => x !== item),
    }));
  };

  const check13 = () => {
    const targetYoung = ["bright young things", "tender age", "knee-high to a grasshopper"];
    const targetOld = ["no spring chicken", "over the hill", "great age"];
    const yOk = targetYoung.every((x) => placed13.YOUNG.includes(x)) && placed13.YOUNG.length === targetYoung.length;
    const oOk = targetOld.every((x) => placed13.OLD.includes(x)) && placed13.OLD.length === targetOld.length;
    if (yOk && oOk) {
      setFeedback13({ status: "correct", msg: "✓ Xuất sắc! Bạn đã phân loại chính xác toàn bộ thành ngữ vào 2 nhóm tuổi." });
    } else {
      setFeedback13({ status: "incorrect", msg: "✗ Chưa hoàn toàn chính xác. Hãy rà soát lại các mục trong từng nhóm và thử lại." });
    }
  };

  const reset13 = () => {
    setPlaced13({ YOUNG: ["bright young things"], OLD: [] });
    setFeedback13({ status: null, msg: "" });
  };

  // EXERCISE 1.4 LOGIC
  const ex14 = unit01Data.exercises.find((e) => e.exercise_id === "1.4");
  const check14 = () => {
    if (!ex14?.questions) return;
    const res: Record<number, boolean> = {};
    let hasFail = false;
    ex14.questions.forEach((q) => {
      const val = (answers14[q.question_number] || "").trim().toLowerCase().replace(/[.,!]/g, "");
      const isMatch = q.accepted_answers.some((ans) => ans.toLowerCase().replace(/[.,!]/g, "") === val);
      res[q.question_number] = isMatch;
      if (!isMatch) hasFail = true;
    });
    setChecked14(res);
    setShowRetry14(hasFail);
  };

  const reset14 = () => {
    setAnswers14({});
    setChecked14({});
    setShowRetry14(false);
  };

  const retry14 = () => {
    setAnswers14((prev) => {
      const updated = { ...prev };
      Object.keys(checked14).forEach((k) => {
        const num = Number(k);
        if (checked14[num] === false) {
          delete updated[num];
        }
      });
      return updated;
    });
    setChecked14((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((k) => {
        const num = Number(k);
        if (updated[num] === false) {
          delete updated[num];
        }
      });
      return updated;
    });
    setShowRetry14(false);
  };

  // EXERCISE 1.5 LOGIC
  const ex15 = unit01Data.exercises.find((e) => e.exercise_id === "1.5");
  const check15 = () => {
    if (!ex15?.questions) return;
    const res: Record<number, boolean> = {};
    let hasFail = false;
    ex15.questions.forEach((q) => {
      const val = (answers15[q.question_number] || "").trim().toLowerCase().replace(/[.,!]/g, "");
      const targetClean = q.target_corrected.toLowerCase().replace(/[.,!]/g, "");
      const hasCorrectWord = val.includes(q.correct_word.toLowerCase());
      const isMatch = val === targetClean || hasCorrectWord;
      res[q.question_number] = isMatch;
      if (!isMatch) hasFail = true;
    });
    setChecked15(res);
    setShowRetry15(hasFail);
  };

  const reset15 = () => {
    setAnswers15({});
    setChecked15({});
    setShowRetry15(false);
  };

  const retry15 = () => {
    setAnswers15((prev) => {
      const updated = { ...prev };
      Object.keys(checked15).forEach((k) => {
        const num = Number(k);
        if (checked15[num] === false) delete updated[num];
      });
      return updated;
    });
    setChecked15((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((k) => {
        const num = Number(k);
        if (updated[num] === false) delete updated[num];
      });
      return updated;
    });
    setShowRetry15(false);
  };

  // EXERCISE 1.6 LOGIC
  const ex16 = unit01Data.exercises.find((e) => e.exercise_id === "1.6");
  const check16 = () => {
    if (!ex16?.questions) return;
    const res: Record<number, boolean> = {};
    let hasFail = false;
    ex16.questions.forEach((q) => {
      const val = (answers16[q.question_number] || "").trim().toLowerCase();
      const isMatch = q.accepted_answers.some((a) => a.toLowerCase() === val);
      res[q.question_number] = isMatch;
      if (!isMatch) hasFail = true;
    });
    setChecked16(res);
    setShowRetry16(hasFail);
  };

  const reset16 = () => {
    setAnswers16({});
    setChecked16({});
    setShowRetry16(false);
  };

  const retry16 = () => {
    setAnswers16((prev) => {
      const updated = { ...prev };
      Object.keys(checked16).forEach((k) => {
        const num = Number(k);
        if (checked16[num] === false) delete updated[num];
      });
      return updated;
    });
    setChecked16((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((k) => {
        const num = Number(k);
        if (updated[num] === false) delete updated[num];
      });
      return updated;
    });
    setShowRetry16(false);
  };

  // EXERCISE 1.7 LOGIC
  const ex17 = unit01Data.exercises.find((e) => e.exercise_id === "1.7");
  const check17 = () => {
    if (!ex17?.questions) return;
    const res: Record<number, boolean> = {};
    let hasFail = false;
    ex17.questions.forEach((q) => {
      const isMatch = selected17[q.question_number] === q.correct_key;
      res[q.question_number] = isMatch;
      if (!isMatch) hasFail = true;
    });
    setChecked17(res);
    setShowRetry17(hasFail);
  };

  const reset17 = () => {
    setSelected17({});
    setChecked17({});
    setShowRetry17(false);
  };

  const retry17 = () => {
    setSelected17((prev) => {
      const updated = { ...prev };
      Object.keys(checked17).forEach((k) => {
        const num = Number(k);
        if (checked17[num] === false) delete updated[num];
      });
      return updated;
    });
    setChecked17((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((k) => {
        const num = Number(k);
        if (updated[num] === false) delete updated[num];
      });
      return updated;
    });
    setShowRetry17(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D2825] font-sans selection:bg-[#F2DBD3] selection:text-[#2D2825]">
      <SEO
        title="English Idioms Master — Unit 01: Age | ARIS IELTS"
        description="Luyện thành ngữ tiếng Anh chủ đề Tuổi tác (Age) qua ví dụ ngữ cảnh, audio bản ngữ và 5 bài tập tương tác."
      />

      <audio ref={audioRef} preload="auto" />

      {/* Sub-nav Header */}
      <nav className="border-b border-[#EAE3D9] bg-[#FAF7F2]/95 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6 sm:gap-8 text-xs font-medium text-[#7A7067]">
            <Link to="/reading" className="hover:text-[#2D2825] transition-colors pb-1">
              ← Tủ sách đọc báo
            </Link>
            <button
              onClick={() => setActiveTab("learn")}
              className={`pb-1 transition-all cursor-pointer font-semibold ${
                activeTab === "learn"
                  ? "text-[#2D2825] border-b-2 border-[#2D2825]"
                  : "hover:text-[#2D2825]"
              }`}
            >
              📖 Thẻ thành ngữ ({allIdioms.length})
            </button>
            <button
              onClick={() => setActiveTab("practice")}
              className={`pb-1 transition-all cursor-pointer font-semibold ${
                activeTab === "practice"
                  ? "text-[#2D2825] border-b-2 border-[#2D2825]"
                  : "hover:text-[#2D2825]"
              }`}
            >
              ✍️ Luyện tập tương tác (5 bài)
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE9DF] text-[11px] font-semibold text-[#635951]">
              <span>🎧 Đã nghe:</span>
              <span className="font-bold text-[#2D2825]">{listenedIds.size}/20</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#002147] via-[#0369a1] to-[#0284c7] rounded-3xl p-8 sm:p-10 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10 space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Section 1: Describing People & Things</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Unit 01: Age (Tuổi tác)
            </h1>
            <p className="text-sm sm:text-base text-slate-100 max-w-2xl leading-relaxed font-light">
              Khám phá 20 thành ngữ cốt lõi và cụm từ cố định về tuổi thơ, thanh xuân, bước ngoặt trưởng thành và những năm tháng xế chiều.
            </p>
            <div className="flex flex-wrap gap-3 pt-2 text-xs font-semibold">
              <span className="px-3 py-1 rounded-full bg-black/25">📚 20 Idioms & Expressions</span>
              <span className="px-3 py-1 rounded-full bg-black/25">🎙️ Audio giọng Mỹ chuẩn (US Accent)</span>
              <span className="px-3 py-1 rounded-full bg-black/25">🎯 5 Bài luyện tập tương tác</span>
            </div>
          </div>
        </section>

        {/* TAB 1: LEARN (CARDS) */}
        {activeTab === "learn" && (
          <div className="space-y-6">
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm thành ngữ, định nghĩa, tiếng Việt..."
                  className="w-full pl-10 pr-4 py-2 bg-white border border-[#EAE3D9] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                />
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                <button
                  onClick={() => setActiveModuleFilter("ALL")}
                  className={`px-3 py-1.5 rounded-full font-semibold transition cursor-pointer ${
                    activeModuleFilter === "ALL"
                      ? "bg-[#002147] text-white"
                      : "bg-white border border-[#EAE3D9] text-[#635951] hover:bg-slate-50"
                  }`}
                >
                  Tất cả ({allIdioms.length})
                </button>
                <button
                  onClick={() => setActiveModuleFilter("1.1")}
                  className={`px-3 py-1.5 rounded-full font-semibold transition cursor-pointer ${
                    activeModuleFilter === "1.1"
                      ? "bg-[#002147] text-white"
                      : "bg-white border border-[#EAE3D9] text-[#635951] hover:bg-slate-50"
                  }`}
                >
                  Module 1.1: Idioms about Age (12)
                </button>
                <button
                  onClick={() => setActiveModuleFilter("1.2")}
                  className={`px-3 py-1.5 rounded-full font-semibold transition cursor-pointer ${
                    activeModuleFilter === "1.2"
                      ? "bg-[#002147] text-white"
                      : "bg-white border border-[#EAE3D9] text-[#635951] hover:bg-slate-50"
                  }`}
                >
                  Module 1.2: Expressions with 'Age' (8)
                </button>
              </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredIdioms.map((item) => {
                const isPlaying = currentlyPlayingAudio === item.audio_url;
                const isOpen = !!openDrawers[item.id];
                const isInformal = (item.register || "").toLowerCase().includes("informal");
                const isFormal = (item.register || "").toLowerCase().includes("formal");

                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-[#EAE3D9] p-5 flex flex-col justify-between shadow-xs hover:shadow-md transition duration-200"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600">
                            M{item.moduleId}
                          </span>
                          {item.register && (
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${
                                isInformal
                                  ? "bg-amber-50 text-amber-800 border border-amber-200"
                                  : isFormal
                                  ? "bg-slate-100 text-slate-700 border border-slate-300"
                                  : "bg-sky-50 text-sky-800 border border-sky-200"
                              }`}
                            >
                              {item.register}
                            </span>
                          )}
                          {item.tone && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-purple-50 text-purple-700">
                              {item.tone}
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => playAudio(item.audio_url, item.id)}
                          className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition cursor-pointer ${
                            isPlaying
                              ? "bg-amber-500 text-white animate-pulse"
                              : "bg-sky-50 text-sky-700 hover:bg-sky-600 hover:text-white"
                          }`}
                          title="Nghe phát âm và câu ví dụ"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div>
                        <h3 className="font-extrabold text-lg text-slate-900 leading-snug">{item.headword}</h3>
                        <p className="font-serif italic text-sm text-purple-800 mt-0.5">"{item.definition_en}"</p>
                      </div>

                      <div className="p-3 bg-purple-50/70 border-l-2 border-purple-500 rounded-r-lg text-xs leading-relaxed text-slate-800">
                        <span className="block text-[10px] font-bold text-purple-700 uppercase tracking-wider mb-1">
                          Ví dụ ngữ cảnh:
                        </span>
                        {renderHighlightedSentence(item.context_sentence, item.headword)}
                      </div>

                      <div className="text-xs font-bold text-sky-800 flex items-center gap-1.5 pt-1">
                        <span>🇻🇳 {item.vietnamese.meaning}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 mt-4">
                      <button
                        type="button"
                        onClick={() => toggleDrawer(item.id)}
                        className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition cursor-pointer"
                      >
                        <span>{isOpen ? "Thu gọn chi tiết" : "Chi tiết ngữ pháp & IELTS"}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </button>

                      {isOpen && (
                        <div className="mt-3 space-y-2 text-xs pt-2 border-t border-dashed border-slate-200">
                          {item.usage_pattern && (
                            <div className="p-2 rounded bg-emerald-50 border border-emerald-200 text-emerald-900 text-[11px]">
                              <strong className="text-emerald-800 font-bold">Cấu trúc:</strong> {item.usage_pattern}
                            </div>
                          )}
                          <div className="text-slate-600 text-[11px] leading-relaxed">
                            <strong className="text-slate-800">Lưu ý:</strong> {item.vietnamese.usage_notes}
                          </div>
                          <div className="p-2 rounded bg-amber-50/80 border border-amber-200 text-amber-900 text-[11px] flex items-start gap-1.5">
                            <span className="shrink-0">💡</span>
                            <div>
                              <strong className="font-bold">IELTS Tip:</strong> {item.vietnamese.ielts_speaking_tip}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: PRACTICE */}
        {activeTab === "practice" && (
          <div className="space-y-8">
            {/* EXERCISE 1.3: GROUP SORTING */}
            {ex13 && (
              <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-6 shadow-xs">
                <div className="flex items-start gap-3 border-b border-slate-100 pb-4">
                  <span className="px-3 py-1 rounded-md bg-[#002147] text-white text-xs font-bold whitespace-nowrap">
                    Bài tập 1.3
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">{ex13.instruction}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Phân loại thành ngữ • Bấm nút để xếp vào nhóm Trẻ (YOUNG) hoặc Già (OLD)
                    </p>
                  </div>
                </div>

                {/* Panel options */}
                <div className="bg-slate-50 p-4 rounded-2xl flex flex-wrap gap-2">
                  {ex13.panel_options.map((opt) => {
                    if (opt === "bright young things") return null;
                    const isPlaced = placed13.YOUNG.includes(opt) || placed13.OLD.includes(opt);
                    return (
                      <div
                        key={opt}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${
                          isPlaced
                            ? "bg-slate-100 text-slate-400 border-slate-200 line-through"
                            : "bg-white text-slate-800 border-slate-300 shadow-xs"
                        }`}
                      >
                        <span>{opt}</span>
                        {!isPlaced && (
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => moveToBucket13(opt, "YOUNG")}
                              className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-sky-100 text-sky-800 hover:bg-sky-200 cursor-pointer"
                            >
                              + Trẻ
                            </button>
                            <button
                              type="button"
                              onClick={() => moveToBucket13(opt, "OLD")}
                              className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-amber-100 text-amber-800 hover:bg-amber-200 cursor-pointer"
                            >
                              + Già
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Buckets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl border-2 border-dashed border-sky-300 bg-sky-50/40 min-h-[160px] flex flex-col">
                    <span className="font-bold text-xs text-sky-900 mb-2">👶 Nhóm: YOUNG (Trẻ)</span>
                    <div className="space-y-1.5 flex-1">
                      {placed13.YOUNG.map((item) => (
                        <div
                          key={item}
                          className="flex items-center justify-between p-2 rounded-lg bg-white border border-sky-200 text-xs text-slate-800"
                        >
                          <span>{item}</span>
                          {item !== "bright young things" && (
                            <button
                              type="button"
                              onClick={() => removeFromBucket13("YOUNG", item)}
                              className="text-slate-400 hover:text-red-600 font-bold text-sm cursor-pointer"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50/40 min-h-[160px] flex flex-col">
                    <span className="font-bold text-xs text-amber-900 mb-2">🧓 Nhóm: OLD (Già)</span>
                    <div className="space-y-1.5 flex-1">
                      {placed13.OLD.map((item) => (
                        <div
                          key={item}
                          className="flex items-center justify-between p-2 rounded-lg bg-white border border-amber-200 text-xs text-slate-800"
                        >
                          <span>{item}</span>
                          <button
                            type="button"
                            onClick={() => removeFromBucket13("OLD", item)}
                            className="text-slate-400 hover:text-red-600 font-bold text-sm cursor-pointer"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {feedback13.status && (
                  <div
                    className={`p-3 rounded-xl text-xs font-semibold ${
                      feedback13.status === "correct"
                        ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                        : "bg-red-50 text-red-800 border border-red-200"
                    }`}
                  >
                    {feedback13.msg}
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={reset13}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                  >
                    Làm lại
                  </button>
                  <button
                    type="button"
                    onClick={check13}
                    className="px-4 py-2 rounded-xl bg-[#002147] hover:bg-[#0369a1] text-white text-xs font-bold cursor-pointer"
                  >
                    Kiểm tra kết quả
                  </button>
                </div>
              </div>
            )}

            {/* EXERCISE 1.4: LISTENING FILL-IN-THE-BLANK */}
            {ex14 && (
              <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-6 shadow-xs">
                <div className="flex items-start gap-3 border-b border-slate-100 pb-4">
                  <span className="px-3 py-1 rounded-md bg-[#0284c7] text-white text-xs font-bold whitespace-nowrap">
                    Bài tập 1.4 🎧
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">{ex14.instruction}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Luyện nghe & điền thành ngữ • 5 câu hỏi có file âm thanh độc lập
                    </p>
                  </div>
                </div>

                {/* Example */}
                {ex14.example_item && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-dashed border-slate-300 flex items-center justify-between text-xs text-slate-700">
                    <div>
                      <span className="font-bold text-[10px] uppercase bg-slate-200 px-1.5 py-0.5 rounded">
                        Ví dụ mẫu:
                      </span>
                      <p className="mt-1">
                        I've just turned 40, and I'm <strong className="text-sky-700 underline">in the prime of my life</strong>. I always go to the gym after work.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => playAudio(ex14.example_item.audio_url)}
                      className="w-8 h-8 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center shrink-0 cursor-pointer"
                      title="Nghe ví dụ mẫu"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <div className="space-y-4">
                  {ex14.questions?.map((q) => {
                    const status = checked14[q.question_number];
                    return (
                      <div
                        key={q.question_number}
                        className={`p-4 rounded-2xl border text-xs sm:text-sm transition ${
                          status === true
                            ? "bg-emerald-50/60 border-emerald-300"
                            : status === false
                            ? "bg-red-50/60 border-red-300"
                            : "bg-slate-50 border-slate-200"
                        }`}
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-xs shrink-0">
                            {q.question_number}
                          </span>
                          <span className="text-slate-800">{q.prompt_prefix}</span>
                          <input
                            type="text"
                            value={answers14[q.question_number] || ""}
                            onChange={(e) =>
                              setAnswers14((prev) => ({ ...prev, [q.question_number]: e.target.value }))
                            }
                            placeholder="Nhập thành ngữ..."
                            className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
                          />
                          <span className="text-slate-800">{q.prompt_suffix}</span>

                          <button
                            type="button"
                            onClick={() => playAudio(q.audio_url)}
                            className="w-7 h-7 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center ml-auto shrink-0 cursor-pointer"
                            title="Nghe audio câu hỏi"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {status === true && (
                          <div className="mt-2 text-xs font-semibold text-emerald-800">
                            ✓ Chính xác! Câu hoàn chỉnh: "<em>{q.full_sentence}</em>"
                          </div>
                        )}
                        {status === false && (
                          <div className="mt-2 text-xs text-red-800">
                            ✗ Chưa chính xác. Đáp án đúng: <strong>{q.target_answer}</strong> • Lời thoại: "<em>{q.full_sentence}</em>"
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={reset14}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                  >
                    Làm lại
                  </button>
                  <button
                    type="button"
                    onClick={check14}
                    className="px-4 py-2 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold cursor-pointer"
                  >
                    Kiểm tra bài nghe
                  </button>
                  {showRetry14 && (
                    <button
                      type="button"
                      onClick={retry14}
                      className="px-4 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 text-xs font-bold cursor-pointer flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Luyện lại câu sai
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* EXERCISE 1.5: ERROR CORRECTION */}
            {ex15 && (
              <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-6 shadow-xs">
                <div className="flex items-start gap-3 border-b border-slate-100 pb-4">
                  <span className="px-3 py-1 rounded-md bg-[#002147] text-white text-xs font-bold whitespace-nowrap">
                    Bài tập 1.5
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">{ex15.instruction}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Sửa lỗi sai thành ngữ • Phát hiện từ bị dùng sai và viết lại chính xác
                    </p>
                  </div>
                </div>

                {ex15.example_item && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-xs text-slate-700">
                    <span className="font-bold text-[10px] uppercase bg-slate-200 px-1.5 py-0.5 rounded">
                      Ví dụ mẫu:
                    </span>
                    <p className="mt-1 line-through text-slate-400">{ex15.example_item.incorrect_sentence}</p>
                    <p className="text-emerald-700 font-semibold">➔ {ex15.example_item.target_corrected}</p>
                  </div>
                )}

                <div className="space-y-4">
                  {ex15.questions?.map((q) => {
                    const status = checked15[q.question_number];
                    return (
                      <div
                        key={q.question_number}
                        className={`p-4 rounded-2xl border text-xs sm:text-sm space-y-2 transition ${
                          status === true
                            ? "bg-emerald-50/60 border-emerald-300"
                            : status === false
                            ? "bg-red-50/60 border-red-300"
                            : "bg-slate-50 border-slate-200"
                        }`}
                      >
                        <div className="text-slate-500 text-xs">
                          Câu {q.question_number} chứa lỗi: <span className="underline text-red-600 font-medium">{q.incorrect_sentence}</span>
                        </div>
                        <input
                          type="text"
                          value={answers15[q.question_number] || ""}
                          onChange={(e) =>
                            setAnswers15((prev) => ({ ...prev, [q.question_number]: e.target.value }))
                          }
                          placeholder="Viết lại cụm sửa hoặc cả câu..."
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                        {status === true && (
                          <div className="text-xs font-semibold text-emerald-800">
                            ✓ Chính xác! Câu chuẩn: <strong>{q.target_corrected}</strong>
                          </div>
                        )}
                        {status === false && (
                          <div className="text-xs text-red-800">
                            ✗ Chưa chính xác. Lỗi ở từ "<strong>{q.error_word}</strong>" ➔ Sửa thành "<strong>{q.correct_word}</strong>". Câu chuẩn: <em>{q.target_corrected}</em>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={reset15}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                  >
                    Làm lại
                  </button>
                  <button
                    type="button"
                    onClick={check15}
                    className="px-4 py-2 rounded-xl bg-[#002147] hover:bg-[#0369a1] text-white text-xs font-bold cursor-pointer"
                  >
                    Kiểm tra câu viết lại
                  </button>
                  {showRetry15 && (
                    <button
                      type="button"
                      onClick={retry15}
                      className="px-4 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 text-xs font-bold cursor-pointer flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Luyện lại câu sai
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* EXERCISE 1.6: HANGMAN / LETTER FILL */}
            {ex16 && (
              <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-6 shadow-xs">
                <div className="flex items-start gap-3 border-b border-slate-100 pb-4">
                  <span className="px-3 py-1 rounded-md bg-[#002147] text-white text-xs font-bold whitespace-nowrap">
                    Bài tập 1.6
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">{ex16.instruction}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Ô chữ gợi ý • Điền thành ngữ tương ứng với định nghĩa đã cho
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {ex16.questions?.map((q) => {
                    const status = checked16[q.question_number];
                    return (
                      <div
                        key={q.question_number}
                        className={`p-4 rounded-2xl border text-xs sm:text-sm space-y-2 transition ${
                          status === true
                            ? "bg-emerald-50/60 border-emerald-300"
                            : status === false
                            ? "bg-red-50/60 border-red-300"
                            : "bg-slate-50 border-slate-200"
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="font-medium text-slate-800">
                            Câu {q.question_number}. Định nghĩa: <em>"{q.definition}"</em>
                          </span>
                          <span className="font-mono bg-indigo-50 border border-indigo-200 text-indigo-800 px-2 py-0.5 rounded text-xs font-bold tracking-widest">
                            {q.pattern}
                          </span>
                        </div>
                        <input
                          type="text"
                          value={answers16[q.question_number] || ""}
                          onChange={(e) =>
                            setAnswers16((prev) => ({ ...prev, [q.question_number]: e.target.value }))
                          }
                          placeholder="Điền thành ngữ vào đây..."
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                        {status === true && (
                          <div className="text-xs font-semibold text-emerald-800">
                            ✓ Xuất sắc! Thành ngữ: <strong>{q.target_answer}</strong>
                          </div>
                        )}
                        {status === false && (
                          <div className="text-xs text-red-800">
                            ✗ Chưa chính xác. Đáp án đúng: <strong>{q.target_answer}</strong>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={reset16}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                  >
                    Làm lại
                  </button>
                  <button
                    type="button"
                    onClick={check16}
                    className="px-4 py-2 rounded-xl bg-[#002147] hover:bg-[#0369a1] text-white text-xs font-bold cursor-pointer"
                  >
                    Kiểm tra ô chữ
                  </button>
                  {showRetry16 && (
                    <button
                      type="button"
                      onClick={retry16}
                      className="px-4 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 text-xs font-bold cursor-pointer flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Luyện lại câu sai
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* EXERCISE 1.7: SITUATIONAL JUDGMENT */}
            {ex17 && (
              <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-6 shadow-xs">
                <div className="flex items-start gap-3 border-b border-slate-100 pb-4">
                  <span className="px-3 py-1 rounded-md bg-purple-600 text-white text-xs font-bold whitespace-nowrap">
                    Bài tập 1.7 🌟 Vận dụng
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">{ex17.instruction_en}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Vận dụng ngữ cảnh giao tiếp thực tế • 5 tình huống chọn cách diễn đạt đúng ngữ pháp, register & tone [Biên soạn bổ sung]
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  {ex17.questions?.map((q) => {
                    const status = checked17[q.question_number];
                    return (
                      <div
                        key={q.question_number}
                        className={`p-5 rounded-2xl border text-xs sm:text-sm space-y-3 transition ${
                          status === true
                            ? "bg-emerald-50/60 border-emerald-300"
                            : status === false
                            ? "bg-red-50/60 border-red-300"
                            : "bg-slate-50 border-slate-200"
                        }`}
                      >
                        <div className="font-semibold text-slate-900 flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-xs shrink-0">
                            {q.question_number}
                          </span>
                          <div>{q.situation}</div>
                        </div>

                        <div className="space-y-2 pl-7">
                          {q.options?.map((opt: { key: string; text: string }) => {
                            const isSelected = selected17[q.question_number] === opt.key;
                            return (
                              <label
                                key={opt.key}
                                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition text-xs sm:text-sm ${
                                  isSelected
                                    ? "bg-sky-50 border-sky-400 font-semibold text-sky-950"
                                    : "bg-white border-slate-200 hover:bg-slate-50 text-slate-800"
                                }`}
                              >
                                <input
                                  type="radio"
                                  name={`q17-${q.question_number}`}
                                  value={opt.key}
                                  checked={isSelected}
                                  onChange={() =>
                                    setSelected17((prev) => ({ ...prev, [q.question_number]: opt.key }))
                                  }
                                  className="mt-0.5"
                                />
                                <div>
                                  <strong className="mr-1">{opt.key}.</strong>
                                  {opt.text}
                                </div>
                              </label>
                            );
                          })}
                        </div>

                        {status !== undefined && (
                          <div
                            className={`p-3 rounded-xl text-xs leading-relaxed ${
                              status === true
                                ? "bg-emerald-100/70 text-emerald-900 border border-emerald-300 font-medium"
                                : "bg-red-100/70 text-red-900 border border-red-300 font-medium"
                            }`}
                          >
                            <span className="font-bold">
                              {status === true ? "✓ Chính xác!" : "✗ Chưa chuẩn xác."} (Đáp án đúng: {q.correct_key})
                            </span>
                            <div className="mt-1 text-slate-700 font-normal">{q.explanation}</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={reset17}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                  >
                    Làm lại
                  </button>
                  <button
                    type="button"
                    onClick={check17}
                    className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold cursor-pointer"
                  >
                    Kiểm tra bài tình huống
                  </button>
                  {showRetry17 && (
                    <button
                      type="button"
                      onClick={retry17}
                      className="px-4 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 text-xs font-bold cursor-pointer flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Luyện lại câu sai
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
