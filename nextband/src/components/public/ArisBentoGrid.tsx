import React from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function ArisBentoGrid() {
  return (
    <div className="w-full">
      {/* Bento Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* ========================================================================= */}
        {/* CARD 1 (HERO BENTO - Full width): MOCKUP LINE-BY-LINE FEEDBACK            */}
        {/* ========================================================================= */}
        <div className="md:col-span-2 lg:col-span-12 rounded-3xl bg-white p-6 sm:p-8 lg:p-10 border border-black/[0.06] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.07)] transition-all duration-300 overflow-hidden relative group">
          {/* Subtle Ambient Light */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/[0.03] rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
            <div className="lg:col-span-5 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/10 text-brand-red text-xs font-black uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Công Nghệ Độc Quyền NextBand</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[#1d1d1f] tracking-tight">
                Line-by-line Feedback™
              </h3>
              <p className="text-[#86868b] text-sm sm:text-base leading-relaxed">
                Chấm chữa bóc tách từng lỗi sai câu chữ. Không nhận xét cảm tính "viết chưa mượt" — chỉ rõ nguyên nhân ngữ pháp, từ vựng và logic lập luận ngay tại vị trí lỗi.
              </p>
            </div>

            {/* Realistic Writing Mockup Card (Apple Window Style) */}
            <div className="lg:col-span-7 rounded-2xl bg-[#FBFBFD] border border-black/[0.08] shadow-inner p-4 sm:p-5 space-y-3.5 font-sans">
              {/* Window bar */}
              <div className="flex items-center justify-between border-b border-black/[0.06] pb-3 text-xs text-[#86868b]">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-2 font-mono text-[11px] font-semibold text-slate-500">
                    IELTS_Task2_Essay_Submission.docx
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold text-[11px] border border-emerald-200/60">
                  Band Dự Phóng: 6.5
                </span>
              </div>

              {/* Essay Paragraph with visual annotations */}
              <div className="text-sm leading-relaxed text-[#1d1d1f] space-y-3 pt-1">
                <p>
                  Although some people argue that government funding should focus exclusively on health and education,{" "}
                  <span className="bg-brand-red/15 text-brand-red font-semibold px-1.5 py-0.5 rounded border-b-2 border-brand-red relative cursor-help">
                    arts is also important
                    {/* Floating Correction Tooltip */}
                    <span className="hidden sm:inline-flex items-center gap-1 ml-1 text-[11px] bg-white shadow-sm border border-brand-red/30 px-1.5 py-0.2 rounded-md text-brand-red font-bold">
                      → the arts are also vital
                    </span>
                  </span>{" "}
                  for cultural identity. Moreover, investing in public museums{" "}
                  <span className="bg-brand-blue/15 text-brand-blue font-semibold px-1.5 py-0.5 rounded border-b-2 border-brand-blue relative cursor-help">
                    brings many good results
                    <span className="hidden sm:inline-flex items-center gap-1 ml-1 text-[11px] bg-white shadow-sm border border-brand-blue/30 px-1.5 py-0.2 rounded-md text-brand-blue font-bold">
                      → yields profound societal benefits
                    </span>
                  </span>{" "}
                  for future generations.
                </p>
              </div>

              {/* Micro Teacher Feedback Popover Card */}
              <div className="p-3 rounded-xl bg-white border border-black/[0.08] shadow-xs flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center font-black text-xs shrink-0">
                  8.5
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#1d1d1f]">Giảng Viên ARIS Chuyên Môn</span>
                    <span className="text-[10px] text-[#86868b]">Line-by-line note</span>
                  </div>
                  <p className="text-slate-600 leading-snug">
                    Cụm từ <em>"arts is"</em> vi phạm hòa hợp chủ vị số nhiều. Thay thế <em>"brings many good results"</em> bằng collocation C1 giúp nâng tiêu chí Lexical Resource lên band 7.0+.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CARD 2 (Col 6): 100% EVIDENCE-BASED (BẰNG CHỨNG HỌC TẬP)                  */}
        {/* ========================================================================= */}
        <div className="md:col-span-1 lg:col-span-6 rounded-3xl bg-white p-6 sm:p-8 border border-black/[0.06] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.07)] transition-all duration-300 flex flex-col justify-between overflow-hidden">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black uppercase tracking-wider border border-emerald-200/60">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Evidence-Based</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#1d1d1f] tracking-tight">
              100% Bằng Chứng Học Thuật
            </h3>
            <p className="text-[#86868b] text-sm leading-relaxed">
              Mọi bài làm, bản nháp, file thu âm và lịch sử sửa bài được số hóa nguyên trạng trên Academic Record™. Tiến bộ được đo lường bằng dữ liệu thực tế, không qua lời khen đãi bôi.
            </p>
          </div>

          {/* Big Number & Micro Metrics */}
          <div className="my-6 grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#FBFBFD] border border-black/[0.04] space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-[#1d1d1f] tracking-tight">
                100%
              </div>
              <div className="text-xs font-bold text-[#86868b]">Lưu trữ bài làm gốc</div>
              <p className="text-[11px] text-slate-500">Đối chiếu sự tiến bộ sau mỗi 4 tuần</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FBFBFD] border border-black/[0.04] space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-brand-red tracking-tight">
                2 Lần
              </div>
              <div className="text-xs font-bold text-[#86868b]">Vòng lặp Re-attempt</div>
              <p className="text-[11px] text-slate-500">Bắt buộc sửa bài trước khi qua bài mới</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>Phụ huynh &amp; học viên theo dõi tiến độ minh bạch từng buổi học.</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CARD 3 (Col 6): 4 KHÔNG GIAN THI & HỌC KHÔNG XAO NHÃNG                   */}
        {/* ========================================================================= */}
        <div className="md:col-span-1 lg:col-span-6 rounded-3xl bg-white p-6 sm:p-8 border border-black/[0.06] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.07)] transition-all duration-300 flex flex-col justify-between overflow-hidden">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-black uppercase tracking-wider border border-indigo-200/60">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>Phòng Thi Chuẩn Hóa</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#1d1d1f] tracking-tight">
              4 Không Gian Không Xao Nhãng
            </h3>
            <p className="text-[#86868b] text-sm leading-relaxed">
              Giao diện làm bài mô phỏng 100% kỳ thi IELTS trên máy tính của British Council và IDP. Rèn luyện phản xạ và tâm lý phòng thi thực chiến từ ngày đầu.
            </p>
          </div>

          {/* 4 Skill Capsules */}
          <div className="my-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Listening", icon: Headphones, color: "text-blue-600", bg: "bg-blue-50" },
              { label: "Reading", icon: BookOpen, color: "text-emerald-600", bg: "bg-emerald-50" },
              { label: "Writing", icon: PenTool, color: "text-amber-600", bg: "bg-amber-50" },
              { label: "Speaking", icon: Mic, color: "text-rose-600", bg: "bg-rose-50" },
            ].map((skill, idx) => {
              const Icon = skill.icon;
              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-[#FBFBFD] border border-black/[0.04] text-center space-y-2 flex flex-col items-center justify-center hover:border-black/15 transition-all"
                >
                  <div className={`w-9 h-9 rounded-xl ${skill.bg} ${skill.color} flex items-center justify-center`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold text-[#1d1d1f]">{skill.label}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-500 font-medium">Bảo vệ bản nháp tự động từng phím gõ</span>
            <Button
              size="sm"
              asChild
              className="rounded-full bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-bold px-4 shadow-2xs"
            >
              <Link to="/assessment">Thi Thử Ngay</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
