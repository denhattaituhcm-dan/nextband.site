import { PrismaClient } from "@prisma/client";

const p = new PrismaClient();
try {
  const r = await p.$queryRawUnsafe("SELECT 1 as test");
  console.log("DB CONNECTION OK:", r);
} catch (e) {
  console.error("DB CONNECTION FAILED:", e);
} finally {
  await p.$disconnect();
}
