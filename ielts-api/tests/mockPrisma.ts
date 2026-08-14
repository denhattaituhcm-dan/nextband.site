import { randomUUID } from "crypto";

export function createMockPrisma() {
  const users: any[] = [];
  const userRoles: any[] = [];
  const courses: any[] = [];
  const lessons: any[] = [];
  const classes: any[] = [];
  const classStudents: any[] = [];
  const classSessions: any[] = [];
  const classAttendances: any[] = [];
  const homeworks: any[] = [];
  const submissions: any[] = [];
  const invitations: any[] = [];

  const mock = {
    $connect: async () => {},
    $disconnect: async () => {},
    $transaction: async (arg: any) => {
      if (typeof arg === "function") {
        return arg(mock);
      }
      if (Array.isArray(arg)) {
        return Promise.all(arg);
      }
      return arg;
    },

    user: {
      create: async ({ data, include }: any) => {
        const u = {
          id: data.id || randomUUID(),
          email: data.email,
          password: data.password,
          fullName: data.fullName,
          avatarUrl: data.avatarUrl || null,
          phone: data.phone || null,
          gender: data.gender || null,
          isActive: true,
          createdAt: new Date(),
        };
        users.push(u);
        if (data.roles?.create) {
          const roleList = Array.isArray(data.roles.create) ? data.roles.create : [data.roles.create];
          for (const r of roleList) {
            userRoles.push({ userId: u.id, role: r.role });
          }
        }
        const roles = userRoles.filter((r) => r.userId === u.id);
        return { ...u, ...(include?.roles ? { roles } : {}) };
      },
      createMany: async ({ data }: any) => {
        users.push(...data);
        return { count: data.length };
      },
      findUnique: async ({ where, include }: any) => {
        const u = users.find((x) => x.id === where.id || x.email === where.email);
        if (!u) return null;
        const roles = userRoles.filter((r) => r.userId === u.id);
        return { ...u, ...(include?.roles ? { roles } : {}) };
      },
      findFirst: async ({ where, include }: any) => {
        const u = users.find((x) => {
          if (where.id && x.id === where.id) return true;
          if (where.email && x.email === where.email) return true;
          if (where.OR) {
            return where.OR.some((cond: any) => (cond.id && x.id === cond.id) || (cond.email && x.email === cond.email));
          }
          return false;
        });
        if (!u) return null;
        const roles = userRoles.filter((r) => r.userId === u.id);
        return { ...u, ...(include?.roles ? { roles } : {}) };
      },
      deleteMany: async () => {
        users.length = 0;
        return { count: 0 };
      },
    },

    userRole: {
      createMany: async ({ data }: any) => {
        userRoles.push(...data);
        return { count: data.length };
      },
      findMany: async ({ where }: any) => {
        return userRoles.filter((r) => !where?.userId || r.userId === where.userId);
      },
      deleteMany: async () => {
        userRoles.length = 0;
        return { count: 0 };
      },
    },

    course: {
      create: async ({ data }: any) => {
        courses.push(data);
        return data;
      },
      deleteMany: async () => {
        courses.length = 0;
        return { count: 0 };
      },
    },

    lesson: {
      createMany: async ({ data }: any) => {
        lessons.push(...data);
        return { count: data.length };
      },
      deleteMany: async () => {
        lessons.length = 0;
        return { count: 0 };
      },
    },

    class: {
      createMany: async ({ data }: any) => {
        classes.push(...data);
        return { count: data.length };
      },
      findUnique: async ({ where, include }: any) => {
        const cls = classes.find((c) => c.id === where.id);
        if (!cls) return null;
        const students = classStudents.filter((s) => s.classId === cls.id);
        return { ...cls, ...(include?.students ? { students } : {}) };
      },
      findFirst: async ({ where }: any) => {
        return classes.find((c) => {
          if (where.teacherId && c.teacherId !== where.teacherId) return false;
          if (where.id && c.id !== where.id) return false;
          return true;
        }) || null;
      },
      deleteMany: async () => {
        classes.length = 0;
        return { count: 0 };
      },
    },

    classStudent: {
      createMany: async ({ data }: any) => {
        classStudents.push(...data);
        return { count: data.length };
      },
      findFirst: async ({ where }: any) => {
        return classStudents.find((cs) => {
          if (where.classId && cs.classId !== where.classId) return false;
          if (where.studentId && cs.studentId !== where.studentId) return false;
          if (where.deletedAt === null && cs.deletedAt !== null && cs.deletedAt !== undefined) return false;
          return true;
        }) || null;
      },
      findMany: async ({ where, include }: any) => {
        return classStudents
          .filter((cs) => {
            if (where.classId && cs.classId !== where.classId) return false;
            if (where.studentId && cs.studentId !== where.studentId) return false;
            return true;
          })
          .map((cs) => {
            const student = users.find((u) => u.id === cs.studentId);
            return { ...cs, ...(include?.student ? { student } : {}) };
          });
      },
      count: async ({ where }: any) => {
        return classStudents.filter((cs) => {
          if (where.studentId && cs.studentId !== where.studentId) return false;
          if (where.class?.teacherId) {
            const cls = classes.find((c) => c.id === cs.classId);
            if (!cls || cls.teacherId !== where.class.teacherId) return false;
          }
          return true;
        }).length;
      },
      deleteMany: async () => {
        classStudents.length = 0;
        return { count: 0 };
      },
    },

    classSession: {
      createMany: async ({ data }: any) => {
        classSessions.push(...data);
        return { count: data.length };
      },
      findUnique: async ({ where, include }: any) => {
        const s = classSessions.find((x) => x.id === where.id);
        if (!s) return null;
        const lesson = lessons.find((l) => l.id === s.lessonId) || { title: "Lesson Title" };
        return { ...s, ...(include?.lesson ? { lesson } : {}) };
      },
      findMany: async ({ where, include }: any) => {
        return classSessions
          .filter((s) => !where.classId || s.classId === where.classId)
          .map((s) => {
            const lesson = lessons.find((l) => l.id === s.lessonId) || { title: "Lesson Title" };
            return { ...s, ...(include?.lesson ? { lesson } : {}) };
          });
      },
      update: async ({ where, data }: any) => {
        const s = classSessions.find((x) => x.id === where.id);
        if (s) Object.assign(s, data);
        return s;
      },
      deleteMany: async () => {
        classSessions.length = 0;
        return { count: 0 };
      },
    },

    classAttendance: {
      create: async ({ data }: any) => {
        classAttendances.push(data);
        return data;
      },
      upsert: async ({ where, update, create }: any) => {
        const idx = classAttendances.findIndex(
          (a) => a.sessionId === where.sessionId_studentId.sessionId && a.studentId === where.sessionId_studentId.studentId,
        );
        if (idx >= 0) {
          Object.assign(classAttendances[idx], update);
          return classAttendances[idx];
        }
        classAttendances.push(create);
        return create;
      },
      findUnique: async ({ where, include }: any) => {
        const a = classAttendances.find(
          (x) => x.sessionId === where.sessionId_studentId.sessionId && x.studentId === where.sessionId_studentId.studentId,
        );
        if (!a) return null;
        const student = users.find((u) => u.id === a.studentId);
        return { ...a, ...(include?.student ? { student } : {}) };
      },
      findMany: async ({ where }: any) => {
        return classAttendances.filter((a) => {
          if (where?.sessionId) {
            if (typeof where.sessionId === "string" && a.sessionId !== where.sessionId) return false;
            if (where.sessionId.in && !where.sessionId.in.includes(a.sessionId)) return false;
          }
          if (where?.studentId && a.studentId !== where.studentId) return false;
          return true;
        });
      },
      deleteMany: async () => {
        classAttendances.length = 0;
        return { count: 0 };
      },
    },

    homework: {
      create: async ({ data }: any) => {
        const classId = data.class?.connect?.id || data.classId;
        const createdBy = data.creator?.connect?.id || data.createdBy;
        const hw = {
          id: randomUUID(),
          classId,
          createdBy,
          title: data.title,
          description: data.description,
          deadline: data.deadline,
          status: data.status || "PUBLISHED",
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        homeworks.push(hw);
        return hw;
      },
      createMany: async ({ data }: any) => {
        homeworks.push(...data);
        return { count: data.length };
      },
      findUnique: async ({ where, include }: any) => {
        const hw = homeworks.find((h) => h.id === where.id);
        if (!hw) return null;
        const cls = classes.find((c) => c.id === hw.classId);
        return { ...hw, ...(include?.class ? { class: cls } : {}) };
      },
      findMany: async ({ where }: any) => {
        return homeworks.filter((h) => !where?.classId || h.classId === where.classId);
      },
      deleteMany: async () => {
        homeworks.length = 0;
        return { count: 0 };
      },
    },

    submission: {
      create: async ({ data }: any) => {
        submissions.push(data);
        return data;
      },
      upsert: async ({ where, update, create }: any) => {
        const idx = submissions.findIndex(
          (s) => s.homeworkId === where.homeworkId_studentId.homeworkId && s.studentId === where.homeworkId_studentId.studentId,
        );
        if (idx >= 0) {
          Object.assign(submissions[idx], update);
          return submissions[idx];
        }
        submissions.push(create);
        return create;
      },
      findUnique: async ({ where }: any) => {
        return submissions.find(
          (s) => s.homeworkId === where.homeworkId_studentId.homeworkId && s.studentId === where.homeworkId_studentId.studentId,
        ) || null;
      },
      findMany: async ({ where }: any) => {
        return submissions.filter((s) => {
          if (where.studentId?.in && !where.studentId.in.includes(s.studentId)) return false;
          if (where.homeworkId?.in && !where.homeworkId.in.includes(s.homeworkId)) return false;
          return true;
        });
      },
      deleteMany: async () => {
        submissions.length = 0;
        return { count: 0 };
      },
    },

    invitation: {
      create: async ({ data }: any) => {
        const classId = data.class?.connect?.id;
        const createdBy = data.creator?.connect?.id;
        const inv = {
          id: `inv-${Date.now()}`,
          classId,
          createdBy,
          inviteCode: data.inviteCode,
          inviteToken: data.inviteToken,
          expiresAt: data.expiresAt,
          status: data.status || "ACTIVE",
          createdAt: new Date(),
        };
        invitations.push(inv);
        return inv;
      },
      findFirst: async ({ where }: any) => {
        return invitations.find((i) => !where.inviteCode || i.inviteCode === where.inviteCode) || null;
      },
      deleteMany: async () => {
        invitations.length = 0;
        return { count: 0 };
      },
    },

    exam: {
      findMany: async () => [],
      findUnique: async () => null,
      deleteMany: async () => ({ count: 0 }),
    },

    examSubmission: {
      findMany: async () => [],
      findUnique: async () => null,
      deleteMany: async () => ({ count: 0 }),
    },
  };

  return mock;
}
