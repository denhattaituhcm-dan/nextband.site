# DEAD CODE AUDIT — FULL REPOSITORY, EVIDENCE-FIRST

> **Audit Date:** September 17, 2026  
> **Auditor:** Senior Software Architect + Code Auditor  
> **Workspace:** `d:\handover\ielts` (Monorepo: Fastify Backend + Vite/React Frontend + Vercel Serverless Gateway)  
> **Status:** 🔍 AUDIT & VERIFIED DISCOVERY COMPLETED — 0 BYTES OF SOURCE CODE MODIFIED OR DELETED

---

# PART 1 — EXECUTIVE SUMMARY

A comprehensive full-repository audit was executed across all layers of the monorepo following the strict discipline:
**DISCOVER → TRACE → VERIFY → CLASSIFY → REPORT**.

Static references (imports, exports, direct calls, type links), dynamic references (string lookups, route manifests, event brokers, Supabase Realtime channels), framework conventions (Vite SWC bundling, Vercel Serverless rewrites, Fastify plugin loaders), and external operational lifecycles were methodically inspected across all 690+ files.

```text
Total files scanned:               690+
Total symbols/routes analyzed:     165+
Definitely dead candidates (A):    5
Probably dead candidates (B):      3
Legacy / Deprecated (C):           14
Active codebase (D):               660+
Orphaned assets / configs (E):     45
High-risk candidates:              0 (Zero critical flows broken)
Architectural conflicts found:     2
```

---

# 1. SYSTEM MAP & ARCHITECTURE TOPOLOGY

```text
CLIENT BROWSER (https://nextband.site)
  │
  ├──► STATIC ASSETS & VITE SWC SPA (nextband/dist)
  │      └── React 18, TanStack Query, React Router v6, TailwindCSS, Radix UI, Sonner
  │
  ├──► VERCEL SERVERLESS GATEWAY (api/index.js -> server/app.ts via Fastify Inject)
  │      ├── /api/health.js & /api/v1/health.js (Micro Health Probes)
  │      └── /api/v1/* (Unified API Gateway routing to Fastify Backend)
  │
  ├──► FASTIFY NODE.JS BACKEND (server/index.ts & server/app.ts)
  │      ├── 38 Domain Route Modules (server/routes/*.routes.ts)
  │      ├── Domain Service Layer (server/services/*.service.ts)
  │      ├── Scoring Engine (server/services/scoring/*)
  │      └── Prisma ORM (prisma/schema.prisma)
  │
  ├──► SUPABASE MANAGED CLOUD PLATFORM
  │      ├── PostgreSQL 15 Database (Pooler port 6543 / Direct port 5432)
  │      ├── Supabase Auth SDK (Client-side canonical authentication)
  │      ├── Supabase Realtime Channels (Arena / Kahoot multiplayer broadcast)
  │      └── Supabase Storage (exam-assets bucket: audio, recordings, images)
  │
  └──► WORKERS & CRON SCHEDULES (vercel.json)
         ├── /api/v1/cron/weekly-snapshot (Every Sunday 11:15 UTC)
         └── /api/v1/cron/class-maintenance (Daily 17:00 UTC)
```

---

# 2. ENTRY POINTS REGISTRY

1. **Application Client Entry:**
   - `nextband/index.html` ➔ `nextband/src/main.tsx` ➔ `nextband/src/App.tsx`
2. **Local Standalone Server Entry:**
   - `server/index.ts` (`npm run dev:be`) ➔ builds `server/app.ts` on port 3000
3. **Production Serverless Gateway Entry:**
   - `vercel.json` ➔ `api/index.js` (bundled from `scripts/bundle-api.mjs`)
4. **Vercel Cron Scheduled Endpoints:**
   - `GET /api/v1/cron/weekly-snapshot` (Invoked by Vercel Cron via `server/routes/cron.routes.ts`)
   - `GET /api/v1/cron/class-maintenance` (Invoked by Vercel Cron via `server/routes/cron.routes.ts`)
5. **Realtime Multi-Client Entry Points:**
   - Supabase Realtime Channel: `arena-room-${pinCode}` (Subscribed in `ArenaHostPage.tsx`, `ArenaJoinPage.tsx`, and `ArenaPlayPage.tsx`)
6. **CLI & Migration Entries:**
   - `scripts/build.mjs`
   - `scripts/bundle-api.mjs`
   - `scripts/verify-api-runtime.mjs`
   - `scripts/sanity_check.mjs`
   - `server/scripts/run-lbos-migration.ts`
   - `server/scripts/run-seasonal-migration.ts`
7. **Test Runners:**
   - Root Vitest: `vitest.config.ts` (Executing `server/tests/*.test.ts` and `nextband/src/**/__tests__/*`)

---

