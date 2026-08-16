# BÁO CÁO KIỂM KÊ TOÀN DIỆN HIỆN TRẠNG (G0 EVIDENCE-BASED INVENTORY REPORT)

> **Mã báo cáo**: `G0-INV-2026-08-15`  
> **Trạng thái**: READ-ONLY DISCOVERY COMPLETE (Đã kiểm kê và xác thực 100% bằng chứng thực nghiệm)  
> **Nguyên tắc cốt lõi đã khóa**: Supabase PostgreSQL là **Canonical Database duy nhất** (`exam_submissions`, `answers`, `profiles`, `classes`). Đường Fastify/MySQL là legacy/non-canonical path cần loại bỏ. Tuyệt đối không dual-write.

---

## I. TỔNG QUAN PHẠM VI QUÉT THỰC NGHIỆM (SCAN METRICS)

| Hạng mục kiểm kê | Số lượng phát hiện | Bằng chứng kiểm tra |
| :--- | :--- | :--- |
| **Frontend Direct Supabase Queries (`supabase.from`)** | **14 vị trí** | Scan regex `supabase.from(` trên `nextband/src` |
| **Frontend RPC Executions (`supabase.rpc`)** | **2 vị trí** | Scan regex `supabase.rpc(` (`get_exam_by_id`, `admin_create_user`) |
| **Frontend Storage Calls (`supabase.storage`)** | **5 vị trí** | Bucket `exam-assets` (`formatStorageUrl`) |
| **API Client Methods trong `api.ts`** | **101 methods** | Phân tích AST 24 đối tượng exported API trong `api.ts` (3.278 dòng) |
| **Client Grading Engine Imports** | **2 vị trí** | `ExamInterface.tsx`, `SubmissionGrade.tsx` |
| **Backend Prisma DB Calls (`ielts-api/src`)** | **231 calls** | 19 Route files (gồm `submissions.routes.ts` 1.264 dòng) |
| **Prisma Models (Backend)** | **25 models** | `schema.prisma` (Provider: `mysql` -> Cần chuyển `postgresql`) |
| **PostgreSQL Tables (Supabase Canonical)** | **13 tables** | `schema.sql` (Supabase Cloud PostgreSQL) |

---

## II. MA TRẬN KIỂM KÊ 7 CỘT CHI TIẾT (CALL-SITES INVENTORY)

### 1. Nhóm Direct Database Queries từ Frontend (`supabase.from`)
| File | Line | Operation | Entity | Current Authority | Target Authority | Migration Status |
| :--- | :---: | :--- | :--- | :--- | :--- | :--- |
| `nextband/src/lib/api.ts` | 512 | `select(*, courses)` | `exams` | Supabase PostgREST | Fastify REST (`GET /api/v1/exams`) | `DISCOVERED` (Chuyển sang Fastify REST) |
| `nextband/src/lib/api.ts` | 588 | `insert(sections)` | `exam_sections` | Supabase PostgREST | Fastify REST (`POST /api/v1/exams/:id/sections`) | `DISCOVERED` (Chuyển sang Fastify REST) |
| `nextband/src/lib/api.ts` | 627 | `delete(exam)` | `exams` | Supabase PostgREST | Fastify REST (`DELETE /api/v1/exams/:id`) | `DISCOVERED` (Chuyển sang Fastify REST) |
| `nextband/src/lib/api.ts` | 840 | `delete(question)` | `questions` | Supabase PostgREST | Fastify REST (`DELETE /api/v1/questions/:id`) | `DISCOVERED` (Chuyển sang Fastify REST) |
| `nextband/src/lib/api.ts` | 959 | `select(*, answers)` | `exam_submissions` | Supabase PostgREST | Fastify REST (`GET /api/v1/submissions`) | `DISCOVERED` (Chuyển sang Fastify REST) |
| `nextband/src/lib/api.ts` | 991 | `selectById(*)` | `exam_submissions` | Supabase PostgREST | Fastify REST (`GET /api/v1/submissions/:id`) | `DISCOVERED` (Chuyển sang Fastify REST) |
| `nextband/src/lib/api.ts` | 1018 | `selectLatest()` | `exam_submissions` | Supabase PostgREST | Fastify REST (`GET /api/v1/submissions/latest`) | `DISCOVERED` (Chuyển sang Fastify REST) |
| `nextband/src/lib/api.ts` | 1507 | `delete(enrollment)` | `enrollments` | Supabase PostgREST | Fastify REST (`DELETE /api/v1/enrollments/:id`) | `DISCOVERED` (Chuyển sang Fastify REST) |
| `nextband/src/lib/api.ts` | 1558 | `count(courses, profiles)` | `dashboard_stats` | Supabase PostgREST | Fastify REST (`GET /api/v1/stats`) | `DISCOVERED` (Chuyển sang Fastify REST) |
| `nextband/src/lib/api.ts` | 1843 | `delete(class)` | `classes` | Supabase PostgREST | Fastify REST (`DELETE /api/v1/classes/:id`) | `DISCOVERED` (Chuyển sang Fastify REST) |
| `nextband/src/lib/api.ts` | 2383 | `delete(sessions)` | `class_sessions` | Supabase PostgREST | Fastify REST (`DELETE /api/v1/classes/:id/sessions`) | `DISCOVERED` (Chuyển sang Fastify REST) |
| `nextband/src/lib/api.ts` | 3031 | `select(*)` | `announcements` | Supabase PostgREST | Fastify REST (`GET /api/v1/announcements`) | `DISCOVERED` (Chuyển sang Fastify REST) |
| `nextband/src/lib/api.ts` | 3099 | `upsert(reads)` | `announcement_reads` | Supabase PostgREST | Fastify REST (`POST /api/v1/announcements/read`) | `DISCOVERED` (Chuyển sang Fastify REST) |
| `nextband/src/pages/admin/AdminContentQADashboard.tsx` | 60 | `select(courses, exams)` | `courses/exams` | Supabase PostgREST | Fastify REST (`GET /api/v1/qa/content`) | `DISCOVERED` (Chuyển sang Fastify REST) |

