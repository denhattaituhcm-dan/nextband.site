import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const isExecute = process.argv.includes("--execute");
  console.log(`\n======================================================`);
  console.log(`🚀 ASSESSMENT SCORING INTEGRITY MIGRATION & POST-AUDIT`);
  console.log(`Mode: ${isExecute ? "⚡ TRANSACTIONAL EXECUTE" : "🔍 DRY RUN (NO DB WRITES)"}`);
  console.log(`======================================================\n`);

  // 1. Fetch all answers joined with submission, exam, and question
  const answers = await prisma.answer.findMany({
    include: {
      submission: {
        include: {
          exam: {
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
          },
        },
      },
      question: true,
    },
  });

  console.log(`Total Answer records loaded: ${answers.length}`);

  let holisticNullifiedCount = 0;
  let manualPendingNullifiedCount = 0;
  let objectivePreservedCount = 0;
  let unchangedCount = 0;

  const updatesToApply = [];

  for (const ans of answers) {
    const q = ans.question;
    const sub = ans.submission;
    if (!q || !sub) continue;

    // Find section for this question
    let sectionType = null;
    if (sub.exam?.sections) {
      for (const sec of sub.exam.sections) {
        for (const g of sec.questionGroups || []) {
          if (g.questions?.some((groupQ) => groupQ.id === q.id)) {
            sectionType = sec.sectionType || sec.section_type || null;
            break;
          }
        }
        if (sectionType) break;
      }
    }

    const qType = String(q.questionType || q.question_type || "").toLowerCase();
    const sType = String(sectionType || "").toLowerCase();

    const isExplicitHolistic = q.assessmentMode === "HOLISTIC" || q.scoreScope === "HOLISTIC";
    const isSubjective =
      qType === "essay" ||
      qType === "speaking" ||
      sType === "speaking" ||
      (sType === "writing" && !["multiple_choice", "fill_blank", "matching"].includes(qType));

    const isHolistic = isExplicitHolistic || (isSubjective && sType === "writing") || qType === "essay";
    const isManualItem = isSubjective && !isHolistic;
    const isObjective = !isSubjective;

    const currentScore = ans.score !== null ? Number(ans.score) : null;
    const isSubmissionGraded = String(sub.status).toUpperCase() === "GRADED";

    if (isHolistic) {
      // INVARIANT: Holistic items NEVER hold an item score in Answer table
      if (currentScore !== null) {
        holisticNullifiedCount++;
        updatesToApply.push({
          answerId: ans.id,
          submissionId: sub.id,
          questionId: q.id,
          oldScore: currentScore,
          newScore: null,
          reason: "HOLISTIC_ITEM_SCORE_NULLIFICATION",
        });
      } else {
        unchangedCount++;
      }
    } else if (isManualItem) {
      // Manual item (e.g. Speaking part 1/2/3)
      if (!isSubmissionGraded && currentScore !== null) {
        manualPendingNullifiedCount++;
        updatesToApply.push({
          answerId: ans.id,
          submissionId: sub.id,
          questionId: q.id,
          oldScore: currentScore,
          newScore: null,
          reason: "MANUAL_PENDING_SCORE_NULLIFICATION",
        });
      } else {
        unchangedCount++;
      }
    } else if (isObjective) {
      objectivePreservedCount++;
    }
  }

  console.log(`\n--- Plan Summary ---`);
  console.log(`Holistic items to reset score -> null: ${holisticNullifiedCount}`);
  console.log(`Manual items pending to reset score -> null: ${manualPendingNullifiedCount}`);
  console.log(`Objective items preserved (unchanged): ${objectivePreservedCount}`);
  console.log(`Existing compliant items: ${unchangedCount}`);
  console.log(`Total updates to execute: ${updatesToApply.length}`);

  if (!isExecute) {
    console.log(`\n[DRY RUN COMPLETE] To apply these changes transactionally, run with: node scripts/migrate_assessment_scoring_integrity.mjs --execute\n`);
    return;
  }

  // 2. Transactional Execution with In-Transaction Pre-Commit Invariant Assertion
  console.log(`\n⏳ Executing migration in single database transaction...`);
  await prisma.$transaction(async (tx) => {
    for (const update of updatesToApply) {
      await tx.answer.update({
        where: { id: update.answerId },
        data: { score: update.newScore },
      });
    }

    // IN-TRANSACTION PRE-COMMIT VALIDATION
    console.log(`🔍 Running in-transaction invariant checks...`);
    const migratedAnswers = await tx.answer.findMany({
      where: {
        id: { in: updatesToApply.map((u) => u.answerId) },
      },
    });

    for (const ma of migratedAnswers) {
      if (ma.score !== null) {
        throw new Error(`INVARIANT VIOLATION: Answer ${ma.id} still has non-null score ${ma.score} after nullification! Rollback.`);
      }
    }
    console.log(`✅ All in-transaction invariant checks passed.`);
  });

  console.log(`\n🎉 TRANSACTION COMMITTED SUCCESSFULLY!`);

  // 3. Independent Post-Audit
  console.log(`\n--- INDEPENDENT POST-AUDIT ---`);
  // Audit Minh Anh's submission
  const minhAnhSubmission = await prisma.examSubmission.findFirst({
    where: { id: "780ca599-3798-4d4a-a9ec-b231a827ae79" },
    include: {
      answers: {
        include: { question: true },
      },
    },
  });

  if (minhAnhSubmission) {
    console.log(`\nAuditing Minh Anh's Submission (${minhAnhSubmission.id}):`);
    console.log(`Status: ${minhAnhSubmission.status}`);
    console.log(`Total Score: ${minhAnhSubmission.totalScore}`);
    console.log(`Answers breakdown:`);
    for (const a of minhAnhSubmission.answers) {
      console.log(`- Question: ${a.question?.questionText?.slice(0, 35)}... | Score: ${a.score} | Type: ${a.question?.questionType}`);
    }
  }

  console.log(`\n✅ Migration & Post-Audit Complete!\n`);
}

main()
  .catch((e) => {
    console.error(`❌ Migration failed:`, e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
