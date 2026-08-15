# BÁO CÁO ĐỐI SOÁT & KIỂM ĐỊNH POSTGRESQL (G2 RECONCILIATION REPORT - V3 DEFINITIVE)

> **Mã báo cáo**: `G2-REC-2026-08-16-V3`  
> **Trạng thái**: 🟢 **GATE G2 FULLY PASSED (ALL 6 SUB-GATES G2-A TO G2-F EMPIRICALLY VERIFIED)**  
> **Phương pháp kiểm định**: 100% Read-Only Probe trên cả Snapshot MySQL Legacy và Live Supabase PostgreSQL.

---

## I. MA TRẬN ĐỐI SOÁT HAI CHIỀU THỰC NGHIỆM (DUAL-SIDED RECONCILIATION MATRIX)

| Thực thể (Entity) | MySQL Legacy | Supabase PostgreSQL Canonical | Độ lệch (Delta) | Phân loại sai lệch & Kết luận kiểm định (Discrepancy Classification) |
| :--- | :---: | :---: | :---: | :--- |
| **`exams`** | **130** | **130** | **0** | 🟢 **MATCH 100%**: 130 đề thi chuẩn IELTS khớp hoàn hảo. |
| **`exam_sections`** | **609** | **609** | **0** | 🟢 **MATCH 100%**: 609 sections (Listening, Reading, Writing, Speaking). |
| **`question_groups`**| **181** | **181** | **0** | 🟢 **MATCH 100%**: 181 nhóm câu hỏi / bài đọc / audio script. |
| **`questions`** | **739** | **739** | **0** | 🟢 **MATCH 100%**: 739 câu hỏi độc lập (MCQ, Fill-blank, Matching...). |
| **`courses`** | 16 | 11 | -5 | 🟡 **5 Draft/Test Courses cũ** trên MySQL không đưa vào Canonical DB. |
| **`profiles`** | 21 | 14 | -7 | 🟡 **7 Seed Users thử nghiệm cũ** trên local không liên kết Supabase Auth. |
| **`user_roles`** | 21 | 26 | +5 | 🟢 **5 Quyền mới** được cấp thực tế trên Supabase Auth (Hỗ trợ Intentional Multi-Role). |
| **`exam_submissions`** | 158 | 9 | -149 | 🟡 **149 Test Attempts cũ** trong quá trình dev/staging; **9 Submissions thật** trên Canonical DB. |
| **`answers`** | 298 | 36 | -262 | 🟡 **262 Test Answers cũ**; **36 Individual Answers thật** gắn với 9 Submissions trên Canonical DB. |
| **`classes`** | 3 | 2 | -1 | 🟡 **1 Lớp học mẫu cũ**; **2 Lớp học thực tế** đang vận hành. |
| **`class_students`** | 6 | 8 | +2 | 🟢 **8 Học viên thực tế** đã được thêm vào lớp trên Supabase. |
| **`class_attendance`**| 14 | 0 | -14 | 🟡 **14 Dữ liệu điểm danh mẫu cũ**; Supabase sẵn sàng cho module điểm danh mới. |
| **`enrollments`** | 25 | 0 | -25 | 🟡 **25 Dữ liệu ghi danh mẫu cũ**. |
| **`highlights`** | 8 | 0 | -8 | 🟡 **8 Highlight tạm cũ**. |

---

## II. G2-F: BẢN ĐỒ PHÂN LOẠI CHI TIẾT (RECORD-LEVEL DISPOSITION PROOF)

### 1. Phân loại 158 Submissions Legacy (MySQL)
* **Tổng số Submissions được quét**: **158 / 158 (100%)**
  * `DUPLICATE_OR_EMPTY`: **99** attempts (Các bản ghi làm thử nghiệm dở dang, 0 câu trả lời, 0 điểm).
  * `TEST_DEV_STAGING`: **59** attempts (Các bài nộp của tài khoản test/seed: `admin@ielts.com`, `teacher@ielts.com`, `student@ielts.com`).
  * `REAL_UNMIGRATED_REQUIRED`: **0** ($\implies$ **ZERO REAL DATA LOST**).

### 2. Phân loại 298 Answers Legacy (MySQL)
* **Tổng số Answers được quét**: **298 / 298 (100%)**
  * Đã liên kết chính xác với các Submissions đã phân loại: **298 / 298 (100%)**.
  * `orphanAnswers`: **0** (Không có câu trả lời mồ côi).

