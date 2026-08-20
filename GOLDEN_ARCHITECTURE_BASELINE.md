# GOLDEN ARCHITECTURE BASELINE (ARIS IELTS LMS)
**Version**: 1.0.0 — **Status**: FROZEN / BINDING CONSTITUTIONAL STANDARD  
**Effective Date**: 2026-08-20  
**Authority**: Machine-Verified Physical Database Reality & Unified Architecture Mandate  

---

## MỤC ĐÍCH VÀ HIỆU LỰC
Văn bản này là **Tiêu Chuẩn Kiến Trúc Vàng (Golden Architecture Baseline)** tối cao của hệ thống ARIS IELTS LMS. Mọi lập trình viên, kỹ sư và AI Assistant **BẮT BUỘC** đối chiếu và tuân thủ 7 trụ cột dưới đây trước khi thực hiện bất kỳ thay đổi nào trên codebase hoặc cơ sở dữ liệu. Nghiêm cấm mọi hành vi tự ý tái sinh các shadow models, dual-backend fallbacks, hoặc schema drift.

---

## 1. CANONICAL ENTITIES (Thực Thể Chuẩn Hóa Duy Nhất)

### 1.1 Chuỗi Thực Thể Khảo Thí & Học Tập Chuẩn
Mọi thao tác quản lý lớp, giao bài, làm bài, nộp bài, chấm điểm và sửa bài **CHỈ ĐƯỢC PHÉP** tuân theo một chuỗi quan hệ chuẩn duy nhất:

$$\text{Class} \longrightarrow \text{Course} \longrightarrow \text{Exam} \longrightarrow \text{ExamSubmission} \longrightarrow \text{Answer}$$

### 1.2 Danh Mục Thực Thể & Route Bị Khai Tử Vĩnh Viễn (Zero-Shadow Authority)
Nghiêm cấm tuyệt đối việc tạo mới hoặc tái sinh các thực thể và endpoint bóng ma sau:
- ❌ `Homework` / `homeworks`
- ❌ `Submission` / `submissions` (legacy homework submissions)
- ❌ `WorkspaceService` / `/me/workspace`
- ❌ `/api/v1/homeworks/*`

### 1.3 Bất Biến Lịch Sử Làm Bài (Attempt Immutability & Append-Only Revision)
- **Attempt 1**: Khi học viên nộp bài (`SUBMITTED`) và giáo viên chấm điểm (`GRADED`), bản ghi `ExamSubmission` và các câu trả lời (`Answer`) của attempt đó chuyển sang trạng thái đóng băng (**Read-Only** vĩnh viễn).
- **Attempt 2+ (Bản sửa bài)**: Là một bản ghi `ExamSubmission` mới được tạo độc lập qua endpoint `POST /api/v1/submissions/revision`.
- Các câu trả lời của Attempt 2 liên kết với `submission_id` mới và **tuyệt đối không bao giờ được ghi đè (UPDATE)** lên câu trả lời của Attempt 1.

---

## 2. CANONICAL IDENTIFIERS & SEMANTICS (Quy Chuẩn Định Danh)

| Entity / Field | Canonical Identifier | Quy Tắc Bắt Buộc |
| :--- | :--- | :--- |
| **Exam** | `examId` (UUID) | Đơn vị khảo thí duy nhất (bài thi / bài tập buổi). Cấm dùng `homeworkId`, `hwId`. |
| **Submission** | `submissionId` (UUID) | Đơn vị cô lập attempt duy nhất. Mọi câu trả lời (`Answer`) phải gắn với `submissionId`. |
| **Class** | `classId` (UUID) | Đơn vị lớp học của học viên. Quyền vào lớp chỉ dựa trên `class_students(class_id)`. |
| **Course** | `courseId` (UUID) | Khóa học chứa danh mục bài tập/bài thi chuẩn. |
| **User / Student** | `userId` / `studentId` (UUID) | Ánh xạ trực tiếp tới `profiles(user_id)`. |

---

## 3. CANONICAL API AUTHORITY (Thẩm Quyền Backend Độc Quyền)

### 3.1 Fastify là Thẩm Quyền Nghiệp Vụ Duy Nhất (Single Source of Truth)
- **Fastify Backend API (`/api/v1/*`)** là thẩm quyền độc quyền duy nhất cho mọi truy vấn dữ liệu nghiệp vụ (Business Data Read) và thao tác đột biến dữ liệu (Mutations).
- **Triệt tiêu hoàn toàn Dual-Backend Silent Fallback**: Nghiêm cấm client tự động gọi ngầm sang Supabase PostgREST client khi Fastify API gặp sự cố.

### 3.2 Phạm Vi Được Phép của Supabase Client
Supabase SDK phía client **CHỈ ĐƯỢC DÙNG** cho các hạ tầng kỹ thuật được chỉ định rõ:
1. **Authentication**: Quản lý phiên đăng nhập (`supabase.auth.getSession()`, `supabase.auth.signInWithPassword()`).
2. **Storage**: Tải tệp lên Storage Bucket (`supabase.storage.from(...)`).
3. Cấm tuyệt đối dùng `supabase.from("class_students")`, `supabase.from("exam_submissions")` để truy vấn hoặc bypass backend.

---

