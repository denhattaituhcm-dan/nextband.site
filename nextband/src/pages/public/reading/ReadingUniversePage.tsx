import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/common/SEO";
import {
  Volume2,
  ArrowRight,
  Compass,
} from "lucide-react";

export default function ReadingUniversePage() {
  const [popoverOpen, setPopoverOpen] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState("all");

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D2825] font-sans selection:bg-[#F2DBD3] selection:text-[#2D2825]">
      <SEO
        title="ARIS Reading Library — Chạm từng chữ. Thấu hiểu cả thế giới."
        description="Không gian đọc học thuật và tích lũy vốn từ tự nhiên. Nhấp vào từ bất kỳ để thấu hiểu nghĩa ngữ cảnh và nghe phát âm chuẩn bản ngữ."
      />

      {/* Academic Sub-nav Header */}
      <nav className="border-b border-[#EAE3D9] bg-[#FAF7F2]/95 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          {/* Navigation Tabs */}
          <div className="flex items-center gap-6 sm:gap-8 text-xs font-medium text-[#7A7067]">
            <a
              href="#tu-sach"
              className="text-[#2D2825] font-semibold border-b-2 border-[#2D2825] pb-1 transition-all"
            >
              Tủ sách tương tác
            </a>
            <a
              href="#phuong-phap"
              className="hover:text-[#2D2825] transition-colors pb-1"
            >
              Phương pháp đọc sâu
            </a>
            <a
              href="#von-tu"
              className="hover:text-[#2D2825] transition-colors pb-1"
            >
              Vốn từ tích lũy
            </a>
          </div>

          {/* Right Meta Info */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-[#9E948A] hidden sm:inline">
              VOLUME 2026.10
            </span>
            <Link
              to="/reading/case-002"
              className="px-3.5 py-1.5 rounded-full bg-[#EFE9DF] text-[#635951] text-xs font-semibold hover:bg-[#E5DDCF] transition cursor-pointer"
            >
              Khám phá ngẫu nhiên 🎲
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-16 sm:space-y-20">
        {/* Hero Section with Interactive Playground */}
        <section className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#241F1C] tracking-tight font-normal leading-[1.15]">
            Chạm từng chữ.
            <br />
            <em className="italic text-[#C86D51] font-normal">
              Thấu hiểu cả thế giới.
            </em>
          </h1>

          <p className="text-sm sm:text-base text-[#685D55] max-w-xl mx-auto leading-relaxed font-light">
            Đọc nguyên bản, cảm nhận ngữ cảnh tự nhiên và tích lũy vốn từ học thuật bền vững.
          </p>

          {/* The "Show, Don't Tell" Micro-interactive Box */}
          <div className="bg-white rounded-3xl border border-[#E8E1D5] p-6 sm:p-9 shadow-sm shadow-[#2D2825]/5 text-left relative max-w-3xl mx-auto mt-8">
            <div className="flex items-center justify-between text-xs text-[#A1978E] pb-4 border-b border-[#F2ECE2]">
              <span className="font-mono tracking-wider text-[11px]">
                ▶ TRẢI NGHIỆM ĐỌC THỬ TẠI CHỖ
              </span>
              <span className="text-[#C86D51] bg-[#FBEBE5] px-3 py-1 rounded-full font-medium text-xs">
                Chạm từ gạch chân ↘
              </span>
            </div>

            <p className="text-xl sm:text-2xl text-[#2E2723] leading-relaxed pt-6 pb-2 font-serif font-normal">
              “Warren Buffett spent eighty percent of his day{" "}
              <button
                type="button"
                onClick={() => setPopoverOpen(!popoverOpen)}
                className={`relative cursor-pointer inline-block border-b-2 border-dashed border-[#C86D51] pb-0.5 text-[#9C4124] font-semibold transition-all px-1 rounded-sm ${
                  popoverOpen ? "bg-[#FBEBE5] border-transparent" : "hover:bg-[#FBEBE5]"
                }`}
              >
                leveraging
              </button>{" "}
              quiet reflection instead of endless meetings.”
            </p>

            {/* Popover Simulation */}
            {popoverOpen && (
              <div className="mt-5 p-5 sm:p-6 rounded-2xl bg-[#28221F] text-white relative shadow-2xl border border-white/5 space-y-3 transition-all animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-2xl text-amber-200 font-medium tracking-wide">
                      leveraging
                    </span>
                    <span className="text-white/60 text-sm font-mono">
                      /ˈlev.ɚ.ɪdʒ.ɪŋ/
                    </span>
                    <span className="text-[11px] uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded text-white/80 font-mono">
                      verb · transitive
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if ("speechSynthesis" in window) {
                        const utterance = new SpeechSynthesisUtterance("leveraging");
                        utterance.lang = "en-US";
                        window.speechSynthesis.speak(utterance);
                      }
                    }}
                    className="text-white/90 hover:text-white text-xs flex items-center gap-1.5 bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    <Volume2 className="h-3.5 w-3.5 text-amber-300" />
                    <span>Nghe bản xứ</span>
                  </button>
                </div>

                <p className="text-sm sm:text-base text-white/90 leading-relaxed font-light pt-1">
                  <strong className="text-amber-200 font-medium text-base">
                    Đòn bẩy / Khai thác tối đa:
                  </strong>{" "}
                  Sử dụng một nguồn lực có sẵn (thời gian, kiến thức, sự tập trung) để tạo ra hiệu quả hoặc sức ảnh hưởng vượt trội gấp bội.
                </p>

                <div className="text-xs text-white/50 pt-2 border-t border-white/5 flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="italic font-serif text-sm text-white/70">
                    Collocation thường gặp:
                  </span>
                  <span>• leverage resources</span>
                  <span>• leverage technology</span>
                  <span>• strategic leverage</span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Reading Feed Section */}
        <section id="tu-sach" className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAE3D9] pb-4">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#241F1C]">
                Bài đọc tuyển chọn tuần này
              </h2>
              <p className="text-xs text-[#8C827A] mt-1 font-light">
                Không bài tập, không đếm ngược — chỉ có kiến thức và từ vựng tinh chọn.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedTopic("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                  selectedTopic === "all"
                    ? "bg-[#2D2825] text-white"
                    : "bg-[#EFE9DF] text-[#635951] hover:bg-[#E5DDCF]"
                }`}
              >
                Tất cả chủ đề
              </button>
              <button
                type="button"
                onClick={() => setSelectedTopic("mindset")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                  selectedTopic === "mindset"
                    ? "bg-[#2D2825] text-white"
                    : "bg-[#EFE9DF] text-[#635951] hover:bg-[#E5DDCF]"
                }`}
              >
                Phát triển bản thân
              </button>
              <button
                type="button"
                onClick={() => setSelectedTopic("science")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                  selectedTopic === "science"
                    ? "bg-[#2D2825] text-white"
                    : "bg-[#EFE9DF] text-[#635951] hover:bg-[#E5DDCF]"
                }`}
              >
                Khoa học & Trái đất
              </button>
              <button
                type="button"
                onClick={() => setSelectedTopic("tech")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                  selectedTopic === "tech"
                    ? "bg-[#2D2825] text-white"
                    : "bg-[#EFE9DF] text-[#635951] hover:bg-[#E5DDCF]"
                }`}
              >
                Công nghệ & AI
              </button>
              <button
                type="button"
                onClick={() => setSelectedTopic("education")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                  selectedTopic === "education"
                    ? "bg-[#2D2825] text-white"
                    : "bg-[#EFE9DF] text-[#635951] hover:bg-[#E5DDCF]"
                }`}
              >
                Giáo dục & Đọc sâu
              </button>
              <button
                type="button"
                onClick={() => setSelectedTopic("society")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                  selectedTopic === "society"
                    ? "bg-[#2D2825] text-white"
                    : "bg-[#EFE9DF] text-[#635951] hover:bg-[#E5DDCF]"
                }`}
              >
                Xã hội & Tâm lý
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Story Card 1: Warren Buffett */}
            {(selectedTopic === "all" || selectedTopic === "mindset") && (
              <article className="group bg-white rounded-2xl border border-[#EAE3D9] overflow-hidden hover:border-[#C86D51]/50 hover:shadow-xl hover:shadow-[#C86D51]/5 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="aspect-[16/9] bg-[#EFE9DF] relative overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1000&auto=format&fit=crop&q=80"
                      alt="Warren Buffett Strategy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-[#2D2825]/85 backdrop-blur-md text-white text-[11px] font-medium">
                        Phát triển bản thân
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-[#2D2825] text-[11px] font-medium">
                        Fast Company
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 space-y-3">
                    {/* Quiet Academic Metadata */}
                    <div className="flex items-center gap-2 text-xs text-[#8A7E75] font-light">
                      <span>Reading #02</span>
                      <span>·</span>
                      <span>5 min read</span>
                      <span>·</span>
                      <span className="text-[#9C4124] font-normal">
                        14 từ vựng trọng tâm
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-medium text-[#241F1C] group-hover:text-[#C86D51] transition-colors leading-snug">
                      <Link to="/reading/case-002">
                        Bài #02: Kỹ Năng Đòn Bẩy Của Warren Buffett Trong Kỷ Nguyên AI
                      </Link>
                    </h3>
                  </div>
                </div>

                <div className="px-6 sm:px-7 pb-6 pt-3 border-t border-[#F5EFE7] flex items-center justify-end text-xs text-[#8C827A]">
                  <Link
                    to="/reading/case-002"
                    className="group-hover:translate-x-1 transition-transform font-semibold text-[#C86D51] flex items-center gap-1"
                  >
                    Bắt đầu đọc <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            )}

            {/* Story Card 2: Greenland Ice Lake */}
            {(selectedTopic === "all" || selectedTopic === "science") && (
              <article className="group bg-white rounded-2xl border border-[#EAE3D9] overflow-hidden hover:border-[#4B799E]/50 hover:shadow-xl hover:shadow-[#4B799E]/5 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="aspect-[16/9] bg-[#E1EAF0] relative overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?w=1000&auto=format&fit=crop&q=80"
                      alt="Greenland Glacier Lake"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-[#2D2825]/85 backdrop-blur-md text-white text-[11px] font-medium">
                        Khám phá Địa lý
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-[#2D2825] text-[11px] font-medium">
                        Science Alert
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 space-y-3">
                    {/* Quiet Academic Metadata */}
                    <div className="flex items-center gap-2 text-xs text-[#8A7E75] font-light">
                      <span>Reading #01</span>
                      <span>·</span>
                      <span>4 min read</span>
                      <span>·</span>
                      <span className="text-[#3E6585] font-normal">
                        18 thuật ngữ địa lý
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-medium text-[#241F1C] group-hover:text-[#4B799E] transition-colors leading-snug">
                      <Link to="/reading/case-001">
                        Bài #01: Bí Ẩn 8 Triệu Mét Khối Nước Biến Mất Trong 90 Phút
                      </Link>
                    </h3>
                  </div>
                </div>

                <div className="px-6 sm:px-7 pb-6 pt-3 border-t border-[#F5EFE7] flex items-center justify-end text-xs text-[#8C827A]">
                  <Link
                    to="/reading/case-001"
                    className="group-hover:translate-x-1 transition-transform font-semibold text-[#4B799E] flex items-center gap-1"
                  >
                    Bắt đầu đọc <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            )}

            {/* Story Card 3: Generative AI Paradox (The Guardian) */}
            {(selectedTopic === "all" || selectedTopic === "tech") && (
              <article className="group bg-white rounded-2xl border border-[#EAE3D9] overflow-hidden hover:border-[#6B46C1]/50 hover:shadow-xl hover:shadow-[#6B46C1]/5 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="aspect-[16/9] bg-[#EFE9DF] relative overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80"
                      alt="Generative AI Paradox"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-[#2D2825]/85 backdrop-blur-md text-white text-[11px] font-medium">
                        Công nghệ & Xã hội
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-[#2D2825] text-[11px] font-medium">
                        The Guardian
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-[#8A7E75] font-light">
                      <span>Reading #03</span>
                      <span>·</span>
                      <span>6 min read</span>
                      <span>·</span>
                      <span className="text-[#6B46C1] font-normal">
                        IELTS Band 7.5+
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-medium text-[#241F1C] group-hover:text-[#6B46C1] transition-colors leading-snug">
                      <Link to="/reading/case-003">
                        Bài #03: Nghịch Lý AI Tạo Sinh: Xáo Trộn Trí Tuệ & Năng Lực Con Người
                      </Link>
                    </h3>
                  </div>
                </div>

                <div className="px-6 sm:px-7 pb-6 pt-3 border-t border-[#F5EFE7] flex items-center justify-end text-xs text-[#8C827A]">
                  <Link
                    to="/reading/case-003"
                    className="group-hover:translate-x-1 transition-transform font-semibold text-[#6B46C1] flex items-center gap-1"
                  >
                    Bắt đầu đọc <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            )}

            {/* Story Card 4: The EdTech Delusion (The Guardian) */}
            {(selectedTopic === "all" || selectedTopic === "education") && (
              <article className="group bg-white rounded-2xl border border-[#EAE3D9] overflow-hidden hover:border-[#1E6091]/50 hover:shadow-xl hover:shadow-[#1E6091]/5 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="aspect-[16/9] bg-[#EFE9DF] relative overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1000&auto=format&fit=crop&q=80"
                      alt="The EdTech Delusion & Deep Reading"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-[#2D2825]/85 backdrop-blur-md text-white text-[11px] font-medium">
                        Giáo dục & Đọc sâu
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-[#2D2825] text-[11px] font-medium">
                        The Guardian
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-[#8A7E75] font-light">
                      <span>Reading #04</span>
                      <span>·</span>
                      <span>5 min read</span>
                      <span>·</span>
                      <span className="text-[#1E6091] font-normal">
                        IELTS Band 7.5+
                      </span>
                      <span>·</span>
                      <span>Phê phán sư phạm</span>
                    </div>

                    <h3 className="font-serif text-2xl font-medium text-[#241F1C] group-hover:text-[#1E6091] transition-colors leading-snug">
                      <Link to="/reading/case-004">
                        Bài #04: Ảo Tưởng EdTech: Lớp Học Màn Hình & Sự Xói Mòn Của Đọc Sâu
                      </Link>
                    </h3>
                  </div>
                </div>

                <div className="px-6 sm:px-7 pb-6 pt-3 border-t border-[#F5EFE7] flex items-center justify-end text-xs text-[#8C827A]">
                  <Link
                    to="/reading/case-004"
                    className="group-hover:translate-x-1 transition-transform font-semibold text-[#1E6091] flex items-center gap-1"
                  >
                    Bắt đầu đọc <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            )}

            {/* Story Card 5: The Techno-Fix Myth (The Guardian) */}
            {(selectedTopic === "all" || selectedTopic === "science") && (
              <article className="group bg-white rounded-2xl border border-[#EAE3D9] overflow-hidden hover:border-[#2D6A4F]/50 hover:shadow-xl hover:shadow-[#2D6A4F]/5 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="aspect-[16/9] bg-[#EFE9DF] relative overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1000&auto=format&fit=crop&q=80"
                      alt="The Techno-Fix Myth & Planetary Boundaries"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-[#2D2825]/85 backdrop-blur-md text-white text-[11px] font-medium">
                        Môi trường & Sinh thái
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-[#2D2825] text-[11px] font-medium">
                        The Guardian
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-[#8A7E75] font-light">
                      <span>Reading #05</span>
                      <span>·</span>
                      <span>6 min read</span>
                      <span>·</span>
                      <span className="text-[#2D6A4F] font-normal">
                        IELTS Band 7.5+
                      </span>
                      <span>·</span>
                      <span>Kinh tế sinh thái</span>
                    </div>

                    <h3 className="font-serif text-2xl font-medium text-[#241F1C] group-hover:text-[#2D6A4F] transition-colors leading-snug">
                      <Link to="/reading/case-005">
                        Bài #05: Ảo Tưởng Công Nghệ Xanh: Vì Sao Đổi Mới Kỹ Thuật Không Đủ Cứu Trái Đất
                      </Link>
                    </h3>
                  </div>
                </div>

                <div className="px-6 sm:px-7 pb-6 pt-3 border-t border-[#F5EFE7] flex items-center justify-end text-xs text-[#8C827A]">
                  <Link
                    to="/reading/case-005"
                    className="group-hover:translate-x-1 transition-transform font-semibold text-[#2D6A4F] flex items-center gap-1"
                  >
                    Bắt đầu đọc <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            )}

            {/* Story Card 6: The Hyperconnected Loneliness Epidemic (The Guardian) */}
            {(selectedTopic === "all" || selectedTopic === "society") && (
              <article className="group bg-white rounded-2xl border border-[#EAE3D9] overflow-hidden hover:border-[#B85A3A]/50 hover:shadow-xl hover:shadow-[#B85A3A]/5 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="aspect-[16/9] bg-[#EFE9DF] relative overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1000&auto=format&fit=crop&q=80"
                      alt="The Hyperconnected Loneliness Epidemic"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-[#2D2825]/85 backdrop-blur-md text-white text-[11px] font-medium">
                        Xã hội & Tâm lý
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-[#2D2825] text-[11px] font-medium">
                        The Guardian
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-[#8A7E75] font-light">
                      <span>Reading #06</span>
                      <span>·</span>
                      <span>6 min read</span>
                      <span>·</span>
                      <span className="text-[#B85A3A] font-normal">
                        IELTS Band 7.5+
                      </span>
                      <span>·</span>
                      <span>Tâm lý xã hội học</span>
                    </div>

                    <h3 className="font-serif text-2xl font-medium text-[#241F1C] group-hover:text-[#B85A3A] transition-colors leading-snug">
                      <Link to="/reading/case-006">
                        Bài #06: Đại Dịch Cô Đơn Số: Vòng Lặp Dopamine & Sự Tan Rã Của Cộng Đồng
                      </Link>
                    </h3>
                  </div>
                </div>

                <div className="px-6 sm:px-7 pb-6 pt-3 border-t border-[#F5EFE7] flex items-center justify-end text-xs text-[#8C827A]">
                  <Link
                    to="/reading/case-006"
                    className="group-hover:translate-x-1 transition-transform font-semibold text-[#B85A3A] flex items-center gap-1"
                  >
                    Bắt đầu đọc <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            )}
          </div>
        </section>

        {/* Academic Reading Methodology Philosophy Section */}
        <section id="phuong-phap" className="border-t border-[#ECE5DD] pt-14 pb-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#C86D51] font-medium flex items-center justify-center gap-1.5">
              <Compass className="h-3.5 w-3.5 text-[#C86D51]" />
              Triết lý học từ bản chất
            </span>
            <h4 className="font-serif text-2xl sm:text-3xl text-[#221C18] font-normal">
              Đọc không phải để đối phó thi cử. Đọc là để mở rộng nhãn quan.
            </h4>
            <p className="text-xs sm:text-sm text-[#73685E] leading-relaxed font-light">
              Khi rũ bỏ đồng hồ đếm ngược và áp lực chọn đáp án trắc nghiệm, bộ não sẽ bước vào trạng thái tiếp nhận ngôn ngữ tự nhiên nhất: quan sát cấu trúc ngữ pháp, chiêm nghiệm ý tưởng và thẩm thấu từ vựng đúng ngữ cảnh sống.
            </p>
          </div>
        </section>
      </main>

      {/* Footer Note */}
      <footer className="border-t border-[#EAE3D9] py-8 text-center text-xs text-[#A1978E] mt-12 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#2D2825]">Thư viện đọc hiểu tương tác</span>
            <span>· Tích lũy vốn từ học thuật tự nhiên</span>
          </div>
          <div>
            Chạm từng chữ · Thấu hiểu cả thế giới
          </div>
        </div>
      </footer>
    </div>
  );
}
