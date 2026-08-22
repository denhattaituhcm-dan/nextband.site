import assert from "node:assert/strict";

// 1. Test calculateAutomaticDeadline
function calculateAutomaticDeadline(params) {
  const baseDate = params.classStartDate ? new Date(params.classStartDate) : new Date();
  const order = Math.max(1, Math.floor(Number(params.lessonOrder) || 1));
  const targetMs = baseDate.getTime() + order * 7 * 24 * 60 * 60 * 1000;
  const deadline = new Date(targetMs);
  deadline.setHours(23, 59, 59, 999);
  return deadline;
}

// 2. Test deriveCanonicalVisualStatus
function deriveCanonicalVisualStatus(params) {
  const { submissionStatus, revisionRequired, deadline, now = Date.now() } = params;
  const rawStatus = (submissionStatus || "").toUpperCase().trim();

  if (rawStatus === "GRADED") {
    return revisionRequired ? "REVISION_REQUIRED" : "GRADED";
  }

  if (rawStatus === "SUBMITTED" || rawStatus === "GRADING") {
    return "SUBMITTED";
  }

  if (deadline) {
    const deadlineMs = new Date(deadline).getTime();
    if (!isNaN(deadlineMs) && now > deadlineMs) {
      return "OVERDUE";
    }
  }

  if (rawStatus === "IN_PROGRESS") {
    return "IN_PROGRESS";
  }

  return "UPCOMING";
}

// 3. Test formatDeadlineCountdown
function formatDeadlineCountdown(deadline, now = Date.now()) {
  if (!deadline) return null;
  const targetMs = new Date(deadline).getTime();
  if (isNaN(targetMs)) return null;

  const diffMs = targetMs - now;
  const isOverdue = diffMs < 0;
  const absDiff = Math.abs(diffMs);

  const diffMinutes = Math.floor(absDiff / (1000 * 60));
  const diffHours = Math.floor(absDiff / (1000 * 60 * 60));
  const diffDays = Math.floor(absDiff / (1000 * 60 * 60 * 24));

  if (isOverdue) {
    if (diffDays >= 1) return { text: `Quá hạn ${diffDays} ngày`, isOverdue: true };
    if (diffHours >= 1) return { text: `Quá hạn ${diffHours} giờ`, isOverdue: true };
    return { text: `Quá hạn ${Math.max(1, diffMinutes)} phút`, isOverdue: true };
  }

  if (diffDays >= 1) return { text: `Còn ${diffDays} ngày`, isOverdue: false };
  if (diffHours >= 1) return { text: `Còn ${diffHours} giờ`, isOverdue: false };
  return { text: `Còn ${Math.max(1, diffMinutes)} phút`, isOverdue: false };
}

console.log("=== RUNNING UNIT TESTS FOR DEADLINE & STATUS HELPER ===");

// TEST 1: calculateAutomaticDeadline
{
  const startDate = new Date("2026-09-01T00:00:00.000Z");
  const d1 = calculateAutomaticDeadline({ classStartDate: startDate, lessonOrder: 1 });
  const d2 = calculateAutomaticDeadline({ classStartDate: startDate, lessonOrder: 2 });
  
  assert.equal(d1.getHours(), 23);
  assert.equal(d1.getMinutes(), 59);
  assert.equal(d1.getSeconds(), 59);
  assert.equal(d1.getMilliseconds(), 999);
  
  const diffDays1 = Math.floor((d1.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000));
  assert.equal(diffDays1, 7, "Lesson 1 deadline should be exactly 7 days after classStartDate");

  const diffDays2 = Math.floor((d2.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000));
  assert.equal(diffDays2, 14, "Lesson 2 deadline should be exactly 14 days after classStartDate");
  console.log("✓ Test 1 Passed: calculateAutomaticDeadline conforms to exact 7-day increments");
}

// TEST 2: deriveCanonicalVisualStatus strict precedence
{
  const now = new Date("2026-08-23T12:00:00.000Z").getTime();
  const pastDeadline = "2026-08-20T23:59:59.000Z";
  const futureDeadline = "2026-08-30T23:59:59.000Z";

  // Case A: GRADED
  assert.equal(deriveCanonicalVisualStatus({ submissionStatus: "GRADED", revisionRequired: false, deadline: pastDeadline, now }), "GRADED");
  assert.equal(deriveCanonicalVisualStatus({ submissionStatus: "GRADED", revisionRequired: true, deadline: pastDeadline, now }), "REVISION_REQUIRED");

  // Case B: SUBMITTED (Even if deadline is in the past, submitted is NEVER overdue!)
  assert.equal(deriveCanonicalVisualStatus({ submissionStatus: "SUBMITTED", deadline: pastDeadline, now }), "SUBMITTED");
  assert.equal(deriveCanonicalVisualStatus({ submissionStatus: "grading", deadline: pastDeadline, now }), "SUBMITTED");

  // Case C: OVERDUE (Unsubmitted + past deadline)
  assert.equal(deriveCanonicalVisualStatus({ submissionStatus: "NOT_STARTED", deadline: pastDeadline, now }), "OVERDUE");
  assert.equal(deriveCanonicalVisualStatus({ submissionStatus: "", deadline: pastDeadline, now }), "OVERDUE");
  assert.equal(deriveCanonicalVisualStatus({ submissionStatus: "IN_PROGRESS", deadline: pastDeadline, now }), "OVERDUE");

  // Case D: UPCOMING & IN_PROGRESS (Within deadline)
  assert.equal(deriveCanonicalVisualStatus({ submissionStatus: "NOT_STARTED", deadline: futureDeadline, now }), "UPCOMING");
  assert.equal(deriveCanonicalVisualStatus({ submissionStatus: "IN_PROGRESS", deadline: futureDeadline, now }), "IN_PROGRESS");
  console.log("✓ Test 2 Passed: deriveCanonicalVisualStatus conforms to strict status precedence");
}

// TEST 3: formatDeadlineCountdown
{
  const now = new Date("2026-08-23T12:00:00.000Z").getTime();
  const past2Days = "2026-08-21T12:00:00.000Z";
  const future3Days = "2026-08-26T12:00:00.000Z";

  const cdPast = formatDeadlineCountdown(past2Days, now);
  assert.equal(cdPast.isOverdue, true);
  assert.equal(cdPast.text, "Quá hạn 2 ngày");

  const cdFuture = formatDeadlineCountdown(future3Days, now);
  assert.equal(cdFuture.isOverdue, false);
  assert.equal(cdFuture.text, "Còn 3 ngày");
  console.log("✓ Test 3 Passed: formatDeadlineCountdown formats human-readable Vietnamese time diffs");
}

console.log("\nALL TESTS PASSED WITH 100% SUCCESS! 🎉");
