// UNIT 05: Good things — Etymological & Conceptual Explanations
// Standardized NextBand Academic Framework: Evidence-based historical and conceptual analysis

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

export const UNIT_05_ETYMOLOGY: Record<string, IdiomEtymology> = {
  "5_1_bestslicedbread": {
    idiom_headword: "the best thing since sliced bread",
    current_figurative_meaning: "Một phát minh, sản phẩm hoặc ý tưởng mang tính đột phá và tuyệt vời nhất từ trước đến nay",
    literal_image: "Bánh mì đóng gói cắt lát sẵn bằng máy tự động được Otto Frederick Rohwedder sáng chế và thương mại hóa năm 1928 tại Chillicothe, Missouri (Mỹ).",
    figurative_connection: "Trước năm 1928, các gia đình phải tự dùng dao cắt bánh mì tại nhà, các lát bánh thường bị vụn nát và không đều. Phát minh bánh mì cắt sẵn tiện lợi đến mức các chiến dịch quảng cáo thời đó ca ngợi đây là 'bước tiến vĩ đại nhất trong ngành làm bánh mì', từ đó biến thành thước đo cửa miệng cho mọi sáng kiến tuyệt đỉnh.",
    historical_context: "Cụm từ xuất hiện từ đầu thập niên 1930 tại Mỹ và trở nên phổ biến toàn cầu sau Thế chiến II. Thời báo Time và các tạp chí tiêu dùng thường xuyên dùng để tôn vinh các tiện ích gia đình mới.",
    deep_example: "My kids think their new interactive tablet is the best thing since sliced bread; it has completely transformed how they read books.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder (Phrases.org.uk) — The best thing since sliced bread",
        url: "https://www.phrases.org.uk/meanings/the-best-thing-since-sliced-bread.html",
        note: "Tài liệu lịch sử về máy cắt bánh mì của Otto Rohwedder (1928) và sự hình thành thành ngữ."
      },
      {
        title: "Oxford English Dictionary — sliced bread",
        url: "https://www.oed.com/view/Entry/181677",
        note: "Ghi nhận văn bản sử dụng thành ngữ từ giữa thế kỷ 20."
      }
    ]
  },

  "5_1_stoletheshow": {
    idiom_headword: "steal the show",
    current_figurative_meaning: "Trở thành tâm điểm chú ý, thu hút toàn bộ sự tán thưởng và hào quang của một sự kiện",
    literal_image: "Thuật ngữ sân khấu kịch nghệ: một diễn viên phụ có màn trình diễn xuất thần đến mức 'đoạt lấy' (steal) toàn bộ sự hoan nghênh của khán giả khỏi tay các diễn viên chính.",
    figurative_connection: "Ánh hào quang của buổi diễn vốn được thiết kế cho nhân vật trung tâm, nhưng một cá nhân khác lại tỏa sáng rực rỡ đến mức khiến mọi người chỉ nhớ đến họ.",
    historical_context: "Xuất hiện trong giới sân khấu Broadway và phê bình nghệ thuật Mỹ vào thập niên 1920 (song hành với 'steal the spotlight').",
    deep_example: "Marcelo was only cast in a supporting role, but his powerful tenor solo stole the show and earned a five-minute standing ovation.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Green's Dictionary of Slang — steal the show",
        url: "https://greensdictofslang.com/entry/vknf5fq",
        note: "Lịch sử tiếng lóng sân khấu Mỹ từ những năm 1920."
      },
      {
        title: "Oxford English Dictionary — steal, v. (idioms)",
        url: "https://www.oed.com/view/Entry/189498",
        note: "Định nghĩa chuyên ngành biểu diễn nghệ thuật chỉ việc thu hút sự chú ý áp đảo."
      }
    ]
  },

  "5_1_beesknees": {
    idiom_headword: "the bee's knees",
    current_figurative_meaning: "Thứ tuyệt đỉnh, xuất sắc nhất, có chất lượng vượt trội không gì sánh bằng",
    literal_image: "Cụm từ ghép vần độc đáo trong trào lưu tiếng lóng thời kỳ Jazz Age (thập niên 1920) tại Mỹ: ghép tên loài động vật với một bộ phận cơ thể kỳ lạ để diễn tả sự sành điệu tột bậc.",
    figurative_connection: "Ong thợ mang phấn hoa dính vào các giỏ phấn ở chân sau; hình ảnh loài ong chăm chỉ với 'đầu gối' chứa đầy tinh túy hoa ngọt ngào trở thành biểu tượng cho sự hoàn hảo, tuyệt vời.",
    historical_context: "Vào cuối thế kỷ 18 ở Anh, 'bee's knee' từng được dùng mỉa mai để chỉ thứ không tồn tại (gửi người đi tìm mua đầu gối ong). Nhưng vào thập niên 1920 tại Mỹ, nó được hồi sinh thành tiếng lóng thời thượng cùng với 'the cat's pyjamas' và 'the flea's eyebrows'.",
    deep_example: "The artisanal Italian gelato at Giuseppe's parlor really is the bee's knees—creamy, rich, and utterly authentic.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder (Phrases.org.uk) — The bee's knees",
        url: "https://www.phrases.org.uk/meanings/the-bees-knees.html",
        note: "Khảo cứu lịch sử từ thế kỷ 18 đến làn sóng tiếng lóng Flapper thập niên 1920."
      },
      {
        title: "Etymonline — bee (n.)",
        url: "https://www.etymonline.com/word/bee",
        note: "Ghi nhận sự chuyển nghĩa sang chỉ người hoặc vật ưu tú vượt trội."
      }
    ]
  },

  "5_1_milesahead": {
    idiom_headword: "miles ahead of",
    current_figurative_meaning: "Vượt trội, tiến bộ hơn hẳn các đối thủ hoặc phiên bản cũ một khoảng cách rất xa",
    literal_image: "Trong các cuộc đua ngựa, đua xe hoặc chạy marathon đường trường, vận động viên dẫn đầu bỏ xa người về nhì hàng dặm đường (miles ahead).",
    figurative_connection: "Khoảng cách địa lý 'hàng dặm' được dùng làm ẩn dụ cho khoảng cách về trình độ công nghệ, năng lực chuyên môn hoặc chất lượng sản phẩm.",
    historical_context: "Phát triển tự nhiên từ ngôn ngữ thể thao đua đường trường thế kỷ 19 sang các lĩnh vực kinh doanh, công nghệ và giáo dục trong thế kỷ 20.",
    deep_example: "In terms of battery efficiency and processing power, this new microchip is miles ahead of anything currently on the market.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Oxford Learner's Dictionaries — miles ahead",
        url: "https://www.oxfordlearnersdictionaries.com/definition/english/mile_1",
        note: "Định nghĩa thành ngữ chỉ sự vượt trội áp đảo về năng lực hoặc tiêu chuẩn."
      },
      {
        title: "Cambridge Idioms Dictionary — miles ahead",
        url: "https://dictionary.cambridge.org/dictionary/english/miles-ahead",
        note: "Phân tích sắc thái so sánh hơn trong môi trường cạnh tranh thương mại."
      }
    ]
  },

  "5_1_firstclass": {
    idiom_headword: "first class (or a first-class job)",
    current_figurative_meaning: "Đạt tiêu chuẩn tuyệt hảo, đẳng cấp thượng thừa, được thực hiện mẫu mực không tì vết",
    literal_image: "Khoang hạng nhất (first class) trên tàu hỏa và các chuyến tàu thủy viễn dương thế kỷ 19 — nơi hành khách được hưởng dịch vụ xa hoa và chất lượng phục vụ hoàn hảo nhất.",
    figurative_connection: "Khi áp dụng cho một công việc hay sản phẩm, 'first-class' khẳng định sản phẩm đó đạt chuẩn mực cao nhất, không có bất kỳ khiếm khuyết nào.",
    historical_context: "Xuất hiện cùng với sự ra đời của hệ thống đường sắt thương mại tại Anh vào thập niên 1830, nhanh chóng trở thành tiêu chuẩn đo lường phẩm cấp xã hội và chất lượng dịch vụ.",
    deep_example: "The carpenters did a first-class job renovating our old library; every bookshelf is aligned with millimeter precision.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Etymonline — first-class (adj.)",
        url: "https://www.etymonline.com/word/first-class",
        note: "Ghi nhận xuất hiện từ năm 1838 trong ngành đường sắt Anh chỉ chất lượng tối cao."
      },
      {
        title: "Oxford English Dictionary — first class",
        url: "https://www.oed.com/view/Entry/70624",
        note: "Lịch sử định nghĩa khoang hạng nhất và sự mở rộng sang lao động xuất sắc."
      }
    ]
  },

  "5_1_outofthisworld": {
    idiom_headword: "out of this world",
    current_figurative_meaning: "Tuyệt vời ngoài sức tưởng tượng, đẹp đẽ hoặc ngon lành đến mức khó tin",
    literal_image: "Thứ gì đó vượt ra ngoài ranh giới trần tục của trái đất, dường như thuộc về một chiều không gian thiên đường hay thế giới kỳ ảo ngoài vũ trụ.",
    figurative_connection: "Trải nghiệm vượt trội đến mức các chuẩn mực thông thường của trần thế không còn đủ ngôn từ để diễn tả.",
    historical_context: "Bắt nguồn từ tiếng lóng âm nhạc Jazz và văn hóa khoa học viễn tưởng tại Mỹ vào thập niên 1930, trước khi kỷ nguyên du hành không gian bùng nổ.",
    deep_example: "The view of the sunrise from the mountain summit was totally out of this world; the golden clouds stretched endlessly below us.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Green's Dictionary of Slang — out of this world",
        url: "https://greensdictofslang.com/entry/q252r4y",
        note: "Tài liệu dẫn chứng tiếng lóng Mỹ từ năm 1938 chỉ những trải nghiệm phi thường."
      },
      {
        title: "Oxford English Dictionary — world, n. (phrases)",
        url: "https://www.oed.com/view/Entry/230234",
        note: "Ghi nhận quá trình hình thành thành ngữ trong thế kỷ 20."
      }
    ]
  },

  "5_1_thinkworldof": {
    idiom_headword: "think the world of (someone)",
    current_figurative_meaning: "Hết mực yêu thương, trân quý và ngưỡng mộ một ai đó sâu sắc",
    literal_image: "Đặt toàn bộ thế giới (the world) làm thước đo giá trị cho một người; coi người đó có ý nghĩa và tầm quan trọng bằng cả vũ trụ đối với mình.",
    figurative_connection: "Khi bạn 'nghĩ về ai đó như cả thế giới', mọi lời khuyên, sự hiện diện và hạnh phúc của họ đều chiếm vị trí thiêng liêng nhất trong trái tim bạn.",
    historical_context: "Phát triển từ cấu trúc tiếng Anh thế kỷ 19 'to think much of' (coi trọng), sau đó được nói quá lên thành 'think the world of' để biểu lộ tình cảm gia đình hoặc tình thầy trò thắm thiết.",
    deep_example: "Francisco thinks the world of his grandson; he keeps all the boy's childhood drawings framed in his workshop.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Merriam-Webster Dictionary — think the world of",
        url: "https://www.merriam-webster.com/dictionary/think%20the%20world%20of",
        note: "Định nghĩa tình cảm yêu thương, tôn trọng tột bậc đối với một người."
      },
      {
        title: "Cambridge English Dictionary — think the world of someone",
        url: "https://dictionary.cambridge.org/dictionary/english/think-the-world-of-someone",
        note: "Phân tích ngữ cảnh sử dụng trong các mối quan hệ thân thiết gắn bó."
      }
    ]
  },

  "5_1_worldclass": {
    idiom_headword: "world-class",
    current_figurative_meaning: "Đạt đẳng cấp quốc tế, thuộc nhóm tinh hoa hàng đầu thế giới trong một lĩnh vực",
    literal_image: "Đủ tiêu chuẩn và trình độ để đứng chung hàng ngũ với những vận động viên, nghệ sĩ hoặc viện nghiên cứu xuất sắc nhất trên phạm vi toàn cầu.",
    figurative_connection: "Không chỉ giỏi ở tầm địa phương hay quốc gia, mà năng lực đã được công nhận và so tài sòng phẳng ở cấp độ thế giới.",
    historical_context: "Xuất hiện vào giữa thế kỷ 20 trong thể thao đỉnh cao (Thế vận hội, giải vô địch thế giới) và sau đó lan sang kinh tế học để chỉ các tập đoàn đa quốc gia có năng lực cạnh tranh toàn cầu.",
    deep_example: "To compete against world-class swimmers, she undergoes rigorous altitude training for six hours every single day.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — world-class, adj.",
        url: "https://www.oed.com/view/Entry/230235",
        note: "Ghi nhận xuất hiện lần đầu năm 1950 trong văn cảnh thể thao quốc tế."
      },
      {
        title: "Collins English Dictionary — world-class",
        url: "https://www.collinsdictionary.com/dictionary/english/world-class",
        note: "Định nghĩa tiêu chuẩn xuất sắc được thừa nhận toàn cầu."
      }
    ]
  },

  "5_1_icingcake": {
    idiom_headword: "the icing on the cake",
    current_figurative_meaning: "Điều tuyệt vời bất ngờ được cộng thêm vào, làm cho một trải nghiệm vốn đã tốt đẹp nay càng thêm hoàn hảo",
    literal_image: "Lớp kem đường phủ (icing/frosting) ngọt ngào trang trí trên mặt chiếc bánh gato. Cốt bánh nướng đã rất ngon miệng, nhưng lớp kem phủ bên ngoài khiến nó thêm phần lộng lẫy và hấp dẫn.",
    figurative_connection: "Cốt bánh đại diện cho phần thưởng chính hoặc thành công cơ bản; lớp kem ngọt ngào là niềm vui cộng thêm đầy bất ngờ khiến sự việc trở nên trọn vẹn 100%.",
    historical_context: "Phổ biến trong tiếng Anh Anh từ đầu thế kỷ 20 (ở Mỹ thường dùng biến thể 'the frosting on the cake').",
    deep_example: "The scientific expedition was already a triumph, but discovering a previously unknown orchid was the icing on the cake.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "The Phrase Finder (Phrases.org.uk) — The icing on the cake",
        url: "https://www.phrases.org.uk/meanings/the-icing-on-the-cake.html",
        note: "Khảo cứu biến thể giữa Anh và Mỹ (icing vs frosting) và ý nghĩa niềm vui gia tăng."
      },
      {
        title: "Oxford Learner's Dictionaries — icing on the cake",
        url: "https://www.oxfordlearnersdictionaries.com/definition/english/icing-on-the-cake",
        note: "Định nghĩa thành ngữ chỉ điều làm tăng thêm niềm vui của một tình huống tốt."
      }
    ]
  },

  "5_1_ofherdreams": {
    idiom_headword: "of (one's) dreams",
    current_figurative_meaning: "Lý tưởng, hoàn hảo tuyệt đối, đúng như ước nguyện ấp ủ từ lâu trong tâm trí",
    literal_image: "Một vật thể hoặc cuộc sống chỉ từng xuất hiện trong những giấc mơ đẹp đẽ và sự tưởng tượng bay bổng nhất của một người.",
    figurative_connection: "Khi giấc mơ biến thành hiện thực hữu hình ngoài đời thực, mọi tiêu chuẩn khắt khe nhất đều được thỏa mãn một cách mỹ mãn.",
    historical_context: "Có nguồn gốc từ văn học lãng mạn thế kỷ 18–19 ('the girl of his dreams', 'the house of her dreams') miêu tả hình mẫu lý tưởng không tì vết.",
    deep_example: "After twenty years of saving, Elisa finally purchased the cottage of her dreams right on the tranquil shore of the lake.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Cambridge Advanced Learner's Dictionary — of your dreams",
        url: "https://dictionary.cambridge.org/dictionary/english/of-your-dreams",
        note: "Định nghĩa hình mẫu lý tưởng mà ai đó hằng mong ước sở hữu."
      },
      {
        title: "Oxford English Dictionary — dream, n. (phrases)",
        url: "https://www.oed.com/view/Entry/57608",
        note: "Lịch sử sử dụng cụm từ trong văn học lãng mạn phương Tây."
      }
    ]
  },

  "5_1_bestofbothworl": {
    idiom_headword: "the best of both worlds",
    current_figurative_meaning: "Vẹn cả đôi đường, được hưởng trọn lợi thế của hai phương án đối lập nhau mà không phải hy sinh điều gì",
    literal_image: "Ý niệm triết học và thần học cổ đại: một người vừa được tận hưởng những khoái lạc thanh cao của trần thế (this world), vừa nắm chắc phần thưởng phúc lạc trên cõi thiên đàng (the next world).",
    figurative_connection: "Trong đời sống hiện đại, nó diễn tả trạng thái lý tưởng khi bạn kết hợp được hai yếu tố dường như mâu thuẫn (ví dụ: vừa tiết kiệm tiền vừa rèn luyện sức khỏe, vừa làm việc tại nhà vừa giữ thu nhập cao).",
    historical_context: "Xuất hiện trong các tác phẩm văn học Anh thế kỷ 18. Nữ văn sĩ Mary Wortley Montagu từng viết trong một bức thư năm 1754: 'Nobody can have the best of both worlds'. Về sau cụm từ trở thành thành ngữ phổ biến.",
    deep_example: "Living in a quiet suburban town connected by high-speed rail gives us the best of both worlds: fresh country air and easy city access.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder (Phrases.org.uk) — The best of both worlds",
        url: "https://www.phrases.org.uk/meanings/the-best-of-both-worlds.html",
        note: "Ghi chép lịch sử thư từ của Mary Wortley Montagu (1754) và gốc gác thần học."
      },
      {
        title: "Oxford English Dictionary — best of both worlds",
        url: "https://www.oed.com/view/Entry/18167",
        note: "Phân tích ngữ nghĩa từ tôn giáo sang lối sống hiện đại cân bằng."
      }
    ]
  },

  "5_1_blessingdisguise": {
    idiom_headword: "a blessing in disguise",
    current_figurative_meaning: "Trong cái rủi có cái may; biến cố thoạt nhìn là bất hạnh nhưng về sau lại mang đến kết quả tuyệt vời",
    literal_image: "Một ân phước lành (blessing) của số phận nhưng lại khoác lên mình chiếc áo choàng ngụy trang (disguise) xấu xí, đen đủi của một tai ương.",
    figurative_connection: "Con người thường hoảng hốt trước mất mát ban đầu, nhưng chính sự đổ vỡ đó lại mở ra cánh cửa dẫn tới những cơ hội lớn lao hơn gấp bội.",
    historical_context: "Bắt nguồn từ bài thơ thánh ca 'Reflections on a Flower-Garden' (1746) của nhà văn kiêm mục sư người Anh James Hervey: 'Since all afflictions... are blessings in disguise'.",
    deep_example: "Losing my corporate job was truly a blessing in disguise; it gave me the courage to launch my own design studio, which is thriving.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "James Hervey — Meditations and Contemplations (1746)",
        url: "https://www.phrases.org.uk/meanings/a-blessing-in-disguise.html",
        note: "Trích dẫn nguyên văn bài thơ thánh ca khai sinh ra thành ngữ."
      },
      {
        title: "Oxford English Dictionary — blessing in disguise",
        url: "https://www.oed.com/view/Entry/20120",
        note: "Ghi nhận nguồn gốc tôn giáo thế kỷ 18 và quá trình thế tục hóa thành ngữ."
      }
    ]
  },

  "5_1_topoftheline": {
    idiom_headword: "top of the line",
    current_figurative_meaning: "Sản phẩm cao cấp nhất, tối tân nhất và đắt giá nhất trong một dòng sản phẩm",
    literal_image: "Thuật ngữ ngành sản xuất và phân phối hàng hóa tại Mỹ: vị trí cao nhất trên bảng danh mục chào hàng (product line) của nhà sản xuất.",
    figurative_connection: "Dòng sản phẩm được xếp ở nấc trên cùng luôn được trang bị linh kiện tốt nhất, tính năng độc quyền và độ hoàn thiện tinh xảo nhất.",
    historical_context: "Xuất hiện trong ngành tiếp thị và bán lẻ của Mỹ vào giữa thế kỷ 20 (thập niên 1950–1960), đối lập với 'bottom of the line' (dòng bình dân giá rẻ).",
    deep_example: "Chan's boutique exclusively imports watches that are top of the line, crafted with handmade Swiss movements.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Merriam-Webster Dictionary — top-of-the-line",
        url: "https://www.merriam-webster.com/dictionary/top-of-the-line",
        note: "Lịch sử định nghĩa thuật ngữ thương mại và sản xuất công nghiệp Mỹ."
      },
      {
        title: "Oxford English Dictionary — top of the line",
        url: "https://www.oed.com/view/Entry/203450",
        note: "Ghi nhận sự chuyển dịch từ danh mục hàng hóa sang ngôn ngữ đời thường."
      }
    ]
  },

  "5_1_todiefor": {
    idiom_headword: "to die for",
    current_figurative_meaning: "Cực kỳ ngon, cực kỳ hấp dẫn, tuyệt đỉnh đến mức khiến người ta say mê mê mẩn",
    literal_image: "Phép nói quá cường điệu (hyperbole): món ăn hoặc trải nghiệm tuyệt vời đến mức người ta sẵn sàng 'chết' để được thưởng thức hay sở hữu một lần.",
    figurative_connection: "Sự thèm muốn và thỏa mãn vị giác đạt tới đỉnh điểm, khiến mọi thứ khác trở nên lu mờ khi so sánh.",
    historical_context: "Xuất hiện trong tiếng Anh giao tiếp thân mật tại Mỹ vào cuối thế kỷ 20, ban đầu dùng trong ẩm thực và thời trang cao cấp.",
    deep_example: "The homemade truffle pasta at Max's bistro is absolutely to die for; the aroma alone is intoxicating.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Green's Dictionary of Slang — to die for",
        url: "https://greensdictofslang.com/entry/v7v6pcy",
        note: "Dẫn liệu tiếng lóng hiện đại cuối thế kỷ 20 chỉ sự say đắm tột cùng."
      },
      {
        title: "Cambridge Idioms Dictionary — to die for",
        url: "https://dictionary.cambridge.org/dictionary/english/to-die-for",
        note: "Phân tích ngữ cảnh khen ngợi hương vị món ăn hoặc vẻ đẹp quyến rũ."
      }
    ]
  },

  "5_1_mindblowing": {
    idiom_headword: "mind-blowing",
    current_figurative_meaning: "Gây kinh ngạc tột độ, sửng sốt và choáng ngợp trước quy mô hoặc sự kỳ vĩ phi thường",
    literal_image: "Trải nghiệm mãnh liệt đến mức dường như 'thổi tung' (blow) toàn bộ giới hạn nhận thức bình thường của trí não.",
    figurative_connection: "Khi đối diện với một kiệt tác nghệ thuật, một phát kiến khoa học vũ trụ hay một cảnh quan hùng vĩ, não bộ bị quá tải bởi sự thán phục.",
    historical_context: "Xuất hiện vào giữa thập niên 1960 trong làn sóng phản văn hóa (counterculture) tại Mỹ để miêu tả những trải nghiệm tác động mạnh đến ý thức, sau đó được phổ biến hóa thành tính từ khen ngợi phổ thông.",
    deep_example: "The astronomical exhibition featured a mind-blowing 3D simulation of galaxies colliding in deep space.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Online Etymology Dictionary — mind-blowing (adj.)",
        url: "https://www.etymonline.com/word/mind-blowing",
        note: "Ghi nhận xuất hiện từ năm 1966 trong văn hóa đại chúng Mỹ."
      },
      {
        title: "Oxford English Dictionary — mind-blowing",
        url: "https://www.oed.com/view/Entry/118742",
        note: "Định nghĩa trải nghiệm gây chấn động tâm lý hoặc sự thán phục tột bực."
      }
    ]
  },

  "5_1_ravereviews": {
    idiom_headword: "rave reviews",
    current_figurative_meaning: "Những lời khen ngợi nhiệt liệt, đánh giá 5 sao say mê từ giới chuyên môn và báo chí",
    literal_image: "Từ 'rave' bắt nguồn từ tiếng Pháp cổ 'raver' (mê sảng, nói một cách cuồng nhiệt và say đắm). Khi nhà phê bình viết bài với sự hào hứng tột độ không tiếc lời ca ngợi.",
    figurative_connection: "Trái ngược với những lời khen khách sáo, 'rave reviews' thể hiện sự ngưỡng mộ chân thành, cuồng nhiệt và thuyết phục tuyệt đối của một tác phẩm kịch nghệ, điện ảnh hay cuốn sách.",
    historical_context: "Xuất hiện trong giới phê bình sân khấu kịch nghệ New York và London vào đầu thế kỷ 20 (khoảng thập niên 1920) và nhanh chóng trở thành tiêu chuẩn vàng cho sự thành công thương mại.",
    deep_example: "Laura's debut theatrical play has received rave reviews across all national broadsheets, with critics hailing her as a visionary playwright.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — rave, n. & v.",
        url: "https://www.oed.com/view/Entry/158694",
        note: "Ghi nhận nghĩa 'an enthusiastically favorable review' từ năm 1926."
      },
      {
        title: "Etymonline — rave (v.)",
        url: "https://www.etymonline.com/word/rave",
        note: "Nguồn gốc gốc Pháp cổ và sự phát triển ngữ nghĩa trong ngành giải trí."
      }
    ]
  },

  "5_1_toughactfollow": {
    idiom_headword: "a tough act to follow",
    current_figurative_meaning: "Tiền nhiệm quá xuất sắc, để lại di sản quá lớn khiến người kế nhiệm vô cùng áp lực và khó có thể vượt qua",
    literal_image: "Thuật ngữ sân khấu tạp kỹ (Vaudeville) đầu thế kỷ 20: tiết mục biểu diễn trước quá hấp dẫn, làm cả khán phòng bùng nổ, khiến nghệ sĩ diễn tiết mục tiếp theo (the following act) rơi vào thế vô cùng khó khăn để giữ chân khán giả.",
    figurative_connection: "Khi một người lãnh đạo, một nghệ sĩ hay một vận động viên đạt tới đỉnh cao xuất chúng, bất kỳ ai bước tiếp vào vị trí đó đều phải đối mặt với cái bóng quá lớn.",
    historical_context: "Gắn liền với văn hóa biểu diễn tạp kỹ tại Mỹ và Anh từ những năm 1900–1920 trước khi lan sang giới quản trị kinh doanh và chính trị.",
    deep_example: "The former CEO doubled the company's revenue in five years; her tenure will definitely be a tough act to follow.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder (Phrases.org.uk) — A hard act to follow",
        url: "https://www.phrases.org.uk/meanings/a-hard-act-to-follow.html",
        note: "Lịch sử nguồn gốc sâu sắc từ sân khấu tạp kỹ Vaudeville đầu thế kỷ 20."
      },
      {
        title: "Green's Dictionary of Slang — act to follow",
        url: "https://greensdictofslang.com/entry/q769q2q",
        note: "Ghi chép các văn bản đầu tiên sử dụng trong nghệ thuật biểu diễn."
      }
    ]
  },

  "5_1_topnotch": {
    idiom_headword: "top-notch",
    current_figurative_meaning: "Đỉnh của chóp, xuất sắc bậc nhất, có phẩm cấp chất lượng thượng thừa",
    literal_image: "Thước đo gỗ hoặc bảng ghi điểm bằng gỗ thời xưa: người ta khắc từng rãnh/vết cắt (notch) để ghi nhận thành tích hoặc cấp độ. 'Top notch' chính là rãnh khắc ở vị trí cao nhất trên cùng.",
    figurative_connection: "Đạt tới nấc cao nhất trên thang đo tiêu chuẩn, không còn nấc nào có thể xếp cao hơn được nữa.",
    historical_context: "Xuất hiện trong tiếng Anh Mỹ vào thập niên 1840, ban đầu dùng trong các trò chơi dân gian hoặc đo lường kỹ thuật trước khi trở thành tính từ khen ngợi đại chúng.",
    deep_example: "Abel is a top-notch investigative journalist; his rigorous fact-checking and ethical reporting are admired industry-wide.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Online Etymology Dictionary — top-notch (adj.)",
        url: "https://www.etymonline.com/word/top-notch",
        note: "Ghi nhận xuất xứ từ năm 1848 trong tiếng Anh Mỹ từ hình ảnh vết khía ghi điểm."
      },
      {
        title: "Oxford English Dictionary — top notch, n. & adj.",
        url: "https://www.oed.com/view/Entry/203444",
        note: "Giải thích cơ chế ghi điểm và chuyển nghĩa sang chất lượng thượng hạng."
      }
    ]
  },

  "5_1_cremedelacreme": {
    idiom_headword: "the crème de la crème",
    current_figurative_meaning: "Tinh hoa của tinh hoa, nhóm cá nhân hoặc sự vật ưu tú, xuất sắc nhất trong một tập thể",
    literal_image: "Từ gốc tiếng Pháp 'la crème de la crème' (nghĩa đen: phần kem béo nhất của lớp váng kem). Khi sữa tươi nguyên chất lắng lại, lớp kem béo ngậy tinh túy nhất sẽ nổi lên trên cùng.",
    figurative_connection: "Nếu lớp kem đã là phần ngon nhất của sữa, thì 'kem của kem' chính là phần tinh hoa cô đọng nhất của những gì vốn đã thượng hạng.",
    historical_context: "Được giới quý tộc Anh mượn từ tiếng Pháp vào giữa thế kỷ 18. Huân tước Chesterfield đã sử dụng cụm từ này trong bức thư nổi tiếng năm 1750 để miêu tả giới thượng lưu văn hóa Paris.",
    deep_example: "Only the crème de la crème of young classical musicians are invited to perform at the annual Salzburg festival.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Lord Chesterfield's Letters to His Son (1750s)",
        url: "https://www.gutenberg.org/ebooks/3361",
        note: "Dẫn liệu lịch sử sớm nhất đưa cụm từ tiếng Pháp vào văn học Anh ngữ."
      },
      {
        title: "Oxford English Dictionary — crème de la crème",
        url: "https://www.oed.com/view/Entry/44222",
        note: "Định nghĩa tầng lớp tinh hoa thượng thặng được xã hội công nhận."
      }
    ]
  },

  "5_1_secondtonone": {
    idiom_headword: "second to none",
    current_figurative_meaning: "Không ai sánh bằng, vô địch thiên hạ, đứng ở vị trí số 1 tuyệt đối",
    literal_image: "Cấu trúc số học xếp hạng: chỉ đứng sau con số 'không' (none), nghĩa là trước mặt người đó không có bất kỳ đối thủ nào có thể vượt qua.",
    figurative_connection: "Một tuyên bố hùng hồn về sự vượt trội tuyệt đối, khẳng định vị thế dẫn đầu không thể bàn cãi.",
    historical_context: "Thành ngữ văn học cổ điển có từ thời Phục Hưng. Đại thi hào William Shakespeare đã sử dụng trong vở kịch 'The Comedy of Errors' (1594): 'of credit infinite, highly beloved, second to none that lives here'.",
    deep_example: "When it comes to delicate pastry making, Karolina's culinary technique is second to none; her croissants are legendary.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "William Shakespeare — The Comedy of Errors (Act V, Scene 1, 1594)",
        url: "https://www.folger.edu/explore/shakespeares-works/the-comedy-of-errors/read/",
        note: "Văn bản văn học cổ điển đầu tiên định hình cấu trúc 'second to none'."
      },
      {
        title: "Oxford English Dictionary — second to none",
        url: "https://www.oed.com/view/Entry/174488",
        note: "Lịch sử định nghĩa trạng thái độc tôn, không có đối thủ cạnh tranh."
      }
    ]
  }
};
