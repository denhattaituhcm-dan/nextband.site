# Assumptions Register (Sổ Nhật Ký Giả Định Thiết Kế)

Tài liệu này ghi nhận toàn bộ các **Giả định Thiết kế BAN ĐẦU (Architectural Assumptions)**. 
Nếu bất kỳ giả định nào bị thay đổi bởi Nghiệp vụ / Chủ trung tâm trong tương lai, hệ thống phải kích hoạt quy trình cập nhật **ADR** tương ứng để đánh giá lại tác động kiến trúc.

---

## I. GIẢ ĐỊNH NHÂN SỰ & TÀI KHOẢN (USER ASSUMPTIONS)

- **ASM-001: Multi-class Teacher Ownership**
  - *Giả định*: Một Giáo viên có thể phụ trách nhiều Lớp học khác nhau tại một thời điểm (`classes.teacher_id` không có ràng buộc Unique).
  - *Tác động nếu thay đổi*: Nếu quy định Giáo viên chỉ dạy duy nhất 1 lớp, phải thêm ràng buộc `UNIQUE(teacher_id)`.

- **ASM-002: Single Primary Role per Context**
  - *Giả định*: Mặc dù bảng `user_roles` cho phép một người dùng có nhiều Role, nhưng trong một phiên làm việc (Session), một người dùng chỉ đóng vai trò chính là `admin`, `teacher`, hoặc `student`.
  - *Tác động nếu thay đổi*: Phải làm lại giao diện cho phép chuyển đổi vai trò linh hoạt (Role Switcher).

---

## II. GIẢ ĐỊNH ĐÀO TẠO & LỚP HỌC (ACADEMIC ASSUMPTIONS)

- **ASM-101: Linear Course Hierarchy**
  - *Giả định*: Một Khóa học (`Course`) chứa một tập hợp các Bài học mẫu (`Lesson`) sắp xếp theo thứ tự tuyến tính (`lesson_order`).
  - *Tác động nếu thay đổi*: Nếu Khóa học hỗ trợ học rẽ nhánh (Non-linear learning paths), Prisma schema phải đổi sang dạng Cây/Đồ thị.

- **ASM-102: Single Course per Class**
  - *Giả định*: Một Lớp học (`Class`) chỉ học theo duy nhất một Khóa học (`classes.course_id`). Lớp không thể học song song 2 giáo trình.
  - *Tác động nếu thay đổi*: Phải tách mối quan hệ thành bảng trung gian `class_courses`.

---

## III. GIẢ ĐỊNH BÀI TẬP VÀ ĐIỂM SỐ (HOMEWORK ASSUMPTIONS)

- **ASM-201: Class-based Homework Scope**
  - *Giả định*: Bài tập về nhà được giao cấp độ Lớp học (`Homework.class_id`), không giao riêng lẻ từng Học viên cá nhân.
  - *Tác động nếu thay đổi*: Phải bổ sung bảng `homework_students` để giao bài linh hoạt theo cá nhân.
