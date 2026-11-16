import React from "react";
import { SEO } from "@/components/common/SEO";

export default function ChemistryLabPage() {
  return (
    <div className="w-full h-[calc(100vh-64px)] overflow-hidden bg-[#f8fafc]">
      <SEO
        title="Hoá Học 10 - Tương Tác Số & Thí Nghiệm 3D | NextBand"
        description="Số hoá sách giáo khoa Hoá học 10 Kết nối tri thức: Thí nghiệm ống phóng điện Thomson, tán xạ Rutherford, mô hình đám mây orbital 3D và cấu hình electron nguyên tử."
      />
      <iframe
        src="/chemistry/index.html"
        title="Hoá Học 10 Tương Tác Số"
        className="w-full h-full border-none"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  );
}
