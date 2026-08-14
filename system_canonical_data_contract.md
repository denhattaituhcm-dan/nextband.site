# SYSTEM CANONICAL DATA CONTRACT (SCDC) v1.0
## Chuẩn Hóa Kiến Trúc Dữ Liệu & Ranh Giới Module Toàn Hệ Thống LMS

> **Mục tiêu:** Thiết lập Luật Dữ Liệu duy nhất (Single Source of Truth) cho toàn bộ hệ thống. Ngăn chặn triệt để tình trạng phân mảnh DTO, phân mảnh từ vựng, stale cache, và bypass Provider. Mọi tính năng phát triển mới **BẮT BUỘC** phải tuân thủ nghiêm ngặt theo Data Contract này.

---

## 1. NGUYÊN TẮC CỐT LÕI (CORE INVARIANTS)

1. **Anti-God-Object:** Không gộp các chỉ số phái sinh/thống kê chuyên sâu (ví dụ: `attendanceRate`, `submissionLog`) vào Core Identity DTO (`CanonicalStudentDTO`, `ClassWorkspaceDTO`).
2. **Single-Point Normalization:** Dữ liệu thô từ Database/Supabase/REST API phải đi qua một Adapter duy nhất tại `@/lib/api.ts` trước khi đến State Provider hoặc Consumers.
3. **Vocabulary Lock:** 
   - Trạng thái buổi học (Session Status): `"SCHEDULED" | "COMPLETED" | "CANCELLED"` (Tuyệt đối không dùng `PLANNED` sau tầng Normalization).
   - Trường ngày học (Session Date): Khóa cứng `scheduledDate: string` (YYYY-MM-DD). Tuyệt đối không dùng `planned_date` hay `session_date` ở tầng Consumer.
4. **Consumer Ownership:** 
   - Consumer đọc Core Data thông qua Context Provider (`useWorkspace()`).
   - Consumer cần chi tiết chuyên sâu tiêu thụ qua **Specialized ViewModel** (ví dụ: `SessionAttendanceDetailDTO`, `AttendanceMatrixDTO`).
5. **Universal Invalidation:** Mọi Mutation tác động đến dữ liệu của một thực thể phải gọi Helper Invalidation tập trung (`invalidateClassWorkspace`), không tự viết chuỗi refetch/setState phân tán.

---

## 2. BẢN ĐỒ CANONICAL DATA CONTRACT CHI TIẾT

```
+---------------------------------------------------------------------------------------------------+
|                                      DATABASE / SUPABASE POSTGREST                                |
|  tables: classes, class_students, profiles, courses, class_sessions, attendance, submissions      |
+---------------------------------------------------------------------------------------------------+
                                                  │
                                                  ▼
+---------------------------------------------------------------------------------------------------+
|                                  NORMALIZATION ADAPTER (@/lib/api.ts)                             |
|  classesApi.getById(), sessionsApi.list(), normalizeSession(), normalizeStudent()                 |
+---------------------------------------------------------------------------------------------------+
                                                  │
                                                  ▼
+---------------------------------------------------------------------------------------------------+
|                                       CORE CANONICAL DTOS                                         |
|  ClassWorkspaceDTO, CanonicalStudentDTO, CanonicalSessionDTO, TeacherProfileDTO, CourseDTO        |
+---------------------------------------------------------------------------------------------------+
                         │                                                  │
                         ▼                                                  ▼
+------------------------------------+             +------------------------------------------------+
|       WORKSPACE PROVIDER CONTEXT   |             |            SPECIALIZED VIEWMODELS              |
|  - classData                       |             |  - SessionAttendanceDetailDTO (AttendanceSheet)|
|  - activeStudents                  |             |  - AttendanceMatrixDTO (AttendanceMatrix)      |
|  - sessions                        |             |  - StudentGradingDetailDTO (GradingTab)        |
|  - studentCount                    |             +------------------------------------------------+
|  - isLoading, isError, error       |                                      │
+------------------------------------+                                      │
                 │                                                          │
                 ▼                                                          ▼
+---------------------------------------------------------------------------------------------------+
|                                          UI CONSUMERS                                             |
|  FixedHeader, OverviewTab, StudentsTab, SessionsTab, HomeworkTab, GradingTab, AttendanceSheet     |
+---------------------------------------------------------------------------------------------------+
```

---

## 3. ĐỊNH NGHĨA CANONICAL ENTITIES

### 3.1. Class Workspace Entity (`ClassWorkspaceDTO`)
* **Canonical Source:** Table `classes` + JOIN `class_students`, `profiles`, `courses`.
* **Consumer được phép:** `WorkspaceProvider`, `FixedHeader`, `OverviewTab`.
* **Contract Schema:**
  ```typescript
  interface ClassWorkspaceDTO {
    id: string;
    name: string;
    description: string;
    status: "IN_PROGRESS" | "UPCOMING" | "CLOSED" | "COMPLETED";
    isActive: boolean;
    startDate: string; // YYYY-MM-DD
    endDate: string;   // YYYY-MM-DD
    teacher: TeacherProfileDTO | null;
    course: CourseProfileDTO | null;
    students: CanonicalStudentDTO[];       // Toàn bộ học viên đã từng ghi danh
    activeStudents: CanonicalStudentDTO[]; // Học viên đang hoạt động
    studentCount: number;                  // Invariant: studentCount === activeStudents.length
    sessions: CanonicalSessionDTO[];       // Toàn bộ buổi học đã chuẩn hóa
    lessons: CourseLessonDTO[];            // Danh sách bài học/homework từ Course
    submissions: SubmissionItemDTO[];      // Bài nộp của lớp
  }
  ```
