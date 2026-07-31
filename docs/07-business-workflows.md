# Business Workflows (Frozen Business Rules & Architecture Principles)

## 1. Curriculum Policy (Frozen)

The curriculum for each course level is fixed:

- `STARTER` = 27 lessons (9 weeks)
- `DREAMER` = 27 lessons (9 weeks)
- `BUILDER` = 27 lessons (9 weeks)
- `MASTER` = 27 lessons (9 weeks)
- `LEADER` = 30 lessons (10 weeks)

Business Rules:

- No Curriculum Versioning.
- No mid-stream curriculum changes.
- No Lesson Split / Merge.
- No Curriculum Migration.
- Upon class creation, the Curriculum Book is generated once and remains static for the class lifecycle.

## 2. Submission Lifecycle

Submission is a **mutable entity** until it is locked.

Workflow:

```text
NOT_STARTED -> IN_PROGRESS -> SUBMITTED
```

Resubmission Workflow (when unlocked and before deadline expiry):

```text
SUBMITTED -> Edit -> SUBMITTED (In-place Overwrite)
```

Business Rules:

- **Exactly one active submission exists** for each `(Student × Homework)` or `(Student × Exam)` at any point in time.
- Creating a new submission entity on resubmission is strictly prohibited.
- Resubmission updates the existing record in-place (`submitted_at` and `updated_at` timestamps updated).
- No `Submission v1/v2/v3` or historic logs stored.

## 3. Deadline Rules & Admission Check

Business Rules:

- **Homework not yet unlocked**: Cannot start.
- **Deadline expired before student starts**: Cannot start.
- **Single Admission Check Rule**:
  - The eligibility check is performed **only once**, when the student enters the homework.
  - Once admitted, the session remains valid until voluntary submission, browser closure, or teacher manual lock.
  - Backend does not poll or forcefully cancel ongoing active sessions midway through a student's work.
  - No "Late Submission" penalty for students admitted prior to the deadline timestamp.

## 4. Attendance Policy

Attendance is completely independent of Homework.

Business Rules:

- `Absent` ≠ `Homework Locked`
- `Present` ≠ `Homework Completed`
- Attendance reflects physical/online class presence.
- Homework reflects self-study progress.
- No locking/unlocking logic depends on Attendance records.

## 5. Homework Lock Authority (Cross-Module Decoupling)

Business Rules:

- Homework availability is controlled **only by**:
  - Scheduled unlock time, OR
  - Teacher manual action.
- No other module (attendance, grades, timeline, student activity, etc.) may lock or unlock homework.

## 6. Teacher Feedback Policy

Teacher Feedback represents current state data only.

Business Rules:

- Updating feedback overwrites the existing feedback record directly in-place.
- No `Feedback History`, `Feedback Versions`, or `Feedback Audit` logs are maintained.

## 7. Student Identity Policy

1 Student = 1 Google Email.

Business Rules:

- The email itself is the immutable login identity.
- No secondary emails or multiple email accounts.
- No account merging or identity merging features.
- Administrative email changes must preserve the same underlying student profile and learning history.

## 8. Class Lifecycle & Archiving Policy

Class deletion uses soft-archiving by default.

Business Rules:

```text
Delete Class -> Archive Class (is_active = false / status = archived)
```

- **Archive affects discoverability, not data integrity**: Archiving only hides the class from active UI lists. It does not delete or mutate underlying data.
- Homework, Submissions, Grades, Feedback, and Attendance records are fully preserved for reporting and analytics.
- Hard delete is restricted exclusively to Super Admin operations.

## 9. Student Activity Timeline (Read-Model Only)

Business Rules:

- Activity Timeline is a **pure read-model**.
- It is synthesized dynamically from existing domain entities (`enrollments`, `homework`, `submissions`, `grades`, `placement_tests`).
- **No Event Sourcing. No Event Log. No Timeline Persistence.**
- No extra database tables (`activity_logs`, `timeline_events`, etc.) are permitted.

## 10. Product Philosophy & Feature Filter

The Student Portal is a **Personal Learning Workspace**.

Core Principles:
- Simple, Focused, Production-ready, Easy to Maintain.
- Explicitly excludes LMS Enterprise bloat (Curriculum Versioning, Submission History, Feedback History, Multi Identity, Notification Center, Audit Logs).
- **Core Learning Filter**: Every new feature proposal must satisfy at least one core learning workflow. Features that increase complexity without improving student learning should be rejected.

---

## 🏛️ Architecture Principles

> **Business Rules have higher priority than implementation details.**
> 
> - UI may change.
> - API contracts may evolve.
> - Database schema may be refactored.
> - **Business Rules remain stable.**



