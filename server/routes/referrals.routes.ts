import { FastifyPluginAsync } from "fastify";
import { authenticate } from "../middlewares/auth.middleware.js";

const referralsRoutes: FastifyPluginAsync = async (fastify) => {
  /**
   * Public: Validate referral code and get inviter's display name
   */
  fastify.get("/validate-code/:code", async (request, reply) => {
    const { code } = request.params as { code: string };
    const cleanCode = (code || "").trim().toUpperCase();

    if (!cleanCode || cleanCode.length < 5) {
      return reply.status(400).send({ valid: false, message: "Mã giới thiệu không hợp lệ" });
    }

    const inviter = await fastify.prisma.user.findUnique({
      where: { referralCode: cleanCode },
      select: {
        userId: true,
        fullName: true,
        avatarUrl: true,
      },
    });

    if (!inviter) {
      return reply.status(404).send({ valid: false, message: "Mã giới thiệu không tồn tại" });
    }

    return {
      valid: true,
      referralCode: cleanCode,
      inviterName: inviter.fullName || "Học viên ARIS",
      inviterAvatar: inviter.avatarUrl,
    };
  });

  /**
   * Protected: Get current student's referral code, attributions and rewards
   */
  fastify.get(
    "/my-referrals",
    { preHandler: [authenticate] },
    async (request, reply) => {
      const user = request.user as { id: string };
      if (!user?.id) {
        return reply.status(401).send({ error: "Unauthorized" });
      }

      let profile = await fastify.prisma.user.findUnique({
        where: { userId: user.id },
        select: {
          id: true,
          userId: true,
          fullName: true,
          referralCode: true,
        },
      });

      if (!profile) {
        return reply.status(404).send({ error: "User profile not found" });
      }

      // Auto-assign referral code if missing
      if (!profile.referralCode) {
        const cleanName = (profile.fullName || "STUDENT")
          .toUpperCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^A-Z]/g, "")
          .slice(0, 5)
          .padEnd(5, "X");
        const idSuffix = profile.userId.replace(/-/g, "").slice(-4).toUpperCase();
        let code = `ARIS-${cleanName}${idSuffix}`;

        try {
          profile = await fastify.prisma.user.update({
            where: { userId: profile.userId },
            data: { referralCode: code },
            select: {
              id: true,
              userId: true,
              fullName: true,
              referralCode: true,
            },
          });
        } catch {
          code = `ARIS-${cleanName}${Math.floor(1000 + Math.random() * 9000)}`;
          profile = await fastify.prisma.user.update({
            where: { userId: profile.userId },
            data: { referralCode: code },
            select: {
              id: true,
              userId: true,
              fullName: true,
              referralCode: true,
            },
          });
        }
      }

      // Fetch attributions and rewards
      const [attributions, rewards] = await Promise.all([
        fastify.prisma.referralAttribution.findMany({
          where: { inviterUserId: user.id },
          include: {
            referee: {
              select: {
                fullName: true,
                avatarUrl: true,
                createdAt: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
        }),
        fastify.prisma.referralReward.findMany({
          where: { inviterUserId: user.id },
          orderBy: { createdAt: "desc" },
        }),
      ]);

      const totalInvited = attributions.length;
      const totalEligible = rewards.filter((r) => r.status === "ELIGIBLE").length;
      const totalDelivered = rewards.filter((r) => r.status === "DELIVERED").length;

      return {
        referralCode: profile.referralCode,
        stats: {
          totalInvited,
          totalEligible,
          totalDelivered,
        },
        attributions: attributions.map((a) => ({
          id: a.id,
          refereeName: a.referee?.fullName || "Bạn đồng hành",
          refereeAvatar: a.referee?.avatarUrl,
          discountAmount: Number(a.discountAmount),
          status: a.status,
          createdAt: a.createdAt,
        })),
        rewards: rewards.map((r) => ({
          id: r.id,
          attributionId: r.attributionId,
          rewardType: r.rewardType,
          status: r.status,
          qualifiedAt: r.qualifiedAt,
          deliveredAt: r.deliveredAt,
          notes: r.notes,
          createdAt: r.createdAt,
        })),
      };
    }
  );
};

export default referralsRoutes;
