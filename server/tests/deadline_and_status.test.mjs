import assert from "node:assert/strict";

// ============================================================================
// PHASE 1 — PURE DOMAIN IMPLEMENTATION UNDER TEST
// ============================================================================

/**
 * 1. resolveEffectiveDeadline: Pure resolution with priority MANUAL > AUTO
 * Derived provenance: No DB migration needed.
 */
function resolveEffectiveDeadline(params) {
  const { classStartDate, lessonWeek, manualDeadline, defaultOffsetDays = 7 } = params;

  if (manualDeadline) {
    return {
      effectiveDeadline: new Date(manualDeadline),
      deadlineSource: "MANUAL",
    };
  }

  const baseDate = classStartDate ? new Date(classStartDate) : new Date();
  const weekNum = Math.max(1, Math.floor(Number(lessonWeek) || 1));
  const offsetDays = Math.max(1, Number(defaultOffsetDays) || 7);

  const targetMs = baseDate.getTime() + weekNum * offsetDays * 24 * 60 * 60 * 1000;
  const autoDeadline = new Date(targetMs);
  autoDeadline.setHours(23, 59, 59, 999);

  return {
    effectiveDeadline: autoDeadline,
    deadlineSource: "AUTO",
  };
}

/**
 * 2. calculateSubmissionTiming: SUBMITTED + LATE exists independently
 */
function calculateSubmissionTiming(submittedAt, effectiveDeadline) {
  if (!submittedAt || !effectiveDeadline) {
    return { isLate: false, lateDays: 0 };
  }

  const subMs = new Date(submittedAt).getTime();
  const deadMs = new Date(effectiveDeadline).getTime();

  if (isNaN(subMs) || isNaN(deadMs) || subMs <= deadMs) {
    return { isLate: false, lateDays: 0 };
  }

  const diffMs = subMs - deadMs;
  const lateDays = Math.max(1, Math.floor(diffMs / (24 * 60 * 60 * 1000)));

  return {
    isLate: true,
    lateDays,
  };
}

/**
 * 3. deriveCanonicalVisualStatus: OVERDUE is derived, never stored in DB
 */
function deriveCanonicalVisualStatus(params) {
  const { submissionStatus, revisionRequired, deadline, now = Date.now() } = params;
  const rawStatus = (submissionStatus || "").toUpperCase().trim();

  // 1. GRADED & REVISION (Highest priority)
  if (rawStatus === "GRADED") {
    return revisionRequired ? "REVISION_REQUIRED" : "GRADED";
  }

  // 2. SUBMITTED / GRADING (If submitted, NEVER marked as OVERDUE)
  if (rawStatus === "SUBMITTED" || rawStatus === "GRADING") {
    return "SUBMITTED";
  }

  // 3. OVERDUE (Derived only when NOT submitted and deadline has passed)
  if (deadline) {
    const deadlineMs = new Date(deadline).getTime();
    if (!isNaN(deadlineMs) && now > deadlineMs) {
      return "OVERDUE";
    }
  }

  // 4. IN_PROGRESS (Drafting within deadline)
  if (rawStatus === "IN_PROGRESS") {
    return "IN_PROGRESS";
  }

  // 5. UPCOMING / NOT_STARTED (Default)
  return "UPCOMING";
}

/**
 * 4. sortStudentActionQueue: Strict pedagogical priority order
 * Priority 1: REVISION_REQUIRED (Cần sửa bài Attempt 2)
 * Priority 2: OVERDUE (Quá hạn chưa nộp)
 * Priority 3: DUE_SOON (Sắp hết hạn trong <= 48h)
 * Priority 4: UPCOMING (Bài tiếp theo)
 */
function sortStudentActionQueue(homeworks, now = Date.now()) {
  const actionItems = [];

  homeworks.forEach((hw) => {
    const status = hw.status;
    // Skip already graded and submitted items from active student queue
    if (status === "GRADED" || status === "SUBMITTED") {
      return;
    }

    let priority = 4;
    if (status === "REVISION_REQUIRED") {
      priority = 1;
    } else if (status === "OVERDUE") {
      priority = 2;
    } else if (hw.deadline) {
      const diffMs = new Date(hw.deadline).getTime() - now;
      if (diffMs > 0 && diffMs <= 48 * 60 * 60 * 1000) {
        priority = 3; // DUE_SOON
      }
    }

    actionItems.push({
      ...hw,
      priority,
    });
  });

  return actionItems.sort((a, b) => {
    if (a.priority !== b.priority) {
      return a.priority - b.priority;
    }
    const deadA = a.deadline ? new Date(a.deadline).getTime() : Infinity;
    const deadB = b.deadline ? new Date(b.deadline).getTime() : Infinity;
    return deadA - deadB;
  });
}

// ============================================================================
// PHASE 1 — TEST SUITE EXECUTION
// ============================================================================

console.log("=== RUNNING PHASE 1 DOMAIN TESTS ===");

