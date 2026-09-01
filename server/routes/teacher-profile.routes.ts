import { FastifyPluginAsync } from "fastify";
import { authenticate, requireRoles } from "../middlewares/auth.middleware.js";

const teacherProfileRoutes: FastifyPluginAsync = async (fastify) => {
  /**
   * GET /teacher-profile/:userId
   * Returns profile + currentClasses + workload summary.
   * internalNotes is only returned for admin callers.
   */
  fastify.get(
    "/:userId",
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
    async (request, reply) => {
      const { userId } = request.params as { userId: string };
      const callerRoles: string[] = (request.user as any)?.roles ?? [];
      const isAdmin = callerRoles.includes("admin");

      const profile = await fastify.prisma.teacherProfile.findUnique({
        where: { userId },
      });

      const currentClasses = await fastify.prisma.class.findMany({
        where: {
          teacherId: userId,
          isActive: true,
          status: "ACTIVE",
        },
        include: {
          _count: { select: { students: { where: { deletedAt: null } } } },
        },
        orderBy: { createdAt: "desc" },
      });

      const currentClassCount = currentClasses.length;
      const maxClasses = profile?.maxClassesPerWeek ?? null;

      const capacityStatus =
        !maxClasses
          ? "unknown"
          : currentClassCount >= maxClasses
          ? "full"
          : currentClassCount >= maxClasses * 0.75
          ? "nearFull"
          : "available";

      const responseProfile = profile
        ? { ...profile, internalNotes: isAdmin ? profile.internalNotes : undefined }
        : null;

      return reply.send({
        profile: responseProfile,
        currentClasses: currentClasses.map((cls) => ({
          id: cls.id,
          name: cls.name,
          status: cls.status,
          startDate: cls.startDate,
          endDate: cls.endDate,
          studentCount: cls._count.students,
        })),
        workload: {
          currentClasses: currentClassCount,
          maxClasses,
          maxHours: profile?.maxHoursPerWeek ?? null,
          capacityStatus,
        },
      });
    }
  );

  /**
   * PUT /teacher-profile/:userId
   * Upsert profile. Admin only.
   */
  fastify.put(
    "/:userId",
    { preHandler: [authenticate, requireRoles("admin")] },
    async (request, reply) => {
      const { userId } = request.params as { userId: string };
      const body = request.body as any;

      const user = await fastify.prisma.user.findUnique({
        where: { userId },
        select: { userId: true, roles: { select: { role: true } } },
      });

      if (!user) {
        return reply.status(404).send({ error: "Không tìm thấy người dùng" });
      }

      const isTeacher = user.roles.some((r: any) => r.role === "teacher");
      if (!isTeacher) {
        return reply.status(400).send({ error: "Người dùng này không phải giáo viên" });
      }

      const data: any = {};
      if (body.ieltsOverall !== undefined)       data.ieltsOverall         = body.ieltsOverall != null ? parseFloat(body.ieltsOverall) : null;
      if (body.ieltsL !== undefined)             data.ieltsL               = body.ieltsL != null ? parseFloat(body.ieltsL) : null;
      if (body.ieltsR !== undefined)             data.ieltsR               = body.ieltsR != null ? parseFloat(body.ieltsR) : null;
      if (body.ieltsW !== undefined)             data.ieltsW               = body.ieltsW != null ? parseFloat(body.ieltsW) : null;
      if (body.ieltsS !== undefined)             data.ieltsS               = body.ieltsS != null ? parseFloat(body.ieltsS) : null;
      if (body.ieltsTestedAt !== undefined)      data.ieltsTestedAt        = body.ieltsTestedAt ? new Date(body.ieltsTestedAt) : null;
      if (body.yearsTeachingIelts !== undefined) data.yearsTeachingIelts   = body.yearsTeachingIelts != null ? parseInt(body.yearsTeachingIelts) : null;
      if (body.yearsTeachingEnglish !== undefined) data.yearsTeachingEnglish = body.yearsTeachingEnglish != null ? parseInt(body.yearsTeachingEnglish) : null;
      if (body.certificates !== undefined)       data.certificates         = Array.isArray(body.certificates) ? body.certificates : [];
      if (body.educationLevel !== undefined)     data.educationLevel       = body.educationLevel || null;
      if (body.teachableLevels !== undefined)    data.teachableLevels      = Array.isArray(body.teachableLevels) ? body.teachableLevels : [];
      if (body.strongSkills !== undefined)       data.strongSkills         = Array.isArray(body.strongSkills) ? body.strongSkills : [];
      if (body.strengths !== undefined)          data.strengths            = Array.isArray(body.strengths) ? body.strengths : [];
      if (body.developmentAreas !== undefined)   data.developmentAreas     = Array.isArray(body.developmentAreas) ? body.developmentAreas : [];
      if (body.internalNotes !== undefined)      data.internalNotes        = body.internalNotes || null;
      if (body.availabilitySlots !== undefined)  data.availabilitySlots    = Array.isArray(body.availabilitySlots) ? body.availabilitySlots : null;
      if (body.maxClassesPerWeek !== undefined)  data.maxClassesPerWeek    = body.maxClassesPerWeek != null ? parseInt(body.maxClassesPerWeek) : null;
      if (body.maxHoursPerWeek !== undefined)    data.maxHoursPerWeek      = body.maxHoursPerWeek != null ? parseFloat(body.maxHoursPerWeek) : null;

      const profile = await fastify.prisma.teacherProfile.upsert({
        where: { userId },
        create: { userId, ...data },
        update: data,
      });

      return reply.send({ profile });
    }
  );
};

export default teacherProfileRoutes;
