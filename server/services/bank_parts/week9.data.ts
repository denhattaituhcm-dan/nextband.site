/**
 * Question Bank for Week 9 (Day 1, Day 2, Day 3)
 * DOER Coursebook 2027
 */

export const WEEK_9_QUESTIONS: Record<string, any[]> = {
  "WEEK 9 – DAY 1": [
    {
      id: "doer_w9d1_q01",
      roundIndex: 0,
      prompt: "Lỗi ngữ pháp 'Comma Splice' là gì trong câu tiếng Anh?",
      options: [
        { id: "opt_A", label: "A", text: "Nối 2 mệnh đề độc lập (main clauses) chỉ bằng một dấu phẩy mà không có liên từ phù hợp" },
        { id: "opt_B", label: "B", text: "Đặt dấu phẩy sau liên từ 'because' ở đầu câu" },
        { id: "opt_C", label: "C", text: "Quên không đặt dấu phẩy trước liên từ 'and' liệt kê 3 danh từ" },
        { id: "opt_D", label: "D", text: "Sử dụng dấu chấm phẩy thay cho dấu chấm hết câu" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Comma Splice là lỗi nghiêm trọng trong IELTS Writing: dùng dấu phẩy để nối 2 mệnh đề độc lập (ví dụ: 'He got 6.5, now he can apply...' - phải dùng liên từ hoặc dấu chấm)."
    },
    {
      id: "doer_w9d1_q02",
      roundIndex: 1,
      prompt: "Xác định lỗi sai trong câu: 'Because I have an important meeting tomorrow, so I asked my teacher for a day off.'",
      options: [
        { id: "opt_A", label: "A", text: "Dùng thừa liên từ 'so' do ảnh hưởng dịch từ tiếng Việt 'Bởi vì... nên...'" },
        { id: "opt_B", label: "B", text: "Động từ 'asked' phải chuyển thành 'asking'" },
        { id: "opt_C", label: "C", text: "'tomorrow' không được đi với thì hiện tại" },
        { id: "opt_D", label: "D", text: "Sau 'Because' phải dùng danh từ chứ không được dùng clause" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Trong tiếng Anh chỉ được dùng 1 liên từ nối 2 clause: Hoặc dùng 'Because...', hoặc dùng '..., so...'. Không bao giờ dùng cả hai 'Because... so...' trong 1 câu."
    },
    {
      id: "doer_w9d1_q03",
      roundIndex: 2,
      prompt: "Xác định lỗi sai trong câu: 'I got a good result on the final test because my efforts during the course.'",
      options: [
        { id: "opt_A", label: "A", text: "Dùng 'because' trước một noun phrase, phải sửa thành 'because of' (hoặc thanks to)" },
        { id: "opt_B", label: "B", text: "Sai giới từ 'on', phải dùng 'in'" },
        { id: "opt_C", label: "C", text: "'got' phải chuyển thành 'have got'" },
        { id: "opt_D", label: "D", text: "'efforts' không được thêm 's'" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'Because' đi với một mệnh đề (clause có S + V). Còn trước cụm danh từ 'my efforts during the course' bắt buộc phải dùng giới từ 'because of' hoặc 'due to/thanks to'."
    },
    {
      id: "doer_w9d1_q04",
      roundIndex: 3,
      prompt: "Điền liên từ thích hợp: 'Many girls want to become beauty vloggers, ____________ boys usually dream of becoming game streamers.'",
      options: [
        { id: "opt_A", label: "A", text: "whereas / while" },
        { id: "opt_B", label: "B", text: "because" },
        { id: "opt_C", label: "C", text: "so that" },
        { id: "opt_D", label: "D", text: "therefore" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Để thể hiện sự đối lập, tương phản giữa 2 vế câu (con gái thích vlogger trong khi con trai thích streamer), ta dùng liên từ 'whereas' hoặc 'while'."
    },
    {
      id: "doer_w9d1_q05",
      roundIndex: 4,
      prompt: "Điền liên từ thích hợp: 'He failed the test, ____________ he spent a lot of time revising.'",
      options: [
        { id: "opt_A", label: "A", text: "although / even though" },
        { id: "opt_B", label: "B", text: "because" },
        { id: "opt_C", label: "C", text: "so" },
        { id: "opt_D", label: "D", text: "as long as" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Vế 1 (rớt bài thi) trái ngược với vế 2 (dành nhiều thời gian ôn tập), do đó phải dùng liên từ nhượng bộ 'although / even though' (mặc dù)."
    },
    {
      id: "doer_w9d1_q06",
      roundIndex: 5,
      prompt: "Điền liên từ thích hợp: 'You can easily get a 6.5 in the IELTS test, ____________ you spend at least 2 hours each day studying English.'",
      options: [
        { id: "opt_A", label: "A", text: "provided that / as long as" },
        { id: "opt_B", label: "B", text: "unless" },
        { id: "opt_C", label: "C", text: "although" },
        { id: "opt_D", label: "D", text: "whereas" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'as long as' / 'provided that' mang nghĩa là 'miễn là / với điều kiện là'."
    },
    {
      id: "doer_w9d1_q07",
      roundIndex: 6,
      prompt: "Xác định lỗi câu rời rạc (Sentence Fragment): 'Having a 6.0 IELTS is beneficial. Because it helps them to apply to international companies.'",
      options: [
        { id: "opt_A", label: "A", text: "Câu thứ hai chỉ là một mệnh đề phụ (subordinating clause) bắt đầu bằng 'Because', không thể đứng độc lập thành câu riêng" },
        { id: "opt_B", label: "B", text: "'beneficial' phải đi với giới từ 'for' thay vì dấu chấm" },
        { id: "opt_C", label: "C", text: "'apply' phải chuyển thành 'applying'" },
        { id: "opt_D", label: "D", text: "Câu hoàn toàn đúng ngữ pháp không có lỗi" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Mệnh đề phụ thuộc 'Because it helps...' không thể tách làm 1 câu riêng biệt. Cần nối liền vào câu trước: '...is beneficial because it helps...'"
    },
    {
      id: "doer_w9d1_q08",
      roundIndex: 7,
      prompt: "Dịch sang tiếng Anh dùng cấu trúc mệnh đề điều kiện: 'Nếu người trẻ ăn ít thức ăn nhanh hơn, sẽ có ít ca béo phì, làm giảm áp lực lên hệ thống y tế.'",
      options: [
        { id: "opt_A", label: "A", text: "If young people consumed less fast food, there would be fewer obesity cases, which would reduce pressure on the healthcare system." },
        { id: "opt_B", label: "B", text: "If young people eat less fast food so there will be fewer obesity case to reduce pressure on healthcare." },
        { id: "opt_C", label: "C", text: "If young people eating less fast food, fewer obesity cases happens, reduce healthcare." },
        { id: "opt_D", label: "D", text: "Young people eat less fast food if fewer obesity cases reduce on healthcare system." }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Câu điều kiện kết hợp đại từ quan hệ thay thế cả mệnh đề: '..., which would reduce pressure on the healthcare system'."
    },
    {
      id: "doer_w9d1_q09",
      roundIndex: 8,
      prompt: "Nối 2 vế câu diễn tả nguyên nhân - kết quả: 'Fast food is extremely convenient. Many people eat it daily despite knowing it is harmful.'",
      options: [
        { id: "opt_A", label: "A", text: "Fast food is so convenient that many people eat it daily even though they know it is harmful." },
        { id: "opt_B", label: "B", text: "Because fast food is convenient, but many people eat it daily." },
        { id: "opt_C", label: "C", text: "Although fast food is convenient so people eat it daily." },
        { id: "opt_D", label: "D", text: "Fast food is convenient, so that people eating it despite harmful." }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Cấu trúc 'so + adj + that...' (quá... đến nỗi mà...) kết hợp với liên từ nhượng bộ 'even though' thể hiện trọn vẹn ngữ nghĩa."
    },
    {
      id: "doer_w9d1_q10",
      roundIndex: 9,
      prompt: "Trong câu phức (Complex sentence), quy tắc bắt buộc về số lượng mệnh đề chính (Main clause) là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Bất kể câu dài hay ngắn, trong câu luôn cần có ít nhất 1 Main Clause có thể đứng độc lập mang thông tin chính" },
        { id: "opt_B", label: "B", text: "Câu phức không được phép có bất kỳ Main Clause nào" },
        { id: "opt_C", label: "C", text: "Bắt buộc phải có đúng 3 Main Clauses" },
        { id: "opt_D", label: "D", text: "Main Clause luôn luôn phải đặt ở cuối câu sau tất cả các Subordinating Clauses" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Quy tắc ngữ pháp căn bản: Mỗi câu văn hoàn chỉnh luôn phải có ít nhất 1 mệnh đề độc lập (Main Clause) mang ý nghĩa trọn vẹn."
    }
  ],

  "WEEK 9 – DAY 2": [
    {
      id: "doer_w9d2_q01",
      roundIndex: 0,
      prompt: "Theo bài đọc 'Why YouTube stars influence millennials more than traditional celebrities', nhóm đối tượng 'Millennials' sở hữu sức mua khoảng bao nhiêu vào cuối năm 2015?",
      options: [
        { id: "opt_A", label: "A", text: "Khoảng 1.3 nghìn tỷ USD ($1.3 trillion)" },
        { id: "opt_B", label: "B", text: "Khoảng 500 tỷ USD ($500 billion)" },
        { id: "opt_C", label: "C", text: "Khoảng 2.6 tỷ USD ($2.6 billion)" },
        { id: "opt_D", label: "D", text: "Khoảng 100 triệu USD ($100 million)" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Bài đọc: 'Millennials are currently the largest group of consumers, with about $1.3 trillion in buying power as of the end of 2015.'"
    },
    {
      id: "doer_w9d2_q02",
      roundIndex: 1,
      prompt: "Theo nghiên cứu của Defy Media, bao nhiêu % số người được khảo sát từ 13-24 tuổi sẵn sàng dùng thử sản phẩm do một YouTuber gợi ý?",
      options: [
        { id: "opt_A", label: "A", text: "63%" },
        { id: "opt_B", label: "B", text: "48%" },
        { id: "opt_C", label: "C", text: "85%" },
        { id: "opt_D", label: "D", text: "30%" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Bài đọc: 'In a study by Defy Media, 63% of respondents aged between 13-24 said that they would try a brand or a product recommended by a YouTube content creator...'"
    },
    {
      id: "doer_w9d2_q03",
      roundIndex: 2,
      prompt: "Tỷ lệ người sẵn sàng dùng thử sản phẩm do các ngôi sao truyền hình hoặc điện ảnh (movie/TV star) gợi ý trong cùng nghiên cứu là bao nhiêu?",
      options: [
        { id: "opt_A", label: "A", text: "48%" },
        { id: "opt_B", label: "B", text: "63%" },
        { id: "opt_C", label: "C", text: "15%" },
        { id: "opt_D", label: "D", text: "75%" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Bài đọc: 'whereas only 48% mentioned the same about a movie or TV star.'"
    },
    {
      id: "doer_w9d2_q04",
      roundIndex: 3,
      prompt: "Trong phần mở đầu về vlogger Khoai Lang Thang, yếu tố quan trọng nhất tạo nên thành công của anh ấy là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Sự chân thực (authenticity) và những thước phim gần gũi về cuộc sống đời thường" },
        { id: "opt_B", label: "B", text: "Chiêu trò quảng cáo và scandal gây sốc trên mạng xã hội" },
        { id: "opt_C", label: "C", text: "Trang phục biểu diễn đắt tiền và dàn siêu xe" },
        { id: "opt_D", label: "D", text: "Lượng ngân sách tài trợ khổng lồ từ các nhãn hàng xa xỉ" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Bài đọc: 'Khoai Lang Thang's success lies in his authenticity. His videos stand out for their authentic content and offer viewers a unique and intimate look into the places he visits.'"
    },
    {
      id: "doer_w9d2_q05",
      roundIndex: 4,
      prompt: "Collocation 'content creator' dùng để chỉ ai trong lĩnh vực truyền thông số?",
      options: [
        { id: "opt_A", label: "A", text: "Nhà sáng tạo nội dung (người sản xuất video, bài viết cho các nền tảng mạng xã hội)" },
        { id: "opt_B", label: "B", text: "Kỹ sư lập trình mạng máy tính" },
        { id: "opt_C", label: "C", text: "Nhân viên trực tổng đài chăm sóc khách hàng" },
        { id: "opt_D", label: "D", text: "Biên tập viên nhà xuất bản sách in" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'content creator' là thuật ngữ chỉ nhà sáng tạo nội dung số (trên YouTube, TikTok, Facebook...)."
    },
    {
      id: "doer_w9d2_q06",
      roundIndex: 5,
      prompt: "Cụm 'peer-to-peer advice' trong bài đọc thể hiện điều gì mà thế hệ trẻ tin tưởng nhất?",
      options: [
        { id: "opt_A", label: "A", text: "Lời khuyên từ bạn bè đồng trang lứa và cộng đồng ngang hàng" },
        { id: "opt_B", label: "B", text: "Thông điệp quảng cáo trên truyền hình quốc gia" },
        { id: "opt_C", label: "C", text: "Lời kêu gọi của chính phủ và các chuyên gia kinh tế" },
        { id: "opt_D", label: "D", text: "Các bài báo PR được trả tiền trong tạp chí chuyên ngành" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'peer-to-peer advice' là lời khuyên giữa những người cùng trang lứa/cùng tầng lớp trong cộng đồng."
    },
    {
      id: "doer_w9d2_q07",
      roundIndex: 6,
      prompt: "Từ vựng: 'Millennials don't care much what mainstream celebrities have to say.' Từ 'mainstream' mang nghĩa là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Chính thống, truyền thống, đại chúng phổ biến" },
        { id: "opt_B", label: "B", text: "Độc lạ, dị biệt, thiểu số ngầm" },
        { id: "opt_C", label: "C", text: "Bị lãng quên, lỗi thời" },
        { id: "opt_D", label: "D", text: "Mang tính chất tôn giáo khép kín" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'mainstream' = chính thống, xu hướng chủ đạo được số đông đón nhận (ví dụ: mainstream media, mainstream celebrities)."
    },
    {
      id: "doer_w9d2_q08",
      roundIndex: 7,
      prompt: "Cụm động từ 'relate to something/someone' trong câu 'Viewers can easily relate to his travel experiences' mang ý nghĩa là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Dễ dàng đồng cảm, cảm thấy gắn kết và thấy bóng dáng mình trong đó" },
        { id: "opt_B", label: "B", text: "Có quan hệ huyết thống họ hàng ruột thịt" },
        { id: "opt_C", label: "C", text: "Phản đối gay gắt vì quan điểm đối lập" },
        { id: "opt_D", label: "D", text: "Sao chép nguyên văn kịch bản của người khác" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'relate to sb/sth' = tìm thấy sự đồng cảm, liên hệ gần gũi với trải nghiệm của bản thân."
    },
    {
      id: "doer_w9d2_q09",
      roundIndex: 8,
      prompt: "Theo bài đọc, yếu tố nào đã góp phần định nghĩa lại từ 'celebrity' (người nổi tiếng) trong kỷ nguyên số?",
      options: [
        { id: "opt_A", label: "A", text: "Sự bùng nổ của mạng xã hội, sự suy giảm của truyền hình và sự ngán ngẩm của người xem đối với quảng cáo" },
        { id: "opt_B", label: "B", text: "Giá vé rạp chiếu phim tăng quá cao" },
        { id: "opt_C", label: "C", text: "Sự xuất hiện của công nghệ trí tuệ nhân tạo đồ hoạ" },
        { id: "opt_D", label: "D", text: "Các cuộc thi hoa hậu truyền thống ngày càng nhiều" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Bài đọc: 'the rise of social media, the declining popularity of TV, and people's distaste for advertising has redefined the word celebrity.'"
    },
    {
      id: "doer_w9d2_q10",
      roundIndex: 9,
      prompt: "Collocation 'buying power' (hoặc purchasing power) trong đoạn văn có nghĩa là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Sức mua, khả năng chi trả tài chính của người tiêu dùng" },
        { id: "opt_B", label: "B", text: "Quyền lực chính trị của các tập đoàn bán lẻ" },
        { id: "opt_C", label: "C", text: "Tốc độ thanh toán của thẻ ngân hàng" },
        { id: "opt_D", label: "D", text: "Mức năng lượng tiêu thụ khi mua sắm" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'buying power' = sức mua của người tiêu dùng trên thị trường kinh tế."
    }
  ],

  "WEEK 9 – DAY 3": [
    {
      id: "doer_w9d3_q01",
      roundIndex: 0,
      prompt: "Kỹ thuật 'Grouping words' (hay Chunking) trong IELTS Speaking có vai trò gì quan trọng nhất?",
      options: [
        { id: "opt_A", label: "A", text: "Ngắt nghỉ và phát âm các cụm từ có nghĩa liền mạch với nhau, giúp câu nói tự nhiên và người nghe dễ nắm bắt thông tin" },
        { id: "opt_B", label: "B", text: "Nói từng từ một ngắt quãng đều đặn để kéo dài thời gian thi" },
        { id: "opt_C", label: "C", text: "Phát âm dính tất cả các từ trong cả một đoạn văn không thở" },
        { id: "opt_D", label: "D", text: "Chỉ ngắt hơi duy nhất ở các liên từ 'and' và 'or'" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Grouping words (Chunking): Nhóm các từ liên quan ngữ nghĩa thành một cụm phát âm liền mạch (thought groups) giúp bài nói tự nhiên và mạch lạc."
    },
    {
      id: "doer_w9d3_q02",
      roundIndex: 1,
      prompt: "Trong ví dụ bài học: 'I bought a nice new jacket / with a zip down the front / and a lot of pockets', cách ngắt cụm này thể hiện điều gì?",
      options: [
        { id: "opt_A", label: "A", text: "Ngắt thành 3 nhóm thông tin hợp lý về ngữ nghĩa: món đồ mua, chi tiết khoá kéo, và chi tiết nhiều túi" },
        { id: "opt_B", label: "B", text: "Ngắt sai vì phải ngắt sau chữ 'nice'" },
        { id: "opt_C", label: "C", text: "Ngắt ngẫu nhiên theo số lượng âm tiết chẵn lẻ" },
        { id: "opt_D", label: "D", text: "Chỉ nên ngắt ở dấu chấm cuối câu" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Mỗi chunk mang một đơn vị ý nghĩa hoàn chỉnh (a meaningful grammatical unit): đối tượng mua, đặc điểm khoá kéo, đặc điểm túi áo."
    },
    {
      id: "doer_w9d3_q03",
      roundIndex: 2,
      prompt: "Từ 'refrigeration' có bao nhiêu âm tiết (syllables) và trọng âm rơi vào âm tiết thứ mấy?",
      options: [
        { id: "opt_A", label: "A", text: "5 âm tiết, trọng âm rơi vào âm tiết thứ 4 (/re-fri-ge-RA-tion/)" },
        { id: "opt_B", label: "B", text: "4 âm tiết, trọng âm rơi vào âm tiết thứ 1" },
        { id: "opt_C", label: "C", text: "5 âm tiết, trọng âm rơi vào âm tiết thứ 2" },
        { id: "opt_D", label: "D", text: "3 âm tiết, trọng âm rơi vào âm tiết thứ 3" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Re-frig-er-a-tion có 5 âm tiết: /rɪˌfrɪdʒ.əˈreɪ.ʃən/, trọng âm chính rơi vào âm tiết thứ 4 (-ra-)."
    },
    {
      id: "doer_w9d3_q04",
      roundIndex: 3,
      prompt: "Từ danh từ 'access' (sự truy cập, đường vào) có trọng âm rơi vào âm tiết thứ mấy?",
      options: [
        { id: "opt_A", label: "A", text: "Âm tiết thứ 1 (/ˈæk.ses/)" },
        { id: "opt_B", label: "B", text: "Âm tiết thứ 2 (/ækˈses/)" },
        { id: "opt_C", label: "C", text: "Trọng âm đều cả 2 âm tiết" },
        { id: "opt_D", label: "D", text: "Không có trọng âm" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Hầu hết danh từ 2 âm tiết có trọng âm rơi vào âm tiết đầu tiên: 'access' -> /ˈæk.ses/."
    },
    {
      id: "doer_w9d3_q05",
      roundIndex: 4,
      prompt: "Cụm diễn đạt nào sau đây dùng để nói về sở thích cá nhân tương đương với 'I like/love'?",
      options: [
        { id: "opt_A", label: "A", text: "I'm really into / I'm keen on / I have a passion for" },
        { id: "opt_B", label: "B", text: "I'm bored with / I can't stand" },
        { id: "opt_C", label: "C", text: "I doubt that / I disagree with" },
        { id: "opt_D", label: "D", text: "I am obliged to / I am forced to" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Các cách diễn đạt tự nhiên thay cho 'I like': be into sth, be keen on sth, have a passion for sth."
    },
    {
      id: "doer_w9d3_q06",
      roundIndex: 5,
      prompt: "Điền từ thích hợp vào câu trả lời Speaking: 'Reading books helps me ____________ my knowledge and ____________ my mind.'",
      options: [
        { id: "opt_A", label: "A", text: "expand / refresh" },
        { id: "opt_B", label: "B", text: "destroy / erase" },
        { id: "opt_C", label: "C", text: "shorten / narrow" },
        { id: "opt_D", label: "D", text: "forget / close" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Collocation quen thuộc: 'expand one's knowledge' (mở rộng kiến thức) và 'refresh one's mind' (thư giãn, nạp lại năng lượng cho tâm trí)."
    },
    {
      id: "doer_w9d3_q07",
      roundIndex: 6,
      prompt: "Khi trả lời câu hỏi Speaking: 'How have your hobbies changed over time?', thí sinh cần phối hợp các thì nào để thể hiện sự biến đổi?",
      options: [
        { id: "opt_A", label: "A", text: "Quá khứ (used to do) để nói sở thích cũ, Hiện tại đơn (nowadays) cho sở thích hiện tại, và Tương lai/Kế hoạch (thinking about taking up) cho tương lai" },
        { id: "opt_B", label: "B", text: "Chỉ dùng một thì Quá khứ đơn cho toàn bộ câu trả lời" },
        { id: "opt_C", label: "C", text: "Chỉ dùng Hiện tại tiếp diễn" },
        { id: "opt_D", label: "D", text: "Chỉ dùng Tương lai đơn với 'will'" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Chiến thuật ghi điểm ngữ pháp Range & Accuracy: Kết hợp Past (When I was young, I used to...), Present (Nowadays, I'm into...), và Future (In the future, I plan to...)."
    },
    {
      id: "doer_w9d3_q08",
      roundIndex: 7,
      prompt: "Cụm phrasal verb nào mang nghĩa 'bắt đầu một sở thích mới' (start a new hobby)?",
      options: [
        { id: "opt_A", label: "A", text: "Take up a new hobby" },
        { id: "opt_B", label: "B", text: "Give up a new hobby" },
        { id: "opt_C", label: "C", text: "Put off a new hobby" },
        { id: "opt_D", label: "D", text: "Look down on a new hobby" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'take up a hobby/sport' là phrasal verb kinh điển: bắt đầu một sở thích hoặc môn thể thao mới."
    },
    {
      id: "doer_w9d3_q09",
      roundIndex: 8,
      prompt: "Cụm từ nào mang nghĩa 'dần mất đi sự hứng thú đối với một việc gì đó'?",
      options: [
        { id: "opt_A", label: "A", text: "Lose interest in something" },
        { id: "opt_B", label: "B", text: "Gain enthusiasm for something" },
        { id: "opt_C", label: "C", text: "Show curiosity toward something" },
        { id: "opt_D", label: "D", text: "Become obsessed with something" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Trong bài: 'as I got older, I lost interest in this hobby and rarely do so anymore' (lose interest in = mất hứng thú)."
    },
    {
      id: "doer_w9d3_q10",
      roundIndex: 9,
      prompt: "Để đạt mục tiêu Target 4.0 - 5.0 về phát âm (Pronunciation) trong bài học này, tiêu chí cốt lõi cần đạt được là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Phát âm đủ số âm tiết, đặt đúng trọng âm từ, phát âm rõ nguyên âm/phụ âm, và phát âm đúng các âm đuôi (-ed, -s/es)" },
        { id: "opt_B", label: "B", text: "Phải nói được giọng Anh - Anh chuẩn của Hoàng gia Anh" },
        { id: "opt_C", label: "C", text: "Nói thật nhanh bất chấp sai âm cuối" },
        { id: "opt_D", label: "D", text: "Sử dụng từ vựng cổ điển khó hiểu" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Mục tiêu bài học nêu rõ 5 trụ cột: (1) Đủ âm tiết, (2) Trọng âm từ, (3) Phát âm đúng IPA nguyên âm/phụ âm, (4) Âm cuối thì và số nhiều (-ed, -s/es), (5) Trọng âm câu và chunking."
    }
  ]
};
