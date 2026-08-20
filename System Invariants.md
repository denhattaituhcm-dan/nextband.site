# System Invariants & Integration Contract (Hợp Đồng Kiến Trúc & Quy Tắc Bất Biến)

Tài liệu này đóng vai trò là **Hợp Đồng Kiến Trúc (Architecture Contract)** tối cao của hệ thống IELTS NextBand. 
Mọi thay đổi về Mã nguồn UI, API DTO, hay Database Schema **BẮT BUỘC** phải tuân thủ và xác minh qua phương pháp kiểm thử tương ứng.

---

## 1.1 SYSTEM INVARIANT CORE-008: CANONICAL IDENTITY & ENROLLMENT DISAMBIGUATION

- **Quy tắc Tối cao (Supreme Invariant)**:
  - **`studentId` (Canonical Student Identity ID)**: BẮT BUỘC lưu `profiles.user_id` / `auth.users.id` (Auth UID). Mọi bảng quan hệ (`class_students.student_id`, `class_attendance.student_id`, `exam_submissions.student_id`, `submissions.student_id`) BẮT BUỘC trỏ về `profiles.user_id`.
  - **`enrollmentId` (Enrollment Record ID)**: BẮT BUỘC là `class_students.id` (Khóa chính của bản ghi ghi danh).
- **Phân định Tuyệt đối (Absolute Separation)**:
  - $studentId \neq enrollmentId$ trên mọi môi trường và mọi cơ sở dữ liệu.
  - Tuyệt đối cấm dùng tên chung là `id` trong các DTO có chứa cả hai khái niệm.
  - Tuyệt đối cấm so sánh chéo `st.id === s.student_id` (so khớp `enrollmentId` với `studentId` luôn thất bại tại runtime).
- **Nguyên tắc Toàn vẹn DTO**:
  - `CanonicalStudentDTO` phải định nghĩa rõ ràng `enrollmentId: string` và `studentId: string`.
  - Nghiêm cấm dùng chuỗi fallback `s.user_id || s.id` để tránh nhầm lẫn giữa Auth UID và Record ID.

---

## 1.2 SYSTEM INVARIANT CORE-009: DUAL-TIER RESILIENCE & N-1 VERSION DEGRADATION CONTRACT

- **Quy tắc Tự Phục Hồi Hai Tầng**:
  - Tầng 1 (REST Gateway) và Tầng 2 (Supabase Direct) phải được bao bọc trong cấu trúc `try-catch` tự phục hồi tại mọi API Client wrapper (`classStudentsApi`, `sessionsApi`, `homeworksApi`).
  - Nếu Tầng 1 trả về mã lỗi `404`, `502`, `503` hoặc Timeout, API Client **BẮT BUỘC** thực thi Tầng 2 trước khi quyết định trả về `API_ERROR` / `NETWORK_ERROR`.
  - **Cấm Báo Lỗi Toàn Màn Hình Khi Còn Dữ Liệu Tầng 2**: UI không được hiển thị Error Banner chặn người dùng nếu tầng dự phòng Supabase trả về dữ liệu hợp lệ.

---

## 1.3 SYSTEM INVARIANT CORE-010: PARAMETRIC ROUTE DISAMBIGUATION & SCHEMA VALIDATION GUARD

- **Quy tắc Phân Định Tuyệt Đối Đường Dẫn**:
  - Mọi dynamic parametric route (`/:id`, `/:classId`) **BẮT BUỘC** đăng ký SAU tất cả các static sub-resource endpoints (`/my-classes`, `/stats`, `/search`).
  - Mọi dynamic parameter **BẮT BUỘC** kiểm tra định dạng UUID (`/^[0-9a-fA-F-]{36}$/`).
  - Tuyệt đối cấm để router chuyển tiếp một chuỗi tĩnh không hợp lệ xuống tầng Service gây lỗi `404 Not Found` giả.

---

## 1.4 SYSTEM INVARIANT CORE-011: ROLE-AWARE CONTEXT & MULTI-PERSONA COEXISTENCE

- **Quy tắc Ngữ Cảnh Vai Trò**:
  - Hệ thống phân biệt rõ: `Tài khoản chưa ghi danh` (Học viên mới) $\neq$ `Tài khoản Quản trị / Giáo viên`.
  - Khi Admin / Giáo viên truy cập vào view Học viên, UI **BẮT BUỘC** hiển thị Action Card điều hướng nhanh về Bàn làm việc Quản trị (`/admin/classes`, `/admin/teacher-workspace`), tuyệt đối không khóa màn hình hay báo lỗi không tìm thấy lớp.

