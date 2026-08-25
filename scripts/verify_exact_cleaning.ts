import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function cleanCorruptedNContent(raw: string): string {
  if (!raw || typeof raw !== "string") return raw;

  let cleaned = raw;

  // 1. Specific corrupted words where \n between two words got stripped of \
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

  // 2. Trailing 'n' before parentheses containing hints: e.g. "____.n(responsible)" -> "____. (responsible)"
  cleaned = cleaned.replace(/([._a-zA-Z0-9])n\(([a-zA-Z0-9\s:;,/-]+)\)/g, "$1\n($2)");

  // 3. Leading 'n' after opening list item tag: e.g. "<li>nto view" -> "<li>to view"
  cleaned = cleaned.replace(/<li>n([a-zA-Z])/gi, "<li>$1");

  // 4. Clean stray 'n' between HTML tags:
  // e.g. </p>nn<p>, </p>n<p>, </h3>n<p>, </div>n<p>, </li>n<li>, </ul>n<ul>, </ul>n<p>, </ul>n<li>
  cleaned = cleaned.replace(/(<\/(?:p|div|h[1-6]|li|ul|ol|strong|b|i|em)>)\s*n{1,4}\s*(<(?:p|div|h[1-6]|li|ul|ol|strong|b|i|em)[ >])/gi, "$1\n$2");
  
  // 5. Clean stray 'n' between closing tag and opening tag of any element: e.g. >nn< -> ><
  cleaned = cleaned.replace(/>\s*n{1,4}\s*</g, "><");

  // 6. Clean isolated 'nn' standalone lines: e.g. "</p>\nnn\n<p>" or "</p>nn" at end of string
  cleaned = cleaned.replace(/<\/p>\s*n{1,4}\s*$/gi, "</p>");

  // 7. Clean Microsoft Word artifact tags <o:p></o:p> and <o:p>&nbsp;</o:p>
  cleaned = cleaned.replace(/<o:p>\s*(?:&nbsp;)?\s*<\/o:p>/gi, "");

  // 8. Clean trailing space-n before tag, e.g. "something n<p>" -> "something \n<p>"
  cleaned = cleaned.replace(/\s+n\s*(<p[ >])/gi, "\n$1");

  return cleaned.trim();
}

async function verifyAndDisplayCleaned() {
  console.log("=== VERIFYING EXACT CLEANING RULES (PREVIEW) ===");

  const allQuestions = await prisma.question.findMany({
    select: {
      id: true,
      questionText: true,
      questionType: true,
      group: {
        select: {
          title: true,
          section: {
            select: {
              exam: { select: { title: true } },
            },
          },
        },
      },
    },
  });

  let totalQuestionsCleaned = 0;
  for (const q of allQuestions) {
    const orig = q.questionText || "";
    const clean = cleanCorruptedNContent(orig);

    if (orig !== clean) {
      totalQuestionsCleaned++;
      console.log(`\n======================================================`);
      console.log(`[#${totalQuestionsCleaned}] Exam: "${q.group?.section?.exam?.title}" | Question: ${q.id} (${q.questionType})`);
      console.log(`--- BEFORE ---`);
      console.log(orig);
      console.log(`--- AFTER ---`);
      console.log(clean);
    }
  }

  // Also check QuestionGroups
  const allGroups = await prisma.questionGroup.findMany();
  let totalGroupsCleaned = 0;
  for (const g of allGroups) {
    const origPassage = g.passage || "";
    const cleanPassage = cleanCorruptedNContent(origPassage);
    const origInst = g.instructions || "";
    const cleanInst = cleanCorruptedNContent(origInst);

    if (origPassage !== cleanPassage || origInst !== cleanInst) {
      totalGroupsCleaned++;
      console.log(`\n======================================================`);
      console.log(`[GROUP #${totalGroupsCleaned}] Group ID: ${g.id} Title: "${g.title}"`);
      if (origPassage !== cleanPassage) {
        console.log(`--- PASSAGE BEFORE ---`);
        console.log(origPassage.slice(0, 300));
        console.log(`--- PASSAGE AFTER ---`);
        console.log(cleanPassage.slice(0, 300));
      }
    }
  }

  console.log(`\n======================================================`);
  console.log(`SUMMARY: ${totalQuestionsCleaned} questions and ${totalGroupsCleaned} groups will be cleaned.`);
}

verifyAndDisplayCleaned()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
