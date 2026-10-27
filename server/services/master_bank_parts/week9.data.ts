/**
 * MASTER ARENA QUESTION BANK - WEEK 9
 * Source: Giáo trình MASTER 2027 - Đã soát lỗi.docx & Giáo án Master 2027 (Teacher Guide)
 * Target: IELTS Band 6.0 | Performance 6.0–6.5
 * 
 * Day 1: Writing (Task 1 Comparing Two Objects / Multipliers Four Times As Much / That of & Those of)
 * Day 2: Reading (Ancient Artefacts in Norway's Melting Ice / Glacial Archaeology / Cambridge Real Test Walkthrough)
 * Day 3: Speaking (Part 1 Real Test Walkthrough / Part 3 Future Predictions / Part 2 Describe an Outfit)
 */

export const MASTER_WEEK_9_QUESTIONS: Record<string, any[]> = {
  "WEEK 9 – DAY 1": [
    {
      id: "master_w9d1_q01",
      roundIndex: 0,
      prompt: "Trong IELTS Writing Task 1, khi so sánh lượng du khách từ Trung Quốc (800.000) và Đài Loan (200.000), cấu trúc so sánh gấp bội (Multipliers) nào sau đây là chuẩn xác nhất?",
      options: [
        { id: "opt_A", label: "A", text: "The number of visitors from China was four times as high as that of Taiwan." },
        { id: "opt_B", label: "B", text: "The number of visitors from China was four times higher than Taiwan." },
        { id: "opt_C", label: "C", text: "China had four times more visitors than the number of Taiwan." },
        { id: "opt_D", label: "D", text: "Visitors from China were quadruple compared to Taiwan people." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. The number of visitors from China was four times as high as that of Taiwan.",
      correctExplanation: "Công thức so sánh số lần chuẩn: 'The number of X was [multiplier] times as high as that of Y'. Đại từ 'that of' thay thế chuẩn xác cho 'the number of visitors from' để tránh lỗi so sánh khập khiễng giữa 'số lượng người' với 'một quốc gia'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. The number of visitors from China was four times higher than Taiwan.",
        diagnosticTitle: "Lỗi so sánh khập khiễng (Illogical comparison) khi thiếu 'that of'",
        explanation: "So sánh 'The number of visitors' với 'Taiwan' (cả quốc gia) là lỗi so sánh sai đối tượng kinh điển.",
      }
    },
    {
      id: "master_w9d1_q02",
      roundIndex: 1,
      prompt: "Khi so sánh sản lượng gạo giữa Quốc gia A (40 triệu tấn) và Quốc gia B (10 triệu tấn), câu nào sử dụng danh từ không đếm được chuẩn xác?",
      options: [
        { id: "opt_A", label: "A", text: "Country A produced four times as much rice as Country B." },
        { id: "opt_B", label: "B", text: "Country A produced four times as many rice as Country B." },
        { id: "opt_C", label: "C", text: "Country A produced four times more rices than Country B." },
        { id: "opt_D", label: "D", text: "Country A had four times rice higher than Country B." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Country A produced four times as much rice as Country B.",
      correctExplanation: "'Rice' là danh từ không đếm được nên bắt buộc phải dùng 'as much rice as', tuyệt đối không dùng 'as many' hay 'rices'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Country A produced four times as many rice as Country B.",
        diagnosticTitle: "Dùng 'as many' cho danh từ không đếm được",
        explanation: "'As many' chỉ dùng cho danh từ đếm được số nhiều (cars, books), không dùng cho gạo.",
      }
    },
    {
      id: "master_w9d1_q03",
      roundIndex: 2,
      prompt: "Chọn câu viết chuẩn ngữ pháp sử dụng 'double' như một ngoại động từ để mô tả sự gia tăng số lượng:",
      options: [
        { id: "opt_A", label: "A", text: "Car sales in the region doubled from 5,000 units in 2010 to 10,000 units in 2020." },
        { id: "opt_B", label: "B", text: "Car sales was doubled by two times between 2010 and 2020." },
        { id: "opt_C", label: "C", text: "Car sales had double numbers from 5,000 to 10,000." },
        { id: "opt_D", label: "D", text: "The cars doubled up their sales in 10 years." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Car sales in the region doubled from 5,000 units in 2010 to 10,000 units in 2020.",
      correctExplanation: "'Double' là động từ tự thân (intransitive) hoặc ngoại động từ chỉ sự tăng gấp đôi: 'S + doubled from [X] to [Y]'. Không cần chèn thêm 'by two times' vì tự bản thân 'double' đã mang nghĩa gấp hai lần.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Car sales was doubled by two times between 2010 and 2020.",
        diagnosticTitle: "Lỗi thừa thãi ngữ nghĩa 'doubled by two times'",
        explanation: "'Double' đã là hai lần, thêm 'by two times' là lỗi trùng lặp từ ngữ ngớ ngẩn (tautology).",
      }
    },
    {
      id: "master_w9d1_q04",
      roundIndex: 3,
      prompt: "Chọn câu sử dụng đại từ thay thế 'those of' chuẩn xác để so sánh số liệu của nhiều đối tượng số nhiều:",
      options: [
        { id: "opt_A", label: "A", text: "The export figures of electronics were considerably higher than those of textiles." },
        { id: "opt_B", label: "B", text: "The export figures of electronics were considerably higher than that of textiles." },
        { id: "opt_C", label: "C", text: "The export figures of electronics were higher than textile numbers." },
        { id: "opt_D", label: "D", text: "Electronics had export figures bigger than textiles did." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. The export figures of electronics were considerably higher than those of textiles.",
      correctExplanation: "Vì chủ ngữ là số nhiều ('The export figures'), nên đại từ thay thế bắt buộc phải là 'those of', không thể dùng 'that of' (dành cho danh từ số ít hoặc không đếm được).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. The export figures of electronics were considerably higher than that of textiles.",
        diagnosticTitle: "Dùng 'that of' thay thế cho danh từ số nhiều",
        explanation: "'Figures' là số nhiều nên phải dùng 'those of', dùng 'that of' là sai ngữ pháp hòa hợp số lượng.",
      }
    },
    {
      id: "master_w9d1_q05",
      roundIndex: 4,
      prompt: "Khi muốn kết hợp hai số liệu vào một câu so sánh tương phản, cấu trúc nào sau đây đạt điểm Coherence cao nhất?",
      options: [
        { id: "opt_A", label: "A", text: "In stark contrast to country A, which generated 60 gigawatts of solar energy, country B produced a negligible 5 gigawatts." },
        { id: "opt_B", label: "B", text: "Country A had 60 gigawatts, but country B was very small with only 5 gigawatts." },
        { id: "opt_C", label: "C", text: "Country A made 60 gigawatts and opposite to it country B made 5 gigawatts." },
        { id: "opt_D", label: "D", text: "There was 60 gigawatts in country A while country B was 5 gigawatts." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. In stark contrast to country A, which generated 60 gigawatts of solar energy, country B produced a negligible 5 gigawatts.",
      correctExplanation: "Cụm mở đầu tương phản mạnh mẽ 'In stark contrast to [Subject], which + clause', kết hợp từ vựng chuyên ngành 'generated' và tính từ đánh giá số lượng 'a negligible 5 gigawatts' thể hiện trình độ Task 1 đỉnh cao.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Country A had 60 gigawatts, but country B was very small with only 5 gigawatts.",
        diagnosticTitle: "Dùng từ nối 'but' và nói 'quốc gia rất nhỏ' thay vì nói số liệu",
        explanation: "Country B was very small có nghĩa là diện tích nước B nhỏ, chứ không phải nói về sản lượng điện.",
      }
    },
    {
      id: "master_w9d1_q06",
      roundIndex: 5,
      prompt: "Cụm từ nào đồng nghĩa với 'nearly double'?",
      options: [
        { id: "opt_A", label: "A", text: "almost twofold gần như gấp đôi" },
        { id: "opt_B", label: "B", text: "exactly one third đúng một phần ba" },
        { id: "opt_C", label: "C", text: "significantly lower thấp hơn nhiều" },
        { id: "opt_D", label: "D", text: "fluctuated wildly biến động dữ dội" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. almost twofold gần như gấp đôi",
      correctExplanation: "'Twofold' nghĩa là gấp hai lần (double), kết hợp 'almost / nearly twofold' là cách diễn đạt học thuật chuẩn xác.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. exactly one third đúng một phần ba",
        diagnosticTitle: "Nhầm gấp đôi với phân số một phần ba",
        explanation: "One third là 1/3, trái ngược hoàn toàn với gấp đôi (2x).",
      }
    },
    {
      id: "master_w9d1_q07",
      roundIndex: 6,
      prompt: "Chọn câu viết chuẩn mô tả tỷ lệ phần trăm: 'Tỷ lệ người dân sử dụng phương tiện công cộng ở thành phố A là 45%, trong khi ở thành phố B con số tương ứng là 20%.'?",
      options: [
        { id: "opt_A", label: "A", text: "The proportion of residents utilizing public transit in City A was 45%, whereas the corresponding figure for City B was 20%." },
        { id: "opt_B", label: "B", text: "The percent of people using bus in City A was 45%, while City B was 20%." },
        { id: "opt_C", label: "C", text: "City A had public transit 45% and City B had 20% of it." },
        { id: "opt_D", label: "D", text: "In City A there was 45% using bus, while corresponding number was 20% in B." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. The proportion of residents utilizing public transit in City A was 45%, whereas the corresponding figure for City B was 20%.",
      correctExplanation: "Từ vựng quy chuẩn Task 1: 'The proportion of...', liên từ 'whereas', và cụm từ 'the corresponding figure for...' (con số tương ứng cho...) giúp tránh lặp từ hoàn hảo.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. The percent of people using bus in City A was 45%, while City B was 20%.",
        diagnosticTitle: "Dùng từ 'percent' làm chủ ngữ thay vì 'percentage/proportion'",
        explanation: "'Percent' phải đi sau số (45 percent), khi làm chủ ngữ đứng một mình phải dùng 'The percentage of' hoặc 'The proportion of'.",
      }
    },
    {
      id: "master_w9d1_q08",
      roundIndex: 7,
      prompt: "Trong bài Task 1 có hai đối tượng so sánh xuyên suốt, cách chia nhóm thông tin vào 2 đoạn thân bài (Body 1 và Body 2) logic nhất là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Body 1 mô tả và so sánh nhóm các hạng mục dẫn đầu; Body 2 mô tả và so sánh nhóm các hạng mục có số liệu thấp hơn hoặc thiểu số" },
        { id: "opt_B", label: "B", text: "Body 1 viết ngẫu nhiên 3 con số; Body 2 viết ngẫu nhiên 3 con số còn lại" },
        { id: "opt_C", label: "C", text: "Body 1 chỉ viết danh từ; Body 2 chỉ viết số liệu không có chữ" },
        { id: "opt_D", label: "D", text: "Cả hai Body đều viết lại phần mở bài" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Body 1 mô tả và so sánh nhóm các hạng mục dẫn đầu; Body 2 mô tả và so sánh nhóm các hạng mục có số liệu thấp hơn hoặc thiểu số",
      correctExplanation: "Chiến thuật nhóm dữ liệu (Grouping logic): Chia theo thứ bậc (Top performers ở Body 1, Minor categories ở Body 2) giúp bài báo cáo mạch lạc, có tính phân tích cao.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Body 1 viết ngẫu nhiên 3 con số; Body 2 viết ngẫu nhiên 3 con số còn lại",
        diagnosticTitle: "Gom nhóm tùy tiện không dựa trên tiêu chí phân loại logic",
        explanation: "Gom số ngẫu nhiên làm bài viết bị đánh giá là thiếu tổ chức (lacks clear progression).",
      }
    },
    {
      id: "master_w9d1_q09",
      roundIndex: 8,
      prompt: "Cụm từ 'dwarfed by' trong câu: 'The production of biofuel was completely dwarfed by traditional fossil fuels' mang nghĩa là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Bị lấn át hoàn toàn và trở nên vô cùng nhỏ bé khi so sánh với quy mô khổng lồ của nhiên liệu hóa thạch" },
        { id: "opt_B", label: "B", text: "Bị ô nhiễm do khói bụi của các nhà máy điện" },
        { id: "opt_C", label: "C", text: "Được sản xuất bởi những người lùn trong truyện cổ tích" },
        { id: "opt_D", label: "D", text: "Có giá bán đắt gấp mười lần trên thị trường" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Bị lấn át hoàn toàn và trở nên vô cùng nhỏ bé khi so sánh với quy mô khổng lồ của nhiên liệu hóa thạch",
      correctExplanation: "'Be dwarfed by something' (bị làm cho lu mờ, trở nên tí hon khi đứng cạnh thứ to lớn) là động từ so sánh hình ảnh cực kỳ sang trọng trong Writing.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Được sản xuất bởi những người lùn trong truyện cổ tích",
        diagnosticTitle: "Dịch theo nghĩa đen truyện cổ tích của từ 'dwarf'",
        explanation: "Trong văn cảnh thống kê, 'dwarf' là động từ so sánh quy mô, không liên quan đến người lùn cổ tích.",
      }
    },
    {
      id: "master_w9d1_q10",
      roundIndex: 9,
      prompt: "Để đạt điểm Task Achievement tối đa trong Task 1, thí sinh có bắt buộc phải liệt kê 100% tất cả các số liệu có trên biểu đồ không?",
      options: [
        { id: "opt_A", label: "A", text: "Không. Đề bài yêu cầu 'select and report the main features, and make comparisons where relevant', do đó cần chọn lọc số liệu nổi bật và so sánh thay vì chép máy móc toàn bộ" },
        { id: "opt_B", label: "B", text: "Bắt buộc phải ghi đủ từng số một, nếu thiếu một số sẽ bị loại ngay" },
        { id: "opt_C", label: "C", text: "Không được đưa bất kỳ con số nào vào bài viết" },
        { id: "opt_D", label: "D", text: "Tự sáng chế ra số liệu mới để làm bài viết thêm phong phú" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Không. Đề bài yêu cầu 'select and report the main features, and make comparisons where relevant', do đó cần chọn lọc số liệu nổi bật và so sánh thay vì chép máy móc toàn bộ",
      correctExplanation: "Yêu cầu chính thức của Cambridge: Thí sinh phải biết tổng hợp và chọn lọc đặc điểm chính (Key features), nếu liệt kê cơ học toàn bộ bảng số liệu sẽ bị trừ điểm Task Achievement vì bài viết biến thành danh sách số liệu thô.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Bắt buộc phải ghi đủ từng số một, nếu thiếu một số sẽ bị loại ngay",
        diagnosticTitle: "Ảo tưởng phải chép toàn bộ mọi số liệu trên biểu đồ",
        explanation: "Cố chép hết số liệu sẽ khiến bài viết bị quá dài, không kịp giờ và mất tính tổng quan so sánh.",
      }
    }
  ],

  "WEEK 9 – DAY 2": [
    {
      id: "master_w9d2_q01",
      roundIndex: 0,
      prompt: "Trong bài đọc 'Ancient Artefacts in Norway's Melting Ice', hiện tượng băng tan trên các dãy núi cao của Na Uy đã dẫn đến sự ra đời của ngành nghiên cứu mới nào?",
      options: [
        { id: "opt_A", label: "A", text: "Khảo cổ học sông băng Glacial Archaeology nhằm tìm kiếm và giải cứu các cổ vật cổ đại lộ ra từ các tảng băng tan" },
        { id: "opt_B", label: "B", text: "Du lịch trượt tuyết mùa hè trên đỉnh núi cao" },
        { id: "opt_C", label: "C", text: "Khai thác vàng và kim cương trong lòng đất đóng băng vĩnh cửu" },
        { id: "opt_D", label: "D", text: "Kỹ thuật nuôi cá hồi trong hang băng" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Khảo cổ học sông băng Glacial Archaeology nhằm tìm kiếm và giải cứu các cổ vật cổ đại lộ ra từ các tảng băng tan",
      correctExplanation: "Văn bản giới thiệu lĩnh vực mới 'Glacial Archaeology' (Khảo cổ học sông băng): biến đổi khí hậu làm tan các mảng băng vĩnh cửu (ice patches), làm lộ ra hàng nghìn cổ vật của người Viking và Thời kỳ Đồ sắt được bảo tồn nguyên vẹn suốt nhiều thiên niên kỷ.",
      timeLimitSeconds: 25,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Khai thác vàng và kim cương trong lòng đất đóng băng vĩnh cửu",
        diagnosticTitle: "Suy đoán sang lĩnh vực khai khoáng kinh tế",
        explanation: "Bài đọc tập trung vào nghiên cứu lịch sử khảo cổ học nhân loại, không phải khai thác vàng bạc.",
      }
    },
    {
      id: "master_w9d2_q02",
      roundIndex: 1,
      prompt: "Tại sao các cổ vật hữu cơ (như áo len dệt, mũi tên gắn lông vũ, giày da) lại có thể tồn tại nguyên vẹn hàng nghìn năm trong các mảng băng ở Na Uy?",
      options: [
        { id: "opt_A", label: "A", text: "Các mảng băng hoạt động như một chiếc tủ đông tự nhiên khổng lồ, cố định tĩnh vật thể và ngăn chặn vi khuẩn phân hủy cũng như ánh sáng mặt trời" },
        { id: "opt_B", label: "B", text: "Người cổ đại đã ngâm các vật dụng này trong hóa chất bảo quản hiện đại" },
        { id: "opt_C", label: "C", text: "Các cổ vật đều được đúc bằng vàng nguyên khối" },
        { id: "opt_D", label: "D", text: "Do băng ở Na Uy có chứa hàm lượng muối cực cao" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Các mảng băng hoạt động như một chiếc tủ đông tự nhiên khổng lồ, cố định tĩnh vật thể và ngăn chặn vi khuẩn phân hủy cũng như ánh sáng mặt trời",
      correctExplanation: "Đặc điểm của 'ice patches' (khác với dòng sông băng di chuyển nghiền nát đồ vật): mảng băng tĩnh không di chuyển, hoạt động như tủ đông tự nhiên hoàn hảo giúp chất hữu cơ không bị vi khuẩn phân hủy.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Người cổ đại đã ngâm các vật dụng này trong hóa chất bảo quản hiện đại",
        diagnosticTitle: "Gán ghép hóa chất hiện đại cho người Viking thời Đồ sắt",
        explanation: "Người cổ đại không có hóa chất hiện đại, vật phẩm nguyên vẹn hoàn toàn nhờ điều kiện đóng băng tự nhiên.",
      }
    },
    {
      id: "master_w9d2_q03",
      roundIndex: 2,
      prompt: "Mối đe dọa khẩn cấp lớn nhất (Urgent threat) đối với các cổ vật ngay sau khi chúng lộ ra khỏi lớp băng tan là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Chúng sẽ nhanh chóng bị vi sinh vật phân hủy, gió và ánh nắng mặt trời phá hủy hoàn toàn trong vòng vài tuần nếu các nhà khảo cổ không kịp thu hồi" },
        { id: "opt_B", label: "B", text: "Chúng sẽ tự bốc cháy do gặp không khí nóng" },
        { id: "opt_C", label: "C", text: "Các đàn chim di cư sẽ ăn hết các cổ vật này" },
        { id: "opt_D", label: "D", text: "Khách du lịch sẽ ném tất cả các cổ vật xuống vực sâu" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Chúng sẽ nhanh chóng bị vi sinh vật phân hủy, gió và ánh nắng mặt trời phá hủy hoàn toàn trong vòng vài tuần nếu các nhà khảo cổ không kịp thu hồi",
      correctExplanation: "Văn bản nhấn mạnh tính cấp bách của 'rescue archaeology' (khảo cổ giải cứu): một khi băng tan, vật hữu cơ tiếp xúc với không khí sẽ mục nát và biến mất vĩnh viễn rất nhanh chóng.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Chúng sẽ tự bốc cháy do gặp không khí nóng",
        diagnosticTitle: "Suy đoán phi thực tế",
        explanation: "Cổ vật không thể tự bốc cháy, mối đe dọa thực tế là sự phân hủy sinh học (microbial decay) và xói mòn thời tiết.",
      }
    },
    {
      id: "master_w9d2_q04",
      roundIndex: 3,
      prompt: "Phát hiện về con đèo Lendbreen hé lộ điều gì về đời sống của các cộng đồng dân cư trong Thời kỳ Đồ sắt và Thời kỳ Viking?",
      options: [
        { id: "opt_A", label: "A", text: "Đây từng là một tuyến đường giao thương và di chuyển huyết mạch xuyên qua núi cao được sử dụng thường xuyên trong nhiều thế kỷ" },
        { id: "opt_B", label: "B", text: "Đây là nơi người Viking chôn cất tất cả các con tàu chiến của họ" },
        { id: "opt_C", label: "C", text: "Con người thời đó hoàn toàn sợ hãi và không bao giờ dám đặt chân lên vùng núi tuyết" },
        { id: "opt_D", label: "D", text: "Đây là khu căn cứ quân sự bí mật chống lại người La Mã" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Đây từng là một tuyến đường giao thương và di chuyển huyết mạch xuyên qua núi cao được sử dụng thường xuyên trong nhiều thế kỷ",
      correctExplanation: "Số lượng móng ngựa, xương xe trượt tuyết và vật dụng sinh hoạt tìm thấy tại đèo Lendbreen chứng minh đây là một tuyến giao thông núi cao nhộn nhịp (trans-alpine trade route).",
      timeLimitSeconds: 25,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Con người thời đó hoàn toàn sợ hãi và không bao giờ dám đặt chân lên vùng núi tuyết",
        diagnosticTitle: "Định kiến sai lầm rằng người cổ đại không dám vượt núi",
        explanation: "Các phát hiện khảo cổ đã hoàn toàn bác bỏ định kiến này và chứng minh người cổ đại di chuyển qua núi rất thường xuyên.",
      }
    },
    {
      id: "master_w9d2_q05",
      roundIndex: 4,
      prompt: "Trong câu: 'Archaeologists must race against time to retrieve these fragile specimens', cụm 'race against time' thể hiện điều gì?",
      options: [
        { id: "opt_A", label: "A", text: "Một nỗ lực chạy đua khẩn trương để hoàn thành nhiệm vụ trước khi điều kiện tự nhiên phá hủy cơ hội cuối cùng" },
        { id: "opt_B", label: "B", text: "Một cuộc thi chạy tiếp sức có bấm giờ đồng hồ thể thao" },
        { id: "opt_C", label: "C", text: "Việc chế tạo đồng hồ cát đầu tiên trong lịch sử" },
        { id: "opt_D", label: "D", text: "Sự thong thả nhàn nhã trong công việc nghiên cứu" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Một nỗ lực chạy đua khẩn trương để hoàn thành nhiệm vụ trước khi điều kiện tự nhiên phá hủy cơ hội cuối cùng",
      correctExplanation: "'Race against time' là thành ngữ kinh điển chỉ tình thế cấp bách, phải hành động cực kỳ khẩn trương trước khi quá muộn.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Một cuộc thi chạy tiếp sức có bấm giờ đồng hồ thể thao",
        diagnosticTitle: "Dịch nghĩa đen chữ 'race' thành cuộc thi thể thao",
        explanation: "Đây là ẩn dụ về sự cấp bách thời gian, không phải môn thể thao điền kinh.",
      }
    },
    {
      id: "master_w9d2_q06",
      roundIndex: 5,
      prompt: "Chọn MỘT TỪ DUY NHẤT từ bài đọc: 'Among the exceptional findings was an intact Iron Age [...] made of woven wool.'?",
      options: [
        { id: "opt_A", label: "A", text: "tunic chiếc áo dài chẽn" },
        { id: "opt_B", label: "B", text: "sword thanh kiếm sắt" },
        { id: "opt_C", label: "C", text: "helmet chiếc mũ bảo hiểm" },
        { id: "opt_D", label: "D", text: "shield chiếc khiên gỗ" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. tunic chiếc áo dài chẽn",
      correctExplanation: "Một trong những phát hiện chấn động nhất tại sông băng Na Uy là chiếc áo tunic bằng len dệt từ Thời kỳ Đồ sắt ('an intact tunic dating back to 300 AD') còn nguyên vẹn cả đường kim mũi chỉ.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. sword thanh kiếm sắt",
        diagnosticTitle: "Nghĩ theo các vũ khí sắt quen thuộc của người Viking",
        explanation: "Kiếm sắt không làm bằng len dệt (woven wool). Dữ kiện len dệt chỉ có thể là chiếc áo tunic.",
      }
    },
    {
      id: "master_w9d2_q07",
      roundIndex: 6,
      prompt: "Từ 'permafrost' trong bài đọc địa chất sông băng có nghĩa là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Tầng đất hoặc trầm tích bị đóng băng liên tục trong ít nhất hai năm liên tiếp" },
        { id: "opt_B", label: "B", text: "Băng nhân tạo được sản xuất trong các nhà máy đá lạnh" },
        { id: "opt_C", label: "C", text: "Một loại sương muối chỉ xuất hiện vào ban đêm" },
        { id: "opt_D", label: "D", text: "Lớp tuyết mới rơi dày vài centimet trên mái nhà" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Tầng đất hoặc trầm tích bị đóng băng liên tục trong ít nhất hai năm liên tiếp",
      correctExplanation: "'Permafrost' (tầng đất đóng băng vĩnh cửu: Permanent + frost) là thuật ngữ khoa học địa chất chỉ lớp mặt đất bị đông cứng liên tục ở nhiệt độ 0 độ C trở xuống trong ít nhất 2 năm.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. Lớp tuyết mới rơi dày vài centimet trên mái nhà",
        diagnosticTitle: "Nhầm tầng đất đóng băng vĩnh viễn với tuyết rơi mùa đông",
        explanation: "Tuyết rơi tan chảy theo mùa, còn permafrost nằm sâu trong đất và đóng băng qua hàng thiên niên kỷ.",
      }
    },
    {
      id: "master_w9d2_q08",
      roundIndex: 7,
      prompt: "Tại sao biến đổi khí hậu lại vừa là cơ hội vừa là thảm họa đối với các nhà khảo cổ học sông băng?",
      options: [
        { id: "opt_A", label: "A", text: "Cơ hội vì làm lộ ra những cổ vật quý giá chưa từng thấy; nhưng là thảm họa vì băng tan ồ ạt khiến vô số hiện vật bị phân hủy trước khi kịp tìm thấy" },
        { id: "opt_B", label: "B", text: "Cơ hội vì thời tiết ấm hơn giúp các nhà khoa học không cần mặc áo ấm khi đi làm" },
        { id: "opt_C", label: "C", text: "Thảm họa vì giá vé máy bay đi Na Uy tăng quá cao" },
        { id: "opt_D", label: "D", text: "Cả hai vế đều hoàn toàn sai" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Cơ hội vì làm lộ ra những cổ vật quý giá chưa từng thấy; nhưng là thảm họa vì băng tan ồ ạt khiến vô số hiện vật bị phân hủy trước khi kịp tìm thấy",
      correctExplanation: "Tính hai mặt (Paradox of glacial archaeology): Khí hậu ấm lên mang lại kho tàng phát hiện mới, nhưng tốc độ tan chảy quá nhanh tạo nên thảm kịch mất mát di sản văn hóa không thể cứu vãn.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Cơ hội vì thời tiết ấm hơn giúp các nhà khoa học không cần mặc áo ấm khi đi làm",
        diagnosticTitle: "Suy nghĩ tầm phào về trang phục cá nhân",
        explanation: "Vấn đề của bài đọc là di sản văn hóa nhân loại, không phải việc mặc áo ấm.",
      }
    },
    {
      id: "master_w9d2_q09",
      roundIndex: 8,
      prompt: "Từ 'intact' trong câu: 'The wooden bow remained miraculously intact' đồng nghĩa với từ nào?",
      options: [
        { id: "opt_A", label: "A", text: "undamaged nguyên vẹn không bị tổn hại" },
        { id: "opt_B", label: "B", text: "shattered vỡ vụn thành nhiều mảnh" },
        { id: "opt_C", label: "C", text: "rotten đã bị mục nát hoàn toàn" },
        { id: "opt_D", label: "D", text: "lost đã bị thất lạc vĩnh viễn" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. undamaged nguyên vẹn không bị tổn hại",
      correctExplanation: "'Intact' (nguyên vẹn, hoàn hảo không suy suyển) đồng nghĩa với 'undamaged', 'unimpaired', 'whole'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. shattered vỡ vụn thành nhiều mảnh",
        diagnosticTitle: "Hiểu ngược nghĩa của tính từ nguyên vẹn",
        explanation: "'Shattered' (vỡ tan tành) là từ trái nghĩa đối lập của 'intact'.",
      }
    },
    {
      id: "master_w9d2_q10",
      roundIndex: 9,
      prompt: "Khi bước vào 10 phút cuối cùng của bài thi IELTS Reading trong phòng thi thật, chiến thuật quản trị thời gian tối ưu là:",
      options: [
        { id: "opt_A", label: "A", text: "Đảm bảo 100% các câu trả lời đã được chuyển chính xác sang Answer Sheet và không để trống bất kỳ câu nào dù phải phỏng đoán có cơ sở" },
        { id: "opt_B", label: "B", text: "Ngồi cặm cụi đọc dịch một đoạn văn khó mà chưa điền đáp án của 10 câu trước đó" },
        { id: "opt_C", label: "C", text: "Gục đầu xuống bàn ngủ để chuẩn bị cho phần thi Viết tiếp theo" },
        { id: "opt_D", label: "D", text: "Xóa toàn bộ các câu trả lời cũ để viết lại từ đầu" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Đảm bảo 100% các câu trả lời đã được chuyển chính xác sang Answer Sheet và không để trống bất kỳ câu nào dù phải phỏng đoán có cơ sở",
      correctExplanation: "Kỷ luật phòng thi số 1 của Reading: Không có 10 phút chuyển đáp án như phần Listening! Hết giờ là giám khảo thu bài ngay lập tức. Phải điền thẳng vào Answer Sheet và tuyệt đối không để trống câu nào (No penalty for wrong guesses).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Ngồi cặm cụi đọc dịch một đoạn văn khó mà chưa điền đáp án của 10 câu trước đó",
        diagnosticTitle: "Quên chuyển đáp án sang Answer Sheet dẫn tới việc bị 0 điểm oan uổng",
        explanation: "Rất nhiều thí sinh làm được bài trong đề nhưng hết giờ không kịp chép sang phiếu trả lời nên bị điểm liệt.",
      }
    }
  ],

  "WEEK 9 – DAY 3": [
    {
      id: "master_w9d3_q01",
      roundIndex: 0,
      prompt: "Trong phần thi Speaking Part 1, khi giám khảo hỏi câu hỏi khởi động: 'Do you usually carry a lot of keys with you?', câu trả lời nào sau đây thể hiện sự súc tích, đi thẳng vào trọng tâm (To-the-point) nhưng vẫn giàu từ vựng tự nhiên?",
      options: [
        { id: "opt_A", label: "A", text: "Hardly ever. I am a staunch minimalist, so I only carry a single smart key for my apartment; everything else is digitized on my smartphone." },
        { id: "opt_B", label: "B", text: "Keys are made of metal. When I was born in 2000, my father gave me a key and I carry 20 keys every day." },
        { id: "opt_C", label: "C", text: "Yes, I carry keys because doors have locks." },
        { id: "opt_D", label: "D", text: "I think carrying keys is an interesting philosophical question about home security." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Hardly ever. I am a staunch minimalist, so I only carry a single smart key for my apartment; everything else is digitized on my smartphone.",
      correctExplanation: "Phương án A trả lời trực diện ('Hardly ever'), dùng từ vựng hiện đại sắc bén ('staunch minimalist' - người theo chủ nghĩa tối giản kiên định, 'digitized on my smartphone'), độ dài hoàn hảo 2 câu cho Part 1.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Keys are made of metal. When I was born in 2000, my father gave me a key and I carry 20 keys every day.",
        diagnosticTitle: "Kể chuyện lan man vòng vo về nguồn gốc kim loại và năm sinh",
        explanation: "Part 1 cần sự tự nhiên và súc tích; mở màn bằng định nghĩa kim loại là biểu hiện của việc học vẹt máy móc.",
      }
    },
    {
      id: "master_w9d3_q02",
      roundIndex: 1,
      prompt: "Khi giám khảo hỏi Part 1: 'Are you a tidy person?', cách trả lời nào giúp phô diễn cấu trúc đối chiếu nhịp điệu cuộc sống?",
      options: [
        { id: "opt_A", label: "A", text: "By and large, yes. I make a conscious effort to keep my living space organized, although during intense exam periods, my desk can occasionally descend into organized chaos." },
        { id: "opt_B", label: "B", text: "Yes, I am tidy. My room is clean. I clean my room every Saturday." },
        { id: "opt_C", label: "C", text: "No, I am very dirty person. I never clean anything." },
        { id: "opt_D", label: "D", text: "Being tidy is good for health of humans." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. By and large, yes. I make a conscious effort to keep my living space organized, although during intense exam periods, my desk can occasionally descend into organized chaos.",
      correctExplanation: "Lối diễn đạt bản xứ cực hay: 'By and large, yes' (nhìn chung là có), 'make a conscious effort' (chủ động nỗ lực), và thành ngữ hài hước 'descend into organized chaos' (rơi vào tình trạng hỗn loạn có trật tự) tạo thiện cảm lớn với giám khảo.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Yes, I am tidy. My room is clean. I clean my room every Saturday.",
        diagnosticTitle: "Dùng các câu đơn cụt lủn thiếu liên kết",
        explanation: "Nói 3 câu đơn ngắn chắp vá kìm hãm điểm Grammatical Range ở mức 5.0.",
      }
    },
    {
      id: "master_w9d3_q03",
      roundIndex: 2,
      prompt: "Trong Speaking Part 3 với câu hỏi dự đoán tương lai: 'How will social media impact human relationships in the next 20 years?', mẫu câu nào thể hiện khả năng dự báo học thuật (Future Predictions)?",
      options: [
        { id: "opt_A", label: "A", text: "It will inevitably exacerbate superficial connectivity while eroding emotional intimacy, unless people intentionally carve out digital-free spaces for real-world interactions." },
        { id: "opt_B", label: "B", text: "Social media will be 100% bad and no one will have friends in 20 years." },
        { id: "opt_C", label: "C", text: "I don't know what happens after 20 years because I am young." },
        { id: "opt_D", label: "D", text: "Robots will kill social media very soon." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. It will inevitably exacerbate superficial connectivity while eroding emotional intimacy, unless people intentionally carve out digital-free spaces for real-world interactions.",
      correctExplanation: "Ngữ pháp và từ vựng xuất chúng: 'inevitably exacerbate superficial connectivity' (chắc chắn sẽ làm trầm trọng thêm sự kết nối hời hợt), 'eroding emotional intimacy' (làm xói mòn sự gần gũi cảm xúc), và mệnh đề điều kiện trừ khử 'unless people carve out digital-free spaces'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Social media will be 100% bad and no one will have friends in 20 years.",
        diagnosticTitle: "Tuyên bố tận thế cực đoan phi học thuật",
        explanation: "Dự đoán 'không ai còn bạn bè' là lối nói phóng đại ngô nghê thiếu căn cứ.",
      }
    },
    {
      id: "master_w9d3_q04",
      roundIndex: 3,
      prompt: "Trong Speaking Part 2 với chủ đề mô tả trang phục: 'Describe a piece of clothing you want to purchase', việc chọn một chiếc áo Blazer may đo từ Uniqlo thể hiện gu thẩm mỹ và tính ứng dụng như thế nào?",
      options: [
        { id: "opt_A", label: "A", text: "Một trang phục linh hoạt kết hợp giữa sự thanh lịch tối giản và tính thực dụng, phù hợp cho cả các buổi phỏng vấn trang trọng lẫn những buổi gặp gỡ thường nhật" },
        { id: "opt_B", label: "B", text: "Một chiếc áo đính đầy kim cương để đi khoe khoang với bạn bè trên mạng" },
        { id: "opt_C", label: "C", text: "Một bộ đồ ngủ mặc ở nhà để đi ngủ cho ấm" },
        { id: "opt_D", label: "D", text: "Một chiếc áo rách nát để đi lao động nặng" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Một trang phục linh hoạt kết hợp giữa sự thanh lịch tối giản và tính thực dụng, phù hợp cho cả các buổi phỏng vấn trang trọng lẫn những buổi gặp gỡ thường nhật",
      correctExplanation: "Ý tưởng thời trang chuẩn chỉnh theo giáo trình Master: Chiếc áo blazer đại diện cho 'versatile sartorial choice' (sự lựa chọn trang phục đa năng), 'minimalist elegance' (vẻ thanh lịch tối giản) và 'formal career advancement' (sự chuẩn bị cho nghề nghiệp chuyên nghiệp).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Một chiếc áo đính đầy kim cương để đi khoe khoang với bạn bè trên mạng",
        diagnosticTitle: "Chọn ý tưởng xa rời thực tế đời sống sinh viên",
        explanation: "Ý tưởng áo đính kim cương gây khó khăn trong việc tìm từ vựng mô tả và làm bài nói thiếu tính chân thực.",
      }
    },
    {
      id: "master_w9d3_q05",
      roundIndex: 4,
      prompt: "Collocation 'versatile wardrobe staple' trong bài nói về thời trang mang nghĩa gì?",
      options: [
        { id: "opt_A", label: "A", text: "Một món đồ cơ bản và đa năng không thể thiếu trong tủ quần áo có thể phối đồ trong nhiều hoàn cảnh" },
        { id: "opt_B", label: "B", text: "Một chiếc kẹp ghim dùng để đóng tài liệu giấy tờ" },
        { id: "opt_C", label: "C", text: "Một chiếc tủ gỗ đựng quần áo bị hỏng khóa" },
        { id: "opt_D", label: "D", text: "Bộ quần áo đắt nhất mà bạn chỉ mặc một lần duy nhất" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Một món đồ cơ bản và đa năng không thể thiếu trong tủ quần áo có thể phối đồ trong nhiều hoàn cảnh",
      correctExplanation: "'Wardrobe staple' (món đồ chủ lực trong tủ quần áo), kết hợp tính từ 'versatile' (linh hoạt biến hóa phong cách) là cụm từ thời thượng đạt điểm Lexical Resource 7.0+.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Một chiếc kẹp ghim dùng để đóng tài liệu giấy tờ",
        diagnosticTitle: "Dịch từ chữ 'staple' theo nghĩa chiếc ghim bấm văn phòng",
        explanation: "Trong thời trang, 'staple' mang nghĩa sản phẩm chủ lực thiết yếu, không phải cái dập ghim.",
      }
    },
    {
      id: "master_w9d3_q06",
      roundIndex: 5,
      prompt: "Chọn câu chuyển tiếp (Transition phrase) mượt mà nhất khi nói trong Part 2: 'Speaking of which, I [...] this particular blazer from Uniqlo because of their impeccable craftsmanship.'?",
      options: [
        { id: "opt_A", label: "A", text: "am eager to acquire" },
        { id: "opt_B", label: "B", text: "want to take" },
        { id: "opt_C", label: "C", text: "am liking to have" },
        { id: "opt_D", label: "D", text: "buy now" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. am eager to acquire",
      correctExplanation: "'Am eager to acquire' (rất khao khát sở hữu được) nâng cấp hoàn hảo cho cụm từ thông dụng 'want to buy', kết hợp 'impeccable craftsmanship' (kỹ nghệ gia công hoàn mỹ tinh xảo).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. want to take",
        diagnosticTitle: "Dùng từ ngữ vụng về 'want to take'",
        explanation: "'Take' không phải là từ chuẩn mực để nói về việc mua sắm trang phục.",
      }
    },
    {
      id: "master_w9d3_q07",
      roundIndex: 6,
      prompt: "Trong Part 1, khi giám khảo hỏi: 'What do you usually do on the weekend?', lỗi trả lời nào sau đây thường làm thí sinh bị kẹt ở Band 5.5?",
      options: [
        { id: "opt_A", label: "A", text: "Liệt kê một danh sách các động từ đơn điệu: 'On weekend I sleep, eat, watch movie, play game with friends and then sleep again' mà không có tính từ cảm xúc hay ngữ cảnh cụ thể" },
        { id: "opt_B", label: "B", text: "Nêu bật một hoạt động chính giúp nạp lại năng lượng tinh thần kèm lý do sâu sắc" },
        { id: "opt_C", label: "C", text: "Sử dụng trạng từ chỉ tần suất linh hoạt như 'More often than not'" },
        { id: "opt_D", label: "D", text: "Giữ ánh mắt tự tin và ngữ điệu tự nhiên" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Liệt kê một danh sách các động từ đơn điệu: 'On weekend I sleep, eat, watch movie, play game with friends and then sleep again' mà không có tính từ cảm xúc hay ngữ cảnh cụ thể",
      correctExplanation: "Lỗi liệt kê động từ nông cạn (Listing error): Liệt kê một chuỗi hành vi ăn-ngủ-nghỉ không có cảm xúc hay từ vựng nâng cao khiến câu trả lời bị đánh giá là sơ cấp và nhàm chán.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Sử dụng trạng từ chỉ tần suất linh hoạt như 'More often than not'",
        diagnosticTitle: "Coi trạng từ linh hoạt là lỗi sai",
        explanation: "'More often than not' là trạng từ học thuật rất hay thay thế cho 'usually'.",
      }
    },
    {
      id: "master_w9d3_q08",
      roundIndex: 7,
      prompt: "Từ 'impeccable' trong cụm 'impeccable tailoring and fit' đồng nghĩa với từ nào?",
      options: [
        { id: "opt_A", label: "A", text: "flawless hoàn hảo không tì vết" },
        { id: "opt_B", label: "B", text: "defective có nhiều lỗi hư hỏng" },
        { id: "opt_C", label: "C", text: "shoddy làm ẩu cẩu thả" },
        { id: "opt_D", label: "D", text: "tight quá chật chội" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. flawless hoàn hảo không tì vết",
      correctExplanation: "'Impeccable' (hoàn hảo, chỉn chu không một hạt sạn) đồng nghĩa với 'flawless' hoặc 'faultless'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. shoddy làm ẩu cẩu thả",
        diagnosticTitle: "Hiểu nhầm sang từ chỉ chất lượng kém cỏi",
        explanation: "'Shoddy' (làm ẩu) là từ trái nghĩa tiêu cực hoàn toàn của 'impeccable'.",
      }
    },
    {
      id: "master_w9d3_q09",
      roundIndex: 8,
      prompt: "Trong phòng thi IELTS Speaking, khi bước vào phòng và giám khảo chào: 'Good morning, my name is John. Can you tell me your full name, please?', thí sinh nên trả lời như thế nào là chuẩn nhất?",
      options: [
        { id: "opt_A", label: "A", text: "Mỉm cười thân thiện, trả lời rõ ràng tên đầy đủ và tên gọi thường ngày: 'Good morning John. My full name is Nguyen Van An, but you can call me An.'" },
        { id: "opt_B", label: "B", text: "Bắt đầu nói luôn một bài thuyết trình dài 5 phút về lịch sử đất nước Việt Nam" },
        { id: "opt_C", label: "C", text: "Ném chứng minh thư lên bàn và không nói một lời nào" },
        { id: "opt_D", label: "D", text: "Hỏi lại giám khảo xem giám khảo bao nhiêu tuổi" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Mỉm cười thân thiện, trả lời rõ ràng tên đầy đủ và tên gọi thường ngày: 'Good morning John. My full name is Nguyen Van An, but you can call me An.'",
      correctExplanation: "Phần kiểm tra ID và chào hỏi chỉ mang tính thủ tục hành chính: Trả lời lịch sự, rõ ràng, ngắn gọn và tự nhiên, tạo ấn tượng chuyên nghiệp đầu tiên cho giám khảo.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Bắt đầu nói luôn một bài thuyết trình dài 5 phút về lịch sử đất nước Việt Nam",
        diagnosticTitle: "Tự ý thuyết trình khi giám khảo chỉ đang kiểm tra họ tên",
        explanation: "Phần ID check chỉ cần trả lời đúng tên mình, nói quá nhiều sẽ bị giám khảo ngắt lời ngay lập tức.",
      }
    },
    {
      id: "master_w9d3_q10",
      roundIndex: 9,
      prompt: "Tổng kết triết lý luyện thi Master IELTS 6.0-6.5 của NextBand: Yếu tố nào giữ vai trò quyết định sự bứt phá từ Band 5.5 lên 6.5 vững chắc?",
      options: [
        { id: "opt_A", label: "A", text: "Sự kiểm soát toàn diện về tính chuẩn xác ngữ pháp Grammar Control, mạch lập luận chặt chẽ Progression và Cohesion, và từ vựng học thuật tự nhiên theo cụm collocation thay vì học vẹt từ đơn lẻ" },
        { id: "opt_B", label: "B", text: "Học thuộc lòng các mẹo vặt bấm máy tính và đoán mò đáp án mà không cần hiểu bài" },
        { id: "opt_C", label: "C", text: "Nhồi nhét thật nhiều từ vựng C2 quý hiếm vào câu dù sai ngữ cảnh" },
        { id: "opt_D", label: "D", text: "Cầu may vào một đề thi dễ bất ngờ" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Sự kiểm soát toàn diện về tính chuẩn xác ngữ pháp Grammar Control, mạch lập luận chặt chẽ Progression và Cohesion, và từ vựng học thuật tự nhiên theo cụm collocation thay vì học vẹt từ đơn lẻ",
      correctExplanation: "Tôn chỉ học thuật 'Control & Performance' của Master: Chuyển hóa tư duy từ chắp vá câu chữ sang kiểm soát toàn diện bài thi với sự chuẩn xác, mạch lạc và tự nhiên tối đa.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Nhồi nhét thật nhiều từ vựng C2 quý hiếm vào câu dù sai ngữ cảnh",
        diagnosticTitle: "Ảo tưởng rằng điểm số IELTS quyết định bởi việc nhồi nhét từ vựng C2",
        explanation: "Dùng từ khủng sai ngữ cảnh là nguyên nhân chính khiến thí sinh bị trừ nặng điểm Lexical Resource và Coherence.",
      }
    }
  ]
};
