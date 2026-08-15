# Architecture Decision Records (ADR - Nhật Ký Quyết Định Kiến Trúc)

Tài liệu này ghi lại toàn bộ các **Quyết định Kiến trúc Tối cao (ADRs)** của hệ thống IELTS NextBand, giải thích rõ lý do tại sao một thiết kế lại được lựa chọn để ngăn ngừa rủi ro tái phá vỡ kiến trúc trong tương lai.

---

## ADR-001: Ràng buộc Giáo viên (`classes.teacher_id`) phải tham chiếu `profiles.user_id`
- **Bối cảnh (Context)**: Bảng `profiles` chứa 2 cột định danh: `id` (ID ngẫu nhiên của hồ sơ) và `user_id` (ID liên kết trực tiếp với tài khoản Auth trong `auth.users`).
- **Quyết định (Decision)**: Mọi tham chiếu Giáo viên (`classes.teacher_id`, `class_attendance.teacher_id`) **BẮT BUỘC** phải tham chiếu `profiles.user_id`.
- **Lý do (Rationale)**: `user_id` là định danh khóa ngoại thống nhất trên toàn hệ thống Supabase Auth và PostgreSQL security execution context. Việc tham chiếu `profiles.id` sẽ gây lỗi vi phạm khóa ngoại `classes_teacher_id_fkey` khi thao tác CSDL.
- **Hệ quả (Consequences)**: Tất cả API Client DTO (ví dụ `usersApi.list`) phải luôn map `id: p.user_id`.

---

## ADR-002: Bắt buộc Lớp học (`Class`) phải phụ thuộc Khóa học (`Course`)
- **Bối cảnh**: Hệ thống cần quản lý Lớp học thực tế mở theo các Chương trình đào tạo chuẩn (STARTER, MASTER, LEADER...).
- **Quyết định (Decision)**: Bảng `classes` bắt buộc có cột `course_id uuid REFERENCES public.courses(id)`.
- **Lý do (Rationale)**: Nếu Lớp học độc lập không có `course_id`, hệ thống không thể kéo danh sách Bài học mẫu (`Lesson`) của Khóa học gốc vào danh sách Buổi học thực tế (`ClassSession`).
- **Hệ quả (Consequences)**: Popup tạo Lớp học trên UI bắt buộc có trường `Khóa học *`.

---

## ADR-003: Sử dụng PostgreSQL RPC (Security Definer) cho thao tác Tạo Tài khoản Chức năng
- **Bối cảnh**: Khi Admin tạo tài khoản Giáo viên/Học viên mới, dữ liệu phải ghi đồng thời vào 3 bảng (`auth.users`, `public.profiles`, `public.user_roles`).
- **Quyết định (Decision)**: Sử dụng duy nhất thủ tục RPC `admin_create_user` (Security Definer).
- **Lý do (Rationale)**: Đảm bảo tính nguyên tử (Atomic Transaction): Cả 3 bảng cùng tạo thành công hoặc cùng Rollback nếu gặp lỗi, đồng thời tuân thủ chính sách bảo mật không cấp quyền ghi trực tiếp vào `auth.users` cho Frontend.
- **Hệ quả (Consequences)**: Loại bỏ các mã lệnh chèn lẻ tẻ từ Frontend.

---

## ADR-004: Tách truy vấn Nhúng Quan hệ (PostgREST Embedding) trong SDK Client
- **Bối cảnh**: Cú pháp `select("*, user_roles(role)")` từ SDK Supabase Client gây ra lỗi `HTTP 400 Bad Request` do vướng chính sách PostgREST Schema Cache.
- **Quyết định (Decision)**: Tách thành 2 bước truy vấn độc lập: Lấy danh sách ID từ `user_roles` trước, sau đó query `profiles.in("user_id", allowedUserIds)`.
- **Lý do (Rationale)**: Giúp câu lệnh REST API minh bạch, tối ưu tốc độ và không bị treo socket.

---

