import { describe, it, expect } from "vitest";
import {
  interpretStudentMastery,
  StudentMasteryInterpreterInput,
} from "../domain/student-model/pedagogical-interpreter.js";

describe("Phase 4 — Pedagogical Interpreter Domain Math & Pedagogical Rules", () => {
  it("Gate 1: Mastery cao (>= 75%) -> Trạng thái 'Vững vàng'", () => {
    const input: StudentMasteryInterpreterInput = {
      studentId: "std-001",
      skills: [
        {
          skillId: "SKILL_READ_LOCATE",
          skillName: "Locating Information",
          macroSkill: "READING",
          totalEvidence: 10,
          correctCount: 9,
          posteriorMean: 0.9,
        },
      ],
      diagnostics: [],
    };

    const res = interpretStudentMastery(input);
    expect(res.skillsRequiringAttention.length).toBe(0);
    expect(res.progressingSkills.length).toBe(1);
    expect(res.progressingSkills[0].status).toBe("STRONG");
    expect(res.progressingSkills[0].statusLabel).toBe("Vững vàng");
    expect(res.progressingSkills[0].accuracyText).toBe("Đúng 9/10 lần quan sát.");
  });

  it("Gate 2: Mastery trung bình (50% - 74%) -> Trạng thái 'Đang tiến bộ'", () => {
    const input: StudentMasteryInterpreterInput = {
      studentId: "std-002",
      skills: [
        {
          skillId: "SKILL_READ_SKIM",
          skillName: "Skimming for Gist",
          macroSkill: "READING",
          totalEvidence: 8,
          correctCount: 5,
          posteriorMean: 0.62,
        },
      ],
      diagnostics: [],
    };

    const res = interpretStudentMastery(input);
    expect(res.skillsRequiringAttention.length).toBe(0);
    expect(res.progressingSkills.length).toBe(1);
    expect(res.progressingSkills[0].status).toBe("PROGRESSING");
    expect(res.progressingSkills[0].statusLabel).toBe("Đang tiến bộ");
    expect(res.progressingSkills[0].accuracyText).toBe("Đúng 5/8 lần quan sát.");
  });

  it("Gate 3: Mastery thấp (< 50%) -> Trạng thái 'Cần củng cố'", () => {
    const input: StudentMasteryInterpreterInput = {
      studentId: "std-003",
      skills: [
        {
          skillId: "SKILL_READ_PARAPHRASE",
          skillName: "Recognizing Paraphrase",
          macroSkill: "READING",
          totalEvidence: 11,
          correctCount: 4,
          posteriorMean: 0.38,
        },
      ],
      diagnostics: [],
    };

    const res = interpretStudentMastery(input);
    expect(res.overallStatus).toBe("NEEDS_ATTENTION");
    expect(res.skillsRequiringAttention.length).toBe(1);
    expect(res.skillsRequiringAttention[0].status).toBe("NEEDS_REINFORCEMENT");
    expect(res.skillsRequiringAttention[0].statusLabel).toBe("Cần củng cố");
    expect(res.skillsRequiringAttention[0].accuracyText).toBe("Đúng 4/11 lần quan sát.");
  });

  it("Gate 4: Dữ liệu ít (< 3 lần quan sát) -> 'Chưa đủ dữ liệu', KHÔNG quy chụp lỗi", () => {
    const input: StudentMasteryInterpreterInput = {
      studentId: "std-004",
      skills: [
        {
          skillId: "SKILL_WRITE_COHESION",
          skillName: "Cohesion & Coherence",
          macroSkill: "WRITING",
          totalEvidence: 2,
          correctCount: 0, // Dù làm sai 2/2 nhưng chỉ mới có 2 quan sát
          posteriorMean: 0.25,
        },
      ],
      diagnostics: [],
    };

    const res = interpretStudentMastery(input);
    expect(res.skillsRequiringAttention.length).toBe(0);
    expect(res.insufficientDataSkills.length).toBe(1);
    expect(res.insufficientDataSkills[0].status).toBe("INSUFFICIENT_DATA");
    expect(res.insufficientDataSkills[0].statusLabel).toBe("Chưa đủ dữ liệu");
    expect(res.insufficientDataSkills[0].accuracyText).toContain("Mới có 2 lần quan sát");
  });

  it("Gate 5: Có diagnostic -> Hiển thị thói quen sai và gợi ý can thiệp", () => {
    const input: StudentMasteryInterpreterInput = {
      studentId: "std-005",
      skills: [
        {
          skillId: "SKILL_READ_PARAPHRASE",
          skillName: "Recognizing Paraphrase",
          macroSkill: "READING",
          totalEvidence: 10,
          correctCount: 3,
          posteriorMean: 0.3,
        },
      ],
      diagnostics: [
        {
          errorCode: "ERR_OVERMATCH_KEYWORD",
          errorName: "Keyword Matching Bias",
          errorDescription: "Chọn đáp án dựa vào từ khóa",
          hypothesisConfidence: 0.85,
          skillId: "SKILL_READ_PARAPHRASE",
        },
      ],
    };

    const res = interpretStudentMastery(input);
    const item = res.skillsRequiringAttention[0];
    expect(item.frequentMistake).toBe(
      "Chọn đáp án dựa vào từ khóa trùng lặp với bài đọc thay vì đối chiếu nghĩa tổng thể."
    );
    expect(item.actionTip).toContain("Dành 5–10 phút luyện nhận diện paraphrase");
  });

  it("Gate 6: Không có diagnostic -> Không bịa insight hay hallucinate", () => {
    const input: StudentMasteryInterpreterInput = {
      studentId: "std-006",
      skills: [
        {
          skillId: "SKILL_UNKNOWN",
          skillName: "Rare Skill",
          macroSkill: "GENERAL",
          totalEvidence: 5,
          correctCount: 1,
          posteriorMean: 0.2,
        },
      ],
      diagnostics: [],
    };

    const res = interpretStudentMastery(input);
    const item = res.skillsRequiringAttention[0];
    expect(item.frequentMistake).toBeUndefined();
    expect(item.actionTip).toBeUndefined();
    expect(res.recentMistakes.length).toBe(0);
  });

  it("Gate 7: Thứ tự evidence thay đổi -> Kết quả giống nhau 100% (Permutation Invariance)", () => {
    const skillA = {
      skillId: "SKILL_A",
      skillName: "Alpha",
      macroSkill: "READING",
      totalEvidence: 10,
      correctCount: 3,
      posteriorMean: 0.3,
    };
    const skillB = {
      skillId: "SKILL_B",
      skillName: "Beta",
      macroSkill: "LISTENING",
      totalEvidence: 10,
      correctCount: 9,
      posteriorMean: 0.9,
    };

    const run1 = interpretStudentMastery({
      studentId: "std-007",
      skills: [skillA, skillB],
      diagnostics: [],
    });

    const run2 = interpretStudentMastery({
      studentId: "std-007",
      skills: [skillB, skillA],
      diagnostics: [],
    });

    // Strip generatedAt since timestamp differs by milliseconds
    run1.generatedAt = "";
    run2.generatedAt = "";

    expect(run1).toEqual(run2);
  });
});
