import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Users,
  GraduationCap,
  Award,
  BookOpen,
  ShieldCheck,
  Calculator,
  Phone,
  MapPin,
  Flame,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TransparentProgramsOverviewProps {
  onOpenTrial: (courseKey: string) => void;
}

const GENERAL_ENGLISH_PROGRAMS = [
  {
    key: "thcs",
    badge: "Lớp 6 – Lớp 9",
    title: "Tiếng Anh THCS",
    price: "1.000.000đ",
    unit: "/ tháng",
    target: "Nắm chắc ngữ pháp – từ vựng SGK & bứt phá kỳ thi Tuyển sinh vào lớp 10",
    highlights: [
      "Hệ thống hóa toàn bộ ngữ pháp trọng tâm THCS từ bản chất, không học vẹt công thức",
      "Rèn phát âm chuẩn IPA, mở rộng vốn từ học thuật và kỹ năng đọc hiểu",
      "Theo dõi chuyên cần & kết quả bài tập hàng tuần minh bạch trên NextBand LMS",
    ],
    accentBorder: "border-sky-500/30 hover:border-sky-500/70",
    badgeClass: "bg-sky-500/10 text-sky-700 border-sky-500/25",
    priceColor: "text-sky-700",
  },
  {
    key: "thpt",
    badge: "Lớp 10 – Lớp 12",
    title: "Tiếng Anh THPT",
    price: "1.000.000đ",
    unit: "/ tháng",
    target: "Vững vàng điểm số trên lớp & chinh phục điểm 8.5 – 9.5+ kỳ thi Tốt nghiệp THPT",
    highlights: [
      "Làm chủ cấu trúc ngữ pháp nâng cao, mệnh đề phân từ, đảo ngữ và collocations",
      "Chiến thuật bóc tách các bài đọc hiểu dài (Reading Comprehension) chuẩn đề Bộ GD&ĐT",
      "Tạo nền tảng song song giúp học sinh dễ dàng chuyển tiếp sang chứng chỉ IELTS",
    ],
    accentBorder: "border-indigo-500/30 hover:border-indigo-500/70",
    badgeClass: "bg-indigo-500/10 text-indigo-700 border-indigo-500/25",
    priceColor: "text-indigo-700",
  },
];

const CAMBRIDGE_PROGRAMS = [
  {
    key: "cambridge-flyers",
    level: "Cấp độ 1 • 10–11 Tuổi",
    name: "CAMBRIDGE FLYERS",
    cefr: "Chuẩn A2 • 14–15 Khiên",
    price: "1.000.000đ",
    unit: "/ tháng",
    desc: "Nấc thang cao nhất hệ Young Learners. Diễn đạt mạch lạc bằng câu phức, đọc hiểu văn bản 150–200 từ và giao tiếp tự tin.",
    ieltsBridge: "Bệ phóng tương đương IELTS 3.5 – 4.0",
    topBar: "from-sky-500 to-cyan-500",
    borderClass: "border-sky-500/25 hover:border-sky-500/60",
    badgeClass: "bg-sky-50 text-sky-700 border-sky-200",
    priceColor: "text-sky-700",
  },
  {
    key: "cambridge-ket",
    level: "Cấp độ 2 • 11–13 Tuổi",
    name: "CAMBRIDGE KET (A2 Key)",
    cefr: "Pass with Merit / Distinction",
    price: "1.200.000đ",
    unit: "/ tháng",
    desc: "Bước chuyển bản lề sang hệ học thuật thiếu niên. Đọc hiểu báo chí/thông báo, viết email chuẩn cấu trúc và phản xạ phỏng vấn 1:1.",
    ieltsBridge: "Bệ phóng tương đương IELTS 4.0 – 4.5",
    topBar: "from-amber-500 to-orange-500",
    borderClass: "border-amber-500/30 hover:border-amber-500/70",
    badgeClass: "bg-amber-50 text-amber-800 border-amber-200",
    priceColor: "text-amber-700",
    isPopular: true,
  },
  {
    key: "cambridge-pet",
    level: "Cấp độ 3 • 12–15 Tuổi",
    name: "CAMBRIDGE PET (B1 Prelim)",
    cefr: "Chuẩn B1 / B2 CEFR Quốc tế",
    price: "1.500.000đ",
    unit: "/ tháng",
    desc: "Khóa tinh hoa cho học sinh THCS thi chuyên hoặc lấy nền IELTS sớm. Đọc phân tích bài dài 350+ từ, viết luận 100 từ và tranh biện Speaking.",
    ieltsBridge: "Tiến thẳng vào lộ trình IELTS 5.0 – 5.5+",
    topBar: "from-emerald-500 to-teal-500",
    borderClass: "border-emerald-500/30 hover:border-emerald-500/70",
    badgeClass: "bg-emerald-50 text-emerald-800 border-emerald-200",
    priceColor: "text-emerald-700",
  },
];

