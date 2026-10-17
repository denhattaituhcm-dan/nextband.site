/**
 * BUILDER ARENA QUESTION BANK - WEEK 9
 * Source: Giáo trình BUILDER 2027 - Đã soát lỗi.docx & Giáo án Builder 2027
 * Target: Band 5.0 IELTS
 * Day 1: Writing (Task 1 Introduction & Overview Mastery)
 * Day 2: Reading (Compare & Contrast / Attitudes to Language)
 * Day 3: Speaking (Personal Achievement & Comprehensive Pronunciation Review)
 */

export const BUILDER_WEEK_9_QUESTIONS: Record<string, any[]> = {
  // ==========================================
  // WEEK 9 - DAY 1 - WRITING: TASK 1 INTRO & OVERVIEW MASTERY
  // ==========================================
  "WEEK 9 – DAY 1": [
    {
      id: "builder_w9d1_q01",
      roundIndex: 0,
      prompt: "Khi paraphrase lại đề bài Writing Task 1, từ ngữ nào dưới đây TUYỆT ĐỐI KHÔNG ĐƯỢC PHÉP giữ lại trong câu mở bài của bạn?",
      options: [
        { id: "opt_A", label: "A", text: "below hoặc above" },
        { id: "opt_B", label: "B", text: "shows hoặc illustrates" },
        { id: "opt_C", label: "C", text: "percentage hoặc proportion" },
        { id: "opt_D", label: "D", text: "between 1990 and 2000" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. below hoặc above",
      correctExplanation: "Trên đề thi có dòng 'The chart below shows...', nhưng trong bài viết của thí sinh không hề có hình vẽ nằm bên dưới hay bên trên, do đó viết 'The chart below' là lỗi ngớ ngẩn bị trừ điểm.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. shows hoặc illustrates",
        diagnosticTitle: "Nhầm lẫn giữa từ cấm kỵ và động từ mô tả",
        explanation: "Các động từ như 'illustrates / depicts / compares' là động từ học thuật chuẩn; từ cấm kỵ là từ chỉ vị trí hình vẽ 'below/above' của đề bài."
      }
    },
    {
      id: "builder_w9d1_q02",
      roundIndex: 1,
      prompt: "Kỹ thuật biến đổi linh hoạt giữa Mệnh đề (Clause) và Cụm danh từ (Noun Phrase) được áp dụng chuẩn xác trong trường hợp nào?",
      options: [
        { id: "opt_A", label: "A", text: "\"how much fish was eaten\" chuyển thành \"fish consumption\"" },
        { id: "opt_B", label: "B", text: "\"how much fish was eaten\" chuyển thành \"fish eating action\"" },
        { id: "opt_C", label: "C", text: "\"how much fish was eaten\" chuyển thành \"the eat of fishes\"" },
        { id: "opt_D", label: "D", text: "\"how much fish was eaten\" chuyển thành \"fish was eaten greatly\"" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. \"how much fish was eaten\" chuyển thành \"fish consumption\"",
      correctExplanation: "Quy tắc paraphrase Task 1: Mệnh đề 'how much [noun] was consumed/eaten' chuyển đổi thành cụm danh từ học thuật '[noun] consumption' (ví dụ: fish consumption, fruit production).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. \"how much fish was eaten\" chuyển thành \"fish eating action\"",
        diagnosticTitle: "Dịch từng chữ một cách ngô nghê",
        explanation: "Trong văn phong kinh tế học thuật, lượng cá ăn vào gọi là 'fish consumption', không dùng 'eating action'."
      }
    },
    {
      id: "builder_w9d1_q03",
      roundIndex: 2,
      prompt: "Chọn phương án paraphrase chuẩn xác nhất cho cụm: \"the percentage of people who visited the cinema\"?",
      options: [
        { id: "opt_A", label: "A", text: "the cinema attendance rate" },
        { id: "opt_B", label: "B", text: "the number of humans in movies" },
        { id: "opt_C", label: "C", text: "the cinema visiting amount" },
        { id: "opt_D", label: "D", text: "the moviegoers quantity" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. the cinema attendance rate",
      correctExplanation: "'the percentage of people visiting...' tương đương với 'the cinema attendance rate' (tỷ lệ người đi xem phim rạp). Đây là cách paraphrase biến đổi từ loại xuất sắc.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. the cinema visiting amount",
        diagnosticTitle: "Dùng từ 'amount' sai với danh từ đếm được",
        explanation: "'people' là danh từ đếm được số nhiều, không bao giờ dùng 'amount' (amount chỉ dùng cho danh từ không đếm được)."
      }
    },
    {
      id: "builder_w9d1_q04",
      roundIndex: 3,
      prompt: "Biến đổi cụm thời gian: \"between 1994 and 2004\" sang cách diễn đạt học thuật tương đương:",
      options: [
        { id: "opt_A", label: "A", text: "over a 10-year period from 1994 to 2004" },
        { id: "opt_B", label: "B", text: "during 10 years of time since 1994" },
        { id: "opt_C", label: "C", text: "across 1994 until 2004 years" },
        { id: "opt_D", label: "D", text: "through a decade between 1994" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. over a 10-year period from 1994 to 2004",
      correctExplanation: "'over a 10-year period from [X] to [Y]' (trong khoảng thời gian 10 năm từ X đến Y) là cách paraphrase thời gian chỉn chu, nâng band điểm từ vựng.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. during 10 years of time since 1994",
        diagnosticTitle: "Dùng từ 'since' sai ngữ pháp cho giai đoạn quá khứ đóng",
        explanation: "'since' chỉ dùng cho thì hoàn thành kéo dài tới hiện tại; giai đoạn đã kết thúc năm 2004 bắt buộc dùng 'from... to...'."
      }
    },
    {
      id: "builder_w9d1_q05",
      roundIndex: 4,
      prompt: "Chọn câu Introduction viết lại hoàn chỉnh và chuẩn xác nhất cho đề bài:\n\"The chart below shows the percentages of different types of household waste recycled in one city between 1992 and 2002.\"",
      options: [
        { id: "opt_A", label: "A", text: "The chart illustrates the proportions of various categories of domestic waste that were recycled in a particular city over a 10-year period starting from 1992." },
        { id: "opt_B", label: "B", text: "The chart below shows the percentages of different types of household waste recycled in one city between 1992 and 2002." },
        { id: "opt_C", label: "C", text: "The graph gives pictures about how many household waste was recycled in one city from 1992 to 2002." },
        { id: "opt_D", label: "D", text: "This drawing delineates the recycle numbers of dirty things from families in a town during 10 years." },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. The chart illustrates the proportions of various categories of domestic waste that were recycled in a particular city over a 10-year period starting from 1992.",
      correctExplanation: "Câu A paraphrase hoàn hảo: 'shows' -> 'illustrates', 'percentages' -> 'proportions', 'different types' -> 'various categories', 'household waste' -> 'domestic waste', bỏ 'below'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. The chart below shows the percentages of different types of household waste recycled in one city between 1992 and 2002.",
        diagnosticTitle: "Sao chép nguyên văn một trăm phần trăm đề bài",
        explanation: "Chép nguyên văn đề bài sẽ bị giám khảo gạch bỏ không tính vào tổng số từ và bị phạt điểm Task Achievement."
      }
    },
    {
      id: "builder_w9d1_q06",
      roundIndex: 5,
      prompt: "Động từ 'delineate' trong câu: \"The line graph delineates the fluctuation in oil prices\" có nghĩa là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Khắc họa, mô tả chi tiết các đường nét và xu hướng số liệu" },
        { id: "opt_B", label: "B", text: "Phê phán các chính sách giá dầu của các tập đoàn quốc tế" },
        { id: "opt_C", label: "C", text: "Dự đoán tương lai của ngành dầu mỏ trong thế kỷ sau" },
        { id: "opt_D", label: "D", text: "Xóa bỏ các số liệu sai sót trên trục tọa độ nằm ngang" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Khắc họa, mô tả chi tiết các đường nét và xu hướng số liệu",
      correctExplanation: "'delineate' là ngoại động từ trang trọng (formal) tương đương với 'describe / portray / outline' (mô tả, phác họa rõ nét).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Dự đoán tương lai của ngành dầu mỏ trong thế kỷ sau",
        diagnosticTitle: "Nhầm lẫn với động từ dự báo (forecast / predict)",
        explanation: "'delineate' chỉ mô tả dữ liệu đã có trên biểu đồ, không mang nghĩa suy đoán tương lai."
      }
    },
    {
      id: "builder_w9d1_q07",
      roundIndex: 6,
      prompt: "Trong biểu đồ có 4 nước, 3 nước có lượng hồ sơ xin visa du học tăng đều đặn, chỉ riêng Trung Quốc giảm. Câu Overview nào xuất sắc nhất?",
      options: [
        { id: "opt_A", label: "A", text: "Overall, while the number of applicants from most countries increased over the period, China was the only nation to witness a downward trend." },
        { id: "opt_B", label: "B", text: "Overall, all four countries had many applicants and each country had different numbers of people." },
        { id: "opt_C", label: "C", text: "Overall, in 1995 China had 5000 applicants but in 2005 it decreased to only 2000 applicants." },
        { id: "opt_D", label: "D", text: "Overall, studying abroad became very popular and students liked going to universities." },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Overall, while the number of applicants from most countries increased over the period, China was the only nation to witness a downward trend.",
      correctExplanation: "Câu A tóm tắt trọn vẹn bức tranh tổng thể: xu hướng tăng chung của đa số và chỉ ra điểm đối lập ngoại lệ duy nhất của Trung Quốc mà không cần nhồi nhét con số cụ thể.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Overall, in 1995 China had 5000 applicants but in 2005 it decreased to only 2000 applicants.",
        diagnosticTitle: "Đưa số liệu chi tiết của một nước duy nhất vào Overview",
        explanation: "Câu C chỉ nêu số liệu của riêng Trung Quốc kèm năm cụ thể, hoàn toàn bỏ quên 3 nước còn lại, không đáp ứng định nghĩa của một Overview toàn diện."
      }
    },
    {
      id: "builder_w9d1_q08",
      roundIndex: 7,
      prompt: "Cụm danh từ \"international applicants\" có thể được paraphrase thành mệnh đề nào dưới đây mà vẫn bảo toàn ngữ nghĩa?",
      options: [
        { id: "opt_A", label: "A", text: "international students who applied" },
        { id: "opt_B", label: "B", text: "people who travelling abroad" },
        { id: "opt_C", label: "C", text: "universities receiving applications" },
        { id: "opt_D", label: "D", text: "foreign countries giving scholarships" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. international students who applied",
      correctExplanation: "'applicants' là danh từ chỉ người nộp đơn, paraphrase thành mệnh đề quan hệ 'students who applied' (những học sinh đã nộp hồ sơ).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. universities receiving applications",
        diagnosticTitle: "Đảo lộn giữa người nộp đơn và cơ sở nhận hồ sơ",
        explanation: "'international applicants' là sinh viên ứng tuyển, không phải các trường đại học nhận đơn ('universities')."
      }
    },
    {
      id: "builder_w9d1_q09",
      roundIndex: 8,
      prompt: "Điền cụm từ phù hợp: \"The line graph [......] the price of bananas in four distinct countries.\"",
      options: [
        { id: "opt_A", label: "A", text: "provides comparative data regarding" },
        { id: "opt_B", label: "B", text: "gives the drawing below about" },
        { id: "opt_C", label: "C", text: "is telling everyone listening about" },
        { id: "opt_D", label: "D", text: "writes many information on" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. provides comparative data regarding",
      correctExplanation: "'provides comparative data regarding' (cung cấp dữ liệu so sánh liên quan tới...) là cấu trúc học thuật band cao thay thế xuất sắc cho 'shows'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. writes many information on",
        diagnosticTitle: "Lỗi dùng 'many' với danh từ không đếm được",
        explanation: "'information' là danh từ không đếm được, dùng 'many information' là lỗi sai ngữ pháp cơ bản."
      }
    },
    {
      id: "builder_w9d1_q10",
      roundIndex: 9,
      prompt: "Sau khi hoàn thành phần Introduction và Overview của Task 1, độ dài tối ưu cho cả hai đoạn này cộng lại nên là bao nhiêu?",
      options: [
        { id: "opt_A", label: "A", text: "Khoảng 45 đến 60 từ (khoảng 3 đến 4 câu hoàn chỉnh)" },
        { id: "opt_B", label: "B", text: "Ít nhất 140 từ để chiếm trọn phần lớn bài viết" },
        { id: "opt_C", label: "C", text: "Chỉ đúng 10 từ để tiết kiệm thời gian viết phần khác" },
        { id: "opt_D", label: "D", text: "Càng dài càng tốt và nên chiếm 80% tổng thời lượng 20 phút" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Khoảng 45 đến 60 từ (khoảng 3 đến 4 câu hoàn chỉnh)",
      correctExplanation: "Một bài Task 1 chuẩn dài từ 150-180 từ. Intro (1 câu ~15-20 từ) + Overview (2 câu ~30-40 từ) tổng cộng khoảng 45-60 từ là tỷ lệ vàng hoàn hảo.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Ít nhất 140 từ để chiếm trọn phần lớn bài viết",
        diagnosticTitle: "Mất cân đối thời gian và cấu trúc bài viết",
        explanation: "Nếu viết Intro và Overview tới 140 từ thì thí sinh sẽ không đủ thời gian và số từ để phân tích số liệu chi tiết trong hai đoạn Body."
      }
    },
  ],

  // ==========================================
  // WEEK 9 - DAY 2 - READING: ATTITUDES TO LANGUAGE
  // ==========================================
  "WEEK 9 – DAY 2": [
    {
      id: "builder_w9d2_q01",
      roundIndex: 0,
      prompt: "Trong cuộc tranh luận về ngôn ngữ học (Attitudes to language), sự đối lập cốt lõi giữa hai trường phái Prescriptivism và Descriptivism là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Prescriptivism áp đặt các quy tắc chuẩn mực bắt buộc, còn Descriptivism ghi nhận thực tế sử dụng ngôn ngữ tự nhiên" },
        { id: "opt_B", label: "B", text: "Prescriptivism chỉ nghiên cứu ngôn ngữ ký hiệu, còn Descriptivism chỉ nghiên cứu thơ ca cổ đại" },
        { id: "opt_C", label: "C", text: "Prescriptivism chủ trương xóa bỏ mọi cuốn từ điển, còn Descriptivism bắt buộc viết bằng mực đỏ" },
        { id: "opt_D", label: "D", text: "Hai trường phái này hoàn toàn có chung một quan điểm duy nhất không hề có tranh cãi" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Prescriptivism áp đặt các quy tắc chuẩn mực bắt buộc, còn Descriptivism ghi nhận thực tế sử dụng ngôn ngữ tự nhiên",
      correctExplanation: "Prescriptivism (thuyết quy chuẩn) coi việc duy trì quy tắc ngữ pháp nghiêm ngặt là chuẩn mực và coi biến đổi là sự suy đồi; Descriptivism (thuyết miêu tả) khách quan quan sát, ghi nhận cách người bản xứ thực sự nói và viết.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. Hai trường phái này hoàn toàn có chung một quan điểm duy nhất không hề có tranh cãi",
        diagnosticTitle: "Không nắm được kỹ năng Compare & Contrast của bài đọc",
        explanation: "Bài đọc [C9T3] là bài đọc kinh điển về sự tranh luận nảy lửa (debate) giữa hai hệ tư tưởng đối lập gay gắt trong ngôn ngữ học."
      }
    },
    {
      id: "builder_w9d2_q02",
      roundIndex: 1,
      prompt: "Tại sao những tranh cãi xung quanh việc sử dụng ngôn ngữ lại thường gây ra phản ứng cảm xúc rất dữ dội trong xã hội?",
      options: [
        { id: "opt_A", label: "A", text: "Ngôn ngữ gắn liền chặt chẽ với bản sắc văn hóa, địa vị xã hội và cách đánh giá trí tuệ con người" },
        { id: "opt_B", label: "B", text: "Các cuốn sách ngữ pháp luôn có giá bán đắt hơn vàng bạc trên thị trường" },
        { id: "opt_C", label: "C", text: "Chính phủ các nước luôn phạt tù những ai phát âm sai một âm tiết" },
        { id: "opt_D", label: "D", text: "Ngôn ngữ là phát minh duy nhất của nhân loại không có bất kỳ quy tắc nào" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Ngôn ngữ gắn liền chặt chẽ với bản sắc văn hóa, địa vị xã hội và cách đánh giá trí tuệ con người",
      correctExplanation: "Bài đọc chỉ rõ: ngôn ngữ liên quan trực tiếp đến nhân phẩm, giáo dục và giai cấp xã hội ('assessment of a person's intelligence is affected by the way he or she uses language').",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Chính phủ các nước luôn phạt tù những ai phát âm sai một âm tiết",
        diagnosticTitle: "Cường điệu hóa phi lý hình phạt xã hội",
        explanation: "Phản ứng xã hội là sự kỳ thị vô hình về đẳng cấp và học vấn, không phải hình phạt tù của pháp luật."
      }
    },
    {
      id: "builder_w9d2_q03",
      roundIndex: 2,
      prompt: "Quan điểm của các nhà ngôn ngữ học theo thuyết Miêu tả (Descriptivists) đối với sự biến đổi của ngôn ngữ theo thời gian là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Biến đổi ngôn ngữ là tiến trình tự nhiên và việc cố gắng ngăn chặn nó là vô nghĩa" },
        { id: "opt_B", label: "B", text: "Mọi sự thay đổi từ vựng đều là tội ác phá hoại ngôn ngữ dân tộc" },
        { id: "opt_C", label: "C", text: "Cần phải thành lập các viện hàn lâm để đóng băng ngôn ngữ vĩnh viễn" },
        { id: "opt_D", label: "D", text: "Chỉ cho phép trẻ em được quyền sáng tạo ra những từ ngữ mới" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Biến đổi ngôn ngữ là tiến trình tự nhiên và việc cố gắng ngăn chặn nó là vô nghĩa",
      correctExplanation: "Bài đọc: 'According to descriptivists it is pointless to try to stop language change... language change is a natural and inevitable continuous process.'",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Mọi sự thay đổi từ vựng đều là tội ác phá hoại ngôn ngữ dân tộc",
        diagnosticTitle: "Gán nhầm quan điểm của phái Quy chuẩn cho phái Miêu tả",
        explanation: "Coi biến đổi ngôn ngữ là sự suy đồi (deterioration) là góc nhìn của phái Quy chuẩn (Prescriptivists), không phải của Descriptivists."
      }
    },
    {
      id: "builder_w9d2_q04",
      roundIndex: 3,
      prompt: "Thuyết Quy chuẩn ngữ pháp (Prescriptivism) có còn tồn tại trong xã hội ngày nay hay không?",
      options: [
        { id: "opt_A", label: "A", text: "Vẫn tồn tại mạnh mẽ trong giáo dục nhà trường, sách hướng dẫn viết và truyền thông chính thống" },
        { id: "opt_B", label: "B", text: "Đã hoàn toàn biến mất sau cuộc cách mạng công nghệ thông tin thế kỷ 21" },
        { id: "opt_C", label: "C", text: "Chỉ còn xuất hiện trong các bộ tộc biệt lập ở rừng nhiệt đới Amazon" },
        { id: "opt_D", label: "D", text: "Bị tất cả các trường đại học quốc tế ra lệnh cấm thảo luận vĩnh viễn" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Vẫn tồn tại mạnh mẽ trong giáo dục nhà trường, sách hướng dẫn viết và truyền thông chính thống",
      correctExplanation: "Bài đọc: 'Prescriptivism still exists today.' Quy chuẩn vẫn hiện diện trong tiêu chuẩn chấm thi, sách dạy viết học thuật và văn phong báo chí chính quy.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Đã hoàn toàn biến mất sau cuộc cách mạng công nghệ thông tin thế kỷ 21",
        diagnosticTitle: "Tự suy đoán rằng quy tắc cũ đã bị xóa sổ",
        explanation: "Nhận định số 5 trong bài đọc kiểm tra câu 'Prescriptivism still exists today' có đáp án là TRUE."
      }
    },
    {
      id: "builder_w9d2_q05",
      roundIndex: 4,
      prompt: "Tác giả bài đọc chỉ ra điều gì về cách mà cả hai trường phái (Descriptivists & Prescriptivists) bị nhìn nhận trong dư luận?",
      options: [
        { id: "opt_A", label: "A", text: "Cả hai trường phái đều thường xuyên bị bóp méo và hiểu sai lệch quan điểm thực sự của họ" },
        { id: "opt_B", label: "B", text: "Tất cả mọi người đều hiểu chính xác một trăm phần trăm tôn chỉ của hai nhóm" },
        { id: "opt_C", label: "C", text: "Hai nhóm luôn cử đại diện tổ chức các buổi ký kết hòa bình hữu nghị" },
        { id: "opt_D", label: "D", text: "Chính phủ đã công nhận phái Quy chuẩn là tổ chức tôn giáo chính thức" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Cả hai trường phái đều thường xuyên bị bóp méo và hiểu sai lệch quan điểm thực sự của họ",
      correctExplanation: "Bài đọc: 'Both descriptivists and prescriptivists have been misrepresented.' Phái quy chuẩn bị coi là giáo điều cực đoan, còn phái miêu tả bị coi là cổ xúy cho sự bừa bãi vô nguyên tắc.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Tất cả mọi người đều hiểu chính xác một trăm phần trăm tôn chỉ của hai nhóm",
        diagnosticTitle: "Hiểu ngược lại từ 'misrepresented'",
        explanation: "'misrepresented' có nghĩa là bị miêu tả sai lệch, bóp méo thực tế bởi các phương tiện truyền thông."
      }
    },
    {
      id: "builder_w9d2_q06",
      roundIndex: 5,
      prompt: "Mục đích bao quát chính của tác giả khi viết bài đọc 'Attitudes to language' (Câu hỏi trắc nghiệm A/B/C/D cuối bài) là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Trình bày một tường thuật lịch sử khách quan về những quan điểm khác nhau đối với ngôn ngữ" },
        { id: "opt_B", label: "B", text: "Bảo vệ quan điểm của phái quy chuẩn và kêu gọi phạt nặng người dùng từ lóng" },
        { id: "opt_C", label: "C", text: "Kêu gọi bãi bỏ mọi kỳ thi đánh giá năng lực tiếng Anh trên toàn cầu" },
        { id: "opt_D", label: "D", text: "Hướng dẫn người đọc cách viết từ điển tiếng Anh dày năm nghìn trang" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Trình bày một tường thuật lịch sử khách quan về những quan điểm khác nhau đối với ngôn ngữ",
      correctExplanation: "Đáp án chuẩn Cambridge: 'to present a historical account of differing views of language' (trình bày bức tranh lịch sử về các góc nhìn khác nhau đối với ngôn ngữ một cách trung lập).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Bảo vệ quan điểm của phái quy chuẩn và kêu gọi phạt nặng người dùng từ lóng",
        diagnosticTitle: "Nghĩ tác giả thiên vị một phe trong cuộc tranh luận",
        explanation: "Tác giả đứng ở vị thế quan sát viên trung lập, làm rõ nguồn gốc lịch sử và sự hiểu lầm của cả hai bên."
      }
    },
    {
      id: "builder_w9d2_q07",
      roundIndex: 6,
      prompt: "Từ 'inevitable' trong câu \"Language change is an inevitable continuous process\" đồng nghĩa với từ nào?",
      options: [
        { id: "opt_A", label: "A", text: "unavoidable" },
        { id: "opt_B", label: "B", text: "preventable" },
        { id: "opt_C", label: "C", text: "harmful" },
        { id: "opt_D", label: "D", text: "temporary" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. unavoidable",
      correctExplanation: "'inevitable' = không thể tránh khỏi (unavoidable / bound to happen).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. preventable",
        diagnosticTitle: "Chọn từ trái nghĩa với văn cảnh",
        explanation: "'preventable' nghĩa là có thể phòng ngừa, ngăn chặn được, hoàn toàn trái ngược với 'inevitable'."
      }
    },
    {
      id: "builder_w9d2_q08",
      roundIndex: 7,
      prompt: "Đánh giá nhận định sau dựa vào bài đọc: \"Prescriptive grammar books cost a lot of money to buy in the 18th century.\"",
      options: [
        { id: "opt_A", label: "A", text: "NOT GIVEN" },
        { id: "opt_B", label: "B", text: "TRUE" },
        { id: "opt_C", label: "C", text: "FALSE" },
        { id: "opt_D", label: "D", text: "INCOMPLETE" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. NOT GIVEN",
      correctExplanation: "Bài đọc có nói sách ngữ pháp quy chuẩn rất phổ biến vào thế kỷ 18, nhưng KHÔNG hề đề cập thông tin về giá tiền bán sách đắt hay rẻ -> NOT GIVEN.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. TRUE",
        diagnosticTitle: "Tự suy diễn sách ngày xưa in bằng tay nên phải đắt",
        explanation: "Thí sinh tự suy luận logic cá nhân thay vì căn cứ vào văn bản. Bài đọc không hề có từ khóa so sánh giá tiền."
      }
    },
    {
      id: "builder_w9d2_q09",
      roundIndex: 8,
      prompt: "Theo phái Quy chuẩn thế kỷ 18, các quy tắc ngữ pháp tiếng Anh thường được vay mượn và áp đặt dựa trên hệ thống ngữ pháp của ngôn ngữ nào?",
      options: [
        { id: "opt_A", label: "A", text: "Tiếng La-tinh Latin" },
        { id: "opt_B", label: "B", text: "Tiếng Thổ Nhĩ Kỳ" },
        { id: "opt_C", label: "C", text: "Tiếng thổ dân Úc" },
        { id: "opt_D", label: "D", text: "Tiếng Ba Tư cổ đại" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Tiếng La-tinh Latin",
      correctExplanation: "Các nhà ngữ pháp thế kỷ 18 (như Robert Lowth) coi tiếng Latin là hình mẫu hoàn mỹ và cố tình áp đặt các quy tắc ngữ pháp Latin vào tiếng Anh (như quy tắc không tách rời split infinitive).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. Tiếng Ba Tư cổ đại",
        diagnosticTitle: "Đoán mò ngôn ngữ cổ đại phương Đông",
        explanation: "Hệ thống văn hóa châu Âu thời kỳ Khai sáng chịu ảnh hưởng sâu sắc từ tiếng La-tinh (Latin) của đế chế La Mã."
      }
    },
    {
      id: "builder_w9d2_q10",
      roundIndex: 9,
      prompt: "Kỹ năng So sánh và Đối lập (Compare and Contrast) trong bài đọc này giúp người đọc nhận ra điều gì?",
      options: [
        { id: "opt_A", label: "A", text: "Mỗi hệ tư tưởng đều có lập luận nền tảng riêng và việc đối chiếu giúp hiểu sâu sắc bức tranh toàn cảnh" },
        { id: "opt_B", label: "B", text: "Chỉ có một bên luôn luôn đúng còn bên kia hoàn toàn sai trái trong mọi khía cạnh" },
        { id: "opt_C", label: "C", text: "Không nên học ngữ pháp nữa mà chỉ cần giao tiếp bằng cử chỉ bằng tay" },
        { id: "opt_D", label: "D", text: "Tất cả các cuốn từ điển tiếng Anh xuất bản trước đây đều cần phải tiêu hủy" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Mỗi hệ tư tưởng đều có lập luận nền tảng riêng và việc đối chiếu giúp hiểu sâu sắc bức tranh toàn cảnh",
      correctExplanation: "Kỹ năng Compare and Contrast cho thấy phái quy chuẩn duy trì tính chuẩn hóa và dễ hiểu trong giáo dục, trong khi phái miêu tả ghi nhận sự phát triển sống động của ngôn ngữ học hiện đại.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Chỉ có một bên luôn luôn đúng còn bên kia hoàn toàn sai trái trong mọi khía cạnh",
        diagnosticTitle: "Tư duy nhị nguyên trắng đen một chiều",
        explanation: "Bài đọc học thuật nhằm phân tích sự đa chiều của vấn đề, không quy chụp cực đoan bên đúng bên sai."
      }
    },
  ],

  // ==========================================
  // WEEK 9 - DAY 3 - SPEAKING: PERSONAL ACHIEVEMENT & REVIEW
  // ==========================================
  "WEEK 9 – DAY 3": [
    {
      id: "builder_w9d3_q01",
      roundIndex: 0,
      prompt: "Khi nói về việc đối mặt và vượt qua một giai đoạn khó khăn trong cuộc sống, cặp collocation nào dưới đây là chuẩn xác nhất?",
      options: [
        { id: "opt_A", label: "A", text: "confront formidable challenges and overcome obstacles" },
        { id: "opt_B", label: "B", text: "look at big problems and pass the walls easily" },
        { id: "opt_C", label: "C", text: "meet heavy difficulties and run over the rocks" },
        { id: "opt_D", label: "D", text: "see dangerous affairs and jump through hurdles" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. confront formidable challenges and overcome obstacles",
      correctExplanation: "'confront formidable challenges' (đối mặt thử thách cam go) và 'overcome obstacles' (vượt qua chướng ngại vật) là các cụm collocation kinh điển điểm cao trong Speaking Part 2.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. look at big problems and pass the walls easily",
        diagnosticTitle: "Dịch nghĩa đen thô sơ từng chữ",
        explanation: "'pass the walls' là dịch vụng từ 'vượt qua bức tường', không phải collocation tự nhiên trong tiếng Anh."
      }
    },
    {
      id: "builder_w9d3_q02",
      roundIndex: 1,
      prompt: "Cụm thành ngữ nào diễn đạt việc nắm bắt kịp thời cơ hội quý giá khi nó xuất hiện?",
      options: [
        { id: "opt_A", label: "A", text: "seize the opportunity" },
        { id: "opt_B", label: "B", text: "catch the luckiness" },
        { id: "opt_C", label: "C", text: "hold the chance box" },
        { id: "opt_D", label: "D", text: "bite the future gift" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. seize the opportunity",
      correctExplanation: "Collocation chuẩn xác: 'seize the opportunity' (chớp lấy thời cơ / nắm bắt cơ hội quý giá).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. catch the luckiness",
        diagnosticTitle: "Tự sáng tác danh từ trừu tượng vụng về",
        explanation: "Trong tiếng Anh không dùng 'catch the luckiness'. Động từ kết hợp tự nhiên với cơ hội là 'seize' hoặc 'grab'."
      }
    },
    {
      id: "builder_w9d3_q03",
      roundIndex: 2,
      prompt: "Khi học sinh bị tụt lại phía sau trong học tập do áp lực vô hình từ bạn bè cùng trang lứa, hiện tượng tâm lý đó được gọi là:",
      options: [
        { id: "opt_A", label: "A", text: "falling behind due to peer pressure" },
        { id: "opt_B", label: "B", text: "dropping down because of classmate power" },
        { id: "opt_C", label: "C", text: "slipping away for partner stress" },
        { id: "opt_D", label: "D", text: "stopping backward from friends tension" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. falling behind due to peer pressure",
      correctExplanation: "'falling behind' (tụt hậu/thua sút) và 'peer pressure' (áp lực bạn bè cùng trang lứa) là các cụm từ vựng tâm lý học đường chuẩn xác.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. dropping down because of classmate power",
        diagnosticTitle: "Dịch từng chữ 'quyền lực của bạn học'",
        explanation: "Thuật ngữ xã hội học chuẩn quốc tế cho áp lực từ người đồng trang lứa là 'peer pressure'."
      }
    },
    {
      id: "builder_w9d3_q04",
      roundIndex: 3,
      prompt: "Cụm từ nào thể hiện hành động chủ động tìm kiếm sự chỉ dẫn hoặc lời khuyên từ những người thầy, người đi trước?",
      options: [
        { id: "opt_A", label: "A", text: "seek guidance and advice from mentors" },
        { id: "opt_B", label: "B", text: "hunt words and phrases from bosses" },
        { id: "opt_C", label: "C", text: "beg hints and directions from seniors" },
        { id: "opt_D", label: "D", text: "order instructions from old professors" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. seek guidance and advice from mentors",
      correctExplanation: "'seek guidance from mentors' (tìm kiếm sự định hướng từ những người thầy cố vấn) là cách diễn đạt trưởng thành và chuyên nghiệp.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. beg hints and directions from seniors",
        diagnosticTitle: "Dùng từ 'beg' (van xin) làm sai lệch sắc thái",
        explanation: "'beg' mang sắc thái van nài yếu đuối, không phản ánh tinh thần học hỏi tích cực như động từ trang trọng 'seek'."
      }
    },
    {
      id: "builder_w9d3_q05",
      roundIndex: 4,
      prompt: "Quy tắc ôn tập ngữ âm: Đuôi '-ed' của động từ có bao nhiêu cách phát âm trong tiếng Anh chuẩn?",
      options: [
        { id: "opt_A", label: "A", text: "3 cách phát âm (/ɪd/, /t/, /d/)" },
        { id: "opt_B", label: "B", text: "2 cách phát âm (/ed/ và /d/)" },
        { id: "opt_C", label: "C", text: "5 cách phát âm khác nhau hoàn toàn" },
        { id: "opt_D", label: "D", text: "1 cách phát âm duy nhất cho mọi từ" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. 3 cách phát âm (/ɪd/, /t/, /d/)",
      correctExplanation: "Đuôi '-ed' có đúng 3 cách đọc: /ɪd/ (sau âm /t, d/), /t/ (sau âm vô thanh), và /d/ (sau âm hữu thanh và nguyên âm).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. 2 cách phát âm (/ed/ và /d/)",
        diagnosticTitle: "Lỗi phát âm đuôi -ed thành vần /ed/ tiếng Việt",
        explanation: "Trong tiếng Anh không có cách đọc đuôi -ed thành /ed/, chỉ có /ɪd/, /t/ hoặc /d/."
      }
    },
    {
      id: "builder_w9d3_q06",
      roundIndex: 5,
      prompt: "Đuôi '-s / -es' của danh từ và động từ có bao nhiêu cách phát âm chuẩn?",
      options: [
        { id: "opt_A", label: "A", text: "3 cách phát âm (/s/, /z/, /ɪz/)" },
        { id: "opt_B", label: "B", text: "2 cách phát âm (/s/ và /es/)" },
        { id: "opt_C", label: "C", text: "4 cách phát âm tùy thuộc vào độ dài của từ" },
        { id: "opt_D", label: "D", text: "Tất cả đều đọc thành âm câm không phát âm" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. 3 cách phát âm (/s/, /z/, /ɪz/)",
      correctExplanation: "Quy tắc phát âm đuôi -s/-es gồm đúng 3 trường hợp: /s/ (sau âm vô thanh), /ɪz/ (sau âm xuýt /s, z, ʃ, ʒ, tʃ, dʒ/), và /z/ (sau các âm hữu thanh còn lại).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. 2 cách phát âm (/s/ và /es/)",
        diagnosticTitle: "Đọc đuôi -es thành /es/ theo mặt chữ viết",
        explanation: "Đuôi -es sau âm xuýt phát âm là /ɪz/ (ví dụ: 'washes' /ˈwɒʃɪz/), không phải đọc là /es/."
      }
    },
    {
      id: "builder_w9d3_q07",
      roundIndex: 6,
      prompt: "Cụm từ nào thể hiện việc đạt được một cột mốc quan trọng trên con đường học vấn hoặc sự nghiệp cá nhân?",
      options: [
        { id: "opt_A", label: "A", text: "reach a major milestone" },
        { id: "opt_B", label: "B", text: "touch a high stonemark" },
        { id: "opt_C", label: "C", text: "grab an important post" },
        { id: "opt_D", label: "D", text: "catch a big distance point" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. reach a major milestone",
      correctExplanation: "'reach a milestone' (chạm đến một cột mốc quan trọng) là collocation cao cấp thường dùng khi nói về thành tựu cá nhân (Personal achievement).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. touch a high stonemark",
        diagnosticTitle: "Dịch từng chữ 'viên đá mốc' từ tiếng Việt",
        explanation: "Cột mốc trong tiếng Anh là 'milestone', không dịch thành 'stonemark'."
      }
    },
    {
      id: "builder_w9d3_q08",
      roundIndex: 7,
      prompt: "Từ 'persevere' trong câu: \"She persevered through all hardships to graduate with honors\" mang ý nghĩa là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Kiên trì, bền bỉ và không lùi bước trước khó khăn gian khổ" },
        { id: "opt_B", label: "B", text: "Từ bỏ ước mơ để tìm một công việc an nhàn ít thử thách" },
        { id: "opt_C", label: "C", text: "Nhờ người khác làm hộ tất cả các bài luận tốt nghiệp" },
        { id: "opt_D", label: "D", text: "Than phiền với gia đình về áp lực điểm số ở trường" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Kiên trì, bền bỉ và không lùi bước trước khó khăn gian khổ",
      correctExplanation: "'persevere' /ˌpɜː.sɪˈvɪər/ là động từ học thuật band cao chỉ sự kiên định, nỗ lực bền bỉ vượt qua nghịch cảnh.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Từ bỏ ước mơ để tìm một công việc an nhàn ít thử thách",
        diagnosticTitle: "Chọn nghĩa trái ngược hoàn toàn",
        explanation: "'persevere' đối lập với 'give up / surrender' (từ bỏ)."
      }
    },
    {
      id: "builder_w9d3_q09",
      roundIndex: 8,
      prompt: "Khi được hỏi \"What is your greatest personal achievement so far?\", cách bắt đầu nào dưới đây thể hiện sự khiêm tốn nhưng tự tin?",
      options: [
        { id: "opt_A", label: "A", text: "I would say my proudest accomplishment was passing the university entrance exam with flying colors after months of tireless dedication." },
        { id: "opt_B", label: "B", text: "I am the best student in my school and nobody is smarter than me in all exams." },
        { id: "opt_C", label: "C", text: "I have no achievement at all because my life is totally boring and empty." },
        { id: "opt_D", label: "D", text: "I passed exam. That is all. Nothing special to tell you today." },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. I would say my proudest accomplishment was passing the university entrance exam with flying colors after months of tireless dedication.",
      correctExplanation: "Câu A dùng cụm từ xuất sắc: 'proudest accomplishment', thành ngữ 'pass with flying colors' (đạt điểm số rực rỡ), và 'tireless dedication' (sự cống hiến không biết mệt mỏi).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. I am the best student in my school and nobody is smarter than me in all exams.",
        diagnosticTitle: "Lối diễn đạt tự phụ quá đà và dùng từ vựng sơ cấp",
        explanation: "Câu B thể hiện thái độ khoe khoang thiếu tự nhiên, ngữ pháp sơ cấp và không miêu tả được hành trình nỗ lực thực chất."
      }
    },
    {
      id: "builder_w9d3_q10",
      roundIndex: 9,
      prompt: "Từ nào dưới đây có trọng âm rơi vào ÂM TIẾT THỨ BA?",
      options: [
        { id: "opt_A", label: "A", text: "perseverance" },
        { id: "opt_B", label: "B", text: "achievement" },
        { id: "opt_C", label: "C", text: "challenge" },
        { id: "opt_D", label: "D", text: "mentor" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. perseverance",
      correctExplanation: "'per-se-VE-rance' /ˌpɜː.sɪˈvɪə.rəns/ có trọng âm chính rơi vào âm tiết thứ 3 (VE). 'a-CHIEVE-ment' (2), 'CHAL-lenge' (1), 'MEN-tor' (1).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. achievement",
        diagnosticTitle: "Nhầm lẫn giữa âm tiết thứ hai và thứ ba",
        explanation: "'achievement' có trọng âm rơi vào âm tiết thứ 2 /əˈtʃiːvmənt/, không phải âm tiết thứ 3."
      }
    },
  ]
};
