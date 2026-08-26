import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

async function testFixColumns() {
  try {
    console.log("Adding missing columns to DB...");
    await prisma.$executeRawUnsafe(`ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS joined_at timestamptz DEFAULT now()`);
    await prisma.$executeRawUnsafe(`ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS resigned_at timestamptz`);
    await prisma.$executeRawUnsafe(`ALTER TABLE public.class_students ADD COLUMN IF NOT EXISTS completed_at timestamptz`);
    await prisma.$executeRawUnsafe(`ALTER TABLE public.contact_leads ADD COLUMN IF NOT EXISTS converted_at timestamptz`);
    console.log("Columns added successfully!");

    // Now test finding users
    const users = await prisma.user.findMany({ take: 3 });
    console.log("prisma.user.findMany succeeded! Count:", users.length);

    // Now test classStudent
    const cs = await prisma.classStudent.findMany({ take: 3 });
    console.log("prisma.classStudent.findMany succeeded! Count:", cs.length);

    // Now test the exact students-management query
    const where = {
      roles: {
        some: { role: "student" },
        none: { role: "admin" },
      },
    };
    const students = await prisma.user.findMany({
      where,
      take: 10,
      select: {
        id: true,
        userId: true,
        email: true,
        fullName: true,
        classesAsStudent: {
          where: { deletedAt: null },
          include: {
            class: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
    console.log("students-management query succeeded! Total students:", students.length);

  } catch (err) {
    console.error("Error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

testFixColumns();
