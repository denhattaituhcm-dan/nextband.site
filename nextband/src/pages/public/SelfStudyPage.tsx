import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { SEO } from "@/components/common/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  BookOpen,
  GraduationCap,
  HelpCircle,
  ChevronDown,
  Layers,
  Award,
  Zap,
  Check,
  ShieldCheck,
  Headphones,
  FileEdit,
  Flame,
  Star,
  Compass,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { QuickTrialModal } from "@/components/public/QuickTrialModal";

interface SelfStudyPackage {
  id: string;
  slug: string;
  badge: string;
  stageNumber: string;
  title: string;
  name: string;
  targetBand: string;
  scoreRange: string;
  originalPrice: string;
  originalPriceNum: number;
  salePrice: string;
  salePriceNum: number;
  savings: string;
  duration: string;
  highlightColor: string;
  gradientBg: string;
  tagline: string;
  description: string;
  deliverables: {
    slides: string;
    submissions: string;
    skills: string;
    features: string[];
  };
  isPopular?: boolean;
}

const SELF_STUDY_PACKAGES: SelfStudyPackage[] = [
  {
    id: "pkg-dreamer",
    slug: "starter",
    badge: "Móng Ngữ Âm & Câu Đơn",
    stageNumber: "Chặng 01",
    title: "Khóa DREAMER",
    name: "DREAMER SELF-STUDY",
    targetBand: "Mất gốc → 3.0",
    scoreRange: "0.0 - 3.0",
    originalPrice: "4.500.000đ",
    originalPriceNum: 4500000,
    salePrice: "1.490.000đ",
    salePriceNum: 1490000,
    savings: "Tiết kiệm 67%",
    duration: "120 ngày truy cập",
    highlightColor: "#EE6873",
    gradientBg: "from-[#EE6873]/10 via-[#EE6873]/5 to-transparent",
    tagline: "Chuẩn hóa ngữ âm IPA, từ vựng sinh hoạt và làm chủ cấu trúc câu đơn căn bản.",
    description: "Dành cho người mất gốc hoặc phát âm sai trầm trọng. Học trực quan qua slide phân tách âm thanh và bài tập thu âm sửa giọng.",
    deliverables: {
      slides: "27 Slide Bento Grid tương tác (44 âm IPA + Cấu trúc câu)",
      submissions: "27 Bài nộp phát âm & câu đơn có GV 8.0+ nghe sửa",
      skills: "Listening & Speaking Foundation",
      features: [
        "Trọn quyền học 27 Slide lý thuyết tương tác Socratic 5 tầng",
        "Chữa phát âm & phản xạ 1:1 qua hệ thống ghi âm trực tiếp",
        "Kho bài tập ngữ pháp & từ vựng sinh hoạt có đáp án giải thích",
        "Thời hạn sử dụng 120 ngày thoải mái tự sắp xếp lịch học",
      ],
    },
  },
  {
    id: "pkg-doer",
    slug: "dreamer",
    badge: "Câu Ghép & Đọc Hiểu",
    stageNumber: "Chặng 02",
    title: "Khóa DOER",
    name: "DOER SELF-STUDY",
    targetBand: "3.0 → 4.0",
    scoreRange: "3.0 - 4.0",
    originalPrice: "5.000.000đ",
    originalPriceNum: 5000000,
    salePrice: "1.690.000đ",
    salePriceNum: 1690000,
    savings: "Tiết kiệm 66%",
    duration: "120 ngày truy cập",
    highlightColor: "#294398",
    gradientBg: "from-[#294398]/10 via-[#294398]/5 to-transparent",
    tagline: "Xây dựng tư duy liên kết câu ghép, câu phức và kỹ năng đọc hiểu không đoán mò.",
    description: "Thoát khỏi thói quen ghép từ lộn xộn. Bắt đầu tập viết đoạn văn ngắn mạch lạc và trả lời trôi chảy Speaking Part 1.",
    deliverables: {
      slides: "27 Slide cấu trúc câu ghép, mệnh đề quan hệ & Skimming/Scanning",
      submissions: "27 Bài nộp (Đoạn văn ngắn & Ghi âm Speaking Part 1)",
      skills: "Reading & Speaking Part 1",
      features: [
        "Toàn quyền 27 Slide Bento Grid phân tích cú pháp trực quan",
        "Sửa bài viết đoạn văn: Giáo viên sửa cấu trúc ngữ pháp từng câu",
        "Chấm phát âm & độ trôi chảy Speaking Part 1",
        "Hệ thống luyện đề Reading tự động chấm điểm tức thì",
      ],
    },
  },
  {
    id: "pkg-builder",
    slug: "builder",
    badge: "Nền Tảng 4 Kỹ Năng",
    stageNumber: "Chặng 03",
    title: "Khóa BUILDER",
    name: "BUILDER SELF-STUDY",
    targetBand: "4.0 → 5.0",
    scoreRange: "4.0 - 5.0",
    originalPrice: "5.500.000đ",
    originalPriceNum: 5500000,
    salePrice: "1.890.000đ",
    salePriceNum: 1890000,
    savings: "Tiết kiệm 66%",
    duration: "120 ngày truy cập",
    highlightColor: "#F37C42",
    gradientBg: "from-[#F37C42]/10 via-[#F37C42]/5 to-transparent",
    tagline: "Làm quen định dạng đề 4 kỹ năng IELTS chuẩn Cambridge và tổ chức đoạn luận điểm.",
    description: "Chặng bản lề bước vào IELTS thực chiến. Tự viết được bài Task 1 biểu đồ đơn giản và Task 2 có luận điểm rõ ràng.",
    deliverables: {
      slides: "27 Slide kiến trúc đề thi IELTS + Phân tích dạng bài Cambridge",
      submissions: "27 Bài nộp chuyên sâu (Task 1, Task 2 & Speaking)",
      skills: "Full 4 Kỹ Năng IELTS",
      features: [
        "27 Slide tương tác phân rã bẫy đề thi Cambridge",
        "Giáo viên chấm Writing theo 4 tiêu chí chuẩn IELTS (TR, CC, LR, GRA)",
        "Ghi âm Speaking trực tiếp trên web với giới hạn đếm giờ phòng thi",
        "Cho phép làm bài sửa (Attempt 2) khi giáo viên yêu cầu nắn lỗi",
      ],
    },
  },
  {
    id: "pkg-master",
    slug: "master",
    badge: "Bứt Phá Điểm Chuyên Sâu",
    stageNumber: "Chặng 04",
    title: "Khóa MASTER",
    name: "MASTER SELF-STUDY",
    targetBand: "5.0 → 6.0",
    scoreRange: "5.0 - 6.0",
    originalPrice: "6.000.000đ",
    originalPriceNum: 6000000,
    salePrice: "1.990.000đ",
    salePriceNum: 1990000,
    savings: "Tiết kiệm 67%",
    duration: "120 ngày truy cập",
    highlightColor: "#538442",
    gradientBg: "from-[#538442]/12 via-[#538442]/5 to-transparent",
    tagline: "Lập luận Writing Task 2 chặt chẽ, Task 1 chuyên sâu và mở rộng ý Speaking Part 2 & 3.",
    description: "Gói học được lựa chọn nhiều nhất. Tập trung giải quyết các lỗi sai tư duy L1, tinh chỉnh ngữ pháp phức và từ vựng học thuật theo ngữ cảnh.",
    isPopular: true,
    deliverables: {
      slides: "27 Slide phương pháp The ARIS Way (Task 1, Task 2 & Part 2/3)",
      submissions: "27 Bài nộp Writing luận điểm dài & Speaking Part 2/3",
      skills: "Writing & Speaking Mastery",
      features: [
        "27 Slide tương tác mổ xẻ bài luận mẫu Band 8.0+",
        "Chữa Writing chi tiết từng câu (Sentence-level Feedback) chỉ rõ lỗi Concept / Structure / Expression",
        "Phản hồi thu âm Speaking chuyên sâu từng tiêu chí",
        "Cơ chế Revision bài sửa trực tiếp trên giao diện NextBand LMS",
      ],
    },
  },
  {
    id: "pkg-leader",
    slug: "leader",
    badge: "Chinh Phục Đỉnh Cao 6.5+",
    stageNumber: "Chặng 05",
    title: "Khóa LEADER",
    name: "LEADER SELF-STUDY",
    targetBand: "6.0 → 6.5+",
    scoreRange: "6.0 - 6.5+",
    originalPrice: "7.000.000đ",
    originalPriceNum: 7000000,
    salePrice: "2.390.000đ",
    salePriceNum: 2390000,
    savings: "Tiết kiệm 66%",
    duration: "120 ngày truy cập",
    highlightColor: "#D12E33",
    gradientBg: "from-[#D12E33]/10 via-[#D12E33]/5 to-transparent",
    tagline: "Kiểm soát độ mạch lạc cấp cao, văn phong tự nhiên và phản biện đa chiều trong Speaking Part 3.",
    description: "Dành cho mục tiêu 6.5 - 7.0+ để nộp hồ sơ du học, định cư hoặc tốt nghiệp đại học. Tập trung tuyệt đối vào sự tinh tế của ngôn ngữ học thuật.",
    deliverables: {
      slides: "30 Slide văn phong học thuật cao cấp & Tư duy phản biện",
      submissions: "30 Bài nộp chấm chữa nâng cao tiêu chí Band 7+",
      skills: "Advanced Academic Coherence",
      features: [
        "30 Slide chuyên đề văn phong bản ngữ và bóc tách bài thi khó",
        "Giảng viên IELTS 8.5+ chấm phản biện và nắn chỉnh văn phong",
        "Luyện đề phòng thi mô phỏng áp lực thời gian thực",
        "Kích hoạt tài khoản 120 ngày tự do luyện đề chuyên sâu",
      ],
    },
  },
];

