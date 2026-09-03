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
    title: 'The 4-Step Speaking Expansion (Work & Studies)',
    subtitle: 'Mở Rộng Câu Trả Lời Speaking: Từ Câu Cụt 3.0 Lên Câu Ghép Hoàn Chỉnh 4.0 - 4.5',
    coreCompetency: 'Chuẩn hóa đầu ra khóa Dreamer (3.0 → 4.0+): Học viên vượt qua phản xạ nói 1 câu cụt ("I like my job"). Biết dùng liên từ Because, But, So để ghép thành bài nói 3-4 câu hoàn chỉnh theo đúng giáo trình về Công việc (Cô Ánh) và Ngành học (Bạn Huy).',
    bridgeToHomework: {
      promptText: 'Thu âm bài nói Part 1 giới thiệu công việc hoặc ngành học của bạn trong Homework W1D3.',
      targetExamId: 'exam_dreamer_w1d3'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'progressive_reveal',
        title: 'Chặng 1 (Người Đi Làm): Bài Nói Của Cô Ánh (Shopkeeper)',
        pedagogicalObjective: 'Học cách nối câu bằng Because và But: Thích nghề bán hàng vì đồng nghiệp tốt, nhưng thỉnh thoảng bị áp lực doanh số.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click mở từng bước để học cách mở rộng câu nói từ 3.0 lên 4.0+:',
          cards: [
            {
              step: 1,
              label: 'BƯỚC 1: CÂU TRẢ LỜI CHÍNH',
              cognitiveFunction: '1. Nêu nghề nghiệp và cảm xúc ban đầu',
              content: "I'm a shopkeeper, and I really enjoy my job.",
              bandLevel: 'Band 3.0 → 3.5',
              pedagogyNote: 'Khởi đầu rõ ràng. Dùng "really enjoy" thay vì lặp từ "like" để tự nhiên hơn.',
              flipCard: {
                frontText: "I'm a shopkeeper. I like it. (Nói cộc lốc 3.0)",
                backText: "I'm a shopkeeper, and I really enjoy my job. (Nối câu mượt mà 4.0)",
                explanation: 'Nối 2 vế bằng liên từ "and" giúp câu nói không bị ngắt quãng.'
              },
              vowelHighlight: [
                { word: 'job', phonetic: '/dʒɒb/', vowelSound: '/ɒ/ ngắn' },
                { word: 'meet', phonetic: '/miːt/', vowelSound: '/i:/ dài' }
              ]
            },
            {
              step: 2,
              label: 'BƯỚC 2: GIẢI THÍCH LÝ DO (BECAUSE)',
              cognitiveFunction: '2. Vì sao thích công việc này?',
              content: 'because I can talk with new people, and my coworkers are nice.',
              bandLevel: 'Band 3.5 → 4.0',
              pedagogyNote: 'Dùng "because" để đưa ra 2 lý do gần gũi: được nói chuyện với khách và đồng nghiệp dễ mến.',
              flipCard: {
                frontText: 'Because it is fun. (Lý do quá ngắn)',
                backText: 'because I can talk with new people, and my coworkers are nice. (Lý do rõ ràng)',
                explanation: 'Nêu cụ thể hành động (talk with new people) và con người (coworkers are nice) bám sát bài học.'
              }
            },
            {
              step: 3,
              label: 'BƯỚC 3: MẶT KHÓ KHĂN (BUT)',
              cognitiveFunction: '3. Có điều gì chưa thích hoặc áp lực không?',
              content: "But I'm under a lot of pressure sometimes because my boss wants me to sell many products.",
              bandLevel: 'Band 4.0 → 4.5',
              pedagogyNote: 'Học cụm từ chuẩn trong giáo trình: "under a lot of pressure" và lý do sếp đòi bán nhiều hàng.',
              flipCard: {
                frontText: 'My boss is bad. (Nói thô)',
                backText: "I'm under a lot of pressure because my boss wants me to sell many products. (Đúng chuẩn bài học)",
                explanation: 'Sử dụng cấu trúc "under a lot of pressure" đúng như đoạn văn bài tập 3.2.'
              },
              branchOptions: [
                {
                  branchName: 'ÁP LỰC DOANH SỐ (BÁM SÁT BÀI ĐỌC)',
                  content: "But I'm under a lot of pressure sometimes because my boss wants me to sell many products.",
                  note: 'Mẫu câu chính xác trong giáo trình của cô Ánh.'
                },
                {
                  branchName: 'GIỜ LÀM VIỆC DÀI (MỞ RỘNG ĐƠN GIẢN)',
                  content: "However, I have to stand all day, so my legs get very tired after work.",
                  note: 'Mở rộng thực tế đơn giản, từ vựng vừa sức học viên Dreamer.'
                }
              ]
            },
            {
              step: 4,
              label: 'BƯỚC 4: HÀNH ĐỘNG CỦA BẠN (SO)',
              cognitiveFunction: '4. Bạn làm gì để vượt qua khó khăn đó?',
              content: 'so I always try my best to help customers buy what they need.',
              bandLevel: 'Band 4.5',
              pedagogyNote: 'Khép lại bằng cụm "try my best to..." (cố gắng hết sức) rất thông dụng và dễ nhớ.',
              flipCard: {
                frontText: 'So I must sell. (Câu cụt)',
                backText: 'so I always try my best to help customers buy what they need. (Câu hoàn chỉnh)',
                explanation: 'Cụm "try my best to + V" giúp câu trả lời tròn ý và thể hiện thái độ tích cực.'
              }
            }
          ],
          fullMosaicSummary: "I'm a shopkeeper, and I really enjoy my job, because I can talk with new people, and my coworkers are nice. But I'm under a lot of pressure sometimes because my boss wants me to sell many products, so I always try my best to help customers buy what they need."
        }
      },
      {
        stageNumber: 2,
        stageType: 'progressive_reveal',
        title: 'Chặng 2 (Sinh Viên): Bài Nói Của Bạn Huy (Computer Science)',
        pedagogicalObjective: 'Học cách nói về ngành học: Ngành CNTT có nhiều việc làm sau tốt nghiệp, nhưng mùa thi bài vở khá nặng.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click mở từng bước để học cách nói về ngành học của sinh viên:',
          cards: [
            {
              step: 1,
              label: 'BƯỚC 1: NGÀNH HỌC VÀ TRƯỜNG',
              cognitiveFunction: '1. Bạn học ngành gì và ở đâu?',
              content: 'I major in computer science at the University of Technology, and I like it a lot.',
              bandLevel: 'Band 3.0 → 3.5',
              pedagogyNote: 'Dùng cụm "major in + ngành học" đúng như bài tập monologue của bạn Huy.',
              flipCard: {
                frontText: 'I study computer. (Tiếng bồi)',
                backText: 'I major in computer science at the University of Technology. (Chuẩn giáo trình)',
                explanation: 'Cụm từ "major in" (chuyên ngành) là từ chuẩn mực cơ bản nhất khi giới thiệu ngành học.'
              },
              vowelHighlight: [
                { word: 'science', phonetic: '/ˈsaɪ.əns/', vowelSound: '/ə/ âm ơ ngắn' },
                { word: 'study', phonetic: '/ˈstʌd.i/', vowelSound: '/ʌ/ âm ă' }
              ]
            },
            {
              step: 2,
              label: 'BƯỚC 2: ĐIỂM THÍCH NHẤT (AND / ALSO)',
              cognitiveFunction: '2. Điểm thuận lợi của ngành học này là gì?',
              content: 'I can learn many new things, and there are many job opportunities after graduation.',
              bandLevel: 'Band 3.5 → 4.0',
              pedagogyNote: 'Bám sát giáo trình: học điều mới và có nhiều cơ hội việc làm ("job opportunities").',
              flipCard: {
                frontText: 'It is good, easy to have job. (Sai ngữ pháp)',
                backText: 'there are many job opportunities after graduation. (Đúng cụm giáo trình)',
                explanation: 'Thuộc cụm danh từ "job opportunities after graduation" (cơ hội việc làm sau tốt nghiệp).'
              }
            },
            {
              step: 3,
              label: 'BƯỚC 3: ÁP LỰC HỌC TẬP (HOWEVER)',
              cognitiveFunction: '3. Khó khăn bạn gặp phải trong việc học là gì?',
              content: 'However, the workload can be heavy, and I feel very stressed when preparing for exams.',
              bandLevel: 'Band 4.0 → 4.5',
              pedagogyNote: 'Bám sát từ vựng bài học: "workload is heavy" (bài vở nặng) và "stressed" (căng thẳng).',
              flipCard: {
                frontText: 'I have many homework and tired. (Lỗi ngữ pháp danh từ đếm được)',
                backText: 'the workload can be heavy, and I feel very stressed. (Chuẩn tự nhiên)',
                explanation: 'Dùng "workload is heavy" thay vì dịch thô "many homework" (homework là danh từ không đếm được).'
              },
              branchOptions: [
                {
                  branchName: 'CĂNG THẲNG ÔN THI (BÁM SÁT BÀI ĐỌC)',
                  content: 'However, the workload can be heavy, and I feel very stressed when preparing for exams.',
                  note: 'Nguyên văn ý của bạn Huy trong giáo trình.'
                },
                {
                  branchName: 'MÔN HỌC BUỒN CHỦ ĐỀ (Ý PHỤ TRONG SÁCH)',
                  content: 'However, some subjects are boring, and I cannot apply them to my future job.',
                  note: 'Trích từ câu phàn nàn thứ 2 của bạn Huy trong Coursebook.'
                }
              ]
            },
            {
              step: 4,
              label: 'BƯỚC 4: GIẢI PHÁP HỌC TẬP (SO)',
              cognitiveFunction: '4. Bạn làm gì để học tốt hơn?',
              content: 'so I often study and do projects with my classmates to help each other.',
              bandLevel: 'Band 4.5',
              pedagogyNote: 'Kết thúc bằng cách học nhóm ("study with classmates") gần gũi, đúng tầm sinh viên.',
              flipCard: {
                frontText: 'So I try to learn. (Quá ngắn)',
                backText: 'so I often study with my classmates to help each other. (Rõ nghĩa)',
                explanation: 'Nêu giải pháp học cùng bạn bè để giảm bớt áp lực bài vở.'
              }
            }
          ],
          fullMosaicSummary: 'I major in computer science at the University of Technology, and I like it a lot. I can learn many new things, and there are many job opportunities after graduation. However, the workload can be heavy, and I feel very stressed when preparing for exams, so I often study with my classmates to help each other.'
        }
      },
      {
        stageNumber: 3,
        stageType: 'progressive_reveal',
        title: 'Chặng 3 (Future Plans): Mẫu Câu Kế Hoạch Tương Lai (Dear Diary)',
        pedagogicalObjective: 'Làm chủ mẫu câu nói về mục tiêu tương lai bám sát bài tập Dear Diary: Nêu điểm yếu -> Mục tiêu muốn cải thiện -> Cách làm bằng By + V-ing.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click mở từng phần để ghép thành câu nói về kế hoạch tương lai chuẩn chỉnh:',
          cards: [
            {
              step: 1,
              label: 'BƯỚC 1: THỪA NHẬN ĐIỂM YẾU VÀ LÝ DO',
              cognitiveFunction: '1. Bạn chưa giỏi điều gì và vì sao?',
              content: 'I am not good at English because I was lazy in the past,',
              bandLevel: 'Band 3.0 → 3.5',
              pedagogyNote: 'Bám sát 100% câu mẫu Dear Diary: "I am not good at English because I was lazy".',
              flipCard: {
                frontText: 'I bad English. (Tiếng bồi)',
                backText: 'I am not good at English because I was lazy in the past. (Đúng ngữ pháp)',
                explanation: 'Cấu trúc chuẩn: "be not good at + Noun/V-ing".'
              }
            },
            {
              step: 2,
              label: 'BƯỚC 2: MỤC TIÊU MUỐN ĐẠT ĐƯỢC (SO I WANT TO...)',
              cognitiveFunction: '2. Bạn muốn cải thiện kỹ năng nào?',
              content: 'so I want to improve my speaking and writing skills,',
              bandLevel: 'Band 3.5 → 4.0',
              pedagogyNote: 'Dùng cấu trúc "so I want to improve..." rất quen thuộc với học viên Dreamer.',
              flipCard: {
                frontText: 'So I want good speak. (Sai ngữ pháp)',
                backText: 'so I want to improve my speaking and writing skills. (Chuẩn xác)',
                explanation: 'Động từ "improve" đi với cụm danh từ "speaking and writing skills".'
              }
            },
            {
              step: 3,
              label: 'BƯỚC 3: PHƯƠNG PHÁP THỰC HIỆN (BY + V-ING)',
              cognitiveFunction: '3. Bạn sẽ thực hiện việc đó bằng cách nào?',
              content: 'by practicing speaking on the DAN IELTS platform every day.',
              bandLevel: 'Band 4.0 → 4.5',
              pedagogyNote: 'Điểm ngữ pháp chốt của bài học: Dùng "by + V-ing" để chỉ phương thức đạt được mục tiêu.',
              flipCard: {
                frontText: 'I practice on DAN IELTS every day. (Câu rời)',
                backText: 'by practicing speaking on the DAN IELTS platform every day. (Nối vào câu chính)',
                explanation: 'Dùng giới từ "by + V-ing" nối liền mạch vào câu chỉ phương thức hành động.'
              },
              branchOptions: [
                {
                  branchName: 'LUYỆN NÓI TRÊN DAN IELTS (BÁM SÁT BÀI HỌC)',
                  content: 'by practicing speaking on the DAN IELTS platform every day.',
                  note: 'Phương thức chính xác trong bài tập tổng kết của giáo trình.'
                },
                {
                  branchName: 'LẬP THỜI GIAN BIỂU TỐT HƠN (Ý THỨ 2 TRONG BÀI)',
                  content: 'by making a better daily schedule and not surfing phone late.',
                  note: 'Trích từ câu Dear diary thứ 4 về việc quản lý thời gian.'
                }
              ]
            }
          ],
          fullMosaicSummary: 'I am not good at English because I was lazy in the past, so I want to improve my speaking and writing skills, by practicing speaking on the DAN IELTS platform every day.'
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
    subtitle: 'Cổng Kết Nối Động Từ: Lắp Ráp Cú Pháp & Phẫu Thuật Điểm Gãy',
    coreCompetency: 'Nhận diện chuẩn xác 3 cổng kết nối động từ trong giáo trình: Nội động từ (Vi), Ngoại động từ (Vt - gắn thẳng tân ngữ không chèn giới từ thừa), và Động từ nối (Linking Verb - kết nối tính từ, không dùng trạng từ). Chấm dứt lỗi dịch thô tiếng Việt "discuss about" và "look beautifully".',
    bridgeToHomework: {
      promptText: 'Thực hành sửa lỗi cổng kết nối động từ trong Homework W2D1.',
      targetExamId: 'exam_dreamer_w2d1'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'syntax_anatomy',
        title: 'Chặng 1: Kiến Tạo Cổng Kết Nối Linking Verb (The Dress Looks Beautiful)',
        pedagogicalObjective: 'Lắp ráp đúng trật tự cú pháp của Động từ nối (Linking Verb) trong bài tập 1.1 câu 5: Chủ ngữ + Linking Verb + Tính từ bổ ngữ.',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Bấm quét giải phẫu để lắp ráp các khoang chức năng của câu dùng Linking Verb:',
          mode: 'build',
          tokens: [
            { id: 't1', text: 'The new dress', role: 'subject', colorClass: 'green' },
            { id: 't2', text: 'looks', role: 'fv_core', colorClass: 'orange' },
            { id: 't3', text: 'beautiful', role: 'complement', colorClass: 'blue' },
            { id: 't4', text: 'on her', role: 'modifier', colorClass: 'purple' }
          ]
        }
      },
      {
        stageNumber: 2,
        stageType: 'productive_failure',
        title: 'Chặng 2: Phẫu Thuật Mâu Thuẫn Chèn Giới Từ Thừa (Discussing About Pay Rise)',
        pedagogicalObjective: 'Bám sát bài tập 1.1 câu 2: Nhận diện xung đột khi dịch thô "thảo luận về" chèn giới từ thừa "about" sau Ngoại động từ "discussing".',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Click vào cặp từ gây xung đột cổng kết nối trong câu dưới đây:',
          mode: 'break_and_repair',
          tokens: [
            { id: 't1', text: 'The board of directors', role: 'subject', colorClass: 'green' },
            { id: 't2', text: 'is discussing', role: 'fv_core', colorClass: 'orange' },
            { id: 't3', text: 'about', role: 'preposition', colorClass: 'red' },
            { id: 't4', text: 'a pay rise', role: 'object', colorClass: 'blue' }
          ],
          collisionTarget: {
            conflictingTokenIds: ['t2', 't3'],
            errorMessage: 'Xung đột cổng kết nối: "discuss" là Ngoại động từ (Vt) mang lực hút trực tiếp tân ngữ danh từ. Chèn giới từ "about" vào giữa sẽ làm gãy liên kết cú pháp!',
            repairOptions: [
              {
                id: 'opt1',
                action: 'delete',
                targetTokenId: 't3',
                resultText: 'a pay rise',
                explanation: 'Đẩy văng giới từ thừa "about" ra ngoài để tân ngữ "a pay rise" gắn trực tiếp vào động từ "discussing".'
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
    title: 'The Spatial Expansion Engine (Topic: Home)',
    subtitle: 'Nói Về Nơi Ở & Căn Phòng Yêu Thích: Từ Câu Cụt 3.0 Lên Bài Nói 4.0 - 4.5',
    coreCompetency: 'Chuẩn hóa đầu ra khóa Dreamer (3.0 → 4.0+): Giúp học viên vượt qua thói quen chỉ nói "I live in HCM city". Làm chủ quy luật giới từ IN (thành phố) -> ON (tên đường / tầng lầu) -> AT (địa điểm cụ thể), cấu trúc thời gian di chuyển "It takes me...", và cách mô tả căn nhà/căn phòng yêu thích đúng giáo trình.',
    bridgeToHomework: {
      promptText: 'Thu âm bài nói Part 1 miêu tả nơi ở hoặc căn phòng yêu thích của bạn trong Homework W2D3.',
      targetExamId: 'exam_dreamer_w2d3'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'progressive_reveal',
        title: 'Chặng 1: Nơi Ở & Khoảng Cách Di Chuyển (Where You Live & Commute)',
        pedagogicalObjective: 'Học cách nối câu bám sát đối thoại của Khang: Nơi ở hiện tại -> Tên đường / Tầng -> Khoảng cách và thời gian di chuyển (It takes me...).',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click mở từng tầng để nắm chắc cách trả lời câu hỏi "Where do you live?":',
          cards: [
            {
              step: 1,
              label: 'BƯỚC 1: THÀNH PHỐ VÀ QUÊ QUÁN (IN)',
              cognitiveFunction: '1. Bạn đến từ đâu và hiện đang ở thành phố nào?',
              content: 'My hometown is Can Tho, but now I live in Ho Chi Minh City to attend university.',
              bandLevel: 'Band 3.0 → 3.5',
              pedagogyNote: 'Bám sát câu thoại của bạn Khang trong giáo trình: quê ở Cần Thơ, lên TP.HCM học đại học.',
              flipCard: {
                frontText: 'I live in HCM city. (Quá cộc lốc)',
                backText: 'My hometown is Can Tho, but now I live in Ho Chi Minh City. (Nối ý tự nhiên)',
                explanation: 'Nối quê quán (hometown) với nơi ở hiện tại giúp câu trả lời sinh động hơn.'
              },
              vowelHighlight: [
                { word: 'food', phonetic: '/fuːd/', vowelSound: '/u:/ u dài' },
                { word: 'four', phonetic: '/fɔːr/', vowelSound: '/ɔː/ o dài' }
              ]
            },
            {
              step: 2,
              label: 'BƯỚC 2: TUYẾN ĐƯỜNG & TẦNG NHÀ (ON)',
              cognitiveFunction: '2. Cụ thể bạn sống ở đường nào hoặc tầng mấy?',
              content: 'Currently, I rent a house on Ba Hat Street in District 10.',
              bandLevel: 'Band 3.5 → 4.0',
              pedagogyNote: 'Quy tắc giới từ vàng trong bài: Dùng "ON" cho tên đường ("on Ba Hat Street") hoặc tầng nhà ("on the fifth floor").',
              flipCard: {
                frontText: 'I live Ba Hat street. (Quên giới từ)',
                backText: 'Currently, I rent a house on Ba Hat Street in District 10. (Đúng giới từ ON và IN)',
                explanation: 'Nhớ quy tắc kim tự tháp: "on" đi với tên đường, "in" đi với quận/thành phố.'
              }
            },
            {
              step: 3,
              label: 'BƯỚC 3: KHOẢNG CÁCH SO VỚI TRƯỜNG/CHỖ LÀM',
              cognitiveFunction: '3. Nơi đó gần hay xa trường học / trung tâm tiếng Anh?',
              content: "It's quite far from my school, so I usually leave early to avoid traffic congestion.",
              bandLevel: 'Band 4.0 → 4.5',
              pedagogyNote: 'Bám sát giáo trình: "quite far from..." và cụm từ vựng "traffic congestion" (kẹt xe).',
              flipCard: {
                frontText: 'It is far. Traffic is jam. (Tiếng bồi)',
                backText: "It's quite far from my school, so I leave early to avoid traffic congestion.",
                explanation: 'Dùng cụm từ tự nhiên trong bài: "avoid traffic congestion" (tránh kẹt xe).'
              },
              branchOptions: [
                {
                  branchName: 'NHÀ XA (KHANG - 30 PHÚT CHẠY XE)',
                  content: "It's quite far from my school, so I usually leave early to avoid traffic congestion.",
                  note: 'Trích từ câu thoại của bạn Khang (quận 10 qua trung tâm).'
                },
                {
                  branchName: 'NHÀ GẦN (AN - 10 PHÚT ĐI BỘ)',
                  content: "It is pretty convenient for me, because it only takes me 10 minutes to walk to school.",
                  note: 'Trích từ câu thoại của bạn An (sống ở Thủ Đức).'
                }
              ]
            },
            {
              step: 4,
              label: 'BƯỚC 4: THỜI GIAN DI CHUYỂN (IT TAKES ME...)',
              cognitiveFunction: '4. Mất bao lâu để bạn đi đến đó?',
              content: 'It usually takes me around 30 minutes to drive my motorbike there every day.',
              bandLevel: 'Band 4.5',
              pedagogyNote: 'Cấu trúc điểm nhấn của bài học: "It takes me + [khoảng thời gian] + to drive / to walk".',
              flipCard: {
                frontText: 'I go 30 minutes. (Lỗi dịch từ tiếng Việt)',
                backText: 'It takes me around 30 minutes to drive there. (Chuẩn ngữ pháp tiếng Anh)',
                explanation: 'Sử dụng cấu trúc chuẩn "It takes me [time] to [verb]" thay vì nói "I go 30 minutes".'
              }
            }
          ],
          fullMosaicSummary: "My hometown is Can Tho, but now I live in Ho Chi Minh City to attend university. Currently, I rent a house on Ba Hat Street in District 10. It's quite far from my school, so I usually leave early to avoid traffic congestion, and it usually takes me around 30 minutes to drive there."
        }
      },
      {
        stageNumber: 2,
        stageType: 'progressive_reveal',
        title: 'Chặng 2: Miêu Tả Ngôi Nhà (How Many Rooms & House Layout)',
        pedagogicalObjective: 'Làm chủ bài tập 3.2: Miêu tả nhà mấy tầng, bao nhiêu phòng và vị trí các phòng (on the ground floor, next to, opposite).',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click mở từng tầng để nắm cách miêu tả ngôi nhà của bạn:',
          cards: [
            {
              step: 1,
              label: 'BƯỚC 1: KIỂU NHÀ VÀ SỐ PHÒNG',
              cognitiveFunction: '1. Bạn sống ở nhà mấy tầng và có bao nhiêu phòng?',
              content: 'I live in a three-storey house with about seven rooms.',
              bandLevel: 'Band 3.0 → 3.5',
              pedagogyNote: 'Bám sát giáo trình: "I live in a 3-storey house with about 7 rooms".',
              flipCard: {
                frontText: 'My house has 3 floors and 7 rooms. (Đơn giản)',
                backText: 'I live in a three-storey house with about seven rooms. (Chuẩn tự nhiên)',
                explanation: 'Dùng cụm tính từ "three-storey house" (nhà 3 tầng) như trong bài tập 3.2.'
              },
              vowelHighlight: [
                { word: 'foot', phonetic: '/fʊt/', vowelSound: '/ʊ/ u ngắn' },
                { word: 'far', phonetic: '/fɑːr/', vowelSound: '/ɑː/ a dài' }
              ]
            },
            {
              step: 2,
              label: 'BƯỚC 2: TẦNG TRỆT VÀ PHÒNG KHÁCH (GROUND FLOOR)',
              cognitiveFunction: '2. Tầng trệt có những phòng gì và nằm ở đâu?',
              content: 'On the ground floor, there is a small living room in front of the house where my family gathers,',
              bandLevel: 'Band 3.5 → 4.0',
              pedagogyNote: 'Dùng cụm vị trí: "On the ground floor" (ở tầng trệt) và "in front of the house" (phía trước nhà).',
              flipCard: {
                frontText: 'Floor 1 have living room. (Lỗi dùng từ floor)',
                backText: 'On the ground floor, there is a living room in front of the house. (Chuẩn Anh-Anh)',
                explanation: 'Tầng trệt trong tiếng Anh dùng "ground floor", không nói "floor 1".'
              }
            },
            {
              step: 3,
              label: 'BƯỚC 3: CÁC PHÒNG BÊN TRONG (NEXT TO & OPPOSITE)',
              cognitiveFunction: '3. Nhà bếp và các phòng khác nằm ở vị trí nào?',
              content: 'and next to it is the kitchen, while the bathroom is located at the end of the hallway.',
              bandLevel: 'Band 4.0 → 4.5',
              pedagogyNote: 'Luyện tập các giới từ chỉ vị trí trong bài: "next to" (kế bên) và "at the end of the hallway" (cuối hành lang).',
              flipCard: {
                frontText: 'Kitchen near living room. Toilet is far. (Cụt ý)',
                backText: 'next to it is the kitchen, and the bathroom is at the end of the hallway. (Rõ ràng)',
                explanation: 'Dùng cụm từ chỉ vị trí chính xác trong giáo trình: "at the end of the hallway".'
              }
            },
            {
              step: 4,
              label: 'BƯỚC 4: TẦNG TRÊN VÀ SÂN THƯỢNG (ROOFTOP)',
              cognitiveFunction: '4. Tầng 2 và sân thượng có gì đặc biệt?',
              content: 'On the second floor is my cozy bedroom, and on the rooftop, my mom plants many green trees.',
              bandLevel: 'Band 4.5',
              pedagogyNote: 'Bám sát giáo trình: phòng ngủ ấm cúng ("cozy bedroom") và sân thượng trồng cây ("rooftop plants trees").',
              flipCard: {
                frontText: 'Top of house has trees. (Tiếng bồi)',
                backText: 'on the rooftop, my mom plants many green trees. (Đúng từ rooftop)',
                explanation: 'Dùng từ "rooftop" (sân thượng) chuẩn xác như bài đọc mô tả nhà.'
              }
            }
          ],
          fullMosaicSummary: 'I live in a three-storey house with about seven rooms. On the ground floor, there is a small living room in front of the house where my family gathers, and next to it is the kitchen, while the bathroom is at the end of the hallway. On the second floor is my cozy bedroom, and on the rooftop, my mom plants many green trees.'
        }
      },
      {
        stageNumber: 3,
        stageType: 'progressive_reveal',
        title: 'Chặng 3: Căn Phòng Yêu Thích Của Bạn (Favorite Room - Bạn Hân)',
        pedagogicalObjective: 'Làm chủ bài tập 3.3: Miêu tả căn phòng yêu thích nhất (bedroom), lý do thích và cách bố trí đồ đạc bên trong.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click mở từng tầng để nắm cách trả lời câu hỏi "What is your favorite room?":',
          cards: [
            {
              step: 1,
              label: 'BƯỚC 1: NÊU CĂN PHÒNG YÊU THÍCH NHẤT',
              cognitiveFunction: '1. Căn phòng bạn thích nhất là phòng nào?',
              content: 'My favorite room is definitely my bedroom, because it is cozy and bright.',
              bandLevel: 'Band 3.0 → 3.5',
              pedagogyNote: 'Bám sát đoạn hội thoại của bạn Hân: phòng ngủ ấm cúng ban đêm và đủ sáng ban ngày.',
              flipCard: {
                frontText: 'I like my bedroom. (Đơn sơ)',
                backText: 'My favorite room is definitely my bedroom, because it is cozy and bright.',
                explanation: 'Học cặp tính từ mô tả phòng trong giáo trình: "cozy" (ấm cúng) và "bright" (sáng sủa).'
              }
            },
            {
              step: 2,
              label: 'BƯỚC 2: CÔNG NĂNG & LÝ DO THÍCH',
              cognitiveFunction: '2. Bạn thường làm gì trong căn phòng này?',
              content: 'It is a great place where I can relax and get some rest after a long day at work or school.',
              bandLevel: 'Band 3.5 → 4.0',
              pedagogyNote: 'Nguyên văn mẫu câu của bạn Hân trong giáo trình: nơi thư giãn và nghỉ ngơi sau ngày dài.',
              flipCard: {
                frontText: 'I sleep there after work. (Quá ngắn)',
                backText: 'It is a great place where I can relax and get some rest after a long day.',
                explanation: 'Học cụm từ hay: "relax and get some rest after a long day".'
              }
            },
            {
              step: 3,
              label: 'BƯỚC 3: CÁCH BỐ TRÍ NỘI THẤT (LAYOUT)',
              cognitiveFunction: '3. Giường ngủ, bàn học và giá sách được đặt ở đâu?',
              content: 'Next to the door is a comfortable bed, and opposite the bed is my working desk with bookshelves above it.',
              bandLevel: 'Band 4.0 → 4.5',
              pedagogyNote: 'Luyện cấu trúc bài tập vẽ sơ đồ phòng: "next to the door", "opposite the bed", "above it".',
              flipCard: {
                frontText: 'Bed is here, desk is there. (Thiếu giới từ)',
                backText: 'Next to the door is a comfortable bed, and opposite the bed is my working desk.',
                explanation: 'Dùng cặp giới từ đối chiếu: "next to" (bên cạnh) và "opposite" (đối diện).'
              },
              branchOptions: [
                {
                  branchName: 'CÓ BAN CÔNG NHỎ (BÁM SÁT BÀN HÂN)',
                  content: 'Plus, there is a small balcony where I often grow some flowers and enjoy the street view.',
                  note: 'Chi tiết ban công ngắm phố như câu thoại của Hân.'
                },
                {
                  branchName: 'CỬA SỔ LỚN THOÁNG MÁT (MỞ RỘNG PHỔ BIẾN)',
                  content: 'Plus, it has a large window that lets in plenty of fresh air and natural sunlight.',
                  note: 'Chi tiết cửa sổ đón gió và ánh sáng rất dễ áp dụng.'
                }
              ]
            },
            {
              step: 4,
              label: 'BƯỚC 4: CẢM XÚC TỔNG KẾT',
              cognitiveFunction: '4. Tóm lại bạn cảm thấy thế nào khi ở trong phòng?',
              content: 'Whenever I stay in my room, I always feel completely peaceful and comfortable.',
              bandLevel: 'Band 4.5',
              pedagogyNote: 'Khép lại bằng cảm xúc tích cực với 2 tính từ thông dụng: "peaceful" (bình yên) và "comfortable" (thoải mái).',
              flipCard: {
                frontText: 'I feel good in my room. (Đơn sơ)',
                backText: 'I always feel completely peaceful and comfortable in my room. (Tròn trịa)',
                explanation: 'Dùng từ "peaceful and comfortable" giúp bài nói ấm áp và tự nhiên.'
              }
            }
          ],
          fullMosaicSummary: 'My favorite room is definitely my bedroom, because it is cozy and bright. It is a great place where I can relax and get some rest after a long day at work. Next to the door is a comfortable bed, and opposite the bed is my working desk with bookshelves above it. Whenever I stay in my room, I always feel completely peaceful and comfortable.'
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
    subtitle: 'Neo Trục Thời Gian: Lắp Ráp Cú Pháp & Phẫu Thuật Điểm Gãy',
    coreCompetency: 'Làm chủ sự phân định giữa Quá khứ đơn (Simple Past - hành động chấm dứt với điểm neo thời gian xác định) và Hiện tại hoàn thành (Present Perfect - kinh nghiệm, dấu vết chạm đến hiện tại) đúng theo chuẩn giáo trình W3D1.',
    bridgeToHomework: {
      promptText: 'Luyện tập phân định thì Simple Past vs Present Perfect trong Homework W3D1.',
      targetExamId: 'exam_dreamer_w3d1'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'syntax_anatomy',
        title: 'Chặng 1: Kiến Tạo Neo Thời Gian Quá Khứ Đơn (Meeting a Colleague Yesterday)',
        pedagogicalObjective: 'Bám sát ví dụ giáo trình W3D1 mục 2 câu 1: Lắp ráp câu có mốc thời gian quá khứ đóng kín "yesterday" đi kèm động từ quá khứ đơn "met".',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Bấm quét giải phẫu để lắp ráp câu hoàn chỉnh có điểm neo thời gian quá khứ xác định:',
          mode: 'build',
          tokens: [
            { id: 't1', text: 'She', role: 'subject', colorClass: 'green' },
            { id: 't2', text: 'met', role: 'fv_core', colorClass: 'orange' },
            { id: 't3', text: 'a former colleague', role: 'object', colorClass: 'blue' },
            { id: 't4', text: 'at a quiet restaurant', role: 'modifier', colorClass: 'purple' },
            { id: 't5', text: 'yesterday', role: 'scope_condition', colorClass: 'purple' }
          ]
        }
      },
      {
        stageNumber: 2,
        stageType: 'productive_failure',
        title: 'Chặng 2: Phẫu Thuật Mâu Thuẫn Trục Thời Gian Đóng Kín (Trinh Cong Son Has Written)',
        pedagogicalObjective: 'Đối diện lỗi kinh điển Band 3.0: Chủ thể hoặc sự kiện đã khép lại vĩnh viễn trong quá khứ nhưng vẫn dùng thì Hiện tại hoàn thành (has written).',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Click vào cặp từ gây xung đột sụp đổ logic thời gian trong câu dưới đây:',
          mode: 'break_and_repair',
          tokens: [
            { id: 't1', text: 'Trinh Cong Son', role: 'subject', colorClass: 'green' },
            { id: 't2', text: 'has written', role: 'fv_core', colorClass: 'red' },
            { id: 't3', text: 'many famous songs', role: 'object', colorClass: 'blue' },
            { id: 't4', text: 'in his career', role: 'scope_condition', colorClass: 'orange' }
          ],
          collisionTarget: {
            conflictingTokenIds: ['t1', 't2'],
            errorMessage: 'Lỗi neo trục thời gian: Nhạc sĩ Trịnh Công Sơn đã qua đời (cuộc đời và sự nghiệp đã đóng kín trong quá khứ). Không thể dùng Hiện tại hoàn thành "has written" để ám chỉ khả năng còn tiếp diễn sáng tác!',
            repairOptions: [
              {
                id: 'opt1',
                action: 'delete',
                targetTokenId: 't2',
                resultText: 'wrote',
                explanation: 'Chuyển về thì Quá khứ đơn "wrote" để phản ánh đúng thực tế lịch sử đã hoàn tất trọn vẹn.'
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
    title: 'The Technology & App Utility Engine (Topic: Technology)',
    subtitle: 'Nói Về Ứng Dụng & Công Nghệ: Từ Câu Cụt 3.0 Lên Bài Nói Hoàn Chỉnh 4.0 - 4.5',
    coreCompetency: 'Chuẩn hóa đầu ra khóa Dreamer (3.0 → 4.0+): Học viên làm chủ 3 mẫu câu nói về lợi ích công nghệ ("I use it to...", "It helps me...", "Thanks to it, I can..."), biết dùng câu điều kiện đơn giản ("If I spend too much time..., it makes me...") để nói về tác hại của điện thoại đúng theo Coursebook.',
    bridgeToHomework: {
      promptText: 'Thu âm bài nói Part 1 về ứng dụng điện thoại hoặc thiết bị công nghệ bạn thường dùng trong Homework W3D3.',
      targetExamId: 'exam_dreamer_w3d3'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'progressive_reveal',
        title: 'Chặng 1: Bạn Dùng Điện Thoại Để Làm Gì? (What Do You Use Your Phone For?)',
        pedagogicalObjective: 'Bám sát đối thoại Lan & Khang: Học 3 cấu trúc cốt lõi để nói về ứng dụng học tiếng Anh (ELSA, DAN IELTS platform) hoặc tiện ích (Shopee, Google Calendar).',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click mở từng bước để học cách trả lời câu hỏi "What do you use your phone for?":',
          cards: [
            {
              step: 1,
              label: 'BƯỚC 1: TÊN ỨNG DỤNG VÀ THỜI GIAN SỬ DỤNG',
              cognitiveFunction: '1. Bạn hay dùng ứng dụng nào và dùng bao lâu mỗi ngày?',
              content: 'I usually use the ELSA app on my smartphone for about 15 minutes every day.',
              bandLevel: 'Band 3.0 → 3.5',
              pedagogyNote: 'Bám sát nguyên văn lời Khang: dùng ELSA trên điện thoại 15 phút mỗi ngày.',
              flipCard: {
                frontText: 'I use phone to learn English. (Quá chung chung)',
                backText: 'I usually use the ELSA app on my smartphone for 15 minutes every day. (Cụ thể, rõ ràng)',
                explanation: 'Nêu tên ứng dụng cụ thể và khoảng thời gian hằng ngày giúp bài nói có chi tiết thực tế.'
              },
              vowelHighlight: [
                { word: 'phone', phonetic: '/fəʊn/', vowelSound: '/f/ âm xát môi răng' },
                { word: 'practice', phonetic: '/ˈpræk.tɪs/', vowelSound: '/p/ âm chặn môi' }
              ]
            },
            {
              step: 2,
              label: 'BƯỚC 2: TÍNH NĂNG CHÍNH (IT HELPS ME + V)',
              cognitiveFunction: '2. Ứng dụng đó giúp bạn làm được việc gì?',
              content: 'It helps me improve my pronunciation and corrects my speaking errors.',
              bandLevel: 'Band 3.5 → 4.0',
              pedagogyNote: 'Luyện cấu trúc ngữ pháp trọng tâm 3.1: "It helps me + V nguyên mẫu" (helps me improve pronunciation).',
              flipCard: {
                frontText: 'It is good for speak. (Sai ngữ pháp)',
                backText: 'It helps me improve my pronunciation. (Chuẩn cấu trúc helps me + V)',
                explanation: 'Cấu trúc chuẩn: "It helps me + [động từ nguyên mẫu]" là vũ khí ghi điểm cực dễ ở Band 4.0.'
              }
            },
            {
              step: 3,
              label: 'BƯỚC 3: HIỆU QUẢ ĐẠT ĐƯỢC (THANKS TO IT, I CAN...)',
              cognitiveFunction: '3. Nhờ có nó, bạn thay đổi được điều gì?',
              content: 'Thanks to this app, I can communicate more effectively in English.',
              bandLevel: 'Band 4.0 → 4.5',
              pedagogyNote: 'Bám sát mẫu câu thứ ba trong giáo trình: "Thanks to it, I can communicate more effectively".',
              flipCard: {
                frontText: 'So I speak better. (Hơi ngắn)',
                backText: 'Thanks to this app, I can communicate more effectively. (Đúng mẫu câu giáo trình)',
                explanation: 'Cụm "Thanks to + Noun, I can..." tạo liên kết kết quả tự nhiên thay vì chỉ lặp từ "so".'
              },
              branchOptions: [
                {
                  branchName: 'HỌC TIẾNG ANH (ELSA / DAN IELTS)',
                  content: 'Thanks to this app, I can communicate more effectively and do my homework online.',
                  note: 'Trích từ câu trả lời của Khang về việc học tiếng Anh.'
                },
                {
                  branchName: 'QUẢN LÝ THỜI GIAN (GOOGLE CALENDAR)',
                  content: 'Thanks to Google Calendar, I can set reminders and manage my study time easily.',
                  note: 'Trích từ ví dụ b trong bài tập 3.1 về quản lý lịch học.'
                }
              ]
            },
            {
              step: 4,
              label: 'BƯỚC 4: KẾT LUẬN CÔNG NGHỆ (VERY USEFUL)',
              cognitiveFunction: '4. Bạn đánh giá thế nào về vai trò của công nghệ?',
              content: 'I think technology is really useful because it makes my daily study much easier.',
              bandLevel: 'Band 4.5',
              pedagogyNote: 'Khép lại câu trả lời bằng nhận xét đơn giản: "makes my daily study much easier".',
              flipCard: {
                frontText: 'Phone is very good. (Đơn sơ)',
                backText: 'I think technology is really useful because it makes my study much easier. (Tròn trịa)',
                explanation: 'Cấu trúc "make something + tính từ" (makes my study easier) rất tự nhiên và vừa sức.'
              }
            }
          ],
          fullMosaicSummary: 'I usually use the ELSA app on my smartphone for about 15 minutes every day. It helps me improve my pronunciation and corrects my speaking errors. Thanks to this app, I can communicate more effectively in English, and it makes my daily study much easier.'
        }
      },
      {
        stageNumber: 2,
        stageType: 'progressive_reveal',
        title: 'Chặng 2: Tác Hại Của Việc Dùng Điện Thoại Quá Nhiều (The Misuse of Smartphones)',
        pedagogicalObjective: 'Làm chủ bài tập 3.2: Dùng cấu trúc If và "makes it hard for me to..." để nói về các vấn đề: mỏi mắt, nghiện mạng xã hội và mất tập trung.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click mở từng tầng để nắm cách nói về tác hại của điện thoại:',
          cards: [
            {
              step: 1,
              label: 'BƯỚC 1: THỪA NHẬN TẬT XẤU (SPEND TOO MUCH TIME)',
              cognitiveFunction: '1. Bạn hay dùng điện thoại sai cách như thế nào?',
              content: 'To be honest, I often spend too much time surfing social media before going to sleep.',
              bandLevel: 'Band 3.0 → 3.5',
              pedagogyNote: 'Bám sát giáo trình: "surf social media for a long time" và thói quen lướt điện thoại muộn.',
              flipCard: {
                frontText: 'I use Facebook many hours. (Tiếng bồi)',
                backText: 'I often spend too much time surfing social media before sleeping. (Chuẩn giáo trình)',
                explanation: 'Dùng cụm "spend too much time + V-ing" (dành quá nhiều thời gian làm gì).'
              },
              vowelHighlight: [
                { word: 'social', phonetic: '/ˈsəʊ.ʃəl/', vowelSound: '/s/ âm xát' },
                { word: 'sleep', phonetic: '/sliːp/', vowelSound: '/s/ âm xát' }
              ]
            },
            {
              step: 2,
              label: 'BƯỚC 2: ẢNH HƯỞNG SỨC KHỎE (HURT EYES & HARD TO SLEEP)',
              cognitiveFunction: '2. Thói quen đó ảnh hưởng gì đến cơ thể bạn?',
              content: 'The blue light from the screen hurts my eyes, and it makes it hard for me to sleep.',
              bandLevel: 'Band 3.5 → 4.0',
              pedagogyNote: 'Trích nguyên văn giáo trình: "blue light from the screen", "hurt my eyes" và "makes it hard to sleep".',
              flipCard: {
                frontText: 'Eye is pain, cannot sleep. (Dịch từng chữ)',
                backText: 'It hurts my eyes, and makes it hard for me to sleep. (Đúng mẫu câu giáo trình)',
                explanation: 'Cấu trúc trọng tâm trong bài: "make it hard for someone to + V" (khiến ai đó khó làm gì).'
              }
            },
            {
              step: 3,
              label: 'BƯỚC 3: MẤT TẬP TRUNG (HARD TO FOCUS ON WORK)',
              cognitiveFunction: '3. Điều đó ảnh hưởng thế nào đến việc học hoặc làm việc?',
              content: 'Also, getting addicted to phone notifications makes it difficult to focus on my study.',
              bandLevel: 'Band 4.0 → 4.5',
              pedagogyNote: 'Bám sát ý thứ hai trong giáo trình: nghiện điện thoại ("addicted to phones") và mất tập trung ("hard to focus").',
              flipCard: {
                frontText: 'I cannot focus on study. (Đơn giản)',
                backText: 'It makes it difficult for me to focus on my study. (Nâng cấp +0.5)',
                explanation: 'Thay "cannot focus" bằng cấu trúc "makes it difficult to focus on...".'
              },
              branchOptions: [
                {
                  branchName: 'MẤT TẬP TRUNG HỌC TẬP (Ý BÀI ĐỌC)',
                  content: 'Also, getting addicted to phone notifications makes it hard to focus on my study.',
                  note: 'Bám sát ý phàn nàn trong bài tập 3.2.'
                },
                {
                  branchName: 'SO SÁNH BẢN THÂN VỚI NGƯỜI KHÁC (Ý THỨ 3)',
                  content: 'Also, seeing only good parts of people on social media makes me feel dissatisfied with my life.',
                  note: 'Trích từ ý thứ 3 trong bài đọc về tâm lý so sánh trên mạng xã hội.'
                }
              ]
            },
            {
              step: 4,
              label: 'BƯỚC 4: GIẢI PHÁP CỦA BẠN (THAT IS WHY I TRY TO...)',
              cognitiveFunction: '4. Bạn dự định làm gì để giải quyết vấn đề này?',
              content: "That's why I try to turn off my phone 30 minutes before bedtime.",
              bandLevel: 'Band 4.5',
              pedagogyNote: 'Bám sát mẫu câu hỏi bài tập: "That\'s why I try to..." khép lại bằng hành động tích cực.',
              flipCard: {
                frontText: 'So I will not use phone. (Cụt ý)',
                backText: "That's why I try to turn off my phone 30 minutes before bedtime. (Hoàn chỉnh)",
                explanation: 'Dùng cụm kết nối nguyên nhân - kết quả quen thuộc: "That\'s why I try to + V".'
              }
            }
          ],
          fullMosaicSummary: "To be honest, I often spend too much time surfing social media before going to sleep. The blue light from the screen hurts my eyes, and it makes it hard for me to sleep. Also, getting addicted to my phone makes it difficult to focus on my study. That's why I try to turn off my phone 30 minutes before bedtime."
        }
      },
      {
        stageNumber: 3,
        stageType: 'progressive_reveal',
        title: 'Chặng 3: Lựa Chọn Thiết Bị Học Tập (Role-Play: Buying a Laptop)',
        pedagogicalObjective: 'Làm chủ đoạn hội thoại mua laptop 3.3: Nêu nhu cầu sinh viên -> So sánh 2 lựa chọn (giá rẻ Dell vs pin trâu HP/Mac) -> Đưa ra quyết định cuối cùng.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click mở từng bước để học cách nói khi đi mua thiết bị công nghệ:',
          cards: [
            {
              step: 1,
              label: 'BƯỚC 1: NÊU NHU CẦU MUA SẮM (LOOKING FOR...)',
              cognitiveFunction: '1. Bạn cần mua máy tính cho mục đích gì?',
              content: "I'm looking for a laptop for university students with a reasonable price.",
              bandLevel: 'Band 3.0 → 3.5',
              pedagogyNote: 'Bám sát câu mở đầu của Sarah trong bài tập 3.3: tìm laptop cho sinh viên giá cả hợp lý.',
              flipCard: {
                frontText: 'I want to buy a computer. (Đơn giản)',
                backText: "I'm looking for a laptop for university students with a reasonable price. (Tự nhiên)",
                explanation: 'Dùng cụm "look for" (tìm kiếm) và "at a reasonable price" (với mức giá hợp lý).'
              }
            },
            {
              step: 2,
              label: 'BƯỚC 2: CÔNG NĂNG CƠ BẢN CẦN THIẾT (DOCUMENTS & SLIDES)',
              cognitiveFunction: '2. Bạn cần dùng máy tính đó để làm gì trong việc học?',
              content: 'I need to use it to create Word documents and make PowerPoint slides for my classes.',
              bandLevel: 'Band 3.5 → 4.0',
              pedagogyNote: 'Trích từ lời tư vấn trong bài: tạo tài liệu văn bản và làm slide thuyết trình.',
              flipCard: {
                frontText: 'I need it for study. (Chung chung)',
                backText: 'I need to use it to create documents and make PowerPoint slides. (Rõ ràng)',
                explanation: 'Liệt kê các tác vụ học tập quen thuộc bằng tiếng Anh: "create documents and make slides".'
              }
            },
            {
              step: 3,
              label: 'BƯỚC 3: TÍNH NĂNG QUAN TRỌNG (LONG BATTERY LIFE)',
              cognitiveFunction: '3. Bạn thích tính năng nào khác (pin, cân nặng)?',
              content: 'Besides, I prefer a laptop with long battery life, so it can last for a whole day without charging.',
              bandLevel: 'Band 4.0 → 4.5',
              pedagogyNote: 'Bám sát cụm từ trong bài: "long battery life" (thời lượng pin dài) và "last for a whole day" (dùng được cả ngày).',
              flipCard: {
                frontText: 'Battery is good, big. (Nói vụng)',
                backText: 'It has long battery life, so it can last for a whole day without charging.',
                explanation: 'Dùng cụm chuyên môn chuẩn: "long battery life" và "last for a whole day without charging".'
              },
              branchOptions: [
                {
                  branchName: 'PIN TRÂU (LONG BATTERY LIFE)',
                  content: 'Besides, I prefer a laptop with long battery life, so it can last for a whole day without charging.',
                  note: 'Điểm cộng lớn cho sinh viên thường xuyên học ở trường hay quán cà phê.'
                },
                {
                  branchName: 'NHẸ DỄ MANG ĐI (LIGHTWEIGHT)',
                  content: 'Besides, I need a lightweight laptop so that I can easily carry it in my backpack.',
                  note: 'Tiêu chí máy mỏng nhẹ rất thực tế.'
                }
              ]
            },
            {
              step: 4,
              label: 'BƯỚC 4: QUYẾT ĐỊNH CUỐI CÙNG (I HAVE MADE UP MY MIND)',
              cognitiveFunction: '4. Cuối cùng bạn quyết định chọn phương án nào?',
              content: 'I have made up my mind, and I will go for a laptop that fits my budget.',
              bandLevel: 'Band 4.5',
              pedagogyNote: 'Cụm thành ngữ thông dụng chốt lại bài hội thoại: "I have made up my mind" (Tôi đã quyết định rồi).',
              flipCard: {
                frontText: 'I choose this one. (Đơn điệu)',
                backText: 'I have made up my mind, and I will go for it. (Cách nói tự nhiên của người bản xứ)',
                explanation: 'Cụm "make up one\'s mind" (quyết định) là thành ngữ rất quen thuộc trong giao tiếp.'
              }
            }
          ],
          fullMosaicSummary: "I'm looking for a laptop for university students with a reasonable price. I need to use it to create Word documents and make PowerPoint slides for my classes. Besides, I prefer a laptop with long battery life, so it can last for a whole day without charging. I have made up my mind, and I will go for a laptop that fits my budget."
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
    subtitle: 'Bổ Ngữ Tính Từ & Trạng Từ: Lắp Ráp Cú Pháp & Phẫu Thuật Điểm Gãy',
    coreCompetency: 'Làm chủ vị trí và quy tắc bổ nghĩa trong giáo trình W4D1: Tính từ (Adj) đứng trước danh từ để miêu tả đặc điểm, Trạng từ (Adv) bổ nghĩa cho động từ hành động. Nhận diện Động từ nối (Linking Verb) như "smell, taste, look" đòi hỏi Tính từ, chấm dứt lỗi dùng trạng từ đuôi -ly sai chức năng.',
    bridgeToHomework: {
      promptText: 'Thực hành sửa lỗi bổ ngữ tính từ - trạng từ trong Homework W4D1.',
      targetExamId: 'exam_dreamer_w4d1'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'syntax_anatomy',
        title: 'Chặng 1: Kiến Tạo Mở Rộng Bổ Ngữ Tính Từ & Trạng Từ (Dedicated Doctor Examined Carefully)',
        pedagogicalObjective: 'Bám sát mục tiêu bài học W4D1 (từ câu "em bé" nâng lên câu giàu bổ ngữ): Lắp ráp Tính từ bổ nghĩa Danh từ và Trạng từ bổ nghĩa Động từ.',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Bấm quét giải phẫu để lắp ráp câu văn được mở rộng bằng Tính từ và Trạng từ bổ ngữ:',
          mode: 'build',
          tokens: [
            { id: 't1', text: 'The dedicated doctor', role: 'subject', colorClass: 'green' },
            { id: 't2', text: 'carefully examined', role: 'fv_core', colorClass: 'orange' },
            { id: 't3', text: 'the sick patient', role: 'object', colorClass: 'blue' },
            { id: 't4', text: 'in the clinic', role: 'modifier', colorClass: 'purple' }
          ]
        }
      },
      {
        stageNumber: 2,
        stageType: 'productive_failure',
        title: 'Chặng 2: Phẫu Thuật Mâu Thuẫn Lệch Khớp Sau Linking Verb (The Food Smells Awfully)',
        pedagogicalObjective: 'Đối diện lỗi kinh điển Band 3.0: Nhầm lẫn giữa Trạng từ chỉ hành động và Tính từ sau Động từ nối (smells / looks / tastes).',
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
            errorMessage: 'Lỗi lệch khớp bổ ngữ: "smells" ở đây là Động từ nối (Linking Verb) phản chiếu trạng thái/tính chất của Món ăn ("The food"). Động từ nối đòi hỏi Tính từ (Adj), không thể gắn Trạng từ đuôi -ly ("awfully")!',
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
    title: 'The Health Habits & Well-being Engine (Topic: Health)',
    subtitle: 'Nói Về Thói Quen Sức Khỏe: Từ Câu Cụt 3.0 Lên Bài Nói Mạch Lạc 4.0 - 4.5',
    coreCompetency: 'Chuẩn hóa đầu ra khóa Dreamer (3.0 → 4.0+): Học viên vượt qua việc chỉ nói "I stay up late and tired". Làm chủ các cụm từ vựng sức khỏe trong giáo trình ("have a bad habit of...", "makes me feel exhausted", "break this bad habit by..."), và các cấu trúc rèn luyện thể chất ("stay in shape", "balanced diet", "do yoga").',
    bridgeToHomework: {
      promptText: 'Thu âm bài nói Part 1 về thói quen sinh hoạt và cách bạn giữ gìn sức khỏe trong Homework W4D3.',
      targetExamId: 'exam_dreamer_w4d3'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'progressive_reveal',
        title: 'Chặng 1: Thói Quen Xấu & Hậu Quả (Unhealthy Habits - Bạn Khang)',
        pedagogicalObjective: 'Bám sát đối thoại Khang & Hân: Thừa nhận thói quen thức khuya, bỏ bữa sáng -> Hậu quả uể oải, kiệt sức -> Quyết tâm từ bỏ tật xấu.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click mở từng bước để học cách nói về thói quen xấu ảnh hưởng sức khỏe:',
          cards: [
            {
              step: 1,
              label: 'BƯỚC 1: NÊU THÓI QUEN XẤU (HAVE A BAD HABIT OF)',
              cognitiveFunction: '1. Bạn có thói quen xấu nào trong sinh hoạt hằng ngày?',
              content: 'I usually stay up late because of work deadlines, and I have a bad habit of skipping breakfast.',
              bandLevel: 'Band 3.0 → 3.5',
              pedagogyNote: 'Bám sát nguyên văn câu thoại của Khang: "stay up late" và "have a bad habit of skipping breakfast".',
              flipCard: {
                frontText: 'I sleep late and not eat breakfast. (Nói tiếng bồi)',
                backText: 'I stay up late, and have a bad habit of skipping breakfast. (Chuẩn giáo trình)',
                explanation: 'Dùng cụm "have a bad habit of + V-ing" (có thói quen xấu làm gì) và "skip breakfast" (bỏ bữa sáng).'
              },
              vowelHighlight: [
                { word: 'health', phonetic: '/helθ/', vowelSound: '/θ/ âm th thổi hơi' },
                { word: 'breathed', phonetic: '/briːðd/', vowelSound: '/ð/ âm th rung lưỡi' }
              ]
            },
            {
              step: 2,
              label: 'BƯỚC 2: HẬU QUẢ THỂ CHẤT (MAKES ME FEEL EXHAUSTED)',
              cognitiveFunction: '2. Thói quen đó khiến cơ thể bạn cảm thấy ra sao?',
              content: 'I do not get enough sleep or proper nutrition, so it makes me feel exhausted all the time.',
              bandLevel: 'Band 3.5 → 4.0',
              pedagogyNote: 'Luyện cấu trúc giáo trình: "makes me feel exhausted and inactive" (khiến tôi kiệt sức và uể oải).',
              flipCard: {
                frontText: 'I am very tired. (Từ vựng quá đơn giản)',
                backText: 'It makes me feel exhausted all the time. (Cụm từ đắt giá của bài học)',
                explanation: 'Nâng cấp từ "tired" lên tính từ "exhausted" (kiệt sức) và cấu trúc "makes me feel + Adj".'
              }
            },
            {
              step: 3,
              label: 'BƯỚC 3: GIẢI PHÁP TỪ BỎ (BREAK THIS BAD HABIT BY...)',
              cognitiveFunction: '3. Bạn dự định từ bỏ thói quen đó bằng cách nào?',
              content: 'I want to break this bad habit by managing my time better and ensuring that I eat breakfast every day.',
              bandLevel: 'Band 4.0 → 4.5',
              pedagogyNote: 'Cụm từ vàng của Khang: "break this bad habit by managing my time better".',
              flipCard: {
                frontText: 'I stop it and eat food. (Diễn đạt vụng về)',
                backText: 'I want to break this bad habit by managing my time better. (Chuẩn tự nhiên)',
                explanation: 'Cụm "break a bad habit" (từ bỏ một thói quen xấu) là collocation điểm nhấn của bài học.'
              },
              branchOptions: [
                {
                  branchName: 'ĂN SÁNG ĐẦY ĐỦ (BÁM SÁT LỜI KHANG)',
                  content: 'I want to break this bad habit by managing my time better and ensuring that I eat breakfast every day.',
                  note: 'Phương án quản lý thời gian và duy trì ăn sáng.'
                },
                {
                  branchName: 'GIẢM ĐỒ ĂN NHANH (BÀI TẬP 3.1)',
                  content: 'I want to break this bad habit by cutting down on fast food and sugary drinks.',
                  note: 'Trích từ bài tập 3.1 về giảm thức ăn nhanh và nước ngọt.'
                }
              ]
            },
            {
              step: 4,
              label: 'BƯỚC 4: TẦM QUAN TRỌNG (HEALTH & WELL-BEING)',
              cognitiveFunction: '4. Vì sao việc thay đổi này lại quan trọng với bạn?',
              content: "I know it won't be easy, but it is very important for my overall health and well-being.",
              bandLevel: 'Band 4.5',
              pedagogyNote: 'Khép lại bằng cụm từ học thuật nhẹ nhàng của bài: "overall health and well-being" (thể trạng và sức khỏe toàn diện).',
              flipCard: {
                frontText: 'Because health is important. (Quá ngắn)',
                backText: 'It is very important for my overall health and well-being. (Tròn trịa)',
                explanation: 'Dùng cụm "overall health and well-being" vừa vặn nâng tầm bài nói lên 4.5.'
              }
            }
          ],
          fullMosaicSummary: "I usually stay up late because of work deadlines, and I have a bad habit of skipping breakfast. I do not get enough sleep or proper nutrition, so it makes me feel exhausted all the time. I want to break this bad habit by managing my time better and ensuring that I eat breakfast every day, because it is important for my overall health and well-being."
        }
      },
      {
        stageNumber: 2,
        stageType: 'progressive_reveal',
        title: 'Chặng 2: Bạn Làm Gì Để Giữ Gìn Sức Khỏe? (How Do You Stay Healthy?)',
        pedagogicalObjective: 'Làm chủ bài tập 3.2: Sử dụng các cụm collocation tập luyện thể thao (play soccer, work out at the gym, do yoga) và cấu trúc "help me keep active / stay in shape".',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click mở từng tầng để nắm cách trả lời câu hỏi "How do you stay healthy?":',
          cards: [
            {
              step: 1,
              label: 'BƯỚC 1: MÔN THỂ THAO HOẶC HOẠT ĐỘNG CHÍNH',
              cognitiveFunction: '1. Bạn thường tập luyện môn thể thao hay bài tập nào?',
              content: 'To stay in shape, I decided to work out at the gym near my house three times a week.',
              bandLevel: 'Band 3.0 → 3.5',
              pedagogyNote: 'Luyện bài tập 3.2 câu 2: Dùng mục đích "To stay in shape" (để giữ dáng) và "work out at the gym".',
              flipCard: {
                frontText: 'I go to gym. (Cộc lốc)',
                backText: 'To stay in shape, I decided to work out at the gym near my house. (Rõ mục đích)',
                explanation: 'Mở đầu bằng cụm chỉ mục đích "To stay in shape" giúp câu nói có định hướng rõ ràng.'
              },
              vowelHighlight: [
                { word: 'shape', phonetic: '/ʃeɪp/', vowelSound: '/ʃ/ âm s cong lưỡi' },
                { word: 'exercise', phonetic: '/ˈek.sə.saɪz/', vowelSound: '/s/ âm xát' }
              ]
            },
            {
              step: 2,
              label: 'BƯỚC 2: TÁC DỤNG THỂ LỰC (KEEP ME ACTIVE)',
              cognitiveFunction: '2. Hoạt động đó giúp bạn nâng cao sức khỏe thế nào?',
              content: 'Exercising regularly helps improve my physical health and keeps me active throughout the day.',
              bandLevel: 'Band 3.5 → 4.0',
              pedagogyNote: 'Bám sát mẫu câu bài tập 3.2 câu 1: "helps improve my health and keeps me active".',
              flipCard: {
                frontText: 'It is good for health and not lazy. (Tiếng bồi)',
                backText: 'It helps improve my health and keeps me active throughout the day. (Chuẩn câu bài tập)',
                explanation: 'Dùng cụm tính từ chuẩn "keep me active" (giữ cho tôi luôn năng động).'
              }
            },
            {
              step: 3,
              label: 'BƯỚC 3: CHẾ ĐỘ DINH DƯỠNG (BALANCED DIET)',
              cognitiveFunction: '3. Ngoài tập luyện, bạn ăn uống ra sao?',
              content: 'Besides, I try to have a balanced diet, which provides necessary nutrients for my body.',
              bandLevel: 'Band 4.0 → 4.5',
              pedagogyNote: 'Luyện bài tập 3.2 câu 3: "have a balanced diet" (chế độ ăn cân bằng) và "provides nutrients for my body".',
              flipCard: {
                frontText: 'I eat good food with vitamins. (Đơn sơ)',
                backText: 'I try to have a balanced diet, which provides necessary nutrients for my body.',
                explanation: 'Học cụm từ chuẩn mực "balanced diet" (chế độ ăn uống cân bằng dinh dưỡng).'
              },
              branchOptions: [
                {
                  branchName: 'TẬP GYM & ĂN UỐNG (BÀI TẬP 3.2 CÂU 2 & 3)',
                  content: 'Besides, I try to have a balanced diet, which provides necessary nutrients for my body.',
                  note: 'Kết hợp tập gym và chế độ dinh dưỡng cân bằng.'
                },
                {
                  branchName: 'TẬP YOGA 15 PHÚT (BÀI TẬP 3.2 CÂU 4)',
                  content: 'Besides, I do yoga for 15 minutes every morning to become more flexible and reduce stress.',
                  note: 'Trích từ bài tập 3.2 câu 4 về lợi ích của yoga.'
                }
              ]
            },
            {
              step: 4,
              label: 'BƯỚC 4: KẾT QUẢ CÔNG VIỆC (WORK EFFECTIVELY)',
              cognitiveFunction: '4. Cơ thể khỏe mạnh giúp ích gì cho công việc của bạn?',
              content: 'As a result, I have enough energy to study and work effectively without feeling tired.',
              bandLevel: 'Band 4.5',
              pedagogyNote: 'Khép lại bằng hiệu quả thực tế: "work effectively without feeling tired".',
              flipCard: {
                frontText: 'So I can work good. (Sai ngữ pháp trạng từ)',
                backText: 'I have enough energy to study and work effectively. (Đúng ngữ pháp)',
                explanation: 'Dùng trạng từ "effectively" bổ nghĩa cho động từ "work" theo đúng chuẩn ngữ pháp.'
              }
            }
          ],
          fullMosaicSummary: 'To stay in shape, I decided to work out at the gym near my house three times a week. Exercising regularly helps improve my physical health and keeps me active throughout the day. Besides, I try to have a balanced diet, which provides necessary nutrients for my body, so that I have enough energy to work effectively.'
        }
      },
      {
        stageNumber: 3,
        stageType: 'progressive_reveal',
        title: 'Chặng 3: Chăm Sóc Sức Khỏe Tinh Thần (Taking Care of Mental Health)',
        pedagogicalObjective: 'Làm chủ bài tập 3.3: Học cách tự đánh giá thang điểm (Rate on a scale) và chia sẻ các hoạt động giúp giải tỏa tâm lý (thư giãn, tâm sự, nghỉ ngơi).',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click mở từng bước để học cách nói về chăm sóc sức khỏe tinh thần:',
          cards: [
            {
              step: 1,
              label: 'BƯỚC 1: TỰ CHẤM ĐIỂM THANG ĐIỂM 10',
              cognitiveFunction: '1. Bạn tự chấm sức khỏe tinh thần của mình mấy điểm trên thang 10?',
              content: 'On a scale of 0 to 10, I would give myself an 8 out of 10 for my mental health.',
              bandLevel: 'Band 3.0 → 3.5',
              pedagogyNote: 'Bám sát cấu trúc bài tập 3.3: "I will give [Name] [Score] out of 10 because...".',
              flipCard: {
                frontText: 'My mind is 8 points. (Tiếng bồi)',
                backText: 'I would give myself an 8 out of 10 for my mental health. (Chuẩn xác)',
                explanation: 'Mẫu câu chấm điểm chuẩn tiếng Anh: "give myself an 8 out of 10".'
              }
            },
            {
              step: 2,
              label: 'BƯỚC 2: CÁCH QUẢN LÝ CĂNG THẲNG (DEAL WITH STRESS)',
              cognitiveFunction: '2. Bạn thường làm gì khi gặp căng thẳng trong cuộc sống?',
              content: 'because whenever I feel overwhelmed with deadlines, I always take a short break to clear my head.',
              bandLevel: 'Band 3.5 → 4.0',
              pedagogyNote: 'Dùng cụm gần gũi: "take a short break" (nghỉ ngơi một chút) và "clear my head" (giải tỏa đầu óc).',
              flipCard: {
                frontText: 'When stress I stop work. (Cụt ý)',
                backText: 'Whenever I feel stressed, I take a short break to clear my head. (Tự nhiên)',
                explanation: 'Cụm "take a short break to clear my head" thể hiện kỹ năng tự chăm sóc bản thân.'
              }
            },
            {
              step: 3,
              label: 'BƯỚC 3: CHIA SẺ VỚI NGƯỜI THÂN (TALK TO FRIENDS)',
              cognitiveFunction: '3. Bạn có tâm sự với ai để giải tỏa áp lực không?',
              content: 'In addition, I often talk to my close friends or listen to soothing acoustic music to relax.',
              bandLevel: 'Band 4.0 → 4.5',
              pedagogyNote: 'Bổ sung giải pháp tâm lý lành mạnh: trò chuyện với bạn bè hoặc nghe nhạc êm dịu.',
              flipCard: {
                frontText: 'I talk with friend and listen music. (Đơn sơ)',
                backText: 'I often talk to my close friends or listen to soothing music to relax.',
                explanation: 'Thêm tính từ "soothing music" (nhạc êm dịu) giúp bài nói sống động hơn.'
              },
              branchOptions: [
                {
                  branchName: 'TÂM SỰ VỚI BẠN BÈ & NGHE NHẠC',
                  content: 'In addition, I often talk to my close friends or listen to soothing acoustic music to relax.',
                  note: 'Giải pháp chia sẻ cảm xúc và nghe nhạc.'
                },
                {
                  branchName: 'ĐI DẠO CÔNG VIÊN (OUTDOOR WALK)',
                  content: 'In addition, I usually take a walk in the nearby park to breathe in fresh air.',
                  note: 'Trích từ câu luyện phát âm: "breathed in the fresh air".'
                }
              ]
            },
            {
              step: 4,
              label: 'BƯỚC 4: TỔNG KẾT TƯ TƯỞNG (POSITIVE MINDSET)',
              cognitiveFunction: '4. Thái độ sống tích cực của bạn là gì?',
              content: 'I believe keeping a positive mindset is the best way to stay happy and healthy.',
              bandLevel: 'Band 4.5',
              pedagogyNote: 'Khép lại bài nói bằng nhận định dễ nhớ: "keeping a positive mindset" (giữ tinh thần tích cực).',
              flipCard: {
                frontText: 'Think good is happy. (Dịch từng chữ)',
                backText: 'Keeping a positive mindset is the best way to stay healthy. (Chuẩn tự nhiên)',
                explanation: 'Cụm "keep a positive mindset" (giữ tinh thần lạc quan) rất quen thuộc và đắt giá.'
              }
            }
          ],
          fullMosaicSummary: 'On a scale of 0 to 10, I would give myself an 8 out of 10 for my mental health, because whenever I feel overwhelmed with deadlines, I always take a short break to clear my head. In addition, I often talk to my close friends or listen to soothing music to relax. I believe keeping a positive mindset is the best way to stay happy and healthy.'
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
    subtitle: 'Cụm Giới Từ Bổ Ngữ: Lắp Ráp Cú Pháp & Phẫu Thuật Điểm Gãy',
    coreCompetency: 'Nhận diện giới từ luôn cần Danh từ làm vật neo (Object of Preposition) đúng theo bài học W5D1. Phân biệt Cụm giới từ đóng vai trò Tính từ (bổ nghĩa vị trí danh từ: "a house by the lake") và làm chủ các cụm giới từ cố định (Fixed collocations: "good at", "think of", "during the trip").',
    bridgeToHomework: {
      promptText: 'Luyện tập sử dụng cụm giới từ và sửa lỗi móc neo trong Homework W5D1.',
      targetExamId: 'exam_dreamer_w5d1'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'syntax_anatomy',
        title: 'Chặng 1: Kiến Tạo Cụm Giới Từ Định Vị Danh Từ (A House by the Peaceful Lake)',
        pedagogicalObjective: 'Bám sát ví dụ giáo trình W5D1 mục 2 câu 3: Lắp ráp câu chứa cụm giới từ chỉ nơi chốn "in a house by the peaceful lake" bổ nghĩa cho động từ và danh từ.',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Bấm quét giải phẫu để lắp ráp câu văn chứa các cụm giới từ bổ ngữ chuẩn xác:',
          mode: 'build',
          tokens: [
            { id: 't1', text: 'My mother', role: 'subject', colorClass: 'green' },
            { id: 't2', text: 'wants to live', role: 'fv_core', colorClass: 'orange' },
            { id: 't3', text: 'in a cozy house', role: 'modifier', colorClass: 'blue' },
            { id: 't4', text: 'by the peaceful lake', role: 'modifier', colorClass: 'purple' }
          ]
        }
      },
      {
        stageNumber: 2,
        stageType: 'productive_failure',
        title: 'Chặng 2: Phẫu Thuật Mâu Thuẫn Gãy Móc Neo Collocation (Good In Singing)',
        pedagogicalObjective: 'Bám sát ví dụ giáo trình W5D1 mục 2 câu 6: Đối diện với lỗi dịch thô tiếng Việt "giỏi trong việc gì" dùng nhầm giới từ "in" thay vì "at".',
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
            errorMessage: 'Xung đột khớp nối: Tính từ "good" khi đi kèm năng khiếu/kỹ năng bắt buộc phải neo bằng giới từ "at" (Collocation cố định). Dùng giới từ "in" theo cách dịch thô tiếng Việt ("giỏi trong việc hát") làm sai cấu trúc ngữ pháp!',
            repairOptions: [
              {
                id: 'opt1',
                action: 'delete',
                targetTokenId: 't3',
                resultText: 'at',
                explanation: 'Đổi giới từ "in" thành "at" để tạo thành cụm cố định chuẩn xác "good at + V-ing".'
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
    title: 'The Problems & Advice Engine (Topic: Problems & Advice)',
    subtitle: 'Nói Về Khó Khăn & Đưa Lời Khuyên: Từ Câu Cụt 3.0 Lên Bài Nói Mạch Lạc 4.0 - 4.5',
    coreCompetency: 'Chuẩn hóa đầu ra khóa Dreamer (3.0 → 4.0+): Giúp học viên làm chủ cấu trúc nói về khó khăn ("I have a hard time managing/studying...", "I get easily distracted") và bộ cấu trúc đưa lời khuyên lịch sự ("I think you should...", "My advice would be to...", "If you spend 30 minutes..., you will make progress").',
    bridgeToHomework: {
      promptText: 'Thu âm bài nói chia sẻ về một khó khăn bạn đang gặp và lời khuyên bạn dành cho bạn bè trong Homework W5D3.',
      targetExamId: 'exam_dreamer_w5d3'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'progressive_reveal',
        title: 'Chặng 1: Đưa Lời Khuyên Cho Khang Về Quản Lý Công Việc (Giving Advice to Khang)',
        pedagogicalObjective: 'Bám sát đối thoại Hân & Khang: Thấu hiểu vấn đề mất tập trung -> Khuyên dùng Google Calendar -> Khuyên tắt điện thoại và đóng tab không cần thiết.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click mở từng bước để học cách nói về khó khăn và đưa lời khuyên:',
          cards: [
            {
              step: 1,
              label: 'BƯỚC 1: NÊU KHÓ KHĂN CÔNG VIỆC (HAVE A HARD TIME)',
              cognitiveFunction: '1. Khang gặp khó khăn gì trong công việc?',
              content: "I'm having a hard time managing my workload because I get easily distracted.",
              bandLevel: 'Band 3.0 → 3.5',
              pedagogyNote: 'Mẫu câu đắt giá của Khang: "have a hard time + V-ing" và "get easily distracted" (dễ bị xao nhãng).',
              flipCard: {
                frontText: 'Work is hard and I cannot focus. (Tiếng bồi)',
                backText: "I'm having a hard time managing my workload because I get easily distracted. (Chuẩn giáo trình)",
                explanation: 'Dùng cấu trúc trọng tâm của bài: "have a hard time managing..." thay vì nói "work is hard".'
              },
              vowelHighlight: [
                { word: 'dreamed', phonetic: '/driːmd/', vowelSound: '/dr/ cụm phụ âm' },
                { word: 'bread', phonetic: '/bred/', vowelSound: '/br/ cụm phụ âm' }
              ]
            },
            {
              step: 2,
              label: 'BƯỚC 2: LỜI KHUYÊN DÙNG LỊCH (I THINK YOU SHOULD...)',
              cognitiveFunction: '2. Lời khuyên thứ nhất của bạn Hân là gì?',
              content: 'I think you should start using a planner on Google Calendar and set clear goals.',
              bandLevel: 'Band 3.5 → 4.0',
              pedagogyNote: 'Cấu trúc khuyên bảo thông dụng: "I think you should + V nguyên mẫu" (set clear goals).',
              flipCard: {
                frontText: 'You must use calendar. (Nghe gắt gỏng)',
                backText: 'I think you should start using a planner on Google Calendar. (Lịch sự, tự nhiên)',
                explanation: 'Thêm "I think you should..." giúp lời khuyên trở nên lịch sự và mang tính xây dựng.'
              }
            },
            {
              step: 3,
              label: 'BƯỚC 3: GIẢM XAO NHÃNG (LIMIT DISTRACTIONS BY...)',
              cognitiveFunction: '3. Bạn khuyên Khang làm gì để không bị phân tâm khi làm việc?',
              content: 'You should also try to limit distractions by turning off your phone while working.',
              bandLevel: 'Band 4.0 → 4.5',
              pedagogyNote: 'Luyện cụm từ trong bài: "limit distractions by turning off phone while working".',
              flipCard: {
                frontText: 'Turn off phone when work. (Cụt ý)',
                backText: 'You should try to limit distractions by turning off your phone while working.',
                explanation: 'Cấu trúc "limit distractions by + V-ing" (hạn chế xao nhãng bằng cách làm gì) rất chuẩn xác.'
              },
              branchOptions: [
                {
                  branchName: 'TẮT ĐIỆN THOẠI & ĐÓNG TAB (LỜI HÂN KHUYÊN KHANG)',
                  content: 'You should also try to limit distractions by turning off your phone and closing unnecessary tabs.',
                  note: 'Lời khuyên nguyên văn của Hân trong bài đọc.'
                },
                {
                  branchName: 'CHIA NHỎ CÔNG VIỆC (GỢI Ý BÀI TẬP 3.2)',
                  content: 'You should also break large tasks into smaller steps so that you do not feel overwhelmed.',
                  note: 'Trích từ cụm từ vựng: "break tasks into smaller steps".'
                }
              ]
            },
            {
              step: 4,
              label: 'BƯỚC 4: LỜI KHUYÊN HỌC TIẾNG ANH (SPEND 30 MINUTES)',
              cognitiveFunction: '4. Khang khuyên lại Hân điều gì để học tiếng Anh tiến bộ?',
              content: 'If you spend at least 30 minutes practicing every day, you will definitely make progress.',
              bandLevel: 'Band 4.5',
              pedagogyNote: 'Lời động viên tuyệt vời của Khang: Dùng câu điều kiện If loại 1 với cụm "make progress" (tiến bộ).',
              flipCard: {
                frontText: 'Practice English and you good. (Tiếng bồi)',
                backText: 'If you spend 30 minutes practicing every day, you will definitely make progress.',
                explanation: 'Collocation chuẩn: "make progress" (tiến bộ) đi cùng câu điều kiện đơn giản.'
              }
            }
          ],
          fullMosaicSummary: "I'm having a hard time managing my workload because I get easily distracted. I think you should start using a planner on Google Calendar and set clear goals. You should also try to limit distractions by turning off your phone while working. If you spend at least 30 minutes practicing every day, you will definitely make progress."
        }
      },
      {
        stageNumber: 2,
        stageType: 'progressive_reveal',
        title: 'Chặng 2: Xử Lý Tiếng Ồn Hàng Xóm Hát Karaoke (Dealing with Loud Neighbors)',
        pedagogicalObjective: 'Làm chủ bài tập tình huống thực tế 3.1: Miêu tả việc bị mất tập trung do hàng xóm hát karaoke to -> Đưa ra lời khuyên góp ý lịch sự.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click mở từng bước để học cách nói về vấn đề tiếng ồn hàng xóm và cách xử lý:',
          cards: [
            {
              step: 1,
              label: 'BƯỚC 1: MIÊU TẢ RẮC RỐI TIẾNG ỒN',
              cognitiveFunction: '1. Bạn đang gặp phiền toái gì tại nơi mình ở?',
              content: 'I have a hard time focusing on studying because my neighbors usually sing karaoke loudly on weekends.',
              bandLevel: 'Band 3.0 → 3.5',
              pedagogyNote: 'Nguyên văn câu ví dụ bài tập 3.1: hàng xóm hát karaoke ồn ào vào cuối tuần.',
              flipCard: {
                frontText: 'Neighbor sing karaoke very loud, I cannot study. (Tiếng bồi)',
                backText: 'I have a hard time focusing because my neighbors sing karaoke loudly. (Chuẩn mẫu câu)',
                explanation: 'Dùng cấu trúc "have a hard time focusing" (gặp khó khăn khi tập trung).'
              },
              vowelHighlight: [
                { word: 'slices', phonetic: '/slaɪsɪz/', vowelSound: '/sl/ cụm phụ âm' },
                { word: 'distracted', phonetic: '/dɪˈstræk.tɪd/', vowelSound: '/str/ cụm 3 phụ âm' }
              ]
            },
            {
              step: 2,
              label: 'BƯỚC 2: TÁC ĐỘNG TIÊU CỰC (DISTRACT ME A LOT)',
              cognitiveFunction: '2. Tiếng ồn đó làm phiền bạn như thế nào?',
              content: 'This distracts me a lot and makes it difficult for me to relax after a tiring week.',
              bandLevel: 'Band 3.5 → 4.0',
              pedagogyNote: 'Luyện từ vựng: "distracts me a lot" (làm tôi xao nhãng rất nhiều) và "makes it difficult to relax".',
              flipCard: {
                frontText: 'It make me angry and no relax. (Nói thô)',
                backText: 'This distracts me a lot and makes it difficult for me to relax. (Tự nhiên)',
                explanation: 'Động từ "distract" (làm phân tâm) là từ vựng đắc địa bám sát bài học.'
              }
            },
            {
              step: 3,
              label: 'BƯỚC 3: LỜI KHUYÊN GÓP Ý LỊCH SỰ (COMPLAIN POLITELY)',
              cognitiveFunction: '3. Bạn bè khuyên bạn nên xử lý việc này như thế nào?',
              content: 'Well, my advice would be to talk to them and complain in a very polite way.',
              bandLevel: 'Band 4.0 → 4.5',
              pedagogyNote: 'Mẫu câu đưa lời khuyên cao cấp hơn một chút: "My advice would be to + V" (complain in a polite way).',
              flipCard: {
                frontText: 'You shout at them. (Tiêu cực)',
                backText: 'My advice would be to talk to them and complain in a polite way. (Văn minh)',
                explanation: 'Dùng cụm mẫu: "My advice would be to..." và "complain in a polite way" (góp ý lịch sự).'
              },
              branchOptions: [
                {
                  branchName: 'GÓP Ý LỊCH SỰ (VÍ DỤ BÀI HỌC)',
                  content: 'Well, my advice would be to talk to them and complain in a very polite way.',
                  note: 'Cách xử lý hòa nhã bám sát Coursebook.'
                },
                {
                  branchName: 'ĐEO TAI NGHE CHỐNG ỒN (GIẢI PHÁP THỰC TẾ)',
                  content: 'Well, you can wear noise-canceling headphones or go to a quiet library to study.',
                  note: 'Giải pháp tự thích nghi đơn giản, hiệu quả.'
                }
              ]
            },
            {
              step: 4,
              label: 'BƯỚC 4: PHƯƠNG ÁN CUỐI CÙNG (IN THE WORST CASE)',
              cognitiveFunction: '4. Nếu họ vẫn không hợp tác thì giải pháp cuối cùng là gì?',
              content: 'In the worst case, if the noise continues, you might consider moving to a quieter area.',
              bandLevel: 'Band 4.5',
              pedagogyNote: 'Trích từ câu ví dụ trong sách: "Or in the worst case, I think you should move...".',
              flipCard: {
                frontText: 'If not, you move house. (Cộc lốc)',
                backText: 'In the worst case, you might consider moving to a quieter area. (Mềm mỏng)',
                explanation: 'Cụm "in the worst case" (trong trường hợp xấu nhất) giúp câu nói logic và đa chiều.'
              }
            }
          ],
          fullMosaicSummary: 'I have a hard time focusing on studying because my neighbors usually sing karaoke loudly on weekends. This distracts me a lot and makes it difficult for me to relax. Well, my advice would be to talk to them and complain in a very polite way, or in the worst case, consider moving to a quieter place.'
        }
      },
      {
        stageNumber: 3,
        stageType: 'progressive_reveal',
        title: 'Chặng 3: Tự Đánh Giá Bản Thân & Đặt Mục Tiêu (Self-Reflection - Bài tập 3.2)',
        pedagogicalObjective: 'Làm chủ bài tập 3.2: Tự nhìn nhận điểm cần cải thiện trong học tập/công việc -> Lập kế hoạch hành động cụ thể bằng cách chia nhỏ mục tiêu.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click mở từng bước để học cách nói tự phản tỉnh và đặt mục tiêu thay đổi bản thân:',
          cards: [
            {
              step: 1,
              label: 'BƯỚC 1: NHẬN DIỆN MẶT CẦN CẢI THIỆN',
              cognitiveFunction: '1. Bạn thấy khía cạnh nào trong cuộc sống mình cần cải thiện nhất?',
              content: 'Reflecting on my daily routine, I think I need to improve my time management skills.',
              bandLevel: 'Band 3.0 → 3.5',
              pedagogyNote: 'Bám sát gợi ý bài tập 3.2: "I think I should do something by..." cho chủ đề công việc/học tập.',
              flipCard: {
                frontText: 'I am not good at time. (Tiếng bồi)',
                backText: 'I think I need to improve my time management skills. (Chuẩn tự nhiên)',
                explanation: 'Dùng cụm từ "time management skills" (kỹ năng quản lý thời gian) đúng ngữ cảnh.'
              }
            },
            {
              step: 2,
              label: 'BƯỚC 2: PHƯƠNG PHÁP CỤ THỂ (SET GOALS & SCHEDULE)',
              cognitiveFunction: '2. Bạn sẽ cải thiện việc đó bằng những bước nào?',
              content: 'I think I should do this by setting clear goals and creating a daily study schedule.',
              bandLevel: 'Band 3.5 → 4.0',
              pedagogyNote: 'Áp dụng bộ từ vựng gợi ý của bài tập 3.2: "set goals" và "create a schedule".',
              flipCard: {
                frontText: 'I make a timetable. (Đơn sơ)',
                backText: 'I should do this by setting goals and creating a daily study schedule. (Chuẩn bài tập)',
                explanation: 'Cấu trúc "do something by + V-ing" kết hợp với các collocation trong sách.'
              }
            },
            {
              step: 3,
              label: 'BƯỚC 3: CHIA NHỎ NHIỆM VỤ (BREAK TASKS INTO SMALLER STEPS)',
              cognitiveFunction: '3. Bí quyết để không bị ngợp trước các bài tập lớn là gì?',
              content: 'Also, breaking big projects into smaller steps will help me finish them without feeling stressed.',
              bandLevel: 'Band 4.0 → 4.5',
              pedagogyNote: 'Bám sát cụm từ vựng đắt giá của giáo trình: "break tasks into smaller steps".',
              flipCard: {
                frontText: 'Do small work first. (Tiếng bồi)',
                backText: 'Breaking big tasks into smaller steps helps me finish them without stress. (Rất tự nhiên)',
                explanation: 'Cụm từ "break tasks into smaller steps" là kỹ năng quản lý công việc chuẩn quốc tế.'
              },
              branchOptions: [
                {
                  branchName: 'QUẢN LÝ THỜI GIAN & CHIA NHỎ BÀI HỌC',
                  content: 'Also, breaking big projects into smaller steps will help me finish them without feeling stressed.',
                  note: 'Phương pháp quản lý học tập gợi ý trong bài.'
                },
                {
                  branchName: 'SẮP XẾP LẠI GÓC HỌC TẬP (REARRANGE FURNITURE)',
                  content: 'Also, I would like to redecorate and rearrange my room to create a more inspiring study space.',
                  note: 'Trích từ từ vựng khía cạnh nhà ở: "redecorate, rearrange furniture".'
                }
              ]
            },
            {
              step: 4,
              label: 'BƯỚC 4: KỲ VỌNG THAY ĐỔI (BECOME MORE PRODUCTIVE)',
              cognitiveFunction: '4. Kết quả mong đợi sau khi áp dụng những thay đổi này là gì?',
              content: 'If I can stay persistent with this routine, I will definitely become much more productive.',
              bandLevel: 'Band 4.5',
              pedagogyNote: 'Khép lại bằng từ vựng của bài: "stay persistent" (kiên trì) và "become more productive" (làm việc năng suất hơn).',
              flipCard: {
                frontText: 'Then I work very fast and good. (Diễn đạt thô)',
                backText: 'If I stay persistent, I will definitely become much more productive. (Nâng tầm +0.5)',
                explanation: 'Học từ vựng nâng cao nhẹ nhàng "productive" (năng suất) rất phù hợp đầu ra 4.0 - 4.5.'
              }
            }
          ],
          fullMosaicSummary: 'Reflecting on my daily routine, I think I need to improve my time management skills. I think I should do this by setting clear goals and creating a daily study schedule. Also, breaking big tasks into smaller steps will help me avoid stress, and if I stay persistent, I will definitely become much more productive.'
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
    subtitle: 'Mệnh Đề Quan Hệ: Lắp Ráp Cú Pháp & Phẫu Thuật Điểm Gãy',
    coreCompetency: 'Nhận diện Relative Pronoun (who, which, that) vừa làm liên từ kết nối vừa nuốt chửng danh từ lặp lại đúng theo "Quy tắc số 1" của giáo trình W6D1. Chấm dứt lỗi kinh điển Band 3.0: Dùng đại từ quan hệ nhưng vẫn để lại đại từ thừa ("that you recommended it").',
    bridgeToHomework: {
      promptText: 'Thực hành nối câu bằng Mệnh đề tính từ trong Homework W6D1.',
      targetExamId: 'exam_dreamer_w6d1'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'syntax_anatomy',
        title: 'Chặng 1: Kiến Tạo Cầu Nối Mệnh Đề Quan Hệ (Peter Bought an Apartment Which Overlooks the Park)',
        pedagogicalObjective: 'Bám sát ví dụ giáo trình W6D1 phần 1: Lắp ráp câu ghép có Mệnh đề tính từ bổ nghĩa cho danh từ vật đứng trước.',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Bấm quét giải phẫu để lắp ráp cầu nối Mệnh đề quan hệ WHICH bổ nghĩa danh từ:',
          mode: 'build',
          tokens: [
            { id: 't1', text: 'Peter bought', role: 'subject', colorClass: 'green' },
            { id: 't2', text: 'a modern apartment', role: 'object', colorClass: 'blue' },
            { id: 't3', text: 'which', role: 'connector', colorClass: 'orange' },
            { id: 't4', text: 'overlooks the green park', role: 'fv_core', colorClass: 'purple' }
          ]
        }
      },
      {
        stageNumber: 2,
        stageType: 'productive_failure',
        title: 'Chặng 2: Phẫu Thuật Mâu Thuẫn Thừa Đại Từ Lặp Lại (That You Recommended It)',
        pedagogicalObjective: 'Bám sát "Quy tắc số 1" của giáo trình: Phẫu thuật xung đột thừa 2 tân ngữ tranh chấp một vị trí khi học viên giữ lại đại từ "it".',
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
            errorMessage: 'Lỗi thừa đại từ lặp: Đại từ quan hệ "that" đã đại diện trọn vẹn cho danh từ "the book" để làm tân ngữ của "recommended". Việc giữ lại "it" khiến câu bị xung đột 2 tân ngữ cùng tranh vị trí!',
            repairOptions: [
              {
                id: 'opt1',
                action: 'delete',
                targetTokenId: 't4',
                resultText: '',
                explanation: 'Gọt bỏ đại từ thừa "it" để "that" kết nối trực tiếp tân ngữ vào mệnh đề chính.'
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
    subtitle: 'Truy Vết Toàn Bộ 7 Bẫy Nhận Thức Lịch Sử Facebook',
    coreCompetency: 'Đối chiếu trật tự các sự kiện trong bài đọc lịch sử công nghệ (Facemash -> Thefacebook -> Facebook) để phát hiện bẫy tráo thủ phạm (ai hack), bẫy đối tượng sử dụng ban đầu (Harvard outsiders) và bẫy kiện tụng cổ phần.',
    bridgeToHomework: {
      promptText: 'Làm bài đọc hiểu về lịch sử hình thành Facebook trong Homework W6D2.',
      targetExamId: 'exam_dreamer_w6d2'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'verification_scale',
        title: 'Câu 1 (T/F/NG): Bẫy Suy Diễn Độ Phổ Biến (Facemash popular among Harvard?)',
        pedagogicalObjective: 'Quét Đoạn 1 & 2 để kiểm tra xem có thông tin nào khẳng định Facemash rất được ưa chuộng không.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Bấm Radar quét sự ra đời và đóng cửa của Facemash trong Đoạn 1 & 2:',
          passageContext: {
            title: 'The History of Facebook and How It Was Invented',
            paragraphs: [
              {
                id: 'p1',
                label: 'Đoạn 1 · Vụ hack ảnh sinh viên cho trang Facemash',
                text: 'It all began in 2003, when Zuckerberg, a second-year student at Harvard, wrote the software for a website called Facemash. He put his computer science skills to questionable use by hacking into Harvard\'s security network, where he copied the student ID images used by the dormitories and used them to populate his new website.'
              },
              {
                id: 'p2',
                label: 'Đoạn 2 · Đóng cửa và nguy cơ bị đuổi học',
                text: 'Facemash opened on October 28, 2003—and closed a few days later, after it was shut down by Harvard execs. In the aftermath, Zuckerberg faced serious charges of breach of security, violating copyrights, and violating individual privacy.'
              }
            ],
            targetParagraphId: 'p2',
            targetSnippet: 'Facemash opened on October 28, 2003—and closed a few days later, after it was shut down'
          },
          statement: {
            rawText: '1. Facemash was very popular among Harvard students.',
            deconstructedVariables: [
              { name: 'subject', text: 'Facemash' },
              { name: 'popularity_claim', text: 'was very popular among Harvard students', isTrapWord: true }
            ]
          },
          passageEvidence: {
            rawText: 'Bài đọc chỉ cho biết trang mở ngày 28/10/2003 và bị ban giám hiệu đóng cửa vài ngày sau đó do vi phạm bảo mật và bản quyền. Tuyệt nhiên không có số liệu hay kết luận nào về mức độ ưa chuộng ("very popular") của sinh viên đối với Facemash.',
            targetVariables: [
              { matchingName: 'popularity_claim', text: 'KHÔNG CÓ DỮ LIỆU VỀ ĐỘ PHỔ BIẾN CỦA FACEMASH' }
            ]
          },
          expectedRelation: 'no_evidence',
          verdict: 'NOT GIVEN',
          pedagogicalInsight: 'NOT GIVEN! Bài đọc chỉ nêu Facemash tồn tại được vài ngày rồi bị đình chỉ vì xâm nhập bảo mật, hoàn toàn không có thông tin nói rằng trang này rất được sinh viên ưa chuộng ("very popular"). Học sinh thường nhầm với TheFacebook ở Đoạn 5 vốn mới thực sự là "extremely popular".'
        }
      },
      {
        stageNumber: 2,
        stageType: 'verification_scale',
        title: 'Câu 2 (T/F/NG): Bẫy Tráo Thủ Phạm Hành Động (who hacked who?)',
        pedagogicalObjective: 'Phát hiện sự đảo ngược vai trò: Mark hack mạng bảo mật Harvard, chứ ban giám hiệu KHÔNG hack để tắt trang.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Bấm Radar quét hành động đóng cửa Facemash của ban giám hiệu Harvard ở Đoạn 2:',
          passageContext: {
            title: 'The History of Facebook and How It Was Invented',
            paragraphs: [
              {
                id: 'p1',
                label: 'Đoạn 1 · Mark hack mạng an ninh',
                text: 'He put his computer science skills to questionable use by hacking into Harvard\'s security network.'
              },
              {
                id: 'p2',
                label: 'Đoạn 2 · Hành động của ban giám hiệu',
                text: 'Facemash opened on October 28, 2003—and closed a few days later, after it was shut down by Harvard execs. In the aftermath, Zuckerberg faced serious charges of breach of security.'
              }
            ],
            targetParagraphId: 'p2',
            targetSnippet: 'after it was shut down by Harvard execs'
          },
          statement: {
            rawText: '2. Harvard executives shut Facemash down by hacking into it.',
            deconstructedVariables: [
              { name: 'actor', text: 'Harvard executives' },
              { name: 'action', text: 'shut Facemash down' },
              { name: 'method', text: 'by hacking into it', isTrapWord: true }
            ]
          },
          passageEvidence: {
            rawText: 'Facemash ... was shut down by Harvard execs. Người thực hiện hành vi hack là Mark Zuckerberg (hacking into Harvard\'s security network), chứ ban giám hiệu chỉ ra lệnh đình chỉ hoạt động chứ không hề hack vào Facemash.',
            targetVariables: [
              { matchingName: 'method', text: 'Ban giám hiệu chỉ đóng cửa (shut down), người "hack" là Mark' }
            ]
          },
          expectedRelation: 'contradiction',
          verdict: 'FALSE',
          pedagogicalInsight: 'FALSE vì ban giám hiệu Harvard chỉ ra lệnh đóng cửa trang web bằng quyền quản trị ("shut down by Harvard execs"), chứ không phải dùng hành vi tấn công mạng ("by hacking into it")!'
        }
      },
      {
        stageNumber: 3,
        stageType: 'verification_scale',
        title: 'Câu 3 (T/F/NG): Khớp Ý Phủ Định Kép (only to Harvard = not for outsiders)',
        pedagogicalObjective: 'Đối chiếu mệnh đề tương đương: "made available only to Harvard students" đồng nghĩa "not available for outsiders".',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Bấm Radar quét phạm vi người dùng ban đầu của thefacebook.com ở Đoạn 4:',
          passageContext: {
            title: 'The History of Facebook and How It Was Invented',
            paragraphs: [
              {
                id: 'p4',
                label: 'Đoạn 4 · Phiên bản đầu tiên thefacebook.com',
                text: 'On February 4 2004, the first version of Facebook was born, known as thefacebook.com and made available only to Harvard students.'
              }
            ],
            targetParagraphId: 'p4',
            targetSnippet: 'made available only to Harvard students'
          },
          statement: {
            rawText: '3. Thefacebook.com was initially not available for Harvard outsiders.',
            deconstructedVariables: [
              { name: 'subject', text: 'Thefacebook.com' },
              { name: 'time_scope', text: 'initially' },
              { name: 'availability', text: 'not available for Harvard outsiders (không mở cho người ngoài Harvard)' }
            ]
          },
          passageEvidence: {
            rawText: 'the first version of Facebook was born, known as thefacebook.com and made available only to Harvard students.',
            targetVariables: [
              { matchingName: 'availability', text: 'made available only to Harvard students (chỉ dành riêng cho sinh viên Harvard)' }
            ]
          },
          expectedRelation: 'match',
          verdict: 'TRUE',
          pedagogicalInsight: 'TRUE! Cụm từ "made available only to Harvard students" (chỉ dành riêng cho sinh viên Harvard) đồng nghĩa 100% với việc "không dành cho người bên ngoài Harvard" (not available for Harvard outsiders).'
        }
      },
      {
        stageNumber: 4,
        stageType: 'verification_scale',
        title: 'Câu 4 (T/F/NG): Bẫy Tuyên Bố Tranh Chấp (stolen idea vs unproven accusation)',
        pedagogicalObjective: 'Bóc trần sự khác nhau giữa lời cáo buộc (allegations) và sự thật lịch sử chưa được chứng minh.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Bấm Radar quét sự việc tranh chấp ý tưởng của anh em Winklevoss ở Đoạn 4:',
          passageContext: {
            title: 'The History of Facebook and How It Was Invented',
            paragraphs: [
              {
                id: 'p4',
                label: 'Đoạn 4 · Tranh chấp và thỏa thuận 1.2 triệu cổ phiếu',
                text: 'However, the truth about how Facebook came about isn\'t completely clear. Six days after "TheFacebook" went online by Zuckerberg and his co-founders, they faced accusations by Cameron and Tyler Winklevoss and Divya Narendra that the idea for the site had been stolen from them.'
              }
            ],
            targetParagraphId: 'p4',
            targetSnippet: 'faced accusations ... that the idea for the site had been stolen from them'
          },
          statement: {
            rawText: '4. Mark got the idea for Thefacebook from Cameron and Tyler Winklevoss and Divya Narendra.',
            deconstructedVariables: [
              { name: 'claim', text: 'Mark got the idea from Cameron and Tyler Winklevoss', isTrapWord: true }
            ]
          },
          passageEvidence: {
            rawText: 'Bài đọc chỉ ghi rõ: "the truth about how Facebook came about isn\'t completely clear" (sự thật về việc Facebook ra đời như thế nào là không hoàn toàn rõ ràng) và Mark chỉ đối mặt với "lời cáo buộc" (faced accusations) chứ tác giả không hề khẳng định Mark lấy ý tưởng từ họ.',
            targetVariables: [
              { matchingName: 'claim', text: 'sự thật không rõ ràng (truth isn\'t completely clear), chỉ là cáo buộc' }
            ]
          },
          expectedRelation: 'no_evidence',
          verdict: 'NOT GIVEN',
          pedagogicalInsight: 'NOT GIVEN vì bài đọc nêu rõ "sự thật không hoàn toàn sáng tỏ" và đó chỉ là lời cáo buộc của đối phương ("faced accusations"), chứ bài viết không hề khẳng định liệu Mark có thực sự lấy ý tưởng từ họ hay không!'
        }
      },
      {
        stageNumber: 5,
        stageType: 'verification_scale',
        title: 'Câu 5 (T/F/NG): Bẫy Mở Rộng Hệ Thống (expand to other colleges vs create own versions)',
        pedagogicalObjective: 'Phân biệt giữa việc chính Facebook mở rộng sang các trường khác với việc các trường tự tạo bản sao riêng.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Bấm Radar quét quá trình mở rộng sang các trường đại học khác ở Đoạn 5:',
          passageContext: {
            title: 'The History of Facebook and How It Was Invented',
            paragraphs: [
              {
                id: 'p5',
                label: 'Đoạn 5 · Mở rộng sang Stanford, Yale và Columbia',
                text: 'Facebook was extremely popular with Harvard students when it was first launched, so much so that the site was soon also made available to students at Stanford, Yale and Columbia before expanding to numerous other colleges.'
              }
            ],
            targetParagraphId: 'p5',
            targetSnippet: 'the site was soon also made available to students at Stanford, Yale and Columbia'
          },
          statement: {
            rawText: '5. Because of the success of Facebook, other universities created their own version of Facebook.',
            deconstructedVariables: [
              { name: 'action', text: 'other universities created their own version of Facebook', isTrapWord: true }
            ]
          },
          passageEvidence: {
            rawText: 'the site was soon also made available to students at Stanford, Yale and Columbia before expanding to numerous other colleges. Chính nền tảng TheFacebook mở rộng quyền truy cập sang các trường khác, chứ các trường đó KHÔNG hề tự tạo phiên bản riêng của họ.',
            targetVariables: [
              { matchingName: 'action', text: 'TheFacebook mở rộng mạng lưới, không phải các trường tự tạo bản sao' }
            ]
          },
          expectedRelation: 'contradiction',
          verdict: 'FALSE',
          pedagogicalInsight: 'FALSE vì bài đọc nêu rõ hệ thống TheFacebook được mở rộng sang cho sinh viên Stanford, Yale, Columbia sử dụng ("made available to students..."), mâu thuẫn với việc các trường này tự lập phiên bản riêng ("created their own version").'
        }
      },
      {
        stageNumber: 6,
        stageType: 'verification_scale',
        title: 'Câu 6 (T/F/NG): Khớp Ý Giới Hạn Độ Tuổi (at least 13 years old = teenagers and adults)',
        pedagogicalObjective: 'Đối chiếu chính sách người dùng từ 13 tuổi trở lên tương đương độ tuổi thanh thiếu niên và người lớn.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Bấm Radar quét chính sách độ tuổi của Facebook mở rộng năm 2006 ở Đoạn 7:',
          passageContext: {
            title: 'The History of Facebook and How It Was Invented',
            paragraphs: [
              {
                id: 'p7',
                label: 'Đoạn 7 · Chính sách mở cửa toàn cầu năm 2006',
                text: 'In September of 2006, Facebook announced that anyone who was at least 13 years old and had a valid email address could join.'
              }
            ],
            targetParagraphId: 'p7',
            targetSnippet: 'anyone who was at least 13 years old and had a valid email address could join'
          },
          statement: {
            rawText: '6. According to Facebook\'s policy, only teenagers and adults can use Facebook.',
            deconstructedVariables: [
              { name: 'policy', text: 'According to Facebook\'s policy' },
              { name: 'eligible_users', text: 'only teenagers and adults can use Facebook' }
            ]
          },
          passageEvidence: {
            rawText: 'anyone who was at least 13 years old and had a valid email address could join.',
            targetVariables: [
              { matchingName: 'eligible_users', text: 'at least 13 years old (từ 13 tuổi trở lên = lứa tuổi teen và người lớn, loại trừ trẻ em dưới 13 tuổi)' }
            ]
          },
          expectedRelation: 'match',
          verdict: 'TRUE',
          pedagogicalInsight: 'TRUE! Chính sách quy định người dùng phải từ đủ 13 tuổi trở lên ("at least 13 years old"), điều này đồng nghĩa chỉ có thanh thiếu niên (teenagers) và người lớn (adults) mới đủ điều kiện tham gia.'
        }
      },
      {
        stageNumber: 7,
        stageType: 'verification_scale',
        title: 'Câu 7 (T/F/NG): Khớp Ý Tỷ Lệ Đóng Góp Từ Thiện (99% = most of their shares)',
        pedagogicalObjective: 'Đối chiếu con số cụ thể 99% cổ phần tương ứng với khái niệm phần lớn ("most of their shares").',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Bấm Radar quét cam kết từ thiện của gia đình Zuckerberg ở Đoạn cuối:',
          passageContext: {
            title: 'The History of Facebook and How It Was Invented',
            paragraphs: [
              {
                id: 'p8',
                label: 'Đoạn 8 · Cam kết của quỹ Chan Zuckerberg Initiative',
                text: 'Zuckerberg and his wife, Priscilla Chan, have announced that they would contribute 99% of their Facebook shares to the Chan Zuckerberg Initiative to improve lives through education, health, scientific research, and energy.'
              }
            ],
            targetParagraphId: 'p8',
            targetSnippet: 'they would contribute 99% of their Facebook shares to the Chan Zuckerberg Initiative'
          },
          statement: {
            rawText: '7. The Zuckerberg family will donate most of their shares in Facebook to charity.',
            deconstructedVariables: [
              { name: 'benefactor', text: 'The Zuckerberg family' },
              { name: 'charity_amount', text: 'donate most of their shares in Facebook to charity' }
            ]
          },
          passageEvidence: {
            rawText: 'they would contribute 99% of their Facebook shares to the Chan Zuckerberg Initiative to improve lives.',
            targetVariables: [
              { matchingName: 'charity_amount', text: 'contribute 99% of their Facebook shares (99% cổ phần = hầu hết cổ phần)' }
            ]
          },
          expectedRelation: 'match',
          verdict: 'TRUE',
          pedagogicalInsight: 'TRUE! Hai vợ chồng Zuckerberg cam kết đóng góp tới 99% cổ phần Facebook ("contribute 99% of their shares"), con số 99% hoàn toàn khớp với cụm "most of their shares" (phần lớn cổ phần) của đề bài.'
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
    title: 'The Travel Experience & Past Trip Engine (Topic: Travel)',
    subtitle: 'Nói Về Sở Thích & Chuyến Du Lịch Đáng Nhớ: Từ Câu Cụt 3.0 Lên Bài Nói 4.0 - 4.5',
    coreCompetency: 'Chuẩn hóa đầu ra khóa Dreamer (3.0 → 4.0+): Học viên thành thạo phát âm đuôi -ed (/t/, /d/, /ɪd/), biết cách kể về chuyến đi trong quá khứ ("Recently I visited...", "I tasted...", "I traveled by... for [time]"), và so sánh phương tiện đi lại (máy bay, tàu hỏa, xe máy) đúng như Coursebook.',
    bridgeToHomework: {
      promptText: 'Luyện tập phát âm đuôi -ed và thu âm bài nói kể về chuyến du lịch gần đây của bạn trong Homework W6D3.',
      targetExamId: 'exam_dreamer_w6d3'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'progressive_reveal',
        title: 'Chặng 1: Thói Quen Du Lịch & Phương Tiện Di Chuyển (An & Nam Dialogue)',
        pedagogicalObjective: 'Bám sát đối thoại An & Nam: Lợi ích du lịch -> Gu trải nghiệm (cảnh tự nhiên vs món ăn địa phương) -> Phương tiện di chuyển (tàu hỏa / xe máy vs máy bay / ô tô).',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click mở từng bước để học cách nói về thói quen du lịch:',
          cards: [
            {
              step: 1,
              label: 'BƯỚC 1: SỞ THÍCH VÀ LÝ DO ĐI DU LỊCH',
              cognitiveFunction: '1. Bạn có thích đi du lịch không và vì sao?',
              content: 'Traveling is one of my favorite things to do because it helps me get away from work and relax.',
              bandLevel: 'Band 3.0 → 3.5',
              pedagogyNote: 'Bám sát câu thoại của Nam: "Traveling is one of my favorite things to do" và cụm "get away from work and relax".',
              flipCard: {
                frontText: 'I like travel because fun. (Nói cộc lốc)',
                backText: 'Traveling is one of my favorite things to do to get away from work. (Chuẩn giáo trình)',
                explanation: 'Dùng cụm "one of my favorite things to do" và "get away from work" (tạm rời xa công việc).'
              },
              vowelHighlight: [
                { word: 'watched', phonetic: '/wɒtʃt/', vowelSound: '/t/ âm ed đuôi không rung' },
                { word: 'played', phonetic: '/pleɪd/', vowelSound: '/d/ âm ed đuôi rung' }
              ]
            },
            {
              step: 2,
              label: 'BƯỚC 2: GU TRẢI NGHIỆM ĐỊA ĐIỂM (PREFER LESSER-KNOWN)',
              cognitiveFunction: '2. Bạn thích đến những nơi như thế nào khi đi chơi?',
              content: 'I am not a fan of crowded tourist attractions; instead, I prefer exploring destinations with natural landscapes.',
              bandLevel: 'Band 3.5 → 4.0',
              pedagogyNote: 'Mẫu câu đắt giá của bạn An: "I am not a fan of tourist attractions; instead, I prefer natural landscapes".',
              flipCard: {
                frontText: 'I hate crowded place. (Đơn sơ)',
                backText: 'I prefer exploring lesser-known destinations with natural landscapes. (Nâng cấp +0.5)',
                explanation: 'Học cụm từ hay trong bài: "natural landscapes" (cảnh quan thiên nhiên) và "lesser-known" (ít người biết).'
              }
            },
            {
              step: 3,
              label: 'BƯỚC 3: PHƯƠNG TIỆN DI CHUYỂN (TRAVEL BY...)',
              cognitiveFunction: '3. Bạn thường di chuyển bằng phương tiện gì và vì sao?',
              content: 'Plane tickets are quite expensive, so I prefer to travel by train, and then rent a motorbike to enjoy the views.',
              bandLevel: 'Band 4.0 → 4.5',
              pedagogyNote: 'Luyện cấu trúc bài học: "travel by + [phương tiện] for + [thời gian]" và lý do thuê xe máy ngắm cảnh.',
              flipCard: {
                frontText: 'I go train then drive motorbike. (Tiếng bồi)',
                backText: 'I prefer to travel by train, and then rent a motorbike to enjoy the views. (Tự nhiên)',
                explanation: 'Dùng cấu trúc "travel by train" và "rent a motorbike" bám sát lời bạn An.'
              },
              branchOptions: [
                {
                  branchName: 'ĐI TÀU HỎA & XE MÁY (BẠN AN)',
                  content: 'Plane tickets are quite expensive, so I prefer to travel by train, and rent a motorbike to enjoy views.',
                  note: 'Phương án tiết kiệm chi phí và ngắm cảnh thong thả.'
                },
                {
                  branchName: 'ĐI MÁY BAY & Ô TÔ (BẠN NAM)',
                  content: 'I personally prefer to travel by plane because it is fast and convenient for longer distances.',
                  note: 'Phương án của Nam: đi máy bay nhanh chóng, tiện lợi cho đường dài.'
                }
              ]
            },
            {
              step: 4,
              label: 'BƯỚC 4: THƯỞNG THỨC ĐẶC SẢN (LOCAL FOOD)',
              cognitiveFunction: '4. Bạn thích trải nghiệm ẩm thực địa phương như thế nào?',
              content: 'Whenever I arrive at a new place, I always love tasting authentic local food with my friends.',
              bandLevel: 'Band 4.5',
              pedagogyNote: 'Bám sát sở thích của bạn Nam: "love trying out local food" (như món Cao Lầu ở Đà Nẵng).',
              flipCard: {
                frontText: 'I eat food of that city. (Dịch từng chữ)',
                backText: 'I love tasting authentic local food with my friends. (Chuẩn tự nhiên)',
                explanation: 'Dùng cụm từ quen thuộc "local food" (đặc sản địa phương) để làm phong phú bài nói.'
              }
            }
          ],
          fullMosaicSummary: 'Traveling is one of my favorite things to do because it helps me get away from work and relax. I am not a fan of crowded tourist attractions; instead, I prefer exploring destinations with natural landscapes. Plane tickets are expensive, so I prefer to travel by train and rent a motorbike, and I always love tasting authentic local food with friends.'
        }
      },
      {
        stageNumber: 2,
        stageType: 'progressive_reveal',
        title: 'Chặng 2: Kể Về Chuyến Đi Đáng Nhớ Trong Quá Khứ (Sharing Your Previous Trip)',
        pedagogicalObjective: 'Làm chủ bài tập 3.2 & Phát âm đuôi -ed: Kể về chuyến đi bằng thì Quá khứ đơn (visited, traveled, tasted, walked, cooked).',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click mở từng bước để học cách kể về chuyến đi trong quá khứ với phát âm đuôi -ed chuẩn xác:',
          cards: [
            {
              step: 1,
              label: 'BƯỚC 1: ĐIỂM ĐẾN VÀ THỜI GIAN (VISITED)',
              cognitiveFunction: '1. Bạn đã đi du lịch ở đâu và đi vào lúc nào?',
              content: 'Last summer, I visited Da Nang city with my family for four wonderful days.',
              bandLevel: 'Band 3.0 → 3.5',
              pedagogyNote: 'Phát âm đuôi -ed chuẩn cho từ "visited" (/ˈvɪz.ɪ.tɪd/ - đuôi /ɪd/). Khởi đầu rõ thời gian và địa điểm.',
              flipCard: {
                frontText: 'Last year I go Da Nang. (Sai thì hiện tại)',
                backText: 'Last summer, I visited Da Nang city with my family. (Đúng thì quá khứ đơn)',
                explanation: 'Chuyện đã xảy ra phải dùng Quá khứ đơn: "visited" thay vì "go".'
              },
              vowelHighlight: [
                { word: 'visited', phonetic: '/ˈvɪz.ɪ.tɪd/', vowelSound: '/ɪd/ âm ed sau t/d' },
                { word: 'exhausted', phonetic: '/ɪɡˈzɔː.stɪd/', vowelSound: '/ɪd/ âm ed sau t/d' }
              ]
            },
            {
              step: 2,
              label: 'BƯỚC 2: PHƯƠNG TIỆN & HÀNH TRÌNH (TRAVELED BY...)',
              cognitiveFunction: '2. Bạn đã di chuyển đến đó bằng phương tiện gì?',
              content: 'We traveled by plane from Ho Chi Minh City, which took only about one hour and twenty minutes.',
              bandLevel: 'Band 3.5 → 4.0',
              pedagogyNote: 'Áp dụng công thức bài học: "traveled by plane" và cấu trúc quá khứ "it took about [time]".',
              flipCard: {
                frontText: 'We go plane 1 hour. (Tiếng bồi)',
                backText: 'We traveled by plane, which took only about one hour and twenty minutes. (Mạch lạc)',
                explanation: 'Từ "traveled" phát âm đuôi /d/, kết hợp mệnh đề "which took..." rất tự nhiên.'
              }
            },
            {
              step: 3,
              label: 'BƯỚC 3: CÁC HOẠT ĐỘNG ĐÃ LÀM (WALKED & TASTED)',
              cognitiveFunction: '3. Bạn đã đi ngắm cảnh và thưởng thức món gì tại đó?',
              content: 'During the trip, we walked along My Khe beach and tasted delicious local dishes like Cao Lau and seafood.',
              bandLevel: 'Band 4.0 → 4.5',
              pedagogyNote: 'Luyện 2 động từ có đuôi -ed: "walked" (/wɔːkt/ - đuôi /t/) và "tasted" (/ˈteɪ.stɪd/ - đuôi /ɪd/). Nhắc món Cao Lầu đúng sách.',
              flipCard: {
                frontText: 'We walk on beach and eat Cao Lau. (Quên chia thì quá khứ)',
                backText: 'We walked along the beach and tasted delicious dishes like Cao Lau. (Chuẩn ngữ pháp)',
                explanation: 'Lưu ý phát âm đuôi -ed: "walked" kết thúc bằng âm /t/, "tasted" kết thúc bằng âm /ɪd/.'
              },
              branchOptions: [
                {
                  branchName: 'TẮM BIỂN & ĂN CAO LẦU (ĐÀ NẴNG - TRONG SÁCH)',
                  content: 'During the trip, we walked along My Khe beach and tasted delicious local dishes like Cao Lau.',
                  note: 'Chuyến đi biển Đà Nẵng bám sát ví dụ của Nam.'
                },
                {
                  branchName: 'THAM QUAN BẢO TÀNG & DI TÍCH (HÀ NỘI / HUẾ)',
                  content: 'During the trip, we visited historic temples and cooked traditional meals together in the evening.',
                  note: 'Trích từ câu hỏi thực hành 1.2: "visited a museum, cooked a meal".'
                }
              ]
            },
            {
              step: 4,
              label: 'BƯỚC 4: KỶ NIỆM ĐỌNG LẠI (MEMORABLE EXPERIENCE)',
              cognitiveFunction: '4. Chuyến đi đó để lại cho bạn cảm xúc gì?',
              content: 'It was truly a memorable vacation because it helped us connect and create wonderful memories together.',
              bandLevel: 'Band 4.5',
              pedagogyNote: 'Khép lại bằng cụm từ bài học: "connect with family" và "memorable vacation" (kỳ nghỉ đáng nhớ).',
              flipCard: {
                frontText: 'It is very happy trip. (Từ vựng trẻ con)',
                backText: 'It was truly a memorable vacation because we created wonderful memories. (Nâng tầm +0.5)',
                explanation: 'Dùng cụm "memorable vacation" và động từ thì quá khứ "created wonderful memories".'
              }
            }
          ],
          fullMosaicSummary: 'Last summer, I visited Da Nang city with my family for four wonderful days. We traveled by plane from Ho Chi Minh City, which took only about an hour. During the trip, we walked along My Khe beach and tasted delicious local dishes like Cao Lau. It was truly a memorable vacation because it helped us create wonderful memories together.'
        }
      },
      {
        stageNumber: 3,
        stageType: 'progressive_reveal',
        title: 'Chặng 3: Thuyết Trình Kế Hoạch Tour 1 Ngày (Role-Play: 1-Day Tour Pitching)',
        pedagogicalObjective: 'Làm chủ bài tập nhóm 3.3: Đóng vai nhân viên công ty du lịch chào mời khách tour 1 ngày -> Điểm đến -> Hoạt động sáng/chiều -> Lời mời chốt tour.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click mở từng bước để học cách thuyết trình giới thiệu lịch trình tour 1 ngày:',
          cards: [
            {
              step: 1,
              label: 'BƯỚC 1: LỜI CHÀO & GIỚI THIỆU CÔNG TY DU LỊCH',
              cognitiveFunction: '1. Bạn đại diện cho công ty du lịch nào và muốn giới thiệu tour gì?',
              content: "Good morning! My name is An from Dan Travel Agency, and I'm glad to offer you an exciting one-day tour to Da Lat.",
              bandLevel: 'Band 3.0 → 3.5',
              pedagogyNote: 'Bám sát câu mở đầu mẫu bài tập 3.3: "Good evening, my name is... from... I\'m glad to offer you an exciting 1-day trip to...".',
              flipCard: {
                frontText: 'Hello, I sell tour to Da Lat. (Tiếng bồi)',
                backText: "I'm glad to offer you an exciting one-day tour to Da Lat. (Chuẩn bài tập 3.3)",
                explanation: 'Mẫu câu thuyết trình chuyên nghiệp trong giáo trình: "I\'m glad to offer you an exciting tour...".'
              }
            },
            {
              step: 2,
              label: 'BƯỚC 2: LỊCH TRÌNH BUỔI SÁNG (IN THE MORNING)',
              cognitiveFunction: '2. Du khách sẽ được tham quan những đâu vào buổi sáng?',
              content: 'In the morning, we will pick you up at your hotel and explore peaceful flower gardens with beautiful landscapes.',
              bandLevel: 'Band 3.5 → 4.0',
              pedagogyNote: 'Dùng cụm từ vựng của bài: "pick you up at hotel" và "flower gardens with beautiful landscapes".',
              flipCard: {
                frontText: 'Morning we go see flowers. (Quá đơn sơ)',
                backText: 'In the morning, we explore flower gardens with beautiful natural landscapes. (Rõ ràng)',
                explanation: 'Áp dụng cụm từ "natural landscapes" đã học ở phần hội thoại.'
              }
            },
            {
              step: 3,
              label: 'BƯỚC 3: LỊCH TRÌNH BUỔI CHIỀU & ẨM THỰC (AFTERNOON & LOCAL FOOD)',
              cognitiveFunction: '3. Buổi chiều du khách sẽ tham gia hoạt động và ăn uống món gì?',
              content: 'In the afternoon, you can walk around Xuan Huong lake and taste delicious local specialties at the night market.',
              bandLevel: 'Band 4.0 → 4.5',
              pedagogyNote: 'Luyện cấu trúc: "walk around lake" và "taste local specialties" (thưởng thức đặc sản địa phương).',
              flipCard: {
                frontText: 'Afternoon we eat food in market. (Đơn sơ)',
                backText: 'In the afternoon, you can taste delicious local specialties at the night market.',
                explanation: 'Học từ vựng du lịch chuẩn "local specialties" (đặc sản địa phương).'
              },
              branchOptions: [
                {
                  branchName: 'DẠO HỒ & CHỢ ĐÊM (ĐÀ LẠT)',
                  content: 'In the afternoon, you can walk around Xuan Huong lake and taste delicious local specialties at the night market.',
                  note: 'Lịch trình tham quan hồ và chợ đêm ẩm thực.'
                },
                {
                  branchName: 'CÁP TREO & THÁC NƯỚC (THIÊN NHIÊN)',
                  content: 'In the afternoon, you can ride a cable car and enjoy breathtaking views of pine forests and waterfalls.',
                  note: 'Trải nghiệm cáp treo và rừng thông ngắm thác.'
                }
              ]
            },
            {
              step: 4,
              label: 'BƯỚC 4: LỜI MỜI CHỐT TOUR (REASONABLE PRICE)',
              cognitiveFunction: '4. Mức giá và lời mời chào kết thúc của bạn là gì?',
              content: 'This exciting tour comes at a very reasonable price, so we hope to welcome you on this wonderful journey!',
              bandLevel: 'Band 4.5',
              pedagogyNote: 'Khép lại bằng cụm từ quen thuộc: "at a very reasonable price" và lời mời lịch sự.',
              flipCard: {
                frontText: 'The price is cheap, please buy. (Tiếng bồi)',
                backText: 'This tour comes at a very reasonable price, so we hope to welcome you! (Lịch sự, chuyên nghiệp)',
                explanation: 'Dùng cụm "at a reasonable price" thay vì nói "cheap" để tăng tính chuyên nghiệp.'
              }
            }
          ],
          fullMosaicSummary: "Good morning! My name is An from Dan Travel Agency, and I'm glad to offer you an exciting one-day tour to Da Lat. In the morning, we will explore flower gardens with beautiful natural landscapes. In the afternoon, you can walk around Xuan Huong lake and taste local specialties. This tour comes at a very reasonable price, and we hope to welcome you soon!"
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
    subtitle: 'Mệnh Đề Quan Hệ Xác Định & Không Xác Định: Lắp Ráp & Điểm Gãy Dấu Phẩy',
    coreCompetency: 'Phân biệt rạch ròi Mệnh đề quan hệ xác định (Defining - không dấu phẩy) và không xác định (Non-defining - kẹp giữa 2 dấu phẩy) trong giáo trình W7D1. Làm chủ quy tắc cấm kỵ cốt lõi: Tuyệt đối không bao giờ dùng "THAT" sau dấu phẩy.',
    bridgeToHomework: {
      promptText: 'Luyện tập đặt dấu phẩy và phân biệt Defining vs Non-defining trong Homework W7D1.',
      targetExamId: 'exam_dreamer_w7d1'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'syntax_anatomy',
        title: 'Chặng 1: Kiến Tạo Mệnh Đề Không Xác Định Kẹp Dấu Phẩy (Neil Armstrong, Who Stepped on the Moon)',
        pedagogicalObjective: 'Bám sát ví dụ giáo trình W7D1 bài tập 3 câu 1: Lắp ráp câu chứa danh từ riêng xác định kết hợp Mệnh đề quan hệ Non-defining được bao bọc bởi 2 dấu phẩy.',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Bấm quét giải phẫu để lắp ráp câu văn chứa Mệnh đề quan hệ không xác định chuẩn mực:',
          mode: 'build',
          tokens: [
            { id: 't1', text: 'Neil Armstrong,', role: 'subject', colorClass: 'green' },
            { id: 't2', text: 'who first stepped on the moon,', role: 'adjective_clause', colorClass: 'orange' },
            { id: 't3', text: 'was a courageous', role: 'fv_core', colorClass: 'blue' },
            { id: 't4', text: 'American astronaut', role: 'complement', colorClass: 'purple' }
          ]
        }
      },
      {
        stageNumber: 2,
        stageType: 'productive_failure',
        title: 'Chặng 2: Phẫu Thuật Mâu Thuẫn Cấm Kỵ Dùng "That" Sau Dấu Phẩy (My Wife, That Is an English Teacher)',
        pedagogicalObjective: 'Bám sát ví dụ giáo trình W7D1 bài tập 3 câu 2: Đối diện với lỗi cấm kỵ kinh điển trong IELTS Writing - Dùng đại từ "that" sau dấu phẩy.',
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
            errorMessage: 'Vi phạm luật ngữ pháp cấm kỵ: "My wife" là danh từ xác định duy nhất, mệnh đề bổ sung thông tin là Non-defining bắt buộc có dấu phẩy, và ĐẠI TỪ "THAT" TUYỆT ĐỐI KHÔNG ĐƯỢC PHÉP ĐỨNG SAU DẤU PHẨY!',
            repairOptions: [
              {
                id: 'opt1',
                action: 'delete',
                targetTokenId: 't2',
                resultText: 'who',
                explanation: 'Thay thế "that" bằng đại từ "who" để đảm bảo tính chuẩn xác tuyệt đối trong văn phong học thuật.'
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
    subtitle: 'Quy Trách Nhiệm Nhân Quả & 6 Bẫy Tranh Luận Môi Trường Formosa',
    coreCompetency: 'Đối chiếu các mức độ trách nhiệm pháp lý trong sự cố môi trường Formosa (suspected -> admitted -> accepted responsibility) để tránh bẫy thời điểm, bẫy nguyên nhân tự nhiên (thủy triều đỏ) và bẫy phạm vi cấm đánh bắt hải sản.',
    bridgeToHomework: {
      promptText: 'Làm bài đọc hiểu về sự cố môi trường biển năm 2016 trong Homework W7D2.',
      targetExamId: 'exam_dreamer_w7d2'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'verification_scale',
        title: 'Câu 1 (T/F/NG): Bẫy Thời Điểm Nhận Trách Nhiệm (right after incident vs after months)',
        pedagogicalObjective: 'Phân định sự đối lập giữa khẳng định nhận trách nhiệm ngay sau sự cố và việc chối bỏ suốt nhiều tháng.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Bấm Radar quét mốc thời gian nhận trách nhiệm của Formosa ở Đoạn tóm tắt:',
          passageContext: {
            title: '2016 Vietnam marine life disaster',
            paragraphs: [
              {
                id: 'p1',
                label: 'Đoạn tóm tắt · Dòng thời gian phát hiện cá chết',
                text: 'Dead fish were first found on the beaches of Hà Tĩnh province on 6 April 2016. Formosa Ha Tinh Steel discharged toxic waste illegally into the ocean through drainage pipes. After denying responsibility for months, Formosa accepted responsibility for the fish deaths on June 30, 2016.'
              }
            ],
            targetParagraphId: 'p1',
            targetSnippet: 'After denying responsibility for months, Formosa accepted responsibility for the fish deaths on June 30, 2016'
          },
          statement: {
            rawText: '1. Formosa accepted the responsibility right after the incident.',
            deconstructedVariables: [
              { name: 'actor', text: 'Formosa' },
              { name: 'timing', text: 'accepted the responsibility right after the incident', isTrapWord: true }
            ]
          },
          passageEvidence: {
            rawText: 'After denying responsibility for months, Formosa accepted responsibility for the fish deaths on June 30, 2016.',
            targetVariables: [
              { matchingName: 'timing', text: 'After denying responsibility for months (chối bỏ suốt nhiều tháng, tận 30/6 mới nhận)' }
            ]
          },
          expectedRelation: 'contradiction',
          verdict: 'FALSE',
          pedagogicalInsight: 'FALSE vì bài đọc ghi rõ Formosa đã chối bỏ trách nhiệm trong nhiều tháng ("After denying responsibility for months") và mãi đến tận 30/6/2016 mới chịu nhận, mâu thuẫn trực tiếp với khẳng định "right after the incident" (ngay sau sự cố)!'
        }
      },
      {
        stageNumber: 2,
        stageType: 'verification_scale',
        title: 'Câu 2 (T/F/NG): Khớp Ý Nhập Khẩu Hóa Chất Súc Rửa Đường Ống (300 tonnes of chemicals)',
        pedagogicalObjective: 'Đối chiếu dữ kiện công ty thừa nhận có ống xả và đã nhập 300 tấn hóa chất về để tẩy rửa đường ống.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Bấm Radar quét nguyên nhân và thông tin nhập khẩu hóa chất ở Đoạn Causes:',
          passageContext: {
            title: '2016 Vietnam marine life disaster',
            paragraphs: [
              {
                id: 'p2',
                label: 'Đoạn Causes · Hóa chất sục rửa đường ống',
                text: 'The company admitted that there was a pipe connecting the plant and the ocean and it was reported that several days before the incident, 300 tonnes of chemicals were imported by Formosa in order to clean the pipe.'
              }
            ],
            targetParagraphId: 'p2',
            targetSnippet: '300 tonnes of chemicals were imported by Formosa in order to clean the pipe'
          },
          statement: {
            rawText: '2. Formosa imported chemicals to clean the pipe that connect the plant and the ocean.',
            deconstructedVariables: [
              { name: 'actor', text: 'Formosa' },
              { name: 'action', text: 'imported chemicals to clean the pipe' },
              { name: 'pipe_location', text: 'that connect the plant and the ocean' }
            ]
          },
          passageEvidence: {
            rawText: 'The company admitted that there was a pipe connecting the plant and the ocean and it was reported that several days before the incident, 300 tonnes of chemicals were imported by Formosa in order to clean the pipe.',
            targetVariables: [
              { matchingName: 'action', text: '300 tonnes of chemicals were imported by Formosa in order to clean the pipe (nhập 300 tấn hóa chất tẩy rửa ống)' }
            ]
          },
          expectedRelation: 'match',
          verdict: 'TRUE',
          pedagogicalInsight: 'TRUE! Formosa đã thừa nhận có đường ống nối từ nhà máy ra biển và các báo cáo chỉ ra công ty đã nhập 300 tấn hóa chất nhằm mục đích súc rửa đường ống này trước khi xảy ra vụ việc.'
        }
      },
      {
        stageNumber: 3,
        stageType: 'verification_scale',
        title: 'Câu 3 (T/F/NG): Bẫy Tọa Độ Địa Lý (Vung Ang Economic Zone vs Formosa steel plant)',
        pedagogicalObjective: 'Phát hiện sự sai lệch tinh vi: các nhà khoa học đồng thuận nguồn độc tố từ Khu kinh tế Vũng Áng nói chung, chứ không khẳng định trực tiếp là từ riêng nhà máy Formosa ở giai đoạn đó.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Bấm Radar quét kết luận sơ bộ ban đầu của các nhà khoa học Việt Nam ở Đoạn Causes:',
          passageContext: {
            title: '2016 Vietnam marine life disaster',
            paragraphs: [
              {
                id: 'p2',
                label: 'Đoạn Causes · Nhận định của các nhà khoa học',
                text: 'Vietnamese scientists largely agreed that the source of the toxins was from the Vung Ang Economic Zone, in which the Formosa steel plant was located. However, it was not determined that the Formosa steel plant was linked to the disaster.'
              }
            ],
            targetParagraphId: 'p2',
            targetSnippet: 'the source of the toxins was from the Vung Ang Economic Zone, in which the Formosa steel plant was located'
          },
          statement: {
            rawText: '3. Vietnamese scientists largely agreed that the source of toxins was from Formosa steel plant.',
            deconstructedVariables: [
              { name: 'subject', text: 'Vietnamese scientists' },
              { name: 'consensus_claim', text: 'largely agreed that the source of toxins was from Formosa steel plant', isTrapWord: true }
            ]
          },
          passageEvidence: {
            rawText: 'Vietnamese scientists largely agreed that the source of the toxins was from the Vung Ang Economic Zone... However, it was not determined that the Formosa steel plant was linked to the disaster.',
            targetVariables: [
              { matchingName: 'consensus_claim', text: 'chỉ đồng thuận từ "Vung Ang Economic Zone", chưa xác định là do Formosa' }
            ]
          },
          expectedRelation: 'contradiction',
          verdict: 'FALSE',
          pedagogicalInsight: 'FALSE vì các nhà khoa học chỉ đồng thuận rằng nguồn độc tố bắt nguồn từ "Khu kinh tế Vũng Áng" (nơi Formosa đóng quân), và câu tiếp theo khẳng định rõ "chưa xác định được nhà máy Formosa có liên quan đến thảm họa hay không" (it was not determined that Formosa was linked).'
        }
      },
      {
        stageNumber: 4,
        stageType: 'verification_scale',
        title: 'Câu 4 (T/F/NG): Khớp Ý Vượt Ngưỡng Cho Phép (exceeded the permitted level)',
        pedagogicalObjective: 'Đối chiếu kết quả thanh tra: chất thải chứa hàm lượng độc tố vượt quá quy chuẩn cho phép.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Bấm Radar quét kết quả thanh tra của Bộ Tài nguyên & Môi trường trong Đoạn Causes:',
          passageContext: {
            title: '2016 Vietnam marine life disaster',
            paragraphs: [
              {
                id: 'p2',
                label: 'Đoạn Causes · Kết luận họp báo ngày 30/6/2016',
                text: 'violations regarding Formosa discharging toxic waste into the sea, which contained toxins that exceeded the permitted level.'
              }
            ],
            targetParagraphId: 'p2',
            targetSnippet: 'contained toxins that exceeded the permitted level'
          },
          statement: {
            rawText: '4. Toxic waste from Formosa contained a level of toxins that was significantly higher than permitted.',
            deconstructedVariables: [
              { name: 'source', text: 'Toxic waste from Formosa' },
              { name: 'toxin_level', text: 'contained a level of toxins significantly higher than permitted' }
            ]
          },
          passageEvidence: {
            rawText: 'contained toxins that exceeded the permitted level.',
            targetVariables: [
              { matchingName: 'toxin_level', text: 'exceeded the permitted level (vượt ngưỡng cho phép = higher than permitted)' }
            ]
          },
          expectedRelation: 'match',
          verdict: 'TRUE',
          pedagogicalInsight: 'TRUE! Cụm từ "exceeded the permitted level" (vượt mức cho phép) trùng khớp hoàn toàn với "significantly higher than permitted" trong câu hỏi đề bài.'
        }
      },
      {
        stageNumber: 5,
        stageType: 'verification_scale',
        title: 'Câu 5 (T/F/NG): Khớp Ý Lệnh Cấm Đánh Bắt & Buôn Bán Hải Sản (20 nautical miles)',
        pedagogicalObjective: 'Đối chiếu lệnh cấm của Chính phủ sau ngày 4/5/2016 đối với hải sản trong phạm vi 20 hải lý.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Bấm Radar quét lệnh cấm đánh bắt và chế biến hải sản trong Đoạn Effects:',
          passageContext: {
            title: '2016 Vietnam marine life disaster',
            paragraphs: [
              {
                id: 'p3',
                label: 'Đoạn Effects · Lệnh cấm ngày 4/5/2016',
                text: 'On 4 May 2016, the Vietnamese government announced a ban on processing and selling seafood (that was) caught within 20 nautical miles of central Vietnam provinces.'
              }
            ],
            targetParagraphId: 'p3',
            targetSnippet: 'announced a ban on processing and selling seafood caught within 20 nautical miles'
          },
          statement: {
            rawText: '5. After 4 May 2016, it was illegal to process and sell seafood caught within 20 nautical miles of central Vietnamese provinces.',
            deconstructedVariables: [
              { name: 'timeline', text: 'After 4 May 2016' },
              { name: 'legal_status', text: 'it was illegal to process and sell seafood' },
              { name: 'scope', text: 'caught within 20 nautical miles of central Vietnamese provinces' }
            ]
          },
          passageEvidence: {
            rawText: 'On 4 May 2016, the Vietnamese government announced a ban on processing and selling seafood caught within 20 nautical miles.',
            targetVariables: [
              { matchingName: 'legal_status', text: 'announced a ban on processing and selling (ban hành lệnh cấm = illegal)' }
            ]
          },
          expectedRelation: 'match',
          verdict: 'TRUE',
          pedagogicalInsight: 'TRUE! Cụm "announced a ban on..." (ban hành lệnh cấm) đồng nghĩa với "it was illegal" (trở thành bất hợp pháp) sau ngày 4/5/2016 đối với hải sản đánh bắt trong bán kính 20 hải lý.'
        }
      },
      {
        stageNumber: 6,
        stageType: 'verification_scale',
        title: 'Câu 6 (T/F/NG): Khớp Ý Lý Do Du Lịch Sụt Giảm (tourists canceled planned tours)',
        pedagogicalObjective: 'Đối chiếu nguyên nhân thiệt hại ngành du lịch do 30% khách hủy tour dịp nghỉ lễ.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Bấm Radar quét tác động lên ngành du lịch trong Đoạn Effects:',
          passageContext: {
            title: '2016 Vietnam marine life disaster',
            paragraphs: [
              {
                id: 'p3',
                label: 'Đoạn Effects · Thiệt hại du lịch dịp lễ 30/4',
                text: 'in addition, the disaster also heavily impacted the tourism industry as nearly 30% of tourists canceled their planned tours to the affected provinces for the national holiday season starting on 30 April.'
              }
            ],
            targetParagraphId: 'p3',
            targetSnippet: 'heavily impacted the tourism industry as nearly 30% of tourists canceled their planned tours'
          },
          statement: {
            rawText: '6. The severe impact on the tourism industry was because tourists canceled their tours to the impacted provinces.',
            deconstructedVariables: [
              { name: 'industry_effect', text: 'severe impact on the tourism industry' },
              { name: 'cause', text: 'because tourists canceled their tours to the impacted provinces' }
            ]
          },
          passageEvidence: {
            rawText: 'heavily impacted the tourism industry as nearly 30% of tourists canceled their planned tours to the affected provinces.',
            targetVariables: [
              { matchingName: 'cause', text: 'as nearly 30% of tourists canceled their planned tours (vì gần 30% du khách hủy tour)' }
            ]
          },
          expectedRelation: 'match',
          verdict: 'TRUE',
          pedagogicalInsight: 'TRUE! Bài đọc dùng liên từ chỉ nguyên nhân "as" ("as nearly 30% of tourists canceled their planned tours"), hoàn toàn khớp với mệnh đề chỉ lý do "because tourists canceled their tours" của đề bài.'
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
    title: 'The Friendship & Conflict Resolution Engine (Topic: Friendship)',
    subtitle: 'Nói Về Bạn Thân & Giải Quyết Hiểu Lầm: Từ Câu Cụt 3.0 Lên Bài Nói 4.0 - 4.5',
    coreCompetency: 'Chuẩn hóa đầu ra khóa Dreamer (3.0 → 4.0+): Học viên thành thạo quy tắc phát âm đuôi -s/-es (/s/, /z/, /ɪz/), sử dụng linh hoạt câu điều kiện If loại 1 ("If I get into trouble, my friend will help me"), mệnh đề quan hệ Who/Which để tả bạn thân, và bộ từ vựng xử lý hiểu lầm ("resolve misunderstandings", "talk behind my back").',
    bridgeToHomework: {
      promptText: 'Luyện tập phát âm -s/-es và thu âm bài nói miêu tả người bạn thân nhất (Best Friend) trong Homework W7D3.',
      targetExamId: 'exam_dreamer_w7d3'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'progressive_reveal',
        title: 'Chặng 1: Tình Bạn Bền Vững & Tương Trợ (Friendships We Can Keep - Bài tập 2.1)',
        pedagogicalObjective: 'Làm chủ mẫu câu điều kiện If loại 1 trong giáo trình: "If I get into trouble / feel nervous, my friend will..." để nói về sự giúp đỡ của bạn bè.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click mở từng bước để học cách nói về sự hỗ trợ của bạn bè bằng câu điều kiện If:',
          cards: [
            {
              step: 1,
              label: 'BƯỚC 1: KHI GẶP KHÓ KHĂN (GET INTO TROUBLE)',
              cognitiveFunction: '1. Khi bạn gặp rắc rối, bạn thân sẽ làm gì cho bạn?',
              content: 'If I get into trouble with my studies, my best friend will always stand by me and help me out.',
              bandLevel: 'Band 3.0 → 3.5',
              pedagogyNote: 'Bám sát câu hỏi 1 bài tập 2.1: "If I get into trouble, my friend will...". Cụm từ "help me out" rất gần gũi.',
              flipCard: {
                frontText: 'When I have problem, my friend help. (Tiếng bồi)',
                backText: 'If I get into trouble, my best friend will always help me out. (Chuẩn câu điều kiện If)',
                explanation: 'Dùng câu điều kiện loại 1: "If I get into trouble, my friend will + V".'
              },
              vowelHighlight: [
                { word: 'washes', phonetic: '/ˈwɒʃ.ɪz/', vowelSound: '/ɪz/ âm es sau âm xát' },
                { word: 'gets', phonetic: '/ɡets/', vowelSound: '/s/ âm s sau âm không rung t' }
              ]
            },
            {
              step: 2,
              label: 'BƯỚC 2: KHI CẦN NGƯỜI TÂM SỰ (SOMEONE TO TALK TO)',
              cognitiveFunction: '2. Khi buồn hoặc cần người lắng nghe, bạn ấy sẽ phản ứng ra sao?',
              content: 'Whenever I need someone to talk to, she is willing to listen patiently to my stories.',
              bandLevel: 'Band 3.5 → 4.0',
              pedagogyNote: 'Bám sát câu hỏi 2 bài tập 2.1: "If I need someone to talk to, my friend will...". Cụm từ "listen patiently".',
              flipCard: {
                frontText: 'I talk, she listen. (Cụt ý)',
                backText: 'Whenever I need someone to talk to, she is willing to listen patiently. (Tự nhiên)',
                explanation: 'Học cụm "be willing to listen patiently" (sẵn sàng lắng nghe một cách kiên nhẫn).'
              }
            },
            {
              step: 3,
              label: 'BƯỚC 3: KHI CĂNG THẲNG TRƯỚC KỲ THI (FEEL NERVOUS BEFORE TEST)',
              cognitiveFunction: '3. Khi bạn lo lắng trước ngày thi IELTS, bạn ấy khích lệ bạn thế nào?',
              content: 'If I feel nervous before an important IELTS test, she will send me encouraging messages to cheer me up.',
              bandLevel: 'Band 4.0 → 4.5',
              pedagogyNote: 'Bám sát câu hỏi 4 bài tập 2.1: "If I feel nervous and have to sit an IELTS test tomorrow, my friend will...".',
              flipCard: {
                frontText: 'Before test she say I can do it. (Đơn sơ)',
                backText: 'If I feel nervous, she will send me encouraging messages to cheer me up.',
                explanation: 'Cụm từ "cheer me up" (cổ vũ tinh thần tôi) rất vừa vặn cho mục tiêu 4.0 - 4.5.'
              },
              branchOptions: [
                {
                  branchName: 'CỔ VŨ TRƯỚC KỲ THI IELTS (BÀI TẬP 2.1 CÂU 4)',
                  content: 'If I feel nervous before an IELTS test, she will send me encouraging messages to cheer me up.',
                  note: 'Lời chúc và tin nhắn khích lệ trước kỳ thi.'
                },
                {
                  branchName: 'CHO LỜI KHUYÊN KHI QUYẾT ĐỊNH LỚN (CÂU 3)',
                  content: 'If I need to make a big decision, she will give me honest and helpful advice.',
                  note: 'Trích từ câu 3 bài tập 2.1 về việc đưa ra quyết định quan trọng.'
                }
              ]
            },
            {
              step: 4,
              label: 'BƯỚC 4: TỔNG KẾT TÌNH BẠN (LUCKY TO HAVE HER)',
              cognitiveFunction: '4. Bạn cảm thấy như thế nào khi có một người bạn như vậy?',
              content: 'I truly feel very lucky to have such a supportive and trustworthy friend in my life.',
              bandLevel: 'Band 4.5',
              pedagogyNote: 'Bám sát câu thoại trong bài: "I\'m lucky to have you as my friend" kết hợp tính từ "trustworthy" (đáng tin cậy).',
              flipCard: {
                frontText: 'She is a very good friend. (Quá bình thường)',
                backText: 'I feel very lucky to have such a supportive and trustworthy friend. (Tròn trịa)',
                explanation: 'Dùng cụm "supportive and trustworthy friend" (người bạn luôn ủng hộ và đáng tin cậy).'
              }
            }
          ],
          fullMosaicSummary: 'If I get into trouble with my studies, my best friend will always stand by me and help me out. Whenever I need someone to talk to, she is willing to listen patiently to my stories. If I feel nervous before an IELTS test, she will send me encouraging messages, and I feel very lucky to have such a trustworthy friend.'
        }
      },
      {
        stageNumber: 2,
        stageType: 'progressive_reveal',
        title: 'Chặng 2: Giới Thiệu Bạn Thân Bằng Mệnh Đề Quan Hệ (Review Your Best Friend)',
        pedagogicalObjective: 'Làm chủ bài tập ngữ pháp 2.2: Dùng Mệnh đề tính từ với "who" (bổ sung người) và "which" (bổ sung sự việc) để tả người bạn thân.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click mở từng bước để học cách dùng WHO và WHICH để miêu tả bạn thân:',
          cards: [
            {
              step: 1,
              label: 'BƯỚC 1: TÊN VÀ NGHỀ NGHIỆP CỦA BẠN (WHO WORKS/STUDIES)',
              cognitiveFunction: '1. Bạn thân của bạn tên gì và đang học hoặc làm nghề gì?',
              content: 'My best friend is Nam, who is currently studying finance at the University of Economics.',
              bandLevel: 'Band 3.0 → 3.5',
              pedagogyNote: 'Bám sát công thức ngữ pháp 2.2 câu 1: "My best friend is [Name], who works as / studies...".',
              flipCard: {
                frontText: 'My best friend is Nam. He studies finance. (Hai câu rời)',
                backText: 'My best friend is Nam, who is currently studying finance. (Nối bằng WHO)',
                explanation: 'Dùng đại từ quan hệ "who" nối 2 câu đơn thành 1 câu ghép mượt mà.'
              },
              vowelHighlight: [
                { word: 'studies', phonetic: '/ˈstʌd.iz/', vowelSound: '/z/ âm es sau nguyên âm' },
                { word: 'exercises', phonetic: '/ˈek.sə.saɪ.zɪz/', vowelSound: '/ɪz/ âm es sau âm z' }
              ]
            },
            {
              step: 2,
              label: 'BƯỚC 2: TÍNH CÁCH CHĂM CHỈ & HỖ TRỢ (WHO IS SUPPORTIVE)',
              cognitiveFunction: '2. Bạn ấy có đức tính gì tốt đối với bạn bè?',
              content: 'He is a very hard-working student, who is always willing to share study notes with classmates.',
              bandLevel: 'Band 3.5 → 4.0',
              pedagogyNote: 'Luyện câu 2 & 3 bài tập 2.2: "She is a supportive friend, who is willing to..." / "hard-working student, who...".',
              flipCard: {
                frontText: 'He is hard-working and he shares notes. (Lặp từ he)',
                backText: 'He is a hard-working student, who is always willing to share notes. (Chuẩn xác)',
                explanation: 'Dùng "who is always willing to..." thay thế cho việc lặp lại chủ ngữ.'
              }
            },
            {
              step: 3,
              label: 'BƯỚC 3: ĐIỂM CHUNG GẮN KẾT (HAVE A LOT IN COMMON, WHICH MAKES US...)',
              cognitiveFunction: '3. Hai bạn có những sở thích chung nào gắn kết với nhau?',
              content: 'We have a lot of hobbies in common and usually share things together, which makes us closer.',
              bandLevel: 'Band 4.0 → 4.5',
              pedagogyNote: 'Luyện cấu trúc ngữ pháp dùng WHICH thay thế cho cả mệnh đề: "We have a lot in common..., which makes us closer".',
              flipCard: {
                frontText: 'We have same hobbies, so we are close. (Đơn sơ)',
                backText: 'We have a lot in common, which makes us become closer friends. (Nâng cấp +0.5)',
                explanation: 'Sử dụng ", which makes us..." bổ nghĩa cho toàn bộ sự việc phía trước.'
              },
              branchOptions: [
                {
                  branchName: 'SỞ THÍCH CHUNG (HAVE IN COMMON - TRONG SÁCH)',
                  content: 'We have a lot in common and usually share things together, which makes us become closer friends.',
                  note: 'Nguyên văn cấu trúc câu 3 phần Which trong bài tập 2.2.'
                },
                {
                  branchName: 'KỂ CHUYỆN HÀI HƯỚC (TELL SILLY JOKES - CÂU 2)',
                  content: 'He usually tells silly jokes after stressful classes, which makes everyone laugh happily.',
                  note: 'Trích từ câu 2 bài tập 2.2 về việc kể chuyện cười vui vẻ.'
                }
              ]
            },
            {
              step: 4,
              label: 'BƯỚC 4: KỲ VỌNG TƯƠNG LAI (LONG-LASTING FRIENDSHIP)',
              cognitiveFunction: '4. Bạn mong ước tình bạn này sẽ như thế nào trong tương lai?',
              content: 'I believe that our close bond will remain strong even after we graduate from university.',
              bandLevel: 'Band 4.5',
              pedagogyNote: 'Khép lại bằng mong ước gắn bó lâu dài sau khi tốt nghiệp ra trường.',
              flipCard: {
                frontText: 'I hope we still friend later. (Tiếng bồi)',
                backText: 'I believe our close bond will remain strong after graduation. (Chuẩn tự nhiên)',
                explanation: 'Dùng cụm "remain strong after graduation" tạo cái kết đẹp và đúng tầm.'
              }
            }
          ],
          fullMosaicSummary: 'My best friend is Nam, who is currently studying finance at university. He is a hard-working student, who is always willing to share study notes with classmates. We have a lot of hobbies in common and usually share things together, which makes us closer friends, and I believe our bond will remain strong for years.'
        }
      },
      {
        stageNumber: 3,
        stageType: 'progressive_reveal',
        title: 'Chặng 3: Hóa Giải Hiểu Lầm Trong Tình Bạn (Resolving Misunderstandings - Dialogue 3)',
        pedagogicalObjective: 'Làm chủ tình huống hội thoại 3: Khi bạn bè nói sau lưng gây hiểu lầm (talk behind back) -> Giải thích rõ ràng -> Xin lỗi vì vội kết luận (jumping to conclusions) -> Làm hòa.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click mở từng bước để học cách hóa giải hiểu lầm và bảo vệ tình bạn:',
          cards: [
            {
              step: 1,
              label: 'BƯỚC 1: NÓI THẲNG ĐIỀU BĂN KHOĂN (TALK BEHIND MY BACK)',
              cognitiveFunction: '1. Bạn muốn trao đổi thẳng thắn điều gì làm tổn thương mình?',
              content: "I wanted to talk to you because I thought you were talking about me behind my back.",
              bandLevel: 'Band 3.0 → 3.5',
              pedagogyNote: 'Bám sát câu mở đầu của nhân vật A: "I think you were talking about me behind my back".',
              flipCard: {
                frontText: 'You speak bad about me. (Nói thô)',
                backText: 'I wanted to talk to you because I heard you talking behind my back. (Chuẩn giáo trình)',
                explanation: 'Thành ngữ đắt giá trong bài: "talk behind someone\'s back" (nói xấu sau lưng ai).'
              }
            },
            {
              step: 2,
              label: 'BƯỚC 2: BÀY TỎ TỔN THƯƠNG (HURT MY FEELINGS)',
              cognitiveFunction: '2. Lời đồn đó đã khiến bạn cảm thấy tổn thương ra sao?',
              content: 'I heard someone mention that I was not reliable, and it really hurt my feelings.',
              bandLevel: 'Band 3.5 → 4.0',
              pedagogyNote: 'Trích nguyên văn lời của A: "mention something about me not being reliable, and it really hurt my feelings".',
              flipCard: {
                frontText: 'I am sad and angry. (Đơn sơ)',
                backText: 'It really hurt my feelings. (Cụm từ cảm xúc chuẩn mực của bài)',
                explanation: 'Dùng cụm "hurt someone\'s feelings" (làm tổn thương cảm xúc của ai).'
              }
            },
            {
              step: 3,
              label: 'BƯỚC 3: LỜI GIẢI THÍCH THÀNH THẬT (VALUE OUR FRIENDSHIP)',
              cognitiveFunction: '3. Người bạn giải thích thế nào để xóa tan nghi ngờ?',
              content: 'I swear it was not about you; you are one of my closest friends, and I truly value our friendship.',
              bandLevel: 'Band 4.0 → 4.5',
              pedagogyNote: 'Lời đáp chân thành của B: "I would never say anything negative... I value our friendship".',
              flipCard: {
                frontText: 'Not you, I like our friend. (Tiếng bồi)',
                backText: 'You are one of my closest friends, and I truly value our friendship. (Rất tự nhiên)',
                explanation: 'Cụm collocation chuẩn trong bài: "value our friendship" (trân trọng tình bạn của chúng ta).'
              },
              branchOptions: [
                {
                  branchName: 'GIẢI THÍCH & TRÂN TRỌNG TÌNH BẠN (LỜI B)',
                  content: 'I swear it was not about you; you are one of my closest friends, and I truly value our friendship.',
                  note: 'Lời thanh minh xóa tan nghi ngờ của bạn B.'
                },
                {
                  branchName: 'XIN LỖI VÌ VỘI KẾT LUẬN (LỜI A ĐÁP LẠI)',
                  content: "I believe you now, and I am really sorry for jumping to conclusions and assuming the worst.",
                  note: 'Thành ngữ trong sách: "sorry for jumping to conclusions" (xin lỗi vì vội kết luận).'
                }
              ]
            },
            {
              step: 4,
              label: 'BƯỚC 4: BỎ QUA VÀ TIẾP TỤC BƯỚC TIẾP (MOVE ON)',
              cognitiveFunction: '4. Hai bạn chốt lại cách giải quyết bất đồng như thế nào?',
              content: 'Let us resolve this misunderstanding and move on, because true friends always forgive each other.',
              bandLevel: 'Band 4.5',
              pedagogyNote: 'Khép lại bằng thông điệp đẹp của bài: "resolve misunderstandings" và "move on from this".',
              flipCard: {
                frontText: 'Okay, we are friends again. (Đơn sơ)',
                backText: 'Let us resolve this misunderstanding and move on together. (Văn minh, lịch thiệp)',
                explanation: 'Cụm từ vựng trọng tâm: "resolve misunderstandings" (giải quyết hiểu lầm).'
              }
            }
          ],
          fullMosaicSummary: "I wanted to talk to you because I heard you were talking behind my back, and it really hurt my feelings. However, you explained that it was not about me and that you truly value our friendship. I am sorry for jumping to conclusions, and let us resolve this misunderstanding and move on together."
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
    subtitle: 'Bóc Tách Dòng Dữ Liệu Pháp Luật & 7 Bẫy Nhận Thức Hình Sự',
    coreCompetency: 'Đối chiếu các con số và dữ kiện điều tra tội phạm (nơi ở hiện tại, phương thức vượt biên bằng xe tải, quy mô đường dây cần sa trị giá 3.2 tỷ USD) để tránh bẫy suy diễn và bẫy khái quát hóa luật pháp.',
    bridgeToHomework: {
      promptText: 'Làm bài đọc hiểu điều tra về đường dây trồng cần sa ở Anh trong Homework W8D2.',
      targetExamId: 'exam_dreamer_w8d2'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'verification_scale',
        title: 'Câu 1 (T/F/NG): Khớp Ý Nơi Cư Trú Hiện Tại (now back in Vietnam)',
        pedagogicalObjective: 'Đối chiếu dữ kiện nhân vật Cuong hiện nay đã bị trục xuất và đang sống tại Việt Nam.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Bấm Radar quét nơi ở hiện tại của nhân vật Cuong ở Đoạn 2:',
          passageContext: {
            title: "How Vietnamese drug kingpins run Britain's lucrative marijuana trade",
            paragraphs: [
              {
                id: 'p2',
                label: 'Đoạn 2 · Lời tự sự của Cuong sau khi trở về',
                text: '"All I ever wanted was to make money... whether it was legal or illegal" says Cuong, who is now back in Vietnam.'
              }
            ],
            targetParagraphId: 'p2',
            targetSnippet: 'says Cuong, who is now back in Vietnam'
          },
          statement: {
            rawText: '1. Mr. Cuong now resides in Vietnam.',
            deconstructedVariables: [
              { name: 'subject', text: 'Mr. Cuong' },
              { name: 'current_residence', text: 'now resides in Vietnam (hiện đang cư trú ở Việt Nam)' }
            ]
          },
          passageEvidence: {
            rawText: 'says Cuong, who is now back in Vietnam.',
            targetVariables: [
              { matchingName: 'current_residence', text: 'now back in Vietnam (hiện đã trở về Việt Nam = now resides in Vietnam)' }
            ]
          },
          expectedRelation: 'match',
          verdict: 'TRUE',
          pedagogicalInsight: 'TRUE! Cụm từ "who is now back in Vietnam" trong bài đọc đồng nghĩa 100% với "now resides in Vietnam" trong câu hỏi đề bài.'
        }
      },
      {
        stageNumber: 2,
        stageType: 'verification_scale',
        title: 'Câu 2 (T/F/NG): Khớp Ý Phương Thức Vượt Biên (underneath a lorry from France)',
        pedagogicalObjective: 'Đối chiếu hành trình vượt biên từ Pháp sang Anh trốn dưới gầm xe tải.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Bấm Radar quét phương tiện vượt biên của Cuong sang Anh ở Đoạn 2:',
          passageContext: {
            title: "How Vietnamese drug kingpins run Britain's lucrative marijuana trade",
            paragraphs: [
              {
                id: 'p2',
                label: 'Đoạn 2 · Hành trình vượt biên bất hợp pháp',
                text: 'Cuong - who is now 41 - migrated to Britain illegally, hidden under a lorry, before growing cannabis in homes and hotels.'
              }
            ],
            targetParagraphId: 'p2',
            targetSnippet: 'migrated to Britain illegally, hidden under a lorry'
          },
          statement: {
            rawText: '2. Cuong was transported to the UK from France under a lorry.',
            deconstructedVariables: [
              { name: 'passenger', text: 'Cuong' },
              { name: 'route', text: 'transported to the UK from France' },
              { name: 'vehicle_hideout', text: 'under a lorry' }
            ]
          },
          passageEvidence: {
            rawText: 'migrated to Britain illegally, hidden under a lorry.',
            targetVariables: [
              { matchingName: 'vehicle_hideout', text: 'hidden under a lorry (trốn dưới gầm xe tải)' }
            ]
          },
          expectedRelation: 'match',
          verdict: 'TRUE',
          pedagogicalInsight: 'TRUE! Bài đọc xác nhận Cuong đã di cư bất hợp pháp sang Anh bằng cách trốn dưới gầm xe tải ("hidden under a lorry").'
        }
      },
      {
        stageNumber: 3,
        stageType: 'verification_scale',
        title: 'Câu 3 (T/F/NG): Khớp Ý Mức Độ Nguy Hiểm Của Chuyến Đi (dangerous journey)',
        pedagogicalObjective: 'Đối chiếu tính từ "dangerous journey" trong bài đọc tương ứng với "extremely dangerous".',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Bấm Radar quét nhận định về chuyến đi của Cuong ở Đoạn 2:',
          passageContext: {
            title: "How Vietnamese drug kingpins run Britain's lucrative marijuana trade",
            paragraphs: [
              {
                id: 'p2',
                label: 'Đoạn 2 · Động cơ và hiểm nguy',
                text: 'His dangerous journey from the poor town of Haiphong to Britain\'s illegal cannabis farms was driven by big dreams.'
              }
            ],
            targetParagraphId: 'p2',
            targetSnippet: 'His dangerous journey from the poor town of Haiphong to Britain\'s illegal cannabis farms'
          },
          statement: {
            rawText: "3. Cuong's journey to the UK was extremely dangerous.",
            deconstructedVariables: [
              { name: 'subject', text: "Cuong's journey to the UK" },
              { name: 'danger_level', text: 'was extremely dangerous' }
            ]
          },
          passageEvidence: {
            rawText: 'His dangerous journey from the poor town of Haiphong to Britain\'s illegal cannabis farms was driven by big dreams.',
            targetVariables: [
              { matchingName: 'danger_level', text: 'His dangerous journey (chuyến đi đầy nguy hiểm của anh)' }
            ]
          },
          expectedRelation: 'match',
          verdict: 'TRUE',
          pedagogicalInsight: 'TRUE! Tác giả dùng cụm từ trực tiếp "His dangerous journey" để miêu tả hành trình từ Hải Phòng sang các nông trại cần sa bất hợp pháp ở Anh.'
        }
      },
      {
        stageNumber: 4,
        stageType: 'verification_scale',
        title: 'Câu 4 (T/F/NG): Bẫy Số Lượng Người Trực Tiếp Cùng Làm Tại Bristol',
        pedagogicalObjective: 'Kiểm tra xem bài đọc có đề cập cụ thể việc Cuong chăm sóc cây cùng 3 người di cư Việt khác tại Bristol hay không.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Bấm Radar quét chi tiết làm việc của Cuong tại nông trại ở Bristol:',
          passageContext: {
            title: "How Vietnamese drug kingpins run Britain's lucrative marijuana trade",
            paragraphs: [
              {
                id: 'p3',
                label: 'Đoạn về giai đoạn làm việc ở các thị trấn ngoại ô',
                text: 'Hiding in a suburban British house thousands of miles from home, cannabis farmer Cuong Nguyen spent months carefully nurturing his plants. He is one of the thousands of Vietnamese migrants working in the UK\'s multibillion-dollar weed industry.'
              }
            ],
            targetParagraphId: 'p3',
            targetSnippet: 'spent months carefully nurturing his plants. He is one of the thousands of Vietnamese migrants'
          },
          statement: {
            rawText: '4. In Bristol, Cuong took care of cannabis plants with three other Vietnamese migrants.',
            deconstructedVariables: [
              { name: 'location', text: 'In Bristol' },
              { name: 'activity', text: 'took care of cannabis plants' },
              { name: 'companions', text: 'with three other Vietnamese migrants', isTrapWord: true }
            ]
          },
          passageEvidence: {
            rawText: 'Bài đọc chỉ cho biết Cuong là một trong hàng ngàn người Việt làm nghề này và anh trốn trong nhà chăm sóc cây một mình ("spent months carefully nurturing his plants"). Tuyệt nhiên không có số liệu cụ thể nào nói về "3 người di cư Việt khác cùng làm ở Bristol".',
            targetVariables: [
              { matchingName: 'companions', text: 'KHÔNG CÓ THÔNG TIN VỀ 3 NGƯỜI BẠN CÙNG LÀM TẠI BRISTOL' }
            ]
          },
          expectedRelation: 'no_evidence',
          verdict: 'NOT GIVEN',
          pedagogicalInsight: 'NOT GIVEN vì bài đọc không hề cung cấp chi tiết nào khẳng định Cuong làm việc cùng "ba người di cư Việt Nam khác tại Bristol"!'
        }
      },
      {
        stageNumber: 5,
        stageType: 'verification_scale',
        title: 'Câu 5 (T/F/NG): Khớp Ý Chuyển Thành Đầu Nậu Buôn Cần Sa Ở London (weed trader)',
        pedagogicalObjective: 'Đối chiếu bước ngoặt khi nông trại bị đột kích, Cuong trốn lên London và tiếp tục chuyển sang buôn bán cần sa.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Bấm Radar quét diễn biến khi Cuong chuyển lên London hoạt động:',
          passageContext: {
            title: "How Vietnamese drug kingpins run Britain's lucrative marijuana trade",
            paragraphs: [
              {
                id: 'p4',
                label: 'Đoạn tóm tắt cuộc đời Cuong ở London',
                text: 'Cuong worked at a cannabis farm until it was raided by the police, forcing him to move to London where he continued to trade cannabis and sell drugs.'
              }
            ],
            targetParagraphId: 'p4',
            targetSnippet: 'move to London where he continued to trade cannabis'
          },
          statement: {
            rawText: '5. In London, Cuong became a weed trader.',
            deconstructedVariables: [
              { name: 'location', text: 'In London' },
              { name: 'occupation_change', text: 'Cuong became a weed trader' }
            ]
          },
          passageEvidence: {
            rawText: 'forcing him to move to London where he continued to trade cannabis.',
            targetVariables: [
              { matchingName: 'occupation_change', text: 'continued to trade cannabis (tiếp tục buôn bán cần sa = weed trader)' }
            ]
          },
          expectedRelation: 'match',
          verdict: 'TRUE',
          pedagogicalInsight: 'TRUE! Sau khi nông trại bị cảnh sát đột kích, Cuong dạt về London và tiếp tục tham gia mạng lưới buôn bán cần sa ("trade cannabis").'
        }
      },
      {
        stageNumber: 6,
        stageType: 'verification_scale',
        title: 'Câu 6 (T/F/NG): Bẫy Phát Tài Làm Giàu (made a fortune vs ended up with empty hands)',
        pedagogicalObjective: 'Bóc trần mâu thuẫn giữa việc "làm giàu phát tài" với thực tế bị bắt, bị tịch thu tiền và trục xuất trắng tay.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Bấm Radar quét kết cục tài chính của Cuong khi bị bắt giữ năm 2014:',
          passageContext: {
            title: "How Vietnamese drug kingpins run Britain's lucrative marijuana trade",
            paragraphs: [
              {
                id: 'p5',
                label: 'Đoạn kết cục bị bắt và trục xuất',
                text: 'In 2014, Cuong was arrested and all his earnings were confiscated. He was deported back to Vietnam with empty hands, struggling to rebuild his life.'
              }
            ],
            targetParagraphId: 'p5',
            targetSnippet: 'In 2014, Cuong was arrested and all his earnings were confiscated. He was deported back to Vietnam with empty hands'
          },
          statement: {
            rawText: '6. Cuong made a fortune as a weed trader and a weed farmer trainer.',
            deconstructedVariables: [
              { name: 'financial_outcome', text: 'made a fortune (kiếm được cả gia tài)', isTrapWord: true },
              { name: 'roles', text: 'as a weed trader and a weed farmer trainer' }
            ]
          },
          passageEvidence: {
            rawText: 'Cuong was arrested and all his earnings were confiscated. He was deported back to Vietnam with empty hands.',
            targetVariables: [
              { matchingName: 'financial_outcome', text: 'confiscated... deported with empty hands (bị tịch thu hết tiền, về nước trắng tay)' }
            ]
          },
          expectedRelation: 'contradiction',
          verdict: 'FALSE',
          pedagogicalInsight: 'FALSE vì Cuong bị bắt, toàn bộ tiền kiếm được đều bị tịch thu và bị trục xuất về Việt Nam với hai bàn tay trắng ("empty hands"), hoàn toàn mâu thuẫn với khẳng định "made a fortune" (làm giàu phát tài)!'
        }
      },
      {
        stageNumber: 7,
        stageType: 'verification_scale',
        title: 'Câu 7 (T/F/NG): Bẫy Kiến Thức Ngoài Luồng Về Pháp Luật (smoking weed illegal in UK?)',
        pedagogicalObjective: 'Phát hiện sự thiếu vắng dữ liệu văn bản: bài đọc chỉ nói về việc TRỒNG VÀ BUÔN BÁN BẤT HỢP PHÁP ("illegal cannabis farms/trade"), không có câu nào nêu luật về việc HÚT CẦN SA ("smoking weed is illegal").',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Bấm Radar quét toàn bài để tìm điều khoản luật cấm hút cần sa ở Anh:',
          passageContext: {
            title: "How Vietnamese drug kingpins run Britain's lucrative marijuana trade",
            paragraphs: [
              {
                id: 'p1',
                label: 'Đoạn 1 & 2 · Quy mô buôn bán cần sa',
                text: 'He is one of the thousands of Vietnamese migrants working in the UK\'s multibillion-dollar weed industry... His dangerous journey to Britain\'s illegal cannabis farms... managed by gangsters behind the UK\'s huge cannabis trade.'
              }
            ],
            targetParagraphId: 'p1',
            targetSnippet: 'working in the UK\'s multibillion-dollar weed industry... Britain\'s illegal cannabis farms'
          },
          statement: {
            rawText: '7. Smoking weed is illegal in the UK.',
            deconstructedVariables: [
              { name: 'specific_action', text: 'Smoking weed is illegal in the UK', isTrapWord: true }
            ]
          },
          passageEvidence: {
            rawText: 'Bài đọc chỉ nhắc đến "illegal cannabis farms" (các nông trại trồng cần sa lậu) và "illegal cannabis trade" (buôn bán ma túy bất hợp pháp). Tuyệt nhiên bài viết không đề cập đến điều luật cụ thể về hành vi HÚT CẦN SA ("smoking weed") có bất hợp pháp hay không.',
            targetVariables: [
              { matchingName: 'specific_action', text: 'KHÔNG CÓ DỮ KIỆN VỀ ĐIỀU LUẬT HÚT CẦN SA (SMOKING WEED)' }
            ]
          },
          expectedRelation: 'no_evidence',
          verdict: 'NOT GIVEN',
          pedagogicalInsight: 'NOT GIVEN! Dù ngoài đời thực hút cần sa là phạm pháp ở Anh, nhưng trong bài đọc người viết CHỈ đề cập đến việc TRỒNG LẬU (illegal farms) và BUÔN LẬU (trade), hoàn toàn KHÔNG hề nói về hành vi "smoking weed". Đây là bẫy kinh điển dựa vào kiến thức đời thực ngoài văn bản!'
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
    title: 'The Favorite Food & Restaurant Ordering Engine (Topic: Food)',
    subtitle: 'Nói Về Món Ăn Yêu Thích & Gọi Món Nhà Hàng: Từ Câu Cụt 3.0 Lên Bài Nói 4.0 - 4.5',
    coreCompetency: 'Chuẩn hóa đầu ra khóa Dreamer (3.0 → 4.0+): Học viên thành thạo trọng âm câu (Sentence Stress), sử dụng chính xác 5 từ vựng điểm nhấn của bài ("originates from", "broth", "affordable", "complicated", "serve"), và làm chủ đoạn hội thoại gọi món tại nhà hàng ("May I take your order?", "I would like...", "Your total is...").',
    bridgeToHomework: {
      promptText: 'Luyện tập trọng âm câu (Sentence Stress) và thu âm bài nói miêu tả món ăn yêu thích của bạn trong Homework W8D3.',
      targetExamId: 'exam_dreamer_w8d3'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'progressive_reveal',
        title: 'Chặng 1: Miêu Tả Món Ăn Yêu Thích - Bún Bò Huế (Favorite Dish Template)',
        pedagogicalObjective: 'Làm chủ bài tập 2.1 với 5 từ vựng bắt buộc: "originates from", "broth", "affordable", "complicated", "serve".',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click mở từng bước để học cách miêu tả món ăn yêu thích bám sát mẫu câu giáo trình:',
          cards: [
            {
              step: 1,
              label: 'BƯỚC 1: TÊN MÓN VÀ NGUỒN GỐC (ORIGINATES FROM)',
              cognitiveFunction: '1. Món ăn yêu thích của bạn là gì và có nguồn gốc từ đâu?',
              content: 'My favorite dish is Bun Bo, which originates from Hue, a famous city in central Vietnam.',
              bandLevel: 'Band 3.0 → 3.5',
              pedagogyNote: 'Bám sát câu hỏi 1 bài tập 2.1: Dùng cụm từ bắt buộc "originates from" (có nguồn gốc từ).',
              flipCard: {
                frontText: 'I like Bun Bo. It from Hue. (Nói cộc lốc)',
                backText: 'My favorite dish is Bun Bo, which originates from Hue. (Chuẩn giáo trình)',
                explanation: 'Dùng cụm "originates from Hue" thay vì dịch thô "it from Hue".'
              },
              vowelHighlight: [
                { word: 'chocolates', phonetic: '/ˈtʃɒk.ləts/', vowelSound: 'Trọng âm từ chính' },
                { word: 'birthday', phonetic: '/ˈbɜːθ.deɪ/', vowelSound: 'Trọng âm từ phụ' }
              ]
            },
            {
              step: 2,
              label: 'BƯỚC 2: NƯỚC DÙNG ĐẬM ĐÀ (FLAVORFUL BROTH)',
              cognitiveFunction: '2. Hương vị và nước dùng của món này có gì đặc sắc?',
              content: 'I really love this dish because they serve a flavorful broth with tender sliced beef and fresh herbs.',
              bandLevel: 'Band 3.5 → 4.0',
              pedagogyNote: 'Sử dụng 2 từ vựng bắt buộc: "serve" (phục vụ) và "broth" (nước dùng đậm đà).',
              flipCard: {
                frontText: 'Soup is very delicious. (Dùng từ soup chung chung)',
                backText: 'They serve a flavorful broth with sliced beef and fresh herbs. (Đúng từ chuyên ngành ẩm thực)',
                explanation: 'Nước dùng của món nước như phở/bún bò trong tiếng Anh dùng "broth", không dùng "soup".'
              }
            },
            {
              step: 3,
              label: 'BƯỚC 3: GIÁ CẢ PHẢI CHĂNG (AFFORDABLE)',
              cognitiveFunction: '3. Giá cả của món ăn này như thế nào?',
              content: 'Although it is a complicated dish to cook at home, it is very affordable for everyone.',
              bandLevel: 'Band 4.0 → 4.5',
              pedagogyNote: 'Luyện 2 từ vựng bắt buộc tiếp theo: "complicated" (nấu phức tạp) và "affordable" (giá cả phải chăng).',
              flipCard: {
                frontText: 'It is cheap so I eat. Cook is hard. (Tiếng bồi)',
                backText: 'Although it is complicated to cook, it is very affordable for everyone. (Nối câu mượt mà)',
                explanation: 'Thay "cheap" bằng "affordable" (hợp túi tiền) và "hard" bằng "complicated" (chế biến công phu).'
              },
              branchOptions: [
                {
                  branchName: 'ĂN TIỆM VÌ NẤU PHỨC TẠP (BÁM SÁT SÁCH)',
                  content: 'Since it is a complicated dish to cook, I usually eat it at some local eateries near my house.',
                  note: 'Trích nguyên văn lời kể trong đoạn văn về Bún Bò.'
                },
                {
                  branchName: 'ĂN THƯỜNG XUYÊN VÌ GIÁ RẺ (VÍ DỤ BÀI TẬP)',
                  content: 'Because this dish is delicious and affordable, I often eat it for breakfast almost every morning.',
                  note: 'Trích từ câu có lý do số 1 trong bài tập.'
                }
              ]
            },
            {
              step: 4,
              label: 'BƯỚC 4: QUÁN RUỘT CỦA BẠN (A REGULAR CUSTOMER)',
              cognitiveFunction: '4. Quán quen bạn hay ghé ăn nằm ở đâu?',
              content: 'My favorite eatery serves this dish very quickly, so I have become a regular customer there.',
              bandLevel: 'Band 4.5',
              pedagogyNote: 'Bám sát mẫu câu cuối bài tập: "nhà hàng phục vụ rất ngon nên tôi hay đến" với từ "a regular" (khách quen).',
              flipCard: {
                frontText: 'I always come to this shop. (Đơn sơ)',
                backText: 'They serve delicious food, so I have become a regular customer there. (Chuẩn tự nhiên)',
                explanation: 'Học cụm từ rất hay trong giao tiếp: "a regular customer" (khách quen của quán).'
              }
            }
          ],
          fullMosaicSummary: 'My favorite dish is Bun Bo, which originates from Hue in central Vietnam. I really love this dish because they serve a flavorful broth with tender beef and herbs. Although it is a complicated dish to cook, it is very affordable for everyone, so I have become a regular customer at a local eatery near my house.'
        }
      },
      {
        stageNumber: 2,
        stageType: 'progressive_reveal',
        title: 'Chặng 2: Khảo Sát Thói Quen Ăn Uống (Eating Habits & Preferences - Bài tập 2.2)',
        pedagogicalObjective: 'Làm chủ 4 câu hỏi khảo sát thói quen ẩm thực: Bữa sáng ăn gì -> Biết nấu ăn không -> Món không thích -> Thích đồ ngọt không.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click mở từng bước để học cách trả lời các câu hỏi về thói quen ăn uống hằng ngày:',
          cards: [
            {
              step: 1,
              label: 'BƯỚC 1: BỮA SÁNG THƯỜNG ĂN GÌ (BREAKFAST)',
              cognitiveFunction: '1. Bạn thường ăn món gì vào bữa sáng?',
              content: 'For breakfast, I usually have a bowl of noodles or a Vietnamese banh mi on my way to work.',
              bandLevel: 'Band 3.0 → 3.5',
              pedagogyNote: 'Bám sát câu hỏi 1 bài tập 2.2: "What do you usually have for breakfast?".',
              flipCard: {
                frontText: 'Morning I eat bread. (Cộc lốc)',
                backText: 'For breakfast, I usually have a banh mi on my way to work. (Tự nhiên)',
                explanation: 'Dùng cụm mở đầu: "For breakfast, I usually have..." và "on my way to work" (trên đường đi làm).'
              },
              vowelHighlight: [
                { word: 'coffee', phonetic: '/ˈkɒf.i/', vowelSound: 'Nhấn âm 1' },
                { word: 'delicious', phonetic: '/dɪˈlɪʃ.əs/', vowelSound: 'Nhấn âm 2' }
              ]
            },
            {
              step: 2,
              label: 'BƯỚC 2: KHẢ NĂNG NẤU NƯỚNG (KNOW HOW TO COOK)',
              cognitiveFunction: '2. Bạn có biết nấu ăn không?',
              content: 'I know how to cook some simple home dishes, but I am definitely not a good chef.',
              bandLevel: 'Band 3.5 → 4.0',
              pedagogyNote: 'Bám sát câu hỏi 2 bài tập 2.2: "Do you know how to cook?".',
              flipCard: {
                frontText: 'I can cook simple. (Tiếng bồi)',
                backText: 'I know how to cook some simple home dishes. (Đúng ngữ pháp)',
                explanation: 'Cấu trúc chuẩn: "know how to cook + [món ăn]" (biết cách nấu ăn).'
              }
            },
            {
              step: 3,
              label: 'BƯỚC 3: MÓN KHÔNG THÍCH HOẶC DỊ ỨNG (DISLIKES)',
              cognitiveFunction: '3. Có món ăn nào bạn không thích hoặc không ăn được không?',
              content: 'There are a few things that I cannot stand, especially raw seafood and overly greasy food.',
              bandLevel: 'Band 4.0 → 4.5',
              pedagogyNote: 'Bám sát câu hỏi 3 bài tập 2.2 và bài đọc 1.2: "raw seafood" (hải sản sống / sashimi) và "greasy food" (đồ nhiều dầu mỡ).',
              flipCard: {
                frontText: 'I do not like fish not cook. (Dịch từng chữ)',
                backText: 'I cannot stand raw seafood and overly greasy food. (Nâng cấp +0.5)',
                explanation: 'Dùng cụm "cannot stand" (không chịu được) và từ "raw seafood" (hải sản tươi sống).'
              },
              branchOptions: [
                {
                  branchName: 'KHÔNG THÍCH HẢI SẢN SỐNG & ĐỒ DẦU MỠ',
                  content: 'There are a few things that I cannot stand, especially raw seafood and overly greasy food.',
                  note: 'Ý bám sát câu hỏi về sashimi trong phần phát âm.'
                },
                {
                  branchName: 'KHÔNG ĂN ĐƯỢC CAY (SPICY FOOD)',
                  content: 'I cannot eat spicy food because my stomach is quite sensitive to hot chili.',
                  note: 'Lý do không ăn được cay rất phổ biến và gần gũi.'
                }
              ]
            },
            {
              step: 4,
              label: 'BƯỚC 4: SỞ THÍCH ĐỒ NGỌT (SWEETS & BOBA TEA)',
              cognitiveFunction: '4. Bạn có thích ăn đồ ngọt hay uống trà sữa không?',
              content: 'I used to drink a lot of boba milk tea, but now I prefer drinking fresh water to stay healthy.',
              bandLevel: 'Band 4.5',
              pedagogyNote: 'Bám sát câu hỏi 4 và câu luyện câu 1.2: "drink coffee than boba tea". Dùng cấu trúc "used to" (đã từng).',
              flipCard: {
                frontText: 'I like milk tea very much. (Đơn sơ)',
                backText: 'I used to drink a lot of boba milk tea, but now I drink water to stay healthy. (Mạch lạc)',
                explanation: 'Ôn lại cấu trúc "used to + V" đã học để so sánh thói quen quá khứ và hiện tại.'
              }
            }
          ],
          fullMosaicSummary: 'For breakfast, I usually have a bowl of noodles or a banh mi on my way to work. I know how to cook some simple home dishes, but I cannot stand raw seafood or greasy food. I used to drink a lot of milk tea, but now I drink fresh water to stay healthy.'
        }
      },
      {
        stageNumber: 3,
        stageType: 'progressive_reveal',
        title: 'Chặng 3: Đóng Vai Gọi Món Tại Nhà Hàng (Ordering Food - Activity 3)',
        pedagogicalObjective: 'Làm chủ mẫu hội thoại chuẩn khi đi ăn nhà hàng: Chào hỏi -> Gọi món chính & đồ uống ("I would like...") -> Hỏi gợi ý -> Thanh toán tổng tiền.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click mở từng bước để học cách gọi món tại nhà hàng chuẩn mực:',
          cards: [
            {
              step: 1,
              label: 'BƯỚC 1: BỒI BÀN HỎI GỌI MÓN (MAY I TAKE YOUR ORDER?)',
              cognitiveFunction: '1. Người phục vụ mở lời như thế nào?',
              content: 'Good evening! Welcome to our restaurant. May I take your order now?',
              bandLevel: 'Band 3.0 → 3.5',
              pedagogyNote: 'Nguyên văn mẫu câu điền từ trong bài tập 3: "Good evening. [May] I take your order?".',
              flipCard: {
                frontText: 'What you want to eat? (Quá suồng sã)',
                backText: 'Good evening. May I take your order? (Chuẩn mực nhà hàng)',
                explanation: 'Mẫu câu phục vụ nhà hàng chuẩn: "May I take your order?" (Tôi có thể nhận gọi món chưa ạ?).'
              }
            },
            {
              step: 2,
              label: 'BƯỚC 2: KHÁCH HÀNG GỌI MÓN (I WOULD LIKE...)',
              cognitiveFunction: '2. Khách hàng gọi món chính một cách lịch sự ra sao?',
              content: 'Yes, please. I would like a bowl of beef noodles and a glass of fresh orange juice.',
              bandLevel: 'Band 3.5 → 4.0',
              pedagogyNote: 'Bám sát mẫu điền từ của khách: "Yes, I\'d like [Dish name]".',
              flipCard: {
                frontText: 'Give me beef noodle. (Nói cộc lốc)',
                backText: "Yes, please. I would like a bowl of beef noodles. (Chuẩn lịch sự)",
                explanation: 'Gọi món bằng tiếng Anh bắt buộc dùng "I would like..." hoặc "I\'d like...", không dùng "give me".'
              }
            },
            {
              step: 3,
              label: 'BƯỚC 3: BỒI BÀN HỎI THÊM & GỢI Ý (ANYTHING ELSE?)',
              cognitiveFunction: '3. Phục vụ hỏi dùng thêm món phụ hoặc tráng miệng gì không?',
              content: 'Would you like some dessert as well? We have freshly baked chocolate cakes today.',
              bandLevel: 'Band 4.0 → 4.5',
              pedagogyNote: 'Mẫu câu trong bài tập: "Would you like [Dessert]?" và "Anything else?".',
              flipCard: {
                frontText: 'You want cake? (Đơn sơ)',
                backText: 'Would you like some dessert as well? We have fresh chocolate cakes. (Chuyên nghiệp)',
                explanation: 'Cấu trúc mời dùng thêm món: "Would you like some [món ăn] as well?".'
              },
              branchOptions: [
                {
                  branchName: 'GỌI THÊM BÁNH TRÁNG MIỆNG (DESSERT)',
                  content: 'That sounds lovely! I would also like a slice of chocolate cake, please.',
                  note: 'Khách đồng ý gọi thêm bánh tráng miệng.'
                },
                {
                  branchName: 'TỪ CHỐI LỊCH SỰ (THAT IS ALL)',
                  content: "That's all for now, thank you. Could you please bring the bill?",
                  note: 'Trích câu mẫu chốt trong bài: "That\'s all, thank you".'
                }
              ]
            },
            {
              step: 4,
              label: 'BƯỚC 4: TỔNG TIỀN THANH TOÁN (YOUR TOTAL IS...)',
              cognitiveFunction: '4. Phục vụ thông báo tổng tiền hóa đơn bao nhiêu?',
              content: 'Certainly! Your total is one hundred and fifty thousand dong. Thank you and enjoy your meal!',
              bandLevel: 'Band 4.5',
              pedagogyNote: 'Mẫu câu kết bài tập 3: "Your total is [Amount]. Enjoy your meal!".',
              flipCard: {
                frontText: 'All is 150.000 dong. (Tiếng bồi)',
                backText: 'Your total is 150,000 dong. Enjoy your meal! (Chuẩn nhà hàng)',
                explanation: 'Thông báo hóa đơn chuẩn: "Your total is [số tiền]".'
              }
            }
          ],
          fullMosaicSummary: "Good evening, welcome to our restaurant. May I take your order? Yes, please. I would like a bowl of beef noodles and a glass of fresh orange juice. Would you like some dessert as well? That's all for now, thank you. Certainly, your total is 150,000 dong. Enjoy your meal!"
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
    subtitle: 'Đối Chiếu Bản Thể Nội Dung & 7 Bẫy Nhận Thức YouTube Stars',
    coreCompetency: 'Đối chiếu lý do thành công của các ngôi sao mạng xã hội (Khoai Lang Thang / YouTube content creators) dựa trên tính chân thực (Authenticity vs PR Staged Images) để phân biệt bẫy thế hệ (Millennials / Gen Z vs Older Generations) và bẫy phạm vi chuyên môn.',
    bridgeToHomework: {
      promptText: 'Làm bài đọc hiểu về sức hút của YouTube stars đối với giới trẻ trong Homework W9D2.',
      targetExamId: 'exam_dreamer_w9d2'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'verification_scale',
        title: 'Câu 1 (T/F/NG): Khớp Ý Sự Lên Ngôi Của Mạng Xã Hội (declining TV vs rise of social media)',
        pedagogicalObjective: 'Đối chiếu dữ kiện sự trỗi dậy của mạng xã hội song hành với sự suy giảm mức độ phổ biến của truyền hình.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Bấm Radar quét bối cảnh thay đổi phương tiện truyền thông ở Đoạn 1:',
          passageContext: {
            title: 'Why YouTube stars influence millennials more than traditional celebrities',
            paragraphs: [
              {
                id: 'p1',
                label: 'Đoạn 1 · Sự thoái trào của truyền hình và lên ngôi của YouTube',
                text: 'For many decades, television was the primary medium where people consumed news and entertainment. But the rise of social media, the declining popularity of TV, and people\'s distaste for advertising has redefined the word "celebrity."'
              }
            ],
            targetParagraphId: 'p1',
            targetSnippet: 'the rise of social media, the declining popularity of TV'
          },
          statement: {
            rawText: '1. Social media is now more popular than television.',
            deconstructedVariables: [
              { name: 'medium_A', text: 'Social media' },
              { name: 'comparison', text: 'is now more popular than' },
              { name: 'medium_B', text: 'television' }
            ]
          },
          passageEvidence: {
            rawText: 'the rise of social media, the declining popularity of TV, and people\'s distaste for advertising has redefined the word "celebrity."',
            targetVariables: [
              { matchingName: 'comparison', text: 'the rise of social media vs the declining popularity of TV (mạng xã hội lên ngôi, TV suy giảm phổ biến)' }
            ]
          },
          expectedRelation: 'match',
          verdict: 'TRUE',
          pedagogicalInsight: 'TRUE! Đoạn văn khẳng định sự trỗi dậy của mạng xã hội ("the rise of social media") đi liền với sự sụt giảm độ phổ biến của truyền hình ("declining popularity of TV"), đồng nghĩa mạng xã hội hiện nay đã phổ biến hơn TV.'
        }
      },
      {
        stageNumber: 2,
        stageType: 'verification_scale',
        title: 'Câu 2 (T/F/NG): Khớp Ý Người Bình Thường Tạo Xu Hướng (ordinary people setting trends)',
        pedagogicalObjective: 'Đối chiếu nhận định: giờ đây chính những con người bình thường trên YouTube là người tạo xu hướng và dẫn dắt quan điểm.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Bấm Radar quét vai trò của người sáng tạo nội dung ở Đoạn 1:',
          passageContext: {
            title: 'Why YouTube stars influence millennials more than traditional celebrities',
            paragraphs: [
              {
                id: 'p1',
                label: 'Đoạn 1 · Định nghĩa lại từ "người nổi tiếng"',
                text: 'Now it is the ordinary people who are setting the trends and driving opinions, and they are doing it on YouTube.'
              }
            ],
            targetParagraphId: 'p1',
            targetSnippet: 'ordinary people who are setting the trends and driving opinions, and they are doing it on YouTube'
          },
          statement: {
            rawText: '2. Normal people on YouTube today can create trends and shape others\' opinions.',
            deconstructedVariables: [
              { name: 'actors', text: 'Normal people on YouTube' },
              { name: 'influence_action', text: 'can create trends and shape others\' opinions' }
            ]
          },
          passageEvidence: {
            rawText: 'Now it is the ordinary people who are setting the trends and driving opinions, and they are doing it on YouTube.',
            targetVariables: [
              { matchingName: 'influence_action', text: 'ordinary people setting the trends and driving opinions (người bình thường tạo trend và định hình quan điểm)' }
            ]
          },
          expectedRelation: 'match',
          verdict: 'TRUE',
          pedagogicalInsight: 'TRUE! Cụm từ "ordinary people ... setting the trends and driving opinions" trong bài đọc trùng khớp 100% với "normal people ... create trends and shape others\' opinions" của đề bài.'
        }
      },
      {
        stageNumber: 3,
        stageType: 'verification_scale',
        title: 'Câu 3 (T/F/NG): Bẫy Động Thái Của Doanh Nghiệp (businesses not taken any steps?)',
        pedagogicalObjective: 'Bóc trần mâu thuẫn giữa việc khẳng định doanh nghiệp chưa có động thái gì với thực tế họ đang chuyển hướng mạnh mẽ sang hợp tác với YouTubers.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Bấm Radar quét phản ứng của các nhãn hàng ở Đoạn 4:',
          passageContext: {
            title: 'Why YouTube stars influence millennials more than traditional celebrities',
            paragraphs: [
              {
                id: 'p4',
                label: 'Đoạn 4 · Động thái chuyển dịch ngân sách của doanh nghiệp',
                text: 'Businesses are taking notice and turning more to ordinary people than mainstream celebrities to reach millennials. Interestingly, the influence of YouTube stars on younger people goes well beyond shopping.'
              }
            ],
            targetParagraphId: 'p4',
            targetSnippet: 'Businesses are taking notice and turning more to ordinary people than mainstream celebrities'
          },
          statement: {
            rawText: '3. Businesses have not taken any steps to take advantage of the increasing popularity of YouTubers.',
            deconstructedVariables: [
              { name: 'subject', text: 'Businesses' },
              { name: 'negative_claim', text: 'have not taken any steps (chưa hề có bất kỳ động thái nào)', isTrapWord: true },
              { name: 'purpose', text: 'to take advantage of the popularity of YouTubers' }
            ]
          },
          passageEvidence: {
            rawText: 'Businesses are taking notice and turning more to ordinary people than mainstream celebrities to reach millennials.',
            targetVariables: [
              { matchingName: 'negative_claim', text: 'Businesses are taking notice and turning more to ordinary people (doanh nghiệp đang chú ý và chuyển hướng sang hợp tác)' }
            ]
          },
          expectedRelation: 'contradiction',
          verdict: 'FALSE',
          pedagogicalInsight: 'FALSE vì các doanh nghiệp đang chủ động chuyển hướng hợp tác với các nhà sáng tạo nội dung bình thường ("turning more to ordinary people"), mâu thuẫn trực tiếp với câu phủ định "have not taken any steps" của đề bài!'
        }
      },
      {
        stageNumber: 4,
        stageType: 'verification_scale',
        title: 'Câu 4 (T/F/NG): Khớp Ý Sẵn Sàng Bàn Luận Đề Tài Nhạy Cảm (not afraid = not hesitate)',
        pedagogicalObjective: 'Đối chiếu từ đồng nghĩa: "not afraid to talk openly about touchy matters" đồng nghĩa với "not hesitate about discussing sensitive topics".',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Bấm Radar quét đặc điểm tương tác cởi mở của YouTubers trong Mục 1:',
          passageContext: {
            title: 'Why YouTube stars influence millennials more than traditional celebrities',
            paragraphs: [
              {
                id: 'p5',
                label: 'Mục 1 · Sự gần gũi và không ngại chủ đề nhạy cảm',
                text: 'They are not afraid to be funny, weird, or talk openly about very touchy and personal matters such as sex, divorce, domestic violence, and racism.'
              }
            ],
            targetParagraphId: 'p5',
            targetSnippet: 'not afraid to ... talk openly about very touchy and personal matters'
          },
          statement: {
            rawText: '4. YouTubers may not hesitate about discussing sensitive topics.',
            deconstructedVariables: [
              { name: 'subject', text: 'YouTubers' },
              { name: 'attitude_action', text: 'may not hesitate about discussing sensitive topics (không ngần ngại thảo luận chủ đề nhạy cảm)' }
            ]
          },
          passageEvidence: {
            rawText: 'They are not afraid to be funny, weird, or talk openly about very touchy and personal matters.',
            targetVariables: [
              { matchingName: 'attitude_action', text: 'not afraid to talk openly about very touchy matters (không sợ bàn luận công khai các vấn đề nhạy cảm)' }
            ]
          },
          expectedRelation: 'match',
          verdict: 'TRUE',
          pedagogicalInsight: 'TRUE! Cụm từ "not afraid to talk openly about very touchy matters" trong bài đọc đồng nghĩa hoàn toàn với "not hesitate about discussing sensitive topics" trong đề bài.'
        }
      },
      {
        stageNumber: 5,
        stageType: 'verification_scale',
        title: 'Câu 5 (T/F/NG): Bẫy Phạm Vi Mẫu Khảo Sát (top 25 YouTube stars vs all YouTubers)',
        pedagogicalObjective: 'Phát hiện sự khái quát hóa: số liệu gấp 3 lần view và 12 lần comment chỉ áp dụng cho TOP 25 YouTubers, chứ không phải toàn bộ YouTubers nói chung.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Bấm Radar quét dữ liệu tương tác của Google chia sẻ trong Mục 2:',
          passageContext: {
            title: 'Why YouTube stars influence millennials more than traditional celebrities',
            paragraphs: [
              {
                id: 'p6',
                label: 'Mục 2 · Thống kê số lượt xem và bình luận',
                text: 'Compared to videos created by mainstream celebrities, videos created by the top 25 YouTube stars have three times more views, 12 times more comments, and twice as many actions (likes, shares, clicks, etc.).'
              }
            ],
            targetParagraphId: 'p6',
            targetSnippet: 'videos created by the top 25 YouTube stars have three times more views, 12 times more comments'
          },
          statement: {
            rawText: '5. It is found that YouTubers enjoy three times more views and 12 times more comments in their videos compared to mainstream celebrities\'.',
            deconstructedVariables: [
              { name: 'scope_subject', text: 'YouTubers (toàn bộ YouTubers nói chung)', isTrapWord: true },
              { name: 'metric', text: 'three times more views and 12 times more comments' }
            ]
          },
          passageEvidence: {
            rawText: 'Compared to videos created by mainstream celebrities, videos created by the top 25 YouTube stars have three times more views, 12 times more comments.',
            targetVariables: [
              { matchingName: 'scope_subject', text: 'chỉ áp dụng riêng cho TOP 25 YouTube stars, KHÔNG PHẢI tất cả YouTubers' }
            ]
          },
          expectedRelation: 'contradiction',
          verdict: 'FALSE',
          pedagogicalInsight: 'FALSE vì thống kê "3 lần views và 12 lần comments" chỉ là con số của nhóm "top 25 YouTube stars" hàng đầu, chứ không phải của mọi YouTuber nói chung như đề bài đã khái quát hóa bừa bãi!'
        }
      },
      {
        stageNumber: 6,
        stageType: 'verification_scale',
        title: 'Câu 6 (T/F/NG): Bẫy Danh Xưng Chuyên Gia (experts in many fields?)',
        pedagogicalObjective: 'Phát hiện sự suy diễn: thiếu niên lắng nghe ý kiến của YouTubers lớn tuổi để hình thành quan điểm, nhưng bài KHÔNG hề nói các YouTubers này là "chuyên gia" (experts).',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Bấm Radar quét nghiên cứu của Đại học Twente trong Mục 3:',
          passageContext: {
            title: 'Why YouTube stars influence millennials more than traditional celebrities',
            paragraphs: [
              {
                id: 'p7',
                label: 'Mục 3 · Nghiên cứu về thanh thiếu niên của Đại học Twente',
                text: 'a number of respondents admitted that they are interested "in what older YouTubers have to say about things" as it helps them to shape their own opinions and worldview on certain things such as design, beauty, games, relationships, and conflict management.'
              }
            ],
            targetParagraphId: 'p7',
            targetSnippet: 'interested in what older YouTubers have to say ... helps them to shape their own opinions and worldview'
          },
          statement: {
            rawText: '6. YouTube stars are experts in many fields including design, beauty, games, relationships, and conflict management.',
            deconstructedVariables: [
              { name: 'subject', text: 'YouTube stars' },
              { name: 'expertise_claim', text: 'are experts in many fields (là chuyên gia trong nhiều lĩnh vực)', isTrapWord: true }
            ]
          },
          passageEvidence: {
            rawText: 'Bài đọc chỉ cho biết giới trẻ lắng nghe góc nhìn của YouTubers lớn tuổi ("what older YouTubers have to say") để giúp họ tự hình thành nhân sinh quan. Bài viết KHÔNG hề có bất kỳ câu từ nào chứng nhận YouTubers là "chuyên gia" ("experts") trong các lĩnh vực này.',
            targetVariables: [
              { matchingName: 'expertise_claim', text: 'KHÔNG CÓ DANH XƯNG "CHUYÊN GIA" (EXPERTS)' }
            ]
          },
          expectedRelation: 'no_evidence',
          verdict: 'NOT GIVEN',
          pedagogicalInsight: 'NOT GIVEN vì bài đọc chỉ nêu các bạn trẻ thích nghe chia sẻ của YouTubers để tham khảo ("shape their own worldview"), chứ tác giả hoàn toàn không khẳng định YouTubers là "chuyên gia" (experts) trong các lĩnh vực đó!'
        }
      },
      {
        stageNumber: 7,
        stageType: 'verification_scale',
        title: 'Câu 7 (T/F/NG): Bẫy Mâu Thuẫn Thế Hệ (fall flat with older generations)',
        pedagogicalObjective: 'Bóc trần mâu thuẫn trực diện giữa đề bài khẳng định có sức ảnh hưởng lớn tới người già với thực tế bài đọc nói "fall flat" (không có tác dụng).',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Bấm Radar quét thái độ của thế hệ lớn tuổi ở Đoạn kết bài:',
          passageContext: {
            title: 'Why YouTube stars influence millennials more than traditional celebrities',
            paragraphs: [
              {
                id: 'p8',
                label: 'Đoạn kết · Sự khác biệt với các thế hệ lớn tuổi',
                text: 'The influence of YouTube stars may fall flat with older generations, who remain less exposed to YouTube culture and prefer traditional media such as TV and newspapers.'
              }
            ],
            targetParagraphId: 'p8',
            targetSnippet: 'The influence of YouTube stars may fall flat with older generations'
          },
          statement: {
            rawText: '7. YouTube stars also have a great influence on the older generations.',
            deconstructedVariables: [
              { name: 'subject', text: 'YouTube stars' },
              { name: 'influence_level', text: 'have a great influence on the older generations', isTrapWord: true }
            ]
          },
          passageEvidence: {
            rawText: 'The influence of YouTube stars may fall flat with older generations, who remain less exposed to YouTube culture and prefer traditional media.',
            targetVariables: [
              { matchingName: 'influence_level', text: 'may fall flat with older generations (hoàn toàn không có tác dụng với thế hệ già)' }
            ]
          },
          expectedRelation: 'contradiction',
          verdict: 'FALSE',
          pedagogicalInsight: 'FALSE vì thành ngữ "fall flat with older generations" có nghĩa là không hề tạo được ảnh hưởng hay hứng thú với người già, mâu thuẫn 100% với khẳng định "have a great influence" của đề bài!'
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
    title: 'The Hobbies & Tense Flow Engine (Topic: Hobbies & Interests)',
    subtitle: 'Nói Về Sở Thích & Sự Thay Đổi Theo Thời Gian: Từ Câu Cụt 3.0 Lên Bài Nói 4.0 - 4.5',
    coreCompetency: 'Chuẩn hóa đầu ra khóa Dreamer (3.0 → 4.0+): Học viên hoàn thiện khả năng ngắt cụm từ (Chunking / Grouping words), phát triển ý mạch lạc theo mô hình "Reasons - Results - Benefits" ("helps me expand knowledge", "allows me to relax and refresh my mind"), và phối hợp mượt mà 3 thì (Past "used to" - Present "nowadays" - Future "in the future I would like to...").',
    bridgeToHomework: {
      promptText: 'Thu âm bài nói tốt nghiệp khóa Dreamer chia sẻ về sự thay đổi sở thích cá nhân qua các giai đoạn trong Homework W9D3.',
      targetExamId: 'exam_dreamer_w9d3'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'progressive_reveal',
        title: 'Chặng 1: Phát Triển Ý Sở Thích Bằng "Reasons - Results" (Activity 2.1)',
        pedagogicalObjective: 'Làm chủ mẫu câu bài tập 2.1: "In my free time, I am really into... because it helps me... Besides, it also enables me to... so I always try to...".',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click mở từng bước để học cách mở rộng câu trả lời về sở thích bằng Lý do và Kết quả:',
          cards: [
            {
              step: 1,
              label: 'BƯỚC 1: NÊU SỞ THÍCH & LỢI ÍCH 1 (EXPAND MY KNOWLEDGE)',
              cognitiveFunction: '1. Bạn thích làm gì trong thời gian rảnh và nó mang lại lợi ích gì?',
              content: 'In my free time, I am really into reading books because it helps me expand my knowledge on different topics.',
              bandLevel: 'Band 3.0 → 3.5',
              pedagogyNote: 'Nguyên văn câu điền từ bài tập 2.1: "I\'m really into reading books because it helps me expand my knowledge".',
              flipCard: {
                frontText: 'Free time I like read book. (Tiếng bồi)',
                backText: 'In my free time, I am really into reading books because it helps me expand my knowledge. (Chuẩn giáo trình)',
                explanation: 'Dùng cụm hay: "be really into + V-ing" (rất say mê) và "expand my knowledge" (mở rộng kiến thức).'
              },
              vowelHighlight: [
                { word: 'refrigeration', phonetic: '/rɪˌfrɪdʒ.əˈreɪ.ʃən/', vowelSound: '5 âm tiết rõ ràng' },
                { word: 'interests', phonetic: '/ˈɪn.trəsts/', vowelSound: '/ts/ phát âm đủ đuôi s' }
              ]
            },
            {
              step: 2,
              label: 'BƯỚC 2: LỢI ÍCH BỔ SUNG (REFRESH MY MIND)',
              cognitiveFunction: '2. Sở thích này còn giúp ích gì cho tinh thần của bạn?',
              content: 'Besides, reading books also allows me to relax and refresh my mind after stressful working hours.',
              bandLevel: 'Band 3.5 → 4.0',
              pedagogyNote: 'Bám sát câu điền từ tiếp theo của bài tập 2.1: "allows me to relax and refresh my mind".',
              flipCard: {
                frontText: 'And it good for brain. (Đơn sơ)',
                backText: 'Besides, it allows me to relax and refresh my mind. (Cụm từ đắt giá của bài)',
                explanation: 'Collocation chuẩn trong bài: "refresh my mind" (làm mới và thư thái đầu óc).'
              }
            },
            {
              step: 3,
              label: 'BƯỚC 3: HÀNH ĐỘNG DUY TRÌ THƯỜNG XUYÊN (PRACTICE ROUTINE)',
              cognitiveFunction: '3. Bạn duy trì sở thích đó đều đặn như thế nào?',
              content: 'Therefore, I always try to read at least fifteen minutes every day before going to sleep.',
              bandLevel: 'Band 4.0 → 4.5',
              pedagogyNote: 'Bám sát câu kết trong bài tập: "so I always try to read a few pages a day".',
              flipCard: {
                frontText: 'So I read before sleep. (Cụt ý)',
                backText: 'Therefore, I always try to read at least 15 minutes before going to sleep. (Mạch lạc)',
                explanation: 'Dùng liên từ nối "Therefore" và cụm "try to read at least..." thể hiện tính kỷ luật.'
              },
              branchOptions: [
                {
                  branchName: 'ĐỌC SÁCH 15 PHÚT MỖI NGÀY (BÀI TẬP 2.1)',
                  content: 'Therefore, I always try to read at least fifteen minutes every day before going to sleep.',
                  note: 'Duy trì đọc sách bám sát bài tập mẫu.'
                },
                {
                  branchName: 'NGHE PODCAST TIẾNG ANH (VÍ DỤ BÀI TẬP 2.1)',
                  content: 'Therefore, I enjoy listening to English podcasts every morning to gain new insights and inspiration.',
                  note: 'Trích ví dụ bài tập: "listening to podcasts to gain new insights and inspiration".'
                }
              ]
            },
            {
              step: 4,
              label: 'BƯỚC 4: KẾT QUẢ TỔNG THỂ (MAKE PROGRESS)',
              cognitiveFunction: '4. Sở thích này mang lại sự thay đổi tích cực gì cho bạn?',
              content: 'This healthy routine not only keeps me calm, but also helps me make continuous progress in life.',
              bandLevel: 'Band 4.5',
              pedagogyNote: 'Khép lại bài nói bằng từ vựng của khóa học: "make continuous progress" (không ngừng tiến bộ).',
              flipCard: {
                frontText: 'It make me good person. (Dịch thô)',
                backText: 'This routine helps me make continuous progress in life. (Chuẩn tự nhiên)',
                explanation: 'Ôn lại cụm "make progress" (tiến bộ) đã rèn luyện ở Tuần 5.'
              }
            }
          ],
          fullMosaicSummary: 'In my free time, I am really into reading books because it helps me expand my knowledge on different topics. Besides, reading books also allows me to relax and refresh my mind after stressful hours. Therefore, I always try to read at least fifteen minutes every day, which helps me make continuous progress in life.'
        }
      },
      {
        stageNumber: 2,
        stageType: 'progressive_reveal',
        title: 'Chặng 2: Sự Thay Đổi Sở Thích Qua Các Thời Kỳ (How Hobbies Changed - Activity 2.2)',
        pedagogicalObjective: 'Làm chủ bài tập 2.2: Phối hợp 3 thì: Quá khứ ("used to spend hours playing games -> lost interest") -> Hiện tại ("nowadays pursue reading books") -> Tương lai ("in the future think about taking up guitar").',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click mở từng bước để học cách phối hợp 3 thì Quá khứ - Hiện tại - Tương lai khi nói về sở thích:',
          cards: [
            {
              step: 1,
              label: 'BƯỚC 1: SỞ THÍCH THỜI THƠ ẤU (WHEN I WAS YOUNG, I USED TO...)',
              cognitiveFunction: '1. Thời nhỏ bạn thường làm gì và sau này có còn làm không?',
              content: 'When I was young, I used to spend hours a day playing computer games as a way to relax.',
              bandLevel: 'Band 3.0 → 3.5',
              pedagogyNote: 'Nguyên văn câu 1 bài tập 2.2: "When I was young, I used to spend hours a day playing computer games...".',
              flipCard: {
                frontText: 'When young, I played game many hours. (Đơn sơ)',
                backText: 'When I was young, I used to spend hours a day playing computer games. (Chuẩn giáo trình)',
                explanation: 'Dùng cấu trúc "used to + V nguyên mẫu" chỉ thói quen trong quá khứ đã chấm dứt.'
              },
              vowelHighlight: [
                { word: 'practiced', phonetic: '/ˈpræk.tɪst/', vowelSound: '/t/ âm ed đuôi không rung' },
                { word: 'decided', phonetic: '/dɪˈsaɪ.dɪd/', vowelSound: '/ɪd/ âm ed sau âm d' }
              ]
            },
            {
              step: 2,
              label: 'BƯỚC 2: MẤT HỨNG THÚ THEO THỜI GIAN (LOST INTEREST)',
              cognitiveFunction: '2. Khi lớn lên, cảm nhận của bạn về trò chơi đó thay đổi ra sao?',
              content: 'However, as I got older, I gradually lost interest in gaming and rarely play anymore.',
              bandLevel: 'Band 3.5 → 4.0',
              pedagogyNote: 'Nguyên văn vế 2 câu 1 bài tập 2.2: "as I got older, I lost interest in this hobby and rarely do so anymore".',
              flipCard: {
                frontText: 'When older, I not like game anymore. (Tiếng bồi)',
                backText: 'As I got older, I lost interest in gaming and rarely play anymore. (Rất tự nhiên)',
                explanation: 'Collocation đắt giá trong bài: "lose interest in + V-ing" (mất dần hứng thú với cái gì).'
              }
            },
            {
              step: 3,
              label: 'BƯỚC 3: SỞ THÍCH HIỆN TẠI (NOWADAYS I AM PURSUING...)',
              cognitiveFunction: '3. Hiện nay bạn đang theo đuổi sở thích lành mạnh nào?',
              content: "Nowadays, I'm pursuing many new habits, but my favorite one is reading books for 15 minutes a day.",
              bandLevel: 'Band 4.0 → 4.5',
              pedagogyNote: 'Nguyên văn câu 2 bài tập 2.2: "Nowadays, I\'m pursuing many new hobbies, but my favorite one is...".',
              flipCard: {
                frontText: 'Now I read books everyday. (Quá bình thường)',
                backText: "Nowadays, I'm pursuing many new hobbies, especially reading books. (Chuẩn bài học)",
                explanation: 'Động từ chuẩn: "pursue a hobby" (theo đuổi một sở thích lành mạnh).'
              },
              branchOptions: [
                {
                  branchName: 'ĐỌC SÁCH PHÁT TRIỂN BẢN THÂN (BÀI TẬP 2.2)',
                  content: "Nowadays, I'm pursuing many new hobbies, but my favorite one is reading books to expand my knowledge.",
                  note: 'Theo đúng kịch bản đoạn văn trong sách.'
                },
                {
                  branchName: 'TẬP THỂ DỤC THỂ THAO (BÀI HỌC TUẦN 4)',
                  content: "Nowadays, I'm pursuing fitness workouts at the gym to stay in shape and stay active.",
                  note: 'Kết hợp từ vựng giữ dáng ở Tuần 4.'
                }
              ]
            },
            {
              step: 4,
              label: 'BƯỚC 4: DỰ ĐỊNH TƯƠNG LAI (IN THE FUTURE, TAKING UP GUITAR)',
              cognitiveFunction: '4. Trong tương lai, bạn dự định bắt đầu một sở thích mới nào?',
              content: "In the future, I have been thinking about taking up the guitar because I love music and singing for my friends.",
              bandLevel: 'Band 4.5',
              pedagogyNote: 'Nguyên văn câu 3 bài tập 2.2: "In the future, I\'ve been thinking about taking up a new hobby... playing guitar...".',
              flipCard: {
                frontText: 'Later I want learn guitar. (Cụt ý)',
                backText: 'In the future, I am thinking about taking up the guitar to sing for my friends. (Nâng tầm +0.5)',
                explanation: 'Học cụm phrasal verb tuyệt vời: "take up a new hobby / instrument" (bắt đầu học một sở thích/nhạc cụ).'
              }
            }
          ],
          fullMosaicSummary: 'When I was young, I used to spend hours a day playing computer games as a way to relax. However, as I got older, I lost interest in gaming. Nowadays, I am pursuing new hobbies like reading books, and in the future, I am thinking about taking up the guitar because I love singing for my friends.'
        }
      },
      {
        stageNumber: 3,
        stageType: 'progressive_reveal',
        title: 'Chặng 3: Kỹ Thuật Ngắt Cụm Từ Tự Nhiên (Word Grouping & Chunking - Activity 1.3)',
        pedagogicalObjective: 'Làm chủ bài tập 1.3: Ngắt cụm từ (chunking) có nghĩa theo nhịp hơi thở thay vì đọc từng chữ rời rạc, giúp bài nói trôi chảy và dễ hiểu.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click mở từng bước để học cách ngắt cụm từ (Chunking) giúp giọng nói tự nhiên, không ngắt quãng vụn vặt:',
          cards: [
            {
              step: 1,
              label: 'BƯỚC 1: CỤM CHỦ NGỮ & ĐỘNG TỪ CHÍNH (CHUNK 1)',
              cognitiveFunction: '1. Ngắt cụm mở đầu câu như thế nào để người nghe nắm bắt ngay?',
              content: 'Last weekend / I went to a quiet coffee shop with my best friend.',
              bandLevel: 'Band 3.0 → 3.5',
              pedagogyNote: 'Hướng dẫn học viên ngắt cụm: [Last weekend] / [I went to a quiet coffee shop with my best friend]. Không ngắt vụn giữa chừng.',
              flipCard: {
                frontText: 'Last... weekend I... went to... a coffee shop. (Nói giật cục từng chữ)',
                backText: 'Last weekend / I went to a quiet coffee shop with my friend. (Ngắt đúng 2 cụm)',
                explanation: 'Kỹ thuật Chunking: gom cụm trạng ngữ thời gian và cụm hành động chính thành 2 nhịp hơi.'
              }
            },
            {
              step: 2,
              label: 'BƯỚC 2: CỤM MỤC ĐÍCH & HOẠT ĐỘNG (CHUNK 2)',
              cognitiveFunction: '2. Nói cụm mục đích và việc làm liền mạch ra sao?',
              content: 'We sat on the balcony / enjoying delicious milk coffee / and chatting about our study plans.',
              bandLevel: 'Band 3.5 → 4.0',
              pedagogyNote: 'Luyện 3 nhóm từ liền mạch: [We sat on the balcony] / [enjoying delicious milk coffee] / [and chatting about our plans].',
              flipCard: {
                frontText: 'We sat on... balcony and... drink coffee. (Ngắt sai vị trí)',
                backText: 'We sat on the balcony / enjoying milk coffee / and chatting about our plans. (Trôi chảy)',
                explanation: 'Các từ trong mỗi nhóm được phát âm liền nhau như một từ dài, giúp người nghe dễ tiếp thu.'
              }
            },
            {
              step: 3,
              label: 'BƯỚC 3: CỤM MÔ TẢ ĐỒ VẬT (ÁP DỤNG VÍ DỤ TRONG SÁCH)',
              cognitiveFunction: '3. Áp dụng ví dụ sách: Mô tả chiếc áo khoác mới với các chi tiết liền cụm thế nào?',
              content: 'My friend wore a nice new jacket / with a zip down the front / and a lot of pockets.',
              bandLevel: 'Band 4.0 → 4.5',
              pedagogyNote: 'Nguyên văn ví dụ bài tập 1.3: "I bought a nice new jacket / with a zip down the front / and a lot of pockets".',
              flipCard: {
                frontText: 'He wore a nice new / jacket with a zip down the / front. (Ngắt sai quy tắc như sách cảnh báo)',
                backText: 'He wore a nice new jacket / with a zip down the front / and a lot of pockets. (Ngắt chuẩn 100%)',
                explanation: 'Tuyệt đối không ngắt giữa tính từ và danh từ ("new / jacket"), phải ngắt trọn vẹn từng cụm ngữ nghĩa.'
              },
              branchOptions: [
                {
                  branchName: 'MÔ TẢ TRANG PHỤC (VÍ DỤ BÀI TẬP 1.3)',
                  content: 'He wore a nice new jacket / with a zip down the front / and a lot of pockets.',
                  note: 'Nguyên văn câu chuẩn trong bài tập Chunking.'
                },
                {
                  branchName: 'MÔ TẢ KHÔNG GIAN QUÁN CÀ PHÊ (THỰC TẾ)',
                  content: 'The cafe has a lovely garden / with plenty of green trees / and soothing acoustic music.',
                  note: 'Cụm từ tự nhiên miêu tả không gian quán cà phê.'
                }
              ]
            },
            {
              step: 4,
              label: 'BƯỚC 4: CẢM XÚC KẾT NỐI TOÀN BÀI (TỐT NGHIỆP KHÓA DREAMER)',
              cognitiveFunction: '4. Bạn đúc kết được kỹ năng gì quan trọng nhất sau khi hoàn thành khóa Speaking?',
              content: 'Practicing word chunking every day / has really helped me speak English / much more fluently and confidently!',
              bandLevel: 'Band 4.5',
              pedagogyNote: 'Khép lại chặng đường 9 tuần: Học viên tự tin nói tiếng Anh tự nhiên, phát âm rõ ràng, không còn sợ hãi.',
              flipCard: {
                frontText: 'Now I speak English very good. (Tiếng bồi)',
                backText: 'Practicing word chunking / has helped me speak English / fluently and confidently! (Tốt nghiệp Dreamer)',
                explanation: 'Chúc mừng bạn đã làm chủ toàn bộ kỹ năng Speaking của khóa Dreamer đạt chuẩn 4.0 - 4.5!'
              }
            }
          ],
          fullMosaicSummary: 'Last weekend / I went to a quiet coffee shop with my best friend. We sat on the balcony / enjoying delicious milk coffee / and chatting about our study plans. Practicing word chunking every day / has really helped me speak English / much more fluently and confidently!'
        }
      }
    ]
  }
];

