/**
 * ARIS Seasonal Layer - Tet Preset Theme & Copywriting
 * Brand Voice: Viện Trưởng Huyền Cơ Lão Nhân
 */

export const TET_THEME = {
  colors: {
    primaryRed: "#dc2626", // Crimson Red
    goldAccent: "#f59e0b", // Amber Gold
    goldLight: "#fef3c7",
    goldBorder: "#fcd34d",
    bgWarm: "bg-gradient-to-r from-red-500/10 via-amber-500/5 to-transparent",
  },
  proverbs: [
    "Khai bút đầu xuân — Mở lộc tri thức, một chữ cũng là tiến bộ.",
    "Xuân đáo bình an tài lợi tiến — Mài giũa bút nghiên bứt phá Band.",
    "Kỷ luật đầu năm, thành quả cuối năm — Chúc em năm mới đỗ đạt như ý.",
    "Năm mới vạn sự hanh thông — Khai bút vững vàng, IELTS 7.5+ trong tầm tay.",
    "Đầu xuân khai bút đắc lộc — Mỗi bài tập là một bước chuyển mình.",
  ],
  getRandomProverb: () => {
    const idx = Math.floor(Math.random() * TET_THEME.proverbs.length);
    return TET_THEME.proverbs[idx];
  },
};
