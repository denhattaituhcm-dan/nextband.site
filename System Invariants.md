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

## 1. PHÂN CẤP TIÊU CHUẨN TIER KIỂM TOÁN (TIERED AUDIT SYSTEM)

### Tier 0: Critical System Core (Release Blocking)
- **Entities / Edges**: `User`, `Role`, `Profile`, `Course`, `Class`, `Homework`, `Submission`.
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
