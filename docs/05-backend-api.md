# Backend and API Guide

Backend app path:

```text
ielts-api/
```

Base API URL:

```text
/api/v1
```

## Important Files

```text
src/index.ts                         # Server start
src/app.ts                           # Fastify app factory
src/routes/index.ts                  # Route registration
src/routes/*.routes.ts               # Route modules
src/middlewares/auth.middleware.ts   # authenticate and requireRoles
src/plugins/auth.ts                  # JWT plugin
src/plugins/prisma.ts                # Prisma plugin
src/schemas/*.schema.ts              # Zod schemas
src/utils/                           # Shared utilities
prisma/schema.prisma                 # Database schema
prisma/seed.ts                       # Seed data
```

## Route Modules

| Prefix | File | Purpose |
| --- | --- | --- |
| `/health` | `routes/index.ts` | Health check |
| `/auth` | `auth.routes.ts` | Register, login, Google login, profile, password |
| `/courses` | `courses.routes.ts` | Course list/detail/create/update/delete |
| `/exams` | `exams.routes.ts` | Exam list/detail/create/update/delete |
| `/sections` | `sections.routes.ts` | Section detail/update |
| `/questions` | `questions.routes.ts` | Question groups and questions |
| `/submissions` | `submissions.routes.ts` | Attempts, answers, grading |
| `/users` | `users.routes.ts` | User management |
| `/enrollments` | `enrollments.routes.ts` | Course enrollment |
| `/uploads` | `uploads.routes.ts` | Image/audio upload and delete |
| `/admin` | `logs.routes.ts` | Admin log viewer |
| `/classes` | `classes.routes.ts` | Classes, schedules, attendance |
| `/attendance` | `attendance.routes.ts` | Attendance summary |
| `/highlights` | `highlights.routes.ts` | Reading highlights |
| `/site-settings` | `site-settings.routes.ts` | Public settings and admin update |

## Auth Endpoints

```text
POST /auth/register
POST /auth/login
POST /auth/login/google
GET  /auth/me
PUT  /auth/profile
POST /auth/change-password
POST /auth/verify-password
```

## Courses

```text
GET    /courses
GET    /courses/:id
GET    /courses/slug/:slug
POST   /courses
PUT    /courses/:id
DELETE /courses/:id
```

Visibility:

- Guest: receives empty course list.
- Student: sees enrolled, published, active courses.
- Admin/teacher: sees active courses.

Deletion requires admin and password confirmation.

## Exams

```text
GET    /exams
GET    /exams/:id
POST   /exams
PUT    /exams/:id
DELETE /exams/:id
```

When an exam is created, the backend auto-creates five sections:

1. Listening
2. Reading
3. Writing
4. Speaking
5. Grammar

Student access:

- Must be enrolled in the exam course, unless `exam.isOpen` is true.
- Exam must be published and active.

Question answers are hidden from students. Matching questions expose only safe config fields and hide correct pairs.

## Sections and Questions

Sections:

```text
GET    /sections/:id
POST   /sections       # blocked; sections are auto-created
PUT    /sections/:id
DELETE /sections/:id   # blocked
```

Questions:

```text
POST   /questions/groups
PUT    /questions/groups/:id
DELETE /questions/groups/:id
POST   /questions
PUT    /questions/:id
DELETE /questions/:id
POST   /questions/bulk
```

Only admin/teacher can create/update questions. Some delete operations require admin.

## Submissions

```text
GET  /submissions
GET  /submissions/latest/:examId
GET  /submissions/:id
POST /submissions
PUT  /submissions/:id
POST /submissions/:id/grade
```

Key behaviors:

- `POST /submissions` starts or resumes an in-progress attempt.
- Students are limited to 3 attempts per exam.
- Existing in-progress attempts are reused if time remains.
- Expired stale attempts are closed as submitted.
- Open exams can enforce `maxParticipants`.
- Objective questions are auto-graded on submit.
- Writing and Speaking keep status `submitted` until manually graded.
- Enrollment progress updates after submit.

Objective types:

- `multiple_choice`
- `true_false_not_given`
- `yes_no_not_given`
- `short_answer`
- `fill_blank`
- `listening`
- `matching`

Manual types:

- `essay`
- `speaking`

## Users

```text
GET    /users
GET    /users/:id
POST   /users
PUT    /users/:id
DELETE /users/:id
```

Admin can create/update/delete. Teachers can list/detail only students in their classes.

## Classes and Attendance

Classes:

```text
GET    /classes
GET    /classes/:id
POST   /classes
PUT    /classes/:id
DELETE /classes/:id
POST   /classes/:id/students
DELETE /classes/:id/students/:studentId
```

Schedules:

```text
GET    /classes/:id/schedules
POST   /classes/:id/schedules
DELETE /classes/:id/schedules/:scheduleId
```

Attendance:

```text
GET /classes/:id/attendance?sessionDate=YYYY-MM-DD
PUT /classes/:id/attendance
GET /classes/:id/attendance/history
GET /attendance/summary/monthly?month=YYYY-MM&classId=...
```

Teacher access is scoped to classes they own.

## Uploads

```text
POST   /uploads
POST   /uploads/image
POST   /uploads/audio
DELETE /uploads
```

Allowed images:

- JPEG
- PNG
- GIF
- WebP

Allowed audio:

- MPEG/MP3
- WAV
- OGG
- WebM

Files are stored under:

```text
ielts-api/uploads/images/
ielts-api/uploads/audio/
```

## Site Settings

```text
GET /site-settings
PUT /site-settings
```

`GET` is public. `PUT` requires admin.

## Logs

```text
GET /admin/log-viewer
GET /admin/log-viewer/last?lines=100
```

Admin only. Reads `logs/app.log`.

## Error Shape

Global errors generally return:

```json
{
  "error": "message",
  "statusCode": 500
}
```

Validation errors return:

```json
{
  "error": "Validation failed message",
  "details": {}
}
```
