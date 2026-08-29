import { PrismaClient } from "@prisma/client";

export class MilestoneService {
  constructor(private prisma: PrismaClient) {}

  /**
   * Get all claimed milestone keys for a student
   */
  async getStudentClaims(studentId: string): Promise<string[]> {
    const claims = await this.prisma.studentMilestoneClaim.findMany({
      where: { studentId },
      select: { milestoneKey: true },
    });
    return claims.map((c) => c.milestoneKey);
  }

  /**
   * Atomically claim a milestone for a student
   * Returns { isFirstClaim: true, claim } if newly claimed, or { isFirstClaim: false } if already existed
   */
  async claimMilestone(studentId: string, milestoneKey: string) {
    if (!milestoneKey || typeof milestoneKey !== "string") {
      throw new Error("milestoneKey là bắt buộc");
    }

    try {
      const claim = await this.prisma.studentMilestoneClaim.create({
        data: {
          studentId,
          milestoneKey,
        },
      });
      return { isFirstClaim: true, claim };
    } catch (error: any) {
      // P2002: Unique constraint failed on (studentId, milestoneKey)
      if (error.code === "P2002") {
        const existing = await this.prisma.studentMilestoneClaim.findUnique({
          where: {
            studentId_milestoneKey: {
              studentId,
              milestoneKey,
            },
          },
        });
        return { isFirstClaim: false, claim: existing };
      }
      throw error;
    }
  }
}
