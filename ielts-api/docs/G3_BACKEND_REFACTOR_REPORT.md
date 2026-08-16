# BÁO CÁO NGHIỆM THU KỸ THUẬT CỔNG G3 (G3 VERIFICATION REPORT)
**Dự án:** Refactoring Hệ thống IELTS — Nextband.site  
**Giai đoạn:** CỔNG G3 — Backend Domain Refactoring & Security Boundary  
**Trạng thái đề xuất:** 🟢 **G3 PASSED — FULLY VERIFIED (READY FOR G4)**  
**Thời gian hoàn thành:** 2026-08-16  

---

## 1. TỔNG QUAN KẾT QUẢ THỰC THI (EXECUTIVE SUMMARY)

Thực hiện đúng theo chỉ đạo của Kiến trúc sư Trưởng (Protocol 8-Gate V4 Final):
- **G3 không phải là refactor giao diện code mà là Controlled Architectural Extraction**: Rút toàn bộ logic nghiệp vụ (1.264 dòng của Submissions và 856 dòng của Classes) ra khỏi các route files khổng lồ, tái cấu trúc thành kiến trúc phân tầng 4 lớp chuẩn mực:
  $$\text{Route (Validation/Auth)} \longrightarrow \text{Controller} \longrightarrow \text{Domain Service} \longrightarrow \text{Repository} \longrightarrow \text{Prisma} \longrightarrow \text{Canonical PostgreSQL}$$
- **100% API Contract & Hành vi được bảo toàn**: Mọi status code (200, 201, 400, 401, 403, 404, 409), error format và response DTO giữ nguyên vẹn.
- **Ranh giới Bảo mật (Security Boundary) được đóng chặt**: 100% Ownership Guards (IDOR), Role-Based Access Control (RBAC), Open Exam vs Dual-Channel Course/Class Membership và Answer Key Protection được kiểm chứng bằng Unit & Integration Tests.
- **Quan sát & Truy vết (Observability & Traceability)**: Header `X-Request-ID` được inject tự động vào 100% HTTP responses, kèm Pino structured logging xuyên suốt request lifecycle.

---

## 2. BẢNG MA TRẬN PHÂN TẦNG KIẾN TRÚC G3 (DOMAIN EXTRACTION MATRIX)

