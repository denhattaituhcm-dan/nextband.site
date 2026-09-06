import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { isTestDatabaseConfigured, createSafeTestPrismaClient } from "../server/tests/testDbGuard.js";

const isDbReady = isTestDatabaseConfigured();

describe.skipIf(!isDbReady)("Student Management & Creation System Verification", () => {
  let prisma: any;
  const testEmail = `test_auto_student_${Date.now()}@nextband.test`;
  let createdUserId: string;

  beforeAll(async () => {
    prisma = createSafeTestPrismaClient();

    // Cleanup any prior test debris
    await prisma.userRole.deleteMany({ where: { user: { email: testEmail } } });
    await prisma.user.deleteMany({ where: { email: testEmail } });
    await prisma.$executeRawUnsafe(`DELETE FROM auth.users WHERE email = $1`, testEmail);
  });

  afterAll(async () => {
    // Cleanup test student
    await prisma.userRole.deleteMany({ where: { user: { email: testEmail } } });
    await prisma.user.deleteMany({ where: { email: testEmail } });
    await prisma.$executeRawUnsafe(`DELETE FROM auth.users WHERE email = $1`, testEmail);
    await prisma.$disconnect();
  });

  it("1. Creates student with full parental & contact details atomically via admin_create_user", async () => {
    const res: any = await prisma.$queryRawUnsafe(`
      SELECT public.admin_create_user(
        $1::text,
        'Trần Minh Anh',
        '0912345678',
        'female',
        'student',
        'SecurePassword123!',
        'Trần Văn Tuấn',
        '0987654321',
        '2005-10-15'::date
      ) as result;
    `, testEmail);

    expect(res).toBeDefined();
    expect(res.length).toBeGreaterThan(0);
    const profile = res[0].result;
    expect(profile.email).toBe(testEmail);
    expect(profile.full_name).toBe("Trần Minh Anh");
    expect(profile.phone).toBe("0912345678");
    expect(profile.parent_name).toBe("Trần Văn Tuấn");
    expect(profile.parent_phone).toBe("0987654321");
    expect(profile.date_of_birth).toContain("2005-10-15");

    createdUserId = profile.user_id || profile.id;
  });

  it("2. Verifies student and student role in Prisma models", async () => {
    const student = await prisma.user.findFirst({
      where: { email: testEmail },
      include: { roles: true },
    });

    expect(student).not.toBeNull();
    expect(student?.fullName).toBe("Trần Minh Anh");
    expect(student?.parentPhone).toBe("0987654321");
    expect(student?.parentName).toBe("Trần Văn Tuấn");
    expect(student?.roles.some((r) => r.role === "student")).toBe(true);
  });

  it("3. Verifies students-management query includes student with relations and 0 schema errors", async () => {
    const students = await prisma.user.findMany({
      where: {
        roles: {
          some: {
            role: "student",
          },
        },
      },
      select: {
        id: true,
        userId: true,
        email: true,
        fullName: true,
        avatarUrl: true,
        phone: true,
        parentName: true,
        parentPhone: true,
        gender: true,
        dateOfBirth: true,
        isActive: true,
        bio: true,
        createdAt: true,
        classesAsStudent: {
          select: {
            classId: true,
            status: true,
            completedAt: true,
            class: {
              select: {
                name: true,
              },
            },
          },
        },
        submissions: {
          select: {
            totalScore: true,
          },
        },
        attendanceRecords: {
          select: {
            status: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    expect(students.length).toBeGreaterThan(0);
    const targetStudent = students.find((s) => s.email === testEmail);
    expect(targetStudent).toBeDefined();
    expect(targetStudent?.fullName).toBe("Trần Minh Anh");
    expect(targetStudent?.parentPhone).toBe("0987654321");
    expect(targetStudent?.parentName).toBe("Trần Văn Tuấn");
  });

  it("4. Idempotency Check: Calling admin_create_user again updates existing user without duplicate key error", async () => {
    const res: any = await prisma.$queryRawUnsafe(`
      SELECT public.admin_create_user(
        $1::text,
        'Trần Minh Anh Updated',
        '0912345678',
        'female',
        'student',
        'SecurePassword123!',
        'Trần Văn Tuấn',
        '0987654321',
        '2005-10-15'::date
      ) as result;
    `, testEmail);

    const profile = res[0].result;
    expect(profile.full_name).toBe("Trần Minh Anh Updated");

    const count = await prisma.user.count({ where: { email: testEmail } });
    expect(count).toBe(1);
  });
});
