# Risk Register (Sổ Quản Lý Rủi Ro Kiến Trúc)

Tài liệu này ghi nhận công khai các **Rủi Ro Kiến Trúc (Active Architectural Risks)** trong hệ thống.

---

## ACTIVE ARCHITECTURAL RISKS

### RSK-001: Supabase Row Level Security (RLS) Policy Over-permissiveness
- **Edge Affected**: All Edges
- **Impact**: CRITICAL
- **Likelihood**: MEDIUM
- **Priority**: P1 (Tier 0 Blocking)
- **Description**: RLS policies trên Supabase chưa được kiểm thử toàn diện, có nguy cơ Học viên truy cập/sửa bài nộp hoặc điểm số của học viên khác.
- **Mitigation Strategy**: Thực hiện Sprint 3 Security Audit với bộ test phân quyền RLS.

### RSK-002: Foreign Key Identity Mismatch on User Profiles
- **Edge Affected**: `EDGE-002` (User -> Class)
- **Impact**: HIGH
- **Likelihood**: HIGH
- **Priority**: P1 (Tier 0 Blocking)
- **Description**: Frontend DTO truyền `profiles.id` thay vì `profiles.user_id` gây ra lỗi vi phạm khóa ngoại `classes_teacher_id_fkey`.
- **Mitigation Strategy**: Ép kiểu `targetId = p.user_id || p.id` trong `usersApi.list` (Đã xác minh `VERIFIED`).

### RSK-003: PostgREST Relational Embed HTTP 400 Bad Request
- **Edge Affected**: `EDGE-002` (User -> UserRole)
- **Impact**: HIGH
- **Likelihood**: HIGH
- **Priority**: P1 (Tier 0 Blocking)
- **Description**: PostgREST Schema Cache không nhúng được quan hệ `user_roles(role)` trực tiếp gây ra lỗi HTTP 400 và kẹt React Query spinner.
- **Mitigation Strategy**: Áp dụng `INV-I03`: Tách query lấy role riêng biệt (Đã xác minh `VERIFIED`).

### RSK-004: Missing `course_id` Column on Physical Class Table
- **Edge Affected**: `EDGE-001` (Course -> Class)
- **Impact**: CRITICAL
- **Likelihood**: HIGH
- **Priority**: P1 (Tier 0 Blocking)
- **Description**: Bảng `classes` trên Supabase Cloud thiếu cột `course_id` gây nghẽn luồng tạo Lớp học.
- **Mitigation Strategy**: Đã thực thi SQL DDL `ALTER TABLE classes ADD COLUMN course_id uuid REFERENCES courses(id)` (Đã xác minh `VERIFIED`).
