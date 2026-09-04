import { VRSVisualLesson } from '@/types/vrs';

export const vrsMockLessons: VRSVisualLesson[] = [
  {
    id: 'dreamer_w1d1',
    courseId: 'dreamer',
    week: 1,
    day: 1,
    skill: 'writing',
    title: 'Cấu Trúc Câu Cơ Bản (S - V - O)',
    subtitle: 'Lắp ráp mô hình câu & sửa lỗi thừa động từ',
    coreCompetency: 'Nhận diện thành phần Chủ ngữ (S), Động từ (V), Tân ngữ (O) và khắc phục lỗi thừa 2 động từ trong câu.',
    bridgeToHomework: {
      promptText: 'Làm 5 câu bài tập cấu trúc câu trong Homework để kiểm chứng phản xạ tự thân.',
      targetExamId: 'exam_dreamer_w1d1'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'syntax_anatomy',
        title: 'Nhận diện thành phần câu (S - V - O)',
        pedagogicalObjective: 'Nhận diện rõ Chủ ngữ (S), Động từ (V) và Tân ngữ (O) thay vì đọc một dòng chữ dài.',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Bấm phân tích để nhận diện 3 thành phần chính trong câu.',
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
        title: 'Tìm và sửa lỗi sai trong câu',
        pedagogicalObjective: 'Khắc phục lỗi quen miệng dùng 2 động từ chia cùng lúc trong một câu đơn.',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Click vào từ gây ra lỗi sai ngữ pháp trong câu bên dưới.',
          mode: 'break_and_repair',
          tokens: [
            { id: 't1', text: 'The course', role: 'subject', colorClass: 'green' },
            { id: 't2', text: 'helps', role: 'fv_core', colorClass: 'orange' },
            { id: 't3', text: 'students', role: 'object', colorClass: 'blue' },
            { id: 't4', text: 'can write emails', role: 'fv_core', colorClass: 'red' }
          ],
          collisionTarget: {
            conflictingTokenIds: ['t2', 't4'],
            errorMessage: 'Lỗi ngữ pháp: Trong một câu đơn chỉ có 1 động từ chính được chia thì!',
            repairOptions: [
              {
                id: 'opt1',
                action: 'delete',
                targetTokenId: 't4',
                resultText: 'write emails',
                explanation: 'Bỏ "can" để dùng cấu trúc chuẩn: help someone do something (giúp ai làm gì).'
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
    title: 'Bản Đồ Đọc Đoạn Văn & Định Vị Từ Khóa',
    subtitle: 'Khoanh vùng từ khóa & tìm vị trí thông tin nhanh chóng',
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
    title: 'Nói Về Công Việc & Học Tập',
    subtitle: 'Mở rộng câu trả lời từ Band 3.0 lên 4.0 - 4.5',
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
    title: 'Cổng Kết Nối Động Từ (Vi, Vt & Linking Verbs)',
    subtitle: 'Lắp ráp cú pháp & sửa lỗi dùng sai động từ',
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
    title: 'Bàn Cân Xác Minh Logic (True / False / Not Given)',
    subtitle: 'Nhận diện & xử lý 3 bẫy thông tin kinh điển',
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
    title: 'Nói Về Nơi Ở & Không Gian Sống',
    subtitle: 'Mở rộng câu trả lời từ Band 3.0 lên 4.0 - 4.5',
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
    title: 'Neo Mốc Thời Gian (Quá Khứ Đơn vs Hiện Tại Hoàn Thành)',
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
    title: 'Theo Dấu 4 Trạm Dừng Chân Lịch Trình & Bẫy Đọc Hiểu',
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
    title: 'Nói Về Điện Thoại & Ứng Dụng Công Nghệ (Chủ Đề: Technology)',
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
    title: 'Bổ Ngữ Tính Từ & Trạng Từ (Modifiers Engine)',
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
    title: 'Bóc Tách Ranh Giới Thuật Ngữ Y Khoa & Sức Khỏe',
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
    title: 'Nói Về Thói Quen Sức Khỏe & Dinh Dưỡng (Chủ Đề: Health)',
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
    title: 'Điểm Neo Cụm Giới Từ (Prepositional Phrases)',
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
    title: 'Chiếu Sáng Câu Chủ Đề & Nhặt Từ Gốc Gap-Fill',
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
    title: 'Nói Về Khó Khăn & Đưa Lời Khuyên (Chủ Đề: Problems & Advice)',
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
    title: 'Cầu Nối Mệnh Đề Quan Hệ (Who / Which / That)',
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
    title: 'Truy Vết Dòng Lịch Sử Hình Thành Facebook & Bẫy Đọc',
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
    title: 'Nói Về Chuyến Đi Đáng Nhớ & Lịch Trình Tour (Chủ Đề: Travel)',
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
    title: 'Dấu Phẩy Mệnh Đề Quan Hệ (Defining vs Non-defining)',
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
    title: 'Xác Minh Trách Nhiệm Nhân Quả & Sự Kiện Formosa',
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
    title: 'Nói Về Bạn Thân & Hóa Giải Hiểu Lầm (Chủ Đề: Friendship)',
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
    title: 'Thể Bị Động: Đảo Trục Trọng Tâm (Passive Voice)',
    subtitle: 'Thể Bị Động: Lắp Ráp Cú Pháp & Phẫu Thuật Điểm Gãy',
    coreCompetency: 'Nắm vững bản chất Passive Voice là dời tâm điểm chú ý từ "Tác nhân" sang "Đối tượng chịu tác động" đúng theo giáo trình W8D1. Làm chủ công thức Be + V3/ed cho các thì khác nhau và chấm dứt lỗi kinh điển Band 3.0: Biến động từ sang V3 nhưng quên mất trợ động từ "to be".',
    bridgeToHomework: {
      promptText: 'Thực hành chuyển đổi câu chủ động sang bị động trong Homework W8D1.',
      targetExamId: 'exam_dreamer_w8d1'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'syntax_anatomy',
        title: 'Chặng 1: Kiến Tạo Câu Bị Động Hoàn Chỉnh (The Task Will Be Completed Before 8 PM)',
        pedagogicalObjective: 'Bám sát ví dụ giáo trình W8D1 mục 2 câu 1: Lắp ráp câu bị động thì tương lai "S + will be + V3/ed + by agent + time".',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Bấm quét giải phẫu để lắp ráp trọn vẹn câu bị động với đầy đủ trợ động từ BE và V3/ed:',
          mode: 'build',
          tokens: [
            { id: 't1', text: 'The urgent task', role: 'subject', colorClass: 'green' },
            { id: 't2', text: 'will be completed', role: 'fv_core', colorClass: 'orange' },
            { id: 't3', text: 'by our dedicated team', role: 'modifier', colorClass: 'blue' },
            { id: 't4', text: 'before 8 PM tonight', role: 'scope_condition', colorClass: 'purple' }
          ]
        }
      },
      {
        stageNumber: 2,
        stageType: 'productive_failure',
        title: 'Chặng 2: Phẫu Thuật Mâu Thuẫn Rơi Mất Trợ Động Từ "Be" (500,000 Workers Recruited)',
        pedagogicalObjective: 'Đối diện lỗi kinh điển Band 3.0: Nhầm lẫn câu bị động với thì quá khứ đơn chủ động, quên mất trợ động từ "were".',
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
            errorMessage: 'Sụp đổ thể bị động: 500.000 công nhân không tự đi tuyển dụng ("recruited") mà là "được tuyển dụng". Câu bị động bắt buộc phải có trợ động từ "to be" đi kèm quá khứ phân từ V3!',
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
    title: 'Bóc Tách Hồ Sơ Pháp Lý & Hành Trình Vượt Biên',
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
    title: 'Nói Về Món Ăn Yêu Thích & Gọi Món Nhà Hàng (Chủ Đề: Food)',
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
    title: 'Keo Dán Liên Từ & Câu Phức (Subordinating Conjunctions)',
    subtitle: 'Keo Dán Liên Từ: Lắp Ráp Cú Pháp & Phẫu Thuật Điểm Gãy',
    coreCompetency: 'Nắm vững quy tắc "Keo dán liên từ" trong giáo trình W9D1: Để kết nối 2 mệnh đề thành câu phức chỉ được dùng đúng 1 liên từ phụ thuộc. Chấm dứt triệt để lỗi Comma Splice (ghép 2 mệnh đề bằng dấu phẩy không liên từ) và lỗi dịch thô tiếng Việt song trùng liên từ "Bởi vì... cho nên" (Because... so...).',
    bridgeToHomework: {
      promptText: 'Luyện tập kết nối mệnh đề phụ thuộc và sửa lỗi liên từ trong Homework W9D1.',
      targetExamId: 'exam_dreamer_w9d1'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'syntax_anatomy',
        title: 'Chặng 1: Kiến Tạo Câu Phức Bằng Keo Dán "Because" (Students Neglect Studies Because Waste Time)',
        pedagogicalObjective: 'Bám sát bài tập giáo trình W9D1 mục 3 câu 1: Lắp ráp câu phức chuẩn mực gồm Mệnh đề chính + Liên từ nguyên nhân "because" + Mệnh đề phụ.',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Bấm quét giải phẫu để lắp ráp câu phức với keo dán liên từ BECAUSE kết nối 2 mệnh đề:',
          mode: 'build',
          tokens: [
            { id: 't1', text: 'Many students neglect their studies', role: 'subject', colorClass: 'green' },
            { id: 't2', text: 'because', role: 'connector', colorClass: 'orange' },
            { id: 't3', text: 'they waste too much time', role: 'fv_core', colorClass: 'blue' },
            { id: 't4', text: 'on social media every night', role: 'scope_condition', colorClass: 'purple' }
          ]
        }
      },
      {
        stageNumber: 2,
        stageType: 'productive_failure',
        title: 'Chặng 2: Phẫu Thuật Mâu Thuẫn Thừa Liên Từ Song Trùng (Because... So...)',
        pedagogicalObjective: 'Bám sát lỗi kinh điển nhất của học viên Việt Nam trong giáo trình: Dùng song song cả "Because" và "So" trong cùng một câu ghép.',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Click vào cặp liên từ gây xung đột dư thừa "keo dán" trong câu dưới đây:',
          mode: 'break_and_repair',
          tokens: [
            { id: 't1', text: 'Because', role: 'connector', colorClass: 'orange' },
            { id: 't2', text: 'he studied hard for the exam,', role: 'subordinating_clause', colorClass: 'blue' },
            { id: 't3', text: 'so', role: 'connector', colorClass: 'red' },
            { id: 't4', text: 'he achieved an excellent score', role: 'main_clause', colorClass: 'green' }
          ],
          collisionTarget: {
            conflictingTokenIds: ['t1', 't3'],
            errorMessage: 'Xung đột liên từ kép: Tiếng Anh chỉ cần đúng 1 liên từ để kết nối 2 mệnh đề. Dùng cả "Because" lẫn "So" là lỗi dịch thô tiếng Việt ("Bởi vì... cho nên..."), gây dư thừa ngữ pháp nghiêm trọng!',
            repairOptions: [
              {
                id: 'opt1',
                action: 'delete',
                targetTokenId: 't3',
                resultText: '',
                explanation: 'Gọt bỏ liên từ thừa "so" để mệnh đề chính "he achieved an excellent score" đứng độc lập tự nhiên sau dấu phẩy.'
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
    title: 'Đối Chiếu Bản Thể Nội Dung & 7 Bẫy Ngôi Sao Mạng Xã Hội',
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
    title: 'Nói Về Sở Thích & Kỹ Thuật Ngắt Nhịp Chuẩn (Chủ Đề: Hobbies)',
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
  },
  {
    id: 'builder_w1d1',
    courseId: 'builder',
    week: 1,
    day: 1,
    skill: 'writing',
    title: 'Cấu Tạo Mệnh Đề & 3 Nhóm Động Từ (Vi - Vt - Vl)',
    subtitle: 'Lắp ráp mô hình S + FV + O & phẫu thuật điểm gãy thừa động từ, dùng sai nội/ngoại động từ',
    coreCompetency: 'Kiểm soát chặt chẽ 100% câu viết có đúng 1 Động từ chia thì (Finite Verb), không thừa động từ vị ngữ, và làm chủ bản chất 3 nhóm động từ Vi, Vt, Vl.',
    bridgeToHomework: {
      promptText: 'Làm bài tập nhận diện S-FV và sửa lỗi động từ trong Homework Buổi 1.',
      targetExamId: 'exam_builder_w1d1'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'syntax_anatomy',
        title: 'Chặng 1: Lắp ráp kiến tạo cú pháp (S + FV + O + Modifiers)',
        pedagogicalObjective: 'Nhận diện rõ Chủ thể (Subject), Động từ chia thì (Finite Verb), Tân ngữ (Object) và Cụm bổ nghĩa từ ngữ liệu thực tế đề thi tốt nghiệp THPT 2023 trong giáo trình.',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Bấm tách thành phần câu để quan sát kết cấu chuẩn S + FV + O + M của một mệnh đề hoàn chỉnh.',
          mode: 'build',
          tokens: [
            { id: 't1', text: 'Trees', role: 'subject', colorClass: 'green' },
            { id: 't2', text: 'protect', role: 'fv_core', colorClass: 'orange' },
            { id: 't3', text: 'the soil', role: 'object', colorClass: 'blue' },
            { id: 't4', text: 'beneath them', role: 'modifier', colorClass: 'gray' }
          ]
        }
      },
      {
        stageNumber: 2,
        stageType: 'productive_failure',
        title: 'Chặng 2: Phẫu thuật điểm gãy 1 – Thừa 2 động từ chia thì trong câu đơn',
        pedagogicalObjective: 'Bóc tách và chữa dứt điểm lỗi sai quen thuộc từ Bài tập 1 trong sách: My goal is have 6.5 IELTS do thói quen dịch thô tiếng Việt (Mục tiêu là có...).',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Click vào 2 động từ đang xung đột vị ngữ trong câu bên dưới.',
          mode: 'break_and_repair',
          tokens: [
            { id: 't1', text: 'My goal', role: 'subject', colorClass: 'green' },
            { id: 't2', text: 'is', role: 'fv_core', colorClass: 'orange' },
            { id: 't3', text: 'have', role: 'fv_core', colorClass: 'red' },
            { id: 't4', text: 'a 6.5 IELTS score', role: 'object', colorClass: 'blue' }
          ],
          collisionTarget: {
            conflictingTokenIds: ['t2', 't3'],
            errorMessage: 'Lỗi điểm gãy: Trong một mệnh đề đơn chỉ có DUY NHẤT 1 động từ chia thì (Finite Verb). Không thể đặt "is" và "have" cùng chia thì đứng cạnh nhau!',
            repairOptions: [
              {
                id: 'opt1',
                action: 'morph',
                targetTokenId: 't3',
                resultText: 'to achieve',
                explanation: 'Chuyển "have" thành To-Infinitive "to achieve" (hoặc "to have") để tạo bổ ngữ vị ngữ: My goal is to achieve a 6.5 IELTS score.'
              },
              {
                id: 'opt2',
                action: 'morph',
                targetTokenId: 't3',
                resultText: 'achieving',
                explanation: 'Chuyển "have" thành danh động từ "achieving" (Gerund complement): My goal is achieving a 6.5 IELTS score.'
              }
            ]
          }
        }
      },
      {
        stageNumber: 3,
        stageType: 'productive_failure',
        title: 'Chặng 3: Phẫu thuật điểm gãy 2 – Dùng sai Nội động từ (Vi) với Tân ngữ trực tiếp',
        pedagogicalObjective: 'Bóc tách lỗi sai từ Bài tập 3 trong sách: That terrible marketing campaign has declined our sales do nhầm lẫn giữa Nội động từ (Vi) và Ngoại động từ (Vt).',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Click vào động từ và tân ngữ đang mâu thuẫn về bản chất nội/ngoại động từ.',
          mode: 'break_and_repair',
          tokens: [
            { id: 't1', text: 'The marketing campaign', role: 'subject', colorClass: 'green' },
            { id: 't2', text: 'has declined', role: 'fv_core', colorClass: 'red' },
            { id: 't3', text: 'our company sales', role: 'object', colorClass: 'blue' }
          ],
          collisionTarget: {
            conflictingTokenIds: ['t2', 't3'],
            errorMessage: 'Lỗi điểm gãy Vi vs Vt: "decline" là Nội động từ (Intransitive Verb), bản thân sự vật tự suy giảm, KHÔNG được gắn trực tiếp với Tân ngữ phía sau!',
            repairOptions: [
              {
                id: 'opt1',
                action: 'morph',
                targetTokenId: 't2',
                resultText: 'has reduced',
                explanation: 'Thay bằng Ngoại động từ (Vt) "has reduced" hoặc "has decreased" để tác động trực tiếp lên tân ngữ "our company sales".'
              },
              {
                id: 'opt2',
                action: 'morph',
                targetTokenId: 't2',
                resultText: 'caused a drop in',
                explanation: 'Dùng cụm liên kết danh từ học thuật Band 5.0+: "caused a drop in our company sales".'
              }
            ]
          }
        }
      }
    ]
  },
  {
    id: 'builder_w1d2',
    courseId: 'builder',
    week: 1,
    day: 2,
    skill: 'writing',
    title: 'Thành Phần Bổ Ngữ & Mở Rộng Câu (Modifier & Relative Clause)',
    subtitle: 'Lắp ráp 4 loại bổ ngữ & phẫu thuật điểm gãy dấu phẩy trong mệnh đề quan hệ (, which vs that)',
    coreCompetency: 'Làm chủ bản chất không bắt buộc của Modifier để mở rộng câu giàu chi tiết, dùng đúng cụm giới từ học thuật và phân biệt chính xác đại từ quan hệ thay thế cho cả mệnh đề (, which).',
    bridgeToHomework: {
      promptText: 'Làm bài tập điền giới từ essay và viết lại câu có mệnh đề quan hệ trong Homework Buổi 2.',
      targetExamId: 'exam_builder_w1d2'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'syntax_anatomy',
        title: 'Chặng 1: Lắp ráp kiến tạo cú pháp mở rộng (S + Modifier + FV + O + Prep Phrase)',
        pedagogicalObjective: 'Thấy rõ nguyên lý mở rộng câu từ nòng cốt S-V-O: Thêm Cụm phân từ (Participial Phrase) bổ nghĩa cho danh từ và Cụm giới từ học thuật (Prepositional Phrase) chỉ xuất xứ/mục đích mà không làm vỡ ranh giới câu.',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Bấm tách thành phần câu để thấy cách Modifier làm giàu ý nghĩa cho Chủ ngữ và Tân ngữ mà vẫn bảo toàn nòng cốt S + FV.',
          mode: 'build',
          tokens: [
            { id: 't1', text: 'Students', role: 'subject', colorClass: 'green' },
            { id: 't2', text: 'living in rural areas', role: 'modifier', colorClass: 'purple' },
            { id: 't3', text: 'need', role: 'fv_core', colorClass: 'orange' },
            { id: 't4', text: 'more financial support', role: 'object', colorClass: 'blue' },
            { id: 't5', text: 'from the government', role: 'modifier', colorClass: 'gray' }
          ]
        }
      },
      {
        stageNumber: 2,
        stageType: 'productive_failure',
        title: 'Chặng 2: Phẫu thuật điểm gãy 1 – Bẫy mâu thuẫn đối tượng thay thế (, which vs that)',
        pedagogicalObjective: 'Giải quyết triệt để điểm gãy logic trong phần Nâng cao của giáo trình: "that" không thể thay thế cho toàn bộ sự việc phía trước, bắt buộc phải dùng dấu phẩy và ", which".',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Click vào mệnh đề chính và đại từ quan hệ đang mâu thuẫn về phạm vi thay thế.',
          mode: 'break_and_repair',
          tokens: [
            { id: 't1', text: 'Many people choose to work from home', role: 'main_clause', colorClass: 'green' },
            { id: 't2', text: 'that affects', role: 'adjective_clause', colorClass: 'red' },
            { id: 't3', text: 'their social communication', role: 'object', colorClass: 'blue' }
          ],
          collisionTarget: {
            conflictingTokenIds: ['t1', 't2'],
            errorMessage: 'Điểm gãy ngữ pháp: Đại từ "that" chỉ thay thế cho một danh từ đứng sát trước nó. Khi muốn bổ nghĩa cho TOÀN BỘ hành động/sự việc phía trước, bắt buộc phải dùng dấu phẩy và ", which"!',
            repairOptions: [
              {
                id: 'opt1',
                action: 'morph',
                targetTokenId: 't2',
                resultText: ', which affects',
                explanation: 'Dùng dấu phẩy kèm ", which" để thay thế cho cả mệnh đề: Many people choose to work from home, which affects their social communication.'
              },
              {
                id: 'opt2',
                action: 'morph',
                targetTokenId: 't2',
                resultText: 'and this affects',
                explanation: 'Chuyển thành liên từ độc lập: Many people choose to work from home, and this affects their social communication.'
              }
            ]
          }
        }
      },
      {
        stageNumber: 3,
        stageType: 'productive_failure',
        title: 'Chặng 3: Phẫu thuật điểm gãy 2 – Lỗi dùng sai Giới từ cố định trong IELTS Essay',
        pedagogicalObjective: 'Khắc phục thói quen dịch thô giới từ từ tiếng Việt (Đầu tư vào = invest on) từ bài tập giới từ essay trong giáo trình gốc.',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Click vào động từ và cụm giới từ đang xung đột về quy tắc Collocation.',
          mode: 'break_and_repair',
          tokens: [
            { id: 't1', text: 'The government', role: 'subject', colorClass: 'green' },
            { id: 't2', text: 'should invest more', role: 'fv_core', colorClass: 'orange' },
            { id: 't3', text: 'on renewable energy', role: 'modifier', colorClass: 'red' },
            { id: 't4', text: 'to tackle climate change', role: 'modifier', colorClass: 'gray' }
          ],
          collisionTarget: {
            conflictingTokenIds: ['t2', 't3'],
            errorMessage: 'Điểm gãy Collocation: Động từ "invest" bắt buộc kết hợp với giới từ "in", không dùng "on" theo thói quen dịch tiếng Việt!',
            repairOptions: [
              {
                id: 'opt1',
                action: 'morph',
                targetTokenId: 't3',
                resultText: 'in renewable energy',
                explanation: 'Sửa thành giới từ chuẩn: invest more in renewable energy (đầu tư nhiều hơn vào năng lượng tái tạo).'
              }
            ]
          }
        }
      }
    ]
  },
  {
    id: 'builder_w1d3',
    courseId: 'builder',
    week: 1,
    day: 3,
    skill: 'speaking',
    title: 'Ẩm Thực & Đồ Uống (Food and Drink)',
    subtitle: 'Nguyên âm trước/giữa IPA, phản xạ hương vị & thẻ lật 3 chặng mở rộng bài nói Band 4.0 -> 5.0 / 5.5',
    coreCompetency: 'Làm chủ khẩu hình nguyên âm trước /iː/ vs /ɪ/ và nguyên âm giữa /ə/ vs /ɜː/, áp dụng cấu trúc phản xạ hương vị I really like... because... và nâng cấp câu trả lời Part 1 từ cụt lốc Band 4.0 lên lưu loát tự nhiên Band 5.0 - 5.5.',
    bridgeToHomework: {
      promptText: 'Thu âm bài nói Part 1 miêu tả món ăn yêu thích và quán ăn quen thuộc trong Homework Buổi 3.',
      targetExamId: 'exam_builder_w1d3'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'progressive_reveal',
        title: 'Chặng 1: Khẩu Hình IPA & Phản Xạ Hương Vị (I like... because...)',
        pedagogicalObjective: 'Làm chủ cặp nguyên âm IPA trước /iː/ vs /ɪ/ và phản xạ mô tả hương vị/kết cấu (crispy, tender, spicy, bland, chewy) bám sát bài học.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click mở từng bước để luyện phản xạ nói về món ăn yêu thích và món ăn không hợp khẩu vị:',
          cards: [
            {
              step: 1,
              label: 'BƯỚC 1: PHẢN XẠ MÓN YÊU THÍCH (THỊT GÀ HẤP - STEAMED CHICKEN)',
              cognitiveFunction: '1. Nêu món ăn yêu thích kèm cách nấu và kết cấu mềm mọng',
              content: 'I really like steamed chicken because it is tender and juicy.',
              bandLevel: 'Band 4.0 → 5.0',
              pedagogyNote: 'Dùng "steamed" (hấp) và tính từ "tender" (mềm) thay cho từ chung chung "delicious".',
              flipCard: {
                frontText: 'I like chicken because it is good. (Nói cộc lốc Band 4.0)',
                backText: 'I really like steamed chicken because it is tender and juicy. (Cấu trúc chuẩn Band 5.0)',
                explanation: 'Nêu rõ cách chế biến (steamed) và kết cấu đặc trưng của thịt (tender - mềm mọng).'
              },
              vowelHighlight: [
                { word: 'steamed', phonetic: '/stiːmd/', vowelSound: '/iː/ dài (căng cơ môi)' },
                { word: 'chicken', phonetic: '/ˈtʃɪk.ɪn/', vowelSound: '/ɪ/ ngắn (thả lỏng dứt khoát)' }
              ]
            },
            {
              step: 2,
              label: 'BƯỚC 2: PHẢN XẠ ĐỒ ĂN GIÒN & CAY (FRIED CHICKEN & THAI SOUP)',
              cognitiveFunction: '2. Mô tả món chiên giòn và món súp cay đậm đà',
              content: "I'm a big fan of fried chicken because it is crispy on the outside.",
              bandLevel: 'Band 4.5 → 5.0',
              pedagogyNote: 'Dùng "crispy" (giòn rụm) và cụm bám sát sách: "satisfy my sweet tooth" khi ăn đồ ngọt.',
              flipCard: {
                frontText: 'I like KFC chicken. It is crispy. (Rời rạc)',
                backText: "I'm a big fan of fried chicken because it is extremely crispy and flavorful. (Mở rộng tự nhiên)",
                explanation: 'Kết hợp "crispy" (giòn) và "flavorful" (đậm đà) bám sát từ vựng bài học.'
              },
              vowelHighlight: [
                { word: 'crispy', phonetic: '/ˈkrɪs.pi/', vowelSound: '/ɪ/ ngắn' },
                { word: 'sweet tooth', phonetic: '/swiːt tuːθ/', vowelSound: '/iː/ dài' }
              ]
            },
            {
              step: 3,
              label: "BƯỚC 3: PHẢN XẠ NÓI VỀ MÓN GHÉT (I DON'T LIKE... TOO BLAND / CHEWY)",
              cognitiveFunction: '3. Nêu lý do từ chối món ăn vì quá nhạt nhẽo hoặc quá dai',
              content: "I don't like boiled pork because it is too bland and lacks flavor.",
              bandLevel: 'Band 4.5 → 5.0',
              pedagogyNote: 'Học cách chê đồ ăn lịch sự bằng "too bland" (quá nhạt) hoặc "too chewy" (quá dai).',
              flipCard: {
                frontText: 'I hate boiled pork. No taste. (Nói thô)',
                backText: "I don't like boiled pork because it is too bland and lacks flavor. (Chuẩn Band 5.0)",
                explanation: 'Dùng "bland" (nhạt nhẽo) bám sát công thức Bài tập 2 trong sách.'
              },
              branchOptions: [
                {
                  branchName: 'GHÉT ĐỒ NHẠT (BOILED PORK)',
                  content: "I don't like boiled pork because it is too bland.",
                  note: 'Mẫu gốc trong giáo trình.'
                },
                {
                  branchName: 'GHÉT ĐỒ DAI (BEEF / SQUID)',
                  content: "I don't really enjoy squid because it is too chewy to swallow.",
                  note: 'Áp dụng cho đồ dai (chewy).'
                }
              ]
            }
          ],
          fullMosaicSummary: "I really like steamed chicken because it is tender and juicy, and I'm a big fan of fried chicken when it is freshly made and crispy. On the other hand, I don't like boiled pork because it is too bland and lacks flavor."
        }
      },
      {
        stageNumber: 2,
        stageType: 'progressive_reveal',
        title: 'Chặng 2: Thẻ Lật 3 Chặng Mở Rộng Bài Mẫu Món Phở (Band 4.0 -> 5.0 / 5.5)',
        pedagogicalObjective: 'Phân tầng tư duy nói theo 3 chặng từ bài đọc mẫu về Phở trong sách: Tên món → Thành phần & Nước dùng đậm đà → Bối cảnh ăn sáng ngày lạnh.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click từng bước để quan sát sự chuyển dịch từ Band 4.0 lên 5.0 và 5.5:',
          cards: [
            {
              step: 1,
              label: 'CHẶNG 1: TRẢ LỜI TRỰC DIỆN (TÊN MÓN YÊU THÍCH)',
              cognitiveFunction: '1. Giới thiệu món ăn bằng cụm từ học thuật tự nhiên',
              content: 'One of my all-time favorites is Pho, a traditional Vietnamese noodle dish.',
              bandLevel: 'Band 4.0 → 5.0',
              pedagogyNote: 'Nâng cấp từ "My favorite food is Pho" lên cụm chuẩn "One of my all-time favorites is Pho".',
              flipCard: {
                frontText: 'My favorite food is Pho. (Band 4.0 cộc lốc)',
                backText: 'One of my all-time favorites is Pho, which is a traditional Vietnamese noodle soup. (Band 5.0 lưu loát)',
                explanation: 'Dùng cụm mở đầu "One of my all-time favorites" kết hợp mệnh đề quan hệ bổ nghĩa.'
              },
              vowelHighlight: [
                { word: 'traditional', phonetic: '/trəˈdɪʃ.ən.əl/', vowelSound: '/ə/ nguyên âm giữa (thả lỏng)' },
                { word: 'dish', phonetic: '/dɪʃ/', vowelSound: '/ɪ/ ngắn' }
              ]
            },
            {
              step: 2,
              label: 'CHẶNG 2: MÔ TẢ NGUYÊN LIỆU & NƯỚC DÙNG (BROTH & HERBS)',
              cognitiveFunction: '2. Mô tả thành phần cốt lõi: bánh phở, nước dùng đậm đà và rau thơm',
              content: 'It is made with soft rice noodles, a flavorful broth, and a variety of fresh herbs.',
              bandLevel: 'Band 4.5 → 5.0',
              pedagogyNote: 'Làm chủ từ vựng chất lượng từ bài đọc: "flavorful broth" (nước dùng đậm đà) và "a variety of herbs" (nhiều loại rau thơm).',
              flipCard: {
                frontText: 'It has soup, meat and noodles. (Từ vựng sơ cấp 4.0)',
                backText: 'It is made with soft rice noodles, a flavorful broth, and a variety of fresh herbs. (Từ vựng học thuật 5.0)',
                explanation: 'Thay "soup" bằng "flavorful broth" và dùng thể bị động "is made with" đúng bài đọc trong sách.'
              },
              vowelHighlight: [
                { word: 'broth', phonetic: '/brɒθ/', vowelSound: '/ɒ/ ngắn' },
                { word: 'herbs', phonetic: '/hɜːbz/', vowelSound: '/ɜː/ nguyên âm giữa dài' }
              ]
            },
            {
              step: 3,
              label: 'CHẶNG 3: BỐI CẢNH & TRẢI NGHIỆM (SERVED PIPING HOT)',
              cognitiveFunction: '3. Nêu lý do vì sao thích ăn vào bữa sáng hoặc những ngày se lạnh',
              content: 'It is usually served piping hot, so it is perfect for breakfast on a chilly morning.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Nối câu bằng liên từ kết quả "so" và dùng cụm "served piping hot" (phục vụ nóng hổi).',
              flipCard: {
                frontText: 'It is hot. I eat in morning. (Band 4.0 ngắt quãng)',
                backText: 'It is usually served piping hot, so it is perfect for breakfast on a cold day. (Band 5.5 nối ý mượt mà)',
                explanation: 'Nối 2 vế câu bằng liên từ "so" và trạng từ chỉ tần suất "usually" bám sát đoạn trích mục 2.1.'
              }
            }
          ],
          fullMosaicSummary: 'One of my all-time favorites is Pho. It is a Vietnamese traditional dish that is made with rice noodles, a flavorful broth, and a variety of herbs. It is usually served piping hot, so it is perfect for breakfast on a cold day.'
        }
      },
      {
        stageNumber: 3,
        stageType: 'progressive_reveal',
        title: 'Chặng 3: Định Vị Quán Ăn Thực Tế & Cấu Trúc Food Review',
        pedagogicalObjective: 'Phân biệt chính xác Eatery (quán ăn bình dân) vs Food stall (quán cóc vỉa hè) vs Dining spot (địa điểm ăn uống) và hoàn thành bài nói review quán ăn quen thuộc.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click từng bước để làm chủ các từ vựng chỉ địa điểm quán ăn tại Việt Nam:',
          cards: [
            {
              step: 1,
              label: 'BƯỚC 1: GIỚI THIỆU QUÁN ĂN QUEN THUỘC (EATERY VS FOOD STALL)',
              cognitiveFunction: '1. Nêu tên quán và phân biệt loại hình quán ăn theo ngữ cảnh Việt Nam',
              content: 'There is a local eatery near my house that serves amazing Phở and beef noodles.',
              bandLevel: 'Band 4.0 → 5.0',
              pedagogyNote: 'Dùng từ "eatery" (/ˈiːtəri/) cho các quán ăn bình dân Việt Nam thay vì chỉ dùng duy nhất từ "restaurant".',
              flipCard: {
                frontText: 'I go to small restaurant near my house. (Band 4.0)',
                backText: 'There is a local eatery near my house that serves great Phở. (Chuẩn giáo trình Band 5.0)',
                explanation: 'Sử dụng từ "eatery" bám sát định nghĩa trong sách: chỉ quán phở, cơm tấm bình dân.'
              },
              vowelHighlight: [
                { word: 'eatery', phonetic: '/ˈiː.tər.i/', vowelSound: '/iː/ dài & /ə/ ngắn' },
                { word: 'stall', phonetic: '/stɔːl/', vowelSound: '/ɔː/ dài' }
              ]
            },
            {
              step: 2,
              label: 'BƯỚC 2: KHÔNG GIAN & GIÁ CẢ (ATMOSPHERE & AFFORDABLE PRICES)',
              cognitiveFunction: '2. Đánh giá chất lượng phục vụ và mức giá hợp lý cho học sinh sinh viên',
              content: 'The food stall is always crowded because the meals are cheap, fresh, and delicious.',
              bandLevel: 'Band 4.5 → 5.0',
              pedagogyNote: 'Dùng cụm bám sát sách: "food stall on the street" hoặc "local eatery with affordable prices".',
              flipCard: {
                frontText: 'The food is cheap. Many people eat there. (Cụt lốc)',
                backText: 'I love eating at food stalls on the street because the food is cheap and delicious. (Đúng câu mẫu mục 2.2)',
                explanation: 'Nguyên văn câu ví dụ chuẩn mực trong Coursebook mục 2.2.'
              }
            },
            {
              step: 3,
              label: 'BƯỚC 3: TRẢI NGHIỆM ĐỊA ĐIỂM TỤ TẬP (DINING SPOT & CẢM XÚC)',
              cognitiveFunction: '3. Nêu thói quen ghé quán cùng gia đình/bạn bè và cảm nhận chung',
              content: 'It has become my favorite dining spot whenever I hang out with my close friends on weekends.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Ứng dụng thuật ngữ "dining spot" (/ˈdaɪnɪŋ spɑːt/) cho địa điểm tụ tập ăn uống yêu thích.',
              flipCard: {
                frontText: 'Haidilao is good place for my family. (Tiếng Anh bồi)',
                backText: 'Haidilao is my favorite dining spot when I hang out with my family. (Chuẩn bài học 5.0+)',
                explanation: 'Sử dụng cụm "dining spot" để chỉ địa điểm ăn uống yêu thích đúng như câu mẫu trong sách.'
              },
              branchOptions: [
                {
                  branchName: 'QUÁN CÓC VỈA HÈ (FOOD STALL)',
                  content: 'I love eating at street food stalls because the atmosphere is lively and the food is fast.',
                  note: 'Phù hợp khi nói về ẩm thực đường phố.'
                },
                {
                  branchName: 'ĐỊA ĐIỂM TỤ TẬP GIA ĐÌNH (DINING SPOT)',
                  content: 'That restaurant is our go-to dining spot for special family gatherings.',
                  note: 'Phù hợp khi nói về nhà hàng/quán tụ tập cuối tuần.'
                }
              ]
            }
          ],
          fullMosaicSummary: 'There is a local eatery near my house that serves great Phở. Although it is just a small food stall on the street, it is always crowded because the food is cheap and delicious. It has become my favorite dining spot whenever I hang out with my family or close friends.'
        }
      }
    ]
  },
  {
    id: 'builder_w2d1',
    courseId: 'builder',
    week: 2,
    day: 1,
    skill: 'writing',
    title: 'WRITING · BUỔI 1: MỆNH ĐỀ QUAN HỆ & MỆNH ĐỀ TRẠNG NGỮ',
    subtitle: 'Sentence X-Ray, Tường Lửa Dấu Phẩy & Khắc Phục Xung Đột Liên Từ',
    coreCompetency: 'Làm chủ Mệnh đề tính từ xác định/không xác định, cơ chế rút gọn (V-ing / V3) và triệt tiêu lỗi liên từ kép (Although... but) cùng lỗi câu què (Sentence fragment).',
    bridgeToHomework: {
      promptText: 'Thực hành viết lại 6 câu mệnh đề phức và nhận diện câu què trong Homework Tuần 2 Day 1.',
      targetExamId: 'exam_builder_w2d1'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'syntax_anatomy',
        title: 'Chặng 1: Sentence X-Ray — Bóc Tách Khung Xương & Rút Gọn Mệnh Đề Quan Hệ',
        pedagogicalObjective: 'Nhìn thấu cấu trúc 3 tầng của câu chứa Mệnh đề quan hệ rút gọn chủ động (Active voice V-ing): Khung S-V chính không bị nhầm lẫn với động từ bổ nghĩa.',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Bấm phân tích để quan sát cơ chế nén thông tin từ "who taught" thành "teaching" bổ nghĩa cho Chủ ngữ:',
          mode: 'build',
          tokens: [
            { id: 't1', text: 'The teacher', role: 'subject', colorClass: 'green' },
            { id: 't2', text: 'teaching me English', role: 'modifier', colorClass: 'purple' },
            { id: 't3', text: 'was', role: 'fv_core', colorClass: 'orange' },
            { id: 't4', text: 'very kind and patient', role: 'complement', colorClass: 'blue' }
          ],
          slots: [
            { slotId: 's1', acceptedRoles: ['subject'], label: 'CHỦ NGỮ CỐT LÕI (S)' },
            { slotId: 's2', acceptedRoles: ['modifier'], label: 'MỆNH ĐỀ RÚT GỌN (V-ING MODIFIER)' },
            { slotId: 's3', acceptedRoles: ['fv_core'], label: 'ĐỘNG TỪ CHÍNH ĐƯỢC CHIA (FV CORE)' },
            { slotId: 's4', acceptedRoles: ['complement'], label: 'VỊ NGỮ / BỔ NGỮ (COMPLEMENT)' }
          ]
        }
      },
      {
        stageNumber: 2,
        stageType: 'productive_failure',
        title: 'Chặng 2: Break & Repair 1 — "Tường Lửa Dấu Phẩy" & Quy Tắc Cấm Kỵ "..., that"',
        pedagogicalObjective: 'Phát hiện và sửa lỗi dùng "that" sau dấu phẩy trong mệnh đề quan hệ không xác định (Non-defining clause).',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Click vào từ vi phạm quy tắc "tường lửa dấu phẩy" trong câu bên dưới:',
          mode: 'break_and_repair',
          tokens: [
            { id: 't1', text: 'Paris,', role: 'subject', colorClass: 'green' },
            { id: 't2', text: 'that', role: 'adjective_clause', colorClass: 'red' },
            { id: 't3', text: 'is the capital of France,', role: 'modifier', colorClass: 'purple' },
            { id: 't4', text: 'attracts', role: 'fv_core', colorClass: 'orange' },
            { id: 't5', text: 'millions of tourists every year.', role: 'object', colorClass: 'blue' }
          ],
          collisionTarget: {
            conflictingTokenIds: ['t1', 't2'],
            errorMessage: 'CẢNH BÁO QUY TẮC: Mệnh đề không xác định (sau dấu phẩy) tuyệt đối KHÔNG dùng "that". Dấu phẩy ngăn cách thông tin bổ sung phụ!',
            repairOptions: [
              {
                id: 'opt_which',
                action: 'morph',
                targetTokenId: 't2',
                resultText: 'which',
                explanation: 'Đổi "that" thành "which": Non-defining clause luôn dùng "which" để mở đầu mệnh đề bổ nghĩa cho danh từ chỉ vật/địa danh đứng trước dấu phẩy.'
              }
            ]
          }
        }
      },
      {
        stageNumber: 3,
        stageType: 'productive_failure',
        title: 'Chặng 3: Break & Repair 2 — Triệt Tiêu Xung Đột Liên Từ Kép (Although... but)',
        pedagogicalObjective: 'Khắc phục tư duy dịch từ tiếng Việt "Mặc dù... nhưng..." dẫn đến va chạm cú pháp 2 liên từ chỉ hướng trong cùng một câu.',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Click vào liên từ gây ra xung đột cú pháp trong câu phức bên dưới:',
          mode: 'break_and_repair',
          tokens: [
            { id: 't1', text: 'Although the government has invested a lot of money in education,', role: 'subordinating_clause', colorClass: 'purple' },
            { id: 't2', text: 'but', role: 'connector', colorClass: 'red' },
            { id: 't3', text: 'the quality of teaching', role: 'subject', colorClass: 'green' },
            { id: 't4', text: 'remains', role: 'fv_core', colorClass: 'orange' },
            { id: 't5', text: 'poor.', role: 'complement', colorClass: 'blue' }
          ],
          collisionTarget: {
            conflictingTokenIds: ['t1', 't2'],
            errorMessage: 'LỖI XUNG ĐỘT LIÊN TỪ (SYNTAX COLLISION): "Although" đã là liên từ phụ thuộc dẫn đường cho mệnh đề trạng ngữ. Vế sau là mệnh đề chính độc lập, KHÔNG được thêm liên từ kết hợp "but"!',
            repairOptions: [
              {
                id: 'opt_delete_but',
                action: 'delete',
                targetTokenId: 't2',
                resultText: '',
                explanation: 'Triệt tiêu liên từ "but". Câu chuẩn học thuật: "Although the government has invested a lot of money in education, the quality of teaching remains poor."'
              }
            ]
          }
        }
      }
    ]
  },
  {
    id: 'builder_w2d2',
    courseId: 'builder',
    week: 2,
    day: 2,
    skill: 'reading',
    title: 'READING · BUỔI 2: MONITORING COMPREHENSION & DEEP READING',
    subtitle: 'Cambridge 14 Test 4: The Secret of Staying Young & Chuỗi Lần Vết Bằng Chứng',
    coreCompetency: 'Làm chủ kỹ thuật Deep Reading (Đọc sâu bám sát Fact), xây dựng Evidence Chain 4 mắt xích cho bài Gap-fill và sử dụng Bàn cân Logic Scale để phán quyết True/False/Not Given chính xác.',
    bridgeToHomework: {
      promptText: 'Hoàn thành câu hỏi 1-13 bài đọc Cambridge 14 Test 4 trong phần Reading Homework.',
      targetExamId: 'exam_builder_w2d2'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'verification_scale',
        title: 'Chặng 1: Evidence Chain — Chuỗi Lần Vết 4 Mắt Xích (Gap-Fill Summary)',
        pedagogicalObjective: 'Huấn luyện tư duy lần vết từ khóa từ câu hỏi Gap-fill đến tọa độ bài đọc qua cầu nối Paraphrase mà không bị rối loạn từ mới.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Kéo thả các biến số để thiết lập chuỗi bằng chứng khớp nối giữa câu tóm tắt và đoạn văn:',
          passageContext: {
            title: 'Cambridge 14 Test 4 Passage 1: The secret of staying young',
            paragraphs: [
              {
                id: 'p3',
                label: 'Đoạn 3 (Dòng 1-3)',
                text: 'In the lab, P. dentata worker ants typically live for around 140 days. Giraldo focused on ants at four age ranges: 20 to 22 days, 45 to 47 days, 95 to 97 days and 120 to 122 days. Unlike all previous studies, which only estimated how old the ants were, her work tracked the ants from the time the pupae became adults, so she knew their exact ages.'
              },
              {
                id: 'p4',
                label: 'Đoạn 4 (Dòng 3-5)',
                text: 'She compared how well 20-day-old and 95-day-old ants followed the telltale scent that the insects usually leave to mark a trail to food.'
              }
            ],
            targetParagraphId: 'p4',
            targetSnippet: '...followed the telltale scent that the insects usually leave to mark a trail to food.'
          },
          statement: {
            rawText: "Question 3 (Gap-fill): The research tested ants' ability to locate [food] using a scent trail.",
            deconstructedVariables: [
              { name: 'X_action', text: 'ability to locate' },
              { name: 'Y_target', text: 'target object (food)', isTrapWord: false },
              { name: 'Z_method', text: 'using a scent trail' }
            ]
          },
          passageEvidence: {
            rawText: 'followed the telltale scent that the insects usually leave to mark a trail to food.',
            targetVariables: [
              { matchingName: 'X_action', text: 'followed / mark a trail' },
              { matchingName: 'Y_target', text: 'food' },
              { matchingName: 'Z_method', text: 'telltale scent' }
            ]
          },
          expectedRelation: 'match',
          verdict: 'TRUE',
          pedagogicalInsight: 'Mắt xích Paraphrase: "ability to locate" = "followed... to", "scent trail" = "telltale scent... mark a trail". Từ ngữ nguyên bản duy nhất cần điền là "food".'
        }
      },
      {
        stageNumber: 2,
        stageType: 'verification_scale',
        title: 'Chặng 2: Logic Verification Scale — Bàn Cân Phán Quyết Bẫy Tuyệt Đối Hóa (Question 9: FALSE)',
        pedagogicalObjective: 'Phát hiện bẫy từ mang tính tuyệt đối hóa "the only known animals" và dùng bằng chứng so sánh để phán quyết FALSE.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'So khớp biến số tuyệt đối trong câu hỏi với bằng chứng loài Chuột chũi trần (Naked mole rats) trong bài đọc:',
          passageContext: {
            title: 'Cambridge 14 Test 4 Passage 1: The secret of staying young',
            paragraphs: [
              {
                id: 'p2',
                label: 'Đoạn 2 (Dòng 1-3)',
                text: 'Such age-defying feats are rare in the animal kingdom. Naked mole rats can live for almost 30 years and stay fit for nearly their entire lives. They can still reproduce even when old, and they never get cancer. But the vast majority of animals deteriorate with age...'
              }
            ],
            targetParagraphId: 'p2',
            targetSnippet: 'Naked mole rats can live for almost 30 years and stay fit for nearly their entire lives.'
          },
          statement: {
            rawText: 'Pheidole dentata ants are the only known animals which remain active for almost their whole lives.',
            deconstructedVariables: [
              { name: 'A_subject', text: 'Pheidole dentata ants' },
              { name: 'B_exclusive_trap', text: 'are the ONLY known animals', isTrapWord: true },
              { name: 'C_condition', text: 'remain active for almost their whole lives' }
            ]
          },
          passageEvidence: {
            rawText: 'Naked mole rats can live for almost 30 years and stay fit for nearly their entire lives.',
            targetVariables: [
              { matchingName: 'A_subject', text: 'Naked mole rats (cũng làm được điều tương tự)' },
              { matchingName: 'B_exclusive_trap', text: 'rare in the animal kingdom (hiếm chứ KHÔNG DUY NHẤT)' },
              { matchingName: 'C_condition', text: 'stay fit for nearly their entire lives' }
            ]
          },
          expectedRelation: 'contradiction',
          verdict: 'FALSE',
          pedagogicalInsight: 'Bẫy tuyệt đối hóa "the only known animals": Bài đọc chỉ ra loài chuột chũi trần (naked mole rats) cũng sống khoẻ gần như trọn đời. Do đó tuyên bố "kiến P. dentata là loài duy nhất" trực tiếp mâu thuẫn với bài đọc -> FALSE.'
        }
      },
      {
        stageNumber: 3,
        stageType: 'verification_scale',
        title: 'Chặng 3: Logic Verification Scale — Bàn Cân Phán Quyết Bẫy Suy Diễn (Question 12: NOT GIVEN)',
        pedagogicalObjective: 'Phân biệt ranh giới giữa "Thông tin có đề cập từ khóa" và "Không có dữ kiện so sánh phương pháp" để ra quyết định NOT GIVEN.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Kiểm tra xem bài đọc có đề cập "phương pháp đo lường khác nhau" của các nghiên cứu về loài ong hay không:',
          passageContext: {
            title: 'Cambridge 14 Test 4 Passage 1: The secret of staying young',
            paragraphs: [
              {
                id: 'p6',
                label: 'Đoạn 6 (Dòng 3-6)',
                text: 'Scientists have looked at some similar aspects in bees, but the results of recent bee studies were mixed – some studies showed age-related declines, which biologists call senescence, and others didn’t.'
              }
            ],
            targetParagraphId: 'p6',
            targetSnippet: '...the results of recent bee studies were mixed – some studies showed age-related declines... and others didn’t.'
          },
          statement: {
            rawText: 'The recent studies of bees used different methods of measuring age-related decline.',
            deconstructedVariables: [
              { name: 'X_topic', text: 'recent studies of bees' },
              { name: 'Y_action', text: 'used DIFFERENT METHODS of measuring', isTrapWord: true },
              { name: 'Z_target', text: 'age-related decline' }
            ]
          },
          passageEvidence: {
            rawText: '...the results of recent bee studies were mixed – some studies showed age-related declines... and others didn’t.',
            targetVariables: [
              { matchingName: 'X_topic', text: 'recent bee studies' },
              { matchingName: 'Y_action', text: 'KHOẢNG TRỐNG DỮ LIỆU: Chỉ nói KẾT QUẢ trái ngược (results were mixed), KHÔNG NÓI VỀ PHƯƠNG PHÁP (methods)' },
              { matchingName: 'Z_target', text: 'age-related declines' }
            ]
          },
          expectedRelation: 'no_evidence',
          verdict: 'NOT GIVEN',
          pedagogicalInsight: 'Bẫy suy diễn ngoài bài: Bài đọc chỉ nói "kết quả nghiên cứu về ong là trái ngược nhau" (results were mixed), hoàn toàn KHÔNG nhắc đến việc các nghiên cứu này có dùng phương pháp đo lường khác nhau (different methods) hay không -> Đĩa cân bị khuyết dữ kiện -> NOT GIVEN.'
        }
      }
    ]
  },
  {
    id: 'builder_w2d3',
    courseId: 'builder',
    week: 2,
    day: 3,
    skill: 'speaking',
    title: 'SPEAKING · BUỔI 3: HEALTHY LIFESTYLES & PHẢN XẠ NÓI PART 1',
    subtitle: 'Transformation Ladder (4.0 -> 5.5), Speaking Flow Map & Cặp Âm /ɔː/ vs /uː/',
    coreCompetency: 'Luyện phát âm chuẩn nguyên âm sau (/ɔː/, /uː/) và nguyên âm đôi (/əʊ/), làm chủ thang nâng cấp câu nói (Transformation Ladder) và mô hình 3 trạm Speaking Flow Map cho chủ đề Sức Khỏe.',
    bridgeToHomework: {
      promptText: 'Ghi âm 2 câu trả lời Part 1 về Unhealthy Habits và Staying Healthy trong phần Speaking Homework.',
      targetExamId: 'exam_builder_w2d3'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'progressive_reveal',
        title: 'Chặng 1: Transformation Ladder — Thang Nâng Cấp Câu Trả Lời Về Thói Quen Lành Mạnh',
        pedagogicalObjective: 'Quan sát sự chuyển dịch từ câu nói cộc lốc Band 4.0 lên câu ghép mượt mà Band 5.0 và mở rộng cấu trúc học thuật Band 5.5.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click từng nấc thang để thấy sự tiến hóa của câu trả lời "What do you do to stay healthy?":',
          cards: [
            {
              step: 1,
              label: 'NẤC 1: TRẢ LỜI TRỰC DIỆN (DIRECT ANSWER)',
              cognitiveFunction: '1. Nêu hành động thể thao chính kèm tần suất thực tế',
              content: 'I often play badminton twice a week to stay healthy.',
              bandLevel: 'Band 4.0 → 4.5',
              pedagogyNote: 'Khởi đầu chắc chắn với tần suất "twice a week" thay vì chỉ nói "I play badminton".',
              flipCard: {
                frontText: 'I play badminton to be healthy. (Band 4.0 cộc lốc)',
                backText: 'I often play badminton twice a week to stay healthy. (Band 4.5 chuẩn xác)',
                explanation: 'Thêm trạng từ tần suất "often" và cụm "twice a week" để câu nói cụ thể hơn.'
              },
              vowelHighlight: [
                { word: 'sports', phonetic: '/spɔːts/', vowelSound: '/ɔː/ nguyên âm sau tròn môi' },
                { word: 'choose', phonetic: '/tʃuːz/', vowelSound: '/uː/ nguyên âm sau chu môi' }
              ]
            },
            {
              step: 2,
              label: 'NẤC 2: MỤC ĐÍCH & LỢI ÍCH THỂ CHẤT (PHYSICAL BENEFITS)',
              cognitiveFunction: '2. Giải thích vì sao chọn môn này: giữ dáng & phát triển cơ bắp',
              content: 'because it helps me stay in good shape and build muscles.',
              bandLevel: 'Band 4.5 → 5.0',
              pedagogyNote: 'Dùng cụm collocation đắt giá từ giáo trình: "stay in good shape" và "build muscles".',
              flipCard: {
                frontText: 'Because it is good for body. (Từ vựng 4.0 sơ cấp)',
                backText: 'because it helps me stay in good shape and build muscles. (Collocation chuẩn 5.0)',
                explanation: 'Thay cụm "good for body" bằng cặp collocation học thuật "stay in good shape" và "build muscles".'
              },
              vowelHighlight: [
                { word: 'food', phonetic: '/fuːd/', vowelSound: '/uː/ ngậm chu môi dài' },
                { word: 'focus', phonetic: '/ˈfəʊ.kəs/', vowelSound: '/əʊ/ nguyên âm đôi' }
              ]
            },
            {
              step: 3,
              label: 'NẤC 3: MỞ RỘNG THÓI QUEN BỔ SUNG (HYDRATION ROUTINE)',
              cognitiveFunction: '3. Bổ sung thói quen uống nước bằng liên từ liên kết chuẩn',
              content: 'Besides, I also try to drink 2 liters of water every day by bringing along my own bottle to keep myself hydrated.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Nối ý bằng "Besides" và vận dụng cụm từ vựng "keep myself hydrated" (giữ cơ thể đủ nước).',
              flipCard: {
                frontText: 'And I drink 2 liter water every day. (Nói thô)',
                backText: 'Besides, I also try to drink 2 liters of water every day to keep myself hydrated. (Band 5.5 xuất sắc)',
                explanation: 'Dùng cấu trúc "to keep myself hydrated" bám sát 100% bài tập 2.2 trong Coursebook.'
              }
            }
          ],
          fullMosaicSummary: 'I often play badminton twice a week to stay healthy because it helps me stay in good shape and build muscles. Besides, I also try to drink 2 liters of water every day by bringing along my own bottle to keep myself hydrated.'
        }
      },
      {
        stageNumber: 2,
        stageType: 'progressive_reveal',
        title: 'Chặng 2: Speaking Flow Map — Bản Đồ Dòng Chảy Về Thói Quen Xấu (Unhealthy Habit)',
        pedagogicalObjective: 'Kích hoạt phản xạ trả lời câu hỏi hóc búa "Do you have any unhealthy habit?" theo cấu trúc 3 pha: Thừa nhận thói quen ăn nhanh → Hậu quả sức khỏe → Quyết tâm điều chỉnh.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click từng pha để theo dõi dòng chảy tư duy khi nói về thói quen sinh hoạt không tốt:',
          cards: [
            {
              step: 1,
              label: 'PHA 1: TRẢ LỜI TRỰC TIẾP & NGUYÊN DO (FAST FOOD & BUSY SCHEDULE)',
              cognitiveFunction: '1. Thừa nhận thói quen ăn đồ ăn nhanh vì không có thời gian nấu',
              content: 'Yes, I do. I used to eat a lot of fast food when I didn’t have time to cook a healthy meal.',
              bandLevel: 'Band 4.5 → 5.0',
              pedagogyNote: 'Dùng cấu trúc "used to + V" và mệnh đề thời gian "when I didn’t have time to cook...".',
              flipCard: {
                frontText: 'Yes, I eat fast food because busy. (Cộc lốc)',
                backText: 'Yes, I do. I used to eat a lot of fast food when I didn’t have time to cook a healthy meal. (Lưu loát)',
                explanation: 'Sử dụng câu mẫu nguyên bản trong mục 2.1 của sách.'
              }
            },
            {
              step: 2,
              label: 'PHA 2: HẬU QUẢ VỀ SỨC KHỎE (DETERIORATING HEALTH & CALORIES)',
              cognitiveFunction: '2. Mô tả việc sức khỏe đi xuống do nạp quá nhiều calo, chất béo và muối',
              content: 'Gradually, my health deteriorated because I was consuming too many foods high in calories, fat, and salt.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Học từ vựng chất lượng từ giáo trình: "health deteriorated" (sức khỏe sa sút) và "high in calories, fat, and salt".',
              flipCard: {
                frontText: 'My body got weak because of bad food. (Từ vựng sơ sài)',
                backText: 'Gradually, my health deteriorated because I was consuming foods high in calories, fat, and salt. (Chuẩn Band 5.5)',
                explanation: 'Dùng động từ "deteriorated" và cấu trúc "high in calories, fat, and salt" bám sát bài điền từ 2.1.'
              }
            },
            {
              step: 3,
              label: 'PHA 3: HÀNH ĐỘNG KHẮC PHỤC (BALANCED DIET REFLEX)',
              cognitiveFunction: '3. Khép lại bằng mục tiêu thay đổi thói quen ăn uống cân bằng',
              content: 'Therefore, I want to overcome this habit by following a more balanced diet.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Dùng liên từ "Therefore" và cụm "overcome this habit" (vượt qua thói quen) + "balanced diet" (chế độ ăn cân bằng).',
              flipCard: {
                frontText: 'So now I eat good food. (Tiếng Anh giao tiếp đơn giản)',
                backText: 'Therefore, I want to overcome this habit by following a more balanced diet. (Band 5.5 học thuật)',
                explanation: 'Thay thế bằng cụm diễn đạt chuẩn: overcome this habit by following a balanced diet.'
              },
              branchOptions: [
                {
                  branchName: 'THÓI QUEN THỨC KHUYA (STAY UP LATE)',
                  content: 'I used to stay up late browsing my phone, so I try to go to bed before 11 p.m. to improve my focus.',
                  note: 'Phương án mở rộng bám sát bài phát âm mục 1.3.'
                },
                {
                  branchName: 'THÓI QUEN ĂN NHANH (FAST FOOD)',
                  content: 'I used to eat junk food, but now I prefer home-cooked meals with plenty of green vegetables.',
                  note: 'Phương án đồ ăn nhanh theo đúng bài mẫu 2.1.'
                }
              ]
            }
          ],
          fullMosaicSummary: 'Yes, I do. I used to eat a lot of fast food when I didn’t have time to cook a healthy meal. Gradually, my health deteriorated because I was consuming too many foods high in calories, fat, and salt. Therefore, I want to overcome this habit by following a more balanced diet.'
        }
      },
      {
        stageNumber: 3,
        stageType: 'progressive_reveal',
        title: 'Chặng 3: Lexical Flip Cards — Bộ Thẻ Lật Lợi Ích Của Thói Quen Lành Mạnh (Activity 2.2)',
        pedagogicalObjective: 'Nạp nhanh 3 cụm hành động + lợi ích thể chất từ bài tập tư duy Activity 2.2: Bơi lội, Ngủ đủ giấc và Đa dạng thực phẩm.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click từng thẻ để biến các cụm từ ý niệm rời rạc trong giáo trình thành câu hoàn chỉnh:',
          cards: [
            {
              step: 1,
              label: 'THẺ 1: BƠI LỘI ĐỀU ĐẶN (SWIM REGULARLY & FLEXIBILITY)',
              cognitiveFunction: '1. Biến ý niệm "Swim regularly - improve height - more flexible" thành câu',
              content: 'Swimming regularly not only improves my height but also makes my body much more flexible.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Dùng danh động từ "Swimming regularly" làm Chủ ngữ kết hợp cấu trúc tương quan "not only... but also...".',
              flipCard: {
                frontText: 'Swim regularly – improve my height – make me more flexible (Gợi ý bài tập)',
                backText: 'Swimming regularly helps improve my posture and makes my body much more flexible. (Câu hoàn chỉnh)',
                explanation: 'Chuyển đổi các từ khóa thành câu ghép nhịp nhàng bám sát câu hỏi 1 mục 2.2.'
              }
            },
            {
              step: 2,
              label: 'THẺ 2: NGỦ ĐỦ GIẤC (GET ENOUGH SLEEP & PRODUCTIVITY)',
              cognitiveFunction: '2. Biến ý niệm "Get enough sleep - stay more focused - work productive" thành câu',
              content: 'Getting enough sleep helps me stay more focused during the day and work more productively.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Sử dụng cấu trúc "help someone do something" và đổi tính từ "productive" thành trạng từ "productively".',
              flipCard: {
                frontText: 'Get enough sleep – stay more focused – work productive (Gợi ý bài tập)',
                backText: 'Getting enough sleep helps me stay more focused and work productively. (Câu chuẩn xác)',
                explanation: 'Sửa lỗi sai dạng từ (word form) của từ "productive" thành trạng từ bổ nghĩa cho động từ "work".'
              }
            },
            {
              step: 3,
              label: 'THẺ 3: ĂN UỐNG ĐA DẠNG (DIFFERENT KINDS OF FOOD & NUTRIENTS)',
              cognitiveFunction: '3. Biến ý niệm "Eat different foods - provide - different nutrients" thành câu',
              content: 'Eating different kinds of fresh foods provides my body with essential nutrients and vitamins.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Làm chủ cấu trúc giới từ: "provide someone with something" (cung cấp cho ai cái gì).',
              flipCard: {
                frontText: 'Eat different kinds of foods – provide me – different nutrients (Gợi ý bài tập)',
                backText: 'Eating different kinds of foods provides my body with essential nutrients to stay strong. (Câu Band 5.5)',
                explanation: 'Bổ sung giới từ "with" chuẩn xác cho động từ "provide" theo câu hỏi 3 mục 2.2.'
              }
            }
          ],
          fullMosaicSummary: 'To maintain a healthy lifestyle, swimming regularly makes my body more flexible, getting enough sleep keeps me focused throughout the day, and eating different kinds of food provides essential nutrients for my body.'
        }
      }
    ]
  },
  {
    id: 'builder_w3d1',
    courseId: 'builder',
    week: 3,
    day: 1,
    skill: 'writing',
    title: 'WRITING · BUỔI 1: XÂY DỰNG ĐOẠN VĂN THÂN BÀI (BODY PARAGRAPH)',
    subtitle: 'Idea Tree, Mối Quan Hệ Nhân Quả (Lead to vs Stem from) & Phát Triển Supporting Idea',
    coreCompetency: 'Làm chủ cấu trúc đoạn thân bài IELTS Writing Task 2 (Topic Sentence → Core Idea → Reason/Result), kiểm soát chiều nhân quả (Cause → Effect vs Effect ← Cause) và triển khai supporting idea trọn vẹn.',
    bridgeToHomework: {
      promptText: 'Viết hoàn chỉnh 1 đoạn thân bài (Body Paragraph) cho đề bài Prevention vs Treatment trong phần Homework Tuần 3 Day 1.',
      targetExamId: 'exam_builder_w3d1'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'syntax_anatomy',
        title: 'Chặng 1: Idea Tree — Phân Rã Kiến Trúc Đoạn Thân Bài (Core Idea → Result)',
        pedagogicalObjective: 'Nhận diện dòng chảy logic của 1 đoạn thân bài: Bắt đầu từ Luận điểm chính (Core Idea), sau đó giải thích Cơ chế (Mechanism) và kết lại bằng Hệ quả xã hội (Result).',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Bấm phân tích để quan sát các mắt xích cấu tạo nên lập luận kinh tế của việc phòng bệnh:',
          mode: 'build',
          tokens: [
            { id: 't1', text: 'Firstly, investing in disease prevention', role: 'subject', colorClass: 'green' },
            { id: 't2', text: 'is more cost-effective than', role: 'fv_core', colorClass: 'orange' },
            { id: 't3', text: 'treating existing patients', role: 'object', colorClass: 'blue' },
            { id: 't4', text: 'because it reduces the rate of preventable diseases, saving huge medical budgets.', role: 'modifier', colorClass: 'purple' }
          ],
          slots: [
            { slotId: 's1', acceptedRoles: ['subject'], label: 'LUẬN ĐIỂM CHÍNH (CORE IDEA S)' },
            { slotId: 's2', acceptedRoles: ['fv_core'], label: 'ĐỘNG TỪ TRỌNG TÂM (CORE FV)' },
            { slotId: 's3', acceptedRoles: ['object'], label: 'ĐỐI TƯỢNG SO SÁNH (TARGET OBJECT)' },
            { slotId: 's4', acceptedRoles: ['modifier'], label: 'HỆ QUẢ KINH TẾ (RESULT / IMPACT MODIFIER)' }
          ]
        }
      },
      {
        stageNumber: 2,
        stageType: 'productive_failure',
        title: 'Chặng 2: Break & Repair 1 — Khắc Phục Xung Đột Chiều Nhân Quả (Lead to vs Stem from)',
        pedagogicalObjective: 'Phát hiện và chỉnh sửa lỗi đảo ngược chiều nguyên nhân - kết quả trong câu luận điểm học thuật.',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Click vào cụm liên kết đang làm đảo ngược chiều logic Nguyên nhân → Kết quả trong câu:',
          mode: 'break_and_repair',
          tokens: [
            { id: 't1', text: 'Severe traffic congestion in big cities', role: 'subject', colorClass: 'green' },
            { id: 't2', text: 'leads to', role: 'fv_core', colorClass: 'red' },
            { id: 't3', text: 'rapid population growth and urbanization.', role: 'object', colorClass: 'blue' }
          ],
          collisionTarget: {
            conflictingTokenIds: ['t1', 't2'],
            errorMessage: 'LỖI ĐẢO CHIỀU NHÂN QUẢ (DIRECTIONAL ERROR): "Dân số tăng nhanh" là NGUYÊN NHÂN, còn "Kẹt xe" là HỆ QUẢ. "Lead to" (dẫn đến) chỉ dùng theo chiều Cause → Effect!',
            repairOptions: [
              {
                id: 'opt_stem_from',
                action: 'morph',
                targetTokenId: 't2',
                resultText: 'stems from',
                explanation: 'Đổi thành "stems from" (bắt nguồn từ): Cấu trúc đúng Effect ← Cause: "Traffic congestion stems from rapid population growth."'
              }
            ]
          }
        }
      },
      {
        stageNumber: 3,
        stageType: 'productive_failure',
        title: 'Chặng 3: Break & Repair 2 — Khắc Phục Lỗi Liệt Kê Rỗng Ý (Empty Claim Collision)',
        pedagogicalObjective: 'Học cách gắn kết quả thực tế (Impact) vào luận điểm thay vì chỉ nêu nhận định chung chung thiếu sức thuyết phục.',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Click vào nhận định rỗng ý để bổ sung hệ quả cụ thể về năng suất lao động xã hội:',
          mode: 'break_and_repair',
          tokens: [
            { id: 't1', text: 'Secondly, a healthier population', role: 'subject', colorClass: 'green' },
            { id: 't2', text: 'is always good,', role: 'fv_core', colorClass: 'red' },
            { id: 't3', text: 'which makes people happy.', role: 'modifier', colorClass: 'gray' }
          ],
          collisionTarget: {
            conflictingTokenIds: ['t1', 't2'],
            errorMessage: 'LỖI LIỆT KÊ RỖNG Ý (EMPTY CLAIM): "is always good" quá chung chung và không đạt chuẩn học thuật Writing Task 2. Cần liên kết với Năng suất làm việc (Productivity)!',
            repairOptions: [
              {
                id: 'opt_upgrade_impact',
                action: 'morph',
                targetTokenId: 't2',
                resultText: 'leads to a more productive workforce and sustainable economic growth.',
                explanation: 'Nâng cấp chuẩn giáo trình: "Secondly, a healthier population leads to a more productive workforce and sustainable economic growth."'
              }
            ]
          }
        }
      }
    ]
  },
  {
    id: 'builder_w3d2',
    courseId: 'builder',
    week: 3,
    day: 2,
    skill: 'reading',
    title: 'READING · BUỔI 2: MAIN IDEA & DETAILS (CAMBRIDGE 10 TEST 3)',
    subtitle: 'Autumn Leaves: Anchor Laser Định Vị Đoạn, Chuỗi Bằng Chứng & Bàn Cân Nghịch Lý',
    coreCompetency: 'Làm chủ dạng bài Matching Information to Paragraphs bằng kỹ thuật quét Anchor Laser, lần vết điền từ tóm tắt Đoạn H và dùng Logic Scale hóa giải bẫy nghịch lý (Paradoxical) T/F/NG.',
    bridgeToHomework: {
      promptText: 'Hoàn thành câu hỏi 1-13 bài đọc Autumn Leaves trong Reading Homework Tuần 3 Day 2.',
      targetExamId: 'exam_builder_w3d2'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'verification_scale',
        title: 'Chặng 1: Block Reading Map + Anchor Laser — Định Vị Thông Tin Đoạn Văn (Matching Info)',
        pedagogicalObjective: 'Huấn luyện kỹ thuật khóa mục tiêu: Quét từ khóa "substance responsible for red colouration" để bắn tia laser trúng ngay Đoạn C chứa định nghĩa Anthocyanins.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Bấm đối chiếu để định vị đoạn văn chứa mô tả chất hóa học tạo nên màu đỏ của lá mùa thu:',
          passageContext: {
            title: 'Cambridge 10 Test 3 Passage 3: Autumn Leaves',
            paragraphs: [
              {
                id: 'pB',
                label: 'Đoạn B',
                text: 'Summer leaves are green because they are full of chlorophyll, the molecule that captures sunlight and converts that energy into new building materials for the tree... As chlorophyll is depleted, other colours begin to be revealed.'
              },
              {
                id: 'pC',
                label: 'Đoạn C',
                text: 'The source of the red is widely known: it is created by anthocyanins, water-soluble plant pigments reflecting the red to blue range of the visible spectrum. They belong to a class of sugar-based chemical compounds also known as flavonoids.'
              }
            ],
            targetParagraphId: 'pC',
            targetSnippet: 'The source of the red is widely known: it is created by anthocyanins, water-soluble plant pigments...'
          },
          statement: {
            rawText: 'Question 1: A description of the substance responsible for the red colouration of leaves.',
            deconstructedVariables: [
              { name: 'X_desc', text: 'description of the substance' },
              { name: 'Y_cause', text: 'responsible for' },
              { name: 'Z_target', text: 'red colouration of leaves' }
            ]
          },
          passageEvidence: {
            rawText: 'The source of the red is widely known: it is created by anthocyanins, water-soluble plant pigments...',
            targetVariables: [
              { matchingName: 'X_desc', text: 'water-soluble plant pigments / chemical compounds flavonoids' },
              { matchingName: 'Y_cause', text: 'created by / the source of' },
              { matchingName: 'Z_target', text: 'the red' }
            ]
          },
          expectedRelation: 'match',
          verdict: 'TRUE',
          pedagogicalInsight: 'Tia Anchor Laser: Câu hỏi tìm "substance responsible for red" khớp 100% với Đoạn C: "source of the red... created by anthocyanins, water-soluble plant pigments". Đoạn đáp án: C.'
        }
      },
      {
        stageNumber: 2,
        stageType: 'verification_scale',
        title: 'Chặng 2: Evidence Chain — Chuỗi Lần Vết 4 Mắt Xích Điền Từ Tóm Tắt (Summary Completion)',
        pedagogicalObjective: 'Lần vết câu tóm tắt giả thuyết Light Screen ở Đoạn H để chọn chính xác 1 từ duy nhất chỉ hướng nắng.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Thiết lập chuỗi bằng chứng so khớp câu tóm tắt với đoạn trích Đoạn H:',
          passageContext: {
            title: 'Cambridge 10 Test 3 Passage 3: Autumn Leaves',
            paragraphs: [
              {
                id: 'pH',
                label: 'Đoạn H (Dòng 1-4)',
                text: 'Even if you had never suspected that this is what was going on when leaves turn red, there are clues out there. One is straightforward: on many trees, the leaves that are the reddest are those on the side of the tree which gets most sun. Not only that, but the red is brighter on the upper side of the leaf.'
              }
            ],
            targetParagraphId: 'pH',
            targetSnippet: '...leaves that are the reddest are those on the side of the tree which gets most sun.'
          },
          statement: {
            rawText: 'Question 6 (Summary): The most vividly coloured red leaves are found on the side of the tree facing the [sun].',
            deconstructedVariables: [
              { name: 'A_intensity', text: 'most vividly coloured red leaves' },
              { name: 'B_location', text: 'found on the side of the tree' },
              { name: 'C_target_gap', text: 'facing the [sun]', isTrapWord: false }
            ]
          },
          passageEvidence: {
            rawText: '...leaves that are the reddest are those on the side of the tree which gets most sun.',
            targetVariables: [
              { matchingName: 'A_intensity', text: 'the reddest leaves' },
              { matchingName: 'B_location', text: 'on the side of the tree' },
              { matchingName: 'C_target_gap', text: 'which gets most sun' }
            ]
          },
          expectedRelation: 'match',
          verdict: 'TRUE',
          pedagogicalInsight: 'Cầu nối Paraphrase: "most vividly coloured red leaves" = "the reddest leaves", "facing the..." = "which gets most...". Từ duy nhất đúng quy định là "sun".'
        }
      },
      {
        stageNumber: 3,
        stageType: 'verification_scale',
        title: 'Chặng 3: Logic Verification Scale — Hóa Giải Bẫy Nghịch Lý (Question 11: TRUE)',
        pedagogicalObjective: 'Dùng đĩa cân logic để giải mã từ đồng nghĩa học thuật: "paradoxical" (nghịch lý) tương đương với "contradict what is known" để khẳng định đáp án TRUE.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'So khớp giả thuyết Light Screen với nhận thức ban đầu về chất diệp lục (Chlorophyll):',
          passageContext: {
            title: 'Cambridge 10 Test 3 Passage 3: Autumn Leaves',
            paragraphs: [
              {
                id: 'pF',
                label: 'Đoạn F (Dòng 1-5)',
                text: 'Perhaps the most plausible suggestion... is the theory known as the ‘light screen’ hypothesis. It sounds paradoxical, because the idea behind this hypothesis is that the red pigment is made in autumn leaves to protect chlorophyll, the light-absorbing chemical, from too much light. Why does chlorophyll need protection when it is the natural world’s supreme light absorber?'
              }
            ],
            targetParagraphId: 'pF',
            targetSnippet: 'It sounds paradoxical, because the idea behind this hypothesis is that the red pigment is made... to protect chlorophyll... from too much light.'
          },
          statement: {
            rawText: "Question 11: The 'light screen' hypothesis would initially seem to contradict what is known about chlorophyll.",
            deconstructedVariables: [
              { name: 'M_subject', text: "'light screen' hypothesis" },
              { name: 'N_contrast', text: 'initially seem to contradict', isTrapWord: false },
              { name: 'P_knowledge', text: 'what is known about chlorophyll (supreme light absorber)' }
            ]
          },
          passageEvidence: {
            rawText: 'It sounds paradoxical, because the idea behind this hypothesis is that the red pigment is made in autumn leaves to protect chlorophyll, the light-absorbing chemical, from too much light.',
            targetVariables: [
              { matchingName: 'M_subject', text: "'light screen' hypothesis" },
              { matchingName: 'N_contrast', text: 'sounds paradoxical (nghe có vẻ ngược đời / mâu thuẫn)' },
              { matchingName: 'P_knowledge', text: 'chlorophyll is supreme light absorber (chất hấp thụ ánh sáng đỉnh cao lại cần được che chắn ánh sáng)' }
            ]
          },
          expectedRelation: 'match',
          verdict: 'TRUE',
          pedagogicalInsight: 'Bàn cân Logic Scale: "paradoxical" đồng nghĩa 100% với "seem to contradict what is known" (nghe có vẻ nghịch lý/mâu thuẫn với bản chất hấp thụ ánh sáng của diệp lục). Cả hai đĩa cân thăng bằng hoàn hảo -> Đáp án: TRUE.'
        }
      }
    ]
  },
  {
    id: 'builder_w3d3',
    courseId: 'builder',
    week: 3,
    day: 3,
    skill: 'speaking',
    title: 'SPEAKING · BUỔI 3: MOVIES & PHẢN XẠ THẢO LUẬN SỞ THÍCH',
    subtitle: 'Transformation Ladder (Phim Thích vs Ghét), Speaking Flow Map & Movie Buff Collocations',
    coreCompetency: 'Luyện chuẩn các phụ âm cơ bản (/s/, /z/, /p/, /b/, /k/, /g/), làm chủ thang nâng cấp Transformation Ladder cho thể loại phim và vận dụng Speaking Flow Map để so sánh rạp chiếu phim vs xem ở nhà.',
    bridgeToHomework: {
      promptText: 'Ghi âm bài nói mô tả thể loại phim yêu thích và so sánh Cinema vs Home trong Speaking Homework Tuần 3 Day 3.',
      targetExamId: 'exam_builder_w3d3'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'progressive_reveal',
        title: 'Chặng 1: Transformation Ladder — Thang Nâng Cấp Câu Trả Lời Về Thể Loại Phim (Part 1)',
        pedagogicalObjective: 'Quan sát sự tiến hóa của câu trả lời về thể loại phim thích nhất (Korean romance) và ghét nhất (Sci-fi) từ Band 4.0 lên 5.0 và 5.5.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click từng nấc thang để xem cách mở rộng câu nói từ rời rạc lên chuẩn học thuật:',
          cards: [
            {
              step: 1,
              label: 'NẤC 1: NÊU THỂ LOẠI YÊU THÍCH (MASSIVE FAN OF ROMANCE)',
              cognitiveFunction: '1. Khởi đầu với thể loại yêu thích và lý do cảm xúc ngọt ngào',
              content: 'I am a massive fan of Korean romance series because they have sweet moments and are very entertaining.',
              bandLevel: 'Band 4.0 → 4.5',
              pedagogyNote: 'Nâng cấp từ "I like Korean movies" lên cụm chuẩn "I am a massive fan of Korean romance series".',
              flipCard: {
                frontText: 'I like Korean movie because romantic. (Band 4.0 nói cộc)',
                backText: 'I am a massive fan of Korean romance series because they have sweet moments. (Band 4.5)',
                explanation: 'Dùng cụm "a massive fan of" và tính từ "entertaining" đúng theo bài tập điền từ 2.1.'
              },
              vowelHighlight: [
                { word: 'series', phonetic: '/ˈsɪə.riːz/', vowelSound: '/s/ và /z/ cặp phụ âm xát' },
                { word: 'crispy', phonetic: '/ˈkrɪs.pi/', vowelSound: '/k/ và /p/ phụ âm bật hơi' }
              ]
            },
            {
              step: 2,
              label: 'NẤC 2: DẪN CHỨNG DIỄN VIÊN & PHIM THỰC TẾ (STARRING ACTOR)',
              cognitiveFunction: '2. Bổ sung dẫn chứng phim cụ thể và diễn viên đóng chính',
              content: 'Recently, I watched Boys Over Flowers which stars Lee Min Ho, and I really enjoyed the acting.',
              bandLevel: 'Band 4.5 → 5.0',
              pedagogyNote: 'Vận dụng động từ "stars" (có sự tham gia đóng chính của) từ đoạn hội thoại giữa Nam và Lan.',
              flipCard: {
                frontText: 'I watch Boys Over Flowers with Lee Min Ho. (Nói đơn giản)',
                backText: 'Recently, I watched Boys Over Flowers which stars Lee Min Ho, and I really enjoyed it. (Band 5.0)',
                explanation: 'Sử dụng mệnh đề quan hệ "which stars [Actor]" tạo liên kết câu tự nhiên.'
              }
            },
            {
              step: 3,
              label: 'NẤC 3: MỞ RỘNG THỂ LOẠI GHÉT NHẤT (LEAST FAVORITE & TOO COMPLEX)',
              cognitiveFunction: '3. Chuyển ý mượt mà sang thể loại không thích và giải thích độ khó của cốt truyện',
              content: 'In contrast, my least favorite genre is sci-fi because I find it hard to follow the details about technology, and it is just too complex to understand.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Dùng liên từ tương phản "In contrast", cụm "my least favorite genre" và cấu trúc "find it hard to follow".',
              flipCard: {
                frontText: 'I hate sci-fi. It is difficult for me. (Band 4.0)',
                backText: 'In contrast, my least favorite genre is sci-fi because I find it hard to follow the complex details. (Band 5.5)',
                explanation: 'Cấu trúc "find it hard to follow" và tính từ "complex" bám sát 100% mẫu câu mục 2.1.'
              }
            }
          ],
          fullMosaicSummary: 'I am a massive fan of Korean romance series because they have sweet moments and are very entertaining. Recently, I watched Boys Over Flowers which stars Lee Min Ho, and I really enjoyed it. In contrast, my least favorite genre is sci-fi because I find it hard to follow the details about science, and it is just too complex to understand.'
        }
      },
      {
        stageNumber: 2,
        stageType: 'progressive_reveal',
        title: 'Chặng 2: Speaking Flow Map — Bản Đồ So Sánh Trải Nghiệm (Cinema vs At Home)',
        pedagogicalObjective: 'Kích hoạt phản xạ phân tích 2 chiều cho câu hỏi kinh điển: "Do you prefer watching movies at home or at the cinema?"',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click từng pha để theo dõi dòng chảy so sánh giữa tính tiện lợi kinh tế và trải nghiệm rạp:',
          cards: [
            {
              step: 1,
              label: 'PHA 1: THỰC TẾ Ở NHÀ (CATCH UP ON RELEASES & SAVE MONEY)',
              cognitiveFunction: '1. Nêu thói quen xem phim tại nhà để tiết kiệm chi phí',
              content: 'To be honest, I usually stay home to catch up on new releases because it helps me save money.',
              bandLevel: 'Band 4.5 → 5.0',
              pedagogyNote: 'Làm chủ cụm từ vựng hay từ bài đối thoại: "catch up on new releases" (xem các phim mới ra).',
              flipCard: {
                frontText: 'I watch movie at home to save money. (Cộc lốc)',
                backText: 'I usually stay home to catch up on new releases to save money. (Chuẩn bài học 5.0)',
                explanation: 'Dùng cụm "catch up on new releases" trích xuất trực tiếp từ lời thoại của bạn Lan.'
              }
            },
            {
              step: 2,
              label: 'PHA 2: TRẢI NGHIỆM TẠI RẠP (LARGER SCREEN & SOUND QUALITY)',
              cognitiveFunction: '2. Nêu lý do vì sao những dịp đặc biệt vẫn muốn ra rạp thưởng thức',
              content: 'However, I prefer going to the cinema for blockbusters because it offers a much larger screen and better sound quality.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Dùng cụm so sánh "offers a larger screen and better sound quality" từ Coursebook.',
              flipCard: {
                frontText: 'Cinema has big screen and loud sound. (Tiếng Anh bồi)',
                backText: 'Going to the cinema offers a larger screen and superior sound quality. (Band 5.5)',
                explanation: 'Dùng động từ "offers" kết hợp danh từ "sound quality" để nâng tầm câu nói.'
              },
              branchOptions: [
                {
                  branchName: 'ƯU TIÊN RẠP CHIẾU (CINEMA ENTHUSIAST)',
                  content: 'I definitely prefer the cinema because the immersive atmosphere and giant screen make the movie much more exciting.',
                  note: 'Dành cho học viên thích trải nghiệm rạp.'
                },
                {
                  branchName: 'ƯU TIÊN Ở NHÀ (HOME COMFORT)',
                  content: 'I prefer watching at home because I can pause anytime and enjoy comfortable snacks on my couch.',
                  note: 'Dành cho học viên thích sự thoải mái ở nhà.'
                }
              ]
            }
          ],
          fullMosaicSummary: 'I usually stay home to catch up on new releases to save money. However, whenever there is a major blockbuster, I prefer going to the cinema because it offers a much larger screen and much better sound quality.'
        }
      },
      {
        stageNumber: 3,
        stageType: 'progressive_reveal',
        title: 'Chặng 3: Lexical Flip Cards — Bộ Thẻ Lật Collocation Phim Ảnh (Activity 2.2 & 2.3)',
        pedagogicalObjective: 'Thẩm thấu và nạp nhanh 3 cụm từ vựng đắt giá từ bài đọc đối thoại: Movie buff, Challenging roles và Stars in.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click từng thẻ để biến cách diễn đạt thông thường thành Collocation IELTS tự nhiên:',
          cards: [
            {
              step: 1,
              label: 'THẺ 1: NGƯỜI SÀNH PHIM / MỌT PHIM (A REAL MOVIE BUFF)',
              cognitiveFunction: '1. Khẳng định niềm đam mê xem phim bằng danh từ học thuật',
              content: 'You have no idea how much I love movies; I am a real movie buff and never miss good titles.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Từ vựng "movie buff" (/ˈmuː.vi bʌf/) trong giáo trình dùng để chỉ người cực kỳ say mê phim ảnh.',
              flipCard: {
                frontText: 'I love movies very much. (Band 4.0)',
                backText: "I'm a real movie buff and I don't want to miss any good movies. (Band 5.0+)",
                explanation: 'Cụm từ "a real movie buff" là từ bản xứ đắt giá trích từ lời thoại bạn Lan.'
              }
            },
            {
              step: 2,
              label: 'THẺ 2: VAI DIỄN ĐẦY THỬ THÁCH (INTERESTING & CHALLENGING ROLES)',
              cognitiveFunction: '2. Khen ngợi diễn viên yêu thích nhờ những vai diễn đột phá',
              content: 'My favorite actress is Ngo Thanh Van because she always chooses interesting and challenging roles.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Cụm "challenging roles" (những vai diễn đầy thử thách) bám sát lời thoại đánh giá diễn viên.',
              flipCard: {
                frontText: 'She is good actor and plays difficult parts. (Từ vựng cơ bản)',
                backText: 'She is a talented actress who always takes on challenging roles. (Chuẩn Band 5.5)',
                explanation: 'Kết hợp "talented actress" và "challenging roles" theo mẫu đối thoại mục 2.2.'
              }
            },
            {
              step: 3,
              label: 'THẺ 3: THAM GIA ĐÓNG VAI CHÍNH (STARS IN ACTION MOVIES)',
              cognitiveFunction: '3. Giới thiệu dòng phim mà diễn viên sở trường',
              content: 'Keanu Reeves stars in many famous action movies, and he is my all-time favorite actor.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Dùng cấu trúc "stars in [movie type]" thay cho cách nói vụng về "he is the main actor of".',
              flipCard: {
                frontText: 'He is the main character in action films. (Cách nói vụng)',
                backText: 'He stars in many action movies and he is my all-time favorite actor. (Chuẩn giáo trình)',
                explanation: 'Động từ "stars in" trích xuất trực tiếp từ lời thoại của Nam về phim John Wick.'
              }
            }
          ],
          fullMosaicSummary: "As a real movie buff, I love watching movies with talented actors who take on challenging roles. My favorite actor stars in thrilling action films that keep audiences completely hooked."
        }
      }
    ]
  },
  {
    id: 'builder_w4d1',
    courseId: 'builder',
    week: 4,
    day: 1,
    skill: 'writing',
    title: 'WRITING · BUỔI 1: LINKING DEVICES & KỸ THUẬT NỐI Ý (THIS / DOING SO)',
    subtitle: 'Sentence X-Ray, Nén Hành Động bằng DOING SO & Chỉnh Sửa Va Chạm Liên Từ',
    coreCompetency: 'Làm chủ kỹ thuật viết Topic Sentence cân đối (lợi ích/tác hại), vận dụng liên từ chuyển tiếp linh hoạt và sử dụng kỹ thuật nén ý nâng cao bằng đại từ THIS và DOING SO.',
    bridgeToHomework: {
      promptText: 'Hoàn thiện 5 câu luyện tập liên từ và viết topic sentence trong Writing Homework Tuần 4 Day 1.',
      targetExamId: 'exam_builder_w4d1'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'syntax_anatomy',
        title: 'Chặng 1: Sentence X-Ray — Kỹ Thuật Nén Hành Động Bằng "DOING SO"',
        pedagogicalObjective: 'Quan sát cơ chế nén toàn bộ cụm hành vi dài "investing in renewable energy" thành đại từ hành động "doing so" làm chủ ngữ cho mệnh đề chỉ kết quả.',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Bấm phân tích để quan sát cách cấu trúc "doing so" thay thế cho cả một cụm hành động phía trước:',
          mode: 'build',
          tokens: [
            { id: 't1', text: 'Governments should invest in renewable energy', role: 'subject', colorClass: 'green' },
            { id: 't2', text: 'because', role: 'connector', colorClass: 'purple' },
            { id: 't3', text: 'doing so', role: 'subject', colorClass: 'orange' },
            { id: 't4', text: 'helps reduce carbon emissions effectively.', role: 'fv_core', colorClass: 'blue' }
          ],
          slots: [
            { slotId: 's1', acceptedRoles: ['subject'], label: 'MỆNH ĐỀ HÀNH ĐỘNG GỐC (ACTION CLAUSE)' },
            { slotId: 's2', acceptedRoles: ['connector'], label: 'LIÊN TỪ LOGIC (REASON CONNECTOR)' },
            { slotId: 's3', acceptedRoles: ['subject'], label: 'ĐẠI TỪ NÉN HÀNH ĐỘNG (DOING SO)' },
            { slotId: 's4', acceptedRoles: ['fv_core'], label: 'KẾT QUẢ MÔI TRƯỜNG (ENVIRONMENTAL RESULT)' }
          ]
        }
      },
      {
        stageNumber: 2,
        stageType: 'productive_failure',
        title: 'Chặng 2: Break & Repair 1 — Va Chạm Liên Từ Chuyển Tiếp (In Addition vs However)',
        pedagogicalObjective: 'Phát hiện sự xung đột logic khi dùng liên từ bổ sung "In addition" để nối một ý trái ngược (mặt tiêu cực của du lịch).',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Click vào liên từ đang làm xung đột chiều logic giữa lợi ích và bất lợi trong câu bên dưới:',
          mode: 'break_and_repair',
          tokens: [
            { id: 't1', text: 'Travelling helps people extend and deepen their knowledge about other places.', role: 'subject', colorClass: 'green' },
            { id: 't2', text: 'In addition,', role: 'connector', colorClass: 'red' },
            { id: 't3', text: 'doing so may sometimes cause cultural tension', role: 'fv_core', colorClass: 'orange' },
            { id: 't4', text: 'between tourists and local residents.', role: 'modifier', colorClass: 'blue' }
          ],
          collisionTarget: {
            conflictingTokenIds: ['t1', 't2'],
            errorMessage: 'LỖI XUNG ĐỘT LOGIC (CONNECTOR CONFLICT): Vế 1 là LỢI ÍCH (deepen knowledge), vế 2 là BẤT LỢI (cultural tension). Dùng "In addition" (thêm vào đó) là sai hoàn toàn logic chuyển ý!',
            repairOptions: [
              {
                id: 'opt_however',
                action: 'morph',
                targetTokenId: 't2',
                resultText: 'However,',
                explanation: 'Đổi thành "However," (Tuy nhiên): Khi chuyển từ mặt lợi sang mặt hại, bắt buộc dùng liên từ tương phản để báo hiệu sự đối lập.'
              }
            ]
          }
        }
      },
      {
        stageNumber: 3,
        stageType: 'productive_failure',
        title: 'Chặng 3: Break & Repair 2 — Chỉnh Sửa Câu Chủ Đề Lệch Trọng Tâm (Topic Sentence Misalignment)',
        pedagogicalObjective: 'Khắc phục lỗi câu chủ đề nói về "Lợi ích" trong khi toàn bộ thân bài bên dưới phân tích "Tác hại của việc lạm dụng điện thoại".',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Click vào câu chủ đề đang lệch hướng so với các dẫn chứng về tác hại công nghệ bên dưới:',
          mode: 'break_and_repair',
          tokens: [
            { id: 't1', text: 'Modern technology offers several benefits to society,', role: 'subject', colorClass: 'red' },
            { id: 't2', text: 'such as improved communication and efficiency.', role: 'modifier', colorClass: 'purple' },
            { id: 't3', text: 'However, people now talk less face-to-face and feel isolated because of their smartphones.', role: 'modifier', colorClass: 'blue' }
          ],
          collisionTarget: {
            conflictingTokenIds: ['t1', 't3'],
            errorMessage: 'LỖI LỆCH HƯỚNG CÂU CHỦ ĐỀ (MISALIGNMENT): Nội dung đoạn văn chứng minh người ta ít nói chuyện trực tiếp và bị kiệt sức vì điện thoại. Câu chủ đề không thể là "offers several benefits"!',
            repairOptions: [
              {
                id: 'opt_realign_topic',
                action: 'morph',
                targetTokenId: 't1',
                resultText: 'The overuse of modern technology causes many problems for modern society,',
                explanation: 'Căn chỉnh câu chủ đề bám sát bài tập mục 1: "The overuse of modern technology causes many problems for modern society, like less talking between people and spending too much time on phones."'
              }
            ]
          }
        }
      }
    ]
  },
  {
    id: 'builder_w4d2',
    courseId: 'builder',
    week: 4,
    day: 2,
    skill: 'reading',
    title: 'READING · BUỔI 2: ĐỌC CÓ MỤC TIÊU (CAMBRIDGE 16 TEST 2)',
    subtitle: 'The White Horse of Uffington: Logic Verification Scale & Chuỗi Bằng Chứng Niên Đại',
    coreCompetency: 'Làm chủ kỹ thuật đọc có mục tiêu định trước (Reading with a Goal), phân biệt ranh giới giữa Agreement vs Controversy (FALSE) và kiểm soát bẫy quan hệ nhân quả không có thật (NOT GIVEN).',
    bridgeToHomework: {
      promptText: 'Hoàn thành câu hỏi 1-13 bài đọc The White Horse of Uffington trong Reading Homework Tuần 4 Day 2.',
      targetExamId: 'exam_builder_w4d2'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'verification_scale',
        title: 'Chặng 1: Logic Verification Scale — Bàn Cân Phán Quyết "Đồng Thuận vs Tranh Cãi" (Question 4: FALSE)',
        pedagogicalObjective: 'Huấn luyện nhận diện mâu thuẫn trực tiếp giữa "have come to an agreement" và "more controversial / historians disagree" để kết luận FALSE.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'So khớp tuyên bố về sự đồng thuận của các sử gia với bằng chứng văn bản Đoạn 2:',
          passageContext: {
            title: 'Cambridge 16 Test 2 Passage 1: The White Horse of Uffington',
            paragraphs: [
              {
                id: 'p2',
                label: 'Đoạn 2 (Dòng 3-7)',
                text: 'More controversial is the date of the enigmatic Long Man of Wilmington in Sussex. While many historians are convinced the figure is prehistoric, others believe that it was the work of an artistic monk from a nearby priory and was created between the 11th and 15th centuries.'
              }
            ],
            targetParagraphId: 'p2',
            targetSnippet: 'More controversial is the date of the enigmatic Long Man of Wilmington... While many historians are convinced... others believe...'
          },
          statement: {
            rawText: 'Question 4: Historians have come to an agreement about the origins of the Long Man of Wilmington.',
            deconstructedVariables: [
              { name: 'X_actors', text: 'Historians' },
              { name: 'Y_action', text: 'have COME TO AN AGREEMENT', isTrapWord: true },
              { name: 'Z_subject', text: 'origins of the Long Man of Wilmington' }
            ]
          },
          passageEvidence: {
            rawText: 'More controversial is the date... While many historians are convinced the figure is prehistoric, others believe that it was the work of an artistic monk...',
            targetVariables: [
              { matchingName: 'X_actors', text: 'historians / others' },
              { matchingName: 'Y_action', text: 'MORE CONTROVERSIAL (tranh cãi gay gắt, người nói thời tiền sử, người nói thời trung cổ)' },
              { matchingName: 'Z_subject', text: 'origins of the Long Man of Wilmington' }
            ]
          },
          expectedRelation: 'contradiction',
          verdict: 'FALSE',
          pedagogicalInsight: 'Mâu thuẫn logic trực diện: Câu hỏi tuyên bố "các sử gia đã đạt được thỏa thuận" (come to an agreement), trong khi bài đọc nêu rõ nguồn gốc bức hình là "tranh cãi gay gắt" (more controversial - ý kiến chia rẽ). Hai bên mâu thuẫn -> Phán quyết: FALSE.'
        }
      },
      {
        stageNumber: 2,
        stageType: 'verification_scale',
        title: 'Chặng 2: Logic Verification Scale — Bàn Cân Phán Quyết Bẫy Nhân Quả (Question 8: NOT GIVEN)',
        pedagogicalObjective: 'Phát hiện bẫy suy diễn nguyên nhân: Bài đọc nhắc đến cả "sự nổi tiếng" lẫn "kích thước khổng lồ" nhưng KHÔNG liên kết nhân quả "nổi tiếng là do kích thước".',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Kiểm tra xem tác giả có khẳng định sự nổi tiếng bắt nguồn từ kích thước hay không:',
          passageContext: {
            title: 'Cambridge 16 Test 2 Passage 1: The White Horse of Uffington',
            paragraphs: [
              {
                id: 'p2',
                label: 'Đoạn 2 (Dòng 1-3)',
                text: 'The most famous of these figures is perhaps also the most mysterious – the Uffington White Horse in Oxfordshire.'
              },
              {
                id: 'p5',
                label: 'Đoạn 5 (Dòng 4-6)',
                text: 'Indeed on a clear day the carving can be seen from up to 30 km away.'
              }
            ],
            targetParagraphId: 'p2',
            targetSnippet: 'The most famous of these figures is perhaps also the most mysterious – the Uffington White Horse...'
          },
          statement: {
            rawText: 'Question 8: The fame of the Uffington White Horse is due to its size.',
            deconstructedVariables: [
              { name: 'A_fame', text: 'The fame of the Uffington White Horse' },
              { name: 'B_cause_trap', text: 'IS DUE TO (nguyên nhân là do)', isTrapWord: true },
              { name: 'C_size', text: 'its size' }
            ]
          },
          passageEvidence: {
            rawText: 'The most famous of these figures is perhaps also the most mysterious... on a clear day the carving can be seen from up to 30 km away.',
            targetVariables: [
              { matchingName: 'A_fame', text: 'The most famous of these figures' },
              { matchingName: 'B_cause_trap', text: 'KHOẢNG TRỐNG DỮ LIỆU: Bài đọc KHÔNG hề giải thích nguyên nhân vì sao nó nổi tiếng' },
              { matchingName: 'C_size', text: 'can be seen from 30 km away' }
            ]
          },
          expectedRelation: 'no_evidence',
          verdict: 'NOT GIVEN',
          pedagogicalInsight: 'Bẫy quy kết nguyên nhân (False Causality Trap): Bài đọc có nhắc đến "famous" (nổi tiếng) và việc nhìn thấy từ 30km, nhưng hoàn toàn KHÔNG có mối nối nhân quả "is due to its size". Đĩa cân bị khuyết dữ kiện -> NOT GIVEN.'
        }
      },
      {
        stageNumber: 3,
        stageType: 'verification_scale',
        title: 'Chặng 3: Evidence Chain — Chuỗi Lần Vết 4 Mắt Xích Điền Từ Note Completion (Question 11)',
        pedagogicalObjective: 'Lần vết tọa độ phân tích niên đại bằng phương pháp OSL để điền chính xác 1 từ duy nhất chỉ vật chất được xét nghiệm.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Thiết lập chuỗi bằng chứng xác định chất liệu được phân tích niên đại ở Đoạn 7:',
          passageContext: {
            title: 'Cambridge 16 Test 2 Passage 1: The White Horse of Uffington',
            paragraphs: [
              {
                id: 'p7',
                label: 'Đoạn 7 (Dòng 1-4)',
                text: 'However, in 1995 Optically Stimulated Luminescence (OSL) testing was carried out by the Oxford Archaeological Unit on soil from two of the lower layers of the horse’s body, and from another cut near the base. The result was a date for the horse’s construction somewhere between 1400 and 600 BCE...'
              }
            ],
            targetParagraphId: 'p7',
            targetSnippet: '...testing was carried out... on soil from two of the lower layers of the horse’s body...'
          },
          statement: {
            rawText: 'Question 11 (Note): according to analysis of the surrounding [soil], the Horse is Late Bronze Age / Early Iron Age.',
            deconstructedVariables: [
              { name: 'M_method', text: 'according to analysis of' },
              { name: 'N_target_word', text: 'surrounding [soil]', isTrapWord: false },
              { name: 'P_result', text: 'Horse is Late Bronze Age / Early Iron Age' }
            ]
          },
          passageEvidence: {
            rawText: '...testing was carried out... on soil from two of the lower layers of the horse’s body... The result was a date... Late Bronze Age or Early Iron Age origin.',
            targetVariables: [
              { matchingName: 'M_method', text: 'OSL testing was carried out' },
              { matchingName: 'N_target_word', text: 'soil from two of the lower layers' },
              { matchingName: 'P_result', text: 'Late Bronze Age or Early Iron Age origin' }
            ]
          },
          expectedRelation: 'match',
          verdict: 'TRUE',
          pedagogicalInsight: 'Cầu nối Paraphrase: "analysis of..." = "testing was carried out on...". Danh từ gốc duy nhất chỉ mẫu phẩm khảo cổ được xét nghiệm là "soil".'
        }
      }
    ]
  },
  {
    id: 'builder_w4d3',
    courseId: 'builder',
    week: 4,
    day: 3,
    skill: 'speaking',
    title: 'SPEAKING · BUỔI 3: CELEBRITIES & TƯ DUY PHẢN BIỆN VỀ SỰ NỔI TIẾNG',
    subtitle: 'Transformation Ladder (Mô Tả Thần Tượng), Speaking Flow Map (Cân Não) & Cặp Phụ Âm Khó',
    coreCompetency: 'Luyện chuẩn các phụ âm khó (/θ/, /ð/, /tʃ/, /dʒ/, /ʃ/, /ʒ/), làm chủ thang nâng cấp Transformation Ladder khi nói về thần tượng và ứng dụng Speaking Flow Map để phản xạ câu hỏi hai mặt: "Do you want to be famous?".',
    bridgeToHomework: {
      promptText: 'Ghi âm bài nói mô tả người nổi tiếng yêu thích và phân tích mặt lợi/hại của việc nổi tiếng trong Speaking Homework Tuần 4 Day 3.',
      targetExamId: 'exam_builder_w4d3'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'progressive_reveal',
        title: 'Chặng 1: Transformation Ladder — Thang Nâng Cấp Câu Trả Lời Về Thần Tượng (Celebrity)',
        pedagogicalObjective: 'Quan sát sự chuyển dịch từ câu nói đơn giản Band 4.0 lên câu ghép có mệnh đề quan hệ và từ vựng học thuật Band 5.0 - 5.5.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click từng nấc thang để xem cách mở rộng câu nói về người nổi tiếng yêu thích:',
          cards: [
            {
              step: 1,
              label: 'NẤC 1: NÊU TÊN THẦN TƯỢNG VÀ NGHỀ NGHIỆP (POP SINGER)',
              cognitiveFunction: '1. Giới thiệu nhân vật nổi tiếng bằng danh từ nghề nghiệp chuẩn xác',
              content: 'My all-time favorite Vietnamese celebrity is Son Tung M-TP, who is a famous pop singer.',
              bandLevel: 'Band 4.0 → 4.5',
              pedagogyNote: 'Dùng cụm "My all-time favorite celebrity is..." thay cho cách nói cộc lốc "I like Son Tung".',
              flipCard: {
                frontText: 'I like Son Tung M-TP. He is singer. (Band 4.0 nói cộc)',
                backText: 'My all-time favorite celebrity is Son Tung M-TP, who is a famous pop singer. (Band 4.5)',
                explanation: 'Sử dụng mệnh đề quan hệ "who is..." để liên kết câu trôi chảy hơn.'
              },
              vowelHighlight: [
                { word: 'thief', phonetic: '/θiːf/', vowelSound: '/θ/ phụ âm thổi hơi không rung' },
                { word: 'cheerful', phonetic: '/ˈtʃɪə.fəl/', vowelSound: '/tʃ/ phụ âm bật hơi không rung' }
              ]
            },
            {
              step: 2,
              label: 'NẤC 2: LÝ DO HÂM MỘ & TÀI NĂNG ÂM NHẠC (MUSICAL TALENT)',
              cognitiveFunction: '2. Nêu rõ phẩm chất tài năng và sự cống hiến cho từng sản phẩm nghệ thuật',
              content: 'I really admire him because of his exceptional musical talent and the energetic vibe in his performances.',
              bandLevel: 'Band 4.5 → 5.0',
              pedagogyNote: 'Làm chủ cụm collocation: "admire someone because of..." và "energetic vibe in performances".',
              flipCard: {
                frontText: 'Because he sings good and dances. (Từ vựng sơ sài)',
                backText: 'I really admire him because of his musical talent and energetic performances. (Chuẩn Band 5.0)',
                explanation: 'Thay "sings good" bằng danh từ học thuật "musical talent" và "energetic performances".'
              },
              vowelHighlight: [
                { word: 'mother', phonetic: '/ˈmʌð.ər/', vowelSound: '/ð/ phụ âm rung' },
                { word: 'joyful', phonetic: '/ˈdʒɔɪ.fəl/', vowelSound: '/dʒ/ phụ âm rung bật' }
              ]
            },
            {
              step: 3,
              label: 'NẤC 3: MỞ RỘNG TẦM ẢNH HƯỞNG & THÀNH TỰU (MILLIONS OF FANS)',
              cognitiveFunction: '3. Khẳng định tầm ảnh hưởng lớn của thần tượng đối với giới trẻ',
              content: 'He has released numerous hit songs and attracted millions of young followers across Southeast Asia.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Dùng thì hiện tại hoàn thành "has released numerous hit songs" để nói về thành tựu bền vững.',
              flipCard: {
                frontText: 'He has many songs and many people like him. (Band 4.0)',
                backText: 'He has released numerous hit songs and inspired millions of young fans. (Band 5.5)',
                explanation: 'Nâng cấp từ "many songs" thành "released numerous hit songs" và "inspired millions of young fans".'
              }
            }
          ],
          fullMosaicSummary: 'My all-time favorite celebrity is Son Tung M-TP, who is a famous pop singer in Vietnam. I really admire him because of his outstanding musical talent and energetic performances. Over the years, he has released numerous hit songs and inspired millions of young fans.'
        }
      },
      {
        stageNumber: 2,
        stageType: 'progressive_reveal',
        title: 'Chặng 2: Speaking Flow Map — Bản Đồ Cân Não: "Do You Want To Be Famous?"',
        pedagogicalObjective: 'Kích hoạt tư duy phản biện 2 mặt (Nhượng bộ về tiền tài $\rightarrow$ Nhấn mạnh cái giá mất tự do riêng tư $\rightarrow$ Kết luận lập trường cá nhân).',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click từng pha để theo dõi dòng chảy suy luận khi trả lời câu hỏi nhượng bộ phức tạp:',
          cards: [
            {
              step: 1,
              label: 'PHA 1: NHƯỢNG BỘ VỀ DANH VỌNG & THU NHẬP (LUCRATIVE INCOME)',
              cognitiveFunction: '1. Thừa nhận việc nổi tiếng mang lại thu nhập khủng và sự ngưỡng mộ',
              content: 'Although becoming famous can bring lucrative contracts and huge public admiration,',
              bandLevel: 'Band 4.5 → 5.0',
              pedagogyNote: 'Mở đầu câu nhượng bộ bằng liên từ "Although" kết hợp cụm từ đắt giá: "lucrative contracts" và "public admiration".',
              flipCard: {
                frontText: 'Famous people have lots of money. (Nói thô)',
                backText: 'Although becoming famous can bring lucrative income and public admiration... (Band 5.0)',
                explanation: 'Dùng mệnh đề phụ trạng ngữ "Although..." để tạo đà cho lập trường chính ở vế sau.'
              }
            },
            {
              step: 2,
              label: 'PHA 2: MẶT TRÁI - ĐÁNH ĐỔI SỰ RIÊNG TƯ (LOSS OF PRIVACY)',
              cognitiveFunction: '2. Nêu lý do từ chối vì không muốn bị truyền thông soi mói đời tư',
              content: 'I would definitely say no, because you completely lose your personal privacy and are constantly judged by the media.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Dùng cụm collocation bài thi: "lose personal privacy" (mất quyền riêng tư) và "constantly judged by the media".',
              flipCard: {
                frontText: 'No, because paparazzi follow everywhere. (Cộc)',
                backText: 'I would say no, because you lose your privacy and are constantly judged by the public. (Band 5.5)',
                explanation: 'Nêu bật rào cản tâm lý cốt lõi của người nổi tiếng theo đúng chủ đề bài học mục 2.3.'
              },
              branchOptions: [
                {
                  branchName: 'TỪ CHỐI VÌ ÁP LỰC RIÊNG TƯ (PRIVACY CONCERNS)',
                  content: 'I prefer living a normal life without paparazzi following my every move.',
                  note: 'Phương án chọn cuộc sống bình yên.'
                },
                {
                  branchName: 'CHẤP NHẬN NỔI TIẾNG VÌ ĐAM MÊ (CAREER AMBITION)',
                  content: 'Yes, because I want to use my influence to inspire others and support charity projects.',
                  note: 'Phương án muốn nổi tiếng để tạo ảnh hưởng tích cực.'
                }
              ]
            },
            {
              step: 3,
              label: 'PHA 3: KHẲNG ĐỊNH LỰA CHỌN CÁ NHÂN (PEACEFUL LIFESTYLE)',
              cognitiveFunction: '3. Khép lại bằng mong muốn một cuộc sống bình yên, tự do làm điều mình thích',
              content: 'Therefore, I prefer living a peaceful and private life where I can freely enjoy time with my family and friends.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Khép lại bằng trạng từ kết luận "Therefore" và cụm "prefer living a peaceful and private life".',
              flipCard: {
                frontText: 'So I want normal life with family. (Band 4.0)',
                backText: 'Therefore, I prefer living a peaceful life where I can freely enjoy my personal freedom. (Band 5.5)',
                explanation: 'Dùng mệnh đề quan hệ nơi chốn "where I can freely..." giúp bài nói tròn trịa và sâu sắc.'
              }
            }
          ],
          fullMosaicSummary: 'Although becoming famous can bring lucrative contracts and huge public admiration, I would definitely say no, because you completely lose your personal privacy and are constantly under pressure. Therefore, I prefer living a peaceful life where I can freely spend time with my loved ones.'
        }
      },
      {
        stageNumber: 3,
        stageType: 'progressive_reveal',
        title: 'Chặng 3: Lexical Flip Cards — Bộ Thẻ Lật Collocation Về Người Nổi Tiếng (Mục 2.2 & 2.3)',
        pedagogicalObjective: 'Nạp nhanh 3 cặp từ vựng đắt giá về người nổi tiếng: Public figure, Lucrative contracts và Media scrutiny.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click từng thẻ để biến cách nói bình dân thành cụm từ học thuật chuẩn Band 5.0 - 5.5:',
          cards: [
            {
              step: 1,
              label: 'THẺ 1: NHÂN VẬT CỦA CÔNG CHÚNG (A PUBLIC FIGURE)',
              cognitiveFunction: '1. Gọi tên người nổi tiếng bằng danh từ trung tính, học thuật',
              content: 'Once you become a public figure, every single action you take is watched closely by millions of people.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Thuật ngữ "public figure" (/ˈpʌb.lɪk ˈfɪɡ.ər/) nâng tầm đáng kể so với việc lặp đi lặp lại từ "famous person".',
              flipCard: {
                frontText: 'Famous people are watched by many people. (Nói thô)',
                backText: 'As a public figure, every action you take is scrutinized by the community. (Chuẩn Band 5.5)',
                explanation: 'Dùng cụm "public figure" kết hợp động từ "scrutinized" hoặc "watched closely".'
              }
            },
            {
              step: 2,
              label: 'THẺ 2: HỢP ĐỒNG QUẢNG CÁO BÉO BỞ (LUCRATIVE SPONSORSHIPS)',
              cognitiveFunction: '2. Nói về nguồn thu nhập chính của thần tượng bằng thuật ngữ kinh tế',
              content: 'Top celebrities often earn lucrative sponsorship contracts from international luxury brands.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Tính từ "lucrative" (/ˈluː.krə.tɪv/ - sinh lợi lớn) là collocation cực mạnh khi đi kèm "contracts" hoặc "deals".',
              flipCard: {
                frontText: 'They make a lot of money from advertising brands. (Band 4.0)',
                backText: 'They sign lucrative sponsorship deals with global brands. (Band 5.5)',
                explanation: 'Thay "make a lot of money from advertising" bằng "lucrative sponsorship deals".'
              }
            },
            {
              step: 3,
              label: 'THẺ 3: SỰ SOI MÓI CỦA TRUYỀN THÔNG (CONSTANT MEDIA SCRUTINY)',
              cognitiveFunction: '3. Mô tả áp lực từ cánh phóng viên và mạng xã hội',
              content: 'The hardest part of fame is coping with constant media scrutiny and rumors from the Internet.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Cụm từ "media scrutiny" (/ˈmiː.di.ə ˈskruː.tɪ.ni/ - sự săm soi của truyền thông) giúp diễn đạt trôi chảy áp lực nổi tiếng.',
              flipCard: {
                frontText: 'Reporters always follow and write bad rumors. (Tiếng Anh giao tiếp đơn giản)',
                backText: 'Celebrities have to deal with intense media scrutiny every single day. (Band 5.5 học thuật)',
                explanation: 'Sử dụng cụm "deal with intense media scrutiny" để giải thích áp lực của người nổi tiếng.'
              }
            }
          ],
          fullMosaicSummary: 'Being a public figure allows celebrities to sign lucrative sponsorship contracts, but they also have to endure intense media scrutiny and the total loss of personal freedom.'
        }
      }
    ]
  },
  {
    id: 'builder_w5d1',
    courseId: 'builder',
    week: 5,
    day: 1,
    skill: 'writing',
    title: 'WRITING · BUỔI 1: CÂU PHỨC & PHÁT TRIỂN Ý VỚI CẤU TRÚC ", WHICH + FV"',
    subtitle: 'Sentence X-Ray, Mệnh Đề Bổ Nghĩa Toàn Vế & Sửa Lỗi Ngắt Dòng Comma Splice',
    coreCompetency: 'Làm chủ cấu trúc câu phức nâng cao dùng ", which + FV" để bổ nghĩa cho cả mệnh đề đứng trước, khắc phục lỗi Comma Splice và phát triển supporting idea có chiều sâu logic (Reason → Impact).',
    bridgeToHomework: {
      promptText: 'Hoàn thành 5 câu ghép nối câu phức và viết 1 supporting idea trong Writing Homework Tuần 5 Day 1.',
      targetExamId: 'exam_builder_w5d1'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'syntax_anatomy',
        title: 'Chặng 1: Sentence X-Ray — Ghép Nối Mệnh Đề Bổ Nghĩa Toàn Vế (", which makes it...")',
        pedagogicalObjective: 'Quan sát cách đại từ ", which" đại diện cho toàn bộ sự thật ở mệnh đề trước, kết hợp với động từ tác động để biến 2 câu đơn thành 1 câu phức học thuật.',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Bấm phân tích để quan sát cơ chế ghép nối mệnh đề bổ nghĩa cho toàn bộ sự việc ở vế trước:',
          mode: 'build',
          tokens: [
            { id: 't1', text: 'Urban centers often house modern industries and businesses,', role: 'subject', colorClass: 'green' },
            { id: 't2', text: 'which', role: 'connector', colorClass: 'purple' },
            { id: 't3', text: 'makes it easier', role: 'fv_core', colorClass: 'orange' },
            { id: 't4', text: 'for newcomers to apply for a decent job.', role: 'modifier', colorClass: 'blue' }
          ],
          slots: [
            { slotId: 's1', acceptedRoles: ['subject'], label: 'MỆNH ĐỀ SỰ THẬT NỀN TẢNG (BASE CLAUSE)' },
            { slotId: 's2', acceptedRoles: ['connector'], label: 'ĐẠI TỪ MÓC NỐI TOÀN VẾ (, WHICH)' },
            { slotId: 's3', acceptedRoles: ['fv_core'], label: 'ĐỘNG TỪ TÁC ĐỘNG (ACTION FV)' },
            { slotId: 's4', acceptedRoles: ['modifier'], label: 'HỆ QUẢ THỰC TẾ (PRAGMATIC IMPACT)' }
          ]
        }
      },
      {
        stageNumber: 2,
        stageType: 'productive_failure',
        title: 'Chặng 2: Break & Repair 1 — Khắc Phục Lỗi Comma Splice (Ngắt Câu Vụn Bằng Dấu Phẩy)',
        pedagogicalObjective: 'Phát hiện và sửa lỗi ngắt 2 mệnh đề độc lập chỉ bằng 1 dấu phẩy (Comma Splice) bằng cách cài đặt cấu trúc chuẩn ", which enables them to...".',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Click vào đại từ nhân xưng đang gây ra lỗi Comma Splice trong câu bên dưới:',
          mode: 'break_and_repair',
          tokens: [
            { id: 't1', text: 'Better infrastructure in cities enables newcomers to find jobs more easily,', role: 'subject', colorClass: 'green' },
            { id: 't2', text: 'they', role: 'subject', colorClass: 'red' },
            { id: 't3', text: 'can settle down', role: 'fv_core', colorClass: 'orange' },
            { id: 't4', text: 'quickly after migration.', role: 'modifier', colorClass: 'blue' }
          ],
          collisionTarget: {
            conflictingTokenIds: ['t1', 't2'],
            errorMessage: 'LỖI COMMA SPLICE (CÚ PHÁP ĐỨT GÃY): Dấu phẩy không thể ngăn cách trực tiếp 2 mệnh đề độc lập với chủ ngữ "they". Cần dùng đại từ quan hệ ", which"!',
            repairOptions: [
              {
                id: 'opt_which_enables',
                action: 'morph',
                targetTokenId: 't2',
                resultText: 'which enables them to settle down quickly after migration.',
                explanation: 'Sửa thành ", which enables them to settle down quickly": Thay thế "they can settle down" bằng cấu trúc rút gọn mệnh đề quan hệ học thuật chuẩn giáo trình.'
              }
            ]
          }
        }
      },
      {
        stageNumber: 3,
        stageType: 'productive_failure',
        title: 'Chặng 3: Break & Repair 2 — Nâng Cấp Chuỗi Câu Ngắn Rời Rạc Thành Supporting Idea',
        pedagogicalObjective: 'Khắc phục thói quen viết các câu đơn cộc lốc bằng liên từ phụ thuộc "Because..." và hệ quả ", which leads to...".',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Click vào câu đơn rời rạc bên dưới để biến chuỗi ý niệm thành câu phức có chiều sâu:',
          mode: 'break_and_repair',
          tokens: [
            { id: 't1', text: 'Science subjects usually require a lot of calculations.', role: 'subject', colorClass: 'red' },
            { id: 't2', text: 'So, fewer students decide to pursue these majors at university.', role: 'modifier', colorClass: 'orange' }
          ],
          collisionTarget: {
            conflictingTokenIds: ['t1', 't2'],
            errorMessage: 'LỖI CÂU ĐƠN RỜI RẠC (CHOPPY SENTENCES): Viết 2 câu ngắn bắt đầu bằng "So," khiến bài viết bị giới hạn ở Band 4.5 - 5.0. Cần nối thành câu phức đa tầng!',
            repairOptions: [
              {
                id: 'opt_complex_upgrade',
                action: 'morph',
                targetTokenId: 't1',
                resultText: 'Because science subjects involve complex theories and abstract calculations, many students find them overwhelming, which leads to a significant decline in university enrollments.',
                explanation: 'Nâng cấp chuẩn giáo trình mục 2: "Because science subjects involve complex theories and abstract calculations, many students find them overwhelming, which leads to a significant decline in university enrollments."'
              }
            ]
          }
        }
      }
    ]
  },
  {
    id: 'builder_w5d2',
    courseId: 'builder',
    week: 5,
    day: 2,
    skill: 'reading',
    title: 'READING · BUỔI 2: ĐÁNH GIÁ BẰNG CHỨNG (COMPLETE IELTS BAND 5 - 6.5)',
    subtitle: 'Why Don\'t Babies Talk Like Adults: Logic Verification Scale & Chuỗi Bằng Chứng Harvard',
    coreCompetency: 'Làm chủ kỹ thuật Evaluating Evidence, phân định ranh giới đối lập trực diện giữa Easy vs Hard (NO) và hóa giải bẫy suy diễn so sánh ngoài bài (NOT GIVEN).',
    bridgeToHomework: {
      promptText: 'Hoàn thành câu hỏi 1-14 bài đọc Why Don\'t Babies Talk Like Adults trong Reading Homework Tuần 5 Day 2.',
      targetExamId: 'exam_builder_w5d2'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'verification_scale',
        title: 'Chặng 1: Logic Verification Scale — Bàn Cân Phán Quyết Đối Nghịch Trực Diện (Question 4: NO)',
        pedagogicalObjective: 'Nhận diện xung đột 180 độ giữa tính từ "easy" trong câu hỏi và "hard" trong bài đọc để ra phán quyết NO.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'So khớp mức độ khó/dễ trong việc giải thích từ đầu tiên của trẻ giữa câu hỏi và Đoạn 3:',
          passageContext: {
            title: 'Complete IELTS Band 5-6.5: Why don\'t babies talk like adults?',
            paragraphs: [
              {
                id: 'p3',
                label: 'Đoạn 3 (Dòng 3-6)',
                text: 'In fact, it\'s easy for scientists to show that a copycat theory of language acquisition can\'t explain children\'s first words. What is hard for them to do is to explain these first words, and how they fit into the language acquisition pattern.'
              }
            ],
            targetParagraphId: 'p3',
            targetSnippet: 'What is hard for them to do is to explain these first words, and how they fit into the language acquisition pattern.'
          },
          statement: {
            rawText: 'Question 4: Scientists have found it easy to work out why babies use one-word sentences.',
            deconstructedVariables: [
              { name: 'X_subject', text: 'Scientists' },
              { name: 'Y_difficulty', text: 'HAVE FOUND IT EASY to work out', isTrapWord: true },
              { name: 'Z_target', text: 'why babies use one-word sentences (first words)' }
            ]
          },
          passageEvidence: {
            rawText: 'What is hard for them to do is to explain these first words, and how they fit into the language acquisition pattern.',
            targetVariables: [
              { matchingName: 'X_subject', text: 'scientists' },
              { matchingName: 'Y_difficulty', text: 'WHAT IS HARD FOR THEM TO DO (điều cực kỳ khó khăn với họ)' },
              { matchingName: 'Z_target', text: 'explain these first words (one-word sentences)' }
            ]
          },
          expectedRelation: 'contradiction',
          verdict: 'FALSE',
          pedagogicalInsight: 'Mâu thuẫn ngữ nghĩa trực tiếp (Direct Contradiction): Câu hỏi nhận định các nhà khoa học thấy "dễ dàng" (found it easy), trong khi bài khẳng định đó là điều "rất khó khăn" (what is hard for them to do). Hai bên trái ngược hoàn toàn -> Phán quyết: NO (FALSE).'
        }
      },
      {
        stageNumber: 2,
        stageType: 'verification_scale',
        title: 'Chặng 2: Logic Verification Scale — Bàn Cân Phán Quyết Bẫy So Sánh Ngoài Bài (Question 3: NOT GIVEN)',
        pedagogicalObjective: 'Phát hiện bẫy so sánh hơn không tồn tại: Bài đọc nói về việc trẻ bắt chước người lớn nhưng KHÔNG có dữ liệu so sánh số lượng hội thoại.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Kiểm tra xem tác giả có so sánh tần suất trò chuyện giữa người lớn và bạn cùng lứa hay không:',
          passageContext: {
            title: 'Complete IELTS Band 5-6.5: Why don\'t babies talk like adults?',
            paragraphs: [
              {
                id: 'p2',
                label: 'Đoạn 2',
                text: 'Many people assume children learn to talk by copying what they hear. In other words, they listen to the words adults use and the situations in which they use them and imitate accordingly.'
              },
              {
                id: 'p3',
                label: 'Đoạn 3',
                text: 'However, this \'copycat\' theory can\'t explain why toddlers aren\'t as conversational as adults.'
              }
            ],
            targetParagraphId: 'p2',
            targetSnippet: 'Many people assume children learn to talk by copying what they hear... they listen to the words adults use...'
          },
          statement: {
            rawText: 'Question 3: Children have more conversations with adults than with other children.',
            deconstructedVariables: [
              { name: 'A_subject', text: 'Children' },
              { name: 'B_comparison_trap', text: 'have MORE conversations with adults THAN with other children', isTrapWord: true },
              { name: 'C_context', text: 'conversation frequency' }
            ]
          },
          passageEvidence: {
            rawText: 'Many people assume children learn to talk by copying what they hear... listen to the words adults use...',
            targetVariables: [
              { matchingName: 'A_subject', text: 'children' },
              { matchingName: 'B_comparison_trap', text: 'KHOẢNG TRỐNG DỮ LIỆU: Bài đọc KHÔNG hề so sánh số lượng trò chuyện với người lớn so với trẻ em khác' },
              { matchingName: 'C_context', text: 'copying what they hear' }
            ]
          },
          expectedRelation: 'no_evidence',
          verdict: 'NOT GIVEN',
          pedagogicalInsight: 'Bẫy so sánh ngoài bài (Unsubstantiated Comparison Trap): Bài đọc chỉ đề cập trẻ bắt chước người lớn, hoàn toàn KHÔNG có bất kỳ con số hay so sánh nào về việc trẻ nói chuyện với người lớn nhiều hơn với trẻ khác -> Đĩa cân bị khuyết dữ kiện -> Phán quyết: NOT GIVEN.'
        }
      },
      {
        stageNumber: 3,
        stageType: 'verification_scale',
        title: 'Chặng 3: Evidence Chain — Chuỗi Lần Vết Nghiên Cứu Harvard (Question 13: Ordered Steps)',
        pedagogicalObjective: 'Lần vết chuỗi bằng chứng của nghiên cứu trẻ nuôi từ Trung Quốc để rút ra kết luận ngôn ngữ diễn ra theo từng bước tuần tự.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Thiết lập chuỗi bằng chứng so khớp kết luận nghiên cứu tại Đại học Harvard ở Đoạn 8:',
          passageContext: {
            title: 'Complete IELTS Band 5-6.5: Why don\'t babies talk like adults?',
            paragraphs: [
              {
                id: 'p8',
                label: 'Đoạn 8 (Dòng 5-10)',
                text: 'The adoptees then went through the same stages as typical American-born children, albeit at a faster clip. The adoptees and native children started combining words in sentences when their vocabulary reached the same sizes, further suggesting that what matters is not how old you are or how mature your brain is, but the number of words you know.'
              }
            ],
            targetParagraphId: 'p8',
            targetSnippet: 'The adoptees then went through the same stages as typical American-born children... started combining words in sentences when their vocabulary reached the same sizes...'
          },
          statement: {
            rawText: 'Question 13: What did the Harvard finding show? -> [Language learning takes place in ordered steps].',
            deconstructedVariables: [
              { name: 'M_actor', text: 'Harvard study (Snedeker, Geren, Shafto)' },
              { name: 'N_finding', text: 'Language learning takes place in ordered steps', isTrapWord: false },
              { name: 'P_evidence', text: 'stages-of-language hypothesis confirmed' }
            ]
          },
          passageEvidence: {
            rawText: 'The adoptees then went through the same stages as typical American-born children... started combining words when their vocabulary reached the same sizes...',
            targetVariables: [
              { matchingName: 'M_actor', text: 'studied language development of 27 children adopted from China' },
              { matchingName: 'N_finding', text: 'went through the same stages... not how mature your brain is, but the number of words you know' },
              { matchingName: 'P_evidence', text: 'ordered steps based on vocabulary accumulation' }
            ]
          },
          expectedRelation: 'match',
          verdict: 'TRUE',
          pedagogicalInsight: 'Cầu nối Paraphrase: "went through the same stages... word-combination process" = "takes place in ordered steps" (học ngôn ngữ diễn ra theo từng bước tuần tự tích lũy từ vựng). Đáp án: B.'
        }
      }
    ]
  },
  {
    id: 'builder_w5d3',
    courseId: 'builder',
    week: 5,
    day: 3,
    skill: 'speaking',
    title: 'SPEAKING · BUỔI 3: FAMILY & LÒNG BIẾT ƠN VỚI TỔ ẤM',
    subtitle: 'Transformation Ladder (Cảm Xúc Gia Đình), Speaking Flow Map & Giảm Âm Tiết (Syllables)',
    coreCompetency: 'Luyện chuẩn số âm tiết từ hay nhầm (comfortable, interesting, vehicle), làm chủ quy tắc trọng âm và âm Schwa /ə/, đồng thời vận dụng Transformation Ladder & Speaking Flow Map để chia sẻ sâu sắc về tình cảm gia đình.',
    bridgeToHomework: {
      promptText: 'Ghi âm bài nói mô tả thành viên thân thiết nhất trong gia đình và đọc chuẩn 8 từ trọng âm trong Speaking Homework Tuần 5 Day 3.',
      targetExamId: 'exam_builder_w5d3'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'progressive_reveal',
        title: 'Chặng 1: Transformation Ladder — Thang Nâng Cấp Câu Nói Về Tình Cảm Gia Đình (Part 1)',
        pedagogicalObjective: 'Quan sát sự tiến hóa từ câu nói sơ cấp Band 4.0 lên câu ghép chan chứa lòng biết ơn và các cụm thành ngữ gia đình Band 5.0 - 5.5.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click từng nấc thang để xem cách diễn đạt lòng biết ơn với Mẹ tiến hóa từ rời rạc lên sâu sắc:',
          cards: [
            {
              step: 1,
              label: 'NẤC 1: NÊU THÀNH VIÊN THÂN THIẾT (CLOSEST PERSON)',
              cognitiveFunction: '1. Khởi đầu với người thân thiết nhất trong nhà và sự tận tụy',
              content: 'The person I feel closest to is my mother, who works tirelessly to care for our family.',
              bandLevel: 'Band 4.0 → 4.5',
              pedagogyNote: 'Dùng cấu trúc "The person I feel closest to is..." kết hợp trạng từ "tirelessly" (không mệt mỏi).',
              flipCard: {
                frontText: 'I love my mom very much. She works hard. (Band 4.0 nói cộc)',
                backText: 'The person I feel closest to is my mother, who works tirelessly for our family. (Band 4.5)',
                explanation: 'Nối câu bằng đại từ quan hệ "who" và dùng trạng từ học thuật "tirelessly" từ bài đọc mục 1.4.'
              },
              vowelHighlight: [
                { word: 'comfortable', phonetic: '/ˈkʌmftəbl/', vowelSound: '3 âm tiết (nuốt âm -or-)' },
                { word: 'interesting', phonetic: '/ˈɪntrəstɪŋ/', vowelSound: '3 âm tiết (nuốt âm -e-)' }
              ]
            },
            {
              step: 2,
              label: 'NẤC 2: ĐIỂM TỰA TINH THẦN (A SHOULDER TO CRY ON)',
              cognitiveFunction: '2. Bổ sung dẫn chứng về sự chia sẻ cảm xúc và điểm tựa khi gặp bế tắc',
              content: 'Whenever I face stressful moments at work, she always listens patiently and gives me a shoulder to cry on.',
              bandLevel: 'Band 4.5 → 5.0',
              pedagogyNote: 'Vận dụng thành ngữ đắt giá từ Coursebook: "give someone a shoulder to cry on" (cho ai điểm tựa tinh thần).',
              flipCard: {
                frontText: 'She talks with me when I am sad. (Từ vựng cơ bản)',
                backText: 'She listens patiently and gives me a shoulder to cry on when things get tough. (Chuẩn Band 5.0)',
                explanation: 'Cụm từ "gives me a shoulder to cry on" trích xuất trực tiếp từ bài tập điền từ mục 1.4.'
              },
              vowelHighlight: [
                { word: 'family', phonetic: '/ˈfæm.əl.i/', vowelSound: 'Trọng âm rơi vào âm tiết đầu' },
                { word: 'familiar', phonetic: '/fəˈmɪl.i.ər/', vowelSound: 'Trọng âm rơi vào âm tiết hai, âm đầu Schwa /ə/' }
              ]
            },
            {
              step: 3,
              label: 'NẤC 3: MỞ RỘNG LÒNG BIẾT ƠN & Ý NGUYỆN TƯƠNG LAI (REPAY LOVE AND CARE)',
              cognitiveFunction: '3. Bày tỏ mong muốn đền đáp công ơn và trân trọng từng phút giây bên mẹ',
              content: 'I hope one day I can repay her for all her sacrifices, but for now, I simply cherish every single moment with her.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Làm chủ cặp động từ học thuật: "repay someone for..." (đền đáp) và "cherish every moment" (trân quý từng khoảnh khắc).',
              flipCard: {
                frontText: 'I want to give her money and stay with her. (Nói thô)',
                backText: 'I hope to repay her for all her love, and I cherish every single moment with her. (Band 5.5 sâu sắc)',
                explanation: 'Sử dụng cụm "repay her for all the love and care" và "cherish every moment" đúng theo đoạn văn mẫu 1.4.'
              }
            }
          ],
          fullMosaicSummary: 'The person I feel closest to is my mother, who works tirelessly to make our home a warm place. Whenever I feel overwhelmed, she always gives me a shoulder to cry on. I hope one day I can repay her for all her sacrifices, but for now, I truly cherish every single moment with her.'
        }
      },
      {
        stageNumber: 2,
        stageType: 'progressive_reveal',
        title: 'Chặng 2: Speaking Flow Map — Bản Đồ Dòng Chảy Kể Về Gia Đình (Family Bonds)',
        pedagogicalObjective: 'Kích hoạt phản xạ 3 trạm nói về gia đình: Quy mô & không khí gia đình → Vai trò của trụ cột → Sự gắn kết vào cuối tuần.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click từng pha để theo dõi dòng chảy phản xạ trôi chảy về gia đình:',
          cards: [
            {
              step: 1,
              label: 'PHA 1: QUY MÔ & TỔ ẤM (A CLOSE-KNIT NUCLEAR FAMILY)',
              cognitiveFunction: '1. Nêu loại hình gia đình (hạt nhân) và mối quan hệ gần gũi giữa các thành viên',
              content: 'I come from a typical nuclear family of four, and we are extremely close-knit.',
              bandLevel: 'Band 4.5 → 5.0',
              pedagogyNote: 'Dùng cụm thuật ngữ "nuclear family" (gia đình hạt nhân) và tính từ "close-knit" (gắn bó khăng khít).',
              flipCard: {
                frontText: 'My family has 4 people. We are happy. (Tiếng Anh giao tiếp đơn giản)',
                backText: 'I come from a small nuclear family of four, and we are extremely close-knit. (Band 5.0)',
                explanation: 'Nâng cấp lên cụm "nuclear family" và "close-knit" để bài nói mang tính học thuật.'
              }
            },
            {
              step: 2,
              label: 'PHA 2: TRÁCH NHIỆM & SỰ HỖ TRỢ LẪN NHAU (HAVE EACH OTHER\'S BACK)',
              cognitiveFunction: '2. Mô tả sự sẻ chia công việc nhà và luôn đồng lòng tương trợ',
              content: 'Although everyone is occupied with their own jobs and studies, we always have each other\'s back whenever problems arise.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Dùng thành ngữ đắt giá từ sách: "have each other\'s back" (luôn ủng hộ và bảo bọc lẫn nhau).',
              flipCard: {
                frontText: 'We help each other when someone has trouble. (Band 4.0)',
                backText: 'Despite busy schedules, we always have each other\'s back whenever challenges arise. (Band 5.5)',
                explanation: 'Sử dụng thành ngữ "have each other\'s back" bám sát 100% giáo trình mục 1.4.'
              },
              branchOptions: [
                {
                  branchName: 'BỮA CƠM GIA ĐÌNH (FAMILY MEALS)',
                  content: 'No matter how busy we are, we always sit together for dinner to share daily stories.',
                  note: 'Dành cho gia đình chú trọng bữa cơm tối.'
                },
                {
                  branchName: 'TỤ HỌP CUỐI TUẦN (WEEKEND GATHERINGS)',
                  content: 'On weekends, we often visit our grandparents or go for a picnic to unwind together.',
                  note: 'Dành cho gia đình thích hoạt động cuối tuần.'
                }
              ]
            },
            {
              step: 3,
              label: 'PHA 3: Ý NGHĨA TINH THẦN CỐT LÕI (SAFE HAVEN)',
              cognitiveFunction: '3. Khẳng định gia đình là bến đỗ bình yên nhất sau mọi áp lực ngoài xã hội',
              content: 'For me, family is truly a safe haven where I can completely unwind and be my true self.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Vận dụng ẩn dụ "a safe haven" (bến đỗ an toàn/bình yên) kết hợp mệnh đề quan hệ nơi chốn "where I can...".',
              flipCard: {
                frontText: 'Home is best place for me to rest. (Nói thô)',
                backText: 'For me, my family is a safe haven where I can fully recharge my energy. (Band 5.5 xuất sắc)',
                explanation: 'Khép lại bài nói bằng hình ảnh ẩn dụ "safe haven" tạo ấn tượng mạnh với giám khảo.'
              }
            }
          ],
          fullMosaicSummary: 'I come from a small nuclear family of four, and we are extremely close-knit. Despite our busy schedules, we always have each other\'s back whenever difficulties arise. For me, family is a safe haven where I can completely unwind and feel unconditionally loved.'
        }
      },
      {
        stageNumber: 3,
        stageType: 'progressive_reveal',
        title: 'Chặng 3: Lexical Flip Cards — Bộ Thẻ Lật Collocation Gia Đình & Tình Thân (Mục 1.4 & 2.2)',
        pedagogicalObjective: 'Nạp nhanh 3 cặp từ vựng cảm xúc chất lượng cao: Shoulder to cry on, Have someone\'s back và Cherish every moment.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click từng thẻ để chuyển hóa cách nói mộc mạc thành cụm Collocation cảm xúc tự nhiên:',
          cards: [
            {
              step: 1,
              label: 'THẺ 1: ĐIỂM TỰA TINH THẦN (A SHOULDER TO CRY ON)',
              cognitiveFunction: '1. Diễn đạt sự an ủi và lắng nghe chân thành khi gặp tổn thương',
              content: 'My mother is always there to offer a shoulder to cry on whenever I feel defeated.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Cụm từ "a shoulder to cry on" (/ə ˈʃoʊl.dər tuː kraɪ ɑːn/) là thành ngữ chuẩn bản xứ về chỗ dựa tâm lý.',
              flipCard: {
                frontText: 'She lets me cry when I am sad. (Band 4.0)',
                backText: 'She always offers a warm shoulder to cry on during tough times. (Band 5.0+)',
                explanation: 'Thay thế cách nói nghĩa đen bằng thành ngữ "offer a shoulder to cry on" theo Coursebook.'
              }
            },
            {
              step: 2,
              label: 'THẺ 2: LUÔN ỦNG HỘ VÀ BẢO VỆ (HAVE SOMEONE\'S BACK)',
              cognitiveFunction: '2. Khẳng định sự đồng lòng và tương trợ vô điều kiện giữa các thành viên',
              content: 'In our family, we make sure we always have each other\'s back no matter what happens.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Thành ngữ "have someone\'s back" (/hæv sʌm.wʌnz bæk/) thể hiện sự bảo bọc, sẵn sàng sát cánh.',
              flipCard: {
                frontText: 'We help and protect each other. (Cách nói cơ bản)',
                backText: 'We always have each other\'s back through all ups and downs. (Band 5.5 tự nhiên)',
                explanation: 'Sử dụng cụm "have someone\'s back" trích xuất trực tiếp từ bài tập điền từ mục 1.4.'
              }
            },
            {
              step: 3,
              label: 'THẺ 3: TRÂN QUÝ TỪNG KHOẢNH KHẮC (CHERISH EVERY MOMENT)',
              cognitiveFunction: '3. Diễn đạt sự trân trọng thời gian sum họp bên cha mẹ',
              content: 'As my parents grow older, I realize how vital it is to cherish every single moment with them.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Động từ "cherish" (/ˈtʃer.ɪʃ/ - trân quý, nâng niu) giúp câu văn sâu lắng và cảm xúc hơn nhiều so với "remember" hay "enjoy".',
              flipCard: {
                frontText: 'I want to enjoy time with my parents. (Giao tiếp đơn giản)',
                backText: 'I truly cherish every moment I get to spend with my aging parents. (Band 5.5 học thuật)',
                explanation: 'Động từ "cherish" là từ chốt hạ câu kết bài tập 1.4: "all I can do is cherish every moment with her".'
              }
            }
          ],
          fullMosaicSummary: 'Family is about unconditional support: someone who gives you a shoulder to cry on, people who always have your back, and memories that you will cherish for the rest of your life.'
        }
      }
    ]
  },
  {
    id: 'builder_w6d1',
    courseId: 'builder',
    week: 6,
    day: 1,
    skill: 'writing',
    title: 'WRITING · BUỔI 1: ĐA DẠNG CẤU TRÚC CÂU & CHỦ NGỮ GIẢ DUMMY SUBJECTS',
    subtitle: 'Transformation Ladder, Chủ Ngữ Danh Động Từ (Gerund) & Động Từ Học Thuật (Feature, House)',
    coreCompetency: 'Làm chủ kỹ thuật đa dạng hóa cấu trúc câu (Gerund làm chủ ngữ thay thế Someone), vận dụng cấu trúc chủ ngữ giả (It is / There is) trong Topic Sentence và thay thế từ "have" bằng các động từ học thuật (feature, possess, house).',
    bridgeToHomework: {
      promptText: 'Viết lại 4 câu bằng cấu trúc học thuật và hoàn thiện full body paragraph trong Writing Homework Tuần 6 Day 1.',
      targetExamId: 'exam_builder_w6d1'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'syntax_anatomy',
        title: 'Chặng 1: Sentence X-Ray — Khung Xương Chủ Ngữ Giả (It is likely for sb to do sth)',
        pedagogicalObjective: 'Quan sát cách cấu trúc chủ ngữ giả "It is + adj + for sb to do sth" tạo đà trang trọng cho câu Topic Sentence mở đầu đoạn thân bài.',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Bấm phân tích để quan sát các thành phần cấu tạo nên câu chủ ngữ giả học thuật:',
          mode: 'build',
          tokens: [
            { id: 't1', text: 'It is highly beneficial', role: 'subject', colorClass: 'green' },
            { id: 't2', text: 'for underperforming students', role: 'modifier', colorClass: 'purple' },
            { id: 't3', text: 'to pursue', role: 'fv_core', colorClass: 'orange' },
            { id: 't4', text: 'vocational training early in their formative years.', role: 'object', colorClass: 'blue' }
          ],
          slots: [
            { slotId: 's1', acceptedRoles: ['subject'], label: 'CHỦ NGỮ GIẢ & TÍNH TỪ NHẤN MẠNH (DUMMY IT + ADJ)' },
            { slotId: 's2', acceptedRoles: ['modifier'], label: 'ĐỐI TƯỢNG TÁC ĐỘNG (TARGET BENEFICIARY)' },
            { slotId: 's3', acceptedRoles: ['fv_core'], label: 'ĐỘNG TỪ HÀNH ĐỘNG NÒNG CỐT (TO-INFINITIVE)' },
            { slotId: 's4', acceptedRoles: ['object'], label: 'MỤC TIÊU ĐÀO TẠO (VOCATIONAL GOAL)' }
          ]
        }
      },
      {
        stageNumber: 2,
        stageType: 'productive_failure',
        title: 'Chặng 2: Break & Repair 1 — Nâng Cấp Động Từ Bình Dân "have" Sang "feature / house"',
        pedagogicalObjective: 'Phát hiện sự đơn điệu khi lặp lại động từ "have" và thay thế bằng các động từ học thuật chuẩn xác theo từng ngữ cảnh.',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Click vào động từ bình dân trong câu bên dưới để nâng cấp lên chuẩn từ vựng học thuật:',
          mode: 'break_and_repair',
          tokens: [
            { id: 't1', text: 'The new university research campus', role: 'subject', colorClass: 'green' },
            { id: 't2', text: 'has', role: 'fv_core', colorClass: 'red' },
            { id: 't3', text: 'several state-of-the-art laboratories and modern lecture halls.', role: 'object', colorClass: 'blue' }
          ],
          collisionTarget: {
            conflictingTokenIds: ['t1', 't2'],
            errorMessage: 'TỪ VỰNG QUÁ ĐƠN ĐIỆU (REPETITIVE VERB): Dùng "has" khiến bài viết mang tính giao tiếp thông thường. Khi nói về khuôn viên chứa các phòng thí nghiệm, cần dùng động từ học thuật!',
            repairOptions: [
              {
                id: 'opt_house_verb',
                action: 'morph',
                targetTokenId: 't2',
                resultText: 'houses',
                explanation: 'Đổi thành "houses" (chứa đựng/là nơi đặt để): Thuật ngữ chuẩn trong giáo trình mục 1.3: "S + houses + đối tượng" (The campus houses several state-of-the-art laboratories).'
              }
            ]
          }
        }
      },
      {
        stageNumber: 3,
        stageType: 'productive_failure',
        title: 'Chặng 3: Break & Repair 2 — Chuyển Đổi Chủ Ngữ "Someone" Sang Danh Động Từ "Gerund"',
        pedagogicalObjective: 'Khắc phục thói quen luôn mở đầu câu bằng đại từ chỉ người (Students, People) bằng cách biến hành động thành Chủ ngữ Gerund (V-ing).',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Click vào cụm chỉ người để chuyển đổi hành động rời rạc thành Danh động từ làm Chủ ngữ:',
          mode: 'break_and_repair',
          tokens: [
            { id: 't1', text: 'Students who drop out of school early', role: 'subject', colorClass: 'red' },
            { id: 't2', text: 'can get a job and save up money.', role: 'fv_core', colorClass: 'blue' }
          ],
          collisionTarget: {
            conflictingTokenIds: ['t1', 't2'],
            errorMessage: 'CẤU TRÚC CÂU THIẾU LINH HOẠT: Quá nhiều câu mở đầu bằng "Students who...". Hãy đa dạng hóa bằng cách dùng Danh động từ (Gerund) làm Chủ ngữ!',
            repairOptions: [
              {
                id: 'opt_gerund_subject',
                action: 'morph',
                targetTokenId: 't1',
                resultText: 'Choosing to leave school early enables young people to secure immediate employment and build savings,',
                explanation: 'Nâng cấp chuẩn giáo trình mục 1.2: "Choosing to leave school early helps them to get a job, save up money, and potentially return once their financial worries have been resolved."'
              }
            ]
          }
        }
      }
    ]
  },
  {
    id: 'builder_w6d2',
    courseId: 'builder',
    week: 6,
    day: 2,
    skill: 'reading',
    title: 'READING · BUỔI 2: STONEHENGE & BẰNG CHỨNG KHẢO CỔ HỌC',
    subtitle: 'Orange 18 Reading Test 2: Logic Scale (Mâu Thuẫn Dịch Chuyển) & Chuỗi Bằng Chứng Sông Băng',
    coreCompetency: 'Làm chủ kỹ thuật đọc bám sát thực chứng khảo cổ, nhận diện mâu thuẫn giữa "stood in the same spot" vs "repositioned multiple times" (FALSE) và kiểm soát bẫy danh tính người phê bình (NOT GIVEN).',
    bridgeToHomework: {
      promptText: 'Hoàn thành câu hỏi 1-13 bài đọc Stonehenge trong Reading Homework Tuần 6 Day 2.',
      targetExamId: 'exam_builder_w6d2'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'verification_scale',
        title: 'Chặng 1: Logic Verification Scale — Bàn Cân Phán Quyết Mâu Thuẫn Vị Trí (Question 10: FALSE)',
        pedagogicalObjective: 'Phát hiện sự đối nghịch 180 độ giữa nhận định "đá xanh đứng yên một chỗ" và dữ liệu bài đọc "được sắp đặt lại nhiều lần" để ra phán quyết FALSE.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'So khớp giả thuyết về vị trí cố định của đá xanh với dữ liệu phóng xạ carbon ở Đoạn 2:',
          passageContext: {
            title: 'Orange 18 Reading Test 2: Stonehenge',
            paragraphs: [
              {
                id: 'p2',
                label: 'Đoạn 2 (Dòng 5-7)',
                text: 'Radiocarbon dating has revealed that work continued at Stonehenge until roughly 1600 BCE, with the bluestones in particular being repositioned multiple times.'
              }
            ],
            targetParagraphId: 'p2',
            targetSnippet: '...work continued at Stonehenge until roughly 1600 BCE, with the bluestones in particular being repositioned multiple times.'
          },
          statement: {
            rawText: 'Question 10: There is scientific proof that the bluestones stood in the same spot until approximately 1600 BCE.',
            deconstructedVariables: [
              { name: 'X_proof', text: 'scientific proof' },
              { name: 'Y_position_trap', text: 'STOOD IN THE SAME SPOT (đứng yên một chỗ)', isTrapWord: true },
              { name: 'Z_timeline', text: 'until approximately 1600 BCE' }
            ]
          },
          passageEvidence: {
            rawText: 'Radiocarbon dating has revealed that work continued... with the bluestones in particular being repositioned multiple times.',
            targetVariables: [
              { matchingName: 'X_proof', text: 'radiocarbon dating has revealed' },
              { matchingName: 'Y_position_trap', text: 'BEING REPOSITIONED MULTIPLE TIMES (bị di dời, sắp đặt lại rất nhiều lần)' },
              { matchingName: 'Z_timeline', text: 'until roughly 1600 BCE' }
            ]
          },
          expectedRelation: 'contradiction',
          verdict: 'FALSE',
          pedagogicalInsight: 'Mâu thuẫn ngữ nghĩa trực diện: Câu hỏi tuyên bố đá xanh "đứng yên tại một chỗ" (stood in the same spot), trong khi kết quả đo carbon chỉ ra chúng "bị dịch chuyển nhiều lần" (repositioned multiple times). Mâu thuẫn tuyệt đối -> Phán quyết: FALSE.'
        }
      },
      {
        stageNumber: 2,
        stageType: 'verification_scale',
        title: 'Chặng 2: Logic Verification Scale — Bàn Cân Phán Quyết Bẫy Danh Tính Giới Phê Bình (Question 13: NOT GIVEN)',
        pedagogicalObjective: 'Phát hiện bẫy gán ghép nghề nghiệp: Bài đọc có nhắc đến giới phê bình nhưng KHÔNG nói rõ họ có phải là "nhà thiên văn học khác" hay không.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Kiểm tra xem tác giả có xác nhận giới phê bình giả thuyết Hawkins là các nhà thiên văn học hay không:',
          passageContext: {
            title: 'Orange 18 Reading Test 2: Stonehenge',
            paragraphs: [
              {
                id: 'p6',
                label: 'Đoạn 6 (Dòng 4-8)',
                text: 'While his theory has received a considerable amount of attention over the decades, critics maintain that Stonehenge’s builders probably lacked the knowledge necessary to predict such events or that England’s dense cloud cover would have obscured their view of the skies.'
              }
            ],
            targetParagraphId: 'p6',
            targetSnippet: '...critics maintain that Stonehenge’s builders probably lacked the knowledge necessary to predict such events...'
          },
          statement: {
            rawText: 'Question 13: Criticism of Gerald Hawkins’ theory about Stonehenge has come mainly from other astronomers.',
            deconstructedVariables: [
              { name: 'A_subject', text: 'Criticism of Gerald Hawkins’ theory' },
              { name: 'B_identity_trap', text: 'come MAINLY FROM OTHER ASTRONOMERS', isTrapWord: true },
              { name: 'C_context', text: 'megalithic calendar debate' }
            ]
          },
          passageEvidence: {
            rawText: 'While his theory has received attention... critics maintain that Stonehenge’s builders lacked knowledge...',
            targetVariables: [
              { matchingName: 'A_subject', text: 'critics maintain' },
              { matchingName: 'B_identity_trap', text: 'KHOẢNG TRỐNG DỮ LIỆU: Chỉ nói chung chung là "critics" (giới phê bình), KHÔNG NÓI RÕ nghề nghiệp của họ là nhà thiên văn học hay nhà khảo cổ' },
              { matchingName: 'C_context', text: 'knowledge to predict events' }
            ]
          },
          expectedRelation: 'no_evidence',
          verdict: 'NOT GIVEN',
          pedagogicalInsight: 'Bẫy danh tính suy diễn (Unverified Identity Trap): Văn bản chỉ ghi nhận "critics maintain" (giới phê bình nhận định), hoàn toàn KHÔNG đề cập thông tin những người phê bình này chủ yếu là các nhà thiên văn học khác (other astronomers) -> Đĩa cân bị khuyết dữ kiện -> Phán quyết: NOT GIVEN.'
        }
      },
      {
        stageNumber: 3,
        stageType: 'verification_scale',
        title: 'Chặng 3: Evidence Chain — Chuỗi Lần Vết 4 Mắt Xích Điền Từ Note Completion (Question 5: Glaciers)',
        pedagogicalObjective: 'Lần vết giả thuyết địa chất về sự vận chuyển của đá xanh từ xứ Wales do sông băng tự nhiên mang lại.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Thiết lập chuỗi bằng chứng xác định tác nhân tự nhiên mang đá xanh tới bình nguyên Salisbury ở Đoạn 1:',
          passageContext: {
            title: 'Orange 18 Reading Test 2: Stonehenge',
            paragraphs: [
              {
                id: 'p1',
                label: 'Đoạn 1 (Dòng 3-6)',
                text: '...some scientists have suggested that it was glaciers, not humans, that carried the bluestones to Salisbury Plain. Most archaeologists have remained sceptical about this theory, however, wondering how the forces of nature could possibly have delivered the exact number of stones needed...'
              }
            ],
            targetParagraphId: 'p1',
            targetSnippet: '...it was glaciers, not humans, that carried the bluestones to Salisbury Plain.'
          },
          statement: {
            rawText: 'Question 5 (Note): Geological theory: they were brought from Wales by [glaciers].',
            deconstructedVariables: [
              { name: 'M_theory', text: 'Geological theory' },
              { name: 'N_target_word', text: 'brought from Wales by [glaciers]', isTrapWord: false },
              { name: 'P_subject', text: 'bluestones' }
            ]
          },
          passageEvidence: {
            rawText: '...some scientists have suggested that it was glaciers, not humans, that carried the bluestones to Salisbury Plain.',
            targetVariables: [
              { matchingName: 'M_theory', text: 'geologists / some scientists' },
              { matchingName: 'N_target_word', text: 'glaciers (carried the bluestones)' },
              { matchingName: 'P_subject', text: 'bluestones' }
            ]
          },
          expectedRelation: 'match',
          verdict: 'TRUE',
          pedagogicalInsight: 'Cầu nối Paraphrase: "brought by..." = "carried the bluestones". Danh từ chỉ tác nhân địa chất tự nhiên duy nhất trong văn bản là "glaciers" (sông băng). Điền: glaciers.'
        }
      }
    ]
  },
  {
    id: 'builder_w6d3',
    courseId: 'builder',
    week: 6,
    day: 3,
    skill: 'speaking',
    title: 'SPEAKING · BUỔI 3: TRAVEL AND TOURISM & KỂ CHUYỆN CHUYẾN ĐI',
    subtitle: 'Transformation Ladder (Chuyến Đi Đáng Nhớ), Speaking Flow Map & Quy Tắc Phát Âm Đuôi "-ed"',
    coreCompetency: 'Làm chủ 3 cách phát âm đuôi "-ed" (/ɪd/, /t/, /d/), sử dụng các thành ngữ du lịch (money down the drain, by word of mouth) và vận dụng mô hình Speaking Flow Map để kể về một chuyến đi đáng nhớ (Part 2 Storytelling).',
    bridgeToHomework: {
      promptText: 'Ghi âm bài nói kể về chuyến du lịch đáng nhớ nhất và phát âm chuẩn 10 động từ đuôi -ed trong Speaking Homework Tuần 6 Day 3.',
      targetExamId: 'exam_builder_w6d3'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'progressive_reveal',
        title: 'Chặng 1: Transformation Ladder — Thang Nâng Cấp Kể Về Chuyến Đi Đáng Nhớ (Storytelling)',
        pedagogicalObjective: 'Quan sát sự tiến hóa từ câu kể đơn giản thì quá khứ Band 4.0 lên câu chuyện du lịch giàu tính trải nghiệm và cảm xúc Band 5.0 - 5.5.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click từng nấc thang để xem cách mở rộng câu chuyện về chuyến du lịch đáng nhớ:',
          cards: [
            {
              step: 1,
              label: 'NẤC 1: GIỚI THIỆU ĐỊA ĐIỂM & THỜI ĐIỂM (COASTAL DESTINATION)',
              cognitiveFunction: '1. Khởi đầu với thời điểm, điểm đến và bạn đồng hành',
              content: 'Last summer, I embarked on a memorable trip to Da Nang with my close friends.',
              bandLevel: 'Band 4.0 → 4.5',
              pedagogyNote: 'Dùng động từ học thuật "embarked on a trip to..." thay cho cách nói quen thuộc "I went to...".',
              flipCard: {
                frontText: 'Last summer I went to Da Nang with friends. (Band 4.0)',
                backText: 'Last summer, I embarked on a memorable trip to Da Nang with my close friends. (Band 4.5)',
                explanation: 'Thay "went to" bằng "embarked on a memorable trip to" để bài nói có ngữ điệu tự nhiên hơn.'
              },
              vowelHighlight: [
                { word: 'visited', phonetic: '/ˈvɪz.ɪ.tɪd/', vowelSound: 'Đuôi -ed phát âm /ɪd/ sau âm /t/' },
                { word: 'walked', phonetic: '/wɔːkt/', vowelSound: 'Đuôi -ed phát âm /t/ sau âm vô thanh /k/' },
                { word: 'stayed', phonetic: '/steɪd/', vowelSound: 'Đuôi -ed phát âm /d/ sau nguyên âm hữu thanh /eɪ/' }
              ]
            },
            {
              step: 2,
              label: 'NẤC 2: TRẢI NGHIỆM PHONG CẢNH & ẨM THỰC (SCENERY & LOCAL CUISINE)',
              cognitiveFunction: '2. Nêu các hoạt động nổi bật: ngắm cảnh ngoạn mục và thưởng thức đặc sản',
              content: 'During our stay, we had the chance to enjoy breathtaking coastal scenery and explore unique local dishes.',
              bandLevel: 'Band 4.5 → 5.0',
              pedagogyNote: 'Làm chủ cặp collocation đắt giá trong sách: "enjoy breathtaking scenery" và "explore local cuisine".',
              flipCard: {
                frontText: 'We saw beautiful sea and ate good seafood. (Từ vựng cơ bản)',
                backText: 'We had the chance to enjoy breathtaking scenery and explore local cuisine. (Chuẩn Band 5.0)',
                explanation: 'Sử dụng cụm "enjoy breathtaking scenery" và "explore local cuisine" bám sát mục từ vựng 2.2.'
              }
            },
            {
              step: 3,
              label: 'NẤC 3: DẤU ẤN CẢM XÚC & KỶ NIỆM KHÓ PHAI (UNFORGETTABLE MEMORIES)',
              cognitiveFunction: '3. Khép lại bằng tác động tâm lý tích cực và những ký ức trân quý',
              content: 'Watching the sunset over My Khe beach truly refreshed my mind and left me with unforgettable memories.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Vận dụng cụm từ kết bài chuẩn mực trong Coursebook: "left me with unforgettable memories".',
              flipCard: {
                frontText: 'It was very fun and I will remember it. (Band 4.0)',
                backText: 'That trip refreshed my mind and left me with unforgettable memories. (Band 5.5 sâu sắc)',
                explanation: 'Dùng cụm "leave me with unforgettable memories" đúng theo bài tập điền từ mục 2.2.'
              }
            }
          ],
          fullMosaicSummary: 'Last summer, I embarked on a memorable trip to Da Nang with my close friends. During our stay, we had the wonderful opportunity to enjoy breathtaking coastal scenery and explore local cuisine. Watching the sunset over the sea completely refreshed my mind and left me with unforgettable memories.'
        }
      },
      {
        stageNumber: 2,
        stageType: 'progressive_reveal',
        title: 'Chặng 2: Speaking Flow Map — Bản Đồ Dòng Chảy Kể Chuyện Chuyến Đi (Travel Flow)',
        pedagogicalObjective: 'Kích hoạt phản xạ 3 pha khi giám khảo hỏi Part 2: Bối cảnh khởi hành → Điểm nhấn trải nghiệm → Đánh giá chuyến đi.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click từng pha để theo dõi dòng chảy tự nhiên khi tường thuật một chuyến đi:',
          cards: [
            {
              step: 1,
              label: 'PHA 1: LÊN KẾ HOẠCH & ĐIỂM ĐẾN (RESERVATION & DESTINATION)',
              cognitiveFunction: '1. Nêu bối cảnh kỳ nghỉ, cách đặt vé và lý do chọn điểm đến',
              content: 'I decided to travel to the central coast after hearing glowing reviews by word of mouth from my colleagues.',
              bandLevel: 'Band 4.5 → 5.0',
              pedagogyNote: 'Dùng thành ngữ trong bài đối thoại: "by word of mouth" (qua lời giới thiệu truyền miệng).',
              flipCard: {
                frontText: 'My friend told me to go there. (Giao tiếp thông thường)',
                backText: 'I chose this destination after hearing great reviews by word of mouth. (Band 5.0)',
                explanation: 'Sử dụng thành ngữ "by word of mouth" trích xuất trực tiếp từ lời thoại của Adam trong bài học 2.1.'
              }
            },
            {
              step: 2,
              label: 'PHA 2: KINH NGHIỆM CHI TIÊU & HOẠT ĐỘNG (AVOIDING WASTED MONEY)',
              cognitiveFunction: '2. Kể về kinh nghiệm đặt vé sớm để tránh lãng phí tiền bạc',
              content: 'We made our flight reservations well in advance, which saved us a lot of money instead of throwing money down the drain.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Vận dụng thành ngữ đắt giá từ sách: "money down the drain" (tiền ném qua cửa sổ / lãng phí).',
              flipCard: {
                frontText: 'We booked early so we did not waste money. (Band 4.0)',
                backText: 'Booking in advance prevented our budget from going down the drain. (Band 5.5)',
                explanation: 'Thành ngữ "money down the drain" lấy từ lời thoại của Eva khi xử lý hủy vé máy bay.'
              },
              branchOptions: [
                {
                  branchName: 'DU LỊCH NGHỈ DƯỠNG BIỂN (COASTAL RESORT)',
                  content: 'We spent most of our time unwinding on the tranquil beach and enjoying fresh seafood.',
                  note: 'Dành cho chuyến đi nghỉ dưỡng biển.'
                },
                {
                  branchName: 'DU LỊCH KHÁM PHÁ MIỀN NÚI (MOUNTAIN TREKKING)',
                  content: 'We hiked along forest trails, climbed rocky peaks, and stayed in peaceful local homestays.',
                  note: 'Dành cho chuyến đi leo núi dã ngoại.'
                }
              ]
            },
            {
              step: 3,
              label: 'PHA 3: BÀI HỌC VĂN HÓA & TRẢI NGHIỆM (BROADENED HORIZONS)',
              cognitiveFunction: '3. Khẳng định du lịch giúp mở mang thế giới quan và gắn kết tình bạn',
              content: 'Overall, the journey not only helped us escape daily pressures but also significantly broadened our horizons.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Khép lại bằng cặp cấu trúc tương quan: "not only helped... but also broadened our horizons".',
              flipCard: {
                frontText: 'The trip was great and I learned new things. (Nói thô)',
                backText: 'The journey relieved our stress and broadened our cultural horizons. (Band 5.5 xuất sắc)',
                explanation: 'Dùng cụm "broaden our horizons" để tổng kết giá trị nhân văn của chuyến đi.'
              }
            }
          ],
          fullMosaicSummary: 'I chose this destination after hearing wonderful reviews by word of mouth. By booking our tickets in advance, we avoided wasting money down the drain and had a stress-free holiday. Overall, the journey refreshed our energy and greatly broadened our horizons.'
        }
      },
      {
        stageNumber: 3,
        stageType: 'progressive_reveal',
        title: 'Chặng 3: Lexical Flip Cards — Bộ Thẻ Lật Collocation & Thành Ngữ Du Lịch (Mục 2.1 & 2.2)',
        pedagogicalObjective: 'Nạp nhanh 3 cặp từ vựng & thành ngữ du lịch bản xứ: Word of mouth, Money down the drain và Breathtaking scenery.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click từng thẻ để biến cách nói sơ sài thành các cụm thành ngữ IELTS tự nhiên:',
          cards: [
            {
              step: 1,
              label: 'THẺ 1: TRUYỀN MIỆNG (BY WORD OF MOUTH)',
              cognitiveFunction: '1. Nói về cách biết đến một địa điểm qua lời giới thiệu của người quen',
              content: 'Most tourists find out about this hidden homestay purely by word of mouth.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Thành ngữ "by word of mouth" (/baɪ wɜːd əv maʊθ/) là cách nói tự nhiên khi thông tin được lan truyền trực tiếp giữa mọi người.',
              flipCard: {
                frontText: 'People tell each other about this place. (Band 4.0)',
                backText: 'This hidden tourist spot became famous purely by word of mouth. (Band 5.0+)',
                explanation: 'Thành ngữ xuất hiện ngay câu mở đầu đối thoại của Adam: "I heard by word of mouth that you\'re going on vacation".'
              }
            },
            {
              step: 2,
              label: 'THẺ 2: TIỀN ĐỔ SÔNG ĐỔ BIỂN (MONEY DOWN THE DRAIN)',
              cognitiveFunction: '2. Diễn đạt sự lãng phí tài chính khi gặp sự cố du lịch',
              content: 'If you buy a nonrefundable ticket and miss your flight, that is totally money down the drain.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Thành ngữ "money down the drain" (/ˈmʌn.i daʊn ðə dreɪn/) miêu tả việc lãng phí tiền của vào điều vô ích.',
              flipCard: {
                frontText: 'You will lose all your money for nothing. (Nói đơn giản)',
                backText: 'Booking a nonrefundable ticket in the storm season is just money down the drain. (Band 5.5)',
                explanation: 'Trích nguyên văn câu cảm thán của Eva: "That would have been money down the drain".'
              }
            },
            {
              step: 3,
              label: 'THẺ 3: PHONG CẢNH NGOẠN MỤC (BREATHTAKING SCENERY)',
              cognitiveFunction: '3. Miêu tả cảnh sắc thiên nhiên hùng vĩ, choáng ngợp',
              content: 'Standing on the mountain peak, we were completely stunned by the breathtaking scenery below.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Tính từ ghép "breathtaking" (/ˈbreθˌteɪ.kɪŋ/ - đẹp nghẹt thở/ngoạn mục) là collocation số một đi với "scenery" hoặc "views".',
              flipCard: {
                frontText: 'The mountain view is very very beautiful. (Band 4.0)',
                backText: 'The coastal mountains offer truly breathtaking natural scenery. (Band 5.5 học thuật)',
                explanation: 'Collocation số 1 trong danh mục từ vựng mục 2.2: "Tận hưởng phong cảnh tuyệt đẹp: enjoy breathtaking scenery".'
              }
            }
          ],
          fullMosaicSummary: 'A perfect holiday is when you discover a peaceful destination by word of mouth, avoid throwing money down the drain, and take in the breathtaking scenery with people you love.'
        }
      }
    ]
  },
  {
    id: 'builder_w7d1',
    courseId: 'builder',
    week: 7,
    day: 1,
    skill: 'writing',
    title: 'WRITING · BUỔI 1: KỸ THUẬT HEDGING & ĐỘNG TỪ TÌNH THÁI (WOULD VS COULD)',
    subtitle: 'Hedging Spectrum, Tránh Lỗi Tuyệt Đối Hóa (Over-generalization) & Sửa Lỗi Câu Điều Kiện',
    coreCompetency: 'Làm chủ kỹ thuật Hedging để lập luận học thuật khách quan, phân biệt chính xác cách dùng WOULD (giả định có căn cứ) vs COULD (khả năng tiềm tàng) và sửa lỗi dùng WILL trong mệnh đề IF.',
    bridgeToHomework: {
      promptText: 'Viết lại 5 câu với kỹ thuật Hedging và viết 1 đoạn văn chủ đề Bảo vệ động thực vật trong Writing Homework Tuần 7 Day 1.',
      targetExamId: 'exam_builder_w7d1'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'syntax_anatomy',
        title: 'Chặng 1: Sentence X-Ray — Thang Đo Sắc Thái Lập Luận Hedging (Will → Could)',
        pedagogicalObjective: 'Quan sát cách thay thế động từ mang tính khẳng định tuyệt đối "will lead to" bằng động từ tình thái thận trọng "could lead to" để câu văn đạt chuẩn học thuật khách quan.',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Bấm phân tích để quan sát cơ chế giảm độ tuyệt đối hóa trong lập luận khoa học:',
          mode: 'build',
          tokens: [
            { id: 't1', text: 'The increasing use of automation in manufacturing', role: 'subject', colorClass: 'green' },
            { id: 't2', text: 'could potentially lead to', role: 'fv_core', colorClass: 'orange' },
            { id: 't3', text: 'widespread unemployment', role: 'object', colorClass: 'blue' },
            { id: 't4', text: 'especially among low-skilled industrial workers.', role: 'modifier', colorClass: 'purple' }
          ],
          slots: [
            { slotId: 's1', acceptedRoles: ['subject'], label: 'XU HƯỚNG CÔNG NGHỆ (TECHNOLOGY TREND S)' },
            { slotId: 's2', acceptedRoles: ['fv_core'], label: 'ĐỘNG TỪ TÌNH THÁI HEDGING (COULD POTENTIALLY)' },
            { slotId: 's3', acceptedRoles: ['object'], label: 'TÁC ĐỘNG TIÊU CỰC DỰ ĐOÁN (PREDICTED IMPACT)' },
            { slotId: 's4', acceptedRoles: ['modifier'], label: 'NHÓM ĐỐI TƯỢNG BỊ ẢNH HƯỞNG (VULNERABLE GROUP)' }
          ]
        }
      },
      {
        stageNumber: 2,
        stageType: 'productive_failure',
        title: 'Chặng 2: Break & Repair 1 — Khắc Phục Lỗi Dùng "Would" Lơ Lửng Không Điều Kiện',
        pedagogicalObjective: 'Phát hiện lỗi dùng "would" khi câu không hề có mệnh đề giả định "if" và morph sang "could" để chỉ khả năng xảy ra.',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Click vào động từ tình thái đang dùng sai ngữ cảnh giả định trong câu bên dưới:',
          mode: 'break_and_repair',
          tokens: [
            { id: 't1', text: 'Excessive exposure to digital screens', role: 'subject', colorClass: 'green' },
            { id: 't2', text: 'would cause', role: 'fv_core', colorClass: 'red' },
            { id: 't3', text: 'several developmental problems', role: 'object', colorClass: 'blue' },
            { id: 't4', text: 'for young children.', role: 'modifier', colorClass: 'gray' }
          ],
          collisionTarget: {
            conflictingTokenIds: ['t1', 't2'],
            errorMessage: 'LỖI DÙNG "WOULD" THIẾU CĂN CỨ: "Would" chỉ dùng khi có điều kiện giả định rõ ràng (If... would). Khi chỉ nêu khả năng có thể xảy ra, bắt buộc dùng "could" hoặc "may"!',
            repairOptions: [
              {
                id: 'opt_could_cause',
                action: 'morph',
                targetTokenId: 't2',
                resultText: 'could cause',
                explanation: 'Sửa thành "could cause": Dùng "could" để diễn đạt khả năng tác động chưa chắc chắn 100% trong mọi trường hợp, bám sát quy tắc phân biệt mục 4 trong giáo trình.'
              }
            ]
          }
        }
      },
      {
        stageNumber: 3,
        stageType: 'productive_failure',
        title: 'Chặng 3: Break & Repair 2 — Triệt Tiêu Lỗi Dùng "Will" Trong Mệnh Đề "IF"',
        pedagogicalObjective: 'Sửa lỗi kinh điển dùng "will" trong mệnh đề phụ điều kiện IF của học viên người Việt.',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Click vào trợ động từ gây lỗi cú pháp trong mệnh đề điều kiện bên dưới:',
          mode: 'break_and_repair',
          tokens: [
            { id: 't1', text: 'Governments would reduce carbon emissions significantly', role: 'main_clause', colorClass: 'green' },
            { id: 't2', text: 'if they', role: 'connector', colorClass: 'purple' },
            { id: 't3', text: 'will introduce', role: 'fv_core', colorClass: 'red' },
            { id: 't4', text: 'stricter environmental regulations.', role: 'object', colorClass: 'blue' }
          ],
          collisionTarget: {
            conflictingTokenIds: ['t1', 't3'],
            errorMessage: 'LỖI CÚ PHÁP MỆNH ĐỀ IF: Mệnh đề chính dùng "would reduce" (Câu điều kiện loại 2), mệnh đề phụ "if" tuyệt đối KHÔNG được dùng "will" mà phải chia thì Quá khứ đơn!',
            repairOptions: [
              {
                id: 'opt_introduced',
                action: 'morph',
                targetTokenId: 't3',
                resultText: 'introduced',
                explanation: 'Sửa thành "introduced": Công thức chuẩn câu điều kiện loại 2 mục 1.3: "If + S + V2/ed, S + would + V-bare".'
              }
            ]
          }
        }
      }
    ]
  },
  {
    id: 'builder_w7d2',
    courseId: 'builder',
    week: 7,
    day: 2,
    skill: 'reading',
    title: 'READING · BUỔI 2: THE THYLACINE & NGUY CƠ TUYỆT CHỦNG',
    subtitle: 'Cambridge 15 Test 3: Logic Scale (Bẫy Số Lượng Tuyệt Đối) & Chuỗi Bằng Chứng Henry Moore',
    coreCompetency: 'Làm chủ dạng bài True / False / Not Given, nhận diện mâu thuẫn số lượng giữa "several" vs "only one" (FALSE), phát hiện bẫy ngoại lệ duy nhất (FALSE) và lần vết chuỗi bằng chứng Paraphrase chuẩn xác.',
    bridgeToHomework: {
      promptText: 'Hoàn thành câu hỏi 1-8 bài The Thylacine và 1-7 bài Henry Moore trong Reading Homework Tuần 7 Day 2.',
      targetExamId: 'exam_builder_w7d2'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'verification_scale',
        title: 'Chặng 1: Logic Verification Scale — Bàn Cân Phán Quyết Mâu Thuẫn Số Lượng (Question 2: FALSE)',
        pedagogicalObjective: 'Phát hiện sự mâu thuẫn trực tiếp giữa "several thylacines were born in zoos" trong câu hỏi và "only one successful attempt to breed" trong bài đọc để ra phán quyết FALSE.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'So khớp số lượng cá thể hổ Tasmania được sinh ra trong sở thú giữa câu hỏi và Đoạn 2:',
          passageContext: {
            title: 'Cambridge 15 Test 3 Passage 1: The thylacine',
            paragraphs: [
              {
                id: 'p2',
                label: 'Đoạn 2 (Dòng 1-3)',
                text: 'There was only one successful attempt to breed a thylacine in captivity, at Melbourne Zoo in 1899. This was despite the large numbers that went through some zoos, particularly London Zoo and Tasmania’s Hobart Zoo.'
              }
            ],
            targetParagraphId: 'p2',
            targetSnippet: 'There was only one successful attempt to breed a thylacine in captivity, at Melbourne Zoo in 1899.'
          },
          statement: {
            rawText: 'Question 2: Several thylacines were born in zoos during the late 1800s.',
            deconstructedVariables: [
              { name: 'X_quantity_trap', text: 'SEVERAL THYLACINES (nhiều/vài cá thể)', isTrapWord: true },
              { name: 'Y_action', text: 'were born in zoos' },
              { name: 'Z_timeline', text: 'during the late 1800s (1899)' }
            ]
          },
          passageEvidence: {
            rawText: 'There was only one successful attempt to breed a thylacine in captivity, at Melbourne Zoo in 1899.',
            targetVariables: [
              { matchingName: 'X_quantity_trap', text: 'ONLY ONE successful attempt to breed (DUY NHẤT 1 lần nhân giống thành công)' },
              { matchingName: 'Y_action', text: 'in captivity, at Melbourne Zoo' },
              { matchingName: 'Z_timeline', text: 'in 1899' }
            ]
          },
          expectedRelation: 'contradiction',
          verdict: 'FALSE',
          pedagogicalInsight: 'Mâu thuẫn số lượng trực diện: Câu hỏi tuyên bố "vài/nhiều con hổ Tasmania được sinh ra trong sở thú" (several were born), trong khi bài khẳng định "chỉ có duy nhất 1 lần sinh sản thành công" (only one successful attempt in 1899). Hai bên mâu thuẫn -> Phán quyết: FALSE.'
        }
      },
      {
        stageNumber: 2,
        stageType: 'verification_scale',
        title: 'Chặng 2: Logic Verification Scale — Bàn Cân Phán Quyết Bẫy "Ngoại Lệ Duy Nhất" (Question 4: FALSE)',
        pedagogicalObjective: 'Phát hiện sự trái ngược giữa phát biểu "nhiều nhà khoa học lo lắng" và dữ liệu bài đọc "hầu như không có ai bày tỏ quan tâm, ngoại trừ 1 giáo sư duy nhất".',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Kiểm tra mức độ quan tâm của giới khoa học đối với sự suy giảm số lượng loài thylacine ở Đoạn 3:',
          passageContext: {
            title: 'Cambridge 15 Test 3 Passage 1: The thylacine',
            paragraphs: [
              {
                id: 'p3',
                label: 'Đoạn 3 (Dòng 1-5)',
                text: 'However, there seems to have been little public pressure to preserve the thylacine, nor was much concern expressed by scientists at the decline of this species in the decades that followed. A notable exception was T.T. Flynn, Professor of Biology at the University of Tasmania.'
              }
            ],
            targetParagraphId: 'p3',
            targetSnippet: '...nor was much concern expressed by scientists at the decline of this species... A notable exception was T.T. Flynn...'
          },
          statement: {
            rawText: 'Question 4: In the early 1900s, many scientists became worried about the possible extinction of the thylacine.',
            deconstructedVariables: [
              { name: 'A_subject_trap', text: 'MANY SCIENTISTS (nhiều nhà khoa học)', isTrapWord: true },
              { name: 'B_attitude', text: 'became worried about the possible extinction' },
              { name: 'C_timeline', text: 'in the early 1900s' }
            ]
          },
          passageEvidence: {
            rawText: '...nor was much concern expressed by scientists at the decline of this species... A notable exception was T.T. Flynn...',
            targetVariables: [
              { matchingName: 'A_subject_trap', text: 'NOR WAS MUCH CONCERN EXPRESSED (hầu như không ai bày tỏ quan tâm) / A notable exception was T.T. Flynn (chỉ có duy nhất 1 ngoại lệ)' },
              { matchingName: 'B_attitude', text: 'concern at the decline' },
              { matchingName: 'C_timeline', text: 'in the decades that followed (1914)' }
            ]
          },
          expectedRelation: 'contradiction',
          verdict: 'FALSE',
          pedagogicalInsight: 'Bẫy số lượng chủ thể (False Generalization Trap): Câu hỏi khẳng định "nhiều nhà khoa học lo lắng" (many scientists), bài đọc khẳng định "hầu như không có ai quan tâm, chỉ có một ngoại lệ duy nhất là giáo sư Flynn" (notable exception). Hai bên mâu thuẫn -> Phán quyết: FALSE.'
        }
      },
      {
        stageNumber: 3,
        stageType: 'verification_scale',
        title: 'Chặng 3: Evidence Chain — Chuỗi Lần Vết Paraphrase Khớp 100% Ý Nghĩa (Henry Moore - Question 1: TRUE)',
        pedagogicalObjective: 'Lần vết cầu nối Paraphrase giữa cụm từ "complied with his father\'s wish" trong bài đọc và "did what his father wanted him to do" trong câu hỏi để chọn TRUE.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Thiết lập chuỗi bằng chứng xác nhận quyết định nghề nghiệp của Henry Moore sau khi rời trường học:',
          passageContext: {
            title: 'Cambridge 15 Test 3 Passage 1: Henry Moore (1898-1986)',
            paragraphs: [
              {
                id: 'p1',
                label: 'Đoạn 1 (Dòng 4-7)',
                text: 'After leaving school, Moore hoped to become a sculptor, but instead he complied with his father’s wish that he train as a schoolteacher. He had to abandon his training in 1917 when he was sent to France to fight in the First World War.'
              }
            ],
            targetParagraphId: 'p1',
            targetSnippet: '...but instead he complied with his father’s wish that he train as a schoolteacher.'
          },
          statement: {
            rawText: 'Question 1: On leaving school, Moore did what his father wanted him to do.',
            deconstructedVariables: [
              { name: 'M_timeline', text: 'On leaving school' },
              { name: 'N_action', text: 'DID WHAT HIS FATHER WANTED HIM TO DO', isTrapWord: false },
              { name: 'P_actor', text: 'Henry Moore' }
            ]
          },
          passageEvidence: {
            rawText: 'After leaving school, Moore hoped to become a sculptor, but instead he complied with his father’s wish that he train as a schoolteacher.',
            targetVariables: [
              { matchingName: 'M_timeline', text: 'After leaving school' },
              { matchingName: 'N_action', text: 'complied with his father’s wish that he train as a schoolteacher (tuân theo nguyện vọng của người cha)' },
              { matchingName: 'P_actor', text: 'Moore' }
            ]
          },
          expectedRelation: 'match',
          verdict: 'TRUE',
          pedagogicalInsight: 'Cầu nối Paraphrase tuyệt đối: "complied with his father’s wish" = "did what his father wanted him to do" (làm theo đúng ý cha là đi học nghề giáo viên). Đĩa cân thăng bằng hoàn hảo -> Phán quyết: TRUE.'
        }
      }
    ]
  },
  {
    id: 'builder_w7d3',
    courseId: 'builder',
    week: 7,
    day: 3,
    skill: 'speaking',
    title: 'SPEAKING · BUỔI 3: CELEBRATIONS AND FESTIVALS & TRỌNG ÂM CÂU',
    subtitle: 'Transformation Ladder (Lễ Hội Truyền Thống), Speaking Flow Map & Trọng Âm Câu (Sentence Stress)',
    coreCompetency: 'Làm chủ kỹ thuật nhấn trọng âm câu (Sentence Stress) theo ý đồ nhấn mạnh, sử dụng đúng giới từ thời gian lễ hội (at Christmas, on New Year\'s Eve) và vận dụng Speaking Flow Map để chia sẻ về phong tục ngày Tết / Giáng Sinh.',
    bridgeToHomework: {
      promptText: 'Ghi âm bài nói mô tả lễ hội yêu thích nhất và đọc chuẩn 3 câu nhấn trọng âm khác nhau trong Speaking Homework Tuần 7 Day 3.',
      targetExamId: 'exam_builder_w7d3'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'progressive_reveal',
        title: 'Chặng 1: Transformation Ladder — Thang Nâng Cấp Kể Về Lễ Hội Yêu Thích (Christmas / Tet)',
        pedagogicalObjective: 'Quan sát sự tiến hóa từ câu nói đơn giản Band 4.0 lên câu ghép có mệnh đề quan hệ và từ vựng phong tục ngày lễ Band 5.0 - 5.5.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click từng nấc thang để xem cách mở rộng câu nói về lễ hội yêu thích:',
          cards: [
            {
              step: 1,
              label: 'NẤC 1: NÊU TÊN LỄ HỘI & THỜI ĐIỂM (ANNUAL OCCASION)',
              cognitiveFunction: '1. Khởi đầu với tên ngày lễ, thời gian diễn ra và bản chất sự kiện',
              content: 'My favorite celebration is Christmas, which takes place annually on December 25th.',
              bandLevel: 'Band 4.0 → 4.5',
              pedagogyNote: 'Dùng trạng từ "annually" (hàng năm) và mệnh đề quan hệ "which takes place on...".',
              flipCard: {
                frontText: 'I like Christmas. It is on December 25. (Band 4.0 nói cộc)',
                backText: 'My favorite celebration is Christmas, which takes place annually on December 25th. (Band 4.5)',
                explanation: 'Nối câu mượt mà bằng đại từ quan hệ "which" và dùng trạng từ học thuật "annually" từ câu mẫu mục 2.1.'
              },
              vowelHighlight: [
                { word: 'creative', phonetic: '/kriˈeɪ.tɪv/', vowelSound: 'Trọng âm rơi vào nguyên âm đôi /eɪ/' },
                { word: 'agreement', phonetic: '/əˈɡriː.mənt/', vowelSound: 'Trọng âm rơi vào nguyên âm dài /iː/' },
                { word: 'comprehend', phonetic: '/ˌkɒm.prɪˈhend/', vowelSound: 'Trọng âm rơi vào âm tiết cuối kết thúc bằng cụm phụ âm /nd/' }
              ]
            },
            {
              step: 2,
              label: 'NẤC 2: PHONG TỤC ĐẶC TRƯNG & SUM HỌP (EXCHANGING GIFTS)',
              cognitiveFunction: '2. Nêu các hoạt động truyền thống: tụ họp gia đình và trao quà chúc mừng',
              content: 'It is a special time for family members to gather together, enjoy festive feasts, and exchange meaningful gifts.',
              bandLevel: 'Band 4.5 → 5.0',
              pedagogyNote: 'Làm chủ cụm collocation đắt giá: "gather together", "festive feasts" và "exchange gifts".',
              flipCard: {
                frontText: 'People eat food and give presents. (Từ vựng cơ bản)',
                backText: 'It is a special time for families to gather and exchange meaningful gifts. (Chuẩn Band 5.0)',
                explanation: 'Dùng cụm "gather together" và "exchange gifts" bám sát đoạn trích mẫu trong sách.'
              }
            },
            {
              step: 3,
              label: 'NẤC 3: KHÔNG KHÍ ĐƯỜNG PHỐ & CẢM XÚC ẤM ÁP (FESTIVE ATMOSPHERE)',
              cognitiveFunction: '3. Khép lại bằng trải nghiệm ngắm phố phường trang hoàng lộng lẫy và cảm xúc hân hoan',
              content: 'I find this holiday truly enchanting because streets are beautifully decorated and seeing people dressed up as Santa Claus brings immense joy.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Vận dụng tính từ mô tả không khí "enchanting" và cụm "brings immense joy" bám sát câu văn mẫu 2.1.',
              flipCard: {
                frontText: 'It is fun to see Santa Claus in the city. (Band 4.0)',
                backText: 'The holiday is special because streets are decorated and people dressed as Santa Claus bring joy. (Band 5.5)',
                explanation: 'Kết bài bằng câu phức có lý do cảm xúc sâu sắc trích nguyên bản từ bài mẫu 2.1.'
              }
            }
          ],
          fullMosaicSummary: 'My favorite celebration is Christmas, which takes place annually on December 25th. It is a wonderful occasion for family members to gather together, enjoy festive meals, and exchange gifts. What makes this holiday truly special is the enchanting festive atmosphere across the city.'
        }
      },
      {
        stageNumber: 2,
        stageType: 'progressive_reveal',
        title: 'Chặng 2: Speaking Flow Map — Bản Đồ Dòng Chảy Về Phong Tục Ngày Tết (Lunar New Year Flow)',
        pedagogicalObjective: 'Kích hoạt phản xạ 3 pha khi nói về phong tục ngày Tết truyền thống Việt Nam: Chuẩn bị dọn nhà → Bữa cơm sum họp → Chúc Tết & Lì xì.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click từng pha để theo dõi dòng chảy tự nhiên khi nói về Tết cổ truyền:',
          cards: [
            {
              step: 1,
              label: 'PHA 1: KHÔNG KHÍ CHUẨN BỊ (CLEANING & DECORATING)',
              cognitiveFunction: '1. Nêu truyền thống dọn dẹp và trang hoàng nhà cửa trước thềm năm mới',
              content: 'In the days leading up to Tet, my family spends quality time cleaning and decorating our home with peach blossoms.',
              bandLevel: 'Band 4.5 → 5.0',
              pedagogyNote: 'Dùng cụm thời gian "In the days leading up to Tet" và "decorating our home with peach blossoms".',
              flipCard: {
                frontText: 'We clean house before Tet. (Tiếng Anh giao tiếp ngắn)',
                backText: 'Before Tet, my family spends days cleaning and decorating the house to welcome good fortune. (Band 5.0)',
                explanation: 'Nâng cấp từ "clean house" lên "cleaning and decorating our home to welcome good fortune" theo bài tập 2.1.'
              }
            },
            {
              step: 2,
              label: 'PHA 2: MÂM CƠM TẤT NIÊN (A JOYFUL FAMILY REUNION)',
              cognitiveFunction: '2. Tả bữa cơm sum vầy đêm giao thừa và thưởng thức bánh chưng truyền thống',
              content: 'At New Year\'s Eve, all generations gather around a big feast to enjoy traditional dishes like Bánh Chưng.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Sử dụng đúng giới từ: "at New Year\'s Eve" hoặc "at midnight", kết hợp cụm "all generations gather around a big feast".',
              flipCard: {
                frontText: 'We eat Bánh Chưng at midnight. (Nói cộc)',
                backText: 'At midnight, all family members gather for a warm feast and enjoy traditional Bánh Chưng. (Band 5.5)',
                explanation: 'Dùng cấu trúc "gather for a warm feast" bám sát câu hỏi điền giới từ 1 & 2 mục 2.1.'
              },
              branchOptions: [
                {
                  branchName: 'TẾT TRUYỀN THỐNG MIỀN BẮC (PEACH BLOSSOMS)',
                  content: 'We display vibrant peach blossoms and kumquat trees to bring prosperity into our house.',
                  note: 'Dành cho không khí Tết miền Bắc.'
                },
                {
                  branchName: 'TẾT TRUYỀN THỐNG MIỀN NAM (YELLOW APRICOT BLOSSOMS)',
                  content: 'Our home is filled with brilliant yellow apricot blossoms symbolizing wealth and luck.',
                  note: 'Dành cho không khí Tết miền Nam.'
                }
              ]
            },
            {
              step: 3,
              label: 'PHA 3: CHÚC TẾT & LÌ XÌ (EXCHANGING WISHES & LUCKY MONEY)',
              cognitiveFunction: '3. Khép lại bằng ý nghĩa văn hóa: gửi lời chúc thọ ông bà và phát lì xì may mắn',
              content: 'On the first day of the new year, we visit our grandparents to express our gratitude and exchange red envelopes containing lucky money.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Dùng giới từ "On the first day..." và cụm "exchange red envelopes containing lucky money".',
              flipCard: {
                frontText: 'We visit grandparents and get lucky money. (Band 4.0)',
                backText: 'We visit our elders to express gratitude and exchange red envelopes for good luck. (Band 5.5 xuất sắc)',
                explanation: 'Nâng cấp từ "get lucky money" thành "exchange red envelopes containing lucky money" đậm nét văn hóa.'
              }
            }
          ],
          fullMosaicSummary: 'In the days leading up to Tet, we clean and decorate our house with vibrant blossoms. On New Year\'s Eve, all family members gather around a lavish feast to celebrate midnight. Finally, we visit our elders to express our gratitude and exchange red envelopes filled with best wishes.'
        }
      },
      {
        stageNumber: 3,
        stageType: 'progressive_reveal',
        title: 'Chặng 3: Lexical Flip Cards — Bộ Thẻ Lật Giới Từ & Collocation Lễ Hội (Mục 1.2 & 2.1)',
        pedagogicalObjective: 'Làm chủ 3 cặp giới từ và cụm từ vựng chuẩn mực về lễ hội: At Christmas, Exchange gifts và Family reunion.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click từng thẻ để làm chủ giới từ thời gian và từ vựng ngày lễ:',
          cards: [
            {
              step: 1,
              label: 'THẺ 1: ĐÚNG GIỚI TỪ LỄ HỘI (AT CHRISTMAS / AT MIDNIGHT)',
              cognitiveFunction: '1. Phân biệt giới từ "at" cho kỳ nghỉ/thời khắc và "on" cho ngày cụ thể',
              content: 'We always enjoy a festive feast at Christmas, and wait for fireworks at midnight.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Dùng "at Christmas / at Tet" cho cả kỳ nghỉ, "on December 25th / on Valentine\'s Day" cho ngày cụ thể.',
              flipCard: {
                frontText: 'in Christmas / in midnight (Lỗi dùng sai giới từ)',
                backText: 'at Christmas / at midnight / on Valentine\'s Day (Chuẩn 100% ngữ pháp)',
                explanation: 'Quy tắc giới từ trích từ 5 câu bài tập điền từ mục 2.1 của sách.'
              }
            },
            {
              step: 2,
              label: 'THẺ 2: TRAO NHAU QUÀ TẶNG & LỜI CHÚC (EXCHANGE GIFTS AND WISHES)',
              cognitiveFunction: '2. Diễn đạt hành động tặng quà qua lại giữa bạn bè người thân',
              content: 'Exchanging heartfelt gifts and best wishes is a timeless tradition during the festive season.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Dùng động từ "exchange" thay vì chỉ nói "give presents".',
              flipCard: {
                frontText: 'People give and take gifts. (Nói vụng)',
                backText: 'It is a wonderful custom to exchange meaningful gifts with loved ones. (Band 5.5)',
                explanation: 'Cụm từ "exchange gifts" trích xuất trực tiếp từ bài mẫu mục 2.1.'
              }
            },
            {
              step: 3,
              label: 'THẺ 3: SUM HỌP GIA ĐÌNH ẤM CÚNG (AN INTIMATE FAMILY REUNION)',
              cognitiveFunction: '3. Nêu bật giá trị đoàn tụ thiêng liêng của ngày lễ truyền thống',
              content: 'Above all, the festival is cherished because it serves as an intimate family reunion after a busy year.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Cụm danh từ "an intimate family reunion" (/ˈɪn.tɪ.mət ˈfæm.əl.i riːˈjuː.njən/) là collocation điểm 10 trong Speaking.',
              flipCard: {
                frontText: 'It is good because family meets. (Band 4.0)',
                backText: 'The festival serves as a warm family reunion where everyone reconnects. (Band 5.5)',
                explanation: 'Kết hợp "family reunion" và mệnh đề "where everyone reconnects" để tạo ấn tượng sâu sắc.'
              }
            }
          ],
          fullMosaicSummary: 'A meaningful celebration is when families gather at Christmas or Tet to enjoy an intimate reunion, where members exchange heartfelt gifts and create lasting memories together.'
        }
      }
    ]
  },
  {
    id: 'builder_w8d1',
    courseId: 'builder',
    week: 8,
    day: 1,
    skill: 'writing',
    title: 'WRITING · BUỔI 1: TỔNG QUAN TASK 1 & TRÍCH XUẤT KEY FEATURES',
    subtitle: 'Phân Biệt Mechanical Reporting (Band 5.0) vs Key Feature Synthesis (Band 6.0+) & 6 Quy Luật Pattern Recognition',
    coreCompetency: 'Nắm vững bản chất Writing Task 1, phân biệt cách viết liệt kê số liệu máy móc Band 5.0 với cách gom nhóm tổng hợp điểm nổi bật Band 6.0+, và rèn luyện kỹ năng trích xuất 6 quy luật Key Features cho đoạn Overview hoàn chỉnh.',
    bridgeToHomework: {
      promptText: 'Viết đoạn Overview và xác định 3 Key Features chính cho đề bài Fast Food Consumption và Scottish Attractions trong Writing Homework Tuần 8 Day 1.',
      targetExamId: 'exam_builder_w8d1'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'syntax_anatomy',
        title: 'Chặng 1: Sentence X-Ray — Bóc Tách Cấu Trúc Câu Overview Band 6.0+ (Australian Fast Food)',
        pedagogicalObjective: 'Quan sát cách ghép 3 Key Features cốt lõi (Khởi đầu cao nhất + Tăng trưởng vượt bậc + Soán ngôi thứ hạng) vào một câu phức hoàn chỉnh không chứa số liệu thô.',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Bấm phân tích để quan sát cấu trúc tích hợp 3 Key Features trong một câu tổng quan chuẩn mực:',
          mode: 'build',
          tokens: [
            { id: 't1', text: 'While fish and chips was initially the most popular fast food', role: 'subordinating_clause', colorClass: 'orange' },
            { id: 't2', text: ', consumption of hamburgers and pizza experienced dramatic growth', role: 'fv_core', colorClass: 'green' },
            { id: 't3', text: ', with hamburgers overtaking fish and chips', role: 'modifier', colorClass: 'blue' },
            { id: 't4', text: 'to take the lead by 2000.', role: 'modifier', colorClass: 'purple' }
          ],
          slots: [
            { slotId: 's1', acceptedRoles: ['subordinating_clause'], label: 'ĐIỂM XUẤT PHÁT CAO NHẤT (INITIAL APEX)' },
            { slotId: 's2', acceptedRoles: ['fv_core'], label: 'XU HƯỚNG TĂNG TRƯỞNG MẠNH MẼ (DRAMATIC GROWTH)' },
            { slotId: 's3', acceptedRoles: ['modifier'], label: 'GIAO CẮT VƯỢT THỨ HẠNG (OVERTAKING CLAUSE)' },
            { slotId: 's4', acceptedRoles: ['modifier'], label: 'VỊ TRÍ DẪN ĐẦU KẾT THÚC (FINAL LEADER)' }
          ]
        }
      },
      {
        stageNumber: 2,
        stageType: 'productive_failure',
        title: 'Chặng 2: Break & Repair — Thoát Khỏi Bẫy Liệt Kê Số Liệu Máy Móc (Mechanical Listing)',
        pedagogicalObjective: 'Nhận diện lỗi liệt kê con số thô theo từng mốc năm (bẫy Band 5.0 TA) và nâng cấp thành tư duy tổng hợp xu hướng và điểm cực trị (Band 6.0+).',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Click vào cụm liệt kê số liệu máy móc để bẻ gãy lối hành văn Band 5.0:',
          mode: 'break_and_repair',
          tokens: [
            { id: 't1', text: 'Castles attracted around 23% in 1980,', role: 'subject', colorClass: 'gray' },
            { id: 't2', text: 'after which it rose to 45% in 1995, followed by a decline to 35% in 2000 and 30% in 2010.', role: 'fv_core', colorClass: 'red' }
          ],
          collisionTarget: {
            conflictingTokenIds: ['t1', 't2'],
            errorMessage: 'BẪY BAND 5.0 TASK ACHIEVEMENT (BÁO CÁO MÁY MÓC): Liệt kê từng năm từng con số rời rạc mà không chỉ ra được thứ hạng tổng thể hoặc xu hướng nổi bật của dữ liệu!',
            repairOptions: [
              {
                id: 'opt_band6_upgrade',
                action: 'morph',
                targetTokenId: 't2',
                resultText: 'doubling to hit a high of 45% in 1995 to become the most popular destination, despite a sharp decline to 30% by the final year.',
                explanation: 'Nâng cấp tư duy: Nhấn mạnh "doubling to hit a high" (tăng gấp đôi lập đỉnh) và "become the most popular destination" (thứ hạng dẫn đầu) thay vì chỉ đọc số như một cái máy.'
              }
            ]
          }
        }
      },
      {
        stageNumber: 3,
        stageType: 'progressive_reveal',
        title: 'Chặng 3: Transformation Ladder — 3 Nấc Lắp Ghép Đoạn Overview Chuẩn Band 5.5 - 6.0',
        pedagogicalObjective: 'Thực hành nâng cấp từ câu đơn vụn vặt sang đoạn Overview 2 câu chuẩn mực, tổng hợp cả xu hướng đối lập và trật tự thứ hạng.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click từng nấc thang để xem cách xây dựng một đoạn Overview sắc nét không lỗi số liệu:',
          cards: [
            {
              step: 1,
              label: 'NẤC 1: XÁC ĐỊNH XU HƯỚNG TĂNG GIẢM CHUNG (GENERAL TREND)',
              cognitiveFunction: '1. Gom nhóm đối tượng cùng tăng đối lập với đối tượng duy nhất sụt giảm',
              content: 'Overall, both hamburgers and pizza saw significant increases in consumption, whereas fish and chips was the only fast food to decline.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Dùng liên từ "whereas" để tương phản hai nhóm xu hướng một cách nhịp nhàng.',
              flipCard: {
                frontText: 'Hamburgers went up, pizza went up, fish and chips went down. (Band 4.0 rời rạc)',
                backText: 'Both hamburgers and pizza saw upward trends, whereas fish and chips was the only item to decline. (Band 5.5)',
                explanation: 'Gom hai đường tăng vào "both X and Y" và định vị đối tượng giảm bằng "the only item to decline".'
              }
            },
            {
              step: 2,
              label: 'NẤC 2: XÁC ĐỊNH SỰ THAY ĐỔI THỨ HẠNG VÀ VỊ TRÍ DẪN ĐẦU (RANKING & LEADER)',
              cognitiveFunction: '2. Nêu bật sự chuyển dịch ngôi đầu bảng giữa năm bắt đầu và năm kết thúc',
              content: 'In addition, hamburgers became the most widely consumed item by 2000, surpassing fish and chips during the period.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Dùng mệnh đề phân từ "surpassing..." để làm rõ sự đổi ngôi dẫn đầu.',
              flipCard: {
                frontText: 'In 2000 hamburgers was top and fish and chips was lower. (Band 4.0)',
                backText: 'Hamburgers became the most widely consumed item, overtaking fish and chips over the 25-year period. (Band 5.5)',
                explanation: 'Sử dụng phân từ hiện tại "overtaking..." tạo tính liên kết học thuật chặt chẽ.'
              }
            },
            {
              step: 3,
              label: 'NẤC 3: GHÉP THÀNH ĐOẠN OVERVIEW HOÀN CHỈNH (COMPLETE OVERVIEW)',
              cognitiveFunction: '3. Hòa trộn 2 câu thành đoạn tổng quan sắc sảo hoàn hảo cho Task 1',
              content: 'Overall, both hamburgers and pizza saw significant increases in consumption, whereas fish and chips was the only item to decline. In addition, hamburgers overtook fish and chips to become the leading fast food by the end of the period.',
              bandLevel: 'Band 5.5 → 6.0',
              pedagogyNote: 'Đây là đoạn Overview đạt chuẩn điểm tuyệt đối của tiêu chí Task Achievement cho mức Band 6.0+.',
              flipCard: {
                frontText: 'Liệt kê từng đường theo từng mốc số liệu (bẫy liệt kê)',
                backText: 'Đoạn tổng quan 2 câu gồm 1 câu xu hướng tương phản + 1 câu trật tự thứ hạng.',
                explanation: 'Không chứa số liệu cụ thể nhưng tóm trọn bức tranh tổng quát của biểu đồ qua 25 năm.'
              }
            }
          ],
          fullMosaicSummary: 'A band 6.0+ Overview must capture the overall direction of trends (both hamburgers and pizza grew while fish and chips dropped) and major ranking shifts (hamburgers overtook fish and chips) without listing raw figures.'
        }
      },
      {
        stageNumber: 4,
        stageType: 'progressive_reveal',
        title: 'Chặng 4: Lexical Flip Cards — Bộ Lọc Key Features Trong 3 Đề Thi Thực Tế (Giáo Trình Mục 2.2)',
        pedagogicalObjective: 'Kích hoạt tư duy trích xuất Key Features tức thì trên 3 đề thi trích từ giáo trình: Giá chuối (Banana Prices), Điểm du lịch Scotland (Scottish Attractions) và Khảo sát nghỉ việc (Absenteeism Surveys).',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click từng thẻ để xem điểm nổi bật (Key Feature) thay vì đọc số liệu rời rạc:',
          cards: [
            {
              step: 1,
              label: 'ĐỀ 1: GIÁ CHUỐI TẠI 4 QUỐC GIA (BANANA PRICES 1994 - 2004)',
              cognitiveFunction: '1. Nhận diện quốc gia có giá cao nhất bền vững vs quốc gia thấp nhất và ổn định nhất',
              content: 'Japan consistently recorded the highest banana prices throughout the decade, while prices in the USA remained the lowest and most stable.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Key Features: Đối tượng giữ vị trí cao nhất toàn kỳ (Japan) và đối tượng thấp nhất + ổn định nhất (USA).',
              flipCard: {
                frontText: 'Japan price was 2.5 and USA price was 1 dollar. (Liệt kê số liệu thô)',
                backText: 'Japan consistently maintained the highest prices, whereas the USA had the lowest and most stable figures. (Band 5.5)',
                explanation: 'Sử dụng các trạng từ nhận xét bao quát: "consistently", "stable" thay vì chỉ báo cáo con số.'
              }
            },
            {
              step: 2,
              label: 'ĐỀ 2: ĐIỂM DU LỊCH TẠI SCOTLAND (SCOTTISH ATTRACTIONS 1980 - 2010)',
              cognitiveFunction: '2. Nhận diện sự bứt phá lập đỉnh của Lâu đài (Castles) vs sụt giảm đều của Lễ hội (Festivals)',
              content: 'While castles experienced the most dramatic growth to reach an apex in 1995, festivals saw a steady downward trend over the 30-year period.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Key Features: Đối tượng có biến động mạnh nhất (castles) và đối tượng suy giảm đều đặn nhất (festivals).',
              flipCard: {
                frontText: 'Castles was 23% in 1980 and 45% in 1995 and festivals went down. (Band 4.0)',
                backText: 'Castles experienced the most dramatic fluctuation, peaking in 1995, while festivals witnessed a consistent decline. (Band 5.5)',
                explanation: 'Thay thế việc kể từng năm bằng cụm "experienced the most dramatic fluctuation, peaking in 1995".'
              }
            },
            {
              step: 3,
              label: 'ĐỀ 3: KHẢO SÁT NGHỈ VIỆC KHÔNG PHÉP (ABSENTEEISM SURVEYS 2000, 2005, 2010)',
              cognitiveFunction: '3. Phân biệt nguyên nhân ốm đau (sức khỏe) áp đảo so với các nguyên nhân cá nhân',
              content: 'Illness remained the primary reason for workplace absenteeism in all three surveyed years, while personal reasons consistently accounted for the lowest proportion.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Key Features dạng biểu đồ so sánh: Nguyên nhân áp đảo tuyệt đối (illness) vs nguyên nhân có tỷ trọng nhỏ nhất (personal reasons).',
              flipCard: {
                frontText: 'Illness was big in 2000, 2005, 2010 and personal reasons was small. (Band 4.0)',
                backText: 'Illness remained the predominant cause of absenteeism, whereas personal matters represented the smallest share. (Band 5.5)',
                explanation: 'Dùng collocations học thuật: "remained the predominant cause" và "represented the smallest share".'
              }
            }
          ],
          fullMosaicSummary: 'Identifying Key Features is pattern recognition: isolate highest and lowest figures, detect rapid changes, and spotlight ranking swaps rather than listing every number.'
        }
      }
    ]
  },
  {
    id: 'builder_w8d2',
    courseId: 'builder',
    week: 8,
    day: 2,
    skill: 'reading',
    title: 'READING · BUỔI 2: PHÂN BIỆT THÔNG TIN CHÍNH - PHỤ & LOGIC TRUE / FALSE / NOT GIVEN',
    subtitle: 'Cambridge 10 Test 2: Tea and the Industrial Revolution — Chuỗi Mắt Xích Nhân Quả & Bẫy Mâu Thuẫn Luận Điểm',
    coreCompetency: 'Nắm vững kỹ năng bóc tách thông tin trọng tâm (Major vs Minor Details) để xử lý Matching Headings và rèn luyện tư duy phân định 3 trạng thái Logic Scale (TRUE / FALSE / NOT GIVEN) qua văn bản nghiên cứu lịch sử trà và cuộc cách mạng công nghiệp.',
    bridgeToHomework: {
      promptText: 'Hoàn thành bài đọc Cambridge 10 Test 2 Passage 1 (Tea and the Industrial Revolution) và phân tích các câu hỏi True / False / Not Given còn lại trong Reading Homework Tuần 8 Day 2.',
      targetExamId: 'exam_builder_w8d2'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'verification_scale',
        title: 'Chặng 1: Verification Scale — Nhận Diện Khoảng Trống Dữ Liệu NOT GIVEN (Question 8: China Transport)',
        pedagogicalObjective: 'Phát hiện sự vắng mặt của thông tin cụ thể (hệ thống giao thông của Trung Quốc thế kỷ 18) trong văn bản để tránh suy đoán chủ quan và chốt vững chắc NOT GIVEN.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Kéo thả các biến số từ câu hỏi và bài đọc lên bàn cân để kiểm chứng tính xác thực:',
          passageContext: {
            title: 'Cambridge 10 Test 2 Passage 1: Tea and the Industrial Revolution (Paragraph B)',
            paragraphs: [
              {
                id: 'pB',
                label: 'Đoạn B (Dòng 8-12)',
                text: 'All these factors must have been necessary. But not sufficient to cause the revolution, says Macfarlane. ‘After all, Holland had everything except coal while China also had many of these factors. Most historians are convinced there are one or two missing factors that you need to open the lock.’'
              }
            ],
            targetParagraphId: 'pB',
            targetSnippet: '...while China also had many of these factors. Most historians are convinced there are one or two missing factors...'
          },
          statement: {
            rawText: 'Question 8: China’s transport system was not suitable for industry in the 18th century.',
            deconstructedVariables: [
              { name: 'A_subject', text: 'China’s transport system' },
              { name: 'B_evaluation', text: 'WAS NOT SUITABLE FOR INDUSTRY', isTrapWord: true },
              { name: 'C_timeline', text: 'in the 18th century' }
            ]
          },
          passageEvidence: {
            rawText: 'Holland had everything except coal while China also had many of these factors.',
            targetVariables: [
              { matchingName: 'A_subject', text: 'China also had many of these factors (Trung Quốc có nhiều yếu tố)' },
              { matchingName: 'B_evaluation', text: 'KHÔNG HỀ ĐỀ CẬP HỆ THỐNG GIAO THÔNG CỦA TRUNG QUỐC CÓ PHÙ HỢP HAY KHÔNG (NO TRANSPORT EVALUATION)' },
              { matchingName: 'C_timeline', text: '18th century context' }
            ]
          },
          expectedRelation: 'no_evidence',
          verdict: 'NOT GIVEN',
          pedagogicalInsight: 'Bẫy suy diễn kiến thức ngoài (Out-of-Text Speculation): Bài đọc chỉ nói chung chung là "China also had many of these factors", hoàn toàn KHÔNG hề nói hệ thống giao thông (transport system) của Trung Quốc có phù hợp cho công nghiệp hay không. Thiếu hẳn bằng chứng đối chiếu -> Phán quyết: NOT GIVEN.'
        }
      },
      {
        stageNumber: 2,
        stageType: 'verification_scale',
        title: 'Chặng 2: Logic Scale — Bóc Trần Bẫy Mâu Thuẫn Thái Độ Đồng Thuận vs Bác Bỏ (Question 10: FALSE)',
        pedagogicalObjective: 'Phát hiện sự đối lập trực diện giữa câu hỏi "Roy Porter disagrees" và dẫn chứng văn bản "Roy Porter recently wrote a favourable appraisal" để chốt FALSE.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'So sánh mức độ tương thích giữa nhận định trong câu hỏi và thái độ của Roy Porter trong bài đọc:',
          passageContext: {
            title: 'Cambridge 10 Test 2 Passage 1: Tea and the Industrial Revolution (Paragraph C)',
            paragraphs: [
              {
                id: 'pC',
                label: 'Đoạn C (Dòng 7-9)',
                text: 'Macfarlane’s case has been strengthened by support from notable quarters – Roy Porter, the distinguished medical historian, recently wrote a favourable appraisal of his research.'
              }
            ],
            targetParagraphId: 'pC',
            targetSnippet: '...Roy Porter, the distinguished medical historian, recently wrote a favourable appraisal of his research.'
          },
          statement: {
            rawText: 'Question 10: Roy Porter disagrees with Professor Macfarlane’s findings.',
            deconstructedVariables: [
              { name: 'X_critic', text: 'Roy Porter' },
              { name: 'Y_action_trap', text: 'DISAGREES WITH (bác bỏ / không đồng tình)', isTrapWord: true },
              { name: 'Z_target', text: 'Professor Macfarlane’s findings' }
            ]
          },
          passageEvidence: {
            rawText: 'Macfarlane’s case has been strengthened by support from notable quarters – Roy Porter, the distinguished medical historian, recently wrote a favourable appraisal of his research.',
            targetVariables: [
              { matchingName: 'X_critic', text: 'Roy Porter, the distinguished medical historian' },
              { matchingName: 'Y_action_trap', text: 'wrote a FAVOURABLE APPRAISAL (viết bài thẩm định tán thành / ủng hộ mạnh mẽ)' },
              { matchingName: 'Z_target', text: 'of his research (nghiên cứu của Macfarlane)' }
            ]
          },
          expectedRelation: 'contradiction',
          verdict: 'FALSE',
          pedagogicalInsight: 'Mâu thuẫn ngữ nghĩa hoàn toàn (Direct Contradiction): Câu hỏi dùng "disagrees with" (bất đồng), trong khi bài khẳng định Porter "wrote a favourable appraisal" (đánh giá ủng hộ tích cực, củng cố thêm lập luận của Macfarlane). Hai dữ kiện triệt tiêu lẫn nhau -> Phán quyết: FALSE.'
        }
      },
      {
        stageNumber: 3,
        stageType: 'verification_scale',
        title: 'Chặng 3: Evidence Chain — Chuỗi Nhân Quả Gián Tiếp (Indirect Cause & Effect - Question 13: TRUE)',
        pedagogicalObjective: 'Lần vết chuỗi mắt xích nguyên nhân - kết quả: Thuế mạch nha tăng → Dân nghèo đổi sang uống rượu/nước lã bẩn → Tỉ lệ tử vong tăng vọt.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Lắp ráp chuỗi logic nhân quả gián tiếp giải thích tác động của thuế mạch nha (malt tax):',
          passageContext: {
            title: 'Cambridge 10 Test 2 Passage 1: Tea and the Industrial Revolution (Paragraph E)',
            paragraphs: [
              {
                id: 'pE',
                label: 'Đoạn E (Dòng 6-10)',
                text: 'But in the late 17th century a tax was introduced on malt, the basic ingredient of beer. The poor turned to water and gin and in the 1720s the mortality rate began to rise again. Then it suddenly dropped again. What caused this?'
              }
            ],
            targetParagraphId: 'pE',
            targetSnippet: '...a tax was introduced on malt... The poor turned to water and gin and in the 1720s the mortality rate began to rise again.'
          },
          statement: {
            rawText: 'Question 13: The tax on malt indirectly caused a rise in the death rate.',
            deconstructedVariables: [
              { name: 'K_cause', text: 'The tax on malt' },
              { name: 'L_mechanism', text: 'INDIRECTLY CAUSED (gián tiếp gây ra)' },
              { name: 'M_result', text: 'a rise in the death rate (tỉ lệ tử vong tăng)' }
            ]
          },
          passageEvidence: {
            rawText: 'A tax was introduced on malt... The poor turned to water and gin and in the 1720s the mortality rate began to rise again.',
            targetVariables: [
              { matchingName: 'K_cause', text: 'A tax was introduced on malt, the basic ingredient of beer' },
              { matchingName: 'L_mechanism', text: 'Mắt xích trung gian: Người nghèo không đủ tiền mua bia kháng khuẩn -> uống nước bẩn và rượu gin' },
              { matchingName: 'M_result', text: 'the mortality rate began to rise again (= a rise in the death rate)' }
            ]
          },
          expectedRelation: 'match',
          verdict: 'TRUE',
          pedagogicalInsight: 'Chuỗi nhân quả hoàn toàn trùng khớp (Perfect Indirect Causation): Thuế đánh vào mạch nha làm mất đi lớp bảo vệ kháng khuẩn từ bia, người nghèo phải chuyển sang uống nước bẩn và rượu gin, dẫn đến bệnh tật bùng phát và tỉ lệ chết tăng trở lại. Đây chính xác là "indirectly caused" -> Phán quyết: TRUE.'
        }
      },
      {
        stageNumber: 4,
        stageType: 'progressive_reveal',
        title: 'Chặng 4: Lexical Flip Cards — Bộ Ba Khái Niệm Lịch Sử & Y Tế Trọng Điểm',
        pedagogicalObjective: 'Ghi nhớ 3 cặp thuật ngữ học thuật cốt lõi trong bài đọc: Antiseptic properties, Water-borne disease và Infant mortality rate.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click từng thẻ để nạp nhanh vốn từ học thuật then chốt của bài đọc:',
          cards: [
            {
              step: 1,
              label: 'THUẬT NGỮ 1: TÍNH NĂNG KHÁNG KHUẨN (ANTISEPTIC PROPERTIES)',
              cognitiveFunction: '1. Hiểu cơ chế hóa sinh giúp trà và bia bảo vệ sức khỏe con người',
              content: 'The antiseptic properties of tannin in tea and hops in beer prevented deadly infections.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Cụm "antiseptic properties" (/ˌæn.tiˈsep.tɪk ˈprɒp.ə.tiz/) chỉ đặc tính sát trùng, diệt khuẩn.',
              flipCard: {
                frontText: 'Tea can kill bacteria. (Từ vựng thường ngày)',
                backText: 'Tea possesses powerful antiseptic properties that purify the digestive system. (Band 5.5 học thuật)',
                explanation: 'Nâng cấp từ "kill bacteria" sang cụm danh từ "possess antiseptic properties".'
              }
            },
            {
              step: 2,
              label: 'THUẬT NGỮ 2: BỆNH TRUYỀN QUA NGUỒN NƯỚC (WATER-BORNE DISEASES)',
              cognitiveFunction: '2. Nhận diện các bệnh dịch lây qua đường nước thải đô thị',
              content: 'Drinking boiled water helped urban populations avoid fatal water-borne diseases such as dysentery.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Tính từ ghép "water-borne" (/ˈwɔː.təˌbɔːn/) có nghĩa là lây truyền theo nguồn nước.',
              flipCard: {
                frontText: 'Diseases from dirty water. (Miêu tả sơ cấp)',
                backText: 'Densely populated industrial towns were vulnerable to catastrophic water-borne diseases. (Band 5.5)',
                explanation: 'Dùng cụm chuyên môn "water-borne diseases" để miêu tả các dịch bệnh như kiết lỵ (dysentery) hay tả (cholera).'
              }
            },
            {
              step: 3,
              label: 'THUẬT NGỮ 3: TỈ LỆ TỬ VONG TRẺ SƠ SINH (INFANT MORTALITY RATE)',
              cognitiveFunction: '3. Chỉ số nhân khẩu học quyết định sự bùng nổ dân số lao động',
              content: 'The infant mortality rate halved within twenty years, providing abundant labor for factories.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Collocation nhân khẩu học: "infant mortality rate" (/ˈɪn.fənt mɔːˈtæl.ə.ti reɪt/).',
              flipCard: {
                frontText: 'The number of babies dying was lower. (Diễn đạt mộc)',
                backText: 'A rapid decline in the infant mortality rate fueled the workforce required for industrial expansion. (Band 5.5)',
                explanation: 'Thay "babies dying" bằng thuật ngữ chính xác "infant mortality rate".'
              }
            }
          ],
          fullMosaicSummary: 'By drinking tea made with boiled water, the British unwittingly protected their urban labor force from deadly water-borne diseases, allowing industrial cities to grow without succumbing to epidemics.'
        }
      }
    ]
  },
  {
    id: 'builder_w8d3',
    courseId: 'builder',
    week: 8,
    day: 3,
    skill: 'speaking',
    title: 'SPEAKING · BUỔI 3: ENVIRONMENT & NỐI ÂM CONNECTED SPEECH',
    subtitle: 'Connected Speech (Nối Phụ Âm Với Nguyên Âm), Weak Forms & Intonation Trong Tranh Luận Môi Trường',
    coreCompetency: 'Làm chủ quy tắc nối âm Connected Speech (phụ âm cuối với nguyên âm đầu: swi-macross, loo-kit-up), dạng phát âm yếu (Weak Forms: to /tə/, gonna) và ngữ điệu (Intonation) để biểu đạt thái độ, quan điểm về các vấn đề ô nhiễm, năng lượng và biến đổi khí hậu.',
    bridgeToHomework: {
      promptText: 'Ghi âm bài nói trả lời 3 câu hỏi Part 1 về Environment với kỹ thuật nối âm tự nhiên và intonation chuẩn xác trong Speaking Homework Tuần 8 Day 3.',
      targetExamId: 'exam_builder_w8d3'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'progressive_reveal',
        title: 'Chặng 1: Connected Speech Wave — Cơ Chế Nối Âm Phụ Âm Với Nguyên Âm & Weak Forms (Mục 1.1)',
        pedagogicalObjective: 'Luyện tập kỹ thuật nối mượt mà phụ âm cuối của từ trước sang nguyên âm đầu của từ kế tiếp để phát âm trôi chảy tự nhiên như người bản xứ.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click từng nấc để quan sát điểm nối âm (Linking Sound) và dạng nói yếu (Weak Forms):',
          cards: [
            {
              step: 1,
              label: 'NẤC 1: NỐI ÂM LIỀN MẠCH (CONSONANT TO VOWEL LINKING)',
              cognitiveFunction: '1. Nối phụ âm cuối với nguyên âm đầu (can’t agree, look it up, swim across)',
              content: 'I can’t_agree! /kɑːnt əˈɡriː/ → Look_it_up in your dictionary! /lʊk ɪt ʌp/ → I swim_across the river /swɪm əˈkrɒs/.',
              bandLevel: 'Band 4.5 → 5.0',
              pedagogyNote: 'Khi nói nhanh, âm /t/ của "can\'t" lướt sang "agree", âm /k/ của "look" ghép vào "it", âm /m/ của "swim" nối với "across".',
              flipCard: {
                frontText: 'I ... can not ... a-gree. (Nói ngắt quãng từng từ)',
                backText: 'I can’t_agree! /kɑːn-tə-ɡriː/ (Nối âm tự nhiên chuẩn người bản xứ)',
                explanation: 'Quy tắc vàng: Phụ âm cuối + Nguyên âm đầu đứng liền nhau tạo thành một âm tiết liền lạc.'
              },
              vowelHighlight: [
                { word: 'can’t agree', phonetic: '/kɑːn-tə-ɡriː/', vowelSound: 'Nối /t/ sang /ə/' },
                { word: 'look it up', phonetic: '/lʊ-kɪ-tʌp/', vowelSound: 'Nối /k/ sang /ɪ/ và /t/ sang /ʌ/' },
                { word: 'swim across', phonetic: '/swɪ-mə-krɒs/', vowelSound: 'Nối /m/ sang /ə/' }
              ]
            },
            {
              step: 2,
              label: 'NẤC 2: DẠNG PHÁT ÂM YẾU TRONG GIAO TIẾP NHANH (WEAK FORMS)',
              cognitiveFunction: '2. Nhận biết và phát âm weak forms của trợ động từ và giới từ (going to → gonna, to /tuː/ → /tə/)',
              content: 'In normal speech, "going to" reduces to "gonna", and "to" /tuː/ reduces to the neutral weak form /tə/.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Trong IELTS Listening Section 2-3 và Speaking tự nhiên, các từ chức năng (function words) luôn ở dạng Weak Form để nhường trọng âm cho từ nội dung.',
              flipCard: {
                frontText: 'I want TO /tuː/ go TO /tuː/ school. (Phát âm gồng cứng)',
                backText: 'I want to /tə/ reduce plastic waste to /tə/ protect our planet. (Phát âm lướt nhẹ tự nhiên)',
                explanation: 'Giới từ "to" trong câu nói bình thường phát âm là /tə/ với nguyên âm schwa trung tính.'
              }
            },
            {
              step: 3,
              label: 'NẤC 3: NGỮ ĐIỆU BIỂU ĐẠT THÁI ĐỘ CẢM XÚC (INTONATION & ATTITUDE)',
              cognitiveFunction: '3. Điều khiển giọng đi lên (ngạc nhiên/hứng khởi) vs giọng đi xuống (thất vọng/nghiêm nghị)',
              content: '"I can’t believe it!" ↗ Giọng đi lên: ngạc nhiên vui mừng ("Ôi, thật không thể tin được!") ↘ Giọng đi xuống: bất lực, buồn bã ("Tôi thật sự không thể tin nổi...").',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Intonation là chiếc chìa khóa thể hiện cảm xúc và lập trường cá nhân trong bài thi Speaking.',
              flipCard: {
                frontText: 'Nói bằng giọng đều đều như robot (Flat intonation - Band 4.0)',
                backText: 'ReCYcling is such a SIMple action, but it can make a HUGE difference! (Nhấn cao trào ở HUGE - Band 5.5)',
                explanation: 'Lên giọng ở các tính từ nhấn mạnh và xuống giọng dứt khoát ở cuối mệnh đề khẳng định.'
              }
            }
          ],
          fullMosaicSummary: 'Connected speech bridges word boundaries: consonant endings link directly to vowel beginnings, weak forms (/tə/, gonna) soften unstressed particles, and intonation conveys emotional urgency.'
        }
      },
      {
        stageNumber: 2,
        stageType: 'progressive_reveal',
        title: 'Chặng 2: Speaking Flow Map — Dòng Chảy Đối Thoại Về Vấn Đề Môi Trường (Library Dialogue Flow)',
        pedagogicalObjective: 'Kích hoạt phản xạ lập luận 3 pha theo cấu trúc đối thoại Lan & Nam: Vấn đề ô nhiễm nhiên liệu hóa thạch → Khó khăn chuyển đổi năng lượng → Giải pháp thực tế của mỗi cá nhân.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click từng pha để theo dõi dòng chảy phản xạ tự nhiên khi thảo luận chủ đề môi trường:',
          cards: [
            {
              step: 1,
              label: 'PHA 1: NHẬN DIỆN VẤN ĐỀ Ô NHIỄM KHÔNG KHÍ (AIR QUALITY CRISIS)',
              cognitiveFunction: '1. Nêu thực trạng ô nhiễm không khí tại các đại đô thị do khói xe và khí thải nhà máy',
              content: 'In big cities, air pollution is becoming harder to breathe because dense traffic produces excessive smoke and fine dust.',
              bandLevel: 'Band 4.5 → 5.0',
              pedagogyNote: 'Vận dụng câu thực hành 1.2: "The air in big cities is becoming harder to breathe every year".',
              flipCard: {
                frontText: 'Cities have bad air and many cars. (Band 4.0 đơn sơ)',
                backText: 'Air pollution is a critical issue in major cities as dense vehicles release toxic smoke and dust. (Band 5.0)',
                explanation: 'Mở rộng câu bằng mệnh đề quan hệ và liên từ nguyên nhân "as dense vehicles release...".'
              }
            },
            {
              step: 2,
              label: 'PHA 2: TRANH LUẬN KINH TẾ VS BẢO VỆ THIÊN NHIÊN (ECONOMIC TRADE-OFF)',
              cognitiveFunction: '2. Nêu sự giằng co giữa nhu cầu phát triển kinh tế và chi phí đắt đỏ của năng lượng thay thế',
              content: 'While burning fossil fuels generates vital electricity for economic prosperity, renewable energy sources remain quite expensive for developing countries.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Trích từ quan điểm đối thoại giữa Lan và Nam (Mục 2.1): "Alternative energy sources are too expensive right now".',
              flipCard: {
                frontText: 'Green energy is good but very expensive so countries burn coal. (Band 4.0 cộc lốc)',
                backText: 'Although alternative energy is ideal, developing nations still rely on fossil fuels due to high transition costs. (Band 5.5)',
                explanation: 'Dùng mệnh đề nhượng bộ "Although alternative energy is ideal..." để tạo chiều sâu tư duy.'
              }
            },
            {
              step: 3,
              label: 'PHA 3: HÀNH ĐỘNG CỦA CÁ NHÂN & THAY ĐỔI LỚN (INDIVIDUAL ACTION & IMPACT)',
              cognitiveFunction: '3. Khẳng định các hành động nhỏ của mỗi người (tái chế, giảm túi nilon) tạo ra tác động to lớn',
              content: 'Recycling and cutting down on single-use plastics are simple everyday actions, but collectively they make a huge difference for our oceans.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Vận dụng câu trọng âm 1.2: "Recycling is such a simple action, but it can make a huge difference".',
              flipCard: {
                frontText: 'People should recycle and not use plastic bags. (Band 4.0)',
                backText: 'Recycling is a simple habit, yet widespread public participation can make a tremendous difference. (Band 5.5)',
                explanation: 'Kết hợp "yet widespread public participation" với collocation "make a tremendous difference".'
              }
            }
          ],
          fullMosaicSummary: 'Discussing environmental issues requires balancing real-world challenges: burning fossil fuels causes severe urban pollution, alternative energies carry high initial costs, yet individual recycling efforts create meaningful long-term change.'
        }
      },
      {
        stageNumber: 3,
        stageType: 'progressive_reveal',
        title: 'Chặng 3: Lexical Flip Cards — Bộ Ba Cụm Diễn Đạt Môi Trường Trọng Tâm (Mục 2.2 & 2.3)',
        pedagogicalObjective: 'Làm chủ 3 cụm chuỗi nhân quả môi trường đắt giá: Burn fossil fuels to generate electricity, Natural habitat destruction, và Cut down on plastic waste.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click từng thẻ để biến câu từ vụn vặt thành câu ghép nhân quả học thuật:',
          cards: [
            {
              step: 1,
              label: 'THẺ 1: ĐỐT NHIÊN LIỆU HÓA THẠCH (BURN FOSSIL FUELS)',
              cognitiveFunction: '1. Diễn đạt chuỗi nhân quả: Đốt nhiên liệu hóa thạch phát điện → Ô nhiễm không khí đô thị',
              content: 'Burning fossil fuels to generate electricity is the main driver of severe air pollution in metropolitan areas.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Cụm diễn đạt mục 2.2: "burn fossil fuels to generate electricity" (/bɜːn ˈfɒs.əl ˌfjuː.əlz/).',
              flipCard: {
                frontText: 'Factories burn oil and coal to make power. (Diễn đạt thô)',
                backText: 'Burning fossil fuels to generate electricity releases massive greenhouse gases into the atmosphere. (Band 5.5)',
                explanation: 'Dùng danh động từ "Burning fossil fuels to generate electricity" làm chủ ngữ sang trọng.'
              }
            },
            {
              step: 2,
              label: 'THẺ 2: PHÁ HỦY MÔI TRƯỜNG SỐNG TỰ NHIÊN (DESTRUCTION OF NATURAL HABITAT)',
              cognitiveFunction: '2. Nêu tác động của cháy rừng đến sự tuyệt chủng của muông thú',
              content: 'Frequent forest fires lead to the destruction of natural habitats, putting rare wildlife on the brink of extinction.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Cụm từ vựng mục 2.2: "destruction of natural habitat" (/dɪˈstrʌk.ʃən əv ˈnætʃ.ər.əl ˈhæb.ɪ.tæt/).',
              flipCard: {
                frontText: 'Forest fires kill animals and destroy trees. (Band 4.0)',
                backText: 'Forest fires cause catastrophic destruction of natural habitats, accelerating animal extinction. (Band 5.5)',
                explanation: 'Kết hợp "destruction of natural habitats" với động từ "accelerating animal extinction".'
              }
            },
            {
              step: 3,
              label: 'THẺ 3: HÀNH ĐỘNG NHỎ TẠO KHÁC BIỆT LỚN (MAKE A HUGE DIFFERENCE)',
              cognitiveFunction: '3. Diễn đạt thông điệp tích cực về hành động bảo vệ môi trường',
              content: 'Although individual efforts seem small, using public transit and reducing plastic waste can make a huge difference.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Thành ngữ quen thuộc trong chủ đề môi trường: "make a huge difference" (/meɪk ə hjuːdʒ ˈdɪf.ər.əns/).',
              flipCard: {
                frontText: 'Small actions help the earth a lot. (Giao tiếp cơ bản)',
                backText: 'Even minor lifestyle adjustments can collectively make a huge difference in cutting environmental waste. (Band 5.5)',
                explanation: 'Collocation điểm sáng "make a huge difference" kết hợp cùng trạng từ "collectively".'
              }
            }
          ],
          fullMosaicSummary: 'Protecting the environment starts with understanding the causes: burning fossil fuels worsens air quality, deforestation destroys habitats, but collective action to reduce plastic waste makes a lasting difference.'
        }
      }
    ]
  },
  {
    id: 'builder_w9d1',
    courseId: 'builder',
    week: 9,
    day: 1,
    skill: 'writing',
    title: 'WRITING · BUỔI 1: VIẾT INTRODUCTION VÀ OVERVIEW TRONG WT1',
    subtitle: 'Kỹ Thuật Paraphrase Đổi Dạng Từ (Clause ↔ Noun Phrase) & Cấu Trúc Overview 3 Yếu Tố (Trend, Difference, Exception)',
    coreCompetency: 'Nắm vững công thức viết Introduction chuẩn xác qua kỹ thuật biến đổi từ loại (how much meat was consumed ↔ meat consumption) và làm chủ cấu trúc đoạn Overview hoàn chỉnh bao gồm xu hướng chung, đối tượng áp đảo và ngoại lệ duy nhất.',
    bridgeToHomework: {
      promptText: 'Viết Introduction và Overview hoàn chỉnh cho 2 đề thi (International Applicants và Renewable Energy) trong Writing Homework Tuần 9 Day 1.',
      targetExamId: 'exam_builder_w9d1'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'syntax_anatomy',
        title: 'Chặng 1: Sentence X-Ray — Bóc Tách Kỹ Thuật Biến Đổi Mệnh Đề Thành Cụm Danh Từ (Paraphrase Engine)',
        pedagogicalObjective: 'Quan sát cách chuyển đổi từ cụm danh từ ở đề bài "the consumption of fish and different kinds of meat" sang mệnh đề tân ngữ linh hoạt "how much fish and meat were consumed" để ghi điểm Grammatical Range.',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Bấm phân tích để quan sát cơ chế biến đổi cú pháp câu mở bài Introduction chuẩn mực:',
          mode: 'build',
          tokens: [
            { id: 't1', text: 'The line graph', role: 'subject', colorClass: 'blue' },
            { id: 't2', text: 'illustrates', role: 'fv_core', colorClass: 'green' },
            { id: 't3', text: 'how much fish and meat of different kinds were consumed', role: 'subordinating_clause', colorClass: 'orange' },
            { id: 't4', text: 'in a European country between 1979 and 2004.', role: 'modifier', colorClass: 'purple' }
          ],
          slots: [
            { slotId: 's1', acceptedRoles: ['subject'], label: 'LOẠI BIỂU ĐỒ (VISUAL TYPE)' },
            { slotId: 's2', acceptedRoles: ['fv_core'], label: 'ĐỘNG TỪ BÁO CÁO (REPORTING VERB)' },
            { slotId: 's3', acceptedRoles: ['subordinating_clause'], label: 'MỆNH ĐỀ ĐỐI TƯỢNG ĐƯỢC PARAPHRASE (PARAPHRASED CLAUSE)' },
            { slotId: 's4', acceptedRoles: ['modifier'], label: 'PHẠM VI KHÔNG GIAN VÀ THỜI GIAN (TIME & PLACE)' }
          ]
        }
      },
      {
        stageNumber: 2,
        stageType: 'productive_failure',
        title: 'Chặng 2: Break & Repair — Bẻ Gãy Bẫy Chép Nguyên Văn Đề Bài (Prompt Copying Trap)',
        pedagogicalObjective: 'Phát hiện lỗi sao chép máy móc đề bài thi (bẫy Band 4.0 - 5.0) và morph sang câu mở bài học thuật có biến đổi từ loại và đại từ chỉ số lượng.',
        interactionModel: {
          type: 'slot_snap',
          prompt: 'Click vào cụm từ bị sao chép nguyên xi đề bài để bẻ gãy lối hành văn sơ cấp:',
          mode: 'break_and_repair',
          tokens: [
            { id: 't1', text: 'The chart below shows', role: 'subject', colorClass: 'red' },
            { id: 't2', text: 'the number of international applicants to the universities of one European country.', role: 'fv_core', colorClass: 'gray' }
          ],
          collisionTarget: {
            conflictingTokenIds: ['t1', 't2'],
            errorMessage: 'LỖI CHÉP LẠI ĐỀ BÀI & DÙNG TỪ "BELOW": Bài viết IELTS không được giữ lại từ "below", và việc chép y nguyên cụm "the number of international applicants" sẽ bị trừ nặng điểm Lexical Resource!',
            repairOptions: [
              {
                id: 'opt_intro_paraphrase',
                action: 'morph',
                targetTokenId: 't1',
                resultText: 'The given chart delineates how many international students applied to tertiary institutions in a specific European nation.',
                explanation: 'Nâng cấp chuẩn Band 6.0+: Bỏ "below", đổi "shows" -> "delineates", đổi "the number of applicants" -> mệnh đề "how many international students applied", và "universities" -> "tertiary institutions".'
              }
            ]
          }
        }
      },
      {
        stageNumber: 3,
        stageType: 'progressive_reveal',
        title: 'Chặng 3: Transformation Ladder — 3 Nấc Lắp Ghép Đoạn Overview Đầy Đủ Xu Hướng & Ngoại Lệ',
        pedagogicalObjective: 'Xây dựng đoạn Overview 2 câu chuẩn mực cho bài University Applicants: Câu 1 nêu xu hướng chung và ngoại lệ; Câu 2 nêu đối tượng bứt phá chiếm ngôi đầu bảng.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click từng nấc để lắp ghép đoạn Overview hội tụ đủ 3 yếu tố: Trend, Major Difference và Exception:',
          cards: [
            {
              step: 1,
              label: 'NẤC 1: XÁC ĐỊNH XU HƯỚNG CHUNG KÈM NGOẠI LỆ (GENERAL TREND & EXCEPTION)',
              cognitiveFunction: '1. Nhận diện việc hầu hết các nước đều tăng lượng hồ sơ, ngoại trừ Trung Quốc',
              content: 'Overall, the number of university applicants from most countries witnessed an upward trend, with the notable exception of China.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Dùng cấu trúc ăn điểm ngoại lệ: "with the notable exception of [X]" (ngoại trừ ngoại lệ đáng chú ý là...).',
              flipCard: {
                frontText: 'All countries went up, only China went down. (Band 4.0 đơn điệu)',
                backText: 'Applicant numbers from most nations witnessed growth, with the sole exception of China. (Band 5.5)',
                explanation: 'Thay "only China went down" bằng cụm từ học thuật "with the sole exception of China".'
              }
            },
            {
              step: 2,
              label: 'NẤC 2: SOÁN NGÔI ĐẦU BẢNG NGOẠN MỤC (RANKING SHIFT & FINAL LEADER)',
              cognitiveFunction: '2. Nêu sự đổi ngôi giữa Trung Quốc (giảm liên tục) và Mỹ (tăng vọt lên vị trí số 1)',
              content: 'In addition, while Chinese applicants initially represented the largest group, they were eventually overtaken by applicants from America.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Dùng liên từ tương phản "while" và động từ chuyển giao thứ hạng "were eventually overtaken by...".',
              flipCard: {
                frontText: 'China was top at first but America was top in the end. (Band 4.0)',
                backText: 'While China initially accounted for the majority of applicants, America emerged as the clear leader by the final year. (Band 5.5)',
                explanation: 'Kết hợp "initially accounted for" với "emerged as the clear leader".'
              }
            },
            {
              step: 3,
              label: 'NẤC 3: GHÉP ĐOẠN OVERVIEW HOÀN CHỈNH ĐẠT CHUẨN BAND 6.0+',
              cognitiveFunction: '3. Tạo thành đoạn Overview 2 câu cân đối, rành mạch và bao quát trọn vẹn dữ liệu',
              content: 'Overall, applicant numbers from almost all surveyed countries saw consistent increases, with the notable exception of China. Furthermore, despite initial fluctuations, America surpassed China to become by far the largest source of international students by the end of the period.',
              bandLevel: 'Band 5.5 → 6.0',
              pedagogyNote: 'Đoạn văn này hội tụ đủ: xu hướng bao quát + trường hợp ngoại lệ duy nhất + sự hoán đổi ngôi vị dẫn đầu.',
              flipCard: {
                frontText: 'Viết đoạn Overview chỉ nói chung chung mọi nước đều tăng (bỏ quên ngoại lệ)',
                backText: 'Đoạn Overview hoàn chỉnh: 1 câu xu hướng kèm ngoại lệ (China) + 1 câu bứt phá dẫn đầu (America).',
                explanation: 'Đáp ứng 100% tiêu chí Task Achievement của Band 6.0+ không đưa số liệu cụ thể.'
              }
            }
          ],
          fullMosaicSummary: 'A complete Overview must synthesize three core dimensions: the dominant trend across categories, any single notable exception, and major shifts in ranking over time.'
        }
      },
      {
        stageNumber: 4,
        stageType: 'progressive_reveal',
        title: 'Chặng 4: Lexical Flip Cards — Bộ Ba Cặp Chuyển Đổi Từ Loại (Clause ↔ Noun Phrase)',
        pedagogicalObjective: 'Làm chủ 3 kỹ thuật chuyển đổi từ loại phổ biến nhất trong đề thi Writing Task 1 từ giáo trình mục 1.b.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click từng thẻ để biến đổi linh hoạt giữa cụm danh từ và mệnh đề tân ngữ:',
          cards: [
            {
              step: 1,
              label: 'CẶP 1: SẢN LƯỢNG HOA QUẢ (FRUIT PRODUCTION)',
              cognitiveFunction: '1. Chuyển đổi giữa how much fruit was produced và fruit production',
              content: 'how much fruit was produced ↔ the total production of fruit / fruit production figures.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Khi đề bài cho danh từ "fruit production", hãy paraphrase thành mệnh đề "how much fruit was produced" hoặc ngược lại.',
              flipCard: {
                frontText: 'The chart shows fruit production... (Chép nguyên đề)',
                backText: 'The chart illustrates how much fruit was produced by agricultural sectors... (Band 5.5)',
                explanation: 'Đổi từ cụm danh từ "fruit production" sang mệnh đề quá khứ bị động "how much fruit was produced".'
              }
            },
            {
              step: 2,
              label: 'CẶP 2: LƯỢNG TIÊU THỤ CÁ (FISH CONSUMPTION)',
              cognitiveFunction: '2. Chuyển đổi giữa how much fish was eaten và fish consumption',
              content: 'the consumption of fish ↔ how much fish was consumed / eaten by citizens.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Động từ "consumed" hoặc "eaten" thay thế hoàn hảo cho danh từ "consumption".',
              flipCard: {
                frontText: 'The graph shows fish consumption... (Chép nguyên đề)',
                backText: 'The graph illustrates how much fish was eaten across various households... (Band 5.5)',
                explanation: 'Sử dụng cấu trúc câu hỏi gián tiếp "how much [noun] was consumed" rất tự nhiên.'
              }
            },
            {
              step: 3,
              label: 'CẶP 3: TỶ LỆ ĐI XEM PHIM (CINEMA ATTENDANCE)',
              cognitiveFunction: '3. Chuyển đổi giữa what percentage visited và cinema attendance rate',
              content: 'what percentage of people visited cinemas ↔ the proportion of cinema-goers / cinema attendance rates.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Paraphrase từ "percentage" sang "proportion" và "people who visited" sang "cinema-goers".',
              flipCard: {
                frontText: 'The table shows the percentage of people visiting cinema. (Đề bài)',
                backText: 'The table delineates the cinema attendance rate among different age brackets. (Band 5.5)',
                explanation: 'Thay "percentage of people visiting" bằng danh từ ghép cô đọng "cinema attendance rate".'
              }
            }
          ],
          fullMosaicSummary: 'Mastering Task 1 paraphrasing requires bidirectional agility: fluidly transforming noun phrases (production, consumption, attendance) into clauses (how much was produced, consumed, or visited).'
        }
      }
    ]
  },
  {
    id: 'builder_w9d2',
    courseId: 'builder',
    week: 9,
    day: 2,
    skill: 'reading',
    title: 'READING · BUỔI 2: SO SÁNH & ĐỐI LẬP (COMPARE AND CONTRAST)',
    subtitle: 'Cambridge 9 Test 1: Attitudes to Language — Prescriptivism vs Descriptivism & Logic True / False / Not Given',
    coreCompetency: 'Nắm vững kỹ năng đối chiếu hai trường phái tư tưởng đối lập (Prescriptivism - Quy tắc chuẩn mực vs Descriptivism - Miêu tả thực tế) qua các từ nối tương phản (conversely, whereas, however) và làm chủ kỹ thuật xác minh True / False / Not Given.',
    bridgeToHomework: {
      promptText: 'Hoàn thành bài đọc Cambridge 9 Test 1 Passage 1 (Attitudes to language) và giải các câu hỏi còn lại trong Reading Homework Tuần 9 Day 2.',
      targetExamId: 'exam_builder_w9d2'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'verification_scale',
        title: 'Chặng 1: Logic Scale — Bóc Trần Bẫy So Sánh Hơn Kém Khống (Question 2: Degree Comparison Trap - FALSE)',
        pedagogicalObjective: 'Phát hiện sự sai lệch giữa cấu trúc so sánh ngang bằng trong bài đọc "Arguments can start AS EASILY over minor points AS over major policies" với cấu trúc so sánh hơn sai lệch trong câu hỏi "People feel MORE STRONGLY about... than about...".',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Đặt nhận định của câu hỏi và cấu trúc so sánh trong bài đọc lên bàn cân logic:',
          passageContext: {
            title: 'Cambridge IELTS 9 Passage 1: Attitudes to Language (Paragraph 1)',
            paragraphs: [
              {
                id: 'p1',
                label: 'Đoạn 1 (Dòng 4-6)',
                text: 'Language belongs to everyone, so most people feel they have a right to hold an opinion about it. And when opinions differ, emotions can run high. Arguments can start as easily over minor points of usage as over major policies of linguistic education.'
              }
            ],
            targetParagraphId: 'p1',
            targetSnippet: 'Arguments can start as easily over minor points of usage as over major policies of linguistic education.'
          },
          statement: {
            rawText: 'Question 2: People feel more strongly about language education than about small differences in language usage.',
            deconstructedVariables: [
              { name: 'A_subject', text: 'People’s emotional reaction' },
              { name: 'B_comparison_trap', text: 'FEEL MORE STRONGLY ABOUT [education] THAN [usage]', isTrapWord: true },
              { name: 'C_domain', text: 'language education vs minor usage' }
            ]
          },
          passageEvidence: {
            rawText: 'Arguments can start as easily over minor points of usage as over major policies of linguistic education.',
            targetVariables: [
              { matchingName: 'A_subject', text: 'Arguments / emotions can run high' },
              { matchingName: 'B_comparison_trap', text: 'AS EASILY over minor points... AS OVER major policies (MỨC ĐỘ DỄ BÙNG NỔ TRANH CÃI LÀ NGANG BẰNG NHAU)' },
              { matchingName: 'C_domain', text: 'minor points of usage vs major policies of linguistic education' }
            ]
          },
          expectedRelation: 'contradiction',
          verdict: 'FALSE',
          pedagogicalInsight: 'Bẫy so sánh sai lệch mức độ (Degree Comparison Clash): Câu hỏi khẳng định con người phản ứng mạnh mẽ hơn với giáo dục so với khác biệt nhỏ ("feel more strongly about... than..."). Nhưng bài đọc khẳng định tranh cãi bùng phát DỄ DÀNG NHƯ NHAU ở cả hai trường hợp ("as easily... as..."). Hai khẳng định mâu thuẫn -> Phán quyết: FALSE.'
        }
      },
      {
        stageNumber: 2,
        stageType: 'verification_scale',
        title: 'Chặng 2: Evidence Chain — Cầu Nối Paraphrase Khớp 100% Ý Tưởng (Question 6: Descriptivists - TRUE)',
        pedagogicalObjective: 'Lần vết cầu nối Paraphrase giữa nhận định của câu hỏi "it is pointless to try to stop language change" và tuyên ngôn của các nhà ngữ pháp miêu tả trong bài "not to attempt the impossible tasks of halting language change".',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Kiểm chứng sự trùng khớp giữa quan điểm của Descriptivists trong câu hỏi và dẫn chứng bài đọc:',
          passageContext: {
            title: 'Cambridge IELTS 9 Passage 1: Attitudes to Language (Paragraph 5)',
            paragraphs: [
              {
                id: 'p5',
                label: 'Đoạn 5 (Dòng 3-6)',
                text: 'This approach is summarised in the statement that it is the task of the grammarian to describe, not prescribe - to record the facts of linguistic diversity, and not to attempt the impossible tasks of evaluating language variation or halting language change.'
              }
            ],
            targetParagraphId: 'p5',
            targetSnippet: '...and not to attempt the impossible tasks of evaluating language variation or halting language change.'
          },
          statement: {
            rawText: 'Question 6: According to descriptivists it is pointless to try to stop language change.',
            deconstructedVariables: [
              { name: 'M_actor', text: 'According to descriptivists' },
              { name: 'N_assessment', text: 'IT IS POINTLESS (vô ích / bất khả thi)' },
              { name: 'P_action', text: 'to try to stop language change (ngăn chặn ngôn ngữ biến đổi)' }
            ]
          },
          passageEvidence: {
            rawText: 'not to attempt the impossible tasks of evaluating language variation or halting language change.',
            targetVariables: [
              { matchingName: 'M_actor', text: 'descriptivist approach (describe, not prescribe)' },
              { matchingName: 'N_assessment', text: 'THE IMPOSSIBLE TASKS (= it is pointless / bất khả thi, vô ích)' },
              { matchingName: 'P_action', text: 'halting language change (= stop language change / ngăn chặn ngôn ngữ đổi thay)' }
            ]
          },
          expectedRelation: 'match',
          verdict: 'TRUE',
          pedagogicalInsight: 'Cầu nối Paraphrase hoàn hảo: "it is pointless" = "the impossible task" (việc bất khả thi / làm vô ích), "to stop language change" = "halting language change" (ngăn cản sự biến đổi). Hai vế tương thích 100% -> Phán quyết: TRUE.'
        }
      },
      {
        stageNumber: 3,
        stageType: 'verification_scale',
        title: 'Chặng 3: Verification Scale — Nhận Diện Khoảng Trống Dữ Liệu Giá Sách (Question 4: NOT GIVEN)',
        pedagogicalObjective: 'Phát hiện sự vắng mặt của thông tin chi phí mua sách ngữ pháp thế kỷ 18 ("cost a lot of money to buy") để kiên quyết chọn NOT GIVEN.',
        interactionModel: {
          type: 'verification_scale',
          prompt: 'Kiểm tra xem giá tiền mua sách ngữ pháp thế kỷ 18 có xuất hiện trong văn bản hay không:',
          passageContext: {
            title: 'Cambridge IELTS 9 Passage 1: Attitudes to Language (Paragraph 4)',
            paragraphs: [
              {
                id: 'p4',
                label: 'Đoạn 4 (Dòng 1-4)',
                text: 'All the main languages have been studied prescriptively, especially in the 18th century approach to the writing of grammars and dictionaries. The aims of these early grammarians were threefold: (a) they wanted to codify the principles of their languages...'
              }
            ],
            targetParagraphId: 'p4',
            targetSnippet: 'All the main languages have been studied prescriptively, especially in the 18th century approach to the writing of grammars and dictionaries.'
          },
          statement: {
            rawText: 'Question 4: Prescriptive grammar books cost a lot of money to buy in the 18th century.',
            deconstructedVariables: [
              { name: 'X_object', text: 'Prescriptive grammar books in the 18th century' },
              { name: 'Y_attribute_trap', text: 'COST A LOT OF MONEY TO BUY (rất đắt tiền để mua)', isTrapWord: true },
              { name: 'Z_timeline', text: 'in the 18th century' }
            ]
          },
          passageEvidence: {
            rawText: 'All the main languages have been studied prescriptively, especially in the 18th century approach to the writing of grammars and dictionaries.',
            targetVariables: [
              { matchingName: 'X_object', text: '18th century approach to writing grammars and dictionaries' },
              { matchingName: 'Y_attribute_trap', text: 'KHÔNG CÓ DÒNG NÀO NHẮC ĐẾN GIÁ BÁN HAY CHI PHÍ TIỀN BẠC ĐỂ MUA SÁCH (NO PRICE DATA)' },
              { matchingName: 'Z_timeline', text: '18th century' }
            ]
          },
          expectedRelation: 'no_evidence',
          verdict: 'NOT GIVEN',
          pedagogicalInsight: 'Bẫy suy đoán ngoài thực tế: Mặc dù sách vào thế kỷ 18 có thể đắt thật, nhưng bài đọc hoàn toàn KHÔNG hề nhắc đến giá tiền hay chi phí mua sách. Thiếu dữ kiện xác thực từ văn bản -> Phán quyết: NOT GIVEN.'
        }
      },
      {
        stageNumber: 4,
        stageType: 'progressive_reveal',
        title: 'Chặng 4: Lexical Flip Cards — Bộ Ba Khái Niệm So Sánh Hai Trường Phái Ngôn Ngữ',
        pedagogicalObjective: 'Ghi nhớ bản chất cốt lõi của 3 thuật ngữ nền tảng trong bài: Prescriptivism, Descriptivism và Codify the principles.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click từng thẻ để phân biệt rõ ranh giới giữa 2 trường phái đối lập:',
          cards: [
            {
              step: 1,
              label: 'THUẬT NGỮ 1: CHỦ NGHĨA QUY TẮC (PRESCRIPTIVISM)',
              cognitiveFunction: '1. Hiểu quan điểm áp đặt quy tắc ngữ pháp đúng - sai tuyệt đối',
              content: 'Prescriptivism is the view that one variety of language has an inherently higher value and should be imposed on all speakers.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Thuật ngữ "prescriptivism" (/prɪˈskrɪp.tɪ.vɪ.zəm/) bắt nguồn từ "prescribe" (kê đơn, áp đặt quy tắc).',
              flipCard: {
                frontText: 'Rules say right or wrong. (Cách hiểu đơn sơ)',
                backText: 'Prescriptive grammarians believe rules must be strictly enforced to preserve linguistic standards. (Band 5.5)',
                explanation: 'Đặc trưng: Coi trọng quy tắc (rules), phân biệt đúng (correct) và sai (incorrect).'
              }
            },
            {
              step: 2,
              label: 'THUẬT NGỮ 2: CHỦ NGHĨA MIÊU TẢ THỰC TẾ (DESCRIPTIVISM)',
              cognitiveFunction: '2. Hiểu quan điểm ghi nhận sự đa dạng và biến đổi tự nhiên của ngôn ngữ',
              content: 'Descriptivism holds that the task of linguists is to describe how people actually use language, rather than prescribing how they ought to speak.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Thuật ngữ "descriptivism" (/dɪˈskrɪp.tɪ.vɪ.zəm/) xuất phát từ "describe" (miêu tả hiện trạng thực tế).',
              flipCard: {
                frontText: 'People talk how they want. (Cách hiểu thô)',
                backText: 'Descriptive linguists record the facts of linguistic diversity without judging usage as right or wrong. (Band 5.5)',
                explanation: 'Đặc trưng: Ghi nhận thực tế giao tiếp (custom of speaking), chấp nhận ngôn ngữ luôn đổi thay.'
              }
            },
            {
              step: 3,
              label: 'THUẬT NGỮ 3: HỆ THỐNG HÓA CÁC NGUYÊN TẮC (CODIFY THE PRINCIPLES)',
              cognitiveFunction: '3. Hiểu mục tiêu của các nhà ngữ pháp thế kỷ 18 khi biên soạn từ điển',
              content: 'Early grammarians aimed to codify the principles of language to show that there was an orderly system beneath chaotic usage.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Cụm động từ học thuật: "codify the principles" (/ˈkəʊ.dɪ.faɪ ðə ˈprɪn.sə.pəlz/ - pháp điển hóa, đúc kết thành luật).',
              flipCard: {
                frontText: 'They make grammar rules for books. (Diễn đạt sơ cấp)',
                backText: '18th-century scholars sought to codify grammatical principles into authoritative dictionaries. (Band 5.5)',
                explanation: 'Dùng cụm học thuật "codify the principles" để diễn đạt việc đúc kết các quy chuẩn ngôn ngữ.'
              }
            }
          ],
          fullMosaicSummary: 'The linguistic debate contrasts two fundamental mindsets: prescriptivists who seek to codify and enforce rigid grammatical standards, versus descriptivists who record living speech and embrace natural language evolution.'
        }
      }
    ]
  },
  {
    id: 'builder_w9d3',
    courseId: 'builder',
    week: 9,
    day: 3,
    skill: 'speaking',
    title: 'SPEAKING · BUỔI 3: PERSONAL ACHIEVEMENT & VƯỢT QUA NGHỊCH CẢNH',
    subtitle: 'Hệ Thống Hóa Phát Âm (-ed, -s/es & Sentence Stress) & Speaking Flow Map Kể Chuyện Khắc Phục Khó Khăn',
    coreCompetency: 'Làm chủ tổng hợp các trụ cột phát âm của khóa học BUILDER (chuẩn đuôi thì quá khứ -ed, số nhiều -s/es, ngữ điệu & trọng âm câu) và vận dụng linh hoạt Speaking Flow Map để tường thuật một giai đoạn vượt khó đầy cảm xúc đạt chuẩn Band 5.5.',
    bridgeToHomework: {
      promptText: 'Ghi âm bài nói 2 phút kể về một khó khăn cá nhân đã vượt qua (Talk about a difficult time you have overcome) trong Speaking Homework Tuần 9 Day 3.',
      targetExamId: 'exam_builder_w9d3'
    },
    stages: [
      {
        stageNumber: 1,
        stageType: 'progressive_reveal',
        title: 'Chặng 1: Transformation Ladder — Thang Nâng Cấp Câu Chuyện Vượt Khó Của Tom (Mục 1.2)',
        pedagogicalObjective: 'Quan sát sự tiến hóa từ các câu văn kể chuyện rời rạc đơn điệu sang đoạn văn tự sự giàu cảm xúc với liên từ thời gian và từ vựng nghị lực sống Band 5.5.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click từng nấc thang để theo dõi hành trình chuyển mình theo đuổi đam mê nghệ thuật của Tom:',
          cards: [
            {
              step: 1,
              label: 'NẤC 1: XUNG ĐỘT NỘI TÂM & CÔNG VIỆC NHÀM CHÁN (TEDIOUS JOB VS PASSION)',
              cognitiveFunction: '1. Khởi đầu với sự giằng xé giữa công việc văn phòng tẻ nhạt và khát vọng cháy bỏng',
              content: 'Although Tom had a burning passion for music, he was initially trapped in a tedious desk job that barely paid the bills.',
              bandLevel: 'Band 4.5 → 5.0',
              pedagogyNote: 'Collocation điểm sáng trích từ bài học: "burning passion" và "tedious desk job that barely paid the bills".',
              flipCard: {
                frontText: 'Tom loved rap but he worked in an office with low salary. (Band 4.0)',
                backText: 'Despite having a burning passion for rap, Tom spent his days in a tedious desk job that barely paid the bills. (Band 5.0)',
                explanation: 'Kết hợp "burning passion" với cụm miêu tả sinh động "a tedious desk job that barely paid the bills".'
              },
              vowelHighlight: [
                { word: 'passion', phonetic: '/ˈpæʃ.ən/', vowelSound: 'Âm /æ/ mở rộng khẩu hình' },
                { word: 'tedious', phonetic: '/ˈtiː.di.əs/', vowelSound: 'Trọng âm rơi vào nguyên âm dài /iː/' },
                { word: 'persevered', phonetic: '/ˌpɜː.sɪˈvɪəd/', vowelSound: 'Âm đuôi -ed phát âm là /d/' }
              ]
            },
            {
              step: 2,
              label: 'NẤC 2: KIÊN TRÌ VƯỢT QUA VẤP NGÃ (PERSEVERING THROUGH SETBACKS)',
              cognitiveFunction: '2. Nêu sự nỗ lực rèn luyện không ngừng nghỉ sau khi nhận lời khuyên từ người bạn thân',
              content: 'Encouraged by his close friend, Tom persevered through numerous setbacks, dedicating countless hours to practicing and perfecting his craft.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Dùng quá khứ phân từ "Encouraged by..." và cụm collocation "persevered through setbacks", "perfecting his craft".',
              flipCard: {
                frontText: 'His friend helped him. He practiced every day a lot. (Band 4.0 nói cộc)',
                backText: 'Encouraged by his friend, Tom persevered through setbacks, spending endless hours perfecting his craft. (Band 5.5)',
                explanation: 'Cấu trúc rút gọn chủ ngữ "Encouraged by his friend" thể hiện độ làm chủ ngữ pháp xuất sắc.'
              }
            },
            {
              step: 3,
              label: 'NẤC 3: BỨT PHÁ THÀNH TỰU & TRUYỀN CẢM HỨNG (ACHIEVEMENT & INSPIRATION)',
              cognitiveFunction: '3. Khép lại bằng cột mốc ký hợp đồng và truyền cảm hứng dũng cảm theo đuổi ước mơ',
              content: 'Eventually, a record label signed a contract with him, proving that fearlessly pursuing one’s dreams can truly transform a person’s life.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Vận dụng thông điệp kết bài của đoạn văn mẫu: "fearlessly pursue one’s dreams" và "transformed his life".',
              flipCard: {
                frontText: 'A music company gave him a contract and he was happy. (Band 4.0)',
                backText: 'Eventually, signing a recording contract transformed his life and inspired others to chase their dreams fearlessly. (Band 5.5)',
                explanation: 'Collocation "transform his life" và trạng từ "fearlessly" tạo kết thúc truyền cảm hứng mạnh mẽ.'
              }
            }
          ],
          fullMosaicSummary: 'Tom felt torn between financial security and his artistic dreams, but he confided in a trusted friend and persevered through countless setbacks. Ultimately, his tireless dedication earned him a recording contract and transformed his entire destiny.'
        }
      },
      {
        stageNumber: 2,
        stageType: 'progressive_reveal',
        title: 'Chặng 2: Speaking Flow Map — Bản Đồ Dòng Chảy Kể Về Giai Đoạn Vượt Khó (Overcoming Adversity Flow)',
        pedagogicalObjective: 'Kích hoạt phản xạ 3 pha khi giám khảo hỏi Part 2: Đối mặt áp lực / biến cố → Tìm kiếm trợ giúp & Hành động kiên trì → Trưởng thành & Bài học kinh nghiệm.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click từng pha để theo dõi mạch kể chuyện tự nhiên khi tường thuật một giai đoạn gian nan:',
          cards: [
            {
              step: 1,
              label: 'PHA 1: BIẾN CỐ & ÁP LỰC BAN ĐẦU (INITIAL ADVERSITY & PRESSURE)',
              cognitiveFunction: '1. Nêu bối cảnh áp lực học tập/công việc hoặc biến cố tâm lý cá nhân',
              content: 'A few years ago, I fell behind in my academic studies due to intense peer pressure and felt completely overwhelmed.',
              bandLevel: 'Band 4.5 → 5.0',
              pedagogyNote: 'Trích từ danh mục ý tưởng mục 2.2: "falling behind in school/work due to peer pressure".',
              flipCard: {
                frontText: 'I had bad study in university and felt stressed. (Band 4.0)',
                backText: 'During my freshman year, I fell behind with my coursework and struggled under immense peer pressure. (Band 5.0)',
                explanation: 'Cụm từ "fell behind with coursework" và "immense peer pressure" mô tả rất chân thực.'
              }
            },
            {
              step: 2,
              label: 'PHA 2: HÀNH ĐỘNG THAY ĐỔI & TÌM SỰ TRỢ GIÚP (SEEKING GUIDANCE & ACTION)',
              cognitiveFunction: '2. Kể về bước ngoặt: tâm sự cùng bạn thân hoặc thầy cô và xây dựng lại kỷ luật bản thân',
              content: 'Instead of suffering in silence, I reached out to my mentor for constructive advice and reorganized my daily study routine.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Collocation mục 2.2: "reach out for guidance / seek advice" và "reorganize my daily routine".',
              flipCard: {
                frontText: 'I asked teacher for help and studied hard again. (Band 4.0)',
                backText: 'Instead of withdrawing, I sought valuable guidance from my instructor and gradually regained my focus. (Band 5.5)',
                explanation: 'Dùng cụm liên kết đối lập "Instead of withdrawing, I sought valuable guidance...".'
              }
            },
            {
              step: 3,
              label: 'PHA 3: BÀI HỌC TRƯỞNG THÀNH & TỰ TIN (RESILIENCE & PERSONAL GROWTH)',
              cognitiveFunction: '3. Khẳng định thử thách giúp rèn luyện lòng kiên trì và tự tin hơn trước khó khăn tương lai',
              content: 'Overcoming that challenging ordeal not only restored my self-confidence but also taught me that resilience is key to achieving long-term goals.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Cấu trúc tương quan kết bài: "not only restored my self-confidence but also taught me that resilience is key".',
              flipCard: {
                frontText: 'Now I am happy and I am not scared of hard work. (Band 4.0)',
                backText: 'Conquering that hardship boosted my resilience and gave me the confidence to pursue ambitious future goals. (Band 5.5)',
                explanation: 'Từ vựng "resilience" (sức bật tinh thần) và "conquering that hardship" ghi điểm vượt trội.'
              }
            }
          ],
          fullMosaicSummary: 'A compelling personal achievement narrative moves from adversity to resolution: experiencing severe peer pressure or setbacks, proactively seeking guidance, and emerging with restored confidence and emotional resilience.'
        }
      },
      {
        stageNumber: 3,
        stageType: 'progressive_reveal',
        title: 'Chặng 3: Lexical Flip Cards — Bộ Ba Collocation Đắt Giá Chủ Đề Vượt Khó (Mục 2.2)',
        pedagogicalObjective: 'Làm chủ 3 cặp thành ngữ - động từ diễn đạt bản lĩnh vượt qua thử thách: Face steep challenges, Persevere through setbacks, và Transform one’s life.',
        interactionModel: {
          type: 'progressive_reveal',
          prompt: 'Click từng thẻ để nâng cấp kho từ vựng kể chuyện cá nhân:',
          cards: [
            {
              step: 1,
              label: 'THẺ 1: ĐỐI MẶT THÁCH THỨC (FACE STEEP CHALLENGES)',
              cognitiveFunction: '1. Diễn đạt việc đối diện với những chướng ngại vật cam go trong cuộc sống',
              content: 'Every young person has to face steep challenges when transitioning from university to the professional workplace.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Tính từ "steep" (/stiːp/ - hiểm trở, cam go) đi với danh từ "challenges".',
              flipCard: {
                frontText: 'I had many big problems. (Từ vựng bình dân)',
                backText: 'I had to face steep challenges and overcome self-doubt during my early career. (Band 5.5)',
                explanation: 'Nâng cấp từ "big problems" sang collocation "face steep challenges and overcome self-doubt".'
              }
            },
            {
              step: 2,
              label: 'THẺ 2: BỀN BỈ VƯỢT QUA VẤP NGÃ (PERSEVERE THROUGH SETBACKS)',
              cognitiveFunction: '2. Miêu tả đức tính kiên định, không bỏ cuộc trước thất bại',
              content: 'If you want to master a foreign language, you must persevere through initial setbacks and keep moving forward.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Động từ "persevere" (/ˌpɜː.sɪˈvɪər/ - kiên trì, bền gan) đi với giới từ "through setbacks".',
              flipCard: {
                frontText: 'I did not give up when I failed. (Band 4.0)',
                backText: 'By persevering through repeated setbacks, I eventually attained the target score I had worked for. (Band 5.5)',
                explanation: 'Thay "did not give up" bằng cụm từ học thuật "persevering through setbacks".'
              }
            },
            {
              step: 3,
              label: 'THẺ 3: THAY ĐỔI VẬN MỆNH CUỘC ĐỜI (TRANSFORM ONE’S LIFE)',
              cognitiveFunction: '3. Diễn đạt sự bứt phá làm thay đổi hoàn toàn cục diện cuộc sống',
              content: 'Having the courage to embrace change and pursue my genuine aspiration completely transformed my life.',
              bandLevel: 'Band 5.0 → 5.5',
              pedagogyNote: 'Collocation: "transform one\'s life" (/trænsˈfɔːm wʌnz laɪf/ - biến đổi hoàn toàn cuộc sống).',
              flipCard: {
                frontText: 'My decision made my life different and better. (Band 4.0)',
                backText: 'Embracing that difficult turning point ultimately transformed my life in ways I never imagined. (Band 5.5)',
                explanation: 'Cụm từ "transformed my life in ways I never imagined" mang âm hưởng tự nhiên của người bản ngữ.'
              }
            }
          ],
          fullMosaicSummary: 'Achieving genuine personal growth means being willing to face steep challenges, persevere through temporary setbacks, and allow hard-won victories to transform your life and outlook.'
        }
      }
    ]
  }
];




















