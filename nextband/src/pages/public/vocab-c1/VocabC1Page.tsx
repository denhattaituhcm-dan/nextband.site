import React, { useState, useEffect } from "react";
import {
  Volume2,
  ChevronRight,
  ChevronLeft,
  Check,
  X,
  Sparkles,
  Split,
  Filter,
  FileText,
  Bookmark,
  Keyboard,
  Layers,
  Zap,
  RotateCcw,
  Trophy
} from "lucide-react";
import {
  VOCAB_C1_UNITS,
  WordInAction,
  WordFormationItem,
  ConfusablePair,
  SynonymFilterChallenge,
  ClozePassage,
  SpeedBlitzQuestion
} from "@/data/vocabC1Unit1";

export interface MistakeItem {
  id: string;
  stage: string;
  word: string;
  context?: string;
  userChoice: string;
  correctAnswer: string;
}

// Sound synthesis helper
const playWordAudio = (text: string) => {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-GB";
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
};

const getUnitMeta = (unitId: number) => {
  switch (unitId) {
    case 1:
      return {
        shortLabel: "Unit 1: Courage",
        themeVi: "Tinh thần Quả cảm & Hào hiệp",
        descVi: "Phân biệt sắc thái can trường, táo bạo, hào hiệp và bất khuất trước hiểm nguy.",
        pages: "Trang 3–6"
      };
    case 2:
      return {
        shortLabel: "Unit 2: Physique",
        themeVi: "Hình thể, Vóc dáng & Thể chất",
        descVi: "Hệ thống tính từ miêu tả thể trạng vạm vỡ, mảnh khảnh, tiều tụy hoặc phốp pháp.",
        pages: "Trang 7–10"
      };
    case 3:
      return {
        shortLabel: "Unit 3: Obstruction",
        themeVi: "Sự Cản trở, Ngăn chặn & Đình trệ",
        descVi: "Các động từ và danh từ C1 diễn tả sự cản bước, làm chệch hướng hoặc kìm hãm.",
        pages: "Trang 11–14"
      };
    case 4:
      return {
        shortLabel: "Unit 4: Elimination",
        themeVi: "Sự Xóa bỏ, Triệt tiêu & Bãi bỏ",
        descVi: "Phân biệt chuẩn xác các cấp độ hủy bỏ đạo luật, xóa sổ dịch bệnh hay loại trừ.",
        pages: "Trang 15–18"
      };
    case 5:
      return {
        shortLabel: "Unit 5: Sharpness",
        themeVi: "Sự Gay gắt, Chua cay & Khắc nghiệt",
        descVi: "Từ vựng miêu tả vị chua chát, lời lẽ mỉa mai sâu cay và quy định nghiêm ngặt.",
        pages: "Trang 19–22"
      };
    case 6:
      return {
        shortLabel: "Unit 6: Adversity",
        themeVi: "Nghịch cảnh, Thảm họa & Nỗi thống khổ",
        descVi: "Cấp độ từ sự cố nhỏ (mishap) tới đại thảm họa (calamity) và cảnh cơ hàn (destitution).",
        pages: "Trang 23–26"
      };
    case 7:
      return {
        shortLabel: "Unit 7: Diminution",
        themeVi: "Sự Suy giảm, Co rút & Hao mòn",
        descVi: "Phân biệt shrink, contract, wither, dwindle, lessen, impair và abate.",
        pages: "Trang 27–30"
      };
    case 8:
      return {
        shortLabel: "Unit 8: Transition",
        themeVi: "Tiến trình, Chuyển tiếp & Khởi sắc",
        descVi: "Phân biệt abate, adroit, accost, aggravate, prosper, resilient, opulent và các cụm từ C1 tinh tế.",
        pages: "Trang 31–34"
      };
    case 9:
      return {
        shortLabel: "Unit 9: Conduct",
        themeVi: "Tính cách, Hành vi & Phản ứng",
        descVi: "Nắm vững sắc thái alluring, discursive, slovenly, abhorrent, rattled và các cấu trúc biến đổi tính từ C1.",
        pages: "Trang 35–39"
      };
    case 10:
      return {
        shortLabel: "Unit 10: Occupations",
        themeVi: "Nghề nghiệp, Tội phạm & Danh từ Tập hợp",
        descVi: "Phân biệt peddler, milliner, thatcher, usurer, poacher, perjurer, stowaway và các danh từ chỉ bầy đàn C1.",
        pages: "Trang 40–45"
      };
    default:
      return {
        shortLabel: `Unit ${unitId}`,
        themeVi: "Từ vựng Học thuật C1",
        descVi: "Rèn luyện phản xạ từ vựng học thuật qua 6 chặng tương tác.",
        pages: ""
      };
  }
};

