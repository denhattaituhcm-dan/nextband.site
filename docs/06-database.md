# Database Model

Database provider:

```text
MySQL
```

Schema file:

```text
ielts-api/prisma/schema.prisma
```

## Core Relationship Map

```text
User
  ├── UserRole
  ├── Enrollment ── Course ── Exam ── ExamSection ── QuestionGroup ── Question
  ├── ExamSubmission ── Answer
  ├── Highlight
  ├── Class as teacher
  └── ClassStudent / ClassAttendance as student

Class
  ├── ClassStudent
  ├── ClassSchedule
  └── ClassAttendance

SiteSettings
  └── singleton row: id = "default"
```

## Main Tables

### users

Stores account and profile fields.

Important fields:

- `email`: unique.
- `password`: bcrypt hash.
- `google_id`: unique nullable Google account identifier.
- `is_active`: used to disable login.

### user_roles

Stores user roles.

Unique constraint:

```text
(user_id, role)
```

Allowed roles:

- `admin`
- `teacher`
- `student`

### courses

Course metadata and publishing state.

Important fields:

- `teacher_id`
- `is_published`
- `is_active`
- `is_locked`
- `slug`

`slug` is unique but not consistently used by the current frontend course detail flow.

### enrollments

Connects students to courses.

Unique constraint:

```text
(course_id, student_id)
```

`progress_percent` is updated after submitted/graded exams.

### exams

Exam/assignment entity under a course.

Important fields:

- `duration_minutes`
- `is_published`
- `is_active`
- `is_locked`
- `is_open`
- `max_participants`
- `current_participants`
- `exam_type`

`is_open` allows students to access the exam without enrollment.

### exam_sections

Sections under an exam.

Allowed types:

- `listening`
- `reading`
- `writing`
- `speaking`
- `general`

New exams auto-create five sections. Manual create/delete of sections is blocked by API.

### question_groups

Groups questions and can hold:

- instructions
- passage
- audio URL
- order index

### questions

Stores question content and grading metadata.

Allowed types:

- `multiple_choice`
- `fill_blank`
- `matching`
- `essay`
- `speaking`
- `listening`
- `short_answer`
- `true_false_not_given`
- `yes_no_not_given`

`options` is JSON and question-type specific.

`correct_answer` is stored as text. Some types use plain strings, pipe-delimited alternatives, or JSON.

### exam_submissions

One exam attempt by one student.

Allowed statuses:

- `in_progress`
- `submitted`
- `graded`

Important fields:

- `started_at`
- `submitted_at`
- `total_score`
- `correct_answers`
- `total_questions`
- `graded_by`
- `graded_at`

### answers

One answer per submission/question.

Unique constraint:

```text
(submission_id, question_id)
```

`answer_text` can contain plain text or JSON string depending on question type.

### classes

Teacher-managed student group, independent from course enrollments.

### class_students

Students in a class.

Unique constraint:

```text
(class_id, student_id)
```

### class_schedules

Recurring class schedules.

Unique constraint:

```text
(class_id, day_of_week, start_time)
```

### class_attendance

Attendance record per class/student/session date.

Allowed statuses:

- `present`
- `absent`
- `inactive`

Unique constraint:

```text
(class_id, student_id, session_date)
```

### highlights

Student highlights inside exam sections/passages.

### site_settings

Singleton settings row with `id = "default"`.

Stores:

- site name
- logo URL
- auth screen text
- highlight colors
- home page slogan and description style

## Migration Workflow

During development:

```bash
cd ielts-api
npm run db:migrate
npm run db:generate
```

For deployment:

```bash
npm run db:deploy
```

Avoid using `db:push` for production-like environments because it can bypass migration history.

## Data Shape Notes

Question and answer formats are not fully normalized. They depend on `questionType`.

Examples:

- Simple objective answer: `"A"` or `"true"`.
- Alternatives: `"answer one|answer two"`.
- Fill blank correct answer: JSON object keyed by blank IDs.
- Matching correct answer: JSON object with `items`, `options`, and `pairs`.
- Student answer for multi-select: JSON array string.

When changing question formats, update both:

- backend auto-grading in `submissions.routes.ts`
- frontend section renderers and review screens

