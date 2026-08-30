export type HuyenCoState =
  | "IDLE"           // Thở tĩnh nhẹ nhàng
  | "CURIOUS"        // Tò mò lắng nghe khi học viên bôi đen từ
  | "THINKING"       // Suy tư/phân tích (mắt/ánh sáng chuyển động nhẹ)
  | "UNDERSTANDING"  // Gật đầu nhẹ khi kết quả sẵn sàng
  | "EXPLAINING"     // Cử chỉ diễn giải (khi mở 🧠 Hình dung)
  | "ENCOURAGING"    // Micro-expression động viên khi bấm +Lưu
  | "REMEMBERED";    // Nhận ra người quen khi gặp lại từ cũ

export interface HuyenCoProps {
  state?: HuyenCoState;
  size?: number | "16" | "32" | "48" | "80" | "160";
  className?: string;
}
