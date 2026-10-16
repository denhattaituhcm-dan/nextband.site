import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/common/SEO";
import {
  Sparkles,
  BookOpen,
  Volume2,
  FileCheck2,
  Compass,
  ArrowRight,
  Search,
  CheckCircle2,
  Clock,
  Layers,
  GraduationCap,
} from "lucide-react";
import unit01Data from "@/data/idioms/unit01";
import unit02Data from "@/data/idioms/unit02";
import unit03Data from "@/data/idioms/unit03";
import unit04Data from "@/data/idioms/unit04";
import unit05Data from "@/data/idioms/unit05";
import unit06Data from "@/data/idioms/unit06";
import unit07Data from "@/data/idioms/unit07";
import unit08Data from "@/data/idioms/unit08";

interface UnitCatalogItem {
  id: number;
  unit_number_str: string;
  title_en: string;
  title_vi: string;
  section: string;
  description_vi: string;
  total_idioms: number;
  total_exercises: number;
  modules: { id: string; title: string; sample: string }[];
  tags: string[];
  accent: string;
  isAvailable: boolean;
}

const UNITS_CATALOG: UnitCatalogItem[] = [
  {
    id: 1,
    unit_number_str: unit01Data.unit_number_str,
    title_en: unit01Data.unit_title,
    title_vi: "Tuổi tác & Các giai đoạn cuộc đời",
    section: unit01Data.major_section,
    description_vi:
      "Khám phá 20 thành ngữ cốt lõi và cụm từ cố định về tuổi thơ, thanh xuân nồng nhiệt, bước ngoặt trưởng thành và những năm tháng xế chiều.",
    total_idioms: unit01Data.summary.total_idioms,
    total_exercises: unit01Data.summary.total_practice_exercises,
    modules: [
      {
        id: "1.1",
        title: "Idioms about age",
        sample: "no spring chicken, long in the tooth, over the hill...",
      },
      {
        id: "1.2",
        title: "Expressions with 'age'",
        sample: "look your age, golden age, come of age...",
      },
    ],
    tags: ["Tuổi tác", "Trưởng thành", "Thời gian", "IELTS Speaking Part 2"],
    accent: "US (Mỹ)",
    isAvailable: true,
  },
  {
    id: 2,
    unit_number_str: unit02Data.unit_number_str,
    title_en: unit02Data.unit_title,
    title_vi: "Gia đình & Tình bạn thâm giao",
    section: unit02Data.major_section,
    description_vi:
      "20 thành ngữ then chốt diễn tả tình bạn, kết giao tâm đầu ý hợp, xung đột gia tộc và các mối quan hệ ruột thịt nhiều thế hệ.",
    total_idioms: unit02Data.summary.total_idioms,
    total_exercises: unit02Data.summary.total_practice_exercises,
    modules: [
      {
        id: "2.1",
        title: "Idioms about relationships",
        sample: "hit it off, see eye to eye, on the same wavelength...",
      },
      {
        id: "2.2",
        title: "Idioms about family",
        sample: "flesh and blood, bad blood, run in the family...",
      },
    ],
    tags: ["Bạn bè", "Gia đình", "Quan hệ xã hội", "IELTS Speaking Part 1 & 3"],
    accent: "US (Mỹ)",
    isAvailable: true,
  },
  {
    id: 3,
    unit_number_str: unit03Data.unit_number_str,
    title_en: unit03Data.unit_title,
    title_vi: "Diện mạo & Xuất thân xã hội",
    section: unit03Data.major_section,
    description_vi:
      "20 thành ngữ ấn tượng miêu tả diện mạo, nét tương đồng người với người, phong thái ăn mặc sang trọng chỉn chu và nguồn gốc xuất thân.",
    total_idioms: unit03Data.summary.total_idioms,
    total_exercises: unit03Data.summary.total_practice_exercises,
    modules: [
      {
        id: "3.1",
        title: "Appearance and similarity",
        sample: "dead ringer, spitting image, dressed to kill...",
      },
      {
        id: "3.2",
        title: "Clothing, background, and social status",
        sample: "born with a silver spoon, down at heel, cut a dash...",
      },
    ],
    tags: ["Ngoại hình", "Trang phục", "Địa vị", "Tả người"],
    accent: "US (Mỹ)",
    isAvailable: true,
  },
  {
    id: 4,
    unit_number_str: unit04Data.unit_number_str,
    title_en: unit04Data.unit_title,
    title_vi: "Nét tính cách qua lăng kính ẩn dụ",
    section: unit04Data.major_section,
    description_vi:
      "Khắc họa tính cách con người qua lăng kính động vật và thực phẩm, từ điềm tĩnh kiên định đến lập dị, sắc sảo hay chân chất.",
    total_idioms: unit04Data.summary.total_idioms,
    total_exercises: unit04Data.summary.total_practice_exercises,
    modules: [
      {
        id: "4.1",
        title: "Personality traits with animal metaphors",
        sample: "eager beaver, lone wolf, dark horse, busybody...",
      },
      {
        id: "4.2",
        title: "Personality traits with food & objects",
        sample: "tough cookie, cool as a cucumber, salt of the earth...",
      },
    ],
    tags: ["Tính cách", "Ẩn dụ động vật", "Ẩn dụ ẩm thực", "Band 8.0+ Lexical"],
    accent: "US (Mỹ)",
    isAvailable: true,
  },
  {
    id: 5,
    unit_number_str: unit05Data.unit_number_str,
    title_en: unit05Data.unit_title,
    title_vi: "Sự xuất sắc, may mắn & Điều tuyệt hảo",
    section: unit05Data.major_section,
    description_vi:
      "20 thành ngữ đỉnh cao miêu tả sự xuất sắc, thành tựu kiệt xuất, những điều tuyệt vời ngoài sức tưởng tượng và cơ duyên tái ông thất mã.",
    total_idioms: unit05Data.summary.total_idioms,
    total_exercises: unit05Data.summary.total_practice_exercises,
    modules: [
      {
        id: "5.1",
        title: "Praise and superlatives",
        sample: "the best thing since sliced bread, stole the show, the bee's knees...",
      },
      {
        id: "5.2",
        title: "Excellence, advantages, and peak performance",
        sample: "the best of both worlds, a blessing in disguise, crème de la crème...",
      },
    ],
    tags: ["Khen ngợi", "Xuất sắc", "May mắn", "Đỉnh cao"],
    accent: "US (Mỹ)",
    isAvailable: true,
  },
  {
    id: 6,
    unit_number_str: unit06Data.unit_number_str,
    title_en: unit06Data.unit_title,
    title_vi: "Sự thất vọng, phẩm chất kém & Giọt nước tràn ly",
    section: unit06Data.major_section,
    description_vi:
      "Khám phá 20 thành ngữ then chốt diễn tả chất lượng tồi tàn, sự hụt hẫng thất vọng, cảm giác tẻ nhạt đến phát ngấy và giới hạn chịu đựng giọt nước tràn ly.",
    total_idioms: unit06Data.summary.total_idioms,
    total_exercises: unit06Data.summary.total_practice_exercises,
    modules: [
      {
        id: "6.1",
        title: "Disappointment, low quality & negative experiences",
        sample: "leave a bad taste in my mouth, second rate, not my cup of tea...",
      },
      {
        id: "6.2",
        title: "Wear and tear, boredom, and the breaking point",
        sample: "seen better days, like watching paint dry, the last straw...",
      },
    ],
    tags: ["Thất vọng", "Chất lượng kém", "Giọt nước tràn ly", "IELTS Speaking Part 2 & 3"],
    accent: "UK (Anh)",
    isAvailable: true,
  },
  {
    id: 7,
    unit_number_str: unit07Data.unit_number_str,
    title_en: unit07Data.unit_title,
    title_vi: "Thế giới động vật & Ẩn dụ ngụ ngôn",
    section: unit07Data.major_section,
    description_vi:
      "20 thành ngữ đặc sắc mượn tập tính sinh học, ngụ ngôn cổ xưa và đặc trưng loài vật để khắc họa tâm lý, hành vi con người và tình huống xã hội.",
    total_idioms: unit07Data.summary.total_idioms,
    total_exercises: unit07Data.summary.total_practice_exercises,
    modules: [
      {
        id: "7.1",
        title: "Animal behaviors, instincts & metaphors",
        sample: "a scaredy-cat, cry wolf, dropping like flies, elephant in the room...",
      },
      {
        id: "7.2",
        title: "Creature symbols, stereotypes & animal attributes",
        sample: "a night owl, get someone's goat, bird's-eye view, lion's share...",
      },
    ],
    tags: ["Động vật", "Ẩn dụ ngụ ngôn", "Tập tính tự nhiên", "IELTS Speaking & Writing"],
    accent: "UK (Anh)",
    isAvailable: true,
  },
  {
    id: 8,
    unit_number_str: unit08Data.unit_number_str,
    title_en: unit08Data.unit_title,
    title_vi: "Ẩm thực, Bếp núc & Ẩn dụ Đời sống",
    section: unit08Data.major_section,
    description_vi:
      "Khám phá 20 thành ngữ đặc sắc mượn chất liệu ẩm thực, bánh trái, bơ sữa và thói quen ăn uống để khắc họa tâm lý, thế giới nghề nghiệp và các mối quan hệ xã hội.",
    total_idioms: unit08Data.summary.total_idioms,
    total_exercises: unit08Data.summary.total_practice_exercises,
    modules: [
      {
        id: "8.1",
        title: "Food metaphors in work, life & nature",
        sample: "as flat as a pancake, puts food on the table, packed like sardines, spoon-feeds...",
      },
      {
        id: "8.2",
        title: "Appetite, baking & culinary psychology",
        sample: "can't have your cake and eat it, takes the cake, warm and toasty, butterfingers...",
      },
    ],
    tags: ["Ẩm thực", "Bếp núc", "Nghề nghiệp", "IELTS Speaking & Writing"],
    accent: "US (Mỹ)",
    isAvailable: true,
  },
];