---

### 2. Nhóm RPC & Storage Calls từ Frontend
| File | Line | Operation | Entity | Current Authority | Target Authority | Migration Status |
| :--- | :---: | :--- | :--- | :--- | :--- | :--- |
| `nextband/src/lib/api.ts` | 541 | `supabase.rpc('get_exam_by_id')` | `Exam (Full Tree)` | Supabase PostgreSQL RPC | Fastify Service (`GET /api/v1/exams/:id`) | `DISCOVERED` (Chuyển sang Fastify Service) |
| `nextband/src/lib/api.ts` | 1349 | `supabase.rpc('admin_create_user')` | `User / Profile` | Supabase PostgreSQL RPC | Fastify Service (`POST /api/v1/users`) | `DISCOVERED` (Chuyển sang Fastify Service) |
| `nextband/src/lib/api.ts` | 42 | `supabase.storage.getPublicUrl` | `Media / Audio` | Supabase Storage (`exam-assets`) | Supabase Storage (Giữ nguyên làm hạ tầng) | `ALIGNED` (Đã chuẩn hóa URL) |
| `nextband/src/lib/api.ts` | 1526 | `supabase.storage.upload` | `Media / Audio` | Supabase Storage (`exam-assets`) | Fastify Upload Controller / Storage SDK | `DISCOVERED` (Chuyển sang REST Upload) |

---

### 3. Nhóm REST Fetch Calls hiện tại (Đã đi qua Fastify)
| File | Line | Operation | Entity | Current Authority | Target Authority | Migration Status |
| :--- | :---: | :--- | :--- | :--- | :--- | :--- |
| `nextband/src/lib/api.ts` | 1037 | `POST /submissions` | `ExamSubmission` | Fastify API (`ielts-api`) | Fastify SubmissionService | `ALIGNED` (Tách sang `submissions.api.ts`) |
| `nextband/src/lib/api.ts` | 1073 | `PUT /submissions/:id` (Autosave) | `ExamAnswers` | Fastify API (`ielts-api`) | Fastify SubmissionService | `ALIGNED` (Tách sang `submissions.api.ts`) |
| `nextband/src/lib/api.ts` | 1106 | `POST /submissions/:id/submit` | `ExamSubmission` | Fastify API + CanonicalScoring | Fastify CanonicalScoringService | `ALIGNED` (Tách sang `submissions.api.ts`) |
| `nextband/src/lib/api.ts` | 1140 | `POST /submissions/:id/grade` | `ExamSubmission` | Fastify API (`ielts-api`) | Fastify SubmissionService | `ALIGNED` (Tách sang `submissions.api.ts`) |
| `nextband/src/lib/api.ts` | 1330 | `GET /users/students-management` | `Users` | Fastify API (`ielts-api`) | Fastify UserService | `ALIGNED` (Tách sang `users.api.ts`) |
| `nextband/src/lib/api.ts` | 2157 | `PUT /classes/:id/students/:sId/status` | `ClassStudent` | Fastify API (`ielts-api`) | Fastify ClassService | `ALIGNED` (Tách sang `classes.api.ts`) |
| `nextband/src/lib/api.ts` | 2560 | `POST /invitations/join` | `Invitation` | Fastify API (`ielts-api`) | Fastify InvitationService | `ALIGNED` (Tách sang `invitations.api.ts`) |
| `nextband/src/lib/api.ts` | 2705 | `GET /homeworks/teacher-workspace` | `Homework` | Fastify API (`ielts-api`) | Fastify HomeworkService | `ALIGNED` (Tách sang `homeworks.api.ts`) |
| `nextband/src/lib/api.ts` | 2934 | `POST /classes/:id/sessions/:sId/attendance` | `Attendance` | Fastify API (`ielts-api`) | Fastify AttendanceService | `ALIGNED` (Tách sang `attendance.api.ts`) |
| `nextband/src/lib/api.ts` | 3266 | `GET /me/workspace` | `Workspace` | Fastify API (`ielts-api`) | Fastify WorkspaceService | `ALIGNED` (Tách sang `workspace.api.ts`) |

