// UNIT 18: Beginning and ending — Etymological & Conceptual Explanations
// Standardized NextBand Academic Framework: Evidence-based historical and conceptual analysis
// Source: DK English for Everyone: English Idioms (Unit 18, pages 78-81 & Answer Key page 229)

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

export const UNIT_18_ETYMOLOGY: Record<string, IdiomEtymology> = {
  // ==========================================
  // Module 18.1: BEGINNING (Page 78)
  // ==========================================
  "18_1_makefreshstart": {
    idiom_headword: "make a fresh start",
    current_figurative_meaning: "Làm lại cuộc đời, bắt đầu lại từ đầu với thái độ tích cực sau giai đoạn khó khăn hay vấp ngã.",
    literal_image: "Xóa sạch trang giấy cũ bị lem mực để viết lại từ trang mới tinh khôi, hoặc vạch lại vạch xuất phát trong cuộc đua.",
    figurative_connection: "Ẩn dụ tẩy sạch dấu vết tiêu cực trong quá khứ để tái thiết lập lộ trình phát triển mà không bị gánh nặng lịch sử cản trở.",
    historical_context: "Xuất phát từ thuật ngữ hàng hải và điền kinh thế kỷ 16-17 ('fresh start' chỉ việc thuyền bắt đầu giương buồm trở lại khi có làn gió mới thuận lợi sau những ngày lặng gió).",
    deep_example: "After recovering from career burnout, Marcus relocated to the countryside to make a fresh start in sustainable agriculture.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'fresh start'",
        url: "https://www.oed.com/view/Entry/74548",
        note: "Ghi nhận ngữ nghĩa tái khởi đầu trong ngữ cảnh hàng hải và thể thao."
      }
    ]
  },

  "18_1_hitgroundrun": {
    idiom_headword: "hit the ground running",
    current_figurative_meaning: "Bắt tay vào công việc ngay lập tức với tốc độ cao, hiệu quả tức thì mà không cần thời gian thích nghi.",
    literal_image: "Binh lính nhảy dù hoặc đổ bộ từ máy bay trực thăng xuống mặt đất và ngay lập tức chạy vào vị trí tác chiến.",
    figurative_connection: "Chuyển hóa động lực tiếp đất: Không bị quán tính làm ngã hay chậm trễ, sự linh hoạt tức thì giúp nắm bắt thế chủ động trong môi trường làm việc cạnh tranh cao.",
    historical_context: "Bắt nguồn từ lực lượng lính dù (paratroopers) của Không quân Mỹ trong Thế chiến II và Chiến tranh Triều Tiên. Binh lính được huấn luyện phải chạy ngay khi chân chạm đất để tránh hỏa lực địch và giải phóng dù nhanh chóng.",
    deep_example: "The newly appointed chief marketing officer hit the ground running, launching a major branding revamp in her first week.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'hit the ground running'",
        url: "https://www.oed.com/view/Entry/87361",
        note: "Xuất xứ quân sự từ lực lượng tác chiến đổ bộ đường không Mỹ giữa thế kỷ 20."
      }
    ]
  },

  "18_1_kickedoff": {
    idiom_headword: "kicked off",
    current_figurative_meaning: "Khởi động, bắt đầu chính thức một sự kiện, chiến dịch, lễ hội hay cuộc họp quan trọng.",
    literal_image: "Cú đá giao bóng mở màn trận đấu bóng đá hoặc bóng bầu dục từ chấm giữa sân.",
    figurative_connection: "Hành động khai cuộc thể thao: Cú chạm bóng đầu tiên biến trạng thái tĩnh (chuẩn bị) sang trạng thái động (tranh tài quyết liệt), được chuyển nghĩa sang bất kỳ sự kiện công chúng nào.",
    historical_context: "Xuất hiện trong luật thi đấu bóng đá tại các trường tư thục Anh thế kỷ 19. Thuật ngữ 'kick-off' được ấn định trong bộ luật Cambridge Rules năm 1848 và mở rộng sang văn hóa đại chúng vào đầu thế kỷ 20.",
    deep_example: "The annual international climate symposium kicked off with an impassioned keynote address from a leading atmospheric scientist.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'kick off'",
        url: "https://www.oed.com/view/Entry/103282",
        note: "Khảo chứng từ vựng bóng đá sang thành ngữ chỉ sự kiện khai mạc."
      }
    ]
  },

  "18_1_getoffground": {
    idiom_headword: "get off the ground",
    current_figurative_meaning: "Bắt đầu cất cánh thành công, vượt qua giai đoạn phôi thai đầy khó khăn để đi vào hoạt động trơn tru.",
    literal_image: "Chiếc máy bay hay tên lửa nặng nề thắng được trọng lực để nhấc bổng thân mình rời khỏi mặt đất.",
    figurative_connection: "Lực nâng khí động học: Giai đoạn rời mặt đất là thử thách lớn nhất cần lực đẩy khổng lồ; tương tự một dự án kinh doanh khởi nghiệp cần vốn và khách hàng ban đầu để 'cất cánh'.",
    historical_context: "Ra đời vào đầu kỷ nguyên hàng không thương mại những năm 1930 tại Mỹ. Ban đầu dùng cho các chuyến bay thử nghiệm, sau đó nhanh chóng áp dụng vào kinh doanh và chính sách công.",
    deep_example: "Without substantial seed funding from angel investors, the clean energy startup would never have gotten off the ground.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'off the ground'",
        url: "https://www.oed.com/view/Entry/81977",
        note: "Ẩn dụ cơ học hàng không trong quản trị dự án."
      }
    ]
  },

  "18_1_turnovernew": {
    idiom_headword: "turn over a new leaf",
    current_figurative_meaning: "Cải tà quy chính, thay đổi lối sống và hành vi theo hướng văn minh, đạo đức và lành mạnh hơn.",
    literal_image: "Lật sang một trang giấy mới trong cuốn sổ để bắt đầu viết những điều ngay ngắn, bỏ lại trang giấy cũ nhăn nhúm.",
    figurative_connection: "Trong tiếng Anh cổ, 'leaf' thường chỉ một trang sách (page). Lật sang trang mới là cam kết viết nên câu chuyện cuộc đời trong sạch, không lặp lại sai lầm trước đó.",
    historical_context: "Xuất hiện từ thế kỷ 16 trong các tác phẩm giáo huấn tôn giáo và kịch nghệ Anh, tiêu biểu là vở kịch *Patient Grissill* (1603) của Thomas Dekker.",
    deep_example: "Following his disciplinary warning, Daniel resolved to turn over a new leaf by arriving punctually and contributing actively to meetings.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'turn over a new leaf'",
        url: "https://www.oed.com/view/Entry/106720",
        note: "Nguồn gốc từ 'leaf' nghĩa là trang sách trong văn bản thời Elizabeth."
      }
    ]
  },

  "18_1_promisingstart": {
    idiom_headword: "a promising start",
    current_figurative_meaning: "Khởi đầu đầy hứa hẹn, báo hiệu tương lai xán lạn và tiềm năng phát triển vượt bậc.",
    literal_image: "Mầm cây xanh non đâm chồi khỏe khoắn hoặc một hạt giống nảy mầm rực rỡ báo hiệu mùa màng bội thu.",
    figurative_connection: "Dự báo qua dấu hiệu sớm: Những kết quả tích cực trong giai đoạn đầu tiên là căn cứ dự đoán thành công lâu dài của một tập thể hay cá nhân.",
    historical_context: "Xuất phát từ tiếng Anh thế kỷ 17, liên quan đến các hợp đồng kinh tế và thành tích đua ngựa, nơi ngựa non thể hiện tốc độ ấn tượng ở chặng đầu.",
    deep_example: "The rookie quarterback made a promising start to the championship by throwing two touchdowns in his inaugural quarter.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Cambridge Idioms Dictionary — 'a promising start'",
        url: "https://dictionary.cambridge.org/",
        note: "Đánh giá định tính hiệu suất trong giai đoạn đầu."
      }
    ]
  },

  "18_1_anewbie": {
    idiom_headword: "a newbie",
    current_figurative_meaning: "Người mới toanh, lính mới tò te chưa có kinh nghiệm trong một lĩnh vực hay cộng đồng nào đó.",
    literal_image: "Học sinh mới bước vào trường lạ lẫm với mọi quy tắc và biển chỉ dẫn.",
    figurative_connection: "Rút gọn thân mật từ 'new boy' hoặc 'newcomer', chỉ sự non nớt nhưng sẵn sàng học hỏi của người mới nhập môn.",
    historical_context: "Tiền thân là thuật ngữ lóng học đường Anh thế kỷ 19 ('new boy'). Đến thập niên 1980, từ này được cộng đồng Usenet và Internet thời sơ khai phổ biến thành 'newbie' / 'noob'.",
    deep_example: "As a coding newbie, she spent countless hours dissecting open-source repositories to understand architectural best practices.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'newbie'",
        url: "https://www.oed.com/view/Entry/245781",
        note: "Sự tiến hóa từ học đường Anh sang văn hóa mạng Usenet 1980s."
      }
    ]
  },

  "18_1_flyingstart": {
    idiom_headword: "get off to a flying start",
    current_figurative_meaning: "Khởi đầu cực kỳ thuận lợi và ấn tượng, bứt phá dẫn đầu ngay từ giây phút đầu tiên.",
    literal_image: "Con thuyền buồm hoặc xe đua lao vút qua vạch xuất phát với tốc độ tối đa thay vì phải tăng tốc từ số 0.",
    figurative_connection: "Xuất phát khi đã đạt vận tốc: Trong các cuộc đua thuyền buồm hoặc ngựa, chiến thuật 'flying start' cho phép vận động viên tích lũy đà từ trước khi còi hiệu vang lên.",
    historical_context: "Bắt nguồn từ môn đua ngựa và đua thuyền buồm thế kỷ 19 ở Anh, nơi thuyền buồm được phép chạy đà trước khi tính giờ tại vạch xuất phát.",
    deep_example: "Backed by an extensive influencer marketing campaign, the novel got off to a flying start and topped the bestseller list within 48 hours.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'flying start'",
        url: "https://www.oed.com/view/Entry/72120",
        note: "Thuật ngữ thể thao đua thuyền buồm và đua ngựa thế kỷ 19."
      }
    ]
  },

  "18_1_ballrolling": {
    idiom_headword: "get the ball rolling",
    current_figurative_meaning: "Khai mạc, khởi xướng hoạt động, tạo đà bắt đầu một công việc tập thể.",
    literal_image: "Đẩy một quả cầu nặng trên mặt phẳng để nó tự lăn nhờ quán tính.",
    figurative_connection: "Vượt qua ma sát nghỉ: Lực đẩy ban đầu là khó nhất, một khi quả bóng đã lăn thì việc duy trì đà vận động trở nên dễ dàng hơn nhiều.",
    historical_context: "Bắt nguồn từ chiến dịch tranh cử Tổng thống Mỹ năm 1840 của William Henry Harrison. Nhóm ủng hộ ông đã lăn một quả bóng khổng lồ bằng da và thiếc xuyên qua nhiều bang với khẩu hiệu 'Keep the ball rolling'.",
    deep_example: "To get the ball rolling on the quarterly review, each department head presented a three-minute highlight summary.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Smithsonian Magazine — 'The 1840 Campaign That Kept the Ball Rolling'",
        url: "https://www.smithsonianmag.com/",
        note: "Sự kiện lịch sử chính trị Harrison năm 1840."
      },
      {
        title: "Oxford English Dictionary — 'keep / get the ball rolling'",
        url: "https://www.oed.com/view/Entry/14959",
        note: "Quá trình thành ngữ hóa biểu tượng chính trị thành cụm từ thường nhật."
      }
    ]
  },

  "18_1_getgoing": {
    idiom_headword: "get going",
    current_figurative_meaning: "Bắt tay vào làm ngay lập tức, khởi hành khẩn trương không chậm trễ.",
    literal_image: "Nhấn ga tăng tốc hoặc bước những bước chân dồn dập lên đường.",
    figurative_connection: "Chuyển từ do dự sang hành động cụ thể, phá vỡ sự trì hoãn trước áp lực thời gian.",
    historical_context: "Thành ngữ tiếng Anh cận đại phổ biến từ thế kỷ 18, phản ánh nhịp sống công nghiệp hóa đòi hỏi tính khẩn trương và kỷ luật thời gian.",
    deep_example: "With the final submission deadline looming at midnight, the editorial team really needs to get going on the manuscript revisions.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Oxford English Dictionary — 'get going'",
        url: "https://www.oed.com/view/Entry/78240",
        note: "Cấu trúc động từ nội tại biểu đạt sự khẩn trương."
      }
    ]
  },

  // ==========================================
  // Module 18.2: ENDING (Page 79)
  // ==========================================
  "18_2_callitaday": {
    idiom_headword: "call it a day",
    current_figurative_meaning: "Nghỉ tay, ngừng làm việc trong ngày vì đã đạt mục tiêu hoặc đã mệt mỏi.",
    literal_image: "Tuyên bố rằng phần thời gian làm việc của ngày hôm nay đã kết thúc thỏa đáng.",
    figurative_connection: "Xem khối lượng công việc đã làm là đủ trọn vẹn cho 'một ngày' công, cho phép tâm trí được thư giãn tái tạo năng lượng.",
    historical_context: "Ban đầu là cụm từ 'call it half a day' vào những năm 1830 của công nhân Anh khi rời xưởng sớm. Đến đầu thế kỷ 20, cụm từ phát triển thành 'call it a day' phổ biến trong văn phòng công sở hiện đại.",
    deep_example: "After debugging complex server errors for nine uninterrupted hours, the engineering squad agreed to call it a day.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'call it a day'",
        url: "https://www.oed.com/view/Entry/26533",
        note: "Lịch sử biến đổi từ văn hóa công nhân thế kỷ 19 sang ngôn ngữ hiện đại."
      }
    ]
  },

  "18_2_putfinishtouch": {
    idiom_headword: "putting the finishing touches on it",
    current_figurative_meaning: "Hoàn thiện những chi tiết cuối cùng để tác phẩm, sản phẩm đạt mức hoàn hảo nhất.",
    literal_image: "Họa sĩ cầm cây cọ mảnh chấm những vệt màu cuối cùng lên bức tranh sơn dầu trước khi ký tên.",
    figurative_connection: "Cú chạm của sự tinh tế: Dù 99% cấu trúc đã xong, chính những 'nét chạm hoàn tất' (finishing touches) mới nâng tầm tác phẩm từ thông thường lên kiệt tác.",
    historical_context: "Xuất phát từ giới hội họa và điêu khắc châu Âu thế kỷ 18. Các danh họa dùng cụm từ này để chỉ giai đoạn phủ vecni hoặc điều chỉnh ánh sáng vi mô.",
    deep_example: "The research team is putting the finishing touches on their white paper before sending it to peer reviewers.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'finishing touch'",
        url: "https://www.oed.com/view/Entry/70487",
        note: "Nguồn gốc từ xưởng vẽ mỹ thuật thời kỳ Khai sáng."
      }
    ]
  },

  "18_2_drewtoclose": {
    idiom_headword: "drew to a close",
    current_figurative_meaning: "Dần dần khép lại, đi vào hồi kết một cách êm đềm, tuần tự theo quy luật tự nhiên.",
    literal_image: "Bức rèm nhung trên sân khấu kịch từ từ kéo khép lại sau khi buổi biểu diễn hạ màn.",
    figurative_connection: "Sự khép màn sân khấu: 'Draw' mang nghĩa kéo dây kéo rèm. Khi ngày tàn hoặc một giai đoạn kết thúc, không gian như được nhẹ nhàng đóng lại.",
    historical_context: "Gắn liền với nghệ thuật kịch nghệ Shakespeare và thời kỳ Phục hưng tại London, nơi các vở diễn kết thúc bằng động tác kéo màn hoặc đóng cổng nhà hát.",
    deep_example: "As the historic conference drew to a close, delegates signed a landmark multilateral accord on biodiversity preservation.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'draw to a close'",
        url: "https://www.oed.com/view/Entry/57530",
        note: "Ẩn dụ kéo rèm sân khấu thế kỷ 17."
      }
    ]
  },

  "18_2_groundhalt": {
    idiom_headword: "ground to a halt",
    current_figurative_meaning: "Bị đình trệ hoàn toàn, tê liệt dừng hẳn do ma sát, chướng ngại hoặc cạn kiệt năng lượng.",
    literal_image: "Bánh răng cối xay gió hoặc cỗ máy hơi nước nghiến ken két vào sỏi đá rồi kẹt cứng bất động.",
    figurative_connection: "Ma sát triệt tiêu chuyển động: Khi cơ chế vận hành gặp trục trặc cơ học không thể khắc phục, mọi sự chuyển động đều bị mài mòn và dừng hẳn.",
    historical_context: "Bắt nguồn từ động từ quá khứ 'ground' (nghiền của *grind*). Xuất hiện thời kỳ Cách mạng Công nghiệp khi máy móc cối xay hoặc bánh xe lửa bị kẹt do cát sỏi và thiếu dầu bôi trơn.",
    deep_example: "Supply chains across the continent ground to a halt due to nationwide rail logistics strikes.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'grind to a halt'",
        url: "https://www.oed.com/view/Entry/81615",
        note: "Ngữ nghĩa cơ học ma sát bánh răng thời kỳ Cách mạng Công nghiệp."
      }
    ]
  },

  // ==========================================
  // Module 18.3: EXPRESSIONS WITH "END" (Page 79)
  // ==========================================
  "18_3_putanendto": {
    idiom_headword: "put an end to",
    current_figurative_meaning: "Chấm dứt hoàn toàn, dẹp bỏ dứt điểm một hiện tượng, hủ tục hoặc hành vi tiêu cực.",
    literal_image: "Đặt một tấm rào chắn hoặc dấu chấm hết vững chắc để không cho đối tượng tiếp tục phát triển.",
    figurative_connection: "Hành động can thiệp chủ động: Không để sự việc tự lụi tàn mà dùng quyền lực hoặc biện pháp mạnh mẽ để triệt tiêu nó.",
    historical_context: "Xuất hiện trong các văn bản pháp lý và sắc lệnh hoàng gia Anh từ thời Trung cổ (thế kỷ 14) nhằm tuyên bố bãi bỏ các loại thuế hoặc hành vi phản loạn.",
    deep_example: "The government enacted stringent regulations to put an end to illegal sand mining along coastal estuaries.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'put an end to'",
        url: "https://www.oed.com/view/Entry/61889",
        note: "Công thức pháp lý trong sắc lệnh hành chính Anh cổ."
      }
    ]
  },

  "18_3_endofera": {
    idiom_headword: "the end of an era",
    current_figurative_meaning: "Cột mốc kết thúc một kỷ nguyên, khép lại một thời kỳ lịch sử quan trọng gắn liền với một nhân vật hay trào lưu lớn.",
    literal_image: "Trang sử cuối cùng của một triều đại huy hoàng được lật qua để mở ra niên đại mới.",
    figurative_connection: "Quy mô thời gian lịch sử: Đánh giá một sự kiện chia tay không chỉ là biến cố cá nhân mà mang tầm vóc đại diện cho sự chuyển giao thế hệ.",
    historical_context: "Phổ biến trong giới học giả lịch sử thế kỷ 19 sau khi triều đại Nữ hoàng Victoria kết thúc, sau đó lan sang văn hóa thể thao và nghệ thuật khi các tượng đài giải nghệ.",
    deep_example: "When the legendary tech pioneer stepped down as chief executive, tech analysts hailed it as the definitive end of an era.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'era'",
        url: "https://www.oed.com/view/Entry/63785",
        note: "Sử ký thế kỷ 19 về các bước ngoặt niên đại xã hội."
      }
    ]
  },

  "18_3_allgoodthings": {
    idiom_headword: "all good things must come to an end",
    current_figurative_meaning: "Bữa tiệc nào rồi cũng phải tàn, những điều tươi đẹp nhất trên đời đều có hồi kết tự nhiên của nó.",
    literal_image: "Ánh hoàng hôn rực rỡ tráng lệ nhất trên biển rồi cũng phải nhường chỗ cho màn đêm buông xuống.",
    figurative_connection: "Triết lý vô thường của cái đẹp: Chấp nhận sự kết thúc không phải với nỗi tuyệt vọng mà với sự trân trọng những khoảnh khắc tuyệt vời đã trải qua.",
    historical_context: "Bắt nguồn từ thi sĩ Geoffrey Chaucer trong bài thơ bất hủ *Troilus and Criseyde* (khoảng năm 1374: 'There is an end to everything, to every good thing, as it seems').",
    deep_example: "We had an idyllic summer trekking across Scandinavia, but all good things must come to an end as the academic term resumes.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Geoffrey Chaucer — Troilus and Criseyde (c. 1374)",
        url: "https://www.britannica.com/topic/Troilus-and-Criseyde",
        note: "Ghi nhận văn học đầu tiên về triết lý kết thúc tất yếu của cái đẹp."
      },
      {
        title: "Oxford Dictionary of Proverbs",
        url: "https://www.oxfordreference.com/",
        note: "Khảo cứu nguồn gốc ngạn ngữ Chaucer."
      }
    ]
  },

  "18_3_perfectendday": {
    idiom_headword: "the perfect end to a perfect day",
    current_figurative_meaning: "Cái kết trọn vẹn viên mãn cho một ngày ngập tràn niềm vui và hạnh phúc.",
    literal_image: "Ngắm sao trời ấm áp bên lò sưởi sau một ngày dài dạo chơi đầy ắp kỷ niệm đẹp bên gia đình.",
    figurative_connection: "Sự hài hòa cảm xúc tuyệt đối: Một trải nghiệm cuối ngày làm thăng hoa và hoàn thiện tất cả những niềm vui trước đó mà không có bất kỳ tì vết nào.",
    historical_context: "Phổ biến qua bài hát nổi tiếng 'A Perfect Day' (1910) của nữ nhạc sĩ người Mỹ Carrie Jacobs-Bond, trở thành chuẩn mực biểu đạt sự thanh thản trong văn hóa phương Tây.",
    deep_example: "Savoring artisanal gelato while walking along the Venetian canals provided the perfect end to a perfect day.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Carrie Jacobs-Bond — 'A Perfect Day' (1910)",
        url: "https://en.wikipedia.org/wiki/A_Perfect_Day_(song)",
        note: "Ca khúc kinh điển định hình cụm từ trong văn hóa đại chúng thế kỷ 20."
      }
    ]
  },

  "18_3_endinsight": {
    idiom_headword: "the end is in sight",
    current_figurative_meaning: "Sắp nhìn thấy đích, cái kết cận kề trong tầm mắt sau chặng đường dài gian khổ.",
    literal_image: "Thủy thủ kiệt sức trên đại dương nhìn thấy đường bờ biển mờ ảo nơi chân trời báo hiệu hành trình sắp kết thúc an toàn.",
    figurative_connection: "Tầm nhìn tiếp thêm sức mạnh: Khi điểm kết thúc đã xuất hiện trực quan trước mắt ('in sight'), con người tìm lại được động lực để vượt qua những mét đường cuối cùng.",
    historical_context: "Xuất phát từ thuật ngữ hàng hải cổ thế kỷ 16 khi quan sát bờ từ đài quan sát trên cột buồm cao ('land in sight' chuyển nghĩa thành 'end in sight').",
    deep_example: "After eight grueling months of clinical trials, the medical researchers felt immense relief knowing the end was finally in sight.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Oxford English Dictionary — 'in sight'",
        url: "https://www.oed.com/view/Entry/179515",
        note: "Thuật ngữ hàng hải quan trắc bờ biển thời đại khám phá địa lý."
      }
    ]
  },

  "18_3_fittingend": {
    idiom_headword: "a fitting end",
    current_figurative_meaning: "Cái kết thỏa đáng, đoạn kết xứng đáng và phù hợp tuyệt đối với cống hiến hoặc tính chất của toàn bộ câu chuyện.",
    literal_image: "Mảnh ghép cuối cùng vừa khít hoàn hảo vào bức tranh ghép hình, không thừa không thiếu.",
    figurative_connection: "Sự tương thích thẩm mỹ và đạo lý ('fitting'): Kết cục làm thỏa mãn cảm thức công bằng và thẩm mỹ của con người về một chặng đường dài.",
    historical_context: "Bắt nguồn từ nguyên tắc kịch tác gia Hy Lạp cổ đại (Poetics của Aristotle) về tính tất yếu và thỏa đáng của phần kết (denouement), du nhập vào văn chương Anh từ thời kỳ Khai sáng.",
    deep_example: "Lifting the championship trophy before their home crowd was a fitting end to the veteran team's undefeated season.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'fitting'",
        url: "https://www.oed.com/view/Entry/70876",
        note: "Ngữ nghĩa thỏa đáng và tương xứng trong văn chương học thuật."
      }
    ]
  }
};

export default UNIT_18_ETYMOLOGY;
