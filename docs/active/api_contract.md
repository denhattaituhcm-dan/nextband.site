# TÀI LIỆU QUY CHUẨN API CONTRACT (FASTIFY REST API SPECIFICATION)
**Base URL:** `http://localhost:3000/api/v1` (Production: `https://api.nextband.site/api/v1`)  
**Xác thực:** Header `Authorization: Bearer <Supabase_JWT_Token>`  
**Tracing Header:** `X-Request-ID` (Bắt buộc trả về trong 100% responses)  

---

## 1. SUBMISSIONS DOMAIN (`/api/v1/submissions`)

| Method | Endpoint | Quyền Hạn | Mô Tả Nghiệp Vụ | Request Body / Params | Expected Response |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `POST` | `/` | Student, Teacher, Admin | Khởi tạo lượt làm bài mới (Start Attempt) | `{ examId: string }` | `201 Created` (DTO không lộ answer key) |
| `GET` | `/:id` | Owner, Teacher, Admin | Lấy chi tiết bài nộp (Có IDOR & Masking) | Params: `id` | `200 OK` (Masked nếu `IN_PROGRESS`) |
| `PUT` | `/:id` | Owner (`IN_PROGRESS`) | Tự động lưu bài làm nháp (Autosave) | `{ answers: [...] }` | `200 OK` (`409 Conflict` nếu `GRADED`) |
| `POST` | `/:id/submit` | Owner (`IN_PROGRESS`) | Nộp bài thi chính thức & Server chấm điểm | `{ answers: [...], idempotencyKey? }`| `200 OK` (Canonical Score) |
| `POST` | `/:id/grade` | Teacher (Class), Admin | Giáo viên chấm điểm tự luận (Writing/Speaking) | `{ grades: [...], totalScore? }` | `200 OK` (`status: GRADED`) |
| `POST` | `/:id/regrade` | Teacher (Class), Admin | Phúc khảo bài thi chính thức | `{ reason: string, grades: [...] }` | `200 OK` (Audit Outbox Event) |
| `GET` | `/` | Teacher, Admin, Student | Lấy danh sách bài nộp (Phân quyền theo lớp) | Query: `examId, studentId, status` | `200 OK` (Paginated list) |

---

## 2. EXAMS DOMAIN (`/api/v1/exams`)

| Method | Endpoint | Quyền Hạn | Mô Tả Nghiệp Vụ | Request Body / Params | Expected Response |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `GET` | `/` | Authenticated | Danh mục đề thi & bài tập | Query: `courseId, search, page, limit` | `200 OK` (Paginated list) |
| `GET` | `/:id` | Authenticated | Chi tiết đề thi | Params: `id` | `200 OK` |
| `POST` | `/` | Teacher, Admin | Tạo bài thi mới | `{ courseId, title, durationMinutes... }` | `201 Created` |
| `PUT` | `/:id` | Teacher, Admin | Cập nhật bài thi | `{ title, isPublished... }` | `200 OK` |
| `DELETE` | `/:id` | Admin | Xóa bài thi | Params: `id` | `200 OK` |

---

## 3. CLASSES DOMAIN (`/api/v1/classes`)

| Method | Endpoint | Quyền Hạn | Mô Tả Nghiệp Vụ | Request Body / Params | Expected Response |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `GET` | `/` | Authenticated | Danh sách lớp học | Query: `teacherId, search` | `200 OK` |
| `GET` | `/:id` | Authenticated | Chi tiết lớp & danh sách học viên | Params: `id` | `200 OK` |
| `POST` | `/` | Teacher, Admin | Tạo lớp học mới | `{ name, courseId, teacherId... }` | `201 Created` |
| `PUT` | `/:id` | Teacher (Owner), Admin| Cập nhật thông tin lớp | `{ name, startDate, endDate... }` | `200 OK` |
| `POST` | `/:id/students` | Teacher (Owner), Admin| Ghi danh học viên vào lớp | `{ studentId: string }` | `200 OK` |
| `DELETE`| `/:id/students/:studentId`| Teacher, Admin | Xóa học viên khỏi lớp | Params: `id, studentId` | `200 OK` |
| `POST` | `/:id/attendance` | Teacher (Owner), Admin| Điểm danh buổi học | `{ records: [{ studentId, status }] }`| `200 OK` |

---

## 4. USERS DOMAIN (`/api/v1/users`)

| Method | Endpoint | Quyền Hạn | Mô Tả Nghiệp Vụ | Request Body / Params | Expected Response |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `GET` | `/` | Admin | Quản lý người dùng hệ thống | Query: `role, search, page, limit` | `200 OK` |
| `POST` | `/` | Admin | Tạo người dùng mới | `{ email, fullName, role, password }` | `201 Created` |
| `PUT` | `/:id` | Admin, Self | Cập nhật hồ sơ người dùng | `{ fullName, phone, avatarUrl... }` | `200 OK` |
| `DELETE`| `/:id` | Admin | Xóa người dùng | Params: `id` | `200 OK` |
