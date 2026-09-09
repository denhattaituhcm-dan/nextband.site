import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/common/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  FileCheck,
  Target,
  Sparkles,
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  ShieldCheck,
  Loader2,
  TrendingUp,
  Play,
  Volume2,
  ChevronLeft,
  MessageCircle,
  AlertCircle,
  Award,
} from "lucide-react";
import { toast } from "sonner";
import { SiteLogo } from "@/components/common/SiteLogo";
import { submitContactLead } from "@/lib/contactService";

// =========================================================================
// 12 CÂU HỎI CHẨN ĐOÁN FINGERPRINT (15 PHÚT)
// =========================================================================
interface DiagnosticQuestion {
  id: number;
  category: "Listening" | "Reading" | "Grammar" | "Logic";
  categoryLabel: string;
  skillLabel: string;
  title: string;
  context?: string;
  audioScript?: string;
  options: {
    key: "A" | "B" | "C" | "D";
    text: string;
    isCorrect: boolean;
    diagnosisNote?: string;
  }[];
}

const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 1,
    category: "Reading",
    categoryLabel: "READING EVIDENCE",
    skillLabel: "Suy luận nghĩa theo ngữ cảnh",
    title: "Từ in đậm trong câu dưới đây mang ý nghĩa nào gần nhất?",
    context: `"The initial plan was deemed completely untenable once the budget was cut by half, forcing the committee to abandon it."`,
    options: [
      { key: "A", text: "Quá tốn kém về mặt tài chính", isCorrect: false, diagnosisNote: "Bẫy dịch từ rời 'budget cut'" },
      { key: "B", text: "Không thể tiếp tục duy trì hoặc thực hiện được", isCorrect: true },
      { key: "C", text: "Cần phải chỉnh sửa lại cho phù hợp", isCorrect: false },
      { key: "D", text: "Không nhận được sự đồng thuận của tập thể", isCorrect: false },
    ],
  },
  {
    id: 2,
    category: "Grammar",
    categoryLabel: "GRAMMAR INVERSION",
    skillLabel: "Nhận diện cấu trúc đảo ngữ nhấn mạnh",
    title: "Phương án nào hoàn thiện câu trên một cách chuẩn xác và tự nhiên nhất?",
    context: `"Seldom ________ such an intense level of dedication among junior researchers."`,
    options: [
      { key: "A", text: "we have observed", isCorrect: false, diagnosisNote: "Chưa nhận diện được cấu trúc đảo ngữ Seldom + Aux" },
      { key: "B", text: "have we observed", isCorrect: true },
      { key: "C", text: "that we observed", isCorrect: false },
      { key: "D", text: "we were observing", isCorrect: false },
    ],
  },
  {
    id: 3,
    category: "Listening",
    categoryLabel: "LISTENING DISCRIMINATION",
    skillLabel: "Phân biệt nuốt âm & Giả định",
    title: "Bấm nút nghe bên dưới và cho biết người nói thực tế đã làm gì?",
    audioScript: "I would've called you, but my battery was completely dead.",
    context: "Nghe audio (hoặc bấm biểu tượng loa để nghe giọng đọc bản xứ)",
    options: [
      { key: "A", text: "Đã gọi điện nhưng không ai bắt máy", isCorrect: false, diagnosisNote: "Nghe từ rời 'called' thay vì cụm nuốt âm 'would've'" },
      { key: "B", text: "Chưa hề gọi điện vì điện thoại hết pin", isCorrect: true },
      { key: "C", text: "Đã sạc pin xong rồi mới gọi", isCorrect: false },
      { key: "D", text: "Nhờ người khác gọi hộ", isCorrect: false },
    ],
  },
  {
    id: 4,
    category: "Reading",
    categoryLabel: "READING EVIDENCE",
    skillLabel: "Phát hiện bằng chứng cốt lõi",
    title: "Thông điệp cốt lõi mà câu dưới đây khẳng định là gì?",
    context: `"While electric vehicles produce zero tailpipe emissions, their overall environmental footprint depends heavily on the source of the electricity used to charge them."`,
    options: [
      { key: "A", text: "Xe điện hoàn toàn thân thiện với môi trường trong mọi trường hợp.", isCorrect: false, diagnosisNote: "Bẫy đọc lướt 'zero tailpipe emissions'" },
      { key: "B", text: "Xe điện vẫn có thể gây hại cho môi trường nếu nguồn điện sạc là năng lượng hóa thạch.", isCorrect: true },
      { key: "C", text: "Lượng khí thải của xe điện phụ thuộc vào chất lượng ống xả.", isCorrect: false },
      { key: "D", text: "Chính phủ nên cấm các phương tiện sử dụng nhiên liệu truyền thống.", isCorrect: false },
    ],
  },
  {
    id: 5,
    category: "Grammar",
    categoryLabel: "COLLOCATION",
    skillLabel: "Tư duy cụm từ học thuật",
    title: "Bạn muốn diễn đạt: 'Chính sách mới này đã gây ra một làn sóng tranh cãi lớn'. Cụm từ nào tự nhiên nhất?",
    context: `"The new policy ________ in the public."`,
    options: [
      { key: "A", text: "made a big argument", isCorrect: false, diagnosisNote: "Thói quen ghép từ kiểu tiếng Việt 'make argument'" },
      { key: "B", text: "caused a heavy fight", isCorrect: false },
      { key: "C", text: "sparked fierce controversy", isCorrect: true },
      { key: "D", text: "opened an enormous discussion", isCorrect: false },
    ],
  },
  {
    id: 6,
    category: "Listening",
    categoryLabel: "LISTENING INFERENCE",
    skillLabel: "Giải mã hàm ý văn hóa người nói",
    title: "Bấm nút nghe đoạn đối thoại ngắn và cho biết người phụ nữ thực sự nghĩ gì?",
    audioScript: "Do you think Peter will finish the report by five? Well, if pigs could fly!",
    context: "Man: Do you think Peter will finish the report by five? | Woman: Well, if pigs could fly!",
    options: [
      { key: "A", text: "Peter là người rất chăm chỉ và bay bổng", isCorrect: false },
      { key: "B", text: "Peter chắc chắn không thể hoàn thành đúng giờ", isCorrect: true },
      { key: "C", text: "Báo cáo liên quan đến ngành chăn nuôi", isCorrect: false, diagnosisNote: "Hiểu nghĩa đen thành ngữ 'pigs could fly'" },
      { key: "D", text: "Peter cần thêm sự trợ giúp của đồng nghiệp", isCorrect: false },
    ],
  },
  {
    id: 7,
    category: "Logic",
    categoryLabel: "GRAMMAR & COHESION",
    skillLabel: "Mạch logic nguyên nhân - hệ quả",
    title: "Cụm từ nối nào thể hiện mối quan hệ logic chính xác nhất giữa 2 câu?",
    context: `"The central bank increased interest rates sharply. ________, consumer borrowing declined significantly over the next two quarters."`,
    options: [
      { key: "A", text: "Nevertheless", isCorrect: false },
      { key: "B", text: "Consequently", isCorrect: true },
      { key: "C", text: "In contrast", isCorrect: false, diagnosisNote: "Nhầm lẫn giữa quan hệ đối lập và nhân quả" },
      { key: "D", text: "For instance", isCorrect: false },
    ],
  },
  {
    id: 8,
    category: "Reading",
    categoryLabel: "READING TRAP",
    skillLabel: "Bẫy suy diễn quá mức (Overgeneralization)",
    title: "Nhận định nào sau đây là HOÀN TOÀN HỢP LÝ dựa trên thông tin được cung cấp?",
    context: `"A recent survey of 200 tech startups in Silicon Valley revealed that companies allowing remote work reported a 15% increase in employee retention."`,
    options: [
      { key: "A", text: "Làm việc từ xa là phương pháp duy nhất để giữ chân nhân tài công nghệ.", isCorrect: false, diagnosisNote: "Mắc bẫy từ cực đoan 'duy nhất' (only/solely)" },
      { key: "B", text: "Mọi công ty trên thế giới áp dụng làm việc từ xa đều sẽ tăng 15% năng suất.", isCorrect: false },
      { key: "C", text: "Có mối tương quan tích cực giữa làm việc từ xa và tỷ lệ giữ chân nhân sự tại nhóm khảo sát.", isCorrect: true },
      { key: "D", text: "Các công ty bắt buộc nhân viên đến văn phòng đang trên bờ vực sụp đổ.", isCorrect: false },
    ],
  },
  {
    id: 9,
    category: "Reading",
    categoryLabel: "VOCABULARY IN CONTEXT",
    skillLabel: "Từ vựng đa nghĩa học thuật",
    title: "Từ 'address' trong ngữ cảnh dưới đây đồng nghĩa với từ nào nhất?",
    context: `"The report fails to address the underlying structural factors behind urban congestion."`,
    options: [
      { key: "A", text: "write a letter to", isCorrect: false },
      { key: "B", text: "tackle / deal with (giải quyết / bàn luận)", isCorrect: true },
      { key: "C", text: "locate the destination of", isCorrect: false, diagnosisNote: "Bẫy nghĩa thông thường 'địa chỉ' thay vì động từ học thuật" },
      { key: "D", text: "publicly criticize", isCorrect: false },
    ],
  },
  {
    id: 10,
    category: "Listening",
    categoryLabel: "CONNECTED SPEECH",
    skillLabel: "Ngữ âm liên kết & Nuốt âm chặn",
    title: "Nghe câu nói ngắn và cho biết người nói đang miêu tả điều gì?",
    audioScript: "It was the best part of the whole trip.",
    context: "Nghe audio: Âm /t/ ở 'best' và 'part' bị nuốt nhẹ tự nhiên",
    options: [
      { key: "A", text: "Phần tồi tệ nhất của chuyến đi (the worst part)", isCorrect: false, diagnosisNote: "Mù âm liên kết /bɛs pɑː/ nhầm sang worst" },
      { key: "B", text: "Phần tuyệt vời nhất của cả chuyến đi (the best part)", isCorrect: true },
      { key: "C", text: "Điểm dừng chân thứ hai của chuyến đi", isCorrect: false },
      { key: "D", text: "Chuyến đi bị hoãn lại giữa chừng", isCorrect: false },
    ],
  },
  {
    id: 11,
    category: "Reading",
    categoryLabel: "AUTHOR'S STANCE",
    skillLabel: "Xác định lập trường và quan điểm",
    title: "Thái độ thực sự của tác giả đối với việc áp dụng AI trong trị liệu tâm lý là gì?",
    context: `"While artificial intelligence offers remarkable computational power, the assumption that it can replace human empathy in psychiatric counseling remains a hazardous delusion."`,
    options: [
      { key: "A", text: "Rất ủng hộ và khuyến khích ứng dụng rộng rãi", isCorrect: false },
      { key: "B", text: "Hoài nghi và cảnh báo về rủi ro nguy hiểm", isCorrect: true },
      { key: "C", text: "Hoàn toàn phủ nhận mọi tiến bộ công nghệ", isCorrect: false },
      { key: "D", text: "Trung lập và chờ đợi thêm kết quả kiểm nghiệm", isCorrect: false, diagnosisNote: "Bỏ qua từ chỉ thái độ nặng ký 'hazardous delusion'" },
    ],
  },
  {
    id: 12,
    category: "Logic",
    categoryLabel: "INTEGRATED REASONING",
    skillLabel: "Tư duy phản biện & Cấu trúc luận điểm",
    title: "Để phản biện ý kiến: 'Nghiên cứu lịch sử là vô ích đối với đời sống hiện đại', luận điểm nào chặt chẽ nhất?",
    context: `Writing Task 2 Context: Critical Counter-argument`,
    options: [
      { key: "A", text: "Lịch sử rất quan trọng vì học sinh nào cũng bắt buộc phải học ở trường.", isCorrect: false, diagnosisNote: "Ngụy biện thẩm quyền hình thức" },
      { key: "B", text: "Phân tích các chu kỳ khủng hoảng trong quá khứ cung cấp dữ liệu nền tảng để dự báo và kiểm soát rủi ro chính sách hiện tại.", isCorrect: true },
      { key: "C", text: "Những người coi thường lịch sử là những người không có lòng tự hào dân tộc.", isCorrect: false, diagnosisNote: "Ngụy biện công kích cảm tính" },
      { key: "D", text: "Lịch sử rất thú vị vì có nhiều bộ phim tài liệu hay.", isCorrect: false },
    ],
  },
];

