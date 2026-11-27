import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SEO } from "@/components/common/SEO";

export default function PhysicsPage() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#f8f5ef]">
      <SEO
        title="High School Physics (OpenStax) - Vật Lý THPT Song Ngữ 23 Chương | NextBand"
        description="Số hoá giáo trình mở OpenStax High School Physics (CC BY 4.0) chuẩn Warm Parchment & Song ngữ GDPT 2018: 23 chương (Cơ học, Nhiệt học, Sóng, Quang học, Điện từ, Lượng tử), tra từ 1-chạm tức thì."
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
        src="/physics/index.html"
        title="High School Physics - Vật Lý THPT Song Ngữ"
        className="w-full h-full border-none"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  );
}
