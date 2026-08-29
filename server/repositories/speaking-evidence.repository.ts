import { PrismaClient } from "@prisma/client";

export interface SyncEvidenceItem {
  tagId: string;
  criterion: string;
  evidenceNote?: string;
}

export class SpeakingEvidenceRepository {
  constructor(private prisma: PrismaClient) {}

  /**
   * Retrieves all active candidate speaking tags, grouped or filtered by criterion
   */
  async listActiveTags(criterion?: string) {
    const where: any = { isActive: true };
    if (criterion) {
      where.criterion = criterion.toUpperCase();
    }

    return this.prisma.speakingEvidenceTag.findMany({
      where,
      orderBy: [
        { criterion: "asc" },
        { displayOrder: "asc" },
      ],
    });
  }

  /**
   * Retrieves active evidence records for a specific assessment
   */
  async getEvidenceByAssessment(assessmentId: string) {
    return this.prisma.speakingAssessmentEvidence.findMany({
      where: {
        assessmentId,
        removedAt: null,
      },
      include: {
        tag: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }

  /**
   * Batch synchronizes evidence records for an assessment.
   * Uses Soft-Delete to preserve audit provenance:
   * - Tags present in `items` but not in DB -> Created
   * - Tags in DB that were soft-deleted -> Restored (removedAt = null)
   * - Tags in DB currently active but not in `items` -> Soft-deleted (removedAt = now(), removedBy = teacherId)
   */
  async batchSyncEvidence(
    assessmentId: string,
    items: SyncEvidenceItem[],
    teacherId: string
  ) {
    return this.prisma.$transaction(async (tx) => {
      // 1. Fetch current active and inactive records for this assessment
      const existingRecords = await tx.speakingAssessmentEvidence.findMany({
        where: { assessmentId },
      });

      const incomingTagIds = new Set(items.map((i) => i.tagId));
      const now = new Date();

      // 2. Identify records to soft-delete (active in DB, but not in incoming payload)
      const toSoftDelete = existingRecords.filter(
        (rec) => rec.removedAt === null && !incomingTagIds.has(rec.tagId)
      );

      for (const rec of toSoftDelete) {
        await tx.speakingAssessmentEvidence.update({
          where: { id: rec.id },
          data: {
            removedAt: now,
            removedBy: teacherId,
          },
        });
      }

      // 3. For each incoming item, either restore existing soft-deleted record or create new
      const results = [];
      for (const item of items) {
        const existing = existingRecords.find((rec) => rec.tagId === item.tagId);

        if (existing) {
          if (existing.removedAt !== null) {
            // Restore record
            const restored = await tx.speakingAssessmentEvidence.update({
              where: { id: existing.id },
              data: {
                criterion: item.criterion,
                evidenceNote: item.evidenceNote ?? existing.evidenceNote,
                removedAt: null,
                removedBy: null,
              },
              include: { tag: true },
            });
            results.push(restored);
          } else {
            // Update note if changed
            const updated = await tx.speakingAssessmentEvidence.update({
              where: { id: existing.id },
              data: {
                evidenceNote: item.evidenceNote ?? existing.evidenceNote,
              },
              include: { tag: true },
            });
            results.push(updated);
          }
        } else {
          // Create new evidence record
          const created = await tx.speakingAssessmentEvidence.create({
            data: {
              assessmentId,
              criterion: item.criterion,
              tagId: item.tagId,
              evidenceNote: item.evidenceNote,
              createdBy: teacherId,
            },
            include: { tag: true },
          });
          results.push(created);
        }
      }

      return results;
    });
  }
}
