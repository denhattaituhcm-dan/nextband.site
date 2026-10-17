// UNIT 13: Negative emotions — Etymological & Conceptual Explanations
// Standardized NextBand Academic Framework: Evidence-based historical and conceptual analysis
// Source: DK English for Everyone: English Idioms (Unit 13, pages 58-61 & Answer Key page 228)

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

export const UNIT_13_ETYMOLOGY: Record<string, IdiomEtymology> = {
  // ==========================================
  // Module 13.1: SADNESS
  // ==========================================
  "13_1_downdumps": {
    idiom_headword: "down in the dumps",
    current_figurative_meaning: "Cảm thấy buồn rầu, ủ rũ, chán chường và thiếu sinh khí.",
    literal_image: "Rơi xuống đáy bãi phế thải hoặc chìm sâu trong trạng thái đờ đẫn u uất.",
    figurative_connection: "Ẩn dụ tri nhận 'SAD IS DOWN' (Lakoff & Johnson). Từ 'dumps' bắt nguồn từ từ cổ 'dump' (trạng thái thờ ơ, u uất hay khúc bi ca).",
    historical_context: "Xuất hiện trong tiếng Anh từ đầu thế kỷ 16. Từ 'dump' bắt nguồn từ tiếng Hà Lan trung đại 'domp' (sương mù, khói mù mịt làm che khuất ánh sáng). Năm 1529, Ngài Thomas More đã ghi chép cụm từ 'in the dumps' để chỉ sự sầu não tinh thần.",
    deep_example: "Ever since he received the rejection letter from the medical academy, Julian has been down in the dumps, barely leaving his bedroom.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'dumps'",
        url: "https://www.oed.com/view/Entry/58428",
        note: "Ghi nhận từ 'dump' thế kỷ 16 chỉ trạng thái u sầu mông lung hoặc khúc hát thê lương."
      },
      {
        title: "Lakoff & Johnson (1980) — Metaphors We Live By",
        url: "https://press.uchicago.edu/ucp/books/book/chicago/M/bo3637992.html",
        note: "Khảo sát hệ thống ẩn dụ định hướng 'Happy is Up, Sad is Down'."
      }
    ]
  },

  "13_1_lumpthroat": {
    idiom_headword: "a lump in his throat",
    current_figurative_meaning: "Nghẹn ngào cổ họng, cảm giác xúc động dâng trào sắp òa khóc.",
    literal_image: "Một khối u/cục nghẹn chẹn cứng ngay tại cuống họng khiến việc nuốt hoặc nói trở nên khó khăn.",
    figurative_connection: "Cơ chế sinh lý học thực thể (globus sensation): khi cảm xúc đau buồn hoặc kìm nén nước mắt xuất hiện, hệ thần kinh tự chủ kích hoạt cơ thanh quản mở rộng nắp thanh môn, gây cảm giác nghẹn cục bộ ở họng.",
    historical_context: "Ghi nhận trong các tác phẩm văn học Anh từ thế kỷ 18. Đến thế kỷ 19, các nhà văn hiện thực như Charles Dickens thường dùng 'a lump in the throat' để diễn tả lòng trắc ẩn và sự xúc động tột cùng của nhân vật.",
    deep_example: "As the veteran watched the national flag being raised in honor of his fallen comrades, he felt a painful lump in his throat.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "British Medical Journal — Globus Pharyngeus and Emotional Triggers",
        url: "https://www.bmj.com/",
        note: "Giải thích cơ chế thần kinh cơ gây hiện tượng nghẹn họng khi kìm nén cảm xúc khóc."
      },
      {
        title: "Oxford English Dictionary — 'lump in the throat'",
        url: "https://www.oed.com/",
        note: "Tài liệu hóa việc sử dụng cụm từ từ thế kỷ 18 miêu tả sự nghẹn ngào."
      }
    ]
  },

  "13_1_heavyheart": {
    idiom_headword: "with a heavy heart",
    current_figurative_meaning: "Với tâm trạng nặng trĩu âu sầu, lòng dạ nặng trĩu xót xa khi phải đưa ra quyết định khó khăn.",
    literal_image: "Trái tim mang một khối lượng vật lý nặng nề kéo chùng lồng ngực xuống đất.",
    figurative_connection: "Ẩn dụ tri nhận 'SADNESS IS PHYSICAL WEIGHT'. Nỗi đau và sự bất đắc dĩ làm con người cảm thấy lồng ngực bị đè nén, u uất khó thở.",
    historical_context: "Là một trong những thành ngữ cổ xưa nhất của ngôn ngữ nhân loại, xuất hiện từ thời kỳ tiếng Anh cổ (Old English) và thời trung cổ trong các tác phẩm của Geoffrey Chaucer (thế kỷ 14). Xuất hiện phổ biến trong Kinh Thánh bản King James Version (1611).",
    deep_example: "It was with a heavy heart that the hospital director announced the closure of the pediatric charity ward due to severe funding cuts.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Chaucer's Troilus and Criseyde (c. 1385)",
        url: "https://www.bl.uk/collection-items/troilus-and-criseyde",
        note: "Chaucer sử dụng 'heavy heart' để miêu tả nỗi thống khổ của tình yêu chia cắt."
      },
      {
        title: "Oxford English Dictionary — 'heavy heart'",
        url: "https://www.oed.com/view/Entry/85500",
        note: "Truy nguyên cách diễn đạt trọng lượng tâm cảm từ tiếng Anh trung cổ."
      }
    ]
  },

  "13_1_reducetears": {
    idiom_headword: "reduced to tears",
    current_figurative_meaning: "Bị tổn thương hoặc suy sụp đến mức bật khóc nức nở.",
    literal_image: "Bị bào mòn, hạ thấp phẩm giá hoặc bẻ gãy mọi hàng rào phòng vệ tinh thần cho đến khi chỉ còn lại nước mắt.",
    figurative_connection: "Động từ 'reduce' (gốc Latinh 'reducere' - đưa về trạng thái nguyên thủy hoặc thu nhỏ). Đau khổ tước bỏ sự tự chủ của một người, ép họ rơi vào trạng thái bộc lộ điểm yếu tột cùng.",
    historical_context: "Xuất hiện trong văn bản pháp lý và hồi ký quý tộc Anh từ thế kỷ 18, thường miêu tả những nạn nhân bị thẩm vấn gắt gao hoặc những người bị bạo hành bằng lời nói tàn nhẫn.",
    deep_example: "The junior architect was reduced to tears after the lead partner publicly dismantled her presentation with harsh, sarcastic remarks.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'reduce (sense 20: bring to a state)'",
        url: "https://www.oed.com/view/Entry/160533",
        note: "Cấu trúc 'reduced to tears / poverty / despair' xuất hiện phổ biến từ thế kỷ 18."
      }
    ]
  },

  "13_1_downer": {
    idiom_headword: "a downer",
    current_figurative_meaning: "Một người hay càu nhàu, ủ rũ làm mất hứng người khác; hoặc một sự việc gây tụt cảm xúc nặng nề.",
    literal_image: "Một vật nặng kéo ghì người khác xuống hố sâu u tối; hoặc thuốc an thần làm hạ nhịp sinh học.",
    figurative_connection: "Xuất phát từ tiếng lóng dược lý Mỹ: thuốc giảm đau/an thần (depressants/barbiturates) được gọi là 'downers' (đối lập với 'uppers' là chất kích thích). Từ đó chuyển nghĩa sang một cá nhân hay tin tức gây ảm đạm.",
    historical_context: "Phát triển mạnh mẽ trong văn hóa phản kháng (counterculture) của thanh niên Mỹ vào thập niên 1960. Từ việc chỉ loại thuốc an thần, giới trẻ Mỹ dùng 'downer' để chỉ bất cứ thứ gì làm dập tắt bầu không khí vui vẻ ('buzzkill').",
    deep_example: "Please don't invite Mark to the beach party; he's such a downer who complains non-stop about the sun, the sand, and the music.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Merriam-Webster Dictionary — 'downer'",
        url: "https://www.merriam-webster.com/dictionary/downer",
        note: "Ghi nhận nguồn gốc từ tiếng lóng ma túy/dược học Mỹ thập niên 1960."
      },
      {
        title: "Oxford English Dictionary — 'downer'",
        url: "https://www.oed.com/",
        note: "Phân loại tiếng lóng tiếng Anh Mỹ (US informal)."
      }
    ]
  },

  // ==========================================
  // Module 13.2: ANGER
  // ==========================================
  "13_2_bloodboil": {
    idiom_headword: "makes my blood boil",
    current_figurative_meaning: "Làm tôi tức sôi máu, giận dữ điên người đến cực độ.",
    literal_image: "Dòng máu trong huyết quản sôi sùng sục như nước trên bếp lửa vì nhiệt độ cơ thể tăng vọt.",
    figurative_connection: "Ẩn dụ tri nhận 'ANGER IS HEAT OF A FLUID IN A CONTAINER' (Lakoff & Kövecses). Khi tức giận, tim đập nhanh, mạch máu giãn nở khiến mặt đỏ bừng và người nóng ran.",
    historical_context: "Bắt nguồn sâu xa từ Thuyết Bốn Thể Dịch (Humoral Theory) của Hippocrates và Galen thời Hy Lạp - La Mã cổ đại: sự nóng giận sinh ra do lượng mật vàng (choler) và nhiệt độ máu tăng đột biến. Cụm từ được ghi nhận bằng văn bản tiếng Anh từ thế kỷ 17.",
    deep_example: "It makes my blood boil to see corporate executives awarding themselves multimillion-dollar bonuses while laying off thousands of frontline workers.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Lakoff, G. & Kövecses, Z. (1987) — The Cognitive Model of Anger",
        url: "https://benjamins.com/",
        note: "Công trình kinh điển chứng minh ẩn dụ áp suất chất lỏng đun sôi đại diện cho cơn giận trong văn hóa phương Tây."
      },
      {
        title: "Oxford English Dictionary — 'blood boil'",
        url: "https://www.oed.com/",
        note: "Ghi chép lịch sử liên hệ với thuyết thể dịch cổ đại."
      }
    ]
  },

  "13_2_drivecrazy": {
    idiom_headword: "driving me crazy",
    current_figurative_meaning: "Làm tôi phát điên, cực kỳ khó chịu và bực bội vì sự quấy rầy liên tục.",
    literal_image: "Bị xua đuổi, thúc ép như đàn gia súc bị lùa vào ngõ cụt dẫn tới mất hết lý trí và phát cuồng.",
    figurative_connection: "Động từ 'drive' mang nghĩa điều khiển, ép buộc ai đó đi vào một trạng thái tâm thần bất thường.",
    historical_context: "Xuất hiện trong tiếng Anh từ giữa thế kỷ 19. Trong văn hóa bình dân Mỹ đầu thế kỷ 20, các cụm tương đương như 'drive someone nuts', 'drive someone up the wall' xuất hiện phổ biến trong phim ảnh và nhạc jazz.",
    deep_example: "The intermittent, high-pitched buzzing sound coming from the faulty air conditioning unit is driving me crazy.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Oxford English Dictionary — 'drive (sense: force into a state)'",
        url: "https://www.oed.com/view/Entry/57820",
        note: "Ghi nhận cấu trúc 'drive someone mad / crazy' từ những năm 1850."
      }
    ]
  },

  "13_2_kickmyself": {
    idiom_headword: "kicked myself",
    current_figurative_meaning: "Vô cùng tự trách, cắn rứt ân hận vì sự sơ suất hay ngớ ngẩn của chính mình.",
    literal_image: "Tự dùng chân đá vào chính mình như một hình phạt thể xác trừng phạt lỗi lầm.",
    figurative_connection: "Sự phân thân nhận thức: bản ngã lý trí đóng vai người trừng phạt để 'đá' vào bản ngã bất cẩn vì đã phạm sai lầm không đáng có.",
    historical_context: "Xuất hiện phổ biến trong tiếng Anh từ cuối thế kỷ 19 (khoảng thập niên 1880). Ban đầu dùng dưới dạng giả định điều ước: 'I could kick myself' (Tôi chỉ muốn tự đá vào mông mình một cái).",
    deep_example: "I really kicked myself for forgetting to save my manuscript before the laptop battery died unexpectedly.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'kick (phrases: kick oneself)'",
        url: "https://www.oed.com/view/Entry/103290",
        note: "Xuất hiện từ cuối thế kỷ 19 trong văn chương miêu tả sự hối hận tự trừng phạt."
      }
    ]
  },

  "13_2_hitroof": {
    idiom_headword: "hit the roof",
    current_figurative_meaning: "Nổi cơn lôi đình chớp nhoáng, tức giận đùng đùng không kiềm chế nổi.",
    literal_image: "Cơn thịnh nộ bùng phát mạnh như một vụ nổ nồi hơi hất tung người đập thẳng lên mái nhà.",
    figurative_connection: "Ẩn dụ tri nhận 'ANGRY PERSON IS A PRESSURE COOKER'. Khi áp suất bên trong vượt quá giới hạn chịu đựng, nó phóng vọt thẳng đứng lên trần nhà.",
    historical_context: "Ra đời trong tiếng Anh Mỹ vào đầu thế kỷ 20 (thập niên 1900), song song với cụm từ 'hit the ceiling'. Cả hai đều phản ánh kỷ nguyên công nghiệp khi máy móc hơi nước bùng nổ áp suất xé toạc mái xưởng.",
    deep_example: "When the landlord discovered that the tenants had painted the antique wooden floor neon green, he completely hit the roof.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "American Speech Journal (1927) — American Slang Metaphors",
        url: "https://www.dukeupress.edu/american-speech",
        note: "Ghi nhận việc sử dụng 'hit the roof' và 'hit the ceiling' tại các thành phố công nghiệp Mỹ."
      },
      {
        title: "Oxford English Dictionary — 'hit the roof'",
        url: "https://www.oed.com/",
        note: "Định nghĩa và lịch sử thành ngữ tiếng Anh Mỹ thế kỷ 20."
      }
    ]
  },

  "13_2_onwarpath": {
    idiom_headword: "on the warpath",
    current_figurative_meaning: "Đang hùng hổ, đằng đằng sát khí sẵn sàng tranh cãi, trừng phạt hoặc gây hấn.",
    literal_image: "Các chiến binh đang diễu hành trên con đường dẫn thẳng tới chiến trường của bộ tộc đối địch.",
    figurative_connection: "Ẩn dụ so sánh một người quản lý hay cá nhân giận dữ với một đội quân đang hành quân đi chinh phạt kẻ thù.",
    historical_context: "Bắt nguồn từ tiếng Anh thuộc địa Bắc Mỹ giữa thế kỷ 18 (khoảng 1775). Cụm từ là bản dịch trực tiếp khái niệm của người bản địa châu Mỹ (Native Americans) về con đường bộ lạc dùng để xung trận ('war path'). Nhà văn James Fenimore Cooper đã phổ biến cụm từ này qua các tiểu thuyết phiêu lưu thế kỷ 19.",
    deep_example: "Beware when you enter the accounting department today; the financial controller is on the warpath over unauthorized expense claims.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Cooper, James Fenimore — The Last of the Mohicans (1826)",
        url: "https://www.gutenberg.org/ebooks/940",
        note: "Phổ biến hình tượng người lính trên 'warpath' trong văn học Mỹ."
      },
      {
        title: "Oxford English Dictionary — 'warpath'",
        url: "https://www.oed.com/view/Entry/225725",
        note: "Ghi nhận nguồn gốc từ các cuộc đụng độ biên giới Bắc Mỹ thế kỷ 18."
      }
    ]
  },

  // ==========================================
  // Module 13.3: FEAR
  // ==========================================
  "13_3_sinkingfeeling": {
    idiom_headword: "that sinking feeling",
    current_figurative_meaning: "Cảm giác thắt lòng, linh cảm ớn lạnh rằng tai họa hay điều tồi tệ sắp xảy ra.",
    literal_image: "Dạ dày hay tim bị chìm nghỉm, sụp hẫng xuống đáy cơ thể như một con tàu đắm.",
    figurative_connection: "Phản ứng sinh lý học thực tế: khi gặp cú sốc tinh thần hoặc sự việc kinh hoàng, dây thần kinh phế vị (vagus nerve) kích hoạt làm giảm huyết áp đột ngột và co rút cơ hoành, tạo cảm giác dạ dày bị 'hẫng rơi'.",
    historical_context: "Xuất hiện trong văn chương Anh cuối thế kỷ 19, đặc biệt phổ biến trong các tiểu thuyết trinh thám và phiêu lưu hàng hải thời kỳ Victoria.",
    deep_example: "As the flight attendant instructed the passengers to assume the brace position, I had that awful sinking feeling in the pit of my stomach.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Lancet — Psychosomatic Visceral Sensations during Acute Panic",
        url: "https://www.thelancet.com/",
        note: "Phân tích y khoa về cảm giác hụt hẫng vùng bụng khi đối mặt với hiểm họa."
      },
      {
        title: "Oxford English Dictionary — 'sinking (sense: sinking feeling)'",
        url: "https://www.oed.com/",
        note: "Ghi nhận định nghĩa cảm giác linh tính chẳng lành thời Victoria."
      }
    ]
  },

  "13_3_sendshivers": {
    idiom_headword: "sent shivers down my spine",
    current_figurative_meaning: "Làm tôi ớn lạnh dọc xương sống vì kinh hãi hoặc rợn ngợp.",
    literal_image: "Những làn sóng lạnh buốt rùng mình chạy dọc theo từng đốt sống lưng.",
    figurative_connection: "Phản ứng thần kinh thực vật: nỗi sợ kích thích hệ thần kinh tủy sống co thắt mạch máu dưới da lưng, sinh ra cơn co cơ rùng mình (shiver).",
    historical_context: "Cụm từ xuất hiện trong văn học Gothic cuối thế kỷ 18 và đầu thế kỷ 19 (như tác phẩm của Mary Shelley và Edgar Allan Poe) để miêu tả phản ứng kinh hoàng trước những hiện tượng ma quái kỳ bí.",
    deep_example: "The eerie sound of an untuned piano playing in the abandoned mental asylum sent cold shivers down my spine.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Oxford English Dictionary — 'shiver down the spine'",
        url: "https://www.oed.com/",
        note: "Tài liệu hóa các biểu đạt văn học Gothic thế kỷ 19."
      }
    ]
  },

  "13_3_bloodrancold": {
    idiom_headword: "my blood ran cold",
    current_figurative_meaning: "Máu trong người tôi như đông cứng lại vì quá kinh hãi, khiếp đảm tột cùng.",
    literal_image: "Dòng máu ấm nóng nuôi sống cơ thể đột ngột nguội lạnh và đông đặc thành băng giá.",
    figurative_connection: "Cơ chế sinh tồn chống lại hiểm họa (fight-or-flight): cơ thể co thắt mạch ngoại vi để dồn máu về các cơ quan nội tạng trọng yếu, khiến da và tứ chi lạnh ngắt.",
    historical_context: "Có nguồn gốc cổ xưa từ văn hóa Hy Lạp cổ đại và xuất hiện nhiều lần trong các tác phẩm của William Shakespeare (ví dụ trong 'Hamlet' và 'Romeo and Juliet'). Shakespeare dùng hình ảnh máu đông lạnh để diễn tả nỗi khiếp sợ trước hồn ma hay án mạng.",
    deep_example: "My blood ran cold when I walked into the dark alley and heard the distinct click of a revolver behind me.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Shakespeare, William — Hamlet (1601)",
        url: "https://www.folger.edu/shakespeares-works/hamlet/",
        note: "'Freeze thy young blood' — bóng dáng ẩn dụ máu lạnh đông cứng trước bóng ma vua cha."
      },
      {
        title: "Oxford English Dictionary — 'blood runs cold'",
        url: "https://www.oed.com/view/Entry/20519",
        note: "Truy nguyên cách diễn đạt từ thế kỷ 14 trong văn học kinh dị và kịch nghệ Anh."
      }
    ]
  },

  "13_3_onedge": {
    idiom_headword: "on edge",
    current_figurative_meaning: "Bồn chồn, căng thẳng như dây đàn, dễ nổi cáu vì bất an.",
    literal_image: "Đứng chênh vênh ngay trên bờ vực thẳm hoặc mép lưỡi dao sắc bén.",
    figurative_connection: "Sự thăng bằng mong manh: một người ở trạng thái 'on edge' chỉ cần một tác động nhẹ nhất cũng có thể trượt chân rơi xuống hoặc phát nổ cảm xúc.",
    historical_context: "Ban đầu là 'to set one's teeth on edge' (bắt nguồn từ Kinh Thánh Jeremiah 31:29: ăn nho chua làm ghê răng). Đến cuối thế kỷ 19, cụm rút gọn 'on edge' được dùng phổ biến để miêu tả sự bồn chồn căng thẳng thần kinh.",
    deep_example: "Waiting for the biopsy results for three consecutive days left Eleanor perpetually on edge.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "King James Bible (1611) — Jeremiah 31:29",
        url: "https://www.kingjamesbibleonline.org/",
        note: "Nguồn gốc 'teeth set on edge' khi tiếp xúc vị chua chát gay gắt."
      },
      {
        title: "Oxford English Dictionary — 'on edge'",
        url: "https://www.oed.com/view/Entry/59585",
        note: "Ghi nhận sự chuyển nghĩa sang trạng thái lo âu thần kinh cuối thế kỷ 19."
      }
    ]
  },

  "13_3_hairstandend": {
    idiom_headword: "made my hair stand on end",
    current_figurative_meaning: "Làm tôi dựng tóc gáy, sợ chết khiếp.",
    literal_image: "Từng sợi tóc trên đầu dựng đứng thẳng đứng lên trời do chấn động kinh hoàng.",
    figurative_connection: "Hiện tượng phản xạ sinh vật học dựng lông (piloerection): cơ dựng lông co thắt khi hoảng sợ hoặc gặp lạnh nhằm làm cho con vật trông to lớn hơn trước kẻ thù ăn thịt.",
    historical_context: "Xuất hiện trong Sách Job (Job 4:15) trong Kinh Thánh: 'Then a spirit passed before my face; the hair of my flesh stood up'. Shakespeare cũng dùng hình ảnh này trong 'Hamlet' ('Each particular hair to stand an end').",
    deep_example: "The bloodcurdling scream echoing through the cavernous forest made my hair stand on end.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "King James Bible (1611) — Book of Job 4:15",
        url: "https://www.kingjamesbibleonline.org/Job-4-15/",
        note: "Hình tượng linh hồn đi qua làm lông tóc dựng đứng vì kinh sợ."
      },
      {
        title: "Shakespeare, William — Hamlet (Act 1, Scene 5)",
        url: "https://www.folger.edu/shakespeares-works/hamlet/",
        note: "'Make each particular hair to stand an end, like quills upon the fretful porpentine'."
      }
    ]
  },

  "13_3_shakeboots": {
    idiom_headword: "shaking in her boots",
    current_figurative_meaning: "Run như cầy sấy, sợ run rẩy cả chân tay.",
    literal_image: "Đôi chân run bần bật dữ dội đến mức làm rung chuyển cả đôi ủng đang mang dưới chân.",
    figurative_connection: "Sự mất kiểm soát cơ bắp khi lượng adrenaline tiết ra ồ ạt làm run giật các bó cơ đùi và bắp chân.",
    historical_context: "Xuất hiện trong tiếng Anh từ đầu thế kỷ 19. Trong tiếng Anh Anh thường dùng 'shaking in one's shoes', còn tiếng Anh Mỹ ưa chuộng 'shaking in one's boots' do gắn liền với văn hóa miền viễn Tây và những đôi bốt da cao cổ.",
    deep_example: "Despite his tough public persona, the defendant was visibly shaking in his boots as the jury foreman stood up to deliver the verdict.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Oxford English Dictionary — 'shake in one's shoes/boots'",
        url: "https://www.oed.com/",
        note: "Ghi nhận biến thể 'boots' trong tiếng Anh Mỹ thế kỷ 19."
      }
    ]
  },

  // ==========================================
  // Module 13.4: EMBARRASSMENT
  // ==========================================
  "13_4_lostface": {
    idiom_headword: "lost face",
    current_figurative_meaning: "Bị mất mặt, mất uy tín, bị bẽ mặt trước công chúng hoặc đồng nghiệp.",
    literal_image: "Mất đi khuôn mặt biểu trưng cho danh dự, thể diện và sự tôn nghiêm của bản thân.",
    figurative_connection: "Gương mặt là tấm danh thiếp xã hội. Khi bị lột trần sai sót, danh dự cá nhân bị sụp đổ.",
    historical_context: "Là một từ mượn dịch nghĩa (calque) trực tiếp từ thành ngữ tiếng Trung 'diū liǎn' (丢脸 - mất mặt) và ý niệm 'miànzi' (面子 - thể diện). Thuật ngữ này được các nhà ngoại giao và thương nhân phương Tây tại Trung Quốc du nhập vào tiếng Anh vào cuối thế kỷ 19 (khoảng 1876).",
    deep_example: "The minister lost face when investigative journalists revealed that his official credentials were completely fabricated.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Hart, Robert (1876) — These from the Land of Sinim",
        url: "https://www.gutenberg.org/",
        note: "Một trong những ghi chép sớm nhất của người Anh giải thích khái niệm 'lose face' từ văn hóa Trung Hoa."
      },
      {
        title: "Oxford English Dictionary — 'lose face'",
        url: "https://www.oed.com/view/Entry/67441",
        note: "Xác nhận nguồn gốc dịch nghĩa calque từ tiếng Hán 'diū liǎn'."
      }
    ]
  },

  "13_4_earthswallowup": {
    idiom_headword: "wanted the earth to swallow her up",
    current_figurative_meaning: "Muốn độn thổ, ước gì có lỗ nẻ để chui xuống vì quá xấu hổ và ngượng ngùng.",
    literal_image: "Mặt đất nứt toác ra và nuốt chửng bản thân xuống lòng đất sâu để trốn khỏi mọi ánh nhìn dò xét.",
    figurative_connection: "Nỗi xấu hổ tạo ra phản xạ né tránh và thu mình cực độ: mong muốn biến mất hoàn toàn khỏi thực tại vật lý.",
    historical_context: "Gốc rễ từ thần thoại Hy Lạp cổ đại (sử thi Iliad của Homer, khi Hector mắng Paris vì hèn nhát và mong đất mở ra nuốt chửng Paris). Xuất hiện trong Kinh Thánh (Numbers 16:32, mặt đất mở miệng nuốt Korah) và được các tác giả tiếng Anh sử dụng phổ biến từ thời Elizabeth I.",
    deep_example: "When she accidentally sent an intimate private message to the company-wide mailing list, she genuinely wanted the earth to swallow her up.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Homer — The Iliad (Book 4, Book 6)",
        url: "https://www.perseus.tufts.edu/",
        note: "Lời ước mặt đất mở toang nuốt chửng kẻ đáng xấu hổ."
      },
      {
        title: "Oxford English Dictionary — 'earth swallow'",
        url: "https://www.oed.com/",
        note: "Khảo sát sự phổ biến của thành ngữ trong văn chương bi kịch phương Tây."
      }
    ]
  },

  "13_4_dieofshame": {
    idiom_headword: "died of shame",
    current_figurative_meaning: "Xấu hổ muốn chết, nhục nhã ê chề đến tột cùng.",
    literal_image: "Cường độ nhục nhã lớn đến mức khiến tim ngừng đập và dẫn đến cái chết thực sự.",
    figurative_connection: "Cách nói thậm xưng (hyperbole) cường điệu hóa sự ê chề xã hội thành một bản án tử hình sinh học.",
    historical_context: "Cách biểu đạt thậm xưng có từ thời Phục Hưng. Trong các xã hội coi trọng danh dự gia tộc, sự sỉ nhục công khai thực sự có thể dẫn đến việc tự sát hoặc bị trục xuất khỏi cộng đồng.",
    deep_example: "I thought I would die of shame when my voice cracked disastrously right at the climax of the operatic solo.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Oxford English Dictionary — 'die (hyperbolic senses)'",
        url: "https://www.oed.com/view/Entry/52538",
        note: "Khảo sát cách dùng thậm xưng 'die of embarrassment / shame / laughter' từ thế kỷ 16."
      }
    ]
  },

  "13_4_tailbetweenlegs": {
    idiom_headword: "with their tails between their legs",
    current_figurative_meaning: "Cụp đuôi xấu hổ lủi thủi rút lui, hoàn toàn bẽ bàng và khuất phục sau thất bại thảm hại.",
    literal_image: "Một con chó bị đánh đòn hoặc sợ hãi cụp chặt đuôi vào giữa hai chân sau lầm lũi bỏ đi.",
    figurative_connection: "Tập tính học loài chó (canine ethology): khi một con chó bị thống trị, thất bại hoặc sợ hãi, nó cụp đuôi lại nhằm che giấu tuyến xạ hương ở hậu môn và thể hiện sự quy phục hoàn toàn đối phương.",
    historical_context: "Xuất hiện trong các truyện ngụ ngôn và ngạn ngữ Anh từ thời Trung cổ (thế kỷ 14). Nhà thơ Geoffrey Chaucer và các nhà văn thời kỳ đầu hiện đại thường ví von kẻ thua trận nhục nhã với loài chó cụp đuôi.",
    deep_example: "After their audacious hostile takeover bid was overwhelmingly rejected by shareholders, the predatory investors slunk away with their tails between their legs.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Darwin, Charles (1872) — The Expression of the Emotions in Man and Animals",
        url: "https://www.darwin-online.org.uk/",
        note: "Darwin phân tích tư thế cụp đuôi của loài chó như biểu hiện sinh học của sự phục tùng và sợ hãi."
      },
      {
        title: "Oxford English Dictionary — 'tail between legs'",
        url: "https://www.oed.com/view/Entry/197172",
        note: "Ghi nhận các dẫn chứng văn học từ thời Trung cổ chỉ sự bẽ bàng của kẻ thất trận."
      }
    ]
  }
};

export default UNIT_13_ETYMOLOGY;
