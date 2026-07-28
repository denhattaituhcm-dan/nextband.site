# NextBand IELTS Platform - Technical Documentation

This folder is the technical handoff for developers joining the project.

The project is split into two independent apps:

- `nextband/`: Vite + React frontend.
- `ielts-api/`: Fastify + Prisma + MySQL backend.

Start here:

1. [Project overview](./01-project-overview.md)
2. [Local setup](./02-local-setup.md)
3. [Architecture](./03-architecture.md)
4. [Frontend guide](./04-frontend.md)
5. [Backend and API guide](./05-backend-api.md)
6. [Database model](./06-database.md)
7. [Business workflows](./07-business-workflows.md)
8. [Testing and quality](./08-testing-quality.md)
9. [Maintenance notes](./09-maintenance-notes.md)

## Current Known State

- Frontend and backend builds pass.
- Frontend tests pass, but only a placeholder test exists.
- Backend test command currently fails because there are no test files.
- Frontend lint currently fails because the codebase uses `any` widely while ESLint forbids explicit `any`.
- Course routing currently uses a `/course/:slug` route name, but the app passes course IDs in practice.

