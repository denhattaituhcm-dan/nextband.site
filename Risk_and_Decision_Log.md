# Risk Register & Decision Log (Sổ Quản Lý Rủi Ro & Nhật Ký Quyết Định)

Tài liệu này dùng để **Phân cấp Ưu tiên Rủi ro (Risk Prioritization)** và ghi lại các **Quyết định Kỹ thuật nhỏ (Minor Decision Log)** phát sinh trong từng Sprint.

---

## I. RISK REGISTER (BẢNG QUẢN LÝ RỦI RO KIẾN TRÚC)

| Risk Code | Mô tả Rủi ro | Cấp độ Tác động (Impact) | Xác suất (Likelihood) | Mức ưu tiên | Hành động giảm thiểu (Mitigation Strategy) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **RSK-001** | RLS Policy trên Supabase bị hở hoặc cấu hình sai | **CRITICAL** | Medium | **P1 (Tier 1)** | Thực hiện Sprint 3 Security Audit với bộ test phân quyền |
| **RSK-002** | Dữ liệu mồ côi `class_students` khi xóa Lớp học | **HIGH** | Low | **P2 (Tier 1)** | Thêm ràng buộc FK `ON DELETE CASCADE` |
| **RSK-003** | Lỗi PostgREST ambiquity gây ra 400 Bad Request | **HIGH** | High | **P1 (Tier 1)** | Áp dụng `INV-I03`: Tách query nhúng quan hệ |
| **RSK-004** | Spinner kẹt vô hạn khi Promise không resolve | **MEDIUM** | Medium | **P3 (Tier 2)** | Áp dụng `INV-R01`: Cấu hình Timeout 10s & Interceptor |
| **RSK-005** | Truy vấn JOIN giữa Class & Homework bị chậm khi data lớn| **MEDIUM** | Low | **P4 (Tier 3)** | Thêm Composite Index `(class_id, created_at)` |

---

## II. DECISION LOG (NHẬT KÝ QUYẾT ĐỊNH KỸ THUẬT NHỎ)

| Decision ID | Ngày quyết định | Phạm vi thay đổi | Quyết định đã đưa ra | Lý do kỹ thuật (Technical Reason) |
| :--- | :--- | :--- | :--- | :--- |
| **DEC-001** | 01/08/2026 | `usersApi.list` | Đổi DTO mapping `id: p.user_id \|\| p.id` | Khớp với ràng buộc FK `classes_teacher_id_fkey` |
| **DEC-002** | 01/08/2026 | `classesApi.create` | Loại bỏ các key rỗng `null` không tồn tại trong DB payload | Chống lỗi `Could not find column in schema cache` |
| **DEC-003** | 01/08/2026 | `Exams.tsx` | Thêm Dropdown chọn Khóa học cho Ngân hàng bài thi | Đáp ứng nhu cầu lọc bài thi theo khóa học thực tế |
| **DEC-004** | 01/08/2026 | `Users.tsx` | Cố định `role: "student"` trong truy vấn danh sách Học viên | Bóc tách hoàn toàn Admin & Teacher khỏi trang Học viên |
