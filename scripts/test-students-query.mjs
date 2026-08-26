import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

async function testQuery() {
  try {
    const where = {
      roles: {
        some: { role: "student" },
        none: { role: "admin" },
      },
    };

    const count = await prisma.user.count({ where });
    console.log("Count of students:", count);

    const students = await prisma.user.findMany({
      where,
      take: 10,
      orderBy: { createdAt: "desc" },
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
          where: { deletedAt: null },
          include: {
            class: {
              select: {
                id: true,
                name: true,
                courseId: true,
                course: { select: { id: true, title: true } },
                teacher: { select: { id: true, fullName: true, email: true } },
              },
            },
          },
        },
        submissions: {
          select: {
            id: true,
            examId: true,
            status: true,
            totalScore: true,
            submittedAt: true,
            createdAt: true,
            exam: { select: { id: true, title: true, courseId: true } },
          },
          orderBy: { createdAt: "desc" },
        },
        attendanceRecords: {
          select: {
            id: true,
            status: true,
            sessionDate: true,
            createdAt: true,
            class: { select: { id: true, name: true, teacher: { select: { fullName: true } } } },
          },
          orderBy: { sessionDate: "desc" },
        },
      },
    });

    console.log("Students found:", students.length);
    console.log("First student:", JSON.stringify(students[0], null, 2));

  } catch (err) {
    console.error("Test query error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

testQuery();
