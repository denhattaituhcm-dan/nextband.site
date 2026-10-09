import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { cambridgeApi } from "@/lib/api";
import {
  Clock,
  Volume2,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  AlertTriangle,
  Play,
  Pause,
  BookOpen,
  PenTool,
  HelpCircle,
  ShieldAlert,
  Send,
  Loader2,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

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

  // Active section & current item index
  const [currentSection, setCurrentSection] = useState<SectionType>("use_of_english");
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [audioPlays, setAudioPlays] = useState<Record<string, number>>({});
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null);
  const [currentAudioId, setCurrentAudioId] = useState<string | null>(null);
  const [audioProgress, setAudioProgress] = useState(0); // 0 to 100
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Modals & States
  const [isGateChecking, setIsGateChecking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

    const timer = setTimeout(() => {
      cambridgeApi.saveAnswers(testCode, answers).catch((err) => {
        console.warn("Autosave answers warning:", err);
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, [answers, testCode, isCompleted]);

  // Items per current skill section
  const sectionItems = (content?.items || []).filter((i: any) => i.skill === currentSection);

  // Play audio handler
  const handlePlayAudio = (audioId: string) => {
    const plays = audioPlays[audioId] || 0;
    if (plays >= 2) {
      alert("Con đã nghe tối đa 2 lần cho phần này rồi nhé.");
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

  // Submit Core -> Check Gate (Seamless & Neutral Transition)
  const handleCompleteCore = async () => {
    if (!testCode) return;
    setIsGateChecking(true);
    try {
      // 1. Lưu câu trả lời hiện tại trước
      await cambridgeApi.saveAnswers(testCode, answers);
      // 2. Server đánh giá Gate
      const res = await cambridgeApi.evaluateGate(testCode);
      const isPassed = Boolean(res?.data?.gatePassed || res?.data?.extensionAllowed);
      
      // 3. Tự động đồng bộ dữ liệu phiên thi
      await refetch();

      if (isPassed) {
        // Đủ điều kiện vào Extension: thông báo trung tính, tự động mở phần mở rộng
        alert("Con hãy tiếp tục với phần thi tiếp theo nhé!");
        setCurrentSection("use_of_english");
      } else {
        // Hoàn thành Core: tự động nộp bài và chuyển màn hình hoàn tất trung tính
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
    const confirmSubmit = window.confirm("Bạn có chắc chắn muốn nộp bài thi không? Sau khi nộp sẽ không thể thay đổi.");
    if (!confirmSubmit) return;

    setIsSubmitting(true);
    try {
      await cambridgeApi.submitTest(testCode, answers);
      setIsCompleted(true);
    } catch (err: any) {
      alert("Lỗi khi nộp bài: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white p-6">
        <Loader2 className="w-10 h-10 animate-spin text-purple-400 mb-4" />
        <h2 className="text-xl font-bold tracking-tight">Đang chuẩn bị đề thi Cambridge...</h2>
        <p className="text-xs text-slate-400 mt-1">Đang tải dữ liệu bài làm và tài nguyên âm thanh</p>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white p-6">
        <div className="w-14 h-14 rounded-2xl bg-red-950/60 border border-red-800 text-red-400 flex items-center justify-center mb-4">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold">Không thể tải bài thi</h2>
        <p className="text-xs text-slate-400 mt-1 max-w-sm text-center">
          {(error as any)?.message || "Mã bài thi không tồn tại hoặc đã hết hạn."}
        </p>
        <Button onClick={() => navigate("/")} className="mt-6 bg-slate-800 hover:bg-slate-700 text-xs">
          Về trang chủ
        </Button>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black">Con đã hoàn thành bài kiểm tra!</h2>
        <p className="text-sm text-slate-300 max-w-md mt-2 leading-relaxed">
          Cảm ơn <strong>{session.candidateName}</strong> đã cố gắng hoàn thành bài kiểm tra. Giáo viên sẽ gặp con để trao đổi phần Nói (Speaking) và thông báo kết quả xếp lớp nhé!
        </p>
        <div className="mt-6 bg-slate-900 border border-slate-800 p-4 rounded-xl text-xs font-mono text-slate-400">
          Mã bài thi: <span className="text-purple-400 font-bold">{session.testCode}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col select-none">
      {/* Hidden audio element with reactive progress tracking */}
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

      {/* Top Navigation Bar */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center font-black text-white text-sm">
            CPT
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-sm sm:text-base text-white">
                Cambridge Placement Test
              </h1>
              <Badge variant="outline" className="border-purple-500/40 text-purple-400 text-[11px] font-mono">
                {session.testCode}
              </Badge>
            </div>
            <p className="text-[11px] text-slate-400">
              Học sinh: <strong className="text-slate-200">{session.candidateName}</strong>
              {session.candidateGrade ? ` • Khối ${session.candidateGrade}` : ""}
            </p>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="hidden md:flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-800">
          {[
            { id: "use_of_english", label: "Use of English", icon: BookOpen },
            { id: "reading", label: "Reading", icon: BookOpen },
            { id: "listening", label: "Listening", icon: Volume2 },
            { id: "writing", label: "Writing", icon: PenTool },
          ].map((sec) => {
            const Icon = sec.icon;
            const isActive = currentSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setCurrentSection(sec.id as SectionType)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  isActive
                    ? "bg-purple-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {sec.label}
              </button>
            );
          })}
        </div>

        {/* Action Button */}
        <div>
          {session.extensionAllowed ? (
            <Button
              onClick={handleFinalSubmit}
              disabled={isSubmitting}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm"
            >
              <Send className="w-3.5 h-3.5 mr-1.5" />
              {isSubmitting ? "Đang nộp..." : "Hoàn thành & Nộp bài"}
            </Button>
          ) : (
            <Button
              onClick={handleCompleteCore}
              disabled={isGateChecking}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm"
            >
              {isGateChecking ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> Đang kiểm tra Gate...
                </>
              ) : (
                <>
                  Kiểm tra Gate <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </>
              )}
            </Button>
          )}
        </div>
      </header>

      {/* Mobile Submenu Tabs */}
      <div className="md:hidden flex overflow-x-auto bg-slate-900/90 border-b border-slate-800 p-2 gap-2">
        {(["use_of_english", "reading", "listening", "writing"] as SectionType[]).map((sec) => (
          <button
            key={sec}
            onClick={() => setCurrentSection(sec)}
            className={`px-3 py-1 rounded text-xs font-semibold whitespace-nowrap ${
              currentSection === sec ? "bg-purple-600 text-white" : "text-slate-400 bg-slate-800"
            }`}
          >
            {sec.replace(/_/g, " ").toUpperCase()}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* Banner trạng thái giai đoạn */}
        <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold text-xs">
              {session.extensionAllowed ? "EXT" : "CORE"}
            </div>
            <div>
              <div className="text-xs font-bold text-slate-300">
                {session.extensionAllowed
                  ? "Phần mở rộng nâng cao (Extension - PET Level)"
                  : "Phần cơ bản bắt buộc (Core - Flyers & KET)"}
              </div>
              <p className="text-[11px] text-slate-500">
                Tự động lưu câu trả lời sau mỗi thao tác • Không sử dụng từ điển hoặc công cụ dịch
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] text-slate-400">Đã trả lời:</span>
            <div className="font-mono font-bold text-sm text-purple-400">
              {Object.keys(answers).length} / {content?.items?.length || 0}
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SKILL: USE OF ENGLISH & READING                          */}
        {/* ======================================================== */}
        {(currentSection === "use_of_english" || currentSection === "reading") && (() => {
          // 1. Phân nhóm items: Những câu gắn với Passage (theo passageId hoặc passageKey) và những câu đứng độc lập
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

          // Helper render card câu hỏi
          const renderQuestionCard = (item: any, customNumber?: number) => {
            const selectedVal = answers[item.id] ?? "";
            const isAnswered = selectedVal !== undefined && selectedVal !== null && selectedVal !== "";

            return (
              <div
                key={item.id}
                id={`item-${item.id}`}
                className={`bg-slate-900 border rounded-2xl p-4 sm:p-5 space-y-3 transition shadow-sm ${
                  isAnswered ? "border-purple-500/50 bg-slate-900/90" : "border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-purple-300 bg-purple-950/80 px-2.5 py-1 rounded-lg border border-purple-800/60">
                      Câu {item.gapNumber ? item.gapNumber : (customNumber !== undefined ? customNumber : item.id)}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">({item.id})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {item.band && (
                      <Badge variant="outline" className="border-slate-800 text-slate-400 text-[10px]">
                        Band {item.band}
                      </Badge>
                    )}
                    {isAnswered && (
                      <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-800/50">
                        <CheckCircle2 className="w-3 h-3" /> Đã chọn
                      </span>
                    )}
                  </div>
                </div>

                {/* Stimulus biển báo/tin nhắn ngắn (VD: Reading Part 1) */}
                {item.stimulus && (
                  <div className="bg-amber-950/20 border border-amber-600/30 rounded-xl p-3.5 space-y-1">
                    {Array.isArray(item.stimulus) ? (
                      item.stimulus.map((s: string, sIdx: number) => (
                        <p key={sIdx} className={sIdx === 0 ? "font-bold text-amber-300 tracking-wide text-xs" : "text-amber-100/90 text-xs italic"}>
                          {s}
                        </p>
                      ))
                    ) : (
                      <p className="text-amber-100 text-xs">{item.stimulus}</p>
                    )}
                  </div>
                )}

                {/* Prompt câu hỏi */}
                {item.prompt && (
                  <p className="text-sm text-slate-100 font-medium leading-relaxed">
                    {item.prompt}
                  </p>
                )}

                {/* Options trắc nghiệm MCQ / cloze_mcq / matching */}
                {item.options && item.options.length > 0 && (
                  <div className={`grid gap-2 pt-1 ${item.options.length > 4 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-3"}`}>
                    {item.options.map((opt: any) => {
                      const isChosen = String(selectedVal).trim().toUpperCase() === String(opt.key).trim().toUpperCase();
                      return (
                        <button
                          key={opt.key}
                          type="button"
                          onClick={() => setAnswers({ ...answers, [item.id]: opt.key })}
                          className={`flex items-start gap-3 p-3 rounded-xl border text-left text-xs font-medium transition cursor-pointer ${
                            isChosen
                              ? "bg-purple-600/25 border-purple-400 text-white shadow-md ring-1 ring-purple-400"
                              : "bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700 hover:text-white"
                          }`}
                        >
                          <span
                            className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center font-bold text-xs transition ${
                              isChosen ? "bg-purple-600 text-white shadow" : "bg-slate-800 text-slate-400"
                            }`}
                          >
                            {opt.key}
                          </span>
                          <span className="leading-snug pt-0.5">{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Ô điền từ nếu là gap_fill không có options */}
                {(!item.options || item.options.length === 0) && (
                  <div className="pt-2">
                    <Input
                      placeholder="Nhập từ hoặc cụm từ cần điền..."
                      value={selectedVal}
                      onChange={(e) => setAnswers({ ...answers, [item.id]: e.target.value })}
                      className="bg-slate-950 border-slate-700 text-white max-w-sm text-sm font-medium focus:border-purple-500"
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
                  <div key={pkey} className="bg-slate-900/60 border border-slate-800 rounded-3xl p-4 sm:p-6 space-y-4 shadow-xl">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2 text-sm font-extrabold text-purple-400 uppercase tracking-wide">
                        <BookOpen className="w-4 h-4 text-purple-400" />
                        <span>{pass.title || `Văn bản đọc: ${pkey}`}</span>
                      </div>
                      <Badge variant="outline" className="border-purple-500/40 text-purple-300 text-xs font-mono">
                        {pItems.length} câu hỏi liên kết
                      </Badge>
                    </div>

                    {pass.instruction && (
                      <p className="text-xs text-slate-400 italic font-medium bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                        {pass.instruction}
                      </p>
                    )}

                    {/* Lưới 2 cột: Trái là Bài đọc, Phải là Danh sách câu hỏi */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                      {/* Cột trái: Nội dung bài đọc (sticky trên màn hình lớn để dễ đối chiếu) */}
                      <div className="lg:col-span-6 xl:col-span-7 bg-slate-950 border border-slate-800/90 rounded-2xl p-5 space-y-4 lg:sticky lg:top-20 max-h-[80vh] overflow-y-auto">
                        {pass.text && (
                          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-serif tracking-normal whitespace-pre-line">
                            {pass.text}
                          </p>
                        )}

                        {pass.paragraphs && (
                          <div className="space-y-3 text-sm sm:text-base text-slate-200 leading-relaxed font-serif">
                            {pass.paragraphs.map((p: string, pIdx: number) => (
                              <p key={pIdx} className="whitespace-pre-line">{p}</p>
                            ))}
                          </div>
                        )}

                        {/* Danh sách Câu lạc bộ A-H nếu có (P-R2) */}
                        {pass.clubs && (
                          <div className="space-y-2.5 pt-2">
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                              Danh sách Câu lạc bộ (A–H):
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {pass.clubs.map((c: any) => (
                                <div key={c.key} className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
                                  <div className="font-bold text-purple-300 font-mono flex items-center gap-1.5">
                                    <span className="w-5 h-5 rounded-md bg-purple-950 border border-purple-800 flex items-center justify-center text-[11px]">
                                      {c.key}
                                    </span>
                                    {c.name}
                                  </div>
                                  <p className="text-slate-300 leading-snug">{c.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Danh sách Sentences A-E nếu có (P-R4 Gapped text) */}
                        {pass.sentences && (
                          <div className="space-y-2 pt-2">
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                              Các câu lựa chọn (A–E):
                            </div>
                            <div className="space-y-2">
                              {pass.sentences.map((s: any) => (
                                <div key={s.key} className="text-xs text-slate-200 bg-slate-900/90 p-3 rounded-xl border border-slate-800 flex items-start gap-2.5">
                                  <span className="w-5 h-5 rounded-md bg-purple-950 border border-purple-800 flex items-center justify-center text-[11px] font-bold text-purple-300 shrink-0 mt-0.5">
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

              {/* PHẦN 2: CÁC CÂU HỎI ĐỘC LẬP (KHÔNG GẮN VỚI PASSAGE) */}
              {standaloneItems.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                    <span>Câu hỏi trắc nghiệm độc lập ({standaloneItems.length} câu)</span>
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
        {/* SKILL: LISTENING                                         */}
        {/* ======================================================== */}
        {currentSection === "listening" && (() => {
          // 1. Phân nhóm items bài Nghe theo audioId hoặc Task
          const taskMap: Record<string, { track: any; items: any[] }> = {};
          
          (content?.audio || []).forEach((tr: any) => {
            // Lọc các item thuộc track này
            const itemsForTrack = sectionItems.filter((it: any) => it.audioId === tr.id);
            // Chỉ hiển thị task nếu thuộc stage hiện tại của thí sinh (Extension hay Core)
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
              <div className="bg-purple-950/30 border border-purple-500/30 rounded-2xl p-4 flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-purple-600/30 border border-purple-500/50 flex items-center justify-center text-purple-300 shrink-0 mt-0.5">
                  <Volume2 className="w-4 h-4" />
                </div>
                <div className="text-xs space-y-1">
                  <div className="font-bold text-purple-200">Hướng dẫn làm bài thi Nghe (Cambridge Listening Exam)</div>
                  <p className="text-slate-300 leading-relaxed">
                    Bài thi gồm các phần (Task) riêng biệt. Con hãy nhấn nút <strong className="text-white">"Phát âm thanh"</strong> ngay tại phần bài làm tương ứng. Mỗi file nghe con được phép bấm nghe tối đa <strong>2 lần</strong>. Vừa nghe con vừa tích chọn đáp án hoặc gõ câu trả lời vào ô trống bên dưới nhé!
                  </p>
                </div>
              </div>

              {/* Danh sách từng Task nghe kèm Audio Player & câu hỏi của Task đó */}
              {Object.entries(taskMap).map(([audioId, { track, items }]) => {
                const plays = audioPlays[audioId] || 0;
                const isCurrent = currentAudioId === audioId && isPlayingAudio;
                const canPlay = plays < 2;

                return (
                  <div
                    key={audioId}
                    className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-6 shadow-xl"
                  >
                    {/* Header của Task + Bảng điều khiển Player gắn liền */}
                    <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center font-black text-purple-400 text-xs">
                            {track.task.split(" ")[0]}
                          </div>
                          <div>
                            <h3 className="font-bold text-sm sm:text-base text-white">
                              {track.task}
                            </h3>
                            <p className="text-xs text-slate-400 mt-0.5">
                              {items.length} câu hỏi • Mã track: <span className="font-mono text-purple-400">{audioId}</span>
                            </p>
                          </div>
                        </div>

                        {/* Nút phát và đếm số lượt nghe */}
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                            Đã nghe: <span className={plays >= 2 ? "text-amber-400" : "text-purple-400"}>{plays}/2 lần</span>
                          </span>

                          <Button
                            size="sm"
                            disabled={!canPlay && !isCurrent}
                            onClick={() => handlePlayAudio(audioId)}
                            className={`text-xs font-bold px-4 py-2 rounded-xl shadow-md transition ${
                              isCurrent
                                ? "bg-amber-600 hover:bg-amber-700 text-white animate-pulse"
                                : canPlay
                                ? "bg-purple-600 hover:bg-purple-700 text-white"
                                : "bg-slate-800 text-slate-500 cursor-not-allowed"
                            }`}
                          >
                            {isCurrent ? (
                              <>
                                <Pause className="w-4 h-4 mr-1.5" /> Tạm dừng
                              </>
                            ) : (
                              <>
                                <Play className="w-4 h-4 mr-1.5" /> {plays > 0 ? "Nghe lại lần 2" : "Phát âm thanh"}
                              </>
                            )}
                          </Button>
                        </div>
                      </div>

                      {/* Thanh Progress thời gian thực khi đang phát track này */}
                      {currentAudioId === audioId && (
                        <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                          <div className="flex justify-between text-[11px] font-mono text-slate-400">
                            <span className="text-purple-300 font-bold">{formatAudioTime(audioCurrentTime)}</span>
                            <span>{formatAudioTime(audioDuration)}</span>
                          </div>
                          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-purple-500 h-full transition-all duration-300 rounded-full"
                              style={{ width: `${audioProgress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Trường hợp đặc biệt: Task 3 (AUD-T3) kèm Form tóm tắt ghi chú (Zoo project day - notes) */}
                    {audioId === "AUD-T3" && content?.meta?.listeningGapForm && (
                      <div className="bg-slate-950 border border-purple-500/30 rounded-2xl p-5 space-y-3">
                        <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-wider">
                          <BookOpen className="w-4 h-4" /> Bảng tóm tắt nội dung nghe: {content.meta.listeningGapForm.title}
                        </div>
                        <p className="text-xs text-slate-400 italic">
                          Con hãy nghe đoạn hội thoại và điền thông tin vào các chỗ trống (11) đến (15) tương ứng ở bên dưới:
                        </p>
                        <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 divide-y divide-slate-800/60 text-xs">
                          {content.meta.listeningGapForm.rows.map((row: string[], rIdx: number) => (
                            <div key={rIdx} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <span className="text-slate-300 font-medium">{row[0]}</span>
                              <span className="text-purple-300 font-mono font-bold bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
                                {row[1]}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Danh sách các câu hỏi gắn liền với Task nghe này */}
                    <div className="space-y-4">
                      {items.map((item: any, itIdx: number) => {
                        const selectedVal = answers[item.id] || "";
                        const isAnswered = selectedVal !== undefined && selectedVal !== null && selectedVal !== "";

                        return (
                          <div
                            key={item.id}
                            className={`bg-slate-950/70 border rounded-2xl p-4 sm:p-5 space-y-3 transition shadow-sm ${
                              isAnswered ? "border-purple-500/50 bg-slate-950/90" : "border-slate-800 hover:border-slate-700"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-mono font-bold text-purple-300 bg-purple-950/80 px-2.5 py-1 rounded-lg border border-purple-800/60">
                                  {item.id}
                                </span>
                                <span className="text-xs font-medium text-slate-400">{item.task}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                {item.band && (
                                  <Badge variant="outline" className="border-slate-800 text-slate-400 text-[10px]">
                                    Band {item.band}
                                  </Badge>
                                )}
                                {isAnswered && (
                                  <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-800/50">
                                    <CheckCircle2 className="w-3 h-3" /> Đã trả lời
                                  </span>
                                )}
                              </div>
                            </div>

                            <p className="text-sm text-slate-100 font-medium leading-relaxed">
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
                                      className={`flex items-start gap-3 p-3 rounded-xl border text-left text-xs font-medium transition cursor-pointer ${
                                        isChosen
                                          ? "bg-purple-600/25 border-purple-400 text-white shadow-md ring-1 ring-purple-400"
                                          : "bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700"
                                      }`}
                                    >
                                      <span
                                        className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center font-bold text-xs ${
                                          isChosen ? "bg-purple-600 text-white" : "bg-slate-800 text-slate-400"
                                        }`}
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
                                  className="bg-slate-900 border-slate-700 text-white max-w-sm text-sm font-medium focus:border-purple-500"
                                />
                                <span className="text-[11px] text-slate-500 italic">
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
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/50">
                  Task W1 (Core) • Best Friend
                </span>
                <Badge variant="outline" className="text-xs text-slate-400">
                  Mục tiêu: 20–30 words
                </Badge>
              </div>
              <p className="text-sm text-slate-200">
                Write about your best friend. Use these words to help you: <em>name, tall, likes, plays, at the weekend</em>. Write 3–4 sentences (20–30 words).
              </p>
              <Textarea
                placeholder="Nhập bài viết W1 tại đây (viết trực tiếp, không dán)..."
                value={answers["W1"] || ""}
                onChange={(e) => setAnswers({ ...answers, W1: e.target.value })}
                rows={4}
                className="bg-slate-950 border-slate-800 text-white text-xs font-mono leading-relaxed"
              />
              <div className="text-[11px] text-slate-500 text-right">
                Số từ: {(answers["W1"] || "").trim().split(/\s+/).filter(Boolean).length} words
              </div>
            </div>

            {/* W2 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/50">
                  Task W2 (Core) • Email to Sam
                </span>
                <Badge variant="outline" className="text-xs text-slate-400">
                  Mục tiêu: 30–40 words
                </Badge>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 italic font-serif">
                "Hi! I’m coming to visit your city next month. Which places should I visit? What food should I try? When can we meet? - Sam"
              </div>
              <Textarea
                placeholder="Nhập bài viết W2 tại đây..."
                value={answers["W2"] || ""}
                onChange={(e) => setAnswers({ ...answers, W2: e.target.value })}
                rows={5}
                className="bg-slate-950 border-slate-800 text-white text-xs font-mono leading-relaxed"
              />
              <div className="text-[11px] text-slate-500 text-right">
                Số từ: {(answers["W2"] || "").trim().split(/\s+/).filter(Boolean).length} words
              </div>
            </div>

            {/* W3 (Extension) */}
            {session.extensionAllowed ? (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
                    Task W3 (Extension) • Email to Alex
                  </span>
                  <Badge variant="outline" className="text-xs text-slate-400">
                    Mục tiêu: ~100 words
                  </Badge>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 italic font-serif">
                  "Hi, Our school is planning a day trip next month. We can go to the mountains, the beach or the zoo. Which place do you think is best? Why? What food should we take for lunch? And can you come early on Saturday to help me get ready? Write soon, Alex"
                </div>
                <Textarea
                  placeholder="Nhập bài viết W3 tại đây..."
                  value={answers["W3"] || ""}
                  onChange={(e) => setAnswers({ ...answers, W3: e.target.value })}
                  rows={8}
                  className="bg-slate-950 border-slate-800 text-white text-xs font-mono leading-relaxed"
                />
                <div className="text-[11px] text-slate-500 text-right">
                  Số từ: {(answers["W3"] || "").trim().split(/\s+/).filter(Boolean).length} words
                </div>
              </div>
            ) : (
              <div className="bg-slate-900/60 border border-dashed border-slate-800 rounded-2xl p-6 text-center text-slate-500 text-xs">
                <Lock className="w-6 h-6 mx-auto mb-2 text-slate-600" />
                Task W3 thuộc phần mở rộng (Extension). Bạn cần đạt chuẩn Gate của phần Core để mở khóa.
              </div>
            )}
          </div>
        )}
      </main>

    </div>
  );
}
