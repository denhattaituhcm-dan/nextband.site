import { describe, it, expect } from "vitest";
import { normalizeQuestionHtml } from "../htmlNormalizer";

describe("HTML Question Normalizer", () => {
  it("returns empty string for null or empty input", () => {
    expect(normalizeQuestionHtml("")).toBe("");
    expect(normalizeQuestionHtml(null)).toBe("");
    expect(normalizeQuestionHtml(undefined)).toBe("");
  });

  it("preserves plain text without modification", () => {
    const text = "1) Nguyên nhân (Cause)\nMột phần người trẻ phụ thuộc vào mạng xã hội.";
    expect(normalizeQuestionHtml(text)).toBe(text);
  });

  it("strips font tags and size attributes", () => {
    const dirty = `<font size="5" face="Arial"><strong>1) Nguyên nhân (Cause)</strong></font><p><font size="2">Một phần, việc người trẻ phụ thuộc...</font></p>`;
    const normalized = normalizeQuestionHtml(dirty);
    expect(normalized).not.toContain("<font");
    expect(normalized).not.toContain('size="5"');
    expect(normalized).not.toContain('face="Arial"');
    expect(normalized).toContain("<strong>1) Nguyên nhân (Cause)</strong>");
    expect(normalized).toContain("<p>Một phần, việc người trẻ phụ thuộc...</p>");
  });

  it("strips inline font-size, font-family, and noisy Word styles", () => {
    const dirty = `<p style="font-size: 24pt; font-family: 'Times New Roman'; line-height: 150%; margin-top: 10px;">Một phần, việc người trẻ phụ thuộc vào mạng xã hội</p>`;
    const normalized = normalizeQuestionHtml(dirty);
    expect(normalized).not.toContain("font-size");
    expect(normalized).not.toContain("font-family");
    expect(normalized).not.toContain("line-height");
    expect(normalized).toBe("<p>Một phần, việc người trẻ phụ thuộc vào mạng xã hội</p>");
  });

  it("converts H1/H2/H3 headings to <p> without forcing bold on regular text", () => {
    const dirty = `<h3>Part 1: Introduction</h3><p>Please translate the following sentence.</p>`;
    const normalized = normalizeQuestionHtml(dirty);
    expect(normalized).not.toContain("<h3");
    expect(normalized).toContain("<p>Part 1: Introduction</p>");
    expect(normalized).toContain("<p>Please translate the following sentence.</p>");
  });

  it("unwraps Google Docs false bold wrappers (b style='font-weight:normal')", () => {
    const googleDocsHtml = `<b id="docs-internal-guid-12345" style="font-weight:normal;"><p><span>Học cách dùng 1 số từ vựng</span></p></b>`;
    const normalized = normalizeQuestionHtml(googleDocsHtml);
    expect(normalized).not.toContain("<b");
    expect(normalized).not.toContain("<strong");
    expect(normalized).toBe("<p>Học cách dùng 1 số từ vựng</p>");
  });

  it("preserves intentional bold text inside Google Docs content while keeping normal text normal", () => {
    const googleDocsMixed = `<b style="font-weight: normal;"><p><span>Đây là chữ thường, </span><span style="font-weight: 700;">đây là in đậm</span><span>, và tiếp tục là chữ thường.</span></p></b>`;
    const normalized = normalizeQuestionHtml(googleDocsMixed);
    expect(normalized).toContain("<strong>đây là in đậm</strong>");
    expect(normalized).toContain("Đây là chữ thường, ");
    expect(normalized).toContain(", và tiếp tục là chữ thường.");
  });

  it("preserves lists, bold, italic, and underline tags", () => {
    const input = `<p><strong>Gợi ý:</strong></p><ul><li><em>in part</em></li><li><u>be due to</u></li><li><strong>coupled with this</strong></li></ul>`;
    const normalized = normalizeQuestionHtml(input);
    expect(normalized).toContain("<strong>Gợi ý:</strong>");
    expect(normalized).toContain("<ul>");
    expect(normalized).toContain("<li><em>in part</em></li>");
    expect(normalized).toContain("<li><u>be due to</u></li>");
    expect(normalized).toContain("<li><strong>coupled with this</strong></li>");
  });

  it("preserves tables and cell structure", () => {
    const input = `<table><thead><tr><th>Header 1</th><th>Header 2</th></tr></thead><tbody><tr><td>Cell 1</td><td>Cell 2</td></tr></tbody></table>`;
    const normalized = normalizeQuestionHtml(input);
    expect(normalized).toContain("<table");
    expect(normalized).toContain("<th>Header 1</th>");
    expect(normalized).toContain("<td>Cell 1</td>");
  });

  it("preserves fill in the blank data attributes", () => {
    const input = `<p>I have lived here <span data-fill-blank="true" data-blank-id="1">[1]</span> 2010.</p>`;
    const normalized = normalizeQuestionHtml(input);
    expect(normalized).toContain('data-fill-blank="true"');
    expect(normalized).toContain('data-blank-id="1"');
  });

  it("preserves intentional colors and background highlights", () => {
    const input = `<p><span style="color: #ef4444;">Từ quan trọng</span> và <span style="background-color: #fef08a;">highlight</span></p>`;
    const normalized = normalizeQuestionHtml(input);
    expect(normalized).toContain('style="color: rgb(239, 68, 68);"');
    expect(normalized).toContain('style="background-color: rgb(254, 240, 138);"');
  });

  it("cleans literal /n and \\n newline artifacts", () => {
    const dirty = `<p class=\\"MsoNormal\\">Đoạn văn 1 /n Đoạn văn 2 với literal\\nnewline và \\"quotes\\".</p>`;
    const normalized = normalizeQuestionHtml(dirty);
    expect(normalized).not.toContain("/n");
    expect(normalized).not.toContain("\\n");
    expect(normalized).not.toContain('\\"');
    expect(normalized).toContain("Đoạn văn 1 Đoạn văn 2 với literal newline và \"quotes\".");
  });
});

