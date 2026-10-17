/**
 * BUILDER ARENA QUESTION BANK - WEEK 5
 * Source: Giáo trình BUILDER 2027 - Đã soát lỗi.docx & Giáo án Builder 2027
 * Target: Band 5.0 IELTS
 */

export const BUILDER_WEEK_5_QUESTIONS: Record<string, any[]> = {
  "WEEK 5 – DAY 1": [
    {
        id: "builder_w5d1_q01",
        roundIndex: 0,
        prompt: "Để nâng band điểm Grammar từ 5.0 lên 6.5+, thí sinh cần ưu tiên thay đổi chiến lược nào trong cách viết câu?",
        options: [
          { id: "opt_A", label: "A", text: "Hạn chế chuỗi câu đơn ngắn rời rạc và kết hợp linh hoạt các câu phức" },
          { id: "opt_B", label: "B", text: "Chỉ viết toàn bộ các câu đơn thật dài có chứa nhiều liên từ 'and'" },
          { id: "opt_C", label: "C", text: "Luôn viết câu dài trên 50 từ với thật nhiều mệnh đề quan hệ lồng ghép" },
          { id: "opt_D", label: "D", text: "Tránh dùng tất cả các mệnh đề phụ thuộc để giữ câu luôn rõ ràng" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. Hạn chế chuỗi câu đơn ngắn rời rạc và kết hợp linh hoạt các câu phức",
        correctExplanation: "Tiêu chí Grammatical Range and Accuracy yêu cầu sử dụng đa dạng các cấu trúc câu phức (complex sentences) một cách chuẩn xác, tránh lạm dụng câu đơn ngắn hoặc câu ghép bằng 'and'.",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_C",
          baitOptionText: "C. Luôn viết câu dài trên 50 từ với thật nhiều mệnh đề quan hệ lồng ghép",
          diagnosticTitle: "Ảo tưởng câu càng dài điểm càng cao",
          explanation: "Viết câu quá dài (trên 35-40 từ) dễ dẫn đến mất kiểm soát cấu trúc ngữ pháp (run-on sentences), làm giảm điểm mạch lạc và chính xác."
        }
      },
      {
        id: "builder_w5d1_q02",
        roundIndex: 1,
        prompt: "Cấu trúc \", which + Finite Verb\" ở cuối câu phức thường được dùng với mục đích gì trong văn phong Task 2?",
        options: [
          { id: "opt_A", label: "A", text: "Đưa ra bình luận hoặc nêu hệ quả tác động trực tiếp của cả mệnh đề trước" },
          { id: "opt_B", label: "B", text: "Thay thế cho một danh từ chỉ người đứng ngay liền kề trước dấu phẩy" },
          { id: "opt_C", label: "C", text: "Bắt đầu một đoạn thân bài mới để thu hút sự chú ý của người đọc" },
          { id: "opt_D", label: "D", text: "Dẫn chứng số liệu thống kê cụ thể từ các nghiên cứu khoa học" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. Đưa ra bình luận hoặc nêu hệ quả tác động trực tiếp của cả mệnh đề trước",
        correctExplanation: "Non-defining relative clause với 'which' đứng sau dấu phẩy quy chiếu cho toàn bộ mệnh đề phía trước để chỉ hệ quả: ', which makes it easier for...' hoặc ', which contributes to...'.",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_B",
          baitOptionText: "B. Thay thế cho một danh từ chỉ người đứng ngay liền kề trước dấu phẩy",
          diagnosticTitle: "Nhầm lẫn đại từ quan hệ chỉ người và mệnh đề bình luận",
          explanation: "'which' không bao giờ thay thế cho danh từ chỉ người (danh từ chỉ người dùng 'who/whom'). Trong cấu trúc này, 'which' thay thế cho toàn bộ sự việc phía trước."
        }
      },
      {
        id: "builder_w5d1_q03",
        roundIndex: 2,
        prompt: "Chọn cách kết hợp hai câu sau thành một câu phức chuẩn xác: \"Urban centers house many industries. It is easier for residents there to find employment.\"",
        options: [
          { id: "opt_A", label: "A", text: "Urban centers house many industries, which makes it easier for residents to find employment." },
          { id: "opt_B", label: "B", text: "Urban centers house many industries which making it easier for residents to find employment." },
          { id: "opt_C", label: "C", text: "Urban centers house many industries, it makes easier for residents finding employment." },
          { id: "opt_D", label: "D", text: "Urban centers house many industries, that makes it easier for residents to find employment." },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. Urban centers house many industries, which makes it easier for residents to find employment.",
        correctExplanation: "Kết hợp bằng mệnh đề không xác định ', which + makes it easier for...'. 'that' không được đứng sau dấu phẩy (loại D), câu B thiếu Finite Verb, câu C mắc lỗi Comma Splice.",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_D",
          baitOptionText: "D. Urban centers house many industries, that makes it easier for residents to find employment.",
          diagnosticTitle: "Dùng 'that' trong mệnh đề có dấu phẩy",
          explanation: "Quy tắc ngữ pháp căn bản: 'that' không bao giờ được dùng sau dấu phẩy trong mệnh đề quan hệ không xác định."
        }
      },
      {
        id: "builder_w5d1_q04",
        roundIndex: 3,
        prompt: "Collocation nào dưới đây mang nghĩa 'thoát khỏi vòng luẩn quẩn của sự nghèo đói'?",
        options: [
          { id: "opt_A", label: "A", text: "break the cycle of poverty" },
          { id: "opt_B", label: "B", text: "stop the circle of poverty" },
          { id: "opt_C", label: "C", text: "destroy the round of poverty" },
          { id: "opt_D", label: "D", text: "finish the loop of poverty" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. break the cycle of poverty",
        correctExplanation: "Collocation học thuật chuẩn xác: 'break the cycle of poverty' (phá vỡ vòng luẩn quẩn của sự nghèo khó).",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_B",
          baitOptionText: "B. stop the circle of poverty",
          diagnosticTitle: "Dịch từng chữ (word-by-word) từ tiếng Việt",
          explanation: "Tiếng Việt gọi là 'vòng tròn nghèo đói', học sinh dịch thành 'circle' hoặc 'round' thay vì collocation chuẩn là 'cycle'."
        }
      },
      {
        id: "builder_w5d1_q05",
        roundIndex: 4,
        prompt: "Hoàn thiện câu học thuật: \"Many youths migrate to cities in search of work, [......] in rural areas.\"",
        options: [
          { id: "opt_A", label: "A", text: "which results in a severe shortage of labor" },
          { id: "opt_B", label: "B", text: "which result in a severe shortage of labor" },
          { id: "opt_C", label: "C", text: "causing it has a severe shortage of labor" },
          { id: "opt_D", label: "D", text: "and this make a severe shortage of labor" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. which results in a severe shortage of labor",
        correctExplanation: "Mệnh đề ', which' thay thế cho toàn bộ sự việc trước đó là ngôi thứ ba số ít, do đó động từ phải chia số ít: 'results in'. Cụm từ 'a severe shortage of labor' (thiếu hụt lao động trầm trọng) là collocation cao cấp.",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_B",
          baitOptionText: "B. which result in a severe shortage of labor",
          diagnosticTitle: "Chia động từ số nhiều do nhìn thấy 'cities' hoặc 'youths'",
          explanation: "Học sinh nhìn vào danh từ số nhiều đứng gần nhất ('youths/cities') mà quên rằng 'which' đại diện cho cả sự việc di cư, do đó động từ phải chia số ít 'results'."
        }
      },
      {
        id: "builder_w5d1_q06",
        roundIndex: 5,
        prompt: "Khi phát triển một Supporting Idea trong đoạn thân bài Task 2, chuỗi diễn giải logic chuẩn gồm các bước nào?",
        options: [
          { id: "opt_A", label: "A", text: "Core Idea -> Reason giải thích nguyên nhân -> Impact nêu tác động cụ thể" },
          { id: "opt_B", label: "B", text: "Core Idea -> Nêu lại định nghĩa từ điển -> Đưa ra ý kiến cá nhân" },
          { id: "opt_C", label: "C", text: "Topic Sentence -> Dịch sang tiếng Việt -> Khẳng định lại quan điểm" },
          { id: "opt_D", label: "D", text: "Liệt kê thật nhiều ý tưởng ngắn không cần giải thích hay chứng minh" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. Core Idea -> Reason giải thích nguyên nhân -> Impact nêu tác động cụ thể",
        correctExplanation: "Một luận điểm thuyết phục cần đi từ Ý cốt lõi (Core Idea) -> Giải thích nguyên nhân hoặc cơ chế tại sao (Reason/Mechanism) -> Hệ quả thực tế lên đối tượng (Impact/Result).",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_D",
          baitOptionText: "D. Liệt kê thật nhiều ý tưởng ngắn không cần giải thích hay chứng minh",
          diagnosticTitle: "Lỗi liệt kê dàn trải thiếu chiều sâu",
          explanation: "Liệt kê quá nhiều ý mà không phát triển sẽ bị trừ nặng ở tiêu chí Task Achievement và Coherence & Cohesion."
        }
      },
      {
        id: "builder_w5d1_q07",
        roundIndex: 6,
        prompt: "Để kiểm soát tốt cấu trúc câu phức trong Task 2, độ dài khuyến nghị cho mỗi câu thường là bao nhiêu?",
        options: [
          { id: "opt_A", label: "A", text: "Khoảng 15 đến 25 từ, gồm 2 đến 3 mệnh đề liên kết chặt chẽ" },
          { id: "opt_B", label: "B", text: "Khoảng 45 đến 60 từ, chứa từ 5 đến 6 mệnh đề phụ thuộc" },
          { id: "opt_C", label: "C", text: "Dưới 8 từ để tránh tuyệt đối mọi lỗi ngữ pháp có thể xảy ra" },
          { id: "opt_D", label: "D", text: "Càng dài càng tốt và không nên có dấu chấm ngắt câu trong đoạn" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. Khoảng 15 đến 25 từ, gồm 2 đến 3 mệnh đề liên kết chặt chẽ",
        correctExplanation: "Giáo trình khuyến nghị mỗi câu nên chứa tối đa 2-3 mệnh đề và độ dài lý tưởng là 15-25 từ để đảm bảo cấu trúc sáng sủa, vừa đủ phức hợp vừa hạn chế sai sót.",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_B",
          baitOptionText: "B. Khoảng 45 đến 60 từ, chứa từ 5 đến 6 mệnh đề phụ thuộc",
          diagnosticTitle: "Cố ép câu quá dài làm vỡ cấu trúc ngữ pháp",
          explanation: "Viết câu 45-60 từ với 5-6 mệnh đề là nguyên nhân hàng đầu khiến thí sinh bị lạc chủ ngữ, sai chia động từ và mất điểm ngữ pháp."
        }
      },
      {
        id: "builder_w5d1_q08",
        roundIndex: 7,
        prompt: "Collocation nào thể hiện việc có được một công việc tốt và tự nuôi sống bản thân cùng gia đình?",
        options: [
          { id: "opt_A", label: "A", text: "secure a decent job and provide for their families" },
          { id: "opt_B", label: "B", text: "take an easy job and supply for their families" },
          { id: "opt_C", label: "C", text: "make a high work and feed on their families" },
          { id: "opt_D", label: "D", text: "catch a good employment and give to their families" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. secure a decent job and provide for their families",
        correctExplanation: "'secure a decent job' (có được công việc tốt/ổn định) và 'provide for one's family' (chu cấp, nuôi sống gia đình) là các collocations học thuật tự nhiên.",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_B",
          baitOptionText: "B. take an easy job and supply for their families",
          diagnosticTitle: "Dùng động từ 'supply' sai ngữ cảnh gia đình",
          explanation: "'supply' dùng cho hàng hóa vật tư thương mại, không dùng cho nghĩa chu cấp người thân ('provide for')."
        }
      },
      {
        id: "builder_w5d1_q09",
        roundIndex: 8,
        prompt: "Điền cụm từ phù hợp: \"Some rural communities are investing in eco-tourism, [......] the local economy.\"",
        options: [
          { id: "opt_A", label: "A", text: "which contributes to boosting" },
          { id: "opt_B", label: "B", text: "which contribute to boost" },
          { id: "opt_C", label: "C", text: "which is contribute to boosting" },
          { id: "opt_D", label: "D", text: "and contributing to boost" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. which contributes to boosting",
        correctExplanation: "Cấu trúc 'contribute to + V-ing': góp phần làm gì. Động từ chia số ít 'contributes' vì thay thế cho cả hành động đầu tư vào du lịch sinh thái.",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_B",
          baitOptionText: "B. which contribute to boost",
          diagnosticTitle: "Sai cấu trúc 'contribute to' đi với V-ing",
          explanation: "Giới từ 'to' trong 'contribute to' là một preposition đòi hỏi Gerund (V-ing), không phải to-infinitive."
        }
      },
      {
        id: "builder_w5d1_q10",
        roundIndex: 9,
        prompt: "Câu văn: \"Cities provide lucrative jobs. Young people can gain financial independence.\" được kết hợp thành câu phức chuẩn nhất bằng cách nào?",
        options: [
          { id: "opt_A", label: "A", text: "Cities offer lucrative positions, which enables young people to gain financial independence." },
          { id: "opt_B", label: "B", text: "Cities offer lucrative positions because young people can gain financial independence." },
          { id: "opt_C", label: "C", text: "Cities offer lucrative positions, so that young people gain financial independence." },
          { id: "opt_D", label: "D", text: "Cities offering lucrative positions enables young people gaining financial independence." },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. Cities offer lucrative positions, which enables young people to gain financial independence.",
        correctExplanation: "Câu A dùng từ vựng 'lucrative positions' (công việc thu nhập cao) và liên kết bằng mệnh đề quan hệ chỉ kết quả ', which enables someone to do something'.",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_B",
          baitOptionText: "B. Cities offer lucrative positions because young people can gain financial independence.",
          diagnosticTitle: "Đảo ngược quan hệ nguyên nhân và kết quả",
          explanation: "Việc thành phố có việc lương cao là NGUYÊN NHÂN, còn người trẻ tự chủ tài chính là KẾT QUẢ. Dùng 'because' ở câu B biến kết quả thành nguyên nhân."
        }
      },
  ],
  "WEEK 5 – DAY 2": [
    {
        id: "builder_w5d2_q01",
        roundIndex: 0,
        prompt: "Nghiên cứu của nhóm các nhà khoa học Snedeker, Geren và Shafto tại Harvard tập trung vào đối tượng trẻ em nào?",
        options: [
          { id: "opt_A", label: "A", text: "Trẻ em Trung Quốc lớn tuổi hơn được các gia đình Mỹ nhận nuôi học tiếng Anh" },
          { id: "opt_B", label: "B", text: "Trẻ sơ sinh bản xứ sinh ra và lớn lên hoàn toàn tại các gia đình ở Mỹ" },
          { id: "opt_C", label: "C", text: "Người lớn tuổi di cư sang Mỹ nhưng không biết tiếng Anh" },
          { id: "opt_D", label: "D", text: "Những trẻ em khiếm thính được dạy ngôn ngữ ký hiệu từ nhỏ" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. Trẻ em Trung Quốc lớn tuổi hơn được các gia đình Mỹ nhận nuôi học tiếng Anh",
        correctExplanation: "Nghiên cứu khảo sát trẻ em được nhận nuôi từ Trung Quốc (internationally adopted children) ở độ tuổi mẫu giáo bắt đầu học tiếng Anh muộn hơn so với trẻ sơ sinh bản xứ Mỹ.",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_B",
          baitOptionText: "B. Trẻ sơ sinh bản xứ sinh ra và lớn lên hoàn toàn tại các gia đình ở Mỹ",
          diagnosticTitle: "Nhầm lẫn nhóm đối tượng thử nghiệm và nhóm đối chứng",
          explanation: "Nghiên cứu dùng trẻ được nhận nuôi từ nước ngoài để kiểm tra xem não bộ trưởng thành hơn có giúp trẻ bỏ qua giai đoạn bập bẹ (babytalk) hay không."
        }
      },
      {
        id: "builder_w5d2_q02",
        roundIndex: 1,
        prompt: "Phát hiện quan trọng nhất từ nghiên cứu của các nhà khoa học Harvard về nhóm trẻ nhận nuôi là gì?",
        options: [
          { id: "opt_A", label: "A", text: "Dù não bộ trưởng thành hơn, trẻ vẫn phải trải qua từng giai đoạn một từ, hai từ như trẻ sơ sinh" },
          { id: "opt_B", label: "B", text: "Bộ não trưởng thành hơn giúp trẻ nói ngay lập tức các câu hoàn chỉnh như người lớn" },
          { id: "opt_C", label: "C", text: "Trẻ nhận nuôi hoàn toàn không thể học được bất kỳ từ tiếng Anh nào sau 2 tuổi" },
          { id: "opt_D", label: "D", text: "Trẻ học ngữ pháp tiếng Anh nhanh hơn gấp mười lần so với trẻ sinh ra ở Mỹ" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. Dù não bộ trưởng thành hơn, trẻ vẫn phải trải qua từng giai đoạn một từ, hai từ như trẻ sơ sinh",
        correctExplanation: "Bài đọc: 'having more mature brains did not help the adoptees avoid the toddler-talk stage... the one-word stage will give way to the two-word stage and so on.'",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_B",
          baitOptionText: "B. Bộ não trưởng thành hơn giúp trẻ nói ngay lập tức các câu hoàn chỉnh như người lớn",
          diagnosticTitle: "Suy đoán ngược với kết quả thực nghiệm",
          explanation: "Nghiên cứu chứng minh rằng dù não có lớn hơn thì việc học ngôn ngữ vẫn phải tuân theo các bước tuần tự tích lũy từ vựng chứ không thể đốt cháy giai đoạn."
        }
      },
      {
        id: "builder_w5d2_q03",
        roundIndex: 2,
        prompt: "Theo bài đọc, lý do thực sự khiến trẻ mới tập nói dùng ngôn ngữ bập bẹ (babytalk) là gì?",
        options: [
          { id: "opt_A", label: "A", text: "Trẻ mới bắt đầu học và cần thời gian để tích lũy đủ vốn từ vựng" },
          { id: "opt_B", label: "B", text: "Bộ não của trẻ sơ sinh chưa phát triển đủ vùng vỏ não ngôn ngữ" },
          { id: "opt_C", label: "C", text: "Người lớn xung quanh cố tình bắt chước giọng ngọng nghịu của trẻ" },
          { id: "opt_D", label: "D", text: "Cơ vòm họng và dây thanh quản của trẻ chưa đủ cứng cáp để phát âm" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. Trẻ mới bắt đầu học và cần thời gian để tích lũy đủ vốn từ vựng",
        correctExplanation: "Đoạn văn khẳng định: '...babies speak in babytalk not because they have baby brains, but because they have only just started learning and need time to gain enough vocabulary.'",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_B",
          baitOptionText: "B. Bộ não của trẻ sơ sinh chưa phát triển đủ vùng vỏ não ngôn ngữ",
          diagnosticTitle: "Chọn giả thuyết 'baby brains' đã bị nghiên cứu bác bỏ",
          explanation: "Trước đây người ta tin trẻ nói bập bẹ vì não còn non nớt ('baby brains'), nhưng nghiên cứu trên trẻ nhận nuôi có não trưởng thành vẫn nói bập bẹ đã bác bỏ điều này."
        }
      },
      {
        id: "builder_w5d2_q04",
        roundIndex: 3,
        prompt: "Khái niệm 'critical period' (giai đoạn vàng / thời kỳ quyết định) trong bài đọc đề cập đến điều gì?",
        options: [
          { id: "opt_A", label: "A", text: "Thời kỳ mà việc tiếp thu ngôn ngữ diễn ra hiệu quả nhất để đạt sự lưu loát bản xứ" },
          { id: "opt_B", label: "B", text: "Thời điểm người lớn bắt đầu mất trí nhớ và quên dần tiếng mẹ đẻ" },
          { id: "opt_C", label: "C", text: "Giai đoạn học sinh phải thi các chứng chỉ quốc tế trước khi trưởng thành" },
          { id: "opt_D", label: "D", text: "Khoảng thời gian bác sĩ phải can thiệp để chữa tật nói lắp cho trẻ em" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. Thời kỳ mà việc tiếp thu ngôn ngữ diễn ra hiệu quả nhất để đạt sự lưu loát bản xứ",
        correctExplanation: "Đoạn cuối định nghĩa 'critical period' là giai đoạn phát triển ngôn ngữ của trẻ, sau thời kỳ này người học trưởng thành hiếm khi đạt được độ thuần thục như người bản xứ.",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_B",
          baitOptionText: "B. Thời điểm người lớn bắt đầu mất trí nhớ và quên dần tiếng mẹ đẻ",
          diagnosticTitle: "Hiểu sai khái niệm ngôn ngữ học thành bệnh lý lão khoa",
          explanation: "'Critical period hypothesis' là một lý thuyết kinh điển về độ tuổi tiếp thu ngôn ngữ tự nhiên tối ưu ở trẻ nhỏ, không liên quan đến mất trí nhớ."
        }
      },
      {
        id: "builder_w5d2_q05",
        roundIndex: 4,
        prompt: "Điểm khác biệt duy nhất giữa tiến trình học tiếng Anh của trẻ nhận nuôi và trẻ sinh ra tại Mỹ là gì?",
        options: [
          { id: "opt_A", label: "A", text: "Tốc độ tích lũy ngôn ngữ của trẻ nhận nuôi diễn ra nhanh hơn" },
          { id: "opt_B", label: "B", text: "Những từ vựng đầu tiên mà trẻ nhận nuôi thốt ra hoàn toàn khác biệt" },
          { id: "opt_C", label: "C", text: "Cách thức não bộ của hai nhóm tiếp thu ngữ pháp đi theo hai hướng khác nhau" },
          { id: "opt_D", label: "D", text: "Trẻ nhận nuôi không bao giờ trải qua giai đoạn nói câu một từ" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. Tốc độ tích lũy ngôn ngữ của trẻ nhận nuôi diễn ra nhanh hơn",
        correctExplanation: "Bài đọc cho thấy trẻ nhận nuôi lớn hơn về mặt thể chất và nhận thức nên tốc độ ('rate of acquisition') diễn ra nhanh hơn, nhưng vẫn đi qua tuần tự các giai đoạn giống hệt nhau.",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_B",
          baitOptionText: "B. Những từ vựng đầu tiên mà trẻ nhận nuôi thốt ra hoàn toàn khác biệt",
          diagnosticTitle: "Đoán mò chi tiết không có trong bài",
          explanation: "Bài đọc ghi nhận những từ đầu tiên và trật tự phát triển cấu trúc ngữ pháp giữa hai nhóm là tương đồng, chỉ có tốc độ học nhanh hơn."
        }
      },
      {
        id: "builder_w5d2_q06",
        roundIndex: 5,
        prompt: "Từ 'gradual' trong câu: \"Learning how to chat like an adult is a gradual process\" đồng nghĩa với từ nào?",
        options: [
          { id: "opt_A", label: "A", text: "step-by-step" },
          { id: "opt_B", label: "B", text: "instant" },
          { id: "opt_C", label: "C", text: "sudden" },
          { id: "opt_D", label: "D", text: "temporary" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. step-by-step",
        correctExplanation: "'gradual' nghĩa là diễn ra từ từ, theo từng bước tuần tự (step-by-step/progressive), trái ngược với 'instant' (ngay lập tức) hay 'sudden' (đột ngột).",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_B",
          baitOptionText: "B. instant",
          diagnosticTitle: "Chọn từ trái nghĩa với văn cảnh",
          explanation: "'instant' mang nghĩa tức thì, trái ngược hoàn toàn với tiến trình tích lũy từ tốn, lâu dài của việc thụ đắc ngôn ngữ."
        }
      },
      {
        id: "builder_w5d2_q07",
        roundIndex: 6,
        prompt: "Trong phần Listening: Street Play Scheme, mục đích chính của dự án cấm xe cộ trên đường Beechwood là gì?",
        options: [
          { id: "opt_A", label: "A", text: "Tạo không gian an toàn ngoài trời cho trẻ em vui chơi và kết bạn trong cộng đồng" },
          { id: "opt_B", label: "B", text: "Biến con đường thành khu chợ đêm sầm uất dành riêng cho người bán lẻ" },
          { id: "opt_C", label: "C", text: "Sửa chữa hệ thống cống thoát nước và dây điện ngầm của thành phố" },
          { id: "opt_D", label: "D", text: "Cấm vĩnh viễn mọi phương tiện cơ giới của cư dân sinh sống trên tuyến phố" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. Tạo không gian an toàn ngoài trời cho trẻ em vui chơi và kết bạn trong cộng đồng",
        correctExplanation: "Street Play Scheme đóng đường định kỳ cho xe lưu thông để tạo sân chơi an toàn, khuyến khích vận động thể chất và gắn kết trẻ em hàng xóm.",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_D",
          baitOptionText: "D. Cấm vĩnh viễn mọi phương tiện cơ giới của cư dân sinh sống trên tuyến phố",
          diagnosticTitle: "Hiểu sai thời gian diễn ra thành cấm vĩnh viễn",
          explanation: "Việc đóng đường chỉ diễn ra định kỳ (ví dụ mỗi tuần một lần trong vài giờ), cư dân vẫn có thể dùng xe nhưng phải lái chậm dưới sự hướng dẫn của giám sát viên."
        }
      },
      {
        id: "builder_w5d2_q08",
        roundIndex: 7,
        prompt: "Hai lợi ích lớn nhất cho trẻ em từ chương trình Street Play Scheme được nhân vật Alice nhấn mạnh là:",
        options: [
          { id: "opt_A", label: "A", text: "Tăng cường hoạt động thể chất và cơ hội giao lưu kết bạn mới" },
          { id: "opt_B", label: "B", text: "Cải thiện điểm số học tập trên lớp và học các môn năng khiếu" },
          { id: "opt_C", label: "C", text: "Kiếm thêm thu nhập từ các việc làm bán thời gian trên phố" },
          { id: "opt_D", label: "D", text: "Học cách lái xe ô tô an toàn khi tham gia giao thông" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. Tăng cường hoạt động thể chất và cơ hội giao lưu kết bạn mới",
        correctExplanation: "Hai lợi ích quan trọng nhất: 'increased physical activity' (vận động thể chất) và 'opportunity to make new friends / be part of a community'.",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_B",
          baitOptionText: "B. Cải thiện điểm số học tập trên lớp và học các môn năng khiếu",
          diagnosticTitle: "Suy đoán lợi ích học đường không có trong bài nghe",
          explanation: "Chương trình là hoạt động vui chơi ngoài trời cộng đồng, không có liên hệ trực tiếp với điểm số trường học."
        }
      },
      {
        id: "builder_w5d2_q09",
        roundIndex: 8,
        prompt: "Phản ứng ban đầu của những cư dân không có con nhỏ đối với việc đóng đường chơi phố (Street Play Scheme) là gì?",
        options: [
          { id: "opt_A", label: "A", text: "Nhiều người trong số họ ban đầu cảm thấy không hài lòng và e ngại" },
          { id: "opt_B", label: "B", text: "Tất cả mọi người đều nhiệt liệt hoan nghênh và tham gia ngay từ đầu" },
          { id: "opt_C", label: "C", text: "Họ quyết định bán nhà và chuyển sang khu vực dân cư khác sinh sống" },
          { id: "opt_D", label: "D", text: "Họ đệ đơn kiện chính quyền địa phương lên tòa án tối cao" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. Nhiều người trong số họ ban đầu cảm thấy không hài lòng và e ngại",
        correctExplanation: "Theo bài nghe, phản ứng ban đầu của các cư dân không có con: 'Many of them were unhappy at first', nhưng sau đó họ thích thú khi thấy trẻ vui chơi lành mạnh.",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_B",
          baitOptionText: "B. Tất cả mọi người đều nhiệt liệt hoan nghênh và tham gia ngay từ đầu",
          diagnosticTitle: "Tô hồng phản ứng của cộng đồng",
          explanation: "Bài nghe nêu rõ sự thay đổi thái độ: ban đầu nhiều người bực bội (unhappy at first) vì bất tiện xe cộ, sau đó mới đồng tình."
        }
      },
      {
        id: "builder_w5d2_q10",
        roundIndex: 9,
        prompt: "Kết luận của bài đọc về câu hỏi 'Tại sao giai đoạn vàng ngôn ngữ (critical period) lại chấm dứt' là gì?",
        options: [
          { id: "opt_A", label: "A", text: "Khoa học hiện nay vẫn chưa thực sự hiểu rõ bản chất và lý do vì sao nó kết thúc" },
          { id: "opt_B", label: "B", text: "Đã được giải thích hoàn toàn thấu đáo bởi các nhà sinh học thần kinh năm 2020" },
          { id: "opt_C", label: "C", text: "Do người lớn không còn thời gian tiếp xúc với các bài hát mẫu giáo" },
          { id: "opt_D", label: "D", text: "Do tiếng mẹ đẻ đã chiếm toàn bộ dung lượng lưu trữ của bán cầu não trái" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. Khoa học hiện nay vẫn chưa thực sự hiểu rõ bản chất và lý do vì sao nó kết thúc",
        correctExplanation: "Câu kết của bài đọc: 'Yet we still do not understand this critical period or know why it ends.'",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_B",
          baitOptionText: "B. Đã được giải thích hoàn toàn thấu đáo bởi các nhà sinh học thần kinh năm 2020",
          diagnosticTitle: "Khẳng định điều mà khoa học chưa có câu trả lời",
          explanation: "Bài đọc nhấn mạnh đây vẫn là câu hỏi hóc búa chưa có lời giải thỏa đáng của khoa học nhận thức hiện đại."
        }
      },
  ],
  "WEEK 5 – DAY 3": [
    {
        id: "builder_w5d3_q01",
        roundIndex: 0,
        prompt: "Từ 'comfortable' trong phát âm chuẩn Anh - Anh / Anh - Mỹ gồm có bao nhiêu âm tiết (syllables)?",
        options: [
          { id: "opt_A", label: "A", text: "3 âm tiết (/ˈkʌmftəbl/)" },
          { id: "opt_B", label: "B", text: "4 âm tiết (/ˈkʌmfətəbəl/)" },
          { id: "opt_C", label: "C", text: "2 âm tiết (/ˈkʌmtəbl/)" },
          { id: "opt_D", label: "D", text: "5 âm tiết (/ˈkʌm.fɔː.teɪ.bəl/)" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. 3 âm tiết (/ˈkʌmftəbl/)",
        correctExplanation: "Người bản xứ nuốt âm 'or', phát âm từ này chỉ gồm 3 âm tiết: /ˈkʌmf.tə.bl/. Học sinh Việt Nam hay mắc lỗi đọc thành 4 âm tiết.",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_B",
          baitOptionText: "B. 4 âm tiết (/ˈkʌmfətəbəl/)",
          diagnosticTitle: "Đếm âm tiết theo mặt chữ viết tiếng Việt",
          explanation: "Nhìn vào chữ 'com-for-ta-ble' học sinh thường tưởng có 4 âm tiết, nhưng thực tế âm 'or' bị tiêu biến (syncope) thành 3 âm tiết."
        }
      },
      {
        id: "builder_w5d3_q02",
        roundIndex: 1,
        prompt: "Từ 'vehicle' (phương tiện giao thông) có bao nhiêu âm tiết và cách phát âm đúng là gì?",
        options: [
          { id: "opt_A", label: "A", text: "3 âm tiết với âm 'h' câm (/ˈviːəkl/)" },
          { id: "opt_B", label: "B", text: "2 âm tiết với âm 'h' đọc rõ (/ˈveɪhɪkl/)" },
          { id: "opt_C", label: "C", text: "4 âm tiết phát âm rõ từng chữ (/veˈhɪkələ/)" },
          { id: "opt_D", label: "D", text: "1 âm tiết nuốt toàn bộ nguyên âm (/viːkl/)" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. 3 âm tiết với âm 'h' câm (/ˈviːəkl/)",
        correctExplanation: "'vehicle' có 3 âm tiết /ˈviː.ə.kl/ với chữ 'h' là âm câm hoàn toàn, trọng âm rơi vào âm tiết đầu tiên.",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_B",
          baitOptionText: "B. 2 âm tiết với âm 'h' đọc rõ (/ˈveɪhɪkl/)",
          diagnosticTitle: "Cố phát âm chữ 'h' câm",
          explanation: "Chữ 'h' trong 'vehicle' không được phát âm. Đọc rõ âm h là lỗi phát âm rất phổ biến."
        }
      },
      {
        id: "builder_w5d3_q03",
        roundIndex: 2,
        prompt: "Từ nào dưới đây có số lượng âm tiết CHÍNH XÁC là 3 âm tiết khi phát âm tự nhiên?",
        options: [
          { id: "opt_A", label: "A", text: "interesting (/ˈɪntrəstɪŋ/)" },
          { id: "opt_B", label: "B", text: "refrigerator (/rɪˈfrɪdʒəreɪtər/)" },
          { id: "opt_C", label: "C", text: "history (/ˈhɪstri/)" },
          { id: "opt_D", label: "D", text: "family (/ˈfæmli/)" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. interesting (/ˈɪntrəstɪŋ/)",
        correctExplanation: "'interesting' phát âm chuẩn là 3 âm tiết /ˈɪn.trəs.tɪŋ/ (nuốt âm 'e'). 'refrigerator' có 5 âm tiết, 'history' có 2 âm tiết /ˈhɪs.tri/.",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_C",
          baitOptionText: "C. history (/ˈhɪstri/)",
          diagnosticTitle: "Nghĩ từ 'history' có 3 âm tiết do mặt chữ his-to-ry",
          explanation: "'history' trong văn nói chuẩn chỉ có 2 âm tiết là /ˈhɪs.tri/ do âm 'o' bị nuốt hoàn toàn."
        }
      },
      {
        id: "builder_w5d3_q04",
        roundIndex: 3,
        prompt: "Khi thêm hậu tố để chuyển từ 'family' sang 'familiar', trọng âm chính thay đổi như thế nào?",
        options: [
          { id: "opt_A", label: "A", text: "Từ âm tiết thứ nhất sang âm tiết thứ hai" },
          { id: "opt_B", label: "B", text: "Vẫn giữ nguyên ở âm tiết thứ nhất" },
          { id: "opt_C", label: "C", text: "Chuyển hẳn về âm tiết cuối cùng" },
          { id: "opt_D", label: "D", text: "Hai từ này không hề có trọng âm chính" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. Từ âm tiết thứ nhất sang âm tiết thứ hai",
        correctExplanation: "'FA-mi-ly' /ˈfæməli/ có trọng âm ở âm tiết 1, nhưng khi chuyển thành 'fa-MI-li-ar' /fəˈmɪliər/ thì trọng âm chuyển sang âm tiết 2.",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_B",
          baitOptionText: "B. Vẫn giữ nguyên ở âm tiết thứ nhất",
          diagnosticTitle: "Nghĩ trọng âm của từ gốc không bao giờ đổi",
          explanation: "Rất nhiều từ tiếng Anh khi thêm hậu tố sẽ làm dịch chuyển vị trí trọng âm chính, ví dụ: 'family' (1) -> 'familiar' (2)."
        }
      },
      {
        id: "builder_w5d3_q05",
        roundIndex: 4,
        prompt: "Từ nào dưới đây có trọng âm rơi vào ÂM TIẾT THỨ BA?",
        options: [
          { id: "opt_A", label: "A", text: "academic (/ˌækəˈdemɪk/)" },
          { id: "opt_B", label: "B", text: "relative (/ˈrelətɪv/)" },
          { id: "opt_C", label: "C", text: "household (/ˈhaʊshəʊld/)" },
          { id: "opt_D", label: "D", text: "ancestor (/ˈænsestər/)" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. academic (/ˌækəˈdemɪk/)",
        correctExplanation: "Từ có đuôi '-ic' luôn có trọng âm rơi vào âm tiết liền trước nó: a-ca-DE-mic (âm tiết 3). Các từ còn lại đều có trọng âm ở âm tiết 1.",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_B",
          baitOptionText: "B. relative (/ˈrelətɪv/)",
          diagnosticTitle: "Nhầm lẫn đuôi '-ive' nhận trọng âm trước",
          explanation: "'relative' có trọng âm rơi vào âm tiết đầu tiên /ˈrelətɪv/, không phải âm tiết thứ ba."
        }
      },
      {
        id: "builder_w5d3_q06",
        roundIndex: 5,
        prompt: "Thành ngữ (Idiom) nào diễn đạt ý luôn sát cánh, bảo vệ và ủng hộ người thân vô điều kiện?",
        options: [
          { id: "opt_A", label: "A", text: "have someone's back" },
          { id: "opt_B", label: "B", text: "turn someone's back" },
          { id: "opt_C", label: "C", text: "stab in someone's back" },
          { id: "opt_D", label: "D", text: "put someone on the back burner" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. have someone's back",
        correctExplanation: "'to have someone's back' = luôn ở phía sau bảo vệ, ủng hộ và chở che cho ai đó trong mọi hoàn cảnh khó khăn.",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_B",
          baitOptionText: "B. turn someone's back",
          diagnosticTitle: "Chọn thành ngữ quay lưng phản bội",
          explanation: "'turn one's back on someone' có nghĩa là quay lưng, từ bỏ giúp đỡ ai đó, mang nghĩa trái ngược hoàn toàn."
        }
      },
      {
        id: "builder_w5d3_q07",
        roundIndex: 6,
        prompt: "Cụm thành ngữ nào diễn đạt một người luôn sẵn lòng lắng nghe, an ủi khi người khác gặp đau buồn?",
        options: [
          { id: "opt_A", label: "A", text: "a shoulder to cry on" },
          { id: "opt_B", label: "B", text: "a cold shoulder" },
          { id: "opt_C", label: "C", text: "an eye for an eye" },
          { id: "opt_D", label: "D", text: "a pat on the back" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. a shoulder to cry on",
        correctExplanation: "'a shoulder to cry on' (một bờ vai để tựa khóc) = người biết cảm thông, luôn lắng nghe chia sẻ những nỗi đau buồn của mình.",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_B",
          baitOptionText: "B. a cold shoulder",
          diagnosticTitle: "Nhầm lẫn với thành ngữ tỏ thái độ lạnh nhạt",
          explanation: "'give someone the cold shoulder' nghĩa là đối xử lạnh nhạt, phớt lờ ai đó, hoàn toàn đối lập với an ủi động viên."
        }
      },
      {
        id: "builder_w5d3_q08",
        roundIndex: 7,
        prompt: "Tính từ nào miêu tả một gia đình có các thành viên luôn gắn bó khăng khít, yêu thương và giúp đỡ lẫn nhau?",
        options: [
          { id: "opt_A", label: "A", text: "a close-knit family" },
          { id: "opt_B", label: "B", text: "a distant family" },
          { id: "opt_C", label: "C", text: "a fragmented family" },
          { id: "opt_D", label: "D", text: "an isolated family" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. a close-knit family",
        correctExplanation: "Collocation cực kỳ tự nhiên trong Speaking Part 1 & 2: 'a close-knit family' (gia đình gắn bó khăng khít).",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_C",
          baitOptionText: "C. a fragmented family",
          diagnosticTitle: "Chọn tính từ mang nghĩa gia đình ly tán",
          explanation: "'fragmented' nghĩa là tan vỡ, chia rẽ, trái ngược với 'close-knit'."
        }
      },
      {
        id: "builder_w5d3_q09",
        roundIndex: 8,
        prompt: "Khi nói về sự đền đáp công ơn nuôi dưỡng của cha mẹ, động từ kết hợp tự nhiên nhất là:",
        options: [
          { id: "opt_A", label: "A", text: "repay my parents for their love and sacrifices" },
          { id: "opt_B", label: "B", text: "refund my parents for their money and efforts" },
          { id: "opt_C", label: "C", text: "cash back my parents for what they spent" },
          { id: "opt_D", label: "D", text: "exchange my parents for their daily devotion" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. repay my parents for their love and sacrifices",
        correctExplanation: "'repay somebody for something' (đền đáp ai vì tình yêu thương và sự hy sinh của họ) là cách diễn đạt trang trọng và tình cảm trong tiếng Anh.",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_B",
          baitOptionText: "B. refund my parents for their money and efforts",
          diagnosticTitle: "Dùng từ hoàn tiền thương mại cho tình cảm gia đình",
          explanation: "'refund' chỉ dùng cho giao dịch mua bán trả lại tiền hàng, không dùng cho sự đền đáp công ơn cha mẹ."
        }
      },
      {
        id: "builder_w5d3_q10",
        roundIndex: 9,
        prompt: "Động từ 'cherish' trong cụm \"cherish every moment with family\" mang ý nghĩa chính xác là gì?",
        options: [
          { id: "opt_A", label: "A", text: "Trân trọng và nâng niu từng khoảnh khắc quý giá" },
          { id: "opt_B", label: "B", text: "Ghi chép nhật ký lại một cách cẩn thận" },
          { id: "opt_C", label: "C", text: "Chụp thật nhiều ảnh để đăng tải lên mạng xã hội" },
          { id: "opt_D", label: "D", text: "Lãng phí thời gian vào những buổi gặp mặt vô ích" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. Trân trọng và nâng niu từng khoảnh khắc quý giá",
        correctExplanation: "'cherish' là động từ cảm xúc cao quý, nghĩa là yêu thương, trân quý và gìn giữ từng khoảnh khắc ấm áp bên người thân.",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_B",
          baitOptionText: "B. Ghi chép nhật ký lại một cách cẩn thận",
          diagnosticTitle: "Đồng nhất cảm xúc với hành động ghi chép cơ học",
          explanation: "'cherish' là thái độ tình cảm trân quý từ tận đáy lòng, không phải hành vi cơ học như viết nhật ký hay ghi sổ."
        }
      }
  ]
};
