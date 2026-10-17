// UNIT 09: Agreeing and disagreeing — Etymological & Conceptual Explanations
// Standardized NextBand Academic Framework: Evidence-based historical and conceptual analysis
// Source: DK English for Everyone: English Idioms (Unit 9, pages 42-45 & Answer Key pages 227-228)

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

export const UNIT_09_ETYMOLOGY: Record<string, IdiomEtymology> = {
  // Module 9.1: Agreement and Understanding
  "9_1_eyetoeye": {
    idiom_headword: "see eye to eye",
    current_figurative_meaning: "Đồng thuận hoàn toàn, có cùng cách nhìn nhận, quan điểm hoặc thái độ về một vấn đề",
    literal_image: "Hai người đứng ngang tầm mắt, nhìn thẳng vào mắt nhau ở khoảng cách gần mà không né tránh hay nhìn lệch hướng.",
    figurative_connection: "Góc nhìn vật lý tương đồng tượng trưng cho sự hòa hợp về mặt tư tưởng. Khi hai người cùng nhìn một điểm từ cùng một độ cao và vị trí, họ sẽ nhìn thấy cùng một sự thật khách quan.",
    historical_context: "Bắt nguồn từ Kinh Thánh (Isaiah 52:8): 'Thy watchmen shall lift up the voice; with the voice together shall they sing: for they shall see eye to eye, when the LORD shall bring again Zion'.",
    deep_example: "Even though my business partner and I come from different cultural backgrounds, we see eye to eye on our company's long-term environmental ethics.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "King James Bible — Isaiah 52:8",
        url: "https://www.biblegateway.com/passage/?search=Isaiah%2052:8",
        note: "Văn bản gốc tiếng Hebrew chuyển dịch sang tiếng Anh cổ đại thế kỷ 17."
      },
      {
        title: "Oxford English Dictionary — see eye to eye",
        url: "https://www.oed.com/view/Entry/67584",
        note: "Ghi nhận tiến trình chuyển dịch từ ý niệm tôn giáo sang thành ngữ xã hội thường nhật."
      }
    ]
  },

  "9_1_givegoahead": {
    idiom_headword: "give someone the go-ahead",
    current_figurative_meaning: "Bật đèn xanh, cấp phép hoặc chính thức cho phép một người tiến hành một kế hoạch, hoạt động",
    literal_image: "Hiệu lệnh vẫy cờ hoặc thông báo của người điều phối cho phép phương tiện giao thông hoặc đoàn tàu bắt đầu lăn bánh về phía trước.",
    figurative_connection: "'Go ahead' (tiến lên phía trước) biểu thị sự gỡ bỏ rào cản ngăn cách, mở lối cho hành động bắt đầu được thực thi.",
    historical_context: "Xuất hiện phổ biến vào thế kỷ 19 trong ngành hàng hải và đường sắt tại Mỹ, sau đó được anh hùng dân gian Davy Crockett phổ biến khẩu hiệu: 'Be always sure you're right, then go ahead!' (1834).",
    deep_example: "After examining the revised safety protocols, the city council finally gave the developers the go-ahead to construct the waterfront park.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Merriam-Webster Dictionary — go-ahead",
        url: "https://www.merriam-webster.com/dictionary/go-ahead",
        note: "Từ nguyên và các mốc sử dụng trong giao thông đường sắt thế kỷ 19."
      },
      {
        title: "The Phrase Finder — Go ahead",
        url: "https://www.phrases.org.uk/meanings/go-ahead.html",
        note: "Tư liệu văn hóa về phương châm nổi tiếng của Davy Crockett."
      }
    ]
  },

  "9_1_givegreenlight": {
    idiom_headword: "give the green light to",
    current_figurative_meaning: "Chính thức phê duyệt, trao quyền phê chuẩn cho một dự án, chương trình hoặc sáng kiến được vận hành",
    literal_image: "Tín hiệu đèn giao thông màu xanh lục báo hiệu làn đường thông thoáng, xe cộ an toàn di chuyển qua ngã tư.",
    figurative_connection: "Màu xanh quang học tượng trưng cho sự an toàn và quyền được phép đi tiếp mà không sợ bị chặn bắt hay va chạm rủi ro.",
    historical_context: "Bắt nguồn từ hệ thống tín hiệu đường sắt Anh quốc giữa thế kỷ 19 (năm 1841 phát minh bởi John Peake Knight, người sau này lắp đèn giao thông đầu tiên ở London năm 1868).",
    deep_example: "The ministry has given the green light to the nationwide digital health infrastructure project after a successful six-month pilot.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Smithsonian Magazine — The History of Traffic Lights",
        url: "https://www.smithsonianmag.com/history/the-history-of-traffic-lights-180974052/",
        note: "Lịch sử tín hiệu đường sắt và sự ra đời của đèn tín hiệu màu xanh."
      },
      {
        title: "Cambridge English Dictionary — give the green light",
        url: "https://dictionary.cambridge.org/dictionary/english/give-the-green-light",
        note: "Cách dùng thành ngữ trong quản trị dự án và chính sách công."
      }
    ]
  },

  "9_1_givethumbsup": {
    idiom_headword: "give someone the thumbs-up",
    current_figurative_meaning: "Tán thành, đồng ý hoặc bày tỏ sự khích lệ, cho phép ai đó làm điều họ mong muốn",
    literal_image: "Động tác bàn tay nắm lại với ngón tay cái chỉ thẳng hướng lên trời.",
    figurative_connection: "Cử chỉ giơ ngón tay cái lên cao thể hiện sự vươn lên, năng lượng tích cực và sự công nhận tuyệt đối.",
    historical_context: "Mặc dù thường gắn liền với đấu trường La Mã cổ đại (gladiatorial fights), cử chỉ ngón tay cái hiện đại thực tế được giới phi công Anh và Mỹ (RAF & US Air Force) chuẩn hóa trong Thế chiến II để báo hiệu máy bay đã sẵn sàng cất cánh.",
    deep_example: "The research committee gave the lead scientist the thumbs-up to proceed with clinical trials after validating the initial lab findings.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Time Magazine — The Complicated History of the Thumbs-Up Gesture",
        url: "https://time.com/4751430/thumbs-up-history-gladiators-aviators/",
        note: "Tư liệu lịch sử từ truyền thuyết La Mã cổ đại đến giao tiếp buồng lái Thế chiến II."
      },
      {
        title: "Oxford Reference — thumbs up / thumbs down",
        url: "https://www.oxfordreference.com/display/10.1093/oi/authority.20110803104332454",
        note: "Nghiên cứu biểu tượng học hình thái cơ thể."
      }
    ]
  },

  "9_1_onsamepage": {
    idiom_headword: "on the same page",
    current_figurative_meaning: "Có cùng nhận thức, nắm chung thông tin và thống nhất mục tiêu hành động trong một nhóm",
    literal_image: "Tất cả mọi người trong lớp học hoặc dàn hợp xướng cùng mở sách ra đúng một trang và đọc cùng một dòng chữ.",
    figurative_connection: "Khi tất cả thành viên cùng đọc chung một trang văn bản, không ai bị sót ý, đọc lướt hay hiểu lầm định hướng chung.",
    historical_context: "Phát triển từ môi trường dàn nhạc giao hưởng và trường học tại Mỹ thế kỷ 19, sau đó trở thành thuật ngữ quản trị kinh doanh then chốt từ thập niên 1970 trong quản trị mục tiêu (MBO).",
    deep_example: "Before we present the quarterly financial review to our investors, let's convene a briefing to ensure our whole management team is on the same page.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Merriam-Webster Dictionary — on the same page",
        url: "https://www.merriam-webster.com/dictionary/on%20the%20same%20page",
        note: "Định nghĩa và xuất xứ văn hóa dàn hợp xướng tại Bắc Mỹ."
      },
      {
        title: "Harvard Business Review — Alignment: Getting Everyone on the Same Page",
        url: "https://hbr.org/topic/strategy-execution",
        note: "Ý nghĩa trong tối ưu hóa liên kết chiến lược doanh nghiệp."
      }
    ]
  },

  "9_1_samewavelen": {
    idiom_headword: "on the same wavelength",
    current_figurative_meaning: "Tâm đầu ý hợp, đồng điệu sâu sắc trong suy nghĩ, cảm xúc và cách tiếp cận sáng tạo",
    literal_image: "Máy thu thanh (radio) và đài phát sóng được tinh chỉnh để bắt đúng tần số dao động bước sóng điện từ.",
    figurative_connection: "Nếu không đồng bộ bước sóng, tín hiệu radio chỉ là tiếng rè nhiễu loạn. Khi cùng tần số, thông điệp truyền tải trong vắt và thấu suốt.",
    historical_context: "Ra đời vào đầu thế kỷ 20 cùng với sự phổ biến của kỹ thuật truyền thanh vô tuyến điện (wireless radio transmission) vào thập niên 1920.",
    deep_example: "Collaborating with Elena on this architectural design is effortless because we are instinctively on the same wavelength regarding sustainable materials.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Online Etymology Dictionary — wavelength",
        url: "https://www.etymonline.com/word/wavelength",
        note: "Sự phát triển từ vật lý vô tuyến điện (1870) sang nghĩa ẩn dụ nhận thức (1927)."
      },
      {
        title: "Oxford English Dictionary — on the same wavelength",
        url: "https://www.oed.com/view/Entry/226462",
        note: "Trích dẫn văn học ghi nhận lần đầu năm 1927."
      }
    ]
  },

  // Module 9.2: Disagreement and Conflict
  "9_2_agreedisagree": {
    idiom_headword: "agree to disagree",
    current_figurative_meaning: "Đồng thuận dừng tranh cãi và tôn trọng sự khác biệt quan điểm khi hai bên nhận thấy không thể thuyết phục được nhau",
    literal_image: "Hai người bắt tay nhau không phải vì chung một kết luận, mà vì cùng chấp nhận rằng quan điểm của mỗi người đều có quyền tồn tại độc lập.",
    figurative_connection: "Nghịch lý ngôn từ (oxymoron): dùng sự đồng thuận ở bậc nhận thức cao hơn để phong tỏa và khép lại mâu thuẫn ở bậc chi tiết.",
    historical_context: "Ghi nhận sớm nhất trong bức thư của nhà thần học Anh John Wesley năm 1770 viết trong bài điếu văn tưởng niệm George Whitefield: 'There are many doctrines of a less essential nature... in these we may agree to disagree'.",
    deep_example: "Realizing neither of us would budge on dietary ethics, my friend and I simply agreed to disagree so our conversation could remain warm.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Works of the Rev. John Wesley — Sermon on the Death of George Whitefield (1770)",
        url: "https://www.ccel.org/ccel/wesley/works.html",
        note: "Nguồn gốc văn bản chính thức ghi nhận lần đầu tiên của cụm từ."
      },
      {
        title: "The Phrase Finder — Agree to differ / Agree to disagree",
        url: "https://www.phrases.org.uk/meanings/agree-to-differ.html",
        note: "Phân tích ngữ nghĩa học lịch sử của biến thể Anh và Mỹ."
      }
    ]
  },

  "9_2_atodds": {
    idiom_headword: "at odds",
    current_figurative_meaning: "Bất hòa, mâu thuẫn gay gắt hoặc có sự sai lệch, không ăn khớp với nhau",
    literal_image: "Tỷ lệ cược trong sòng bạc hoặc các con số lẻ (odds) không thể bắt cặp đối xứng, tạo nên sự chênh lệch và bất bình đẳng.",
    figurative_connection: "'Odds' bắt nguồn từ từ cổ 'odde' (số lẻ, điểm bất thường). Khi hai người hoặc hai chính sách 'at odds', giữa họ tồn tại sự khập khiễng, xung đột không thể dung hòa.",
    historical_context: "Xuất hiện trong tiếng Anh từ cuối thế kỷ 16. Kịch tác gia William Shakespeare sử dụng nhiều lần trong các vở kịch, bao gồm 'Richard III' (1593) và 'Antony and Cleopatra'.",
    deep_example: "The mayor's aggressive urban redevelopment proposal is directly at odds with the local community's desire to preserve historic green spaces.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — at odds",
        url: "https://www.oed.com/view/Entry/130424",
        note: "Lịch sử từ vựng từ tiếng Bắc Âu cổ (oddi) sang tiếng Anh thời Elizabeth."
      },
      {
        title: "Shakespeare's Words — at odds",
        url: "https://www.shakespeareswords.com/Public/Glossary.aspx?Id=12140",
        note: "Khảo cứu cách Shakespeare dùng thành ngữ để miêu tả nội chiến cung đình."
      }
    ]
  },

  "9_2_bonecontention": {
    idiom_headword: "a bone of contention",
    current_figurative_meaning: "Điểm mấu chốt gây tranh cãi, nguồn cơn bất hòa dai dẳng giữa hai bên",
    literal_image: "Hai con chó đói đang gầm gừ, cắn xé nhau để tranh giành duy nhất một khúc xương khô bị vứt trên mặt đất.",
    figurative_connection: "Khúc xương tượng trưng cho lợi ích hoặc quyền lực hạn hẹp mà cả hai bên đều khao khát chiếm hữu, dẫn đến việc không bên nào chịu nhượng bộ.",
    historical_context: "Bắt nguồn từ tục ngữ Anh cổ thế kỷ 16 ('to cast a bone between two dogs to make them fight'), xuất hiện chính thức trong văn bản dịch thuật của Thomas More năm 1533.",
    deep_example: "Distribution of offshore oil revenues has been a persistent bone of contention between the federal government and regional authorities for decades.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder — A bone of contention",
        url: "https://www.phrases.org.uk/meanings/a-bone-of-contention.html",
        note: "Nguồn gốc ngụ ngôn về bầy chó tranh xương thế kỷ 16."
      },
      {
        title: "Merriam-Webster Dictionary — bone of contention",
        url: "https://www.merriam-webster.com/dictionary/bone%20of%20contention",
        note: "Phân loại ngôn ngữ học và các văn cảnh nghị luận quốc tế."
      }
    ]
  },

  "9_2_fightcatsdogs": {
    idiom_headword: "fight like cats and dogs",
    current_figurative_meaning: "Cãi vã liên miên, đánh nhau dữ dội như chó với mèo mỗi khi chạm mặt",
    literal_image: "Cuộc đụng độ tự nhiên đầy tiếng gầm gừ, móng vuốt và tiếng sủa ầm ĩ giữa một con chó săn và một con mèo hoang.",
    figurative_connection: "Sự thù địch bản năng không thể hòa giải trong hành vi động vật học được ẩn dụ cho mối quan hệ anh chị em hoặc bạn bè luôn xung đột gay gắt.",
    historical_context: "Xuất hiện trong các câu chuyện dân gian châu Âu hàng trăm năm và được ghi lại bằng văn bản tiếng Anh từ thế kỷ 16 ('agree like dog and cat').",
    deep_example: "Though my brother and I fought like cats and dogs throughout high school, we became fierce allies once we entered university.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Cambridge English Dictionary — fight like cat and dog",
        url: "https://dictionary.cambridge.org/dictionary/english/fight-like-cat-and-dog",
        note: "Thành ngữ văn hóa dân gian so sánh hành vi động vật."
      },
      {
        title: "Oxford English Dictionary — cat-and-dog",
        url: "https://www.oed.com/view/Entry/28841",
        note: "Lịch sử biến đổi từ tính từ mô tả sự bất hòa gia tộc sang quán ngữ động từ."
      }
    ]
  },

  "9_2_jumpthroat": {
    idiom_headword: "jump down someone's throat",
    current_figurative_meaning: "Phản ứng dữ dội, ngắt lời và nổi giận lôi đình mắng mỏ ai đó ngay khi họ vừa cất lời",
    literal_image: "Một người lao thẳng vào miệng và cổ họng của người đối diện như muốn nuốt chửng hoặc chặn đứng giọng nói của họ.",
    figurative_connection: "Hình ảnh cường điệu (hyperbole) sinh động miêu tả sự bộc phát cơn thịnh nộ tột cùng khiến đối phương hoàn toàn bị áp đảo và không kịp tự vệ.",
    historical_context: "Thành ngữ khẩu ngữ bắt đầu xuất hiện trong văn học Anh và Mỹ đầu thế kỷ 20, ghi nhận trong các tiểu luận về tâm lý học giao tiếp từ thập niên 1920.",
    deep_example: "I merely asked whether the timeline could be extended by two days, but the supervisor instantly jumped down my throat before I could finish my sentence.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Merriam-Webster Dictionary — jump down someone's throat",
        url: "https://www.merriam-webster.com/dictionary/jump%20down%20someone%27s%20throat",
        note: "Đặc tính ngữ dụng trong tâm lý học giận dữ và xung đột công sở."
      },
      {
        title: "Collins English Dictionary — jump down someone's throat",
        url: "https://www.collinsdictionary.com/dictionary/english/jump-down-someones-throat",
        note: "Phân loại thành ngữ khẩu ngữ mang tính biểu cảm mạnh."
      }
    ]
  },

  "9_2_readriotact": {
    idiom_headword: "read someone the riot act",
    current_figurative_meaning: "Quở trách thậm tệ, cảnh cáo nghiêm khắc và yêu cầu ai đó chấm dứt ngay hành vi sai trái",
    literal_image: "Quan tòa địa phương đứng trước đám đông nổi loạn và đọc to từng từ trong văn bản Đạo luật Bạo loạn để giải tán đám đông.",
    figurative_connection: "Hành động pháp lý mang tính tối hậu thư: nếu không giải tán trong vòng 1 giờ, quân đội sẽ nổ súng bắt giữ. Khi dùng trong đời thường, đó là lời răn đe tối hậu trước khi áp dụng hình phạt nặng.",
    historical_context: "Bắt nguồn từ Đạo luật Bạo loạn năm 1714 của Nghị viện Anh (The Riot Act of 1714, có hiệu lực từ 1715). Để trấn áp các cuộc nổi dậy của phe Jacobite, luật bắt buộc viên quan tư pháp phải đọc nguyên văn điều luật trước đám đông từ 12 người trở lên.",
    deep_example: "After the teenagers were caught spray-painting the school gym, the principal called their parents and read them the riot act.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "UK Parliament — The Riot Act 1714",
        url: "https://www.parliament.uk/about/living-heritage/transformingsociety/laworder/policeprisons/overview/riotact/",
        note: "Văn bản lưu trữ lịch sử nghị viện về Đạo luật Bạo loạn năm 1714."
      },
      {
        title: "The Phrase Finder — Read the Riot Act",
        url: "https://www.phrases.org.uk/meanings/read-the-riot-act.html",
        note: "Khảo cứu lịch sử áp dụng điều luật trong lịch sử tư pháp Anh quốc."
      }
    ]
  },

  // Module 9.3: Compromise and Resolution
  "9_3_buryhatchet": {
    idiom_headword: "bury the hatchet",
    current_figurative_meaning: "Giảng hòa, xóa bỏ hận thù cũ và khôi phục mối quan hệ hữu nghị sau thời gian dài mâu thuẫn",
    literal_image: "Hành động đào một cái hố sâu dưới lòng đất và chôn chiếc rìu chiến (tomahawk/hatchet) xuống để không ai còn cầm vũ khí chém giết.",
    figurative_connection: "Vũ khí giết chóc bị giấu sâu dưới lòng đất thể hiện lời cam kết hòa bình vĩnh cửu và sự từ bỏ ý chí trả thù.",
    historical_context: "Bắt nguồn từ nghi lễ ngoại giao thực tế của Liên minh Iroquois (Haudenosaunee) tại Bắc Mỹ vào thế kỷ 16 và 17. Các tù trưởng đào hố chôn vũ khí chiến tranh dưới gốc cây thông hòa bình (Tree of Peace) khi ký hòa ước giữa các bộ tộc.",
    deep_example: "After a decade of fierce corporate rivalry in the smartphone market, the two tech titans finally buried the hatchet and entered a cross-licensing pact.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "National Museum of the American Indian — The Great Law of Peace",
        url: "https://americanindian.si.edu/nk360/haudenosaunee/",
        note: "Nghi lễ chôn vũ khí dưới gốc Cây Hòa Bình của người Haudenosaunee."
      },
      {
        title: "The Phrase Finder — Bury the hatchet",
        url: "https://www.phrases.org.uk/meanings/bury-the-hatchet.html",
        note: "Tư liệu ghi chép của nhà ngoại giao Samuel Sewall năm 1680."
      }
    ]
  },

  "9_3_hammerdeal": {
    idiom_headword: "hammer out a deal",
    current_figurative_meaning: "Đàm phán gian khổ suốt nhiều giờ liền để đạt được một thỏa thuận, hợp đồng chung cuộc",
    literal_image: "Người thợ rèn dùng búa tạ liên tục nện xuống thanh sắt nung đỏ trên đe để uốn nắn nó thành hình thù mong muốn.",
    figurative_connection: "Quá trình đàm phán giống như việc rèn kim loại: đòi hỏi sức ép, nhiệt lượng và vô số nhát búa kiên trì để uốn nắn các quan điểm gai góc thành hình một hợp đồng thống nhất.",
    historical_context: "Xuất hiện vào cuối thế kỷ 19 gắn liền với thời kỳ công nghiệp nặng và sự hình thành các nghiệp đoàn lao động lớn tại Anh và Mỹ.",
    deep_example: "Diplomats from both nations spent three sleepless nights in Geneva hammering out a historic bilateral nuclear disarmament treaty.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Cambridge English Dictionary — hammer out",
        url: "https://dictionary.cambridge.org/dictionary/english/hammer-out",
        note: "Nghĩa chuyển đổi từ nghề rèn sang đàm phán ngoại giao và thương mại."
      },
      {
        title: "Merriam-Webster Dictionary — hammer out",
        url: "https://www.merriam-webster.com/dictionary/hammer%20out",
        note: "Các dẫn chứng văn bản trong hội nghị thượng đỉnh quốc tế."
      }
    ]
  },

  "9_3_holdolivebranch": {
    idiom_headword: "hold out an olive branch",
    current_figurative_meaning: "Chủ động đưa ra thiện chí hòa giải, chìa tay làm hòa để chấm dứt xung đột",
    literal_image: "Một người chìa cành cây ô liu tươi xanh về phía đối thủ đang giận dữ.",
    figurative_connection: "Cây ô liu cần nhiều năm canh tác hòa bình mới ra quả; trong thời chiến vườn ô liu luôn bị tàn phá. Vì vậy, cành ô liu là biểu tượng muôn đời của sự tái thiết và thiện chí hòa bình.",
    historical_context: "Bắt nguồn từ thần thoại Hy Lạp cổ đại (nữ thần Athena tặng cây ô liu cho thành Athens) và truyền thuyết con chim bồ câu ngậm cành ô liu bay về thuyền cứu rỗi Noah trong Kinh Thánh (Genesis 8:11).",
    deep_example: "Recognizing that the strike was crippling the transport network, the transport minister held out an olive branch by inviting union leaders to lunch.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "British Museum — The Olive Branch in Antiquity",
        url: "https://www.britishmuseum.org/collection/term/BIOG14619",
        note: "Biểu tượng hòa bình trong văn hóa Địa Trung Hải cổ đại."
      },
      {
        title: "The Phrase Finder — Olive branch",
        url: "https://www.phrases.org.uk/meanings/olive-branch.html",
        note: "Lịch sử biểu tượng từ truyền thuyết Noah đến phong trào hòa bình hiện đại."
      }
    ]
  },

  "9_3_meethalfway": {
    idiom_headword: "meet someone halfway",
    current_figurative_meaning: "Nhượng bộ một nửa, chấp nhận thỏa hiệp để đôi bên cùng có lợi và đạt được đồng thuận",
    literal_image: "Hai người đi từ hai đầu cầu xa xôi và cùng bước về điểm chính giữa cầu để gặp nhau.",
    figurative_connection: "Mỗi bên lùi lại một bước hoặc cùng tiến thêm nửa đoạn đường thể hiện sự công bằng và bình đẳng trong việc chia sẻ trách nhiệm.",
    historical_context: "Phổ biến trong thương mại và luật tục Anh ngữ từ thế kỷ 17 như một nguyên tắc vàng của đàm phán hòa giải.",
    deep_example: "The landlord originally asked for a fifteen percent rent increase, but we met halfway at seven percent after discussing inflation.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Oxford English Dictionary — meet halfway",
        url: "https://www.oed.com/view/Entry/115904",
        note: "Tư liệu về nguyên lý thương thảo hợp đồng."
      },
      {
        title: "Collins English Dictionary — meet someone halfway",
        url: "https://www.collinsdictionary.com/dictionary/english/meet-someone-halfway",
        note: "Phân loại thành ngữ giải quyết tranh chấp."
      }
    ]
  },

  "9_3_middleground": {
    idiom_headword: "the middle ground",
    current_figurative_meaning: "Vùng thỏa hiệp trung gian, giải pháp dung hòa thỏa mãn được một phần yêu cầu của các bên đối lập",
    literal_image: "Khu vực địa hình trung lập nằm chính giữa ranh giới đóng quân của hai đạo quân thù địch.",
    figurative_connection: "Vùng đất ở giữa không thuộc độc quyền của ai, cho phép hai bên cùng bước vào đối thoại mà không lo bị rơi vào thế yếu.",
    historical_context: "Khái niệm bắt nguồn từ triết học Trung dung của Aristotle (Golden Mean) và đạo đức học phương Tây thế kỷ 18, được các nhà ngoại giao Anh thế kỷ 19 nâng lên thành thuật ngữ chính trị.",
    deep_example: "Legislators from opposing parties finally found the middle ground on carbon reduction targets to ensure the environmental bill passed.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Stanford Encyclopedia of Philosophy — Aristotle's Ethics (The Golden Mean)",
        url: "https://plato.stanford.edu/entries/aristotle-ethics/",
        note: "Nền tảng triết học về sự chừng mực và điểm trung dung."
      },
      {
        title: "Cambridge English Dictionary — middle ground",
        url: "https://dictionary.cambridge.org/dictionary/english/middle-ground",
        note: "Ý nghĩa trong chính trị và đối thoại xã hội."
      }
    ]
  },

  "9_3_reachcomprom": {
    idiom_headword: "reach a compromise",
    current_figurative_meaning: "Đạt được thỏa hiệp chung, giải quyết tranh chấp bằng cách mỗi bên nhượng bộ một phần yêu cầu",
    literal_image: "Hai phái đoàn bước tới chiếc bàn đàm phán trung tâm và cùng ký tên vào văn kiện giải pháp.",
    figurative_connection: "'Compromise' (gốc Latin 'compromissum' = cùng cam kết trước trọng tài). 'Reach' biểu thị một hành trình dài vượt qua trở ngại để chạm tới điểm đích hòa bình.",
    historical_context: "Du nhập vào luật pháp Anh thời Trung cổ từ luật La Mã (Roman Law), dùng để giải quyết các tranh chấp đất đai thông qua hòa giải viên.",
    deep_example: "After six hours of intense deliberations, the editorial board reached a compromise regarding the publication of the controversial investigative report.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Online Etymology Dictionary — compromise",
        url: "https://www.etymonline.com/word/compromise",
        note: "Lịch sử từ vựng từ tiếng Latin thế kỷ 15 đến luật học Anh."
      },
      {
        title: "Oxford English Dictionary — reach a compromise",
        url: "https://www.oed.com/view/Entry/37841",
        note: "Khảo cứu cấu trúc collocation chuẩn trong văn phong hành chính."
      }
    ]
  },

  "9_3_smoothover": {
    idiom_headword: "smooth things over",
    current_figurative_meaning: "Làm dịu căng thẳng, xoa dịu mâu thuẫn để mọi việc trở lại êm thấm và bình yên",
    literal_image: "Người thợ dùng dao trét bột làm phẳng những vết nứt, gồ ghề trên bức tường vôi vữa bị trầy xước.",
    figurative_connection: "Những lời nói giận dữ tạo ra vết nứt và gập ghềnh trong tình cảm. 'Làm mịn' vết gồ ghề giúp dòng chảy giao tiếp trở lại trơn tru.",
    historical_context: "Xuất hiện trong tiếng Anh từ thế kỷ 17, liên quan đến nghề mộc và xây dựng (làm nhẵn bề mặt gỗ hoặc vữa thô).",
    deep_example: "The human resources director intervened promptly to smooth things over between the team leads before the friction affected project morale.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Merriam-Webster Dictionary — smooth over",
        url: "https://www.merriam-webster.com/dictionary/smooth%20over",
        note: "Nghĩa chuyển từ thợ thủ công sang hòa giải xung đột con người."
      },
      {
        title: "Cambridge English Dictionary — smooth things over",
        url: "https://dictionary.cambridge.org/dictionary/english/smooth-things-over",
        note: "Phân loại cụm động từ trong ngoại giao và ứng xử doanh nghiệp."
      }
    ]
  },

  "9_3_struckadeal": {
    idiom_headword: "strike a deal",
    current_figurative_meaning: "Chốt xong thỏa thuận, ký kết thành công giao kèo làm ăn hoặc cam kết hợp tác",
    literal_image: "Hai thương nhân cùng vỗ mạnh lòng bàn tay vào nhau ('striking hands') trước sự chứng kiến của mọi người tại chợ phiên để kết thúc cuộc ngã giá.",
    figurative_connection: "Cú đập tay dứt khoát là lời thề danh dự không thể rút lại trước khi các hợp đồng giấy tờ hiện đại ra đời.",
    historical_context: "Ghi nhận từ thời Anglo-Saxon và phong tục cổ châu Âu ('handstriking'). Xuất hiện trong văn bản tiếng Anh từ thế kỷ 16 và trong bản dịch Kinh Thánh King James (Proverbs 6:1: 'if thou hast stricken thy hand with a stranger').",
    deep_example: "The independent renewable energy startup struck a multi-million-dollar deal with the national electrical grid operator yesterday.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder — Strike a deal / Strike a bargain",
        url: "https://www.phrases.org.uk/meanings/strike-a-bargain.html",
        note: "Tục đập tay giao kết (handstriking) từ thế kỷ 14 ở chợ gia súc Anh."
      },
      {
        title: "Oxford English Dictionary — strike a deal",
        url: "https://www.oed.com/view/Entry/191147",
        note: "Diễn biến từ 'strike hands' sang 'strike a deal' trong thương mại cận đại."
      }
    ]
  }
};

export default UNIT_09_ETYMOLOGY;
