import { SeasonalEventType } from "./types";

export interface SeasonalThemeDefinition {
  type: SeasonalEventType;
  name: string;
  subtitle: string;
  badgeLabel: string;
  icon: string;
  // Banner styling
  bannerGradient: string;
  bannerBorderColor: string;
  bannerBadgeBg: string;
  bannerBadgeText: string;
  bannerBadgeBorder: string;
  bannerActionBtnBg: string;
  bannerActionBtnText: string;
  bannerActionBtnHover: string;
  bannerActionText: string;
  bannerActionIcon: string;
  bannerWatermark: string;
  bannerDefaultTitle: string;
  bannerDefaultSubtitle: string;

  // Header Wallet Badge
  headerWalletGradient: string;
  headerWalletBorder: string;
  headerWalletIcon: string;
  headerWalletLabel: string;
  headerWalletSubColor: string;
  headerWalletAmountColor: string;

  // Homework Item Badge
  envelopeClaimedIcon: string;
  envelopeClaimedLabel: string;
  envelopeClaimedStyle: string;
  envelopeReadyIcon: string;
  envelopeReadyLabel: string;
  envelopeReadyStyle: string;
  envelopeTeaserIcon: string;
  envelopeTeaserLabel: string;
  envelopeTeaserStyle: string;
  envelopeTeaserTitle: string;

  // Corner Decoration
  cornerBranchType: "BLOSSOM" | "TEACHER_FLOWERS" | "BELL_BOOK" | "LANTERN";

  // Celebration Modal
  modalBgGradient: string;
  modalBorder: string;
  modalBadgeBg: string;
  modalBadgeText: string;
  modalBadgeBorder: string;
  modalEventTitle: string;
  modalHeadingSuccess: string;
  modalGiftIcon: string;
  modalGiftTitle: string;
  modalWisdomTitle: string;
  modalHonorBadge: string;
  proverbs: string[];
  getRandomProverb: () => string;
}

