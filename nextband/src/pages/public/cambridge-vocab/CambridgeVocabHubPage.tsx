import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { SEO } from "@/components/common/SEO";
import {
  Volume2,
  VolumeX,
  ArrowRight,
  ArrowLeft,
  Search,
  CheckCircle2,
  Check,
  X,
  Sparkles,
  Zap,
  RotateCcw,
  BookOpen,
  Compass,
  Lightbulb,
  FileText,
  Layers,
  Filter,
  Keyboard,
  Trophy,
  Scan,
  Disc,
  Hammer,
  Magnet,
  Puzzle,
  ChevronRight,
  ChevronLeft,
  Lock,
  Flame,
  Gauge,
  Timer,
  Eye,
  AlertCircle
} from "lucide-react";
import {
  CAMBRIDGE_VOCAB_UNITS,
  getCambridgeUnitData,
  CambridgeUnitData,
  UnitOverviewItem,
  Stage1Magnet,
  Stage2Milestone,
  EssayBlank,
  MorphologyVariant,
  LexiconEntry
} from "@/data/cambridgeVocab";

/* =========================================================================
 * AUDIO SYNTHESIZER (Web Audio API)
 * ========================================================================= */
class AudioSynthesizer {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  playSuccess() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    [523.25, 659.25, 783.99].forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);
      gain.gain.setValueAtTime(0.12, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.26);
    });
  }

  playError() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.linearRampToValueAtTime(100, now + 0.2);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  }

  playWeld() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.3);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.3);
  }
}

const audioSynth = new AudioSynthesizer();

const speakWord = (text: string) => {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-GB";
  u.rate = 0.9;
  window.speechSynthesis.speak(u);
};

