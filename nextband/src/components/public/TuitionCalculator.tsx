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
} from "lucide-react";

interface ScholarshipOption {
  id: string;
  label: string;
  pct?: number;
  amt?: number;
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
  starter: 4400000,
  dreamer: 4900000,
  builder: 5400000,
  master: 5900000,
  leader: 6400000,
};

// 1. Học bổng Tinh Anh (Khóa đầu tiên)
const TINH_ANH_OPTIONS: ScholarshipOption[] = [
  { id: "none", label: "Chọn thành tích năng lực đầu vào...", pct: 0 },
  { id: "gpa_xuat_sac", label: "Sinh viên Xuất sắc (GPA ≥ 3.6/4.0 hoặc ≥ 9.0/10) — 20%", pct: 0.20 },
  { id: "hsg_qg", label: "HSG cấp Quốc gia các môn văn hoá — 25%", pct: 0.25 },
  { id: "hsg_tinh", label: "HSG cấp Tỉnh / TP • Olympic 30/4 — 20%", pct: 0.20 },
  { id: "tan_sv", label: "Tân sinh viên (ĐGNL ≥ 850 hoặc THPT ≥ 26đ) — 15%", pct: 0.15 },
  { id: "nckh_sv5tot", label: "Giải NCKH cấp Trường / Sinh viên 5 Tốt — 15%", pct: 0.15 },
  { id: "gpa_gioi", label: "Sinh viên Giỏi (GPA ≥ 3.2/4.0 hoặc ≥ 8.5/10) — 10%", pct: 0.10 },
  { id: "hsg_thpt", label: "Học sinh Giỏi THPT (GPA năm gần nhất ≥ 9.0) — 10%", pct: 0.10 },
];

// 2. Học bổng Kỷ Luật (Từ khóa 2 trở đi)
const KY_LUAT_OPTIONS: ScholarshipOption[] = [
  { id: "none", label: "Chọn mức nỗ lực kỷ luật dự kiến...", amt: 0 },
  { id: "cap1", label: "Cấp 1: BTVN ≥ 80% & Chuyên cần ≥ 90% (200k)", amt: 200000 },
  { id: "cap2", label: "Cấp 2: BTVN ≥ 90% & Chuyên cần ≥ 95% (300k)", amt: 300000 },
  { id: "cap3", label: "Cấp 3 — Kỷ Luật Thép: BTVN 100% & Chuyên cần 100% (500k)", amt: 500000 },
];

// 3. Đặc Quyền Đồng Môn (300k/khóa)
const DONG_MON_VOUCHER_AMT = 300000;

const formatVND = (num: number) => {
  return Math.round(num).toLocaleString("vi-VN").replace(/,/g, ".") + "đ";
};

interface CoursePickState {
  ta: string; // Tinh Anh option ID (1st course)
  kl: string; // Kỷ Luật option ID (2nd+ courses)
  dm: boolean; // Đồng Môn voucher
}