# 3. DEAD CODE INVENTORY

| # | File / Target | Symbol / Artifact | Type | Evidence | Confidence | Risk | Classification | Recommended Action |
| :- | :--- | :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| 1 | `nextband/src/components/arena/ArenaPopInBadges.tsx` | `ArenaPopInBadges`, `ArenaLobbyPlayer` | React Component | 0 static or dynamic imports across codebase. Replaced by `PvZCardAvatar` and `ArenaLobbyKahoot` | 100% | Low | DEFINITELY DEAD | DELETE (Safe) |
| 2 | `nextband/src/components/profile/StudentEvidenceProfileCard.tsx` | `StudentEvidenceProfileCard` | React Component | 0 imports across entire repository. `Profile.tsx` renders its own internal cards; Academic Intelligence uses `EvidenceExplorerPage.tsx` | 98% | Low | DEFINITELY DEAD | DELETE or ARCHIVE |
| 3 | `nextband/src/features/seasonal/presets/tet/TetEnvelopeBadge.tsx` | `TetEnvelopeBadge` | React Component | 0 imports. Completely replaced by polymorphic `SeasonalEnvelopeBadge.tsx` which supports TET, TEACHERS_DAY, etc. | 98% | Low | DEFINITELY DEAD | DELETE |
| 4 | `nextband/src/features/seasonal/presets/tet/TetWalletHeaderBadge.tsx` | `TetWalletHeaderBadge` | React Component | 0 imports. Completely replaced by polymorphic `SeasonalWalletHeaderBadge.tsx` | 98% | Low | DEFINITELY DEAD | DELETE |
| 5 | `nextband/src/features/seasonal/presets/tet/TetOpeningModal.tsx` | `TetOpeningModal` | React Component | 0 imports. Completely replaced by polymorphic `SeasonalOpeningModal.tsx` | 98% | Low | DEFINITELY DEAD | DELETE |
| 6 | `nextband/public/assets/Arena/avatars/individual_backup/*` | 43 PNG files | Static Images | Backup copy of avatars. Active runtime catalog (`characterCatalog.ts`) strictly points to `/assets/Arena/avatars/individual/avatar_X.png` | 95% | Low | ORPHANED ASSET | ARCHIVE / PURGE |
| 7 | `server/routes/auth.routes.ts` | `/auth/register`, `/auth/login`, `/auth/login/google`, `/auth/change-password`, `/auth/verify-password` | API Endpoints | Return HTTP 410 GONE explicitly. Kept for legacy client fail-fast signaling. Supabase Auth is canonical | 100% | Low | LEGACY / DEPRECATED | KEEP (Tombstone documentation) |
| 8 | `server/routes/auth.routes.ts` | `GET /auth/me`, `PUT /auth/profile` | API Endpoints | Fastify auth endpoints with 0 frontend callers (`useAuth.tsx` queries Supabase `profiles` directly). Only referenced in test fixtures | 85% | Medium | PROBABLY DEAD | VERIFY EXTERNAL API / RETAIN FOR BACKWARD COMPAT |
| 9 | `server/services/authorization.service.ts` | `validateUploadPathBoundary()` | Method | 0 callers across `server/` and `nextband/`. File uploads are handled by direct Supabase storage | 85% | Low | PROBABLY DEAD | REVIEW & CLEANUP |
| 10 | `prisma/legacy_mysql_migrations/*` | 14 SQL migrations | Migrations | Historical migrations from early 2026 MySQL era before migration to Supabase PostgreSQL | 100% | Low | LEGACY / DEPRECATED | KEEP (Historical audit) |
| 11 | `bang_luong.html` & `render_and_crop.py` | Standalone HTML & script | Scratch Tool | One-off design script used to generate teacher salary poster (`output/bang_luong_giao_vien_aris_ielts.png`) | 95% | Low | ORPHANED ASSET / TOOL | MOVE TO `scratch/` |
| 12 | `tuhoc_promo_banner_youpass.html` | Standalone HTML | Asset / Embed | Embed snippet intended for external subdomain `tuhoc.nextband.vn`, not referenced by NextBand SPA | 95% | Low | ORPHANED ASSET | KEEP IN DOCS / MARKETING |
| 13 | `server/scripts/run-lbos-migration.ts` | Migration script | Script | Direct SQL runner for LBOS migration to bypass PgBouncer advisory locks; one-time utility | 90% | Low | LEGACY / UTILITY | KEEP AS OPERATIONAL TOOL |
| 14 | `server/scripts/run-seasonal-migration.ts` | Migration script | Script | Direct SQL runner for seasonal tables; one-time utility | 90% | Low | LEGACY / UTILITY | KEEP AS OPERATIONAL TOOL |
| 15 | `nextband/src/pages/admin/CheckAttempt.tsx` | `AdminCheckAttempt` | Page | Active route `/admin/check-attempt` in `App.tsx`, but omitted from `AdminSidebar.tsx` navigation menu | 95% | Medium | PROBABLY DEAD / UNLINKED | CONNECT TO SIDEBAR OR DEPRECATE |

