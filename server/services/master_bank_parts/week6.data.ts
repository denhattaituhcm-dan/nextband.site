/**
 * MASTER ARENA QUESTION BANK - WEEK 6
 * Source: Giáo trình MASTER 2027 - Đã soát lỗi.docx & Giáo án Master 2027 (Teacher Guide)
 * Target: IELTS Band 6.0 | Performance 6.0–6.5
 * 
 * Day 1: Writing (Full Essay / To What Extent Do You Agree or Disagree / 40-60 Concession Structure)
 * Day 2: Reading (Purpose of Gaining Knowledge / Cornell Founder / Arson for Profit / YNNG)
 * Day 3: Speaking (Part 3 Abstract Arguments with Concrete Examples / Part 2 Storytelling & Challenges)
 */

export const MASTER_WEEK_6_QUESTIONS: Record<string, any[]> = {
  "WEEK 6 – DAY 1": [
    {
      id: "master_w6d1_q01",
      roundIndex: 0,
      prompt: "Trong cấu trúc bài luận 40-60 (Concession & Rebuttal) cho dạng đề 'To what extent do you agree or disagree?', đoạn Body 1 thường đảm nhận vai trò gì?",
      options: [
        { id: "opt_A", label: "A", text: "Thừa nhận góc nhìn đối lập Concession bằng các từ nối như Admittedly để tăng tính khách quan trước khi phản biện" },
        { id: "opt_B", label: "B", text: "Khẳng định lập trường chính của người viết một cách gay gắt nhất" },
        { id: "opt_C", label: "C", text: "Chép lại toàn bộ phần mở bài bằng các từ viết hoa" },
        { id: "opt_D", label: "D", text: "Đưa ra lời kết luận cuối cùng cho toàn bộ bài thi" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Thừa nhận góc nhìn đối lập Concession bằng các từ nối như Admittedly để tăng tính khách quan trước khi phản biện",
      correctExplanation: "Kỹ thuật 40-60 trong giáo trình Master: Body 1 dùng 'Admittedly, ...' để công nhận mặt hợp lý nhất định của quan điểm đối nghịch (40%), tạo tiền đề cho Body 2 phản bác mạnh mẽ và bảo vệ lập trường cốt lõi (60%), giúp bài luận đạt điểm Coherence và Task Response tối đa.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Khẳng định lập trường chính của người viết một cách gay gắt nhất",
        diagnosticTitle: "Nhầm lẫn giữa đoạn nhượng bộ và đoạn trọng tâm phản biện",
        explanation: "Lập trường trọng tâm (60%) phải được phân tích sâu ở Body 2, Body 1 chỉ là bước đệm nhượng bộ có điều kiện.",
      }
    },
    {
      id: "master_w6d1_q02",
      roundIndex: 1,
      prompt: "Với đề bài: 'University education should be free to everyone, regardless of income. To what extent do you agree or disagree?', câu mở đoạn Body 1 nào thể hiện sự nhượng bộ (Concession) chuẩn học thuật 6.5?",
      options: [
        { id: "opt_A", label: "A", text: "Admittedly, waiving university tuition fees could foster upward social mobility by granting underprivileged students equal access to academic qualifications." },
        { id: "opt_B", label: "B", text: "Free university is very good because poor students do not have money to study." },
        { id: "opt_C", label: "C", text: "I agree that university must be free for everyone in my country." },
        { id: "opt_D", label: "D", text: "There are some reasons why universities should not charge money from young people." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Admittedly, waiving university tuition fees could foster upward social mobility by granting underprivileged students equal access to academic qualifications.",
      correctExplanation: "Sử dụng trạng từ nhượng bộ 'Admittedly', kết hợp các cụm từ học thuật C1: 'waiving university tuition fees' (miễn học phí đại học), 'foster upward social mobility' (thúc đẩy sự dịch chuyển xã hội tích cực), 'underprivileged students' (sinh viên có hoàn cảnh khó khăn).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Free university is very good because poor students do not have money to study.",
        diagnosticTitle: "Dùng từ ngữ bình dân 'very good' và thiếu liên từ nhượng bộ",
        explanation: "'Very good' và 'poor students do not have money' là văn nói của trẻ em, không phù hợp cho Task 2.",
      }
    },
    {
      id: "master_w6d1_q03",
      roundIndex: 2,
      prompt: "Chọn câu mở đoạn Body 2 (60% trọng tâm phản biện) xuất sắc nhất để bảo vệ quan điểm phản đối chính sách miễn học phí hoàn toàn:",
      options: [
        { id: "opt_A", label: "A", text: "However, universal tuition waivers could impose severe fiscal burdens on public coffers, potentially diluting the overall quality of higher education." },
        { id: "opt_B", label: "B", text: "On the other hand, free university is a terrible idea that governments should never do." },
        { id: "opt_C", label: "C", text: "Besides that, universities need money from students to pay for teachers." },
        { id: "opt_D", label: "D", text: "Secondly, government will have no money left for hospitals and roads." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. However, universal tuition waivers could impose severe fiscal burdens on public coffers, potentially diluting the overall quality of higher education.",
      correctExplanation: "'Universal tuition waivers' (sự miễn học phí phổ quát), 'impose severe fiscal burdens on public coffers' (gây áp lực ngân sách nhà nước nặng nề) và 'potentially diluting the overall quality' (làm suy giảm chất lượng giáo dục) là câu chủ đề chuẩn mực.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. On the other hand, free university is a terrible idea that governments should never do.",
        diagnosticTitle: "Dùng ngôn từ cực đoan thiếu tính khách quan học thuật",
        explanation: "'A terrible idea that governments should never do' là ngôn từ cảm tính, thiếu chuẩn mực khách quan trong bài viết học thuật.",
      }
    },
    {
      id: "master_w6d1_q04",
      roundIndex: 3,
      prompt: "Với đề bài: 'The aim of the advertising industry is to boost sales of unnecessary goods. To what extent do you agree or disagree?', luận điểm nào sau đây chứng minh cho vế 'quảng cáo kích cầu hàng hóa không thiết yếu'?",
      options: [
        { id: "opt_A", label: "A", text: "Advertisers leverage sophisticated psychological triggers and fear of missing out to fabricate artificial desires for luxury commodities." },
        { id: "opt_B", label: "B", text: "Advertisements provide informative updates about newly discovered medical treatments." },
        { id: "opt_C", label: "C", text: "People need advertisements to know the opening hours of local supermarkets." },
        { id: "opt_D", label: "D", text: "Companies spend money on ads because they want their logos to look colorful." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Advertisers leverage sophisticated psychological triggers and fear of missing out to fabricate artificial desires for luxury commodities.",
      correctExplanation: "Luận điểm đào sâu cơ chế tâm lý: 'leverage sophisticated psychological triggers' (khai thác các điểm chạm tâm lý tinh vi) và 'fabricate artificial desires' (chế tạo ra những khao khát ảo) để kích cầu hàng xa xỉ phẩm.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Advertisements provide informative updates about newly discovered medical treatments.",
        diagnosticTitle: "Đưa ra luận điểm đi ngược lại yêu cầu chứng minh hàng không thiết yếu",
        explanation: "Thuốc y tế là hàng thiết yếu cứu người, đưa luận điểm này vào là phản tác dụng khi đang muốn chứng minh quảng cáo bán hàng không cần thiết.",
      }
    },
    {
      id: "master_w6d1_q05",
      roundIndex: 4,
      prompt: "Trong câu: 'Admittedly, studying abroad exposes students to diverse cultures. [...], cultural adaptation difficulties and language barriers frequently precipitate acute psychological distress.' Liên từ phản biện nào là phù hợp nhất?",
      options: [
        { id: "opt_A", label: "A", text: "Nonetheless" },
        { id: "opt_B", label: "B", text: "Furthermore" },
        { id: "opt_C", label: "C", text: "In addition" },
        { id: "opt_D", label: "D", text: "Similarly" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Nonetheless",
      correctExplanation: "Sau mệnh đề nhượng bộ 'Admittedly, ...', câu tiếp theo chuyển ý phản biện bắt buộc phải dùng các liên từ chỉ tương phản mạnh như 'Nonetheless' hoặc 'However'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Furthermore",
        diagnosticTitle: "Dùng liên từ bổ sung sau câu nhượng bộ",
        explanation: "'Furthermore' bổ sung ý cùng chiều, trong khi câu sau đang nêu ra mặt trái (khó khăn tâm lý) đối lập với việc tiếp xúc văn hóa ở câu trước.",
      }
    },
    {
      id: "master_w6d1_q06",
      roundIndex: 5,
      prompt: "Chọn Thesis Statement cân bằng hoàn hảo cho bài luận về việc sinh viên du học nước ngoài:",
      options: [
        { id: "opt_A", label: "A", text: "While pursuing tertiary education overseas broadens intercultural perspectives, I maintain that prohibitive costs and cultural alienation make domestic education a more pragmatic alternative for most undergraduates." },
        { id: "opt_B", label: "B", text: "I agree that students should study in another country because it is very fun and cool." },
        { id: "opt_C", label: "C", text: "Some people say yes, but some people say no, and I will show why." },
        { id: "opt_D", label: "D", text: "Studying abroad is always 100% better than staying in your home country forever." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. While pursuing tertiary education overseas broadens intercultural perspectives, I maintain that prohibitive costs and cultural alienation make domestic education a more pragmatic alternative for most undergraduates.",
      correctExplanation: "Thesis Statement mẫu mực: sử dụng cấu trúc 'While + [Counter-benefit], I maintain that [Core objection] make [Alternative] more pragmatic', trả lời trực diện và nhất quán với quan điểm toàn bài.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. Studying abroad is always 100% better than staying in your home country forever.",
        diagnosticTitle: "Tuyên bố tuyệt đối hóa thái quá (Absolutist statement)",
        explanation: "Các từ tuyệt đối 'always 100% better' khiến lập luận trở nên ngây thơ, thiếu tính cân nhắc đa chiều của bài viết học thuật.",
      }
    },
    {
      id: "master_w6d1_q07",
      roundIndex: 6,
      prompt: "Cụm từ nào đồng nghĩa với 'diluting the quality of education'?",
      options: [
        { id: "opt_A", label: "A", text: "lowering the standards and educational outcomes" },
        { id: "opt_B", label: "B", text: "improving teaching methods significantly" },
        { id: "opt_C", label: "C", text: "introducing modern digital classrooms" },
        { id: "opt_D", label: "D", text: "expanding university libraries" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. lowering the standards and educational outcomes",
      correctExplanation: "'Dilute' (nghĩa bóng: làm loãng, làm giảm sút chất lượng) đồng nghĩa với 'lowering the standards' (hạ thấp tiêu chuẩn và chất lượng đào tạo).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. improving teaching methods significantly",
        diagnosticTitle: "Hiểu ngược nghĩa tiêu cực thành tích cực",
        explanation: "'Diluting' mang nghĩa tiêu cực (suy giảm), không phải cải thiện.",
      }
    },
    {
      id: "master_w6d1_q08",
      roundIndex: 7,
      prompt: "Trong Task 2, khi thí sinh viết một bài Agree/Disagree mà chỉ hoàn toàn khen ngợi một bên mà không đề cập bất kỳ sự nhượng bộ nào, bài viết có bị trừ điểm không?",
      options: [
        { id: "opt_A", label: "A", text: "Không bị trừ điểm nếu người viết lập luận sắc bén cho một phía duy nhất Strong opinion, nhưng phương pháp 40-60 thường giúp mở rộng ý tưởng toàn diện và tự nhiên hơn" },
        { id: "opt_B", label: "B", text: "Bị đánh rớt xuống Band 3 ngay lập tức" },
        { id: "opt_C", label: "C", text: "Bắt buộc mọi bài luận IELTS đều phải viết 50-50 cân bằng tuyệt đối" },
        { id: "opt_D", label: "D", text: "Giám khảo sẽ tự động cộng thêm 1.0 điểm nếu chỉ viết một phía" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Không bị trừ điểm nếu người viết lập luận sắc bén cho một phía duy nhất Strong opinion, nhưng phương pháp 40-60 thường giúp mở rộng ý tưởng toàn diện và tự nhiên hơn",
      correctExplanation: "IELTS chấp nhận cả lập trường một phía (Totally agree/disagree) hoặc cân bằng có nhượng bộ (40-60). Tuy nhiên, với học viên hướng tới 6.0–6.5, cấu trúc 40-60 giúp dễ brainstorm ý tưởng và thể hiện tư duy phản biện sắc sảo.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Bắt buộc mọi bài luận IELTS đều phải viết 50-50 cân bằng tuyệt đối",
        diagnosticTitle: "Hiểu sai quy định chấm thi Task 2 của Cambridge",
        explanation: "Cambridge không bắt buộc thí sinh phải viết 50-50, miễn là lập trường được trình bày rõ ràng và phát triển nhất quán.",
      }
    },
    {
      id: "master_w6d1_q09",
      roundIndex: 8,
      prompt: "Chọn câu viết lại giữ tính khách quan học thuật cho câu cảm tính: 'Commercial advertisements make people stupidly buy rubbish items.'?",
      options: [
        { id: "opt_A", label: "A", text: "Commercial advertisements often entice consumers into purchasing non-essential items through persuasive marketing tactics." },
        { id: "opt_B", label: "B", text: "Ads are so bad that silly customers buy useless garbage." },
        { id: "opt_C", label: "C", text: "People buy stupid rubbish because advertising is cheating them." },
        { id: "opt_D", label: "D", text: "Commercial advertisements make fools out of citizens who spend money." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Commercial advertisements often entice consumers into purchasing non-essential items through persuasive marketing tactics.",
      correctExplanation: "Thay thế từ vựng cảm tính 'stupidly buy rubbish' bằng các thuật ngữ kinh tế chuẩn mực: 'entice consumers into purchasing non-essential items' (dụ dỗ người tiêu dùng mua hàng không thiết yếu) và 'persuasive marketing tactics' (chiến thuật tiếp thị thuyết phục).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Ads are so bad that silly customers buy useless garbage.",
        diagnosticTitle: "Giữ nguyên ngôn từ công kích cảm tính",
        explanation: "Các từ miệt thị như 'silly', 'garbage', 'stupid' bị cấm kỵ trong văn phong nghị luận học thuật.",
      }
    },
    {
      id: "master_w6d1_q10",
      roundIndex: 9,
      prompt: "Trong câu kết bài của cấu trúc 40-60, điều cấm kỵ nhất là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Đưa ra một luận điểm hoàn toàn mới chưa từng được đề cập hoặc phân tích trong hai đoạn thân bài" },
        { id: "opt_B", label: "B", text: "Tóm tắt ngắn gọn lại hai khía cạnh đã phân tích ở thân bài" },
        { id: "opt_C", label: "C", text: "Khẳng định lại lập trường nhất quán của người viết" },
        { id: "opt_D", label: "D", text: "Bắt đầu câu bằng cụm từ 'In conclusion' hoặc 'To conclude'" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Đưa ra một luận điểm hoàn toàn mới chưa từng được đề cập hoặc phân tích trong hai đoạn thân bài",
      correctExplanation: "Nguyên tắc kết bài Task 2: Conclusion chỉ dùng để tổng hợp và tái khẳng định lập trường, tuyệt đối không được đưa thêm ý tưởng mới (New ideas) vào vì người chấm sẽ coi đó là luận điểm thiếu căn cứ giải thích.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. Bắt đầu câu bằng cụm từ 'In conclusion' hoặc 'To conclude'",
        diagnosticTitle: "Cấm đoán vô căn cứ các cụm từ kết bài chuẩn mực",
        explanation: "'In conclusion' là cụm từ quy chuẩn được giám khảo IELTS khuyến khích sử dụng.",
      }
    }
  ],

  "WEEK 6 – DAY 2": [
    {
      id: "master_w6d2_q01",
      roundIndex: 0,
      prompt: "Câu nói nổi tiếng của người sáng lập Đại học Cornell, Ezra Cornell: 'I would found an institution where any person can find instruction in any subject' phản ánh triết lý giáo dục nào?",
      options: [
        { id: "opt_A", label: "A", text: "Mô hình đại học toàn diện, bình đẳng và mở rộng cơ hội học tập cho mọi cá nhân ở mọi lĩnh vực kiến thức" },
        { id: "opt_B", label: "B", text: "Đại học chỉ nên dành riêng cho con em giới thượng lưu giàu có" },
        { id: "opt_C", label: "C", text: "Chỉ đào tạo duy nhất các môn học phục vụ cho việc làm giàu nhanh chóng" },
        { id: "opt_D", label: "D", text: "Sinh viên không cần phải đóng bất kỳ khoản học phí nào suốt đời" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Mô hình đại học toàn diện, bình đẳng và mở rộng cơ hội học tập cho mọi cá nhân ở mọi lĩnh vực kiến thức",
      correctExplanation: "Ý nghĩa của câu nói: 'any person' (bất kỳ ai, không phân biệt giai cấp) và 'any subject' (mọi bộ môn học thuật, từ khoa học ứng dụng đến nhân văn), mở ra kỷ nguyên giáo dục đại học khai phóng hiện đại.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. Sinh viên không cần phải đóng bất kỳ khoản học phí nào suốt đời",
        diagnosticTitle: "Gán ghép ý tưởng miễn phí vào câu trích dẫn của Cornell",
        explanation: "Cornell nói về sự tiếp cận bình đẳng kiến thức cho mọi người, không hề đề cập đến việc miễn toàn bộ học phí.",
      }
    },
    {
      id: "master_w6d2_q02",
      roundIndex: 1,
      prompt: "Trong bài đọc 'The Purpose of Gaining Knowledge', nhận định sau là YES, NO hay NOT GIVEN: 'It is difficult to attract students onto courses that do not focus on a career.'?",
      options: [
        { id: "opt_A", label: "A", text: "YES" },
        { id: "opt_B", label: "B", text: "NO" },
        { id: "opt_C", label: "C", text: "NOT GIVEN" },
        { id: "opt_D", label: "D", text: "UNKNOWN" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. YES",
      correctExplanation: "Văn bản xác nhận xu hướng thực dụng của sinh viên hiện đại: các ngành học không gắn liền với cơ hội nghề nghiệp trực tiếp (non-vocational / non-career subjects) gặp muôn vàn khó khăn trong việc tuyển sinh. Trùng khớp với quan điểm tác giả -> YES.",
      timeLimitSeconds: 25,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. NO",
        diagnosticTitle: "Hiểu ngược nhận định về động lực chọn ngành của sinh viên",
        explanation: "Thực tế bài đọc chỉ ra sinh viên ngày nay ưu tiên việc làm hơn nghiên cứu học thuật thuần túy.",
      }
    },
    {
      id: "master_w6d2_q03",
      roundIndex: 2,
      prompt: "Trong bài đọc về điều tra tội phạm hỏa hoạn 'Arson for profit', động cơ chủ yếu của những kẻ cố tình phóng hỏa là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Chiếm đoạt tiền bồi thường bảo hiểm tài sản khi việc kinh doanh gặp thua lỗ hoặc phá sản" },
        { id: "opt_B", label: "B", text: "Tìm kiếm cảm giác hồi hộp khi xem lính cứu hỏa dập lửa" },
        { id: "opt_C", label: "C", text: "Thử nghiệm các chất xúc tác bắt lửa hóa học mới" },
        { id: "opt_D", label: "D", text: "Xóa dấu vết của các bức vẽ nghệ thuật trên tường" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Chiếm đoạt tiền bồi thường bảo hiểm tài sản khi việc kinh doanh gặp thua lỗ hoặc phá sản",
      correctExplanation: "'Arson for profit' (phóng hỏa vì lợi nhuận) là hình thức gian lận bảo hiểm điển hình: chủ doanh nghiệp tự đốt cháy nhà máy/cửa hàng của mình để trục lợi tiền bảo hiểm khi làm ăn thất bát.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Tìm kiếm cảm giác hồi hộp khi xem lính cứu hỏa dập lửa",
        diagnosticTitle: "Nhầm lẫn giữa chứng tâm thần cuồng phóng hỏa (Pyromania) và tội phạm kinh tế (Arson for profit)",
        explanation: "'Pyromania' là bệnh lý tâm thần thích xem lửa, còn 'Arson for profit' là tội phạm kinh tế có chủ đích kiếm tiền bảo hiểm.",
      }
    },
    {
      id: "master_w6d2_q04",
      roundIndex: 3,
      prompt: "Chứng cứ pháp y quan trọng nhất giúp các điều tra viên phát hiện ra một vụ cháy là do cố ý phóng hỏa (Arson) chứ không phải do chập điện ngẫu nhiên là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Dấu vết sót lại của các chất xúc tác đẩy nhanh đám cháy như xăng hoặc dầu hỏa tại nhiều điểm bùng phát cùng lúc" },
        { id: "opt_B", label: "B", text: "Sự hiện diện của tàn thuốc lá bên ngoài tòa nhà" },
        { id: "opt_C", label: "C", text: "Các tấm kính cửa sổ bị vỡ do nhiệt độ cao" },
        { id: "opt_D", label: "D", text: "Hệ thống chuông báo cháy kêu quá to" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Dấu vết sót lại của các chất xúc tác đẩy nhanh đám cháy như xăng hoặc dầu hỏa tại nhiều điểm bùng phát cùng lúc",
      correctExplanation: "Dấu vết của 'accelerants' (xăng, dung môi hữu cơ) và 'multiple points of origin' (nhiều điểm phát cháy độc lập) là bằng chứng không thể chối cãi của một vụ phóng hỏa có mưu tính.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Các tấm kính cửa sổ bị vỡ do nhiệt độ cao",
        diagnosticTitle: "Coi hiện tượng vật lý thông thường trong mọi đám cháy là bằng chứng tội phạm",
        explanation: "Kính vỡ vì nhiệt xảy ra ở mọi đám cháy lớn, không chứng minh được có người cố ý đốt.",
      }
    },
    {
      id: "master_w6d2_q05",
      roundIndex: 4,
      prompt: "Sự khác biệt cốt lõi giữa hai dạng bài TRUE - FALSE - NOT GIVEN và YES - NO - NOT GIVEN trong IELTS Reading là gì?",
      options: [
        { id: "opt_A", label: "A", text: "TFNG kiểm tra tính xác thực của sự kiện thực tế trong bài đọc; YNNG kiểm tra quan điểm, thái độ hoặc lập luận của tác giả" },
        { id: "opt_B", label: "B", text: "Hai dạng bài này hoàn toàn giống hệt nhau về mọi mặt và có thể viết đổi chỗ cho nhau trên phiếu trả lời" },
        { id: "opt_C", label: "C", text: "YNNG chỉ xuất hiện trong đề thi General Training, không có trong Academic" },
        { id: "opt_D", label: "D", text: "TFNG chỉ dùng cho bài đọc ngắn dưới 200 từ" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. TFNG kiểm tra tính xác thực của sự kiện thực tế trong bài đọc; YNNG kiểm tra quan điểm, thái độ hoặc lập luận của tác giả",
      correctExplanation: "Phân định học thuật: True/False/Not Given đối chiếu với 'factual information' (dữ kiện khách quan); Yes/No/Not Given đối chiếu với 'claims or opinions of the writer' (quan điểm, lập trường của tác giả). Lưu ý: viết nhầm T/F vào đề yêu cầu Y/N có thể bị mất điểm.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Hai dạng bài này hoàn toàn giống hệt nhau về mọi mặt và có thể viết đổi chỗ cho nhau trên phiếu trả lời",
        diagnosticTitle: "Chủ quan viết lẫn lộn ký hiệu trên phiếu trả lời Answer Sheet",
        explanation: "Đề bài yêu cầu YES/NO nhưng thí sinh ghi TRUE/FALSE có thể bị giám khảo chấm sai theo barem máy tính.",
      }
    },
    {
      id: "master_w6d2_q06",
      roundIndex: 5,
      prompt: "Từ 'fabricate' trong câu: 'The dishonest manager tried to fabricate evidence to mislead the fire investigators' đồng nghĩa với từ nào?",
      options: [
        { id: "opt_A", label: "A", text: "forge làm giả hoặc thêu dệt" },
        { id: "opt_B", label: "B", text: "preserve bảo tồn cẩn thận" },
        { id: "opt_C", label: "C", text: "reveal tiết lộ công khai" },
        { id: "opt_D", label: "D", text: "destroy tiêu hủy hoàn toàn" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. forge làm giả hoặc thêu dệt",
      correctExplanation: "'Fabricate' trong ngữ cảnh pháp lý và điều tra mang nghĩa thêu dệt, làm giả chứng cứ (forge / invent falsely) để đánh lừa nhà chức trách.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. destroy tiêu hủy hoàn toàn",
        diagnosticTitle: "Nhầm lẫn giữa hành động chế tác chứng cứ giả với hành động tiêu hủy",
        explanation: "Tiêu hủy chứng cứ là 'destroy/tamper with evidence', còn 'fabricate' là tạo ra chứng cứ giả mạo.",
      }
    },
    {
      id: "master_w6d2_q07",
      roundIndex: 6,
      prompt: "Kỹ thuật 'Block Reading' (Đọc theo khối tư duy) khác với cách đọc truyền thống từng chữ một (Word-by-word) ở điểm nào?",
      options: [
        { id: "opt_A", label: "A", text: "Mắt người đọc quét và tiếp nhận thông tin theo từng cụm ý nghĩa gồm 3-5 từ cùng lúc, giúp tăng tốc độ đọc hiểu lên gấp đôi" },
        { id: "opt_B", label: "B", text: "Người đọc dùng một khối gỗ để che nửa trang sách lại" },
        { id: "opt_C", label: "C", text: "Chỉ đọc các khối số liệu mà bỏ qua hoàn toàn các chữ cái" },
        { id: "opt_D", label: "D", text: "Đọc ngược từ chữ cuối cùng của trang sách lên đầu trang" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Mắt người đọc quét và tiếp nhận thông tin theo từng cụm ý nghĩa gồm 3-5 từ cùng lúc, giúp tăng tốc độ đọc hiểu lên gấp đôi",
      correctExplanation: "Block Reading / Chunking là phương pháp đọc khoa học ở trình độ Master: não bộ xử lý thông tin theo cụm ngữ pháp và ngữ nghĩa hoàn chỉnh (Sense groups) thay vì đọc phát âm thầm từng từ đơn lẻ trong đầu.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Người đọc dùng một khối gỗ để che nửa trang sách lại",
        diagnosticTitle: "Suy diễn theo nghĩa đen chữ 'Block'",
        explanation: "'Block' ở đây là khối dữ liệu tinh thần (cognitive chunks), không phải vật thể gỗ.",
      }
    },
    {
      id: "master_w6d2_q08",
      roundIndex: 7,
      prompt: "Trong câu hỏi Multiple Choice: 'Why do we often forget our dreams according to the text?', nếu bài đọc viết: 'Researchers postulate that memory encoding is suppressed during REM sleep due to low levels of neurotransmitters', đáp án đúng là:",
      options: [
        { id: "opt_A", label: "A", text: "The biological processes responsible for storing memories are inactive during dream sleep" },
        { id: "opt_B", label: "B", text: "Dreams are too frightening for human minds to remember" },
        { id: "opt_C", label: "C", text: "People purposely choose to erase their dreams upon waking" },
        { id: "opt_D", label: "D", text: "Humans only remember dreams that happen in daytime" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. The biological processes responsible for storing memories are inactive during dream sleep",
      correctExplanation: "Paraphrase học thuật: 'memory encoding is suppressed' = 'biological processes for storing memories are inactive'.",
      timeLimitSeconds: 25,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Dreams are too frightening for human minds to remember",
        diagnosticTitle: "Suy diễn theo cảm xúc thay vì căn cứ dữ liệu khoa học thần kinh",
        explanation: "Bài đọc nói về cơ chế chất dẫn truyền thần kinh (neurotransmitters), không phải vì giấc mơ đáng sợ.",
      }
    },
    {
      id: "master_w6d2_q09",
      roundIndex: 8,
      prompt: "Từ 'lucrative' trong cụm: 'Arson has evolved into a lucrative illegal enterprise' mang nghĩa là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Sinh lợi nhuận khổng lồ" },
        { id: "opt_B", label: "B", text: "Vô cùng nguy hiểm đến tính mạng" },
        { id: "opt_C", label: "C", text: "Hoàn toàn hợp pháp" },
        { id: "opt_D", label: "D", text: "Không đem lại bất kỳ đồng tiền nào" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Sinh lợi nhuận khổng lồ",
      correctExplanation: "'Lucrative' (sinh lợi cao, béo bở, highly profitable) là từ vựng C1 rất phổ biến trong các chủ đề kinh tế, tội phạm và nghề nghiệp.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Hoàn toàn hợp pháp",
        diagnosticTitle: "Nhầm lẫn giữa lucrative và legitimate",
        explanation: "'Legitimate' mới là hợp pháp, còn 'lucrative' là có lợi nhuận cao.",
      }
    },
    {
      id: "master_w6d2_q10",
      roundIndex: 9,
      prompt: "Khi bài đọc có cấu trúc tương phản: 'While many assume X, empirical findings demonstrate Y', câu hỏi về quan điểm chính của đoạn sẽ nhắm vào yếu tố nào?",
      options: [
        { id: "opt_A", label: "A", text: "Yếu tố Y vì đó là phát hiện thực nghiệm thực tế mà tác giả muốn bảo vệ sau chữ While" },
        { id: "opt_B", label: "B", text: "Yếu tố X vì nó xuất hiện ở vị trí đầu câu" },
        { id: "opt_C", label: "C", text: "Cả X và Y đều bị tác giả bác bỏ" },
        { id: "opt_D", label: "D", text: "Không thể xác định được vì cấu trúc quá mơ hồ" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Yếu tố Y vì đó là phát hiện thực nghiệm thực tế mà tác giả muốn bảo vệ sau chữ While",
      correctExplanation: "Điểm lật tư duy (Pivot point): Mệnh đề sau 'While/Although' chỉ là giả định phổ biến của số đông (popular misconception X), lập luận khoa học cốt lõi của tác giả luôn nằm ở mệnh đề chính Y (empirical findings).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Yếu tố X vì nó xuất hiện ở vị trí đầu câu",
        diagnosticTitle: "Mắc bẫy giả định số đông ở vế phụ",
        explanation: "Thí sinh không nhận ra 'While many assume...' là vế phụ đưa ra để bị tác giả phản bác ngay sau đó.",
      }
    }
  ],

  "WEEK 6 – DAY 3": [
    {
      id: "master_w6d3_q01",
      roundIndex: 0,
      prompt: "Trong Speaking Part 3, khi nhận được câu hỏi mang tính khái niệm trừu tượng: 'How do neighbors help each other in modern society?', chiến lược trả lời hiệu quả nhất để nâng điểm Fluency & Coherence là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Đưa ra nhận định tổng quát rồi lập tức minh họa bằng một ví dụ cụ thể có chủ ngữ và vị ngữ hoàn chỉnh: For example, Subject + Finite verb" },
        { id: "opt_B", label: "B", text: "Chỉ lặp đi lặp lại rằng hàng xóm rất tốt bụng mà không đưa ra được bất kỳ hành động cụ thể nào" },
        { id: "opt_C", label: "C", text: "Trả lời chỉ bằng một từ duy nhất: Good" },
        { id: "opt_D", label: "D", text: "Nói về chuyện gia đình riêng của mình mà không liên quan gì đến hàng xóm" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Đưa ra nhận định tổng quát rồi lập tức minh họa bằng một ví dụ cụ thể có chủ ngữ và vị ngữ hoàn chỉnh: For example, Subject + Finite verb",
      correctExplanation: "Quy tắc vàng của giáo trình Master cho Part 3: 'Triển khai câu hỏi trừu tượng bằng cách đưa ra Concrete Example với cấu trúc For example, S + V hoàn chỉnh', biến lý thuyết mơ hồ thành bằng chứng sinh động có tính thuyết phục cao.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Chỉ lặp đi lặp lại rằng hàng xóm rất tốt bụng mà không đưa ra được bất kỳ hành động cụ thể nào",
        diagnosticTitle: "Lỗi luẩn quẩn trong vòng lặp trừu tượng không có ví dụ thực tế",
        explanation: "Nói chung chung mà không có ví dụ chứng minh khiến câu trả lời bị đánh giá là rỗng tuếch (superficial).",
      }
    },
    {
      id: "master_w6d3_q02",
      roundIndex: 1,
      prompt: "Chọn câu trả lời mẫu mực áp dụng cấu trúc ví dụ cụ thể cho câu hỏi: 'How do neighbors foster community bonding?'?",
      options: [
        { id: "opt_A", label: "A", text: "Neighbors cultivate mutual trust through practical assistance. For instance, residents often collect parcel deliveries for each other or keep an eye on vacant houses when families travel." },
        { id: "opt_B", label: "B", text: "Neighbors are nice. For example, they say hello every morning and smile." },
        { id: "opt_C", label: "C", text: "Community bonding is very important for all people in the universe." },
        { id: "opt_D", label: "D", text: "I have five neighbors living around my house and they have cars." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Neighbors cultivate mutual trust through practical assistance. For instance, residents often collect parcel deliveries for each other or keep an eye on vacant houses when families travel.",
      correctExplanation: "Câu trả lời kết hợp hoàn hảo nhận định học thuật ('cultivate mutual trust through practical assistance') với các ví dụ thực tế sắc nét ('collect parcel deliveries', 'keep an eye on vacant houses').",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Neighbors are nice. For example, they say hello every morning and smile.",
        diagnosticTitle: "Ví dụ quá non nớt và đơn giản ở mức Band 5.0",
        explanation: "Chào hỏi và mỉm cười là chi tiết quá sơ đẳng, chưa thể hiện được sự hỗ trợ lẫn nhau của cộng đồng.",
      }
    },
    {
      id: "master_w6d3_q03",
      roundIndex: 2,
      prompt: "Trong Speaking Part 2 với chủ đề kể chuyện (Storytelling): 'Describe a time when you overcame a major difficulty', thì nào đóng vai trò thiết lập khung bối cảnh (Setting the scene)?",
      options: [
        { id: "opt_A", label: "A", text: "Thì Quá khứ tiếp diễn kết hợp Quá khứ đơn: At that time, I was preparing for my university entrance exam when..." },
        { id: "opt_B", label: "B", text: "Thì Tương lai đơn: I will overcome difficulties in my life." },
        { id: "opt_C", label: "C", text: "Thì Hiện tại hoàn thành tiếp diễn: I have been overcoming difficulties." },
        { id: "opt_D", label: "D", text: "Thể mệnh lệnh: Overcome difficulties right now." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Thì Quá khứ tiếp diễn kết hợp Quá khứ đơn: At that time, I was preparing for my university entrance exam when...",
      correctExplanation: "Công thức mở màn câu chuyện kinh điển: Dùng Quá khứ tiếp diễn (Past Continuous) để mô tả bối cảnh đang diễn ra ('was preparing') và Quá khứ đơn (Past Simple) cho sự kiện bất ngờ ập đến ('when an unexpected crisis hit').",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Thì Tương lai đơn: I will overcome difficulties in my life.",
        diagnosticTitle: "Sai thì hoàn toàn khi kể về một sự việc đã xảy ra",
        explanation: "Đề bài yêu cầu kể lại trải nghiệm trong quá khứ, dùng thì Tương lai là lạc đề.",
      }
    },
    {
      id: "master_w6d3_q04",
      roundIndex: 3,
      prompt: "Chọn cụm collocation học thuật ấn tượng để mô tả cảm xúc khi vượt qua một thử thách vô cùng cam go:",
      options: [
        { id: "opt_A", label: "A", text: "a profound sense of triumph and personal resilience" },
        { id: "opt_B", label: "B", text: "a very very happy feeling in my heart" },
        { id: "opt_C", label: "C", text: "many good moods that I cannot say" },
        { id: "opt_D", label: "D", text: "a nice victory which was good" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. a profound sense of triumph and personal resilience",
      correctExplanation: "'A profound sense of triumph' (cảm giác chiến thắng sâu sắc) và 'personal resilience' (sự bền bỉ kiên cường của bản thân) là những cụm từ diễn đạt cảm xúc đắt giá ở Band 7.0.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. a very very happy feeling in my heart",
        diagnosticTitle: "Lặp từ 'very' và cách diễn đạt trẻ con",
        explanation: "Cách nói vụng về không phản ánh được năng lực diễn đạt trừu tượng của thí sinh.",
      }
    },
    {
      id: "master_w6d3_q05",
      roundIndex: 4,
      prompt: "Khi giám khảo hỏi Part 3: 'Do you think modern technology isolates people from their local communities?', cách tiếp cận nào thể hiện tư duy đa chiều 6.5?",
      options: [
        { id: "opt_A", label: "A", text: "It is a double-edged sword. While social networks allow instant communication across continents, they can simultaneously erode physical neighborhood interactions." },
        { id: "opt_B", label: "B", text: "Yes, technology is bad. Everyone looks at smartphones all day." },
        { id: "opt_C", label: "C", text: "No, technology is good. I love my iPhone." },
        { id: "opt_D", label: "D", text: "I don't know because I don't use technology much." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. It is a double-edged sword. While social networks allow instant communication across continents, they can simultaneously erode physical neighborhood interactions.",
      correctExplanation: "Khái niệm 'double-edged sword' (con dao hai lưỡi) kết hợp phân tích đối lập: kết nối toàn cầu ('instant communication across continents') nhưng làm xói mòn tương tác khu dân cư ('erode physical neighborhood interactions').",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Yes, technology is bad. Everyone looks at smartphones all day.",
        diagnosticTitle: "Góc nhìn phiến diện một chiều và từ vựng sơ cấp",
        explanation: "Phán xét cực đoan 'technology is bad' thể hiện tư duy hạn hẹp ở Band 5.0.",
      }
    },
    {
      id: "master_w6d3_q06",
      roundIndex: 5,
      prompt: "Cụm thành ngữ 'against all odds' thường được sử dụng trong ngữ cảnh nào của bài nói Part 2?",
      options: [
        { id: "opt_A", label: "A", text: "Mô tả việc vượt qua mọi nghịch cảnh và tỷ lệ thất bại tưởng chừng không thể để đạt được thành công" },
        { id: "opt_B", label: "B", text: "Nói về việc mua vé số và bị thua sạch tiền" },
        { id: "opt_C", label: "C", text: "Mô tả một trận đấu bóng đá bị hoãn do trời mưa" },
        { id: "opt_D", label: "D", text: "Nói về một cuộc cãi vã vô lý giữa hai người bạn" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Mô tả việc vượt qua mọi nghịch cảnh và tỷ lệ thất bại tưởng chừng không thể để đạt được thành công",
      correctExplanation: "'Against all odds' (bất chấp mọi nghịch cảnh trắc trở) là idiom tự nhiên cực hay khi kể câu chuyện vượt khó (overcoming challenges).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Nói về việc mua vé số và bị thua sạch tiền",
        diagnosticTitle: "Dịch từ chữ 'odds' theo nghĩa tỷ lệ cá cược cờ bạc",
        explanation: "Thành ngữ mang ý nghĩa biểu tượng về nghị lực vượt khó, không dùng riêng cho cờ bạc.",
      }
    },
    {
      id: "master_w6d3_q07",
      roundIndex: 6,
      prompt: "Chọn câu có cấu trúc đảo ngữ nhấn mạnh (Inversion) để tăng điểm Grammar Range and Accuracy khi kể về một bước ngoặt lớn trong đời:",
      options: [
        { id: "opt_A", label: "A", text: "Only when I received the acceptance letter did I truly realize that all my sleepless nights had finally paid off." },
        { id: "opt_B", label: "B", text: "Only when I received the letter, I realized that my hard work paid off." },
        { id: "opt_C", label: "C", text: "I only realized my hard work paid off when letter received." },
        { id: "opt_D", label: "D", text: "Did I realize my hard work paid off only when letter came." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Only when I received the acceptance letter did I truly realize that all my sleepless nights had finally paid off.",
      correctExplanation: "Cấu trúc đảo ngữ chuẩn với 'Only when': 'Only when + S1 + V1 + did + S2 + V_bare'. Vế sau đảo trợ động từ 'did I truly realize' thể hiện cấu trúc ngữ pháp đỉnh cao ở Band 6.5–7.0.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Only when I received the letter, I realized that my hard work paid off.",
        diagnosticTitle: "Quên đảo ngữ ở mệnh đề chính sau 'Only when'",
        explanation: "Sau 'Only when + clause', mệnh đề chính bắt buộc phải đảo ngữ (did I realize), nếu để 'I realized' là sai ngữ pháp đảo ngữ.",
      }
    },
    {
      id: "master_w6d3_q08",
      roundIndex: 7,
      prompt: "Trong Part 3, khi thí sinh cần một khoảng dừng 2-3 giây để suy nghĩ ý tưởng cho một câu hỏi quá hóc búa, mẫu câu nào giúp duy trì điểm Fluency tốt nhất thay vì 'ờ, à'?",
      options: [
        { id: "opt_A", label: "A", text: "That is an intriguing question. From my perspective, this issue can be viewed from several contrasting angles." },
        { id: "opt_B", label: "B", text: "Uh... um... I don't know what to say... wait a minute." },
        { id: "opt_C", label: "C", text: "Teacher, can you give me another easy question please?" },
        { id: "opt_D", label: "D", text: "Silence for 5 seconds." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. That is an intriguing question. From my perspective, this issue can be viewed from several contrasting angles.",
      correctExplanation: "Sử dụng các câu đệm học thuật (Academic fillers / Stalling phrases) như 'That is an intriguing question. From my perspective...' giúp người nói câu giờ tự nhiên mà vẫn thể hiện khả năng làm chủ ngôn ngữ.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Uh... um... I don't know what to say... wait a minute.",
        diagnosticTitle: "Phát ra tiếng ngập ngừng vụng về làm tụt điểm trôi chảy",
        explanation: "'Um... wait a minute' là dấu hiệu của sự tắc nghẽn ngôn ngữ nghiêm trọng.",
      }
    },
    {
      id: "master_w6d3_q09",
      roundIndex: 8,
      prompt: "Ý nghĩa của collocation 'burn the midnight oil' là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Thức khuya để học tập hoặc làm việc chăm chỉ" },
        { id: "opt_B", label: "B", text: "Đốt đèn dầu để sưởi ấm trong mùa đông" },
        { id: "opt_C", label: "C", text: "Lãng phí dầu ăn vào lúc nửa đêm" },
        { id: "opt_D", label: "D", text: "Nấu ăn khuya cho gia đình" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Thức khuya để học tập hoặc làm việc chăm chỉ",
      correctExplanation: "'Burn the midnight oil' là một thành ngữ bản xứ cực kỳ thông dụng chỉ việc thức khuya cày cuốc đèn sách trước kỳ thi hoặc để hoàn thành dự án lớn.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Đốt đèn dầu để sưởi ấm trong mùa đông",
        diagnosticTitle: "Dịch nghĩa đen từng chữ của idiom",
        explanation: "Thành ngữ tiếng Anh mang nghĩa biểu tượng, không dịch theo nghĩa đen đốt dầu.",
      }
    },
    {
      id: "master_w6d3_q10",
      roundIndex: 9,
      prompt: "Điểm cốt lõi tạo nên sự khác biệt giữa câu trả lời Speaking Part 3 Band 5.5 và Band 6.5 là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Band 6.5 đưa ra câu trả lời có tính khái quát xã hội cao kết hợp ví dụ cụ thể; Band 5.5 chỉ nói về bản thân mình hoặc gia đình mình" },
        { id: "opt_B", label: "B", text: "Band 6.5 nói nhanh gấp ba lần Band 5.5" },
        { id: "opt_C", label: "C", text: "Band 6.5 không được dùng bất kỳ từ ngữ đơn giản nào" },
        { id: "opt_D", label: "D", text: "Band 5.5 nói đúng ngữ pháp hơn Band 6.5" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Band 6.5 đưa ra câu trả lời có tính khái quát xã hội cao kết hợp ví dụ cụ thể; Band 5.5 chỉ nói về bản thân mình hoặc gia đình mình",
      correctExplanation: "Quy chuẩn chấm Part 3: Câu hỏi Part 3 là câu hỏi thảo luận xã hội (Societal & General). Thí sinh Band 5.5 luôn quy về cá nhân tôi ('I, my family'), trong khi Band 6.5 biết khái quát hóa ('citizens, modern society, demographic groups').",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Band 6.5 nói nhanh gấp ba lần Band 5.5",
        diagnosticTitle: "Đánh đồng tốc độ bắn liên thanh với độ trôi chảy học thuật",
        explanation: "Nói quá nhanh mà nuốt âm hoặc thiếu logic sẽ bị trừ điểm phát âm và ngữ pháp.",
      }
    }
  ]
};
