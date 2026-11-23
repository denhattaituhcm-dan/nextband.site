import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SEO } from "@/components/common/SEO";

export default function ChemistryLabPage() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#f8fafc]">
      <SEO
        title="Hoá Học 10 - Tương Tác Số & Thí Nghiệm 3D | NextBand"
        description="Số hoá sách giáo khoa Hoá học 10 Kết nối tri thức: Thí nghiệm ống phóng điện Thomson, tán xạ Rutherford, mô hình đám mây orbital 3D và cấu hình electron nguyên tử."
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
        src="/chemistry/index.html"
        title="Hoá Học 10 Tương Tác Số"
        className="w-full h-full border-none"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  );
}
