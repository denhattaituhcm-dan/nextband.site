import { PrismaClient, ExamSectionType } from "@prisma/client";

const prisma = new PrismaClient();

interface SectionDef {
  sectionType: ExamSectionType;
  title: string;
  orderIndex: number;
}

function classifyExam(exam: {
  id: string;
  title: string;
  course?: { id: string; title: string; slug: string | null } | null;
}): { classification: "REPAIRABLE" | "AMBIGUOUS"; reason: string; sections: SectionDef[] } {
  const title = exam.title.trim();
  const courseTitle = exam.course?.title?.trim() || "";

  // Priority 1: Course Context
  if (/EXTRA LISTENING/i.test(courseTitle)) {
    return {
      classification: "REPAIRABLE",
      reason: `Course context: ${courseTitle}`,
      sections: [{ sectionType: "listening", title: "Listening", orderIndex: 0 }],
    };
  }

  // Priority 2: Explicit Skill Semantics in Title
  if (/- SPK\b|SPEAKING/i.test(title)) {
    return {
      classification: "REPAIRABLE",
      reason: "Title matches Speaking skill",
      sections: [{ sectionType: "speaking", title: "Speaking", orderIndex: 0 }],
    };
  }

  if (/- WRI\b|WRITING TEST|DAY \d+ - WRITING/i.test(title)) {
    return {
      classification: "REPAIRABLE",
      reason: "Title matches Writing skill",
      sections: [{ sectionType: "writing", title: "Writing", orderIndex: 0 }],
    };
  }

  if (/- LIS\b|LISTENING/i.test(title)) {
    return {
      classification: "REPAIRABLE",
      reason: "Title matches Listening skill",
      sections: [{ sectionType: "listening", title: "Listening", orderIndex: 0 }],
    };
  }

  if (/- REA\b|READING/i.test(title) && !/READING AND (WRITING|LISTENING)/i.test(title)) {
    return {
      classification: "REPAIRABLE",
      reason: "Title matches Reading skill",
      sections: [{ sectionType: "reading", title: "Reading", orderIndex: 0 }],
    };
  }

  if (/READING AND WRITING|READING & WRITING/i.test(title)) {
    return {
      classification: "REPAIRABLE",
      reason: "Title matches dual skill Reading + Writing",
      sections: [
        { sectionType: "reading", title: "Reading", orderIndex: 0 },
        { sectionType: "writing", title: "Writing", orderIndex: 1 },
      ],
    };
  }

  if (/READING AND LISTENING|READING & LISTENING/i.test(title)) {
    return {
      classification: "REPAIRABLE",
      reason: "Title matches dual skill Reading + Listening",
      sections: [
        { sectionType: "listening", title: "Listening", orderIndex: 0 },
        { sectionType: "reading", title: "Reading", orderIndex: 1 },
      ],
    };
  }

  if (/VOCAB/i.test(title)) {
    return {
      classification: "REPAIRABLE",
      reason: "Title matches Vocabulary/Grammar skill",
      sections: [{ sectionType: "general", title: "Vocabulary & Grammar", orderIndex: 0 }],
    };
  }

  if (/MOCK|PLACEMENT/i.test(title)) {
    return {
      classification: "REPAIRABLE",
      reason: "Title matches Full Mock Test",
      sections: [
        { sectionType: "listening", title: "Listening", orderIndex: 0 },
        { sectionType: "reading", title: "Reading", orderIndex: 1 },
        { sectionType: "writing", title: "Writing", orderIndex: 2 },
        { sectionType: "speaking", title: "Speaking", orderIndex: 3 },
        { sectionType: "general", title: "Grammar", orderIndex: 4 },
      ],
    };
  }

  if (/- WR\b/i.test(title)) {
    return {
      classification: "REPAIRABLE",
      reason: "Title suffix - WR matches Writing & Reading",
      sections: [
        { sectionType: "reading", title: "Reading", orderIndex: 0 },
        { sectionType: "writing", title: "Writing", orderIndex: 1 },
      ],
    };
  }

  // Priority 3: Schedule Pattern Inferences for ambiguous day homeworks (e.g. W8 - D2 in Leader)
  if (/D2\b/i.test(title)) {
    return {
      classification: "REPAIRABLE",
      reason: "Curriculum schedule convention (Day 2 = Listening)",
      sections: [{ sectionType: "listening", title: "Listening", orderIndex: 0 }],
    };
  }

  if (/D1\b/i.test(title)) {
    return {
      classification: "REPAIRABLE",
      reason: "Curriculum schedule convention (Day 1 = Writing)",
      sections: [{ sectionType: "writing", title: "Writing", orderIndex: 0 }],
    };
  }

  if (/D3\b/i.test(title)) {
    return {
      classification: "REPAIRABLE",
      reason: "Curriculum schedule convention (Day 3 = Speaking)",
      sections: [{ sectionType: "speaking", title: "Speaking", orderIndex: 0 }],
    };
  }

  return {
    classification: "AMBIGUOUS",
    reason: "No clear match from course or title",
    sections: [{ sectionType: "general", title: "General", orderIndex: 0 }],
  };
}

async function main() {
  console.log("=== EXAM SECTIONS HIERARCHICAL REPAIR ===");
  const emptyExams = await prisma.exam.findMany({
    where: { sections: { none: {} } },
    include: {
      course: { select: { id: true, title: true, slug: true } },
    },
    orderBy: { createdAt: "asc" },
  });

  console.log(`Found ${emptyExams.length} exams with 0 sections.`);

  let repairedCount = 0;
  let ambiguousCount = 0;

  for (const exam of emptyExams) {
    const result = classifyExam(exam);
    if (result.classification === "AMBIGUOUS") {
      ambiguousCount++;
      console.log(`[AMBIGUOUS] Exam ID: ${exam.id} | Title: "${exam.title}" | Course: "${exam.course?.title}"`);
    }

    // Repair sections
    await prisma.examSection.createMany({
      data: result.sections.map((s) => ({
        examId: exam.id,
        sectionType: s.sectionType,
        title: s.title,
        orderIndex: s.orderIndex,
      })),
    });

    repairedCount++;
    console.log(
      `[REPAIRED] ${exam.title} (${exam.course?.title || "No Course"}) -> Added ${result.sections.length} sections (${result.reason})`
    );
  }

  console.log("\n=== REPAIR SUMMARY ===");
  console.log(`Total Processed: ${emptyExams.length}`);
  console.log(`Total Repaired: ${repairedCount}`);
  console.log(`Ambiguous count: ${ambiguousCount}`);

  // Specifically check W1 - D3 - SPK in DREAMER
  const dreamerW1D3 = await prisma.exam.findMany({
    where: { title: { contains: "W1 - D3 - SPK" } },
    include: {
      course: true,
      sections: { select: { id: true, title: true, sectionType: true, orderIndex: true } },
    },
  });

  console.log("\n=== W1 - D3 - SPK VERIFICATION ===");
  console.log(JSON.stringify(dreamerW1D3, null, 2));
}

main()
  .catch((err) => {
    console.error("Repair failed:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
