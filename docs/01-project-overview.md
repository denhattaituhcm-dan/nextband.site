# Project Overview

## Product Scope

NextBand is an IELTS learning and exam platform. It supports:

- Student login/register and Google login.
- Course discovery and enrollment-based access.
- IELTS-style exams with Listening, Reading, Writing, Speaking, and Grammar sections.
- Timed exam attempts, resume behavior, auto-submit, and attempt limits.
- Auto-grading for objective question types.
- Manual grading for Writing and Speaking.
- Teacher/admin workflows for courses, exams, users, classes, attendance, submissions, and site settings.

## Repository Layout

```text
.
├── docs/                  # Technical docs for onboarding and maintenance
├── nextband/              # Frontend app
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── lib/
│   │   └── pages/
│   ├── public/
│   └── package.json
└── ielts-api/             # Backend API
    ├── prisma/
    │   ├── migrations/
    │   ├── schema.prisma
    │   └── seed.ts
    ├── src/
    │   ├── routes/
    │   ├── schemas/
    │   ├── middlewares/
    │   ├── plugins/
    │   ├── utils/
    │   ├── app.ts
    │   └── index.ts
    └── package.json
```

`nextband` and `ielts-api` are separate git repositories. The workspace root is not a git repository.

## Main Technologies

Frontend:

- Vite
- React 18
- TypeScript
- React Router
- TanStack React Query
- Axios
- Tailwind CSS
- shadcn/ui and Radix UI
- Vitest

Backend:

- Fastify
- TypeScript ESM
- Prisma
- MySQL
- JWT auth
- Zod validation
- Local file uploads with `@fastify/multipart` and `@fastify/static`
- Vitest

## Roles

The app has three roles:

- `admin`: full management access.
- `teacher`: limited admin-like access, scoped to their classes/students in several routes.
- `student`: course/exam access based on enrollment or open exam settings.

Roles are stored in the `user_roles` table and included in JWT payloads.

## Important Terms

- Course: container for exams and enrollments.
- Exam: assignment/test belonging to a course.
- Section: one of the fixed exam sections. New exams auto-create five sections.
- QuestionGroup: group inside a section, often with passage/instructions/audio.
- Question: individual question; answer shape depends on question type.
- Submission: one student attempt for one exam.
- Answer: one response for one question inside a submission.
- Class: teacher-managed student group, separate from Course enrollment.
- Attendance: per-class, per-student, per-session status.

