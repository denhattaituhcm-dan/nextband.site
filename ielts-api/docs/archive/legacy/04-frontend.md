# Frontend Guide

Frontend app path:

```text
nextband/
```

## Important Files

```text
src/main.tsx                  # React entry point
src/App.tsx                   # Router and providers
src/lib/api.ts                # Axios client and API wrapper modules
src/hooks/useAuth.tsx         # Auth context
src/layouts/                  # Client/admin/minimal layouts
src/pages/                    # Page-level screens
src/pages/admin/              # Admin/teacher screens
src/components/exam/          # Exam rendering and answer UI
src/components/admin/         # Admin forms and tables
src/components/ui/            # shadcn/ui primitives
```

## Routing

Main routes are configured in `src/App.tsx`.

Client routes:

- `/`
- `/my-courses`
- `/my-submissions`
- `/course/:slug`
- `/submissions/:id`
- `/exam/:examId/review`
- `/profile`

Exam route:

- `/exam/:examId`

Admin routes:

- `/admin`
- `/admin/courses`
- `/admin/courses/create`
- `/admin/courses/:id`
- `/admin/exams`
- `/admin/exams/create`
- `/admin/exams/:id`
- `/admin/sections/:id`
- `/admin/users`
- `/admin/check-attempt`
- `/admin/submissions/:id`
- `/admin/logs`
- `/admin/classes`
- `/admin/classes/:id`
- `/admin/teachers`
- `/admin/settings`

## API Client

All API calls go through `src/lib/api.ts`.

API wrapper modules:

- `authApi`
- `coursesApi`
- `examsApi`
- `sectionsApi`
- `questionsApi`
- `submissionsApi`
- `usersApi`
- `enrollmentsApi`
- `uploadsApi`
- `statsApi`
- `logsApi`
- `classesApi`
- `siteSettingsApi`

The Axios instance:

- Uses `VITE_API_URL`, otherwise falls back to `https://api.nextband.site/api/v1`.
- Adds JWT from `localStorage` or `sessionStorage`.
- Redirects to `/auth` on 401.
- Converts relative `/uploads/*` strings to absolute URLs.

Maintenance note: set `VITE_API_URL=http://localhost:3000/api/v1` for local development. Without it, local frontend can call production.

## Auth Flow

`useAuth.tsx`:

- Loads stored token on mount.
- Calls `authApi.getMe()`.
- Stores `user`, `token`, roles, and helper booleans.
- Provides `signIn`, `signUp`, `signOut`, `refreshUser`.

`ProtectedRoute.tsx`:

- Redirects unauthenticated users to `/auth`.
- Checks optional `requiredRoles`.

## Exam UI

Main page:

```text
src/pages/ExamInterface.tsx
```

Responsibilities:

- Fetch exam by ID.
- Start or resume a submission.
- Restore saved answers.
- Track active section, answer state, flagged questions, current question.
- Render section-specific components.
- Submit answers.
- Auto-submit when timer expires.

Section renderers:

- `ListeningSection.tsx`
- `ReadingSection.tsx`
- `WritingSection.tsx`
- `SpeakingSection.tsx`
- `GrammarSection.tsx`

Special renderers:

- `FillBlankHtmlRenderer.tsx`
- `MatchingRenderer.tsx`
- `QuestionRecorder.tsx`
- `ExamTimer.tsx`
- `QuestionPagination.tsx`

## Admin UI

Admin pages are under:

```text
src/pages/admin/
```

Shared admin components are under:

```text
src/components/admin/
```

Question form components are under:

```text
src/components/admin/question-forms/
```

## Known Frontend Issues

### Course ID vs Slug

The route uses `/course/:slug`, but `CourseCard` links to `course.id` and `CourseDetail` calls `coursesApi.getById(slug)`.

Options:

- Rename route param to `:id` and keep ID-based URLs.
- Or switch links and detail queries to use actual `course.slug`.

Do this before relying on human-readable course URLs.

### Lint Debt

`npm run lint` currently fails mainly because many files use explicit `any`.

Either:

- gradually type API models and remove `any`, or
- relax `@typescript-eslint/no-explicit-any` temporarily while improving types by module.

### Bundle Size

Production build currently emits a large main JS chunk. Consider route-level lazy loading for:

- admin pages
- exam interface
- rich text editor
- charts

