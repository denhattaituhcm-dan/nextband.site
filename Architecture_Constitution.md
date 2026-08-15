# NEXTBAND ARCHITECTURE CONSTITUTION (HIẾN PHÁP KIẾN TRÚC HỆ THỐNG NEXTBAND)

**Phiên bản**: 1.0.0  
**Ngày ban hành**: 01/08/2026  
**Cấp độ áp dụng**: Tối cao (Bắt buộc tuân thủ cho toàn bộ Kỹ sư, Technical Lead, và AI Agents)  
**Phạm vi**: Toàn bộ Hệ thống IELTS NextBand (Frontend `nextband/`, Backend Fastify `ielts-api/`, Database Supabase Cloud PostgreSQL, và các tài liệu Kiến trúc liên quan)

---

## PREAMBLE (LỜI NÓI ĐẦU)

Hiến pháp Kiến trúc NextBand (Architecture Constitution) là văn bản pháp lý kỹ thuật **tối cao** của dự án. Hiến pháp tồn tại nhằm mục đích thiết lập kỷ luật kiểm toán tuyệt đối, bảo vệ sự sống còn và tính toàn vẹn của hệ thống thông qua 5 trụ cột:

1. **Domain Integrity**: Bảo vệ mô hình miền nghiệp vụ đào tạo IELTS khỏi sự sai lệch do các bản vá lỗi triệu chứng.
2. **Data Integrity**: Bảo đảm dữ liệu nhất quán 1:1 từ Prisma Schema đến Physical Database, chống dữ liệu mồ côi (Zero Orphan Policy) và Schema Drift.
3. **Integration Alignment**: Đảm bảo hợp đồng tích hợp liên tầng (UI $\rightarrow$ DTO $\rightarrow$ API Wrapper $\rightarrow$ PostgREST $\rightarrow$ Physical DB) luôn khớp 100%.
4. **Security & Ownership**: Phân định ranh giới sở hữu tài nguyên, bảo mật RLS và chặn đứng nguy cơ rò rỉ hoặc truy cập trái phép.
5. **Maintainability & Governance**: Duy trì máy kiểm tra kiến trúc tự động, biến tri thức hệ thống thành tài sản bền vững không phụ thuộc vào cá nhân hay AI cụ thể.

---

## ARTICLE I: ARCHITECTURE AUTHORITY (QUYỀN HẠN KIẾN TRÚC & NGUỒN CHÂN LÝ)

### Section 1.1: Thứ Tự Ưu Tiên Nguồn Chân Lý (Hierarchy of Truth)
Khi xảy ra mâu thuẫn hoặc xung đột thông tin giữa các tầng, thứ tự ưu tiên pháp lý kỹ thuật được áp dụng nghiêm ngặt theo thứ tự giảm dần từ trên xuống dưới:

```text
[1] Business Rules Document (Quy tắc Nghiệp vụ Chủ trung tâm)
 └─► [2] Architecture Constitution (Hiến pháp Kiến trúc này)
      └─► [3] Architecture Decision Records (ADR.md)
           └─► [4] System Invariants (System_Invariants.md)
                └─► [5] Prisma Schema (ielts-api/prisma/schema.prisma)
                     └─► [6] Migration SQL Files (prisma/migrations, supabase/migrations)
                          └─► [7] Live Physical Database (Supabase Cloud PostgreSQL)
                               └─► [8] TypeScript DTO Interfaces (src/lib/api.ts)
                                    └─► [9] API Client Wrappers
                                         └─► [10] UI Components & Forms
```

### Section 1.2: Quy Trình Xử Lý Mâu Thuẫn (Drift Resolution Protocol)
1. **Phát hiện Mâu thuẫn**: Nếu bất kỳ tầng dưới nào (ví dụ: Live Database) khác biệt với tầng trên (ví dụ: Prisma Schema), hành vi đó được định nghĩa là **Schema Drift** hoặc **Integration Drift**.
2. **Ngăn chặn Sửa Đổi Cảm Tính**: Không AI hay Kỹ sư nào được phép sửa tầng trên để "chiều theo" lỗi ở tầng dưới khi chưa xác minh Nguồn chân lý.
3. **Bắt buộc Tạo Drift Report**: AI/Kỹ sư phải tạo ngay một **Drift Report** theo mẫu tại Appendix B và tạm dừng triển khai cho đến khi có phê duyệt ADR mới.
4. **PASS/FAIL Condition**:
   - **PASS**: Mọi tầng từ [1] đến [10] nhất quán 1:1.
   - **FAIL**: Có ít nhất một thuộc tính/quan hệ không khớp tên, kiểu dữ liệu, hoặc ràng buộc giữa 2 tầng bất kỳ.
   - **Verification Method**: Chạy script `SQL Schema Audit` đối chiếu `schema.prisma` với `information_schema.columns`.