// =========================================================================
// 5 CÂU HỎI PROFILE HỌC TẬP (5 PHÚT)
// =========================================================================
interface ProfileQuestion {
  id: number;
  question: string;
  sub: string;
  options: string[];
}

const PROFILE_QUESTIONS: ProfileQuestion[] = [
  {
    id: 1,
    question: "Trải nghiệm học tiếng Anh/IELTS khiến bạn nản lòng nhất trong quá khứ là gì?",
    sub: "Giúp xác định chính xác nguyên nhân khiến bạn từng bỏ dở",
    options: [
      "Học thuộc nhiều từ vựng và bài mẫu nhưng khi nói/viết không tự ghép được câu.",
      "Nghe và đọc hiểu đại ý, nhưng Speaking và Writing bị tắc nghẽn hoàn toàn.",
      "Cày nhiều bộ đề Cam nhưng điểm số dậm chân tại chỗ một cách bí bách.",
      "Là người mới bắt đầu từ số 0, bị ngợp trước biển tài liệu trên mạng.",
    ],
  },
  {
    id: 2,
    question: "Khi phải viết hoặc nói một câu tiếng Anh, bạn mất nhiều thời gian nhất ở bước nào?",
    sub: "Xác định nút nghẽn phản xạ trong não bộ",
    options: [
      "Mất thời gian nghĩ ý tưởng bằng tiếng Việt.",
      "Có ý tưởng nhưng phải dịch từng từ tiếng Việt trong đầu sang tiếng Anh.",
      "Đắn đo suy nghĩ cấu trúc ngữ pháp và mạo từ xem có bị sai không.",
      "Nói/viết ra được nhưng câu cú rất ngô nghê, thiếu tự nhiên.",
    ],
  },
  {
    id: 3,
    question: "Mục tiêu IELTS quan trọng nhất của bạn lúc này là gì?",
    sub: "Định vị lộ trình và áp lực đích đến",
    options: [
      "IELTS 5.0 – 5.5: Đạt chuẩn tốt nghiệp Đại học / Cơ bản.",
      "IELTS 6.0 – 6.5: Chuẩn đầu ra cao học / Ứng tuyển doanh nghiệp / Đổi việc.",
      "IELTS 7.0 – 7.5+: Săn học bổng du học / Định cư nước ngoài / Giảng dạy.",
      "Chưa cần thi lấy bằng ngay, muốn xây gốc tư duy ngôn ngữ vững chắc.",
    ],
  },
  {
    id: 4,
    question: "Thời hạn chót (Deadline) bạn cần đạt mục tiêu là khi nào?",
    sub: "Xác định cường độ điều trị và kỷ luật cần thiết",
    options: [
      "Cần gấp trong vòng dưới 3 tháng tới (Cần can thiệp kỷ luật cao).",
      "Trong khoảng 3 đến 6 tháng tới.",
      "Trong vòng 1 năm tới.",
      "Chưa vội, học chắc từng bước.",
    ],
  },
  {
    id: 5,
    question: "Bạn có sẵn sàng học theo phương pháp đi từ bản chất tư duy thay vì học vẹt mẹo thi?",
    sub: "Nguyên tắc đồng thuận giữa Học viện và Học viên",
    options: [
      "Tôi đồng ý. Tôi muốn hiểu sâu bản chất và sửa tận gốc rễ lỗi sai.",
      "Tôi muốn xem trước bản chẩn đoán điểm nghẽn của mình rồi quyết định.",
    ],
  },
];

