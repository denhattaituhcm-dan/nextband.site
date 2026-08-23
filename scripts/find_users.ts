import { PrismaClient } from "@prisma/client";

async function findExistingUsers() {
  const prisma = new PrismaClient();
  try {
    const users = await prisma.user.findMany({ take: 5 });
    console.log("Existing users in DB:", users);
  } finally {
    await prisma.$disconnect();
  }
}

findExistingUsers();
