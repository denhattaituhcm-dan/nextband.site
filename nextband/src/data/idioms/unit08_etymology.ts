// UNIT 08: Food — Etymological & Conceptual Explanations
// Standardized NextBand Academic Framework: Evidence-based historical and conceptual analysis
// Source: DK English for Everyone: English Idioms (Unit 8, pages 38-41 & Answer Key page 227)

export interface IdiomEtymology {
  idiom_headword: string;
  current_figurative_meaning: string;
  literal_image: string;
  figurative_connection: string;
  historical_context: string;
  deep_example: string;
  evidence_category: "DOCUMENTED ORIGIN" | "PLAUSIBLE IMAGE/MEANING CONNECTION" | "ORIGIN UNCERTAIN";
  sources: {
    title: string;
    url: string;
    note: string;
  }[];
}

export const UNIT_08_ETYMOLOGY: Record<string, IdiomEtymology> = {
  "8_1_flatpancake": {
    idiom_headword: "as flat as a pancake",
    current_figurative_meaning: "Phẳng lì, hoàn toàn bằng phẳng không có bất kỳ mấp mô hay ngọn đồi nào (địa hình, bề mặt, hoặc đồ vật bị đè bẹp)",
    literal_image: "Chiếc bánh kếp (pancake) được tráng từ bột lỏng trên mặt chảo gang nóng phẳng lì, dàn mỏng thành hình tròn dẹt không có độ phồng.",
    figurative_connection: "Hình dáng mỏng dẹt và bề mặt tiếp xúc phẳng tuyệt đối của chiếc bánh kếp trở thành chuẩn mực so sánh cực đoan cho địa hình đồng bằng trải dài tít tắp hoặc lốp xe bị thủng xẹp lép.",
    historical_context: "Xuất hiện trong văn học Anh từ đầu thế kỷ 16. Ghi nhận sớm nhất trong các tài liệu Tudor thập niên 1500 và được kịch tác gia Thomas Heywood ghi lại năm 1607 trong 'A Woman Killed with Kindness'.",
    deep_example: "Driving across the Nullarbor Plain in Australia felt surreal because the horizon in every direction was as flat as a pancake.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — flat as a pancake",
        url: "https://www.oed.com/view/Entry/136706",
        note: "Ghi nhận tư liệu từ thế kỷ 16 và các dẫn chứng văn học Anh cận đại."
      },
      {
        title: "The Phrase Finder — As flat as a pancake",
        url: "https://www.phrases.org.uk/meanings/as-flat-as-a-pancake.html",
        note: "Khảo cứu lịch sử xuất hiện và trích dẫn cổ năm 1542 của Nicholas Udall."
      }
    ]
  },

  "8_1_foodontable": {
    idiom_headword: "puts food on the table",
    current_figurative_meaning: "Kiếm đủ tiền trang trải cuộc sống tối thiểu, nuôi sống gia đình và bảo đảm sự sinh tồn căn bản",
    literal_image: "Hành động mua lương thực, nấu nướng và bày các đĩa thức ăn lên bàn ăn của gia đình mỗi bữa.",
    figurative_connection: "Phép hoán dụ (synecdoche) cổ điển của giai cấp lao động: bữa ăn gia đình là thước đo cụ thể và thiêng liêng nhất cho trách nhiệm của người trụ cột nuôi nấng vợ con.",
    historical_context: "Phổ biến rộng rãi trong xã hội Anh - Mỹ thời kỳ Cách mạng Công nghiệp thế kỷ 19, khi người công nhân phải làm việc quần quật 14 tiếng mỗi ngày để đổi lấy bánh mì và súp cho gia đình.",
    deep_example: "Even though shifting crates in the warehouse is exhausting and unglamorous, it reliably puts food on the table for my wife and children.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Cambridge English Dictionary — put food on the table",
        url: "https://dictionary.cambridge.org/dictionary/english/put-food-on-the-table",
        note: "Định nghĩa chuẩn và phân loại ngữ dụng trong văn phong giao tiếp gia đình."
      },
      {
        title: "Merriam-Webster Dictionary — put food on the table",
        url: "https://www.merriam-webster.com/dictionary/put%20food%20on%20the%20table",
        note: "Ngữ cảnh sử dụng trong kinh tế hộ gia đình và thu nhập sinh hoạt."
      }
    ]
  },

  "8_1_packedsardines": {
    idiom_headword: "packed like sardines",
    current_figurative_meaning: "Chen chúc nghẹt thở, chen lấn chật ních trong một không gian hẹp (xe buýt, toa tàu, phòng hòa nhạc)",
    literal_image: "Những con cá mòi (sardine) được thợ công nghiệp đánh vảy, bỏ đầu và xếp khít chặt chẽ từng lớp vào trong hộp thiếc ngâm dầu không còn một kẽ hở.",
    figurative_connection: "Cảm giác con người đứng bất động, vai kề vai, không thể xoay người hay duỗi tay chân trong phương tiện công cộng giờ cao điểm tương tự hệt như những con cá mòi bị ép chặt trong đồ hộp.",
    historical_context: "Kỹ thuật đóng hộp cá mòi thiếc ra đời ở Nantes, Pháp vào thập niên 1820-1830. Thành ngữ này bắt đầu xuất hiện trong báo chí và văn học Anh - Mỹ từ thập niên 1840 khi hiện tượng đô thị hóa bùng nổ.",
    deep_example: "During the rush hour on the Tokyo subway, commuters are routinely packed like sardines into the train cars by professional station pushers.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder — Packed like sardines",
        url: "https://www.phrases.org.uk/meanings/packed-like-sardines.html",
        note: "Ghi chép lịch sử công nghệ đóng hộp cá mòi và sự xuất hiện thành ngữ thế kỷ 19."
      },
      {
        title: "Oxford English Dictionary — sardine (packed like)",
        url: "https://www.oed.com/view/Entry/171033",
        note: "Các trích dẫn đầu tiên trong văn bản báo chí London từ năm 1845."
      }
    ]
  },

  "8_1_spoonfeed": {
    idiom_headword: "spoon-feeds",
    current_figurative_meaning: "Mớm tận miệng, cầm tay chỉ việc thái quá, cung cấp mọi thông tin dễ dãi khiến người khác mất khả năng tư duy độc lập",
    literal_image: "Người mẹ dùng thìa múc thức ăn nhuyễn bón từng thìa nhỏ vào miệng đứa trẻ sơ sinh chưa tự xúc ăn được.",
    figurative_connection: "Chuyển từ hành vi chăm sóc dinh dưỡng trẻ sơ sinh sang thái độ quản lý hoặc sư phạm: đối xử với nhân viên hoặc học sinh trưởng thành như những đứa trẻ thiếu khả năng tự chủ, làm thui chột óc sáng tạo.",
    historical_context: "Từ 'spoon-feed' xuất hiện từ thế kỷ 17 với nghĩa đen. Nghĩa bóng được Đại thi hào Lord Byron sử dụng năm 1813 trong thư từ chỉ sự nuôi dưỡng trí tuệ thụ động, sau đó trở thành thuật ngữ quản trị và giáo dục học.",
    deep_example: "University professors refuse to spoon-feed undergraduates; they expect students to conduct independent research and critically interrogate primary sources.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — spoon-feed",
        url: "https://www.oed.com/view/Entry/187428",
        note: "Tài liệu hóa quá trình chuyển nghĩa từ ẩm thực chăm sóc trẻ sang ẩn dụ tri thức."
      },
      {
        title: "Online Etymology Dictionary — spoon-feed",
        url: "https://www.etymonline.com/word/spoon-feed",
        note: "Xuất hiện nghĩa đen từ 1610 và nghĩa ẩn dụ trí tuệ từ 1813."
      }
    ]
  },

  "8_1_sugarcoat": {
    idiom_headword: "sugarcoat",
    current_figurative_meaning: "Nói giảm nói tránh, bọc đường tin xấu, tô hồng sự thật phũ phàng để làm cho nó dễ nuốt hoặc bớt gây sốc hơn",
    literal_image: "Bọc một lớp đường ngọt bùi bên ngoài viên thuốc tây có vị đắng ngắt để bệnh nhân không cảm thấy ghê cổ khi nuốt.",
    figurative_connection: "Lời nói xoa dịu, nịnh nọt hoặc các đặc ân nhỏ được ví như lớp vỏ đường bên ngoài, nhằm che đậy nội dung đắng cay, khắc nghiệt (như sa thải, cắt thưởng, thất bại) bên trong.",
    historical_context: "Bắt nguồn từ ngành bào chế dược phẩm Mỹ và Anh vào nửa cuối thế kỷ 19 (khoảng 1870). Nghĩa bóng chuyển sang lĩnh vực giao tiếp chính trị và thương thuyết thương mại từ đầu thế kỷ 20.",
    deep_example: "Rather than sugarcoating the company's financial deficit, the CEO delivered a candid appraisal to the board of directors.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Merriam-Webster Dictionary — sugarcoat",
        url: "https://www.merriam-webster.com/dictionary/sugarcoat",
        note: "Lịch sử từ ngành y dược thế kỷ 19 và sự chuyển nghĩa sang ngoại giao chính trị."
      },
      {
        title: "Oxford English Dictionary — sugar-coat",
        url: "https://www.oed.com/view/Entry/193649",
        note: "Ghi nhận văn bản y học đầu tiên năm 1874 và ẩn dụ năm 1891."
      }
    ]
  },

  "8_1_cryspilledmilk": {
    idiom_headword: "crying over spilled milk",
    current_figurative_meaning: "Khóc than việc đã rồi, tiếc nuối và dằn vặt vô ích về những sai lầm hay rủi ro trong quá khứ không thể cứu vãn",
    literal_image: "Làm đổ bình sữa tươi xuống đất cát; sữa trắng ngấm ngay vào đất bẩn, biến mất hoàn toàn không có cách nào thu hồi lại được.",
    figurative_connection: "Nhấn mạnh tính bất khả nghịch của thời gian và vật chất: sữa đã đổ thì vĩnh viễn mất đi; việc đứng than khóc chỉ tiêu tốn tinh thần mà không giải quyết được bất kỳ điều gì, cần tập trung dọn dẹp và bước tiếp.",
    historical_context: "Ghi nhận sớm nhất trong tuyển tập thành ngữ của nhà sử học James Howell năm 1659: 'No weeping for shed milk'. Về sau, dạng phủ định 'It is no use crying over spilt/spilled milk' trở thành châm ngôn phổ biến toàn cầu.",
    deep_example: "Losing our initial seed investment was painful, but there is no point in crying over spilled milk; we must regroup and refine our product pitch.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder — Cry over spilt milk",
        url: "https://www.phrases.org.uk/meanings/cry-over-spilt-milk.html",
        note: "Tài liệu chứng thực từ tác phẩm Paroimiographia (1659) của James Howell."
      },
      {
        title: "Oxford Dictionary of Proverbs — spilt milk",
        url: "https://www.oxfordreference.com/display/10.1093/acref/9780199539536.001.0001/acref-9780199539536-e-1610",
        note: "Diễn biến lịch sử tục ngữ dân gian Anh thế kỷ 17."
      }
    ]
  },

  "8_1_couchpotato": {
    idiom_headword: "a couch potato",
    current_figurative_meaning: "Kẻ lười biếng chỉ thích nằm dài trên ghế sofa xem TV, lướt điện thoại và hoàn toàn lười vận động thể chất",
    literal_image: "Củ khoai tây béo tròn, thụ động nằm bất động một chỗ, kết hợp với chiếc ghế sofa mềm mại êm ái.",
    figurative_connection: "Hình ảnh một người nằm lỳ cả ngày trên ghế nệm trước màn hình vô tuyến giống như một củ khoai tây cắm rễ bất động, biểu tượng đỉnh cao của lối sống trì trệ, thiếu sức sống.",
    historical_context: "Được sáng tạo chính xác vào tháng 7 năm 1976 tại California bởi Robert Armstrong và Tom Iacino. Họ vẽ tranh biếm họa những củ khoai tây nằm coi TV và thậm chí lập hội 'Couch Potatoes Club', đăng ký bản quyền trước khi từ ngữ này trở thành từ điển chính thống.",
    deep_example: "Since graduating college, Mark has turned into a total couch potato, binge-watching streaming series from noon until midnight.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — couch potato",
        url: "https://www.oed.com/view/Entry/241852",
        note: "Ghi nhận nguồn gốc chính thức tại Pasadena, California năm 1976 của nhóm Armstrong & Iacino."
      },
      {
        title: "The Phrase Finder — Couch potato",
        url: "https://www.phrases.org.uk/meanings/couch-potato.html",
        note: "Chi tiết câu chuyện thành lập câu lạc bộ Couch Potatoes và đăng ký thương hiệu."
      }
    ]
  },

  "8_1_whatsidebutter": {
    idiom_headword: "knows what side his bread is buttered on",
    current_figurative_meaning: "Biết rõ ai đem lại quyền lợi cho mình, khôn ngoan biết cách làm vừa lòng cấp trên để giữ vững chỗ đứng và lợi ích",
    literal_image: "Một lát bánh mì chỉ được phết bơ béo ngậy ở một mặt; người ăn phải quan sát kỹ để cầm mặt khô ráo và không làm rơi phần bơ ngon xuống đất.",
    figurative_connection: "Bơ tượng trưng cho của cải, lương bổng và bổng lộc; người thức thời luôn nhận thức rõ nguồn bổng lộc của mình đến từ đâu để phục tùng, kính cẩn và bảo vệ vị thế cá nhân.",
    historical_context: "Xuất hiện trong cuốn sách tục ngữ 'A Dialogue Containing the Number in Effect of All the Proverbs in the English Tongue' (1546) của thi sĩ John Heywood.",
    deep_example: "Marcus never openly debates policy changes with the executive director because he knows exactly what side his bread is buttered on.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder — Know which side your bread is buttered",
        url: "https://www.phrases.org.uk/meanings/know-which-side-your-bread-is-buttered.html",
        note: "Tài liệu thế kỷ 16 của John Heywood ghi nhận năm 1546."
      },
      {
        title: "Oxford English Dictionary — bread (buttered side)",
        url: "https://www.oed.com/view/Entry/22934",
        note: "Lịch sử ngữ nghĩa tục ngữ bánh mì phết bơ trong văn hóa ẩm thực Anh."
      }
    ]
  },

  "8_1_appleofeye": {
    idiom_headword: "the apple of my eye",
    current_figurative_meaning: "Báu vật trong mắt ai đó; người con cưng, người thân yêu quý giá và được trân trọng nâng niu nhất trên đời",
    literal_image: "Con ngươi của mắt (pupil). Trong tiếng Anh Cổ, người ta dùng từ 'æppel' (quả táo) để gọi con ngươi vì hình dáng tròn xoe và bóng bẩy của nó.",
    figurative_connection: "Con ngươi là bộ phận nhạy cảm, dễ tổn thương và vô cùng quý báu nhất của thị giác — mất con ngươi là mất đi ánh sáng. Do đó, người được coi là con ngươi trong mắt chính là người tối quan trọng, được bảo vệ cẩn mật nhất.",
    historical_context: "Thành ngữ có từ thời vua Alfred Đại đế nước Anh (thế kỷ thứ 9, năm 885) và xuất hiện nhiều lần trong bản dịch Kinh Thánh King James năm 1611 (sách Đệ Nhị Luật 32:10 và Thi Thiên 17:8).",
    deep_example: "Among his five grandchildren, little Sophie was the apple of the grandfather's eye, accompanying him on every weekend fishing trip.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — apple of the eye",
        url: "https://www.oed.com/view/Entry/9675",
        note: "Truy nguyên về văn bản Anh Cổ của Vua Alfred năm 885 và Kinh Thánh King James."
      },
      {
        title: "The Phrase Finder — Apple of my eye",
        url: "https://www.phrases.org.uk/meanings/apple-of-my-eye.html",
        note: "Khảo cứu giải phẫu cổ đại và sự hình thành thành ngữ."
      }
    ]
  },

  "8_1_paypeanuts": {
    idiom_headword: "pays peanuts",
    current_figurative_meaning: "Trả lương bèo bọt, thù lao rẻ mạt không tương xứng với công sức bỏ ra",
    literal_image: "Những hạt lạc/đậu phộng nhỏ bé, rẻ tiền thường được dùng để ném cho khỉ hoặc voi ăn trong các vườn thú và rạp xiếc lưu động.",
    figurative_connection: "Đậu phộng tượng trưng cho số tiền vặt vãnh, không đáng kể; nếu người chủ chỉ chi trả thù lao bằng đậu phộng thì chất lượng nhân sự họ nhận lại cũng chỉ ở mức tối thiểu ('If you pay peanuts, you get monkeys').",
    historical_context: "Tiếng lóng thương mại Mỹ từ thập niên 1940, sau đó được phổ biến trong văn hóa kinh doanh phương Tây để phê phán chính sách tuyển dụng trả lương quá thấp.",
    deep_example: "The graphic design agency expects senior-level creativity, but unfortunately pays peanuts, resulting in exceptionally high staff turnover.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — peanuts (slang for small sum)",
        url: "https://www.oed.com/view/Entry/139366",
        note: "Ghi nhận nghĩa tiền lẻ từ năm 1940 tại Hoa Kỳ."
      },
      {
        title: "Cambridge English Dictionary — pay peanuts",
        url: "https://dictionary.cambridge.org/dictionary/english/pay-peanuts",
        note: "Định nghĩa và châm ngôn liên quan 'pay peanuts, get monkeys'."
      }
    ]
  },

  "8_1_cakenandeatit": {
    idiom_headword: "can't have your cake and eat it, too",
    current_figurative_meaning: "Không thể được cả đôi đường; không thể vừa muốn hưởng lợi thế này lại vừa muốn giữ trọn vẹn đặc quyền kia mà không chịu đánh đổi",
    literal_image: "Một chiếc bánh ngọt ngon lành: nếu bạn muốn giữ nó nguyên vẹn trên đĩa để ngắm nghía khoe khoang thì bạn không thể ăn nó; nếu bạn đã ăn nó vào bụng thì chiếc bánh biến mất, không còn chiếc bánh nào trên đĩa nữa.",
    figurative_connection: "Quy luật nghịch lý hiển nhiên về mặt vật lý: sự lựa chọn giữa việc tiêu thụ tài nguyên và việc sở hữu tài nguyên là loại trừ lẫn nhau, con người buộc phải chấp nhận hy sinh một bên.",
    historical_context: "Xuất hiện sớm nhất trong lá thư năm 1538 của Công tước xứ Norfolk gửi Thomas Cromwell ('a man can not have his cake and eat his cake'), và được ghi lại trong tuyển tập của John Heywood năm 1546.",
    deep_example: "You cannot demand a four-day workweek while simultaneously insisting on a salary increase; you simply cannot have your cake and eat it too.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder — Have your cake and eat it",
        url: "https://www.phrases.org.uk/meanings/have-your-cake-and-eat-it.html",
        note: "Thư từ lịch sử Tudor năm 1538 chứng minh trật tự nguyên bản của câu thành ngữ."
      },
      {
        title: "Oxford English Dictionary — cake (have one's cake and eat it)",
        url: "https://www.oed.com/view/Entry/26391",
        note: "Tư liệu từ thế kỷ 16 và sự đảo vị trí từ ngữ trong tiếng Anh hiện đại."
      }
    ]
  },

  "8_1_takethecake": {
    idiom_headword: "takes the cake",
    current_figurative_meaning: "Đạt đến đỉnh điểm của sự quá quắt, trơ trẽn hoặc ngớ ngẩn không ai có thể chấp nhận nổi (tiếng Anh Mỹ, dùng với sắc thái mỉa mai)",
    literal_image: "Giải thưởng là một chiếc bánh kem khổng lồ được trao cho người thể hiện xuất sắc nhất trong các cuộc thi truyền thống.",
    figurative_connection: "Xuất phát từ ý nghĩa nguyên bản là 'đoạt giải quán quân', người Mỹ đã chuyển nghĩa câu nói này sang hướng mỉa mai cay độc: hành vi này quá trơ trẽn, kỳ quặc đến mức xứng đáng ẵm luôn giải quán quân về sự vô duyên.",
    historical_context: "Bắt nguồn từ các cuộc thi nhảy 'cakewalk' của người Mỹ gốc Phi ở miền Nam nước Mỹ thế kỷ 19, nơi cặp đôi nào bước đi điệu nghệ và kiêu hãnh nhất sẽ thắng chiếc bánh ngọt (take the cake). Đến thế kỷ 20 trở thành khẩu ngữ Mỹ mang tính châm biếm.",
    deep_example: "I have witnessed many disrespectful colleagues, but forging the supervisor's signature to take an unapproved leave truly takes the cake.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder — Take the cake",
        url: "https://www.phrases.org.uk/meanings/take-the-cake.html",
        note: "Lịch sử điệu nhảy cakewalk miền Nam Hoa Kỳ thế kỷ 19 và sự chuyển nghĩa mỉa mai."
      },
      {
        title: "Merriam-Webster Dictionary — take the cake",
        url: "https://www.merriam-webster.com/dictionary/take%20the%20cake",
        note: "Định nghĩa tiếng Anh Mỹ chỉ hành vi thái quá tột cùng."
      }
    ]
  },

  "8_1_warmandtoasty": {
    idiom_headword: "warm and toasty",
    current_figurative_meaning: "Ấm cúng, dễ chịu, thư thái thoải mái trước cái lạnh buốt giá bên ngoài (tiếng Anh Mỹ)",
    literal_image: "Lát bánh mì nướng (toast) vừa được nướng vàng ươm từ lò, tỏa nhiệt ấm áp, thơm phức và giòn xốp.",
    figurative_connection: "Cảm giác dễ chịu khi cơ thể được bao bọc trong chăn ấm hoặc sưởi ấm bên lò sưởi được liên tưởng trực tiếp đến sự ấm áp của chiếc bánh mì vừa nướng chín tới.",
    historical_context: "Khẩu ngữ Mỹ thế kỷ 20, xuất hiện trong các mẩu quảng cáo chăn nệm và quần áo giữ nhiệt mùa đông từ thập niên 1950, sau đó đi vào ngôn ngữ đời sống hàng ngày.",
    deep_example: "Wrapped in a cashmere blanket with hot cocoa beside the roaring fireplace, we felt completely warm and toasty despite the blizzard outside.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Merriam-Webster Dictionary — toasty",
        url: "https://www.merriam-webster.com/dictionary/toasty",
        note: "Định nghĩa tính từ toasty: comfortably warm and snug."
      },
      {
        title: "Cambridge English Dictionary — toasty",
        url: "https://dictionary.cambridge.org/dictionary/english/toasty",
        note: "Ngữ cảnh miêu tả sự ấm áp dễ chịu trước thời tiết lạnh giá."
      }
    ]
  },

  "8_1_butterfingers": {
    idiom_headword: "a butterfingers",
    current_figurative_meaning: "Người vụng về, tay lóng ngóng hay làm tuột tay rơi vỡ đồ đạc hoặc chụp hụt bóng",
    literal_image: "Những ngón tay như thể bị bọc một lớp bơ trơn nhẫy, chạm vào bất cứ vật thể nào cũng khiến vật đó trượt tuột rơi xuống đất.",
    figurative_connection: "Phép ẩn dụ phóng đại hài hước về sự lóng ngóng, thiếu khéo léo của đôi bàn tay, thường dùng để trêu đùa khi ai đó vô tình làm rơi vỡ chén đĩa hoặc đánh rơi bóng trong thể thao.",
    historical_context: "Xuất hiện trong văn học Anh từ đầu thế kỷ 17. Thành ngữ được đại văn hào Charles Dickens làm sống động trong tác phẩm 'The Pickwick Papers' (1837) khi miêu tả một cầu thủ cricket lóng ngóng đón hụt bóng.",
    deep_example: "Be extremely gentle with those antique porcelain teacups; our cousin is a notorious butterfingers who has shattered three glasses this week.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder — Butterfingers",
        url: "https://www.phrases.org.uk/meanings/butterfingers.html",
        note: "Trích dẫn cổ từ năm 1615 trong The English Huswife và Dickens năm 1837."
      },
      {
        title: "Oxford English Dictionary — butter-fingers",
        url: "https://www.oed.com/view/Entry/25396",
        note: "Lịch sử định nghĩa từ lóng chỉ sự vụng về trong đời sống và thể thao cricket."
      }
    ]
  },

  "8_1_eathumblepie": {
    idiom_headword: "eat humble pie",
    current_figurative_meaning: "Ngậm đắng nuốt cay công khai thừa nhận sai lầm và xin lỗi, cúi đầu nhận lỗi sau khi đã mạnh miệng huênh hoang",
    literal_image: "Chiếc bánh nướng nhồi nội tạng hươu nai (tim, gan, thận, ruột) gọi là 'umbles', món ăn đạm bạc dành riêng cho tầng lớp tôi tớ phục vụ trong lâu đài.",
    figurative_connection: "Hiện tượng chơi chữ đồng âm (pun) kinh điển: trong các bữa tiệc săn hươu thời Trung cổ, lãnh chúa và khách quý ăn thịt đùi hươu hảo hạng (venison), còn người hầu dưới bếp chỉ được ăn 'umble pie'. Do từ 'umble' phát âm giống 'humble' (hạ mình), hành động ăn bánh nội tạng chuyển thành biểu tượng của việc chịu nhục, hạ mình nhận sai.",
    historical_context: "Bắt nguồn từ ẩm thực quý tộc Norman-Anh thế kỷ 14-15 (từ gốc tiếng Pháp cổ 'nombles' biến âm thành 'umbles'). Đến thế kỷ 19, từ ngữ được cố định thành dạng ẩn dụ 'eat humble pie' trong tiếng Anh hiện đại.",
    deep_example: "After publicly predicting the competitor's software would fail within weeks, the tech analyst had to eat humble pie when their IPO soared.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder — Eat humble pie",
        url: "https://www.phrases.org.uk/meanings/eat-humble-pie.html",
        note: "Nghiên cứu nguồn gốc từ món umble pie của người hầu thời Trung cổ Anh."
      },
      {
        title: "Oxford English Dictionary — humble pie",
        url: "https://www.oed.com/view/Entry/89279",
        note: "Biến âm từ nombles -> umbles sang humble pie từ thế kỷ 15 đến thế kỷ 19."
      }
    ]
  },

  "8_1_sourgrapes": {
    idiom_headword: "sour grapes",
    current_figurative_meaning: "Tâm lý chê nho còn xanh — thói đố kỵ ghen tức, giả vờ chê bai hạ thấp thứ mà bản thân không thể đạt được để tự an ủi lòng mình",
    literal_image: "Con cáo đói nhảy mãi không với tới chùm nho mọng nước trên giàn cao bèn quay gót bỏ đi và tự nhủ rằng nho còn xanh và chua chát lắm.",
    figurative_connection: "Cơ chế tự vệ tâm lý (rationalization) kinh điển của con người: khi bất lực không với tới thành công hay phần thưởng của người khác, kẻ đố kỵ liền quay sang chê bai phần thưởng đó tầm thường, vô giá trị.",
    historical_context: "Xuất phát từ truyện ngụ ngôn 'Con cáo và chùm nho' (The Fox and the Grapes) của nhà văn ngụ ngôn Hy Lạp cổ đại Aesop (thế kỷ thứ 6 TCN). Thành ngữ 'sour grapes' được ghi nhận trong văn học Anh từ thế kỷ 16.",
    deep_example: "Dismissing the prestigious scholarship as an overrated waste of time was purely sour grapes on his part after his application was rejected.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder — Sour grapes",
        url: "https://www.phrases.org.uk/meanings/sour-grapes.html",
        note: "Nguồn gốc từ truyện ngụ ngôn Aesop và sự tiếp nhận vào tiếng Anh từ thế kỷ 16."
      },
      {
        title: "Oxford English Dictionary — sour grapes",
        url: "https://www.oed.com/view/Entry/185202",
        note: "Các dẫn chứng văn học từ tác phẩm của John Foxe (1570) đến nay."
      }
    ]
  },

  "8_1_bitoffmorechew": {
    idiom_headword: "bit off more than I could chew",
    current_figurative_meaning: "Ôm đồm quá sức, nhận lãnh trách nhiệm hoặc dự án vượt quá khả năng thực tế của bản thân",
    literal_image: "Dùng răng cắn một miếng thức ăn hoặc tảng thuốc lá quá to ngập đầy khoang miệng, khiến hai hàm răng không thể nghiền nát và có nguy cơ nghẹt thở.",
    figurative_connection: "Sự tham lam trong việc ăn uống dẫn đến tắc nghẽn thể chất được chuyển nghĩa sang sự tham vọng thiếu tính toán trong công việc: gánh vác quá nhiều nghĩa vụ khiến người thực hiện rơi vào khủng hoảng quá tải.",
    historical_context: "Xuất phát từ thói quen nhai thuốc lá sợi nén (chewing tobacco) của những người khai hoang miền Tây nước Mỹ vào thế kỷ 19. Việc cắn một tảng thuốc lá quá dày vào miệng được xem là trò dại dột của những người thiếu kinh nghiệm.",
    deep_example: "By agreeing to manage three software deployments while studying for the bar exam, David undoubtedly bit off more than he could chew.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder — Bite off more than you can chew",
        url: "https://www.phrases.org.uk/meanings/bite-off-more-than-you-can-chew.html",
        note: "Tài liệu hóa tập tục nhai thuốc lá Mỹ thế kỷ 19 và các ghi nhận báo chí thập niên 1870."
      },
      {
        title: "Oxford English Dictionary — bite off (more than one can chew)",
        url: "https://www.oed.com/view/Entry/19507",
        note: "Lịch sử định nghĩa khẩu ngữ Mỹ từ năm 1871."
      }
    ]
  },

  "8_1_butterup": {
    idiom_headword: "buttered her up",
    current_figurative_meaning: "Nịnh bợ, tâng bốc ngọt ngào, vuốt ve lòng tự ái của ai đó nhằm mục đích nhờ vả hoặc cầu xin lợi ích",
    literal_image: "Phết một lớp bơ béo ngậy mềm mại lên lát bánh mì thô ráp để làm cho nó trở nên thơm ngon, trơn tru và dễ nuốt.",
    figurative_connection: "Lời khen ngợi ngọt ngào, tâng bốc được ví như lớp bơ béo làm dịu đi sự khó tính, khắt khe của đối phương, khiến họ mềm lòng và dễ dàng đồng ý đáp ứng thỉnh cầu của mình.",
    historical_context: "Có hai nguồn gốc văn hóa: một từ tập tục tôn giáo Ấn Độ cổ đại ném những viên bơ ghee vào tượng thần để cầu xin phước lành; nguồn thứ hai và phổ biến hơn là phép ẩn dụ ẩm thực châu Âu thế kỷ 18 về việc phết bơ làm mềm thức ăn thô cứng.",
    deep_example: "The marketing intern buttered up the design director with extravagant praise on his portfolio before requesting a personal recommendation letter.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "The Phrase Finder — Butter up",
        url: "https://www.phrases.org.uk/meanings/butter-up.html",
        note: "Khảo cứu tập tục tôn giáo Ấn Độ và ẩn dụ bơ làm mềm thức ăn phương Tây."
      },
      {
        title: "Oxford English Dictionary — butter (verb, to flatter)",
        url: "https://www.oed.com/view/Entry/25391",
        note: "Ghi nhận nghĩa bóng 'tâng bốc nịnh nọt' từ năm 1734."
      }
    ]
  },

  "8_1_selllikehotcakes": {
    idiom_headword: "selling like hotcakes",
    current_figurative_meaning: "Bán đắt như tôm tươi, hàng hóa được người tiêu dùng đổ xô mua sạch với tốc độ chóng mặt",
    literal_image: "Những mẻ bánh pancake nóng hổi vừa được rán xong trên chảo lửa tại các hội chợ, tỏa khói ngào ngạt khiến đám đông xếp hàng mua hết sạch ngay khi vừa ra lò.",
    figurative_connection: "Tốc độ tiêu thụ chớp nhoáng của món bánh nướng nóng sốt, thơm ngon và giá rẻ tại các phiên chợ trở thành chuẩn mực so sánh cho bất kỳ sản phẩm thương mại nào có sức hút thị trường khổng lồ.",
    historical_context: "Bắt nguồn từ các hội chợ nhà thờ và lễ hội nông nghiệp tại Mỹ đầu thế kỷ 19 (khoảng thập niên 1830). Thuật ngữ 'hotcakes' (bánh pancake bột ngô rán nóng) được ghi nhận trong văn học Mỹ từ năm 1839.",
    deep_example: "Within twenty minutes of the presale announcement, tickets for the acoustic arena tour were selling like hotcakes across international ticketing portals.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder — Sell like hot cakes",
        url: "https://www.phrases.org.uk/meanings/sell-like-hot-cakes.html",
        note: "Xuất xứ từ lễ hội nhà thờ Mỹ thập niên 1830 và ghi nhận của Sam Slick năm 1839."
      },
      {
        title: "Oxford English Dictionary — hot-cake (sell like)",
        url: "https://www.oed.com/view/Entry/88775",
        note: "Tư liệu văn học Mỹ thế kỷ 19 chứng minh sự phổ biến của cụm từ."
      }
    ]
  },

  "8_1_walkeggshells": {
    idiom_headword: "walk on eggshells",
    current_figurative_meaning: "Cực kỳ cẩn trọng, nơm nớp lo sợ, rón rén từng lời nói và cử chỉ để tránh làm người khác nổi giận hay phật lòng",
    literal_image: "Bước đi bằng chân trần trên một mặt sàn trải đầy vỏ trứng gà mỏng manh, cố gắng không tạo ra một tiếng rắc hay làm nứt vỡ bất kỳ mảnh vỏ nào.",
    figurative_connection: "Vỏ trứng là biểu tượng tột cùng của sự giòn tan, dễ vỡ; việc phải sống hay làm việc bên cạnh một người có tính khí thất thường, dễ nổi cáu đòi hỏi sự dè dặt, căng thẳng thần kinh tột độ.",
    historical_context: "Biến thể của thành ngữ cổ 'walk on eggs' (xuất hiện từ đầu thế kỷ 17, ghi nhận năm 1600). Dạng hiện đại 'walk on eggshells' trở nên phổ biến tại Mỹ vào thế kỷ 20 trong tâm lý học giao tiếp và trị liệu gia đình.",
    deep_example: "Whenever our volatile senior partner entered the courtroom, the junior associates felt compelled to walk on eggshells to avoid triggering a tempestuous outburst.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "The Phrase Finder — Walk on eggshells",
        url: "https://www.phrases.org.uk/meanings/walk-on-eggshells.html",
        note: "Lịch sử biến đổi từ 'walk on eggs' (1600) sang 'walk on eggshells' thế kỷ 20."
      },
      {
        title: "Oxford English Dictionary — eggshell (walk on)",
        url: "https://www.oed.com/view/Entry/59938",
        note: "Phân tích ẩn dụ về sự mong manh và căng thẳng tâm lý trong giao tiếp."
      }
    ]
  }
};
