import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

async function testAdminCreate() {
  const testEmail = `test_student_${Date.now()}@test.com`;
  const fullName = "Học Viên Thử Nghiệm";
  const phone = "0912345678";
  const gender = "male";
  const role = "student";
  const password = "password123";

  try {
    const res = await prisma.$queryRawUnsafe(`
      SELECT public.admin_create_user(
        $1::text,
        $2::text,
        $3::text,
        $4::text,
        $5::text,
        $6::text
      ) as result;
    `, testEmail, fullName, phone, gender, role, password);

    console.log("admin_create_user result:", JSON.stringify(res, null, 2));

    // Also test updating parent info
    await prisma.user.update({
      where: { email: testEmail },
      data: {
        parentName: "Phụ Huynh Test",
        parentPhone: "0987654321",
      },
    });

    const verify = await prisma.user.findUnique({
      where: { email: testEmail },
      include: { roles: true },
    });

    console.log("Verified created student in DB:", JSON.stringify(verify, null, 2));

    // Cleanup test user
    await prisma.userRole.deleteMany({ where: { userId: verify.userId } });
    await prisma.user.delete({ where: { id: verify.id } });
    await prisma.$executeRawUnsafe(`DELETE FROM auth.users WHERE email = $1`, testEmail);
    console.log("Cleanup finished successfully!");

  } catch (err) {
    console.error("Test failed:", err);
  } finally {
    await prisma.$disconnect();
  }
}

testAdminCreate();
