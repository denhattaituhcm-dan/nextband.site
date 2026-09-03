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
        title: 'Bẫy 1: Thời gian & Tần suất (Time Trap)',
        pedagogicalObjective: 'Chẻ biến số thời gian để phát hiện mâu thuẫn 100% giữa đề bài và bài đọc.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Đặt nhận định lên bàn cân logic để đối chiếu với bằng chứng bài đọc:',
          statement: {
            rawText: 'The 996 culture involves working from 9 am to 9 pm every weekday.',
            deconstructedVariables: [
              { name: 'subject', text: 'The 996 culture' },
              { name: 'action', text: 'working from 9 am to 9 pm' },
              { name: 'time_scope', text: 'every weekday', isTrapWord: true }
            ]
          },
          passageEvidence: {
            rawText: 'It requires employees to work from 9:00 am to 9:00 pm, 6 days a week.',
            targetVariables: [
              { matchingName: 'time_scope', text: '6 days a week (bao gồm cả thứ 7)' }
            ]
          },
          expectedRelation: 'contradiction',
          verdict: 'FALSE',
          pedagogicalInsight: 'FALSE vì "every weekday" chỉ gồm 5 ngày (thứ 2 đến thứ 6), trong khi bài đọc nêu rõ "6 days a week" (phải làm thêm ngày thứ 7). Hai mốc thời gian mâu thuẫn trực diện!'
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
    title: 'The Semantic Boundary Lab',
    subtitle: 'Xác Lập Biên Giới Khái Niệm & Đo Độ Trùng Khớp',
    coreCompetency: 'Đối chiếu biên giới nghĩa giữa câu đề bài và văn bản đọc để tránh bẫy đồng âm khác nghĩa hoặc suy diễn quá mức.',
    bridgeToHomework: {
      promptText: 'Thực hành định vị bằng chứng lịch trình du lịch Việt Nam trong Homework W3D2.',
      targetExamId: 'exam_dreamer_w3d2'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'verification_scale',
        title: 'Bẫy Cảm Xúc vs Thực Tế Trải Nghiệm',
        pedagogicalObjective: 'Xác định rõ sự khác biệt giữa quan điểm quá khứ (thought) và trải nghiệm thực tế tại Việt Nam.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Đặt nhận định lên bàn cân logic để đối chiếu với nhận thức của tác giả:',
          statement: {
            rawText: 'The author has always found Vietnamese pho delicious and full of flavour.',
            deconstructedVariables: [
              { name: 'subject', text: 'The author' },
              { name: 'attitude_frequency', text: 'has always found pho delicious', isTrapWord: true },
              { name: 'object', text: 'Vietnamese pho' }
            ]
          },
          passageEvidence: {
            rawText: 'I always thought it was such a bland dish without very much flavour, but I just needed to eat it in Vietnam to enjoy it.',
            targetVariables: [
              { matchingName: 'attitude_frequency', text: 'always thought it was such a bland dish without very much flavour' }
            ]
          },
          expectedRelation: 'contradiction',
          verdict: 'FALSE',
          pedagogicalInsight: 'FALSE vì tác giả từng nghĩ phở là món nhạt nhẽo ("bland dish without very much flavour"), hoàn toàn trái ngược với khẳng định của đề bài là "has always found pho delicious".'
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
    title: 'The Evidence Specificity Lab',
    subtitle: 'Đối Chiếu Chi Tiết Cụ Thể & Bẫy Khái Niệm Tương Tự',
    coreCompetency: 'Phân định ranh giới giữa các thuật ngữ y học / sinh học có vẻ giống nhau (blood pressure vs blood sugar) và phát hiện bằng chứng nguồn gốc.',
    bridgeToHomework: {
      promptText: 'Luyện tập giải đề T/F/NG về quan niệm sức khỏe trong Homework W4D2.',
      targetExamId: 'exam_dreamer_w4d2'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'verification_scale',
        title: 'Bẫy Thuật Ngữ Gần Nghĩa (Near-Synonym Trap)',
        pedagogicalObjective: 'Nhận diện lỗi thay tráo thuật ngữ chuyên môn: blood sugar (đường huyết) bị tráo thành blood pressure (huyết áp).',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Đặt nhận định lên bàn cân logic để đối chiếu với trích dẫn của chuyên gia Brady Holmer:',
          statement: {
            rawText: 'According to Brady Holmer, people eating a large breakfast rather than a larger dinner can control their blood pressure better.',
            deconstructedVariables: [
              { name: 'subject_source', text: 'According to Brady Holmer' },
              { name: 'action', text: 'eating a large breakfast rather than dinner' },
              { name: 'outcome', text: 'control blood pressure better', isTrapWord: true }
            ]
          },
          passageEvidence: {
            rawText: 'People who eat a big breakfast instead of a big dinner also tend to lose more weight, feel less hungry and can control their blood sugar levels better.',
            targetVariables: [
              { matchingName: 'outcome', text: 'control their blood sugar levels better (đường huyết, KHÔNG PHẢI huyết áp)' }
            ]
          },
          expectedRelation: 'contradiction',
          verdict: 'FALSE',
          pedagogicalInsight: 'FALSE vì bài đọc chỉ rõ tác dụng là kiểm soát đường huyết ("blood sugar levels"), trong khi đề bài cố tình tráo thành huyết áp ("blood pressure"). Hai khái niệm y học hoàn toàn khác nhau!'
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
    title: 'The Tone & Inference Filter Lab',
    subtitle: 'Giải Mã Sắc Thái Tác Giả & Bẫy Khái Quát Hóa',
    coreCompetency: 'Phân tích sắc thái (hài hước / châm biếm / cảnh báo) và xác định tính hai mặt của một hiện tượng văn hóa (Karaoke in Vietnam).',
    bridgeToHomework: {
      promptText: 'Làm bài đọc hiểu về văn hóa Karaoke ở Việt Nam trong Homework W5D2.',
      targetExamId: 'exam_dreamer_w5d2'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'verification_scale',
        title: 'Bẫy Khái Quát Hóa Quá Mức (Overgeneralization Trap)',
        pedagogicalObjective: 'Nhận diện sự đối lập giữa quan sát hài hước về đàn ông Việt Nam và kết luận tuyệt đối của đề bài.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Đặt nhận định lên bàn cân logic để đối chiếu với nhận xét của tác giả trong đoạn B:',
          statement: {
            rawText: 'Most Vietnamese men are professionally trained singers who rarely miss high notes.',
            deconstructedVariables: [
              { name: 'subject', text: 'Most Vietnamese men' },
              { name: 'ability', text: 'professionally trained singers', isTrapWord: true },
              { name: 'performance', text: 'rarely miss high notes', isTrapWord: true }
            ]
          },
          passageEvidence: {
            rawText: 'Most Vietnamese men think they can sing. You can tell by the way they close their eyes and look to the heavens as they miss the high notes.',
            targetVariables: [
              { matchingName: 'ability', text: 'think they can sing (chỉ tự nghĩ mình hát được)' },
              { matchingName: 'performance', text: 'as they miss the high notes (hát trật nốt cao)' }
            ]
          },
          expectedRelation: 'contradiction',
          verdict: 'FALSE',
          pedagogicalInsight: 'FALSE vì tác giả hài hước chỉ ra rằng đàn ông Việt chỉ tự nghĩ mình hát hay ("think they can sing") và thực tế là họ thường xuyên hát trật các nốt cao ("miss the high notes"), mâu thuẫn 100% với nhận định "professionally trained".'
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
