import {
  ReadingCase,
  ReadingLevelTier,
  ReadingTopicFilter,
} from "@/features/reading/types";
import { CASE_001 } from "./case001";
import { CASE_002 } from "./case002";
import { CASE_003 } from "./case003";
import { CASE_004 } from "./case004";
import { CASE_005 } from "./case005";
import { CASE_006 } from "./case006";
import { CASE_007 } from "./case007";
import { CASE_008 } from "./case008";
import { CASE_009 } from "./case009";
import { CASE_010 } from "./case010";
import { CASE_011 } from "./case011";
import { CASE_012 } from "./case012";
import { CASE_013 } from "./case013";
import { CASE_014 } from "./case014";
import { CASE_015 } from "./case015";

export const ALL_READING_CASES: Record<string, ReadingCase> = {
  "case-001": CASE_001,
  "case-002": CASE_002,
  "case-003": CASE_003,
  "case-004": CASE_004,
  "case-005": CASE_005,
  "case-006": CASE_006,
  "case-007": CASE_007,
  "case-008": CASE_008,
  "case-009": CASE_009,
  "case-010": CASE_010,
  "case-011": CASE_011,
  "case-012": CASE_012,
  "case-013": CASE_013,
  "case-014": CASE_014,
  "case-015": CASE_015,
};

export interface ReadingCaseCatalogItem {
  id: string;
  readingNumber: string;
  titleVi: string;
  titleEn: string;
  summaryVi?: string;
  topics: Array<Exclude<ReadingTopicFilter, "all">>;
  badgeCategory: string;
  publication: string;
  publicationMonogram: string;
  publicationBadgeVariant?: "light" | "red" | "amber" | "teal" | "gold";
  imageUrl: string;
  imageAlt: string;
  displayReadTime: string;
  highlightMeta: string;
  subMeta?: string;
  accentColor: string;
  ieltsBand: number;
  cefrLabel: "B2" | "C1" | "C2";
  levelTier: Exclude<ReadingLevelTier, "all">;
}

export function getLevelTierForBand(band: number): Exclude<ReadingLevelTier, "all"> {
  if (band < 7.0) return "foundation";
  if (band < 8.0) return "c1";
  return "c2";
}

export function getCefrLabelForBand(band: number): "B2" | "C1" | "C2" {
  if (band <= 6.0) return "B2";
  if (band < 8.0) return "C1";
  return "C2";
}

export const READING_LEVEL_TIERS: Array<{
  id: ReadingLevelTier;
  label: string;
  shortLabel: string;
  description: string;
}> = [
  {
    id: "all",
    label: "Tất cả trình độ",
    shortLabel: "Tất cả",
    description: "Toàn bộ 15 bài đọc học thuật tuyển chọn",
  },
  {
    id: "foundation",
    label: "Band 5.0–6.0 · B2 Nền tảng",
    shortLabel: "B2 · Band 5.0–6.0",
    description: "Khởi động phản xạ đọc hiểu và phân tích dẫn chứng",
  },
  {
    id: "c1",
    label: "Band 7.5 · C1 Chuyên sâu",
    shortLabel: "C1 · Band 7.5",
    description: "Văn bản học thuật đa chiều (The Guardian, The Conversation, NatGeo)",
  },
  {
    id: "c2",
    label: "Band 8.0+ · C2 Tinh hoa",
    shortLabel: "C2 · Band 8.0+",
    description: "Lập luận tầng sâu, kinh tế vĩ mô & khoa học (The Economist, NatGeo)",
  },
];

export const READING_TOPICS: Array<{
  id: ReadingTopicFilter;
  label: string;
}> = [
  { id: "all", label: "Tất cả chủ đề" },
  { id: "mindset", label: "Phát triển bản thân" },
  { id: "science", label: "Khoa học & Trái đất" },
  { id: "tech", label: "Công nghệ & AI" },
  { id: "education", label: "Giáo dục & Đọc sâu" },
  { id: "society", label: "Xã hội & Tâm lý" },
  { id: "economics", label: "Kinh tế & Toàn cầu hóa" },
];

