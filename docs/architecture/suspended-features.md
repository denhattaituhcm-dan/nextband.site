# NEXTBAND ARCHITECTURAL DISPOSITION & TECHNICAL DEBT REGISTRY
> **NextBand LMS Monorepo**  
> **Classification:** Living Architectural Debt, Suspended Features & Dormant Capabilities Ledger  
> **Standard:** ISO/IEC/IEEE 42010 Architecture Governance  
> **Last Updated:** 2026-09-07  
> **Overall Architecture Health:** 🟢 PRODUCTION HEALTHY / 🟡 CONTROLLED DEBT  

---

## 🏛️ EXECUTIVE SUMMARY & PRODUCTION RELEASE DECISION

- **Production Health:** 🟢 **HEALTHY**
- **Architecture Integrity:** Controlled (7 Pre-Deploy Sanity Gates Active)
- **Compilation & Type Safety:** 100% Passing (	sc -p tsconfig.json & 
extband/tsconfig.app.json)
- **Production Build:** 100% Passing (scripts/build.mjs — Fastify Serverless Gateway + Vite SWC)
- **Security & Authorization:** 100% Database SSOT, Zero Hardcoded Bypasses, Zero direct client DB queries
- **Dead Code (Class C):** 0 known instances in production bundle
- **Technical Debt:** Documented, bounded, and monitored
- **Release Blocker:** **NONE (Decision: GO)**

> **Core Operating Principle:**  
> Không săn lùng technical debt chỉ vì nó tồn tại. Chỉ trả technical debt khi nó bắt đầu sinh lãi suất (interest) hoặc cản trở tiến độ.  
> Bất kỳ thành phần nào đã được gắn nhãn (Documented + Owner + Trigger + Disposition) đều được chuyển từ ** rủi ro bí ẩn** thành **công việc có kiểm soát**.

---

## 1. P0 · LEGACY LEXICON API SURFACE (HIGH PRIORITY TECHNICAL DEBT)

- **Affected Files:**
  - pi/v1/lexicon.js (117 lines)
  - pi/v1/lexiconInferenceProvider.js (151 lines)
- **Classification:** LEGACY — EXTERNAL REACHABILITY UNKNOWN
- **Architectural Nature:** Architecture Duplication / Ghost Endpoint Risk
- **Context:**
  - Standalone Vercel Serverless Function created on 2026-08-31 (commit f1977dc). Uses in-memory state (Map/Set) and direct Groq/Gemini inference via /api/v1/lexicon/understand.
  - The canonical production backend is the Fastify enterprise subsystem (server/routes/lexicon.routes.ts) with PostgreSQL persistence and SM-2 spaced repetition, bundled in pi/index.js.
- **Why It Cannot Be Immediately Deleted:**
  - 
extband/src/modules/lexicon/services/lexiconClient.ts references /lexicon/understand.
  - Lack of telemetry on local environment: We cannot assume internal code does not call it equals zero external clients / extensions / webhooks call it.
- **Decommissioning Protocol:**
  `	ext
  Legacy Endpoint (/api/v1/lexicon)
          │
          ▼
  Vercel Runtime Log Monitoring (7-Day Observation Window)
          │
          ▼
  0 External Invocations Confirmed?
     ├── NO  ──► Mark LEGACY ACTIVE, maintain adapter contract
     └── YES ──► Formally Deprecate ──► Remove endpoint ──► Verify Fastify SSOT ──► Delete legacy provider
  `
- **Owner:** Backend Reliability Engineer / Tech Lead
- **Blocking Status:** NON-BLOCKING for current release.

---

## 2. P1 · SUSPENDED LEXICON UI (SUSPENDED FEATURE)

- **Affected Files:**
  - 
extband/src/pages/MyLexiconPage.tsx (537 lines)
  - 
extband/src/components/lexicon/CognitiveWordPopover.tsx (275 lines)
  - 
