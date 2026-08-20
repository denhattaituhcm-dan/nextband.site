# NEXTBAND ARCHITECTURE CONSTITUTION (HIẾN PHÁP KIẾN TRÚC HỆ THỐNG NEXTBAND)

**Phiên bản**: 1.5.0  
**Ngày ban hành**: 01/08/2026  
**Ngày cập nhật**: 20/08/2026 — Ban hành ARTICLE XXIII: LIVE RUNTIME INTEGRITY & ANTI-MOCK-FALLACY (Khóa kỷ luật xác minh 3 cấp độ: Static -> Automated Tests -> Live Runtime Process & Zero-Poisoned Fallback).  
**Cấp độ áp dụng**: Tối cao (Bắt buộc tuân thủ cho toàn bộ Kỹ sư, Technical Lead, và AI Agents)  
**Phạm vi**: Toàn bộ Hệ thống IELTS NextBand (Frontend `nextband/`, Backend Fastify `ielts-api/`, Database Supabase Cloud PostgreSQL, và các tài liệu Kiến trúc liên quan)

---

## PREAMBLE (LỜI NÓI ĐẦU)

Hiến pháp Kiến trúc NextBand (Architecture Constitution) và **Golden Architecture Baseline** ([`GOLDEN_ARCHITECTURE_BASELINE.md`](./GOLDEN_ARCHITECTURE_BASELINE.md)) là văn bản pháp lý kỹ thuật **tối cao** của dự án. Hiến pháp tồn tại nhằm mục đích thiết lập kỷ luật kiểm toán tuyệt đối, bảo vệ sự sống còn và tính toàn vẹn của hệ thống thông qua 5 trụ cột:

1. **Domain Integrity**: Bảo vệ mô hình miền nghiệp vụ đào tạo IELTS khỏi sự sai lệch do các bản vá lỗi triệu chứng.
2. **Data Integrity**: Bảo đảm dữ liệu nhất quán 1:1 từ Physical Database đến Prisma Schema, chống dữ liệu mồ côi (Zero Orphan Policy) và Schema Drift.
3. **Integration Alignment**: Đảm bảo hợp đồng tích hợp liên tầng (Physical DB $\rightarrow$ Prisma ORM $\rightarrow$ Fastify API $\rightarrow$ Frontend UI) luôn khớp 100%.
4. **Security & Ownership**: Phân định ranh giới sở hữu tài nguyên, bảo mật RLS và Fastify Authorization.
5. **Maintainability & Governance**: Duy trì máy kiểm tra kiến trúc tự động (`audit_production_schema.mjs`), biến tri thức hệ thống thành tài sản bền vững không phụ thuộc vào cá nhân hay AI cụ thể.

---

## ARTICLE I: ARCHITECTURE AUTHORITY (QUYỀN HẠN KIẾN TRÚC & NGUỒN CHÂN LÝ)

### Section 1.1: Thứ Tự Ưu Tiên Nguồn Chân Lý (Hierarchy of Truth)
Khi xảy ra mâu thuẫn hoặc xung đột thông tin giữa các tầng, thứ tự ưu tiên pháp lý kỹ thuật được áp dụng nghiêm ngặt theo thứ tự giảm dần từ trên xuống dưới:

