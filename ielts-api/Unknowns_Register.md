# Unknowns Register (Sổ Nhật Ký Các Điểm Chưa Xác Minh Theo Cạnh Tích Hợp)

Tài liệu này theo dõi minh bạch các điểm **Chưa Kiểm Chứng (Unknowns)** được gom nhóm chính xác theo **Cạnh Tích Hợp (Integration Edge)**.

---

## UNKNOWNS LIST

### UNK-001A: Course -> Class Cascade Deletion Behavior
- **Description**: Chưa xác minh hành vi khi xóa `Course` thì các `Class` liên quan tự động xóa `CASCADE` hay nhận `RESTRICT` trên Supabase Cloud.
- **Risk**: CRITICAL (Xóa nhầm toàn bộ lớp học hoặc nghẽn DB).
- **Blocking Level**: RELEASE_BLOCKING (Tier 0).
- **Evidence Missing**: Kết quả truy vấn `information_schema.referential_constraints`.
- **Verification Plan**: Chạy SQL query đối chiếu `delete_rule` trên Live DB.
- **Status**: `UNKNOWN`

### UNK-004A: Class -> Homework & ClassStudent Cascade Deletion
- **Description**: Chưa xác minh hành vi lan truyền khi xóa `Class` tới `homeworks` và `class_students`.
- **Risk**: HIGH (Dữ liệu học viên mồ côi).
- **Blocking Level**: RELEASE_BLOCKING (Tier 0).
- **Evidence Missing**: Physical foreign key constraint inspection on Supabase.
- **Verification Plan**: Thực thi SQL script kiểm tra cascade constraint.
- **Status**: `EVIDENCE_PENDING`

### UNK-005A: Homework Submission Rollback
- **Description**: Khi nộp bài bị rớt mạng giữa chừng, `exam_submissions` và `answers` có Rollback nguyên tử hay không.
- **Risk**: HIGH (Dữ liệu bài nộp dở dang, không chấm điểm được).
- **Blocking Level**: RELEASE_BLOCKING (Tier 0).
- **Evidence Missing**: Network loss simulation log during submit.
- **Verification Plan**: Chạy E2E test ngắt kết nối HTTP trong khi POST `/submissions`.
- **Status**: `UNKNOWN`

### UNK-005B: Duplicate Submission Lock
- **Description**: CSDL có chặn bằng Unique Constraint trường hợp Học viên gửi 2 request nộp bài cùng lúc (Double-Click) hay không.
- **Risk**: MEDIUM (Tạo bản ghi trùng lặp).
- **Blocking Level**: TIER_1_BLOCKING.
- **Evidence Missing**: Unique index check on `exam_submissions(exam_id, student_id)`.
- **Verification Plan**: Kiểm tra `pg_indexes`.
- **Status**: `UNKNOWN`

### UNK-B01A: Student Workspace Render Latency
- **Description**: Chưa đo đạc latency từ khi Teacher Giao bài tới khi Workspace Học viên nhận data.
- **Risk**: LOW (Ảnh hưởng trải nghiệm người dùng).
- **Blocking Level**: NON_BLOCKING.
- **Evidence Missing**: Performance Network Trace.
- **Verification Plan**: Đo thời gian phản hồi `homeworksApi.getWorkspace()` `< 200ms`.
- **Status**: `EVIDENCE_PENDING`
