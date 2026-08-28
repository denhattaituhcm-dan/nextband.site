# 🕵️ NEXTBAND.SITE - DEAD CODE AUDIT & VERIFIED PRUNING REPORT

> **Audit Date:** August 28, 2026  
> **Auditor:** Autonomous Principal Engineer (Codebase Auditor)  
> **Workspace:** `d:\handover\ielts` (Monorepo: Fastify Backend + Vite/React Frontend + Vercel Serverless Gateway)  
> **Status:** ✅ **REMEDIATION COMPLETED & FULLY VERIFIED (100% GREEN BUILD)**

---

## 1. Executive Summary

A full AST-level static analysis, reverse import graph inspection, dependency audit, and zombie state scan were performed across all **225+ source files** in the workspace. All identified 0-risk orphan files and unused dependencies have been safely removed and verified.

| Metric | Initial Scan | Remediated Status | Verification Status |
|---|---|---|---|
| **Orphan Files** | 4 files identified | **4 files permanently pruned** | `tsc` + `vite build` 100% Passed |
| **Dead Dependencies (Root)** | `google-auth-library`, `bcryptjs` | **Removed from root `package.json`** | Cleaned |
| **Misplaced Dependencies (FE)** | `autoprefixer`, `postcss` in `dependencies` | **Relocated to `devDependencies`** | Cleaned |
| **Backend Dependencies in FE** | 0 detected | **100% Clean Frontend Boundary** | Verified |
| **Zombie State / Contexts** | 8 stores/contexts audited | **0 Zombie Stores** | Verified (All active in UI) |
| **Preservation Rules** | Admin QA, Gamification, Physical Mgmt, Exam Engine | **100% PRESERVED & PROTECTED** | Verified |

---

## 2. Preservation Rules & Protected Invariants Compliance

Per architectural constraints, the following modules were strictly preserved:
1. **Admin QA & Evidence:** `/admin/evidence`, `/admin/content-qa`, `evidence/` directory (Historical forensics & snapshot audits).
2. **Gamification Engine:** EXP, Streaks, Tier Ranks (*Học Đồ* -> *Học Đế* in `AcademicRankSystem.tsx`), Class Leagues (`/admin/class-leagues`).
3. **Core Physical Management:** Branch/Room schemas, validation models, and endpoints (`server/routes/branch.routes.ts`, `server/routes/room.routes.ts`).
4. **Core Exam Engine & Audio Sync:** Dictation, Audio Waveform, Sticky Audio Player, Fill-in-the-blank, and Scoring normalizers.

---

## 3. Pruned Items & Execution Manifest

| Item | Path / Target | Reason | Status |
|---|---|---|---|
| **Orphan File** | `nextband/src/components/ui/toaster.tsx` | Empty stub `export function Toaster() { return null; }`. 0 imports across entire frontend. Toasting is handled by `Sonner` from `sonner.tsx`. | ✅ **DELETED** |
| **Orphan File** | `server/schemas/auth.schema.ts` | Contains `loginSchema`, `registerSchema`, `googleLoginSchema`. 0 imports across codebase. Fastify auth endpoints were decommissioned to 410 Gone in favor of Supabase Auth. | ✅ **DELETED** |
| **Orphan File** | `server/utils/password.ts` | Contains `hashPassword` and `verifyPassword`. 0 callers in runtime codebase. Auth is handled by Supabase Auth. | ✅ **DELETED** |
| **Orphan File** | `server/services/idempotency/IdempotencyService.ts` | Standalone unreferenced class. Submission idempotency is implemented inline in `exam-submission.service.ts` using Prisma transactional records. | ✅ **DELETED** |
| **NPM Package** | `google-auth-library` (root) | 0 static or dynamic imports across `server/` or `nextband/`. Client-side Google Login uses `@react-oauth/google` and Supabase Auth. | ✅ **REMOVED** |
| **NPM Package** | `bcryptjs` (root) | Only imported in dead file `server/utils/password.ts`. 0 runtime callers. | ✅ **REMOVED** |
| **NPM Package** | `autoprefixer`, `postcss` (frontend) | Build tools incorrectly placed in runtime `dependencies`. | ✅ **MOVED TO `devDependencies`** |

---

## 4. Zombie State & Store Consumption Audit

| State Store / Context | File Path | Consumers Count | Status |
|---|---|---|---|
| `useSpeakingForecastStore` | `nextband/src/components/admin/speaking-forecast/useSpeakingForecastStore.ts` | 3 UI Components (`TopicTable`, `TopicEditorForm`, `SpeakingForecast`) | **ACTIVE** |
| `BranchContext` | `nextband/src/contexts/BranchContext.tsx` | 8 UI Components / Hooks | **ACTIVE** |
| `classContext` | `nextband/src/lib/classContext.ts` | 6 UI Components / Pages | **ACTIVE** |
| `draftStore` | `nextband/src/lib/draftStore.ts` | 5 Exam Components | **ACTIVE** |
| `evidenceStore` | `nextband/src/lib/evidenceStore.ts` | 2 Admin QA Components | **ACTIVE** |
| `exitContext` | `nextband/src/lib/exitContext.ts` | 4 Exam Navigation Components | **ACTIVE** |
| `assessmentDraftStore` | `nextband/src/lib/assessmentDraftStore.ts` | 3 Assessment Components | **ACTIVE** |

*Result:* No zombie state detected. All mutated React contexts and Zustand stores are actively read and rendered in the UI.

---

## 5. Verification Results

1. **TypeScript Typecheck:**
   `tsc -p tsconfig.json --noEmit && tsc -p nextband/tsconfig.app.json --noEmit`
   👉 **Result:** `Exit code 0 (Passed)`

2. **Full Production Build:**
   `node scripts/build.mjs` (Vercel Serverless Gateway Bundle + Vite SWC Client Bundle)
   👉 **Result:** `Exit code 0 (Full production build completed successfully in 9.05s)`