export function TuitionCalculator() {
  const [startCourse, setStartCourse] = useState<CourseKey>("starter");
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
      const policyNotes: string[] = [];

      if (idx === 0) {
        // Khóa đầu tiên: Học bổng Tinh Anh
        const taOpt = TINH_ANH_OPTIONS.find((o) => o.id === pick.ta);
        if (taOpt && taOpt.pct && taOpt.pct > 0) {
          const dAmt = tuition * taOpt.pct;
          discount += dAmt;
          policyNotes.push(`Tinh Anh: Giảm ${formatVND(dAmt)} (${Math.round(taOpt.pct * 100)}%)`);
        }
      } else {
        // Từ khóa thứ 2: Học bổng Kỷ Luật
        const klOpt = KY_LUAT_OPTIONS.find((o) => o.id === pick.kl);
        if (klOpt && klOpt.amt && klOpt.amt > 0) {
          discount += klOpt.amt;
          policyNotes.push(`Kỷ Luật: Giảm ${formatVND(klOpt.amt)}`);
        }
      }

      // Đặc Quyền Đồng Môn (300k)
      if (pick.dm) {
        discount += DONG_MON_VOUCHER_AMT;
        policyNotes.push(`Đồng Môn: Giảm ${formatVND(DONG_MON_VOUCHER_AMT)}`);
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
        net,
        policyNotes: policyNotes.join(" + "),
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
    <div id="tuition-calculator" className="space-y-16 py-16 sm:py-24 bg-slate-50/70 dark:bg-slate-900/30">
      {/* SECTION 1: INTERACTIVE CALCULATOR */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-red/10 text-brand-red font-bold text-xs sm:text-sm tracking-wide uppercase">
            <Calculator className="w-4 h-4" />
            <span>Bảng Tính Nhanh Học Phí & Học Bổng</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
            Tính học phí của bạn
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Ước tính mức học phí thực tế sau khi áp dụng chính sách <strong>Học bổng Tinh Anh</strong>, <strong>Học bổng Kỷ Luật</strong> và <strong>Đặc quyền Đồng Môn</strong>.
          </p>
        </div>

        {/* Controls Bar: Start Course */}
        <div className="bg-card border border-border/80 rounded-3xl p-5 sm:p-7 shadow-xs space-y-5">
          <div className="space-y-2.5">
            <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Khoá bắt đầu theo trình độ của bạn
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-1.5 bg-muted/70 rounded-2xl border border-border/60">
              {COURSES_SEQUENCE.map((key) => {
                const isActive = startCourse === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setStartCourse(key)}
                    className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all text-center truncate ${
                      isActive
                        ? "bg-brand-blue text-white shadow-sm"
                        : "text-foreground/80 hover:text-foreground hover:bg-background/60"
                    }`}
                  >
                    {COURSE_NAMES[key]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Path banner */}
          <div className="flex items-center gap-2.5 px-4 py-3 bg-brand-blue-soft/50 border border-brand-blue/20 rounded-2xl text-brand-blue text-xs sm:text-sm font-semibold">
            <Sparkles className="w-4 h-4 shrink-0 text-brand-blue" />
            <span>
              Lộ trình của bạn:{" "}
              <strong className="font-extrabold">
                {activePath.map((k) => COURSE_NAMES[k]).join(" → ")}
              </strong>{" "}
              ({activePath.length} khoá học)
            </span>
          </div>
        </div>

        {/* Main Grid: Calculation Rows Table + Total Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Courses Rows (Col 1 to 8) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Desktop Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-3 px-6 py-3 bg-muted/60 rounded-2xl border border-border/50 text-xs font-bold text-muted-foreground uppercase tracking-wider">
              <div className="col-span-3">Khóa học</div>
              <div className="col-span-2 text-right">Học phí gốc</div>
              <div className="col-span-2 text-right">Thực đóng</div>
              <div className="col-span-3">Chương trình học bổng</div>
              <div className="col-span-2">Đồng Môn</div>
            </div>

            {/* Course Rows */}
            {courseCalculations.map((c) => (
              <div
                key={c.courseKey}
                className="bg-card border border-border/80 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4 transition-all hover:border-brand-blue/40"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Course Name */}
                  <div className="md:col-span-3 flex items-center justify-between md:block">
                    <div>
                      <span className="text-xs font-bold text-muted-foreground uppercase block">
                        Khoá {c.courseNum}
                      </span>
                      <span className="text-base sm:text-lg font-black text-foreground">
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
                    <span className="text-sm font-semibold text-muted-foreground">
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
                  </div>

                  {/* Scholarship Picker */}
                  <div className="md:col-span-3 space-y-1.5">
                    <label className="block md:hidden text-xs font-bold text-muted-foreground uppercase">
                      {c.isFirst ? "Học bổng Tinh Anh" : "Học bổng Kỷ Luật"}
                    </label>
                    {c.isFirst ? (
                      <select
                        value={c.taValue}
                        onChange={(e) => handleTaChange(c.courseKey, e.target.value)}
                        className="w-full text-xs sm:text-sm bg-background border border-border/80 rounded-xl px-3 py-2 text-foreground font-medium focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-hidden cursor-pointer"
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
                        className="w-full text-xs sm:text-sm bg-background border border-border/80 rounded-xl px-3 py-2 text-foreground font-medium focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-hidden cursor-pointer"
                      >
                        {KY_LUAT_OPTIONS.map((opt) => (
                          <option key={opt.id} value={opt.id}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    )}
                    {c.policyNotes && (
                      <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                        {c.policyNotes}
                      </p>
                    )}
                  </div>

                  {/* Đồng Môn Referral */}
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="block md:hidden text-xs font-bold text-muted-foreground uppercase">
                      Đặc quyền Đồng Môn
                    </label>
                    <select
                      value={c.hasDm ? "yes" : "no"}
                      onChange={(e) => handleDmChange(c.courseKey, e.target.value === "yes")}
                      className="w-full text-xs sm:text-sm bg-background border border-border/80 rounded-xl px-3 py-2 text-foreground font-medium focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-hidden cursor-pointer"
                    >
                      <option value="no">Không</option>
                      <option value="yes">Có (-300k)</option>
                    </select>
                    {c.hasDm && (
                      <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                        Giảm {formatVND(DONG_MON_VOUCHER_AMT)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Note under list */}
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm text-foreground/80 leading-relaxed space-y-1">
              <p>
                <strong className="text-amber-700 dark:text-amber-400">Lưu ý:</strong> Đây chỉ là
                bảng tính mô phỏng tổng học phí của bạn suốt lộ trình học. Bạn không cần đóng học phí
                cả lộ trình mà{" "}
                <span className="font-bold underline decoration-amber-500">
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
                  <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">
                    −{formatVND(totals.discount)}
                  </span>
                </div>

                <div className="h-px bg-border/80 my-2" />

                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-xs uppercase font-bold text-muted-foreground block">
                      Tổng tiền thực đóng
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-brand-red">
                      {formatVND(totals.net)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Savings callout */}
              {totals.discount > 0 ? (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-semibold flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    Bạn tiết kiệm được{" "}
                    <strong className="font-extrabold text-emerald-800 dark:text-emerald-200">
                      {formatVND(totals.discount)}
                    </strong>{" "}
                    (tương đương ~{totals.savingsPct}% tổng học phí lộ trình)!
                  </div>
                </div>
              ) : (
                <div className="p-3.5 rounded-2xl bg-muted/60 border border-border/60 text-muted-foreground text-xs leading-relaxed">
                  💡 Chọn thành tích năng lực đầu vào hoặc mức kỷ luật để nhận học bổng trực tiếp.
                </div>
              )}

              {/* 3 Pillars Summary */}
              <div className="space-y-2.5 pt-2 text-xs">
                <div className="p-2.5 rounded-xl bg-muted/50 space-y-1">
                  <div className="font-bold text-foreground flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-brand-red shrink-0" />
                    <span>Học bổng Tinh Anh: Giảm 10% – 25% (Khóa 1)</span>
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
                    <span>Đặc quyền Đồng Môn: Giảm 300.000đ / khóa</span>
                  </div>
                </div>
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

      {/* SECTION 2: CHÍNH SÁCH HỌC BỔNG CHI TIẾT (THE 3 PILLARS) */}
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

        {/* 3 Main Program Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1: Tinh Anh */}
          <div className="bg-card border-2 border-brand-red/20 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5 flex flex-col justify-between hover:border-brand-red/50 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-2xl bg-brand-red/10 text-brand-red">
                  <Award className="w-6 h-6" />
                </div>
                <span className="text-xs font-black px-3 py-1 rounded-full bg-brand-red/10 text-brand-red uppercase">
                  Thưởng Năng Lực
                </span>
              </div>
              <div>
                <h4 className="text-xl font-black text-foreground">Học bổng Tinh Anh</h4>
                <p className="text-xs text-muted-foreground mt-1">Dành cho học viên có thành tích nổi bật khi nhập học</p>
              </div>

              {/* Tiers List */}
              <div className="space-y-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-muted/60 flex justify-between items-center">
                  <span>HSG Quốc gia</span>
                  <span className="font-extrabold text-brand-red text-sm">25%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-muted/60 flex justify-between items-center">
                  <span>SV Xuất sắc (GPA ≥ 3.6) / HSG Tỉnh</span>
                  <span className="font-extrabold text-brand-red text-sm">20%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-muted/60 flex justify-between items-center">
                  <span>Tân SV (ĐGNL ≥ 850 / THPT ≥ 26đ) / NCKH</span>
                  <span className="font-extrabold text-brand-red text-sm">15%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-muted/60 flex justify-between items-center">
                  <span>SV Giỏi (GPA ≥ 3.2) / HSG THPT</span>
                  <span className="font-extrabold text-brand-red text-sm">10%</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-border/70 space-y-2 text-[11px] text-muted-foreground">
              <p>• Áp dụng cho khóa học đầu tiên tại ARIS.</p>
              <p>• Chọn mức cao nhất, không cộng dồn nhiều thành tích.</p>
              <div className="p-2.5 rounded-xl bg-brand-red/5 text-brand-red font-medium italic">
                &ldquo;Bạn giỏi trước khi vào ARIS → ARIS đầu tư vào bạn.&rdquo;
              </div>
            </div>
          </div>

          {/* Card 2: Kỷ Luật */}
          <div className="bg-card border-2 border-brand-blue/20 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5 flex flex-col justify-between hover:border-brand-blue/50 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-2xl bg-brand-blue-soft text-brand-blue">
                  <Flame className="w-6 h-6" />
                </div>
                <span className="text-xs font-black px-3 py-1 rounded-full bg-brand-blue-soft text-brand-blue uppercase">
                  Thưởng Kỷ Luật
                </span>
              </div>
              <div>
                <h4 className="text-xl font-black text-foreground">Học bổng Kỷ Luật</h4>
                <p className="text-xs text-muted-foreground mt-1">Dành cho học viên duy trì nỗ lực trong từng khóa học</p>
              </div>

              {/* Tiers List */}
              <div className="space-y-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-muted/60 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-foreground">Cấp 1</span>
                    <span className="font-extrabold text-brand-blue text-sm">200.000đ</span>
                  </div>
                  <p className="text-muted-foreground text-[11px]">BTVN ≥ 80% & Chuyên cần ≥ 90%</p>
                </div>
                <div className="p-2.5 rounded-xl bg-muted/60 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-foreground">Cấp 2</span>
                    <span className="font-extrabold text-brand-blue text-sm">300.000đ</span>
                  </div>
                  <p className="text-muted-foreground text-[11px]">BTVN ≥ 90% & Chuyên cần ≥ 95%</p>
                </div>
                <div className="p-2.5 rounded-xl bg-brand-blue-soft/40 border border-brand-blue/20 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-black text-brand-blue">Cấp 3 — Kỷ Luật Thép</span>
                    <span className="font-black text-brand-blue text-sm">500.000đ</span>
                  </div>
                  <p className="text-brand-blue/80 text-[11px]">100% BTVN + 100% Chuyên cần</p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-border/70 space-y-2 text-[11px] text-muted-foreground">
              <p>• Dữ liệu đánh giá minh bạch trên NextBand LMS.</p>
              <p>• Khấu trừ trực tiếp vào học phí khóa kế tiếp.</p>
              <div className="p-2.5 rounded-xl bg-brand-blue-soft/50 text-brand-blue font-medium italic">
                &ldquo;Bền bỉ mỗi ngày → Nỗ lực được ghi nhận xứng đáng.&rdquo;
              </div>
            </div>
          </div>

          {/* Card 3: Đồng Môn */}
          <div className="bg-card border-2 border-emerald-500/20 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5 flex flex-col justify-between hover:border-emerald-500/50 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase">
                  Thưởng Kết Nối
                </span>
              </div>
              <div>
                <h4 className="text-xl font-black text-foreground">Đặc Quyền Đồng Môn</h4>
                <p className="text-xs text-muted-foreground mt-1">Tri ân học viên giới thiệu bạn bè, người thân</p>
              </div>

              {/* 2-Way Benefit */}
              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-xl bg-muted/60 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-foreground">Người được giới thiệu</span>
                    <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">300.000đ</span>
                  </div>
                  <p className="text-muted-foreground text-[11px]">Giảm trực tiếp vào học phí khóa đầu tiên</p>
                </div>

                <div className="p-3 rounded-xl bg-muted/60 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-foreground">Người giới thiệu</span>
                    <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">300.000đ</span>
                  </div>
                  <p className="text-muted-foreground text-[11px]">Nhận Voucher áp dụng cho khóa tiếp theo</p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-border/70 space-y-2 text-[11px] text-muted-foreground">
              <p>• Ghi nhận khi học viên mới hoàn tất ghi danh.</p>
              <p>• Có giá trị cộng dồn cùng Học bổng Tinh Anh / Kỷ Luật.</p>
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-medium italic">
                &ldquo;Bạn học của tôi cũng là đồng môn của tôi — Cùng phát triển.&rdquo;
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Operational Principles */}
        <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border/80 shadow-xs space-y-4">
          <h4 className="font-black text-base sm:text-lg text-foreground flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-brand-blue" />
            <span>Nguyên Tắc Học Phí & Xét Duyệt Tại ARIS</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm text-foreground/80">
            <div className="p-4 rounded-2xl bg-muted/40 border border-border/50 space-y-1">
              <p className="font-bold text-foreground">Đồng nhất mức phí</p>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Học phí Online và Offline áp dụng như nhau, minh bạch theo từng khóa.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-muted/40 border border-border/50 space-y-1">
              <p className="font-bold text-foreground">Đóng theo từng khóa</p>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Học viên đóng theo từng chặng học, ARIS không thu gộp học phí cả lộ trình.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-muted/40 border border-border/50 space-y-1">
              <p className="font-bold text-foreground">Minh bạch trên LMS</p>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Dữ liệu chuyên cần & BTVN được ghi nhận tự động trên hệ thống NextBand.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-muted/40 border border-border/50 space-y-1">
              <p className="font-bold text-foreground">Không cộng dồn Tinh Anh</p>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Mỗi học viên áp dụng 01 mức Tinh Anh cao nhất; cộng dồn được với Đồng Môn.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


