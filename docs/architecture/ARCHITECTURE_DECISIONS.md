# BẢN GHI QUYẾT ĐỊNH KIẾN TRÚC — NEXTBAND LMS (ADR)

> **Mục tiêu:** Lưu trữ lịch sử các quyết định cấu trúc quan trọng, phân định trạng thái rõ ràng giữa cái đã áp dụng (`accepted`), cái đang đề xuất (`proposed`) và cái đã bãi bỏ (`deprecated`).

---

## ADR-001: Kiến trúc Single Channel API Gateway (Fastify làm trung gian duy nhất)
- **ID:** ADR-001
- **Trạng thái:** `accepted`
- **Bối cảnh:** Trước đây Frontend SPA gọi trực tiếp bảng dữ liệu qua Supabase Client, dẫn đến tình trạng bypass các ràng buộc kiểm tra quyền, không thể audit log và làm lộ schema nội bộ.
- **Quyết định:** Toàn bộ truy vấn đọc/ghi của Frontend bắt buộc phải đi qua Fastify API Gateway (`/api/v1/*`). Supabase Client ở Frontend chỉ được dùng duy nhất cho Auth Session (`supabase.auth`) và Realtime WebSocket Listener (`supabase.channel`).
- **Lý do:** Đảm bảo toàn vẹn dữ liệu, tập trung xác thực Role tại Middleware và quản lý Business Transactions tập trung qua Prisma.
- **Hệ quả:** Gate 5 trong `scripts/sanity_check.mjs` tự động quét và chặn mọi lệnh gọi database trực tiếp từ Frontend.
- **Module ảnh hưởng:** `nextband/src/lib/api.ts`, toàn bộ React Query hooks, `server/middlewares/auth.middleware.ts`.

---

## ADR-002: Modular hóa `api.ts` theo Domain dùng chung Client Core
- **ID:** ADR-002
- **Trạng thái:** `accepted` (Áp dụng từng bước theo batch an toàn)
- **Bối cảnh:** `nextband/src/lib/api.ts` là một monolithic file dài hơn 6.000 dòng, chứa toàn bộ API và kiểu dữ liệu của toàn bộ hệ thống, gây khó khăn cho việc bảo trì và tăng nguy cơ xung đột khi merge code.
- **Quyết định:**
  1. Trích xuất network primitives dùng chung sang [`nextband/src/lib/api/client.ts`](file:///d:/handover/ielts/nextband/src/lib/api/client.ts).
  2. Tách từng domain độc lập sang `nextband/src/lib/api/domains/<domain>.api.ts`.
  3. `nextband/src/lib/api.ts` đóng vai trò Facade re-export để giữ nguyên 100% import path của các consumer hiện tại (`@/lib/api`).
- **Lý do:** Giảm kích thước file, cô lập phạm vi thay đổi mà không làm vỡ các consumer đang hoạt động.
- **Hệ quả:** Đã tách an toàn 9 domain: `branches`, `rooms`, `referrals`, `speakingForecast`, `tuition`, `interventions`, `invitations`, `milestones`, `teacherProfile`.
- **Module ảnh hưởng:** `nextband/src/lib/api.ts`, `nextband/src/lib/api/domains/*`.

---

## ADR-003: Kiến trúc đóng gói Serverless Fastify Gateway cho Vercel
- **ID:** ADR-003
- **Trạng thái:** `accepted`
- **Bối cảnh:** Ứng dụng chạy trên môi trường Vercel Serverless Function, nhưng backend sử dụng Fastify framework nguyên bản.
- **Quyết định:** Sử dụng build script `scripts/bundle-api.mjs` để đóng gói toàn bộ server Fastify kèm Prisma Engine thành một standalone serverless bundle tại `api/index.js` (và đồng bộ vào `nextband/api/index.js`).
- **Lý do:** Không cần viết lại code backend sang Next.js API Routes hay Vercel Serverless Functions riêng lẻ; giữ nguyên được codebase Fastify nhất quán giữa local dev và production.
- **Hệ quả:** Build pipeline phải luôn chạy bước `scripts/bundle-api.mjs` trước khi deploy.

---

## ADR-004: Chuyển đổi toàn diện các Core Domains (Exams, Classes, Submissions) sang Micro-Modules
- **ID:** ADR-004
- **Trạng thái:** `proposed`
- **Bối cảnh:** Các domain lõi (`classesApi`, `submissionsApi`, `examsApi`) vẫn nằm trong `api.ts` vì chúng có sự phụ thuộc chéo về kiểu dữ liệu và helper (`classContext`, `effectiveDeadline`, `canonicalSubmission`).
- **Quyết định đề xuất:** Chỉ thực hiện việc bóc tách các domain này sau khi đã tạo được tầng kiểu dữ liệu dùng chung (`shared/types/`) và helper dùng chung độc lập, ngăn ngừa nguy cơ tạo circular dependency.
- **Lý do:** Tránh vỡ Gate 1 Sanity Check và tránh hồi quy logic làm bài/chấm thi của học viên.
- **Hệ quả:** Giữ nguyên các domain này trong `api.ts` cho đến khi có kế hoạch refactor tầng type riêng.

---

## ADR-005: Loại bỏ Dead Code Mock Stores trong Production Bundle
- **ID:** ADR-005
- **Trạng thái:** `accepted`
- **Bối cảnh:** Codebase từng tồn tại các mảng in-memory mock fallback (`localUsersStore`, mock tokens) khiến hệ thống ngầm trả dữ liệu giả khi backend gặp lỗi thay vì báo lỗi thực tế.
- **Quyết định:** Xóa bỏ hoàn toàn mọi cơ chế in-memory RAM fallback trong production API bundle. Nếu backend lỗi, API phải trả về `ApiError` hoặc HTTP status code tương ứng để giao diện người dùng hiển thị thông báo chính xác.
- **Lý do:** Bảo vệ tính toàn vẹn dữ liệu và an toàn bảo mật.
- **Hệ quả:** Gate 3 Sanity Check tự động giám sát và ngăn chặn việc tái xuất hiện mock store.
