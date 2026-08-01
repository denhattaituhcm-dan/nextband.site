# Unknowns Register (Sổ Nhật Ký Các Điểm Chưa Xác Minh Theo Cạnh Tích Hợp)

Tài liệu này theo dõi minh bạch các điểm **Chưa Kiểm Chứng (Unknowns)** được gom nhóm chính xác theo **Cạnh Tích Hợp (Integration Edge)**.

---

## I. STRUCTURAL EDGE UNKNOWNS (CẠNH CẤU TRÚC CSDL)

### EDGE-001: Course ──► Class
- **UNK-001A: Cascade Deletion Behavior**
  - *Chưa biết*: Khi xóa `Course`, các `Class` liên quan có bị xóa `CASCADE` hay nhận `RESTRICT`?
  - *Trạng thái*: **Unknown** (Cần kiểm tra `information_schema.referential_constraints` trong Sprint 1).

### EDGE-004: Class ──► Homework
- **UNK-004A: Homework Cascade Delete**
  - *Chưa biết*: Khi xóa một Lớp học (`Class`), các bài tập `Homework` liên quan xử lý ra sao?
  - *Trạng thái*: **Unknown**.

### EDGE-005: Homework ──► Submission
- **UNK-005A: Submission Retry & Rollback**
  - *Chưa biết*: Khi nộp bài bị đứt mạng giữa chừng, CSDL Rollback hay để lại bản ghi dở dang?
  - *Trạng thái*: **Unknown**.
- **UNK-005B: Duplicate Submission Lock**
  - *Chưa biết*: CSDL có chặn bằng Unique Constraint trường hợp Học viên gửi 2 request nộp bài cùng lúc (Concurrent Double-Click) hay không?
  - *Trạng thái*: **Unknown**.

---

## II. BEHAVIORAL EDGE UNKNOWNS (CẠNH HÀNH VI VẬN HÀNH)

### EDGE-B01: Homework ──► Student Workspace
- **UNK-B01A: Workspace Render Latency**
  - *Chưa biết*: Thời gian từ lúc Giáo viên bấm Giao bài đến lúc Workspace Học viên hiển thị bài tập qua API có `< 200ms` hay không?
  - *Trạng thái*: **Unknown**.

### EDGE-B02: Submission ──► Grade Queue
- **UNK-B02A: Teacher Review Queue Trigger**
  - *Chưa biết*: Học viên nộp bài thành công có lập tức đẩy dòng vào bảng danh sách cần chấm `getTeacherWorkspace()` hay không?
  - *Trạng thái*: **Unknown**.
