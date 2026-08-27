import { JSDOM } from "jsdom";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>");
const { window } = dom;
const { Node, HTMLElement, DOMParser } = window;

function normalizeColor(colorStr) {
  if (!colorStr) return "";
  const trimmed = colorStr.trim().toLowerCase();
  if (trimmed === "transparent" || trimmed === "rgba(0, 0, 0, 0)") return "";
  if (trimmed.startsWith("#")) {
    if (trimmed.length === 4) {
      return `#${trimmed[1]}${trimmed[1]}${trimmed[2]}${trimmed[2]}${trimmed[3]}${trimmed[3]}`;
    }
    return trimmed;
  }
  const rgbMatch = trimmed.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1], 10).toString(16).padStart(2, "0");
    const g = parseInt(rgbMatch[2], 10).toString(16).padStart(2, "0");
    const b = parseInt(rgbMatch[3], 10).toString(16).padStart(2, "0");
    return `#${r}${g}${b}`;
  }
  return trimmed;
}

const ALLOWED_TAGS = new Set([
  "P",
  "BR",
  "STRONG",
  "B",
  "EM",
  "I",
  "U",
  "S",
  "SPAN",
  "MARK",
  "A",
  "UL",
  "OL",
  "LI",
  "IMG",
  "TABLE",
  "THEAD",
  "TBODY",
  "TFOOT",
  "TR",
  "TH",
  "TD",
  "CAPTION",
  "COLGROUP",
  "COL",
  "SUB",
  "SUP",
  "BLOCKQUOTE",
  "CODE",
]);

