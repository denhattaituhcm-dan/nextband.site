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
  const enrollments: any[] = [];
  const exams: any[] = [];
  const examSubmissions: any[] = [];
  const answers: any[] = [];
  const idempotencyRecords: any[] = [];
  const auditOutboxEvents: any[] = [];

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
        const s = classSessions.find((x) => x.id === where?.id);
        if (!s) return null;
        const lesson = lessons.find((l) => l.id === s.lessonId) || { title: "Lesson Title" };
        return { ...s, ...(include?.lesson ? { lesson } : {}) };
      },
      findMany: async ({ where, include }: any) => {
        return classSessions
          .filter((s) => !where?.classId || s.classId === where.classId)
          .map((s) => {
            const lesson = lessons.find((l) => l.id === s.lessonId) || { title: "Lesson Title" };
            return { ...s, ...(include?.lesson ? { lesson } : {}) };
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
      findUnique: async ({ where }: any) => {
        return exams.find((e) => e.id === where?.id) || null;
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
      findFirst: async ({ where }: any) => {
        return (
          examSubmissions.find((s) => {
            if (where?.examId && s.examId !== where.examId) return false;
            if (where?.studentId && s.studentId !== where.studentId) return false;
            if (where?.status && s.status !== where.status) return false;
            return true;
          }) || null
        );
      },
      findMany: async () => examSubmissions,
      count: async ({ where }: any) => {
        return examSubmissions.filter((s) => {
          if (where?.examId && s.examId !== where.examId) return false;
          if (where?.studentId && s.studentId !== where.studentId) return false;
          if (where?.status && s.status !== where.status) return false;
          return true;
        }).length;
      },
      update: async ({ where, data }: any) => {
        const sub = examSubmissions.find((s) => s.id === where?.id);
        if (sub) {
          Object.assign(sub, data, { updatedAt: new Date() });
          return sub;
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

    users,
    userRoles,
    courses,
    lessons,
    classes,
    classStudents,
    classSessions,
    classAttendances,
    homeworks,
    submissions,
    invitations,
    enrollments,
    exams,
    examSubmissions,
    answers,
    idempotencyRecords,
    auditOutboxList: auditOutboxEvents,
  };

  return mock;
}