---

## ARTICLE II: EVIDENCE FIRST (NGUYÊN TẮC BẰNG CHỨNG LÀ TRÊN HẾT)

### Section 2.1: Cấm Phát Biểu Cảm Tính
1. **Cấm Tuyên Bố Không Bằng Chứng**: Nghiêm cấm việc sử dụng các từ ngữ khẳng định như `Verified`, `Success`, `Production Ready`, `Aligned`, `Fixed` nếu chưa trình ra bằng chứng thực nghiệm (Empirical Evidence).
2. **Yêu Cầu Cấu Trúc Báo Cáo (Claim-Evidence Structure)**: Mọi kết luận kỹ thuật bắt buộc phải chứa đủ 5 thành tố:
   - **Claim**: Tuyên bố kỹ thuật.
   - **Evidence**: Trích dẫn log Network HTTP 200/201, SQL Query Result, hoặc console trace.
   - **Confidence**: Mức độ tin cậy (`100%`, `75%`, `50%`, `Unknown`).
   - **Verification Method**: Phương pháp đã dùng để kiểm chứng.
   - **Unknowns**: Các điểm vẫn chưa thể kiểm chứng từ tuyên bố đó.

### Section 2.2: Tiêu Chuẩn Phân Loại Bằng Chứng (Evidence Criteria)
- **Bằng chứng Thật (Verified Evidence)**: Phải thu thập từ runtime thực tế: `Network Capture HTTP Status`, kết quả SQL truy vấn từ `information_schema`, log thực thi Postgres PL/pgSQL.
- **Bằng chứng Giả (Fake Evidence - Bị Bác Bỏ)**: Đọc code thấy logic "trông có vẻ đúng", hoặc tự suy đoán DB "chắc là đã có cột".
- **PASS/FAIL Condition**:
  - **PASS**: Tuyên bố đi kèm Log/SQL Output cụ thể.
  - **FAIL**: Tuyên bố chỉ dựa trên việc xem source code hoặc suy đoán suông.
  - **Verification Method**: Audit lại báo cáo kiểm thử bằng đối chiếu chứng cứ độc lập.

---

## ARTICLE III: UNKNOWN GOVERNANCE (QUẢN TRỊ ĐIỂM CHƯA XÁC MINH)

### Section 3.1: Định Nghĩa và Ghi Nhận Unknowns
1. Mọi hành vi, ràng buộc, hoặc hiệu năng chưa có Bằng chứng thực nghiệm bắt buộc phải ghi nhận vào tệp `Unknowns_Register.md`.
2. Nghiêm cấm việc giả định "hệ thống vẫn chạy bình thường" đối với các mục nằm trong danh sách Unknowns.

### Section 3.2: Quy Trình Đóng Unknowns
1. Một mục `Unknown` **CHỈ ĐƯỢC CHUYỂN TRẠNG THÁI CHÀO ĐÓNG (`Resolved`)** khi có phương pháp kiểm thử thực thi thành công và trình ra Bằng chứng theo Article II.
2. **PASS/FAIL Condition**:
   - **PASS**: Mục Unknown có mã ID (`UNK-xxx`), mô tả câu hỏi, câu lệnh SQL/E2E test để kiểm tra, và Log kết quả xác minh.
   - **FAIL**: Tự ý xóa mục Unknown khỏi Sổ nhật ký mà không đính kèm Bằng chứng.
   - **Verification Method**: Đánh giá lịch sử thay đổi `Unknowns_Register.md`.

---

## ARTICLE IV: ASSUMPTION GOVERNANCE (QUẢN TRỊ GIẢ ĐỊNH THIẾT KẾ)

