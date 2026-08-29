import React, { useState, useMemo } from "react";
import { Calculator, CheckCircle2, Tag, ArrowRight, Sparkles } from "lucide-react";

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
  starter: 4400000,
  dreamer: 4900000,
  builder: 5400000,
  master: 5900000,
  leader: 6400000,
};

// Học bổng Chăm chỉ tại ARIS
const CHAM_CHI_OPTIONS: ScholarshipOption[] = [
  { id: "none", label: "Chọn mức hoàn thành bài tập...", amt: 0 },
  { id: "80", label: "Hoàn thành 80% bài tập về nhà", amt: 200000 },
  { id: "90", label: "Hoàn thành từ 90% bài tập về nhà", amt: 300000 },
  { id: "100", label: "Hoàn thành 100% bài tập về nhà", amt: 500000 },
];

const REFERRAL_VOUCHER_AMT = 200000;

const formatVND = (num: number) => {
  return Math.round(num).toLocaleString("vi-VN").replace(/,/g, ".") + "đ";
};

interface CoursePickState {
  cc: string; // Chăm chỉ option ID
  ref: boolean; // Referral voucher
}

export function TuitionCalculator() {
  const [startCourse, setStartCourse] = useState<CourseKey>("starter");
  const [picks, setPicks] = useState<Record<CourseKey, CoursePickState>>({
    starter: { cc: "none", ref: false },
    dreamer: { cc: "none", ref: false },
    builder: { cc: "none", ref: false },
    master: { cc: "none", ref: false },
    leader: { cc: "none", ref: false },
  });

  const activePath = useMemo(() => {
    const startIndex = COURSES_SEQUENCE.indexOf(startCourse);
    return COURSES_SEQUENCE.slice(startIndex);
  }, [startCourse]);

  const handleCcChange = (course: CourseKey, val: string) => {
    setPicks((prev) => ({
      ...prev,
      [course]: { ...prev[course], cc: val },
    }));
  };

  const handleRefChange = (course: CourseKey, val: boolean) => {
    setPicks((prev) => ({
      ...prev,
      [course]: { ...prev[course], ref: val },
    }));
  };

  // Calculate costs per course and totals
  const courseCalculations = useMemo(() => {
    return activePath.map((courseKey, idx) => {
      const tuition = COURSE_TUITION[courseKey];
      const pick = picks[courseKey] || { cc: "none", ref: false };
      let discount = 0;
      const policyNotes: string[] = [];

      // Học bổng Chăm chỉ
      const ccOpt = CHAM_CHI_OPTIONS.find((o) => o.id === pick.cc);
      if (ccOpt && ccOpt.amt > 0) {
        discount += ccOpt.amt;
        policyNotes.push(`Chăm chỉ: Giảm ${formatVND(ccOpt.amt)}`);
      }

      // Voucher Giới thiệu
      if (pick.ref) {
        discount += REFERRAL_VOUCHER_AMT;
        policyNotes.push(`Voucher: Giảm ${formatVND(REFERRAL_VOUCHER_AMT)}`);
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
        tuition,
        discount,
        net,
        policyNotes: policyNotes.join(" + "),
        hasRef: pick.ref,
        ccValue: pick.cc,
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
    <section id="tuition-calculator" className="py-16 sm:py-24 bg-slate-50/60 dark:bg-slate-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-red/10 text-brand-red font-bold text-xs sm:text-sm tracking-wide uppercase">
            <Calculator className="w-4 h-4" />
            <span>Dự Toán Học Phí & Học Bổng</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
            Tính học phí của bạn
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Ước tính mức học phí thực đóng suốt lộ trình sau khi áp dụng Học bổng Chăm chỉ và Voucher giới thiệu tại Học Viện ARIS.
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
              <div className="col-span-3">Học bổng Chăm chỉ</div>
              <div className="col-span-2">Voucher GT</div>
            </div>

            {/* Course Rows */}
            {courseCalculations.map((c) => (
              <div
                key={c.courseKey}
                className="bg-card border border-border/80 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4 transition-all hover:border-brand-blue/40"
              >
                {/* Content grid */}
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
                      Học bổng Chăm chỉ
                    </label>
                    <select
                      value={c.ccValue}
                      onChange={(e) => handleCcChange(c.courseKey, e.target.value)}
                      className="w-full text-xs sm:text-sm bg-background border border-border/80 rounded-xl px-3 py-2 text-foreground font-medium focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-hidden cursor-pointer"
                    >
                      {CHAM_CHI_OPTIONS.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {c.ccValue !== "none" && (
                      <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                        {CHAM_CHI_OPTIONS.find((o) => o.id === c.ccValue)?.amt
                          ? `Giảm ${formatVND(CHAM_CHI_OPTIONS.find((o) => o.id === c.ccValue)!.amt)}`
                          : ""}
                      </p>
                    )}
                  </div>

                  {/* Referral Voucher */}
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="block md:hidden text-xs font-bold text-muted-foreground uppercase">
                      Voucher giới thiệu
                    </label>
                    <select
                      value={c.hasRef ? "yes" : "no"}
                      onChange={(e) => handleRefChange(c.courseKey, e.target.value === "yes")}
                      className="w-full text-xs sm:text-sm bg-background border border-border/80 rounded-xl px-3 py-2 text-foreground font-medium focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-hidden cursor-pointer"
                    >
                      <option value="no">Không</option>
                      <option value="yes">Có voucher</option>
                    </select>
                    {c.hasRef && (
                      <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                        Giảm {formatVND(REFERRAL_VOUCHER_AMT)}
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
                  <span>Tổng ưu đãi & Voucher</span>
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
                  💡 Chọn mức độ hoàn thành bài tập và voucher giới thiệu để nhận ưu đãi trực tiếp.
                </div>
              )}

              {/* 2 Programs Highlights */}
              <div className="space-y-2.5 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-muted/50 space-y-1.5">
                  <div className="font-bold text-foreground flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-brand-blue shrink-0" />
                    <span>Học bổng Chăm chỉ (Theo khóa)</span>
                  </div>
                  <ul className="text-muted-foreground space-y-0.5 pl-3 list-disc">
                    <li>Hoàn thành 80% BTVN: <strong>Giảm 200.000đ</strong></li>
                    <li>Hoàn thành từ 90% BTVN: <strong>Giảm 300.000đ</strong></li>
                    <li>Hoàn thành 100% BTVN: <strong>Giảm 500.000đ</strong></li>
                  </ul>
                </div>

                <div className="p-3 rounded-xl bg-muted/50 space-y-1">
                  <div className="font-bold text-foreground flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    <span>Voucher Giới thiệu</span>
                  </div>
                  <p className="text-muted-foreground pl-3">
                    Giảm trực tiếp <strong>200.000đ</strong> / khóa khi được học viên cũ giới thiệu.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Consultation CTA */}
            <div className="p-5 rounded-3xl bg-brand-blue/10 border border-brand-blue/20 text-center space-y-3">
              <p className="text-xs sm:text-sm text-foreground/90 font-medium">
                Cần tư vấn xếp lớp & lộ trình phù hợp?
              </p>
              <a
                href="https://zalo.me"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-2xl bg-brand-blue text-white font-extrabold text-xs sm:text-sm hover:bg-brand-blue/90 transition-colors shadow-xs"
              >
                <span>Nhắn Zalo tư vấn miễn phí</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

