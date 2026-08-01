# State Machines & Domain Events (Máy Trạng Thái & Chuỗi Sự Kiện Nghiệp Vụ)

Tài liệu này định nghĩa các **Máy Trạng Thái Hợp Lệ (State Machines)**, **Phân Quyền Quyền Sở Hữu (Ownership Matrix)** và **Chuỗi Sự Kiện Tích Hợp (Event Flows)** của hệ thống IELTS NextBand.

---

## I. MÁY TRẠNG THÁI HỢP LỆ (STATE MACHINES)

### 1. Homework State Machine (Máy Trạng Thái Bài Tập)
Các trạng thái hợp lệ: `DRAFT` $\rightarrow$ `PUBLISHED` $\rightarrow$ `IN_PROGRESS` $\rightarrow$ `SUBMITTED` $\rightarrow$ `GRADED` $\rightarrow$ `ARCHIVED`.

```text
 [DRAFT] ──(Publish)──► [PUBLISHED] ──(Student Start)──► [IN_PROGRESS]
                             │                                 │
                             │ (Deadline Expired)              │ (Student Submit)
                             ▼                                 ▼
                        [ARCHIVED] ◄──(Grade Complete)─── [SUBMITTED]
```
- **Chuyển đổi Bất Hợp Lệ (Invalid Transitions - BẮT CHẶN)**:
  - ❌ `DRAFT` $\rightarrow$ `GRADED` (Chưa nộp bài không được chấm).
  - ❌ `SUBMITTED` $\rightarrow$ `PUBLISHED` (Không đảo ngược trạng thái bài đã nộp về bản nháp).

### 2. Submission State Machine (Máy Trạng Thái Bài Nộp)
- **Luồng hợp lệ**: `NOT_STARTED` $\rightarrow$ `IN_PROGRESS` $\rightarrow$ `SUBMITTED` $\rightarrow$ `GRADED`.
- **Chuyển đổi Bất Hợp Lệ**:
  - ❌ `GRADED` $\rightarrow$ `IN_PROGRESS` (Bài đã chấm điểm không cho phép học viên sửa bài làm).

---

## II. MA TRẬN QUYỀN SỞ HỮU THỰC THỂ (OWNERSHIP MATRIX)

| Entity / Asset | Primary Owner | Can Create (C) | Can Read (R) | Can Update (U) | Can Delete (D) | Security Enforcement Level |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Course** | Admin | Admin | All (Guest/Student/Teacher) | Admin | Admin | **Tier 0 (Critical)** |
| **Class** | Admin / Teacher | Admin | Admin, Assigned Teacher, Class Students | Admin, Assigned Teacher | Admin | **Tier 0 (Critical)** |
| **Homework** | Teacher | Assigned Teacher | Assigned Teacher, Class Students | Assigned Teacher | Assigned Teacher | **Tier 0 (Critical)** |
| **ExamSubmission** | Student | Class Student | Student (Self), Assigned Teacher | Student (Chưa nộp / Trước hạn) | None (Chặn hoàn toàn) | **Tier 0 (Critical)** |
| **Grade & Feedback**| Teacher | Assigned Teacher | Student (Self), Assigned Teacher | Assigned Teacher | Assigned Teacher | **Tier 0 (Critical)** |

---

## III. CHUỖI SỰ KIỆN TÍCH HỢP (EVENT FLOWS)

### Event Flow 1: Giao & Nộp Bài Tập (Homework Lifecycle Flow)

```text
[Teacher Creates Homework] 
      │
      ▼
[Homework Published Event] ──► Trigger: Student Workspace Filter Updated
      │
      ▼
[Deadline Timer Started] ──► Trigger: Homework Due Today Alert
      │
      ▼
[Student Submits Exam] ──► Trigger: Lock Answer Edit & Push to Teacher Review Queue
      │
      ▼
[Teacher Grade & Feedback] ──► Trigger: Update Course Progress & Student Dashboard
```
