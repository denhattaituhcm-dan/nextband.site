/**
 * Pedagogical Interpreter — Phase 4: Teacher Pedagogical Insight
 * 
 * CORE PRINCIPLES:
 * 1. Pure domain function — ZERO external dependencies, ZERO database calls, ZERO LLMs.
 * 2. 100% Deterministic — Given the exact same inputs in any order, produces identical output.
 * 3. Never over-conclude beyond evidence:
 *    - If evidence count < MIN_EVIDENCE_FOR_CONCLUSION (3), mark as "Chưa đủ dữ liệu".
 *    - If diagnostic exists, provide clear explanation and actionable tip.
 *    - If no diagnostic exists, do NOT hallucinate or guess mistakes.
 */

export interface RawSkillInput {
  skillId: string;
  skillName: string;
  macroSkill: string;
  totalEvidence: number;
  correctCount: number;
  posteriorMean: number;
}

export interface RawDiagnosticInput {
  skillId?: string;
  errorCode: string;
  errorName: string;
  errorDescription: string;
  hypothesisConfidence: number;
  snippet?: string | null;
  ruleCode?: string | null;
}

export interface StudentMasteryInterpreterInput {
  studentId: string;
  skills: RawSkillInput[];
  diagnostics: RawDiagnosticInput[];
}

export type MasteryPedagogicalStatus = 
  | "INSUFFICIENT_DATA"
  | "NEEDS_REINFORCEMENT"
  | "PROGRESSING"
  | "STRONG";

export interface PedagogicalSkillInsight {
  skillId: string;
  skillName: string;
  macroSkill: string;
  status: MasteryPedagogicalStatus;
  statusLabel: string;
  accuracyText: string;
  evidenceCount: number;
  isStableObservation: boolean;
  frequentMistake?: string;
  actionTip?: string;
}

export interface PedagogicalProfileDTO {
  studentId: string;
  overallStatus: "NEEDS_ATTENTION" | "ON_TRACK" | "INSUFFICIENT_DATA";
  overallSummary: string;
  skillsRequiringAttention: PedagogicalSkillInsight[];
  progressingSkills: PedagogicalSkillInsight[];
  insufficientDataSkills: PedagogicalSkillInsight[];
  recentMistakes: {
    errorCode: string;
    errorName: string;
    description: string;
    evidenceSnippet?: string | null;
  }[];
  generatedAt: string;
}

export const MIN_EVIDENCE_FOR_CONCLUSION = 3;

const PEDAGOGICAL_ACTION_TIPS: Record<string, { mistake: string; tip: string }> = {
  ERR_OVERMATCH_KEYWORD: {
    mistake: "Chọn đáp án dựa vào từ khóa trùng lặp với bài đọc thay vì đối chiếu nghĩa tổng thể.",
    tip: "Dành 5–10 phút luyện nhận diện paraphrase và bẫy từ đồng nghĩa trước khi làm bài full test.",
  },
  ERR_GRAMMAR_AGREEMENT: {
    mistake: "Thường xuyên nhầm lẫn giữa danh từ số ít/số nhiều và chia động từ tương ứng.",
    tip: "Nhắc nhở học sinh gạch chân chủ ngữ chính trước khi chọn hoặc điền dạng động từ.",
  },
  ERR_TASK_RESPONSE_OFFTOPIC: {
    mistake: "Phân tích đề chưa kỹ, trả lời lan man hoặc lạc đề so với trọng tâm câu hỏi.",
    tip: "Yêu cầu học sinh lập dàn ý 3 phút (brainstorm ideas) và đối chiếu với đề bài trước khi viết.",
  },
  ERR_PRON_FINAL_CONSONANT: {
    mistake: "Nuốt âm hoặc bỏ quên các phụ âm cuối (ending sounds: /s/, /t/, /d/, /ed/).",
    tip: "Cho học sinh đọc chậm và nhấn rõ phụ âm đuôi trong các bài shadow reading ngắn.",
  },
};

