import crypto from "crypto";
import { GeminiInferenceProvider } from "./lexiconInferenceProvider.js";

// In-memory cache fallback (In production, postgres/supabase context_lexicon_cache is queried)
const localCache = new Map();
const userMemories = new Set();

const inferenceProvider = new GeminiInferenceProvider();
const ANALYSIS_VERSION = "cognitive-v1";
const CONTENT_VERSION = "v1";

function computeContextHash(text) {
  return crypto.createHash("sha256").update(text.trim().toLowerCase()).digest("hex");
}

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    return res.end();
  }

  // Router dispatcher based on path suffix
  const path = req.url || "";

  if (path.endsWith("/save")) {
    if (req.method !== "POST") {
      res.statusCode = 455;
      return res.end(JSON.stringify({ message: "Method not allowed" }));
    }

    try {
      const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
      const { normalizedTerm, sourceContentRef, contextText } = body;

      if (!normalizedTerm) {
        res.statusCode = 400;
        return res.end(JSON.stringify({ message: "Missing normalizedTerm" }));
      }

      const memoryKey = `${normalizedTerm}:${sourceContentRef || "default"}`;
      userMemories.add(memoryKey);

      res.statusCode = 200;
      return res.end(
        JSON.stringify({
          success: true,
          memoryId: `mem_${Date.now()}`,
          message: "Saved to personal learning memory",
        })
      );
    } catch (err) {
      res.statusCode = 500;
      return res.end(JSON.stringify({ message: err.message }));
    }
  }

  // POST /api/v1/lexicon/understand
  if (req.method !== "POST") {
    res.statusCode = 405;
    return res.end(JSON.stringify({ message: "Method not allowed" }));
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const { selection, contextSnippet, sourceContentRef } = body;

    if (!selection) {
      res.statusCode = 400;
      return res.end(JSON.stringify({ message: "Selection text is required" }));
    }

    const normalizedTerm = selection.trim().toLowerCase();
    const contextText = contextSnippet || selection;
    const contextHash = computeContextHash(contextText);
    const contentRef = sourceContentRef || "canonical_content";

    // Composite Cache Key: (normalized_term + context_hash + source_content_version + analysis_version)
    const cacheKey = `${normalizedTerm}:${contextHash}:${CONTENT_VERSION}:${ANALYSIS_VERSION}`;

    let payload = localCache.get(cacheKey);

    if (!payload) {
      // CACHE MISS: Execute Inference Provider
      payload = await inferenceProvider.understand({
        normalizedTerm,
        contextText,
        analysisVersion: ANALYSIS_VERSION,
      });

      // Persist Derived Cache
      localCache.set(cacheKey, payload);
    }

    // Check if user has saved this before
    const memoryKey = `${normalizedTerm}:${contentRef}`;
    const isSaved = userMemories.has(memoryKey);

    res.statusCode = 200;
    return res.end(
      JSON.stringify({
        ...payload,
        isSaved,
      })
    );
  } catch (err) {
    console.error("[LexiconUnderstand] Error:", err);
    res.statusCode = 500;
    return res.end(
      JSON.stringify({
        message: "Không thể bóc tách ngữ cảnh từ vựng lúc này.",
        error: err.message,
      })
    );
  }
}