---

## 1.5 SYSTEM INVARIANT CORE-012: ZERO-MOCK PRODUCTION & BUSINESS EVENT ATOMICITY

- **Quy tắc Cấm Mock Dữ Liệu & Tính Nguyên Tử Sự Kiện**:
  - Tuyệt đối không đưa dữ liệu giả lập/mock (`announcementsApi`, `alertsApi`, tin tức mẫu) lên môi trường Production. UI khi chưa có dữ liệu phải hiển thị Empty State chuẩn.
  - Mọi side-effect phát sinh từ sự kiện nghiệp vụ (sinh `Notification`, ghi `AuditLog`) **BẮT BUỘC** thực thi trong cùng một DB Transaction context (`$transaction` / `Prisma.TransactionClient`) với Business Entity chính.
  - Rollback nghiệp vụ chính $\rightarrow$ Bắt buộc rollback toàn bộ notification/side-effect đi kèm. Tuyệt đối không sinh thông báo mồ côi (Zero Phantom Notifications).

---

## 1.6 SYSTEM INVARIANT CORE-013: DATABASE-LEVEL EVENT IDEMPOTENCY & AUTHORITATIVE RECIPIENT

- **Quy tắc Chống Trùng Lặp CSDL & Xác Định Người Nhận Chuẩn Xác**:
  - Mọi bản ghi Notification/Event bắt buộc phải có Ràng buộc Idempotency tại tầng CSDL:
    ```sql
    UNIQUE INDEX `notifications_idempotency_idx` (`entity_type`, `entity_id`, `user_id`, `type`)
    ```
  - Tầng Service bắt buộc phải bắt mã lỗi `P2002` để bỏ qua an toàn hoặc dùng `createMany(skipDuplicates: true)` cho batch operations khi request bị retry.
  - Người nhận thông báo phải được xác định qua quan hệ miền dữ liệu chính thức (`Class.teacherId` cho giáo viên phụ trách, `ClassStudent.status = ACTIVE` cho học viên trong lớp), không để lập trình viên tự suy diễn.

---

## 1.7 SYSTEM INVARIANT CORE-014: FAILURE VISIBILITY & STRICT OBJECT-LEVEL AUTHORIZATION

- **Quy tắc Minh Bạch Trạng Thái Lỗi & Phân Quyền Cấp Bản Ghi**:
  - Cấm tuyệt đối hành vi nuốt mã lỗi HTTP 500/502/Network Error thành `{ count: 0 }` hay mảng rỗng. UI bắt buộc phải hiển thị Error Banner kèm nút "Thử lại".
  - Endpoint thông báo (`/notifications`, `/notifications/:id/read`, `/notifications/read-all`) **BẮT BUỘC** lấy quyền sở hữu từ JWT Auth Token (`request.user.id`). Cấm cho phép Frontend truyền `userId` qua query param hay đọc/sửa thông báo của tài khoản khác.

---

## 1.8 SYSTEM INVARIANT CORE-015: DESIGN SYSTEM SINGLE SOURCE OF TRUTH & PALETTE LOCKDOWN

- **Quy tắc Bất biến Khóa Bảng Màu & Mô Hình Token 3 Tầng**:
  - Toàn bộ UI tuân thủ mô hình 3-Tier Token: Tier 1 (Brand Primary bất biến về Hue), Tier 2 (Semantic `success`, `warning`, `destructive`, `info`), Tier 3 (Neutral Surface `background`, `card`, `border`, `muted`, `sidebar-*`).
  - `tailwind.config.ts` bắt buộc ghi đè map `colors` chỉ expose semantic tokens. Cấm lập trình viên và AI sử dụng các class màu thô (`text-blue-*`, `bg-emerald-*`, `text-amber-*`, `bg-teal-*`).
  - Mọi menu điều hướng (Client/Admin Sidebars, Header) bắt buộc dùng chung 1 Navigation State Contract (`bg-sidebar-accent text-sidebar-accent-foreground font-semibold` cho active state).

---

## 1.9 SYSTEM INVARIANT CORE-016: SINGLE LIFECYCLE STATE AUTHORITY & TRUTHFUL EMPTY STATE

