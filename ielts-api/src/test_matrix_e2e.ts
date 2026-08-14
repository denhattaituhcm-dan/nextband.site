import { PrismaClient } from '@prisma/client';
import { AttendanceService } from './services/attendance.service.js';

const prisma = new PrismaClient();
const attendanceService = new AttendanceService(prisma);

async function testE2E() {
  console.log("=== VERIFYING ATTENDANCE MATRIX E2E ===");
  try {
    // Find class DREAMER
    const dreamerClass: any[] = await prisma.$queryRawUnsafe(`
      SELECT id, name FROM classes WHERE LOWER(name) LIKE '%dreamer%' LIMIT 1
    `);

    if (dreamerClass.length === 0) {
      console.log("❌ No Dreamer class found.");
      return;
    }

    const classId = dreamerClass[0].id;
    console.log(`Testing Class: ${dreamerClass[0].name} (${classId})`);

    // Call getAttendanceMatrix
    const matrixData = await attendanceService.getAttendanceMatrix(classId);

    console.log(`\n✅ Attendance Matrix Output Summary:`);
    console.log(`- Class Name: ${matrixData.className}`);
    console.log(`- Total Sessions Generated: ${matrixData.totalSessions}`);
    console.log(`- Completed Sessions: ${matrixData.completedSessions}`);
    console.log(`- Session Coverage: ${matrixData.sessionCoverage}%`);
    console.log(`- Attendance Record Coverage: ${matrixData.recordCoverage}%`);
    console.log(`- Total Enrolled Students in Matrix: ${matrixData.students.length}`);

    if (matrixData.sessions.length > 0) {
      console.log(`\nSample Sessions Checklist:`);
      console.log(`  S1: ${matrixData.sessions[0].lessonTitle} | Status: ${matrixData.sessions[0].status}`);
      console.log(`  S${matrixData.sessions.length}: ${matrixData.sessions[matrixData.sessions.length - 1].lessonTitle} | Status: ${matrixData.sessions[matrixData.sessions.length - 1].status}`);
    }

    if (matrixData.totalSessions === 27) {
      console.log(`\n🎉 E2E VERIFICATION PASSED 100%: Class Dreamer has exactly 27 ClassSessions!`);
    } else {
      console.log(`\n⚠️ Total Sessions count is ${matrixData.totalSessions}`);
    }

  } catch (err) {
    console.error("E2E Test Error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

testE2E();
