# NextBand Evidence Registry (Sổ Nhật Ký Bằng Chứng Kỹ Thuật Thực Nghiệm)

Tài liệu này ghi nhận **Toàn bộ Bằng chứng Thực nghiệm (Empirical Evidence)** thu thập trực tiếp từ kết quả truy vấn SQL `information_schema`, Log Network HTTP, hay Kết quả kiểm thử Runtime.

---

## EVIDENCE REGISTRY

### EV-001: Course -> Class Physical Foreign Key Constraint Evidence
- **Timestamp**: `2026-08-01T12:04:14+07:00`
- **Target Edge**: `EDGE-001` (`Course -> Class`)
- **Target Unknown**: Resolves `UNK-000A`
- **Source Layer**: Supabase Cloud Live Database
- **Execution Command**:
  ```sql
  ALTER TABLE public.classes ADD COLUMN IF NOT EXISTS course_id uuid REFERENCES public.courses(id) ON DELETE SET NULL;
  ```
- **Raw Result / Log**: `Success. 0 rows returned.`
- **Verification Evidence**: `information_schema.columns` has `course_id` with `data_type = 'uuid'`.
- **Status**: **VERIFIED_EVIDENCE**

### EV-002: Teacher Identity Foreign Key Mapping Evidence
- **Timestamp**: `2026-08-01T12:06:54+07:00`
- **Target Edge**: `EDGE-002` (`User -> Teacher Profile`)
- **Target Unknown**: Resolves `UNK-000B`
- **Source Layer**: `src/lib/api.ts` & Supabase Cloud Live Database
- **Execution Command**:
  ```typescript
  const targetId = p.user_id || p.id;
  ```
- **Raw Result / Log**: Successful Class insert referencing `p.user_id` without triggering `classes_teacher_id_fkey` error.
- **Status**: **VERIFIED_EVIDENCE**

### EV-003: PostgREST Relation Embed Error Resolution Evidence
- **Timestamp**: `2026-08-01T12:44:18+07:00`
- **Target Edge**: `EDGE-002` (`User -> UserRole`)
- **Source Layer**: Network Fetch & PostgREST API
- **Execution Command**: Query separation of `user_roles` and `profiles` in `usersApi.list`.
- **Raw Result / Log**: Network Capture HTTP `200 OK` on `user_roles?select=user_id` and `profiles?select=*`.
- **Status**: **VERIFIED_EVIDENCE**

---

## REQUIRED EVIDENCE CHECKLIST FOR REMAINING UNKNOWNS

| Unknown ID | Target Edge | Missing Evidence Requirement | Evidence Script / Plan | Required Evidence ID |
| :--- | :--- | :--- | :--- | :--- |
| **`UNK-001A`** | `EDGE-001` | Query result from `information_schema.referential_constraints` for `classes_course_id_fkey` | `SELECT delete_rule FROM information_schema.referential_constraints WHERE constraint_name = 'classes_course_id_fkey';` | **EV-004** |
| **`UNK-004A`** | `EDGE-003`, `EDGE-004` | Physical FK constraints on `class_students` and `homeworks` | `SELECT constraint_name, delete_rule FROM information_schema.referential_constraints WHERE table_name IN ('class_students', 'homeworks');` | **EV-005** |
| **`UNK-005A`** | `EDGE-005` | Transaction rollback inspection on network disconnect during submission | Integration test simulating network abort on `POST /submissions` | **EV-006** |
| **`UNK-005B`** | `EDGE-005` | Unique index verification on `exam_submissions(exam_id, student_id)` | `SELECT indexname FROM pg_indexes WHERE tablename = 'exam_submissions';` | **EV-007** |
