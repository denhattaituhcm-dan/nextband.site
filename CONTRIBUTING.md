# Contributing to NextBand LMS

Welcome! This guide outlines how to contribute safely, cleanly, and effectively to NextBand LMS.
Keep it simple: **~10 rules humans remember. Machines enforce the boundaries. Tests protect critical behavior.**

---

## 1. How to Start Development

Ensure you have **Node.js 20+** and **npm** installed:

```bash
# 1. Install all monorepo dependencies
npm install

# 2. Setup environment configuration
cp .env.test.example .env

# 3. Start local development (Frontend + Backend concurrently)
npm run dev
```

- **Frontend Application:** `http://localhost:5173`
- **Fastify Backend API:** `http://localhost:3001`

---

## 2. How to Verify Your Changes (Single Quality Gate)

Before submitting a Pull Request, run the unified verification command:

```bash
npm run verify
```

This single command runs all required quality gates:
1. **`npm run sanity`** — Architecture integrity (circular dependencies, auth bypasses, forbidden frontend DB calls, committed secrets).
2. **`npm run typecheck`** — TypeScript type verification across both Frontend and Backend.
3. **`npm run verify:runtime`** — API runtime compatibility check.
4. **`npm run test`** — Vitest test suites (47+ suites protecting business and security logic).
5. **`npm run build`** — Production bundle build for both frontend and backend serverless runtime.

If `npm run verify` passes with **Exit Code 0**, your change is safe to submit.

---

## 3. Where Data Access Belongs

All data access must follow the single-channel architecture:
```text
React Frontend (Vite) → REST API (/api/v1/*) → Fastify Backend → Prisma ORM → Supabase PostgreSQL
```

- **Frontend (`nextband/src/`):** Must ONLY communicate with the backend via `@/lib/api.ts`.
  - ❌ **NEVER** query tables directly using `supabase.from(...)` in UI components or pages.
  - ❌ **NEVER** call `supabase.rpc(...)` or import `@prisma/client` in frontend code.
- **Backend (`server/`):**
  - Routes (`server/routes/`) validate request payloads via Zod schemas.
  - Services (`server/services/`) execute business logic.
  - Repositories (`server/repositories/`) perform database operations via Prisma.

---

## 4. How Authentication & Authorization Work

- **Authentication:** Managed by Supabase Auth / JWT.
  - The client obtains a session JWT and sends it in the `Authorization: Bearer <JWT>` header.
  - The Fastify backend validates the token using Supabase JWKS (`server/config/jwks.ts`).
- **Authorization:** Handled strictly server-side (`server/middlewares/auth.middleware.ts`).
  - Roles (`admin`, `teacher`, `student`) and resource ownership are verified in the database.
  - ❌ **NEVER** trust client-supplied user IDs, roles, or ownership claims.

---

## 5. When Regression Tests Are Required

- **P0 Critical Flows (Mandatory Tests):**
  - Authentication and token validation
  - Authorization and RBAC boundaries
  - Exam submission and state transitions (`IN_PROGRESS` → `SUBMITTED` → `GRADED`)
  - Grading algorithms and band score calculations (`server/services/scoring/`)
  - Student / teacher ownership checks
- **Bug Fixes:** Every fix for a defect or behavioral bug must include at least one test case proving the bug is fixed and preventing future regression.

---

## 6. How Database Changes Are Handled

- The canonical data schema lives in `prisma/schema.prisma`.
- To make a database change:
  1. Update `prisma/schema.prisma`.
  2. Generate and test migrations using `npm run db:push` or explicit migration scripts.
  3. Never silently modify the production database without updating Prisma.
  4. Never write scripts that delete production data without an explicit retention policy and safety mechanism.

---

## 7. What Must Never Be Committed

- ❌ Real `.env`, `.env.local`, or credentials files
- ❌ Private keys (`.pem`, `.key`, `id_rsa`)
- ❌ Database URLs containing live passwords
- ❌ Third-party API secret keys
- ❌ Temporary debug files, `.bak`, `.tmp`, or mock datasets in production code

The pre-deploy gate (`scripts/sanity_check.mjs`) automatically scans and rejects committed secrets.

---

## 8. Where Architecture Decisions Live

- **Core Operational Standard:** [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) (12 essential rules developers need to remember).
- **Historical Evidence & Audit Records:** [`docs/archive/`](./docs/archive/) and [`docs/FINAL_ARCHITECTURE_ATTESTATION.md`](./docs/FINAL_ARCHITECTURE_ATTESTATION.md).

Keep implementations simple, maintainable, and well-tested. When in doubt, prefer clarity and simplicity over unnecessary abstraction.