export function interpretStudentMastery(
  input: StudentMasteryInterpreterInput
): PedagogicalProfileDTO {
  const sortedSkills = [...input.skills].sort((a, b) => a.skillId.localeCompare(b.skillId));

  const skillsRequiringAttention: PedagogicalSkillInsight[] = [];
  const progressingSkills: PedagogicalSkillInsight[] = [];
  const insufficientDataSkills: PedagogicalSkillInsight[] = [];

  for (const skill of sortedSkills) {
    const isStable = skill.totalEvidence >= MIN_EVIDENCE_FOR_CONCLUSION;
    const roundedCorrect = Math.round(skill.correctCount);
    const roundedTotal = Math.round(skill.totalEvidence);

    const matchedDiag = input.diagnostics.find(
      (d) => d.skillId === skill.skillId || (d.ruleCode && d.ruleCode.includes(skill.skillId))
    ) || input.diagnostics[0];

    const actionAdvice = matchedDiag ? PEDAGOGICAL_ACTION_TIPS[matchedDiag.errorCode] : undefined;

    if (!isStable) {
      insufficientDataSkills.push({
        skillId: skill.skillId,
        skillName: skill.skillName,
        macroSkill: skill.macroSkill,
        status: "INSUFFICIENT_DATA",
        statusLabel: "Chưa đủ dữ liệu",
        accuracyText: `Mới có ${roundedTotal} lần quan sát. Cần thêm dữ liệu trước khi kết luận.`,
        evidenceCount: roundedTotal,
        isStableObservation: false,
      });
      continue;
    }

    const successRatio = roundedTotal > 0 ? roundedCorrect / roundedTotal : 0;

    if (successRatio < 0.5) {
      skillsRequiringAttention.push({
        skillId: skill.skillId,
        skillName: skill.skillName,
        macroSkill: skill.macroSkill,
        status: "NEEDS_REINFORCEMENT",
        statusLabel: "Cần củng cố",
        accuracyText: `Đúng ${roundedCorrect}/${roundedTotal} lần quan sát.`,
        evidenceCount: roundedTotal,
        isStableObservation: true,
        frequentMistake: actionAdvice?.mistake || matchedDiag?.errorDescription,
        actionTip: actionAdvice?.tip,
      });
    } else if (successRatio < 0.75) {
      progressingSkills.push({
        skillId: skill.skillId,
        skillName: skill.skillName,
        macroSkill: skill.macroSkill,
        status: "PROGRESSING",
        statusLabel: "Đang tiến bộ",
        accuracyText: `Đúng ${roundedCorrect}/${roundedTotal} lần quan sát.`,
        evidenceCount: roundedTotal,
        isStableObservation: true,
        frequentMistake: actionAdvice?.mistake,
        actionTip: actionAdvice?.tip,
      });
    } else {
      progressingSkills.push({
        skillId: skill.skillId,
        skillName: skill.skillName,
        macroSkill: skill.macroSkill,
        status: "STRONG",
        statusLabel: "Vững vàng",
        accuracyText: `Đúng ${roundedCorrect}/${roundedTotal} lần quan sát.`,
        evidenceCount: roundedTotal,
        isStableObservation: true,
      });
    }
  }

  const recentMistakesMap = new Map<string, {
    errorCode: string;
    errorName: string;
    description: string;
    evidenceSnippet?: string | null;
  }>();

  for (const diag of input.diagnostics) {
    if (!recentMistakesMap.has(diag.errorCode)) {
      recentMistakesMap.set(diag.errorCode, {
        errorCode: diag.errorCode,
        errorName: diag.errorName,
        description: PEDAGOGICAL_ACTION_TIPS[diag.errorCode]?.mistake || diag.errorDescription,
        evidenceSnippet: diag.snippet,
      });
    }
  }

  let overallStatus: "NEEDS_ATTENTION" | "ON_TRACK" | "INSUFFICIENT_DATA" = "ON_TRACK";
  let overallSummary = "Học viên đang tiến bộ tốt ở các kỹ năng đã được đánh giá.";

  if (skillsRequiringAttention.length > 0) {
    overallStatus = "NEEDS_ATTENTION";
    overallSummary = `Phát hiện ${skillsRequiringAttention.length} kỹ năng trọng tâm cần củng cố trước buổi học tiếp theo.`;
  } else if (progressingSkills.length === 0 && insufficientDataSkills.length > 0) {
    overallStatus = "INSUFFICIENT_DATA";
    overallSummary = "Chưa đủ dữ liệu quan sát để đưa ra chẩn đoán học thuật toàn diện.";
  }

  return {
    studentId: input.studentId,
    overallStatus,
    overallSummary,
    skillsRequiringAttention,
    progressingSkills,
    insufficientDataSkills,
    recentMistakes: Array.from(recentMistakesMap.values()),
    generatedAt: new Date().toISOString(),
  };
}