- **Quy tắc Thẩm Quyền Vòng Đời Duy Nhất**:
  - Toàn bộ các component trong Student Portal (`ClientHeader`, `HomePage`, `StudentLessonViewerPage`) **BẮT BUỘC** đọc trạng thái học viên độc quyền từ hook tập trung `useStudentLifecycle`. Cấm các component tự gọi API riêng lẻ để suy đoán trạng thái.
  - Phân định rõ 5 trạng thái: `LOADING` (Skeleton, cấm flicker), `NETWORK_ERROR` (Error Banner + Retry), `API_ERROR` (Error Banner + Retry), `PRE_ENROLLMENT` (Empty State, CHỈ KHI Backend 200 + `data: []`), `ENROLLED` (Workspace đầy đủ).
  - Tuyệt đối cấm hiển thị *"Chưa có lớp học"* khi hệ thống đang loading hoặc gặp lỗi mạng/server.

---

## 1.10 SYSTEM INVARIANT CORE-017: MULTI-MODAL ACCESSIBILITY & UNIFIED NOTIFICATION PIPELINE

- **Quy tắc Badge Ngữ Nghĩa & Hợp Nhất Đường Ống Thông Báo**:
  - Màu sắc chỉ là tăng cường (Reinforcement), không bao giờ là kênh thông tin duy nhất. Mọi Badge trạng thái bắt buộc kết hợp: `Badge Semantic Variant` + `Lucide Icon` + `Text Rõ Ràng`. Cấm dùng emoji màu (`🟢`, `🟡`, `🔴`, `🔵`) giả icon.
  - Toàn bộ thông báo, việc cần xử lý và announcement bắt buộc đi qua đường ống duy nhất `notificationsApi`. Khi `markAsRead`, bắt buộc invalidate đồng thời `notifications-unread-count`, `notifications-list`, và `alerts-widget`.

---

## 1.11 SYSTEM INVARIANT CORE-018: QUESTION TYPE CONTRACT & STRICT SEMANTIC VALIDATION GUARD

- **Quy tắc Bất Biến Kiểu Câu Hỏi & Cổng Thẩm Định Ngữ Nghĩa**:
  - **No Fake MCQ Invariant**: Tuyệt đối không bản ghi `multiple_choice` nào được phép tồn tại trong CSDL với ít hơn 2 options có nội dung thực tế. Backend bắt buộc dùng Zod `.superRefine()` để từ chối với HTTP 400.
  - **No Leaked Options on Text Questions**: Các dạng `short_answer`, `essay`, `speaking`, `fill_blank`, `matching` bắt buộc lưu `options: null`.
  - **No Speculative Rendering**: Renderer không bao giờ tự đoán kiểu câu hỏi từ dữ liệu lỗi; nếu gặp bản ghi hỏng cấu trúc, phải hiển thị cảnh báo lỗi nội dung cô lập để bảo vệ tính toàn vẹn của các câu còn lại.

---

## 1.12 SYSTEM INVARIANT CORE-019: UNIFIED WRITING ANSWER BOX & VIEWPORT-CENTERED NAVIGATION

- **Quy tắc Khung Nhập Liệu Thống Nhất & Điều Hướng Đồng Bộ Trung Tâm Viewport**:
  - **Nội dung thay đổi, công cụ trả lời không thay đổi**: Mọi câu hỏi trả lời bằng văn bản (`short_answer`, `essay`, rewrite, translation, S-V) bắt buộc dùng chung component `WritingAnswerBox` với chiều cao chuẩn 5-6 dòng, đếm từ thực tế và chỉ báo lưu tự động.
  - **Sticky Group Context**: Header nhóm câu hỏi (`QuestionGroupHeader`) bắt buộc ghim nhẹ ở đầu khung nhìn khi cuộn trong phạm vi nhóm đó.
  - **Single Source of Truth Navigator**: `activeQuestionId` được xác định theo thời gian thực bởi câu hỏi nằm gần trục ngang trung tâm Viewport nhất, đảm bảo đồng bộ 2 chiều 100% giữa cuộn trang và thanh điều hướng.

---

## 1.13 SYSTEM INVARIANT CORE-020: PRE-MIGRATION HISTORICAL FORENSIC & LOCAL BUILD GATE

