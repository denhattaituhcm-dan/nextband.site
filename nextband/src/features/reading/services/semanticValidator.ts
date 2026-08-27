import { VocabularyTerm, ExplanationDepth, SemanticValidationReport } from "../types";

/**
 * HIGH-LEVERAGE / ABSTRACT / METAPHORICAL / POLYSEMOUS terms that demand DEEP pedagogical treatment
 */
const DEEP_TERMS_SET = new Set([
  "dispense",
  "dispensing",
  "force multiplier",
  "competitive advantage",
  "compounds over time",
  "compound",
  "compounding",
  "active listening",
  "strategic business skill",
  "earn trust",
  "inspire commitment",
  "navigate conflict",
  "rally people around a vision",
  "replace assumptions with curiosity",
  "remove uncertainty",
]);

/**
 * DOMAIN / TECHNICAL / PHYSICAL MECHANISM terms that need STANDARD structured explanation
 */
const STANDARD_DOMAIN_TERMS_SET = new Set([
  "supraglacial lake",
  "ice sheet",
  "meltwater",
  "crevasse",
  "vertical fracture",
  "horizontal collapse",
  "bedrock",
  "continuous drainage",
  "geothermal heat",
  "perimeter ice ridges",
  "seismic sensor",
  "satellite radar",
  "acoustic water sensors",
  "ice core sampling",
  "volcanic warming",
  "mechanical pressure",
  "lake basin",
  "micro-fractures",
  "hydrostatic pressure",
]);

/**
 * Determine dynamic depth level for any vocabulary term:
 * - "concise": Simple, transparent, everyday words (avoids overwhelming learners with fake 6-part dissertations)
 * - "standard": Domain, scientific, or factual mechanisms (visual scene + precise concept)
 * - "deep": Polysemous, metaphorical, high-leverage strategic concepts (full 5-part teacher walkthrough)
 */
export function determineExplanationDepth(term: VocabularyTerm): ExplanationDepth {
  if (term.depth) return term.depth;

  const clean = term.term.trim().toLowerCase();

  if (DEEP_TERMS_SET.has(clean)) {
    return "deep";
  }

  if (STANDARD_DOMAIN_TERMS_SET.has(clean)) {
    return "standard";
  }

  // Multi-word phrases with 2+ words are usually standard or deep
  if (clean.includes(" ")) {
    return clean.split(" ").length > 2 ? "deep" : "standard";
  }

  // Words with rich cognitive annotations
  if (term.cognitive) {
    if (term.cognitive.transfer_contexts && term.cognitive.transfer_contexts.length >= 3 && term.cognitive.contrast) {
      return "deep";
    }
    if (term.cognitive.contrast || (term.cognitive.transfer_contexts && term.cognitive.transfer_contexts.length > 0)) {
      return "standard";
    }
  }

  return "concise";
}

/**
 * Semantic Validator
 * Pre-humanization quality gate that checks:
 * 1. Over-broadening / pseudo-synonym traps (e.g. dispense = give)
 * 2. Grammatical / POS consistency
 * 3. Metaphor literalization traps (treating metaphorical source as physical storage)
 * 4. Transfer validity
 */
export function validateSemanticEntry(term: VocabularyTerm): SemanticValidationReport {
  const warnings: string[] = [];
  const flags = {
    isOversimplified: false,
    isPosMismatch: false,
    isMetaphorLiteralized: false,
  };

  const depth = determineExplanationDepth(term);
  const cleanTerm = term.term.trim().toLowerCase();
  const rawVi = (term.meaning_vi || "").toLowerCase();
  const coreConcept = (term.cognitive?.core_concept || term.humanized?.simple_intuition || "").toLowerCase();

  // 1. Check for dangerous oversimplification
  if (cleanTerm.includes("dispense")) {
    if (rawVi === "cho" || rawVi === "tặng" || (coreConcept.includes("chỉ là cho") && !coreConcept.includes("nguồn"))) {
      flags.isOversimplified = true;
      warnings.push("Oversimplification warning: 'dispense' must preserve distribution from a source/authority, not generic 'give'.");
    }
  }

  if (cleanTerm.includes("force multiplier")) {
    if (coreConcept.includes("phép cộng") && !coreConcept.includes("nhân") && !coreConcept.includes("khuếch đại")) {
      flags.isOversimplified = true;
      warnings.push("Semantic precision warning: 'force multiplier' represents exponential magnification, not linear addition.");
    }
  }

  // 2. Check for Metaphor Literalization Trap
  if (cleanTerm === "dispensing" || cleanTerm === "dispense") {
    if (coreConcept.includes("cái kho thật") || coreConcept.includes("kho chứa vật lý")) {
      flags.isMetaphorLiteralized = true;
      warnings.push("Metaphor trap: 'dispense advice' has knowledge/experience as metaphorical source, not a physical warehouse.");
    }
  }

  // 3. POS Consistency Check
  const pos = (term.pos || "").toLowerCase();
  if (pos.includes("verb") && (rawVi.startsWith("sự ") || rawVi.startsWith("cuộc "))) {
    flags.isPosMismatch = true;
    warnings.push(`POS mismatch: term '${term.term}' is a verb but Vietnamese gloss starts with noun marker.`);
  }

  return {
    isValid: warnings.length === 0,
    depth,
    warnings: warnings.length > 0 ? warnings : undefined,
    flags,
  };
}