```text
[1] Physical PostgreSQL Database (db.gzpdlqxjggyxlkeatvvf.supabase.co) - NGUỒN SỰ THẬT VẬT LÝ
 └─► [2] Golden Architecture Baseline (GOLDEN_ARCHITECTURE_BASELINE.md)
      └─► [3] Architecture Constitution (Hiến pháp Kiến trúc này)
           └─► [4] Migration Reality Ledger (Lịch sử migration thực tế trong DB)
                └─► [5] Prisma Schema (ielts-api/prisma/schema.prisma)
                     └─► [6] Fastify Backend Authority API (/api/v1/*)
                          └─► [7] TypeScript DTO Interfaces & API Clients (src/lib/api.ts)
                               └─► [8] UI Components & Forms (nextband/src/*)
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

## ARTICLE XIII: ROUTE & ENDPOINT DISAMBIGUATION (QUY TẮC PHÂN ĐỊNH ĐƯỜNG DẪN & CHỐNG NUỐT ROUTE)

### Section 13.1: Ngăn Chặn Hiện Tượng Nuốt Route (Parametric Route Shadowing)
1. **Tuyệt Đối Cấm Nuốt Route**: Trong toàn bộ hệ thống API Gateway (Fastify / Express / Nginx), mọi Endpoint tĩnh (Static Endpoints như `/my-classes`, `/stats`, `/search`, `/export`) **BẮT BUỘC PHẢI ĐƯỢC ĐĂNG KÝ TRƯỚC** hoặc **CÁCH LY KHỎI** các Endpoint động chứa tham số (Parametric Wildcards như `/:id`, `/:classId`).
2. **Bắt Buộc Schema Validation Cho Route Parameters**: Mọi tham số ID động trên URL (`/:id`, `/:classId`, `/:sessionId`) **BẮT BUỘC** phải có schema kiểm thực định dạng (ví dụ Zod `.uuid()` hoặc Regex `^[0-9a-fA-F-]{36}$`). Tuyệt đối không cho phép router nhận một chuỗi tĩnh bất kỳ (`my-classes`) rồi tiếp tục chuyển tiếp xuống tầng Service query Database gây lỗi `404 Not Found` giả.
3. **PASS/FAIL Condition**:
   - **PASS**: Gửi request `GET /api/v1/classes/my-classes` luôn kích hoạt đúng Controller `getMyClasses`, không bao giờ rơi vào `getClassById(id="my-classes")`.
   - **FAIL**: Xuất hiện bất kỳ log truy vấn CSDL nào tìm kiếm Record với `id` là tên của một Endpoint tĩnh.
   - **Verification Method**: Chạy Integration Test kiểm tra Route Matching với mọi sub-resource path trước khi deploy.

---

## ARTICLE XIV: DUAL-TIER RESILIENCE & DEPLOYMENT DESYNCHRONIZATION TOLERANCE (QUẢN TRỊ TỰ PHỤC HỒI LIÊN TẦNG & TƯƠNG THÍCH LỆCH PHA TRIỂN KHAI)

### Section 14.1: Nguyên Tắc Phục Hồi Hai Tầng (Dual-Tier Resilience Principle)
1. **Kiến Trúc Lai (Hybrid Architecture Contract)**: Hệ thống hoạt động trên mô hình kết hợp: API Gateway (`ielts-api`) đóng vai trò xử lý logic nghiệp vụ tập trung & Supabase Database đóng vai trò lưu trữ chuẩn xác.
2. **Khả Năng Chống Chịu Lệch Pha Triển Khai (N-1 Deployment Tolerance)**: Do Frontend (Vercel) và Backend (VPS / Container) có chu kỳ triển khai bất đồng bộ, Frontend API Client **BẮT BUỘC PHẢI CÓ CƠ CHẾ FALLBACK TỰ PHỤC HỒI**:
   - **Kênh Chính (Primary Tier)**: Gửi request qua REST API Gateway (`/api/v1/...`).
   - **Kênh Phục Hồi (Resilient Fallback Tier)**: Nếu REST Gateway trả về mã `404 Not Found`, `502 Bad Gateway`, `503 Service Unavailable`, hoặc lỗi mạng cục bộ (Backend đang reload/build), API Client **BẮT BUỘC TỰ ĐỘNG FALLBACK** truy vấn trực tiếp xuống Supabase Physical Database (nếu thao tác an toàn với RLS).
3. **Cấm Hiển Thị Lỗi Bộc Phát Khi Kênh Phụ Còn Sống (No Exploding Error Banners)**:
   - UI chỉ được phép hiển thị Banner Báo Lỗi toàn màn hình khi và chỉ khi **CẢ HAI TẦNG (REST API Gateway VÀ Supabase Database)** đều thất bại 100%.
   - Nếu Kênh Phục Hồi hoạt động thành công, hệ thống phải cung cấp dữ liệu liên tục cho người dùng, đồng thời ghi log cảnh báo (`console.warn` / telemetry).
4. **PASS/FAIL Condition**:
   - **PASS**: Khi tắt server Backend (`ielts-api`), người dùng truy cập trang Web vẫn xem được danh sách lớp học, bài tập và nộp bài bình thường thông qua Kênh Phục Hồi Supabase.
   - **FAIL**: Backend chưa reload xong khiến Frontend ném banner lỗi đỏ chặn toàn bộ màn hình của Học viên/Giáo viên.
   - **Verification Method**: Chạy E2E Chaos Test giả lập sự cố Backend sập nguồn hoặc trả về 404 để kiểm tra tính liên tục của Frontend.

---

## ARTICLE XV: ROLE-AWARE CONTEXT & MULTI-PERSONA COEXISTENCE (QUẢN TRỊ NGỮ CẢNH VAI TRÒ & HIỂN THỊ THÍCH ỨNG)

### Section 15.1: Phân Tách Ngữ Cảnh Đa Vai Trò (Multi-Persona Context Segregation)
1. **Không Nhầm Lẫn Giữa Trạng Thái Lỗi Và Quyền Hạn**: Tài khoản Quản trị viên (`admin`) hoặc Giáo viên (`teacher`) không phải là Học viên (`student`), do đó có thể không có bản ghi trong bảng ghi danh lớp (`class_students`).
2. **Quy Tắc Thích Ứng Giao Diện (Adaptive Context Rendering)**:
   - Khi một tài khoản Admin/Giáo viên truy cập vào không gian học tập của Học viên (ví dụ `/` Bài tập):
     - Tuyệt đối cấm coi đây là "Lỗi hệ thống" hay "Học viên bị đình chỉ".
     - Bắt buộc phải hiển thị **Thanh Điều Hướng Ngữ Cảnh (Role-Aware Shortcut Bar)** cung cấp đường dẫn tức thì đến:
       - 🏢 **Quản lý Lớp học** (`/admin/classes`)
       - 🎓 **Bàn làm việc Giáo viên** (`/admin/teacher-workspace`)
3. **PASS/FAIL Condition**:
   - **PASS**: Đăng nhập bằng `admin@ielts.com` vào trang chủ `/` nhìn thấy thông tin rõ ràng và có nút chuyển nhanh sang Trang Quản trị mà không gặp bất kỳ thông báo lỗi nào.
   - **FAIL**: Admin đăng nhập bị hiển thị thông báo lỗi "Không thể tải thông tin lớp học" hoặc bị khóa chức năng.
   - **Verification Method**: Chạy kịch bản kiểm thử Persona Matrix Test cho cả 3 vai trò Admin, Teacher, Student trên toàn bộ các route công khai và bảo vệ.

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

## ARTICLE XVIII: ZERO-MOCK PRODUCTION & BUSINESS EVENT INTEGRITY (CHÍNH SÁCH TUYỆT ĐỐI KHÔNG DÙNG MOCK TRÊN PRODUCTION & TÍNH TOÀN VẸN SỰ KIỆN NGHIỆP VỤ)

### Section 18.1: Cấm Triệt Để Dữ Liệu Giả Trên Production (Zero Mock Data Policy)
1. Tuyệt đối không được phép đưa code chứa dữ liệu mẫu (`mock data`, danh sách hardcoded, chuông thông báo giả lập) lên môi trường Production.
2. Nếu một phân hệ phụ trợ (như Notification Center, Audit Logs, Analytics) chưa được kết nối Backend, giao diện bắt buộc phải:
   - Hiển thị **Trạng thái rỗng chuẩn (Empty State)** trung thực, HOẶC
   - Ẩn có chủ đích khỏi giao diện người dùng.
3. Nghiêm cấm hành vi "vá triệu chứng P0" (biến mảng mock thành `[]` để pass build) mà bỏ qua "khiếm khuyết kiến trúc P1" (không kết nối sự kiện nghiệp vụ thật).

### Section 18.2: Tính Nguyên Tử Của Tác Vụ Đi Kèm (Atomicity of Business Side-Effects)
1. Mọi tác vụ phát sinh từ sự kiện nghiệp vụ chính (như sinh `Notification`, ghi `AuditLog`, kích hoạt `Outbox` khi học viên nộp bài hoặc giáo viên chấm điểm) **BẮT BUỘC** phải được thực thi trong **cùng một DB Transaction context** (`$transaction` / `Prisma.TransactionClient`).
2. Tuyệt đối cấm commit thông báo trước hoặc độc lập bên ngoài transaction của thực thể nghiệp vụ chính. Nếu nghiệp vụ chính bị lỗi hoặc rollback, toàn bộ thông báo và side-effect đi kèm phải được rollback sạch sẽ (Chống Phantom Notifications).

### Section 18.3: Chống Trùng Lặp Cấp Cơ Sở Dữ Liệu (DB-Level Idempotency)
1. Mọi sự kiện phát sinh từ hành động người dùng hoặc webhook có nguy cơ bị gửi lặp (Network Retry / Double Click) **BẮT BUỘC** phải có ràng buộc Idempotency tại tầng CSDL:
   ```sql
   UNIQUE INDEX `notifications_idempotency_idx` (`entity_type`, `entity_id`, `user_id`, `type`)
   ```
2. Ở tầng Service: Bắt buộc phải bắt lỗi Unique Constraint (`P2002`) để skip an toàn hoặc sử dụng `createMany` với `skipDuplicates: true`, không được để retry request làm sập API hoặc sinh ra nhiều thông báo trùng rác.

### Section 18.4: Người Nhận Có Căn Cứ & Phân Quyền Cấp Bản Ghi (Authoritative Recipient & Object-Level Auth)
1. **Authoritative Recipient**: Người nhận thông báo phải được xác định dựa trên quy tắc miền dữ liệu chính thức (ví dụ: `Class.teacherId` cho giáo viên phụ trách, `ClassStudent.status = ACTIVE` cho học viên trong lớp), không để lập trình viên tự suy diễn.
2. **Business Entity Reference**: Thông báo phải mang cặp khóa tham chiếu đối tượng nghiệp vụ (`entityType`, `entityId`) để định danh chính xác sự kiện, không chỉ dựa vào URL string tĩnh.
3. **Object-Level Authorization**: Endpoint đọc/sửa thông báo (`GET /notifications`, `PATCH /notifications/:id/read`) bắt buộc phải ràng buộc `WHERE userId = request.user.id`. Tuyệt đối không cho phép truyền `userId` qua query param hay đọc trộm thông báo của người khác.

---

## ARTICLE XIX: DEFINITION OF DONE & ANTI-COMPILATION-FALLACY (ĐỊNH NGHĨA HOÀN THÀNH — CHỐNG NGỤY BIỆN COMPILE PASS)

### Section 19.1: Compile Pass Không Đồng Nghĩa Nghiệp Vụ Hoạt Động (Compilation $\neq$ Completeness)
1. Lệnh `npx tsc --noEmit` và `npm run build` thành công **CHỈ CHỨNG MINH**: Mã nguồn không có lỗi cú pháp và khớp kiểu tĩnh cơ bản.
2. Tuyệt đối không được xem `tsc pass` là căn cứ hoàn thành tính năng nếu luồng sự kiện nghiệp vụ bên dưới chưa được nối thật vào cơ sở dữ liệu.

### Section 19.2: Tiêu Chuẩn Nghiệm Thu Chu Kỳ Khép Kín (Closed-Loop Business DoD)
Một tính năng chỉ được xem là **Hoàn thành (Done)** khi và chỉ khi vượt qua bài kiểm thử Chu kỳ sự kiện 2 chiều trên cơ sở dữ liệu thực tế (End-to-End Event Loop):
$$\text{User A Action} \longrightarrow \text{DB Entity Commit} \longrightarrow \text{Atomic Side-Effect DB} \longrightarrow \text{User B Notification / Realtime} \longrightarrow \text{User B Action / Mutate State}$$

---

## ARTICLE XX: DESIGN SYSTEM INTEGRITY & ARCHITECTURAL PALETTE LOCKDOWN (TÍNH TOÀN VẸN THIẾT KẾ & KHÓA PALETTE PHÒNG CHỐNG REGRESSION)

### Section 20.1: Mô Hình Token 3 Tầng Bắt Buộc (3-Tier Token Architecture)
Mọi màu sắc và thành phần giao diện trong toàn bộ hệ thống phải tuân thủ nghiêm ngặt mô hình 3 tầng phân cấp, triệt tiêu hoàn toàn tình trạng đa nguồn chân lý (Multi-Source-of-Truth):

```text
[TIER 1: BRAND]      ──► primary, primary-foreground, primary-hover, primary-soft (Bất biến về Hue)
[TIER 2: SEMANTIC]   ──► success, warning, destructive, info (Kèm foreground tương ứng)
[TIER 3: NEUTRAL]    ──► background, foreground, card, muted, border, input, ring, sidebar-*
```

1. **Cấm Token Hóa Bảng Màu Thô**: Tuyệt đối không khai báo token theo tên màu nguyên thủy (`--blue-600`, `--emerald-500`, `--amber-400`). Component chỉ được phép biết *vai trò ngữ nghĩa* (Semantic Role), không được tự ý quyết định sắc độ màu.
2. **Quy Tắc Độc Tôn Biến CSS**: Mọi thay đổi về nhận diện thương hiệu chỉ được phép diễn ra tại `index.css`. Cấm sửa đổi màu rải rác trong từng file component.

### Section 20.2: Cơ Chế Khóa Compiler Chống Thoái Lùi (Compiler-Level Anti-Regression Gate)
1. **Khóa Bảng Màu Tailwind (`tailwind.config.ts`)**: Cấu hình Tailwind bắt buộc phải ghi đè (`override`) map `colors` để chỉ expose các token ngữ nghĩa (Tier 1, 2, 3).
2. **Từ Chối Biên Dịch Class Tùy Ý (Banned Color Utilities)**:
   - ❌ **CẤM TRUY CẬP TRỰC TIẾP**: `text-blue-*`, `bg-blue-*`, `text-emerald-*`, `bg-emerald-*`, `text-amber-*`, `bg-amber-*`, `text-indigo-*`, `bg-indigo-*`, `text-sky-*`, `bg-sky-*`, `text-teal-*`, `bg-teal-*`.
   - ✅ **CHỈ CHO PHÉP**: `text-primary`, `bg-primary`, `text-success`, `bg-success`, `text-warning`, `bg-warning`, `text-destructive`, `bg-destructive`, `text-info`, `bg-info`, `text-foreground`, `text-muted-foreground`, `bg-card`, `bg-muted`.
3. **PASS/FAIL Condition**:
   - **PASS**: Không có bất kỳ utility class màu palette thô nào lọt vào bản build production.
   - **FAIL**: Xuất hiện class màu cứng tự do trong file `.tsx` mới.

### Section 20.3: Hợp Đồng Điều Hướng Duy Nhất (Universal Navigation State Contract)
Toàn bộ hệ thống Menu điều hướng (bao gồm Client Sidebar, Admin Sidebar, Teacher Workspace, Header dropdowns) bắt buộc phải chia sẻ đúng **một hợp đồng trạng thái duy nhất**:

```text
Navigation State Contract
├── default    ──► text-sidebar-foreground, opacity 70%
├── hover      ──► bg-sidebar-accent/50, text-sidebar-foreground
├── active     ──► bg-sidebar-accent, text-sidebar-accent-foreground, font-semibold
└── disabled   ──► text-muted-foreground, cursor-not-allowed
```

- ❌ **CẤM PHÂN MẢNH GIAO DIỆN**: Cấm tình trạng mỗi nhóm menu (ví dụ: Client dùng Blue, Admin Teaching dùng `blue-50`, Admin System dùng `slate-100`) tự chế active state riêng.

### Section 20.4: Chuẩn Mực Cấp Bậc Thị Giác 5 Tầng & Chống Trùng Lớp (5-Tier Hierarchy & Layering Rules)
Hệ thống thiết lập chuẩn mực phân cấp thị giác kết hợp chặt chẽ giữa **Font Size + Font Weight + Line Height + Spacing Rhythm**:

| Cấp Bậc (Level) | Mục Đích Sử Dụng | Kích Thước (Size) | Độ Đậm (Weight) | Dòng (Line-Height) | Quy Tắc Bắt Buộc |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **L1 (Hero / Page Title)** | Tiêu đề chính màn hình | `32–36px` (`text-3xl`/`text-4xl`) | `800` (extrabold) | `1.15` (tight) | Tối đa 1 điểm nhấn L1 duy nhất trên một trang |
| **L2 (Section Title)** | Tiêu đề phân đoạn lớn | `20–24px` (`text-xl`/`text-2xl`) | `600–700` (bold) | `1.3` (snug) | Định hướng phân khu chức năng |
| **L3 (Card / Metric)** | Tiêu đề card, chỉ số KPI | `16–18px` (`text-base`/`text-lg`) | `600` (semibold) | `1.4` (normal) | Chỉ số số đếm dùng `text-2xl font-bold` gọn |
| **L4 (Body Text)** | Nội dung mô tả, đoạn văn | `14–16px` (`text-sm`/`text-base`) | `400–500` (normal) | `1.6` (relaxed) | Đảm bảo độ thoáng khi đọc |
| **L5 (Metadata / Label)** | Nhãn phụ, badge, ghi chú | `11–13px` (`text-[11px]`/`text-xs`) | `500–600` (medium) | `1.5` (normal) | Nhãn danh mục dùng uppercase tracking-wide |

- **Anti-Duplication Layering Rule**:
  - `Header` là **Navigation & Control Layer**: Chỉ chứa Logo, Breadcrumb/Class Chip, Notifications, User Avatar. **Tuyệt đối cấm đặt lời chào (Greeting)** tại Header.
  - `Hero Banner` là **Context Layer**: Chịu trách nhiệm hiển thị lời chào (`"Xin chào, [Tên]!"`) và ngữ cảnh lớp học hiện tại.
  - Không bao giờ để 2 tầng giao diện cùng thực hiện một nhiệm vụ trùng lặp.

### Section 20.5: Nhận Diện Thương Hiệu Bất Biến & Đóng Băng Dark Mode / Gradient (Brand Hue Invariant & Decoration Policy)
1. **Bảo Tồn Brand Hue (Single Identity Invariant)**:
   - Mã màu thương hiệu `primary` mang giá trị Hue bất biến (`hsl(223 68% ...)` - Academic Blue).
   - Tuyệt đối cấm hiện tượng đột biến nhận diện (ví dụ: Light Mode dùng Blue, Dark Mode đột biến sang Teal).
2. **Dark Mode Freeze Policy**:
   - Khi sản phẩm chưa có yêu cầu kinh doanh chính thức hoặc chưa có bộ token tối ưu hoàn chỉnh cho Dark Mode, hệ thống **BẮT BUỘC ĐÓNG BĂNG/LOẠI BỎ** class `.dark` và `darkMode` configuration.
   - Cấm để lại các class `dark:*` mồ côi (dead UI code) gây rác codebase và đánh lừa lập trình viên.
3. **Gradient as Decoration Only**:
   - Gradient chỉ được phép đóng vai trò làm lớp nền mờ trang trí nhẹ (`ambient glow / surface background`), tuyệt đối không được biến gradient thành nhận diện thương hiệu hay text highlight.

---

## ARTICLE XXI: SINGLE LIFECYCLE AUTHORITY & MULTI-MODAL STATE CONFORMANCE (THẨM QUYỀN VÒNG ĐỜI DUY NHẤT & CHUẨN HÓA TRẠNG THÁI ĐA PHƯƠNG THỨC)

### Section 21.1: Thẩm Quyền Vòng Đời Duy Nhất (Single Lifecycle Authority Invariant)
1. Toàn bộ các component trong Student Portal (`ClientHeader`, `HomePage`, `ClientSidebar`, `StudentLessonViewerPage`) **BẮT BUỘC ĐỌC TRẠNG THÁI HỌC VIÊN ĐỘC QUYỀN TỪ HOOK `useStudentLifecycle`**.
2. **Nghiêm Cấm Gọi API Độc Lập Để Tự Đoán Trạng Thái**:
   - Tuyệt đối cấm các component tự ý gọi `classStudentsApi.getMyClasses()` hoặc API riêng lẻ để tự render nhãn trạng thái.
   - Hiện tượng Header hiển thị *"Chưa có lớp học"* trong khi Homepage hiển thị danh sách bài tập của lớp là vi phạm nghiêm trọng luật Single Lifecycle Authority.

### Section 21.2: Phân Định Nghiêm Ngặt 5 Trạng Thái Vòng Đời (Truthful Lifecycle States)
Hệ thống máy trạng thái vòng đời học viên bắt buộc phân định rõ 5 trạng thái tách biệt:

```text
               ┌─────────────────────── useStudentLifecycle ───────────────────────┐
               │                                                                    │
      [1. LOADING] ──► Skeleton Loader (Cấm chớp giật, cấm hiển thị "Chưa có lớp")  │
               │                                                                    │
      [2. NETWORK_ERROR] ──► Error Banner Mạng + Nút Thử Lại (Cấm render Empty)    │
               │                                                                    │
      [3. API_ERROR] ─────► Error Banner Server (4xx/5xx) + Nút Thử Lại (Cấm Empty)│
               │                                                                    │
      [4. PRE_ENROLLMENT] ─► Empty State (CHỈ KHI Backend xác nhận 200 + data: []) │
               │                                                                    │
      [5. ENROLLED] ──────► Full Workspace Dashboard & Danh Sách Bài Tập           │
               └────────────────────────────────────────────────────────────────────┘