## ADR-005: Thống nhất Định danh Học viên (`class_students.student_id`) tham chiếu Canonical User ID (`profiles.user_id`)
- **Bối cảnh**: Bảng `profiles` chứa 2 cột định danh `id` (Profile PK) và `user_id` (Auth ID). Bảng `user_roles` và Supabase Auth Security context làm việc trực tiếp trên `auth.users.id` (`profiles.user_id`).
- **Quyết định (Decision)**: Mọi bảng tham chiếu Học viên (`class_students.student_id`, `class_attendance.student_id`, `exam_submissions.student_id`) **BẮT BUỘC** lưu Canonical User ID (`profiles.user_id`).
- **Lý do (Rationale)**: `profiles.user_id` là định danh duy nhất liên kết 1:1 với Supabase `auth.users.id` và hàm phân quyền Postgres `has_role(auth.uid(), ...)`.
- **Hệ quả (Consequences)**: Tất cả API Client DTO (`usersApi.list`, `classesApi.addStudents`) luôn truyền `user_id` chuẩn làm primary identifier cho UI.

---

## ADR-006: Nghiêm cấm Bypass Mapper trong Tầng API Mutation (Strict Data Contract Boundary)
- **Bối cảnh (Context)**: Việc truyền nguyên khối object Frontend (`camelCase`) hoặc biến `any` trực tiếp vào các lệnh `.insert()`, `.update()`, `.upsert()` của Supabase Client gây ra lỗi đứt gãy schema (ví dụ: lỗi `audioUrl` không tìm thấy trên bảng `question_groups`).
- **Quyết định (Decision)**: **NGHIÊM CẤM** gọi `.update(frontendObject)` hoặc `.insert(frontendObject)` trực tiếp. Tất cả các mutation trong `src/lib/api.ts` **BẮT BUỘC** phải đi qua Explicit DTO Transformer (`camelCase` UI Model ➔ `snake_case` DB DTO).
- **Lý do (Rationale)**: Bảo vệ hệ thống khỏi các biến UI rác (`isExpanded`, `isSelected`, `previewUrl`) lọt xuống Database và ngăn ngừa rủi ro SQL Schema Cache Incompatibility.
- **Hệ quả (Consequences)**: Mọi hàm mutation API phải khai báo interface DTO rõ ràng (`UpdateQuestionGroupPayload`, `UpdateQuestionPayload`,...) và tự chịu trách nhiệm map thuộc tính.

---

## ADR-007: Thống nhất Canonical Identity toàn hệ thống (`auth.users.id` ↔ `profiles.user_id`)
- **Bối cảnh (Context)**: Bảng `profiles` tồn tại 2 trường UUID (`id` và `user_id`). Việc nhầm lẫn giữa 2 ID này gây nguy cơ vi phạm khóa ngoại ở các bảng nghiệp vụ.
- **Quyết định (Decision)**: **`auth.users.id` (`profiles.user_id`) là Canonical User ID DUY NHẤT** trên toàn hệ thống NextBand. `profiles.id` chỉ đóng vai trò làm Khóa chính đĩa của bảng Record, không được dùng làm tham chiếu nghiệp vụ.
- **Lý do (Rationale)**: Tất cả 100% Khóa ngoại (`classes.teacher_id`, `class_students.student_id`, `enrollments.student_id`, `exam_submissions.student_id`) đều trỏ về `auth.users.id`.
- **Hệ quả (Consequences)**: API DTO `usersApi.list()` gán `id = p.user_id` để đảm bảo Frontend UI luôn sử dụng duy nhất 1 ID chuẩn.

---

## ADR-008: Chuẩn hóa Boundary cho Tầng Đọc Dữ liệu (Read Model Boundary)
- **Bối cảnh (Context)**: Database trả dữ liệu dạng `snake_case` (`audio_url`, `section_type`, `order_index`), khiến các React Component phải dùng vô số fallback đúp `group.audioUrl || group.audio_url`.
- **Quyết định (Decision)**: Tất cả các API đọc dữ liệu (`sectionsApi.getById`, `coursesApi.getById`, `examsApi.getById`) **BẮT BUỘC** phải trả về Frontend Model chuẩn `camelCase` thuần túy qua hàm Data Normalizer độc lập (`normalizeSectionData`, `normalizeCourseData`).
- **Lý do (Rationale)**: Cách ly React Component khỏi Database Schema, giúp code UI sạch sẽ và loại bỏ nguy cơ ghi đè dữ liệu rỗng do đọc sót thuộc tính.
- **Hệ quả (Consequences)**: Loại bỏ toàn bộ các fallback OR expressions `foo.camel || foo_snake` trên UI.

---