// TEST 1: resolveEffectiveDeadline (MANUAL override > AUTO calculation)
{
  const startDate = "2026-09-01T00:00:00.000Z";

  // Auto Week 1
  const auto1 = resolveEffectiveDeadline({ classStartDate: startDate, lessonWeek: 1, defaultOffsetDays: 7 });
  assert.equal(auto1.deadlineSource, "AUTO");
  assert.equal(auto1.effectiveDeadline.getUTCDate(), 8); // 01/09 + 7 = 08/09

  // Auto Week 2
  const auto2 = resolveEffectiveDeadline({ classStartDate: startDate, lessonWeek: 2, defaultOffsetDays: 7 });
  assert.equal(auto2.deadlineSource, "AUTO");
  assert.equal(auto2.effectiveDeadline.getUTCDate(), 15); // 01/09 + 14 = 15/09

  // Manual Override takes precedence
  const manual = resolveEffectiveDeadline({
    classStartDate: startDate,
    lessonWeek: 1,
    manualDeadline: "2026-09-12T23:59:59.000Z",
  });
  assert.equal(manual.deadlineSource, "MANUAL");
  assert.equal(manual.effectiveDeadline.getUTCDate(), 12);
  console.log("✓ Test 1 Passed: resolveEffectiveDeadline respects MANUAL > AUTO provenance");
}

// TEST 2: calculateSubmissionTiming (SUBMITTED + LATE independent of OVERDUE)
{
  const deadline = "2026-08-20T23:59:59.000Z";
  const onTimeSubmission = "2026-08-19T10:00:00.000Z";
  const lateSubmission = "2026-08-22T15:00:00.000Z"; // 1.6 days late -> Math.floor = 1 late day

  const resOnTime = calculateSubmissionTiming(onTimeSubmission, deadline);
  assert.equal(resOnTime.isLate, false);
  assert.equal(resOnTime.lateDays, 0);

  const resLate = calculateSubmissionTiming(lateSubmission, deadline);
  assert.equal(resLate.isLate, true);
  assert.equal(resLate.lateDays, 1);
  console.log("✓ Test 2 Passed: calculateSubmissionTiming tracks late submissions accurately");
}

// TEST 3: deriveCanonicalVisualStatus (Strict Status Invariants)
{
  const now = new Date("2026-08-23T12:00:00.000Z").getTime();
  const pastDeadline = "2026-08-20T23:59:59.000Z";
  const futureDeadline = "2026-08-30T23:59:59.000Z";

  // Invariant 1: Submitted post-deadline is SUBMITTED, NEVER OVERDUE
  assert.equal(
    deriveCanonicalVisualStatus({ submissionStatus: "SUBMITTED", deadline: pastDeadline, now }),
    "SUBMITTED"
  );

  // Invariant 2: Revision required is highest priority
  assert.equal(
    deriveCanonicalVisualStatus({ submissionStatus: "GRADED", revisionRequired: true, deadline: pastDeadline, now }),
    "REVISION_REQUIRED"
  );

  // Invariant 3: Overdue only when unsubmitted + past deadline
  assert.equal(
    deriveCanonicalVisualStatus({ submissionStatus: "NOT_STARTED", deadline: pastDeadline, now }),
    "OVERDUE"
  );
  assert.equal(
    deriveCanonicalVisualStatus({ submissionStatus: "IN_PROGRESS", deadline: pastDeadline, now }),
    "OVERDUE"
  );

  // Invariant 4: Upcoming when within deadline
  assert.equal(
    deriveCanonicalVisualStatus({ submissionStatus: "NOT_STARTED", deadline: futureDeadline, now }),
    "UPCOMING"
  );
  console.log("✓ Test 3 Passed: deriveCanonicalVisualStatus enforces pure derived status rules");
}

// TEST 4: sortStudentActionQueue (Pedagogical Priority: Revision > Overdue > Due Soon > Upcoming)
{
  const now = new Date("2026-08-23T12:00:00.000Z").getTime();

  const mockHomeworks = [
    { id: "hw-upcoming", title: "Upcoming Week 5", status: "UPCOMING", deadline: "2026-09-01T23:59:59.000Z" },
    { id: "hw-overdue", title: "Overdue Week 2", status: "OVERDUE", deadline: "2026-08-20T23:59:59.000Z" },
    { id: "hw-revision", title: "Revision Task 1", status: "REVISION_REQUIRED", deadline: "2026-08-15T23:59:59.000Z" },
    { id: "hw-due-soon", title: "Due Soon Speaking", status: "UPCOMING", deadline: "2026-08-24T18:00:00.000Z" }, // 30h away -> DUE_SOON
    { id: "hw-graded", title: "Done Task", status: "GRADED", deadline: "2026-08-10T23:59:59.000Z" }, // Filtered out
    { id: "hw-submitted", title: "Waiting Teacher", status: "SUBMITTED", deadline: "2026-08-22T23:59:59.000Z" }, // Filtered out
  ];

  const sortedQueue = sortStudentActionQueue(mockHomeworks, now);

  assert.equal(sortedQueue.length, 4, "Should only contain active actionable items (excluding GRADED and SUBMITTED)");
  assert.equal(sortedQueue[0].id, "hw-revision", "Priority 1 must be REVISION_REQUIRED");
  assert.equal(sortedQueue[1].id, "hw-overdue", "Priority 2 must be OVERDUE");
  assert.equal(sortedQueue[2].id, "hw-due-soon", "Priority 3 must be DUE_SOON (<= 48h)");
  assert.equal(sortedQueue[3].id, "hw-upcoming", "Priority 4 must be UPCOMING");

  console.log("✓ Test 4 Passed: sortStudentActionQueue prioritizes pedagogical urgency with 100% precision");
}

console.log("\nALL PHASE 1 DOMAIN TESTS PASSED WITH 100% SUCCESS! 🎉\n");
