# RANH GIỚI MODULE — NEXTBAND IELTS LMS (MODULE BOUNDARIES)

> **Mục tiêu:** Định nghĩa rõ quyền hạn, nơi chứa logic, luồng truy cập dữ liệu, quan hệ phụ thuộc hợp lệ và các kiểm thử hồi quy bắt buộc cho từng domain.

---

## 1. TỔNG QUAN NGUYÊN TẮC RANH GIỚI

- **Single Channel API Rule (Gate 5):** Tầng Frontend UI tuyệt đối không được truy vấn trực tiếp cơ sở dữ liệu qua Prisma hoặc gọi trực tiếp bảng Supabase. Mọi thao tác bắt buộc phải thông qua `@/lib/api/*`.
- **DAG Rule (Gate 1):** Luồng dependency luôn là một chiều (`UI -> API Client -> Fastify Gateway -> Service -> Database`). Cấm tuyệt đối import ngược hoặc tạo phụ thuộc vòng (*Circular Dependency*).
- **Facade Pattern:** Tầng frontend giao tiếp qua `@/lib/api.ts` (Facade). Các domain tách ra tại `api/domains/<domain>.api.ts` chỉ được import từ `../client`, không được import ngược lại `api.ts`.

---

## 2. RANH GIỚI CHI TIẾT TỪNG DOMAIN

