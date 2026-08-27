import { PrismaClient } from "@prisma/client";

/**
 * Lấy danh sách studentId thuộc các lớp mà teacher phụ trách.
 * Dùng để filter dữ liệu cho teacher chỉ thấy học sinh lớp mình.
 */
export async function getTeacherStudentIds(
  prisma: PrismaClient,
  teacherId: string,
): Promise<string[]> {
  const classStudents = await prisma.classStudent.findMany({
    where: {
      class: {
        teacherId,
      },
      deletedAt: null,
    },
    select: {
      studentId: true,
    },
  });

  const rawIds = [...new Set(classStudents.map((cs) => cs.studentId))];
  if (rawIds.length === 0) return [];

  const users = await prisma.user.findMany({
    where: {
      OR: [{ id: { in: rawIds } }, { userId: { in: rawIds } }],
    },
    select: { id: true, userId: true },
  });

  const allIds = new Set<string>(rawIds);
  users.forEach((u) => {
    if (u.id) allIds.add(u.id);
    if (u.userId) allIds.add(u.userId);
  });

  return Array.from(allIds);
}

/**
 * Lấy danh sách studentId thuộc 1 lớp cụ thể (bao gồm cả id và userId).
 */
export async function getClassStudentIds(
  prisma: PrismaClient,
  classId: string,
): Promise<string[]> {
  const classStudents = await prisma.classStudent.findMany({
    where: { classId, deletedAt: null },
    select: { studentId: true },
  });

  const rawIds = [...new Set(classStudents.map((cs) => cs.studentId))];
  if (rawIds.length === 0) return [];

  const users = await prisma.user.findMany({
    where: {
      OR: [{ id: { in: rawIds } }, { userId: { in: rawIds } }],
    },
    select: { id: true, userId: true },
  });

  const allIds = new Set<string>(rawIds);
  users.forEach((u) => {
    if (u.id) allIds.add(u.id);
    if (u.userId) allIds.add(u.userId);
  });

  return Array.from(allIds);
}

/**
 * Kiểm tra xem teacher có phụ trách lớp có chứa student này không.
 */
export async function isStudentInTeacherClasses(
  prisma: PrismaClient,
  teacherId: string,
  studentId: string,
): Promise<boolean> {
  const count = await prisma.classStudent.count({
    where: {
      studentId,
      class: {
        teacherId,
      },
    },
  });

  return count > 0;
}

/**
 * Kiểm tra teacher có phải chủ lớp không.
 */
export async function isTeacherOfClass(
  prisma: PrismaClient,
  teacherId: string,
  classId: string,
): Promise<boolean> {
  const cls = await prisma.class.findFirst({
    where: {
      id: classId,
      teacherId,
    },
  });

  return !!cls;
}