export const SEASONAL_THEMES: Record<SeasonalEventType, SeasonalThemeDefinition> = {
  TEACHERS_DAY: {
    type: "TEACHERS_DAY",
    name: "20/11 — Một Lời Tri Ân",
    subtitle: "Một Lời Tri Ân — Một Bước Trưởng Thành",
    badgeLabel: "Tháng 11 • Tri Ân Thầy Cô",
    icon: "📜",
    bannerGradient: "bg-gradient-to-r from-amber-800 via-yellow-800 to-emerald-900",
    bannerBorderColor: "border-amber-400/60",
    bannerBadgeBg: "bg-amber-400/25",
    bannerBadgeText: "text-amber-200",
    bannerBadgeBorder: "border-amber-300/40",
    bannerActionBtnBg: "bg-amber-400 hover:bg-amber-300",
    bannerActionBtnText: "text-amber-950 font-black",
    bannerActionBtnHover: "hover:bg-amber-300",
    bannerActionText: "Gửi Thư Tri Ân",
    bannerActionIcon: "📜",
    bannerWatermark: "📜",
    bannerDefaultTitle: "Một Lời Tri Ân — Một Bước Trưởng Thành",
    bannerDefaultSubtitle: "Điều em nỗ lực học hôm nay sẽ trở thành niềm tự hào của Thầy Cô ngày mai. Hoàn thành bài tập để nhận quà tri ân may mắn!",

    headerWalletGradient: "bg-gradient-to-r from-amber-700 via-yellow-600 to-emerald-700",
    headerWalletBorder: "border-amber-300/50",
    headerWalletIcon: "📜",
    headerWalletLabel: "Quỹ Tri Ân",
    headerWalletSubColor: "text-amber-100",
    headerWalletAmountColor: "text-amber-200",

    envelopeClaimedIcon: "📜",
    envelopeClaimedLabel: "Đã Nhận Tri Ân",
    envelopeClaimedStyle: "bg-amber-500/10 border-amber-400/40 text-amber-800 dark:text-amber-300",
    envelopeReadyIcon: "📜",
    envelopeReadyLabel: "Mở Thư Tri Ân",
    envelopeReadyStyle: "bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white shadow-amber-500/30 border-amber-300/60",
    envelopeTeaserIcon: "📜",
    envelopeTeaserLabel: "Nộp bài mở thư tri ân",
    envelopeTeaserStyle: "bg-amber-500/10 dark:bg-amber-950/30 border-amber-300/60 dark:border-amber-900/60 text-amber-800 dark:text-amber-300",
    envelopeTeaserTitle: "Hoàn thành và nộp bài đúng hạn để nhận quà tặng tri ân Thầy Cô",

    cornerBranchType: "TEACHER_FLOWERS",

    modalBgGradient: "bg-gradient-to-b from-amber-900 via-stone-900 to-stone-950",
    modalBorder: "border-amber-400/80",
    modalBadgeBg: "bg-amber-400/20",
    modalBadgeText: "text-amber-300",
    modalBadgeBorder: "border-amber-400/40",
    modalEventTitle: "20/11 — Tri Ân Thầy Cô",
    modalHeadingSuccess: "Mở Lá Thư Tri Ân Thành Công!",
    modalGiftIcon: "📜",
    modalGiftTitle: "Học Bổng Tri Ân Nhận Được",
    modalWisdomTitle: "Lời Nhắn Nhủ Tri Ân Thầy Cô",
    modalHonorBadge: "Bút Vàng Tri Ân",
    proverbs: [
      "Nhất tự vi sư, bán tự vi sư — Một bước tiến của em là một nụ cười của Thầy Cô.",
      "Mỗi con chữ viết tròn vẹn hôm nay là sự đền đáp xứng đáng nhất gửi đến Thầy Cô.",
      "Kính thầy mới được làm thầy — Kỷ luật mài giũa kiến thức chính là món quà vô giá.",
      "Người thầy mở ra cánh cửa, nhưng chính em là người vững bước vượt qua vũ môn.",
      "Tri ân người truyền đuốc — Nỗ lực từng ngày để vươn tới IELTS 7.5+ vững vàng.",
    ],
    getRandomProverb: function () {
      return this.proverbs[Math.floor(Math.random() * this.proverbs.length)];
    },
  },

  BACK_TO_SCHOOL: {
    type: "BACK_TO_SCHOOL",
    name: "Khai Giảng — Khởi Hành Năm Học",
    subtitle: "Khởi Hành Năm Học — Bứt Phá Band",
    badgeLabel: "Mùa Tựu Trường",
    icon: "🔔",
    bannerGradient: "bg-gradient-to-r from-blue-700 via-indigo-700 to-teal-700",
    bannerBorderColor: "border-blue-300/60",
    bannerBadgeBg: "bg-blue-400/25",
    bannerBadgeText: "text-blue-100",
    bannerBadgeBorder: "border-blue-300/40",
    bannerActionBtnBg: "bg-amber-400 hover:bg-amber-300",
    bannerActionBtnText: "text-slate-950 font-black",
    bannerActionBtnHover: "hover:bg-amber-300",
    bannerActionText: "Mở Quà Tựu Trường",
    bannerActionIcon: "🔔",
    bannerWatermark: "🔔",
    bannerDefaultTitle: "Khởi Hành Năm Học — Bứt Phá Band",
    bannerDefaultSubtitle: "Thiết lập kỷ luật ngay từ ngày đầu tựu trường để bứt phá band điểm IELTS!",

    headerWalletGradient: "bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-600",
    headerWalletBorder: "border-blue-300/50",
    headerWalletIcon: "🔔",
    headerWalletLabel: "Quỹ Tựu Trường",
    headerWalletSubColor: "text-blue-100",
    headerWalletAmountColor: "text-amber-200",

    envelopeClaimedIcon: "🔔",
    envelopeClaimedLabel: "Đã Mở Quà",
    envelopeClaimedStyle: "bg-blue-500/10 border-blue-400/40 text-blue-800 dark:text-blue-300",
    envelopeReadyIcon: "🔔",
    envelopeReadyLabel: "Mở Quà Tựu Trường",
    envelopeReadyStyle: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-500/30 border-blue-300/60",
    envelopeTeaserIcon: "🔔",
    envelopeTeaserLabel: "Nộp bài mở quà tựu trường",
    envelopeTeaserStyle: "bg-blue-500/10 dark:bg-blue-950/30 border-blue-300/60 dark:border-blue-900/60 text-blue-700 dark:text-blue-300",
    envelopeTeaserTitle: "Hoàn thành và nộp bài đúng hạn để mở quà khởi động năm học",

    cornerBranchType: "BELL_BOOK",

    modalBgGradient: "bg-gradient-to-b from-blue-950 via-indigo-950 to-slate-950",
    modalBorder: "border-blue-400/80",
    modalBadgeBg: "bg-blue-400/20",
    modalBadgeText: "text-blue-300",
    modalBadgeBorder: "border-blue-400/40",
    modalEventTitle: "Khai Giảng — Khởi Hành Năm Học",
    modalHeadingSuccess: "Mở Quà Khởi Đầu Thành Công!",
    modalGiftIcon: "🔔",
    modalGiftTitle: "Học Bổng Tựu Trường",
    modalWisdomTitle: "Lời Hiệu Triệu Đầu Năm",
    modalHonorBadge: "Huy Hiệu Khởi Hành",
    proverbs: [
      "Tiếng chuông tựu trường điểm — Khởi đầu kỷ luật, bứt phá mọi rào cản band điểm.",
      "Vạn dặm hành trình bắt đầu từ trang sách mở ra hôm nay.",
      "Năm học mới, quyết tâm mới — Giữ chuỗi làm bài đều đặn mỗi ngày.",
      "Mỗi bài tập hoàn thành đúng hạn là một viên gạch xây nền móng IELTS vững chắc.",
    ],
    getRandomProverb: function () {
      return this.proverbs[Math.floor(Math.random() * this.proverbs.length)];
    },
  },

  MID_AUTUMN: {
    type: "MID_AUTUMN",
    name: "Tết Trung Thu — Đêm Trăng Học Tập",
    subtitle: "Đêm Trăng Học Tập — Vượt Chặng Đèn Lồng",
    badgeLabel: "Trung Thu",
    icon: "🏮",
    bannerGradient: "bg-gradient-to-r from-indigo-900 via-purple-900 to-amber-700",
    bannerBorderColor: "border-amber-300/60",
    bannerBadgeBg: "bg-amber-400/25",
    bannerBadgeText: "text-amber-200",
    bannerBadgeBorder: "border-amber-300/40",
    bannerActionBtnBg: "bg-amber-400 hover:bg-amber-300",
    bannerActionBtnText: "text-amber-950 font-black",
    bannerActionBtnHover: "hover:bg-amber-300",
    bannerActionText: "Thắp Sáng Đèn Lồng",
    bannerActionIcon: "🏮",
    bannerWatermark: "🏮",
    bannerDefaultTitle: "Đêm Trăng Học Tập — Vượt Chặng Đèn Lồng",
    bannerDefaultSubtitle: "Cùng ARIS thắp sáng ước mơ IELTS dưới ánh trăng rằm tháng 8.",

    headerWalletGradient: "bg-gradient-to-r from-indigo-800 via-purple-700 to-amber-600",
    headerWalletBorder: "border-amber-300/50",
    headerWalletIcon: "🏮",
    headerWalletLabel: "Quỹ Trăng Rằm",
    headerWalletSubColor: "text-purple-100",
    headerWalletAmountColor: "text-amber-200",

    envelopeClaimedIcon: "🏮",
    envelopeClaimedLabel: "Đã Nhận Lộc Trăng",
    envelopeClaimedStyle: "bg-purple-500/10 border-purple-400/40 text-purple-800 dark:text-purple-300",
    envelopeReadyIcon: "🏮",
    envelopeReadyLabel: "Mở Đèn Lồng May Mắn",
    envelopeReadyStyle: "bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-500 hover:to-amber-500 text-white shadow-purple-500/30 border-amber-300/60",
    envelopeTeaserIcon: "🏮",
    envelopeTeaserLabel: "Nộp bài mở đèn lồng",
    envelopeTeaserStyle: "bg-purple-500/10 dark:bg-purple-950/30 border-purple-300/60 dark:border-purple-900/60 text-purple-700 dark:text-purple-300",
    envelopeTeaserTitle: "Hoàn thành và nộp bài đúng hạn để nhận quà đèn lồng trung thu",

    cornerBranchType: "LANTERN",

    modalBgGradient: "bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-950",
    modalBorder: "border-amber-400/80",
    modalBadgeBg: "bg-amber-400/20",
    modalBadgeText: "text-amber-300",
    modalBadgeBorder: "border-amber-400/40",
    modalEventTitle: "Trung Thu — Trăng Rằm Học Tập",
    modalHeadingSuccess: "Thắp Sáng Đèn Lồng Thành Công!",
    modalGiftIcon: "🏮",
    modalGiftTitle: "Học Bổng Đêm Trăng",
    modalWisdomTitle: "Lời Nhắn Nhủ Đêm Rằm",
    modalHonorBadge: "Huy Hiệu Trăng Tròn",
    proverbs: [
      "Ánh trăng rằm chiếu sáng con đường tri thức — Kiên trì ắt gặt quả ngọt.",
      "Rước đèn tri thức, thắp sáng tương lai — Chúc em học tập sáng như vầng trăng thu.",
      "Vượt chặng đèn lồng, từng bước chinh phục mục tiêu IELTS cao nhất.",
    ],
    getRandomProverb: function () {
      return this.proverbs[Math.floor(Math.random() * this.proverbs.length)];
    },
  },

  TET: {
    type: "TET",
    name: "Tết Nguyên Đán 2027",
    subtitle: "Khai Bút Đầu Xuân — Mở Lộc Tri Thức",
    badgeLabel: "Tháng Giêng • Tết Nguyên Đán",
    icon: "🌸",
    bannerGradient: "bg-gradient-to-r from-red-700 via-rose-700 to-amber-700",
    bannerBorderColor: "border-amber-300/60",
    bannerBadgeBg: "bg-amber-400/25",
    bannerBadgeText: "text-amber-200",
    bannerBadgeBorder: "border-amber-300/40",
    bannerActionBtnBg: "bg-amber-400 hover:bg-amber-300",
    bannerActionBtnText: "text-red-950 font-black",
    bannerActionBtnHover: "hover:bg-amber-300",
    bannerActionText: "Làm Bài Nhận Lộc",
    bannerActionIcon: "🧧",
    bannerWatermark: "🧧",
    bannerDefaultTitle: "Khai Bút Đầu Xuân — Mở Lộc Tri Thức",
    bannerDefaultSubtitle: "Hoàn thành bài tập đạt chuẩn để khai bút đầu năm và hái lộc may mắn!",

    headerWalletGradient: "bg-gradient-to-r from-red-600 via-rose-600 to-amber-600",
    headerWalletBorder: "border-amber-300/40",
    headerWalletIcon: "🧧",
    headerWalletLabel: "Lộc Khai Bút",
    headerWalletSubColor: "text-amber-100",
    headerWalletAmountColor: "text-amber-200",

    envelopeClaimedIcon: "🧧",
    envelopeClaimedLabel: "Đã Khai Lộc",
    envelopeClaimedStyle: "bg-amber-500/10 border-amber-400/40 text-amber-700 dark:text-amber-300",
    envelopeReadyIcon: "🧧",
    envelopeReadyLabel: "Mở Lộc Ngay",
    envelopeReadyStyle: "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-red-500/30 border-amber-300/60",
    envelopeTeaserIcon: "🧧",
    envelopeTeaserLabel: "Nộp bài để mở lộc",
    envelopeTeaserStyle: "bg-red-500/10 dark:bg-red-950/30 border-red-300/60 dark:border-red-900/60 text-red-700 dark:text-red-300",
    envelopeTeaserTitle: "Hoàn thành & nộp bài đúng hạn để mở bao lì xì này",

    cornerBranchType: "BLOSSOM",

    modalBgGradient: "bg-gradient-to-b from-red-900 via-slate-900 to-slate-950",
    modalBorder: "border-amber-400/80",
    modalBadgeBg: "bg-amber-400/20",
    modalBadgeText: "text-amber-300",
    modalBadgeBorder: "border-amber-400/40",
    modalEventTitle: "Khai Bút Đầu Xuân",
    modalHeadingSuccess: "Mở Lộc Tri Thức Thành Công!",
    modalGiftIcon: "🧧",
    modalGiftTitle: "Số Tiền Lì Xì Khai Bút",
    modalWisdomTitle: "Lời Khai Bút Của Viện Trưởng Huyền Cơ",
    modalHonorBadge: "Khai Bút Vàng",
    proverbs: [
      "Khai bút đầu xuân — Mở lộc tri thức, một chữ cũng là tiến bộ.",
      "Xuân đáo bình an tài lợi tiến — Mài giũa bút nghiên bứt phá Band.",
      "Kỷ luật đầu năm, thành quả cuối năm — Chúc em năm mới đỗ đạt như ý.",
      "Năm mới vạn sự hanh thông — Khai bút vững vàng, IELTS 7.5+ trong tầm tay.",
      "Đầu xuân khai bút đắc lộc — Mỗi bài tập là một bước chuyển mình.",
    ],
    getRandomProverb: function () {
      return this.proverbs[Math.floor(Math.random() * this.proverbs.length)];
    },
  },
};

export function getSeasonalTheme(type?: SeasonalEventType | string): SeasonalThemeDefinition {
  if (type && type in SEASONAL_THEMES) {
    return SEASONAL_THEMES[type as SeasonalEventType];
  }
  return SEASONAL_THEMES.TET;
}
