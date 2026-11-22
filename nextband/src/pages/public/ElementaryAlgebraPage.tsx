import React from "react";
import { SEO } from "@/components/common/SEO";

export default function ElementaryAlgebraPage() {
  return (
    <div className="w-full h-[calc(100vh-64px)] overflow-hidden bg-[#f8fafc]">
      <SEO
        title="Elementary Algebra - Học Toán Tiếng Anh Song Ngữ (11 Chương) | NextBand"
        description="Số hoá giáo trình mở OpenStax Prealgebra 2e (CC BY-NC-SA 4.0) kết hợp cẩm nang song ngữ Anh-Việt phong cách Big Fat Notebook: 11 chương, 5.682 bài tập tương tác chấm điểm tự động."
      />
      <iframe
        src="/elementary-algebra/index.html"
        title="Elementary Algebra - Học Toán Tiếng Anh Song Ngữ"
        className="w-full h-full border-none"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  );
}
