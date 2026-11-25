import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SEO } from "@/components/common/SEO";

export default function Grade6MathPage() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#e7e5e4]">
      <SEO
        title="Grade 6 Math (Illustrative Mathematics) - Toán THCS Song Ngữ | NextBand"
        description="Số hoá giáo trình mở Illustrative Mathematics Grade 6 (CC BY 4.0) kèm cẩm nang song ngữ Anh-Việt: 9 Units gồm Hình học Diện tích, Tỉ số, Phân số, Số âm, Phương trình và Thống kê."
      />
      <Link
        to="/"
        title="Quay lại trang chủ NextBand"
        className="fixed bottom-4 left-4 z-50 inline-flex items-center gap-1.5 rounded-full bg-slate-900/80 px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md border border-white/15 hover:bg-slate-900 transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Trang chủ</span>
      </Link>
      <iframe
        src="/grade-6-math/index.html"
        title="Grade 6 Math - Illustrative Mathematics Song Ngữ"
        className="w-full h-full border-none"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  );
}
