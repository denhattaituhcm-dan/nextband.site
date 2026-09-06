import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { SpeakingEvidenceRepository } from "../repositories/speaking-evidence.repository.js";
import { CANDIDATE_SPEAKING_TAGS } from "../../prisma/seed_speaking_evidence_tags.js";
import { isTestDatabaseConfigured, createSafeTestPrismaClient } from "./testDbGuard.js";

const isDbReady = isTestDatabaseConfigured();

describe.skipIf(!isDbReady)("ARIS Speaking Evidence Engine — Candidate Taxonomy v1.0 Tests", () => {
  let prisma: any;
  let repository: SpeakingEvidenceRepository;

  beforeAll(() => {
    prisma = createSafeTestPrismaClient();
    repository = new SpeakingEvidenceRepository(prisma);
  });


  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should have exactly 32 candidate speaking evidence tags in the database", async () => {
    const count = await prisma.speakingEvidenceTag.count();
    expect(count).toBe(32);
  });

  it("should distribute exactly 8 tags per criterion with 5 issues and 3 strengths", async () => {
    const criteria = ["PR", "FC", "LR", "GRA"] as const;

    for (const crit of criteria) {
      const allCritTags = await prisma.speakingEvidenceTag.findMany({
        where: { criterion: crit, isActive: true },
      });

      expect(allCritTags).toHaveLength(8);

      const issues = allCritTags.filter((t) => t.polarity === "ISSUE");
      const strengths = allCritTags.filter((t) => t.polarity === "STRENGTH");

      expect(issues).toHaveLength(5);
      expect(strengths).toHaveLength(3);
    }
  });

  it("should have inclusionRule and exclusionRule defined for all candidate tags", async () => {
    const tags = await prisma.speakingEvidenceTag.findMany({
      where: { isActive: true },
    });

    for (const tag of tags) {
      expect(tag.inclusionRule).toBeTruthy();
      expect(tag.inclusionRule.length).toBeGreaterThan(10);
      expect(tag.exclusionRule).toBeTruthy();
      expect(tag.exclusionRule.length).toBeGreaterThan(10);
      expect(tag.labelVi).toBeTruthy();
      expect(tag.descriptionVi).toBeTruthy();
    }
  });

  it("should enforce composite foreign key constraint against criterion mismatch", async () => {
    const submission = await prisma.examSubmission.findFirst({ select: { id: true } });
    if (!submission) return;

    // Try inserting PR criterion with LR tag
    await expect(
      prisma.$executeRawUnsafe(`
        INSERT INTO speaking_assessment_evidence (id, assessment_id, criterion, tag_id, created_by)
        VALUES (gen_random_uuid(), '${submission.id}', 'PR', 'LR_UNNATURAL_COLLOCATION', 'test-teacher')
      `)
    ).rejects.toThrow();
  });

  it("should batch sync evidence with soft-delete provenance", async () => {
    const submission = await prisma.examSubmission.findFirst({ select: { id: true } });
    if (!submission) return;

    const teacherId = "test-teacher-id";

    // 1. Initial sync with 2 tags
    const step1 = await repository.batchSyncEvidence(
      submission.id,
      [
        { tagId: "PR_OMIT_FINAL_CONSONANT", criterion: "PR", evidenceNote: "Nuốt âm s" },
        { tagId: "FC_CONTINUOUS_FLOW", criterion: "FC" },
      ],
      teacherId
    );
    expect(step1).toHaveLength(2);

    const activeAfterStep1 = await repository.getEvidenceByAssessment(submission.id);
    expect(activeAfterStep1.map((e) => e.tagId)).toContain("PR_OMIT_FINAL_CONSONANT");
    expect(activeAfterStep1.map((e) => e.tagId)).toContain("FC_CONTINUOUS_FLOW");

    // 2. Second sync: remove PR_OMIT_FINAL_CONSONANT, add GRA_PAST_TENSE_DROP
    const step2 = await repository.batchSyncEvidence(
      submission.id,
      [
        { tagId: "FC_CONTINUOUS_FLOW", criterion: "FC" },
        { tagId: "GRA_PAST_TENSE_DROP", criterion: "GRA", evidenceNote: "Part 2 dùng hiện tại đơn" },
      ],
      teacherId
    );
    expect(step2).toHaveLength(2);

    const activeAfterStep2 = await repository.getEvidenceByAssessment(submission.id);
    const activeTagIds = activeAfterStep2.map((e) => e.tagId);
    expect(activeTagIds).toContain("FC_CONTINUOUS_FLOW");
    expect(activeTagIds).toContain("GRA_PAST_TENSE_DROP");
    expect(activeTagIds).not.toContain("PR_OMIT_FINAL_CONSONANT");

    // 3. Verify that PR_OMIT_FINAL_CONSONANT was soft-deleted, not hard-deleted
    const softDeleted = await prisma.speakingAssessmentEvidence.findFirst({
      where: {
        assessmentId: submission.id,
        tagId: "PR_OMIT_FINAL_CONSONANT",
      },
    });
    expect(softDeleted).not.toBeNull();
    expect(softDeleted?.removedAt).not.toBeNull();
    expect(softDeleted?.removedBy).toBe(teacherId);

    // Clean up test evidence for this test
    await prisma.speakingAssessmentEvidence.deleteMany({
      where: { assessmentId: submission.id },
    });
  });
});
