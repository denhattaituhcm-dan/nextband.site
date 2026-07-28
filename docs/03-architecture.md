# Architecture

## High-Level Flow

```text
Browser
  |
  | React Router pages/components
  |
nextband/src/lib/api.ts
  |
  | Axios + JWT Bearer token
  |
Fastify API /api/v1
  |
  | Route handlers + Zod validation + auth middleware
  |
Prisma Client
  |
MySQL
```

Uploaded files are stored on the backend filesystem under `ielts-api/uploads/` and served by Fastify at `/uploads/*`.

## Frontend Runtime

Entry points:

- `nextband/src/main.tsx`: mounts React and wraps the app in `GoogleOAuthProvider`.
- `nextband/src/App.tsx`: configures React Query, auth provider, toasters, router, layouts, and pages.
- `nextband/src/lib/api.ts`: central API client and endpoint wrappers.

Key layout groups:

- `ClientLayout`: authenticated student/client UI.
- `MinimalLayout`: exam-taking UI with reduced navigation.
- `AdminLayout`: admin/teacher UI.

Auth state is held in `nextband/src/hooks/useAuth.tsx`.

## Backend Runtime

Entry points:

- `ielts-api/src/index.ts`: starts the server.
- `ielts-api/src/app.ts`: builds Fastify app, registers plugins, static uploads, routes, error handlers.
- `ielts-api/src/routes/index.ts`: registers `/api/v1/*` route modules.

Core plugins:

- `plugins/auth.ts`: Fastify JWT setup.
- `plugins/prisma.ts`: Prisma client lifecycle.

Core middleware:

- `middlewares/auth.middleware.ts`: `authenticate` and `requireRoles`.

## API Prefixes

All backend API routes are mounted under:

```text
/api/v1
```

Static uploads are not under `/api/v1`:

```text
/uploads/images/*
/uploads/audio/*
```

## Data Freshness

Frontend React Query is configured with:

- `staleTime: 0`
- `gcTime: 0`
- refetch on mount/window focus/reconnect

Backend also disables caching for `/api/*` responses. This avoids stale data but can increase request volume.

## Authentication Model

Login/register returns:

- JWT token.
- user object with roles.

The frontend stores the token in `localStorage` and sends it as:

```text
Authorization: Bearer <token>
```

The backend JWT payload contains:

```ts
{
  id: string;
  email: string;
  roles: string[];
}
```

## Authorization Model

Route-level authorization usually uses:

- `authenticate`: valid JWT required.
- `requireRoles("admin", "teacher")`: role required.

Several routes also apply row-level checks:

- Students only see their own submissions.
- Teachers see submissions/students only from their classes.
- Students need enrollment unless an exam is marked `isOpen`.

## Current Architectural Caveats

- Course detail route is named `/course/:slug`, but the UI currently passes course IDs and calls `coursesApi.getById`.
- Some route handlers use `any` heavily. This speeds feature work but weakens type guarantees.
- Some admin/API logic is duplicated between frontend and backend constants, such as `MAX_EXAM_ATTEMPTS = 3`.
- Upload storage is local disk. Production deployments must preserve and back up the upload directory.

