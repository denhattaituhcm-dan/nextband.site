# NEXTBAND DEVELOPER GUIDE (CẨM NANG PHÁT TRIỂN THỰC CHIẾN)

> **Mục tiêu:** Giữ cho hệ thống NextBand luôn **Xanh - Sạch - Đẹp - Ổn Định Lâu Dài** mà không cần phải đọc qua các tài liệu hàng nghìn dòng.  
> Mọi kỹ sư (từ Intern đến Senior) chỉ cần nắm vững và tuân thủ **4 Quy Tắc Bất Biến** dưới đây.

---

## 🏛️ 1. MÔ HÌNH KIẾN TRÚC MỘT CHIỀU (ARCHITECTURE OVERVIEW)

Dữ liệu của hệ thống di chuyển theo **một chiều duy nhất**:

```text
┌─────────────────────────┐
│  React Frontend (Vite)  │  ◄── Giao diện người dùng & Học sinh làm bài
└───────────┬─────────────┘
            │  HTTPS / REST (JWT Bearer)
            ▼
┌─────────────────────────┐
│  Fastify API Gateway    │  ◄── Xác thực, Chấm điểm độc quyền, Validate Zod DTO
└───────────┬─────────────┘
            │  Prisma ORM (Connection Pool)
            ▼
┌─────────────────────────┐
│   Supabase PostgreSQL   │  ◄── Nguồn chân lý dữ liệu duy nhất (Single Source of Truth)
└─────────────────────────┘
```

---

## ⚡ 2. BỐN QUY TẮC BẤT BIẾN (THE 4 GOLDEN RULES)

### 1️⃣ Quy tắc "Một Đường Đi" (Single Channel API)
* **Frontend (`nextband/src/`):** Chỉ được gọi dữ liệu qua API Backend (`/api/v1/*`) được định nghĩa trong `@/lib/api.ts`.
* **Tuyệt đối cấm:** Không import hay gọi trực tiếp database queries (`supabase.from()`, `supabase.rpc()`) từ Frontend. Hệ thống CI/CD sẽ tự động từ chối nếu phát hiện.

### 2️⃣ Quyền Trọng Tài Chấm Điểm Độc Quyền (Single Grading Authority)
* **Client không bao giờ tự chấm điểm:** Khi học sinh nộp bài, Frontend chỉ gửi danh sách câu trả lời thô (`{ answers: [...] }`).
* **Backend Fastify:** Là nơi duy nhất tính số câu đúng/sai, áp dụng công thức quy đổi sang IELTS Band (Listening, Reading, Writing, Speaking) và lưu kết quả vào Database.

### 3️⃣ Không Rò Rỉ Đề Thi & Đáp Án (Zero Answer Leakage)
* Khi trả về nội dung bài thi cho thí sinh đang làm bài, API DTO **tuyệt đối không chứa** các trường nhạy cảm: `correctAnswer`, `audioScript`, `explanation`.
* Thí sinh chỉ được xem đáp án sau khi trạng thái bài thi đã chuyển sang `GRADED`.

### 4️⃣ Không Thừa Nhận Mã Rác (Clean Code & Safe Guardrails)
* **TypeScript nghiêm ngặt:** Không dùng kiểu `any` tùy tiện, tôn trọng schema sinh từ Prisma.
* **Không lưu Mock dữ liệu:** Không tạo các biến in-memory store giả lập trong code production.
* **Giữ gìn vệ sinh Git:** Không commit file cấu hình nhạy cảm (`.env`), file tạm (`.bak`, `.tmp`, dump logs).

---

## 🛠️ 3. QUY TRÌNH LÀM VIỆC HÀNG NGÀY (DAILY WORKFLOW)

### Chạy môi trường phát triển (Local Development)
```bash
# Cài đặt dependencies
npm install

# Khởi chạy đồng thời cả Backend (Fastify) và Frontend (Vite)
npm run dev
```
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3001` (hoặc cấu hình trong `.env`)

### Trước khi Commit hoặc Tạo Pull Request (Bắt buộc)
Trước khi đẩy code lên, hãy chạy lệnh kiểm toán an toàn kiến trúc:

```bash
npm run verify
```
Lệnh này sẽ tự động chạy 5 chặng kiểm tra:
1. `npm run sanity`: Tự động quét kiểm tra circular dependencies, mock rác và vi phạm bảo mật.
2. `npm run typecheck`: Kiểm tra toàn vẹn kiểu dữ liệu TypeScript của cả Frontend & Backend.
3. `npm run verify:runtime`: Xác minh tính tương thích của API runtime.
4. `npm run test`: Chạy toàn bộ unit & integration tests.
5. `npm run build`: Kiểm tra biên dịch production thành công (Exit Code 0).

---

## 📂 4. CẤU TRÚC THƯ MỤC CỐT LÕI

- `nextband/`: Toàn bộ mã nguồn React Frontend (Vite, Tailwind, Shadcn UI, TanStack Query).
  - `src/lib/api.ts`: Nơi duy nhất chứa các hàm gọi REST API sang Backend.
- `server/`: Toàn bộ mã nguồn Fastify Backend API.
  - `routes/`: Thin Routes (chỉ validate Zod schema và gọi Service).
  - `services/`: Domain Business Logic (chấm điểm, xử lý trạng thái bài nộp).
  - `repositories/`: Giao tiếp với Database qua Prisma.
- `prisma/`: Chứa `schema.prisma` và migration scripts.
- `scripts/`: Chứa các công cụ kiểm toán kiến trúc tự động (`sanity_check.mjs`, `build.mjs`).
- `docs/`: Tài liệu tham chiếu chi tiết và lưu trữ lịch sử nghiệm thu kiến trúc.

---
> 💡 *Khi cần tra cứu lịch sử phẫu thuật 8 cổng nghiệm thu hoặc các quyết định kiến trúc sâu, xem tại:* [`docs/FINAL_ARCHITECTURE_ATTESTATION.md`](./docs/FINAL_ARCHITECTURE_ATTESTATION.md).