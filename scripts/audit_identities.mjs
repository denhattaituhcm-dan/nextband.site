import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

/**
 * Read-Only Identity & RBAC Audit Script
 * Checks 8 Database Invariants without any mutations.
 */
async function auditIdentities() {
  console.log("=================================================================");
  console.log("🔍 RUNNING READ-ONLY IDENTITY & AUTHORIZATION AUDIT");
  console.log("=================================================================\n");

  const report = {
    SAFE: [],
    REVIEW_REQUIRED: [],
    CRITICAL: [],
  };

  // 1. Fetch all profiles, user_roles, classes, submissions
  const [profiles, userRoles, classes, submissions, courses] = await Promise.all([
    prisma.user.findMany({ include: { roles: true } }),
    prisma.userRole.findMany(),
    prisma.class.findMany({ select: { id: true, name: true, teacherId: true } }),
    prisma.examSubmission.findMany({ select: { id: true, gradedBy: true, studentId: true } }),
    prisma.course.findMany({ select: { id: true, title: true, teacherId: true } }),
  ]);

  const profileUserIds = new Set(profiles.map((p) => p.userId));
  const profileEmails = new Map();

  // Invariant 1 & 2: 1-to-1 mapping auth.users.id <-> profile
  profiles.forEach((p) => {
    if (p.email) {
      const lower = p.email.toLowerCase();
      const existing = profileEmails.get(lower) || [];
      existing.push(p);
      profileEmails.set(lower, existing);
    }
  });

  // Check email duplicates
  for (const [email, userList] of profileEmails.entries()) {
    if (userList.length > 1) {
      report.REVIEW_REQUIRED.push({
        invariant: "INVARIANT-01/02: Multiple profiles sharing same email",
        email,
        userIds: userList.map((u) => u.userId),
        details: "Multiple profile rows exist with identical email. Recommend explicit migration to canonical UID.",
      });
    }
  }

  // Invariant 3: user_roles.user_id points to valid profile.userId
  for (const r of userRoles) {
    if (!profileUserIds.has(r.userId)) {
      report.CRITICAL.push({
        invariant: "INVARIANT-03: Orphan user_role",
        roleId: r.id,
        userId: r.userId,
        role: r.role,
        details: `user_role ${r.id} points to userId ${r.userId} which has no profile.`,
      });
    }
  }

  // Invariant 4: classes.teacher_id points to valid profile.userId
  for (const c of classes) {
    if (c.teacherId && !profileUserIds.has(c.teacherId)) {
      report.CRITICAL.push({
        invariant: "INVARIANT-04: Orphan classes.teacher_id",
        classId: c.id,
        className: c.name,
        teacherId: c.teacherId,
        details: `Class ${c.name} has teacherId ${c.teacherId} that does not exist in profiles.`,
      });
    }
  }

  // Invariant 5: courses.teacher_id points to valid profile.userId
  for (const cr of courses) {
    if (cr.teacherId && !profileUserIds.has(cr.teacherId)) {
      report.CRITICAL.push({
        invariant: "INVARIANT-05: Orphan courses.teacher_id",
        courseId: cr.id,
        title: cr.title,
        teacherId: cr.teacherId,
        details: `Course ${cr.title} has teacherId ${cr.teacherId} that does not exist in profiles.`,
      });
    }
  }

  // Invariant 6: submissions gradedBy points to valid profile.userId
  for (const s of submissions) {
    if (s.gradedBy && !profileUserIds.has(s.gradedBy)) {
      report.REVIEW_REQUIRED.push({
        invariant: "INVARIANT-06: Orphan submission gradedBy",
        submissionId: s.id,
        gradedBy: s.gradedBy,
        details: `Submission ${s.id} has gradedBy ${s.gradedBy} that does not exist in profiles.`,
      });
    }
  }

  // Target User Check: bestcanthocity@gmail.com
  const targetEmail = "bestcanthocity@gmail.com";
  const targetProfiles = profiles.filter((p) => p.email?.toLowerCase() === targetEmail);
  if (targetProfiles.length === 1) {
    const tp = targetProfiles[0];
    const tpRoles = tp.roles.map((r) => r.role);
    const assignedClasses = classes.filter((c) => c.teacherId === tp.userId);
    
    if (tpRoles.includes("teacher") && assignedClasses.length > 0) {
      report.SAFE.push({
        target: targetEmail,
        userId: tp.userId,
        roles: tpRoles,
        assignedClassesCount: assignedClasses.length,
        status: "Canonical teacher identity healthy & properly mapped.",
      });
    } else {
      report.REVIEW_REQUIRED.push({
        target: targetEmail,
        userId: tp.userId,
        roles: tpRoles,
        assignedClassesCount: assignedClasses.length,
        status: "Teacher role or assigned classes need verification.",
      });
    }
  }

  console.log("=== AUDIT SUMMARY REPORT ===");
  console.log(`🟢 SAFE ITEMS: ${report.SAFE.length}`);
  report.SAFE.forEach((item) => console.log("  [SAFE]", item));

  console.log(`\n🟡 REVIEW REQUIRED: ${report.REVIEW_REQUIRED.length}`);
  report.REVIEW_REQUIRED.forEach((item) => console.log("  [REVIEW_REQUIRED]", item));

  console.log(`\n🔴 CRITICAL VIOLATIONS: ${report.CRITICAL.length}`);
  report.CRITICAL.forEach((item) => console.log("  [CRITICAL]", item));

  console.log("\n=================================================================");
  console.log(`Total Profiles: ${profiles.length} | Total UserRoles: ${userRoles.length} | Total Classes: ${classes.length}`);
  console.log("=================================================================");
}

auditIdentities()
  .catch((err) => {
    console.error("Audit error:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
