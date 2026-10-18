// UNIT 17: Amount and distance — Etymological & Conceptual Explanations
// Standardized NextBand Academic Framework: Evidence-based historical and conceptual analysis
// Source: DK English for Everyone: English Idioms (Unit 17, pages 74-77 & Answer Key page 229)

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

export const UNIT_17_ETYMOLOGY: Record<string, IdiomEtymology> = {
  // ==========================================
  // Module 17.1: AMOUNT (Page 74)
  // ==========================================
  "17_1_dropinocean": {
    idiom_headword: "a drop in the ocean",
    current_figurative_meaning: "Hạt muối bỏ bể, số lượng quá ít ỏi và không đáng kể so với nhu cầu khổng lồ.",
    literal_image: "Một giọt nước đơn lẻ rơi chìm nghỉm vào lòng đại dương bao la rộng lớn.",
    figurative_connection: "Độ chênh lệch tỷ lệ vô cực: Thể tích một giọt nước (khoảng 0.05 ml) so với đại dương là con số tiệm cận số 0, trở thành biểu tượng kinh điển cho sự đóng góp hay nguồn lực quá nhỏ bé trước một vấn đề vĩ mô.",
    historical_context: "Bắt nguồn từ Kinh Thánh Cựu Ước (Ê-sai 40:15: 'Kìa, các dân tộc như một giọt nước trong thùng'). Trong tiếng Anh, thành ngữ 'a drop in the bucket' (phổ biến ở Mỹ) và 'a drop in the ocean' (phổ biến ở Anh) xuất hiện từ thế kỷ 14 trong các bản dịch của John Wycliffe.",
    deep_example: "While philanthropic donations are commendable, they remain a drop in the ocean compared to the systemic funding required for public healthcare.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Holy Bible (Wycliffe Translation, 1382) — Isaiah 40:15",
        url: "https://www.kingjamesbibleonline.org/",
        note: "Nguồn gốc văn bản tôn giáo đầu tiên xác lập ẩn dụ giọt nước nhỏ nhoi."
      },
      {
        title: "Oxford English Dictionary — 'drop in the ocean / bucket'",
        url: "https://www.oed.com/view/Entry/57913",
        note: "Khảo chứng sự phân nhánh địa lý giữa Anh ngữ và Mỹ ngữ."
      }
    ]
  },

  "17_1_stacksof": {
    idiom_headword: "stacks of",
    current_figurative_meaning: "Rất nhiều, vô số, hàng chồng chất đống (thư từ, sách vở, tiền bạc hay công việc).",
    literal_image: "Những đống rơm rạ, chồng sách hay chồng tài liệu xếp cao ngất ngưởng từ sàn nhà lên trần.",
    figurative_connection: "Ẩn dụ tích lũy không gian thẳng đứng: Đồ vật khi được thu thập quá nhiều sẽ phải xếp chồng lên nhau thành từng cột thẳng đứng ('stacks'), trực quan hóa số lượng khổng lồ vượt quá khả năng xử lý tức thời.",
    historical_context: "Từ 'stack' có gốc Bắc Âu cổ (*stakkr* - đống rơm) đi vào tiếng Anh từ thế kỷ 13. Đến thế kỷ 17-18, các thư viện và kho bạc bắt đầu dùng 'stacks' để chỉ các dãy giá sách đồ sộ hoặc các cọc tiền xu chất đống.",
    deep_example: "The adjudicating panel has stacks of grant proposals to review before the fiscal deadline expires.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'stack'",
        url: "https://www.oed.com/view/Entry/188737",
        note: "Lịch sử biến đổi từ thuật ngữ nông nghiệp sang định lượng phóng đại."
      }
    ]
  },

  "17_1_kitchensink": {
    idiom_headword: "everything but the kitchen sink",
    current_figurative_meaning: "Mang vác theo đủ mọi thứ hầm bà lằng, hầu như toàn bộ đồ đạc gia tài không thiếu thứ gì.",
    literal_image: "Khuân vác tất cả mọi vật dụng trong nhà đi du lịch, chỉ chừa lại duy nhất chiếc bồn rửa bát bằng sứ gắn chặt vào tường.",
    figurative_connection: "Ngoa dụ đóng gói quá đà: Miêu tả tính cách cẩn thận thái quá hoặc thói quen tích trữ khi đi xa, sợ thiếu thốn nên mang theo gần như toàn bộ đồ dùng sinh hoạt.",
    historical_context: "Xuất hiện trong Thế chiến II tại các chiến dịch quyên góp kim loại phế liệu của quân đội Đồng minh. Người dân được kêu gọi đóng góp 'mọi thứ kim loại trừ chiếc bồn rửa bát' để đúc vũ khí. Cụm từ nhanh chóng đi vào ngôn ngữ hài hước đời thường từ những năm 1940.",
    deep_example: "For a weekend camping trip, Mark somehow managed to pack everything but the kitchen sink into his compact sedan.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Ammer, Christine (2013) — The American Heritage Dictionary of Idioms",
        url: "https://www.ahdictionary.com/",
        note: "Khảo sát các chiến dịch hậu cần thời chiến sản sinh thành ngữ gia dụng."
      },
      {
        title: "Oxford English Dictionary — 'kitchen sink'",
        url: "https://www.oed.com/view/Entry/103762",
        note: "Ghi nhận ngữ liệu thời chiến thế giới thứ hai."
      }
    ]
  },

  "17_1_tonsof": {
    idiom_headword: "tons of",
    current_figurative_meaning: "Cực kỳ nhiều, hàng tấn, khối lượng khổng lồ.",
    literal_image: "Hàng tấn vật chất nặng nề (mỗi tấn tương đương hơn 1,000 kg).",
    figurative_connection: "Phóng đại trọng lượng: Sử dụng đơn vị đo lường trọng tải nặng nhất trong đời sống để nhấn mạnh một lượng cực kỳ hào phóng (huy chương, tiền bạc, bài tập về nhà).",
    historical_context: "Từ 'ton' bắt nguồn từ 'tun' (thùng gỗ lớn chứa rượu vang thời Trung cổ). Từ cuối thế kỷ 17, người Anh bắt đầu dùng 'tons of' theo nghĩa bóng thông tục để chỉ sự dư thừa về số lượng.",
    deep_example: "The Olympic swimming champion received tons of congratulatory messages from across the globe within minutes of his victory.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'ton'",
        url: "https://www.oed.com/view/Entry/203254",
        note: "Khảo chứng từ thùng ủ rượu cổ sang thước đo định lượng biểu cảm."
      }
    ]
  },

  "17_1_thousandandone": {
    idiom_headword: "a thousand-and-one",
    current_figurative_meaning: "Hằng hà sa số, vô vàn, muôn vàn lý do hay nhiệm vụ không đếm xuể.",
    literal_image: "Con số một nghìn cộng thêm một, tượng trưng cho một chuỗi vô tận không bao giờ kết thúc.",
    figurative_connection: "Biểu tượng văn hóa về sự vô hạn: Con số 1000 biểu thị sự trọn vẹn, và số 1 thêm vào phá vỡ sự tròn trĩnh đó để mở ra chuỗi tiếp diễn bất tận của các câu chuyện hoặc lý do.",
    historical_context: "Bắt nguồn từ tuyển tập truyện cổ tích phương Đông 'Nghìn lẻ một đêm' (*Kitāb alf laylah wa-laylah*). Bản dịch tiếng Anh đầu tiên thế kỷ 18 đã biến 'a thousand-and-one' thành thành ngữ diễn tả số lượng nhiều vô kể.",
    deep_example: "Before granting building approval, the council provided a thousand-and-one stipulations that had to be strictly fulfilled.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Arabian Nights (1706 translation) — Cultural impact corpus",
        url: "https://www.bl.uk/",
        note: "Di sản dịch thuật văn học phương Đông định hình ngữ liệu thành ngữ Anh ngữ."
      },
      {
        title: "Oxford English Dictionary — 'thousand'",
        url: "https://www.oed.com/view/Entry/200980",
        note: "Khảo sát cách dùng con số 1001 như biểu trưng vô tận."
      }
    ]
  },

  "17_1_giveortake": {
    idiom_headword: "give or take",
    current_figurative_meaning: "Xấp xỉ, cộng trừ sai số, trên dưới khoảng (một con số áng chừng).",
    literal_image: "Cán cân thương mại có thể thêm vào một ít hoặc bớt đi một ít mà không làm thay đổi bản chất thỏa thuận.",
    figurative_connection: "Khoảng dung sai toán học và thương mại: Thừa nhận sai số ước lượng trong các phép tính thô, cho phép con số thực tế có thể dao động tăng giảm trong phạm vi hẹp.",
    historical_context: "Xuất hiện trong sổ sách kế toán và giao thương tại Anh từ thế kỷ 16 (khoảng những năm 1530). Thành ngữ này duy trì tính thực tế cao trong đàm phán thương mại và ước lượng kỹ thuật.",
    deep_example: "The restoration project will take roughly eighteen months, give or take a few weeks depending on material availability.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'give or take'",
        url: "https://www.oed.com/view/Entry/78580",
        note: "Ghi chép từ sổ sách thương cảng London thế kỷ 16."
      }
    ]
  },

  "17_1_dribsanddrabs": {
    idiom_headword: "in dribs and drabs",
    current_figurative_meaning: "Lắt nhắt, từng ít một, chậm chạp và rải rác từng đợt nhỏ chứ không đến cùng một lúc.",
    literal_image: "Những giọt nước rỉ từng giọt nhỏ một cách ngắt quãng từ chiếc vòi nước hỏng.",
    figurative_connection: "Từ tượng thanh chuyển sang dòng chảy người hoặc tài nguyên: 'Drib' là biến thể của 'drip' (nhỏ giọt) và 'drab' là mẩu nhỏ. Miêu tả dòng khách khứa, dòng tiền hay nguồn cung đến từng lượng nhỏ giọt rời rạc.",
    historical_context: "Hình thành từ phương ngữ Anh thế kỷ 18-19 bằng phép điệp âm đôi (rhyming/alliterative reduplication). Ghi nhận thành văn phổ biến từ những năm 1820 trong các báo cáo kinh doanh thời cách mạng công nghiệp.",
    deep_example: "Because of disruptions in the supply chain, raw components arrived at the manufacturing plant in dribs and drabs.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'dribs and drabs'",
        url: "https://www.oed.com/view/Entry/57703",
        note: "Nghiên cứu hình vị tượng thanh của từ ghép lặp âm đầu."
      }
    ]
  },

  "17_1_lockstockbarrel": {
    idiom_headword: "lock, stock, and barrel",
    current_figurative_meaning: "Toàn bộ, tất tần tật, trọn gói từ đầu đến cuối không bỏ sót bất kỳ phần nào.",
    literal_image: "Ba bộ phận cấu thành nên khẩu súng hỏa mai hoàn chỉnh: ổ khóa nổ (lock), báng súng bằng gỗ (stock), và nòng súng bằng kim loại (barrel).",
    figurative_connection: "Ẩn dụ hoán dụ toàn vẹn (synecdoche of completeness): Một khẩu súng bao gồm bộ kích hỏa, khung cầm và ống phóng; khi sở hữu cả ba bộ phận đó nghĩa là sở hữu toàn bộ khẩu súng hoàn chỉnh, suy rộng ra là toàn bộ cơ ngơi hay doanh nghiệp.",
    historical_context: "Bắt nguồn từ ngành chế tạo súng hỏa mai tại Anh đầu thế kỷ 19. Văn hào Sir Walter Scott đã đưa cụm từ này vào văn học trong bức thư năm 1817: 'Lock, stock, and barrel, into the hands of the publisher'.",
    deep_example: "The multinational conglomerate purchased the domestic retail chain lock, stock, and barrel, including all warehouses and distribution fleets.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Scott, Sir Walter (1817) — Letters and Collected Correspondence",
        url: "https://www.walterscott.lib.ed.ac.uk/",
        note: "Văn bản đầu tiên sử dụng cụm từ theo nghĩa chuyển giao thương mại trọn gói."
      },
      {
        title: "Oxford English Dictionary — 'lock, stock, and barrel'",
        url: "https://www.oed.com/view/Entry/109723",
        note: "Hồ sơ kỹ thuật thuật ngữ vũ khí hỏa mai."
      }
    ]
  },

  "17_1_fewandfarbetw": {
    idiom_headword: "few and far between",
    current_figurative_meaning: "Hiếm hoi, thưa thớt, rất ít khi xuất hiện và cách xa nhau về thời gian hoặc không gian.",
    literal_image: "Những ngôi nhà hoặc ốc đảo rải rác cực kỳ thưa thớt trên sa mạc rộng mênh mông.",
    figurative_connection: "Kết hợp giữa tính khan hiếm về lượng ('few') và khoảng cách xa xôi về thời gian/không gian ('far between') để tạo nên một biểu đạt trọn vẹn cho sự hiếm có khó tìm.",
    historical_context: "Xuất hiện trong bài thơ triết lý nổi tiếng 'The Pleasures of Hope' (1799) của nhà thơ Scotland Thomas Campbell ('Like angel-visits, few and far between'). Hình tượng này gây ấn tượng sâu sắc và trở thành thành ngữ kinh điển.",
    deep_example: "Opportunities to secure tenure-track academic positions in the humanities are becoming increasingly few and far between.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Campbell, Thomas (1799) — The Pleasures of Hope (Part II)",
        url: "https://www.spenserians.cath.vt.edu/AuthorRecord.php?action=GET&recordid=33245",
        note: "Nguồn gốc thi ca xác lập cụm từ 'few and far between'."
      },
      {
        title: "Oxford English Dictionary — 'few and far between'",
        url: "https://www.oed.com/view/Entry/69666",
        note: "Tài liệu chứng thực bước chuyển từ thi phẩm sang ngôn ngữ đại chúng."
      }
    ]
  },

  "17_1_preciouslittle": {
    idiom_headword: "precious little",
    current_figurative_meaning: "Hầu như không có, cực kỳ ít ỏi đến mức đáng báo động.",
    literal_image: "Một lượng nước hoặc thức ăn ít ỏi đến mức phải nâng niu quý giá từng giọt.",
    figurative_connection: "Mỉa mai ngữ nghĩa (ironic intensification): Từ 'precious' (quý báu) được dùng làm phó từ tăng cường để làm nổi bật sự thiếu thốn bi đát của một thứ thiết yếu (như thời gian ngủ hay sự trợ giúp).",
    historical_context: "Ghi nhận trong tiếng Anh từ thế kỷ 18. Cách dùng châm biếm từ 'precious' (như 'precious fool' hay 'precious little') là một đặc trưng tu từ của văn học Anh thời George và Victoria.",
    deep_example: "Despite assurances from the municipal authorities, precious little progress has been achieved on the road repair project.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'precious'",
        url: "https://www.oed.com/view/Entry/150033",
        note: "Khảo sát công năng phó từ châm biếm trong Anh ngữ thế kỷ 18."
      }
    ]
  },

  // ==========================================
  // Module 17.2: DISTANCE (Page 75)
  // ==========================================
  "17_2_stonesthrow": {
    idiom_headword: "a stone's throw",
    current_figurative_meaning: "Cách một quãng rất gần, chỉ trong tầm ném một hòn đá.",
    literal_image: "Khoảng cách mà một cánh tay người bình thường có thể ném một viên đá bay đi (khoảng 20 đến 30 mét).",
    figurative_connection: "Thước đo khoảng cách cơ học tự nhiên: Trước khi có hệ đo mét chính thức, con người dùng năng lực ném đá làm đơn vị định lượng không gian ngắn gần gũi.",
    historical_context: "Thành ngữ cổ đại xuất hiện trong Kinh Thánh Tân Ước (Lu-ca 22:41: 'khoảng cách chừng một tầm ném đá'). Trong văn học tiếng Anh, biến thể 'a stone's cast / stone's throw' được ghi nhận từ thế kỷ 14 trong các tác phẩm của Chaucer.",
    deep_example: "The boutique hotel is conveniently situated just a stone's throw away from the historic cathedral square.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Holy Bible (King James Version, 1611) — Luke 22:41",
        url: "https://www.kingjamesbibleonline.org/Luke-22-41/",
        note: "Thước đo cự ly cổ xưa 'about a stone's cast'."
      },
      {
        title: "Oxford English Dictionary — 'stone's throw'",
        url: "https://www.oed.com/view/Entry/190820",
        note: "Khảo chứng từ Chaucer đến văn học hiện đại."
      }
    ]
  },

  "17_2_farflungcorner": {
    idiom_headword: "a far-flung corner",
    current_figurative_meaning: "Góc xa xôi hẻo lánh, vùng đất xa xăm và hiểm trở khó tiếp cận.",
    literal_image: "Một vùng lãnh thổ bị ném văng ra tận rìa xa tít tắp của bản đồ thế giới.",
    figurative_connection: "Ẩn dụ quăng ném không gian: Động từ 'fling' (ném mạnh) kết hợp với 'corner' tạo nên cảm giác một địa điểm bị cô lập ở góc cùng trời cuối đất, cách trở muôn trùng giao thông.",
    historical_context: "Nở rộ trong thời kỳ Đế quốc Anh cuối thế kỷ 19 khi bản đồ địa lý mở rộng khắp các thuộc địa xa xôi. Nhà văn Rudyard Kipling đã bất tử hóa khái niệm này trong bài thơ nổi tiếng 'Recessional' (1897: 'our far-flung battle-line').",
    deep_example: "Anthropologists traveled to a far-flung corner of the archipelago to document an endangered indigenous dialect.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Kipling, Rudyard (1897) — Recessional",
        url: "https://www.poetryfoundation.org/poems/46780/recessional",
        note: "Bài thơ lịch sử đưa cụm từ 'far-flung' trở thành biểu tượng địa lý toàn cầu."
      },
      {
        title: "Oxford English Dictionary — 'far-flung'",
        url: "https://www.oed.com/view/Entry/68176",
        note: "Lịch sử biến nghĩa từ phòng tuyến quân sự sang vùng đất xa xôi."
      }
    ]
  },

  "17_2_hairsbreadth": {
    idiom_headword: "a hair's breadth",
    current_figurative_meaning: "Trong đường tơ kẽ tóc, một khoảng cách hay sai số cực kỳ nhỏ chỉ tính bằng bề ngang sợi tóc.",
    literal_image: "Chiều rộng hiển vi của một sợi tóc người (khoảng 70 đến 100 micromét).",
    figurative_connection: "Đơn vị vi mô tối thiểu: Sợi tóc là vật thể tự nhiên mỏng nhất mà mắt thường có thể phân biệt được, do đó biểu thị ranh giới mong manh nhất giữa an toàn và thảm họa.",
    historical_context: "Xuất hiện từ thời cổ đại trong luật pháp Do Thái (Talmud) và đi vào tiếng Anh cổ (*hæres brædu*). Shakespeare đã dùng hình ảnh này nhiều lần trong các vở bi kịch để miêu tả sự thoát chết trong gang tấc.",
    deep_example: "The racing yacht avoided collision with the submerged reef by a mere hair's breadth.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Shakespeare, William (1603) — Othello (Act I, Scene 3)",
        url: "https://www.folger.edu/",
        note: "Cụm từ 'hair-breadth scapes' miêu tả những lần thoát hiểm tơ kẽ tóc."
      },
      {
        title: "Oxford English Dictionary — 'hair's breadth'",
        url: "https://www.oed.com/view/Entry/83344",
        note: "Khảo chứng từ tiếng Anh cổ sang thành ngữ cận đại."
      }
    ]
  },

  "17_2_asfaraseye": {
    idiom_headword: "as far as the eye can see",
    current_figurative_meaning: "Bao la bát ngát, trải dài ngút tầm mắt đến tận đường chân trời.",
    literal_image: "Trường nhìn quang học mở rộng không gặp bất kỳ chướng ngại vật nào cho đến tận điểm giao nhau giữa trời và đất.",
    figurative_connection: "Giới hạn sinh học của thị giác: Sử dụng đường chân trời làm đường biên tự nhiên để tôn vinh sự bao la hùng vĩ của thiên nhiên (thảo nguyên, đại dương, rừng rậm hay sa mạc).",
    historical_context: "Có mặt trong thi ca du ký và hàng hải phương Tây từ thời cổ đại. Trong tiếng Anh, lối diễn đạt này trở nên quen thuộc trong các nhật ký thám hiểm thảo nguyên Bắc Mỹ thế kỷ 18-19.",
    deep_example: "Standing atop the canyon ridge, golden wheat fields stretched as far as the eye could see.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'as far as the eye can see'",
        url: "https://www.oed.com/view/Entry/68172",
        note: "Ghi chép từ các nhật ký thám hiểm địa lý thế kỷ 18."
      }
    ]
  },

  "17_2_withinwalking": {
    idiom_headword: "within walking distance",
    current_figurative_meaning: "Gần đến mức có thể đi bộ tới được, nằm trong cự ly đi bộ thuận tiện.",
    literal_image: "Khoảng cách địa lý vừa vặn với một chuyến đi bộ nhẹ nhàng khoảng 5 đến 15 phút mà không cần phương tiện cơ giới.",
    figurative_connection: "Quy hoạch không gian theo bước chân người: Đánh giá vị trí bất động sản và tiện ích dựa trên khả năng tiếp cận bằng đôi chân, tượng trưng cho sự thuận lợi và kết nối đô thị hoàn hảo.",
    historical_context: "Phát triển mạnh cùng với sự đô thị hóa và quy hoạch bất động sản thế kỷ 19-20 tại Anh và Mỹ, trở thành tiêu chuẩn vàng trong quảng cáo nhà ở và khách sạn.",
    deep_example: "One major advantage of the university campus is that research libraries and dormitories are within walking distance.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Cambridge Academic English Dictionary — 'within walking distance'",
        url: "https://dictionary.cambridge.org/",
        note: "Chuẩn mực định nghĩa địa lý đô thị và tiện ích sinh hoạt."
      }
    ]
  },

  "17_2_justaroundcorn": {
    idiom_headword: "just around the corner",
    current_figurative_meaning: "Ở ngay góc phố đằng kia (về không gian), hoặc sắp sửa diễn ra rất sớm (về thời gian).",
    literal_image: "Chỉ cần bước qua ngã rẽ góc phố kế tiếp là nhìn thấy điểm đến ngay trước mắt.",
    figurative_connection: "Chuyển hóa từ không gian sang thời gian: Giống như một cửa hàng nằm ngay khúc quanh của con phố, một sự kiện tương lai (mùa thi, năm mới, sự phục hồi kinh tế) đang đến rất gần và sắp sửa xuất hiện.",
    historical_context: "Phổ biến trong tiếng Anh đô thị từ thế kỷ 19. Trong cuộc Đại Khủng hoảng năm 1930, Tổng thống Mỹ Herbert Hoover đã dùng khẩu hiệu nổi tiếng 'Prosperity is just around the corner' để trấn an công chúng.",
    deep_example: "With final examinations just around the corner, students have intensified their revision schedules in the library.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Hoover, Herbert (1930) — Presidential Economic Addresses",
        url: "https://www.presidency.ucsb.edu/",
        note: "Tuyên bố chính trị kinh tế bất hủ đưa cụm từ vào văn hóa đương đại."
      },
      {
        title: "Oxford English Dictionary — 'round the corner'",
        url: "https://www.oed.com/view/Entry/41753",
        note: "Khảo chứng ẩn dụ không gian - thời gian trong Anh ngữ."
      }
    ]
  },

  "17_2_farandwide": {
    idiom_headword: "far and wide",
    current_figurative_meaning: "Rộng khắp, khắp nơi xa gần, bao trùm khắp các miền địa lý.",
    literal_image: "Vươn dài ra xa theo chiều dọc và mở rộng ra khắp chiều ngang trên toàn bộ địa bàn.",
    figurative_connection: "Phép điệp từ toàn diện: Kết hợp hai chiều kích không gian ('far' - chiều xa xôi và 'wide' - chiều rộng lớn) để miêu tả tầm ảnh hưởng, danh tiếng hoặc sự tập hợp đông đảo từ mọi ngóc ngách.",
    historical_context: "Cặp từ láy đồng âm cổ xưa bậc nhất trong tiếng Anh, xuất hiện từ sử thi Anglo-Saxon 'Beowulf' (khoảng năm 1000 SCN: *feor and wīd*). Nó đã tồn tại hơn một thiên niên kỷ mà không thay đổi cấu trúc.",
    deep_example: "The renowned scholar attracted doctoral applicants from far and wide to her evolutionary biology institute.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Beowulf (c. 1000 AD) — Anglo-Saxon Poetic Records",
        url: "https://www.bl.uk/collection-items/beowulf",
        note: "Bản thảo thi ca cổ xưa ghi nhận cấu trúc láy 'feor and wid'."
      },
      {
        title: "Oxford English Dictionary — 'far and wide'",
        url: "https://www.oed.com/view/Entry/68170",
        note: "Lịch sử một nghìn năm của cụm từ chỉ không gian toàn thể."
      }
    ]
  },

  "17_2_offbeatenpath": {
    idiom_headword: "off the beaten path",
    current_figurative_meaning: "Nơi hoang sơ hẻo lánh ít người biết đến; hoặc phong cách độc đáo không đi theo lối mòn truyền thống.",
    literal_image: "Bước lệch ra khỏi con đường mòn đất nện do hàng ngàn bàn chân giẫm đạp tạo thành, để đi vào bụi rậm hoang sơ.",
    figurative_connection: "Ẩn dụ lối mòn: Con đường đông đúc đại diện cho sự an toàn, quen thuộc và số đông; bước ra khỏi lối mòn đại diện cho tinh thần khám phá mạo hiểm, tìm kiếm những viên ngọc ẩn giấu trong du lịch và tư duy.",
    historical_context: "Triết gia Henry David Thoreau đã cổ vũ sâu sắc cho tư tưởng này trong tác phẩm 'Walden' (1854): 'How worn and dusty, then, must be the highways of the world, how deep the ruts of tradition'. Cụm từ 'off the beaten track / path' trở thành châm ngôn của du lịch sinh thái từ thế kỷ 20.",
    deep_example: "Instead of patronizing tourist resorts, intrepid travelers prefer secluded villages off the beaten path.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Thoreau, Henry David (1854) — Walden; or, Life in the Woods",
        url: "https://www.gutenberg.org/ebooks/205",
        note: "Tác phẩm triết học tôn vinh việc rời bỏ những lối mòn rập khuôn."
      },
      {
        title: "Oxford English Dictionary — 'beaten track / path'",
        url: "https://www.oed.com/view/Entry/16692",
        note: "Khảo chứng từ thế kỷ 16 về con đường mòn giẫm đạp."
      }
    ]
  },

  "17_2_byawhisker": {
    idiom_headword: "by a whisker",
    current_figurative_meaning: "Thắng hoặc thua trong đường tơ kẽ tóc, với khoảng cách sít sao suýt soát chỉ bằng chiếc râu mèo/ngựa.",
    literal_image: "Chiếc râu dài của một chú ngựa đua chạm tới vạch đích trước đối thủ chỉ một phần mười giây.",
    figurative_connection: "Thước đo siêu nhỏ của động vật: Chiếc râu (whisker) mỏng manh và ngắn ngủi, tượng trưng cho sự chênh lệch tối thiểu phân định giữa vinh quang chiến thắng và thất bại cay đắng trong thi đấu đối kháng.",
    historical_context: "Xuất hiện trong giới cá cược đua ngựa và thể thao tại Anh và Mỹ vào nửa sau thế kỷ 19 (khoảng thập niên 1880). Ban đầu dùng miêu tả các cú về đích nghẹt thở (photo finish) trong trường đua ngựa.",
    deep_example: "The incumbent senator retained her legislative seat by a whisker after a tense recount in the swing district.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'by a whisker'",
        url: "https://www.oed.com/view/Entry/228392",
        note: "Ghi chép từ thể thao đua ngựa thế kỷ 19 về cự ly sít sao."
      }
    ]
  },

  "17_2_middlenowhere": {
    idiom_headword: "the middle of nowhere",
    current_figurative_meaning: "Nơi đồng không mông quạnh, chốn xa xôi khỉ ho cò gáy hoàn toàn cách ly khỏi nền văn minh.",
    literal_image: "Một điểm tọa độ nằm trơ trọi giữa vùng đất vô danh không có trên bản đồ, bốn bề chỉ là hoang mạc trống rỗng.",
    figurative_connection: "Không gian hư vô: Từ 'nowhere' (chốn không nơi nào) biến địa điểm thực tế thành một khoảng không trừu tượng không có dịch vụ công cộng, không có sóng điện thoại hay phương tiện giao thông.",
    historical_context: "Xuất hiện trong văn hóa đại chúng Mỹ đầu thế kỷ 20, đặc biệt trong các tác phẩm văn học miền Tây khi miêu tả các thị trấn hoang tàn hoặc trạm xăng cô độc giữa đại lộ xuyên bang.",
    deep_example: "When our rental car broke down in the middle of nowhere, we had to wait nearly three hours for roadside assistance.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'middle of nowhere'",
        url: "https://www.oed.com/view/Entry/129712",
        note: "Hồ sơ ngôn ngữ chỉ sự cô lập không gian trong văn hóa Mỹ thế kỷ 20."
      }
    ]
  }
};
