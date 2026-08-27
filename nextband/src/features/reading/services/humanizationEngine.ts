import { VocabularyTerm, HumanizedExplanation, HumanizedTransferItem } from "../types";
import { determineExplanationDepth } from "./semanticValidator";

/**
 * List of forbidden internal framework jargon that MUST NEVER leak into learner UI
 */
const FORBIDDEN_LEAKED_JARGON = [
  "tác thể",
  "đối thể",
  "thực thể trao",
  "khung cảnh tâm trí",
  "khái niệm lõi (core concept)",
  "khái niệm lõi",
  "semantic invariant",
  "actor-recipient",
  "cognitive frame",
  "participant structure",
  "state transition matrix",
  "vector hướng",
  "điểm chung ý niệm:",
];

/**
 * Transforms structured internal cognitive representation into pedagogical human teacher voice
 */
export function humanizeVocabularyTerm(term: VocabularyTerm): VocabularyTerm {
  const depth = determineExplanationDepth(term);

  // If the term already has a crafted humanized explanation, preserve it
  if (term.humanized) {
    return {
      ...term,
      depth,
    };
  }

  const cleanTerm = term.term.trim();
  const cleanVi = (term.meaning_vi || "").replace(/^(Từ vựng|Cụm từ):\s*/i, "").trim();
  const primaryVi = cleanVi.split("/")[0].trim();
  const pos = (term.pos || "").toLowerCase();

  // If cognitive data exists, translate structured fields into natural teacher phrasing
  if (term.cognitive) {
    let simple_intuition = term.cognitive.core_concept || "";
    
    // Clean any textbook academic start
    simple_intuition = simple_intuition
      .replace(/^Khái niệm lõi:\s*/i, "")
      .replace(/^Hành động hoặc tiến trình mà chủ thể/i, `Khi người bản ngữ dùng "${cleanTerm}", họ muốn diễn đạt việc`)
      .replace(/^Khái niệm lõi chỉ một thực thể/i, `"${cleanTerm}" dùng để chỉ`);

    // In-context story
    let in_context_story = term.cognitive.meaning_in_context || term.context_note || "";
    if (term.cognitive.cognitive_frame?.mental_scene && !in_context_story.includes(term.cognitive.cognitive_frame.mental_scene)) {
      // Blend mental scene into context smoothly if helpful
      if (!in_context_story) {
        in_context_story = term.cognitive.cognitive_frame.mental_scene;
      }
    }

    // Transfers
    const real_world_transfers: HumanizedTransferItem[] = [];
    if (term.cognitive.transfer_contexts && term.cognitive.transfer_contexts.length > 0) {
      for (const t of term.cognitive.transfer_contexts) {
        // Strip dry "Điểm chung ý niệm:" prefix
        const cleanNote = (t.invariant_connection || "").replace(/^Điểm chung ý niệm:\s*/i, "").trim();
        real_world_transfers.push({
          domain_label: t.domain_label,
          sentence: t.sentence,
          connection_note: cleanNote,
        });
      }
    }

    // Nuance warning & contrast
    let nuance_warning: string | undefined = undefined;
    if (term.cognitive.contrast || term.cognitive.boundaries) {
      const parts: string[] = [];
      if (term.cognitive.contrast) {
        parts.push(term.cognitive.contrast);
      }
      if (term.cognitive.boundaries) {
        parts.push(`Lưu ý: ${term.cognitive.boundaries}`);
      }
      nuance_warning = parts.join("\n\n");
    }

    // Retrieval tip
    const retrieval_tip = term.cognitive.retrieval_rule || undefined;

    return {
      ...term,
      depth,
      humanized: {
        simple_intuition,
        in_context_story,
        real_world_transfers: real_world_transfers.length > 0 ? real_world_transfers : undefined,
        nuance_warning,
        retrieval_tip,
      },
    };
  }

  // Dynamic pedagogical synthesis for terms without manual cognitive entries
  const englishClarification = term.meaning_en && term.meaning_en !== term.term
    ? ` (“${term.meaning_en}”)`
    : "";

  let simple_intuition = "";
  if (term.context_note && term.context_note.length > 25) {
    simple_intuition = `“${cleanTerm}” mang ý niệm “${primaryVi}”${englishClarification}. Từ này được dùng để chỉ bản chất thực tế trong bài: ${term.context_note}`;
  } else {
    simple_intuition = `“${cleanTerm}” diễn đạt ý niệm “${primaryVi}”${englishClarification}, giúp làm sáng tỏ trọng tâm ý nghĩa của câu văn.`;
  }

  const in_context_story = term.context_note
    ? `Trong văn cảnh này: ${term.context_note}`
    : `Trong ngữ cảnh bài đọc, tác giả sử dụng “${cleanTerm}” với hàm ý “${primaryVi}”.`;

  const nuance_warning: string | undefined = undefined;
  const retrieval_tip: string | undefined = depth === "deep"
    ? `Khi gặp văn cảnh liên quan đến “${primaryVi}” → Chú ý đến thuật ngữ “${cleanTerm.toUpperCase()}”.`
    : undefined;
  const real_world_transfers: HumanizedTransferItem[] = [];

  return {
    ...term,
    depth,
    humanized: {
      simple_intuition,
      in_context_story,
      real_world_transfers: depth !== "concise" && real_world_transfers.length > 0 ? real_world_transfers : undefined,
      nuance_warning,
      retrieval_tip,
    },
  };
}

/**
 * 5-Question Human-Likeness QA Evaluator
 */
export function evaluateHumanLikeness(explanation: HumanizedExplanation): {
  passed: boolean;
  score: number; // 0 to 100
  feedback: string[];
} {
  const feedback: string[] = [];
  let deduction = 0;

  const combinedText = [
    explanation.simple_intuition,
    explanation.in_context_story || "",
    explanation.nuance_warning || "",
    explanation.retrieval_tip || "",
    ...(explanation.real_world_transfers?.map((t) => `${t.sentence} ${t.connection_note}`) || []),
  ].join(" ").toLowerCase();

  // 1. Check for leaked internal framework jargon
  for (const jargon of FORBIDDEN_LEAKED_JARGON) {
    if (combinedText.includes(jargon)) {
      feedback.push(`Found leaked internal framework jargon: "${jargon}"`);
      deduction += 25;
    }
  }

  // 2. Check for over-academic passive AI taxonomy openers
  if (/^(phân tích ngữ nghĩa|định nghĩa từ vựng|cấu trúc cú pháp):/i.test(explanation.simple_intuition)) {
    feedback.push("Explanation begins with mechanical AI taxonomy label.");
    deduction += 20;
  }

  const score = Math.max(0, 100 - deduction);

  return {
    passed: score >= 80,
    score,
    feedback,
  };
}