function cleanStringPreNormalization(raw) {
  if (!raw || typeof raw !== "string") return raw;

  let s = raw;
  const isJson = (s.startsWith("{") && s.endsWith("}")) || (s.startsWith("[") && s.endsWith("]"));
  if (isJson) return s;

  // Unescape backslashes before quotes
  s = s.replace(/\\"/g, '"');
  s = s.replace(/\\'/g, "'");
  s = s.replace(/\\&quot;/g, '"');
  s = s.replace(/&quot;/g, '"');

  // Convert literal \r\n, \n to newline or space
  s = s.replace(/\\r\\n/g, "\n");
  s = s.replace(/\\n/g, "\n");
  s = s.replace(/\\r/g, "");
  s = s.replace(/\\t/g, " ");

  // Fix literal "/n" when used as newline artifact
  s = s.replace(/(?<=\S)\s*\/n\s*(?=\S)/g, " ");
  s = s.replace(/(?:^|\n)\s*\/n\s*(?=\n|$)/g, "\n");
  s = s.replace(/(?<=[.,!?:;])\s*\/n\s*/g, "\n");
  s = s.replace(/<br\s*\/?>\s*\/n\s*/gi, "<br>");
  s = s.replace(/\/n\s*<br\s*\/?>/gi, "<br>");

  return s;
}

export function normalizeHtml(rawHtml) {
  if (!rawHtml) return "";

  const precleaned = cleanStringPreNormalization(rawHtml);
  if (!precleaned) return "";

  // Fast path for simple plain text without HTML tags
  if (!/<[a-z][\s\S]*>/i.test(precleaned)) {
    // If it has multiple newlines, format into clean text
    return precleaned.trim();
  }

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(precleaned, "text/html");
    const body = doc.body;

    const cleanNode = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const textVal = (node.textContent || "").replace(/\r/g, "");
        const cleanedText = textVal
          .replace(/\\n/g, " ")
          .replace(/(?<=\S)\s*\/n\s*(?=\S)/g, " ")
          .replace(/\n+/g, " ");
        return doc.createTextNode(cleanedText);
      }

      if (node.nodeType !== Node.ELEMENT_NODE) {
        return null;
      }

      const el = node;
      const tagName = el.tagName.toUpperCase();
      const styleAttr = (el.getAttribute("style") || "").toLowerCase();

      // Detect font-weight attributes
      const isNormalFontWeight =
        el.style.fontWeight === "normal" ||
        el.style.fontWeight === "400" ||
        el.style.fontWeight === "lighter" ||
        styleAttr.includes("font-weight:normal") ||
        styleAttr.includes("font-weight: normal") ||
        styleAttr.includes("font-weight:400") ||
        styleAttr.includes("font-weight: 400") ||
        styleAttr.includes("mso-bidi-font-weight:normal") ||
        el.id?.startsWith("docs-internal-guid");

      const isBoldFontWeight =
        !isNormalFontWeight &&
        (el.style.fontWeight === "bold" ||
          el.style.fontWeight === "700" ||
          el.style.fontWeight === "800" ||
          el.style.fontWeight === "900" ||
          styleAttr.includes("font-weight:bold") ||
          styleAttr.includes("font-weight: bold") ||
          styleAttr.includes("font-weight:700") ||
          styleAttr.includes("font-weight: 700") ||
          styleAttr.includes("font-weight:800") ||
          styleAttr.includes("font-weight:900"));

      const isItalicStyle =
        el.style.fontStyle === "italic" ||
        styleAttr.includes("font-style:italic") ||
        styleAttr.includes("font-style: italic");

      const isUnderlineStyle =
        el.style.textDecoration?.includes("underline") ||
        styleAttr.includes("text-decoration:underline") ||
        styleAttr.includes("text-decoration: underline");

      const isStrikeStyle =
        el.style.textDecoration?.includes("line-through") ||
        styleAttr.includes("text-decoration:line-through") ||
        styleAttr.includes("text-decoration: line-through");

      // 1. Google Docs / Word normal weight wrapper detection for <B> and <STRONG>
      if ((tagName === "B" || tagName === "STRONG") && isNormalFontWeight) {
        const frag = doc.createDocumentFragment();
        el.childNodes.forEach((child) => {
          const cleanedChild = cleanNode(child);
          if (cleanedChild) frag.appendChild(cleanedChild);
        });
        return frag;
      }

      // 2. Convert headings (H1-H6) to <p>
      if (["H1", "H2", "H3", "H4", "H5", "H6"].includes(tagName)) {
        const pEl = doc.createElement("p");
        el.childNodes.forEach((child) => {
          const cleanedChild = cleanNode(child);
          if (cleanedChild) pEl.appendChild(cleanedChild);
        });

        if (!pEl.textContent?.trim() && pEl.children.length === 0) {
          return null;
        }

        return pEl;
      }

      // Convert structural block tags (DIV, SECTION, ARTICLE, HEADER, FOOTER) to P
      const isDivLike = ["DIV", "SECTION", "ARTICLE", "HEADER", "FOOTER"].includes(tagName);
      const targetTagName = isDivLike
        ? "P"
        : ALLOWED_TAGS.has(tagName)
        ? tagName
        : null;

      // Extract allowed inline styles (color, backgroundColor) only
      const styleColor = el.style.color ? normalizeColor(el.style.color) : "";
      const styleBg = el.style.backgroundColor ? normalizeColor(el.style.backgroundColor) : "";

      // Process children recursively
      const cleanedChildren = [];
      el.childNodes.forEach((child) => {
        const cleanedChild = cleanNode(child);
        if (cleanedChild) cleanedChildren.push(cleanedChild);
      });

      const applySemanticWrappers = (targetNode) => {
        let currentNode = targetNode;
        if (isBoldFontWeight && tagName !== "STRONG" && tagName !== "B") {
          const strong = doc.createElement("strong");
          strong.appendChild(currentNode);
          currentNode = strong;
        }
        if (isItalicStyle && tagName !== "EM" && tagName !== "I") {
          const em = doc.createElement("em");
          em.appendChild(currentNode);
          currentNode = em;
        }
        if (isUnderlineStyle && tagName !== "U") {
          const u = doc.createElement("u");
          u.appendChild(currentNode);
          currentNode = u;
        }
        if (isStrikeStyle && tagName !== "S") {
          const s = doc.createElement("s");
          s.appendChild(currentNode);
          currentNode = s;
        }
        return currentNode;
      };

      if (!targetTagName) {
        const frag = doc.createDocumentFragment();
        cleanedChildren.forEach((child) => frag.appendChild(child));
        return applySemanticWrappers(frag);
      }

      const hasDataAttrs = Array.from(el.attributes).some(
        (attr) => attr.name.startsWith("data-fill-blank") || attr.name.startsWith("data-blank-id")
      );

      if (
        targetTagName === "SPAN" &&
        !styleColor &&
        !styleBg &&
        !el.className &&
        !hasDataAttrs
      ) {
        const frag = doc.createDocumentFragment();
        cleanedChildren.forEach((child) => frag.appendChild(child));
        return applySemanticWrappers(frag);
      }

      const newEl = doc.createElement(targetTagName);
      cleanedChildren.forEach((child) => newEl.appendChild(child));

      if (targetTagName === "A" && el.hasAttribute("href")) {
        newEl.setAttribute("href", el.getAttribute("href") || "#");
        newEl.setAttribute("target", "_blank");
        newEl.setAttribute("rel", "noopener noreferrer");
      }

      if (targetTagName === "IMG" && el.hasAttribute("src")) {
        newEl.setAttribute("src", el.getAttribute("src") || "");
        if (el.hasAttribute("alt")) newEl.setAttribute("alt", el.getAttribute("alt") || "");
        newEl.className = "rounded-md my-2 max-w-full h-auto";
      }

      if (["TH", "TD"].includes(targetTagName)) {
        if (el.hasAttribute("colspan")) newEl.setAttribute("colspan", el.getAttribute("colspan") || "1");
        if (el.hasAttribute("rowspan")) newEl.setAttribute("rowspan", el.getAttribute("rowspan") || "1");
      }

      if (styleColor && styleColor !== "#000000" && styleColor !== "inherit" && styleColor !== "#0f1729") {
        newEl.style.color = styleColor;
      }
      if (styleBg && styleBg !== "transparent") {
        newEl.style.backgroundColor = styleBg;
      }

      Array.from(el.attributes).forEach((attr) => {
        if (attr.name.startsWith("data-fill-blank") || attr.name.startsWith("data-blank-id")) {
          newEl.setAttribute(attr.name, attr.value);
        }
      });

      return applySemanticWrappers(newEl);
    };

    const container = doc.createElement("div");
    body.childNodes.forEach((child) => {
      const cleaned = cleanNode(child);
      if (cleaned) container.appendChild(cleaned);
    });

    let result = container.innerHTML.trim();

    result = result
      .replace(/(<p>\s*<\/p>)+/gi, "")
      .replace(/(<p>\s*<br\s*\/?>\s*<\/p>\s*){2,}/gi, "<p><br></p>")
      .trim();

    return result || precleaned.trim();
  } catch (err) {
    console.error("normalizeHtml error:", err);
    return precleaned.trim();
  }
}

