# 🎓 NextBand — Nền Tảng Khảo Thí & Luyện Thi IELTS Trực Tuyến

Chào mừng đến với hệ thống **NextBand**. Dự án được xây dựng theo kiến trúc hiện đại, phân tầng rõ ràng nhằm đảm bảo hiệu năng cao, bảo mật bài thi và trải nghiệm làm bài mượt mà cho học viên.

---

## ⚡ Bắt Đầu Nhanh (Quick Start)

### 1. Cài đặt môi trường
Đảm bảo bạn đã cài đặt **Node.js 20+** và **npm**:

```bash
# Cài đặt toàn bộ dependencies
npm install

# Tạo file biến môi trường từ mẫu (nếu chưa có)
cp .env.test.example .env
```

### 2. Khởi chạy Local Development
Chạy cả Backend API (Fastify) và Frontend (React Vite) trong một câu lệnh:

```bash
npm run dev
```
- **Frontend App:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:3001](http://localhost:3001)

### 3. Kiểm tra Chuẩn Code & Kiến trúc
Trước khi tạo Pull Request, luôn chạy bộ kiểm tra toàn diện:

```bash
npm run verify
```

---

## 📘 Cẩm Nang Cho Kỹ Sư (Developer Guide)

Để giữ cho hệ thống luôn **Xanh - Sạch - Đẹp - Ổn Định Lâu Dài**, toàn bộ đội ngũ kỹ sư cần nắm vững:

👉 **[Xem ngay Cẩm Nang Phát Triển Thực Chiến (DEVELOPER_GUIDE.md)](./DEVELOPER_GUIDE.md)**  
*(Tóm tắt 4 Quy Tắc Bất Biến, sơ đồ luồng dữ liệu 1 chiều, chuẩn hóa API REST và bảo mật bài thi trong 3 phút)*

---

## 🏛️ Tài Liệu Tham Chiếu & Lịch Sử Nghiệm Thu

Nếu bạn cần tra cứu các báo cáo kiểm toán chuyên sâu hoặc lịch sử cuộc đại phẫu kỹ thuật 8 cổng (G0 đến G7):
- **Bản nghiệm thu kiến trúc tổng thể:** [`docs/FINAL_ARCHITECTURE_ATTESTATION.md`](./docs/FINAL_ARCHITECTURE_ATTESTATION.md)
- **Chi tiết các cổng kiểm toán:** [`docs/archive/`](./docs/archive/)
- **Hiến pháp gốc (Tham khảo lịch sử):** [`Architecture_Constitution.md`](./Architecture_Constitution.md)
