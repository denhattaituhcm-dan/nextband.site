import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { cambridgeApi } from "@/lib/api";
import {
  X,
  CheckCircle2,
  AlertTriangle,
  Award,
  Sparkles,
  BookOpen,
  Volume2,
  Mic,
  PenTool,
  HelpCircle,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Save,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
  sessionId: string;
  onClose: () => void;
}

export default function CambridgeGradingModal({ sessionId, onClose }: Props) {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("speaking");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["cambridgeSessionDetail", sessionId],
    queryFn: () => cambridgeApi.getSessionDetail(sessionId),
  });

  const session = data?.data?.session;
  const calculation = data?.data?.calculation;
  const contentRef = data?.data?.contentRef;

  // State chấm Speaking Parts S1-S5
  const [speakingParts, setSpeakingParts] = useState<any>({
    s1: "not_asked",
    s2: "not_asked",
    s3: "not_asked",
    s4: "not_asked",
    s5: "not_asked",
  });

  // State tiêu chí Speaking
  const [speakingCriteria, setSpeakingCriteria] = useState<any>({
    grammar_vocabulary: 3,
    pronunciation: 3,
    interaction: 3,
    fluency_discourse: 3,
  });

  // State chấm Writing W1, W2, W3
  const [w1, setW1] = useState<{ content: number; language: number }>({ content: 2, language: 2 });
  const [w2, setW2] = useState<{ content: number; organisation: number; language: number }>({
    content: 2,
    organisation: 2,
    language: 2,
  });
  const [w3, setW3] = useState<{ content: number; register: number; organisation: number; language: number }>({
    content: 2,
    register: 2,
    organisation: 2,
    language: 2,
  });

  // State ghi chú & điều chỉnh xếp lớp
  const [teacherNotes, setTeacherNotes] = useState("");
  const [overrideLevel, setOverrideLevel] = useState<"Flyers" | "KET" | "PET" | "AUTO">("AUTO");
  const [adjustmentReason, setAdjustmentReason] = useState("");

  // Sync state ban đầu khi tải dữ liệu về
  React.useEffect(() => {
    if (session) {
      if (session.speakingScores?.parts) {
        setSpeakingParts(session.speakingScores.parts);
      }
      if (session.speakingScores?.criteria) {
        setSpeakingCriteria(session.speakingScores.criteria);
      }
      if (session.writingScores?.w1) {
        setW1(session.writingScores.w1);
      }
      if (session.writingScores?.w2) {
        setW2(session.writingScores.w2);
      }
      if (session.writingScores?.w3) {
        setW3(session.writingScores.w3);
      }
      if (session.teacherNotes) {
        setTeacherNotes(session.teacherNotes);
      }
      if (session.isAdjusted && session.finalLevel) {
        setOverrideLevel(session.finalLevel);
        setAdjustmentReason(session.adjustmentReason || "");
      }
    }
  }, [session]);

  // Realtime Live Preview Calculation
  const livePreview = React.useMemo(() => {
    if (!calculation?.receptive) return null;
    const { receptive } = calculation;
    const uoeCode = receptive.use_of_english?.code ?? 0;
    const readCode = receptive.reading?.code ?? 0;
    const lisCode = receptive.listening?.code ?? 0;

    // Calculate Writing code
    const t1 = w1.content + w1.language;
    const t2 = w2.content + w2.organisation + w2.language;
    let wCode = 0;
    if (t1 >= 4 && w1.content >= 2) {
      if (t2 <= 3) wCode = 1;
      else if (t2 < 6 || w2.content < 2) wCode = 1.5;
      else if (t2 < 8) wCode = 2;
      else if (!session?.extensionAllowed) wCode = 3;
      else {
        const t3 = w3.content + w3.register + w3.organisation + w3.language;
        if (t3 >= 9 && w3.content >= 2 && w3.language >= 2) wCode = 5;
        else if (t3 >= 7 && w3.content >= 2 && w3.language >= 2) wCode = 4;
        else if (t3 >= 5) wCode = 3.5;
        else wCode = 3;
      }
    }

    // Calculate Speaking code
    let sCode = 0;
    if (speakingParts.s1 === "pass") {
      if (speakingParts.s2 !== "pass") sCode = speakingParts.s2 === "partial" ? 1.5 : 1;
      else if (speakingParts.s3 !== "pass") sCode = 2;
      else if (speakingParts.s4 !== "pass") sCode = speakingParts.s4 === "partial" ? 3.5 : 3;
      else sCode = speakingParts.s5 === "pass" ? 5 : 4;
    }

    const codes = {
      use_of_english: uoeCode,
      reading: readCode,
      listening: lisCode,
      writing: wCode,
      speaking: sCode,
    };

    const sorted = [uoeCode, readCode, lisCode, wCode, sCode].sort((a, b) => a - b);
    const median = sorted[2];

    let level = "Flyers";
    if (median <= 1) {
      level = "Flyers";
    } else if (median === 1.5) {
      level = (uoeCode >= 2 || readCode >= 2) && (wCode >= 2 || sCode >= 2) ? "KET" : "Flyers";
    } else if (median <= 3) {
      level = "KET";
    } else if (median === 3.5) {
      level = uoeCode >= 3.5 && readCode >= 3.5 && (wCode >= 3 || sCode >= 3.5) ? "PET" : "KET";
    } else {
      level = "PET";
    }

    // Foundation Veto
    if (Math.min(uoeCode, readCode) <= median - 1.5) {
      if (level === "PET") level = "KET";
      else if (level === "KET") level = "Flyers";
    }
    // Productive Veto
    if (wCode <= median - 1.5 && sCode <= median - 1.5 && level === "PET") {
      level = "KET";
    }

    return {
      codes,
      median,
      level,
      wCode,
      sCode,
    };
  }, [calculation, w1, w2, w3, speakingParts, session]);

  const gradeMutation = useMutation({
    mutationFn: () =>
      cambridgeApi.gradeSession(sessionId, {
        writingScores: {
          w1,
          w2,
          w3: session?.extensionAllowed ? w3 : null,
        },
        speakingScores: {
          parts: speakingParts,
          criteria: speakingCriteria,
        },
        teacherNotes,
        finalLevel: overrideLevel !== "AUTO" ? overrideLevel : undefined,
        adjustmentReason: overrideLevel !== "AUTO" ? adjustmentReason : undefined,
      }),
    onSuccess: () => {
      refetch();
      queryClient.invalidateQueries({ queryKey: ["cambridgeSessions"] });
      setActiveTab("placement");
    },
    onError: (err: any) => {
      alert("Lỗi khi lưu điểm: " + err.message);
    },
  });

  if (isLoading || !session) {
    return (
      <Dialog open onOpenChange={onClose}>
        <DialogContent className="max-w-4xl p-12 text-center">
          <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-500">Đang tải chi tiết bài thi...</p>
        </DialogContent>
      </Dialog>
    );
  }

  const studentAnswers = (session.answers as Record<string, any>) || {};

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[92vh] overflow-y-auto p-0 rounded-2xl">
        {/* Header Modal - Refined Academic Visual Hierarchy */}
        <div className="bg-slate-900 border-b border-slate-800 text-white p-6 sticky top-0 z-20 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-blue to-indigo-600 flex items-center justify-center font-black text-white text-base shadow-md shadow-brand-blue/30 shrink-0">
                CPT
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">{session.candidateName}</h2>
                  <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                    {session.testCode}
                  </span>
                  {session.candidateGrade && (
                    <Badge className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-bold">
                      Khối: {session.candidateGrade}
                    </Badge>
                  )}
                  {livePreview && (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 shadow-xs">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                      <span className="text-xs text-slate-300 font-bold">Dự báo:</span>
                      <span className="text-xs font-black text-emerald-300 tracking-wide uppercase">
                        {livePreview.level}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400/80 font-bold">
                        (M: {livePreview.median})
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 font-medium">
                  <span>Mục tiêu: <strong className="text-slate-200">{session.targetLevel || "Flyers"}</strong></span>
                  <span>•</span>
                  <span>Trạng thái: <strong className="text-slate-200">{session.status}</strong></span>
                  <span>•</span>
                  <span>Trắc nghiệm: <strong className="text-emerald-400 font-bold">{session.objectiveScore?.totalCorrect || 0}/{session.objectiveScore?.totalItems || 0}</strong> câu đúng</span>
                  {livePreview && (
                    <>
                      <span>•</span>
                      <span className="font-mono text-[11px] text-slate-300">
                        Codes: Đọc {livePreview.codes.reading} | Nghe {livePreview.codes.listening} | Viết {livePreview.codes.writing} | Nói {livePreview.codes.speaking}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <Button
              onClick={() => gradeMutation.mutate()}
              disabled={gradeMutation.isPending}
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold shadow-lg shadow-emerald-950/40 px-5 rounded-xl cursor-pointer active:scale-95 transition-all shrink-0"
            >
              <Save className="w-4 h-4 mr-2" />
              {gradeMutation.isPending ? "Đang lưu..." : "Lưu & Xem Xếp Lớp"}
            </Button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 bg-slate-50/50">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 bg-slate-200/80 p-1.5 rounded-2xl border border-slate-300/60 shadow-inner">
              <TabsTrigger
                value="speaking"
                className="font-extrabold text-xs sm:text-sm py-2.5 rounded-xl data-[state=active]:bg-white data-[state=active]:text-brand-blue data-[state=active]:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Mic className="w-4 h-4 shrink-0" />
                <span>1. Chấm Speaking</span>
              </TabsTrigger>
              <TabsTrigger
                value="writing"
                className="font-extrabold text-xs sm:text-sm py-2.5 rounded-xl data-[state=active]:bg-white data-[state=active]:text-brand-blue data-[state=active]:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <PenTool className="w-4 h-4 shrink-0" />
                <span>2. Chấm Writing</span>
              </TabsTrigger>
              <TabsTrigger
                value="receptive"
                className="font-extrabold text-xs sm:text-sm py-2.5 rounded-xl data-[state=active]:bg-white data-[state=active]:text-brand-blue data-[state=active]:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 shrink-0" />
                <span>3. Điểm Đọc - Nghe</span>
              </TabsTrigger>
              <TabsTrigger
                value="placement"
                className="font-extrabold text-xs sm:text-sm py-2.5 rounded-xl data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer relative"
              >
                <Award className="w-4 h-4 shrink-0" />
                <span>4. Placement Sheet</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 absolute top-2 right-2 animate-pulse" />
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: SPEAKING */}
            <TabsContent value="speaking" className="space-y-6 pt-4">
              <div className="bg-purple-50/70 border border-purple-100 rounded-xl p-4 text-xs text-purple-900">
                💡 <strong>Quy tắc khảo thí Speaking:</strong> Giáo viên chấm vấn đáp trực tiếp với học sinh qua các phần S1 đến S5. Dừng lại nếu học sinh không đạt (Fail ở S1 thì S2-S5 chọn <em>not_asked</em>). Điểm code Speaking được tính tự động từ checklist các phần.
              </div>

              {/* Bảng checklist S1-S5 */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-4 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <Mic className="w-4 h-4 text-brand-blue" />
                    <span>Checklist Đánh giá các Part Vấn đáp (S1 – S5)</span>
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">Bắt buộc đánh giá từ S1 để xác định thang trình độ</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3.5">
                  {[
                    { id: "s1", label: "Part S1 (Band F)", badge: "Flyers", desc: "Hỏi đáp thông tin Lily (Card A)" },
                    { id: "s2", label: "Part S2 (Band F/K)", badge: "A2 Core", desc: "Hỏi đáp thông tin Peter (Card B)" },
                    { id: "s3", label: "Part S3 (Band K+)", badge: "A2 Plus", desc: "Chọn đồ vật thích hợp (Card C)" },
                    { id: "s4", label: "Part S4 (Band P-)", badge: "B1 Core", desc: "Kể chuyện qua tranh (Card D)" },
                    { id: "s5", label: "Part S5 (Band P)", badge: "B1 Plus", desc: "Thảo luận mở rộng / Quan điểm" },
                  ].map((part) => {
                    const status = speakingParts[part.id];
                    const isPass = status === "pass";
                    const isPartial = status === "partial";
                    const isFail = status === "fail";

                    return (
                      <div
                        key={part.id}
                        className={cn(
                          "border rounded-xl p-3.5 flex flex-col justify-between transition-all shadow-2xs space-y-3",
                          isPass
                            ? "bg-emerald-50/60 border-emerald-300 ring-1 ring-emerald-200"
                            : isPartial
                            ? "bg-amber-50/60 border-amber-300 ring-1 ring-amber-200"
                            : isFail
                            ? "bg-red-50/60 border-red-300"
                            : "bg-white border-slate-200 hover:border-slate-300",
                        )}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-black text-xs text-slate-900">{part.label}</span>
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                              {part.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 font-medium leading-snug">{part.desc}</p>
                        </div>
                        <Select
                          value={speakingParts[part.id]}
                          onValueChange={(val) => setSpeakingParts({ ...speakingParts, [part.id]: val })}
                        >
                          <SelectTrigger className="bg-white text-xs font-bold h-8.5 rounded-lg border-slate-300 shadow-2xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pass" className="text-emerald-700 font-bold">✓ Pass (Đạt)</SelectItem>
                            <SelectItem value="partial" className="text-amber-700 font-bold">~ Partial (Một phần)</SelectItem>
                            <SelectItem value="fail" className="text-red-700 font-bold">✗ Fail (Chưa đạt)</SelectItem>
                            <SelectItem value="not_asked" className="text-slate-500">○ Not asked (Chưa hỏi)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 4 Tiêu chí tham chiếu */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-3.5 shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="font-extrabold text-slate-900 text-sm">
                    Điểm 4 Tiêu chí Tham chiếu (Thang điểm 0 – 5)
                  </h3>
                  <span className="text-xs text-slate-500">Dùng hỗ trợ đánh giá chi tiết báo cáo phụ huynh</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { key: "grammar_vocabulary", label: "Ngữ pháp & Từ vựng" },
                    { key: "pronunciation", label: "Phát âm (Pronunciation)" },
                    { key: "interaction", label: "Tương tác (Interaction)" },
                    { key: "fluency_discourse", label: "Độ trôi chảy (Fluency)" },
                  ].map((c) => (
                    <div key={c.key} className="space-y-1.5 p-3 rounded-xl bg-slate-50/70 border border-slate-200">
                      <Label className="text-xs font-bold text-slate-700 block">{c.label}</Label>
                      <Input
                        type="number"
                        min={0}
                        max={5}
                        className="bg-white font-mono font-bold text-sm text-center h-9"
                        value={speakingCriteria[c.key] ?? 3}
                        onChange={(e) =>
                          setSpeakingCriteria({
                            ...speakingCriteria,
                            [c.key]: Number(e.target.value),
                          })
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Thẻ tài liệu Speaking Cards (Lily, Peter, C, D) */}
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs uppercase text-slate-600">
                    Tài liệu thẻ hình ảnh phục vụ khảo thí (Examiner Cards)
                  </h4>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <span className="font-bold text-purple-700">Card A (Lily - Đáp án):</span>
                    <ul className="list-disc pl-4 text-slate-600 mt-1 space-y-0.5">
                      <li>Age: 10</li>
                      <li>Lives in: Hue</li>
                      <li>Sport: Swimming</li>
                      <li>Brothers: 2 brothers</li>
                      <li>Breakfast: Bread and milk</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <span className="font-bold text-indigo-700">Card B (Peter - Hỏi):</span>
                    <ul className="list-disc pl-4 text-slate-600 mt-1 space-y-0.5">
                      <li>Age: 12</li>
                      <li>Lives in: Da Lat</li>
                      <li>Likes: playing guitar</li>
                      <li>Sisters: 1 sister</li>
                      <li>Food: pizza</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <span className="font-bold text-teal-700">Card C (4 Đồ vật):</span>
                    <div className="grid grid-cols-2 gap-1 mt-2">
                      <img src="/cambridge/images/book.png" alt="book" className="h-10 object-contain rounded" />
                      <img src="/cambridge/images/cake.png" alt="cake" className="h-10 object-contain rounded" />
                      <img src="/cambridge/images/ticket.png" alt="ticket" className="h-10 object-contain rounded" />
                      <img src="/cambridge/images/tshirt.png" alt="tshirt" className="h-10 object-contain rounded" />
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <span className="font-bold text-amber-700">Card D (Story):</span>
                    <div className="mt-2">
                      <img src="/cambridge/images/story.png" alt="story" className="h-14 object-contain rounded border" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Dòng chảy chuyển bước (Next Step Flow) */}
              <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
                <div className="text-xs text-slate-500 font-medium">
                  Đã đánh giá xong Speaking? Hãy chuyển sang chấm bài viết của thí sinh.
                </div>
                <Button
                  type="button"
                  onClick={() => {
                    setActiveTab("writing");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="bg-brand-blue hover:bg-brand-blue/90 text-white font-extrabold text-xs gap-2 px-5 py-2 rounded-xl cursor-pointer"
                >
                  <span>Tiếp tục: Chấm bài Writing</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </TabsContent>

            {/* TAB 2: WRITING */}
            <TabsContent value="writing" className="space-y-6 pt-4">
              <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4 text-xs text-blue-900">
                📖 <strong>Chuẩn hóa khảo thí Writing:</strong> Giáo viên chấm dựa trên các tiêu chí mô tả hành vi quan sát được (Descriptive Rubric). Điểm số 0 - 3 tương ứng với mức độ đáp ứng yêu cầu đề bài và độ chính xác ngôn ngữ thực tế.
              </div>

              {/* Task W1 */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-4 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black text-brand-blue bg-brand-blue/10 px-2 py-0.5 rounded border border-brand-blue/20">
                        TASK W1
                      </span>
                      <span className="font-extrabold text-slate-900 text-sm">
                        Best Friend (Band F – Flyers Core)
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 font-medium">
                      Yêu cầu: Viết 20–30 từ. Từ gợi ý: <em>name, tall, likes, plays, at the weekend</em>
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs font-bold bg-slate-50 text-slate-700 border-slate-300 self-start sm:self-auto">
                    Tiêu chuẩn Pass: Tổng &ge; 4 &amp; Nội dung &ge; 2
                  </Badge>
                </div>

                {/* Bài làm của học sinh */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Bài làm của học sinh:
                  </span>
                  <div className="bg-slate-50 p-4 rounded-xl text-xs sm:text-sm font-sans text-slate-800 border border-slate-200 leading-relaxed min-h-[56px]">
                    {studentAnswers["W1"] ? (
                      <span className="font-medium text-slate-900">{studentAnswers["W1"]}</span>
                    ) : (
                      <span className="text-slate-400 italic font-normal">Học sinh chưa nộp bài W1</span>
                    )}
                  </div>
                </div>

                {/* Rubric tham chiếu W1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-black text-slate-800">Nội dung (Content: 0–3)</Label>
                      <Select
                        value={String(w1.content)}
                        onValueChange={(val) => setW1({ ...w1, content: Number(val) })}
                      >
                        <SelectTrigger className="w-32 h-8 text-xs bg-white font-extrabold shadow-2xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3 - Đầy đủ (Full)</SelectItem>
                          <SelectItem value="2">2 - Khá (Good)</SelectItem>
                          <SelectItem value="1">1 - Sơ sài (Basic)</SelectItem>
                          <SelectItem value="0">0 - Lạc đề / Rỗng</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                      {w1.content === 3 && "✓ Trả lời đủ các ý gợi ý (tên, ngoại hình, sở thích, cuối tuần), thông tin rõ ràng."}
                      {w1.content === 2 && "✓ Nêu được 2-3 ý chính, người đọc hiểu được dù có ý còn thiếu sót."}
                      {w1.content === 1 && "⚠️ Chỉ viết được 1 ý rất ngắn hoặc không dùng các từ gợi ý."}
                      {w1.content === 0 && "❌ Hoàn toàn không liên quan đến đề bài hoặc bỏ trống."}
                    </p>
                  </div>

                  <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-black text-slate-800">Ngôn ngữ (Language: 0–3)</Label>
                      <Select
                        value={String(w1.language)}
                        onValueChange={(val) => setW1({ ...w1, language: Number(val) })}
                      >
                        <SelectTrigger className="w-32 h-8 text-xs bg-white font-extrabold shadow-2xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3 - Chuẩn (Accurate)</SelectItem>
                          <SelectItem value="2">2 - Đạt (Understandable)</SelectItem>
                          <SelectItem value="1">1 - Yếu (Errors)</SelectItem>
                          <SelectItem value="0">0 - Sai hoàn toàn</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                      {w1.language === 3 && "✓ Câu đúng cấu trúc thì hiện tại đơn, từ vựng cơ bản viết đúng chính tả."}
                      {w1.language === 2 && "✓ Có vài lỗi ngữ pháp hoặc chính tả nhỏ nhưng không cản trở việc hiểu."}
                      {w1.language === 1 && "⚠️ Nhiều lỗi ngữ pháp cơ bản (is/are, ngôi thứ 3 số ít), từ vựng vụn vặt."}
                      {w1.language === 0 && "❌ Ngữ pháp sai nghiêm trọng, không thể hiểu nội dung."}
                    </p>
                  </div>
                </div>

                <div className="text-xs text-slate-500 font-bold text-right pt-1 border-t border-slate-100">
                  Tổng điểm W1: <span className="text-brand-blue font-black text-sm">{w1.content + w1.language} / 6</span>
                </div>
              </div>

              {/* Task W2 */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-4 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                        TASK W2
                      </span>
                      <span className="font-extrabold text-slate-900 text-sm">
                        Email to Sam (Band K – Key / A2 Core)
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 font-medium">
                      Yêu cầu: Viết 30–40 từ trả lời: (1) Nơi nên đến? (2) Món ăn nên thử? (3) Khi nào gặp nhau?
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs font-bold bg-slate-50 text-slate-700 border-slate-300 self-start sm:self-auto">
                    Tiêu chuẩn Pass: Tổng &ge; 6 &amp; Nội dung &ge; 2 | Plus: &ge; 8
                  </Badge>
                </div>

                {/* Bài làm của học sinh */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Bài làm của học sinh:
                  </span>
                  <div className="bg-slate-50 p-4 rounded-xl text-xs sm:text-sm font-sans text-slate-800 border border-slate-200 leading-relaxed min-h-[56px]">
                    {studentAnswers["W2"] ? (
                      <span className="font-medium text-slate-900">{studentAnswers["W2"]}</span>
                    ) : (
                      <span className="text-slate-400 italic font-normal">Học sinh chưa nộp bài W2</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
                  <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-black text-slate-800">Nội dung (0–3)</Label>
                      <Select
                        value={String(w2.content)}
                        onValueChange={(val) => setW2({ ...w2, content: Number(val) })}
                      >
                        <SelectTrigger className="w-28 h-8 text-xs bg-white font-extrabold shadow-2xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3 - Đủ 3 câu</SelectItem>
                          <SelectItem value="2">2 - Trả lời 2 câu</SelectItem>
                          <SelectItem value="1">1 - Trả lời 1 câu</SelectItem>
                          <SelectItem value="0">0 - Lạc đề</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                      {w2.content === 3 && "✓ Trả lời trọn vẹn cả 3 câu hỏi của Sam."}
                      {w2.content === 2 && "✓ Trả lời được 2 trong 3 câu hỏi của Sam."}
                      {w2.content === 1 && "⚠️ Chỉ trả lời được 1 câu hỏi, bỏ qua 2 câu còn lại."}
                      {w2.content === 0 && "❌ Không trả lời câu hỏi nào."}
                    </p>
                  </div>

                  <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-black text-slate-800">Bố cục (0–3)</Label>
                      <Select
                        value={String(w2.organisation)}
                        onValueChange={(val) => setW2({ ...w2, organisation: Number(val) })}
                      >
                        <SelectTrigger className="w-28 h-8 text-xs bg-white font-extrabold shadow-2xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3 - Email chuẩn</SelectItem>
                          <SelectItem value="2">2 - Có kết nối</SelectItem>
                          <SelectItem value="1">1 - Rời rạc</SelectItem>
                          <SelectItem value="0">0 - Không bố cục</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                      {w2.organisation === 3 && "✓ Có chào hỏi, câu nối liên kết mạch lạc (and, but, because)."}
                      {w2.organisation === 2 && "✓ Bố cục rõ ràng, câu viết nối tiếp tương đối mạch lạc."}
                      {w2.organisation === 1 && "⚠️ Các câu rời rạc, chưa có từ nối email cơ bản."}
                      {w2.organisation === 0 && "❌ Viết không thành câu, từ ngữ lộn xộn."}
                    </p>
                  </div>

                  <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-black text-slate-800">Ngôn ngữ (0–3)</Label>
                      <Select
                        value={String(w2.language)}
                        onValueChange={(val) => setW2({ ...w2, language: Number(val) })}
                      >
                        <SelectTrigger className="w-28 h-8 text-xs bg-white font-extrabold shadow-2xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3 - Đa dạng</SelectItem>
                          <SelectItem value="2">2 - Đủ ý</SelectItem>
                          <SelectItem value="1">1 - Hạn chế</SelectItem>
                          <SelectItem value="0">0 - Quá yếu</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                      {w2.language === 3 && "✓ Từ vựng phù hợp, cấu trúc câu tự nhiên, rất ít lỗi."}
                      {w2.language === 2 && "✓ Sử dụng từ ngữ thường gặp, ngữ pháp cơ bản kiểm soát tốt."}
                      {w2.language === 1 && "⚠️ Lặp từ, nhiều lỗi chính tả và chia động từ cơ bản."}
                      {w2.language === 0 && "❌ Quá nhiều lỗi khiến không thể hiểu ý."}
                    </p>
                  </div>
                </div>

                <div className="text-xs text-slate-500 font-bold text-right pt-1 border-t border-slate-100">
                  Tổng điểm W2: <span className="text-indigo-600 font-black text-sm">{w2.content + w2.organisation + w2.language} / 9</span>
                </div>
              </div>

              {/* Task W3 (Extension) */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-slate-800 text-sm">
                    Task W3 (Band P - Extension) • Email to Alex (~100 words)
                  </div>
                  {session.extensionAllowed ? (
                    <Badge className="bg-purple-100 text-purple-800 border-none text-xs">
                      Học sinh đã làm phần Extension
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-slate-400 text-xs">
                      Không thi Extension (N/A)
                    </Badge>
                  )}
                </div>
                {session.extensionAllowed ? (
                  <>
                    <div className="bg-slate-50 p-3 rounded-lg text-xs font-mono text-slate-800 border">
                      {studentAnswers["W3"] || <span className="text-slate-400 italic">Học sinh chưa nộp bài W3</span>}
                    </div>
                    <div className="grid grid-cols-4 gap-3 pt-2">
                      <div>
                        <Label className="text-xs">Nội dung (0-3)</Label>
                        <Input
                          type="number"
                          min={0}
                          max={3}
                          value={w3.content}
                          onChange={(e) => setW3({ ...w3, content: Number(e.target.value) })}
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Văn phong (0-3)</Label>
                        <Input
                          type="number"
                          min={0}
                          max={3}
                          value={w3.register}
                          onChange={(e) => setW3({ ...w3, register: Number(e.target.value) })}
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Bố cục (0-3)</Label>
                        <Input
                          type="number"
                          min={0}
                          max={3}
                          value={w3.organisation}
                          onChange={(e) => setW3({ ...w3, organisation: Number(e.target.value) })}
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Ngôn ngữ (0-3)</Label>
                        <Input
                          type="number"
                          min={0}
                          max={3}
                          value={w3.language}
                          onChange={(e) => setW3({ ...w3, language: Number(e.target.value) })}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-xs text-slate-400 italic">
                    Học sinh không đủ điều kiện hoặc không tham gia phần Extension, bỏ qua chấm W3.
                  </p>
                )}
              </div>

              {/* Dòng chảy chuyển bước sang Placement Sheet */}
              <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
                <div className="text-xs text-slate-500 font-medium">
                  Đã hoàn tất chấm Writing? Hãy xem Phiếu Xếp Lớp tổng hợp 5 kỹ năng.
                </div>
                <div className="flex items-center gap-2.5">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setActiveTab("placement");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="font-extrabold text-xs gap-1.5 px-4 rounded-xl cursor-pointer"
                  >
                    <span>Xem Phiếu Xếp Lớp</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    onClick={() => gradeMutation.mutate()}
                    disabled={gradeMutation.isPending}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs gap-1.5 px-5 rounded-xl cursor-pointer shadow-md shadow-emerald-950/20"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Lưu & Chốt Xếp Lớp</span>
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* TAB 3: RECEPTIVE */}
            <TabsContent value="receptive" className="space-y-4 pt-4">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <h3 className="font-bold text-slate-800 text-sm mb-3">
                  Kết quả phân tích các kỹ năng Tiếp nhận (Receptive Skills)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { key: "use_of_english", label: "Use of English" },
                    { key: "reading", label: "Reading" },
                    { key: "listening", label: "Listening" },
                  ].map((skill) => {
                    const skData = calculation?.receptive?.[skill.key];
                    return (
                      <div key={skill.key} className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 text-sm">{skill.label}</span>
                          <Badge className="bg-indigo-50 text-indigo-700 font-bold">
                            Code: {skData?.code ?? "Chưa tính"}
                          </Badge>
                        </div>
                        {skData?.bands && (
                          <div className="text-xs space-y-1 text-slate-600 pt-2 border-t">
                            {Object.entries(skData.bands).map(([b, res]: any) => (
                              <div key={b} className="flex justify-between">
                                <span className="font-mono font-medium">Band {b}:</span>
                                <span
                                  className={
                                    res === "pass"
                                      ? "text-emerald-600 font-bold"
                                      : res === "partial"
                                      ? "text-amber-600 font-bold"
                                      : "text-red-500 font-bold"
                                  }
                                >
                                  {res || "N/A"}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                        {skData?.inversion && (
                          <div className="text-[11px] text-amber-700 bg-amber-50 p-1.5 rounded mt-2">
                            ⚠️ Có hiện tượng đảo Band (Inversion F1)
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </TabsContent>

            {/* TAB 4: PLACEMENT SHEET */}
            <TabsContent value="placement" className="space-y-6 pt-4">
              {calculation?.placement ? (
                <div className="space-y-6">
                  {/* Banner Kết Quả Đề Xuất */}
                  <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <div className="text-xs text-purple-200 uppercase font-bold tracking-wider">
                        Đề xuất xếp lớp tự động (Algorithm Placement)
                      </div>
                      <div className="text-3xl font-black mt-1 flex items-center gap-3">
                        {calculation.placement.level}
                        <Badge className="bg-white/20 text-white font-mono text-sm">
                          Median: {calculation.placement.median}
                        </Badge>
                      </div>
                      <p className="text-xs text-purple-200 mt-1">
                        Dựa trên 5 kĩ năng: UoE ({calculation.receptive.use_of_english.code}), Reading ({calculation.receptive.reading.code}), Listening ({calculation.receptive.listening.code}), Writing ({calculation.writing.code}), Speaking ({calculation.speaking.code})
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-purple-200">Cấp độ hiện tại lưu trong hệ thống:</div>
                      <div className="text-xl font-black text-amber-300">
                        {session.finalLevel || calculation.placement.level}
                        {session.isAdjusted && " (Đã điều chỉnh)"}
                      </div>
                    </div>
                  </div>

                  {/* Flags & Vetoes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl border border-slate-200 p-4">
                      <h4 className="font-bold text-xs uppercase text-slate-500 mb-2">
                        Cờ cảnh báo (Flags F1 – F6)
                      </h4>
                      {calculation.placement.flags.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {calculation.placement.flags.map((f: string) => (
                            <Badge key={f} variant="outline" className="bg-amber-50 text-amber-800 border-amber-300">
                              {f}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400">Không có cờ cảnh báo</span>
                      )}
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 p-4">
                      <h4 className="font-bold text-xs uppercase text-slate-500 mb-2">
                        Quyền phủ quyết (Vetoes V1 – V3)
                      </h4>
                      {calculation.placement.vetoes.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {calculation.placement.vetoes.map((v: string) => (
                            <Badge key={v} variant="destructive">
                              {v}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400">Không bị Veto</span>
                      )}
                    </div>
                  </div>

                  {/* Kỹ năng cần củng cố */}
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs space-y-2">
                    <div className="font-bold text-slate-700">Điểm yếu cần bồi dưỡng / Hỗ trợ:</div>
                    <div className="flex flex-wrap gap-2">
                      {calculation.placement.criticalWeakness.length > 0 && (
                        <span className="text-red-600 font-semibold">
                          Điểm yếu nghiêm trọng: {calculation.placement.criticalWeakness.join(", ")}
                        </span>
                      )}
                      {calculation.placement.needsSupport.length > 0 && (
                        <span className="text-amber-700 font-semibold">
                          Cần hỗ trợ thêm: {calculation.placement.needsSupport.join(", ")}
                        </span>
                      )}
                      {calculation.placement.skillsToStrengthenBeforeNextLevel.length > 0 && (
                        <span className="text-blue-700 font-semibold">
                          Cần củng cố trước cấp độ tiếp theo: {calculation.placement.skillsToStrengthenBeforeNextLevel.join(", ")}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quyết định của Giáo viên & Điều chỉnh */}
                  <div className="bg-white rounded-xl border-2 border-indigo-100 p-5 space-y-4">
                    <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-indigo-600" />
                      Quyết định & Điều chỉnh của Giáo viên (Audit Logged)
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs font-semibold">Điều chỉnh Cấp độ Xếp lớp (Tối đa 1 bậc)</Label>
                        <Select
                          value={overrideLevel}
                          onValueChange={(val: any) => setOverrideLevel(val)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="AUTO">Theo đề xuất hệ thống ({calculation.placement.level})</SelectItem>
                            <SelectItem value="Flyers">Flyers (A2-)</SelectItem>
                            <SelectItem value="KET">KET (A2)</SelectItem>
                            <SelectItem value="PET">PET (B1)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {overrideLevel !== "AUTO" && overrideLevel !== calculation.placement.level && (
                        <div className="space-y-2">
                          <Label className="text-xs font-semibold text-amber-700">Lý do điều chỉnh (Bắt buộc) *</Label>
                          <Input
                            placeholder="Ghi rõ lý do điều chỉnh cấp độ..."
                            value={adjustmentReason}
                            onChange={(e) => setAdjustmentReason(e.target.value)}
                            className="mt-1 border-amber-300"
                          />
                        </div>
                      )}
                    </div>

                    {/* Cảnh báo Sư phạm Chuyên sâu (Veto Warning) */}
                    {overrideLevel !== "AUTO" && overrideLevel !== calculation.placement.level && (
                      <div className="p-3 rounded-lg border border-amber-200 bg-amber-50/80 space-y-1.5 text-xs text-amber-900">
                        <div className="font-bold flex items-center gap-1.5 text-amber-800">
                          <AlertTriangle className="w-4 h-4 text-amber-600" /> Cảnh báo Khảo thí & Rủi ro Sư phạm:
                        </div>
                        {calculation.placement.vetoes.includes("V1_foundation") && (
                          <p>
                            ⚠️ <strong>V1 Foundation Veto:</strong> Học sinh bị hổng nền tảng Ngữ pháp/Đọc hiểu so với trung vị. Việc nâng cấp độ có nguy cơ khiến học sinh bị quá tải bài giảng trên lớp.
                          </p>
                        )}
                        {calculation.placement.vetoes.includes("V2_productive") && (
                          <p>
                            ⚠️ <strong>V2 Productive Veto:</strong> Kỹ năng Viết hoặc Nói của học sinh còn yếu so với mức yêu cầu của lớp trên.
                          </p>
                        )}
                        {calculation.placement.vetoes.includes("V3_ceiling") && (
                          <p>
                            ⚠️ <strong>V3 Ceiling Veto:</strong> Điểm năng lực trần chưa đạt chuẩn.
                          </p>
                        )}
                        <p className="text-[11px] text-amber-700 italic">
                          Hệ thống sẽ lưu lại lý do và danh tính giáo viên điều chỉnh vào lịch sử kiểm toán (Audit Trail).
                        </p>
                      </div>
                    )}

                    <div>
                      <Label className="text-xs font-semibold">Ghi chú nhận xét của giáo viên</Label>
                      <Textarea
                        placeholder="Nhận xét tổng quan năng lực học sinh..."
                        value={teacherNotes}
                        onChange={(e) => setTeacherNotes(e.target.value)}
                        className="mt-1 text-xs"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                  <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                  <h4 className="font-bold text-slate-700">Chưa đủ dữ liệu để tính Placement Sheet</h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                    Vui lòng hoàn thành chấm điểm cả hai kỹ năng <strong>Speaking</strong> và <strong>Writing</strong>, sau đó bấm <em>"Lưu & Tính xếp lớp"</em> để hệ thống xuất Placement Sheet hoàn chỉnh.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
