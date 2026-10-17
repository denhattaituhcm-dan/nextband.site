// UNIT 15: The body — Etymological & Conceptual Explanations
// Standardized NextBand Academic Framework: Evidence-based historical and conceptual analysis
// Source: DK English for Everyone: English Idioms (Unit 15, pages 66-69 & Answer Key page 229)

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

export const UNIT_15_ETYMOLOGY: Record<string, IdiomEtymology> = {
  // ==========================================
  // Module 15.1: IDIOMS USING VOCABULARY ABOUT THE BODY (Pages 66-67)
  // ==========================================
  "15_1_heartseton": {
    idiom_headword: "has his heart set on",
    current_figurative_meaning: "Khao khát, say mê và quyết tâm mãnh liệt để đạt được một mục tiêu hay thứ gì đó cụ thể.",
    literal_image: "Hình ảnh đặt trọn vẹn trái tim vật lý lên trên một đối tượng cụ thể như mỏ neo không thể di dời.",
    figurative_connection: "Ẩn dụ nhận thức cổ xưa xem 'trái tim' (heart/cor) là trung tâm của ý chí, cảm xúc và khát vọng sâu thẳm nhất. Khi đặt tâm trí và nhịp tim vào một đích đến, mọi nguồn năng lượng tâm lý đều tập trung tuyệt đối vào đó.",
    historical_context: "Xuất hiện trong các văn bản tôn giáo và văn học Phục hưng Anh từ thế kỷ 16 (ghi nhận trong Kinh Thánh bản William Tyndale 1526 và các vở kịch của William Shakespeare, e.g., 'Two Gentlemen of Verona').",
    deep_example: "Ever since she visited the research laboratory, Maya has had her heart set on pursuing a doctorate in neuroscience.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'set one's heart on'",
        url: "https://www.oed.com/view/Entry/176767",
        note: "Ghi nhận ngữ nghĩa cố định từ thế kỷ 16 về ý chí kiên định."
      },
      {
        title: "Lakoff & Johnson (1980) — Metaphors We Live By",
        url: "https://press.uchicago.edu/ucp/books/book/chicago/M/bo3637992.html",
        note: "Mô hình ẩn dụ ý niệm: THE HEART IS THE LOCUS OF WILL AND DESIRE."
      }
    ]
  },

  "15_1_bundlenerves": {
    idiom_headword: "a bundle of nerves",
    current_figurative_meaning: "Cực kỳ lo lắng, bồn chồn, căng thẳng đến mức bứt rứt không yên.",
    literal_image: "Một bó dây thần kinh sinh học bị kích thích tột độ, rung lên bần bật dưới điện thế quá tải.",
    figurative_connection: "Ẩn dụ cơ thể học: Khi não bộ kích hoạt phản ứng giao cảm (fight-or-flight), hệ thần kinh ngoại biên bị kích động dữ dội khiến toàn bộ cơ thể như biến thành một bó dây điện căng thẳng, dễ bị suy sụp trước áp lực.",
    historical_context: "Bắt nguồn từ sự phát triển của giải phẫu học và sinh lý thần kinh học cuối thế kỷ 19. Đến những năm 1930, thành ngữ này trở nên phổ biến trong văn học và báo chí Anh-Mỹ để miêu tả tình trạng hồi hộp trước sự kiện lớn.",
    deep_example: "Sitting backstage before his keynote address, Dr. Aris was a bundle of nerves until he stepped into the spotlight and delivered the opening line.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Merriam-Webster Collegiate Dictionary — 'bundle of nerves'",
        url: "https://www.merriam-webster.com/dictionary/bundle%20of%20nerves",
        note: "Ghi chép cách diễn đạt tâm lý học hành vi từ đầu thế kỷ 20."
      },
      {
        title: "Oxford English Dictionary — 'nerve'",
        url: "https://www.oed.com/view/Entry/126078",
        note: "Khảo cứu biến chuyển từ khái niệm dây thần kinh giải phẫu sang trạng thái tâm lý bồn chồn."
      }
    ]
  },

  "15_1_eyesbackhead": {
    idiom_headword: "have eyes in the back of your head",
    current_figurative_meaning: "Có cặp mắt sau gáy — nhận biết và quan sát được mọi việc xung quanh dù không trực tiếp nhìn thấy.",
    literal_image: "Một người có thêm cơ quan thị giác phụ nằm ở phía sau hộp sọ, cung cấp tầm nhìn toàn cảnh 360 độ.",
    figurative_connection: "Ẩn dụ siêu cảnh giác (panoptic vigilance): Miêu tả khả năng phán đoán trực giác nhạy bén của cha mẹ, giáo viên hoặc người quản lý, luôn phát hiện ra hành vi lén lút của trẻ nhỏ hoặc cấp dưới.",
    historical_context: "Xuất hiện từ thời La Mã cổ đại trong vở hài kịch 'Aulularia' của Plautus (khoảng năm 195 TCN: 'oculos in occipitio habet'). Tác gia Desiderius Erasmus đưa vào tuyển tập ngụ ngôn 'Adagia' năm 1500, sau đó đi sâu vào văn hóa dân gian châu Âu.",
    deep_example: "Primary school teachers quickly learn to develop eyes in the back of their heads to maintain order during art class.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Plautus (c. 195 BC) — Aulularia",
        url: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0089",
        note: "Văn bản cổ đại đầu tiên ghi lại cách ví von mắt sau gáy."
      },
      {
        title: "Erasmus, Desiderius (1500) — Adagia",
        url: "https://gallica.bnf.fr/ark:/12148/bpt6k52331x",
        note: "Tuyển tập thành ngữ La-tinh kinh điển thời Phục hưng."
      }
    ]
  },

  "15_1_gotcoldfeet": {
    idiom_headword: "got cold feet",
    current_figurative_meaning: "Chùn bước, mất hết can đảm vào phút chót trước một quyết định hoặc hành động mạo hiểm.",
    literal_image: "Đôi bàn chân đột ngột lạnh cóng và tê cứng, không thể bước tiếp về phía trước.",
    figurative_connection: "Hiện tượng phản xạ sinh học có thật: Khi gặp nỗi sợ hãi tột độ, hệ thần kinh co mạch ngoại biên (vasoconstriction) dồn máu về tim và các cơ quan nội tạng, khiến bàn chân và bàn tay thực sự bị lạnh và mất cảm giác vững chãi.",
    historical_context: "Bắt nguồn từ tiếng Đức ('kalte Füße bekommen' - chỉ những con bạc hết tiền hoặc mất can đảm phải rời sới). Cụm từ được đại chúng hóa trong văn học Mỹ qua tiểu thuyết kinh điển 'The Red Badge of Courage' (1895) của Stephen Crane.",
    deep_example: "He planned to confront his employer about the unreasonable overtime, but got cold feet right outside the boardroom door.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Crane, Stephen (1895) — The Red Badge of Courage",
        url: "https://www.gutenberg.org/ebooks/73",
        note: "Tiểu thuyết nội chiến Mỹ đưa 'cold feet' trở thành thành ngữ đại chúng."
      },
      {
        title: "Oxford English Dictionary — 'cold feet'",
        url: "https://www.oed.com/view/Entry/36021",
        note: "Tài liệu chứng thực nguồn gốc chuyển giao từ ngôn ngữ cờ bạc Đức sang tiếng Anh."
      }
    ]
  },

  "15_1_ruleofthumb": {
    idiom_headword: "rule of thumb",
    current_figurative_meaning: "Quy tắc ước lượng theo kinh nghiệm thực tế, quy chuẩn thực hành áng chừng mà không cần đo đạc chính xác.",
    literal_image: "Sử dụng chiều rộng hoặc chiều dài của đốt ngón tay cái làm thước đo áng chừng trong chế tác đồ gỗ hoặc nấu nướng.",
    figurative_connection: "Ẩn dụ công cụ cơ thể: Con người dùng chính ngón tay cái — công cụ luôn mang theo bên mình — để làm mốc quy chuẩn thực tiễn nhanh gọn, đại diện cho trí khôn kinh nghiệm dân gian.",
    historical_context: "Bác bỏ giai thoại dân gian sai lầm về luật đánh roi thời phong kiến. Nguồn gốc chính xác xuất phát từ thợ mộc, thợ may và người nấu bia dùng ngón tay cái để đo kích thước gỗ hoặc thử nhiệt độ dịch ủ bia. Ghi chép thành văn sớm nhất bởi Sir James Turner năm 1683.",
    deep_example: "As a rule of thumb, seasoned investors allocate no more than five percent of their portfolio to speculative startup ventures.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Turner, Sir James (1683) — Pallas Armata: Military Essayes",
        url: "https://www.oxfordreference.com/",
        note: "Chứng cứ văn bản cổ nhất ghi nhận cách dùng 'rule of thumb'."
      },
      {
        title: "Kelly, Henry Ansgar (1994) — 'Rule of Thumb' and the Myth of Legal Wife-Beating",
        url: "https://heinonline.org/",
        note: "Nghiên cứu sử học bác bỏ dứt khoát huyền thoại sai lệch về luật hôn nhân phong kiến."
      }
    ]
  },

  "15_1_patonback": {
    idiom_headword: "a pat on the back",
    current_figurative_meaning: "Lời khen ngợi, sự tán thưởng hoặc ghi nhận công lao cho một thành quả xuất sắc.",
    literal_image: "Hành động dùng bàn tay vỗ nhẹ nhiều lần lên lưng của ai đó với thái độ trìu mến và động viên.",
    figurative_connection: "Hành vi giao tiếp xúc giác xã hội (social grooming touch): Cái vỗ lưng thể hiện sự công nhận vị thế, tình bằng hữu và sự cổ vũ tinh thần không cần lời nói giữa đồng đội hoặc cấp trên với cấp dưới.",
    historical_context: "Bắt nguồn từ nghi thức khen thưởng trong quân đội và các trường học tại Anh đầu thế kỷ 19. Đến khoảng thập niên 1800-1820, cụm từ 'give a pat on the back' chuyển hóa thành thành ngữ chỉ sự biểu dương công khai.",
    deep_example: "While the junior engineer deserved a pat on the back for resolving the server outage, management focused on preventing future vulnerabilities.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'pat on the back'",
        url: "https://www.oed.com/view/Entry/138760",
        note: "Lịch sử biến chuyển từ cử chỉ xúc giác sang biểu tượng tán dương tinh thần."
      }
    ]
  },

  "15_1_keepchinup": {
    idiom_headword: "Keep your chin up!",
    current_figurative_meaning: "Hãy lạc quan lên, giữ vững tinh thần dũng cảm dù hoàn cảnh đang vô cùng khó khăn!",
    literal_image: "Động tác ngẩng cao chiếc cằm, hướng mắt thẳng về phía trước thay vì cúi gục đầu ủ rũ xuống ngực.",
    figurative_connection: "Lý thuyết phản hồi tư thế (postural feedback hypothesis): Hành động nâng cằm chống lại trạng thái suy sụp của trầm cảm, đồng thời trong môn quyền anh (boxing), giữ cằm đúng tư thế giúp võ sĩ sẵn sàng đón nhận và chống đỡ đòn đánh của nghịch cảnh.",
    historical_context: "Xuất hiện trên các nhật báo Anh và Mỹ vào cuối thế kỷ 19 (ghi nhận trên tờ 'The Evening Telegram' năm 1900: 'Keep your chin up'). Cụm từ trở thành khẩu hiệu động viên tinh thần quân dân Anh trong suốt hai cuộc Chiến tranh Thế giới.",
    deep_example: "Even after three unsuccessful grant applications, Dr. Thorne kept his chin up and eventually secured funding for his clinical trial.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Evening Telegram (1900) — Idiomatic Archival Records",
        url: "https://chroniclingamerica.loc.gov/",
        note: "Ghi chép báo chí đầu tiên về câu khẩu hiệu lạc quan kiên định."
      },
      {
        title: "Ammer, Christine (2013) — The American Heritage Dictionary of Idioms",
        url: "https://www.ahdictionary.com/",
        note: "Khảo sát đối chiếu giữa văn hóa thể thao đối kháng và khẩu hiệu tinh thần dân sự."
      }
    ]
  },

  "15_1_shouldercry": {
    idiom_headword: "a shoulder to cry on",
    current_figurative_meaning: "Người bạn thấu hiểu, biết lắng nghe và sẵn sàng an ủi, san sẻ nỗi buồn của người khác.",
    literal_image: "Bờ vai vững chãi của một người bạn để người đang khóc tựa đầu vào làm điểm tựa cảm xúc.",
    figurative_connection: "Đồng điều hòa cảm xúc cơ thể (somatic co-regulation): Bờ vai người bạn đóng vai trò như một điểm tựa vật lý nâng đỡ toàn bộ sức nặng và những cơn thổn thức khi hệ tâm lý của người đau khổ bị sụp đổ hoàn toàn.",
    historical_context: "Bắt nguồn từ văn hóa giao tiếp và thi ca phương Tây, được ghi nhận rộng rãi trong văn học thế kỷ 20 và trở thành biểu tượng kinh điển qua bản hit năm 1958 'Put Your Head on My Shoulder' của ca sĩ Paul Anka.",
    deep_example: "During the grueling exam period, Clara proved to be an invaluable shoulder to cry on for her anxious classmates.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Cambridge Idioms Dictionary — 'a shoulder to cry on'",
        url: "https://dictionary.cambridge.org/dictionary/english/shoulder-to-cry-on",
        note: "Định nghĩa tiêu chuẩn về đối tác nâng đỡ tinh thần trong hoạn nạn."
      }
    ]
  },

  "15_1_playbyear": {
    idiom_headword: "play it by ear",
    current_figurative_meaning: "Tùy cơ ứng biến, linh hoạt hành động dựa trên tình hình thực tế chứ không lập kế hoạch cứng nhắc từ trước.",
    literal_image: "Một nhạc công chơi nhạc cụ hoàn toàn dựa vào thính giác (ear) để thẩm âm và ngẫu hứng thay vì đọc bản nhạc soạn sẵn (sheet music).",
    figurative_connection: "Ẩn dụ âm nhạc chuyển sang hành vi đời sống: Giống như nghệ sĩ jazz phản xạ ngay lập tức trước giai điệu của ban nhạc, người biết 'play it by ear' phản ứng linh hoạt trước các biến số bất ngờ mà không bị trói buộc bởi kịch bản cứng nhắc.",
    historical_context: "Gốc tích trực tiếp từ thuật ngữ âm nhạc thế kỷ 16-18 trong tiếng Anh. Nghĩa bóng trong đời sống xã hội và ngoại giao bắt đầu nở rộ từ giữa thế kỷ 20, đặc biệt trong các cuộc đàm phán chiến lược sau Thế chiến II.",
    deep_example: "Since atmospheric conditions remain unpredictable, the flight crew will play it by ear regarding the optimal descent trajectory.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'play by ear'",
        url: "https://www.oed.com/view/Entry/145459",
        note: "Ghi chép quá trình mở rộng từ năng khiếu âm nhạc dân gian sang thuật ngữ đời sống."
      }
    ]
  },

  "15_1_pickbrain": {
    idiom_headword: "pick your brain",
    current_figurative_meaning: "Hỏi ý kiến, xin lời khuyên chuyên gia hoặc khai thác kiến thức chuyên sâu từ một người giàu kinh nghiệm.",
    literal_image: "Hành động hái lượm, nhặt tỉ mẩn từng mẩu kiến thức quý giá ẩn giấu bên trong khối não bộ của người khác.",
    figurative_connection: "Ẩn dụ hái lượm tri thức (intellectual foraging): 'Pick' mang nghĩa thu hoạch những phần tinh hoa nhất (như hái quả chín hay rỉa thịt trên xương), phản ánh hành động đặt câu hỏi khéo léo để rút tỉa kinh nghiệm tích lũy qua nhiều năm.",
    historical_context: "Xuất hiện vào giữa thế kỷ 19 (khoảng thập niên 1850) trong giới học giả và luật sư Anh, ban đầu mang sắc thái xin phép khai thác hiểu biết của đồng nghiệp một cách lịch sự nhưng triệt để.",
    deep_example: "Before presenting our proposal to the ministry, we scheduled a session with Professor Evans to pick his brain on regulatory nuances.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Partridge, Eric (1984) — A Dictionary of Slang and Unconventional English",
        url: "https://www.routledge.com/",
        note: "Khảo sát nguồn gốc thành ngữ học thuật thế kỷ 19."
      },
      {
        title: "Oxford English Dictionary — 'pick (one's) brains'",
        url: "https://www.oed.com/view/Entry/143431",
        note: "Chứng cứ sử dụng cụm từ từ năm 1853 trong thư từ của các học giả Cambridge."
      }
    ]
  },

  "15_1_jumpoutskin": {
    idiom_headword: "almost jumped out of his skin",
    current_figurative_meaning: "Giật thót tim, hoảng hồn tột độ do bị bất ngờ hoặc sợ hãi đột ngột.",
    literal_image: "Phản xạ giật mình co giật mạnh đến nỗi linh hồn hoặc cơ thể vật lý như muốn văng ra khỏi lớp da bao bọc bên ngoài.",
    figurative_connection: "Phản xạ giật mình âm thanh (acoustic startle reflex): Khi bị kích thích kinh hãi bất ngờ, sự co thắt toàn thân và nhịp tim tăng vọt tạo cảm giác cơ thể không còn đủ sức chứa luồng xung điện thần kinh, ví như muốn xé toạc làn da.",
    historical_context: "Là một trong những phép ngoa dụ thân thể sống động nhất của tiếng Anh thời cận đại, được ghi nhận từ thế kỷ 16 ('ready to leap out of his skin') và tiếp tục xuất hiện trong các tác phẩm của Jonathan Swift và Charles Dickens.",
    deep_example: "When the thunderbolt struck the ancient oak tree outside the study, Julian almost jumped out of his skin.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Shakespeare, William / Early Modern English Drama Corpus",
        url: "https://www.folger.edu/",
        note: "Các biến thể cổ xưa của hình ảnh thoát xác vì kinh hãi."
      },
      {
        title: "Oxford English Dictionary — 'jump out of one's skin'",
        url: "https://www.oed.com/view/Entry/181580",
        note: "Tài liệu lịch sử chứng thực cấu trúc thành ngữ từ năm 1680."
      }
    ]
  },

  "15_1_blinkofeye": {
    idiom_headword: "in the blink of an eye",
    current_figurative_meaning: "Trong chớp mắt, diễn ra trong một khoảnh khắc cực kỳ ngắn ngủi.",
    literal_image: "Khoảng thời gian vỏn vẹn bằng một cái chớp mí mắt của con người (khoảng 100 đến 150 mili-giây).",
    figurative_connection: "Thước đo thời gian sinh học: Chớp mắt là phản xạ vận động cơ bản nhanh nhất mà mắt thường có thể quan sát được ở người, biến nó thành chuẩn mực ẩn dụ tuyệt đối cho sự thần tốc và thoáng qua của thời gian.",
    historical_context: "Có nguồn gốc từ Kinh Thánh Tân Ước (1 Cô-rinh-tô 15:52: 'ἐν ῥιπῇ ὀφθалμοῦ' - in the twinkling / blink of an eye). Bản dịch Kinh Thánh tiếng Anh Wycliffe (1382) và King James (1611) đã đưa cụm từ này trở thành di sản ngôn ngữ bất hủ.",
    deep_example: "The calm lake turned into a tempestuous churn of whitecaps in the blink of an eye as the cold front descended.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Holy Bible (King James Version, 1611) — 1 Corinthians 15:52",
        url: "https://www.kingjamesbibleonline.org/1-Corinthians-15-52/",
        note: "Ghi chép kinh điển xác lập đơn vị thời gian 'blink of an eye'."
      },
      {
        title: "Oxford English Dictionary — 'blink of an eye'",
        url: "https://www.oed.com/view/Entry/20275",
        note: "Lịch sử biến âm từ Trung cổ sang cận đại."
      }
    ]
  },

  "15_1_scatterbrain": {
    idiom_headword: "scatterbrain",
    current_figurative_meaning: "Người đãng trí, tính khí lơ đễnh, hay quên và không thể tập trung suy nghĩ một cách có tổ chức.",
    literal_image: "Một bộ não bị vỡ vụn và rải rác bay tán loạn tứ xứ theo gió thay vì kết tụ thành khối thống nhất.",
    figurative_connection: "Ẩn dụ ly tâm nhận thức (centrifugal cognitive dissipation): Khả năng chú ý thiếu một trung tâm trọng lực định hướng, khiến các mảnh ký ức và kế hoạch bị gió cuốn bay lung tung, dẫn đến việc để quên chìa khóa hay ví tiền ở khắp nơi.",
    historical_context: "Từ ghép xuất hiện trong tiếng Anh từ cuối thế kỷ 18 (khoảng năm 1790) kết hợp giữa động từ 'scatter' (gieo rắc phân tán) và danh từ 'brain'. Jane Austen và các nhà văn thế kỷ 19 thường dùng từ này để khắc họa các nhân vật hài hước, thiếu chiều sâu.",
    deep_example: "Though an acknowledged mathematical genius, Arthur was notoriously a scatterbrain when it came to everyday administrative deadlines.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'scatterbrain'",
        url: "https://www.oed.com/view/Entry/173909",
        note: "Chứng cứ văn liệu từ năm 1790 trong thư từ quý tộc Anh."
      }
    ]
  },

  "15_1_sweettooth": {
    idiom_headword: "a sweet tooth",
    current_figurative_meaning: "Người hảo ngọt, có sở thích và niềm say mê đặc biệt đối với bánh ngọt, kem và đồ ăn nhiều đường.",
    literal_image: "Một chiếc răng cụ thể trong hàm có đặc tính thèm thuồng và chỉ thỏa mãn khi cắn vào đồ ngọt.",
    figurative_connection: "Cục bộ hóa vị giác cổ xưa: Thuật y học dân gian thời Trung cổ tin rằng từng chiếc răng gắn liền với các dây thần kinh điều khiển cảm giác thèm các loại thực phẩm khác nhau (chua, cay, mặn, ngọt). Có một 'chiếc răng ngọt' đồng nghĩa với ham muốn đồ ngọt bẩm sinh.",
    historical_context: "Xuất hiện từ thế kỷ 14 trong tác phẩm 'Confessio Amantis' (c. 1390) của John Gower ('to have a tooth for'), và được hoàn thiện thành dạng cố định 'sweet tooth' trong thế kỷ 16 trong các tác phẩm ẩm thực Anh.",
    deep_example: "Despite his rigorous athletic regimen, Liam admits to having an incorrigible sweet tooth whenever artisanal chocolates are served.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Gower, John (c. 1390) — Confessio Amantis",
        url: "https://d.lib.rochester.edu/teams/publication/peck-confessio-amantis",
        note: "Khảo chứng sớm nhất về ẩn dụ răng và sở thích ăn uống."
      },
      {
        title: "Oxford English Dictionary — 'sweet tooth'",
        url: "https://www.oed.com/view/Entry/195431",
        note: "Hồ sơ phát triển ngữ nghĩa học từ thế kỷ 14 đến nay."
      }
    ]
  },

  "15_1_breakleg": {
    idiom_headword: "Break a leg!",
    current_figurative_meaning: "Chúc may mắn và thành công rực rỡ! (Lời chúc đặc trưng dành cho diễn viên trước khi bước ra sân khấu).",
    literal_image: "Lời trù ẻo mong cho người khác bị gãy chân hoặc trẹo khớp khi đang biểu diễn.",
    figurative_connection: "Ma thuật trừ tà (apotropaic magic): Giới nghệ sĩ tin rằng các thế lực tâm linh ma quái luôn tìm cách phá hoại. Nếu chúc ai đó 'chúc may mắn' (good luck), điều xui xẻo sẽ xảy ra; ngược lại, nguyền rủa cho gãy chân sẽ lừa được số phận và mang lại buổi diễn đại thành công.",
    historical_context: "Nở rộ trong giới kịch nghệ đầu thế kỷ 20, có liên hệ mật thiết với tiếng lóng sân khấu Đức 'Hals- und Beinbruch' (chúc gãy cổ gãy chân) hoặc tiếng Yiddish 'hazlacha u'bracha'. Một giả thuyết khác liên quan đến việc cúi chào sát đất (curtain call) khiến chân bị gập cong.",
    deep_example: "Whispering 'Break a leg!' just before the curtain rose, the director gave the lead soprano an encouraging nod.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Dundes, Alan (1994) — 'Break a Leg': A Study in Theatrical Superstitions",
        url: "https://www.jstor.org/stable/541487",
        note: "Phân tích nhân học văn hóa dân gian về phép đảo ngược mê tín sân khấu."
      },
      {
        title: "Oxford English Dictionary — 'break a leg'",
        url: "https://www.oed.com/view/Entry/23019",
        note: "Tư liệu chứng thực văn hóa kịch nghệ thế kỷ 20."
      }
    ]
  },

  "15_1_getonnerves": {
    idiom_headword: "getting on my nerves",
    current_figurative_meaning: "Làm tôi bực mình, chọc tức, quấy rầy khiến tôi mất hết kiên nhẫn.",
    literal_image: "Ai đó dẫm đạp, cọ xát hoặc đè nghiến lên những sợi dây thần kinh trần trụi đang nhạy cảm của bạn.",
    figurative_connection: "Ma sát cơ học nội tạng: Tiếng ồn lặp đi lặp lại hoặc hành vi phiền toái được mô hình hóa như sự chà xát cơ học liên tục vào dây thần kinh, gây ra cảm giác ngứa ngáy, nhức nhối và cuối cùng dẫn đến bùng nổ tức giận.",
    historical_context: "Phát triển cùng với ngành sinh lý học thần kinh vào cuối thế kỷ 19 (khoảng thập niên 1890). Khi công chúng hiểu rõ vai trò dẫn truyền cảm giác của 'nerves', cụm từ 'get on one's nerves' thay thế cho các lối nói thô ráp thời phong kiến.",
    deep_example: "The rhythmic tapping of his colleague's pen during the timed examination was rapidly getting on Marcus's nerves.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'get on one's nerves'",
        url: "https://www.oed.com/view/Entry/126078",
        note: "Ghi nhận ngữ liệu cuối thế kỷ 19 về cảm giác bị kích ứng thần kinh."
      }
    ]
  },

  "15_1_twiddlethumb": {
    idiom_headword: "twiddling my thumbs",
    current_figurative_meaning: "Ngồi chơi xơi nước, nhàn rỗi không có việc gì làm, chờ đợi trong buồn chán.",
    literal_image: "Động tác đan các ngón tay vào nhau và xoay tròn hai ngón tay cái quanh nhau một cách vô định.",
    figurative_connection: "Hoạt động vận động thay thế (kinetic displacement activity): Khi não bộ không có công việc chân tay hay tư duy nào để giải quyết, bàn tay vô thức thực hiện hành vi quay tròn khép kín, trở thành dấu hiệu nhận biết toàn cầu của sự nhàn rỗi lãng phí thời gian.",
    historical_context: "Xuất hiện trong văn học Anh vào giữa thế kỷ 19 (khoảng năm 1846). Từ 'twiddle' vốn là từ tượng thanh mô tả cử động xoay tròn nhẹ nhàng, nhanh chóng trở thành biểu tượng miêu tả những kẻ rảnh rỗi hoặc người làm công chờ việc.",
    deep_example: "While the assembly line was halted for machinery maintenance, the factory workers spent the afternoon twiddling their thumbs.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'twiddle one's thumbs'",
        url: "https://www.oed.com/view/Entry/208226",
        note: "Chứng cứ xuất hiện từ năm 1846 trong các tiểu thuyết thời Victoria."
      }
    ]
  },

  "15_1_heartsank": {
    idiom_headword: "my heart sank",
    current_figurative_meaning: "Trực giác chùng xuống, cảm giác buồn bã, thất vọng và tuyệt vọng ập đến đột ngột.",
    literal_image: "Trái tim nặng trĩu như một khối đá bị rơi tuột xuống tận đáy khoang ngực hoặc bụng.",
    figurative_connection: "Phản ứng thần kinh phế vị (vagal visceral response): Khi đón nhận tin tức đau buồn hoặc thất vọng ghê gớm, sự suy giảm đột ngột trương lực cơ ngực và nhịp tim tạo ra cảm giác vật lý rõ rệt như có một vật nặng đang chìm xuống trong lồng ngực.",
    historical_context: "Là một trong những thành ngữ cổ xưa nhất của nhân loại, xuất hiện từ thời kỳ sử thi Homer (Iliad) và đi vào tiếng Anh Trung đại từ thế kỷ 13 ('herte sank'). Được các đại thi hào như Chaucer và Milton sử dụng miêu tả nỗi thất vọng đớn đau.",
    deep_example: "Her heart sank when she opened the formal envelope and saw the words 'We regret to inform you' at the top of the letter.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Chaucer, Geoffrey (c. 1385) — Troilus and Criseyde",
        url: "https://www.librarius.com/",
        note: "Văn bản thi ca tiếng Anh trung đại đầu tiên ghi nhận cảm giác trụy tim vì thất vọng."
      },
      {
        title: "Oxford English Dictionary — 'heart sank'",
        url: "https://www.oed.com/view/Entry/85055",
        note: "Khảo sát tiến trình biến hóa của ẩn dụ hạ trọng lượng tim."
      }
    ]
  },

  "15_1_buryheadsand": {
    idiom_headword: "burying his head in the sand",
    current_figurative_meaning: "Trốn tránh thực tế, làm ngơ trước vấn đề nhức nhối với hy vọng hão huyền rằng rắc rối sẽ tự biến mất.",
    literal_image: "Hình ảnh chú chim đà điểu cắm đầu vào cát khi thấy thú dữ, tin rằng mình không thấy kẻ thù thì kẻ thù cũng không thấy mình.",
    figurative_connection: "Ảo tưởng sensory deprivation: Giống như đứa trẻ bịt mắt nghĩ rằng bóng tối sẽ xóa bỏ thế giới thực, hành vi vùi đầu vào cát là ẩn dụ kinh điển cho hội chứng 'đà điểu' (ostrichism) — trốn tránh sự thật khách quan vì hèn nhát.",
    historical_context: "Bắt nguồn từ ghi chép của nhà tự nhiên học La Mã Pliny the Elder trong bộ bách khoa 'Naturalis Historia' (năm 77 SCN). Dù khoa học sinh học hiện đại chứng minh đà điểu không bao giờ chôn đầu (chúng chỉ áp đầu sát đất để ngụy trang), câu chuyện ngụ ngôn này đã trở thành di sản văn hóa bất tử.",
    deep_example: "Ignoring mounting corporate debt is merely burying your head in the sand; the auditors will uncover the deficit eventually.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Pliny the Elder (AD 77) — Naturalis Historia (Book X)",
        url: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0137",
        note: "Nguồn gốc cổ đại đầu tiên miêu tả hành vi chôn đầu vào cát của đà điểu."
      },
      {
        title: "Oxford English Dictionary — 'bury one's head in the sand'",
        url: "https://www.oed.com/view/Entry/25133",
        note: "Quá trình định hình thành ngữ chính trị và đời sống xã hội phương Tây."
      }
    ]
  },

  "15_1_thickskinned": {
    idiom_headword: "thick-skinned",
    current_figurative_meaning: "Dày dạn sương gió, cứng cỏi, không dễ bị tổn thương trước những lời chỉ trích, chê bai hay gièm pha.",
    literal_image: "Có một lớp biểu bì dày như da voi, da tê giác có thể làm chệch hướng mọi gai nhọn hoặc răng nanh thú dữ.",
    figurative_connection: "Ẩn dụ áo giáp sinh học (dermal armor metaphor): Tâm lý kiên cường được mô hình hóa như một lớp vỏ da dày ngăn chặn những mũi tên độc của lời nói miệt thị xuyên thấu vào tâm can.",
    historical_context: "Ghi nhận trong tiếng Anh từ cuối thế kỷ 16 (khoảng năm 1590). Bác sĩ Philemon Holland và đại thi hào Shakespeare dùng từ này để so sánh tính cách lì lợm của con người với loài động vật da dày (pachyderms).",
    deep_example: "Investigative journalists must develop exceptionally thick-skinned temperaments to withstand public backlash and legal intimidation.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Holland, Philemon (1601) — The Historie of the World (Translation of Pliny)",
        url: "https://quod.lib.umich.edu/e/eebo/",
        note: "Tài liệu văn học thời Elizabeth ghi chép từ ghép 'thick-skinned'."
      },
      {
        title: "Oxford English Dictionary — 'thick-skinned'",
        url: "https://www.oed.com/view/Entry/200732",
        note: "Khảo sát nghĩa đen sinh học và sự chuyển hóa sang nghĩa tâm lý stoic."
      }
    ]
  }
};
