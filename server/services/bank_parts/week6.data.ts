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
      prompt: "Theo bài đọc về lịch sử ra đời của Facebook, tiền thân đầu tiên của mạng xã hội này là trang web nào do Mark Zuckerberg tạo ra tại Harvard?",
      options: [
        { id: "opt_A", label: "A", text: "Facemash" },
        { id: "opt_B", label: "B", text: "HarvardConnection" },
        { id: "opt_C", label: "C", text: "CampusNet" },
        { id: "opt_D", label: "D", text: "MySpace" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Bài đọc nêu rõ: 'Facemash opened on October 28, 2003—and closed a few days later, after it was shut down by Harvard execs.'"
    },
    {
      id: "doer_w6d2_q02",
      roundIndex: 1,
      prompt: "Sau khi Facemash bị đóng cửa, Mark Zuckerberg đã phải đối mặt với nguy cơ kỷ luật nào từ Đại học Harvard?",
      options: [
        { id: "opt_A", label: "A", text: "Bị phạt tù 1 năm" },
        { id: "opt_B", label: "B", text: "Bị buộc thôi học (expulsion)" },
        { id: "opt_C", label: "C", text: "Bị cấm sử dụng máy tính vĩnh viễn" },
        { id: "opt_D", label: "D", text: "Bị huỷ kết quả thi học kỳ" }
      ],
      correctOptionId: "opt_B",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Trong bài: 'Though he faced expulsion from Harvard for his actions, all charges against him were eventually dropped.'"
    },
    {
      id: "doer_w6d2_q03",
      roundIndex: 2,
      prompt: "Để giải quyết vụ kiện cáo buộc sao chép ý tưởng với anh em nhà Winklevoss và Divya Narendra, Mark Zuckerberg đã phải bồi thường gì?",
      options: [
        { id: "opt_A", label: "A", text: "1.2 triệu cổ phần (shares) công ty cho mỗi người vào năm 2008" },
        { id: "opt_B", label: "B", text: "100 triệu USD tiền mặt ngay lập tức" },
        { id: "opt_C", label: "C", text: "Nhượng lại toàn bộ quyền sở hữu thương hiệu HarvardConnection" },
        { id: "opt_D", label: "D", text: "Công khai xin lỗi trên trang chủ Facebook" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Bài đọc: 'eventually all three received a settlement in 2008 that included 1.2 million shares in the company each.'"
    },
    {
      id: "doer_w6d2_q04",
      roundIndex: 3,
      prompt: "Công ty đã mua lại tên miền 'facebook.com' vào năm 2005 với giá bao nhiêu để bỏ chữ 'The' phía trước?",
      options: [
        { id: "opt_A", label: "A", text: "$200,000" },
        { id: "opt_B", label: "B", text: "$20,000" },
        { id: "opt_C", label: "C", text: "$2,000,000" },
        { id: "opt_D", label: "D", text: "$12.7 million" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Bài đọc: 'after purchasing the domain name facebook.com in 2005 for $200,000.'"
    },
    {
      id: "doer_w6d2_q05",
      roundIndex: 4,
      prompt: "Theo chính sách của Facebook được ban hành vào tháng 9 năm 2006, ai có thể tạo tài khoản tham gia mạng xã hội này?",
      options: [
        { id: "opt_A", label: "A", text: "Bất kỳ ai từ đủ 13 tuổi trở lên và có địa chỉ email hợp lệ" },
        { id: "opt_B", label: "B", text: "Chỉ sinh viên các trường đại học ở Mỹ" },
        { id: "opt_C", label: "C", text: "Chỉ những người từ đủ 18 tuổi trở lên" },
        { id: "opt_D", label: "D", text: "Chỉ học sinh trung học phổ thông có thư giới thiệu" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Bài đọc: 'In September of 2006, Facebook announced that anyone who was at least 13 years old and had a valid email address could join.'"
    },
    {
      id: "doer_w6d2_q06",
      roundIndex: 5,
      prompt: "True, False hay Not Given: 'Thefacebook.com was initially not available for Harvard outsiders.'",
      options: [
        { id: "opt_A", label: "A", text: "TRUE" },
        { id: "opt_B", label: "B", text: "FALSE" },
        { id: "opt_C", label: "C", text: "NOT GIVEN" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "TRUE. Bài đọc viết: 'known as thefacebook.com and made available only to Harvard students', tức người ngoài Harvard (outsiders) không thể truy cập."
    },
    {
      id: "doer_w6d2_q07",
      roundIndex: 6,
      prompt: "True, False hay Not Given: 'Harvard executives shut Facemash down by hacking into it.'",
      options: [
        { id: "opt_A", label: "A", text: "FALSE" },
        { id: "opt_B", label: "B", text: "TRUE" },
        { id: "opt_C", label: "C", text: "NOT GIVEN" }
      ],
      correctOptionId: "opt_C",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "NOT GIVEN. Bài đọc chỉ nói 'it was shut down by Harvard execs', không hề đề cập việc họ có hack (hacking) vào hệ thống hay yêu cầu tắt máy chủ vật lý."
    },
    {
      id: "doer_w6d2_q08",
      roundIndex: 7,
      prompt: "Điền từ thích hợp vào chỗ trống (từ bài đọc): 'Mark was on the brink of ______________ from Harvard because of Facemash.'",
      options: [
        { id: "opt_A", label: "A", text: "expulsion" },
        { id: "opt_B", label: "B", text: "graduation" },
        { id: "opt_C", label: "C", text: "settlement" },
        { id: "opt_D", label: "D", text: "resignation" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Từ bài đọc: 'faced expulsion from Harvard' -> 'on the brink of expulsion' (trên bờ vực bị đuổi học)."
    },
    {
      id: "doer_w6d2_q09",
      roundIndex: 8,
      prompt: "Quỹ từ thiện 'Chan Zuckerberg Initiative' do vợ chồng Mark Zuckerberg thành lập cam kết đóng góp bao nhiêu phần trăm cổ phần Facebook của họ?",
      options: [
        { id: "opt_A", label: "A", text: "99%" },
        { id: "opt_B", label: "B", text: "50%" },
        { id: "opt_C", label: "C", text: "75%" },
        { id: "opt_D", label: "D", text: "100%" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Bài đọc: 'contribute 99% of their Facebook shares to the Chan Zuckerberg Initiative to improve lives through education, health, scientific research, and energy.'"
    },
    {
      id: "doer_w6d2_q10",
      roundIndex: 9,
      prompt: "Từ vựng: 'Angel investor Sean Parker was named president of Facebook.' Cụm 'angel investor' mang nghĩa là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Nhà đầu tư thiên thần (cá nhân giàu có đầu tư vốn cho các startup giai đoạn đầu)" },
        { id: "opt_B", label: "B", text: "Quỹ đầu tư của các tổ chức tôn giáo" },
        { id: "opt_C", label: "C", text: "Nhà tài trợ từ thiện không lấy lãi" },
        { id: "opt_D", label: "D", text: "Chuyên viên tư vấn pháp lý độc lập" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'Angel investor' trong thuật ngữ kinh doanh là nhà đầu tư thiên thần, rót vốn ban đầu hỗ trợ doanh nghiệp khởi nghiệp."
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
