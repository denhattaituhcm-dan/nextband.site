/**
 * Question Bank for Week 3 (Day 1, Day 2, Day 3)
 * DOER Coursebook 2027
 */

export const WEEK_3_QUESTIONS: Record<string, any[]> = {
  "WEEK 3 – DAY 1": [
    {
      id: "doer_w3d1_q01",
      roundIndex: 0,
      prompt: "Chọn thì đúng để diễn tả quy luật tự nhiên, sự thật hiển nhiên: \"Water ______ at zero degrees Celsius (0°C).\"",
      options: [
        { id: "opt_A", label: "A", text: "freezes" },
        { id: "opt_B", label: "B", text: "is freezing" },
        { id: "opt_C", label: "C", text: "froze" },
        { id: "opt_D", label: "D", text: "will freeze" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. freezes",
      correctExplanation: "Chân lý khoa học / sự thật luôn luôn đúng trong tự nhiên bắt buộc phải chia ở thì Hiện tại đơn (Simple Present). Chủ ngữ không đếm được \"Water\" chia động từ thêm -s/-es.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. is freezing",
        diagnosticTitle: "Dùng Hiện tại tiếp diễn cho quy luật vĩnh cửu",
        explanation: "Hiện tại tiếp diễn chỉ hành động đang diễn ra tạm thời, không dùng để nêu định luật vật lý."
      }
    },
    {
      id: "doer_w3d1_q02",
      roundIndex: 1,
      prompt: "Chọn thì đúng trong câu đối chiếu quá khứ và hiện tại: \"Before going to university, many students ______ not aware of the importance of learning English.\"",
      options: [
        { id: "opt_A", label: "A", text: "were" },
        { id: "opt_B", label: "B", text: "are" },
        { id: "opt_C", label: "C", text: "have been" },
        { id: "opt_D", label: "D", text: "will be" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. were",
      correctExplanation: "Ngữ cảnh xảy ra trước một mốc thời gian trong quá khứ (trước khi vào đại học, lúc còn là học sinh cấp 3), nên trạng thái nhận thức lúc đó chia ở Quá khứ đơn (were not aware).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. are",
        diagnosticTitle: "Nhầm lẫn nhận thức quá khứ với thực tại",
        explanation: "Trạng ngữ chỉ thời gian quá khứ \"Before going to university\" quy định mệnh đề này phải chia thì quá khứ đơn."
      }
    },
    {
      id: "doer_w3d1_q03",
      roundIndex: 2,
      prompt: "Chọn dạng thì thích hợp: \"Although the authorities severely ______ people who litter the streets, the city center is still dirty.\"",
      options: [
        { id: "opt_A", label: "A", text: "fine" },
        { id: "opt_B", label: "B", text: "fined" },
        { id: "opt_C", label: "C", text: "had fined" },
        { id: "opt_D", label: "D", text: "were fining" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. fine",
      correctExplanation: "Mệnh đề chính dùng \"is still dirty\" ở hiện tại, việc chính quyền phạt hành chính là chính sách liên tục đang được thực thi ở hiện tại nên dùng thì Hiện tại đơn (fine).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. fined",
        diagnosticTitle: "Lệch thì giữa hai mệnh đề tương phản",
        explanation: "Dùng fined (quá khứ) sẽ ngụ ý hiện nay không còn phạt nữa, mâu thuẫn với ý nghĩa liên tục kết nối với \"is still dirty\"."
      }
    },
    {
      id: "doer_w3d1_q04",
      roundIndex: 3,
      prompt: "Xác định câu dùng đúng thì Hiện tại tiếp diễn chỉ một sự việc đang tiến triển quanh thời điểm nói:",
      options: [
        { id: "opt_A", label: "A", text: "She is looking for a new job these days." },
        { id: "opt_B", label: "B", text: "She looks for a new job these days." },
        { id: "opt_C", label: "C", text: "She was looking for a new job these days." },
        { id: "opt_D", label: "D", text: "She has looked for a new job these days." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. She is looking for a new job these days.",
      correctExplanation: "\"These days\" là dấu hiệu của một quá trình tạm thời đang diễn ra quanh hiện tại, thì Hiện tại tiếp diễn (is looking) là chuẩn xác nhất.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. She looks for a new job these days.",
        diagnosticTitle: "Dùng Hiện tại đơn cho tình huống mang tính tạm thời",
        explanation: "Hiện tại đơn diễn tả sự thật lâu dài/thói quen cố định; việc tìm việc là tạm thời trong giai đoạn hiện nay."
      }
    },
    {
      id: "doer_w3d1_q05",
      roundIndex: 4,
      prompt: "Chọn câu viết chuẩn ngữ pháp với cụm từ \"beneficial to\":",
      options: [
        { id: "opt_A", label: "A", text: "Reading books is beneficial to children's cognitive development." },
        { id: "opt_B", label: "B", text: "Reading books is beneficial for to develop children's brain." },
        { id: "opt_C", label: "C", text: "Read books is beneficial with children's development." },
        { id: "opt_D", label: "D", text: "Reading books beneficial to children's development." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Reading books is beneficial to children's cognitive development.",
      correctExplanation: "Tính từ \"beneficial\" đi với giới từ \"to\" (có lợi cho ai/cái gì). Chủ ngữ Gerund \"Reading books\" đòi hỏi to be \"is\".",
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. Reading books beneficial...",
        diagnosticTitle: "Bỏ quên động từ to be liên kết tính từ",
        explanation: "Tính từ beneficial không thể tự làm vị ngữ nếu thiếu động từ to be \"is\"."
      }
    },
    {
      id: "doer_w3d1_q06",
      roundIndex: 5,
      prompt: "Xét câu: \"They travelled to Italy every summer and always stayed in small villages on the coast.\" Câu này diễn tả:",
      options: [
        { id: "opt_A", label: "A", text: "Một thói quen lặp đi lặp lại trong quá khứ nay không còn nữa" },
        { id: "opt_B", label: "B", text: "Một kế hoạch chắc chắn sẽ xảy ra vào mùa hè tới" },
        { id: "opt_C", label: "C", text: "Một hành động đang diễn ra tại thời điểm nói" },
        { id: "opt_D", label: "D", text: "Một sự thật luôn luôn đúng trong hiện tại" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Một thói quen lặp đi lặp lại trong quá khứ nay không còn nữa",
      correctExplanation: "Động từ chia ở Quá khứ đơn (travelled, stayed) kết hợp với trạng từ tần suất (every summer, always) diễn tả thói quen trong quá khứ.",
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. Một sự thật luôn luôn đúng trong hiện tại",
        diagnosticTitle: "Nhầm trạng từ \"always\" và \"every\" chỉ có trong hiện tại đơn",
        explanation: "Trạng từ tần suất như always/every hoàn toàn có thể kết hợp với Quá khứ đơn để chỉ thói quen cũ."
      }
    },
    {
      id: "doer_w3d1_q07",
      roundIndex: 6,
      prompt: "Chọn câu viết đúng: \"Trước khi bị bệnh nặng lần đầu tiên, đa số mọi người coi trọng tiền bạc hơn sức khỏe.\"",
      options: [
        { id: "opt_A", label: "A", text: "Before suffering from a serious illness, most people valued wealth over health." },
        { id: "opt_B", label: "B", text: "Before suffer from a serious illness, most people value wealth over health." },
        { id: "opt_C", label: "C", text: "Before suffering a serious illness, most people are valuing wealth than health." },
        { id: "opt_D", label: "D", text: "Before suffered from a serious illness, most people have valued wealth to health." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Before suffering from a serious illness, most people valued wealth over health.",
      correctExplanation: "Sau giới từ before là V-ing (suffering from). Mệnh đề chính chia quá khứ đơn (valued) và cấu trúc so sánh \"value X over Y\" (coi trọng X hơn Y).",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. are valuing wealth than health",
        diagnosticTitle: "Dùng than với động từ value",
        explanation: "Cấu trúc chuẩn là \"value something OVER something else\", không dùng \"than\"."
      }
    },
    {
      id: "doer_w3d1_q08",
      roundIndex: 7,
      prompt: "Chọn động từ đúng trong ngữ cảnh lịch trình cố định: \"The train ______ every morning at 8 AM.\"",
      options: [
        { id: "opt_A", label: "A", text: "leaves" },
        { id: "opt_B", label: "B", text: "is leaving" },
        { id: "opt_C", label: "C", text: "left" },
        { id: "opt_D", label: "D", text: "shall leave" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. leaves",
      correctExplanation: "Lịch trình tàu xe, máy bay, thời khóa biểu cố định luôn dùng thì Hiện tại đơn mang nghĩa lịch trình công cộng.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. is leaving",
        diagnosticTitle: "Dùng thì tiếp diễn cho lịch trình công cộng cố định",
        explanation: "Hiện tại tiếp diễn dùng cho kế hoạch cá nhân đã sắp xếp, với tàu xe công cộng theo giờ chuẩn phải dùng Hiện tại đơn."
      }
    },
    {
      id: "doer_w3d1_q09",
      roundIndex: 8,
      prompt: "Chọn dạng thức đúng của động từ to be: \"Please be quiet. The children ______ in the bedroom.\"",
      options: [
        { id: "opt_A", label: "A", text: "are sleeping" },
        { id: "opt_B", label: "B", text: "sleep" },
        { id: "opt_C", label: "C", text: "were sleeping" },
        { id: "opt_D", label: "D", text: "have slept" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. are sleeping",
      correctExplanation: "Mệnh lệnh thức gây chú ý \"Please be quiet!\" báo hiệu một hành động đang thực sự diễn ra ngay tại thời điểm nói.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. sleep",
        diagnosticTitle: "Dùng Hiện tại đơn thay cho hành động đang xảy ra trước mắt",
        explanation: "Nếu dùng \"sleep\" thì chỉ nói về thói quen nói chung, không giải thích lý do phải giữ im lặng ngay lúc này."
      }
    },
    {
      id: "doer_w3d1_q10",
      roundIndex: 9,
      prompt: "Nhận diện lỗi sai về thì: \"Yesterday, I put my wallet on the bed, but this morning I forgot taking it with me.\"",
      options: [
        { id: "opt_A", label: "A", text: "forgot taking -> forgot to take" },
        { id: "opt_B", label: "B", text: "put -> puts" },
        { id: "opt_C", label: "C", text: "this morning -> at this morning" },
        { id: "opt_D", label: "D", text: "on the bed -> at the bed" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. forgot taking -> forgot to take",
      correctExplanation: "Forget to do sth = quên phải làm một việc gì đó (chưa làm). Forget doing sth = quên một việc đã từng làm trong quá khứ.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. put -> puts",
        diagnosticTitle: "Tưởng nhầm động từ put chưa chia thì",
        explanation: "Động từ bất quy tắc \"put\" có cả 3 cột giống nhau (put - put - put), trong câu quá khứ yesterday dùng \"put\" là hoàn toàn đúng."
      }
    }
  ],
  "WEEK 3 – DAY 2": [
    {
      id: "doer_w3d2_q01",
      roundIndex: 0,
      prompt: "Trong cụm từ \"one of those standout destinations\" (bài đọc Hội An), từ \"standout\" (adj) ĐỒNG NGHĨA nhất với từ nào?",
      options: [
        { id: "opt_A", label: "A", text: "remarkable / extraordinary (nổi bật, xuất chúng)" },
        { id: "opt_B", label: "B", text: "ordinary / average (bình thường, phổ thông)" },
        { id: "opt_C", label: "C", text: "overcrowded (quá đông đúc)" },
        { id: "opt_D", label: "D", text: "isolated (xa xôi, cô lập)" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. remarkable / extraordinary (nổi bật, xuất chúng)",
      correctExplanation: "\"Standout\" (adj) mô tả một người/vật/địa điểm vượt trội, đặc biệt xuất sắc và đáng nhớ hơn tất cả những thứ xung quanh.",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. overcrowded",
        diagnosticTitle: "Nhầm lẫn giữa nổi tiếng thu hút khách với đông đúc chật chội",
        explanation: "Standout chỉ chất lượng nổi bật vượt trội của địa danh, không mang nghĩa tiêu cực là quá tải hay chật chội."
      }
    },
    {
      id: "doer_w3d2_q02",
      roundIndex: 1,
      prompt: "Từ TRÁI NGHĨA với \"bland\" trong câu: \"I always thought pho was such a bland dish without very much flavour\" là:",
      options: [
        { id: "opt_A", label: "A", text: "flavorful / tasty (đậm đà, giàu hương vị)" },
        { id: "opt_B", label: "B", text: "tasteless (nhạt nhẽo, vô vị)" },
        { id: "opt_C", label: "C", text: "plain (đơn điệu, không nêm nếm)" },
        { id: "opt_D", label: "D", text: "mild (dịu nhẹ, không cay)" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. flavorful / tasty (đậm đà, giàu hương vị)",
      correctExplanation: "\"Bland\" = nhạt nhẽo, thiếu gia vị. Do đó từ trái nghĩa chính xác nhất là \"flavorful\" (đầy đặn hương vị).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. tasteless",
        diagnosticTitle: "Chọn nhầm từ đồng nghĩa thay vì từ trái nghĩa",
        explanation: "Tasteless là từ đồng nghĩa với bland. Đề bài đang yêu cầu tìm từ TRÁI NGHĨA."
      }
    },
    {
      id: "doer_w3d2_q03",
      roundIndex: 2,
      prompt: "Trong cụm \"a sobering look at the lasting effects of the Vietnam War\", từ \"sobering\" mang sắc thái nghĩa gì?",
      options: [
        { id: "opt_A", label: "A", text: "serious and thought-provoking (lắng đọng, khiến người ta phải suy ngẫm sâu sắc)" },
        { id: "opt_B", label: "B", text: "entertaining and humorous (mang tính giải trí, hài hước)" },
        { id: "opt_C", label: "C", text: "boring and dull (nhàm chán, tẻ nhạt)" },
        { id: "opt_D", label: "D", text: "terrifying and chaotic (kinh hoàng, hỗn loạn)" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. serious and thought-provoking (lắng đọng, khiến người ta phải suy ngẫm sâu sắc)",
      correctExplanation: "\"Sobering\" (adj) mô tả trải nghiệm trang nghiêm khiến người xem bừng tỉnh, trở nên nghiêm túc và suy ngẫm sâu xa về thực tế.",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. boring and dull",
        diagnosticTitle: "Đánh đồng cảm giác trầm lắng với sự nhàm chán",
        explanation: "Sobering là một trải nghiệm gây ấn tượng tinh thần mạnh mẽ và sâu sắc, hoàn toàn không phải tẻ nhạt."
      }
    },
    {
      id: "doer_w3d2_q04",
      roundIndex: 3,
      prompt: "Collocation nào trong bài đọc diễn tả \"lịch trình chi tiết các địa điểm và hoạt động của một chuyến đi\"?",
      options: [
        { id: "opt_A", label: "A", text: "Travel itinerary" },
        { id: "opt_B", label: "B", text: "Travel receipt" },
        { id: "opt_C", label: "C", text: "Travel certificate" },
        { id: "opt_D", label: "D", text: "Travel coupon" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Travel itinerary",
      correctExplanation: "\"Travel itinerary\" là thuật ngữ chuẩn xác chỉ bản lịch trình chi tiết các chặng dừng chân trong một chuyến du lịch.",
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. Travel coupon",
        diagnosticTitle: "Nhầm lẫn với vé giảm giá / phiếu tham quan",
        explanation: "Coupon là phiếu dịch vụ/giảm giá, không mang nghĩa lịch trình di chuyển."
      }
    },
    {
      id: "doer_w3d2_q05",
      roundIndex: 4,
      prompt: "Từ \"topography\" trong câu \"Halong Bay is home to some of the most fascinating topography in the world\" mang nghĩa là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Địa hình và đặc điểm địa mạo tự nhiên của một vùng đất/vịnh" },
        { id: "opt_B", label: "B", text: "Khí hậu và lượng mưa hàng năm" },
        { id: "opt_C", label: "C", text: "Hệ thống truyền thuyết và phong tục bản địa" },
        { id: "opt_D", label: "D", text: "Mạng lưới đường bộ và phương tiện công cộng" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Địa hình và đặc điểm địa mạo tự nhiên của một vùng đất/vịnh",
      correctExplanation: "\"Topography\" (danh từ học thuật) chỉ đặc tính địa hình, hình thái các khối núi đá, đảo nổi và bề mặt địa thế tự nhiên.",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Hệ thống truyền thuyết và phong tục",
        diagnosticTitle: "Nhầm topography với folklore / mythology",
        explanation: "Topography thuần túy là thuật ngữ địa lý học miêu tả hình thể đất đai cảnh quan."
      }
    },
    {
      id: "doer_w3d2_q06",
      roundIndex: 5,
      prompt: "Chọn từ điền vào collocation chuẩn: \"This pace allowed me to ______ experience Vietnam as a whole.\" (trải nghiệm một cách thấu đáo, trọn vẹn)",
      options: [
        { id: "opt_A", label: "A", text: "thoroughly" },
        { id: "opt_B", label: "B", text: "shallowly" },
        { id: "opt_C", label: "C", text: "partially" },
        { id: "opt_D", label: "D", text: "roughly" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. thoroughly",
      correctExplanation: "\"Thoroughly experience something\" là collocation cao cấp trong IELTS: trải nghiệm một cách tường tận, cặn kẽ và trọn vẹn từ đầu đến cuối.",
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. roughly",
        diagnosticTitle: "Nhầm roughly (sơ sài/ước chừng) với trải nghiệm sâu sắc",
        explanation: "Roughly mang nghĩa áng chừng hoặc thô kệch, trái ngược hoàn toàn với ý nghĩa tường tận của thoroughly."
      }
    },
    {
      id: "doer_w3d2_q07",
      roundIndex: 6,
      prompt: "Thành ngữ: \"I cannot recommend this experience enough!\" tương đương với câu nào dưới đây?",
      options: [
        { id: "opt_A", label: "A", text: "I strongly / wholeheartedly encourage everyone to try this experience." },
        { id: "opt_B", label: "B", text: "I do not think this experience is suitable for most tourists." },
        { id: "opt_C", label: "C", text: "I have run out of time to describe the trip properly." },
        { id: "opt_D", label: "D", text: "I refuse to provide any further recommendation about this tour." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. I strongly / wholeheartedly encourage everyone to try this experience.",
      correctExplanation: "\"Cannot recommend sth enough\" là cấu trúc khen ngợi tuyệt đối: khen bao nhiêu cũng chưa đủ, nhiệt liệt khuyến khích nên thử.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. I do not think this experience is suitable",
        diagnosticTitle: "Bẫy dịch nghĩa đen từ phủ định \"cannot\"",
        explanation: "Học sinh thấy chữ \"cannot\" tưởng là lời chê hoặc không giới thiệu, trong khi đây là thành ngữ bày tỏ sự thán phục cao nhất."
      }
    },
    {
      id: "doer_w3d2_q08",
      roundIndex: 7,
      prompt: "Chọn giới từ chính xác đi với động từ \"grant\" trong ngữ cảnh vé tham quan phố cổ: \"The ticket grants you admission ______ a number of temples.\"",
      options: [
        { id: "opt_A", label: "A", text: "to" },
        { id: "opt_B", label: "B", text: "for" },
        { id: "opt_C", label: "C", text: "with" },
        { id: "opt_D", label: "D", text: "at" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. to",
      correctExplanation: "Cấu trúc chuẩn xác: \"admission to a place/event\" (quyền được vào cửa, cấp phép vào một địa điểm nào đó).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. for",
        diagnosticTitle: "Dịch từ \"cho\" trong tiếng Việt thành giới từ \"for\"",
        explanation: "Tiếng Việt nói \"vé vào cửa cho các ngôi đền\", nhưng tiếng Anh bắt buộc dùng \"admission TO [place]\"."
      }
    },
    {
      id: "doer_w3d2_q09",
      roundIndex: 8,
      prompt: "VẬN DỤNG NGỮ CẢNH MỚI: Chọn từ thích hợp để hoàn thành câu học thuật: \"The museum’s exhibition on modern art was so ______ that it attracted international praise.\"",
      options: [
        { id: "opt_A", label: "A", text: "standout" },
        { id: "opt_B", label: "B", text: "bland" },
        { id: "opt_C", label: "C", text: "sober" },
        { id: "opt_D", label: "D", text: "rough" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. standout",
      correctExplanation: "\"A standout exhibition\" = một buổi triển lãm nổi bật, xuất sắc vượt trội thu hút sự ca ngợi quốc tế. \"Bland\" (nhạt nhẽo) mâu thuẫn với vế sau.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. bland",
        diagnosticTitle: "Không liên kết với kết quả tích cực \"attracted praise\"",
        explanation: "Nếu triển lãm \"bland\" (nhạt nhẽo) thì không thể nhận được sự tán dương rộng rãi của quốc tế."
      }
    },
    {
      id: "doer_w3d2_q10",
      roundIndex: 9,
      prompt: "PARAPHRASE: Câu \"I didn't feel very inspired to go out and explore due to the mad traffic and constant honking\" được diễn đạt lại chuẩn xác nhất là:",
      options: [
        { id: "opt_A", label: "A", text: "The relentless noise and chaotic traffic discouraged me from exploring the city." },
        { id: "opt_B", label: "B", text: "I thoroughly enjoyed sightseeing because the traffic was full of vibrant energy." },
        { id: "opt_C", label: "C", text: "The author was forbidden from going outdoors by local traffic regulations." },
        { id: "opt_D", label: "D", text: "The quiet streets made the author feel isolated and bored." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. The relentless noise and chaotic traffic discouraged me from exploring the city.",
      correctExplanation: "\"Relentless noise\" paraphrase cho \"constant honking\", \"chaotic traffic\" paraphrase cho \"mad traffic\", và \"discouraged me\" paraphrase cho \"didn't feel very inspired\".",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. The author was forbidden",
        diagnosticTitle: "Nhầm lẫn giữa mất cảm hứng cá nhân với bị pháp luật cấm đoán",
        explanation: "Tác giả chỉ không có hứng thú đi dạo (uninspired), không hề bị ai ngăn cấm (forbidden)."
      }
    }
  ],

  "WEEK 3 – DAY 3": [
    {
      id: "doer_w3d3_q01",
      roundIndex: 0,
      prompt: "Nhóm phụ âm chặn (Stop sounds / Plosives) nào sau đây được tạo ra bằng cách chặn luồng hơi bằng HAI ĐÔI MÔI?",
      options: [
        { id: "opt_A", label: "A", text: "/p/ và /b/" },
        { id: "opt_B", label: "B", text: "/t/ và /d/" },
        { id: "opt_C", label: "C", text: "/k/ và /g/" },
        { id: "opt_D", label: "D", text: "/f/ và /v/" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. /p/ và /b/",
      correctExplanation: "Âm môi-môi (bilabial stop): Hai môi khép chặt chặn luồng hơi lại rồi bật ra để phát âm /p/ (vô thanh) và /b/ (hữu thanh).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. /t/ và /d/",
        diagnosticTitle: "Nhầm vị trí phát âm đầu lưỡi với môi",
        explanation: "/t/ và /d/ được tạo ra bằng đầu lưỡi chạm vào phần lợi hàm trên, không dùng hai môi khép."
      }
    },
    {
      id: "doer_w3d3_q02",
      roundIndex: 1,
      prompt: "Để phát âm chuẩn cặp phụ âm xát /f/ và /v/, khẩu hình chuẩn xác là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Răng cửa hàm trên cắn nhẹ vào môi dưới, đẩy luồng hơi tạo ma sát qua kẽ răng" },
        { id: "opt_B", label: "B", text: "Mím chặt hai môi lại và thổi hơi thật mạnh" },
        { id: "opt_C", label: "C", text: "Đặt đầu lưỡi vào giữa hai hàm răng" },
        { id: "opt_D", label: "D", text: "Tròn môi lại và đưa lưỡi thụt về phía sau cổ họng" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Răng cửa hàm trên cắn nhẹ vào môi dưới, đẩy luồng hơi tạo ma sát qua kẽ răng",
      correctExplanation: "Đây là âm răng - môi (labiodental fricative): răng trên chạm nhẹ môi dưới, đẩy luồng hơi liên tục qua khe hở.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Mím chặt hai môi",
        diagnosticTitle: "Nhầm sang cách phát âm âm môi-môi /p, b/",
        explanation: "Nếu mím hai môi thì sẽ tạo ra âm /p/ hoặc /b/, không thể tạo ra luồng hơi ma sát của /f, v/."
      }
    },
    {
      id: "doer_w3d3_q03",
      roundIndex: 2,
      prompt: "Chọn cấu trúc đúng diễn đạt lợi ích của công nghệ: \"______ Shopee, I can buy things online conveniently.\"",
      options: [
        { id: "opt_A", label: "A", text: "Thanks to" },
        { id: "opt_B", label: "B", text: "Thank to" },
        { id: "opt_C", label: "C", text: "Thanks for" },
        { id: "opt_D", label: "D", text: "Thanking to" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Thanks to",
      correctExplanation: "Cụm cố định mang nghĩa \"nhờ có cái gì\": Thanks to + Noun/Pronoun. Phải có đuôi \"s\" ở Thanks.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Thank to",
        diagnosticTitle: "Rơi rụng đuôi -s trong cụm \"Thanks to\"",
        explanation: "Thói quen viết Thank to (thiếu s) là lỗi sơ đẳng thường thấy trong IELTS Writing."
      }
    },
    {
      id: "doer_w3d3_q04",
      roundIndex: 3,
      prompt: "Chọn câu viết đúng cấu trúc với động từ \"enable\":",
      options: [
        { id: "opt_A", label: "A", text: "The app enables me to practice pronunciation every day." },
        { id: "opt_B", label: "B", text: "The app enables me practice pronunciation every day." },
        { id: "opt_C", label: "C", text: "The app enables that I practice pronunciation every day." },
        { id: "opt_D", label: "D", text: "The app enable me to practicing pronunciation every day." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. The app enables me to practice pronunciation every day.",
      correctExplanation: "Cấu trúc: enable somebody TO DO something (cho phép/tạo điều kiện cho ai làm gì).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. enables me practice",
        diagnosticTitle: "Bỏ quên \"to\" sau enable",
        explanation: "Khác với động từ let/make, động từ enable bắt buộc phải đi kèm với to-V."
      }
    },
    {
      id: "doer_w3d3_q05",
      roundIndex: 4,
      prompt: "Trong cuộc đối thoại về ứng dụng học tiếng Anh, khi hỏi về mức phí có xứng đáng không, Lan dùng câu nào?",
      options: [
        { id: "opt_A", label: "A", text: "Is it worth the fee?" },
        { id: "opt_B", label: "B", text: "Is it worthy the price?" },
        { id: "opt_C", label: "C", text: "Does it worth money?" },
        { id: "opt_D", label: "D", text: "Is it cost-worthy?" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Is it worth the fee?",
      correctExplanation: "Cấu trúc to be worth something: \"Is it worth the fee?\" (Nó có đáng đồng tiền bát gạo / khoản phí bỏ ra không?).",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Does it worth money?",
        diagnosticTitle: "Dùng trợ động từ does với tính từ worth",
        explanation: "\"Worth\" trong trường hợp này đóng vai trò tính từ/giới từ đòi hỏi to be, không dùng trợ động từ Does."
      }
    },
    {
      id: "doer_w3d3_q06",
      roundIndex: 5,
      prompt: "Chọn giới từ đúng đi với collocation \"access\": \"It gives you access ______ more lessons on the platform.\"",
      options: [
        { id: "opt_A", label: "A", text: "to" },
        { id: "opt_B", label: "B", text: "with" },
        { id: "opt_C", label: "C", text: "for" },
        { id: "opt_D", label: "D", text: "into" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. to",
      correctExplanation: "Danh từ access luôn đi với giới từ TO: have / give access TO something (quyền truy cập vào cái gì).",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. for",
        diagnosticTitle: "Dịch \"truy cập cho nhiều bài học\"",
        explanation: "Giới từ học thuật bất di bất dịch của danh từ access là \"to\"."
      }
    },
    {
      id: "doer_w3d3_q07",
      roundIndex: 6,
      prompt: "Theo bài nói \"The misuse of smartphone\", tác hại của ánh sáng xanh (blue light) từ màn hình là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Làm tổn thương mắt và khiến người dùng khó đi vào giấc ngủ" },
        { id: "opt_B", label: "B", text: "Làm hao pin điện thoại nhanh chóng" },
        { id: "opt_C", label: "C", text: "Làm mất kết nối mạng internet" },
        { id: "opt_D", label: "D", text: "Khiến người dùng bị tăng cân" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Làm tổn thương mắt và khiến người dùng khó đi vào giấc ngủ",
      correctExplanation: "Bài đọc nêu: \"hurt your eyes... the blue light from the screens can make it hard to sleep\".",
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. Khiến người dùng bị tăng cân",
        diagnosticTitle: "Nhầm lẫn tác hại của việc lười vận động với ánh sáng màn hình",
        explanation: "Ánh sáng xanh tác động trực tiếp đến võng mạc và hormone giấc ngủ melatonin, gây khó ngủ."
      }
    },
    {
      id: "doer_w3d3_q08",
      roundIndex: 7,
      prompt: "Chọn câu viết đúng cấu trúc: \"Việc lướt mạng xã hội quá nhiều khiến tôi khó tập trung vào công việc.\"",
      options: [
        { id: "opt_A", label: "A", text: "This makes it hard for me to focus on working." },
        { id: "opt_B", label: "B", text: "This makes me hard to focus in working." },
        { id: "opt_C", label: "C", text: "This makes hard for me focusing on work." },
        { id: "opt_D", label: "D", text: "This causes hard for me to focus work." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. This makes it hard for me to focus on working.",
      correctExplanation: "Cấu trúc tân ngữ giả: make it + Adj + (for sb) + TO DO something. Đi với focus ON something.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. makes me hard to focus",
        diagnosticTitle: "Bỏ quên tân ngữ giả \"it\"",
        explanation: "\"Make me hard\" là sai hoàn toàn về nghĩa và ngữ pháp; bắt buộc phải dùng tân ngữ giả: make IT hard for me."
      }
    },
    {
      id: "doer_w3d3_q09",
      roundIndex: 8,
      prompt: "Trong đoạn hội thoại mua laptop, khi nhận được học bổng 15 triệu, Sarah nói: \"I have made up my mind. I ______ for a Mac.\"",
      options: [
        { id: "opt_A", label: "A", text: "go" },
        { id: "opt_B", label: "B", text: "take" },
        { id: "opt_C", label: "C", text: "buy" },
        { id: "opt_D", label: "D", text: "pick" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. go",
      correctExplanation: "Cụm phrasal verb tự nhiên trong chọn lựa: \"go for something\" (quyết định chọn / mua món đồ nào đó).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. take",
        diagnosticTitle: "Dùng từ take không đi kèm giới từ phù hợp",
        explanation: "Cụm từ tự nhiên mà người bản xứ hay dùng khi ra quyết định lựa chọn là \"I'll go for...\"."
      }
    },
    {
      id: "doer_w3d3_q10",
      roundIndex: 9,
      prompt: "Thành ngữ \"make up one's mind\" có nghĩa tương đương với động từ nào?",
      options: [
        { id: "opt_A", label: "A", text: "decide (đưa ra quyết định)" },
        { id: "opt_B", label: "B", text: "remember (ghi nhớ)" },
        { id: "opt_C", label: "C", text: "forget (quên)" },
        { id: "opt_D", label: "D", text: "hesitate (do dự)" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. decide (đưa ra quyết định)",
      correctExplanation: "\"Make up one's mind\" là thành ngữ phổ biến đồng nghĩa hoàn toàn với \"make a decision / decide\".",
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. hesitate",
        diagnosticTitle: "Nhầm lẫn với giai đoạn suy nghĩ do dự",
        explanation: "Make up mind là đã chốt hạ quyết định xong, chấm dứt việc do dự."
      }
    }
  ]
};