const UPCOMING_UNITS = [
  { id: 9, unit_number_str: "09", title_en: "Agreeing and disagreeing", title_vi: "Đồng thuận, tranh luận & bất đồng ý kiến" },
  { id: 10, unit_number_str: "10", title_en: "Clothes and fashion", title_vi: "Trang phục & Thời trang" },
  { id: 11, unit_number_str: "11", title_en: "Emotions", title_vi: "Cảm xúc & Tâm trạng con người" },
  { id: 12, unit_number_str: "12", title_en: "Relationships", title_vi: "Quan hệ tình cảm & bạn bè sâu rộng" },
  { id: 13, unit_number_str: "13", title_en: "Communication", title_vi: "Giao tiếp, đối thoại & truyền thông" },
];

export default function EnglishIdiomsCatalogPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUnits = UNITS_CATALOG.filter((u) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      u.title_en.toLowerCase().includes(q) ||
      u.title_vi.toLowerCase().includes(q) ||
      u.description_vi.toLowerCase().includes(q) ||
      u.tags.some((t) => t.toLowerCase().includes(q)) ||
      u.modules.some((m) => m.title.toLowerCase().includes(q) || m.sample.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D2825] font-sans selection:bg-[#F2DBD3] selection:text-[#2D2825]">
      <SEO
        title="Kho Thành Ngữ Tiếng Anh Theo Chủ Đề — English Idioms Master | ARIS IELTS"
        description="Khám phá và luyện tập toàn diện các chủ đề thành ngữ tiếng Anh theo chuẩn giáo trình DK English for Everyone. Tích hợp audio chuẩn bản ngữ, nghiên cứu từ nguyên học và bài tập chấm điểm tương tác."
      />

      {/* Sub-nav Header */}
      <nav className="border-b border-[#EAE3D9] bg-[#FAF7F2]/95 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-5 text-xs font-medium text-[#7A7067]">
            <Link
              to="/reading"
              className="hover:text-[#2D2825] transition-colors flex items-center gap-1 font-semibold"
            >
              ← Tủ sách đọc báo
            </Link>
            <span className="text-[#C5BCB1]">•</span>
            <span className="font-bold text-[#002147] flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#0369a1]" />
              Kho Thành Ngữ English Idioms Master
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              8 Units Sẵn Sàng (160 Idioms)
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#002147] via-[#0369a1] to-[#0284c7] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-5 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-xs text-xs font-bold tracking-wider uppercase text-amber-200 border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>DK Publishing & NextBand Academic</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Kho Thành Ngữ Tiếng Anh Theo Chủ Đề
            </h1>

            <p className="text-sm sm:text-base text-slate-100 max-w-2xl leading-relaxed font-light">
              Tuyển tập thành ngữ và cụm từ cố định trực quan theo giáo trình{" "}
              <strong className="text-white font-medium">English for Everyone: English Idioms</strong>{" "}
              (DK Publishing). Mỗi bài học trang bị đầy đủ audio bản ngữ giọng Anh/Mỹ, nghiên cứu từ nguyên học OED giải mã lý do tại sao cụm từ có nghĩa như vậy, cùng hệ thống 5 bài tập tương tác chấm điểm chuẩn xác.
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
                <div className="text-2xl sm:text-3xl font-black text-amber-300">08</div>
                <div className="text-xs text-slate-200 font-medium mt-0.5">Units đã số hóa</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
                <div className="text-2xl sm:text-3xl font-black text-sky-200">160</div>
                <div className="text-xs text-slate-200 font-medium mt-0.5">Thành ngữ & Cụm từ</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
                <div className="text-2xl sm:text-3xl font-black text-emerald-200">100%</div>
                <div className="text-xs text-slate-200 font-medium mt-0.5">Audio bản ngữ US/UK</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
                <div className="text-2xl sm:text-3xl font-black text-purple-200">40</div>
                <div className="text-xs text-slate-200 font-medium mt-0.5">Bài tập tương tác</div>
              </div>
            </div>
          </div>
        </section>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#EAE3D9] shadow-xs">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm Unit theo tên, chủ đề, từ khóa hoặc thành ngữ..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition"
            />
          </div>

          <div className="text-xs text-[#7A7067] font-medium flex items-center gap-1.5 shrink-0 px-1">
            <span>Hiển thị:</span>
            <strong className="text-[#002147] font-bold">{filteredUnits.length} Units</strong>
          </div>
        </div>

        {/* SECTION 1: AVAILABLE UNITS */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#EAE3D9] pb-3">
            <div className="space-y-1">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#0369a1] bg-sky-50 px-2.5 py-0.5 rounded-md border border-sky-100">
                Phần 1: Miêu tả con người & Sự vật
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#002147] tracking-tight">
                Danh Sách Các Unit Đã Số Hóa
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline-block">
              Chọn một bài học để bắt đầu học và làm bài tập
            </span>
          </div>

          {/* Unit Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredUnits.map((unit) => (
              <div
                key={unit.id}
                className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-100 uppercase tracking-wider inline-block">
                        Unit {unit.unit_number_str}
                      </span>
                      <h3 className="text-xl font-black text-slate-900 group-hover:text-[#002147] transition">
                        {unit.title_en}
                      </h3>
                      <p className="text-xs font-semibold text-slate-500">{unit.title_vi}</p>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-extrabold">
                        Sẵn sàng học
                      </span>
                    </div>
                  </div>

                  {/* Card Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                    {unit.description_vi}
                  </p>

                  {/* Modules Preview */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="w-3 h-3 text-[#0369a1]" />
                      Nội dung trọng tâm (2 Modules)
                    </div>
                    <div className="space-y-1.5 text-xs text-slate-700">
                      {unit.modules.map((m) => (
                        <div key={m.id} className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                          <span className="font-bold text-slate-800 shrink-0">
                            • Module {m.id}: {m.title}
                          </span>
                          <span className="text-slate-500 text-[11px] italic truncate sm:max-w-xs">
                            ({m.sample})
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Highlights Tags */}
                  <div className="flex flex-wrap gap-2 pt-1 text-[11px]">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#FAF7F2] text-slate-700 font-medium border border-[#EAE3D9] flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-sky-600" />
                      {unit.total_idioms} Idioms
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-[#FAF7F2] text-slate-700 font-medium border border-[#EAE3D9] flex items-center gap-1">
                      <Volume2 className="w-3 h-3 text-amber-600" />
                      Audio Giọng Mỹ {unit.accent}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-[#FAF7F2] text-slate-700 font-medium border border-[#EAE3D9] flex items-center gap-1">
                      <FileCheck2 className="w-3 h-3 text-emerald-600" />
                      {unit.total_exercises} Bài tập
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-[#FAF7F2] text-slate-700 font-medium border border-[#EAE3D9] flex items-center gap-1">
                      <Compass className="w-3 h-3 text-purple-600" />
                      Từ nguyên học OED
                    </span>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="pt-6 mt-4 border-t border-slate-100">
                  <Link
                    to={`/reading/idioms/${unit.id}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-[#002147] hover:bg-[#0369a1] text-white font-bold text-xs sm:text-sm shadow-xs transition cursor-pointer"
                  >
                    <span>Vào học Unit {unit.unit_number_str}: {unit.title_en}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredUnits.length === 0 && (
            <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-300 space-y-3">
              <Search className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-600">Không tìm thấy Unit nào khớp với "{searchQuery}"</p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-xs text-sky-600 hover:underline font-bold"
              >
                Xóa tìm kiếm
              </button>
            </div>
          )}
        </section>

        {/* SECTION 2: ROADMAP PREVIEW */}
        <section className="bg-slate-900 rounded-3xl p-8 sm:p-10 text-white space-y-6">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> Lộ trình số hóa
            </span>
            <h3 className="text-xl sm:text-2xl font-black">Các Chủ Đề Kế Tiếp Đang Được Biên Soạn</h3>
            <p className="text-xs sm:text-sm text-slate-300 font-light">
              Giáo trình DK English Idioms gồm tổng cộng 54 Units toàn diện. Đội ngũ học thuật NextBand đang lần lượt số hóa đầy đủ âm thanh, nghiên cứu từ nguyên học và bài tập tương tác cho từng unit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
            {UPCOMING_UNITS.map((u) => (
              <div
                key={u.id}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5 text-xs text-slate-300 opacity-80"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-amber-300 font-bold text-[11px]">Unit {u.unit_number_str}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300 font-medium">
                    Đang số hóa
                  </span>
                </div>
                <div className="font-bold text-white text-sm">{u.title_en}</div>
                <div className="text-[11px] text-slate-400">{u.title_vi}</div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: METHODOLOGY FOOTER */}
        <section className="bg-white rounded-3xl border border-[#EAE3D9] p-8 sm:p-10 space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold text-[#0369a1] uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" /> Phương pháp độc quyền NextBand
            </span>
            <h3 className="text-2xl font-black text-[#002147]">Tại sao phương pháp này giúp bạn nhớ vĩnh viễn?</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-800 font-bold flex items-center justify-center text-sm">
                1
              </div>
              <h4 className="font-bold text-sm text-slate-900">Bối cảnh trực quan & Audio Mỹ</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Học qua câu ngữ cảnh thực tế với audio chuẩn giọng Mỹ, giúp khắc sâu phát âm, ngữ điệu và trọng âm tự nhiên.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-800 font-bold flex items-center justify-center text-sm">
                2
              </div>
              <h4 className="font-bold text-sm text-slate-900">Từ nguyên học (Etymology)</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Không học vẹt. Khám phá câu chuyện lịch sử và cơ chế ẩn dụ đằng sau thành ngữ để hiểu bản chất sâu xa nhất.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-800 font-bold flex items-center justify-center text-sm">
                3
              </div>
              <h4 className="font-bold text-sm text-slate-900">Phản xạ qua 5 bài tập tương tác</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Chuyển hóa từ vựng thụ động thành chủ động với các dạng bài nối nghĩa, điền chỗ trống, trắc nghiệm ngữ cảnh và tình huống thực tế.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
