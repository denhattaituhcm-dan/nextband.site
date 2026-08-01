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
