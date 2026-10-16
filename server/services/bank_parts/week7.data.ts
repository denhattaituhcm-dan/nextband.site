/**
 * Question Bank for Week 7 (Day 1, Day 2, Day 3)
 * DOER Coursebook 2027
 */

export const WEEK_7_QUESTIONS: Record<string, any[]> = {
  "WEEK 7 – DAY 1": [
    {
      id: "doer_w7d1_q01",
      roundIndex: 0,
      prompt: "Trong mệnh đề quan hệ bổ nghĩa cho danh từ chỉ nơi chốn, cụm 'in which / at which' có thể được thay thế bằng liên từ/đại từ nào?",
      options: [
        { id: "opt_A", label: "A", text: "where" },
        { id: "opt_B", label: "B", text: "when" },
        { id: "opt_C", label: "C", text: "why" },
        { id: "opt_D", label: "D", text: "which" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Trong Adjective clause: prep + which chỉ nơi chốn (in which, at which) được thay bằng 'where'. Chỉ thời gian (on which, at which) thay bằng 'when', và lý do (for which) thay bằng 'why'."
    },
    {
      id: "doer_w7d1_q02",
      roundIndex: 1,
      prompt: "Xác định lỗi sai trong câu sau: 'Would you lend me the book, which you recommended last week?'",
      options: [
        { id: "opt_A", label: "A", text: "Dấu phẩy không đúng vì 'the book' ở đây cần mệnh đề xác định (defining clause) để người nghe biết đó là cuốn sách nào" },
        { id: "opt_B", label: "B", text: "Sai động từ 'lend', phải dùng 'borrow'" },
        { id: "opt_C", label: "C", text: "'which' phải đổi thành 'where'" },
        { id: "opt_D", label: "D", text: "Phải thêm 'it' sau 'recommended'" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Đây là Defining Adjective Clause (mệnh đề quan hệ xác định) chỉ rõ cuốn sách nào, do đó KHÔNG được dùng dấu phẩy ngăn cách."
    },
    {
      id: "doer_w7d1_q03",
      roundIndex: 2,
      prompt: "Xác định lỗi sai trong câu: 'People, which were invited to the party, didn't turn up.'",
      options: [
        { id: "opt_A", label: "A", text: "Dùng sai 'which' để chỉ người và đặt dấu phẩy sai cho mệnh đề xác định" },
        { id: "opt_B", label: "B", text: "Sai thì của động từ 'didn't turn up'" },
        { id: "opt_C", label: "C", text: "'invited' phải chuyển thành 'inviting'" },
        { id: "opt_D", label: "D", text: "Phải dùng 'person' thay vì 'people'" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'People' là danh từ chỉ người phải dùng 'who'. Đồng thời đây là defining clause xác định rõ nhóm người nào được mời, nên không có dấu phẩy -> 'People who were invited to the party didn't turn up.'"
    },
    {
      id: "doer_w7d1_q04",
      roundIndex: 3,
      prompt: "Quy tắc dùng đại từ quan hệ trong Non-defining adjective clause (mệnh đề quan hệ không xác định, có dấu phẩy) là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Tuyệt đối không được dùng 'that', bắt buộc dùng 'which' (chỉ vật) hoặc 'who' (chỉ người)" },
        { id: "opt_B", label: "B", text: "Bắt buộc phải dùng 'that' thay cho 'which'" },
        { id: "opt_C", label: "C", text: "Chỉ được dùng 'what'" },
        { id: "opt_D", label: "D", text: "Có thể dùng tự do 'that' hay 'which' đều được" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Trong Non-defining clause (đặt giữa hai dấu phẩy bổ sung thông tin), quy tắc ngữ pháp cấm dùng 'that', phải dùng 'which' hoặc 'who'."
    },
    {
      id: "doer_w7d1_q05",
      roundIndex: 4,
      prompt: "Rút gọn mệnh đề tính từ chủ động (Active voice) trong câu: 'Children who learn English at a young age can speak fluently.'",
      options: [
        { id: "opt_A", label: "A", text: "Children learning English at a young age can speak fluently." },
        { id: "opt_B", label: "B", text: "Children learned English at a young age can speak fluently." },
        { id: "opt_C", label: "C", text: "Children to learn English at a young age can speak fluently." },
        { id: "opt_D", label: "D", text: "Children learn English at a young age can speak fluently." }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Khi relative pronoun làm Subject ở thể chủ động (active voice), ta bỏ relative pronoun và chuyển động từ chính sang dạng V-ing (learning)."
    },
    {
      id: "doer_w7d1_q06",
      roundIndex: 5,
      prompt: "Rút gọn mệnh đề tính từ bị động (Passive voice) trong câu: 'The books that were written by J.K. Rowling are very popular.'",
      options: [
        { id: "opt_A", label: "A", text: "The books written by J.K. Rowling are very popular." },
        { id: "opt_B", label: "B", text: "The books writing by J.K. Rowling are very popular." },
        { id: "opt_C", label: "C", text: "The books were written by J.K. Rowling are very popular." },
        { id: "opt_D", label: "D", text: "The books that written by J.K. Rowling are very popular." }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Ở thể bị động (passive voice), khi rút gọn mệnh đề quan hệ ta lược bỏ relative pronoun (that) và trợ động từ be (were), giữ lại Past Participle (V3 - written)."
    },
    {
      id: "doer_w7d1_q07",
      roundIndex: 6,
      prompt: "Rút gọn mệnh đề tính từ khi relative pronoun đóng vai trò tân ngữ (Object): 'This song reminded him of the woman that he used to love.'",
      options: [
        { id: "opt_A", label: "A", text: "This song reminded him of the woman he used to love." },
        { id: "opt_B", label: "B", text: "This song reminded him of the woman loving he used to." },
        { id: "opt_C", label: "C", text: "This song reminded him of the woman loved he used to." },
        { id: "opt_D", label: "D", text: "This song reminded him of the woman was loved by him." }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Khi relative pronoun đóng vai trò là tân ngữ (object pronoun), ta có thể lược bỏ trực tiếp đại từ đó (omission of relative pronoun) mà giữ nguyên phần còn lại."
    },
    {
      id: "doer_w7d1_q08",
      roundIndex: 7,
      prompt: "Dịch sang tiếng Anh có sử dụng Non-defining clause: 'Biến đổi khí hậu, một vấn đề môi trường nghiêm trọng, sẽ được thảo luận tại hội thảo.'",
      options: [
        { id: "opt_A", label: "A", text: "Climate change, which is a serious environmental problem, will be discussed at the upcoming conference." },
        { id: "opt_B", label: "B", text: "Climate change that is a serious environmental problem will be discussed at the conference." },
        { id: "opt_C", label: "C", text: "Climate change, where is a serious environmental problem, will discuss at conference." },
        { id: "opt_D", label: "D", text: "Climate change which a serious problem will be discussed in conference." }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'Climate change' là danh từ riêng/khái niệm duy nhất đã xác định, nên mệnh đề giải thích phải đặt trong hai dấu phẩy và dùng 'which'."
    },
    {
      id: "doer_w7d1_q09",
      roundIndex: 8,
      prompt: "Rút gọn câu có to be + adj/noun: 'My dad, who is old and sick, never goes out of the house.'",
      options: [
        { id: "opt_A", label: "A", text: "My dad, old and sick, never goes out of the house." },
        { id: "opt_B", label: "B", text: "My dad being old and sick never goes out of the house." },
        { id: "opt_C", label: "C", text: "My dad is old and sick never goes out of the house." },
        { id: "opt_D", label: "D", text: "My dad who old and sick never goes out of the house." }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Nếu Finite verb của adjective clause là 'be', khi rút gọn ta bỏ cả relative pronoun và 'be', giữ lại tính từ hoặc cụm danh từ phía sau đặt giữa hai dấu phẩy."
    },
    {
      id: "doer_w7d1_q10",
      roundIndex: 9,
      prompt: "Dịch sang tiếng Anh dùng Reduced clause bị động: 'Để tiết kiệm chi phí, nhà máy đã xả chất thải chưa qua xử lý ra biển.'",
      options: [
        { id: "opt_A", label: "A", text: "To save operating costs, the plant discharged untreated waste into the sea." },
        { id: "opt_B", label: "B", text: "To save operating costs, the plant discharged un-treating waste to sea." },
        { id: "opt_C", label: "C", text: "Saving operating cost, the plant has discharge waste not treat into ocean." },
        { id: "opt_D", label: "D", text: "To save costs, the plant discharge which is not treated waste into sea." }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'untreated waste' là dạng rút gọn của 'waste which has not been treated' (chất thải chưa qua xử lý)."
    }
  ],

  "WEEK 7 – DAY 2": [
    {
      id: "doer_w7d2_q01",
      roundIndex: 0,
      prompt: "Theo bài đọc về sự cố môi trường Formosa năm 2016, nhà máy thép Formosa toạ lạc tại khu kinh tế nào ở miền Trung Việt Nam?",
      options: [
        { id: "opt_A", label: "A", text: "Vung Ang Economic Zone (Khu kinh tế Vũng Áng, Hà Tĩnh)" },
        { id: "opt_B", label: "B", text: "Dung Quat Economic Zone (Quảng Ngãi)" },
        { id: "opt_C", label: "C", text: "Nghi Son Economic Zone (Thanh Hóa)" },
        { id: "opt_D", label: "D", text: "Chu Lai Open Economic Zone (Quảng Nam)" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Bài đọc: 'source of the toxins was from the Vung Ang Economic Zone, in which the Formosa steel plant was located.'"
    },
    {
      id: "doer_w7d2_q02",
      roundIndex: 1,
      prompt: "Công ty Formosa thừa nhận đã nhập khẩu bao nhiêu tấn hoá chất vài ngày trước khi sự cố xảy ra để súc rửa đường ống xả ngầm?",
      options: [
        { id: "opt_A", label: "A", text: "300 tonnes" },
        { id: "opt_B", label: "B", text: "80 tonnes" },
        { id: "opt_C", label: "C", text: "100 tonnes" },
        { id: "opt_D", label: "D", text: "50 tonnes" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Bài đọc: 'it was reported that several days before the incident, 300 tonnes of chemicals were imported by Formosa in order to clean the pipe.'"
    },
    {
      id: "doer_w7d2_q03",
      roundIndex: 2,
      prompt: "Giả thuyết ban đầu nào về nguyên nhân cá chết hàng loạt do đại diện Bộ TN&MT đưa ra nhưng nhanh chóng bị Hội Nghề cá Việt Nam bác bỏ?",
      options: [
        { id: "opt_A", label: "A", text: "Hiện tượng thuỷ triều đỏ (Red tide)" },
        { id: "opt_B", label: "B", text: "Nước biển nóng lên do biến đổi khí hậu" },
        { id: "opt_C", label: "C", text: "Sự cố tràn dầu từ tàu chở hàng ngoài khơi" },
        { id: "opt_D", label: "D", text: "Ngư dân sử dụng thuốc nổ để đánh bắt" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Bài đọc: 'the two main suspects of the marine life destruction were red tide and toxins... However, the red tide explanation was quickly rejected by the Vietnamese Fisheries Society.'"
    },
    {
      id: "doer_w7d2_q04",
      roundIndex: 3,
      prompt: "Tính đến ngày 6 tháng 5 năm 2016, tổng số cá chết dạt vào bờ biển 4 tỉnh miền Trung đã vượt mốc bao nhiêu tấn?",
      options: [
        { id: "opt_A", label: "A", text: "100 tonnes" },
        { id: "opt_B", label: "B", text: "80 tonnes" },
        { id: "opt_C", label: "C", text: "300 tonnes" },
        { id: "opt_D", label: "D", text: "50 tonnes" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Bài đọc: 'By 29 April, approximately 80 tonnes of dead fish had been washed up... On 6 May, the number of collected dead fish exceeded 100 tonnes.'"
    },
    {
      id: "doer_w7d2_q05",
      roundIndex: 4,
      prompt: "Bốn tỉnh ven biển miền Trung Việt Nam chịu ảnh hưởng nặng nề nhất bởi thảm hoạ cá chết Formosa trải dài từ tỉnh nào đến tỉnh nào?",
      options: [
        { id: "opt_A", label: "A", text: "Từ Hà Tĩnh đến Thừa Thiên - Huế" },
        { id: "opt_B", label: "B", text: "Từ Thanh Hóa đến Đà Nẵng" },
        { id: "opt_C", label: "C", text: "Từ Nghệ An đến Quảng Nam" },
        { id: "opt_D", label: "D", text: "Từ Quảng Trị đến Bình Định" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Bài đọc: 'washed up on the shores of four central provinces of Vietnam from Ha Tinh to Thua Thien-Hue.'"
    },
    {
      id: "doer_w7d2_q06",
      roundIndex: 5,
      prompt: "Ngày 30/06/2016, Văn phòng Chính phủ công bố kết luận điều tra chính thức xác định nguyên nhân sự cố là do đâu?",
      options: [
        { id: "opt_A", label: "A", text: "Formosa vi phạm khi xả chất thải độc hại chứa độc tố vượt mức cho phép ra biển" },
        { id: "opt_B", label: "B", text: "Do tảo biển nở hoa phát sinh độc tố tự nhiên" },
        { id: "opt_C", label: "C", text: "Do động đất ngầm dưới đáy biển gây nứt đường ống" },
        { id: "opt_D", label: "D", text: "Do thời tiết cực đoan làm cá chết ngạt thiếu oxy" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Bài đọc: 'discovered violations regarding Formosa discharging toxic waste into the sea, which contained toxins that exceeded the permitted level.'"
    },
    {
      id: "doer_w7d2_q07",
      roundIndex: 6,
      prompt: "Từ vựng: 'The disaster negatively affected the livelihood of fishermen.' Từ 'livelihood' có nghĩa là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Kế sinh nhai, sinh kế kiếm sống hàng ngày" },
        { id: "opt_B", label: "B", text: "Tàu bè và ngư cụ đánh bắt cá" },
        { id: "opt_C", label: "C", text: "Chỗ ở và hộ khẩu thường trú" },
        { id: "opt_D", label: "D", text: "Sức khoẻ tinh thần và thể chất" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'Livelihood' là kế sinh nhai, phương tiện sinh sống (a means of securing the necessities of life)."
    },
    {
      id: "doer_w7d2_q08",
      roundIndex: 7,
      prompt: "Cụm từ tiếng Anh nào diễn tả 'chất thải độc hại vượt quá ngưỡng quy định cho phép'?",
      options: [
        { id: "opt_A", label: "A", text: "Toxic waste containing toxins that exceeded the permitted level" },
        { id: "opt_B", label: "B", text: "Chemicals discharged under strict national supervision" },
        { id: "opt_C", label: "C", text: "Red tide spreading along coastal waters" },
        { id: "opt_D", label: "D", text: "Organic waste dissolved in salt water naturally" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Trong thông cáo bài đọc: 'discharging toxic waste into the sea, which contained toxins that exceeded the permitted level'."
    },
    {
      id: "doer_w7d2_q09",
      roundIndex: 8,
      prompt: "Cụm từ 'marine life' trong cụm 'marine life disaster' mang nghĩa là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Đời sống và hệ sinh thái sinh vật biển" },
        { id: "opt_B", label: "B", text: "Thương nghiệp tàu thuyền đánh bắt xa bờ" },
        { id: "opt_C", label: "C", text: "Lực lượng hải quân tuần tra duyên hải" },
        { id: "opt_D", label: "D", text: "Bờ biển nghỉ dưỡng du lịch sinh thái" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'Marine life' = sinh vật biển, hệ sinh thái đại dương."
    },
    {
      id: "doer_w7d2_q10",
      roundIndex: 9,
      prompt: "Động từ 'discharge' trong câu 'Formosa was responsible for discharging toxic waste' đồng nghĩa với từ nào sau đây?",
      options: [
        { id: "opt_A", label: "A", text: "release / dump" },
        { id: "opt_B", label: "B", text: "recycle" },
        { id: "opt_C", label: "C", text: "purify" },
        { id: "opt_D", label: "D", text: "absorb" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'Discharge' (chất thải) = thải ra, xả ra = release / dump into the environment."
    }
  ],

  "WEEK 7 – DAY 3": [
    {
      id: "doer_w7d3_q01",
      roundIndex: 0,
      prompt: "Đuôi '-s/-es' trong tiếng Anh có bao nhiêu cách phát âm chuẩn?",
      options: [
        { id: "opt_A", label: "A", text: "3 cách: /s/, /z/, và /ɪz/" },
        { id: "opt_B", label: "B", text: "2 cách: /s/ và /z/" },
        { id: "opt_C", label: "C", text: "4 cách: /s/, /z/, /ʃ/, /tʃ/" },
        { id: "opt_D", label: "D", text: "1 cách duy nhất: /s/" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Đuôi -s/-es có 3 cách đọc: /ɪz/ (sau các âm xì/âm gió), /s/ (sau âm vô thanh), và /z/ (sau âm hữu thanh và nguyên âm)."
    },
    {
      id: "doer_w7d3_q02",
      roundIndex: 1,
      prompt: "Các từ có âm tận cùng là /s/, /z/, /ʃ/, /ʒ/, /tʃ/, /dʒ/ khi thêm đuôi '-es' sẽ được phát âm là gì?",
      options: [
        { id: "opt_A", label: "A", text: "/ɪz/" },
        { id: "opt_B", label: "B", text: "/s/" },
        { id: "opt_C", label: "C", text: "/z/" },
        { id: "opt_D", label: "D", text: "Câm không phát âm" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Các âm xuýt/gió sibilants (/s, z, ʃ, ʒ, tʃ, dʒ/) khi thêm -es đều được phát âm thành /ɪz/ (ví dụ: washes, brushes, watches, boxes)."
    },
    {
      id: "doer_w7d3_q03",
      roundIndex: 2,
      prompt: "Khẩu quyết 'thèm cà phê phở tái' ứng với các âm vô thanh nào để nhận biết đuôi '-s' đọc là /s/?",
      options: [
        { id: "opt_A", label: "A", text: "/θ/, /k/, /p/, /f/, /t/" },
        { id: "opt_B", label: "B", text: "/s/, /ʃ/, /tʃ/, /dʒ/, /z/" },
        { id: "opt_C", label: "C", text: "/b/, /d/, /g/, /v/, /m/" },
        { id: "opt_D", label: "D", text: "/l/, /r/, /n/, /ŋ/, /w/" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Mẹo nhớ các âm vô thanh (unvoiced consonants): /θ/ (thèm), /k/ (cà), /p/ (phê), /f/ (phở), /t/ (tái). Khi kết thúc bằng các âm này, -s đọc là /s/."
    },
    {
      id: "doer_w7d3_q04",
      roundIndex: 3,
      prompt: "Từ nào dưới đây có đuôi '-s/-es' được phát âm là /ɪz/?",
      options: [
        { id: "opt_A", label: "A", text: "washes" },
        { id: "opt_B", label: "B", text: "gets" },
        { id: "opt_C", label: "C", text: "books" },
        { id: "opt_D", label: "D", text: "plays" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'wash' kết thúc bằng âm /ʃ/ nên khi thêm -es đọc là /wɒʃɪz/ (/ɪz/)."
    },
    {
      id: "doer_w7d3_q05",
      roundIndex: 4,
      prompt: "Từ nào dưới đây có đuôi '-s' được phát âm là /s/?",
      options: [
        { id: "opt_A", label: "A", text: "gets" },
        { id: "opt_B", label: "B", text: "goes" },
        { id: "opt_C", label: "C", text: "cleans" },
        { id: "opt_D", label: "D", text: "runs" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'get' tận cùng là âm vô thanh /t/ ('tái'), nên đuôi -s phát âm là /s/ -> /ɡets/."
    },
    {
      id: "doer_w7d3_q06",
      roundIndex: 5,
      prompt: "Từ nào dưới đây có đuôi '-es' được phát âm là /z/?",
      options: [
        { id: "opt_A", label: "A", text: "goes" },
        { id: "opt_B", label: "B", text: "watches" },
        { id: "opt_C", label: "C", text: "catches" },
        { id: "opt_D", label: "D", text: "kisses" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'go' kết thúc bằng nguyên âm /oʊ/ (âm hữu thanh/rung), nên đuôi -es được phát âm là /z/ -> /ɡoʊz/."
    },
    {
      id: "doer_w7d3_q07",
      roundIndex: 6,
      prompt: "Trong đoạn văn thực hành: 'He gets up at 6 am, washes his face, brushes his teeth, and exercises for 15 minutes', có bao nhiêu từ chứa đuôi đọc là /ɪz/?",
      options: [
        { id: "opt_A", label: "A", text: "3 từ: washes, brushes, exercises" },
        { id: "opt_B", label: "B", text: "1 từ: washes" },
        { id: "opt_C", label: "C", text: "2 từ: gets, washes" },
        { id: "opt_D", label: "D", text: "4 từ: gets, washes, brushes, exercises" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Washes (/ʃɪz/), brushes (/ʃɪz/), exercises (/saɪzɪz/) đều tận cùng bằng âm gió và phát âm /ɪz/. Riêng 'gets' đọc là /s/."
    },
    {
      id: "doer_w7d3_q08",
      roundIndex: 7,
      prompt: "Trong chủ đề Friendship (Tình bạn), cụm từ 'have a lot in common with someone' mang ý nghĩa là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Có nhiều điểm chung, cùng sở thích và quan điểm với ai đó" },
        { id: "opt_B", label: "B", text: "Có chung nhiều món nợ tài chính với nhau" },
        { id: "opt_C", label: "C", text: "Sống cùng trong một khu phố tập thể" },
        { id: "opt_D", label: "D", text: "Rất hay cãi vã vì bất đồng tính cách" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'have a lot in common' là collocation quen thuộc trong Speaking topic Friendship: có rất nhiều điểm chung sở thích, thói quen."
    },
    {
      id: "doer_w7d3_q09",
      roundIndex: 8,
      prompt: "Cụm từ nào diễn tả một 'người bạn thân thiết tri kỷ có thể tâm sự mọi điều'?",
      options: [
        { id: "opt_A", label: "A", text: "A close confidant / intimate friend" },
        { id: "opt_B", label: "B", text: "A casual acquaintance" },
        { id: "opt_C", label: "C", text: "A fair-weather friend" },
        { id: "opt_D", label: "D", text: "A stranger on the street" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'close confidant' (người bạn tâm tình, tri kỷ). Trái ngược với 'casual acquaintance' (người quen sơ giao) hay 'fair-weather friend' (bạn cơ hội, chỉ ở bên lúc vui)."
    },
    {
      id: "doer_w7d3_q10",
      roundIndex: 9,
      prompt: "Thành ngữ 'keep in touch with someone' có nghĩa là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Giữ liên lạc thường xuyên với ai đó" },
        { id: "opt_B", label: "B", text: "Chạm tay vào vai ai đó khi gặp mặt" },
        { id: "opt_C", label: "C", text: "Cắt đứt mọi liên lạc vì hiểu lầm" },
        { id: "opt_D", label: "D", text: "Theo dõi vị trí của ai đó trên mạng xã hội" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'keep in touch with sb' (hoặc stay in touch) = duy trì liên lạc với ai đó."
    }
  ]
};