### Section 4.1: Phân Cấp Khái Niệm
Hệ thống phân biệt rõ ràng 4 cấp độ thông tin:
- **Assumption (Giả định)**: Ý định thiết kế ban đầu về nghiệp vụ (chưa bị bác bỏ, nhưng có thể đổi bởi Chủ trung tâm).
- **Hypothesis (Giả thuyết)**: Chẩn đoán nguyên nhân kỹ thuật khi xảy ra sự cố (chưa có Bằng chứng).
- **Fact (Sự thật)**: Cấu trúc code hoặc cú pháp DDL hiện hữu.
- **Verified Evidence (Bằng chứng thực nghiệm)**: Kết quả chạy thực tế chứng minh sự thật.

### Section 4.2: Quy Trình Chuyển Đổi Giả Định
```text
[Assumption] ──(Tạo kịch bản kiểm thử)──► [Hypothesis / Test] ──(Thực thi thu Log)──► [Verified Evidence]
```
1. Mọi Giả định nghiệp vụ phải ghi tại `Assumptions_Register.md`.
2. Nếu một Giả định bị thay đổi (ví dụ: Giáo viên dạy nhiều lớp $\rightarrow$ Giáo viên dạy 1 lớp), bắt buộc phải kích hoạt quy trình xem xét tác động kiến trúc và phát hành **ADR mới**.
3. **PASS/FAIL Condition**:
   - **PASS**: Giả định có mã (`ASM-xxx`), tác động kiến trúc nếu thay đổi, và ADR tham chiếu.
   - **FAIL**: Thay đổi code theo giả định mới mà không cập nhật `Assumptions_Register.md` và `ADR.md`.

---

## ARTICLE V: INVARIANT PROTECTION (BẢO VỆ QUY TẮC BẤT BIẾN)

### Section 5.1: Tính Khả Thẩm Của Invariants
1. Quy tắc Bất biến (`System Invariants`) là ranh giới an toàn không thể xâm phạm của hệ thống.
2. Không cá nhân hay AI nào được phép:
   - Phá vỡ Invariant để vá lỗi tạm thời.
   - Sửa nội dung Invariant để "hợp thức hóa" code lỗi.
   - Bỏ qua Invariant trong quá trình kiểm thử.

### Section 5.2: Quy Trình Thay Đổi Invariant
Sửa đổi một Invariant chỉ được phép khi và chỉ khi:
1. Có yêu cầu thay đổi nghiệp vụ chính thức từ Chủ trung tâm.
2. Đã thông qua một **ADR mới** giải thích rõ lý do và đánh giá rủi ro lan truyền.
3. **PASS/FAIL Condition**:
   - **PASS**: Invariant có Mã code (`INV-xxx`), Owner, Source of Truth, Failure Impact, Verification Method, và Status.
   - **FAIL**: Sửa code làm sai lệch kết quả truy vấn Verification Method của Invariant.

---

## ARTICLE VI: SCHEMA GOVERNANCE (QUẢN TRỊ CẤU TRÚC DỮ LIỆU)

### Section 6.1: Quy Trình 6 Tầng Đồng Bộ Schema
Mọi thay đổi DDL (Thêm/Sửa/Xóa Bảng hoặc Cột) bắt buộc phải thực thi đồng bộ và kiểm tra đủ 6 tầng:
```text
[1. Prisma Schema] ──► [2. Migration SQL] ──► [3. Live Physical DB] ──► [4. TypeScript DTO] ──► [5. API Client] ──► [6. UI Binding]
```

### Section 6.2: Quy Tắc Dừng Ngay Khi Schema Drift (Zero Drift Policy)
1. Nếu phát hiện bất kỳ cột nào có trên UI/DTO/Prisma nhưng thiếu ở Live Database (hoặc ngược lại), toàn bộ quá trình phát triển tính năng mới **BẮT BUỘC DỪNG LẠI**.
2. **PASS/FAIL Condition**:
   - **PASS**: Truy vấn `information_schema.columns` khớp 100% với `schema.prisma` và TypeScript DTO.
   - **FAIL**: Xuất hiện lỗi PostgREST `Could not find column ... in schema cache`.
   - **Verification Method**: Thực thi `SQL Schema Drift Audit Script`.

