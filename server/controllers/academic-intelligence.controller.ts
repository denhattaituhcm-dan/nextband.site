import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";

export class AcademicIntelligenceController {
  private prisma: PrismaClient;

  constructor(fastify: any) {
    this.prisma = fastify.prisma || new PrismaClient();
  }

  /**
   * GET /api/v1/academic-intelligence/overview
   * Returns executive counts & telemetry of the 3 evidence layers
   */
  async getOverview(request: FastifyRequest, reply: FastifyReply) {
    try {
      const rawSubmissionsCount = await this.prisma.examSubmission.count();
      const rawQuestionsCount = await this.prisma.question.count();
      const studentSkillEvidenceCount = await this.prisma.studentSkillEvidence.count();
      const diagnosticEvidenceCount = await this.prisma.diagnosticEvidence.count();
      const studentMasteryCount = await this.prisma.studentSkillMastery.count();
      const skillNodesCount = await this.prisma.skillNode.count();
      const errorDefinitionsCount = await this.prisma.errorDefinition.count();
      const questionSkillTagsCount = await this.prisma.questionSkillTag.count();

      const studentsWithEvidence = await this.prisma.studentSkillEvidence.findMany({
        select: { studentId: true },
        distinct: ["studentId"],
      });

      return reply.status(200).send({
        status: "success",
        timestamp: new Date().toISOString(),
        system: {
          name: "ARIS Academic Intelligence Control Plane",
          framework: "ARIS-7 Academic Framework",
          version: "1.0.0",
          recomputabilityGuarantee: "100% Deterministic Bayesian Recompute",
        },
        layers: {
          layer1RawEvidence: {
            name: "Raw Academic Evidence",
            description: "Immutable student submissions, raw answers and evaluation scores",
            totalSubmissions: rawSubmissionsCount,
            totalQuestions: rawQuestionsCount,
          },
          layer2SkillEvidence: {
            name: "Student Skill Evidence & Diagnostics",
            description: "Normalized learning observations and rule-based diagnostic hypotheses",
            totalObservations: studentSkillEvidenceCount,
            totalDiagnosticHypotheses: diagnosticEvidenceCount,
            activeTrackedStudents: studentsWithEvidence.length,
          },
          layer3DerivedMastery: {
            name: "Student Skill Mastery (Derived State)",
            description: "Recomputable derived snapshots caching Beta distribution parameters",
            totalMasterySnapshots: studentMasteryCount,
          },
        },
        ontology: {
          totalSkills: skillNodesCount,
          totalErrorDefinitions: errorDefinitionsCount,
          totalQuestionTags: questionSkillTagsCount,
        },
      });
    } catch (error: any) {
      request.log.error(error, "[AcademicIntelligenceController] getOverview error");
      return reply.status(500).send({
        error: "InternalServerError",
        message: "Failed to fetch Academic Intelligence overview telemetry.",
      });
    }
  }

  /**
   * GET /api/v1/academic-intelligence/students
   * Returns list of students who have learning evidence or submissions
   */
  async getStudents(request: FastifyRequest, reply: FastifyReply) {
    try {
      const users = await this.prisma.user.findMany({
        where: {
          OR: [
            { skillEvidences: { some: {} } },
            { submissions: { some: {} } },
          ],
        },
        select: {
          userId: true,
          email: true,
          fullName: true,
          avatarUrl: true,
          submissions: {
            select: { id: true },
          },
          skillEvidences: {
            select: { id: true },
          },
          skillMasteries: {
            select: { id: true },
          },
        },
        take: 50,
        orderBy: { createdAt: "desc" },
      });

      const formatted = users.map((u) => ({
        id: u.userId,
        email: u.email,
        fullName: u.fullName || u.email,
        avatarUrl: u.avatarUrl,
        submissionCount: u.submissions.length,
        evidenceCount: u.skillEvidences.length,
        masteryCount: u.skillMasteries.length,
      }));

      return reply.status(200).send({
        status: "success",
        data: formatted,
        students: formatted,
      });
    } catch (error: any) {
      request.log.error(error, "[AcademicIntelligenceController] getStudents error");
      return reply.status(500).send({
        error: "InternalServerError",
        message: "Failed to fetch student directory.",
      });
    }
  }

  /**
   * GET /api/v1/academic-intelligence/students/:studentId/submissions
   * Returns submissions for a specific student
   */
  async getStudentSubmissions(
    request: FastifyRequest<{ Params: { studentId: string } }>,
    reply: FastifyReply
  ) {
    const { studentId } = request.params;
    try {
      const submissions = await this.prisma.examSubmission.findMany({
        where: { studentId },
        include: {
          exam: {
            select: {
              id: true,
              title: true,
              examType: true,
            },
          },
          answers: {
            select: { id: true, score: true },
          },
        },
        orderBy: { createdAt: "desc" },
      });

      const mapped = submissions.map((s) => ({
        id: s.id,
        examId: s.examId,
        examTitle: s.exam?.title || "Exam",
        examType: s.exam?.examType || "UNKNOWN",
        status: s.status,
        score: s.totalScore ? Number(s.totalScore) : null,
        correctAnswers: s.correctAnswers || 0,
        totalQuestions: s.totalQuestions || s.answers.length,
        submittedAt: s.submittedAt,
        createdAt: s.createdAt,
      }));

      return reply.status(200).send({
        status: "success",
        data: mapped,
        submissions: mapped,
      });
    } catch (error: any) {
      request.log.error(error, "[AcademicIntelligenceController] getStudentSubmissions error");
      return reply.status(500).send({
        error: "InternalServerError",
        message: "Failed to fetch student submissions.",
      });
    }
  }

