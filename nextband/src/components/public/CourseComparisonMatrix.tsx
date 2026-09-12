import React, { useState } from "react";
import { COURSE_CATALOG, CourseData } from "@/constants/courses";
import { Button } from "@/components/ui/button";
import {
  Check,
  Minus,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Users,
  Clock,
  GraduationCap,
  Layers,
} from "lucide-react";

interface CourseComparisonMatrixProps {
  onTrialClick?: (slug: string) => void;
  onDetailClick?: (slug: string) => void;
}

export function CourseComparisonMatrix({
  onTrialClick,
  onDetailClick,
}: CourseComparisonMatrixProps) {
  const courses: CourseData[] = [
    COURSE_CATALOG.starter,
    COURSE_CATALOG.dreamer,
    COURSE_CATALOG.builder,
    COURSE_CATALOG.master,
    COURSE_CATALOG.leader,
  ].filter(Boolean);

  const [hoveredCol, setHoveredCol] = useState<number | null>(null);

  return (
    <div className="w-full">
      {/* Outer Card with Apple-like border and shadow */}
      <div className="rounded-3xl bg-white border border-black/[0.06] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        {/* Responsive Table Wrapper */}
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full border-collapse text-left min-w-[850px]">
            {/* Table Header: Sticky Course Columns */}
            <thead>
              <tr className="border-b border-black/[0.08] bg-[#FBFBFD]">
                <th className="p-6 w-[220px] text-xs font-mono uppercase tracking-widest text-[#86868b] font-black align-bottom">
                  <div className="space-y-1">
                    <span className="text-[10px] text-brand-blue font-extrabold block">ARIS ACADEMIC</span>
                    <span className="text-base text-[#1d1d1f] font-black">So Sánh 5 Chặng</span>
                  </div>
                </th>
                {courses.map((course, idx) => {
                  const isPopular = course.slug === "builder" || course.slug === "master";
                  return (
                    <th
                      key={course.id || course.slug}
                      onMouseEnter={() => setHoveredCol(idx)}
                      onMouseLeave={() => setHoveredCol(null)}
                      className={`p-6 text-center align-top transition-colors relative ${
                        hoveredCol === idx ? "bg-black/[0.02]" : ""
                      }`}
                    >
                      {isPopular && (
                        <div className="absolute top-2 left-1/2 -translate-x-1/2">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brand-red/10 text-brand-red font-black text-[10px] tracking-wider uppercase">
                            <Sparkles className="h-2.5 w-2.5" /> Phổ biến nhất
                          </span>
                        </div>
                      )}

                      <div className={`space-y-2.5 ${isPopular ? "pt-4" : "pt-1"}`}>
                        <span className="text-[11px] font-mono font-bold text-[#86868b] uppercase tracking-wider block">
                          {course.stageNumber}
                        </span>
                        <h4 className="text-xl font-black text-[#1d1d1f] tracking-tight">
                          {course.name}
                        </h4>
                        <div className="inline-block px-2.5 py-1 rounded-full bg-slate-100 text-[#1d1d1f] text-xs font-black">
                          {course.bandTarget}
                        </div>
                        <div className="text-sm font-black text-brand-blue pt-1">
                          {course.tuition}
                        </div>

                        <div className="pt-2">
                          <Button
                            size="sm"
                            onClick={() => onTrialClick?.(course.slug)}
                            className={`w-full rounded-full text-xs font-black shadow-xs transition-all ${
                              isPopular
                                ? "bg-brand-red hover:bg-brand-red-hover text-white shadow-brand-red/20"
                                : "bg-[#002147] hover:bg-[#001733] text-white"
                            }`}
                          >
                            Học thử 02 buổi
                          </Button>
                        </div>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-black/[0.05] text-xs sm:text-sm text-[#1d1d1f]">
              {/* GROUP 1: MỤC TIÊU & CHUẨN ĐẦU RA */}
              <tr className="bg-[#F5F5F7]/70">
                <td
                  colSpan={6}
                  className="px-6 py-2.5 text-[11px] font-mono uppercase tracking-widest text-[#86868b] font-black"
                >
                  01. Chuẩn Đầu Vào &amp; Đầu Ra
                </td>
              </tr>

              <tr>
                <td className="p-5 font-bold text-[#1d1d1f] bg-slate-50/50">Ngưỡng đầu vào</td>
                <td className="p-5 text-center text-slate-600">Mất gốc tiếng Anh</td>
                <td className="p-5 text-center text-slate-600">IELTS 3.0</td>
                <td className="p-5 text-center text-slate-600">IELTS 4.0</td>
                <td className="p-5 text-center text-slate-600">IELTS 5.0</td>
                <td className="p-5 text-center text-slate-600">IELTS 6.0</td>
              </tr>

              <tr>
                <td className="p-5 font-bold text-[#1d1d1f] bg-slate-50/50">Mục tiêu đầu ra</td>
                <td className="p-5 text-center font-black text-brand-blue">IELTS 3.0</td>
                <td className="p-5 text-center font-black text-brand-blue">IELTS 4.0</td>
                <td className="p-5 text-center font-black text-brand-blue">IELTS 5.0</td>
                <td className="p-5 text-center font-black text-brand-blue">IELTS 6.0</td>
                <td className="p-5 text-center font-black text-brand-blue">IELTS 6.5+</td>
              </tr>

              <tr>
                <td className="p-5 font-bold text-[#1d1d1f] bg-slate-50/50">Bậc năng lực ARIS-7™</td>
                <td className="p-5 text-center font-mono font-bold text-slate-700">Rank 3 (Học Đồ)</td>
                <td className="p-5 text-center font-mono font-bold text-slate-700">Rank 3 → 4</td>
                <td className="p-5 text-center font-mono font-bold text-slate-700">Rank 4 (Tiền Trung)</td>
                <td className="p-5 text-center font-mono font-bold text-brand-blue">Rank 5 (Thành Thạo)</td>
                <td className="p-5 text-center font-mono font-bold text-brand-red">Rank 6 (Xuất Sắc)</td>
              </tr>

              {/* GROUP 2: QUY MÔ & MÔ HÌNH SƯ PHẠM */}
              <tr className="bg-[#F5F5F7]/70">
                <td
                  colSpan={6}
                  className="px-6 py-2.5 text-[11px] font-mono uppercase tracking-widest text-[#86868b] font-black"
                >
                  02. Quy Chuẩn Sư Phạm &amp; Kèm Cặp
                </td>
              </tr>

              <tr>
                <td className="p-5 font-bold text-[#1d1d1f] bg-slate-50/50">Sĩ số lớp</td>
                {courses.map((c) => (
                  <td key={c.id} className="p-5 text-center font-bold text-slate-800">
                    Tối đa 08 học viên
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-5 font-bold text-[#1d1d1f] bg-slate-50/50">Giảng viên đứng lớp</td>
                {courses.map((c) => (
                  <td key={c.id} className="p-5 text-center text-xs font-semibold text-slate-700">
                    100% GV IELTS 8.0+
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-5 font-bold text-[#1d1d1f] bg-slate-50/50">
                  Chấm sửa Line-by-line Feedback
                </td>
                <td className="p-5 text-center text-slate-600">Cấu trúc câu &amp; Ngữ pháp</td>
                <td className="p-5 text-center text-slate-600">Đoạn văn &amp; Ý tứ</td>
                <td className="p-5 text-center font-bold text-brand-blue">Writing Task 1 &amp; 2</td>
                <td className="p-5 text-center font-bold text-brand-blue">Writing &amp; Speaking 1:1</td>
                <td className="p-5 text-center font-black text-brand-red">Chuyên sâu 4 tiêu chí C1</td>
              </tr>

              {/* GROUP 3: CÔNG NGHỆ NEXTBAND LMS */}
              <tr className="bg-[#F5F5F7]/70">
                <td
                  colSpan={6}
                  className="px-6 py-2.5 text-[11px] font-mono uppercase tracking-widest text-[#86868b] font-black"
                >
                  03. Nền Tảng Công Nghệ NextBand LMS
                </td>
              </tr>

              <tr>
                <td className="p-5 font-bold text-[#1d1d1f] bg-slate-50/50">Lưu vết bài nộp số hóa</td>
                {courses.map((c) => (
                  <td key={c.id} className="p-5 text-center">
                    <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-5 font-bold text-[#1d1d1f] bg-slate-50/50">Vòng lặp Re-attempt (Sửa lỗi)</td>
                {courses.map((c) => (
                  <td key={c.id} className="p-5 text-center">
                    <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-5 font-bold text-[#1d1d1f] bg-slate-50/50">Phòng thi chuẩn BC/IDP</td>
                <td className="p-5 text-center text-slate-400"><Minus className="h-4 w-4 mx-auto" /></td>
                <td className="p-5 text-center text-slate-600">Rút gọn</td>
                <td className="p-5 text-center font-bold text-emerald-600"><Check className="h-5 w-5 mx-auto" /></td>
                <td className="p-5 text-center font-bold text-emerald-600"><Check className="h-5 w-5 mx-auto" /></td>
                <td className="p-5 text-center font-bold text-emerald-600"><Check className="h-5 w-5 mx-auto" /></td>
              </tr>

              {/* GROUP 4: THỜI LƯỢNG & HỌC PHÍ */}
              <tr className="bg-[#F5F5F7]/70">
                <td
                  colSpan={6}
                  className="px-6 py-2.5 text-[11px] font-mono uppercase tracking-widest text-[#86868b] font-black"
                >
                  04. Thời Lượng &amp; Học Phí Minh Bạch
                </td>
              </tr>

              <tr>
                <td className="p-5 font-bold text-[#1d1d1f] bg-slate-50/50">Thời lượng khóa học</td>
                {courses.map((c) => (
                  <td key={c.id} className="p-5 text-center text-slate-700 font-medium">
                    {c.durationLabel}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-5 font-bold text-[#1d1d1f] bg-slate-50/50">Học phí trọn gói</td>
                {courses.map((c) => (
                  <td key={c.id} className="p-5 text-center font-black text-[#1d1d1f] text-base">
                    {c.tuition}
                  </td>
                ))}
              </tr>

              {/* BOTTOM ACTION ROW */}
              <tr className="bg-[#FBFBFD]">
                <td className="p-5 font-bold text-[#1d1d1f] bg-slate-50/50">Hành động</td>
                {courses.map((c) => (
                  <td key={c.id} className="p-5 text-center">
                    <div className="space-y-1.5">
                      <Button
                        size="sm"
                        onClick={() => onTrialClick?.(c.slug)}
                        className="w-full rounded-full bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold shadow-xs"
                      >
                        Học thử 02 buổi
                      </Button>
                      <button
                        type="button"
                        onClick={() => onDetailClick?.(c.slug)}
                        className="text-[11px] text-[#86868b] hover:text-[#1d1d1f] font-semibold underline block mx-auto transition-colors"
                      >
                        Xem chi tiết giáo trình →
                      </button>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
