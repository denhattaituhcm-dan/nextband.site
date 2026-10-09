import React, { useState, useEffect, useRef, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { cambridgeApi } from "@/lib/api";
import {
  Clock,
  Volume2,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Play,
  Pause,
  BookOpen,
  PenTool,
  HelpCircle,
  Send,
  Loader2,
  Lock,
  VolumeX,
  RefreshCw,
  LogOut,
  Sparkles,
  Headphones,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type SectionType = "use_of_english" | "reading" | "listening" | "writing";

export default function CambridgeStudentExam() {
  const { testCode } = useParams<{ testCode: string }>();
  const navigate = useNavigate();

  // Load session & content
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["studentCambridgeExam", testCode],
    queryFn: () => cambridgeApi.getStudentSession(testCode!),
    enabled: !!testCode,
    refetchOnWindowFocus: false,
  });

  const session = data?.data?.session;
  const content = data?.data?.content;

  // Active section
  const [currentSection, setCurrentSection] = useState<SectionType>("use_of_english");
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("saved");

  // Audio control
  const [audioPlays, setAudioPlays] = useState<Record<string, number>>({});
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null);
  const [currentAudioId, setCurrentAudioId] = useState<string | null>(null);
  const [audioProgress, setAudioProgress] = useState(0); // 0 to 100
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [audioVolume, setAudioVolume] = useState(1);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Timer: 60 minutes countdown (3600 seconds)
  const [remainingSeconds, setRemainingSeconds] = useState(3600);

  // Modals & States
  const [isGateChecking, setIsGateChecking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [isExitDialogOpen, setIsExitDialogOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Sync loaded answers
  useEffect(() => {
    if (session?.answers) {
      setAnswers(session.answers);
    }
    if (session?.status === "SUBMITTED") {
      setIsCompleted(true);
    }
  }, [session]);

  // Autosave answers debounced
  useEffect(() => {
    if (!testCode || Object.keys(answers).length === 0 || isCompleted) return;

    setSaveStatus("saving");
    const timer = setTimeout(() => {
      cambridgeApi
        .saveAnswers(testCode, answers)
        .then(() => setSaveStatus("saved"))
        .catch((err) => {
          console.warn("Autosave answers warning:", err);
          setSaveStatus("error");
        });
    }, 1200);

    return () => clearTimeout(timer);
  }, [answers, testCode, isCompleted]);

  // Countdown timer effect
  useEffect(() => {
    if (isCompleted) return;
    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isCompleted]);

  const formattedTime = useMemo(() => {
    const m = Math.floor(remainingSeconds / 60);
    const s = remainingSeconds % 60;
    return `${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
  }, [remainingSeconds]);

  const isUrgent = remainingSeconds < 300; // < 5 mins

  // Items per skill
  const sectionItems = useMemo(() => {
    return (content?.items || []).filter((i: any) => i.skill === currentSection);
  }, [content, currentSection]);

  // Skill completion stats
  const skillCounts = useMemo(() => {
    const counts: Record<SectionType, { answered: number; total: number }> = {
      use_of_english: { answered: 0, total: 0 },
      reading: { answered: 0, total: 0 },
      listening: { answered: 0, total: 0 },
      writing: { answered: 0, total: session?.extensionAllowed ? 3 : 2 },
    };

    if (content?.items) {
      content.items.forEach((it: any) => {
        const skill = it.skill as SectionType;
        if (counts[skill]) {
          counts[skill].total += 1;
          const val = answers[it.id];
          if (val !== undefined && val !== null && String(val).trim() !== "") {
            counts[skill].answered += 1;
          }
        }
      });
    }

    // Writing count
    let writingAns = 0;
    if (answers["W1"] && String(answers["W1"]).trim()) writingAns++;
    if (answers["W2"] && String(answers["W2"]).trim()) writingAns++;
    if (session?.extensionAllowed && answers["W3"] && String(answers["W3"]).trim()) writingAns++;
    counts.writing.answered = writingAns;

    return counts;
  }, [content, answers, session?.extensionAllowed]);

  // Play audio handler
  const handlePlayAudio = (audioId: string) => {
    const plays = audioPlays[audioId] || 0;
    if (plays >= 2) {
      alert("Con đã nghe tối đa 2 lần cho phần thi này rồi nhé.");
      return;
    }

    const audioUrl = cambridgeApi.getAudioUrl(audioId);
    if (currentAudioUrl !== audioUrl) {
      setCurrentAudioUrl(audioUrl);
      setCurrentAudioId(audioId);
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play().catch((e) => console.warn("Audio play error:", e));
        setIsPlayingAudio(true);
        setAudioPlays({ ...audioPlays, [audioId]: plays + 1 });
      }
    } else {
      if (audioRef.current) {
        if (isPlayingAudio) {
          audioRef.current.pause();
          setIsPlayingAudio(false);
        } else {
          audioRef.current.play().catch((e) => console.warn("Audio play error:", e));
          setIsPlayingAudio(true);
        }
      }
    }
  };

  const handleAudioTimeUpdate = () => {
    if (audioRef.current) {
      const cur = audioRef.current.currentTime || 0;
      const dur = audioRef.current.duration || 1;
      setAudioCurrentTime(cur);
      setAudioDuration(dur);
      setAudioProgress(Math.min(100, Math.round((cur / dur) * 100)));
    }
  };

  const formatAudioTime = (sec: number) => {
    if (!sec || isNaN(sec)) return "00:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const toggleMuteAudio = () => {
    if (!audioRef.current) return;
    if (isAudioMuted) {
      audioRef.current.muted = false;
      audioRef.current.volume = audioVolume || 0.8;
      setIsAudioMuted(false);
    } else {
      audioRef.current.muted = true;
      setIsAudioMuted(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setAudioVolume(val);
    setIsAudioMuted(val === 0);
    if (audioRef.current) {
      audioRef.current.volume = val;
      audioRef.current.muted = val === 0;
    }
  };

  // Submit Core -> Check Gate
  const handleCompleteCore = async () => {
    if (!testCode) return;
    setIsGateChecking(true);
    try {
      await cambridgeApi.saveAnswers(testCode, answers);
      const res = await cambridgeApi.evaluateGate(testCode);
      const isPassed = Boolean(res?.data?.gatePassed || res?.data?.extensionAllowed);
      await refetch();

      if (isPassed) {
        alert("Chúc mừng con! Con đã hoàn thành xuất sắc phần Core và được mở khóa phần Mở rộng (Extension). Hãy tiếp tục làm bài nhé!");
        setCurrentSection("use_of_english");
      } else {
        await cambridgeApi.submitTest(testCode, answers);
        setIsCompleted(true);
      }
    } catch (err: any) {
      alert("Đã xảy ra lỗi khi hoàn thành phần thi: " + err.message);
    } finally {
      setIsGateChecking(false);
    }
  };

  // Final Submit
  const handleFinalSubmit = async () => {
    if (!testCode) return;
    setIsSubmitting(true);
    try {
      await cambridgeApi.submitTest(testCode, answers);
      setIsCompleted(true);
      setIsSubmitDialogOpen(false);
    } catch (err: any) {
      alert("Lỗi khi nộp bài: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Scroll to question
  const scrollToQuestion = (itemId: string) => {
    const el = document.getElementById(`item-${itemId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/20 flex flex-col items-center justify-center text-foreground p-6">
        <Loader2 className="w-10 h-10 animate-spin text-brand-blue mb-4" />
        <h2 className="text-xl font-black tracking-tight text-foreground">Đang chuẩn bị đề thi Cambridge...</h2>
        <p className="text-xs text-muted-foreground mt-1 font-medium">Đang đồng bộ dữ liệu bài làm và tài nguyên khảo thí</p>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="min-h-screen bg-muted/20 flex flex-col items-center justify-center text-foreground p-6 text-center">
        <div className="w-16 h-16 rounded-3xl bg-destructive/10 text-destructive flex items-center justify-center mb-4 shadow-sm">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-black text-foreground">Không Thể Truy Cập Bài Thi</h2>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-sm">
          {(error as any)?.message || "Mã bài thi không tồn tại hoặc phiên thi đã kết thúc."}
        </p>
        <Button onClick={() => navigate("/")} className="mt-6 rounded-xl font-bold text-xs bg-brand-red text-white shadow-md">
          Về trang chủ
        </Button>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-muted/20 flex flex-col items-center justify-center text-foreground p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-500/15 border-2 border-emerald-500 text-emerald-600 flex items-center justify-center mb-4 shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-foreground">Con Đã Hoàn Thành Bài Khảo Thí!</h2>
        <p className="text-sm text-muted-foreground max-w-md mt-2 leading-relaxed">
          Cảm ơn <strong className="text-foreground">{session.candidateName}</strong> đã nỗ lực làm bài. Giáo viên chuyên môn sẽ gặp con để thực hiện phần Nói (Speaking) và gửi báo cáo kết quả chi tiết nhé!
        </p>
        <div className="mt-6 bg-card border border-border p-4 rounded-2xl text-xs font-mono text-muted-foreground shadow-sm">
          Mã bài thi: <span className="text-brand-blue font-bold">{session.testCode}</span>
        </div>
        <Button onClick={() => navigate("/")} className="mt-6 rounded-xl font-bold text-xs bg-brand-blue hover:bg-brand-blue/90 text-white shadow-md">
          Quay lại Trang Chủ
        </Button>
      </div>
    );
  }

  const tabs: Array<{ id: SectionType; label: string; duration: string; icon: any }> = [
    { id: "use_of_english", label: "Use of English", duration: "~15p", icon: Sparkles },
    { id: "reading", label: "Reading", duration: "~15p", icon: BookOpen },
    { id: "listening", label: "Listening", duration: "~15p", icon: Headphones },
    { id: "writing", label: "Writing", duration: "~20p", icon: PenTool },
  ];

  return (
    <div className="min-h-screen bg-muted/20 text-foreground flex flex-col font-sans select-none pb-24">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        onEnded={() => {
          setIsPlayingAudio(false);
          setAudioProgress(100);
        }}
        onTimeUpdate={handleAudioTimeUpdate}
        onLoadedMetadata={handleAudioTimeUpdate}
        className="hidden"
      />

      {/* TOP HEADER BAR (ARIS IELTS STANDARD) */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border shadow-xs shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
          {/* Left: Branding & Candidate Badge */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-brand-red flex items-center justify-center text-white font-black text-sm shadow-sm shrink-0">
              CPT
            </div>
            <div className="hidden sm:block min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-foreground truncate">{session.candidateName}</span>
                <Badge variant="outline" className="text-[10px] bg-brand-red-soft text-brand-red border-brand-red/20 font-bold px-1.5 py-0">
                  {session.candidateGrade ? `Khối ${session.candidateGrade}` : "Cambridge Test"}
                </Badge>
              </div>
              <p className="text-[10px] text-muted-foreground leading-tight">
                Mã đề: <span className="font-mono font-semibold">{session.testCode}</span>
              </p>
            </div>
          </div>

          {/* Center: Countdown Timer Widget */}
          <div
            className={cn(
              "flex items-center gap-2 px-4 py-1.5 rounded-full border-2 transition-all shadow-sm",
              isUrgent
                ? "bg-red-500/15 border-red-500 text-red-600 animate-pulse font-black shadow-red-500/20"
                : "bg-brand-blue/10 border-brand-blue/35 text-brand-blue font-black ring-2 ring-brand-blue/10",
            )}
          >
            <Clock className={cn("w-4 h-4 shrink-0", isUrgent ? "text-red-600 animate-bounce" : "text-brand-blue")} />
            <span className="text-sm sm:text-base font-mono font-black tracking-widest">{formattedTime}</span>
          </div>

          {/* Right: Autosave Status, Exit & Submit Button */}
          <div className="flex items-center gap-2.5">
            <div className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground mr-1">
              {saveStatus === "saving" ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-brand-blue" />
                  <span>Đang lưu nháp...</span>
                </>
              ) : saveStatus === "saved" ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-600 font-medium">Đã lưu nháp</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-amber-600 font-medium">Lưu offline</span>
                </>
              )}
            </div>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsExitDialogOpen(true)}
              className="h-9 px-3 rounded-xl font-bold text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10 gap-1.5 transition-colors cursor-pointer border border-border sm:border-transparent"
              title="Thoát bài"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Thoát bài</span>
            </Button>

            {session.extensionAllowed ? (
              <Button
                onClick={() => setIsSubmitDialogOpen(true)}
                disabled={isSubmitting}
                className="h-9 px-4 rounded-full font-black text-xs bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-700 hover:to-rose-600 text-white shadow-md shadow-red-500/20 gap-2 cursor-pointer transition-all duration-200 active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Nộp Bài &amp; Kết Thúc</span>
              </Button>
            ) : (
              <Button
                onClick={handleCompleteCore}
                disabled={isGateChecking}
                className="h-9 px-4 rounded-full font-black text-xs bg-gradient-to-r from-brand-blue to-indigo-600 hover:from-brand-blue/90 hover:to-indigo-700 text-white shadow-md shadow-brand-blue/20 gap-1.5 cursor-pointer transition-all duration-200 active:scale-95"
              >
                {isGateChecking ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Đang kiểm tra...</span>
                  </>
                ) : (
                  <>
                    <span>Hoàn thành Core</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Section Tabs Grid (4 skills standard) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-2.5 pt-1">
          <div className="w-full grid grid-cols-4 gap-1.5 sm:gap-2 p-1.5 bg-muted/70 backdrop-blur-sm rounded-2xl border border-border/80 shadow-xs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentSection === tab.id;
              const stat = skillCounts[tab.id];

              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setCurrentSection(tab.id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={cn(
                    "w-full flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer text-center",
                    isActive
                      ? "bg-card text-brand-blue shadow-sm shadow-brand-blue/15 border border-brand-blue/30 font-black ring-1 ring-brand-blue/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-card/60",
                  )}
                >
                  <Icon className={cn("w-4 h-4 shrink-0", isActive ? "text-brand-blue" : "text-muted-foreground")} />
                  <span className="truncate">{tab.label}</span>
                  <span className={cn("hidden sm:inline-block text-[11px] font-semibold opacity-80 shrink-0", isActive ? "text-brand-blue" : "text-muted-foreground")}>
                    ({stat.answered}/{stat.total})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* Banner trạng thái giai đoạn */}
        <div className="flex items-center justify-between bg-card border border-border p-5 rounded-3xl shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue font-black text-xs tracking-wider">
              {session.extensionAllowed ? "EXT" : "CORE"}
            </div>
            <div>
              <div className="text-sm font-extrabold text-foreground">
                {session.extensionAllowed
                  ? "Phần Mở Rộng Nâng Cao (Extension Stage – PET / B1 Level)"
                  : "Phần Cơ Bản Khảo Thí (Core Stage – Flyers & KET / A2 Level)"}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Tự động lưu câu trả lời • Không sử dụng từ điển hoặc tài liệu hỗ trợ bên ngoài
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-muted-foreground font-semibold">Tiến độ kỹ năng:</span>
            <div className="font-extrabold text-sm sm:text-base text-foreground mt-0.5">
              <span className="text-brand-blue font-black">{skillCounts[currentSection].answered}</span> / {skillCounts[currentSection].total} câu
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SKILL: USE OF ENGLISH & READING                          */}
        {/* ======================================================== */}
        {(currentSection === "use_of_english" || currentSection === "reading") && (() => {
          const itemsWithPassage: Record<string, any[]> = {};
          const standaloneItems: any[] = [];

          sectionItems.forEach((it: any) => {
            const pKey = it.passageId || it.passageKey;
            if (pKey && content?.passages?.[pKey]) {
              if (!itemsWithPassage[pKey]) itemsWithPassage[pKey] = [];
              itemsWithPassage[pKey].push(it);
            } else {
              standaloneItems.push(it);
            }
          });

          const renderQuestionCard = (item: any, customNumber?: number) => {
            const selectedVal = answers[item.id] ?? "";
            const isAnswered = selectedVal !== undefined && selectedVal !== null && selectedVal !== "";

            return (
              <div
                key={item.id}
                id={`item-${item.id}`}
                className={cn(
                  "p-5 sm:p-6 rounded-3xl bg-card border border-border space-y-4 transition-all shadow-xs",
                  isAnswered
                    ? "border-brand-blue/40 ring-1 ring-brand-blue/20 bg-brand-blue/[0.02]"
                    : "hover:border-border/90 hover:shadow-sm",
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-black text-brand-blue uppercase tracking-wide px-2.5 py-1 rounded-xl bg-brand-blue/10 border border-brand-blue/20">
                      Câu {item.gapNumber ? item.gapNumber : (customNumber !== undefined ? customNumber : item.id)}
                    </span>
                    <span className="text-[11px] font-semibold text-muted-foreground">({item.id})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.band && (
                      <Badge variant="outline" className="border-border text-muted-foreground text-[10px] font-bold">
                        Band {item.band}
                      </Badge>
                    )}
                    {isAnswered && (
                      <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Đã trả lời
                      </span>
                    )}
                  </div>
                </div>

                {/* Stimulus notice/message if present */}
                {item.stimulus && (
                  <div className="bg-amber-500/10 border border-amber-500/25 rounded-2xl p-4 space-y-1">
                    {Array.isArray(item.stimulus) ? (
                      item.stimulus.map((s: string, sIdx: number) => (
                        <p key={sIdx} className={sIdx === 0 ? "font-bold text-amber-900 dark:text-amber-300 tracking-wide text-xs" : "text-amber-800 dark:text-amber-100 text-xs italic"}>
                          {s}
                        </p>
                      ))
                    ) : (
                      <p className="text-amber-900 dark:text-amber-100 text-xs font-medium">{item.stimulus}</p>
                    )}
                  </div>
                )}

                {/* Question Prompt - Upgraded to IELTS standard font-size & font-weight */}
                {item.prompt && (
                  <p className="text-sm sm:text-base font-bold text-foreground leading-relaxed">
                    {item.prompt}
                  </p>
                )}

                {/* Options MCQ / cloze_mcq / matching */}
                {item.options && item.options.length > 0 && (
                  <div className={cn("grid gap-2.5 pt-1", item.options.length > 4 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-3")}>
                    {item.options.map((opt: any) => {
                      const isChosen = String(selectedVal).trim().toUpperCase() === String(opt.key).trim().toUpperCase();
                      return (
                        <button
                          key={opt.key}
                          type="button"
                          onClick={() => setAnswers({ ...answers, [item.id]: opt.key })}
                          className={cn(
                            "flex items-center gap-3 p-3.5 rounded-2xl border transition-all cursor-pointer text-xs sm:text-sm font-medium text-left",
                            isChosen
                              ? "bg-brand-blue-soft border-brand-blue/60 text-brand-blue font-bold shadow-xs"
                              : "bg-muted/40 border-border hover:bg-muted/70 text-foreground",
                          )}
                        >
                          <span
                            className={cn(
                              "w-7 h-7 shrink-0 rounded-xl flex items-center justify-center font-black text-xs transition",
                              isChosen
                                ? "bg-brand-blue text-white shadow-xs"
                                : "bg-card text-muted-foreground border border-border",
                            )}
                          >
                            {opt.key}
                          </span>
                          <span className="leading-snug">{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Gap fill input if no options */}
                {(!item.options || item.options.length === 0) && (
                  <div className="pt-2">
                    <Input
                      placeholder="Nhập từ hoặc cụm từ cần điền..."
                      value={selectedVal}
                      onChange={(e) => setAnswers({ ...answers, [item.id]: e.target.value })}
                      className="bg-background border-2 border-brand-blue/30 text-foreground max-w-sm h-11 px-3.5 rounded-xl text-base sm:text-sm font-bold shadow-xs focus:border-brand-blue focus:ring-3 focus:ring-brand-blue/20"
                    />
                  </div>
                )}
              </div>
            );
          };

          return (
            <div className="space-y-8">
              {/* PHẦN 1: CÁC NHÓM CÂU HỎI KÈM BÀI ĐỌC (SPLIT PANE 2 CỘT CHUẨN KHẢO THÍ) */}
              {Object.entries(itemsWithPassage).map(([pkey, pItems]) => {
                const pass = content?.passages?.[pkey];
                if (!pass) return null;

                return (
                  <div key={pkey} className="bg-card border border-border rounded-3xl p-4 sm:p-6 space-y-4 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
                      <div className="flex items-center gap-2 text-sm font-black text-brand-blue uppercase tracking-wide">
                        <BookOpen className="w-4 h-4 text-brand-blue" />
                        <span>{pass.title || `Văn bản đọc: ${pkey}`}</span>
                      </div>
                      <Badge variant="outline" className="border-brand-blue/30 text-brand-blue text-xs font-mono font-bold bg-brand-blue/5">
                        {pItems.length} câu hỏi liên kết
                      </Badge>
                    </div>

                    {pass.instruction && (
                      <p className="text-xs text-muted-foreground italic font-medium bg-muted/40 p-3 rounded-xl border border-border/60">
                        {pass.instruction}
                      </p>
                    )}

                    {/* Lưới 2 cột: Trái là Bài đọc, Phải là Danh sách câu hỏi */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                      {/* Cột trái: Nội dung bài đọc font serif rõ nét */}
                      <div className="lg:col-span-6 xl:col-span-7 bg-muted/30 border border-border/80 rounded-2xl p-5 space-y-4 lg:sticky lg:top-28 max-h-[75vh] overflow-y-auto">
                        {pass.text && (
                          <p className="text-sm sm:text-base text-foreground leading-relaxed font-serif tracking-normal whitespace-pre-line">
                            {pass.text}
                          </p>
                        )}

                        {pass.paragraphs && (
                          <div className="space-y-3 text-sm sm:text-base text-foreground leading-relaxed font-serif">
                            {pass.paragraphs.map((p: string, pIdx: number) => (
                              <p key={pIdx} className="whitespace-pre-line">{p}</p>
                            ))}
                          </div>
                        )}

                        {/* Danh sách Câu lạc bộ A-H nếu có (P-R2) */}
                        {pass.clubs && (
                          <div className="space-y-2.5 pt-2">
                            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                              Danh sách Câu lạc bộ (A–H):
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {pass.clubs.map((c: any) => (
                                <div key={c.key} className="bg-card p-3 rounded-xl border border-border text-xs space-y-1 shadow-2xs">
                                  <div className="font-black text-brand-blue font-mono flex items-center gap-1.5">
                                    <span className="w-5 h-5 rounded-md bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-[11px]">
                                      {c.key}
                                    </span>
                                    {c.name}
                                  </div>
                                  <p className="text-muted-foreground leading-snug">{c.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Danh sách Sentences A-E nếu có (P-R4 Gapped text) */}
                        {pass.sentences && (
                          <div className="space-y-2 pt-2">
                            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                              Các câu lựa chọn (A–E):
                            </div>
                            <div className="space-y-2">
                              {pass.sentences.map((s: any) => (
                                <div key={s.key} className="text-xs text-foreground bg-card p-3 rounded-xl border border-border flex items-start gap-2.5 shadow-2xs">
                                  <span className="w-5 h-5 rounded-md bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-[11px] font-bold text-brand-blue shrink-0 mt-0.5">
                                    {s.key}
                                  </span>
                                  <span className="leading-snug">{s.text}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Cột phải: Các câu hỏi điền từ hoặc trắc nghiệm tương ứng */}
                      <div className="lg:col-span-6 xl:col-span-5 space-y-4">
                        {pItems.map((item: any) => renderQuestionCard(item))}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* PHẦN 2: CÁC CÂU HỎI ĐỘC LẬP */}
              {standaloneItems.length > 0 && (
                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-brand-blue uppercase tracking-wider">
                      CÂU HỎI TRẮC NGHIỆM ĐỘC LẬP
                    </span>
                    <span className="text-xs font-bold text-muted-foreground">
                      ({standaloneItems.length} câu)
                    </span>
                  </div>
                  <div className="space-y-4">
                    {standaloneItems.map((item: any, sIdx: number) => renderQuestionCard(item, sIdx + 1))}
                  </div>
                </div>
              )}
            </div>
          );
        })()}

        {/* ======================================================== */}
        {/* SKILL: LISTENING (ACADEMIC AUDIO PLAYER STYLE)           */}
        {/* ======================================================== */}
        {currentSection === "listening" && (() => {
          const taskMap: Record<string, { track: any; items: any[] }> = {};

          (content?.audio || []).forEach((tr: any) => {
            const itemsForTrack = sectionItems.filter((it: any) => it.audioId === tr.id);
            const isTrackAllowed = tr.stage === "core" || session.extensionAllowed;
            if (isTrackAllowed && itemsForTrack.length > 0) {
              taskMap[tr.id] = {
                track: tr,
                items: itemsForTrack,
              };
            }
          });

          return (
            <div className="space-y-8">
              {/* Lời dặn khảo thí tổng quan */}
              <div className="bg-brand-blue/5 border border-brand-blue/20 rounded-2xl p-4 flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-brand-blue/15 border border-brand-blue/30 flex items-center justify-center text-brand-blue shrink-0 mt-0.5">
                  <Headphones className="w-4 h-4" />
                </div>
                <div className="text-xs space-y-1">
                  <div className="font-extrabold text-brand-blue">Hướng dẫn làm bài thi Nghe (Cambridge Listening Exam)</div>
                  <p className="text-muted-foreground leading-relaxed">
                    Bài thi gồm các phần (Task) riêng biệt. Con hãy nhấn nút <strong className="text-foreground">"Phát âm thanh"</strong> ngay tại khung điều khiển của từng phần. Mỗi file nghe con được phép bấm nghe tối đa <strong>2 lần</strong>. Vừa nghe con vừa tích chọn đáp án hoặc gõ câu trả lời vào ô trống bên dưới nhé!
                  </p>
                </div>
              </div>

              {/* Danh sách từng Task nghe kèm Audio Player & câu hỏi */}
              {Object.entries(taskMap).map(([audioId, { track, items }]) => {
                const plays = audioPlays[audioId] || 0;
                const isCurrent = currentAudioId === audioId && isPlayingAudio;
                const canPlay = plays < 2;

                return (
                  <div
                    key={audioId}
                    className="bg-card border border-border rounded-3xl p-5 sm:p-6 space-y-6 shadow-sm"
                  >
                    {/* Bảng điều khiển Player chuẩn Academic Audio Player (Ảnh 2) */}
                    <div className="bg-card border border-brand-blue/25 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3.5">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5">
                          <button
                            type="button"
                            disabled={!canPlay && !isCurrent}
                            onClick={() => handlePlayAudio(audioId)}
                            className={cn(
                              "w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-md transition-transform active:scale-95 cursor-pointer shrink-0",
                              isCurrent
                                ? "bg-amber-500 hover:bg-amber-600 animate-pulse"
                                : canPlay
                                ? "bg-brand-blue hover:bg-brand-blue-hover"
                                : "bg-muted text-muted-foreground cursor-not-allowed",
                            )}
                            title={isCurrent ? "Tạm dừng" : "Phát audio"}
                          >
                            {isCurrent ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                          </button>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-sm sm:text-base text-foreground">
                                {track.task || "Audio Khảo Thí"}
                              </span>
                              {isCurrent && (
                                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                  Đang phát
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5 font-medium">
                              Mã track: <span className="font-mono font-bold text-foreground">{audioId}</span> • Đã nghe: <span className={plays >= 2 ? "text-amber-600 font-bold" : "font-bold text-brand-blue"}>{plays}/2 lần</span>
                            </p>
                          </div>
                        </div>

                        {/* Controls bên phải: Mute + Volume slider */}
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={toggleMuteAudio}
                            className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition cursor-pointer"
                          >
                            {isAudioMuted ? <VolumeX className="w-4 h-4 text-destructive" /> : <Volume2 className="w-4 h-4 text-brand-blue" />}
                          </button>
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.05"
                            value={isAudioMuted ? 0 : audioVolume}
                            onChange={handleVolumeChange}
                            className="w-16 sm:w-20 accent-brand-blue cursor-pointer h-1.5 bg-muted rounded-lg"
                          />
                        </div>
                      </div>

                      {/* Thanh Progress thời gian thực */}
                      <div className="space-y-1.5 pt-1 border-t border-border/60">
                        <div className="flex justify-between text-[11px] font-mono text-muted-foreground">
                          <span className="text-brand-blue font-bold">
                            {currentAudioId === audioId ? formatAudioTime(audioCurrentTime) : "00:00"}
                          </span>
                          <span>
                            {currentAudioId === audioId ? formatAudioTime(audioDuration) : "--:--"}
                          </span>
                        </div>
                        <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-brand-blue h-full transition-all duration-300 rounded-full"
                            style={{ width: currentAudioId === audioId ? `${audioProgress}%` : "0%" }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Trường hợp Task 3 (AUD-T3) kèm Form tóm tắt ghi chú */}
                    {audioId === "AUD-T3" && content?.meta?.listeningGapForm && (
                      <div className="bg-brand-blue/[0.03] border border-brand-blue/25 rounded-2xl p-5 space-y-3">
                        <div className="flex items-center gap-2 text-xs font-black text-brand-blue uppercase tracking-wider">
                          <BookOpen className="w-4 h-4" /> Bảng tóm tắt nội dung nghe: {content.meta.listeningGapForm.title}
                        </div>
                        <p className="text-xs text-muted-foreground italic font-medium">
                          Con hãy nghe đoạn hội thoại và điền thông tin vào các chỗ trống (11) đến (15) tương ứng ở bên dưới:
                        </p>
                        <div className="bg-card rounded-xl p-4 border border-border divide-y divide-border/60 text-xs shadow-2xs">
                          {content.meta.listeningGapForm.rows.map((row: string[], rIdx: number) => (
                            <div key={rIdx} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <span className="text-foreground font-semibold">{row[0]}</span>
                              <span className="text-brand-blue font-mono font-bold bg-muted/60 px-3 py-1 rounded-lg border border-border">
                                {row[1]}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Danh sách các câu hỏi gắn liền với Task nghe */}
                    <div className="space-y-4">
                      {items.map((item: any) => {
                        const selectedVal = answers[item.id] || "";
                        const isAnswered = selectedVal !== undefined && selectedVal !== null && selectedVal !== "";

                        return (
                          <div
                            key={item.id}
                            id={`item-${item.id}`}
                            className={cn(
                              "bg-card border rounded-2xl p-4 sm:p-5 space-y-3.5 transition-all shadow-xs",
                              isAnswered
                                ? "border-brand-blue/40 ring-1 ring-brand-blue/20 bg-brand-blue/[0.02]"
                                : "border-border hover:border-border/90",
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-mono font-black text-brand-blue bg-brand-blue/10 px-2.5 py-1 rounded-lg border border-brand-blue/20">
                                  Câu {item.gapNumber || item.id}
                                </span>
                                <span className="text-xs font-semibold text-muted-foreground">{item.task}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                {item.band && (
                                  <Badge variant="outline" className="border-border text-muted-foreground text-[10px] font-semibold">
                                    Band {item.band}
                                  </Badge>
                                )}
                                {isAnswered && (
                                  <span className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                                    <CheckCircle2 className="w-3 h-3" /> Đã trả lời
                                  </span>
                                )}
                              </div>
                            </div>

                            <p className="text-sm text-foreground font-semibold leading-relaxed">
                              {item.prompt}
                            </p>

                            {/* Dạng trắc nghiệm MCQ */}
                            {item.type === "mcq" && item.options && (
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                                {item.options.map((opt: any) => {
                                  const isChosen = String(selectedVal).trim().toUpperCase() === String(opt.key).trim().toUpperCase();
                                  return (
                                    <button
                                      key={opt.key}
                                      type="button"
                                      onClick={() => setAnswers({ ...answers, [item.id]: opt.key })}
                                      className={cn(
                                        "flex items-start gap-2.5 p-3 rounded-xl border text-left text-xs font-semibold transition cursor-pointer",
                                        isChosen
                                          ? "bg-brand-blue text-white border-brand-blue shadow-sm shadow-brand-blue/20"
                                          : "bg-muted/40 border-border text-foreground hover:bg-muted/80 hover:border-border",
                                      )}
                                    >
                                      <span
                                        className={cn(
                                          "w-6 h-6 shrink-0 rounded-full flex items-center justify-center font-black text-xs transition",
                                          isChosen ? "bg-white text-brand-blue" : "bg-card text-muted-foreground border border-border",
                                        )}
                                      >
                                        {opt.key}
                                      </span>
                                      <span className="pt-0.5 leading-snug">{opt.text}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            )}

                            {/* Dạng điền từ Gap fill */}
                            {item.type === "gap_fill" && (
                              <div className="pt-1 flex flex-col sm:flex-row sm:items-center gap-3">
                                <Input
                                  placeholder="Nhập từ hoặc số con nghe được..."
                                  value={selectedVal}
                                  onChange={(e) => setAnswers({ ...answers, [item.id]: e.target.value })}
                                  className="bg-card border-border text-foreground max-w-sm text-sm font-semibold focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
                                />
                                <span className="text-[11px] text-muted-foreground italic">
                                  (Ví dụ: tên riêng viết hoa, số viết chữ hoặc số)
                                </span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })()}

        {/* ======================================================== */}
        {/* SKILL: WRITING                                           */}
        {/* ======================================================== */}
        {currentSection === "writing" && (
          <div className="space-y-6">
            {/* W1 */}
            <div id="item-W1" className="bg-card border border-border rounded-2xl p-5 space-y-3.5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-black text-brand-blue bg-brand-blue/10 px-2.5 py-1 rounded-lg border border-brand-blue/20">
                  Task W1 (Core) • Best Friend
                </span>
                <Badge variant="outline" className="text-xs font-semibold text-muted-foreground">
                  Mục tiêu: 20–30 words
                </Badge>
              </div>
              <p className="text-sm text-foreground font-semibold leading-relaxed">
                Write about your best friend. Use these words to help you: <em>name, tall, likes, plays, at the weekend</em>. Write 3–4 sentences (20–30 words).
              </p>
              <Textarea
                placeholder="Nhập bài viết W1 tại đây (viết trực tiếp, không dán)..."
                value={answers["W1"] || ""}
                onChange={(e) => setAnswers({ ...answers, W1: e.target.value })}
                rows={4}
                className="bg-muted/30 border-border text-foreground text-xs sm:text-sm font-sans leading-relaxed focus:border-brand-blue"
              />
              <div className="text-[11px] text-muted-foreground font-mono text-right font-medium">
                Số từ: {(answers["W1"] || "").trim().split(/\s+/).filter(Boolean).length} words
              </div>
            </div>

            {/* W2 */}
            <div id="item-W2" className="bg-card border border-border rounded-2xl p-5 space-y-3.5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-black text-brand-blue bg-brand-blue/10 px-2.5 py-1 rounded-lg border border-brand-blue/20">
                  Task W2 (Core) • Email to Sam
                </span>
                <Badge variant="outline" className="text-xs font-semibold text-muted-foreground">
                  Mục tiêu: 30–40 words
                </Badge>
              </div>
              <div className="bg-muted/40 p-3.5 rounded-xl border border-border text-xs sm:text-sm text-foreground italic font-serif leading-relaxed">
                "Hi! I’m coming to visit your city next month. Which places should I visit? What food should I try? When can we meet? - Sam"
              </div>
              <Textarea
                placeholder="Nhập bài viết W2 tại đây..."
                value={answers["W2"] || ""}
                onChange={(e) => setAnswers({ ...answers, W2: e.target.value })}
                rows={5}
                className="bg-muted/30 border-border text-foreground text-xs sm:text-sm font-sans leading-relaxed focus:border-brand-blue"
              />
              <div className="text-[11px] text-muted-foreground font-mono text-right font-medium">
                Số từ: {(answers["W2"] || "").trim().split(/\s+/).filter(Boolean).length} words
              </div>
            </div>

            {/* W3 (Extension) */}
            {session.extensionAllowed ? (
              <div id="item-W3" className="bg-card border border-border rounded-2xl p-5 space-y-3.5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                    Task W3 (Extension) • Email to Alex
                  </span>
                  <Badge variant="outline" className="text-xs font-semibold text-muted-foreground">
                    Mục tiêu: ~100 words
                  </Badge>
                </div>
                <div className="bg-muted/40 p-3.5 rounded-xl border border-border text-xs sm:text-sm text-foreground italic font-serif leading-relaxed">
                  "Hi, Our school is planning a day trip next month. We can go to the mountains, the beach or the zoo. Which place do you think is best? Why? What food should we take for lunch? And can you come early on Saturday to help me get ready? Write soon, Alex"
                </div>
                <Textarea
                  placeholder="Nhập bài viết W3 tại đây..."
                  value={answers["W3"] || ""}
                  onChange={(e) => setAnswers({ ...answers, W3: e.target.value })}
                  rows={8}
                  className="bg-muted/30 border-border text-foreground text-xs sm:text-sm font-sans leading-relaxed focus:border-brand-blue"
                />
                <div className="text-[11px] text-muted-foreground font-mono text-right font-medium">
                  Số từ: {(answers["W3"] || "").trim().split(/\s+/).filter(Boolean).length} words
                </div>
              </div>
            ) : (
              <div className="bg-card border border-dashed border-border rounded-2xl p-6 text-center text-muted-foreground text-xs space-y-2">
                <Lock className="w-6 h-6 mx-auto text-muted-foreground" />
                <p className="font-semibold text-foreground">Task W3 thuộc phần mở rộng (Extension Stage)</p>
                <p>Con cần hoàn thành tốt phần Core và vượt qua bài kiểm tra Gate để mở khóa phần này.</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* QUESTION PALETTE (STICKY BOTTOM NAVIGATION) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border shadow-[0_-4px_25px_rgba(0,0,0,0.06)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 sm:gap-6">
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-black uppercase text-foreground tracking-wide hidden sm:inline">
              Bảng câu hỏi ({currentSection.replace(/_/g, " ").toUpperCase()})
            </span>
            <Badge variant="outline" className="text-xs font-black bg-card border-border">
              {skillCounts[currentSection].answered}/{skillCounts[currentSection].total}
            </Badge>
          </div>

          <div className="flex-1 flex items-center gap-1.5 overflow-x-auto py-1 px-1 no-scrollbar">
            {currentSection === "writing" ? (
              ["W1", "W2", ...(session.extensionAllowed ? ["W3"] : [])].map((wKey, idx) => {
                const isAns = answers[wKey] && String(answers[wKey]).trim().length > 0;
                return (
                  <button
                    key={wKey}
                    type="button"
                    onClick={() => scrollToQuestion(wKey)}
                    className={cn(
                      "min-w-[42px] h-8 px-2.5 rounded-xl font-black text-xs transition cursor-pointer border flex items-center justify-center shrink-0",
                      isAns
                        ? "bg-brand-blue text-white border-brand-blue shadow-xs font-extrabold"
                        : "bg-muted/50 text-foreground border-border/80 hover:bg-muted",
                    )}
                  >
                    W{idx + 1}
                  </button>
                );
              })
            ) : (
              sectionItems.map((item: any, idx: number) => {
                const val = answers[item.id];
                const isAns = val !== undefined && val !== null && String(val).trim() !== "";
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToQuestion(item.id)}
                    className={cn(
                      "min-w-[34px] h-8 px-2 rounded-xl font-bold text-xs transition cursor-pointer border flex items-center justify-center shrink-0",
                      isAns
                        ? "bg-brand-blue text-white border-brand-blue shadow-xs font-extrabold"
                        : "bg-muted/50 text-foreground border-border/80 hover:bg-muted",
                    )}
                  >
                    {item.gapNumber || idx + 1}
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* CONFIRM SUBMIT DIALOG */}
      <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
        <DialogContent className="sm:max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-black text-foreground">Xác Nhận Nộp Bài Khảo Thí</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground pt-1">
              Con đã làm được{" "}
              <strong className="text-foreground">
                {Object.keys(answers).length} / {content?.items?.length || 0}
              </strong>{" "}
              câu hỏi. Sau khi nộp bài, hệ thống sẽ chốt điểm và chuyển kết quả đến thầy cô chuyên môn.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0 pt-4">
            <Button variant="outline" onClick={() => setIsSubmitDialogOpen(false)} className="rounded-xl font-bold text-xs">
              Tiếp tục làm bài
            </Button>
            <Button
              onClick={handleFinalSubmit}
              disabled={isSubmitting}
              className="rounded-xl font-bold text-xs bg-brand-red hover:bg-brand-red-hover text-white shadow-md"
            >
              {isSubmitting ? "Đang nộp..." : "Xác nhận nộp bài"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* CONFIRM EXIT DIALOG */}
      <Dialog open={isExitDialogOpen} onOpenChange={setIsExitDialogOpen}>
        <DialogContent className="sm:max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-black text-destructive">Thoát Khỏi Phòng Thi?</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground pt-1">
              Các câu trả lời của con đã được tự động lưu nháp. Con có chắc muốn rời phòng thi và quay về trang chủ không?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0 pt-4">
            <Button variant="outline" onClick={() => setIsExitDialogOpen(false)} className="rounded-xl font-bold text-xs">
              Ở lại làm tiếp
            </Button>
            <Button
              variant="destructive"
              onClick={() => navigate("/")}
              className="rounded-xl font-bold text-xs shadow-md"
            >
              Thoát phòng thi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