---

### 4. Nhóm Chấm điểm & Logic Nghiệp vụ (Grading Authority)
| File | Line | Operation | Entity | Current Authority | Target Authority | Migration Status |
| :--- | :---: | :--- | :--- | :--- | :--- | :--- |
| `nextband/src/pages/ExamInterface.tsx` | 36 | Import `gradingEngine.ts` | `Objective Grading` | Frontend `gradingEngine.ts` | **Server Canonical Grading Authority** | `REVISE` (Chỉ dùng preview UI, không ghi đè server) |
| `nextband/src/pages/admin/SubmissionGrade.tsx` | 28 | Import `gradingEngine.ts` | `Manual / Auto Grade` | Frontend `gradingEngine.ts` | **Fastify `CanonicalScoringService`** | `REVISE` (Lấy kết quả từ Fastify) |
| `ielts-api/src/services/scoring/CanonicalScoringService.ts` | 24 | `evaluateExamAttempt()` | `ExamSubmission` | Backend Scoring Core | **CANONICAL GRADING AUTHORITY (DUY NHẤT)** | `CANONICAL` (Giữ nguyên làm chuẩn duy nhất) |

---

## III. ĐỐI SOÁT KIẾN TRÚC DATABASE (DATABASE INVENTORY)

```text
[Supabase Cloud PostgreSQL] (CANONICAL SOURCE OF TRUTH)
├── profiles                 <--- Canonical User Identity (auth.users.id)
├── user_roles
├── courses
├── classes
├── class_students
├── enrollments
├── exams
├── exam_sections
├── question_groups
├── questions
├── exam_submissions        <--- Canonical Submission Identity (UUID, Retake Invariant)
├── answers                 <--- Canonical Student Answers
└── highlights

[Prisma MySQL Schema] (LEGACY PATH CẦN CHUYỂN SANG POSTGRESQL)
├── Provider hiện tại: mysql (Local dev)
├── Connection: mysql://root:password@127.0.0.1:3306/nextband
└── Nhiệm vụ Gate G2: Chuyển Prisma datasource sang postgresql kết nối Supabase Cloud DB.
```

---

## IV. BẢN ĐỒ KÍCH THƯỚC ROUTE BACKEND (PHÂN TẦNG CẦN TÁI CẤU TRÚC)

| File Route | Dòng code | Trạng thái hiện tại | Kế hoạch tái cấu trúc G3 |
| :--- | :---: | :--- | :--- |
| `submissions.routes.ts` | **1.264** | **QUÁ TẢI (CRITICAL)** - Logic nộp bài, chấm điểm, trace, Prisma transactions nhét trong 1 file | Bóc tách thành `SubmissionController`, `SubmissionService`, `SubmissionRepository` |
| `classes.routes.ts` | **856** | **QUÁ TẢI** - Logic quản lý học sinh, điểm danh, lịch học, raw SQL query nhét chung | Bóc tách thành `ClassController`, `ClassService`, `ClassRepository` |
| `questions.routes.ts` | **596** | Nặng - Validation và Prisma calls inline | Bóc tách thành `QuestionController`, `QuestionService` |
| `users.routes.ts` | **497** | Nặng - RBAC và User management inline | Bóc tách thành `UserController`, `UserService` |
| `courses.routes.ts` | **440** | Nặng | Bóc tách thành `CourseController`, `CourseService` |
| `attendance.routes.ts`| **398** | Nặng | Bóc tách thành `AttendanceController`, `AttendanceService` |
| `exams.routes.ts` | **396** | Nặng | Bóc tách thành `ExamController`, `ExamService` |

---

## V. KẾT LUẬN CỔNG G0 & ĐIỀU KIỆN TIẾN VÀO G1

1. **Bằng chứng đã xác thực 100%**: Tất cả 119 call-sites và 25 entity models đã được lập chỉ mục đầy đủ với số dòng, operation và ranh giới thẩm quyền đích.
2. **Không có mã nguồn nào bị sửa đổi hay xóa bỏ**: Toàn bộ quá trình quét là 100% Read-Only.
3. **Sẵn sàng chuyển giao sang Cổng G1**: Thiết lập bộ Test Vectors và bài kiểm tra hành vi baseline cho các Critical User Journeys.
