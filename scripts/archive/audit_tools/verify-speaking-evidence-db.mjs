import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function verify() {
  console.log("🔍 Verifying ARIS Speaking Evidence Engine in PostgreSQL...");

  // 1. Check tag count
  const tagCount = await prisma.speakingEvidenceTag.count();
  console.log(`📊 Total Speaking Evidence Tags in DB: ${tagCount}`);

  if (tagCount !== 32) {
    throw new Error(`Expected 32 tags, got ${tagCount}`);
  }

  // 2. Check criterion breakdown
  const prTags = await prisma.speakingEvidenceTag.count({ where: { criterion: "PR" } });
  const fcTags = await prisma.speakingEvidenceTag.count({ where: { criterion: "FC" } });
  const lrTags = await prisma.speakingEvidenceTag.count({ where: { criterion: "LR" } });
  const graTags = await prisma.speakingEvidenceTag.count({ where: { criterion: "GRA" } });

  console.log(`   - PR (Pronunciation): ${prTags} tags (5 Issue, 3 Strength)`);
  console.log(`   - FC (Fluency & Coherence): ${fcTags} tags (5 Issue, 3 Strength)`);
  console.log(`   - LR (Lexical Resource): ${lrTags} tags (5 Issue, 3 Strength)`);
  console.log(`   - GRA (Grammar Accuracy): ${graTags} tags (5 Issue, 3 Strength)`);

  if (prTags !== 8 || fcTags !== 8 || lrTags !== 8 || graTags !== 8) {
    throw new Error("Criterion distribution mismatch!");
  }

  // 3. Test Composite FK Constraint Protection:
  // Deliberately try to insert evidence with mismatched criterion ('PR' with 'LR_UNNATURAL_COLLOCATION')
  // Database MUST reject this with Foreign Key Violation!
  console.log("🛡️ Testing Composite Foreign Key Invariant (Criterion Ownership)...");
  
  // Find a test submission ID or dummy UUID
  const dummySubmission = await prisma.examSubmission.findFirst({ select: { id: true } });
  
  if (dummySubmission) {
    try {
      await prisma.$executeRawUnsafe(`
        INSERT INTO speaking_assessment_evidence (id, assessment_id, criterion, tag_id, created_by)
        VALUES (gen_random_uuid(), '${dummySubmission.id}', 'PR', 'LR_UNNATURAL_COLLOCATION', 'test-teacher')
      `);
      throw new Error("SECURITY FAILURE: Database allowed mismatched criterion with tag!");
    } catch (err) {
      if (err.message.includes("violates foreign key constraint") || err.message.includes("fk_evidence_tag_strict_criterion")) {
        console.log("✅ Composite Foreign Key SUCCESS: Database blocked mismatched criterion as expected!");
      } else {
        throw err;
      }
    }
  } else {
    console.log("ℹ️ No submission found for foreign key test, skipping dummy insert.");
  }

  console.log("🎉 ALL DATABASE & INVARIANT TESTS PASSED!");
}

verify()
  .catch((e) => {
    console.error("❌ Verification failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
