# Business Workflows

## Authentication

### Email Login

```text
User submits email/password
  -> POST /auth/login
  -> backend verifies bcrypt password and active status
  -> backend signs JWT with id/email/roles
  -> frontend stores token and user
```

### Google Login

```text
Google credential
  -> POST /auth/login/google
  -> backend verifies ID token with GOOGLE_CLIENT_ID
  -> existing user matched by googleId or email
  -> missing user is created as student
  -> JWT returned
```

## Course Access

Course list behavior:

- Guest: empty list.
- Student: enrolled, published, active courses.
- Admin/teacher: active courses.

Course detail behavior:

- Requires token.
- Student cannot view inactive/unpublished course.
- Admin/teacher can view unpublished course data.

Known caveat: frontend route param is called `slug`, but currently uses course ID.

## Exam Creation

```text
Admin/teacher creates exam
  -> POST /exams
  -> backend creates exam
  -> backend creates 5 default sections:
       listening, reading, writing, speaking, general
```

Sections cannot be manually created or deleted through the public API. They can be updated.

## Exam Access

Student can access an exam when:

- exam is published
- exam is active
- and either:
  - student is enrolled in the course
  - exam `isOpen` is true

Admin/teacher access is broader, but teacher data visibility is scoped in some list/detail routes.

## Starting an Exam Attempt

```text
Student opens /exam/:examId
  -> frontend fetches exam
  -> frontend POST /submissions with examId
  -> backend checks access, published/active state, attempt count, open exam quota
  -> backend returns existing in-progress attempt or creates a new one
```

Important rules:

- Max attempts for students: 3.
- Admin/teacher are not subject to the same attempt cap.
- If an in-progress attempt still has time, it is reused.
- If an expired in-progress attempt has no answers, its timer is reset.
- If an expired in-progress attempt has answers, it is closed as submitted.
- Open exam `currentParticipants` increments only once per student per exam.

## Answering and Submitting

```text
Frontend stores answers in component state
  -> on submit, answers are serialized
  -> PUT /submissions/:id with submit=true
  -> backend upserts answers
  -> backend auto-grades objective questions
  -> backend marks status as graded or submitted
  -> backend updates enrollment progress
```

Status after submit:

- `graded`: no manual questions.
- `submitted`: contains Writing/Speaking manual questions.

## Auto-Grading

Auto-graded types:

- multiple choice
- true/false/not given
- yes/no/not given
- short answer
- fill blank
- listening
- matching

Manual types:

- essay
- speaking

Scoring details:

- Pipe-delimited correct answers are supported as alternatives.
- Fill blank JSON can award per-blank partial score.
- Matching JSON can award partial score by correct pairs.
- Multi-select multiple choice/listening supports JSON arrays.

## Manual Grading

```text
Admin/teacher opens submission detail
  -> POST /submissions/:id/grade
  -> backend updates individual answer scores/feedback
  -> backend marks submission graded
```

Teacher grading is scoped to students in the teacher's classes.

## Enrollment Progress

After a submission is finalized, backend recalculates course progress:

```text
completed published active exams / total published active exams
```

Progress is stored in `enrollments.progress_percent`.

## Classes and Attendance

Classes are separate from courses. They are used for teacher scoping and attendance.

Typical flow:

```text
Admin creates class and assigns teacher
  -> Admin/teacher adds students
  -> Admin/teacher creates schedules
  -> Admin/teacher records attendance for a session date
  -> Dashboard/history shows present/absent rates
```

Teacher can manage only their own classes.

## Upload Flow

```text
Frontend sends multipart file
  -> POST /uploads/image or /uploads/audio
  -> backend validates MIME type and size
  -> backend stores file under uploads/images or uploads/audio
  -> backend returns absolute file URL
```

Uploads are served by backend static route `/uploads/*`.

