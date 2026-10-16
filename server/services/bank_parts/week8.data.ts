/**
 * Question Bank for Week 8 (Day 1, Day 2, Day 3)
 * DOER Coursebook 2027
 */

export const WEEK_8_QUESTIONS: Record<string, any[]> = {
  "WEEK 8 – DAY 1": [
    {
      id: "doer_w8d1_q01",
      roundIndex: 0,
      prompt: "Trong văn phong học thuật IELTS Writing, câu bị động (Passive voice) thường được sử dụng nhiều nhất trong trường hợp nào?",
      options: [
        { id: "opt_A", label: "A", text: "Khi người viết muốn nhấn mạnh vào hành động/đối tượng chịu tác động hoặc khi chủ thể thực hiện hành động không quan trọng/chưa rõ" },
        { id: "opt_B", label: "B", text: "Chỉ khi người viết muốn câu văn dài thêm nhiều từ để đạt độ dài tối thiểu" },
        { id: "opt_C", label: "C", text: "Trong tất cả mọi câu văn miêu tả quan điểm cá nhân" },
        { id: "opt_D", label: "D", text: "Chỉ khi chủ ngữ là tên một cá nhân cụ thể" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Passive voice được dùng khi trọng tâm thông tin đặt vào hành động hoặc tân ngữ chịu tác động, hoặc khi agent (chủ thể gây ra hành động) không quan trọng, hiển nhiên, hoặc không rõ danh tính."
    },
    {
      id: "doer_w8d1_q02",
      roundIndex: 1,
      prompt: "Chuyển câu sau sang thể bị động (Passive Voice): 'US companies have recently recruited 500,000 workers in August alone.'",
      options: [
        { id: "opt_A", label: "A", text: "500,000 workers have recently been recruited in August alone." },
        { id: "opt_B", label: "B", text: "500,000 workers were recently recruited in August alone." },
        { id: "opt_C", label: "C", text: "500,000 workers have recently recruited by US companies." },
        { id: "opt_D", label: "D", text: "500,000 workers are recently been recruited in August alone." }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Câu gốc ở thì Hiện tại hoàn thành (have recruited) -> Thể bị động tương ứng: have/has been + V3/ed -> 'have recently been recruited'."
    },
    {
      id: "doer_w8d1_q03",
      roundIndex: 2,
      prompt: "Chuyển câu sau sang thể bị động: 'The company required all employees to attend the meeting.'",
      options: [
        { id: "opt_A", label: "A", text: "All employees were required to attend the meeting." },
        { id: "opt_B", label: "B", text: "All employees had required to attend the meeting." },
        { id: "opt_C", label: "C", text: "All employees are required to attended the meeting." },
        { id: "opt_D", label: "D", text: "All employees were requiring to attend the meeting." }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Thì Quá khứ đơn 'required' -> bị động là 'were required to attend'."
    },
    {
      id: "doer_w8d1_q04",
      roundIndex: 3,
      prompt: "Đối với ngoại động từ có 2 tân ngữ (Vt + O1 + O2) như 'give sb sth': 'Her boyfriend gave her a Rolex on her birthday', câu bị động ưu tiên phổ biến nhất là gì?",
      options: [
        { id: "opt_A", label: "A", text: "She was given a Rolex (by her boyfriend) on her birthday." },
        { id: "opt_B", label: "B", text: "A Rolex gave her on her birthday by boyfriend." },
        { id: "opt_C", label: "C", text: "She gave a Rolex by her boyfriend on birthday." },
        { id: "opt_D", label: "D", text: "Her was given a Rolex on her birthday." }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Ưu tiên đưa tân ngữ gián tiếp chỉ người (her -> She) lên làm chủ ngữ: 'She was given a Rolex on her birthday'."
    },
    {
      id: "doer_w8d1_q05",
      roundIndex: 4,
      prompt: "Chuyển sang bị động với động từ có cấu trúc 'expect to do sth': 'Cô ấy kỳ vọng sẽ được thăng chức vào tháng sau.'",
      options: [
        { id: "opt_A", label: "A", text: "She expects to be promoted next month." },
        { id: "opt_B", label: "B", text: "She expects to promote next month." },
        { id: "opt_C", label: "C", text: "She is expected promoting next month." },
        { id: "opt_D", label: "D", text: "She was expected to promote next month." }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Cấu trúc chủ động: expect to do sth -> Bị động cho non-finite verb to-infinitive: expect to BE + V3/ed -> 'expects to be promoted'."
    },
    {
      id: "doer_w8d1_q06",
      roundIndex: 5,
      prompt: "Chuyển sang bị động với giới từ 'dream of doing sth': 'Anh ấy mơ về việc được Google tuyển dụng.'",
      options: [
        { id: "opt_A", label: "A", text: "He dreams of being recruited by Google." },
        { id: "opt_B", label: "B", text: "He dreams of recruiting by Google." },
        { id: "opt_C", label: "C", text: "He is dreamed of recruit by Google." },
        { id: "opt_D", label: "D", text: "He dreams of to be recruited by Google." }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Sau giới từ 'of' là gerund (V-ing). Dạng bị động của gerund là 'being + V3' -> 'dreams of being recruited'."
    },
    {
      id: "doer_w8d1_q07",
      roundIndex: 6,
      prompt: "Động từ nào sau đây là nội động từ (Intransitive verb) KHÔNG THỂ chia ở thể bị động?",
      options: [
        { id: "opt_A", label: "A", text: "happen / occur" },
        { id: "opt_B", label: "B", text: "build" },
        { id: "opt_C", label: "C", text: "destroy" },
        { id: "opt_D", label: "D", text: "publish" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Nội động từ (intransitive verbs) như happen, occur, arrive, disappear không nhận tân ngữ nên KHÔNG BAO GIỜ có dạng bị động."
    },
    {
      id: "doer_w8d1_q08",
      roundIndex: 7,
      prompt: "Dùng Past Participle (V3/ed) làm tính từ bổ nghĩa: 'Tôi đã quyên góp tiền để hỗ trợ các nạn nhân bị ảnh hưởng bởi bão lũ.'",
      options: [
        { id: "opt_A", label: "A", text: "I donated money to support the victims affected by the flood." },
        { id: "opt_B", label: "B", text: "I donated money to support the victims affecting by the flood." },
        { id: "opt_C", label: "C", text: "I donated money to support the victims are affected by the flood." },
        { id: "opt_D", label: "D", text: "I donated money to support the flood affected victims." }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'the victims affected by the flood' là dạng rút gọn của 'victims who were affected by the flood' (Past participle mang nghĩa bị tác động)."
    },
    {
      id: "doer_w8d1_q09",
      roundIndex: 8,
      prompt: "Chuyển câu sau sang bị động thì Hiện tại tiếp diễn: 'He is carrying a chair upstairs.'",
      options: [
        { id: "opt_A", label: "A", text: "A chair is being carried upstairs." },
        { id: "opt_B", label: "B", text: "A chair is carried upstairs." },
        { id: "opt_C", label: "C", text: "A chair has been carried upstairs." },
        { id: "opt_D", label: "D", text: "A chair was being carried upstairs." }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Thì Hiện tại tiếp diễn ở thể bị động: is/am/are + BEING + V3 -> 'is being carried'."
    },
    {
      id: "doer_w8d1_q10",
      roundIndex: 9,
      prompt: "Khác biệt bản chất giữa Present Participle (V-ing) và Past Participle (V3/ed) khi đứng bổ nghĩa cho danh từ là gì?",
      options: [
        { id: "opt_A", label: "A", text: "V-ing mang ý nghĩa chủ động thực hiện hành động; V-ed mang ý nghĩa bị tác động bởi hành động" },
        { id: "opt_B", label: "B", text: "V-ing dùng cho đồ vật; V-ed dùng cho con người" },
        { id: "opt_C", label: "C", text: "V-ing dùng trong quá khứ; V-ed dùng trong tương lai" },
        { id: "opt_D", label: "D", text: "Không có sự khác biệt, dùng thay thế nhau được" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "V-ing là phân từ chủ động (active: e.g. sleeping baby, disappointing result); V-ed là phân từ bị động (passive: e.g. affected victims, imported goods)."
    }
  ],

  "WEEK 8 – DAY 2": [
    {
      id: "doer_w8d2_q01",
      roundIndex: 0,
      prompt: "Theo bài đọc về đường dây buôn bán cần sa bất hợp pháp tại Anh, nhân vật Cường Nguyễn quê ở tỉnh nào tại Việt Nam?",
      options: [
        { id: "opt_A", label: "A", text: "Hải Phòng (Haiphong)" },
        { id: "opt_B", label: "B", text: "Hà Tĩnh" },
        { id: "opt_C", label: "C", text: "Nghệ An" },
        { id: "opt_D", label: "D", text: "Quảng Ninh" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Bài đọc: 'His dangerous journey from the poor town of Haiphong to Britain's illegal cannabis farms was driven by big dreams.'"
    },
    {
      id: "doer_w8d2_q02",
      roundIndex: 1,
      prompt: "Để trốn sang châu Âu tham gia đường dây trồng cần sa, Cường đã trả cho đường dây môi giới bao nhiêu tiền để có hộ chiếu giả?",
      options: [
        { id: "opt_A", label: "A", text: "US$15,000" },
        { id: "opt_B", label: "B", text: "US$19,000" },
        { id: "opt_C", label: "C", text: "US$3,200" },
        { id: "opt_D", label: "D", text: "US$50,000" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Bài đọc: 'he paid US$15,000 to brokers for a fake passport to join a tour to Europe.'"
    },
    {
      id: "doer_w8d2_q03",
      roundIndex: 2,
      prompt: "Từ trại tị nạn ở Calais (Pháp), Cường và những người di cư đã vượt biên vào nước Anh bằng cách nào?",
      options: [
        { id: "opt_A", label: "A", text: "Trốn dưới gầm một chiếc xe tải (underneath a lorry)" },
        { id: "opt_B", label: "B", text: "Đi bằng xuồng hơi cao su vượt eo biển Manche" },
        { id: "opt_C", label: "C", text: "Dùng visa du lịch đường hàng không" },
        { id: "opt_D", label: "D", text: "Ẩn nấp trong thùng container đông lạnh" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Bài đọc: 'transported to the UK, under a lorry. \"If you fall you're dead,\" explains Cuong...'"
    },
    {
      id: "doer_w8d2_q04",
      roundIndex: 3,
      prompt: "Tại thành phố Bristol, công việc hàng ngày của Cường tại các ngôi nhà trồng cần sa ngoại ô gồm những gì?",
      options: [
        { id: "opt_A", label: "A", text: "Trộn phân bón dinh dưỡng, chiếu đèn sưởi 2 tiếng mỗi ngày và tưới nước cho cây" },
        { id: "opt_B", label: "B", text: "Giao cần sa trực tiếp cho người tiêu dùng trên phố" },
        { id: "opt_C", label: "C", text: "Lái xe tải vận chuyển cần sa sang các thành phố khác" },
        { id: "opt_D", label: "D", text: "Nấu ăn cho đội ngũ bảo vệ người Anh" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Bài đọc: '\"I got up early, ate rice, and prepared feed for my plants... put them under lights for two hours and watered them,\" recalls Cuong.'"
    },
    {
      id: "doer_w8d2_q05",
      roundIndex: 4,
      prompt: "Cường bị cảnh sát bắt giữ tại London vào năm 2014 vì hành vi gì?",
      options: [
        { id: "opt_A", label: "A", text: "Bị bắt vì hút cần sa công khai và dấu vân tay trùng khớp với trang trại cần sa ở Bristol" },
        { id: "opt_B", label: "B", text: "Đánh nhau tại một quán bar ở trung tâm London" },
        { id: "opt_C", label: "C", text: "Cướp tiệm vàng ở khu người Việt" },
        { id: "opt_D", label: "D", text: "Bị phát hiện dùng hộ chiếu giả ở sân bay Heathrow" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Bài đọc: 'in 2014 he was arrested for smoking cannabis. His fingerprints tied him to the Bristol grow house.'"
    },
    {
      id: "doer_w8d2_q06",
      roundIndex: 5,
      prompt: "Sau khi thụ án 10 tháng tù giam tại Anh, Cường đã phải đối mặt với hình phạt hành chính nào tiếp theo?",
      options: [
        { id: "opt_A", label: "A", text: "Bị Bộ Nội vụ Anh trục xuất (deported) về Việt Nam" },
        { id: "opt_B", label: "B", text: "Bị phạt lao động công ích vĩnh viễn ở Scotland" },
        { id: "opt_C", label: "C", text: "Bị đưa vào trại tị nạn không thời hạn" },
        { id: "opt_D", label: "D", text: "Được cấp quy chế tị nạn nhân đạo" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Bài đọc: 'sentenced to 10 months in jail. Eventually, the UK Home Office deported him. He joined more than 1,600 returnees to Vietnam...'"
    },
    {
      id: "doer_w8d2_q07",
      roundIndex: 6,
      prompt: "Thực hiện bài tập tóm tắt điền 1 từ: 'In Vietnam, Cuong found it difficult to adjust to life as he was ____________.'",
      options: [
        { id: "opt_A", label: "A", text: "broke" },
        { id: "opt_B", label: "B", text: "rich" },
        { id: "opt_C", label: "C", text: "injured" },
        { id: "opt_D", label: "D", text: "imprisoned" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Từ bài đọc: 'who returned broke and now lives in a modest house in Haiphong' -> broke (cháy túi, khánh kiệt tài chính)."
    },
    {
      id: "doer_w8d2_q08",
      roundIndex: 7,
      prompt: "Ước tính của các nhà nghiên cứu về quy mô thị trường mua bán cần sa bất hợp pháp hàng năm tại Anh là bao nhiêu?",
      options: [
        { id: "opt_A", label: "A", text: "Khoảng 2.6 tỷ Bảng Anh (tương đương 3.2 tỷ USD)" },
        { id: "opt_B", label: "B", text: "Khoảng 500 triệu Bảng Anh" },
        { id: "opt_C", label: "C", text: "Khoảng 10 tỷ Bảng Anh" },
        { id: "opt_D", label: "D", text: "Khoảng 100 triệu USD" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Bài đọc: 'huge cannabis trade - which researchers value at around £2.6 billion (US$3.2 billion) a year.'"
    },
    {
      id: "doer_w8d2_q09",
      roundIndex: 8,
      prompt: "Từ vựng: 'Cuong was sentenced to 10 months in jail.' Từ 'sentenced' mang ý nghĩa gì?",
      options: [
        { id: "opt_A", label: "A", text: "Bị toà tuyên án / phạt tù" },
        { id: "opt_B", label: "B", text: "Được toà tha bổng vô điều kiện" },
        { id: "opt_C", label: "C", text: "Bị bắt giữ chờ xét xử" },
        { id: "opt_D", label: "D", text: "Viết bản tường trình nộp toà án" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'to be sentenced to [time] in jail/prison' là cụm pháp lý chỉ việc bị tuyên án phạt tù bao lâu."
    },
    {
      id: "doer_w8d2_q10",
      roundIndex: 9,
      prompt: "Cụm 'human trafficker' trong bài đọc có nghĩa là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Kẻ buôn người / môi giới đưa người di cư bất hợp pháp" },
        { id: "opt_B", label: "B", text: "Người điều phối giao thông đường bộ" },
        { id: "opt_C", label: "C", text: "Cán bộ quản lý xuất nhập cảnh" },
        { id: "opt_D", label: "D", text: "Tài xế lái xe tải đường dài" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'Human trafficker' là tội phạm buôn người, buôn bán nạn nhân vượt biên."
    }
  ],

  "WEEK 8 – DAY 3": [
    {
      id: "doer_w8d3_q01",
      roundIndex: 0,
      prompt: "Phát biểu nào sau đây là ĐÚNG về Trọng âm câu (Sentence Stress) trong tiếng Anh giao tiếp?",
      options: [
        { id: "opt_A", label: "A", text: "Sentence stress không cố định mà linh hoạt phụ thuộc vào từ mang thông tin (content words) mà người nói muốn nhấn mạnh" },
        { id: "opt_B", label: "B", text: "Mọi từ trong câu đều phải được nói với cao độ và độ lớn hoàn toàn ngang bằng nhau" },
        { id: "opt_C", label: "C", text: "Chỉ có từ đầu tiên và từ cuối cùng của câu mới được nhấn trọng âm" },
        { id: "opt_D", label: "D", text: "Các mạo từ và giới từ luôn luôn là từ được nhấn mạnh nhất" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Sentence stress linh hoạt: Người nói nhấn mạnh vào Content Words (nouns, main verbs, adjectives) hoặc từ họ muốn làm nổi bật ý định thông báo."
    },
    {
      id: "doer_w8d3_q02",
      roundIndex: 1,
      prompt: "Khi nói 'I gave her a BOX of chocolates for her birthday' (nhấn mạnh vào từ BOX), người nói muốn truyền tải ý gì?",
      options: [
        { id: "opt_A", label: "A", text: "Nhấn mạnh vào số lượng/hình thức gói quà là cả một cái HỘP to chứ không phải chỉ một thanh kẹo nhỏ" },
        { id: "opt_B", label: "B", text: "Nhấn mạnh món quà là sô-cô-la chứ không phải món khác" },
        { id: "opt_C", label: "C", text: "Nhấn mạnh tặng vào dịp sinh nhật chứ không phải ngày lễ khác" },
        { id: "opt_D", label: "D", text: "Nhấn mạnh chính tôi là người tặng chứ không phải người khác" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Nhấn mạnh từ 'BOX' để làm nổi bật quy cách đóng gói (cả 1 hộp lớn)."
    },
    {
      id: "doer_w8d3_q03",
      roundIndex: 2,
      prompt: "Khi nói 'I gave her a box of chocolates for her BIRTHDAY', ý định người nói nhấn mạnh điều gì?",
      options: [
        { id: "opt_A", label: "A", text: "Nhấn mạnh vào dịp tặng là ngày sinh nhật của cô ấy" },
        { id: "opt_B", label: "B", text: "Nhấn mạnh loại kẹo được tặng" },
        { id: "opt_C", label: "C", text: "Nhấn mạnh người nhận quà là cô ấy chứ không phải ai khác" },
        { id: "opt_D", label: "D", text: "Nhấn mạnh hộp quà có kích thước lớn" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Nhấn mạnh 'BIRTHDAY' để khẳng định đây là món quà nhân dịp sinh nhật."
    },
    {
      id: "doer_w8d3_q04",
      roundIndex: 3,
      prompt: "Dịch sang tiếng Anh dùng từ 'originates': 'Món Bún Bò có nguồn gốc từ Huế, một thành phố ở miền Trung Việt Nam.'",
      options: [
        { id: "opt_A", label: "A", text: "Bun Bo originates from Hue, a city in the central part of Vietnam." },
        { id: "opt_B", label: "B", text: "Bun Bo is originated by Hue city where in central Vietnam." },
        { id: "opt_C", label: "C", text: "Bun Bo originates at Hue city located at central part." },
        { id: "opt_D", label: "D", text: "Bun Bo originate to Hue city, central Vietnam." }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Động từ 'originate from [place]' = có nguồn gốc xuất xứ từ đâu."
    },
    {
      id: "doer_w8d3_q05",
      roundIndex: 4,
      prompt: "Collocation nào trong bài miêu tả món ăn để chỉ 'nước dùng đậm đà hương vị'?",
      options: [
        { id: "opt_A", label: "A", text: "A rich / flavorful broth" },
        { id: "opt_B", label: "B", text: "A sweet sauce water" },
        { id: "opt_C", label: "C", text: "A tasteless soup liquid" },
        { id: "opt_D", label: "D", text: "A salty mineral drink" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'broth' là nước hầm thịt/xương, nước dùng. 'rich broth' hoặc 'flavorful broth' là nước dùng đậm đà."
    },
    {
      id: "doer_w8d3_q06",
      roundIndex: 5,
      prompt: "Dịch sang tiếng Anh: 'Món ăn này có giá cả rất phải chăng đối với mọi người.'",
      options: [
        { id: "opt_A", label: "A", text: "This dish is very affordable for everyone." },
        { id: "opt_B", label: "B", text: "This dish is too priceless for people." },
        { id: "opt_C", label: "C", text: "This dish costs cheap money with everybody." },
        { id: "opt_D", label: "D", text: "This dish is exorbitant to anyone." }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'affordable' là tính từ học thuật chỉ giá cả vừa phải, hợp túi tiền."
    },
    {
      id: "doer_w8d3_q07",
      roundIndex: 6,
      prompt: "Trong câu: 'Nhà hàng này phục vụ món ăn rất ngon nên tôi là khách quen ở đây.' Cụm từ 'khách quen' tiếng Anh là gì?",
      options: [
        { id: "opt_A", label: "A", text: "A regular / a regular customer" },
        { id: "opt_B", label: "B", text: "A first-time visitor" },
        { id: "opt_C", label: "C", text: "A passenger" },
        { id: "opt_D", label: "D", text: "A casual pedestrian" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Trong văn nói, 'a regular' (hoặc regular customer) là khách hàng quen thuộc thường xuyên lui tới quán."
    },
    {
      id: "doer_w8d3_q08",
      roundIndex: 7,
      prompt: "Collocation 'thinly sliced beef' trong bài miêu tả món Bún Bò có nghĩa là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Thịt bò thái lát mỏng" },
        { id: "opt_B", label: "B", text: "Thịt bò xay nhuyễn" },
        { id: "opt_C", label: "C", text: "Thịt bò nướng nguyên tảng" },
        { id: "opt_D", label: "D", text: "Xương bò hầm nhừ" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'thinly sliced beef' = thịt bò được thái mỏng (trạng từ thinly bổ nghĩa cho tính từ sliced)."
    },
    {
      id: "doer_w8d3_q09",
      roundIndex: 8,
      prompt: "Cấu trúc chọn lựa: 'Nếu phải chọn một món ăn yêu thích, tôi sẽ chọn Bún Bò.' Trong tiếng Anh nói thế nào?",
      options: [
        { id: "opt_A", label: "A", text: "If I had to choose one, I would go for Bun Bo." },
        { id: "opt_B", label: "B", text: "If I have to choose one, I go to Bun Bo." },
        { id: "opt_C", label: "C", text: "Supposing I choose one, I will pick up Bun Bo." },
        { id: "opt_D", label: "D", text: "When I had choose one, I must take Bun Bo." }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Câu điều kiện loại 2 giả định lịch sự trong Speaking: 'If I had to choose one, I would go for [dish]...' (go for = chọn/thích)."
    },
    {
      id: "doer_w8d3_q10",
      roundIndex: 9,
      prompt: "Trong câu 'I'd rather drink coffee than boba tea', cấu trúc 'would rather... than...' diễn tả điều gì?",
      options: [
        { id: "opt_A", label: "A", text: "Diễn tả sở thích muốn làm việc này hơn là làm việc kia (prefer)" },
        { id: "opt_B", label: "B", text: "Diễn tả sự bắt buộc phải uống cả hai" },
        { id: "opt_C", label: "C", text: "Diễn tả một điều hối tiếc trong quá khứ" },
        { id: "opt_D", label: "D", text: "Diễn tả việc từ chối không uống bất kỳ thứ gì" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'would rather do sth than do sth else' mang nghĩa thích làm việc A hơn là làm việc B."
    }
  ]
};