## 4. CANONICAL DATABASE & REALITY HIERARCHY (Thứ Bậc Sự Thật)

### 4.1 Hierarchy of Truth
Khi có sự không thống nhất giữa các tầng, thứ bậc sự thật được xác định bắt buộc:

$$\text{Physical PostgreSQL DB} > \text{Migration Reality} > \text{Prisma Contract} > \text{Runtime Queries} > \text{Test Mocks} > \text{Assumption}$$

### 4.2 Nguyên Tắc Zero Unexpected Schema Drift
- Mọi model trong `schema.prisma` phải khớp 100% với các bảng, cột, kiểu dữ liệu, nullability và enum thực tế trong PostgreSQL.
- **Quy chuẩn Enum trong PostgreSQL**:
  - `app_role`: `['admin', 'teacher', 'student']` $\longleftrightarrow$ `enum AppRole @@map("app_role")`
  - `exam_section_type`: `['listening', 'reading', 'writing', 'speaking', 'general']` $\longleftrightarrow$ `enum ExamSectionType @@map("exam_section_type")`
  - `question_type`: 9 kiểu câu hỏi chuẩn $\longleftrightarrow$ `enum QuestionType @@map("question_type")`
  - `submission_status`: `['in_progress', 'submitted', 'graded']` $\longleftrightarrow$ `enum SubmissionStatus @@map("submission_status")`

---

## 5. CANONICAL STATE MACHINES (Máy Trạng Thái Chuẩn Hóa)

### 5.1 Student Enrollment Lifecycle (`useStudentLifecycle`)
Chỉ quản lý đúng 4 trạng thái kết thúc hữu hạn, bảo đảm không bao giờ treo vô hạn:

```
                  ┌───────────────┐
                  │    LOADING    │
                  └───────┬───────┘
                          │ (Settled)
         ┌────────────────┼────────────────┬────────────────┐
         ▼                ▼                ▼                ▼
  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
  │   ENROLLED   │ │PRE_ENROLLMENT│ │  API_ERROR   │ │NETWORK_ERROR │
  │  (HTTP 200)  │ │ (HTTP 200 +  │ │ (4xx / 5xx)  │ │(Timeout /    │
  │ (data.len>0) │ │   data:[])   │ │              │ │ Disconnected)│
  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
```

### 5.2 Lean Learning Loop Lifecycle
```
[Attempt 1: IN_PROGRESS]
       ↓ (Nộp bài)
[Attempt 1: SUBMITTED]
       ↓ (Giáo viên chấm)
[Attempt 1: GRADED]
  ├── feedback (Nhận xét)
  ├── primaryErrorCategory: CONCEPT | STRUCTURE | EXPRESSION | GRAMMAR
  └── revisionRequired: true
            ↓ (Học viên bấm "Làm bài sửa")
      [Attempt 2: IN_PROGRESS]  (Attempt 1 đóng băng Read-Only)
            ↓ (Nộp bài sửa)
      [Attempt 2: SUBMITTED]
            ↓ (Giáo viên duyệt lại)
      [Attempt 2: GRADED] -> revisionRequired: false (Hoàn thành)
```

---

## 6. CANONICAL ERROR HANDLING & FAIL-FAST (Kỷ Luật Báo Lỗi Rõ Ràng)

1. **Fail-Fast**: Khi Fastify trả về mã lỗi HTTP 4xx/5xx hoặc quá thời gian timeout (6 giây), Client **BẮT BUỘC** chuyển trạng thái sang `API_ERROR` hoặc `NETWORK_ERROR` ngay lập tức.
2. **Error Boundary & Retry**: Giao diện hiển thị Banner thông báo lỗi rõ ràng kèm nút **"Thử lại" (Retry)**. Nghiêm cấm nuốt lỗi hoặc hiển thị khung xám skeleton vô hạn.
3. **Idempotency Guard**: Mọi endpoint đột biến (`/submissions/revision`, `/submit`, `/grade`) bắt buộc có cơ chế chống race conditions và chống double-click tại Backend.

---

## 7. CANONICAL RELEASE & VERIFICATION GATES (4 Cổng Kiểm Thử Bắt Buộc)

Trước khi nghiệm thu hoặc triển khai bất kỳ tính năng nào, hệ thống bắt buộc phải **PASS 100% cả 4 cổng**:

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ Gate 1 — Static Gate: TypeScript compile (0 errors) + npx prisma generate   │
├──────────────────────────────────────────────────────────────────────────────┤
│ Gate 2 — Unit & Regression Gate: In-memory Vitest suites PASS (100%)         │
├──────────────────────────────────────────────────────────────────────────────┤
│ Gate 3 — Live Database Reality Gate: node scripts/audit_production_schema.mjs│
│          (13/13 Entity Contracts MATCH + 9/9 Live Query Packs PASS)          │
├──────────────────────────────────────────────────────────────────────────────┤
│ Gate 4 — Production Build Gate: npm run build (0 errors / 0 warnings)       │
└──────────────────────────────────────────────────────────────────────────────┘
```

---
**Cam kết Kiến trúc**: Mọi hành động phát triển từ thời điểm này về sau lấy **Golden Architecture Baseline** làm căn cứ cao nhất. Bất kỳ mã nguồn nào vi phạm 7 nguyên tắc trên đều không được phép merge vào hệ thống.