interface RawCatalogSeed {
  id: string;
  readingNumber: string;
  titleVi: string;
  summaryVi?: string;
  topics: Array<Exclude<ReadingTopicFilter, "all">>;
  badgeCategory: string;
  publication: string;
  publicationMonogram: string;
  publicationBadgeVariant?: "light" | "red" | "amber" | "teal" | "gold";
  imageUrl: string;
  imageAlt: string;
  displayReadTime: string;
  highlightMeta: string;
  subMeta?: string;
  accentColor: string;
}

const CATALOG_SEEDS: RawCatalogSeed[] = [
  {
    id: "case-002",
    readingNumber: "Reading #02",
    titleVi: "Bài #02: Kỹ Năng Đòn Bẩy Của Warren Buffett Trong Kỷ Nguyên AI",
    topics: ["mindset"],
    badgeCategory: "Phát triển bản thân",
    publication: "Fast Company",
    publicationMonogram: "FC",
    publicationBadgeVariant: "light",
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1000&auto=format&fit=crop&q=80",
    imageAlt: "Warren Buffett Strategy",
    displayReadTime: "5 min read",
    highlightMeta: "14 từ vựng trọng tâm",
    accentColor: "#C86D51",
  },
  {
    id: "case-001",
    readingNumber: "Reading #01",
    titleVi: "Bài #01: Bí Ẩn 8 Triệu Mét Khối Nước Biến Mất Trong 90 Phút",
    topics: ["science"],
    badgeCategory: "Khám phá Địa lý",
    publication: "Science Alert",
    publicationMonogram: "SA",
    publicationBadgeVariant: "light",
    imageUrl: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?w=1000&auto=format&fit=crop&q=80",
    imageAlt: "Greenland Glacier Lake",
    displayReadTime: "4 min read",
    highlightMeta: "18 thuật ngữ địa lý",
    accentColor: "#4B799E",
  },
  {
    id: "case-003",
    readingNumber: "Reading #03",
    titleVi: "Bài #03: Nghịch Lý AI Tạo Sinh: Xáo Trộn Trí Tuệ & Năng Lực Con Người",
    topics: ["tech"],
    badgeCategory: "Công nghệ & Xã hội",
    publication: "The Guardian",
    publicationMonogram: "TG",
    publicationBadgeVariant: "light",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80",
    imageAlt: "Generative AI Paradox",
    displayReadTime: "6 min read",
    highlightMeta: "IELTS Band 7.5+",
    accentColor: "#6B46C1",
  },
  {
    id: "case-004",
    readingNumber: "Reading #04",
    titleVi: "Bài #04: Ảo Tưởng EdTech: Lớp Học Màn Hình & Sự Xói Mòn Của Đọc Sâu",
    topics: ["education"],
    badgeCategory: "Giáo dục & Đọc sâu",
    publication: "The Guardian",
    publicationMonogram: "TG",
    publicationBadgeVariant: "light",
    imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1000&auto=format&fit=crop&q=80",
    imageAlt: "The EdTech Delusion & Deep Reading",
    displayReadTime: "5 min read",
    highlightMeta: "IELTS Band 7.5+",
    subMeta: "Phê phán sư phạm",
    accentColor: "#1E6091",
  },
  {
    id: "case-005",
    readingNumber: "Reading #05",
    titleVi: "Bài #05: Ảo Tưởng Công Nghệ Xanh: Vì Sao Đổi Mới Kỹ Thuật Không Đủ Cứu Trái Đất",
    topics: ["science"],
    badgeCategory: "Môi trường & Sinh thái",
    publication: "The Guardian",
    publicationMonogram: "TG",
    publicationBadgeVariant: "light",
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1000&auto=format&fit=crop&q=80",
    imageAlt: "The Techno-Fix Myth & Planetary Boundaries",
    displayReadTime: "6 min read",
    highlightMeta: "IELTS Band 7.5+",
    subMeta: "Kinh tế sinh thái",
    accentColor: "#2D6A4F",
  },
  {
    id: "case-006",
    readingNumber: "Reading #06",
    titleVi: "Bài #06: Đại Dịch Cô Đơn Số: Vòng Lặp Dopamine & Sự Tan Rã Của Cộng Đồng",
    topics: ["society"],
    badgeCategory: "Xã hội & Tâm lý",
    publication: "The Guardian",
    publicationMonogram: "TG",
    publicationBadgeVariant: "light",
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1000&auto=format&fit=crop&q=80",
    imageAlt: "The Hyperconnected Loneliness Epidemic",
    displayReadTime: "6 min read",
    highlightMeta: "IELTS Band 7.5+",
    subMeta: "Tâm lý xã hội học",
    accentColor: "#B85A3A",
  },
  {
    id: "case-007",
    readingNumber: "Reading #07",
    titleVi: "Bài #07: Mùa Đông Nhân Khẩu Học: Lao Động Teo Tóp & Khủng Hoảng Hưu Trí Toàn Cầu",
    summaryVi:
      "Tỷ lệ sinh sụt giảm nghiêm trọng đang làm sụp đổ mô hình lương hưu Pay-As-You-Go của phương Tây. Phân tích kinh tế vĩ mô sắc bén từ The Economist về 'bộ ba bất khả thi' của an sinh xã hội và cách khai phóng 'cổ tức bạc' (Silver Dividend).",
    topics: ["economics", "society"],
    badgeCategory: "Kinh tế vĩ mô & Dân số",
    publication: "The Economist",
    publicationMonogram: "TE",
    publicationBadgeVariant: "red",
    imageUrl: "https://images.unsplash.com/photo-1516307365426-bea591f05011?w=1000&auto=format&fit=crop&q=80",
    imageAlt: "Demographic Winter & Pension Crisis",
    displayReadTime: "6 min read",
    highlightMeta: "IELTS Band 8.0",
    subMeta: "Phân tích tài khóa",
    accentColor: "#C53030",
  },
  {
    id: "case-008",
    readingNumber: "Reading #08",
    titleVi: "Bài #08: Cái Bẫy Phi Toàn Cầu Hóa: Vũ Khí Hóa Chuỗi Cung Ứng & Cái Giá Của Tự Cung Tự Cấp",
    summaryVi:
      "Làn sóng 'Friend-shoring' và trợ cấp bảo hộ chất bán dẫn có thực sự giúp các cường quốc an toàn, hay chỉ tạo ra lạm phát cấu trúc và làm suy thoái năng suất? Bóc tách góc nhìn kinh tế tự do sắc lẹm từ The Economist.",
    topics: ["economics"],
    badgeCategory: "Địa kinh tế & Chuỗi cung ứng",
    publication: "The Economist",
    publicationMonogram: "TE",
    publicationBadgeVariant: "red",
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1000&auto=format&fit=crop&q=80",
    imageAlt: "Deglobalisation & Supply Chains",
    displayReadTime: "6 min read",
    highlightMeta: "IELTS Band 8.0",
    subMeta: "Thương mại quốc tế",
    accentColor: "#2B6CB0",
  },
  {
    id: "case-009",
    readingNumber: "Reading #09",
    titleVi: "Bài #09: Não Bộ 60 Giây: Thuật Toán Video Ngắn Đang Tái Lập Trình Sự Tập Trung Như Thế Nào?",
    summaryVi:
      "Lướt TikTok và Reels liên tục tác động ra sao đến vỏ não trước trán đang phát triển của người trẻ? Bóc tách góc nhìn khoa học thần kinh về hội chứng 'Continuous Partial Attention' và cái bẫy đa nhiệm số từ The Conversation.",
    topics: ["tech", "society"],
    badgeCategory: "Khoa học não bộ & MXH",
    publication: "The Conversation",
    publicationMonogram: "TC",
    publicationBadgeVariant: "amber",
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1000&auto=format&fit=crop&q=80",
    imageAlt: "The 60-Second Brain & Video Algorithms",
    displayReadTime: "5 min read",
    highlightMeta: "IELTS Band 7.5+",
    subMeta: "Thần kinh học hành vi",
    accentColor: "#D97706",
  },
  {
    id: "case-010",
    readingNumber: "Reading #10",
    titleVi: "Bài #10: Sự Biến Mất Của Ngôi Nhà Đầu Tiên: Thế Hệ Đi Thuê & Cái Bẫy Cấu Trúc Bất Động Sản",
    summaryVi:
      "Vì sao giới trẻ ngày nay không thể mua nhà dù làm việc chăm chỉ hơn các thế hệ trước? Phân tích sắc sảo từ các nhà xã hội học đô thị về hiện tượng 'Tài chính hóa nhà ở' và cuộc khủng hoảng sinh sản lan rộng từ gánh nặng tiền thuê nhà.",
    topics: ["economics", "society"],
    badgeCategory: "Quy hoạch đô thị & Bất động sản",
    publication: "The Conversation",
    publicationMonogram: "TC",
    publicationBadgeVariant: "teal",
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1000&auto=format&fit=crop&q=80",
    imageAlt: "The Death of the Starter Home & Generation Rent",
    displayReadTime: "6 min read",
    highlightMeta: "IELTS Band 7.5+",
    subMeta: "Xã hội học đô thị",
    accentColor: "#0D9488",
  },
  {
    id: "case-011",
    readingNumber: "Reading #11",
    titleVi: "Bài #11: Đại Dương Vùng Vô Quang: Sinh Vật Kỳ Dị Vùng Hadal & Tranh Cãi Khai Thác Đáy Biển",
    summaryVi:
      "Xuống độ sâu hơn 6.000 mét nơi bóng tối vĩnh cửu và áp suất nghiền nát tàu ngầm, sự sống vẫn phát triển kỳ diệu nhờ hóa tổng hợp (chemosynthesis). Nhưng liệu cơn khát kim loại cho pin xe điện có hủy diệt thế giới sơ khai này?",
    topics: ["science"],
    badgeCategory: "Sinh vật biển & Khám phá",
    publication: "National Geographic",
    publicationMonogram: "NG",
    publicationBadgeVariant: "gold",
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1000&auto=format&fit=crop&q=80",
    imageAlt: "Alien Oceans & Hadal Zone",
    displayReadTime: "6 min read",
    highlightMeta: "IELTS Band 7.5+",
    subMeta: "Hải dương học cực hạn",
    accentColor: "#0284C7",
  },
  {
    id: "case-012",
    readingNumber: "Reading #12",
    titleVi: "Bài #12: Tia Laser Dưới Tán Rừng Già: Công Nghệ LiDAR Viết Lại Lịch Sử Văn Minh Cổ Đại",
    summaryVi:
      "Bằng cách bắn hàng triệu xung laser xuyên qua rừng rậm Guatemala, công nghệ LiDAR đã bóc tách lớp lá cây để hé lộ hơn 60.000 công trình cổ và mạng lưới cao tốc đá nối liền siêu đô thị Maya, làm đảo lộn hoàn toàn nhận thức lịch sử thế giới.",
    topics: ["science", "tech"],
    badgeCategory: "Khảo cổ học & Viễn thám",
    publication: "National Geographic",
    publicationMonogram: "NG",
    publicationBadgeVariant: "gold",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1000&auto=format&fit=crop&q=80",
    imageAlt: "Lasers Beneath the Canopy & Maya Archaeology",
    displayReadTime: "6 min read",
    highlightMeta: "IELTS Band 7.5+",
    subMeta: "Khảo cổ học công nghệ cao",
    accentColor: "#15803D",
  },
  {
    id: "case-013",
    readingNumber: "Reading #13",
    titleVi: "Bài #13: Nghịch Lý Dã Hóa: Thú Ăn Thịt Đầu Chuỗi, Dòng Chảy Sinh Thái & Sinh Kế Nông Dân",
    summaryVi:
      "Hồi sinh loài sói và gấu xám giúp phục hồi dòng chảy sông ngòi và thảm thực vật qua hiệu ứng 'Trophic Cascades'. Nhưng làm thế nào để giải quyết xung đột gay gắt khi thú săn mồi đe dọa đàn cừu của người nông dân vùng nông thôn?",
    topics: ["science", "society"],
    badgeCategory: "Động vật học & Bảo tồn",
    publication: "National Geographic",
    publicationMonogram: "NG",
    publicationBadgeVariant: "gold",
    imageUrl: "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?w=1000&auto=format&fit=crop&q=80",
    imageAlt: "The Rewilding Paradox & Apex Predators",
    displayReadTime: "7 min read",
    highlightMeta: "IELTS Band 8.0+",
    subMeta: "Sinh thái học quần thể",
    accentColor: "#16A34A",
  },
  {
    id: "case-014",
    readingNumber: "Reading #14",
    titleVi: "Bài #14: Thế Giới Kỳ Diệu Của Loài Nấm: Sinh Vật Xâm Lấn, Hệ Nấm Mycobiome & Tương Lai Da Sinh Học",
    summaryVi:
      "Từ hiểm họa nấm tử thần xâm thực rừng sồi California đến khám phá chấn động về hệ nấm nội sinh (mycobiome) trong khối u ung thư, và cuộc cách mạng thời trang tuần hoàn từ sợi nấm (mycotextiles) trên tạp chí National Geographic Tháng 4/2024.",
    topics: ["science", "tech"],
    badgeCategory: "Công nghệ sinh học & Mycobiome",
    publication: "National Geographic",
    publicationMonogram: "NG",
    publicationBadgeVariant: "gold",
    imageUrl: "https://images.unsplash.com/photo-1546842931-886c185b4c8c?w=1000&auto=format&fit=crop&q=80",
    imageAlt: "The Wondrous World of Fungi & Mycotextiles",
    displayReadTime: "8 min read",
    highlightMeta: "IELTS Band 8.0+",
    subMeta: "Khoa học nấm & Vật liệu sống",
    accentColor: "#854D0E",
  },
  {
    id: "case-015",
    readingNumber: "Reading #15",
    titleVi: "Bài #15: Kiệt Tác Tranh Đá Huqoq: Khảo Cổ Học Giáo Đường Cổ & Bản Lĩnh Kiên Cường Vùng Galilee",
    summaryVi:
      "Khai quật giáo đường Do Thái 1.600 năm tuổi tại Huqoq hé lộ những bức tranh khảm đá (tesserae) vô giá về Samson, tháp Babel và cuộc gặp gỡ bí ẩn với Alexander Đại đế, đảo ngược hoàn toàn quan niệm về sự suy tàn dưới thời Byzantine.",
    topics: ["society", "science"],
    badgeCategory: "Khảo cổ học & Nghệ thuật Mosaic",
    publication: "National Geographic",
    publicationMonogram: "NG",
    publicationBadgeVariant: "gold",
    imageUrl: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=1000&auto=format&fit=crop&q=80",
    imageAlt: "Surprising Scenes in Stone & Huqoq Mosaics",
    displayReadTime: "8 min read",
    highlightMeta: "IELTS Band 8.0+",
    subMeta: "Văn minh cổ đại & Lịch sử",
    accentColor: "#B45309",
  },
];