export default function SelfStudyPage() {
  const navigate = useNavigate();
  const [selectedBand, setSelectedBand] = useState<string>("all");
  const [trialModalOpen, setTrialModalOpen] = useState(false);
  const [activePackage, setActivePackage] = useState<SelfStudyPackage>(SELF_STUDY_PACKAGES[3]); // Default Master

  const filteredPackages = SELF_STUDY_PACKAGES.filter((pkg) => {
    if (selectedBand === "all") return true;
    if (selectedBand === "starter") return pkg.slug === "starter";
    if (selectedBand === "dreamer") return pkg.slug === "dreamer";
    if (selectedBand === "builder") return pkg.slug === "builder";
    if (selectedBand === "master") return pkg.slug === "master";
    if (selectedBand === "leader") return pkg.slug === "leader";
    return true;
  });

  const handleRegister = (pkg: SelfStudyPackage) => {
    setActivePackage(pkg);
    setTrialModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] text-[#1D1D1F] selection:bg-[#002147]/10 selection:text-[#002147]">
      <SEO
        title="Gói Tự Học IELTS Thực Chiến 120 Ngày — Giáo Viên 8.0+ Chấm Bài 1:1"
        description="Gói tự học IELTS linh hoạt trên hệ thống NextBand. Học qua 27 Slide Bento Grid tương tác, làm đề trực tiếp và được Giáo viên IELTS 8.0+ sửa bài Writing & Speaking chi tiết từng câu. Học phí chỉ bằng 1/3 lớp trực tiếp, thời hạn 120 ngày."
      />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Framer Style: Minimalist, Bold Typography, Subtle Glow) */}
      {/* ========================================================================= */}
      <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 overflow-hidden border-b border-black/[0.06] bg-white">
        {/* Subtle background glow circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-brand-blue/10 via-brand-red/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Framer-like Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/[0.04] border border-black/[0.08] text-xs sm:text-sm font-semibold text-[#1D1D1F] backdrop-blur-md shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Mô Hình Tự Học Thực Chiến Mới</span>
            <span className="text-black/30">|</span>
            <span className="text-brand-blue font-bold">120 Ngày Truy Cập</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#1D1D1F] leading-[1.1]">
            Tự học linh hoạt.{" "}
            <span className="bg-gradient-to-r from-[#002147] via-[#294398] to-[#EE6873] bg-clip-text text-transparent block sm:inline">
              Giáo viên 8.0+ chấm bài từng câu.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-[#515154] max-w-3xl mx-auto leading-relaxed font-normal">
            Không tốn hàng giờ xem video lý thuyết dài dòng. Bạn học trọng tâm qua{" "}
            <strong className="text-[#1D1D1F] font-semibold">27 Slide Bento Grid tương tác</strong>, làm bài trên phòng thi số và nhận phản hồi chi tiết từ giáo viên với mức học phí{" "}
            <strong className="text-emerald-700 font-bold">chỉ bằng 1/3 lớp trực tiếp</strong>.
          </p>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Button
              size="lg"
              onClick={() => {
                const el = document.getElementById("packages-section");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="rounded-full px-8 h-13 sm:h-14 font-bold text-base bg-[#002147] hover:bg-[#001733] text-white shadow-lg shadow-[#002147]/15 transition-all hover:scale-[1.02] active:scale-[0.98] gap-2 cursor-pointer"
            >
              <span>Xem 5 gói tự học</span>
              <ArrowRight className="h-4 w-4" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/assessment")}
              className="rounded-full px-7 h-13 sm:h-14 font-semibold text-base border border-black/15 hover:bg-black/[0.03] text-[#1D1D1F] bg-white transition-all cursor-pointer"
            >
              Kiểm tra trình độ miễn phí
            </Button>
          </div>

          {/* Trust Highlights */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-[#86868B] font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Thời hạn thoải mái: 120 ngày</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>100% GV IELTS 8.0+ chấm sửa 1:1</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Kèm trọn bộ 27 Slide Bento Grid</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THE 3-PILLAR BENTO GRID (Showcase UI & Công nghệ học NextBand)         */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-14">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-blue">
            Trải Nghiệm Khác Biệt
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1D1D1F] tracking-tight">
            Vì sao mô hình Tự Học Thực Chiến hiệu quả gấp 3 lần?
          </h2>
          <p className="text-[#86868B] text-base sm:text-lg max-w-2xl mx-auto">
            Học viên IELTS thường kẹt band không phải vì thiếu lý thuyết, mà vì thiếu người chỉ ra lỗi sai của chính mình.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Slide Bento Grid */}
          <div className="bg-white rounded-3xl p-7 border border-black/[0.06] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative overflow-hidden group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200/60">
                <Layers className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-[#1D1D1F]">
                27 Slide Tương Tác Bento Grid
              </h3>
              <p className="text-sm text-[#515154] leading-relaxed">
                Thay vì ngồi nghe bài giảng thụ động 45 phút, bạn tự thao tác với các khối kiến thức phân rã, mã màu ngữ pháp trực quan và ghi nhớ nhanh gấp 3 lần.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-black/[0.04] text-xs font-semibold text-amber-700 flex items-center gap-1.5">
              <span>Được xây dựng theo khung Socratic 5 tầng</span>
            </div>
          </div>

          {/* Card 2: Chấm bài 1:1 từng câu */}
          <div className="bg-white rounded-3xl p-7 border border-black/[0.06] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative overflow-hidden group md:col-span-1">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center border border-brand-blue/20">
                <FileEdit className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-[#1D1D1F]">
                Giáo Viên Chữa Bài Từng Câu
              </h3>
              <p className="text-sm text-[#515154] leading-relaxed">
                Mỗi bài viết Writing hoặc bản thu âm Speaking đều được giáo viên 8.0+ nhận xét chi tiết, chỉ rõ 4 nhóm lỗi cốt lõi:{" "}
                <span className="font-semibold text-[#1D1D1F]">Ý tưởng, Cấu trúc, Diễn đạt & Ngữ pháp</span>.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-black/[0.04] text-xs font-semibold text-brand-blue flex items-center gap-1.5">
              <span>Có cơ chế yêu cầu sửa bài (Revision Required)</span>
            </div>
          </div>

          {/* Card 3: Phòng thi chuẩn Cambridge */}
          <div className="bg-white rounded-3xl p-7 border border-black/[0.06] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative overflow-hidden group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200/60">
                <Headphones className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-[#1D1D1F]">
                Phòng Luyện Thi NextBand Số
              </h3>
              <p className="text-sm text-[#515154] leading-relaxed">
                Trực tiếp gõ bài Writing và thu âm Speaking trên giao diện chuẩn phòng thi thật. Listening & Reading chấm tự động ngay khi nộp bài kèm thống kê tiến độ.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-black/[0.04] text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
              <span>Hỗ trợ lưu bài và nộp bài bảo mật cao</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. PACKAGES LISTING (Framer Marketplace Cards with Filter)               */}
      {/* ========================================================================= */}
      <section id="packages-section" className="py-16 sm:py-24 bg-[#F5F5F7] border-y border-black/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-10">
            <Badge className="bg-black text-white hover:bg-black text-xs font-semibold px-3 py-1 rounded-full">
              Học phí chỉ ~1/3 lớp trực tiếp
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-black text-[#1D1D1F] tracking-tight">
              Bảng Giá 5 Gói Tự Học Thực Chiến (120 Ngày)
            </h2>
            <p className="text-base sm:text-lg text-[#515154] max-w-2xl mx-auto">
              Chọn chặng xuất phát phù hợp với năng lực hiện tại của bạn. Kích hoạt tài khoản ngay để bắt đầu luyện tập.
            </p>
          </div>

          {/* Band Selector Pills (Framer Style) */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {[
              { label: "Tất cả các gói", value: "all" },
              { label: "Mất gốc → 3.0", value: "starter" },
              { label: "3.0 → 4.0", value: "dreamer" },
              { label: "4.0 → 5.0", value: "builder" },
              { label: "5.0 → 6.0 (Hot)", value: "master" },
              { label: "6.0 → 6.5+", value: "leader" },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setSelectedBand(tab.value)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer",
                  selectedBand === tab.value
                    ? "bg-[#1D1D1F] text-white shadow-xs"
                    : "bg-white text-[#515154] hover:bg-black/[0.04] border border-black/[0.06]"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={cn(
                  "relative flex flex-col justify-between bg-white rounded-3xl p-7 sm:p-8 border transition-all duration-300",
                  pkg.isPopular
                    ? "border-brand-blue shadow-xl shadow-brand-blue/10 scale-[1.02] ring-2 ring-brand-blue/30"
                    : "border-black/[0.08] shadow-sm hover:shadow-md hover:border-black/20"
                )}
              >
                {/* Popular Badge */}
                {pkg.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-brand-blue text-white text-xs font-black tracking-wider uppercase shadow-sm flex items-center gap-1.5">
                    <Flame className="h-3.5 w-3.5 fill-white" />
                    <span>Được chọn nhiều nhất</span>
                  </div>
                )}

                <div>
                  {/* Top metadata */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#86868B]">
                      {pkg.stageNumber}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                      {pkg.savings}
                    </span>
                  </div>

                  {/* Title & Target Band */}
                  <h3 className="text-2xl font-black text-[#1D1D1F] mb-1">
                    {pkg.name}
                  </h3>
                  <div className="inline-block px-3 py-1 rounded-lg bg-black/[0.04] text-xs font-bold text-[#1D1D1F] mb-4">
                    Mục tiêu: {pkg.targetBand}
                  </div>

                  <p className="text-xs text-[#515154] mb-6 leading-relaxed">
                    {pkg.tagline}
                  </p>

                  {/* Pricing Display */}
                  <div className="p-4 rounded-2xl bg-[#F5F5F7] mb-6 space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-[#1D1D1F] tracking-tight">
                        {pkg.salePrice}
                      </span>
                      <span className="text-sm font-semibold text-[#86868B] line-through">
                        {pkg.originalPrice}
                      </span>
                    </div>
                    <div className="text-[11px] font-medium text-[#515154] flex items-center gap-1.5">
                      <Clock className="h-3 w-3 text-brand-blue" />
                      <span>Thời hạn sử dụng: <strong>{pkg.duration}</strong> (4 tháng)</span>
                    </div>
                  </div>

                  {/* Core Deliverables Checklist */}
                  <div className="space-y-3 mb-8">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#86868B]">
                      Quyền lợi trong gói:
                    </p>
                    {pkg.deliverables.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-[#1D1D1F]">
                        <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <div className="pt-4 border-t border-black/[0.06] space-y-2">
                  <Button
                    onClick={() => handleRegister(pkg)}
                    className={cn(
                      "w-full h-12 rounded-xl font-bold text-sm transition-all gap-2 cursor-pointer",
                      pkg.isPopular
                        ? "bg-brand-blue hover:bg-brand-blue/90 text-white shadow-md shadow-brand-blue/20"
                        : "bg-[#1D1D1F] hover:bg-black text-white"
                    )}
                  >
                    <span>Đăng ký gói {pkg.title}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <p className="text-[11px] text-center text-[#86868B]">
                    Kích hoạt tài khoản ngay sau khi thanh toán
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. COMPARISON MATRIX (Tự học YouTube vs NextBand Self-Study vs Offline)  */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1D1D1F] tracking-tight">
            So sánh các hình thức học IELTS
          </h2>
          <p className="text-[#86868B] text-sm sm:text-base">
            Vì sao gói Tự Học Thực Chiến trên NextBand là lựa chọn tối ưu chi phí & thời gian nhất hiện nay?
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-black/[0.08] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F5F5F7] border-b border-black/[0.06] text-xs uppercase font-bold text-[#515154]">
                <tr>
                  <th className="p-4 sm:p-5 w-1/3">Tiêu chí so sánh</th>
                  <th className="p-4 sm:p-5 text-[#86868B]">Tự học YouTube / Sách</th>
                  <th className="p-4 sm:p-5 bg-brand-blue/10 text-brand-blue font-black">
                    Gói Tự Học NextBand (1/3 phí)
                  </th>
                  <th className="p-4 sm:p-5 text-[#86868B]">Lớp Offline (100% phí)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.06] text-xs sm:text-sm text-[#1D1D1F]">
                <tr>
                  <td className="p-4 sm:p-5 font-semibold">Mức học phí</td>
                  <td className="p-4 sm:p-5 text-[#86868B]">0đ (Miễn phí)</td>
                  <td className="p-4 sm:p-5 bg-brand-blue/5 font-bold text-brand-blue">
                    Tiết kiệm 66% (Chỉ ~1.5 - 2 triệu)
                  </td>
                  <td className="p-4 sm:p-5 text-[#86868B]">4.5 - 7 triệu / khóa</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold">Chữa bài Writing/Speaking</td>
                  <td className="p-4 sm:p-5 text-[#86868B]">Không có ai chấm</td>
                  <td className="p-4 sm:p-5 bg-brand-blue/5 font-bold text-emerald-700">
                    GV IELTS 8.0+ chấm sửa từng câu
                  </td>
                  <td className="p-4 sm:p-5 text-[#86868B]">Chấm theo tuần trên lớp</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold">Tính chủ động thời gian</td>
                  <td className="p-4 sm:p-5 text-[#86868B]">Rất cao nhưng dễ nản</td>
                  <td className="p-4 sm:p-5 bg-brand-blue/5 font-bold text-brand-blue">
                    100% Chủ động trong 120 ngày
                  </td>
                  <td className="p-4 sm:p-5 text-[#86868B]">Lịch cố định (Nghỉ là mất bài)</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold">Slide lý thuyết tương tác</td>
                  <td className="p-4 sm:p-5 text-[#86868B]">Tài liệu rời rạc trôi nổi</td>
                  <td className="p-4 sm:p-5 bg-brand-blue/5 font-bold text-emerald-700">
                    27 Slide Bento Grid Socratic chuẩn hóa
                  </td>
                  <td className="p-4 sm:p-5 text-[#86868B]">Giáo viên chiếu trên lớp</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold">Phòng thi thử & Chấm điểm</td>
                  <td className="p-4 sm:p-5 text-[#86868B]">Tự dò đáp án thủ công</td>
                  <td className="p-4 sm:p-5 bg-brand-blue/5 font-bold text-brand-blue">
                    Phòng thi số NextBand chấm điểm tức thì
                  </td>
                  <td className="p-4 sm:p-5 text-[#86868B]">Thi thử định kỳ tại trung tâm</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. FAQ SECTION (Giải đáp thắc mắc thường gặp)                             */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-white border-t border-black/[0.06]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D1D1F]">
              Câu hỏi thường gặp về Gói Tự Học
            </h2>
            <p className="text-[#86868B] text-sm">
              Mọi điều bạn cần biết trước khi bắt đầu hành trình tự học trên NextBand.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Khóa tự học không có video bài giảng thì học như thế nào?",
                a: "Bạn sẽ học qua 27 Slide Bento Grid tương tác chuẩn ARIS. Đây không phải file PowerPoint thông thường mà là hệ thống web tương tác, bóc tách cấu trúc câu, mã màu ngữ pháp và câu hỏi gợi mở Socratic. Học viên tự click đọc lý thuyết sẽ tập trung và nhanh hơn rất nhiều so với việc ngồi xem video 45 phút thụ động.",
              },
              {
                q: "Sau khi nộp bài Writing hoặc Speaking, bao lâu thì nhận được nhận xét?",
                a: "Đội ngũ Giáo viên IELTS 8.0+ cam kết chấm chữa và gửi lại nhận xét chi tiết từng câu trong vòng 48h - 72h làm việc trực tiếp trên hệ thống NextBand LMS.",
              },
              {
                q: "Thời hạn 120 ngày được tính từ thời điểm nào?",
                a: "Thời hạn 120 ngày (4 tháng) được tính từ lúc tài khoản của bạn được Admin kích hoạt thành công. Trong suốt 120 ngày, bạn được toàn quyền truy cập slide, làm bài tập và nhận phản hồi từ giáo viên.",
              },
              {
                q: "Nếu làm bài chưa đạt thì có được làm lại không?",
                a: "Có! Đối với bài viết hoặc nói chưa đạt chuẩn, giáo viên sẽ bật cờ 'Yêu cầu sửa bài (Revision Required)'. Bạn sẽ được phép nộp bài làm lại lần 2 (Attempt 2) để giáo viên chấm lại và nắn chỉnh dứt điểm lỗi sai.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="p-5 rounded-2xl bg-[#F5F5F7] border border-black/[0.04] space-y-2"
              >
                <h4 className="text-base font-bold text-[#1D1D1F] flex items-start gap-2">
                  <span className="text-brand-blue font-black">Q:</span>
                  <span>{faq.q}</span>
                </h4>
                <p className="text-sm text-[#515154] pl-5 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. BOTTOM BANNER CTA                                                      */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 bg-[#002147] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Sẵn sàng bứt phá điểm số với chi phí tối ưu nhất?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
            Kích hoạt tài khoản Tự Học 120 Ngày ngay hôm nay và trải nghiệm chất lượng chấm chữa chuyên nghiệp từ đội ngũ Giảng viên IELTS 8.0+.
          </p>
          <div className="pt-2">
            <Button
              size="lg"
              onClick={() => handleRegister(SELF_STUDY_PACKAGES[3])}
              className="rounded-full px-8 h-14 font-extrabold text-base bg-brand-red hover:bg-brand-red-hover text-white shadow-xl gap-2 cursor-pointer"
            >
              <span>Nhận tư vấn & Kích hoạt gói</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Modal đăng ký gói */}
      <QuickTrialModal
        isOpen={trialModalOpen}
        onClose={() => setTrialModalOpen(false)}
        initialCourseSlug={activePackage.slug}
      />
    </div>
  );
}