* **Mutation Owner:** `classesApi.update()`, `classesApi.addStudents()`.
* **Invalidation Key:** `["admin-class-workspace", classId]`, `["admin-classes"]`.

---

### 3.2. Student Entity (`CanonicalStudentDTO`)
* **Canonical Source:** Table `class_students` JOIN `profiles` (FK `profiles.user_id = class_students.student_id`).
* **Consumer được phép:** `StudentsTab` (Student List), `FixedHeader`, `StudentDrawer`.
* **Contract Schema:**
  ```typescript
  interface CanonicalStudentDTO {
    id: string;          // ID bản ghi class_students
    studentId: string;   // User ID (UUID) của học viên trong auth/profiles
    fullName: string;    // profiles.full_name
    email: string;       // profiles.email
    avatarUrl?: string;  // profiles.avatar_url
    joinedAt: string;    // Ngày vào lớp
    status: "active" | "suspended" | "inactive";
    isActive: boolean;   // Invariant: status === "active"
  }
  ```
* **Ranh giới nghiêm ngặt:** Tuyệt đối **KHÔNG** đưa `attendanceRate` hoặc `completedHwCount` vào `CanonicalStudentDTO`. Các chỉ số này được tính toán động hoặc lấy từ `AttendanceMatrixDTO`.
* **Mutation Owner:** `AddStudentModal`, `StudentDrawer` (Đổi trạng thái học viên).
* **Invalidation Key:** `invalidateClassWorkspace(queryClient, classId)`.

---

### 3.3. Session Entity (`CanonicalSessionDTO`)
* **Canonical Source:** Table `class_sessions` (+ `lessons` nếu có liên kết).
* **Consumer được phép:** `SessionsTab`, `AttendanceSheet`, `WorkspaceProvider`.
* **Contract Schema:**
  ```typescript
  interface CanonicalSessionDTO {
    id: string;
    classId: string;
    sessionNumber: number;
    scheduledDate: string; // YYYY-MM-DD (Khóa chuẩn, duy nhất)
    startTime: string;     // HH:MM
    endTime: string;       // HH:MM
    status: "SCHEDULED" | "COMPLETED" | "CANCELLED"; // (Vocabulary Lock)
    rescheduleReason?: string;
    note?: string;
    lessonId?: string;
    lessonTitle: string;   // Luôn có fallback an toàn `Lesson ${sessionNumber}`
    createdAt?: string;
  }
  ```
* **Ranh giới từ vựng:** 
  - `PLANNED` & `RESCHEDULED` được map thành `SCHEDULED` ở tầng DTO.
  - `planned_date` & `session_date` được map thành `scheduledDate`.
* **Mutation Owner:** `sessionsApi.reschedule()`, `sessionsApi.updateStatus()`, `AttendanceSheet.handleCompleteSession()`.
* **Invalidation Key:** `invalidateClassWorkspace(queryClient, classId)`.

---

### 3.4. Session Attendance Detail Entity (`SessionAttendanceDetailDTO`)
* **Phân loại:** Specialized Sub-Resource ViewModel (Chi tiết 1 buổi học).
* **Canonical Source:** REST Endpoint `GET /api/v1/classes/:classId/sessions/:sessionId/attendance`.
* **Consumer được phép:** `AttendanceSheet` DUY NHẤT.
* **Contract Schema:**
  ```typescript
  interface SessionAttendanceDetailDTO {
    sessionId: string;
    sessionNumber: number;
    sessionTitle: string;
    sessionDate: string;
    status: "SCHEDULED" | "COMPLETED" | "CANCELLED";
    completedAt?: string;
    summary: {
      total: number;
      present: number;
      absent: number;
      late: number;
      excused: number;
      unmarked: number;
    };
    students: Array<{
      studentId: string;
      studentName: string;
      avatarUrl?: string;
      status: "UNMARKED" | "PRESENT" | "ABSENT" | "LATE" | "EXCUSED";
      note?: string | null;
    }>;
  }
  ```
* **Mutation Owner:** `POST /classes/:classId/sessions/:sessionId/attendance` & `POST .../complete`.
* **Invalidation Key:** `invalidateClassWorkspace(queryClient, classId)`.

---

