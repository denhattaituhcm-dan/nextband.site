import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SEO } from "@/components/common/SEO";

export default function ElementaryAlgebraPage() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#e7e5e4]">
      <SEO
        title="Prealgebra 2e (OpenStax) - Học Toán Tiếng Anh Song Ngữ (11 Chương) | NextBand"
        description="Số hoá giáo trình mở OpenStax Prealgebra 2e (CC BY-NC-SA 4.0) kết hợp cẩm nang song ngữ Anh-Việt: 11 chương, 5.682 bài tập tương tác chấm điểm tự động."
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
        src="/elementary-algebra/index.html"
        title="Elementary Algebra - Học Toán Tiếng Anh Song Ngữ"
        className="w-full h-full border-none"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  );
}
