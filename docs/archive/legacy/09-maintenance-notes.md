# Maintenance Notes

## Known Technical Debt

### Course ID vs Slug

Current state:

- Route: `/course/:slug`
- Course cards link to `/course/${course.id}`
- Course detail calls `coursesApi.getById(slug)`
- Backend also supports `GET /courses/slug/:slug`

Recommended decision:

- If URLs should be stable and human-readable, switch frontend to actual slug usage.
- If IDs are acceptable, rename route param and related code from `slug` to `id`.

### Test Coverage

Tests do not currently protect core workflows. Add backend route tests before changing submission, grading, auth, or access-control logic.

### Lint Debt

Frontend lint is not green. This makes future regressions harder to catch. See [Testing and Quality](./08-testing-quality.md).

### Local vs Production API URL

Frontend API fallback is production. Always set `VITE_API_URL` locally.

Consider changing fallback to `http://localhost:3000/api/v1` for dev safety, and require explicit env in production.

### Lockfiles

Both `.gitignore` files ignore `package-lock.json`. npm projects should usually commit lockfiles for reproducible installs and deployments.

### Local Upload Storage

Uploads are stored on local disk. Production needs:

- persistent volume
- backups
- max file size controls
- cleanup policy for orphaned files
- CDN/object storage migration plan if traffic grows

### Raw SQL

Some routes use raw SQL, especially site settings and class schedule/attendance operations.

Raw SQL is sometimes justified for MySQL-specific upsert behavior, but prefer Prisma APIs where practical.

When using raw SQL:

- avoid interpolating untrusted strings into SQL text
- use parameter binding
- keep column names whitelisted

## Safe Change Guidelines

Before changing auth/access logic:

- identify affected roles
- check frontend protected routes
- check backend `requireRoles`
- check row-level ownership/enrollment logic
- add or update tests

Before changing question formats:

- update admin forms
- update exam renderers
- update answer serialization
- update backend auto-grading
- update submission/review display

Before changing submission logic:

- verify attempt limit behavior
- verify timer/resume behavior
- verify open exam quota behavior
- verify progress recalculation
- verify manual grading status

Before changing DB schema:

- create a Prisma migration
- verify migration on a copy of real data
- update docs in `06-database.md`
- update seed data if needed

## Deployment Checklist

Backend:

- `DATABASE_URL` points to production MySQL.
- `JWT_SECRET` is strong and not shared with dev.
- `FRONTEND_URL` matches deployed frontend origin.
- `APP_URL` matches public API host.
- `UPLOAD_DIR` points to persistent storage.
- `npm run db:deploy` has run.
- `npm run build` passes.

Frontend:

- `VITE_API_URL` points to deployed `/api/v1`.
- `VITE_GOOGLE_CLIENT_ID` is set if Google login is enabled.
- `npm run build` passes.
- Static assets are served with correct fallback for React Router.

Post-deploy smoke test:

1. Health endpoint returns `ok`.
2. Login works.
3. Course list loads.
4. Exam can start.
5. Upload URL renders.
6. Admin can open logs/settings.

## Files to Keep in Sync

Attempt limit:

- `ielts-api/src/routes/submissions.routes.ts`
- `nextband/src/pages/CourseDetail.tsx`

Question type support:

- `ielts-api/prisma/schema.prisma`
- `ielts-api/src/routes/submissions.routes.ts`
- `nextband/src/components/admin/question-forms/`
- `nextband/src/components/exam/`
- `nextband/src/pages/SubmissionDetail.tsx`
- `nextband/src/pages/admin/SubmissionGrade.tsx`

Roles:

- `ielts-api/prisma/schema.prisma`
- `ielts-api/src/middlewares/auth.middleware.ts`
- `nextband/src/hooks/useAuth.tsx`
- `nextband/src/components/auth/ProtectedRoute.tsx`
- `nextband/src/App.tsx`