  /**
   * GET /api/v1/academic-intelligence/submissions/:submissionId/provenance
   * Returns full 7-step provenance chain for a submission:
   * Student -> Submission -> Questions & Answers -> Evaluations -> Skill Evidences -> Diagnostic Evidences -> Mastery State
   */
  async getSubmissionProvenance(
    request: FastifyRequest<{ Params: { submissionId: string } }>,
    reply: FastifyReply
  ) {
    const { submissionId } = request.params;
    try {
      const submission = await this.prisma.examSubmission.findUnique({
        where: { id: submissionId },
        include: {
          student: {
            select: {
              userId: true,
              email: true,
              fullName: true,
            },
          },
          exam: {
            select: {
              id: true,
              title: true,
              examType: true,
            },
          },
          answers: {
            include: {
              evidence: true,
              question: {
                include: {
                  skillTags: {
                    include: {
                      skillNode: true,
                    },
                  },
                },
              },
            },
          },
          diagnosticEvidences: {
            include: {
              errorDef: true,
            },
          },
        },
      });

      if (!submission) {
        return reply.status(404).send({
          error: "NotFound",
          message: `Submission ${submissionId} not found.`,
        });
      }

      // Fetch normalized StudentSkillEvidence rows tied to this submission/answers
      const answerIds = submission.answers.map((a) => a.id);
      const skillEvidences = await this.prisma.studentSkillEvidence.findMany({
        where: {
          studentId: submission.studentId,
          OR: [
            { sourceId: submission.id },
            { sourceId: { in: answerIds } },
          ],
        },
        include: {
          skillNode: true,
        },
        orderBy: { observedAt: "asc" },
      });

      // Fetch active StudentSkillMastery snapshot for involved skills
      const involvedSkillCodes = Array.from(
        new Set(skillEvidences.map((e) => e.skillCode))
      );
      const masterySnapshots = await this.prisma.studentSkillMastery.findMany({
        where: {
          studentId: submission.studentId,
          skillCode: { in: involvedSkillCodes },
        },
        include: {
          skillNode: true,
        },
      });

      // Assemble Drill-down Chain: Question -> Answer -> Evaluation -> Skill Evidence -> Diagnostic
      const questionChain = submission.answers.map((ans) => {
        const matchingEvidences = skillEvidences.filter(
          (e) => e.sourceId === ans.id
        );
        const matchingDiagnostic = submission.diagnosticEvidences.find(
          (d) => d.questionId === ans.questionId
        );

        return {
          questionId: ans.questionId,
          questionText: ans.question.questionText,
          questionType: ans.question.questionType,
          correctAnswer: ans.question.correctAnswer,
          points: ans.question.points,
          tags: ans.question.skillTags.map((t) => ({
            skillCode: t.skillCode,
            skillName: t.skillNode?.name,
            weight: t.weight,
          })),
          answer: {
            id: ans.id,
            answerText: ans.answerText,
            audioUrl: ans.audioUrl,
            score: ans.score ? Number(ans.score) : 0,
            feedback: ans.feedback,
            createdAt: ans.createdAt,
          },
          evaluation: {
            isCorrect: ans.evidence ? ans.evidence.isCorrect : (ans.score && Number(ans.score) > 0) || false,
            scoreAwarded: ans.evidence ? ans.evidence.scoreAwarded : (ans.score ? Number(ans.score) : 0),
            maxScore: ans.evidence ? ans.evidence.maxScore : (ans.question.points || 1),
            matchedRule: ans.evidence?.matchedRule || null,
            normalizedInput: ans.evidence?.normalizedInput || null,
          },
          skillEvidences: matchingEvidences.map((se) => ({
            id: se.id,
            skillCode: se.skillCode,
            skillName: se.skillNode?.name,
            outcome: se.outcome,
            weight: se.evidenceWeight,
            observedAt: se.observedAt,
          })),
          diagnostic: matchingDiagnostic
            ? {
                id: matchingDiagnostic.id,
                errorCode: matchingDiagnostic.errorCode,
                errorName: matchingDiagnostic.errorDef?.name,
                ruleCode: matchingDiagnostic.ruleCode,
                confidence: matchingDiagnostic.confidence,
                evidenceSnippet: matchingDiagnostic.evidenceSnippet,
                taxonomyVersion: matchingDiagnostic.taxonomyVersion,
              }
            : null,
        };
      });

      return reply.status(200).send({
        status: "success",
        data: {
          student: submission.student,
          submission: {
            id: submission.id,
            examId: submission.examId,
            examTitle: submission.exam.title,
            examType: submission.exam.examType,
            status: submission.status,
            totalScore: submission.totalScore ? Number(submission.totalScore) : null,
            correctAnswers: submission.correctAnswers,
            totalQuestions: submission.totalQuestions,
            submittedAt: submission.submittedAt,
          },
          chain: questionChain,
          masterySnapshots: masterySnapshots.map((m) => {
            const mean = m.alphaSuccess / (m.alphaSuccess + m.betaFailure);
            const total = m.alphaSuccess + m.betaFailure;
            const variance = (m.alphaSuccess * m.betaFailure) / (total * total * (total + 1));
            return {
              skillCode: m.skillCode,
              skillName: m.skillNode?.name,
              alphaSuccess: m.alphaSuccess,
              betaFailure: m.betaFailure,
              totalEvidence: m.totalEvidence,
              posteriorMean: mean,
              uncertainty: variance,
              lastObservedAt: m.lastObservedAt,
              recomputedAt: m.recomputedAt,
            };
          }),
        },
      });
    } catch (error: any) {
      request.log.error(error, "[AcademicIntelligenceController] getSubmissionProvenance error");
      return reply.status(500).send({
        error: "InternalServerError",
        message: "Failed to fetch submission provenance.",
      });
    }
  }
}
