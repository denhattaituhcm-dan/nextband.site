import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { AssessmentService } from '../server/services/assessment.service.js';
dotenv.config();

const prisma = new PrismaClient();
const assessmentService = new AssessmentService(prisma);

async function run() {
  try {
    console.log('🧪 1. Testing createAssessmentSession...');
    const session = await assessmentService.createAssessmentSession({
      fullName: 'Test Candidate MultiBlank',
      phone: '0987654321',
      targetBand: '7.0',
    });
    console.log(`Created Session: ${session.id} | Exam: ${session.examId}`);

    console.log('\n🧪 2. Submitting answers with multi-blank and single answers...');
    const answersPayload = {
      // Listening: 10 blanks (let's answer 8 correctly, 2 wrong)
      '43907def-1f78-4839-8751-ff1079fdee91': {
        0: 'choose',
        1: 'private',
        2: '20 percent',
        3: 'healthy',
        4: 'bones',
        5: 'lecture',
        6: 'arretsa',
        7: 'vegetarian',
        8: 'supermarket', // wrong (correct: market)
        9: 'knives', // wrong (correct: knife)
      },
      // Reading: 7 blanks (all 7 correct) + 6 TFNG (5 correct, 1 wrong)
      'c0d8e9bd-f426-42c3-b051-4c15df13543a': {
        0: 'update',
        1: 'environment',
        2: 'captain',
        3: 'films',
        4: 'season',
        5: 'accomodation',
        6: 'blog',
      },
      'e6084ef6-30d7-421b-9935-c15e506d4049': 'FALSE',
      'de50e60b-f74c-4948-905f-03f5ba2c0b6d': 'NOT GIVEN',
      'e19ac399-6094-4a0c-9003-b54abc5e0f40': 'FALSE',
      '00d76f65-dd5f-4dc1-98de-8c235f37f834': 'TRUE',
      '578ed22b-adee-4442-92ab-c04a1951d902': 'NOT GIVEN',
      '6268c893-6886-499e-81c3-194dea9cd9f2': 'FALSE', // wrong (correct: TRUE)

      // Grammar: 10 questions (9 correct, 1 wrong)
      '7b3cc213-6fbc-4e41-8ed7-9420773fd55a': 'goes',
      '5ba28972-e776-4953-b05e-41d6a862c4ed': 'have read',
      'afd8852d-5f56-413d-99ef-73cd89c969d4': 'will be sent',
      '59739e98-711b-4d4b-8927-e5f97c0d3a32': 'much',
      '380a1c22-1b82-478a-863e-e5e9a2ac21dd': 'since',
      '36a7ce11-694e-4986-871b-96427ac6f798': 'invested',
      '307abd86-198d-4686-9c35-03e3b8d84520': 'who',
      'af2cb913-45db-4ee3-a2bb-870d79d44334': 'to maintain',
      'ecd26e7b-aaae-45a1-b3c2-52bcdd8409af': 'having',
      'eea6e4cd-4eda-4de6-904c-c4c2a834f0a7': 'already finished', // wrong (correct: had already finished)

      // Writing
      'writing_response': 'I strongly agree that students should be required to learn a foreign language in school because it fosters cognitive development and opens up global career opportunities.',
    };

    const submitResult = await assessmentService.submitAssessment(session.id, answersPayload);
    console.log('Submission result:');
    console.log('- Total questions:', submitResult.objectiveBreakdown?.totalQuestions);
    console.log('- Raw score:', submitResult.objectiveBreakdown?.rawScore);
    console.log('- Listening:', `${submitResult.objectiveBreakdown?.listening?.correct}/${submitResult.objectiveBreakdown?.listening?.total}`);
    console.log('- Reading:', `${submitResult.objectiveBreakdown?.reading?.correct}/${submitResult.objectiveBreakdown?.reading?.total}`);
    console.log('- Grammar:', `${submitResult.objectiveBreakdown?.grammar?.correct}/${submitResult.objectiveBreakdown?.grammar?.total}`);

    console.log('\n🧪 3. Inspecting Admin Detail View...');
    const adminDetail = await assessmentService.getAdminAssessmentSessionDetail(session.id);
    const correctCount = adminDetail.questionBreakdown.filter(q => q.isCorrect).length;
    console.log(`- Breakdown items count: ${adminDetail.questionBreakdown.length}`);
    console.log(`- Breakdown correct items count: ${correctCount}`);

    // Clean up test session
    await prisma.assessmentSession.delete({ where: { id: session.id } }).catch(() => {});
    await prisma.contactLead.deleteMany({ where: { notes: { contains: session.id } } }).catch(() => {});
    console.log('✅ Cleaned up test session.');
  } catch (err) {
    console.error('ERROR:', err);
  } finally {
    await prisma.$disconnect();
  }
}

run();
