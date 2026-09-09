/**
 * HOLD — Academic Intelligence Foundation.
 *
 * Currently test-covered but NOT wired into any production request flow.
 * No route, controller, or production service imports this class.
 *
 * Do not treat this service as an active production capability.
 * Deletion decision belongs to product/roadmap, not dead-code cleanup.
 *
 * ---
 * Ontology Service — Phase 1: Minimum Ontology & Transparent Question Skill Tagging
 *
 * Invariant 1: Question-to-Skill mappings must be auditable and deterministic.
 * Invariant 2: Versioning is strictly tracked via taxonomyVersion.
 */

import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import { join } from "path";

export interface SkillNodeDefinition {
  code: string;
  name: string;
  description: string;
  macroSkill: "READING" | "LISTENING" | "WRITING" | "SPEAKING";
  realmTier: "FOUNDATION" | "INTERMEDIATE" | "ADVANCED" | "MASTERY";
}

export interface ErrorDefinitionItem {
  code: string;
  name: string;
  description: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "FATAL";
}

export interface OntologyPackage {
  version: string;
  name: string;
  skillNodes: SkillNodeDefinition[];
  errorDefinitions: ErrorDefinitionItem[];
}

export class OntologyService {
  constructor(private prisma: PrismaClient) {}

  /**
   * Đọc file ontology JSON chuẩn
   */
  loadOntologyPackage(filePath?: string): OntologyPackage {
    const defaultPath = join(process.cwd(), "server", "ontology", "ielts_minimal_ontology_v1.json");
    const raw = readFileSync(filePath || defaultPath, "utf-8");
    return JSON.parse(raw) as OntologyPackage;
  }

  /**
   * Seed/Upsert Ontology vào Database với referential integrity
   */
  async syncOntologyToDatabase(pkg?: OntologyPackage): Promise<{
    skillsUpserted: number;
    errorsUpserted: number;
  }> {
    const ontology = pkg || this.loadOntologyPackage();
    let skillsCount = 0;
    let errorsCount = 0;

    // 1. Sync Skill Nodes
    for (const skill of ontology.skillNodes) {
      await this.prisma.skillNode.upsert({
        where: { code: skill.code },
        create: {
          code: skill.code,
          name: skill.name,
          description: skill.description,
          macroSkill: skill.macroSkill,
          realmTier: skill.realmTier,
          taxonomyVersion: ontology.version,
        },
        update: {
          name: skill.name,
          description: skill.description,
          macroSkill: skill.macroSkill,
          realmTier: skill.realmTier,
          taxonomyVersion: ontology.version,
        },
      });
      skillsCount++;
    }

    // 2. Sync Error Definitions
    for (const err of ontology.errorDefinitions) {
      await this.prisma.errorDefinition.upsert({
        where: { code: err.code },
        create: {
          code: err.code,
          name: err.name,
          description: err.description,
          severity: err.severity,
        },
        update: {
          name: err.name,
          description: err.description,
          severity: err.severity,
        },
      });
      errorsCount++;
    }

    return { skillsUpserted: skillsCount, errorsUpserted: errorsCount };
  }

  /**
   * Gắn Skill vào Question một cách minh bạch (Auditable Tagging)
   * Trả lời câu hỏi Phase 1: "Một Question có được gắn đúng skill không?"
   */
  async tagQuestionSkill(params: {
    questionId: string;
    skillCode: string;
    weight?: number;
    taxonomyVersion?: string;
  }) {
    // Đảm bảo skillCode tồn tại trong ontology
    const node = await this.prisma.skillNode.findUnique({
      where: { code: params.skillCode },
    });
    if (!node) {
      throw new Error(`SkillNode '${params.skillCode}' không tồn tại trong Ontology.`);
    }

    return await this.prisma.questionSkillTag.upsert({
      where: {
        questionId_skillCode: {
          questionId: params.questionId,
          skillCode: params.skillCode,
        },
      },
      create: {
        questionId: params.questionId,
        skillCode: params.skillCode,
        weight: params.weight ?? 1.0,
        taxonomyVersion: params.taxonomyVersion ?? node.taxonomyVersion,
      },
      update: {
        weight: params.weight ?? 1.0,
        taxonomyVersion: params.taxonomyVersion ?? node.taxonomyVersion,
      },
    });
  }

  /**
   * Audit: Lấy danh sách kỹ năng được gắn vào câu hỏi để con người/giáo viên kiểm tra
   */
  async auditQuestionSkills(questionId: string) {
    return await this.prisma.questionSkillTag.findMany({
      where: { questionId },
      include: {
        skillNode: true,
      },
    });
  }
}
