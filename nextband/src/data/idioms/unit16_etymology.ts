// UNIT 16: War and weapons — Etymological & Conceptual Explanations
// Standardized NextBand Academic Framework: Evidence-based historical and conceptual analysis
// Source: DK English for Everyone: English Idioms (Unit 16, pages 70-73 & Answer Key page 229)

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

export const UNIT_16_ETYMOLOGY: Record<string, IdiomEtymology> = {
  // ==========================================
  // Module 16.1: IDIOMS USING VOCABULARY ABOUT WAR AND WEAPONS (Pages 70-71)
  // ==========================================
  "16_1_axtogrind": {
    idiom_headword: "an ax to grind",
    current_figurative_meaning: "Có động cơ cá nhân vị kỷ, hoặc có mối bất hòa, ấm ức cần đem ra chất vấn, giải quyết.",
    literal_image: "Hình ảnh một người mang lưỡi rìu cùn đến nhờ hoặc lừa người khác quay bánh mài đá giúp mình mài sắc.",
    figurative_connection: "Ẩn dụ lợi ích ngầm: Bề ngoài tỏ ra thân thiện trò chuyện nhưng thực chất đang mượn sức người khác để phục vụ cho toan tính riêng của mình hoặc muốn giải tỏa một bức xúc âm ỉ.",
    historical_context: "Xuất phát từ bài tiểu luận đạo đức năm 1810 'Who'll turn grindstones?' của nhà báo Mỹ Charles Miner (thường bị gán nhầm cho Benjamin Franklin). Trong truyện, một cậu bé bị người lạ tâng bốc nịnh nọt để quay cối mài rìu đến kiệt sức, sau đó bị đuổi đi không một lời cảm ơn.",
    deep_example: "The committee dismissed his objections to the zoning plan, suspecting he had an ax to grind regarding his adjacent commercial properties.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Miner, Charles (1810) — The Luzerne Federalist ('Who'll turn grindstones?')",
        url: "https://www.oxfordreference.com/",
        note: "Xuất xứ chính thức của câu chuyện ngụ ngôn về lưỡi rìu mài."
      },
      {
        title: "Oxford English Dictionary — 'an axe to grind'",
        url: "https://www.oed.com/view/Entry/13936",
        note: "Lịch sử biến chuyển từ truyện ngụ ngôn Mỹ sang thành ngữ chính trị thế giới."
      }
    ]
  },

  "16_1_holdfire": {
    idiom_headword: "hold fire",
    current_figurative_meaning: "Tạm dừng hành động, hoãn đưa ra quyết định để chờ thời cơ hoặc thông tin rõ ràng hơn.",
    literal_image: "Mệnh lệnh của chỉ huy quân sự yêu cầu các xạ thủ giữ ngón tay trên cò súng, không được nổ súng vội.",
    figurative_connection: "Ẩn dụ kiểm soát xung lực: Trong tác chiến, việc bắn quá sớm khi kẻ địch chưa vào tầm hiệu quả sẽ làm lãng phí đạn dược và lộ vị trí; trong đời sống, vội vàng hành động khi chưa cân nhắc rủi ro sẽ gây hậu quả khó lường.",
    historical_context: "Bắt nguồn từ khẩu lệnh pháo binh và bộ binh hỏa mai thế kỷ 16-17 ('Hold your fire!'). Chuyển sang ngữ cảnh dân sự và kinh doanh tại Anh vào thế kỷ 19 để chỉ việc tạm hoãn ký hợp đồng hoặc đầu tư.",
    deep_example: "The marketing director urged the board to hold fire on the international rollout until consumer sentiment surveys were finalized.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'hold one's fire'",
        url: "https://www.oed.com/view/Entry/87702",
        note: "Ghi nhận nguồn gốc từ mệnh lệnh tác chiến của quân đội Anh."
      }
    ]
  },

  "16_1_likewarzone": {
    idiom_headword: "like a war zone",
    current_figurative_meaning: "Bừa bộn, hỗn loạn, tan hoang như một bãi chiến trường.",
    literal_image: "Khung cảnh đổ nát, khói bụi, mảnh vỡ vương vãi khắp nơi sau một trận oanh tạc pháo kích dữ dội.",
    figurative_connection: "Ngoa dụ không gian: So sánh một căn phòng, nhà cửa hay khu phố bừa bãi với khu vực giao tranh vũ trang để nhấn mạnh mức độ lộn xộn và hỗn loạn cực độ.",
    historical_context: "Thuật ngữ quân sự 'war zone' xuất hiện trong Thế chiến I (1914-1918) để định nghĩa vùng biển hoặc lãnh thổ xảy ra xung đột vũ trang. Đến giữa thế kỷ 20, lối so sánh 'like a war zone' trở thành thành ngữ cửa miệng trong đời sống gia đình.",
    deep_example: "After the toddler's birthday party concluded, the living room looked like a war zone littered with wrapping paper and cake crumbs.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Cambridge Idioms Dictionary — 'like a war zone'",
        url: "https://dictionary.cambridge.org/dictionary/english/like-a-war-zone",
        note: "Định nghĩa chuẩn về không gian hỗn loạn, đổ vỡ."
      }
    ]
  },

  "16_1_minefield": {
    idiom_headword: "a minefield",
    current_figurative_meaning: "Một tình huống hoặc chủ đề đầy rẫy rủi ro tiềm ẩn, chỉ cần sơ suất nhỏ là dẫn đến hậu quả khôn lường.",
    literal_image: "Một bãi đất bị chôn ngầm hàng trăm quả mìn nổ; mỗi bước chân đều có nguy cơ đạp phải ngòi nổ.",
    figurative_connection: "Ẩn dụ nguy hiểm tiềm tàng: Những vấn đề nhạy cảm như đàm phán hợp đồng, phân chia tài sản thừa kế hay thảo luận chính trị được ví như bãi mìn vì các cạm bẫy tâm lý và pháp lý ẩn giấu dưới bề mặt.",
    historical_context: "Xuất hiện trong thuật ngữ chiến tranh hải quân thế kỷ 19 (thủy lôi ngầm) và bãi mìn bộ binh trong Thế chiến I và II. Nghĩa bóng bắt đầu được sử dụng từ những năm 1950 trong giới báo chí và ngoại giao.",
    deep_example: "Navigating cross-border intellectual property regulations proved to be a legal minefield for the young biotechnology startup.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'minefield'",
        url: "https://www.oed.com/view/Entry/118742",
        note: "Ghi nhận bước chuyển từ thuật ngữ công binh sang tình huống rủi ro trừu tượng."
      }
    ]
  },

  "16_1_bitebullet": {
    idiom_headword: "bite the bullet",
    current_figurative_meaning: "Nghiến răng chịu đựng, dũng cảm chấp nhận làm một việc vô cùng khó khăn, đau đớn mà không thể né tránh.",
    literal_image: "Người lính bị thương ngậm chặt một viên đạn chì mềm giữa hai hàm răng trong lúc bác sĩ phẫu thuật cưa chân hoặc khâu vết thương mà không có thuốc mê.",
    figurative_connection: "Kiềm chế sinh học trước nỗi đau: Cắn chặt vào viên đạn chì giúp người lính ngăn không cắn vào lưỡi của mình và triệt tiêu tiếng la hét kinh hoàng, tượng trưng cho bản lĩnh kiên cường đối mặt với nghịch cảnh không thể trốn tránh.",
    historical_context: "Bắt nguồn từ y học dã chiến thế kỷ 18-19 trước khi có thuốc gây mê đại trà. Nhà văn Rudyard Kipling đã ghi nhận cụm từ này trong tác phẩm nổi tiếng 'The Light That Failed' (1891).",
    deep_example: "Faced with insolvency, the airline had to bite the bullet and cancel several unprofitable domestic flight routes.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Kipling, Rudyard (1891) — The Light That Failed",
        url: "https://www.gutenberg.org/ebooks/2876",
        note: "Tác phẩm văn học Anh kinh điển xác lập vị thế thành ngữ 'bite the bullet'."
      },
      {
        title: "Oxford English Dictionary — 'bite the bullet'",
        url: "https://www.oed.com/view/Entry/19662",
        note: "Khảo chứng lịch sử phẫu thuật quân y thời tiền gây mê."
      }
    ]
  },

  "16_1_sticktoguns": {
    idiom_headword: "stuck to her guns",
    current_figurative_meaning: "Kiên định giữ vững lập trường, không chịu nhượng bộ hay đổi ý trước sức ép phản đối gay gắt.",
    literal_image: "Các pháo thủ trên chiến hạm kiên quyết bám trụ tại vị trí khẩu pháo để nạp đạn và khai hỏa dù đạn pháo đối phương bay tới tấp.",
    figurative_connection: "Ẩn dụ bám trụ trận địa: Pháo binh không rời bỏ khẩu súng của mình đồng nghĩa với một người không bao giờ từ bỏ quan điểm, nguyên tắc hay quyết định của bản thân khi đối mặt với xung đột.",
    historical_context: "Bắt nguồn từ hải quân Hoàng gia Anh thế kỷ 18. Khẩu lệnh 'stick to your guns' yêu cầu thủy thủ tiếp tục bắn đến hơi thở cuối cùng. Chuyển sang nghĩa bóng trong các cuộc tranh luận chính trị và nghị viện từ đầu thế kỷ 19.",
    deep_example: "Despite intense pressure from company lobbyists, the minister stuck to her guns and introduced stringent environmental limits.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Smyth, Admiral W. H. (1867) — The Sailor's Word-Book",
        url: "https://www.gutenberg.org/ebooks/25859",
        note: "Từ điển thuật ngữ hải quân giải thích nguồn gốc lệnh tác chiến pháo hạm."
      },
      {
        title: "Oxford English Dictionary — 'stick to one's guns'",
        url: "https://www.oed.com/view/Entry/84518",
        note: "Tài liệu chứng thực bước chuyển nghĩa sang đời sống chính trị thời Victoria."
      }
    ]
  },

  "16_1_dropbombshell": {
    idiom_headword: "dropped a bombshell",
    current_figurative_meaning: "Tung ra một tin tức gây chấn động tột cùng, làm đảo lộn hoàn toàn tình thế.",
    literal_image: "Một quả bom nặng ký từ máy bay rơi thẳng xuống trung tâm thành phố và phát nổ bất ngờ.",
    figurative_connection: "Ẩn dụ sức công phá của thông tin: Tin tức gây sốc xuất hiện bất thình lình và tạo ra làn sóng chấn động tâm lý diện rộng, tàn phá sự bình yên như một vụ nổ bom.",
    historical_context: "Xuất hiện trong Thế chiến I khi các loại pháo tầm xa và máy bay ném bom lần đầu tiên mang lại sự hủy diệt từ trên không. Đến những năm 1920, báo chí Anh-Mỹ dùng từ 'bombshell' để chỉ những vụ bê bối hoặc tuyên bố chính trị gây choáng váng.",
    deep_example: "The prime minister dropped a bombshell during prime-time television by announcing a snap general election for next month.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'bombshell'",
        url: "https://www.oed.com/view/Entry/21262",
        note: "Lịch sử từ vựng chiến tranh không quân chuyển hóa thành tin tức chấn động."
      }
    ]
  },

  "16_1_crossswords": {
    idiom_headword: "crossing swords",
    current_figurative_meaning: "Tranh cãi nảy lửa, đối đầu trực diện trong một cuộc tranh luận hoặc xung đột quan điểm.",
    literal_image: "Hai kiếm sĩ bước vào trận quyết đấu sinh tử, chạm và gác chéo lưỡi gươm sáng loáng vào nhau.",
    figurative_connection: "Ẩn dụ đấu kiếm trí tuệ: Cuộc tranh luận gay gắt giữa hai đối thủ có các đòn tấn công lý lẽ và phòng thủ sắc bén tương tự như các đường kiếm đâm và đỡ đòn trong môn đấu kiếm thể thao.",
    historical_context: "Có từ thời kỳ Phục hưng thế kỷ 16-17 khi kiếm thuật (fencing/dueling) là chuẩn mực danh dự của giới quý tộc châu Âu. Cụm từ được đại thi hào William Shakespeare và các nhà viết kịch sử thi sử dụng rộng rãi.",
    deep_example: "The defense attorney crossed swords with the chief prosecutor over the admissibility of the digital surveillance evidence.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'cross swords'",
        url: "https://www.oed.com/view/Entry/44976",
        note: "Ghi chép từ truyền thống đấu kiếm danh dự của quý tộc châu Âu."
      }
    ]
  },

  "16_1_uphillbattle": {
    idiom_headword: "an uphill battle",
    current_figurative_meaning: "Một cuộc đấu tranh vô cùng gian nan, nỗ lực chống chọi trong thế bất lợi áp đảo.",
    literal_image: "Đội quân bộ binh phải leo dốc ngược núi hiểm trở để tấn công một pháo đài phòng thủ kiên cố ở đỉnh cao.",
    figurative_connection: "Bất lợi cơ học trọng trường: Tấn công ngược dốc vừa hao mòn thể lực vì trọng lực Trái đất, vừa làm chậm bước tiến và dễ bị đá lăn, tên bắn từ trên xuống. Trong đời sống, bất kỳ nỗ lực nào ngược lại xu thế hoặc thiếu nguồn lực đều là một cuộc chiến ngược dốc.",
    historical_context: "Ghi nhận trong các tác phẩm quân sự cổ kim từ Tôn Tử Binh Pháp ('Đừng đánh giặc trên đồi cao') đến Carl von Clausewitz. Trong tiếng Anh, cụm từ 'an uphill battle / uphill fight' phổ biến từ thế kỷ 18-19.",
    deep_example: "Persuading traditional consumers to adopt fully autonomous electric vehicles remains an uphill battle for emerging manufacturers.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Sun Tzu (c. 5th century BC) — The Art of War (Terrain & Tactical Dispositions)",
        url: "https://www.gutenberg.org/ebooks/132",
        note: "Nguyên lý địa hình quân sự kinh điển cảnh báo thế bất lợi khi đánh ngược dốc."
      },
      {
        title: "Oxford English Dictionary — 'uphill'",
        url: "https://www.oed.com/view/Entry/219973",
        note: "Tài liệu chứng thực bước chuyển từ tính từ địa hình sang trở ngại gian nan."
      }
    ]
  },

  "16_1_twistknife": {
    idiom_headword: "twisted the knife",
    current_figurative_meaning: "Khoét sâu thêm vào nỗi đau, làm cho một tình huống vốn đã tồi tệ càng trở nên đau đớn, nhức nhối hơn.",
    literal_image: "Hành động đâm một con dao vào vết thương rồi xoay vặn lưỡi dao nhiều vòng để gây sát thương tối đa.",
    figurative_connection: "Gia tăng thương tổn tàn nhẫn: Khi một người đã thất bại hoặc suy sụp, việc buông thêm một lời chê bai cay độc hay hành động trừng phạt ác ý được ví như việc xoay lưỡi dao trong vết thương đang rỉ máu.",
    historical_context: "Bắt nguồn từ kỹ thuật cận chiến tàn bạo thời Trung cổ nhằm ngăn vết thương khép lại và gây sốc mất máu nhanh. Trong văn học thế kỷ 19, các nhà văn như William Makepeace Thackeray bắt đầu dùng cụm từ 'twist the knife in the wound' theo nghĩa bóng tâm lý.",
    deep_example: "Losing the contract was bad enough, but having the rival firm thank us publicly for our participation truly twisted the knife.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Thackeray, William Makepeace (1852) — The History of Henry Esmond",
        url: "https://www.gutenberg.org/ebooks/2584",
        note: "Tác phẩm văn học Victoria khắc họa cảm giác tổn thương tâm lý qua ẩn dụ xoay dao."
      },
      {
        title: "Oxford English Dictionary — 'twist the knife'",
        url: "https://www.oed.com/view/Entry/104085",
        note: "Ghi nhận biến thể 'twist the knife / turn the sword in the wound'."
      }
    ]
  },

  "16_1_beeninwars": {
    idiom_headword: "been in the wars",
    current_figurative_meaning: "Bị thương tích bầm dập, trông tả tơi xây xát sau một loạt tai nạn hoặc trải nghiệm gian nan.",
    literal_image: "Người chiến binh vừa trở về từ tiền tuyến với khắp mình đầy sẹo, băng gạc trắng toát và chân đi khập khiễng.",
    figurative_connection: "Ngoa dụ thân thể: Dùng hình ảnh người lính thương binh đầy vết thương chiến tranh để miêu tả một đứa trẻ nghịch ngợm bị trầy đầu gối, hoặc một người vừa gặp vài sự cố bầm dập trong ngày.",
    historical_context: "Thành ngữ đặc trưng của tiếng Anh Anh (UK), bắt đầu xuất hiện sau các cuộc chiến tranh thuộc địa và Thế chiến I. Người dân thường dùng cụm từ này với giọng điệu vừa thương cảm vừa hài hước ('Poor you! You've really been in the wars!').",
    deep_example: "With a bandaged thumb and bruises across both elbows, the novice skateboarder looked like he had been in the wars.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'in the wars'",
        url: "https://www.oed.com/view/Entry/225642",
        note: "Khảo sát cách dùng thông tục tiếng Anh Anh về chấn thương thể xác nhẹ."
      }
    ]
  },

  "16_1_cametoblows": {
    idiom_headword: "came to blows",
    current_figurative_meaning: "Động thủ, đánh nhau, ẩu đả trực tiếp sau một hồi cãi vã không thể hòa giải.",
    literal_image: "Những nắm đấm ('blows') được tung ra liên tiếp giáng xuống đối phương khi tranh chấp vượt quá tầm kiểm soát bằng lời nói.",
    figurative_connection: "Sự leo thang xung đột: Quá trình chuyển hóa từ bạo lực ngôn từ (verbal argument) sang bạo lực thể xác (physical violence) khi sự kiên nhẫn sụp đổ hoàn toàn.",
    historical_context: "Xuất hiện trong tiếng Anh Trung đại từ thế kỷ 15 (khoảng năm 1450). Từ 'blow' vốn chỉ cú đánh mạnh bằng vũ khí hoặc nắm đấm. Xuất hiện phổ biến trong biên niên sử của Shakespeare miêu tả các vụ hỗn chiến đường phố.",
    deep_example: "What began as a civil academic dispute over historical archives almost came to blows in the corridor.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'come to blows'",
        url: "https://www.oed.com/view/Entry/20658",
        note: "Ghi chép ngữ liệu từ năm 1450 về hành vi đánh đấm trong xung đột."
      }
    ]
  },

  "16_1_lineoffire": {
    idiom_headword: "in the line of fire",
    current_figurative_meaning: "Ở vào tầm ngắm bị chỉ trích, trừng phạt hoặc hứng chịu cơn thịnh nộ của cấp trên.",
    literal_image: "Đứng đúng ngay trên đường bay của luồng đạn súng bộ binh hoặc pháo binh đang xả vào mục tiêu.",
    figurative_connection: "Ẩn dụ tầm hỏa lực: Người ở vị trí nhạy cảm hoặc đứng gần tâm điểm của khủng hoảng dễ trở thành vật tế thần hoặc bị 'trúng đạn lạc' của những cơn lôi đình từ ban lãnh đạo.",
    historical_context: "Thuật ngữ đạn đạo và chiến thuật quân sự xuất hiện từ thế kỷ 18. Nghĩa bóng phổ biến trong đời sống công sở và chính trị hiện đại thế kỷ 20, đặc biệt khi các nhà quản lý tìm kiếm người chịu trách nhiệm cho các thất bại dự án.",
    deep_example: "Whenever quarterly earnings fall short of expectations, middle managers find themselves directly in the line of fire.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'line of fire'",
        url: "https://www.oed.com/view/Entry/108573",
        note: "Hồ sơ thuật ngữ quân sự chuyển giao sang ngôn ngữ kinh doanh hiện đại."
      }
    ]
  },

  "16_1_dontshootmess": {
    idiom_headword: "don't shoot the messenger",
    current_figurative_meaning: "Xin đừng trút giận lên người đưa tin! (Tôi chỉ là người truyền đạt lại tin tức xấu chứ không gây ra nó).",
    literal_image: "Vị sứ giả truyền tin của triều đình bị nhà vua nổi cơn thịnh nộ chém đầu hoặc bắn hạ ngay tại chỗ chỉ vì mang đến bức thư chiến bại.",
    figurative_connection: "Nhầm lẫn giữa tin dữ và người đưa tin: Tâm lý giận cá chém thớt khiến con người có xu hướng phản ứng hung hăng với người đầu tiên thông báo sự thật mất lòng, thay vì đối diện với nguyên nhân gốc rễ của vấn đề.",
    historical_context: "Có nguồn gốc từ bi kịch Hy Lạp cổ đại 'Antigone' của Sophocles (năm 441 TCN: 'Chẳng ai yêu kẻ mang tin xấu'). Nhà sử học La Mã Plutarch ghi chép về vị tướng Lucullus đã chém đầu người lính đầu tiên báo tin địch quân áp sát.",
    deep_example: "I am merely relaying the executive committee's budget cuts, so please don't shoot the messenger.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Sophocles (441 BC) — Antigone (Line 277)",
        url: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0185",
        note: "Trích dẫn kinh điển đầu tiên trong triết học Hy Lạp cổ đại về số phận người đưa tin."
      },
      {
        title: "Plutarch (c. 100 AD) — Parallel Lives (Life of Lucullus)",
        url: "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Plutarch/Lives/Lucullus*.html",
        note: "Ghi chép lịch sử về việc hành quyết lính đưa tin thời La Mã."
      }
    ]
  },

  "16_1_dodgebullet": {
    idiom_headword: "dodged a bullet",
    current_figurative_meaning: "Thoát nạn trong gang tấc, vô tình tránh được một thảm họa hoặc tình huống tồi tệ.",
    literal_image: "Một viên đạn súng bắn thẳng bay sượt qua tai chỉ vài milimét và người lính kịp cúi đầu né tránh an toàn.",
    figurative_connection: "May mắn thoát hiểm hiểm nghèo: Nhận thức về sự may mắn kỳ diệu khi nhận ra một quyết định suýt đưa mình vào chỗ chết hoặc một mối quan hệ/dự án độc hại mà mình đã kịp không tham gia.",
    historical_context: "Ghi chép trong nhật ký chiến trường thời Nội chiến Mỹ (1861-1865) và Thế chiến I. Đến những năm 1980, cụm từ 'dodge a bullet' trở thành thành ngữ cực kỳ thông dụng trong văn hóa đại chúng Mỹ.",
    deep_example: "By opting not to purchase shares in that fraudulent real estate trust, we really dodged a bullet before the collapse.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'dodge a bullet'",
        url: "https://www.oed.com/view/Entry/56324",
        note: "Khảo cứu nguồn gốc từ các hồi ký nội chiến sang văn hóa đại chúng Mỹ."
      }
    ]
  },

  "16_1_loosecannon": {
    idiom_headword: "a loose cannon",
    current_figurative_meaning: "Một kẻ khó lường, hành động bốc đồng mất kiểm soát và có thể gây họa cho chính tập thể của mình.",
    literal_image: "Một khẩu thần công bằng đồng nặng vài tấn bị đứt dây chằng trên boong tàu chiến trong cơn bão, lăn tự do đè nát thủy thủ và làm thủng thân tàu.",
    figurative_connection: "Hiểm họa nội bộ không thể kiểm soát: Một thành viên cùng phe nhưng có tính khí thất thường, phát ngôn liều lĩnh, gây tổn hại cho cả tổ chức mà không ai kịp ngăn chặn.",
    historical_context: "Xuất xứ từ hải quân thời kỳ thuyền buồm thế kỷ 17-19. Đại văn hào Victor Hugo đã miêu tả nỗi khiếp sợ này một cách bất hủ trong tiểu thuyết 'Ninety-Three' (1874). Thành ngữ bắt đầu dùng cho chính trị gia Mỹ từ những năm 1970.",
    deep_example: "The defense minister proved to be a loose cannon after tweeting unverified military intelligence during diplomatic talks.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Hugo, Victor (1874) — Ninety-Three (Quatrevingt-treize)",
        url: "https://www.gutenberg.org/ebooks/7923",
        note: "Chương tiểu thuyết nổi tiếng miêu tả chi tiết thảm kịch khẩu pháo đứt xích trên tàu chiến."
      },
      {
        title: "Oxford English Dictionary — 'loose cannon'",
        url: "https://www.oed.com/view/Entry/110197",
        note: "Khảo chứng sự chuyển hóa sang thuật ngữ phê phán chính trị thời hiện đại."
      }
    ]
  },

  "16_1_stabinback": {
    idiom_headword: "stabbed me in the back",
    current_figurative_meaning: "Phản bội đâm sau lưng, hãm hại một cách lén lút và tráo trở bởi người mà mình tin tưởng nhất.",
    literal_image: "Một người bạn đồng hành đứng ngay phía sau bất ngờ rút dao găm đâm thẳng vào lưng nơi ta không thể phòng thủ.",
    figurative_connection: "Sự phản trắc hèn hạ: Đâm từ phía trước là hành vi của kẻ thù công khai; đâm sau lưng là đặc quyền của kẻ phản bội đội lốt đồng minh, gây ra nỗi đau đớn và bàng hoàng cực độ.",
    historical_context: "Gắn liền với vụ ám sát Julius Caesar vào ngày 15 tháng 3 năm 44 TCN (khi người bạn thân Brutus đâm nhát dao chí mạng). Trong tiếng Anh, thành ngữ 'stab in the back' được ghi nhận từ thời Shakespeare và lan tỏa rộng khắp toàn cầu.",
    deep_example: "After decades of collaborative partnership, the co-founder stabbed his mentor in the back by secretly selling the intellectual property.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Shakespeare, William (1599) — Julius Caesar",
        url: "https://www.folger.edu/explore/shakespeares-works/julius-caesar/",
        note: "Biểu tượng bất hủ của hành vi phản trắc đâm sau lưng giữa những người bạn."
      },
      {
        title: "Oxford English Dictionary — 'stab in the back'",
        url: "https://www.oed.com/view/Entry/188432",
        note: "Lịch sử định hình thành ngữ chỉ sự bội tín trong xã hội phương Tây."
      }
    ]
  },

  "16_1_holdfort": {
    idiom_headword: "hold down the fort",
    current_figurative_meaning: "Quán xuyến công việc, trông coi và duy trì mọi hoạt động ổn định trong lúc người phụ trách vắng mặt.",
    literal_image: "Những người lính kiên cường bảo vệ tiền đồn quân sự trước sự bao vây của kẻ thù trong lúc chờ viện binh tới cứu ứng.",
    figurative_connection: "Ủy thác trách nhiệm: Tạm thời tiếp quản văn phòng, cửa hàng hoặc gia đình để đảm bảo mọi trật tự không bị xáo trộn khi người chỉ huy đi vắng.",
    historical_context: "Bắt nguồn từ cuộc Nội chiến Mỹ. Trong trận Allatoona (1864), Tướng William Tecumseh Sherman đã đánh tín hiệu nổi tiếng cho Tướng John M. Corse: 'Hold the fort! I am coming!'. Lời kêu gọi sau đó thành bài thánh ca phổ biến và đi vào tiếng Anh thường nhật.",
    deep_example: "While the senior partners attend the annual convention in Zurich, the senior associates will hold down the fort at headquarters.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Sherman, Gen. William T. (1864) — Official Military Dispatch at Allatoona",
        url: "https://www.loc.gov/",
        note: "Bức điện tín quân sự làm nảy sinh thành ngữ 'Hold the fort'."
      },
      {
        title: "Oxford English Dictionary — 'hold the fort'",
        url: "https://www.oed.com/view/Entry/73617",
        note: "Hồ sơ sử dụng cụm từ từ thế kỷ 19 ở Mỹ và Anh."
      }
    ]
  },

  "16_1_alongshot": {
    idiom_headword: "a long shot",
    current_figurative_meaning: "Một cơ hội mong manh, một nỗ lực có tỷ lệ thành công cực kỳ thấp nhưng vẫn đáng để thử.",
    literal_image: "Phát bắn tên hoặc nã pháo ở khoảng cách cực xa vượt quá tầm bắn chính xác, với hy vọng may rủi trúng mục tiêu.",
    figurative_connection: "Xác suất mong manh: Khả năng bắn trúng mục tiêu ở khoảng cách quá xa là vô cùng nhỏ, nhưng nếu trúng thì mang lại chiến thắng ngoạn mục.",
    historical_context: "Bắt nguồn từ hải quân thế kỷ 18 miêu tả những phát đại bác bắn vu vơ ở tầm xa ('long shot'). Đến thế kỷ 19, trường đua ngựa Anh-Mỹ dùng từ này để chỉ chú ngựa có tỷ lệ cá cược rất thấp nhưng tiền thưởng cực lớn.",
    deep_example: "Submitting our application to the prestigious fellowship was admittedly a long shot, but we were ultimately shortlisted.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'long shot'",
        url: "https://www.oed.com/view/Entry/110052",
        note: "Nguồn gốc đạn đạo hải quân thế kỷ 18 và cá cược đua ngựa thế kỷ 19."
      }
    ]
  },

  "16_1_catchoffguard": {
    idiom_headword: "caught me off guard",
    current_figurative_meaning: "Làm tôi hoàn toàn bất ngờ, đánh úp khiến tôi trở tay không kịp khi chưa chuẩn bị tâm thế.",
    literal_image: "Một võ sĩ đấu kiếm hoặc người lính canh lơ là hạ thấp vũ khí, không ở tư thế phòng thủ ('en garde') và bị tấn công chớp nhoáng.",
    figurative_connection: "Sự sơ hở trước đòn tấn công: Khi mất cảnh giác hoặc bận tâm việc khác, một câu hỏi hóc búa hay tin tức bất ngờ sẽ khiến ta lúng túng, bối rối không kịp ứng phó.",
    historical_context: "Xuất phát từ thuật ngữ đấu kiếm thời Phục hưng. Tư thế 'on guard' (tiếng Pháp: *en garde*) là tư thế thủ sẵn sàng. Khi một đấu sĩ bị 'off guard', họ hoàn toàn phơi bày điểm yếu cho đối phương ghi điểm.",
    deep_example: "The journalist's sharp question regarding overseas shell companies caught the corporate spokesman completely off guard.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Hope, Sir William (1691) — The Fencing-Master's Advice to His Scholar",
        url: "https://www.oxfordreference.com/",
        note: "Luận thuyết đấu kiếm xác lập vai trò tối thượng của việc duy trì thế thủ 'guard'."
      },
      {
        title: "Oxford English Dictionary — 'off guard'",
        url: "https://www.oed.com/view/Entry/83378",
        note: "Lịch sử biến chuyển từ thuật ngữ đấu kiếm sang sự mất cảnh giác trong đời sống."
      }
    ]
  }
};