### 3. Mô hình User Roles & Multi-Role trên Canonical PostgreSQL
* Tổng số `profiles`: 14
* Tổng số `user_roles`: 26
* Phân bổ: 10 user có Single Role, 2 user có Multi-Role (`admin + student` hoặc `teacher + student`), 12 roles thuộc các tài khoản trong `auth.users` chưa tạo public profile riêng.
* **Kết luận**: Mô hình **Multi-Role là có chủ đích (Intentional Multi-Role)** cho phép Admin và Giáo viên có thể trải nghiệm giao diện Học viên.

---

## III. KIỂM ĐỊNH ĐỒ THỊ KHÓA NGOẠI HAI BÊN (DUAL-SIDED FK GRAPH AUDIT)

### 1. Canonical PostgreSQL FK Graph (Live Supabase)
```text
orphanExamsCourse          = 0  (130/130 exams trỏ đúng Course ID)
orphanSectionsExam         = 0  (609/609 sections trỏ đúng Exam ID)
orphanGroupsSection        = 0  (181/181 groups trỏ đúng Section ID)
orphanQuestionsGroup       = 0  (739/739 questions trỏ đúng Group ID)
orphanSubmissionsExam      = 0  (9/9 submissions trỏ đúng Exam ID)
orphanAnswersSubmission    = 0  (36/36 answers trỏ đúng Submission ID)
orphanAnswersQuestion      = 0  (36/36 answers trỏ đúng Question ID)
orphanClassesCourse        = 0  (2/2 classes trỏ đúng Course ID)
orphanClassStudentsClass   = 0  (8/8 class_students trỏ đúng Class ID)

===> CANONICAL POSTGRESQL FK GRAPH 100% VALID: TRUE
```

### 2. Legacy MySQL FK Graph (Backup Snapshot)
```text
orphanRoles                = 0  (21/21)
orphanSections             = 0  (609/609)
orphanGroups               = 0  (181/181)
orphanQuestions            = 0  (739/739)
orphanSubmissionsExam      = 0  (158/158)
orphanSubmissionsStudent   = 0  (158/158)
orphanAnswersSubmission    = 0  (298/298)
orphanAnswersQuestion      = 0  (298/298)
orphanClassStudentsClass   = 0  (6/6)
orphanClassStudentsUser    = 0  (6/6)
orphanAttendanceClass      = 0  (14/14)
orphanAttendanceStudent    = 0  (14/14)

===> LEGACY MYSQL FK GRAPH 100% VALID: TRUE
```

---

## IV. CANONICAL SNAPSHOT DIGEST (CHECKSUMS)

Mã băm SHA-256 xác thực tính toàn vẹn của dữ liệu:
* **Submissions Digest (158 rows)**: `99684144fcdc09cf66df024cafed78e348ac1d6defcb9a1ab5e63c2f523f8b09`
* **Answers Digest (298 rows)**: `6cb489bc8ca127998d8b1a62f177cc1c32a5715e2438ff98bf742c949c3d4cbd`
* **Exams Digest (130 rows)**: `9b9cb6bf4a4b2318118e0d0c26a7a36d44dbece1a5df926b47bb8ddf1154113a`

---

## V. ĐIỀU KIỆN MỞ KHÓA CỔNG G3 (CONTROLLED REFACTORING)

Cổng G3 được mở khóa với 4 nguyên tắc bảo vệ nghiêm ngặt:
1. **G3-1 (Preserve API Behavior)**: Giữ nguyên 100% response contract hiện tại của các endpoints; không vừa refactor vừa đổi API contract.
2. **G3-2 (Thin Routes)**: Route chỉ làm nhiệm vụ: `Route → Auth/Validation → Controller → Service → Repository → Prisma`.
3. **G3-3 (Ownership Guard Tests)**: Bắt buộc có test chứng minh ranh giới bảo mật:
   * Học sinh A $\rightarrow$ Bài nộp B: **HTTP 403**
   * Giáo viên A $\rightarrow$ Lớp B: **HTTP 403**
   * Học sinh $\rightarrow$ Thay đổi điểm số: **HTTP 403**
   * Giáo viên $\rightarrow$ Endpoint Admin: **HTTP 403**
   * Admin $\rightarrow$ Endpoint Admin: **HTTP 200**
4. **G3-4 (Pragmatic Layering)**: Phân tầng phục vụ độ phức tạp (*Layer phục vụ complexity*); không dựng abstraction thừa cho các CRUD đơn giản.
