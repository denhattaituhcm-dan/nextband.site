# BÁO CÁO NGHIỆM THU KỸ THUẬT CỔNG G4 (G4 VERIFICATION REPORT)
**Dự án:** Refactoring Hệ thống IELTS — Nextband.site  
**Giai đoạn:** CỔNG G4 — Canonical Grading Authority + Submission State Machine + Regrading Auditing  
**Trạng thái đề xuất:** 🟢 **G4 PASSED — FULLY VERIFIED (READY FOR G5)**  
**Thời gian hoàn thành:** 2026-08-16  

---

## 1. TỔNG QUAN KẾT QUẢ THỰC THI (EXECUTIVE SUMMARY)

Thực hiện đúng chỉ đạo của Kiến trúc sư Trưởng:
- **Server là Trọng tài Chấm điểm Duy nhất (Sole Grading Authority)**: Khóa hoàn toàn luồng phán quyết điểm tại Fastify Backend. Khi học viên nộp bài qua `POST /submissions/:id/submit`, Server loại bỏ (Ignore/Strip) 100% các trường điểm số giả mạo do Client gửi (`score`, `bandScore`, `correctCount`, `isCorrect`, `totalScore`, `status`, `gradingResult`). Server tự động phân tích answers thô và chấm điểm qua [`CanonicalScoringService.ts`](file:///d:/handover/ielts/ielts-api/src/services/scoring/CanonicalScoringService.ts).
- **Khóa Chặt Chẽ Submission State Machine**:
  $$\text{IN\_PROGRESS} \xrightarrow{\text{submit}} \text{SUBMITTED (nếu có essay/speaking)} \xrightarrow{\text{canonical/manual grading}} \text{GRADED / FINAL (Bất biến)}$$
  - Trạng thái `GRADED` là bất biến (Immutable): Chặn tuyệt đối rollback về `IN_PROGRESS` (409 Conflict) hoặc sửa điểm trực tiếp.
- **Quy Trình Phúc Khảo Có Kiểm Soát (Authorized Regrade Engine)**:
  - Triển khai endpoint `POST /api/v1/submissions/:id/regrade` có kiểm soát RBAC/Scope nghiêm ngặt: Chỉ Giáo viên phụ trách lớp học hoặc Admin mới được phép phúc khảo (Học sinh/Giáo viên trái lớp $\rightarrow$ `403 Forbidden`).
  - Bắt buộc phải có `reason` (tối thiểu 5 ký tự).
  - Tự động ghi nhận bản ghi bất biến `AuditOutbox` (`eventType: "SUBMISSION_REGRADED"`) lưu trữ đầy đủ `actorId`, `actorRole`, `reason`, `previousScore`, `newScore`, `timestamp`.
- **Chuẩn Hóa IELTS Band Score**:
  - Xây dựng module [`IeltsBandCalculator.ts`](file:///d:/handover/ielts/ielts-api/src/services/scoring/IeltsBandCalculator.ts) chuẩn hóa toàn bộ thang quy đổi điểm IELTS Listening & Reading (0.0 - 9.0).
- **Giữ Nguyên Invariant**:
  - `NO DUAL-WRITE`.
  - `NO FRONTEND REFACTOR` trong Cổng G4 (Frontend giữ nguyên, sẵn sàng cho G5).

---

## 2. BẢNG KIỂM TRA 17 TIÊU CHÍ EXIT CRITERIA CỦA CỔNG G4

| # | Tiêu Chí Exit Criteria | Phương Thức Kiểm Chứng | Kết Quả |
| :---: | :--- | :--- | :---: |
| 1 | **CanonicalScoringService = single grading authority** | Khóa toàn bộ logic tính điểm tại Service Backend, không phụ thuộc client | 🟢 **PASSED** |
| 2 | **Client score injection = rejected/ignored** | Test gửi `score: 9.0, bandScore: 9.0, isCorrect: true` khi câu trả lời sai $\rightarrow$ Server tự tính ra `0.0` điểm | 🟢 **PASSED** |
| 3 | **State transitions are enforced** | `SubmissionStateMachine` kiểm soát chặt chẽ `IN_PROGRESS` $\rightarrow$ `SUBMITTED` $\rightarrow$ `GRADED` | 🟢 **PASSED** |
| 4 | **FINAL / GRADED is immutable** | Autosave trễ hoặc submit lại trên bài đã hoàn tất bị từ chối (`409 Conflict` / Idempotent return) | 🟢 **PASSED** |
| 5 | **Unauthorized regrade = 403** | Học viên hoặc Giáo viên không quản lý lớp gọi `/regrade` nhận `403 Forbidden` | 🟢 **PASSED** |
| 6 | **Authorized regrade = audited** | Giáo viên phụ trách / Admin regrade thành công và lưu `AuditOutbox` (`SUBMISSION_REGRADED`) | 🟢 **PASSED** |
| 7 | **Idempotent submit remains intact** | Gửi nhiều submit trùng lặp trả về kết quả đã commit mà không re-score hay xung đột | 🟢 **PASSED** |
| 8 | **Objective scoring regression = 100% pass** | 100% Evaluators (MCQ, Fill blank, Matching, TFNG, Short Answer) pass toàn bộ fixtures | 🟢 **PASSED** |
| 9 | **Alternative-answer rules verified** | Xử lý hoàn hảo các đáp án phân tách bằng dấu gạch đứng `"Paris \| London"` | 🟢 **PASSED** |
| 10 | **Case normalization verified** | So sánh không phân biệt hoa thường (`"canberra"` == `"Canberra"`) | 🟢 **PASSED** |
| 11 | **Whitespace normalization verified** | Bỏ khoảng trắng thừa (`"   Canberra   "` == `"Canberra"`) | 🟢 **PASSED** |
| 12 | **Punctuation rules verified** | Chuẩn hóa dấu câu theo chuẩn IELTS | 🟢 **PASSED** |
| 13 | **Band calculation verified** | Module `IeltsBandCalculator` tính chuẩn thang điểm 0.0 - 9.0 cho Listening & Reading | 🟢 **PASSED** |
| 14 | **Manual Writing/Speaking workflow verified** | Bài thi có Writing Task 2 chuyển sang `SUBMITTED`, chờ giáo viên chấm thủ công | 🟢 **PASSED** |
| 15 | **No answer-key leakage** | Bóc tách toàn bộ `correctAnswer` và `audioScript` khi bài làm ở trạng thái `IN_PROGRESS` | 🟢 **PASSED** |
| 16 | **PostgreSQL transaction integrity verified** | Prisma Transaction ACID đảm bảo tính toàn vẹn đồng thời của `submission`, `answers`, `auditOutbox` | 🟢 **PASSED** |
| 17 | **270 existing tests green + Build = 0 error** | **284 / 284 Tests Passed (100%)** trên 12 Test Suites; `npm run build` Exit Code 0 | 🟢 **PASSED** |

---

## 3. BẰNG CHỨNG THỰC TẾ (TEST SUITE & BUILD EVIDENCE)

### 3.1. Kết Quả Chạy Toàn Bộ Test Suites (`npm test`)
```bash
$ npm test
✓ tests/g1_behavior_baseline.test.ts (19 tests) 420ms
✓ tests/g3_security_boundary.test.ts (7 tests) 88ms
✓ tests/g4_canonical_grading_statemachine.test.ts (14 tests) 95ms
✓ tests/gate3_production_integrity.test.ts (13 tests) 310ms
✓ tests/p0_security_freeze.test.ts (15 tests) 275ms
✓ tests/security_gate1.test.ts (14 tests) 185ms
✓ tests/security_gate2.test.ts (20 tests) 594ms
✓ tests/security_gate3.test.ts (11 tests) 155ms
✓ tests/app.test.ts (6 tests) 115ms
✓ tests/auth.test.ts (10 tests) 135ms
✓ tests/scoring_regression.test.ts (145 tests) 90ms
✓ tests/scoring_engine.test.ts (10 tests) 40ms

Test Files  12 passed (12)
     Tests  284 passed (284)
  Duration  2.35s
```

### 3.2. Bằng Chứng TypeScript Build (`npm run build`)
```bash
$ npm run build
> ielts-api@1.0.0 build
> prisma generate && tsc

Environment variables loaded from .env
Prisma schema loaded from prisma\schema.prisma
✔ Generated Prisma Client (v5.22.0) to .\node_modules\@prisma\client in 182ms
# Exit Code: 0 (Zero Errors)
```

---

## 4. KẾT LUẬN & ĐỀ XUẤT CHUYỂN GIAO CỔNG G5

| Cổng Kiểm Soát | Trạng Thái Trước | Trạng Thái Hiện Tại | Hành Động Tiếp Theo |
| :--- | :--- | :--- | :--- |
| **CỔNG G0** — Discovery & Inventory | 🟢 PASSED | 🟢 PASSED | Đã khóa |
| **CỔNG G1** — Contract Baseline | 🟢 PASSED | 🟢 PASSED | Đã khóa |
| **CỔNG G2** — Canonical DB Reconciliation | 🟢 PASSED | 🟢 PASSED | Đã khóa |
| **CỔNG G3** — Backend Domain Refactoring | 🟢 PASSED | 🟢 PASSED | Đã khóa |
| **CỔNG G4** — Canonical Grading & State Machine | 🟡 IN PROGRESS | 🟢 **PASSED (100% Verified)** | **Yêu cầu Kiến trúc sư Trưởng ký duyệt đóng G4** |
| **CỔNG G5** — REST-Only Frontend Migration | 🔒 LOCKED | 🟡 **READY TO UNLOCK** | Mở khóa G5: Chuyển đổi Frontend sang REST-only qua Fastify API, tháo gỡ `supabase.from()` và `gradingEngine.ts` |
| **CỔNG G6** — Shadow E2E Read Comparison | 🔒 LOCKED | 🔒 LOCKED | Khóa chờ G5 hoàn tất |
| **CỔNG G7** — Cutover & Final Documentation | 🔒 LOCKED | 🔒 LOCKED | Khóa chờ G6 hoàn tất |
