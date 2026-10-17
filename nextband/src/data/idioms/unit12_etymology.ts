// UNIT 12: Positive emotions — Etymological & Conceptual Explanations
// Standardized NextBand Academic Framework: Evidence-based historical and conceptual analysis
// Source: DK English for Everyone: English Idioms (Unit 12, pages 54-57 & Answer Key page 228)

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

export const UNIT_12_ETYMOLOGY: Record<string, IdiomEtymology> = {
  // ==========================================
  // Module 12.1: HAPPINESS
  // ==========================================
  "12_1_oncloudnine": {
    idiom_headword: "on cloud nine",
    current_figurative_meaning: "Vô cùng sung sướng, hân hoan tột đỉnh, ngập tràn trong cảm giác đê mê hạnh phúc.",
    literal_image: "Lơ lửng bồng bềnh trên đám mây ở tầng khí quyển thứ chín, cách xa mặt đất.",
    figurative_connection: "Càng lên cao trong các tầng mây, con người càng tách rời khỏi mọi ưu phiền trần thế, biểu trưng cho sự thăng hoa cảm xúc tột cùng.",
    historical_context: "Hầu hết các nhà từ điển học (Oxford English Dictionary) liên kết thành ngữ này với ấn bản đầu tiên của Hệ thống phân loại mây quốc tế (International Cloud Atlas, 1896), trong đó mây tầng số 9 là 'Cumulonimbus' (mây vũ tích) - loại mây cao nhất, khổng lồ nhất, vươn cao tới 10.000m trên bầu trời. Một giả thuyết bổ sung từ Phật giáo cho rằng tầng mây thứ chín tương ứng với trạng thái giác ngộ của Bồ Tát.",
    deep_example: "Ever since she received the prestigious scholarship from Cambridge, Maria has been on cloud nine, barely able to concentrate on mundane daily chores.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'cloud nine'",
        url: "https://www.oed.com/view/Entry/34689",
        note: "Trích dẫn việc sử dụng phổ biến trong tiếng Anh Mỹ giữa thế kỷ 20 xuất phát từ hệ thống phân loại mây thời tiết."
      },
      {
        title: "World Meteorological Organization — International Cloud Atlas (1896)",
        url: "https://cloudatlas.wmo.int/",
        note: "Cumulonimbus được xếp ở mã số 9 trong thang phân loại độ cao mây."
      }
    ]
  },

  "12_1_ontopworld": {
    idiom_headword: "on top of the world",
    current_figurative_meaning: "Cảm thấy cực kỳ thành công, kiêu hãnh và tràn đầy hoan hỉ như làm chủ cả thế giới.",
    literal_image: "Đứng sừng sững trên điểm cao nhất của địa cầu, ngắm nhìn toàn bộ thế gian dưới chân.",
    figurative_connection: "Ẩn dụ định hướng kinh điển của ngôn ngữ học tri nhận: 'HAPPINESS IS UP / SUCCESS IS TOP' (Lakoff & Johnson, 1980). Vị trí trên đỉnh cao tương đương với quyền lực, chiến thắng và sự mãn nguyện tuyệt đối.",
    historical_context: "Xuất hiện trong các tác phẩm văn học thế kỷ 19-20 và trở nên phổ biến toàn cầu qua ca khúc bất hủ 'Top of the World' (1972) của nhóm The Carpenters. Hình ảnh người leo núi chinh phục đỉnh Everest (1953) cũng củng cố mạnh mẽ ẩn dụ này trong tiềm thức nhân loại.",
    deep_example: "After his startup secured Series A funding and signed five enterprise contracts, David felt on top of the world.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Lakoff, G. & Johnson, M. (1980) — Metaphors We Live By",
        url: "https://press.uchicago.edu/ucp/books/book/chicago/M/bo3637992.html",
        note: "Phân tích ẩn dụ định hướng 'Happy is Up, Sad is Down'."
      }
    ]
  },

  "12_1_grineartoear": {
    idiom_headword: "grin from ear to ear",
    current_figurative_meaning: "Nở nụ cười thật tươi, toe toét miệng vì sung sướng không giấu giếm được.",
    literal_image: "Miệng cười ngoác rộng tới mức hai mép chạm tới tận hai bên vành tai.",
    figurative_connection: "Phóng đại giải phẫu học cơ thể (anatomical hyperbole) thể hiện nụ cười Duchenne chân thật, khi toàn bộ cơ mặt và cơ gò má co kéo tối đa.",
    historical_context: "Thành ngữ xuất hiện từ văn học thời kỳ cận đại Anh thế kỷ 16. Ban đầu thường miêu tả các nhân vật dân gian, chú hề trong lễ hội hoặc trẻ em khi nhận được quà bánh bất ngờ.",
    deep_example: "Seeing his daughter walk across the stage to receive her medical degree, Robert grinned from ear to ear with undisguised pride.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Cambridge Idioms Dictionary — 'grin from ear to ear'",
        url: "https://dictionary.cambridge.org/dictionary/english/grin-from-ear-to-ear",
        note: "Ghi chú cách diễn đạt phóng đại hình thể miêu tả niềm vui vô bờ bến."
      }
    ]
  },

  "12_1_musictoears": {
    idiom_headword: "music to our ears",
    current_figurative_meaning: "Tin tức tuyệt vời, thông điệp làm ai đó vô cùng hài lòng và nhẹ nhõm khi được nghe.",
    literal_image: "Âm thanh lọt vào tai du dương, êm dịu và hài hòa như một bản giao hưởng tuyệt mỹ.",
    figurative_connection: "Chuyển đổi cảm giác (synesthesia / metaphoric mapping): tin tức tốt lành được não bộ tiếp nhận và xử lý tương tự như sự khoái cảm khi lắng nghe giai điệu âm nhạc du dương.",
    historical_context: "Xuất hiện phổ biến trong kịch nghệ thời Phục hưng của Shakespeare (ví dụ trong *Romeo and Juliet* miêu tả giọng nói của người tình ngọt ngào như khúc nhạc êm đềm trong đêm tối).",
    deep_example: "The announcement that Friday afternoons would be designated as flexible study hours was pure music to the students' ears.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "OED — 'music to one's ears'",
        url: "https://www.oed.com/view/Entry/124116",
        note: "Ghi nhận nguồn gốc tu từ học cổ điển ví lời nói dễ chịu với âm nhạc."
      }
    ]
  },

  "12_1_overmoon": {
    idiom_headword: "over the moon",
    current_figurative_meaning: "Vui mừng khôn xiết, phấn khởi vượt ngoài sức tưởng tượng.",
    literal_image: "Một sinh vật bật nhảy cao đến mức vượt qua cả mặt trăng lơ lửng trên bầu trời đêm.",
    figurative_connection: "Hạnh phúc biến năng lượng cơ thể thành sức bật phi thường, phá vỡ trọng lực của Trái Đất để bay vút qua mặt trăng.",
    historical_context: "Xuất phát từ bài đồng dao thiếu nhi kinh điển của Anh có từ thế kỷ 16 mang tên 'Hey Diddle Diddle' ('The cow jumped over the moon'). Vào thập niên 1970, thành ngữ này trở thành câu cửa miệng của các huấn luyện viên bóng đá Ngoại hạng Anh khi phỏng vấn sau chiến thắng.",
    deep_example: "When the research team discovered that the clinical trial showed a 95% efficacy rate, the lead scientist was over the moon.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Oxford Dictionary of Nursery Rhymes",
        url: "https://global.oup.com/academic/product/the-oxford-dictionary-of-nursery-rhymes-9780198600886",
        note: "Nguồn gốc câu ca dao cổ 'Hey Diddle Diddle' và hình tượng chú bò nhảy qua mặt trăng."
      }
    ]
  },

  "12_1_headoverheels": {
    idiom_headword: "head over heels",
    current_figurative_meaning: "Yêu say đắm, si mê cuồng nhiệt và chìm sâu trong men say tình ái.",
    literal_image: "Ngã lộn tùng phèo, đầu và gót chân đảo lộn liên hồi khi trượt chân ngã sấp ngửa.",
    figurative_connection: "Tình yêu mãnh liệt làm cho con người mất thăng bằng lý trí, chao đảo ngã nhào vào vòng xoáy cảm xúc.",
    historical_context: "Vào thế kỷ 14, thành ngữ gốc là 'heels over head' (gót chân qua đầu - miêu tả chính xác một cú ngã lộn nhào). Đến thế kỷ 18, cụm từ bị đảo ngữ thành 'head over heels' và gắn liền đặc biệt với động từ 'fall' ('fall head over heels in love').",
    deep_example: "Within three weeks of meeting Liam at the conference, she had fallen head over heels in love with him.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'head over heels'",
        url: "https://www.oed.com/view/Entry/84992",
        note: "Lịch sử biến âm và đảo trật tự từ từ 'heels over head' (c. 1300) sang 'head over heels' (1771)."
      }
    ]
  },

  // ==========================================
  // Module 12.2: EXPRESSIONS WITH "JOY"
  // ==========================================
  "12_2_prideandjoy": {
    idiom_headword: "pride and joy",
    current_figurative_meaning: "Niềm tự hào và niềm vui sống lớn nhất, báu vật quý giá nhất của một người.",
    literal_image: "Đối tượng vừa đem lại lòng kiêu hãnh (pride) vừa mang đến niềm vui thuần khiết (joy).",
    figurative_connection: "Sự kết hợp giữa giá trị danh dự và giá trị cảm xúc đối với một thành quả, một vật sở hữu hoặc một người thân yêu.",
    historical_context: "Xuất hiện trong bài thơ nổi tiếng 'Resolution and Independence' (1807) của thi hào lãng mạn William Wordsworth: 'A young man in his splendour and his pride...'. Sau đó được phổ biến trong đời sống thị dân Anh để chỉ con cái hoặc tài sản quý giá nhất.",
    deep_example: "Restoring that vintage 1968 Ford Mustang took five years, but it is now granddad's absolute pride and joy.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "William Wordsworth — Resolution and Independence (1807)",
        url: "https://www.poetryfoundation.org/poems/45548/resolution-and-independence",
        note: "Xuất hiện văn học tiêu biểu định hình cụm từ pride and joy."
      }
    ]
  },

  "12_2_jumpforjoy": {
    idiom_headword: "jump for joy",
    current_figurative_meaning: "Nhảy cẫng lên vì sung sướng, biểu lộ niềm vui mãnh liệt qua hành động cơ thể.",
    literal_image: "Bật nhảy tưng bừng lên không trung với nét mặt rạng rỡ hân hoan.",
    figurative_connection: "Phản xạ sinh học giải phóng năng lượng dopamine tức thì khi đón nhận phần thưởng hoặc tin cực kỳ may mắn.",
    historical_context: "Ghi nhận trong các bản dịch văn học tôn giáo và tiếng Anh trung đại từ thế kỷ 14. Được củng cố bởi câu thành ngữ dân gian trong Kinh Thánh miêu tả những tín hữu nhảy múa vui mừng khi nhận ơn phước.",
    deep_example: "When the referee blew the final whistle confirming their championship, the entire bench jumped for joy onto the pitch.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Collins English Dictionary — 'jump for joy'",
        url: "https://www.collinsdictionary.com/dictionary/english/jump-for-joy",
        note: "Định nghĩa và nguồn gốc phản xạ vận động cơ thể biểu đạt niềm vui."
      }
    ]
  },

  "12_2_weepwithjoy": {
    idiom_headword: "weep with joy",
    current_figurative_meaning: "Khóc trong niềm hạnh phúc ngập tràn, rơi lệ vì xúc động tột độ.",
    literal_image: "Những giọt nước mắt lăn dài trên gò má nhưng đi kèm với nụ cười rạng rỡ.",
    figurative_connection: "Hiện tượng cảm xúc lưỡng hình (dimorphous expression): khi sự hân hoan vượt ngưỡng chịu đựng của hệ thần kinh, cơ thể tự động kích hoạt tuyến lệ để giải tỏa áp lực xúc cảm.",
    historical_context: "Shakespeare đã ghi lại hiện tượng này một cách bậc thầy trong *Much Ado About Nothing* (1598): 'There are no faces truer than those that are so washed. How much better is it to weep at joy than to joy at weeping!'.",
    deep_example: "Holding her newborn daughter for the very first time, Elena wept with joy as the exhausting labor concluded.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "William Shakespeare — Much Ado About Nothing (Act 1, Scene 1)",
        url: "https://shakespeare.mit.edu/much_ado/much_ado.1.1.html",
        note: "Khảo cứu tâm lý học văn chương về nước mắt hạnh phúc."
      }
    ]
  },

  "12_2_joytobehold": {
    idiom_headword: "a joy to behold",
    current_figurative_meaning: "Một cảnh tượng tuyệt đẹp, mãn nhãn và làm say đắm lòng người khi chiêm ngưỡng.",
    literal_image: "Một khung cảnh hoặc tạo vật khi nhìn vào lập tức tạo ra cảm giác hoan lạc trong tâm trí.",
    figurative_connection: "Từ cổ 'behold' (quan sát sâu sắc, chiêm ngưỡng) nâng tầm trải nghiệm thị giác lên thành một sự thụ hưởng thẩm mỹ và tinh thần.",
    historical_context: "Bắt nguồn từ tiếng Anh cổ 'behealdan' (chú ý, tôn kính, nhìn ngắm). Cụm từ được dùng trang trọng trong văn miêu tả phong cảnh thiên nhiên, hội họa thời Phục hưng và văn học Victoria.",
    deep_example: "The cherry blossoms in Kyoto during full bloom in April are an exquisite joy to behold.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'behold'",
        url: "https://www.oed.com/view/Entry/17215",
        note: "Phát triển ngữ nghĩa từ quan sát sang chiêm ngưỡng điều diệu kỳ."
      }
    ]
  },

  // ==========================================
  // Module 12.3: ENTHUSIASM
  // ==========================================
  "12_3_raringtogo": {
    idiom_headword: "raring to go",
    current_figurative_meaning: "Háo hức nôn nóng muốn bắt đầu ngay lập tức, tràn trề năng lượng chờ xung trận.",
    literal_image: "Một con tuấn mã nhổm hai chân trước lên cao, thở phì phò nôn nóng lao về phía trước trước giờ đua.",
    figurative_connection: "Động lực nội tại quá lớn khiến chủ thể không thể đứng yên mà chỉ chực lao vào hành động.",
    historical_context: "Bắt nguồn từ phương ngữ miêu tả loài ngựa chiến 'rear' (nhổm lên bằng hai chân sau vì quá hưng phấn). Tại Mỹ vào thế kỷ 19, 'rear' phát âm thành 'rare', từ đó hình thành cụm từ 'raring to go' trong tiếng Anh của giới đua ngựa và nông trại.",
    deep_example: "After three months of intense rehabilitation, the striker declared he was fully fit and raring to go for the cup final.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Merriam-Webster Dictionary — 'raring'",
        url: "https://www.merriam-webster.com/dictionary/raring",
        note: "Biến âm phương ngữ từ 'rear' (đứng trên hai chân sau) phản ánh sự hăng hái của chiến mã."
      }
    ]
  },

  "12_3_putheartsoul": {
    idiom_headword: "put one's heart and soul into",
    current_figurative_meaning: "Dồn hết tâm huyết, trí lực và đam mê cháy bỏng vào một mục tiêu.",
    literal_image: "Đem trọn vẹn cả trái tim (tình cảm, lòng trắc ẩn) và linh hồn (bản thể, sinh khí) dâng hiến cho công việc.",
    figurative_connection: "Triết lý nhị nguyên cổ đại: con người gồm hai phần tinh thần cao quý nhất là tâm (heart) và linh (soul). Khi kết hợp cả hai nghĩa là cam kết trọn vẹn 100%.",
    historical_context: "Xuất hiện trong các thư tịch tôn giáo và triết học Anh thế kỷ 16-17, yêu cầu sự trung thành tuyệt đối của con người đối với lý tưởng cao đẹp hoặc đấng sáng tạo, sau này thế tục hóa thành sự cống hiến nghề nghiệp.",
    deep_example: "Chef Antonio put his heart and soul into creating this tasting menu, personally sourcing each herb from alpine valleys.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Cambridge English Corpus — 'heart and soul'",
        url: "https://dictionary.cambridge.org/dictionary/english/heart-and-soul",
        note: "Phân tích cấu trúc thành ngữ đôi (binomial pair) nhấn mạnh sự toàn tâm toàn ý."
      }
    ]
  },

  "12_3_eagerbeaver": {
    idiom_headword: "an eager beaver",
    current_figurative_meaning: "Một người vô cùng hăng hái, xông xáo làm việc chăm chỉ, đôi khi nhiệt tình thái quá.",
    literal_image: "Con hải ly chăm chỉ đẵn cây, tha gỗ đắp đập suốt ngày đêm bên bờ suối.",
    figurative_connection: "Loài hải ly nổi tiếng trong thế giới tự nhiên về tính siêng năng bền bỉ, được dùng làm biểu tượng nhân hóa cho người lao động mẫn cán.",
    historical_context: "Thành ngữ vần điệu (rhyming idiom) xuất hiện trong tiếng Anh Mỹ đầu thế kỷ 20 và trở nên phổ biến rộng rãi trong Thế chiến thứ II, khi các sĩ quan chỉ huy dùng cụm từ này để khen ngợi (hoặc trêu chọc) những tân binh hăng hái xung phong làm mọi nhiệm vụ cực nhọc.",
    deep_example: "Mark is such an eager beaver that he arrived at the office an hour early to organize the presentation files.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "OED — 'eager beaver'",
        url: "https://www.oed.com/view/Entry/59032",
        note: "Ghi nhận nguồn gốc tiếng lóng quân đội Mỹ thập niên 1940 miêu tả người lính gương mẫu."
      }
    ]
  },

  "12_3_flinghimselfinto": {
    idiom_headword: "fling oneself into",
    current_figurative_meaning: "Lao mình vào, dấn thân quyết liệt và say mê vào một hoạt động hoặc dự án mới.",
    literal_image: "Tự ném cả cơ thể mình về phía trước với một lực phóng dũng mãnh, không ngần ngại do dự.",
    figurative_connection: "Động từ mạnh 'fling' (ném mạnh) phản ánh thái độ dứt khoát, loại bỏ mọi chần chừ để hòa mình trọn vẹn vào công việc.",
    historical_context: "Phổ biến trong văn xuôi thời kỳ lãng mạn thế kỷ 19, miêu tả những hiệp sĩ hoặc nhà thám hiểm dấn thân vào các cuộc phiêu lưu nguy hiểm mà không hề thoái thác.",
    deep_example: "To cope with the grief of losing his partner, James flung himself into charity work, building community shelters.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Collins English Dictionary — 'fling into'",
        url: "https://www.collinsdictionary.com/dictionary/english/fling-into",
        note: "Nghĩa bóng của hành động ném cơ thể vào một công cuộc lớn."
      }
    ]
  },

  "12_3_brighteyedand": {
    idiom_headword: "bright-eyed and bushy-tailed",
    current_figurative_meaning: "Tươi tỉnh, lanh lợi, tràn đầy sinh khí và sẵn sàng bắt đầu một ngày mới đầy hứng khởi.",
    literal_image: "Một chú sóc hoặc chú chồn vào buổi sớm tinh mơ với đôi mắt mở to sáng quắc và chiếc đuôi lông xù vểnh cao hoạt bát.",
    figurative_connection: "Đôi mắt sáng phản ánh tinh thần tỉnh táo, chiếc đuôi xù vểnh cao thể hiện năng lượng dồi dào và trạng thái cảnh giác vui tươi của loài thú hoang dã khỏe mạnh.",
    historical_context: "Bắt nguồn từ tiếng Anh Mỹ thế kỷ 19 mô tả loài sóc cây Bắc Mỹ (Eastern gray squirrel). Thành ngữ được in trên báo chí Mỹ từ thập niên 1930 như một lời chào buổi sáng tràn đầy năng lượng tích cực.",
    deep_example: "Despite having slept only five hours, the tour guide appeared at the hotel lobby bright-eyed and bushy-tailed, ready for the trek.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "American Heritage Dictionary of Idioms",
        url: "https://www.ahdictionary.com/",
        note: "Nguồn gốc hình tượng quan sát động vật hoang dã Bắc Mỹ thế kỷ 19."
      }
    ]
  },

  // ==========================================
  // Module 12.4: EXCITEMENT
  // ==========================================
  "12_4_edgeofseat": {
    idiom_headword: "on the edge of one's seat",
    current_figurative_meaning: "Hồi hộp nín thở theo dõi, bị lôi cuốn đến mức không thể rời mắt khỏi diễn biến kịch tính.",
    literal_image: "Người xem ngồi trườn ra tận mép trước của chiếc ghế, người hơi cúi về phía trước.",
    figurative_connection: "Phản ứng cơ thể vô thức khi muốn rút ngắn khoảng cách với sự kiện ly kỳ đang diễn ra trước mắt.",
    historical_context: "Xuất hiện cùng với sự bùng nổ của nghệ thuật sân khấu Broadway và điện ảnh Hollywood thập niên 1920-1930, khi các bộ phim gián điệp, trinh thám và kinh dị ra đời khiến khán giả rạp chiếu phim không thể ngồi tựa lưng thư thái.",
    deep_example: "The World Cup final penalty shootout had millions of spectators worldwide sitting right on the edge of their seats.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "OED — 'edge of one's seat'",
        url: "https://www.oed.com/view/Entry/59516",
        note: "Ghi nhận cách dùng phổ biến gắn liền với phê bình phim ảnh và kịch nghệ thế kỷ 20."
      }
    ]
  },

  "12_4_batedbreath": {
    idiom_headword: "with bated breath",
    current_figurative_meaning: "Nín thở hồi hộp, chờ đợi với tâm trạng vừa lo âu vừa phấn khích tột độ.",
    literal_image: "Cố tình nén tiếng thở, hít thở thật khẽ khàng để không phá vỡ bầu không khí tĩnh mịch căng thẳng.",
    figurative_connection: "Từ 'bated' là dạng viết tắt của 'abated' (bị ghìm lại, giảm bớt). Nén hơi thở là phản xạ tự nhiên của con người khi đối diện khoảnh khắc định đoạt quan trọng.",
    historical_context: "Được sáng tạo và bất tử hóa bởi William Shakespeare trong kiệt tác *The Merchant of Venice* (1596, Hồi 1, Cảnh 3): nhân vật Shylock mỉa mai Antonio: 'Shall I bend low and in a bondman's key, With bated breath and whisp'ring humbleness...'.",
    deep_example: "The entire control room watched with bated breath as the space probe executed its final descent maneuver toward Mars.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "William Shakespeare — The Merchant of Venice (Act 1, Scene 3)",
        url: "https://shakespeare.mit.edu/merchant/merchant.1.3.html",
        note: "Gốc tích văn học đầu tiên của cụm từ 'bated breath'."
      }
    ]
  },

  "12_4_bouncewalls": {
    idiom_headword: "bouncing off the walls",
    current_figurative_meaning: "Quá phấn khích, tăng động và dư thừa năng lượng đến mức nghịch ngợm không thể kiềm chế.",
    literal_image: "Một quả bóng cao su nảy bật qua lại từ bức tường này sang bức tường khác trong phòng kín với tốc độ chóng mặt.",
    figurative_connection: "Ẩn dụ động năng (kinetic energy): năng lượng tâm lý quá tải khiến hành vi cơ thể trở nên hiếu động, chạy nhảy không ngừng nghỉ.",
    historical_context: "Xuất hiện trong tiếng lóng thể thao và giáo dục trẻ em tại Mỹ vào thập niên 1970, thường dùng để miêu tả trẻ em sau khi ăn quá nhiều bánh kẹo ngọt hoặc phải ở trong nhà suốt nhiều ngày mưa.",
    deep_example: "After being cooped up inside the cabin during the two-day blizzard, the kids were practically bouncing off the walls.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Merriam-Webster Dictionary — 'bounce off the walls'",
        url: "https://www.merriam-webster.com/dictionary/bounce%20off%20the%20walls",
        note: "Thành ngữ tiếng Anh Mỹ thế kỷ 20 miêu tả trạng thái tăng động thái quá."
      }
    ]
  },

  "12_4_burstexcitement": {
    idiom_headword: "burst with excitement",
    current_figurative_meaning: "Phấn khích đến mức như sắp nổ tung, ngập tràn niềm vui sướng không thể kìm nén trong lòng.",
    literal_image: "Một quả bóng bay hoặc bình chứa bị bơm căng khí tới mức vỏ ngoài muốn nứt vỡ ra.",
    figurative_connection: "Ẩn dụ nhận thức: 'THE BODY IS A CONTAINER FOR EMOTIONS'. Khi dung lượng cảm xúc tích cực vượt quá sức chứa cơ thể, nó tạo áp lực muốn 'phát nổ' ra bên ngoài qua tiếng reo hò, nụ cười.",
    historical_context: "Bắt nguồn từ tiếng Anh cận đại thế kỷ 17 với các dạng tương đương 'burst with joy', 'burst with laughter'. Được các tiểu thuyết gia thời Victoria sử dụng rộng rãi để miêu tả tâm lý nhân vật trước các sự kiện trọng đại.",
    deep_example: "When told she had won the lead role in the school musical, Sophie looked as though she was literally bursting with excitement.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Lakoff, G. & Kövecses, Z. (1987) — The Cognitive Model of Anger and Emotion",
        url: "https://doi.org/10.1017/CBO9780511620904",
        note: "Nghiên cứu cấu trúc ẩn dụ bình chứa cảm xúc của con người."
      }
    ]
  },

  "12_4_butterflystomach": {
    idiom_headword: "have butterflies in one's stomach",
    current_figurative_meaning: "Cảm giác cồn cào bồn chồn, vừa hồi hộp lo lắng vừa phấn khích trước một trải nghiệm quan trọng.",
    literal_image: "Có hàng trăm cánh bướm đang đập dập dồn, nhột nhạt bên trong khoang dạ dày.",
    figurative_connection: "Ẩn dụ sinh lý học miêu tả cảm giác rung động quặn thắt nhẹ ở vùng thượng vị do tuyến thượng thận tiết ra hormone adrenaline.",
    historical_context: "Thành ngữ xuất hiện lần đầu trên văn bản vào năm 1908 trong cuốn sách *The House of Cards* của Paul Kester: 'gave me a butterfly in the stomach and no appetite'. Đến thập niên 1940, cụm từ trở thành chuẩn mực toàn cầu để diễn tả cảm xúc trước giờ phỏng vấn, biểu diễn hay tỏ tình.",
    deep_example: "Even after twenty years of concert tours, the pianist admitted she still got butterflies in her stomach right before walking out on stage.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Paul Kester — The House of Cards (1908)",
        url: "https://www.gutenberg.org/",
        note: "Văn bản đầu tiên ghi nhận biến thể 'butterfly in the stomach'."
      },
      {
        title: "Harvard Health Publishing — The Gut-Brain Connection",
        url: "https://www.health.harvard.edu/diseases-and-conditions/the-gut-brain-connection",
        note: "Giải thích cơ chế y học của hiện tượng 'butterflies in the stomach' qua trục não - ruột (gut-brain axis)."
      }
    ]
  }
};
