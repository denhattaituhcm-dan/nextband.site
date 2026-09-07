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

async function runRemainingCoursesNormalization() {
  const fs = await import("fs");

  async function backupExam(examId) {
    const current = await prisma.exam.findUnique({
      where: { id: examId },
      include: {
        sections: {
          include: {
            questionGroups: {
              include: {
                questions: true,
              },
            },
          },
        },
      },
    });
    if (current) {
      fs.writeFileSync(`backup_exam_${examId}_before_update.json`, JSON.stringify(current, null, 2), "utf8");
      console.log(`Backed up exam ${examId}`);
    }
    return current;
  }

  function findActiveSection(exam, typeName) {
    if (typeName) {
      const match = exam.sections.find(s => s.sectionType.toLowerCase() === typeName.toLowerCase() && s.questionGroups?.length > 0);
      if (match) return match;
    }
    return exam.sections.find(s => s.questionGroups && s.questionGroups.length > 0) || exam.sections[0];
  }

  // ==========================================
  // 1. KHÓA BUILDER (10 exams)
  // ==========================================
  console.log("\n>>> NORMALIZING BUILDER COURSE...");

  // W1 - D1 - WRI (6f97b762-0c5f-4088-89c9-06665febf36f): Complex sentences with Because, Although, While, If
  {
    const id = "6f97b762-0c5f-4088-89c9-06665febf36f";
    const exam = await backupExam(id);
    let sec = exam.sections.find(s => s.sectionType.toLowerCase() === "writing") || exam.sections[0];
    let group = sec.questionGroups[0];
    if (!group) {
      group = await prisma.questionGroup.create({
        data: {
          sectionId: sec.id,
          title: "Viết câu phức với liên từ phụ thuộc",
          orderIndex: 0,
        },
      });
    }
    const questionsData = [
      {
        questionType: "essay",
        questionText: "<p>Dịch câu sau sang tiếng Anh dùng <strong>Although</strong>:</p><p><em>Mặc dù sống ở thành phố lớn rất thuận tiện, nhiều người vẫn phải đối mặt với mức chi phí sinh hoạt cao.</em></p><p><strong>Gợi ý:</strong> convenient, cost of living</p>",
      },
      {
        questionType: "essay",
        questionText: "<p>Dịch câu sau sang tiếng Anh dùng <strong>Because</strong>:</p><p><em>Nhiều sinh viên lựa chọn học trực tuyến vì hình thức này giúp họ tiết kiệm đáng kể thời gian đi lại.</em></p><p><strong>Gợi ý:</strong> online learning, save commuting time</p>",
      },
      {
        questionType: "essay",
        questionText: "<p>Dịch câu sau sang tiếng Anh dùng <strong>While / Whereas</strong>:</p><p><em>Trong khi người già thích đọc sách giấy truyền thống, người trẻ lại ưa chuộng đọc tin tức trên điện thoại.</em></p><p><strong>Gợi ý:</strong> traditional printed books, prefer reading news on smartphones</p>",
      },
      {
        questionType: "essay",
        questionText: "<p>Dịch câu sau sang tiếng Anh dùng <strong>If</strong>:</p><p><em>Nếu chính phủ đầu tư nhiều hơn vào giao thông công cộng, tình trạng ùn tắc giao thông sẽ giảm bớt.</em></p><p><strong>Gợi ý:</strong> invest in public transport, traffic congestion will decrease</p>",
      },
      {
        questionType: "essay",
        questionText: "<p>Dịch câu sau sang tiếng Anh dùng <strong>Since / As</strong> (nghĩa là bởi vì):</p><p><em>Bởi vì việc tập thể dục thường xuyên giúp cải thiện sức khỏe, các bác sĩ khuyên mọi người nên đi bộ mỗi ngày.</em></p><p><strong>Gợi ý:</strong> regular exercise improves health, recommend walking daily</p>",
      },
    ];
    for (let i = 0; i < questionsData.length; i++) {
      await prisma.question.create({
        data: {
          groupId: group.id,
          questionType: questionsData[i].questionType,
          questionText: questionsData[i].questionText,
          points: 2,
          orderIndex: i,
        },
      });
    }
    await prisma.exam.update({ where: { id }, data: { durationMinutes: 15 } });
    console.log("Updated BUILDER W1-D1-WRI");
  }

  // W1 - D2 - WRI (1b17a391-87b2-4e69-9afc-0f11666b8f2f): Cause & Effect
  {
    const id = "1b17a391-87b2-4e69-9afc-0f11666b8f2f";
    const exam = await backupExam(id);
    let sec = exam.sections.find(s => s.sectionType.toLowerCase() === "writing") || exam.sections[0];
    let group = sec.questionGroups[0];
    if (!group) {
      group = await prisma.questionGroup.create({
        data: {
          sectionId: sec.id,
          title: "Viết câu chỉ nguyên nhân - hệ quả (Cause & Effect)",
          orderIndex: 0,
        },
      });
    }
    const questionsData = [
      {
        questionType: "essay",
        questionText: "<p>Dịch câu sau sang tiếng Anh dùng <strong>As a result / Therefore</strong>:</p><p><em>Nhiều công ty áp dụng công nghệ tự động hóa; do đó, nhu cầu tuyển dụng lao động phổ thông đang giảm mạnh.</em></p><p><strong>Gợi ý:</strong> adopt automation technology, the demand for manual workers</p>",
      },
      {
        questionType: "essay",
        questionText: "<p>Dịch câu sau sang tiếng Anh dùng <strong>lead to / result in</strong>:</p><p><em>Chế độ ăn nhiều đường và ít vận động có thể dẫn đến nhiều vấn đề sức khỏe nghiêm trọng như béo phì.</em></p><p><strong>Gợi ý:</strong> high-sugar diet, lack of physical activity, obesity</p>",
      },
      {
        questionType: "essay",
        questionText: "<p>Dịch câu sau sang tiếng Anh dùng <strong>due to / because of</strong>:</p><p><em>Nhiều chuyến bay đã bị hủy do điều kiện thời tiết xấu và sương mù dày đặc.</em></p><p><strong>Gợi ý:</strong> flights were cancelled, severe weather conditions, dense fog</p>",
      },
      {
        questionType: "essay",
        questionText: "<p>Dịch câu sau sang tiếng Anh dùng <strong>This causes / This leads to</strong>:</p><p><em>Một số học sinh dành quá nhiều thời gian chơi game, điều này khiến các bạn xao nhãng việc học ở trường.</em></p><p><strong>Gợi ý:</strong> spend excessive time gaming, get distracted from schoolwork</p>",
      },
      {
        questionType: "essay",
        questionText: "<p>Dịch câu sau sang tiếng Anh dùng <strong>Consequently</strong>:</p><p><em>Ô nhiễm nguồn nước làm chết nhiều sinh vật biển; hệ quả là, ngư dân địa phương gặp nhiều khó khăn trong mưu sinh.</em></p><p><strong>Gợi ý:</strong> water pollution destroys marine life, local fishermen, struggle to make a living</p>",
      },
    ];
    for (let i = 0; i < questionsData.length; i++) {
      await prisma.question.create({
        data: {
          groupId: group.id,
          questionType: questionsData[i].questionType,
          questionText: questionsData[i].questionText,
          points: 2,
          orderIndex: i,
        },
      });
    }
    await prisma.exam.update({ where: { id }, data: { durationMinutes: 15 } });
    console.log("Updated BUILDER W1-D2-WRI");
  }

  // W1 - D3 - SPK (8949ff5f-89b0-43f3-95c9-6395360b209f): Speaking Part 1
  {
    const id = "8949ff5f-89b0-43f3-95c9-6395360b209f";
    const exam = await backupExam(id);
    let sec = exam.sections.find(s => s.sectionType.toLowerCase() === "speaking") || exam.sections[0];
    let group = sec.questionGroups[0];
    if (!group) {
      group = await prisma.questionGroup.create({
        data: {
          sectionId: sec.id,
          title: "IELTS Speaking Part 1 - Hometown & Study",
          orderIndex: 0,
        },
      });
    }
    await prisma.question.create({
      data: {
        groupId: group.id,
        questionType: "speaking",
        questionText: "<p><strong>Topic: Hometown & Daily Routine</strong></p><p>Thu âm 1 đoạn Voice Memo ngắn (từ <strong>45 đến 60 giây</strong>) trả lời lần lượt 3 câu hỏi sau:</p><ol><li><em>Where is your hometown, and what do you like most about it?</em></li><li><em>Are you currently a student or do you work?</em></li><li><em>What is your favorite time of the day to relax?</em></li></ol><p><em>(Gợi ý: Trả lời tự nhiên, nói từ 2-3 câu cho mỗi câu hỏi, sử dụng câu ghép đơn giản).</em></p>",
        points: 10,
        orderIndex: 0,
      },
    });
    await prisma.exam.update({ where: { id }, data: { durationMinutes: 10 } });
    console.log("Updated BUILDER W1-D3-SPK");
  }

  // W1 - WEEK 2 - DAY 2 (9723db89-10cf-4bf1-89e2-46c1aa65355a): Listening placeholder -> Draft
  {
    const id = "9723db89-10cf-4bf1-89e2-46c1aa65355a";
    await backupExam(id);
    await prisma.exam.update({ where: { id }, data: { isPublished: false, durationMinutes: 15 } });
    console.log("Updated BUILDER WEEK 2 - DAY 2 (Listening pending audio -> Draft)");
  }

  // W2 - DAY 1 - WRITING (602140ec-5622-49b9-b13d-f6afcde3faa2): Describing Trends (Task 1)
  {
    const id = "602140ec-5622-49b9-b13d-f6afcde3faa2";
    const exam = await backupExam(id);
    let sec = exam.sections.find(s => s.sectionType.toLowerCase() === "writing") || exam.sections[0];
    let group = sec.questionGroups[0];
    if (!group) {
      group = await prisma.questionGroup.create({
        data: {
          sectionId: sec.id,
          title: "Writing Task 1 - Từ vựng & Cấu trúc miêu tả xu hướng (Describing Trends)",
          orderIndex: 0,
        },
      });
    }
    const questionsData = [
      {
        questionType: "essay",
        questionText: "<p>Dịch câu sau sang tiếng Anh (dùng động từ <strong>increased significantly</strong>):</p><p><em>Số lượng khách du lịch nước ngoài đến Việt Nam đã tăng đáng kể từ năm 2015 đến năm 2019.</em></p><p><strong>Gợi ý:</strong> The number of international tourists, increase significantly</p>",
      },
      {
        questionType: "essay",
        questionText: "<p>Dịch câu sau sang tiếng Anh (dùng cụm danh từ <strong>experienced a dramatic drop</strong>):</p><p><em>Doanh số bán sách truyền thống đã trải qua một sự sụt giảm mạnh vào năm ngoái.</em></p><p><strong>Gợi ý:</strong> Sales of traditional books, experience a dramatic drop</p>",
      },
      {
        questionType: "essay",
        questionText: "<p>Dịch câu sau sang tiếng Anh (dùng <strong>remained relatively stable at...</strong>):</p><p><em>Tỷ lệ thất nghiệp ở thành phố này giữ ở mức tương đối ổn định khoảng 5% trong suốt giai đoạn.</em></p><p><strong>Gợi ý:</strong> The unemployment rate, remain relatively stable at around 5% throughout the period</p>",
      },
      {
        questionType: "essay",
        questionText: "<p>Dịch câu sau sang tiếng Anh (dùng <strong>fluctuated slightly</strong>):</p><p><em>Giá dầu thế giới đã biến động nhẹ trong khoảng từ 70 đến 80 đô la mỗi thùng.</em></p><p><strong>Gợi ý:</strong> Global oil prices, fluctuate slightly between $70 and $80 per barrel</p>",
      },
      {
        questionType: "essay",
        questionText: "<p>Dịch câu sau sang tiếng Anh (dùng <strong>reached a peak of...</strong>):</p><p><em>Lượng tiêu thụ điện năng đạt mức cao nhất là 500 megawatt vào tháng 7.</em></p><p><strong>Gợi ý:</strong> Electricity consumption, reach a peak of 500 megawatts in July</p>",
      },
    ];
    for (let i = 0; i < questionsData.length; i++) {
      await prisma.question.create({
        data: {
          groupId: group.id,
          questionType: questionsData[i].questionType,
          questionText: questionsData[i].questionText,
          points: 2,
          orderIndex: i,
        },
      });
    }
    await prisma.exam.update({ where: { id }, data: { durationMinutes: 15 } });
    console.log("Updated BUILDER W2-D1-WRI");
  }

  // W2 - DAY 2 - READING AND LISTENING (0eae70b6-0974-4ba9-931e-d88ba7f4cf1b): Listening placeholder -> Draft
  {
    const id = "0eae70b6-0974-4ba9-931e-d88ba7f4cf1b";
    await backupExam(id);
    await prisma.exam.update({ where: { id }, data: { isPublished: false, durationMinutes: 15 } });
    console.log("Updated BUILDER W2-D2 (Listening pending audio -> Draft)");
  }

  // W2 - DAY 3 - SPEAKING (01d610ef-c45d-4ead-bc21-698f9c134103): Speaking Part 2
  {
    const id = "01d610ef-c45d-4ead-bc21-698f9c134103";
    const exam = await backupExam(id);
    let sec = exam.sections.find(s => s.sectionType.toLowerCase() === "speaking") || exam.sections[0];
    let group = sec.questionGroups[0];
    if (!group) {
      group = await prisma.questionGroup.create({
        data: {
          sectionId: sec.id,
          title: "IELTS Speaking Part 2 - A Person You Admire",
          orderIndex: 0,
        },
      });
    }
    await prisma.question.create({
      data: {
        groupId: group.id,
        questionType: "speaking",
        questionText: "<p><strong>IELTS Speaking Part 2 Cue Card:</strong></p><p><strong>Describe a person you admire (e.g., a teacher, a family member, or a well-known person).</strong></p><p><em>You should say:</em></p><ul><li>Who this person is</li><li>How you know this person</li><li>What qualities or achievements this person has</li></ul><p><em>And explain why you admire this person so much.</em></p><p><strong>Yêu cầu thu âm:</strong> Nói liên tục từ <strong>1 đến 2 phút</strong> theo đúng chuẩn IELTS Part 2.</p>",
        points: 10,
        orderIndex: 0,
      },
    });
    await prisma.exam.update({ where: { id }, data: { durationMinutes: 10 } });
    console.log("Updated BUILDER W2-D3-SPK");
  }

  // W3 - DAY 2 - READING AND LISTENING (42cdac7a-fd95-43ce-b506-7b81f12fdbac): Listening placeholder -> Draft
  {
    const id = "42cdac7a-fd95-43ce-b506-7b81f12fdbac";
    await backupExam(id);
    await prisma.exam.update({ where: { id }, data: { isPublished: false, durationMinutes: 15 } });
    console.log("Updated BUILDER W3-D2 (Listening pending audio -> Draft)");
  }

  // W4 - DAY 1 - WRITING (d61570f6-3a0c-4d5f-ac0c-053df51a43cd): Comparisons (Task 1)
  {
    const id = "d61570f6-3a0c-4d5f-ac0c-053df51a43cd";
    const exam = await backupExam(id);
    let sec = exam.sections.find(s => s.sectionType.toLowerCase() === "writing") || exam.sections[0];
    let group = sec.questionGroups[0];
    if (!group) {
      group = await prisma.questionGroup.create({
        data: {
          sectionId: sec.id,
          title: "Writing Task 1 - Cấu trúc so sánh (Comparisons)",
          orderIndex: 0,
        },
      });
    }
    const questionsData = [
      {
        questionType: "essay",
        questionText: "<p>Dịch câu sau sang tiếng Anh dùng so sánh hơn (<strong>higher than / greater than</strong>):</p><p><em>Tỷ lệ người dân sử dụng phương tiện cá nhân tại Hà Nội cao hơn đáng kể so với ở Đà Nẵng.</em></p><p><strong>Gợi ý:</strong> The proportion of residents using private vehicles, significantly higher than</p>",
      },
      {
        questionType: "essay",
        questionText: "<p>Dịch câu sau sang tiếng Anh dùng so sánh gấp đôi (<strong>twice as much/many as...</strong>):</p><p><em>Năm 2020, người dân chi tiêu cho thực phẩm nhiều gấp đôi so với chi tiêu cho giải trí.</em></p><p><strong>Gợi ý:</strong> In 2020, spending on food was twice as high as that on entertainment</p>",
      },
      {
        questionType: "essay",
        questionText: "<p>Dịch câu sau sang tiếng Anh dùng <strong>In stark contrast to...</strong> (ngược lại hoàn toàn):</p><p><em>Trái ngược hoàn toàn với sự tăng trưởng mạnh mẽ của điện gió, sản lượng điện than đã giảm rõ rệt.</em></p><p><strong>Gợi ý:</strong> In stark contrast to the rapid growth of wind power, coal power production declined noticeably</p>",
      },
      {
        questionType: "essay",
        questionText: "<p>Dịch câu sau sang tiếng Anh dùng so sánh bằng (<strong>as popular as...</strong>):</p><p><em>Các khóa học trực tuyến hiện nay gần như phổ biến tương đương với các lớp học truyền thống.</em></p><p><strong>Gợi ý:</strong> Online courses are now almost as popular as traditional classroom lectures</p>",
      },
      {
        questionType: "essay",
        questionText: "<p>Dịch câu sau sang tiếng Anh dùng <strong>accounted for the largest share of...</strong>:</p><p><em>Ngành nông nghiệp chiếm tỷ trọng lớn nhất trong tổng sản phẩm quốc nội (GDP) của quốc gia này.</em></p><p><strong>Gợi ý:</strong> The agricultural sector accounted for the largest share of the country's total GDP</p>",
      },
    ];
    for (let i = 0; i < questionsData.length; i++) {
      await prisma.question.create({
        data: {
          groupId: group.id,
          questionType: questionsData[i].questionType,
          questionText: questionsData[i].questionText,
          points: 2,
          orderIndex: i,
        },
      });
    }
    await prisma.exam.update({ where: { id }, data: { durationMinutes: 15 } });
    console.log("Updated BUILDER W4-D1-WRI");
  }

  // W4 - DAY 3 - SPEAKING (b3abc09a-27cf-4d33-aaf6-4e5b253c7bd4): Speaking Part 2
  {
    const id = "b3abc09a-27cf-4d33-aaf6-4e5b253c7bd4";
    const exam = await backupExam(id);
    let sec = exam.sections.find(s => s.sectionType.toLowerCase() === "speaking") || exam.sections[0];
    let group = sec.questionGroups[0];
    if (!group) {
      group = await prisma.questionGroup.create({
        data: {
          sectionId: sec.id,
          title: "IELTS Speaking Part 2 - A Memorable Journey",
          orderIndex: 0,
        },
      });
    }
    await prisma.question.create({
      data: {
        groupId: group.id,
        questionType: "speaking",
        questionText: "<p><strong>IELTS Speaking Part 2 Cue Card:</strong></p><p><strong>Describe a memorable journey or trip you went on.</strong></p><p><em>You should say:</em></p><ul><li>Where you went and whom you went with</li><li>What transportation you used</li><li>What you did during the trip</li></ul><p><em>And explain why this trip was memorable to you.</em></p><p><strong>Yêu cầu thu âm:</strong> Nói liên tục từ <strong>1 đến 2 phút</strong> theo đúng chuẩn IELTS Part 2.</p>",
        points: 10,
        orderIndex: 0,
      },
    });
    await prisma.exam.update({ where: { id }, data: { durationMinutes: 10 } });
    console.log("Updated BUILDER W4-D3-SPK");
  }


  // ==========================================
  // 2. KHÓA LEADER (27 exams - Level 5.0 - 6.0)
  // ==========================================
  console.log("\n>>> NORMALIZING LEADER COURSE...");

  // Update durationMinutes for all existing LEADER exams to 10-15m
  const leaderExams = await prisma.exam.findMany({
    where: { courseId: "3abdb60a-e2ba-48b1-9661-f56b121cc66d" },
    include: { sections: { include: { questionGroups: { include: { questions: true } } } } }
  });

  for (const e of leaderExams) {
    let qCount = 0;
    e.sections.forEach(s => s.questionGroups.forEach(g => qCount += g.questions.length));

    // Handle the specific empty exams in LEADER:
    if (e.id === "56385f9e-6285-45ff-bdaa-34bf77894264") {
      // W1 - D2 - SPK: Has cue card in group.passage -> create Speaking Q
      await backupExam(e.id);
      const sec = findActiveSection(e, "speaking");
      const group = sec.questionGroups[0];
      if (group && group.questions.length === 0) {
        await prisma.question.create({
          data: {
            groupId: group.id,
            questionType: "speaking",
            questionText: "<p><strong>IELTS Speaking Part 2:</strong></p><p>Hãy dựa vào đề bài Cue Card ở trên và ghi âm bài nói của bạn trong <strong>1 đến 2 phút</strong>.</p>",
            points: 10,
            orderIndex: 0,
          },
        });
      }
      await prisma.exam.update({ where: { id: e.id }, data: { durationMinutes: 10 } });
      console.log("Updated LEADER W1-D2-SPK (Created Q from Cue Card)");
    } else if (e.id === "972253f9-5ffe-4d4b-94e0-05d58acb64df") {
      // W6 - D2 - SPK: Has pie chart in group.passage -> create Writing Task 1 Intro & Overview Q
      await backupExam(e.id);
      const sec = findActiveSection(e);
      const group = sec.questionGroups[0];
      if (group && group.questions.length === 0) {
        await prisma.question.create({
          data: {
            groupId: group.id,
            questionType: "essay",
            questionText: "<p>Dựa vào biểu đồ tròn ở trên, em hãy viết phần <strong>Introduction</strong> và <strong>Overview</strong> (khoảng 35–50 từ) cho bài Writing Task 1 này.</p>",
            points: 10,
            orderIndex: 0,
          },
        });
      }
      await prisma.exam.update({
        where: { id: e.id },
        data: { title: "W6 - D2 - WRI", durationMinutes: 15 },
      });
      console.log("Updated LEADER W6-D2-WRI (Created Task 1 Intro & Overview)");
    } else if (e.id === "ec511f3d-eb3c-4361-b857-dc7917af0c98") {
      // W6 - D3: Speaking Part 2 Environment
      await backupExam(e.id);
      let sec = findActiveSection(e, "speaking");
      let group = sec.questionGroups[0];
      if (!group) {
        group = await prisma.questionGroup.create({
          data: { sectionId: sec.id, title: "IELTS Speaking Part 2 - Environment", orderIndex: 0 },
        });
      }
      await prisma.question.create({
        data: {
          groupId: group.id,
          questionType: "speaking",
          questionText: "<p><strong>Describe an environmental problem or pollution issue in your city.</strong></p><p><em>You should say:</em></p><ul><li>What it is and where it happens</li><li>What causes this problem</li><li>How it affects people's daily lives</li></ul><p><em>And explain what actions should be taken to solve it.</em></p><p><strong>Yêu cầu:</strong> Ghi âm bài nói từ <strong>1 đến 2 phút</strong> theo chuẩn IELTS Part 2.</p>",
          points: 10,
          orderIndex: 0,
        },
      });
      await prisma.exam.update({
        where: { id: e.id },
        data: { title: "W6 - D3 - SPK", durationMinutes: 10 },
      });
      console.log("Updated LEADER W6-D3-SPK (Created Part 2 Environment)");
    } else if (e.id === "370ec730-aec6-4f2f-bcaa-7fed37a77baa" || e.id === "6f40c0c8-f13c-4e85-b269-83fa9f681804") {
      // Listening pending audio -> Draft
      await backupExam(e.id);
      await prisma.exam.update({
        where: { id: e.id },
        data: { isPublished: false, durationMinutes: 15 },
      });
      console.log(`Updated LEADER ${e.title} (Pending audio -> Draft)`);
    } else {
      // Standard exam: set durationMinutes
      const newDur = e.title.includes("SPK") ? 10 : (qCount > 10 ? 20 : 15);
      await prisma.exam.update({
        where: { id: e.id },
        data: { durationMinutes: newDur },
      });
    }
  }
  console.log("All LEADER exams updated!");


  // ==========================================
  // 3. KHÓA MASTER (29 exams - Level 6.0 - 7.0+)
  // ==========================================
  console.log("\n>>> NORMALIZING MASTER COURSE...");

  const masterExams = await prisma.exam.findMany({
    where: { courseId: "86c74efa-2b5e-4676-8a36-ad7cf575d15e" },
    include: { sections: { include: { questionGroups: { include: { questions: true } } } } }
  });

  for (const e of masterExams) {
    let qCount = 0;
    e.sections.forEach(s => s.questionGroups.forEach(g => qCount += g.questions.length));

    if (e.id === "69978b48-2da1-446e-86f3-282aad324bcc") {
      // W6 - D1 - WRITING: Full essay prompt
      await backupExam(e.id);
      const sec = findActiveSection(e, "writing");
      const group = sec.questionGroups[0];
      if (group && group.questions.length === 0) {
        await prisma.question.create({
          data: {
            groupId: group.id,
            questionType: "essay",
            questionText: "<p><strong>IELTS Writing Task 2:</strong></p><p><em>Some people believe that unpaid community service should be a compulsory part of high school programmes (for example, working for a charity, improving the neighborhood, or teaching sports to younger children).</em></p><p><strong>To what extent do you agree or disagree?</strong></p><p>Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.</p>",
            points: 10,
            orderIndex: 0,
          },
        });
      }
      await prisma.exam.update({ where: { id: e.id }, data: { durationMinutes: 30 } });
      console.log("Updated MASTER W6-D1-WRI (Added Task 2 Essay)");
    } else if (e.id === "ecc20724-165c-45fa-a66a-646dd593b163") {
      // W7 - D3 - SPEAKING: Part 2 prompt
      await backupExam(e.id);
      const sec = findActiveSection(e, "speaking");
      const group = sec.questionGroups[0];
      if (group && group.questions.length === 0) {
        await prisma.question.create({
          data: {
            groupId: group.id,
            questionType: "speaking",
            questionText: "<p><strong>IELTS Speaking Part 2 Cue Card:</strong></p><p><strong>Describe an artificial intelligence (AI) tool or piece of modern technology that you find helpful in your study or work.</strong></p><p><em>You should say:</em></p><ul><li>What it is and how you learned about it</li><li>How often you use it</li><li>What features make it helpful</li></ul><p><em>And explain how it has changed the way you study or work.</em></p><p><strong>Yêu cầu:</strong> Ghi âm bài nói từ <strong>1 đến 2 phút</strong> theo chuẩn IELTS Part 2.</p>",
            points: 10,
            orderIndex: 0,
          },
        });
      }
      await prisma.exam.update({ where: { id: e.id }, data: { durationMinutes: 10 } });
      console.log("Updated MASTER W7-D3-SPK (Added Part 2 AI/Tech)");
    } else {
      // Standard exam: set durationMinutes
      const newDur = e.title.includes("FINAL") || e.title.includes("EXTRA") ? 30 : (e.title.includes("SPK") ? 10 : (qCount > 10 ? 25 : 15));
      await prisma.exam.update({
        where: { id: e.id },
        data: { durationMinutes: newDur },
      });
    }
  }
  console.log("All MASTER exams updated!");

  console.log("\n=======================================================");
  console.log("ALL REMAINING COURSES (BUILDER, LEADER, MASTER) UPDATED!");
  console.log("=======================================================");
  await prisma.$disconnect();
}

runRemainingCoursesNormalization().catch(console.error);
