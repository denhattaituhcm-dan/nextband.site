/**
 * Huyền Cơ Lão Nhân — Premium 3D Portrait Mascot System
 * Design Philosophy: 70% Academic + 20% Oriental Fantasy + 10% Gamification
 */

export type HuyenCoState =
  | "NEUTRAL"        // Trầm tĩnh, giám hộ / Phe phẩy quạt chậm
  | "IDLE"           // Nghỉ ngơi / Phe phẩy quạt
  | "THINKING"       // Suy tư, gợi ý logic / Đưa quạt lên, hơi hạ mắt
  | "CURIOUS"        // Tra cứu, lắng nghe / Nghiêng nhẹ quạt
  | "UNDERSTANDING"  // Thấu suốt / Khẽ gật đầu, đóng quạt
  | "ENCOURAGING"    // Khích lệ, tán thưởng / Mở quạt một nhịp
  | "TEACHING"       // Khai tri thức, giảng bài / Mở rộng quạt, phong thái uyên bác
  | "EXPLAINING"     // Giảng giải chi tiết
  | "CELEBRATION"    // Tôn vinh, vinh danh / Vung quạt rạng rỡ, hào sảng
  | "CONCERNED"      // Ân cần, nhắc nhở / Khép quạt, nhìn thẳng
  | "WARNING"        // Nghiêm kỷ, răn dạy / Thu quạt nghiêm nghị
  | "LEGENDARY"      // Đỉnh phong 6.5+ / Thần thái xuất thần
  | "RECOGNITION"    // Tương ngộ (Memory Layer) / Hơi nhướng mắt, khẽ gật đầu
  | "REMEMBERED";

export interface HuyenCoProps {
  state?: HuyenCoState;
  /** Kích thước hiển thị (px): Avatar thường dùng 32/48/64, Popup/Homework dùng 120/160/256 */
  size?: number | string;
  variant?: "avatar" | "portrait" | "inline" | "launcher";
  /** Chế độ hiển thị: webm (animated 3D video), image (high-res 3D concept), webgl (realtime 3D) */
  renderMode?: "auto" | "webm" | "image" | "webgl";
  showBadgeRing?: boolean;
  className?: string;
  altText?: string;
}

export interface HuyenCoStateMetadata {
  label: string;
  context: string;
  voiceTone: string;
  assetKey: string;
  fanGesture: string; // Ngôn ngữ cơ thể của chiếc Quạt Signature
}

export const HUYEN_CO_STATE_MAP: Record<HuyenCoState, HuyenCoStateMetadata> = {
  NEUTRAL: {
    label: "Tĩnh Lặng",
    context: "Trạng thái mặc định trên thanh điều hướng và giao diện chính",
    voiceTone: "Trầm tĩnh, ôn hòa, sẵn sàng trợ giúp",
    assetKey: "neutral",
    fanGesture: "Phe phẩy quạt chậm rãi, ung dung",
  },
  IDLE: {
    label: "Tĩnh Lặng",
    context: "Trạng thái nghỉ ngơi / đồng hành nhịp nhàng",
    voiceTone: "Trầm tĩnh, ôn hòa",
    assetKey: "neutral",
    fanGesture: "Phe phẩy quạt nhẹ, nhịp thở thư thái",
  },
  THINKING: {
    label: "Trầm Tư",
    context: "Đang phân tích bài nộp hoặc gợi ý logic",
    voiceTone: "Tập trung, cẩn trọng, suy ngẫm",
    assetKey: "thinking",
    fanGesture: "Đưa quạt lên ngang ngực, hơi hạ mắt trầm tư",
  },
  CURIOUS: {
    label: "Lắng Nghe",
    context: "Khi học viên tra cứu khái niệm mới",
    voiceTone: "Cởi mở, chú tâm",
    assetKey: "thinking",
    fanGesture: "Nghiêng nhẹ quạt, ánh mắt hướng về học viên",
  },
  UNDERSTANDING: {
    label: "Thấu Suốt",
    context: "Khi dữ liệu phân tích đã sẵn sàng",
    voiceTone: "Sáng tỏ, mạch lạc",
    assetKey: "understanding",
    fanGesture: "Khẽ gật đầu, khép quạt dứt khoát",
  },
  ENCOURAGING: {
    label: "Khích Lệ",
    context: "Học viên hoàn thành bài tập hoặc lưu lại từ vựng",
    voiceTone: "Ấm áp, tán thưởng, truyền cảm hứng",
    assetKey: "encouraging",
    fanGesture: "Mở quạt một nhịp dứt khoát, ánh mắt khích lệ",
  },
  REMEMBERED: {
    label: "Tương Ngộ",
    context: "Khi gặp lại kiến thức cũ trong lộ trình",
    voiceTone: "Thân tình, ghi nhận sự tiến bộ",
    assetKey: "encouraging",
    fanGesture: "Vẫy nhẹ quạt thân tình",
  },
  TEACHING: {
    label: "Khai Tri Thức",
    context: "Giảng giải mô hình tư duy hoặc In-Context Lexicon",
    voiceTone: "Uyên bác, sáng rõ, sư phạm cao",
    assetKey: "teaching",
    fanGesture: "Mở rộng quạt hướng về nội dung bài giảng",
  },
  EXPLAINING: {
    label: "Khai Tri Thức",
    context: "Giảng giải chi tiết bài tập",
    voiceTone: "Uyên bác, sư phạm",
    assetKey: "teaching",
    fanGesture: "Chỉ quạt dẫn dắt cấu trúc bài học",
  },
  CELEBRATION: {
    label: "Tôn Vinh",
    context: "Học viên thăng hạng, hoàn thành milestone",
    voiceTone: "Hào sảng, chúc mừng, tự hào",
    assetKey: "celebration",
    fanGesture: "Vung quạt rạng rỡ, thần thái đỉnh cao",
  },
  CONCERNED: {
    label: "Ân Cần",
    context: "Học viên lơ là luyện tập hoặc đứt mạch chuỗi",
    voiceTone: "Thấu hiểu, nhắc nhở giữ nhịp",
    assetKey: "concerned",
    fanGesture: "Khép quạt, nhìn thẳng ân cần nhắc nhở",
  },
  WARNING: {
    label: "Nghiêm Kỷ",
    context: "Bài tập quá hạn hoặc vi phạm chuyên cần",
    voiceTone: "Nghiêm nghị, chuẩn mực kỷ luật",
    assetKey: "warning",
    fanGesture: "Thu quạt nghiêm nghị, ánh mắt cương trực",
  },
  RECOGNITION: {
    label: "Tương Ngộ",
    context: "Hệ thống nhận diện từ vựng/kiến thức đã gặp trong quá khứ (Memory Layer)",
    voiceTone: "Trầm ấm, ghi nhận, kết nối hành trình học tập",
    assetKey: "recognition",
    fanGesture: "Hơi nhướng mắt, khẽ gật đầu, phe phẩy quạt chào đón",
  },
  LEGENDARY: {
    label: "Đỉnh Phong",
    context: "Đạt thành tích xuất sắc nhất khóa hoặc Target 6.5+",
    voiceTone: "Trang trọng, vinh danh đỉnh cao",
    assetKey: "legendary",
    fanGesture: "Cầm quạt bái chào vinh danh đệ tử",
  },
};
