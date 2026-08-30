import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function checkClassStudent() {
  const users = await prisma.user.findMany({ select: { id: true, userId: true, email: true, roles: { select: { role: true } } } });
  console.log("Users in DB:");
  users.forEach(u => console.log(`[${u.id}] userId: "${u.userId}", email: "${u.email}", roles: ${JSON.stringify(u.roles)}`));
}

checkClassStudent().finally(() => prisma.$disconnect());
