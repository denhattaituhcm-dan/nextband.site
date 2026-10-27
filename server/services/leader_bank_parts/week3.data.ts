/**
 * LEADER ARENA QUESTION BANK - WEEK 3
 * Source: Giáo trình LEADER 2027 - Đã soát lỗi.docx & Giáo án Leader 2028 Teacher Guide
 * Target: IELTS Band 6.5 | Training 7.0–7.5
 * 
 * Day 1: Writing (Qualified Opinion Architecture / To What Extent / Horizontal Brainstorming / Elderly Workforce & Ecotourism)
 * Day 2: Speaking (Part 3 Societal Expansion / Stakeholders Thinking / Describe an Inspiring Leader or Role Model)
 * Day 3: Reading (Multiple Choice Distractor Deconstruction / Phylogenetics of Fairy Tales / Little Red Riding Hood)
 */

export const LEADER_WEEK_3_QUESTIONS: Record<string, any[]> = {
  "WEEK 3 – DAY 1": [
    {
      id: "leader_w3d1_q01",
      roundIndex: 0,
      prompt: "Trong dạng bài 'To what extent do you agree or disagree?', cấu trúc lập luận 'Qualified Opinion' (Quan điểm có điều kiện / Cân bằng có nhượng bộ) mang lại ưu thế vượt trội nào so với lối viết một chiều cực đoan?",
      options: [
        { id: "opt_A", label: "A", text: "Thể hiện tư duy phản biện đa chiều, công nhận các ngoại lệ thực tế và bảo vệ lập trường cốt lõi một cách thuyết phục và tinh tế" },
        { id: "opt_B", label: "B", text: "Giúp thí sinh không cần phải đưa ra bất kỳ kết luận nào ở cuối bài" },
        { id: "opt_C", label: "C", text: "Cho phép thí sinh đổi ý liên tục giữa các đoạn văn để người chấm tự đoán" },
        { id: "opt_D", label: "D", text: "Giảm độ dài bài thi xuống dưới 150 từ" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Thể hiện tư duy phản biện đa chiều, công nhận các ngoại lệ thực tế và bảo vệ lập trường cốt lõi một cách thuyết phục và tinh tế",
      correctExplanation: "Qualified Opinion (Band 7.0+): Tránh bẫy tuyệt đối hóa phiến diện. Người viết thừa nhận tính hợp lý trong một số trường hợp nhất định (40%), nhưng vẫn khẳng định lập trường trọng tâm (60%) với lập luận chặt chẽ.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Cho phép thí sinh đổi ý liên tục giữa các đoạn văn để người chấm tự đoán",
        diagnosticTitle: "Nhầm lẫn giữa quan điểm đa chiều và sự mâu thuẫn lập trường",
        explanation: "Qualified Opinion vẫn phải có lập trường nhất quán xuyên suốt (clear position throughout), không được đổi ý mâu thuẫn.",
      }
    },
    {
      id: "leader_w3d1_q02",
      roundIndex: 1,
      prompt: "Với đề bài: 'Some people believe that older people should continue to work if it is possible. Do the advantages outweigh the disadvantages?', câu mở bài nào thể hiện sự cân bằng nhượng bộ (40-60) chuẩn xác?",
      options: [
        { id: "opt_A", label: "A", text: "While prolonging the retirement age may occasionally hinder youth employment, I maintain that retaining senior workers offers far greater merits by mitigating national pension deficits and preserving invaluable institutional knowledge." },
        { id: "opt_B", label: "B", text: "Old people working has many good and bad points, and I will discuss both in this essay." },
        { id: "opt_C", label: "C", text: "Old people must stop working right now because young people need jobs." },
        { id: "opt_D", label: "D", text: "There are several advantages and disadvantages of old people working in companies." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. While prolonging the retirement age may occasionally hinder youth employment, I maintain that retaining senior workers offers far greater merits by mitigating national pension deficits and preserving invaluable institutional knowledge.",
      correctExplanation: "Thesis Statement xuất sắc: Mệnh đề nhượng bộ 'While prolonging the retirement age may occasionally hinder youth employment' (40%), vế chính khẳng định 'retaining senior workers offers far greater merits' (60%) kèm 2 trụ cột luận điểm sắc bén.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Old people working has many good and bad points, and I will discuss both in this essay.",
        diagnosticTitle: "Mở bài chung chung thiếu nhận định tỷ trọng (Outweigh)",
        explanation: "Đề bài hỏi 'Do advantages outweigh disadvantages', nếu chỉ nói 'có mặt tốt và xấu' mà không trả lời bên nào nặng hơn là chưa hoàn thành nhiệm vụ đề bài.",
      }
    },
    {
      id: "leader_w3d1_q03",
      roundIndex: 2,
      prompt: "Chọn luận điểm phân tích MẶT LỢI KINH TẾ VĨ MÔ của việc khuyến khích lao động cao tuổi tiếp tục cống hiến:",
      options: [
        { id: "opt_A", label: "A", text: "From a macroeconomic perspective, an active elderly workforce bolsters national tax revenues and significantly eases the burgeoning fiscal strain on public state pensions." },
        { id: "opt_B", label: "B", text: "Old people have fun when working and they don't stay at home watching TV." },
        { id: "opt_C", label: "C", text: "Companies can pay very cheap salaries to old workers to save cash." },
        { id: "opt_D", label: "D", text: "Old workers can cook good lunch for their younger colleagues in offices." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. From a macroeconomic perspective, an active elderly workforce bolsters national tax revenues and significantly eases the burgeoning fiscal strain on public state pensions.",
      correctExplanation: "Thuật ngữ kinh tế học cao cấp: 'macroeconomic perspective' (góc nhìn kinh tế vĩ mô), 'bolsters national tax revenues' (gia tăng nguồn thu thuế quốc gia), 'eases the burgeoning fiscal strain on public state pensions' (giảm bớt gánh nặng tài khóa ngày càng lớn lên quỹ hưu trí công).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Companies can pay very cheap salaries to old workers to save cash.",
        diagnosticTitle: "Lập luận phi đạo đức kinh doanh và thiếu cơ sở pháp lý",
        explanation: "Bóc lột lương người cao tuổi là lập luận tiêu cực, vi phạm luật lao động và đạo đức xã hội.",
      }
    },
    {
      id: "leader_w3d1_q04",
      roundIndex: 3,
      prompt: "Kỹ thuật 'Horizontal Brainstorming' (Động não theo chiều ngang) trong giáo án Leader giúp thí sinh điều gì?",
      options: [
        { id: "opt_A", label: "A", text: "Quét nhanh các khía cạnh phân tích qua lăng kính các bên liên quan như cá nhân, doanh nghiệp, xã hội, môi trường để tìm ra các góc nhìn đa dạng" },
        { id: "opt_B", label: "B", text: "Viết các câu văn theo chiều ngang từ lề trái sang lề phải thật nhanh" },
        { id: "opt_C", label: "C", text: "Chỉ tìm kiếm duy nhất một ý tưởng và lặp lại suốt 4 đoạn văn" },
        { id: "opt_D", label: "D", text: "Vẽ sơ đồ tư duy bằng nhiều màu sắc rực rỡ trong phòng thi" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Quét nhanh các khía cạnh phân tích qua lăng kính các bên liên quan như cá nhân, doanh nghiệp, xã hội, môi trường để tìm ra các góc nhìn đa dạng",
      correctExplanation: "Horizontal Brainstorming (Stakeholder Analysis): Tiếp cận vấn đề theo chiều ngang qua các nhóm đối tượng (Individuals, Corporations, Governments, Society) giúp người viết không bao giờ bị cạn kiệt ý tưởng.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Viết các câu văn theo chiều ngang từ lề trái sang lề phải thật nhanh",
        diagnosticTitle: "Hiểu chữ 'Horizontal' theo nghĩa vật lý của trang giấy",
        explanation: "'Horizontal' ở đây là mở rộng phạm vi đối tượng và lĩnh vực tư duy, không phải hướng viết chữ.",
      }
    },
    {
      id: "leader_w3d1_q05",
      roundIndex: 4,
      prompt: "Với đề bài: 'It is now possible for tourists to travel to remote environments, such as the South Pole. Do the advantages outweigh the disadvantages?', câu Topic Sentence nào cho Body 1 (Disadvantages - 40%) thể hiện sự nhìn nhận sắc bén?",
      options: [
        { id: "opt_A", label: "A", text: "Admittedly, the commercialization of polar tourism poses grave ecological hazards, including the disruption of fragile habitats and heightened carbon footprints from long-haul expeditions." },
        { id: "opt_B", label: "B", text: "Traveling to the South Pole is very cold and tourists can get frozen easily." },
        { id: "opt_C", label: "C", text: "First, going to remote places is bad because airplane tickets are very expensive." },
        { id: "opt_D", label: "D", text: "There are some negative things when tourists visit Antarctica in the winter." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Admittedly, the commercialization of polar tourism poses grave ecological hazards, including the disruption of fragile habitats and heightened carbon footprints from long-haul expeditions.",
      correctExplanation: "Từ vựng môi trường C1: 'commercialization of polar tourism' (thương mại hóa du lịch vùng cực), 'grave ecological hazards' (hiểm họa sinh thái nghiêm trọng), 'disruption of fragile habitats' (phá vỡ môi trường sống mong manh), 'heightened carbon footprints' (dấu chân carbon tăng vọt).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Traveling to the South Pole is very cold and tourists can get frozen easily.",
        diagnosticTitle: "Tập trung vào sự bất tiện thể chất cá nhân thay vì tác động sinh thái vĩ mô",
        explanation: "'Trời lạnh bị đóng băng' là chi tiết trải nghiệm cá nhân tầm thường, thiếu tầm nhìn môi trường học thuật.",
      }
    },
    {
      id: "leader_w3d1_q06",
      roundIndex: 5,
      prompt: "Chọn câu mở đoạn cho Body 2 (Advantages - 60%) để chứng minh lợi ích vượt trội của thám hiểm vùng cực:",
      options: [
        { id: "opt_A", label: "A", text: "Nonetheless, expeditions to extreme frontiers yield transformative benefits that eclipse these drawbacks, particularly in advancing scientific climate research and fostering deep environmental stewardship." },
        { id: "opt_B", label: "B", text: "However, going to South Pole is cool and people can take beautiful photos with penguins." },
        { id: "opt_C", label: "C", text: "On the other hand, rich people have money so they should travel wherever they like." },
        { id: "opt_D", label: "D", text: "Secondly, advantages are bigger than disadvantages for several reasons." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Nonetheless, expeditions to extreme frontiers yield transformative benefits that eclipse these drawbacks, particularly in advancing scientific climate research and fostering deep environmental stewardship.",
      correctExplanation: "Từ vựng phản biện xuất chúng: 'yield transformative benefits that eclipse these drawbacks' (mang lại những lợi ích mang tính biến đổi vượt xa các nhược điểm này), 'advancing scientific climate research' (thúc đẩy nghiên cứu khí hậu khoa học), 'fostering deep environmental stewardship' (nuôi dưỡng ý thức quản trị bảo vệ môi trường sâu sắc).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. However, going to South Pole is cool and people can take beautiful photos with penguins.",
        diagnosticTitle: "Lối tư duy du lịch chụp ảnh 'sống ảo' nông cạn",
        explanation: "Chụp ảnh với chim cánh cụt là lợi ích giải trí tầm thường, không thể làm đối trọng vượt trội với hiểm họa môi trường.",
      }
    },
    {
      id: "leader_w3d1_q07",
      roundIndex: 6,
      prompt: "Cụm từ 'institutional knowledge' trong ngữ cảnh quản trị nhân lực chỉ điều gì?",
      options: [
        { id: "opt_A", label: "A", text: "Kho tàng tri thức, kinh nghiệm thực tiễn và bí quyết vận hành quý báu được tích lũy lâu năm bởi các nhân sự kỳ cựu trong tổ chức" },
        { id: "opt_B", label: "B", text: "Những cuốn sách giáo khoa được lưu giữ trong thư viện trường đại học" },
        { id: "opt_C", label: "C", text: "Các văn bản quy phạm pháp luật do chính phủ ban hành" },
        { id: "opt_D", label: "D", text: "Mật khẩu máy tính của phòng công nghệ thông tin" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Kho tàng tri thức, kinh nghiệm thực tiễn và bí quyết vận hành quý báu được tích lũy lâu năm bởi các nhân sự kỳ cựu trong tổ chức",
      correctExplanation: "'Institutional knowledge' (tri thức tổ chức / vốn kinh nghiệm nội bộ tích lũy) là khái niệm quản trị nhân sự cao cấp để giải thích tại sao không thể tùy tiện sa thải hoặc cho nghỉ hưu sớm các chuyên gia kỳ cựu.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Những cuốn sách giáo khoa được lưu giữ trong thư viện trường đại học",
        diagnosticTitle: "Dịch từ chữ 'institution' theo nghĩa hẹp là trường học hay thư viện",
        explanation: "Trong bối cảnh doanh nghiệp và tổ chức, 'institutional knowledge' là tài sản trí tuệ vô hình của đội ngũ.",
      }
    },
    {
      id: "leader_w3d1_q08",
      roundIndex: 7,
      prompt: "Chọn câu viết lại chuẩn học thuật cho: 'Banning smoking in public places helps protect non-smokers from getting sick.'?",
      options: [
        { id: "opt_A", label: "A", text: "Prohibiting tobacco smoking in communal spaces shields non-smokers from the proven carcinogens of passive inhalation." },
        { id: "opt_B", label: "B", text: "Stopping cigarettes in public makes other people do not breathe bad smoke and get ill." },
        { id: "opt_C", label: "C", text: "Smoking ban is good so people who do not smoke stay healthy." },
        { id: "opt_D", label: "D", text: "If smokers are banned, non-smokers will not go to hospitals." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Prohibiting tobacco smoking in communal spaces shields non-smokers from the proven carcinogens of passive inhalation.",
      correctExplanation: "Từ vựng y khoa chính xác: 'shields non-smokers' (bảo vệ người không hút thuốc), 'proven carcinogens' (các chất sinh ung thư đã được chứng minh), 'passive inhalation' (việc hít phải khói thuốc thụ động).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Stopping cigarettes in public makes other people do not breathe bad smoke and get ill.",
        diagnosticTitle: "Dùng từ ngữ vụng về 'bad smoke' thay vì thuật ngữ khoa học",
        explanation: "'Bad smoke' là từ vựng trẻ con; văn phong học thuật phải dùng 'passive smoking' hoặc 'second-hand smoke'.",
      }
    },
    {
      id: "leader_w3d1_q09",
      roundIndex: 8,
      prompt: "Trong cấu trúc bài luận 40-60, tỷ lệ độ dài và chiều sâu giữa Body 1 và Body 2 nên được phân bổ như thế nào?",
      options: [
        { id: "opt_A", label: "A", text: "Body 2 (60% lập trường chính) phải dài hơn, phân tích sâu sắc hơn và có bằng chứng thuyết phục vượt trội so với đoạn nhượng bộ Body 1 (40%)" },
        { id: "opt_B", label: "B", text: "Body 1 dài gấp ba lần Body 2" },
        { id: "opt_C", label: "C", text: "Cả hai Body phải đếm đúng từng chữ bằng nhau 100%" },
        { id: "opt_D", label: "D", text: "Body 2 chỉ cần viết đúng một câu cảm thán ngắn" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Body 2 (60% lập trường chính) phải dài hơn, phân tích sâu sắc hơn và có bằng chứng thuyết phục vượt trội so với đoạn nhượng bộ Body 1 (40%)",
      correctExplanation: "Quy tắc kiến trúc Leader: Đoạn bảo vệ quan điểm chính (60%) bắt buộc phải chiếm tỷ trọng lớn hơn về dung lượng từ (khoảng 110-130 từ so với 80-90 từ của Body 1) và có chuỗi lập luận Why -> Result sâu sắc hơn.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Cả hai Body phải đếm đúng từng chữ bằng nhau 100%",
        diagnosticTitle: "Ám ảnh hình thức đối xứng cơ học cứng nhắc",
        explanation: "Viết bằng nhau chằn chặn khiến bài luận thiếu trọng tâm, không làm nổi bật được bên nào là quan điểm áp đảo.",
      }
    },
    {
      id: "leader_w3d1_q10",
      roundIndex: 9,
      prompt: "Chọn câu Kết luận (Conclusion) chuẩn Leader khẳng định sự vượt trội của lợi ích du lịch vùng cực:",
      options: [
        { id: "opt_A", label: "A", text: "In conclusion, while polar tourism undeniably incurs environmental footprints, its indispensable role in raising global ecological consciousness and funding vital scientific endeavors renders its advantages substantially more pronounced." },
        { id: "opt_B", label: "B", text: "In conclusion, going to the South Pole is dangerous but tourists should keep going there." },
        { id: "opt_C", label: "C", text: "To sum up, benefits are bigger than drawbacks and Antarctica is very beautiful." },
        { id: "opt_D", label: "D", text: "All in all, tourism at remote places is good and bad at the same time." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. In conclusion, while polar tourism undeniably incurs environmental footprints, its indispensable role in raising global ecological consciousness and funding vital scientific endeavors renders its advantages substantially more pronounced.",
      correctExplanation: "Kết bài mẫu mực: Tóm tắt nhượng bộ 'while polar tourism undeniably incurs environmental footprints', khẳng định sự áp đảo 'renders its advantages substantially more pronounced' thông qua hai trụ cột 'raising global ecological consciousness' và 'funding vital scientific endeavors'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. All in all, tourism at remote places is good and bad at the same time.",
        diagnosticTitle: "Kết bài ba phải không giải quyết câu hỏi Outweigh",
        explanation: "Nói 'vừa tốt vừa xấu cùng một lúc' là thất bại trong việc chốt hạ câu hỏi 'Do advantages outweigh disadvantages'.",
      }
    }
  ],

  "WEEK 3 – DAY 2": [
    {
      id: "leader_w3d2_q01",
      roundIndex: 0,
      prompt: "Sự khác biệt bản chất mang tính quyết định giữa câu hỏi Speaking Part 1 và Speaking Part 3 là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Part 1 tập trung vào trải nghiệm và thói quen cá nhân mang tính đời thường; còn Part 3 yêu cầu thảo luận các vấn đề trừu tượng mang tầm vóc xã hội học sâu rộng" },
        { id: "opt_B", label: "B", text: "Part 3 yêu cầu thí sinh nói nhỏ hơn Part 1" },
        { id: "opt_C", label: "C", text: "Part 1 nói về tương lai, còn Part 3 nói về quá khứ" },
        { id: "opt_D", label: "D", text: "Hai phần này hoàn toàn giống hệt nhau về nội dung và tiêu chí" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Part 1 tập trung vào trải nghiệm và thói quen cá nhân mang tính đời thường; còn Part 3 yêu cầu thảo luận các vấn đề trừu tượng mang tầm vóc xã hội học sâu rộng",
      correctExplanation: "Bản chất Part 3: Giám khảo đánh giá khả năng tranh luận học thuật trừu tượng. Thí sinh Band 5.5 chỉ biết trả lời 'I, my family', trong khi thí sinh Band 7.0+ biết khái quát hóa vấn đề dưới góc nhìn 'society, demographic groups, governance'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. Hai phần này hoàn toàn giống hệt nhau về nội dung và tiêu chí",
        diagnosticTitle: "Áp dụng thói quen trả lời Part 1 cá nhân vào câu hỏi Part 3",
        explanation: "Trả lời Part 3 bằng chuyện cá nhân của tôi ('When I eat, I like...') sẽ bị trừ điểm vì không đạt tính khái quát xã hội.",
      }
    },
    {
      id: "leader_w3d2_q02",
      roundIndex: 1,
      prompt: "Khi nhận câu hỏi Part 3: 'Is food served in restaurants better than homemade food?', câu trả lời nào sau đây áp dụng tư duy các bên liên quan (Stakeholder & Contextual thinking) đạt chuẩn 7.0+?",
      options: [
        { id: "opt_A", label: "A", text: "It depends largely on whether one prioritizes culinary craftsmanship or nutritional integrity. While upscale eateries offer sophisticated gastronomic experiences, home-cooked meals remain unrivaled in terms of wholesome ingredients and tailored dietary control." },
        { id: "opt_B", label: "B", text: "Restaurant food is better because restaurants have famous chefs and pizza is very delicious." },
        { id: "opt_C", label: "C", text: "I like my mom's cooking because my mom cooks very well." },
        { id: "opt_D", label: "D", text: "Both are okay, food is food and we eat to survive." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. It depends largely on whether one prioritizes culinary craftsmanship or nutritional integrity. While upscale eateries offer sophisticated gastronomic experiences, home-cooked meals remain unrivaled in terms of wholesome ingredients and tailored dietary control.",
      correctExplanation: "Tư duy phân tích bối cảnh đỉnh cao: đối sánh 'culinary craftsmanship' (tay nghề ẩm thực) tại các nhà hàng cao cấp với 'nutritional integrity and tailored dietary control' (tính nguyên bản dinh dưỡng và sự kiểm soát khẩu phần) của bữa cơm gia đình.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. I like my mom's cooking because my mom cooks very well.",
        diagnosticTitle: "Bẫy cá nhân hóa câu hỏi xã hội trong Part 3",
        explanation: "Đề hỏi bức tranh chung của xã hội, trả lời 'tôi thích cơm mẹ nấu' thể hiện sự non nớt ở Band 5.0.",
      }
    },
    {
      id: "leader_w3d2_q03",
      roundIndex: 2,
      prompt: "Trong Speaking Part 2 với chủ đề: 'Describe an inspiring leader or role model who has positively influenced you', phẩm chất lãnh đạo nào sau đây được diễn đạt bằng ngôn ngữ học thuật sắc nét nhất?",
      options: [
        { id: "opt_A", label: "A", text: "She possesses an extraordinary visionary acumen coupled with empathetic tenacity, which galvanizes the entire team to surmount unprecedented challenges." },
        { id: "opt_B", label: "B", text: "He is a very good boss who gives us a lot of money and never shouts at staff." },
        { id: "opt_C", label: "C", text: "She is a beautiful leader having modern clothes and expensive cars." },
        { id: "opt_D", label: "D", text: "He speaks very loudly so all employees must listen carefully." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. She possesses an extraordinary visionary acumen coupled with empathetic tenacity, which galvanizes the entire team to surmount unprecedented challenges.",
      correctExplanation: "Collocation C2 đỉnh cao về lãnh đạo: 'visionary acumen' (sự nhạy bén có tầm nhìn xa trông rộng), 'empathetic tenacity' (sự bền bỉ đầy thấu cảm), 'galvanizes the entire team to surmount unprecedented challenges' (truyền cảm hứng thúc đẩy toàn đội vượt qua những thử thách chưa từng có).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. He is a very good boss who gives us a lot of money and never shouts at staff.",
        diagnosticTitle: "Mô tả tính cách lãnh đạo bằng lối nói nôm na vụng về",
        explanation: "'Gives money and never shouts' là góc nhìn của nhân viên bình dân, không làm nổi bật được phẩm chất lãnh đạo học thuật.",
      }
    },
    {
      id: "leader_w3d2_q04",
      roundIndex: 3,
      prompt: "Khi giám khảo hỏi Part 3: 'What qualities make an effective leader in the 21st century?', câu trả lời nào sau đây chỉ ra sự chuyển dịch từ phong cách chuyên quyền sang lãnh đạo thấu cảm?",
      options: [
        { id: "opt_A", label: "A", text: "In this era of rapid disruption, authoritarian hierarchy has become obsolete. Contemporary leaders must cultivate high emotional intelligence and agile decision-making to foster psychological safety within diverse teams." },
        { id: "opt_B", label: "B", text: "Leaders must be very strict and punish anyone who makes mistakes." },
        { id: "opt_C", label: "C", text: "A leader just needs to have high degrees from Harvard University." },
        { id: "opt_D", label: "D", text: "Leaders in the 21st century only need to know how to use computers." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. In this era of rapid disruption, authoritarian hierarchy has become obsolete. Contemporary leaders must cultivate high emotional intelligence and agile decision-making to foster psychological safety within diverse teams.",
      correctExplanation: "Tư duy lãnh đạo hiện đại: 'authoritarian hierarchy has become obsolete' (hệ thống thứ bậc chuyên quyền đã lỗi thời), 'high emotional intelligence and agile decision-making' (trí tuệ cảm xúc cao và khả năng ra quyết định linh hoạt), 'foster psychological safety' (kiến tạo sự an toàn tâm lý cho đội nhóm).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Leaders must be very strict and punish anyone who makes mistakes.",
        diagnosticTitle: "Cổ súy mô hình quản lý chuyên quyền cổ hủ",
        explanation: "Mô hình trừng phạt khắt khe đi ngược lại lý thuyết quản trị hiện đại trong các tài liệu Cambridge.",
      }
    },
    {
      id: "leader_w3d2_q05",
      roundIndex: 4,
      prompt: "Từ 'galvanize' trong câu: 'Her impassioned speech served to galvanize the community into taking collective environmental action' mang nghĩa là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Kích hoạt, truyền cảm hứng và thôi thúc mọi người cùng đồng lòng hành động ngay lập tức" },
        { id: "opt_B", label: "B", text: "Mạ một lớp kẽm kim loại lên bề mặt sắt thép" },
        { id: "opt_C", label: "C", text: "Làm cho đám đông trở nên sợ hãi và bỏ chạy" },
        { id: "opt_D", label: "D", text: "Làm dịu cơn giận dữ của đối phương" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Kích hoạt, truyền cảm hứng và thôi thúc mọi người cùng đồng lòng hành động ngay lập tức",
      correctExplanation: "'Galvanize' trong ngữ cảnh lãnh đạo và xã hội mang nghĩa bóng: đánh thức ngọn lửa nhiệt huyết, kích thích một tập thể hành động quyết liệt (inspire to immediate action).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Mạ một lớp kẽm kim loại lên bề mặt sắt thép",
        diagnosticTitle: "Dịch theo nghĩa kỹ thuật hóa học thuần túy",
        explanation: "Trong văn cảnh xã hội học, 'galvanize' là động từ biểu tượng, không phải kỹ thuật mạ kẽm.",
      }
    },
    {
      id: "leader_w3d2_q06",
      roundIndex: 5,
      prompt: "Chọn câu trả lời Part 3 về chủ đề 'Life goals' thể hiện khả năng sử dụng mệnh đề danh từ (Noun Clause) xuất sắc:",
      options: [
        { id: "opt_A", label: "A", text: "What shifted most fundamentally between my childhood and adulthood is how I define success; I no longer equate it with material accumulation, but rather with personal fulfillment and societal contribution." },
        { id: "opt_B", label: "B", text: "My goals changed because when I was young I wanted toys, now I want money." },
        { id: "opt_C", label: "C", text: "I have changed my goals many times in my life." },
        { id: "opt_D", label: "D", text: "Children and adults have different goals because of age." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. What shifted most fundamentally between my childhood and adulthood is how I define success; I no longer equate it with material accumulation, but rather with personal fulfillment and societal contribution.",
      correctExplanation: "Cấu trúc kép mệnh đề danh ngữ: 'What shifted most fundamentally... is how I define success', kết hợp cấu trúc tương phản tinh tế 'no longer equate with material accumulation, but rather with personal fulfillment'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. My goals changed because when I was young I wanted toys, now I want money.",
        diagnosticTitle: "Cách diễn đạt thô sơ và tư duy vật chất vụn vặt",
        explanation: "'Muốn đồ chơi -> muốn tiền' là lối tư duy trẻ con ở mức Band 5.0.",
      }
    },
    {
      id: "leader_w3d2_q07",
      roundIndex: 6,
      prompt: "Khi nói về sự ảnh hưởng của một người lãnh đạo truyền cảm hứng lên phong cách làm việc của bản thân, cụm thành ngữ nào thể hiện sự noi gương rõ nhất?",
      options: [
        { id: "opt_A", label: "A", text: "I continually strive to emulate her exemplary work ethic and composure under immense pressure." },
        { id: "opt_B", label: "B", text: "I copy everything she does like a photocopy machine." },
        { id: "opt_C", label: "C", text: "I try to be her twin sister in the office." },
        { id: "opt_D", label: "D", text: "I follow her steps on the ground every day." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. I continually strive to emulate her exemplary work ethic and composure under immense pressure.",
      correctExplanation: "'Strive to emulate' (nỗ lực học tập và noi gương), 'exemplary work ethic' (đạo đức nghề nghiệp mẫu mực), 'composure under immense pressure' (sự điềm tĩnh vững vàng dưới áp lực ngút ngàn).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. I copy everything she does like a photocopy machine.",
        diagnosticTitle: "Dùng từ ngữ thô thiển 'copy like a photocopy machine'",
        explanation: "So sánh sao chép như máy photocopy làm mất đi tính trang trọng và giá trị tinh thần của việc noi gương.",
      }
    },
    {
      id: "leader_w3d2_q08",
      roundIndex: 7,
      prompt: "Trong Part 3, khi giám khảo hỏi câu hỏi đối sánh: 'Do men and women possess different leadership styles?', cách trả lời nào tránh được bẫy định kiến giới tính lỗi thời (Gender stereotyping)?",
      options: [
        { id: "opt_A", label: "A", text: "Rather than inherent gender biological traits, leadership approaches are largely dictated by organizational culture and individual personality; effective governance transcends gender boundaries." },
        { id: "opt_B", label: "B", text: "Yes, women are always too emotional and men are always strong and aggressive." },
        { id: "opt_C", label: "C", text: "Men are naturally born to lead, women are born to follow." },
        { id: "opt_D", label: "D", text: "Women cannot be leaders because they have to take care of babies." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Rather than inherent gender biological traits, leadership approaches are largely dictated by organizational culture and individual personality; effective governance transcends gender boundaries.",
      correctExplanation: "Quan điểm tiến bộ học thuật: Bác bỏ định kiến giới lỗi thời, chỉ ra rằng phong cách lãnh đạo phụ thuộc vào 'organizational culture and individual personality' và 'effective governance transcends gender boundaries' (năng lực quản trị vượt qua ranh giới giới tính).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Yes, women are always too emotional and men are always strong and aggressive.",
        diagnosticTitle: "Sập bẫy định kiến giới tính tiêu cực (Sexist stereotyping)",
        explanation: "Phát biểu phụ nữ quá cảm tính và đàn ông luôn hung hăng là định kiến nông cạn, bị coi là thiếu tư duy văn minh trong bài thi quốc tế.",
      }
    },
    {
      id: "leader_w3d2_q09",
      roundIndex: 8,
      prompt: "Cụm từ 'servant leadership' trong khoa học quản trị hiện đại có nghĩa là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Triết lý lãnh đạo phục vụ, trong đó nhà lãnh đạo đặt nhu cầu phát triển và phúc lợi của đội ngũ nhân viên lên trước lợi ích cá nhân" },
        { id: "opt_B", label: "B", text: "Việc người lãnh đạo phải kiêm luôn công việc dọn dẹp vệ sinh phòng làm việc" },
        { id: "opt_C", label: "C", text: "Một hệ thống nơi nhân viên bị đối xử như người hầu trong cung điện" },
        { id: "opt_D", label: "D", text: "Lãnh đạo của một công ty chuyên cung cấp dịch vụ người giúp việc" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Triết lý lãnh đạo phục vụ, trong đó nhà lãnh đạo đặt nhu cầu phát triển và phúc lợi của đội ngũ nhân viên lên trước lợi ích cá nhân",
      correctExplanation: "'Servant leadership' (Lãnh đạo phục vụ) là một trường phái quản trị tiên tiến do Robert K. Greenleaf sáng lập, đề cao sự nâng đỡ, trao quyền và phục vụ cộng đồng.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Việc người lãnh đạo phải kiêm luôn công việc dọn dẹp vệ sinh phòng làm việc",
        diagnosticTitle: "Dịch từ chữ 'servant' theo nghĩa đen người quét dọn",
        explanation: "Đây là thuật ngữ ẩn dụ quản trị học, không phải công việc tạp vụ.",
      }
    },
    {
      id: "leader_w3d2_q10",
      roundIndex: 9,
      prompt: "Để tạo sự liên kết tự nhiên khi chuyển ý trong Speaking Part 3, cụm liên từ nào sau đây mang tính học thuật trang trọng nhất?",
      options: [
        { id: "opt_A", label: "A", text: "Taking that into consideration, another dimension worth exploring is..." },
        { id: "opt_B", label: "B", text: "And then, I also want to tell you that..." },
        { id: "opt_C", label: "C", text: "Next idea in my brain is..." },
        { id: "opt_D", label: "D", text: "Plus that, hear me say this..." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Taking that into consideration, another dimension worth exploring is...",
      correctExplanation: "'Taking that into consideration, another dimension worth exploring is...' (Cân nhắc yếu tố đó, một khía cạnh khác rất đáng để đào sâu phân tích là...) thể hiện sự uyển chuyển và phong thái đĩnh đạc của một học giả Band 7.5+.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. And then, I also want to tell you that...",
        diagnosticTitle: "Dùng từ nối khẩu ngữ và xưng hô giao tiếp",
        explanation: "'And then I want to tell you' là câu nói chuyện thân mật, không phù hợp cho phần thảo luận chuyên sâu Part 3.",
      }
    }
  ],

  "WEEK 3 – DAY 3": [
    {
      id: "leader_w3d3_q01",
      roundIndex: 0,
      prompt: "Trong bài đọc về nghiên cứu nguồn gốc truyện cổ tích của nhà nhân chủng học Jamie Tehrani, ông đã áp dụng phương pháp nghiên cứu nào vốn thuộc về ngành Sinh học?",
      options: [
        { id: "opt_A", label: "A", text: "Phương pháp phân tích phát sinh loài học Phylogenetic analysis dựa trên cây tiến hóa sinh học để truy vết nguồn gốc và sự biến đổi của các câu chuyện dân gian qua hàng nghìn năm" },
        { id: "opt_B", label: "B", text: "Kỹ thuật tách chiết ADN từ các trang sách cổ" },
        { id: "opt_C", label: "C", text: "Kính hiển vi điện tử để quét bụi trên các bản thảo viết tay" },
        { id: "opt_D", label: "D", text: "Nuôi cấy vi khuẩn trên các cuốn truyện tranh cổ tích" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Phương pháp phân tích phát sinh loài học Phylogenetic analysis dựa trên cây tiến hóa sinh học để truy vết nguồn gốc và sự biến đổi của các câu chuyện dân gian qua hàng nghìn năm",
      correctExplanation: "Văn bản giải thích: Jamie Tehrani đã mượn 'phylogenetic methods' (phân tích phát sinh loài) của các nhà sinh học tiến hóa, coi các dị bản truyện dân gian như các loài sinh vật để xây dựng cây tiến hóa phả hệ.",
      timeLimitSeconds: 25,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Kỹ thuật tách chiết ADN từ các trang sách cổ",
        diagnosticTitle: "Hiểu theo nghĩa đen kỹ thuật sinh học phân tử phòng thí nghiệm",
        explanation: "Phương pháp được ứng dụng là mô hình thuật toán toán học thống kê cây phả hệ, không phải việc trích ADN vật lý từ giấy sách.",
      }
    },
    {
      id: "leader_w3d3_q02",
      roundIndex: 1,
      prompt: "Nghiên cứu của Tehrani về câu chuyện 'Cô bé quàng khăn đỏ' (Little Red Riding Hood) đã bác bỏ giả thuyết phổ biến nào trước đó?",
      options: [
        { id: "opt_A", label: "A", text: "Bác bỏ giả thuyết cho rằng câu chuyện này có nguồn gốc xuất phát từ phương Đông như Trung Quốc trước khi du nhập sang châu Âu" },
        { id: "opt_B", label: "B", text: "Bác bỏ nhận định rằng câu chuyện này có sự xuất hiện của chó sói" },
        { id: "opt_C", label: "C", text: "Khẳng định rằng trẻ em ngày nay không còn thích đọc truyện cổ tích" },
        { id: "opt_D", label: "D", text: "Bác bỏ việc truyện cổ tích được truyền miệng" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Bác bỏ giả thuyết cho rằng câu chuyện này có nguồn gốc xuất phát từ phương Đông như Trung Quốc trước khi du nhập sang châu Âu",
      correctExplanation: "Phân tích phát sinh loài chứng minh dị bản châu Á (The Tiger Grandmother) thực chất bắt nguồn từ châu Âu truyền sang qua Con đường Tơ lụa, chứ không phải truyện châu Âu bắt nguồn từ Trung Quốc như nhiều học giả từng lầm tưởng.",
      timeLimitSeconds: 25,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Bác bỏ nhận định rằng câu chuyện này có sự xuất hiện của chó sói",
        diagnosticTitle: "Hiểu sai cốt truyện văn học cơ bản",
        explanation: "Nhân vật chó sói hay thú dữ là trung tâm của câu chuyện, không hề bị bác bỏ.",
      }
    },
    {
      id: "leader_w3d3_q03",
      roundIndex: 2,
      prompt: "Trong bài thi Listening và Reading, bẫy Distractor 'Half-truth' (Nửa sự thật) được người ra đề thiết kế tinh vi như thế nào?",
      options: [
        { id: "opt_A", label: "A", text: "Một nửa câu trùng khớp 100% với bài nghe hoặc đọc, nhưng nửa còn lại bị đảo lộn điều kiện nguyên nhân, thời gian hoặc đối tượng thụ hưởng" },
        { id: "opt_B", label: "B", text: "Tất cả các từ trong đáp án đều là tiếng nước ngoài" },
        { id: "opt_C", label: "C", text: "Đáp án chỉ có đúng hai chữ cái" },
        { id: "opt_D", label: "D", text: "Đáp án bị làm mờ mực in" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Một nửa câu trùng khớp 100% với bài nghe hoặc đọc, nhưng nửa còn lại bị đảo lộn điều kiện nguyên nhân, thời gian hoặc đối tượng thụ hưởng",
      correctExplanation: "Bẫy Half-truth kinh điển: Người ra đề mượn 80% từ ngữ trong bài để ru ngủ thí sinh, nhưng vế sau lén thay đổi một hạn định (ví dụ: 'for adults' thay vì 'for children') khiến câu trở nên sai hoàn toàn.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Đáp án chỉ có đúng hai chữ cái",
        diagnosticTitle: "Suy đoán hình thức cơ học",
        explanation: "Bẫy nằm ở bản chất logic ngữ nghĩa, không phải số lượng chữ cái.",
      }
    },
    {
      id: "leader_w3d3_q04",
      roundIndex: 3,
      prompt: "Theo lý thuyết của nhà nghiên cứu Jack Zipes được đề cập trong bài, giá trị tiến hóa xã hội cốt lõi của các câu chuyện cổ tích dân gian đối với trẻ nhỏ là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Chúng cung cấp một môi trường tâm lý an toàn giúp trẻ em học cách nhận diện mối nguy hiểm và tôi luyện khả năng đối mặt với nỗi sợ hãi" },
        { id: "opt_B", label: "B", text: "Giúp trẻ em ngủ nhanh hơn vào buổi tối để cha mẹ làm việc" },
        { id: "opt_C", label: "C", text: "Dạy trẻ em kỹ thuật săn bắn động vật hoang dã trong rừng" },
        { id: "opt_D", label: "D", text: "Khuyến khích trẻ em bỏ nhà đi khám phá một mình" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Chúng cung cấp một môi trường tâm lý an toàn giúp trẻ em học cách nhận diện mối nguy hiểm và tôi luyện khả năng đối mặt với nỗi sợ hãi",
      correctExplanation: "Văn bản khẳng định: truyện cổ tích không đơn thuần là giải trí mà là 'a safe way of learning to deal with fear' - công cụ giáo dục sinh tồn tâm lý giúp trẻ rèn luyện phản ứng trước hiểm họa giả định.",
      timeLimitSeconds: 25,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Giúp trẻ em ngủ nhanh hơn vào buổi tối để cha mẹ làm việc",
        diagnosticTitle: "Đánh đồng truyện cổ tích với công cụ ru ngủ đơn thuần",
        explanation: "Nghiên cứu học thuật phân tích giá trị tâm lý học tiến hóa, không phải việc ru ngủ.",
      }
    },
    {
      id: "leader_w3d3_q05",
      roundIndex: 4,
      prompt: "Trong phần thi Listening Section 3 hoặc 4, khi người nói dùng từ chuyển hướng 'However, on closer inspection...', thông tin phát ra ngay sau đó thường là:",
      options: [
        { id: "opt_A", label: "A", text: "Thông tin đính chính hoặc sự thật chính xác lật ngược lại nhận định ban đầu, thường chứa đáp án đúng" },
        { id: "opt_B", label: "B", text: "Một câu nói đùa vui không quan trọng" },
        { id: "opt_C", label: "C", text: "Dấu hiệu thông báo bài thi kết thúc" },
        { id: "opt_D", label: "D", text: "Tên của người dẫn chương trình" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Thông tin đính chính hoặc sự thật chính xác lật ngược lại nhận định ban đầu, thường chứa đáp án đúng",
      correctExplanation: "Quy luật 'Auditory Self-Correction Trap': Người nói thường đưa ra thông tin bẫy ở câu đầu, sau đó dùng các cụm lật hướng như 'on closer inspection', 'actually', 'in fact' để chốt hạ đáp án thật.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Một câu nói đùa vui không quan trọng",
        diagnosticTitle: "Bỏ lỡ tín hiệu đổi hướng then chốt trong bài nghe",
        explanation: "Bỏ qua các tín hiệu chuyển hướng là lý do chính khiến thí sinh bị lỡ mất đáp án sau khi vừa nghe thấy từ khóa quen thuộc ở vế trước.",
      }
    },
    {
      id: "leader_w3d3_q06",
      roundIndex: 5,
      prompt: "Từ 'phylogenetic' trong cụm 'phylogenetic tree of folklore' có nguồn gốc từ tiếng Hy Lạp chỉ điều gì?",
      options: [
        { id: "opt_A", label: "A", text: "Cây phát sinh loài thể hiện mối quan hệ tiến hóa và nguồn gốc lịch sử giữa các nhánh" },
        { id: "opt_B", label: "B", text: "Một loài cây lấy gỗ quý hiếm trong rừng Amazon" },
        { id: "opt_C", label: "C", text: "Cuốn sách tập hợp các bài thơ tình cổ điển" },
        { id: "opt_D", label: "D", text: "Hệ thống tưới nước tự động trong nông nghiệp" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Cây phát sinh loài thể hiện mối quan hệ tiến hóa và nguồn gốc lịch sử giữa các nhánh",
      correctExplanation: "'Phylogenetic' (phylum - nhánh/loài + genesis - nguồn gốc sinh thành) là thuật ngữ chỉ lịch sử phát sinh loài và mối quan hệ tiến hóa giữa các nhánh sinh học.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Một loài cây lấy gỗ quý hiếm trong rừng Amazon",
        diagnosticTitle: "Dịch chữ 'tree' theo nghĩa cái cây gỗ thực vật",
        explanation: "'Phylogenetic tree' là sơ đồ phân nhánh hình cây (dendrogram), không phải cây lấy gỗ thực vật.",
      }
    },
    {
      id: "leader_w3d3_q07",
      roundIndex: 6,
      prompt: "Khi làm bài thi Reading với câu hỏi Multiple Choice có 4 lựa chọn, chiến thuật xử lý tối ưu của học viên Leader là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Đọc hiểu câu hỏi, quét văn bản để nắm vững ý nghĩa gốc, sau đó chủ động loại trừ 3 phương án nhiễu bằng chứng cứ rõ ràng trước khi chốt đáp án" },
        { id: "opt_B", label: "B", text: "Nhìn vào 4 lựa chọn trước và chọn ngay phương án nào có từ ngữ giống hệt bài đọc" },
        { id: "opt_C", label: "C", text: "Chọn phương án B cho tất cả các câu để đảm bảo xác suất" },
        { id: "opt_D", label: "D", text: "Đếm số lượng chữ cái của từng đáp án và chọn câu dài nhất" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Đọc hiểu câu hỏi, quét văn bản để nắm vững ý nghĩa gốc, sau đó chủ động loại trừ 3 phương án nhiễu bằng chứng cứ rõ ràng trước khi chốt đáp án",
      correctExplanation: "Phương pháp 'Process of Elimination': Tìm ra lỗi sai cụ thể của 3 phương án bẫy (sai thông tin, không được nhắc đến, hoặc suy diễn quá đà) là con đường duy nhất đạt độ chính xác 100% trong Multiple Choice.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Nhìn vào 4 lựa chọn trước và chọn ngay phương án nào có từ ngữ giống hệt bài đọc",
        diagnosticTitle: "Mắc bẫy từ khóa bề mặt (Superficial word-matching trap)",
        explanation: "Phương án có chữ giống hệt bài đọc thường là bẫy mượn từ ngữ (word trap) của người ra đề Cambridge.",
      }
    },
    {
      id: "leader_w3d3_q08",
      roundIndex: 7,
      prompt: "Từ 'oral tradition' trong nghiên cứu văn học dân gian có nghĩa là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Truyền thống truyền miệng, nơi tri thức và câu chuyện được truyền qua các thế hệ bằng lời nói mà không qua văn bản in ấn" },
        { id: "opt_B", label: "B", text: "Việc khám và chữa bệnh răng miệng của các nha sĩ" },
        { id: "opt_C", label: "C", text: "Một cuộc thi hùng biện tiếng Anh hàng năm" },
        { id: "opt_D", label: "D", text: "Thói quen ăn uống trong các dịp lễ hội truyền thống" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Truyền thống truyền miệng, nơi tri thức và câu chuyện được truyền qua các thế hệ bằng lời nói mà không qua văn bản in ấn",
      correctExplanation: "'Oral tradition' (văn học truyền miệng / truyền thống truyền khẩu) là khái niệm nhân chủng học chỉ văn hóa truyền thừa qua lời kể, ca dao, huyền thoại từ đời này sang đời khác.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Việc khám và chữa bệnh răng miệng của các nha sĩ",
        diagnosticTitle: "Dịch từ 'oral' theo nghĩa y tế răng miệng",
        explanation: "'Oral' trong ngôn ngữ học và nhân chủng học mang nghĩa bằng lời nói/truyền miệng, đối lập với 'written' (bằng chữ viết).",
      }
    },
    {
      id: "leader_w3d3_q09",
      roundIndex: 8,
      prompt: "Trong câu hỏi tóm tắt, khi bài đọc viết: 'Folktales are remarkably resilient, constantly adapting to shifting cultural landscapes while preserving their core narrative backbone', từ 'resilient' mang nghĩa là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Có sức sống bền bỉ dẻo dai, dễ dàng thích ứng trước những biến thiên mà không bị mai một" },
        { id: "opt_B", label: "B", text: "Rất dễ vỡ và nhanh chóng bị lãng quên" },
        { id: "opt_C", label: "C", text: "Hoàn toàn bất biến và không bao giờ thay đổi dù một từ" },
        { id: "opt_D", label: "D", text: "Được sáng tác bởi các vị vua chúa cổ đại" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Có sức sống bền bỉ dẻo dai, dễ dàng thích ứng trước những biến thiên mà không bị mai một",
      correctExplanation: "'Resilient' (kiên cường, có khả năng phục hồi và thích ứng bền bỉ) là tính từ Band 7.5 miêu tả sức sống mãnh liệt của truyện cổ tích qua hàng nghìn năm lịch sử.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Rất dễ vỡ và nhanh chóng bị lãng quên",
        diagnosticTitle: "Hiểu ngược nghĩa với từ bền bỉ",
        explanation: "'Fragile' (dễ vỡ) mới là từ trái nghĩa đối lập của 'resilient'.",
      }
    },
    {
      id: "leader_w3d3_q10",
      roundIndex: 9,
      prompt: "Trong bài thi IELTS Listening, khi gặp dạng câu hỏi nhiều người nói tranh luận (Section 3), chìa khóa để không bị lạc mạch là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Xác định rõ người nói đang đồng tình hay phản bác ý kiến của bạn mình qua các từ nối như 'I take your point, but...' hoặc 'I wouldn't go that far'" },
        { id: "opt_B", label: "B", text: "Chỉ nghe một người duy nhất và bịt tai khi người kia nói" },
        { id: "opt_C", label: "C", text: "Chờ người nói thứ ba xuất hiện mới ghi đáp án" },
        { id: "opt_D", label: "D", text: "Ghi lại mọi từ xuất hiện trong bài nghe vào giấy nháp" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Xác định rõ người nói đang đồng tình hay phản bác ý kiến của bạn mình qua các từ nối như 'I take your point, but...' hoặc 'I wouldn't go that far'",
      correctExplanation: "Trong Section 3, hai sinh viên hoặc giáo sư thường thảo luận và thay đổi quan điểm liên tục. Thí sinh phải theo dõi sát thái độ đồng tình hay bác bỏ (Agreement / Disagreement cues) để chọn đúng kết luận cuối cùng.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. Ghi lại mọi từ xuất hiện trong bài nghe vào giấy nháp",
        diagnosticTitle: "Thói quen chép chính tả mù quáng làm mất mạch nghe",
        explanation: "Cố chép mọi từ sẽ khiến não bộ bị quá tải và bỏ lỡ đáp án của các câu hỏi tiếp theo.",
      }
    }
  ]
};
