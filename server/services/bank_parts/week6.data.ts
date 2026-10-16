/**
 * Question Bank for Week 6 (Day 1, Day 2, Day 3)
 * DOER Coursebook 2027
 */

export const WEEK_6_QUESTIONS: Record<string, any[]> = {
  "WEEK 6 – DAY 1": [
    {
      id: "doer_w6d1_q01",
      roundIndex: 0,
      prompt: "Trong câu: 'They're the people which bought our house.', lỗi sai nằm ở đâu và sửa lại như thế nào cho đúng?",
      options: [
        { id: "opt_A", label: "A", text: "Thay 'bought' thành 'buy'" },
        { id: "opt_B", label: "B", text: "Thay 'which' thành 'who' hoặc 'that'" },
        { id: "opt_C", label: "C", text: "Bỏ 'the' trước 'people'" },
        { id: "opt_D", label: "D", text: "Thêm 'they' vào sau 'which'" }
      ],
      correctOptionId: "opt_B",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Trong Adjective clause, 'which' dùng để thay thế cho danh từ chỉ vật/sự việc. Khi danh từ đứng trước là 'people' (người), bắt buộc dùng 'who' hoặc 'that'."
    },
    {
      id: "doer_w6d1_q02",
      roundIndex: 1,
      prompt: "Xác định lỗi sai trong câu: 'The boy who sits next to me he has a car.'",
      options: [
        { id: "opt_A", label: "A", text: "Thừa đại từ 'he' vì 'who' đã đóng vai trò làm chủ ngữ bổ nghĩa cho 'The boy'" },
        { id: "opt_B", label: "B", text: "'sits' phải chia thành 'sitting'" },
        { id: "opt_C", label: "C", text: "'who' phải đổi thành 'whom'" },
        { id: "opt_D", label: "D", text: "Sau 'car' phải có trạng từ chỉ nơi chốn" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Lỗi lặp chủ ngữ (redundant subject pronoun). 'The boy [who sits next to me] has a car' - 'The boy' là chủ ngữ của vị ngữ chính 'has a car', không lặp lại 'he'."
    },
    {
      id: "doer_w6d1_q03",
      roundIndex: 2,
      prompt: "Câu nào dưới đây sửa đúng cho câu lỗi: 'We will go to the restaurant that he recommended it to us.'?",
      options: [
        { id: "opt_A", label: "A", text: "We will go to the restaurant that he recommended to us." },
        { id: "opt_B", label: "B", text: "We will go to the restaurant which he recommended it." },
        { id: "opt_C", label: "C", text: "We will go to the restaurant where he recommended it to us." },
        { id: "opt_D", label: "D", text: "We will go to the restaurant what he recommended to us." }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Khi đại từ quan hệ (that/which) thay thế cho tân ngữ của động từ 'recommended', đại từ tân ngữ 'it' phải được lược bỏ, tránh lỗi lặp tân ngữ (redundant pronoun)."
    },
    {
      id: "doer_w6d1_q04",
      roundIndex: 3,
      prompt: "Trong mệnh đề tính từ 'I hate the dog that bit me', đại từ quan hệ 'that' đóng vai trò chức năng gì?",
      options: [
        { id: "opt_A", label: "A", text: "Chủ ngữ (Subject) của mệnh đề tính từ" },
        { id: "opt_B", label: "B", text: "Tân ngữ (Object) của động từ 'hate'" },
        { id: "opt_C", label: "C", text: "Tân ngữ (Object) của động từ 'bit'" },
        { id: "opt_D", label: "D", text: "Liên từ đẳng lập (Coordinating Conjunction)" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Trong mệnh đề 'that bit me', 'that' thay thế cho 'the dog' và đóng vai trò làm Subject (chủ ngữ) trực tiếp đứng trước động từ 'bit'."
    },
    {
      id: "doer_w6d1_q05",
      roundIndex: 4,
      prompt: "Khác biệt về nghĩa giữa hai câu sau là gì?\n(1) He deleted the picture which upset me.\n(2) He deleted the picture, which upset me.",
      options: [
        { id: "opt_A", label: "A", text: "Hai câu hoàn toàn giống nhau, dấu phẩy chỉ là lỗi đánh máy" },
        { id: "opt_B", label: "B", text: "Ở câu (1) bức ảnh làm tôi buồn; ở câu (2) toàn bộ hành động 'anh ta xóa bức ảnh' làm tôi buồn" },
        { id: "opt_C", label: "C", text: "Ở câu (2) bức ảnh làm tôi buồn; ở câu (1) hành động xóa làm tôi buồn" },
        { id: "opt_D", label: "D", text: "Câu (2) là câu sai ngữ pháp tiếng Anh" }
      ],
      correctOptionId: "opt_B",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Câu (1) 'which' thay thế cho 'the picture' (chính bức ảnh khiến tôi buồn). Câu (2) có dấu phẩy ', which' bổ nghĩa cho cả mệnh đề phía trước (việc anh ta xoá ảnh khiến tôi buồn)."
    },
    {
      id: "doer_w6d1_q06",
      roundIndex: 5,
      prompt: "Kết hợp 2 câu sau thành 1 câu có mệnh đề tính từ: 'The bike was stolen. My father gave me the bike.'",
      options: [
        { id: "opt_A", label: "A", text: "The bike which my father gave me was stolen." },
        { id: "opt_B", label: "B", text: "The bike was stolen which my father gave it to me." },
        { id: "opt_C", label: "C", text: "My father gave me the bike who was stolen." },
        { id: "opt_D", label: "D", text: "The bike that my father gave it was stolen." }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'The bike [which/that my father gave me] was stolen.' - 'which' thay thế cho tân ngữ 'the bike', bỏ 'it'."
    },
    {
      id: "doer_w6d1_q07",
      roundIndex: 6,
      prompt: "Dịch sang tiếng Anh dùng Adjective Clause: 'Ứng dụng mà tôi tải về hôm qua rất hữu ích cho việc quản lý công việc hàng ngày.'",
      options: [
        { id: "opt_A", label: "A", text: "The application which I downloaded yesterday is very useful for managing daily tasks." },
        { id: "opt_B", label: "B", text: "The application where I download yesterday is very useful to manage daily tasks." },
        { id: "opt_C", label: "C", text: "The application what I downloaded yesterday very useful for daily tasks." },
        { id: "opt_D", label: "D", text: "The application downloaded it yesterday is useful for managing work." }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'The application [which/that I downloaded yesterday] is very useful for managing daily tasks.' - Mệnh đề tính từ bổ nghĩa cho 'The application'."
    },
    {
      id: "doer_w6d1_q08",
      roundIndex: 7,
      prompt: "Tìm lỗi sai trong câu: 'Bankers are scared of talking with strangers will find it hard to build their network.'",
      options: [
        { id: "opt_A", label: "A", text: "Thiếu đại từ quan hệ 'who' trước 'are scared of' khiến câu có 2 Finite Verbs không liên kết" },
        { id: "opt_B", label: "B", text: "Sai giới từ 'of', phải dùng 'about'" },
        { id: "opt_C", label: "C", text: "'talking' phải đổi thành 'talk'" },
        { id: "opt_D", label: "D", text: "'build' phải đổi thành 'building'" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Câu có 2 finite verbs: 'are scared of' và 'will find'. Phải thêm 'who' thành 'Bankers [who are scared of talking with strangers] will find it hard to build their network.'"
    },
    {
      id: "doer_w6d1_q09",
      roundIndex: 8,
      prompt: "Dịch sang tiếng Anh: 'Chính sách nhà ở mà chính phủ ban hành năm ngoái đã giúp hàng triệu người có thu nhập thấp mua được nhà.'",
      options: [
        { id: "opt_A", label: "A", text: "The housing policy which the government introduced last year helped millions of low-income people buy homes." },
        { id: "opt_B", label: "B", text: "The housing policy where the government issued it last year helped low-income people buy house." },
        { id: "opt_C", label: "C", text: "The housing policy who the state announced last year has helped millions low-income families." },
        { id: "opt_D", label: "D", text: "The housing policy that government introduced it last year helping millions of people." }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'housing policy' (chính sách nhà ở), 'introduce/issue a policy' (ban hành chính sách), 'low-income people' (người thu nhập thấp)."
    },
    {
      id: "doer_w6d1_q10",
      roundIndex: 9,
      prompt: "Phát biểu nào sau đây là ĐÚNG về bản chất của Mệnh đề tính từ (Adjective Clause)?",
      options: [
        { id: "opt_A", label: "A", text: "Nó là một mệnh đề phụ, không thể đứng độc lập một mình, có chức năng bổ nghĩa cho danh từ đứng trước nó" },
        { id: "opt_B", label: "B", text: "Nó là một mệnh đề độc lập có thể tách riêng thành câu hoàn chỉnh" },
        { id: "opt_C", label: "C", text: "Nó luôn luôn đứng ở đầu câu làm chủ ngữ" },
        { id: "opt_D", label: "D", text: "Nó bắt buộc phải dùng dấu phẩy trong mọi trường hợp" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Mệnh đề tính từ (Adjective Clause / Relative Clause) là subordinate clause bổ nghĩa cho noun/pronoun và không thể đứng độc lập một mình như một câu hoàn chỉnh."
    }
  ],

  "WEEK 6 – DAY 2": [
    {
      id: "doer_w6d2_q01",
      roundIndex: 0,
      prompt: "Trong chủ đề Technology & Business, từ \"settlement\" trong vụ kiện bản quyền ý tưởng của Facebook ĐỒNG NGHĨA nhất với:",
      options: [
        { id: "opt_A", label: "A", text: "legal agreement / compromise (sự hòa giải, thỏa thuận dàn xếp pháp lý)" },
        { id: "opt_B", label: "B", text: "court battle / confrontation (cuộc chiến tranh tụng gay gắt)" },
        { id: "opt_C", label: "C", text: "bankruptcy declaration (tuyên bố phá sản)" },
        { id: "opt_D", label: "D", text: "residential colony (khu tái định cư)" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. legal agreement / compromise (sự hòa giải, thỏa thuận dàn xếp pháp lý)",
      correctExplanation: "\"Settlement\" trong luật thương mại là sự dàn xếp, thỏa thuận hòa giải ngoài tòa để chấm dứt kiện tụng (thường kèm bồi thường cổ phần/tiền).",
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. residential colony",
        diagnosticTitle: "Nhầm lẫn nghĩa địa lý định cư với thuật ngữ luật học",
        explanation: "Trong bối cảnh tranh chấp bản quyền (lawsuit), settlement là thỏa thuận hòa giải bồi thường, không phải khu định cư dân cư."
      }
    },
    {
      id: "doer_w6d2_q02",
      roundIndex: 1,
      prompt: "Từ TRÁI NGHĨA với \"expulsion\" trong câu \"Though he faced expulsion from Harvard for his actions\" là:",
      options: [
        { id: "opt_A", label: "A", text: "admission / enrollment (sự thu nhận, nhập học chính thức)" },
        { id: "opt_B", label: "B", text: "dismissal (sự sa thải, đuổi học)" },
        { id: "opt_C", label: "C", text: "suspension (đình chỉ học tạm thời)" },
        { id: "opt_D", label: "D", text: "punishment (sự trừng phạt)" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. admission / enrollment (sự thu nhận, nhập học chính thức)",
      correctExplanation: "\"Expulsion\" = sự trục xuất, buộc thôi học vĩnh viễn. Từ trái nghĩa trực tiếp là \"admission\" hoặc \"enrollment\" (nhận vào trường).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. dismissal",
        diagnosticTitle: "Chọn nhầm từ đồng nghĩa thay vì từ trái nghĩa",
        explanation: "Dismissal là từ đồng nghĩa mang nghĩa đuổi học. Đề bài đang yêu cầu tìm từ TRÁI NGHĨA."
      }
    },
    {
      id: "doer_w6d2_q03",
      roundIndex: 2,
      prompt: "Thuật ngữ tài chính khởi nghiệp \"angel investor\" (như Sean Parker đối với Facebook) dùng để chỉ ai?",
      options: [
        { id: "opt_A", label: "A", text: "Nhà đầu tư thiên thần (cá nhân giàu có rót vốn ban đầu hỗ trợ các startup non trẻ)" },
        { id: "opt_B", label: "B", text: "Tổ chức từ thiện tôn giáo phát tiền miễn phí" },
        { id: "opt_C", label: "C", text: "Ngân hàng nhà nước bảo lãnh tín dụng" },
        { id: "opt_D", label: "D", text: "Luật sư đại diện cho các cổ đông thiểu số" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Nhà đầu tư thiên thần (cá nhân giàu có rót vốn ban đầu hỗ trợ các startup non trẻ)",
      correctExplanation: "\"Angel investor\" là thuật ngữ quốc tế chỉ các cá nhân đầu tư thiên thần, chấp nhận rủi ro cao để rót vốn hạt giống cho các công ty khởi nghiệp.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Tổ chức từ thiện tôn giáo",
        diagnosticTitle: "Dịch nghĩa đen từ chữ \"angel\" thành tổ chức tôn giáo",
        explanation: "Đây là thuật ngữ tài chính mạo hiểm, hoàn toàn không liên quan đến tôn giáo hay từ thiện đơn thuần."
      }
    },
    {
      id: "doer_w6d2_q04",
      roundIndex: 3,
      prompt: "Collocation chuẩn trong bài: \"Mark was on the ______ of expulsion from university due to serious security breaches.\"",
      options: [
        { id: "opt_A", label: "A", text: "brink" },
        { id: "opt_B", label: "B", text: "side" },
        { id: "opt_C", label: "C", text: "corner" },
        { id: "opt_D", label: "D", text: "limit" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. brink",
      correctExplanation: "Thành ngữ học thuật cố định: \"on the brink of something / doing something\" (đang trên bờ vực gặp phải một nguy hiểm hay biến cố lớn).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. side",
        diagnosticTitle: "Dịch từ \"bên cạnh\" thành side",
        explanation: "Thành ngữ chỉ bờ vực nguy nan bắt buộc phải dùng \"on the brink of\", không dùng \"on the side of\"."
      }
    },
    {
      id: "doer_w6d2_q05",
      roundIndex: 4,
      prompt: "Chọn tính từ phù hợp diễn tả đặc tính gây nghiện của mạng xã hội: \"Short video apps are highly ______ to young audiences, making it hard to stop watching.\"",
      options: [
        { id: "opt_A", label: "A", text: "addictive" },
        { id: "opt_B", label: "B", text: "addicted" },
        { id: "opt_C", label: "C", text: "addict" },
        { id: "opt_D", label: "D", text: "addiction" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. addictive",
      correctExplanation: "Tính từ đuôi -ive chỉ tính chất gây nghiện của sự vật/ứng dụng: \"highly addictive\". Còn người bị nghiện mới dùng \"addicted to\".",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. addicted",
        diagnosticTitle: "Nhầm lẫn giữa tính từ bị động (người bị nghiện) và chủ động (vật gây nghiện)",
        explanation: "Ứng dụng phần mềm có tính chất gây nghiện cho người khác thì phải dùng \"addictive\", không dùng \"addicted\"."
      }
    },
    {
      id: "doer_w6d2_q06",
      roundIndex: 5,
      prompt: "Chọn dạng bị động chuẩn cho sự kiện thành lập: \"The social networking platform ______ in 2016 by a Chinese tech entrepreneur.\"",
      options: [
        { id: "opt_A", label: "A", text: "was founded" },
        { id: "opt_B", label: "B", text: "was found" },
        { id: "opt_C", label: "C", text: "is found" },
        { id: "opt_D", label: "D", text: "has founded" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. was founded",
      correctExplanation: "Động từ \"found\" (thành lập) có quá khứ phân từ là \"founded\". Câu bị động chỉ sự kiện lịch sử trong quá khứ: \"was founded\".",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. was found",
        diagnosticTitle: "Nhầm lẫn giữa động từ find (tìm thấy) và found (thành lập)",
        explanation: "\"Find - found - found\" là tìm thấy, còn \"found - founded - founded\" là thành lập, sáng lập."
      }
    },
    {
      id: "doer_w6d2_q07",
      roundIndex: 6,
      prompt: "Chọn giới từ đúng đi kèm nền tảng kỹ thuật số: \"Over 1 billion users share memorable videos ______ the platform every month.\"",
      options: [
        { id: "opt_A", label: "A", text: "on" },
        { id: "opt_B", label: "B", text: "in" },
        { id: "opt_C", label: "C", text: "at" },
        { id: "opt_D", label: "D", text: "by" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. on",
      correctExplanation: "Quy tắc giới từ cho các nền tảng công nghệ, website, ứng dụng số: luôn dùng giới từ \"ON the platform / on the internet / on Facebook\".",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. in",
        diagnosticTitle: "Dịch từ \"trong nền tảng\" thành giới từ \"in\"",
        explanation: "Tiếng Việt nói \"trong nền tảng mạng xã hội\", nhưng tiếng Anh bắt buộc dùng \"ON the platform\"."
      }
    },
    {
      id: "doer_w6d2_q08",
      roundIndex: 7,
      prompt: "Trong cụm \"Zuckerberg signed a pledge along with other philanthropists\", từ \"pledge\" mang nghĩa gì?",
      options: [
        { id: "opt_A", label: "A", text: "Lời cam kết chính thức / văn bản thề nguyện hiến tặng tài sản" },
        { id: "opt_B", label: "B", text: "Hợp đồng vay thế chấp ngân hàng" },
        { id: "opt_C", label: "C", text: "Đơn khiếu nại bản quyền tại tòa án" },
        { id: "opt_D", label: "D", text: "Bản báo cáo doanh thu tài chính quý" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Lời cam kết chính thức / văn bản thề nguyện hiến tặng tài sản",
      correctExplanation: "\"A pledge\" là một lời hứa danh dự, bản cam kết công khai đóng góp tài sản vì mục tiêu nhân đạo.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Hợp đồng vay thế chấp",
        diagnosticTitle: "Nhầm thuật ngữ cam kết với hợp đồng nợ",
        explanation: "Trong bối cảnh hiến tặng tài sản (philanthropy), \"pledge\" là lời cam kết từ thiện của các tỷ phú."
      }
    },
    {
      id: "doer_w6d2_q09",
      roundIndex: 8,
      prompt: "VẬN DỤNG NGỮ CẢNH MỚI: Chọn từ thích hợp điền vào câu: \"The tech startup agreed to pay substantial ______ fees to protect its proprietary domain name from counterfeiters.\"",
      options: [
        { id: "opt_A", label: "A", text: "registration" },
        { id: "opt_B", label: "B", text: "bland" },
        { id: "opt_C", label: "C", text: "burnout" },
        { id: "opt_D", label: "D", text: "pack" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. registration",
      correctExplanation: "\"Registration fees\" = phí đăng ký (đăng ký tên miền hoặc sở hữu trí tuệ để chống hàng giả mạo).",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. burnout",
        diagnosticTitle: "Ghép từ không liên quan ngữ nghĩa kinh doanh",
        explanation: "Burnout là kiệt sức lao động, hoàn toàn không tương thích với khái niệm bảo vệ tên miền."
      }
    },
    {
      id: "doer_w6d2_q10",
      roundIndex: 9,
      prompt: "PARAPHRASE: Câu \"The rise of social platforms enabled ordinary individuals to set trends and drive public opinions without traditional media gatekeepers\" được diễn đạt lại tương đương nhất là:",
      options: [
        { id: "opt_A", label: "A", text: "Digital networks empowered regular users to spearhead viral movements and influence viewpoints independently of legacy broadcast outlets." },
        { id: "opt_B", label: "B", text: "Traditional television channels still retain total authoritarian monopoly over youth cultural perceptions." },
        { id: "opt_C", label: "C", text: "Every user is legally prohibited from producing content on video sharing applications." },
        { id: "opt_D", label: "D", text: "Tech corporations mandate that only celebrities can express viewpoints on digital forums." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Digital networks empowered regular users to spearhead viral movements and influence viewpoints independently of legacy broadcast outlets.",
      correctExplanation: "\"Digital networks empowered regular users\" paraphrase cho \"platforms enabled ordinary individuals\", \"spearhead viral movements\" paraphrase cho \"set trends\", và \"independently of legacy broadcast outlets\" paraphrase cho \"without traditional media gatekeepers\".",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Traditional television retains monopoly",
        diagnosticTitle: "Đảo ngược hoàn toàn thực tế thay đổi của truyền thông",
        explanation: "Bài đọc nêu rõ truyền hình đang suy giảm và nhường quyền định hình xu hướng cho người sáng tạo số."
      }
    }
  ],

  "WEEK 6 – DAY 3": [
    {
      id: "doer_w6d3_q01",
      roundIndex: 0,
      prompt: "Quy tắc cốt lõi khi phát âm đuôi '-ed' thành /id/ là động từ nguyên mẫu có âm tận cùng bằng âm nào?",
      options: [
        { id: "opt_A", label: "A", text: "/t/ hoặc /d/" },
        { id: "opt_B", label: "B", text: "/p/ hoặc /k/" },
        { id: "opt_C", label: "C", text: "/s/ hoặc /ʃ/" },
        { id: "opt_D", label: "D", text: "Tất cả các nguyên âm" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Quy tắc quan trọng nhất của âm đuôi -ed: Nếu âm cuối của động từ nguyên mẫu là /t/ hoặc /d/ (như decided, visited, wanted), đuôi -ed được phát âm là /id/."
    },
    {
      id: "doer_w6d3_q02",
      roundIndex: 1,
      prompt: "Từ nào dưới đây có đuôi '-ed' được phát âm là /t/?",
      options: [
        { id: "opt_A", label: "A", text: "watched" },
        { id: "opt_B", label: "B", text: "played" },
        { id: "opt_C", label: "C", text: "waited" },
        { id: "opt_D", label: "D", text: "called" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Động từ 'watch' kết thúc bằng âm vô thanh /tʃ/ (không rung), nên -ed nối tiếp âm vô thanh là /t/ -> /wɒtʃt/."
    },
    {
      id: "doer_w6d3_q03",
      roundIndex: 2,
      prompt: "Từ nào dưới đây có đuôi '-ed' được phát âm là /d/?",
      options: [
        { id: "opt_A", label: "A", text: "played" },
        { id: "opt_B", label: "B", text: "worked" },
        { id: "opt_C", label: "C", text: "laughed" },
        { id: "opt_D", label: "D", text: "stopped" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'play' kết thúc bằng nguyên âm đôi /eɪ/ (âm hữu thanh/rung), nên -ed được đọc là âm rung /d/ -> /pleɪd/."
    },
    {
      id: "doer_w6d3_q04",
      roundIndex: 3,
      prompt: "Đuôi '-ed' trong từ 'exhausted' được phát âm là gì?",
      options: [
        { id: "opt_A", label: "A", text: "/ɪd/" },
        { id: "opt_B", label: "B", text: "/t/" },
        { id: "opt_C", label: "C", text: "/d/" },
        { id: "opt_D", label: "D", text: "Câm (không phát âm)" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'exhaust' kết thúc bằng âm /t/, do đó khi thêm -ed đọc là /ɪd/ -> /ɪɡˈzɔː.stɪd/."
    },
    {
      id: "doer_w6d3_q05",
      roundIndex: 4,
      prompt: "Trong đoạn đối thoại về Travel (Day 3), bạn An nói bạn không thích 'tourist attractions' mà thích đi đâu?",
      options: [
        { id: "opt_A", label: "A", text: "Lesser-known destinations with natural landscapes" },
        { id: "opt_B", label: "B", text: "Luxury shopping malls and resorts" },
        { id: "opt_C", label: "C", text: "Crowded five-star hotels in big cities" },
        { id: "opt_D", label: "D", text: "Amusement parks with water games" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "An nói: 'I prefer to explore lesser-known destinations with natural landscapes, while on vacation. You know, I hate crowded places.'"
    },
    {
      id: "doer_w6d3_q06",
      roundIndex: 5,
      prompt: "Cụm từ tiếng Anh nào mang nghĩa 'điểm tham quan du lịch nổi tiếng'?",
      options: [
        { id: "opt_A", label: "A", text: "Tourist attractions" },
        { id: "opt_B", label: "B", text: "Travel agencies" },
        { id: "opt_C", label: "C", text: "Natural landscapes" },
        { id: "opt_D", label: "D", text: "Public transportations" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'tourist attraction' nghĩa là địa điểm thu hút/tham quan du lịch."
    },
    {
      id: "doer_w6d3_q07",
      roundIndex: 6,
      prompt: "Lý do vì sao bạn An lại chọn đi du lịch bằng tàu hoả (train) thay vì máy bay (plane)?",
      options: [
        { id: "opt_A", label: "A", text: "Vì vé máy bay khá đắt (plane tickets are quite expensive)" },
        { id: "opt_B", label: "B", text: "Vì bạn An bị say máy bay nặng" },
        { id: "opt_C", label: "C", text: "Vì tàu hoả đi nhanh hơn máy bay" },
        { id: "opt_D", label: "D", text: "Vì trên tàu hoả phục vụ món Cao Lầu" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Trong đoạn hội thoại: 'For me, plane tickets are quite expensive, so I prefer to travel by train.'"
    },
    {
      id: "doer_w6d3_q08",
      roundIndex: 7,
      prompt: "Thì ngữ pháp phù hợp nhất để trả lời câu hỏi: 'Have you ever traveled to a foreign country?' là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Hiện tại hoàn thành (Present Perfect) để nêu trải nghiệm, sau đó dùng Quá khứ đơn (Past Simple) để kể chi tiết chuyến đi" },
        { id: "opt_B", label: "B", text: "Chỉ được dùng thì Tương lai đơn (Future Simple)" },
        { id: "opt_C", label: "C", text: "Chỉ được dùng thì Hiện tại tiếp diễn (Present Continuous)" },
        { id: "opt_D", label: "D", text: "Quá khứ hoàn thành tiếp diễn cho toàn bộ câu trả lời" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Cấu trúc trả lời kinh điển trong IELTS Speaking Part 1: Bắt đầu bằng Present Perfect ('Yes, I have been to...'), sau đó dùng Past Simple để kể chi tiết sự việc cụ thể ('Two years ago, I went to...')."
    },
    {
      id: "doer_w6d3_q09",
      roundIndex: 8,
      prompt: "Cụm diễn đạt nào diễn tả 'thưởng ngoạn phong cảnh theo tốc độ/nhịp độ của riêng mình'?",
      options: [
        { id: "opt_A", label: "A", text: "Enjoy beautiful views at my own pace" },
        { id: "opt_B", label: "B", text: "Make a run for it at high speed" },
        { id: "opt_C", label: "C", text: "Get away from work immediately" },
        { id: "opt_D", label: "D", text: "Connect with foreign cultures" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Trong bài học: 'so I can really enjoy beautiful views at my own pace' (ngắm cảnh theo nhịp độ riêng của mình)."
    },
    {
      id: "doer_w6d3_q10",
      roundIndex: 9,
      prompt: "Trong 3 từ sau: 'worked', 'laughed', 'focused', điểm chung về phát âm của đuôi '-ed' là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Cả 3 đều được phát âm là /t/ vì các âm cuối /k/, /f/, /s/ đều là âm vô thanh" },
        { id: "opt_B", label: "B", text: "Cả 3 đều phát âm là /id/" },
        { id: "opt_C", label: "C", text: "Cả 3 đều phát âm là /d/" },
        { id: "opt_D", label: "D", text: "Đuôi -ed bị nuốt âm hoàn toàn" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Work (/k/), laugh (/f/), focus (/s/) đều kết thúc bằng unvoiced consonants (âm vô thanh), nên -ed được đọc là /t/."
    }
  ]
};