// Thứ tự hiển thị từ cao xuống thấp hoặc từ gốc lên đỉnh:
// Hiển thị theo bậc thang từ Mất gốc -> 6.5+ kèm nút chuyển hoặc hiển thị đúng phong cách Poster trực quan
const IELTS_TIERS = [
  {
    slug: "starter",
    weeks: "09",
    name: "KHÓA DREAMER",
    bandLabel: "ĐẦU RA 3.0",
    entry: "Các bạn mất gốc tiếng Anh",
    tuition: "4.900.000đ",
    summary: "Chuẩn hóa 44 âm IPA, từ vựng sinh hoạt cốt lõi & làm chủ cấu trúc câu đơn chuẩn ngữ pháp.",
    pillGradient: "linear-gradient(135deg, #F27481 0%, #E85263 100%)",
    rowBg: "bg-[#FFF8F9] hover:bg-[#FFF1F3]",
    borderClass: "border-[#EE6873]/35 hover:border-[#EE6873]",
    accentText: "text-[#D94352]",
    badgeBg: "bg-[#EE6873]/15 text-[#C83745] border-[#EE6873]/30",
  },
  {
    slug: "dreamer",
    weeks: "09",
    name: "KHÓA DOER",
    bandLabel: "3.0 → 4.0",
    entry: "IELTS 3.0",
    tuition: "5.400.000đ",
    summary: "Xây dựng câu ghép/câu phức, đọc hiểu đoạn văn học thuật ngắn và phản xạ Speaking Part 1.",
    pillGradient: "linear-gradient(135deg, #3554B8 0%, #233B8C 100%)",
    rowBg: "bg-[#F7F9FF] hover:bg-[#EEF3FF]",
    borderClass: "border-[#294398]/35 hover:border-[#294398]",
    accentText: "text-[#233B8C]",
    badgeBg: "bg-[#294398]/12 text-[#233B8C] border-[#294398]/30",
  },
  {
    slug: "builder",
    weeks: "09",
    name: "KHÓA BUILDER",
    bandLabel: "4.0 → 5.0",
    entry: "IELTS 4.0",
    tuition: "6.000.000đ",
    summary: "Làm quen trọn vẹn 4 kỹ năng IELTS chuẩn Cambridge, viết đoạn luận điểm & mô tả biểu đồ cơ bản.",
    pillGradient: "linear-gradient(135deg, #FB8C50 0%, #E86B2A 100%)",
    rowBg: "bg-[#FFF9F5] hover:bg-[#FFF3EB]",
    borderClass: "border-[#F37C42]/40 hover:border-[#F37C42]",
    accentText: "text-[#D95D1E]",
    badgeBg: "bg-[#F37C42]/15 text-[#C65014] border-[#F37C42]/30",
  },
  {
    slug: "master",
    weeks: "09",
    name: "KHÓA MASTER",
    bandLabel: "5.0 → 6.0",
    entry: "IELTS 5.0",
    tuition: "6.600.000đ",
    summary: "Tái cấu trúc lập luận Writing Task 2 (The ARIS Way), phân tích số liệu Task 1 & mở rộng Speaking Part 2/3.",
    pillGradient: "linear-gradient(135deg, #62994F 0%, #467536 100%)",
    rowBg: "bg-[#F7FBF6] hover:bg-[#EEF7EC]",
    borderClass: "border-[#538442]/40 hover:border-[#538442]",
    accentText: "text-[#3E6B2F]",
    badgeBg: "bg-[#538442]/15 text-[#38632A] border-[#538442]/30",
    isPopular: true,
  },
  {
    slug: "leader",
    weeks: "10",
    name: "KHÓA LEADER",
    bandLabel: "6.0 → 6.5+",
    entry: "IELTS 6.0",
    tuition: "7.400.000đ",
    summary: "Tinh chỉnh văn phong học thuật C1 tự nhiên, tư duy phản biện sắc bén & thực chiến phòng thi áp lực cao.",
    pillGradient: "linear-gradient(135deg, #E03A3F 0%, #BA1E23 100%)",
    rowBg: "bg-[#FFF7F7] hover:bg-[#FFEEEE]",
    borderClass: "border-[#D12E33]/40 hover:border-[#D12E33]",
    accentText: "text-[#BA1E23]",
    badgeBg: "bg-[#D12E33]/15 text-[#B0191E] border-[#D12E33]/30",
  },
];

