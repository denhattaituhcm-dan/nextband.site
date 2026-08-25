import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function cleanCorruptedNText(raw: string): string {
  if (!raw) return raw;

  let cleaned = raw;

  // 1. Specific known corrupted phrases from word-wrapping/export defects
  cleaned = cleaned
    .replace(/impressingnteachers/g, "impressing teachers")
    .replace(/trafficncongestion/g, "traffic congestion")
    .replace(/improvenpublic/g, "improve public")
    .replace(/,nrequiring/g, ", requiring")
    .replace(/makingnnavigation/g, "making navigation")
    .replace(/separatenresidential/g, "separate residential")
    .replace(/movenquickly/g, "move quickly")
    .replace(/farnahead/g, "far ahead")
    .replace(/sunlightnwhen/g, "sunlight when")
    .replace(/ofnsomething/g, "of something")
    .replace(/Touristn\s+/g, "Tourist ")
    .replace(/Featuresn\s+/g, "Features ")
    .replace(/andnactivities/g, "and activities");

  // 2. Remove isolated 'n' or 'nn' or 'nnn' between HTML tags, e.g. </p>nn<p>, </li>n<li>, >n<
  // Replace </p>n+<p> with </p><p>
  cleaned = cleaned.replace(/<\/p>\s*n+\s*<p/gi, "</p>\n<p");
  cleaned = cleaned.replace(/<\/p>\s*n+\s*$/gi, "</p>");
  cleaned = cleaned.replace(/<\/div>\s*n+\s*<div/gi, "</div>\n<div");
  cleaned = cleaned.replace(/<\/li>\s*n+\s*<li/gi, "</li>\n<li");
  cleaned = cleaned.replace(/<([a-z0-9]+)>\s*n+\s*<\/\1>/gi, "<$1></$1>");
  cleaned = cleaned.replace(/>\s*n+\s*</gi, "><");

  // 3. Clean trailing/leading stray n after tags: </p>n -> </p>, </strong>n -> </strong>
  cleaned = cleaned.replace(/(<\/[a-z0-9]+>)n+(<[a-z0-9]+>)/gi, "$1\n$2");
  cleaned = cleaned.replace(/(<\/[a-z0-9]+>)n+(\s*)/gi, "$1$2");
  cleaned = cleaned.replace(/(\s*)n+(<[a-z0-9]+>)/gi, "$1$2");

  // 4. Clean Microsoft Word garbage tags if present (<o:p></o:p>, <o:p>&nbsp;</o:p>)
  cleaned = cleaned.replace(/<o:p>\s*(?:&nbsp;)?\s*<\/o:p>/gi, "");

  // 5. Clean standalone empty paragraphs created by stray newlines: <p>&nbsp;</p> if duplicated
  cleaned = cleaned.replace(/(<p>&nbsp;<\/p>\s*){2,}/gi, "<p>&nbsp;</p>");

  return cleaned.trim();
}

async function testCleaning() {
  console.log("=== PREVIEWING CLEANED QUESTIONS ===");

  const allQuestions = await prisma.question.findMany({
    select: { id: true, questionText: true, questionType: true },
  });

  let changedCount = 0;
  for (const q of allQuestions) {
    const original = q.questionText || "";
    const cleaned = cleanCorruptedNText(original);

    if (original !== cleaned) {
      changedCount++;
      console.log(`\n======================================================`);
      console.log(`[QUESTION ${q.id}] (${q.questionType})`);
      console.log(`--- BEFORE ---`);
      console.log(original);
      console.log(`--- AFTER ---`);
      console.log(cleaned);
    }
  }

  // Check QuestionGroups
  const allGroups = await prisma.questionGroup.findMany({
    select: { id: true, title: true, passage: true, instructions: true },
  });

  let changedGroupsCount = 0;
  for (const g of allGroups) {
    const origPassage = g.passage || "";
    const cleanedPassage = cleanCorruptedNText(origPassage);
    const origInst = g.instructions || "";
    const cleanedInst = cleanCorruptedNText(origInst);

    if (origPassage !== cleanedPassage || origInst !== cleanedInst) {
      changedGroupsCount++;
      console.log(`\n======================================================`);
      console.log(`[GROUP ${g.id}] Title: "${g.title}"`);
      if (origPassage !== cleanedPassage) {
        console.log(`--- PASSAGE BEFORE ---`);
        console.log(origPassage.slice(0, 300));
        console.log(`--- PASSAGE AFTER ---`);
        console.log(cleanedPassage.slice(0, 300));
      }
    }
  }

  console.log(`\n======================================================`);
  console.log(`Questions to clean: ${changedCount}`);
  console.log(`Groups to clean: ${changedGroupsCount}`);
}

testCleaning()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
