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
 * Follows the 3-Tier Cognitive Linguistics Framework:
 * 1. Simple Intuition: Source Domain / Image Schema -> Target Domain Mapping
 * 2. In-Context Story: Contextual Touchpoint / Aha-moment (why this word, locks into sentence)
 * 3. Nuance Warning: Direct Image Schema comparison with easily confused words
 */
export function humanizeVocabularyTerm(
  term: VocabularyTerm,
  currentSentence?: string,
  isCrossCaseFallback: boolean = false
): VocabularyTerm {
  const depth = determineExplanationDepth(term);

  // If the term already has a crafted humanized explanation
  if (term.humanized) {
    // If it's a cross-case fallback, avoid leaking another case's in_context_story
    if (isCrossCaseFallback) {
      const sanitizedStory = currentSentence && currentSentence.trim().length > 0
        ? `Trong câu văn bạn đang đọc: “${currentSentence.trim()}” — tác giả sử dụng “${term.term}” để làm sáng tỏ ý niệm này.`
        : `Trong bài đọc hiện tại, từ “${term.term}” mang hàm ý “${term.meaning_vi}”.`;

      return {
        ...term,
        depth,
        humanized: {
          ...term.humanized,
          in_context_story: sanitizedStory,
        },
      };
    }

    return {
      ...term,
      depth,
    };
  }

  const cleanTerm = term.term.trim();
  const cleanVi = (term.meaning_vi || "").replace(/^(Từ vựng|Cụm từ):\s*/i, "").trim();
  const primaryVi = cleanVi.includes(" / ") ? cleanVi.split(" / ")[0].trim() : cleanVi;

  // If cognitive data exists, translate structured fields into natural teacher phrasing
  if (term.cognitive) {
    let simple_intuition = term.cognitive.core_concept || "";
    
    // Clean any textbook academic start
    simple_intuition = simple_intuition
      .replace(/^Khái niệm lõi:\s*/i, "")
      .replace(/^Hành động hoặc tiến trình mà chủ thể/i, `Khi người bản ngữ dùng "${cleanTerm}", họ muốn diễn đạt việc`)
      .replace(/^Khái niệm lõi chỉ một thực thể/i, `"${cleanTerm}" dùng để chỉ`);

    // In-context story (Aha-moment)
    let in_context_story = "";
    if (isCrossCaseFallback) {
      in_context_story = currentSentence && currentSentence.trim().length > 0
        ? `Trong câu văn bạn đang đọc: “${currentSentence.trim()}” — từ “${cleanTerm}” được vận dụng để làm sáng tỏ mạch lập luận.`
        : `Trong văn cảnh bài đọc hiện tại, tác giả sử dụng “${cleanTerm}” với hàm ý “${primaryVi}”.`;
    } else {
      in_context_story = term.cognitive.meaning_in_context || term.context_note || "";
      if (term.cognitive.cognitive_frame?.mental_scene && !in_context_story.includes(term.cognitive.cognitive_frame.mental_scene)) {
        if (!in_context_story) {
          in_context_story = term.cognitive.cognitive_frame.mental_scene;
        }
      }
    }

    // Transfers
    const real_world_transfers: HumanizedTransferItem[] = [];
    if (term.cognitive.transfer_contexts && term.cognitive.transfer_contexts.length > 0) {
      for (const t of term.cognitive.transfer_contexts) {
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

  // Dynamic pedagogical synthesis for Tier 2 terms without manual cognitive entries
  const englishClarification = term.meaning_en && term.meaning_en.toLowerCase() !== cleanTerm.toLowerCase()
    ? ` (${term.meaning_en})`
    : "";

  // Natural teacher voice: concise, direct, zero robotic jargon
  const simple_intuition = `Diễn đạt ý nghĩa “${primaryVi}”${englishClarification}.`;

  let in_context_story = "";
  if (isCrossCaseFallback) {
    in_context_story = currentSentence && currentSentence.trim().length > 0
      ? `Trong câu văn bạn đang đọc: “${currentSentence.trim()}” — tác giả sử dụng “${cleanTerm}” để làm nổi bật luận điểm chính.`
      : `Trong bài đọc hiện tại, “${cleanTerm}” mang hàm ý “${primaryVi}”.`;
  } else {
    // Directly present the sentence-specific context note naturally
    in_context_story = term.context_note || (currentSentence ? `Gắn với câu: “${currentSentence.trim()}”` : "");
  }

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