- **Quy tắc Điều Tra Pháp Y Trước Di Trú & Cổng Build Production**:
  - **Kiểm tra Lịch sử Bài Nộp**: Trước khi UPDATE/chuyển đổi `questionType` hàng loạt, bắt buộc kiểm tra xem có học viên nào đã làm bài hay chưa (`answers`, `submissions`) để bảo toàn dữ liệu lịch sử.
  - **Zero Blind Wipe**: Phải phân loại dữ liệu rác (`["", "", "", ""]`) vs dữ liệu thực trước khi dọn dẹp. Bắt buộc tái quét toàn bộ CSDL sau di trú.
  - **Local Build Gate**: Mọi thay đổi Frontend bắt buộc phải chạy và pass thành công lệnh build production (`npm run build`) trước khi hoàn thành task.

---

## 1.14 SYSTEM INVARIANT CORE-021: CANONICAL EXAM DOMAIN & ZERO-SHADOW DOMAIN ENFORCEMENT

- **Quy tắc Độc quyền Miền Khảo thí Chuẩn hóa**:
  - Mọi thao tác giao bài, làm bài, nộp bài, chấm điểm và sửa bài **BẮT BUỘC** tuân thủ chuỗi thực thể: `Class -> Course -> Exam -> ExamSubmission -> Answer`.
  - Nghiêm cấm tạo hoặc duy trì các thực thể song song (`homeworks`, `submissions`, `/homeworks/*`, `/me/workspace`).
  - Khi một endpoint hoặc model bị bãi bỏ, toàn bộ controller, service, repository, và API client liên quan phải được dọn dẹp triệt để (Zero Legacy Residue).

---

## 1.15 SYSTEM INVARIANT CORE-022: PURE ENROLLMENT LIFECYCLE & TERMINAL-STATE GUARANTEE

- **Quy tắc Vòng đời Ghi danh Độc lập & Bảo đảm Điểm Kết thúc**:
  - `useStudentLifecycle` chỉ được phép quản lý 4 trạng thái hữu hạn: `ENROLLED`, `NOT_ENROLLED`, `API_ERROR`, `NETWORK_ERROR`.
  - Cấm gộp việc fetch dữ liệu thứ cấp (KPI, workspace, tiến độ bài tập) vào lifecycle ghi danh.
  - Trạng thái `LOADING` bắt buộc phải chuyển sang một trạng thái kết thúc (Terminal State), không được phép treo màn hình trắng vô hạn khi sub-resource gặp sự cố.

---

## 1.16 SYSTEM INVARIANT CORE-023: ATTEMPT IMMUTABILITY & REVISION DATA ISOLATION

- **Quy tắc Bất biến Lịch sử Làm bài & Cách ly Bản sửa**:
  - Khi học viên nộp bài (`Attempt 1`) và giáo viên chấm điểm (`GRADED`), bản ghi `ExamSubmission` và các câu trả lời (`Answer`) của attempt đó chuyển sang trạng thái đóng băng (**Read-Only**).
  - Bản sửa bài (`Attempt 2+`) là một bản ghi `ExamSubmission` mới được tạo độc lập.
  - Câu trả lời của `Attempt 2` liên kết với `submission_id` mới và tuyệt đối không bao giờ được ghi đè (UPDATE) lên câu trả lời của `Attempt 1`.

---

## 1.17 SYSTEM INVARIANT CORE-024: STRICT BACKEND AUTHORITY & MUTATION IDEMPOTENCY

- **Quy tắc Thẩm quyền Backend Tuyệt đối & Chống Trùng lặp Đột biến**:
  - Mọi phán quyết về quyền truy cập, tính hợp lệ của bài nộp, và chuyển đổi trạng thái thuộc về Fastify Backend API. Cấm cơ chế client-side direct fallback can thiệp vào các giao dịch chấm nộp bài.
  - Mọi endpoint đột biến (`/submissions`, `/submissions/revision`, `/submit`, `/grade`) bắt buộc phải có **Idempotency Guard** ở tầng Backend để miễn nhiễm với race conditions và double-click.

---

## 1.18 SYSTEM INVARIANT CORE-025: LIVE RUNTIME INTEGRITY & ZERO-POISONED FALLBACK CONTRACT