### 3.5. Attendance Matrix Entity (`AttendanceMatrixDTO`)
* **Phân loại:** Specialized Aggregated ViewModel (Toàn bộ ma trận chuyên cần lớp).
* **Canonical Source:** REST Endpoint `GET /api/v1/classes/:classId/attendance-matrix`.
* **Consumer được phép:** `AttendanceMatrix` DUY NHẤT.
* **Contract Schema:**
  ```typescript
  interface AttendanceMatrixDTO {
    classId: string;
    className: string;
    totalSessions: number;
    completedSessions: number;
    sessionCoverage: number;
    recordCoverage: number;
    attendanceCoverage: number;
    sessions: Array<{
      id: string;
      sessionNumber: number;
      sessionDate: string;
      lessonTitle: string;
      status: "SCHEDULED" | "COMPLETED" | "CANCELLED";
    }>;
    students: Array<{
      studentId: string;
      studentName: string;
      avatarUrl?: string;
      email: string;
      presentCount: number;
      lateCount: number;
      absentCount: number;
      excusedCount: number;
      eligibleSessions: number;
      attendanceRate: number; // Backend Single Source of Truth cho % chuyên cần
      sessions: Array<{
        sessionId: string;
        sessionNumber: number;
        sessionDate: string;
        status: "SCHEDULED" | "COMPLETED" | "CANCELLED";
        attendanceStatus: "UNMARKED" | "PRESENT" | "ABSENT" | "LATE" | "EXCUSED";
        isFuture?: boolean;
        isOverdueUnmarked?: boolean;
        note?: string | null;
      }>;
    }>;
  }
  ```
* **Mutation Owner:** Không sở hữu mutation; tự động refresh khi có bất kỳ mutation điểm danh nào nhờ Universal Invalidation.
* **Query Key:** `["class-attendance-matrix", classId]`.

---

## 4. MA TRẬN PHÂN QUYỀN MUTATION & INVALIDATION HẠ TẦNG

Mọi mutation trong hệ thống **BẮT BUỘC** gọi helper sau khi thành công:

```typescript
export const invalidateClassWorkspace = (queryClient: QueryClient, classId: string) => {
  if (!queryClient || !classId) return;
  // 1. Invalidate Class List
  queryClient.invalidateQueries({ queryKey: ["admin-classes"] });
  // 2. Invalidate Single Class View
  queryClient.invalidateQueries({ queryKey: ["admin-class", classId] });
  // 3. Invalidate Central Workspace Provider (Header, Overview, Students, Sessions)
  queryClient.invalidateQueries({ queryKey: ["admin-class-workspace", classId] });
  // 4. Invalidate Specialized Attendance Matrix
  queryClient.invalidateQueries({ queryKey: ["class-attendance-matrix", classId] });
  // 5. Invalidate Specialized Session Queries
  queryClient.invalidateQueries({ queryKey: ["class-sessions", classId] });
  queryClient.invalidateQueries({ queryKey: ["class-attendance", classId] });
};
```

| Hành động Nghiệp vụ (Mutation) | Nơi Khởi Tạo | Endpoint / Action | Cache Keys Bị Xóa Tự Động |
| :--- | :--- | :--- | :--- |
| **Thêm học viên vào lớp** | `AddStudentModal` | `classesApi.addStudents()` | Workspace, Admin Classes, Matrix |
| **Xóa / Tạm hoãn học viên** | `StudentDrawer` | `classesApi.removeStudent()` | Workspace, Admin Classes, Matrix |
| **Lưu điểm danh 1 buổi** | `AttendanceSheet` | `POST /sessions/:sid/attendance` | Workspace, Matrix, Attendance Detail |
| **Chốt hoàn tất buổi học** | `AttendanceSheet` | `POST /sessions/:sid/complete` | Workspace, Matrix, Attendance Detail |
| **Dời lịch buổi học (Reschedule)**| `SessionsTab` | `sessionsApi.reschedule()` | Workspace, Sessions, Matrix |
| **Cập nhật trạng thái buổi học** | `SessionsTab` | `sessionsApi.updateStatus()` | Workspace, Sessions, Matrix |
| **Chỉnh sửa thông tin lớp** | `Classes.tsx` | `classesApi.update()` | Workspace, Admin Classes |

---

## 5. QUY TẮC BẢO TRÌ & NGUYÊN TẮC CODE REVIEW (CHECKLIST)

Khi thêm bất kỳ màn hình hoặc tính năng mới nào trong LMS:

- [ ] **Không tạo query song song:** Component con trong Workspace có tự `useQuery` lấy `classes` hay `students` không? *(Nếu có -> BẮT BUỘC refactor sang `useWorkspace()`)*.
- [ ] **Không dùng vocabulary cũ:** Có xuất hiện `PLANNED`, `planned_date`, `session_date` trong code UI không? *(Nếu có -> Đổi ngay sang `SCHEDULED`, `scheduledDate`)*.
- [ ] **Không hardcode fallback nghiệp vụ:** Có xuất hiện hardcode `100%` hoặc tự tính nhẩm % ở Frontend không? *(Nếu có -> Đọc từ `AttendanceMatrixDTO` của Backend)*.
- [ ] **Xử lý 3 trạng thái rõ ràng:** Component có phân biệt rõ `isLoading` (Skeleton), `isError` (Lỗi + Thử lại) và `data.length === 0` (Empty State) không?
- [ ] **Gọi Universal Invalidation:** Mutation có dùng `invalidateClassWorkspace` không? *(Tuyệt đối không dùng `setState` cục bộ để tự cập nhật giả)*.