---

## ARTICLE VII: EDGE GOVERNANCE (QUẢN TRỊ CẠNH TÍCH HỢP HỆ THỐNG)

### Section 7.1: Quản Trị Mối Quan Hệ Theo Cạnh (Edge-Based Governance)
1. Mọi mối quan hệ giữa 2 thực thể bắt buộc phải quản trị theo mô hình **Edge** (không quản trị theo file hoặc module riêng lẻ).
2. Phân loại Cạnh:
   - **Structural Edge (Cạnh Cấu Trúc - Khóa ngoại CSDL)**: Ví dụ `Course ---> Class`.
   - **Behavioral Edge (Cạnh Hành Vi - Chuỗi Vận Hành)**: Ví dụ `Homework ---> Student Workspace`.

### Section 7.2: Checklist 12 Điểm Bắt Buộc Cho Mỗi Cạnh (12-Point Edge Protocol)
Mỗi Edge chỉ được tuyên bố **Verified** khi đạt đủ 12 điểm bằng chứng:
1. `Prisma Schema`: Định nghĩa quan hệ chuẩn.
2. `SQL Migration`: File `.sql` khởi tạo constraint.
3. `Live DB Column`: Kiểu dữ liệu khớp 1:1 trong `information_schema.columns`.
4. `Physical Foreign Key`: Ràng buộc `REFERENCES` tồn tại trong CSDL.
5. `Indexes`: Cột khóa ngoại có Index tối ưu JOIN trong `pg_indexes`.
6. `API DTO`: Interface TypeScript khớp tên thuộc tính.
7. `API Payload`: Payload Network trỏ đúng tên cột CSDL.
8. `UI Binding`: Component bind đúng state và handler.
9. `Runtime Execution`: Lệnh thực thi trả về `HTTP 200/201 OK`.
10. `Delete & Cascade`: Hành vi `RESTRICT` / `CASCADE` / `SET NULL` chạy đúng thiết kế.
11. `RLS Security`: Cấu hình phân quyền RLS chặn truy cập trái phép.
12. `Performance`:JOIN Query Response Time `< 200ms` và Execution Plan có dùng Index.

- **PASS/FAIL Condition**:
  - **PASS**: Đủ 12/12 điểm bằng chứng cho Tier 0 Edges.
  - **FAIL**: Nợ bất kỳ điểm nào trong 12 điểm mà vẫn đánh dấu `Verified`.

---

## ARTICLE VIII: STATE MACHINE GOVERNANCE (QUẢN TRỊ MÁY TRẠNG THÁI)

### Section 8.1: Nguyên Tắc Vòng Đời Thực Thể (Entity Lifecycle)
Mọi Thực thể có vòng đời (ví dụ `Homework`, `ExamSubmission`) bắt buộc phải khai báo Máy Trạng Thái trong `State_and_Event_Flows.md`.

### Section 8.2: Quy Tắc Bắt Chặn Chuyển Đổi Bất Hợp Lệ
1. Hệ thống bắt buộc phải có cơ chế (Check Constraint DB hoặc API Logic) để chặn các chuyển đổi trạng thái phi lý (Forbidden Transitions).
2. **Rollback & Recovery Rule**: Khi xảy ra lỗi trong quá trình chuyển trạng thái, thực thể phải tự động quay về trạng thái hợp lệ trước đó.
3. **PASS/FAIL Condition**:
   - **PASS**: Bài làm ở trạng thái `GRADED` không thể chuyển ngược về `IN_PROGRESS`.
   - **FAIL**: Cho phép Học viên sửa đáp án của một bài nộp đã được chấm điểm.
   - **Verification Method**: Chạy Integration Test cố tình gửi payload đổi trạng thái bất hợp lệ.

---

## ARTICLE IX: OWNERSHIP GOVERNANCE (QUẢN TRỊ QUYỀN SỞ HỮU THỰC THỂ)

### Section 9.1: Khai Báo Quyền Sở Hữu Rõ Ràng (Ownership Matrix)
Mọi Thực thể phải khai báo minh bạch trong `State_and_Event_Flows.md` các vai trò:
- **Primary Owner**: Chủ sở hữu chính của tài nguyên.
- **Can Create / Read / Update / Delete**: Ai được phép thao tác.
- **System Actor / Human Actor**: Phân định tác vụ do máy tự động chạy hay con người tương tác.

