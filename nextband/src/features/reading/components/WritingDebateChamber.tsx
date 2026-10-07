import React, { useState, useEffect } from "react";
import { 
  MessageSquare, 
  ThumbsUp, 
  Send, 
  Sparkles, 
  PenTool, 
  ShieldAlert, 
  HelpCircle,
  TrendingUp,
  Clock,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";

export interface DiscussionItem {
  id: string;
  caseId: string;
  authorName: string;
  authorBadge?: string | null;
  content: string;
  type: string;
  upvotes: number;
  createdAt: string;
}

const TASK2_WRITING_PROMPTS: Record<string, { topic: string; prompt: string; tips: string }> = {
  "case-001": {
    topic: "Environment & Climate Research",
    prompt: "Some scientists believe that environmental changes should be tackled primarily through international technological interventions, while others argue local policy enforcement is paramount. Discuss both views and give your opinion.",
    tips: "Tận dụng các luận điểm về dữ liệu cảm biến ngầm và tính cấp thiết của cảnh báo sớm từ dải băng Greenland.",
  },
  "case-002": {
    topic: "Human Skills vs Artificial Intelligence",
    prompt: "As artificial intelligence automates cognitive and technical tasks, interpersonal communication is becoming the most critical asset for leaders. To what extent do you agree or disagree?",
    tips: "Vận dụng luận điểm 'compounding trust' và 'customers buy confidence, not products' từ Warren Buffett.",
  },
  "case-003": {
    topic: "Generative AI & The Future of Intellectual Work",
    prompt: "Generative artificial intelligence tools are rapidly transforming creative and knowledge industries. Do the advantages of this trend outweigh its disadvantages for society?",
    tips: "Vận dụng khái niệm 'cognitive atrophy' và 'labour market polarisation' để viết đoạn phản biện (counter-argument).",
  },
  "case-004": {
    topic: "EdTech & Deep Reading in Modern Classrooms",
    prompt: "Many schools are replacing traditional physical textbooks with digital tablets and online learning platforms. Discuss the advantages and disadvantages.",
    tips: "Phân tích sự đối lập giữa 'deep reading circuits' và 'hyper-skimming', kết hợp bài học quay lại sách giấy từ Bắc Âu.",
  },
  "case-005": {
    topic: "Technology vs Structural Reform in Climate Crisis",
    prompt: "Some people believe that green technology (such as electric vehicles and renewable energy) alone can solve global climate issues. Others argue that changing economic systems and lifestyles is necessary. Discuss both views.",
    tips: "Trích xuất luận cứ về Nghịch lý Jevons (Jevons Paradox) và ranh giới sinh thái hữu hạn (biophysical boundaries).",
  },
  "case-006": {
    topic: "Digital Hyperconnectivity & The Loneliness Epidemic",
    prompt: "Despite having access to modern social networking platforms, people today feel more lonely and isolated than ever before. What are the causes of this phenomenon, and what measures can be taken to resolve it?",
    tips: "Sử dụng khái niệm 'parasocial bonds' và sự suy giảm của các 'Third Places' (không gian cộng đồng công cộng) làm nguyên nhân gốc rễ.",
  },
};

interface WritingDebateChamberProps {
  caseId: string;
}

export function WritingDebateChamber({ caseId }: WritingDebateChamberProps) {
  const [discussions, setDiscussions] = useState<DiscussionItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterMode, setFilterMode] = useState<"top" | "newest">("top");
  
  // Form states
  const [authorName, setAuthorName] = useState("");
  const [authorBadge, setAuthorBadge] = useState("Target 7.5+");
  const [contributionType, setContributionType] = useState<"THESIS_IDEA" | "COUNTER_ARG" | "VOCAB_QUESTION">("THESIS_IDEA");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  // Local upvoted set to prevent spamming
  const [upvotedIds, setUpvotedIds] = useState<Set<string>>(() => new Set());

  const promptInfo = TASK2_WRITING_PROMPTS[caseId] || TASK2_WRITING_PROMPTS["case-003"];

  // Fetch discussions
  const fetchDiscussions = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/reading-discussions/${caseId}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setDiscussions(json.data);
          return;
        }
      }
      // Fallback local mock if backend route not reached yet
      setDiscussions((prev) => prev.length > 0 ? prev : []);
    } catch {
      // Graceful fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscussions();
  }, [caseId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !authorName.trim()) return;

    setSubmitting(true);
    try {
      const payload = {
        caseId,
        authorName: authorName.trim(),
        authorBadge,
        content: content.trim(),
        type: contributionType,
      };

      const res = await fetch("/api/reading-discussions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setDiscussions((prev) => [json.data, ...prev]);
        }
      } else {
        // Fallback optimistic UI
        const optimistic: DiscussionItem = {
          id: `opt-${Date.now()}`,
          caseId,
          authorName: authorName.trim(),
          authorBadge,
          content: content.trim(),
          type: contributionType,
          upvotes: 0,
          createdAt: new Date().toISOString(),
        };
        setDiscussions((prev) => [optimistic, ...prev]);
      }

      setContent("");
      setSuccessToast(true);
      setTimeout(() => setSuccessToast(false), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpvote = async (id: string) => {
    if (upvotedIds.has(id)) return;

    setUpvotedIds((prev) => new Set(prev).add(id));
    setDiscussions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, upvotes: item.upvotes + 1 } : item))
    );

    try {
      await fetch(`/api/reading-discussions/${id}/upvote`, { method: "POST" });
    } catch {
      // optimistic state retained
    }
  };

  const sortedList = [...discussions].sort((a, b) => {
    if (filterMode === "top") return b.upvotes - a.upvotes;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <section className="mt-12 pt-8 border-t border-stone-200/90 space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl bg-linear-to-br from-[#FAF8F5] via-[#F4EFE6] to-[#EAE3D6] p-5 sm:p-6 border border-stone-300/80 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#2D2825] text-amber-200 shadow-xs">
              <PenTool className="h-4 w-4" />
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-stone-800">
              Góc Luận Điểm IELTS Task 2 & Tranh Biện Học Thuật
            </span>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-amber-100/90 text-amber-900 border border-amber-300/60 font-semibold">
            {promptInfo.topic}
          </span>
        </div>

        {/* Writing Prompt Box */}
        <div className="p-3.5 rounded-xl bg-white/95 border border-stone-200/90 space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
            🎯 Đề thi IELTS Writing Task 2 tương ứng:
          </p>
          <p className="font-serif text-sm sm:text-base font-bold text-stone-900 leading-snug">
            "{promptInfo.prompt}"
          </p>
          <p className="text-xs text-stone-600 italic">
            💡 Gợi ý áp dụng từ bài đọc: {promptInfo.tips}
          </p>
        </div>
      </div>

      {/* Contribution Form */}
      <div className="rounded-2xl bg-white border border-stone-200 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-black uppercase tracking-wider text-stone-800 flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-[#C86D51]" />
            Đóng góp góc nhìn / Dàn ý của bạn
          </h4>
          <span className="text-[11px] text-stone-500 font-light hidden sm:inline">
            Bình luận được lưu vĩnh viễn cho cộng đồng
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setContributionType("THESIS_IDEA")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                contributionType === "THESIS_IDEA"
                  ? "bg-[#2D2825] text-white shadow-xs"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              💡 Luận điểm / Thesis Statement
            </button>
            <button
              type="button"
              onClick={() => setContributionType("COUNTER_ARG")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                contributionType === "COUNTER_ARG"
                  ? "bg-[#C86D51] text-white shadow-xs"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              <ShieldAlert className="h-3.5 w-3.5" />
              🛡️ Phản biện (Counter-Argument)
            </button>
            <button
              type="button"
              onClick={() => setContributionType("VOCAB_QUESTION")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                contributionType === "VOCAB_QUESTION"
                  ? "bg-sky-800 text-white shadow-xs"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              <HelpCircle className="h-3.5 w-3.5" />
              ❓ Thắc mắc cấu trúc / Từ vựng
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Tên của bạn hoặc Biệt danh học thuật *"
              required
              maxLength={60}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#C86D51]/30 transition"
            />
            <input
              type="text"
              value={authorBadge}
              onChange={(e) => setAuthorBadge(e.target.value)}
              placeholder="Mục tiêu / Danh xưng (VD: Học Sĩ · Target 8.0)"
              maxLength={40}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#C86D51]/30 transition"
            />
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Chia sẻ dàn ý Task 2 bạn vừa đúc kết từ bài đọc, cách bạn đưa collocations vào bài luận, hoặc góc nhìn phản biện..."
            required
            rows={3}
            className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#C86D51]/30 transition leading-relaxed resize-y"
          />

          <div className="flex items-center justify-between pt-1">
            {successToast ? (
              <span className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold animate-in fade-in">
                <CheckCircle2 className="h-4 w-4" /> Luận điểm đã được ghi nhận vào kho tri thức!
              </span>
            ) : (
              <span className="text-[11px] text-stone-400">
                Hãy viết văn minh, đậm chất học thuật
              </span>
            )}
            <Button
              type="submit"
              disabled={submitting || !content.trim() || !authorName.trim()}
              className="px-4 py-2 rounded-xl bg-[#2D2825] hover:bg-stone-800 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Send className="h-3.5 w-3.5" />
              {submitting ? "Đang gửi..." : "Đăng luận điểm"}
            </Button>
          </div>
        </form>
      </div>

      {/* Discussion Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-stone-200/80">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-stone-700">
              Cộng Đồng Chiêm Nghiệm
            </span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-stone-200 text-stone-700 font-bold">
              {discussions.length}
            </span>
          </div>

          <div className="flex items-center gap-1 bg-stone-200/80 p-0.5 rounded-lg text-[11px]">
            <button
              onClick={() => setFilterMode("top")}
              className={`px-2.5 py-1 rounded-md font-bold transition cursor-pointer flex items-center gap-1 ${
                filterMode === "top" ? "bg-white text-stone-900 shadow-xs" : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <TrendingUp className="h-3 w-3" /> Hữu ích nhất
            </button>
            <button
              onClick={() => setFilterMode("newest")}
              className={`px-2.5 py-1 rounded-md font-bold transition cursor-pointer flex items-center gap-1 ${
                filterMode === "newest" ? "bg-white text-stone-900 shadow-xs" : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <Clock className="h-3 w-3" /> Mới nhất
            </button>
          </div>
        </div>

        {/* Items List */}
        {loading && discussions.length === 0 ? (
          <div className="py-8 text-center text-xs text-stone-400 font-light">
            Đang tải kho tri thức cộng đồng...
          </div>
        ) : sortedList.length === 0 ? (
          <div className="py-8 text-center rounded-2xl border border-dashed border-stone-300 p-6 bg-stone-50/50 space-y-2">
            <p className="text-xs font-bold text-stone-700">Chưa có luận điểm nào được ghi lại</p>
            <p className="text-xs text-stone-500 font-light max-w-sm mx-auto">
              Hãy là người đầu tiên để lại dàn ý hoặc ý tưởng phản biện đắt giá cho đề Writing này!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedList.map((item) => {
              const isUpvoted = upvotedIds.has(item.id);
              const badgeTypeClass =
                item.type === "COUNTER_ARG"
                  ? "bg-rose-50 text-rose-800 border-rose-200"
                  : item.type === "VOCAB_QUESTION"
                  ? "bg-sky-50 text-sky-800 border-sky-200"
                  : "bg-amber-50 text-amber-900 border-amber-200";

              const badgeTypeLabel =
                item.type === "COUNTER_ARG"
                  ? "🛡️ Phản biện"
                  : item.type === "VOCAB_QUESTION"
                  ? "❓ Thắc mắc"
                  : "💡 Luận điểm";

              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-stone-200/90 bg-white p-4 sm:p-5 shadow-xs space-y-3 hover:border-stone-300 transition"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#2D2825] text-amber-200 font-black text-xs flex items-center justify-center shrink-0">
                        {item.authorName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-stone-900">
                            {item.authorName}
                          </span>
                          {item.authorBadge && (
                            <span className="text-[10px] font-medium px-2 py-0.2 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
                              {item.authorBadge}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-stone-400 font-light">
                          {new Date(item.createdAt).toLocaleDateString("vi-VN", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${badgeTypeClass}`}>
                      {badgeTypeLabel}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-light whitespace-pre-line">
                    {item.content}
                  </p>

                  <div className="flex items-center justify-end pt-1">
                    <button
                      type="button"
                      onClick={() => handleUpvote(item.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                        isUpvoted
                          ? "bg-amber-100 text-amber-900 border border-amber-300"
                          : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                      }`}
                    >
                      <ThumbsUp className={`h-3 w-3 ${isUpvoted ? "fill-amber-600 text-amber-600" : ""}`} />
                      <span>Hữu ích ({item.upvotes})</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
