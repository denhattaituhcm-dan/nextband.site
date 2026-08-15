# BÁO CÁO NGHIỆM THU CỔNG G1 (G1 BEHAVIOR & CONTRACT BASELINE REPORT)

> **Mã báo cáo**: `G1-BASE-2026-08-16`  
> **Trạng thái**: 🟢 **GATE G1 PASSED (100% Deterministic & Workflow Test Vectors Verified)**  
> **Bộ test suite thực thi**: `ielts-api/tests/g1_behavior_baseline.test.ts` + 9 test suites phụ trợ  
> **Kết quả thực nghiệm**: **10 Test Files Passed | 263 / 263 Tests Passed (100%)**

---

## I. TỔNG HỢP KẾT QUẢ TEST VECTORS (EMPIRICAL EVIDENCE)

```text
Test Files  10 passed (10)
Tests       263 passed (263)
Duration    2.11s
Coverage    100% Deterministic Scoring & Critical Workflow Journeys
```

---

## II. CHI TIẾT CÁC BỘ TEST VECTORS ĐÃ ĐƯỢC CỐ ĐỊNH (BASELINE CONTRACT)

### 1. Deterministic Test Vectors (Chấm điểm Tất định - Canonical Scoring Rules)
Toàn bộ 25+ Golden Fixtures từ `golden_scoring_fixtures.json` được kiểm thử với độ chính xác tuyệt đối:

| Category | Vector ID | Dạng câu hỏi | Quy tắc kiểm chứng | Kết quả |
| :--- | :--- | :--- | :--- | :---: |
| **Multiple Choice (Single)** | `MCQ-S-001` $\rightarrow$ `008` | Trắc nghiệm 1 đáp án | Exact match, Case-insensitive, Whitespace trim, Trailing punctuation trim (`paris.` $\rightarrow$ `paris`), Index mapping (`A` $\rightarrow$ `0`). | 🟢 PASS |
| **Multiple Choice (Multi)** | `MCQ-M-001` $\rightarrow$ `004` | Chọn nhiều đáp án | Partial credit (1/2 đáp án đúng $\rightarrow$ 1 điểm), **No negative penalty**, Order-insensitive. | 🟢 PASS |
| **Fill-in-the-Blank** | `FILL-001` $\rightarrow$ `007` | Điền từ vào chỗ trống | Multi-blank denominator assertion (`itemCount = 3`, không tính sai tổng mẫu số), Alternative answers (`/` hoặc `\|`). | 🟢 PASS |
| **Matching & Short Answer** | `MATCH-001`, `SA-001` | Nối cặp & Trả lời ngắn | Cặp Key-Value mapping, Case normalization, Whitespace collapse. | 🟢 PASS |
| **True/False/Not Given** | `TFNG-001` $\rightarrow$ `004` | Phân loại mệnh đề | Chuẩn hóa `true/false/not given`, `t/f/ng`, `yes/no/not given`. | 🟢 PASS |

---

### 2. Workflow Test Vectors (Critical User Journeys - CUJ)

| CUJ ID | Hành trình người dùng | Điểm kiểm chứng trọng yếu | Kết quả |
| :--- | :--- | :--- | :---: |
| **CUJ 01** | **Học sinh làm bài & Nộp bài** | `POST /submissions` (HTTP 201, status `in_progress`) $\rightarrow$ `PUT /submissions/:id` (Autosave draft) $\rightarrow$ `POST /submissions/:id/submit` (Kèm `x-idempotency-key`). Server tự động tính điểm phần trắc nghiệm (3 pts) và chuyển trạng thái sang `submitted` (chờ giáo viên chấm tự luận). | 🟢 PASS |
| **CUJ 02** | **Giáo viên chấm tự luận (Writing/Speaking)** | `POST /submissions/:id/grade` với token Teacher $\rightarrow$ Chấm câu Essay (7.5 pts) $\rightarrow$ Server cập nhật `totalScore = 10.5` $\rightarrow$ Chuyển trạng thái sang `GRADED`. | 🟢 PASS |
| **CUJ 03** | **Quản lý Lớp học & Điểm danh** | `PUT /classes/:id` cập nhật thông tin lớp $\rightarrow$ Kiểm soát quyền giáo viên sở hữu lớp $\rightarrow$ Trả về cấu trúc Class chuẩn. | 🟢 PASS |
| **CUJ 04** | **Ranh giới Bảo mật (Security Guard)** | Học sinh cố tình gọi endpoint chấm điểm `POST /submissions/:id/grade` $\rightarrow$ Hệ thống lập tức chặn với mã lỗi **HTTP 403 Forbidden**. | 🟢 PASS |

---

## III. BẢNG MÁY TRẠNG THÁI BẤT BIẾN (STATE MACHINE INVARIANT)

Quy trình vòng đời bài nộp được chuẩn hóa và khóa cứng:

```text
[DRAFT / in_progress]
        │
        ▼ (Học sinh submit)
[SUBMITTED]
        │
        ├── (Nếu 100% Objective Questions) ──► [GRADED] ──► [FINAL]
        │
        └── (Nếu có Essay / Speaking) ────────► [PENDING_REVIEW] ──► (Teacher chấm) ──► [GRADED] ──► [FINAL]
```

* **Khóa bất biến**: Client không có quyền can thiệp hay tự gán điểm (`score`). Server là trọng tài tối cao và duy nhất phán quyết điểm số.

---

## IV. KẾT LUẬN & ĐIỀU KIỆN TIẾN VÀO CỔNG G2

1. **Gate G1 hoàn thành 100%**: Đã có mốc baseline vững chắc gồm 263 bài kiểm tra tự động bảo vệ toàn bộ hành vi chấm điểm và luồng nghiệp vụ.
2. **Sẵn sàng bước vào Cổng G2 (Canonical PostgreSQL Reconciliation & Compatibility)**:
   * Chuyển `ielts-api/prisma/schema.prisma` từ MySQL sang PostgreSQL (kết nối Supabase Cloud PostgreSQL).
   * Thực hiện đối soát và phân loại sai lệch (Discrepancy Classification) bảo vệ dữ liệu `exam_submissions` và `answers`.
