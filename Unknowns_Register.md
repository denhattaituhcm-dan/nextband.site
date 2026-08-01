# Unknowns Register (Sổ Nhật Ký Các Điểm Chưa Xác Minh)

Tài liệu này ghi nhận công khai toàn bộ các **Hành vi / Ràng buộc chưa được kiểm chứng bằng bằng chứng thực tế (Empirical Evidence)**. 
Một hạng mục chỉ được xóa khỏi Sổ Nhật Ký này khi và chỉ khi có câu lệnh SQL Audit, Network Capture, hoặc E2E Test chứng minh thành công.

---

## I. UNKNOWNS BẢNG CƠ SỞ DỮ LIỆU & RÀNG BUỘC (STRUCTURAL UNKNOWNS)

- **UNK-001: Homework Cascade Deletion**
  - *Câu hỏi*: Khi xóa một Lớp học (`Class`) hoặc Bài thi (`Exam`), bài tập `Homework` và các `Submission` liên quan có tự động bị xóa sỉ (`CASCADE`) hay nhận `SET NULL`?
  - *Trạng thái*: **Unknown** (Cần chạy `information_schema.referential_constraints` trong Sprint 1).

- **UNK-002: Attendance Unique Constraint**
  - *Câu hỏi*: CSDL có chặn việc điểm danh trùng lặp 2 lần cho cùng một Học viên trong cùng một Buổi học (`sessionId, studentId`) hay không?
  - *Trạng thái*: **Unknown** (Cần kiểm tra `pg_constraint`).

- **UNK-003: Indexes on Foreign Key Columns**
  - *Câu hỏi*: Tất cả các cột khóa ngoại (`course_id`, `teacher_id`, `class_id`, `student_id`) trên Supabase Cloud đã có Index để tối ưu tốc độ JOIN chưa?
  - *Trạng thái*: **Unknown** (Cần kiểm tra `pg_indexes`).

---

## II. UNKNOWNS VẬN HÀNH BÀI TẬP VÀ ĐIỂM SỐ (BEHAVIORAL UNKNOWNS)

- **UNK-101: Submission Transaction Rollback**
  - *Câu hỏi*: Khi Học viên nộp bài làm bị rớt mạng giữa chừng, bài nộp `ExamSubmission` và các câu trả lời `Answer` có bị lỡ dở (partial write) hay được Rollback sạch sẻ?
  - *Trạng thái*: **Unknown** (Cần kiểm thử kịch bản Mất mạng/Failure).

- **UNK-102: Concurrent Attendance Edits**
  - *Câu hỏi*: Nếu 2 Giáo viên cùng chỉnh sửa điểm danh của một Lớp học tại cùng một thời điểm, CSDL xử lý xung đột ra sao (`Optimistic Locking` hay `Last-Write-Wins`)?
  - *Trạng thái*: **Unknown**.

- **UNK-103: Teacher Grade Ownership Enforcement**
  - *Câu hỏi*: Nếu Giáo viên A cố gắng sửa điểm hoặc nộp lời phê cho Học viên lớp Giáo viên B qua PostgREST API, RLS của Supabase có chặn `HTTP 403 Forbidden` hay không?
  - *Trạng thái*: **Unknown** (Cần test RLS trong Sprint 3).

---

## III. NHẬT KÝ THEO DÕI XÓA BỎ UNKNOWNS (REMOVAL LOG)

| Unknown Code | Mô tả | Ngày xóa bỏ | Bằng chứng xác minh (Evidence) |
| :--- | :--- | :--- | :--- |
| **UNK-000A** | `classes.course_id` có tồn tại trên DB không? | 01/08/2026 | **Resolved**: Bổ sung `course_id uuid REFERENCES courses(id)` |
| **UNK-000B** | `classes.teacher_id` map sang `profiles.id` hay `user_id`? | 01/08/2026 | **Resolved**: Sửa DTO map chính xác sang `profiles.user_id` |
