/**
 * MASTER ARENA QUESTION BANK - WEEK 3
 * Source: Giáo trình MASTER 2027 - Đã soát lỗi.docx & Giáo án Master 2027 (Teacher Guide)
 * Target: IELTS Band 6.0 | Performance 6.0–6.5
 * 
 * Day 1: Writing (Developing Main Ideas / Topic Sentence / Dummy Subjects / Progression & Cohesive Referents)
 * Day 2: Reading (Margaret Preston Australian Artist / TRUE - FALSE - NOT GIVEN / Degree & Absolute Qualifiers)
 * Day 3: Speaking (Part 1 Feelings & Opinions / Too vs Really / Part 2 Describe an Object)
 */

export const MASTER_WEEK_3_QUESTIONS: Record<string, any[]> = {
  "WEEK 3 – DAY 1": [
    {
      id: "master_w3d1_q01",
      roundIndex: 0,
      prompt: "Trong bài IELTS Writing Task 2, câu chủ đề (Topic Sentence) của một đoạn thân bài đạt chuẩn 6.0+ cần đáp ứng tiêu chí nào sau đây?",
      options: [
        { id: "opt_A", label: "A", text: "Nêu ý chính bao quát và định hướng lập luận cho toàn bộ đoạn văn mà không đi quá sâu vào tiểu tiết vụn vặt" },
        { id: "opt_B", label: "B", text: "Liệt kê tất cả các ví dụ và số liệu thực tế sẽ được trình bày trong đoạn thân bài" },
        { id: "opt_C", label: "C", text: "Lặp lại y nguyên câu hỏi của đề bài bằng cách thay đổi một vài từ đồng nghĩa đơn lẻ" },
        { id: "opt_D", label: "D", text: "Chỉ nêu một câu cảm thán chung chung để kích thích trí tò mò của người chấm" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Nêu ý chính bao quát và định hướng lập luận cho toàn bộ đoạn văn mà không đi quá sâu vào tiểu tiết vụn vặt",
      correctExplanation: "Một Topic Sentence chuẩn học thuật phải đóng vai trò 'umbrella sentence' (bao quát toàn bộ các luận điểm hỗ trợ sẽ phân tích phía sau), tránh đưa ngay ví dụ cụ thể hoặc dẫn chứng chi tiết vào câu mở đoạn.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Liệt kê tất cả các ví dụ và số liệu thực tế sẽ được trình bày trong đoạn thân bài",
        diagnosticTitle: "Nhầm lẫn giữa câu chủ đề bao quát và câu dẫn chứng chi tiết",
        explanation: "Thí sinh band thấp thường cố nhồi nhét ví dụ, số liệu vào câu đầu tiên khiến đoạn văn mất tính khái quát học thuật."
      }
    },
    {
      id: "master_w3d1_q02",
      roundIndex: 1,
      prompt: "Với đề bài: 'New graduates should work for a large company. To what extent do you agree or disagree?', câu nào sau đây sử dụng cấu trúc chủ ngữ giả (Dummy Subject) chuẩn xác để làm Topic Sentence?",
      options: [
        { id: "opt_A", label: "A", text: "There are several undeniable benefits for recent university graduates when taking up employment in large corporations." },
        { id: "opt_B", label: "B", text: "It is beneficial for working in big companies because graduates can learn more skills." },
        { id: "opt_C", label: "C", text: "There have many advantages of young people to work for large companies." },
        { id: "opt_D", label: "D", text: "It has several benefits that large enterprises bring for young workers." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. There are several undeniable benefits for recent university graduates when taking up employment in large corporations.",
      correctExplanation: "Cấu trúc chủ ngữ giả chuẩn: 'There are several benefits for somebody when doing something' hoặc 'It is beneficial for somebody to do something'. Phương án B sai cấu trúc 'beneficial for working' (phải là for somebody to do). Phương án C sai 'there have' thay vì 'there are'. Phương án D sai dùng 'It has'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. There have many advantages of young people to work for large companies.",
        diagnosticTitle: "Lỗi dịch 'có nhiều lợi ích' thành 'There have'",
        explanation: "Học sinh Việt Nam hay dịch từng chữ 'Có' = Have dẫn tới cấu trúc sai ngữ pháp nghiêm trọng 'There have'."
      }
    },
    {
      id: "master_w3d1_q03",
      roundIndex: 2,
      prompt: "Chọn mẫu câu mở đoạn học thuật (Band 6.5) sử dụng cụm danh từ để định hướng cụ thể hai khía cạnh phân tích:",
      options: [
        { id: "opt_A", label: "A", text: "Reading books is crucial for reasons relating to personal growth and academic success." },
        { id: "opt_B", label: "B", text: "Reading books is crucial because it helps people grow personally and succeed academically." },
        { id: "opt_C", label: "C", text: "People read books because they want personal growth and academic success." },
        { id: "opt_D", label: "D", text: "There are two things about reading books: personal growth and academic success." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Reading books is crucial for reasons relating to personal growth and academic success.",
      correctExplanation: "Mẫu câu danh từ hóa nâng cao: 'X is crucial/vital for reasons relating to A and B' thể hiện sự trang trọng, súc tích và chuẩn mực của văn phong học thuật Cambridge.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Reading books is crucial because it helps people grow personally and succeed academically.",
        diagnosticTitle: "Lạm dụng mệnh đề trạng ngữ 'because' thay vì danh từ hóa học thuật",
        explanation: "Phương án B đúng ngữ pháp nhưng thuộc cấu trúc thông dụng (Band 5.0–5.5), chưa đạt mức độ súc tích của cụm danh từ ở Band 6.5."
      }
    },
    {
      id: "master_w3d1_q04",
      roundIndex: 3,
      prompt: "Xác định lỗi liên kết (Coherence and Cohesion) chính trong đoạn văn sau: 'Reading books is good for students. Firstly, it helps them learn vocabulary. In addition, it improves grammar. As a result, they write better. Moreover, they have more ideas. Besides, it makes them think deeply. Finally, it helps them relax. Therefore, it is useful.'?",
      options: [
        { id: "opt_A", label: "A", text: "Lạm dụng liên từ nối cơ học ở đầu mọi câu khiến bài viết rời rạc và thiếu chiều sâu giải thích" },
        { id: "opt_B", label: "B", text: "Sai toàn bộ cấu trúc thì hiện tại đơn của các động từ" },
        { id: "opt_C", label: "C", text: "Thiếu các từ vựng C2 quý hiếm" },
        { id: "opt_D", label: "D", text: "Chứa quá nhiều mệnh đề quan hệ phức tạp" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Lạm dụng liên từ nối cơ học ở đầu mọi câu khiến bài viết rời rạc và thiếu chiều sâu giải thích",
      correctExplanation: "Đây là lỗi 'mechanical over-linking' điển hình ở band 5.0-5.5: chèn liên từ máy móc ở mọi đầu câu (Firstly, In addition, As a result, Moreover, Besides, Finally) nhưng mỗi câu chỉ là một ý rời rạc, không có câu nào được giải thích cặn kẽ (Why/How).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Thiếu các từ vựng C2 quý hiếm",
        diagnosticTitle: "Ảo tưởng rằng bài viết yếu vì thiếu từ vựng cao cấp C2",
        explanation: "Học sinh thường nghĩ viết điểm thấp vì từ đơn giản, trong khi vấn đề cốt tử là tính mạch lạc (Cohesion) và chiều sâu lập luận."
      }
    },
    {
      id: "master_w3d1_q05",
      roundIndex: 4,
      prompt: "Để đạt tiêu chí Coherence & Cohesion 6.5, thay vì dùng liên từ máy móc 'Moreover/In addition', người viết nên ưu tiên phương thức liên kết nào giữa hai câu sau: 'Large corporations implement comprehensive training programs.' -> '[...], junior employees can rapidly bridge the gap between theory and practice.'?",
      options: [
        { id: "opt_A", label: "A", text: "Thanks to these structured initiatives" },
        { id: "opt_B", label: "B", text: "Furthermore" },
        { id: "opt_C", label: "C", text: "In addition to that" },
        { id: "opt_D", label: "D", text: "Also" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Thanks to these structured initiatives",
      correctExplanation: "Kỹ thuật dùng đại từ chỉ định kết hợp danh từ tóm tắt ('these structured initiatives' thay thế cho 'comprehensive training programs') tạo liên kết nội dung tự nhiên và chặt chẽ, vượt trội hơn hẳn liên từ đơn lẻ.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Furthermore",
        diagnosticTitle: "Phụ thuộc vào liên từ nối đơn lẻ thay vì liên kết bằng từ quy chiếu",
        explanation: "'Furthermore' chỉ mang tính cộng dồn máy móc, không tạo được cầu nối nhân quả logic giữa chương trình đào tạo và sự tiến bộ của nhân viên."
      }
    },
    {
      id: "master_w3d1_q06",
      roundIndex: 5,
      prompt: "Trong chuỗi tiến triển luận điểm (Paragraph Progression), thành phần nào dưới đây giữ vai trò chứng minh 'Tại sao luận điểm lại đúng' hoặc 'Cơ chế hoạt động như thế nào'?",
      options: [
        { id: "opt_A", label: "A", text: "Development Explanation trả lời câu hỏi Why hoặc How" },
        { id: "opt_B", label: "B", text: "Topic Sentence câu chủ đề" },
        { id: "opt_C", label: "C", text: "Concluding Sentence câu kết đoạn" },
        { id: "opt_D", label: "D", text: "Lead-in phrase cụm từ dẫn nhập" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Development Explanation trả lời câu hỏi Why hoặc How",
      correctExplanation: "Mỗi Supporting Idea bắt buộc phải đi kèm câu Development/Explanation (giải thích cơ chế hoạt động hoặc nguyên nhân sâu xa bằng Why/How) thì lập luận mới đạt độ sâu của Band 6.0–6.5.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Topic Sentence câu chủ đề",
        diagnosticTitle: "Kỳ vọng câu chủ đề phải tự giải thích toàn bộ luận điểm",
        explanation: "Câu chủ đề chỉ giới thiệu định hướng, không thể kiêm nhiệm vai trò giải thích chi tiết cơ chế."
      }
    },
    {
      id: "master_w3d1_q07",
      roundIndex: 6,
      prompt: "Chọn câu viết nâng cấp học thuật phù hợp nhất: 'Làm việc cho công ty lớn giúp nhân viên có cơ hội thăng tiến rõ ràng.'?",
      options: [
        { id: "opt_A", label: "A", text: "Working in large corporations offers professionals well-defined career advancement pathways." },
        { id: "opt_B", label: "B", text: "Work for big companies helps staff have clear chance to get promotion." },
        { id: "opt_C", label: "C", text: "Big company working gives workers bright opportunities of getting higher job." },
        { id: "opt_D", label: "D", text: "If people work in big firms, they will easily go up in their career." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Working in large corporations offers professionals well-defined career advancement pathways.",
      correctExplanation: "Phương án A sử dụng cụm danh từ học thuật xuất sắc: 'well-defined career advancement pathways' (lộ trình thăng tiến nghề nghiệp rõ ràng) thay cho lối diễn đạt thông tục 'clear chance to get promotion'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Work for big companies helps staff have clear chance to get promotion.",
        diagnosticTitle: "Dùng văn phong nói khẩu ngữ và sai dạng danh động từ làm chủ ngữ",
        explanation: "Chủ ngữ là hành động phải dùng V-ing 'Working', và 'clear chance to get promotion' mang tính khẩu ngữ giao tiếp."
      }
    },
    {
      id: "master_w3d1_q08",
      roundIndex: 7,
      prompt: "Chọn cách diễn đạt liên kết chỉ kết quả hệ quả tự nhiên và trang trọng nhất để nối hai câu về môi trường làm việc:",
      options: [
        { id: "opt_A", label: "A", text: "Consequently, employees are more likely to achieve long-term professional fulfillment." },
        { id: "opt_B", label: "B", text: "So they will feel happy with their work in long time." },
        { id: "opt_C", label: "C", text: "Because of that, workers have very good feeling about jobs." },
        { id: "opt_D", label: "D", text: "And then, staff can be satisfied." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Consequently, employees are more likely to achieve long-term professional fulfillment.",
      correctExplanation: "'Consequently' kết hợp cấu trúc 'be more likely to + V' và cụm danh từ 'long-term professional fulfillment' thể hiện độ chuẩn xác và tính học thuật cao ở Band 6.5.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. So they will feel happy with their work in long time.",
        diagnosticTitle: "Dùng từ nối 'So' ở đầu câu văn viết học thuật",
        explanation: "Trong IELTS Writing học thuật, tuyệt đối tránh đặt 'So' ở đầu câu như một liên từ độc lập."
      }
    },
    {
      id: "master_w3d1_q09",
      roundIndex: 8,
      prompt: "Câu văn: 'Social media platforms expose adolescents to unrealistic lifestyles. In other words, they often suffer from feelings of inadequacy.' Cụm 'In other words' mang chức năng liên kết gì?",
      options: [
        { id: "opt_A", label: "A", text: "Diễn giải lại hoặc làm rõ hơn ý nghĩa và hệ quả trực tiếp của câu đứng trước" },
        { id: "opt_B", label: "B", text: "Bổ sung thêm một luận điểm hoàn toàn mới không liên quan" },
        { id: "opt_C", label: "C", text: "Thể hiện sự tương phản đối lập với ý trước đó" },
        { id: "opt_D", label: "D", text: "Bác bỏ luận điểm được đưa ra ở câu trước" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Diễn giải lại hoặc làm rõ hơn ý nghĩa và hệ quả trực tiếp của câu đứng trước",
      correctExplanation: "'In other words' (nói cách khác) là công cụ liên kết dùng để paraphrase, làm sáng tỏ hoặc đào sâu ý nghĩa hệ quả của mệnh đề trước đó.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Bổ sung thêm một luận điểm hoàn toàn mới không liên quan",
        diagnosticTitle: "Nhầm lẫn cụm giải thích 'In other words' với liên từ bổ sung",
        explanation: "Học sinh thường nhầm 'In other words' có vai trò thêm ý mới như 'In addition' hay 'Moreover'."
      }
    },
    {
      id: "master_w3d1_q10",
      roundIndex: 9,
      prompt: "Trong một bài viết Task 2 dài 250-280 từ, phân bổ số lượng câu lý tưởng cho một đoạn thân bài (Body paragraph) đạt chuẩn là bao nhiêu?",
      options: [
        { id: "opt_A", label: "A", text: "Khoảng 5 đến 6 câu phát triển đầy đủ 2 ý hỗ trợ trọng tâm" },
        { id: "opt_B", label: "B", text: "Chỉ đúng 2 câu thật dài chứa nhiều từ phức tạp" },
        { id: "opt_C", label: "C", text: "Khoảng 10 đến 12 câu ngắn liệt kê thật nhiều ý kiến" },
        { id: "opt_D", label: "D", text: "Tùy hứng, không cần cấu trúc số lượng câu cụ thể" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Khoảng 5 đến 6 câu phát triển đầy đủ 2 ý hỗ trợ trọng tâm",
      correctExplanation: "Theo cấu trúc chuẩn Master: 1 câu Topic Sentence + (Idea 1 + Dev 1) + (Idea 2 + Dev 2) = khoảng 5-6 câu hoàn chỉnh, giúp đoạn văn đạt độ sâu lý tưởng khoảng 90-110 từ mỗi thân bài.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Khoảng 10 đến 12 câu ngắn liệt kê thật nhiều ý kiến",
        diagnosticTitle: "Chiến thuật liệt kê nông cạn ý tưởng thay vì đào sâu lập luận",
        explanation: "Liệt kê quá nhiều câu ngắn khiến bài viết rơi vào lỗi 'ideas are presented but lack development', kẹt cứng ở Band 5.0."
      }
    }
  ],

  "WEEK 3 – DAY 2": [
    {
      id: "master_w3d2_q01",
      roundIndex: 0,
      prompt: "Trong kỹ năng làm bài TRUE - FALSE - NOT GIVEN của IELTS Reading, phát biểu được xác định là FALSE khi nào?",
      options: [
        { id: "opt_A", label: "A", text: "Khi thông tin trong câu đối lập hoặc mâu thuẫn trực tiếp với dữ kiện trong bài đọc" },
        { id: "opt_B", label: "B", text: "Khi bài đọc không hề đề cập đến chủ đề được nêu trong câu" },
        { id: "opt_C", label: "C", text: "Khi thí sinh không tìm thấy từ khóa chính xác y hệt trong bài đọc" },
        { id: "opt_D", label: "D", text: "Khi thông tin đó nghe có vẻ vô lý dựa trên kiến thức đời sống của thí sinh" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Khi thông tin trong câu đối lập hoặc mâu thuẫn trực tiếp với dữ kiện trong bài đọc",
      correctExplanation: "Nguyên tắc cốt tử của IELTS Reading: FALSE có nghĩa là bài đọc có đề cập nhưng dữ kiện đưa ra trái ngược hoàn toàn hoặc bị phủ định so với nhận định (Contradicted).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Khi bài đọc không hề đề cập đến chủ đề được nêu trong câu",
        diagnosticTitle: "Nhầm lẫn nghiêm trọng giữa định nghĩa FALSE và NOT GIVEN",
        explanation: "Nếu bài đọc không hề đề cập hoặc thiếu cơ sở khẳng định/phủ định thì đáp án phải là NOT GIVEN, không phải FALSE."
      }
    },
    {
      id: "master_w3d2_q02",
      roundIndex: 1,
      prompt: "Khi phân tích một nhận định TFNG, thành phần nào thường mang tính 'chốt chặn' dễ làm thay đổi bản chất đúng sai nhất?",
      options: [
        { id: "opt_A", label: "A", text: "Từ chỉ mức độ, tần suất hoặc phạm vi tuyệt đối như all, only, largely, always, some" },
        { id: "opt_B", label: "B", text: "Các danh từ riêng viết hoa chỉ tên người hoặc địa danh" },
        { id: "opt_C", label: "C", text: "Các liên từ chỉ thời gian đơn giản như before và after" },
        { id: "opt_D", label: "D", text: "Các giới từ chỉ vị trí quen thuộc như in và on" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Từ chỉ mức độ, tần suất hoặc phạm vi tuyệt đối như all, only, largely, always, some",
      correctExplanation: "Các 'Qualifiers' (từ hạn định) như 'only', 'all', 'never', 'solely' là bẫy kinh điển. Bài đọc nói 'most' hoặc 'some' nhưng nhận định khẳng định 'all/only' sẽ biến nhận định thành FALSE.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Các danh từ riêng viết hoa chỉ tên người hoặc địa danh",
        diagnosticTitle: "Nhầm lẫn giữa từ định vị vị trí và từ quyết định tính chân trị",
        explanation: "Tên riêng viết hoa chỉ dùng để định vị đoạn văn (Locating words), còn tính đúng/sai lại phụ thuộc vào từ hạn định và mối quan hệ vị ngữ."
      }
    },
    {
      id: "master_w3d2_q03",
      roundIndex: 2,
      prompt: "Đoạn văn trích: 'Her early artwork was influenced by the German aesthetic tradition, in which subjects of the natural world were depicted in a true to life manner.'\nNhận định: 'Artists in the German aesthetic tradition portrayed nature realistically.' Đáp án là gì?",
      options: [
        { id: "opt_A", label: "A", text: "TRUE" },
        { id: "opt_B", label: "B", text: "FALSE" },
        { id: "opt_C", label: "C", text: "NOT GIVEN" },
        { id: "opt_D", label: "D", text: "CANNOT BE DETERMINED" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. TRUE",
      correctExplanation: "Paraphrase hoàn toàn trùng khớp: 'subjects of the natural world' = 'nature'; 'depicted in a true to life manner' = 'portrayed realistically'. Thông tin khớp 100% nên đáp án là TRUE.",
      timeLimitSeconds: 25,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. NOT GIVEN",
        diagnosticTitle: "Không nhận diện được paraphrase giữa 'true to life' và 'realistically'",
        explanation: "Thí sinh không biết idiom học thuật 'true to life' đồng nghĩa với 'realistically' nên nghĩ bài đọc không nói tới tính chân thực."
      }
    },
    {
      id: "master_w3d2_q04",
      roundIndex: 3,
      prompt: "Đoạn văn trích: 'Margaret's first visit to Europe in 1904, and her studies in Paris, France had little impact on this naturalism that dominated her work from this early period.'\nNhận định: 'Margaret attended a famous art college in Paris.' Đáp án là gì?",
      options: [
        { id: "opt_A", label: "A", text: "NOT GIVEN" },
        { id: "opt_B", label: "B", text: "TRUE" },
        { id: "opt_C", label: "C", text: "FALSE" },
        { id: "opt_D", label: "D", text: "INCOMPLETE" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. NOT GIVEN",
      correctExplanation: "Bài đọc chỉ nói 'her studies in Paris, France' (việc học tập tại Paris), hoàn toàn không nhắc tới việc trường nghệ thuật cô theo học có 'famous' (nổi tiếng) hay không. Thiếu yếu tố xác thực -> NOT GIVEN.",
      timeLimitSeconds: 25,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. TRUE",
        diagnosticTitle: "Tự suy diễn dựa trên hiểu biết cá nhân về các trường đại học ở Paris",
        explanation: "Thí sinh suy đoán rằng ở Paris thì chắc là trường đại học nổi tiếng, đây là lỗi suy diễn ngoài văn bản."
      }
    },
    {
      id: "master_w3d2_q05",
      roundIndex: 4,
      prompt: "Đoạn văn trích: 'In England's West Country, she taught basket weaving at a rehabilitation unit for servicemen. It was on board a boat returning to Australia that she met wealthy businessman William Preston, whom she married in 1919.'\nNhận định: 'Margaret met her husband William while teaching a craft at a rehabilitation unit.' Đáp án là gì?",
      options: [
        { id: "opt_A", label: "A", text: "FALSE" },
        { id: "opt_B", label: "B", text: "TRUE" },
        { id: "opt_C", label: "C", text: "NOT GIVEN" },
        { id: "opt_D", label: "D", text: "NEITHER" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. FALSE",
      correctExplanation: "Nhận định nói cô gặp chồng 'trong khi dạy đan rổ tại trại phục hồi', nhưng bài đọc ghi rõ: 'It was on board a boat returning to Australia that she met wealthy businessman William Preston'. Địa điểm gặp gỡ mâu thuẫn trực tiếp -> FALSE.",
      timeLimitSeconds: 25,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. TRUE",
        diagnosticTitle: "Bỏ qua chi tiết mâu thuẫn về không gian và địa điểm",
        explanation: "Thí sinh thấy cả hai vế (dạy học và gặp chồng William) đều xuất hiện trong một đoạn văn nên vội vàng kết luận TRUE."
      }
    },
    {
      id: "master_w3d2_q06",
      roundIndex: 5,
      prompt: "Đoạn văn trích: 'Her first major showing in Australia was with her friend Thea Proctor, in exhibitions in Melbourne and Sydney in 1925.'\nNhận định: 'Margaret Preston and Thea Proctor explored similar themes in their art.' Đáp án là gì?",
      options: [
        { id: "opt_A", label: "A", text: "NOT GIVEN" },
        { id: "opt_B", label: "B", text: "TRUE" },
        { id: "opt_C", label: "C", text: "FALSE" },
        { id: "opt_D", label: "D", text: "BOTH A AND B" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. NOT GIVEN",
      correctExplanation: "Bài đọc chỉ nói cô tổ chức triển lãm chung với bạn Thea Proctor ('with her friend Thea Proctor, in exhibitions'), không có bất kỳ thông tin nào đề cập phong cách hay chủ đề tranh của Thea Proctor có tương tự tranh của Preston hay không. Do đó là NOT GIVEN.",
      timeLimitSeconds: 25,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. TRUE",
        diagnosticTitle: "Mặc định triển lãm chung đồng nghĩa với phong cách nghệ thuật giống nhau",
        explanation: "Thí sinh suy diễn rằng hai bạn thân triển lãm cùng nhau thì chủ đề nghệ thuật ắt hẳn phải giống nhau."
      }
    },
    {
      id: "master_w3d2_q07",
      roundIndex: 6,
      prompt: "Đoạn văn trích: 'Prior to this, the native flowers that featured in her paintings and prints had been purchased from local florists; they now grew in abundance around her home.'\nTừ 'Prior to this' chỉ mốc thời gian nào?",
      options: [
        { id: "opt_A", label: "A", text: "Trước giai đoạn chuyển đến sống tại Berowra từ năm 1932 đến 1939" },
        { id: "opt_B", label: "B", text: "Trước khi cô sinh ra tại Port Adelaide năm 1875" },
        { id: "opt_C", label: "C", text: "Trước cuộc triển lãm năm 1925 với Thea Proctor" },
        { id: "opt_D", label: "D", text: "Sau khi cô kết hôn với William Preston năm 1919" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Trước giai đoạn chuyển đến sống tại Berowra từ năm 1932 đến 1939",
      correctExplanation: "Cụm 'Prior to this' liên kết trực tiếp với câu trước đó: 'From 1932 to 1939, Preston moved away from Sydney and lived with her husband at Berowra'. Vậy 'this' chính là khoảng thời gian sống tại Berowra.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Trước cuộc triển lãm năm 1925 với Thea Proctor",
        diagnosticTitle: "Xác định sai tiền đề quy chiếu thời gian của đại từ 'this'",
        explanation: "Thí sinh tìm ngược quá xa lên đoạn văn phía trên thay vì kiểm tra câu liền kề ngay trước đó."
      }
    },
    {
      id: "master_w3d2_q08",
      roundIndex: 7,
      prompt: "Đoạn văn trích: 'Other prints from this period featured native flora. It was with these still-life subjects that she convinced the public that Australian native flowers were equal in beauty to any exotic species.'\nTừ 'exotic species' ở đây mang nghĩa là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Các loài hoa ngoại lai có nguồn gốc từ nước ngoài" },
        { id: "opt_B", label: "B", text: "Các loài hoa bản địa của nước Úc" },
        { id: "opt_C", label: "C", text: "Các loài sinh vật độc hại nguy hiểm" },
        { id: "opt_D", label: "D", text: "Các loài cây giả làm bằng nhựa" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Các loài hoa ngoại lai có nguồn gốc từ nước ngoài",
      correctExplanation: "'Exotic species' đặt trong thế đối sánh với 'native flowers' (hoa bản địa Úc) mang nghĩa các giống hoa nhập khẩu từ nước ngoài.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Các loài hoa bản địa của nước Úc",
        diagnosticTitle: "Hiểu nhầm từ đối lập thành từ đồng nghĩa",
        explanation: "Thí sinh nhầm 'exotic' thành từ đồng nghĩa với 'native'."
      }
    },
    {
      id: "master_w3d2_q09",
      roundIndex: 8,
      prompt: "Trong đoạn văn về thời gian sống ở Berowra: 'Preston's prints became larger, less complex and less reliant on the use of bright colours. Flowers were no longer arranged in vases...'\nĐặc điểm tranh in của Preston trong giai đoạn này là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Khổ lớn hơn, bố cục đơn giản hơn và ít phụ thuộc vào màu sắc rực rỡ" },
        { id: "opt_B", label: "B", text: "Nhỏ hơn, nhiều chi tiết phức tạp hơn và dùng nhiều màu đỏ sặc sỡ" },
        { id: "opt_C", label: "C", text: "Chỉ tập trung vẽ bình cắm hoa đắt tiền" },
        { id: "opt_D", label: "D", text: "Sử dụng hoàn toàn khung sơn mài đỏ kiểu Trung Quốc" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Khổ lớn hơn, bố cục đơn giản hơn và ít phụ thuộc vào màu sắc rực rỡ",
      correctExplanation: "Văn bản nêu rõ: 'became larger, less complex and less reliant on the use of bright colours' (khổ to hơn, ít phức tạp hơn và bớt phụ thuộc vào màu chói).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Nhỏ hơn, nhiều chi tiết phức tạp hơn và dùng nhiều màu đỏ sặc sỡ",
        diagnosticTitle: "Nhầm lẫn với đặc điểm tranh của giai đoạn triển lãm năm 1925 trước đó",
        explanation: "Tranh nhiều màu rực rỡ và khung sơn mài đỏ là đặc điểm của giai đoạn 1925 tại Sydney/Melbourne, không phải giai đoạn Berowra."
      }
    },
    {
      id: "master_w3d2_q10",
      roundIndex: 9,
      prompt: "Chiến thuật nào dưới đây là SAI LẦM PHỔ BIẾN NHẤT khi làm bài dạng TRUE - FALSE - NOT GIVEN?",
      options: [
        { id: "opt_A", label: "A", text: "Tự suy luận thông tin dựa vào kinh nghiệm thực tế của bản thân dù bài đọc không đề cập" },
        { id: "opt_B", label: "B", text: "Đối chiếu kỹ các từ hạn định mức độ như only, some, all" },
        { id: "opt_C", label: "C", text: "Xác định từ khóa định vị trong văn bản trước khi đọc hiểu chi tiết" },
        { id: "opt_D", label: "D", text: "Đọc kỹ câu chứa thông tin và câu liền kề để nắm ngữ cảnh" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Tự suy luận thông tin dựa vào kinh nghiệm thực tế của bản thân dù bài đọc không đề cập",
      correctExplanation: "Sai lầm nguy hiểm nhất là 'Extrapolation' (suy diễn ngoài văn bản). Trong IELTS, mọi kết luận bắt buộc phải căn cứ 100% vào văn bản.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Đối chiếu kỹ các từ hạn định mức độ như only, some, all",
        diagnosticTitle: "Coi kỹ năng đọc chuẩn xác là lỗi sai",
        explanation: "Đối chiếu từ hạn định là kỹ năng bắt buộc của học sinh đạt điểm cao, không phải sai lầm."
      }
    }
  ],

  "WEEK 3 – DAY 3": [
    {
      id: "master_w3d3_q01",
      roundIndex: 0,
      prompt: "Trong Speaking Part 1, khi được hỏi: 'Do you prefer cold or hot weather?', câu trả lời nào sau đây áp dụng chuẩn cấu trúc 'Giving feelings and opinions' theo giáo trình Master?",
      options: [
        { id: "opt_A", label: "A", text: "I definitely prefer cold weather. I find the crisp atmosphere to be far more refreshing, whereas hot weather makes me feel completely drained." },
        { id: "opt_B", label: "B", text: "I like cold weather. It is cold and I can wear jackets. Hot weather is hot so I don't like." },
        { id: "opt_C", label: "C", text: "Cold weather is better because of some reasons relating to my personal preference." },
        { id: "opt_D", label: "D", text: "I choose cold weather. There are many advantages of cold weather." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. I definitely prefer cold weather. I find the crisp atmosphere to be far more refreshing, whereas hot weather makes me feel completely drained.",
      correctExplanation: "Phương án A sử dụng nhuần nhuyễn hai cấu trúc trọng tâm của bài: 'I find something to be + adj' và 'makes me feel + adj', kết hợp từ vựng tự nhiên 'crisp atmosphere' và 'drained'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Cold weather is better because of some reasons relating to my personal preference.",
        diagnosticTitle: "Bê nguyên văn mẫu Task 2 vào Speaking Part 1 tạo cảm giác cứng nhắc",
        explanation: "Part 1 đòi hỏi sự tự nhiên linh hoạt, dùng các mẫu 'reasons relating to' biến câu nói thành bài thuyết trình máy móc."
      }
    },
    {
      id: "master_w3d3_q02",
      roundIndex: 1,
      prompt: "Điểm khác biệt ngữ nghĩa quan trọng nhất giữa 'The room is really hot' và 'The room is too hot' là gì?",
      options: [
        { id: "opt_A", label: "A", text: "'Really hot' chỉ mức độ nhiệt độ rất cao; còn 'Too hot' hàm ý vượt quá giới hạn chịu đựng và dẫn đến hậu quả tiêu cực" },
        { id: "opt_B", label: "B", text: "'Too hot' luôn mang nghĩa tích cực và ấm cúng" },
        { id: "opt_C", label: "C", text: "Cả hai cách nói hoàn toàn giống hệt nhau về ngữ nghĩa và sắc thái" },
        { id: "opt_D", label: "D", text: "'Really hot' chỉ dùng trong văn viết trang trọng, không dùng khi nói" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. 'Really hot' chỉ mức độ nhiệt độ rất cao; còn 'Too hot' hàm ý vượt quá giới hạn chịu đựng và dẫn đến hậu quả tiêu cực",
      correctExplanation: "Trong ngữ pháp tiếng Anh, 'too + adj' luôn mang nghĩa tiêu cực (vượt quá mức cần thiết dẫn đến việc không thể làm gì đó, ví dụ: 'too hot to study'). Còn 'really/very' chỉ đơn thuần nhấn mạnh cường độ.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Cả hai cách nói hoàn toàn giống hệt nhau về ngữ nghĩa và sắc thái",
        diagnosticTitle: "Đánh đồng 'too' với 'very/really'",
        explanation: "Nhiều người học nhầm tưởng 'too' chỉ là từ tăng cấp độ như 'very', mà không biết 'too' kéo theo hệ quả tiêu cực."
      }
    },
    {
      id: "master_w3d3_q03",
      roundIndex: 2,
      prompt: "Chọn câu viết lại đúng cấu trúc để diễn đạt: 'Căn phòng nóng đến mức tôi không thể tập trung học bài được.'?",
      options: [
        { id: "opt_A", label: "A", text: "The room is so hot that I cannot focus on my studies." },
        { id: "opt_B", label: "B", text: "The room is very hot so that I cannot focus on my studies." },
        { id: "opt_C", label: "C", text: "The room is too hot that I cannot focus on my studies." },
        { id: "opt_D", label: "D", text: "The room is such hot that I cannot focus on my studies." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. The room is so hot that I cannot focus on my studies.",
      correctExplanation: "Cấu trúc chuẩn: 'so + adj + that + clause' (quá... đến nỗi mà...). Phương án B sai vì 'so that' chỉ mục đích (để mà). Phương án C sai cấu trúc kết hợp 'too... that'. Phương án D sai vì 'such' phải đi với danh từ.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. The room is too hot that I cannot focus on my studies.",
        diagnosticTitle: "Lẫn lộn giữa 'too... to V' và 'so... that'",
        explanation: "Thí sinh ghép bừa 'too hot that', trong khi cấu trúc chuẩn phải là 'too hot to focus' hoặc 'so hot that I cannot focus'."
      }
    },
    {
      id: "master_w3d3_q04",
      roundIndex: 3,
      prompt: "Khi giám khảo hỏi: 'What do you think about working from home?', câu trả lời nào sau đây thể hiện khả năng diễn đạt cảm xúc và ý kiến ở trình độ 6.0+?",
      options: [
        { id: "opt_A", label: "A", text: "I love the feeling of working in my own quiet space, though sometimes staying inside all day makes me feel somewhat isolated." },
        { id: "opt_B", label: "B", text: "Working from home is good. I work at home and I don't go to office. It has many advantages." },
        { id: "opt_C", label: "C", text: "Working from home is a popular trend in contemporary society with numerous positives." },
        { id: "opt_D", label: "D", text: "I think working from home is very okay because my bed is near my laptop." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. I love the feeling of working in my own quiet space, though sometimes staying inside all day makes me feel somewhat isolated.",
      correctExplanation: "Câu trả lời kết hợp hoàn hảo cấu trúc 'I love the feeling of doing something' và 'makes me feel + adj', đưa ra góc nhìn đa chiều (thoải mái nhưng đôi khi bị cô lập), thể hiện tư duy Band 6.5.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Working from home is a popular trend in contemporary society with numerous positives.",
        diagnosticTitle: "Trả lời theo phong cách học vẹt lý thuyết sáo rỗng",
        explanation: "Câu C nghe như phần mở đầu bài văn Task 2, hoàn toàn không trả lời được cảm nhận cá nhân của người nói trong Part 1."
      }
    },
    {
      id: "master_w3d3_q05",
      roundIndex: 4,
      prompt: "Trong IELTS Speaking Part 2 với chủ đề: 'Describe an object that is important to you', thí sinh nên mở đầu như thế nào để tạo ấn tượng tự nhiên và hấp dẫn?",
      options: [
        { id: "opt_A", label: "A", text: "Giới thiệu trực tiếp món đồ kèm bối cảnh nhận được nó và ý nghĩa cảm xúc đặc biệt mà nó mang lại" },
        { id: "opt_B", label: "B", text: "Đọc to từng câu gợi ý trong Cue Card theo thứ tự từ trên xuống dưới" },
        { id: "opt_C", label: "C", text: "Bắt đầu bằng một định nghĩa triết học dài dòng về giá trị của vật chất trong thế giới hiện đại" },
        { id: "opt_D", label: "D", text: "Liệt kê danh sách tất cả các đồ dùng công nghệ mà mình từng sở hữu trong đời" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Giới thiệu trực tiếp món đồ kèm bối cảnh nhận được nó và ý nghĩa cảm xúc đặc biệt mà nó mang lại",
      correctExplanation: "Cách tiếp cận hiệu quả nhất trong Part 2 là đi thẳng vào trọng tâm: định danh món đồ (ví dụ: chiếc đồng hồ đeo tay cũ) và bối cảnh (món quà ông nội tặng), giúp duy trì mạch cảm xúc xuyên suốt 2 phút.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Đọc to từng câu gợi ý trong Cue Card theo thứ tự từ trên xuống dưới",
        diagnosticTitle: "Phụ thuộc máy móc vào từng câu hỏi gợi ý của Cue Card",
        explanation: "Thí sinh đọc từng câu trong Cue Card làm bài nói bị phân mảnh, giống một cuộc phỏng vấn hỏi-đáp cụt ngủn."
      }
    },
    {
      id: "master_w3d3_q06",
      roundIndex: 5,
      prompt: "Để mô tả một món đồ công nghệ (ví dụ: máy đọc sách Kindle hoặc tai nghe chống ồn), cụm collocation học thuật nào sau đây là phù hợp nhất?",
      options: [
        { id: "opt_A", label: "A", text: "an indispensable gadget that enhances my daily focus and productivity" },
        { id: "opt_B", label: "B", text: "a very good machine which I like very very much" },
        { id: "opt_C", label: "C", text: "a thing that has many functions to do things" },
        { id: "opt_D", label: "D", text: "an expensive electronic equipment of my house" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. an indispensable gadget that enhances my daily focus and productivity",
      correctExplanation: "Cụm 'indispensable gadget' (thiết bị không thể thiếu) và 'enhances focus and productivity' (nâng cao khả năng tập trung và năng suất) là cụm từ vựng band 6.5–7.0 chính xác và tự nhiên.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. an expensive electronic equipment of my house",
        diagnosticTitle: "Dùng mạo từ 'an' trước danh từ không đếm được 'equipment'",
        explanation: "Equipment là danh từ không đếm được, dùng 'an equipment' là lỗi ngữ pháp cơ bản."
      }
    },
    {
      id: "master_w3d3_q07",
      roundIndex: 6,
      prompt: "Chọn phương án hoàn thiện câu trả lời: 'Do you enjoy reading physical books?' -> 'Yes, absolutely. I [...] turning the paper pages and smelling the fresh print.'?",
      options: [
        { id: "opt_A", label: "A", text: "love the tactile sensation of" },
        { id: "opt_B", label: "B", text: "have very good feelings when" },
        { id: "opt_C", label: "C", text: "find it is interesting of" },
        { id: "opt_D", label: "D", text: "am addicted by" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. love the tactile sensation of",
      correctExplanation: "'The tactile sensation of turning paper pages' (cảm giác xúc giác khi lật từng trang giấy) là cách diễn đạt biểu cảm cao cấp rất được ưa chuộng trong Speaking Band 6.5+.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. find it is interesting of",
        diagnosticTitle: "Cấu trúc 'find it' sai ngữ pháp",
        explanation: "Cấu trúc đúng phải là 'find it + adj + to V', không có 'find it is interesting of'."
      }
    },
    {
      id: "master_w3d3_q08",
      roundIndex: 7,
      prompt: "Khi giám khảo hỏi: 'Do you prefer traveling by plane or by train?', cách trả lời nào sau đây tránh được bẫy trả lời cộc lốc một từ?",
      options: [
        { id: "opt_A", label: "A", text: "I would lean towards traveling by train because I find watching the changing scenery to be therapeutic, even though flying is considerably faster." },
        { id: "opt_B", label: "B", text: "Train. Because plane is very fast but dangerous." },
        { id: "opt_C", label: "C", text: "I prefer train because I like it." },
        { id: "opt_D", label: "D", text: "Both are okay for me." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. I would lean towards traveling by train because I find watching the changing scenery to be therapeutic, even though flying is considerably faster.",
      correctExplanation: "Mẫu câu mở rộng tự nhiên: dùng 'I would lean towards...', kết hợp 'find something to be therapeutic' (thấy cái gì đó mang lại cảm giác thư thái chữa lành) và mệnh đề nhượng bộ 'even though flying is considerably faster'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Train. Because plane is very fast but dangerous.",
        diagnosticTitle: "Bắt đầu bằng từ đơn lẻ và bắt đầu câu sau bằng 'Because'",
        explanation: "Lỗi trả lời cộc lốc rồi nói câu vụn 'Because...' khiến điểm Fluency & Coherence bị trừ nặng."
      }
    },
    {
      id: "master_w3d3_q09",
      roundIndex: 8,
      prompt: "Trong cấu trúc: 'It is too [adj] for somebody to do something', nghĩa thực sự của câu là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Quá... đến mức người đó KHÔNG THỂ thực hiện được hành động đó" },
        { id: "opt_B", label: "B", text: "Rất dễ dàng để người đó thực hiện hành động đó" },
        { id: "opt_C", label: "C", text: "Người đó nhất định phải làm hành động đó bằng mọi giá" },
        { id: "opt_D", label: "D", text: "Hành động đó đã được người đó hoàn thành trong quá khứ" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Quá... đến mức người đó KHÔNG THỂ thực hiện được hành động đó",
      correctExplanation: "'Too... to' mang hàm nghĩa phủ định ngầm: ví dụ 'The coffee is too hot for me to drink' = Cà phê quá nóng nên tôi không thể uống được.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Rất dễ dàng để người đó thực hiện hành động đó",
        diagnosticTitle: "Không nhận ra bản chất phủ định ngầm của cấu trúc 'too... to'",
        explanation: "Thí sinh nhìn câu không thấy 'not' nên tưởng câu mang nghĩa khẳng định bình thường."
      }
    },
    {
      id: "master_w3d3_q10",
      roundIndex: 9,
      prompt: "Để kết thúc bài nói Part 2 mô tả một món đồ kỷ niệm, cách khép lại nào sau đây để lại ấn tượng tốt nhất về mặt Fluency?",
      options: [
        { id: "opt_A", label: "A", text: "Khẳng định lại giá trị tinh thần bền vững của món đồ và lý do bạn sẽ luôn gìn giữ nó cẩn thận trong tương lai" },
        { id: "opt_B", label: "B", text: "Im lặng hoàn toàn và nhìn chằm chằm vào giám khảo chờ hết 2 phút" },
        { id: "opt_C", label: "C", text: "Nói to câu: 'That is all I want to say, thank you.'" },
        { id: "opt_D", label: "D", text: "Bắt đầu chuyển sang nói về giá tiền cụ thể mà bạn muốn bán nó đi" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Khẳng định lại giá trị tinh thần bền vững của món đồ và lý do bạn sẽ luôn gìn giữ nó cẩn thận trong tương lai",
      correctExplanation: "Một cái kết tự nhiên gắn với giá trị cảm xúc (sentimental value) và lời hứa tương lai (I will definitely cherish it for years to come) là dấu hiệu của một phần thi Part 2 trọn vẹn và tự tin.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Nói to câu: 'That is all I want to say, thank you.'",
        diagnosticTitle: "Dùng mẫu câu kết đóng máy móc làm đứt mạch tự nhiên của bài nói",
        explanation: "Nói 'That is all' thể hiện sự hết vốn từ và lúng túng, không được đánh giá cao trong tiêu chí Coherence."
      }
    }
  ]
};
