import { PrismaClient } from "@prisma/client";
import { ClassService } from "../server/services/class.service.js";

async function runFullLifecycleTestSuite() {
  const prisma = new PrismaClient();
  const classService = new ClassService(prisma);

  console.log("🚀 Running Comprehensive Class Lifecycle Test Suite...\n");

  let testCourse: any = null;
  let testTeacher: any = null;
  let testStudent: any = null;
  let manualClass: any = null;
  let autoCloseClass: any = null;
  let autoPurgeClass: any = null;

  try {
    // 0. Chuẩn bị dữ liệu mẫu (Teacher, Student, Course)
    testTeacher = await prisma.user.create({
      data: {
        email: `test_teacher_${Date.now()}@example.com`,
        passwordHash: "test_hash",
        fullName: "Test Teacher",
        role: "teacher",
      },
    });

    testStudent = await prisma.user.create({
      data: {
        email: `test_student_${Date.now()}@example.com`,
        passwordHash: "test_hash",
        fullName: "Test Student",
        role: "student",
      },
    });

    testCourse = await prisma.course.findFirst();
    if (!testCourse) {
      testCourse = await prisma.course.create({
        data: {
          title: "Test Course",
          description: "Test Course Description",
        },
      });
    }

    console.log("✅ Step 0: Test fixtures created.");

    // --- TEST 1: ĐÓNG LỚP THỦ CÔNG & GỬI THÔNG BÁO ---
    console.log("\n🧪 Test 1: Manual Class Close & Notification...");
    manualClass = await prisma.class.create({
      data: {
        name: "Test Class - Manual Close",
        courseId: testCourse.id,
        teacherId: testTeacher.userId,
        status: "ACTIVE",
        isActive: true,
      },
    });

    await prisma.classStudent.create({
      data: {
        classId: manualClass.id,
        studentId: testStudent.userId,
      },
    });

    // Thực hiện đóng lớp
    const closeResult = await classService.closeClass(
      { id: testTeacher.userId, roles: ["teacher"] },
      manualClass.id
    );

    if (closeResult.data.status !== "CLOSED" || closeResult.data.isActive !== false || !closeResult.data.closedAt) {
      throw new Error("❌ Class status/isActive/closedAt not updated properly on close");
    }
    console.log("  ✅ Class status changed to CLOSED with closedAt timestamp.");

    // Kiểm tra Notification đã được tạo cho Teacher và Student
    const notifs = await prisma.notification.findMany({
      where: {
        entityType: "CLASS",
        entityId: manualClass.id,
      },
    });

    if (notifs.length < 2) {
      throw new Error(`❌ Expected at least 2 notifications (teacher + student), got ${notifs.length}`);
    }
    console.log(`  ✅ Notifications verified: ${notifs.length} notifications dispatched.`);

    // Kiểm tra Mutation Guards (Chặn ghi khi đã đóng)
    let blockedAddStudent = false;
    try {
      await classService.addStudent(
        { id: testTeacher.userId, roles: ["teacher"] },
        manualClass.id,
        testStudent.userId
      );
    } catch (e: any) {
      if (e.statusCode === 400 && e.message.includes("đã kết thúc và đóng")) {
        blockedAddStudent = true;
      }
    }
    if (!blockedAddStudent) {
      throw new Error("❌ Mutation guard failed: addStudent was not blocked on CLOSED class");
    }
    console.log("  ✅ Mutation guard verified: Adding students to CLOSED class is blocked.");

    // --- TEST 2: TỰ ĐỘNG ĐÓNG LỚP QUÁ 6 THÁNG ---
    console.log("\n🧪 Test 2: Auto-close expired classes (> 6 months from start_date)...");
    const sevenMonthsAgo = new Date();
    sevenMonthsAgo.setMonth(sevenMonthsAgo.getMonth() - 7);

    autoCloseClass = await prisma.class.create({
      data: {
        name: "Test Class - 7 Months Old",
        courseId: testCourse.id,
        teacherId: testTeacher.userId,
        startDate: sevenMonthsAgo,
        status: "ACTIVE",
        isActive: true,
      },
    });

    await prisma.classStudent.create({
      data: {
        classId: autoCloseClass.id,
        studentId: testStudent.userId,
      },
    });

    // Chạy maintenance
    const maintenanceResult1 = await classService.runClassLifecycleMaintenance();
    console.log("  Maintenance 1 result:", maintenanceResult1);

    const checkAutoClosed = await prisma.class.findUnique({
      where: { id: autoCloseClass.id },
    });
    if (!checkAutoClosed || checkAutoClosed.status !== "CLOSED" || checkAutoClosed.isActive !== false) {
      throw new Error("❌ Expired class was not auto-closed");
    }
    console.log("  ✅ Expired class successfully auto-closed by maintenance job.");

    // --- TEST 3: TỰ ĐỘNG XÓA DỌN DẸP LỚP ĐÃ ĐÓNG QUÁ 3 THÁNG ---
    console.log("\n🧪 Test 3: Auto-purge closed classes (> 3 months since closed_at)...");
    const fourMonthsAgo = new Date();
    fourMonthsAgo.setMonth(fourMonthsAgo.getMonth() - 4);

    autoPurgeClass = await prisma.class.create({
      data: {
        name: "Test Class - Closed 4 Months Ago",
        courseId: testCourse.id,
        teacherId: testTeacher.userId,
        status: "CLOSED",
        isActive: false,
        closedAt: fourMonthsAgo,
      },
    });

    // Chạy maintenance
    const maintenanceResult2 = await classService.runClassLifecycleMaintenance();
    console.log("  Maintenance 2 result:", maintenanceResult2);

    const checkPurged = await prisma.class.findUnique({
      where: { id: autoPurgeClass.id },
    });
    if (checkPurged !== null) {
      throw new Error("❌ Old closed class was not purged/deleted");
    }
    console.log("  ✅ Old closed class successfully purged/deleted from database.");

    console.log("\n🎉 ALL TESTS PASSED SUCCESSFULLY! 100% VALIDATED.");
  } catch (err: any) {
    console.error("\n❌ Test Suite Failed:", err);
    process.exit(1);
  } finally {
    // Dọn dẹp dữ liệu test
    console.log("\n🧹 Cleaning up test artifacts...");
    if (manualClass?.id) {
      await prisma.notification.deleteMany({ where: { entityId: manualClass.id } }).catch(() => {});
      await prisma.class.delete({ where: { id: manualClass.id } }).catch(() => {});
    }
    if (autoCloseClass?.id) {
      await prisma.notification.deleteMany({ where: { entityId: autoCloseClass.id } }).catch(() => {});
      await prisma.class.delete({ where: { id: autoCloseClass.id } }).catch(() => {});
    }
    if (testStudent?.userId) {
      await prisma.user.delete({ where: { userId: testStudent.userId } }).catch(() => {});
    }
    if (testTeacher?.userId) {
      await prisma.user.delete({ where: { userId: testTeacher.userId } }).catch(() => {});
    }
    await prisma.$disconnect();
    console.log("✨ Cleanup completed.");
  }
}

runFullLifecycleTestSuite();