## ADR-009: Quy chuẩn Xử lý Media URL và Tải nguyên File (Storage & Media Contract)
- **Bối cảnh (Context)**: Hệ thống kế thừa các đường dẫn tương đối cũ (`/uploads/audio/...`) từ VPS cũ.
- **Quyết định (Decision)**: 
  1. Frontend và Read Mapper **BẮT BUỘC** đi qua hàm `formatStorageUrl` để quy đổi URL tương đối thành Supabase Storage Bucket Public URL.
  2. **Bảo tồn tuyệt đối** các DB Reference hiện tại trong Database (Không tự ý xóa hay overwrite URL khi chưa có quy trình Verification).
  3. Mọi rủi ro thiếu file (ví dụ `RISK-D01`: Missing Storage Object ở ID `3566e75f...`) phải được ghi nhận vào Risk Register để quản lý độc lập.

---

## ADR-010: Phân Định Tuyệt Đối Đường Dẫn Tĩnh & Dynamic Route Parameter (Parametric Route Disambiguation)
- **Bối cảnh (Context)**: Router Fastify/Nginx xảy ra hiện tượng Parametric Shadowing: khi request `GET /classes/my-classes` được gửi lên server phiên bản cũ hoặc router có tham số `/:id`, router gán `id = "my-classes"`, gọi hàm `getClassById` tìm kiếm ID `"my-classes"` trong DB, dẫn đến lỗi `404 Không tìm thấy lớp học` giả mạo.
- **Quyết định (Decision)**: 
  1. Mọi endpoint tĩnh (`/my-classes`, `/stats`, `/search`) **BẮT BUỘC** đăng ký trước `/:id`.
  2. Mọi dynamic parameter `/:id` **BẮT BUỘC** có validation guard (Zod `.uuid()` / Regex UUID) để router tự động từ chối các chuỗi không phải UUID thay vì query CSDL.
- **Hệ quả (Consequences)**: Loại bỏ hoàn toàn nguy cơ nuốt route tĩnh và chặn đứng lỗi 404 giả.

---

## ADR-011: Chiến Lược Tự Phục Hồi Hai Tầng (Dual-Tier Resilience Fallback Pattern) Cho Kiến Trúc Lai
- **Bối cảnh (Context)**: Trong kiến trúc lai (Frontend Vercel + Backend Fastify VPS + Database Supabase), chu kỳ triển khai giữa Frontend và Backend diễn ra bất đồng bộ. Khi Frontend gọi endpoint mới mà Backend đang reload hoặc chưa cập nhật, Frontend dễ bị crash hoặc kẹt ở Error Banner.
- **Quyết định (Decision)**: 
  1. Tầng API Client (`classStudentsApi`, `sessionsApi`,...) **BẮT BUỘC** áp dụng mô hình **Dual-Tier Resilience**: Ưu tiên gọi REST API Gateway; nếu Gateway trả về lỗi kết nối, `404`, `502`, `503`, client tự động Fallback xuống truy vấn trực tiếp bảng Supabase tương ứng.
  2. UI **TUYỆT ĐỐI KHÔNG HIỂN THỊ ERROR BANNER** nếu tầng Fallback vẫn cung cấp được dữ liệu hợp lệ.
- **Hệ quả (Consequences)**: Hệ thống đạt độ sẵn sàng cao (High Availability), trải nghiệm người dùng không bị gián đoạn ngay cả khi Backend gặp sự cố hoặc đang deploy.

---

## ADR-012: Phân Tách Ngữ Cảnh Vai Trò & Điều Hướng Thích Ứng (Role-Aware Context Guard)
- **Bối cảnh (Context)**: Khi Admin (`admin@ielts.com`) hoặc Giáo viên truy cập vào view Học viên (`/` Bài tập), do tài khoản không có bản ghi trong `class_students`, State Machine nhận diện thành 0 lớp học và hiển thị thông báo lỗi hoặc làm Admin bối rối.
- **Quyết định (Decision)**: 
  1. Nhận diện ngữ cảnh vai trò (`useAuth`) tại mọi view đặc thù.
  2. Khi Admin / Giáo viên ở view Học viên, UI tự động hiển thị **Thanh Điều Hướng Ngữ Cảnh (Role-Aware Shortcut Bar)** dẫn thẳng tới `/admin/classes` hoặc `/admin/teacher-workspace`.
- **Hệ quả (Consequences)**: Trải nghiệm mượt mà, phân định rõ ràng giữa "Học viên chưa ghi danh" và "Tài khoản đặc quyền đang kiểm tra hệ thống".