export default function CambridgeVocabHubPage() {
  const { unitId } = useParams<{ unitId?: string }>();
  const navigate = useNavigate();

  const selectedUnitId = unitId ? parseInt(unitId, 10) : null;
  const currentUnitData = selectedUnitId ? getCambridgeUnitData(selectedUnitId) : null;

  // Overview Hub State
  const [phaseFilter, setPhaseFilter] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Interactive Learning Room State
  const [currentStage, setCurrentStage] = useState<1 | 2 | 3>(1);
  const [streak, setStreak] = useState<number>(0);
  const [totalAttempts, setTotalAttempts] = useState<number>(0);
  const [wordsCompleted, setWordsCompleted] = useState<number>(0);
  const [startTime] = useState<number>(() => Date.now());
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Stage 1 State
  const [stage1Index, setStage1Index] = useState<number>(0);
  const [stage1Solved, setStage1Solved] = useState<boolean>(false);
  const [stage1ActiveSlotWord, setStage1ActiveSlotWord] = useState<string | null>(null);
  const [stage1WrongMessage, setStage1WrongMessage] = useState<{ title: string; exp: string } | null>(null);

  // Stage 2 State
  const [stage2Index, setStage2Index] = useState<number>(0);
  const [stage2UnlockedUpTo, setStage2UnlockedUpTo] = useState<number>(0);
  const [stage2Solved, setStage2Solved] = useState<boolean>(false);
  const [stage2SlotWord, setStage2SlotWord] = useState<string | null>(null);
  const [stage2ShuffledCandidates, setStage2ShuffledCandidates] = useState<string[]>([]);

  // Stage 3 State
  const [stage3ActiveBlankId, setStage3ActiveBlankId] = useState<string | null>(null);
  const [stage3ForgedBlanks, setStage3ForgedBlanks] = useState<Record<string, string>>({});
  const [stage3DialOpen, setStage3DialOpen] = useState<boolean>(false);
  const [stage3ShuffledVariants, setStage3ShuffledVariants] = useState<MorphologyVariant[]>([]);
  const [stage3XrayActive, setStage3XrayActive] = useState<boolean>(false);
  const [stage3ArsenalSearch, setStage3ArsenalSearch] = useState<string>("");

  // Living Lexicon Deck State (Spaced Repetition Flashcards)
  const [reviewQueue, setReviewQueue] = useState<string[]>(["resit", "mature", "grant"]);
  const [lexiconModalOpen, setLexiconModalOpen] = useState<boolean>(false);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [cardFlipped, setCardFlipped] = useState<boolean>(false);

  // Keyboard Guide Modal
  const [keyboardModalOpen, setKeyboardModalOpen] = useState<boolean>(false);

  // Canvas confetti ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const fireConfetti = (x?: number, y?: number, count = 35) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#4F46E5", "#7C3AED", "#059669", "#F59E0B", "#EC4899", "#3B82F6"];
    const particles = Array.from({ length: count }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 2;
      return {
        x: x || window.innerWidth / 2,
        y: y || window.innerHeight / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        size: Math.random() * 7 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 10,
        alpha: 1,
        decay: Math.random() * 0.02 + 0.015
      };
    });

    let animId: number;
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15;
        p.rotation += p.vRot;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }
      if (particles.length > 0) {
        animId = requestAnimationFrame(loop);
      } else {
        cancelAnimationFrame(animId);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
    loop();
  };

  const addToReviewQueue = (wordKey: string) => {
    if (!wordKey) return;
    const clean = wordKey.toLowerCase().trim();
    setReviewQueue(prev => (prev.includes(clean) ? prev : [...prev, clean]));
  };

  // Keyboard Event Dispatcher
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement && document.activeElement.tagName === "INPUT") return;

      if (e.key === "Escape") {
        setLexiconModalOpen(false);
        setStage3DialOpen(false);
        setKeyboardModalOpen(false);
        return;
      }

      if (lexiconModalOpen) {
        if (e.code === "Space") {
          e.preventDefault();
          setCardFlipped(f => !f);
        } else if (e.key === "ArrowRight" || e.key === "Tab") {
          e.preventDefault();
          setCurrentCardIndex(i => (i + 1) % reviewQueue.length);
          setCardFlipped(false);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          setCurrentCardIndex(i => (i - 1 + reviewQueue.length) % reviewQueue.length);
          setCardFlipped(false);
        }
        return;
      }

      if (stage3DialOpen && currentUnitData) {
        if (e.key === "1" || e.key === "2" || e.key === "3") {
          const idx = parseInt(e.key, 10) - 1;
          const blank = currentUnitData.stage3_essay.blanks.find(b => b.id === stage3ActiveBlankId);
          if (blank && stage3ShuffledVariants[idx]) {
            handleSelectMorphologyVariant(blank, stage3ShuffledVariants[idx]);
          }
        }
        return;
      }

      if (!currentUnitData) return;

      if (currentStage === 1) {
        if (e.key === "1" || e.key === "2" || e.key === "3") {
          const idx = parseInt(e.key, 10) - 1;
          handleSelectStage1Option(idx);
        } else if (e.code === "Space" || e.key === "Tab" || e.key === "Enter") {
          if (stage1Solved) {
            e.preventDefault();
            handleNextStage1Item();
          }
        }
      } else if (currentStage === 2) {
        if (e.key === "1" || e.key === "2" || e.key === "3" || e.key === "4") {
          const idx = parseInt(e.key, 10) - 1;
          const activeCandidates = stage2ShuffledCandidates.length > 0 ? stage2ShuffledCandidates : currentUnitData.stage2_timeline[stage2Index]?.candidates;
          if (activeCandidates && activeCandidates[idx]) {
            handleSelectStage2Candidate(activeCandidates[idx]);
          }
        } else if (e.code === "Space" || e.key === "Tab" || e.key === "Enter") {
          if (stage2Solved) {
            e.preventDefault();
            handleAdvanceStage2Milestone();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lexiconModalOpen, stage3DialOpen, currentUnitData, currentStage, stage1Solved, stage2Solved, stage1Index, stage2Index, stage2ShuffledCandidates, stage3ActiveBlankId, stage3ShuffledVariants, reviewQueue.length]);

  // STAGE 1 HANDLERS
  const handleSelectStage1Option = (optionIdx: number) => {
    if (stage1Solved || !currentUnitData) return;
    const cur = currentUnitData.stage1_magnets[stage1Index];
    const chosen = cur.options[optionIdx];
    setTotalAttempts(a => a + 1);

    if (chosen.word.toLowerCase() === cur.target.toLowerCase()) {
      setStage1Solved(true);
      setStreak(s => s + 1);
      setWordsCompleted(w => w + 1);
      setStage1ActiveSlotWord(chosen.word);
      setStage1WrongMessage(null);
      audioSynth.playSuccess();
      fireConfetti(window.innerWidth / 2, window.innerHeight / 2, 35);
    } else {
      setStreak(0);
      audioSynth.playError();
      setStage1WrongMessage({
        title: `"${chosen.word}" không khớp ngữ cảnh này!`,
        exp: chosen.explanation
      });
      addToReviewQueue(cur.target);
      addToReviewQueue(chosen.word);
    }
  };

  const handleNextStage1Item = () => {
    audioSynth.playClick();
    if (!currentUnitData) return;
    if (stage1Index < currentUnitData.stage1_magnets.length - 1) {
      setStage1Index(i => i + 1);
      setStage1Solved(false);
      setStage1ActiveSlotWord(null);
      setStage1WrongMessage(null);
    } else {
      fireConfetti(window.innerWidth / 2, window.innerHeight / 2, 70);
      setCurrentStage(2);
    }
  };

  // Shuffle Stage 2 candidates on unit load or milestone change so answers are never always at [1]
  useEffect(() => {
    if (!currentUnitData) return;
    const m = currentUnitData.stage2_timeline[stage2Index];
    if (m && m.candidates) {
      const shuffled = [...m.candidates].sort(() => Math.random() - 0.5);
      setStage2ShuffledCandidates(shuffled);
    }
  }, [selectedUnitId, stage2Index, currentUnitData]);

  // STAGE 2 HANDLERS
  const handleSelectStage2Candidate = (candidateWord: string) => {
    if (stage2Solved || !currentUnitData) return;
    const cur = currentUnitData.stage2_timeline[stage2Index];
    setTotalAttempts(a => a + 1);

    if (candidateWord.toLowerCase() === cur.target.toLowerCase()) {
      setStage2Solved(true);
      setStreak(s => s + 1);
      setWordsCompleted(w => w + 1);
      setStage2SlotWord(candidateWord);
      audioSynth.playSuccess();
      fireConfetti(window.innerWidth / 2, window.innerHeight / 2, 35);
      if (stage2Index + 1 > stage2UnlockedUpTo) {
        setStage2UnlockedUpTo(stage2Index + 1);
      }
    } else {
      setStreak(0);
      audioSynth.playError();
      addToReviewQueue(cur.target);
      addToReviewQueue(candidateWord);
    }
  };

  const handleAdvanceStage2Milestone = () => {
    audioSynth.playClick();
    if (!currentUnitData) return;
    if (stage2Index < currentUnitData.stage2_timeline.length - 1) {
      setStage2Index(i => i + 1);
      setStage2Solved(false);
      setStage2SlotWord(null);
    } else {
      fireConfetti(window.innerWidth / 2, window.innerHeight / 2, 70);
      setCurrentStage(3);
    }
  };

  // STAGE 3 HANDLERS
  const openMorphologyForBlank = (blankId: string) => {
    if (!currentUnitData) return;
    audioSynth.playClick();
    setStage3ActiveBlankId(blankId);
    const blank = currentUnitData.stage3_essay.blanks.find(b => b.id === blankId);
    if (blank) {
      // Shuffle options so it is never always A!
      const shuffled = [...blank.variants].sort(() => Math.random() - 0.5);
      setStage3ShuffledVariants(shuffled);
      setStage3DialOpen(true);
    }
  };

  const handleSelectMorphologyVariant = (blank: EssayBlank, variant: MorphologyVariant) => {
    setTotalAttempts(a => a + 1);
    if (variant.isCorrect) {
      audioSynth.playWeld();
      setStreak(s => s + 1);
      setWordsCompleted(w => w + 1);
      setStage3ForgedBlanks(prev => ({ ...prev, [blank.id]: variant.form }));
      fireConfetti(window.innerWidth / 2, window.innerHeight / 2, 40);
      setStage3DialOpen(false);

      // Auto-target next blank
      if (currentUnitData) {
        const nextBlank = currentUnitData.stage3_essay.blanks.find(b => !stage3ForgedBlanks[b.id] && b.id !== blank.id);
        if (nextBlank) setStage3ActiveBlankId(nextBlank.id);
      }
    } else {
      setStreak(0);
      audioSynth.playError();
      addToReviewQueue(blank.rootWord);
    }
  };

  // Unit Overview filtered list
  const filteredUnits = useMemo(() => {
    return CAMBRIDGE_VOCAB_UNITS.filter(u => {
      const matchPhase = phaseFilter === 0 || u.phaseId === phaseFilter;
      const matchSearch =
        !searchTerm.trim() ||
        u.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.titleVi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.descriptionVi.toLowerCase().includes(searchTerm.toLowerCase());
      return matchPhase && matchSearch;
    });
  }, [phaseFilter, searchTerm]);

  // Speedometer and Time Saved calculations
  const minutesElapsed = (Date.now() - startTime) / 60000;
  const currentWpm = minutesElapsed > 0 ? Math.round((wordsCompleted * 2.5) / minutesElapsed) : 0;
  const secondsSaved = Math.round(wordsCompleted * 63);
  const displayMinsSaved = Math.floor(secondsSaved / 60);
  const displaySecsSaved = secondsSaved % 60;

  // =========================================================================
  // VIEW 1: UNIT SELECTION HUB (Khi chưa chọn Unit)
  // =========================================================================
  if (!selectedUnitId || !currentUnitData) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-900 pb-16">
        <SEO
          title="Cambridge Vocabulary for IELTS (20 Units) | NextBand EdTech"
          description="Số hóa tương tác 3 chặng sư phạm: Nhận diện sắc thái -> Lắp ghép hành trình -> Rèn bài luận Band 8.5+ với tốc độ học nhanh gấp 6.8 lần sách giấy."
        />

        {/* HERO HEADER */}
        <section className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-6">
            
            {/*  Breadcrumbs  */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <Link to="/" className="hover:text-indigo-600 transition-colors">Trang chủ</Link>
              <span>/</span>
              <Link to="/reading" className="hover:text-indigo-600 transition-colors">Reading</Link>
              <span>/</span>
              <span className="text-slate-800 font-bold">Cambridge Vocabulary for IELTS</span>
            </div>

            {/*  Title & Badge  */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-mono font-bold">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>CAMBRIDGE UNIVERSITY PRESS &bull; PAULINE CULLEN</span>
                  <span className="px-1.5 py-0.2 rounded bg-indigo-600 text-white text-[10px]">B2 - C1</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Cambridge Vocabulary for IELTS
                </h1>
                <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
                  Số hóa tương tác thế hệ mới: Đập tan cách học thụ động bằng cấu trúc sư phạm 3 bước 
                  (<strong>Nhận diện sắc thái</strong> &rarr; <strong>Lắp ghép hành trình</strong> &rarr; <strong>Rèn bài luận Band 8.5</strong>) 
                  giúp phản xạ từ vựng nhanh gấp 5–8 lần sách giấy.
                </p>
              </div>

              {/*  Quick Stats Bento Card  */}
              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-100 flex-shrink-0">
                  <Trophy className="w-6 h-6" />
                </div>
                <div className="text-xs space-y-0.5">
                  <div className="font-bold text-slate-900 font-mono text-sm">20 CHỦ ĐỀ CỐT LÕI</div>
                  <div className="text-slate-500">IELTS Academic & General</div>
                  <div className="text-indigo-700 font-semibold font-mono">Đạt mục tiêu: 6.5 - 8.5+</div>
                </div>
              </div>
            </div>

            {/*  Filter Tabs & Search Bar  */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-slate-100">
              {/*  Phase Filter Pills  */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {[
                  { id: 0, label: "Tất cả (20 Units)" },
                  { id: 1, label: "GĐ 1: Con người" },
                  { id: 2, label: "GĐ 2: Xã hội" },
                  { id: 3, label: "GĐ 3: Khoa học" },
                  { id: 4, label: "GĐ 4: Thể chế" }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setPhaseFilter(tab.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      phaseFilter === tab.id
                        ? "bg-slate-900 text-white shadow-sm"
                        : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/*  Search Input  */}
              <div className="relative min-w-[240px]">
                <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="Tìm chủ đề, từ khóa..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-mono"
                />
              </div>
            </div>

          </div>
        </section>

        {/*  UNITS BENTO GRID  */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredUnits.map(unit => {
              const isReady = unit.isAvailable;

              return (
                <div
                  key={unit.unitId}
                  className={`relative rounded-2xl border p-5 transition-all flex flex-col justify-between ${
                    isReady
                      ? "bg-white border-indigo-200 shadow-md hover:shadow-lg hover:border-indigo-400"
                      : "bg-white/80 border-slate-200 opacity-80"
                  }`}
                >
                  <div className="space-y-3">
                    {/*  Top Badge  */}
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-slate-400">
                        UNIT {unit.unitId < 10 ? `0${unit.unitId}` : unit.unitId}
                      </span>
                      {isReady ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-mono font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          SẴN SÀNG HỌC
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200 text-[10px] font-mono">
                          Sắp ra mắt
                        </span>
                      )}
                    </div>

                    {/*  Titles  */}
                    <div>
                      <h3 className="font-bold text-base text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {unit.titleEn}
                      </h3>
                      <p className="text-xs text-indigo-700 font-medium mt-0.5">{unit.titleVi}</p>
                    </div>

                    {/*  Description  */}
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                      {unit.descriptionVi}
                    </p>

                    {/*  Preview Collocations Chips  */}
                    <div className="pt-1 flex flex-wrap gap-1.5">
                      {unit.coreCollocationsPreview.slice(0, 3).map((col, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-200/80 font-mono text-[10px]"
                        >
                          {col}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/*  CTA Button  */}
                  <div className="pt-4 border-t border-slate-100 mt-4">
                    {isReady ? (
                      <button
                        onClick={() => navigate(`/cambridge-vocab/${unit.unitId}`)}
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                      >
                        <span>Vào Học Ngay (3 Chặng)</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <div className="w-full py-2 text-center text-xs font-mono text-slate-400 bg-slate-50 rounded-xl border border-slate-200/60">
                        Đang chuẩn bị dữ liệu
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: INTERACTIVE LEARNING ROOM (Khi đã vào học 1 Unit)
  // =========================================================================
  const magnets = currentUnitData.stage1_magnets;
  const currentMagnet = magnets[stage1Index];

  const milestones = currentUnitData.stage2_timeline;
  const currentMilestone = milestones[stage2Index];

  const essay = currentUnitData.stage3_essay;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-900 flex flex-col">
      <SEO
        title={`Unit ${currentUnitData.meta.unit}: ${currentUnitData.meta.title} | Cambridge Vocab for IELTS`}
        description={currentUnitData.meta.subTitle}
      />

      {/*  Confetti Canvas  */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50 w-full h-full" />

      {/*  TOP BENTO NAVIGATION / HUD  */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/*  Back to Units & Stage Switcher  */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/cambridge-vocab")}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title="Quay lại danh mục 20 Units"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại</span>
            </button>
          </div>

          {/*  Stage Switcher Tabs  */}
          <nav className="hidden md:flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200/80">
            <button
              onClick={() => { audioSynth.playClick(); setCurrentStage(1); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                currentStage === 1 ? "bg-white text-indigo-700 shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-700 font-mono text-[10px] flex items-center justify-center font-bold">1</span>
              Nuance Magnet
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-600 border border-indigo-200 font-semibold">
                {stage1Index}/{magnets.length}
              </span>
            </button>
            <button
              onClick={() => { audioSynth.playClick(); setCurrentStage(2); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                currentStage === 2 ? "bg-white text-violet-700 shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-600 font-mono text-[10px] flex items-center justify-center font-bold">2</span>
              Life-Timeline
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-200 text-slate-600 font-semibold">
                {stage2Index}/{milestones.length}
              </span>
            </button>
            <button
              onClick={() => { audioSynth.playClick(); setCurrentStage(3); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                currentStage === 3 ? "bg-white text-amber-700 shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-600 font-mono text-[10px] flex items-center justify-center font-bold">3</span>
              Morphology Forge
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-200 text-slate-600 font-semibold">
                {Object.keys(stage3ForgedBlanks).length}/{essay.blanks.length}
              </span>
            </button>
          </nav>

          {/*  HUD Stats  */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/*  Streak  */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 font-mono text-xs font-bold shadow-sm" title="Combo Chuỗi Đúng Liên Tiếp">
              <span className="text-sm">🔥</span>
              <span>{streak}x</span>
            </div>

            {/*  Speedometer WPM  */}
            <div className="hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-xs font-bold" title="Tốc độ phản xạ từ vựng">
              <Gauge className="w-3.5 h-3.5 text-emerald-600" />
              <span>{Math.max(currentWpm, wordsCompleted * 6)}</span>
              <span className="text-[10px] font-normal text-emerald-600">WPM</span>
            </div>

            {/*  Time Saved  */}
            <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 font-mono text-xs font-bold" title="Thời gian tiết kiệm được">
              <Timer className="w-3.5 h-3.5 text-indigo-600" />
              <span>+{displayMinsSaved}m {displaySecsSaved < 10 ? `0${displaySecsSaved}` : displaySecsSaved}s</span>
            </div>

            {/*  Living Lexicon Deck Trigger  */}
            <button
              onClick={() => { audioSynth.playClick(); setLexiconModalOpen(true); }}
              className="px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-xs font-medium flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Cần Ôn Tập</span>
              <span className="px-1.5 py-0.2 text-[10px] font-mono font-bold bg-rose-500 text-white rounded-full">
                {reviewQueue.length}
              </span>
            </button>

            {/*  Sound Toggle  */}
            <button
              onClick={() => {
                const nextState = !soundEnabled;
                setSoundEnabled(nextState);
                audioSynth.enabled = nextState;
                if (nextState) audioSynth.playClick();
              }}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
              title="Bật/Tắt Âm Thanh"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-slate-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>

            {/*  Keyboard Guide  */}
            <button
              onClick={() => { audioSynth.playClick(); setKeyboardModalOpen(true); }}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
              title="Phím Tắt Bàn Phím"
            >
              <Keyboard className="w-4 h-4 text-slate-600" />
            </button>
          </div>

        </div>
      </header>

      {/*  MAIN STAGE CONTAINER  */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col justify-start">

        {/* ================= STAGE 1: NUANCE MAGNET ================= */}
        {currentStage === 1 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-mono text-xs flex items-center justify-center font-bold">1</span>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                  Chọn từ khớp ngữ cảnh
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm text-xs font-mono text-slate-600">
                  <span className="font-bold text-indigo-600">{stage1Index + 1} / {magnets.length}</span>
                  <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                    <div
                      className="h-full bg-indigo-600 transition-all duration-300"
                      style={{ width: `${((stage1Index + 1) / magnets.length) * 100}%` }}
                    />
                  </div>
                </div>
                <button
                  onClick={handleNextStage1Item}
                  className="text-xs text-slate-400 hover:text-slate-600 underline font-medium"
                >
                  Bỏ qua
                </button>
              </div>
            </div>

            {/*  Center Context Card  */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 shadow-sm relative overflow-hidden">
              <div className="max-w-5xl mx-auto text-center space-y-6">
                {/*  Sentence with Magnetic Slot  */}
                <div className="text-xl sm:text-2xl font-medium text-slate-800 leading-relaxed sm:leading-snug px-2">
                  <span>{currentMagnet.sentenceBefore} </span>

                  {stage1Solved ? (
                    <span className="inline-flex items-center justify-center min-w-[140px] px-4 py-1 mx-2 rounded-xl border-2 border-emerald-500 bg-emerald-50 text-emerald-800 font-bold font-mono text-base shadow-sm align-middle">
                      <Check className="w-4 h-4 text-emerald-600 mr-1.5" />
                      {stage1ActiveSlotWord}
                    </span>
                  ) : (
                    <span className="inline-flex items-center justify-center min-w-[140px] px-4 py-1 mx-2 rounded-xl border-2 border-dashed border-indigo-400 bg-indigo-50/60 text-indigo-700 font-bold align-middle">
                      <Magnet className="w-4 h-4 text-indigo-600 mr-1.5" />
                      <span className="font-mono text-base">[ ? ]</span>
                    </span>
                  )}

                  <span> {currentMagnet.sentenceAfter}</span>
                </div>

                {/*  3 Magnetic Word Pills  */}
                <div className="pt-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 font-mono">
                    CHỌN VIÊN NANG TỪ VỰNG CHÍNH XÁC
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
                    {currentMagnet.options.map((opt, idx) => {
                      const isTarget = opt.word.toLowerCase() === currentMagnet.target.toLowerCase();

                      let cardStyle = "bg-white border-slate-200 hover:border-indigo-400 hover:shadow-md";
                      if (stage1Solved) {
                        if (isTarget) {
                          cardStyle = "bg-emerald-50/40 border-emerald-500 ring-2 ring-emerald-200 shadow-sm";
                        } else {
                          cardStyle = "bg-slate-50/60 border-slate-200 opacity-60";
                        }
                      }

                      return (
                        <div
                          key={idx}
                          onClick={() => handleSelectStage1Option(idx)}
                          className={`group relative border rounded-2xl p-4 cursor-pointer transition-all flex flex-col items-center justify-between text-center select-none ${cardStyle}`}
                        >
                          <span className={`absolute top-2.5 left-2.5 px-2 py-0.5 rounded-lg font-mono text-xs font-bold transition-colors ${
                            stage1Solved && isTarget 
                              ? "bg-emerald-600 text-white" 
                              : "bg-slate-100 text-slate-600 group-hover:bg-indigo-100 group-hover:text-indigo-700"
                          }`}>
                            [{idx + 1}]
                          </span>
                          
                          <div className="pt-1.5 pb-2.5 w-full">
                            <span className={`text-xl sm:text-2xl font-bold font-mono transition-colors tracking-tight ${
                              stage1Solved && isTarget ? "text-emerald-700" : "text-slate-900 group-hover:text-indigo-600"
                            }`}>
                              {opt.word}
                            </span>
                            <span className="text-xs font-mono text-slate-400 ml-1.5 font-normal">({opt.pos})</span>
                          </div>

                          {/* Radar Hint */}
                          <div className={`w-full text-left rounded-xl p-3 space-y-1.5 transition-all border ${
                            stage1Solved && isTarget
                              ? "bg-white/80 border-emerald-200/80 text-slate-700"
                              : "bg-slate-50 group-hover:bg-indigo-50/40 border-slate-200/80 group-hover:border-indigo-200 text-slate-700"
                          }`}>
                            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 tracking-wide">
                              <Compass className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
                              <span>Ngữ cảnh sử dụng:</span>
                            </div>
                            <p className="text-sm text-slate-700 leading-relaxed font-normal">
                              {opt.hint}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/*  Wrong Feedback  */}
                {stage1WrongMessage && (
                  <div className="text-left bg-rose-50 border border-rose-200 rounded-2xl p-4 text-sm text-rose-800 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-rose-900">
                      <AlertCircle className="w-4 h-4 text-rose-600" />
                      <span>{stage1WrongMessage.title}</span>
                    </div>
                    <p className="text-rose-700 leading-relaxed">{stage1WrongMessage.exp}</p>
                    <p className="text-xs text-rose-600 italic">Đã tự động thêm vào Sổ Tay Cần Ôn Tập góc phải.</p>
                  </div>
                )}

                {/*  Slide-out IELTS Insight Card when correct  */}
                {stage1Solved && (
                  <div className="text-left bg-gradient-to-r from-emerald-50/90 to-teal-50/90 border border-emerald-300 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-200/80 pb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                          <CheckCircle2 className="w-5 h-5" />
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-emerald-950 font-mono tracking-tight">
                              GÓC MỞ RỘNG IELTS &bull; COLLOCATION RADAR
                            </span>
                            <span className="px-2 py-0.5 rounded-md font-mono text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                              {currentMagnet.ieltsInsight.bandScore}
                            </span>
                          </div>
                          <p className="text-xs text-emerald-800 mt-0.5">Bạn đã chọn chính xác từ vựng cho ngữ cảnh học thuật này.</p>
                        </div>
                      </div>

                      {/* Primary Next Button right at the top so user never has to scroll */}
                      <button
                        onClick={handleNextStage1Item}
                        className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm flex items-center gap-2 shadow-md shadow-emerald-200 transition-all hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <span>Câu Tiếp Theo</span>
                        <kbd className="hidden sm:inline-block px-1.5 py-0.5 bg-emerald-700/80 rounded text-[11px] font-mono font-bold">Space / Enter</kbd>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-1.5">
                        <span className="font-bold text-slate-800 text-xs uppercase tracking-wider">Cụm Collocation Chuẩn:</span>
                        <p className="font-mono text-indigo-800 font-semibold bg-white/80 p-2.5 rounded-xl border border-emerald-200/80">
                          {currentMagnet.ieltsInsight.collocation}
                        </p>
                      </div>
                      <div className="space-y-1.5">
                        <span className="font-bold text-slate-800 text-xs uppercase tracking-wider">Từ Đồng Nghĩa Thay Thế:</span>
                        <p className="text-slate-700 bg-white/80 p-2.5 rounded-xl border border-emerald-200/80 font-medium">
                          {currentMagnet.ieltsInsight.synonyms.join(", ")}
                        </p>
                      </div>
                    </div>

                    <div className="text-sm text-slate-700 bg-white/85 p-3.5 rounded-xl border border-emerald-200/80 flex items-start gap-2.5">
                      <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      <p className="leading-relaxed">{currentMagnet.ieltsInsight.academicTip}</p>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </section>
        )}

        {/* ================= STAGE 2: LIFE-TIMELINE BUILDER ================= */}
        {currentStage === 2 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-violet-600 text-white font-mono text-xs flex items-center justify-center font-bold">2</span>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                  Khôi phục dòng thời gian
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm text-xs font-mono text-slate-600">
                  <span className="font-bold text-violet-600">{stage2Index + 1} / {milestones.length}</span>
                </div>
                <button
                  onClick={() => { setStage2Index(0); setStage2Solved(false); setStage2SlotWord(null); }}
                  className="text-xs text-slate-400 hover:text-slate-600 underline font-medium"
                >
                  Làm lại
                </button>
              </div>
            </div>

            {/*  Timeline Stepper Track  */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm overflow-hidden space-y-6">
              <div className="relative py-4 overflow-x-auto">
                {/*  Connecting Line  */}
                <div className="absolute top-9 left-6 right-6 h-1 bg-slate-200 rounded-full z-0">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-emerald-500 transition-all duration-500"
                    style={{ width: `${((stage2Index + 1) / milestones.length) * 100}%` }}
                  />
                </div>

                <div className="relative z-10 flex items-center justify-between min-w-[700px] px-2">
                  {milestones.map((m, idx) => {
                    const isCompleted = idx < stage2Index;
                    const isActive = idx === stage2Index;

                    return (
                      <div
                        key={m.milestoneId}
                        onClick={() => {
                          if (idx <= stage2UnlockedUpTo) {
                            setStage2Index(idx);
                            setStage2Solved(false);
                            setStage2SlotWord(null);
                          }
                        }}
                        className="flex flex-col items-center cursor-pointer select-none"
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all shadow-sm border-2 ${
                            isCompleted
                              ? "bg-emerald-500 border-emerald-600 text-white"
                              : isActive
                              ? "bg-violet-600 border-violet-400 text-white ring-4 ring-violet-200"
                              : "bg-slate-100 border-slate-300 text-slate-400"
                          }`}
                        >
                          {isCompleted ? <Check className="w-4 h-4" /> : idx + 1}
                        </div>
                        <span className={`text-[11px] font-mono mt-1.5 font-bold ${isActive ? "text-violet-700" : "text-slate-500"}`}>
                          {m.age}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/*  Active Milestone Narrative Card  */}
              <div className="border border-slate-200 bg-slate-50/70 rounded-2xl p-6 sm:p-8 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-1 rounded-lg bg-violet-600 text-white font-mono text-xs font-bold shadow-sm">
                      {currentMilestone.age}
                    </span>
                    <h3 className="text-base font-bold text-slate-900">{currentMilestone.title}</h3>
                  </div>
                  <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-amber-500" />
                    <span>Nạp 1 từ</span>
                  </span>
                </div>

                {/*  Vietnamese narrative: shows targetVi in brackets!  */}
                <p className="text-sm text-slate-600 leading-relaxed">
                  {currentMilestone.story.split("[BLANK]")[0]}
                  {stage2Solved ? (
                    <span className="font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                      [ {currentMilestone.targetVi} &rarr; {stage2SlotWord} ]
                    </span>
                  ) : (
                    <span className="font-bold text-violet-700 bg-violet-100/70 px-2 py-0.5 rounded border border-violet-200">
                      [ {currentMilestone.targetVi} ]
                    </span>
                  )}
                  {currentMilestone.story.split("[BLANK]")[1]}
                </p>

                {/*  English narrative with slot  */}
                <div className="text-base sm:text-lg font-medium text-slate-800 leading-relaxed bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <span>{currentMilestone.storyEn.split("[BLANK]")[0]}</span>

                  {stage2Solved ? (
                    <span className="inline-flex items-center justify-center min-w-[130px] px-3.5 py-1 mx-1.5 rounded-lg border-2 border-emerald-500 bg-emerald-50 text-emerald-800 font-bold font-mono text-base shadow-sm">
                      {stage2SlotWord}
                    </span>
                  ) : (
                    <span className="inline-flex items-center justify-center min-w-[130px] px-3.5 py-1 mx-1.5 rounded-lg border-2 border-dashed border-violet-400 bg-violet-50 text-violet-700 font-bold font-mono text-sm">
                      [ ? ]
                    </span>
                  )}

                  <span>{currentMilestone.storyEn.split("[BLANK]")[1]}</span>
                </div>

                {/*  SMART FILTER TRAY (4 candidates)  */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-violet-600" />
                      <span className="text-xs font-bold tracking-wider text-slate-700 font-mono">
                        Chọn từ phù hợp [1-4]
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {(stage2ShuffledCandidates.length > 0 ? stage2ShuffledCandidates : currentMilestone.candidates).map((cand, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleSelectStage2Candidate(cand)}
                        className="bg-white border border-slate-200 rounded-xl p-3.5 cursor-pointer hover:border-violet-500 hover:shadow-md transition-all flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 rounded font-mono text-[10px] font-bold bg-slate-100 text-slate-500 group-hover:bg-violet-100 group-hover:text-violet-700 transition-colors">
                            [{idx + 1}]
                          </span>
                          <span className="font-mono text-sm font-bold text-slate-800 group-hover:text-violet-700 transition-colors">
                            {cand}
                          </span>
                        </div>
                        <Puzzle className="w-3.5 h-3.5 text-slate-400 group-hover:text-violet-500" />
                      </div>
                    ))}
                  </div>
                </div>

                {/*  Milestone Success  */}
                {stage2Solved && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs space-y-2 text-emerald-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-bold text-emerald-900">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Cột mốc hoàn thành! Đường dẫn sang độ tuổi tiếp theo đã được thắp sáng.</span>
                      </div>
                      <button
                        onClick={handleAdvanceStage2Milestone}
                        className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-semibold flex items-center gap-1.5 hover:bg-emerald-700 transition-colors"
                      >
                        <span>Cột Mốc Tiếp Theo</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-emerald-700">{currentMilestone.explanation}</p>
                  </div>
                )}
              </div>

            </div>
          </section>
        )}

        {/* ================= STAGE 3: 2-STEP MORPHOLOGY FORGE ================= */}
        {currentStage === 3 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-amber-600 text-white font-mono text-xs flex items-center justify-center font-bold">3</span>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                  Bài luận IELTS & Biến thể từ
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setStage3XrayActive(x => !x)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all shadow-sm ${
                    stage3XrayActive
                      ? "bg-indigo-600 text-white border-indigo-700"
                      : "border-indigo-200 bg-indigo-50/70 hover:bg-indigo-100 text-indigo-700"
                  }`}
                >
                  <Scan className="w-4 h-4" />
                  <span>{stage3XrayActive ? "Tắt Structure X-Ray" : "Bật IELTS Structure X-Ray"}</span>
                </button>

                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm text-xs font-mono text-slate-600">
                  <span>Đã rèn:</span>
                  <span className="font-bold text-amber-600">
                    {Object.keys(stage3ForgedBlanks).length} / {essay.blanks.length}
                  </span>
                </div>
              </div>
            </div>

            {/*  X-Ray Legend  */}
            {stage3XrayActive && (
              <div className="bg-slate-900 text-white rounded-xl p-3 px-4 text-xs flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="font-mono text-indigo-300 font-bold flex items-center gap-1.5">
                    <Eye className="w-4 h-4" /> CHẾ ĐỘ SOI CẤU TRÚC BÀI LUẬN (BAND 8.5):
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-amber-400"></span>
                    <span className="text-slate-300">Luận Điểm Cốt Lõi</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-purple-400"></span>
                    <span className="text-slate-300">Từ Nối Học Thuật</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-emerald-400"></span>
                    <span className="text-slate-300">Cụm Từ Vựng Band 8+</span>
                  </span>
                </div>
                <button onClick={() => setStage3XrayActive(false)} className="text-slate-400 hover:text-white underline text-[11px]">
                  Tắt X-Ray
                </button>
              </div>
            )}

            {/*  SPLIT-PANE: 70% Essay | 30% Word Arsenal  */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/*  LEFT: 70% (8 cols)  */}
              <div className="lg:col-span-8 space-y-4">
                {/*  Prompt Card  */}
                <div className="bg-gradient-to-r from-slate-50 to-indigo-50/30 border-l-4 border-l-indigo-600 p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-1">
                    <span className="font-bold text-indigo-700">IELTS WRITING TASK 2 TOPIC</span>
                    <span>Academic &bull; 250+ Words</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium italic">
                    "{essay.prompt}"
                  </p>
                </div>

                {/*  Essay Article Container  */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 text-slate-800 text-sm sm:text-base leading-relaxed sm:leading-loose shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <h3 className="font-bold text-slate-900 text-base sm:text-lg">{essay.title}</h3>
                    <span className="text-xs font-mono text-slate-400">4 Paragraphs &bull; 12 Blanks</span>
                  </div>

                  {essay.paragraphs.map(p => {
                    // Render paragraph text with interactive blank buttons
                    const parts: React.ReactNode[] = [];
                    let remaining = p.text;

                    essay.blanks.forEach(b => {
                      const token = `[BLANK_${b.num}]`;
                      if (remaining.includes(token)) {
                        const splitParts = remaining.split(token);
                        parts.push(splitParts[0]);

                        const forgedForm = stage3ForgedBlanks[b.id];
                        if (forgedForm) {
                          parts.push(
                            <span
                              key={b.id}
                              onClick={() => openMorphologyForBlank(b.id)}
                              className="cursor-pointer inline-flex items-center gap-1 px-2.5 py-0.5 mx-1 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-300 font-mono font-bold text-xs sm:text-sm hover:bg-emerald-200 transition-all shadow-sm"
                            >
                              <span>{forgedForm}</span>
                              <Check className="w-3 h-3 text-emerald-700" />
                            </span>
                          );
                        } else {
                          parts.push(
                            <span
                              key={b.id}
                              onClick={() => openMorphologyForBlank(b.id)}
                              className={`cursor-pointer inline-flex items-center gap-1 px-2.5 py-0.5 mx-1 rounded-md border border-dashed font-mono text-xs sm:text-sm transition-all select-none ${
                                stage3ActiveBlankId === b.id
                                  ? "border-amber-500 bg-amber-50 text-amber-800 ring-2 ring-amber-300 font-bold"
                                  : "border-slate-300 bg-slate-100/80 text-slate-600 hover:border-amber-400 hover:bg-amber-50/50"
                              }`}
                            >
                              <span className="text-amber-600 font-bold">[{b.num}]</span>
                              <span>Rèn từ</span>
                            </span>
                          );
                        }
                        remaining = splitParts[1] || "";
                      }
                    });

                    parts.push(remaining);

                    return (
                      <p key={p.pIndex} className="text-justify">
                        {parts}
                      </p>
                    );
                  })}
                </div>

                {/* Completion Banner */}
                {Object.keys(stage3ForgedBlanks).length === essay.blanks.length && (
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl p-6 shadow-md space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-2xl">🏆</span>
                        <div>
                          <h4 className="font-bold text-base">CHÚC MỪNG BẠN ĐÃ RÈN XONG TOÀN BỘ BÀI LUẬN!</h4>
                          <p className="text-xs text-emerald-100">Cả 12 từ vựng học thuật và biến thể hình thái đã được tích hợp chuẩn xác theo thang điểm Band 8.5.</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setStage3XrayActive(true)}
                        className="px-4 py-2 rounded-xl bg-white text-emerald-800 font-bold text-xs shadow-md hover:bg-emerald-50 transition-colors"
                      >
                        Xem X-Ray Phân Tích
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/*  RIGHT: 30% (4 cols) Word Arsenal  */}
              <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-24">
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs font-mono">⚡</span>
                      <h4 className="font-bold text-sm text-slate-900">Từ vựng cốt lõi</h4>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">12 từ gốc</span>
                  </div>

                  {/*  Search Input  */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      value={stage3ArsenalSearch}
                      onChange={e => setStage3ArsenalSearch(e.target.value)}
                      placeholder="Tìm từ vựng..."
                      className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-mono transition-all"
                    />
                  </div>

                  {/*  Arsenal List  */}
                  <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
                    {essay.wordArsenal
                      .filter(item => {
                        if (!stage3ArsenalSearch.trim()) return true;
                        return (
                          item.root.toLowerCase().includes(stage3ArsenalSearch.toLowerCase()) ||
                          item.vi.toLowerCase().includes(stage3ArsenalSearch.toLowerCase())
                        );
                      })
                      .map(item => (
                        <div
                          key={item.root}
                          onClick={() => {
                            // Find target blank
                            let targetBlank: EssayBlank | undefined = undefined;
                            if (stage3ActiveBlankId) {
                              targetBlank = essay.blanks.find(b => b.id === stage3ActiveBlankId);
                            }
                            if (!targetBlank || targetBlank.rootWord.toLowerCase() !== item.root.toLowerCase()) {
                              targetBlank = essay.blanks.find(b => b.rootWord.toLowerCase() === item.root.toLowerCase() && !stage3ForgedBlanks[b.id]);
                            }
                            if (!targetBlank) {
                              targetBlank = essay.blanks.find(b => b.rootWord.toLowerCase() === item.root.toLowerCase());
                            }
                            if (targetBlank) {
                              openMorphologyForBlank(targetBlank.id);
                            }
                          }}
                          className="border border-slate-200 rounded-xl p-2.5 cursor-pointer hover:border-amber-400 hover:shadow-sm transition-all flex items-center justify-between text-xs group bg-white"
                        >
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                                {item.root}
                              </span>
                              <span className="font-mono text-[10px] text-slate-400">({item.pos})</span>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-0.5">{item.vi}</p>
                          </div>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200">
                            {item.cat}
                          </span>
                        </div>
                      ))}
                  </div>

                </div>
              </div>

            </div>
          </section>
        )}

      </main>

      {/* ================= MODAL: MORPHOLOGY DIAL (LÒ RÈN BIẾN THỂ) ================= */}
      {stage3DialOpen && stage3ActiveBlankId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
          {(() => {
            const blank = essay.blanks.find(b => b.id === stage3ActiveBlankId);
            if (!blank) return null;

            return (
              <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-300 space-y-5">
                {/*  Modal Header  */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-sm">
                      <Hammer className="w-4.5 h-4.5" />
                    </span>
                    <h4 className="font-bold text-base sm:text-lg text-slate-900 font-mono tracking-tight">
                      LÒ RÈN BIẾN THỂ (MORPHOLOGY DIAL)
                    </h4>
                  </div>
                  <button
                    onClick={() => setStage3DialOpen(false)}
                    className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/*  Context Box  */}
                <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2.5">
                      <span className="text-slate-500 font-medium">Ô mục tiêu:</span>
                      <span className="font-mono font-bold text-indigo-700 bg-white px-2.5 py-0.5 rounded-lg border border-slate-200 text-sm">
                        Ô số [ {blank.num} ]
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 font-medium">Từ gốc:</span>
                      <span className="font-mono font-bold text-slate-900 bg-white px-2.5 py-0.5 rounded-lg border border-slate-200 text-sm">
                        {blank.rootWord}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm text-amber-900 flex items-start gap-1.5 pt-1.5 border-t border-amber-200/60 font-medium">
                    <Compass className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span className="leading-snug">{blank.grammarClue}</span>
                  </div>
                </div>

                {/*  3 Options  */}
                <div className="space-y-3">
                  <p className="text-xs font-mono uppercase text-slate-500 font-bold tracking-wider">
                    CHỌN DẠNG TỪ PHÙ HỢP VỚI CÂU (PHÍM 1, 2, 3)
                  </p>
                  <div className="space-y-2.5">
                    {stage3ShuffledVariants.map((v, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectMorphologyVariant(blank, v)}
                        className="w-full text-left p-3.5 sm:p-4 rounded-xl border-2 border-slate-200 hover:border-amber-500 hover:bg-amber-50/50 flex items-center justify-between transition-all group shadow-sm bg-white"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-lg font-mono text-xs font-extrabold bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-amber-100 group-hover:text-amber-800 transition-colors border border-slate-200">
                            {idx + 1}
                          </span>
                          <span className="font-mono text-base sm:text-lg font-bold text-slate-900 group-hover:text-amber-900">
                            {v.form}
                          </span>
                          <span className="font-mono text-xs sm:text-sm text-slate-500 font-medium">({v.pos})</span>
                        </div>
                        <Hammer className="w-4 h-4 text-slate-300 group-hover:text-amber-600 transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>

                {/*  Footer  */}
                <div className="flex items-center justify-between text-xs font-mono text-slate-500 pt-2 border-t border-slate-200">
                  <span>Bấm [Esc] để đóng</span>
                  <span className="text-amber-700 font-semibold flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    Hàn dạng từ vào bài luận
                  </span>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ================= MODAL: LIVING LEXICON DECK (FLASHCARD LẬT 3D) ================= */}
      {lexiconModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-sm">
                  <Layers className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="font-bold text-base text-slate-900">LIVING LEXICON DECK</h3>
                  <span className="text-xs text-slate-500">Ngăn Ôn Tập Lặp Lại Ngắt Quãng</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                  {reviewQueue.length} từ cần ôn
                </span>
                <button
                  onClick={() => setLexiconModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/*  Card View  */}
            {reviewQueue.length === 0 ? (
              <div className="p-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="font-bold text-slate-800 text-base">Hàng đợi trống!</h4>
                <p className="text-xs text-slate-500">Bạn đã thành thạo toàn bộ từ vựng trong phiên học này.</p>
              </div>
            ) : (
              (() => {
                const wordKey = reviewQueue[currentCardIndex % reviewQueue.length];
                const entry: LexiconEntry = currentUnitData.lexicon_notes[wordKey] || {
                  word: wordKey,
                  ipa: `/${wordKey}/`,
                  pos: "vocabulary",
                  def_en: "Academic lexical item from Cambridge IELTS.",
                  def_vi: "Thuật ngữ học thuật cần ghi nhớ.",
                  collocations: `${wordKey} in academic contexts`,
                  example: `Students should master ${wordKey} for IELTS Writing Task 2.`,
                  ielts_tip: "Ghi điểm cao tiêu chí Lexical Resource."
                };

                return (
                  <div
                    onClick={() => setCardFlipped(f => !f)}
                    className="cursor-pointer min-h-[300px] rounded-2xl border border-slate-200 p-6 flex flex-col justify-between transition-all bg-slate-50 hover:bg-slate-100/70 select-none shadow-sm"
                  >
                    {!cardFlipped ? (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded font-mono text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                            {entry.pos.toUpperCase()}
                          </span>
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              speakWord(entry.word);
                            }}
                            className="w-8 h-8 rounded-full bg-white hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 flex items-center justify-center shadow-sm"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="text-center space-y-2 py-6">
                          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{entry.word}</h2>
                          <p className="font-mono text-sm text-slate-500">{entry.ipa}</p>
                        </div>

                        <div className="text-center text-[11px] text-slate-400 font-mono">
                          Chạm vào thẻ hoặc bấm [Space] để lật xem định nghĩa
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                          <span className="text-[11px] font-mono text-amber-700 font-bold uppercase">ĐỊNH NGHĨA & TIẾNG VIỆT</span>
                          <span className="font-mono text-xs text-slate-500">{entry.word}</span>
                        </div>

                        <div className="space-y-3 text-xs leading-relaxed py-2">
                          <div>
                            <span className="text-slate-400 block text-[10px] uppercase font-mono">Định nghĩa tiếng Anh:</span>
                            <p className="text-slate-800 font-medium">{entry.def_en}</p>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px] uppercase font-mono">Nghĩa tiếng Việt:</span>
                            <p className="text-amber-800 font-semibold text-sm">{entry.def_vi}</p>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px] uppercase font-mono">Ví dụ ngữ cảnh:</span>
                            <p className="text-slate-600 italic">"{entry.example}"</p>
                          </div>
                        </div>

                        <div className="border-t border-slate-200 pt-2 flex items-center justify-between text-[11px] font-mono text-slate-400">
                          <span className="truncate max-w-[280px]">Collocation: {entry.collocations}</span>
                          <span className="text-indigo-600 font-semibold">[Space] lật lại</span>
                        </div>
                      </>
                    )}
                  </div>
                );
              })()
            )}

            {/*  Controls  */}
            {reviewQueue.length > 0 && (
              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => {
                    setCurrentCardIndex(i => (i - 1 + reviewQueue.length) % reviewQueue.length);
                    setCardFlipped(false);
                  }}
                  className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2 flex-1">
                  <button
                    onClick={() => {
                      audioSynth.playSuccess();
                      setReviewQueue(q => q.filter((_, idx) => idx !== currentCardIndex % q.length));
                      setCardFlipped(false);
                    }}
                    className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Đã Nhớ (Xóa)</span>
                  </button>
                  <button
                    onClick={() => {
                      audioSynth.playClick();
                      setCurrentCardIndex(i => (i + 1) % reviewQueue.length);
                      setCardFlipped(false);
                    }}
                    className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Luyện Lại Sau</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    setCurrentCardIndex(i => (i + 1) % reviewQueue.length);
                    setCardFlipped(false);
                  }}
                  className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= MODAL: KEYBOARD GUIDE ================= */}
      {keyboardModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex items-center gap-2">
                <Keyboard className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-900 text-base">Phím Tắt Bàn Phím</h3>
              </div>
              <button onClick={() => setKeyboardModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-700">Chọn phương án / Mảnh ghép / Biến thể</span>
                <div className="space-x-1">
                  <kbd className="px-2 py-0.5 bg-white border border-slate-300 rounded font-mono font-bold">1</kbd>
                  <kbd className="px-2 py-0.5 bg-white border border-slate-300 rounded font-mono font-bold">2</kbd>
                  <kbd className="px-2 py-0.5 bg-white border border-slate-300 rounded font-mono font-bold">3</kbd>
                  <kbd className="px-2 py-0.5 bg-white border border-slate-300 rounded font-mono font-bold">4</kbd>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-700">Lật thẻ Flashcard / Chuyển tiếp</span>
                <kbd className="px-2 py-0.5 bg-white border border-slate-300 rounded font-mono font-bold">Space</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-700">Chuyển sang câu / mốc tiếp theo</span>
                <kbd className="px-2 py-0.5 bg-white border border-slate-300 rounded font-mono font-bold">Tab / Enter</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-700">Đóng popover / Lò rèn / Hộp thoại</span>
                <kbd className="px-2 py-0.5 bg-white border border-slate-300 rounded font-mono font-bold">Esc</kbd>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setKeyboardModalOpen(false)}
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-sm transition-colors"
              >
                Đã Hiểu
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
