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
        { id: "opt_A", label: "A", text: "conduct a survey" },
        { id: "opt_B", label: "B", text: "make a survey" },
        { id: "opt_C", label: "C", text: "take a survey" },
        { id: "opt_D", label: "D", text: "create a survey" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. conduct a survey",
      correctExplanation: "Collocation học thuật chuẩn đi với survey là \"conduct a survey\" (hoặc \"carry out a survey\").",
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
      prompt: "Trong câu: \"Employees are protesting what is infamous as 996\", từ \"infamous\" (adj) ĐỒNG NGHĨA nhất với từ nào?",
      options: [
        { id: "opt_A", label: "A", text: "notorious (khét tiếng, tai tiếng vì điều xấu)" },
        { id: "opt_B", label: "B", text: "unpopular / unknown (vô danh, không ai biết)" },
        { id: "opt_C", label: "C", text: "prestigious (uy tín, danh giá)" },
        { id: "opt_D", label: "D", text: "admirable (đáng khâm phục, ngưỡng mộ)" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. notorious (khét tiếng, tai tiếng vì điều xấu)",
      correctExplanation: "\"Infamous\" đồng nghĩa với \"notorious\": nổi danh vì tai tiếng, gắn với điều tồi tệ hoặc độc hại.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. unpopular / unknown",
        diagnosticTitle: "Hiểu nhầm tiền tố in- là phủ định \"không nổi tiếng\"",
        explanation: "Nhiều người lầm tưởng in- + famous = không nổi tiếng, nhưng infamous thực chất mang nghĩa khét tiếng vì điều xấu."
      }
    },
    {
      id: "doer_w2d2_q02",
      roundIndex: 1,
      prompt: "Từ TRÁI NGHĨA với \"compulsory\" trong cụm \"compulsory weekend overtime\" (tăng ca bắt buộc cuối tuần) là:",
      options: [
        { id: "opt_A", label: "A", text: "voluntary / optional (tự nguyện, tùy chọn)" },
        { id: "opt_B", label: "B", text: "mandatory (bắt buộc theo luật)" },
        { id: "opt_C", label: "C", text: "punitive (trừng phạt)" },
        { id: "opt_D", label: "D", text: "relentless (không ngừng nghỉ)" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. voluntary / optional (tự nguyện, tùy chọn)",
      correctExplanation: "\"Compulsory\" = bắt buộc, cưỡng chế. Từ trái nghĩa trực tiếp là \"voluntary\" hoặc \"optional\" (tự nguyện/tùy chọn).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. mandatory",
        diagnosticTitle: "Chọn nhầm từ đồng nghĩa thay vì từ trái nghĩa",
        explanation: "Mandatory là từ đồng nghĩa với compulsory. Đề bài đang yêu cầu tìm từ TRÁI NGHĨA."
      }
    },
    {
      id: "doer_w2d2_q03",
      roundIndex: 2,
      prompt: "Trong cụm từ \"workplace burnout\", từ \"burnout\" mô tả chính xác trạng thái nào của người lao động?",
      options: [
        { id: "opt_A", label: "A", text: "Tình trạng kiệt quệ hoàn toàn về cả thể chất lẫn tinh thần do áp lực công việc kéo dài" },
        { id: "opt_B", label: "B", text: "Sự nhiệt tình hăng hái cháy hết mình vì dự án" },
        { id: "opt_C", label: "C", text: "Cơn sốt cao tạm thời do thời tiết thay đổi" },
        { id: "opt_D", label: "D", text: "Sự tức giận nhất thời khi tranh luận với đồng nghiệp" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Tình trạng kiệt quệ hoàn toàn về cả thể chất lẫn tinh thần do áp lực công việc kéo dài",
      correctExplanation: "\"Burnout\" là thuật ngữ tâm lý học lao động chỉ sự suy sụp, cạn kiệt năng lượng thể xác và cảm xúc vì làm việc quá tải.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Sự nhiệt tình hăng hái cháy hết mình",
        diagnosticTitle: "Dịch nghĩa đen từ chữ \"burn\" thành cháy hết mình tích cực",
        explanation: "Burnout luôn mang nghĩa tiêu cực chỉ sự kiệt quệ, không dùng cho sự hào hứng cống hiến."
      }
    },
    {
      id: "doer_w2d2_q04",
      roundIndex: 3,
      prompt: "Collocation chuẩn trong bài: \"An online campaign was launched to ______ awareness about the harsh work culture.\"",
      options: [
        { id: "opt_A", label: "A", text: "raise" },
        { id: "opt_B", label: "B", text: "rise" },
        { id: "opt_C", label: "C", text: "make" },
        { id: "opt_D", label: "D", text: "arise" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. raise",
      correctExplanation: "Collocation học thuật cố định: \"raise awareness about/of something\" (nâng cao nhận thức xã hội về một vấn đề).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. rise",
        diagnosticTitle: "Nhầm lẫn giữa ngoại động từ raise (cần tân ngữ) và nội động từ rise",
        explanation: "\"Rise\" là nội động từ không đi kèm tân ngữ. Muốn tác động lên tân ngữ \"awareness\" bắt buộc phải dùng ngoại động từ \"raise\"."
      }
    },
    {
      id: "doer_w2d2_q05",
      roundIndex: 4,
      prompt: "Chọn động từ phù hợp diễn tả việc \"áp đặt, bắt buộc thi hành quy định giờ giấc\": \"Many companies still ______ the 12-hour workday informally.\"",
      options: [
        { id: "opt_A", label: "A", text: "enforce" },
        { id: "opt_B", label: "B", text: "reinforce" },
        { id: "opt_C", label: "C", text: "comfort" },
        { id: "opt_D", label: "D", text: "forgive" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. enforce",
      correctExplanation: "\"Enforce rules/hours\" nghĩa là thực thi, bắt buộc tuân thủ quy chế hoặc luật lệ.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. reinforce",
        diagnosticTitle: "Nhầm lẫn giữa enforce (thực thi) và reinforce (củng cố, gia cố)",
        explanation: "Reinforce mang nghĩa gia cố độ bền hoặc củng cố lập luận, không dùng cho việc bắt buộc thực thi giờ làm việc."
      }
    },
    {
      id: "doer_w2d2_q06",
      roundIndex: 5,
      prompt: "Chọn trạng từ phù hợp: \"Though the schedule is technically prohibited by law, startups apply it formally or ______.\"",
      options: [
        { id: "opt_A", label: "A", text: "informally" },
        { id: "opt_B", label: "B", text: "informal" },
        { id: "opt_C", label: "C", text: "information" },
        { id: "opt_D", label: "D", text: "informative" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. informally",
      correctExplanation: "Cấu trúc song hành với trạng từ \"formally\": \"formally or informally\" (một cách chính thức hoặc ngấm ngầm phi chính thức).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. informal",
        diagnosticTitle: "Vi phạm tính song hành từ loại (parallel structure)",
        explanation: "Từ kết nối bởi liên từ \"or\" với trạng từ \"formally\" bắt buộc cũng phải là một trạng từ (\"informally\")."
      }
    },
    {
      id: "doer_w2d2_q07",
      roundIndex: 6,
      prompt: "Trong cụm \"protest against 996 culture\", động từ \"protest\" đi với giới từ nào khi muốn diễn tả sự phản kháng chống lại một điều bất công?",
      options: [
        { id: "opt_A", label: "A", text: "against" },
        { id: "opt_B", label: "B", text: "with" },
        { id: "opt_C", label: "C", text: "for" },
        { id: "opt_D", label: "D", text: "at" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. against",
      correctExplanation: "Cấu trúc chuẩn: \"protest against something\" (phản đối, biểu tình chống lại chính sách/hành động).",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. for",
        diagnosticTitle: "Dùng giới từ chỉ sự ủng hộ thay vì phản đối",
        explanation: "Protest for là đấu tranh đòi một quyền lợi, còn phản đối chống lại văn hóa độc hại phải dùng \"protest against\"."
      }
    },
    {
      id: "doer_w2d2_q08",
      roundIndex: 7,
      prompt: "Thành ngữ / cấu trúc: \"Is it really worth it to exchange our lives for money?\" mang cấu trúc chuẩn nào?",
      options: [
        { id: "opt_A", label: "A", text: "exchange [A] for [B]" },
        { id: "opt_B", label: "B", text: "exchange [A] into [B]" },
        { id: "opt_C", label: "C", text: "exchange [A] with [B]" },
        { id: "opt_D", label: "D", text: "exchange [A] at [B]" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. exchange [A] for [B]",
      correctExplanation: "\"Exchange something for something\" là cấu trúc chuẩn để chỉ sự đánh đổi hoặc trao đổi lấy vật phẩm/tiền bạc.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. exchange [A] into [B]",
        diagnosticTitle: "Nhầm lẫn với chuyển đổi tiền tệ",
        explanation: "Đổi ngoại tệ thành đồng tiền khác dùng exchange money into, còn đánh đổi thứ trừu tượng (mạng sống lấy tiền) phải dùng \"for\"."
      }
    },
    {
      id: "doer_w2d2_q09",
      roundIndex: 8,
      prompt: "VẬN DỤNG NGỮ CẢNH MỚI: Chọn từ thích hợp điền vào câu: \"The tech industry in the city is notorious for its ______ schedule, leaving employees with barely any personal time.\"",
      options: [
        { id: "opt_A", label: "A", text: "tight" },
        { id: "opt_B", label: "B", text: "loose" },
        { id: "opt_C", label: "C", text: "bland" },
        { id: "opt_D", label: "D", text: "relief" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. tight",
      correctExplanation: "\"A tight schedule\" là collocation tự nhiên chỉ lịch trình làm việc kín đặc, dày đặc và căng thẳng.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. loose",
        diagnosticTitle: "Chọn từ trái nghĩa (lỏng lẻo)",
        explanation: "Loose schedule là lịch rảnh rỗi lỏng lẻo, mâu thuẫn trực tiếp với vế sau \"barely any personal time\"."
      }
    },
    {
      id: "doer_w2d2_q10",
      roundIndex: 9,
      prompt: "PARAPHRASE: Câu \"Young tech workers suffer from burnout because the tight work schedule leaves little time for sleep or personal life\" được diễn đạt lại tương đương nhất là:",
      options: [
        { id: "opt_A", label: "A", text: "Severe physical and mental exhaustion among tech staff stems from grueling hours that severely restrict rest." },
        { id: "opt_B", label: "B", text: "Employees enjoy working late at night because it boosts their productivity and financial freedom." },
        { id: "opt_C", label: "C", text: "Startups have officially outlawed overtime to ensure young workers maintain optimal physical health." },
        { id: "opt_D", label: "D", text: "Lack of personal life is completely unrelated to the excessive working hours demanded by tech firms." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Severe physical and mental exhaustion among tech staff stems from grueling hours that severely restrict rest.",
      correctExplanation: "\"Severe physical and mental exhaustion\" paraphrase cho \"burnout\", và \"grueling hours that severely restrict rest\" paraphrase cho \"tight schedule leaves little time for sleep\".",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Employees enjoy working late",
        diagnosticTitle: "Đảo ngược thông điệp chỉ trích thành sự thích thú",
        explanation: "Bài đọc nêu rõ sự đau khổ và cái chết vì kiệt sức, không phải sự thích thú làm việc đêm."
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