### Section 9.2: Không Để Quyền Mơ Hồ
1. Nghiêm cấm việc phân quyền chung chung theo kiểu "User có quyền xem data".
2. Phải ghi rõ: "Student A chỉ được xem Submission của chính Student A (`student_id = auth.uid()`)".
3. **PASS/FAIL Condition**:
   - **PASS**: Ma trận Ownership khai báo đủ 5 quyền (C/R/U/D/Owner) cho 3 nhóm vai trò (Admin, Teacher, Student).
   - **FAIL**: Giáo viên A có thể xem hoặc chấm bài nộp của Lớp do Giáo viên B quản lý mà không có quyền hỗ trợ.

---

## ARTICLE X: EVIDENCE GATE (CỔNG KIỂM SOÁT BẰNG CHỨNG TRƯỚC KHI THAY ĐỔI)

### Section 10.1: 4 Câu Hỏi Bắt Buộc Cho AI / Kỹ Sư
Trước khi tiến hành viết code, sửa migration, thay đổi schema, hay cập nhật API client, Kỹ sư / AI **BẮT BUỘC** phải trả lời đủ 4 câu hỏi trong kế hoạch:

1. ❓ **Bằng chứng (Evidence) hiện tại chứng minh lỗi/nhu cầu là gì?**
2. ❓ **Mục Unknown nào trong `Unknowns_Register.md` sẽ bị ảnh hưởng hoặc được giải quyết?**
3. ❓ **Quy tắc Bất biến (Invariant) nào có nguy cơ bị phá vỡ?**
4. ❓ **Quyết định kiến trúc (ADR) nào liên quan trực tiếp đến thay đổi này?**

### Section 10.2: Lệnh Dừng Khẩn Cấp (Emergency Stop Rule)
- **Nếu KHÔNG THỂ trả lời đủ 4 câu hỏi trên**: **DỪNG LẠI NGAY LẬP TỨC**. Không được phép chạm vào mã nguồn.

---

## ARTICLE XI: ARCHITECTURE REVIEW GATE (CỔNG CHUYỂN SPRINT)

### Section 11.1: Điều Kiện Tiên Quyết Chuyển Sprint
Dự án tuyệt đối **KHÔNG ĐƯỢC CHUYỂN SPRINT** (ví dụ từ Sprint 1 sang Sprint 2) nếu còn tồn tại bất kỳ điều kiện nào sau đây:

```text
 🛑 Có Schema Drift giữa Prisma và Live DB chưa giải quyết.
 🛑 Còn mục Unknown thuộc Tier 0 (Critical) chưa đóng trong Unknowns_Register.md.
 🛑 Có Invariant thuộc Tier 0 chưa có phương pháp kiểm thử (Missing Verification).
 🛑 Có Edge thuộc Tier 0 nằm ở trạng thái Broken hoặc Ambiguous.
 🛑 Có Thực thể chưa xác định ma trận Quyền sở hữu (Undefined Ownership).
 🛑 Có thay đổi thiết kế lớn chưa được ghi nhận tệp ADR.md.
```

---

## ARTICLE XII: BURDEN OF PROOF (TRÁCH NHIỆM CHỨNG MINH)

### Section 12.1: Quy Tắc Trách Nhiệm Chứng Minh
1. Trách nhiệm chứng minh thuộc về người/AI đưa ra khẳng định.
2. Mọi phát biểu kỹ thuật (ví dụ: "Tính năng này đã sửa xong") bắt buộc phải đính kèm cấu trúc **Proof Package**:
   ```text
   - Claim: [Nội dung phát biểu]
   - Evidence: [Log/SQL/Network Capture]
   - Confidence: [Mức % tin cậy]
   - Counter Evidence: [Bằng chứng phản biện đã kiểm tra để loại trừ]
   - Risk: [Rủi ro còn tồn tại]
   - Unknowns: [Các điểm chưa thể xác minh]
   ```
3. Mọi phát biểu không đính kèm Proof Package đều bị coi là **Không Có Giá Trị 法 Lý Kỹ Thuật**.