extband/src/modules/lexicon/* (7 files)
- **Classification:** SUSPENDED FEATURE (Not Dead Code)
- **Suspension Date:** 2026-09-05 (commit 99ad2fc)
- **Verified Forensic Reason:**
  - Deliberate UI de-integration during release stabilization for Parent Hub deployment.
  - Text-selection and mouse-up event handlers collided with IELTS Reading passage annotation and highlighters in focus exam mode (ReadingSection.tsx).
- **Active Backend Foundation:**
  - Fastify routes /api/v1/lexicon/* are 100% live and functional.
  - Database schema (UserVocabulary, CognitiveWord) and client SDK (lexiconApi.ts) are 100% active.
- **Reactivation Condition:**
  - Resolve mouse-selection event collision by scoping popovers exclusively to practice mode (/reading/:caseId), disabling them during timed exams (/exam/:examId).
  - Re-enable <Route path=\/app/my-lexicon\ element={<MyLexiconPage />} /> and restore sidebar menu item.
- **Owner:** Product Lead / Frontend Lead

---

## 3. P2 · REMINDER SERVICE (DORMANT CAPABILITY)

- **Affected File:** server/services/reminder.service.ts (61 lines)
- **Classification:** DORMANT CAPABILITY (Not Technical Debt)
- **Authored Date:** 2026-09-05 (commit 58cba79)
- **Context:**
  - Authored concurrently with Parent Hub (ParentHubPage.tsx), Snapshot Radar, and Risk Engine.
  - Implements CommunicationService and ZaloChannelAdapter to generate structured Vietnamese deep-link reminder URLs (https://zalo.me/{cleanPhone}?text=...) linking to parent progress tokens.
- **Why It Is A Dormant Capability, Not Debt:**
  - Authored with explicit intent for a planned capability.
  - Its interface is aligned with ParentHub architecture.
  - Zero maintenance overhead; zero external friction.
- **Anti-Pattern Guardrail:**
  - **Do NOT** connect this service to controllers simply to eliminate unreferenced code.
  - Activation Trigger: When business requirements formally demand manual or automated Zalo dispatch from the Teacher/Admin intervention dashboard.
- **Owner:** Backend Lead

---

## 4. P3 · CURRICULUM TOOLING & GENERATION SCRIPTS (OPERATIONAL ASSETS)

- **Affected Files:**
  - scripts/*.py (80+ Python curriculum & slide generation scripts)
  - ngine/aris-engine.js (Standalone lesson player)
  - ang_luong.html & ender_and_crop.py (Teacher salary poster rasterizer)
- **Classification:** DEVELOPER / CURRICULUM TOOLING
- **Context:**
  - These scripts author, compile, and format coursebook slide decks and curriculum data offline.
  - They are excluded from production builds and never shipped to browser clients.
- **Target Organization (Post-Release DX Optimization):**
  - Group into scripts/curriculum/, scripts/build/, scripts/migrations/, 	ools/design/.
- **Priority:** Low (Developer Experience only, Zero production risk).

---

## 5. ARCHITECTURE DRIFT GOVERNANCE

The primary architectural risk for NextBand is **Architecture Drift** — where multiple parallel implementations of the same business capability evolve simultaneously inside the repository.

To enforce single-channel architecture:
1. Every business capability must have **exactly one authoritative implementation**.
2. Dual-tier implementations (e.g., direct serverless vs. Fastify routes) are prohibited from silently coexisting.
3. Pre-deploy Sanity Gates (scripts/sanity_check.mjs) enforce strict boundaries:
   - Gate 1: Zero circular dependencies
   - Gate 2: Zero hardcoded auth bypasses
   - Gate 3: Zero client mock stores
   - Gate 4: Strict TypeScript compilation
   - Gate 5: Single-channel API rule (No direct DB queries from UI)
   - Gate 6: Zero secret leaks in git
   - Gate 7: Advisory architecture hygiene & orphan scanner
