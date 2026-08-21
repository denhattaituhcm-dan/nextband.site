import { PrismaClient } from "@prisma/client";
import { buildApp } from "../server/app.js";

async function main() {
  console.log("=== 1. CHECKING DATABASE CONNECTION & ADMIN USER ===");
  const prisma = new PrismaClient();
  try {
    const adminUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: "admin@ielts.com" },
          { email: { contains: "admin", mode: "insensitive" } },
        ],
      },
      include: {
        roles: true,
      },
    });
    console.log("Admin user in DB:", JSON.stringify(adminUser, null, 2));

    const allRoles = await prisma.userRole.findMany();
    console.log("Total user_roles in DB:", allRoles.length);

    console.log("\n=== 2. CHECKING COURSES DATA INTEGRITY ===");
    const coursesCount = await prisma.course.count();
    console.log("Total courses in DB:", coursesCount);

    const allCourses = await prisma.course.findMany({
      include: {
        creator: { select: { id: true, fullName: true, email: true } },
        _count: {
          select: { exams: true, enrollments: true, lessons: true, classes: true },
        },
      },
    });
    console.log(`Retrieved ${allCourses.length} courses:`);
    for (const c of allCourses) {
      console.log(`- ID: ${c.id}, Title: "${c.title}", Level: ${c.level}, isPublished: ${c.isPublished}, isActive: ${c.isActive}, creator: ${c.creator?.email || "NONE"}, exams: ${c._count.exams}, lessons: ${c._count.lessons}, classes: ${c._count.classes}`);
    }

    console.log("\n=== 3. TESTING FASTIFY APP INJECT ENDPOINTS FOR ADMIN ===");
    const app = await buildApp();
    await app.ready();

    // Create a mock JWT / Auth header for admin
    const adminId = adminUser?.userId || adminUser?.id || "admin-mock-id";
    const token = app.jwt ? app.jwt.sign({
      id: adminId,
      email: "admin@ielts.com",
      roles: ["admin"],
    }) : "";

    const endpointsToTest = [
      { method: "GET", url: "/api/v1/courses" },
      { method: "GET", url: "/api/v1/courses?sortBy=newest&limit=10&page=1" },
      { method: "GET", url: "/api/v1/courses?sortBy=name&limit=10&page=1" },
      { method: "GET", url: "/api/v1/courses?sortBy=level&limit=10&page=1" },
      { method: "GET", url: "/api/v1/exams" },
      { method: "GET", url: "/api/v1/exams?sortBy=newest" },
      { method: "GET", url: "/api/v1/classes" },
      { method: "GET", url: "/api/v1/users" },
      { method: "GET", url: "/api/v1/users?sortBy=newest" },
      { method: "GET", url: "/api/v1/submissions" },
      { method: "GET", url: "/api/v1/leads" },
      { method: "GET", url: "/api/v1/site-settings" },
      { method: "GET", url: "/api/v1/logs" },
    ];

    for (const ep of endpointsToTest) {
      const res = await app.inject({
        method: ep.method,
        url: ep.url,
        headers: token ? { authorization: `Bearer ${token}` } : {},
      });
      const isOk = res.statusCode >= 200 && res.statusCode < 300;
      console.log(`${isOk ? "✅" : "❌"} [${res.statusCode}] ${ep.method} ${ep.url}`);
      if (!isOk) {
        console.log("   Response payload:", res.body);
      }
    }

    if (allCourses.length > 0) {
      console.log("\n=== 4. TESTING COURSE DETAIL ENDPOINTS ===");
      for (const c of allCourses) {
        const res = await app.inject({
          method: "GET",
          url: `/api/v1/courses/${c.id}`,
          headers: token ? { authorization: `Bearer ${token}` } : {},
        });
        const isOk = res.statusCode >= 200 && res.statusCode < 300;
        console.log(`${isOk ? "✅" : "❌"} [${res.statusCode}] GET /api/v1/courses/${c.id} ("${c.title}")`);
        if (!isOk) {
          console.log("   Response payload:", res.body);
        }
      }
    }

    await app.close();
  } catch (err) {
    console.error("FATAL ERROR IN DIAGNOSTIC:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
