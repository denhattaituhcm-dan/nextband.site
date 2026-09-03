import { VRSVisualLesson } from '@/types/vrs';

export const vrsMockLessons: VRSVisualLesson[] = [
  {
    id: 'dreamer_w1d1',
    courseId: 'dreamer',
    week: 1,
    day: 1,
    skill: 'writing',
    title: 'The Clause Core Engine',
    subtitle: 'Kiến Tạo & Phẫu Thuật Cấu Trúc Câu',
    coreCompetency: 'Nhận diện giải phầu S - FV Core - OC mành mệnh đề v dich chuyển xung đột thừa động từ.',
    bridgeToHomework: {
      promptText: 'Làm 5 câu bài tập cấu trúc câu trong Homework để kiểm chứng phản xạ tự thân.',
      targetExamId: 'exam_dreamer_w1d1'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'syntax_anatomy',
        title: 'See the Anatomy (Mổ xẻ giải phẫu)',
        pedagogicalObjective: 'Nhận diện các khoang chức năng S, FV Core, O thay vì đọc døng chữ dài.',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Bấm quét giải phẫu để bóc tách câu văn thành 3 khoang chức năng.',
          mode: 'build',
          tokens: [
            { id: 't1', text: 'The course', role: 'subject', colorClass: 'green' },
            { id: 't2', text: 'helps', role: 'fv_core', colorClass: 'orange' },
            { id: 't3', text: 'students', role: 'object', colorClass: 'blue' }
          ]
        }
      },
      {
        stageNumber: 2,
        stageType: 'productive_failure',
        title: 'Break (Phát hiện sụp đổ Cấu trúc)',
        pedagogicalObjective: 'Đối diện lỗi thừa động từ (Double Verbs) kinh diển của Band 3.0.',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Click vào điểm gây ra xung đột cấu trúc trong câu bên dưới.',
          mode: 'break_and_repair',
          tokens: [
            { id: 't1', text: 'The course', role: 'subject', colorClass: 'green' },
            { id: 't2', text: 'helps', role: 'fv_core', colorClass: 'orange' },
            { id: 't3', text: 'students', role: 'object', colorClass: 'blue' },
            { id: 't4', text: 'can write emails', role: 'fv_core', colorClass: 'red' }
          ],
          collisionTarget: {
            conflictingTokenIds: ['t2', 't4'],
            errorMessage: 'Xung đột cấu trúc: Trong một mệnh đề đơn không thể có 2 cụm FV cùng tranh vị trí!',
            repairOptions: [
              {
                id: 'opt1',
                action: 'delete',
                targetTokenId: 't4',
                resultText: 'write emails',
                explanation: 'Gọt bỏ can để động từ ở dạng nguyên mẫu bare infinitive (help sb do sth).'
              }
            ]
          }
        }
      }
    ]
  },
  {
    id: 'dreamer_w1d2',
    courseId: 'dreamer',
    week: 1,
    day: 2,
    skill: 'reading',
    title: 'The Block Reading Map',
    subtitle: 'Định Vị Chức Năng & Truy Vẳt Bằng Chứng',
    coreCompetency: 'Nén đoạn văn thành nhãn chức năng, quy đổi câu hỏi về khái niệm và cô lập bằng chứng.',
    bridgeToHomework: {
      promptText: 'Làm bài tập đọc hiểu về nghề lính cứu hỏa trong Homework W1D2.',
      targetExamId: 'exam_dreamer_w1d2'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'verification_scale',
        title: 'Transfer via Evidence Isolation',
        pedagogicalObjective: 'Khẳng định chỉ SAIkhi có thông tin mâu thuẫn trực tiẰp.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Đặt bằng chứng lên bàn cân để kiểm chứng nhận định.',
          statement: {
            rawText: 'Jack Gomez had no difficulty during the training camp.',
            deconstructedVariables: [
              { name: 'subject', text: 'Jack Gomez' },
              { name: 'relation', text: 'had no difficulty', isTrapWord: true },
              { name: 'scope_condition', text: 'during the training camp' }
            ]
          },
          passageEvidence: {
            rawText: 'The camp was really hard, but I passed first time.',
            targetVariables: [
              { matchingName: 'relation', text: 'The camp was really hard' }
            ]
          },
          expectedRelation: 'contradiction',
          verdict: 'FALSE',
          pedagogicalInsight: 'FALSE không phải vi suy đoán vô lý, mà vi bài đọc nói ngược lại 100%: no difficulty mâu thuắn trực tiẟp với really hard.'
        }
      }
    ]
  },
  {
    id: 'dreamer_w1d3',
    courseId: 'dreamer',
    week: 1,
    day: 3,
    skill: 'speaking',
    title: 'The 4-Link Progressive Reveal',
    subtitle: 'Bóc Tákh Từng Lớp Tư Duy Mở Rộng',
    coreCompetency: 'Bóc tách câu trạ lời từ 1 câu cụt thành 4 tầng nhận thức: Stance -> Why -> Develop -> Extend.',
    bridgeToHomework: {
      promptText: 'Tự thu âm câu trả lời của chính bạn cho 3 câu hỏi Part 1 trong Homework W1D3.',
      targetExamId: 'exam_dreamer_w1d3'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'progressive_reveal',
        title: 'Bóc tách 4 tầng tư duy câu trả lời',
        pedagogicalObjective: 'Click mở từng tầng để thấy cách phát triển câu nói.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click vào từng thẁ `Ļkhám phá các tầng suy nghĩ.',
          cards: [
            {
              step: 1,
              label: 'DIRECT STANCE',
              cognitiveFunction: 'Tôi nghĩ gì?',
              content: 'I really enjoy my job as a shopkeeper',
              pedagogyNote: 'Dùng really enjoy thay vì like để tăng độ tự nhiên.'
            },
            {
              step: 2,
              label: 'WHY / REASON',
              cognitiveFunction: 'Tại sao lại như vậy?',
              content: 'because my coworkers are extremely supportive and friendly.',
              pedagogyNote: 'Đưa ra lý do trực tiếp giải thích cho cảm xúc ở bước 1.'
            },
            {
              step: 3,
              label: 'DEVELOP FURTHER',
              cognitiveFunction: 'Có khía cạnh nào khác không?',
              content: 'However, the workload can be quite stressful sometimes because my manager sets high sales targets.',
              pedagogyNote: 'Slot mở: thêm chiều kích tương phản thực tế.',
              branchOptions: [
                { branchName: 'CONTRAST', content: 'However, the workload can be stressful due to high sales targets.', note: 'Nhánh nói về áp lựcn thực tế.' },
                { branchName: 'DETAIL / EXAMPLE', content: 'Specifically, I get to talk with hundreds of interesting customers every day.', note: 'Nhánh đưa ví dụ cụ thể.' }
              ]
            },
            {
              step: 4,
              label: 'EXTEND / RESULT',
              cognitiveFunction: 'Dẫn đến hành động hay hướng đi gì?',
              content: 'So, I am constantly trying to improve my communication skills to handle customers better.',
              pedagogyNote: 'Kết thúc bằng hướng phát triển tích cực.'
            }
          ],
          fullMosaicSummary: 'Well, I really enjoy my job as a shopkeeper because my coworkers are extremely supportive. However, the workload can be quite stressful sometimes, so I am constantly trying to improve my skills.'
        }
      }
    ]
  }
];

for (const lesson of vrsMockLessons) {
  lesson.stages.push({
    stageNumber: 99,
    stageType: 'transfer_test',
    title: 'Thử thách chuyển giao năng lực',
    pedagogicalObjective: 'Kiểm chứng xem học sinh đã tái tạo được tư duy chưa',
    interactionModel: {
      type: 'transfer_test',
      prompt: 'Áp dụng năng lực để xử lý câu mới trên Homework.',
      challengeSentence: 'Challenge completed.',
      task: 'fix_error',
      solution: true,
      beforeAfterComparison: {
        oldHabitBand3: 'Thói quen củ Band 3.0',
        newCompetencyBand4: 'Năng lực mới Band 4.0+'
      }
    }
  });
}
