# Architecture Review Checklist (Release Gate Checklist)

Tài liệu này đóng vai trò là **Cổng Kiểm Soát Release (Release Gate)**. Bất kỳ đợt Release nào cũng sẽ bị **BLOCKED** nếu không vượt qua 100% các câu hỏi dưới đây.

---

## RELEASE GATE CHECKLIST

### 1. Tier 0 Critical Edges
- [x] **EDGE-001 (Course -> Class)**: Physical FK `course_id uuid` verified on Supabase DB. Status: `VERIFIED`.
- [x] **EDGE-002 (User -> Teacher)**: Identity mapping `targetId = p.user_id` verified. Status: `VERIFIED`.
- [ ] **EDGE-003 (Class -> ClassStudent)**: Physical FK and orphan scan. Status: `EVIDENCE_PENDING`.
- [ ] **EDGE-004 (Class -> Homework)**: Physical FK audit. Status: `EVIDENCE_PENDING`.
- [ ] **EDGE-005 (Homework -> Submission)**: Rollback & double-submit check. Status: `EVIDENCE_PENDING`.

### 2. Zero Schema Drift Check
- [x] Prisma Schema vs Supabase Cloud DB: `classes.course_id` aligned.
- [x] DTO Payload vs Physical Columns: Omit empty/undefined fields aligned.
- [x] PostgREST Embed Relational Syntax: `user_roles` query separation aligned.

### 3. Unknowns Governance Check
- [ ] **UNK-001A**: Course -> Class Cascade Deletion (`UNKNOWN`).
- [ ] **UNK-004A**: Class -> Homework Cascade Deletion (`EVIDENCE_PENDING`).
- [ ] **UNK-005A**: Submission Rollback (`UNKNOWN`).
- [ ] **UNK-005B**: Duplicate Submission Lock (`UNKNOWN`).

### 4. Release Decision Protocol
- **Rule**: If ANY Tier 0 Edge status is `BROKEN` or ANY Tier 0 Unknown is unverified $\rightarrow$ **RELEASE IS BLOCKED**.

---

## CURRENT RELEASE GATE DECISION
```text
=====================================================================
                    RELEASE GATE DECISION: BLOCKED
=====================================================================
Reason:
- EDGE-003, EDGE-004, EDGE-005 are currently EVIDENCE_PENDING.
- UNK-001A, UNK-005A, UNK-005B are currently UNKNOWN / EVIDENCE_PENDING.
- Tier 0 Critical Edges require full physical evidence before Production Release.
=====================================================================
```
