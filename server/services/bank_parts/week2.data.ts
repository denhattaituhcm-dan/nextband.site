/**
 * Question Bank for Week 2 (Day 1, Day 2, Day 3)
 * DOER Coursebook 2027
 */

export const WEEK_2_QUESTIONS: Record<string, any[]> = {
  "WEEK 2 – DAY 1": [
    {
      id: "doer_w2d1_q01",
      roundIndex: 0,
      prompt: "Xác định lỗi sai trong câu: \"Many parents do not satisfy with their children's results at school.\"",
      options: [
        { id: "opt_A", label: "A", text: "do not satisfy with -> are not satisfied with" },
        { id: "opt_B", label: "B", text: "parents -> parent" },
        { id: "opt_C", label: "C", text: "children's -> childrens'" },
        { id: "opt_D", label: "D", text: "results -> resulting" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. do not satisfy with -> are not satisfied with",
      correctExplanation: "\"Satisfy\" là ngoại động từ mang nghĩa làm ai đó thỏa mãn. Muốn diễn đạt ai đó hài lòng/thỏa mãn với cái gì phải dùng cấu trúc tính từ bị động: \"be satisfied with\".",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. childrens'",
        diagnosticTitle: "Nhầm lẫn sở hữu cách số nhiều bất quy tắc",
        explanation: "Children bản thân đã là số nhiều, nên sở hữu cách viết là children's là hoàn toàn chính xác."
      }
    },
    {
      id: "doer_w2d1_q02",
      roundIndex: 1,
      prompt: "Sửa lỗi sai trong câu: \"The board of directors is discussing about a pay rise for all employees.\"",
      options: [
        { id: "opt_A", label: "A", text: "discussing about -> discussing" },
        { id: "opt_B", label: "B", text: "is -> are" },
        { id: "opt_C", label: "C", text: "pay rise -> rise pay" },
        { id: "opt_D", label: "D", text: "for all -> with all" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. discussing about -> discussing",
      correctExplanation: "\"Discuss\" là ngoại động từ trực tiếp (transitive verb), có tân ngữ đi liền phía sau (discuss something), tuyệt đối không thêm giới từ \"about\".",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. is -> are",
        diagnosticTitle: "Nghi ngờ số ít/số nhiều của danh từ tập hợp",
        explanation: "\"The board of directors\" xem như một thể thống nhất nên dùng \"is\" chuẩn ngữ pháp, lỗi cốt lõi là thừa giới từ \"about\" sau discuss."
      }
    },
    {
      id: "doer_w2d1_q03",
      roundIndex: 2,
      prompt: "Phân biệt nội động từ và ngoại động từ: Chọn động từ thích hợp trong câu: \"People can ______ their hands in online meetings on Google Meet.\"",
      options: [
        { id: "opt_A", label: "A", text: "raise" },
        { id: "opt_B", label: "B", text: "rise" },
        { id: "opt_C", label: "C", text: "arise" },
        { id: "opt_D", label: "D", text: "lifting up" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. raise",
      correctExplanation: "\"Raise\" là ngoại động từ (transitive verb) cần có tân ngữ theo sau: raise their hands (giơ tay). Trong khi \"rise\" là nội động từ (tự tăng lên, không có tân ngữ).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. rise",
        diagnosticTitle: "Nhầm lẫn cặp động từ Raise vs. Rise",
        explanation: "Rise là nội động từ (The sun rises), không thể đi trực tiếp với tân ngữ \"their hands\"."
      }
    },
    {
      id: "doer_w2d1_q04",
      roundIndex: 3,
      prompt: "Chọn câu sửa đúng ngữ pháp cho Linking Verb: \"The dress looks beautifully. I decided to buy it.\"",
      options: [
        { id: "opt_A", label: "A", text: "looks beautifully -> looks beautiful" },
        { id: "opt_B", label: "B", text: "looks -> is looking" },
        { id: "opt_C", label: "C", text: "decided -> decide" },
        { id: "opt_D", label: "D", text: "buy it -> buy" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. looks beautifully -> looks beautiful",
      correctExplanation: "\"Look\" ở đây là linking verb (trông có vẻ), theo sau phải là một tính từ (adjective) bổ nghĩa cho chủ ngữ, không dùng trạng từ (beautifully).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. looks -> is looking",
        diagnosticTitle: "Chuyển sang thì tiếp diễn cho động từ tri giác",
        explanation: "Look thể hiện vẻ bề ngoài là linking verb mang tính trạng thái, không dùng ở dạng tiếp diễn."
      }
    },
    {
      id: "doer_w2d1_q05",
      roundIndex: 4,
      prompt: "Chọn cấu trúc viết đúng: \"Nhiều trẻ em dành quá nhiều thời gian để chơi games.\"",
      options: [
        { id: "opt_A", label: "A", text: "Many children spend too much time playing video games." },
        { id: "opt_B", label: "B", text: "Many children spend too much time to play video games." },
        { id: "opt_C", label: "C", text: "Many children take too much time for play video games." },
        { id: "opt_D", label: "D", text: "Many children waste too many time playing video games." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Many children spend too much time playing video games.",
      correctExplanation: "Cấu trúc chuẩn của động từ spend: spend time/money DOING something (V-ing), không dùng to-infinitive.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Many children spend too much time to play video games.",
        diagnosticTitle: "Dùng to-V sau spend time",
        explanation: "Thói quen dịch \"để làm gì\" sang \"to-V\" khiến học viên viết \"spend time to play\", trong khi chuẩn tiếng Anh là spend time V-ing."
      }
    },
    {
      id: "doer_w2d1_q06",
      roundIndex: 5,
      prompt: "Chọn câu viết đúng cấu trúc: \"Khóa học đã mang lại cho anh ấy nhiều kiến thức bổ ích.\"",
      options: [
        { id: "opt_A", label: "A", text: "The course provided him with a lot of useful knowledge." },
        { id: "opt_B", label: "B", text: "The course provided him a lot of useful knowledges." },
        { id: "opt_C", label: "C", text: "The course provides to him many useful knowledges." },
        { id: "opt_D", label: "D", text: "The course offered for him much useful knowledge." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. The course provided him with a lot of useful knowledge.",
      correctExplanation: "Cấu trúc: provide somebody WITH something (hoặc provide something FOR somebody). Knowledge là danh từ không đếm được.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. The course provided him a lot of useful knowledges.",
        diagnosticTitle: "Bỏ quên giới từ \"with\" và thêm \"s\" vào knowledge",
        explanation: "Provide sb with sth cần có with, và knowledge không bao giờ có số nhiều knowledges."
      }
    },
    {
      id: "doer_w2d1_q07",
      roundIndex: 6,
      prompt: "Chọn dạng đúng của động từ sau \"consider\": \"Chipu is considering ______ showbiz.\"",
      options: [
        { id: "opt_A", label: "A", text: "leaving" },
        { id: "opt_B", label: "B", text: "to leave" },
        { id: "opt_C", label: "C", text: "leave" },
        { id: "opt_D", label: "D", text: "for leaving" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. leaving",
      correctExplanation: "Động từ consider đòi hỏi một V-ing theo sau: consider DOING something (cân nhắc làm gì).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. to leave",
        diagnosticTitle: "Chọn to-infinitive sau consider",
        explanation: "Rất nhiều người học nhầm consider đi với to-V, nhưng đúng quy tắc ngữ pháp phải là consider + V-ing."
      }
    },
    {
      id: "doer_w2d1_q08",
      roundIndex: 7,
      prompt: "Chọn câu diễn đạt đúng: \"Tôi thấy cuốn sách này rất thú vị.\"",
      options: [
        { id: "opt_A", label: "A", text: "I find this book very interesting." },
        { id: "opt_B", label: "B", text: "I find this book is very interesting." },
        { id: "opt_C", label: "C", text: "I find this book very interested." },
        { id: "opt_D", label: "D", text: "I feel this book very interesting." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. I find this book very interesting.",
      correctExplanation: "Cấu trúc: find + Object + Adjective (nhận thấy cái gì như thế nào). Bổ ngữ cho cuốn sách là tính từ chủ động \"interesting\".",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. I find this book very interested.",
        diagnosticTitle: "Nhầm đuôi -ed và -ing của tính từ",
        explanation: "\"Interested\" chỉ cảm xúc của con người; đặc tính của cuốn sách gây hứng thú phải dùng \"interesting\"."
      }
    },
    {
      id: "doer_w2d1_q09",
      roundIndex: 8,
      prompt: "Chọn collocation chuẩn khi tiến hành làm khảo sát: \"Nhóm em sẽ ______ một khảo sát về thói quen đọc sách của giới trẻ.\"",
      options: [
        { id: "opt_A", label: "A", text: "conduct / carry out a survey" },
        { id: "opt_B", label: "B", text: "make a survey" },
        { id: "opt_C", label: "C", text: "take a survey" },
        { id: "opt_D", label: "D", text: "create a survey" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. conduct / carry out a survey",
      correctExplanation: "Collocation học thuật chuẩn đi với survey là \"conduct a survey\" hoặc \"carry out a survey\".",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. make a survey",
        diagnosticTitle: "Dịch từ \"làm khảo sát\" thành \"make a survey\"",
        explanation: "Người bản xứ không dùng make a survey; trong nghiên cứu học thuật luôn dùng conduct / carry out."
      }
    },
    {
      id: "doer_w2d1_q10",
      roundIndex: 9,
      prompt: "Chọn cụm collocation chuẩn xác: \"Học sinh nên tránh ______ khi làm bài tập về nhà.\"",
      options: [
        { id: "opt_A", label: "A", text: "making mistakes" },
        { id: "opt_B", label: "B", text: "doing mistakes" },
        { id: "opt_C", label: "C", text: "taking mistakes" },
        { id: "opt_D", label: "D", text: "creating mistakes" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. making mistakes",
      correctExplanation: "Collocation bất di bất dịch trong tiếng Anh: MAKE a mistake / make mistakes (phạm sai lầm).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. doing mistakes",
        diagnosticTitle: "Dịch \"làm lỗi\" thành \"do mistakes\"",
        explanation: "Thói quen liên hệ từ \"làm\" với \"do\" khiến học viên chọn \"do mistakes\" thay vì cụm chuẩn \"make mistakes\"."
      }
    }
  ],
  "WEEK 2 – DAY 2": [
    {
      id: "doer_w2d2_q01",
      roundIndex: 0,
      prompt: "Theo bài đọc \"The 996 culture in China\", văn hóa làm việc 996 có nghĩa là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Làm việc từ 9h sáng đến 9h tối, 6 ngày một tuần" },
        { id: "opt_B", label: "B", text: "Làm việc từ 9h sáng đến 9h tối, 5 ngày một tuần" },
        { id: "opt_C", label: "C", text: "Làm việc 9 tiếng một ngày, 9 tuần liên tục, nghỉ 6 ngày" },
        { id: "opt_D", label: "D", text: "Làm việc từ 9h sáng đến 6h chiều trong 9 ngày" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Làm việc từ 9h sáng đến 9h tối, 6 ngày một tuần",
      correctExplanation: "Đoạn văn định nghĩa rõ: \"working from 9 am to 9 pm six days a week, and it is very common among Chinese tech companies and startups\".",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Làm việc từ 9h sáng đến 9h tối, 5 ngày một tuần",
        diagnosticTitle: "Nhầm số ngày làm việc",
        explanation: "Con số 6 ở cuối đại diện cho 6 ngày mỗi tuần (chỉ nghỉ 1 ngày)."
      }
    },
    {
      id: "doer_w2d2_q02",
      roundIndex: 1,
      prompt: "Trong câu \"Employees of major companies are protesting what is infamous as 996\", từ \"infamous\" có nghĩa là:",
      options: [
        { id: "opt_A", label: "A", text: "well-known for something bad (tai tiếng, khét tiếng)" },
        { id: "opt_B", label: "B", text: "not famous at all (vô danh, không ai biết)" },
        { id: "opt_C", label: "C", text: "widely praised and loved (được ca ngợi)" },
        { id: "opt_D", label: "D", text: "legally recognized (hợp pháp)" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. well-known for something bad (tai tiếng, khét tiếng)",
      correctExplanation: "Tiền tố in- trong \"infamous\" không mang nghĩa phủ định \"không nổi tiếng\", mà có nghĩa là khét tiếng vì điều tồi tệ.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. not famous at all",
        diagnosticTitle: "Hiểu nhầm tiền tố in- là phủ định đơn thuần",
        explanation: "Nhiều người nghĩ famous là nổi tiếng nên infamous là không nổi tiếng, nhưng thực tế nó bằng nghĩa với \"notorious\"."
      }
    },
    {
      id: "doer_w2d2_q03",
      roundIndex: 2,
      prompt: "Theo bài đọc, hậu quả trực tiếp nhất của lịch làm việc dày đặc (tight work schedule) đối với nhân viên công nghệ là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Burnout (kiệt quệ cả thể chất lẫn tinh thần) và thiếu thời gian cho nhu cầu cơ bản" },
        { id: "opt_B", label: "B", text: "Tăng lương nhanh chóng và thăng tiến vượt bậc" },
        { id: "opt_C", label: "C", text: "Tự động được nghỉ phép 4 ngày một tuần" },
        { id: "opt_D", label: "D", text: "Bị công ty sa thải do vi phạm luật pháp" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Burnout (kiệt quệ cả thể chất lẫn tinh thần) và thiếu thời gian cho nhu cầu cơ bản",
      correctExplanation: "Bài đọc nêu: \"the tight work schedule means more burnout and less time for basic needs like sleep or a personal life\".",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Tăng lương nhanh chóng và thăng tiến vượt bậc",
        diagnosticTitle: "Suy đoán ngoài thông tin bài đọc",
        explanation: "Bài đọc tập trung phản ánh tác hại sức khỏe và cái chết thương tâm của nhân viên thay vì lợi ích tài chính."
      }
    },
    {
      id: "doer_w2d2_q04",
      roundIndex: 3,
      prompt: "Quan điểm của cựu CEO Alibaba Jack Ma vào tháng 4/2019 về văn hóa 996 là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Ủng hộ và gọi 996 là một \"phước lành\" (blessing)" },
        { id: "opt_B", label: "B", text: "Kịch liệt phản đối và yêu cầu cấm triệt để" },
        { id: "opt_C", label: "C", text: "Đề xuất chế độ làm việc 4 ngày/tuần như New Zealand" },
        { id: "opt_D", label: "D", text: "Từ chối đưa ra bất kỳ bình luận nào" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Ủng hộ và gọi 996 là một \"phước lành\" (blessing)",
      correctExplanation: "Đoạn văn viết rõ: \"Alibaba CEO Jack Ma had supported the culture of overwork, calling it a 'blessing'\".",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Kịch liệt phản đối và yêu cầu cấm triệt để",
        diagnosticTitle: "Mặc định lãnh đạo sẽ phản đối bóc lột sau các vụ biểu tình",
        explanation: "Thực tế Jack Ma thời điểm đó đã bảo vệ 996 vì cho rằng nó tạo động lực phát triển kinh tế cho Trung Quốc."
      }
    },
    {
      id: "doer_w2d2_q05",
      roundIndex: 4,
      prompt: "Xét câu hỏi True/False/Not Given: \"The 955 schedule is proved to be healthier than the 996 one.\" Đáp án đúng là:",
      options: [
        { id: "opt_A", label: "A", text: "NOT GIVEN" },
        { id: "opt_B", label: "B", text: "TRUE" },
        { id: "opt_C", label: "C", text: "FALSE" },
        { id: "opt_D", label: "D", text: "CANNOT BE DETERMINED" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. NOT GIVEN",
      correctExplanation: "Bài đọc chỉ nói nhân viên đòi hỏi văn hóa 955 (9am-5pm 5 days/week), nhưng không có bằng chứng khoa học hay nghiên cứu nào trong bài chứng minh nó lành mạnh hơn.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. TRUE",
        diagnosticTitle: "Dùng kiến thức đời sống thay vì bám sát bài đọc",
        explanation: "Thực tế đời sống 955 rõ ràng tốt hơn 996, nhưng trong IELTS Reading nếu bài không đề cập bằng chứng so sánh thì phải là NOT GIVEN."
      }
    },
    {
      id: "doer_w2d2_q06",
      roundIndex: 5,
      prompt: "Hai quốc gia phát triển nào được nhắc đến trong bài vì đã thử nghiệm chế độ làm việc 4 ngày/tuần (four-day workweek)?",
      options: [
        { id: "opt_A", label: "A", text: "New Zealand và Nhật Bản (Japan)" },
        { id: "opt_B", label: "B", text: "Mỹ (USA) và Anh (UK)" },
        { id: "opt_C", label: "C", text: "Trung Quốc và Singapore" },
        { id: "opt_D", label: "D", text: "Đức và Pháp" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. New Zealand và Nhật Bản (Japan)",
      correctExplanation: "Đoạn văn viết: \"The well-known ones among them are New Zealand and Japan\".",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Mỹ (USA) và Anh (UK)",
        diagnosticTitle: "Suy diễn các cường quốc phương Tây",
        explanation: "Bài đọc chỉ đích danh Thủ tướng New Zealand Jacinda Ardern và hướng dẫn chính sách của chính phủ Nhật Bản."
      }
    },
    {
      id: "doer_w2d2_q07",
      roundIndex: 6,
      prompt: "Chọn từ thích hợp điền vào câu: \"An online campaign launched in 2019 aimed to raise ______ about 996 and reduce pressure on employees.\"",
      options: [
        { id: "opt_A", label: "A", text: "awareness" },
        { id: "opt_B", label: "B", text: "attention" },
        { id: "opt_C", label: "C", text: "knowledge" },
        { id: "opt_D", label: "D", text: "interest" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. awareness",
      correctExplanation: "Cụm collocation chuẩn: \"raise awareness about something\" (nâng cao nhận thức về điều gì).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. attention",
        diagnosticTitle: "Nhầm với cụm attract/pay attention",
        explanation: "Động từ đi với attention thường là pay attention hoặc draw/attract attention, không dùng raise attention."
      }
    },
    {
      id: "doer_w2d2_q08",
      roundIndex: 7,
      prompt: "Cụm từ \"compulsory overtime\" mang ý nghĩa là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Làm thêm giờ bắt buộc" },
        { id: "opt_B", label: "B", text: "Làm thêm giờ tự nguyện" },
        { id: "opt_C", label: "C", text: "Được trả tiền tăng ca gấp đôi" },
        { id: "opt_D", label: "D", text: "Nghỉ bù sau khi làm việc cuối tuần" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Làm thêm giờ bắt buộc",
      correctExplanation: "\"Compulsory\" mang nghĩa bắt buộc do quy định hoặc áp lực từ cấp trên.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Làm thêm giờ tự nguyện",
        diagnosticTitle: "Nhầm lẫn từ trái nghĩa (voluntary vs compulsory)",
        explanation: "Compulsory là bắt buộc, hoàn toàn trái ngược với voluntary (tự nguyện)."
      }
    },
    {
      id: "doer_w2d2_q09",
      roundIndex: 8,
      prompt: "Xét tính hợp pháp của chế độ 996: Mặc dù luật pháp Trung Quốc nghiêm cấm, tại sao các công ty vẫn áp dụng?",
      options: [
        { id: "opt_A", label: "A", text: "Họ thực thi một cách chính thức hoặc phi chính thức (informally or formally)" },
        { id: "opt_B", label: "B", text: "Chính phủ Trung Quốc đã hủy bỏ toàn bộ luật lao động" },
        { id: "opt_C", label: "C", text: "Tất cả nhân viên đều tự nguyện ký cam kết không cần ngủ" },
        { id: "opt_D", label: "D", text: "Tòa án đã phán quyết 996 là hoàn toàn hợp hiến" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Họ thực thi một cách chính thức hoặc phi chính thức (informally or formally)",
      correctExplanation: "Bài đọc chỉ rõ: \"Though the practice is technically prohibited by Chinese law, many companies still enforce the hours informally or formally\".",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Tất cả nhân viên đều tự nguyện",
        diagnosticTitle: "Đánh giá sai nguyên nhân áp đặt",
        explanation: "Đây là văn hóa doanh nghiệp ép buộc nhân viên, nhiều người biểu tình phản đối chứ không hề tự nguyện."
      }
    },
    {
      id: "doer_w2d2_q10",
      roundIndex: 9,
      prompt: "Trong câu cảm thán của blogger: \"Is it really worth it to exchange our lives for money?\", người viết muốn truyền tải thông điệp gì?",
      options: [
        { id: "opt_A", label: "A", text: "Tiền bạc không xứng đáng để đánh đổi bằng mạng sống và sức khỏe con người" },
        { id: "opt_B", label: "B", text: "Càng làm nhiều việc thì càng có nhiều tiền để chữa bệnh" },
        { id: "opt_C", label: "C", text: "Khuyên nhân viên nên xin tăng lương cao hơn trước khi làm việc 996" },
        { id: "opt_D", label: "D", text: "Khẳng định làm việc đến kiệt sức là con đường duy nhất để thành công" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Tiền bạc không xứng đáng để đánh đổi bằng mạng sống và sức khỏe con người",
      correctExplanation: "Câu hỏi tu từ (rhetorical question) thể hiện sự bất bình sâu sắc trước các ca tử vong vì làm việc quá sức ở tuổi đôi mươi.",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Khuyên nhân viên nên xin tăng lương",
        diagnosticTitle: "Hiểu sai giọng điệu câu hỏi tu từ",
        explanation: "Tác giả đặt câu hỏi để khẳng định việc đổi tính mạng lấy tiền là hoàn toàn sai trái, không phải mặc cả lương."
      }
    }
  ],
  "WEEK 2 – DAY 3": [
    {
      id: "doer_w2d3_q01",
      roundIndex: 0,
      prompt: "Cặp nguyên âm sau /u:/ và /ʊ/ phân biệt rõ nhất qua hai từ nào?",
      options: [
        { id: "opt_A", label: "A", text: "food /fuːd/ vs. foot /fʊt/" },
        { id: "opt_B", label: "B", text: "pen /pen/ vs. pain /peɪn/" },
        { id: "opt_C", label: "C", text: "four /fɔː/ vs. far /fɑː/" },
        { id: "opt_D", label: "D", text: "chain /tʃeɪn/ vs. chance /tʃɑːns/" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. food /fuːd/ vs. foot /fʊt/",
      correctExplanation: "Food có âm u dài /u:/ (chu môi tròn chặt), foot có âm u ngắn /ʊ/ (môi hơi mở, thả lỏng).",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. four /fɔː/ vs. far /fɑː/",
        diagnosticTitle: "Nhầm sang cặp /ɔː/ và /ɑː/",
        explanation: "Four vs far là cặp phân biệt giữa âm o dài tròn môi và âm a dài hạ hàm."
      }
    },
    {
      id: "doer_w2d3_q02",
      roundIndex: 1,
      prompt: "Chọn giới từ đúng để nói về tầng nhà: \"I live ______ the fifth floor of an apartment building near the Saigon River.\"",
      options: [
        { id: "opt_A", label: "A", text: "on" },
        { id: "opt_B", label: "B", text: "in" },
        { id: "opt_C", label: "C", text: "at" },
        { id: "opt_D", label: "D", text: "inside" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. on",
      correctExplanation: "Quy tắc kim tự tháp giới từ không gian: sống ở tầng mấy luôn đi với giới từ \"ON\": on the 1st/2nd/5th floor.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. in",
        diagnosticTitle: "Dịch \"ở trong tầng 5\" thành \"in the floor\"",
        explanation: "Tiếng Việt nói \"ở trong tầng 5\" làm nhiều bạn chọn \"in\", nhưng tiếng Anh mặt sàn bề mặt phẳng bắt buộc dùng \"on\"."
      }
    },
    {
      id: "doer_w2d3_q03",
      roundIndex: 2,
      prompt: "Chọn cặp giới từ đúng: \"My parents live ______ Hanoi, while I live ______ Ho Chi Minh City.\"",
      options: [
        { id: "opt_A", label: "A", text: "in - in" },
        { id: "opt_B", label: "B", text: "at - at" },
        { id: "opt_C", label: "C", text: "on - in" },
        { id: "opt_D", label: "D", text: "at - in" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. in - in",
      correctExplanation: "Thành phố, quốc gia hoặc khu vực địa lý lớn luôn dùng giới từ \"IN\": in Hanoi, in Ho Chi Minh City.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. at - at",
        diagnosticTitle: "Dùng \"at\" cho địa bàn thành phố lớn",
        explanation: "Giới từ \"at\" dùng cho điểm cụ thể (at the bus stop, at 12 Ba Hat Street), không dùng cho cả thành phố rộng lớn."
      }
    },
    {
      id: "doer_w2d3_q04",
      roundIndex: 3,
      prompt: "Chọn giới từ đúng khi nói về tên đường: \"Currently, I rent a house ______ Ba Hat Street in District 10.\"",
      options: [
        { id: "opt_A", label: "A", text: "on" },
        { id: "opt_B", label: "B", text: "at" },
        { id: "opt_C", label: "C", text: "in" },
        { id: "opt_D", label: "D", text: "to" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. on",
      correctExplanation: "Khi chỉ có tên đường phố chung (chưa có số nhà cụ thể), ta dùng giới từ \"ON\": on Ba Hat Street.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. at",
        diagnosticTitle: "Nhầm lẫn giữa tên đường và số nhà cụ thể",
        explanation: "Chỉ khi có số nhà cụ thể (ví dụ: at 12 Ba Hat Street) mới dùng \"at\"; nếu chỉ có tên đường thì dùng \"on\"."
      }
    },
    {
      id: "doer_w2d3_q05",
      roundIndex: 4,
      prompt: "Chọn cấu trúc diễn đạt khoảng thời gian di chuyển: \"Mỗi ngày tôi mất khoảng 30 phút để lái xe đến trung tâm.\"",
      options: [
        { id: "opt_A", label: "A", text: "It takes me around 30 minutes to drive here." },
        { id: "opt_B", label: "B", text: "I take 30 minutes for drive here." },
        { id: "opt_C", label: "C", text: "It spends me around 30 minutes to drive here." },
        { id: "opt_D", label: "D", text: "It takes around 30 minutes driving here." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. It takes me around 30 minutes to drive here.",
      correctExplanation: "Cấu trúc chuẩn về thời lượng: It takes (somebody) + time + TO DO something.",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. It spends me around 30 minutes to drive here.",
        diagnosticTitle: "Dùng nhầm \"spend\" với chủ ngữ giả It",
        explanation: "Spend chỉ dùng với chủ ngữ là người (I spend 30 minutes driving), còn chủ ngữ giả It bắt buộc dùng với \"takes\"."
      }
    },
    {
      id: "doer_w2d3_q06",
      roundIndex: 5,
      prompt: "Chọn từ đúng để miêu tả một ngôi nhà có 3 tầng:",
      options: [
        { id: "opt_A", label: "A", text: "a three-storey house" },
        { id: "opt_B", label: "B", text: "a three-storeys house" },
        { id: "opt_C", label: "C", text: "a third-floor house" },
        { id: "opt_D", label: "D", text: "a three-stairs house" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. a three-storey house",
      correctExplanation: "Tính từ ghép chỉ số tầng: number + singular noun ghép gạch nối \"three-storey\" (hoặc three-story), danh từ không thêm s.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. a three-storeys house",
        diagnosticTitle: "Thêm số nhiều vào danh từ trong tính từ ghép",
        explanation: "Trong tính từ ghép đứng trước danh từ (compound adjective), danh từ đo lường luôn ở dạng số ít."
      }
    },
    {
      id: "doer_w2d3_q07",
      roundIndex: 6,
      prompt: "Để miêu tả vị trí căn phòng \"nằm ở cuối hành lang\", cụm từ chuẩn là:",
      options: [
        { id: "opt_A", label: "A", text: "at the end of the hallway" },
        { id: "opt_B", label: "B", text: "in the end of the hallway" },
        { id: "opt_C", label: "C", text: "on the finish hallway" },
        { id: "opt_D", label: "D", text: "to the end hallway" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. at the end of the hallway",
      correctExplanation: "Chỉ vị trí vật lý ở điểm cuối cùng: \"at the end of...\". Ngược lại, \"in the end\" là phó từ chỉ thời gian mang nghĩa rốt cuộc/cuối cùng.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. in the end of the hallway",
        diagnosticTitle: "Nhầm lẫn giữa \"at the end of\" và \"in the end\"",
        explanation: "\"In the end\" không bao giờ đi với \"of something\"; để chỉ vị trí nơi chốn bắt buộc dùng \"at the end of\"."
      }
    },
    {
      id: "doer_w2d3_q08",
      roundIndex: 7,
      prompt: "Tính từ nào sau đây mang nghĩa \"ấm cúng, thoải mái\" thường dùng nhất để miêu tả phòng ngủ gia đình?",
      options: [
        { id: "opt_A", label: "A", text: "cozy" },
        { id: "opt_B", label: "B", text: "crowded" },
        { id: "opt_C", label: "C", text: "isolated" },
        { id: "opt_D", label: "D", text: "narrow" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. cozy",
      correctExplanation: "\"Cozy\" (hoặc cosy) miêu tả một không gian nhỏ gọn, ấm cúng và đem lại cảm giác bình yên thư giãn.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. crowded",
        diagnosticTitle: "Nhầm lẫn sự ấm cúng với sự đông đúc",
        explanation: "Crowded mang nghĩa tiêu cực là đông đúc, chật ních người."
      }
    },
    {
      id: "doer_w2d3_q09",
      roundIndex: 8,
      prompt: "Chọn câu diễn đạt vị trí đối diện chính xác trong mô tả phòng ốc: \"Đối diện bàn làm việc của tôi là một cửa sổ lớn.\"",
      options: [
        { id: "opt_A", label: "A", text: "Opposite my desk is a large window." },
        { id: "opt_B", label: "B", text: "Opposite to my desk has a large window." },
        { id: "opt_C", label: "C", text: "In front of against my desk is a large window." },
        { id: "opt_D", label: "D", text: "Across of my desk there a large window." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Opposite my desk is a large window.",
      correctExplanation: "\"Opposite something\" đóng vai trò là cụm giới từ chỉ vị trí, cấu trúc đảo ngữ: Opposite + [Nơi chốn] + is + [Chủ ngữ].",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Opposite to my desk has a large window.",
        diagnosticTitle: "Dùng động từ \"has\" thay vì to be chỉ sự tồn tại",
        explanation: "Tiếng Việt nói \"đối diện có một cửa sổ\" làm người học dịch thành \"has a window\", sai ngữ pháp tiếng Anh."
      }
    },
    {
      id: "doer_w2d3_q10",
      roundIndex: 9,
      prompt: "Chọn câu thành ngữ/từ vựng đúng thể hiện bạn đến rất sớm:",
      options: [
        { id: "opt_A", label: "A", text: "You're here bright and early!" },
        { id: "opt_B", label: "B", text: "You're here light and quick!" },
        { id: "opt_C", label: "C", text: "You're here shiny and first!" },
        { id: "opt_D", label: "D", text: "You're here fast and sharp!" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. You're here bright and early!",
      correctExplanation: "Thành ngữ (idiom) phổ biến trong giao tiếp hàng ngày chỉ việc ai đó có mặt từ sáng sớm tinh mơ: \"bright and early\".",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. You're here light and quick!",
        diagnosticTitle: "Ghép từ tự do không theo thành ngữ bản xứ",
        explanation: "Thành ngữ tiếng Anh là cụm cố định không thể tự ý thay đổi từ đồng nghĩa."
      }
    }
  ]
};
