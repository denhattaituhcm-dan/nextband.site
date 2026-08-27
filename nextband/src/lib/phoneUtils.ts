/**
 * Utility for phone number normalization and heuristic advisory matching.
 * Standardizes Vietnamese phone numbers into canonical format (10 digits starting with 0).
 */

export function normalizePhoneNumber(rawPhone?: string | null): string {
  if (!rawPhone) return "";
  
  // 1. Remove all non-numeric characters (spaces, dashes, dots, parentheses, plus sign)
  let digits = rawPhone.replace(/\D/g, "");
  
  // 2. Normalize country code (+84 or 84) to local leading 0
  if (digits.startsWith("84") && digits.length >= 11) {
    digits = "0" + digits.slice(2);
  }
  
  return digits;
}

export function isSamePhoneNumber(phoneA?: string | null, phoneB?: string | null): boolean {
  const normA = normalizePhoneNumber(phoneA);
  const normB = normalizePhoneNumber(phoneB);
  if (!normA || !normB) return false;
  return normA === normB;
}

export function formatPhoneDisplay(rawPhone?: string | null): string {
  const norm = normalizePhoneNumber(rawPhone);
  if (!norm) return rawPhone || "—";
  if (norm.length === 10) {
    return `${norm.slice(0, 4)} ${norm.slice(4, 7)} ${norm.slice(7)}`;
  }
  return norm;
}