export function TransparentProgramsOverview({
  onOpenTrial,
}: TransparentProgramsOverviewProps) {
  const navigate = useNavigate();

  return (
    <section
      id="bang-hoc-phi"
      className="py-16 sm:py-24 border-b border-border/80 bg-white relative overflow-hidden"
    >
      {/* Subtle decorative radial background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[380px] bg-gradient-to-b from-[#002147]/[0.04] to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-14">
        {/* =============================================================== */}
        {/* HEADER: BỨC TRANH TỔNG QUAN & CAM KẾT MINH BẠCH                 */}
        {/* =============================================================== */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/90 text-amber-900 border border-amber-300/80 text-xs sm:text-sm font-black uppercase tracking-wider shadow-2xs">
            <Sparkles className="h-4 w-4 text-amber-600" />
            <span>Tổng Quan Chương Trình &amp; Học Phí Công Khai</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-[1.15]">
            Lộ trình rõ ràng cho từng lứa tuổi.{" "}
            <span className="text-[#002147] block sm:inline">
              Học phí minh bạch ngay từ đầu.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-foreground/80 leading-relaxed max-w-3xl mx-auto">
            Không mập mờ chi phí, không ép đóng gộp cả năm. Phụ huynh và học viên dễ dàng tra cứu toàn bộ <strong>03 hệ đào tạo cốt lõi</strong> tại hệ thống ARIS • DAN IELTS chỉ trong một trang.
          </p>

          {/* 3 Core Commitments Strip */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 text-xs sm:text-sm font-extrabold">
            <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200/90">
              <Users className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Lớp siêu nhỏ tối đa 08 HV (= ½ trung tâm lớn)</span>
            </span>
            <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-blue-50 text-[#002147] border border-blue-200/90">
              <Award className="h-4 w-4 text-brand-blue shrink-0" />
              <span>Đội ngũ giáo viên chứng chỉ IELTS 8.0+</span>
            </span>
            <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-rose-50 text-brand-red border border-rose-200/90">
              <ShieldCheck className="h-4 w-4 text-brand-red shrink-0" />
              <span>Test trình độ &amp; Học thử 02 buổi miễn phí</span>
            </span>
          </div>
        </div>

        {/* =============================================================== */}
        {/* BLOCK 1 & 2: TIẾNG ANH PHỔ THÔNG (THCS/THPT) & CAMBRIDGE        */}
        {/* =============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* LEFT (5 cols): Tiếng Anh THCS & THPT — 1.000.000đ / tháng */}
          <div className="lg:col-span-5 rounded-3xl border-2 border-slate-200/90 bg-[#F8FAFC] p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xs">
            <div className="space-y-5">
              <div className="space-y-2 border-b border-slate-200 pb-4 text-left">
                <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-sky-700">
                  <BookOpen className="h-4 w-4" />
                  <span>Hệ Tiếng Anh Phổ Thông</span>
                </div>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-2xl sm:text-[26px] font-black text-foreground tracking-tight">
                    Tiếng Anh THCS &amp; THPT
                  </h3>
                  <span className="px-3 py-1 rounded-full bg-sky-600 text-white text-xs font-black">
                    Đồng giá 1.000.000đ/tháng
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                  Xây gốc ngữ pháp vững chắc, bứt phá điểm thi học kỳ trên trường, Tuyển sinh lớp 10 và Tốt nghiệp THPT.
                </p>
              </div>

              {/* 2 Cards: THCS & THPT */}
              <div className="space-y-4">
                {GENERAL_ENGLISH_PROGRAMS.map((prog) => (
                  <div
                    key={prog.key}
                    className={cn(
                      "rounded-2xl bg-white border-2 p-5 transition-all shadow-2xs text-left space-y-3",
                      prog.accentBorder
                    )}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <span
                          className={cn(
                            "inline-block px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border mb-1.5",
                            prog.badgeClass
                          )}
                        >
                          {prog.badge}
                        </span>
                        <h4 className="text-lg sm:text-xl font-black text-foreground">
                          {prog.title}
                        </h4>
                      </div>

                      <div className="text-right">
                        <div className={cn("text-xl sm:text-2xl font-black leading-none", prog.priceColor)}>
                          {prog.price}
                        </div>
                        <span className="text-xs font-bold text-muted-foreground">
                          {prog.unit}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs font-bold text-foreground/85">
                      {prog.target}
                    </p>

                    <ul className="space-y-1.5 pt-1 border-t border-slate-100">
                      {prog.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-foreground/75 leading-relaxed">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onOpenTrial(prog.key)}
                        className="w-full rounded-xl font-extrabold text-xs border-slate-300 hover:bg-[#002147] hover:text-white hover:border-[#002147] transition-colors gap-1.5"
                      >
                        <span>Đăng ký kiểm tra &amp; học thử {prog.title}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-sky-50/90 border border-sky-200/80 text-xs text-sky-950 font-semibold flex items-center justify-between gap-3">
              <span>Đóng học phí linh hoạt từng tháng • Sĩ số tối đa 08 em/lớp</span>
            </div>
          </div>

          {/* RIGHT (7 cols): Hệ Quốc Tế Cambridge (Flyers 1tr, KET 1.2tr, PET 1.5tr / tháng) */}
          <div className="lg:col-span-7 rounded-3xl border-2 border-[#002147]/15 bg-gradient-to-br from-[#001A38] via-[#002147] to-[#082F5E] text-white p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-md relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-400/15 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-5 relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-white/15 pb-4 text-left">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-cyan-300">
                    <GraduationCap className="h-4 w-4" />
                    <span>Chứng Chỉ Quốc Tế Thiếu Niên (10 – 15 Tuổi)</span>
                  </div>
                  <h3 className="text-2xl sm:text-[28px] font-black text-white tracking-tight">
                    Hệ Cambridge: FLYERS • KET • PET
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-xl">
                    Rèn luyện đồng đều 4 kỹ năng Nghe – Nói – Đọc – Viết chuẩn khung tham chiếu châu Âu CEFR, tạo bệ phóng vững chắc tiến thẳng vào IELTS 5.5 – 7.0+.
                  </p>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate("/courses/cambridge-kids")}
                  className="rounded-xl border-white/25 bg-white/10 hover:bg-white/20 text-white font-bold text-xs shrink-0 gap-1.5 w-fit"
                >
                  <span>Chi tiết chương trình</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>

              {/* 3 Cambridge Tier Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {CAMBRIDGE_PROGRAMS.map((cam) => (
                  <div
                    key={cam.key}
                    className={cn(
                      "rounded-2xl bg-white text-foreground p-5 flex flex-col justify-between space-y-4 shadow-lg relative overflow-hidden border-2",
                      cam.isPopular ? "border-amber-400 ring-2 ring-amber-400/30" : "border-white/90"
                    )}
                  >
                    <div className={cn("absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r", cam.topBar)} />

                    <div className="space-y-3 text-left pt-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className={cn("px-2 py-0.5 rounded-md text-[10px] font-extrabold border", cam.badgeClass)}>
                          {cam.level}
                        </span>
                        {cam.isPopular && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-black uppercase">
                            Phổ biến
                          </span>
                        )}
                      </div>

                      <div>
                        <h4 className="text-base sm:text-lg font-black text-foreground leading-snug">
                          {cam.name}
                        </h4>
                        <p className="text-[11px] font-bold text-muted-foreground mt-0.5">
                          {cam.cefr}
                        </p>
                      </div>

                      {/* Prominent Price Box */}
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                        <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                          Học phí công khai
                        </div>
                        <div className="flex items-baseline gap-1 mt-0.5">
                          <span className={cn("text-xl sm:text-2xl font-black", cam.priceColor)}>
                            {cam.price}
                          </span>
                          <span className="text-xs font-bold text-slate-600">{cam.unit}</span>
                        </div>
                      </div>

                      <p className="text-xs text-foreground/75 leading-relaxed">
                        {cam.desc}
                      </p>
                    </div>

                    <div className="space-y-3 pt-2 border-t border-slate-100 text-left">
                      <div className="text-[11px] font-extrabold text-[#002147] flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                        <span>{cam.ieltsBridge}</span>
                      </div>

                      <Button
                        size="sm"
                        onClick={() => onOpenTrial(cam.key)}
                        className="w-full rounded-xl font-black text-xs bg-[#002147] hover:bg-brand-red text-white transition-colors gap-1.5"
                      >
                        <span>Đăng ký test xếp lớp</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 p-3.5 rounded-2xl bg-white/10 border border-white/15 text-xs text-white/90 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="font-semibold">
                ✓ Sĩ số tối đa 08 học viên/lớp • Giáo viên kèm sát phát âm &amp; viết câu từng buổi
              </span>
              <span className="text-cyan-300 font-extrabold shrink-0">
                Miễn phí kiểm tra đầu vào 1:1
              </span>
            </div>
          </div>
        </div>

        {/* =============================================================== */}
        {/* BLOCK 3: LỘ TRÌNH 5 KHÓA IELTS (TỪ MẤT GỐC LÊN 6.5+ CHỈ 12 THÁNG) */}
        {/* =============================================================== */}
        <div className="rounded-[2rem] border-2 border-[#002147]/15 bg-[#FBF9F5] p-6 sm:p-10 shadow-sm space-y-8">
          {/* Top Banner inspired by DAN IELTS / ARIS Poster */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-border/80 text-left">
            <div className="space-y-2.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-red/10 text-brand-red border border-brand-red/25 text-xs font-black uppercase tracking-wider">
                <Flame className="h-3.5 w-3.5" />
                <span>Lộ Trình IELTS Tinh Gọn • +1.0 Band / 9–10 Tuần</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#002147] tracking-tight">
                Từ Mất Gốc Lên <span className="text-brand-red">IELTS 6.5+</span> Chỉ Trong 12 Tháng
              </h3>
              <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
                Thiết kế thành <strong>05 chặng độc lập</strong> — đầu vào ở mức nào học đúng từ chặng đó, đóng học phí theo từng khóa (không thu gộp trọn gói nhiều năm).
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Button
                variant="outline"
                onClick={() => navigate("/courses#tuition-calculator")}
                className="rounded-2xl h-12 px-5 font-extrabold text-xs sm:text-sm border-2 border-[#002147]/20 bg-white hover:bg-[#002147]/5 text-[#002147] gap-2"
              >
                <Calculator className="h-4 w-4 text-brand-blue" />
                <span>Tính học bổng giảm đến 1.2tr/khóa</span>
              </Button>
              <Button
                onClick={() => onOpenTrial("starter")}
                className="rounded-2xl h-12 px-6 font-black text-xs sm:text-sm bg-brand-red hover:bg-brand-red-hover text-white shadow-md gap-2"
              >
                <span>Test trình độ &amp; Học thử miễn phí</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* 5 Color-Coded Course Pills (Ordered Top-Down like Poster or Bottom-Up with crisp visual hierarchy — let's show Starter -> Leader with clear progression numbers and exact poster colors!) */}
          <div className="space-y-3.5">
            {[...IELTS_TIERS].reverse().map((tier) => (
              <div
                key={tier.slug}
                className={cn(
                  "group rounded-2xl sm:rounded-3xl border-2 p-2 sm:p-2.5 transition-all duration-200 flex flex-col md:flex-row items-stretch md:items-center gap-3 sm:gap-5 shadow-2xs hover:shadow-md",
                  tier.rowBg,
                  tier.borderClass
                )}
              >
                {/* Left Duration Pill (09 Tuần / 10 Tuần) */}
                <div
                  className="md:w-32 shrink-0 rounded-xl sm:rounded-2xl py-3 px-4 text-white flex md:flex-col items-center justify-between md:justify-center text-center shadow-xs"
                  style={{ background: tier.pillGradient }}
                >
                  <div className="flex items-baseline md:flex-col md:items-center gap-1.5 md:gap-0">
                    <span className="text-2xl sm:text-3xl font-black leading-none tracking-tight">
                      {tier.weeks}
                    </span>
                    <span className="text-xs font-extrabold uppercase tracking-widest text-white/95">
                      Tuần
                    </span>
                  </div>
                  <span className="md:hidden text-[11px] font-black bg-white/20 px-2.5 py-0.5 rounded-full">
                    {tier.bandLabel}
                  </span>
                </div>

                {/* Middle Course Info */}
                <div className="flex-1 px-2 sm:px-1 py-1 text-left space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className={cn("text-lg sm:text-xl font-black tracking-tight", tier.accentText)}>
                      {tier.name} — {tier.bandLabel}
                    </h4>
                    <span className={cn("px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border", tier.badgeBg)}>
                      Đầu vào: {tier.entry}
                    </span>
                    {tier.isPopular && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-600 text-white">
                        Được chọn nhiều nhất
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                    {tier.summary}
                  </p>
                </div>

                {/* Right Tuition & Actions */}
                <div className="flex items-center justify-between md:justify-end gap-4 px-2 sm:px-3 py-2 md:py-0 border-t md:border-t-0 md:border-l border-black/10 md:pl-5 shrink-0">
                  <div className="text-left md:text-right">
                    <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                      Học phí trọn khóa
                    </div>
                    <div className={cn("text-xl sm:text-2xl font-black tracking-tight", tier.accentText)}>
                      {tier.tuition}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/courses/${tier.slug}`)}
                      className="rounded-xl font-bold text-xs border-slate-300 bg-white hover:bg-slate-100 text-foreground hidden sm:inline-flex"
                    >
                      Chi tiết
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => onOpenTrial(tier.slug)}
                      className="rounded-xl font-black text-xs bg-[#002147] hover:bg-brand-red text-white gap-1"
                    >
                      <span>Học thử</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Campus & Direct Hotline Bar */}
          <div className="pt-4 border-t border-border/80 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 text-xs sm:text-sm">
            <div className="space-y-1 text-left">
              <div className="font-extrabold text-foreground flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-brand-red shrink-0" />
                <span>Hệ thống cơ sở đào tạo trực tiếp (Offline &amp; Online đồng nhất mức phí):</span>
              </div>
              <div className="text-foreground/75 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 pl-5">
                <span><strong>CS1 (ARIS IELTS):</strong> 68B Phan Bội Châu, P. Dĩ An, TP. HCM</span>
                <span className="hidden sm:inline text-slate-300">|</span>
                <span><strong>CS2 (DAN IELTS):</strong> 103B đường 12, P. Tam Bình, TP. HCM</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <a
                href="tel:0933319693"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border-2 border-[#002147]/15 hover:border-brand-red text-[#002147] font-black text-xs sm:text-sm shadow-2xs transition-colors"
              >
                <Phone className="h-4 w-4 text-brand-red" />
                <span>Hotline: 0933.319.693 • 0909.040.585</span>
              </a>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/courses")}
                className="font-extrabold text-brand-blue hover:text-brand-red gap-1"
              >
                <span>So sánh chi tiết 5 chặng</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
