import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

let url = process.env.DATABASE_URL;
if (url && url.includes("db.gzpdlqxjggyxlkeatvvf.supabase.co")) {
  try {
    const parsed = new URL(url);
    parsed.hostname = "aws-0-ap-southeast-2.pooler.supabase.com";
    parsed.port = "6543";
    if (!parsed.username.includes(".")) {
      parsed.username = `${parsed.username}.gzpdlqxjggyxlkeatvvf`;
    }
    if (!parsed.searchParams.has("pgbouncer")) {
      parsed.searchParams.set("pgbouncer", "true");
    }
    url = parsed.toString();
  } catch (e) {}
}

const prisma = new PrismaClient({ datasources: url ? { db: { url } } : undefined });

async function runAudit() {
  console.log("=================================================================");
  console.log("🔍 1. SYSTEM-WIDE RECORD COUNTS");
  console.log("=================================================================");
  const [
    users, userRoles, courses, exams, submissions, answers,
    classes, classStudents, sessions, attendance,
    reports, interventions, leads, branches, rooms
  ] = await Promise.all([
    prisma.user.count(),
    prisma.userRole.count(),
    prisma.course.count(),
    prisma.exam.count(),
    prisma.examSubmission.count(),
    prisma.answer.count(),
    prisma.class.count(),
    prisma.classStudent.count(),
    prisma.classSession.count(),
    prisma.classAttendance.count(),
    prisma.studentPeriodicReport.count(),
    prisma.studentInterventionLog.count(),
    prisma.contactLead.count(),
    prisma.branch.count(),
    prisma.room.count(),
  ]);

  console.log({
    users, userRoles, courses, exams, submissions, answers,
    classes, classStudents, sessions, attendance,
    reports, interventions, leads, branches, rooms
  });

  console.log("\n=================================================================");
  console.log("🔍 2. DUAL-ID AUDIT (User.id vs User.userId vs Auth)");
  console.log("=================================================================");
  const allUsers = await prisma.user.findMany({
    include: { roles: true },
  });
  console.log(`Total users in DB: ${allUsers.length}`);
  const usersWithDiffIds = allUsers.filter(u => u.id !== u.userId);
  console.log(`Users with id !== userId: ${usersWithDiffIds.length}`);
  for (const u of allUsers) {
    const roles = u.roles.map(r => r.role).join(", ");
    console.log(`  • [${roles || "NO_ROLE"}] ${u.fullName} | Email: ${u.email} | id: ${u.id} | userId: ${u.userId}`);
  }

  console.log("\n=================================================================");
  console.log("🔍 3. CLASS & TEACHER RELATION AUDIT");
  console.log("=================================================================");
  const classList = await prisma.class.findMany({
    include: {
      teacher: true,
      students: {
        include: {
          student: true,
        },
      },
      course: true,
      branch: true,
      room: true,
    },
  });

  for (const c of classList) {
    console.log(`\n🏫 Class: "${c.name}" (ID: ${c.id})`);
    console.log(`   - Course: ${c.course?.title || "NONE"} (${c.courseId})`);
    console.log(`   - Branch: ${c.branch?.name || "NONE"} (${c.branchId}) | Room: ${c.room?.name || "NONE"} (${c.roomId})`);
    console.log(`   - Teacher ID in Class: ${c.teacherId}`);
    console.log(`   - Teacher resolved by Prisma: ${c.teacher ? `${c.teacher.fullName} (id: ${c.teacher.id}, userId: ${c.teacher.userId})` : "❌ NOT FOUND (ORPHAN TEACHER ID!)"}`);
    console.log(`   - Enrolled Students (${c.students.length}):`);
    for (const cs of c.students) {
      console.log(`      * ${cs.student?.fullName || "❌ ORPHAN STUDENT"} | cs.studentId: ${cs.studentId} | User.id: ${cs.student?.id} | User.userId: ${cs.student?.userId}`);
    }
  }

  console.log("\n=================================================================");
  console.log("🔍 4. EXAM SUBMISSIONS & ANSWERS INTEGRITY AUDIT");
  console.log("=================================================================");
  const allSubs = await prisma.examSubmission.findMany({
    include: {
      student: true,
      exam: true,
      answers: true,
    },
    orderBy: { createdAt: "desc" },
  });

  console.log(`Total Submissions: ${allSubs.length}`);
  const orphanSubs = allSubs.filter(s => !s.student || !s.exam);
  console.log(`Orphan Submissions (missing student or exam): ${orphanSubs.length}`);

  for (const s of allSubs) {
    console.log(`  📄 Sub ID: ${s.id} | Status: ${s.status} | TotalScore: ${s.totalScore} | Student: ${s.student?.fullName || "❌ NO_STUDENT"} (${s.studentId}) | Exam: ${s.exam?.title || "❌ NO_EXAM"} | Answers count: ${s.answers.length}`);
  }

  console.log("\n=================================================================");
  console.log("🔍 5. SESSIONS & ATTENDANCE AUDIT");
  console.log("=================================================================");
  const allSessions = await prisma.classSession.findMany({
    include: {
      class: true,
      attendances: {
        include: {
          student: true,
          marker: true,
        },
      },
    },
  });
  console.log(`Total Class Sessions: ${allSessions.length}`);
  let totalAttRecords = 0;
  let brokenAttRecords = 0;
  for (const sess of allSessions) {
    totalAttRecords += sess.attendances.length;
    for (const att of sess.attendances) {
      if (!att.student) brokenAttRecords++;
    }
  }
  console.log(`Total Attendance Records: ${totalAttRecords}, Broken Student links: ${brokenAttRecords}`);

  console.log("\n=================================================================");
  console.log("🔍 6. PERIODIC REPORTS & INTERVENTIONS AUDIT");
  console.log("=================================================================");
  const reportsList = await prisma.studentPeriodicReport.findMany({
    include: { student: true, teacher: true },
  });
  console.log(`Total Periodic Reports: ${reportsList.length}`);
  for (const r of reportsList) {
    console.log(`  📋 Report: ${r.id} | Student: ${r.student?.fullName || "❌ NO_STUDENT"} | Teacher: ${r.teacher?.fullName || "❌ NO_TEACHER"} | Status: ${r.status}`);
  }

  const logsList = await prisma.studentInterventionLog.findMany({
    include: { student: true, staff: true },
  });
  console.log(`Total Intervention Logs: ${logsList.length}`);
  for (const l of logsList) {
    console.log(`  🛠️ Log: ${l.id} | Student: ${l.student?.fullName || "❌ NO_STUDENT"} | Staff: ${l.staff?.fullName || "❌ NO_STAFF"} | Category: ${l.category}`);
  }
}

runAudit()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
