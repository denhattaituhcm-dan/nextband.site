import { describe, it, expect } from "vitest";
import {
  humanizeVocabularyTerm,
  evaluateHumanLikeness,
} from "../services/humanizationEngine";
import { VocabularyTerm } from "../types";

describe("Humanization Engine & Human-Likeness QA", () => {
  it("translates structured cognitive schemas into natural teacher explanations", () => {
    const rawCognitiveTerm: VocabularyTerm = {
      term: "meltwater",
      pronunciation: "/ˈmɛltˌwɔːtər/",
      pos: "noun",
      meaning_en: "water formed by the melting of snow and glacier ice",
      meaning_vi: "nước băng tan",
      context_note: "8 triệu m³ nước băng tan thoát thẳng xuống đáy.",
      cognitive: {
        core_concept: "Nước sinh ra từ quá trình băng tuyết tan chảy do nhiệt độ tăng.",
        cognitive_frame: {
          mental_scene: "Băng tầng tan chảy thành lượng nước lỏng khổng lồ chảy dồn vào lòng hồ.",
        },
        meaning_in_context: "8 triệu m³ nước băng tan tích tụ trong hồ G-4.",
        transfer_contexts: [
          {
            domain_label: "Khí hậu học",
            sentence: "Meltwater lubricates the base of the ice sheet.",
            invariant_connection: "Điểm chung ý niệm: Nước tan chảy chảy xuống làm trơn đáy băng.",
          },
        ],
        contrast: "'meltwater' khác 'rainwater': meltwater sinh ra từ băng tan, không phải từ mưa rơi.",
        retrieval_rule: "Dùng 'meltwater' khi nói về nước bắt nguồn từ băng hoặc tuyết tan.",
      },
    };

    const humanized = humanizeVocabularyTerm(rawCognitiveTerm);
    expect(humanized.humanized).toBeDefined();
    expect(humanized.humanized?.simple_intuition).toBe("Nước sinh ra từ quá trình băng tuyết tan chảy do nhiệt độ tăng.");
    expect(humanized.humanized?.real_world_transfers?.[0].connection_note).toBe("Nước tan chảy chảy xuống làm trơn đáy băng.");
    expect(humanized.humanized?.nuance_warning).toContain("khác 'rainwater'");
  });

  it("passes Human-Likeness QA when explanation is natural and free of internal jargon", () => {
    const cleanExplanation = {
      simple_intuition: "dispense là đưa một thứ ra cho người khác nhận hoặc sử dụng, thường từ một nguồn có sẵn và theo một cách khá có tổ chức.",
      in_context_story: "Buffett đang phân phát những lời khuyên thông thái từ kho tàng kinh nghiệm của mình.",
      real_world_transfers: [
        {
          domain_label: "Y tế",
          sentence: "The hospital pharmacy dispenses medication.",
          connection_note: "Cấp phát thuốc từ kho dược.",
        },
      ],
      nuance_warning: "Phân biệt dispense (cấp phát có hệ thống) với give (trao tặng thông thường).",
      retrieval_tip: "Nghĩ đến dispense khi hành động cấp phát xuất phát từ chuyên môn hoặc thẩm quyền.",
    };

    const qaResult = evaluateHumanLikeness(cleanExplanation);
    expect(qaResult.passed).toBe(true);
    expect(qaResult.score).toBe(100);
    expect(qaResult.feedback.length).toBe(0);
  });

  it("fails Human-Likeness QA if internal framework jargon leaks into learner text", () => {
    const leakedExplanation = {
      simple_intuition: "Tác thể Buffett chuyển vector hướng năng lượng tới đối thể người học theo state transition matrix.",
      in_context_story: "Khung cảnh tâm trí ghi nhận actor-recipient interaction.",
    };

    const qaResult = evaluateHumanLikeness(leakedExplanation);
    expect(qaResult.passed).toBe(false);
    expect(qaResult.score).toBeLessThan(50);
    expect(qaResult.feedback.some((f) => f.includes("leaked internal framework jargon"))).toBe(true);
  });
});
