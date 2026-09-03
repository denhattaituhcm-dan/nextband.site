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
    title: 'The Block Reading Map & Scanning Trajectory',
    subtitle: 'Khóa Keyword Lần 1 → Phóng Mũi Tên Tọa Độ Lần 2',
    coreCompetency: 'Nén đoạn văn thành nhãn chức năng. Click 1 lần để bóc tách Keywords, Click lần 2 để phóng mũi tên định vị trực tiếp đến vùng văn bản đối chiếu.',
    bridgeToHomework: {
      promptText: 'Làm bài tập nối câu hỏi phỏng vấn với 5 đoạn văn trong Homework W1D2.',
      targetExamId: 'exam_dreamer_w1d2'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'verification_scale',
        title: 'Chặng 1: Block Reading Map (Nối Câu Hỏi Với 5 Đoạn Văn)',
        pedagogicalObjective: 'Click lần 1 hiển thị Keyword cốt lõi. Click lần 2 bắn mũi tên chỉ định vị trí đối chiếu trong 5 đoạn văn.',
        interactionModel: {
          type: 'block_reading_map',
          prompt: 'Click vào từng câu hỏi: Lần 1 xem Keyword, Lần 2 quét tia đối chiếu đến đoạn văn tương ứng.',
          passage: {
            title: 'Interview with Jack Gomez - Wildfire Firefighter in California',
            paragraphs: [
              {
                id: 'p1',
                number: 1,
                label: 'Đoạn 1',
                text: "I’m Jack Gomez, and I’m a firefighter in California. I remember watching an interview with a firefighter pilot when I was a child. He’d been fighting a fire for about five days. He was exhausted, but he was still there, talking about how many lives were being saved. He was so optimistic and committed that I thought that I wanted to do the same thing. And I never changed my mind."
              },
              {
                id: 'p2',
                number: 2,
                label: 'Đoạn 2',
                text: "I did a training camp to get my wildfire qualification card – you can’t fight fires in the US without one. I learned how to fight controlled fires, and how to put them out again. I also learned how to use all the equipment. The camp was really hard, but I passed first time – which was a big relief to me! After that I applied for a job, and I was lucky enough to get one."
              },
              {
                id: 'p3',
                number: 3,
                label: 'Đoạn 3',
                text: "One of the things you have to do in the early days is the pack test. This consists of a five-kilometre walk while carrying a backpack that weights twenty kilograms. You must be able to complete it in forty-five minutes or less without jogging or running. This shows how strong you are. If you can’t do this, how can you carry the heavy fire equipment, or fight fires in difficult conditions for hours at a time?"
              },
              {
                id: 'p4',
                number: 4,
                label: 'Đoạn 4',
                text: "You can be out alone in vast forests and national parks, and sometimes the smoke is so thick that you can hardly see. So, it’s important to be able to know where you’re going, to be able to read a map, and to use a compass. Also, you must know how to put up a tent, cook outdoors, drive a truck, and have other basic survival skills."
              },
              {
                id: 'p5',
                number: 5,
                label: 'Đoạn 5',
                text: "Wildfires can change direction very quickly because of the wind. One minute everything seems under control, and the next minute the flames are moving towards you. Falling trees, extreme heat, and thick smoke are also serious dangers. Even experienced firefighters can find themselves in difficult situations. That’s why we always have to stay alert and follow safety procedures carefully."
              }
            ]
          },
          questions: [
            {
              id: 'qA',
              code: 'A',
              questionText: 'What is the most dangerous part of being a firefighter?',
              keywords: ['most dangerous part', 'dangers', 'risk'],
              targetParagraphId: 'p5',
              targetSnippet: 'Wildfires can change direction very quickly because of the wind... Falling trees, extreme heat, and thick smoke are also serious dangers.',
              explanation: 'Đoạn 5 liệt kê trực diện các mối hiểm nguy lớn nhất: gió đổi chiều làm lửa đuổi theo, cây đổ, nhiệt độ cực hạn và khói độc.'
            },
            {
              id: 'qB',
              code: 'B',
              questionText: 'What is the most important personal quality for a firefighter?',
              keywords: ['important personal quality', 'traits', 'personality'],
              targetParagraphId: 'none',
              targetSnippet: '',
              explanation: 'ĐÂY LÀ CÂU HỎI THỪA (EXTRA QUESTION)! Trong 5 đoạn không có đoạn nào nói về phẩm chất tính cách cần có của người lính cứu hỏa.'
            },
            {
              id: 'qC',
              code: 'C',
              questionText: 'How physically fit do you have to be?',
              keywords: ['physically fit', 'strong', 'pack test', '20kg backpack'],
              targetParagraphId: 'p3',
              targetSnippet: 'five-kilometre walk while carrying a backpack that weights twenty kilograms... This shows how strong you are.',
              explanation: 'Đoạn 3 mô tả bài kiểm tra thể lực Pack Test (đi bộ 5km vác balo 20kg trong 45 phút) để chứng minh thể lực và sức mạnh.'
            },
            {
              id: 'qD',
              code: 'D',
              questionText: 'How did you become a firefighter?',
              keywords: ['become a firefighter', 'training camp', 'qualification card'],
              targetParagraphId: 'p2',
              targetSnippet: 'I did a training camp to get my wildfire qualification card... After that I applied for a job',
              explanation: 'Đoạn 2 giải thích quá trình đào tạo để trở thành lính cứu hỏa: tham gia trại huấn luyện, lấy thẻ chứng chỉ hành nghề và nộp đơn xin việc.'
            },
            {
              id: 'qE',
              code: 'E',
              questionText: 'Why did you decide to become a firefighter?',
              keywords: ['decide to become', 'inspiration', 'childhood'],
              targetParagraphId: 'p1',
              targetSnippet: 'I remember watching an interview with a firefighter pilot when I was a child... I wanted to do the same thing',
              explanation: 'Đoạn 1 nêu động cơ thúc đẩy: Xem phỏng vấn viên phi công chữa cháy cứu mạng người từ khi còn là một đứa trẻ.'
            },
            {
              id: 'qF',
              code: 'F',
              questionText: 'What other skills do you need?',
              keywords: ['other skills', 'read a map', 'compass', 'survival skills'],
              targetParagraphId: 'p4',
              targetSnippet: 'read a map, and to use a compass. Also, you must know how to put up a tent, cook outdoors, drive a truck, and have other basic survival skills.',
              explanation: 'Đoạn 4 nêu các kỹ năng bổ trợ ngoài chữa cháy: đọc bản đồ, la bàn, cắm lều, nấu ăn ngoài trời và sinh tồn trong rừng sâu.'
            }
          ]
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
  },
  {
    id: 'dreamer_w2d1',
    courseId: 'dreamer',
    week: 2,
    day: 1,
    skill: 'writing',
    title: 'The Verb Compatibility Engine',
    subtitle: 'Cổng Kết Nối Động Từ & Khóa Ghép Collocation',
    coreCompetency: 'Nhận diện cổng kết nối của 3 loại động từ: Vi, Vt và Linking Verb để chấm dứt lỗi chèn giới từ thừa và sai từ loại.',
    bridgeToHomework: {
      promptText: 'Thực hành sửa lỗi cổng kết nối động từ trong Homework W2D1.',
      targetExamId: 'exam_dreamer_w2d1'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'productive_failure',
        title: 'Break (Phát hiện sụp đổ cổng kết nối)',
        pedagogicalObjective: 'Đối diện với lỗi dịch thô tiếng Việt chèn giới từ thừa: discuss about.',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Click vào cặp từ gây xung đột cổng kết nối trong câu dưới đây:',
          mode: 'break_and_repair',
          tokens: [
            { id: 't1', text: 'The directors', role: 'subject', colorClass: 'green' },
            { id: 't2', text: 'are discussing', role: 'fv_core', colorClass: 'orange' },
            { id: 't3', text: 'about', role: 'preposition', colorClass: 'red' },
            { id: 't4', text: 'a pay rise', role: 'object', colorClass: 'blue' }
          ],
          collisionTarget: {
            conflictingTokenIds: ['t2', 't3'],
            errorMessage: 'Xung đột cổng kết nối: discuss là Ngoại động từ (Vt) có lực hút trực tiếp tân ngữ danh từ, không thể chèn giới từ "about" ở giữa!',
            repairOptions: [
              {
                id: 'opt1',
                action: 'delete',
                targetTokenId: 't3',
                resultText: '',
                explanation: 'Đẩy văng giới từ "about" ra ngoài để tân ngữ "a pay rise" gắn trực tiếp vào "discussing".'
              }
            ]
          }
        }
      }
    ]
  },
  {
    id: 'dreamer_w2d2',
    courseId: 'dreamer',
    week: 2,
    day: 2,
    skill: 'reading',
    title: 'The T/F/NG Logic Verification Lab',
    subtitle: 'Phẫu Thuật 3 Bẫy Nhận Thức Kinh Điển',
    coreCompetency: 'Làm chủ Bàn Cân Logic 3 Trạng Thái, loại bỏ bẫy suy đoán đời thực và bẫy thời gian / tần suất.',
    bridgeToHomework: {
      promptText: 'Làm bài đọc kiểm chứng T/F/NG về văn hóa làm việc 996 trong Homework W2D2.',
      targetExamId: 'exam_dreamer_w2d2'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'verification_scale',
        title: 'Câu 1 (T/F/NG): Bẫy Thời Gian & Tần Suất (every weekday vs 6 days a week)',
        pedagogicalObjective: 'Khóa tọa độ Đoạn 1, phát hiện mâu thuẫn giữa 5 ngày làm việc và 6 ngày/tuần.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Bấm Radar quét tìm định nghĩa số giờ và số ngày của văn hóa 996 trong bài đọc:',
          passageContext: {
            title: "The '996' Culture in China",
            paragraphs: [
              {
                id: 'p1',
                label: 'Đoạn 1 · Định nghĩa 996 & Lệnh cấm của pháp luật',
                text: 'Employees of major companies are protesting what is infamous as "996". The name comes from the practice of working from 9 am to 9 pm six days a week, and it is very common among Chinese tech companies and startups. Though the practice is technically prohibited by Chinese law, many companies still enforce the hours informally or formally.'
              },
              {
                id: 'p2',
                label: 'Đoạn 2 · Nhu cầu văn hóa 955',
                text: 'Several employees are demanding the "955" culture, which is working from 9 am to 5 pm five days a week.'
              }
            ],
            targetParagraphId: 'p1',
            targetSnippet: 'working from 9 am to 9 pm six days a week'
          },
          statement: {
            rawText: '1. The 996 culture involves working from 9 am to 9 pm every weekday.',
            deconstructedVariables: [
              { name: 'subject', text: 'The 996 culture' },
              { name: 'hours', text: 'working from 9 am to 9 pm' },
              { name: 'time_scope', text: 'every weekday', isTrapWord: true }
            ]
          },
          passageEvidence: {
            rawText: 'The name comes from the practice of working from 9 am to 9 pm six days a week.',
            targetVariables: [
              { matchingName: 'time_scope', text: 'six days a week (làm 6 ngày/tuần, bao gồm cả thứ Bảy)' }
            ]
          },
          expectedRelation: 'contradiction',
          verdict: 'FALSE',
          pedagogicalInsight: 'FALSE vì "every weekday" là ngày làm việc trong tuần (thứ 2 đến thứ 6 = 5 ngày), trong khi bài đọc nêu rõ "six days a week" (phải làm thêm thứ Bảy). Hai mốc thời gian mâu thuẫn trực tiếp!'
        }
      },
      {
        stageNumber: 2,
        stageType: 'verification_scale',
        title: 'Câu 2 (T/F/NG): Bẫy Suy Diễn Thực Tế (Is 955 proved to be healthier?)',
        pedagogicalObjective: 'Phát hiện sự thiếu vắng bằng chứng khoa học chứng minh lịch 955 tốt hơn cho sức khỏe (NOT GIVEN).',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Quét văn bản kiểm tra xem có nghiên cứu khoa học nào chứng minh lịch 955 tốt hơn cho sức khỏe không:',
          passageContext: {
            title: "The '996' Culture in China",
            paragraphs: [
              {
                id: 'p2',
                label: 'Đoạn 2 · Yêu cầu về lịch trình 955',
                text: 'Several employees are demanding the "955" culture, which is working from 9 am to 5 pm five days a week.'
              },
              {
                id: 'p3',
                label: 'Đoạn 3 · Tác hại của 996 đối với người lao động',
                text: 'For young tech workers, the tight work schedule means more burnout and less time for basic needs like sleep or a personal life, according to the South China morning Post.'
              }
            ],
            targetParagraphId: 'p2',
            targetSnippet: 'Several employees are demanding the "955" culture'
          },
          statement: {
            rawText: '2. The 955 schedule is proved to be healthier than the 996 one.',
            deconstructedVariables: [
              { name: 'subject', text: 'The 955 schedule' },
              { name: 'scientific_claim', text: 'is proved to be healthier than 996', isTrapWord: true }
            ]
          },
          passageEvidence: {
            rawText: 'Bài đọc chỉ nêu nhân viên đang đòi hỏi áp dụng 955 (Several employees are demanding the 955 culture). Hoàn toàn không có nghiên cứu hay chứng cứ khoa học nào khẳng định "is proved to be healthier".',
            targetVariables: [
              { matchingName: 'scientific_claim', text: 'KHÔNG CÓ CHỨNG MINH KHOA HỌC TRONG BÀI ĐỌC' }
            ]
          },
          expectedRelation: 'no_evidence',
          verdict: 'NOT GIVEN',
          pedagogicalInsight: 'NOT GIVEN! Dù trong thực tế 955 chắc chắn lành mạnh hơn 996, nhưng bài đọc KHÔNG HỀ CÓ dòng nào nêu "đã được chứng minh là tốt hơn cho sức khỏe" (proved to be healthier). Đây là bẫy suy đoán đời thực kinh điển của IELTS!'
        }
      },
      {
        stageNumber: 3,
        stageType: 'verification_scale',
        title: 'Câu 3 (T/F/NG): Bẫy Mục Đích & Động Cơ (reduce financial pressure?)',
        pedagogicalObjective: 'Quét Đoạn 3 & 4 để kiểm tra lý do công nhân làm 996 có phải do áp lực tài chính không.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Quét bài đọc xem có thông tin công nhân tự nguyện làm 996 để giảm áp lực tài chính không:',
          passageContext: {
            title: "The '996' Culture in China",
            paragraphs: [
              {
                id: 'p3',
                label: 'Đoạn 3 · Tác động đến người lao động',
                text: 'For young tech workers, the tight work schedule means more burnout and less time for basic needs like sleep or a personal life, according to the South China morning Post.'
              },
              {
                id: 'p4',
                label: 'Đoạn 4 · Vụ việc tử vong tại Pinduoduo',
                text: 'In December, 2019, a 22-year-old working at Pinduoduo collapsed and died on the streets after leaving work at 1:30 a.m. One blogger said: "Is it really worth it to exchange our lives for money?"'
              }
            ],
            targetParagraphId: 'p3',
            targetSnippet: 'tight work schedule means more burnout and less time for basic needs'
          },
          statement: {
            rawText: '3. Young tech workers have work a tight schedule to reduce their financial pressure.',
            deconstructedVariables: [
              { name: 'subject', text: 'Young tech workers' },
              { name: 'motive', text: 'to reduce their financial pressure', isTrapWord: true }
            ]
          },
          passageEvidence: {
            rawText: 'Bài đọc chỉ cho biết công ty ép buộc làm việc (companies still enforce the hours) và blogger đặt câu hỏi "đổi mạng lấy tiền có đáng không", chứ không hề có dữ liệu nói công nhân trẻ làm 996 nhằm mục đích "giảm áp lực tài chính".',
            targetVariables: [
              { matchingName: 'motive', text: 'KHÔNG CÓ THÔNG TIN VỀ MỤC ĐÍCH GIẢM ÁP LỰC TÀI CHÍNH' }
            ]
          },
          expectedRelation: 'no_evidence',
          verdict: 'NOT GIVEN',
          pedagogicalInsight: 'NOT GIVEN vì bài viết không hề khẳng định lý do làm việc 996 là để giảm bớt áp lực tài chính cá nhân.'
        }
      },
      {
        stageNumber: 4,
        stageType: 'verification_scale',
        title: 'Câu 4 (T/F/NG): Bẫy Đối Nghịch Lập Trường (opposed vs supported)',
        pedagogicalObjective: 'Quét lời tuyên bố của Jack Ma trong Đoạn 7, bóc trần mâu thuẫn 100% với đề bài.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Bấm Radar quét lập trường của Jack Ma (Alibaba CEO) trong Đoạn 7:',
          passageContext: {
            title: "The '996' Culture in China",
            paragraphs: [
              {
                id: 'p7',
                label: 'Đoạn 7 · Phát ngôn của Jack Ma (Alibaba)',
                text: 'Interestingly, in April 2019, Alibaba CEO Jack Ma had supported the culture of overwork, calling it a "blessing". At the time, he wrote that China\'s economy was "very likely to lose its power and momentum if the system wasn\'t there."'
              }
            ],
            targetParagraphId: 'p7',
            targetSnippet: 'Alibaba CEO Jack Ma had supported the culture of overwork, calling it a "blessing"'
          },
          statement: {
            rawText: '4. Alibaba CEO Jack Ma opposed the "996" work culture.',
            deconstructedVariables: [
              { name: 'subject', text: 'Alibaba CEO Jack Ma' },
              { name: 'stance', text: 'opposed (phản đối)', isTrapWord: true },
              { name: 'target', text: 'the 996 work culture' }
            ]
          },
          passageEvidence: {
            rawText: 'Alibaba CEO Jack Ma had supported the culture of overwork, calling it a "blessing".',
            targetVariables: [
              { matchingName: 'stance', text: 'had supported ... calling it a "blessing" (ủng hộ và gọi đó là phước lành)' }
            ]
          },
          expectedRelation: 'contradiction',
          verdict: 'FALSE',
          pedagogicalInsight: 'FALSE vì Jack Ma lên tiếng ỦNG HỘ ("supported", gọi 996 là "blessing" - phúc lành), hoàn toàn trái ngược với từ "opposed" (phản đối) của đề bài!'
        }
      },
      {
        stageNumber: 5,
        stageType: 'verification_scale',
        title: 'Câu 5 (T/F/NG): Khớp Ý Trực Diện (important for economic development)',
        pedagogicalObjective: 'Đối chiếu lập luận của Jack Ma về nguy cơ kinh tế Trung Quốc mất đà tăng trưởng.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Bấm Radar quét phát biểu của Jack Ma về nền kinh tế Trung Quốc:',
          passageContext: {
            title: "The '996' Culture in China",
            paragraphs: [
              {
                id: 'p7',
                label: 'Đoạn 7 · Phát ngôn của Jack Ma về kinh tế',
                text: 'Interestingly, in April 2019, Alibaba CEO Jack Ma had supported the culture of overwork, calling it a "blessing". At the time, he wrote that China\'s economy was "very likely to lose its power and momentum if the system wasn\'t there."'
              }
            ],
            targetParagraphId: 'p7',
            targetSnippet: 'China\'s economy was "very likely to lose its power and momentum if the system wasn\'t there"'
          },
          statement: {
            rawText: '5. According to Jack Ma, “996" is important for the China\'s economic development.',
            deconstructedVariables: [
              { name: 'speaker', text: 'According to Jack Ma' },
              { name: 'significance', text: '996 is important for China\'s economic development' }
            ]
          },
          passageEvidence: {
            rawText: 'He wrote that China\'s economy was "very likely to lose its power and momentum if the system wasn\'t there."',
            targetVariables: [
              { matchingName: 'significance', text: 'Kinh tế sẽ mất sức mạnh và động lực nếu không có 996' }
            ]
          },
          expectedRelation: 'match',
          verdict: 'TRUE',
          pedagogicalInsight: 'TRUE! Jack Ma viết rằng nền kinh tế Trung Quốc sẽ "mất đi sức mạnh và đà phát triển nếu không có hệ thống làm việc này", nghĩa là 996 đóng vai trò quan trọng đối với sự phát triển kinh tế.'
        }
      },
      {
        stageNumber: 6,
        stageType: 'verification_scale',
        title: 'Câu 6 (T/F/NG): Bẫy Từ Khẳng Định Tuyệt Đối (All developed economies vs Some)',
        pedagogicalObjective: 'Phát hiện bẫy lượng từ tuyệt đối ALL đối lập với SOME trong Đoạn 9.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Bấm Radar quét lượng từ mô tả các nền kinh tế thử nghiệm tuần làm việc 4 ngày:',
          passageContext: {
            title: "The '996' Culture in China",
            paragraphs: [
              {
                id: 'p9',
                label: 'Đoạn 9 · Xu hướng tuần làm 4 ngày ở các nước',
                text: 'Some developed economies around the world are experimenting with the four-day work culture. The well-known ones among them are New Zealand and Japan.'
              }
            ],
            targetParagraphId: 'p9',
            targetSnippet: 'Some developed economies around the world are experimenting'
          },
          statement: {
            rawText: '6. All developed economies around the world are experimenting with the four-day workweek.',
            deconstructedVariables: [
              { name: 'scope_quantifier', text: 'All developed economies (TẤT CẢ)', isTrapWord: true },
              { name: 'action', text: 'are experimenting with the four-day workweek' }
            ]
          },
          passageEvidence: {
            rawText: 'Some developed economies around the world are experimenting with the four-day work culture.',
            targetVariables: [
              { matchingName: 'scope_quantifier', text: 'Some developed economies (chỉ MỘT SỐ nền kinh tế)' }
            ]
          },
          expectedRelation: 'contradiction',
          verdict: 'FALSE',
          pedagogicalInsight: 'FALSE vì bài đọc chỉ nêu "Some developed economies" (MỘT SỐ nền kinh tế phát triển như New Zealand, Nhật Bản), hoàn toàn mâu thuẫn với từ khẳng định tuyệt đối "ALL" (tất cả) của đề bài!'
        }
      }
    ]
  },
  {
    id: 'dreamer_w2d3',
    courseId: 'dreamer',
    week: 2,
    day: 3,
    skill: 'speaking',
    title: 'The Spatial Coordinate Engine',
    subtitle: 'Tổ Chức Bài Nói Bằng Tọa Độ & Quan Hệ Không Gian',
    coreCompetency: 'Làm chủ thước đo phóng đại không gian IN -> ON -> AT và dẫn dắt người nghe qua lộ trình logic.',
    bridgeToHomework: {
      promptText: 'Thực hành nói mô tả căn phòng và lộ trình di chuyển trong Homework W2D3.',
      targetExamId: 'exam_dreamer_w2d3'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'progressive_reveal',
        title: 'Bóc tách 4 tầng tọa độ không gian nơi sinh sống',
        pedagogicalObjective: 'Khám phá mức độ zoom không gian từ diện tích lớn đến địa chỉ cụ thể.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click mở từng tầng thẻ để học cách tổ chức bài nói về nơi ở theo tọa độ không gian:',
          cards: [
            {
              step: 1,
              label: 'MACRO AREA (IN)',
              cognitiveFunction: 'Thành phố / Vùng diện tích rộng',
              content: 'Currently, I am living IN Ho Chi Minh City, which is a bustling metropolis in Vietnam.',
              pedagogyNote: 'Dùng IN cho các thực thể địa lý bao quát, có ranh giới rộng lớn.'
            },
            {
              step: 2,
              label: 'SURFACE & STREET (ON)',
              cognitiveFunction: 'Tuyến đường / Mặt phẳng tầng nhà',
              content: 'More specifically, my apartment is located ON Ba Hat Street, right ON the 5th floor.',
              pedagogyNote: 'Dùng ON cho tên đường và số tầng của tòa nhà.'
            },
            {
              step: 3,
              label: 'SURROUNDING ANCHORS',
              cognitiveFunction: 'Các điểm mốc lân cận',
              content: 'What I love is that there is a quiet park right across from my building.',
              pedagogyNote: 'Mở rộng bằng các điểm mốc không gian đối chiếu (across from, next to).',
              branchOptions: [
                { branchName: 'CONTRAST', content: 'However, it is quite far from my workplace, taking 45 minutes to commute.', note: 'Nhánh nói về khoảng cách di chuyển.' },
                { branchName: 'DETAIL / CONVENIENCE', content: 'In addition, it is surrounded by convenience stores and local coffee shops.', note: 'Nhánh liệt kê tiện ích xung quanh.' }
              ]
            },
            {
              step: 4,
              label: 'COMMUTE & FEELING',
              cognitiveFunction: 'Cảm nhận và thói quen sinh hoạt',
              content: 'Overall, despite the long commute, I truly enjoy the cozy atmosphere of my neighborhood.',
              pedagogyNote: 'Khép lại bài nói bằng đánh giá tổng thể.'
            }
          ],
          fullMosaicSummary: 'Currently, I am living IN Ho Chi Minh City. More specifically, my apartment is located ON Ba Hat Street, right ON the 5th floor. There is a quiet park right across from my building, and despite the commute, I truly enjoy the cozy atmosphere.'
        }
      }
    ]
  },
  {
    id: 'dreamer_w3d1',
    courseId: 'dreamer',
    week: 3,
    day: 1,
    skill: 'writing',
    title: 'The Timeline Shift Engine',
    subtitle: 'Neo Trục Thời Gian & Dịch Chuyển Trạng Thái Thì',
    coreCompetency: 'Nhận diện điểm neo thời gian (Time Anchor) để chọn thì chính xác: Simple Past (chấm dứt hoàn toàn) vs Present Perfect (vết tích chạm hiện tại).',
    bridgeToHomework: {
      promptText: 'Luyện tập phân định thì Simple Past vs Present Perfect trong Homework W3D1.',
      targetExamId: 'exam_dreamer_w3d1'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'productive_failure',
        title: 'Break (Phát hiện sụp đổ Trục Thời Gian)',
        pedagogicalObjective: 'Đối diện với lỗi kinh điển dùng sai thì khi chủ thể hoặc bối cảnh thời gian đã chấm dứt.',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Click vào cặp từ gây sụp đổ logic thời gian trong câu dưới đây:',
          mode: 'break_and_repair',
          tokens: [
            { id: 't1', text: 'Trinh Cong Son', role: 'subject', colorClass: 'green' },
            { id: 't2', text: 'has written', role: 'fv_core', colorClass: 'red' },
            { id: 't3', text: 'many famous songs', role: 'object', colorClass: 'blue' },
            { id: 't4', text: 'in his career', role: 'scope_condition', colorClass: 'orange' }
          ],
          collisionTarget: {
            conflictingTokenIds: ['t1', 't2'],
            errorMessage: 'Lỗi neo trục thời gian: Nhạc sĩ Trịnh Công Sơn đã qua đời (sự nghiệp đã khép lại vĩnh viễn trong quá khứ), không thể dùng Present Perfect (has written) để diễn tả khả năng còn tiếp diễn!',
            repairOptions: [
              {
                id: 'opt1',
                action: 'delete',
                targetTokenId: 't2',
                resultText: 'wrote',
                explanation: 'Chuyển về Simple Past (wrote) vì hành động và chủ thể thuộc về quá khứ đã đóng kín.'
              }
            ]
          }
        }
      }
    ]
  },
  {
    id: 'dreamer_w3d2',
    courseId: 'dreamer',
    week: 3,
    day: 2,
    skill: 'reading',
    title: 'The Chronological Itinerary Tracker',
    subtitle: 'Theo Dấu 4 Trạm Dừng Chân & Bóc Tách 5 Bẫy Nhận Thức',
    coreCompetency: 'Định vị tọa độ thông tin dọc theo hành trình 4 trạm: Sài Gòn (3 ngày) → Hội An (9 ngày) → Hà Nội (3 ngày) → Hạ Long (2 ngày). Phân biệt bẫy so sánh nhất, bẫy lý do và bẫy cảm xúc quá khứ.',
    bridgeToHomework: {
      promptText: 'Làm bài tập đọc hiểu về lịch trình du lịch 1 tháng tại Việt Nam trong Homework W3D2.',
      targetExamId: 'exam_dreamer_w3d2'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'verification_scale',
        title: 'Câu 1 (T/F/NG): Bẫy So Sánh Nhất (busiest vs one of the busiest)',
        pedagogicalObjective: 'Phát hiện sự sai lệch giữa khẳng định "bận rộn nhất" (busiest) và "một trong những chuyến bận rộn nhất" (one of the busiest).',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Bấm Radar quét nhận định tổng quan về chuyến đi trong Đoạn mở đầu:',
          passageContext: {
            title: 'My 1-Month Vietnam Travel Itinerary: Planning A Vietnam Trip!',
            paragraphs: [
              {
                id: 'p1',
                label: 'Đoạn mở đầu · Tổng quan 4 tuần xuyên Việt',
                text: 'I was determined to experience as much of Vietnam as possible during my 1 month of travel through the country. My journey started in Ho Chi Minh City in southern Vietnam, and during our 4-week trip there, I slowly worked my way north to Hanoi via buses and trains. Covering a total of 7 destinations, this was definitely one of my busiest months of travel in Southeast Asia.'
              }
            ],
            targetParagraphId: 'p1',
            targetSnippet: 'definitely one of my busiest months of travel in Southeast Asia'
          },
          statement: {
            rawText: "1. The author's one month in Vietnam was her busiest month of travel in Southeast Asia.",
            deconstructedVariables: [
              { name: 'subject', text: "The author's one month in Vietnam" },
              { name: 'comparison_degree', text: 'was her busiest month (bận rộn nhất)', isTrapWord: true },
              { name: 'region', text: 'in Southeast Asia' }
            ]
          },
          passageEvidence: {
            rawText: 'Covering a total of 7 destinations, this was definitely one of my busiest months of travel in Southeast Asia.',
            targetVariables: [
              { matchingName: 'comparison_degree', text: 'one of my busiest months (MỘT TRONG NHỮNG tháng bận rộn nhất)' }
            ]
          },
          expectedRelation: 'contradiction',
          verdict: 'FALSE',
          pedagogicalInsight: 'FALSE vì bài đọc nêu rõ đây là "ONE OF my busiest months" (một trong số những tháng bận rộn nhất), chứ KHÔNG khẳng định đây là tháng bận rộn NHẤT tuyệt đối ("her busiest month")! Cấp độ so sánh bị bóp méo.'
        }
      },
      {
        stageNumber: 2,
        stageType: 'verification_scale',
        title: 'Câu 2 (T/F/NG): Bẫy Nguyên Nhân & Động Cơ (save money vs time was limited)',
        pedagogicalObjective: 'Quét trạm Sài Gòn để đối chiếu lý do đăng ký tour 1 ngày: do tiết kiệm tiền hay do giới hạn thời gian?',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Bấm Radar quét tìm lý do tác giả mua city tour 1 ngày tại Trạm 1 (Sài Gòn):',
          passageContext: {
            title: 'My 1-Month Vietnam Travel Itinerary: Planning A Vietnam Trip!',
            paragraphs: [
              {
                id: 'p2',
                label: 'Trạm 1: Ho Chi Minh City / Saigon (3 days)',
                text: 'In terms of sightseeing, since my time was limited; I decided to sign up for a 1-day tour of the city and I then spent the rest of the time wandering around on my own. My tour took me to the War Remnants Museum, Reunification Palace, Thien Hau Pagoda, Notre-Dame Basilica, and Saigon Central Post office!'
              }
            ],
            targetParagraphId: 'p2',
            targetSnippet: 'since my time was limited; I decided to sign up for a 1-day tour of the city'
          },
          statement: {
            rawText: '2. The author decided to sign up for a 1-day tour of the city because she wanted to save money.',
            deconstructedVariables: [
              { name: 'action', text: 'sign up for a 1-day tour of the city' },
              { name: 'reason', text: 'because she wanted to save money', isTrapWord: true }
            ]
          },
          passageEvidence: {
            rawText: 'In terms of sightseeing, since my time was limited; I decided to sign up for a 1-day tour of the city.',
            targetVariables: [
              { matchingName: 'reason', text: 'since my time was limited (VÌ THỜI GIAN CÓ HẠN, KHÔNG PHẢI TIẾT KIỆM TIỀN)' }
            ]
          },
          expectedRelation: 'contradiction',
          verdict: 'FALSE',
          pedagogicalInsight: 'FALSE vì tác giả đăng ký tour 1 ngày vì "thời gian có hạn" (since my time was limited), mâu thuẫn hoàn toàn với lý do "muốn tiết kiệm tiền" (wanted to save money) của đề bài!'
        }
      },
      {
        stageNumber: 3,
        stageType: 'verification_scale',
        title: 'Câu 3 (T/F/NG): Khớp Ý Nhận Định Quá Khứ (bland dish = flavourless dish)',
        pedagogicalObjective: 'Đối chiếu từ đồng nghĩa: bland dish without very much flavour tương đương flavourless dish.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Bấm Radar quét cảm nghĩ của tác giả về món phở TRƯỚC KHI đến Việt Nam:',
          passageContext: {
            title: 'My 1-Month Vietnam Travel Itinerary: Planning A Vietnam Trip!',
            paragraphs: [
              {
                id: 'p2',
                label: 'Trạm 1: Ho Chi Minh City / Saigon (3 days)',
                text: 'Saigon is a city for foodies! When I wasn’t sightseeing, I was eating around town and one of the food highlights turned out to be pho. I had tried pho before and I always thought it was such a bland dish without very much flavour, but as it turns out, I just needed to eat it in Vietnam to enjoy the dish in all its glory.'
              }
            ],
            targetParagraphId: 'p2',
            targetSnippet: 'I had tried pho before and I always thought it was such a bland dish without very much flavour'
          },
          statement: {
            rawText: '3. She had thought pho was a flavourless dish before traveling to Vietnam.',
            deconstructedVariables: [
              { name: 'time_context', text: 'before traveling to Vietnam' },
              { name: 'past_opinion', text: 'had thought pho was a flavourless dish' }
            ]
          },
          passageEvidence: {
            rawText: 'I had tried pho before and I always thought it was such a bland dish without very much flavour.',
            targetVariables: [
              { matchingName: 'past_opinion', text: 'always thought it was such a bland dish without very much flavour (món ăn nhạt nhẽo không có mùi vị)' }
            ]
          },
          expectedRelation: 'match',
          verdict: 'TRUE',
          pedagogicalInsight: 'TRUE! Cụm từ "bland dish without very much flavour" trong bài đọc đồng nghĩa hoàn toàn với "flavourless dish" trong đề bài. Cả hai đều chỉ quan điểm của tác giả trước khi sang Việt Nam.'
        }
      },
      {
        stageNumber: 4,
        stageType: 'verification_scale',
        title: 'Câu 4 (T/F/NG): Bẫy Tần Suất Lần Đầu Tiên (first time in Vietnam vs had tried before)',
        pedagogicalObjective: 'Bóc trần mâu thuẫn giữa "thử lần đầu tiên tại VN" và "đã từng ăn phở trước đó rồi".',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Bấm Radar quét lịch sử trải nghiệm món phở của tác giả:',
          passageContext: {
            title: 'My 1-Month Vietnam Travel Itinerary: Planning A Vietnam Trip!',
            paragraphs: [
              {
                id: 'p2',
                label: 'Trạm 1: Ho Chi Minh City / Saigon (3 days)',
                text: 'I had tried pho before and I always thought it was such a bland dish without very much flavour, but as it turns out, I just needed to eat it in Vietnam to enjoy the dish in all its glory. The combination of cilantro, chilli peppers, lime, Asian basil and bean sprouts was amazing!'
              }
            ],
            targetParagraphId: 'p2',
            targetSnippet: 'I had tried pho before and I always thought it was such a bland dish'
          },
          statement: {
            rawText: '4. She tried pho for the first time in Vietnam and was amazed by the combination of several ingredients.',
            deconstructedVariables: [
              { name: 'experience', text: 'tried pho for the first time in Vietnam', isTrapWord: true },
              { name: 'reaction', text: 'amazed by the combination of several ingredients' }
            ]
          },
          passageEvidence: {
            rawText: 'I had tried pho before and I always thought it was such a bland dish without very much flavour.',
            targetVariables: [
              { matchingName: 'experience', text: 'I had tried pho before (ĐÃ TỪNG THỬ PHỞ TRƯỚC ĐÓ RỒI, KHÔNG PHẢI LẦN ĐẦU TIÊN)' }
            ]
          },
          expectedRelation: 'contradiction',
          verdict: 'FALSE',
          pedagogicalInsight: 'FALSE vì tác giả nói "I had tried pho before" (tôi đã từng ăn phở trước đây rồi), nghĩa là không phải lần đầu tiên ăn phở ở Việt Nam ("tried pho for the first time in Vietnam"). Một nửa câu sau đúng nhưng nửa đầu sai làm toàn câu thành FALSE!'
        }
      },
      {
        stageNumber: 5,
        stageType: 'verification_scale',
        title: 'Câu 5 (T/F/NG): Bẫy So Sánh Nhất Không Được Đề Cập (the most sobering experience?)',
        pedagogicalObjective: 'Phát hiện sự thiếu vắng từ so sánh nhất: bài chỉ dùng "a sobering look" chứ không hề so sánh "the most sobering".',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Bấm Radar quét nhận xét của tác giả về Bảo tàng Chứng tích Chiến tranh:',
          passageContext: {
            title: 'My 1-Month Vietnam Travel Itinerary: Planning A Vietnam Trip!',
            paragraphs: [
              {
                id: 'p2',
                label: 'Trạm 1: Ho Chi Minh City / Saigon (3 days)',
                text: 'My tour took me to the Vietnam War Remnants Museum for a sobering look at the lasting effects of the Vietnam War, the Reunification Palace, the Thien Hau Pagoda, the Saigon Notre-Dame Basilica, and lastly the Saigon Central Post office!'
              }
            ],
            targetParagraphId: 'p2',
            targetSnippet: 'Vietnam War Remnants Museum for a sobering look at the lasting effects of the Vietnam War'
          },
          statement: {
            rawText: '5. Of all places in Ho Chi Minh City, the visit to the Vietnam War Remnants Museum was the most sobering experience.',
            deconstructedVariables: [
              { name: 'scope', text: 'Of all places in Ho Chi Minh City' },
              { name: 'superlative_claim', text: 'was the most sobering experience', isTrapWord: true }
            ]
          },
          passageEvidence: {
            rawText: 'My tour took me to the Vietnam War Remnants Museum for a sobering look at the lasting effects of the Vietnam War.',
            targetVariables: [
              { matchingName: 'superlative_claim', text: 'CHỈ NÊU "A SOBERING LOOK", KHÔNG CÓ SO SÁNH VỚI CÁC ĐỊA ĐIỂM KHÁC' }
            ]
          },
          expectedRelation: 'no_evidence',
          verdict: 'NOT GIVEN',
          pedagogicalInsight: 'NOT GIVEN vì tác giả chỉ miêu tả bảo tàng đem lại "a sobering look" (một góc nhìn trầm mặc, đáng suy ngẫm), hoàn toàn KHÔNG hề so sánh xem đây có phải là trải nghiệm đáng suy ngẫm NHẤT ("the most sobering") so với các địa điểm khác trong thành phố hay không!'
        }
      }
    ]
  },
  {
    id: 'dreamer_w3d3',
    courseId: 'dreamer',
    week: 3,
    day: 3,
    skill: 'speaking',
    title: 'The 3-Tier Utility Response Model',
    subtitle: 'Kiến Tạo Câu Trả Lời Về Công Nghệ & Tiện Ích',
    coreCompetency: 'Bóc tách cấu trúc trả lời câu hỏi "What do you use your phone/app for?" theo 3 cấp độ: Tool -> Core Action -> Concrete Value.',
    bridgeToHomework: {
      promptText: 'Thu âm câu trả lời về ứng dụng và công nghệ yêu thích trong Homework W3D3.',
      targetExamId: 'exam_dreamer_w3d3'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'progressive_reveal',
        title: 'Bóc tách 4 tầng phản xạ trả lời về ứng dụng công nghệ',
        pedagogicalObjective: 'Nâng cấp câu trả lời từ liệt kê đơn thuần (I use Shopee to buy) thành lập luận hoàn chỉnh.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click mở từng tầng để nắm cấu trúc câu trả lời đa tầng về việc dùng app/website:',
          cards: [
            {
              step: 1,
              label: 'DIRECT TOOL IDENTIFICATION',
              cognitiveFunction: 'Tên công cụ & Mục đích chính',
              content: 'Whenever I need to manage my daily schedule, Google Calendar is my go-to application.',
              pedagogyNote: 'Dùng cụm "is my go-to application" thay vì chỉ nói "I use Google Calendar".'
            },
            {
              step: 2,
              label: 'PRIMARY FUNCTION / CORE BENEFIT',
              cognitiveFunction: 'Tính năng cốt lõi giúp ích gì?',
              content: 'It helps me set precise reminders and organize my study tasks effectively.',
              pedagogyNote: 'Áp dụng cấu trúc "It helps me + bare infinitive" đã học ở W1D1.'
            },
            {
              step: 3,
              label: 'EXTENDED BENEFIT / CONTRAST',
              cognitiveFunction: 'Lợi ích nâng cao hoặc tình huống cụ thể',
              content: 'Thanks to its automated notifications, I never miss important submission deadlines.',
              pedagogyNote: 'Dùng cấu trúc "Thanks to + Noun phrase" để tạo liên kết nhân quả tự nhiên.',
              branchOptions: [
                { branchName: 'CONTRAST', content: 'Before using it, I frequently forgot homework deadlines and class schedules.', note: 'Nhánh tương phản với quá khứ lộn xộn.' },
                { branchName: 'DETAIL / HABIT', content: 'Specifically, I review my task board every evening before going to bed.', note: 'Nhánh thói quen cụ thể hằng ngày.' }
              ]
            },
            {
              step: 4,
              label: 'VALUE IMPACT',
              cognitiveFunction: 'Tác động lâu dài đến cuộc sống/học tập',
              content: 'As a result, it has significantly boosted my study productivity and peace of mind.',
              pedagogyNote: 'Khép lại câu trả lời bằng kết quả chuyển đổi tích cực.'
            }
          ],
          fullMosaicSummary: 'Whenever I need to manage my schedule, Google Calendar is my go-to application. It helps me set precise reminders and organize my tasks. Thanks to its notifications, I never miss deadlines, which has significantly boosted my study productivity.'
        }
      }
    ]
  },
  {
    id: 'dreamer_w4d1',
    courseId: 'dreamer',
    week: 4,
    day: 1,
    skill: 'writing',
    title: 'The Modifier Attachment Engine',
    subtitle: 'Khóa Khớp Bổ Ngữ & Định Vị Trọng Lực Nghĩa',
    coreCompetency: 'Nhận diện đúng đối tượng chịu lực của Bổ ngữ: Tính từ bổ nghĩa Danh từ, Trạng từ bổ nghĩa Động từ/Tính từ khác. Chấm dứt lỗi dịch thô dùng trạng từ sai vị trí hoặc dùng nhầm từ loại.',
    bridgeToHomework: {
      promptText: 'Thực hành sửa lỗi bổ ngữ tính từ - trạng từ trong Homework W4D1.',
      targetExamId: 'exam_dreamer_w4d1'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'productive_failure',
        title: 'Break (Phát hiện lệch khớp Bổ Ngữ)',
        pedagogicalObjective: 'Đối diện lỗi kinh điển nhầm lẫn giữa Tính từ và Trạng từ sau linking verb hoặc trạng từ chỉ mức độ.',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Click vào cặp từ gây xung đột chức năng bổ ngữ trong câu dưới đây:',
          mode: 'break_and_repair',
          tokens: [
            { id: 't1', text: 'The food', role: 'subject', colorClass: 'green' },
            { id: 't2', text: 'smells', role: 'fv_core', colorClass: 'orange' },
            { id: 't3', text: 'awfully', role: 'adverb', colorClass: 'red' },
            { id: 't4', text: 'to the guests', role: 'scope_condition', colorClass: 'blue' }
          ],
          collisionTarget: {
            conflictingTokenIds: ['t2', 't3'],
            errorMessage: 'Lỗi lệch khớp bổ ngữ: smells ở đây đóng vai trò là Động từ nối (Linking Verb) phản chiếu trạng thái của Thức ăn (The food), đòi hỏi một Tính từ (Adj) chứ không thể dùng Trạng từ đuôi -ly (awfully)!',
            repairOptions: [
              {
                id: 'opt1',
                action: 'delete',
                targetTokenId: 't3',
                resultText: 'awful',
                explanation: 'Gọt bỏ đuôi "-ly" chuyển thành tính từ "awful" để bổ nghĩa cho chủ ngữ "The food".'
              }
            ]
          }
        }
      }
    ]
  },
  {
    id: 'dreamer_w4d2',
    courseId: 'dreamer',
    week: 4,
    day: 2,
    skill: 'reading',
    title: 'The Semantic Boundary & Medical Trap Lab',
    subtitle: 'Bóc Tách Toàn Bộ 6 Bẫy Nhận Thức Khoa Học Sức Khỏe',
    coreCompetency: 'Phân định ranh giới giữa các thuật ngữ y học có vẻ giống nhau (blood pressure vs blood sugar), bẫy lượng từ (all vs unprocessed), và bẫy suy đoán so sánh nhất.',
    bridgeToHomework: {
      promptText: 'Luyện tập giải đề T/F/NG về quan niệm sức khỏe trong Homework W4D2.',
      targetExamId: 'exam_dreamer_w4d2'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'verification_scale',
        title: 'Câu 1 (T/F/NG): Khớp Ý Trực Diện (large breakfast & weight loss)',
        pedagogicalObjective: 'Đối chiếu kết quả nghiên cứu trên nhóm phụ nữ thừa cân ăn sáng nhiều.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Bấm Radar quét kết quả nghiên cứu về bữa sáng trong Mục A:',
          passageContext: {
            title: 'The truth behind some common health beliefs',
            paragraphs: [
              {
                id: 'pA',
                label: "Mục A · 'Breakfast is the most important meal of the day'",
                text: 'One study on overweight female volunteers found that those who ate a large breakfast saw greater weight loss than another group who had a low-calorie breakfast and a larger dinner.'
              }
            ],
            targetParagraphId: 'pA',
            targetSnippet: 'those who ate a large breakfast saw greater weight loss'
          },
          statement: {
            rawText: '1. A study showed that eating a large breakfast helped people lose more weight.',
            deconstructedVariables: [
              { name: 'evidence_type', text: 'A study showed' },
              { name: 'action', text: 'eating a large breakfast' },
              { name: 'outcome', text: 'helped people lose more weight' }
            ]
          },
          passageEvidence: {
            rawText: 'One study on overweight female volunteers found that those who ate a large breakfast saw greater weight loss than another group.',
            targetVariables: [
              { matchingName: 'outcome', text: 'saw greater weight loss (giảm cân nhiều hơn)' }
            ]
          },
          expectedRelation: 'match',
          verdict: 'TRUE',
          pedagogicalInsight: 'TRUE! Nghiên cứu chỉ ra rằng nhóm ăn sáng nhiều đạt mức giảm cân lớn hơn ("saw greater weight loss"), hoàn toàn trùng khớp với khẳng định "helped people lose more weight" của đề bài.'
        }
      },
      {
        stageNumber: 2,
        stageType: 'verification_scale',
        title: 'Câu 2 (T/F/NG): Bẫy Tráo Thuật Ngữ Y Khoa (blood pressure vs blood sugar)',
        pedagogicalObjective: 'Phát hiện bẫy tráo đổi thuật ngữ: đường huyết (blood sugar) bị cố tình tráo thành huyết áp (blood pressure).',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Bấm Radar quét phát biểu của chuyên gia Brady Holmer trong Mục A:',
          passageContext: {
            title: 'The truth behind some common health beliefs',
            paragraphs: [
              {
                id: 'pA',
                label: "Mục A · 'Breakfast is the most important meal of the day'",
                text: '"People who eat a big breakfast instead of a big dinner also tend to lose more weight, feel less hungry and can control their blood sugar levels better," says Brady Holmer, a researcher at Examine.com.'
              }
            ],
            targetParagraphId: 'pA',
            targetSnippet: 'can control their blood sugar levels better'
          },
          statement: {
            rawText: '2. According to Brady Holmer, people eating a large breakfast rather than larger dinner can control their blood pressure better.',
            deconstructedVariables: [
              { name: 'subject_source', text: 'According to Brady Holmer' },
              { name: 'action', text: 'eating a large breakfast rather than larger dinner' },
              { name: 'medical_term', text: 'control their blood pressure better', isTrapWord: true }
            ]
          },
          passageEvidence: {
            rawText: 'People who eat a big breakfast instead of a big dinner also tend to lose more weight, feel less hungry and can control their blood sugar levels better.',
            targetVariables: [
              { matchingName: 'medical_term', text: 'control their blood sugar levels better (ĐƯỜNG HUYẾT, KHÔNG PHẢI HUYẾT ÁP)' }
            ]
          },
          expectedRelation: 'contradiction',
          verdict: 'FALSE',
          pedagogicalInsight: 'FALSE vì Brady Holmer nói rõ là kiểm soát đường huyết ("blood sugar levels"), trong khi đề bài cố tình tráo thành huyết áp ("blood pressure"). Hai thuật ngữ y khoa hoàn toàn khác nhau!'
        }
      },
      {
        stageNumber: 3,
        stageType: 'verification_scale',
        title: 'Câu 3 (T/F/NG): Bẫy So Sánh Nhất Không Được Đề Cập (the most serious effects?)',
        pedagogicalObjective: 'Phát hiện câu khẳng định hậu quả nặng nề nhất đối với người béo phì không hề có căn cứ trong bài đọc.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Bấm Radar quét đoạn kết luận của Mục A về tác động của việc bỏ bữa sáng:',
          passageContext: {
            title: 'The truth behind some common health beliefs',
            paragraphs: [
              {
                id: 'pA',
                label: 'Mục A · Kết luận về việc bỏ bữa sáng',
                text: 'Skipping it may have varying effects on weight and energy for different people. If you can make it through the morning on an apple and coffee, just go for it. However, if you tend to overeat later in the day, a larger breakfast could help.'
              }
            ],
            targetParagraphId: 'pA',
            targetSnippet: 'Skipping it may have varying effects on weight and energy for different people'
          },
          statement: {
            rawText: '3. Skipping breakfast has the most serious effects on overweight people.',
            deconstructedVariables: [
              { name: 'condition', text: 'Skipping breakfast' },
              { name: 'superlative_effect', text: 'has the most serious effects on overweight people', isTrapWord: true }
            ]
          },
          passageEvidence: {
            rawText: 'Bài đọc chỉ nêu việc bỏ bữa sáng có tác động khác nhau tùy cơ địa mỗi người ("varying effects for different people"). Tuyệt nhiên không có bất kỳ dòng nào so sánh rằng người thừa cân chịu hậu quả nặng nề nhất ("most serious effects").',
            targetVariables: [
              { matchingName: 'superlative_effect', text: 'KHÔNG CÓ SO SÁNH HẬU QUẢ NẶNG NỀ NHẤT CHO NGƯỜI THỪA CÂN' }
            ]
          },
          expectedRelation: 'no_evidence',
          verdict: 'NOT GIVEN',
          pedagogicalInsight: 'NOT GIVEN vì bài đọc chỉ nói bỏ bữa sáng gây tác động khác nhau tùy người ("varying effects"), hoàn toàn không có thông tin nói người thừa cân chịu hậu quả nặng nề nhất ("the most serious effects").'
        }
      },
      {
        stageNumber: 4,
        stageType: 'verification_scale',
        title: 'Câu 4 (T/F/NG): Bẫy Lịch Sử Khoa Học (wasn’t based on science vs proved by science)',
        pedagogicalObjective: 'Bóc trần mâu thuẫn giữa việc con số 10.000 bước vào thập niên 1960 KHÔNG dựa trên khoa học với việc đề bài nói được khoa học chứng minh.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Bấm Radar quét nguồn gốc lịch sử của con số 10.000 bước trong Mục B:',
          passageContext: {
            title: 'The truth behind some common health beliefs',
            paragraphs: [
              {
                id: 'pB',
                label: "Mục B · 'You should walk 10,000 steps a day'",
                text: 'It is surprising that this number wasn’t based on any science when it first came up in the 1960s, but it might be good advice. A study in 2022 found that walking may reduce the risk of death from cardiovascular disease and cancer.'
              }
            ],
            targetParagraphId: 'pB',
            targetSnippet: 'this number wasn’t based on any science when it first came up in the 1960s'
          },
          statement: {
            rawText: '4. In the 1960s, scientific research proved that walking 10,000 steps a day is beneficial to our health.',
            deconstructedVariables: [
              { name: 'timeline', text: 'In the 1960s' },
              { name: 'claim', text: 'scientific research proved that walking 10,000 steps is beneficial', isTrapWord: true }
            ]
          },
          passageEvidence: {
            rawText: 'It is surprising that this number wasn’t based on any science when it first came up in the 1960s, but it might be good advice.',
            targetVariables: [
              { matchingName: 'claim', text: 'wasn’t based on any science in the 1960s (KHÔNG DỰA TRÊN BẤT KỲ KHOA HỌC NÀO)' }
            ]
          },
          expectedRelation: 'contradiction',
          verdict: 'FALSE',
          pedagogicalInsight: 'FALSE vì bài đọc chỉ rõ: khi con số này xuất hiện vào thập niên 1960, nó KHÔNG hề dựa trên bất kỳ cơ sở khoa học nào ("wasn’t based on any science"), đối lập hoàn toàn với khẳng định "scientific research proved" của đề bài!'
        }
      },
      {
        stageNumber: 5,
        stageType: 'verification_scale',
        title: 'Câu 5 (T/F/NG): Khớp Ý Từ Đồng Nghĩa (don’t distinguish = did not differentiate)',
        pedagogicalObjective: 'Đối chiếu từ đồng nghĩa: don’t distinguish between processed and unprocessed tương đương did not differentiate.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Bấm Radar quét phương pháp nghiên cứu thịt đỏ trong Mục C:',
          passageContext: {
            title: 'The truth behind some common health beliefs',
            paragraphs: [
              {
                id: 'pC',
                label: "Mục C · 'Red meat is bad for you'",
                text: 'Several studies have shown a link between a higher intake of red meat and an increased risk of cancer and heart disease. However, it is now widely believed that this might not be correct, because many studies don’t distinguish between processed (bacon, sausages, burgers and deli meats) and unprocessed red meat intake.'
              }
            ],
            targetParagraphId: 'pC',
            targetSnippet: 'many studies don’t distinguish between processed ... and unprocessed red meat intake'
          },
          statement: {
            rawText: '5. Many studies on red meat did not differentiate between processed and unprocessed red meat in their studies.',
            deconstructedVariables: [
              { name: 'subject', text: 'Many studies on red meat' },
              { name: 'methodological_flaw', text: 'did not differentiate between processed and unprocessed' }
            ]
          },
          passageEvidence: {
            rawText: 'many studies don’t distinguish between processed (bacon, sausages, burgers and deli meats) and unprocessed red meat intake.',
            targetVariables: [
              { matchingName: 'methodological_flaw', text: 'don’t distinguish between processed and unprocessed (không phân biệt giữa thịt đã chế biến và thịt chưa chế biến)' }
            ]
          },
          expectedRelation: 'match',
          verdict: 'TRUE',
          pedagogicalInsight: 'TRUE! Cụm từ "don’t distinguish" trong bài đọc đồng nghĩa 100% với "did not differentiate" trong đề bài. Cả hai đều chỉ lỗi không phân biệt thịt chế biến sẵn và thịt tươi sống.'
        }
      },
      {
        stageNumber: 6,
        stageType: 'verification_scale',
        title: 'Câu 6 (T/F/NG): Bẫy Lượng Từ Tuyệt Đối (all types vs continue unprocessed)',
        pedagogicalObjective: 'Bóc trần mâu thuẫn giữa việc khuyên tránh mọi loại thịt đỏ (avoid all types) và khuyến cáo vẫn có thể tiếp tục ăn thịt chưa qua chế biến (continue to eat unprocessed).',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Bấm Radar quét khuyến nghị của các tổ chức y tế lớn trong Mục C:',
          passageContext: {
            title: 'The truth behind some common health beliefs',
            paragraphs: [
              {
                id: 'pC',
                label: 'Mục C · Khuyến nghị của tổ chức y tế lớn',
                text: '"Several recent studies have found that eating unprocessed red meat may not actually increase the risk of heart disease or cancer, and major health organisations have recommended that people can continue to eat unprocessed red meat," says Holmer.'
              }
            ],
            targetParagraphId: 'pC',
            targetSnippet: 'major health organisations have recommended that people can continue to eat unprocessed red meat'
          },
          statement: {
            rawText: '6. Major health organizations recommend that people avoid eating all types of red meat.',
            deconstructedVariables: [
              { name: 'source', text: 'Major health organizations' },
              { name: 'recommendation', text: 'avoid eating all types of red meat (tránh TẤT CẢ các loại thịt đỏ)', isTrapWord: true }
            ]
          },
          passageEvidence: {
            rawText: 'major health organisations have recommended that people can continue to eat unprocessed red meat.',
            targetVariables: [
              { matchingName: 'recommendation', text: 'continue to eat unprocessed red meat (vẫn có thể tiếp tục ăn thịt chưa chế biến)' }
            ]
          },
          expectedRelation: 'contradiction',
          verdict: 'FALSE',
          pedagogicalInsight: 'FALSE vì các tổ chức y tế lớn khuyến nghị mọi người vẫn CÓ THỂ TIẾP TỤC ĂN thịt đỏ chưa qua chế biến ("can continue to eat unprocessed red meat"), mâu thuẫn trực tiếp với từ "avoid eating ALL types" của đề bài!'
        }
      }
    ]
  },
  {
    id: 'dreamer_w4d3',
    courseId: 'dreamer',
    week: 4,
    day: 3,
    skill: 'speaking',
    title: 'The Habit-Impact-Remedy Framework',
    subtitle: 'Mô Hình Phản Xạ Nói Về Thói Quen Sức Khỏe',
    coreCompetency: 'Xây dựng câu trả lời mạch lạc về thói quen sức khỏe (Unhealthy Habits / Staying Healthy) theo tiến trình: Habit -> Consequence -> Remedy.',
    bridgeToHomework: {
      promptText: 'Thu âm câu trả lời về thói quen sinh hoạt và sức khỏe trong Homework W4D3.',
      targetExamId: 'exam_dreamer_w4d3'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'progressive_reveal',
        title: 'Bóc tách 4 tầng phản xạ trả lời về thói quen sinh hoạt',
        pedagogicalObjective: 'Chấm dứt thói quen chỉ kể lể (I stay up late), nâng cấp thành chuỗi lập luận nguyên nhân - hậu quả - giải pháp.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click mở từng tầng để nắm cấu trúc câu trả lời đa tầng về thói quen sức khỏe:',
          cards: [
            {
              step: 1,
              label: 'HABIT ACKNOWLEDGEMENT',
              cognitiveFunction: 'Thừa nhận thói quen thực tế',
              content: 'To be completely honest, I have a terrible habit of staying up late to finish deadlines.',
              pedagogyNote: 'Dùng cụm "To be completely honest, I have a bad habit of..." để tự nhiên hóa câu mở đầu.'
            },
            {
              step: 2,
              label: 'NEGATIVE IMPACT / SYMPTOM',
              cognitiveFunction: 'Hậu quả thể chất hoặc tinh thần',
              content: 'Because of not getting enough sleep, it always makes me feel exhausted and inactive during the day.',
              pedagogyNote: 'Dùng cấu trúc "it makes me feel + adjective" (exhausted / inactive) thay vì chỉ nói "I am tired".'
            },
            {
              step: 3,
              label: 'ACTION / REMEDY EFFORT',
              cognitiveFunction: 'Hành động điều chỉnh hoặc giải pháp',
              content: 'Therefore, I am trying to break this habit by working out at the gym for 30 minutes every morning.',
              pedagogyNote: 'Áp dụng cụm "break this habit by + V-ing" và "work out at the gym".',
              branchOptions: [
                { branchName: 'FITNESS ACTION', content: 'Therefore, I decided to do yoga and work out at the gym to stay in shape.', note: 'Nhánh giải pháp tập luyện thể chất.' },
                { branchName: 'DIET ACTION', content: 'Therefore, I am trying to have a balanced diet and avoid junk food completely.', note: 'Nhánh giải pháp ăn uống lành mạnh.' }
              ]
            },
            {
              step: 4,
              label: 'POSITIVE OUTCOME',
              cognitiveFunction: 'Kỳ vọng phục hồi thể trạng',
              content: 'This enables me to be much more energetic so that I can work and study effectively.',
              pedagogyNote: 'Dùng cấu trúc "This enables me to + verb so that..." để kết thúc ấn tượng.'
            }
          ],
          fullMosaicSummary: 'To be completely honest, I have a terrible habit of staying up late. Because of not getting enough sleep, it makes me feel exhausted. Therefore, I am trying to break this habit by working out at the gym, which enables me to be more energetic and work effectively.'
        }
      }
    ]
  },
  {
    id: 'dreamer_w5d1',
    courseId: 'dreamer',
    week: 5,
    day: 1,
    skill: 'writing',
    title: 'The Prepositional Anchor Engine',
    subtitle: 'Neo Móc Cụm Giới Từ & Tránh Lỗi Lửng Lơ',
    coreCompetency: 'Nhận diện giới từ luôn cần Danh từ làm vật neo (Object of Preposition). Phân biệt cụm giới từ đóng vai trò Tính từ (bổ nghĩa danh từ) vs Trạng từ (bổ nghĩa hành động).',
    bridgeToHomework: {
      promptText: 'Luyện tập sử dụng cụm giới từ và rút gọn mệnh đề trong Homework W5D1.',
      targetExamId: 'exam_dreamer_w5d1'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'productive_failure',
        title: 'Break (Phát hiện gãy móc neo Cụm Giới Từ)',
        pedagogicalObjective: 'Đối diện với lỗi dịch thô bỏ rơi giới từ hoặc chèn giới từ lơ lửng không có đối tượng tiếp nhận.',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Click vào cặp từ gây xung đột liên kết giới từ trong câu dưới đây:',
          mode: 'break_and_repair',
          tokens: [
            { id: 't1', text: 'My daughter', role: 'subject', colorClass: 'green' },
            { id: 't2', text: 'is very good', role: 'fv_core', colorClass: 'orange' },
            { id: 't3', text: 'in', role: 'preposition', colorClass: 'red' },
            { id: 't4', text: 'singing folk songs', role: 'object', colorClass: 'blue' }
          ],
          collisionTarget: {
            conflictingTokenIds: ['t2', 't3'],
            errorMessage: 'Xung đột khớp nối: Cụm tính từ "good" khi đi kèm năng khiếu/kỹ năng bắt buộc phải neo bằng giới từ "at", không dùng "in" theo cách dịch thô tiếng Việt ("giỏi trong việc hát")!',
            repairOptions: [
              {
                id: 'opt1',
                action: 'delete',
                targetTokenId: 't3',
                resultText: 'at',
                explanation: 'Đổi giới từ "in" thành "at" để tạo thành cụm cố định "good at + V-ing".'
              }
            ]
          }
        }
      }
    ]
  },
  {
    id: 'dreamer_w5d2',
    courseId: 'dreamer',
    week: 5,
    day: 2,
    skill: 'reading',
    title: 'The Topic Sentence Spotlight & Gap-Fill Engine',
    subtitle: 'Chiếu Sáng Câu Chủ Đề (Đoạn A - F) & Nhặt Từ Gốc Gap-Fill',
    coreCompetency: 'Nắm vững kỹ năng Skimming (chiếu sáng Topic Sentence ở đầu/cuối đoạn) để hiểu cấu trúc toàn bài, kết hợp kỹ năng Scanning nhặt đúng 1 từ gốc (ONE WORD ONLY) cho câu hỏi tóm tắt.',
    bridgeToHomework: {
      promptText: 'Làm bài đọc hiểu về văn hóa Karaoke ở Việt Nam trong Homework W5D2.',
      targetExamId: 'exam_dreamer_w5d2'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'verification_scale',
        title: 'Câu 7 (Gap-Fill): Nhặt Từ Gốc Đoạn A (tradition by foreigners)',
        pedagogicalObjective: 'Quét Đoạn A, định vị từ bổ nghĩa cho "musical tradition" để nhặt đúng 1 từ gốc duy nhất.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Bấm Radar quét nhận định của tác giả về truyền thống âm nhạc Karaoke ở Đoạn A:',
          passageContext: {
            title: 'Karaoke in Vietnam',
            paragraphs: [
              {
                id: 'pA',
                label: 'Đoạn A · Cảm nhận ban đầu của người nước ngoài',
                text: 'Karaoke in Vietnam is a very interesting story. When I first arrived in this country, I had many expectations, but none of them involved public singing. This strange musical tradition has become an important part of modern Vietnamese life, and over the next three months, I had to seriously readjust my thoughts of the sing-along art form.'
              }
            ],
            targetParagraphId: 'pA',
            targetSnippet: 'This strange musical tradition has become an important part of modern Vietnamese life'
          },
          statement: {
            rawText: '7. Although Karaoke is regarded as a [STRANGE] Vietnamese tradition by foreigners, it is an important part of people’s lives.',
            deconstructedVariables: [
              { name: 'concession', text: 'Although regarded as a [.....] tradition' },
              { name: 'gap_word', text: 'strange (kỳ lạ, xa lạ)', isTrapWord: false },
              { name: 'contrast', text: 'important part of people’s lives' }
            ]
          },
          passageEvidence: {
            rawText: 'This strange musical tradition has become an important part of modern Vietnamese life.',
            targetVariables: [
              { matchingName: 'gap_word', text: 'strange (tính từ đứng trước musical tradition)' }
            ]
          },
          expectedRelation: 'match',
          verdict: 'TRUE',
          pedagogicalInsight: 'Từ cần điền là "strange". Trong câu gốc: "This strange musical tradition has become an important part...", tính từ "strange" bổ nghĩa trực tiếp cho truyền thống âm nhạc này dưới con mắt người nước ngoài.'
        }
      },
      {
        stageNumber: 2,
        stageType: 'verification_scale',
        title: 'Câu 8 (Gap-Fill): Nhặt Từ Gốc Đoạn B (completely ... places)',
        pedagogicalObjective: 'Quét Đoạn B, đối chiếu vị trí xuất hiện của dàn máy karaoke di động trên đường phố.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Bấm Radar quét phản ứng của tác giả khi thấy máy karaoke xuất hiện trên đường phố ở Đoạn B:',
          passageContext: {
            title: 'Karaoke in Vietnam',
            paragraphs: [
              {
                id: 'pB',
                label: 'Đoạn B · Sự cuồng nhiệt & Karaoke đường phố',
                text: 'It’s pretty hilarious whenever you see a wild karaoke machine pop up out of nowhere at completely inappropriate moments. In Vietnam, Karaoke is love. Karaoke is life.'
              }
            ],
            targetParagraphId: 'pB',
            targetSnippet: 'pop up out of nowhere at completely inappropriate moments'
          },
          statement: {
            rawText: '8. In Vietnamese cities, it is not uncommon to see a Karaoke machine in completely [INAPPROPRIATE] places.',
            deconstructedVariables: [
              { name: 'location_phenomenon', text: 'not uncommon to see a Karaoke machine' },
              { name: 'modifier', text: 'in completely [.....] places' },
              { name: 'gap_word', text: 'inappropriate (không phù hợp / trớ trêu)', isTrapWord: false }
            ]
          },
          passageEvidence: {
            rawText: 'a wild karaoke machine pop up out of nowhere at completely inappropriate moments.',
            targetVariables: [
              { matchingName: 'gap_word', text: 'inappropriate (tính từ đứng sau completely)' }
            ]
          },
          expectedRelation: 'match',
          verdict: 'TRUE',
          pedagogicalInsight: 'Từ cần điền là "inappropriate". Cụm từ "completely inappropriate moments" trong bài đọc tương ứng với "completely inappropriate places" trong đề bài.'
        }
      },
      {
        stageNumber: 3,
        stageType: 'verification_scale',
        title: 'Câu 9 (Gap-Fill): Cụm Collocation Đoạn C (leave an ... on the locals)',
        pedagogicalObjective: 'Quét Đoạn C, bắt cụm danh từ đi với động từ tạo ấn tượng (make / leave an impression).',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Bấm Radar quét lời khuyên dành cho du khách muốn tạo ấn tượng ở Đoạn C:',
          passageContext: {
            title: 'Karaoke in Vietnam',
            paragraphs: [
              {
                id: 'pC',
                label: 'Đoạn C · Thử sức với bài hát tiếng Việt',
                text: 'If you’re in the country for a while and really want to make an impression, try singing some Vietnamese songs: Vietnamese folk songs are beautiful things - usually about family, loss and home. But you only have to volunteer to sing and the locals will be more than willing to help you out with every single syllable.'
              }
            ],
            targetParagraphId: 'pC',
            targetSnippet: 'really want to make an impression, try singing some Vietnamese songs'
          },
          statement: {
            rawText: '9. Foreigners who can sing some popular Vietnamese songs can leave a good [IMPRESSION] on the locals.',
            deconstructedVariables: [
              { name: 'condition', text: 'sing some popular Vietnamese songs' },
              { name: 'collocation_verb', text: 'leave a good [.....] on the locals' },
              { name: 'gap_word', text: 'impression (ấn tượng)', isTrapWord: false }
            ]
          },
          passageEvidence: {
            rawText: 'If you’re in the country for a while and really want to make an impression, try singing some Vietnamese songs.',
            targetVariables: [
              { matchingName: 'gap_word', text: 'impression (collocation: make an impression = leave an impression)' }
            ]
          },
          expectedRelation: 'match',
          verdict: 'TRUE',
          pedagogicalInsight: 'Từ cần điền là "impression". Cụm diễn đạt trong đề "leave a good impression" tương đương 100% với cấu trúc "make an impression" trong bài đọc!'
        }
      },
      {
        stageNumber: 4,
        stageType: 'verification_scale',
        title: 'Câu 10 (Gap-Fill): Nhặt Động Từ Cốt Lõi Đoạn F (ability to ... people)',
        pedagogicalObjective: 'Quét Đoạn F để nhặt động từ chỉ khả năng kết nối con người của âm nhạc (capacity / ability to connect).',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Bấm Radar quét câu mở đoạn triết lý về âm nhạc trong Đoạn F:',
          passageContext: {
            title: 'Karaoke in Vietnam',
            paragraphs: [
              {
                id: 'pF',
                label: 'Đoạn F · Giá trị kết nối cộng đồng của Karaoke',
                text: 'Music has the capacity to connect us. This is something the Vietnamese understand well. Karaoke is a means of human connection - a way for even terrible singers to immerse themselves in a universal art form and express themselves intimately.'
              }
            ],
            targetParagraphId: 'pF',
            targetSnippet: 'Music has the capacity to connect us. This is something the Vietnamese understand well.'
          },
          statement: {
            rawText: '10. The Vietnamese know that music has the ability to [CONNECT] people.',
            deconstructedVariables: [
              { name: 'subject_clause', text: 'The Vietnamese know that' },
              { name: 'concept', text: 'music has the ability to [.....] people' },
              { name: 'gap_word', text: 'connect (kết nối)', isTrapWord: false }
            ]
          },
          passageEvidence: {
            rawText: 'Music has the capacity to connect us. This is something the Vietnamese understand well.',
            targetVariables: [
              { matchingName: 'gap_word', text: 'connect (capacity to connect = ability to connect)' }
            ]
          },
          expectedRelation: 'match',
          verdict: 'TRUE',
          pedagogicalInsight: 'Từ cần điền là "connect". Đề bài paraphrase "capacity to connect us" thành "ability to connect people". Động từ nguyên mẫu chính xác là "connect".'
        }
      }
    ]
  },
  {
    id: 'dreamer_w5d3',
    courseId: 'dreamer',
    week: 5,
    day: 3,
    skill: 'speaking',
    title: 'The Problem-Advice Diagnostic Flow',
    subtitle: 'Chuỗi Phản Xạ Đưa Lời Khuyên & Giải Quyết Vấn Đề',
    coreCompetency: 'Làm chủ phản xạ đưa lời khuyên cho bạn bè (Giving Advice): Thấu cảm vấn đề -> Giải pháp thực tế -> Khích lệ kiên trì.',
    bridgeToHomework: {
      promptText: 'Thu âm bài nói đưa lời khuyên giải quyết áp lực công việc và học tập trong Homework W5D3.',
      targetExamId: 'exam_dreamer_w5d3'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'progressive_reveal',
        title: 'Bóc tách 4 tầng phản xạ đưa lời khuyên (Giving Advice)',
        pedagogicalObjective: 'Chuyển từ câu khuyên bảo cụt lủn (You should do this) thành cấu trúc tư vấn đồng cảm và thuyết phục.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click mở từng tầng để làm chủ cấu trúc đưa lời khuyên giải quyết áp lực học tập/công việc:',
          cards: [
            {
              step: 1,
              label: 'EMPATHY & SITUATION ACKNOWLEDGEMENT',
              cognitiveFunction: 'Bày tỏ sự đồng cảm với vấn đề của đối phương',
              content: 'I completely understand how overwhelming it feels when you are struggling with heavy workloads.',
              pedagogyNote: 'Dùng cụm "I completely understand how overwhelming it feels when..." để tạo cảm giác thấu cảm trước khi khuyên.'
            },
            {
              step: 2,
              label: 'CONCRETE IMMEDIATE ACTION',
              cognitiveFunction: 'Hành động can thiệp tức thời',
              content: 'In my opinion, you should start using a digital planner to set clear daily goals and eliminate distractions.',
              pedagogyNote: 'Khuyên giải pháp cụ thể: "start using a planner... to set clear goals".'
            },
            {
              step: 3,
              label: 'ALTERNATIVE STRATEGY / HABIT SHIFT',
              cognitiveFunction: 'Chiến lược phụ trợ hoặc phương án linh hoạt',
              content: 'Additionally, turning off unnecessary phone notifications during study hours can double your focus.',
              pedagogyNote: 'Đưa ra thêm một giải pháp hỗ trợ thiết thực.',
              branchOptions: [
                { branchName: 'TIME MANAGEMENT', content: 'Additionally, breaking large projects into 25-minute Pomodoro sessions will keep you sharp.', note: 'Nhánh kỹ thuật quản lý thời gian Pomodoro.' },
                { branchName: 'MINDSET & REST', content: 'Additionally, spending at least 15 minutes meditating or walking helps reset your mental energy.', note: 'Nhánh nghỉ ngơi và nạp lại năng lượng.' }
              ]
            },
            {
              step: 4,
              label: 'ENCOURAGEMENT & LONG-TERM OUTLOOK',
              cognitiveFunction: 'Lời động viên và niềm tin tiến bộ',
              content: 'Building new habits takes time, but if you stay persistent, you will definitely get back on track.',
              pedagogyNote: 'Khép lại bằng lời khích lệ tích cực: "takes time, but if you stay persistent, you will get back on track".'
            }
          ],
          fullMosaicSummary: 'I completely understand how overwhelming it feels when struggling with workloads. In my opinion, you should start using a digital planner to set clear goals. Additionally, turning off notifications during study hours can double your focus. Building habits takes time, but if you stay persistent, you will definitely get back on track.'
        }
      }
    ]
  },
  {
    id: 'dreamer_w6d1',
    courseId: 'dreamer',
    week: 6,
    day: 1,
    skill: 'writing',
    title: 'The Relative Clause Bridge Engine',
    subtitle: 'Kiến Tạo Mệnh Đề Quan Hệ & Tránh Lỗi Lặp Đại Từ',
    coreCompetency: 'Nhận diện Relative Pronoun (who, which, that) vừa làm liên từ kết nối vừa nuốt chửng danh từ lặp lại. Chấm dứt lỗi Band 3.0 giữ nguyên đại từ thừa trong mệnh đề quan hệ.',
    bridgeToHomework: {
      promptText: 'Thực hành nối câu bằng Mệnh đề tính từ trong Homework W6D1.',
      targetExamId: 'exam_dreamer_w6d1'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'productive_failure',
        title: 'Break (Phát hiện sụp đổ do thừa đại từ lặp)',
        pedagogicalObjective: 'Đối diện lỗi kinh điển Band 3.0: Dùng "that/which" nhưng vẫn để lại "it/him" trong mệnh đề phụ.',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Click vào đại từ gây dư thừa cấu trúc trong mệnh đề quan hệ dưới đây:',
          mode: 'break_and_repair',
          tokens: [
            { id: 't1', text: 'I like the book', role: 'subject', colorClass: 'green' },
            { id: 't2', text: 'that', role: 'connector', colorClass: 'orange' },
            { id: 't3', text: 'you recommended', role: 'fv_core', colorClass: 'blue' },
            { id: 't4', text: 'it', role: 'object', colorClass: 'red' },
            { id: 't5', text: 'yesterday', role: 'scope_condition', colorClass: 'purple' }
          ],
          collisionTarget: {
            conflictingTokenIds: ['t2', 't4'],
            errorMessage: 'Lỗi lặp đại từ: Đại từ quan hệ "that" đã thay thế cho "the book" làm tân ngữ của động từ "recommended", việc giữ lại "it" khiến câu bị thừa 2 tân ngữ tranh chấp một vị trí!',
            repairOptions: [
              {
                id: 'opt1',
                action: 'delete',
                targetTokenId: 't4',
                resultText: '',
                explanation: 'Gọt bỏ đại từ "it" để "that" kết nối trực tiếp với "recommended".'
              }
            ]
          }
        }
      }
    ]
  },
  {
    id: 'dreamer_w6d2',
    courseId: 'dreamer',
    week: 6,
    day: 2,
    skill: 'reading',
    title: 'The Origin & Historical Trace Lab',
    subtitle: 'Truy Vết Bằng Chứng Lịch Sử & Bẫy Đảo Trật Tự Thời Gian',
    coreCompetency: 'Đối chiếu trật tự các sự kiện trong bài đọc lịch sử công nghệ (Facemash -> Thefacebook -> Facebook) để tránh bẫy đảo lộn nhân vật hoặc mục đích sáng lập.',
    bridgeToHomework: {
      promptText: 'Làm bài đọc hiểu về lịch sử hình thành Facebook trong Homework W6D2.',
      targetExamId: 'exam_dreamer_w6d2'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'verification_scale',
        title: 'Bẫy Mục Đích Ban Đầu (Original Purpose Trap)',
        pedagogicalObjective: 'Phát hiện sự sai lệch giữa mục đích ban đầu của Facemash (so sánh ảnh sinh viên ký túc xá) và nhận định đề bài.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Đặt nhận định lên bàn cân logic để đối chiếu với bối cảnh ra đời của Facemash năm 2003:',
          statement: {
            rawText: 'Mark Zuckerberg created Facemash with official permission from Harvard security to connect university students.',
            deconstructedVariables: [
              { name: 'subject', text: 'Mark Zuckerberg' },
              { name: 'permission', text: 'with official permission from Harvard', isTrapWord: true },
              { name: 'action', text: 'created Facemash to connect students' }
            ]
          },
          passageEvidence: {
            rawText: 'He put his computer science skills to questionable use by hacking into Harvard\'s security network, where he copied student ID images.',
            targetVariables: [
              { matchingName: 'permission', text: 'hacking into Harvard\'s security network (xâm nhập trái phép, KHÔNG PHẢI có phép)' }
            ]
          },
          expectedRelation: 'contradiction',
          verdict: 'FALSE',
          pedagogicalInsight: 'FALSE vì bài đọc chỉ rõ Zuckerberg đã tấn công bảo mật trái phép ("hacking into Harvard\'s security network"), mâu thuẫn trực tiếp với khẳng định "with official permission" của đề bài.'
        }
      }
    ]
  },
  {
    id: 'dreamer_w6d3',
    courseId: 'dreamer',
    week: 6,
    day: 3,
    skill: 'speaking',
    title: 'The Travel Preference & Contrast Engine',
    subtitle: 'Cấu Trúc Trả Lời Về Sở Thích Du Lịch & Trải Nghiệm Văn Hóa',
    coreCompetency: 'Nâng cấp câu trả lời Speaking Part 1 về Travel từ câu đơn (I like traveling because it is fun) thành cấu trúc đối lập tinh tế (Prefer authentic experiences over tourist traps).',
    bridgeToHomework: {
      promptText: 'Luyện tập phát âm đuôi -ed và thu âm bài nói về chuyến du lịch yêu thích trong Homework W6D3.',
      targetExamId: 'exam_dreamer_w6d3'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'progressive_reveal',
        title: 'Bóc tách 4 tầng phản xạ trả lời về sở thích du lịch',
        pedagogicalObjective: 'Xây dựng câu trả lời giàu Lexical Resource thông qua thủ pháp tương phản giữa du lịch thương mại và trải nghiệm bản địa.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click mở từng tầng để nắm cấu trúc bài nói du lịch có chiều sâu nhận thức:',
          cards: [
            {
              step: 1,
              label: 'GENUINE STANCE & REASON',
              cognitiveFunction: 'Khẳng định đam mê và mục đích cốt lõi',
              content: 'Without a doubt, traveling is my absolute favorite way to unwind and recharge after intensive study periods.',
              pedagogyNote: 'Dùng cụm "Without a doubt, traveling is my absolute favorite way to unwind..." thay cho "I like traveling".'
            },
            {
              step: 2,
              label: 'CONTRASTING PREFERENCE',
              cognitiveFunction: 'Sự khác biệt về gu trải nghiệm (Không thích điểm đông đúc)',
              content: 'Personally, I am not a big fan of overcrowded tourist traps. Instead, I prefer exploring peaceful hidden gems.',
              pedagogyNote: 'Dùng cấu trúc tương phản: "I am not a fan of [A]... Instead, I prefer [B]".'
            },
            {
              step: 3,
              label: 'CONCRETE EXPERIENCE',
              cognitiveFunction: 'Minh chứng bằng hoạt động thực tế',
              content: 'For instance, I love wandering through small local alleys and tasting authentic street food with residents.',
              pedagogyNote: 'Đưa ví dụ hoạt động gắn với con người và ẩm thực bản địa.',
              branchOptions: [
                { branchName: 'CULTURE / PEOPLE', content: 'For instance, I enjoy volunteering and learning traditional handicrafts from local artisans.', note: 'Nhánh giao lưu văn hóa và làng nghề.' },
                { branchName: 'NATURE / ADVENTURE', content: 'For instance, I prefer trekking into national parks and camping by serene rivers.', note: 'Nhánh khám phá thiên nhiên hoang sơ.' }
              ]
            },
            {
              step: 4,
              label: 'CULTURAL ENRICHMENT',
              cognitiveFunction: 'Giá trị tinh thần nhận được',
              content: 'In the end, these meaningful interactions give me a truly authentic perspective on different cultures.',
              pedagogyNote: 'Kết bài bằng chiều sâu nhận thức: "give me a truly authentic perspective".'
            }
          ],
          fullMosaicSummary: 'Without a doubt, traveling is my favorite way to unwind. Personally, I am not a fan of overcrowded tourist traps. Instead, I prefer exploring peaceful hidden gems, wandering through local alleys, and tasting street food, which gives me an authentic perspective on different cultures.'
        }
      }
    ]
  },
  {
    id: 'dreamer_w7d1',
    courseId: 'dreamer',
    week: 7,
    day: 1,
    skill: 'writing',
    title: 'The Non-Defining Punctuation Engine',
    subtitle: 'Phẫu Thuật Dấu Phẩy & Bẫy Cấm Kỵ Của "That"',
    coreCompetency: 'Phân biệt Mệnh đề quan hệ xác định (Defining) vs không xác định (Non-defining). Nắm vững 2 luật cấm kỵ: Non-defining bắt buộc có 2 dấu phẩy bao bọc và TUYỆT ĐỐI KHÔNG DÙNG "THAT".',
    bridgeToHomework: {
      promptText: 'Luyện tập đặt dấu phẩy và rút gọn mệnh đề quan hệ trong Homework W7D1.',
      targetExamId: 'exam_dreamer_w7d1'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'productive_failure',
        title: 'Break (Phát hiện sụp đổ dấu phẩy & dùng sai "that")',
        pedagogicalObjective: 'Đối diện lỗi cấm kỵ kinh điển trong IELTS Writing: Dùng "that" sau dấu phẩy trong mệnh đề không xác định.',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Click vào cặp điểm gây xung đột quy tắc dấu phẩy trong câu dưới đây:',
          mode: 'break_and_repair',
          tokens: [
            { id: 't1', text: 'My wife,', role: 'subject', colorClass: 'green' },
            { id: 't2', text: 'that', role: 'connector', colorClass: 'red' },
            { id: 't3', text: 'is an English teacher,', role: 'adjective_clause', colorClass: 'blue' },
            { id: 't4', text: 'helps me write emails', role: 'fv_core', colorClass: 'orange' }
          ],
          collisionTarget: {
            conflictingTokenIds: ['t1', 't2'],
            errorMessage: 'Vi phạm luật cấm kỵ: "My wife" là danh từ xác định duy nhất, mệnh đề bổ sung thông tin phụ là Non-defining bắt buộc dùng dấu phẩy, và ĐẠI TỪ "THAT" TUYỆT ĐỐI KHÔNG ĐƯỢC ĐỨNG SAU DẤU PHẨY!',
            repairOptions: [
              {
                id: 'opt1',
                action: 'delete',
                targetTokenId: 't2',
                resultText: 'who',
                explanation: 'Đổi "that" thành "who" để đảm bảo chuẩn mực ngữ pháp sau dấu phẩy.'
              }
            ]
          }
        }
      }
    ]
  },
  {
    id: 'dreamer_w7d2',
    courseId: 'dreamer',
    week: 7,
    day: 2,
    skill: 'reading',
    title: 'The Cause-Attribution Lab',
    subtitle: 'Quy Trách Nhiệm Nhân Quả & Bẫy Suy Diễn Trách Nhiệm Pháp Lý',
    coreCompetency: 'Đối chiếu các mức độ trách nhiệm pháp lý trong sự cố môi trường Formosa (suspected -> admitted -> accepted responsibility) để tránh bẫy thời điểm và bẫy đổ lỗi sai đối tượng.',
    bridgeToHomework: {
      promptText: 'Làm bài đọc hiểu về sự cố môi trường biển năm 2016 trong Homework W7D2.',
      targetExamId: 'exam_dreamer_w7d2'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'verification_scale',
        title: 'Bẫy Thời Điểm Nhận Trách Nhiệm (Time of Admission Trap)',
        pedagogicalObjective: 'Phân định rõ thời điểm xảy ra sự cố (tháng 4/2016) và thời điểm Formosa chính thức thừa nhận trách nhiệm (tháng 6/2016).',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Đặt nhận định lên bàn cân logic để đối chiếu với dòng thời gian của sự cố Formosa:',
          statement: {
            rawText: 'Formosa Plastics immediately accepted responsibility as soon as dead fish appeared in April 2016.',
            deconstructedVariables: [
              { name: 'subject', text: 'Formosa Plastics' },
              { name: 'timing', text: 'immediately accepted responsibility in April 2016', isTrapWord: true },
              { name: 'trigger', text: 'as soon as dead fish appeared' }
            ]
          },
          passageEvidence: {
            rawText: 'After denying responsibility for months, Formosa accepted responsibility for the fish deaths on June 30, 2016.',
            targetVariables: [
              { matchingName: 'timing', text: 'After denying responsibility for months... on June 30, 2016 (chối bỏ hàng tháng trời)' }
            ]
          },
          expectedRelation: 'contradiction',
          verdict: 'FALSE',
          pedagogicalInsight: 'FALSE vì bài đọc ghi rõ Formosa đã chối bỏ trách nhiệm trong nhiều tháng ("After denying responsibility for months") và đến tận 30/6 mới nhận, trái ngược 100% với khẳng định "immediately accepted in April".'
        }
      }
    ]
  },
  {
    id: 'dreamer_w7d3',
    courseId: 'dreamer',
    week: 7,
    day: 3,
    skill: 'speaking',
    title: 'The Conditional Loyalty & Support Frame',
    subtitle: 'Cấu Trúc Nói Về Tình Bạn Bằng Mệnh Đề Điều Kiện & Đại Từ Quan Hệ',
    coreCompetency: 'Sử dụng mệnh đề điều kiện loại 1 (If I get into trouble, my friend will...) và Relative Clause (...who always stands by my side) để miêu tả tình bạn sâu sắc.',
    bridgeToHomework: {
      promptText: 'Thu âm bài nói miêu tả người bạn thân nhất (Best Friend) trong Homework W7D3.',
      targetExamId: 'exam_dreamer_w7d3'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'progressive_reveal',
        title: 'Bóc tách 4 tầng phản xạ miêu tả người bạn tri kỷ',
        pedagogicalObjective: 'Kết hợp linh hoạt Mệnh đề quan hệ (who) và Giả định điều kiện (If) để tạo bài nói Speaking Part 1 giàu cảm xúc.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click mở từng tầng để nắm cấu trúc miêu tả phẩm chất người bạn thân:',
          cards: [
            {
              step: 1,
              label: 'CORE FRIEND INTRODUCTION',
              cognitiveFunction: 'Giới thiệu đối tượng và phẩm chất nổi bật',
              content: 'When it comes to true friendship, I am truly blessed to have Nam, who is my closest confidant since childhood.',
              pedagogyNote: 'Áp dụng Relative Clause: "have Nam, who is my closest confidant...".'
            },
            {
              step: 2,
              label: 'CONDITIONAL SUPPORT',
              cognitiveFunction: 'Hành động hỗ trợ khi gặp nghịch cảnh (Câu điều kiện If)',
              content: 'Whenever I find myself in a difficult situation, he is always the first person who willingly lends a listening ear.',
              pedagogyNote: 'Dùng mệnh đề thời gian/điều kiện kết hợp cụm "lends a listening ear".'
            },
            {
              step: 3,
              label: 'SPECIFIC SHARED EXPERIENCE',
              cognitiveFunction: 'Minh chứng bằng kỷ niệm hoặc thói quen tương trợ',
              content: 'For example, when I was feeling anxious before my exams, he patiently helped me review key concepts for hours.',
              pedagogyNote: 'Đưa ra tình huống hỗ trợ cụ thể chứng minh lòng trung thành.',
              branchOptions: [
                { branchName: 'ACADEMIC SUPPORT', content: 'For example, he spent entire weekends helping me practice English pronunciation patiently.', note: 'Nhánh hỗ trợ học tập kiên nhẫn.' },
                { branchName: 'EMOTIONAL SUPPORT', content: 'For example, he took me out for a quiet coffee ride to help me clear my head after personal stress.', note: 'Nhánh giải tỏa căng thẳng tinh thần.' }
              ]
            },
            {
              step: 4,
              label: 'ENDURING BOND',
              cognitiveFunction: 'Khẳng định giá trị gắn kết bền vững',
              content: 'Because of his unwavering loyalty, I know that our friendship will last for a lifetime.',
              pedagogyNote: 'Khép lại bằng nhận định sâu sắc: "Because of his unwavering loyalty... will last for a lifetime".'
            }
          ],
          fullMosaicSummary: 'When it comes to true friendship, I am blessed to have Nam, who is my closest confidant. Whenever I am in a difficult situation, he is the first person who lends a listening ear. For example, he patiently helped me review concepts when I was stressed, and because of his unwavering loyalty, I know our friendship will last for a lifetime.'
        }
      }
    ]
  },
  {
    id: 'dreamer_w8d1',
    courseId: 'dreamer',
    week: 8,
    day: 1,
    skill: 'writing',
    title: 'The Focus Inversion Passive Engine',
    subtitle: 'Đảo Trục Trọng Tâm & Quy Luật Bị Động Khách Quan',
    coreCompetency: 'Nắm vững bản chất Passive Voice là dời tâm điểm chú ý từ "Tác nhân" sang "Đối tượng chịu tác động". Nhận diện cấu trúc Be + V3/ed và cách xử lý động từ 2 tân ngữ (give sb sth -> sb was given sth).',
    bridgeToHomework: {
      promptText: 'Thực hành chuyển đổi câu chủ động sang bị động trong Homework W8D1.',
      targetExamId: 'exam_dreamer_w8d1'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'productive_failure',
        title: 'Break (Phát hiện sụp đổ cấu trúc bị động thiếu "Be")',
        pedagogicalObjective: 'Đối diện lỗi kinh điển Band 3.0: Biến động từ thành V3/ed nhưng quên mất trợ động từ "to be".',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Click vào điểm thiếu hụt cấu trúc khiến câu bị động dưới đây bị sụp đổ:',
          mode: 'break_and_repair',
          tokens: [
            { id: 't1', text: '500,000 workers', role: 'subject', colorClass: 'green' },
            { id: 't2', text: 'recruited', role: 'fv_core', colorClass: 'red' },
            { id: 't3', text: 'by US companies', role: 'scope_condition', colorClass: 'blue' },
            { id: 't4', text: 'in August alone', role: 'scope_condition', colorClass: 'purple' }
          ],
          collisionTarget: {
            conflictingTokenIds: ['t1', 't2'],
            errorMessage: 'Sụp đổ thể bị động: 500.000 công nhân không tự đi tuyển dụng ("recruited") mà là "được tuyển dụng". Câu bị động bắt buộc phải có trợ động từ "to be" đi trước quá khứ phân từ V3!',
            repairOptions: [
              {
                id: 'opt1',
                action: 'delete',
                targetTokenId: 't2',
                resultText: 'were recruited',
                explanation: 'Bổ sung trợ động từ "were" để hoàn thiện cấu trúc bị động chuẩn xác: were + recruited.'
              }
            ]
          }
        }
      }
    ]
  },
  {
    id: 'dreamer_w8d2',
    courseId: 'dreamer',
    week: 8,
    day: 2,
    skill: 'reading',
    title: 'The Financial Crime Trace Lab',
    subtitle: 'Bóc Tách Dòng Dữ Kiệu Pháp Luật & Bẫy Quy Đổi Tiền Tệ',
    coreCompetency: 'Đối chiếu các con số và giá trị kinh tế (£2.6 billion vs US$3.2 billion) cũng như chi phí di cư bất hợp pháp (US$15,000) để tránh bẫy đảo lộn số liệu trong văn bản pháp luật / hình sự.',
    bridgeToHomework: {
      promptText: 'Làm bài đọc hiểu điều tra về đường dây trồng cần sa ở Anh trong Homework W8D2.',
      targetExamId: 'exam_dreamer_w8d2'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'verification_scale',
        title: 'Bẫy Tự Nguyện vs Ép Buộc (Voluntary Motive Trap)',
        pedagogicalObjective: 'Xác định rõ động cơ di cư của nhân vật Cuong Nguyen (tự nguyện vì tiền hay bị lừa bán).',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Đặt nhận định lên bàn cân logic để đối chiếu với lời khai trực tiếp của Cuong Nguyen:',
          statement: {
            rawText: 'Cuong Nguyen was tricked by human traffickers into working on British cannabis farms against his will.',
            deconstructedVariables: [
              { name: 'subject', text: 'Cuong Nguyen' },
              { name: 'motive', text: 'tricked by traffickers against his will', isTrapWord: true },
              { name: 'destination', text: 'British cannabis farms' }
            ]
          },
          passageEvidence: {
            rawText: '"All I ever wanted was to make money... whether it was legal or illegal" says Cuong, who paid US$15,000 to brokers for a fake passport.',
            targetVariables: [
              { matchingName: 'motive', text: '"All I ever wanted was to make money... paid US$15,000 to brokers" (chủ động trả tiền để làm giàu)' }
            ]
          },
          expectedRelation: 'contradiction',
          verdict: 'FALSE',
          pedagogicalInsight: 'FALSE vì chính Cuong thừa nhận mục đích duy nhất là kiếm tiền ("All I ever wanted was to make money") và đã chủ động chi 15.000 USD mua hộ chiếu giả, mâu thuẫn hoàn toàn với khẳng định "bị lừa ép buộc làm việc ngoài ý muốn".'
        }
      }
    ]
  },
  {
    id: 'dreamer_w8d3',
    courseId: 'dreamer',
    week: 8,
    day: 3,
    skill: 'speaking',
    title: 'The Culinary Identity & Origin Engine',
    subtitle: 'Nghệ Thuật Miêu Tả Ẩm Thực Truyền Thống & Nguồn Gốc Văn Hóa',
    coreCompetency: 'Nâng cấp câu trả lời Speaking Part 1 về Favorite Food: Tránh lỗi liệt kê nguyên liệu đơn thuần, tổ chức bài nói theo cấu trúc: Dish Choice -> Cultural Roots -> Distinct Flavor Profile -> Emotional Comfort.',
    bridgeToHomework: {
      promptText: 'Luyện tập trọng âm câu (Sentence Stress) và thu âm bài nói về món ăn yêu thích trong Homework W8D3.',
      targetExamId: 'exam_dreamer_w8d3'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'progressive_reveal',
        title: 'Bóc tách 4 tầng phản xạ miêu tả món ăn truyền thống',
        pedagogicalObjective: 'Tạo bài nói về món ăn bản địa (Bún Bò Huế) kết hợp cấu trúc bị động và tính từ miêu tả vị giác tinh tế.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click mở từng tầng để nắm cấu trúc miêu tả món ăn truyền thống chuẩn IELTS Speaking:',
          cards: [
            {
              step: 1,
              label: 'STANCE & FREQUENCY OF ENJOYMENT',
              cognitiveFunction: 'Khẳng định món ăn và tần suất thưởng thức',
              content: 'If I had to pick just one all-time favorite dish, I would definitely go for Bun Bo, a quintessential Vietnamese delicacy.',
              pedagogyNote: 'Dùng câu điều kiện loại 2: "If I had to pick... I would go for [Dish], a quintessential delicacy".'
            },
            {
              step: 2,
              label: 'GEOGRAPHICAL & CULTURAL ORIGIN',
              cognitiveFunction: 'Nguồn gốc xuất xứ và ý nghĩa văn hóa',
              content: 'Historically, it originated from Hue, the ancient imperial capital of Vietnam, though it is now cherished nationwide.',
              pedagogyNote: 'Dùng cụm bị động/nguồn gốc: "originated from Hue... cherished nationwide".'
            },
            {
              step: 3,
              label: 'RICH FLAVOR PROFILE',
              cognitiveFunction: 'Hương vị đặc trưng và sự kết hợp nguyên liệu',
              content: 'What makes it truly unforgettable is the rich, aromatic broth infused with lemongrass, spicy chili, and tender beef slices.',
              pedagogyNote: 'Dùng mệnh đề danh từ bắt đầu bằng What: "What makes it truly unforgettable is...".',
              branchOptions: [
                { branchName: 'HERB COMBINATION', content: 'Specifically, the harmonious balance between lime juice, fresh cilantro, and crispy bean sprouts is heavenly.', note: 'Nhánh miêu tả rau mùi và gia vị tươi.' },
                { branchName: 'SLOW-COOKED BROTH', content: 'Specifically, the broth is simmered for hours with beef bones to achieve an authentic savory sweetness.', note: 'Nhánh miêu tả nước dùng ninh xương kỳ công.' }
              ]
            },
            {
              step: 4,
              label: 'EMOTIONAL VALUE & COMFORT',
              cognitiveFunction: 'Cảm giác tinh thần mà món ăn mang lại',
              content: 'Whenever I savor a steaming hot bowl in the morning, it instantly fuels me with tremendous energy for the entire day.',
              pedagogyNote: 'Khép lại bằng cảm giác tích cực: "instantly fuels me with tremendous energy".'
            }
          ],
          fullMosaicSummary: 'If I had to pick one all-time favorite dish, I would definitely go for Bun Bo. Historically, it originated from Hue, but is now cherished nationwide. What makes it unforgettable is the rich, aromatic broth infused with lemongrass and tender beef. Having a hot bowl in the morning instantly fuels me with energy.'
        }
      }
    ]
  },
  {
    id: 'dreamer_w9d1',
    courseId: 'dreamer',
    week: 9,
    day: 1,
    skill: 'writing',
    title: 'The Subordinating Clause Glue Engine',
    subtitle: 'Keo Dán Liên Từ & Bẫy Nhân Quả Song Trùng (Because... So)',
    coreCompetency: 'Nắm vững quy tắc "Keo dán liên từ": Để nối 2 mệnh đề độc lập thành câu phức chỉ được dùng duy nhất 1 liên từ phụ thuộc. Chấm dứt vĩnh viễn lỗi dịch thô tiếng Việt "Vì... nên" (Because... so...).',
    bridgeToHomework: {
      promptText: 'Luyện tập kết nối mệnh đề phụ thuộc và sửa lỗi liên từ trong Homework W9D1.',
      targetExamId: 'exam_dreamer_w9d1'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'productive_failure',
        title: 'Break (Phát hiện sụp đổ thừa liên từ Because... So)',
        pedagogicalObjective: 'Đối diện lỗi kinh điển nhất của học sinh Việt Nam: Dùng cả "Because" và "So" trong cùng một câu.',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Click vào cặp liên từ gây xung đột dư thừa "keo dán" trong câu dưới đây:',
          mode: 'break_and_repair',
          tokens: [
            { id: 't1', text: 'Because', role: 'connector', colorClass: 'orange' },
            { id: 't2', text: 'I have an important meeting,', role: 'subordinating_clause', colorClass: 'blue' },
            { id: 't3', text: 'so', role: 'connector', colorClass: 'red' },
            { id: 't4', text: 'I asked for a day off', role: 'main_clause', colorClass: 'green' }
          ],
          collisionTarget: {
            conflictingTokenIds: ['t1', 't3'],
            errorMessage: 'Xung đột liên từ kép: Tiếng Anh chỉ cần 1 liên từ duy nhất để kết nối 2 mệnh đề. Dùng cả "Because" và "So" là lỗi dịch thô từ tiếng Việt ("Bởi vì... cho nên..."), khiến câu bị biến dạng!',
            repairOptions: [
              {
                id: 'opt1',
                action: 'delete',
                targetTokenId: 't3',
                resultText: '',
                explanation: 'Gọt bỏ "so" để mệnh đề chính "I asked for a day off" đứng độc lập tự nhiên sau dấu phẩy.'
              }
            ]
          }
        }
      }
    ]
  },
  {
    id: 'dreamer_w9d2',
    courseId: 'dreamer',
    week: 9,
    day: 2,
    skill: 'reading',
    title: 'The Influencer Authenticity Lab',
    subtitle: 'Đối Chiếu Bản Thể Nội Dung & Bẫy Mâu Thuẫn Thế Hệ',
    coreCompetency: 'Đối chiếu lý do thành công của các ngôi sao mạng xã hội (Khoai Lang Thang / YouTube creators) dựa trên tính chân thực (Authenticity vs Commercial Endorsements) để tránh bẫy thế hệ (Gen Z vs Millennials).',
    bridgeToHomework: {
      promptText: 'Làm bài đọc hiểu về sức hút của YouTube stars đối với giới trẻ trong Homework W9D2.',
      targetExamId: 'exam_dreamer_w9d2'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'verification_scale',
        title: 'Bẫy Tính Chân Thực vs Quảng Cáo Truyền Thống',
        pedagogicalObjective: 'Phát hiện sự đối lập giữa quảng cáo người nổi tiếng truyền hình và nội dung đời thực của vlogger.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Đặt nhận định lên bàn cân logic để đối chiếu với bí quyết thành công của Khoai Lang Thang:',
          statement: {
            rawText: 'Khoai Lang Thang achieved popularity mainly by imitating mainstream celebrities and setting internet trends.',
            deconstructedVariables: [
              { name: 'subject', text: 'Khoai Lang Thang' },
              { name: 'success_factor', text: 'imitating mainstream celebrities to set trends', isTrapWord: true },
              { name: 'outcome', text: 'achieved massive popularity' }
            ]
          },
          passageEvidence: {
            rawText: 'Unlike mainstream celebrities who often set trends, Khoai Lang Thang\'s success lies in his authenticity and intimate look into ordinary lives.',
            targetVariables: [
              { matchingName: 'success_factor', text: 'Unlike mainstream celebrities... success lies in his authenticity (trái ngược với người nổi tiếng xu hướng)' }
            ]
          },
          expectedRelation: 'contradiction',
          verdict: 'FALSE',
          pedagogicalInsight: 'FALSE vì bài đọc nhấn mạnh "Khác với người nổi tiếng truyền thống thường tạo trend" (Unlike mainstream celebrities), thành công của anh đến từ sự mộc mạc và chân thực ("authenticity"), mâu thuẫn trực tiếp với khẳng định "imitating celebrities".'
        }
      }
    ]
  },
  {
    id: 'dreamer_w9d3',
    courseId: 'dreamer',
    week: 9,
    day: 3,
    skill: 'speaking',
    title: 'The Passion & Growth Synthesis Model',
    subtitle: 'Tổng Hòa Năng Lực Nói Về Đam Mê & Sự Trưởng Thành Cá Nhân',
    coreCompetency: 'Hoàn thiện năng lực Speaking Band 4.0+: Tích hợp phát âm chuẩn (Grouping words & Rhythm) với chuỗi tư duy nói về sở thích: Trigger -> Immersive Practice -> Self-Growth -> Future Vision.',
    bridgeToHomework: {
      promptText: 'Thu âm bài nói tổng kết khóa học về sở thích và đam mê cá nhân trong Homework W9D3.',
      targetExamId: 'exam_dreamer_w9d3'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'progressive_reveal',
        title: 'Bóc tách 4 tầng phản xạ miêu tả đam mê và sở thích dài hạn',
        pedagogicalObjective: 'Nâng cấp bài nói sở thích từ câu trả lời vụn vặt (I like playing football) thành câu chuyện trưởng thành có nhịp điệu và ngắt cụm tự nhiên.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click mở từng tầng để nắm cấu trúc bài nói tổng kết sở thích và sự phát triển bản thân:',
          cards: [
            {
              step: 1,
              label: 'INITIAL SPARK & PASSION IDENTIFICATION',
              cognitiveFunction: 'Khởi nguồn đam mê và sở thích cốt lõi',
              content: 'When I look back, my deep passion for photography actually began when my father handed me his vintage camera.',
              pedagogyNote: 'Dùng cấu trúc tự sự "When I look back, my deep passion for... began when...".'
            },
            {
              step: 2,
              label: 'IMMERSIVE LEARNING PROCESS',
              cognitiveFunction: 'Quá trình rèn luyện kiên trì (Vận dụng thì và bổ ngữ)',
              content: 'Over the past three years, I have dedicated countless weekends to mastering composition and capturing authentic street moments.',
              pedagogyNote: 'Vận dụng thì Present Perfect kết hợp cụm "dedicated countless weekends to + V-ing".'
            },
            {
              step: 3,
              label: 'TRANSFORMATIVE VALUE',
              cognitiveFunction: 'Sự thay đổi về tư duy và phong cách sống',
              content: 'This creative hobby not only helps me decompress from academic pressure, but also teaches me to observe life more deeply.',
              pedagogyNote: 'Dùng cấu trúc tương quan cao cấp "not only helps me..., but also teaches me to...".',
              branchOptions: [
                { branchName: 'CREATIVE PERSPECTIVE', content: 'This hobby enables me to notice the extraordinary beauty hidden in everyday ordinary routines.', note: 'Nhánh phát triển cảm thụ nghệ thuật.' },
                { branchName: 'SOCIAL CONNECTION', content: 'This hobby connects me with like-minded creative friends who constantly inspire my progress.', note: 'Nhánh kết nối cộng đồng bạn bè cùng chí hướng.' }
              ]
            },
            {
              step: 4,
              label: 'LONG-TERM VISION',
              cognitiveFunction: 'Tầm nhìn tương lai và sự gắn bó bền vững',
              content: 'Moving forward, I am determined to hold a small photo exhibition to share these heartfelt stories with the wider community.',
              pedagogyNote: 'Khép lại bằng định hướng tương lai: "Moving forward, I am determined to...".'
            }
          ],
          fullMosaicSummary: 'When I look back, my passion for photography began when my father gave me his camera. Over the past three years, I have dedicated weekends to capturing authentic moments. This hobby not only relieves academic stress but also teaches me to observe life deeply, and moving forward, I hope to hold an exhibition to share these stories.'
        }
      }
    ]
  }
];