```

- **Invariant Truthful Empty State**: Chỉ khi và chỉ khi Backend trả về `HTTP 200 OK` kèm danh sách rỗng đã xác thực (`data: []`), UI mới được phép tuyên bố học viên ở trạng thái `PRE_ENROLLMENT` (*"Chưa có lớp học"*).
- Mọi lỗi mạng hoặc lỗi máy chủ **BẮT BUỘC PHẢI RENDER ERROR STATE KÈM RETRY**, không được phép nuốt lỗi thành Empty State.

### Section 21.3: Hợp Đồng Badge Ngữ Nghĩa & Truy Cập Đa Phương Thức (Semantic Badge & Multi-Modal Accessibility)
1. **Màu Sắc Chỉ Là Tăng Cường (Reinforcement Policy)**: Màu sắc tuyệt đối không bao giờ là kênh thông tin duy nhất để truyền tải trạng thái nghiệp vụ (đảm bảo chuẩn tiếp cận Web Accessibility WCAG).
2. **Công Thức 3 Thành Tố Bắt Buộc Cho Mọi Badge Trạng Thái**:
   $$\text{Status Badge} = \text{Badge Variant Ngữ Nghĩa (success/warning/info/destructive)} + \text{Lucide Icon Chuẩn} + \text{Nhãn Text Minh Bạch}$$
   - *Ví dụ chuẩn*: `<Badge variant="success"><CheckCircle2 className="h-3 w-3" /> Đã nhận xét</Badge>`
   - *Ví dụ chuẩn*: `<Badge variant="warning"><Clock className="h-3 w-3" /> Chờ phản hồi</Badge>`
   - *Ví dụ chuẩn*: `<Badge variant="info"><Edit3 className="h-3 w-3" /> Đang làm</Badge>`
3. **Cấm Dùng Emoji Giả Màu**: Nghiêm cấm đặt các emoji màu (`🟢`, `🟡`, `🔴`, `🔵`) vào trong component để giả lập trạng thái.

### Section 21.4: Hợp Nhất Đường Ống Thông Báo & Cảnh Báo (Unified Notification & Alert Pipeline)
1. **Một Nguồn Sự Thật Cho Thông Báo**: Toàn bộ thông báo người dùng, thông báo lớp học, và cảnh báo công việc tồn đọng (Pending Tasks, Unread Submissions) bắt buộc phải tích hợp trực tiếp qua hệ thống `notificationsApi`.
2. **Cấm API Phân Mảnh / Ảo**: Tuyệt đối cấm tạo các wrapper API riêng biệt không kết nối cơ sở dữ liệu thật (`alertsApi`, `announcementsApi`). Mọi thông báo phải được phân loại qua enum chuẩn (`ANNOUNCEMENT`, `PENDING_GRADING`, `NEW_SUBMISSION`, `SYSTEM_ALERT`).
3. **Tính Nguyên Tử Khi Đánh Dấu Đã Xử Lý (Atomic Invalidation)**: Khi một thông báo/cảnh báo được đánh dấu đã đọc (`markAsRead`), client bắt buộc phải kích hoạt đồng thời Invalidation cho toàn bộ query keys liên đới:
   - `queryClient.invalidateQueries({ queryKey: ["notifications-unread-count"] })`
   - `queryClient.invalidateQueries({ queryKey: ["notifications-list"] })`
   - `queryClient.invalidateQueries({ queryKey: ["alerts-widget"] })`

---

## ARTICLE XXII: CANONICAL SUBMISSION DOMAIN & DUAL-BACKEND ELIMINATION (MIỀN BÀI NỘP CHUẨN & TRIỆT TIÊU LỖI SPLIT-BRAIN BACKEND)

### Section 22.1: CSDL Nguồn Sự Thật Duy Nhất (Single Canonical Database of Record)
1. Toàn bộ vòng đời bài làm và câu trả lời (`exam_submissions`, `answers`) thuộc quyền quản lý độc quyền của **Supabase PostgreSQL Cloud**.
2. **Triệt tiêu Mô hình Split-Brain**: Tuyệt đối cấm mô hình chia rẽ kiến trúc "Start ghi vào Supabase nhưng Submit/GetById gọi sang Fastify/MySQL". Mọi hành vi tạo "hộ chiếu" ở DB này nhưng nộp ở DB khác là vi phạm nghiêm trọng luật Single Canonical Database.
3. **Cấm Dual-Write Không Nguyên Tử**: Tuyệt đối không được triển khai cơ chế ghi đồng thời vào cả MySQL và Supabase ở tầng Client để "chữa cháy" triệu chứng.

### Section 22.2: Một UUID Bất Biến Cho Toàn Bộ Vòng Đời (Single Lifecycle UUID Invariant)
Toàn bộ hành trình của một lượt làm bài thi bắt buộc gắn liền với **duy nhất 1 chuỗi UUID** xuyên suốt:
$$\text{Start Attempt} \xrightarrow{\text{1 UUID}} \text{Autosave Answers} \xrightarrow{\text{1 UUID}} \text{Submit Exam} \xrightarrow{\text{1 UUID}} \text{Teacher Grading} \xrightarrow{\text{1 UUID}} \text{Review Results}$$

### Section 22.3: Cô Lập & Dọn Sạch Runtime Callers (Runtime Isolation Policy)
1. Trước khi xóa mã nguồn backend legacy, bắt buộc phải chứng minh **Runtime Callers = 0**:
   - `grep -R "API_BASE_URL/submissions" src/` $\longrightarrow 0$ kết quả.
   - `grep -R "API_BASE_URL/homeworks" src/` $\longrightarrow 0$ kết quả trên luồng học viên.
2. Không còn bất kỳ component học viên hay giáo viên nào gửi request nộp bài sang Fastify endpoint cũ.

---

## ARTICLE XXIII: TRUTHFUL AUTOSAVE, IDEMPOTENCY & PRE-SUBMIT FLUSH (CƠ CHẾ LƯU TỰ ĐỘNG TRUNG THỰC & NỘP BÀI NGUYÊN TỬ)

### Section 23.1: Giao Diện Lưu Nháp Trung Thực 3 Trạng Thái (Truthful Autosave UI Invariant)
1. Giao diện làm bài **TUYỆT ĐỐI KHÔNG ĐƯỢC MẶC ĐỊNH HIỂN THỊ "ĐÃ LƯU"** khi chưa có xác nhận từ CSDL.
2. Hệ thống bắt buộc phân biệt rạch ròi 3 trạng thái phản hồi:
   - `Đang lưu... (màu vàng / animate-pulse)`: Khi có câu trả lời mới đang chờ gửi hoặc request đang trên đường truyền mạng.
   - `✓ Đã lưu tự động (màu xanh)`: CHỈ KHI VÀ CHỈ KHI CSDL PostgreSQL trả về HTTP 200/201 xác nhận bản ghi đã ghi đĩa an toàn.
   - `⚠ Lưu thất bại (màu đỏ)`: Khi mất mạng hoặc server lỗi, kèm cờ báo động để học viên không bị mất dữ liệu khi chuyển câu.

### Section 23.2: Quy Trình Xả Nháp Trước Khi Nộp (Pre-Submit Flush Sequence)
Nghiêm cấm việc gửi lệnh Final Submit khi vẫn còn câu trả lời chưa lưu hoặc timer debounce đang đếm lùi. Quy trình nộp bài bắt buộc tuân theo chuỗi tuần tự nghiêm ngặt:
$$\text{Click "Nộp Bài"} \longrightarrow \text{Hủy Debounce Timer} \longrightarrow \text{Flush Đồng Bộ 100\% Answers} \longrightarrow \text{Xác Nhận DB Persistence} \longrightarrow \text{Finalize Submission}$$

### Section 23.3: Tính Bất Biến Idempotent Attempt & Retake Semantics
1. **Một Active Attempt Tại Một Thời Điểm**: Đối với mỗi cặp `(student_id, exam_id)`, trạng thái `in_progress` chỉ được phép tồn tại tối đa **1 bản ghi duy nhất**.
2. **Khôi Phục Trạng Thái Khi F5/Reload**: Khi học viên làm mới trang, mở lại tab hoặc mạng chập chờn, hệ thống bắt buộc phải **Resume** đúng attempt đang làm dở kèm toàn bộ câu trả lời đã lưu, không được sinh UUID mới làm rác CSDL.
3. **Quyền Làm Lại (Retake)**: Học viên chỉ được phép bắt đầu một attempt mới sau khi attempt cũ đã được chấm điểm hoàn tất (`status = 'graded'`).

---

## ARTICLE XXIV: ANTI-CHEATING DATA BOUNDARY & SERVER-SIDE RPC (RANH GIỚI BẢO MẬT ĐÁP ÁN & THẨM QUYỀN CHẤM ĐIỂM SERVER)

### Section 24.1: Giấu Đáp Án Tuyệt Đối Khỏi Browser (Answer Key Privacy Invariant)
1. **Không Dựa Vào UI Để Bảo Mật**: Tuyệt đối không dùng logic "ẩn trên UI nhưng API vẫn trả về `correct_answer`" vì học viên có thể mở DevTools/Network Tab xem trước toàn bộ đáp án.
2. **Ranh Giới Dữ Liệu Tầng CSDL (Data Projection Boundary)**:
   - Học viên khi làm bài chỉ được phép truy vấn thông qua View chuyên biệt: `student_exam_questions_view` (loại bỏ hoàn toàn cột `correct_answer`).
   - Cột `correct_answer` là dữ liệu tuyệt mật, chỉ có Backend / PostgreSQL Stored Procedure mới có quyền đọc.

### Section 24.2: Thẩm Quyền Chấm Điểm Tại Server / Stored Procedure
1. Logic chấm điểm khách quan và cập nhật điểm số tổng bắt buộc phải đóng gói thành Stored Procedure chạy ngầm tại PostgreSQL (`submit_exam_attempt`).
2. **Quy Chuẩn Hàm SECURITY DEFINER**:
   - Bắt buộc khóa cứng: `SET search_path = public, pg_temp;`.
   - Bắt buộc thu hồi quyền thực thi mặc định: `REVOKE EXECUTE ON FUNCTION ... FROM PUBLIC;`.
   - Bắt buộc kiểm tra danh tính nội bộ: `auth.uid() = submission.student_id`.
   - Cấm tin tưởng tham số `p_student_id` do Client gửi lên.

### Section 24.3: Chống Giả Mạo Điểm Số (Anti-Tampering Invariant)
Học viên (role `authenticated` / `student`) bị cấm tuyệt đối quyền thực hiện lệnh `UPDATE` trực tiếp lên các cột `total_score`, `correct_answers`, `status`, `graded_by` của bảng `exam_submissions` thông qua Supabase PostgREST client. Mọi sự thay đổi trạng thái điểm số chỉ được phép thực hiện thông qua RPC đã kiểm toán hoặc Role Giáo Viên/Admin.

---

## ARTICLE XXV: SPATIAL IDENTITY SYSTEM & WAYFINDING DESIGN (HỆ THỐNG NHẬN DIỆN KHÔNG GIAN & THIẾT KẾ ĐIỀU HƯỚNG)

### Section 25.1: 4 Lãnh Địa Không Gian (The 4 Spatial Realms)
Hệ thống IELTS NextBand thiết lập 4 không gian trải nghiệm đặc trưng giúp học viên nhận biết vị trí của mình chỉ trong 1 giây:

```text
[1. 🏠 SẢNH CHÍNH - THE HUB] ──────► Màu Slate / Blue-gray (Trung tính, điều hướng, chọn lộ trình)
           │
           ▼
