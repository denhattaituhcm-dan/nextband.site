/**
 * Huyền Cơ Lão Nhân — Premium 3D Portrait Mascot System
 * Design Philosophy: 70% Academic + 20% Oriental Fantasy + 10% Gamification
 */

export type HuyenCoState =
  | "NEUTRAL"        // Avatar mặc định / Trầm tĩnh, giám hộ không gian học tập
  | "THINKING"       // Suy tư, phân tích bài làm / Gợi ý logic
  | "ENCOURAGING"    // Khích lệ, gật đầu công nhận nỗ lực / Lưu từ vựng
  | "TEACHING"       // Giảng giải kiến thức chuyên sâu (In-Context / Masterclass)
  | "CELEBRATION"    // Chúc mừng thăng hạng band điểm / Hoàn thành chặng
  | "CONCERNED"      // Lo lắng, nhắc nhở ân cần khi học viên bỏ nhịp
  | "WARNING"        // Cảnh báo bài tập quá hạn / Đứt chuỗi streak
  | "LEGENDARY"      // Thành tựu danh dự tối cao / Chinh phục Rank 6.5+
  // Backward compatibility aliases
  | "IDLE"
  | "CURIOUS"
  | "UNDERSTANDING"
  | "EXPLAINING"
  | "REMEMBERED";

export interface HuyenCoProps {
  state?: HuyenCoState;
  /** Kích thước hiển thị (px): Avatar thường dùng 48/64, Popup dùng 128/256 */
  size?: number | "48" | "64" | "128" | "160" | "256";
  variant?: "avatar" | "portrait" | "inline" | "launcher";
  showBadgeRing?: boolean;
  className?: string;
  altText?: string;
}

export interface HuyenCoStateMetadata {
  label: string;
  context: string;
  voiceTone: string;
  assetKey: string;
}

export const HUYEN_CO_STATE_MAP: Record<HuyenCoState, HuyenCoStateMetadata> = {
  NEUTRAL: {
    label: "Tĩnh Lặng",
    context: "Trạng thái mặc định trên thanh điều hướng và giao diện chính",
    voiceTone: "Trầm tĩnh, ôn hòa, sẵn sàng trợ giúp",
    assetKey: "neutral",
  },
  IDLE: {
    label: "Tĩnh Lặng",
    context: "Trạng thái mặc định",
    voiceTone: "Trầm tĩnh, ôn hòa",
    assetKey: "neutral",
  },
  THINKING: {
    label: "Trầm Tư",
    context: "Đang phân tích bài nộp hoặc nạp dữ liệu từ điển ngữ cảnh",
    voiceTone: "Tập trung, cẩn trọng, suy ngẫm logic",
    assetKey: "thinking",
  },
  CURIOUS: {
    label: "Lắng Nghe",
    context: "Khi học viên tương tác tra cứu một khái niệm mới",
    voiceTone: "Cởi mở, chú tâm",
    assetKey: "thinking",
  },
  UNDERSTANDING: {
    label: "Thấu Suốt",
    context: "Khi dữ liệu phân tích đã sẵn sàng",
    voiceTone: "Sáng tỏ, mạch lạc",
    assetKey: "teaching",
  },
  ENCOURAGING: {
    label: "Khích Lệ",
    context: "Học viên hoàn thành bài tập hoặc lưu lại cụm từ vựng",
    voiceTone: "Ấm áp, tán thưởng, truyền cảm hứng",
    assetKey: "encouraging",
  },
  REMEMBERED: {
    label: "Tương Ngộ",
    context: "Khi gặp lại từ vựng hoặc kiến thức cũ trong lộ trình",
    voiceTone: "Thân tình, ghi nhận sự tiến bộ",
    assetKey: "encouraging",
  },
  TEACHING: {
    label: "Khai Tri Thức",
    context: "Hiển thị mô hình tư duy (Mental Model) hoặc giảng giải chi tiết",
    voiceTone: "Uyên bác, sáng rõ, mang tính sư phạm cao",
    assetKey: "teaching",
  },
  EXPLAINING: {
    label: "Khai Tri Thức",
    context: "Giảng giải chi tiết",
    voiceTone: "Uyên bác, sư phạm",
    assetKey: "teaching",
  },
  CELEBRATION: {
    label: "Tôn Vinh",
    context: "Học viên thăng hạng, đạt điểm cao hoặc nhận học bổng Kỷ Luật",
    voiceTone: "Hào sảng, chúc mừng, tự hào",
    assetKey: "celebration",
  },
  CONCERNED: {
    label: "Ân Cần",
    context: "Học viên lơ là luyện tập hoặc đứt mạch chuỗi học tập",
    voiceTone: "Thấu hiểu, nhắc nhở giữ vững nhịp độ",
    assetKey: "concerned",
  },
  WARNING: {
    label: "Nghiêm Kỷ",
    context: "Bài tập quá hạn hoặc vi phạm quy chế chuyên cần",
    voiceTone: "Nghiêm nghị, chuẩn mực, răn dạy kỷ luật",
    assetKey: "warning",
  },
  LEGENDARY: {
    label: "Đỉnh Phong",
    context: "Đạt thành tích xuất sắc nhất khóa hoặc đạt chuẩn đầu ra 6.5+",
    voiceTone: "Trang trọng, vinh danh đỉnh cao",
    assetKey: "legendary",
  },
};
