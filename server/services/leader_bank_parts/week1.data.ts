/**
 * LEADER ARENA QUESTION BANK - WEEK 1
 * Source: Giáo trình LEADER 2027 - Đã soát lỗi.docx & Giáo án Leader 2028 Teacher Guide
 * Target: IELTS Band 6.5 | Training 7.0–7.5
 * 
 * Day 1: Writing (Essay Structure & Core Paragraph Architecture / Claim - Why - Result / 4 Criteria)
 * Day 2: Speaking (Understanding Band Descriptors & Part 1 Fluency Architecture / Acoustic Chunking)
 * Day 3: Reading (This Marvellous Machine / Heading Matching & Distractor Elimination / Port-Royal Grammarians)
 */

export const LEADER_WEEK_1_QUESTIONS: Record<string, any[]> = {
  "WEEK 1 – DAY 1": [
    {
      id: "leader_w1d1_q01",
      roundIndex: 0,
      prompt: "Trong thang điểm IELTS Writing Task 2, tiêu chí Task Response (TR) ở mức Band 7.0 đòi hỏi bài viết phải đáp ứng yếu tố then chốt nào?",
      options: [
        { id: "opt_A", label: "A", text: "Giải quyết đầy đủ tất cả các phần của đề bài, thể hiện rõ lập trường xuyên suốt và phát triển các ý tưởng chính có chiều sâu" },
        { id: "opt_B", label: "B", text: "Chỉ cần viết đủ từ 250 từ trở lên và không mắc lỗi chính tả" },
        { id: "opt_C", label: "C", text: "Sử dụng ít nhất mười cấu trúc đảo ngữ phức tạp" },
        { id: "opt_D", label: "D", text: "Đưa ra thật nhiều ví dụ cá nhân từ cuộc sống riêng của tác giả" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Giải quyết đầy đủ tất cả các phần của đề bài, thể hiện rõ lập trường xuyên suốt và phát triển các ý tưởng chính có chiều sâu",
      correctExplanation: "Theo Band Descriptors chính thức của IELTS: Band 7.0 Task Response yêu cầu 'addresses all parts of the task', 'presents a clear position throughout the response', và 'presents, extends and supports main ideas'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Chỉ cần viết đủ từ 250 từ trở lên và không mắc lỗi chính tả",
        diagnosticTitle: "Nhầm lẫn giữa yêu cầu tối thiểu về số từ và tiêu chuẩn chấm điểm lập luận",
        explanation: "Viết đủ 250 từ chỉ là điều kiện cần để không bị phạt lỗi underlength, không quyết định band điểm Task Response.",
      }
    },
    {
      id: "leader_w1d1_q02",
      roundIndex: 1,
      prompt: "Theo chuỗi phát triển luận điểm chuẩn Leader: Claim -> Why -> Result, chức năng cốt lõi của bước 'Why' là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Giải thích cơ chế vận hành và lý giải nguyên nhân cốt lõi khiến luận điểm đó đúng đắn" },
        { id: "opt_B", label: "B", text: "Liệt kê danh sách các nước trên thế giới áp dụng chính sách đó" },
        { id: "opt_C", label: "C", text: "Đưa ra kết quả cuối cùng mà không cần giải thích" },
        { id: "opt_D", label: "D", text: "Lặp lại câu chủ đề bằng cách đảo trật tự từ" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Giải thích cơ chế vận hành và lý giải nguyên nhân cốt lõi khiến luận điểm đó đúng đắn",
      correctExplanation: "Bước 'Why' (Mechanism) giải thích cơ chế 'How it works' hoặc 'Tại sao điều đó lại diễn ra', ngăn chặn tình trạng lập luận hời hợt nhảy cóc từ luận điểm sang kết quả.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. Lặp lại câu chủ đề bằng cách đảo trật tự từ",
        diagnosticTitle: "Lỗi lập luận vòng tròn (Circular Reasoning)",
        explanation: "Lặp lại Claim bằng từ đồng nghĩa mà không giải thích cơ chế là lỗi lập luận luẩn quẩn rất phổ biến.",
      }
    },
    {
      id: "leader_w1d1_q03",
      roundIndex: 2,
      prompt: "Đoạn văn sau mắc lỗi lập luận nào: 'The internet helps us update the latest news from around the world. For example, we could watch soccer matches of the 2022 World Cup at home without going to Qatar. As a result, people broaden their knowledge.'?",
      options: [
        { id: "opt_A", label: "A", text: "Thiếu phân tích cơ chế Why và ví dụ xem bóng đá không chứng minh được cho việc mở rộng tri thức nhân loại" },
        { id: "opt_B", label: "B", text: "Sai toàn bộ cấu trúc thì hiện tại đơn" },
        { id: "opt_C", label: "C", text: "Thiếu các trạng từ chỉ tần suất" },
        { id: "opt_D", label: "D", text: "Đoạn văn quá dài so với quy định" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Thiếu phân tích cơ chế Why và ví dụ xem bóng đá không chứng minh được cho việc mở rộng tri thức nhân loại",
      correctExplanation: "Ví dụ 'xem bóng đá tại nhà' chỉ chứng minh cho việc tiện lợi theo dõi giải trí thể thao, không tạo thành cầu nối logic chứng minh cho 'broaden knowledge' (mở rộng tri thức học thuật/xã hội).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Thiếu các trạng từ chỉ tần suất",
        diagnosticTitle: "Bắt lỗi hình thức ngữ pháp vụn vặt thay vì nhận diện gãy đổ mạch logic",
        explanation: "Vấn đề chí tử của đoạn văn là gãy đổ logic (illogical leap) giữa ví dụ và kết luận, không phải thiếu trạng từ.",
      }
    },
    {
      id: "leader_w1d1_q04",
      roundIndex: 3,
      prompt: "Với đề bài: 'Some people believe that studying at university is the best route to succeed, while others think it is better to get a job straight after school. Discuss both views and give your opinion.', câu Thesis Statement nào sau đây đạt chuẩn Leader 7.0+?",
      options: [
        { id: "opt_A", label: "A", text: "While early employment provides invaluable practical experience and immediate financial independence, I contend that tertiary education remains superior by cultivating specialized expertise essential for long-term career resilience." },
        { id: "opt_B", label: "B", text: "Some people like universities and others like working, and I will discuss both views in my essay." },
        { id: "opt_C", label: "C", text: "Going to university is 100% better than getting a job because university students are much smarter." },
        { id: "opt_D", label: "D", text: "Both views have good points and bad points so everyone can choose freely." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. While early employment provides invaluable practical experience and immediate financial independence, I contend that tertiary education remains superior by cultivating specialized expertise essential for long-term career resilience.",
      correctExplanation: "Thesis Statement chuẩn Leader: thừa nhận giá trị của vế đối lập ('invaluable practical experience and immediate financial independence') trước khi khẳng định lập trường cốt lõi ('specialized expertise essential for long-term career resilience') với ngôn ngữ súc tích.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Some people like universities and others like working, and I will discuss both views in my essay.",
        diagnosticTitle: "Mở bài nước đôi vô thưởng vô phạt thiếu lập trường (Band 5.0)",
        explanation: "Viết 'I will discuss both views' mà không nêu rõ lập trường người viết vi phạm tiêu chí Task Response 7.0.",
      }
    },
    {
      id: "leader_w1d1_q05",
      roundIndex: 4,
      prompt: "Chọn câu phát triển phần 'Result' (Hệ quả sâu sắc) cho luận điểm: 'Sinh viên tốt nghiệp đại học sở hữu nền tảng tư duy phản biện và khả năng nghiên cứu chuyên sâu.'?",
      options: [
        { id: "opt_A", label: "A", text: "Consequently, these analytical competencies enable professionals to navigate complex industry disruptions and secure sustainable leadership trajectories." },
        { id: "opt_B", label: "B", text: "So they can easily get rich and buy luxury cars in a few months." },
        { id: "opt_C", label: "C", text: "Because of that, employers give them high salary without asking any questions." },
        { id: "opt_D", label: "D", text: "And then, they will be very happy with their lives." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Consequently, these analytical competencies enable professionals to navigate complex industry disruptions and secure sustainable leadership trajectories.",
      correctExplanation: "Từ vựng và tư duy cấp cao: 'analytical competencies' (năng lực phân tích), 'navigate complex industry disruptions' (lèo lái trước các biến động ngành phức tạp), 'sustainable leadership trajectories' (lộ trình lãnh đạo bền vững).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. So they can easily get rich and buy luxury cars in a few months.",
        diagnosticTitle: "Suy diễn thực dụng ngây ngô và dùng từ nối 'So' đầu câu",
        explanation: "Dùng 'So' ở đầu câu và quy kết bằng việc làm giàu nhanh là lối suy nghĩ thiếu tính học thuật.",
      }
    },
    {
      id: "leader_w1d1_q06",
      roundIndex: 5,
      prompt: "Thành phần 'Limitation / Extension' trong chuỗi phát triển đoạn văn nâng cao có vai trò gì?",
      options: [
        { id: "opt_A", label: "A", text: "Xác định ranh giới hoặc ngoại lệ hợp lý của luận điểm, giúp lập luận không bị rơi vào bẫy tuyệt đối hóa phiến diện" },
        { id: "opt_B", label: "B", text: "Phủ nhận toàn bộ những gì vừa viết ở câu trước" },
        { id: "opt_C", label: "C", text: "Tăng số lượng từ vựng để vượt qua mốc 350 từ" },
        { id: "opt_D", label: "D", text: "Xin lỗi người chấm vì luận điểm chưa hoàn hảo" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Xác định ranh giới hoặc ngoại lệ hợp lý của luận điểm, giúp lập luận không bị rơi vào bẫy tuyệt đối hóa phiến diện",
      correctExplanation: "'Limitation/Extension' (ví dụ: 'That being said, this advantage may not apply to specialized vocational trades...') thể hiện tư duy học thuật chín chắn, biết nhìn nhận đa chiều và tránh lỗi ngụy biện tuyệt đối hóa.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Phủ nhận toàn bộ những gì vừa viết ở câu trước",
        diagnosticTitle: "Hiểu nhầm việc giới hạn phạm vi thành sự tự mâu thuẫn",
        explanation: "Limitation là đặt ra biên độ áp dụng hợp lý cho luận điểm, không phải tự phản bác chính mình.",
      }
    },
    {
      id: "leader_w1d1_q07",
      roundIndex: 6,
      prompt: "Chọn Topic Sentence hoàn hảo mở đầu đoạn thân bài về mặt trái của việc mù quáng tuân theo các hủ tục truyền thống:",
      options: [
        { id: "opt_A", label: "A", text: "On the other hand, unquestioning adherence to archaic traditions can stifle social progress and perpetuate systemic discrimination." },
        { id: "opt_B", label: "B", text: "Secondly, traditional customs have many bad things that make people unhappy." },
        { id: "opt_C", label: "C", text: "Tradition is old so we must change it immediately." },
        { id: "opt_D", label: "D", text: "There are some disadvantages of following traditions in human societies." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. On the other hand, unquestioning adherence to archaic traditions can stifle social progress and perpetuate systemic discrimination.",
      correctExplanation: "Từ vựng C1/C2 sắc bén: 'unquestioning adherence' (sự tuân theo mù quáng không chất vấn), 'archaic traditions' (những truyền thống cổ hủ), 'stifle social progress' (kìm hãm tiến bộ xã hội), 'perpetuate systemic discrimination' (duy trì sự phân biệt đối xử có hệ thống).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. There are some disadvantages of following traditions in human societies.",
        diagnosticTitle: "Dùng khuôn mẫu chung chung thiếu sức nặng học thuật",
        explanation: "Phương án D là câu mẫu ở mức Band 5.5, thiếu các thuật ngữ học thuật cụ thể định hướng cho đoạn văn.",
      }
    },
    {
      id: "leader_w1d1_q08",
      roundIndex: 7,
      prompt: "Trong tiêu chí Coherence & Cohesion (CC), điều gì giúp đoạn văn đạt Band 7.0+ thay vì Band 6.0?",
      options: [
        { id: "opt_A", label: "A", text: "Mạch thông tin tiến triển rõ ràng xuyên suốt với sự phát triển logic, sử dụng linh hoạt các phương thức quy chiếu và từ nối tự nhiên mà không gây cảm giác máy móc" },
        { id: "opt_B", label: "B", text: "Chèn tối đa các liên từ phức tạp như Furthermore, Moreover, In addition ở đầu mọi câu" },
        { id: "opt_C", label: "C", text: "Chia bài viết thành mười đoạn văn thật ngắn" },
        { id: "opt_D", label: "D", text: "Không sử dụng bất kỳ đại từ thay thế nào để tránh gây hiểu lầm" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Mạch thông tin tiến triển rõ ràng xuyên suốt với sự phát triển logic, sử dụng linh hoạt các phương thức quy chiếu và từ nối tự nhiên mà không gây cảm giác máy móc",
      correctExplanation: "Tiêu chí Band 7.0 CC: 'logically organises information and ideas; there is clear progression throughout', sử dụng đa dạng các phương thức liên kết (cohesive devices) tự nhiên và chính xác.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Chèn tối đa các liên từ phức tạp như Furthermore, Moreover, In addition ở đầu mọi câu",
        diagnosticTitle: "Lỗi lạm dụng liên từ cơ học (Over-use of mechanical cohesive devices)",
        explanation: "Lạm dụng liên từ ở đầu mọi câu là dấu hiệu đặc trưng của Band 5.5-6.0, bị trừ điểm Cohesion.",
      }
    },
    {
      id: "leader_w1d1_q09",
      roundIndex: 8,
      prompt: "Chọn câu viết nâng cấp học thuật diễn đạt ý: 'Học sinh đi làm sớm có thể tự lập tài chính trước bạn bè đồng trang lứa.'?",
      options: [
        { id: "opt_A", label: "A", text: "Direct entrants into the workforce can attain financial self-sufficiency well ahead of their university-attending peers." },
        { id: "opt_B", label: "B", text: "Early workers have money before their classmates who go to college." },
        { id: "opt_C", label: "C", text: "Getting jobs fast makes teenagers rich sooner than other students." },
        { id: "opt_D", label: "D", text: "Young people working early earn salary very quickly." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Direct entrants into the workforce can attain financial self-sufficiency well ahead of their university-attending peers.",
      correctExplanation: "Chuỗi từ vựng chuyên nghiệp: 'Direct entrants into the workforce' (người tham gia trực tiếp vào lực lượng lao động), 'attain financial self-sufficiency' (đạt được sự tự chủ tài chính), 'well ahead of their university-attending peers' (vượt trước các bạn đồng lứa học đại học).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Early workers have money before their classmates who go to college.",
        diagnosticTitle: "Lối diễn đạt nôm na của tiếng Anh giao tiếp thông thường",
        explanation: "'Have money before classmates' là lối diễn đạt văn nói đời thường, không đạt chuẩn văn phong học thuật.",
      }
    },
    {
      id: "leader_w1d1_q10",
      roundIndex: 9,
      prompt: "Một phần Mở bài (Introduction) đạt chuẩn tối ưu thời gian và tính học thuật trong Task 2 nên bao gồm bao nhiêu câu?",
      options: [
        { id: "opt_A", label: "A", text: "Đúng 2 câu: Câu 1 paraphrase lại bối cảnh đề bài; Câu 2 đưa ra Thesis Statement định hướng quan điểm trực diện" },
        { id: "opt_B", label: "B", text: "Khoảng 5 đến 6 câu giải thích cặn kẽ mọi ví dụ lịch sử" },
        { id: "opt_C", label: "C", text: "Chỉ đúng 1 cụm từ ngắn gọn" },
        { id: "opt_D", label: "D", text: "Càng dài càng tốt để gây ấn tượng với giám khảo" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Đúng 2 câu: Câu 1 paraphrase lại bối cảnh đề bài; Câu 2 đưa ra Thesis Statement định hướng quan điểm trực diện",
      correctExplanation: "Công thức mở bài 2 câu kinh điển của Leader: Sentence 1 Paraphrase prompt + Sentence 2 Clear Thesis Statement. Viết trong 3-4 phút để dành tối đa 30-32 phút cho hai đoạn thân bài.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Khoảng 5 đến 6 câu giải thích cặn kẽ mọi ví dụ lịch sử",
        diagnosticTitle: "Viết mở bài lan man dài dòng làm cháy giờ viết thân bài",
        explanation: "Mở bài dài 5-6 câu khiến thí sinh mất 10-12 phút, dẫn đến việc không kịp thời gian phát triển thân bài.",
      }
    }
  ],

  "WEEK 1 – DAY 2": [
    {
      id: "leader_w1d2_q01",
      roundIndex: 0,
      prompt: "Trong tiêu chuẩn chấm điểm IELTS Speaking, kỹ thuật 'Acoustic Chunking' (Ngắt cụm âm học theo ngữ nghĩa) mang lại lợi ích gì cho điểm Pronunciation và Fluency?",
      options: [
        { id: "opt_A", label: "A", text: "Giúp người nói ngắt nghỉ tự nhiên theo các cụm ý nghĩa ngữ pháp, tạo nhịp điệu sinh động và ngăn ngừa tình trạng ngập ngừng giữa câu" },
        { id: "opt_B", label: "B", text: "Buộc thí sinh phải nói từng từ một thật chậm rãi và dừng 2 giây sau mỗi từ" },
        { id: "opt_C", label: "C", text: "Tạo ra âm thanh giống tiếng gõ bàn phím máy tính" },
        { id: "opt_D", label: "D", text: "Giúp thí sinh không cần phát âm các âm cuối" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Giúp người nói ngắt nghỉ tự nhiên theo các cụm ý nghĩa ngữ pháp, tạo nhịp điệu sinh động và ngăn ngừa tình trạng ngập ngừng giữa câu",
      correctExplanation: "'Acoustic Chunking' (phân cụm ngữ nghĩa khi phát âm): gom các từ bổ nghĩa đi liền với nhau thành một đơn vị âm học (Sense group) giúp bài nói trôi chảy, có ngữ điệu tự nhiên và chuẩn xác ở Band 7.0+.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Buộc thí sinh phải nói từng từ một thật chậm rãi và dừng 2 giây sau mỗi từ",
        diagnosticTitle: "Hiểu sai việc ngắt cụm thành việc đọc từng từ rời rạc",
        explanation: "Đọc từng từ rời rạc là lỗi Robot speech (phát âm giật cục), phá hủy hoàn toàn tiêu chí Fluency.",
      }
    },
    {
      id: "leader_w1d2_q02",
      roundIndex: 1,
      prompt: "Khi giám khảo hỏi Part 1: 'Do you work or are you a student?', câu trả lời nào sau đây thể hiện cấu trúc mở rộng đạt chuẩn Fluency Architecture của Leader?",
      options: [
        { id: "opt_A", label: "A", text: "Currently, I am a senior majoring in software engineering at university. Much of my coursework revolves around cloud infrastructure, which I find intellectually stimulating despite the demanding project deadlines." },
        { id: "opt_B", label: "B", text: "I am a student. I study engineering. It is hard." },
        { id: "opt_C", label: "C", text: "Well, studying is very important for all people in contemporary society." },
        { id: "opt_D", label: "D", text: "Neither, I do not like to work or study." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Currently, I am a senior majoring in software engineering at university. Much of my coursework revolves around cloud infrastructure, which I find intellectually stimulating despite the demanding project deadlines.",
      correctExplanation: "Khung trả lời chuẩn: Direct Answer ('senior majoring in software engineering') + Mechanism/Detail ('revolves around cloud infrastructure') + Evaluative Insight ('intellectually stimulating despite demanding deadlines').",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Well, studying is very important for all people in contemporary society.",
        diagnosticTitle: "Nói triết lý sáo rỗng né tránh câu hỏi trực tiếp",
        explanation: "Thí sinh mở đầu bằng câu triết lý chung chung mà không trả lời thẳng tình trạng học tập của bản thân.",
      }
    },
    {
      id: "leader_w1d2_q03",
      roundIndex: 2,
      prompt: "Trong tiêu chí Lexical Resource của Speaking Band 7.0, việc sử dụng Collocations được đánh giá cao khi nào?",
      options: [
        { id: "opt_A", label: "A", text: "Khi các cụm từ kết hợp tự nhiên, chuẩn xác ngữ cảnh và mang tính thành ngữ linh hoạt mà không bị gượng ép" },
        { id: "opt_B", label: "B", text: "Khi thí sinh chèn thật nhiều thành ngữ cổ xưa mà người bản xứ hiện đại không còn dùng" },
        { id: "opt_C", label: "C", text: "Khi mọi từ ngữ đều được tra cứu từ từ điển tiếng Anh thế kỷ 18" },
        { id: "opt_D", label: "D", text: "Khi thí sinh dịch nguyên văn các câu tục ngữ tiếng Việt sang tiếng Anh từng chữ một" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Khi các cụm từ kết hợp tự nhiên, chuẩn xác ngữ cảnh và mang tính thành ngữ linh hoạt mà không bị gượng ép",
      correctExplanation: "Band 7.0 yêu cầu 'uses some less common and idiomatic vocabulary and shows some awareness of style and collocation, with some inappropriate choices'. Tính tự nhiên và chuẩn ngữ cảnh là ưu tiên số một.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Khi thí sinh chèn thật nhiều thành ngữ cổ xưa mà người bản xứ hiện đại không còn dùng",
        diagnosticTitle: "Lạm dụng thành ngữ lỗi thời lạc điệu (Clunky archaic idioms)",
        explanation: "Nhồi nhét các thành ngữ sáo rỗng như 'raining cats and dogs' tạo cảm giác học vẹt và bị trừ điểm phong cách.",
      }
    },
    {
      id: "leader_w1d2_q04",
      roundIndex: 3,
      prompt: "Chọn câu trả lời Part 1 cho chủ đề 'Morning routine' thể hiện khả năng sử dụng trạng từ chỉ tần suất tự nhiên nhất:",
      options: [
        { id: "opt_A", label: "A", text: "More often than not, I kick off my day with a brisk morning jog, which serves as a cognitive reset before diving into work." },
        { id: "opt_B", label: "B", text: "Always I run in the morning because running is very healthy." },
        { id: "opt_C", label: "C", text: "Every morning of my life I must do jogging." },
        { id: "opt_D", label: "D", text: "I run morning time with high speed." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. More often than not, I kick off my day with a brisk morning jog, which serves as a cognitive reset before diving into work.",
      correctExplanation: "'More often than not' (thường là vậy), 'kick off my day' (bắt đầu ngày mới), 'brisk morning jog' (chạy bộ nhanh buổi sáng) và 'cognitive reset' (thiết lập lại trạng thái tinh thần) là các cụm từ đạt chuẩn Band 7.5.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Always I run in the morning because running is very healthy.",
        diagnosticTitle: "Đặt sai vị trí trạng từ chỉ tần suất 'always' ở đầu câu",
        explanation: "Trạng từ chỉ tần suất thường đứng giữa chủ ngữ và động từ chính ('I always run'), đặt 'Always I run' là lỗi ngữ pháp.",
      }
    },
    {
      id: "leader_w1d2_q05",
      roundIndex: 4,
      prompt: "Khi gặp một câu hỏi Part 1 bất ngờ mà thí sinh chưa chuẩn bị trước, chiến lược xử lý ngôn ngữ nào là chuyên nghiệp nhất?",
      options: [
        { id: "opt_A", label: "A", text: "Sử dụng một cụm diễn đạt tự nhiên để kéo dài thời gian tư duy: 'To be completely honest, that is not something I have reflected on before, but off the top of my head...'" },
        { id: "opt_B", label: "B", text: "Ngồi im lặng 10 giây rồi nói 'I don't understand'" },
        { id: "opt_C", label: "C", text: "Lặp lại to câu hỏi của giám khảo ba lần" },
        { id: "opt_D", label: "D", text: "Đổi sang nói một chủ đề khác mà mình đã học thuộc lòng" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Sử dụng một cụm diễn đạt tự nhiên để kéo dài thời gian tư duy: 'To be completely honest, that is not something I have reflected on before, but off the top of my head...'",
      correctExplanation: "Kỹ năng 'Conversational Stalling': Sử dụng các cấu trúc ngôn ngữ tự nhiên như 'To be completely honest, that is not something I have reflected on before, but off the top of my head...' vừa duy trì điểm Fluency vừa thể hiện phản xạ giao tiếp bản ngữ.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Lặp lại to câu hỏi của giám khảo ba lần",
        diagnosticTitle: "Lặp lại câu hỏi (Parroting examiner's question)",
        explanation: "Lặp lại câu hỏi của giám khảo bị coi là thiếu vốn từ và giảm điểm trôi chảy.",
      }
    },
    {
      id: "leader_w1d2_q06",
      roundIndex: 5,
      prompt: "Từ 'intricacies' trong câu: 'I am fascinated by the intricacies of financial markets' có nghĩa là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Những chi tiết tinh vi và phức tạp tạo nên cấu trúc tổng thể" },
        { id: "opt_B", label: "B", text: "Những rắc rối nguy hiểm làm phá sản nhà đầu tư" },
        { id: "opt_C", label: "C", text: "Những khoản tiền lãi khổng lồ hàng tháng" },
        { id: "opt_D", label: "D", text: "Các ngân hàng thương mại nhà nước" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Những chi tiết tinh vi và phức tạp tạo nên cấu trúc tổng thể",
      correctExplanation: "'Intricacies' (những nét tinh vi, ngóc ngách phức tạp) là danh từ trừu tượng Band 7.5 rất hay dùng khi nói về niềm đam mê khoa học hoặc ngành nghề chuyên sâu.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Những rắc rối nguy hiểm làm phá sản nhà đầu tư",
        diagnosticTitle: "Hiểu nhầm 'intricacy' thành rắc rối tiêu cực",
        explanation: "'Intricacies' nhấn mạnh vào sự tinh xảo, phức tạp hấp dẫn của một hệ thống, không phải hiểm họa tiêu cực.",
      }
    },
    {
      id: "leader_w1d2_q07",
      roundIndex: 6,
      prompt: "Trong tiêu chí Pronunciation, việc phát âm đúng trọng âm câu (Sentence Stress) đóng vai trò gì?",
      options: [
        { id: "opt_A", label: "A", text: "Nhấn mạnh vào các từ mang nội dung chính như danh từ, động từ, tính từ và lướt nhẹ các từ chức năng để tạo ngữ điệu tự nhiên" },
        { id: "opt_B", label: "B", text: "Nhấn thật mạnh vào từng từ một không bỏ sót bất kỳ từ nào" },
        { id: "opt_C", label: "C", text: "Chỉ phát âm to các từ ở cuối câu" },
        { id: "opt_D", label: "D", text: "Hạ giọng đều đều như đọc một bản tin thời tiết" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Nhấn mạnh vào các từ mang nội dung chính như danh từ, động từ, tính từ và lướt nhẹ các từ chức năng để tạo ngữ điệu tự nhiên",
      correctExplanation: "Tiếng Anh là ngôn ngữ có nhịp điệu trọng âm (Stress-timed language). Việc làm nổi bật Content words và giảm âm (reduction) các Function words là chìa khóa đạt Band 7.0+ Pronunciation.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Nhấn thật mạnh vào từng từ một không bỏ sót bất kỳ từ nào",
        diagnosticTitle: "Phát âm đều chằn chặn theo lối Syllable-timed",
        explanation: "Nhấn đều mọi từ biến câu nói thành giọng đều đều đơn điệu (monotonous), khiến người nghe mệt mỏi.",
      }
    },
    {
      id: "leader_w1d2_q08",
      roundIndex: 7,
      prompt: "Chọn câu trả lời thể hiện cách dùng mệnh đề phân từ rút gọn (Participle Clause) để nâng điểm Grammatical Range trong Speaking:",
      options: [
        { id: "opt_A", label: "A", text: "Having lived in Da Nang for over a decade, I have witnessed firsthand its incredible transformation into an international tourist hub." },
        { id: "opt_B", label: "B", text: "I lived in Da Nang ten years, and then I saw Da Nang become big city." },
        { id: "opt_C", label: "C", text: "Because I am living in Da Nang, so Da Nang is very beautiful city." },
        { id: "opt_D", label: "D", text: "After live in Da Nang ten years, tourism is growing up." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Having lived in Da Nang for over a decade, I have witnessed firsthand its incredible transformation into an international tourist hub.",
      correctExplanation: "Cấu trúc hoàn thành phân từ 'Having lived in Da Nang for over a decade, I have witnessed...' thể hiện trình độ ngữ pháp biến hóa đỉnh cao của Band 7.5.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. After live in Da Nang ten years, tourism is growing up.",
        diagnosticTitle: "Lỗi phân tử lơ lửng sai chủ ngữ (Dangling participle)",
        explanation: "Chủ ngữ của vế sau là 'tourism', khiến câu có nghĩa vô lý là 'ngành du lịch đã sống ở Đà Nẵng 10 năm'.",
      }
    },
    {
      id: "leader_w1d2_q09",
      roundIndex: 8,
      prompt: "Độ dài câu trả lời lý tưởng cho mỗi câu hỏi trong phần thi Speaking Part 1 là bao nhiêu?",
      options: [
        { id: "opt_A", label: "A", text: "Khoảng 2 đến 3 câu phát triển hoàn chỉnh trong vòng 15-20 giây" },
        { id: "opt_B", label: "B", text: "Chỉ đúng một từ duy nhất: Yes hoặc No" },
        { id: "opt_C", label: "C", text: "Nói liên tục 2 phút như một bài diễn văn Part 2" },
        { id: "opt_D", label: "D", text: "Tùy hứng, thích nói dài bao lâu cũng được" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Khoảng 2 đến 3 câu phát triển hoàn chỉnh trong vòng 15-20 giây",
      correctExplanation: "Kỷ luật Part 1 của Leader: Trả lời ngắn gọn, trực diện, gồm 2-3 câu (Direct Answer + Development + Example/Impact), duy trì nhịp độ đối thoại linh hoạt với giám khảo.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Nói liên tục 2 phút như một bài diễn văn Part 2",
        diagnosticTitle: "Nói quá dài dòng làm giám khảo phải cắt lời liên tục",
        explanation: "Part 1 là phần khởi động, nói dài dòng lê thê sẽ làm mất thời gian và bị giám khảo ngắt lời.",
      }
    },
    {
      id: "leader_w1d2_q10",
      roundIndex: 9,
      prompt: "Collocation 'a sedentary lifestyle' thường được dùng trong Speaking để mô tả lối sống nào?",
      options: [
        { id: "opt_A", label: "A", text: "Lối sống ít vận động, ngồi nhiều trước màn hình máy tính" },
        { id: "opt_B", label: "B", text: "Lối sống thường xuyên đi du lịch thám hiểm vòng quanh thế giới" },
        { id: "opt_C", label: "C", text: "Lối sống tiết kiệm không tiêu tiền phung phí" },
        { id: "opt_D", label: "D", text: "Lối sống thức khuya dậy sớm làm nông nghiệp" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Lối sống ít vận động, ngồi nhiều trước màn hình máy tính",
      correctExplanation: "'Sedentary lifestyle' (lối sống thụ động, ngồi lì một chỗ) là collocation học thuật đắt giá trong các chủ đề sức khỏe, thói quen và công việc văn phòng.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Lối sống tiết kiệm không tiêu tiền phung phí",
        diagnosticTitle: "Nhầm 'sedentary' với 'frugal/thrifty'",
        explanation: "'Sedentary' liên quan đến tư thế ngồi (sedere trong tiếng Latin), không liên quan đến chi tiêu tài chính.",
      }
    }
  ],

  "WEEK 1 – DAY 3": [
    {
      id: "leader_w1d3_q01",
      roundIndex: 0,
      prompt: "Trong bài đọc 'This Marvellous Machine', các nhà ngữ pháp trường phái Port-Royal (Port-Royal grammarians) đã ca ngợi khả năng kỳ diệu nào của ngôn ngữ loài người?",
      options: [
        { id: "opt_A", label: "A", text: "Khả năng kết hợp một số lượng hữu hạn các âm thanh vô nghĩa để biểu đạt vô số các tư tưởng, cảm xúc và khái niệm trừu tượng sâu sắc nhất" },
        { id: "opt_B", label: "B", text: "Khả năng chế tạo ra những chiếc máy in cơ học chạy bằng hơi nước đầu tiên" },
        { id: "opt_C", label: "C", text: "Khả năng dịch tự động giữa tiếng Pháp và tiếng Latin" },
        { id: "opt_D", label: "D", text: "Việc phát minh ra bảng chữ cái hình nêm của người Sumer" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Khả năng kết hợp một số lượng hữu hạn các âm thanh vô nghĩa để biểu đạt vô số các tư tưởng, cảm xúc và khái niệm trừu tượng sâu sắc nhất",
      correctExplanation: "Đoạn B trích lời các nhà ngữ pháp Port-Royal thế kỷ 17: 'this marvellous invention of composing out of twenty-five or thirty sounds that infinite variety of expressions...'. Đó là phép màu tạo ra vô tận từ cái hữu hạn.",
      timeLimitSeconds: 25,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Khả năng chế tạo ra những chiếc máy in cơ học chạy bằng hơi nước đầu tiên",
        diagnosticTitle: "Hiểu theo nghĩa đen chữ 'Marvellous Machine' thành cỗ máy cơ khí",
        explanation: "'Cỗ máy tuyệt diệu' ở đây là một ẩn dụ ngôn ngữ học (metaphor) cho hệ thống ngôn ngữ, không phải máy in vật lý.",
      }
    },
    {
      id: "leader_w1d3_q02",
      roundIndex: 1,
      prompt: "Tại sao tác giả lại khẳng định ngôn ngữ là 'a victim of its own success' (nạn nhân của chính sự thành công của nó)?",
      options: [
        { id: "opt_A", label: "A", text: "Vì việc sử dụng ngôn ngữ diễn ra quá trơn tru và dễ dàng trong đời sống hàng ngày khiến con người xem đó là điều hiển nhiên mà quên mất sự tinh vi kỳ vĩ của nó" },
        { id: "opt_B", label: "B", text: "Vì có quá nhiều người trên thế giới không biết đọc và viết" },
        { id: "opt_C", label: "C", text: "Vì ngôn ngữ đang dần bị thay thế hoàn toàn bởi các biểu tượng cảm xúc emoji" },
        { id: "opt_D", label: "D", text: "Vì các cuốn từ điển ngày càng trở nên quá dày và đắt đỏ" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Vì việc sử dụng ngôn ngữ diễn ra quá trơn tru và dễ dàng trong đời sống hàng ngày khiến con người xem đó là điều hiển nhiên mà quên mất sự tinh vi kỳ vĩ của nó",
      correctExplanation: "Đoạn D phân tích sâu sắc: 'Yet it is precisely this deceptive ease which makes language a victim of its own success, since in everyday life its triumphs are usually taken for granted'.",
      timeLimitSeconds: 25,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Vì ngôn ngữ đang dần bị thay thế hoàn toàn bởi các biểu tượng cảm xúc emoji",
        diagnosticTitle: "Suy diễn ngoài bài đọc dựa trên xu hướng mạng xã hội hiện đại",
        explanation: "Bài đọc học thuật Cambridge không hề đề cập đến emoji; đây là lỗi suy diễn bên ngoài văn bản.",
      }
    },
    {
      id: "leader_w1d3_q03",
      roundIndex: 2,
      prompt: "Từ tiếng Thổ Nhĩ Kỳ cực dài 'çehirliliçtiremediklerimizdensiniz' được tác giả đưa ra trong đoạn E nhằm minh họa cho hiện tượng ngôn ngữ nào?",
      options: [
        { id: "opt_A", label: "A", text: "Khả năng của một số ngôn ngữ trong việc xây dựng những từ đơn có độ dài ngoạn mục nén trọn vẹn ý nghĩa của cả một câu hoàn chỉnh trong tiếng Anh" },
        { id: "opt_B", label: "B", text: "Sự khó phát âm của các ngôn ngữ phương Đông" },
        { id: "opt_C", label: "C", text: "Lỗi in ấn trong các tài liệu ngữ pháp cổ" },
        { id: "opt_D", label: "D", text: "Sự suy tàn của các thành phố hiện đại" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Khả năng của một số ngôn ngữ trong việc xây dựng những từ đơn có độ dài ngoạn mục nén trọn vẹn ý nghĩa của cả một câu hoàn chỉnh trong tiếng Anh",
      correctExplanation: "Đoạn E giải thích: từ này mang nghĩa 'you are one of those whom we can't turn into a town-dweller'. Đây là hiện tượng 'build up words of breath-breaking length, and thus express in one word what English takes a whole sentence to say'.",
      timeLimitSeconds: 25,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Sự khó phát âm của các ngôn ngữ phương Đông",
        diagnosticTitle: "Tập trung vào cảm nhận phát âm cá nhân thay vì cấu trúc hình thái học",
        explanation: "Mục đích của tác giả là mô tả cấu trúc hình thái từ ghép chắp dính (agglutinative morphology), không phải để chê phát âm.",
      }
    },
    {
      id: "leader_w1d3_q04",
      roundIndex: 3,
      prompt: "Điểm đặc biệt gây ấn tượng nhất trong cấu trúc từ tiếng Sumer 'munintuma'a' ở đoạn F là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Sự súc tích cô đọng tối đa, trong đó ngay cả một khoảng trống im lặng (non-sound) cũng được gán cho một chức năng ngữ nghĩa cụ thể" },
        { id: "opt_B", label: "B", text: "Được viết bằng mực vàng trên da cừu" },
        { id: "opt_C", label: "C", text: "Chứa nhiều chữ cái viết hoa nhất trong lịch sử" },
        { id: "opt_D", label: "D", text: "Chỉ được phát âm bởi các vị vua chúa Sumer cổ đại" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Sự súc tích cô đọng tối đa, trong đó ngay cả một khoảng trống im lặng (non-sound) cũng được gán cho một chức năng ngữ nghĩa cụ thể",
      correctExplanation: "Đoạn F nhấn mạnh: 'the technology is so fine-tuned then that even a non-sound, when carefully placed in a particular position, has been invested with a specific function'. Đại từ 'it' tương ứng với một khoảng trống rỗng (empty slot / nothing) ở giữa từ.",
      timeLimitSeconds: 25,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Được viết bằng mực vàng trên da cừu",
        diagnosticTitle: "Bị phân tâm bởi các tưởng tượng cổ tích lịch sử",
        explanation: "Bài đọc phân tích cơ chế âm vị học và cú pháp học, không nói đến mực vàng hay da cừu.",
      }
    },
    {
      id: "leader_w1d3_q05",
      roundIndex: 4,
      prompt: "Nhận định sau là YES, NO hay NOT GIVEN theo quan điểm của tác giả: 'Human beings might have achieved their present position without language.'?",
      options: [
        { id: "opt_A", label: "A", text: "NO" },
        { id: "opt_B", label: "B", text: "YES" },
        { id: "opt_C", label: "C", text: "NOT GIVEN" },
        { id: "opt_D", label: "D", text: "INAPPLICABLE" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. NO",
      correctExplanation: "Đoạn A khẳng định ngôn ngữ là phát minh nền tảng tối thượng: không có ngôn ngữ thì mọi thành tựu khác của văn minh loài người (kể cả bánh xe hay nông nghiệp) đều không thể hình thành hoặc truyền thừa. Nhận định 'con người có thể đạt vị thế hiện tại mà không cần ngôn ngữ' mâu thuẫn trực tiếp với tác giả -> NO.",
      timeLimitSeconds: 25,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. NOT GIVEN",
        diagnosticTitle: "Không liên kết được luận điểm mở đầu ở đoạn A với câu hỏi suy luận",
        explanation: "Tác giả nêu rõ ngôn ngữ là điều kiện tiên quyết cho sự thống trị của loài người, mâu thuẫn hoàn toàn với câu nhận định.",
      }
    },
    {
      id: "leader_w1d3_q06",
      roundIndex: 5,
      prompt: "Tiêu đề (Heading) phù hợp nhất cho Paragraph D (phân tích khả năng sử dụng ngôn ngữ kỳ diệu của bất kỳ ai, từ người hái lượm đến triết gia) là:",
      options: [
        { id: "opt_A", label: "A", text: "The universal ability to use language" },
        { id: "opt_B", label: "B", text: "Why the sounds used in different languages are not identical" },
        { id: "opt_C", label: "C", text: "Even silence can be meaningful" },
        { id: "opt_D", label: "D", text: "Differences between languages highlight their impressiveness" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. The universal ability to use language",
      correctExplanation: "Đoạn D mở đầu: 'The most extraordinary thing about language... is that one doesn’t have to be a genius to set its wheels in motion. The language machine allows just about everybody...'. Heading chuẩn xác là 'The universal ability to use language' (Khả năng phổ quát trong việc sử dụng ngôn ngữ của nhân loại).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Even silence can be meaningful",
        diagnosticTitle: "Nhầm sang Heading của đoạn F về tiếng Sumer",
        explanation: "Sự im lặng mang ý nghĩa (Even silence can be meaningful) là tiêu đề của đoạn F, không phải đoạn D.",
      }
    },
    {
      id: "leader_w1d3_q07",
      roundIndex: 6,
      prompt: "Từ 'interminable' trong cụm: 'sighing the interminable boredom of existence' đồng nghĩa với từ nào?",
      options: [
        { id: "opt_A", label: "A", text: "endless kéo dài dường như bất tận" },
        { id: "opt_B", label: "B", text: "brief ngắn ngủi thoáng qua" },
        { id: "opt_C", label: "C", text: "entertaining thú vị giải trí" },
        { id: "opt_D", label: "D", text: "temporary chỉ mang tính tạm thời" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. endless kéo dài dường như bất tận",
      correctExplanation: "'Interminable' (tiền tố in- phủ định kết hợp terminate - kết thúc) mang nghĩa kéo dài liên miên tưởng chừng không bao giờ dứt, đồng nghĩa hoàn hảo với 'endless' hoặc 'ceaseless'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. brief ngắn ngủi thoáng qua",
        diagnosticTitle: "Hiểu ngược nghĩa của từ bất tận",
        explanation: "'Brief' (ngắn ngủi) là từ trái nghĩa đối lập của 'interminable'.",
      }
    },
    {
      id: "leader_w1d3_q08",
      roundIndex: 7,
      prompt: "Chọn từ trong danh sách A-G để hoàn thành câu tóm tắt: 'The wheel is one invention that has had a major impact on [7] aspects of life, but no impact has been as [8] as that of language.'?",
      options: [
        { id: "opt_A", label: "A", text: "material and fundamental" },
        { id: "opt_B", label: "B", text: "difficult and complex" },
        { id: "opt_C", label: "C", text: "original and admired" },
        { id: "opt_D", label: "D", text: "easy and complex" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. material and fundamental",
      correctExplanation: "Văn bản đối chiếu tác động của bánh xe lên 'material aspects' (khía cạnh vật chất thực dụng) với tác động mang tính 'fundamental' (nền tảng căn cốt của ý thức và xã hội) của ngôn ngữ.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. difficult and complex",
        diagnosticTitle: "Chọn cặp từ không phản ánh bản chất đối chiếu vật chất và nền tảng",
        explanation: "'Difficult and complex' không phù hợp với ngữ cảnh so sánh tác động văn minh của hai phát minh.",
      }
    },
    {
      id: "leader_w1d3_q09",
      roundIndex: 8,
      prompt: "Thành ngữ 'Language conceals art' ở cuối đoạn D mang ý nghĩa triết học sâu xa gì?",
      options: [
        { id: "opt_A", label: "A", text: "Đỉnh cao tinh xảo của ngôn ngữ nằm ở chỗ nó vận hành tự nhiên và dễ dàng đến mức che giấu hoàn toàn sự phức tạp kỳ vĩ của cỗ máy bên trong" },
        { id: "opt_B", label: "B", text: "Ngôn ngữ ngăn cấm con người vẽ tranh và làm nghệ thuật" },
        { id: "opt_C", label: "C", text: "Các họa sĩ không bao giờ sử dụng lời nói khi vẽ tranh" },
        { id: "opt_D", label: "D", text: "Nghệ thuật luôn vượt trội hơn ngôn ngữ trong mọi tình huống" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Đỉnh cao tinh xảo của ngôn ngữ nằm ở chỗ nó vận hành tự nhiên và dễ dàng đến mức che giấu hoàn toàn sự phức tạp kỳ vĩ của cỗ máy bên trong",
      correctExplanation: "'Artis est celare artem' (Nghệ thuật chân chính là giấu đi chính sự gắng gượng của nghệ thuật): Sự trơn tru hoàn mỹ của ngôn ngữ khiến chúng ta tưởng nó đơn giản, nhưng thực chất là kỳ quan kỹ thuật siêu đẳng.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Ngôn ngữ ngăn cấm con người vẽ tranh và làm nghệ thuật",
        diagnosticTitle: "Dịch từ 'art' theo nghĩa hẹp là môn mỹ thuật hội họa",
        explanation: "'Art' ở đây có nghĩa cổ là nghệ thuật chế tác tinh xảo (craftsmanship/artistry), không phải môn vẽ tranh.",
      }
    },
    {
      id: "leader_w1d3_q10",
      roundIndex: 9,
      prompt: "Người Sumer sống ven bờ sông Euphrates cách đây 5.000 năm giữ vai trò lịch sử vĩ đại nào được đề cập trong bài?",
      options: [
        { id: "opt_A", label: "A", text: "Họ là những người đầu tiên phát minh ra chữ viết, từ đó đặt nền móng cho việc ghi chép lại toàn bộ tiến trình lịch sử nhân loại" },
        { id: "opt_B", label: "B", text: "Họ là những người đầu tiên chế tạo ra tên lửa vũ trụ" },
        { id: "opt_C", label: "C", text: "Họ là những người đầu tiên vẽ bản đồ thế giới bằng máy bay" },
        { id: "opt_D", label: "D", text: "Họ phát minh ra máy tính điện tử đầu tiên" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Họ là những người đầu tiên phát minh ra chữ viết, từ đó đặt nền móng cho việc ghi chép lại toàn bộ tiến trình lịch sử nhân loại",
      correctExplanation: "Đoạn F khẳng định rõ ràng: 'Sumerian, the language spoken on the banks of the Euphrates some 5,000 years ago by the people who invented writing and thus enabled the documentation of history'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. Họ phát minh ra máy tính điện tử đầu tiên",
        diagnosticTitle: "Gán ghép công nghệ hiện đại vào nền văn minh Lưỡng Hà cổ đại",
        explanation: "Người Sumer phát minh ra chữ viết cuneiform 5000 năm trước, không phải máy tính điện tử.",
      }
    }
  ]
};