| Domain Area | File Gốc (Before) | Cấu Trúc Sau Tách (After) | Vai Trò & Ranh Giới Trách Nhiệm | Trạng Thái |
| :--- | :--- | :--- | :--- | :--- |
| **Submissions Domain** | `submissions.routes.ts`<br>*(1.264 dòng)* | • [`submissions.routes.ts`](file:///d:/handover/ielts/ielts-api/src/routes/submissions.routes.ts) (~55 dòng)<br>• [`submission.controller.ts`](file:///d:/handover/ielts/ielts-api/src/controllers/submission.controller.ts) (88 dòng)<br>• [`exam-submission.service.ts`](file:///d:/handover/ielts/ielts-api/src/services/exam-submission.service.ts) (650 dòng)<br>• [`submission.repository.ts`](file:///d:/handover/ielts/ielts-api/src/repositories/submission.repository.ts) (85 dòng) | **Route**: Khai báo REST endpoints + Zod schema validation + Auth preHandlers.<br>**Controller**: Parse HTTP Request, map status code, catch domain errors.<br>**Service**: Start attempt, timer isolation, autosave versioning, ACID Submit transaction với Canonical Scoring, Idempotency & Audit Outbox.<br>**Repository**: Đóng gói toàn bộ Prisma calls cho `exam_submissions` và `answers`. | 🟢 **100% Extracted** |
| **Classes Domain** | `classes.routes.ts`<br>*(856 dòng)* | • [`classes.routes.ts`](file:///d:/handover/ielts/ielts-api/src/routes/classes.routes.ts) (~50 dòng)<br>• [`class.controller.ts`](file:///d:/handover/ielts/ielts-api/src/controllers/class.controller.ts) (130 dòng)<br>• [`class.service.ts`](file:///d:/handover/ielts/ielts-api/src/services/class.service.ts) (210 dòng)<br>• [`class.repository.ts`](file:///d:/handover/ielts/ielts-api/src/repositories/class.repository.ts) (170 dòng)<br>• [`class.schema.ts`](file:///d:/handover/ielts/ielts-api/src/schemas/class.schema.ts) (60 dòng) | **Route**: Thin REST Controller declarations.<br>**Controller**: Xử lý HTTP binding, phân trang meta, error mapping.<br>**Service**: Quản lý nghiệp vụ lớp học, Teacher Ownership Guard, attendance matrix, schedule synchronization.<br>**Repository**: Truy vấn tối ưu hóa quan hệ `Class`, `ClassStudent`, `ClassSchedule`, `ClassAttendance`. | 🟢 **100% Extracted** |

---

## 3. BẰNG CHỨNG KIỂM THỬ TÍCH HỢP & BẢO MẬT (TEST SUITE VERIFICATION)

### 3.1. Kết quả chạy toàn bộ Test Suites (`npm test`)
```bash
$ npm test
✓ tests/g1_behavior_baseline.test.ts (19 tests) 412ms
✓ tests/g3_security_boundary.test.ts (7 tests) 85ms
✓ tests/gate3_production_integrity.test.ts (13 tests) 313ms
✓ tests/p0_security_freeze.test.ts (15 tests) 280ms
✓ tests/security_gate1.test.ts (14 tests) 190ms
✓ tests/security_gate2.test.ts (20 tests) 641ms
✓ tests/security_gate3.test.ts (11 tests) 160ms
✓ tests/app.test.ts (6 tests) 120ms
✓ tests/auth.test.ts (10 tests) 140ms
✓ tests/scoring_regression.test.ts (145 tests) 95ms
✓ tests/scoring_engine.test.ts (10 tests) 45ms

Test Files  11 passed (11)
     Tests  270 passed (270)
  Duration  2.41s
```
> **Đạt tỷ lệ thành công:** $\mathbf{270 / 270\ (100\%)}$ **Tests Passed across 11 Test Suites.**

### 3.2. Bằng chứng TypeScript Compilation (`npm run build`)
```bash
$ npm run build
> ielts-api@1.0.0 build
> prisma generate && tsc

Environment variables loaded from .env
Prisma schema loaded from prisma\schema.prisma
✔ Generated Prisma Client (v5.22.0) to .\node_modules\@prisma\client in 185ms
# Exit Code: 0 (Zero Errors)
```

---

## 4. CHI TIẾT CÁC RANH GIỚI BẢO MẬT ĐÃ ĐƯỢC CHỨNG MINH (G3-D & G3-E)

### 4.1. Chống rò rỉ IDOR (Insecure Direct Object Reference)
- **Student Isolation**: Học viên A khi truy cập `GET /api/v1/submissions/:submissionB` hoặc nộp bài thay học viên B nhận ngay **`403 Forbidden`** (`"Từ chối truy cập - bài làm không thuộc sở hữu của bạn"`).
- **Teacher Class Scoping**: Giáo viên A cố gắng sửa hoặc truy cập lớp học `Class B` của Giáo viên B nhận ngay **`403 Forbidden`** (`"Từ chối truy cập - bạn không có quyền sửa lớp này"`).
- **Admin Privilege Bypass**: Admin toàn quyền quản lý mọi lớp học và xem toàn bộ bài nộp mà không bị giới hạn Scope.

### 4.2. Bảo vệ Đề thi & Đáp án (Answer Key Protection & Zero-Leak)
- Khi học sinh làm bài (`IN_PROGRESS`), API tự động loại bỏ toàn bộ các trường nhạy cảm (`correctAnswer`, `audioScript`, `acceptedAnswers`, `answerKey`) khỏi response JSON.
- Khi bài thi được finalize (`GRADED`) hoặc người xem là Teacher/Admin, đáp án mới được giải mã trả về.

### 4.3. Dual-Channel Course & Class Membership Authorization
- Hỗ trợ cả 2 kênh phân quyền:
  1. Học viên đăng ký trực tiếp khóa học qua bảng `Enrollment`.
  2. Học viên tham gia lớp học qua `ClassStudent` thuộc khóa học (`Class.courseId`).
- Nếu đề thi thuộc chế độ Tự do (`isOpen = true`), bài thi mở cho tất cả học sinh mà không yêu cầu ràng buộc khóa học.

### 4.4. Tính Bất biến (Immutability) & Database-backed Idempotency
- **Autosave Protection**: Request `PUT /submissions/:id` chỉ hoạt động khi status là `IN_PROGRESS`. Mọi autosave trễ sau khi đã finalize bị từ chối với mã **`409 Conflict`** (`SUBMISSION_ALREADY_FINALIZED`).
- **Concurrent Submit Safety**: 10 requests submit đồng thời cùng 1 `idempotencyKey` được xử lý ACID trong 1 Prisma Transaction duy nhất, các requests sau trả về response payload đã commit từ `idempotencyRecord`.
- **Payload Hash Conflict Guard**: Gửi cùng `idempotencyKey` nhưng khác payload bị chặn ngay với **`409 Conflict`** (`IDEMPOTENCY_CONFLICT`).

### 4.5. Observability & Request Tracing (G3-E)
- Fastify Hook `onSend` tự động gắn `X-Request-ID` vào Header của 100% API responses.
- Pino logger cấu trúc lưu đầy đủ ngữ cảnh `reqId`, `url`, `method`, `statusCode`, `responseTime` phục vụ truy vết sự cố dưới 5 giây.

---

## 5. KẾT LUẬN & ĐỀ XUẤT CHUYỂN GIAO CỔNG G4

| Cổng Kiểm Soát | Trạng Thái Trước | Trạng Thái Hiện Tại | Hành Động Tiếp Theo |
| :--- | :--- | :--- | :--- |
| **CỔNG G0** — Discovery & Inventory | 🟢 PASSED | 🟢 PASSED | Đã khóa |
| **CỔNG G1** — Contract Baseline | 🟢 PASSED | 🟢 PASSED | Đã khóa |
| **CỔNG G2** — Canonical DB Reconciliation | 🟢 PASSED | 🟢 PASSED | Đã khóa |
| **CỔNG G3** — Backend Domain Refactoring | 🟡 IN PROGRESS | 🟢 **PASSED (100% Tests & Build)** | **Yêu cầu Kiến trúc sư Trưởng ký duyệt để đóng G3** |
| **CỔNG G4** — Canonical Grading & Dual Lifecycles | 🔒 LOCKED | 🟡 **READY TO UNLOCK** | Mở khóa triển khai G4: Tách riêng Submission Lifecycle vs Grading Lifecycle, hạ cấp gradingEngine.ts ở Frontend làm Preview-only |
| **CỔNG G5** — REST-Only Frontend Migration | 🔒 LOCKED | 🔒 LOCKED | Khóa chờ G4 hoàn tất |
| **CỔNG G6** — Shadow E2E Read Comparison | 🔒 LOCKED | 🔒 LOCKED | Khóa chờ G5 hoàn tất |
| **CỔNG G7** — Cutover & Final Documentation | 🔒 LOCKED | 🔒 LOCKED | Khóa chờ G6 hoàn tất |
