/**
 * Content Sanitization Layer for Learner Vocabulary & Explanations
 * 
 * Invariants:
 * 1. SANITIZATION != SEMANTIC REPAIR: This layer only strips technical/formatting artifacts.
 *    It NEVER alters natural language meaning, translations, or pedagogical explanations.
 * 2. LANGUAGE-AWARE: Preserves 100% of Vietnamese diacritics, English punctuation, and IPA phonetics.
 * 3. NO BLIND REGEX: Removes only explicitly namespaced or technical tokens.
 */

// Known internal token patterns with namespaces or debug structures
const NAMESPACED_INTERNAL_MARKERS = [
  /\[(?:cite|source|system|debug|marker|internal):?[^\]]*\]/gi,
  /__[A-Z0-9_-]+__/g, // e.g. __INTERNAL_TOKEN__
  /\{\{[a-zA-Z0-9_-]+\}\}/g, // e.g. {{SLOT_NAME}}
  /<INTERNAL_[a-zA-Z0-9_-]+>/gi, // e.g. <INTERNAL_REF>
  /<TOKEN_[a-zA-Z0-9_-]+>/gi, // e.g. <TOKEN_VAR>
];

/**
 * Sanitize plain text string for learner UI display
 */
export function sanitizeLearnerText(input: string | null | undefined): string {
  if (!input || typeof input !== "string") return "";

  let text = input.normalize("NFC");

  // 1. Remove namespaced internal tokens & debug markers
  for (const pattern of NAMESPACED_INTERNAL_MARKERS) {
    text = text.replace(pattern, "");
  }

  // 2. Remove JSON artifacts & escaped quotes
  text = text
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/\\\\/g, "\\")
    .replace(/\\n/g, "\n")
    .replace(/\\t/g, " ");

  // 3. Remove invisible Unicode control characters (preserving Vietnamese, IPA, normal whitespace)
  // \u0000-\u0008, \u000B-\u000C, \u000E-\u001F (ASCII control), \u007F-\u009F (C1 control), \u200B (ZWSP), \uFEFF (BOM)
  text = text.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F\u200B\uFEFF]/g, "");

  // 4. Strip artificial repetition glitches (e.g. ====, -----, >>>>> at line start)
  text = text.replace(/^[=\-_*#>]{4,}\s*/gm, "");

  // 5. Normalize whitespace & punctuation spacing safely
  text = text.replace(/[ \t]+/g, " ");
  text = text.replace(/[ \t]+([.,;:!?])/g, "$1");
  text = text.replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n");

  return text.trim();
}

/**
 * Sanitize pronunciation IPA string specifically
 * Strictly ensures phonetic symbols like ˈ, ˌ, æ, ɑː, ɔː, ɜː, θ, ð, ʃ, ʒ, ŋ, etc. are preserved.
 */
export function sanitizeIpaPhonetics(ipa: string | null | undefined): string {
  if (!ipa || typeof ipa !== "string") return "";
  let clean = sanitizeLearnerText(ipa);
  
  // Format with standard slashes if missing and non-empty
  clean = clean.trim();
  if (clean && !clean.startsWith("/")) clean = `/${clean}`;
  if (clean && !clean.endsWith("/")) clean = `${clean}/`;
  
  return clean;
}

/**
 * Recursively sanitize all text fields inside a VocabularyTerm object before rendering
 */
export function sanitizeVocabularyTerm<T extends Record<string, any>>(obj: T): T {
  if (!obj || typeof obj !== "object") return obj;

  const result: any = Array.isArray(obj) ? [] : {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      if (key === "pronunciation") {
        result[key] = sanitizeIpaPhonetics(value);
      } else {
        result[key] = sanitizeLearnerText(value);
      }
    } else if (value && typeof value === "object") {
      result[key] = sanitizeVocabularyTerm(value);
    } else {
      result[key] = value;
    }
  }

  return result as T;
}