export const VocabC1Page: React.FC = () => {
  // Unit Selection Hub state (default true when entering /vocab-c1)
  const [isSelectingUnit, setIsSelectingUnit] = useState<boolean>(true);
  const [selectedUnitIndex, setSelectedUnitIndex] = useState<number>(0);
  const VOCAB_C1_UNIT_1 = VOCAB_C1_UNITS[selectedUnitIndex];

  // Navigation: 1 to 6
  const [currentStage, setCurrentStage] = useState<number>(1);
  
  // Mistake Vault stored in localStorage as structured objects
  const [mistakeVault, setMistakeVault] = useState<MistakeItem[]>(() => {
    try {
      const saved = localStorage.getItem("vocab_c1_mistakes_v2");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isVaultOpen, setIsVaultOpen] = useState(false);

  const addMistake = (item: MistakeItem) => {
    setMistakeVault((prev) => {
      if (prev.some((m) => m.id === item.id)) return prev;
      const updated = [item, ...prev];
      try {
        localStorage.setItem("vocab_c1_mistakes_v2", JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const removeMistake = (id: string) => {
    setMistakeVault((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      try {
        localStorage.setItem("vocab_c1_mistakes_v2", JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const clearVault = () => {
    setMistakeVault([]);
    localStorage.removeItem("vocab_c1_mistakes_v2");
  };

  // STAGE 1: Words in Action (Active Recall)
  const [stage1Index, setStage1Index] = useState(0);
  const [stage1IsFlipped, setStage1IsFlipped] = useState(false);
  const [stage1SelfAssessments, setStage1SelfAssessments] = useState<Record<string, 'review' | 'mastered'>>({});

  // STAGE 2: Word Formation
  const [stage2Index, setStage2Index] = useState(0);
  const [stage2Answered, setStage2Answered] = useState(false);
  const [stage2SelectedSuffix, setStage2SelectedSuffix] = useState<string | null>(null);
  const [stage2IsCorrect, setStage2IsCorrect] = useState<boolean | null>(null);

  // STAGE 3: Confusable Words
  const [stage3Index, setStage3Index] = useState(0);
  const [stage3Answered, setStage3Answered] = useState(false);
  const [stage3SelectedWord, setStage3SelectedWord] = useState<string | null>(null);

  // STAGE 4: Synonym Filter
  const [stage4ChallengeIndex, setStage4ChallengeIndex] = useState(0);
  const [stage4RemovedWords, setStage4RemovedWords] = useState<string[]>([]);
  const [stage4ShakeWord, setStage4ShakeWord] = useState<string | null>(null);

  // STAGE 5: Smart Cloze
  const [stage5PassageIndex, setStage5PassageIndex] = useState(0);
  const [stage5Answers, setStage5Answers] = useState<Record<number, string>>({});
  const [activeGapNumber, setActiveGapNumber] = useState<number | null>(null);
  const [lastAnsweredGap, setLastAnsweredGap] = useState<number | null>(null);

  // STAGE 6: Speed Blitz
  const [stage6Index, setStage6Index] = useState(0);
  const [stage6Answered, setStage6Answered] = useState(false);
  const [stage6SelectedKey, setStage6SelectedKey] = useState<string | null>(null);
  const [stage6IsCorrect, setStage6IsCorrect] = useState<boolean | null>(null);

  // Unit Completion & Analytics
  const [isUnitCompleted, setIsUnitCompleted] = useState(false);
  const [quizStats, setQuizStats] = useState({ totalAttempts: 0, correctAttempts: 0 });

  // Navigation handlers
  const currentWia = VOCAB_C1_UNIT_1.wordsInAction[stage1Index] || VOCAB_C1_UNIT_1.wordsInAction[0];
  const currentWf = VOCAB_C1_UNIT_1.wordFormation[stage2Index] || VOCAB_C1_UNIT_1.wordFormation[0];
  const currentCw = VOCAB_C1_UNIT_1.confusableWords[stage3Index] || VOCAB_C1_UNIT_1.confusableWords[0];
  const currentSf = VOCAB_C1_UNIT_1.synonymFilter[stage4ChallengeIndex] || VOCAB_C1_UNIT_1.synonymFilter[0];
  const currentCp = VOCAB_C1_UNIT_1.clozePassages[stage5PassageIndex] || VOCAB_C1_UNIT_1.clozePassages[0];
  const currentSb = VOCAB_C1_UNIT_1.speedBlitz[stage6Index] || VOCAB_C1_UNIT_1.speedBlitz[0];

  // Stage 1 Active Recall Handlers
  const handleStage1SelfAssess = (status: 'review' | 'mastered') => {
    setStage1SelfAssessments((prev) => ({ ...prev, [currentWia.id]: status }));
    if (status === 'review') {
      addMistake({
        id: `wia-${currentWia.id}`,
        stage: 'Words in Action',
        word: currentWia.word,
        context: currentWia.viDef,
        userChoice: 'Cần ôn lại',
        correctAnswer: `${currentWia.nuance} - ${currentWia.enDef}`
      });
    }

    if (stage1Index < VOCAB_C1_UNIT_1.wordsInAction.length - 1) {
      setStage1Index((prev) => prev + 1);
      setStage1IsFlipped(false);
    } else {
      setCurrentStage(2);
    }
  };

  // Restart Unit
  const handleRestartUnit = () => {
    setIsUnitCompleted(false);
    setCurrentStage(1);
    setStage1Index(0);
    setStage1IsFlipped(false);
    setStage2Index(0);
    setStage2Answered(false);
    setStage2SelectedSuffix(null);
    setStage2IsCorrect(null);
    setStage3Index(0);
    setStage3Answered(false);
    setStage3SelectedWord(null);
    setStage4ChallengeIndex(0);
    setStage4RemovedWords([]);
    setStage5PassageIndex(0);
    setStage5Answers({});
    setActiveGapNumber(null);
    setLastAnsweredGap(null);
    setStage6Index(0);
    setStage6Answered(false);
    setStage6SelectedKey(null);
    setStage6IsCorrect(null);
  };

  const handleSelectUnit = (idx: number) => {
    setSelectedUnitIndex(idx);
    handleRestartUnit();
    setIsSelectingUnit(false);
  };

  // Stage 2 Submit
  const handleStage2Select = (suffix: string) => {
    if (stage2Answered) return;
    setStage2SelectedSuffix(suffix);
    setStage2Answered(true);
    const correct = suffix.toLowerCase() === currentWf.suffix.toLowerCase();
    setStage2IsCorrect(correct);
    setQuizStats((prev) => ({ totalAttempts: prev.totalAttempts + 1, correctAttempts: prev.correctAttempts + (correct ? 1 : 0) }));
    if (!correct) {
      addMistake({
        id: `wf-${currentWf.id}`,
        stage: "Word Formation",
        word: currentWf.adjective,
        context: currentWf.meaningVi,
        userChoice: suffix,
        correctAnswer: `${currentWf.suffix} (➔ ${currentWf.noun})`
      });
    }
  };

  const handleStage2Next = () => {
    if (stage2Index < VOCAB_C1_UNIT_1.wordFormation.length - 1) {
      setStage2Index(stage2Index + 1);
      setStage2Answered(false);
      setStage2SelectedSuffix(null);
      setStage2IsCorrect(null);
    } else {
      setCurrentStage(3);
    }
  };

  // Stage 3 Submit
  const handleStage3Select = (word: string) => {
    if (stage3Answered) return;
    setStage3SelectedWord(word);
    setStage3Answered(true);
    const correct = word.toLowerCase() === currentCw.correctWord.toLowerCase();
    setQuizStats((prev) => ({ totalAttempts: prev.totalAttempts + 1, correctAttempts: prev.correctAttempts + (correct ? 1 : 0) }));
    if (!correct) {
      addMistake({
        id: `cw-${currentCw.id}`,
        stage: "Confusable Words",
        word: currentCw.correctWord,
        context: currentCw.promptSentence,
        userChoice: word,
        correctAnswer: currentCw.correctWord
      });
    }
  };

  const handleStage3Next = () => {
    if (stage3Index < VOCAB_C1_UNIT_1.confusableWords.length - 1) {
      setStage3Index(stage3Index + 1);
      setStage3Answered(false);
      setStage3SelectedWord(null);
    } else {
      setCurrentStage(4);
    }
  };

  // Stage 4 Filter Click
  const handleStage4PillClick = (wordObj: { word: string; isSynonym: boolean }) => {
    if (stage4RemovedWords.includes(wordObj.word)) return;
    if (!wordObj.isSynonym) {
      setStage4RemovedWords((prev) => [...prev, wordObj.word]);
    } else {
      setStage4ShakeWord(wordObj.word);
      addMistake({
        id: `sf-${currentSf.id}-${wordObj.word}`,
        stage: "Synonym Filter",
        word: wordObj.word,
        context: `Từ gốc: ${currentSf.targetWord} (${currentSf.targetMeaning})`,
        userChoice: "Loại bỏ từ này (Nhầm lẫn)",
        correctAnswer: `Đây là từ ĐỒNG NGHĨA chuẩn với ${currentSf.targetWord}`
      });
      setTimeout(() => setStage4ShakeWord(null), 600);
    }
  };

  const nonSynonymsTotal = currentSf.words.filter((w) => !w.isSynonym).length;
  const nonSynonymsRemoved = stage4RemovedWords.filter((w) =>
    currentSf.words.some((item) => item.word === w && !item.isSynonym)
  ).length;
  const isStage4RoundComplete = nonSynonymsRemoved === nonSynonymsTotal;

  const handleStage4NextRound = () => {
    if (stage4ChallengeIndex < VOCAB_C1_UNIT_1.synonymFilter.length - 1) {
      setStage4ChallengeIndex(stage4ChallengeIndex + 1);
      setStage4RemovedWords([]);
    } else {
      setCurrentStage(5);
    }
  };

  // Stage 5 Cloze Option Select
  const handleStage5SelectOption = (gapNumber: number, label: string) => {
    setStage5Answers((prev) => ({ ...prev, [gapNumber]: label }));
    setActiveGapNumber(null);
    setLastAnsweredGap(gapNumber);

    const gapDef = currentCp.gaps.find((g) => g.gapNumber === gapNumber);
    if (gapDef) {
      const correct = label.toLowerCase() === gapDef.correctLabel.toLowerCase();
      setQuizStats((prev) => ({ totalAttempts: prev.totalAttempts + 1, correctAttempts: prev.correctAttempts + (correct ? 1 : 0) }));
      if (!correct) {
        const chosen = gapDef.options.find((o) => o.label.toLowerCase() === label.toLowerCase());
        addMistake({
          id: `cp-${gapDef.gapNumber}`,
          stage: "Smart Cloze",
          word: gapDef.correctWord,
          context: `Lỗ trống [${gapDef.gapNumber}] trong bài "${currentCp.title}"`,
          userChoice: `${label}. ${chosen?.text || ""}`,
          correctAnswer: `${gapDef.correctLabel}. ${gapDef.correctWord}`
        });
      }
    }
  };

  const allGapsAnswered = currentCp.gaps.every((g) => !!stage5Answers[g.gapNumber]);

  const handleStage5NextPassage = () => {
    if (stage5PassageIndex < VOCAB_C1_UNIT_1.clozePassages.length - 1) {
      setStage5PassageIndex(stage5PassageIndex + 1);
      setStage5Answers({});
      setActiveGapNumber(null);
      setLastAnsweredGap(null);
    } else {
      setCurrentStage(6);
    }
  };

  // Stage 6 Speed Blitz
  const handleStage6Select = (key: string) => {
    if (stage6Answered) return;
    setStage6SelectedKey(key);
    setStage6Answered(true);
    const correct = key === currentSb.correctKey;
    setStage6IsCorrect(correct);
    setQuizStats((prev) => ({ totalAttempts: prev.totalAttempts + 1, correctAttempts: prev.correctAttempts + (correct ? 1 : 0) }));
    if (!correct) {
      const chosen = currentSb.options.find((o) => o.key === key);
      const right = currentSb.options.find((o) => o.key === currentSb.correctKey);
      addMistake({
        id: `sb-${currentSb.id}`,
        stage: "Speed Blitz",
        word: right?.text || `Câu ${currentSb.questionNumber}`,
        context: currentSb.prompt,
        userChoice: chosen?.text || key,
        correctAnswer: right?.text || currentSb.correctKey
      });
    }
  };

  const handleStage6Next = () => {
    if (stage6Index < VOCAB_C1_UNIT_1.speedBlitz.length - 1) {
      setStage6Index(stage6Index + 1);
      setStage6Answered(false);
      setStage6SelectedKey(null);
      setStage6IsCorrect(null);
    } else {
      setIsUnitCompleted(true);
    }
  };

  // Keyboard Navigation Hook
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) return;
      if (isSelectingUnit) return;

      const key = e.key;

      // Unit Completed screen keyboard shortcuts
      if (isUnitCompleted) {
        if (key === "r" || key === "R") {
          handleRestartUnit();
        } else if (key === "v" || key === "V") {
          setIsVaultOpen(true);
        }
        return;
      }

      // STAGE 1: Words in Action (Active Recall)
      if (currentStage === 1) {
        if (key === " " || key === "Spacebar") {
          e.preventDefault();
          setStage1IsFlipped((prev) => !prev);
          playWordAudio(currentWia.word);
        } else if (key === "1") {
          if (stage1IsFlipped) {
            e.preventDefault();
            handleStage1SelfAssess("review");
          }
        } else if (key === "2") {
          if (stage1IsFlipped) {
            e.preventDefault();
            handleStage1SelfAssess("mastered");
          }
        } else if (key === "ArrowLeft") {
          e.preventDefault();
          if (stage1Index > 0) {
            setStage1Index((prev) => prev - 1);
            setStage1IsFlipped(false);
          }
        } else if (key === "ArrowRight" || key === "Enter") {
          e.preventDefault();
          if (!stage1IsFlipped) {
            setStage1IsFlipped(true);
          } else {
            handleStage1SelfAssess("mastered");
          }
        }
      }

      // STAGE 2: Word Formation
      if (currentStage === 2) {
        if (!stage2Answered) {
          if (["1", "2", "3", "4"].includes(key)) {
            const idx = parseInt(key) - 1;
            if (currentWf.suffixChoices[idx]) {
              handleStage2Select(currentWf.suffixChoices[idx]);
            }
          }
        } else if (key === "Enter") {
          e.preventDefault();
          handleStage2Next();
        }
      }

      // STAGE 3: Confusable Words
      if (currentStage === 3) {
        if (!stage3Answered) {
          if (key === "ArrowLeft" || key === "1" || key.toLowerCase() === "f") {
            e.preventDefault();
            handleStage3Select(currentCw.wordA);
          } else if (key === "ArrowRight" || key === "2" || key.toLowerCase() === "j") {
            e.preventDefault();
            handleStage3Select(currentCw.wordB);
          }
        } else if (key === "Enter") {
          e.preventDefault();
          handleStage3Next();
        }
      }

      // STAGE 4: Synonym Filter
      if (currentStage === 4) {
        if (isStage4RoundComplete && key === "Enter") {
          e.preventDefault();
          handleStage4NextRound();
        }
      }

      // STAGE 5: Smart Cloze
      if (currentStage === 5) {
        if (activeGapNumber !== null) {
          const gapDef = currentCp.gaps.find((g) => g.gapNumber === activeGapNumber);
          if (gapDef) {
            if (["1", "2", "3", "4"].includes(key)) {
              const idx = parseInt(key) - 1;
              if (gapDef.options[idx]) {
                handleStage5SelectOption(activeGapNumber, gapDef.options[idx].label);
              }
            } else if (["a", "b", "c", "d"].includes(key.toLowerCase())) {
              const opt = gapDef.options.find(
                (o) => o.label.toLowerCase() === key.toLowerCase()
              );
              if (opt) {
                handleStage5SelectOption(activeGapNumber, opt.label);
              }
            }
          }
        } else if (allGapsAnswered && key === "Enter") {
          e.preventDefault();
          handleStage5NextPassage();
        }
      }

      // STAGE 6: Speed Blitz
      if (currentStage === 6) {
        if (!stage6Answered) {
          if (["1", "2", "3", "4"].includes(key)) {
            const opt = currentSb.options.find((o) => o.key === key);
            if (opt) handleStage6Select(key);
          } else if (["a", "b", "c", "d"].includes(key.toLowerCase())) {
            const keyMap: Record<string, string> = { a: "1", b: "2", c: "3", d: "4" };
            const mapped = keyMap[key.toLowerCase()];
            const opt = currentSb.options.find((o) => o.key === mapped);
            if (opt) handleStage6Select(mapped);
          }
        } else if (key === "Enter") {
          e.preventDefault();
          handleStage6Next();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    isSelectingUnit,
    isUnitCompleted,
    currentStage,
    stage1Index,
    stage1IsFlipped,
    currentWia,
    stage2Answered,
    stage2Index,
    currentWf,
    stage3Answered,
    stage3Index,
    currentCw,
    isStage4RoundComplete,
    activeGapNumber,
    currentCp,
    allGapsAnswered,
    stage6Answered,
    stage6Index,
    currentSb
  ]);

  // STAGE METADATA WITH ESTIMATED TIMES
  const stages = [
    { num: 1, name: "Words in Action", icon: Sparkles, total: VOCAB_C1_UNIT_1.wordsInAction.length, current: stage1Index + 1, time: "~3 phút", desc: "Active Recall thẻ lật 3D" },
    { num: 2, name: "Word Formation", icon: Layers, total: VOCAB_C1_UNIT_1.wordFormation.length, current: stage2Index + 1, time: "~5 phút", desc: "Cấu tạo hình thái & hậu tố" },
    { num: 3, name: "Confusable Words", icon: Split, total: VOCAB_C1_UNIT_1.confusableWords.length, current: stage3Index + 1, time: "~3 phút", desc: "Đấu trường từ dễ nhầm lẫn" },
    { num: 4, name: "Synonym Filter", icon: Filter, total: VOCAB_C1_UNIT_1.synonymFilter.length, current: stage4ChallengeIndex + 1, time: "~4 phút", desc: "Lọc từ không đồng nghĩa" },
    { num: 5, name: "Smart Cloze", icon: FileText, total: VOCAB_C1_UNIT_1.clozePassages.length, current: stage5PassageIndex + 1, time: "~5 phút", desc: "Đục lỗ ngữ cảnh thực tế" },
    { num: 6, name: "Speed Blitz", icon: Zap, total: VOCAB_C1_UNIT_1.speedBlitz.length, current: stage6Index + 1, time: "~4 phút", desc: "Phản xạ tốc độ cao" }
  ];

  const accuracyPercentage = quizStats.totalAttempts > 0
    ? Math.round((quizStats.correctAttempts / quizStats.totalAttempts) * 100)
    : 100;

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-[#F8FAFC] text-slate-900 font-sans select-none relative">
      {/* Subtle light atmospheric glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* ============================================================ */}
      {/* 1. TOP BAR HUD (64px)                                        */}
      {/* ============================================================ */}
      <header className="h-16 shrink-0 flex items-center justify-between px-4 sm:px-6 border-b border-slate-200 bg-white/95 backdrop-blur-md z-20 shadow-xs gap-2">
        {/* Left: Back to Unit Selection Hub + Current Unit Indicator */}
        <div className="flex items-center gap-2.5 shrink-0">
          {isSelectingUnit ? (
            <>
              <a
                href="/reading"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-900 font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Reading</span>
              </a>
              <div className="px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 font-mono text-xs sm:text-sm font-bold">
                C1 • THE VOCABULARY FILES
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsSelectingUnit(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-900 font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap"
                title="Quay lại màn hình chọn Unit"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Chọn Unit</span>
              </button>
              <div className="px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-800 font-bold text-xs sm:text-sm whitespace-nowrap">
                {getUnitMeta(VOCAB_C1_UNIT_1.unitId).shortLabel}
              </div>
            </>
          )}
        </div>

        {/* Center: 6-Stage Segmented Pill Bar (Only shown inside Study Screen) */}
        {!isSelectingUnit && (
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
            {stages.map((stage) => {
              const Icon = stage.icon;
              const isActive = currentStage === stage.num;
              return (
                <button
                  key={stage.num}
                  onClick={() => setCurrentStage(stage.num)}
                  title={`${stage.name} (${stage.time}): ${stage.desc}`}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/20 font-bold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{stage.name}</span>
                  <span className={`text-xs font-mono px-1.5 py-0.5 rounded font-bold ${isActive ? "bg-white/25 text-white" : "bg-slate-200 text-slate-700"}`}>
                    {stage.current}/{stage.total}
                  </span>
                </button>
              );
            })}
          </nav>
        )}

        {/* Right: Mistake Vault Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsVaultOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-sm font-semibold text-slate-700 shadow-xs transition-all cursor-pointer whitespace-nowrap"
            title="Kho câu sai cần ôn lại"
          >
            <Bookmark className="w-4 h-4 text-amber-500" />
            <span>Mistake Vault</span>
            {mistakeVault.length > 0 && (
              <span className="bg-rose-600 text-white text-xs font-mono px-2 py-0.5 rounded-full font-bold">
                {mistakeVault.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 2A. UNIT SELECTION HUB SCREEN                                */}
      {/* ============================================================ */}
      {isSelectingUnit ? (
        <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-8 sm:py-12 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Hero Header */}
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="inline-block text-xs font-mono font-bold uppercase tracking-widest text-indigo-700 bg-indigo-50 border border-indigo-200 px-3.5 py-1 rounded-full mb-3">
                CEFR LEVEL C1 • ACADEMIC LEXICON
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
                The Vocabulary Files — Level C1
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Chọn bài học (Unit) để bước vào lộ trình 6 chặng phản xạ từ vựng học thuật: <span className="font-semibold text-slate-800">Words in Action</span>, <span className="font-semibold text-slate-800">Word Formation</span>, <span className="font-semibold text-slate-800">Confusable Words</span>, <span className="font-semibold text-slate-800">Synonym Filter</span>, <span className="font-semibold text-slate-800">Smart Cloze</span> và <span className="font-semibold text-slate-800">Speed Blitz</span>.
              </p>
            </div>

            {/* Grid of Unit Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-10">
              {VOCAB_C1_UNITS.map((unit, idx) => {
                const meta = getUnitMeta(unit.unitId);
                const cleanTitle = unit.title.replace(/^Unit \d+:\s*/i, "");
                const previewWords = unit.wordsInAction.slice(0, 5);
                const remainingCount = Math.max(0, unit.wordsInAction.length - previewWords.length);

                return (
                  <div
                    key={unit.unitId}
                    onClick={() => handleSelectUnit(idx)}
                    className="group bg-white border border-slate-200 hover:border-indigo-400 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-200 flex flex-col justify-between cursor-pointer"
                  >
                    <div>
                      {/* Top Badge Row */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-mono text-xs font-bold tracking-wider">
                          UNIT {unit.unitId < 10 ? `0${unit.unitId}` : unit.unitId}
                        </span>
                        <span className="text-xs font-mono font-semibold text-slate-400">
                          {meta.pages}
                        </span>
                      </div>

                      {/* Unit Title & Vietnamese Subtitle */}
                      <h2 className="text-xl font-black text-slate-900 group-hover:text-indigo-700 transition-colors mb-1">
                        {cleanTitle}
                      </h2>
                      <p className="text-xs font-bold text-indigo-600 mb-2">
                        {meta.themeVi}
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        {meta.descVi}
                      </p>

                      {/* Sample Words Pills */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {previewWords.map((w) => (
                          <span
                            key={w.id}
                            className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700 font-mono text-xs font-semibold"
                          >
                            {w.word}
                          </span>
                        ))}
                        {remainingCount > 0 && (
                          <span className="px-2 py-0.5 rounded-md bg-indigo-50 border border-indigo-100 text-indigo-600 font-mono text-xs font-bold">
                            +{remainingCount} từ
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-500 font-semibold">
                        {unit.wordsInAction.length} từ • 6 chặng
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-700 group-hover:translate-x-1 transition-transform">
                        <span>Vào học</span>
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      ) : (
        <>
          {/* ============================================================ */}
          {/* 2B. MAIN STUDY STAGE (Single Viewport)                       */}
          {/* ============================================================ */}
          <main className="flex-1 flex items-center justify-center p-4 sm:p-6 relative z-10 overflow-hidden">
          
          {/* UNIT COMPLETE SCREEN */}
          {isUnitCompleted ? (
            <div className="w-full max-w-2xl bg-white border border-slate-200 shadow-2xl rounded-3xl p-8 sm:p-10 flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
              <div className="w-20 h-20 bg-gradient-to-tr from-amber-400 to-amber-200 rounded-3xl flex items-center justify-center text-4xl shadow-lg shadow-amber-200/50 mb-6">
                <Trophy className="w-10 h-10 text-amber-900" />
              </div>

              <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full mb-3">
                Unit {VOCAB_C1_UNIT_1.unitId} Completed
              </span>
              
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
                Tuyệt vời! Bạn đã chinh phục trọn vẹn Unit {VOCAB_C1_UNIT_1.unitId}
              </h2>

              <p className="text-slate-600 text-base max-w-lg mb-8">
                Bạn đã đi qua toàn bộ 6 chặng phản xạ từ vựng C1 của {VOCAB_C1_UNIT_1.title}.
              </p>

              {/* Performance Metric Cards */}
              <div className="grid grid-cols-3 gap-4 w-full mb-8">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-2xl sm:text-3xl font-mono font-black text-slate-900">{VOCAB_C1_UNIT_1.wordsInAction.length}</div>
                  <div className="text-xs text-slate-500 font-medium mt-1">Từ vựng cốt lõi</div>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <div className="text-2xl sm:text-3xl font-mono font-black text-emerald-700">{accuracyPercentage}%</div>
                  <div className="text-xs text-emerald-600 font-medium mt-1">Tỉ lệ chính xác</div>
                </div>
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
                  <div className="text-2xl sm:text-3xl font-mono font-black text-rose-700">{mistakeVault.length}</div>
                  <div className="text-xs text-rose-600 font-medium mt-1">Từ cần lưu ý</div>
                </div>
              </div>

              {/* Primary Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
                <button
                  onClick={() => setIsSelectingUnit(true)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-base transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Danh sách Unit</span>
                </button>

                {mistakeVault.length > 0 && (
                  <button
                    onClick={() => setIsVaultOpen(true)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-base shadow-md shadow-amber-500/20 transition-all cursor-pointer"
                  >
                    <Bookmark className="w-4 h-4 text-white" />
                    <span>Mở Mistake Vault ({mistakeVault.length} từ)</span>
                    <kbd className="font-mono text-xs bg-amber-700/60 text-white px-2 py-0.5 rounded">[V]</kbd>
                  </button>
                )}
                
                <button
                  onClick={handleRestartUnit}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-base shadow-md transition-all cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 text-white" />
                  <span>Học lại Unit {VOCAB_C1_UNIT_1.unitId}</span>
                  <kbd className="font-mono text-xs bg-slate-700 text-white px-2 py-0.5 rounded">[R]</kbd>
                </button>

                {selectedUnitIndex < VOCAB_C1_UNITS.length - 1 && (
                  <button
                    onClick={() => handleSelectUnit(selectedUnitIndex + 1)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow-md transition-all cursor-pointer"
                  >
                    <span>Sang Unit {VOCAB_C1_UNITS[selectedUnitIndex + 1].unitId} →</span>
                  </button>
                )}
              </div>
            </div>
          ) : null}

          {/* STAGE 1: WORDS IN ACTION (ACTIVE RECALL) */}
          {!isUnitCompleted && currentStage === 1 && (
          <div className="w-full max-w-2xl bg-white border border-slate-200 shadow-xl shadow-slate-200/60 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 min-h-[460px]">
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-sm font-mono font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-200">
                  WORD {stage1Index + 1} / {VOCAB_C1_UNIT_1.wordsInAction.length}
                </span>
                {currentWia.register && (
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                    {currentWia.register}
                  </span>
                )}
              </div>
              <button
                onClick={() => playWordAudio(currentWia.word)}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-sm font-semibold border border-indigo-200 transition-all cursor-pointer shadow-xs"
              >
                <Volume2 className="w-4 h-4" />
                <span className="font-mono">Listen</span>
                <kbd className="text-xs bg-white px-1.5 py-0.5 rounded border border-indigo-300 font-mono text-indigo-800 shadow-2xs">Space</kbd>
              </button>
            </div>

            {/* Card Body: CSS 3D Flip Card (both faces always in DOM) */}
            <div className="mb-6 flex-1 flex flex-col justify-center" style={{ perspective: '1200px' }}>
              <div
                style={{
                  position: 'relative',
                  minHeight: '340px',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: stage1IsFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {/* FRONT FACE */}
                <div
                  style={{ backfaceVisibility: 'hidden', position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                  className="text-center py-6"
                >
                  <div className="inline-block px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full text-xs font-bold font-mono uppercase tracking-wider mb-4">
                    Active Recall Mode
                  </div>
                  <h2 className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight font-mono mb-3">
                    {currentWia.word}
                  </h2>
                  <p className="font-mono text-slate-500 text-xl font-medium mb-8">{currentWia.ipa}</p>

                  <div>
                    <button
                      onClick={() => {
                        setStage1IsFlipped(true);
                        playWordAudio(currentWia.word);
                      }}
                      className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-base shadow-lg shadow-indigo-500/25 transition-all transform active:scale-95 cursor-pointer"
                    >
                      <span>Lật thẻ để kiểm tra nghĩa</span>
                      <kbd className="text-xs font-mono bg-white/20 text-white px-2 py-0.5 rounded">Space</kbd>
                    </button>
                    <p className="text-xs text-slate-400 mt-3">Thử nhớ lại sắc thái và nghĩa của từ trước khi bấm lật</p>
                  </div>
                </div>

                {/* BACK FACE — rotated 180deg so it faces away by default */}
                <div
                  style={{ backfaceVisibility: 'hidden', position: 'absolute', inset: 0, transform: 'rotateY(180deg)', overflowY: 'auto' }}
                >
                  <div className="flex items-baseline justify-between mb-2">
                    <div className="flex items-baseline gap-3">
                      <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-mono">
                        {currentWia.word}
                      </h2>
                      <span className="font-mono text-slate-500 text-base">{currentWia.ipa}</span>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-lg bg-amber-100 text-amber-900 border border-amber-300">
                      {currentWia.nuance}
                    </span>
                  </div>

                  <p className="text-emerald-700 font-bold text-base sm:text-lg mb-3">
                    {currentWia.viDef}
                  </p>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 text-sm sm:text-base mb-4">
                    <p className="text-slate-800 leading-relaxed">
                      <strong className="text-slate-950 font-bold mr-2 font-mono">EN:</strong>
                      {currentWia.enDef}
                    </p>
                    <p className="text-slate-700 italic border-t border-slate-200 pt-2">
                      <strong className="text-indigo-700 font-bold mr-2 not-italic font-mono">VD:</strong>
                      {currentWia.example.split("**").map((chunk, i) =>
                        i % 2 === 1 ? (
                          <span key={i} className="text-indigo-800 font-bold underline decoration-indigo-400 not-italic">
                            {chunk}
                          </span>
                        ) : (
                          chunk
                        )
                      )}
                    </p>
                    {currentWia.collocations && currentWia.collocations.length > 0 && (
                      <div className="border-t border-slate-200 pt-2 flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono font-bold text-slate-500">Collocations:</span>
                        {currentWia.collocations.map((col, idx) => (
                          <span key={idx} className="text-xs font-mono bg-white px-2 py-0.5 rounded border border-slate-300 text-slate-800 font-medium">
                            {col}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Active Recall Self-Assessment Buttons */}
                  <div className="p-3.5 bg-indigo-50/60 rounded-xl border border-indigo-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-950">Đánh giá khả năng ghi nhớ:</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleStage1SelfAssess("review")}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-all cursor-pointer"
                      >
                        <span>✗ Chưa nhớ (Cần ôn)</span>
                        <kbd className="font-mono text-2xs bg-white px-1.5 py-0.5 rounded border border-rose-300">[1]</kbd>
                      </button>
                      <button
                        onClick={() => handleStage1SelfAssess("mastered")}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                      >
                        <span>✓ Đã thuộc từ này</span>
                        <kbd className="font-mono text-2xs bg-emerald-800 text-white px-1.5 py-0.5 rounded">[2]</kbd>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Stepper buttons inside card */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  if (stage1Index > 0) {
                    setStage1Index(stage1Index - 1);
                    setStage1IsFlipped(false);
                  }
                }}
                disabled={stage1Index === 0}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-semibold text-slate-700 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Từ trước</span>
                <kbd className="font-mono text-xs bg-white px-2 py-0.5 rounded border border-slate-300">←</kbd>
              </button>

              <div className="flex flex-wrap justify-center gap-1.5 max-w-xs sm:max-w-md px-2">
                {VOCAB_C1_UNIT_1.wordsInAction.map((w, idx) => {
                  const assessment = stage1SelfAssessments[w.id];
                  let dotColor = "bg-slate-300 hover:bg-slate-400";
                  if (assessment === "mastered") dotColor = "bg-emerald-500";
                  if (assessment === "review") dotColor = "bg-rose-400";

                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        setStage1Index(idx);
                        setStage1IsFlipped(false);
                      }}
                      className={`h-2.5 rounded-full cursor-pointer transition-all ${
                        idx === stage1Index ? "w-6 bg-indigo-600" : `w-2.5 ${dotColor}`
                      }`}
                      title={w.word}
                    />
                  );
                })}
              </div>

              <button
                onClick={() => {
                  if (!stage1IsFlipped) {
                    setStage1IsFlipped(true);
                  } else {
                    handleStage1SelfAssess("mastered");
                  }
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-md shadow-indigo-600/25 transition-all cursor-pointer"
              >
                <span>{!stage1IsFlipped ? "Xem đáp án" : stage1Index === VOCAB_C1_UNIT_1.wordsInAction.length - 1 ? "Sang Chặng 2" : "Từ kế tiếp"}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STAGE 2: WORD FORMATION (Morphology Builder) */}
        {currentStage === 2 && (
          <div className="w-full max-w-2xl bg-white border border-slate-200 shadow-xl shadow-slate-200/60 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-200">
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
              <span className="text-sm font-mono font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-200">
                PAIR {stage2Index + 1} / {VOCAB_C1_UNIT_1.wordFormation.length}
              </span>
              <span className="text-sm text-slate-600">
                Chuyển đổi: <strong className="text-slate-900 font-bold">Adjective</strong> ➔ <strong className="text-indigo-700 font-bold">Noun</strong>
              </span>
            </div>

            {/* Morphology Forge Stage */}
            <div className="py-2 flex flex-col items-center text-center w-full">
              <div className="text-sm font-mono text-slate-500 mb-1.5 uppercase tracking-widest font-semibold">Tính từ gốc (Adjective)</div>
              <div className="text-4xl sm:text-5xl font-black text-slate-900 font-mono tracking-tight mb-3">
                {currentWf.adjective}
              </div>

              {/* Morphology Split Visualization — Full width so text doesn't wrap excessively */}
              {stage2Answered ? (
                <div className={`p-4 sm:px-6 sm:py-4 rounded-xl border w-full my-3 animate-in fade-in duration-200 ${
                  stage2IsCorrect
                    ? "bg-emerald-50 border-emerald-300"
                    : "bg-rose-50 border-rose-300"
                }`}>
                  <div className="flex items-center justify-center gap-2 font-mono text-2xl sm:text-3xl font-black mb-1.5">
                    <span className="text-slate-800">{currentWf.root}</span>
                    <span className="text-indigo-600 font-black">+</span>
                    <span className="text-amber-800 px-2.5 py-0.5 bg-amber-100 rounded-lg border border-amber-300">
                      {currentWf.suffix}
                    </span>
                    <span className="text-slate-400 text-xl mx-2">➔</span>
                    <span className="text-emerald-700 underline underline-offset-4">{currentWf.noun}</span>
                  </div>
                  <p className="text-sm sm:text-base font-medium text-slate-700">
                    <strong className="text-slate-900 font-bold">Nghĩa:</strong> {currentWf.meaningVi}
                  </p>
                  {!stage2IsCorrect && (
                    <p className="text-sm text-rose-700 mt-1 font-bold">
                      Đáp án chính xác là: <strong className="font-mono">{currentWf.suffix}</strong> (➔ {currentWf.noun})
                    </p>
                  )}
                  {currentWf.ruleTip && (
                    <div className="mt-2.5 pt-2.5 border-t border-slate-200/80 text-left flex items-center gap-2.5 bg-white/80 px-3 py-2 rounded-lg w-full">
                      <span className="text-xs font-mono font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded whitespace-nowrap shrink-0">
                        💡 Quy tắc hình thái
                      </span>
                      <p className="text-xs sm:text-sm text-slate-700 font-medium leading-snug">
                        {currentWf.ruleTip}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-slate-600 text-base mb-5 font-medium">
                  Hãy chọn hậu tố (suffix) danh từ chuẩn xác:
                </p>
              )}

              {/* Suffix Choices Grid — Full width */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
                {currentWf.suffixChoices.map((suffix, idx) => {
                  const isSelected = stage2SelectedSuffix === suffix;
                  const isTarget = suffix.toLowerCase() === currentWf.suffix.toLowerCase();

                  let btnStyle = "bg-slate-50 border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50 text-slate-800";
                  if (stage2Answered) {
                    if (isTarget) {
                      btnStyle = "bg-emerald-100 border-emerald-500 text-emerald-900 font-black shadow-xs";
                    } else if (isSelected && !isTarget) {
                      btnStyle = "bg-rose-100 border-rose-400 text-rose-900 line-through";
                    } else {
                      btnStyle = "opacity-40 border-slate-200 bg-slate-50 text-slate-400";
                    }
                  }

                  return (
                    <button
                      key={suffix}
                      onClick={() => handleStage2Select(suffix)}
                      disabled={stage2Answered}
                      className={`py-3.5 px-4 rounded-xl border font-mono text-base font-bold transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{suffix}</span>
                      <kbd className="text-xs font-mono bg-white px-2 py-0.5 rounded border border-slate-300 text-slate-600 font-semibold shadow-2xs">
                        {idx + 1}
                      </kbd>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom action bar inside card */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-sm text-slate-500 font-mono">
                {stage2Answered ? "Nhấn [Enter] để tiếp tục" : "Bấm phím [1]-[4] để chọn hậu tố"}
              </span>

              {stage2Answered && (
                <button
                  onClick={handleStage2Next}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-bold shadow-md shadow-indigo-500/25 transition-all"
                >
                  <span>Tiếp tục</span>
                  <kbd className="font-mono text-xs bg-black/20 px-1.5 py-0.5 rounded">Enter ↵</kbd>
                </button>
              )}
            </div>
          </div>
        )}

        {/* STAGE 3: CONFUSABLE WORDS (1v1 Split-Card Arena) */}
        {currentStage === 3 && (
          <div className="w-full max-w-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/60 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-200">
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <span className="text-sm font-mono font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-200">
                PAIR {stage3Index + 1} / {VOCAB_C1_UNIT_1.confusableWords.length}
              </span>
              <span className="text-sm text-slate-600">
                Phím tắt: <kbd className="font-mono text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-300 font-bold">←</kbd> Trái &bull; <kbd className="font-mono text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-300 font-bold">→</kbd> Phải
              </span>
            </div>

            {/* Prompt sentence with Gap */}
            <div className="mb-6 p-5 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <p className="text-slate-900 text-lg sm:text-xl font-medium leading-relaxed">
                {currentCw.promptSentence.split("______").map((part, idx) => (
                  <React.Fragment key={idx}>
                    {part}
                    {idx === 0 && (
                      <span className={`inline-block font-mono font-bold px-3.5 py-1 rounded-lg border mx-1.5 transition-all ${
                        stage3Answered
                          ? currentCw.correctWord.toLowerCase() === stage3SelectedWord?.toLowerCase()
                            ? "bg-emerald-100 border-emerald-500 text-emerald-900"
                            : "bg-rose-100 border-rose-500 text-rose-900"
                          : "bg-indigo-50 border-indigo-300 text-indigo-700 border-dashed"
                      }`}>
                        {stage3Answered ? currentCw.correctWord : "______"}
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </p>
            </div>

            {/* 1v1 Split Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {/* Left Card: Word A */}
              <button
                onClick={() => handleStage3Select(currentCw.wordA)}
                disabled={stage3Answered}
                className={`p-6 rounded-2xl border text-left transition-all relative flex flex-col justify-between ${
                  stage3Answered
                    ? currentCw.correctWord.toLowerCase() === currentCw.wordA.toLowerCase()
                      ? "bg-emerald-50 border-emerald-500 shadow-md shadow-emerald-200/50"
                      : stage3SelectedWord?.toLowerCase() === currentCw.wordA.toLowerCase()
                      ? "bg-rose-50 border-rose-400"
                      : "opacity-40 border-slate-200 bg-slate-50"
                    : "bg-white border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30 shadow-xs cursor-pointer"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <kbd className="font-mono text-xs px-2 py-1 rounded bg-slate-100 border border-slate-300 text-slate-700 font-bold">
                    ← Hoặc [1] / [F]
                  </kbd>
                  {stage3Answered && currentCw.correctWord.toLowerCase() === currentCw.wordA.toLowerCase() && (
                    <span className="flex items-center gap-1 text-emerald-700 text-sm font-bold">
                      <Check className="w-4 h-4" /> Đúng
                    </span>
                  )}
                </div>

                <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-slate-900 mb-2">
                  <span>{currentCw.diffHighlightA.before}</span>
                  <span className="text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded border border-amber-300">
                    {currentCw.diffHighlightA.highlight}
                  </span>
                  <span>{currentCw.diffHighlightA.after}</span>
                </div>

                {stage3Answered && (
                  <p className="text-sm font-medium text-slate-700 mt-3 pt-3 border-t border-slate-200 leading-normal">
                    {currentCw.defA}
                  </p>
                )}
              </button>

              {/* Right Card: Word B */}
              <button
                onClick={() => handleStage3Select(currentCw.wordB)}
                disabled={stage3Answered}
                className={`p-6 rounded-2xl border text-left transition-all relative flex flex-col justify-between ${
                  stage3Answered
                    ? currentCw.correctWord.toLowerCase() === currentCw.wordB.toLowerCase()
                      ? "bg-emerald-50 border-emerald-500 shadow-md shadow-emerald-200/50"
                      : stage3SelectedWord?.toLowerCase() === currentCw.wordB.toLowerCase()
                      ? "bg-rose-50 border-rose-400"
                      : "opacity-40 border-slate-200 bg-slate-50"
                    : "bg-white border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30 shadow-xs cursor-pointer"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <kbd className="font-mono text-xs px-2 py-1 rounded bg-slate-100 border border-slate-300 text-slate-700 font-bold">
                    → Hoặc [2] / [J]
                  </kbd>
                  {stage3Answered && currentCw.correctWord.toLowerCase() === currentCw.wordB.toLowerCase() && (
                    <span className="flex items-center gap-1 text-emerald-700 text-sm font-bold">
                      <Check className="w-4 h-4" /> Đúng
                    </span>
                  )}
                </div>

                <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-slate-900 mb-2">
                  <span>{currentCw.diffHighlightB.before}</span>
                  <span className="text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded border border-amber-300">
                    {currentCw.diffHighlightB.highlight}
                  </span>
                  <span>{currentCw.diffHighlightB.after}</span>
                </div>

                {stage3Answered && (
                  <p className="text-sm font-medium text-slate-700 mt-3 pt-3 border-t border-slate-200 leading-normal">
                    {currentCw.defB}
                  </p>
                )}
              </button>
            </div>

            {/* Mnemonic / Distinction Tip Banner after answering */}
            {stage3Answered && (currentCw.mnemonic || currentCw.distinctionTip) && (
              <div className="mb-6 p-4 rounded-xl bg-amber-50/80 border border-amber-200/90 space-y-2 animate-in fade-in duration-200">
                {currentCw.distinctionTip && (
                  <div className="flex items-start gap-2.5">
                    <span className="text-xs font-mono font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded mt-0.5 whitespace-nowrap">
                      💡 Mẹo cốt lõi
                    </span>
                    <p className="text-sm font-semibold text-slate-800">
                      {currentCw.distinctionTip}
                    </p>
                  </div>
                )}
                {currentCw.mnemonic && (
                  <div className="flex items-start gap-2.5 pt-1.5 border-t border-amber-200/60">
                    <span className="text-xs font-mono font-bold bg-indigo-100 text-indigo-900 px-2 py-0.5 rounded mt-0.5 whitespace-nowrap">
                      🧠 Phân tích ngữ nguyên
                    </span>
                    <p className="text-sm text-slate-700 leading-relaxed font-mono">
                      {currentCw.mnemonic}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Bottom action bar */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-sm text-slate-500 font-mono">
                {stage3Answered ? "Nhấn [Enter] để chuyển sang câu tiếp theo" : "Chọn thẻ bên trái [←] hoặc bên phải [→]"}
              </span>

              {stage3Answered && (
                <button
                  onClick={handleStage3Next}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-bold shadow-md shadow-indigo-500/25 transition-all"
                >
                  <span>Tiếp tục</span>
                  <kbd className="font-mono text-xs bg-black/20 px-1.5 py-0.5 rounded">Enter ↵</kbd>
                </button>
              )}
            </div>
          </div>
        )}

        {/* STAGE 4: SYNONYM FILTER (Odd-One-Out) */}
        {currentStage === 4 && (
          <div className="w-full max-w-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/60 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-200">
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <span className="text-sm font-mono font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-200">
                CHALLENGE {stage4ChallengeIndex + 1} / {VOCAB_C1_UNIT_1.synonymFilter.length}
              </span>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <span>Đã loại trừ:</span>
                <span className="font-mono font-bold text-amber-700">
                  {nonSynonymsRemoved} / {nonSynonymsTotal} từ không đồng nghĩa
                </span>
              </div>
            </div>

            {/* Target Word Center Display */}
            <div className="text-center mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold">Từ vựng mục tiêu</span>
              <h2 className="text-3xl sm:text-4xl font-black text-indigo-900 tracking-tight my-1.5 font-mono">
                {currentSf.targetWord}
              </h2>
              <p className="text-base font-semibold text-slate-700">{currentSf.targetMeaning}</p>
              {currentSf.note && (
                <p className="text-sm text-amber-700 mt-1 italic font-medium">{currentSf.note}</p>
              )}
            </div>

            {/* 12-Pill Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
              {currentSf.words.map((item) => {
                const isRemoved = stage4RemovedWords.includes(item.word);
                const isShaking = stage4ShakeWord === item.word;

                let pillStyle = "bg-slate-50 border-slate-200 text-slate-800 hover:border-amber-400 hover:bg-amber-50/50 shadow-2xs";
                
                if (isRemoved) {
                  pillStyle = "opacity-30 line-through bg-rose-50 border-rose-200 text-slate-400 pointer-events-none scale-95";
                } else if (isStage4RoundComplete && item.isSynonym) {
                  pillStyle = "bg-emerald-100 border-emerald-500 text-emerald-900 font-black shadow-xs";
                }

                return (
                  <button
                    key={item.word}
                    onClick={() => handleStage4PillClick(item)}
                    disabled={isRemoved || isStage4RoundComplete}
                    className={`p-3.5 rounded-xl border text-center font-mono text-sm transition-all relative ${pillStyle} ${
                      isShaking ? "animate-pulse border-rose-500 bg-rose-100 text-rose-900" : ""
                    }`}
                    title={item.meaningVi}
                  >
                    <div className="font-bold text-sm sm:text-base">{item.word}</div>
                    <div className="text-xs text-slate-500 truncate mt-1 font-sans">{item.meaningVi}</div>
                  </button>
                );
              })}
            </div>

            {/* Victory banner when all odd-ones are out */}
            {isStage4RoundComplete && (
              <div className="p-3.5 mb-4 rounded-xl bg-emerald-50 border border-emerald-300 text-center animate-in fade-in duration-300">
                <p className="text-sm text-emerald-800 font-bold flex items-center justify-center gap-1.5">
                  <Check className="w-4 h-4" />
                  Đã lọc xong! Các thẻ màu xanh còn lại chính là cụm từ đồng nghĩa chuẩn C1 của "{currentSf.targetWord}".
                </p>
              </div>
            )}

            {/* Bottom action bar */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-sm text-slate-500 font-mono">
                {isStage4RoundComplete
                  ? "Nhấn [Enter] để tiếp tục"
                  : "Click vào các từ KHÔNG đồng nghĩa để gạch bỏ"}
              </span>

              {isStage4RoundComplete && (
                <button
                  onClick={handleStage4NextRound}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-bold shadow-md shadow-indigo-500/25 transition-all"
                >
                  <span>{stage4ChallengeIndex < VOCAB_C1_UNIT_1.synonymFilter.length - 1 ? "Thử thách tiếp" : "Sang Chặng 5"}</span>
                  <kbd className="font-mono text-xs bg-black/20 px-1.5 py-0.5 rounded">Enter ↵</kbd>
                </button>
              )}
            </div>
          </div>
        )}

        {/* STAGE 5: SMART CLOZE PASSAGE */}
        {currentStage === 5 && (
          <div className="w-full max-w-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/60 rounded-2xl p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto transition-all duration-200">
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-mono font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-200">
                  PASSAGE {stage5PassageIndex + 1} / {VOCAB_C1_UNIT_1.clozePassages.length}
                </span>
                <span className="text-base font-bold text-slate-900">{currentCp.title}</span>
              </div>
              <span className="text-sm text-slate-500">{currentCp.sourceLabel}</span>
            </div>

            {/* Passage Text with Inline Pills */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 mb-4 leading-relaxed text-slate-800 text-base sm:text-lg">
              {(() => {
                const parts = currentCp.passageTemplate.split(/(\{\{gap_\d+\}\})/g);
                return parts.map((part, idx) => {
                  const match = part.match(/\{\{gap_(\d+)\}\}/);
                  if (match) {
                    const gapNum = parseInt(match[1]);
                    const gapDef = currentCp.gaps.find((g) => g.gapNumber === gapNum);
                    const currentAnswer = stage5Answers[gapNum];
                    const isCorrect = currentAnswer?.toLowerCase() === gapDef?.correctLabel.toLowerCase();
                    const isOpen = activeGapNumber === gapNum;

                    let pillClass = "bg-white border-indigo-300 text-indigo-700 hover:border-indigo-500 shadow-xs";
                    if (currentAnswer) {
                      pillClass = isCorrect
                        ? "bg-emerald-100 border-emerald-500 text-emerald-900 font-black"
                        : "bg-rose-100 border-rose-500 text-rose-900 font-black";
                    }

                    return (
                      <span key={idx} className="relative inline-block mx-1">
                        <button
                          onClick={() => setActiveGapNumber(isOpen ? null : gapNum)}
                          className={`px-3 py-1 rounded-lg border font-mono text-sm sm:text-base font-bold transition-all ${pillClass}`}
                        >
                          {currentAnswer
                            ? `(${gapNum}) ${currentAnswer.toUpperCase()}: ${gapDef?.options.find((o) => o.label.toLowerCase() === currentAnswer.toLowerCase())?.text || ""}`
                            : `[ (${gapNum}) Chọn từ ▾ ]`}
                        </button>

                        {/* Floating Popover for this gap */}
                        {isOpen && gapDef && (
                          <div className="absolute top-full left-0 mt-2 z-30 w-72 bg-white border border-slate-300 rounded-xl shadow-2xl p-2.5 animate-in fade-in duration-150">
                            <div className="text-xs font-mono text-slate-500 px-2 py-1 border-b border-slate-100 mb-1 flex justify-between font-bold">
                              <span>Chọn đáp án ({gapNum})</span>
                              <span>Phím [1]-[4]</span>
                            </div>
                            <div className="space-y-1">
                              {gapDef.options.map((opt, oIdx) => (
                                <button
                                  key={opt.label}
                                  onClick={() => handleStage5SelectOption(gapNum, opt.label)}
                                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-sm font-mono font-bold hover:bg-indigo-600 hover:text-white transition-all text-slate-800"
                                >
                                  <span>
                                    <strong className="text-indigo-600 group-hover:text-white mr-2">[{opt.label.toUpperCase()}]</strong>
                                    {opt.text}
                                  </span>
                                  <kbd className="text-xs bg-slate-100 px-1.5 py-0.5 rounded border border-slate-300 text-slate-600 font-bold">
                                    {oIdx + 1}
                                  </kbd>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </span>
                    );
                  }
                  return <span key={idx} className="whitespace-pre-line">{part}</span>;
                });
              })()}
            </div>

            {/* Explanation drawer for the last interacted gap */}
            {lastAnsweredGap !== null && (() => {
              const gapDef = currentCp.gaps.find((g) => g.gapNumber === lastAnsweredGap);
              if (!gapDef) return null;
              const isCorrect = stage5Answers[lastAnsweredGap]?.toLowerCase() === gapDef.correctLabel.toLowerCase();

              return (
                <div className="p-4 mb-4 rounded-xl bg-slate-50 border border-slate-200 text-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-800 text-sm sm:text-base">
                      Giải thích Chỗ trống ({lastAnsweredGap}): Đáp án chuẩn{" "}
                      <strong className="text-emerald-700 font-mono font-black">
                        {gapDef.correctLabel.toUpperCase()}. {gapDef.correctWord}
                      </strong>
                    </span>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded ${
                      isCorrect ? "bg-emerald-100 text-emerald-800 border border-emerald-300" : "bg-rose-100 text-rose-800 border border-rose-300"
                    }`}>
                      {isCorrect ? "Chính xác" : "Chưa chính xác"}
                    </span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-600">
                    {gapDef.options.map((opt) => (
                      <li key={opt.label} className={opt.label.toLowerCase() === gapDef.correctLabel.toLowerCase() ? "text-emerald-800 font-bold" : ""}>
                        • {gapDef.explanations?.[opt.label.toLowerCase()] || `${opt.label.toUpperCase()}: ${opt.text}`}
                      </li>
                    ))}
                  </ul>
                  {gapDef.explanationVi && (
                    <p className="mt-2 text-sm text-slate-700 bg-slate-50 p-2.5 rounded border border-slate-200">
                      💡 <strong>Giải thích ngữ cảnh:</strong> {gapDef.explanationVi}
                    </p>
                  )}
                </div>
              );
            })()}

            {/* Bottom action bar */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <span className="text-sm text-slate-500 font-mono">
                {allGapsAnswered
                  ? "Tất cả các lỗ trống đã hoàn thành! Nhấn [Enter] để tiếp tục"
                  : "Click vào các nút [Chọn từ ▾] để điền đáp án"}
              </span>

              {allGapsAnswered && (
                <button
                  onClick={handleStage5NextPassage}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-bold shadow-md shadow-indigo-500/25 transition-all"
                >
                  <span>{stage5PassageIndex < VOCAB_C1_UNIT_1.clozePassages.length - 1 ? "Bài đọc tiếp theo" : "Sang Chặng 6"}</span>
                  <kbd className="font-mono text-xs bg-black/20 px-1.5 py-0.5 rounded">Enter ↵</kbd>
                </button>
              )}
            </div>
          </div>
        )}

        {/* STAGE 6: SPEED BLITZ (Instant Feedback Flash Quiz) */}
        {currentStage === 6 && (
          <div className="w-full max-w-2xl bg-white border border-slate-200 shadow-xl shadow-slate-200/60 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-200">
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <span className="text-sm font-mono font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-200">
                QUESTION {stage6Index + 1} / {VOCAB_C1_UNIT_1.speedBlitz.length}
              </span>
              <span className="text-sm text-slate-500 font-mono font-semibold">
                {VOCAB_C1_UNIT_1.unitId === 1
                  ? (stage6Index < 15 ? "Task One (Trang 4)" : "Phần B (Trang 6)")
                  : VOCAB_C1_UNIT_1.unitId === 2
                  ? (stage6Index < 10 ? "Task One (Trang 8)" : "Phần B (Trang 10)")
                  : VOCAB_C1_UNIT_1.unitId === 3
                  ? (stage6Index < 10 ? "Task One (Trang 12)" : "Phần B (Trang 14)")
                  : VOCAB_C1_UNIT_1.unitId === 4
                  ? (stage6Index < 10 ? "Task One (Trang 16)" : "Phần B (Trang 18)")
                  : VOCAB_C1_UNIT_1.unitId === 5
                  ? (stage6Index < 10 ? "Task One (Trang 20)" : "Phần B (Trang 22)")
                  : VOCAB_C1_UNIT_1.unitId === 6
                  ? (stage6Index < 10 ? "Task One (Trang 24)" : "Phần B (Trang 26)")
                  : VOCAB_C1_UNIT_1.unitId === 7
                  ? (stage6Index < 10 ? "Ex A & B (Trang 27)" : "Phần B (Trang 30)")
                  : VOCAB_C1_UNIT_1.unitId === 8
                  ? (stage6Index < 10 ? "Task Three (Trang 33)" : "Phần B (Trang 34)")
                  : VOCAB_C1_UNIT_1.unitId === 9
                  ? (stage6Index < 10 ? "Prepositions (Trang 36-37)" : "Phần B (Trang 39)")
                  : (stage6Index < 10 ? "Crimes & Roles (Trang 40)" : "Phần B (Trang 45)")}
              </span>
            </div>

            {/* Question Prompt */}
            <div className="mb-6 p-5 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                {currentSb.prompt}
              </p>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {currentSb.options.map((opt) => {
                const isSelected = stage6SelectedKey === opt.key;
                const isCorrectOption = opt.key === currentSb.correctKey;

                let optClass = "bg-slate-50 border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50 text-slate-800 shadow-2xs";

                if (stage6Answered) {
                  if (isCorrectOption) {
                    optClass = "bg-emerald-100 border-emerald-500 text-emerald-950 font-black shadow-xs";
                  } else if (isSelected && !isCorrectOption) {
                    optClass = "bg-rose-100 border-rose-400 text-rose-950 font-black";
                  } else {
                    optClass = "opacity-40 border-slate-200 bg-slate-50 text-slate-400";
                  }
                }

                return (
                  <button
                    key={opt.key}
                    onClick={() => handleStage6Select(opt.key)}
                    disabled={stage6Answered}
                    className={`p-4 rounded-xl border text-left font-mono text-base font-bold transition-all flex items-center justify-between ${optClass}`}
                  >
                    <span>{opt.text}</span>
                    <kbd className="text-xs font-mono bg-white px-2 py-0.5 rounded border border-slate-300 text-slate-600 font-bold shadow-2xs">
                      [{opt.key}]
                    </kbd>
                  </button>
                );
              })}
            </div>

            {/* Instant Deep Feedback Drawer */}
            {stage6Answered && (
              <div className="p-4 sm:p-5 mb-4 rounded-xl bg-slate-50 border border-slate-200 text-sm animate-in fade-in duration-200">
                <div className="font-bold text-slate-800 mb-2.5 flex items-center gap-2 text-base">
                  <span className={stage6IsCorrect ? "text-emerald-700 font-bold" : "text-rose-700 font-bold"}>
                    {stage6IsCorrect ? "✓ Chính xác!" : "✗ Chưa chính xác!"}
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-600">Giải nghĩa từ vựng:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                  {currentSb.explanations.map((exp) => (
                    <div
                      key={exp.key}
                      className={`p-2.5 rounded-lg text-sm ${exp.key === currentSb.correctKey ? "bg-emerald-100/80 border border-emerald-300 text-emerald-950 font-medium" : "bg-white border border-slate-200"}`}
                    >
                      <strong className="text-slate-900 font-mono font-bold">{exp.word}</strong>{" "}
                      <span className="text-slate-500 text-xs">({exp.pos})</span>: {exp.vi}
                    </div>
                  ))}
                </div>

                {/* Milestone / Pacing Checkpoint every 8 questions */}
                {(stage6Index + 1) % 8 === 0 && (
                  <div className="mt-3.5 pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-mono bg-indigo-50/80 p-2.5 rounded-lg">
                    <span className="font-bold text-indigo-900 flex items-center gap-1.5">
                      🏁 Trạm kiểm soát nhịp độ ({stage6Index + 1}/{VOCAB_C1_UNIT_1.speedBlitz.length})
                    </span>
                    <span className="text-slate-600 font-semibold">
                      Chính xác: <strong className="text-indigo-700">{accuracyPercentage}%</strong> &bull; Lỗi ghi nhận: <strong className="text-rose-600">{mistakeVault.length}</strong>
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Bottom action bar */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-sm text-slate-500 font-mono">
                {stage6Answered ? "Nhấn [Enter] để sang câu kế tiếp" : "Bấm phím [1]-[4] để chọn đáp án"}
              </span>

              {stage6Answered && (
                <button
                  onClick={handleStage6Next}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-bold shadow-md shadow-indigo-500/25 transition-all cursor-pointer"
                >
                  <span>{stage6Index < VOCAB_C1_UNIT_1.speedBlitz.length - 1 ? "Câu tiếp theo" : `Hoàn thành Unit ${VOCAB_C1_UNIT_1.unitId}`}</span>
                  <kbd className="font-mono text-xs bg-black/20 px-1.5 py-0.5 rounded">Enter ↵</kbd>
                </button>
              )}
            </div>
          </div>
        )}
      </main>

      {/* ============================================================ */}
      {/* 3. BOTTOM HUD (64px)                                         */}
      {/* ============================================================ */}
      <footer className="h-16 shrink-0 flex items-center justify-between px-6 border-t border-slate-200 bg-white/95 backdrop-blur-md z-20 shadow-xs">
        <div className="flex items-center gap-3 text-sm text-slate-600 font-mono">
          <Keyboard className="w-4 h-4 text-slate-500" />
          <span className="hidden sm:inline font-bold">Phím tắt nhanh:</span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-2 py-0.5 rounded bg-slate-100 border border-slate-300 text-slate-800 font-bold shadow-2xs">1-4</kbd> Chọn đáp án
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-2 py-0.5 rounded bg-slate-100 border border-slate-300 text-slate-800 font-bold shadow-2xs">Space</kbd> Phát âm
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-2 py-0.5 rounded bg-slate-100 border border-slate-300 text-slate-800 font-bold shadow-2xs">Enter</kbd> Qua câu
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-700 font-mono font-bold">
            Chặng {currentStage} / 6
          </span>
        </div>
      </footer>
        </>
      )}

      {/* ============================================================ */}
      {/* 4. MISTAKE VAULT MODAL (Human Readable)                      */}
      {/* ============================================================ */}
      {isVaultOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-white border border-slate-300 rounded-3xl p-6 shadow-2xl relative max-h-[85vh] flex flex-col">
            <button
              onClick={() => setIsVaultOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 p-1 rounded-lg text-lg font-bold cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4 shrink-0">
              <Bookmark className="w-5 h-5 text-amber-500" />
              <h3 className="text-xl font-bold text-slate-900">Mistake Vault (Kho từ cần ôn)</h3>
              <span className="text-xs font-mono bg-rose-100 text-rose-800 border border-rose-300 px-2.5 py-0.5 rounded-full font-bold">
                {mistakeVault.length} mục
              </span>
            </div>

            {mistakeVault.length === 0 ? (
              <div className="py-12 text-center text-slate-500 text-base">
                <Check className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
                Tuyệt vời! Hiện tại bạn không có từ nào cần ôn lại trong kho.
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                <p className="text-xs text-slate-500 mb-2">
                  Dưới đây là các từ bạn đã đánh dấu cần ôn hoặc chọn sai trong quá trình làm bài:
                </p>
                {mistakeVault.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm flex flex-col justify-between gap-2"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold mr-2">
                          {item.stage}
                        </span>
                        <span className="text-base font-black text-slate-900 font-mono">
                          {item.word}
                        </span>
                      </div>
                      <button
                        onClick={() => removeMistake(item.id)}
                        className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white border border-slate-300 hover:border-emerald-500 hover:text-emerald-700 text-slate-600 transition-all cursor-pointer shadow-2xs flex items-center gap-1"
                        title="Đã nắm vững, xóa khỏi kho"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Đã thuộc</span>
                      </button>
                    </div>

                    {item.context && (
                      <div className="text-xs text-slate-600 italic bg-white p-2 rounded-lg border border-slate-100">
                        {item.context}
                      </div>
                    )}

                    <div className="flex items-center gap-3 text-xs font-mono">
                      <span className="text-rose-600">
                        Bạn chọn: <strong>{item.userChoice}</strong>
                      </span>
                      <span className="text-slate-300">➔</span>
                      <span className="text-emerald-700">
                        Đúng: <strong>{item.correctAnswer}</strong>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between items-center pt-4 border-t border-slate-200 mt-4 shrink-0">
              <button
                onClick={clearVault}
                disabled={mistakeVault.length === 0}
                className="text-xs text-rose-600 hover:underline font-semibold disabled:opacity-40 disabled:no-underline cursor-pointer"
              >
                Xóa tất cả
              </button>
              <button
                onClick={() => setIsVaultOpen(false)}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold shadow-xs cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VocabC1Page;
