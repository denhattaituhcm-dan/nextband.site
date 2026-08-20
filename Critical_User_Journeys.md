# Critical User Journeys Health Scorecard (Hồ Sơ Sức Khỏe 10 Luồng Nghiệp Vụ)

Tài liệu này phân cấp **3 Tier Trực Thuộc (Tier A, Tier B, Tier C)** cho 10 Hành Trình Người Dùng Cốt Lõi, định nghĩa **Definition of Done (DoD)** 7 tầng cho từng luồng, và làm chuẩn mực cho hệ thống kiểm thử tự động `pnpm release`.

---

## I. BẢNG PHÂN CẤP TIER VÀ ĐIỀU KIỆN RELEASE BLOCKING

```text
 ┌────────────────────────────────────────────────────────────────────────┐
 │                   CRITICAL USER JOURNEYS TIER SYSTEM                   │
 └──────┬─────────────────────────┬─────────────────────────┬─────────────┘
        │                         │                         │
        ▼                         ▼                         ▼
     TIER A                    TIER B                    TIER C
(Release Blocking)       (Business Operations)       (Auxiliary Flow)
 6/6 PASS Required         Non-Blocking Release       Non-Blocking Release
```

| Journey ID | Name & Scope | Tier Level | Release Blocking? | Target Coverage | Current Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`CUJ-001`** | User Auth & Role Dashboard Routing | **Tier A** | **YES (Blocking)** | 100% | 🟢 **PASS** |
| **`CUJ-002`** | Admin Class Creation & Course Linking | **Tier A** | **YES (Blocking)** | 100% | 🟢 **PASS** |
| **`CUJ-003`** | Admin Student Management & Class Assignment | **Tier A** | **YES (Blocking)** | 100% | 🟢 **PASS** |
| **`CUJ-004`** | [RETIRED] Legacy Teacher Homework Assignment (Replaced by Class Course Exam Binding) | **Tier A** | **NO (Retired)** | N/A | ⚪ **RETIRED** |
| **`CUJ-006`** | Student Exam Submission & Answer Lock | **Tier A** | **YES (Blocking)** | 100% | 🟡 **PARTIAL** |
| **`CUJ-007`** | Teacher Grading & Feedback Publication | **Tier A** | **YES (Blocking)** | 100% | 🟡 **PARTIAL** |
| **`CUJ-005`** | Student Workspace Homework Discovery | **Tier B** | NO | 80% | 🟡 **PARTIAL** |
| **`CUJ-008`** | Student Score & Feedback Inspection | **Tier B** | NO | 80% | 🟡 **PARTIAL** |
| **`CUJ-009`** | Teacher Class Attendance Marking | **Tier B** | NO | 80% | 🟡 **PARTIAL** |
| **`CUJ-010`** | Student Class Migration & Progress Preservation | **Tier C** | NO | 50% | 🟡 **PARTIAL** |

---

## II. HỒ SƠ SỨC KHỎE 7 TẦNG VÀ DEFINITION OF DONE (DoD) CHO CUJ-006

Mỗi CUJ được kiểm soát qua **Hồ Sơ Sức Khỏe 7 Tầng (7-Layer Health Matrix)**:

### 🔴 CUJ-006: Student Exam Submission & Answer Lock
- **Description**: Học viên làm bài thi IELTS và gửi Bài nộp.
- **Definition of Done (DoD) Checklist**:
  - [ ] **1. Business Rules**: Homework đang ở trạng thái `PUBLISHED`, đúng hạn deadline, và thuộc đúng lớp học mà học viên đã ghi danh (`class_students`).
  - [ ] **2. Reliability**: Rớt mạng trong khi nộp bài $\rightarrow$ Hệ thống tự động Rollback sạch sẽ hoặc lưu bản nháp tạm thời (Idempotency via submission UUID).
  - [ ] **3. Security & RLS**: Học viên chỉ nộp được bài của chính mình. Học viên khác hoặc Anonymous bị chặn `HTTP 403 Forbidden` khi cố chèn payload.
  - [ ] **4. Performance**: API POST `/submissions` xử lý hoàn tất trong thời gian `< 200ms`.
  - [ ] **5. Observability**: Mọi log lỗi hoặc giao dịch đều ghi kèm `Request ID` để phục vụ truy vết.
  - [ ] **6. Automation**: kịch bản E2E Test tự động chạy PASS trong pipeline `pnpm release`.
  - [ ] **7. User Outcome**: Học viên thấy màn hình thông báo nộp bài thành công, bài nộp lập tức hiển thị trên Hàng chờ chấm điểm của Giáo viên.

---

## III. BẢNG ĐO LƯỜNG KPI TƯƠNG TÁC TỰ ĐỘNG (AUTOMATED METRICS SUMMARY)

```text
=====================================================================
            CRITICAL USER JOURNEY (CUJ) HEALTH SCORECARD
=====================================================================
- Tier A Success Rate (Release Gate) : 50% PASS (3 / 6 Journeys PASS)
- Overall System CUJ Pass Rate       : 30% PASS (3 / 10 Journeys PASS)
- Tier A Release Condition           : 6 / 6 Tier A Journeys MUST PASS
=====================================================================
- Current Release Status             : BLOCKED (Awaiting CUJ-004, 006, 007)
=====================================================================
```
