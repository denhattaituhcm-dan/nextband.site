import { describe, it, expect, beforeEach } from "vitest";
import { OntologyService } from "../services/ontology.service.js";

function createOntologyMockPrisma() {
  const skillNodes: any[] = [];
  const errorDefinitions: any[] = [];
  const questionSkillTags: any[] = [];

  return {
    skillNode: {
      upsert: async ({ where, create, update }: any) => {
        const idx = skillNodes.findIndex((s) => s.code === where.code);
        if (idx >= 0) {
          skillNodes[idx] = { ...skillNodes[idx], ...update };
          return skillNodes[idx];
        } else {
          const item = { ...create };
          skillNodes.push(item);
          return item;
        }
      },
      findUnique: async ({ where }: any) => {
        return skillNodes.find((s) => s.code === where.code) || null;
      },
      findMany: async () => skillNodes,
    },
    errorDefinition: {
      upsert: async ({ where, create, update }: any) => {
        const idx = errorDefinitions.findIndex((e) => e.code === where.code);
        if (idx >= 0) {
          errorDefinitions[idx] = { ...errorDefinitions[idx], ...update };
          return errorDefinitions[idx];
        } else {
          const item = { ...create };
          errorDefinitions.push(item);
          return item;
        }
      },
      findMany: async () => errorDefinitions,
    },
    questionSkillTag: {
      upsert: async ({ where, create, update }: any) => {
        const idx = questionSkillTags.findIndex(
          (q) =>
            q.questionId === where.questionId_skillCode.questionId &&
            q.skillCode === where.questionId_skillCode.skillCode
        );
        if (idx >= 0) {
          questionSkillTags[idx] = { ...questionSkillTags[idx], ...update };
          return questionSkillTags[idx];
        } else {
          const item = { ...create };
          questionSkillTags.push(item);
          return item;
        }
      },
      findMany: async ({ where, include }: any) => {
        return questionSkillTags
          .filter((t) => t.questionId === where.questionId)
          .map((t) => {
            if (include?.skillNode) {
              const node = skillNodes.find((s) => s.code === t.skillCode);
              return { ...t, skillNode: node };
            }
            return t;
          });
      },
    },
  } as any;
}

describe("Ontology & Question Tagging Verification (Phase 1 Acceptance)", () => {
  let mockPrisma: any;
  let service: OntologyService;

  beforeEach(async () => {
    mockPrisma = createOntologyMockPrisma();
    service = new OntologyService(mockPrisma);
  });

  it("Nạp thành công Minimal Ontology V1 và đảm bảo tính toàn vẹn", async () => {
    const res = await service.syncOntologyToDatabase();
    expect(res.skillsUpserted).toBe(22); // 12 Reading + 10 Listening
    expect(res.errorsUpserted).toBe(12); // 12 core errors

    // Kiểm tra mẫu 1 node
    const qualifier = await mockPrisma.skillNode.findUnique({
      where: { code: "R_MS_QUALIFIER_SENSITIVITY" },
    });
    expect(qualifier).toBeDefined();
    expect(qualifier.macroSkill).toBe("READING");
    expect(qualifier.realmTier).toBe("INTERMEDIATE");
    expect(qualifier.taxonomyVersion).toBe("1.0.0");
  });

  it("Question 2 (Phase 1): Một Question có được gắn đúng skill không và có thể audit không?", async () => {
    await service.syncOntologyToDatabase();

    // Giả lập gắn skill vào câu hỏi Reading Matching Headings (Q-100)
    await service.tagQuestionSkill({
      questionId: "Q-100",
      skillCode: "R_MS_TOPIC_SENTENCE_FILTER",
      weight: 1.0,
    });
    await service.tagQuestionSkill({
      questionId: "Q-100",
      skillCode: "R_MS_PARAPHRASE_DISCRIMINATION",
      weight: 0.8,
    });

    // Audit câu hỏi Q-100
    const auditReport = await service.auditQuestionSkills("Q-100");
    expect(auditReport).toHaveLength(2);

    const topicSkill = auditReport.find((a: any) => a.skillCode === "R_MS_TOPIC_SENTENCE_FILTER");
    expect(topicSkill).toBeDefined();
    expect(topicSkill.weight).toBe(1.0);
    expect(topicSkill.skillNode.name).toContain("Lọc ý chính đoạn văn");

    const paraphraseSkill = auditReport.find((a: any) => a.skillCode === "R_MS_PARAPHRASE_DISCRIMINATION");
    expect(paraphraseSkill).toBeDefined();
    expect(paraphraseSkill.weight).toBe(0.8);
  });

  it("Từ chối gắn mã skill không tồn tại trong Ontology (Referential Guard)", async () => {
    await service.syncOntologyToDatabase();

    await expect(
      service.tagQuestionSkill({
        questionId: "Q-100",
        skillCode: "NON_EXISTENT_SKILL",
      })
    ).rejects.toThrow("không tồn tại trong Ontology");
  });
});
