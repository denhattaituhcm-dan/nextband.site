/**
 * Question Bank for Week 9 (Day 1, Day 2, Day 3)
 * DOER Coursebook 2027
 */

export const WEEK_9_QUESTIONS: Record<string, any[]> = {
  "WEEK 9 – DAY 1": [
    {
      id: "doer_w9d1_q01",
      roundIndex: 0,
      prompt: "Lỗi ngữ pháp 'Comma Splice' là gì trong câu tiếng Anh?",
      options: [
        { id: "opt_A", label: "A", text: "Nối 2 mệnh đề độc lập (main clauses) chỉ bằng một dấu phẩy mà không có liên từ phù hợp" },
        { id: "opt_B", label: "B", text: "Đặt dấu phẩy sau liên từ 'because' ở đầu câu" },
        { id: "opt_C", label: "C", text: "Quên không đặt dấu phẩy trước liên từ 'and' liệt kê 3 danh từ" },
        { id: "opt_D", label: "D", text: "Sử dụng dấu chấm phẩy thay cho dấu chấm hết câu" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Comma Splice là lỗi nghiêm trọng trong IELTS Writing: dùng dấu phẩy để nối 2 mệnh đề độc lập (ví dụ: 'He got 6.5, now he can apply...' - phải dùng liên từ hoặc dấu chấm)."
    },
    {
      id: "doer_w9d1_q02",
      roundIndex: 1,
      prompt: "Xác định lỗi sai trong câu: 'Because I have an important meeting tomorrow, so I asked my teacher for a day off.'",
      options: [
        { id: "opt_A", label: "A", text: "Dùng thừa liên từ 'so' do ảnh hưởng dịch từ tiếng Việt 'Bởi vì... nên...'" },
        { id: "opt_B", label: "B", text: "Động từ 'asked' phải chuyển thành 'asking'" },
        { id: "opt_C", label: "C", text: "'tomorrow' không được đi với thì hiện tại" },
        { id: "opt_D", label: "D", text: "Sau 'Because' phải dùng danh từ chứ không được dùng clause" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Trong tiếng Anh chỉ được dùng 1 liên từ nối 2 clause: Hoặc dùng 'Because...', hoặc dùng '..., so...'. Không bao giờ dùng cả hai 'Because... so...' trong 1 câu."
    },
    {
      id: "doer_w9d1_q03",
      roundIndex: 2,
      prompt: "Xác định lỗi sai trong câu: 'I got a good result on the final test because my efforts during the course.'",
      options: [
        { id: "opt_A", label: "A", text: "Dùng 'because' trước một noun phrase, phải sửa thành 'because of' (hoặc thanks to)" },
        { id: "opt_B", label: "B", text: "Sai giới từ 'on', phải dùng 'in'" },
        { id: "opt_C", label: "C", text: "'got' phải chuyển thành 'have got'" },
        { id: "opt_D", label: "D", text: "'efforts' không được thêm 's'" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'Because' đi với một mệnh đề (clause có S + V). Còn trước cụm danh từ 'my efforts during the course' bắt buộc phải dùng giới từ 'because of' hoặc 'due to/thanks to'."
    },
    {
      id: "doer_w9d1_q04",
      roundIndex: 3,
      prompt: "Điền liên từ thích hợp: 'Many girls want to become beauty vloggers, ____________ boys usually dream of becoming game streamers.'",
      options: [
        { id: "opt_A", label: "A", text: "whereas" },
        { id: "opt_B", label: "B", text: "because" },
        { id: "opt_C", label: "C", text: "so that" },
        { id: "opt_D", label: "D", text: "therefore" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Để thể hiện sự đối lập, tương phản giữa 2 vế câu (con gái thích vlogger trong khi con trai thích streamer), ta dùng liên từ 'whereas' hoặc 'while'."
    },
    {
      id: "doer_w9d1_q05",
      roundIndex: 4,
      prompt: "Điền liên từ thích hợp: 'He failed the test, ____________ he spent a lot of time revising.'",
      options: [
        { id: "opt_A", label: "A", text: "although" },
        { id: "opt_B", label: "B", text: "because" },
        { id: "opt_C", label: "C", text: "so" },
        { id: "opt_D", label: "D", text: "as long as" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Vế 1 (rớt bài thi) trái ngược với vế 2 (dành nhiều thời gian ôn tập), do đó phải dùng liên từ nhượng bộ 'although' (mặc dù)."
    },
    {
      id: "doer_w9d1_q06",
      roundIndex: 5,
      prompt: "Điền liên từ thích hợp: 'You can easily get a 6.5 in the IELTS test, ____________ you spend at least 2 hours each day studying English.'",
      options: [
        { id: "opt_A", label: "A", text: "as long as" },
        { id: "opt_B", label: "B", text: "unless" },
        { id: "opt_C", label: "C", text: "although" },
        { id: "opt_D", label: "D", text: "whereas" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'as long as' / 'provided that' mang nghĩa là 'miễn là / với điều kiện là'."
    },
    {
      id: "doer_w9d1_q07",
      roundIndex: 6,
      prompt: "Xác định lỗi câu rời rạc (Sentence Fragment): 'Having a 6.0 IELTS is beneficial. Because it helps them to apply to international companies.'",
      options: [
        { id: "opt_A", label: "A", text: "Câu thứ hai chỉ là một mệnh đề phụ (subordinating clause) bắt đầu bằng 'Because', không thể đứng độc lập thành câu riêng" },
        { id: "opt_B", label: "B", text: "'beneficial' phải đi với giới từ 'for' thay vì dấu chấm" },
        { id: "opt_C", label: "C", text: "'apply' phải chuyển thành 'applying'" },
        { id: "opt_D", label: "D", text: "Câu hoàn toàn đúng ngữ pháp không có lỗi" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Mệnh đề phụ thuộc 'Because it helps...' không thể tách làm 1 câu riêng biệt. Cần nối liền vào câu trước: '...is beneficial because it helps...'"
    },
    {
      id: "doer_w9d1_q08",
      roundIndex: 7,
      prompt: "Dịch sang tiếng Anh dùng cấu trúc mệnh đề điều kiện: 'Nếu người trẻ ăn ít thức ăn nhanh hơn, sẽ có ít ca béo phì, làm giảm áp lực lên hệ thống y tế.'",
      options: [
        { id: "opt_A", label: "A", text: "If young people consumed less fast food, there would be fewer obesity cases, which would reduce pressure on the healthcare system." },
        { id: "opt_B", label: "B", text: "If young people eat less fast food so there will be fewer obesity case to reduce pressure on healthcare." },
        { id: "opt_C", label: "C", text: "If young people eating less fast food, fewer obesity cases happens, reduce healthcare." },
        { id: "opt_D", label: "D", text: "Young people eat less fast food if fewer obesity cases reduce on healthcare system." }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Câu điều kiện kết hợp đại từ quan hệ thay thế cả mệnh đề: '..., which would reduce pressure on the healthcare system'."
    },
    {
      id: "doer_w9d1_q09",
      roundIndex: 8,
      prompt: "Nối 2 vế câu diễn tả nguyên nhân - kết quả: 'Fast food is extremely convenient. Many people eat it daily despite knowing it is harmful.'",
      options: [
        { id: "opt_A", label: "A", text: "Fast food is so convenient that many people eat it daily even though they know it is harmful." },
        { id: "opt_B", label: "B", text: "Because fast food is convenient, but many people eat it daily." },
        { id: "opt_C", label: "C", text: "Although fast food is convenient so people eat it daily." },
        { id: "opt_D", label: "D", text: "Fast food is convenient, so that people eating it despite harmful." }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Cấu trúc 'so + adj + that...' (quá... đến nỗi mà...) kết hợp với liên từ nhượng bộ 'even though' thể hiện trọn vẹn ngữ nghĩa."
    },
    {
      id: "doer_w9d1_q10",
      roundIndex: 9,
      prompt: "Trong câu phức (Complex sentence), quy tắc bắt buộc về số lượng mệnh đề chính (Main clause) là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Bất kể câu dài hay ngắn, trong câu luôn cần có ít nhất 1 Main Clause có thể đứng độc lập mang thông tin chính" },
        { id: "opt_B", label: "B", text: "Câu phức không được phép có bất kỳ Main Clause nào" },
        { id: "opt_C", label: "C", text: "Bắt buộc phải có đúng 3 Main Clauses" },
        { id: "opt_D", label: "D", text: "Main Clause luôn luôn phải đặt ở cuối câu sau tất cả các Subordinating Clauses" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Quy tắc ngữ pháp căn bản: Mỗi câu văn hoàn chỉnh luôn phải có ít nhất 1 mệnh đề độc lập (Main Clause) mang ý nghĩa trọn vẹn."
    }
  ],

  "WEEK 9 – DAY 2": [
    {
      id: "doer_w9d2_q01",
      roundIndex: 0,
      prompt: "Trong chủ đề Media & Influencers, từ \"authenticity\" trong câu \"Khoai Lang Thang's success lies in his authenticity\" ĐỒNG NGHĨA nhất với:",
      options: [
        { id: "opt_A", label: "A", text: "genuineness" },
        { id: "opt_B", label: "B", text: "artificiality" },
        { id: "opt_C", label: "C", text: "extravagance" },
        { id: "opt_D", label: "D", text: "popularity" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Nối 2 mệnh đề độc lập (main clauses) chỉ bằng một dấu phẩy mà không có liên từ phù hợp",
      correctExplanation: "\"Authenticity\" (danh từ) = tính chân thực, không diễn xuất giả tạo, đồng nghĩa với genuineness.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Đặt dấu phẩy sau liên từ ",
        diagnosticTitle: "Chọn nhầm từ trái nghĩa",
        explanation: "Fakery/artificiality là sự giả tạo dàn dựng PR, trái ngược hoàn toàn với phẩm chất authenticity của vlogger."
      }
    },
    {
      id: "doer_w9d2_q02",
      roundIndex: 1,
      prompt: "Từ TRÁI NGHĨA với \"approachable\" trong câu \"YouTube stars connect better with people by being approachable\" là:",
      options: [
        { id: "opt_A", label: "A", text: "distant" },
        { id: "opt_B", label: "B", text: "friendly" },
        { id: "opt_C", label: "C", text: "humorous" },
        { id: "opt_D", label: "D", text: "weird" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. distant",
      correctExplanation: "\"Approachable\" = thân thiện, dễ gần, tạo cảm giác chan hòa. Từ trái nghĩa là \"distant\" (xa cách, kiêu kỳ như ngôi sao truyền hình).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Đặt dấu phẩy sau liên từ ",
        diagnosticTitle: "Chọn nhầm từ đồng nghĩa thay vì từ trái nghĩa",
        explanation: "Friendly và accessible là từ đồng nghĩa với approachable. Đề bài yêu cầu tìm từ TRÁI NGHĨA."
      }
    },
    {
      id: "doer_w9d2_q03",
      roundIndex: 2,
      prompt: "Cụm danh từ \"peer-to-peer advice\" trong nghiên cứu thị hiếu thế hệ trẻ có nghĩa là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Lời khuyên, sự tư vấn từ bạn bè đồng trang lứa và cộng đồng ngang hàng" },
        { id: "opt_B", label: "B", text: "Thông điệp quảng cáo trên sóng truyền hình quốc gia" },
        { id: "opt_C", label: "C", text: "Chỉ thị hành chính từ cơ quan quản lý nhà nước" },
        { id: "opt_D", label: "D", text: "Lời phát biểu của các ngôi sao màn bạc Hollywood" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Lời khuyên, sự tư vấn từ bạn bè đồng trang lứa và cộng đồng ngang hàng",
      correctExplanation: "\"Peer\" là bạn đồng lứa/người ngang hàng. \"Peer-to-peer advice\" là lời khuyên truyền miệng giữa những người có cùng hoàn cảnh sống.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Đặt dấu phẩy sau liên từ ",
        diagnosticTitle: "Nhầm lẫn tiếp thị truyền thông với chia sẻ ngang hàng",
        explanation: "Quảng cáo truyền hình là tiếp thị áp đặt một chiều (top-down), đối lập với sự tin tưởng tự nhiên của lời khuyên đồng trang lứa (peer-to-peer)."
      }
    },
    {
      id: "doer_w9d2_q04",
      roundIndex: 3,
      prompt: "Collocation chuẩn trong bài: \"Unlike traditional celebrities, ordinary influencers are now setting trends and driving ______ on social platforms.\"",
      options: [
        { id: "opt_A", label: "A", text: "opinions" },
        { id: "opt_B", label: "B", text: "cars" },
        { id: "opt_C", label: "C", text: "lorries" },
        { id: "opt_D", label: "D", text: "roads" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. opinions",
      correctExplanation: "Collocation truyền thông học: \"drive opinions\" = định hướng dư luận, dẫn dắt quan điểm công chúng.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Đặt dấu phẩy sau liên từ ",
        diagnosticTitle: "Dịch nghĩa đen của động từ drive thành lái xe",
        explanation: "Trong lĩnh vực xã hội học truyền thông, \"drive opinions\" mang nghĩa bóng là dẫn dắt ý kiến số đông."
      }
    },
    {
      id: "doer_w9d2_q05",
      roundIndex: 4,
      prompt: "Collocation kinh tế học chỉ khả năng chi trả của người tiêu dùng: \"Millennials represent over $1.3 trillion in ______.\"",
      options: [
        { id: "opt_A", label: "A", text: "buying power" },
        { id: "opt_B", label: "B", text: "buying energy" },
        { id: "opt_C", label: "C", text: "buying muscle" },
        { id: "opt_D", label: "D", text: "buying effort" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. buying power",
      correctExplanation: "\"Buying power\" (hoặc purchasing power) là thuật ngữ tài chính tiêu chuẩn chỉ tổng năng lực tài chính và sức mua sắm hàng hóa.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Đặt dấu phẩy sau liên từ ",
        diagnosticTitle: "Dùng từ năng lượng thay vì thuật ngữ sức mua",
        explanation: "Năng lực mua sắm trong kinh tế bắt buộc dùng danh từ \"power\", không dùng \"energy\" hay \"muscle\"."
      }
    },
    {
      id: "doer_w9d2_q06",
      roundIndex: 5,
      prompt: "Cụm thành ngữ trong bài: \"The influence of young YouTubers may fall ______ with older generations who prefer traditional media.\"",
      options: [
        { id: "opt_A", label: "A", text: "flat" },
        { id: "opt_B", label: "B", text: "down" },
        { id: "opt_C", label: "C", text: "deep" },
        { id: "opt_D", label: "D", text: "low" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. flat",
      correctExplanation: "Idiom chuẩn: \"fall flat\" = thất bại, không tạo được hiệu ứng hay sức hút đối với một nhóm khán giả cụ thể.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Đặt dấu phẩy sau liên từ ",
        diagnosticTitle: "Dịch thành ngữ rơi xuống (fall down)",
        explanation: "Fall down là ngã sấp cơ học, còn thông điệp/sức ảnh hưởng không có tác dụng với ai phải dùng thành ngữ \"fall flat\"."
      }
    },
    {
      id: "doer_w9d2_q07",
      roundIndex: 6,
      prompt: "Chọn giới từ đúng đi kèm động từ đồng cảm: \"Audiences can easily relate ______ the vlogger's humble background and sincere journey.\"",
      options: [
        { id: "opt_A", label: "A", text: "to" },
        { id: "opt_B", label: "B", text: "with" },
        { id: "opt_C", label: "C", text: "for" },
        { id: "opt_D", label: "D", text: "about" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. to",
      correctExplanation: "Cấu trúc cảm xúc giao tiếp: \"relate TO somebody/something\" (thấu hiểu, tìm thấy sự đồng cảm sâu sắc với câu chuyện của ai).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Đặt dấu phẩy sau liên từ ",
        diagnosticTitle: "Dùng giới từ \"with\" do thói quen liên kết nghĩa",
        explanation: "Mặc dù communicate with có with, cấu trúc đồng cảm tâm lý bắt buộc là \"relate TO somebody\"."
      }
    },
    {
      id: "doer_w9d2_q08",
      roundIndex: 7,
      prompt: "Cụm danh từ \"distaste for advertising\" trong câu \"people's distaste for advertising has redefined celebrity\" có nghĩa là:",
      options: [
        { id: "opt_A", label: "A", text: "Sự ác cảm, chán ghét những mẩu quảng cáo phô trương thiếu trung thực" },
        { id: "opt_B", label: "B", text: "Vị đắng chát khi nếm thử thức ăn quảng cáo" },
        { id: "opt_C", label: "C", text: "Niềm đam mê xem lại các clip quảng cáo cũ" },
        { id: "opt_D", label: "D", text: "Thói quen tắt âm thanh tivi" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Sự ác cảm, chán ghét những mẩu quảng cáo phô trương thiếu trung thực",
      correctExplanation: "\"Distaste for something\" = cảm giác không ưa, ác cảm hoặc phản đối điều gì một cách sâu sắc.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Đặt dấu phẩy sau liên từ ",
        diagnosticTitle: "Hiểu nhầm tiền tố dis-taste theo vị giác sinh học",
        explanation: "Trong ngữ cảnh truyền thông, distaste là thái độ ác cảm về mặt tâm lý, không liên quan đến vị giác trên lưỡi."
      }
    },
    {
      id: "doer_w9d2_q09",
      roundIndex: 8,
      prompt: "VẬN DỤNG NGỮ CẢNH MỚI: Chọn từ thích hợp điền vào câu phân tích tiếp thị: \"Brands now recruit digital content ______ to forge genuine, transparent dialogues with modern consumers.\"",
      options: [
        { id: "opt_A", label: "A", text: "creators" },
        { id: "opt_B", label: "B", text: "campuses" },
        { id: "opt_C", label: "C", text: "burnouts" },
        { id: "opt_D", label: "D", text: "blands" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. creators",
      correctExplanation: "\"Content creators\" là danh từ chuẩn nghề nghiệp chỉ các nhà sáng tạo nội dung trên mạng xã hội hiện đại.",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Quên không đặt dấu phẩy trước liên từ ",
        diagnosticTitle: "Chọn sai chủ thể nhân sự",
        explanation: "Burnout là tình trạng kiệt sức lao động, không phải chức danh nghề nghiệp truyền thông."
      }
    },
    {
      id: "doer_w9d2_q10",
      roundIndex: 9,
      prompt: "PARAPHRASE: Câu \"Millennials disdain scripted promotional endorsements by mainstream celebrities, placing their confidence instead in authentic peer-to-peer recommendations\" được diễn đạt lại tương đương nhất là:",
      options: [
        { id: "opt_A", label: "A", text: "Younger demographics reject staged commercial ads by traditional stars, trusting candid guidance from relatable online personalities instead." },
        { id: "opt_B", label: "B", text: "Television commercials have completely regained total trust among teenagers who refuse to open mobile applications." },
        { id: "opt_C", label: "C", text: "Movie stars are officially prohibited from partnering with consumer product manufacturers." },
        { id: "opt_D", label: "D", text: "Consumers make purchases strictly when celebrities refuse to disclose sponsored agreements." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Younger demographics reject staged commercial ads by traditional stars, trusting candid guidance from relatable online personalities instead.",
      correctExplanation: "\"Younger demographics reject staged commercial ads\" paraphrase cho \"disdain scripted promotional endorsements\", và \"trusting candid guidance from relatable personalities\" paraphrase cho \"confidence in authentic peer-to-peer recommendations\".",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Đặt dấu phẩy sau liên từ ",
        diagnosticTitle: "Đảo ngược xu hướng tiêu dùng của giới trẻ",
        explanation: "Giới trẻ ngày nay né tránh quảng cáo tivi truyền thống và tìm kiếm sự chân thực từ những người có hoàn cảnh tương đồng."
      }
    }
  ],

  "WEEK 9 – DAY 3": [
    {
      id: "doer_w9d3_q01",
      roundIndex: 0,
      prompt: "Kỹ thuật 'Grouping words' (hay Chunking) trong IELTS Speaking có vai trò gì quan trọng nhất?",
      options: [
        { id: "opt_A", label: "A", text: "Ngắt nghỉ và phát âm các cụm từ có nghĩa liền mạch với nhau, giúp câu nói tự nhiên và người nghe dễ nắm bắt thông tin" },
        { id: "opt_B", label: "B", text: "Nói từng từ một ngắt quãng đều đặn để kéo dài thời gian thi" },
        { id: "opt_C", label: "C", text: "Phát âm dính tất cả các từ trong cả một đoạn văn không thở" },
        { id: "opt_D", label: "D", text: "Chỉ ngắt hơi duy nhất ở các liên từ 'and' và 'or'" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Grouping words (Chunking): Nhóm các từ liên quan ngữ nghĩa thành một cụm phát âm liền mạch (thought groups) giúp bài nói tự nhiên và mạch lạc."
    },
    {
      id: "doer_w9d3_q02",
      roundIndex: 1,
      prompt: "Trong ví dụ bài học: 'I bought a nice new jacket / with a zip down the front / and a lot of pockets', cách ngắt cụm này thể hiện điều gì?",
      options: [
        { id: "opt_A", label: "A", text: "Ngắt thành 3 nhóm thông tin hợp lý về ngữ nghĩa: món đồ mua, chi tiết khoá kéo, và chi tiết nhiều túi" },
        { id: "opt_B", label: "B", text: "Ngắt sai vì phải ngắt sau chữ 'nice'" },
        { id: "opt_C", label: "C", text: "Ngắt ngẫu nhiên theo số lượng âm tiết chẵn lẻ" },
        { id: "opt_D", label: "D", text: "Chỉ nên ngắt ở dấu chấm cuối câu" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Mỗi chunk mang một đơn vị ý nghĩa hoàn chỉnh (a meaningful grammatical unit): đối tượng mua, đặc điểm khoá kéo, đặc điểm túi áo."
    },
    {
      id: "doer_w9d3_q03",
      roundIndex: 2,
      prompt: "Từ 'refrigeration' có bao nhiêu âm tiết (syllables) và trọng âm rơi vào âm tiết thứ mấy?",
      options: [
        { id: "opt_A", label: "A", text: "5 âm tiết, trọng âm rơi vào âm tiết thứ 4" },
        { id: "opt_B", label: "B", text: "4 âm tiết, trọng âm rơi vào âm tiết thứ 1" },
        { id: "opt_C", label: "C", text: "5 âm tiết, trọng âm rơi vào âm tiết thứ 2" },
        { id: "opt_D", label: "D", text: "3 âm tiết, trọng âm rơi vào âm tiết thứ 3" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Re-frig-er-a-tion có 5 âm tiết: /rɪˌfrɪdʒ.əˈreɪ.ʃən/, trọng âm chính rơi vào âm tiết thứ 4 (-ra-)."
    },
    {
      id: "doer_w9d3_q04",
      roundIndex: 3,
      prompt: "Từ danh từ 'access' (sự truy cập, đường vào) có trọng âm rơi vào âm tiết thứ mấy?",
      options: [
        { id: "opt_A", label: "A", text: "Âm tiết thứ 1" },
        { id: "opt_B", label: "B", text: "Âm tiết thứ 2" },
        { id: "opt_C", label: "C", text: "Trọng âm đều cả 2 âm tiết" },
        { id: "opt_D", label: "D", text: "Không có trọng âm" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Hầu hết danh từ 2 âm tiết có trọng âm rơi vào âm tiết đầu tiên: 'access' -> /ˈæk.ses/."
    },
    {
      id: "doer_w9d3_q05",
      roundIndex: 4,
      prompt: "Cụm diễn đạt nào sau đây dùng để nói về sở thích cá nhân tương đương với 'I like/love'?",
      options: [
        { id: "opt_A", label: "A", text: "I'm really into" },
        { id: "opt_B", label: "B", text: "I'm bored with" },
        { id: "opt_C", label: "C", text: "I doubt that" },
        { id: "opt_D", label: "D", text: "I am obliged to" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Các cách diễn đạt tự nhiên thay cho 'I like': be into sth, be keen on sth, have a passion for sth."
    },
    {
      id: "doer_w9d3_q06",
      roundIndex: 5,
      prompt: "Điền từ thích hợp vào câu trả lời Speaking: 'Reading books helps me ____________ my knowledge and ____________ my mind.'",
      options: [
        { id: "opt_A", label: "A", text: "expand" },
        { id: "opt_B", label: "B", text: "destroy" },
        { id: "opt_C", label: "C", text: "shorten" },
        { id: "opt_D", label: "D", text: "forget" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Collocation quen thuộc: 'expand one's knowledge' (mở rộng kiến thức) và 'refresh one's mind' (thư giãn, nạp lại năng lượng cho tâm trí)."
    },
    {
      id: "doer_w9d3_q07",
      roundIndex: 6,
      prompt: "Khi trả lời câu hỏi Speaking: 'How have your hobbies changed over time?', thí sinh cần phối hợp các thì nào để thể hiện sự biến đổi?",
      options: [
        { id: "opt_A", label: "A", text: "Quá khứ cho thói quen cũ, Hiện tại đơn cho hiện tại, và cấu trúc tương lai cho dự định" },
        { id: "opt_B", label: "B", text: "Chỉ dùng một thì Quá khứ đơn cho toàn bộ câu trả lời" },
        { id: "opt_C", label: "C", text: "Chỉ dùng Hiện tại tiếp diễn" },
        { id: "opt_D", label: "D", text: "Chỉ dùng Tương lai đơn với 'will'" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Chiến thuật ghi điểm ngữ pháp Range & Accuracy: Kết hợp Past (When I was young, I used to...), Present (Nowadays, I'm into...), và Future (In the future, I plan to...)."
    },
    {
      id: "doer_w9d3_q08",
      roundIndex: 7,
      prompt: "Cụm phrasal verb nào mang nghĩa 'bắt đầu một sở thích mới' (start a new hobby)?",
      options: [
        { id: "opt_A", label: "A", text: "Take up a new hobby" },
        { id: "opt_B", label: "B", text: "Give up a new hobby" },
        { id: "opt_C", label: "C", text: "Put off a new hobby" },
        { id: "opt_D", label: "D", text: "Look down on a new hobby" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'take up a hobby/sport' là phrasal verb kinh điển: bắt đầu một sở thích hoặc môn thể thao mới."
    },
    {
      id: "doer_w9d3_q09",
      roundIndex: 8,
      prompt: "Cụm từ nào mang nghĩa 'dần mất đi sự hứng thú đối với một việc gì đó'?",
      options: [
        { id: "opt_A", label: "A", text: "Lose interest in something" },
        { id: "opt_B", label: "B", text: "Gain enthusiasm for something" },
        { id: "opt_C", label: "C", text: "Show curiosity toward something" },
        { id: "opt_D", label: "D", text: "Become obsessed with something" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Trong bài: 'as I got older, I lost interest in this hobby and rarely do so anymore' (lose interest in = mất hứng thú)."
    },
    {
      id: "doer_w9d3_q10",
      roundIndex: 9,
      prompt: "Để đạt mục tiêu Target 4.0 - 5.0 về phát âm (Pronunciation) trong bài học này, tiêu chí cốt lõi cần đạt được là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Đầy đủ số âm tiết, chuẩn trọng âm, rõ phụ âm/nguyên âm và âm đuôi" },
        { id: "opt_B", label: "B", text: "Phải nói được giọng Anh - Anh chuẩn của Hoàng gia Anh" },
        { id: "opt_C", label: "C", text: "Nói thật nhanh bất chấp sai âm cuối" },
        { id: "opt_D", label: "D", text: "Sử dụng từ vựng cổ điển khó hiểu" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Mục tiêu bài học nêu rõ 5 trụ cột: (1) Đủ âm tiết, (2) Trọng âm từ, (3) Phát âm đúng IPA nguyên âm/phụ âm, (4) Âm cuối thì và số nhiều (-ed, -s/es), (5) Trọng âm câu và chunking."
    }
  ]
};