### 2.1. API Client Layer (`nextband/src/lib/api.ts` & `nextband/src/lib/api/domains/`)
- **Trách nhiệm:** Điểm trung gian duy nhất đóng gói các cuộc gọi HTTP REST tới Backend Fastify Gateway.
- **Entry point:** [`nextband/src/lib/api.ts`](file:///d:/handover/ielts/nextband/src/lib/api.ts) và [`nextband/src/lib/api/client.ts`](file:///d:/handover/ielts/nextband/src/lib/api/client.ts).
- **Nơi chứa logic:** Xử lý chuyển đổi request/response, gắn Bearer token và mapping lỗi người dùng bằng tiếng Việt.
- **Dependency được phép:** `client.ts`, `../../supabase` (chỉ lấy session token).
- **Dependency bị cấm:** Tuyệt đối không import bất kỳ UI component hay hook nào từ `components/`, `pages/`, `features/`.
- **Test bắt buộc khi thay đổi:** `node scripts/sanity_check.mjs`, `npx madge --circular --extensions ts server/ nextband/src/`.

---

### 2.2. Reading Challenge Feature (`nextband/src/features/reading-challenge/`)
- **Trách nhiệm:** Trải nghiệm đọc hiểu tương tác, giải nghĩa từ vựng chuyên sâu theo từng Unit bài đọc.
- **Entry point:** [`nextband/src/features/reading-challenge/pages/ChallengeUnitPage.tsx`](file:///d:/handover/ielts/nextband/src/features/reading-challenge/pages/ChallengeUnitPage.tsx).
- **Nơi chứa logic:** Hooks cục bộ (`useUnitProgress.ts`, `useReadingDictionary.ts`). Dữ liệu tĩnh nằm tại `nextband/src/data/reading/`.
- **Nơi sở hữu dữ liệu:** LocalStorage kết hợp sync tiến độ qua `classesApi` / `studentPracticeApi`.
- **Dependency được phép:** UI primitives (`components/ui/*`), `@/lib/api`.
- **Dependency bị cấm:** Không can thiệp hoặc import chéo các service nội bộ của Exam hay Arena.
- **Test bắt buộc:** `npm run typecheck`, kiểm thử hiển thị bài đọc.

---

### 2.3. Reading Case Autopsy (`nextband/src/pages/public/reading/ReadingCasePage.tsx`)
- **Trách nhiệm:** Giải phẫu bẫy đề thi đọc IELTS (Case Studies), phân tích logic suy luận và giải thích bẫy đáp án.
- **Entry point:** `ReadingCasePage.tsx`.
- **Nơi chứa logic:** Thuật toán phân tích câu bẫy tĩnh và hiển thị trực quan cấu trúc câu.
- **Dependency được phép:** `@/components/ui/*`, `@/lib/utils.ts`.
- **Dependency bị cấm:** Không sửa đổi shared network primitives để phục vụ định dạng bài đọc.

---

### 2.4. English Idioms Catalog (`nextband/src/data/idioms/` & `EnglishIdiomsHubPage.tsx`)
- **Trách nhiệm:** Tra cứu và luyện tập thành ngữ tiếng Anh theo chủ đề có chia band điểm.
- **Entry point:** `EnglishIdiomsHubPage.tsx`.
- **Nơi chứa logic:** Dữ liệu chuẩn hóa trong `nextband/src/data/idioms/unit*.ts`.
- **Dependency được phép:** Thành phần UI công khai.
- **Dependency bị cấm:** Không can thiệp vào luồng chấm thi chính khóa.

---

### 2.5. Phòng thi đấu trực tiếp (Game Arena)
- **Trách nhiệm:** Tạo phòng thi đấu trắc nghiệm trực tiếp giữa các học viên theo thời gian thực (Host & Player).
- **Entry points:** `ArenaHostPage.tsx`, `ArenaPlayPage.tsx`, [`server/routes/arena.routes.ts`](file:///d:/handover/ielts/server/routes/arena.routes.ts).
- **Nơi chứa logic:** [`server/services/arena.service.ts`](file:///d:/handover/ielts/server/services/arena.service.ts).
- **Sở hữu dữ liệu:** Bảng `ArenaRoom`, `ArenaParticipant`, `ArenaAnswer` trong database.
- **Kênh truyền dẫn:** Fastify REST API kết hợp Supabase Realtime WebSocket broadcast.
- **Dependency bị cấm:** Không được tự ý xóa hoặc thay đổi trực tiếp học viên trong các bảng `ClassStudent` khi học viên tham gia phòng Arena.
- **Test bắt buộc:** `npx vitest run server/tests/` (liên quan đến arena).

---

### 2.6. Khảo thí & Chấm điểm IELTS (Exam & Canonical Scoring)
- **Trách nhiệm:** Làm bài thi (Listening, Reading, Writing, Speaking), tự động lưu nháp, nộp bài và chấm điểm theo thang điểm IELTS chuẩn hóa.
- **Entry points:** `ExamInterface.tsx`, `SubmissionGrade.tsx`, `server/routes/exam.routes.ts`, `server/routes/submission.routes.ts`.
- **Nơi chứa logic:** [`server/services/scoring/ieltsCanonicalEngine.ts`](file:///d:/handover/ielts/server/services/scoring/ieltsCanonicalEngine.ts), `ieltsWritingGrader.ts`.
- **Sở hữu dữ liệu:** `Exam`, `Section`, `Question`, `Submission`, `Answer` trong PostgreSQL.
- **Quy tắc bất di bất dịch:** Thang điểm, thuật toán chấm band score và tính toán `effectiveDeadline` phải tập trung ở backend Service, không được tính toán tùy tiện ở UI.
- **Test bắt buộc:** `npm --prefix nextband run test -- src/test/classContext.unit.test.ts`, các bài test chấm thi trong `server/tests/`.

---

### 2.7. Vận hành lớp học (Class Operations)
- **Trách nhiệm:** Quản lý cơ sở (`branches`), phòng học (`rooms`), phân công giáo viên, quản lý điểm danh, nhắc bài tập và học phí.
- **Entry points:** `ClassWorkspace/`, `Classes.tsx`, `server/routes/classes.routes.ts`.
- **Nơi chứa logic:** [`server/services/class.service.ts`](file:///d:/handover/ielts/server/services/class.service.ts), `room.service.ts`, `branch.service.ts`.
- **Sở hữu dữ liệu:** `Branch`, `Room`, `Class`, `ClassSchedule`, `ClassStudent`.
- **Test bắt buộc:** `server/tests/op_gap_03_room_collision.test.ts`.
