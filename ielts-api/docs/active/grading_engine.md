# TÀI LIỆU CHUẨN MỰC CHẤM ĐIỂM (CANONICAL GRADING & BAND CALCULATOR)
**Module:** `CanonicalScoringService.ts`, `IeltsBandCalculator.ts`, `ScoreAggregator.ts`  
**Vị trí:** `ielts-api/src/services/scoring/`  
**Quyền lực:** Fastify Backend Server là trọng tài duy nhất  

---

## 1. THUẬT TOÁN ĐỐI CHIẾU ĐÁP ÁN (OBJECTIVE NORMALIZATION)

1. **Chuẩn Hóa Chuỗi Ký Tự (String Normalization)**:
   - Loại bỏ khoảng trắng đầu cuối (`trim`).
   - Chuyển về chữ thường (`toLowerCase`).
   - Thu gọn khoảng trắng thừa giữa các từ (`\s+` $\rightarrow$ `" "`).
   - Xóa dấu chấm câu không ảnh hưởng ngữ nghĩa (`.`, `,`, `!`, `?` ở cuối câu).

2. **Xử Lý Dạng Câu Hỏi Đa Đáp Án (Multi-Select & Fill-in-the-Blank)**:
   - **Multi-select**: So sánh tập hợp không phân biệt thứ tự (Set equality: `Set(studentAnswers) === Set(acceptedAnswers)`).
   - **Fill-in-the-blank**: Phân tích cú pháp JSON `Record<string, string>` theo từng ô trống (`blank_0`, `blank_1`).

---

## 2. THANG QUY ĐỔI ĐIỂM IELTS CHUẨN (IELTS BAND SCORE CONVERSION TABLE)

### Listening & Reading (40 Câu Hỏi Chuẩn)

| Raw Score (Số câu đúng) | IELTS Band Score |
| :---: | :---: |
| 39 - 40 | **9.0** |
| 37 - 38 | **8.5** |
| 35 - 36 | **8.0** |
| 32 - 34 | **7.5** |
| 30 - 31 | **7.0** |
| 26 - 29 | **6.5** |
| 23 - 25 | **6.0** |
| 18 - 22 | **5.5** |
| 16 - 17 | **5.0** |
| 13 - 15 | **4.5** |
| 10 - 12 | **4.0** |
| 6 - 9   | **3.5** |
| 4 - 5   | **3.0** |
| 2 - 3   | **2.5** |
| 1       | **2.0** |
| 0       | **0.0** |

*Đối với các bài kiểm tra ngắn (Mini-test dưới 40 câu), thuật toán tính tỷ lệ tương ứng trên thang 40 câu trước khi áp dụng bảng quy đổi.*

---

## 3. CHẤM BÀI TỰ LUẬN (SUBJECTIVE GRADING WORKFLOW)

1. Khi học sinh nộp bài thi Writing Task 2 hoặc Speaking, bài nộp chuyển sang trạng thái **`SUBMITTED`**.
2. Giáo viên phụ trách lớp nhận thông báo bài nộp cần chấm (`GET /submissions?needGrading=true`).
3. Giáo viên gọi `POST /submissions/:id/grade` để nhập điểm thành phần (Task Achievement, Coherence & Cohesion, Lexical Resource, Grammatical Range & Accuracy) và nhận xét chi tiết.
4. Trạng thái bài nộp được chuyển sang **`GRADED`**, phát sinh thông báo cho học sinh.
