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
  const classExamAssignments: any[] = [];
  const invitations: any[] = [];
  const enrollments: any[] = [];
  const exams: any[] = [];
  const examSubmissions: any[] = [];
  const answers: any[] = [];
  const idempotencyRecords: any[] = [];
  const auditOutboxEvents: any[] = [];
  const notifications: any[] = [];
  const siteSettingsList: any[] = [];
  const answersEvidence: any[] = [];

  const mock = {
    $connect: async () => {},
    $disconnect: async () => {},
    $transaction: async (arg: any) => {
      if (typeof arg === "function") {
        return await arg(mock);
      }
      if (Array.isArray(arg)) {
        const results = [];
        for (const promise of arg) {
          results.push(await promise);
        }
        return results;
      }
      return arg;
    },
    $queryRawUnsafe: async (sql: string, ...args: any[]) => {
      const lowerSql = sql.toLowerCase();
      if (lowerSql.includes("from classes") && lowerSql.includes("where id =")) {
        const id = args[0];
        return classes.filter((c) => c.id === id).map((c) => ({ id: c.id, name: c.name, teacherId: c.teacherId }));
      }
      if (lowerSql.includes("from class_sessions") && lowerSql.includes("where id =")) {
        const id = args[0];
        return classSessions
          .filter((s) => s.id === id)
          .map((s) => ({
            id: s.id,
            classId: s.classId,
            sessionNumber: s.sessionNumber,
            title: s.title,
            sessionDate: s.sessionDate,
            status: s.status,
            completedAt: s.completedAt,
          }));
      }
      if (lowerSql.includes("from class_students")) {
        const classId = args[0];
        const studentId = args[1];
        return classStudents
          .filter((cs) => (!classId || cs.classId === classId) && (!studentId || cs.studentId === studentId) && !cs.deletedAt)
          .map((cs) => ({
            id: cs.id,
            studentId: cs.studentId,
            fullName: users.find((u) => u.id === cs.studentId)?.fullName || "Student",
            email: users.find((u) => u.id === cs.studentId)?.email || "student@test.com",
            avatarUrl: null,
          }));
      }
      if (lowerSql.includes("from class_attendance")) {
        const sessionId = args[0];
        const studentId = args[1];
        return classAttendances
          .filter((a) => (!sessionId || a.sessionId === sessionId) && (!studentId || a.studentId === studentId))
          .map((a) => ({
            studentId: a.studentId,
            status: a.status,
            note: a.note || null,
          }));
      }
      if (lowerSql.includes("from users") && lowerSql.includes("where id =")) {
        const id = args[0];
        return users.filter((u) => u.id === id).map((u) => ({ id: u.id, fullName: u.fullName, email: u.email, avatarUrl: u.avatarUrl }));
      }
      return [];
    },
    $executeRawUnsafe: async (sql: string, ...args: any[]) => {
      const lowerSql = sql.toLowerCase();
      if (lowerSql.includes("update class_sessions")) {
        const id = args[args.length - 1];
        const s = classSessions.find((x) => x.id === id);
        if (s) {
          s.status = "COMPLETED";
          s.completedAt = new Date();
        }
        return 1;
      }
      if (lowerSql.includes("into class_attendance")) {
        const sessionId = args[2];
        const studentId = args[3];
        const status = args[6];
        const note = args[7];
        const existing = classAttendances.find((a) => a.sessionId === sessionId && a.studentId === studentId);
        if (existing) {
          existing.status = status;
          existing.note = note;
        } else {
          classAttendances.push({
            id: args[0] || `att-${Date.now()}-${Math.random()}`,
            classId: args[1],
            sessionId,
            studentId,
            teacherId: args[4],
            sessionDate: args[5],
            status,
            note,
            createdAt: new Date(),
          });
        }
        return 1;
      }
      return 1;
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
          if (where.userId && (x.userId === where.userId || x.id === where.userId)) return true;
          if (where.email && x.email === where.email) return true;
          if (where.OR) {
            return where.OR.some((cond: any) => (cond.id && x.id === cond.id) || (cond.userId && (x.userId === cond.userId || x.id === cond.userId)) || (cond.email && x.email === cond.email));
          }
          return false;
        });
        if (!u) return null;
        const roles = userRoles.filter((r) => r.userId === u.id);
        return { ...u, userId: u.userId || u.id, ...(include?.roles ? { roles } : {}) };
      },
      findMany: async ({ where, include }: any = {}) => {
        let list = [...users];
        if (where) {
          if (where.OR) {
            list = list.filter((u) =>
              where.OR.some((cond: any) => {
                if (cond.id?.in && cond.id.in.includes(u.id)) return true;
                if (cond.userId?.in && cond.userId.in.includes(u.userId || u.id)) return true;
                if (cond.id && u.id === cond.id) return true;
                if (cond.userId && (u.userId === cond.userId || u.id === cond.userId)) return true;
                return false;
              })
            );
          }
        }
        return list.map((u) => ({ ...u, userId: u.userId || u.id }));
      },
      deleteMany: async () => {
        users.length = 0;
        return { count: 0 };
      },
    },

    userRole: {
      findFirst: async ({ where }: any) => {
        return (
          userRoles.find(
            (r) =>
              (!where?.role || r.role === where.role) &&
              (!where?.userId || r.userId === where.userId)
          ) || null
        );
      },
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
      create: async ({ data }: any) => {
        const cls = { id: data.id || randomUUID(), ...data, createdAt: new Date() };
        classes.push(cls);
        return cls;
      },
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
      findMany: async ({ where }: any = {}) => {
        return classes.filter((c) => {
          if (where?.teacherId && c.teacherId !== where.teacherId) return false;
          if (where?.id) {
            if (typeof where.id === "object" && Array.isArray(where.id.in)) {
              if (!where.id.in.includes(c.id)) return false;
            } else if (c.id !== where.id) {
              return false;
            }
          }
          if (where?.courseId && c.courseId !== where.courseId) return false;
          return true;
        });
      },
      update: async ({ where, data }: any) => {
        const cls = classes.find((c) => c.id === where.id);
        if (cls) {
          Object.assign(cls, data);
          return cls;
        }
        return null;
      },
      delete: async ({ where }: any) => {
        const idx = classes.findIndex((c) => c.id === where.id);
        if (idx !== -1) {
          const removed = classes.splice(idx, 1)[0];
          return removed;
        }
        return null;
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
      findFirst: async ({ where, include }: any = {}) => {
        const cs = classStudents.find((item) => {
          if (where?.classId && item.classId !== where.classId) return false;
          if (where?.studentId && item.studentId !== where.studentId) return false;
          if (where?.deletedAt === null && item.deletedAt !== null && item.deletedAt !== undefined) return false;
          if (where?.class?.courseId) {
            const cls = classes.find((c) => c.id === item.classId);
            if (!cls || cls.courseId !== where.class.courseId) return false;
          }
          return true;
        });
        if (cs && include?.class) {
          return {
            ...cs,
            class: classes.find((c) => c.id === cs.classId) || null,
          };
        }
        return cs || null;
      },
      findMany: async ({ where, include }: any = {}) => {
        return classStudents
          .filter((cs) => {
            if (where?.classId && cs.classId !== where.classId) return false;
            if (where?.studentId) {
              if (typeof where.studentId === "string" && cs.studentId !== where.studentId) return false;
              if (where.studentId.in && !where.studentId.in.includes(cs.studentId)) return false;
            }
            if (where?.deletedAt === null && cs.deletedAt !== null && cs.deletedAt !== undefined) return false;
            if (where?.class?.teacherId) {
              const cls = classes.find((c) => c.id === cs.classId);
              if (!cls || cls.teacherId !== where.class.teacherId) return false;
            }
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
        const normalized = data.map((d: any) => ({
          ...d,
          plannedDate: d.plannedDate || d.sessionDate || new Date(),
        }));
        classSessions.push(...normalized);
        return { count: data.length };
      },
      findUnique: async ({ where, include }: any) => {
        const s = classSessions.find((x) => x.id === where?.id);
        if (!s) return null;
        const normalized = {
          ...s,
          plannedDate: s.plannedDate || s.sessionDate || new Date(),
        };
        const lesson = lessons.find((l) => l.id === s.lessonId) || { title: "Lesson Title" };
        return { ...normalized, ...(include?.lesson ? { lesson } : {}) };
      },
      findMany: async ({ where, include }: any) => {
        return classSessions
          .filter((s) => !where?.classId || s.classId === where.classId)
          .map((s) => {
            const normalized = {
              ...s,
              plannedDate: s.plannedDate || s.sessionDate || new Date(),
            };
            const lesson = lessons.find((l) => l.id === s.lessonId) || { title: "Lesson Title" };
            return { ...normalized, ...(include?.lesson ? { lesson } : {}) };
          });
      },
      update: async ({ where, data }: any) => {
        const s = classSessions.find((x) => x.id === where?.id);
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
        const idx = classAttendances.findIndex((a) => {
          if (where?.classId_studentId_sessionDate) {
            const target = where.classId_studentId_sessionDate;
            const aDate = a.sessionDate ? new Date(a.sessionDate).toISOString().slice(0, 10) : "";
            const tDate = target.sessionDate ? new Date(target.sessionDate).toISOString().slice(0, 10) : "";
            return a.classId === target.classId && a.studentId === target.studentId && aDate === tDate;
          }
          if (where?.sessionId_studentId) {
            return a.sessionId === where.sessionId_studentId.sessionId && a.studentId === where.sessionId_studentId.studentId;
          }
          return a.id === where?.id;
        });
        if (idx >= 0) {
          Object.assign(classAttendances[idx], update);
          return classAttendances[idx];
        }
        classAttendances.push(create);
        return create;
      },
      findUnique: async ({ where, include }: any) => {
        const a = classAttendances.find((x) => {
          if (where?.id && x.id === where.id) return true;
          if (where?.classId_studentId_sessionDate) {
            const target = where.classId_studentId_sessionDate;
            const aDate = x.sessionDate ? new Date(x.sessionDate).toISOString().slice(0, 10) : "";
            const tDate = target.sessionDate ? new Date(target.sessionDate).toISOString().slice(0, 10) : "";
            return x.classId === target.classId && x.studentId === target.studentId && aDate === tDate;
          }
          if (where?.sessionId_studentId) {
            return x.sessionId === where.sessionId_studentId.sessionId && x.studentId === where.sessionId_studentId.studentId;
          }
          return false;
        });
        if (!a) return null;
        const student = users.find((u) => u.id === a.studentId);
        return { ...a, ...(include?.student ? { student } : {}) };
      },
      findMany: async ({ where }: any) => {
        return classAttendances.filter((a) => {
          if (where?.classId && a.classId !== where.classId) return false;
          if (where?.sessionDate) {
            const aDate = a.sessionDate ? new Date(a.sessionDate).toISOString().slice(0, 10) : "";
            const wDate = new Date(where.sessionDate).toISOString().slice(0, 10);
            if (aDate !== wDate) return false;
          }
          if (where?.sessionId) {
            if (typeof where.sessionId === "string" && a.sessionId !== where.sessionId) return false;
            if (where.sessionId.in && !where.sessionId.in.includes(a.sessionId)) return false;
          }
          if (where?.studentId) {
            if (typeof where.studentId === "string" && a.studentId !== where.studentId) return false;
            if (where.studentId.in && !where.studentId.in.includes(a.studentId)) return false;
          }
          return true;
        });
      },
      deleteMany: async () => {
        classAttendances.length = 0;
        return { count: 0 };
      },
    },

    classExamAssignment: {
      create: async ({ data }: any) => {
        const item = {
          id: randomUUID(),
          classId: data.classId || data.class?.connect?.id,
          examId: data.examId || data.exam?.connect?.id,
          createdBy: data.createdBy || data.creator?.connect?.userId,
          deadline: data.deadline,
          status: data.status || "PUBLISHED",
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        classExamAssignments.push(item);
        return item;
      },
      upsert: async ({ where, update, create }: any) => {
        const classId = where.classId_examId?.classId || where.classId;
        const examId = where.classId_examId?.examId || where.examId;
        const idx = classExamAssignments.findIndex(
          (a) => a.classId === classId && a.examId === examId
        );
        if (idx >= 0) {
          Object.assign(classExamAssignments[idx], update, { updatedAt: new Date() });
          return classExamAssignments[idx];
        }
        const item = {
          id: randomUUID(),
          classId,
          examId,
          ...create,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        classExamAssignments.push(item);
        return item;
      },
      findFirst: async ({ where }: any) => {
        return classExamAssignments.find(
          (a) => (!where.classId || a.classId === where.classId) && (!where.examId || a.examId === where.examId)
        ) || null;
      },
      findMany: async ({ where }: any) => {
        return classExamAssignments.filter((a) => {
          if (where?.classId && a.classId !== where.classId) return false;
          if (where?.examId && a.examId !== where.examId) return false;
          if (where?.examId?.in && !where.examId.in.includes(a.examId)) return false;
          return true;
        });
      },
      deleteMany: async () => {
        classExamAssignments.length = 0;
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

    enrollment: {
      findUnique: async ({ where }: any) => {
        if (where?.courseId_studentId) {
          return enrollments.find(
            (e) => e.courseId === where.courseId_studentId.courseId && e.studentId === where.courseId_studentId.studentId,
          ) || null;
        }
        return enrollments.find((e) => e.id === where?.id) || null;
      },
      findFirst: async ({ where }: any) => {
        return enrollments.find(
          (e) => (!where?.courseId || e.courseId === where.courseId) && (!where?.studentId || e.studentId === where.studentId),
        ) || null;
      },
      create: async ({ data }: any) => {
        const en = { id: `en-${Date.now()}`, ...data, createdAt: new Date() };
        enrollments.push(en);
        return en;
      },
      update: async ({ where, data }: any) => {
        const en = enrollments.find((e) => e.id === where?.id);
        if (en) Object.assign(en, data);
        return en || data;
      },
      count: async () => enrollments.length,
      deleteMany: async () => {
        enrollments.length = 0;
        return { count: 0 };
      },
    },

    exam: {
      create: async ({ data }: any) => {
        exams.push(data);
        return data;
      },
      findMany: async () => exams,
      findUnique: async ({ where, include }: any) => {
        const e = exams.find((x) => x.id === where?.id);
        if (!e) return null;
        const course = courses.find((c) => c.id === e.courseId);
        return {
          ...e,
          course: include?.course ? course : undefined,
        };
      },
      update: async ({ where, data }: any) => {
        const e = exams.find((x) => x.id === where?.id);
        if (e) Object.assign(e, data);
        return e;
      },
      updateMany: async ({ where, data }: any) => {
        let count = 0;
        for (const e of exams) {
          if (!where?.id || e.id === where.id) {
            Object.assign(e, data);
            count++;
          }
        }
        return { count };
      },
      count: async () => exams.length,
      deleteMany: async () => {
        exams.length = 0;
        return { count: 0 };
      },
    },

    examSubmission: {
      create: async ({ data }: any) => {
        const sub = {
          id: `sub-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          ...data,
          totalScore: null,
          correctAnswers: null,
          totalQuestions: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        examSubmissions.push(sub);
        return sub;
      },
      findUnique: async ({ where, include }: any) => {
        const sub = examSubmissions.find((s) => s.id === where?.id);
        if (!sub) return null;
        const exam = exams.find((e) => e.id === sub.examId);
        const subAnswers = answers
          .filter((a) => a.submissionId === sub.id)
          .map((a) => {
            const allQ = exam?.sections?.flatMap((s: any) => s.questionGroups?.flatMap((g: any) => g.questions || []) || []) || [];
            const q = allQ.find((q: any) => q.id === a.questionId);
            return { ...a, question: q };
          });
        return {
          ...sub,
          exam,
          answers: include?.answers ? subAnswers : undefined,
        };
      },
      findFirst: async ({ where, orderBy, include }: any) => {
        let list = [...examSubmissions];
        if (orderBy?.createdAt === "desc") {
          list.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
        }
        const sub = list.find((s) => {
          if (where?.examId && s.examId !== where.examId) return false;
          if (where?.studentId && s.studentId !== where.studentId) return false;
          if (where?.status && s.status !== where.status) return false;
          return true;
        });
        if (!sub) return null;
        const exam = exams.find((e) => e.id === sub.examId);
        const subAnswers = answers
          .filter((a) => a.submissionId === sub.id)
          .map((a) => {
            const allQ = exam?.sections?.flatMap((s: any) => s.questionGroups?.flatMap((g: any) => g.questions || []) || []) || [];
            const q = allQ.find((q: any) => q.id === a.questionId);
            return { ...a, question: q };
          });
        return {
          ...sub,
          exam,
          answers: include?.answers ? subAnswers : undefined,
        };
      },
      findMany: async ({ where, select, include }: any = {}) => {
        let list = [...examSubmissions];
        if (where?.examId) list = list.filter((s) => s.examId === where.examId);
        if (where?.studentId?.in) list = list.filter((s) => where.studentId.in.includes(s.studentId));
        else if (where?.studentId && typeof where.studentId === "string") list = list.filter((s) => s.studentId === where.studentId);
        if (where?.status) list = list.filter((s) => s.status === where.status);

        return list.map((sub) => {
          const subAnswers = answers.filter((a) => a.submissionId === sub.id);
          const student = users.find((u) => u.id === sub.studentId);
          const exam = exams.find((e) => e.id === sub.examId);
          return {
            ...sub,
            student: select?.student ? student : undefined,
            exam: select?.exam ? exam : undefined,
            answers: (select?.answers || include?.answers) ? subAnswers : undefined,
          };
        });
      },
      count: async ({ where }: any) => {
        return examSubmissions.filter((s) => {
          if (where?.examId && s.examId !== where.examId) return false;
          if (where?.studentId && s.studentId !== where.studentId) return false;
          if (where?.status && s.status !== where.status) return false;
          return true;
        }).length;
      },
      update: async ({ where, data, include }: any) => {
        const sub = examSubmissions.find((s) => s.id === where?.id);
        if (sub) {
          Object.assign(sub, data, { updatedAt: new Date() });
          const subAnswers = answers.filter((a) => a.submissionId === sub.id);
          return {
            ...sub,
            answers: include?.answers ? subAnswers : undefined,
          };
        }
        return null;
      },
      groupBy: async () => [],
      deleteMany: async () => {
        examSubmissions.length = 0;
        return { count: 0 };
      },
    },

    answer: {
      findFirst: async ({ where }: any) => {
        return answers.find(
          (a) =>
            (!where?.submissionId || a.submissionId === where.submissionId) &&
            (!where?.questionId || a.questionId === where.questionId)
        ) || null;
      },
      create: async ({ data }: any) => {
        const newAns = {
          id: data.id || `ans-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          ...data,
          createdAt: new Date(),
        };
        answers.push(newAns);
        return newAns;
      },
      findMany: async ({ where }: any) => {
        return answers.filter((a) => a.submissionId === where?.submissionId);
      },
      count: async ({ where }: any) => {
        return answers.filter((a) => a.submissionId === where?.submissionId).length;
      },
      upsert: async ({ where, update, create }: any) => {
        const idx = answers.findIndex(
          (a) =>
            a.submissionId === where.submissionId_questionId.submissionId &&
            a.questionId === where.submissionId_questionId.questionId,
        );
        if (idx >= 0) {
          Object.assign(answers[idx], update, { updatedAt: new Date() });
          return answers[idx];
        }
        const newAns = {
          id: `ans-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          ...create,
          score: null,
          createdAt: new Date(),
        };
        answers.push(newAns);
        return newAns;
      },
      update: async ({ where, data }: any) => {
        const a = answers.find((x) => x.id === where?.id);
        if (a) Object.assign(a, data);
        return a;
      },
      updateMany: async ({ where, data }: any) => {
        let count = 0;
        answers.forEach((a) => {
          if ((!where?.id || a.id === where.id) &&
              (!where?.submissionId || a.submissionId === where.submissionId) &&
              (!where?.questionId || a.questionId === where.questionId)) {
            Object.assign(a, data);
            count++;
          }
        });
        return { count };
      },
      deleteMany: async () => {
        answers.length = 0;
        return { count: 0 };
      },
    },

    idempotencyRecord: {
      findUnique: async ({ where }: any) => {
        return (
          idempotencyRecords.find((r) => {
            if (where?.key && r.key !== where.key) return false;
            if (
              where?.submissionId_key &&
              (r.submissionId !== where.submissionId_key.submissionId ||
                r.key !== where.submissionId_key.key)
            ) {
              return false;
            }
            return true;
          }) || null
        );
      },
      findFirst: async ({ where }: any) => {
        return (
          idempotencyRecords.find((r) => {
            if (where?.key && r.key !== where.key) return false;
            if (where?.submissionId && r.submissionId !== where.submissionId) return false;
            return true;
          }) || null
        );
      },
      create: async ({ data }: any) => {
        const rec = {
          id: `idem-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          ...data,
          createdAt: new Date(),
        };
        idempotencyRecords.push(rec);
        return rec;
      },
      upsert: async ({ where, update, create }: any) => {
        const idx = idempotencyRecords.findIndex(
          (r) =>
            r.key === (where.key || where.submissionId_key?.key) &&
            (!where.submissionId_key || r.submissionId === where.submissionId_key.submissionId),
        );
        if (idx >= 0) {
          Object.assign(idempotencyRecords[idx], update);
          return idempotencyRecords[idx];
        }
        const rec = {
          id: `idem-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          ...create,
          createdAt: new Date(),
        };
        idempotencyRecords.push(rec);
        return rec;
      },
    },

    auditOutbox: {
      create: async ({ data }: any) => {
        const item = {
          id: data.id || `aud-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          ...data,
          createdAt: data.createdAt || new Date(),
        };
        auditOutboxEvents.push(item);
        return item;
      },
      findMany: async () => auditOutboxEvents,
    },

    notification: {
      create: async ({ data }: any) => {
        // Check unique constraint: entityType, entityId, userId, type
        if (data.entityType && data.entityId && data.userId && data.type) {
          const existing = notifications.find(
            (n) =>
              n.entityType === data.entityType &&
              n.entityId === data.entityId &&
              n.userId === data.userId &&
              n.type === data.type
          );
          if (existing) {
            const err: any = new Error('Unique constraint failed on the fields: (`entity_type`,`entity_id`,`user_id`,`type`)');
            err.code = 'P2002';
            err.meta = { target: ['entity_type', 'entity_id', 'user_id', 'type'] };
            throw err;
          }
        }
        const item = {
          id: data.id || `notif-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          ...data,
          link: data.link || null,
          entityType: data.entityType || null,
          entityId: data.entityId || null,
          isRead: data.isRead || false,
          createdAt: data.createdAt || new Date(),
          readAt: data.readAt || null,
        };
        notifications.push(item);
        return item;
      },
      createMany: async ({ data, skipDuplicates }: any) => {
        let count = 0;
        for (const d of data) {
          if (skipDuplicates && d.entityType && d.entityId && d.userId && d.type) {
            const exists = notifications.some(
              (n) =>
                n.entityType === d.entityType &&
                n.entityId === d.entityId &&
                n.userId === d.userId &&
                n.type === d.type
            );
            if (exists) continue;
          }
          notifications.push({
            id: d.id || `notif-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
            ...d,
            link: d.link || null,
            entityType: d.entityType || null,
            entityId: d.entityId || null,
            isRead: d.isRead || false,
            createdAt: d.createdAt || new Date(),
            readAt: d.readAt || null,
          });
          count++;
        }
        return { count };
      },
      findMany: async ({ where, orderBy, skip, take }: any = {}) => {
        let list = [...notifications];
        if (where) {
          if (where.userId) list = list.filter((n) => n.userId === where.userId);
          if (where.isRead !== undefined) list = list.filter((n) => n.isRead === where.isRead);
        }
        if (orderBy?.createdAt === 'desc') {
          list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }
        const s = skip || 0;
        const t = take ? s + take : list.length;
        return list.slice(s, t);
      },
      count: async ({ where }: any = {}) => {
        let list = [...notifications];
        if (where) {
          if (where.userId) list = list.filter((n) => n.userId === where.userId);
          if (where.isRead !== undefined) list = list.filter((n) => n.isRead === where.isRead);
        }
        return list.length;
      },
      updateMany: async ({ where, data }: any) => {
        let count = 0;
        for (const n of notifications) {
          const matchId = !where?.id || n.id === where.id;
          const matchUser = !where?.userId || n.userId === where.userId;
          const matchIsRead = where?.isRead === undefined || n.isRead === where.isRead;
          if (matchId && matchUser && matchIsRead) {
            Object.assign(n, data);
            count++;
          }
        }
        return { count };
      },
    },
    siteSettings: {
      findFirst: async ({ where }: any = {}) => {
        if (!where) return siteSettingsList[0] || null;
        return siteSettingsList.find((s) => !where.key || s.key === where.key) || null;
      },
      create: async ({ data }: any) => {
        const row = {
          id: data.id || randomUUID(),
          key: data.key || "global",
          value: data.value || {},
          updatedAt: new Date(),
        };
        siteSettingsList.push(row);
        return row;
      },
      update: async ({ where, data }: any) => {
        const row = siteSettingsList.find((s) => s.id === where.id || s.key === where.key);
        if (!row) throw new Error("SiteSettings record not found");
        if (data.value) row.value = data.value;
        row.updatedAt = new Date();
        return row;
      },
    },

    answerEvaluationEvidence: {
      upsert: async ({ where, create, update }: any) => {
        let existing = answersEvidence.find((e) => e.answerId === where?.answerId);
        if (existing) {
          Object.assign(existing, update);
          return existing;
        } else {
          const row = { id: create?.id || randomUUID(), ...create };
          answersEvidence.push(row);
          return row;
        }
      },
      findUnique: async ({ where }: any) => {
        return answersEvidence.find((e) => e.answerId === where?.answerId || e.id === where?.id) || null;
      },
    },

    users,
    userRoles,
    courses,
    lessons,
    classes,
    classStudents,
    classSessions,
    classAttendances,
    classExamAssignments,
    invitations,
    enrollments,
    exams,
    examSubmissions,
    answers,
    idempotencyRecords,
    auditOutboxList: auditOutboxEvents,
    notifications,
    siteSettingsList,
  };

  return mock;
}