---

## ARTICLE XIII: CANONICAL IDENTITY & ENROLLMENT SEPARATION (PHÂN ĐỊNH TUYỆT ĐỐI ĐỊNH DANH & GHI DANH)

### Section 13.1: Quy Tắc Bất Biến 2 Loại ID
Toàn bộ hệ thống NextBand tuân thủ nghiêm ngặt nguyên tắc phân định $studentId \neq enrollmentId$:
1. **`studentId` (Canonical Student Identity ID)**: 
   - Đại diện cho người dùng học viên trong hệ thống.
   - BẮT BUỘC bằng **`auth.users.id` $\equiv$ `profiles.user_id`** (Auth UID).
   - Được dùng độc quyền trong mọi bảng tham chiếu học viên (`class_students.student_id`, `class_attendance.student_id`, `exam_submissions.student_id`, `submissions.student_id`).
2. **`enrollmentId` (Enrollment Record ID)**: 
   - Đại diện cho bản ghi ghi danh của một học viên vào một lớp cụ thể.
   - BẮT BUỘC là **`class_students.id`**.

### Section 13.2: Các Hành Vi Bị Cấm Tuyệt Đối (Forbidden Patterns)
- ❌ **CẤM ĐẶT TÊN CHUNG LÀ `id`**: Trong các DTO liên quan đến lớp/học viên, tuyệt đối không đặt tên `id` cho cả hai khái niệm. Phải ghi rõ `enrollmentId` và `studentId`.
- ❌ **CẤM SO SÁNH CHÉO**: Tuyệt đối cấm so sánh `st.id === s.student_id` (so khớp giữa `enrollmentId` và `studentId` luôn trả về `false` tại runtime, gây ra lỗi mất tên học viên hoặc duplicate selection).

---

## ARTICLE XIV: TRUTHFUL STATE & ZERO SILENT FAILURE (TRUNG THỰC TRẠNG THÁI — CẤM NUỐT LỖI BẰNG EMPTY DATA)

### Section 14.1: Cấm Nuốt Lỗi Âm Thầm (No Silent Catch-all)
- Nghiêm cấm tuyệt đối việc sử dụng `catch { return [] }` hoặc `catch { return {} }` để che giấu các lỗi mạng (Network Error), lỗi máy chủ (HTTP 500), hoặc lỗi phân quyền (HTTP 401/403).
- Việc biến một Failure State thành Empty Data State là hành vi **ngụy tạo trạng thái**, làm cho UI hiển thị sai sự thật (ví dụ: biến lỗi rớt mạng thành thông báo *"Chưa có lớp học"* hoặc *"Chưa có học viên"*).

### Section 14.2: Quy Tắc Bảo Toàn Trạng Thái Lỗi (Error State Preservation)
1. Mọi tầng API Client bắt buộc phải truyền trung thực mã lỗi, mã HTTP Status, hoặc `status: "network_error" | "api_error" | "unauthenticated"` lên tầng gọi.
2. Tầng UI bắt buộc phải render **Error Card / Error Banner kèm Nút "Thử lại" (Retry)** khi xảy ra lỗi kết nối hoặc lỗi server, không được phép render Empty Data State.

---

## ARTICLE XV: DTO BOUNDARY INTEGRITY & ANTI-FALLBACK POISONING (TOÀN VẸN RANH GIỚI DTO — CHỐNG Ô NHIỄM FALLBACK)

### Section 15.1: Cấm Fallback Vô Tội Vạ (No TypeScript Silencing Fallbacks)
- Nghiêm cấm việc nhét các chuỗi fallback lỏng lẻo như `s.user_id || s.id` hoặc `st.studentId || st.id` chỉ nhằm mục đích làm "im lặng TypeScript".
- Fallback lỏng lẻo là nguồn gốc che giấu việc DTO upstream bị lệch cấu trúc, dẫn đến việc component con lấy nhầm `id` (record ID) thay vì `studentId` (Auth UID) mà không bị bắt lỗi tại compile-time.

### Section 15.2: Khóa Ranh Giới DTO (DTO Boundary Lock)
- Mọi DTO khi truyền qua ranh giới Context/API phải được chuẩn hóa (normalized) và định nghĩa kiểu rõ ràng tại API boundary (`src/lib/api.ts`).
- Component UI chỉ được phép đọc các thuộc tính canonical đã được định nghĩa trong DTO Contract.

