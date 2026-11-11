/**
 * ARENA SOLO PLAY PAGE (/arena/solo)
 * Đấu Trường Đơn Cấp Tốc - Trải nghiệm thi đấu phản xạ IELTS mượt mà, độc lập 100%.
 * Không cần mã PIN, không cần chờ phòng, không phụ thuộc kết nối bên ngoài.
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { StudentAnswerCard } from '@/components/arena/StudentAnswerCard';
import { ArenaIncenseTimer } from '@/components/arena/ArenaIncenseTimer';
import { PvZCardAvatar } from '@/components/arena/PvZCardAvatar';
import { CHARACTER_AVATARS, getCharacterBySeed } from '@/lib/arena/characterCatalog';
import { useArenaAudio } from '@/hooks/arena/useArenaAudio';
import { QuestionTypeRevengeModal, RevengeQuestionItem } from '@/components/arena/QuestionTypeRevengeModal';
import { RAW_ARENA_COLLOCATION_QUESTIONS, shuffleQuestionOptions, ArenaQuestion } from '@/lib/arena/questions';
import { useToast } from '@/hooks/use-toast';
import { 
  Trophy, 
  Flame, 
  Zap, 
  ArrowRight, 
  RotateCcw, 
  Share2, 
  BookOpen, 
  Home, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Volume2, 
  VolumeX,
  Clock,
  Award
} from 'lucide-react';

type SoloStage = 'COUNTDOWN' | 'PLAYING' | 'REVEAL' | 'PODIUM';

export default function ArenaSoloPlayPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  const rawNickname = searchParams.get('name') || (typeof window !== 'undefined' ? sessionStorage.getItem('arena_solo_name') : '') || 'Chiến Binh IELTS';
  const rawAvatarId = searchParams.get('avatarId') || (typeof window !== 'undefined' ? sessionStorage.getItem('arena_solo_avatar') : null);
  
  const nickname = rawNickname.trim() || 'Chiến Binh IELTS';
  const avatarId = rawAvatarId !== null && !isNaN(Number(rawAvatarId))
    ? Number(rawAvatarId)
    : getCharacterBySeed(nickname).id;
  const character = CHARACTER_AVATARS[avatarId] || getCharacterBySeed(nickname);

  // Bộ câu hỏi cho trận đấu (10 câu xáo trộn)
  const [questions, setQuestions] = useState<ArenaQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stage, setStage] = useState<SoloStage>('COUNTDOWN');
  const [countdownNum, setCountdownNum] = useState(3);

  // Gameplay state
  const [timeLeft, setTimeLeft] = useState(15);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [roundEarnedScore, setRoundEarnedScore] = useState(0);
  const [isRoundCorrect, setIsRoundCorrect] = useState(false);
  const [wrongQuestions, setWrongQuestions] = useState<RevengeQuestionItem[]>([]);
  const [isRevengeOpen, setIsRevengeOpen] = useState(false);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [autoAdvanceSeconds, setAutoAdvanceSeconds] = useState(5);

  // Thống kê tốc độ
  const questionStartTimeRef = useRef<number>(Date.now());
  const responseTimesRef = useRef<number[]>([]);

  // Canvas pháo hoa
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Audio system
  const {
    playClickSound,
    playCorrectSound,
    playWrongSound,
    playStreakSound,
    playPodiumSound,
    playCountdownBeep,
    startQuestionSuspense,
    stopQuestionSuspense,
    isBgmEnabled,
    toggleBgm,
  } = useArenaAudio();

  // Khởi tạo và xáo trộn 10 câu hỏi ngẫu nhiên từ ngân hàng
  const initGameQuestions = useCallback(() => {
    const pool = [...RAW_ARENA_COLLOCATION_QUESTIONS];
    // Fisher-Yates shuffle
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    const chosen = pool.slice(0, 10).map((q, idx) =>
      shuffleQuestionOptions({ ...q, roundIndex: idx }, `solo_${Date.now()}_${q.id}_${idx}`)
    );
    setQuestions(chosen);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setWrongQuestions([]);
    setIsNewRecord(false);
    responseTimesRef.current = [];
  }, []);

  useEffect(() => {
    initGameQuestions();
  }, [initGameQuestions]);

  // Bộ đếm đếm ngược 3, 2, 1 trước khi bắt đầu
  useEffect(() => {
    if (stage !== 'COUNTDOWN') return;

    if (countdownNum > 0) {
      playCountdownBeep(countdownNum);
      const timer = setTimeout(() => {
        setCountdownNum((prev) => prev - 1);
      }, 900);
      return () => clearTimeout(timer);
    } else {
      setStage('PLAYING');
      setTimeLeft(15);
      setIsLocked(false);
      setSelectedOptionId(null);
      questionStartTimeRef.current = Date.now();
      startQuestionSuspense(15);
    }
  }, [stage, countdownNum, playCountdownBeep, startQuestionSuspense]);

  // Đếm ngược 15s cho từng câu hỏi
  useEffect(() => {
    if (stage !== 'PLAYING' || isLocked) return;

    if (timeLeft <= 0) {
      // Hết giờ -> Tự động chốt đáp án
      handleConfirmAnswer(selectedOptionId || undefined);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [stage, timeLeft, isLocked, selectedOptionId]);

  // Hệ số Streak
  const streakMultiplier = useMemo(() => {
    if (streak >= 4) return 2.0;
    if (streak === 3) return 1.5;
    if (streak === 2) return 1.2;
    return 1.0;
  }, [streak]);

  // Tính danh hiệu tổng kết
  const rankEvaluation = useMemo(() => {
    if (score >= 12000) return { title: '👑 ĐẠI KIỆN TƯỚNG IELTS 8.5+', badge: 'bg-amber-500/20 text-amber-300 border-amber-400' };
    if (score >= 9000) return { title: '⚔️ CHIẾN BINH PHẢN XẠ TINH ANH', badge: 'bg-purple-500/20 text-purple-300 border-purple-400' };
    if (score >= 6000) return { title: '🎯 CAO THỦ COLLOCATION', badge: 'bg-blue-500/20 text-blue-300 border-blue-400' };
    return { title: '🌱 TÂN BINH ĐẤU TRƯỜNG', badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-400' };
  }, [score]);

  // Tốc độ phản xạ trung bình
  const avgResponseTime = useMemo(() => {
    const list = responseTimesRef.current;
    if (!list.length) return '0.0';
    const sum = list.reduce((a, b) => a + b, 0);
    return (sum / list.length / 1000).toFixed(1);
  }, [stage]);

  // Xử lý nộp và chốt đáp án
  const handleConfirmAnswer = useCallback((chosenOptionId?: string) => {
    if (isLocked || stage !== 'PLAYING') return;
    setIsLocked(true);
    stopQuestionSuspense();

    const currentQ = questions[currentIndex];
    if (!currentQ) return;

    const answeredTime = Date.now() - questionStartTimeRef.current;
    responseTimesRef.current.push(answeredTime);

    const isCorrect = Boolean(chosenOptionId && chosenOptionId === currentQ.correctOptionId);
    setIsRoundCorrect(isCorrect);

    if (isCorrect) {
      playCorrectSound();
      const currentStreakNext = streak + 1;
      setStreak(currentStreakNext);
      setMaxStreak((prev) => Math.max(prev, currentStreakNext));

      if (currentStreakNext >= 2) {
        playStreakSound(currentStreakNext);
      }

      // Điểm cơ bản + Điểm thời gian còn lại x Hệ số streak
      const earned = Math.round((1000 + Math.max(0, timeLeft) * 20) * streakMultiplier);
      setRoundEarnedScore(earned);
      setScore((prev) => prev + earned);
    } else {
      playWrongSound();
      setStreak(0);
      setRoundEarnedScore(0);

      // Thêm vào danh sách câu sai
      const wrongItem: RevengeQuestionItem = {
        id: currentQ.id,
        prompt: currentQ.prompt,
        options: currentQ.options.map((o) => ({ id: o.id, label: o.label, text: o.text })),
        correctOptionId: currentQ.correctOptionId,
        correctAnswerText: currentQ.correctAnswerText,
        correctExplanation: currentQ.correctExplanation,
        selectedOptionId: chosenOptionId || null,
        isCorrect: false,
      };
      setWrongQuestions((prev) => [...prev, wrongItem]);
    }

    setStage('REVEAL');
    setAutoAdvanceSeconds(5);
  }, [
    isLocked, 
    stage, 
    questions, 
    currentIndex, 
    timeLeft, 
    streak, 
    streakMultiplier, 
    playCorrectSound, 
    playWrongSound, 
    playStreakSound, 
    stopQuestionSuspense
  ]);

  // Bộ đếm tự chuyển câu khi đang ở màn hình REVEAL
  useEffect(() => {
    if (stage !== 'REVEAL') return;

    if (autoAdvanceSeconds <= 0) {
      handleNextQuestion();
      return;
    }

    const timer = setInterval(() => {
      setAutoAdvanceSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [stage, autoAdvanceSeconds]);

  // Chuyển sang câu tiếp theo hoặc kết thúc ván
  const handleNextQuestion = useCallback(() => {
    playClickSound();
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setStage('PLAYING');
      setTimeLeft(15);
      setIsLocked(false);
      setSelectedOptionId(null);
      questionStartTimeRef.current = Date.now();
      startQuestionSuspense(15);
    } else {
      // Hết 10 câu -> Vào bục vinh danh Podium
      setStage('PODIUM');
      playPodiumSound();

      // Kiểm tra và lưu kỷ lục vào localStorage
      if (typeof window !== 'undefined') {
        const prevHigh = Number(localStorage.getItem('arena_solo_high_score') || 0);
        if (score > prevHigh) {
          setIsNewRecord(true);
          localStorage.setItem('arena_solo_high_score', String(score));
        }
        const prevMaxStreak = Number(localStorage.getItem('arena_solo_max_streak') || 0);
        if (maxStreak > prevMaxStreak) {
          localStorage.setItem('arena_solo_max_streak', String(maxStreak));
        }
        const gamesPlayed = Number(localStorage.getItem('arena_solo_games_played') || 0) + 1;
        localStorage.setItem('arena_solo_games_played', String(gamesPlayed));
      }
    }
  }, [
    currentIndex, 
    questions.length, 
    score, 
    maxStreak, 
    playClickSound, 
    playPodiumSound, 
    startQuestionSuspense
  ]);

  // Pháo hoa Confetti Canvas khi vào Podium
  useEffect(() => {
    if (stage !== 'PODIUM') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const colors = ['#f59e0b', '#ec4899', '#8b5cf6', '#10b981', '#3b82f6', '#ef4444', '#fbbf24'];
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      rotation: number;
      vr: number;
      alpha: number;
    }> = [];

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 80,
        y: canvas.height * 0.4,
        vx: (Math.random() - 0.5) * 12,
        vy: -Math.random() * 10 - 4,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vr: (Math.random() - 0.5) * 8,
        alpha: 1,
      });
    }

    let animId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = 0;
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.22; // Trọng lực
        p.rotation += p.vr;
        p.alpha -= 0.005;

        if (p.alpha > 0) {
          alive++;
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
          ctx.restore();
        }
      });

      if (alive > 0) {
        animId = requestAnimationFrame(render);
      }
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [stage]);

  // Sao chép link thách đấu bạn bè
  const handleShareChallenge = () => {
    playClickSound();
    const shareUrl = `${window.location.origin}/arena`;
    const shareText = `🔥 Mình vừa đạt ${score.toLocaleString()} điểm tại Đấu Trường Phản Xạ NextBand Arena! Đố bạn vượt qua được kỷ lục của mình: ${shareUrl}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText).then(() => {
        toast({
          title: '✅ Đã sao chép link thách đấu!',
          description: 'Gửi link này cho bạn bè qua Zalo hoặc Messenger để cùng so tài nhé!',
        });
      }).catch(() => {
        toast({
          title: 'Link Đấu Trường',
          description: shareUrl,
        });
      });
    }
  };

  // Chơi lại ván mới
  const handlePlayAgain = () => {
    playClickSound();
    initGameQuestions();
    setCountdownNum(3);
    setStage('COUNTDOWN');
  };

  const currentQ = questions[currentIndex];

  return (
    <div className="min-h-screen min-h-[100dvh] bg-[#150a33] text-white flex flex-col font-sans select-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2a135e] via-[#150a33] to-[#0a051b]">
      {/* Top Header Bar */}
      <header className="w-full max-w-4xl mx-auto px-4 py-3 flex items-center justify-between border-b border-purple-500/20 shrink-0">
        <Link 
          to="/arena"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-amber-400 hover:text-amber-300 transition"
        >
          <Home className="w-4 h-4" />
          <span className="hidden sm:inline">Sảnh Đấu Trường</span>
        </Link>

        {/* Brand & Round Counter */}
        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-xs font-mono font-bold">
            CÂU {currentIndex + 1} / {questions.length || 10}
          </span>
          {streak >= 2 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-black shadow-md animate-pulse">
              <Flame className="w-3.5 h-3.5" /> STREAK x{streakMultiplier}
            </span>
          )}
        </div>

        {/* Audio Toggle & Player Info */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={toggleBgm}
            title={isBgmEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
            className="p-1.5 rounded-xl bg-purple-900/60 border border-purple-400/30 text-purple-200 hover:text-white transition cursor-pointer"
          >
            {isBgmEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>
          <div className="flex items-center gap-2 bg-purple-950/60 px-2.5 py-1 rounded-xl border border-purple-700/50">
            <PvZCardAvatar avatarId={avatarId} seed={avatarId} size="sm" />
            <span className="text-xs font-bold text-slate-200 max-w-[90px] truncate hidden sm:inline">
              {nickname}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-3 flex flex-col justify-center relative">
        {/* ============================================================ */}
        {/* STAGE 1: COUNTDOWN BEFORE ROUND                               */}
        {/* ============================================================ */}
        {stage === 'COUNTDOWN' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 bg-purple-500/10 rounded-full border-2 border-purple-400/40 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
              <PvZCardAvatar avatarId={avatarId} seed={avatarId} size="lg" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-black text-white">SẴN SÀNG THI ĐẤU!</h2>
              <p className="text-xs sm:text-sm text-purple-200">
                10 câu hỏi IELTS Collocation • 15 giây mỗi câu
              </p>
            </div>
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center shadow-[0_0_40px_rgba(249,115,22,0.6)] animate-bounce">
              <span className="text-5xl sm:text-6xl font-black font-mono text-purple-950">
                {countdownNum}
              </span>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STAGE 2: QUESTION LIVE & PLAYING                              */}
        {/* ============================================================ */}
        {stage === 'PLAYING' && currentQ && (
          <div className="flex-1 flex flex-col justify-between space-y-3.5 py-1 animate-in fade-in duration-200">
            {/* Top Score & Incense Timer */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono font-bold px-1">
                <span className="text-amber-400 flex items-center gap-1.5">
                  <Trophy className="w-4 h-4" /> ĐIỂM: {score.toLocaleString()}
                </span>
                <span className="text-purple-300">
                  {15 - timeLeft}s đã trôi qua
                </span>
              </div>
              <ArenaIncenseTimer timeLeftSeconds={timeLeft} totalTimeSeconds={15} />
            </div>

            {/* Question Prompt Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-purple-900/60 to-purple-950/80 border-2 border-purple-500/40 shadow-lg text-center space-y-2 min-h-[110px] sm:min-h-[125px] flex flex-col justify-center items-center">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-[11px] font-bold">
                <Sparkles className="w-3.5 h-3.5" /> IELTS Collocation & Lexical Resource
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-black text-white leading-relaxed">
                {currentQ.prompt}
              </h3>
            </div>

            {/* Answer Options (A/B/C/D) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {currentQ.options.map((option) => (
                <StudentAnswerCard
                  key={option.id}
                  option={option}
                  isSelected={selectedOptionId === option.id}
                  isConfirmed={isLocked && selectedOptionId === option.id}
                  isLocked={isLocked}
                  onSelect={(optId) => {
                    playClickSound();
                    setSelectedOptionId(optId);
                  }}
                />
              ))}
            </div>

            {/* Bottom Confirm Button */}
            <div className="pt-2">
              <button
                type="button"
                disabled={!selectedOptionId || isLocked}
                onClick={() => handleConfirmAnswer(selectedOptionId || undefined)}
                className={`w-full py-3.5 px-6 rounded-2xl font-black text-sm uppercase tracking-wider transition-all duration-150 flex items-center justify-center gap-2 select-none shadow-lg ${
                  selectedOptionId && !isLocked
                    ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-purple-950 hover:from-amber-300 hover:to-orange-400 shadow-[0_4px_0_0_#9a3412] active:translate-y-1 active:shadow-none cursor-pointer'
                    : 'bg-purple-900/40 text-purple-300/50 border border-purple-800/40 cursor-not-allowed'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>{selectedOptionId ? 'XÁC NHẬN ĐÁP ÁN' : 'CHỌN 1 ĐÁP ÁN PHÍA TRÊN'}</span>
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STAGE 3: ROUND REVEAL & MISCONCEPTION DIAGNOSTIC              */}
        {/* ============================================================ */}
        {stage === 'REVEAL' && currentQ && (
          <div className="flex-1 flex flex-col justify-between space-y-4 py-2 animate-in fade-in zoom-in-95 duration-200">
            {/* Outcome Banner */}
            <div
              className={`p-4 rounded-2xl border-2 flex items-center justify-between shadow-xl ${
                isRoundCorrect
                  ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200 shadow-[0_0_25px_rgba(16,185,129,0.2)]'
                  : 'bg-rose-950/80 border-rose-400 text-rose-200 shadow-[0_0_25px_rgba(244,63,94,0.2)]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-black shrink-0 ${
                    isRoundCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                  }`}
                >
                  {isRoundCorrect ? <CheckCircle2 className="w-7 h-7" /> : <XCircle className="w-7 h-7" />}
                </div>
                <div>
                  <h3 className="text-lg font-black tracking-tight text-white">
                    {isRoundCorrect ? 'XUẤT SẮC! CHÍNH XÁC' : 'CHƯA CHÍNH XÁC!'}
                  </h3>
                  <p className="text-xs font-semibold">
                    {isRoundCorrect
                      ? `+${roundEarnedScore.toLocaleString()} điểm • Streak x${streakMultiplier}`
                      : 'Đừng nản lòng, hãy xem bẫy tư duy dưới đây!'}
                  </p>
                </div>
              </div>
              <div className="text-right font-mono font-black text-amber-400 text-sm">
                Tổng: {score.toLocaleString()}đ
              </div>
            </div>

            {/* Correct Answer & Misconception Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-purple-950/70 border border-purple-500/40 space-y-3.5 shadow-inner">
              {/* Correct Answer Display */}
              <div className="flex items-start gap-2.5 text-xs sm:text-sm">
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-black shrink-0 border border-emerald-500/40">
                  ĐÁP ÁN ĐÚNG
                </span>
                <span className="font-bold text-white leading-relaxed">
                  {currentQ.correctAnswerText}
                </span>
              </div>

              {/* Standard Explanation */}
              <p className="text-xs text-slate-300 leading-relaxed bg-black/30 p-2.5 rounded-xl border border-white/5">
                {currentQ.correctExplanation}
              </p>

              {/* Misconception Diagnostic Box */}
              {currentQ.misconception && (
                <div className="p-3 sm:p-3.5 rounded-xl bg-gradient-to-br from-amber-950/60 to-purple-950/80 border border-amber-500/50 space-y-1.5 text-left">
                  <div className="flex items-center gap-1.5 text-amber-300 font-black text-xs">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>CHẨN ĐOÁN BẪY: {currentQ.misconception.diagnosticTitle}</span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-amber-100/90 leading-relaxed">
                    {currentQ.misconception.explanation}
                  </p>
                </div>
              )}
            </div>

            {/* Next Question Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleNextQuestion}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-sm uppercase tracking-wider shadow-[0_4px_0_0_#3b0764] active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 cursor-pointer transition select-none"
              >
                <span>{currentIndex + 1 < questions.length ? 'CÂU TIẾP THEO' : 'XEM KẾT QUẢ VINH DANH'}</span>
                <ArrowRight className="w-4 h-4" />
                <span className="text-xs text-purple-200 font-normal">({autoAdvanceSeconds}s)</span>
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STAGE 4: PODIUM VICTORY & SUMMARY                             */}
        {/* ============================================================ */}
        {stage === 'PODIUM' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-3 animate-in fade-in zoom-in-95 duration-300 relative z-10">
            {/* Canvas Confetti */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

            {/* Avatar on Podium */}
            <div className="relative z-10">
              <div className="p-4 bg-purple-500/10 rounded-full border-2 border-amber-400/80 shadow-[0_0_40px_rgba(251,191,36,0.4)]">
                <PvZCardAvatar avatarId={avatarId} seed={avatarId} size="lg" />
              </div>
              <div className="absolute -top-2 -right-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-purple-950 font-black text-xs shadow-lg border border-amber-200">
                👑 QUÁN QUÂN
              </div>
            </div>

            {/* Title & Rank Badge */}
            <div className="space-y-1.5 z-10">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                TRẬN ĐẤU HOÀN TẤT!
              </h2>
              <div className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black border ${rankEvaluation.badge}`}>
                <Award className="w-3.5 h-3.5" />
                <span>{rankEvaluation.title}</span>
              </div>
            </div>

            {/* Performance Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full max-w-lg z-10 text-left">
              {/* Total Score */}
              <div className="p-3 rounded-2xl bg-purple-950/70 border border-purple-500/40 relative overflow-hidden">
                <span className="text-[10px] font-bold text-purple-300 uppercase block">Tổng điểm</span>
                <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono">
                  {score.toLocaleString()}
                </span>
                {isNewRecord && (
                  <span className="absolute top-2 right-2 text-[9px] font-black px-1.5 py-0.5 rounded bg-emerald-500 text-white animate-pulse">
                    KỶ LỤC!
                  </span>
                )}
              </div>

              {/* Accuracy */}
              <div className="p-3 rounded-2xl bg-purple-950/70 border border-purple-500/40">
                <span className="text-[10px] font-bold text-purple-300 uppercase block">Độ chính xác</span>
                <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
                  {questions.length - wrongQuestions.length}/{questions.length}
                </span>
              </div>

              {/* Max Streak */}
              <div className="p-3 rounded-2xl bg-purple-950/70 border border-purple-500/40">
                <span className="text-[10px] font-bold text-purple-300 uppercase block">Streak kỷ lục</span>
                <span className="text-xl sm:text-2xl font-black text-orange-400 font-mono flex items-center gap-1">
                  <Flame className="w-5 h-5 text-orange-500" /> {maxStreak}
                </span>
              </div>

              {/* Avg Speed */}
              <div className="p-3 rounded-2xl bg-purple-950/70 border border-purple-500/40">
                <span className="text-[10px] font-bold text-purple-300 uppercase block">Tốc độ TB</span>
                <span className="text-xl sm:text-2xl font-black text-sky-400 font-mono flex items-center gap-1">
                  <Clock className="w-4 h-4 text-sky-400" /> {avgResponseTime}s
                </span>
              </div>
            </div>

            {/* Action Buttons Grid */}
            <div className="w-full max-w-lg space-y-2.5 z-10 pt-2">
              {/* Revenge Notebook Button (Only when there are wrong questions) */}
              {wrongQuestions.length > 0 && (
                <button
                  type="button"
                  onClick={() => setIsRevengeOpen(true)}
                  className="w-full py-3 px-4 rounded-2xl bg-purple-600/40 hover:bg-purple-600/60 border-2 border-purple-400/60 text-purple-100 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer transition"
                >
                  <BookOpen className="w-4 h-4 text-purple-300" />
                  <span>SỔ TAY ÔN LUYỆN ({wrongQuestions.length} CÂU SAI VỪA LÀM)</span>
                </button>
              )}

              {/* Share Challenge & Play Again in 2 Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handleShareChallenge}
                  className="py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-purple-950 font-black text-xs sm:text-sm shadow-[0_4px_0_0_#9a3412] active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 cursor-pointer transition select-none"
                >
                  <Share2 className="w-4 h-4" />
                  <span>THÁCH ĐẤU BẠN BÈ</span>
                </button>

                <button
                  type="button"
                  onClick={handlePlayAgain}
                  className="py-3 px-4 rounded-2xl bg-purple-700 hover:bg-purple-600 text-white font-black text-xs sm:text-sm shadow-[0_4px_0_0_#4c1d95] active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 cursor-pointer transition select-none"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>CHƠI LẠI VÁN MỚI</span>
                </button>
              </div>

              {/* Back to Arena Hub */}
              <Link
                to="/arena"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white pt-1 transition"
              >
                <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                <span>Quay lại Sảnh Đấu Trường</span>
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* Revenge Modal for Wrong Questions */}
      <QuestionTypeRevengeModal
        isOpen={isRevengeOpen}
        onClose={() => setIsRevengeOpen(false)}
        wrongQuestions={wrongQuestions}
        allQuestionsCount={questions.length}
      />
    </div>
  );
}