- **Quy tắc Toàn vẹn Runtime & Chống Ngụy biện Mock Test**:
  - Mock Test Pass $\neq$ Live System Ready. Bắt buộc thực hiện đủ **3 Cấp độ Xác minh**: (1) Static Typecheck `tsc --noEmit`, (2) Automated Vitest Suite, (3) Live Runtime Port & HTTP Health Check (`/api/v1/health` $\rightarrow$ 200).
  - Tầng Fallback Supabase Direct khi Gateway không phản hồi **BẮT BUỘC** phải tuân thủ Schema vật lý thực tế. Tuyệt đối cấm viết câu PostgREST join suy đoán (`profiles!classes_teacher_id_fkey`) gây crash tầng Fallback.
  - Cấm kết luận "Hết lỗi" khi chưa chứng minh tiến trình Backend đang chạy thực tế.

---

## 1. PHÂN CẤP TIÊU CHUẨN TIER KIỂM TOÁN (TIERED AUDIT SYSTEM)

### Tier 0: Critical System Core (Release Blocking)
- **Entities / Edges**: `User`, `Role`, `Profile`, `Course`, `Class`, `Exam`, `ExamSubmission`, `Answer`.
- **Quy tắc**: Bắt buộc `PASS` 100% kiểm toán 12 điểm mới cho phép Release.

### Tier 1: Business Operations (Critical Operation)
- **Entities / Edges**: `Attendance`, `Schedule`, `Invitation`, `Lesson`.
- **Quy tắc**: Lỗi không làm sập hệ thống nhưng ảnh hưởng trải nghiệm vận hành.

### Tier 2: System Support (Nice to Verify)
- **Entities / Edges**: `SiteSettings`, `Logs`, `Notification Preferences`.

---

## 2. QUY TRÌNH KIỂM TOÁN CẠNH 12 ĐIỂM (12-POINT EDGE AUDIT PROTOCOL)

Mọi liên kết được chia thành **Structural Edge** (Khóa ngoại CSDL) và **Behavioral Edge** (Chuỗi Vận Hành). Mỗi Edge kiểm toán theo Checklist 12 điểm:

- [ ] 1. **Prisma Schema**: `Class.courseId` tồn tại chuẩn xác.
- [ ] 2. **SQL Migration**: File migration `ALTER TABLE` tồn tại.
- [ ] 3. **Live Database Column**: `information_schema.columns` khớp kiểu dữ liệu.
- [ ] 4. **Physical Foreign Key**: Ràng buộc `REFERENCES` tồn tại trong `information_schema.referential_constraints`.
- [ ] 5. **Indexes Existence**: Index tồn tại trên cột khóa ngoại (`pg_indexes`).
- [ ] 6. **API DTO Mapping**: Interface TypeScript khớp 1:1.
- [ ] 7. **API Payload Alignment**: Request Network payload trỏ đúng tên cột CSDL.
- [ ] 8. **UI Component Binding**: Form input bind đúng state và API parameters.
- [ ] 9. **Runtime Execution**: Lệnh khởi tạo/truy vấn chạy thành công (`200 OK` / `201 Created`).
- [ ] 10. **Delete & Cascade Behavior**: Hành vi `RESTRICT` / `CASCADE` / `SET NULL` xác minh đúng kỳ vọng.
- [ ] 11. **RLS & Security Isolation**: Phân quyền truy cập chính xác theo `State_and_Event_Flows.md`.
- [ ] 12. **Performance & Query Execution Plan**:JOIN Response Time `< 200ms` & có dùng Index.

---

## 3. BẢNG TRẠNG THÁI KIỂM TOÁN EDGE HỢP LỆ (VALID EDGE AUDIT STATES)

Báo cáo kiểm toán **TUYỆT ĐỐI KHÔNG DÙNG ĐIỂM TỔNG CỢT CẢM TÍNH (98/100)**. Mỗi Edge chỉ được đánh giá bằng 4 trạng thái minh bạch:

- 🟢 **Verified**: Đã có đầy đủ bằng chứng kiểm thử thực tế (SQL, Network, Live DB).
- 🟡 **Evidence Pending**: Đã thiết kế xong nhưng chưa chạy script xác minh.
- 🔴 **Broken**: Đã xác nhận phát sinh lỗi lệch tầng hoặc vi phạm constraint.
- ⚪ **Unknown**: Chưa có đủ thông tin / Chưa kiểm thử (Ghi nhận vào `Unknowns_Register.md`).
