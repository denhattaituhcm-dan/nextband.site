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
    .replace(/andnactivities/g, "and activities")
    .replace(/beenn\s+/g, "been ")
    .replace(/–n\s+/g, "– ")
    .replace(/-n\s+/g, "- ");

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

async function executeDatabaseClean() {
  console.log("🚀 Starting database cleanup for corrupted 'n' characters...");

  // 1. Clean Questions
  const allQuestions = await prisma.question.findMany({
    select: { id: true, questionText: true },
  });

  let questionsUpdated = 0;
  for (const q of allQuestions) {
    const orig = q.questionText || "";
    const clean = cleanCorruptedNContent(orig);

    if (orig !== clean) {
      await prisma.question.update({
        where: { id: q.id },
        data: { questionText: clean },
      });
      questionsUpdated++;
    }
  }

  // 2. Clean QuestionGroups
  const allGroups = await prisma.questionGroup.findMany({
    select: { id: true, passage: true, instructions: true },
  });

  let groupsUpdated = 0;
  for (const g of allGroups) {
    const origPassage = g.passage || "";
    const cleanPassage = cleanCorruptedNContent(origPassage);
    const origInst = g.instructions || "";
    const cleanInst = cleanCorruptedNContent(origInst);

    if (origPassage !== cleanPassage || origInst !== cleanInst) {
      await prisma.questionGroup.update({
        where: { id: g.id },
        data: {
          passage: cleanPassage !== origPassage ? cleanPassage : undefined,
          instructions: cleanInst !== origInst ? cleanInst : undefined,
        },
      });
      groupsUpdated++;
    }
  }

  console.log(`\n✅ Database cleanup completed successfully!`);
  console.log(`- Questions cleaned & updated: ${questionsUpdated}`);
  console.log(`- Question Groups cleaned & updated: ${groupsUpdated}`);
}

executeDatabaseClean()
  .catch((e) => {
    console.error("❌ Cleanup failed:", e);
  })
  .finally(() => prisma.$disconnect());