[2. 🏫 LỚP HỌC - THE CLASSROOM] ──► Màu Emerald / Teal (Thanh neo 4px Emerald + Không gian học tập lớp)
           │
           ▼
[3. ⚔️ PHÒNG LÀM BÀI - TRAINING ROOM] ► Màu Indigo / Violet (Thanh neo 4px Indigo + Tập trung làm nhiệm vụ)
           │
           ▼
[4. 📊 KẾT QUẢ - HALL OF RESULTS] ─► Màu Blue / Cyan (Huy hiệu Blue + Phân tích điểm số & nhận xét)
```

### Section 25.2: Nguyên Tắc Tách Biệt Màu Không Gian & Màu Trạng Thái
1. **Spatial Color (Tôi đang ở đâu?)**: Dùng để neo giữ nhận diện không gian (Emerald = Lớp học, Indigo = Phòng thi, Blue = Kết quả). Phải sử dụng màu đơn sắc (single-hue anchor line 4px), không lạm dụng gradient đa sắc gây xao nhãng.
2. **Semantic Color (Điều gì đang xảy ra?)**: Dùng để biểu thị trạng thái dữ liệu (Xanh lục = Đúng/Đã lưu, Vàng = Đang lưu/Chờ chấm, Đỏ = Sai/Lỗi).
3. **Cấm Đánh Lẫn Hai Hệ Màu**: Tuyệt đối không dùng màu không gian để thay thế cho màu trạng thái dữ liệu và ngược lại.

---

## ARTICLE XXVI: POST-SUBMISSION RESULT CLARITY & STATE-DRIVEN COMPARISON (TÍNH MINH BẠCH KẾT QUẢ SAU KHI NỘP & ĐỐI CHIẾU ĐÁP ÁN TRỰC QUAN)

### Section 26.1: 4 Khối Thống Kê Tổng Quan Màu Sắc (Color-Coded Result Hero Cards)
Giao diện kết quả bài nộp (`SubmissionDetail`) bắt buộc phải hiển thị 4 khối thống kê trực quan trên đầu trang:
- 🟩 **Khối Câu Đúng (Màu Emerald)**: Số câu đúng to rõ kèm biểu tượng `✓`.
- 🟥 **Khối Câu Sai (Màu Rose)**: Số câu sai để học viên nắm ngay các điểm cần khắc phục.
- 🟦 **Khối Độ Chính Xác (Màu Blue)**: Tỷ lệ % hoàn thành chính xác.
- ⬜ **Khối Thời Gian & Tiến Độ (Màu Slate)**: Giờ nộp bài và tổng số câu đã làm.

### Section 26.2: Thẻ Câu Hỏi Nhận Diện Theo Trạng Thái (State-Driven Card Borders & Badges)
Mỗi thẻ câu hỏi (`AnswerResultCard`) khi xem lại kết quả bắt buộc có viền màu bên trái và Badge ngữ nghĩa:
- **Câu Đúng**: Viền trái 4px Xanh lá (`border-l-4 border-l-emerald-500 bg-emerald-50/15`) + Badge `✓ Đúng (Điểm/Tổng)`.
- **Câu Sai**: Viền trái 4px Đỏ (`border-l-4 border-l-rose-500 bg-rose-50/15`) + Badge `✗ Sai (0/Tổng)`.
- **Câu Tự Luận / Nói**: Viền trái 4px Cam (`border-l-4 border-l-amber-400 bg-amber-50/15`) + Badge `⏳ Chờ giáo viên chấm`.
- **Câu Chưa Làm**: Viền trái 4px Xám (`border-l-4 border-l-slate-300 bg-slate-50/30`) + Badge `Chưa làm`.

### Section 26.3: Đối Chiếu Đáp Án Trực Quan (Side-by-Side Comparison Box)
- Hộp **"Câu trả lời của bạn"** tự động chuyển màu theo kết quả (Xanh nếu đúng, Đỏ nếu sai).
- Hộp **"Đáp án chính xác"** được đóng khung nổi bật với màu Xanh Ngọc kèm biểu tượng `✓ Đáp án chính xác: [Nội dung]` để học viên không bao giờ bị lẫn lộn giữa bài làm của mình và đáp án chuẩn.

---

## ARTICLE XXVII: QUESTION DOMAIN CONTRACT & SEMANTIC DATA INTEGRITY (HIẾN PHÁP DỮ LIỆU CÂU HỎI & BẢO VỆ TÍNH TOÀN VẸN NGỮ NGHĨA)

### Section 27.1: Nguyên Tắc Đồng Bộ Trạng Thái Soạn Thảo (Authoring State Cleanliness)
1. **Cấm Rò Rỉ State Mặc Định (Zero Default State Leaks)**: Form soạn thảo câu hỏi (`SectionEdit`) tuyệt đối không dùng state mặc định chung `options: ["", "", "", ""]` áp đặt cho mọi loại câu hỏi.
2. **Tự Động Reset Khi Đổi Loại Câu (Type-Switching State Rebuild)**: Khi chuyển `questionType` trong Admin UI, toàn bộ state phụ thuộc phải được tái tạo sạch theo Hợp đồng Ngữ nghĩa:
   - `multiple_choice`: Tái tạo `options = ["", ""]`, `correctAnswer = ""`.
   - `short_answer` / `essay` / `speaking`: Bắt buộc set `options = null`, `correctAnswer = ""` (hoặc null).
   - `matching`: Bắt buộc set `options = null`, `correctAnswer = JSON({ items, options, pairs })`.
   - `fill_blank`: Bắt buộc set `options = null`, `fillBlankAnswers = [""]`.

### Section 27.2: Thẩm Quyền Kiểm Tra Ngữ Nghĩa Backend (Backend Semantic SuperRefine Authority)
1. **Không Tin Tưởng Frontend Payload**: Backend Zod Schema (`questions.routes.ts`) là cổng thẩm định tối cao. Phải sử dụng `.superRefine()` để kiểm tra ngữ nghĩa runtime:
   - **MCQ Invariant**: Câu trắc nghiệm bắt buộc có $\ge 2$ options có nội dung thực tế sau khi `.trim()`. Nếu $< 2$ options $\implies$ **REJECT NGAY LẬP TỨC với HTTP 400 Bad Request**. Tuyệt đối không âm thầm nuốt lỗi hoặc tự ý biến thành `options: null`.
   - **Text Question Invariant**: Đối với `short_answer`, `essay`, `speaking`, `fill_blank`, backend bắt buộc làm sạch và lưu `options: null`.
   - **Matching Invariant**: Bắt buộc kiểm tra JSON structure có đủ `items` (mảng không rỗng), `options` (mảng không rỗng), và `pairs` (từ điển hợp lệ trỏ đúng chỉ số).

### Section 27.3: Cấm Renderer Đoán Ngữ Nghĩa (Zero Speculative Rendering & Isolated Failure)
1. **Không Tự Ý Đoán Semantic**: Student Renderer (`GrammarSection`, `WritingSection`, `QuestionControlRenderer`) tuyệt đối không được tự ý biến một câu `multiple_choice` thiếu options thành `Textarea`.
2. **Phòng Thủ Lỗi Cô Lập (Isolated Failure Defense)**: Khi gặp bản ghi câu hỏi bị lỗi cấu trúc dữ liệu, UI bắt buộc render một `<Alert variant="destructive">` thông báo lỗi nội dung tại đúng vị trí câu đó. Tuyệt đối không để một câu lỗi làm crash cả bài thi hay làm hỏng khả năng làm bài của các câu khác.

---

## ARTICLE XXVIII: HYBRID EXAM WORKSPACE & TWO-WAY WAYFINDING INTEGRITY (KHÔNG GIAN LÀM BÀI THI HYBRID & ĐIỀU HƯỚNG KHÔNG GIAN ĐỒNG BỘ 2 CHIỀU)

### Section 28.1: Nguyên Tắc "Nội Dung Thay Đổi, Công Cụ Trả Lời Không Thay Đổi" (Unified Written Response Box)
1. **Thống Nhất Giao Diện Tự Luận**: Toàn bộ các dạng câu hỏi trả lời bằng chữ (`short_answer`, `essay`, nhận diện S-V, viết lại câu, dịch câu) **BẮT BUỘC** dùng chung một component nhập liệu chuẩn: `WritingAnswerBox`.
2. **Chuẩn Hóa Kích Thước & Trải Nghiệm**:
   - Chiều cao mặc định 5–6 dòng (`min-h-[135px]`, `max-h-[340px]`), cuộn nội bộ khi dài. Không để 24 câu hỏi làm phình trang vô tận.
   - Tích hợp sẵn Footer thống kê: Đếm số từ thực tế theo chuẩn chuẩn hóa khoảng trắng (`value.trim().split(/\s+/).filter(Boolean).length`) + Chỉ báo tự động lưu (`✓ Đã lưu` / `Đang lưu...`).

### Section 28.2: Ghim Ngữ Cảnh Nhóm (Sticky Group Context Header)
1. **Xóa Bỏ Hiện Tượng Quên Yêu Cầu Đề**: Với các bài thi nhiều nhóm (Group 1: Dịch câu, Group 2: Nhận diện S-V, Group 3: Phát hiện lỗi), Header và Chỉ dẫn của từng nhóm (`QuestionGroupHeader`) **BẮT BUỘC** được ghim nhẹ (`sticky top-14 md:top-16 z-20`) khi học viên cuộn làm bài trong phạm vi nhóm đó.
2. **Chuyển Giao Mượt Mà**: Khi cuộn sang nhóm tiếp theo, Header nhóm mới tự động đẩy Header nhóm cũ ra khỏi khung nhìn, đảm bảo luôn có duy nhất một ngữ cảnh chỉ dẫn hiển thị.

### Section 28.3: Đồng Bộ Điều Hướng 2 Chiều Dựa Trên Trung Tâm Viewport (Center-Based Viewport Synchronization)
1. **Nguồn Chân Lý Duy Nhất Cho Câu Đang Xem (`activeQuestionId`)**:
   - `activeQuestionId` được xác định theo thời gian thực bởi câu hỏi nằm gần trục ngang trung tâm của Viewport nhất (`Math.abs(elCenter - viewportCenter)` nhỏ nhất).
   - Tuyệt đối cấm duy trì hai trạng thái độc lập giữa vị trí cuộn màn hình và số câu highlight ở thanh Navigator đáy.
2. **Hệ Thống Ký Hiệu Điều Hướng Chuẩn (Navigator Visual Semantics)**:
   - `[ N ]` = Trạng thái Đang xem (Viền highlight nổi bật, không tranh chấp màu sắc với trạng thái đã làm).
   - `●` = Trạng thái Đã trả lời (Chấm xanh ngọc tinh tế).
   - `⚑` = Trạng thái Đã gắn cờ xem lại (Chấm vàng cảnh báo).
   - `○` = Trạng thái Chưa làm.
3. **Phản Hồi Mobile Linh Hoạt**: Trên màn hình nhỏ, thanh điều hướng đáy hiển thị nút `‹ [Câu X/Y] ›` cho phép chạm để mở Bottom Sheet xem toàn bộ bảng câu hỏi.

---

## ARTICLE XXIX: HISTORICAL DATA FORENSIC & SAFE DATA REPAIR (ĐIỀU TRA PHÁP Y DỮ LIỆU & DI TRÚ DỮ LIỆU AN TOÀN)

### Section 29.1: Quy Trình Kiểm Tra Lịch Sử Trước Khi Sửa Dữ Liệu Sống (Pre-Migration Forensic Check)
Khi thực hiện sửa chữa hoặc thay đổi `questionType` / cấu trúc dữ liệu trên Production Database, kỹ sư và AI bắt buộc tuân thủ quy trình 3 bước:
1. **Bước 1: Audit Lịch Sử Bài Nộp**: Truy vấn bảng `answers` và `submissions` kiểm tra xem đã có học viên nào nộp bài trên các câu hỏi bị ảnh hưởng hay chưa. Nếu đã có bài nộp, bắt buộc lập chiến lược di trú bảo toàn điểm số lịch sử.
2. **Bước 2: Phân Loại Dữ Liệu Rác vs Dữ Liệu Thực (Zero Blind Wipe Policy)**: Quét toàn bộ các bản ghi nghi vấn (`options != null` trên câu tự luận). Phân loại chính xác:
   - `Dummy-only options` (chỉ chứa mảng rỗng `["", "", "", ""]`): Cho phép cleanup về `null`.
   - `Meaningful options` (có chứa text thật): **CẤM TỰ Ý XÓA**, bắt buộc gắn cờ điều tra nguyên nhân.
3. **Bước 3: Tái Quét Toàn Diện Sau Di Trú (Post-Migration Re-Scan Guard)**: Chạy script kiểm toán toàn bộ 100% bản ghi CSDL, chứng minh bằng số liệu thực nghiệm đạt **0 vi phạm critical** và **0 vi phạm data hygiene**.

---

## ARTICLE XXX: STRICT LOCAL PRODUCTION BUILD VERIFICATION (CỔNG KIỂM TRA BẢN BUILD PRODUCTION BẮT BUỘC TRƯỚC KHI BÀN GIAO)

### Section 30.1: Chống Ngụy Biện "Chỉ Check Typescript Là Đủ"
1. **Lệnh Bắt Buộc (Mandatory Build Check)**: Sau bất kỳ thay đổi nào liên quan đến UI / Frontend Component (`.tsx`, `.jsx`), kỹ sư/AI **BẮT BUỘC PHẢI CHẠY LỆNH BUILD PRODUCTION THỰC TẾ** (`npm run build` / `vite build`).
2. **Điều Kiện Đóng Sprint**:
   - `npx tsc --noEmit` đạt 0 lỗi là **chưa đủ**.
   - `npm run build` bắt buộc phải trả về mã thoát `0` và tạo ra thư mục `dist/` hoàn chỉnh mà không gặp bất kỳ lỗi cú pháp esbuild/Vite Transform nào.

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

---

## ARTICLE XX: FRONTEND DEPLOYMENT RESILIENCE & CDN CACHE ARCHITECTURE (KIẾN TRÚC PHỤC HỒI TRIỂN KHAI & BẢO TOÀN CACHE CDN)

> **Nguồn gốc & Lịch sử Sự cố**: Sự cố production ngày 18/08/2026 — Lỗi `Failed to fetch dynamically imported module: .../LoginPage-[hash].js` xảy ra sau khi deploy. Kiểm toán thực nghiệm phát hiện: ngoài việc lệch version giữa tab cũ và build mới, nguyên nhân cốt lõi là cấu hình SPA Rewrite ngây thơ (`/(.*) -> index.html`) đã biến request asset thiếu thành `200 OK text/html`, gây phá vỡ giao thức ES Module và vô hiệu hóa cơ chế tự động phục hồi của trình duyệt.

### Section 20.1: Cạm Bẫy SPA Rewrite Fallback & Bản Chất Version Skew
1. **Bản chất Version Skew**: Vite bundler băm mã hash vào tên file tĩnh (ví dụ `LoginPage-CIuSTK3U.js`). Khi triển khai bản build $N+1$, các file chunk của build $N$ không còn tồn tại trên server. Các tab trình duyệt mở từ trước sẽ yêu cầu chunk cũ $N$.
2. **Cạm bẫy "SPA Fallback Trap"**:
   - Nếu server (Vercel, Nginx, Caddy, Cloudflare) bắt mọi request bằng wildcard rewrite `/(.*) -> /index.html`:
   - Khi trình duyệt yêu cầu `LoginPage-[old-hash].js`, server **không trả về 404**, mà trả về **`200 OK` kèm nội dung `index.html` (MIME `text/html`)**.
   - Trình duyệt mong đợi nhận JavaScript ES Module nhưng nhận về HTML $\rightarrow$ Ném lỗi `Failed to fetch dynamically imported module` hoặc MIME type mismatch error.
3. **Kỷ luật Cốt lõi**: Cấm tuyệt đối việc dùng SPA Fallback để che giấu mã `404 Not Found` của các file tĩnh thiếu.

### Section 20.2: Kỷ Luật Định Tuyến Web Server / CDN Edge (Route Isolation & 404 Discipline)
Mọi cấu hình web server (Vercel `vercel.json`, Nginx `nginx.conf`, Cloudflare Pages) **BẮT BUỘC** phải tách biệt 2 namespace định tuyến theo thứ tự ưu tiên tuyệt đối:

```text
[Incoming Request]
       │
       ▼
