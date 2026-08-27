import React from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/common/SEO";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Sparkles,
  Clock,
  ArrowRight,
  CheckCircle2,
  Layers,
} from "lucide-react";

export default function ReadingUniversePage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 font-sans selection:bg-amber-200 selection:text-stone-900">
      <SEO
        title="Thư Viện Bài Đọc Tiếng Anh | ARIS IELTS"
        description="Đọc tiếng Anh nhẹ nhàng và tự nhiên. Nhấp vào từ bất kỳ để xem ngay nghĩa tiếng Việt và cách dùng."
      />

      {/* Hero Header Section */}
      <section className="relative overflow-hidden border-b border-stone-200/80 bg-gradient-to-b from-[#F7F3EB] to-[#FDFBF7] py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-4 py-1.5 text-xs font-bold text-emerald-800 tracking-wide mb-6">
            <Sparkles className="h-4 w-4 text-emerald-600" />
            Luyện Đọc Hiểu Tiếng Anh Tự Nhiên & Thư Giãn
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-900 leading-tight">
            Đọc Tiếng Anh Nhẹ Nhàng. <br />
            <span className="text-emerald-700">
              Hiểu Sâu & Mở Rộng Tư Duy.
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Không cần tra từ điển phức tạp. Đọc các bài viết chọn lọc về cuộc sống, kỹ năng và khoa học — nhấp vào bất kỳ từ nào để hiểu ngay nghĩa tiếng Việt sát ngữ cảnh.
          </p>

          {/* Quick Start Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <Button
              asChild
              size="lg"
              className="h-12 px-7 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/15 transition-all cursor-pointer"
            >
              <Link to="/reading/case-002">
                <BookOpen className="mr-2 h-4 w-4" />
                Đọc Bài #02: Lời Khuyên Warren Buffett
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 px-6 rounded-xl border-stone-300 bg-white hover:bg-stone-50 text-stone-700 font-bold text-sm shadow-xs transition-all cursor-pointer"
            >
              <Link to="/reading/case-001">
                ❄️ Đọc Bài #01: Hiện Tượng Hồ Băng
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Reading Feature Highlights */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-stone-200 bg-white p-4.5 flex items-start gap-3.5 shadow-xs">
            <div className="h-10 w-10 rounded-xl bg-emerald-100/80 text-emerald-800 flex items-center justify-center shrink-0 font-bold">
              💡
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900">Dịch từ tức thì</h3>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Nhấp chuột vào từ hoặc cụm từ để xem ngay nghĩa tiếng Việt và cách dùng trong câu.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-4.5 flex items-start gap-3.5 shadow-xs">
            <div className="h-10 w-10 rounded-xl bg-sky-100/80 text-sky-800 flex items-center justify-center shrink-0 font-bold">
              🎧
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900">Nghe phát âm chuẩn</h3>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Nghe giọng đọc bản xứ để cải thiện phát âm và phản xạ từ vựng tự nhiên.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-4.5 flex items-start gap-3.5 shadow-xs">
            <div className="h-10 w-10 rounded-xl bg-amber-100/80 text-amber-800 flex items-center justify-center shrink-0 font-bold">
              🌱
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900">Đọc không áp lực</h3>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Không tính thời gian, không áp lực thi cử — đọc để tích lũy kiến thức và thư giãn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-emerald-600" />
            <h2 className="text-lg sm:text-xl font-bold text-stone-900">
              Bài Đọc Tuyển Chọn
            </h2>
          </div>
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            2 bài đọc sẵn sàng
          </span>
        </div>

        {/* ARTICLE #02: WARREN BUFFETT */}
        <div className="rounded-2xl border border-emerald-200 bg-white p-6 sm:p-7 shadow-sm hover:shadow-md transition-all">
          <div className="grid md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Phát triển bản thân
                </span>
                <span className="text-xs text-stone-500">· Fast Company Strategy</span>
                <span className="text-xs text-stone-500">· Trình độ: Thân thiện với mọi người</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
                Bài #02: Kỹ Năng Đòn Bẩy Của Warren Buffett
              </h3>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Trong thời đại AI có thể viết email và soạn thảo văn bản trong tích tắc, Warren Buffett chia sẻ một lời khuyên đắt giá: Năng lực giao tiếp và thấu cảm giữa người với người chính là kỹ năng đòn bẩy tạo nên thành công bền vững nhất.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 pt-1">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-stone-400" /> ~10 phút đọc
                </span>
                <span className="flex items-center gap-1.5">
                  <Layers className="h-4 w-4 text-stone-400" /> 3 phần đọc ngắn gọn
                </span>
                <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Có hỗ trợ dịch từ & phát âm
                </span>
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-stone-100 pt-4 md:pt-0 md:pl-6">
              <Button
                asChild
                className="w-full h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-xs cursor-pointer"
              >
                <Link to="/reading/case-002">
                  Bắt Đầu Đọc
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <p className="text-[11px] text-stone-400 mt-2 text-center">
                Đọc thư giãn kèm giải nghĩa từ vựng
              </p>
            </div>
          </div>
        </div>

        {/* ARTICLE #01: THE VANISHING GLACIAL LAKE */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-7 shadow-sm hover:shadow-md transition-all">
          <div className="grid md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800">
                  Khám phá khoa học
                </span>
                <span className="text-xs text-stone-500">· Địa lý & Khí hậu Greenland</span>
                <span className="text-xs text-stone-500">· Trình độ: Dễ đọc</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
                Bài #01: Hiện Tượng Hồ Băng Greenland Biến Mất
              </h3>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                03:15 sáng tại dải băng Greenland, 8 triệu mét khối nước băng bất ngờ biến mất hoàn toàn trong 90 phút mà không hề tràn ra ngoài. Khám phá cách các nhà khoa học tìm ra lời giải thích thú vị về hiện tượng này.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 pt-1">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-stone-400" /> ~8 phút đọc
                </span>
                <span className="flex items-center gap-1.5">
                  <Layers className="h-4 w-4 text-stone-400" /> 3 nguồn dữ liệu ngắn
                </span>
                <span className="flex items-center gap-1.5 text-sky-700 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-sky-600" /> Có sơ đồ trực quan minh họa
                </span>
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-stone-100 pt-4 md:pt-0 md:pl-6">
              <Button
                asChild
                variant="outline"
                className="w-full h-11 rounded-xl border-stone-300 bg-white hover:bg-stone-50 text-stone-800 font-bold text-xs uppercase tracking-wider cursor-pointer"
              >
                <Link to="/reading/case-001">
                  Bắt Đầu Đọc
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <p className="text-[11px] text-stone-400 mt-2 text-center">
                Đọc đối chiếu & xem sơ đồ trực quan
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Helpful Reading Tip */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mb-12">
        <div className="rounded-2xl bg-[#F7F3EB] border border-stone-200/90 p-5 sm:p-6 flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 font-bold">
            🌱
          </div>
          <div className="space-y-0.5">
            <h4 className="text-sm font-bold text-stone-900">Lời khuyên cho người mới luyện đọc:</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Bạn không cần phải dịch từng chữ một sang tiếng Việt. Hãy đọc lướt qua cả câu để hiểu ý chính, và nhấp vào từ vựng chỉ khi từ đó cản trở việc hiểu nội dung của bạn.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
