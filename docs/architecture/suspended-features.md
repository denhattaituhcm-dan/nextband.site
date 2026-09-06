# SUSPENDED AND DEFERRED FEATURES REGISTRY
> **NextBand LMS Monorepo**  
> **Classification:** Living Architectural Debt & Suspension Register  
> **Last Updated:** 2026-09-07T00:20:00+07:00  

This document serves as the formal architectural registry for components, services, and modules in the NextBand codebase that are **NOT live in production**, but are **NOT dead code**. They represent features intentionally de-integrated or authored ahead of integration during roadmap milestones.

---

## 1. SUSPENDED LEXICON (MY LEXICON & COGNITIVE WORD POPOVER)

### Status: SUSPENDED FEATURE
- **Date Suspended:** 2026-09-05 (Commit 99ad2fc6efab79036c5336748ba5ed074a86b97e —  n)
- **Suspension Action:**
  - Route /app/my-lexicon converted from <MyLexiconPage /> to <Navigate to=\/app\ replace /> in 
extband/src/App.tsx.
  - <CognitiveWordPopover /> unmounted from App.tsx Suspense root.
  - <InContextLearningLayer> wrapper removed from ReadingSection.tsx.
  - Menu item \Sổ từ cá nhân\ removed from ClientSidebar.tsx.
- **Reason for Suspension (Verified Forensic Evidence):**
  - Deliberate UI de-integration during release stabilization prior to Parent Hub deployment. Selection-based mouse events collided with Reading passage annotation in IELTS Exam focus mode.
- **Affected Files:**
  - 
extband/src/pages/MyLexiconPage.tsx (537 lines, full spaced-repetition UI, Memory Arc)
  - 
extband/src/components/lexicon/CognitiveWordPopover.tsx (275 lines, 1-click word lookup)
  - 
extband/src/modules/lexicon/* (7 files, in-context learning layer and action pills)
- **Active Backend Dependencies:**
  - server/routes/lexicon.routes.ts (Active Fastify routes: /lookup, /save, /due-review, /review, /my-lexicon)
  - server/services/cognitive-lexicon.service.ts
  - Prisma Schema: UserVocabulary and CognitiveWord tables
  - Client SDK: 
extband/src/lib/lexiconApi.ts
- **Reactivation Requirements:**
  - Scope mouse-selection popover exclusively to student reading practice mode (/reading/:caseId), disabling it on timed exam interfaces (/exam/:examId).
  - Restore <Route path=\/app/my-lexicon\ element={<MyLexiconPage />} /> and re-enable sidebar entry.
- **Decision Required By:** Product Lead / Lead Frontend Engineer.

---

## 2. UNREFERENCED REMINDER SERVICE

### Status: UNREFERENCED SERVICE / DEFERRED WORKFLOW
- **Date Authored:** 2026-09-05 (Commit 58cba79eef6f22649f51d6250f0f8c8137dcb58b — \h\)
- **Affected File:** server/services/reminder.service.ts (61 lines)
- **Call Graph Status:** 0 callers across all backend routes, services, crons, and scripts.
- **Architectural Role (Verified):**
  - Defines CommunicationService and ZaloChannelAdapter to generate standardized Vietnamese reminder links for parents (https://zalo.me/{cleanPhone}?text=...) linking to Parent Hub (/p/{parentToken}).
- **Reason for Deferred State:**
  - Authored concurrently with Parent Hub (ParentHubPage.tsx), Snapshot Radar, and Risk Engine, but the Fastify handler connecting it to intervention.routes.ts or student intervention UI was deferred to Phase 2 of Parent Engagement.
- **Reactivation Requirements:**
  - Inject CommunicationService into server/services/intervention.service.ts or server/routes/parent-reports.routes.ts.
  - Expose \Gửi nhắc nhở Zalo\ action on Teacher / Admin student risk dashboard.
- **Decision Required By:** Backend Lead / Operations Lead.

---

## 3. LEGACY SERVERLESS SURFACE: DIRECT LEXICON FUNCTION

### Status: LEGACY — EXTERNAL REACHABILITY UNKNOWN
- **Affected Files:**
  - pi/v1/lexicon.js (117 lines)
  - pi/v1/lexiconInferenceProvider.js (151 lines)
- **Architectural Role:**
  - Standalone Vercel Serverless Function created on 2026-08-31 (1977dc), providing /api/v1/lexicon/understand and /api/v1/lexicon/save using in-memory Map caching and Groq/Gemini direct inference.
  - Consumed internally by 
extband/src/modules/lexicon/services/lexiconClient.ts.
- **Primary Alternative:**
  - Fastify Enterprise Subsystem via server/routes/lexicon.routes.ts mounted inside pi/index.js with PostgreSQL database persistence.
- **Decommissioning Pre-requisite:**
  - Review Vercel function invocation metrics for /api/v1/lexicon.
  - Once telemetry confirms 0 invocations over a rolling 7-day period and modules/lexicon is re-aligned with Fastify's /api/v1/lexicon/*, decommission both files.
