import React, { useState, useMemo } from "react";
import {
  Calculator,
  CheckCircle2,
  Tag,
  ArrowRight,
  Sparkles,
  Award,
  Flame,
  Users,
  ShieldCheck,
  GraduationCap,
  BookOpen,
  Info,
  FileText,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ScholarshipOption {
  id: string;
  label: string;
  amt: number;
}

const COURSES_SEQUENCE = ["starter", "dreamer", "builder", "master", "leader"] as const;
type CourseKey = (typeof COURSES_SEQUENCE)[number];

const COURSE_NAMES: Record<CourseKey, string> = {
  starter: "STARTER",
  dreamer: "DREAMER",
  builder: "BUILDER",
  master: "MASTER",
  leader: "LEADER",
};

// ARIS standard tuition per course (identical for Online & Offline)
const COURSE_TUITION: Record<CourseKey, number> = {
  starter: 4500000,
  dreamer: 5000000,
  builder: 5500000,
  master: 6000000,
  leader: 7000000,
};

// 1. Học bổng Tinh Anh (Khóa đầu tiên)
const TINH_ANH_OPTIONS: ScholarshipOption[] = [
  { id: "none", label: "Chọn thành tích năng lực đầu vào...", amt: 0 },
  { id: "bac1", label: "Bậc 1: SV Giỏi (GPA ≥ 3.2) / HSG THPT (GPA ≥ 9.0) — 500k", amt: 500000 },
  { id: "bac2", label: "Bậc 2: Tân SV (ĐGNL ≥ 850 / THPT ≥ 26đ) / NCKH — 700k", amt: 700000 },
  { id: "bac3", label: "Bậc 3: SV Xuất sắc (GPA ≥ 3.6) / HSG Tỉnh — 900k", amt: 900000 },
  { id: "bac4", label: "Bậc 4: HSG cấp Quốc gia các môn văn hóa — 1.200k", amt: 1200000 },
];

// 2. Học bổng Kỷ Luật (Từ khóa 2 trở đi)
const KY_LUAT_OPTIONS: ScholarshipOption[] = [
  { id: "none", label: "Chọn mức học chăm chỉ mà bạn dự định đạt được", amt: 0 },
  { id: "cap1", label: "Hoàn thành 50–69% bài tập về nhà", amt: 200000 },
  { id: "cap2", label: "Hoàn thành 70–79% bài tập về nhà", amt: 300000 },
  { id: "cap3", label: "Hoàn thành 80–89% bài tập về nhà", amt: 400000 },
  { id: "cap4", label: "Hoàn thành từ 90% bài tập về nhà", amt: 500000 },
];

// 3. Đặc Quyền Đồng Môn (200k/khóa)
const DONG_MON_VOUCHER_AMT = 200000;

const formatVND = (num: number) => {
  return Math.round(num).toLocaleString("vi-VN").replace(/,/g, ".") + "đ";
};

export function ScholarshipPolicyDetails() {
  return (
    <div className="space-y-8">
      {/* 3 Main Program Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {/* Card 1: Tinh Anh */}
        <div className="bg-card border-2 border-brand-red/20 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4 flex flex-col justify-between hover:border-brand-red/50 transition-all">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-2xl bg-brand-red/10 text-brand-red">
                <Award className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-brand-red/10 text-brand-red uppercase tracking-wider">
                Thưởng Năng Lực
              </span>
            </div>
            <div>
              <h4 className="text-lg font-black text-foreground">Học bổng Tinh Anh</h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Dành cho học viên có thành tích nổi bật khi nhập học
              </p>
            </div>

            {/* Tiers List */}
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-muted/60 flex justify-between items-center">
                <div>
                  <p className="font-bold text-foreground">Bậc 4: HSG Quốc gia</p>
                  <p className="text-[11px] text-muted-foreground">Giải Nhất, Nhì, Ba, KK các môn văn hóa</p>
                </div>
                <span className="font-extrabold text-brand-red text-xs sm:text-sm shrink-0 pl-2">
                  1.200.000đ
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-muted/60 flex justify-between items-center">
                <div>
                  <p className="font-bold text-foreground">Bậc 3: SV Xuất sắc / HSG Tỉnh</p>
                  <p className="text-[11px] text-muted-foreground">GPA ≥ 3.6/4.0 | Olympic 30/4</p>
                </div>
                <span className="font-extrabold text-brand-red text-xs sm:text-sm shrink-0 pl-2">
                  900.000đ
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-muted/60 flex justify-between items-center">
                <div>
                  <p className="font-bold text-foreground">Bậc 2: Tân SV / NCKH</p>
                  <p className="text-[11px] text-muted-foreground">ĐGNL ≥ 850 | THPT ≥ 26đ | SV 5 Tốt</p>
                </div>
                <span className="font-extrabold text-brand-red text-xs sm:text-sm shrink-0 pl-2">
                  700.000đ
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-muted/60 flex justify-between items-center">
                <div>
                  <p className="font-bold text-foreground">Bậc 1: SV Giỏi / HSG THPT</p>
                  <p className="text-[11px] text-muted-foreground">GPA ≥ 3.2/4.0 | GPA THPT ≥ 9.0</p>
                </div>
                <span className="font-extrabold text-brand-red text-xs sm:text-sm shrink-0 pl-2">
                  500.000đ
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-border/70 space-y-2 text-[11px] text-muted-foreground">
            <p>• Áp dụng cho khóa học đầu tiên tại ARIS.</p>
            <p>• Chọn mức cao nhất, không cộng dồn nhiều thành tích.</p>
            <div className="p-2 rounded-xl bg-brand-red/5 text-brand-red font-medium italic">
              &ldquo;Bạn giỏi trước khi vào ARIS → ARIS đầu tư vào bạn.&rdquo;
            </div>
          </div>
        </div>

        {/* Card 2: Kỷ Luật */}
        <div className="bg-card border-2 border-brand-blue/20 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4 flex flex-col justify-between hover:border-brand-blue/50 transition-all">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-2xl bg-brand-blue-soft text-brand-blue">
                <Flame className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-brand-blue-soft text-brand-blue uppercase tracking-wider">
                Thưởng Kỷ Luật
              </span>
            </div>
            <div>
              <h4 className="text-lg font-black text-foreground">Học bổng Kỷ Luật</h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Dành cho học viên duy trì nỗ lực trong từng khóa học
              </p>
            </div>

            {/* Tiers List */}
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-muted/60 space-y-0.5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-foreground">Cấp 1</span>
                  <span className="font-extrabold text-brand-blue text-xs sm:text-sm">200.000đ</span>
                </div>
                <p className="text-muted-foreground text-[11px]">Hoàn thành 50–69% bài tập về nhà</p>
              </div>
              <div className="p-2.5 rounded-xl bg-muted/60 space-y-0.5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-foreground">Cấp 2</span>
                  <span className="font-extrabold text-brand-blue text-xs sm:text-sm">300.000đ</span>
                </div>
                <p className="text-muted-foreground text-[11px]">Hoàn thành 70–79% bài tập về nhà</p>
              </div>
              <div className="p-2.5 rounded-xl bg-muted/60 space-y-0.5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-foreground">Cấp 3</span>
                  <span className="font-extrabold text-brand-blue text-xs sm:text-sm">400.000đ</span>
                </div>
                <p className="text-muted-foreground text-[11px]">Hoàn thành 80–89% bài tập về nhà</p>
              </div>
              <div className="p-2.5 rounded-xl bg-brand-blue-soft/40 border border-brand-blue/20 space-y-0.5">
                <div className="flex justify-between items-center">
                  <span className="font-black text-brand-blue">Cấp 4 — Kỷ Luật Xuất Sắc</span>
                  <span className="font-black text-brand-blue text-xs sm:text-sm">500.000đ</span>
                </div>
                <p className="text-brand-blue/80 text-[11px]">Hoàn thành từ 90% bài tập về nhà</p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-border/70 space-y-2 text-[11px] text-muted-foreground">
            <p>• Dữ liệu đánh giá minh bạch trên NextBand LMS.</p>
            <p>• Khấu trừ trực tiếp vào học phí khóa kế tiếp.</p>
            <div className="p-2 rounded-xl bg-brand-blue-soft/50 text-brand-blue font-medium italic">
              &ldquo;Bền bỉ mỗi ngày → Nỗ lực được ghi nhận xứng đáng.&rdquo;
            </div>
          </div>
        </div>

        {/* Card 3: Đồng Môn */}
        <div className="bg-card border-2 border-emerald-500/20 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4 flex flex-col justify-between hover:border-emerald-500/50 transition-all">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                Thưởng Kết Nối
              </span>
            </div>
            <div>
              <h4 className="text-lg font-black text-foreground">Đặc Quyền Đồng Môn</h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Tri ân học viên giới thiệu bạn bè, người thân
              </p>
            </div>

            {/* 2-Way Benefit */}
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-muted/60 space-y-0.5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-foreground">Người được giới thiệu</span>
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm">
                    200.000đ
                  </span>
                </div>
                <p className="text-muted-foreground text-[11px]">Giảm trực tiếp vào học phí khóa đầu tiên</p>
              </div>

              <div className="p-2.5 rounded-xl bg-muted/60 space-y-0.5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-foreground">Người giới thiệu</span>
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm">
                    200.000đ
                  </span>
                </div>
                <p className="text-muted-foreground text-[11px]">Nhận Voucher áp dụng cho khóa tiếp theo</p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-border/70 space-y-2 text-[11px] text-muted-foreground">
            <p>• Ghi nhận khi học viên mới hoàn tất ghi danh.</p>
            <p>• Có giá trị cộng dồn cùng Học bổng Tinh Anh / Kỷ Luật.</p>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-medium italic">
              &ldquo;Bạn học của tôi cũng là đồng môn của tôi — Cùng phát triển.&rdquo;
            </div>
          </div>
        </div>
      </div>

      {/* 4 Core Operational Principles */}
      <div className="p-5 sm:p-6 rounded-3xl bg-muted/30 border border-border/80 space-y-3">
        <h4 className="font-black text-sm sm:text-base text-foreground flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-brand-blue" />
          <span>Nguyên Tắc Học Phí & Xét Duyệt Tại ARIS</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs text-foreground/80">
          <div className="p-3 rounded-2xl bg-card border border-border/50 space-y-1">
            <p className="font-bold text-foreground">Đồng nhất mức phí</p>
            <p className="text-muted-foreground text-[11px] leading-relaxed">
              Học phí Online và Offline áp dụng như nhau, minh bạch theo từng khóa.
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-card border border-border/50 space-y-1">
            <p className="font-bold text-foreground">Đóng theo từng khóa</p>
            <p className="text-muted-foreground text-[11px] leading-relaxed">
              Học viên đóng theo từng chặng học, ARIS không thu gộp học phí cả lộ trình.
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-card border border-border/50 space-y-1">
            <p className="font-bold text-foreground">Minh bạch trên LMS</p>
            <p className="text-muted-foreground text-[11px] leading-relaxed">
              Dữ liệu chuyên cần & BTVN được ghi nhận tự động trên hệ thống NextBand.
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-card border border-border/50 space-y-1">
            <p className="font-bold text-foreground">Không cộng dồn Tinh Anh</p>
            <p className="text-muted-foreground text-[11px] leading-relaxed">
              Mỗi học viên áp dụng 01 mức Tinh Anh cao nhất; cộng dồn được với Đồng Môn.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface CoursePickState {
  ta: string; // Tinh Anh option ID (1st course)
  kl: string; // Kỷ Luật option ID (2nd+ courses)
  dm: boolean; // Đồng Môn voucher
}

export function TuitionCalculator() {
  const [startCourse, setStartCourse] = useState<CourseKey>("starter");
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const [picks, setPicks] = useState<Record<CourseKey, CoursePickState>>({
    starter: { ta: "none", kl: "none", dm: false },
    dreamer: { ta: "none", kl: "none", dm: false },
    builder: { ta: "none", kl: "none", dm: false },
    master: { ta: "none", kl: "none", dm: false },
    leader: { ta: "none", kl: "none", dm: false },
  });

  const activePath = useMemo(() => {
    const startIndex = COURSES_SEQUENCE.indexOf(startCourse);
    return COURSES_SEQUENCE.slice(startIndex);
  }, [startCourse]);

  const handleTaChange = (course: CourseKey, val: string) => {
    setPicks((prev) => ({
      ...prev,
      [course]: { ...prev[course], ta: val },
    }));
  };

  const handleKlChange = (course: CourseKey, val: string) => {
    setPicks((prev) => ({
      ...prev,
      [course]: { ...prev[course], kl: val },
    }));
  };

  const handleDmChange = (course: CourseKey, val: boolean) => {
    setPicks((prev) => ({
      ...prev,
      [course]: { ...prev[course], dm: val },
    }));
  };

  // Calculate costs per course and totals
  const courseCalculations = useMemo(() => {
    return activePath.map((courseKey, idx) => {
      const tuition = COURSE_TUITION[courseKey];
      const pick = picks[courseKey] || { ta: "none", kl: "none", dm: false };
      let discount = 0;
      let scholarshipDiscount = 0;

      if (idx === 0) {
        // Khóa đầu tiên: Học bổng Tinh Anh
        const taOpt = TINH_ANH_OPTIONS.find((o) => o.id === pick.ta);
        if (taOpt && taOpt.amt > 0) {
          discount += taOpt.amt;
          scholarshipDiscount = taOpt.amt;
        }
      } else {
        // Từ khóa thứ 2: Học bổng Kỷ Luật
        const klOpt = KY_LUAT_OPTIONS.find((o) => o.id === pick.kl);
        if (klOpt && klOpt.amt > 0) {
          discount += klOpt.amt;
          scholarshipDiscount = klOpt.amt;
        }
      }

      // Đặc Quyền Đồng Môn (200k)
      if (pick.dm) {
        discount += DONG_MON_VOUCHER_AMT;
      }

      // Cap discount defensively
      if (discount > tuition) {
        discount = tuition;
      }

      const net = tuition - discount;

      return {
        courseKey,
        courseName: COURSE_NAMES[courseKey],
        courseNum: idx + 1,
        isFirst: idx === 0,
        tuition,
        discount,
        scholarshipDiscount,
        net,
        hasDm: pick.dm,
        taValue: pick.ta,
        klValue: pick.kl,
      };
    });
  }, [activePath, picks]);

  const totals = useMemo(() => {
    let gross = 0;
    let discount = 0;
    courseCalculations.forEach((item) => {
      gross += item.tuition;
      discount += item.discount;
    });
    const net = gross - discount;
    const savingsPct = gross > 0 ? Math.round((discount / gross) * 100) : 0;
    return { gross, discount, net, savingsPct };
  }, [courseCalculations]);

  return (
    <div id="tuition-calculator" className="space-y-16 pt-8 pb-16 sm:pt-12 sm:pb-20 bg-slate-50/70 dark:bg-slate-900/30">
      {/* SECTION 1: INTERACTIVE CALCULATOR */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
            Tính học phí của bạn
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Chọn khóa học khởi đầu theo trình độ hiện tại để xem lộ trình và dự toán học phí sau học bổng.
          </p>
        </div>

        {/* Main Grid: Calculation Table Card (Left) + Total Sidebar (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Card (Col 1 to 8) */}
          <div className="lg:col-span-8 bg-card border border-border/90 rounded-3xl p-5 sm:p-7 shadow-sm space-y-6">
            {/* Top Bar: Khoá bắt đầu */}
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase tracking-wider text-brand-red">
                Khoá bắt đầu
              </label>
              <div className="flex flex-wrap sm:flex-nowrap gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-border/60">
                {COURSES_SEQUENCE.map((key) => {
                  const isActive = startCourse === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setStartCourse(key)}
                      className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-black transition-all text-center uppercase tracking-wide ${
                        isActive
                          ? "bg-[#0f294d] text-white shadow-sm"
                          : "text-slate-600 dark:text-slate-300 hover:text-foreground hover:bg-white/60 dark:hover:bg-slate-700/50"
                      }`}
                    >
                      {COURSE_NAMES[key]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Path summary banner */}
            <div className="px-4 py-3 bg-red-50/70 dark:bg-red-950/20 border-l-4 border-brand-red rounded-r-2xl text-brand-red text-xs sm:text-sm font-semibold flex items-center gap-2">
              <span>
                Lộ trình của bạn:{" "}
                <strong className="font-extrabold">
                  {activePath.map((k) => COURSE_NAMES[k]).join(" → ")}
                </strong>{" "}
                ({activePath.length} khoá)
              </span>
            </div>

            {/* Clickable Scholarship Policy Box */}
            <div
              onClick={() => setIsPolicyOpen(true)}
              className="p-4 sm:p-4.5 rounded-2xl bg-gradient-to-r from-brand-blue/10 via-amber-500/5 to-emerald-500/10 border-2 border-brand-blue/20 hover:border-brand-blue/60 hover:shadow-md transition-all group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-[#0f294d] text-white shadow-xs group-hover:scale-105 transition-transform shrink-0">
                  <BookOpen className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-black px-2 py-0.5 rounded-md bg-[#0f294d] text-white uppercase tracking-wider">
                      Quy chế ARIS
                    </span>
                    <span className="text-sm font-black text-foreground group-hover:text-brand-blue transition-colors">
                      Chính Sách Học Bổng & Đặc Quyền
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Click vào đây để đọc chi tiết điều kiện nhận học bổng Tinh Anh (đến 1.200k), Kỷ Luật & Đồng Môn
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPolicyOpen(true);
                }}
                className="w-full sm:w-auto shrink-0 px-3.5 py-2 rounded-xl bg-[#0f294d] text-white text-xs font-black flex items-center justify-center gap-1.5 group-hover:bg-brand-blue transition-all shadow-xs"
              >
                <span>Đọc chính sách</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Desktop Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-3 px-4 py-2.5 bg-slate-200/60 dark:bg-slate-800/70 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider items-center">
              <div className="col-span-2">Khoá học</div>
              <div className="col-span-2 text-right">Học phí gốc</div>
              <div className="col-span-2 text-right">Học phí sau giảm</div>
              <div className="col-span-4">Chính sách học bổng</div>
              <div className="col-span-2 text-center">Đặc quyền Đồng Môn</div>
            </div>

            {/* Course Rows */}
            <div className="space-y-4">
              {courseCalculations.map((c) => (
                <div
                  key={c.courseKey}
                  className="p-4 sm:p-5 rounded-2xl bg-[#edf4fb] dark:bg-slate-800/70 border border-[#d5e3f1] dark:border-slate-700/80 shadow-2xs hover:border-brand-blue/50 hover:shadow-xs transition-all space-y-3"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                    {/* Course Title & Step */}
                    <div className="md:col-span-2 flex items-center justify-between md:block">
                      <div>
                        <span className="text-[11px] font-black text-brand-red uppercase tracking-wider block">
                          Khoá {c.courseNum}
                        </span>
                        <span className="text-lg font-black text-[#0f294d] dark:text-slate-100 uppercase tracking-tight">
                          {c.courseName}
                        </span>
                      </div>
                      {/* Mobile price summary */}
                      <div className="md:hidden text-right">
                        {c.discount > 0 && (
                          <span className="text-xs line-through text-muted-foreground block">
                            {formatVND(c.tuition)}
                          </span>
                        )}
                        <span className="text-base font-black text-brand-red">
                          {formatVND(c.net)}
                        </span>
                      </div>
                    </div>

                    {/* Desktop Tuition Gốc */}
                    <div className="hidden md:block md:col-span-2 text-right">
                      <span className={`text-sm font-bold ${c.discount > 0 ? "line-through text-muted-foreground/60" : "text-foreground/90"}`}>
                        {formatVND(c.tuition)}
                      </span>
                    </div>

                    {/* Desktop Tuition Net */}
                    <div className="hidden md:block md:col-span-2 text-right">
                      <span
                        className={`text-base font-black ${
                          c.discount > 0 ? "text-brand-red" : "text-foreground"
                        }`}
                      >
                        {formatVND(c.net)}
                      </span>
                      {c.discount > 0 && (
                        <span className="block text-[10.5px] font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">
                          −{formatVND(c.discount)}
                        </span>
                      )}
                    </div>

                    {/* Scholarship Picker */}
                    <div className="md:col-span-4 space-y-1">
                      <label className="block md:hidden text-xs font-bold text-muted-foreground uppercase">
                        {c.isFirst ? "Học bổng Tinh Anh (Đầu vào)" : "Học bổng Kỷ Luật"}
                      </label>
                      {c.isFirst ? (
                        <select
                          value={c.taValue}
                          onChange={(e) => handleTaChange(c.courseKey, e.target.value)}
                          className="w-full text-xs bg-white dark:bg-slate-900 border border-[#c7d9ea] dark:border-slate-700 rounded-xl px-3 py-2 text-foreground font-medium shadow-2xs focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-hidden cursor-pointer"
                        >
                          {TINH_ANH_OPTIONS.map((opt) => (
                            <option key={opt.id} value={opt.id}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <select
                          value={c.klValue}
                          onChange={(e) => handleKlChange(c.courseKey, e.target.value)}
                          className="w-full text-xs bg-white dark:bg-slate-900 border border-[#c7d9ea] dark:border-slate-700 rounded-xl px-3 py-2 text-foreground font-medium shadow-2xs focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-hidden cursor-pointer"
                        >
                          {KY_LUAT_OPTIONS.map((opt) => (
                            <option key={opt.id} value={opt.id}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      )}
                      {c.scholarshipDiscount > 0 && (
                        <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 pl-1">
                          Mức giảm: {formatVND(c.scholarshipDiscount)}
                        </p>
                      )}
                    </div>

                    {/* Đồng Môn Referral */}
                    <div className="md:col-span-2 space-y-1">
                      <label className="block md:hidden text-xs font-bold text-muted-foreground uppercase">
                        Đặc quyền Đồng Môn
                      </label>
                      <select
                        value={c.hasDm ? "yes" : "no"}
                        onChange={(e) => handleDmChange(c.courseKey, e.target.value === "yes")}
                        className="w-full text-xs bg-white dark:bg-slate-900 border border-[#c7d9ea] dark:border-slate-700 rounded-xl px-3 py-2 text-foreground font-medium shadow-2xs focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-hidden cursor-pointer"
                      >
                        <option value="no">Không</option>
                        <option value="yes">Có</option>
                      </select>
                      {c.hasDm && (
                        <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 text-right pr-1">
                          Mức giảm: {formatVND(DONG_MON_VOUCHER_AMT)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Note under table */}
            <div className="pt-3 border-t border-border/70 text-xs text-foreground/80 leading-relaxed">
              <p>
                <strong className="text-brand-red font-bold">Lưu ý:</strong> Đây chỉ là
                bảng tính mô phỏng tổng học phí của bạn suốt lộ trình học. Bạn không cần đóng học phí
                cả lộ trình mà{" "}
                <span className="font-bold underline text-brand-red decoration-brand-red">
                  chỉ cần đóng học phí từng khóa
                </span>
                . Học Viện ARIS không thu học phí toàn bộ lộ trình.
              </p>
            </div>
          </div>

          {/* Total Summary Sidebar (Col 9 to 12) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-5">
            <div className="bg-card border-2 border-brand-blue/30 rounded-3xl p-6 sm:p-7 shadow-lg space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b border-border/80">
                <Tag className="w-5 h-5 text-brand-red" />
                <h3 className="font-black text-lg text-foreground">
                  Tổng kết dự toán học phí
                </h3>
              </div>

              {/* Breakdown */}
              <div className="space-y-3.5 text-sm">
                <div className="flex justify-between items-center text-muted-foreground font-medium">
                  <span>Tổng học phí gốc ({activePath.length} khóa)</span>
                  <span className="text-foreground font-bold">{formatVND(totals.gross)}</span>
                </div>

                <div className="flex justify-between items-center text-muted-foreground font-medium">
                  <span>Tổng học bổng & Đặc quyền</span>
                  <span className="text-emerald-700 dark:text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 rounded-lg font-black text-sm sm:text-base">
                    −{formatVND(totals.discount)}
                  </span>
                </div>

                <div className="h-px bg-border/80 my-2" />

                <div className="flex justify-between items-end bg-muted/40 p-3.5 rounded-2xl border border-border/70">
                  <div>
                    <span className="text-[11px] uppercase font-black text-muted-foreground tracking-wider block">
                      Tổng tiền thực đóng
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-brand-red">
                      {formatVND(totals.net)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Ultra Prominent Savings callout */}
              {totals.discount > 0 ? (
                <div className="relative overflow-hidden p-5 rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white shadow-xl shadow-emerald-600/30 border border-emerald-400/40 space-y-2">
                  <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
                  
                  <div className="flex items-center justify-between text-xs uppercase font-extrabold tracking-wider text-emerald-100">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                      Bạn Tiết Kiệm Được
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white font-black text-xs backdrop-blur-xs border border-white/25">
                      Giảm ~{totals.savingsPct}%
                    </span>
                  </div>
                  
                  <div className="text-3xl sm:text-4xl font-black tracking-tight text-white drop-shadow-md">
                    {formatVND(totals.discount)}
                  </div>
                  
                  <p className="text-[11.5px] text-emerald-100/90 leading-tight">
                    ✨ Đã áp dụng đầy đủ học bổng & đặc quyền tối đa cho lộ trình của bạn!
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-muted/60 border border-border/60 text-muted-foreground text-xs leading-relaxed text-center">
                  💡 Chọn thành tích năng lực đầu vào hoặc mức kỷ luật để xem số tiền học phí tiết kiệm được.
                </div>
              )}

              {/* 3 Pillars Summary */}
              <div className="space-y-2.5 pt-2 text-xs">
                <div className="p-2.5 rounded-xl bg-muted/50 space-y-1">
                  <div className="font-bold text-foreground flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-brand-red shrink-0" />
                    <span>Học bổng Tinh Anh: Giảm 500k – 1.200k (Khóa 1)</span>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-muted/50 space-y-1">
                  <div className="font-bold text-foreground flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-brand-blue shrink-0" />
                    <span>Học bổng Kỷ Luật: Giảm 200k – 500k / khóa</span>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-muted/50 space-y-1">
                  <div className="font-bold text-foreground flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    <span>Đặc quyền Đồng Môn: Giảm 200.000đ / khóa</span>
                  </div>
                </div>

                {/* Read full policy button */}
                <button
                  type="button"
                  onClick={() => setIsPolicyOpen(true)}
                  className="w-full mt-2 py-2.5 px-3 rounded-xl border border-brand-blue/30 bg-brand-blue/5 hover:bg-brand-blue/10 text-brand-blue font-black text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Đọc toàn bộ chính sách học bổng</span>
                </button>
              </div>
            </div>

            {/* Quick Consultation CTA */}
            <div className="p-5 rounded-3xl bg-brand-blue/10 border border-brand-blue/20 text-center space-y-3">
              <p className="text-xs sm:text-sm text-foreground/90 font-medium">
                Cần hỗ trợ hồ sơ xét duyệt học bổng?
              </p>
              <a
                href="https://zalo.me"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-2xl bg-brand-blue text-white font-extrabold text-xs sm:text-sm hover:bg-brand-blue/90 transition-colors shadow-xs"
              >
                <span>Nhắn Zalo tư vấn học bổng</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: CHÍNH SÁCH HỌC BỔNG CHI TIẾT (THE 3 PILLARS ON PAGE) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto pt-6 border-t border-border/70">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-blue-soft text-brand-blue font-bold text-xs sm:text-sm tracking-wide uppercase">
            <ShieldCheck className="w-4 h-4" />
            <span>Chính Sách Học Bổng & Đặc Quyền ARIS</span>
          </div>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground tracking-tight">
            Ba Giá Trị: Năng Lực — Kỷ Luật — Đồng Hành
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Học bổng tại ARIS không phải giảm giá đại trà. Đây là cơ chế ghi nhận và đồng hành cùng những học viên có năng lực, có kỷ luật và biết kết nối cùng cộng đồng.
          </p>
        </div>

        <ScholarshipPolicyDetails />
      </div>

      {/* MODAL DIALOG: CHÍNH SÁCH HỌC BỔNG POPUP */}
      <Dialog open={isPolicyOpen} onOpenChange={setIsPolicyOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-3xl">
          <DialogHeader className="space-y-2 text-left pb-4 border-b border-border/70">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-soft text-brand-blue font-bold text-xs tracking-wide uppercase w-fit">
              <ShieldCheck className="w-4 h-4" />
              <span>Chính Sách Học Bổng & Đặc Quyền ARIS</span>
            </div>
            <DialogTitle className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
              Ba Giá Trị: Năng Lực — Kỷ Luật — Đồng Hành
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Học bổng tại ARIS không phải giảm giá đại trà. Đây là cơ chế ghi nhận và đồng hành cùng những học viên có năng lực, có kỷ luật và biết kết nối cùng cộng đồng.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <ScholarshipPolicyDetails />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}