---

## ARTICLE XVI: FORENSIC INVESTIGATION & SURGICAL FIX PROTOCOL (QUY TRÌNH SỬA LỖI PHẪU THUẬT & ĐÓNG BẰNG BASELINE)

### Section 16.1: Quy Trình Sửa Lỗi Bắt Buộc (9-Step Protocol)
Khi phát hiện lỗi hệ thống, kỹ sư và AI Agents tuyệt đối không được sửa lỗi theo triệu chứng (Symptom Patching). Bắt buộc phải thực hiện đủ 9 bước:

```text
[1. Đóng Băng Codebase] ──► [2. Forensic Scan & Phân Loại] ──► [3. Dependency Trace (DB ➔ API ➔ DTO ➔ UI)]
                                                                               │
[6. Gate S1 (Static tsc)] ◄── [5. Surgical Fix Đúng Điểm] ◄── [4. Contract Lock Đã Phê Duyệt]
       │
       ▼
[7. Gate S2 (Logic/Trace)] ──► [8. Gate S4 (Real DB Runtime Test)] ──► [9. Freeze Baseline (F0, F1...)]
```

### Section 16.2: Quy Tắc Baseline Freeze
- Mọi đợt sửa lỗi sau khi vượt qua đủ các cổng kiểm chứng (S1, S2, S3, S4) bắt buộc phải được đóng gói và gán Git Tag Baseline (`freeze-baseline-f0`, `f1`...).
- Không trộn lẫn các đợt refactor lớn vào trong một bản vá phẫu thuật.

---

## ARTICLE XVII: DUAL-STACK MUTATION & OPTIMISTIC UI CONSISTENCY (ĐỒNG BỘ DUAL-STACK & TÍNH NHẤT QUÁN TRẠNG THÁI TỨC THỜI)

### Section 17.1: Nguyên Tắc Đồng Bộ Hai Đầu (Dual-Stack Sync)
- Trong kiến trúc lai Fastify REST + Supabase Client: Mọi thao tác thay đổi trạng thái (như `completeSession`, `unlockSession`, `markAttendance`) phải gọi Fastify REST endpoint đồng thời cập nhật Supabase fallback khi cần thiết.

### Section 17.2: Tính Nhất Quán Giao Diện Tức Thời (Immediate UI Consistency)
- Khi một Action hoàn tất (ví dụ: Chốt buổi học / Mở lại buổi học):
  1. Phải kích hoạt Invalidation cache (`invalidateClassWorkspace`, `refetchClass`).
  2. Phải cập nhật ngay `localSessionStatuses` / `optimisticState` tại Component để các thành phần phụ thuộc (Dropdown selector, Status Badges, Action Buttons) phản ánh tức thì trạng thái thực tế mới nhất, triệt tiêu độ trễ gây nhầm lẫn cho người dùng.

---

## APPENDIX A: BẢNG ĐỊNH NGHĨA TRẠNG THÁI CHUẨN (STANDARD STATUS DEFINITIONS)

| Trạng thái (Status) | Định nghĩa Pháp lý Kỹ thuật | Điều kiện Đạt |
| :--- | :--- | :--- |
| 🟢 **Verified** | Đã được chứng minh đúng 100% qua bằng chứng thực nghiệm. | Có Log Network `200/201`, SQL Result từ Live DB, hoặc E2E Test PASS. |
| 🟡 **Partially Verified** | Đã xác minh ở một số tầng, các tầng còn lại chưa có bằng chứng. | Đã check DTO & API, nhưng chưa check Physical DB hoặc RLS. |
| 🟠 **Evidence Pending** | Đã thiết kế phương pháp kiểm thử nhưng chưa chạy script thu thập log. | Có script SQL / E2E test code nhưng chưa có log output. |
| ⚪ **Unknown** | Chưa có đủ thông tin, chưa từng kiểm thử hoặc chưa có thiết kế. | Nằm trong tệp `Unknowns_Register.md`. |
| 🔴 **Broken** | Đã xác nhận xảy ra lỗi vi phạm Invariant, Schema Drift hoặc HTTP Error. | Log trả về HTTP 400/500, SQL error, vi phạm FK constraint. |
| 📦 **Deprecated** | Không còn sử dụng trong kiến trúc hiện tại nhưng chưa xóa mã nguồn. | Tính năng cũ (ví dụ: `logsApi` local viewer). |
| 🚫 **Rejected** | Đề xuất thiết kế bị từ chối sau khi xem xét ADR. | Có bản ghi Rejected trong `ADR.md`. |
| 🔷 **Accepted** | Đề xuất thiết kế được chấp nhận và chính thức áp dụng. | Có bản ghi Approved trong `ADR.md`. |
| 🔄 **Superseded** | Quyết định ADR cũ bị thay thế bởi một ADR mới hơn. | Đã được cập nhật ADR mới đè lên. |