async function runBatchNormalization(dryRun = true) {
  console.log(`\n========================================`);
  console.log(`STARTING BATCH NORMALIZATION (dryRun = ${dryRun})`);
  console.log(`========================================\n`);

  let updatedSections = 0;
  let updatedGroups = 0;
  let updatedQuestions = 0;

  // 1. ExamSections
  const sections = await prisma.examSection.findMany();
  console.log(`Scanning ${sections.length} ExamSections...`);
  for (const s of sections) {
    let changed = false;
    const updates = {};

    if (s.instructions) {
      const norm = normalizeHtml(s.instructions);
      if (norm !== s.instructions) {
        updates.instructions = norm;
        changed = true;
      }
    }
    if (s.audioScript) {
      const norm = normalizeHtml(s.audioScript);
      if (norm !== s.audioScript) {
        updates.audioScript = norm;
        changed = true;
      }
    }

    if (changed) {
      updatedSections++;
      if (!dryRun) {
        await prisma.examSection.update({
          where: { id: s.id },
          data: updates,
        });
      }
    }
  }

  // 2. QuestionGroups
  const groups = await prisma.questionGroup.findMany();
  console.log(`Scanning ${groups.length} QuestionGroups...`);
  for (const g of groups) {
    let changed = false;
    const updates = {};

    if (g.passage) {
      const norm = normalizeHtml(g.passage);
      if (norm !== g.passage) {
        updates.passage = norm;
        changed = true;
      }
    }
    if (g.instructions) {
      const norm = normalizeHtml(g.instructions);
      if (norm !== g.instructions) {
        updates.instructions = norm;
        changed = true;
      }
    }

    if (changed) {
      updatedGroups++;
      if (!dryRun) {
        await prisma.questionGroup.update({
          where: { id: g.id },
          data: updates,
        });
      }
    }
  }

  // 3. Questions
  const questions = await prisma.question.findMany();
  console.log(`Scanning ${questions.length} Questions...`);
  for (const q of questions) {
    let changed = false;
    const updates = {};

    if (q.questionText) {
      const norm = normalizeHtml(q.questionText);
      if (norm !== q.questionText) {
        updates.questionText = norm;
        changed = true;
      }
    }

    if (changed) {
      updatedQuestions++;
      if (!dryRun) {
        await prisma.question.update({
          where: { id: q.id },
          data: updates,
        });
      }
    }
  }

  console.log(`\n========================================`);
  console.log(`BATCH NORMALIZATION SUMMARY (dryRun = ${dryRun})`);
  console.log(`========================================`);
  console.log(`ExamSections to update: ${updatedSections} / ${sections.length}`);
  console.log(`QuestionGroups to update: ${updatedGroups} / ${groups.length}`);
  console.log(`Questions to update: ${updatedQuestions} / ${questions.length}`);

  await prisma.$disconnect();
}

const isDryRun = process.argv.includes("--dry-run");
runBatchNormalization(isDryRun).catch(console.error);
