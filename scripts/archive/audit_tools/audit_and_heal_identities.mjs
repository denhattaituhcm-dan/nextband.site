import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log("=== AUDITING USER IDENTITIES & ROLES ===");

  const users = await prisma.user.findMany({
    include: {
      roles: true,
      classesAsTeacher: { select: { id: true, name: true } },
      classesAsStudent: { select: { id: true, classId: true } },
    },
  });

  console.log(`Found ${users.length} profiles in database:`);
  for (const u of users) {
    console.log({
      id: u.id,
      userId: u.userId,
      email: u.email,
      fullName: u.fullName,
      roles: u.roles.map((r) => r.role),
      teachingClassesCount: u.classesAsTeacher.length,
      teachingClasses: u.classesAsTeacher.map((c) => c.name),
      enrolledClassesCount: u.classesAsStudent.length,
    });
  }

  // Check specific target: bestcanthocity@gmail.com
  const targetEmail = "bestcanthocity@gmail.com";
  const targetUsers = users.filter((u) => u.email?.toLowerCase() === targetEmail.toLowerCase());
  console.log(`\nTarget user(s) for ${targetEmail}:`, targetUsers.length);

  if (targetUsers.length > 0) {
    for (const tu of targetUsers) {
      console.log("Target user details:", {
        id: tu.id,
        userId: tu.userId,
        email: tu.email,
        fullName: tu.fullName,
        roles: tu.roles.map((r) => r.role),
        classesAsTeacher: tu.classesAsTeacher,
      });

      // Ensure target user has role 'teacher' in user_roles table
      const hasTeacherRole = tu.roles.some((r) => r.role === "teacher");
      if (!hasTeacherRole) {
        console.log(`Adding 'teacher' role to user ${tu.userId} (${tu.email})...`);
        await prisma.userRole.create({
          data: {
            userId: tu.userId,
            role: "teacher",
          },
        });
      }

      // Check all classes in DB that might have been assigned to an old ID
      // If there are classes named or meant for this teacher, update teacher_id
      const unassignedOrOldClasses = await prisma.class.findMany({
        where: {
          OR: [
            { teacherId: tu.id }, // in case teacher_id was set to profile.id instead of profile.userId
            { teacherId: null },
          ],
        },
      });

      for (const cls of unassignedOrOldClasses) {
        if (cls.teacherId === tu.id) {
          console.log(`Fixing class ${cls.name} teacherId from profile.id (${tu.id}) to profile.userId (${tu.userId})`);
          await prisma.class.update({
            where: { id: cls.id },
            data: { teacherId: tu.userId },
          });
        }
      }
    }
  }

  // Final verification
  console.log("\n=== POST-HEAL VERIFICATION ===");
  const refreshedUsers = await prisma.user.findMany({
    where: { email: targetEmail },
    include: {
      roles: true,
      classesAsTeacher: { select: { id: true, name: true } },
    },
  });

  for (const ru of refreshedUsers) {
    console.log({
      id: ru.id,
      userId: ru.userId,
      email: ru.email,
      fullName: ru.fullName,
      roles: ru.roles.map((r) => r.role),
      teachingClasses: ru.classesAsTeacher.map((c) => c.name),
    });
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