type ViewMode = "LANDING" | "DIAGNOSTIC" | "PROFILE" | "LEAD_CAPTURE" | "RESULT_PREVIEW";

export default function DiagnosticLandingPage() {
  const [viewMode, setViewState] = useState<ViewMode>("LANDING");

  // State 12 câu Diagnostic
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 phút
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // State 5 câu Profile
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [profileAnswers, setProfileAnswers] = useState<Record<number, string>>({});

  // State Lead Capture
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Tính toán kết quả
  const [score, setScore] = useState(0);
  const [skillBreakdown, setSkillBreakdown] = useState({
    listening: 0,
    reading: 0,
    grammar: 0,
    logic: 0,
  });
  const [bottlenecks, setBottlenecks] = useState<string[]>([]);

  // Đếm ngược 15 phút khi vào bài test
  useEffect(() => {
    if (viewMode !== "DIAGNOSTIC") return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          toast.warning("Hết thời gian 15 phút! Đang chuyển sang bước hoàn thiện hồ sơ.");
          setViewState("PROFILE");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [viewMode]);

  // Cuộn lên đầu khi đổi viewMode
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [viewMode, currentQIndex, currentProfileIndex]);

  // Phát âm thanh câu hỏi bằng Web Speech Synthesis
  const playAudio = (text: string) => {
    if (!("speechSynthesis" in window)) {
      toast.info("Trình duyệt không hỗ trợ phát âm tự động, vui lòng đọc đoạn thoại gợi ý.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.95;
    utterance.onstart = () => setIsAudioPlaying(true);
    utterance.onend = () => setIsAudioPlaying(false);
    utterance.onerror = () => setIsAudioPlaying(false);
    window.speechSynthesis.speak(utterance);
  };

  // Xử lý chọn đáp án cho 12 câu Diagnostic
  const handleSelectAnswer = (qId: number, key: string) => {
    setUserAnswers((prev) => ({ ...prev, [qId]: key }));

    // Tự động chuyển câu sau 300ms
    setTimeout(() => {
      if (currentQIndex < DIAGNOSTIC_QUESTIONS.length - 1) {
        setCurrentQIndex((prev) => prev + 1);
      } else {
        // Hoàn tất 12 câu -> Chuyển sang 5 câu Profile
        calculatePreliminaryResults({ ...userAnswers, [qId]: key });
        setViewState("PROFILE");
      }
    }, 280);
  };

  // Tính toán kết quả sơ bộ
  const calculatePreliminaryResults = (answers: Record<number, string>) => {
    let totalScore = 0;
    let listCorrect = 0;
    let readCorrect = 0;
    let gramCorrect = 0;
    let logicCorrect = 0;
    const foundBottlenecks: string[] = [];

    DIAGNOSTIC_QUESTIONS.forEach((q) => {
      const selected = answers[q.id];
      const correctOpt = q.options.find((o) => o.isCorrect);
      if (selected === correctOpt?.key) {
        totalScore += 1;
        if (q.category === "Listening") listCorrect += 1;
        if (q.category === "Reading") readCorrect += 1;
        if (q.category === "Grammar") gramCorrect += 1;
        if (q.category === "Logic") logicCorrect += 1;
      } else {
        const chosenOpt = q.options.find((o) => o.key === selected);
        if (chosenOpt?.diagnosisNote && !foundBottlenecks.includes(chosenOpt.diagnosisNote)) {
          foundBottlenecks.push(chosenOpt.diagnosisNote);
        }
      }
    });

    if (foundBottlenecks.length === 0) {
      foundBottlenecks.push("Tốc độ xử lý thông tin dưới áp lực thời gian");
      foundBottlenecks.push("Cần nâng cấp văn phong biểu đạt học thuật nâng cao");
    }

    setScore(totalScore);
    setSkillBreakdown({
      listening: Math.round((listCorrect / 3) * 100),
      reading: Math.round((readCorrect / 4) * 100),
      grammar: Math.round((gramCorrect / 3) * 100),
      logic: Math.round((logicCorrect / 2) * 100),
    });
    setBottlenecks(foundBottlenecks.slice(0, 3));
  };

  // Xử lý chọn đáp án cho 5 câu Profile
  const handleSelectProfileAnswer = (profileId: number, answerText: string) => {
    setProfileAnswers((prev) => ({ ...prev, [profileId]: answerText }));
    setTimeout(() => {
      if (currentProfileIndex < PROFILE_QUESTIONS.length - 1) {
        setCurrentProfileIndex((prev) => prev + 1);
      } else {
        setViewState("LEAD_CAPTURE");
      }
    }, 250);
  };

  // Submit Lead & Xem kết quả
  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = fullName.trim();
    const cleanPhone = phone.trim().replace(/\s+/g, "");

    if (!cleanName) {
      toast.error("Vui lòng nhập họ và tên của bạn.");
      return;
    }
    if (!cleanPhone || cleanPhone.length < 9) {
      toast.error("Vui lòng nhập số điện thoại có Zalo để nhận báo cáo.");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitContactLead({
        leadType: "ASSESSMENT",
        fullName: cleanName,
        phone: cleanPhone,
        goal: `[Chẩn Đoán 20 Phút] Điểm: ${score}/12 | Điểm nghẽn: ${bottlenecks.join(" • ")}`,
        source: "campaign_test20",
        message: `Profile: ${JSON.stringify(profileAnswers)} | Diagnostic Answers: ${JSON.stringify(userAnswers)}`,
        metadata: {
          score,
          bottlenecks,
          profileAnswers,
          skillBreakdown,
        },
      });

      toast.success("Hồ sơ chẩn đoán đã sẵn sàng!");
      setViewState("RESULT_PREVIEW");
    } catch (err: any) {
      // Vẫn cho xem kết quả nếu lỗi mạng tạm thời
      setViewState("RESULT_PREVIEW");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Ước tính band
  const getEstimatedBand = () => {
    if (score >= 10) return "6.5 – 7.0+";
    if (score >= 7) return "5.5 – 6.0";
    if (score >= 4) return "4.5 – 5.0";
    return "3.5 – 4.0";
  };

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 font-sans selection:bg-brand-red/10 selection:text-brand-red flex flex-col">
      <SEO
        title="Chẩn Đoán Năng Lực & Điểm Nghẽn IELTS 20 Phút — Học Viện ARIS"
        description="Bài kiểm tra chẩn đoán 15 phút + 5 phút hoàn thiện hồ sơ. Tìm đúng điểm nghẽn tư duy kéo điểm IELTS của bạn xuống."
      />

      {/* ========================================================================= */}
      {/* BRAND HEADER TỐI GIẢN                                                     */}
      {/* ========================================================================= */}
      <header className="border-b border-border/80 bg-background/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <SiteLogo
              alt="ARIS IELTS"
              className="h-9 w-9 sm:h-10 sm:w-10 object-contain shrink-0 transition-transform group-hover:scale-105"
            />
            <div className="flex items-center border-l border-border pl-2.5 sm:pl-3 h-7 sm:h-8">
              <span className="font-black tracking-wider text-base sm:text-lg text-foreground leading-none uppercase whitespace-nowrap">
                ARIS IELTS
              </span>
            </div>
            <span className="hidden sm:inline-block text-xs font-semibold tracking-wider text-muted-foreground uppercase border-l border-border pl-3">
              Diagnostic 20M
            </span>
          </Link>

          {viewMode === "LANDING" && (
            <Button
              size="sm"
              onClick={() => setViewState("DIAGNOSTIC")}
              className="rounded-full px-5 h-9 font-bold text-xs sm:text-sm bg-brand-red hover:bg-brand-red-hover text-white shadow-sm transition-all"
            >
              Bắt Đầu Test Ngay
            </Button>
          )}

          {viewMode === "DIAGNOSTIC" && (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 border border-amber-500/20 text-xs font-mono font-bold">
              <Clock className="w-3.5 h-3.5" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          )}
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 1. MÀN HÌNH LANDING PAGE: CỬA VÀO TINH GỌN                              */}
      {/* ========================================================================= */}
      {viewMode === "LANDING" && (
        <main className="flex-1">
          {/* HERO */}
          <section className="pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-border/70 bg-gradient-to-b from-background via-card to-slate-50/50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-red-soft text-brand-red border border-brand-red/20 text-xs sm:text-sm font-black uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Hệ Thống Chẩn Đoán Học Thuật ARIS</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.14]">
                Bạn đang ở Band nào thật sự?
              </h1>

              <p className="text-lg sm:text-xl text-foreground/80 leading-relaxed max-w-2xl mx-auto font-normal">
                Bài kiểm tra chẩn đoán giúp xác định chính xác trình độ và những{" "}
                <span className="font-bold text-foreground underline decoration-brand-red/50 underline-offset-4">
                  điểm nghẽn tư duy
                </span>{" "}
                đang kéo điểm IELTS của bạn xuống.
              </p>

              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  onClick={() => setViewState("DIAGNOSTIC")}
                  className="w-full sm:w-auto rounded-2xl px-9 h-14 font-extrabold text-base sm:text-lg bg-brand-red hover:bg-brand-red-hover text-white shadow-md hover:shadow-lg transition-all gap-2"
                >
                  <span>BẮT ĐẦU CHẨN ĐOÁN MIỄN PHÍ</span>
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs sm:text-sm text-muted-foreground font-medium">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-brand-blue" />
                  15 phút test + 5 phút hồ sơ
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Target className="h-4 w-4 text-brand-blue" />
                  Không cần biết Band trước
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <FileCheck className="h-4 w-4 text-brand-blue" />
                  Có bản phân tích cá nhân qua Zalo
                </span>
              </div>
            </div>
          </section>

          {/* TẠI SAO KHÁC? */}
          <section className="py-16 sm:py-20 border-b border-border/70 bg-background">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
              <div className="text-center space-y-3">
                <p className="text-xs sm:text-sm font-extrabold tracking-widest text-brand-red uppercase">
                  Sự Khác Biệt
                </p>
                <h2 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">
                  Đây không phải bài test IELTS thông thường.
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto font-normal">
                  Bài test thông thường chỉ đếm số câu đúng. ARIS phân tích cơ chế vì sao bạn sai.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {/* Box 1 */}
                <Card className="rounded-3xl border border-border bg-muted/30 p-6 sm:p-8 space-y-5">
                  <div className="space-y-1">
                    <Badge variant="outline" className="text-muted-foreground border-border font-extrabold text-xs uppercase tracking-wider">
                      Test truyền thống
                    </Badge>
                    <h3 className="text-lg font-bold text-foreground">Chỉ đo số lượng câu đúng</h3>
                  </div>

                  <div className="space-y-3 text-sm text-foreground/80 font-medium">
                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-border text-foreground flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">1</div>
                      <span>Bạn làm một loạt câu hỏi ngẫu nhiên.</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-border text-foreground flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">2</div>
                      <span>Hệ thống trả ra một con số: ví dụ Band 5.0.</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-border text-foreground flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">3</div>
                      <span>Khuyên bạn "cần học thêm từ vựng" chung chung.</span>
                    </div>
                  </div>

                  <div className="pt-2 text-xs text-muted-foreground italic border-t border-border">
                    → Bạn vẫn hoang mang không biết bắt đầu sửa từ đâu.
                  </div>
                </Card>

                {/* Box 2 */}
                <Card className="rounded-3xl border-2 border-brand-blue/40 bg-card p-6 sm:p-8 space-y-5 shadow-sm">
                  <div className="space-y-1">
                    <Badge className="bg-brand-blue text-white font-extrabold text-xs uppercase tracking-wider">
                      ARIS Diagnostic
                    </Badge>
                    <h3 className="text-lg font-bold text-foreground">Bóc tách điểm nghẽn tư duy</h3>
                  </div>

                  <div className="space-y-3 text-sm text-foreground font-medium">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                      <span><strong>Bạn sai ở đâu:</strong> Nhận diện đúng vị trí đứt gãy.</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                      <span><strong>Vì sao bạn sai:</strong> Do kiến thức, phản xạ hay bẫy logic?</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                      <span><strong>Cần sửa thứ gì trước:</strong> Phác đồ khắc phục trúng đích.</span>
                    </div>
                  </div>

                  <div className="pt-2 text-xs text-brand-blue font-bold border-t border-brand-blue/20">
                    → Tiết kiệm hàng tháng trời tự bơi trong biển tài liệu.
                  </div>
                </Card>
              </div>
            </div>
          </section>

          {/* 4 KHU VỰC NĂNG LỰC */}
          <section className="py-16 sm:py-20 border-b border-border/70 bg-slate-50/50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
              <div className="text-center space-y-3">
                <p className="text-xs sm:text-sm font-extrabold tracking-widest text-muted-foreground uppercase">
                  Phạm Vi Đánh Giá
                </p>
                <h2 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">
                  4 Năng lực được "soi" kỹ lưỡng
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <Card className="rounded-3xl border border-border bg-card p-6 space-y-3 shadow-xs">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold">
                    <Headphones className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-black text-foreground tracking-tight">LISTENING</h3>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                    Nghe âm thanh <span className="text-foreground/40">→</span> Nhận diện ngữ âm <span className="text-foreground/40">→</span> Tốc độ xử lý thông tin thực tế.
                  </p>
                </Card>

                <Card className="rounded-3xl border border-border bg-card p-6 space-y-3 shadow-xs">
                  <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-brand-blue flex items-center justify-center font-bold">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-black text-foreground tracking-tight">READING</h3>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                    Đọc hiểu bản chất <span className="text-foreground/40">→</span> Tìm bằng chứng khách quan <span className="text-foreground/40">→</span> Tránh bẫy suy diễn.
                  </p>
                </Card>

                <Card className="rounded-3xl border border-border bg-card p-6 space-y-3 shadow-xs">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center font-bold">
                    <PenTool className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-black text-foreground tracking-tight">WRITING & GRAMMAR</h3>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                    Nhận diện cấu trúc <span className="text-foreground/40">→</span> Tư duy cụm từ <span className="text-foreground/40">→</span> Khả năng kiểm soát câu.
                  </p>
                </Card>

                <Card className="rounded-3xl border border-border bg-card p-6 space-y-3 shadow-xs">
                  <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-700 flex items-center justify-center font-bold">
                    <Mic className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-black text-foreground tracking-tight">LOGIC & REASONING</h3>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                    Hiểu ý niệm ngầm <span className="text-foreground/40">→</span> Loại bỏ ngụy biện <span className="text-foreground/40">→</span> Phản xạ ra quyết định.
                  </p>
                </Card>
              </div>
            </div>
          </section>

          {/* CTA CUỐI */}
          <section className="py-16 sm:py-20 bg-[#002147] text-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-6">
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
                Bắt đầu bằng việc biết chính xác bạn đang ở đâu.
              </h2>
              <p className="text-base sm:text-lg text-white/80 max-w-xl mx-auto font-normal leading-relaxed">
                Dành 15 phút test + 5 phút hoàn thiện hồ sơ. Bạn sẽ nhận được bản phân tích và định hướng trực tiếp qua Zalo.
              </p>
              <div className="pt-2">
                <Button
                  size="lg"
                  onClick={() => setViewState("DIAGNOSTIC")}
                  className="rounded-2xl px-9 h-14 font-extrabold text-base sm:text-lg bg-brand-red hover:bg-brand-red-hover text-white shadow-lg gap-2"
                >
                  <span>BẮT ĐẦU CHẨN ĐOÁN MIỄN PHÍ</span>
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
              <p className="text-xs text-white/60 font-medium">
                Không yêu cầu thẻ ngân hàng • Không tự động đăng ký khóa học
              </p>
            </div>
          </section>
        </main>
      )}

      {/* ========================================================================= */}
      {/* 2. MÀN HÌNH 15 PHÚT TEST CHẨN ĐOÁN (12 CÂU CARD-BY-CARD)                 */}
      {/* ========================================================================= */}
      {viewMode === "DIAGNOSTIC" && (
        <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Header câu hỏi */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-muted-foreground">
                <span className="uppercase tracking-wider">
                  Câu hỏi {currentQIndex + 1} / {DIAGNOSTIC_QUESTIONS.length}
                </span>
                <span className="text-brand-blue">
                  {Math.round(((currentQIndex + 1) / DIAGNOSTIC_QUESTIONS.length) * 100)}% Hoàn thành
                </span>
              </div>
              <Progress value={((currentQIndex + 1) / DIAGNOSTIC_QUESTIONS.length) * 100} className="h-2 rounded-full" />
            </div>

            {/* Question Card */}
            {(() => {
              const q = DIAGNOSTIC_QUESTIONS[currentQIndex];
              const selectedKey = userAnswers[q.id];

              return (
                <Card className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-brand-blue/10 text-brand-blue border-brand-blue/20 font-black text-[11px] uppercase tracking-wider">
                        {q.categoryLabel}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-medium">· {q.skillLabel}</span>
                    </div>

                    <h2 className="text-lg sm:text-xl font-black text-foreground leading-snug">
                      {q.title}
                    </h2>
                  </div>

                  {/* Context text or Audio box */}
                  {q.audioScript ? (
                    <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                          <Volume2 className="w-4 h-4 text-amber-700" />
                          <span>Đoạn ghi âm tiếng Anh (Giọng bản xứ)</span>
                        </div>
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => playAudio(q.audioScript!)}
                          disabled={isAudioPlaying}
                          className="rounded-full h-8 px-4 font-bold text-xs bg-amber-600 hover:bg-amber-700 text-white gap-1.5"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>{isAudioPlaying ? "Đang phát..." : "Bấm để nghe"}</span>
                        </Button>
                      </div>

                      <div className="text-xs text-amber-900/80 font-mono italic bg-white/70 p-2.5 rounded-xl border border-amber-200/50">
                        "{q.context}"
                      </div>
                    </div>
                  ) : (
                    q.context && (
                      <div className="p-4 rounded-2xl bg-muted/40 border border-border text-sm sm:text-base font-serif text-foreground/90 leading-relaxed">
                        {q.context}
                      </div>
                    )
                  )}

                  {/* Options */}
                  <div className="space-y-3 pt-2">
                    {q.options.map((opt) => {
                      const isChosen = selectedKey === opt.key;
                      return (
                        <button
                          key={opt.key}
                          type="button"
                          onClick={() => handleSelectAnswer(q.id, opt.key)}
                          className={`w-full text-left p-4 sm:p-4.5 rounded-2xl border transition-all flex items-center gap-3.5 ${
                            isChosen
                              ? "border-brand-blue bg-blue-50/70 text-brand-blue shadow-xs font-semibold"
                              : "border-border bg-card hover:bg-muted/40 text-foreground"
                          }`}
                        >
                          <div
                            className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 transition-colors ${
                              isChosen
                                ? "bg-brand-blue text-white"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {opt.key}
                          </div>
                          <span className="text-sm sm:text-base leading-snug">{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Navigation back */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/70 text-xs text-muted-foreground">
                    <button
                      type="button"
                      disabled={currentQIndex === 0}
                      onClick={() => setCurrentQIndex((prev) => Math.max(0, prev - 1))}
                      className="flex items-center gap-1 hover:text-foreground disabled:opacity-40"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Câu trước</span>
                    </button>
                    <span>Chọn đáp án để tự động chuyển tiếp</span>
                  </div>
                </Card>
              );
            })()}
          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* 3. MÀN HÌNH 5 PHÚT PROFILE HỌC TẬP (5 CÂU CHẠM CHỌN)                     */}
      {/* ========================================================================= */}
      {viewMode === "PROFILE" && (
        <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-muted-foreground">
                <span className="uppercase tracking-wider">
                  Hoàn thiện hồ sơ: {currentProfileIndex + 1} / {PROFILE_QUESTIONS.length}
                </span>
                <span className="text-brand-red">
                  Bước 2/3
                </span>
              </div>
              <Progress value={((currentProfileIndex + 1) / PROFILE_QUESTIONS.length) * 100} className="h-2 rounded-full" />
            </div>

            {(() => {
              const p = PROFILE_QUESTIONS[currentProfileIndex];
              const selectedAnswer = profileAnswers[p.id];

              return (
                <Card className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-6">
                  <div className="space-y-1.5 text-left">
                    <Badge className="bg-amber-500/15 text-amber-800 border border-amber-500/30 text-[11px] font-extrabold uppercase tracking-wider">
                      Khảo sát bối cảnh học tập
                    </Badge>
                    <h2 className="text-lg sm:text-xl font-black text-foreground leading-snug">
                      {p.question}
                    </h2>
                    <p className="text-xs sm:text-sm text-muted-foreground font-normal">
                      {p.sub}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    {p.options.map((optText, idx) => {
                      const isChosen = selectedAnswer === optText;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSelectProfileAnswer(p.id, optText)}
                          className={`w-full text-left p-4 sm:p-4.5 rounded-2xl border transition-all flex items-start gap-3.5 ${
                            isChosen
                              ? "border-brand-red bg-rose-50/70 text-brand-red shadow-xs font-semibold"
                              : "border-border bg-card hover:bg-muted/40 text-foreground"
                          }`}
                        >
                          <div
                            className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black shrink-0 mt-0.5 ${
                              isChosen
                                ? "bg-brand-red text-white"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {idx + 1}
                          </div>
                          <span className="text-sm leading-relaxed">{optText}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border/70 text-xs text-muted-foreground">
                    <button
                      type="button"
                      disabled={currentProfileIndex === 0}
                      onClick={() => setCurrentProfileIndex((prev) => Math.max(0, prev - 1))}
                      className="flex items-center gap-1 hover:text-foreground disabled:opacity-40"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Câu trước</span>
                    </button>
                    <span>Chạm để chọn</span>
                  </div>
                </Card>
              );
            })()}
          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* 4. MÀN HÌNH LEAD CAPTURE: XÁC NHẬN SỐ ZALO NHẬN BÁO CÁO                  */}
      {/* ========================================================================= */}
      {viewMode === "LEAD_CAPTURE" && (
        <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6 flex items-center justify-center">
          <div className="max-w-md w-full rounded-3xl bg-card border border-border overflow-hidden shadow-2xl">
            {/* Tier 1 Header theo chuẩn Ảnh 3 */}
            <div className="relative p-5 sm:p-6 bg-gradient-to-br from-amber-100/80 via-orange-50/60 to-amber-50/40 border-b border-amber-200/60 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-800 border border-amber-500/30 text-[11px] font-extrabold uppercase tracking-wider mb-2.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                <span>Hồ sơ chẩn đoán đã sẵn sàng</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                Nhận Báo Cáo & Phác Đồ Học Tập
              </h3>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-foreground/75 mt-1.5 font-medium">
                <span className="font-semibold text-amber-800">Đã hoàn tất 12 câu test + Profile</span>
                <span>•</span>
                <span>Miễn phí 100%</span>
              </div>
            </div>

            {/* Tier 2 Form */}
            <div className="p-5 sm:p-6 space-y-4">
              <form onSubmit={handleSubmitLead} className="space-y-4">
                <div className="space-y-1 text-left">
                  <Label htmlFor="lead-name" className="text-xs font-bold text-foreground">
                    Họ và tên thí sinh <span className="text-brand-red">*</span>
                  </Label>
                  <Input
                    id="lead-name"
                    required
                    placeholder="Ví dụ: Nguyễn Văn A"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="h-11 rounded-xl border-border bg-card text-foreground text-sm"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-1 text-left">
                  <Label htmlFor="lead-phone" className="text-xs font-bold text-foreground">
                    Số điện thoại có Zalo (để nhận kết quả & Voice Note) <span className="text-brand-red">*</span>
                  </Label>
                  <Input
                    id="lead-phone"
                    required
                    type="tel"
                    placeholder="Nhập SĐT có Zalo (Ví dụ: 0933 319 693)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-11 rounded-xl border-border bg-card text-foreground text-sm"
                    disabled={isSubmitting}
                  />
                  <p className="text-[11px] text-muted-foreground leading-normal">
                    * Đội ngũ học thuật ARIS sẽ gửi phân tích chi tiết từng lỗi sai qua Zalo số này.
                  </p>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 rounded-full font-bold text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800 border border-blue-200/80 shadow-xs transition-all gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                        <span>Đang tạo báo cáo...</span>
                      </>
                    ) : (
                      <>
                        <FileCheck className="w-4 h-4 text-blue-600" />
                        <span>Xem Kết Quả & Nhận Hồ Sơ Zalo</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* 5. MÀN HÌNH RESULT PREVIEW: BÁO CÁO SƠ BỘ NGAY TRÊN WEB                   */}
      {/* ========================================================================= */}
      {viewMode === "RESULT_PREVIEW" && (
        <main className="flex-1 py-10 sm:py-16 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Header thông báo */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>Hoàn tất chẩn đoán năng lực</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-foreground">
                Hồ Sơ Năng Lực Của Bạn
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Mã hồ sơ: <span className="font-mono font-bold text-foreground">#NB-{Math.floor(1000 + Math.random() * 9000)}</span> · Thí sinh: <span className="font-bold text-foreground">{fullName}</span>
              </p>
            </div>

            {/* Thẻ kết quả */}
            <Card className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3.5 bg-muted/30 rounded-2xl border border-border">
                  <p className="text-[11px] text-muted-foreground font-medium">Trình độ ước tính</p>
                  <p className="text-xl font-black text-brand-red mt-0.5">{getEstimatedBand()}</p>
                </div>
                <div className="p-3.5 bg-muted/30 rounded-2xl border border-border">
                  <p className="text-[11px] text-muted-foreground font-medium">Số câu đúng</p>
                  <p className="text-xl font-black text-brand-blue mt-0.5">{score} / 12</p>
                </div>
                <div className="p-3.5 bg-muted/30 rounded-2xl border border-border">
                  <p className="text-[11px] text-muted-foreground font-medium">Reading</p>
                  <p className="text-sm font-bold text-emerald-600 mt-1">{skillBreakdown.reading}%</p>
                </div>
                <div className="p-3.5 bg-muted/30 rounded-2xl border border-border">
                  <p className="text-[11px] text-muted-foreground font-medium">Listening</p>
                  <p className="text-sm font-bold text-amber-600 mt-1">{skillBreakdown.listening}%</p>
                </div>
              </div>

              {/* Nút nghẽn nhận thức */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Điểm nghẽn nhận thức được phát hiện</span>
                </h3>

                <div className="space-y-2">
                  {bottlenecks.map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-amber-500/[0.08] border border-amber-500/20 text-xs sm:text-sm text-foreground flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <span className="font-semibold leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lời khuyên */}
              <div className="p-4 sm:p-5 rounded-2xl bg-muted/40 border border-border/80 space-y-2 text-xs sm:text-sm text-foreground/85">
                <p className="font-bold text-foreground flex items-center gap-1.5">
                  <TrendingUp className="h-4 w-4 text-brand-blue" />
                  Định hướng từ Bác sĩ học thuật ARIS:
                </p>
                <p className="leading-relaxed font-normal">
                  "Bạn không cần học lại toàn bộ tiếng Anh từ đầu. Điểm số của bạn đang bị kìm hãm chủ yếu bởi {bottlenecks.length} điểm nghẽn ở trên. Chỉ cần tháo gỡ đúng các nút thắt này, phản xạ ngôn ngữ của bạn sẽ tự động bật lên."
                </p>
              </div>

              {/* Hộp Zalo status */}
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-2 text-xs text-blue-900 text-left">
                <p className="font-bold flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4 text-blue-600" />
                  Bản chẩn đoán chi tiết đang được gửi đến Zalo: {phone}
                </p>
                <p className="text-blue-800/80 leading-normal">
                  Đội ngũ học thuật ARIS sẽ liên hệ qua Zalo trong vòng 2–4 giờ làm việc để gửi file phân tích từng câu sai và giải đáp thắc mắc 1-1 cho bạn.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://zalo.me/0933319693`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-full font-bold text-sm bg-brand-red text-white hover:bg-brand-red-hover shadow-xs transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Nhắn Tin Zalo Trực Tiếp Với ARIS</span>
                </a>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setViewState("LANDING");
                    setCurrentQIndex(0);
                    setCurrentProfileIndex(0);
                  }}
                  className="rounded-full h-12 border-border text-xs text-muted-foreground hover:text-foreground"
                >
                  Về Trang Chủ Chẩn Đoán
                </Button>
              </div>
            </Card>
          </div>
        </main>
      )}

      {/* FOOTER */}
      <footer className="py-6 border-t border-border bg-background text-center text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Học Viện ARIS. Nền Tảng Học Tập NextBand.</p>
      </footer>
    </div>
  );
}
