# NextBand Architecture Rules

## 1. Data Access
The architecture is:
```text
Frontend → REST API → Fastify Backend → Prisma → PostgreSQL
```
Frontend (`nextband/src/`) must NOT directly access the production database.
Frontend must NOT directly use:
* Supabase database queries (`supabase.from(...)`)
* Supabase RPC (`supabase.rpc(...)`)
* Prisma (`@prisma/client`)
* Database credentials

All production data access must go through the backend API (`@/lib/api.ts`).

## 2. Business Authority
The backend is the authoritative business layer.
The client must never be trusted for:
* grades & scoring calculations
* permissions & role decisions
* exam & submission ownership
* authoritative timestamps
* sensitive exam state

The client may request an operation; the backend decides whether the operation is valid.

## 3. Exam Security
Never expose exam answers or protected grading information before the appropriate submission/grading state.
Examples of protected data:
* correct answers (`correctAnswer`, `acceptedAnswers`)
* answer keys
* protected explanations & audio scripts
* private grading data

Do not rely on frontend hiding as a security mechanism.

## 4. Authentication & Authorization
Authentication establishes identity (Supabase Auth / JWKS verification).
Authorization determines what that identity may do (Server-side RBAC).
Every sensitive backend operation must verify authorization server-side.
Never trust:
* user IDs supplied by the client
* role values supplied by the client
* ownership claims supplied by the client

## 5. Database / Schema
Prisma schema (`prisma/schema.prisma`) and production database must remain synchronized.
Database migrations must be explicit, reversible, and reviewable.
Never silently modify production schema.
Never delete production data as part of an automated cleanup process without an explicit retention policy and safety mechanism.

## 6. Stateless Backend
The Fastify backend and serverless execution must remain strictly stateless.
Production code must not depend on:
* local filesystem persistence
* process memory as durable state
* development-only fallbacks
* hardcoded credentials or bypasses
* fake/mock production data

## 7. Type & API Contracts
Backend and frontend must share a reliable contract.
Avoid manually duplicated types when a canonical contract or schema can be used.
API changes must atomically update:
1. Backend contract & routes
2. Frontend consumer (`@/lib/api.ts`)
3. Relevant test suites

## 8. Testing
Prioritize risk coverage over vanity metrics:
* **P0 (Critical):** Authentication, authorization, exam security, submission, grading, ownership, test DB protection.
* **P1 (Workflows):** Teacher/student workflows, API contracts, state transitions.
Every bug fix must include a regression test when technically feasible.
Tests must immediately fail-closed if pointed at a production database URL.

## 9. Production Safety
Production code must:
* compile cleanly without TypeScript errors
* pass all tests and lint rules
* contain no unexplained `any`
* contain no committed secrets (`.env`, tokens, passwords, private keys)
* contain no dead code or temporary debug statements

## 10. Change Rule
Do not modify unrelated architecture while fixing a localized bug.
Do not create abstractions without a real, demonstrated need.
Prefer the simplest implementation that correctly solves the problem.

## 11. Observability
Important production operations must produce sufficient logs/errors to diagnose:
* authentication and authorization failures
* failed submissions and grading errors
* unexpected 5xx server errors
Never log secrets, bearer tokens, passwords, or sensitive student PII.

## 12. Simplicity Principle
When in doubt:
**Prefer the simplest architecture that preserves security, correctness, testability, and maintainability.**
~10 rules humans remember. Machines enforce the important boundaries. Tests protect critical behavior.