export const READING_CASE_CATALOG: ReadingCaseCatalogItem[] = CATALOG_SEEDS.map((seed) => {
  const caseObj = ALL_READING_CASES[seed.id];
  const ieltsBand = caseObj ? caseObj.level.ielts_band : 7.5;
  return {
    ...seed,
    titleEn: caseObj?.title ?? seed.titleVi,
    ieltsBand,
    cefrLabel: getCefrLabelForBand(ieltsBand),
    levelTier: getLevelTierForBand(ieltsBand),
  };
});

export function getRecommendedNextCases(
  currentCaseId: string,
  readCaseIds?: Set<string>,
  limit = 3
): ReadingCaseCatalogItem[] {
  const current = READING_CASE_CATALOG.find((item) => item.id === currentCaseId);
  const candidates = READING_CASE_CATALOG.filter((item) => item.id !== currentCaseId);

  const scored = candidates.map((item, idx) => {
    let score = 0;
    const isUnread = !readCaseIds?.has(item.id);
    if (isUnread) score += 100;

    if (current) {
      const sharedTopic = item.topics.some((t) => current.topics.includes(t));
      if (sharedTopic) score += 30;
      if (item.levelTier === current.levelTier) score += 15;
      else if (item.ieltsBand > current.ieltsBand) score += 10;
    }

    return { item, score, idx };
  });

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.idx - b.idx;
  });

  return scored.slice(0, limit).map((entry) => entry.item);
}
