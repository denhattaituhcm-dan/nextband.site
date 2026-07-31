# Business Workflows (Frozen Business Rules)

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

Submissions are not immutable. Only 1 current submission exists per student per assignment.

Workflow:

```text
NOT_STARTED -> IN_PROGRESS -> SUBMITTED
```

If the deadline has not expired and the homework is not locked, a student may edit and re-submit:

```text
SUBMITTED -> Edit -> SUBMITTED (In-place Overwrite)
```

Business Rules:

- Always exactly 1 submission record.
- No `Submission v1/v2/v3` or historic logs stored.
- Re-submitting updates `submitted_at` and `updated_at` in-place.

## 3. Deadline Rules

Business Rules:

- **Homework not yet unlocked**: Cannot start.
- **Deadline expired before student starts**: Cannot start.
- **Student started BEFORE deadline**: Allowed to continue working and submit after the deadline timestamp.
- No automatic session cancellation or "Late Submission" penalty for students who started before the deadline.

## 4. Attendance Policy

Attendance is completely independent of Homework.

Business Rules:

- `Absent` ≠ `Homework Locked`
- `Present` ≠ `Homework Completed`
- Attendance reflects physical/online class presence.
- Homework reflects self-study progress.
- No locking/unlocking logic depends on Attendance records.

## 5. Teacher Feedback Policy

Teacher Feedback represents current state data only.

Business Rules:

- Updating feedback overwrites the existing feedback directly.
- No `Feedback History`, `Feedback Versions`, or `Feedback Audit` logs are maintained.

## 6. Student Identity Policy

1 Student = 1 Google Email.

Business Rules:

- No secondary emails or multiple email accounts.
- No account merging or identity merging features.
- Email updates are handled exclusively via administrative workflow.

## 7. Class Lifecycle & Archiving

Class deletion uses soft-archiving by default.

Business Rules:

```text
Delete Class -> Archive Class (is_active = false / status = archived)
```

- Homework, Submissions, Grades, Feedback, and Attendance records are fully preserved for reporting and analytics.
- Hard delete is restricted exclusively to Super Admin operations.

## 8. Student Activity Timeline

The Student Dashboard includes a lightweight Activity Timeline synthesized dynamically from existing domain tables (`enrollments`, `homework`, `submissions`, `grades`, `placement_tests`).

Business Rules:

- Events: `Joined Class`, `Homework Released`, `Homework Submitted`, `Homework Graded`, `Placement Test Completed`, `Teacher Feedback Published`.
- This is NOT a Chat system and NOT a Notification Center.
- No extra database tables required.

## 9. Product Philosophy

The Student Portal is a **Personal Learning Workspace**.

- Simple, Focused, Production-ready, Easy to Maintain.
- Explicitly excludes LMS Enterprise bloat (Curriculum Versioning, Submission History, Feedback History, Multi Identity, Notification Center, Audit Logs).


