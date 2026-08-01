# System Invariants & Integration Contract (Hợp Đồng Kiến Trúc & Quy Tắc Bất Biến)

Tài liệu này đóng vai trò là **Hợp Đồng Kiến Trúc (Architecture Contract)** tối cao của hệ thống IELTS NextBand. 
Mọi thay đổi về Mã nguồn UI, API DTO, hay Database Schema **BẮT BUỘC** phải tuân thủ và xác minh qua phương pháp kiểm thử tương ứng.

---

## 1. INTEGRATION INVARIANTS (Quy Tắc Tích Hợp Liên Tầng)

### INV-I01: Teacher Foreign Key Identity Mapping
- **Owner**: API Layer / Frontend DTO
- **Source of Truth**: `ADR-001` & `ielts-api/prisma/schema.prisma`
- **Failure Impact**: **CRITICAL** (Nghẽn luồng Tạo/Sửa Lớp học, vi phạm FK `classes_teacher_id_fkey`)
- **Quy tắc**: ID của Giáo viên truyền từ UI qua DTO xuống `classes.teacher_id` **BẮT BUỘC** phải trỏ tới `profiles.user_id`.
- **Static Verification**: TypeScript DTO interface check (`id: p.user_id`).
- **Runtime Verification**:
  ```sql
  SELECT c.id, c.teacher_id FROM public.classes c 
  LEFT JOIN public.profiles p ON c.teacher_id = p.user_id 
  WHERE c.teacher_id IS NOT NULL AND p.user_id IS NULL;
  ```
- **Automation Pipeline**: `CI / Pre-deploy SQL Audit`
- **Trạng thái (Status)**: **Verified** (Đã sửa mapping `targetId = p.user_id || p.id`).

---

## 2. NGUYÊN TẮC KIỂM TOÁN CẠNH (EDGE AUDIT PROTOCOL)

Mọi liên kết trong hệ thống được chia làm 2 loại Edge:
1. **Structural Edge (Cạnh Cấu Trúc - Khóa ngoại CSDL)**: Ví dụ `Course ---> Class`.
2. **Behavioral Edge (Cạnh Hành Vi - Chuỗi Vận Hành)**: Ví dụ `Homework ---> Student Workspace`.

### Bộ Checklist 8 điểm cho mỗi Edge (8-Point Edge Checklist):
- [ ] 1. **FK Constraints**: Kiểm tra ràng buộc khóa ngoại vật lý (`information_schema.referential_constraints`).
- [ ] 2. **Data Types Alignment**: Kiểm tra kiểu dữ liệu khớp 1:1 (`information_schema.columns`).
- [ ] 3. **Nullability Match**: Kiểm tra tính cho phép `NULL` đồng bộ giữa Prisma & DB.
- [ ] 4. **Indexes Existence**: Kiểm tra Index tối ưu tốc độ JOIN (`pg_indexes`).
- [ ] 5. **DTO Mapping**: Kiểm tra TypeScript Types (`api.ts`).
- [ ] 6. **API Payload Capture**: Kiểm tra request/response thực tế qua Network.
- [ ] 7. **UI Binding**: Kiểm tra Form Input $\rightarrow$ State $\rightarrow$ Submit.
- [ ] 8. **Migration Alignment**: Khớp file migration với Supabase Live DB.

---

## 3. CHỈ TIÊU HOÀN THÀNH SPRINT 1 (EXIT CRITERIA FOR SPRINT 1)

Sprint 1: **Schema Integrity Audit** chỉ được tuyên bố **PASS** khi và chỉ khi đạt đủ 7 chỉ tiêu sau:

- [ ] **Exit-01**: `0 Schema Drift` (Không còn bất kỳ cột/bảng nào lệch giữa Prisma Schema & Supabase DB).
- [ ] **Exit-02**: `100% Foreign Keys Verified` (Toàn bộ quan hệ cấu trúc được xác minh khóa ngoại vật lý).
- [ ] **Exit-03**: `100% Essential Indexes Verified` (Tất cả cột `_id` được đánh Index).
- [ ] **Exit-04**: `0 Orphan Records` (Kết quả tất cả SQL Orphan Scans trả về `0 rows`).
- [ ] **Exit-05**: `0 Missing Migrations` (Mọi thay đổi DDL đều có tệp SQL tương ứng).
- [ ] **Exit-06**: `0 DTO / DB Mismatches` (Mọi thuộc tính DTO gửi đúng tên cột CSDL).
- [ ] **Exit-07**: `0 Ambiguous Relationships` (Không còn lỗi nhúng quan hệ PostgREST HTTP 400).

---

## 4. QUY TRÌNH KIỂM SOÁT BƯỚC CHUYỂN SPRINT (ARCHITECTURE REVIEW GATE)

Trước khi chuyển từ Sprint N sang Sprint N+1, hệ thống **BẮT BUỘC** phải bước qua Cổng kiểm soát **Architecture Review Gate** với 5 câu hỏi quyết định:

1. ❓ **Còn Edge nào ở trạng thái `Unknown` trong `Unknowns_Register.md` thuộc phạm vi Sprint không?**
2. ❓ **Có Invariant nào chưa có câu lệnh/kịch bản kiểm thử (Verification Method) không?**
3. ❓ **Có Migration nào chưa được đối chiếu trực tiếp với Supabase Live DB không?**
4. ❓ **Có API nào chưa có Hợp đồng DTO (Contract) rõ ràng không?**
5. ❓ **Có hành vi nào chỉ mới "tin là đúng" mà chưa có Bằng chứng thực tế (Evidence) không?**

> **QUY TẮC CỔNG GẠT (GATE RULE)**: Nếu câu trả lời cho bất kỳ câu hỏi nào trên là **"CÓ"**, **TUYỆT ĐỐI KHÔNG CHUYỂN SPRINT**.

---

## 5. LỘ TRÌNH 5 SPRINT DỰ ÁN

```text
 ┌────────────────────────────────────────────────────────────────────────┐
 │                      SYSTEM STABILIZATION PROGRAM                      │
 └──────┬──────────┬──────────┬───────────┬───────────┬───────────────────┘
        │          │          │           │           │
        ▼          ▼          ▼           ▼           ▼
    SPRINT 0   SPRINT 1   SPRINT 2    SPRINT 3    SPRINT 4
  Architecture  Schema  Integration   Security   Operational
    Contract  Integrity    Flow      Integrity     Health
  (COMPLETED)  (NEXT UP)  (Pending)   (Pending)   (Pending)
```
