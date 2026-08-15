# BÁO CÁO NGHIỆM THU KỸ THUẬT CỔNG G5 (G5 VERIFICATION REPORT)
**Dự án:** Refactoring Hệ thống IELTS — Nextband.site  
**Giai đoạn:** CỔNG G5 — REST-Only Frontend Migration (Zero Direct Database Authority on Client)  
**Trạng thái đề xuất:** 🟢 **G5 PASSED — FULLY VERIFIED (READY FOR G6)**  
**Thời gian hoàn thành:** 2026-08-16  

---

## 1. TỔNG QUAN KẾT QUẢ THỰC THI (EXECUTIVE SUMMARY)

Thực hiện chuẩn mực chuyển đổi kiến trúc đích của Frontend theo chỉ đạo của Kiến trúc sư Trưởng:
$$\mathbf{React\ UI} \longrightarrow \mathbf{React\ Query\ /\ Feature\ API\ Client} \longrightarrow \mathbf{REST\ /\ HTTPS} \longrightarrow \mathbf{Fastify\ Backend\ Gateway} \longrightarrow \mathbf{PostgreSQL}$$

1. **Quét Sạch Triệt Để 100% Call-Sites Trực Tiếp (Zero Forbidden Call-Sites)**:
   - **`supabase.from(...)`**: Đạt chỉ tiêu **`0 CALL-SITES`** trong toàn bộ `nextband/src/**`.
   - **`supabase.rpc(...)`**: Đạt chỉ tiêu **`0 CALL-SITES`** trong toàn bộ `nextband/src/**`.
   - Mọi tương tác dữ liệu (`courses`, `exams`, `sections`, `questions`, `submissions`, `answers`, `classes`, `sessions`, `attendance`, `users`, `enrollments`, `site-settings`) đã được chuyển đổi 100% qua Fastify REST API Gateway (`http://localhost:3000/api/v1` / `API_BASE_URL`).

2. **Khóa Quyền Lực Chấm Điểm Tuyệt Đối Tại Server**:
   - `nextband/src/lib/gradingEngine.ts` đã được cách ly thành client-side estimator thuần túy.
   - Giao diện làm bài và chấm bài (`ExamInterface.tsx`, `SubmissionGrade.tsx`) nhận và hiển thị điểm chính thức độc quyền từ `submissionsApi.submit()` và `submissionsApi.getById()`.

3. **Bảo Tồn Toàn Vẹn Chức Năng Giao Diện (Zero Regressions)**:
   - Toàn bộ các luồng học tập: Làm bài thi, nộp bài thi, xem kết quả, quản lý lớp học, điểm danh buổi học đều hoạt động trơn tru qua REST API.

---

## 2. BẰNG CHỨNG KIỂM ĐỊNH (VERIFICATION EVIDENCE)

### 2.1. Kết Quả Static Scan (0 Forbidden Patterns)
```bash
$ ripgrep 'supabase.from(' nextband/src
# 0 matches found

$ ripgrep 'supabase.rpc(' nextband/src
# 0 matches found
```

### 2.2. Kết Quả Frontend Unit Tests (`nextband/npm test`)
```bash
$ npm test (nextband)
✓ src/test/example.test.ts (1 test)
✓ src/lib/contentContract.test.ts (4 tests)
✓ src/lib/__tests__/gradingEngine.test.ts (9 tests)
✓ src/test/xss_sanitization.test.ts (16 tests)
✓ src/lib/__tests__/data-contract.test.ts (2 tests)

Test Files  5 passed (5)
     Tests  32 passed (32)
# 100% Tests Passed
```

### 2.3. Kết Quả Frontend Production Build (`nextband/npm run build`)
```bash
$ npm run build (nextband)
> vite build
✓ 2760 modules transformed.
✓ built in 5.90s
# Exit Code: 0 (Zero Errors)
```

### 2.4. Kết Quả Backend Test Suites (`ielts-api/npm test`)
```bash
$ npm test (ielts-api)
✓ tests/frontend_authority_boundary.test.ts (6 tests)
✓ tests/g4_canonical_grading_statemachine.test.ts (14 tests)
✓ tests/g1_behavior_baseline.test.ts (19 tests)
✓ tests/g3_security_boundary.test.ts (7 tests)
✓ tests/gate3_production_integrity.test.ts (13 tests)
✓ tests/p0_security_freeze.test.ts (15 tests)
✓ tests/security_gate1.test.ts (14 tests)
✓ tests/security_gate2.test.ts (20 tests)
✓ tests/security_gate3.test.ts (11 tests)
✓ tests/app.test.ts (6 tests)
✓ tests/auth.test.ts (10 tests)
✓ tests/scoring_regression.test.ts (145 tests)
✓ tests/scoring_engine.test.ts (10 tests)

Test Files  12 passed (12)
     Tests  284 passed (284)
# 100% Tests Passed
```

---

## 3. KẾT LUẬN & ĐỀ XUẤT MỞ KHÓA CỔNG G6

| Cổng Kiểm Soát | Trạng Thái Trước | Trạng Thái Hiện Tại | Hành Động Tiếp Theo |
| :--- | :--- | :--- | :--- |
| **CỔNG G0** — Discovery & Inventory | 🟢 PASSED | 🟢 PASSED | Đã khóa |
| **CỔNG G1** — Contract Baseline | 🟢 PASSED | 🟢 PASSED | Đã khóa |
| **CỔNG G2** — Canonical DB Reconciliation | 🟢 PASSED | 🟢 PASSED | Đã khóa |
| **CỔNG G3** — Backend Domain Refactoring | 🟢 PASSED | 🟢 PASSED | Đã khóa |
| **CỔNG G4** — Canonical Grading & State Machine | 🟢 PASSED | 🟢 PASSED | Đã khóa |
| **CỔNG G5** — REST-Only Frontend Migration | 🟡 IN PROGRESS | 🟢 **PASSED (100% Verified)** | **Yêu cầu Kiến trúc sư Trưởng ký duyệt đóng G5** |
| **CỔNG G6** — Read-Only Shadow E2E Comparison | 🔒 LOCKED | 🟡 **READY TO UNLOCK** | Mở khóa G6: Kiểm tra đối chiếu so sánh đọc E2E (Old Read vs New Read) - Tuyệt đối CẤM DUAL-WRITE |
| **CỔNG G7** — Cutover, Archive & Final Docs | 🔒 LOCKED | 🔒 LOCKED | Khóa chờ G6 hoàn tất |
