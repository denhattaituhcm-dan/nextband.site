/**
 * HTML Normalizer for IELTS LMS Question and Content
 *
 * Strips disruptive font-size, font-family, line-height, and Word/Google Docs styling artifacts
 * while preserving semantic markup (bold, italic, underline, lists, tables, images, fill blank tokens, intentional highlights).
 */

function normalizeColor(colorStr: string): string {
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

/**
 * Normalizes question HTML content:
 * 1. Strips <font> tags and size/face attributes.
 * 2. Strips inline font-size, font-family, line-height, margin/padding styles.
 * 3. Converts H1-H6 headings into <p><strong>...</strong></p> to prevent gigantic fonts while keeping emphasis.
 * 4. Preserves semantic structures: bold, italic, underline, lists, tables, links, images, colors.
 * 5. Cleans up redundant empty tags and normalize spacing.
 */
export function normalizeQuestionHtml(rawHtml: string | null | undefined): string {
  if (!rawHtml) return "";
  
  // Fast path for simple plain text without HTML tags
  if (!/<[a-z][\s\S]*>/i.test(rawHtml)) {
    return rawHtml.trim();
  }

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawHtml, "text/html");
    const body = doc.body;

    const cleanNode = (node: Node): Node | null => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.cloneNode(true);
      }

      if (node.nodeType !== Node.ELEMENT_NODE) {
        return null;
      }

      const el = node as HTMLElement;
      const tagName = el.tagName.toUpperCase();
      const styleAttr = (el.getAttribute("style") || "").toLowerCase();

      // Detect font-weight attributes (e.g. Google Docs/Word wrappers vs real bold)
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
      // When pasting from Google Docs, it wraps the entire text in <b style="font-weight:normal;">.
      // We must unwrap this fake bold tag to prevent regular text from becoming bold!
      if ((tagName === "B" || tagName === "STRONG") && isNormalFontWeight) {
        const frag = doc.createDocumentFragment();
        el.childNodes.forEach((child) => {
          const cleanedChild = cleanNode(child);
          if (cleanedChild) frag.appendChild(cleanedChild);
        });
        return frag;
      }

      // 2. Convert headings (H1-H6) to <p> to prevent gigantic fonts without forcing bold
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
      const cleanedChildren: Node[] = [];
      el.childNodes.forEach((child) => {
        const cleanedChild = cleanNode(child);
        if (cleanedChild) cleanedChildren.push(cleanedChild);
      });

      // Wrap helper for semantic styles extracted from inline CSS (e.g. span style="font-weight:bold")
      const applySemanticWrappers = (targetNode: Node): Node => {
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

      // If tag is not in allowed list (e.g. <font>, <o:p>, custom tags), unwrap and return fragment with semantic wrappers
      if (!targetTagName) {
        const frag = doc.createDocumentFragment();
        cleanedChildren.forEach((child) => frag.appendChild(child));
        return applySemanticWrappers(frag);
      }

      // If SPAN has no meaningful attributes (no color/bg, no class, no dataset), unwrap it
      const hasDataAttrs = Array.from(el.attributes).some(
        (attr) => attr.name.startsWith("data-fill-blank") || attr.name.startsWith("data-blank-id"),
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

      // Preserve specific allowed attributes
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

      // Preserve normalized color & background-color only
      if (styleColor && styleColor !== "#000000" && styleColor !== "inherit") {
        newEl.style.color = styleColor;
      }
      if (styleBg && styleBg !== "transparent") {
        newEl.style.backgroundColor = styleBg;
      }

      // Preserve app-specific data attributes (fill blank tokens, etc.)
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

    // Clean up empty paragraphs like <p></p> or <p><br></p><p><br></p> sequences
    result = result
      .replace(/(<p>\s*<\/p>)+/gi, "")
      .replace(/(<p>\s*<br\s*\/?>\s*<\/p>\s*){2,}/gi, "<p><br></p>")
      .trim();

    return result || rawHtml.trim();
  } catch (err) {
    console.error("normalizeQuestionHtml error:", err);
    return rawHtml.trim();
  }
}
