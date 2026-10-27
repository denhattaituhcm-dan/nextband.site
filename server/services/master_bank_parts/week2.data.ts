/**
 * MASTER ARENA QUESTION BANK - WEEK 2
 * Source: Giáo trình MASTER 2027 - Đã soát lỗi.docx & Giáo án Master 2027 (Teacher Guide)
 * Target: IELTS Band 6.0 | Performance 6.0–6.5
 * 
 * Day 1: Writing (Essay Structure / 4-Paragraph Model / Topic Sentences / Cause & Effect: lead to, result in, result from / Supporting Ideas)
 * Day 2: Reading (Multi-tasking Reading / Answer 2-3 questions simultaneously / Animals in Captivity / Multiple Choice & Matching)
 * Day 3: Speaking (Chunking & Thought Groups / Rhythm & Intonation / Sharing Ups & Downs / Personality & Hobbies)
 */

export const MASTER_WEEK_2_QUESTIONS: Record<string, any[]> = {
  "WEEK 2 – DAY 1": [
    {
      id: "master_w2d1_q01",
      roundIndex: 0,
      prompt: "Cấu trúc bố cục chuẩn hóa cho một bài luận IELTS Writing Task 2 đạt chuẩn Band 6.0-6.5 gồm bao nhiêu đoạn văn?",
      options: [
        { id: "opt_A", label: "A", text: "4 đoạn chuẩn mực gồm 1 Mở bài, 2 Thân bài cân đối và 1 Kết bài" },
        { id: "opt_B", label: "B", text: "3 đoạn gồm 1 Mở bài, 1 Thân bài rất dài và 1 Kết bài" },
        { id: "opt_C", label: "C", text: "6 đoạn ngắn mỗi đoạn chỉ gồm 1 đến 2 câu" },
        { id: "opt_D", label: "D", text: "Viết thành 1 khối văn bản liên tục không xuống dòng" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. 4 đoạn chuẩn mực gồm 1 Mở bài, 2 Thân bài cân đối và 1 Kết bài",
      correctExplanation: "Bố cục 4 đoạn kinh điển (Introduction, Body 1, Body 2, Conclusion) là cấu trúc tối ưu nhất giúp thí sinh phân bổ đều thời gian, mỗi đoạn thân bài phát triển sâu 1 góc nhìn mà không bị lan man.",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. 6 đoạn ngắn mỗi đoạn chỉ gồm 1 đến 2 câu",
        diagnosticTitle: "Lỗi chia đoạn vụn vặt (Fragmented paragraphing)",
        explanation: "Thí sinh quen kiểu viết báo chí hay tách câu thành nhiều đoạn nhỏ, vi phạm tiêu chí Coherence & Cohesion của bài luận học thuật IELTS."
      }
    },
    {
      id: "master_w2d1_q02",
      roundIndex: 1,
      prompt: "Phân biệt sự khác nhau giữa 'result in' và 'result from' trong câu văn học thuật:",
      options: [
        { id: "opt_A", label: "A", text: "'Result in' mang nghĩa dẫn đến kết quả; 'Result from' mang nghĩa bắt nguồn từ nguyên nhân" },
        { id: "opt_B", label: "B", text: "Cả 2 cụm từ đều mang nghĩa nguyên nhân sinh ra kết quả giống nhau" },
        { id: "opt_C", label: "C", text: "'Result in' chỉ dùng cho người, còn 'Result from' chỉ dùng cho sự vật" },
        { id: "opt_D", label: "D", text: "'Result in' là tính từ, còn 'Result from' là trạng từ" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. 'Result in' mang nghĩa dẫn đến kết quả; 'Result from' mang nghĩa bắt nguồn từ nguyên nhân",
      correctExplanation: "Nguyên tắc cốt lõi: [Nguyên nhân] + RESULT IN + [Hệ quả] (Higher taxes result in reduced consumption). Ngược lại: [Hệ quả] + RESULT FROM + [Nguyên nhân] (Financial difficulties result from irresponsible spending).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Cả 2 cụm từ đều mang nghĩa nguyên nhân sinh ra kết quả giống nhau",
        diagnosticTitle: "Lẫn lộn chiều mũi tên Nhân - Quả",
        explanation: "Học sinh thường thấy chữ 'result' là dịch 'kết quả' mà không chú ý giới từ 'in' (hướng vào kết quả) hay 'from' (xuất phát từ nguyên nhân)."
      }
    },
    {
      id: "master_w2d1_q03",
      roundIndex: 2,
      prompt: "Chọn câu diễn đạt chuẩn xác: 'Thói quen ăn thức ăn nhanh thường xuyên dẫn đến việc người ta bị béo phì.'?",
      options: [
        { id: "opt_A", label: "A", text: "Consuming fast food frequently leads to obesity among urban residents." },
        { id: "opt_B", label: "B", text: "Eating fast food frequently results from people become obesity." },
        { id: "opt_C", label: "C", text: "Fast food consumption causes that people be obese." },
        { id: "opt_D", label: "D", text: "Eat fast food regularly lead people to be obesity." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Consuming fast food frequently leads to obesity among urban residents.",
      correctExplanation: "Cấu trúc chuẩn: 'lead to + Noun/V-ing' (leads to obesity). Câu (B) dùng sai 'results from', câu (D) sai chủ ngữ 'Eat' chưa đổi thành Gerund.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Eating fast food frequently results from people become obesity.",
        diagnosticTitle: "Dùng sai giới từ chỉ nguyên nhân - hệ quả",
        explanation: "Ăn đồ ăn nhanh là nguyên nhân, béo phì là kết quả, nên phải dùng 'results in' hoặc 'leads to', không dùng 'results from'."
      }
    },
    {
      id: "master_w2d1_q04",
      roundIndex: 3,
      prompt: "Trong câu: 'Financial difficulties often ________ irresponsible spending habits.', cụm từ điền chính xác vào chỗ trống là gì?",
      options: [
        { id: "opt_A", label: "A", text: "result from" },
        { id: "opt_B", label: "B", text: "result in" },
        { id: "opt_C", label: "C", text: "lead to" },
        { id: "opt_D", label: "D", text: "cause to" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. result from",
      correctExplanation: "'Financial difficulties' (Khó khăn tài chính) là Hệ quả; 'irresponsible spending habits' (thói quen chi tiêu vô trách nhiệm) là Nguyên nhân. Do đó phải dùng 'result from' (bắt nguồn từ).",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. result in",
        diagnosticTitle: "Chọn ngược chiều quan hệ nhân quả",
        explanation: "Nếu dùng 'result in', câu sẽ biến thành 'Khó khăn tài chính dẫn đến thói quen chi tiêu vô trách nhiệm' (vô lý về mặt logic)."
      }
    },
    {
      id: "master_w2d1_q05",
      roundIndex: 4,
      prompt: "Khi phát triển luận điểm 'Học đại học giúp sinh viên xây dựng mạng lưới quan hệ giá trị', câu phát triển ý (Supporting Idea) nào dưới đây thể hiện sự mạch lạc nhất?",
      options: [
        { id: "opt_A", label: "A", text: "By interacting with peers and professors, students can establish professional connections that benefit their future careers." },
        { id: "opt_B", label: "B", text: "Because university is very fun and students can go to parties every single night." },
        { id: "opt_C", label: "C", text: "Building networks is good because people need to talk to each other every day." },
        { id: "opt_D", label: "D", text: "Many universities have high tuition fees so poor students cannot afford them." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. By interacting with peers and professors, students can establish professional connections that benefit their future careers.",
      correctExplanation: "Câu (A) giải thích rõ cơ chế: Tương tác với bạn bè và giáo sư -> thiết lập các mối quan hệ chuyên môn -> có lợi cho sự nghiệp tương lai. Đây là chuỗi lập luận logic mẫu mực trong giáo trình MASTER.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Building networks is good because people need to talk to each other every day.",
        diagnosticTitle: "Lập luận luẩn quẩn (Circular reasoning)",
        explanation: "Học sinh hay lặp lại ý 'kết nối tốt vì cần nói chuyện' mà không đưa ra được tác động thực tế đến sự nghiệp."
      }
    },
    {
      id: "master_w2d1_q06",
      roundIndex: 5,
      prompt: "Collocation học thuật để diễn đạt ý 'tiếp thu kiến thức chuyên môn trong các lĩnh vực cụ thể' là gì?",
      options: [
        { id: "opt_A", label: "A", text: "acquire specialized knowledge in specific fields" },
        { id: "opt_B", label: "B", text: "take high knowledge in special rooms" },
        { id: "opt_C", label: "C", text: "buy theoretical knowledge from schools" },
        { id: "opt_D", label: "D", text: "catch practical knowledge in difficult areas" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. acquire specialized knowledge in specific fields",
      correctExplanation: "Cụm từ vựng chuẩn mực Band 6.5: 'acquire knowledge' (tiếp thu/lĩnh hội kiến thức) và 'specialized knowledge' (kiến thức chuyên sâu).",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. take high knowledge in special rooms",
        diagnosticTitle: "Ghép từ thô sơ không theo quy ước học thuật",
        explanation: "Trong tiếng Anh học thuật không ai nói 'take high knowledge', từ chuẩn bắt buộc là 'acquire / gain knowledge'."
      }
    },
    {
      id: "master_w2d1_q07",
      roundIndex: 6,
      prompt: "Trong đoạn thân bài Task 2, một câu Topic Sentence đạt chuẩn Band 6.0+ cần đáp ứng tiêu chí cốt lõi nào?",
      options: [
        { id: "opt_A", label: "A", text: "Khái quát được trọng tâm toàn đoạn và trả lời trực tiếp một phần yêu cầu của đề bài" },
        { id: "opt_B", label: "B", text: "Chứa sẵn số liệu thống kê chi tiết của một khảo sát cụ thể" },
        { id: "opt_C", label: "C", text: "Được viết bằng một câu đơn cực ngắn dưới 5 từ" },
        { id: "opt_D", label: "D", text: "Là câu hỏi tu từ để gợi mở sự tò mò cho người đọc" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Khái quát được trọng tâm toàn đoạn và trả lời trực tiếp một phần yêu cầu của đề bài",
      correctExplanation: "Topic sentence đóng vai trò là kim chỉ nam cho cả đoạn văn, mang tính khái quát (umbrella statement) và định hướng cho các câu triển khai chi tiết phía sau.",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. Là câu hỏi tu từ để gợi mở sự tò mò cho người đọc",
        diagnosticTitle: "Dùng văn phong báo chí vào bài thi học thuật",
        explanation: "Bài thi IELTS Academic cấm kỵ dùng câu hỏi tu từ (rhetorical questions) làm Topic Sentence; phải là câu khẳng định mang tính lập luận rõ ràng."
      }
    },
    {
      id: "master_w2d1_q08",
      roundIndex: 7,
      prompt: "Chọn câu viết chuẩn ngữ pháp thể hiện đề xuất chính sách: 'Chính phủ nên tăng thuế đối với đồ ăn nhanh vì giá cao hơn có thể khiến người dân hạn chế tiêu thụ.'?",
      options: [
        { id: "opt_A", label: "A", text: "The government should raise taxes on fast food, as higher prices could discourage people from consuming it." },
        { id: "opt_B", label: "B", text: "The government should raise taxes fast food because higher prices result in people consume less." },
        { id: "opt_C", label: "C", text: "Governments should increase taxes for fast food so that prices higher make people stop to eat." },
        { id: "opt_D", label: "D", text: "Raising taxes on fast food should be done so people cannot buy food anymore." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. The government should raise taxes on fast food, as higher prices could discourage people from consuming it.",
      correctExplanation: "Cấu trúc đắt giá: 'discourage somebody from doing something' (ngăn cản/làm nhụt chí ai làm việc gì) kết hợp với liên từ 'as' (bằng because) thể hiện văn phong học thuật uyển chuyển.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Governments should increase taxes for fast food so that prices higher make people stop to eat.",
        diagnosticTitle: "Dùng cấu trúc vụn vặt và nhầm lẫn stop doing vs stop to do",
        explanation: "'Stop to eat' là dừng lại để ăn, ngược nghĩa hoàn toàn với 'ngừng ăn' ('stop eating')."
      }
    },
    {
      id: "master_w2d1_q09",
      roundIndex: 8,
      prompt: "Phương án nào dưới đây thể hiện sự liên kết mạch lạc giữa 2 ý hỗ trợ (Supporting Ideas) trong cùng một đoạn thân bài?",
      options: [
        { id: "opt_A", label: "A", text: "Sử dụng các từ nối phân tầng luận điểm như Furthermore, In addition, On top of that" },
        { id: "opt_B", label: "B", text: "Lặp lại liên tục từ 'And' ở đầu mỗi câu" },
        { id: "opt_C", label: "C", text: "Không dùng bất kỳ từ nối nào để người đọc tự suy đoán" },
        { id: "opt_D", label: "D", text: "Dùng liên từ tương phản 'However' giữa hai ý cùng ủng hộ một quan điểm" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Sử dụng các từ nối phân tầng luận điểm như Furthermore, In addition, On top of that",
      correctExplanation: "Khi triển khai 2 supporting ideas cùng chiều trong 1 đoạn body, việc dùng các cohesive devices bổ sung ý (Furthermore, Moreover, In addition) tạo nên tính mạch lạc liền mạch cho bài viết.",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. Dùng liên từ tương phản 'However' giữa hai ý cùng ủng hộ một quan điểm",
        diagnosticTitle: "Dùng từ nối cơ học không ăn khớp logic",
        explanation: "Học sinh thường học thuộc một loạt từ nối rồi đặt bừa vào đầu câu mà không để ý chúng mang nghĩa tương phản hay bổ sung."
      }
    },
    {
      id: "master_w2d1_q10",
      roundIndex: 9,
      prompt: "Trong đoạn kết bài (Conclusion) của bài thi Writing Task 2, điều cấm kỵ tuyệt đối là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Đưa ra một luận điểm hoặc ý tưởng hoàn toàn mới chưa từng được đề cập ở thân bài" },
        { id: "opt_B", label: "B", text: "Khẳng định lại quan điểm cá nhân đã nêu ở mở bài" },
        { id: "opt_C", label: "C", text: "Tóm tắt ngắn gọn các ý chính của 2 đoạn thân bài" },
        { id: "opt_D", label: "D", text: "Bắt đầu bằng cụm từ In conclusion hoặc To conclude" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Đưa ra một luận điểm hoặc ý tưởng hoàn toàn mới chưa từng được đề cập ở thân bài",
      correctExplanation: "Quy tắc vàng của bài luận học thuật: Kết bài chỉ có nhiệm vụ tổng kết và tái khẳng định quan điểm (restatement & summary). Tuyệt đối không đưa thêm idea mới ở kết bài vì nó sẽ không có thân bài chứng minh.",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. Bắt đầu bằng cụm từ In conclusion hoặc To conclude",
        diagnosticTitle: "Hiểu sai về từ nối kết bài",
        explanation: "'In conclusion' là cụm từ chính thống và được khuyến khích sử dụng ở đầu đoạn kết bài."
      }
    }
  ],

  "WEEK 2 – DAY 2": [
    {
      id: "master_w2d2_q01",
      roundIndex: 0,
      prompt: "Chiến thuật 'Answer 2-3 questions at the same time' (Đọc đa nhiệm đồng thời) trong IELTS Reading giúp giải quyết vấn đề cốt lõi nào?",
      options: [
        { id: "opt_A", label: "A", text: "Tiết kiệm thời gian đọc bài bằng cách xử lý song song các nhóm câu hỏi cùng xuất hiện trong một đoạn văn" },
        { id: "opt_B", label: "B", text: "Chọn ngẫu nhiên một đáp án cho 3 câu hỏi cùng lúc" },
        { id: "opt_C", label: "C", text: "Đọc xong toàn bộ 3 bài đọc mới bắt đầu quay lại làm câu hỏi" },
        { id: "opt_D", label: "D", text: "Bỏ qua các câu hỏi khó để làm bài khác" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Tiết kiệm thời gian đọc bài bằng cách xử lý song song các nhóm câu hỏi cùng xuất hiện trong một đoạn văn",
      correctExplanation: "Chiến thuật đỉnh cao của giáo trình MASTER: Thay vì đọc đi đọc lại 1 đoạn văn nhiều lần cho từng dạng bài riêng rẽ, thí sinh ghi nhớ từ khóa của 2-3 dạng câu hỏi và xử lý đồng thời khi đọc qua đoạn văn đó.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Đọc xong toàn bộ 3 bài đọc mới bắt đầu quay lại làm câu hỏi",
        diagnosticTitle: "Cách làm bài tuyến tính mất thời gian",
        explanation: "Đọc hết cả bài rồi mới làm câu hỏi sẽ khiến thí sinh quên sạch chi tiết và phải đọc lại từ đầu, gây lãng phí 20 phút quý giá."
      }
    },
    {
      id: "master_w2d2_q02",
      roundIndex: 1,
      prompt: "Trong dạng bài Matching Information (Tìm thông tin trong đoạn văn A-F), đặc điểm khác biệt lớn nhất so với dạng điền từ là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Thứ tự câu hỏi KHÔNG theo trình tự xuất hiện của đoạn văn trong bài đọc" },
        { id: "opt_B", label: "B", text: "Các câu hỏi luôn luôn theo thứ tự từ trên xuống dưới" },
        { id: "opt_C", label: "C", text: "Mỗi đoạn văn chỉ chứa duy nhất một câu hỏi" },
        { id: "opt_D", label: "D", text: "Không bao giờ có đoạn văn nào được chọn hai lần" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Thứ tự câu hỏi KHÔNG theo trình tự xuất hiện của đoạn văn trong bài đọc",
      correctExplanation: "Matching Information là dạng bài không theo thứ tự văn bản (Non-chronological order). Câu 1 có thể nằm ở đoạn E, trong khi câu 2 lại nằm ở đoạn B.",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Các câu hỏi luôn luôn theo thứ tự từ trên xuống dưới",
        diagnosticTitle: "Áp dụng sai quy tắc thứ tự",
        explanation: "Nhiều học sinh mặc định bài nào câu hỏi cũng xuất hiện tuần tự nên tìm kiếm thông tin sai vị trí."
      }
    },
    {
      id: "master_w2d2_q03",
      roundIndex: 2,
      prompt: "Trong bài đọc về bảo tồn động vật, cụm từ 'animals in captivity' được hiểu chính xác là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Động vật được nuôi nhốt và chăm sóc trong sở thú hoặc các trung tâm nghiên cứu nhân tạo" },
        { id: "opt_B", label: "B", text: "Động vật hoang dã tự do sinh sống trong rừng nguyên sinh" },
        { id: "opt_C", label: "C", text: "Các loài sinh vật đã bị tuyệt chủng hoàn toàn" },
        { id: "opt_D", label: "D", text: "Động vật thủy sinh sống ở đáy đại dương sâu" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Động vật được nuôi nhốt và chăm sóc trong sở thú hoặc các trung tâm nghiên cứu nhân tạo",
      correctExplanation: "'In captivity' là thuật ngữ học thuật chỉ trạng thái bị giam giữ/nuôi nhốt trong môi trường có kiểm soát (zoos, sanctuaries, laboratories), đối lập với 'in the wild'.",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Động vật hoang dã tự do sinh sống trong rừng nguyên sinh",
        diagnosticTitle: "Chọn nhầm khái niệm trái nghĩa",
        explanation: "'In the wild' mới là ngoài tự nhiên hoang dã, 'in captivity' là trong điều kiện nuôi nhốt."
      }
    },
    {
      id: "master_w2d2_q04",
      roundIndex: 3,
      prompt: "Một trong những lợi ích lớn nhất của việc nghiên cứu động vật trong điều kiện nuôi nhốt (in captivity) so với ngoài tự nhiên là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Các nhà khoa học có thể kiểm soát môi trường, theo dõi hành vi liên tục và thu thập mẫu dữ liệu chính xác" },
        { id: "opt_B", label: "B", text: "Động vật nuôi nhốt hung dữ hơn và phát triển nhanh hơn" },
        { id: "opt_C", label: "C", text: "Chi phí nghiên cứu luôn bằng 0" },
        { id: "opt_D", label: "D", text: "Động vật có thể tự học cách nói tiếng người" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Các nhà khoa học có thể kiểm soát môi trường, theo dõi hành vi liên tục và thu thập mẫu dữ liệu chính xác",
      correctExplanation: "Nghiên cứu 'in captivity' cho phép các nhà sinh học thiết lập điều kiện thí nghiệm đồng nhất, kiểm soát thức ăn, theo dõi vòng đời mà không bị cản trở bởi thời tiết khắc nghiệt hay thú dữ.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Động vật nuôi nhốt hung dữ hơn và phát triển nhanh hơn",
        diagnosticTitle: "Suy diễn cảm tính",
        explanation: "Học sinh đoán mò theo cảm giác cá nhân thay vì nắm bản chất khoa học của phương pháp nghiên cứu có đối chứng."
      }
    },
    {
      id: "master_w2d2_q05",
      roundIndex: 4,
      prompt: "Từ vựng 'die out' trong câu: 'A reference to how quickly animal species can die out' đồng nghĩa với từ học thuật nào sau đây?",
      options: [
        { id: "opt_A", label: "A", text: "become extinct" },
        { id: "opt_B", label: "B", text: "migrate seasonally" },
        { id: "opt_C", label: "C", text: "reproduce rapidly" },
        { id: "opt_D", label: "D", text: "hibernate deeply" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. become extinct",
      correctExplanation: "Phrasal verb 'die out' = 'become extinct' (bị tuyệt chủng hoàn toàn). Đây là cặp từ paraphrase thường xuyên xuất hiện trong đề thi Cambridge.",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. migrate seasonally",
        diagnosticTitle: "Nhầm lẫn giữa tuyệt chủng và di cư",
        explanation: "'Migrate' là di cư theo mùa, còn 'die out' là biến mất vĩnh viễn trên trái đất."
      }
    },
    {
      id: "master_w2d2_q06",
      roundIndex: 5,
      prompt: "Trong bài thi Reading dạng Multiple Choice có 4 lựa chọn A-B-C-D, cách bẻ bẫy lựa chọn sai (Distractor Dissection) hiệu quả là:",
      options: [
        { id: "opt_A", label: "A", text: "Loại trừ các phương án chứa từ ngữ tuyệt đối hóa, thông tin ngược chiều hoặc thông tin không được đề cập trong bài" },
        { id: "opt_B", label: "B", text: "Chọn câu dài nhất vì câu dài nhất luôn luôn là câu đúng" },
        { id: "opt_C", label: "C", text: "Chọn phương án có chứa từ giống hệt 100% từng chữ trong bài đọc" },
        { id: "opt_D", label: "D", text: "Nhắm mắt chọn đáp án C" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Loại trừ các phương án chứa từ ngữ tuyệt đối hóa, thông tin ngược chiều hoặc thông tin không được đề cập trong bài",
      correctExplanation: "Kỹ năng phân tích bẫy (Distractor Analysis): Người ra đề IELTS thường tạo bẫy bằng cách lặp lại nguyên văn từ vựng trong bài đọc (Word-matching trap) nhưng bẻ cong ý nghĩa bằng các từ chỉ tần suất hoặc phủ định.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Chọn phương án có chứa từ giống hệt 100% từng chữ trong bài đọc",
        diagnosticTitle: "Bẫy trùng từ nguyên văn (Word-matching trap)",
        explanation: "Phương án chứa từ giống hệt bài đọc thường là bẫy gián tiếp; đáp án đúng thực sự hầu như luôn được diễn đạt bằng từ đồng nghĩa (Paraphrased)."
      }
    },
    {
      id: "master_w2d2_q07",
      roundIndex: 6,
      prompt: "Khi gặp câu hỏi: 'Why are changes needed to traffic systems in Granford?', từ khóa trọng tâm cần khoanh vùng để định vị thông tin là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Tên riêng 'Granford' và khái niệm 'traffic systems changes'" },
        { id: "opt_B", label: "B", text: "Từ chung chung 'needed' và 'are'" },
        { id: "opt_C", label: "C", text: "Đọc toàn bộ cả bài đọc 1000 từ để tìm đáp án" },
        { id: "opt_D", label: "D", text: "Chỉ tìm chữ 'Why' ở đầu câu" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Tên riêng 'Granford' và khái niệm 'traffic systems changes'",
      correctExplanation: "Tên riêng viết hoa 'Granford' là từ khóa bất biến không thể bị paraphrase, kết hợp với từ khóa chủ đề 'traffic system' giúp thí sinh định vị ngay lập tức đoạn văn chứa thông tin.",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Từ chung chung 'needed' và 'are'",
        diagnosticTitle: "Chọn từ khóa biến đổi và phổ thông",
        explanation: "Các từ phổ biến xuất hiện ở khắp nơi trong bài đọc sẽ khiến thí sinh mất phương hướng khi tìm kiếm."
      }
    },
    {
      id: "master_w2d2_q08",
      roundIndex: 7,
      prompt: "Trong bài đọc về giao thông thị trấn, từ vựng 'pedestrian' có nghĩa là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Người đi bộ trên đường" },
        { id: "opt_B", label: "B", text: "Tài xế lái xe buýt công cộng" },
        { id: "opt_C", label: "C", text: "Người đi xe đạp thể thao" },
        { id: "opt_D", label: "D", text: "Cảnh sát điều phối giao thông" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Người đi bộ trên đường",
      correctExplanation: "'Pedestrian' (/pəˈdestriən/) là danh từ chỉ người đi bộ. Ví dụ: 'pedestrian crossing' (vạch qua đường cho người đi bộ).",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Người đi xe đạp thể thao",
        diagnosticTitle: "Nhầm lẫn giữa người đi bộ và người đi xe đạp",
        explanation: "Người đi xe đạp là 'cyclist', còn 'pedestrian' là người đi bộ."
      }
    },
    {
      id: "master_w2d2_q09",
      roundIndex: 8,
      prompt: "Cụm từ 'resident survey' trong bài thi Reading được hiểu là:",
      options: [
        { id: "opt_A", label: "A", text: "Cuộc khảo sát ý kiến của người dân sinh sống tại địa phương" },
        { id: "opt_B", label: "B", text: "Bảng đánh giá tiền thuế bất động sản" },
        { id: "opt_C", label: "C", text: "Chương trình khám sức khỏe định kỳ cho cư dân" },
        { id: "opt_D", label: "D", text: "Danh sách bầu cử thị trưởng thành phố" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Cuộc khảo sát ý kiến của người dân sinh sống tại địa phương",
      correctExplanation: "'Resident' = cư dân địa phương, 'survey' = khảo sát ý kiến. Cụm này thường đi kèm các than phiền về tiếng ồn hoặc ách tắc giao thông.",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Bảng đánh giá tiền thuế bất động sản",
        diagnosticTitle: "Suy đoán nghĩa lệch ngữ cảnh",
        explanation: "Học sinh thấy chữ 'resident' liền liên hệ đến nơi ở và đoán mò sang tiền nhà hay thuế đất."
      }
    },
    {
      id: "master_w2d2_q10",
      roundIndex: 9,
      prompt: "Khi gặp một câu hỏi trắc nghiệm mà có 2 phương án đối lập nhau hoàn toàn về nghĩa, kinh nghiệm làm bài của giáo viên IELTS là:",
      options: [
        { id: "opt_A", label: "A", text: "Thường một trong hai phương án đối lập đó sẽ là đáp án chính xác của bài đọc" },
        { id: "opt_B", label: "B", text: "Chắc chắn cả 2 phương án đối lập đều sai" },
        { id: "opt_C", label: "C", text: "Bỏ qua cả 2 và chọn phương án thứ ba" },
        { id: "opt_D", label: "D", text: "Không có mẹo nào có thể áp dụng" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Thường một trong hai phương án đối lập đó sẽ là đáp án chính xác của bài đọc",
      correctExplanation: "Người ra đề Cambridge thường cài cắm 1 đáp án đúng và 1 bẫy đối lập trực diện để kiểm tra khả năng đọc hiểu chi tiết phủ định của thí sinh.",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Chắc chắn cả 2 phương án đối lập đều sai",
        diagnosticTitle: "Loại trừ thiếu căn cứ phương pháp luận",
        explanation: "Thí sinh sợ các đáp án xung đột nên vội vàng loại bỏ cả hai mà không đối chiếu kỹ với bài đọc."
      }
    }
  ],

  "WEEK 2 – DAY 3": [
    {
      id: "master_w2d3_q01",
      roundIndex: 0,
      prompt: "Kỹ thuật 'Chunking' trong luyện thi IELTS Speaking được định nghĩa chuẩn xác là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Kỹ thuật chia lời nói thành các cụm từ có nghĩa tự nhiên Thought Groups và ngắt nghỉ đúng chỗ" },
        { id: "opt_B", label: "B", text: "Đọc dồn dập từng từ đơn lẻ như robot" },
        { id: "opt_C", label: "C", text: "Nói thật nhanh không bao giờ dừng lại lấy hơi" },
        { id: "opt_D", label: "D", text: "Chỉ phát âm các phụ âm cuối thật to" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Kỹ thuật chia lời nói thành các cụm từ có nghĩa tự nhiên Thought Groups và ngắt nghỉ đúng chỗ",
      correctExplanation: "Giáo án MASTER khẳng định: Chunking là phân chia câu nói thành các nhóm ý nghĩa (Thought Groups: cụm chủ ngữ, cụm động từ, cụm giới từ). Việc ngắt nghỉ đúng cụm giúp người nghe tiếp thu dễ dàng và tạo nhịp điệu tự nhiên (Rhythm & Intonation).",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Đọc dồn dập từng từ đơn lẻ như robot",
        diagnosticTitle: "Nói giật cục từng từ đơn lẻ (Word-by-word speaking)",
        explanation: "Học sinh ngắt nghỉ tùy tiện giữa các từ đơn lẻ khiến câu nói bị đứt gãy và giám khảo chấm điểm Pronunciation dưới 5.5."
      }
    },
    {
      id: "master_w2d3_q02",
      roundIndex: 1,
      prompt: "Câu nào dưới đây được phân chia Chunking ngắt nghỉ tự nhiên và chuẩn xác nhất?",
      options: [
        { id: "opt_A", label: "A", text: "[Yes, I love talking with my friends] | [because I can share my ups and downs] | [without any hesitation.]" },
        { id: "opt_B", label: "B", text: "[Yes] | [I love] | [talking with] | [my] | [friends because] | [I can share my] | [ups and downs.]" },
        { id: "opt_C", label: "C", text: "[Yes I love talking] | [with my friends because I] | [can share my ups and] | [downs.]" },
        { id: "opt_D", label: "D", text: "[Yes I love talking with my friends because I can share my ups and downs without any hesitation without breathing.]" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. [Yes, I love talking with my friends] | [because I can share my ups and downs] | [without any hesitation.]",
      correctExplanation: "Cách ngắt cụm chuẩn: [Mệnh đề chính hoàn chỉnh] / [Mệnh đề trạng ngữ chỉ lý do] / [Cụm giới từ bổ nghĩa cách thức]. Mỗi cụm là một đơn vị ý nghĩa trọn vẹn.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. [Yes] | [I love] | [talking with] | [my] | [friends because] | [I can share my] | [ups and downs.]",
        diagnosticTitle: "Ngắt cụm quá vụn vặt",
        explanation: "Ngắt rời rạc từng từ đơn hoặc ngắt giữa tính từ sở hữu 'my' và danh từ 'friends' là lỗi ngắt sai ngữ pháp."
      }
    },
    {
      id: "master_w2d3_q03",
      roundIndex: 2,
      prompt: "Thành ngữ (Idiom) tự nhiên 'share my ups and downs' trong câu trả lời Speaking mang nghĩa là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Chia sẻ những thăng trầm, niềm vui và nỗi buồn trong cuộc sống" },
        { id: "opt_B", label: "B", text: "Chia sẻ thang máy đi lên đi xuống" },
        { id: "opt_C", label: "C", text: "Khoe khoang tài sản cá nhân với bạn bè" },
        { id: "opt_D", label: "D", text: "Than vãn về thất bại học tập" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Chia sẻ những thăng trầm, niềm vui và nỗi buồn trong cuộc sống",
      correctExplanation: "'Ups and downs' là idiom rất tự nhiên và ăn điểm cao: 'share my ups and downs with my close friends' (chia sẻ những vui buồn thăng trầm cuộc đời).",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Chia sẻ thang máy đi lên đi xuống",
        diagnosticTitle: "Dịch nghĩa đen từng từ (Literal translation)",
        explanation: "Học sinh thấy chữ 'up' và 'down' liền liên tưởng đến chiều chuyển động vật lý thay vì nhận diện đây là thành ngữ chỉ cảm xúc."
      }
    },
    {
      id: "master_w2d3_q04",
      roundIndex: 3,
      prompt: "Khi được hỏi về việc bạn có thích giao tiếp hay không, nếu bạn là người hướng nội, cách trả lời ghi điểm Band 6.5 là:",
      options: [
        { id: "opt_A", label: "A", text: "Not really. The primary reason is that I'm an introvert, so I usually recharge my energy by spending time alone." },
        { id: "opt_B", label: "B", text: "No, I hate people and never speak to anyone." },
        { id: "opt_C", label: "C", text: "I am not like talking because talking is very bad." },
        { id: "opt_D", label: "D", text: "Yes I like talking." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Not really. The primary reason is that I'm an introvert, so I usually recharge my energy by spending time alone.",
      correctExplanation: "Từ vựng tâm lý học chuẩn xác: 'introvert' (người hướng nội) và 'recharge energy by spending time alone' (nạp lại năng lượng bằng cách ở một mình). Câu trả lời chân thành, logic và giàu vốn từ.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. No, I hate people and never speak to anyone.",
        diagnosticTitle: "Trả lời mang sắc thái tiêu cực cực đoan",
        explanation: "Dùng từ quá tiêu cực ('hate people') làm bài thi Speaking thiếu đi tính lịch sự và phản xạ giao tiếp tự nhiên."
      }
    },
    {
      id: "master_w2d3_q05",
      roundIndex: 4,
      prompt: "Từ vựng đối lập với 'introvert' (người hướng nội) để chỉ 'người hướng ngoại, thích giao lưu xã hội' là:",
      options: [
        { id: "opt_A", label: "A", text: "extrovert" },
        { id: "opt_B", label: "B", text: "outside person" },
        { id: "opt_C", label: "C", text: "outdoor human" },
        { id: "opt_D", label: "D", text: "hyper-person" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. extrovert",
      correctExplanation: "Cặp từ vựng tính cách học thuật: 'introvert' (người hướng nội) vs 'extrovert' (người hướng ngoại, cởi mở).",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. outside person",
        diagnosticTitle: "Dịch thô L1 sang tiếng Anh",
        explanation: "Học sinh Việt hay nói 'người bên ngoài' -> 'outside person' thay vì dùng thuật ngữ chuẩn 'extrovert'."
      }
    },
    {
      id: "master_w2d3_q06",
      roundIndex: 5,
      prompt: "Khi nói về lợi ích của việc tâm sự với bạn thân: 'Talking to my best friend helps me ________ daily pressure.'?",
      options: [
        { id: "opt_A", label: "A", text: "relieve" },
        { id: "opt_B", label: "B", text: "delete" },
        { id: "opt_C", label: "C", text: "break" },
        { id: "opt_D", label: "D", text: "destroy" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. relieve",
      correctExplanation: "Collocation tự nhiên: 'relieve stress / relieve pressure' (giải tỏa áp lực, xoa dịu căng thẳng).",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. delete",
        diagnosticTitle: "Dùng từ công nghệ thông tin cho tâm lý học",
        explanation: "'Delete' là xóa file dữ liệu, không dùng để 'xóa áp lực'."
      }
    },
    {
      id: "master_w2d3_q07",
      roundIndex: 6,
      prompt: "Cụm từ tự nhiên để diễn đạt ý 'nhìn nhận sự việc dưới một góc độ khác, tích cực hơn' là gì?",
      options: [
        { id: "opt_A", label: "A", text: "gain a fresh perspective" },
        { id: "opt_B", label: "B", text: "look at new picture" },
        { id: "opt_C", label: "C", text: "buy a modern view" },
        { id: "opt_D", label: "D", text: "change eye glasses" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. gain a fresh perspective",
      correctExplanation: "'Gain a fresh perspective on something' là collocation cao cấp Band 6.5 chỉ việc có được một góc nhìn mới mẻ, thấu đáo hơn về cuộc sống.",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. look at new picture",
        diagnosticTitle: "Dịch nghĩa đen hình tượng",
        explanation: "Học sinh dùng từ hình tượng 'nhìn bức tranh mới' thay vì dùng danh từ trừu tượng học thuật 'perspective'."
      }
    },
    {
      id: "master_w2d3_q08",
      roundIndex: 7,
      prompt: "Trong kỹ thuật Chunking, từ ngữ nào trong một câu thường KHÔNG được nhấn trọng âm chính (Unstressed Words)?",
      options: [
        { id: "opt_A", label: "A", text: "Các từ chức năng ngữ pháp như giới từ, mạo từ và đại từ nhân xưng" },
        { id: "opt_B", label: "B", text: "Danh từ chính chỉ đối tượng" },
        { id: "opt_C", label: "C", text: "Động từ hành động chính" },
        { id: "opt_D", label: "D", text: "Tính từ miêu tả đặc điểm" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Các từ chức năng ngữ pháp như giới từ, mạo từ và đại từ nhân xưng",
      correctExplanation: "Quy luật ngữ âm tiếng Anh: Từ mang nội dung (Content Words: Danh từ, Động từ chính, Tính từ, Trạng từ) được nhấn mạnh; Từ chức năng (Function Words: Giới từ, Mạo từ, Trợ động từ) được đọc lướt, giảm âm (weak forms).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Danh từ chính chỉ đối tượng",
        diagnosticTitle: "Nhầm lẫn giữa từ mang nội dung và từ chức năng",
        explanation: "Danh từ là từ khóa truyền tải thông tin cốt lõi nên luôn được nhấn trọng âm trong câu."
      }
    },
    {
      id: "master_w2d3_q09",
      roundIndex: 8,
      prompt: "Chọn câu trả lời có ngữ điệu và cấu trúc hoàn chỉnh cho câu hỏi Speaking Part 1: 'How often do you hang out with your friends?'?",
      options: [
        { id: "opt_A", label: "A", text: "We try to meet up once a week, usually on Saturday evenings, to unwind after a hectic working week." },
        { id: "opt_B", label: "B", text: "Once a week." },
        { id: "opt_C", label: "C", text: "I hang out with friends very many times because I have many friends." },
        { id: "opt_D", label: "D", text: "Meeting friends is essential for human existence according to sociological science." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. We try to meet up once a week, usually on Saturday evenings, to unwind after a hectic working week.",
      correctExplanation: "Câu trả lời hoàn hảo: Nêu tần suất rõ ràng ('once a week') + Thời điểm cụ thể ('Saturday evenings') + Mục đích với từ vựng hay ('unwind after a hectic week').",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Once a week.",
        diagnosticTitle: "Trả lời cụt ngủn dưới Band 5.0",
        explanation: "Chỉ trả lời một cụm từ cụt lủn không thể hiện được khả năng sử dụng ngữ pháp và từ vựng của thí sinh."
      }
    },
    {
      id: "master_w2d3_q10",
      roundIndex: 9,
      prompt: "Từ vựng 'unwind' trong cụm 'unwind after a hectic working week' có nghĩa là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Nghỉ ngơi, thư giãn xả hơi sau những giờ làm việc căng thẳng bận rộn" },
        { id: "opt_B", label: "B", text: "Tiếp tục làm thêm giờ vào ban đêm" },
        { id: "opt_C", label: "C", text: "Tháo dỡ cuộn dây điện trong nhà" },
        { id: "opt_D", label: "D", text: "Tập chạy bộ marathon đường dài" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Nghỉ ngơi, thư giãn xả hơi sau những giờ làm việc căng thẳng bận rộn",
      correctExplanation: "'Unwind' (/ʌnˈwaɪnd/) = relax after a period of work or tension. Cụm 'unwind after a hectic week' là từ vựng rất đắt giá trong Speaking Part 1 & 2.",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Tháo dỡ cuộn dây điện trong nhà",
        diagnosticTitle: "Dịch nghĩa đen cơ học của từ wind (cuộn/quấn)",
        explanation: "Học sinh liên hệ với 'wind a clock/rope' (lên dây cót, cuộn dây) nên dịch nhầm nghĩa đen thay vì nghĩa bóng là thư giãn tinh thần."
      }
    }
  ]
};