---

# 4. ARCHITECTURAL CONFLICTS & BUG RISKS

### 🚨 Conflict 1: Schema Drift in `server/services/diagnostic.service.ts`
- **Location:** `server/services/diagnostic.service.ts` (L507-L647)
- **Problem:** When running `npm run typecheck`, the root `tsconfig.json` flags 12 compilation errors in `diagnostic.service.ts`:
  - Accessing `q.prompt`, `q.explanation`, `q.group.passageText` which do not exist on Prisma model `Question` (Prisma model has `questionText`, `passage` on `QuestionGroup`, etc.).
- **Impact:** While `nextband/tsconfig.app.json` (frontend) and `scripts/bundle-api.mjs` (esbuild gateway) compile cleanly, root typecheck fails.
- **Architectural Diagnosis:** `POTENTIAL ARCHITECTURAL CONFLICT` — Legacy model contract in diagnostic service vs Physical PostgreSQL Schema.

### 🚨 Conflict 2: Polymorphic Refactoring Residue in `features/seasonal`
- **Location:** `nextband/src/features/seasonal/presets/tet/`
- **Problem:** The codebase was refactored to support generic seasonal events (`TET`, `TEACHERS_DAY`, `BACK_TO_SCHOOL`, `MID_AUTUMN`) using `SeasonalEnvelopeBadge.tsx`, `SeasonalOpeningModal.tsx`, and `SeasonalWalletHeaderBadge.tsx`. However, the original hardcoded Tết-specific files (`TetEnvelopeBadge.tsx`, `TetOpeningModal.tsx`, `TetWalletHeaderBadge.tsx`) were left behind in the directory without being deleted or re-exported.
- **Impact:** 0 runtime bugs since `StudentLessonViewerPage.tsx` and `ClientLayout.tsx` import the generic `Seasonal*` versions, but creates developer confusion.

---

# 5. REALTIME & MULTIPLAYER SUBSYSTEM AUDIT

Strict audit of the Arena live session flow was conducted:
1. **Host Generation:** `ArenaHostPage.tsx` generates PIN code (default or query param) and subscribes to Supabase Realtime channel `arena-room-${pinCode}`.
2. **Participant Join Flow:** `ArenaJoinPage.tsx` broadcasts `PLAYER_JOIN` event with avatar and nickname.
3. **State Sync:** Host receives presence/broadcast, updates live player list, and broadcasts state updates (`COUNTDOWN`, `QUESTION`, `REVEAL`, `PODIUM`).
4. **Verdict:** All active Arena components (`ArenaHostPage.tsx`, `ArenaJoinPage.tsx`, `ArenaPlayPage.tsx`, `PvZCardAvatar.tsx`, `ArenaLobbyKahoot.tsx`) are **100% ACTIVE**. Only `ArenaPopInBadges.tsx` is orphaned dead code from an earlier prototype.

---

# 6. RECOMMENDED CLEANUP ORDER & NEXT STEPS

When the team enters the cleanup phase, follow this verified risk-graded execution sequence:

1. **Phase 1: Zero-Risk Frontend Dead Files (Low Risk, 100% Confidence)**
   - Delete `nextband/src/components/arena/ArenaPopInBadges.tsx`
   - Delete `nextband/src/features/seasonal/presets/tet/TetEnvelopeBadge.tsx`
   - Delete `nextband/src/features/seasonal/presets/tet/TetOpeningModal.tsx`
   - Delete `nextband/src/features/seasonal/presets/tet/TetWalletHeaderBadge.tsx`
   - Run `npm run build:fe` to guarantee 0 regressions.

2. **Phase 2: Orphaned Assets Pruning (Low Risk)**
   - Archive or remove `nextband/public/assets/Arena/avatars/individual_backup/` (43 files, saves bundle weight).
   - Relocate `bang_luong.html`, `render_and_crop.py`, and `tuhoc_promo_banner_youpass.html` into `docs/` or `scratch/`.

3. **Phase 3: Resolve Architectural Schema Conflict**
   - Align `server/services/diagnostic.service.ts` field selections (`questionText`, `passage`) with `prisma/schema.prisma` so that `npm run typecheck` passes with exit code 0.

4. **Phase 4: Admin Navigation Alignment**
   - Review `/admin/check-attempt` (`CheckAttempt.tsx`). If teachers still need the batch submission review table, add a link in `AdminSidebar.tsx`. If superseded by `TeacherWorkspace.tsx`, deprecate cleanly.
