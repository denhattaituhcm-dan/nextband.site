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

      // Convert headings to <p><strong>...</strong></p>
      if (["H1", "H2", "H3", "H4", "H5", "H6"].includes(tagName)) {
        const pEl = doc.createElement("p");
        const strongEl = doc.createElement("strong");
        
        el.childNodes.forEach((child) => {
          const cleanedChild = cleanNode(child);
          if (cleanedChild) strongEl.appendChild(cleanedChild);
        });

        if (!strongEl.textContent?.trim() && strongEl.children.length === 0) {
          return null;
        }

        pEl.appendChild(strongEl);
        return pEl;
      }

      // Convert structural block tags (DIV, SECTION, ARTICLE) to P
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

      // If tag is not in allowed list (e.g. <font>, <o:p>, custom tags), unwrap and return fragment
      if (!targetTagName) {
        const frag = doc.createDocumentFragment();
        cleanedChildren.forEach((child) => frag.appendChild(child));
        return frag;
      }

      // If SPAN has no meaningful attributes (no color/bg, no class, no dataset), unwrap it
      if (targetTagName === "SPAN" && !styleColor && !styleBg && !el.className && el.attributes.length === 0) {
        const frag = doc.createDocumentFragment();
        cleanedChildren.forEach((child) => frag.appendChild(child));
        return frag;
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

      return newEl;
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
