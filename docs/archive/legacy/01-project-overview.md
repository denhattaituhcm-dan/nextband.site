# Project Overview & Product Philosophy

## Product Scope & Philosophy

NextBand / ARIS IELTS is a focused **Personal Learning Workspace** for IELTS preparation.

Core Philosophy:
- **Simple, Focused, Production-ready, Easy to Maintain.**
- Excludes LMS Enterprise bloat (No Curriculum Versioning, No Submission History, No Feedback History, No Multi-identity, No Notification Center, No Complex Audit Logs).

Key Capabilities:
- Student login via **Google SSO (1 Student = 1 Google Email)**.
- Fixed Course Curricula (`STARTER` 27 lessons, `DREAMER` 27 lessons, `BUILDER` 27 lessons, `MASTER` 27 lessons, `LEADER` 30 lessons).
- Static Curriculum Book generation once upon class creation.
- In-place single submission overwrites (No Submission History).
- In-progress start before deadline allows submission completion after deadline timestamp.
- Attendance strictly decoupled from Homework access.
- Teacher Feedback overwritten directly (No Feedback History).
- Class deletion archives class data to preserve learning records.
- Student Dashboard includes a lightweight synthesized **Activity Timeline**.

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

## Main Technologies

Frontend:
- Vite
- React 18
- TypeScript
- React Router
- TanStack React Query
- Tailwind CSS
- shadcn/ui and Radix UI

Backend:
- Fastify
- TypeScript ESM
- Prisma
- MySQL
- JWT auth
- Zod validation

## Roles

- `admin`: full management access & hard deletion.
- `teacher`: class & student scoped management & grading.
- `student`: personal learning workspace access.


