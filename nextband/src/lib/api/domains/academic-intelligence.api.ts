import { API_BASE_URL, getAuthToken, handleApiResponse } from "../client";

export interface AcademicIntelligenceOverview {
  status: string;
  timestamp: string;
  system: {
    name: string;
    framework: string;
    version: string;
    recomputabilityGuarantee: string;
  };
  layers: {
    layer1RawEvidence: {
      name: string;
      description: string;
      totalSubmissions: number;
      totalQuestions: number;
    };
    layer2SkillEvidence: {
      name: string;
      description: string;
      totalObservations: number;
      totalDiagnosticHypotheses: number;
      activeTrackedStudents: number;
    };
    layer3DerivedMastery: {
      name: string;
      description: string;
      totalMasterySnapshots: number;
    };
  };
  ontology: {
    totalSkills: number;
    totalErrorDefinitions: number;
    totalQuestionTags: number;
  };
}

export const academicIntelligenceApi = {
  async getOverview(): Promise<AcademicIntelligenceOverview> {
    const token = await getAuthToken();
    const res = await fetch(`${API_BASE_URL}/academic-intelligence/overview`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    return handleApiResponse<AcademicIntelligenceOverview>(
      res,
      "Không thể tải dữ liệu tổng quan Academic Intelligence"
    );
  },

  async getStudents(): Promise<Array<{
    id: string;
    email: string;
    fullName: string;
    avatarUrl?: string;
    submissionCount: number;
    evidenceCount: number;
    masteryCount: number;
  }>> {
    const token = await getAuthToken();
    const res = await fetch(`${API_BASE_URL}/academic-intelligence/students`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    const json = await handleApiResponse<{ status: string; data: any[] }>(
      res,
      "Không thể tải danh sách học sinh"
    );
    return json.data;
  },

  async getStudentSubmissions(studentId: string): Promise<Array<{
    id: string;
    examId: string;
    examTitle: string;
    examType: string;
    status: string;
    score: number | null;
    correctAnswers: number;
    totalQuestions: number;
    submittedAt?: string;
    createdAt: string;
  }>> {
    const token = await getAuthToken();
    const res = await fetch(`${API_BASE_URL}/academic-intelligence/students/${studentId}/submissions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    const json = await handleApiResponse<{ status: string; data: any[] }>(
      res,
      "Không thể tải danh sách bài nộp của học sinh"
    );
    return json.data;
  },

  async getSubmissionProvenance(submissionId: string): Promise<{
    student: { userId: string; email: string; fullName?: string };
    submission: {
      id: string;
      examId: string;
      examTitle: string;
      examType: string;
      status: string;
      totalScore: number | null;
      correctAnswers: number;
      totalQuestions: number;
      submittedAt?: string;
    };
    chain: Array<{
      questionId: string;
      questionText: string;
      questionType: string;
      correctAnswer?: string;
      points?: number;
      tags: Array<{ skillCode: string; skillName?: string; weight: number }>;
      answer: {
        id: string;
        answerText?: string;
        audioUrl?: string;
        score: number;
        feedback?: string;
        createdAt: string;
      };
      evaluation: {
        isCorrect: boolean;
        scoreAwarded: number;
        maxScore: number;
      };
      skillEvidences: Array<{
        id: string;
        skillCode: string;
        skillName?: string;
        outcome: number;
        weight: number;
        observedAt: string;
      }>;
      diagnostic: {
        id: string;
        errorCode: string;
        errorName?: string;
        ruleCode: string;
        confidence: number;
        evidenceSnippet?: string;
        taxonomyVersion: string;
      } | null;
    }>;
    masterySnapshots: Array<{
      skillCode: string;
      skillName?: string;
      alphaSuccess: number;
      betaFailure: number;
      totalEvidence: number;
      posteriorMean: number;
      uncertainty: number;
      lastObservedAt?: string;
      recomputedAt: string;
    }>;
  }> {
    const token = await getAuthToken();
    const res = await fetch(`${API_BASE_URL}/academic-intelligence/submissions/${submissionId}/provenance`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    const json = await handleApiResponse<{ status: string; data: any }>(
      res,
      "Không thể tải chuỗi mắt xích truy nguyên bài nộp"
    );
    return json.data;
  },

  async getStudentMastery(studentId: string): Promise<{
    student: { userId: string; email: string; fullName?: string; avatarUrl?: string };
    totalEvidences: number;
    masteryCount: number;
    masteries: Array<{
      skillCode: string;
      skillName: string;
      category: string;
      alphaSuccess: number;
      betaFailure: number;
      totalEvidence: number;
      posteriorMean: number;
      uncertainty: number;
      lastObservedAt?: string;
      recomputedAt: string;
    }>;
  }> {
    const token = await getAuthToken();
    const res = await fetch(`${API_BASE_URL}/academic-intelligence/students/${studentId}/mastery`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    const json = await handleApiResponse<{ status: string; data: any }>(
      res,
      "Không thể tải vector năng lực học sinh"
    );
    return json.data;
  },

  async recomputeStudentMastery(studentId: string): Promise<{
    studentId: string;
    skillsRecomputed: number;
    results: any[];
  }> {
    const token = await getAuthToken();
    const res = await fetch(`${API_BASE_URL}/academic-intelligence/students/${studentId}/recompute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    const json = await handleApiResponse<{ status: string; data: any }>(
      res,
      "Không thể kích hoạt tái tính toán năng lực học sinh"
    );
    return json.data;
  },

  async getDiagnosticsOverview(): Promise<{
    totalHypotheses: number;
    activeRules: Array<{
      ruleCode: string;
      name: string;
      errorCode: string;
      description: string;
      confidence: number;
      status: string;
    }>;
    recentHypotheses: Array<{
      id: string;
      errorCode: string;
      errorName: string;
      ruleCode: string;
      confidence: number;
      evidenceSnippet?: string;
      studentName: string;
      studentEmail?: string;
      examTitle: string;
      questionText?: string;
      createdAt: string;
    }>;
  }> {
    const token = await getAuthToken();
    const res = await fetch(`${API_BASE_URL}/academic-intelligence/diagnostics`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    const json = await handleApiResponse<{ status: string; data: any }>(
      res,
      "Không thể tải dữ liệu Diagnostic Engine"
    );
    return json.data;
  },

  async getOntologyOverview(): Promise<{
    skillsCount: number;
    errorsCount: number;
    skills: Array<{
      id: string;
      code: string;
      name: string;
      description?: string;
      macroSkill: string;
      realmTier: string;
      taxonomyVersion: string;
      evidenceCount: number;
      taggedQuestionsCount: number;
    }>;
    errors: Array<{
      id: string;
      code: string;
      name: string;
      description?: string;
      category: string;
      severity: string;
      taxonomyVersion: string;
      hypothesisCount: number;
    }>;
  }> {
    const token = await getAuthToken();
    const res = await fetch(`${API_BASE_URL}/academic-intelligence/ontology`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    const json = await handleApiResponse<{ status: string; data: any }>(
      res,
      "Không thể tải bản đồ Ontology"
    );
    return json.data;
  },

  async runIntegrityAudit(): Promise<{
    timestamp: string;
    isClean: boolean;
    telemetry: {
      totalEvidences: number;
      totalMasteries: number;
      totalDiagnosticHypotheses: number;
    };
    anomalies: {
      outOfBoundsOutcomes: number;
      invalidWeights: number;
      phantomEvidences: number;
    };
    auditGates: Array<{
      gateName: string;
      status: string;
      description: string;
    }>;
  }> {
    const token = await getAuthToken();
    const res = await fetch(`${API_BASE_URL}/academic-intelligence/audit/integrity`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    const json = await handleApiResponse<{ status: string; data: any }>(
      res,
      "Không thể chạy kiểm toán tính toàn vẹn dữ liệu"
    );
    return json.data;
  },
};