1. Filesystem Resolution (handle: "filesystem")
       │
       ├── File tồn tại ───────────────► 200 OK + Immutable Cache
       └── File KHÔNG tồn tại
               │
               ├── Thuộc namespace /assets/* ──► BẮT BUỘC TRẢ VỀ 404 NOT FOUND (CẤM fallback)
               └── Thuộc App Route thông thường ─► Rewrite về /index.html (SPA Fallback)
```

**Cấu hình Vercel chuẩn mực (`vercel.json`):**
```json
{
  "routes": [
    {
      "src": "/assets/(.*)",
      "headers": { "cache-control": "public, max-age=31536000, immutable" },
      "continue": true
    },
    { "handle": "filesystem" },
    { "src": "/assets/(.*)", "status": 404 },
    {
      "src": "/(.*)",
      "headers": { "cache-control": "public, max-age=0, must-revalidate" },
      "dest": "/index.html"
    }
  ]
}
```

### Section 20.3: Kỷ Luật Cache-Control 2 Tầng (Dual-Tier Cache Discipline)
Nghiêm cấm dùng một chính sách Cache-Control cào bằng cho toàn bộ website. Bắt buộc phân chia chính xác 2 tầng:
1. **Tầng Entrypoint (`index.html`, `/`)**:
   - Header bắt buộc: `Cache-Control: public, max-age=0, must-revalidate` (hoặc `no-cache`).
   - Mục đích: Đảm bảo khi người dùng mở tab mới hoặc bấm F5, trình duyệt/CDN Edge luôn revalidate và nhận ngay file `index.html` mang danh sách hash mới nhất của production.
2. **Tầng Hashed Static Assets (`/assets/*`, `.js`, `.css`, `.woff2`)**:
   - Header bắt buộc: `Cache-Control: public, max-age=31536000, immutable`.
   - Mục đích: Vì tên file đã chứa content hash bất biến, tài nguyên này an toàn để cache vĩnh viễn trên Browser Cache và CDN Edge, tối ưu 100% tốc độ tải trang.

### Section 20.4: Mô Hình Phục Hồi 3 Tầng (3-Tier Resilience Architecture)
Hệ thống thiết lập chuỗi phòng thủ 3 tầng khép kín từ hạ tầng đến client runtime:

```text
[TẦNG 1: Edge/Server]
  - File tĩnh tồn tại: 200 OK (Cache 1 năm)
  - File tĩnh thiếu (stale chunk): 404 Not Found (Ngắt fallback)
         │
         ▼ (404 kích hoạt sự kiện mạng client)
[TẦNG 2: Vite Preload Recovery (src/main.tsx)]
  - Bắt sự kiện window 'vite:preloadError'
  - Kiểm tra sessionStorage rate-limiter: Nếu chưa reload trong 15s -> window.location.reload()
  - Nếu đã reload trong 15s (lỗi lặp lại do CDN hỏng) -> Chuyển quyền xử lý cho Tầng 3
         │
         ▼ (Khi lỗi kéo dài)
[TẦNG 3: Error Boundary UI (src/App.tsx & src/main.tsx)]
  - GlobalErrorBoundary / AppErrorBoundary bắt lỗi, dừng crash toàn trang
  - Hiển thị UI thân thiện bằng Semantic Design Tokens kèm nút "Làm mới trang"
```

### Section 20.5: Quy Tắc Kiểm Toán Bằng Chứng Deployment (Empirical Evidence Protocol)
Theo Điều khoản Article II, khi xảy ra sự cố tải chunk hoặc nghi ngờ version mismatch, **nghiêm cấm AI và Kỹ sư phán đoán mò là lỗi React Component**. Bắt buộc thực thi kiểm toán thực nghiệm bằng lệnh `curl -I`:
1. `curl -I https://nextband.site/` $\rightarrow$ Xác minh `index.html` có `max-age=0` và trỏ đúng entrypoint script hiện tại.
2. `curl -I https://nextband.site/assets/[chunk-loi].js` $\rightarrow$ Xác minh server trả về **404 Not Found** (nếu trả về `200 text/html` là vi phạm Section 20.2).
3. `curl -I https://nextband.site/assets/[chunk-active].js` $\rightarrow$ Xác minh chunk đang hoạt động có header `max-age=31536000, immutable`.

- **PASS/FAIL Condition**:
  - **PASS**:
    1. Cấu hình `vercel.json` có route chặn `/assets/*` trả 404 khi missing file.
    2. Request tới asset không tồn tại trả về đúng mã HTTP 404 (không trả về HTML 200).
    3. `src/main.tsx` có `vite:preloadError` listener với `sessionStorage` rate-limiter.
    4. Mọi lazy component trong `src/App.tsx` bọc bởi `lazyWithRetry`.
  - **FAIL**:
    1. Tồn tại cấu hình wildcard rewrite `/(.*)` áp dụng lên `/assets/`.
    2. Request tới chunk lỗi trả về `200 OK` chứa thẻ `<!DOCTYPE html>`.
    3. Tự động reload vô hạn không có cờ chặn rate-limit.
  - **Verification Method**:
    - Chạy `curl -I https://nextband.site/assets/non_existent_test_chunk.js` $\rightarrow$ phải trả về `HTTP 404`.
    - Kiểm tra `vercel.json`, `nextband/src/main.tsx`, `nextband/src/App.tsx`.

---

## ARTICLE XXI: DESIGN TOKEN DISCIPLINE — CẤM HARDCODE MÀU SẮC TRONG SHARED COMPONENTS (KỶ LUẬT DESIGN TOKEN)

> **Nguồn gốc**: Sự cố ngày 16/08/2026 — `AppErrorBoundary` và `PageLoader` được viết với hardcoded Tailwind colors (`slate-900`, `blue-600`, `red-50`) thay vì semantic design tokens, gây ra màn hình error boundary hiển thị màu sai khi theme thay đổi.

### Section 21.1: Phân Biệt Hardcoded Color vs Design Token

| Loại | Ví dụ | Khi nào được dùng |
|---|---|---|
| **Hardcoded Tailwind color** | `text-slate-900`, `bg-blue-600`, `border-red-200` | **Chỉ** trong mockup, prototype, hoặc one-off UI không dùng lại |
| **Semantic Design Token** | `text-foreground`, `bg-primary`, `border-destructive/20` | **Bắt buộc** trong mọi shared component, layout, error boundary |

### Section 21.2: Quy Tắc Bắt Buộc

1. **Shared components** (ErrorBoundary, PageLoader, Layout, Toast, Dialog...) **BẮT BUỘC** dùng semantic design tokens:
   - Text: `text-foreground`, `text-muted-foreground`, `text-destructive`
   - Background: `bg-background`, `bg-card`, `bg-primary`, `bg-destructive/10`
   - Border: `border-border`, `border-destructive/20`
   - Interactive: `bg-primary hover:bg-primary-hover`, `text-primary-foreground`
   - Spinner: `border-primary` (không phải `border-blue-600`)

2. **Cấm tuyệt đối** dùng màu cụ thể (`slate-*`, `blue-*`, `red-*`, `gray-*`) bên trong:
   - `AppErrorBoundary` / `GlobalErrorBoundary`
   - `PageLoader` / skeleton screens
   - Mọi component trong `src/layouts/`
   - Mọi component `ui/` trong design system

3. **Quy tắc kiểm tra (Smell Test)**: Nếu component có thể thay đổi màu mà không cần chỉnh code (chỉ cần đổi CSS variable trong theme) → đang dùng token đúng. Nếu buộc phải sửa class string → đang hardcode sai.

- **PASS/FAIL Condition**:
  - **PASS**: `AppErrorBoundary`, `PageLoader`, tất cả Layouts đều dùng semantic tokens. Thay đổi `--primary` CSS variable → toàn bộ UI cập nhật đồng bộ không cần sửa code.
  - **FAIL**: Tồn tại bất kỳ `text-slate-*`, `bg-blue-*`, `border-red-*` nào trong `ErrorBoundary`, `PageLoader`, hoặc shared Layout components.
  - **Verification Method**: `grep -r "text-slate\|bg-blue\|border-red\|text-gray" src/components/ui/ src/layouts/ src/main.tsx` → kết quả phải rỗng.

---

## ARTICLE XXII: CANONICAL EXAM DOMAIN & LEAN LEARNING LOOP ARCHITECTURE (MIỀN KHẢO THÍ CHUẨN HÓA & VÒNG LẶP HỌC TẬP TINH GỌN)

> **Nguồn gốc**: Chiến dịch Phẫu thuật Kiến trúc P0/P1 ngày 19-20/08/2026 — Xóa bỏ triệt để hiện tượng phân mảnh Domain mồ côi (Shadow Models: `homeworks`, `submissions`, `/me/workspace`), cô lập hoàn toàn Enrollment Lifecycle, và thiết lập Vòng lặp Sửa bài Tinh gọn (Lean Learning Loop) với tính bất biến của dữ liệu lịch sử.

### Section 22.1: Độc Quyền Nguồn Sự Thật & Nghiêm Cấm Shadow Model (Zero-Shadow Authority)
1. **Chuỗi Canonical Model Duy Nhất**: Mọi hoạt động giao bài, làm bài, chấm điểm và phản hồi **BẮT BUỘC** đi qua chuỗi phân cấp chuẩn:
   ```text
   Class ──► Course ──► Exam ──► ExamSubmission ──► Answer
   ```
2. **Cấm Tuyệt Đối Shadow Models**: Nghiêm cấm tạo hoặc duy trì các bảng/route song song (`homeworks`, `submissions`, `/homeworks/*`, `/me/workspace`, `homeworkId`, `hwId`).
3. **Kỷ Luật Clean Retirement**: Khi một tính năng hoặc endpoint bị loại bỏ (như `/me/workspace`), toàn bộ Route, Controller, Service, Repository, DTO và API Client liên quan **BẮT BUỘC** phải bị tháo dỡ hoàn toàn khỏi codebase, không để lại bất kỳ reference mồ côi nào.

### Section 22.2: Terminal-State Guarantee & Cô Lập Vòng Đời Ghi Danh (Pure Enrollment Lifecycle)
1. **Pure Lifecycle Boundary**: `useStudentLifecycle` CHỈ ĐƯỢC PHÉP quản trị trạng thái ghi danh thuần túy dựa trên `GET /classes/my-classes`:
   ```text
   LOADING ──► ENROLLED | NOT_ENROLLED | API_ERROR | NETWORK_ERROR
   ```
2. **Cấm Kéo Sập Vòng Đời Bởi Dữ Liệu Thứ Cấp**: Tuyệt đối không gộp việc fetch KPI, tiến độ làm bài, workspace, hay danh sách bài tập vào `useStudentLifecycle`.
3. **Bảo Đảm Điểm Kết Thúc (Terminal-State Guarantee)**: Trạng thái `LOADING` bắt buộc phải chuyển sang một trạng thái kết thúc (Terminal State) sau timeout hoặc lỗi mạng. Lỗi ở các widget con (tiến độ, biểu đồ) phải được cô lập cục bộ (Component-Level Fault Isolation), không được quyền kéo sập quyền truy cập lớp học của học viên.

### Section 22.3: Bất Biến Lịch Sử Làm Bài (Immutable Attempts & Append-Only Revision)
1. **Attempt 1 Là Read-Only Bất Biến**: Khi học viên nộp bài (`Attempt 1`) và giáo viên chấm điểm (`GRADED`), bản ghi `ExamSubmission` và các câu trả lời (`Answer`) gắn với attempt đó chuyển sang trạng thái đóng băng vĩnh viễn (**Read-Only**).
2. **Append-Only Revision Flow**: Bài sửa (`Attempt 2+`) là một bản ghi `ExamSubmission` mới được tạo độc lập:
   ```text
   Exam ──► Submission #1 (GRADED, Score 5.5, revisionRequired=true) [FROZEN]
                 │
                 ▼ (POST /submissions/revision)
            Submission #2 (IN_PROGRESS ──► SUBMITTED ──► GRADED, Score 7.0) [ACTIVE]
   ```
3. **Cách Ly Tuyệt Đối Câu Trả Lời**: Bảng `Answer` có ràng buộc `UNIQUE(submission_id, question_id)`. Câu trả lời của Attempt 2 thuộc về `submission_id` mới và **tuyệt đối không bao giờ được overwrite** câu trả lời của Attempt 1.
4. **Không Thêm Bảng Mồ Côi**: Không tạo bảng `SubmissionHistory` trung gian khi bản thân mô hình đa bản ghi `ExamSubmission` đã giải quyết trọn vẹn yêu cầu lịch sử.

### Section 22.4: Thiết Kế Phản Hồi Định Tính Tinh Gọn Trước Khi Mở Rộng Engine (Lean Domain First)
1. **Structured Feedback V1**: Phản hồi của giáo viên giữ ở mức tối giản, tập trung vào 3 trường:
   - `feedback`: Chuỗi nhận xét định tính chi tiết.
   - `primaryErrorCategory`: Nhóm lỗi chính cần khắc phục (`CONCEPT` | `STRUCTURE` | `EXPRESSION` | `GRAMMAR`).
   - `revisionRequired`: Cờ boolean xác định học viên có phải làm bản sửa hay không.
2. **Cấm Xây Dựng Engine Khi Chưa Có Dữ Liệu Thực**: Tuyệt đối không vội vã đưa AI, rubric chấm điểm đa chiều (C1–C4), hay tính năng bôi đen từng ký tự vào hệ thống khi chưa chứng minh được nhu cầu thực nghiệm.

### Section 22.5: Cấm "Browser Là Backend Thứ Hai" & Bắt Buộc Idempotency Guard (Strict Backend Authority)
1. **Backend Là Nguồn Thẩm Quyền Duy Nhất**: Mọi quyết định về tạo attempt, chuyển trạng thái (`IN_PROGRESS` $\rightarrow$ `SUBMITTED` $\rightarrow$ `GRADED`), phân quyền và tính điểm thuộc về Fastify Backend API. Cấm tuyệt đối cơ chế "client-side direct fallback" can thiệp vào các giao dịch nộp bài.
2. **Bắt Buộc Idempotency Guard**:
   - `POST /submissions/revision`: Phải kiểm tra nếu học viên đang có phiên `IN_PROGRESS` cho cùng đề thi thì trả về phiên đang mở, chống double-click tạo thừa attempt.
   - `POST /submissions/:id/submit`: Kiểm tra trạng thái, ngăn chặn nộp lặp (Double Submit Defense).

- **PASS/FAIL Condition**:
  - **PASS**:
    1. Zero reference tới `homeworks`, `submissions`, `workspaceRoutes` trong source code và API client.
    2. `useStudentLifecycle` hoạt động độc lập và luôn đạt Terminal State khi mock API lỗi.
    3. Toàn bộ Attempt cũ được bảo toàn 100% trong DB khi thực hiện Revision.
    4. Cả 2 bộ test suite Backend (`ielts-api`) và Frontend (`nextband`) pass 100%.
  - **FAIL**:
    1. Tồn tại bất kỳ query nào trỏ tới bảng `homeworks` hoặc endpoint `/homeworks`.
    2. Một thao tác làm bài sửa ghi đè (UPDATE) lên câu trả lời của attempt cũ.
    3. Trạng thái `LOADING` của student lifecycle treo vô hạn khi sub-resource lỗi.
  - **Verification Method**:
    - `grep -r "homeworksApi\|workspaceApi" nextband/src/` $\rightarrow$ Không có kết quả active.
    - Chạy `npx vitest run tests/p1_learning_loop.test.ts` trong `ielts-api`.
    - Chạy `npx vitest run src/test/p1_c_learning_loop_ui.test.tsx` trong `nextband`.

---

## ARTICLE XXIII: LIVE RUNTIME INTEGRITY & ANTI-MOCK-FALLACY (TOÀN VẸN MÔI TRƯỜNG RUNTIME THẬT & CHỐNG NGỤY BIỆN MOCK TEST)

> **Nguồn gốc**: Bài học sâu sắc từ sự cố ngày 20/08/2026 — Báo cáo "Hết lỗi" chủ quan khi bộ Unit test dùng Mock DB/API pass 100%, nhưng môi trường thực tế gặp lỗi do tiến trình Backend chưa khởi động và tầng Fallback Supabase chứa câu query PostgREST join sai schema.

### Section 23.1: Định Lý Chống Ngụy Biện Mock Test (The Anti-Mock-Fallacy Doctrine)
1. **Mock Test $\neq$ Runtime Readiness**: Một bài kiểm thử chạy trên môi trường Mock (`mockPrisma`, `vi.spyOn().mockResolvedValue`, in-memory database) **CHỈ** chứng minh logic nội tại không có lỗi cú pháp và hoạt động đúng trong điều kiện giả lập lý tưởng.
2. **Cấm Tuyệt Đối Báo "Hết Lỗi" Dựa Vào Mock**: Nghiêm cấm mọi kỹ sư hoặc AI Assistant kết luận *"Hệ thống đã hết lỗi"*, *"Sẵn sàng hoạt động"*, *"Production Ready"* nếu chỉ dựa vào kết quả của test runner sử dụng Mock.

### Section 23.2: Quy Trình Xác Minh 3 Cấp Độ Bắt Buộc (Mandatory 3-Tier Verification Protocol)
Trước khi đưa ra bất kỳ kết luận nào về tính sẵn sàng của hệ thống, bắt buộc phải thực thi và trình bằng chứng đủ 3 cấp độ:

```text
[Tier A: Static Integrity] ────► [Tier B: Automated Suite] ────► [Tier C: Live Runtime Pre-flight]
  • tsc --noEmit (0 error)         • Vitest Suites Pass             • Process Port Listening
  • Vite Build (0 warning)         • Regression Guards Pass         • Real HTTP Health Check (200)
                                                                    • Zero Broken DB Join / Query
```

1. **Tier A (Static Integrity)**: Kiểm tra kiểu tĩnh (`tsc --noEmit`), build production (`npm run build`) đảm bảo 0 lỗi biên dịch.
2. **Tier B (Automated Suite)**: Chạy toàn bộ test suite để đảm bảo không bị regression logic.
3. **Tier C (Live Runtime Pre-flight — Cấp Độ Bắt Buộc)**:
   - **Xác minh tiến trình (Process Verification)**: Kiểm tra tiến trình backend đang thực sự lắng nghe tại port dự kiến (ví dụ: `Get-NetTCPConnection` hoặc `netstat` kiểm tra Port 3000).
   - **Xác minh Health Check**: Gửi request HTTP thật tới `/api/v1/health` nhận phản hồi `200 OK`.
   - **Xác minh Khả dụng Mạng**: Đảm bảo không bị chặn bởi CORS, firewall, hay rớt kết nối Gateway.

### Section 23.3: Kỷ Luật Kiểm Soát Tầng Dự Phòng (Zero-Poisoned Fallback Discipline)
1. **Tầng Fallback Không Được Độc Hại**: Khi thiết kế cơ chế tự phục hồi 2 tầng (Dual-Tier Resilience: Gateway $\rightarrow$ Supabase Direct), câu lệnh truy vấn ở tầng Fallback **BẮT BUỘC** phải tuân thủ đúng Schema vật lý thực tế.
2. **Cấm Join Tùy Tiện Ở Tầng Fallback**: Tuyệt đối không sử dụng các cú pháp quan hệ suy đoán (như `profiles!classes_teacher_id_fkey`) ở tầng Fallback nếu không có bằng chứng Schema Cache của Supabase PostgREST hỗ trợ quan hệ đó.
3. **Cấm Nuốt Lỗi Fallback Bằng Mock**: Khi viết Unit Test cho module có Fallback (như `useStudentLifecycle`), **BẮT BUỘC** phải có test case kiểm thử chính câu query Fallback thực thi mà không làm sập hệ thống, không được chỉ mock bao bọc ở hàm cấp cao nhất.

- **PASS/FAIL Condition**:
  - **PASS**:
    1. Tiến trình backend thật đang lắng nghe trên cổng mạng và trả về HTTP 200 tại `/health`.
    2. Câu query Supabase Fallback không chứa bất kỳ quan hệ schema cache không hợp lệ nào.
    3. Trình đủ bằng chứng thực thi 3 cấp độ (Tier A, Tier B, Tier C).
  - **FAIL**:
    1. Báo cáo "Hết lỗi" khi backend process chưa chạy hoặc chưa verify HTTP response thật.
    2. Tồn tại câu query Supabase bị PostgREST từ chối `PGRST200` (Relationship not found).
  - **Verification Method**:
    - Chạy `Get-NetTCPConnection -LocalPort 3000` $\rightarrow$ State: `Listen`.
    - Gửi request `GET http://localhost:3000/api/v1/health` $\rightarrow$ Status: `200 OK`.