---

## APPENDIX B: HỆ THỐNG TEMPLATE CHUẨN HÓA (STANDARD TEMPLATES)

### 1. Template Drift Report
```markdown
# DRIFT REPORT: [Tên thành phần bị lệch]
- Ngày phát hiện: [YYYY-MM-DD]
- Tầng phát hiện: [Prisma / Live DB / DTO / UI]
- Tầng bị lệch: [Chi tiết tầng bị lệch]
- Mô tả sai lệch: [Mô tả chi tiết]
- Evidence (Bằng chứng): [Log error hoặc kết quả SQL]
- Tác động (Impact): [Critical / High / Medium / Low]
- Hành động xử lý: [Đề xuất tạo ADR hay chạy Migration]
```

### 2. Template Edge Audit
```markdown
# EDGE AUDIT: [Entity A] ──► [Entity B]
- Loại Edge: [Structural Edge / Behavioral Edge]
- Priority Tier: [Tier 0 / Tier 1 / Tier 2]
- 12-Point Checklist Results:
  1. Prisma Schema: [Pass/Fail/Pending]
  2. SQL Migration: [Pass/Fail/Pending]
  3. Live DB Column: [Pass/Fail/Pending]
  4. Physical FK: [Pass/Fail/Pending]
  5. Indexes: [Pass/Fail/Pending]
  6. API DTO: [Pass/Fail/Pending]
  7. API Payload: [Pass/Fail/Pending]
  8. UI Binding: [Pass/Fail/Pending]
  9. Runtime Execution: [Pass/Fail/Pending]
  10. Delete & Cascade: [Pass/Fail/Pending]
  11. RLS Security: [Pass/Fail/Pending]
  12. Performance (<200ms): [Pass/Fail/Pending]
- Overall Edge Status: [Verified / Partially Verified / Broken / Unknown]
```

---

## APPENDIX C: AI BEHAVIOUR RULES (QUY TẮC HÀNH VI CHO AI AGENTS)

Nghiêm cấm tất cả AI Agents (bao gồm Antigravity và các subagents) vi phạm các quy tắc sau:

1. ❌ **KHÔNG ĐƯỢC ĐOÁN**: Không được đưa ra nhận định khi chưa có Bằng chứng thực tế từ file hoặc terminal log.
2. ❌ **KHÔNG BỎ QUA UNKNOWNS**: Khi gặp điểm chưa rõ, bắt buộc ghi vào `Unknowns_Register.md`, không được lờ đi.
3. ❌ **KHÔNG TỰ Ý SỬA SCHEMA**: Không được sửa DDL/Schema khi chưa điều tra nguyên nhân Drift và chưa có ADR.
4. ❌ **KHÔNG SỬA BUSINESS RULE ĐỂ VÁ BUG**: Không được sửa logic nghiệp vụ (ví dụ: biến trường bắt buộc thành optional) chỉ để làm cho bug mất đi.
5. ❌ **KHÔNG TUYÊN BỐ PRODUCTION READY KHÔNG BẰNG CHỨNG**: Chỉ dùng các trạng thái quy định tại Appendix A.

### Thứ Tự Ưu Tiên Hành Động Của AI (AI Action Priority):
$$\text{Evidence (Bằng chứng)} \longrightarrow \text{Verification (Xác minh)} \longrightarrow \text{Decision (Quyết định ADR)} \longrightarrow \text{Implementation (Viết code)}$$
