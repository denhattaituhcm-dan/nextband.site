// UNIT 14: Memory — Etymological & Conceptual Explanations
// Standardized NextBand Academic Framework: Evidence-based historical and conceptual analysis
// Source: DK English for Everyone: English Idioms (Unit 14, pages 62-65 & Answer Key page 228-229)

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

export const UNIT_14_ETYMOLOGY: Record<string, IdiomEtymology> = {
  // ==========================================
  // Module 14.1: IDIOMS AND EXPRESSIONS ABOUT MEMORY (Page 62)
  // ==========================================
  "14_1_ontiptongue": {
    idiom_headword: "on the tip of my tongue",
    current_figurative_meaning: "Sắp nhớ ra rồi, từ ngữ đã ở ngay đầu môi nhưng chưa thể bật thốt ra thành tiếng.",
    literal_image: "Một từ ngữ vật lý đang nằm chênh vênh ở ngay đầu mút của chiếc lưỡi, chỉ chực rơi ra ngoài.",
    figurative_connection: "Hiện tượng tâm lý nhận thức học TOT (Tip-of-the-Tongue): não bộ đã kích hoạt ý niệm ngữ nghĩa (semantics) và cấu trúc cú pháp nhưng tạm thời bị tắc nghẽn ở khâu truy xuất vỏ âm thanh (phonological code).",
    historical_context: "Xuất hiện trong các thư tịch Hy Lạp và La Mã cổ đại (như nhà hùng biện Cicero). Trong tiếng Anh, cụm từ xuất hiện từ thế kỷ 16 và được nhà tâm lý học lỗi lạc William James khảo sát thực nghiệm trong tác phẩm kinh điển 'The Principles of Psychology' (1890).",
    deep_example: "Her surname was on the tip of my tongue throughout the reunion, but I had to wait until her nametag caught the light to address her properly.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "James, William (1890) — The Principles of Psychology",
        url: "https://psychclassics.yorku.ca/James/Principles/",
        note: "Khảo cứu khoa học đầu tiên mô tả trạng thái nhận thức 'Tip of the Tongue'."
      },
      {
        title: "Oxford English Dictionary — 'tip of the tongue'",
        url: "https://www.oed.com/view/Entry/202353",
        note: "Ghi chép cách diễn đạt từ thế kỷ 16 trong văn học Anh."
      }
    ]
  },

  "14_1_memorysieve": {
    idiom_headword: "a memory like a sieve",
    current_figurative_meaning: "Trí nhớ như cái rổ thủng, đãng trí kinh niên, nghe đâu quên đó.",
    literal_image: "Chiếc rây/sàng chứa đầy các lỗ lưới li ti, bất kỳ chất lỏng hay hạt mịn nào đổ vào đều lập tức chảy tuột hết ra ngoài.",
    figurative_connection: "Ẩn dụ nhận thức 'MIND IS A CONTAINER / MEMORIES ARE LIQUIDS': tâm trí là một vật chứa bị thủng lỗ chỗ, không có khả năng giữ lại thông tin được tiếp nhận.",
    historical_context: "Hình ảnh cái sàng rò rỉ ('leaky sieve') xuất phát từ thần thoại Hy Lạp về các nàng Danaïdes bị trừng phạt dưới địa ngục Tartarus phải gánh nước bằng rây thủng. Cụm từ tiếng Anh 'head like a sieve' hoặc 'memory like a sieve' xuất hiện trong văn bản từ thế kỷ 19.",
    deep_example: "Without my digital calendar and synchronized alerts, I have a memory like a sieve and would miss half of my client briefings.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'sieve (phrases: like a sieve)'",
        url: "https://www.oed.com/view/Entry/179450",
        note: "Tài liệu hóa ẩn dụ rổ thủng miêu tả sự mau quên từ thế kỷ 19."
      },
      {
        title: "Graves, Robert — The Greek Myths (The Danaïdes)",
        url: "https://www.penguin.co.uk/",
        note: "Điển tích địa ngục gánh nước bằng rổ thủng biểu trưng cho sự bất lực lưu giữ."
      }
    ]
  },

  "14_1_oneearoutother": {
    idiom_headword: "in one ear and out the other",
    current_figurative_meaning: "Vào tai này ra tai kia, không đọng lại chút gì trong tâm trí vì lơ đãng hoặc không chú ý.",
    literal_image: "Âm thanh bay thẳng vào ống tai trái, xuyên ngang qua khoảng không rỗng tuếch bên trong đầu rồi bay thẳng ra khỏi ống tai phải.",
    figurative_connection: "Ẩn dụ tri nhận rằng bộ não hoàn toàn rỗng không có vật cản hấp thu; lời nói đi qua cơ thể mà không hề để lại bất kỳ dấu ấn nhận thức nào.",
    historical_context: "Là một trong những thành ngữ cổ xưa nhất của nền văn minh phương Tây, được ghi nhận trong ngụ ngôn La Mã của Quintilian. Xuất hiện trong tiếng Anh từ thế kỷ 14 trong tác phẩm 'Confessio Amantis' (1390) của John Gower và trường ca của Geoffrey Chaucer.",
    deep_example: "The manager's warnings about safety compliance seem to go in one ear and out the other with the weekend construction crew.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Chaucer, Geoffrey — Troilus and Criseyde (c. 1385)",
        url: "https://www.bl.uk/collection-items/troilus-and-criseyde",
        note: "'One ere it herde, at the tother out it went' — dẫn chứng sớm nhất trong tiếng Anh trung cổ."
      },
      {
        title: "Oxford English Dictionary — 'in at one ear and out at the other'",
        url: "https://www.oed.com/view/Entry/58671",
        note: "Khảo sát tiến trình phát triển của thành ngữ suốt 7 thế kỷ."
      }
    ]
  },

  "14_1_memoriesfade": {
    idiom_headword: "memories are fading",
    current_figurative_meaning: "Ký ức dần phai mờ, hoài niệm nhạt nhòa theo năm tháng.",
    literal_image: "Một bức tranh sơn dầu hoặc ảnh chụp bị ánh nắng mặt trời chiếu rọi lâu ngày khiến màu sắc nhạt dần rồi tan biến.",
    figurative_connection: "Ẩn dụ 'MEMORIES ARE VISUAL ARTIFACTS': thời gian là tác nhân bào mòn vật lý làm suy giảm độ sắc nét của hình ảnh lưu trữ trong não bộ.",
    historical_context: "Khái niệm 'fading memory' xuất hiện trong văn học lãng mạn Anh thế kỷ 18-19 (Wordsworth, Coleridge, Lord Byron). Các nhà tâm lý học thế kỷ 19 như Hermann Ebbinghaus đã định lượng điều này qua 'Đường cong lãng quên' (Forgetting Curve, 1885).",
    deep_example: "With each passing decade, the living memories of the veterans who liberated the town are inevitably fading into written history.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Ebbinghaus, Hermann (1885) — Memory: A Contribution to Experimental Psychology",
        url: "https://psychclassics.yorku.ca/Ebbinghaus/",
        note: "Công trình kinh điển về sự suy giảm ký ức theo thời gian."
      },
      {
        title: "Oxford English Dictionary — 'fade (figurative: of memory)'",
        url: "https://www.oed.com/view/Entry/67554",
        note: "Ghi nhận việc sử dụng 'fade' miêu tả ký ức từ thế kỷ 17."
      }
    ]
  },

  "14_1_keepinmind": {
    idiom_headword: "keep in mind",
    current_figurative_meaning: "Ghi nhớ, luôn để tâm lưu ý một thông tin quan trọng để sử dụng sau này.",
    literal_image: "Cất giữ một vật báu cẩn thận bên trong một chiếc hòm bảo mật và liên tục kiểm tra nó.",
    figurative_connection: "Tâm trí là một không gian lưu trữ chủ động (active working memory buffer). 'Keep in mind' nghĩa là duy trì thông tin ở trạng thái sẵn sàng truy xuất.",
    historical_context: "Xuất hiện trong tiếng Anh cổ và tiếng Anh trung cổ dưới dạng 'haven in minde' (thế kỷ 14). Dạng 'keep in mind' trở thành cụm từ chuẩn mực trong văn phong pháp lý, triết học và hành chính Anh từ thế kỷ 16.",
    deep_example: "When drafting the contractual warranty, engineers must keep in mind that the apparatus will operate in sub-zero Arctic conditions.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'mind (phrases: keep in mind)'",
        url: "https://www.oed.com/view/Entry/118742",
        note: "Lịch sử cấu trúc từ 'have in mind' (1340) đến 'keep in mind' (1500s)."
      }
    ]
  },

  "14_1_losttrainthought": {
    idiom_headword: "lost his train of thought",
    current_figurative_meaning: "Bị đứt mạch suy nghĩ, mất dòng tư duy logic đang diễn đạt.",
    literal_image: "Đoàn tàu hỏa gồm nhiều toa móc nối liên tiếp bị trật bánh khỏi đường ray hoặc bị ngắt toa giữa chừng.",
    figurative_connection: "Từ 'train' xuất phát từ tiếng Pháp cổ 'traïn' (chuỗi liên kết các phần tử kéo theo nhau). Một chuỗi ý nghĩ liên tục được ví như một đoàn tàu chuyển động.",
    historical_context: "Triết gia Thomas Hobbes trong tác phẩm 'Leviathan' (1651) là người đầu tiên đặt ra thuật ngữ triết học 'train of thoughts' (chuỗi tư tưởng liên kết) để mô tả dòng liên tưởng tinh thần. Đến thế kỷ 19, cụm động từ 'lose one's train of thought' trở nên phổ biến.",
    deep_example: "The loud ringtone in the lecture hall caused the professor to completely lose her train of thought during the derivation of the formula.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Hobbes, Thomas (1651) — Leviathan (Chapter III: Of the Consequence or Train of Imaginations)",
        url: "https://www.gutenberg.org/ebooks/1450",
        note: "Định nghĩa triết học đầu tiên về chuỗi liên kết suy nghĩ 'Train of Thoughts'."
      },
      {
        title: "Oxford English Dictionary — 'train of thought'",
        url: "https://www.oed.com/view/Entry/204364",
        note: "Tài liệu hóa lịch sử cụm từ từ Hobbes đến văn học hiện đại."
      }
    ]
  },

  "14_1_sprangtomind": {
    idiom_headword: "sprang to mind",
    current_figurative_meaning: "Lóe lên trong đầu, nảy ra chớp nhoáng trong tâm trí.",
    literal_image: "Một chiếc lò xo bị nén đột ngột bung mạnh bật vọt lên bề mặt.",
    figurative_connection: "Động từ 'spring' biểu thị tính chuyển động đàn hồi, bất ngờ và đầy năng lượng. Ý tưởng xuất hiện mà không cần nỗ lực tư duy có ý thức.",
    historical_context: "Xuất hiện trong tiếng Anh từ thế kỷ 17. Động từ 'spring' trong tiếng Anh cổ ('springan') mang nghĩa bật vọt lên như mạch nước ngầm trào khỏi mặt đất.",
    deep_example: "When asked to name a female scientist who changed modern oncology, Marie Curie immediately sprang to mind.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'spring (sense 23: spring to mind)'",
        url: "https://www.oed.com/view/Entry/187588",
        note: "Ghi nhận các dẫn chứng văn học về ý nghĩ bất ngờ bật nảy từ thế kỷ 17."
      }
    ]
  },

  "14_1_photomemory": {
    idiom_headword: "photographic memory",
    current_figurative_meaning: "Trí nhớ siêu phàm như máy ảnh, khả năng ghi nhớ chi tiết hình ảnh cực kỳ chuẩn xác.",
    literal_image: "Bộ não hoạt động như một cuộn phim máy ảnh bắt trọn mọi chi tiết quang học của vật thể trong một tích tắc bấm máy.",
    figurative_connection: "Thuật ngữ khoa học tương đương là 'eidetic memory' (trí nhớ trực quan). Công nghệ nhiếp ảnh thế kỷ 19 đã cung cấp ẩn dụ hoàn hảo cho khả năng ghi nhận dữ liệu nguyên vẹn này.",
    historical_context: "Khái niệm ra đời vào cuối thế kỷ 19 ngay sau khi kỹ thuật chụp ảnh phổ biến trong đời sống. Thuật ngữ xuất hiện rộng rãi trong báo chí khoa học Anh - Mỹ từ thập niên 1920 để miêu tả các thần đồng cờ vua hoặc bác học tài ba.",
    deep_example: "With his extraordinary photographic memory, Alan could glance at a complex structural blueprint for thirty seconds and reconstruct every dimension from recall.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Haber, R. N. (1979) — Eidetic Images and Photographic Memory",
        url: "https://www.scientificamerican.com/",
        note: "Nghiên cứu của Scientific American phân biệt giữa trí nhớ thấu thị (eidetic) và ẩn dụ photographic memory."
      },
      {
        title: "Oxford English Dictionary — 'photographic memory'",
        url: "https://www.oed.com/",
        note: "Ghi nhận nguồn gốc thuật ngữ từ đầu thế kỷ 20."
      }
    ]
  },

  "14_1_livingmemory": {
    idiom_headword: "in living memory",
    current_figurative_meaning: "Trong ký ức của những người còn đang sống, từ trước tới nay chưa ai từng chứng kiến.",
    literal_image: "Một đường ranh giới thời gian được đo lường bằng tuổi thọ tối đa của thế hệ người già nhất còn sống trong cộng đồng.",
    figurative_connection: "Phân biệt giữa lịch sử thành văn (recorded history) và ký ức nhân chứng trực tiếp (eyewitness living testimony). Thường dùng trong cấu trúc so sánh cực cấp ('the worst flood in living memory').",
    historical_context: "Xuất hiện trong các văn kiện pháp lý và ghi chép giáo xứ nước Anh từ thế kỷ 17. Trong luật tập quán (Common Law) của Anh, lời khai của các bậc bô lão cao niên được gọi là bằng chứng 'within the memory of man alive'.",
    deep_example: "The catastrophic hurricane that demolished the coastal harbor was the most ferocious storm in living memory.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Blackstone, William (1765) — Commentaries on the Laws of England",
        url: "https://avalon.law.yale.edu/subject_menus/blackstone.asp",
        note: "Khảo cứu pháp lý về khái niệm 'time whereof the memory of man runneth not to the contrary'."
      },
      {
        title: "Oxford English Dictionary — 'living memory'",
        url: "https://www.oed.com/view/Entry/109395",
        note: "Ghi nhận cụm từ từ thế kỷ 17 trong biên niên sử địa phương."
      }
    ]
  },

  "14_1_jogmemory": {
    idiom_headword: "jog my memory",
    current_figurative_meaning: "Gợi lại trí nhớ, kích hoạt một manh mối giúp ai đó nhớ lại điều đã quên.",
    literal_image: "Huých nhẹ một cái cùi chỏ hoặc lay nhẹ một người đang ngủ gật để họ tỉnh táo lại.",
    figurative_connection: "Động từ 'jog' ban đầu có nghĩa là xô đẩy nhẹ, lắc nhẹ. Khi trí nhớ bị 'ì trệ' hoặc 'ngủ quên', một gợi ý đóng vai trò cú hích nhẹ đánh thức nó.",
    historical_context: "Xuất hiện trong tiếng Anh từ cuối thế kỷ 18 (khoảng 1780). Trước đó, người Anh dùng 'jog someone's elbow' (huých cùi chỏ để nhắc nhở), sau đó chuyển hóa thành ẩn dụ tâm thần 'jog someone's memory'.",
    deep_example: "Showing the witness a photograph of the suspect's vintage convertible served to jog his memory regarding that rainy evening.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'jog (phrases: jog one's memory)'",
        url: "https://www.oed.com/view/Entry/101511",
        note: "Ghi nhận từ cuối thế kỷ 18 xuất phát từ động tác huých cùi chỏ cảnh tỉnh."
      }
    ]
  },

  // ==========================================
  // Module 14.1: IDIOMS AND EXPRESSIONS ABOUT MEMORY (Page 63)
  // ==========================================
  "14_1_mindgoblank": {
    idiom_headword: "my mind went blank",
    current_figurative_meaning: "Đầu óc trống rỗng, không thể nhớ ra bất kỳ điều gì dù cố gắng.",
    literal_image: "Một tấm bảng viết hoặc trang giấy trắng trơn tinh khôi không một nét mực nào.",
    figurative_connection: "Khái niệm triết học 'Tabula Rasa' (tấm bảng trắng) của John Locke: trạng thái tâm trí bị tẩy sạch hoàn toàn mọi thông tin lưu trữ.",
    historical_context: "Xuất hiện trong tiếng Anh từ giữa thế kỷ 19. Ban đầu liên quan đến tờ vé số trúng thưởng trống không (blank ticket) hoặc tờ giấy in thử bị sót mực, sau đó chuyển thành biểu đạt cho trạng thái tê liệt tạm thời của bộ nhớ.",
    deep_example: "As soon as I stepped up to the podium and saw the international delegation staring at me, my mind went completely blank.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Locke, John (1689) — An Essay Concerning Human Understanding",
        url: "https://www.gutenberg.org/ebooks/10615",
        note: "Nguồn gốc triết học về tấm bảng trắng 'white paper / tabula rasa' trong nhận thức luận."
      },
      {
        title: "Oxford English Dictionary — 'blank (phrases: go blank)'",
        url: "https://www.oed.com/view/Entry/19914",
        note: "Ghi chép nghĩa tâm trí trống rỗng từ thế kỷ 19."
      }
    ]
  },

  "14_1_slipmind": {
    idiom_headword: "it slipped my mind",
    current_figurative_meaning: "Tôi vô tình quên bẵng đi mất, sự việc trượt khỏi tầm kiểm soát của trí nhớ.",
    literal_image: "Một đồ vật trơn nhẵn tuột khỏi tay và rơi xuống đất mà người cầm không hề hay biết.",
    figurative_connection: "Ẩn dụ tri nhận coi sự ghi nhớ như hành động nắm giữ đồ vật bằng bàn tay ('grasp/hold in mind'). Khi lơ là, ý nghĩ 'trượt' (slip) khỏi bàn tay tâm trí.",
    historical_context: "Xuất hiện từ thế kỷ 16 trong văn học thời kỳ Tudor và kịch nghệ Phục Hưng. William Shakespeare đã dùng các cấu trúc tương tự trong các vở kịch của mình để miêu tả sự lãng quên vô ý.",
    deep_example: "I had intended to mail the signed lease agreement yesterday afternoon, but with the sudden influx of emergency emails, it completely slipped my mind.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'slip (phrases: slip one's mind/memory)'",
        url: "https://www.oed.com/view/Entry/181958",
        note: "Ghi nhận cấu trúc 'slip the memory / mind' từ thế kỷ 16."
      }
    ]
  },

  "14_1_ringbell": {
    idiom_headword: "rings a bell",
    current_figurative_meaning: "Nghe quen quen, gợi lên một cảm giác ngờ ngợ quen thuộc dù chưa nhớ rõ chi tiết.",
    literal_image: "Tiếng chuông cơ học rung vang lên để báo hiệu có người vào nhà, thức ăn đã sẵn sàng hoặc chuông cửa reo.",
    figurative_connection: "Âm thanh tiếng chuông là tín hiệu kinh điển kích hoạt phản xạ có điều kiện (conditioned reflex) trong tâm lý học, đánh thức sự chú ý từ tầng tiềm thức.",
    historical_context: "Phát triển trong tiếng Anh Mỹ vào đầu thế kỷ 20. Một số nhà từ nguyên học liên hệ với các trò chơi hội chợ lễ hội (strength tester game) nơi người chơi đập búa làm bật quả tạ lên cao rung chuông trên đỉnh để báo hiệu thành công.",
    deep_example: "The name 'Professor Charles Vance' certainly rings a bell, though I cannot recall whether he lectured in Cambridge or Edinburgh.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Partridge, Eric — Dictionary of Slang and Unconventional English",
        url: "https://www.routledge.com/",
        note: "Ghi chép tiếng lóng tiếng Anh Mỹ đầu thế kỷ 20 về tín hiệu nhận biết."
      },
      {
        title: "Oxford English Dictionary — 'ring a bell'",
        url: "https://www.oed.com/view/Entry/166068",
        note: "Định nghĩa và tài liệu hóa sự quen thuộc từ những năm 1930."
      }
    ]
  },

  "14_1_nameescapes": {
    idiom_headword: "its name escapes me",
    current_figurative_meaning: "Tôi không tài nào nhớ ra tên của nó, cái tên như trốn thoát khỏi đầu tôi.",
    literal_image: "Cái tên như một con chim hoặc tù nhân nhanh nhẹn trốn thoát khỏi chiếc lồng giam của trí não.",
    figurative_connection: "Nhân hóa (personification) ký ức: ký ức là một thực thể sống có ý chí riêng, chủ động lẩn trốn sự truy lùng của ý thức người nói.",
    historical_context: "Xuất hiện trong văn chương Anh từ thế kỷ 18. Các nhà văn cổ điển thường dùng 'escape one's memory / tongue / lips' để diễn đạt sự bất lực trong việc nắm bắt danh từ riêng.",
    deep_example: "I frequently dine at that charming family-run trattoria near the cathedral, but its exact Italian name temporarily escapes me.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'escape (sense: elude memory or notice)'",
        url: "https://www.oed.com/view/Entry/64258",
        note: "Ghi chép nghĩa trừu tượng trốn tránh ký ức từ thế kỷ 18."
      }
    ]
  },

  "14_1_rackbrain": {
    idiom_headword: "racking my brain",
    current_figurative_meaning: "Vắt óc suy nghĩ, cố hết sức lực để nhớ lại một điều gì đó.",
    literal_image: "Đặt bộ não lên chiếc giá tra tấn (the rack) thời trung cổ và kéo căng nó đến cực hạn chịu đựng.",
    figurative_connection: "'The rack' là dụng cụ tra tấn nổi tiếng trong Tháp Luân Đôn dùng để kéo giãn tứ chi phạm nhân nhằm ép cung. 'Rack one's brain' là ẩn dụ cho sự tự tra tấn tinh thần để moi móc ký ức.",
    historical_context: "Xuất hiện trong tiếng Anh từ cuối thế kỷ 16 (thời Shakespeare). Văn hào William Shakespeare trong vở 'Twelfth Night' và các tác phẩm thế kỷ 17 đã dùng 'rack one's wit / brains' để miêu tả sự lao tâm khổ tứ.",
    deep_example: "Detectives have been racking their brains for three weeks trying to decode the encrypted cipher left at the crime scene.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Shakespeare, William — Much Ado About Nothing (Act 4, Scene 1)",
        url: "https://www.folger.edu/shakespeares-works/much-ado-about-nothing/",
        note: "'Being lack'd and lost, why, then we rack the value' — cảm hứng giá tra tấn trong ngôn ngữ Shakespeare."
      },
      {
        title: "Oxford English Dictionary — 'rack (verb: strain mentally)'",
        url: "https://www.oed.com/view/Entry/157077",
        note: "Xuất hiện từ năm 1583 chỉ sự căng thẳng trí não như dụng cụ tra khảo."
      }
    ]
  },

  "14_1_backofmind": {
    idiom_headword: "at the back of my mind",
    current_figurative_meaning: "Ở sâu trong tiềm thức, thấp thoáng trong tâm trí dù không chủ ý nghĩ tới.",
    literal_image: "Một đồ vật được cất ở góc khuất phía sau cùng của căn phòng, nằm ngoài tầm nhìn trực diện phía trước.",
    figurative_connection: "Ẩn dụ không gian của tâm trí: vùng nhận thức trung tâm nằm ở 'phía trước' (tiêu điểm chú ý), còn vùng tiềm thức âm ỉ nằm ở 'phía sau' (hậu trường nhận thức).",
    historical_context: "Hình thành từ cuối thế kỷ 19, chịu ảnh hưởng từ sự ra đời của phân tâm học (Sigmund Freud) và lý thuyết về vô thức / tiềm thức (subconscious). Cụm từ đi vào tiếng Anh phổ thông vào đầu thế kỷ 20.",
    deep_example: "Even while celebrating his wedding anniversary, the nagging worry about his father's deteriorating health lingered at the back of his mind.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'back of the mind'",
        url: "https://www.oed.com/view/Entry/14352",
        note: "Ghi nhận cấu trúc chỉ tầng nhận thức thứ cấp từ cuối thế kỷ 19."
      }
    ]
  },

  "14_1_memoriesflood": {
    idiom_headword: "memories came flooding back",
    current_figurative_meaning: "Ký ức ùa về dồn dập như lũ quét, ngập tràn trong tâm trí.",
    literal_image: "Một con đập bị vỡ và dòng nước lũ khổng lồ ào ạt tràn qua cuốn phăng mọi thứ.",
    figurative_connection: "Ẩn dụ 'EMOTIONAL MEMORIES ARE RUSHING WATER': khi gặp một kích thích cảm xúc mạnh (kỷ vật, mùi hương), van ngăn ký ức mở tung và các dòng hoài niệm ập đến không thể ngăn cản.",
    historical_context: "Bắt nguồn từ văn học lãng mạn thế kỷ 19. Hiện tượng tâm lý học này sau đó được Marcel Proust phân tích nổi tiếng trong tác phẩm 'Đi tìm thời gian đã mất' (hương vị chiếc bánh Madeleine làm ùa về cả tuổi thơ).",
    deep_example: "The moment the elderly pianist placed her fingers onto the ivories of her childhood Steinway, memories came flooding back of her mother's singing.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Proust, Marcel (1913) — In Search of Lost Time (The Madeleine Episode)",
        url: "https://www.gutenberg.org/ebooks/7178",
        note: "Điển tích văn học kinh điển về ký ức vô thức tràn về nhờ kích thích giác quan."
      },
      {
        title: "Oxford English Dictionary — 'flood (verb: figurative of memories)'",
        url: "https://www.oed.com/view/Entry/71842",
        note: "Tài liệu hóa ẩn dụ dòng lũ ký ức từ thế kỷ 19."
      }
    ]
  },

  "14_1_stirrmemories": {
    idiom_headword: "stirred up memories",
    current_figurative_meaning: "Khơi gợi lại kỷ niệm xưa, khuấy động những hồi ức tưởng chừng đã lắng đọng.",
    literal_image: "Dùng thìa khuấy một cốc nước có cặn lắng ở đáy, làm các hạt cặn lơ lửng trôi ngược lên mặt nước.",
    figurative_connection: "Ký ức cũ chìm sâu xuống đáy tiềm thức như trầm tích. Một biến cố hoặc kỷ vật tác động giống như chiếc que khuấy tung trầm tích nổi lên ý thức.",
    historical_context: "Xuất hiện trong tiếng Anh từ thế kỷ 17. Động từ 'stir' mang nghĩa khuấy động chất lỏng hoặc tro than bếp lửa để làm bùng cháy lại ngọn lửa tàn.",
    deep_example: "Walking through the dusty attic and discovering his grandfather's vintage pilot logbook stirred up cherished memories of their summer flights.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Oxford English Dictionary — 'stir up (figurative: feelings, memories)'",
        url: "https://www.oed.com/view/Entry/190342",
        note: "Ghi nhận cấu trúc khơi gợi ký ức lắng đọng từ thế kỷ 17."
      }
    ]
  },

  "14_1_memorylane": {
    idiom_headword: "took a trip down memory lane",
    current_figurative_meaning: "Sống lại những ký ức ngọt ngào, cùng nhau hồi tưởng lại kỷ niệm đẹp của quá khứ.",
    literal_image: "Thong dong đi dạo trên một con ngõ quê thanh bình, hai bên đường là những ngôi nhà lưu giữ từng mảnh kỷ niệm tuổi thơ.",
    figurative_connection: "Ẩn dụ không gian học 'LIFE IS A JOURNEY / MEMORIES ARE STATIONS ALONG A ROAD': quá khứ là một con đường làng thơ mộng mà con người có thể quay lại ghé thăm.",
    historical_context: "Phát sinh trong văn hóa âm nhạc bình dân Mỹ vào đầu thế kỷ 20, đặc biệt nổi tiếng qua bài hát đình đám 'Memory Lane' (1924) của De Sylva, Spier & Con Conrad. Từ đó, cụm từ trở thành biểu tượng cho sự hoài niệm ngọt ngào.",
    deep_example: "Looking through our high school yearbooks over coffee was a nostalgic trip down memory lane that had us laughing for hours.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "De Sylva, B.G., Spier, L., Conrad, C. (1924) — Memory Lane (Song)",
        url: "https://www.loc.gov/",
        note: "Ca khúc Broadway thế kỷ 20 phổ biến hóa cụm từ 'Memory Lane' vào tiếng Anh toàn cầu."
      },
      {
        title: "Oxford English Dictionary — 'memory lane'",
        url: "https://www.oed.com/view/Entry/116390",
        note: "Tài liệu hóa thành ngữ tiếng Anh Mỹ thế kỷ 20."
      }
    ]
  },

  "14_1_erasememory": {
    idiom_headword: "erase the memory",
    current_figurative_meaning: "Xóa sạch ký ức, cố gắng quên đi hoặc gạt bỏ một ký ức đau buồn ra khỏi tâm trí.",
    literal_image: "Dùng cục gôm tẩy sạch vết bút chì trên trang giấy trắng cho đến khi không còn để lại một dấu vết mờ nhạt nào.",
    figurative_connection: "Từ gốc Latinh 'erodere / erasum' (cạo sạch bề mặt tấm bảng sáp). Con người mong muốn loại bỏ các dấu vết thương tổn tinh thần như cạo sạch một bản khắc.",
    historical_context: "Xuất hiện trong tiếng Anh từ thế kỷ 17 trong văn học triết học và thơ ca bi kịch. Các tác giả thời kỳ Khai sáng thường thảo luận về việc liệu thời gian hay lý trí có thể tẩy xóa được những bi kịch của quá khứ.",
    deep_example: "Therapy and volunteer work in rural communities helped the survivor gradually erase the harrowing memories of the chemical plant explosion.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'erase (figurative: obliterate from mind)'",
        url: "https://www.oed.com/view/Entry/63972",
        note: "Truy nguyên gốc Latinh của hành động tẩy xóa bản khắc trên sáp sang ý niệm tâm trí."
      }
    ]
  }
};

export default UNIT_14_ETYMOLOGY;
