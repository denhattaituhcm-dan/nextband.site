# TÀI LIỆU CẤU TRÚC DATABASE CANONICAL (POSTGRESQL SCHEMA SPECIFICATION)
**Database Engine:** Supabase PostgreSQL (Canonical DB duy nhất)  
**ORM:** Prisma Client  

---

## 1. THỰC THỂ CỐT LÕI (CORE ENTITY GRAPH)

```
┌──────────────┐         ┌──────────────┐         ┌───────────────────┐
│   Courses    │ 1 ─── * │    Exams     │ 1 ─── * │   ExamSections    │
└──────┬───────┘         └──────┬───────┘         └─────────┬─────────┘
       │                        │                           │
       │ 1                      │ 1                         │ 1
       │ *                      │ *                         │ *
┌──────┴───────┐         ┌──────┴───────────────┐ ┌─────────┴─────────┐
│   Classes    │         │   ExamSubmissions    │ │  QuestionGroups   │
└──────┬───────┘         └──────┬───────────────┘ └─────────┬─────────┘
       │                        │                           │
       │ 1                      │ 1                         │ 1
       │ *                      │ *                         │ *
┌──────┴───────┐         ┌──────┴───────────────┐ ┌─────────┴─────────┐
│ClassStudents │         │       Answers        │ │     Questions     │
└──────────────┘         └──────────────────────┘ └───────────────────┘
```

---

## 2. BẢNG THỐNG KÊ TÍNH TOÀN VẸN (CANONICAL INVENTORY MATRIX)

| Tên Bảng (Table) | Số Lượng Bản Ghi | Trạng Thái Ràng Buộc (FK / Integrity) | Mục Đích Nghiệp Vụ |
| :--- | :---: | :---: | :--- |
| `exams` | **130** | 100% Khớp khóa ngoại `course_id` | Đề thi IELTS chính thức & Mock tests |
| `exam_sections` | **609** | 100% Khớp khóa ngoại `exam_id` | Các phần thi (Listening, Reading, Writing, Speaking) |
| `question_groups`| **181** | 100% Khớp khóa ngoại `section_id`| Nhóm câu hỏi, đoạn văn đọc hiểu, audio context |
| `questions` | **739** | 100% Khớp khóa ngoại `group_id` | Câu hỏi chi tiết (MCQ, Fill blank, Matching, Essay)|
| `exam_submissions`| **Canonical**| 100% Liên kết `exam_id` & `student_id` | Lượt thi và kết quả chấm điểm chính thức |
| `answers` | **Canonical**| 100% Liên kết `submission_id` & `question_id` | Câu trả lời và điểm chi tiết từng câu |
| `audit_outbox` | **Append-Only**| Ghi nhận lịch sử chuyển trạng thái | Audit trail, log phúc khảo điểm và bảo mật |
