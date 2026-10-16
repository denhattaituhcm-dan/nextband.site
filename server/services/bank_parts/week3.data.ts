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
      prompt: "Theo bài đọc \"My 1-Month Vietnam Travel Itinerary\", hành trình của tác giả bắt đầu từ đâu và kết thúc theo hướng nào?",
      options: [
        { id: "opt_A", label: "A", text: "Bắt đầu ở TP. Hồ Chí Minh rồi đi dần ra phía bắc tới Hà Nội" },
        { id: "opt_B", label: "B", text: "Bắt đầu ở Hà Nội rồi đi dần vào nam tới TP. Hồ Chí Minh" },
        { id: "opt_C", label: "C", text: "Chỉ ở lại TP. Hồ Chí Minh và vịnh Hạ Long" },
        { id: "opt_D", label: "D", text: "Bắt đầu từ Đà Nẵng và đi khắp miền Trung" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Bắt đầu ở TP. Hồ Chí Minh rồi đi dần ra phía bắc tới Hà Nội",
      correctExplanation: "Tác giả viết: \"My journey started in Ho Chi Minh City in southern Vietnam... I slowly worked my way north to Hanoi via buses and trains\".",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Bắt đầu ở Hà Nội rồi đi vào nam",
        diagnosticTitle: "Đảo lộn điểm khởi đầu hành trình",
        explanation: "Tác giả khởi hành tại TP.HCM (Saigon) ở phía Nam và di chuyển lên phía Bắc."
      }
    },
    {
      id: "doer_w3d2_q02",
      roundIndex: 1,
      prompt: "Trước khi đến Việt Nam và ăn phở chính gốc, tác giả từng có suy nghĩ gì về món phở?",
      options: [
        { id: "opt_A", label: "A", text: "Từng nghĩ phở là một món ăn nhạt nhẽo (bland dish) không có nhiều hương vị" },
        { id: "opt_B", label: "B", text: "Nghĩ phở là món ăn quá cay và nồng mùi gia vị" },
        { id: "opt_C", label: "C", text: "Nghĩ phở là món đắt đỏ nhất Việt Nam" },
        { id: "opt_D", label: "D", text: "Chưa từng nghe nói hay nhìn thấy phở bao giờ" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Từng nghĩ phở là một món ăn nhạt nhẽo (bland dish) không có nhiều hương vị",
      correctExplanation: "Đoạn văn viết rõ: \"I had tried pho before and I always thought it was such a bland dish without very much flavour, but as it turns out, I just needed to eat it in Vietnam...\".",
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. Chưa từng nghe nói hay nhìn thấy bao giờ",
        diagnosticTitle: "Bỏ sót chi tiết tác giả đã từng thử phở ở nước ngoài",
        explanation: "Tác giả nói \"I had tried pho before\" chứng tỏ đã từng ăn nhưng thấy nhạt nhẽo trước khi sang VN."
      }
    },
    {
      id: "doer_w3d2_q03",
      roundIndex: 2,
      prompt: "Trong câu miêu tả chuyến đi Bảo tàng Chứng tích Chiến tranh: \"a sobering look at the lasting effects of the Vietnam War\", từ \"sobering\" có nghĩa là:",
      options: [
        { id: "opt_A", label: "A", text: "making you feel serious and thoughtful (khiến bạn trầm ngâm, xúc động sâu sắc)" },
        { id: "opt_B", label: "B", text: "making you feel bored and sleepy (gây buồn ngủ)" },
        { id: "opt_C", label: "C", text: "extremely funny and joyful (hài hước)" },
        { id: "opt_D", label: "D", text: "expensive to visit (đắt đỏ)" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. making you feel serious and thoughtful (khiến bạn trầm ngâm, xúc động sâu sắc)",
      correctExplanation: "\"Sobering\" mang nghĩa làm ai đó trầm lại, suy ngẫm một cách nghiêm túc về những bi kịch lịch sử.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. gây buồn ngủ",
        diagnosticTitle: "Hiểu nhầm tính chất trang nghiêm thành nhàm chán",
        explanation: "Sobering là một trải nghiệm gây ấn tượng mạnh và cảm xúc sâu lắng, hoàn toàn không phải nhàm chán."
      }
    },
    {
      id: "doer_w3d2_q04",
      roundIndex: 3,
      prompt: "Tại sao tác giả lại cảm thấy ít có sự kết nối cảm xúc mạnh mẽ với thủ đô Hà Nội hơn các nơi khác?",
      options: [
        { id: "opt_A", label: "A", text: "Do giao thông hỗn loạn, tiếng còi xe liên tục và sự mệt mỏi sau cả tháng di chuyển" },
        { id: "opt_B", label: "B", text: "Do người dân ở đó không biết nói tiếng Anh" },
        { id: "opt_C", label: "C", text: "Do thời tiết quá nóng bức" },
        { id: "opt_D", label: "D", text: "Do tác giả bị mất hành lý khi đi tàu" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Do giao thông hỗn loạn, tiếng còi xe liên tục và sự mệt mỏi sau cả tháng di chuyển",
      correctExplanation: "Tác giả giải thích: \"I think it was the combination of mad traffic, constant honking, and the fact that I'd had a very busy month of travel\".",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Do thời tiết quá nóng bức",
        diagnosticTitle: "Suy diễn về yếu tố khí hậu không có trong bài",
        explanation: "Bài đọc không hề phàn nàn về nhiệt độ hay thời tiết ở Hà Nội."
      }
    },
    {
      id: "doer_w3d2_q05",
      roundIndex: 4,
      prompt: "Tác giả đã tham gia hoạt động nào tại khu phố cổ Hà Nội?",
      options: [
        { id: "opt_A", label: "A", text: "Thăm Hồ Hoàn Kiếm và xem múa rối nước tại Nhà hát Thăng Long" },
        { id: "opt_B", label: "B", text: "Tham quan Lăng Chủ tịch Hồ Chí Minh và Chùa Một Cột" },
        { id: "opt_C", label: "C", text: "Đi chợ đêm Đồng Xuân và ăn bún chả" },
        { id: "opt_D", label: "D", text: "Leo lên đỉnh tháp Bút để ngắm toàn cảnh" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Thăm Hồ Hoàn Kiếm và xem múa rối nước tại Nhà hát Thăng Long",
      correctExplanation: "Đoạn văn viết: \"I did manage to visit Hoan Kiem Lake in the historic centre of town, and attend a water puppet show at Thang Long Water Puppet Theater\".",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Tham quan Lăng Bác",
        diagnosticTitle: "Đoán mò các địa danh nổi tiếng của Hà Nội",
        explanation: "Tác giả chỉ nêu đích danh Hồ Hoàn Kiếm và Nhà hát Múa rối nước Thăng Long trong lịch trình 3 ngày."
      }
    },
    {
      id: "doer_w3d2_q06",
      roundIndex: 5,
      prompt: "Từ \"topography\" trong câu miêu tả Vịnh Hạ Long: \"Halong Bay is home to some of the most fascinating topography in the world\" có nghĩa là:",
      options: [
        { id: "opt_A", label: "A", text: "Địa hình, cảnh quan địa thế tự nhiên" },
        { id: "opt_B", label: "B", text: "Hệ thống ẩm thực hải sản" },
        { id: "opt_C", label: "C", text: "Lịch sử truyền thuyết dân gian" },
        { id: "opt_D", label: "D", text: "Hệ thống giao thông đường thủy" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Địa hình, cảnh quan địa thế tự nhiên",
      correctExplanation: "\"Topography\" là thuật ngữ địa lý chỉ địa hình, bề mặt cảnh quan và các đặc tính tự nhiên của một vùng đất/vịnh đảo.",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Lịch sử truyền thuyết dân gian",
        diagnosticTitle: "Nhầm lẫn với tên gọi \"Bay of Descending Dragons\"",
        explanation: "Topography thuần túy là thuật ngữ địa mạo, hình thể núi đá và nước non."
      }
    },
    {
      id: "doer_w3d2_q07",
      roundIndex: 6,
      prompt: "Tại sao tác giả lại chọn tour du thuyền 3 ngày 2 đêm thay vì tour 1 ngày ở Vịnh Hạ Long?",
      options: [
        { id: "opt_A", label: "A", text: "Vì nhận thấy tour 1 ngày là không đủ để trải nghiệm trọn vẹn cảnh quan kỳ diệu này" },
        { id: "opt_B", label: "B", text: "Vì các tour 1 ngày đã bán hết sạch vé" },
        { id: "opt_C", label: "C", text: "Vì tour 3 ngày có giá rẻ hơn tour 1 ngày" },
        { id: "opt_D", label: "D", text: "Vì thời tiết xấu khiến các chuyến tàu trong ngày bị hủy" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Vì nhận thấy tour 1 ngày là không đủ để trải nghiệm trọn vẹn cảnh quan kỳ diệu này",
      correctExplanation: "Tác giả nêu: \"I knew a one day tour would not be enough time to experience this magical landscape, so I signed up for a 3 day - 2 night boat tour\".",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Do hết vé tour 1 ngày",
        diagnosticTitle: "Suy diễn nguyên nhân không có trong văn bản",
        explanation: "Đây là quyết định chủ động của tác giả dựa trên mong muốn khám phá kỹ lưỡng."
      }
    },
    {
      id: "doer_w3d2_q08",
      roundIndex: 7,
      prompt: "Tác giả đã tham gia những hoạt động nào trên Vịnh Hạ Long trong chuyến đi 3 ngày?",
      options: [
        { id: "opt_A", label: "A", text: "Chèo thuyền kayak trong vịnh, thăm hang động và leo núi trên các hòn đảo" },
        { id: "opt_B", label: "B", text: "Lặn biển ngắm san hô và câu mực đêm cùng ngư dân" },
        { id: "opt_C", label: "C", text: "Học nhảy dù lượn và bơi vượt biển" },
        { id: "opt_D", label: "D", text: "Tham gia lễ hội đua thuyền rồng truyền thống" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Chèo thuyền kayak trong vịnh, thăm hang động và leo núi trên các hòn đảo",
      correctExplanation: "Bài viết liệt kê: \"kayaking in the bay, visiting caves, and hiking around some of the islands\".",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Lặn ngắm san hô",
        diagnosticTitle: "Đưa ra các hoạt động biển không được đề cập",
        explanation: "Bài đọc chỉ liệt kê 3 hoạt động cụ thể: kayaking, visiting caves, hiking."
      }
    },
    {
      id: "doer_w3d2_q09",
      roundIndex: 8,
      prompt: "Xét câu hỏi True/False/Not Given: \"The author decided to sign up for a 1-day tour of Ho Chi Minh City because she wanted to save money.\" Đáp án là:",
      options: [
        { id: "opt_A", label: "A", text: "FALSE" },
        { id: "opt_B", label: "B", text: "TRUE" },
        { id: "opt_C", label: "C", text: "NOT GIVEN" },
        { id: "opt_D", label: "D", text: "CANNOT BE DETERMINED" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. FALSE",
      correctExplanation: "Tác giả nói lý do đặt tour 1 ngày ở Sài Gòn là do THỜI GIAN CÓ HẠN (\"since my time was limited\"), chứ không phải để tiết kiệm tiền.",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. NOT GIVEN",
        diagnosticTitle: "Không đối chiếu được lý do thời gian vs tiền bạc",
        explanation: "Bài đã nêu rõ lý do là do thời gian có hạn (limited time), thông tin này mâu thuẫn trực tiếp với \"save money\" nên là FALSE."
      }
    },
    {
      id: "doer_w3d2_q10",
      roundIndex: 9,
      prompt: "Trong câu kết: \"I can't recommend this experience enough!\", người viết muốn nói gì?",
      options: [
        { id: "opt_A", label: "A", text: "Rất nhiệt liệt đề xuất mọi người nên trải nghiệm chuyến đi tuyệt vời này" },
        { id: "opt_B", label: "B", text: "Không muốn giới thiệu trải nghiệm này cho ai vì quá tệ" },
        { id: "opt_C", label: "C", text: "Không có đủ thời gian để viết bài đánh giá chi tiết" },
        { id: "opt_D", label: "D", text: "Đề nghị tour du lịch nên bổ sung thêm hoạt động mới" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Rất nhiệt liệt đề xuất mọi người nên trải nghiệm chuyến đi tuyệt vời này",
      correctExplanation: "Thành ngữ \"cannot recommend something enough\" là lời khen ngợi cao nhất, ý nói có khen bao nhiêu cũng không đủ vì quá tuyệt vời.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Không muốn giới thiệu",
        diagnosticTitle: "Dịch nghĩa đen phủ định \"can't\"",
        explanation: "Người học nhìn thấy \"can't recommend\" tưởng là không đề xuất, nhưng đây là cấu trúc khen ngợi tột bậc."
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
