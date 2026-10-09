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
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Modals
  const [isGateChecking, setIsGateChecking] = useState(false);
  const [gateResult, setGateResult] = useState<any>(null);
  const [showGateModal, setShowGateModal] = useState(false);
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
      alert("Bạn đã nghe tối đa 2 lần cho phần này.");
      return;
    }

    const audioUrl = cambridgeApi.getAudioUrl(audioId);
    if (currentAudioUrl !== audioUrl) {
      setCurrentAudioUrl(audioUrl);
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play();
        setIsPlayingAudio(true);
        setAudioPlays({ ...audioPlays, [audioId]: plays + 1 });
      }
    } else {
      if (audioRef.current) {
        if (isPlayingAudio) {
          audioRef.current.pause();
          setIsPlayingAudio(false);
        } else {
          audioRef.current.play();
          setIsPlayingAudio(true);
        }
      }
    }
  };

  // Submit Core -> Check Gate
  const handleCompleteCore = async () => {
    if (!testCode) return;
    setIsGateChecking(true);
    try {
      // Save current answers first
      await cambridgeApi.saveAnswers(testCode, answers);
      const res = await cambridgeApi.evaluateGate(testCode);
      setGateResult(res.data);
      setShowGateModal(true);
      refetch();
    } catch (err: any) {
      alert("Lỗi khi kiểm tra Gate: " + err.message);
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
        <h2 className="text-2xl font-black">Nộp bài thành công!</h2>
        <p className="text-sm text-slate-400 max-w-md mt-2">
          Cảm ơn bạn <strong>{session.candidateName}</strong> đã hoàn thành bài thi Cambridge Placement Test. Giáo viên sẽ tiến hành chấm điểm Writing, kiểm tra Speaking và xếp lớp cho bạn trong thời gian sớm nhất!
        </p>
        <div className="mt-6 bg-slate-900 border border-slate-800 p-4 rounded-xl text-xs font-mono text-slate-400">
          Mã bài thi: <span className="text-purple-400 font-bold">{session.testCode}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col select-none">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        onEnded={() => setIsPlayingAudio(false)}
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
        {(currentSection === "use_of_english" || currentSection === "reading") && (
          <div className="space-y-6">
            {/* Nếu có passages liên quan */}
            {content?.passages && (
              <div className="space-y-4">
                {Object.entries(content.passages).map(([pkey, pass]: any) => {
                  // Chỉ hiển thị passage nếu section hiện tại có câu hỏi thuộc passageKey đó
                  const hasQuestions = sectionItems.some((it: any) => it.passageKey === pkey || it.task === pkey);
                  if (!hasQuestions && !pass.text && !pass.paragraphs) return null;

                  return (
                    <div key={pkey} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-wider">
                        <BookOpen className="w-4 h-4" /> Bài đọc: {pass.title || pkey}
                      </div>
                      {pass.instruction && (
                        <p className="text-xs text-slate-400 italic">{pass.instruction}</p>
                      )}
                      {pass.text && (
                        <p className="text-sm text-slate-200 leading-relaxed font-serif bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                          {pass.text}
                        </p>
                      )}
                      {pass.paragraphs && (
                        <div className="space-y-2 text-sm text-slate-200 leading-relaxed font-serif bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                          {pass.paragraphs.map((p: string, idx: number) => (
                            <p key={idx}>{p}</p>
                          ))}
                        </div>
                      )}
                      {pass.clubs && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                          {pass.clubs.map((c: any) => (
                            <div key={c.key} className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs">
                              <span className="font-bold text-purple-400 font-mono">[{c.key}] {c.name}: </span>
                              <span className="text-slate-300">{c.description}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {pass.sentences && (
                        <div className="space-y-1 pt-2">
                          {pass.sentences.map((s: any) => (
                            <div key={s.key} className="text-xs text-slate-300 bg-slate-950 p-2 rounded border border-slate-800">
                              <span className="font-bold text-purple-400 font-mono mr-2">[{s.key}]</span> {s.text}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Danh sách các câu hỏi */}
            <div className="space-y-4">
              {sectionItems.map((item: any, idx: number) => {
                const selectedVal = answers[item.id];
                return (
                  <div
                    key={item.id}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-slate-700 transition"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/50">
                        Câu {idx + 1} ({item.id})
                      </span>
                      <span className="text-[11px] text-slate-500 uppercase">
                        Band {item.band} • {item.type}
                      </span>
                    </div>

                    <p className="text-sm text-slate-100 font-medium leading-relaxed">
                      {item.prompt}
                    </p>

                    {/* Options MCQ */}
                    {item.options && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                        {item.options.map((opt: any) => {
                          const isChosen = selectedVal === opt.key;
                          return (
                            <button
                              key={opt.key}
                              onClick={() => setAnswers({ ...answers, [item.id]: opt.key })}
                              className={`flex items-center gap-3 p-3 rounded-xl border text-left text-xs font-medium transition ${
                                isChosen
                                  ? "bg-purple-600/20 border-purple-500 text-white shadow-sm"
                                  : "bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700"
                              }`}
                            >
                              <span
                                className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                                  isChosen ? "bg-purple-600 text-white" : "bg-slate-800 text-slate-400"
                                }`}
                              >
                                {opt.key}
                              </span>
                              <span>{opt.text}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SKILL: LISTENING                                         */}
        {/* ======================================================== */}
        {currentSection === "listening" && (
          <div className="space-y-6">
            {/* Audio controllers for Listening */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h3 className="font-bold text-sm text-purple-300 flex items-center gap-2">
                <Volume2 className="w-4 h-4" /> Băng ghi âm bài Nghe (Listening Tracks)
              </h3>
              <p className="text-xs text-slate-400">
                Nhấn "Phát âm thanh" để nghe bài thi. Mỗi bài nghe được phép phát tối đa 2 lần. Không thể tua nhanh/tua chậm.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                {(content?.audio || []).map((track: any) => {
                  const plays = audioPlays[track.id] || 0;
                  const isCurrent = currentAudioUrl === cambridgeApi.getAudioUrl(track.id) && isPlayingAudio;
                  const canPlay = plays < 2;

                  return (
                    <div key={track.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="font-bold text-xs text-white">{track.task}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Đã nghe: <span className="font-mono text-purple-400 font-bold">{plays}/2 lần</span>
                        </div>
                      </div>

                      <Button
                        size="sm"
                        disabled={!canPlay && !isCurrent}
                        onClick={() => handlePlayAudio(track.id)}
                        className={`text-xs font-bold ${
                          isCurrent
                            ? "bg-amber-600 hover:bg-amber-700 text-white"
                            : canPlay
                            ? "bg-purple-600 hover:bg-purple-700 text-white"
                            : "bg-slate-800 text-slate-500 cursor-not-allowed"
                        }`}
                      >
                        {isCurrent ? (
                          <>
                            <Pause className="w-3.5 h-3.5 mr-1.5" /> Tạm dừng
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 mr-1.5" /> Phát âm thanh ({track.task})
                          </>
                        )}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Form Listening Gap-fill Part 3 nếu có */}
            {content?.meta?.listeningGapForm && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="font-bold text-xs text-purple-400 uppercase tracking-wider">
                  Bảng thông tin điền từ: {content.meta.listeningGapForm.title}
                </h4>
                <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 space-y-2 text-xs">
                  {content.meta.listeningGapForm.rows.map((row: string[], idx: number) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800/60 pb-2">
                      <span className="text-slate-400 font-medium">{row[0]}</span>
                      <span className="text-purple-300 font-mono mt-1 sm:mt-0">{row[1]}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Listening Items */}
            <div className="space-y-4">
              {sectionItems.map((item: any, idx: number) => {
                const selectedVal = answers[item.id] || "";
                return (
                  <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/50">
                        Câu {idx + 1} ({item.id}) • {item.task}
                      </span>
                      <span className="text-[11px] text-slate-500 uppercase">
                        Track: {item.audioId} • {item.type}
                      </span>
                    </div>

                    <p className="text-sm text-slate-100 font-medium">{item.prompt}</p>

                    {item.type === "mcq" && item.options && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                        {item.options.map((opt: any) => {
                          const isChosen = selectedVal === opt.key;
                          return (
                            <button
                              key={opt.key}
                              onClick={() => setAnswers({ ...answers, [item.id]: opt.key })}
                              className={`flex items-center gap-3 p-3 rounded-xl border text-left text-xs font-medium transition ${
                                isChosen
                                  ? "bg-purple-600/20 border-purple-500 text-white shadow-sm"
                                  : "bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800"
                              }`}
                            >
                              <span
                                className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                                  isChosen ? "bg-purple-600 text-white" : "bg-slate-800 text-slate-400"
                                }`}
                              >
                                {opt.key}
                              </span>
                              <span>{opt.text}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {item.type === "gap_fill" && (
                      <div className="pt-2">
                        <Input
                          placeholder="Nhập từ / số cần điền..."
                          value={selectedVal}
                          onChange={(e) => setAnswers({ ...answers, [item.id]: e.target.value })}
                          className="bg-slate-950 border-slate-800 text-white max-w-sm"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

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

      {/* Modal Thông Báo Đánh Giá Gate */}
      <Dialog open={showGateModal} onOpenChange={setShowGateModal}>
        <DialogContent className="sm:max-w-md bg-slate-900 text-white border-slate-800">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold flex items-center gap-2">
              {gateResult?.gatePassed ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Đạt chuẩn Gate vào Extension!
                </>
              ) : (
                <>
                  <AlertTriangle className="w-5 h-5 text-amber-400" /> Hoàn thành phần Core
                </>
              )}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2 text-xs">
            <p className="text-slate-300 leading-relaxed">
              Hệ thống đã tự động chấm các câu trắc nghiệm phần Core của bạn:
            </p>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 font-mono">
              <div className="flex justify-between">
                <span>Điểm Band K:</span>
                <span className="font-bold text-purple-400">
                  {gateResult?.coreK} câu đúng (Yêu cầu: &ge; {gateResult?.minK})
                </span>
              </div>
              <div className="flex justify-between">
                <span>Điểm Band K+:</span>
                <span className="font-bold text-purple-400">
                  {gateResult?.coreKplus} câu đúng (Yêu cầu: &ge; {gateResult?.minKplus})
                </span>
              </div>
            </div>

            {gateResult?.gatePassed ? (
              <p className="text-emerald-400 font-medium">
                🎉 Chúc mừng bạn đã đủ điều kiện tiếp tục làm phần Extension (PET Level) để xếp lớp cao hơn!
              </p>
            ) : (
              <p className="text-slate-400">
                Bạn đã hoàn thành trọn vẹn phần thi Core chuẩn đoán cấp độ Flyers và KET. Giáo viên sẽ xem xét chấm điểm Speaking và Writing để xếp lớp chính xác cho bạn.
              </p>
            )}
          </div>

          <DialogFooter>
            {gateResult?.gatePassed ? (
              <Button
                onClick={() => {
                  setShowGateModal(false);
                  refetch();
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold"
              >
                Tiếp tục làm bài Extension <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setShowGateModal(false);
                  handleFinalSubmit();
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
              >
                Hoàn tất & Nộp bài
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
