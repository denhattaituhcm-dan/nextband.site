import React from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/common/SEO";
import { Button } from "@/components/ui/button";
import {
  Compass,
  ArrowRight,
  Sparkles,
  Search,
  BookOpen,
  Globe2,
  GraduationCap,
  CheckCircle2,
  Clock,
  Shield,
  Layers,
} from "lucide-react";

export default function ReadingUniversePage() {
  return (
    <div className="min-h-screen bg-[#070e18] text-white font-sans selection:bg-amber-400 selection:text-slate-950">
      <SEO
        title="Reading Universe | ARIS IELTS"
        description="Đừng chỉ đọc. Hãy bước vào thế giới và giải mã. Hệ thống luyện IELTS Reading theo phương pháp Narrative Reading & Case Dossier."
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-[#0c1e38] via-[#091526] to-[#070e18] py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-300 uppercase tracking-widest mb-6 animate-pulse">
            <Sparkles className="h-4 w-4 text-amber-400" />
            Next-Gen IELTS Narrative Reading Engine
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-tight">
            Every text hides something. <br />
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
              Find it.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Đừng chỉ đọc để làm bài tập trắc nghiệm. Hãy bước vào hồ sơ vụ án, tự thu thập chứng cứ, đối chiếu mâu thuẫn và giải mã năng lực đọc hiểu học thuật của chính mình.
          </p>

          {/* Quick CTA */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="h-12 px-8 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/25 transition-all cursor-pointer"
            >
              <Link to="/reading/case-001">
                Bắt Đầu Vụ Án #001 (Miễn Phí)
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Case: The Locked Room */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <Search className="h-5 w-5 text-amber-400" />
            <h2 className="text-lg sm:text-xl font-black uppercase tracking-wider text-white">
              Vụ Án Khảo Hạch Hiện Tại (Featured Case)
            </h2>
          </div>
          <span className="text-xs font-mono text-amber-400 font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
            Không cần đăng nhập
          </span>
        </div>

        <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="grid md:grid-cols-12 gap-6 items-center">
            
            <div className="md:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Học Sĩ · Band 5.0
                </span>
                <span className="text-xs text-amber-400">★★☆☆ (Trung Kỳ)</span>
                <span className="text-xs text-slate-400">· St. Jude Investigation Bureau</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                Case #001: The Locked Room (Căn Phòng Khóa Kín)
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                11:47 PM. Bản thảo Đề thi Học bổng Quốc gia biến mất khỏi két sắt. Cửa phòng khóa trái từ bên trong, giáo sư trưởng ban bất tỉnh trên bàn làm việc. Bạn có đủ năng lực đọc hiểu để giải mã sự thật?
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-slate-500" /> ~15 phút
                </span>
                <span className="flex items-center gap-1.5">
                  <Layers className="h-4 w-4 text-slate-500" /> 3 Nguồn Hồ Sơ (~700 từ)
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield className="h-4 w-4 text-slate-500" /> Boss: Over-Inference Trap
                </span>
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6">
              <Button
                asChild
                className="w-full h-12 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20"
              >
                <Link to="/reading/case-001">
                  Khảo Hạch Ngay
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <p className="text-[11px] text-slate-500 mt-2 text-center">
                Hoàn thành để nhận Báo cáo Chẩn đoán Năng lực
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4 Universe Realms */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
            Khám Phá Các Vũ Trụ Đọc (Content Realms)
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Cùng một Reading Engine chuẩn IELTS, nhưng bạn được quyền lựa chọn thế giới mình muốn bước vào.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Case Files */}
          <div className="rounded-2xl border border-amber-500/30 bg-slate-900/80 p-5 space-y-3 hover:border-amber-500 transition-all group">
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold">
              🕵️
            </div>
            <h3 className="font-extrabold text-white text-base">Case Files</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Trinh thám, Conan, bí ẩn học viện & hồ sơ điều tra đa nguồn. Rèn luyện đối chiếu mâu thuẫn và chứng minh logic.
            </p>
            <span className="text-[11px] font-bold text-amber-400 inline-block pt-1">
              12 Vụ Án Có Sẵn →
            </span>
          </div>

          {/* Card 2: Great Stories */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3 hover:border-slate-700 transition-all group">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
              ⚔️
            </div>
            <h3 className="font-extrabold text-white text-base">Great Stories</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Fantasy, phiêu lưu thám hiểm, văn học kinh điển. Đọc sâu không ma sát với hệ thống giải mã ngữ cảnh tức thì.
            </p>
            <span className="text-[11px] font-bold text-slate-500 inline-block pt-1">
              Sắp Ra Mắt
            </span>
          </div>

          {/* Card 3: Real World */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3 hover:border-slate-700 transition-all group">
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
              🌍
            </div>
            <h3 className="font-extrabold text-white text-base">Real World</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Khoa học, công nghệ, biến đổi khí hậu & xã hội hiện đại. Xây dựng kiến thức nền (Schema) cho các bài thi học thuật.
            </p>
            <span className="text-[11px] font-bold text-slate-500 inline-block pt-1">
              Sắp Ra Mắt
            </span>
          </div>

          {/* Card 4: IELTS Challenge */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3 hover:border-slate-700 transition-all group">
            <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold">
              🎯
            </div>
            <h3 className="font-extrabold text-white text-base">IELTS Challenge</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Các bài đọc chuẩn đề thi Cambridge Academic, kiểm tra độ thuần thục kỹ năng trước khi đột phá đại cảnh giới.
            </p>
            <span className="text-[11px] font-bold text-slate-500 inline-block pt-1">
              Sắp Ra Mắt
            </span>
          </div>

        </div>
      </section>

      {/* Mastery Progression Guide */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-slate-800">
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-amber-400" />
            <h3 className="text-lg font-black text-white uppercase tracking-wide">
              Hệ Thống Tiến Trình Cảnh Giới (Mastery-Based Progression)
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Khác với các hệ thống game hóa tích lũy điểm XP ảo, NextBand Reading đo lường <strong>bằng chứng năng lực thực tế</strong>. Bạn chỉ có thể đột phá cảnh giới khi chứng minh được khả năng tìm kiếm thông tin, suy luận có dẫn chứng và xử lý paraphrase qua các bài khảo hạch Đỉnh Phong.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
              <span className="text-slate-400 block text-[10px]">3.0 – 4.0</span>
              <strong className="text-white">Học Đồ</strong>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
              <span className="text-slate-400 block text-[10px]">4.0 – 5.0</span>
              <strong className="text-white">Học Giả</strong>
            </div>
            <div className="p-2.5 rounded-lg bg-amber-500/20 border border-amber-500/40">
              <span className="text-amber-300 block text-[10px]">5.0 – 6.0 (Hiện tại)</span>
              <strong className="text-amber-300">Học Sĩ</strong>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
              <span className="text-slate-400 block text-[10px]">6.0 – 7.0</span>
              <strong className="text-white">Học Sư</strong>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
